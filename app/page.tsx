import Image from "next/image";
import { Form } from "./form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl mb-10">Make me Epic</h1>
      <Form />
    </main>
  );
}
