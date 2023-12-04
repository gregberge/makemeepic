"use client";
import * as React from "react";
import { useCompletion } from "ai/react";
import clsx from "clsx";
import { Button } from "@/components/button";
import { ResumeResult } from "./types";

const Name = React.memo(function Name({ resume }: { resume: string }) {
  const name = resume.match(/# (.*)/i)?.[1] ?? "You";
  return (
    <div className="absolute text-4xl bg-gradient-to-b ring-1 ring-yellow-600 border-4 border-yellow-400 from-red-900 to-pink-800 px-10 py-2 rounded-xl -top-8 left-1/2 -translate-x-1/2">
      {name}
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
  const { complete, completion } = useCompletion({
    onFinish,
  });

  React.useEffect(() => {
    complete(resume.text, { body: { level, signature: resume.signature } });
  }, [complete, resume, level]);

  return (
    <div className="relative ring-1 ring-yellow-600 p-2 rounded-[58px] bg-gradient-to-b from-yellow-500 to-yellow-300 flex min-h-[20rem] mb-20 shadow-glow">
      <Name resume={resume.text} />
      <div className="p-10 pt-14 rounded-[50px] min-h-[23rem] text-3xl leading-[1.6] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-violet-600 to-sky-900 w-full text-left whitespace-pre-line">
        {completion || "Loading..."}
      </div>
    </div>
  );
});

export function Generate(props: { resume: ResumeResult }) {
  const [iteration, setIteration] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const finish = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="mx-auto max-w-3xl text-center">
      {Array.from({ length: iteration + 1 }).map((_, index) => {
        return (
          <Completion
            key={index}
            level={index}
            resume={props.resume}
            onFinish={finish}
          />
        );
      })}
      <div className="text-center">
        <Button
          onClick={() => {
            setIteration((n) => n + 1);
            setIsLoading(true);
          }}
          disabled={isLoading}
          className={clsx(isLoading && "animate-pulse")}
        >
          {isLoading ? "Making you epic..." : "More epic please"}
        </Button>
      </div>
    </div>
  );
}
