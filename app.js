const yargs = require('yargs');
const msw = require('./msw/msw.js');
const weather = require('./weather/weather.js');
const express = require('express');

const PORT = process.env.PORT || 3000;
var app = express();

async function getData(location) {

    try {
        
        var mswForecast = await msw.getForecast(location);
        console.log(`** Information on ${location} beach **`);
        console.log(mswForecast);
        var temperatureData = await weather.getWeather(location);
        console.log(temperatureData);

        var result = {mswForecast,temperatureData};
        return result;

    }
    catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
    }

}


app.get('/', async (req, res) => {
    var result = await getData('dolphin');
    res.send(result);
});

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
  });

/*
const argv = yargs
    .options({
        l: {
            demand: true,
            alias: 'location',
            describe: 'Enter wanted location: dolphin or hazuk',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;
*/

//Request using Callback, Promise and yargs
/*
msw.getForecast(argv.location, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    }
    else {
        console.log(`** Information on ${argv.location} beach **`);
        console.log(result);
        //Request warping in a Promise
        weather.getWeather(argv.location).then((result) => {
            console.log(result);
        }, (errorMessage) => {
            console.log(`Error: ${errorMessage}`);
        });
    }
});
*/

//Using async await








