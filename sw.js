// 서비스워커 폐기 — 자기 자신 해제 + 모든 캐시 삭제 + 클라이언트 새로고침.
// (캐시-우선 방식이 배포 후 옛 파일을 물려줘 지도를 깨뜨리던 문제 근본제거)
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){
  e.waitUntil((async function(){
    try{
      var keys = await caches.keys();
      await Promise.all(keys.map(function(k){ return caches.delete(k); }));
      await self.registration.unregister();
      var cs = await self.clients.matchAll();
      cs.forEach(function(c){ try{ c.navigate(c.url); }catch(_){} });
    }catch(_){}
  })());
});
// fetch 가로채지 않음 — 항상 네트워크 그대로.
