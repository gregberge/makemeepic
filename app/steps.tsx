"use client";
import * as React from "react";
import { Generate } from "./generate";
import { Upload } from "./upload";

export function Steps() {
  const [resume, setResume] = React.useState<string | null>(null);

  if (resume === null) {
    return <Upload onComplete={setResume} />;
  }

  return <Generate resume={resume} />;
}
