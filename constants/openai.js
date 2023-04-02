// Description: This file contains the constants for the OpenAI API

const OPENAI_MODEL = {
  // OpenAI's GPT-3 turbo model
  GPT_3_TURBO: "gpt-3-turbo",
  // OpenAI's latest GPT-4 model
  GPT_4: "gpt-4"
};

const OPEN_AI_ROLE = {
  // This is the role of the assistant responses
  ASSISTANT: "assistant",
  // This is the role of the user's messages
  USER: "user",
  // The system role is used for to prepare assistant's responses
  SYSTEM: "system"
};

module.exports = {
  OPENAI_MODEL,
  OPEN_AI_ROLE
}