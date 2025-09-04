'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Menu_items", {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
      },
      name: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      restaurant_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: "Restaurants",
              key: "id"
          }
      },
      price: {
          type: Sequelize.DECIMAL,
          allowNull: false
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
    await queryInterface.dropTable("Menu_items")
  }
};
