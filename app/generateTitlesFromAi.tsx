"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateTitles(text: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "system",
        content:
          'From the CV of the person, generate between 8 and 10 epic titles like Daenerys from Game of Thrones. Titles must be on the same line, like "Name, title, title, title".',
      },
      {
        role: "user",
        content: text,
      },
    ],
  });
  return response.choices[0].message?.content ?? "No title found";
}
