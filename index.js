const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const appRoute = require('./src/routes/routes');
app.use('/', appRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App running on port : ${PORT}`));