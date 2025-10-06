import React from 'react';
import { createRoot } from 'react-dom/client';
import Overlay from './Overlay';
import { getSettings } from '../shared/storage';
import { ExtensionSettings } from '../shared/types';
import '../../src/index.css';
import './overlay.css';

let overlayRoot: HTMLDivElement | null = null;
let shadowRoot: ShadowRoot | null = null;
let reactRoot: any = null;

function createOverlayContainer() {
  if (overlayRoot) return;

  overlayRoot = document.createElement('div');
  overlayRoot.id = 'trading-metrics-overlay-root';
  overlayRoot.style.cssText = 'all: initial; position: fixed; z-index: 2147483647;';
  
  shadowRoot = overlayRoot.attachShadow({ mode: 'open' });
  
  // Inject styles into shadow DOM
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href = chrome.runtime.getURL('overlay.css');
  shadowRoot.appendChild(styleLink);

  const reactContainer = document.createElement('div');
  reactContainer.id = 'overlay-container';
  shadowRoot.appendChild(reactContainer);

  document.body.appendChild(overlayRoot);

  reactRoot = createRoot(reactContainer);
}

function renderOverlay(settings: ExtensionSettings) {
  if (!settings.enabled || settings.components.length === 0) {
    if (overlayRoot) {
      overlayRoot.style.display = 'none';
    }
    return;
  }

  createOverlayContainer();
  
  if (overlayRoot) {
    overlayRoot.style.display = 'block';
  }

  if (reactRoot) {
    reactRoot.render(<Overlay settings={settings} />);
  }
}

// Initialize on load
getSettings().then(renderOverlay);

// Listen for settings updates
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'SETTINGS_UPDATED') {
    renderOverlay(message.settings);
  }
});

// Keyboard shortcut: Alt+T
document.addEventListener('keydown', (e) => {
  if (e.altKey && e.key === 't') {
    e.preventDefault();
    getSettings().then(settings => {
      settings.enabled = !settings.enabled;
      renderOverlay(settings);
    });
  }
});
