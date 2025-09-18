import verify_token from "../utils/tokenChecker.js"

export const create_address = (models) => {
    return async (req, res) => {
        const address_model = models['Address']
        const body = req.body
        const { name, location, restaurant_id, user_id } = body
        if (restaurant_id && user_id) return res.status(400).json({message: "An address can be used either for a restaurant or a user not both"})

        try {
            const address = await address_model.create({name, location, restaurant_id, user_id})
            const address_obj = address.toJSON()
            if(user_id){
                const {restaurant_id: id, ...rst_address} = address_obj
                res.status(201).json({
                    message: "Address created successfully",
                    address: rst_address
                })
            }
            else if(restaurant_id){
                const {user_id: id, ...rst_address} = address_obj
                res.status(201).json({
                    message: "Address created successfully",
                    address: rst_address
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "Couldn't create an address",
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