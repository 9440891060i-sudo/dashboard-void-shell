import { ExtensionSettings } from './types';

const DEFAULT_SETTINGS: ExtensionSettings = {
  enabled: true,
  components: [],
  layout: 'vertical',
  size: 'medium',
  theme: 'dark',
  transparency: 0.95,
};

export async function getSettings(): Promise<ExtensionSettings> {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    const result = await chrome.storage.sync.get('settings');
    return result.settings || DEFAULT_SETTINGS;
  }
  return DEFAULT_SETTINGS;
}

export async function saveSettings(settings: ExtensionSettings): Promise<void> {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    await chrome.storage.sync.set({ settings });
    // Notify content script of changes
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'SETTINGS_UPDATED', settings });
      }
    });
  }
}
