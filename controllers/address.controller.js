import verify_token from "../utils/tokenChecker.js"

export const create_user_address = (models) => {
    return async (req, res) => {
        const address_model = models['Address']
        const body = req.body
        const id = req.params.id
        const access_token = req.headers.authorization.split(" ")[1]
        const token = verify_token(access_token, "access")
        if(!token) return res.status(401).json({message: "Invalid token"})
        const logged_user_id = token.user_id
        const user_role = token.user_role
        const { name, location } = body
        if(user_role === "Customer" && id !== logged_user_id) return res.status(400).json({message: "Please send the correct customer user id"})
        try {
            const address = await address_model.create({name, location, user_id: id})
            const address_obj = address.toJSON()
            const {restaurant_id, ...rst_address} = address_obj
            res.status(201).json({
                message: "Address created successfully",
                address: rst_address
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't create an address",
                error: error.message || error
            })
        }
    }
}

export const create_restaurant_address = (models) => {
    return async (req, res) => {
        const id = req.params.id
        const body = req.body
        const access_token = req.headers.authorization.split(" ")[1]
        const address_model = models['Address']
        const { name, location } = body
        const token = verify_token(access_token, "access")
        if(!token) return res.status(401).json({message: "Invalid token"})
        const user_role = token.user_role
        if(user_role === "Customer") return res.status(403).json({message: "An admin only can create an address for a restaurant"})
        try {
            const address = await address_model.create({name, location, restaurant_id: id})
            const { user_id, ...rst_address } = address.toJSON()
            res.status(201).json({
                message: "Restaurant address created successfully",
                address: rst_address
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't create an address for the restaurant",
                error: error.message || error
            })
        }
    }
}

export const get_user_address = (models) => {
    return async (req, res) => {
        const address_model = models['Address']
        const user_model = models['User']
        const id = req.params.id
        const access_token = req.headers.authorization.split(" ")[1]
        const token = verify_token(access_token, "access")
        if(!token) return res.status(401).json({message: "Invalid token"})
        const logged_user_id = token.user_id
        const user_role = token.user_role
        try {
            if(user_role === "Customer" && id !== logged_user_id) return res.status(400).json({message: "Please send the correct id of the customer"})
            const user_address = await address_model.findOne({
                where: { user_id: id },
                include: {model: user_model, attributes: {exclude: "password"}, as: "user"}
            })
            if(!user_address) return res.status(404).json({message: "an address for the user is not found"})
            const address_obj = user_address.toJSON()
            const {restaurant_id, ...rst_address} = address_obj
            return res.status(200).json({
                message: "Address successfully fetched for the user",
                address: rst_address
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't fetch an address",
                error: error.message || error
            })
        }
    }
}

export const update_address = (models) => {
    return async (req, res) => {}
}

export const delete_address = (models) => {
    return async (req, res) => {}
}