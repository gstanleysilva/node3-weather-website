const request = require('request');

const getWeather = (lat, lon, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=2a0aa6d6eaf5a7d65c619e51d79e2fde&units=metric&lang=pt_br'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Erro ao conectar no servidor')
        } else if (body.cod === 200) {
            callback(undefined, body.main.temp)
        } else {
            callback('Não foi possivel retornar as informações')
        }
    })
}

module.exports = {
    getWeather: getWeather
}