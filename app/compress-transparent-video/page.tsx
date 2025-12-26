import type { Metadata } from "next";
import WebMConverter from "@/app/components/WebMConverter";

export const metadata: Metadata = {
  title: "Compress Transparent Video | Reduce WebM Size",
  description: "Drastically reduce the file size of your transparent videos without losing quality. Perfect for React sites & OBS overlays.",
  alternates: { canonical: 'https://transparentwebm.com/compress-transparent-video' },
};

export default function CompressPage() {
  return (
    <WebMConverter 
      badge="Size Reducer Tool"
      h1Title={<span>Compress <span className="text-green-500">Alpha Video</span></span>}
      description="Make your transparent videos load faster. Optimize file size now."
    />
  );
}