"use client";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { generateTitle } from "./action";

export function Form() {
  const [state, setState] = React.useState<{
    status: "idle" | "loading" | "error" | "success";
    error: Error | null;
    result: string | null;
  }>({
    status: "idle",
    error: null,
    result: null,
  });
  const [title, setTitle] = React.useState<string | null>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const form = new FormData();

      form.append("file", acceptedFiles[0]);
      setState({ status: "loading", error: null, result: null });
      generateTitle(form)
        .then((title) => {
          setState({ status: "success", error: null, result: title });
        })
        .catch((error) => {
          setState({ status: "error", error, result: null });
        });
    },
  });

  return (
    <div>
      <div {...getRootProps()} className="p-10 border rounded-lg mb-4">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drop your LinkedIn CV</p>
        )}
      </div>
      {state.status === "loading" && <p>Loading...</p>}
      {state.status === "error" && <p>{state.error?.message}</p>}
      {state.status === "success" && <p>{state.result}</p>}
    </div>
  );
}
