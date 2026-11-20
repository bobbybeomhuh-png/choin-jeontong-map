/* 무이 나라 조달청: 녹음 효과음 틀기(11/20 「소리가 조잡하다」 → 합성음 대신 실제 녹음). 만든 날 2026-11-20
   자료는 sfx_data.js(CC0 녹음 mp3, base64). AudioContext 마다 한 번 풀어 둔다(비동기).
   sfx(ac,out,이름,{vol,rate,vary,at}) → 틀었으면 true, 아직 못 풀었거나 없으면 false(부르는 쪽이 옛 합성음으로 대신).
   ambLoop(ac,out,이름,vol) 새·바람 같은 긴 바탕 소리를 2초씩 겹쳐 끊김 없이 돌림 → 멈춤 함수.
   surf(ac,out,vol) 파도 녹음 넷을 2~6초 간격으로 무작위로 → 멈춤 함수. */
import {SFXD} from './sfx_data.js';
const C=new WeakMap();
function bufs(ac){let m=C.get(ac);if(m)return m;m={};C.set(ac,m);
 for(const k in SFXD){m[k]=[];SFXD[k].forEach((b,i)=>{try{const bin=atob(b),u=new Uint8Array(bin.length);for(let j=0;j<bin.length;j++)u[j]=bin.charCodeAt(j);
  const p=ac.decodeAudioData(u.buffer,B=>{m[k][i]=B},()=>{});if(p&&p.then)p.then(B=>{m[k][i]=B}).catch(()=>{})}catch(e){}})}return m}
const pick=(ac,k)=>{const L=(bufs(ac)[k]||[]).filter(Boolean);return L.length?L[Math.random()*L.length|0]:null};
export function sfx(ac,out,k,o={}){try{if(!ac||!out)return false;const B=pick(ac,k);if(!B)return false;
 const s=ac.createBufferSource(),g=ac.createGain();s.buffer=B;const v=o.vary==null?.06:o.vary;s.playbackRate.value=(o.rate||1)*(1+v*(Math.random()*2-1));
 g.gain.value=o.vol==null?.6:o.vol;s.connect(g).connect(out);s.start(ac.currentTime+(o.at||0));return true}catch(e){return false}}
export function ambLoop(ac,out,k,vol=.3){let alive=true,tm=0;const g=ac.createGain();g.gain.value=vol;g.connect(out);
 const go=()=>{if(!alive)return;const B=pick(ac,k);if(!B){tm=setTimeout(go,600);return}const s=ac.createBufferSource(),f=ac.createGain(),t=ac.currentTime,d=B.duration,off=Math.random()*Math.max(0,d-12);const len=Math.min(d-off,14);
  s.buffer=B;f.gain.setValueAtTime(0,t);f.gain.linearRampToValueAtTime(1,t+2);f.gain.setValueAtTime(1,t+len-2);f.gain.linearRampToValueAtTime(0,t+len);s.connect(f).connect(g);s.start(t,off,len);tm=setTimeout(go,(len-2)*1000)};
 go();return{stop(){alive=false;clearTimeout(tm);try{g.disconnect()}catch(e){}},gain:g}}
export function surf(ac,out,vol=.35){let alive=true,tm=0;const g=ac.createGain();g.gain.value=vol;g.connect(out);
 const go=()=>{if(!alive)return;sfx(ac,g,'wave',{vol:.6+Math.random()*.4,vary:.08});tm=setTimeout(go,2200+Math.random()*3800)};tm=setTimeout(go,300);
 return{stop(){alive=false;clearTimeout(tm);try{g.disconnect()}catch(e){}},gain:g}}
export function primeSfx(ac){try{if(ac)bufs(ac)}catch(e){}}
window.__SFX={sfx,ambLoop,surf,prime:primeSfx};
