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
    return async (req, res) => {}
} 
export const update_user = (models) => {
    return async (req, res) => {}
} 
export const delete_user = (models) => {
    return async(req, res) => {}
} 