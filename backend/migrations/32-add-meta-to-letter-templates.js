"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("letter_templates", "meta", {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: {
        includeHeader: true,
        includeFooter: true,
        includeBackground: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("letter_templates", "meta");
  },
};
