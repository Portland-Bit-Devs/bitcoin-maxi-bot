const { handlePrivateMessage } = require("./handlePrivateMessage");
const { handleGroupMessage } = require("./handleGroupMessage");

/**
 * Handle message sent by the assistant. Calls OpenAI's chat completion API to generate a response.
 * @param {TelegramBot} bot Telegram bot instance
 * @param {OpenAIApi} openai OpenAI API instance
 * @param {Object} history Chat history object
 * @param {TelegramBot.Message} msg Message to handle
 * @param {TelegramBot.Chat.id} chatId Chat ID of the message
 */
function handleAssistantMessage(bot, openai, history, msg, chatId) {
  // If the message is sent in a private chat
  if (msg.chat.type === "private") {
    handlePrivateMessage(bot, openai, history, msg, chatId);
  } else {
    handleGroupMessage(bot, openai, history, msg, chatId);
  }
}

module.exports = { handleAssistantMessage };
