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
        content: `From next input that is the CV of the person, generate between 8 and 10 titles inspired by the one of Daenerys from Game of Thrones. Start with name, then titles separated by a comma.`,
      },
      {
        role: "user",
        content: text,
      },
    ],
  });
  return response.choices[0].message?.content ?? "No title found";
}
