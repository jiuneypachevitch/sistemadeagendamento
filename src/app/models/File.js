
import Sequelize, { Model, DataTypes as dt } from 'sequelize';
import databaseConfig from '../../config/database';
import bcrypt from 'bcryptjs';

const sequelize = new Sequelize(databaseConfig);

/******************************************************
 *
 * Configurado de acordo com a versão 6 do SEQUELIZE
 *
 ******************************************************/

class File extends Model {}

File.init({ 
        fileName: {
            type: dt.STRING,
            field: 'name',
        },
        filePath: {
            type: dt.STRING,
            field: 'path',
        },
        url: {
            type: dt.VIRTUAL,
            get() {
                    return `http://localhost:3333/files/${this.filePath}`;
            }
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
        modelName: 'File',
        tableName: 'files',
    },
);

export default File;
