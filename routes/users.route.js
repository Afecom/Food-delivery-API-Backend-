import { list_users, list_users_by_id, update_user, delete_user } from '../controllers/user.controller.js'
import { isLoggedIn, isAuthorized, isTheSameUser } from '../middlewares/auth.middleware.js'
import { Router } from 'express'

const userRouter = (models) => {
    const router = Router()

    router.get('/', isAuthorized("Admin"), list_users(models))
    router.get('/:id', isTheSameUser("Admin"), list_users_by_id(models))
    router.patch('/:id', isTheSameUser("Admin"), update_user(models))
    router.delete('/:id', delete_user(models))
    
    return router
}

export default userRouter