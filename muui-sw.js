/* 무이 월드 웹 앱(PWA) 서비스 워커. 갱신 2026-11-13
   무이 3D 경로만 다룬다. 화면(html)과 코드(js)는 언제나 네트워크 먼저(새 배포가 바로 보이게), 안 될 때만 저장본.
   큰 모델과 그림은 저장본을 먼저 보여 주고 뒤에서 새로 받아 둔다. 그 밖의 사이트 요청은 건드리지 않는다. */
const V='muui-v1',CODE=V+'-code',ASSET=V+'-asset',MAXA=400;
const PATHS=['/world3d/','/heritage3d/','/dig3d/','/dcube/','/palbok/','/dig/assets/'];
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(!k.startsWith(V))await caches.delete(k);await self.clients.claim()})())});
const trim=async()=>{const c=await caches.open(ASSET),ks=await c.keys();for(let i=0;i<ks.length-MAXA;i++)await c.delete(ks[i])};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||r.headers.has('range'))return;const u=new URL(r.url);
  const cdn=u.hostname==='cdn.jsdelivr.net'&&/three@\d/.test(u.pathname);
  if(!cdn&&(u.origin!==location.origin||!PATHS.some(p=>u.pathname.startsWith(p))))return;
  if(/\.(mp4|webm|mp3)$/i.test(u.pathname))return;
  const asset=cdn||/\.(glb|gltf|bin|jpg|jpeg|png|webp|ktx2|hdr)$/i.test(u.pathname);
  if(asset){e.respondWith((async()=>{const c=await caches.open(ASSET),hit=await c.match(r);const net=fetch(r).then(res=>{if(res.ok&&res.status===200){c.put(r,res.clone()).then(trim).catch(()=>{})}return res}).catch(()=>null);if(hit){if(!cdn)e.waitUntil(net);return hit}const res=await net;return res||Response.error()})());return}
  e.respondWith((async()=>{try{const res=await fetch(r);if(res.ok&&res.status===200){const c=await caches.open(CODE);c.put(r,res.clone()).catch(()=>{})}return res}catch(err){const hit=await caches.match(r);if(hit)return hit;throw err}})());
});
