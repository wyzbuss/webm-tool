import type { Metadata } from "next";
import WebMConverter from "@/app/components/WebMConverter";

export const metadata: Metadata = {
  title: "Free OBS Stinger Transition Converter | MOV to WebM",
  description: "Convert MOV stingers to WebM for OBS Studio instantly. Keep transparency, small file size. No upload needed.",
  alternates: { canonical: 'https://transparentwebm.com/obs-stinger-converter' },
};

export default function OBSPage() {
  return (
    <WebMConverter 
      badge="For Streamers & OBS"
      h1Title={<span>OBS Stinger <span className="text-green-500">Converter</span></span>}
      description="Convert large MOV stingers to optimized WebM for OBS & Twitch."
    />
  );
}