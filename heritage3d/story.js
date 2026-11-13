/* 무이 복원단 이야기 줄기: 유산 18곳을 6장으로 묶는다.
   장마다 표지(시작 글), 마무리 글, 완성 보상(특별 도장 + 엽전 100).
   완성 기록은 muui-ev-stamps 에 {k:'ch_1',...} 로 남는다. 갱신 2026-11-13 */
export const CHAPTERS=[
 {no:1,n:'천년 신라의 별',sites:['gyeongju','seokguram','yeongju'],seal:'星',col:'#8e2b20',
  intro:'첫 의뢰는 천 년 왕국 신라예요. 별을 보던 첨성대, 돌로 지은 석굴, 바위가 떠 있다는 부석사까지 세 곳을 살펴 주세요.',
  outro:'신라의 별과 돌을 모두 살폈어요. 복원단 일지 첫 장이 채워졌어요.'},
 {no:2,n:'왕의 도성과 성곽',sites:['suwon','sungnyemun','hanyang'],seal:'城',col:'#2d4f9a',
  intro:'이번에는 조선의 도성이에요. 거중기로 쌓은 화성, 한양의 남쪽 큰 문 숭례문, 왕이 살던 궁궐을 차례로 둘러봐요.',
  outro:'성을 쌓고 문을 세우던 사람들의 솜씨를 다 보았어요. 둘째 장 완성이에요.'},
 {no:3,n:'흙과 불의 장인',sites:['icheon','mungyeong','gangjin'],seal:'火',col:'#a8541c',
  intro:'흙을 빚고 불을 다루는 장인들의 마을로 가요. 이천 백자, 문경 망댕이가마, 강진 청자 가마가 기다려요.',
  outro:'흙과 불이 그릇이 되는 길을 끝까지 따라갔어요. 셋째 장 완성이에요.'},
 {no:4,n:'바다를 지킨 사람들',sites:['geobukseon','jinju','tongyeong'],seal:'海',col:'#1f5e6e',
  intro:'바다와 남쪽 고을을 지킨 이야기예요. 여수 거북선, 진주성 촉석루, 통제영이 있던 통영의 나전 공방을 찾아가요.',
  outro:'바다를 지키고 바다의 빛을 담아낸 사람들을 만났어요. 넷째 장 완성이에요.'},
 {no:5,n:'글과 그림의 집',sites:['hapcheon','gangneung','minhwa'],seal:'書',col:'#4a3a7a',
  intro:'글과 그림을 지켜 온 집으로 가요. 해인사 장경판전, 오죽헌의 초충도, 영월 민화 사랑방이에요.',
  outro:'경판 한 장, 풀벌레 한 마리, 모란 한 송이까지 다 살폈어요. 다섯째 장 완성이에요.'},
 {no:6,n:'옛 왕국의 땅',sites:['buyeo','yesan','naju'],seal:'王',col:'#2f6a4a',
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
