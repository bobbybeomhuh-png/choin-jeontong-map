/* 3D 방문 기록(무이 월드·유산 마당·발굴 터). 이름·IP·위치 없음, 공개 주소에서만, ?admin 이면 끔.
   detail = 경로|기기|임의번호|값|브라우저언어|시간대 (2D 월드와 같은 형식). 갱신 2026-11-13 */
const URL0='https://moavztygngbafhxztghx.supabase.co',KEY='sb_publishable_9D-u0PH9oM0jSRoJmfGfZQ_q5t3DldZ';
const on=location.hostname==='choin-studio.pages.dev'&&!/[?&]admin\b/.test(location.search);
let sid='anon';try{sid=localStorage.getItem('muui-sid');if(!sid){sid=Date.now().toString(36)+Math.random().toString(36).slice(2,7);localStorage.setItem('muui-sid',sid)}}catch(e){sid='s'+Math.random().toString(36).slice(2,9)}
const src=(()=>{try{const q=new URLSearchParams(location.search).get('from');if(q)return q.slice(0,16).replace(/[^\w-]/g,'');const ua=navigator.userAgent;if(/Barcelona/i.test(ua))return'threads';if(/Instagram/i.test(ua))return'instagram';if(/KAKAOTALK/i.test(ua))return'kakao';if(/FBAN|FBAV/i.test(ua))return'facebook';if(!document.referrer)return'direct';const h=new URL(document.referrer).hostname;if(h===location.hostname)return'inside';for(const k of['threads','instagram','youtube','facebook','kakao','google','naver','linkedin'])if(h.includes(k))return k;return h.replace(/^www\./,'').slice(0,24)}catch(e){return'direct'}})();
const dev=(innerWidth<768||matchMedia('(pointer:coarse)').matches)?'mobile':'desktop',lg=(navigator.language||'').slice(0,5),tz=(()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone||''}catch(e){return''}})().slice(0,32);
const seen=new Set();
export function trk(type,x='',once=true){if(!on)return;const k=type+'|'+x;if(once&&seen.has(k))return;seen.add(k);try{fetch(URL0+'/rest/v1/events',{method:'POST',keepalive:true,headers:{apikey:KEY,Authorization:'Bearer '+KEY,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({type,detail:[src,dev,sid,String(x).slice(0,40),lg,tz].join('|').slice(0,120)})}).catch(()=>{})}catch(e){}}

export const SB={url:URL0,key:KEY,sid};
