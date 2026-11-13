/* 무이 월드 공용: 놀이 별 등급과 엽전(게임 돈).
   엽전은 저장된 기록(의뢰·별·랠리·오늘의 놀이·발굴 도장)에서 다시 계산하고, 쓴 만큼만 따로 저장한다.
   그래서 옛 기록을 가진 사람도 처음 열면 그동안 번 엽전이 바로 생긴다. */
const J=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
export const starOf=q=>q>=90?3:q>=70?2:q>0?1:0;
export const starStr=n=>'★'.repeat(n)+'☆'.repeat(Math.max(0,3-n));
export const PRICE={quest:30,star:10,rally:50,day:10,dig:5,chapter:100};
export function gameStars(){const gq=J('muui-h3-gameq',{}),played=J('muui-h3-games',[]);const out={};for(const k in gq)out[k]=starOf(gq[k]);if(played.includes('stars'))out.stars=3;return out}
export function coinState(){
 const st=gameStars();let stars=0;for(const k in st)stars+=st[k];
 const quests=J('muui-h3-stamps',[]).filter(x=>x!=='worldmap').length;
 const EV=J('muui-ev-stamps',[]),rallies=EV.filter(e=>e&&String(e.k||'').startsWith('rally_')).length,chapters=EV.filter(e=>e&&String(e.k||'').startsWith('ch_')).length;
 const days=Object.keys(J('muui-daily',{})).length;
 const digs=(J('muui3d-stamps',[])||[]).length;
 const earned=quests*PRICE.quest+stars*PRICE.star+rallies*PRICE.rally+days*PRICE.day+digs*PRICE.dig+chapters*PRICE.chapter;
 const spent=+J('muui-coin-spent',0)||0;
 return{earned,spent,coins:Math.max(0,earned-spent),stars,maxStars:48,quests,rallies,days,digs,chapters}}
export function spendCoins(n){const s=coinState();if(s.coins<n)return false;try{localStorage.setItem('muui-coin-spent',JSON.stringify(s.spent+n))}catch(e){return false}return true}
/* 엽전 얻는 순간 화면 오른쪽 위에 +숫자를 띄운다 */
export function coinPop(n,why){if(!n)return;try{const d=document.createElement('div');d.style.cssText='position:fixed;right:14px;top:calc(env(safe-area-inset-top) + 64px);z-index:60;pointer-events:none;background:#3b2a1c;color:#f2d27a;border:2px solid #d8a838;border-radius:20px;padding:6px 14px;font:18px "Do Hyeon",sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.35)';d.textContent=`엽전 +${n}`+(why?` · ${why}`:'');document.body.append(d);d.animate([{transform:'translateY(10px)',opacity:0},{transform:'translateY(0)',opacity:1,offset:.15},{transform:'translateY(0)',opacity:1,offset:.8},{transform:'translateY(-14px)',opacity:0}],{duration:2600,easing:'ease-out'}).onfinish=()=>d.remove()}catch(e){}}
