const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
	],
});

// Define the channel ID, secret message ID, and correct reaction emoji
const CHANNEL_ID = '1340277521169514548'; // Replace with your channel ID
const SECRET_MESSAGE_ID = '1341110705033707540'; // Replace with your secret message ID
const CORRECT_REACTION_EMOJI = '💀'; // Use the actual emoji instead of ':skull:'

// Variable to control the reaction listener
let isChallengeActive = false;

// Event listener for reactions being added
client.on('messageReactionAdd', async (reaction, user) => {
	// Ignore reactions if the challenge is not active or if the reaction is from a bot
	if (!isChallengeActive || user.bot) return;

	// Fetch the message if it's not cached
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Error fetching the reaction:', error);
			return;
		}
	}

	// Check if the reaction is in the correct channel, on the secret message, and matches the correct emoji
	if (
		reaction.message.channel.id === CHANNEL_ID &&
		reaction.message.id === SECRET_MESSAGE_ID &&
		reaction.emoji.name === CORRECT_REACTION_EMOJI
	) {
		try {
			// Fetch the user who reacted
			const member = await reaction.message.guild.members.fetch(user.id);

			// Send a DM to the user with the message "Horus"
			await member.send('Horus').catch(() => {
				console.log(`Failed to send DM to ${user.tag}`);
			});

			console.log(`${user.tag} reacted correctly and received the DM.`);
		} catch (error) {
			console.error('Error sending DM:', error);
		}
	}
});

// Slash command to commence the challenge
module.exports = {
	data: new SlashCommandBuilder()
		.setName('secret_message')
		.setDescription('Start the challenge to unlock the Tomb of the Pharaoh.'),
	async execute(interaction) {
		try {
			// Activate the challenge
			isChallengeActive = true;

			// Acknowledge the command and provide instructions
			await interaction.reply({
				content: 'The challenge has begun! You have 10 minutes to find and react to the secret message with the 💀 emoji in the specified channel.',
				ephemeral: true,
			});

			// Set a timeout to deactivate the challenge after 10 minutes
			setTimeout(() => {
				isChallengeActive = false;
				console.log('The challenge has ended. Reaction listener is now inactive.');
			}, 10 * 60 * 1000); // 10 minutes in milliseconds
		} catch (error) {
			console.error('Error executing command:', error);
			await interaction.reply({
				content: 'There was an error starting the challenge.',
				ephemeral: true,
			});
		}
	},
};