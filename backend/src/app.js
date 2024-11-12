const express = require('express');
const setupRoutes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const port = 3000;

app.disable('etag');
app.use(express.json());
app.use(cors());

setupRoutes(app);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});