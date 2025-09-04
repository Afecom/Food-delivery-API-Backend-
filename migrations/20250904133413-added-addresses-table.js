'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Addresses", {
      id: {
        type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      name: {
          type: Sequelize.TEXT,
          allowNull: false,
      },
      location: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      restaurant_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
              model: "Restaurants",
              key: "id",
          }
      },
      user_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
              model: "Users",
              key: "id",
          }
      },
      createdAt: {
          type: Sequelize.TIME,
          allowNull: false
      },
      updatedAt: {
          type: Sequelize.TIME,
          allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Addresses")
  }
};
