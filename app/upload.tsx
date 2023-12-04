/* eslint-disable react/no-unescaped-entities */
"use client";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { extractTextFromCV } from "./extractTextFromCV";
import Image from "next/image";
import clsx from "clsx";
import { Button } from "@/components/button";
import { FileText } from "lucide-react";
import { ResumeResult } from "./types";
import { twc } from "@/lib/twc";
import { H2, H3 } from "@/components/typography";
import { Container } from "@/components/container";

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
      result: ResumeResult;
    };

const Section = twc.div`border border-blue-900/80 bg-blue-500/10 p-8 rounded-lg`;

const Separator = () => {
  return (
    <Image
      src="/assets/separator.svg"
      alt=""
      width={316}
      height={36}
      className="mx-auto mt-12 mb-16"
    />
  );
};

export function Upload(props: { onComplete: (result: ResumeResult) => void }) {
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
          .then((result) => {
            props.onComplete(result);
          })
          .catch((error) => {
            setState({ status: "error", error, result: null });
          });
      },
    });

  return (
    <div className="flex gap-8 items-center flex-col md:flex-row md:items-start">
      <Section className="flex-1">
        <H3>1. Go to your LinkedIn Profile</H3>
        <Button asChild className="mb-8">
          <a
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ↫ Go to my profile ↬
          </a>
        </Button>
      </Section>
      <Section className="flex-1 w-full">
        <H3>2. Save your CV as PDF</H3>
        <div className="relative aspect-[572/508] mx-auto">
          <Image quality={100} src="/assets/linkedin-page.png" alt="" fill />
        </div>
      </Section>
      <Section className="flex-1">
        <H3>3. Upload the PDF</H3>
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
          </div>
        </div>
      </Section>
    </div>
  );
}
