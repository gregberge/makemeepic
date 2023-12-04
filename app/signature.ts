const SECRET = process.env.SIGNING_SECRET;

// Sign a text with the secret using window.crypto.subtle
export async function signText(text: string) {
  if (!SECRET) {
    throw new Error("SIGNING_SECRET is not set");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const key = await crypto.subtle.importKey(
    "raw",
    Buffer.from(SECRET, "utf-8"),
    {
      name: "HMAC",
      hash: { name: "SHA-512" },
    },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, data);
  return Buffer.from(signature).toString("hex");
}
