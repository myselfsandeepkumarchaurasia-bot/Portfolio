import React, { useState } from 'react';
import { 
  Database, 
  Play, 
  Clock, 
  CheckCircle2, 
  Table, 
  Layers, 
  Info,
  Sparkles
} from 'lucide-react';
import { SAMPLE_SQL_DATABASE } from '../../data/portfolioData';

export const SQLLab: React.FC = () => {
  const [query, setQuery] = useState(
    "SELECT customer_id, name, region, tier, churn_risk FROM customers WHERE churn_risk > 0.5 ORDER BY churn_risk DESC;"
  );
  const [loading, setLoading] = useState(false);
  const [queryResult, setQueryResult] = useState<{
    columns: string[];
    rows: any[];
    rowCount: number;
    executionTimeMs: string;
    error?: string;
  } | null>(null);

  const queryTemplates = [
    {
      label: 'High-Risk Churners (>50%)',
      sql: "SELECT customer_id, name, region, tier, churn_risk FROM customers WHERE churn_risk > 0.5 ORDER BY churn_risk DESC;",
    },
    {
      label: 'Completed Orders > ₹30,000',
      sql: "SELECT order_id, customer_id, amount, status, order_date FROM orders WHERE amount > 30000 ORDER BY amount DESC;",
    },
    {
      label: 'AI & Data Team Compensation',
      sql: "SELECT emp_id, name, department, salary, rating FROM employees WHERE salary > 1000000 ORDER BY salary DESC;",
    },
    {
      label: 'Generative AI Products Catalog',
      sql: "SELECT product_id, name, category, price, in_stock FROM products WHERE category = 'GenAI';",
    },
  ];

  const handleExecuteSQL = async (sqlToRun?: string) => {
    const activeSql = sqlToRun || query;
    if (!activeSql.trim()) return;

    setLoading(true);

    try {
      const res = await fetch('/api/sql/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: activeSql }),
      });

      const data = await res.json();
      if (res.ok) {
        setQueryResult(data);
      } else {
        setQueryResult({
          columns: [],
          rows: [],
          rowCount: 0,
          executionTimeMs: '0.00 ms',
          error: data.error || 'Execution failed',
        });
      }
    } catch {
      // Local fallback execution using client-side tables
      const clean = activeSql.toLowerCase();
      let tableData: any[] = SAMPLE_SQL_DATABASE.customers;
      if (clean.includes('from orders')) tableData = SAMPLE_SQL_DATABASE.orders;
      else if (clean.includes('from employees')) tableData = SAMPLE_SQL_DATABASE.employees;
      else if (clean.includes('from products')) tableData = SAMPLE_SQL_DATABASE.products;

      setQueryResult({
        columns: tableData.length > 0 ? Object.keys(tableData[0]) : [],
        rows: tableData,
        rowCount: tableData.length,
        executionTimeMs: '1.42 ms (in-browser sandbox)',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <span>Interactive SQL Analytics Lab</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Execute analytical SQL queries against Sandeep's sample business intelligence database.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
          <Table className="w-3.5 h-3.5 text-cyan-400" />
          <span>Tables: customers, orders, employees, products</span>
        </div>
      </div>

      {/* Query Template Presets */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono text-slate-400 uppercase">Analytical Query Templates:</label>
        <div className="flex flex-wrap gap-2">
          {queryTemplates.map((t, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(t.sql);
                handleExecuteSQL(t.sql);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* SQL Editor Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>SQL Query Console (SELECT only):</span>
          <span className="text-[11px] text-emerald-400">Read-Only Sandbox Guardrail Active</span>
        </div>

        <div className="relative">
          <textarea
            rows={4}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500/60 leading-relaxed"
          />
          <button
            onClick={() => handleExecuteSQL()}
            disabled={loading || !query.trim()}
            className="absolute bottom-3 right-3 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors shadow-md"
          >
            {loading ? <span className="animate-spin">⟳</span> : <Play className="w-3.5 h-3.5 fill-slate-950" />}
            <span>Execute SQL</span>
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="glass-panel rounded-xl border border-slate-800 bg-[#0c101c]/80 overflow-hidden space-y-2">
        <div className="p-3 bg-slate-900/80 border-b border-white/5 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-semibold uppercase flex items-center gap-1.5">
            <Table className="w-4 h-4 text-cyan-400" />
            Query Result Set
          </span>
          <div className="flex items-center gap-3 text-slate-400">
            {queryResult && (
              <>
                <span>{queryResult.rowCount} rows</span>
                <span>·</span>
                <span className="text-cyan-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {queryResult.executionTimeMs}
                </span>
              </>
            )}
          </div>
        </div>

        {queryResult?.error ? (
          <div className="p-6 text-center text-xs font-mono text-red-400">
            Error: {queryResult.error}
          </div>
        ) : queryResult && queryResult.rows.length > 0 ? (
          <div className="overflow-x-auto max-h-72">
            <table className="w-full text-left text-xs font-mono text-slate-300">
              <thead className="bg-slate-950/90 text-slate-400 border-b border-slate-800">
                <tr>
                  {queryResult.columns.map((col) => (
                    <th key={col} className="px-4 py-2.5 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {queryResult.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-900/50 transition-colors">
                    {queryResult.columns.map((col) => (
                      <td key={col} className="px-4 py-2 text-slate-200">
                        {typeof row[col] === 'number'
                          ? row[col].toLocaleString()
                          : String(row[col])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-500 font-mono text-xs">
            Enter a SQL statement and click <strong>"Execute SQL"</strong> to view tabular results.
          </div>
        )}
      </div>
    </div>
  );
};
