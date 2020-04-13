const getWeatherData = function (place, callback) {
    fetch('/weather?address=' + encodeURIComponent(place)).then((response) => {
        response.json().then(({ forecast, location, address, error } = {}) => {
            if (error) {
                callback(error)
            } else {
                callback(undefined, {
                    forecast,
                    location
                })
            }
        });
    });
}

const weatherForm = document.querySelector('form');
const searchButton = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    // Faz com que a página não seja atualizada('Refreshed') ao evetuar um submit
    // o modo default do form é atualizar a página e dessa forma estamos forçando a não realizar essa ação default
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    
    const location = searchButton.value;
    getWeatherData(location, (error, { forecast, location } = {}) => {
        if (error) {
            messageOne.textContent = error;
        } else {
            messageOne.textContent = 'Forecast:' + forecast + 'ºc';
            messageTwo.textContent = 'Location:' + location;
        }
    });
})