# Tomb of the Pharaoh - Discord CTF Bot

A customizable Discord bot designed for Capture The Flag (CTF) challenges with an ancient Egyptian theme. This bot creates an interactive puzzle experience where players must find three fragments of a sacred amulet to unlock a flag.

## Features

- **Themed Interaction**: Immersive ancient Egyptian themed messages and challenge design
- **Multi-Stage Challenge**: Three distinct puzzle fragments players must collect
- **DM-Based Gameplay**: Sends puzzle instructions via direct messages to participants
- **Rate Limiting**: Limits incorrect attempts (3 per 15 minutes) to prevent brute forcing
- **Progress Tracking**: Tracks user attempts and completions
- **Flag Redemption**: Validates solutions and awards flags upon successful completion

## Commands

### Player Commands

- `/commence_challenge`: Starts the challenge and sends puzzle instructions via DM
- `/assemble_amulet [fragment1] [fragment2] [fragment3]`: Allows players to submit their answers
- `/summon_guardian`: Provides initial instructions for the challenge

### Discord Reaction System

The bot also includes a reaction-based hint system:
- Reacting with ✅ to specific messages will DM players with correct hints
- Reacting with other emojis will DM an alternative response

## Setup and Configuration

1. Clone this repository
2. Install dependencies with `npm install`
3. Create a `config.json` file with your Discord bot token:
   ```json
   {
     "token": "YOUR_DISCORD_BOT_TOKEN"
   }
   ```
4. Customize the challenge by modifying:
   - The correct answers in the `checkFirstFragment`, `checkSecondFragment`, and `checkThirdFragment` functions
   - The flag string in the success message
   - The challenge riddles in the `commence_challenge` command
   - The reaction message IDs in the `mssgId` variable

5. Run the bot with `node index.js`

## Project Structure

- `index.js`: Main bot initialization and configuration
- `commands/`: Folder containing all slash commands
  - `assemble_amulet.js`: Command for submitting answers
  - `commence_challenge.js`: Command for starting the challenge
  - `summon_guardian.js`: Command for initial instructions
- `events/`: Event handlers for Discord events
  - `Reactionevent.js`: Handles emoji reactions for the hint system
- `data/`: Data storage for tracking attempts and completions (created automatically)

## Customization

This bot is designed to be easily customizable for different CTF themes:

1. Modify the puzzle descriptions and difficulty in `commence_challenge.js`
2. Change the answers in the `assemble_amulet.js` file
3. Update the flag format in the success message
4. Adjust the cooldown timing in `startAttemptsResetTimer()`

## License

This project is publicly available and free to use for CTF events and educational purposes. Feel free to modify and adapt it for your own CTF competitions!

If you use this bot or draw inspiration from it for your CTF events, I'd appreciate a small acknowledgment like "Inspired by ihabaec" in your project documentation.

## Contributing

Contributions, bug reports, and feature requests are welcome! Feel free to open an issue or submit a pull request.
