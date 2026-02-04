📖 Language: [🇯🇵 日本語](./README.md) | 🇬🇧 **English**

# Focus View Extension

A Chrome extension that automatically skips YouTube ads.

> ⚠️ **Note**: This README is a personal memo. The extension name is intentionally abstract.

## Features

- **Instant Video Ad Skip**: Seeks to the end of ads instantly when detected
- **Auto Skip Button Click**: Automatically clicks the "Skip Ad" button when available
- **Overlay Ad Auto-Close**: Automatically closes banner-type ads
- **Mute Control**: Auto-mutes during ads and unmutes when finished
- **Mid-Roll Ad Support**: Works with ads inserted in the middle of videos

## Installation

### 1. Download

#### Option A: ZIP Download (No Git required)

[![Download ZIP](https://img.shields.io/badge/Download-ZIP-blue?style=for-the-badge&logo=github)](https://github.com/fuyuyu0111/Focus-View-Extension/archive/refs/heads/main.zip)

↑ Click the button to download, then extract and use.

#### Option B: git clone

```bash
git clone https://github.com/fuyuyu0111/Focus-View-Extension.git
```

### 2. Load as Chrome Extension

1. Open `chrome://extensions/` in Chrome
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select the extracted or cloned folder

### 3. Verify

- Open YouTube and confirm the extension is working
- Check `[Focus View]` logs in Developer Tools (F12) Console

## File Structure

```
.
├── manifest.json    # Extension config file (Manifest V3)
├── content.js       # Main script
├── README.md        # Japanese README
└── README_EN.md     # This file
```

## Technical Specifications

- **Manifest Version**: 3
- **Supported Browsers**: Chrome, Edge (Chromium-based)
- **Permissions**: No special permissions required

## How It Works

1. `MutationObserver` monitors the class attribute of `#movie_player`
2. Detects `ad-showing` or `ad-interrupting` classes
3. Seeks video to `video.duration` to end the ad
4. Clicks skip button if available
5. Supports SPA navigation (YouTube page transitions)

## License

MIT License
