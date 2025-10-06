export type ComponentType = 
  | 'tradingview'
  | 'holders'
  | 'views'
  | 'likes'
  | 'buys-sells'
  | 'wallet-age'
  | 'bar-graph'
  | 'scatter';

export interface ExtensionSettings {
  enabled: boolean;
  components: ComponentType[];
  layout: 'vertical' | 'grid' | 'floating';
  size: 'small' | 'medium' | 'large';
  theme: 'dark' | 'light';
  transparency: number;
  position?: { x: number; y: number };
  dimensions?: { width: number; height: number };
}

export interface OverlayPosition {
  x: number;
  y: number;
}

export interface ComponentData {
  type: ComponentType;
  data?: any;
}
