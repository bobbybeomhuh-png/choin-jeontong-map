/* 고령 대가야 마당(2026-11-21): 지산동 고분군(세계유산 「가야고분군」 2023)과 우륵의 가야금.
   가야금은 공개 실측 3D(국가유산청 KHS_Asset 「Gayageum」, CC BY, 길이 1.62m 실제 크기). 고분군 능선은 공개 수치로 간추려 지음:
   주산 능선을 따라 크고 작은 무덤 700여 기, 44호분(지름 약 27m·높이 약 6m, 순장 무덤). 놀이: 가야금 타기(줄 따라 오는 빛을 오른손 자리에서 뜯기), 발굴 탐지. 밤엔 능선 길 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildGoryeong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(562);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 능선 높이: 서쪽(-x) 주산으로 갈수록 높아지는 등줄기 + 무덤(둥근 봉분) */
 const ridgeH=x=>6+Math.max(0,Math.min(1,(60-x)/190))*26;const RW=30;
 const MOUNDS=[];{let x=-110;let i=0;while(x<44){const big=i%5===2;const rr=big?9+r()*4:3.5+r()*4;const z=(r()-.5)*8;MOUNDS.push({x,z,r:rr,h:rr*.42,n:0});x+=rr*1.6+2+r()*3;i++}
  /* 44호분: 지름 27m·높이 6m */MOUNDS.push({x:-8,z:0,r:13.5,h:6,n:44});for(const m of MOUNDS)if(m.n!==44&&Math.hypot(m.x+8,m.z)<m.r+14.5)m.dead=true}
 const ML=MOUNDS.filter(m=>!m.dead);
 const H=(x,z)=>{let h=ridgeH(x)*Math.exp(-Math.pow(z/RW,2));if(x>60)h*=Math.max(0,1-(x-60)/30);for(const m of ML){const d=Math.hypot(x-m.x,z-m.z);if(d<m.r){const t=1-(d/m.r)**2;h+=m.h*Math.sqrt(t)}}return h};
 const base=(x,z)=>ridgeH(x)*Math.exp(-Math.pow(z/RW,2))*(x>60?Math.max(0,1-(x-60)/30):1);
 /* 땅 메시 */{const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#ffffff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[70,40]);
  const NX=200,NZ=110,W=380,D=200;const g=new THREE.PlaneGeometry(W,D,NX,NZ);g.rotateX(-Math.PI/2);g.translate(-30,0,0);const p=g.attributes.position;const col=[];const c=new THREE.Color();
  for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);const h=H(x,z);p.setY(k,h);const onM=h-base(x,z)>.05;const path=Math.abs(z)<1.6&&!onM&&x<58;if(path)c.set('#b49a6e');else if(onM)c.set('#6b7640')/* 11/28: 민트·연두 봉분 → 실제 고분군 올리브 잔디 */;else c.set('#61793a').offsetHSL(0,0,(r()-.5)*.03);col.push(c.r,c.g,c.b)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1}));m.receiveShadow=true;G.add(m)}
 /* 능선 소나무(무덤 피해) */{const tm=M(0x5a4030),lm=M(0x2f5a2c);for(let i=0;i<70;i++){const x=-140+r()*200,z=(r()<.5?-1:1)*(14+r()*40);if(ML.some(m=>Math.hypot(x-m.x,z-m.z)<m.r+2))continue;const y=H(x,z);const t=new THREE.Mesh(new THREE.CylinderGeometry(.22,.34,5,6),tm);t.position.set(x,y+2.5,z);t.castShadow=true;G.add(t);for(let k=0;k<3;k++){const cc=new THREE.Mesh(new THREE.ConeGeometry(2.2-k*.55,2.2,7),lm);cc.position.set(x,y+4.4+k*1.2,z);cc.castShadow=true;G.add(cc)}solids.push({cx:x,cz:z,r:.5,y0:y,y1:y+8})}}
 /* 무덤 번호 돌 */{const sm=M(0x9a9488);for(const m of ML.filter(m=>m.r>8||m.n)){const x=m.x,z=m.z+m.r+1.2;const s=new THREE.Mesh(new THREE.BoxGeometry(.5,.7,.18),sm);s.position.set(x,H(x,z)+.35,z);G.add(s)}}
 /* 우륵 가야금 정자(능선 아래 동쪽) + 실측 가야금 */
 const PX=98,PZ=18;
 if(!mini){const h=buildHall({x:PX,z:PZ,ry:Math.PI,W:7.2,D:7.2,nx:2,nz:2,FY:.5,PH:3,roof:'hip',pillar:0x8a3a2a,bracket:'ik',front:'open',back:'open',left:'open',right:'open',solids:[],light:false,roofScale:.8});G.add(h.group);window.__GYFLOOR=h.floorY}
 const GY=new THREE.Group();GY.position.set(PX,window.__GYFLOOR!=null?window.__GYFLOOR:.9,PZ);G.add(GY);let gyM=null;
 if(!mini){const gl=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(dr);
  gl.load(new URL('../models/goryeong/gayageum.glb',import.meta.url).href,m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=e.receiveShadow=true;if(e.material){e.material.transparent=false;e.material.alphaTest=0}cam.push(e)}});const b=new THREE.Box3().setFromObject(o);const c=b.getCenter(new THREE.Vector3());o.position.set(-c.x,-b.min.y,-c.z);GY.add(o);gyM=o;GY.userData.noBatch=true;o.userData.noBatch=true;window.__GYBOX=b},undefined,()=>{})}
 /* 밤: 능선 길 등 */
 const NL=[];if(!mini){for(let i=0;i<10;i++){const x=-80+i*14;const z=2.4;const y=H(x,z);const p=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,1,6),M(0x4a3a2a));p.position.set(x,y+.5,z);G.add(p);const lp=new THREE.Mesh(new THREE.BoxGeometry(.26,.32,.26),new THREE.MeshStandardMaterial({color:0xf4e8c8,emissive:0}));lp.position.set(x,y+1.1,z);G.add(lp);NL.push({lp})}for(const[x,z,y]of[[-8,0,H(-8,0)+4],[PX,PZ,4]]){const L=new THREE.PointLight(0xffc080,0,26,1.4);L.position.set(x,y,z);G.add(L);NL.push({L})}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const l of NL){if(l.lp)l.lp.material.emissive.setRGB(nk,nk*.8,nk*.5);if(l.L)l.L.intensity=nk*9}};
 /* 안내 */
 const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(64,-8,4,'지산동 고분군','대가야 왕과 귀족의 무덤 700여 기가 주산 능선을 따라 줄지어 있어요. 높은 곳일수록 큰 무덤이 있어, 능선 위에서 도읍을 내려다보게 했어요. 2023년 「가야고분군」으로 세계유산이 됐어요. 간추려 지었어요.');
 sp(-8,-16,4,'지산동 44호분','지름 약 27m의 큰 무덤이에요. 으뜸 돌방 둘레에 작은 돌덧널 30여 개가 있어, 왕과 함께 40명 가까이 묻은 우리나라 첫 순장 무덤으로 확인됐어요.');
 sp(PX-5,PZ-5,3,'우륵 가야금 정자','가야금은 가야 가실왕이 만들게 하고 우륵이 12곡을 지었다고 전해요. 우륵은 대가야가 기울자 신라로 가서 가야금을 전했어요. 가운데 가야금은 국가유산청 공개 실측(CC BY) 실제 크기(길이 1.62m)예요.');
 sp(PX+2.2,PZ+4.2,1.8,'가야금 타는 자리','가야금 줄을 뜯어 아리랑을 타 봐요.');
 sp(80,14,2.4,'발굴 탐지 자리','대가야 무덤 둘레 땅속에 유물이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 가야금 타기(11/21): 위에서 내려다본 실측 가야금. 줄을 따라 빛이 안족 쪽으로 오면, 안족에 닿을 때 그 줄을 눌러 뜯어요(아리랑 첫 가락). */
 const SZ0=-.108,SDZ=.0196,BX=[-.434,-.395,-.355,-.301,-.246,-.193,-.13,-.061,.017,.082,.162,.25];const FLIPZ=window.__GYFLIP?-1:1;
 const SF=[196,220,261.6,293.7,329.6,392,440,523.3,587.3,659.3,784,880];
 const MEL=[[5,1],[5,.5],[6,.5],[5,1],[6,.5],[7,.5],[8,1],[7,.5],[6,.5],[5,.5],[6,1.5],[7,1],[8,.5],[9,.5],[8,1],[7,.5],[6,.5],[5,1],[6,.5],[7,.5],[6,.5],[5,1.5]];
 window.__GYPLAY=()=>{if(document.getElementById('gyP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX+1.6,PZ+2.6,GY.position.y);H3.face(Math.PI)}catch(e){}
  const top=GY.position.y+.155;const W=(i,x)=>new THREE.Vector3(GY.position.x+x,top,GY.position.z+FLIPZ*(SZ0+i*SDZ));
  const CX=GY.position.x-.1,CZ=GY.position.z;const fovFor=()=>{const asp=innerWidth/innerHeight;const needW=1.15,needH=.55;const h=1.5;const v=Math.max(needH,needW/asp);return 2*Math.atan(v/2/h)*180/Math.PI};
  let on=true,rst=false;window.__GCAM=()=>{if(document.getElementById('gyP')&&on)return[CX,top+1.5,CZ+.001,CX,top,CZ,fovFor()];if(!rst){rst=true;return[CX,top+1.5,CZ+.001,CX,top,CZ,innerWidth/innerHeight<.8?68:55]}return null};
  const g=new THREE.Group();G.add(g);const bm=new THREE.MeshBasicMaterial({color:0xffe080});const BEADS=[];
  for(let i=0;i<12;i++){const a=W(i,BX[i]);const mk=new THREE.Mesh(new THREE.BoxGeometry(.012,.004,.016),new THREE.MeshBasicMaterial({color:0x8ae0ff,transparent:true,opacity:.6}));mk.position.copy(a);mk.position.y+=.004;g.add(mk)}
  const notes=[];{let t=2.2;for(const[s,d]of MEL){notes.push({s,t,hit:false,miss:false,m:null});t+=d*.75}}const TRAVEL=1.8,X0=.62,WIN=.2;
  const d=document.createElement('div');d.id='gyP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2018;border:3px solid #d8b070;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffe0a0">🎶 가야금 타기 · 아리랑</b><div id="gyS" style="font:20px 'Do Hyeon',sans-serif;margin:4px 0">0 / ${notes.length}</div><div id="gyG" style="font-size:13px;color:#ffe0a0">빛이 파란 안족에 닿을 때 그 줄을 눌러요</div><div style="font-size:12px;opacity:.85">화면 아무 데나 눌러도 가장 가까운 줄을 뜯어요</div>`;const Sx=d.querySelector('#gyS'),Gd=d.querySelector('#gyG');
  const pluck=(i)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,f=SF[i];for(const[mul,amp]of[[1,.09],[2,.03],[3,.012]]){const o=AC.createOscillator(),gg=AC.createGain();o.type=mul===1?'triangle':'sine';o.frequency.setValueAtTime(f*mul,s);o.frequency.setValueAtTime(f*mul,s+.25);o.frequency.linearRampToValueAtTime(f*mul*1.03,s+.45);o.frequency.linearRampToValueAtTime(f*mul,s+.7);gg.gain.setValueAtTime(amp,s);gg.gain.exponentialRampToValueAtTime(.0001,s+1.4);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+1.5)}}catch(e){}};
  const pcam=new THREE.PerspectiveCamera(50,1,.01,10);const t0=performance.now()/1000;let hits=0,done=false;
  const strY=()=>{const k=window.__GCAM&&window.__GCAM();if(!k)return null;pcam.fov=k[6];pcam.aspect=innerWidth/innerHeight;pcam.position.set(k[0],k[1],k[2]);pcam.lookAt(k[3],k[4],k[5]);pcam.updateMatrixWorld(true);pcam.updateProjectionMatrix();return BX.map((bx,i)=>{const v=W(i,bx).project(pcam);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]})};
  const tap=(cx,cy)=>{if(done)return;const now=performance.now()/1000-t0;const P=strY();if(!P)return;let si=0,bd=1e9;P.forEach(([x,y],i)=>{const dd=Math.abs(y-cy);if(dd<bd){bd=dd;si=i}});
   const act=notes.filter(n=>!n.hit&&!n.miss&&Math.abs(n.t-now)<WIN);let pick=null;for(const n of act)if(Math.abs(n.s-si)<=2&&(!pick||Math.abs(n.s-si)<Math.abs(pick.s-si)))pick=n;
   if(pick){pick.hit=true;hits++;pluck(pick.s);if(pick.m){pick.m.material.color.set(0x8ae08a);pick.m.scale.setScalar(1.8)}Sx.textContent=hits+' / '+notes.length;Gd.textContent='좋아요!'}else{pluck(si);Gd.textContent='빛이 안족에 닿을 때 눌러요'}};
  const onDown=ev=>{if(ev.target&&ev.target.closest&&ev.target.closest('#gyP'))return;tap(ev.clientX,ev.clientY)};addEventListener('pointerdown',onDown,true);
  const fin=()=>{if(done)return;done=true;removeEventListener('pointerdown',onDown,true);const Q=Math.round(hits/notes.length*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('goryeong_gayageum',Q,'가야금 아리랑 타기')}catch(e){}window.__GYQ=Q||.001;
   setTimeout(()=>{if(!d.isConnected)return;on=false;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffe0a0">${notes.length}음 가운데 ${hits}음을 탔어요</b><div style="font-size:13px;margin:4px 0">가야금은 오동나무 울림통에 명주실 12줄을 매고, 줄마다 받친 안족(기러기발)을 옮겨 소리 높이를 맞춰요. 오른손으로 뜯고 왼손으로 줄을 눌러 떨게 하는 「농현」이 가야금 소리의 멋이에요.</div><div style="font-size:26px;color:#d8b070">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#d8b070;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__GYQ=0;setTimeout(()=>window.__GYPLAY(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},900)};
  const loop=()=>{if(!d.isConnected){G.remove(g);removeEventListener('pointerdown',onDown,true);return}const now=performance.now()/1000-t0;
   for(const n of notes){const u=(n.t-now)/TRAVEL;if(!n.m&&u<1&&u>-.3){n.m=new THREE.Mesh(new THREE.SphereGeometry(.011,10,8),bm.clone());g.add(n.m)}if(n.m){if(n.hit){n.m.position.y+=.004;n.m.material.opacity=(n.m.material.opacity??1);if(now-n.t>.4){g.remove(n.m)}}else{const x=BX[n.s]+(X0-BX[n.s])*Math.max(0,u);n.m.position.copy(W(n.s,x));n.m.position.y+=.008;if(u<-.15&&!n.miss){n.miss=true;n.m.material.color.set(0xff6a5a)}if(u<-.3)g.remove(n.m)}}}
   if(!done&&now>notes[notes.length-1].t+.6)fin();requestAnimationFrame(loop)};loop();
  window.__GYG={notes,get hits(){return hits},auto:()=>{const now=performance.now()/1000-t0;const n=notes.find(n=>!n.hit&&!n.miss&&Math.abs(n.t-now)<.08);if(n){const P=strY();if(P)tap(P[n.s][0],P[n.s][1])}},strY,W};
  try{ctx.say('우륵의 가야금이에요! 아리랑을 타 봐요.',2.4)}catch(e){}};
 window.__GYH=H;
 const mk=(fn)=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'대가야 금관',h:'고령에서 나왔다고 전하는 대가야 금관이에요(국보). 신라 금관과 달리 풀잎·꽃 모양 세움 장식이 달렸어요.',mk:mk(g=>{const gm=M(0xd8a830,{metalness:.9,roughness:.3});const b=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.06,24,1,true),gm);b.material.side=THREE.DoubleSide;g.add(b);for(let i=0;i<4;i++){const a=i/4*6.28;const l=new THREE.Mesh(new THREE.ConeGeometry(.06,.22,4),gm);l.position.set(Math.cos(a)*.22,.13,Math.sin(a)*.22);g.add(l)}})},
  {n:'긴목 항아리',h:'목이 길고 굽에 구멍을 뚫은 대가야 토기예요. 대가야 토기는 넓은 곳에서 나와 대가야의 힘이 어디까지 닿았는지 알려 줘요.',mk:mk(g=>{const pts=[];for(let i=0;i<=10;i++){const t=i/10;pts.push(new THREE.Vector2(t<.6?.2*Math.sin(t/.6*Math.PI)+.05:.07,t*.6))}const m=new THREE.Mesh(new THREE.LatheGeometry(pts,14),M(0x5a5450));g.add(m)})},
  {n:'철 갑옷 조각',h:'쇠판을 이어 만든 갑옷이에요. 가야는 질 좋은 철로 이름났어요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.4,.04,.3),M(0x5a4a3a,{metalness:.5}));g.add(m)})},
  {n:'금귀걸이',h:'가는 고리에 작은 금 장식을 매단 귀걸이예요.',mk:mk(g=>{const gm=M(0xe0b040,{metalness:.9,roughness:.3});const t=new THREE.Mesh(new THREE.TorusGeometry(.05,.012,8,16),gm);g.add(t);const d=new THREE.Mesh(new THREE.ConeGeometry(.035,.09,6),gm);d.position.y=-.09;d.rotation.x=Math.PI;g.add(d)})},
  {n:'덩이쇠',h:'철을 납작하게 펴 만든 쇳덩이로, 돈처럼 주고받고 무덤에도 묻었어요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.4,.02,.1),M(0x4a3a30,{metalness:.5}));m.scale.x=1;g.add(m)})}];
 window.__GRDIG=()=>{window.__DETECT&&window.__DETECT({key:'goryeong_dig',title:'대가야 발굴 탐지',emoji:'⛏️',bg:'#24221e',count:4,TL:150,cand:[[78,8],[84,-12],[76,22],[92,6],[80,-24],[88,32],[104,-6],[106,30],[94,-18]],items:ITEMS,intro:'대가야 무덤 둘레 땅속에 유물이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'지산동 고분군에서는 금관·토기·철기가 많이 나와 대가야가 철과 토기로 이름난 나라였음을 보여 줘요.'})};
 const meta={quest:{t:'대가야 둘러보기',d:'능선 무덤과 가야금 정자를 둘러보세요.',steps:[['고분군','지산동 고분군'],['44호분','지산동 44호분'],['가야금','우륵 가야금 정자']]},
  title:'고령 대가야 지산동 고분군',hint:'대가야 왕들의 무덤이 능선을 따라 줄지어 있어요. 능선 길을 올라 44호분을 보고, 우륵 정자에서 실측 가야금을 타 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:true,sign:{x:84,z:6,lines:['고령 지산동 고분군','세계유산 가야고분군(2023)','가야금 실측 · 국가유산청 CC BY','능선은 간추려 지음']}},
  npc:[['science',[[84,0],[90,0],[90,8],[84,8]]]],bounds:[-150,120,-80,80],level:()=>'대가야',camCap:()=>Infinity,baseAt:(x,z)=>{if(Math.abs(x-PX)<3.6&&Math.abs(z-PZ)<3.6&&window.__GYFLOOR!=null)return Math.max(H(x,z),window.__GYFLOOR);return H(x,z)},
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}try{window.__GYTICK&&window.__GYTICK(dt)}catch(e){}},
  mini:{S:1,ox:-30,oz:0,draw(g,X,Z,S){g.fillStyle='#6d8a3e';g.fillRect(0,0,300,300);g.fillStyle='#7fa04c';for(const m of ML){g.beginPath();g.arc(X(m.x),Z(m.z),Math.max(2,m.r*S),0,7);g.fill()}g.fillStyle='#b49a6e';g.fillRect(X(-110),Z(1.6),170*S,3);g.fillStyle='#8a3a2a';g.fillRect(X(PX-3.6),Z(PZ+3.6),7*S,7*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:88,z:-4,yaw:-Math.PI/2},size:{},GY,H},meta)}
