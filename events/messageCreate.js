const axios = require('axios');

module.exports = function (eventEmitter, ws) {
    eventEmitter.on('messageCreate', async message => {
        if (message.author.bot) return;
        if (message.content == 'hi') {
            channelsend(message, 'hello')
        } else if (message.content == 'hello') {
            message.reply('hi')
        } else if (message.content == 'join') {
            ws.send(JSON.stringify({
                "op": 4,
                "d": {
                    "guild_id": "1080836090463801425",
                    "channel_id": "1109857292125491231",
                    "self_mute": false,
                    "self_deaf": false
                }
            }));
            message.reply('Done')
        } else return
    });
}
    async function channelsend(message, content) {
        try {
            const messagecontent = content;
            axios.post(`https://discord.com/api/channels/${message.channel_id}/messages`, {
                content: messagecontent,
            }, {
                headers: {
                    Authorization: `Bot ${process.env.token}`
                }
            }).then(response => {
                return response
            }).catch(error => {
                console.error(error.response.data);
            });
        } catch (err) {
            console.log(err)
        }
    }