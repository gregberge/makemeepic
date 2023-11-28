import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getTitlesResponse(input: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content:
          'From the CV of the person, give them titles like Daenerys in Game of Thrones.\n\nTitles must be on the same line, like "Name, title, title, title".',
      },
      {
        role: "user",
        content: input,
      },
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response;
}
