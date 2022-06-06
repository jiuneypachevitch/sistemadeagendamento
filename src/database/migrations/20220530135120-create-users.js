'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
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
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password_hash: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        provider: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
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
      return queryInterface.dropTable('users');
  }
};
