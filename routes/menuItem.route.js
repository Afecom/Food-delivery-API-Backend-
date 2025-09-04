import { Router } from "express";
import { updateMenuItem, deleteMenuItem, getMenuItem } from '../controllers/menuItem.controller.js'

const menuItemRouter = (models) => {
    const router = Router()
    router.patch('/:id', updateMenuItem(models))
    router.delete('/:id', deleteMenuItem(models))
    router.get('/:id', getMenuItem(models))
    return router
}

export default menuItemRouter
