import { list_users, list_users_by_id, update_user, delete_user } from '../controllers/user.controller.js'
import { Router } from 'express'
import initModel from '../models/index.model.js'
import devSequelize from '../configs/sequelize.config.js'
const models = initModel(devSequelize)
const userRouter = Router()

userRouter.get('/', list_users(models))
userRouter.get('/:id', list_users_by_id(models))
userRouter.patch('/:id', update_user(models))
userRouter.delete('/:id', delete_user(models))

export default userRouter