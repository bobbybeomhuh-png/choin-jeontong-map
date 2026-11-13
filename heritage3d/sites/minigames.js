import {starOf,starStr} from '../coin.js';
/* 유산 마당 짧은 놀이: 해인사 탁본, 이천 물레, 수원 거중기
   갱신 2026-11-13. 원칙: 실제 몸짓 그대로(문지르기, 위아래로 끌기, 돌리기), 즉각 소리와 가루, 실패는 웃음, 점수 대신 작품 품질.
   ctx = {ac:()=>AudioContext, out:()=>GainNode, done:(key,quality,label)=>void, say:(text)=>void} */
const CSS='position:fixed;inset:0;z-index:30;touch-action:none;user-select:none';
function overlay(bg){const o=document.createElement('div');o.style.cssText=CSS+';background:'+bg;o.dataset.mg='1';const c=document.createElement('canvas');c.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:0';o.append(c);
 const top=document.createElement('div');top.style.cssText='position:absolute;left:50%;top:calc(env(safe-area-inset-top) + 12px);transform:translateX(-50%);text-align:center;color:#f3ead6;font:15px "Gowun Dodum",sans-serif;max-width:min(560px,92vw);pointer-events:none;text-shadow:0 2px 6px rgba(0,0,0,.5);z-index:2';o.append(top);
 const x=document.createElement('button');x.type='button';x.className='btn';x.textContent='닫기';x.style.cssText='position:absolute;right:12px;top:calc(env(safe-area-inset-top) + 12px);z-index:3';o.append(x);document.body.append(o);
 const fit=()=>{const r=o.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1);if(c.width!==Math.round(r.width*d)){c.width=Math.round(r.width*d);c.height=Math.round(r.height*d)}return{W:r.width,H:r.height,d}};
 return{o,c,top,x,fit,q:c.getContext('2d')}}
function title(top,a,b){top.innerHTML='';const t=document.createElement('b');t.style.cssText='display:block;font:26px "Do Hyeon",sans-serif;color:#f2d27a';t.textContent=a;const s=document.createElement('span');s.textContent=b;top.append(t,s)}
function noiseSrc(ac){const n=ac.sampleRate*2|0,b=ac.createBuffer(1,n,ac.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;const s=ac.createBufferSource();s.buffer=b;s.loop=true;return s}
function blip(ac,out,f0,f1,dur,g,type='sine'){if(!ac||!out)return;const t=ac.currentTime,o=ac.createOscillator(),G=ac.createGain();o.type=type;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+dur);G.gain.setValueAtTime(g,t);G.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(G).connect(out);o.start(t);o.stop(t+dur+.03)}
function finishCard(ui,head,body,q,onClose){let BN=null;try{BN=window.__MGB;window.__MGB=null;if(BN&&BN.v){q=Math.min(100,q+BN.v)}}catch(e){}try{if(!document.getElementById('mgPetalCss')){const st=document.createElement('style');st.id='mgPetalCss';st.textContent='@keyframes mgFall{0%{transform:translate(0,-20px) rotate(0)}100%{transform:translate(var(--dx),105vh) rotate(var(--r))}}';document.head.append(st)}const C=['#b8322a','#f2c14e','#2f6a4a','#2d4f9a','#f6ecd6','#d85aa0'],box=document.createElement('div');box.style.cssText='position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:4';for(let i=0;i<(q>=75?42:18);i++){const p=document.createElement('i');const sz=6+Math.random()*8;p.style.cssText=`position:absolute;left:${Math.random()*100}%;top:-20px;width:${sz}px;height:${sz*0.6}px;border-radius:50% 0;background:${C[i%C.length]};--dx:${(Math.random()-.5)*160}px;--r:${(Math.random()-.5)*720}deg;animation:mgFall ${1.6+Math.random()*1.4}s ${Math.random()*.6}s ease-in forwards`;box.append(p)}ui.o.append(box);setTimeout(()=>box.remove(),4000)}catch(e){}const d=document.createElement('div');d.style.cssText='position:absolute;left:50%;bottom:calc(env(safe-area-inset-bottom) + 28px);transform:translateX(-50%);background:#f4ecd8;color:#2b1d12;border:4px double #8e2b20;border-radius:8px;padding:14px 18px;text-align:center;font:15px "Gowun Dodum",sans-serif;min-width:min(340px,90vw);z-index:3';
 const h=document.createElement('b');h.style.cssText='display:block;font:22px "Do Hyeon",sans-serif;color:#8e2b20';h.textContent=head;const p=document.createElement('div');p.textContent=body;const qq=document.createElement('div');qq.style.cssText='margin:6px 0 10px;font:18px "Do Hyeon",sans-serif';{const n=starOf(q);qq.innerHTML=`<span style="color:#c98a12;font-size:30px;letter-spacing:4px">${starStr(n)}</span><br>작품 품질 ${q}%`+(BN&&BN.v?`<br><small style="font:13px 'Gowun Dodum',sans-serif;color:#2f6a4a">${BN.who} 솜씨 +${BN.v} 들어 있어요</small>`:'')+(n<3?`<br><small style="font:13px 'Gowun Dodum',sans-serif;color:#6b4a26">${n<2?'70%면 별 2개':'90%면 별 3개'}, 별 하나에 엽전 10</small>`:'')}
 const b=document.createElement('button');b.type='button';b.className='btn main';b.textContent='마당으로 돌아가기';b.onclick=onClose;const r=document.createElement('button');r.type='button';r.className='btn';r.textContent='한 번 더';r.style.cssText='margin-left:8px;background:#3b2a1c;color:#fff4dc';r.onclick=()=>{d.remove();ui.again&&ui.again()};d.append(h,p,qq,b,r);ui.o.append(d)}

