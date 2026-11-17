/* 무이 나라 조달청: 「하자보수 사건」(G48, 사후 관리). 만든 날 2026-11-17
   세 고을을 되살린 뒤 한 번, 앞서 고친 고을(첫 고을)에서 흠 소식이 온다. 고르기 둘:
   「하자보수 요청」 = 계약 때 정한 하자 기간 안이라 맡은 장인이 값없이 고침(평판 좋은 장인은 바로, 싸게만 고른 장인은 연락이 안 돼 하자보수 보증금으로 고침),
   「새로 돈 들여 고치기」 = 곳간에서 30냥(아까운 선택). setupHasa(E) 한 번. E={JOBS,ST,save,hudDraw,ov,SND}. window.__HASA */
const jo=(w,a,b)=>{const c=(w||'').charCodeAt((w||'').length-1)-0xac00;return w+((c>=0&&c<11172&&c%28)?a:b)};
export function setupHasa(E){if(window.__HASA)return;const busy=()=>!!document.querySelector('.jd-ov,body>div[data-mg]');
 const fire=()=>{const ST=E.ST;const done=E.JOBS.filter(j=>ST.done[j.k]);const j=done[0];if(!j)return;const d=ST.done[j.k];const good=!d.wrong&&d.stars>=2&&!/떠돌이|지나가던/.test(d.who||'');ST.hasa={k:j.k,stage:'ask'};E.save();
  const u=E.ov();try{E.SND.paper()}catch(e){}
  u.c.innerHTML=`<h2>${j.city}에서 온 소식</h2><div style="margin:4px auto;max-width:560px;padding:8px 12px;border-radius:8px;background:#fff8e4;border:2px solid #b8322a;text-align:left"><b style="color:#8e2b20">${j.city} 원님</b> · 「되살린 <b>${j.n}</b>에 작은 흠이 생겼소. 어찌하면 좋겠소?」<br><small style="color:#5a4a3a">고친 지 얼마 안 됐어요. 맡았던 이: ${d.who||'장인'}</small></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px"><button type="button" class="jd-opt" data-h="1"><b>하자보수 요청</b>계약 때 정한 하자 기간 안이니 맡은 장인이 값없이 고치게 해요</button><button type="button" class="jd-opt" data-h="0"><b>새로 돈 들여 고치기</b>곳간에서 30냥을 써서 다른 장인에게 맡겨요</button></div>`;
  u.c.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{const v=+b.dataset.h;let msg;const noH=d.ctr&&d.ctr.hasa===0;/* 11/18 밤 D10: 계약서에서 하자보수 조항을 뺐다면 요청할 수 없음 */if(v&&noH){ST.coins=Math.max(0,ST.coins-30);msg=`계약서에서 <b>하자보수 조항</b>을 뺐어요. ${jo(d.who,'은','는')} 고쳐 줄 까닭이 없다고 해요. 결국 곳간에서 30냥을 들여 고쳤어요. 계약서 한 줄이 나라 돈을 지켜요.`;try{E.SND.coin()}catch(e){}}else if(v){msg=good?`${jo(d.who,'이','가')} 바로 달려와 값없이 고쳤어요. 약속을 지키는 장인이라 평판이 더 올라요.`:`${jo(d.who,'은','는')} 연락이 닿지 않아요. 그래도 계약 때 받아 둔 <b>하자보수 보증금</b>으로 다른 장인에게 맡겨 고쳤어요. 싸게만 고르면 이런 일이 생겨요.`;try{E.SND.stamp()}catch(e){}}else{ST.coins=Math.max(0,ST.coins-30);msg='곳간에서 30냥이 나갔어요. 하자 기간 안의 흠은 맡은 쪽이 고칠 책임이 있어서, 나라 돈을 쓰지 않아도 됐어요.';try{E.SND.coin()}catch(e){}}
   ST.hasa={k:j.k,stage:'done',v};ST.cards=ST.cards||{};ST.cards.defect=1;E.save();try{E.hudDraw()}catch(e){}
   u.c.innerHTML=`<h2>${v&&!noH?'하자보수 완료':'돈을 들여 고쳤어요'}</h2><div>${msg}</div><div class="jd-tip">조달청 한마디: 나라와 맺은 계약에는 다 고친 뒤에도 일정 기간 흠을 책임지는 <b>하자보수</b> 약속이 들어 있어요. 그래서 끝난 계약도 사후까지 살펴요(사후 관리). 「하자보수」 카드가 열렸어요.</div><div style="margin-top:12px"><button type="button" class="jd-btn" data-x>좋아요</button></div>`;u.c.querySelector('[data-x]').onclick=u.close})};
 setInterval(()=>{try{const ST=E.ST;if(window.__NOEV||(window.__EVACTIVE&&window.__EVACTIVE())||ST.hasa||ST.quick||busy())return;if(Object.keys(ST.done||{}).length<3)return;if(ST.cur&&!ST.done[ST.cur.k])return;fire()}catch(e){}},4000);
 window.__HASA={fire}}
