import { Model, DataTypes } from "sequelize"

export default (sequelize) => {
    class Restaurant extends Model{
    static associate(models){
        Restaurant.hasMany(models.Menu_item, {
            foreignKey: "restaurant_id",
            as: "menu_items"
        })
        Restaurant.hasMany(models.Address, {
            foreignKey: "restaurant_id",
            as: "addresses"
        })
        Restaurant.hasMany(models.Order, {
            foreignKey: "restaurant_id",
            as: "orders"
        })
        }
    }

    Restaurant.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        timestamps: true,
        modelName: "Restaurant",
        tableName: "Restaurants"
    })

    return Restaurant
}
