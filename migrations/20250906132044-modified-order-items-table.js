'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Order_items", "restaurant_id")
    await queryInterface.addColumn("Order_items", "order_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Orders",
        key: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn("Order_items", "restaurant_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Restaurants",
        key: "id"
      }
    })
    await queryInterface.removeColumn("Order_items", "order_id")
  }
};
