import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart2, 
  Cpu, 
  Play, 
  Sliders, 
  CheckCircle2, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const MLPlayground: React.FC = () => {
  const [modelType, setModelType] = useState<
    'logistic' | 'random_forest' | 'decision_tree' | 'kmeans' | 'linear_regression'
  >('random_forest');

  const [testSplit, setTestSplit] = useState(20);
  const [nEstimators, setNEstimators] = useState(100);
  const [maxDepth, setMaxDepth] = useState(8);
  const [isTrained, setIsTrained] = useState(true);

  // Model-specific metrics
  const getMetrics = () => {
    switch (modelType) {
      case 'random_forest':
        return {
          accuracy: '88.4%',
          precision: '84.2%',
          recall: '87.1%',
          f1: '85.6%',
          rocAuc: '0.892',
          type: 'classification',
          confusionMatrix: [
            [740, 60],
            [45, 155],
          ],
        };
      case 'logistic':
        return {
          accuracy: '82.1%',
          precision: '76.5%',
          recall: '79.0%',
          f1: '77.7%',
          rocAuc: '0.814',
          type: 'classification',
          confusionMatrix: [
            [690, 110],
            [69, 131],
          ],
        };
      case 'decision_tree':
        return {
          accuracy: '84.8%',
          precision: '80.1%',
          recall: '81.4%',
          f1: '80.7%',
          rocAuc: '0.835',
          type: 'classification',
          confusionMatrix: [
            [715, 85],
            [67, 133],
          ],
        };
      case 'kmeans':
        return {
          clusters: 3,
          silhouetteScore: '0.68',
          inertia: '428.5',
          type: 'clustering',
          clusterCounts: [320, 480, 200],
        };
      case 'linear_regression':
        return {
          mae: '₹1,240',
          mse: '₹2,840,000',
          rmse: '₹1,685',
          r2: '0.864',
          type: 'regression',
        };
    }
  };

  const metrics = getMetrics();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <span>Interactive Machine Learning Benchmark Lab</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Tune hyperparameters, train classification/regression models, and inspect confusion matrices.
          </p>
        </div>

        <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
          Dataset: Telecom Churn Telemetry (1,000 records)
        </span>
      </div>

      {/* Model Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'random_forest', label: 'Random Forest' },
          { id: 'logistic', label: 'Logistic Regression' },
          { id: 'decision_tree', label: 'Decision Tree' },
          { id: 'kmeans', label: 'K-Means Clustering' },
          { id: 'linear_regression', label: 'Linear Regression' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setModelType(m.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${
              modelType === m.id
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Hyperparameter Controls (5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-xl p-5 border border-slate-800 bg-[#0c101c]/80 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase font-semibold">
            <Sliders className="w-4 h-4" />
            <span>Model Hyperparameters</span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            {/* Test Split Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Holdout Test Split:</span>
                <span className="text-cyan-300">{testSplit}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                value={testSplit}
                onChange={(e) => setTestSplit(parseInt(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            {/* Estimators for Random Forest */}
            {modelType === 'random_forest' && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>n_estimators (Trees):</span>
                  <span className="text-cyan-300">{nEstimators}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="10"
                  value={nEstimators}
                  onChange={(e) => setNEstimators(parseInt(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            )}

            {/* Max Depth */}
            {(modelType === 'random_forest' || modelType === 'decision_tree') && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>max_depth:</span>
                  <span className="text-cyan-300">{maxDepth}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={maxDepth}
                  onChange={(e) => setMaxDepth(parseInt(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            )}

            {/* Target Features */}
            <div className="pt-2 border-t border-white/5 space-y-1">
              <span className="text-slate-500 uppercase text-[10px]">Included Features:</span>
              <div className="flex flex-wrap gap-1 text-[11px] text-slate-300">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Tenure (Months)</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Monthly Charges</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Tech Support Calls</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Contract Type</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Model Metrics & Confusion Matrix (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-xl p-5 border border-slate-800 bg-[#0c101c]/80 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/5 font-mono text-xs">
            <span className="text-slate-300 font-semibold uppercase flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Evaluation Scorecard
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Converged
            </span>
          </div>

          {metrics.type === 'classification' && (
            <div className="space-y-4">
              {/* Metric Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">ACCURACY</div>
                  <div className="text-lg font-bold text-cyan-400">{metrics.accuracy}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">PRECISION</div>
                  <div className="text-lg font-bold text-blue-400">{metrics.precision}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">RECALL</div>
                  <div className="text-lg font-bold text-purple-400">{metrics.recall}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">ROC-AUC</div>
                  <div className="text-lg font-bold text-emerald-400">{metrics.rocAuc}</div>
                </div>
              </div>

              {/* Confusion Matrix Visualization */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-slate-400 uppercase">
                  Confusion Matrix (Holdout Test Set):
                </div>
                <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs max-w-sm mx-auto">
                  <div className="p-3 rounded bg-slate-900 border border-emerald-500/30">
                    <div className="text-[10px] text-slate-500">True Negative</div>
                    <div className="text-base font-bold text-emerald-400">{metrics.confusionMatrix?.[0][0]}</div>
                  </div>
                  <div className="p-3 rounded bg-slate-900 border border-red-500/30">
                    <div className="text-[10px] text-slate-500">False Positive</div>
                    <div className="text-base font-bold text-red-400">{metrics.confusionMatrix?.[0][1]}</div>
                  </div>
                  <div className="p-3 rounded bg-slate-900 border border-amber-500/30">
                    <div className="text-[10px] text-slate-500">False Negative</div>
                    <div className="text-base font-bold text-amber-400">{metrics.confusionMatrix?.[1][0]}</div>
                  </div>
                  <div className="p-3 rounded bg-slate-900 border border-emerald-500/30">
                    <div className="text-[10px] text-slate-500">True Positive</div>
                    <div className="text-base font-bold text-emerald-400">{metrics.confusionMatrix?.[1][1]}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {metrics.type === 'regression' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-500">MAE</div>
                <div className="text-lg font-bold text-cyan-400">{metrics.mae}</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-500">RMSE</div>
                <div className="text-lg font-bold text-blue-400">{metrics.rmse}</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-500">R² SCORE</div>
                <div className="text-lg font-bold text-emerald-400">{metrics.r2}</div>
              </div>
            </div>
          )}

          {metrics.type === 'clustering' && (
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-500">CLUSTERS (K)</div>
                <div className="text-lg font-bold text-cyan-400">{metrics.clusters}</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-500">SILHOUETTE</div>
                <div className="text-lg font-bold text-purple-400">{metrics.silhouetteScore}</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-500">INERTIA</div>
                <div className="text-lg font-bold text-blue-400">{metrics.inertia}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
