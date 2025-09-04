import { createOrder, listOrders, listOrderById, updateOrderStatus, deleteOrder } from '../controllers/order.controller.js'
import { Router } from 'express'

const orderRouter = (models) => {
    const router = Router()

    router.post('/', createOrder(models))
    router.get('/', listOrders(models))
    router.get('/:id', listOrderById(models))
    router.patch('/:id/status', updateOrderStatus(models))
    router.delete('/:id', deleteOrder(models))
    
    return router
}

export default orderRouter