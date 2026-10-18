// import React from 'react';
// import { Shield, HardDriveDownload } from 'lucide-react';

// export default function Footer({ onOpenOfflineModal }) {
//   return (
//     <footer className="border-t border-slate-800 bg-slate-900/90 backdrop-blur mt-16 py-8">
//       <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        
//         {/* Left: Brand / Project info */}
//         <div className="flex items-center gap-3">
//           <div className="bg-blue-600/20 p-1.5 rounded-lg border border-blue-500/30 text-blue-400">
//             <Shield className="w-4 h-4" />
//           </div>
//           <div>
//             <p className="font-semibold text-slate-200">SecScan Engine</p>
//             <p className="text-slate-500">Automated GitHub Security & Dependency Auditor</p>
//           </div>
//         </div>

//         {/* Center: Offline Download Modal Trigger */}
//         <div className="flex items-center gap-3">
//           <button
//             type="button"
//             onClick={onOpenOfflineModal}
//             className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-slate-200 border border-slate-700 px-4 py-2 rounded-xl font-medium transition text-xs shadow-md"
//           >
//             <HardDriveDownload className="w-4 h-4 text-emerald-400" />
//             <span>Download Offline CLI</span>
//             <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase font-mono px-1.5 py-0.5 rounded ml-1">
//               v1.0 Live
//             </span>
//           </button>
//         </div>

//         {/* Right: Copyright & Credits */}
//         <div className="text-center md:text-right text-slate-500">
//           <p>Academic Project • Final Year Security Audit Platform</p>
//           <p className="mt-0.5 flex items-center justify-center md:justify-end gap-1">
//             Built with React, FastAPI & Supabase
//           </p>
//         </div>

//       </div>
//     </footer>
//   );
// }


import React from "react";

export default function Footer({ onDownloadOffline }) {
  return (
    <footer className="h-12 border-t border-zinc-800 bg-[#0d121f] px-5 flex items-center justify-between text-xs font-mono text-zinc-400 select-none shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-zinc-300 font-medium">SecScan Engine</span>
        <span className="text-zinc-600">|</span>
        <span className="text-zinc-500">Automated GitHub Security & Dependency Auditor</span>
      </div>

      {/* Offline CLI Download Action */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={onDownloadOffline}
          className="flex items-center gap-2 bg-[#161f30] hover:bg-[#1c283f] text-cyan-300 hover:text-cyan-200 border border-cyan-800/60 px-3.5 py-1.5 rounded text-xs transition shadow-sm"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          <span>Download Offline CLI</span>
          <span className="bg-emerald-900/60 text-emerald-400 text-[10px] px-1.5 py-0.2 rounded border border-emerald-700/50">v1.0 LIVE</span>
        </button>
      </div>

      <div className="hidden md:flex items-center gap-2 text-zinc-500 text-[11px]">
        <span>MCA Final Year Thesis</span>
        <span>•</span>
        <span>React + FastAPI + Supabase</span>
      </div>
    </footer>
  );
}