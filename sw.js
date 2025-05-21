// sw.js
self.addEventListener('fetch', (event) => {
	// --- END TEMPORARY BYPASS ---
	// 最も単純なネットワークへのフォールバックを追加
	event.respondWith(fetch(event.request));
});

// install イベントリスナー
self.addEventListener('install', () => {
	// 即時アクティベートを強制 (開発時に便利)
	self.skipWaiting();
});

// activate イベントリスナー
self.addEventListener('activate', () => {
	// Service Worker がアクティブになったらすぐに制御を開始
});
