/* setup para conexão ao postgres executando localmente em um container Docker.
 * A porta é diferente da porta padrão do postgresql
 * */

module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    port: '54321',
    username: 'postgres',
    password: 'postgres',
    database: 'sistema-de-agendamento',
    omitNull: true,
    define: {
        timestamps: true,
        undercored: true,
        unsdercoredAll: true,
    }
};

