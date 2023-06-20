const axios = require('axios');

module.exports = {
    channel: async function (id) {
        try {
            if (!id) {
                const response = await axios.get(`https://discord.com/api/channels/${this.channel_id}`, {
                    headers: {
                        Authorization: `Bot ${this.client.token}`
                    }
                }).catch(e => {
                    throw e
                });
                return response.data;
            } else if (id) {
                const response = await axios.get(`https://discord.com/api/channels/${this.channel_id}`, {
                    headers: {
                        Authorization: `Bot ${this.client.token}`
                    }
                }).catch(e => {
                    throw e
                });
                return response.data;
            }
        } catch (err) {
            throw err;
        }
    }
};
