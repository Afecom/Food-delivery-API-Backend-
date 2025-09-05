import addressModel from "./address.model.js";
import menuItemsModel from "./menuItem.model.js"
import orderModel from "./order.model.js"
import orderItemModel from "./orderItem.model.js"
import restaurantModel from "./restaurant.model.js"
import userModel from "./user.model.js"

const initModel = (sequelize) => {
    const models = {
        Address: addressModel(sequelize),
        Menu_item: menuItemsModel(sequelize),
        Order: orderModel(sequelize),
        Order_item: orderItemModel(sequelize),
        Restaurant: restaurantModel(sequelize), 
        User: userModel(sequelize)
    }

    Object.values(models).forEach((model) => {
        if(model.associate){
            model.associate(models)
        }
    })

    return models
}

export default initModel