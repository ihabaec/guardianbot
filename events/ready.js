const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		// THIS IS JUST FOR TESTING: to check if the message exists.
		const channelId = '1331407405371621428';
		const channel = client.channels.cache.get(channelId);
		if (!channel) {
			console.error('Channel not found!');
			return;
		}

		try {
			const messageId = '1360627599126036560';
			const message = await channel.messages.fetch(messageId);
			console.log('Fetched message with ID:', message.id);
		} catch (error) {
			console.error('Failed to fetch the message:', error);
		}
	},
};