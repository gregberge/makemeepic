import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt, level } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    stream: true,
    temperature: 1.1,
    messages: [
      {
        role: "user",
        content: `
Given a CV, generate titles for the person, with the following constraints:
- Example of Output: "Daenerys Targaryen, the First of Her Name, Queen of the Andals and the First Men, Protector of the Seven Kingdoms, the Mother of Dragons, the Khaleesi of the Great Grass Sea, the Unburnt, the Breaker of Chains.
- One line with every titles.
- Between 8 and 10 titles.
- The input will be a CV of a person.
- Make it epic and fun!
- No multiple propositions.
- In the language of the CV.

Resume of CV:
${prompt}
"
`.trim(),
      },
      ...Array.from({ length: level }, () => ({
        role: "user" as const,
        content: "More epic",
      })),
    ],
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
