const express = require('express')
const app = express();
const routes = require('./routes/routes');

const PORT = 8080;

app.use('/api', routes);

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))

module.exports = { PORT, server }

