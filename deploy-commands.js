const { REST, Routes } = require('discord.js');
const { clientId, guildIds, token } = require('./config.json');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands', 'utility');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(path.join(commandsPath, file));
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log('Registering slash commands...');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildIds[0]),
			{ body: [commands.find(cmd => cmd.name === 'summon_guardian')] },
		);

		// Register commands for the private server
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildIds[1]),
			{ body: commands.filter(cmd => cmd.name === 'assemble_amulet' || cmd.name === 'commence_challenge') },
		);

		console.log('Slash commands registered successfully!');
	}
	catch (error) {
		console.error('Error registering slash commands:', error);
	}
})();