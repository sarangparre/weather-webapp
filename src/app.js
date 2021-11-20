const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDir = path.join(__dirname, '../public')
const hbsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', hbsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Sarang'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address...!'
        })
    }

    geocode(req.query.address, (error, { location }) => {
        if(error) {
           return res.send({ error })
        }

        forecast(location, (error, forecastData) => {
            if(error) {
               return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: 'Sarang'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: 'Sarang'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMsg: 'Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMsg: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('app is running on port ' + port)
})