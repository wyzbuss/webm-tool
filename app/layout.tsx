import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 1. 网页标题：强调核心功能
  title: "Transparent WebM Converter | MOV to WebM with Alpha for OBS",
  
  // 2. 描述：这是给 Google/百度 爬虫看的，也是分享链接时显示的文字
  description: "Free, secure, and fast tool to convert MOV/MP4 videos to WebM with transparency (Alpha Channel). Perfect for OBS Stinger transitions, alerts, and stream overlays. 100% Client-side processing (No file upload).",
  
  // 3. 关键词：让用户能搜到你
  keywords: [
    "WebM Converter", 
    "Transparent WebM", 
    "Alpha Channel", 
    "MOV to WebM", 
    "OBS Stinger Transition", 
    "Stream Overlay", 
    "FFmpeg WASM", 
    "Client-side Converter"
  ],
  
  // 4. 作者信息
  authors: [{ name: "Visual Studio" }],
  
  // 5. 针对社交媒体分享的优化 (Open Graph)
  openGraph: {
    title: "Video to Transparent WebM | Free OBS Tool",
    description: "Convert MOV to WebM with transparency instantly in your browser. No server upload required.",
    type: "website",
  },
  // 👇 复制这一段
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}