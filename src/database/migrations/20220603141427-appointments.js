'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.createTable('appointments', {
            id: {
                allowNull: false,
                autoIncremente: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users', 
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
            },
            collaborator_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users', 
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
            },
            canceled_at: {
                type: Sequelize.DATE,
                allowNull: true,
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
        return queryInterface.dropTable('appointments');
    }
};


