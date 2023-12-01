"use client";
import * as React from "react";
import { useChat } from "ai/react";
import clsx from "clsx";
import { Button } from "@/components/button";
import html2canvas from "html2canvas";

export function Generate(props: { resume: string }) {
  const { append, messages, isLoading } = useChat();
  const [iteration, setIteration] = React.useState(0);

  React.useEffect(() => {
    if (iteration === 0) {
      append({ role: "user", content: props.resume });
      setIteration(1);
    }
  }, [props.resume, append, iteration]);

  const assistantMessages = messages.filter((m) => m.role === "assistant");

  const name = props.resume.match(/# (.*)/i)?.[1] ?? "You";

  return (
    <div className="mx-auto max-w-3xl text-center">
      {Array.from({ length: iteration }).map((_, index) => {
        const message = assistantMessages[index];
        return (
          <div
            key={index}
            className="relative ring-1 ring-yellow-600 p-2 rounded-[58px] bg-gradient-to-b from-yellow-500 to-yellow-300 flex min-h-[20rem] mb-20 shadow-glow"
          >
            <div className="absolute text-4xl bg-gradient-to-b ring-1 ring-yellow-600 border-4 border-yellow-400 from-red-900 to-pink-800 px-10 py-2 rounded-xl -top-8 left-1/2 -translate-x-1/2">
              {name}
            </div>
            <div className="p-10 pt-14 rounded-[50px] min-h-[23rem] text-3xl leading-[1.6] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-violet-600 to-sky-900 w-full text-left whitespace-pre-line">
              {message?.content ?? "Loading..."}
            </div>
          </div>
        );
      })}
      <div className="text-center">
        <Button
          onClick={() => {
            append({ role: "user", content: "Make it more epic" });
            setIteration(iteration + 1);
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
