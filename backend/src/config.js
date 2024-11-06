const database = {
    host: process.env.GAZIN_DB_HOST || 'localhost',
    port: parseInt(process.env.GAZIN_DB_PORT) || 5432,
    database: process.env.GAZIN_DB_DATABASE || 'gazin',
    username: process.env.GAZIN_DB_USER || 'postgres',
    password: process.env.GAZIN_DB_PASSWORD || 'gazin',
    dialect: process.env.GAZIN_DB_DIALECT || 'postgres',
};

module.exports = database