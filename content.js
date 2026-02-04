/**
 * YouTube Ad Speedup - 広告を瞬間シークでスキップ
 */

(function () {
  'use strict';

  // 広告スキップ処理中かどうかのフラグ
  let isProcessingAd = false;
  // 元のミュート状態を保存
  let originalMuted = false;

  /**
   * 広告をスキップする処理
   */
  function skipAd() {
    const player = document.querySelector('#movie_player');
    if (!player) return;

    const isAdShowing = player.classList.contains('ad-showing') ||
      player.classList.contains('ad-interrupting');

    if (isAdShowing) {
      if (!isProcessingAd) {
        isProcessingAd = true;
        console.log('[YouTube Ad Speedup] 広告を検知しました');
      }

      const video = document.querySelector('video');
      if (video) {
        // 元のミュート状態を保存してミュート
        if (!video.muted) {
          originalMuted = false;
          video.muted = true;
        }

        // 動画の末尾にシーク（広告を強制終了）
        if (video.duration && isFinite(video.duration)) {
          video.currentTime = video.duration;
        }
      }

      // スキップボタンがあればクリック
      const skipButtons = [
        '.ytp-ad-skip-button',
        '.ytp-ad-skip-button-modern',
        '.ytp-skip-ad-button',
        '[class*="skip"] button',
        'button[class*="skip"]'
      ];

      for (const selector of skipButtons) {
        const skipButton = document.querySelector(selector);
        if (skipButton) {
          skipButton.click();
          console.log('[YouTube Ad Speedup] スキップボタンをクリックしました');
          break;
        }
      }

    } else {
      // 広告が終了した場合
      if (isProcessingAd) {
        isProcessingAd = false;
        console.log('[YouTube Ad Speedup] 広告が終了しました');

        // ミュートを解除（元々ミュートでなかった場合のみ）
        const video = document.querySelector('video');
        if (video && !originalMuted) {
          video.muted = false;
        }
      }
    }
  }

  /**
   * オーバーレイ広告（バナー型広告）を閉じる処理
   */
  function closeOverlayAd() {
    // オーバーレイ広告の閉じるボタンのセレクタ
    const closeButtonSelectors = [
      '.ytp-ad-overlay-close-button',
      '.ytp-ad-overlay-close-container',
      '.ytp-ad-overlay-close-button button',
      '[class*="overlay-close"]'
    ];

    for (const selector of closeButtonSelectors) {
      const closeButton = document.querySelector(selector);
      if (closeButton) {
        closeButton.click();
        console.log('[YouTube Ad Speedup] オーバーレイ広告を閉じました');
        return true;
      }
    }

    return false;
  }

  /**
   * MutationObserverを設定
   */
  function setupObserver() {
    const observer = new MutationObserver((mutations) => {
      // class属性の変更を検知
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          skipAd();
        }
      }
    });

    // #movie_playerを監視対象として設定
    const startObserving = () => {
      const player = document.querySelector('#movie_player');
      if (player) {
        observer.observe(player, {
          attributes: true,
          attributeFilter: ['class']
        });
        console.log('[YouTube Ad Speedup] 監視を開始しました');
        // 初回チェック
        skipAd();
        closeOverlayAd();
      } else {
        // プレーヤーがまだ存在しない場合は少し待ってリトライ
        setTimeout(startObserving, 1000);
      }
    };

    startObserving();

    // ページ遷移時（SPAナビゲーション）にも対応
    const bodyObserver = new MutationObserver((mutations) => {
      const player = document.querySelector('#movie_player');
      if (player && !player._adSkipObserving) {
        player._adSkipObserving = true;
        observer.observe(player, {
          attributes: true,
          attributeFilter: ['class']
        });
        skipAd();
      }

      // オーバーレイ広告が追加されたかチェック
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // 新しいノードが追加された場合、オーバーレイ広告をチェック
          const overlayContainer = document.querySelector('.ytp-ad-overlay-container');
          if (overlayContainer && overlayContainer.children.length > 0) {
            closeOverlayAd();
          }
        }
      }
    });

    bodyObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    // 定期的にオーバーレイ広告をチェック（フォールバック）
    setInterval(() => {
      const overlayContainer = document.querySelector('.ytp-ad-overlay-container');
      if (overlayContainer && overlayContainer.children.length > 0) {
        closeOverlayAd();
      }
    }, 2000);
  }

  // 初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupObserver);
  } else {
    setupObserver();
  }

})();
