"use client";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { generateTitles } from "./generateTitlesFromAi";
import { extractTextFromCV } from "./extractTextFromCV";
import { useChat } from "ai/react";

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
    <div className="flex flex-col gap-8 max-w-xl">
      <div
        {...getRootProps()}
        className="p-10 border rounded-lg mb-4 text-center w-full"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drop your LinkedIn CV</p>
        )}
      </div>
      <div className="text-center">
        <button
          type="button"
          onClick={() => append({ role: "user", content: "Make it more epic" })}
          disabled={agentMessages.length === 0 || isLoading}
          className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
        >
          <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
          <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
            <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
            <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
          </span>
          <span className="relative text-white">More epic please</span>
        </button>
      </div>
      {state.status === "loading" && <p>Analyzing your CV...</p>}
      {isLoading && <p>Computing your titles...</p>}
      {agentMessages.map((m) => (
        <div className="mb-4" key={m.id}>
          {m.content}
        </div>
      ))}
    </div>
  );
}
