// app/page.tsx
import WebMConverter from "@/app/components/WebMConverter";

// 保持首页原本的 Metadata 不变
export default function Home() {
  return (
    <WebMConverter 
      h1Title={<span>MOV to <span className="text-green-500">WebM</span></span>}
      description="Client-side converter with Transparency."
    />
  );
}