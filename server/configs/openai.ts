import OpenAI from "openai";

const openai = new OpenAI({
  // baseURL: "https://openrouter.ai/api/v1",
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.AI_API_KEY,
});

export default openai;
