/* 무이 복원단 이야기 줄기: 유산 18곳을 6장으로 묶는다.
   장마다 표지(시작 글), 마무리 글, 완성 보상(특별 도장 + 엽전 100).
   완성 기록은 muui-ev-stamps 에 {k:'ch_1',...} 로 남는다. 갱신 2026-11-13 */
export const CHAPTERS=[
 {no:1,deco:'작은 첨성대',n:'천년 신라의 별',sites:['gyeongju','seokguram','yeongju'],seal:'星',col:'#8e2b20',
  intro:'첫 의뢰는 천 년 왕국 신라예요. 별을 보던 첨성대, 돌로 지은 석굴, 바위가 떠 있다는 부석사까지 세 곳을 살펴 주세요.',
  outro:'신라의 별과 돌을 모두 살폈어요. 복원단 일지 첫 장이 채워졌어요.'},
 {no:2,deco:'성곽 담',n:'왕의 도성과 성곽',sites:['suwon','sungnyemun','hanyang'],seal:'城',col:'#2d4f9a',
  intro:'이번에는 조선의 도성이에요. 거중기로 쌓은 화성, 한양의 남쪽 큰 문 숭례문, 왕이 살던 궁궐을 차례로 둘러봐요.',
  outro:'성을 쌓고 문을 세우던 사람들의 솜씨를 다 보았어요. 둘째 장 완성이에요.'},
 {no:3,deco:'장작가마',n:'흙과 불의 장인',sites:['icheon','mungyeong','gangjin'],seal:'火',col:'#a8541c',
  intro:'흙을 빚고 불을 다루는 장인들의 마을로 가요. 이천 백자, 문경 망댕이가마, 강진 청자 가마가 기다려요.',
  outro:'흙과 불이 그릇이 되는 길을 끝까지 따라갔어요. 셋째 장 완성이에요.'},
 {no:4,deco:'거북선 모형',n:'바다를 지킨 사람들',sites:['geobukseon','jinju','tongyeong'],seal:'海',col:'#1f5e6e',
  intro:'바다와 남쪽 고을을 지킨 이야기예요. 여수 거북선, 진주성 촉석루, 통제영이 있던 통영의 나전 공방을 찾아가요.',
  outro:'바다를 지키고 바다의 빛을 담아낸 사람들을 만났어요. 넷째 장 완성이에요.'},
 {no:5,deco:'서안과 두루마리',n:'글과 그림의 집',sites:['hapcheon','gangneung','minhwa'],seal:'書',col:'#4a3a7a',
  intro:'글과 그림을 지켜 온 집으로 가요. 해인사 장경판전, 오죽헌의 초충도, 영월 민화 사랑방이에요.',
  outro:'경판 한 장, 풀벌레 한 마리, 모란 한 송이까지 다 살폈어요. 다섯째 장 완성이에요.'},
 {no:6,deco:'금동관 진열대',n:'옛 왕국의 땅',sites:['buyeo','yesan','naju'],seal:'王',col:'#2f6a4a',
  intro:'마지막 장은 백제와 마한의 땅이에요. 부여 궁남지, 예산 수덕사 대웅전, 나주 반남 고분을 복원하면 일지가 다 채워져요.',
  outro:'열여덟 곳을 모두 지나 복원단 일지를 끝까지 채웠어요. 무이 복원단의 수석 복원가예요!'}];
export const ORDER=CHAPTERS.flatMap(c=>c.sites);
const J=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
export const chapterOf=site=>CHAPTERS.find(c=>c.sites.includes(site))||null;
export function chapterState(){const D=new Set(J('muui-h3-stamps',[])),ev=J('muui-ev-stamps',[]);
 return CHAPTERS.map(c=>({...c,have:c.sites.filter(s=>D.has(s)).length,done:ev.some(e=>e&&e.k==='ch_'+c.no)}))}
