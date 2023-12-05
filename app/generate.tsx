"use client";
import * as React from "react";
import { useCompletion } from "ai/react";
import clsx from "clsx";
import { Button } from "@/components/button";
import { ResumeResult } from "./types";
import { Card } from "@/components/card";
import { useClipboard } from "use-clipboard-copy";
import { formatToken } from "@/lib/token";
import { usePlausible } from "next-plausible";

const getNameFromResume = (resume: string) => {
  return resume.match(/# (.*)/i)?.[1] ?? "You";
};

const Name = React.memo(function Name({ resume }: { resume: string }) {
  return <>{getNameFromResume(resume)}</>;
});

function parseCompletion(completion: string) {
  const [text, signature] = completion.split(/---SIGN---\s/);
  return { text, signature };
}

const CompletionShare = React.memo(function CompletionShare({
  text,
  signature,
  resume,
}: {
  text: string;
  signature: string;
  resume: string;
}) {
  const plausible = usePlausible();
  const name = getNameFromResume(resume);
  const token = formatToken({ name, text, signature });
  const url = new URL(`/share/${token}`, window.location.origin);
  const shareText = `👑 Just unleashed my legendary titles!\nGenerate yours with ${window.location.origin}.\n${url.href}`;

  const clipboard = useClipboard({ copiedTimeout: 600 });

  return (
    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4 items-center">
      <Button asChild>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText,
          )}`}
          target="_blank"
          onClick={() =>
            plausible("share-twitter", {
              props: {
                url: url.href,
              },
            })
          }
        >
          Share on X
        </a>
      </Button>
      <Button
        type="button"
        onClick={() => {
          plausible("copy-link", {
            props: {
              url: url.href,
            },
          });
          clipboard.copy(url.href);
        }}
      >
        {clipboard.copied ? "Copied" : "Copy link"}
      </Button>
    </div>
  );
});

const Completion = React.memo(function Completion({
  level,
  resume,
  onFinish,
}: {
  level: number;
  resume: ResumeResult;
  onFinish: () => void;
}) {
  const { complete, completion, isLoading } = useCompletion({
    onFinish,
  });

  React.useEffect(() => {
    complete(resume.text, { body: { level, signature: resume.signature } });
  }, [complete, resume, level]);

  const { text, signature } = parseCompletion(completion);
  const loading = !text || isLoading;
  if (!loading && !signature) {
    throw new Error("Invalid signature");
  }

  return (
    <div className="relative mb-20">
      <Card
        title={<Name resume={resume.text} />}
        text={text || "Loading..."}
        textAlign={!text || isLoading ? "left" : "center"}
      />
      {!loading && (
        <CompletionShare
          text={text}
          signature={signature}
          resume={resume.text}
        />
      )}
    </div>
  );
});

export function Generate(props: { resume: ResumeResult }) {
  const plausible = usePlausible();
  const [level, setLevel] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const finish = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="mx-auto max-w-3xl text-center">
      {Array.from({ length: level + 1 }).map((_, index) => {
        return (
          <Completion
            key={index}
            level={index}
            resume={props.resume}
            onFinish={finish}
          />
        );
      })}
      {level < 3 && (
        <div className="text-center">
          <Button
            onClick={() => {
              setLevel((n) => n + 1);
              setIsLoading(true);
              plausible("more-epic");
            }}
            disabled={isLoading}
            className={clsx(isLoading && "animate-pulse")}
          >
            {isLoading ? "Making you epic..." : "Generate a more epic version!"}
          </Button>
        </div>
      )}
    </div>
  );
}
