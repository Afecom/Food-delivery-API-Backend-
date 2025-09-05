import { login, signUp, refreshToken } from '../controllers/auth.controller.js'
import { Router } from 'express'

const authRouter = (models) => {
    const router = Router()
    router.post('/', signUp(models))
    router.post('/login', login(models))
    router.post('/refresh', refreshToken)
    return router
}

export default authRouter
