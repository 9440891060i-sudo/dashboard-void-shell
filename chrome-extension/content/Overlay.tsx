import React, { useState, useRef, useEffect } from 'react';
import { ExtensionSettings, ComponentType } from '../shared/types';
import { X, GripVertical, Minimize2, Maximize2 } from 'lucide-react';
import CompactTradingView from '../components/CompactTradingView';
import CompactHoldersGraph from '../components/CompactHoldersGraph';
import CompactMetricCard from '../components/CompactMetricCard';
import CompactBuysVsSells from '../components/CompactBuysVsSells';
import CompactWalletAge from '../components/CompactWalletAge';
import CompactBarGraph from '../components/CompactBarGraph';
import CompactScatter from '../components/CompactScatter';

interface OverlayProps {
  settings: ExtensionSettings;
}

const Overlay: React.FC<OverlayProps> = ({ settings }) => {
  const [position, setPosition] = useState(settings.position || { x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX - position.x,
      startY: e.clientY - position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragRef.current) {
        setPosition({
          x: e.clientX - dragRef.current.startX,
          y: e.clientY - dragRef.current.startY,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const renderComponent = (type: ComponentType) => {
    const size = settings.size;
    
    switch (type) {
      case 'tradingview':
        return <CompactTradingView key={type} size={size} />;
      case 'holders':
        return <CompactHoldersGraph key={type} size={size} />;
      case 'views':
        return <CompactMetricCard key={type} type="views" size={size} />;
      case 'likes':
        return <CompactMetricCard key={type} type="likes" size={size} />;
      case 'buys-sells':
        return <CompactBuysVsSells key={type} size={size} />;
      case 'wallet-age':
        return <CompactWalletAge key={type} size={size} />;
      case 'bar-graph':
        return <CompactBarGraph key={type} size={size} />;
      case 'scatter':
        return <CompactScatter key={type} size={size} />;
      default:
        return null;
    }
  };

  const getLayoutClass = () => {
    switch (settings.layout) {
      case 'grid':
        return 'grid grid-cols-2 gap-2';
      case 'floating':
        return 'flex flex-wrap gap-2';
      default:
        return 'flex flex-col gap-2';
    }
  };

  if (!settings.enabled) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: settings.transparency,
        zIndex: 2147483647,
      }}
      className="font-sans"
    >
      <div className="bg-background/95 backdrop-blur-lg rounded-lg shadow-2xl border border-border overflow-hidden">
        {/* Header */}
        <div
          onMouseDown={handleMouseDown}
          className="flex items-center justify-between p-2 bg-muted/50 cursor-move select-none border-b border-border"
        >
          <div className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-semibold">Trading Metrics</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-muted rounded"
            >
              {isMinimized ? (
                <Maximize2 className="w-3 h-3" />
              ) : (
                <Minimize2 className="w-3 h-3" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        {!isMinimized && (
          <div className={`p-3 max-h-[80vh] overflow-y-auto ${getLayoutClass()}`}>
            {settings.components.map(renderComponent)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Overlay;
