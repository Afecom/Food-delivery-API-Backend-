import { Router } from "express";
import { create_address, update_address, get_address_by_id, delete_address } from "../controllers/address.controller.js";

const address_router = (models) => {
    const router = Router()
    router.post('/', create_address(models))
    router.get('/restaurant-user-address', get_address_by_id(models))
    router.patch('/:id', update_address(models))
    router.delete('/:id', delete_address(models))

    return router
}

export default address_router