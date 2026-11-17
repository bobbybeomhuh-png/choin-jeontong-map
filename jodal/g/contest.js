/* 무이 나라 조달청: 「긴급 복원 대회」. 만든 날 2026-11-16
   60초 안에 다섯 국보(금관·매병·앙부일구·나전칠함·달항아리)를 차례로, 조각 셋씩 빠르게 맞춘다.
   하나 맞추면 1점, 시간 +3초(최대 75초). 끝나면 점수·내 최고 기록, 점수 × 3냥.
   복원대(restore3d.js)의 긴급 판(rush) 복원을 그대로 쓰되, 무이 월드의 의뢰서·서버 순위는 쓰지 않는다.
   HUD 「복원 대회」 단추로 연다. runContest(ctx,{JOBS,ST,save,hudDraw,ov,SND}) */
import {restoreGame} from './sites/restore3d.js';
export function runContest(ctx,E){const list=E.JOBS.map(j=>j.k).sort(()=>Math.random()-.5);let n=0,t=60,ended=false,idx=0;const done=[];const st={cur:null,next:null,abort:null};
 const bar=document.createElement('div');bar.style.cssText='position:fixed;left:50%;top:calc(env(safe-area-inset-top) + 86px);transform:translateX(-50%);z-index:60;display:flex;gap:10px;align-items:center;pointer-events:none;font:22px "Do Hyeon",sans-serif;color:#fff4dc';bar.innerHTML='<span data-t style="background:rgba(142,43,32,.92);border:2px solid #ffb35a;border-radius:14px;padding:5px 14px;min-width:92px;text-align:center">60.0</span><span data-n style="background:rgba(30,20,12,.85);border:2px solid #d8a838;border-radius:14px;padding:5px 14px">긴급 복원 대회 · 0점</span>';document.body.append(bar);const tEl=bar.querySelector('[data-t]'),nEl=bar.querySelector('[data-n]');
 const round=()=>{if(ended)return;const k=list[idx++%list.length];restoreGame(ctx,k,{rush:st})};
 st.next=A=>{if(ended)return;n++;done.push(A.n);t=Math.min(75,t+3);nEl.textContent=`긴급 복원 대회 · ${n}점`;try{nEl.animate([{transform:'scale(1.35)'},{transform:'scale(1)'}],{duration:260})}catch(e){}E.SND.coin();round()};
 st.abort=()=>end(true);
 const iv=setInterval(()=>{if(ended)return;t-=.1;tEl.textContent=Math.max(0,t).toFixed(1);if(t<=10)tEl.style.background='rgba(200,40,30,.95)';if(t<=0)end(false)},100);
 const end=(aborted)=>{if(ended)return;ended=true;clearInterval(iv);bar.remove();try{st.cur&&st.cur()}catch(e){}if(aborted&&!n)return;const S=E.ST;const best=S.contestBest||0;const rec=n>best;if(rec)S.contestBest=n;S.coins+=n*3;E.save();E.hudDraw();E.SND.fan();
  const u=E.ov();u.c.innerHTML=`<h2>긴급 복원 대회 끝!</h2><div style="font:60px 'Do Hyeon',sans-serif;color:#8e2b20;line-height:1">${n}<small style="font-size:24px">점</small></div><b style="display:block;font:20px 'Do Hyeon',sans-serif;margin:6px 0">${n>=8?'전설의 복원 장인!':n>=5?'손이 빠른 복원가!':n>=3?'든든한 복원 일꾼!':n>=1?'첫 출전 성공!':'다음엔 더 빨리!'}</b>${rec&&n?'<div style="color:#a8602a;font:17px \'Do Hyeon\',sans-serif">★ 내 최고 기록!</div>':`<div style="color:#6b4a26">내 최고 ${Math.max(best,n)}점</div>`}<div style="margin:6px 0;color:#6b4a26">${done.length?'되살린 국보: '+[...new Set(done)].join(', '):'조각 셋을 흐린 자리에 끌어다 놓으면 한 점이에요.'} · 상금 ${n*3}냥</div><div style="margin-top:10px;display:flex;gap:8px;justify-content:center"><button type="button" class="jd-btn" data-again>한 번 더</button><button type="button" class="jd-btn g" data-x>지도로</button></div>`;
  u.c.querySelector('[data-x]').onclick=u.close;u.c.querySelector('[data-again]').onclick=()=>{u.close();window.__JODAL&&window.__JODAL.contest&&window.__JODAL.contest()}};
 round();return{end}}
