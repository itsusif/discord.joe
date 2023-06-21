require('dotenv').config();

const { Client, Embed } = require('./discord.joe');
const client = new Client(process.env.token, { intents: 32767 });

client.on('ready', (client) => {
    console.log(`${client.user.username} started`)
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content == 'hey') {
        let embed1 = new Embed()
            .setTitle('Title')
            .setColor(16711680)
            .setDescription('Description');

        let embed2 = new Embed()
            .setTitle('Title 2')
            .setColor(16711680)
            .setDescription('Description 2');
        message.reply({ content: 'HELLO', embeds: [embed1, embed2] });
    } else if (message.content == 'hello') {
        message.reply('HEY').then((msg) =>{
            msg.edit('hey').catch(()=>{
                return
            })
        }).catch(() =>{
            return
        })
    }
});

client.on('interactionCreate', (interaction) => {
    let embed1 = new Embed()
        .setTitle('', 'https://discord.com')
        .setColor('#FF0000')
        .setDescription('Description')
        .setTimestamp()
        .setAuthor('hey', 'https://discord.com', 'https://cdn.discordapp.com/avatars/833340407130882068/3b05b3c7148a3e5769a06aad794df096.png?size=4096')
        .setThumbnail('https://cdn.discordapp.com/avatars/833340407130882068/3b05b3c7148a3e5769a06aad794df096.png?size=4096')
        .setImage('https://cdn.discordapp.com/avatars/833340407130882068/3b05b3c7148a3e5769a06aad794df096.png?size=4096')
        .setFooter('hey', 'https://cdn.discordapp.com/avatars/833340407130882068/3b05b3c7148a3e5769a06aad794df096.png?size=4096')
        .addFields(
            { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true }
        )
        .addFields(
            { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true }
        )
        .addFields([
            { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true }
        ])
        .addField('Inline field title2', 'Some value here', true);

        interaction.reply('HSS')
    interaction.channel.send('a').then((msg) =>{
        msg.edit({
            content: 'hd',
            embeds: [],
        })
    }).catch(err => {
        return console.log(err);
    });

});

client.connect();