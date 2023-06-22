const axios = require('axios');
const { discordAPI } = require('../../config.json');

async function message_edit(object) {
    try {
        if (typeof object === 'string') {
            const { data: response } = await axios.patch(`${discordAPI}/channels/${this.channel_id}/messages/${this.message.id}`, {
                content: object,
            }, {
                headers: {
                    Authorization: `Bot ${this.client.token}`
                }
            });
            return response;
        } else {
            const { data: response } = await axios.patch(`${discordAPI}/channels/${this.channel_id}/messages/${this.message.id}`, {
                ...object
            }, {
                headers: {
                    Authorization: `Bot ${this.client.token}`
                }
            });
            return response;
        }
    } catch (err) {
        throw err
    }
}

module.exports = {
    message_edit
}