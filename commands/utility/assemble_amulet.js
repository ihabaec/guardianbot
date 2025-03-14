const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('assemble_amulet')
		.setDescription('Assemble the Sacred Amulet to unlock the flag.')
		.addStringOption(option =>
			option.setName('piece1')
				.setDescription('The first piece of the amulet.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('piece2')
				.setDescription('The second piece of the amulet.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('piece3')
				.setDescription('The third piece of the amulet.')
				.setRequired(true)),
	async execute(interaction) {
		// Ensure this command is usable in guilds
		if (!interaction.inGuild()) {
			await interaction.reply({
				content: 'This command can only be used in a server.',
				ephemeral: true,
			});
			return;
		}

		// Retrieve the inputs
		const piece1 = interaction.options.getString('piece1');
		const piece2 = interaction.options.getString('piece2');
		const piece3 = interaction.options.getString('piece3');

		// Check if the pieces are correct
		if (piece1 === 'Horus' && piece2 === 'Anubis' && piece3 === 'Ra') {
			await interaction.reply({
				content: 'The Tomb of the Pharaoh opens! The flag is: Aisec{4nub1s_w4tch3s_0v3r_y0u}',
				ephemeral: true,
			});
		} else {
			await interaction.reply({
				content: 'Incorrect. The amulet remains shattered.',
				ephemeral: true,
			});
		}
	},
};