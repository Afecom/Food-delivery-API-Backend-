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

export const get_address_by_id = (models) => {
    return async (req, res) => {}
}

export const update_address = (models) => {
    return async (req, res) => {}
}

export const delete_address = (models) => {
    return async (req, res) => {}
}