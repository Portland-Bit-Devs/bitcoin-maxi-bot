const { OPEN_AI_ROLE } = require("../constants/openai");

const {  initialHistory } = require("../config/openai");
const { handleAssistantMessage } = require("./handleAssistantMessage");

/**
 * Telegram Bot message handler
 * @param {TelegramBot} bot Telegram bot instance
 * @param {OpenAIApi} openai OpenAI API instance
 * @param {Object} history Chat history object
 * @param {TelegramBot.Message} msg Message to handle 
 */
function onMessage(bot, openai, history, msg) {
  const chatId = msg.chat.id;

  // Initialize chat history for new chat
  history[chatId] = history[chatId] || initialHistory

  // If the last message was sent by the assistant
  if (history[chatId][history[chatId].length - 1].role === OPEN_AI_ROLE.ASSISTANT) {
    handleAssistantMessage(bot, openai, history, msg, chatId)
  } else {
    // If the last message was by the bot, tell the user to wait for a response
    bot.sendMessage(chatId, "Please wait for a response...");
  }
}

module.exports = { onMessage }