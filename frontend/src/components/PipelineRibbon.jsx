import React from "react";

export default function PipelineRibbon({ scanResult, isScanning, onSelectPreset }) {
  const currentStep = isScanning ? 2 : scanResult ? 3 : 1;

  return (
    <>
      {/* 3-Step Execution Pipeline Ribbon */}
      <section className="border-b border-zinc-800 bg-[#0a0e18] px-4 py-2 flex items-center justify-between text-xs font-mono shrink-0 select-none">
        <div className="flex items-center gap-6 overflow-x-auto py-0.5">
          <span className="text-zinc-500 font-semibold tracking-wider text-[11px]">PIPELINE:</span>

          <div className={`flex items-center gap-2 ${currentStep >= 1 ? "text-cyan-300" : "text-zinc-500"}`}>
            <span className="w-4 h-4 rounded-full bg-cyan-950 border border-cyan-500/80 text-cyan-400 flex items-center justify-center text-[10px] font-bold">1</span>
            <span>Provide Repo URL</span>
          </div>
          <span className="text-zinc-700">→</span>

          <div className={`flex items-center gap-2 ${currentStep >= 2 ? "text-cyan-300" : "text-zinc-500"}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 2 ? "bg-cyan-950 border border-cyan-500/80 text-cyan-400" : "bg-zinc-900 border border-zinc-800 text-zinc-600"}`}>2</span>
            <span>AST & In-Memory Audit</span>
          </div>
          <span className="text-zinc-700">→</span>

          <div className={`flex items-center gap-2 ${currentStep >= 3 ? "text-cyan-300" : "text-zinc-500"}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 3 ? "bg-cyan-950 border border-cyan-500/80 text-cyan-400" : "bg-zinc-900 border border-zinc-800 text-zinc-600"}`}>3</span>
            <span>Threats & Remediation Engine</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-zinc-500 text-[11px]">
          <span>Engine: <strong className="text-emerald-400">v1.0.0 Ready</strong></span>
          <span>•</span>
          <span>Memory Limit: <strong className="text-zinc-300">128MB Sandboxed</strong></span>
        </div>
      </section>

      {/* Preset & Metric Quick Strip */}
      <div className="h-10 border-b border-zinc-800 bg-[#0d121f]/50 px-4 flex items-center justify-between text-xs font-mono shrink-0">
        {scanResult ? (
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> STATUS: COMPLETED
            </span>
            <span className="text-zinc-700">|</span>
            <span>SCORE: <strong className="text-amber-400">{scanResult.security_score || "Grade C (Warning)"}</strong></span>
            <span className="text-zinc-700">|</span>
            <span>SECRETS: <strong className="text-zinc-200">{scanResult.exposed_secrets_count ?? 0}</strong></span>
            <span className="text-zinc-700">|</span>
            <span>VULNERABILITIES: <strong className="text-rose-400">{scanResult.vulnerabilities_count ?? (scanResult.findings?.length || 0)}</strong></span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 text-[11px]">QUICK PRESETS:</span>
            <button
              type="button"
              onClick={() => onSelectPreset("mr-aniket-2004/Journey.git")}
              className="bg-[#121929] hover:bg-[#1a243a] text-cyan-300 hover:text-white px-2 py-0.5 rounded border border-cyan-900/50 text-[11px] transition"
            >
              mr-aniket-2004/Journey.git
            </button>
            <button
              type="button"
              onClick={() => onSelectPreset("mr-aniket-2004/SecureScan.git")}
              className="bg-[#121929] hover:bg-[#1a243a] text-zinc-400 hover:text-white px-2 py-0.5 rounded border border-zinc-800 text-[11px] transition"
            >
              mr-aniket-2004/SecureScan.git
            </button>
          </div>
        )}
        <div className="text-[11px] text-zinc-500 font-mono hidden sm:block">
          {scanResult ? `Target: ${scanResult.repo_url || "Audited Repo"}` : "Mode: Ephemeral In-Memory (Zero Disk Footprint)"}
        </div>
      </div>
    </>
  );
}