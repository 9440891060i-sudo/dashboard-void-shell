# Trading Metrics Overlay - Chrome Extension

A customizable overlay that displays selected trading metrics on any webpage.

## Features

- 🎯 **Customizable Components**: Choose which metrics to display
- 📊 **8 Component Types**: TradingView, Holders, Views, Likes, Buys/Sells, Wallet Age, Bar Graph, Scatter Plot
- 🎨 **Layout Options**: Vertical stack, grid, or floating cards
- 📏 **Size Options**: Small, medium, or large
- 🎭 **Transparency Control**: Adjust overlay opacity
- 🔄 **Draggable**: Position the overlay anywhere on screen
- ⌨️ **Keyboard Shortcut**: Press Alt+T to toggle overlay
- 💾 **Persistent Settings**: Your preferences are saved

## Installation

### Development Mode

1. Build the extension:
```bash
npm run build:extension
# or
bun run build:extension
```

2. Load in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist-extension` folder

### Build Command

Add this to your `package.json` scripts:
```json
{
  "scripts": {
    "build:extension": "vite build --config vite.config.extension.ts && cp chrome-extension/manifest.json dist-extension/"
  }
}
```

## Usage

1. Click the extension icon in Chrome toolbar
2. Select which components you want to display
3. Choose layout, size, and transparency preferences
4. The overlay will appear on the current page
5. Drag the overlay to reposition it
6. Press Alt+T to quickly toggle the overlay on/off

## Component Types

- **TradingView Chart**: Price chart preview
- **Holders Graph**: Holder count timeline
- **Views Metric**: View count with trend
- **Likes Metric**: Like count with trend
- **Buys vs Sells**: Transaction comparison
- **Wallet Age Map**: New/Average/Old wallet distribution
- **Bar Graph**: Members vs Unique Authors
- **Scatter Plot**: Follower concentration by tier

## Settings

### Layout Options
- **Vertical Stack**: Components stacked vertically
- **Grid**: 2-column grid layout
- **Floating**: Free-flowing card layout

### Size Options
- **Small**: Compact view for minimal screen space
- **Medium**: Balanced size (default)
- **Large**: Maximum detail and readability

### Transparency
- Adjust from 50% to 100% opacity
- Useful for monitoring while working

## Keyboard Shortcuts

- `Alt + T`: Toggle overlay visibility

## Technical Details

- Built with React + TypeScript
- Uses Vite for bundling
- Manifest V3 compliant
- Shadow DOM for style isolation
- Chrome Storage API for settings persistence

## Future Enhancements

- [ ] Real-time data fetching from API
- [ ] Custom themes
- [ ] Per-domain settings
- [ ] Export/import configurations
- [ ] Click-through mode
- [ ] Auto-hide on scroll
- [ ] Resize overlay container
