export const createRestaurant = (models) => {
    return async (req, res) => {
        const body = req.body
        const restaurant_model = models['Restaurant']
        const name = body
        try {
            const restaurant = await restaurant_model.create(name)
            res.status(201).json({
                message: "Restaurant created successfully",
                Restaurant: restaurant
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't create a restaurant",
                error: error.message || error
            })
        }
    }
}

export const listRestaurants = (models) => {
    return async (req, res) => {
        const restaurant_model = models['Restaurant']
        try {
            const restaurants = await restaurant_model.findAll()
            if(!restaurants) return res.status(404).json({message: "Couln't find any restaurant"})
            res.status(200).json({
                message: "Restaurants fetched successfully",
                Restaurants: restaurants
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't fetch restaurants",
                error: error.message || error
            })
        }
    }
}

export const listRestaurantsById = (models) => {
    return async (req, res) => {
        const id = req.params.id
        const restaurant_model = models['Restaurant']
        const address_model = models['Address']
        const menu_item_model = models['Menu_item']
        const order_model = models['Order']
        const order_item_model = models['Order_item']
        const user_model = models['User']
        try {
            const restaurant = await restaurant_model.findOne({
                where: { id },
                include: [
                    {model: address_model, as: "addresses"},
                    {model: menu_item_model, as: "menu_items"},
                    {model: order_model, as: "orders", include: [
                        {model: user_model, as: "user", include: {model: address_model, as: "addresses"}},
                        {model: order_item_model, as: "order_item", include: {model: menu_item_model, as: "menu_item"}}
                    ]}
                ]
            })
            if(!restaurant) return res.status(404).json({message: "Restaurant not found with the provided ID"})
            res.status(200).json({
                message: "Restaurant fetched successfully",
                Restaurant: restaurant
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't fetch the restaurant",
                error: error.message || error
            })
        }
    }
}

export const updateRestaurant = (models) => {
    return async (req, res) => {
        const body = req.body
        const id = req.params.id
        const restaurant_model = models['Restaurant']
        const name = body
        try {
            const restaurant = await restaurant_model.findByPk(id)
            if(!restaurant) return res.status(404).json({message: "Restaurant not found with the provided ID"})
            await restaurant.update(name)
            res.status(200).json({
                message: "Restaurant name updated successfully",
                Restaurant: restaurant
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't update the restaurant",
                error: error.message || error
            })
        }
    }
}

export const deleteRestaurant = (models) => {
    return async (req, res) => {
        const id = req.params.id
        const restaurant_model = models['Restaurant']
        try {
            const restaurant = await restaurant_model.findByPk(id)
            if(!restaurant) return res.status(404).json({message: "Restaurant not found with the provided ID"})
            const deleted = restaurant.destroy()
            res.status(203).json({
                message: "Restaurant deleted successfully",
                deleted: deleted
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't delete the restaurant",
                error: error.message || error
            })
        }
    }
}

export const createMenuItem = (models) => {
    return async (req, res) => {
        const body = req.body
        const id = req.params.id
        const { name, price } = body
        const menu_item_model = models['Menu_item']
        try {
            const menu_item = await menu_item_model.create({name, restaurant_id: id, price})
            res.status(201).json({
                Message: "Menu item created successfully",
                Menu_item: menu_item
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't create a menu item for the restaurant",
                error: error.message || error
            })
        }
    }
}

export const listMenuItem = (models) => {
    return async (req, res) => {
        const id = req.params.id
        const menu_item_model = models['Menu_item']
        try {
            const menu_items = await menu_item_model.findAll({
                where: {restaurant_id: id}
            })
            if(!menu_items) return res.status(404).json({message: "Menu item not found"})
            res.status(200).json({
                message: "Menu items fetched successfully",
                menu_items
            })
        } catch (error) {
            res.status(500).json({
                message: "Couldn't fetch the menu items from the restaurant",
                error: error.message || error
            })
        }
    }
}