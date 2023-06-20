const axios = require('axios');

module.exports = {
  reply: async function (data) {
    try {
      console.log(data)
      if (!this.IsInteraction) {
        if (typeof data == 'string') {
          const response = await axios.post(`https://discord.com/api/channels/${this.message.channel_id}/messages`, {
            content: data,
            message_reference: {
              message_id: this.message.id
            }
          }, {
            headers: {
              Authorization: `Bot ${this.client.token}`
            }
          });
          return response;
        } else {
          const response = await axios.post(`https://discord.com/api/channels/${this.message.channel_id}/messages`, {
            ...data,
            message_reference: {
              message_id: this.message.id
            }
          }, {
            headers: {
              Authorization: `Bot ${this.client.token}`
            }
          });
          return response;
        }
      } else {
        if (typeof data == 'string') {
          const response = await axios.post(`https://discord.com/api/v9/interactions/${this.interaction.id}/${this.interaction.token}/callback`, {
            type: 4,
            data: { content: data },
            message_reference: {
              message_id: this.id
            }
          });
          return response;
        } else {
          const response = await axios.post(`https://discord.com/api/v9/interactions/${this.interaction.id}/${this.interaction.token}/callback`, {
            type: 4,
            data: { ...data },
            message_reference: {
              message_id: this.id
            }
          });
          return response;
        }
      }
    } catch (err) {
      throw err;
    }
  },
  channel_send: async function (content) {
    try {
      const response = await axios.post(`https://discord.com/api/channels/${this.channel_id}/messages`, {
        content: content,
      }, {
        headers: {
          Authorization: `Bot ${this.client.token}`
        }
      }).catch(error => {
        throw err
      });
      return response
    } catch (err) {
      throw err
    }
  }
};
