# Bitcoin Maximalist Telegram Bot

This is a Telegram bot built with Node.js that acts as a Bitcoin Maximalist assistant. It uses the OpenAI API to generate responses to user messages and educate them about Bitcoin.


## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/bitcoin-maxi-bot.git

```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory and add your Telegram Bot API key and OpenAI API key:

```env
TELEGRAM_BOT_API_KEY=YOUR_TELEGRAM_BOT_API_KEY
OPEN_AI_API_KEY=YOUR_OPENAI_API_KEY
```

## Usage

Run the bot with the following command:

```bash
npm run dev
```

The bot will start listening for messages on Telegram. You can interact with it by sending messages to the bot in a Telegram chat.

## Dependencies

* dotenv
* node-telegram-bot-api
* openai


## License

This project is licensed under the MIT License.