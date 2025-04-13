/* eslint-disable quotes */
const { SlashCommandBuilder } = require('discord.js');
const crypto = require('crypto');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commence_challenge')
		.setDescription('⚡ Awaken the divine trial to enter the Tomb of the Pharaoh.'),
	async execute(interaction) {
		try {
			// IMPORTANT: Reply to the interaction FIRST to avoid timeout
			await interaction.reply({
				content: '🔮 **The sands stir, and the veil between worlds thins...** The gods have taken notice. Their whispers now echo in your private scrolls. ☥',
				ephemeral: true,
			});

			// Generate a unique participant code based on user ID
			const participantHash = crypto.createHash('sha256')
				.update(interaction.user.id + 'RamessesTombSeeker')
				.digest('hex').substring(0, 8);

			// Define the introduction message
			const introMessage = `**𓊽𓏏𓇋𓀁 𝕿𝖍𝖊 𝕲𝖗𝖊𝖆𝖙 𝕿𝖔𝖒𝖇 𝕬𝖜𝖆𝖐𝖊𝖓𝖘... 𓂀𓋹**\n\n` +
			`> *"O Seeker of the Sacred Amulet of Ramose, heed the voice of the gods. The sands of time have summoned you. \n` +
			`Only those whose minds shine brighter than the midday sun shall restore that which has been lost. Your divine journey begins now, marked by the glyph: **${participantHash}**."*\n\n` +
			`⚱️ *Three fragments lie hidden. Reclaim them to restore the relic of eternity.*`;

			const firstFragmentMessage = `**𓅓 The First Fragment – "The Unseen Observer's Mark" 𓅓**\n\n` +
			`> *"Ra's gaze sees all that mortals overlook. Hidden within the hieroglyphs of your digital essence lies the first key. \n` +
			`Seek the name that blazes like Aten's fire, yet remains cloaked in the realm of shadows. \n` +
			`Only the learned shall decipher what governs sight itself.The sacred mark slumbers. \n` +
			`Unveil it, and the first veil shall be lifted."* 🌞👁️\n\n` +
			`> *To commune with the digital realm and uncover this mystery, the ancients have granted you these sacred keys:*\n\n` +
			`> \`Observer Token: MTM2MDc1NTk5MDAxMzY3NzcwNA.GVQxZf.dWwpJlAOUKyIIDhUKRxyXMMhLpz6SlpL5N_Vfc\`\n\n` +
			`> *Invoke this command to reveal what lies hidden:*\n\n`;

			// Define the second fragment challenge
			const secondFragmentMessage = `**𓂧 The Second Fragment – “Osiris’s Lament” 𓂧**\n\n` +
			`> *"Scattered by betrayal, Osiris's form was never whole again.\n` +
			`In the shrine of echoes, not all offerings are accepted. Many are refused, left to rot in the sand.\n` +
			`When twilight meets dawn (${Buffer.from('tum').toString('base64').split('').reverse().join('')}${Buffer.from('tumtumsahur').toString('base64').split('').reverse().join('')}), and the 14th glyph calls forth judgement, one truth will shine.\n` +
			`Choose carefully which mark you present... the wrong gesture may awaken only silence."* ⚖️🖤`;

			// Define the third fragment challenge
			const thirdFragmentMessage = `**𓆣 The Third Fragment – “The Curator’s Enigma” 𓆣**\n\n` +
			`> *"A faceless figure kneels, offering a statue of a child Pharaoh. His touch forbidden, crowned with blooms.\n` +
			`In the village where tomb-makers carved for eternity, the statue's secrets lay hidden.\n` +
			`To awaken the relic, speak the trinity that binds the statue: \n` +
			`— the village where it was born, \n` +
			`— the years the ruler reigned, \n` +
			`— the one who unearthed it. \n` +
			`Link each with a dash to solve."* 🌫️📜🦂`;


			// Define the conclusion with instructions
			const conclusionMessage = `**𓂀 When the three fragments rest in your grasp, invoke:**\n` +
			`\`/assemble_amulet [fragment1] [fragment2] [fragment3]\`\n\n` +
			`☠️ *Beware: should you falter thrice, the tomb shall seal for eternity, and the gods shall turn their backs.*\n\n` +
			`🔑 **Challenge ID:** \`${participantHash}\` — *Present this before the High Priests should divine aid be required.*`;

			// Now send DMs after responding to the interaction
			try {
				await interaction.user.send(introMessage);
				await new Promise(resolve => setTimeout(resolve, 500));

				await interaction.user.send(firstFragmentMessage);
				await new Promise(resolve => setTimeout(resolve, 500));

				await interaction.user.send(secondFragmentMessage);
				await new Promise(resolve => setTimeout(resolve, 500));

				await interaction.user.send(thirdFragmentMessage);
				await new Promise(resolve => setTimeout(resolve, 500));

				await interaction.user.send(conclusionMessage);
			} catch (dmError) {
				console.error('Error sending DM:', dmError);
				await interaction.followUp({
					content: '⚠️ **The Tomb cannot reach you through the divine scrolls.** Please enable private messages and summon the challenge again. 🕯️',
					ephemeral: true,
				});
			}
		}
		catch (error) {
			console.error('Error initiating challenge:', error);
		}
	},
};
