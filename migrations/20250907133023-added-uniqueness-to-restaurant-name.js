'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Restaurants", "name", {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true
    })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.changeColumn("Restaurants", "name", {
      type: Sequelize.TEXT,
      allowNull: false,
    })
  }
};
