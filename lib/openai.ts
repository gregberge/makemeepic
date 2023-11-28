import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getTitlesResponse(input: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
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
  });

  return response;
}
