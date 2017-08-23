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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

    console.log(`This app listening on port ${PORT}`);

});

// -module.exports = app;
