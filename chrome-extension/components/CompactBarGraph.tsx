import React from 'react';
import { Users, MessageSquare } from 'lucide-react';

interface CompactBarGraphProps {
  size: 'small' | 'medium' | 'large';
}

const CompactBarGraph: React.FC<CompactBarGraphProps> = ({ size }) => {
  return (
    <div className="bg-card rounded-lg p-3 border border-border">
      <div className="text-xs font-semibold mb-3">Members vs Authors</div>
      
      <div className="space-y-2">
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 text-blue-500" />
              <span className="text-xs">Members</span>
            </div>
            <span className="text-sm font-bold">2,456</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3 text-purple-500" />
              <span className="text-xs">Authors</span>
            </div>
            <span className="text-sm font-bold">823</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '35%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactBarGraph;
