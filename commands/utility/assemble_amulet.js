const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Start the reset timer when the bot loads
startAttemptsResetTimer();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('assemble_amulet')
		.setDescription('Assemble the Sacred Amulet to unlock the flag.')
		.addStringOption(option =>
			option.setName('fragment1')
				.setDescription('The first fragment of the amulet.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('fragment2')
				.setDescription('The second fragment of the amulet.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('fragment3')
				.setDescription('The third fragment of the amulet.')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply({
			content: '⏳ **The fragments hum with the essence of forgotten gods...** The Tomb now weighs your soul and your tribute.',
			ephemeral: true,
		});

		// Retrieve the inputs
		const fragment1 = interaction.options.getString('fragment1');
		const fragment2 = interaction.options.getString('fragment2');
		const fragment3 = interaction.options.getString('fragment3');

		// Track attempts for the user
		const userId = interaction.user.id;
		const userAttempts = trackAttempt(userId, false); // Initially mark as failure

		// If user has failed too many times
		if (userAttempts.attempts >= 3 && !userAttempts.completed) {
			await interaction.followUp({
				content: '🔒 **The Tomb has sealed its judgment.** The spirits of the Duat have turned their gaze from you. You are deemed unworthy.',
				ephemeral: true,
			});
			return;
		}

		// Check if the pieces are correct - using the actual answers from our puzzles
		const isFragment1Correct = checkFirstFragment(fragment1);
		const isFragment2Correct = checkSecondFragment(fragment2);
		const isFragment3Correct = checkThirdFragment(fragment3);

		// If all fragments are correct
		if (isFragment1Correct && isFragment2Correct && isFragment3Correct) {
			// Mark as completed
			updateAttemptStatus(userId, true);

			// Record the successful flag retrieval with timestamp
			recordFlagRetrieval(userId, interaction.user.tag);

			// Success message with the flag
			const successMessage = '🏺 **The Sacred Amulet blazes with divine light!**\n\n' +
				'The fragments bind in perfect harmony, restoring the relic’s eternal form. ' +
				'The Tomb of the Pharaoh creaks open, and from within, the sacred truth is revealed:\n\n' +
				'`Aisec{4nub1s_w4tch3s_0v3r_y0u}`';


			await interaction.followUp({
				content: successMessage,
				ephemeral: true,
			});
		} else {
			// Count which fragments were incorrect
			const incorrectParts = [];
			if (!isFragment1Correct) incorrectParts.push('first');
			if (!isFragment2Correct) incorrectParts.push('second');
			if (!isFragment3Correct) incorrectParts.push('third');

			const remainingAttempts = 3 - userAttempts.attempts;

			const failureMessage = '⚠️ **The fragments tremble and recoil...**\n\n' +
			`The ${incorrectParts.join(' and ')} fragment${incorrectParts.length > 1 ? 's have' : ' has'} defied the sacred alignment. ` +
			`The gods stir with displeasure. ${remainingAttempts > 0 ? `You remain under divine scrutiny. ${remainingAttempts} sacred attempt${remainingAttempts > 1 ? 's' : ''} remain.` : 'The last grain of sand has fallen. The Tomb condemns you to eternal silence.'}\n\n` +
			'Ponder the celestial riddles and return with wisdom. _By decree of divine mercy, your spirit is spared._ When the hourglass turns—**15 minutes hence**—you may return to the gates of judgment.';
			await interaction.followUp({
				content: failureMessage,
				ephemeral: true,
			});
		}
	},
};

function checkFirstFragment(answer) {
	// First fragment answer (from the hidden role puzzle)
	const correctAnswer = 'SOLAR'; // Replace with your actual answer if needed

	// Add null/undefined check before calling toUpperCase()
	if (!answer) return false;

	return answer.toUpperCase() === correctAnswer;
}

function checkSecondFragment(answer) {
	// Osiris puzzle answer
	// Add null/undefined check
	const correctAnswer = 'zebiyb';
	if (!answer) return false;
	return answer === correctAnswer;
}

function checkThirdFragment(answer) {
	// Curator's enigma answer
	const correctAnswer = 'anideM-le-rieD66Rhind';

	// Add null/undefined check
	if (!answer) return false;

	return answer === correctAnswer;
}

function trackAttempt(userId, success = false) {
	// Get the data directory - create if not exists
	const dataDir = path.join(__dirname, '../data');
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir, { recursive: true });
	}

	const attemptsPath = path.join(dataDir, 'amulet_attempts.json');

	// Read current attempts
	let attempts = {};
	if (fs.existsSync(attemptsPath)) {
		attempts = JSON.parse(fs.readFileSync(attemptsPath));
	}

	// Initialize user if not exists
	if (!attempts[userId]) {
		attempts[userId] = { attempts: 0, completed: false };
	}

	// If not already marked as successful, increment attempts
	if (!attempts[userId].completed && !success) {
		attempts[userId].attempts += 1;
	}

	// Save updated attempts
	fs.writeFileSync(attemptsPath, JSON.stringify(attempts, null, 2));

	return attempts[userId];
}

