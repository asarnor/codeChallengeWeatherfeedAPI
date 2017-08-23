const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    console.log('use the api, dude');
    let err = new Error('Not Found');
    err.status = 404;
    res.json({response: err})
    next(err);

});

module.exports = router;
