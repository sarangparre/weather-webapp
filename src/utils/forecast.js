const request = require("request")

const forecast = (location, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=03135dcc8b2abf266fdae2379973aaca&query=${location}`
    request({url, json: true}, (error, response) => {
        console.log(response.body)
        if(error) {
            callback('Unable to connect weather services', undefined)
        }
        else if(response.body.error) {
            callback("Unable to find location", undefined)
        }else {
        
            callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees, It feels like ${response.body.current.feelslike} degrees out. It is ${response.body.current.precip}% likely to rain.`)
        }
    })
}

module.exports = forecast