const express = require('express');
const router = express.Router();
const Weather = require('../utils/Weather');

const setPayload = (method, req, res) => {
    return (async() => {
        
        let payload = {
            confirmation: null,
            response: null
        }

        try {

            let response = await method(req.body);
            payload.confirmation = 'success';
            payload.response = JSON.parse(response);

        } catch (e) {
            console.log('error', e);

            payload.confirmation = 'fail';
            payload.response = e

        } finally {

            res.json(payload);
            //next();
        }
    })()
}

router.post('/weather/:action', (req, res, next) => {

    let action = req.params.action;
    res.setHeader('Content-Type', 'application/json');

    if (action === 'current') {

        setPayload(Weather.getWeather, req, res);

    } else if (action === 'past') {

        setPayload(Weather.getPastWeather, req, res);

    }

});

module.exports = router;
