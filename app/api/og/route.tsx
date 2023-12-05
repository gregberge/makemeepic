/* eslint-disable @next/next/no-img-element */
import { parseToken } from "@/lib/token";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (!token) {
    return new Response("Missing token", { status: 400 });
  }
  // Make sure the font exists in the specified path:
  const fontData = await fetch(
    new URL("./IMFellEnglish-Regular.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  try {
    const { name, text } = await parseToken(token);

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            backgroundImage: "linear-gradient(to bottom, #2563eb, #1e3a8a)",
          }}
        >
          <div
            style={{
              display: "flex",
              border: "16px",
              borderColor: "#FACC14",
              height: "100%",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              padding: "40px",
              fontFamily: "IMFellEnglish",
            }}
          >
            <img
              src="https://makemeepic.app/assets/og-header.png"
              width="1520"
              height="200"
              style={{ marginBottom: "32px" }}
              alt=""
            />

            <div
              style={{
                color: "#FACC14",
                fontSize: "72px",
                marginBottom: "32px",
              }}
            >
              {name}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 286 21"
              width={570}
              height={40}
              fill="none"
            >
              <path
                fill="#FACC14"
                fillRule="evenodd"
                d="m133.471 9.528 8.676-8.676a1.21 1.21 0 0 1 1.707 0l8.676 8.676a1.21 1.21 0 0 1 0 1.706l-8.676 8.677a1.21 1.21 0 0 1-1.707 0l-8.676-8.677a1.21 1.21 0 0 1 0-1.706ZM160.36 11.933a1.016 1.016 0 0 1 0-2.033h122.456a1.018 1.018 0 0 1 0 2.033H160.36Z"
                clipRule="evenodd"
              />
              <path
                fill="#FACC14"
                d="M160.361 13.754a2.838 2.838 0 1 0 0-5.676 2.838 2.838 0 0 0 0 5.676Z"
              />
              <path
                fill="#FACC14"
                fillRule="evenodd"
                d="M282.817 13.753a2.842 2.842 0 0 0 2.836-2.838 2.841 2.841 0 0 0-2.836-2.837 2.843 2.843 0 0 0-2.838 2.837 2.843 2.843 0 0 0 2.838 2.838ZM3.184 11.933a1.016 1.016 0 0 1 0-2.033H125.64a1.016 1.016 0 0 1 0 2.033H3.184Z"
                clipRule="evenodd"
              />
              <path
                fill="#FACC14"
                d="M3.185 13.754a2.838 2.838 0 1 0 0-5.676 2.838 2.838 0 0 0 0 5.676Z"
              />
              <path
                fill="#FACC14"
                fillRule="evenodd"
                d="M125.641 13.753a2.844 2.844 0 0 0 2.838-2.838 2.842 2.842 0 0 0-2.838-2.837 2.843 2.843 0 0 0-2.838 2.837 2.844 2.844 0 0 0 2.838 2.838Z"
                clipRule="evenodd"
              />
            </svg>
            <div
              style={
                {
                  color: "#ffffff",
                  fontSize: "44px",
                  padding: "20px",
                  textAlign: "center",
                  textWrap: "balance",
                } as any
              }
            >
              {text}
            </div>
          </div>
        </div>
      ),
      {
        width: 1600,
        height: 836,
        fonts: [
          {
            name: "IMFellEnglish",
            data: fontData,
            style: "normal",
          },
        ],
      },
    );
  } catch (error) {
    return new Response("Invalid token", { status: 400 });
  }
}
