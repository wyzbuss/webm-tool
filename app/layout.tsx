import type { Metadata } from "next";
// 👇 1. 引入 Script 组件
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  // 🚀 优化点：保留了你优秀的标题和描述
  title: "Transparent WebM Converter | Free MOV/MP4 to WebM for OBS",
  description: "Free, secure, and fast tool to convert MOV/MP4 videos to WebM with transparency (Alpha Channel). Perfect for OBS Stinger transitions, alerts, and stream overlays. 100% Client-side processing (No file upload).",
  keywords: [
    "WebM Converter", 
    "Transparent WebM", 
    "Alpha Channel", 
    "MOV to WebM", 
    "MP4 to WebM", 
    "OBS Stinger Transition", 
    "Stream Overlay", 
    "FFmpeg WASM", 
    "Client-side Converter"
  ],
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎬</text></svg>',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 👇 我加上了和 ChannelPacker 一样的深色背景样式，保持品牌一致性 */}
      <body className="bg-slate-950 font-sans text-slate-200">
        {children}

        {/* 👇 2. 插入 Clarity 代码 (Project ID: urfq8blpo3) */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "urfq8blpo3");
          `}
        </Script>
      </body>
    </html>
  );
}