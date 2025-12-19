import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  // 🚀 优化点：标题里加上 "Free" 和 "MP4"，点击率更高
  title: "Transparent WebM Converter | Free MOV/MP4 to WebM for OBS",
  
  // ✅ 描述：你原本写的这个简直满分，保留！
  description: "Free, secure, and fast tool to convert MOV/MP4 videos to WebM with transparency (Alpha Channel). Perfect for OBS Stinger transitions, alerts, and stream overlays. 100% Client-side processing (No file upload).",
  
  // ✅ 关键词：保留，无需修改
  keywords: [
    "WebM Converter", 
    "Transparent WebM", 
    "Alpha Channel", 
    "MOV to WebM", 
    "MP4 to WebM", // 我顺手帮你补了个 MP4
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
      <body>{children}</body>
    </html>
  );
}