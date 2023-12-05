/* eslint-disable react/no-unescaped-entities */
import { Steps } from "@/app/steps";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Separator } from "@/components/separator";
import { H2 } from "@/components/typography";
import Image from "next/image";
import { TrackedLink } from "./trackedLink";

export function Content() {
  return (
    <div>
      <div className="bg-blue-950 z-10 relative pb-40 pt-16">
        <Container>
          <H2>Become the "Queen of Dragons"</H2>
          <Separator />
          <div className="relative mb-40 flex items-center justify-center gap-16 px-8">
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
                  Open-Source Software, The Master of SVG across the React
                  Kingdoms.”
                </div>
                <div className="mt-8 flex gap-8 justify-center pb-4">
                  <div className="flex relative">
                    <TrackedLink
                      event="personal-twitter"
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
                    </TrackedLink>
                    <div className="absolute hidden md:block -bottom-[72px] -left-[202px] aspect-[567/237] w-60 pointer-events-none">
                      <Image src="/assets/follow-me.png" alt="Follow me" fill />
                    </div>
                  </div>
                  <TrackedLink
                    event="personal-github"
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
                  </TrackedLink>
                </div>
              </div>
            }
          />
        </Container>
      </div>
      <Container className="py-4 text-center text-lg font-caudex text-blue-200">
        <div>
          Crafted under a Parisian full moon using Next.js & OpenAI magic.
        </div>
        <div>
          Clone it, get rich -{" "}
          <a
            href="https://github.com/gregberge/makemeepic"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition"
          >
            it's open-source
          </a>
          !
        </div>
      </Container>
    </div>
  );
}
