# Focus View Extension

YouTubeの広告を自動的にスキップするChrome拡張機能です。

> ⚠️ **注意**: このREADMEは自分用のメモです。拡張機能名は意図的に抽象化にしています。

## 機能

- **動画広告の瞬間スキップ**: 広告を検知すると動画を瞬時に末尾までシークして終了させます
- **スキップボタンの自動クリック**: 「広告をスキップ」ボタンが表示されたら自動でクリック
- **オーバーレイ広告の自動閉じ**: バナー型の広告を自動的に閉じます
- **ミュート制御**: 広告中は自動でミュートし、終了後に解除
- **ミッドロール広告対応**: 動画途中に挿入される広告にも対応

## インストール方法

### 1. ダウンロード

#### 方法A: ZIPダウンロード（Gitなしで可能）

[![Download ZIP](https://img.shields.io/badge/Download-ZIP-blue?style=for-the-badge&logo=github)](https://github.com/fuyuyu0111/Focus-View-Extension/archive/refs/heads/main.zip)

↑ボタンをクリックでダウンロード後、解凍して使用してください。

#### 方法B: git clone

```bash
git clone https://github.com/fuyuyu0111/Focus-View-Extension.git
```

### 2. Chrome拡張機能として読み込み

1. Chromeで `chrome://extensions/` を開く
2. 右上の「デベロッパーモード」をオンにする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. 解凍orクローンしたフォルダを選択

### 3. 確認

- YouTubeを開いて、拡張機能が動作していることを確認
- 開発者ツール（F12）のコンソールで `[Focus View]` のログを確認可能

## ファイル構成

```
.
├── manifest.json    # 拡張機能の設定ファイル（Manifest V3）
├── content.js       # メインのスクリプト
└── README.md        # このファイル
```

## 技術仕様

- **Manifest Version**: 3
- **対応ブラウザ**: Chrome, Edge（Chromium系）
- **権限**: 特別な権限は不要

## 動作原理

1. `MutationObserver` で `#movie_player` の class属性を監視
2. `ad-showing` または `ad-interrupting` クラスを検知
3. 動画を `video.duration` にシークして広告を終了
4. スキップボタンがあればクリック
5. SPAナビゲーション（YouTubeのページ遷移）にも対応

## ライセンス

MIT License
