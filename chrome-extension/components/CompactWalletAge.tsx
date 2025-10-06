import React from 'react';
import { Wallet } from 'lucide-react';

interface CompactWalletAgeProps {
  size: 'small' | 'medium' | 'large';
}

const CompactWalletAge: React.FC<CompactWalletAgeProps> = ({ size }) => {
  return (
    <div className="bg-card rounded-lg p-3 border border-border">
      <div className="flex items-center gap-2 mb-3">
        <Wallet className="w-4 h-4 text-orange-500" />
        <span className="text-xs font-semibold">Wallet Age</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-sm font-bold text-blue-500">342</div>
          <div className="text-xs text-muted-foreground">New</div>
        </div>
        
        <div>
          <div className="text-sm font-bold text-green-500">1,245</div>
          <div className="text-xs text-muted-foreground">Average</div>
        </div>
        
        <div>
          <div className="text-sm font-bold text-purple-500">823</div>
          <div className="text-xs text-muted-foreground">Old</div>
        </div>
      </div>
    </div>
  );
};

export default CompactWalletAge;
