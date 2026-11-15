/* 민속놀이 셋: 투호, 제기차기, 윷놀이. 갱신 2026-11-15
   전국 지도 풍속 행사 자리(folk.js)의 놀이판에서 연다. 모두 손가락 하나로(끌기, 누르기) 할 수 있게.
   투호: 끌어서 각도와 힘을 정하고 놓으면 화살이 날아가 항아리에 들어가면 점수. 열 대.
   제기차기: 무이를 좌우로 움직여 떨어지는 제기 밑에 두면 발로 차 올림. 땅에 떨어지면 끝.
   윷놀이: 윷 네 가락을 던져(도 개 걸 윷 모) 말 두 개를 무이보다 먼저 한 바퀴 돌려 들여보냄. 모서리와 가운데에 서면 지름길. */
import {overlay,title,blip,finishCard,softOut} from './minigames.js';
const DPR=()=>Math.min(2,devicePixelRatio||1);

/* ======================= 투호 ======================= */
export function tuhoGame(ctx){const ui=overlay('linear-gradient(#3f6680,#86aabd 38%,#e6d8b8 62%,#c9b48a 62%)');let alive=true,ended=false,left=10,score=0,arrows=[],drag=null,stuck=[],msgT=0;
 const ac=ctx.ac(),out=softOut(ctx);title(ui.top,'투호','항아리 쪽으로 화면을 끌었다 놓으면, 끈 방향 그대로 날아가요. 길게 끌수록 세게! 키보드는 ↑↓ 각도, ←→ 힘, 스페이스로 던지기. 열 대 중 몇 대 넣을까요?');
 const G=()=>{const {W,H}=ui.fit();const u=Math.min(W/900,H/600);const gy=H*.62;return{W,H,u,gy,sx:W*.16,sy:gy-70*u,px:W*.16+Math.min(W*.58,620*u),pr:22*u,ph:120*u}};
 /* 던지는 자리에서 끌기 */
 ui.c.addEventListener('pointerdown',e=>{if(ended||left<=0)return;const R=ui.c.getBoundingClientRect();drag={x0:e.clientX-R.left,y0:e.clientY-R.top,x:e.clientX-R.left,y:e.clientY-R.top};ui.c.setPointerCapture(e.pointerId)});
 ui.c.addEventListener('pointermove',e=>{if(!drag)return;const R=ui.c.getBoundingClientRect();drag.x=e.clientX-R.left;drag.y=e.clientY-R.top});
 ui.c.addEventListener('pointerup',()=>{if(!drag)return;const g=G();const V=vel(g);drag=null;if(!V||left<=0)return;aim.a=V.a;aim.k=V.k;fire(V)});
 const aim={a:.85,k:.25};let kb=false;/* 힘: 항아리까지 거리로 기준 속도를 잡아 화면 크기와 상관없이 k≈.5 근처에서 들어감(들어가는 폭 약 11%) */const vRef=(g)=>{const x=g.px-g.sx,h=g.sy-(g.gy-g.ph),A=.85,c=Math.cos(A);return Math.sqrt(900*g.u*x*x/(2*c*c*(x*Math.tan(A)-h)))};const kv=(g,a,k)=>{const v=vRef(g)*(.85+.3*k);return{vx:Math.cos(a)*v,vy:-Math.sin(a)*v,k,a}};const fire=(V)=>{const g=G();arrows.push({x:g.sx,y:g.sy,vx:V.vx,vy:V.vy,live:true,ang:V.a});left--;blip(ac,out,500,260,.15,.12,'triangle')};
 const onKey=e=>{if(!alive||ended)return;const K=e.key;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','Enter'].includes(K)){e.preventDefault();e.stopPropagation();kb=true}if(K==='ArrowUp')aim.a=Math.min(1.45,aim.a+.04);if(K==='ArrowDown')aim.a=Math.max(.05,aim.a-.04);if(K==='ArrowRight')aim.k=Math.min(1,aim.k+.025);if(K==='ArrowLeft')aim.k=Math.max(0,aim.k-.025);if((K===' '||K==='Enter')&&left>0)fire(kv(G(),aim.a,aim.k))};window.addEventListener('keydown',onKey,true);
 const vel=(g)=>{if(!drag)return kb?kv(g,aim.a,aim.k):null;const dx=drag.x-drag.x0,dy=drag.y-drag.y0,L=Math.hypot(dx,dy);if(L<12)return null;const k=Math.min(1,L/(260*g.u)),a=Math.max(.05,Math.min(1.45,Math.atan2(-dy,dx)));return kv(g,a,k)};
 const close=()=>{alive=false;window.removeEventListener('keydown',onKey,true);ui.o.remove()};ui.x.onclick=close;
 let last=performance.now();
 const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.033,(now-last)/1000);last=now;const g=G(),{W,H,u,gy}=g,q=ui.q,d=DPR();q.setTransform(d,0,0,d,0,0);q.clearRect(0,0,W,H);const grav=900*u;
  /* 멍석 */q.fillStyle='#b8995e';q.fillRect(0,gy,W,H-gy);for(let x=0;x<W;x+=14*u){q.fillStyle='rgba(120,90,50,.18)';q.fillRect(x,gy,2,H-gy)}
  /* 항아리: 목이 긴 투호병(양쪽 귀) */const px=g.px,top=gy-g.ph;q.fillStyle='#3d5a6c';q.beginPath();q.ellipse(px,gy-g.ph*.35,g.pr*2.1,g.ph*.38,0,0,7);q.fill();q.fillRect(px-g.pr*.75,top,g.pr*1.5,g.ph*.4);q.fillStyle='#2b4352';q.beginPath();q.ellipse(px,top,g.pr,g.pr*.32,0,0,7);q.fill();q.fillStyle='#4f7488';for(const sx of[-1,1]){q.fillRect(px+sx*g.pr*.75+(sx>0?0:-g.pr*.45),top+g.ph*.08,g.pr*.45,g.ph*.22)}
  q.fillStyle='rgba(255,255,255,.25)';q.beginPath();q.ellipse(px-g.pr*.9,gy-g.ph*.42,g.pr*.35,g.ph*.18,0,0,7);q.fill();q.fillStyle='rgba(0,0,0,.15)';q.beginPath();q.ellipse(px,gy+3,g.pr*2.2,8*u,0,0,7);q.fill();
  /* 들어간 화살 */for(const s of stuck){q.save();q.translate(px+s.ox,top);q.rotate(s.r);q.fillStyle='#7a4a2a';q.fillRect(-2*u,-70*u,4*u,70*u);q.fillStyle='#e8e0cc';q.fillRect(-5*u,-74*u,10*u,12*u);q.restore()}
  /* 무이(던지는 쪽) */q.fillStyle='#f6f1e6';q.beginPath();q.ellipse(g.sx-30*u,gy-38*u,26*u,36*u,0,0,7);q.fill();q.fillStyle='#222';q.beginPath();q.arc(g.sx-22*u,gy-50*u,2.6*u,0,7);q.arc(g.sx-36*u,gy-50*u,2.6*u,0,7);q.fill();
  /* 겨냥 점선 */const V=vel(g);if(V){let x=g.sx,y=g.sy,vx=V.vx,vy=V.vy;q.fillStyle='rgba(60,40,20,.55)';for(let i=0;i<40;i++){if(y>g.gy)break;x+=vx*.05;y+=vy*.05;vy+=grav*.05;if(i%2===0){q.beginPath();q.arc(x,y,3*u,0,7);q.fill()}}q.fillStyle="#8e2b20";q.fillRect(W*.7-20,g.gy+44*u+30,(W*.3)*V.k,10);q.strokeStyle="#8e2b20";q.strokeRect(W*.7-20,g.gy+44*u+30,W*.3,10)}
  /* 날아가는 화살 */for(const a of arrows){if(!a.live)continue;a.vy+=grav*dt;a.x+=a.vx*dt;a.y+=a.vy*dt;a.ang=Math.atan2(-a.vy,a.vx);
   /* 입구: 위에서 아래로 지나가면 들어감 */if(a.vy>0&&Math.abs(a.y-top)<a.vy*dt+4&&Math.abs(a.x-px)<g.pr*2){a.live=false;score++;stuck.push({ox:(a.x-px)*.6,r:(Math.random()-.5)*.35});blip(ac,out,700,1100,.22,.18);ctx.say(['쏙! 들어갔어요','좋아요, 한 대 더!','명중!'][score%3]);msgT=1}
   else if(a.y>top&&Math.abs(a.x-px)<g.pr*2.1&&a.y<gy){a.live=false;blip(ac,out,300,120,.2,.16,'square');ctx.say('챙! 항아리에 맞고 튕겼어요')}
   else if(a.y>gy||a.x>W+40){a.live=false;blip(ac,out,200,90,.15,.1,'sine')}
   if(a.live){q.save();q.translate(a.x,a.y);q.rotate(-a.ang);q.fillStyle='#7a4a2a';q.fillRect(-36*u,-2*u,72*u,4*u);q.fillStyle='#e8e0cc';q.fillRect(-40*u,-5*u,12*u,10*u);q.fillStyle='#3b3b3b';q.beginPath();q.moveTo(36*u,-4*u);q.lineTo(44*u,0);q.lineTo(36*u,4*u);q.fill();q.restore()}}
  arrows=arrows.filter(a=>a.live);
  q.fillStyle='#3b2414';q.font=`bold ${22*u+8}px "Do Hyeon",sans-serif`;q.textAlign='right';q.fillText(`넣은 화살 ${score}  ·  남은 화살 ${left}`,W-20,H*.62+44*u+14);q.textAlign='left';
  if(!ended&&left<=0&&!arrows.length){ended=true;const Q=Math.round(Math.min(100,10+score*15));setTimeout(()=>{if(!alive)return;ctx.done('tuho',Q,'투호');finishCard(ui,`열 대 중 ${score}대 넣었어요`,score>=5?'투호는 병이나 항아리에 화살을 던져 넣는 놀이로, 조선의 궁궐과 양반집에서 즐겼어요.':'힘은 짧게, 각도는 높게 던져 보세요. 투호는 마음을 가다듬는 놀이였대요.',Q,close)},500)}
  requestAnimationFrame(loop)};loop();
 ui.again=()=>{left=10;score=0;arrows=[];stuck=[];ended=false};window.__TUHO={state:()=>({left,score,ended})}}

