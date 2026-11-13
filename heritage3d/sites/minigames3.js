/* 유산 마당 짧은 놀이 3: 거북선 노 젓기, 범종 치기, 현자총통 쏘기, 민화 모란 그리기, 통영 자개 붙이기
   갱신 2026-11-13. 원칙은 1, 2편과 같음. */
import {overlay,title,noiseSrc,blip,finishCard} from './minigames.js';
import {traceGame} from './minigames2.js';

/* ---------- 거북선 노 젓기: 북소리에 맞춰 왼쪽, 오른쪽 번갈아 ---------- */
export function rowGame(ctx){const ui=overlay('linear-gradient(#1d4a6a,#0b2236)');let alive=true,t=0,dist=0,v=0,good=0,tot=0,side=0,lastBeat=-1,ended=false,oarL=0,oarR=0,shake=0;
 const BEAT=.8,DUR=24,GOAL=100;const ac=ctx.ac(),out=ctx.out();
 const drum=()=>{if(!ac||!out)return;const t0=ac.currentTime,o=ac.createOscillator(),g=ac.createGain();o.frequency.setValueAtTime(110,t0);o.frequency.exponentialRampToValueAtTime(48,t0+.25);g.gain.setValueAtTime(.42,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+.35);o.connect(g).connect(out);o.start(t0);o.stop(t0+.4)};
 const splash=()=>{if(!ac||!out)return;const n=noiseSrc(ac),f=ac.createBiquadFilter(),g=ac.createGain(),t0=ac.currentTime;f.type='lowpass';f.frequency.value=1600;g.gain.setValueAtTime(.18,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+.3);n.connect(f).connect(g).connect(out);n.start(t0);n.stop(t0+.35)};
 title(ui.top,'거북선 노 젓기','북이 둥 울릴 때 왼쪽, 오른쪽을 번갈아 눌러요. (← → 키도 돼요)');
 const stroke=s=>{if(ended)return;const ph=(t%BEAT)/BEAT,on=ph<.22||ph>.85;tot++;
  if(on&&s!==side){good++;v+=2.6;splash();if(s<0)oarL=1;else oarR=1;side=s}else{v=Math.max(0,v-1);shake=.4;blip(ac,out,240,140,.18,.16,'square');if(tot%3===1)ctx.say(s===side?'반대쪽도 저어요!':'북소리에 맞춰요, 둥!')}};
 ui.c.addEventListener('pointerdown',e=>{const R=ui.c.getBoundingClientRect();stroke(e.clientX-R.left<R.width/2?-1:1)});
 const kd=e=>{if(e.code==='ArrowLeft'||e.code==='KeyA'){e.preventDefault();stroke(-1)}if(e.code==='ArrowRight'||e.code==='KeyD'){e.preventDefault();stroke(1)}};addEventListener('keydown',kd);
 const close=()=>{alive=false;removeEventListener('keydown',kd);ui.o.remove()};ui.x.onclick=close;
 ui.again=()=>{t=0;dist=0;v=0;good=0;tot=0;side=0;lastBeat=-1;ended=false;title(ui.top,'거북선 노 젓기','한 번 더! 둥 소리에 맞춰 번갈아.')};
 const end=win=>{ended=true;const acc=tot?good/tot:0,Q=Math.max(10,Math.round((win?60:30)+acc*40));ctx.done('row',Q,'거북선 노 젓기');blip(ac,out,520,1040,.5,.25);finishCard(ui,win?'판옥선을 따라잡았어요!':'시간이 다 됐어요',win?'노꾼 무이들이 북소리에 척척 맞췄어요.':`${Math.round(dist)}보 나아갔어요. 박자를 맞추면 더 빨라요.`,Q,close)};
 let last=performance.now();
 const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const {W,H,d}=ui.fit(),q=ui.q;q.setTransform(d,0,0,d,0,0);q.clearRect(0,0,W,H);
  window.__ROW={t,dist,BEAT};if(!ended){t+=dt;const b=Math.floor(t/BEAT);if(b!==lastBeat){lastBeat=b;drum()}v*=Math.pow(.55,dt);dist+=v*dt;if(dist>=GOAL)end(true);else if(t>=DUR)end(false)}
  oarL=Math.max(0,oarL-dt*2.5);oarR=Math.max(0,oarR-dt*2.5);shake=Math.max(0,shake-dt);
  /* 바다 물결 */q.strokeStyle='rgba(255,255,255,.12)';q.lineWidth=2;for(let i=0;i<14;i++){const y=((i*70+dist*9)%(H+70))-35;q.beginPath();for(let x=0;x<=W;x+=20)q.lineTo(x,y+Math.sin(x*.03+i)*6);q.stroke()}
  /* 판옥선 목표 */const gy=H*.18-(GOAL-dist)*4.2;if(gy>-80){q.fillStyle='#7a5530';q.fillRect(W/2-40,gy-20,80,40);q.fillStyle='#e8dcc0';q.fillRect(W/2-4,gy-60,8,40);q.fillRect(W/2-24,gy-56,48,26)}
  /* 거북선 */const cx=W/2+(shake?Math.sin(now*.08)*6:0),cy=H*.62;q.save();q.translate(cx,cy);
  q.fillStyle='rgba(255,255,255,.25)';q.beginPath();q.moveTo(-26,60);q.lineTo(-60-v*6,160);q.lineTo(60+v*6,160);q.lineTo(26,60);q.fill();
  for(let i=0;i<5;i++){const yy=-40+i*22;q.strokeStyle='#4a3020';q.lineWidth=5;q.beginPath();q.moveTo(-34,yy);q.lineTo(-34-70*Math.cos(oarL*1.2-.3),yy+40*Math.sin(oarL*1.2-.3));q.stroke();q.beginPath();q.moveTo(34,yy);q.lineTo(34+70*Math.cos(oarR*1.2-.3),yy+40*Math.sin(oarR*1.2-.3));q.stroke()}
  q.fillStyle='#5a3a22';q.beginPath();q.ellipse(0,0,40,80,0,0,7);q.fill();q.fillStyle='#3b5a48';q.beginPath();q.ellipse(0,4,32,68,0,0,7);q.fill();q.fillStyle='#c8b06a';for(let i=0;i<24;i++){q.beginPath();q.arc(-18+(i%4)*12,-40+Math.floor(i/4)*16,2,0,7);q.fill()}
  q.fillStyle='#8a2a1a';q.beginPath();q.moveTo(-14,-78);q.lineTo(0,-104);q.lineTo(14,-78);q.fill();q.fillStyle='#f2c14e';q.beginPath();q.arc(-5,-90,2.5,0,7);q.arc(5,-90,2.5,0,7);q.fill();q.restore();
  /* 박자 고리 */const ph=(t%BEAT)/BEAT;q.strokeStyle='rgba(242,193,78,.9)';q.lineWidth=4;q.beginPath();q.arc(W/2,H*.9,14+40*(1-ph),0,7);q.stroke();q.fillStyle='#f2c14e';q.beginPath();q.arc(W/2,H*.9,12,0,7);q.fill();
  q.fillStyle='rgba(255,255,255,.15)';q.fillRect(0,0,W*.18,H);q.fillRect(W*.82,0,W*.18,H);q.fillStyle='#f3ead6';q.font='20px "Do Hyeon",sans-serif';q.textAlign='center';q.fillText('왼쪽',W*.09,H*.9);q.fillText('오른쪽',W*.91,H*.9);
  q.fillStyle='rgba(0,0,0,.35)';q.fillRect(16,H*.25,10,H*.5);q.fillStyle='#f2c14e';const pr=Math.min(1,dist/GOAL);q.fillRect(16,H*.25+H*.5*(1-pr),10,H*.5*pr);
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}

