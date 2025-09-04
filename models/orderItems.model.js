import { Model, DataTypes} from "sequelize";

export default (sequelize) => {
    class Order_item extends Model{
        static associate(models){
            Order_item.belongsTo(models.Order, {
                foreignKey: "order_id",
                as: "order"
            })
            Order_item.belongsTo(models.Menu_item, {
                foreignKey: "menu_item_id",
                as: "menu_item"
            })
        }
    }

    Order_item.init({
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

    return Order_item
}