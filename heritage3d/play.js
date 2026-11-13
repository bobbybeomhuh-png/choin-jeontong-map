/* 무이 월드 공용: 무이별 솜씨(놀이 보너스), 주간 의뢰, 명절 행사.
   갱신 2026-11-13 */
const J=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
const S=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};

/* ---- 무이별 솜씨: 맞는 놀이는 작품 품질 +10, 기본 무이는 모든 놀이 +4 ---- */
export const KIND_N={base:'무이',ceramic:'도공 무이',science:'과학 무이',carpenter:'목수 무이',painter:'화공 무이',metal:'금속 무이'};
export const ABIL={ceramic:['wheel','kiln','inlay'],science:['sundial','crane','cannon'],carpenter:['tile','row','najeon'],painter:['peony','bamboo','rubbing'],metal:['bell','incense','brush']};
export const myKind=()=>{try{return localStorage.getItem('muui3d-kind')||'base'}catch(e){return 'base'}};
export function abilBonus(game){const k=myKind();if(ABIL[k]&&ABIL[k].includes(game))return{v:10,who:KIND_N[k]};if(k==='base'||!ABIL[k])return{v:4,who:'무이'};return{v:0,who:KIND_N[k]}}
/* 어떤 무이가 어떤 놀이를 잘하는지 사람이 읽는 글 */
export const GAME_N={wheel:'물레',kiln:'가마 불',inlay:'상감',sundial:'앙부일구',crane:'거중기',cannon:'현자총통',tile:'기와 쌓기',row:'노 젓기',najeon:'자개',peony:'모란',bamboo:'오죽',rubbing:'탁본',bell:'범종',incense:'향로',brush:'흙 털기'};
export const abilText=k=>ABIL[k]?`${KIND_N[k]}는 ${ABIL[k].map(g=>GAME_N[g]).join(', ')} 놀이를 잘해요(품질 +10).`:'기본 무이는 모든 놀이를 조금씩 잘해요(품질 +4).';

/* ---- 주간 의뢰: 월요일마다 바뀌는 세 가지, 하나에 엽전 40 ---- */
const POOL=[{k:'game',n:'유산 마당 놀이 3번 하기',g:3},{k:'star3',n:'놀이에서 별 3개 2번 받기',g:2},{k:'quest',n:'유산 마당 의뢰 1곳 끝내기',g:1},{k:'photo',n:'기념 엽서 2장 찍기',g:2},{k:'hifive',n:'동행 무이와 손뼉 3번',g:3},{k:'site',n:'서로 다른 유산 마당 3곳 들르기',g:3},{k:'daily',n:'오늘의 놀이 2일 하기',g:2}];
export const WEEK_COIN=40;
const MON0=new Date(2026,0,5).getTime();
export function weekNo(d=new Date()){const t=new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime();return Math.floor((t-MON0)/(7*864e5))}
export function weekTasks(w=weekNo()){const n=POOL.length,a=(w*5)%n;const out=[];for(let i=0;out.length<3;i++){const p=POOL[(a+i*3)%n];if(!out.includes(p))out.push(p)}return out}
function weekLoad(){const w=weekNo();let st=J('muui-week',null);if(!st||st.w!==w)st={w,c:{},s:[],done:[]};return st}
export function weekState(){const st=weekLoad();return{w:st.w,tasks:weekTasks(st.w).map(t=>({...t,have:Math.min(t.g,t.k==='site'?(st.s||[]).length:(st.c[t.k]||0)),done:st.done.includes(t.k)}))}}
/* 한 번 했음을 알리고, 이번에 새로 끝난 주간 의뢰 목록을 돌려준다 */
export function weekBump(kind,site){const st=weekLoad();if(kind==='site'){st.s=st.s||[];if(site&&!st.s.includes(site))st.s.push(site)}else st.c[kind]=(st.c[kind]||0)+1;const out=[];for(const t of weekTasks(st.w)){const have=t.k==='site'?(st.s||[]).length:(st.c[t.k]||0);if(have>=t.g&&!st.done.includes(t.k)){st.done.push(t.k);out.push(t);const L=J('muui-week-log',[]);L.push(st.w+':'+t.k);S('muui-week-log',L)}}S('muui-week',st);return out}

/* ---- 명절 행사: 기간 안에 무이 월드에 오면 명절 장식과 방문 도장(엽전 50) ----
   날짜는 음력 환산 기준. 하루 이틀 앞뒤로 넉넉히 잡음. */
export const FEST=[
 {k:'dongji2026',n:'동지',from:'2026-12-20',to:'2026-12-24',fx:'patjuk',msg:'동짓날이에요. 밤이 가장 긴 날, 팥죽 한 그릇 먹고 가요.'},
 {k:'seol2027',n:'설날',from:'2027-02-04',to:'2027-02-10',fx:'kite',msg:'새해 복 많이 받아요! 마당 하늘에 연이 떴어요.'},
 {k:'boreum2027',n:'정월대보름',from:'2027-02-18',to:'2027-02-22',fx:'moon',msg:'정월대보름이에요. 둥근 달을 보며 소원을 빌어요.'},
 {k:'dano2027',n:'단오',from:'2027-06-07',to:'2027-06-11',fx:'swing',msg:'단오예요. 대문 밖에 그네를 매었어요.'},
 {k:'chuseok2027',n:'추석',from:'2027-09-13',to:'2027-09-18',fx:'moon',msg:'추석이에요. 보름달처럼 넉넉한 하루 보내요.'}];
export const FEST_COIN=50;
export function festNow(d=new Date()){try{const q=new URLSearchParams(location.search).get('fest');if(q)return FEST.find(f=>f.k===q||f.fx===q)||null}catch(e){}const s=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;return FEST.find(f=>s>=f.from&&s<=f.to)||null}
export function festStamp(f){if(!f)return false;try{const ev=J('muui-ev-stamps',[]);if(ev.some(e=>e&&e.k==='fest_'+f.k))return false;const n=new Date();ev.push({k:'fest_'+f.k,n:f.n+' 방문',d:f.msg,t:`${n.getFullYear()}.${n.getMonth()+1}.${n.getDate()}`,site:'world'});S('muui-ev-stamps',ev);return true}catch(e){return false}}
