const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {

		// Optional: Fetch the channel and message for debugging or other purposes
		const channelId = '1331407405371621428'; // Replace with your actual channel ID
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