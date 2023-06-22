const axios = require('axios');
const { discordAPI } = require('../../config.json');
const { message_edit } = require('./edit')

async function message_reply(object) {
    try {
        if (typeof object === 'string') {
            const { data: response } = await axios.post(`${discordAPI}/channels/${this.message.channel_id}/messages`, {
                content: object,
                message_reference: {
                    message_id: this.message.id
                }
            }, {
                headers: {
                    Authorization: `Bot ${this.client.token}`
                }
            });
            response.edit = message_edit.bind({ client: this.client, message: response, channel_id: this.message.channel_id });
            return response;
        } else {
            const { data: response } = await axios.post(`${discordAPI}/channels/${this.message.channel_id}/messages`, {
                ...object,
                message_reference: {
                    message_id: this.message.id
                }
            }, {
                headers: {
                    Authorization: `Bot ${this.client.token}`
                }
            });
            response.edit = message_edit.bind({ client: this.client, message: response, channel_id: this.message.channel_id });
            return response;
        }
    } catch (err) {
        throw err
    }
}

module.exports = {
    message_reply
}