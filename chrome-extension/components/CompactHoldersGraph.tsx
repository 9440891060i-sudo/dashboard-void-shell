import React from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface CompactHoldersGraphProps {
  size: 'small' | 'medium' | 'large';
}

const CompactHoldersGraph: React.FC<CompactHoldersGraphProps> = ({ size }) => {
  const data = Array.from({ length: 20 }, (_, i) => ({
    value: 15000 + Math.random() * 2000
  }));

  const heights = { small: '80px', medium: '100px', large: '120px' };

  return (
    <div className="bg-card rounded-lg p-3 border border-border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-semibold">Holders</span>
        </div>
        <div className="flex items-center gap-1 text-green-500">
          <TrendingUp className="w-3 h-3" />
          <span className="text-xs">+3.2%</span>
        </div>
      </div>
      
      <div className="text-xl font-bold mb-1">16,234</div>
      
      <div style={{ height: heights[size] }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="rgb(59, 130, 246)" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompactHoldersGraph;
