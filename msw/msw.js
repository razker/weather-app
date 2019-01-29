
const request = require('request');

const HAZUK_ID = 3659;
const DOLPHIN_ID = 3660;
const API_KEY = 'a3803526583a0471b4274d7d6df28af8';

var getForecast = (location) => {
    return new Promise((resolve, reject) => {
        var spot_id;

        if (location === 'hazuk') {
            spot_id = HAZUK_ID;
        }
        else if (location === 'dolphin') {
            spot_id = DOLPHIN_ID;
        }

        request({
            url: `http://magicseaweed.com/api/${API_KEY}/forecast/?spot_id=${spot_id}&units=eu`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject(`Connection Error`);
            }
            else if (body.error_response) {
                var errorMessage = {
                    error_code: body.error_response.code,
                    error_message: body.error_response.error_msg
                }
                reject(errorMessage);
            }
            else {
                var results = [];
                body.forEach((item) => {
                    var formattedDate = `Date: ${getFormattedDate(item.localTimestamp)} Time: ${getFormattedTime(item.localTimestamp)}`;
                    var body = item.swell.components.combined;
                    var objectToAdd = {
                        date: formattedDate,
                        body
                    }
                    results.push(objectToAdd);
                });

                resolve(results);
            }
        });

    });
};

var getFormattedTime = (timestamp) => {
    var date = new Date(timestamp * 1000);

    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
}

function getFormattedDate(timestamp) {
    var date = new Date(timestamp * 1000);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}

module.exports = {
    getForecast
}