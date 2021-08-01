const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('../utils/geocode.js')
const forecast = require('../utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Akhil'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akhil'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Akhil'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            ERROR : 'You must provide a search location'
        })
    }
    else{

        geocode(req.query.address,(error,{latitude,longitude})=>{
            if(error){
                res.send('Could not find the location')
            }
            else{
                forecast(latitude,longitude, (error, data) => {
                    if(error){
                        res.send('Could not get the forecast of location')
                    
                    }
                    else{
                        res.send(
                            {
                              Forecast : data.weather_descriptions,
                              Location : data.location,
                              Address : req.query.address
                            })
                    }
                  })
            }
        })

    }
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products  : []
    }
    )
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akhil',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akhil',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})