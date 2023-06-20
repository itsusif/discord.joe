const { reply, channel_send } = require('./message');
// const { reply, channel_send } = require('./interaction');
const { channel } = require('./channel');

module.exports = async (t, data) => {
    if (data.op === 0 && data.t === 'READY') {
        t.eventEmitter.emit('ready', data.d);
    } else if (data.t == 'MESSAGE_CREATE') {
        console.log(data)
        data.d.channel = await channel.bind({ client: t.client, channel_id: data.d.channel_id });
        data.d.reply = reply.bind({ client: t.client, message: data.d, IsInteraction: false });
        data.d.channel.send = channel_send.bind({ client: t.client, channel_id: data.d.channel_id });
        t.eventEmitter.emit('messageCreate', data.d);
    } else if (data.t == 'INTERACTION_CREATE') {
        data.d.reply = reply.bind({ client: t.client, interaction: data.d, IsInteraction: true});
        data.d.channel.send = channel_send.bind({ client: t.client, channel_id: data.d.channel_id });
        t.eventEmitter.emit('interactionCreate', data.d);
    }
};