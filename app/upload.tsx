"use client";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { extractTextFromCV } from "./extractTextFromCV";
import Image from "next/image";
import clsx from "clsx";
import { Button } from "@/components/button";
import { FileText } from "lucide-react";

type State =
  | {
      status: "idle";
      error: null;
      result: null;
    }
  | {
      status: "loading";
      error: null;
      result: null;
    }
  | {
      status: "error";
      error: Error;
      result: null;
    }
  | {
      status: "success";
      error: null;
      result: string;
    };

export function Upload(props: { onComplete: (resume: string) => void }) {
  const [state, setState] = React.useState<State>({
    status: "idle",
    error: null,
    result: null,
  });

  const { getRootProps, getInputProps, isDragReject, isDragAccept } =
    useDropzone({
      multiple: false,
      accept: {
        "application/pdf": [".pdf"],
      },
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        const form = new FormData();

        form.append("file", file);
        setState({ status: "loading", error: null, result: null });
        extractTextFromCV(form)
          .then((text) => {
            setState({ status: "success", error: null, result: text });
          })
          .catch((error) => {
            setState({ status: "error", error, result: null });
          });
      },
    });

  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="text-5xl">Import your resume from LinkedIn</div>
      <Image
        src="/assets/separator.svg"
        alt=""
        width={316}
        height={36}
        className="mx-auto my-12"
      />
      <div className="text-3xl mt-10 mb-8">1. Go to your LinkedIn Profile</div>
      <Button asChild className="mb-8">
        <a
          href="https://linkedin.com/in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ↫ Go to your LinkedIn Profile ↬
        </a>
      </Button>
      <div className="text-3xl mt-10 mb-8">
        2. Select “Save to PDF” from the dropdown
      </div>
      <div className="relative max-w-lg w-full aspect-[572/508] mt-10 mb-8 mx-auto">
        <Image quality={100} src="/assets/linkedin-page.png" alt="" fill />
      </div>
      <div className="text-3xl mt-10 mb-8">3. Upload the PDF</div>
      <div className="flex flex-col gap-8 max-w-xl mx-auto">
        <div
          className={clsx(
            "border border-dashed flex flex-col items-center justify-cente rounded-lg transition-all text-xl",
            isDragAccept
              ? "border-green-600 bg-green-900"
              : isDragReject
              ? "border-red-600 bg-red-900"
              : "border-blue-600 bg-blue-900/50",
          )}
        >
          {state.status === "idle" && (
            <div
              {...getRootProps()}
              className="p-10 cursor-pointer text-center w-full flex flex-col gap-8 justify-center items-center select-none text-xl"
            >
              <input {...getInputProps()} />
              <FileText size={80} absoluteStrokeWidth />
              {isDragAccept ? (
                <p>Drop the file here ...</p>
              ) : isDragReject ? (
                <p>This is not a CV</p>
              ) : (
                <p>Drop your LinkedIn CV or click to upload it</p>
              )}
            </div>
          )}
          {state.status === "loading" && (
            <div className="my-10 h-12 flex items-center justify-center">
              Analyzing your CV...
            </div>
          )}
          {state.status === "success" && (
            <div>
              <Button
                onClick={() => {
                  props.onComplete(state.result);
                }}
                className="my-10"
              >
                Make me epic
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
