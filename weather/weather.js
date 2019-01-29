const request = require('request');

const API_KEY = 'a2176e775c3facfec55e823930a176a2';

const DOLPHIN_LAT = 32.068752;
const DOLPHIN_LNG = 34.762785;
const HAZUK_LAT = 32.143175;
const HAZUK_LNG = 34.790825;




var getWeather = (location) => {
    return new Promise( (resolve, reject) => {
        var latitude;
        var longitude;

        if (location === 'hazuk') {
            latitude = HAZUK_LAT;
            longitude = HAZUK_LNG;
        }
        else if (location === 'dolphin') {
            latitude = DOLPHIN_LAT;
            longitude = DOLPHIN_LNG;
        }

        request({
            url: `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}?units=ca`,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(
                    {
                        tempetrue: body.currently.temperature,
                        apparentTemperature: body.currently.apparentTemperature
                    });

            }
            else {
                reject(error || response.statusCode);
            }
        });

    });

};

module.exports.getWeather = getWeather;
