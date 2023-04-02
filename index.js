// Load environment variables from .env file
require('dotenv').config();

// Import necessary packages
const TelegramBot = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require('openai');
const { onMessage } = require("./lib/onMessage.js");
const { onPollingError } = require("./lib/onPollingError");

// Define chat history object to keep track of messages sent and received
const history = {

};

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY
});
const openai = new OpenAIApi(configuration);

// Retrieve Telegram Bot API token from environment variable
const token = process.env.TELEGRAM_BOT_API_KEY;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Log polling errors
bot.on("polling_error", onPollingError);

// Listen for any kind of message
bot.on('message', (msg) => onMessage(bot, openai, history, msg));
