import type { Metadata } from "next";
import WebMConverter from "@/app/components/WebMConverter";

export const metadata: Metadata = {
  title: "Convert MOV to WebM Online Free (Transparent Background)",
  description: "Fast online MOV to WebM converter. No file upload required - secure client-side processing using FFmpeg WASM.",
  alternates: { canonical: 'https://transparentwebm.com/mov-to-webm-online' },
};

export default function MovToWebmPage() {
  return (
    <WebMConverter 
      badge="Fast Converter"
      h1Title={<span>Convert MOV to <span className="text-green-500">WebM</span></span>}
      description="Turn QuickTime MOV files into Web format instantly. 100% Private."
    />
  );
}