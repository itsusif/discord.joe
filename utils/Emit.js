const { reply, channel_send, edit_message } = require('./message');
const { channel } = require('./channel');

module.exports = async (t, data) => {
    if (data.op === 0 && data.t === 'READY') {
        t.eventEmitter.emit('ready', data.d);
    } else if (data.t == 'MESSAGE_CREATE') {
        data.d.channel = await channel.bind({ client: t.client, channel_id: data.d.channel_id });
        data.d.reply = reply.bind({ client: t.client, message: data.d, IsInteraction: false });
        data.d.channel.send = channel_send.bind({ client: t.client, channel_id: data.d.channel_id });
        data.d.edit = edit_message.bind({ client: t.client, message: data.d, channel_id: data.d.channel_id, IsInteraction: false });
        t.eventEmitter.emit('messageCreate', data.d);
    } else if (data.t == 'INTERACTION_CREATE') {
        data.d.reply = reply.bind({ client: t.client, interaction: data.d, IsInteraction: true });
        data.d.channel.send = channel_send.bind({ client: t.client, channel_id: data.d.channel_id });
        data.d.edit = edit_message.bind({ client: t.client, interaction: data.d, IsInteraction: true });
        t.eventEmitter.emit('interactionCreate', data.d);
    }
};