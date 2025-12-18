'use client';

import { useState, useRef, useEffect } from 'react';
import type { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Initializing...');
  const [progress, setProgress] = useState(0);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  const load = async () => {
    try {
      const { FFmpeg } = await import('@ffmpeg/ffmpeg');
      ffmpegRef.current = new FFmpeg();
      const ffmpeg = ffmpegRef.current;

      ffmpeg.on('log', ({ message }) => {
        console.log(message);
        if (messageRef.current && message.length < 200) {
          messageRef.current.innerHTML = message;
        }
      });

      ffmpeg.on('progress', ({ progress }) => {
        const p = Math.round(progress * 100);
        if (p > 0 && p <= 100) setProgress(p);
        setMessage(`Converting... ${Math.round(progress * 100)}%`);
      });

      const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/umd';
      console.log(`Loading Engine from: ${baseURL}`);

      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
      });
      
      setLoaded(true);
      setMessage('Ready. Tap to upload.');
    } catch (error) {
      console.error(error);
      setMessage('Error loading engine. Check console.');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const transcode = async () => {
    if (!videoFile || !ffmpegRef.current) return;
    const ffmpeg = ffmpegRef.current;
    
    setIsLoading(true);
    setDownloadUrl('');
    setProgress(0);
    setMessage('Processing... (Keep screen on)');

    const inputName = 'input.mov';
    const outputName = 'output.webm';

    try {
      await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

      await ffmpeg.exec([
        '-i', inputName,
        '-an', 
        '-c:v', 'libvpx', 
        '-pix_fmt', 'yuva420p',
        '-auto-alt-ref', '0', 
        '-r', '30',
        '-quality', 'realtime',
        '-speed', '5', 
        '-cpu-used', '5', 
        '-b:v', '1M',
        '-threads', '4', 
        outputName
      ]);

      const data = await ffmpeg.readFile(outputName);
      const url = URL.createObjectURL(
        new Blob([(data as Uint8Array).buffer], { type: 'video/webm' })
      );
      setDownloadUrl(url);
      
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
      
      setIsLoading(false);
      setMessage('Done!');
      setProgress(100);

    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setMessage('Conversion failed.');
      alert('Error. Mobile browsers have strict memory limits. Try a smaller file.');
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-200 flex flex-col font-sans">
      {/* 顶部导航：手机端减少内边距 */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-700 rounded-lg flex items-center justify-center text-white font-bold shadow-lg text-sm">W</div>
            <div className="font-bold text-lg tracking-tight text-white truncate">
              Transparent<span className="text-green-500">WebM</span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-500 border border-slate-800 px-2 py-1 rounded hidden sm:block">v1.0 Mobile</div>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-xl bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-6 md:p-8 rounded-2xl shadow-2xl shadow-black/50">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-2">
              MOV to <span className="text-green-500">WebM</span>
            </h1>
            <p className="text-slate-400 text-xs md:text-base">
              Client-side converter with <strong>Transparency</strong>.
            </p>
          </div>

          {!loaded && (
            <div className="flex items-center justify-center gap-3 text-yellow-500 bg-yellow-900/20 p-4 rounded-lg border border-yellow-700/30 mb-6 text-sm">
               <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
               <span>Loading Engine...</span>
            </div>
          )}

          {loaded && !downloadUrl && (
            <div className="space-y-4 md:space-y-6">
               {/* 增大点击区域，方便手指触摸 */}
               <div className="relative border-2 border-dashed border-slate-600 rounded-xl p-8 md:p-10 flex flex-col items-center justify-center hover:bg-slate-800/50 hover:border-green-500/50 transition-all cursor-pointer group active:scale-95 duration-100">
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" onChange={(e) => setVideoFile(e.target.files?.item(0) || null)} accept=".mov,.mp4,.avi" />
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  </div>
                  {videoFile ? (
                    <div className="text-center w-full overflow-hidden">
                      <p className="text-white font-medium text-base truncate px-4">{videoFile.name}</p>
                      <p className="text-slate-500 text-xs">{(videoFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-slate-200 font-medium text-sm md:text-base">Tap to Upload Video</p>
                      <p className="text-slate-500 text-xs mt-1">MOV / MP4</p>
                    </div>
                  )}
               </div>
               
               {/* 手机端的提示文案 */}
               {!videoFile && (
                 <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-left text-xs text-slate-400 space-y-2">
                    <div className="font-bold text-slate-300">💡 Mobile Tips</div>
                    <ul className="list-disc list-inside space-y-1 ml-1 text-[11px] md:text-xs">
                      <li><strong>Battery:</strong> Processing uses high power.</li>
                      <li><strong>Keep Screen On:</strong> Don't lock screen while converting.</li>
                      <li><strong>Memory:</strong> Mobile browsers may crash on large files.</li>
                    </ul>
                 </div>
               )}

               {videoFile && (
                  <>
                    <button onClick={transcode} disabled={isLoading} className={`w-full py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${isLoading ? 'bg-slate-700 cursor-not-allowed text-slate-400' : 'bg-green-600 hover:bg-green-500 text-white'}`}>
                      {isLoading ? 'Converting...' : 'Start Conversion'}
                    </button>
                    {isLoading && (
                      <div className="w-full bg-slate-800 rounded-full h-4 mt-2 overflow-hidden border border-slate-700 relative">
                        <div className="bg-green-500 h-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow-md">{progress}%</div>
                      </div>
                    )}
                  </>
               )}
            </div>
          )}

          {downloadUrl && (
            <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-5 text-center animate-fade-in">
              <h3 className="text-lg font-bold text-white mb-4">Success!</h3>
              <div className="flex flex-col gap-3 justify-center">
                <a href={downloadUrl} download="transparent.webm" className="w-full px-6 py-3 bg-white text-green-900 font-bold rounded-lg hover:bg-gray-100 transition shadow-lg text-sm">Download WebM</a>
                <button onClick={() => { setDownloadUrl(''); setVideoFile(null); setProgress(0); }} className="w-full px-6 py-3 bg-slate-800 text-slate-300 font-medium rounded-lg hover:bg-slate-700 transition text-sm">Convert Another</button>
              </div>
            </div>
          )}
          
          <div className="mt-6 p-3 bg-black/40 rounded-lg border border-gray-800 font-mono text-[10px] h-20 overflow-y-auto text-gray-500"><p ref={messageRef}>{message}</p></div>
        </div>
      </div>
    </main>
  );
}