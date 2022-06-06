import Sequelize, { Model, DataTypes as dt } from 'sequelize';
import databaseConfig from '../../config/database';
import mongodbConnection from '../../config/mongodb';
import bcrypt from 'bcryptjs';
import File from '../models/File'; 

const sequelize = new Sequelize(databaseConfig);

/******************************************************
 *
 * Configurado de acordo com a versão 6 do SEQUELIZE
 *
 ******************************************************/

class User extends Model {
    checkPassword(password) {
        return bcrypt.compare(password, this.userPasswordHash);
    }
}

User.init({ 
        userName: {
            type: dt.STRING,
            field: 'name',
        },
        userEmail: {
            type: dt.STRING,
            field: 'email',
        },
        userPassword: { 
            type: dt.VIRTUAL,
        },
        userPasswordHash: { 
            type: dt.STRING,
            field: 'password_hash',
        },
        isProvider: { 
            type: dt.BOOLEAN,
            field: 'provider',
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
        modelName: 'User',
        tableName: 'users',
    },
);

User.beforeCreate(async (user, options) => {
    user.userPasswordHash = await bcrypt.hash(user.userPassword, 10);
    console.log(user);
});

User.beforeUpdate(async (user, options) => {
    if (user.userPassword)
        user.userPasswordHash = await bcrypt.hash(user.userPassword, 10);
    console.log(user);
});

User.belongsTo(File, {
    foreignKey: 'photo_id',
    as: 'photo',
});

export default User;