/* 지금 할 장: 아직 다 못 채운 첫 장 */
export const currentChapter=()=>chapterState().find(c=>c.have<c.sites.length)||null;
/* 세 곳을 다 채웠는데 도장이 없는 장에 도장을 주고 그 장 목록을 돌려준다 */
export function chapterAward(site){const out=[];try{const ev=J('muui-ev-stamps',[]);for(const c of chapterState()){if(!c.done&&c.have>=c.sites.length){const n=new Date();ev.push({k:'ch_'+c.no,n:`${c.no}장 「${c.n}」 완성`,d:c.outro,t:`${n.getFullYear()}.${n.getMonth()+1}.${n.getDate()}`,site:site||''});out.push(c)}}if(out.length)localStorage.setItem('muui-ev-stamps',JSON.stringify(ev))}catch(e){}return out}
/* 장 완성 화면: 도장이 쾅 찍히고 마무리 글과 보상을 보여 준다 */
export function chapterCard(c,coin=100){try{const o=document.createElement('div');o.id='chDone';o.style.cssText='position:fixed;inset:0;z-index:44;background:rgba(10,6,3,.78);display:grid;place-items:center;padding:14px';const b=document.createElement('div');b.style.cssText='background:radial-gradient(circle at 50% 20%,#3a2a1c,#1a120b);border:3px solid #d8a838;border-radius:10px;padding:24px 22px 18px;width:min(460px,92vw);box-sizing:border-box;color:#f3ead6;text-align:center;font:15px "Gowun Dodum",sans-serif;line-height:1.75;box-shadow:0 20px 60px rgba(0,0,0,.6)';b.innerHTML=`<div style="font:13px 'Do Hyeon',sans-serif;letter-spacing:.3em;color:#d8a838">무이 복원단 일지</div><div class="sl" style="width:96px;height:96px;margin:14px auto 8px;border:5px double ${c.col};border-radius:50%;display:grid;place-items:center;background:#f4ecd8;color:${c.col};font:bold 46px 'Noto Serif KR',serif;transform:rotate(-8deg)">${c.seal}</div><div style="font:16px 'Do Hyeon',sans-serif;color:#d8a838">제 ${c.no} 장 완성</div><b style="display:block;font:30px 'Do Hyeon',sans-serif;margin:2px 0 10px;color:#fff4dc">${c.n}</b><p style="margin:0 0 12px">${c.outro}</p><div style="font-size:13.5px;color:#f2d27a;margin-bottom:14px">특별 도장 · 엽전 ${coin}`+(c.deco?` · 엽전 상점에 「${c.deco}」 열림`:'')+`</div>`;const x=document.createElement('button');x.type='button';x.textContent=c.no<6?'다음 장으로':'일지를 덮어요';x.style.cssText='background:#8e2b20;color:#fff4dc;border:0;padding:10px 22px;border-radius:9px;font:18px "Do Hyeon",sans-serif;cursor:pointer';x.onclick=()=>o.remove();b.append(x);o.append(b);document.body.append(o);const sl=b.querySelector('.sl');sl.animate([{transform:'rotate(-30deg) scale(3)',opacity:0},{transform:'rotate(-8deg) scale(.9)',opacity:1,offset:.6},{transform:'rotate(-8deg) scale(1)',opacity:1}],{duration:700,easing:'ease-out'});return o}catch(e){return null}}
/* 일지 다시 읽기: 진열장에서 장을 누르면 시작 글, 세 곳 진행, 마무리 글 */
export function chapterRead(c,names={},links={}){try{const o=document.createElement('div');o.style.cssText='position:fixed;inset:0;z-index:46;background:rgba(10,6,3,.7);display:grid;place-items:center;padding:14px';o.addEventListener('click',e=>{if(e.target===o)o.remove()});const b=document.createElement('div');b.style.cssText='background:#f4ecd8;color:#2b1d12;border:4px double '+c.col+';border-radius:10px;padding:18px 20px;width:min(460px,92vw);box-sizing:border-box;font:15px "Gowun Dodum",sans-serif;line-height:1.75;max-height:calc(100vh - 28px);overflow:auto';const D=new Set(J('muui-h3-stamps',[]));b.innerHTML=`<div style="display:flex;align-items:center;gap:12px"><div style="width:58px;height:58px;flex:none;border:3px double ${c.col};border-radius:50%;display:grid;place-items:center;color:${c.col};font:bold 28px 'Noto Serif KR',serif;transform:rotate(-8deg)">${c.seal}</div><div><div style="font:13px 'Do Hyeon',sans-serif;color:${c.col}">복원단 일지 제 ${c.no} 장</div><b style="font:24px 'Do Hyeon',sans-serif">${c.n}</b></div></div><p style="margin:10px 0">${c.intro}</p>`+c.sites.map((k,i)=>{const ok=D.has(k),nm=names[k]||k,href=links[k];return `<div style="padding:6px 10px;margin:4px 0;border-radius:8px;background:${ok?'#eef5e6':'#fffaf0'};border:1px solid ${ok?'#2f6a4a':'#d8c8a0'}">${ok?'復':(i+1)+'.'} ${href&&!ok?`<a href="${href}" style="color:#8e2b20">${nm}</a>`:nm} <small style="color:#6b4a26">${ok?'복원 완료':'아직'}</small></div>`}).join('')+(c.done?`<p style="margin:10px 0 0;color:${c.col}">${c.outro}</p>`:'')+(c.deco?`<p style="margin:6px 0 0;font-size:13px;color:#6b4a26">완성 기념 장식: ${c.deco}</p>`:'');const x=document.createElement('button');x.type='button';x.textContent='닫기';x.style.cssText='margin-top:12px;background:#3b2a1c;color:#fff4dc;border:0;padding:8px 18px;border-radius:8px;font:15px "Gowun Dodum",sans-serif;cursor:pointer';x.onclick=()=>o.remove();b.append(x);o.append(b);document.body.append(o);return o}catch(e){return null}}

