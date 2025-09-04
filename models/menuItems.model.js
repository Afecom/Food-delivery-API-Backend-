import { Model, DataTypes} from "sequelize";

export default (sequelize) => {
    class Menu_item extends Model{
        static associate(models){
            Menu_item.hasMany(models.Order_item, {
                foreignKey: "menu_item_id",
                as: "order_items"
            })
            Menu_item.belongsTo(models.Restaurants, {
                foreignKey: "restaurant_id",
                as: "restaurants"
            })
        }
    }

    Menu_item.init({
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
        modelName: "Menu_item",
        tableName: "Menu_items"
    })
}