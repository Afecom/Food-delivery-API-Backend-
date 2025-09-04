import { Router } from "express";
import authRouter from "./auth.route.js";
import userRouter from "./users.route.js";

const indexRouter = Router()

indexRouter.use('/auth', authRouter)
indexRouter.use('/users', userRouter)

export default indexRouter