/* ---------- 범종 치기: 당목을 끌어 당겼다 놓는다. 알맞은 힘이면 맥놀이가 길게 운다 ---------- */
export function bellGame(ctx){const ui=overlay('radial-gradient(900px 600px at 50% 40%,#2c2418,#0c0906 75%)');let alive=true,pull=0,drag=null,swing=0,sv=0,hits=[],ended=false,glow=0,sway=0;
 const ac=ctx.ac(),out=ctx.out();
 const ring=k=>{if(!ac||!out)return;const t0=ac.currentTime,base=72,P=[[1,.5,7],[2.01,.28,5],[2.76,.18,4],[5.4,.07,2.5],[8.9,.04,1.5]],M=ac.createGain();M.gain.value=.55*k;M.connect(out);
  for(const[r,g,dur]of P){for(const det of[0,.6]){const o=ac.createOscillator(),G=ac.createGain();o.frequency.value=base*r+det;G.gain.setValueAtTime(.0001,t0);G.gain.exponentialRampToValueAtTime(g*.5,t0+.02);G.gain.exponentialRampToValueAtTime(.0001,t0+dur*(.6+k*.6));o.connect(G).connect(M);o.start(t0);o.stop(t0+dur*1.3)}}
  const n=noiseSrc(ac),f=ac.createBiquadFilter(),g=ac.createGain();f.type='lowpass';f.frequency.value=600;g.gain.setValueAtTime(.25*k,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+.15);n.connect(f).connect(g).connect(out);n.start(t0);n.stop(t0+.2)};
 title(ui.top,'범종 치기','당목(나무 공이)을 뒤로 끌어 당겼다 놓아요. 금빛 칸만큼 당기면 종이 가장 곱게 울려요. 세 번.');
 const geo=()=>{const {W,H}=ui.fit(),u=Math.min(W/900,H/600);return{W,H,u,bx:W*.6,by:H*.5,lx:W*.6-150*u,ly:H*.56}};
 ui.c.addEventListener('pointerdown',e=>{if(ended||swing>0)return;drag=e.clientX;ui.c.setPointerCapture(e.pointerId)});
 ui.c.addEventListener('pointermove',e=>{if(drag==null)return;const {u}=geo();pull=Math.max(0,Math.min(1,(drag-e.clientX)/(260*u)))});
 const rel=()=>{if(drag==null)return;drag=null;if(pull<.08){pull=0;return}swing=pull;sv=0};ui.c.addEventListener('pointerup',rel);ui.c.addEventListener('pointercancel',rel);
 const close=()=>{alive=false;ui.o.remove()};ui.x.onclick=close;ui.again=()=>{hits=[];ended=false;pull=0;swing=0;title(ui.top,'범종 치기','한 번 더! 금빛 칸까지만 당겨요.')};
 const ZONE=[.55,.75];let last=performance.now();
 const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const {W,H,u,bx,by,lx,ly}=geo(),q=ui.q;const d=Math.min(2,devicePixelRatio||1);q.setTransform(d,0,0,d,0,0);q.clearRect(0,0,W,H);
  if(swing>0){sv+=dt*9;pull=Math.max(0,swing*(1-sv));if(sv>=1){const p=swing,c=(ZONE[0]+ZONE[1])/2,err=Math.abs(p-c),sc=Math.max(0,1-Math.max(0,err-.1)/.45);hits.push(sc);ring(.4+p*.8);glow=1;sway=p*.08;
    ctx.say(p<ZONE[0]?'소리가 조금 작아요. 더 당겨요!':p>ZONE[1]?'쾅! 너무 세요. 종이 놀라겠어요.':['데엥~ 고운 소리!','맥놀이가 길게 울려요.','은은하게 퍼져요.'][hits.length%3]);swing=0;pull=0;
    if(hits.length>=3){ended=true;setTimeout(()=>{if(!alive)return;const Q=Math.max(10,Math.round(hits.reduce((a,b)=>a+b,0)/3*100));ctx.done('bell',Q,'범종 치기');finishCard(ui,'종소리가 산을 넘어가요',Q>=75?'세 번 모두 알맞은 힘으로 쳐서 소리가 곱게 울렸어요.':'힘이 조금 들쭉날쭉했어요. 금빛 칸을 노려 봐요.',Q,close)},2200)}}}
  glow=Math.max(0,glow-dt*.5);sway*=Math.pow(.4,dt);
  /* 종각 기둥 */q.fillStyle='#5a2a1a';q.fillRect(bx-200*u,by-230*u,22*u,420*u);q.fillRect(bx+178*u,by-230*u,22*u,420*u);q.fillStyle='#3b2a1c';q.fillRect(bx-220*u,by-250*u,440*u,26*u);
  /* 종 */q.save();q.translate(bx,by-200*u);q.rotate(Math.sin(now*.01)*sway);q.fillStyle=`rgb(${90+glow*60|0},${110+glow*50|0},${90+glow*30|0})`;q.beginPath();q.moveTo(-60*u,30*u);q.quadraticCurveTo(-70*u,200*u,-100*u,250*u);q.lineTo(100*u,250*u);q.quadraticCurveTo(70*u,200*u,60*u,30*u);q.quadraticCurveTo(0,0,-60*u,30*u);q.fill();
  q.strokeStyle='rgba(255,230,150,.35)';q.lineWidth=2;for(const yy of[80,120,230])q.beginPath(),q.moveTo(-90*u,yy*u),q.lineTo(90*u,yy*u),q.stroke();q.fillStyle='rgba(255,230,150,.5)';q.beginPath();q.arc(-48*u,175*u,14*u,0,7);q.fill();q.restore();
  if(glow>0){q.strokeStyle=`rgba(255,220,140,${glow*.5})`;q.lineWidth=3;for(let i=1;i<4;i++){q.beginPath();q.arc(bx,by-30*u,(60+i*50+(1-glow)*120)*u,0,7);q.stroke()}}
  /* 당목 */const tx=lx-pull*260*u;q.strokeStyle='#3b2a1c';q.lineWidth=3;q.beginPath();q.moveTo(tx+20*u,by-250*u);q.lineTo(tx+20*u,ly-12*u);q.moveTo(tx-120*u,by-250*u);q.lineTo(tx-120*u,ly-12*u);q.stroke();q.fillStyle='#8a5a34';q.fillRect(tx-170*u,ly-14*u,200*u,28*u);q.fillStyle='#6b4428';q.beginPath();q.arc(tx+30*u,ly,14*u,0,7);q.fill();
  /* 당김 막대 */const gx=W*.12,gw=W*.76,gy=H*.88;q.fillStyle='rgba(0,0,0,.4)';q.fillRect(gx,gy,gw,12);q.fillStyle='rgba(242,193,78,.6)';q.fillRect(gx+gw*ZONE[0],gy-4,gw*(ZONE[1]-ZONE[0]),20);q.fillStyle='#f3ead6';q.fillRect(gx,gy,gw*pull,12);
  q.fillStyle='#f3ead6';q.font='15px "Gowun Dodum",sans-serif';q.textAlign='center';q.fillText(`${Math.min(3,hits.length+ (ended?0:1))} / 3 번째`,W/2,gy-14);
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}

