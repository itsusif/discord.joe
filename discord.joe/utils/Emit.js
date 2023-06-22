const { channel_send } = require('./message/channe.send');
const { message_reply } = require('./message/reply');
const { interaction_edit } = require('./interaction/edit')
const { interaction_reply } = require('./interaction/reply')
const { channel } = require('./channel');

module.exports = async (t, data) => {
    if (data.op === 0 && data.t === 'READY') {
        t.eventEmitter.emit('ready', data.d);
    } else if (data.t == 'MESSAGE_CREATE') {
        data.d.channel = await channel.bind({ client: t.client, channel_id: data.d.channel_id });
        data.d.reply = message_reply.bind({ client: t.client, message: data.d});
        data.d.channel.send = channel_send.bind({ client: t.client, channel_id: data.d.channel_id });
        t.eventEmitter.emit('messageCreate', data.d);
    } else if (data.t == 'INTERACTION_CREATE') {
        data.d.reply = interaction_reply.bind({ client: t.client, interaction: data.d });
        data.d.channel.send = channel_send.bind({ client: t.client, channel_id: data.d.channel_id });
        data.d.edit = interaction_edit.bind({ interaction: data.d })
        t.eventEmitter.emit('interactionCreate', data.d);
    }
};