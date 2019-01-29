const yargs = require('yargs');
const msw = require('./msw/msw.js');
const weather = require('./weather/weather.js');

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


//raz
//Using async await
async function getData(location) {

    try {
        var mswForecast = await msw.getForecast(location);
        console.log(`** Information on ${location} beach **`);
        console.log(mswForecast);
        var temperatureData = await weather.getWeather(location);
        console.log(temperatureData);
    }
    catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
    }

}

getData('dolphin');








