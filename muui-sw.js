/* 2026-11-13 폐기: 본 사이트 방침(서비스워커 쓰지 않음, sw.js v3)에 맞춰 스스로 해제하고 저장본을 지운다. 요청은 가로채지 않는다. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>{e.waitUntil((async()=>{try{for(const k of await caches.keys())if(k.startsWith('muui-'))await caches.delete(k);await self.registration.unregister()}catch(_){}})())});
