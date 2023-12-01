import * as React from "react";
import clsx from "clsx";
import { Slot } from "@radix-ui/react-slot";

export function Button({
  loading,
  className,
  asChild,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  loading?: boolean;
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      type="button"
      {...props}
      className={clsx(
        "cursor-pointer bg-gradient-to-b ring-1 ring-yellow-600 border-4 border-yellow-400 from-red-900 to-pink-800 hover:from-red-800 hover:to-pink-700 text-2xl px-4 py-2 rounded-lg transition disabled:opacity-30 disabled:cursor-default",
        className,
        loading && "animate-pulse",
      )}
    />
  );
}