function updateAttemptStatus(userId, completed) {
	// Get the data directory
	const dataDir = path.join(__dirname, '../data');
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir, { recursive: true });
	}

	const attemptsPath = path.join(dataDir, 'amulet_attempts.json');

	// Read current attempts
	let attempts = {};
	if (fs.existsSync(attemptsPath)) {
		attempts = JSON.parse(fs.readFileSync(attemptsPath));
	}

	// Initialize user if not exists
	if (!attempts[userId]) {
		attempts[userId] = { attempts: 0, completed: false };
	}

	// Update completed status
	attempts[userId].completed = completed;

	// Save updated attempts
	fs.writeFileSync(attemptsPath, JSON.stringify(attempts, null, 2));
}

function recordFlagRetrieval(userId, userTag) {
	// Get the data directory
	const dataDir = path.join(__dirname, '../data');
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir, { recursive: true });
	}

	const flagLogPath = path.join(dataDir, 'flag_retrievals.json');

	// Read current log
	let flagLog = {};
	if (fs.existsSync(flagLogPath)) {
		flagLog = JSON.parse(fs.readFileSync(flagLogPath));
	}

	// Add new entry with timestamp
	const now = new Date();
	flagLog[userId] = {
		userTag: userTag,
		timestamp: now.toISOString(),
		flag: 'Aisec{4nub1s_w4tch3s_0v3r_y0u}',
		readableTime: now.toLocaleString(),
	};

	fs.writeFileSync(flagLogPath, JSON.stringify(flagLog, null, 2));

	console.log(`Flag retrieved by ${userTag} (${userId})`);
}
function startAttemptsResetTimer() {
	// Function to reset all attempts
	function resetAllAttempts() {
		try {
			const dataDir = path.join(__dirname, '../data');
			const attemptsPath = path.join(dataDir, 'amulet_attempts.json');

			// Check if the file exists
			if (fs.existsSync(attemptsPath)) {
				// Read current attempts - handle empty file case
				let attempts = {};
				const fileContent = fs.readFileSync(attemptsPath, 'utf8');

				// Only try to parse if the file has content
				if (fileContent && fileContent.trim() !== '') {
					attempts = JSON.parse(fileContent);
				}

				// Reset attempts for all users who haven't completed
				for (const userId in attempts) {
					if (!attempts[userId].completed) {
						attempts[userId].attempts = 0;
					}
				}

				// Save updated attempts
				fs.writeFileSync(attemptsPath, JSON.stringify(attempts, null, 2));

				console.log(`[${new Date().toLocaleString()}] Reset attempts for all users.`);
			} else {
				// If file doesn't exist, create an empty one
				if (!fs.existsSync(dataDir)) {
					fs.mkdirSync(dataDir, { recursive: true });
				}
				fs.writeFileSync(attemptsPath, JSON.stringify({}, null, 2));
				console.log(`[${new Date().toLocaleString()}] Created empty attempts file.`);
			}
		} catch (error) {
			console.error(`Error resetting attempts: ${error.message}`);
		}
	}

	// Set interval to reset attempts every 30 minutes
	const RESET_INTERVAL = 30 * 60 * 1000; // 30 minutes in milliseconds
	setInterval(resetAllAttempts, RESET_INTERVAL);
	console.log(`Attempts reset timer started. Will reset every ${RESET_INTERVAL / 60000} minutes.`);
}