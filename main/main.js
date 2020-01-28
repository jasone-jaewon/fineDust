let airvisual_api = require('../api/airvisual.js');
const locations = require('../model/Location');
const telegram_api = require('../api/telegram');
const weather_info = require('../model/Weather');
const fine_dust_info = require('../model/FineDust');

const greeting_text_template = '{{YEAR}}년 {{MONTH}}월 {{DAY}}일 {{HOUR}}시 {{MINIUTES}}분 날씨, 미세먼지 정보를 알려드립니다!\n';
const line = '---------------------------------------\n';
const text_template = '위치 : {{LOCATION}}\n'
    + '기온 : {{TEMPERATURES}}\n'
    + '날씨 : {{WEATHER}}\n'
    + '미세먼지 : {{FINEDUST}}\n'
    + 'AQI US : {{AQIUS}}\n'
    + 'MAIN US : {{MAINUS}}\n';

function createGreetingText() {
    let today = new Date();

    return greeting_text_template.replace(/{{YEAR}}/g, today.getFullYear())
        .replace(/{{MONTH}}/g, (today.getMonth() + 1))
        .replace(/{{DAY}}/g, today.getDate())
        .replace(/{{HOUR}}/g, today.getHours())
        .replace(/{{MINIUTES}}/g, today.getMinutes());
}

function createText(location, temperatures, weather, fine_dust, aqi_US, main_US) {
    let text = text_template.replace(/{{LOCATION}}/g, location)
        .replace(/{{TEMPERATURES}}/g, temperatures)
        .replace(/{{WEATHER}}/g, weather)
        .replace(/{{FINEDUST}}/g, fine_dust.info)
        .replace(/{{AQIUS}}/g, aqi_US)
        .replace(/{{MAINUS}}/g, main_US);
    if (fine_dust.message) {
        text += fine_dust.message;
    }
    text += line;
    return text;
}

async function main() {
    let text = createGreetingText() + line;

    for (let location in locations) {
        let data = await airvisual_api.call(locations[location]);

        console.log(data.pollution);
        let current_weather = data.weather;
        let temperatures = current_weather.tp + '도';
        let weather = weather_info[parseInt(current_weather.ic.slice(0, 2))].info;

        let current_pollution = data.pollution;
        let aqi_US = current_pollution.aqius;
        let fine_dust = fine_dust_info.getFineDust(aqi_US);
        text += createText(location, temperatures, weather, fine_dust, aqi_US, current_pollution.mainus);
    }
    console.log(text);

    let chat_ids = await telegram_api.getChatIds();

    text = encodeURI(text);
    telegram_api.sendMessage(chat_ids,text);
}

main();

