import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { signText } from "@/lib/signature";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const params: Record<string, unknown> = await req.json();

  if (typeof params.prompt !== "string") {
    throw new Error("Invalid prompt");
  }

  if (typeof params.signature !== "string") {
    throw new Error("Invalid prompt");
  }

  const level = Number(params.level);
  if (isNaN(level) || level < 0 || level > 3) {
    throw new Error("Invalid level");
  }

  // Verify the signature using the secret
  const expectedSignature = await signText(params.prompt);
  if (params.signature !== expectedSignature) {
    throw new Error("Invalid signature");
  }

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
- The input will be a CV of a person.
- Make it epic and fun!
- No multiple propositions.
- In the language of the CV.
- Maximum 300 characters.

Resume of CV:
${params.prompt}
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
  const appendSignature = () => {
    let text = "";
    return new TransformStream({
      transform(chunk, controller) {
        text += Buffer.from(chunk).toString("utf-8");
        controller.enqueue(chunk);
      },
      async flush(controller) {
        const signature = await signText(text);
        console.log({ text, signature });
        controller.enqueue(`---SIGN---\n${signature}`);
      },
    });
  };
  // Respond with the stream
  return new StreamingTextResponse(stream.pipeThrough(appendSignature()));
}
