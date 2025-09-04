import { createRestaurant, listRestaurants, listRestaurantsById, updateRestaurant, deleteRestaurant, createMenuItem, listMenuItem } from '../controllers/restaurant.controller.js'
import { Router } from 'express'

const restaurantRouter = (models) => {
    const router = Router()

    router.post('/', createRestaurant(models))
    router.get('/', listRestaurants(models))
    router.get('/:id', listRestaurantsById(models))
    router.patch('/:id', updateRestaurant(models))
    router.delete('/:id', deleteRestaurant(models))
    router.post('/:id/menu', createMenuItem(models))
    router.get('/:id/menu', listMenuItem(models))

    return router
}

export default restaurantRouter