import { Model, DataTypes } from "sequelize"

export default (sequelize) => {
    class Address extends Model{
    static associate(models){
        Address.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user"
        })
        Address.belongsTo(models.Restaurant, {
            foreignKey: "restaurant_id",
            as: "restaurant"
        })
        }
    }

    Address.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        location: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "Restaurant",
                key: "id",
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "User",
                key: "id",
            }
        }
    }, {
        sequelize,
        timestamps: true,
        modelName: "Address",
        tableName: "Addresses"
    })

    return Address
}
