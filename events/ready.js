const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Logged in as ${client.user.tag}!`);

		// Optional: Fetch the channel and message for debugging or other purposes
		const channelId = '1340277521169514548'; // Replace with your actual channel ID
		const channel = client.channels.cache.get(channelId);
		if (!channel) {
			console.error('Channel not found!');
			return;
		}

		try {
			// Example: Fetch the first message in the configuration for debugging
			const messageId = '1341517540827988130'; // Replace with your actual message ID
			const message = await channel.messages.fetch(messageId);
			console.log('Fetched message with ID:', message.id);
		} catch (error) {
			console.error('Failed to fetch the message:', error);
		}
	},
};