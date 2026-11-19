/* 무이 나라 조달청: 「조달 절차 흐름표」(조달청 핵심 C5). 만든 날 2026-11-17
   국보 하나를 되살리는 동안 화면 오른쪽에 세로 다섯 칸으로 지금 어느 조달 단계인지 늘 보여 준다.
   ① 방 붙이기 = 입찰 공고 → ② 장인 고르기 = 적격 심사 → ③ 수결 = 계약(계약대로 발굴) → ④ 조각 살피기 = 검수(복원·마지막 손질) → ⑤ 의궤 = 계약 정보 공개
   단계 판정은 떠 있는 창의 글로 함(0.5초마다). 해당 창이 없으면 숨김. setupFlow() 한 번. window.__FLOW() = 지금 단계 */
/* 11/17 개편: 실제 열 단계를 다섯 칸에 묶어 굵은 글씨로 */const STEPS=[['방 붙이기','요청·규격·공고'],['장인 고르기','개찰·적격 심사'],['수결과 발굴','계약·이행 감독'],['조각 살피기','검사·검수'],['의궤에 적기','대금·정보 공개']];
export function setupFlow(){if(window.__FLOWON)return;window.__FLOWON=1;
 const st=document.createElement('style');st.textContent=`#jdFlow{position:fixed;right:12px;top:50%;transform:translateY(-50%);z-index:40;display:none;flex-direction:column;gap:4px;font:13px "Gowun Dodum",sans-serif;pointer-events:none}
#jdFlow .t{font:14px "Do Hyeon",sans-serif;color:#f2d27a;text-align:center;text-shadow:0 1px 2px #000;margin-bottom:2px}
#jdFlow .s{display:flex;align-items:center;gap:7px;padding:5px 10px 5px 6px;border-radius:12px;background:rgba(40,26,14,.72);color:#d8c8a8;border:2px solid rgba(216,168,56,.25);min-width:132px;transition:all .3s}
#jdFlow .n{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:#5a4430;color:#f3ead6;font:13px "Do Hyeon",sans-serif;flex:none}
#jdFlow .s b{display:block;font:14px "Do Hyeon",sans-serif;color:#f3ead6;line-height:1.1}#jdFlow .s small{font-size:12px;opacity:.85}
#jdFlow .s.on{background:linear-gradient(90deg,#8e2b20,#b8452a);border-color:#f2d27a;color:#fff;transform:translateX(-6px) scale(1.04);box-shadow:0 4px 14px rgba(0,0,0,.45)}#jdFlow .s.on .n{background:#f2d27a;color:#5a2a10}
#jdFlow .s.done .n{background:#2f6b55}#jdFlow .s.done{opacity:.8}#jdFlow .a{height:6px;width:2px;background:rgba(216,168,56,.5);margin:-2px 0 -2px 22px}
@media (max-width:700px){#jdFlow{display:none!important}}@media (max-width:900px) and (orientation:portrait){#jdFlow{display:none!important}}/* 11/19 E20: 세로 태블릿은 발굴 칸을 가려서 숨김 */`;document.head.append(st);
 const el=document.createElement('div');el.id='jdFlow';el.innerHTML='<div class="t">조달 절차</div>'+STEPS.map((s,i)=>(i?'<div class="a"></div>':'')+`<div class="s" data-i="${i}"><span class="n">${i+1}</span><span><b>${s[1]}</b><small>${s[0]}</small></span></div>`).join('');document.body.append(el);
 const FIELD=/발굴 현장|난파선|궁궐 터|갯벌|가마터/;let cur=-1;
 const judge=()=>{const ovs=[...document.querySelectorAll('.jd-ov,body>div[data-mg]')];if(!ovs.length)return -1;const tx=ovs.map(o=>o.textContent||'').join(' ');
  if(/의궤가 완성|(?:빠른|5분) 체험을 마쳤어요|출처와 만든 방법|조작 안내|조달 품질 검사소|공방 현장 실사|비축 물자 풀기|공사 현장 안전 점검|서당 책상 장보기|고을 공동 구매|착한 공방 우선 구매|고을 고민 해결|서당 설계 공모 심사|비축 물자 수송 길 짜기|계약 정보 게시판 살피기|녹색 물건 고르기| 이정표/.test(tx))return -1;if(/의궤에 적었어요/.test(tx))return 4;if(/마지막 손질|품질 검사|복원/.test(tx)&&!FIELD.test(tx.slice(0,80))&&/조각|손질|검사|맞춰|비색|달개|영침|자개/.test(tx))return 3;if(FIELD.test(tx))return 2;if(/장인들이 찾아왔어요|수결하고 맡기기/.test(tx))return 1;if(/고을에 방 붙이기/.test(tx))return 0;return -1};
 setInterval(()=>{let k=-1;try{k=judge()}catch(e){}/* 11/18 밤 D20: 넓은 창(장인 다섯 등)이 판 자리까지 오면 판을 잠시 숨김 */try{const cs=[...document.querySelectorAll('.jd-ov .jd-card')];const hide=cs.some(c=>{const r=c.getBoundingClientRect();return r.right>innerWidth-155});el.style.visibility=hide?'hidden':''}catch(e){}if(k===cur)return;cur=k;el.style.display=k<0?'none':'flex';el.querySelectorAll('.s').forEach((s,i)=>{s.classList.toggle('on',i===k);s.classList.toggle('done',i<k)});const sm=el.querySelector('.s[data-i="2"] small');if(sm)sm.textContent=k===2?'계약대로 발굴 중':'수결';},500);
 window.__FLOW=()=>cur}
