import { signText } from "./signature";
import { decode, encode } from "./base64";

export async function parseToken(token: string) {
  const [name, text, signature] = decode(token).split("__");
  const expectedSignature = await signText(text);
  if (signature !== expectedSignature) {
    throw new Error("Invalid signature");
  }

  return { name, text };
}

export function formatToken(params: {
  name: string;
  text: string;
  signature: string;
}) {
  return encode(`${params.name}__${params.text}__${params.signature}`);
}
