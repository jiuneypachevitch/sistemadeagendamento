import Sequelize, { Model, DataTypes as dt } from 'sequelize';
import User from './User';
import databaseConfig from '../../config/database';
import mongodbConnection from '../../config/mongodb';
import bcrypt from 'bcryptjs';

const sequelize = new Sequelize(databaseConfig);

class Appointment extends Model {}

Appointment.init({ 
        appointmentDate: {
            type: dt.DATE,
            field: 'date',
        },
        canceledAt: {
            type: dt.DATE,
            field: 'canceled_at',
        },
        createdAt: { 
            type: dt.DATE,
            field: 'created_at',
            defaultValue: dt.NOW,
        },
        updatedAt: { 
            type: dt.DATE,
            field: 'updated_at',
        },
    },
    {
        sequelize,
        modelName: 'Appointment',
        tableName: 'appointments',
    },
);

Appointment.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
});

Appointment.belongsTo(User, {
    foreignKey: 'collaborator_id',
    as: 'collaborator',
});

export default Appointment;
