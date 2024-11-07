const nivelRoutes = require('./nivelRoutes');
const desenvolvedorRoutes = require('./desenvolvedorRoutes');

const setupRoutes = (app) => {
    app.get('/', (req, res) => { res.send('OK') });
    app.use('/api/niveis', nivelRoutes);
    app.use('/api/desenvolvedores', desenvolvedorRoutes);
};

module.exports = setupRoutes;