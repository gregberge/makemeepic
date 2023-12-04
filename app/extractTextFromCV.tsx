"use server";

import { extractTextFromPdf } from "@/lib/linkedin-pdf";
import { ResumeResult } from "./types";
import { signText } from "./signature";

function checkIsFile(file: any): file is File {
  return file && file.name && file.arrayBuffer;
}

export async function extractTextFromCV(form: FormData): Promise<ResumeResult> {
  const file = form.get("file");
  if (!checkIsFile(file)) {
    throw new Error("File not found");
  }

  const buffer = await file.arrayBuffer();
  const text = await extractTextFromPdf(buffer);
  const signature = await signText(text);
  return { text, signature };
}
