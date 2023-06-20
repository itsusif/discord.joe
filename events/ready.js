const axios = require('axios');
module.exports = function (eventEmitter, ws) {
    eventEmitter.on('ready', async client => {
        ws.send(JSON.stringify({
            "op": 4,
            "d": {
                "guild_id": "1080836090463801425",
                "channel_id": "1118365316624433223",
                "self_mute": false,
                "self_deaf": true
            }
        }))

        const url = 'https://discord.com/api/v10/applications/1104127225919459409/commands';
        const data = {
            'name': 'blep',
            'type': 1,
            'description': 'Send a random adorable animal photo',
            'options': [
                {
                    'name': 'animal',
                    'description': 'The type of animal',
                    'type': 3,
                    'required': true,
                    'choices': [
                        {
                            'name': 'Dog',
                            'value': 'animal_dog',
                        },
                        {
                            'name': 'Cat',
                            'value': 'animal_cat',
                        },
                        {
                            'name': 'Penguin',
                            'value': 'animal_penguin',
                        },
                    ],
                },
                {
                    'name': 'only_smol',
                    'description': 'Whether to show only baby animals',
                    'type': 5,
                    'required': false,
                },
            ],
        };
        const headers = {
            'Authorization': `Bot ${process.env.token}`,
        };

        axios.post(url, data, { headers })
            .then((response) => {
                // console.log(response.data);
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    })
}