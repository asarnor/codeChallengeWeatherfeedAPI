const request = require('request');
const moment = require('moment');
const Promise = require('bluebird');
const apiKeys = require('../config/config');

module.exports = {

    getWeather: (locationDetails) => {

        return new Promise((resolve, reject) => {

            console.log('about to invoke weather service');

            const API_KEY = apiKeys.FORCAST_API;

            //take the details from locationDetails
            let query = locationDetails.zipcode ? `zip=${locationDetails.zipcode},us` : `q=${locationDetails.city}`;

            // openweathermap api url to hit
            let url = `http://api.openweathermap.org/data/2.5/forecast?${query}&units=metric&APPID=${API_KEY}`;

            // invoke openweathermap api
            request.post(url, (error, response, body) => { // post invoke processing with response body
                if (!error && response.statusCode == 200) { // successfully processed

                    console.log('invoked weather service at ' + new Date());
                    // send data
                    resolve(body);
                    return;

                } else {

                    reject(error);

                }
                // if error occurred, record HTTP status code
                console.log('response status: ' + response.statusCode);
                
            });

        });

    },
    getPastWeather: (locationDetails) => {
        /*
            If you don't have one, then register now: http://developer.worldweatheronline.com/member/register
        */
        let _PremiumApiBaseURL = 'http://api.worldweatheronline.com/premium/v1/';
        let _PremiumApiKey = apiKeys.PAST_WEATHER_API;

        //take the details from locationDetails
        let input = {
            query: locationDetails.location,
            format: 'json',
            date: moment(locationDetails.date).format('YYYY-MM-DD'),
            enddate: moment(locationDetails.enddate).format('YYYY-MM-DD'),
            tp: 24
        }

        return new Promise((resolve, reject) => {

            // worldweatheronline api url to hit
            let url = `${_PremiumApiBaseURL}past-weather.ashx?q=${input.query}&format=${input.format}&date=${input.date}&enddate=${input.enddate}&key=${_PremiumApiKey}`;

            // invoke worldweatheronline api
            request.post(url, (error, response, body) => { // post invoke processing with response body

                if (!error && response.statusCode == 200) { // successfully processed

                    console.log('invoked weather service at ' + new Date());
                    // send data
                    resolve(body);
                    return;

                } else {

                    reject(error);

                }
                // if error occurred, record HTTP status code
                console.log('response status: ' + response.statusCode);

            });

        });

    }

}
