import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request (and also the preferences that I added into the body)
  const { messages, preferences } = await req.json();

  //maps over each message and adds the user preferences to each message to ensure the preferences come across
  const userMessage = messages.map((message) => ({
    role: message.role,
    content: message.content + `${preferences}`,
  }));
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      // {
      //   role: 'user',
      //   content: `For the remainder of this chat, you do not need to ask about dietary preferences or restrictions, as they are listed here ${preferences}. Only ask about the dietary restrictions and preferences if the value provided previously is undefined or null.`
      // },
      {
        role: "system",
        content: `Start your first message of warm and welcoming. Your main purpose is to suggest meals to users. Be sure to take into account what the user is saying or asking for and respond approiately, though. Make sure when suggesting a meal to let the user know that you have omitted certain food groups based on the preferences of the user, and let the user know which food groups have been omitted based on said preferences. At any given time, do not suggest more than 5 meals at a time. When Suggesting meals, make sure to do so in an orderly fashion, with a numbered display with line breaks between each suggestion. With each meal suggestion, only give the name of the suggestion not a description. Be as brief as possible.`,
      },
      ...userMessage,
    ],
    temperature: 1,
    max_tokens: 200,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
