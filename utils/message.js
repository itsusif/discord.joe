const axios = require('axios');
const { discordAPI } = require('../config.json');

async function reply(object) {
  try {
    if (!this.IsInteraction) {
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
        response.edit = edit_message.bind({ client: this.client, message: response, channel_id: this.message.channel_id, IsInteraction: false });
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
        response.edit = edit_message.bind({ client: this.client, message: response, channel_id: this.message.channel_id, IsInteraction: false });
        return response;
      }
    } else {
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
    }
  } catch (err) {
    throw err;
  }
}

async function channel_send(content) {
  try {
    const { data: response } = await axios.post(`${discordAPI}/channels/${this.channel_id}/messages`, {
      content: content,
    }, {
      headers: {
        Authorization: `Bot ${this.client.token}`
      }
    }).catch(err =>{
      throw err
    });
    response.edit = edit_message.bind({ client: this.client, message: response, channel_id: this.channel_id, IsInteraction: false });
    return response;
  } catch (err) {
    throw err;
  }
}

async function edit_message(object) {
  try {
    if (this.IsInteraction) {
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
    } else {
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
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  reply,
  channel_send,
  edit_message
};
