/* 무이 나라 조달청: 「쉽게 보기」(E1~E3). 만든 날 2026-11-19
   1) 창이 뜨면 제목 아래에 어린이도 아는 큰 한 줄(무엇을 하는 곳인지)을 먼저 보여 준다. 조달 용어는 그 뒤 창 글에 그대로 있음.
   2) 긴 「조달청 한마디」(jd-tip)는 첫 문장만 보이고 나머지는 「더 보기」로 접는다(단추가 든 안내는 그대로).
   3) 창마다 다음에 누를 큰 단추가 금빛으로 숨 쉬듯 빛나고 손가락 표시가 붙는다.
   모든 창에 한 번에 적용(창 내용이 바뀔 때마다 다시 살핌). easyMode() 한 번 부르면 됨 */
const EASY=[
 [/고을에 방 붙이기/,'장인을 구하는 알림 글(방)을 써서 붙여요. 누구를, 얼마에, 며칠 안에 구할지 골라요!'],
 [/개찰: 입찰 봉투/,'장인들이 낸 값 봉투를 모두가 보는 앞에서 열어요. 봉투를 눌러 보세요!'],
 [/^개찰 결과/,'값이 낮은 차례로 섰어요. 정해 둔 값보다 비싸면 안 되고, 너무 싸도 조심해요.'],
 [/장인들이 찾아왔어요/,'값만 보지 말고 견본(솜씨)과 자격 패를 보고 한 사람을 골라요.'],
 [/검수 조서/,'맡긴 대로 잘 되었는지 왼쪽(약속한 것)과 오른쪽(받은 것)을 견줘 봐요.'],
 [/의궤에 적었어요/,'다 되었어요! 약속한 돈을 치르고, 한 일을 모두 책(의궤)에 남겨요.'],
 [/하던 일이 있어요/,'하던 일을 이어서 하거나 처음부터 다시 할 수 있어요.']
];
/* 11/19 E7: 창 글 속 조달 말이 처음 나올 때 쉬운 풀이를 작게 붙임(창마다 낱말당 한 번) */
const GL=[['예정가격','나라가 미리 정한 가장 비싼 값'],['적격 심사','값만 말고 솜씨·자격도 보고 뽑기'],['개찰','봉투를 모두 앞에서 열기'],['낙찰','일을 맡게 됨'],['유찰','맞는 사람이 없어 다시 뽑기'],['입찰','값을 적어 내기'],['검수','약속대로인지 살피기'],['수결','이름 대신 그리는 서명'],['담합','몰래 짜고 값 맞추기'],['덤핑','너무 싸게 부르기'],['지체상금','늦은 날만큼 내는 돈'],['선금','미리 주는 돈'],['잔금','나머지 돈'],['하자보수','고장 나면 고쳐 주기'],['공동수급','둘이 나눠 맡기'],['부정당','잘못해서 벌 받은'],['규격','약속한 모양·크기·색'],['공고','널리 알리기'],['의궤','한 일을 적어 두는 책'],['비축','미리 사서 쌓아 두기']];
const GSKIP='button,h2,h3,.jd-easy,.jd-gl,script,style,svg,canvas,textarea,input,select,.jd-step,.jd-steps';
const GSEEN=new WeakMap();
function gloss(ov){let seen=GSEEN.get(ov);if(!seen){seen=new Set();GSEEN.set(ov,seen)}for(const g of ov.querySelectorAll('.jd-gl'))seen.add(g.dataset.t);
 const w=document.createTreeWalker(ov,NodeFilter.SHOW_TEXT);const todo=[];let n;while(n=w.nextNode()){const pe=n.parentElement;if(!pe||pe.closest(GSKIP)||pe.closest('[hidden]'))continue;const cs=pe.closest('[style*="nowrap"]');if(cs)continue;if(pe.closest('span[style*="background"],span[style*="border"],b[style*="background"]'))continue;/* 띠·도장 글엔 안 붙임 */const bl=pe.closest('p,div,td,li');if(!bl||(bl.textContent||'').length<30)continue;todo.push(n)}
 for(const t of todo){for(const [k,v] of GL){if(seen.has(k))continue;const s=t.nodeValue;const i=s.indexOf(k);if(i<0)continue;const pre=s[i-1]||'',post=s[i+k.length]||'';if(pre==='('||post==='('||/[가-힣]/.test(pre)&&k.length<3||/[가-힣]/.test(post)&&!/[은는이가을를과와에도의로]/.test(post))continue;seen.add(k);const r=document.createRange();r.setStart(t,i);r.setEnd(t,i+k.length);const sp=document.createElement('span');sp.className='jd-gl';sp.dataset.t=k;r.surroundContents(sp);const sm=document.createElement('small');sm.textContent='('+v+')';sp.append(sm);break}}}
