import { Model, DataTypes } from "sequelize"

export default (sequelize) => {
    class User extends Model{
    static associate(models){
        User.hasMany(models.Order, {
            foreignKey: "user_id",
            as: "orders"
        })
        User.hasMany(models.Address, {
            foreignKey: "user_id",
            as: "addresses"
        })
        }
    }

    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
                    type: DataTypes.TEXT,
                    allowNull: false
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM,
            values: ["Customer", "Admin"],
            defaultValue: "Customer",
            allowNull: false,
        }
    }, {
        sequelize,
        timestamps: true,
        modelName: "User",
        tableName: "Users"
    })

    return User
}
