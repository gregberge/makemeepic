"use server";

import { extractTextFromPdf } from "@/lib/linkedin-pdf";
import OpenAI from "openai";

function checkIsFile(file: any): file is File {
  return file && file.name && file.arrayBuffer;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateTitle(form: FormData) {
  const file = form.get("file");
  if (!checkIsFile(file)) {
    throw new Error("File not found");
  }

  console.log("Got file", file.name);
  console.log("Converting to array buffer");
  const buffer = await file.arrayBuffer();
  console.log("Extract text from PDF");
  const text = await extractTextFromPdf(buffer);
  console.log("Got text", text);
  console.log("Generate titles from OpenAI");
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
  console.log("Got response", response);
  return response.choices[0].message?.content ?? "No title found";
}
