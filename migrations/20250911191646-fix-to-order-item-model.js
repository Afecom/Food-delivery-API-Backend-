'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Order_items", "quantity", {
      type: Sequelize.INTEGER,
      allowNull: false
    })
    await queryInterface.removeColumn("Order_items", "name")
    await queryInterface.removeColumn("Order_items", "price")
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Order_items", "quantity")
    await queryInterface.addColumn("Order_items", "name", {
      type: Sequelize.TEXT,
      allowNull: false
    })
    await queryInterface.addColumn("Order_items", "price", {
      type: Sequelize.DECIMAL,
      allowNull: false
    })
  }
};
