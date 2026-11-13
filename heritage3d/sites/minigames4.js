/* 유산 마당 짧은 놀이 4: 한양 앙부일구, 숭례문 기와 올리기, 부여 금동대향로 맞추기
   갱신 2026-11-13. 원칙은 앞 편들과 같음. */
import {overlay,title,blip,finishCard} from './minigames.js';

/* ---------- 앙부일구: 해를 끌어 그림자 끝을 알려 준 시각 줄에 맞춘다 ---------- */
export function sundialGame(ctx){const ui=overlay('linear-gradient(#f3d9a4,#d9b47a)');let alive=true,sun=.2,drag=false,round=0,scores=[],ended=false,flash=0;
 const ac=ctx.ac(),out=ctx.out();const HOURS=['묘시','진시','사시','오시','미시','신시','유시'];const ASK=[3,1,5];
 title(ui.top,'앙부일구 읽기','해를 좌우로 끌어 그림자 끝을 금빛 시각 줄에 맞추고 손을 떼요. 세 번.');ui.top.style.color='#2b1d12';ui.top.style.textShadow='none';ui.top.querySelector('b').style.color='#8e2b20';
 const G=()=>{const {W,H}=ui.fit(),u=Math.min(W/900,H/600);return{W,H,u,cx:W/2,cy:H*.62,R:200*u}};
 const setSun=e=>{const R=ui.c.getBoundingClientRect(),{W}=G();sun=Math.max(0,Math.min(1,(e.clientX-R.left-W*.1)/(W*.8)))};
 ui.c.addEventListener('pointerdown',e=>{if(ended)return;drag=true;ui.c.setPointerCapture(e.pointerId);setSun(e)});ui.c.addEventListener('pointermove',e=>{if(drag)setSun(e)});
 const rel=()=>{if(!drag)return;drag=false;if(ended)return;const tgt=ASK[round]/6,err=Math.abs(sun-tgt)*6,sc=Math.max(0,1-Math.max(0,err-.15)/1.2);scores.push(sc);flash=1;
  blip(ac,out,sc>.7?880:440,sc>.7?1320:330,.3,.2);ctx.say(sc>.85?`딱 ${HOURS[ASK[round]]}! 그림자가 줄 위에 섰어요.`:sc>.5?'거의 맞았어요!':`조금 비켜 갔어요. 지금은 ${HOURS[Math.round(sun*6)]}쯤이에요.`);round++;
  if(round>=ASK.length){ended=true;setTimeout(()=>{if(!alive)return;const Q=Math.max(10,Math.round(scores.reduce((a,b)=>a+b,0)/scores.length*100));ctx.done('sundial',Q,'앙부일구 읽기');finishCard(ui,'시각을 잘 읽었어요',Q>=75?'솥 모양 해시계 안 그림자로 시각과 절기를 읽던 조선 사람들처럼요.':'그림자는 해와 반대쪽으로 생겨요. 한 번 더 해 볼까요?',Q,close)},900)}};
 ui.c.addEventListener('pointerup',rel);ui.c.addEventListener('pointercancel',rel);
 const close=()=>{alive=false;ui.o.remove()};ui.x.onclick=close;ui.again=()=>{round=0;scores=[];ended=false;title(ui.top,'앙부일구 읽기','한 번 더! 그림자는 해 반대쪽이에요.');ui.top.querySelector('b').style.color='#8e2b20'};
 const loop=()=>{if(!alive)return;const {W,H,u,cx,cy,R}=G(),q=ui.q;const d=Math.min(2,devicePixelRatio||1);q.setTransform(d,0,0,d,0,0);q.clearRect(0,0,W,H);flash=Math.max(0,flash-.03);
  /* 하늘의 해 */const sx=W*.1+sun*W*.8,sy=H*.32-Math.sin(sun*Math.PI)*H*.14;q.fillStyle='rgba(255,220,120,.4)';q.beginPath();q.arc(sx,sy,46*u,0,7);q.fill();q.fillStyle='#f5b83c';q.beginPath();q.arc(sx,sy,26*u,0,7);q.fill();
  /* 솥(오목한 반구) */q.fillStyle='#6b5a3a';q.beginPath();q.ellipse(cx,cy,R*1.12,R*.42,0,0,7);q.fill();q.fillStyle='#e9dcb8';q.beginPath();q.ellipse(cx,cy,R,R*.36,0,0,7);q.fill();
  q.strokeStyle='rgba(60,40,20,.5)';q.lineWidth=1.5;for(let i=0;i<=6;i++){const x=cx+R*.85*Math.cos(Math.PI*(1-i/6));q.beginPath();q.moveTo(x,cy-R*.3*Math.sin(Math.PI*i/6)*.9);q.lineTo(x,cy+R*.3*Math.sin(Math.PI*i/6)*.9);q.stroke();q.fillStyle='#4a3420';q.font=`${13*u}px "Gowun Dodum",sans-serif`;q.textAlign='center';q.fillText(HOURS[i],x,cy+R*.36+16*u)}
  for(let k=1;k<4;k++){q.beginPath();q.ellipse(cx,cy,R*.85,R*.3*k/3.2,0,0,Math.PI);q.stroke()}
  if(!ended&&ASK[round]!=null){const x=cx+R*.85*Math.cos(Math.PI*(1-ASK[round]/6));q.strokeStyle='#d8a838';q.lineWidth=5;q.beginPath();q.moveTo(x,cy-R*.28);q.lineTo(x,cy+R*.28);q.stroke();q.fillStyle='#8e2b20';q.font=`${22*u}px "Do Hyeon",sans-serif`;q.fillText(`${HOURS[ASK[round]]}에 맞춰요`,cx,cy-R*.62)}
  /* 영침과 그림자 */const gx=cx,gy=cy-R*.05;q.strokeStyle='#3b2a1c';q.lineWidth=4*u;q.beginPath();q.moveTo(cx-R*.9,cy-R*.32);q.lineTo(gx,gy);q.stroke();const shx=cx+R*.85*Math.cos(Math.PI*sun);q.strokeStyle='rgba(30,20,10,.55)';q.lineWidth=5*u;q.beginPath();q.moveTo(gx,gy);q.lineTo(shx,cy+R*.05);q.stroke();q.fillStyle='rgba(30,20,10,.7)';q.beginPath();q.arc(shx,cy+R*.05,6*u,0,7);q.fill();
  /* 받침 */q.fillStyle='#4a3420';q.fillRect(cx-20*u,cy+R*.4,40*u,R*.5);q.fillRect(cx-R*.6,cy+R*.9,R*1.2,14*u);
  if(flash>0){q.fillStyle=`rgba(255,255,255,${flash*.3})`;q.fillRect(0,0,W,H)}
  q.fillStyle='#2b1d12';q.font='15px "Gowun Dodum",sans-serif';q.textAlign='center';q.fillText(`${Math.min(round+1,3)} / 3`,W/2,H*.95);
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}

/* ---------- 숭례문 기와 올리기: 좌우로 오가는 기와를 눌러 내려 지붕 줄에 맞춰 쌓는다 ---------- */
export function tileGame(ctx){const ui=overlay('linear-gradient(#b9d3e6,#e8e0cc)');let alive=true,t=0,x=0,dir=1,drop=null,rows=[],ended=false,miss=0,shake=0;
 const ac=ctx.ac(),out=ctx.out();const N=6;
 title(ui.top,'기와 쌓기','지붕에 올릴 수키와를 반듯하게 쌓아요. 오가는 기와를 눌러 내려요. 여섯 장.');ui.top.style.color='#2b1d12';ui.top.style.textShadow='none';ui.top.querySelector('b').style.color='#8e2b20';
 const G=()=>{const {W,H}=ui.fit(),u=Math.min(W/900,H/600);return{W,H,u,base:H*.8,tw:120*u,th:30*u}};
 const go=()=>{if(ended||drop)return;drop={x,y:0,v:0}};ui.c.addEventListener('pointerdown',go);const kd=e=>{if(e.code==='Space'){e.preventDefault();go()}};addEventListener('keydown',kd);
 const close=()=>{alive=false;removeEventListener('keydown',kd);ui.o.remove()};ui.x.onclick=close;ui.again=()=>{rows=[];ended=false;miss=0;drop=null;title(ui.top,'기와 쌓기','한 번 더! 기와가 아래 기와 위에 올 때 눌러요.');ui.top.querySelector('b').style.color='#8e2b20'};
 let last=performance.now();
 const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const {W,H,u,base,tw,th}=G(),q=ui.q;const d=Math.min(2,devicePixelRatio||1);q.setTransform(d,0,0,d,0,0);q.clearRect(0,0,W,H);shake=Math.max(0,shake-dt);
  window.__TILE={x,drop:!!drop,prev:rows.length?rows[rows.length-1]:0,n:rows.length};const sp=(1.1+rows.length*.18);if(!drop&&!ended){x+=dir*sp*dt;if(x>1){x=1;dir=-1}if(x<-1){x=-1;dir=1}}
  const top=base-rows.length*th;const prevX=rows.length?rows[rows.length-1]:0;
  if(drop){drop.v+=2400*u*dt;drop.y+=drop.v*dt;const ty=top-th-H*.12;if(drop.y>=top-H*.18){const off=Math.abs(drop.x-prevX)*W*.25;const sc=Math.max(0,1-off/(tw*.55));
    if(off>tw*.75){miss++;shake=.4;blip(ac,out,300,120,.3,.25,'square');ctx.say(miss>=2?'괜찮아요, 가운데 올 때 눌러요!':'어이쿠, 기와가 미끄러졌어요!');drop=null}
    else{rows.push(drop.x);blip(ac,out,700+rows.length*60,500,.12,.25,'triangle');ctx.say(sc>.85?['딱 맞았어요!','착!','고르게 얹혔어요.'][rows.length%3]:'조금 비뚤어요.');drop.sc=sc;(rows.sc||(rows.sc=[])).push(sc);drop=null;
     if(rows.length>=N){ended=true;setTimeout(()=>{if(!alive)return;const avg=rows.sc.reduce((a,b)=>a+b,0)/rows.sc.length,Q=Math.max(10,Math.round(avg*100-miss*8));ctx.done('tile',Q,'숭례문 기와 쌓기');finishCard(ui,'기와 한 짐 완성!',Q>=75?'반듯하게 쌓여 지붕 일꾼 무이가 바로 올릴 수 있어요.':'조금 기우뚱하지만 무너지진 않았어요. 한 번 더 해 볼까요?',Q,close)},700)}}}}
  /* 문루 */const cx=W/2+(shake?Math.sin(now*.09)*5:0);q.fillStyle='#8f877a';q.fillRect(cx-W*.32,base+th*.2,W*.64,H);q.fillStyle='#3b2a1c';q.beginPath();q.ellipse(cx,base+th*2.4,W*.07,th*1.6,0,Math.PI,0);q.fill();
  q.fillStyle='#7a2a1c';q.fillRect(cx-W*.26,base-6*u,W*.52,10*u);
  rows.forEach((rx,i)=>{const tx=cx+rx*W*.25,ty=base-(i+1)*th;q.fillStyle=i%2?'#4a4a50':'#55555c';q.beginPath();q.roundRect?q.roundRect(tx-tw/2,ty,tw,th-2,8*u):q.rect(tx-tw/2,ty,tw,th-2);q.fill();q.fillStyle='rgba(255,255,255,.12)';q.fillRect(tx-tw/2+6*u,ty+4*u,tw-12*u,5*u)});
  if(!ended){const ax=cx+(drop?drop.x:x)*W*.25,ay=drop?H*.12+drop.y:H*.12;q.strokeStyle='rgba(60,40,20,.6)';q.lineWidth=2;q.beginPath();q.moveTo(ax,0);q.lineTo(ax,ay);q.stroke();q.fillStyle='#4a4a50';q.beginPath();q.roundRect?q.roundRect(ax-tw/2,ay,tw,th-2,8*u):q.rect(ax-tw/2,ay,tw,th-2);q.fill();
   q.strokeStyle='rgba(216,168,56,.7)';q.setLineDash([6,6]);q.beginPath();q.moveTo(cx+prevX*W*.25,top-th*1.2);q.lineTo(cx+prevX*W*.25,top);q.stroke();q.setLineDash([])}
  q.fillStyle='#2b1d12';q.font='15px "Gowun Dodum",sans-serif';q.textAlign='center';q.fillText(`${rows.length} / ${N} 장`,W/2,H*.95);
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}

/* ---------- 금동대향로 맞추기: 받침부터 봉황까지 아래에서 위로 순서대로 ---------- */
export function incenseGame(ctx){const ui=overlay('radial-gradient(900px 600px at 50% 45%,#2a2418,#0c0a06 75%)');let alive=true,step=0,wrong=0,ended=false,smoke=[],shuffle=[];
 const ac=ctx.ac(),out=ctx.out();
 const P=[{k:'dragon',n:'용 받침',h:70,draw:(q,x,y,u)=>{q.fillStyle='#b8902e';q.beginPath();q.ellipse(x,y-20*u,70*u,26*u,0,0,7);q.fill();q.strokeStyle='#6b4a14';q.lineWidth=5*u;q.beginPath();q.moveTo(x-50*u,y-20*u);q.bezierCurveTo(x-20*u,y-70*u,x+20*u,y+20*u,x+40*u,y-50*u);q.stroke();q.beginPath();q.arc(x+44*u,y-56*u,9*u,0,7);q.fillStyle='#d4ab45';q.fill()}},
  {k:'body',n:'연꽃 몸체',h:80,draw:(q,x,y,u)=>{q.fillStyle='#c9a03a';q.beginPath();q.moveTo(x-80*u,y-80*u);q.quadraticCurveTo(x-70*u,y,x,y);q.quadraticCurveTo(x+70*u,y,x+80*u,y-80*u);q.closePath();q.fill();q.strokeStyle='#6b4a14';q.lineWidth=2*u;for(let i=-3;i<=3;i++){q.beginPath();q.moveTo(x+i*22*u,y-80*u);q.quadraticCurveTo(x+i*18*u,y-30*u,x+i*6*u,y-6*u);q.stroke()}}},
  {k:'lid',n:'산봉우리 뚜껑',h:66,draw:(q,x,y,u)=>{q.fillStyle='#d4ab45';q.beginPath();q.moveTo(x-80*u,y);for(let i=0;i<=8;i++){const xx=x-80*u+i*20*u;q.lineTo(xx,y-(60+((i*37)%5)*12)*u*(1-Math.abs(i-4)/8))}q.lineTo(x+80*u,y);q.closePath();q.fill();q.strokeStyle='#6b4a14';q.lineWidth=2*u;q.stroke();for(let i=0;i<5;i++){q.fillStyle='#6b4a14';q.beginPath();q.arc(x-40*u+i*20*u,y-40*u-(i%2)*10*u,4*u,0,7);q.fill()}}},
  {k:'phoenix',n:'봉황',h:70,draw:(q,x,y,u)=>{q.fillStyle='#e0bc58';q.beginPath();q.ellipse(x,y-28*u,18*u,26*u,0,0,7);q.fill();q.beginPath();q.moveTo(x-6*u,y-50*u);q.quadraticCurveTo(x+6*u,y-80*u,x+20*u,y-62*u);q.lineTo(x+6*u,y-48*u);q.fill();q.beginPath();q.moveTo(x,y-20*u);q.bezierCurveTo(x-60*u,y-40*u,x-50*u,y-80*u,x-20*u,y-60*u);q.fill();q.beginPath();q.moveTo(x,y-20*u);q.bezierCurveTo(x+60*u,y-40*u,x+50*u,y-80*u,x+24*u,y-60*u);q.fill();q.fillStyle='#b8322a';q.beginPath();q.arc(x+8*u,y-60*u,3*u,0,7);q.fill()}}];
 const mix=()=>{shuffle=[2,0,3,1]};mix();
 title(ui.top,'금동대향로 맞추기','아래에서 위로, 받침부터 차례대로 조각을 눌러 올려요.');
 const G=()=>{const {W,H}=ui.fit(),u=Math.min(W/900,H/600);return{W,H,u,cx:W*.62,base:H*.66,tray:W*.18}};
 const tray=()=>{const {W,H,u,tray:tx}=G();return shuffle.map((pi,i)=>({pi,x:tx,y:H*.28+i*H*.16,w:150*u,h:H*.14}))};
 ui.c.addEventListener('pointerdown',e=>{if(ended)return;const R=ui.c.getBoundingClientRect(),mx=e.clientX-R.left,my=e.clientY-R.top;for(const s of tray()){if(Math.abs(mx-s.x)<s.w/2&&Math.abs(my-s.y)<s.h/2){if(s.pi<step)return;if(s.pi===step){step++;blip(ac,out,500+step*120,900+step*120,.25,.25,'triangle');ctx.say(['받침이 섰어요!','연꽃이 피었어요.','산이 솟았어요!','봉황이 앉았어요!'][step-1]);
   if(step>=4){ended=true;setTimeout(()=>{if(!alive)return;const Q=Math.max(10,100-wrong*15);ctx.done('incense',Q,'금동대향로');finishCard(ui,'향로가 다 맞춰졌어요!',Q>=75?'용이 받치고 봉황이 내려앉은 백제의 향로에서 향 연기가 피어올라요.':'조금 헤맸지만 무사히 맞췄어요. 한 번 더 해 볼까요?',Q,close)},1800)}}
  else{wrong++;blip(ac,out,260,160,.2,.2,'square');ctx.say(['그건 더 위에 놓아요. 아래부터!','어이쿠, 순서가 바뀌었어요.','받침부터 차근차근!'][wrong%3])}return}}});
 const close=()=>{alive=false;ui.o.remove()};ui.x.onclick=close;ui.again=()=>{step=0;wrong=0;ended=false;smoke=[];shuffle=[1,3,0,2];title(ui.top,'금동대향로 맞추기','한 번 더! 순서가 바뀌었어요.')};
 let last=performance.now();
 const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const {W,H,u,cx,base}=G(),q=ui.q;const d=Math.min(2,devicePixelRatio||1);q.setTransform(d,0,0,d,0,0);q.clearRect(0,0,W,H);
  for(const s of tray()){const done=s.pi<step;q.fillStyle=done?'rgba(255,255,255,.04)':'rgba(255,240,200,.1)';q.strokeStyle=done?'rgba(255,255,255,.1)':'rgba(242,193,78,.6)';q.lineWidth=2;q.fillRect(s.x-s.w/2,s.y-s.h/2,s.w,s.h);q.strokeRect(s.x-s.w/2,s.y-s.h/2,s.w,s.h);if(!done){q.save();q.translate(0,0);P[s.pi].draw(q,s.x,s.y+s.h*.38,u*.55);q.restore();q.fillStyle='#f3ead6';q.font=`${14*u+2}px "Gowun Dodum",sans-serif`;q.textAlign='center';q.fillText(P[s.pi].n,s.x,s.y-s.h/2+16*u)}}
  let y=base;q.fillStyle='rgba(0,0,0,.35)';q.beginPath();q.ellipse(cx,base+6*u,110*u,16*u,0,0,7);q.fill();for(let i=0;i<step;i++){P[i].draw(q,cx,y,u);y-=P[i].h*u}
  if(step<4){q.strokeStyle='rgba(242,193,78,.5)';q.setLineDash([6,8]);q.strokeRect(cx-85*u,y-P[step].h*u,170*u,P[step].h*u);q.setLineDash([])}
  if(ended){if(Math.random()<.5)smoke.push({x:cx+(Math.random()-.5)*30*u,y:y+30*u,l:1,r:6*u});for(const s of smoke){s.y-=40*u*dt;s.x+=Math.sin(now*.002+s.y*.02)*.6;s.r+=8*u*dt;s.l-=dt*.35;q.fillStyle=`rgba(230,225,215,${Math.max(0,s.l)*.35})`;q.beginPath();q.arc(s.x,s.y,s.r,0,7);q.fill()}for(let i=smoke.length-1;i>=0;i--)if(smoke[i].l<=0)smoke.splice(i,1)}
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}
