module.exports = {
    host: process.env.GAZIN_SERVER_HOST || 'localhost',
    port: parseInt(process.env.GAZIN_SERVER_PORT) || 3000,
};