/* ---------- 현자총통 쏘기: 뒤로 끌어 방향과 힘을 정하고 놓아 쏜다 ---------- */
export function cannonGame(ctx){const ui=overlay('linear-gradient(#c9d8e0 0%,#e8dcc0 55%,#2d5a78 56%,#173a52 100%)');let alive=true,drag=null,aim=null,ball=null,shots=0,hitN=0,ended=false,ship={x:.78,v:.018,hp:2,sink:0},booms=[];
 const ac=ctx.ac(),out=ctx.out();
 const boom=k=>{if(!ac||!out)return;const t0=ac.currentTime,n=noiseSrc(ac),f=ac.createBiquadFilter(),g=ac.createGain();f.type='lowpass';f.frequency.value=k?500:900;g.gain.setValueAtTime(k?.5:.35,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+(k?.9:.5));n.connect(f).connect(g).connect(out);n.start(t0);n.stop(t0+1);blip(ac,out,90,40,.4,.3)};
 title(ui.top,'현자총통 쏘기','총통에서 뒤로 끌어 방향과 힘을 정하고 놓아요. 왜선을 두 번 맞히면 가라앉아요. 다섯 발.');ui.top.style.color='#2b1d12';ui.top.style.textShadow='none';ui.top.querySelector('b').style.color='#8e2b20';
 const G=()=>{const {W,H}=ui.fit(),u=Math.min(W/900,H/600);return{W,H,u,cx:W*.16,cy:H*.56-104*u,sea:H*.56}};
 ui.c.addEventListener('pointerdown',e=>{if(ended||ball)return;const R=ui.c.getBoundingClientRect();drag=[e.clientX-R.left,e.clientY-R.top];aim=null;ui.c.setPointerCapture(e.pointerId)});
 ui.c.addEventListener('pointermove',e=>{if(!drag)return;const R=ui.c.getBoundingClientRect();aim=[drag[0]-(e.clientX-R.left),drag[1]-(e.clientY-R.top)]});
 const rel=()=>{if(!drag)return;drag=null;if(!aim)return;const {u,cx,cy}=G(),p=Math.min(1,Math.hypot(aim[0],aim[1])/(220*u)),a=Math.atan2(-aim[1],Math.max(1,aim[0]));if(p<.1){aim=null;return}ball={x:cx,y:cy,vx:Math.cos(a)*p*900*u,vy:-Math.sin(a)*p*900*u};shots++;boom(0);aim=null};
 ui.c.addEventListener('pointerup',rel);ui.c.addEventListener('pointercancel',rel);
 const close=()=>{alive=false;ui.o.remove()};ui.x.onclick=close;ui.again=()=>{shots=0;hitN=0;ended=false;ship={x:.78,v:.018,hp:2,sink:0};title(ui.top,'현자총통 쏘기','한 번 더! 배가 움직이는 쪽을 앞서 노려요.');ui.top.querySelector('b').style.color='#8e2b20'};
 const fin=()=>{ended=true;setTimeout(()=>{if(!alive)return;const win=ship.hp<=0,Q=Math.max(10,Math.round(win?100-(shots-2)*12:hitN*30));ctx.done('cannon',Q,'현자총통 쏘기');finishCard(ui,win?'왜선이 물러갔어요!':'포탄이 다 떨어졌어요',win?`${shots}발 만에 맞혔어요. 진주성이 든든해요.`:'배가 움직이는 쪽을 조금 앞서 노려 봐요.',Q,close)},1200)};
 let last=performance.now();
 const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const {W,H,u,cx,cy,sea}=G(),q=ui.q;const d=Math.min(2,devicePixelRatio||1);q.setTransform(d,0,0,d,0,0);q.clearRect(0,0,W,H);
  window.__CAN={ship,W,H,u,cx,cy,sea,ball:!!ball};if(ship.hp>0){ship.x+=ship.v*dt;if(ship.x>.9||ship.x<.55)ship.v*=-1}else ship.sink=Math.min(1,ship.sink+dt*.5);
  /* 성벽 */q.fillStyle='#8f877a';q.fillRect(0,sea-90*u,W*.24,90*u);for(let i=0;i<6;i++){q.fillRect(i*W*.04,sea-110*u,W*.025,20*u)}
  /* 배 */const sx=W*ship.x,sy=sea+ship.sink*50*u;q.save();q.translate(sx,sy);q.rotate(ship.sink*.4);q.fillStyle='#4a2e1c';q.beginPath();q.moveTo(-70*u,-10*u);q.lineTo(70*u,-10*u);q.lineTo(50*u,18*u);q.lineTo(-50*u,18*u);q.fill();q.fillStyle='#5a3a24';q.fillRect(-4*u,-92*u,6*u,82*u);q.fillStyle='#d8cdb4';q.beginPath();q.moveTo(-40*u,-86*u);q.quadraticCurveTo(-6*u,-70*u,-40*u,-30*u);q.lineTo(30*u,-30*u);q.quadraticCurveTo(4*u,-60*u,30*u,-86*u);q.closePath();q.fill();q.strokeStyle='rgba(90,60,30,.6)';q.lineWidth=1.5;for(const yy of[-72,-58,-44]){q.beginPath();q.moveTo(-34*u,yy*u);q.lineTo(26*u,yy*u);q.stroke()}if(ship.hp===1){q.fillStyle='rgba(40,30,20,.7)';q.fillRect(10*u,-6*u,16*u,10*u)}q.restore();
  q.fillStyle='rgba(23,58,82,.85)';q.fillRect(0,sea+14*u,W,H);
  /* 총통 */let a=-.35;if(aim){a=-Math.atan2(-aim[1],Math.max(1,aim[0]))}q.save();q.translate(cx,cy);q.rotate(a);q.fillStyle='#3a3a36';q.fillRect(0,-12*u,90*u,24*u);q.fillStyle='#5a5a52';for(const k of[18,44,70])q.fillRect(k*u,-14*u,6*u,28*u);q.restore();q.fillStyle='#6b4428';q.beginPath();q.arc(cx,cy+10*u,18*u,0,7);q.fill();
  if(aim){const p=Math.min(1,Math.hypot(aim[0],aim[1])/(220*u)),A=Math.atan2(-aim[1],Math.max(1,aim[0]));let x=cx,y=cy,vx=Math.cos(A)*p*900*u,vy=-Math.sin(A)*p*900*u;q.fillStyle='rgba(255,255,255,.7)';for(let i=0;i<14;i++){for(let k=0;k<4;k++){x+=vx*.02;y+=vy*.02;vy+=600*u*.02}q.beginPath();q.arc(x,y,3,0,7);q.fill()}}
  if(ball){ball.x+=ball.vx*dt;ball.y+=ball.vy*dt;ball.vy+=600*u*dt;q.fillStyle='#1b1b1b';q.beginPath();q.arc(ball.x,ball.y,7*u,0,7);q.fill();
   if(ship.hp>0&&Math.abs(ball.x-sx)<70*u&&ball.y>sea-90*u&&ball.y<sea+18*u){ship.hp--;hitN++;booms.push({x:ball.x,y:ball.y,l:1});boom(1);ctx.say(ship.hp>0?'명중! 한 번 더!':'왜선이 기울어요!');ball=null;if(ship.hp<=0||shots>=5)fin()}
   else if(ball.y>sea+10*u||ball.x>W+40){booms.push({x:ball.x,y:sea,l:1,w:1});ball=null;if(shots===2&&!hitN)ctx.say('물기둥만 솟았어요. 조금 더 멀리!');if(shots>=5)fin()}}
  for(const b of booms){b.l-=dt*1.4;if(b.w){q.fillStyle=`rgba(230,240,250,${b.l})`;q.fillRect(b.x-6*u,b.y-60*u*(1-b.l),12*u,60*u*(1-b.l))}else{q.fillStyle=`rgba(255,${150+b.l*80|0},60,${b.l})`;q.beginPath();q.arc(b.x,b.y,40*u*(1-b.l)+8,0,7);q.fill()}}for(let i=booms.length-1;i>=0;i--)if(booms[i].l<=0)booms.splice(i,1);
  q.fillStyle='#2b1d12';q.font='16px "Do Hyeon",sans-serif';q.textAlign='left';q.fillText(`포탄 ${5-shots} / 5`,16,H*.2);
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}

