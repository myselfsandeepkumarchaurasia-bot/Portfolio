import React, { useState } from 'react';
import { 
  BarChart3, 
  Filter, 
  Users, 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Layers, 
  Download,
  Building2
} from 'lucide-react';

export const AnalyticsLab: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('2025');

  const deptMetrics: Record<string, { headcount: number; attritionRate: number; satisfaction: number; avgTenureYrs: number }> = {
    All: { headcount: 284, attritionRate: 8.4, satisfaction: 4.6, avgTenureYrs: 3.4 },
    'AI & Data': { headcount: 62, attritionRate: 4.2, satisfaction: 4.9, avgTenureYrs: 3.8 },
    Engineering: { headcount: 110, attritionRate: 9.1, satisfaction: 4.5, avgTenureYrs: 3.2 },
    Operations: { headcount: 54, attritionRate: 11.5, satisfaction: 4.2, avgTenureYrs: 2.9 },
    Product: { headcount: 58, attritionRate: 6.8, satisfaction: 4.7, avgTenureYrs: 3.9 },
  };

  const current = deptMetrics[selectedDept] || deptMetrics.All;

  const monthlyAttritionTrend = [
    { month: 'Jan', rate: 1.2 },
    { month: 'Feb', rate: 0.9 },
    { month: 'Mar', rate: 0.6 },
    { month: 'Apr', rate: 0.8 },
    { month: 'May', rate: 0.5 },
    { month: 'Jun', rate: 0.7 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span>Enterprise HR & Workforce Intelligence Dashboard</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Inspired by Sandeep's Power BI enterprise solutions with dynamic star-schema DAX measures.
          </p>
        </div>

        {/* Filter Slicers Bar */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Slicers:</span>
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-cyan-300 focus:outline-none"
          >
            <option value="All">All Departments</option>
            <option value="AI & Data">AI & Data</option>
            <option value="Engineering">Engineering</option>
            <option value="Operations">Operations</option>
            <option value="Product">Product</option>
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-cyan-300 focus:outline-none"
          >
            <option value="2025">FY 2025</option>
            <option value="2024">FY 2024</option>
          </select>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 font-mono space-y-1">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Active Headcount</span>
          </div>
          <div className="text-2xl font-bold text-white">{current.headcount}</div>
          <div className="text-[10px] text-emerald-400">+14% YoY Growth</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 font-mono space-y-1">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
            <span>Annualized Attrition</span>
          </div>
          <div className="text-2xl font-bold text-emerald-400">{current.attritionRate}%</div>
          <div className="text-[10px] text-slate-400">Industry Avg: 14.8%</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 font-mono space-y-1">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <PieChart className="w-3.5 h-3.5 text-blue-400" />
            <span>Employee CSAT</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">{current.satisfaction} / 5.0</div>
          <div className="text-[10px] text-slate-400">Quarterly Pulse Survey</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 font-mono space-y-1">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Avg Tenure Band</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">{current.avgTenureYrs} Yrs</div>
          <div className="text-[10px] text-slate-400">Retention Optimized</div>
        </div>
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Trend Bar Chart */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 font-semibold uppercase">
              Monthly Departure Velocity (%)
            </span>
            <span className="text-cyan-400">Rolling Trailing Pacing</span>
          </div>

          <div className="h-44 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-800">
            {monthlyAttritionTrend.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-mono text-cyan-400">{item.rate}%</span>
                <div
                  className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-md transition-all duration-300 hover:opacity-80"
                  style={{ height: `${item.rate * 60}%` }}
                />
                <span className="text-[11px] font-mono text-slate-400">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Composition Table */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-white/5">
            <span className="text-slate-300 font-semibold uppercase">
              Departmental Risk Distribution
            </span>
            <span className="text-slate-500">Power BI Model View</span>
          </div>

          <div className="space-y-3 pt-1">
            {[
              { name: 'AI & Data Engineering', share: '32%', risk: 'Low (4.2%)', color: 'bg-cyan-500' },
              { name: 'Full-Stack Software', share: '40%', risk: 'Moderate (9.1%)', color: 'bg-blue-500' },
              { name: 'Cloud Infrastructure & DevOps', share: '18%', risk: 'Low (5.4%)', color: 'bg-purple-500' },
              { name: 'Operations & Support', share: '10%', risk: 'High (11.5%)', color: 'bg-amber-500' },
            ].map((d, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-slate-300 text-[11px]">
                  <span>{d.name}</span>
                  <span className="text-slate-400">{d.risk}</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${d.color} rounded-full`} style={{ width: d.share }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
