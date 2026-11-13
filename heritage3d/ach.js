/* 무이 월드 업적과 칭호: 이미 남아 있는 기록으로 계산한다(새로 모으는 정보 없음).
   업적은 엽전을 주지 않는다(엽전 계산이 돌고 돌지 않게). 가장 어려운 업적의 칭호를 이름 앞에 붙인다. 갱신 2026-11-14 */
import {coinState} from './coin.js';
import {chapterState} from './story.js';
const J=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
function facts(){const C=coinState(),CS=chapterState(),ev=J('muui-ev-stamps',[]);return{C,ch:CS.filter(c=>c.done).length,games:J('muui-h3-games',[]).length,deco:J('muui-deco',[]).length,days:Object.keys(J('muui-daily',{})).length,weeks:(J('muui-week-log',[])||[]).length,fest:ev.filter(e=>e&&String(e.k||'').startsWith('fest_')).length,rally:ev.filter(e=>e&&String(e.k||'').startsWith('rally_')).length,shard:J('muui-h3-shardall',[]).length,cards:J('muui-postcards',[]).length,dig:(J('muui3d-stamps',[])||[]).length}}
/* t=칭호(어려운 순서로 뒤에 둘수록 높음) */
export const ACH=[
 {k:'q1',n:'첫 복원',d:'유산 마당 한 곳 복원',f:F=>F.C.quests>=1,t:'새내기 복원단'},
 {k:'g1',n:'첫 놀이',d:'유산 마당 놀이 한 번',f:F=>F.games>=1,t:''},
 {k:'d1',n:'첫 장식',d:'마당 꾸미기 하나',f:F=>F.deco>=1,t:''},
 {k:'c1',n:'일지 첫 장',d:'1장 「천년 신라의 별」 완성',f:F=>F.ch>=1,t:'신라의 별지기'},
 {k:'s10',n:'별 열 개',d:'놀이 별 10개',f:F=>F.C.stars>=10,t:''},
 {k:'day3',n:'사흘째 손님',d:'오늘의 놀이 3일',f:F=>F.days>=3,t:''},
 {k:'w1',n:'이번 주도 성실히',d:'주간 의뢰 하나 끝내기',f:F=>F.weeks>=1,t:''},
 {k:'card3',n:'엽서 작가',d:'기념 엽서 3장',f:F=>F.cards>=3,t:''},
 {k:'dig3',n:'발굴 맛보기',d:'발굴 터 도장 3개',f:F=>F.dig>=3,t:''},
 {k:'shard1',n:'기와 줍는 손',d:'한 곳에서 기와 조각 다 모으기',f:F=>F.shard>=1,t:''},
 {k:'r2',n:'길 따라',d:'테마 랠리 2개',f:F=>F.rally>=2,t:''},
 {k:'fest',n:'명절 손님',d:'명절 행사 날에 오기',f:F=>F.fest>=1,t:'명절 손님'},
 {k:'c3',n:'일지 절반',d:'복원단 일지 3장',f:F=>F.ch>=3,t:'숙련 복원가'},
 {k:'s30',n:'별 서른 개',d:'놀이 별 30개',f:F=>F.C.stars>=30,t:'솜씨 좋은 장인'},
 {k:'gall',n:'놀이 박사',d:'유산 마당 놀이 16가지 모두',f:F=>F.games>=16,t:'놀이 박사'},
 {k:'d10',n:'마당 가꾸미',d:'마당 장식 10개',f:F=>F.deco>=10,t:'마당 가꾸미'},
 {k:'day7',n:'한 주 내내',d:'오늘의 놀이 7일',f:F=>F.days>=7,t:''},
 {k:'r4',n:'네 길을 다',d:'테마 랠리 4개 모두',f:F=>F.rally>=4,t:'길 위의 복원가'},
 {k:'c6',n:'일지 완성',d:'복원단 일지 6장 모두',f:F=>F.ch>=6,t:'수석 복원가'},
 {k:'s48',n:'별을 다',d:'놀이 별 48개 모두',f:F=>F.C.stars>=48,t:'별을 다 모은 명장'}];
export function achState(){const F=facts();return ACH.map(a=>({...a,on:(()=>{try{return !!a.f(F)}catch(e){return false}})()}))}
export function myTitle(){const A=achState().filter(a=>a.on&&a.t);return A.length?A[A.length-1].t:''}
/* 처음 이룬 업적만 돌려주고 본 것으로 적어 둔다 */
export function achNew(){const seen=new Set(J('muui-ach-seen',[]));const now=achState().filter(a=>a.on&&!seen.has(a.k));if(now.length){for(const a of now)seen.add(a.k);try{localStorage.setItem('muui-ach-seen',JSON.stringify([...seen]))}catch(e){}}return now}
/* 업적 알림: 화면 위 가운데에 잠깐 */
export function achToast(list){(list||[]).forEach((a,i)=>setTimeout(()=>{try{const d=document.createElement('div');d.style.cssText='position:fixed;left:50%;top:calc(env(safe-area-inset-top) + 110px);transform:translateX(-50%);z-index:61;pointer-events:none;background:#2b1d12;color:#fff4dc;border:3px double #d8a838;border-radius:12px;padding:10px 18px;text-align:center;font:15px "Gowun Dodum",sans-serif;box-shadow:0 10px 28px rgba(0,0,0,.4);max-width:86vw';d.innerHTML=`<div style="font:13px 'Do Hyeon',sans-serif;color:#d8a838;letter-spacing:.15em">업적 달성</div><b style="font:20px 'Do Hyeon',sans-serif">${a.n}</b><div style="font-size:13px;opacity:.85">${a.d}${a.t?` · 칭호 「${a.t}」`:''}</div>`;document.body.append(d);try{dispatchEvent(new CustomEvent('muui-coin',{detail:0}))}catch(e){}d.animate([{opacity:0,transform:'translate(-50%,-12px)'},{opacity:1,transform:'translate(-50%,0)',offset:.12},{opacity:1,transform:'translate(-50%,0)',offset:.85},{opacity:0,transform:'translate(-50%,-8px)'}],{duration:3600}).onfinish=()=>d.remove()}catch(e){}},i*3800))}

