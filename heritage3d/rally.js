/* 테마 랠리: 묶음 놀이를 다 하면 특별 도장(진열장 현장 특별 도장 줄에 모임). 갱신 2026-11-13
   기간(from~to, 한국 날짜)을 두면 그 기간에만 보이고 셈. 기간이 없으면 늘 열림. */
export const RALLIES=[
 {k:'rally_fire',n:'불의 길 랠리',d:'이천 물레, 문경 가마, 강진 상감',g:['wheel','kiln','inlay']},
 {k:'rally_sound',n:'소리의 길 랠리',d:'범종, 거북선 북, 오죽 붓',g:['bell','row','bamboo']},
 {k:'rally_stone',n:'돌과 쇠의 길 랠리',d:'거중기, 기와, 현자총통',g:['crane','tile','cannon']},
 {k:'rally_hand',n:'손끝의 길 랠리',d:'탁본, 모란, 자개',g:['rubbing','peony','najeon']},
];
const today=()=>{const d=new Date(Date.now()+9*3600e3);return d.toISOString().slice(0,10)};
export function rallyOpen(r){const t=today();return(!r.from||t>=r.from)&&(!r.to||t<=r.to)}
export function rallyState(){let g=new Set(),ev=[];try{g=new Set(JSON.parse(localStorage.getItem('muui-h3-games')||'[]'));ev=JSON.parse(localStorage.getItem('muui-ev-stamps')||'[]')}catch(e){}
 return RALLIES.filter(rallyOpen).map(r=>({...r,have:r.g.filter(x=>g.has(x)).length,done:ev.some(e=>e.k===r.k)}))}
/* 다 모았는데 도장이 없으면 도장을 주고 그 랠리 목록을 돌려준다 */
export function rallyAward(site){const out=[];try{const ev=JSON.parse(localStorage.getItem('muui-ev-stamps')||'[]');for(const r of rallyState()){if(!r.done&&r.have>=r.g.length){const n=new Date();ev.push({k:r.k,n:r.n,d:r.d,t:`${n.getFullYear()}.${n.getMonth()+1}.${n.getDate()}`,site:site||''});out.push(r)}}if(out.length)localStorage.setItem('muui-ev-stamps',JSON.stringify(ev))}catch(e){}return out}