const CSS=`.jd-gl small{font:inherit;font-size:max(.82em,12.5px);color:#2f6a4a;margin-left:1px}
.jd-easy{display:block;max-width:660px;margin:2px auto 8px;padding:7px 14px;border-radius:12px;background:#fff1c2;border:2px solid #e2b23a;color:#2b1d12;font:18px/1.4 'Do Hyeon',sans-serif;text-align:center;box-shadow:0 2px 0 #c8963066}
.jd-tip .jd-more-b{margin-left:6px;padding:0 8px;border-radius:9px;border:1.5px solid #c8a050;background:#fff8e4;color:#8e2b20;font:12.5px 'Do Hyeon',sans-serif;cursor:pointer}
@keyframes jdNext{0%,100%{box-shadow:0 0 0 0 rgba(255,200,60,.0),0 2px 0 rgba(0,0,0,.25)}50%{box-shadow:0 0 0 6px rgba(255,200,60,.55),0 2px 0 rgba(0,0,0,.25)}}
.jd-next{animation:jdNext 1.6s ease-in-out infinite;position:relative}
.jd-next::after{content:'👆';position:absolute;right:-14px;bottom:-16px;font-size:20px;pointer-events:none;animation:jdHand 1.6s ease-in-out infinite}
/* 11/19 E5: 5분 체험에서만 「처음이면 이것」 */.jd-hint{animation:jdNext 1.6s ease-in-out infinite;outline:3px solid #e8b838;outline-offset:2px;position:relative}.jd-hint::before{content:'★ 처음이면 이것';position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:#e8b838;color:#3b1a0c;font:12px 'Do Hyeon',sans-serif;padding:1px 8px;border-radius:8px;z-index:3;white-space:nowrap;pointer-events:none}
/* 11/19 E6 */.jd-pc .jd-next::after{bottom:auto;top:-22px;right:-10px}.jd-rownow td{animation:jdRow 1.6s ease-in-out infinite}@keyframes jdRow{0%,100%{background:transparent}50%{background:#ffe9a8}}
@keyframes jdHand{0%,100%{transform:translate(0,0)}50%{transform:translate(-3px,-4px)}}
/* 11/19 E25: 창 밖 큰 단추(방 붙이기·이어서 하기)도 숨 쉬듯 빛나고 손가락 */@keyframes jdAct{0%,100%{box-shadow:0 8px 24px rgba(0,0,0,.35),0 0 0 0 rgba(255,210,70,0)}50%{box-shadow:0 8px 24px rgba(0,0,0,.35),0 0 0 8px rgba(255,210,70,.6)}}#act.jd-actgo:not([hidden]){animation:jdAct 1.6s ease-in-out infinite}#act.jd-actgo:not([hidden])::after{content:'👆';position:absolute;right:4px;bottom:-20px;font-size:26px;pointer-events:none;animation:jdHand 1.6s ease-in-out infinite}body:has(.jd-ov) #act,body:has(>div[data-mg]) #act{animation:none!important}body:has(.jd-ov) #act::after,body:has(>div[data-mg]) #act::after{display:none!important}
/* 11/20 글 줄이기: 창이나 3D 놀이가 열려 있으면 왼쪽 상태 상자·5단계 판·원님 말풍선·큰 단추를 숨겨 할 일 하나만 보이게 */body:has(.jd-ov) #jdHud,body:has(>div[data-mg]) #jdHud,body:has(.jd-ov) #jdFlow,body:has(>div[data-mg]) #jdFlow,body:has(.jd-ov) #hint,body:has(>div[data-mg]) #hint,body:has(>div[data-mg]) #act{display:none!important}`;
const firstSentence=html=>{const m=/(요|다|니다)[.!?]\s/.exec(html);return m?m.index+m[0].length:-1};
function fix(root){
 /* 1 쉬운 한 줄 */
 for(const h of root.querySelectorAll('.jd-ov h2')){if(h.nextElementSibling&&h.nextElementSibling.classList.contains('jd-easy'))continue;const t=(h.textContent||'').trim();const e=EASY.find(([re])=>re.test(t));if(!e)continue;const d=document.createElement('div');d.className='jd-easy';d.textContent=e[1];h.after(d)}
 /* 2 긴 한마디 접기 */
 for(const tip of root.querySelectorAll('.jd-ov .jd-tip')){if(tip.dataset.ez)continue;tip.dataset.ez=1;if(tip.querySelector('button,input,select,canvas,a'))continue;const h=tip.innerHTML;const cut=firstSentence(h);if(cut<0||h.replace(/<[^>]+>/g,'').length<70)continue;const head=h.slice(0,cut),rest=h.slice(cut);if(/<[^>]*$/.test(head))continue;tip.innerHTML=head+`<span class="jd-more" hidden>${rest}</span><button type="button" class="jd-more-b">더 보기</button>`;const b=tip.querySelector('.jd-more-b'),r=tip.querySelector('.jd-more');b.onclick=ev=>{ev.stopPropagation();r.hidden=!r.hidden;b.textContent=r.hidden?'더 보기':'접기'}}
 /* 2-2 조달 말 풀이(E7) */for(const ov of root.querySelectorAll('.jd-ov'))gloss(ov);
 /* 3 다음에 누를 큰 단추 */
 for(const ov of root.querySelectorAll('.jd-ov')){const cur=ov.querySelector('.jd-next');const pc=ov.querySelector('.jd-pc:not(.ok)');const pcb=pc&&+pc.dataset.need>0&&[...pc.querySelectorAll('[data-pv]')].find(b=>+b.dataset.pv<=+pc.dataset.need-+(pc.querySelector('[data-pn]')||{textContent:0}).textContent);const ok=b=>!b.disabled&&b.offsetParent!==null&&!b.closest('.jd-more');const pick=pcb||[...ov.querySelectorAll('.jd-btn:not(.g)')].find(ok)||(/고쳐 쓸 수 있어요/.test(ov.textContent)?[...ov.querySelectorAll('.jd-btn[data-re]')].find(ok):null);/* 11/19 E9: 꾸러미가 화면 아래 가려 있으면 한 번 보이게 내려 줌 */if(pcb&&!ov.dataset.pcs){ov.dataset.pcs=1;setTimeout(()=>{try{const r=pcb.getBoundingClientRect(),st=ov.querySelector('.jd-sticky');const lim=st?st.getBoundingClientRect().top:innerHeight;if(r.bottom>lim-8)pcb.scrollIntoView({behavior:'smooth',block:'center'})}catch(e){}},1800)}if(cur&&cur!==pick)cur.classList.remove('jd-next');if(pick&&!pick.classList.contains('jd-next'))pick.classList.add('jd-next')}
}
export function easyMode(){if(window.__EASY)return;window.__EASY=1;const st=document.createElement('style');st.textContent=CSS;document.head.append(st);let q=false;const run=()=>{q=false;try{fix(document)}catch(e){}};new MutationObserver(()=>{if(!q){q=true;requestAnimationFrame(run)}}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['disabled','style','hidden']});run();/* 11/19 E28: 창 밖 큰 단추는 방 붙이기·이어서 하기일 때만 빛나게(의궤 보기 같은 다시 보기엔 안 붙임) */setInterval(()=>{const b=document.getElementById('act');if(b)b.classList.toggle('jd-actgo',/방 붙이기|이어서/.test(b.textContent||''))},400);window.__EASYDBG=()=>({easy:document.querySelectorAll('.jd-easy').length,more:document.querySelectorAll('.jd-more').length,next:[...document.querySelectorAll('.jd-next')].map(b=>b.textContent.trim().slice(0,12))})}
