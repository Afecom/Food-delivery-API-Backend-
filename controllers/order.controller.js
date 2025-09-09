import verify_token from "../utils/tokenChecker.js"

export const createOrder = (models) => {
    return async (req, res) => {
        const body = req.body
        const order_model = models['Order']
        const { user_id, restaurant_id } = body
        console.log("user id: ", user_id, "restaurant id: ", restaurant_id)
        try {
            const order = await order_model.create({user_id, restaurant_id})
            res.status(201).json({
                message: "Order created successfully",
                order
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't create an order",
                error: error.message || error
            })
        }
    }
}

export const listOrders = (models) => {
    return async (req, res) => {
        const order_model = models['Order']
        const access_token = req.headers['authorization'].split(" ")[1]
        const token = verify_token(access_token, "access")
        if(!token) return res.status(401).json({message: "Invalid token"})
        const user_id = token.user_id
        const user_role = token.user_role
        try {
            if(user_role === "Admin"){
                const orders = await order_model.findAll()
                if(!orders) return res.status(404).json({message: "order not found"})
                return res.status(200).json({
                    message: "Orders fetched successfully",
                    orders
                })
            }
            else{
                const orders = await order_model.findAll({
                    where: { user_id }
                })
                if(!orders) return res.status(404).json({message: "order not found"})
                return res.status(200).json({
                    message: "Orders fetched successfully",
                    orders
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "Couldn't list orders",
                error: error.message || error
            })
        }
    }
}

export const listOrderById = (models) => {
    return async (req, res) => {}
}

export const updateOrderStatus = (models) => {
    return async (req, res) => {}
}

export const deleteOrder = (models) => {
    return async (req, res) => {}
}

export const getOrderItem = (models) => {
    return async (req, res) => {}
}

export const updateQuantity = (models) => {
    return async (req, res) => {}
}

export const deleteItem = (models) => {
    return async (req, res) => {}
}