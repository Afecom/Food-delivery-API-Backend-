'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "role", {
      type: Sequelize.ENUM,
      values: ["Customer", "Admin"],
      defaultValue: "Customer",
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "role", {
      type: Sequelize.ENUM,
      values: ["Customer", "Admin"],
      defaultValue: "Customer",
      allowNull: false
    })
  }
};
