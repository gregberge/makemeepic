"use client";
import * as React from "react";
import { useCompletion } from "ai/react";
import clsx from "clsx";
import { Button } from "@/components/button";
import { ResumeResult } from "./types";
import { Card } from "@/components/card";

const Name = React.memo(function Name({ resume }: { resume: string }) {
  const name = resume.match(/# (.*)/i)?.[1] ?? "You";
  return <>{name}</>;
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
    <Card
      title={<Name resume={resume.text} />}
      text={completion || "Loading..."}
      className="mb-8"
    />
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
