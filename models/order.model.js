import { Model, DataTypes} from "sequelize";

export default (sequelize) => {
    class Order extends Model{
        static associate(models){
            Order.hasMany(models.Order_item, {
                foreignKey: "order_id",
                as: "order_items"
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
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Restaurant",
                key: "id"
            }
        },
        price: {
            type: DataTypes.DECIMAL,
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