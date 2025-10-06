import React from 'react';
import { Target } from 'lucide-react';

interface CompactScatterProps {
  size: 'small' | 'medium' | 'large';
}

const CompactScatter: React.FC<CompactScatterProps> = ({ size }) => {
  return (
    <div className="bg-card rounded-lg p-3 border border-border">
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-4 h-4 text-cyan-500" />
        <span className="text-xs font-semibold">Follower Concentration</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-center">
        <div>
          <div className="text-sm font-bold text-green-500">124</div>
          <div className="text-xs text-muted-foreground">Mini</div>
        </div>
        
        <div>
          <div className="text-sm font-bold text-blue-500">87</div>
          <div className="text-xs text-muted-foreground">Micro</div>
        </div>
        
        <div>
          <div className="text-sm font-bold text-purple-500">45</div>
          <div className="text-xs text-muted-foreground">Macro</div>
        </div>
        
        <div>
          <div className="text-sm font-bold text-orange-500">12</div>
          <div className="text-xs text-muted-foreground">Large</div>
        </div>
      </div>
    </div>
  );
};

export default CompactScatter;
