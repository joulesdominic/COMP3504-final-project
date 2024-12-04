import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const schema = {
  properties: {
      title: "Title",
      child_name: "Name",
      child_age: "Age",
      topic: "Topic",
      genre: "Genre"
  },
  title: "Story Book",
  story: {
    text: "story"
  }
};

export async function getGroqChatCompletion(prompt) {
    try {
      const jsonSchema = JSON.stringify(schema, null, 1);
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a children's book database that outputs stories in JSON. The JSON object must use the schema: ${jsonSchema}`,
          },
          {
            role: "user",
            content: prompt,
          }
        ],
        model: "llama3-8b-8192",
        temperature: 0,
        stream: false,
        response_format: { type: "json_object"},
      });

      return response;
    } catch (e) {
      console.log(e);
    }
}

