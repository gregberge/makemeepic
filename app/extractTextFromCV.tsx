"use server";

import { extractTextFromPdf } from "@/lib/linkedin-pdf";

function checkIsFile(file: any): file is File {
  return file && file.name && file.arrayBuffer;
}

export async function extractTextFromCV(form: FormData) {
  const file = form.get("file");
  if (!checkIsFile(file)) {
    throw new Error("File not found");
  }

  console.log("Got file", file.name);
  console.log("Converting to array buffer");
  const buffer = await file.arrayBuffer();
  console.log("Extract text from PDF");
  const text = await extractTextFromPdf(buffer);
  return text;
}
