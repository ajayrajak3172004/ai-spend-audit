import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Cell, 
  Tooltip 
} from 'recharts';


export const SpendComparisonChart = ({ current_spend, optimized_spend, NumericValueFormate }) => {
  
  // Chart Data
  const chartData = [
    { name: 'Current', value: current_spend || 0, color: '#EF4444' }, // Red
    { name: 'Optimized', value: optimized_spend || 0, color: '#10B981' } // Green
  ];

  // Percentage calculation
  const savingsPercent = current_spend > 0 
    ? Math.round(((current_spend - optimized_spend) / current_spend) * 100) 
    : 0;

  return (
    <div className="p-8 flex flex-col  bg-gradient-to-br from-slate-50 to-white border-l border-slate-100">
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-900 leading-tight">Spend Analysis</h2>
        <p className="text-xs text-slate-500 font-medium">Visual breakdown of potential savings</p>
      </div>

      {/* Chart Wrapper - Height must be fixed here */}
      <div className="h-[150px] w-full my-auto  ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }}
            />
            <YAxis axisLine={false} tickLine={false} tick={false} />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-xl border border-slate-700">
                      {NumericValueFormate ? NumericValueFormate(payload[0].value) : payload[0].value}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="value" 
              barSize={45} 
              radius={[12, 12, 12, 12]} 
              animationDuration={1500}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.9} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Savings Summary Badge */}
      <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-green-600">Total Savings</p>
          <p className="text-lg font-black text-green-700">
            {NumericValueFormate ? NumericValueFormate(current_spend - optimized_spend) : (current_spend - optimized_spend)}
          </p>
        </div>
        <div className="h-10 w-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg shadow-green-200">
          -{savingsPercent}%
        </div>
      </div>
    </div>
  );
};