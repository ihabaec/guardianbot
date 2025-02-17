/* eslint-disable quotes */
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commence_challenge')
		.setDescription('Start the challenge to unlock the Tomb of the Pharaoh.'),
	async execute(interaction) {
		try {
			// Define the cryptic message
			const message = `**𓋹 𓂀 𝕿𝖍𝖊 𝕿𝖗𝖎𝖆𝖑 𝕭𝖊𝖌𝖎𝖓𝖘... 𓂀 𓋹**\n\n` +
			`> *"Greetings, seeker of the Tomb of the Pharaoh. The path ahead is veiled in shadow, and only the worthy shall restore the Sacred Amulet. ` +
			`Its three fragments are lost—hidden beyond the reach of mere mortals. Seek them, if you dare."*\n\n` +
			`**𓋹 The First Fragment**\n` +
			`> *Within the sanctum of the unseen, power is bestowed upon those who bear the mark. But marks are not given freely—they must be uncovered, ` +
			`revealed only to those who know where to look.*\n\n` +
			`**𓂀 The Second Fragment**\n` +
			`> *Time buries all, yet some wounds never heal. A god’s loss, an offering to darkness—name what was taken, and the sands may shift in your favor.*\n\n` +
			`**𓆣 The Third Fragment**\n` +
			`> *Echoes of the ancients reside in a vault beyond this realm, guarded by the one who set this trial. The key is buried within the fifth hymn, ` +
			`but which melody will guide you forward?*\n\n` +
			`**"Once the three are in your grasp, invoke \`/assemble_amulet\` in this DM. But beware, for the Tomb does not suffer fools lightly…"** ⚖️💀`;

			// Send a DM to the user with the riddle
			await interaction.user.send(message);

			// Reply in the server to confirm the challenge has started
			await interaction.reply({
				content: '🔮 **The sands shift, and the trial begins...** Check your DMs for further instructions. 🏺',
				ephemeral: true,
			});
		}
		catch (error) {
			console.error('Error sending DM:', error);
			await interaction.reply({
				content: '⚠️ **The whispers of the Tomb cannot reach you...** Open your DMs and try again.',
				ephemeral: true,
			});
		}
	},
};
