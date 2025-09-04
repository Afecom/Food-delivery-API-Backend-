import { Router } from "express";
import initModel from "../models/index.model.js";
import { devSequelize, prodDbInstance, testDbInstance } from "../configs/sequelize.config.js";
const devModel = initModel(devSequelize)
const prodModel = initModel(prodDbInstance)
const testModel = initModel(testDbInstance)
import authRouter from "./auth.route.js";
import userRouter from "./users.route.js";
import restaurantRouter from "./restaurants.route.js";
import orderRouter from "./orders.route.js";
import menuItemRouter from "./menuItem.route.js";

const indexRouter = Router()

indexRouter.use('/auth', authRouter(devModel))
indexRouter.use('/users', userRouter(devModel))
indexRouter.use('/restaurants', restaurantRouter(devModel))
indexRouter.use('/orders', orderRouter(devModel))
indexRouter.use('/menu', menuItemRouter(devModel))

export default indexRouter