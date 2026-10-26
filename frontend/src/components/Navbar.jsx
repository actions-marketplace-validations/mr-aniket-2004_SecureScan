import React from "react";

export default function Navbar({
    repoUrl,
    setRepoUrl,
    onScan,
    isScanning,
    hasResults,
    onExportPdf,
}) {
    return (
        <header className="h-14 border-b border-zinc-800 bg-[#0d121f] px-4 flex items-center justify-between gap-4 select-none shrink-0">
            {/* Brand & Live Backend Status */}
            <div className="flex items-center gap-3 min-w-max">
                <div className="w-7 h-7 rounded border border-cyan-500/40 bg-cyan-950/40 flex items-center justify-center font-mono font-bold text-cyan-400 text-xs">
          //S
                </div>
                <span className="font-mono font-semibold text-sm tracking-wide text-white">
                    SecScan<span className="text-cyan-400">.engine</span>
                </span>
                <span className="hidden xl:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    FastAPI + Supabase Active
                </span>
            </div>

            {/* Target Repo Scan Form in Nav */}
            <form onSubmit={onScan} className="flex-1 max-w-2xl flex items-center gap-2">
                <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 font-mono text-xs text-zinc-500">git::</span>
                    <input
                        type="text"
                        required
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        placeholder="https://github.com/username/repository.git"
                        className="w-full bg-[#080c14] border border-zinc-800 focus:border-cyan-500 rounded px-3 py-1.5 pl-12 font-mono text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isScanning}
                    className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-mono text-xs px-4 py-1.5 rounded flex items-center gap-2 font-medium shrink-0 shadow-sm transition"
                >
                    {isScanning ? (
                        <>
                            <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            Scanning...
                        </>
                    ) : (
                        <>
                            <span>▶</span> Start Security Scan
                        </>
                    )}
                </button>
            </form>

            {/* Aux Action: Export PDF */}
            <div className="flex items-center gap-2 min-w-max">
                <button
                    type="button"
                    disabled={!hasResults}
                    onClick={onExportPdf}
                    className="text-xs font-mono text-emerald-400 hover:text-emerald-300 disabled:text-zinc-600 disabled:border-zinc-800/50 disabled:bg-transparent px-3 py-1 rounded bg-emerald-950/40 border border-emerald-800/50 flex items-center gap-1.5 transition"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    Export PDF
                </button>
            </div>
        </header>
    );
}