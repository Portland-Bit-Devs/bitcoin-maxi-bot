const { OPEN_AI_ROLE } = require("../constants/openai");
const { sharedGPTOptions } = require("../config/openai");

/**
 * Handle message sent in a group chat. Calls OpenAI's chat completion API to generate a response.
 *
 * @param {TelegramBot} bot Telegram bot instance
 * @param {OpenAIApi} openai OpenAI API instance
 * @param {Object} history Chat history object
 * @param {TelegramBot.Message} msg User message to handle
 * @param {TelegramBot.Chat.id} chatId Chat ID of the message
 */
function handleGroupMessage(bot, openai, history, msg, chatId) {
  // Check if message has entities and the first entity is a bot command with a length of 9
  if (msg?.entities[0]) {
    if (msg.entities[0].type === "bot_command" && msg.entities[0].length === 9) {

      // Extract the question from the message text
      const question = msg.text.slice(msg.entities[0].length).trim();

      // Log the user's question
      console.log("User:", msg.from.username);
      console.log("Message:", question);

      // Save the user's question to the chat history for contextual chat
      history[chatId].push({ role: OPEN_AI_ROLE.USER, content: question });

      // Call the OpenAI API to generate a response
      openai.createChatCompletion({
        ...sharedGPTOptions,
        messages: history[chatId],
        user: `${msg.from.username}:${chatId}`
      }).then(completion => {

        // Add assistant response to chat history
        history[chatId].push({ content: completion.data.choices[0].message.content, role: OPEN_AI_ROLE.ASSISTANT });

        // Send assistant response to the user
        bot.sendMessage(chatId, completion.data.choices[0].message.content);
      }).catch(err => console.error(err));
    }
  }
}
exports.handleGroupMessage = handleGroupMessage;