/* ---------- 민화 모란 그리기 ---------- */
const peony=[[[300,175],[262,140],[268,100],[300,120]],[[300,120],[332,100],[338,140],[300,175]],[[300,175],[240,180],[220,140],[255,128]],[[300,175],[360,180],[380,140],[345,128]],[[300,182],[290,260],[300,360]],[[296,270],[240,250],[215,280]],[[302,300],[360,285],[385,310]]];
export function peonyGame(ctx){traceGame(ctx,{key:'peony',label:'민화 모란',title:'모란 그리기',sub:'점선을 따라 꽃잎부터 줄기, 잎까지 그려요. 모란은 부귀를 빌던 꽃이에요.',bg:'radial-gradient(900px 600px at 50% 45%,#3a2a20,#120c07 75%)',sfxF:1500,ink:'#7a2a2a',width:9,guide:'rgba(120,60,40,.9)',strokes:peony,
 drawBase:(q,W,H)=>{q.fillStyle='#efe2c4';q.fillRect(0,0,W,H);for(let i=0;i<1600;i++){q.fillStyle=`rgba(140,110,70,${Math.random()*.07})`;q.fillRect(Math.random()*W,Math.random()*H,2,2)}q.strokeStyle='#8e2b20';q.lineWidth=6;q.strokeRect(14,14,W-28,H-28)},
 commit:(q,pts,i)=>{q.lineCap='round';q.lineJoin='round';if(i<4){q.fillStyle=['#d0405a','#c8344e','#e06a7a','#da5468'][i];q.beginPath();pts.forEach((p,j)=>j?q.lineTo(p[0],p[1]):q.moveTo(p[0],p[1]));q.closePath();q.fill();q.strokeStyle='#7a1e2a';q.lineWidth=2;q.stroke()}else if(i===4){q.strokeStyle='#4a5a2a';q.lineWidth=8;q.beginPath();pts.forEach((p,j)=>j?q.lineTo(p[0],p[1]):q.moveTo(p[0],p[1]));q.stroke()}else{q.fillStyle='#4f7a3a';q.beginPath();const a=pts[0],b=pts[pts.length-1],m=pts[pts.length>>1];q.moveTo(a[0],a[1]);q.quadraticCurveTo(m[0],m[1]-26,b[0],b[1]);q.quadraticCurveTo(m[0],m[1]+26,a[0],a[1]);q.fill()}},
 finish:(q)=>{q.fillStyle='#f2c14e';for(let i=0;i<9;i++){q.beginPath();q.arc(300+Math.cos(i*.7)*12,160+Math.sin(i*.7)*8,3,0,7);q.fill()}q.save();q.translate(500,320);q.strokeStyle='#b8322a';q.fillStyle='#b8322a';q.lineWidth=3;q.strokeRect(0,0,46,46);q.font='bold 20px "Noto Serif KR",serif';q.textAlign='center';q.fillText('무이',23,30);q.restore()},
 praise:['꽃잎이 활짝!','색이 곱게 올라요.','줄기가 힘차요!'],miss:'붓이 꽃밭을 벗어났어요. 노란 점에서 다시!',
 doneHead:'모란도 한 폭 완성!',goodBody:'탐스러운 모란이 활짝 피었어요. 사랑방에 걸면 집안이 환해져요.',okBody:'조금 삐뚤지만 민화다운 멋이 있어요. 한 번 더 그려 볼까요?'})}

