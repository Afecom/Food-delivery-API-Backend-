'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Menu_items", "order_item_id")
    await queryInterface.addColumn("Order_items", "menu_item_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Menu_items",
        key: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn("Menu_items", "order_item_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Order_items",
        key: "id"
      }
    })
    await queryInterface.removeColumn("Order_items", "menu_item_id")
  }
};
