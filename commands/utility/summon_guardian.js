const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('summon_guardian')
		.setDescription('Summon the Guardian of the Tomb to begin your quest.'),
	async execute(interaction) {
		await interaction.reply({
			content: 'Greetings, seeker of the Tomb of the Pharaoh. To unlock the secrets within, you must retrieve the three missing pieces of the Sacred Amulet. Begin your journey by joining the hidden sanctuary:.',
			ephemeral: true,
		});
	},
};