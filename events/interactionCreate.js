const axios = require('axios');

module.exports = function (eventEmitter, ws) {
    eventEmitter.on('interactionCreate', async interaction => {
        if (!interaction.data) return;
        json = {
            "type": 4,
            "data": {
                "content": "Congrats on sending your command!"
            }
        }
        axios.post(`https://discord.com/api/v9/interactions/${interaction.id}/${interaction.token}/callback`, json).then((response) => {
            console.log(response.data)
        }).catch(err => {
            return console.log(err);
        })
    })
}