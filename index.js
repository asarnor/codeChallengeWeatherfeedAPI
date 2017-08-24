const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');

// routes
const index = require('./routes/index');
const api = require('./routes/api');

// app
const app = express();

app.use(logger('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/api', api);

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Origin, X-Auth-Token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {

    console.log(`This app listening on port ${PORT}`);

});

// -module.exports = app;
