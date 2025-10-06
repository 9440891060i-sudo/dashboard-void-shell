import React from 'react';
import { TrendingUp } from 'lucide-react';

interface CompactTradingViewProps {
  size: 'small' | 'medium' | 'large';
}

const CompactTradingView: React.FC<CompactTradingViewProps> = ({ size }) => {
  const heights = { small: '120px', medium: '180px', large: '240px' };
  
  return (
    <div className="bg-card rounded-lg p-3 border border-border">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold">Price Chart</span>
      </div>
      <div 
        className="bg-muted/30 rounded flex items-center justify-center"
        style={{ height: heights[size] }}
      >
        <span className="text-xs text-muted-foreground">Chart Preview</span>
      </div>
      <div className="mt-2 flex justify-between text-xs">
        <span className="text-muted-foreground">Price</span>
        <span className="text-green-500 font-semibold">+5.2%</span>
      </div>
    </div>
  );
};

export default CompactTradingView;
