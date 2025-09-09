'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Orders", "name")
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn("Orders", "name", {
      type: Sequelize.TEXT,
      allowNull: false
    })
  }
};
