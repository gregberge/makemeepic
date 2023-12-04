"use client";
import * as React from "react";
import { Generate } from "./generate";
import { Upload } from "./upload";
import { ResumeResult } from "./types";

export function Steps() {
  const [resume, setResume] = React.useState<ResumeResult | null>(null);

  if (resume === null) {
    return <Upload onComplete={setResume} />;
  }

  return <Generate resume={resume} />;
}
