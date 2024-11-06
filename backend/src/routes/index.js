const nivelRoutes = require('./nivelRoutes');

const setupRoutes = (app) => {
    app.get('/', (req, res) => { res.send('OK') });
    app.use('/api/niveis', nivelRoutes);
};

module.exports = setupRoutes;