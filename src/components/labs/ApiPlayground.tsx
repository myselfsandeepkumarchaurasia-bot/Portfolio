import React, { useState } from 'react';
import { 
  Server, 
  Play, 
  CheckCircle2, 
  Clock, 
  Code2, 
  Copy, 
  Check, 
  Sparkles,
  Layers
} from 'lucide-react';

export const ApiPlayground: React.FC = () => {
  const endpoints = [
    {
      method: 'POST',
      path: '/api/chat',
      title: 'Sandeep AI Grounded Query',
      body: JSON.stringify({ message: 'What AI projects did Sandeep build?' }, null, 2),
    },
    {
      method: 'POST',
      path: '/api/rag/query',
      title: 'RAG Pipeline Query & Top-K',
      body: JSON.stringify({ query: 'What did Sandeep build at Aptus IT Solution?' }, null, 2),
    },
    {
      method: 'POST',
      path: '/api/agent/run',
      title: 'LangGraph Agent Execution',
      body: JSON.stringify({ task: 'Calculate 14500 * 12 annual compensation' }, null, 2),
    },
    {
      method: 'GET',
      path: '/api/system/status',
      title: 'AI System Health & Status',
      body: '',
    },
    {
      method: 'POST',
      path: '/api/sql/execute',
      title: 'Relational SQL Query',
      body: JSON.stringify({ query: 'SELECT * FROM customers WHERE churn_risk > 0.5' }, null, 2),
    },
  ];

  const [activeEndpoint, setActiveEndpoint] = useState(endpoints[0]);
  const [requestBody, setRequestBody] = useState(endpoints[0].body);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleSelectEndpoint = (ep: typeof endpoints[0]) => {
    setActiveEndpoint(ep);
    setRequestBody(ep.body);
    setResponse(null);
  };

  const handleExecute = async () => {
    setLoading(true);
    const start = performance.now();

    try {
      const options: RequestInit = {
        method: activeEndpoint.method,
        headers: { 'Content-Type': 'application/json' },
      };

      if (activeEndpoint.method === 'POST') {
        options.body = requestBody;
      }

      const res = await fetch(activeEndpoint.path, options);
      const data = await res.json();
      const duration = (performance.now() - start).toFixed(1);

      setResponse({
        status: res.status,
        statusText: res.statusText || 'OK',
        durationMs: `${duration} ms`,
        data,
      });
    } catch (err: any) {
      setResponse({
        status: 500,
        statusText: 'Client Error',
        durationMs: '0 ms',
        data: { error: err.message },
      });
    } finally {
      setLoading(false);
    }
  };

  const curlSnippet = activeEndpoint.method === 'GET'
    ? `curl -X GET "${window.location.origin}${activeEndpoint.path}"`
    : `curl -X POST "${window.location.origin}${activeEndpoint.path}" \\
  -H "Content-Type: application/json" \\
  -d '${requestBody.replace(/\n/g, '')}'`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCEBE1]">
        <div>
          <h3 className="text-lg font-bold text-[#18352A] flex items-center gap-2">
            <Server className="w-5 h-5 text-[#5BAF82]" />
            <span>FastAPI / Node REST API Playground</span>
          </h3>
          <p className="text-xs text-[#5E7067] mt-0.5">
            Test backend microservice endpoints live from the browser. Zero secrets exposed.
          </p>
        </div>

        <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#E8F8EE] border border-[#A8E6C1] text-[#18352A] font-semibold self-start sm:self-auto">
          FastAPI / Node Proxy Service
        </span>
      </div>

      {/* Endpoint Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {endpoints.map((ep, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectEndpoint(ep)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 ${
              activeEndpoint.path === ep.path
                ? 'bg-[#7BCB9B] text-[#18352A] font-bold shadow-sm'
                : 'bg-white border border-[#DCEBE1] text-[#5E7067] hover:text-[#18352A]'
            }`}
          >
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#18352A] text-white font-bold">
              {ep.method}
            </span>
            <span>{ep.path}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Request Builder (6 Cols) */}
        <div className="lg:col-span-6 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[#5E7067]">
            <span className="font-semibold uppercase text-[11px]">Request Payload:</span>
            <span>Content-Type: application/json</span>
          </div>

          {activeEndpoint.method === 'POST' ? (
            <textarea
              rows={8}
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] text-[#18352A] focus:outline-none focus:border-[#7BCB9B] leading-relaxed"
            />
          ) : (
            <div className="p-4 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] text-[#5E7067]">
              GET request takes no body parameters.
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleExecute}
              disabled={loading}
              className="px-5 py-2.5 rounded-lg bg-[#7BCB9B] hover:bg-[#5BAF82] text-[#18352A] hover:text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50"
            >
              {loading ? <span className="animate-spin">⟳</span> : <Play className="w-3.5 h-3.5 fill-[#18352A]" />}
              <span>Send Request</span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(curlSnippet);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-3 py-2 rounded-lg bg-white border border-[#DCEBE1] text-[#5E7067] hover:text-[#18352A] flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#5BAF82]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy cURL</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Response Inspector (6 Cols) */}
        <div className="lg:col-span-6 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[#5E7067]">
            <span className="font-semibold uppercase text-[11px]">Live Response Inspector:</span>
            {response && (
              <div className="flex items-center gap-2">
                <span className="text-[#5BAF82] font-bold">Status: {response.status}</span>
                <span>·</span>
                <span className="text-[#5E7067] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {response.durationMs}
                </span>
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] h-[260px] overflow-y-auto text-[#18352A] leading-relaxed">
            {response ? (
              <pre className="text-[11px] whitespace-pre-wrap">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            ) : (
              <div className="h-full flex items-center justify-center text-[#5E7067]">
                Click "Send Request" to invoke this endpoint live.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
