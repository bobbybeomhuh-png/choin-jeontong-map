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
/* 오늘의 놀이: 날짜로 하나를 고른다(모두 같은 날 같은 놀이). 하면 그날 칸에 도장 */
export const DAILY=[['stars','첨성대 별자리 잇기','gyeongju'],['crane','거중기로 성돌 올리기','suwon'],['rubbing','경판 탁본 뜨기','hapcheon'],['wheel','물레로 달항아리 빚기','icheon'],['kiln','망댕이가마 불 때기','mungyeong'],['inlay','상감 학 무늬 새기기','gangjin'],['brush','금동관 흙 털기','naju'],['bamboo','오죽 대나무 치기','gangneung'],['row','거북선 노 젓기','geobukseon'],['bell','범종 치기','yeongju'],['cannon','현자총통 쏘기','jinju'],['peony','민화 모란 그리기','minhwa'],['najeon','자개 붙이기','tongyeong'],['sundial','앙부일구 읽기','hanyang'],['tile','숭례문 기와 쌓기','sungnyemun'],['incense','금동대향로 맞추기','buyeo']];
export function dailyToday(){const t=today();let h=0;for(const c of t)h=(h*31+c.charCodeAt(0))>>>0;const g=DAILY[h%DAILY.length];return{date:t,k:g[0],n:g[1],site:g[2]}}
export function dailyState(){let D={};try{D=JSON.parse(localStorage.getItem('muui-daily')||'{}')}catch(e){}const T=dailyToday();return{...T,done:D[T.date]===T.k,days:Object.keys(D).length}}
export function dailyMark(key){const T=dailyToday();if(key!==T.k)return false;try{const D=JSON.parse(localStorage.getItem('muui-daily')||'{}');if(D[T.date]===T.k)return false;D[T.date]=T.k;localStorage.setItem('muui-daily',JSON.stringify(D));return Object.keys(D).length}catch(e){return false}}
