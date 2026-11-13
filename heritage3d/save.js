/* 무이 월드 이어하기 코드: 이 기기의 기록(localStorage 'muui*')을 짧은 글자로 묶어 다른 기기로 옮긴다.
   서버를 쓰지 않는다. 링크로 보낼 때도 #save= 뒤(주소의 # 부분)에 실어 서버로 가지 않게 한다.
   엽서 사진처럼 큰 것과 익명 방문 번호는 옮기지 않는다. 갱신 2026-11-13 */
const SKIP=new Set(['muui-sid','muui-last-visit','muui-postcards','muui-h3-photos']);
const keep=k=>/^muui/.test(k)&&!SKIP.has(k);
const b64u=u=>{let s='';for(let i=0;i<u.length;i+=0x8000)s+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000));return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')};
const ub64=s=>{s=s.replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';const b=atob(s),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u};
async function pipe(u,T){const st=new Blob([u]).stream().pipeThrough(T);return new Uint8Array(await new Response(st).arrayBuffer())}
export function snapshot(){const d={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&keep(k))d[k]=localStorage.getItem(k)}return d}
export async function makeCode(){const json=JSON.stringify({v:1,t:Date.now(),d:snapshot()});const u=new TextEncoder().encode(json);if(typeof CompressionStream!=='undefined'){try{return 'M1.'+b64u(await pipe(u,new CompressionStream('deflate-raw')))}catch(e){}}return 'M0.'+b64u(u)}
export async function readCode(code){code=String(code||'').trim().replace(/^.*#save=/,'').replace(/\s+/g,'');const m=/^M([01])\.([A-Za-z0-9_-]+)$/.exec(code);if(!m)throw new Error('코드 모양이 맞지 않아요.');let u=ub64(m[2]);if(m[1]==='1'){if(typeof DecompressionStream==='undefined')throw new Error('이 브라우저는 압축 코드를 못 읽어요.');u=await pipe(u,new DecompressionStream('deflate-raw'))}const o=JSON.parse(new TextDecoder().decode(u));if(!o||o.v!==1||typeof o.d!=='object')throw new Error('무이 월드 기록이 아니에요.');for(const k of Object.keys(o.d))if(!keep(k)||typeof o.d[k]!=='string')throw new Error('알 수 없는 기록이 섞여 있어요.');return o}
/* 지금 기록을 지우고 코드의 기록으로 바꾼다 */
export function applySave(o){const old=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&keep(k))old.push(k)}for(const k of old)localStorage.removeItem(k);for(const[k,v]of Object.entries(o.d))localStorage.setItem(k,v)}
export function summary(d){const J=(k,f)=>{try{return d[k]?JSON.parse(d[k]):f}catch(e){return f}};const h=J('muui-h3-stamps',[]).filter(x=>x!=='worldmap').length,g=Object.keys(J('muui-h3-gameq',{})).length,deco=J('muui-deco',[]).length,ev=J('muui-ev-stamps',[]).length;return `유산 마당 복원 ${h} / 18곳, 해 본 놀이 ${g}종, 특별 도장 ${ev}개, 마당 장식 ${deco}개`}
