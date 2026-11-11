import { ImageResponse } from "next/og";

export const alt = "Help PC — Assistência técnica de computadores em Dourados-MS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0b1220",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 44, color: "#38bdf8", fontWeight: 700 }}>
          Help PC
        </div>
        <div
          style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.1, marginTop: 24 }}
        >
          Assistência técnica de computadores em Dourados-MS
        </div>
        <div style={{ fontSize: 34, color: "#cbd5e1", marginTop: 32 }}>
          Formatação, manutenção e suporte para PCs e notebooks
        </div>
      </div>
    ),
    size,
  );
}
