import clsx from "clsx";
import Image from "next/image";

export function Card({
  text,
  title,
  className,
  size,
  img,
  header = true,
}: {
  text: React.ReactNode;
  title: React.ReactNode;
  className?: string;
  size?: "small" | "large";
  img?: React.ReactNode;
  header?: boolean;
}) {
  return (
    <div
      className={clsx(
        "border-8 rounded-2xl border-yellow-400 bg-gradient-to-b from-blue-600 to-blue-900 p-4 aspect-[1600/900]",
        className,
      )}
    >
      {header && (
        <div className="flex justify-around items-center">
          <div
            className={clsx(
              "relative aspect-[196/188] h-",
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
      <div className="text-yellow-400 text-center text-3xl mt-6">{title}</div>
      <div className="relative w-2/3 aspect-[570/40] mx-auto my-4">
        <Image src="/assets/share/separator.svg" alt="" fill />
      </div>
      <div
        className={clsx(
          "w-full whitespace-pre-line min-h-[11.25rem] text-center",
          size === "small" ? "text-xl" : "text-xl md:text-3xl",
        )}
      >
        {text}
      </div>
    </div>
  );
}
