const request = require('request');
const forecast = (latitude, longitude, callback) => {

    // const url='http://api.weatherstack.com/current?access_key=e703bcaecf10021135966fb6d95d7baf&query=37.8267,-122.4233&units=f';
    // // const url='http://api.weatherstack.com/current?access_key=e703bcaecf10021135966fb6d95d7baf&query=&units=f';

    const url = 'http://api.weatherstack.com/current?access_key=e703bcaecf10021135966fb6d95d7baf&query=' + latitude + ',' + longitude + '&units=f';
    // request({ url: url, json: true }, (error, response) => {
    //     if (error) {
    //         console.log('Unable to connect to weather-app', undefined)   // issues with network
    //     } else if (response.body.error) {
    //         console.log('Unable to find location', undefined)            //when url having empty query  
    //     }
    //     else {
    //         // console.log(undefined, response.body.current.temperature);
    //         callback(undefined,response.body.current.temperature);

    //     }
    // })


    request({ url, json: true }, (error, {body}) => {
        if (error) {
            console.log('Unable to connect to weather-app', undefined)   // issues with network
        } else if (body.error) {
            console.log('Unable to find location', undefined)            //when url having empty query  
        }
        else {
            // console.log(undefined, response.body.current.temperature);
            callback(undefined, body.current.weather_descriptions[0] + " throughout the day .It is currently "+ 
            body.current.temperature+" degrees out. "+" There is "+ body.current.precip +" % chance of rain");


        }
    })



}

module.exports = forecast