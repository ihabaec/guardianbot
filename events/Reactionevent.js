function buildReverseSearch(config) {
	return config.reduce((index, conf) => {
		if (!index[conf.messageId]) {
			index[conf.messageId] = {};
		}
		index[conf.messageId][conf.reaction] = conf.dmContent;
		return index;
	}, {});
}

class ReactionDMHandler {
	constructor(client, config) {
		this.reverseConfig = buildReverseSearch(config);
		this.addReaction = this.addReaction.bind(this);
		client.on('messageReactionAdd', this.addReaction);
	}

	async addReaction(reaction, user) {
		try {
			// Ignore reactions from bots
			if (user.bot) return;

			// Fetch the full reaction and user objects if they are partial
			if (reaction.partial) {
				try {
					await reaction.fetch();
				} catch (error) {
					console.error('Failed to fetch reaction:', error);
					return;
				}
			}

			// Ensure the reaction is on a valid message
			const messageId = reaction.message.id;
			const emoji = reaction.emoji.name || reaction.emoji.id;

			if (!this.reverseConfig[messageId] || !this.reverseConfig[messageId][emoji]) {
				return; // No matching configuration for this reaction
			}

			// Retrieve the DM content based on the reaction
			const dmContent = this.reverseConfig[messageId][emoji];

			// Send the DM to the user
			try {
				await user.send(dmContent);
				console.log(`Sent DM to ${user.tag}: "${dmContent}"`);
			} catch (error) {
				console.error(`Failed to send DM to ${user.tag}:`, error);
			}
		} catch (error) {
			console.error('An error occurred in the messageReactionAdd event:', error);
		}
	}

	teardown() {
		this.client.off('messageReactionAdd', this.addReaction);
	}
}

module.exports = ReactionDMHandler;