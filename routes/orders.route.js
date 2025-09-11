import { createOrder, listOrders, listOrderById, updateOrderStatus, deleteOrder,getOrderItem, updateQuantity, deleteItem } from '../controllers/order.controller.js'
import { isAuthorized } from '../middlewares/auth.middleware.js'
import { Router } from 'express'
const customer_auth = isAuthorized("Customer")
const admin_auth = isAuthorized("Admin")

const orderRouter = (models) => {
    const router = Router()

    router.post('/', customer_auth, createOrder(models))
    router.get('/', listOrders(models))
    router.get('/:id', listOrderById(models))
    router.patch('/:id/status', admin_auth,updateOrderStatus(models))
    router.delete('/:id', deleteOrder(models))
    router.get('/:id/items', getOrderItem(models))
    router.patch('/:id/items/:itemId', customer_auth, updateQuantity(models))
    router.delete('/:id/items/:itemId', customer_auth, deleteItem(models))
    
    return router
}

export default orderRouter