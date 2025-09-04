import { login, signUp } from '../controllers/auth.controller.js'
import { Router } from 'express'
const authRouter = Router()
import initModel from '../models/index.model.js'
import devSequelize from '../configs/sequelize.config.js'
const models = initModel(devSequelize)

authRouter.post('/', signUp(models))
authRouter.post('/login', login(models))

export default authRouter