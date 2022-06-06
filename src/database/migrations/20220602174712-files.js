'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('files', {
        id: {
            allowNull: false,
            autoIncremente: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        path: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: true,
        }
    },{
        initialAutoIncrement: 1,
    });
  },
  async down (queryInterface, Sequelize) {
      return queryInterface.dropTable('files');
  }
};

