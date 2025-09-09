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
    return async (req, res) => {}
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