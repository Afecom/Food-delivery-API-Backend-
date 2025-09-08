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
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Order",
                key: "id"
            }
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        menu_item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "menu_item",
                key: "id"
            }
        }
    }, {
        sequelize,
        timestamps: true,
        modelName: "Order_item",
        tableName: "Order_items"
    })

    return Order_item
}