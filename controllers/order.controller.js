import verify_token from "../utils/tokenChecker.js"

export const createOrder = (models) => {
    return async (req, res) => {
        const body = req.body
        const order_model = models['Order']
        const order_item_model = models['Order_item']
        const { user_id, restaurant_id, items } = body
        try {
            const order = await order_model.create({
                user_id,
                restaurant_id,
            })
            const order_items = await Promise.all(
                items.map(item => {
                    order_item_model.create({
                        order_id: order.id,
                        menu_item_id: item.menu_item_id,
                        quantity: item.quantity
                    })
                })
            )
            res.status(200).json({
                message: "Order created successfully",
                order,
                order_items
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
    return async (req, res) => {
        const id = req.params.id
        const order_model = models['Order']
        const user_model = models['User']
        const restaurant_model = models['Restaurant']
        const order_item_model = models['Order_item']
        const menu_item_model = models['Menu_item']
        try {
            const order = await order_model.findOne({
                where: { id },
                include: [
                    {model: user_model, attributes: {exclude: ["password"]}, as: "user"},
                    {model: restaurant_model, as: "restaurant"},
                    {model: order_item_model, as: "order_item", include: {model: menu_item_model, as: "menu_item"}}
                ]
            })
            if(!order) return res.status(404).json({message: "order not found"})
            res.status(200).json({
                message: "Order fetched successfully",
                order: order
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't fetch order",
                error: error.message || error
            })
        }
    }
}

export const updateOrderStatus = (models) => {
    return async (req, res) => {
        const id = req.params.id
        const order_model = models['Order']
        const { status } = req.body
        const allowed = ["pending", "preparing", "delivered"]
        if(!allowed.includes(status)) return res.status(400).json({message: "Please provide the correct status value. i.e (pending, preparing, delivered)"})
        try {
            const order = await order_model.findByPk(id)
            if(!order) return res.status(404).json({message: "Order not found"})
            order.status = status
            await order.save()
            res.status(200).json({
                message: "Order status updated successfully",
                order
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't update order status",
                error: error.message || error
            })
        }
    }
}

export const deleteOrder = (models) => {
    return async (req, res) => {
        const id = req.params.id
        const order_model = models['Order']
        
        try {
            const order = await order_model.findByPk(id)
            if(!order) return res.status(404).json({message: "order not found"})
            const order_status = order.status
            const access_token = req.headers['authorization'].split(" ")[1]
            const token = verify_token(access_token, "access")
            if(!token) return res.status(401).json({message: "Invalid token"})
            const user_role = token.user_role
            const user_id = token.user_id
            if(order.user_id !== user_id && user_role !== "Admin") return res.status(403).json({message: "Couldn't cancel an order of another user"})
            try {
                if(user_role === "Admin" || order_status === "pending"){
                    await order.destroy()
                    return res.status(203).json({
                        message: "Order canceled successfully",
                    })
                }
                res.status(404).json({message: "Couldn't cancel order. requires admin priviledge or order status be still pending"})
            } catch (error) {
                
            }
        } catch (error) {
            res.status(500).json({
                message: "Couldn't cancel the order",
                error: error.message || error
            })
        }
    }
}

export const getOrderItem = (models) => {
    return async (req, res) => {
        const id = req.params.id
        const order_item_model = models['Order_item']
        try {
            const order_items = await order_item_model.findAll({
                where: { order_id: id }
            })
            if(!order_items) return res.status(404).json({message: "order item not found"})
            res.status(200).json({
                message: "Order items fetched successfully",
                order_items
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't fetch the order",
                error: error.message || error
            })
        }
    }
}

export const updateQuantity = (models) => {
    return async (req, res) => {
        const { id, itemId } = req.params
        const order_item_model = models['Order_item']
        const order_model = models['Order']
        const { quantity } = req.body
        try {
            const order = await order_model.findByPk(id)
            if(!order) return res.status(404).json({message: "Order not found"})
            const order_status = order.status
            if(order_status !== "pending") return res.status(400).json({message: "Couldn't update a not pending order"})
            const order_item = await order_item_model.findOne({
                where: {
                    order_id: id,
                    id: itemId
                }
            })
            if(!order_item) return res.status(404).json({message: "Order item not found"})
            order_item.update({quantity})
            res.status(200).json({
                message: "Order item quantity updated successfully",
                order_item
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't update the quantity of the item",
                error: error.message || error
            })
        }
    }
}

export const deleteItem = (models) => {
    return async (req, res) => {
        const { id, itemId } = req.params
        const order_item_model = models['Order_item']
        const order_model = models['Order']
        try {
            const order = await order_model.findByPk(id)
            if(!order) return res.status(404).json({message: "Order not found"})
            const order_status = order.status
            if(order_status !== "pending") return res.status(400).json({message: "Couldn't delete a not pending order"})
            const order_item = await order_item_model.findOne({
                where: {
                    order_id: id,
                    id: itemId
                }
            })
            if(!order_item) return res.status(404).json({message: "Order item not found"})
            const deleted = order_item.destroy()
            res.status(203).json({
                message: "Item deleted successfully",
                item: deleted
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't delete the item",
                error: error.message || error
            })
        }
    }
}