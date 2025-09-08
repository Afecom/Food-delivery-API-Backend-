export const getMenuItem = (models) => {
    return async (req, res) => {
        const id = req.params.id
        const menu_item_model = models['Menu_item']
        const restaurant_model = models['Restaurant']
        try {
            const menu_item = await menu_item_model.findOne({
                where: {id},
                include: {model: restaurant_model, as: "restaurant"}
            })
            if(!menu_item) return res.status(404).json({message: "menu with the provided ID is not found"})
            res.status(200).json({
                message: "Menu fetched successfully",
                menu_item
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't fetch the menu",
                error: error.message || error
            })
        }
    }
}

export const updateMenuItem = (models) => {
    return async (req, res) => {
        const id = req.params.id
        const menu_item_model = models['Menu_item']
        const allowed = ["name", "restaurant_id", "price"]
        const updates = Object.fromEntries(
            Object.entries(req.body).filter(([key]) => allowed.includes(key))
        )
        try {
            const menu = await menu_item_model.findByPk(id)
            if(!menu) return res.status(404).json({message: "menu not found"})
            await menu.update(updates)
            res.status(200).json({
                Message: "Menu updated successfully",
                menu
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't update the menu",
                error: error.message || error
            })
        }
    }
}

export const deleteMenuItem = (models) => {
    return async (req, res) => {
        const id = req.params.id
        const menu_item_model = models['Menu_item']
        try {
            const menu = await menu_item_model.findByPk(id)
            if(!menu) return res.status(404).json({message: "Menu not found"})
            const deleted = await menu.destroy()
            res.status(203).json({
                message: "Menu deleted successfully",
                deleted
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't delete menu",
                error: error.message || error
            })
        }
    }
}