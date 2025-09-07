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
    return async (req, res) => {}
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