/* ======================= 제기차기 ======================= */
export function jegiGame(ctx){const ui=overlay('linear-gradient(#3f6680,#8fb3c4 45%,#dfe6d6 70%,#c8b48a 70%)');let alive=true,ended=false,kicks=0,best=0,started=false,mx=null;
 const ac=ctx.ac(),out=softOut(ctx);title(ui.top,'제기차기','화면을 좌우로 끌어 무이를 제기 밑에 두면 발로 차 올려요. 땅에 떨어지지 않게 몇 번 찰 수 있을까요?');
 const G=()=>{const {W,H}=ui.fit();const u=Math.min(W/700,H/700);return{W,H,u,gy:H*.7}};
 let J=null,M=null;const reset=()=>{const g=G();J={x:g.W/2,y:g.H*.25,vx:0,vy:0,r:0};M={x:g.W/2};kicks=0;started=false;ended=false};reset();
 const mv=e=>{const R=ui.c.getBoundingClientRect();mx=e.clientX-R.left;started=true};ui.c.addEventListener('pointerdown',mv);ui.c.addEventListener('pointermove',e=>{if(e.buttons||e.pointerType==='mouse')mv(e)});
 const close=()=>{alive=false;ui.o.remove()};ui.x.onclick=close;let last=performance.now();
 const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.033,(now-last)/1000);last=now;const g=G(),{W,H,u,gy}=g,q=ui.q,d=DPR();q.setTransform(d,0,0,d,0,0);q.clearRect(0,0,W,H);
  q.fillStyle='#c8b48a';q.fillRect(0,gy,W,H-gy);
  if(mx!=null)M.x+=(mx-M.x)*Math.min(1,dt*14);M.x=Math.max(40*u,Math.min(W-40*u,M.x));
  const foot=gy-24*u;
  if(started&&!ended){const grav=(560+kicks*9)*u;J.vy+=grav*dt;J.x+=J.vx*dt;J.y+=J.vy*dt;J.r+=dt*(J.vx/(40*u));if(J.x<20*u||J.x>W-20*u){J.vx*=-1;J.x=Math.max(20*u,Math.min(W-20*u,J.x))}
   if(J.vy>0&&J.y>=foot-10*u&&J.y<=foot+14*u&&Math.abs(J.x-M.x)<34*u){kicks++;best=Math.max(best,kicks);J.vy=-(560+Math.min(220,kicks*6))*u;J.vx=(Math.random()-.5)*(80+Math.min(260,kicks*14))*u;blip(ac,out,420+Math.min(400,kicks*12),260,.12,.16,'triangle');if(kicks%10===0)ctx.say(`${kicks}번! 잘 차요`)}
   if(J.y>gy){ended=true;blip(ac,out,200,80,.3,.18,'sine');const Q=Math.round(Math.min(100,8+best*4));setTimeout(()=>{if(!alive)return;ctx.done('jegi',Q,'제기차기');finishCard(ui,`${best}번 찼어요`,best>=15?'제기는 엽전에 얇은 종이나 천을 달아 만들어요. 땅에 떨어뜨리지 않고 몇 번 차는지 겨루던 겨울 놀이예요.':'제기가 내려오는 자리를 먼저 보고 미리 가 있으면 쉬워요.',Q,close)},400)}}
  /* 무이 */const bx=M.x,by=gy;q.fillStyle='rgba(0,0,0,.15)';q.beginPath();q.ellipse(bx,by+4*u,30*u,7*u,0,0,7);q.fill();q.fillStyle='#f6f1e6';q.beginPath();q.ellipse(bx,by-44*u,30*u,40*u,0,0,7);q.fill();q.fillStyle='#222';q.beginPath();q.arc(bx-9*u,by-58*u,3*u,0,7);q.arc(bx+9*u,by-58*u,3*u,0,7);q.fill();
  const kickUp=J.vy<0&&J.y>foot-90*u;q.strokeStyle='#f6f1e6';q.lineWidth=12*u;q.lineCap='round';q.beginPath();q.moveTo(bx+8*u,by-12*u);q.lineTo(bx+(kickUp?24:10)*u,by-(kickUp?26:2)*u);q.stroke();
  /* 제기: 엽전 + 술 */q.save();q.translate(J.x,J.y);q.rotate(J.r*.3);q.fillStyle='#b88a2a';q.beginPath();q.arc(0,0,9*u,0,7);q.fill();q.fillStyle='#5a4220';q.fillRect(-3*u,-3*u,6*u,6*u);const C=['#d83a3a','#f2c14e','#2f8a5a','#3a6ad8'];for(let i=0;i<9;i++){q.strokeStyle=C[i%4];q.lineWidth=3*u;q.beginPath();q.moveTo(0,-6*u);q.quadraticCurveTo((i-4)*5*u,-26*u,(i-4)*7*u,-40*u-(i%3)*4*u);q.stroke()}q.restore();
  q.fillStyle='#3b2414';q.font=`bold ${26*u+10}px "Do Hyeon",sans-serif`;q.textAlign='center';q.fillText(started?`${kicks}`:'끌어서 시작',W/2,H*.12+40);if(best)q.font=`${14*u+8}px "Gowun Dodum",sans-serif`,q.fillText(`가장 많이 ${best}번`,W/2,H*.12+66);
  requestAnimationFrame(loop)};loop();ui.again=()=>{reset()};window.__JEGI={state:()=>({kicks,best,ended,started}),J:()=>J,M:()=>M}}

