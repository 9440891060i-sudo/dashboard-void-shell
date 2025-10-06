import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ExtensionSettings, ComponentType } from '../shared/types';
import { getSettings, saveSettings } from '../shared/storage';
import '../../src/index.css';

const componentOptions: { id: ComponentType; label: string }[] = [
  { id: 'tradingview', label: 'TradingView Chart' },
  { id: 'holders', label: 'Holders Graph' },
  { id: 'views', label: 'Views Metric' },
  { id: 'likes', label: 'Likes Metric' },
  { id: 'buys-sells', label: 'Buys vs Sells' },
  { id: 'wallet-age', label: 'Wallet Age Map' },
  { id: 'bar-graph', label: 'Members vs Authors' },
  { id: 'scatter', label: 'Follower Concentration' },
];

function Popup() {
  const [settings, setSettings] = useState<ExtensionSettings>({
    enabled: true,
    components: [],
    layout: 'vertical',
    size: 'medium',
    theme: 'dark',
    transparency: 0.95,
  });

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const handleToggle = (componentId: ComponentType) => {
    const newComponents = settings.components.includes(componentId)
      ? settings.components.filter(id => id !== componentId)
      : [...settings.components, componentId];
    
    const newSettings = { ...settings, components: newComponents };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleSettingChange = (key: keyof ExtensionSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  return (
    <div className="p-4 bg-background text-foreground">
      <h2 className="text-lg font-bold mb-4">Trading Metrics Overlay</h2>
      
      {/* Enable/Disable Toggle */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm">Enable Overlay</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(e) => handleSettingChange('enabled', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>

      {/* Component Selection */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Select Components</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {componentOptions.map(({ id, label }) => (
            <label key={id} className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 p-1 rounded">
              <input
                type="checkbox"
                checked={settings.components.includes(id)}
                onChange={() => handleToggle(id)}
                className="w-4 h-4"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Layout Options */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Layout</h3>
        <select
          value={settings.layout}
          onChange={(e) => handleSettingChange('layout', e.target.value)}
          className="w-full p-2 bg-muted rounded text-sm"
        >
          <option value="vertical">Vertical Stack</option>
          <option value="grid">Grid</option>
          <option value="floating">Floating Cards</option>
        </select>
      </div>

      {/* Size Options */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Size</h3>
        <div className="flex space-x-2">
          {['small', 'medium', 'large'].map(size => (
            <button
              key={size}
              onClick={() => handleSettingChange('size', size)}
              className={`flex-1 p-2 rounded text-xs ${
                settings.size === size ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Transparency */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Transparency</h3>
        <input
          type="range"
          min="0.5"
          max="1"
          step="0.05"
          value={settings.transparency}
          onChange={(e) => handleSettingChange('transparency', parseFloat(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-muted-foreground text-center">{Math.round(settings.transparency * 100)}%</div>
      </div>

      <div className="text-xs text-muted-foreground text-center mt-4">
        Press Alt+T to toggle overlay
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Popup />);
