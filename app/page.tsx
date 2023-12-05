/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { Content } from "@/components/content";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="bg-hero-gradient select-none">
        <div className="relative pt-[3vw] pb-[3vw]">
          <div className="absolute w-[20vw] top-[2vw] right-[70vw] aspect-[342/424] animate-floatY">
            <Image
              src="/assets/dragon1.svg"
              alt=""
              fill
              className="drop-shadow-2xl"
            />
          </div>
          <div className="relative w-[8rem] md:w-[10.75rem] aspect-[250/353] mx-auto">
            <Image src="/assets/logo.svg" alt="Make me Epic" fill />
          </div>
          <div className="absolute w-[25vw] top-[2vw] left-[70vw] aspect-[422/363] animate-floatY">
            <Image
              src="/assets/dragon2.svg"
              alt=""
              fill
              className="drop-shadow-2xl"
            />
          </div>
          <div className="absolute w-[12vw] left-[5vw] top-[23vw] aspect-[242/77] animate-floatX">
            <Image src="/assets/cloud4.svg" alt="" fill />
          </div>
          <div className="absolute w-[6vw] left-[20vw] top-[35vw] aspect-[113/51] animate-floatX">
            <Image src="/assets/cloud3.svg" alt="" fill />
          </div>
          <div className="absolute w-[12vw] right-[5vw] top-[23vw] aspect-[223/111] animate-floatXR">
            <Image src="/assets/cloud1.svg" alt="" fill />
          </div>
          <div className="absolute w-[6vw] right-[20vw] top-[35vw] aspect-[173/58] animate-floatXR">
            <Image src="/assets/cloud2.svg" alt="" fill />
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="text-2xl md:text-3xl leading-normal text-center mx-auto text-blue-950 mb-[25vw] relative z-10">
            Harness AI to Extract Mythical Titles
            <br /> from Your LinkedIn.
          </div>
          <div className="absolute aspect-[962/940] w-[60vw] -bottom-[34vw] -left-[8vw]">
            <Image src="/assets/mountain1.svg" alt="" fill />
          </div>
          <div className="absolute aspect-[962/940] w-[60vw] -bottom-[34vw] -right-[8vw]">
            <Image src="/assets/mountain2.svg" alt="" fill />
          </div>
          <div className="absolute aspect-[389/357] w-[26vw] bottom-0 left-[37vw]">
            <Image src="/assets/castle.svg" alt="" fill />
          </div>
          <div className="absolute -bottom-[23vw] w-[100vw] aspect-[1512/402]">
            <Image src="/assets/ground.svg" alt="" fill />
          </div>
        </div>
      </div>
      <Content />
    </main>
  );
}
