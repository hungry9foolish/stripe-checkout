const express = require('express');
const morgan = require('morgan');
const winston = require('./winston');
require('dotenv').config();
const router = require("./api/router");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//The following line is used only in development mode
app.use(express.static(__dirname + '/client/build'));
app.use(morgan('combined', { stream: winston.stream }));
app.use("/api", router);
//The following line us used only in development mode
app.get('*', function (request, response, next) {
    const { path } = request;
    const [applicationName, ...rest] = path.split("/");
    response.sendFile(__dirname + `${applicationName}/client/build/index.html`);
});
app.listen(port, () => console.log(`Listening on port ${port}`));
console.log(__dirname + '/client/build/static');