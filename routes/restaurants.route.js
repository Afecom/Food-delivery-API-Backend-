import { createRestaurant, listRestaurants, listRestaurantsById, updateRestaurant, deleteRestaurant } from '../controllers/restaurant.controller.js'
import initModel from '../models/index.model.js'
import { devSequelize } from '../configs/sequelize.config.js'
const models = initModel(devSequelize)
import { Router } from 'express'

const restaurantRouter = Router()

restaurantRouter.post('/', createRestaurant(models))
restaurantRouter.get('/', listRestaurants(models))
restaurantRouter.get('/:id', listRestaurantsById(models))
restaurantRouter.patch('/:id', updateRestaurant(models))
restaurantRouter.delete('/:id', deleteRestaurant(models))

export default restaurantRouter