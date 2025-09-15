import { Model, DataTypes} from "sequelize";

export default (sequelize) => {
    class Order extends Model{
        static associate(models){
            Order.hasMany(models.Order_item, {
                foreignKey: "order_id",
                as: "order_item"
            })
            Order.belongsTo(models.Restaurant, {
                foreignKey: "restaurant_id",
                as: "restaurant"
            })
            Order.belongsTo(models.User, {
                foreignKey: "user_id",
                as: "user"
            })
        }
    }

    Order.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Restaurants",
                key: "id"
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            }
        },
        status: {
            type: DataTypes.ENUM,
            values: ["pending", "preparing", "delivered"],
            defaultValue: "pending",
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: true,
        modelName: "Order",
        tableName: "Orders"
    })

    return Order
}