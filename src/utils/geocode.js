const request =  require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2FyYW5nNTY2MjUiLCJhIjoiY2t0dG5uOG1nMDJmYzJ3bW1tczd6c3k2cyJ9.EmL46_-BY3PI1Qxp5kGWFw&limit=1";
    request({url, json:true}, (error,  response) => {
        if(error) {
            callback('Unable to connect weather services.', undefined)
        }else if(response.body.features.length === 0) {
            callback("Unable to find location, Try another location.", undefined)
        }else {
            callback(undefined, {
                latitude: response.body.features[0].geometry.coordinates[0],
                longitude: response.body.features[0].geometry.coordinates[1],
                location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode