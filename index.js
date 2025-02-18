const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const ReactionDMHandler = require('./events/Reactionevent.js'); // Adjust the filename if needed

// Initialize the Discord client
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
	],
});

// Load commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);
for (const folder of commandFolders) {
	const folderPath = path.join(commandsPath, folder);
	const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(folderPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Load events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client)); // Pass client to event
	} else {
		client.on(event.name, (...args) => event.execute(...args, client)); // Pass client to event
	}
}

// Centralized reaction-to-DM configuration
const config = [
	{
		messageId: '1341517540827988130', // Replace with your actual message ID
		reaction: '✅',
		dmContent: 'You reacted with the right emoji! Here\'s your reward.  | Horus | ',
	},
	{
		messageId: '1341517540827988130', // Replace with your actual message ID
		reaction: '❌',
		dmContent: 'Hocus Pocus!',
	},
];

// Initialize the ReactionDMHandler when the bot is ready
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	new ReactionDMHandler(client, config); // Pass the centralized configuration
});

// Log in to Discord
client.login(token);