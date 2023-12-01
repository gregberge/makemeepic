import Image from "next/image";
import { Form } from "./form";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="bg-hero-gradient">
        <div className="relative pt-[3vw] pb-[3vw]">
          <div className="absolute w-[20vw] top-[2vw] right-[70vw] aspect-[342/424]">
            <Image src="/assets/dragon1.svg" alt="" fill />
          </div>
          <div className="relative w-[12vw] aspect-[250/353] mx-auto">
            <Image src="/assets/logo.svg" alt="Make me Epic" fill />
          </div>
          <div className="absolute w-[25vw] top-[2vw] left-[70vw] aspect-[422/363]">
            <Image src="/assets/dragon2.svg" alt="" fill />
          </div>
        </div>
        <div className="relative h-[32vw] overflow-hidden">
          <div className="text-[2vw] leading-normal text-center max-w-[25vw] mx-auto text-[#011A46]">
            Transform Your Career into a Mythic Tale.
          </div>
          <div className="absolute w-[12vw] left-[5vw] top-[3vw] aspect-[242/77]">
            <Image src="/assets/cloud4.svg" alt="" fill />
          </div>
          <div className="absolute w-[6vw] left-[20vw] top-[15vw] aspect-[113/51]">
            <Image src="/assets/cloud3.svg" alt="" fill />
          </div>
          <div className="absolute w-[12vw] right-[5vw] top-[3vw] aspect-[223/111]">
            <Image src="/assets/cloud1.svg" alt="" fill />
          </div>
          <div className="absolute w-[6vw] right-[20vw] top-[15vw] aspect-[173/58]">
            <Image src="/assets/cloud2.svg" alt="" fill />
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
      <div className="bg-[#011A46] z-10 relative pt-20 pb-40">
        <Form />
      </div>
    </main>
  );
}
