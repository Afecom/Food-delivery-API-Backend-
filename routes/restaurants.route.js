import { createRestaurant, listRestaurants, listRestaurantsById, updateRestaurant, deleteRestaurant, createMenuItem, listMenuItem } from '../controllers/restaurant.controller.js'
import { isAuthorized } from '../middlewares/auth.middleware.js'
import redis_middleware from '../middlewares/redis.middleware.js'
import { Router } from 'express'

const restaurantRouter = (models) => {
    const router = Router()
    const admin_auth = isAuthorized("Admin")

    router.post('/', admin_auth, createRestaurant(models))
    router.get('/', redis_middleware, listRestaurants(models))
    router.get('/:id', listRestaurantsById(models))
    router.patch('/:id', admin_auth, updateRestaurant(models))
    router.delete('/:id', admin_auth, deleteRestaurant(models))
    router.post('/:id/menu', admin_auth, createMenuItem(models))
    router.get('/:id/menu', listMenuItem(models))

    return router
}

export default restaurantRouter