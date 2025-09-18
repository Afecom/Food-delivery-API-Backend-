import { Router } from "express";
import { update_address, delete_address } from "../controllers/address.controller.js";

const address_router = (models) => {
    const router = Router()

    router.patch('/:id', update_address(models))
    router.delete('/:id', delete_address(models))

    return router
}

export default address_router