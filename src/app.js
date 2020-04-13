const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoAPI = require('./utils/geocode');
const forecastAPI = require('./utils/forecast');

const app = express();
//Porta do Heroku vinda da variavel do sistema
const port = process.env.PORT || 3000;

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gustavo Stanley'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Gustavo Stanley'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is the help page',
        name: 'Gustavo Stanley'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geoAPI.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({
                error: error
            });
        }

        forecastAPI.getWeather(latitude, longitude, (errors, weather) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            res.send({
                forecast: weather,
                location,
                address: req.query.address
            })
        });

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Gustavo Stanley'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not Found',
        title: '404',
        name: 'Gustavo Stanley'
    });
})

//Starta o server na porta 3000
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})