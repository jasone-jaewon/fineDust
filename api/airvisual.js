const airvisual_app_key = 'jYTwvNfZWu4GWrLz8';
const request = require('request');
const url_template = 'https://api.airvisual.com/v2/nearest_city?lat={{LATITUDE}}&lon={{LONGITUDE}}&key={{API_KEY}}';

function setUrl(latitude, longitude) {
    this.api_url = url_template.replace(/{{LATITUDE}}/g, latitude)
        .replace(/{{LONGITUDE}}/g, longitude)
        .replace(/{{API_KEY}}/g, airvisual_app_key);
}

module.exports = {
    api_url: '',
    call: function (location) {
        setUrl.call(this, location.latitude, location.longitude);
        return new Promise(((resolve, reject) => {
            request(this.api_url, {json: true}, (error, response, body) => {
                if (error || body.status === 'fail') {
                    reject(error);
                }
                resolve(body.data.current);
            });
        }));
    }
};