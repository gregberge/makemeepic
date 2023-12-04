import Image from "next/image";

export const Separator = () => {
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
