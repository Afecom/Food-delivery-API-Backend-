'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Orders", "price")
    await queryInterface.addColumn("Orders", "status", {
      type: Sequelize.ENUM,
      values: ["pending", "preparing", "delivered"],
      defaultValue: "pending",
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn("Orders", "price", {
      type: Sequelize.DECIMAL,
      allowNull: false
    })
    await queryInterface.removeColumn("Orders", "status")
  }
};
