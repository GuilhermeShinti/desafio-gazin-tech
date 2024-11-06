const express = require('express');
const setupRoutes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const port = 3000;

app.use(express.json());
setupRoutes(app);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});