"use client";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { generateTitles } from "./generateTitlesFromAi";
import { extractTextFromCV } from "./extractTextFromCV";
import { useChat } from "ai/react";
import Image from "next/image";
import clsx from "clsx";

export function Form() {
  const { append, messages, isLoading } = useChat();

  const [state, setState] = React.useState<{
    status: "idle" | "loading" | "error" | "success";
    error: Error | null;
    result: string | null;
  }>({
    status: "idle",
    error: null,
    result: null,
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const form = new FormData();

      form.append("file", acceptedFiles[0]);
      setState({ status: "loading", error: null, result: null });
      extractTextFromCV(form)
        .then((text) => {
          setState({ status: "success", error: null, result: null });
          append({ role: "user", content: text });
        })
        .catch((error) => {
          setState({ status: "error", error, result: null });
        });
    },
  });

  const agentMessages = messages.filter((m) => m.role === "assistant");
  return (
    <div className="flex flex-col gap-8 max-w-xl mx-auto">
      <div
        className={clsx(
          "p-10 border border-dashed flex flex-col items-center justify-center bg-[#00153B] rounded-lg transition-all text-xl min-h-[20rem]",
          state.status !== "idle" ? "border-transparent" : "border-[#4D77C1]",
        )}
      >
        {state.status === "loading" && <p>Analyzing your CV...</p>}
        {agentMessages.map((m) => (
          <div className="mb-4" key={m.id}>
            {m.content}
          </div>
        ))}
        {state.status === "success" && (
          <div className="text-center">
            <button
              type="button"
              onClick={() =>
                append({ role: "user", content: "Make it more epic" })
              }
              disabled={agentMessages.length === 0 || isLoading}
              className={clsx(
                "cursor-pointer bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-4 py-2 rounded transition disabled:opacity-60",
                isLoading && "animate-pulse",
              )}
            >
              {isLoading ? "Making you epic..." : "More epic please"}
            </button>
          </div>
        )}
        {state.status === "idle" && (
          <div
            {...getRootProps()}
            className="mb-4 cursor-pointer text-center w-full flex flex-col gap-8 justify-center items-center text-lg select-none"
          >
            <input {...getInputProps()} />
            <Image src="/assets/pdf-icon.svg" width={88} height={88} alt="" />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drop your LinkedIn CV or click to upload it</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
