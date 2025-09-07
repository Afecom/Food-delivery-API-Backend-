export const list_users = (models) => {
    return async (req, res) => {
        const user_model = models['User']
        try {
            const users = await user_model.findAll()
            const returnUsers = []
            if(!users) return res.status(404).json({message: "User not found"})
            users.map((user) => {
                const {password: pwd, ...rst_user} = user.toJSON()
                returnUsers.push(rst_user)
            })
            res.status(200).json({
                message: "Users fetched successfully",
                users: returnUsers
            })
        } catch (error) {
            res.status(400).json({
                message: "Couldn't fetch users",
                error: error.message || error
            })
        }
    }
} 
export const list_users_by_id = (models) => {
    return async (req, res) => {
        const user_model = models['User']
        const order_model = models['Order']
        const address_model = models['Address']
        const order_item_model = models['Order_item']
        const menu_item_model = models['Menu_item']
        const id = req.params.id
        try {
            const user = await user_model.findOne({
                where: { id },
                include: [
                    {model: order_model, as: "orders", include: [
                        {model: order_item_model, as: "order_item", include: [
                            {model: menu_item_model, as: "menu_item"}
                        ]}
                    ]},
                    {model: address_model, as: "addresses"}
                ]
            })
            if(!user) return res.status(404).json({message: "User not found"})
            const {password: pwd, ...rst_user} = user.toJSON()
            res.status(200).json({
                message: "User fetched successfully",
                User: rst_user
            })
        } catch (error) {
            res.status(400).json({
                message: "Couldn't get user",
                error: error.message || error
            })
        }
    }
} 
export const update_user = (models) => {
    return async (req, res) => {
        const body = req.body
        const allowed = ["first_name", "last_name"]
        const updates = Object.fromEntries(
            Object.entries(body).filter(([key]) => allowed.includes(key))
        )
        const id = req.params.id
        const user_model = models['User']
        try {
            const user = await user_model.findByPk(id)
            if(!user) return res.status(404).json({message: "User not found with the ID provided"})
            await user.update(updates)
            res.status(201).json({
                message: "User updated successfully",
                user: user
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't update the user",
                error: error.message || error
            })
        }
    }
} 
export const delete_user = (models) => {
    return async(req, res) => {}
} 