import React from 'react';
import { Eye, Heart, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface CompactMetricCardProps {
  type: 'views' | 'likes';
  size: 'small' | 'medium' | 'large';
}

const CompactMetricCard: React.FC<CompactMetricCardProps> = ({ type, size }) => {
  const data = Array.from({ length: 15 }, (_, i) => ({
    value: 1000 + Math.random() * 500
  }));

  const isViews = type === 'views';
  const value = isViews ? '12.4K' : '8.2K';
  const change = isViews ? 5.2 : -2.1;
  const isPositive = change > 0;

  const heights = { small: '60px', medium: '80px', large: '100px' };

  return (
    <div className="bg-card rounded-lg p-3 border border-border">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          {isViews ? (
            <Eye className="w-4 h-4 text-purple-500" />
          ) : (
            <Heart className="w-4 h-4 text-pink-500" />
          )}
          <span className="text-xs font-semibold">{isViews ? 'Views' : 'Likes'}</span>
        </div>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span className="text-xs">{isPositive ? '+' : ''}{change}%</span>
        </div>
      </div>
      
      <div className="text-lg font-bold mb-1">{value}</div>
      
      <div style={{ height: heights[size] }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={isViews ? 'rgb(168, 85, 247)' : 'rgb(236, 72, 153)'} 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompactMetricCard;
