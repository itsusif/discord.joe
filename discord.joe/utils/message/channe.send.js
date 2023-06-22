const axios = require('axios');
const { discordAPI } = require('../../config.json');
const { message_edit } = require('./edit')

async function channel_send(object) {
    try {
        if (typeof object == 'string') {
            const { data: response } = await axios.post(`${discordAPI}/channels/${this.channel_id}/messages`, {
                content: object,
            }, {
                headers: {
                    Authorization: `Bot ${this.client.token}`
                }
            }).catch(err => {
                throw err
            });
            response.edit = message_edit.bind({ client: this.client, message: response, channel_id: this.channel_id });
            return response;
        } else {
            const { data: response } = await axios.post(`${discordAPI}/channels/${this.channel_id}/messages`, {
                ...object,
            }, {
                headers: {
                    Authorization: `Bot ${this.client.token}`
                }
            }).catch(err => {
                throw err
            });
            response.edit = message_edit.bind({ client: this.client, message: response, channel_id: this.channel_id });
            return response;
        }
    } catch (err) {
        throw err;
    }
}

module.exports = {
    channel_send
}