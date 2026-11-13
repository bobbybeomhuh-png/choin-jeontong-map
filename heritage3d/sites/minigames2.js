/* 유산 마당 짧은 놀이 2: 문경 가마 불 때기, 나주 금동관 붓질, 강진 상감 새기기, 강릉 대나무 치기
   갱신 2026-11-13. 원칙은 1편과 같음: 동작 하나, 즉각 소리, 실패는 웃음, 점수 대신 작품 품질. */
import {overlay,title,noiseSrc,blip,finishCard,softOut} from './minigames.js';

/* ---------- 문경 망댕이가마 불 때기: 장작을 넣어 불 온도를 금빛 띠 안에 지킨다 ---------- */
export function kilnGame(ctx){const ui=overlay('radial-gradient(900px 600px at 50% 70%,#2a1408,#0b0603 75%)');let alive=true,T=300,push=0,t=0,inBand=0,crack=0,hot=0,ended=false;
 const DUR=24,STG=[[0,900,'예열'],[7,1100,'본불'],[15,1250,'막불']];const band=()=>{let c=STG[0];for(const s of STG)if(t>=s[0])c=s;return c};
 const ac=ctx.ac(),out=softOut(ctx);let ns=null,ng=null;if(ac&&out){ns=noiseSrc(ac);const f=ac.createBiquadFilter();f.type='highpass';f.frequency.value=900;ng=ac.createGain();ng.gain.value=0;ns.connect(f).connect(ng).connect(out);ns.start()}
 title(ui.top,'가마 불 때기','화면을 눌러 장작을 넣어요. 불 온도를 금빛 띠 안에 지켜요.');
 const sparks=[];const feed=()=>{if(ended)return;push+=1;blip(ac,out,180,70,.25,.25,'triangle');const {W,H}=ui.fit();for(let i=0;i<14;i++)sparks.push({x:W/2+(Math.random()-.5)*60,y:H*.72,vx:(Math.random()-.5)*120,vy:-80-Math.random()*160,l:1})};
 ui.c.addEventListener('pointerdown',feed);const kd=e=>{if(e.code==='Space'){e.preventDefault();feed()}};addEventListener('keydown',kd);
 const close=()=>{alive=false;removeEventListener('keydown',kd);try{ns&&ns.stop()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 ui.again=()=>{T=300;push=0;t=0;inBand=0;crack=0;hot=0;ended=false;title(ui.top,'가마 불 때기','한 번 더! 띠가 올라갈 때 미리 장작을 넣어요.')};
 let last=performance.now();
 const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const {W,H,d}=ui.fit(),q=ui.q;q.setTransform(d,0,0,d,0,0);q.clearRect(0,0,W,H);
  if(!ended){t+=dt;const add=Math.min(push,dt*3);push-=add;T+=add*120-.09*(T-300)*dt;const [,c]=band();if(Math.abs(T-c)<=90)inBand+=dt;window.__KILN={T,t,inBand};
   if(T>1380){hot+=dt;if(hot>1.2&&!crack){crack=1;blip(ac,out,900,120,.5,.3,'sawtooth');ctx.say('와장창! 너무 뜨거워 사발 하나가 갈라졌어요. 살살!')}}else hot=Math.max(0,hot-dt);
   if(t>=DUR){ended=true;const Q=Math.max(10,Math.round(inBand/DUR*100-crack*15));ctx.done('kiln',Q,'망댕이가마 사발');blip(ac,out,660,990,.4,.25);finishCard(ui,Q>=70?'사발이 잘 구워졌어요!':'사발이 나왔어요',Q>=70?'불 온도를 잘 지켜 고운 빛이 났어요.':'불이 들쭉날쭉해 얼룩이 생겼어요. 한 번 더 해 볼까요?',Q,close)}}
  if(ng)ng.gain.setTargetAtTime(Math.min(.22,Math.max(0,(T-300)/1100*.22)),ac.currentTime,.1);
  /* 가마 */const cx=W/2,base=H*.82,kw=Math.min(W*.8,520),kh=Math.min(H*.42,300);const heat=Math.min(1,Math.max(0,(T-300)/1000));
  q.fillStyle='#4a3424';q.beginPath();q.moveTo(cx-kw/2,base);q.quadraticCurveTo(cx,base-kh*1.6,cx+kw/2,base);q.closePath();q.fill();q.strokeStyle='#2a1c12';q.lineWidth=4;q.stroke();
  for(let i=1;i<5;i++){q.strokeStyle='rgba(30,20,12,.5)';q.lineWidth=2;q.beginPath();const k=i/5;q.moveTo(cx-kw/2*k,base);q.quadraticCurveTo(cx,base-kh*1.6*k,cx+kw/2*k,base);q.stroke()}
  const mw=kw*.26,mh=kh*.42;const g=q.createRadialGradient(cx,base-mh*.4,4,cx,base-mh*.4,mw);g.addColorStop(0,`rgba(255,${220-heat*60|0},${120-heat*90|0},1)`);g.addColorStop(.5,`rgba(255,${120+heat*40|0},30,${.6+heat*.4})`);g.addColorStop(1,'rgba(40,10,0,1)');
  q.fillStyle=g;q.beginPath();q.moveTo(cx-mw/2,base);q.quadraticCurveTo(cx,base-mh*1.6,cx+mw/2,base);q.closePath();q.fill();
  for(let i=0;i<6;i++){const fx=cx+(i-2.5)*mw*.14,fl=mh*(.4+heat*.9)*(.7+.3*Math.sin(now*.012+i*1.7));q.fillStyle=`rgba(255,${180+i*10},60,${.35+heat*.4})`;q.beginPath();q.moveTo(fx-8,base);q.quadraticCurveTo(fx,base-fl,fx+8,base);q.fill()}
  for(const p of sparks){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=60*dt;p.l-=dt*1.2;q.fillStyle=`rgba(255,200,90,${Math.max(0,p.l)})`;q.fillRect(p.x,p.y,3,3)}for(let i=sparks.length-1;i>=0;i--)if(sparks[i].l<=0)sparks.splice(i,1);
  if(crack){q.strokeStyle='#1b120b';q.lineWidth=3;q.beginPath();q.moveTo(cx+kw*.18,base-kh*.6);q.lineTo(cx+kw*.12,base-kh*.4);q.lineTo(cx+kw*.2,base-kh*.25);q.stroke()}
  /* 온도계 */const gx=W-58,gy=H*.2,gh=H*.6,y=v=>gy+gh*(1-(v-200)/1300);q.fillStyle='rgba(0,0,0,.45)';q.fillRect(gx,gy,26,gh);const [,c,nm]=band();q.fillStyle='rgba(242,193,78,.55)';q.fillRect(gx-6,y(c+90),38,y(c-90)-y(c+90));
  q.fillStyle=T>1380?'#ff5a3a':'#ffd27a';const ty=y(Math.min(1500,T));q.fillRect(gx+4,ty,18,gy+gh-ty);q.fillStyle='#f3ead6';q.font='14px "Gowun Dodum",sans-serif';q.textAlign='right';q.fillText(`${Math.round(T)}℃`,gx-10,ty+5);q.textAlign='center';q.fillStyle='#f2c14e';q.font='16px "Do Hyeon",sans-serif';q.fillText(`${nm} ${c}℃`,gx+13,gy-12);
  q.textAlign='center';q.fillStyle='rgba(0,0,0,.35)';q.fillRect(W/2-120,H*.93,240,8);q.fillStyle='#f2c14e';q.fillRect(W/2-120,H*.93,240*Math.min(1,t/DUR),8);
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}

/* ---------- 흙 털기(나주 금동관): 붓으로 흙을 살살 털어 유물을 드러낸다. 세게 문지르면 긁힘 ---------- */
export function brushGame(ctx){const ui=overlay('radial-gradient(900px 600px at 50% 45%,#3a2c1e,#120c07 75%)');let alive=true,done=false,last=null,scratch=0,warnT=0;
 const PW=600,PH=420,art=document.createElement('canvas'),soil=document.createElement('canvas');art.width=soil.width=PW;art.height=soil.height=PH;
 {const q=art.getContext('2d');q.fillStyle='#5b4632';q.fillRect(0,0,PW,PH);const gold=q.createLinearGradient(0,120,0,380);gold.addColorStop(0,'#f5d77a');gold.addColorStop(1,'#a87b24');q.fillStyle=gold;q.strokeStyle='#6b4a14';q.lineWidth=3;
  q.fillRect(130,300,340,46);q.strokeRect(130,300,340,46);for(let i=0;i<9;i++){q.beginPath();q.arc(150+i*38,323,6,0,7);q.fillStyle='#7ec4b0';q.fill()}
  q.fillStyle=gold;const tree=(x,h)=>{q.beginPath();q.moveTo(x-10,300);q.lineTo(x-10,300-h);q.lineTo(x+10,300-h);q.lineTo(x+10,300);q.fill();q.stroke();for(let k=1;k<4;k++){const yy=300-h*k/4;q.beginPath();q.moveTo(x-10,yy);q.lineTo(x-34,yy-30);q.lineTo(x-26,yy-36);q.lineTo(x-10,yy-14);q.fill();q.stroke();q.beginPath();q.moveTo(x+10,yy);q.lineTo(x+34,yy-30);q.lineTo(x+26,yy-36);q.lineTo(x+10,yy-14);q.fill();q.stroke()}q.beginPath();q.arc(x,300-h-10,13,0,7);q.fill();q.stroke()};
  tree(300,190);tree(200,150);tree(400,150);for(let i=0;i<30;i++){q.fillStyle='#7ec4b0';q.beginPath();q.arc(160+Math.random()*280,140+Math.random()*150,3,0,7);q.fill()}}
 const sq=soil.getContext('2d');const fillSoil=()=>{sq.globalCompositeOperation='source-over';sq.fillStyle='#8a6a48';sq.fillRect(0,0,PW,PH);for(let i=0;i<5000;i++){sq.fillStyle=`rgba(${60+Math.random()*80|0},${40+Math.random()*50|0},${20+Math.random()*30|0},.6)`;sq.fillRect(Math.random()*PW,Math.random()*PH,2+Math.random()*3,2+Math.random()*3)}};fillSoil();
 let total=PW*PH/16;const ac=ctx.ac(),out=softOut(ctx);let ns=null,ng=null;if(ac&&out){ns=noiseSrc(ac);const f=ac.createBiquadFilter();f.type='bandpass';f.frequency.value=4200;f.Q.value=.7;ng=ac.createGain();ng.gain.value=0;ns.connect(f).connect(ng).connect(out);ns.start()}
 title(ui.top,'흙 털어 유물 꺼내기','붓으로 살살 문질러 흙을 털어요. 너무 빠르면 유물이 긁혀요.');
 const dust=[];const rect=()=>{const {W,H}=ui.fit(),s=Math.min(W*.9/PW,H*.62/PH);return{s,x0:(W-PW*s)/2,y0:H*.2}};let speed=0;
 const rub=e=>{if(done)return;const R=ui.c.getBoundingClientRect(),{s,x0,y0}=rect(),px=(e.clientX-R.left-x0)/s,py=(e.clientY-R.top-y0)/s;if(last){const dd=Math.hypot(px-last[0],py-last[1]);speed=speed*.7+dd*.3;sq.globalCompositeOperation='destination-out';sq.strokeStyle=`rgba(0,0,0,${speed>45?.85:.6})`;sq.lineCap='round';sq.lineWidth=30;sq.beginPath();sq.moveTo(last[0],last[1]);sq.lineTo(px,py);sq.stroke();
   if(speed>45){scratch+=.4;if(performance.now()-warnT>2500){warnT=performance.now();ctx.say('앗, 살살요! 금동관이 긁혀요.');blip(ac,out,1400,700,.12,.12,'square')}}
   if(Math.random()<.6)dust.push({x:e.clientX-R.left,y:e.clientY-R.top,vx:(Math.random()-.5)*90,vy:-Math.random()*60,l:1})}last=[px,py]};
 let down=false;ui.c.addEventListener('pointerdown',e=>{down=true;last=null;ui.c.setPointerCapture(e.pointerId);rub(e)});ui.c.addEventListener('pointermove',e=>{if(down)rub(e)});const up=()=>{down=false;last=null};ui.c.addEventListener('pointerup',up);ui.c.addEventListener('pointercancel',up);
 const CROWN=[];{const d=art.getContext('2d').getImageData(0,0,PW,PH).data;for(let i=0;i<d.length;i+=64)if(d[i]>140&&d[i+1]>100)CROWN.push(i)}
 const measure=()=>{const d=sq.getImageData(0,0,PW,PH).data;let clear=0;for(const i of CROWN)if(d[i+3]<70)clear++;return clear/Math.max(1,CROWN.length)};
 const close=()=>{alive=false;try{ns&&ns.stop()}catch(e){}ui.o.remove()};ui.x.onclick=close;ui.again=()=>{fillSoil();done=false;scratch=0;title(ui.top,'흙 털어 유물 꺼내기','한 번 더! 천천히 고르게.')};
 let tc=0,prog=0;const loop=()=>{if(!alive)return;const {W,H,d}=ui.fit(),q=ui.q;q.setTransform(d,0,0,d,0,0);q.clearRect(0,0,W,H);const {s,x0,y0}=rect();
  if(ng)ng.gain.setTargetAtTime(down&&!done?Math.min(.2,speed/120):0,ac.currentTime,.05);
  q.save();q.translate(x0,y0);q.scale(s,s);q.drawImage(art,0,0);q.drawImage(soil,0,0);if(scratch>0){q.strokeStyle=`rgba(40,25,10,${Math.min(.6,scratch/40)})`;q.lineWidth=1;for(let i=0;i<Math.min(30,scratch|0);i++){const a=i*2.39;q.beginPath();q.moveTo(300+Math.cos(a)*90,230+Math.sin(a)*60);q.lineTo(300+Math.cos(a)*90+18,230+Math.sin(a)*60+6);q.stroke()}}q.strokeStyle='rgba(20,12,6,.6)';q.lineWidth=4;q.strokeRect(0,0,PW,PH);q.restore();
  for(const p of dust){p.x+=p.vx/60;p.y+=p.vy/60;p.vy+=2;p.l-=1/40;q.fillStyle=`rgba(150,115,80,${Math.max(0,p.l)})`;q.fillRect(p.x,p.y,3,3)}for(let i=dust.length-1;i>=0;i--)if(dust[i].l<=0)dust.splice(i,1);
  if(!done&&++tc%20===0){prog=measure();if(prog>.82){done=true;const Q=Math.max(10,Math.min(100,Math.round(100-scratch*1.2)));ctx.done('brush',Q,'반남 금동관');blip(ac,out,520,1040,.5,.25);finishCard(ui,'금동관이 나왔어요!',Q>=80?'긁힘 하나 없이 깨끗하게 꺼냈어요.':'조금 긁혔지만 무사히 꺼냈어요. 복원 무이가 다듬어 줄 거예요.',Q,close)}}
  q.fillStyle='rgba(0,0,0,.35)';q.fillRect(W/2-120,H*.88,240,8);q.fillStyle='#f2c14e';q.fillRect(W/2-120,H*.88,240*Math.min(1,prog/.82),8);
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}

/* ---------- 따라 긋기: 점선을 따라 한 획씩. 강진 상감 학 무늬, 강릉 오죽 ---------- */
export function traceGame(ctx,o){const ui=overlay(o.bg);let alive=true,si=0,cur=[],acc=[],down=false,done=false;const PW=600,PH=420;
 const paper=document.createElement('canvas');paper.width=PW;paper.height=PH;const pq=paper.getContext('2d');const resetPaper=()=>{pq.clearRect(0,0,PW,PH);o.drawBase(pq,PW,PH)};resetPaper();
 const ac=ctx.ac(),out=softOut(ctx);let ns=null,ng=null;if(ac&&out){ns=noiseSrc(ac);const f=ac.createBiquadFilter();f.type='bandpass';f.frequency.value=o.sfxF||1800;f.Q.value=1;ng=ac.createGain();ng.gain.value=0;ns.connect(f).connect(ng).connect(out);ns.start()}
 title(ui.top,o.title,o.sub);const S=o.strokes;
 const rect=()=>{const {W,H}=ui.fit(),s=Math.min(W*.92/PW,H*.64/PH);return{s,x0:(W-PW*s)/2,y0:H*.19}};
 const toP=e=>{const R=ui.c.getBoundingClientRect(),{s,x0,y0}=rect();return[(e.clientX-R.left-x0)/s,(e.clientY-R.top-y0)/s]};
 const near=(p,path)=>{let m=1e9;for(let i=0;i<path.length-1;i++){const [ax,ay]=path[i],[bx,by]=path[i+1],dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy||1;let k=((p[0]-ax)*dx+(p[1]-ay)*dy)/l;k=Math.max(0,Math.min(1,k));m=Math.min(m,Math.hypot(p[0]-ax-k*dx,p[1]-ay-k*dy))}return m};
 const TOL=()=>{const {s}=rect();return Math.max(26,34/s)};const cover=(pts,path)=>{const R=TOL();let n=0;for(const q of path){if(pts.some(p=>Math.hypot(p[0]-q[0],p[1]-q[1])<R))n++}return n/path.length};
 const dens=path=>{const r=[];for(let i=0;i<path.length-1;i++){const [ax,ay]=path[i],[bx,by]=path[i+1],n=Math.max(1,Math.ceil(Math.hypot(bx-ax,by-ay)/10));for(let k=0;k<n;k++)r.push([ax+(bx-ax)*k/n,ay+(by-ay)*k/n])}r.push(path[path.length-1]);return r};const SD=S.map(dens);
 ui.c.addEventListener('pointerdown',e=>{if(done)return;down=true;cur=[toP(e)];ui.c.setPointerCapture(e.pointerId)});
 ui.c.addEventListener('pointermove',e=>{if(!down||done)return;const p=toP(e),l=cur[cur.length-1];if(Math.hypot(p[0]-l[0],p[1]-l[1])>2){cur.push(p);if(ng)ng.gain.setTargetAtTime(.12,ac.currentTime,.03)}});
 const up=()=>{if(!down)return;down=false;if(ng)ng.gain.setTargetAtTime(0,ac.currentTime,.05);if(cur.length<4)return;const cv=cover(cur,SD[si]),dev=cur.reduce((a,p)=>a+near(p,SD[si]),0)/cur.length;
  if(cv>.6){const sc=Math.max(0,Math.min(1,cv*1.1-dev/(60*TOL()/26)));acc.push(sc);o.commit(pq,cur,si);si++;blip(ac,out,500+si*80,900+si*80,.18,.2);if(si<S.length)ctx.say(o.praise[si%o.praise.length]);
   if(si>=S.length){done=true;const Q=Math.max(10,Math.round(acc.reduce((a,b)=>a+b,0)/acc.length*100));o.finish&&o.finish(pq,PW,PH);ctx.done(o.key,Q,o.label);blip(ac,out,660,1320,.5,.25);finishCard(ui,o.doneHead,Q>=75?o.goodBody:o.okBody,Q,close)}}
  else{ctx.say(o.miss);blip(ac,out,300,200,.15,.12,'triangle')}cur=[]};
 ui.c.addEventListener('pointerup',up);ui.c.addEventListener('pointercancel',up);
 const close=()=>{alive=false;try{ns&&ns.stop()}catch(e){}ui.o.remove()};ui.x.onclick=close;ui.again=()=>{si=0;acc=[];done=false;resetPaper();title(ui.top,o.title,'한 번 더! 천천히 선을 따라요.')};
 const loop=()=>{if(!alive)return;const {W,H,d}=ui.fit(),q=ui.q;q.setTransform(d,0,0,d,0,0);q.clearRect(0,0,W,H);const {s,x0,y0}=rect();q.save();q.translate(x0,y0);q.scale(s,s);q.drawImage(paper,0,0);
  if(!done&&S[si]){q.setLineDash([8,10]);q.lineDashOffset=-performance.now()/40;q.strokeStyle=o.guide||'rgba(255,240,200,.85)';q.lineWidth=4;q.lineCap='round';q.beginPath();S[si].forEach((p,i)=>i?q.lineTo(p[0],p[1]):q.moveTo(p[0],p[1]));q.stroke();q.setLineDash([]);const [sx,sy]=S[si][0];q.fillStyle='#f2c14e';q.beginPath();q.arc(sx,sy,9+2*Math.sin(performance.now()/150),0,7);q.fill()}
  if(cur.length>1){q.strokeStyle=o.ink||'#1a1410';q.lineWidth=o.width||8;q.lineCap='round';q.lineJoin='round';q.beginPath();cur.forEach((p,i)=>i?q.lineTo(p[0],p[1]):q.moveTo(p[0],p[1]));q.stroke()}
  q.restore();q.fillStyle='#f3ead6';q.font='15px "Gowun Dodum",sans-serif';q.textAlign='center';q.fillText(done?'':`${si+1} / ${S.length} 획`,W/2,H*.9);
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}

/* 강진 상감: 학과 구름을 새기면 흰 흙이 메워지고 청자 유약이 덮인다 */
const crane=[[[170,250],[230,215],[300,205],[360,215],[410,240]],[[300,205],[260,150],[200,110],[140,95]],[[300,205],[340,150],[400,110],[460,95]],[[410,240],[450,228],[480,214]],[[250,240],[230,300]],[[280,240],[275,305]],[[90,330],[120,310],[160,318],[190,300],[230,312]]];
export function inlayGame(ctx){traceGame(ctx,{key:'inlay',label:'상감청자 학 무늬',title:'상감 무늬 새기기',sub:'점선을 따라 그어 학과 구름을 새겨요. 새긴 자리에 흰 흙이 들어가요.',bg:'radial-gradient(900px 600px at 50% 45%,#22382f,#0b1410 75%)',sfxF:3200,ink:'#3a2a20',width:6,guide:'rgba(255,250,235,.9)',strokes:crane,
 drawBase:(q,W,H)=>{const g=q.createRadialGradient(W/2,H/2,40,W/2,H/2,W*.6);g.addColorStop(0,'#8fb5a0');g.addColorStop(1,'#56806c');q.fillStyle=g;q.fillRect(0,0,W,H);q.strokeStyle='rgba(30,50,40,.4)';q.lineWidth=3;q.strokeRect(10,10,W-20,H-20)},
 commit:(q,pts)=>{q.strokeStyle='#f4f1e6';q.lineWidth=7;q.lineCap='round';q.lineJoin='round';q.beginPath();pts.forEach((p,i)=>i?q.lineTo(p[0],p[1]):q.moveTo(p[0],p[1]));q.stroke();q.strokeStyle='rgba(40,30,20,.5)';q.lineWidth=1.5;q.stroke()},
 finish:(q,W,H)=>{q.save();q.fillStyle='#f4f1e6';q.strokeStyle='rgba(40,30,20,.55)';q.lineWidth=1.5;
  q.beginPath();q.moveTo(300,205);q.lineTo(140,95);q.lineTo(175,140);q.lineTo(210,150);q.lineTo(250,190);q.closePath();q.fill();q.stroke();
  q.beginPath();q.moveTo(300,205);q.lineTo(460,95);q.lineTo(430,140);q.lineTo(395,150);q.lineTo(350,190);q.closePath();q.fill();q.stroke();
  q.strokeStyle='rgba(40,30,20,.4)';for(let i=0;i<5;i++){q.beginPath();q.moveTo(160+i*22,108+i*15);q.lineTo(170+i*22,130+i*15);q.stroke();q.beginPath();q.moveTo(440-i*22,108+i*15);q.lineTo(430-i*22,130+i*15);q.stroke()}
  q.fillStyle='#f4f1e6';q.beginPath();q.ellipse(290,225,60,20,-.08,0,7);q.fill();q.strokeStyle='rgba(40,30,20,.55)';q.stroke();
  q.fillStyle='#1d1a16';q.beginPath();q.ellipse(232,238,16,8,.3,0,7);q.fill();
  q.fillStyle='#f4f1e6';q.beginPath();q.arc(480,212,9,0,7);q.fill();q.stroke();q.fillStyle='#b8322a';q.beginPath();q.arc(482,205,4,0,7);q.fill();
  q.strokeStyle='#3a2a20';q.lineWidth=3;q.beginPath();q.moveTo(488,214);q.lineTo(512,222);q.stroke();
  q.fillStyle='rgba(120,170,150,.22)';q.fillRect(0,0,W,H);q.restore()},
 praise:['좋아요, 날개가 생겼어요!','곱게 새겨지고 있어요.','학이 날아오를 것 같아요!'],miss:'선에서 조금 벗어났어요. 노란 점에서 시작해 보세요.',
 doneHead:'운학무늬 청자 완성!',goodBody:'흰 흙이 메워지고 유약을 입으니 비색 위로 학이 날아요.',okBody:'학이 조금 삐뚤지만 나름 멋져요. 한 번 더 해 볼까요?'})}

/* 강릉 오죽: 줄기 마디와 잎을 붓으로 친다 */
const bamboo=[[[300,390],[300,300]],[[300,295],[302,205]],[[302,200],[304,110]],[[304,105],[305,40]],[[302,205],[360,170],[420,160]],[[302,210],[350,230],[400,250]],[[304,110],[250,80],[200,72]],[[304,115],[245,140],[195,155]]];
export function bambooGame(ctx){traceGame(ctx,{key:'bamboo',label:'오죽 묵죽',title:'오죽 대나무 치기',sub:'노란 점에서 시작해 점선을 따라 한 번에 그어요. 마디부터 잎까지.',bg:'radial-gradient(900px 600px at 50% 45%,#3a3226,#100c08 75%)',sfxF:1200,ink:'#141010',width:10,guide:'rgba(120,90,60,.85)',strokes:bamboo,
 drawBase:(q,W,H)=>{q.fillStyle='#efe6d2';q.fillRect(0,0,W,H);for(let i=0;i<1600;i++){q.fillStyle=`rgba(120,100,70,${Math.random()*.06})`;q.fillRect(Math.random()*W,Math.random()*H,2,2)}},
 commit:(q,pts,i)=>{const leaf=i>=4;q.strokeStyle='#161212';q.lineCap='round';q.lineJoin='round';if(leaf){for(let k=1;k<pts.length;k++){const t=k/pts.length;q.lineWidth=2+16*Math.sin(Math.PI*t);q.beginPath();q.moveTo(pts[k-1][0],pts[k-1][1]);q.lineTo(pts[k][0],pts[k][1]);q.stroke()}}else{q.lineWidth=14;q.beginPath();pts.forEach((p,j)=>j?q.lineTo(p[0],p[1]):q.moveTo(p[0],p[1]));q.stroke();const e=pts[pts.length-1];q.lineWidth=4;q.beginPath();q.moveTo(e[0]-11,e[1]);q.lineTo(e[0]+11,e[1]);q.stroke()}},
 finish:(q,W,H)=>{q.save();q.translate(W-80,H-90);q.strokeStyle='#b8322a';q.fillStyle='#b8322a';q.lineWidth=3;q.strokeRect(0,0,46,46);q.font='bold 20px "Noto Serif KR",serif';q.textAlign='center';q.fillText('무이',23,30);q.restore()},
 praise:['마디가 곧게 섰어요.','붓끝이 살아 있어요!','잎이 바람에 흔들려요.'],miss:'붓이 길을 잃었어요. 노란 점에서 다시!',
 doneHead:'묵죽 한 폭 완성!',goodBody:'곧은 줄기와 날랜 잎, 오죽헌 뜰의 검은 대나무 같아요.',okBody:'조금 흔들렸지만 대나무다워요. 한 번 더 그려 볼까요?'})}
