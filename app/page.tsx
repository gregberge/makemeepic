/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { Steps } from "./steps";
import { Card } from "@/components/card";
import { Separator } from "@/components/separator";
import { H2 } from "@/components/typography";
import { Container } from "@/components/container";

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
          <div className="relative w-[8vw] aspect-[250/353] mx-auto">
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
        </div>
        <div className="relative h-[32vw] overflow-hidden">
          <div className="text-[2vw] leading-normal text-center max-w-[30vw] mx-auto text-blue-950">
            Harness AI to Extract Mythical Titles from Your LinkedIn.
          </div>
          <div className="absolute w-[12vw] left-[5vw] top-[3vw] aspect-[242/77] animate-floatX">
            <Image src="/assets/cloud4.svg" alt="" fill />
          </div>
          <div className="absolute w-[6vw] left-[20vw] top-[15vw] aspect-[113/51] animate-floatX">
            <Image src="/assets/cloud3.svg" alt="" fill />
          </div>
          <div className="absolute w-[12vw] right-[5vw] top-[3vw] aspect-[223/111] animate-floatXR">
            <Image src="/assets/cloud1.svg" alt="" fill />
          </div>
          <div className="absolute w-[6vw] right-[20vw] top-[15vw] aspect-[173/58] animate-floatXR">
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
      <div className="bg-blue-950 z-10 relative pb-40 pt-16">
        <Container>
          <H2>Become the "Queen of Dragons"</H2>
          <Separator />
          <div className="relative mb-40 flex items-center justify-center gap-16">
            <div className="flex-1 hidden lg:block">
              <Card
                className="-rotate-3"
                size="small"
                title="Mark Zuckerberg"
                text={`“Mark Zuckerberg, Chief Orchestrator of Social Realms, Architect of Digital Connection, Harvard's Visionary Dropout, Guardian of Personal Data, Pioneer of the Palo Alto Empire.”`}
              />
            </div>
            <div className="flex-1 max-w-2xl">
              <Card
                size="small"
                title="Elon Musk"
                text={`“Elon Musk, Master of Electric Horses, Supreme Commander of the Cosmic Fleet, Visionary Digger of Underground Labyrinths, Dropout Turned Emperor of Innovation, and the Architect of Tomorrow.”`}
              />
            </div>
            <div className="flex-1 rotate-3 hidden lg:block">
              <Card
                className="rotate-3"
                size="small"
                title="Guillermo Rauch"
                text={`“Guillermo Rauch, Digital Sovereign, Architect of the Web, Commander of Vercel, Visionary of the Cloud Frontier, Lord of San Francisco's Tech Realms.”`}
              />
            </div>
          </div>
        </Container>
        <Container className="text-center">
          <H2>Turn your LinkedIn into an Epic Tale</H2>
          <Separator />
          <Steps />
        </Container>
        <Container className="mt-40">
          <H2>Made with ❤️ by</H2>
          <Separator />
          <Card
            header={false}
            className="max-w-3xl mx-auto"
            img={
              <Image
                src="/assets/profile-greg.png"
                alt="Greg Bergé"
                width={160}
                height={160}
              />
            }
            title="Greg Bergé"
            text={
              <div>
                <div>
                  “Greg Bergé, The Maestro of MakemeEpic.app, The Great Emperor
                  of Argos Visual Testing, The Enlightened Sorcerer of
                  Open-Source Software, The Master of SVG in the React World.”
                </div>
                <div className="mt-8 flex gap-8 justify-center pb-4">
                  <a
                    href="https://x.com/gregberge_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:scale-110"
                  >
                    <Image
                      src="/assets/icons/x.svg"
                      alt="X"
                      width={32}
                      height={32}
                      className="inline-block"
                    />
                  </a>
                  <a
                    href="https://github.com/gregberge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:scale-110"
                  >
                    <Image
                      src="/assets/icons/github.svg"
                      alt="GitHub"
                      width={32}
                      height={32}
                      className="inline-block"
                    />
                  </a>
                </div>
              </div>
            }
          />
        </Container>
      </div>
      <Container className="py-4 text-center text-lg font-caudex text-blue-200">
        <div>
          Built with Next.js and OpenAI on a full moon evening in Paris.
        </div>
        <div>
          Copy it and become rich,{" "}
          <a
            href="https://github.com/gregberge/makemeepic"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition"
          >
            it's open-source
          </a>
          .
        </div>
      </Container>
    </main>
  );
}
