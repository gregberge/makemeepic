"use server";

import { extractTextFromPdf } from "@/lib/linkedin-pdf";
import { getTitlesResponse } from "@/lib/openai";

function checkIsFile(file: any): file is File {
  return file && file.name && file.arrayBuffer;
}

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
  console.log("Generate titles from OpenAI");
  const response = await getTitlesResponse(text);
  return response.text();
}
