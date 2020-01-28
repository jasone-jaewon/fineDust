const misemise_bot_id = 'bot643661507:AAH6_g4aoQE3w2P4Z-sZhHbst4pLsRm4yj8';
const update_url_template = 'https://api.telegram.org/{{BOT_ID}}/getUpdates';
const send_url_template = 'https://api.telegram.org/{{BOT_ID}}/sendmessage?chat_id={{CHAT_ID}}&text={{TEXT}}';

const request = require('request');


function setUpdateUrl() {
    this.api_url = update_url_template.replace(/{{BOT_ID}}/g, misemise_bot_id);
}

function setSendUrl(chat_id, text) {
    this.api_url = send_url_template.replace(/{{BOT_ID}}/g, misemise_bot_id)
        .replace(/{{CHAT_ID}}/g, chat_id)
        .replace(/{{TEXT}}/g, text);
}

function extract_chat_ids(body, chat_ids) {
    for (let index in body.result) {
        let chat_id = body.result[index].message.chat.id;
        if (!chat_ids.includes(chat_id)) {
            chat_ids.push(chat_id);
        }
    }
}

module.exports = {
    api_url: '',
    getChatIds: function () {
        setUpdateUrl.call(this);
        let chat_ids = [];
        return new Promise(((resolve, reject) => {
            request(this.api_url, {json: true}, (error, response, body) => {
                if (error || body.ok === false) {
                    reject(error);
                }
                extract_chat_ids(body, chat_ids);
                resolve(chat_ids);
            });
        }));
    },
    sendMessage: function (chat_ids, text) {
        for (let index in chat_ids) {
            setSendUrl.call(this, chat_ids[index], text);
            request(this.api_url, {json: true}, (error, response, body) => {
            });
        }
    }
};