/* ---------- 통영 자개 붙이기(끊음질): 자개 실선을 무늬대로 붙인다 ---------- */
const najeon=[[[150,120],[450,120]],[[150,300],[450,300]],[[180,210],[240,170],[300,210],[360,170],[420,210]],[[180,250],[240,210],[300,250],[360,210],[420,250]],[[300,140],[300,280]]];
export function najeonGame(ctx){traceGame(ctx,{key:'najeon',label:'나전 끊음질',title:'자개 붙이기',sub:'옻칠한 판 위 점선을 따라 자개 실을 붙여요. 빛에 따라 무지개색이 나요.',bg:'radial-gradient(900px 600px at 50% 45%,#2a1a14,#0a0605 75%)',sfxF:4200,ink:'#cfe8ff',width:6,guide:'rgba(200,220,255,.7)',strokes:najeon,
 drawBase:(q,W,H)=>{const g=q.createLinearGradient(0,0,W,H);g.addColorStop(0,'#1a0d0a');g.addColorStop(1,'#2e1610');q.fillStyle=g;q.fillRect(0,0,W,H);q.strokeStyle='#5a2a18';q.lineWidth=8;q.strokeRect(8,8,W-16,H-16)},
 commit:(q,pts)=>{const a=pts[0],b=pts[pts.length-1],g=q.createLinearGradient(a[0],a[1],b[0],b[1]);g.addColorStop(0,'#e8f4ff');g.addColorStop(.3,'#b8f0e0');g.addColorStop(.6,'#f0c8f0');g.addColorStop(1,'#c8e0ff');q.strokeStyle=g;q.lineWidth=5;q.lineCap='butt';q.lineJoin='round';q.beginPath();pts.forEach((p,j)=>j?q.lineTo(p[0],p[1]):q.moveTo(p[0],p[1]));q.stroke()},
 finish:(q,W,H)=>{for(let i=0;i<26;i++){const x=150+Math.random()*300,y=120+Math.random()*180,r=1+Math.random()*2.5;q.fillStyle=['#e8f4ff','#b8f0e0','#f0c8f0'][i%3];q.beginPath();q.moveTo(x,y-r*3);q.lineTo(x+r,y);q.lineTo(x,y+r*3);q.lineTo(x-r,y);q.fill()}},
 praise:['반짝! 무지개빛이에요.','자개 실이 곧게 붙었어요.','칠판 위로 물결이 일어요.'],miss:'자개가 비뚤게 붙었어요. 노란 점에서 다시!',
 doneHead:'나전 상자 뚜껑 완성!',goodBody:'끊음질 물결무늬가 빛을 받아 반짝여요. 통영 12공방 솜씨예요.',okBody:'조금 비뚤지만 반짝임은 그대로예요. 한 번 더 해 볼까요?'})}
