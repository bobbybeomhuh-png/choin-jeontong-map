/* 양양 낙산사 마당(2026-11-21): 공개 실측 3D(CC BY)가 없어 공개 수치로 간추려 지음.
   낙산사: 신라 의상대사가 동해 바닷가에 세운 관음 도량. 바다 벼랑 위 정자 의상대, 벼랑 동굴 위에 지은 암자 홍련암(마루 구멍으로 바다가 보임), 원통보전·칠층석탑. 2005년 산불 뒤 다시 지음. 동해 해돋이 명소.
   놀이: 의상대 해돋이 찍기(해가 수평선을 막 벗어나는 순간 찰칵, 세 번), 발굴 탐지, 밤 바다 달빛·석등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {stonePagoda,stoneLantern} from './stonekit.js';
export function buildNaksan(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(671);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 서쪽 언덕(높이 12m) → 동쪽 벼랑 → 바다. 홍련암 쪽은 한 단 낮은 바위 턱 */
 const ss=t=>t<=0?0:t>=1?1:t*t*(3-2*t);const CL=0,TOP=12;
 const H=(x,z)=>{let h=TOP*(1-ss((x-CL+3)/5))+Math.max(0,-x-20)*.08;const led=Math.hypot(x+2,z+24)<9;if(led&&x>-6)h=Math.max(h,7);return h};
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[50,60]);
  const g=new THREE.PlaneGeometry(200,240,140,160);g.rotateX(-Math.PI/2);g.translate(-60,0,0);const p=g.attributes.position;const col=[];const c=new THREE.Color();
  for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);const h=H(x,z);p.setY(k,h);const rock=x>-4&&h<11.5;const yard=x<-28&&x>-56&&Math.abs(z)<22;c.set(rock?'#7a7468':yard?'#c8b894':'#5f8a3a');col.push(c.r,c.g,c.b)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1,flatShading:true}));m.receiveShadow=true;G.add(m)}
 /* 벼랑 바위 */{const rm=M(0x6a665e,{flatShading:true});for(let i=0;i<40;i++){const z=-110+i*5.5+(r()-.5)*2;const s=new THREE.Mesh(new THREE.DodecahedronGeometry(2.4+r()*1.8,0),rm);s.position.set(2+r()*3,r()*5,z);s.scale.y=1.3;s.rotation.set(r(),r(),r());s.castShadow=true;G.add(s)}}
 /* 동해 */const sea=new THREE.Mesh(new THREE.PlaneGeometry(600,600),M(0x2f6a8a,{roughness:.08,metalness:.25}));sea.rotation.x=-Math.PI/2;sea.position.set(300,.4,0);G.add(sea);solids.push({x0:3,x1:400,y0:-5,y1:4,z0:-300,z1:300});
 /* 파도 흰 거품 */const foam=new THREE.Mesh(new THREE.PlaneGeometry(4,240),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.35,depthWrite:false}));foam.rotation.x=-Math.PI/2;foam.position.set(6,.45,0);G.add(foam);
 /* 의상대: 벼랑 끝 육각 정자 */const UX=-4,UZ=18;{const y=H(UX,UZ);const g=new THREE.Group();g.position.set(UX,y,UZ);const red=M(0x9a3a26);const fl=new THREE.Mesh(new THREE.CylinderGeometry(2.6,2.8,.5,6),M(0xb8b0a0));fl.position.y=.25;g.add(fl);for(let i=0;i<6;i++){const a=i/6*6.28;const p=new THREE.Mesh(new THREE.CylinderGeometry(.13,.15,2.8,8),red);p.position.set(Math.cos(a)*2.2,1.9,Math.sin(a)*2.2);g.add(p)}const bk=new THREE.Mesh(new THREE.CylinderGeometry(2.5,2.5,.35,6,1,true),M(0x2f7a64));bk.position.y=3.4;g.add(bk);const rf=new THREE.Mesh(new THREE.ConeGeometry(3.6,1.9,6),M(0x4a4c52));rf.position.y=4.5;g.add(rf);const tp=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),M(0x4a4c52));tp.position.y=5.5;g.add(tp);g.traverse(e=>{if(e.isMesh){e.castShadow=true;cam.push(e)}});G.add(g);
  /* 노송 */const tm=M(0x6a4a32),lm=M(0x2f5a2c);for(const[dx,dz]of[[-3,-3],[-4,3]]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.25,.4,6,7),tm);t.position.set(UX+dx,y+3,UZ+dz);t.rotation.z=.35;G.add(t);const cr=new THREE.Mesh(new THREE.SphereGeometry(2.4,12,8),lm);cr.scale.y=.45;cr.position.set(UX+dx+1.8,y+6,UZ+dz);G.add(cr)}}
 /* 홍련암: 바위 턱 위 작은 암자(마루 구멍) */const HX=-2,HZ=-24;if(!mini){const h=buildHall({x:HX,z:HZ,ry:-Math.PI/2,W:6.4,D:5,nx:3,nz:2,FY:.6,PH:2.8,roof:'hip',name:'紅蓮庵',pillar:0x9a3a26,bracket:'ik',front:'door',solids:[],light:false,roofScale:.85});h.group.position.y=7;G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)});solids.push({x0:HX-2.6,x1:HX+2.6,y0:6,y1:11,z0:HZ-3.3,z1:HZ+3.3})}
 /* 원통보전·칠층석탑·석등 */
 if(!mini){const h=buildHall({x:-44,z:0,ry:Math.PI/2,W:14,D:9,nx:3,nz:2,FY:1,PH:3.6,roof:'hip',name:'圓通寶殿',pillar:0x9a3a26,bracket:'dapo',front:'door',solids:[],light:false});h.group.position.y=H(-44,0);G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)});solids.push({x0:-49,x1:-39,y0:0,y1:30,z0:-7.5,z1:7.5});
  const h2=buildHall({x:-44,z:-26,ry:Math.PI/2,W:8,D:6,nx:3,nz:2,FY:.6,PH:3.2,roof:'hip',name:'梵鐘閣',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',solids:[],light:false});h2.group.position.y=H(-44,-26);G.add(h2.group)}
 {const p=stonePagoda(6.2);p.position.set(-32,H(-32,0),0);G.add(p);solids.push({cx:-32,cz:0,r:1.4,y0:0,y1:30});const l=stoneLantern(2.4);l.position.set(-26,H(-26,0),0);G.add(l);solids.push({cx:-26,cz:0,r:.5,y0:0,y1:30})}
 /* 소나무 숲 */{const tm=M(0x5a4030),lm=M(0x2f5a2c);for(let i=0;i<70;i++){const x=-150+r()*140,z=-110+r()*220;if(x>-14)continue;if(x<-26&&x>-58&&Math.abs(z)<30)continue;const y=H(x,z);const t=new THREE.Mesh(new THREE.CylinderGeometry(.22,.34,5,6),tm);t.position.set(x,y+2.5,z);t.castShadow=true;G.add(t);for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(2.1-k*.5,2.1,7),lm);c.position.set(x,y+4.3+k*1.1,z);c.castShadow=true;G.add(c)}solids.push({cx:x,cz:z,r:.45,y0:y,y1:y+8})}}
 /* 해·달 */
 const sunM=new THREE.MeshBasicMaterial({color:0xff6a2a,fog:false});const sun=new THREE.Mesh(new THREE.SphereGeometry(9,24,16),sunM);sun.position.set(380,-20,UZ);sun.visible=false;G.add(sun);
 const glowC=document.createElement('canvas');glowC.width=glowC.height=128;{const q=glowC.getContext('2d');const gr=q.createRadialGradient(64,64,8,64,64,64);gr.addColorStop(0,'rgba(255,190,120,.9)');gr.addColorStop(1,'rgba(255,120,60,0)');q.fillStyle=gr;q.fillRect(0,0,128,128)}const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(glowC),transparent:true,depthWrite:false,fog:false}));glow.scale.set(80,80,1);glow.visible=false;G.add(glow);
 const path=new THREE.Mesh(new THREE.PlaneGeometry(260,6),new THREE.MeshBasicMaterial({color:0xffa060,transparent:true,opacity:0,depthWrite:false,fog:false}));path.rotation.x=-Math.PI/2;path.position.set(140,.5,UZ);G.add(path);
 const moon=new THREE.Mesh(new THREE.PlaneGeometry(200,4),new THREE.MeshBasicMaterial({color:0xfff0c8,transparent:true,opacity:0,depthWrite:false}));moon.rotation.x=-Math.PI/2;moon.position.set(110,.5,-10);G.add(moon);
 const NL=[];if(!mini){for(const[x,z,y]of[[UX,UZ,H(UX,UZ)+3],[HX,HZ,10],[-26,0,H(-26,0)+2.4],[-44,0,H(-44,0)+4]]){const L=new THREE.PointLight(0xffc080,0,20,1.4);L.position.set(x,y,z);G.add(L);NL.push({L})}}
 let nk=0,ft=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const l of NL)l.L.intensity=nk*7;moon.material.opacity=nk*.2;ft+=dt;foam.material.opacity=.25+Math.sin(ft*1.4)*.12;foam.position.x=6+Math.sin(ft*1.4)*.6};
 /* 안내 */
 const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(-38,14,3.4,'낙산사','신라 의상대사가 동해 바닷가에 세운 관음보살 도량이에요. 2005년 큰 산불로 많은 건물이 탔다가 다시 지었어요. 간추려 지었어요.');
 sp(UX-6,UZ,3,'의상대','의상대사가 좌선했다는 바닷가 벼랑 위 육각 정자예요. 동해 해돋이를 보는 이름난 자리예요.');
 sp(HX-7,HZ,3,'홍련암','바닷가 동굴 위에 지은 작은 암자예요. 의상대사가 붉은 연꽃 위의 관음보살을 만났다는 이야기가 전하고, 법당 마루 구멍으로 아래 바다가 내려다보여요.');
 sp(-28,6,2.4,'칠층석탑','원통보전 앞 칠층석탑이에요(보물). 산불 속에서도 남았어요.');
 sp(UX-4,UZ-4,1.8,'해돋이 보는 자리','의상대에서 해가 수평선을 벗어나는 순간을 찍어 봐요.');
 sp(-60,30,2.4,'발굴 탐지 자리','낙산사 땅속에 옛 절의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 해돋이 찍기(11/21): 해가 수평선에서 떠오름. 해 아래쪽이 수평선에 닿는 순간 「찰칵」. 세 번 */
 window.__NSSUN=()=>{if(document.getElementById('nsP'))return;const H3=window.__H3,ctx=H3.ctx();const uy=H(UX,UZ);try{H3.tp(UX-1,UZ,uy+.5);H3.face(Math.PI/2)}catch(e){}
  const CP=[UX+4,uy+1.6,UZ+.5],LK=[UX+80,uy-2,UZ];window.__GCAM=()=>document.getElementById('nsP')?[...CP,...LK,46]:null;
  let round=0,score=[],t0=performance.now()/1000,shot=false,done=false;const R=9,SX=380,RISE=6.5;const startY=-R-4,endY=R+14;
  sun.visible=glow.visible=true;
  const d=document.createElement('div');d.id='nsP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a1e1a;border:3px solid #f0a060;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffc890">🌅 의상대 해돋이 찍기</b><div id="nsS" style="font:16px 'Do Hyeon',sans-serif;margin:4px 0">1 / 3번째 해</div><div id="nsG" style="font-size:13px;color:#ffc890">해가 수평선을 막 벗어나는 순간에 찰칵!</div><button id="nsB" style="font:20px 'Do Hyeon',sans-serif;background:#f0a060;color:#2a1a10;border:0;border-radius:12px;padding:10px 18px;margin:6px 0;cursor:pointer;width:100%">📷 찰칵</button>`;const Sx=d.querySelector('#nsS'),Gd=d.querySelector('#nsG'),Btn=d.querySelector('#nsB');
  const flash=()=>{const f=document.createElement('div');f.style.cssText='position:fixed;inset:0;background:#fff;opacity:.8;z-index:59;pointer-events:none;transition:opacity .5s';document.body.appendChild(f);setTimeout(()=>f.style.opacity='0',30);setTimeout(()=>f.remove(),600);try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='square';o.frequency.setValueAtTime(1800,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+.08);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+.1)}catch(e){}};
  let sy=startY,nextAt=0;const snap=()=>{if(done||shot)return;shot=true;flash();const bottom=sy-R;const err=Math.abs(bottom-.4);const pts=Math.max(0,Math.round(100-err*12));score.push(pts);Gd.textContent=pts>=85?'딱 그 순간이에요!':bottom<.4?'조금 일렀어요':'조금 늦었어요';Sx.textContent=`${round+1}번째 해: ${pts}점`;nextAt=performance.now()/1000+1.4};const advance=()=>{nextAt=0;round++;if(round>=3)fin();else{sy=startY;shot=false;t0=performance.now()/1000;Sx.textContent=`${round+1} / 3번째 해`;Gd.textContent='해가 수평선을 막 벗어나는 순간에 찰칵!'}};
  Btn.onclick=snap;const onKey=e=>{if(e.code==='Space'){e.preventDefault();snap()}};addEventListener('keydown',onKey);
  const fin=()=>{if(done)return;done=true;removeEventListener('keydown',onKey);const Q=Math.round(score.reduce((a,b)=>a+b,0)/Math.max(1,score.length));const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('naksan_sunrise',Q,'의상대 해돋이 찍기')}catch(e){}window.__NSQ=Q;
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffc890">해돋이 사진 평균 ${Q}점</b><div style="font-size:13px;margin:4px 0">동해는 수평선이 넓게 트여 해가 바다에서 바로 솟아요. 의상대와 홍련암은 그 해돋이를 보러 오는 사람들로 새해마다 붐벼요.</div><div style="font-size:26px;color:#f0a060">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#f0a060;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__NSSUN(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},600)};
  const loop=()=>{if(!d.isConnected){removeEventListener('keydown',onKey);sun.visible=glow.visible=false;path.material.opacity=0;return}const now=performance.now()/1000;
   if(!done&&!shot){sy=startY+(now-t0)*RISE*(1+round*.25);if(sy>endY){score.push(0);shot=true;Gd.textContent='해가 너무 높이 떴어요';nextAt=now+1.2}}if(!done&&shot&&nextAt&&now>nextAt)advance();
   sun.position.set(SX,sy,UZ);glow.position.set(SX-2,sy,UZ);const vis=Math.max(0,Math.min(1,(sy+R)/(2*R)));sunM.color.setRGB(1,.42+vis*.4,.16+vis*.3);path.material.opacity=vis*.45;
   requestAnimationFrame(loop)};loop();
  window.__NSG={snap,get sy(){return sy},R,get round(){return round},get shot(){return shot}};try{ctx.say('곧 해가 떠요! 수평선을 벗어나는 순간을 찍어요.',2.4)}catch(e){}};
 /* 발굴 탐지 */
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'연꽃무늬 수막새',h:'처마 끝 기와예요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.05,20),M(0x5a5a58));m.rotation.x=Math.PI/2;g.add(m)})},
  {n:'녹은 동종 조각',h:'2005년 산불 때 낙산사 동종(보물)이 녹아내렸어요. 지금 종은 다시 만든 거예요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.DodecahedronGeometry(.14,0),M(0x4a5a48,{metalness:.6}));m.scale.y=.5;g.add(m)})},
  {n:'고려 청자 조각',h:'고려 때 절에서 쓰던 청자 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.18,14,8,0,2,Math.PI/2,Math.PI/2),M(0x8ab8a0,{roughness:.25,side:THREE.DoubleSide})))})},
  {n:'조개껍데기',h:'바닷가 절이라 땅속에서 조개껍데기도 나와요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.12,12,8,0,Math.PI*2,0,Math.PI/2),M(0xe8dcc8,{side:THREE.DoubleSide}));m.scale.y=.4;g.add(m)})},
  {n:'철 화살촉',h:'바닷가를 지키던 군사의 화살촉이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.ConeGeometry(.04,.22,4),M(0x3a3a3e,{metalness:.6}));m.rotation.z=Math.PI/2;g.add(m)})}];
 window.__NSDIG=()=>{window.__DETECT&&window.__DETECT({key:'naksan_dig',title:'낙산사 발굴 탐지',emoji:'⛏️',bg:'#1e2428',count:4,TL:150,cand:[[-60,30],[-70,-10],[-20,30],[-20,-40],[-64,-36],[-80,20],[-16,44],[-36,-44]],items:ITEMS,intro:'낙산사 땅속에 옛 절의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'낙산사는 신라부터 이어 온 절이라 여러 시대 유물이 함께 나와요.'})};
 const meta={quest:{t:'낙산사 둘러보기',d:'동해 바닷가 절을 둘러보세요.',steps:[['낙산사','낙산사'],['의상대','의상대'],['홍련암','홍련암'],['석탑','칠층석탑']]},
  title:'양양 낙산사',hint:'동해 바닷가 벼랑 위 낙산사를 공개 수치로 간추려 지었어요. 의상대에서 해돋이를 찍고, 바위 턱의 홍련암도 보러 가요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:true,sign:{x:-30,z:18,lines:['양양 낙산사','의상대 · 홍련암','칠층석탑 · 원통보전','간추려 지음']}},
  npc:[['science',[[-36,12],[-28,12],[-28,22],[-36,22]]]],bounds:[-120,2,-100,100],level:()=>'낙산사',camCap:()=>Infinity,baseAt:(x,z)=>H(x,z),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:-40,oz:0,draw(g,X,Z,S){g.fillStyle='#5f8a3a';g.fillRect(0,0,300,300);g.fillStyle='#2f6a8a';g.fillRect(X(3),0,300,300);g.fillStyle='#7a7468';g.fillRect(X(-4),0,7*S,300);g.fillStyle='#9a3a26';g.fillRect(X(-49),Z(7.5),10*S,15*S);g.beginPath();g.arc(X(UX),Z(UZ),3*S,0,7);g.fill();g.fillRect(X(HX-2.6),Z(HZ+3.3),5.2*S,6.6*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-70,z:0,yaw:Math.PI/2},size:{}},meta)}
