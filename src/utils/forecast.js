const request = require("request")

const forecast = (location, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=03135dcc8b2abf266fdae2379973aaca&query=${location}`
    request({url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect weather services', undefined)
        }
        else if(response.body.error) {
            callback("Unable to find location", undefined)
        }else {
            callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. it feels like ${response.body.current.feelslike} degrees outside.`)
        }
    })
}

module.exports = forecast