"use client";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { extractTextFromCV } from "./extractTextFromCV";
import { useChat } from "ai/react";
import Image from "next/image";
import clsx from "clsx";

function Button({
  loading,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  loading?: boolean;
}) {
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        "cursor-pointer bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-2xl px-4 py-2 rounded transition disabled:opacity-30 disabled:cursor-default",
        className,
        loading && "animate-pulse",
      )}
    />
  );
}

export function Form() {
  const { append, messages, isLoading } = useChat();
  const [step, setStep] = React.useState<"upload" | "generate">("upload");
  const [iteration, setIteration] = React.useState(0);

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

  function start() {
    if (!state.result) {
      throw new Error("No result");
    }
    setStep("generate");
    append({ role: "user", content: state.result });
    setIteration(1);
  }

  const agentMessages = messages.filter((m) => m.role === "assistant");

  if (step === "upload") {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <div className="text-5xl">Import your resume from LinkedIn to </div>
        <Image
          src="/assets/separator.svg"
          alt=""
          width={316}
          height={36}
          className="mx-auto my-12"
        />
        <div className="text-3xl mt-10 mb-8">
          1. Go to your LinkedIn Profile
        </div>
        <div className="bg-[#203B6C] rounded-lg p-4 my-4 inline-block text-2xl">
          https://linked.com/in/your-name
        </div>
        <div className="text-3xl mt-10 mb-8">
          2. Select “Save to PDF” from the dropdown
        </div>
        <div className="relative max-w-lg w-full aspect-[572/508] mt-10 mb-8 mx-auto">
          <Image quality={100} src="/assets/linkedin-page.png" alt="" fill />
        </div>
        <div className="text-3xl mt-10 mb-8">
          3. Upload your PDF to MakeMeEpic
        </div>
        <div className="flex flex-col gap-8 max-w-xl mx-auto">
          <div
            className={clsx(
              "p-10 border border-dashed flex flex-col items-center justify-center bg-[#00153B] rounded-lg transition-all text-xl min-h-[20rem]",
              "border-[#4D77C1]",
            )}
          >
            {state.status === "idle" && (
              <div
                {...getRootProps()}
                className="mb-4 cursor-pointer text-center w-full flex flex-col gap-8 justify-center items-center text-lg select-none text-xl"
              >
                <input {...getInputProps()} />
                <Image
                  src="/assets/pdf-icon.svg"
                  width={88}
                  height={88}
                  alt=""
                />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drop your LinkedIn CV or click to upload it</p>
                )}
              </div>
            )}
            {state.status === "loading" && <p>Analyzing your CV...</p>}
            {state.status === "success" && (
              <div>
                <Button
                  onClick={() => {
                    start();
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

  return (
    <div className="mx-auto max-w-3xl text-center">
      {Array.from({ length: iteration }).map((_, index) => {
        const message = agentMessages[index];
        return (
          <div
            key={index}
            className="p-4 rounded-[66px] bg-gradient-to-b from-orange-500 to-yellow-300 flex min-h-[30rem] mb-8"
          >
            <div className="p-10 rounded-[50px] min-h-[23rem] text-3xl leading-[1.6] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-violet-600 to-sky-900 w-full text-left">
              {message?.content ?? "Loading..."}
            </div>
          </div>
        );
      })}
      {state.status === "success" && (
        <div className="text-center">
          <Button
            onClick={() => {
              append({ role: "user", content: "Make it more epic" });
              setIteration(iteration + 1);
            }}
            disabled={agentMessages.length === 0 || isLoading}
            className={clsx(isLoading && "animate-pulse")}
          >
            {isLoading ? "Making you epic..." : "More epic please"}
          </Button>
        </div>
      )}
    </div>
  );
}
