import { list_users, list_users_by_id, update_user, delete_user } from '../controllers/user.controller.js'
import { Router } from 'express'

const userRouter = (models) => {
    const router = Router()

    router.get('/', list_users(models))
    router.get('/:id', list_users_by_id(models))
    router.patch('/:id', update_user(models))
    router.delete('/:id', delete_user(models))
    
    return router
}

export default userRouter