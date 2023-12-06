import Image from "next/image";

export function By() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 font-sans pointer-events-none">
      <div className="overflow-hidden">
        <div className="float-right rounded-tl-md bg-white shadow-md pointer-events-auto">
          <a
            className="flex items-center gap-2 px-2 py-1"
            target="_blank"
            rel="nofollow noreferrer"
            href="https://x.com/gregberge_"
          >
            <div className="relative h-7 w-7 overflow-hidden rounded-full">
              <Image
                src="/assets/me.jpg"
                alt="Greg Bergé"
                width={28}
                height={28}
              />
              <div className="absolute inset-0 rounded-full border border-black border-opacity-10" />
            </div>
            <p className="text-stone-600 text-sm">
              by{" "}
              <span className="font-medium text-stone-900 transition-colors duration-150 hover:text-stone-600">
                @gregberge_
              </span>
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
