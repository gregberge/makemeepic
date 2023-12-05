"use client";
import { usePlausible } from "next-plausible";
import { ComponentPropsWithoutRef } from "react";

export function TrackedLink({
  event,
  ...props
}: ComponentPropsWithoutRef<"a"> & { event: string }) {
  const plausible = usePlausible();
  return (
    <a
      {...props}
      onClick={() => {
        plausible(event, {
          props: {
            href: props.href,
          },
        });
      }}
    />
  );
}
