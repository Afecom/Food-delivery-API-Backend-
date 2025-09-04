import { login, signUp } from '../controllers/auth.controller.js'
import { Router } from 'express'

const authRouter = (models) => {
    const router = Router()
    router.post('/', signUp(models))
    router.post('/login', login(models))
    return router
}

export default authRouter
