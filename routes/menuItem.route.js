import { Router } from "express";
import { updateMenuItem, deleteMenuItem, getMenuItem } from '../controllers/menuItem.controller.js'
import { isAuthorized } from "../middlewares/auth.middleware.js";
const admin_auth = isAuthorized("Admin")

const menuItemRouter = (models) => {
    const router = Router()
    router.patch('/:id', admin_auth, updateMenuItem(models))
    router.delete('/:id', admin_auth, deleteMenuItem(models))
    router.get('/:id', getMenuItem(models))
    return router
}

export default menuItemRouter
