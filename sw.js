// v11: HTML·JS·CSS는 '네트워크 먼저'(항상 최신, 실패 시 캐시). 이미지 등 정적만 캐시 먼저.
// ★v10까지의 '캐시 먼저'가 배포해도 옛 페이지를 붙잡던 문제 근본 수정.
const CACHE = 'story-map-v11';

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.add('./index.html').catch(() => {})));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const fresh = e.request.mode === 'navigate'
    || /\.(html|js|css|webmanifest)$/.test(url.pathname)
    || url.pathname === '/';

  if (fresh) {
    // 네트워크 먼저 — 항상 최신본. 오프라인이면 캐시 폴백.
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(e.request))
    );
  } else {
    // 이미지·썸네일·폰트 등 정적 — 캐시 먼저(빠름).
    e.respondWith(
      caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      }))
    );
  }
});