/* ---------- 해인사 경판 탁본: 문지른 곳만 먹빛 글자가 드러난다 ---------- */
export function rubbingGame(ctx){const ui=overlay('radial-gradient(900px 600px at 50% 45%,#3a2a1c,#120c07 75%)');let alive=true,done=false,prog=0,last=null,speed=0;
 const TXT='觀自在菩薩行深般若波羅蜜多時照見五蘊皆空度一切苦厄舍利子色不異空空不異色';
 const ink=document.createElement('canvas'),mask=document.createElement('canvas'),PW=600,PH=420;ink.width=mask.width=PW;ink.height=mask.height=PH;
 {const q=ink.getContext('2d');q.fillStyle='#1a1410';q.fillRect(0,0,PW,PH);for(let i=0;i<2600;i++){q.fillStyle=`rgba(255,255,255,${Math.random()*.06})`;q.fillRect(Math.random()*PW,Math.random()*PH,2,2)}
  q.strokeStyle='rgba(240,230,210,.9)';q.lineWidth=5;q.strokeRect(22,22,PW-44,PH-44);q.lineWidth=2;q.strokeRect(34,34,PW-68,PH-68);
  q.fillStyle='#efe6d2';q.font='bold 40px "Noto Serif KR",serif';q.textAlign='center';q.textBaseline='middle';const cols=8,rows=5;let k=0;for(let cx=0;cx<cols;cx++)for(let ry=0;ry<rows;ry++){const ch=TXT[k++%TXT.length];q.fillText(ch,PW-70-cx*65,72+ry*68)}}
 const mq=mask.getContext('2d');let total=0;{const d=ink.getContext('2d').getImageData(0,0,PW,PH).data;for(let i=0;i<d.length;i+=16)if(d[i]>150)total++}
 const ac=ctx.ac(),out=ctx.out();let ns=null,ng=null;if(ac&&out){ns=noiseSrc(ac);const f=ac.createBiquadFilter();f.type='bandpass';f.frequency.value=2600;f.Q.value=.8;ng=ac.createGain();ng.gain.value=0;ns.connect(f).connect(ng).connect(out);ns.start()}
 const dust=[];
 title(ui.top,'경판 탁본 뜨기','한지 위를 문질러 글자를 드러내요. 고르게 문지를수록 선명해요.');
 const rect=()=>{const {W,H}=ui.fit(),s=Math.min(W*.9/PW,H*.62/PH);return{s,x0:(W-PW*s)/2,y0:H*.2}};
 const rub=(e)=>{if(done)return;const R=ui.c.getBoundingClientRect(),{s,x0,y0}=rect(),px=(e.clientX-R.left-x0)/s,py=(e.clientY-R.top-y0)/s;if(last){const d=Math.hypot(px-last[0],py-last[1]);speed=speed*.6+d*.4;mq.strokeStyle='rgba(255,255,255,.55)';mq.lineCap='round';mq.lineWidth=34;mq.beginPath();mq.moveTo(last[0],last[1]);mq.lineTo(px,py);mq.stroke();if(Math.random()<.5)dust.push({x:e.clientX-R.left,y:e.clientY-R.top,vx:(Math.random()-.5)*60,vy:-Math.random()*40,l:1})}last=[px,py]};
 let down=false;ui.c.addEventListener('pointerdown',e=>{down=true;last=null;ui.c.setPointerCapture(e.pointerId);rub(e)});ui.c.addEventListener('pointermove',e=>{if(down)rub(e)});const up=()=>{down=false;last=null};ui.c.addEventListener('pointerup',up);ui.c.addEventListener('pointercancel',up);
 let tCheck=0,peel=0;
 const measure=()=>{const id=ink.getContext('2d').getImageData(0,0,PW,PH).data,md=mq.getImageData(0,0,PW,PH).data;let got=0;for(let i=0;i<id.length;i+=16)if(id[i]>150&&md[i+3]>120)got++;return got/Math.max(1,total)};
 const close=()=>{alive=false;try{ns&&ns.stop()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 ui.again=()=>{mq.clearRect(0,0,PW,PH);done=false;peel=0;prog=0;title(ui.top,'경판 탁본 뜨기','한 번 더! 이번엔 더 고르게.')};
 const loop=()=>{if(!alive)return;const {W,H,d}=ui.fit(),q=ui.q;q.setTransform(d,0,0,d,0,0);q.clearRect(0,0,W,H);const {s,x0,y0}=rect();
  q.save();q.translate(x0,y0-peel*H*.9);q.scale(s,s);
  q.fillStyle='#e9e1cf';q.fillRect(0,0,PW,PH);q.drawImage(mask,0,0);q.globalCompositeOperation='source-over';
  /* 먹 레이어를 마스크로: 임시 캔버스 대신 패턴 합성 */q.save();q.globalAlpha=1;const tmp=loop.tmp||(loop.tmp=document.createElement('canvas'));tmp.width=PW;tmp.height=PH;const tq=tmp.getContext('2d');tq.clearRect(0,0,PW,PH);tq.drawImage(mask,0,0);tq.globalCompositeOperation='source-in';tq.drawImage(ink,0,0);tq.globalCompositeOperation='source-over';q.drawImage(tmp,0,0);q.restore();
  q.strokeStyle='rgba(120,90,50,.35)';q.lineWidth=3;q.strokeRect(0,0,PW,PH);q.restore();
  for(const p of dust){p.x+=p.vx/60;p.y+=p.vy/60;p.vy+=60/60;p.l-=1/45;q.fillStyle=`rgba(20,14,10,${Math.max(0,p.l)})`;q.fillRect(p.x,p.y,3,3)}for(let i=dust.length-1;i>=0;i--)if(dust[i].l<=0)dust.splice(i,1);
  if(ng){speed*=.9;ng.gain.setTargetAtTime(down?Math.min(.12,speed*.004):0,ac.currentTime,.03)}
  tCheck-=1/60;if(tCheck<=0&&!done){tCheck=.25;prog=measure();ui.top.lastChild.textContent=`선명도 ${Math.round(prog*100)}% · 80%를 넘으면 종이를 떼요`}
  q.fillStyle='rgba(0,0,0,.35)';q.fillRect(W/2-120,H*.88,240,10);q.fillStyle='#f2c14e';q.fillRect(W/2-120,H*.88,240*Math.min(1,prog/.8),10);
  if(!done&&prog>=.8){done=true;blip(ac,out,600,900,.25,.08,'triangle');setTimeout(()=>{const t0=performance.now();const pl=()=>{peel=Math.min(.12,(performance.now()-t0)/3000);if(peel<.12&&alive)requestAnimationFrame(pl)};pl();const Q=Math.min(100,Math.round(prog*100+8));ctx.done('rubbing',Q,'경판 탁본');finishCard(ui,'탁본 완성!','팔만대장경 경판처럼 글자가 또렷이 찍혔어요.',Q,close)},400)}
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}

/* ---------- 이천 물레: 저절로 도는 흙을 위아래로 끌어 모양을 잡는다 ---------- */
export function wheelGame(ctx){const ui=overlay('radial-gradient(900px 600px at 50% 50%,#3d2a1a,#120c07 75%)');let alive=true,done=false,t=0,collapse=0;
 const N=40,prof=new Float32Array(N),target=new Float32Array(N);const reset=()=>{for(let i=0;i<N;i++){const y=i/(N-1);prof[i]=.32+.04*Math.sin(y*3);}collapse=0};reset();
 for(let i=0;i<N;i++){const y=i/(N-1);target[i]=y<.08?.28+y*2:y>.92?.24+(1-y)*1.6:.18+.34*Math.sin(Math.PI*(y*.9+.05))}
 title(ui.top,'물레로 달항아리 빚기','돌아가는 흙의 옆을 손가락으로 밀거나 당겨 점선 모양에 맞춰요. 너무 얇으면 주저앉아요!');
 const ac=ctx.ac(),out=ctx.out();let hum=null,hg=null,sq=null;if(ac&&out){hum=noiseSrc(ac);const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=260;hg=ac.createGain();hg.gain.value=.05;hum.connect(f).connect(hg).connect(out);hum.start();sq=ac.createGain();sq.gain.value=0;const n2=noiseSrc(ac),f2=ac.createBiquadFilter();f2.type='bandpass';f2.frequency.value=700;n2.connect(f2).connect(sq).connect(out);n2.start();ui.n2=n2}
 const geo=()=>{const {W,H}=ui.fit(),h=Math.min(H*.58,W*.8),cx=W/2,y0=H*.8,y1=y0-h,R=h*.62;return{W,H,cx,y0,y1,h,R}};
 let down=false,lastP=null;const pull=e=>{if(done||collapse)return;const r=ui.c.getBoundingClientRect(),{cx,y0,h,R}=geo(),x=e.clientX-r.left,y=e.clientY-r.top;const fy=(y0-y)/h;if(fy<0||fy>1)return;const want=Math.min(.62,Math.max(.02,Math.abs(x-cx)/R));for(let i=0;i<N;i++){const yy=i/(N-1),w=Math.exp(-((yy-fy)**2)/.004);prof[i]+=(want-prof[i])*w*.18}
  if(sq&&lastP)sq.gain.setTargetAtTime(Math.min(.09,Math.hypot(x-lastP[0],y-lastP[1])*.004),ac.currentTime,.03);lastP=[x,y];
  if(Math.min(...prof.slice(4,N-4))<.07&&!collapse){collapse=1;blip(ac,out,300,90,.5,.18);ctx.say('어이쿠, 너무 얇았어요! 다시 빚어요.')}};
 ui.c.addEventListener('pointerdown',e=>{down=true;lastP=null;ui.c.setPointerCapture(e.pointerId);pull(e)});ui.c.addEventListener('pointermove',e=>{if(down)pull(e)});const up=()=>{down=false;if(sq)sq.gain.setTargetAtTime(0,ac.currentTime,.05)};ui.c.addEventListener('pointerup',up);ui.c.addEventListener('pointercancel',up);
 const fire=document.createElement('button');fire.type='button';fire.className='btn main';fire.textContent='가마에 넣기';fire.style.cssText='position:absolute;left:50%;bottom:calc(env(safe-area-inset-bottom) + 24px);transform:translateX(-50%);font:18px "Do Hyeon",sans-serif;z-index:3';ui.o.append(fire);
 const score=()=>{let e=0;for(let i=0;i<N;i++)e+=Math.abs(prof[i]-target[i]);return Math.max(0,Math.min(100,Math.round(100-e/N*420)))};
 fire.onclick=()=>{if(done||collapse)return;done=true;fire.remove();const Q=score();blip(ac,out,200,120,.6,.12);setTimeout(()=>blip(ac,out,1400,1800,.5,.06,'triangle'),700);ctx.done('wheel',Q,'달항아리');finishCard(ui,'달항아리 완성!',Q>=70?'보름달처럼 둥글게 잘 빚었어요.':'조금 삐뚤어도 내 손으로 빚은 항아리예요.',Q,close)};
 const close=()=>{alive=false;try{hum&&hum.stop();ui.n2&&ui.n2.stop()}catch(e){}ui.o.remove()};ui.x.onclick=close;ui.again=()=>{reset();done=false;ui.o.append(fire)};
 const loop=()=>{if(!alive)return;t+=1/60;const {W,H,cx,y0,y1,h,R}=geo(),{d}=ui.fit(),q=ui.q;q.setTransform(d,0,0,d,0,0);q.clearRect(0,0,W,H);
  if(collapse){collapse+=1/40;for(let i=0;i<N;i++)prof[i]+= (.5-prof[i])*.04;if(collapse>2){reset()}}
  /* 물레판 */q.fillStyle='#4a3020';q.beginPath();q.ellipse(cx,y0+8,R*.95,R*.16,0,0,7);q.fill();q.fillStyle='#6a4630';q.beginPath();q.ellipse(cx,y0,R*.9,R*.14,0,0,7);q.fill();
  /* 흙: 단면 곡선을 좌우 대칭으로, 회전 줄무늬 */const sh=collapse?Math.min(1,collapse)*.5:0;q.save();q.beginPath();for(let i=0;i<N;i++){const y=y0-(i/(N-1))*h*(1-sh);q.lineTo(cx-prof[i]*R,y)}for(let i=N-1;i>=0;i--){const y=y0-(i/(N-1))*h*(1-sh);q.lineTo(cx+prof[i]*R,y)}q.closePath();
  const g=q.createLinearGradient(cx-R*.6,0,cx+R*.6,0);g.addColorStop(0,'#5a3a24');g.addColorStop(.35,'#b98a5e');g.addColorStop(.6,'#8d6240');g.addColorStop(1,'#4a2e1c');q.fillStyle=g;q.fill();q.clip();q.strokeStyle='rgba(255,230,200,.12)';q.lineWidth=2;for(let k=0;k<14;k++){const x=cx-R+((k*R*2/14+t*120)%(R*2));q.beginPath();q.moveTo(x,y1-10);q.lineTo(x,y0+10);q.stroke()}q.restore();
  /* 목표 점선 */q.setLineDash([6,6]);q.strokeStyle='rgba(255,240,210,.7)';q.lineWidth=2;for(const sgn of[-1,1]){q.beginPath();for(let i=0;i<N;i++)q.lineTo(cx+sgn*target[i]*R,y0-(i/(N-1))*h);q.stroke()}q.setLineDash([]);
  if(!done)ui.top.lastChild.textContent=`모양 맞춤 ${score()}% · 다 됐으면 가마에 넣기`;
  if(hg)hg.gain.setTargetAtTime(.04+.02*Math.sin(t*6),ac.currentTime,.1);requestAnimationFrame(loop)};requestAnimationFrame(loop)}

/* ---------- 수원 거중기: 손잡이를 돌려 성돌을 올리고, 빈칸 위에서 내려놓는다 ---------- */
export function craneGame(ctx){const ui=overlay('linear-gradient(#bcd6e8,#f2e6cf 70%)');ui.top.style.color='#2b1d12';ui.top.style.textShadow='none';const T=(a,b)=>{title(ui.top,a,b);ui.top.firstChild.style.color='#8e2b20'};let alive=true,stone=0,lift=0,sway=0,swayV=0,phase='lift',carry=0,carryDir=1,placed=[false,false,false],fails=0,ang=null,squeak=0;
 T('거중기로 성돌 올리기','도르래 손잡이를 빙글빙글 돌려 돌을 끝까지 올려요. 너무 빨리 돌리면 흔들려요.');
 const ac=ctx.ac(),out=ctx.out();
 const geo=()=>{const {W,H}=ui.fit(),u=Math.min(W/900,H/600),tb=(ui.top.getBoundingClientRect().bottom||0)+8;return{W,H,u,wx:W*.5,wy:Math.max(H*.3,tb+40*u),base:H*.86}};
 let down=false;const turn=e=>{if(phase!=='lift')return;const r=ui.c.getBoundingClientRect(),{u,wx,wy}=geo(),hx=wx-250*u,hy=wy+170*u,a=Math.atan2(e.clientY-r.top-hy,e.clientX-r.left-hx);if(ang!==null){let da=a-ang;da=Math.atan2(Math.sin(da),Math.cos(da));if(da>0){lift=Math.min(1,lift+da*.035);swayV+=Math.max(0,da-.25)*.8;squeak+=da;if(squeak>.9){squeak=0;blip(ac,out,500+lift*500,420+lift*400,.12,.05,'sawtooth')}}}ang=a};
 ui.c.addEventListener('pointerdown',e=>{down=true;ang=null;ui.c.setPointerCapture(e.pointerId);if(phase==='carry')drop();else turn(e)});ui.c.addEventListener('pointermove',e=>{if(down)turn(e)});const up=()=>{down=false;ang=null};ui.c.addEventListener('pointerup',up);ui.c.addEventListener('pointercancel',up);
 const slotX=i=>(-140+i*140);
 const drop=()=>{const {u}=geo(),i=stone,dx=Math.abs(carry*230-slotX(i));if(dx<34){placed[i]=true;phase='settle';blip(ac,out,140,60,.35,.3);setTimeout(()=>blip(ac,out,1200,1500,.08,.05,'square'),120);ctx.say(['딸깍! 딱 맞았어요.','성벽이 올라가요!','마지막 돌까지!'][i]||'좋아요!');setTimeout(()=>{stone++;lift=0;sway=0;swayV=0;carry=0;if(stone>=3){finish()}else{phase='lift';T(`성돌 ${stone+1} / 3`,'다시 손잡이를 돌려 올려요.')}},700)}else{fails++;phase='lift';lift=.55;blip(ac,out,300,140,.3,.1);ctx.say(fails>=3?'괜찮아요, 금빛 선이 빈칸이에요!':'어이쿠, 비켜 갔어요. 다시!')}};
 const finish=()=>{phase='done';const Q=Math.max(40,100-fails*12);ctx.done('crane',Q,'화성 성돌');finishCard(ui,'성벽 한 칸 완성!','정약용의 거중기는 도르래 여러 개로 무거운 돌을 적은 힘으로 들었어요.',Q,close)};
 const close=()=>{alive=false;ui.o.remove()};ui.x.onclick=close;ui.again=()=>{stone=0;placed=[false,false,false];fails=0;lift=0;phase='lift';T('거중기로 성돌 올리기','한 번 더! 천천히 고르게 돌려요.')};
 const loop=()=>{if(!alive)return;const {W,H,u,wx,wy,base}=geo(),{d}=ui.fit(),q=ui.q;q.setTransform(d,0,0,d,0,0);q.clearRect(0,0,W,H);
  swayV-=sway*.06;swayV*=.94;sway+=swayV*.05;if(Math.abs(sway)>1.1&&phase==='lift'){lift=Math.max(0,lift-.25);sway*=.3;swayV=0;blip(ac,out,260,120,.25,.12);ctx.say('너무 빨라서 돌이 흔들려요. 천천히!')}
  if(phase==='lift'&&lift>=1){phase='carry';T(`성돌 ${stone+1} / 3`,'돌이 옆으로 움직여요. 금빛 빈칸 위에 왔을 때 화면을 눌러 내려놓아요.')}
  if(phase==='carry'){carry+=carryDir*.012*(fails>=3?.6:1);if(Math.abs(carry)>1)carryDir*=-1}
  /* 성벽과 빈칸 */q.fillStyle='#8b8579';q.fillRect(wx-330*u,base-60*u,660*u,60*u);for(let i=0;i<3;i++){const x=wx+slotX(i)*u;if(placed[i]){q.fillStyle='#a49d90';q.fillRect(x-60*u,base-120*u,120*u,60*u);q.strokeStyle='#6d675c';q.strokeRect(x-60*u,base-120*u,120*u,60*u)}else if(i===stone){q.strokeStyle=fails>=3?'#ffcc33':'rgba(242,193,78,.85)';q.lineWidth=fails>=3?5:3;q.setLineDash([8,6]);q.strokeRect(x-60*u,base-120*u,120*u,60*u);q.setLineDash([])}}
  /* 거중기 틀 */q.strokeStyle='#6b4428';q.lineWidth=12*u;q.beginPath();q.moveTo(wx-280*u,base);q.lineTo(wx,wy-40*u);q.lineTo(wx+280*u,base);q.stroke();q.beginPath();q.moveTo(wx-230*u,wy+60*u);q.lineTo(wx+230*u,wy+60*u);q.stroke();
  /* 도르래와 손잡이 */const hx=wx-250*u,hy=wy+170*u;q.fillStyle='#8a5a34';q.beginPath();q.arc(hx,hy,46*u,0,7);q.fill();q.strokeStyle='#3b2a1c';q.lineWidth=4*u;q.stroke();const ha=(lift*40)%(Math.PI*2);q.strokeStyle='#d8a838';q.lineWidth=8*u;q.beginPath();q.moveTo(hx,hy);q.lineTo(hx+Math.cos(ha)*60*u,hy+Math.sin(ha)*60*u);q.stroke();q.fillStyle='#d8a838';q.beginPath();q.arc(hx+Math.cos(ha)*60*u,hy+Math.sin(ha)*60*u,12*u,0,7);q.fill();
  for(const px of[-60,0,60]){q.fillStyle='#5a3a24';q.beginPath();q.arc(wx+px*u,wy-20*u,14*u,0,7);q.fill()}
  /* 줄과 돌 */if(phase!=='done'&&stone<3){const sx=wx+(phase==='carry'?carry*230*u:0)+sway*30*u,sy=base-120*u-(phase==='carry'?1:lift)*(base-120*u-(wy+90*u));q.strokeStyle='#4a3a28';q.lineWidth=3*u;q.beginPath();q.moveTo(wx+(phase==='carry'?carry*230*u:0),wy-20*u);q.lineTo(sx,sy-30*u);q.stroke();q.fillStyle='#a49d90';q.fillRect(sx-58*u,sy-30*u,116*u,58*u);q.strokeStyle='#6d675c';q.lineWidth=2;q.strokeRect(sx-58*u,sy-30*u,116*u,58*u)}
  if(phase==='lift'){q.fillStyle='rgba(0,0,0,.3)';q.fillRect(W/2-120,H*.93,240,10);q.fillStyle='#f2c14e';q.fillRect(W/2-120,H*.93,240*lift,10)}
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}

function softOut(ctx,k=.45){const o=ctx.out(),a=ctx.ac();if(!o||!a)return o;const g=a.createGain();g.gain.value=k;g.connect(o);return g}
export {overlay,title,noiseSrc,blip,finishCard,softOut};