/* ======================= 윷놀이 ======================= */
/* 판: 바깥 20칸(0=참먹이 출발점, 5 10 15 모서리) + 지름길(20~24: 5→가운데→15, 25~28: 10→가운데→0쪽). 22=가운데(방) */
const OUT=[...Array(20).keys()];
function routeFrom(n){if(n===5)return[5,20,21,22,23,24,15,16,17,18,19];if(n===10)return[10,25,26,22,27,28];if(n===22)return[22,27,28];return null}
const YUT=['빽도','도','개','걸','윷','모'];
export function yutGame(ctx,join){const ui=overlay('radial-gradient(circle at 50% 40%,#e9dcbc,#b89a62)');let alive=true,ended=false;
 /* 함께 두기: NET=window.__NETY(같은 마당 실시간 채널). opp=상대 id, 없으면 무이(컴퓨터)와 둠. 화면마다 나는 파랑(0), 상대는 흰(1) */
 const NET=window.__NETY||null;let opp=null,oppName='무이',gid=null,waiting=false,off=null;
 const ac=ctx.ac(),out=softOut(ctx);
 /* 말: route(앞으로 갈 칸 목록), i(지금 위치 인덱스), home(들어감) */
 const mk=()=>({route:OUT.slice(),i:-1,home:false});
 const P=[[mk(),mk()],[mk(),mk()]];/* 0=나, 1=무이 */
 let turn=0,throws=[],pend=0,sticks=[1,1,1,1],anim=0,msg='윷을 던지세요',sel=null,ai=0;
 const OPN=()=>opp?oppName+'님':'무이';
 const posOf=m=>m.i<0?-1:m.route[m.i];
 const head=()=>{title(ui.top,opp?'윷놀이 · '+oppName+'님과':'윷놀이',turn===0?'윷을 던지고, 움직일 말을 눌러요. 윷과 모가 나오면 한 번 더! 모서리와 가운데에 멈추면 지름길로.':OPN()+' 차례예요...');{const b=ui.top.querySelector('b'),sp=ui.top.querySelector('span');ui.top.style.textShadow='none';if(b)b.style.color='#8e2b20';if(sp)sp.style.color='#4a3420'}};head();
 const toss=(force)=>{/* 가락마다 평평한 면이 위로 나올 확률 반. 상대가 던진 값(force)은 그 값이 되게 가락을 맞춤 */if(force!=null){const f=force===5?0:force;sticks=[0,1,2,3].map(i=>i<f?1:0).sort(()=>Math.random()-.5)}else sticks=[0,1,2,3].map(()=>Math.random()<.5?1:0);const f=sticks.reduce((a,b)=>a+b,0);const v=f===0?5:f;anim=1;blip(ac,out,300+v*60,200,.2,.18,'triangle');return v};
 const canMove=(m,v)=>!m.home;
 const move=(side,m,v)=>{/* 출발: 판에 없으면 0에서 시작 */let route=m.route,i=m.i;if(i<0){route=OUT.slice();i=0}else{const r=routeFrom(route[i]);if(r){route=r;i=0}}
  i+=v;if(i>=route.length){m.home=true;m.i=-1;m.route=OUT.slice();return'home'}m.route=route;m.i=i;
  /* 잡기 */const here=route[i];let cap=false;for(const o of P[1-side])if(!o.home&&posOf(o)===here){o.i=-1;o.route=OUT.slice();cap=true}return cap?'cap':'ok'};
 const win=s=>P[s].every(m=>m.home);
 const doThrow=(force)=>{if(ended||pend>0)return;const v=toss(force);if(opp&&force==null&&turn===0)NET.send({t:'th',to:opp,g:gid,v});throws.push(v);msg=`${YUT[v]}!`+(v>=4?' 한 번 더 던져요':'');if(v<4)pend=throws.length;ctx.say(msg)};
 const use=(side,m)=>{if(!throws.length)return;const v=throws.shift();const r=move(side,m,v);if(r==='cap'){msg=side?OPN()+'이 내 말을 잡았어요!':OPN()+' 말을 잡았어요! 한 번 더';blip(ac,out,600,900,.25,.2);if(side===turn)pend=0}else if(r==='home'){msg=side?OPN()+' 말 하나가 들어갔어요':'말 하나가 들어갔어요!';blip(ac,out,500,1000,.3,.2)}
  if(win(side)){ended=true;const Q=side===0?100:40;setTimeout(()=>{if(!alive)return;ctx.done('yut',Q,'윷놀이');finishCard(ui,side===0?'이겼어요! 말 둘이 다 들어왔어요':OPN()+'이 먼저 들어왔어요',side===0?'도 개 걸 윷 모는 각각 돼지, 개, 양, 소, 말을 뜻한다고 해요. 설날에 온 식구가 둘러앉아 하던 놀이예요.':'윷과 모가 나오면 한 번 더, 상대 말을 잡아도 한 번 더 던져요. 한 판 더 해 볼까요?',Q,close)},600);return}
  if(!throws.length){if(r==='cap'&&side===turn){pend=0;return}pend=0;turn=1-turn;head();if(turn===1)ai=1.2}};
 const useNet=(m)=>{const k=P[0].indexOf(m);if(opp)NET.send({t:'mv',to:opp,g:gid,k});use(0,m)};
 const G=()=>{const {W,H}=ui.fit();const oy=Math.max(200,H*.28);const S=Math.max(180,Math.min(W*.86,W-120,H-oy-150));return{W,H,S,ox:W/2-S/2-(W<700?30:0),oy}};
 const xy=(n,g)=>{const {S,ox,oy}=g;if(n<20){const side=Math.floor(n/5),k=n%5,t=k/5;/* 0=오른쪽 아래, 반시계: 위로 → 왼쪽 → 아래 → 오른쪽 */const pts=[[1,1],[1,0],[0,0],[0,1]];const a=pts[side],b=pts[(side+1)%4];return[ox+S*(a[0]+(b[0]-a[0])*t),oy+S*(a[1]+(b[1]-a[1])*t)]}
  const D={20:[5/6,1/6],21:[4/6,2/6],22:[.5,.5],23:[2/6,4/6],24:[1/6,5/6],25:[1/6,1/6],26:[2/6,2/6],27:[4/6,4/6],28:[5/6,5/6]}[n];return[ox+S*D[0],oy+S*D[1]]};
 const piecesXY=(g)=>{const L=[];P.forEach((ms,s)=>ms.forEach((m,k)=>{let x,y;if(m.home){x=g.W/2+(s?1:-1)*(g.S/2+30)+(k?14:-14);y=g.oy+g.S+40}else if(m.i<0){x=g.ox+g.S+(s?36:-0)+(k?0:0)+ (s?0:0);[x,y]=[g.ox+g.S+ (s?44:22),g.oy+g.S-20-k*28-(s?0:0)];if(!s)x=g.ox+g.S+22;else x=g.ox+g.S+52}else{[x,y]=xy(posOf(m),g);x+=(s?8:-8);y+=(k?8:-8)}L.push({s,k,m,x,y})}));return L};
 ui.c.addEventListener('pointerdown',e=>{if(ended||turn!==0)return;const R=ui.c.getBoundingClientRect(),mx=e.clientX-R.left,my=e.clientY-R.top,g=G();
  const tb={x:g.W/2-80,y:g.oy+g.S+56,w:160,h:52};if(mx>tb.x&&mx<tb.x+tb.w&&my>tb.y&&my<tb.y+tb.h){doThrow();return}
  if(!throws.length||pend===0)return;const L=piecesXY(g).filter(p=>p.s===0&&!p.m.home);let best=null,bd=40;for(const p of L){const dd=Math.hypot(p.x-mx,p.y-my);if(dd<bd){bd=dd;best=p}}if(best)useNet(best.m)});
 const close=()=>{if(opp&&!ended)NET.send({t:'bye',to:opp,g:gid});alive=false;window.__YUTNET=null;try{off&&off()}catch(e){}ui.o.remove()};ui.x.onclick=close;let last=performance.now();
 /* ---------- 함께 두기: 초대 · 받기 · 수 주고받기 ---------- */
 const reset=()=>{P[0]=[mk(),mk()];P[1]=[mk(),mk()];throws=[];pend=0;ended=false};
 let inv=null;
 const start=(o,n,first)=>{opp=o;oppName=String(n||'친구').replace(/[<>&"]/g,'').slice(0,12);waiting=false;reset();turn=first?0:1;msg=first?'내가 먼저! 윷을 던지세요':oppName+'님이 먼저 던져요';head();if(inv)inv.remove();blip(ac,out,520,880,.25,.18);ctx.say(`${oppName}님과 윷놀이를 시작해요!`)};
 if(NET){window.__YUTNET=true;off=NET.on(p=>{if(!alive)return;
   if(p.t==='acc'&&waiting&&p.g===gid&&!opp){start(p.i,NET.name(p.i),true);NET.send({t:'go',to:p.i,g:gid})}
   else if(p.t==='acc'&&opp&&p.g===gid&&p.i!==opp)NET.send({t:'full',to:p.i,g:gid});
   else if(p.t==='go'&&join&&p.i===join.host&&!opp&&p.g===gid)start(p.i,join.hn||NET.name(p.i),false);
   else if(p.t==='full'&&join&&!opp){msg='벌써 다른 사람이 함께해요. 무이와 둬요';join=null;ctx.say(msg)}
   else if(opp&&p.i===opp&&p.g===gid){if(p.t==='th'&&turn===1&&Number.isInteger(p.v)&&p.v>=0&&p.v<=5)doThrow(p.v);else if(p.t==='mv'&&turn===1&&(p.k===0||p.k===1)&&!P[1][p.k].home)use(1,P[1][p.k]);else if(p.t==='bye'){msg=oppName+'님이 나갔어요. 무이와 이어서 둬요';ctx.say(msg);opp=null;join=null;head();if(turn===1)ai=1}}});
  if(join){gid=join.g;msg=(join.hn||'친구')+'님께 함께하겠다고 알렸어요...';NET.send({t:'acc',to:join.host,g:gid})}
  else{inv=document.createElement('button');inv.type='button';inv.className='btn';inv.textContent='같이 할 사람 부르기 ✋';inv.style.cssText='position:absolute;left:12px;top:calc(env(safe-area-inset-top) + 12px);z-index:3';ui.o.append(inv);inv.onclick=()=>{if(waiting||opp)return;gid=Math.random().toString(36).slice(2,8);waiting=true;NET.send({t:'inv',g:gid});inv.textContent='부르는 중... (무이와 먼저 둬도 돼요)';msg='근처 사람에게 초대를 보냈어요';ctx.say('같은 마당 사람들에게 윷놀이 초대를 보냈어요!')}}}
 const aiTick=dt=>{if(turn!==1||ended||opp||join)return;ai-=dt;if(ai>0)return;ai=.9;if(pend===0){doThrow();return}
  /* 잡을 수 있으면 잡고, 아니면 많이 간 말 */const v=throws[0];let pick=null;for(const m of P[1]){if(m.home)continue;const c={route:m.route.slice(),i:m.i,home:false};const saved=P[0].map(o=>({i:o.i,route:o.route.slice()}));let rr;{let route=c.route,i=c.i;if(i<0){route=OUT.slice();i=0}else{const r=routeFrom(route[i]);if(r){route=r;i=0}}i+=v;rr=i>=route.length?-99:route[i]}if(rr!==-99&&P[0].some(o=>!o.home&&posOf(o)===rr)){pick=m;break}}
  if(!pick)pick=P[1].filter(m=>!m.home).sort((a,b)=>(b.i)-(a.i))[0];use(1,pick)};
 const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;aiTick(dt);anim=Math.max(0,anim-dt*2);const g=G(),{W,H,S,ox,oy}=g,q=ui.q,d=DPR();q.setTransform(d,0,0,d,0,0);q.clearRect(0,0,W,H);
  /* 멍석 판 */q.fillStyle='#d9c08a';q.fillRect(ox-24,oy-24,S+48,S+48);q.strokeStyle='#8a6a3a';q.lineWidth=2;q.strokeRect(ox,oy,S,S);q.beginPath();q.moveTo(ox,oy);q.lineTo(ox+S,oy+S);q.moveTo(ox+S,oy);q.lineTo(ox,oy+S);q.stroke();
  for(let n=0;n<29;n++){const[x,y]=xy(n,g);const big=n%5===0&&n<20||n===22;q.fillStyle=big?'#8e2b20':'#5a3a1a';q.beginPath();q.arc(x,y,big?11:7,0,7);q.fill()}
  q.fillStyle='#5a3a1a';q.font='14px "Gowun Dodum",sans-serif';q.textAlign='center';{const[x,y]=xy(0,g);q.fillText('출발·도착',x,y+28)}
  /* 말 */for(const p of piecesXY(g)){q.fillStyle=p.s?'#f6f1e6':'#2d4f9a';q.strokeStyle=p.s?'#8a7a5a':'#f2d27a';q.lineWidth=3;q.beginPath();q.arc(p.x,p.y,11,0,7);q.fill();q.stroke();if(p.s){q.fillStyle='#222';q.beginPath();q.arc(p.x-3,p.y-2,1.5,0,7);q.arc(p.x+3,p.y-2,1.5,0,7);q.fill()}
   if(p.s===0&&turn===0&&throws.length&&pend>0&&!p.m.home){q.strokeStyle='rgba(242,210,122,'+(.5+.5*Math.sin(now/180))+')';q.lineWidth=3;q.beginPath();q.arc(p.x,p.y,17,0,7);q.stroke()}}
  /* 윷 가락 */const sw=34,sh=10;for(let i=0;i<4;i++){const x=W/2-2*(sw+8)+i*(sw+8)+sw/2,y=oy-48-Math.sin(anim*Math.PI)*30;q.save();q.translate(x,y);q.rotate(anim*6+i);q.fillStyle=sticks[i]?'#f2e2b8':'#8a5a2a';q.fillRect(-sw/2,-sh/2,sw,sh);if(sticks[i]){q.fillStyle='#8a5a2a';q.fillRect(-4,-2,8,4)}q.restore()}
  /* 던지기 단추 */const tb={x:W/2-80,y:oy+S+56,w:160,h:52};q.fillStyle=turn===0&&pend===0&&!ended?'#8e2b20':'#9a8a70';q.beginPath();q.roundRect(tb.x,tb.y,tb.w,tb.h,26);q.fill();q.fillStyle='#fff4dc';q.font='bold 24px "Do Hyeon",sans-serif';q.fillText(turn===0?(pend?'말을 눌러요':'윷 던지기'):OPN()+' 차례',W/2,tb.y+34);
  q.fillStyle='#3b2414';q.font='bold 22px "Do Hyeon",sans-serif';q.fillText(msg+(throws.length?'  (남은 '+throws.map(v=>YUT[v]).join(' ')+')':''),W/2,oy-80);
  requestAnimationFrame(loop)};loop();
 ui.again=()=>{reset();turn=0;msg='윷을 던지세요';head()};
 window.__YUT={P,state:()=>({turn,throws:throws.slice(),pend,ended,opp}),doThrow,use:(k)=>useNet(P[0][k])}}
