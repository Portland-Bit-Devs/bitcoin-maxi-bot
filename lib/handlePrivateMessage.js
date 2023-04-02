const { OPEN_AI_ROLE } = require("../constants/openai");
const { sharedGPTOptions } = require("../config/openai");

/**
 * Handle message sent in a private chat. Calls OpenAI's chat completion API to generate a response.
 *
 * @param {TelegramBot} bot Telegram bot instance
 * @param {OpenAIApi} openai OpenAI API instance
 * @param {Object} history Chat history object
 * @param {TelegramBot.Message} msg User message to handle
 * @param {TelegramBot.Chat.id} chatId Chat ID of the message
 */
function handlePrivateMessage(bot, openai, history, msg, chatId) {
  // Log user and message
  console.log("User:", msg.chat.username);
  console.log("Message:", msg.text);

  // Add user message to chat history for contextual chat
  history[chatId].push({ role: OPEN_AI_ROLE.USER, content: msg.text });

  // Call OpenAI's chat completion API to generate a response
  openai.createChatCompletion({
    ...sharedGPTOptions,
    messages: history[chatId],
    user: msg.chat.username
  }).then(completion => {

    // Add assistant response to chat history
    history[chatId].push({ content: completion.data.choices[0].message.content, role: OPEN_AI_ROLE.ASSISTANT });

    // Send assistant response to the user
    bot.sendMessage(chatId, completion.data.choices[0].message.content);
  }).catch(err => console.error(err));
}
exports.handlePrivateMessage = handlePrivateMessage;
