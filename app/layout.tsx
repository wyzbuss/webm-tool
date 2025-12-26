import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Transparent WebM Converter | Free MOV/MP4 to WebM for OBS",
  description: "Free, secure, and fast tool to convert MOV/MP4 videos to WebM with transparency (Alpha Channel). Perfect for OBS Stinger transitions, alerts, and stream overlays. 100% Client-side processing (No file upload).",
  keywords: [
    "WebM Converter", "Transparent WebM", "Alpha Channel", "MOV to WebM", 
    "MP4 to WebM", "OBS Stinger Transition", "Stream Overlay", "FFmpeg WASM"
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
      <body className="bg-slate-950 font-sans text-slate-200 flex flex-col min-h-screen">
        
        {children}

        {/* 👇 优化后的高对比度 Footer */}
        <footer className="border-t border-slate-800 bg-slate-950 py-16 mt-auto">
          <div className="mx-auto max-w-5xl px-4 text-center">
            
            {/* 1. SEO 链接区域 - 字体调亮，不再是灰色 */}
            <div className="mb-12">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-6">
                ✨ Popular Use Cases
              </p>
              <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-base font-medium text-slate-300">
                <li>
                  <a href="/obs-stinger-converter" className="hover:text-white hover:underline decoration-blue-500 underline-offset-4 transition">
                    OBS Stinger Converter
                  </a>
                </li>
                <li className="text-slate-700 hidden sm:block">•</li>
                <li>
                  <a href="/mov-to-webm-online" className="hover:text-white hover:underline decoration-green-500 underline-offset-4 transition">
                    MOV to WebM Online
                  </a>
                </li>
                <li className="text-slate-700 hidden sm:block">•</li>
                <li>
                  <a href="/compress-transparent-video" className="hover:text-white hover:underline decoration-purple-500 underline-offset-4 transition">
                    Compress Alpha Video
                  </a>
                </li>
              </ul>
            </div>

            {/* 分割线 */}
            <div className="w-24 h-px bg-slate-800 mx-auto mb-12"></div>

            {/* 2. 工具矩阵互推 - 卡片更亮，文字更清晰 */}
            <h3 className="mb-8 text-xs font-bold uppercase tracking-widest text-slate-400">
              More Free Tools by ChannelPacker
            </h3>
            
            <div className="flex flex-col justify-center gap-4 sm:flex-row mb-12">
              {/* Channel Packer 卡片 */}
              <a href="https://channelpacker.com" target="_blank" className="group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/50 p-5 transition-all hover:border-orange-500 hover:bg-slate-800 flex items-center gap-4 text-left w-full sm:w-72 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-900/20">
                <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📦
                </div>
                <div>
                  <p className="font-bold text-slate-100 group-hover:text-orange-400 text-base">Channel Packer</p>
                  <p className="text-xs text-slate-400 mt-1">Pack AO, Roughness & Metallic</p>
                </div>
              </a>
              
              {/* Normal Map 卡片 */}
              <a href="https://normalmap.channelpacker.com" target="_blank" className="group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/50 p-5 transition-all hover:border-blue-500 hover:bg-slate-800 flex items-center gap-4 text-left w-full sm:w-72 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🔮
                </div>
                <div>
                  <p className="font-bold text-slate-100 group-hover:text-blue-400 text-base">Normal Generator</p>
                  <p className="text-xs text-slate-400 mt-1">Create Normal maps from images</p>
                </div>
              </a>
            </div>

            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} TransparentWebM. All processing happens locally in your browser.
            </p>
          </div>
        </footer>

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