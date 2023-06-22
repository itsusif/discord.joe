const axios = require('axios');
const { discordAPI } = require('../../config.json');

async function interaction_edit(object) {
    try {
        if (typeof object === 'string') {
            const { data: response } = await axios.patch(`${discordAPI}/webhooks/${this.interaction.application_id}/${this.interaction.token}/messages/@original`, {
                content: object,
            });
            return response;
        } else {
            const { data: response } = await axios.patch(`${discordAPI}/webhooks/${this.interaction.application_id}/${this.interaction.token}/messages/@original`, {
                ...object
            });
            return response;
        }
    } catch (err) {
        throw err
    }
}

module.exports = {
    interaction_edit
}