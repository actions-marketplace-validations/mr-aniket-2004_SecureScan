import React, { useEffect, useState } from 'react';
import { Bot, ShieldAlert, Code2, Loader2, AlertCircle, Copy, Check } from 'lucide-react';
import { API_BASE_URL } from '../services/api';

export default function RemediationWorkbench({ finding }) {
  const [remediation, setRemediation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!finding) {
      setRemediation(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setRemediation(null);

    const query = new URLSearchParams({
      issue_type: finding.issue_type || finding.type || '',
      file_path: finding.file_path || finding.file || '',
      line_number: finding.line_number || finding.line || 1,
      validation_status: finding.validation_status || finding.status || 'UNVERIFIED',
    });

    fetch(`${API_BASE_URL}/remediation?${query.toString()}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const result = data.remediation || (data.status === 'SUCCESS' ? data : null);

        if (result) {
          setRemediation(result);
        } else {
          setError(data.message || 'Failed to generate remediation guide.');
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error('Failed to fetch remediation:', err);
        setError('Unable to reach the remediation service. Please check backend connectivity.');
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [finding]);

  if (!finding) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-500 bg-[#0b0f19]">
        <Bot className="w-12 h-12 text-zinc-700 mb-3" />
        <p className="font-mono text-xs max-w-sm">
          Select any finding on the left to invoke the AI Remediation Engine and generate automated rotation steps.
        </p>
      </div>
    );
  }

  const handleCopyCode = () => {
    if (!remediation?.code_example) return;
    navigator.clipboard.writeText(remediation.code_example);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="flex-1 flex flex-col bg-[#0b0f19] overflow-y-auto p-6">
      {/* Header & Status Indicator */}
      <div className="border-b border-zinc-800 pb-4 mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase border ${
                (remediation?.urgency || finding.severity) === 'CRITICAL'
                  ? 'bg-rose-950 text-rose-300 border-rose-800'
                  : 'bg-amber-950 text-amber-300 border-amber-800'
              }`}
            >
              {remediation?.urgency || finding.severity || 'HIGH'} URGENCY
            </span>
            <span className="text-xs font-mono text-zinc-500">•</span>
            <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
              <Bot className="w-3.5 h-3.5" /> AI Remediation Engine
            </span>
          </div>
          <h2 className="text-lg font-semibold text-white tracking-wide">
            {remediation?.title || finding.type || finding.issue_type}
          </h2>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Location: <code className="text-cyan-400">{finding.file_path || finding.file}</code> : Line {finding.line_number || finding.line || 1}
          </p>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-zinc-400 gap-3">
            <Loader2 className="w-7 h-7 text-cyan-500 animate-spin" />
            <p className="text-xs font-mono">Generating AI rotation instructions from Gemini...</p>
          </div>
        ) : error ? (
          <div className="bg-rose-950/20 border border-rose-800/50 rounded-lg p-5 text-center space-y-2">
            <AlertCircle className="w-6 h-6 text-rose-400 mx-auto" />
            <p className="text-rose-300 font-mono text-xs">{error}</p>
          </div>
        ) : remediation ? (
          <>
            {/* Summary Box */}
            <div className="bg-[#070a12] rounded-lg p-4 border border-zinc-800/80">
              <h3 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                Threat Context
              </h3>
              <p className="text-zinc-300 text-xs leading-relaxed">
                {remediation.summary}
              </p>
            </div>

            {/* Action Steps */}
            {remediation.steps && remediation.steps.length > 0 && (
              <div>
                <h3 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
                  Recommended Action Steps
                </h3>
                <div className="space-y-2">
                  {remediation.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-[#070a12] p-3 rounded border border-zinc-800/80 text-xs text-zinc-300 font-mono flex items-start gap-2.5"
                    >
                      <span className="text-cyan-400 font-bold">{idx + 1}.</span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Implementation Fix */}
            {remediation.code_example && (
              <div className="rounded border border-zinc-800 bg-[#06080e] overflow-hidden">
                <div className="bg-zinc-900/60 px-4 py-2 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" /> Secure Implementation Patch
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white transition"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  <code>{remediation.code_example}</code>
                </pre>
              </div>
            )}
          </>
        ) : null}
      </div>
    </section>
  );
}