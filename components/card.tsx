import clsx from "clsx";
import Image from "next/image";

export function Card({
  text,
  title,
  className,
  size = "large",
  img,
  header = true,
  textAlign = "center",
}: {
  text: React.ReactNode;
  title: React.ReactNode;
  className?: string;
  size?: "small" | "large";
  img?: React.ReactNode;
  header?: boolean;
  textAlign?: "center" | "left";
}) {
  return (
    <div
      className={clsx(
        "border-8 rounded-2xl border-yellow-400 bg-gradient-to-b from-blue-600 to-blue-900 select-text",
        className,
        size === "small" && "p-4",
        size === "large" && "p-4 pb-12",
      )}
    >
      {header && (
        <div className="flex justify-around items-center">
          <div
            className={clsx(
              "relative aspect-[196/188]",
              size === "small" ? "h-16" : "h-28",
            )}
          >
            <Image src="/assets/share/dragon-left.svg" fill alt="" />
          </div>
          <div
            className={clsx(
              "relative aspect-[131/184]",
              size === "small" ? "h-16" : "h-28",
            )}
          >
            <Image
              src="/assets/share/logo-social.png"
              fill
              alt="Make me Epic"
            />
          </div>
          <div
            className={clsx(
              "relative aspect-[196/168]",
              size === "small" ? "h-16" : "h-28",
            )}
          >
            <Image src="/assets/share/dragon-right.svg" fill alt="" />
          </div>
        </div>
      )}
      {img && <div className="mt-8 flex justify-center">{img}</div>}
      <div
        className={clsx(
          "text-yellow-400 text-center text-3xl mt-6",
          size === "large" && "text-4xl",
          size === "small" && "text-3xl",
        )}
      >
        {title}
      </div>
      <div className="relative w-2/3 aspect-[570/40] mx-auto my-4">
        <Image src="/assets/share/separator.svg" alt="" fill />
      </div>
      <div
        className={clsx(
          "w-full whitespace-pre-line min-h-[11.25rem]",
          size === "small"
            ? "text-xl leading-normal"
            : "text-xl md:text-3xl md:leading-normal",
          textAlign === "left" && "text-left",
          textAlign === "center" && "text-center",
        )}
        style={
          textAlign === "center" ? ({ textWrap: "balance" } as any) : undefined
        }
      >
        {text}
      </div>
    </div>
  );
}
