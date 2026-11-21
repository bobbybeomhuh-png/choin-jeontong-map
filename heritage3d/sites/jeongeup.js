/* 정읍 무성서원·내장산 마당(2026-11-21, W26): 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   무성서원(사적, 세계유산 「한국의 서원」 2019): 신라 최치원이 태산(정읍) 태수로 있을 때를 기려 세운 서원. 흥선대원군 서원 철폐 때도 살아남은 47곳 가운데 하나. 문루 현가루, 강당, 사당 태산사.
   내장산: 단풍으로 이름난 산, 내장사 앞 연못의 정자 우화정. 정읍사: 백제 노래 「달하 노피곰 도다샤」, 장사 나간 남편을 기다리던 아내의 노래(망부석).
   놀이: 단풍잎 받기(빨간 단풍잎만 바구니로 받기), 발굴 탐지, 밤 등(밤엔 정읍사 달). */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildJeongeup(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(6113);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 동쪽(x>30) 내장산 자락 오르막 */const ss=t=>t<=0?0:t>=1?1:t*t*(3-2*t);const H0=(x,z)=>9*ss((x-30)/50);const H=(x,z)=>{const d=Math.hypot(x-52,z-30);if(d<20){const t=ss((d-13)/7);return H0(52,30)*(1-t)+H0(x,z)*t}return H0(x,z)};
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(240,220,120,110);g.rotateX(-Math.PI/2);g.translate(10,0,0);const p=g.attributes.position;const col=[];const c=new THREE.Color();
  for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);p.setY(k,H(x,z));c.set(x>30?'#9a6e3a':'#8a9a4a');col.push(c.r,c.g,c.b)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1}));m.receiveShadow=true;G.add(m)}
 /* 무성서원(서쪽): 현가루(문루) → 강당 → 태산사, 둘레 담 */
 const SX=-34,SZ=0;if(!mini){const B=spec=>{const h=buildHall(Object.assign({solids,light:false},spec));G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)});return h};
  B({x:SX,z:SZ+14,ry:Math.PI,W:7,D:4,nx:3,nz:1,FY:1.6,PH:2.4,roof:'gable',name:'絃歌樓',pillar:0x8a6a48,bracket:'ik',front:'open',back:'open',left:'open',right:'open',stairs:'none',rail:true,roofScale:.85});
  B({x:SX,z:SZ,ry:Math.PI,W:11,D:6,nx:4,nz:2,FY:.7,PH:3,roof:'gable',name:'武城書院',pillar:0x8a6a48,bracket:'ik',front:'open',roofScale:.9});
  B({x:SX,z:SZ-14,ry:Math.PI,W:7,D:5,nx:3,nz:1,FY:.9,PH:2.8,roof:'gable',name:'泰山祠',pillar:0x8a6a48,bracket:'ik',roofScale:.85});
  const wm=M(0xc8bca8),cap=M(0x50545c);const wall=(x0,z0,x1,z1)=>{const L=Math.hypot(x1-x0,z1-z0);const w=new THREE.Mesh(new THREE.BoxGeometry(L,1.8,.5),wm);w.position.set((x0+x1)/2,.9,(z0+z1)/2);w.rotation.y=-Math.atan2(z1-z0,x1-x0);G.add(w);const c=new THREE.Mesh(new THREE.BoxGeometry(L+.3,.25,.9),cap);c.position.copy(w.position);c.position.y=1.9;c.rotation.y=w.rotation.y;G.add(c);solids.push({x0:Math.min(x0,x1)-.3,x1:Math.max(x0,x1)+.3,y0:0,y1:2,z0:Math.min(z0,z1)-.3,z1:Math.max(z0,z1)+.3})};
  wall(SX-12,SZ-20,SX+12,SZ-20);wall(SX-12,SZ-20,SX-12,SZ+15);wall(SX+12,SZ-20,SX+12,SZ+15);wall(SX-12,SZ+15,SX-4,SZ+15);wall(SX+4,SZ+15,SX+12,SZ+15)}
 /* 내장산 단풍 숲(동쪽 비탈) + 우화정 연못 */const leafCols=[0xd8341a,0xe8641a,0xf0a020,0xc8281a,0xb83020];
 {const tm=M(0x4a3426);for(let i=0;i<90;i++){const x=34+r()*70,z=-90+r()*180;if(Math.hypot(x-52,z-30)<14)continue;const y=H(x,z);const t=new THREE.Mesh(new THREE.CylinderGeometry(.18,.28,3.6,6),tm);t.position.set(x,y+1.8,z);G.add(t);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(2+r()*.8,1),M(leafCols[(r()*leafCols.length)|0],{roughness:.8,flatShading:true}));c.position.set(x,y+4.4,z);c.scale.y=.75;c.castShadow=true;G.add(c);solids.push({cx:x,cz:z,r:.35,y0:0,y1:y+5})}}
 const PX=52,PZ=30;{const y=H(PX,PZ);const pond=new THREE.Mesh(new THREE.CircleGeometry(11,32),M(0x3a6a70,{roughness:.1,metalness:.2}));pond.rotation.x=-Math.PI/2;pond.position.set(PX,y+.05,PZ);G.add(pond);solids.push({cx:PX,cz:PZ,r:10.5,y0:-2,y1:y+4});
  if(!mini){const h=buildHall({x:PX,z:PZ,ry:0,W:3,D:3,nx:1,nz:1,FY:.6,PH:2.4,roof:'hip',name:'羽化亭',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',stairs:'none',rail:true,solids:[],light:false,roofScale:.75});h.group.position.y=y;G.add(h.group)}}
 /* 정읍사 망부석 언덕 + 밤 달 */const MX=-6,MZ=-40;{const hl=new THREE.Mesh(new THREE.SphereGeometry(9,20,10,0,Math.PI*2,0,Math.PI/2),M(0x7a9a4a));hl.scale.y=.32;hl.position.set(MX,0,MZ);G.add(hl);const st=new THREE.Mesh(new THREE.CylinderGeometry(.5,.7,2.4,7),M(0x9a9488,{flatShading:true}));st.position.set(MX,3.9,MZ);G.add(st);const hd=new THREE.Mesh(new THREE.SphereGeometry(.42,8,6),M(0x9a9488,{flatShading:true}));hd.position.set(MX,5.3,MZ);G.add(hd);solids.push({cx:MX,cz:MZ,r:.8,y0:0,y1:6})}
 const moon=new THREE.Mesh(new THREE.SphereGeometry(5,24,16),new THREE.MeshBasicMaterial({color:0xfff2c0,transparent:true,opacity:0}));moon.position.set(MX-20,60,MZ-120);G.add(moon);
 const NL=[];if(!mini){for(const[x,y,z]of[[SX,4,SZ+18],[PX,H(PX,PZ)+3,PZ],[MX,3,MZ+6],[SX,4,SZ-4]]){const L=new THREE.PointLight(0xffc080,0,20,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7;moon.material.opacity=nk};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(SX,SZ+19,3,'무성서원','신라 최치원이 태산(지금 정읍) 태수일 때 고을을 잘 다스린 것을 기려 세운 서원이에요. 흥선대원군이 서원을 없앨 때도 남은 47곳 가운데 하나이고, 2019년 「한국의 서원」으로 세계유산이 됐어요. 간추려 지었어요.');
 sp(SX,SZ+6,2.6,'무성서원 강당','유생들이 모여 공부하던 곳이에요. 1906년 최익현이 이곳에서 의병을 일으켰어요(병오창의).');
 sp(PX-12,PZ,3,'내장산 우화정','내장산은 가을 단풍으로 이름난 산이에요. 내장사 앞 연못에 비친 정자 우화정이 단풍과 어우러져요.');
 sp(40,-6,2.4,'단풍잎 받는 자리','떨어지는 빨간 단풍잎을 바구니로 받아 봐요.');
 sp(MX,MZ+10,3,'정읍사 망부석','「달하 노피곰 도다샤…」 백제 때 정읍 사람이 장사 나간 남편이 밤길에 무사히 돌아오길 달에게 빈 노래예요. 백제 노래 가운데 노랫말이 전하는 하나뿐인 노래로, 「악학궤범」에 한글로 실려 있어요. 밤에 오면 달이 떠요.');
 sp(-10,20,2.4,'발굴 탐지 자리','정읍 땅속에 옛 사람들의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 단풍잎 받기(11/21): 화면 위에서 잎이 떨어져요. ←/→(또는 버튼·끌기)로 바구니를 움직여 빨간 단풍잎만 받기. 노란 은행잎·도토리는 피하기. 25장, 60초 */
 window.__JUMAPLE=()=>{if(document.getElementById('juP'))return;const H3=window.__H3,ctx=H3.ctx();const by=H(40,-6);try{H3.tp(40,-6,0)}catch(e){}
  const cv=document.createElement('canvas');cv.id='juC';cv.style.cssText='position:fixed;inset:0;z-index:55;width:100%;height:100%;touch-action:none';document.body.appendChild(cv);const q=cv.getContext('2d');const fit=()=>{cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio};fit();
  window.__GCAM=()=>document.getElementById('juP')?[30,by+5,6,60,by+8,-14,60]:null;
  let bx=.5,n=0,miss=0,done=false,t0=performance.now()/1000,last=t0,spawnT=0,keyL=false,keyR=false;const N=25,TL=60;const items=[];
  const d=document.createElement('div');d.id='juP';d.style.cssText="position:fixed;right:16px;top:90px;z-index:60;background:#3a1a10;border:3px solid #e8641a;border-radius:16px;padding:10px 14px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#fbe8d8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:200px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffb070">🍁 단풍잎 받기</b><div id="juS" style="font:19px 'Do Hyeon',sans-serif;margin:4px 0">0 / ${N}장</div><div id="juG" style="font-size:12px;color:#ffb070">빨간 단풍잎만 받아요</div><div id="juT" style="font-size:13px">${TL}초</div>`;
  const pad=document.createElement('div');pad.id='juPad';pad.style.cssText='position:fixed;left:0;right:0;bottom:24px;z-index:61;display:flex;justify-content:space-between;padding:0 18px;pointer-events:none';pad.innerHTML=`<button id="juL" style="pointer-events:auto;font:28px sans-serif;width:72px;height:72px;border-radius:50%;border:0;background:rgba(232,100,26,.85);color:#fff">◀</button><button id="juR" style="pointer-events:auto;font:28px sans-serif;width:72px;height:72px;border-radius:50%;border:0;background:rgba(232,100,26,.85);color:#fff">▶</button>`;document.body.appendChild(pad);
  const hold=(id,on)=>{const b=pad.querySelector(id);b.onpointerdown=e=>{e.preventDefault();on(true)};b.onpointerup=b.onpointerleave=()=>on(false)};hold('#juL',v=>keyL=v);hold('#juR',v=>keyR=v);
  const onKey=e=>{if(e.code==='ArrowLeft'||e.code==='KeyA'){keyL=e.type==='keydown';e.preventDefault()}if(e.code==='ArrowRight'||e.code==='KeyD'){keyR=e.type==='keydown';e.preventDefault()}};addEventListener('keydown',onKey,true);addEventListener('keyup',onKey,true);
  cv.onpointermove=e=>{if(e.buttons)bx=Math.max(.06,Math.min(.94,e.clientX/innerWidth))};cv.onpointerdown=e=>{bx=Math.max(.06,Math.min(.94,e.clientX/innerWidth))};
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const maple=(x,y,s,a,col)=>{q.save();q.translate(x,y);q.rotate(a);q.fillStyle=col;q.beginPath();for(let k=0;k<10;k++){const ang=-Math.PI/2+k*Math.PI/5*1.0;const rr=k%2?s*.42:s;q.lineTo(Math.cos(ang)*rr,Math.sin(ang)*rr)}q.closePath();q.fill();q.strokeStyle='rgba(80,20,10,.6)';q.lineWidth=s*.08;q.beginPath();q.moveTo(0,0);q.lineTo(0,s*1.3);q.stroke();q.restore()};
  const ginkgo=(x,y,s,a)=>{q.save();q.translate(x,y);q.rotate(a);q.fillStyle='#f0c020';q.beginPath();q.moveTo(0,s*.4);q.arc(0,s*.4,s,-Math.PI*.85,-Math.PI*.15);q.closePath();q.fill();q.restore()};
  const acorn=(x,y,s)=>{q.fillStyle='#7a4a20';q.beginPath();q.ellipse(x,y,s*.45,s*.6,0,0,7);q.fill();q.fillStyle='#4a3018';q.fillRect(x-s*.5,y-s*.75,s,s*.35)};
  const cleanup=()=>{removeEventListener('keydown',onKey,true);removeEventListener('keyup',onKey,true);cv.remove();pad.remove()};
  const fin=()=>{if(done)return;done=true;cleanup();const el=performance.now()/1000-t0;const Q=n>=N?Math.max(60,Math.round(100-miss*4-Math.max(0,el-40)*.6)):Math.round(n/N*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('jeongeup_maple',Q,'내장산 단풍잎 받기')}catch(e){}window.__JUQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#ffb070">단풍잎 ${n}장을 받았어요</b><div style="font-size:13px;margin:4px 0">가을이 깊어지면 잎 속 초록 엽록소가 줄고 붉은 색소가 생겨 단풍이 들어요. 내장산은 단풍나무가 많아 「가을 내장」이라 불려요.</div><div style="font-size:24px;color:#e8641a">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#e8641a;color:#fff;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#fbe8d8;border:2px solid #fbe8d8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__JUMAPLE()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}const now=performance.now()/1000,dt=Math.min(.1,now-last);last=now;const W=cv.width,Hh=cv.height,S=Math.min(W,Hh)/22;
   if(!done){if(keyL)bx-=dt*.9;if(keyR)bx+=dt*.9;bx=Math.max(.06,Math.min(.94,bx));spawnT-=dt;if(spawnT<=0){const k=Math.random();items.push({x:.05+Math.random()*.9,y:-.05,vy:.16+Math.random()*.1+Math.min(.12,(now-t0)/300),sw:Math.random()*6,t:k<.62?'m':k<.85?'g':'a',col:['#d8341a','#e8441a','#c8281a'][(Math.random()*3)|0]});spawnT=.42+Math.random()*.3}
    const bw=.16;for(const it of items){if(it.dead)continue;it.y+=it.vy*dt;it.sw+=dt*2;const xx=it.x+Math.sin(it.sw)*.03;if(it.y>.86&&it.y<.93&&Math.abs(xx-bx)<bw/2){it.dead=true;if(it.t==='m'){n++;snd(700+n*10,.1);if(n>=N)fin()}else{miss++;snd(180,.25,'sawtooth');d.querySelector('#juG').textContent=it.t==='g'?'은행잎은 노란색이에요!':'도토리는 아파요!'}}else if(it.y>1.05)it.dead=true}
    d.querySelector('#juS').textContent=n+' / '+N+'장';const left=Math.max(0,TL-(now-t0));d.querySelector('#juT').textContent=Math.ceil(left)+'초';if(left<=0)fin()}
   q.clearRect(0,0,W,Hh);for(const it of items){if(it.dead)continue;const xx=(it.x+Math.sin(it.sw)*.03)*W,yy=it.y*Hh;if(it.t==='m')maple(xx,yy,S,Math.sin(it.sw)*.6,it.col);else if(it.t==='g')ginkgo(xx,yy,S*.8,Math.sin(it.sw)*.5);else acorn(xx,yy,S*.7)}
   const X=bx*W,Y=.9*Hh,BW=.16*W;q.fillStyle='#b08850';q.beginPath();q.moveTo(X-BW/2,Y-S*.4);q.lineTo(X+BW/2,Y-S*.4);q.lineTo(X+BW*.38,Y+S*1.1);q.lineTo(X-BW*.38,Y+S*1.1);q.closePath();q.fill();q.strokeStyle='#6a4a20';q.lineWidth=S*.12;for(let k=1;k<4;k++){q.beginPath();q.moveTo(X-BW/2+k*BW/4*.95,Y-S*.4);q.lineTo(X-BW*.38+k*BW*.76/4,Y+S*1.1);q.stroke()}
   requestAnimationFrame(loop)};loop();
  window.__JUG={items,get bx(){return bx},set bx(v){bx=v},get n(){return n}};try{ctx.say('빨간 단풍잎을 받아요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'사발통문 조각',h:'1893년 고부에서 동학 농민들이 이름을 둥글게 돌려 적은 통문이에요(누가 주모자인지 모르게). 동학농민혁명이 여기서 시작됐어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.26,.01,.2),M(0xe8dcc0)))})},
  {n:'죽창 끝',h:'동학 농민군이 들었던 대나무 창 끝이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.ConeGeometry(.03,.3,6),M(0x9a8a50));m.rotation.z=Math.PI/2;g.add(m)})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})},
  {n:'백제 토기 조각',h:'정읍은 백제 때 정촌현이었어요. 그때 토기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.1,.12,12,1,true),M(0x7a6a5a,{side:THREE.DoubleSide})))})}];
 window.__JUDIG=()=>{window.__DETECT&&window.__DETECT({key:'jeongeup_dig',title:'정읍 발굴 탐지',emoji:'⛏️',bg:'#3a1a10',count:4,TL:150,cand:[[-10,20],[0,40],[-20,-30],[10,-20],[-50,30],[16,10],[-56,-34],[4,60]],items:ITEMS,intro:'정읍 땅속에 옛 사람들의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'정읍은 백제 노래 정읍사, 최치원의 무성서원, 동학농민혁명이 함께 깃든 고장이에요.'})};
 const meta={quest:{t:'정읍 둘러보기',d:'무성서원과 내장산, 정읍사 망부석을 둘러보세요.',steps:[['서원','무성서원'],['우화정','내장산 우화정'],['망부석','정읍사 망부석']]},
  title:'정읍 무성서원·내장산',hint:'세계유산 무성서원과 단풍 내장산, 정읍사 망부석을 간추려 지었어요. 빨간 단풍잎을 받아 봐요. 밤에는 정읍사의 달이 떠요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,groundY:-.5,sign:{x:-8,z:8,lines:['정읍 무성서원·내장산','세계유산 한국의 서원','단풍 · 정읍사의 달','간추려 지음']}},
  npc:[['science',[[-14,6],[-4,6],[-4,14],[-14,14]]]],bounds:[-100,100,-100,100],level:()=>'정읍',camCap:()=>Infinity,baseAt:(x,z)=>H(x,z),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.1,ox:-5,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#b86a2a';g.fillRect(X(34),0,300,300);g.fillStyle='#3a6a70';g.beginPath();g.arc(X(PX),Z(PZ),11*S,0,7);g.fill();g.fillStyle='#8a6a48';g.fillRect(X(SX-12),Z(SZ-20),24*S,35*S);g.fillStyle='#7a9a4a';g.beginPath();g.arc(X(MX),Z(MZ),9*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-8,z:12,yaw:Math.PI},size:{}},meta)}
