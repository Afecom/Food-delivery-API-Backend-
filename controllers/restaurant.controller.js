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
    return async (req, res) => {}
}

export const updateRestaurant = (models) => {
    return async (req, res) => {}
}

export const deleteRestaurant = (models) => {
    return async (req, res) => {}
}

export const createMenuItem = (models) => {
    return async (req, res) => {}
}

export const listMenuItem = (models) => {
    return async (req, res) => {}
}