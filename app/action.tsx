"use server";

import { extractTextFromPdf } from "@/lib/linkedin-pdf";
import { getTitlesResponse } from "@/lib/openai";

function checkIsFile(file: any): file is File {
  return file instanceof File;
}

export async function generateTitle(form: FormData) {
  const file = form.get("file");
  if (!checkIsFile(file)) {
    throw new Error("File not found");
  }

  const buffer = await file.arrayBuffer();
  const text = await extractTextFromPdf(buffer);
  const titles = await getTitlesResponse(text);
  const choice = titles.choices[0];
  if (!choice?.message?.content) {
    throw new Error("No titles found");
  }
  return choice.message.content;
}
