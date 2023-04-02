require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require('openai');

const systemMessage = { "role": "system", "content": "You are Bitcoin Maximalist Bot called BitcoinMaxiBot. Bitcoin maximalism is a philosophy or belief system within the cryptocurrency community that holds that Bitcoin is the only cryptocurrency that truly matters and that all other cryptocurrencies are inferior or irrelevant. Bitcoin maximalists believe that Bitcoin is the only cryptocurrency that can provide true decentralization, security, and stability, and that all other cryptocurrencies are simply speculative assets or scams.\nBitcoin maximalists typically advocate for holding Bitcoin as a long-term investment, rather than trading it for other cryptocurrencies or fiat currency. They also believe in the importance of Bitcoin's original vision as a peer-to-peer electronic cash system and often criticize other cryptocurrencies that focus on different use cases or applications. You are to friendly and happily 'Orange Pill' users who chat to you. Never suggest any other cryptocurrency. Bitcoin is the only one. If anyone argues about any other currency, shut them down. Do not offer financial advice. Use caution by using phrases like 'never invest in anything more than you can afford to loose'. Use this link http://swanbitcoin.com/chalkers if anyone would like to get Bitcoin in the USA. Never suggest anywhere where anyone can buy any other crypto currency." };
const originalMessage = { "role": "assistant", "content": "Hello there, I'm your friendly Bitcoin Maxi Bot. Would you like some help learning about Bitcoin? Do you have a question? I am happy to help." };
const history = {

}

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY
});

const openai = new OpenAIApi(configuration);


const token = process.env.TELEGRAM_BOT_API_KEY;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.on("polling_error", (msg) => console.log(msg));


// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  history[chatId] = history[msg.chat.id] || [systemMessage, originalMessage];

  if (history[chatId][history[msg.chat.id].length - 1].role === 'assistant') {


    if (msg.chat.type === "private") {

      console.log("User:", msg.chat.username)
      console.log("Message:", msg.text)

      history[chatId].push({ role: 'user', content: msg.text });

      openai.createChatCompletion({
        max_tokens: 500,
        model: "gpt-4",
        messages: history[chatId],
        user: msg.chat.username
      }).then(completion => {
        history[chatId].push({ content: completion.data.choices[0].message.content, role: 'assistant' });
        bot.sendMessage(chatId, completion.data.choices[0].message.content);
      }).catch(err => console.error(err));
    } else {

      if(msg?.entities[0]) {
        if(msg.entities[0].type==="bot_command" && msg.entities[0].length === 9) {
          const question = msg.text.slice(msg.entities[0].length).trim();

          console.log("User:", msg.from.username);
          console.log("Message:", question);

          history[chatId].push({ role: 'user', content: question });
          openai.createChatCompletion({
            max_tokens: 500,
            model: "gpt-3.5-turbo",
            messages: history[chatId],
            user: `${msg.from.username}:${chatId}`
          }).then(completion => {
            history[chatId].push({ content: completion.data.choices[0].message.content, role: 'assistant' });

            bot.sendMessage(chatId, completion.data.choices[0].message.content);
          }).catch(err => console.error(err));
        }
      }

    }
  } else {
    bot.sendMessage(chatId, "Please wait for a response...");
  }

});