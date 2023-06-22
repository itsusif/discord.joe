const axios = require('axios');
const { discordAPI } = require('../../config.json');
const { interaction_edit } = require('./edit');

async function interaction_reply(object) {
    try {
        if (typeof object === 'string') {
            const { data: response } = await axios.post(`${discordAPI}/interactions/${this.interaction.id}/${this.interaction.token}/callback`, {
                type: 4,
                data: { content: object },
                message_reference: {
                    message_id: this.id
                }
            });
            return response;
        } else {
            const { data: response } = await axios.post(`${discordAPI}/interactions/${this.interaction.id}/${this.interaction.token}/callback`, {
                type: 4,
                data: { ...object },
                message_reference: {
                    message_id: this.id
                }
            });
            return response;
        }
    } catch (err) {
        throw err
    }
}

module.exports = {
    interaction_reply
}