import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface CompactBuysVsSellsProps {
  size: 'small' | 'medium' | 'large';
}

const CompactBuysVsSells: React.FC<CompactBuysVsSellsProps> = ({ size }) => {
  const buys = 245;
  const sells = 182;
  const net = buys - sells;

  return (
    <div className="bg-card rounded-lg p-3 border border-border">
      <div className="text-xs font-semibold mb-3">Buys vs Sells</div>
      
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <ArrowUpCircle className="w-4 h-4 text-green-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-green-500">{buys}</div>
          <div className="text-xs text-muted-foreground">Buys</div>
        </div>
        
        <div>
          <div className="text-lg font-bold text-primary">{net}</div>
          <div className="text-xs text-muted-foreground">Net</div>
        </div>
        
        <div>
          <ArrowDownCircle className="w-4 h-4 text-red-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-red-500">{sells}</div>
          <div className="text-xs text-muted-foreground">Sells</div>
        </div>
      </div>
    </div>
  );
};

export default CompactBuysVsSells;
