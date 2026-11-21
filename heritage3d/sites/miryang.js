/* 밀양 영남루 마당(2026-11-21): 공개 실측 3D(CC BY)가 없어 공개 수치로 간추려 지음.
   영남루(국보, 2023 국보로 다시 지정): 밀양강 벼랑 위 누각, 정면 5칸·옆면 4칸 팔작지붕, 서쪽 침류각과 층층각(계단 복도), 동쪽 능파각. 1844년 다시 지음.
   벼랑 아래 아랑각(아랑 전설), 밀양 아리랑의 고장. 놀이: 밀양강 나룻배 노 젓기(물살을 이기고 영남루 아래 나루까지), 발굴 탐지, 밤 누각 불빛과 강물 달빛. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildMiryang(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1844);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 남쪽 둔치(z>30) 평지, 강(z -6~28), 북쪽 벼랑(z<-10) 높이 10m. 서쪽에 벼랑 오르는 비탈길 */
 const BH=10,RZ0=-6,RZ1=28,WY=-1.2;
 const ss=t=>t<=0?0:t>=1?1:t*t*(3-2*t);
 const H=(x,z)=>{if(z>RZ1+2)return 0;if(z>RZ0-1)return z>RZ1?ss((z-RZ1)/2)*0+(z-RZ1)/2*0:WY-.3;let h=BH*ss((RZ0-1-z)/5);/* 서쪽 비탈길 */if(x>-44&&x<-36){const t=Math.max(0,Math.min(1,(RZ0-1-z)/22));h=Math.min(h,BH*t)}return h};
 const Hb=(x,z)=>{if(x>-57.6&&x<-52.4&&z>RZ0-1&&z<RZ1+.5)return .3;return Math.max(WY-.3,H(x,z))};
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(300,200,150,140);g.rotateX(-Math.PI/2);g.translate(0,0,-10);const p=g.attributes.position;const col=[];const c=new THREE.Color();
  for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);let h=H(x,z);const cliff=z<RZ0-1&&z>RZ0-7&&!(x>-44&&x<-36);if(z>RZ0-1&&z<RZ1+2)h=WY-1.5;p.setY(k,h);c.set(cliff?'#8a8070':(x>-44&&x<-36&&z<RZ0)?'#b49a6e':'#6f8c40');if(z>RZ1&&z<RZ1+6)c.set('#c8b890');col.push(c.r,c.g,c.b)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1,flatShading:true}));m.receiveShadow=true;G.add(m)}
 /* 벼랑 바위 */{const RT=tex(256,256,(q,w,h)=>{q.fillStyle='#7a7060';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=90+(r()*70|0);q.fillStyle=`rgba(${v},${v-6},${v-16},.5)`;q.fillRect(r()*w,r()*h,2+r()*4,1+r()*3)}},[2,2]);const rm=new THREE.MeshStandardMaterial({map:RT,roughness:.95,flatShading:true});for(let i=0;i<22;i++){const x=-34+i*6+(r()-.5)*2;if(x>-44&&x<-36)continue;const s=new THREE.Mesh(new THREE.DodecahedronGeometry(3+r()*1.6,1),rm);s.scale.set(1.7,1.1+r()*.4,.8);s.position.set(x,BH*.3,RZ0-3.4+(r()-.5));s.rotation.y=r()*3;s.castShadow=s.receiveShadow=true;G.add(s)}}
 /* 밀양강 */const WT=tex(256,256,(q,w,h)=>{q.fillStyle='#3f6f7a';q.fillRect(0,0,w,h);for(let i=0;i<260;i++){q.strokeStyle=`rgba(200,230,240,${.08+r()*.12})`;q.lineWidth=1+r()*2;const x=r()*w,y=r()*h;q.beginPath();q.moveTo(x,y);q.lineTo(x+20+r()*30,y);q.stroke()}},[10,4]);
 const river=new THREE.Mesh(new THREE.PlaneGeometry(320,RZ1-RZ0+6),new THREE.MeshStandardMaterial({map:WT,roughness:.12,metalness:.15}));river.rotation.x=-Math.PI/2;river.position.set(0,WY,(RZ0+RZ1)/2);G.add(river);
 const RS=[{x0:-160,x1:-57.6,y0:-3,y1:1.5,z0:RZ0-1,z1:RZ1},{x0:-52.4,x1:160,y0:-3,y1:1.5,z0:RZ0-1,z1:RZ1}];solids.push(...RS);
 /* 나무다리(서쪽, 걸어서 건너기) */{const wm=M(0x7a5a38);const dk=new THREE.Mesh(new THREE.BoxGeometry(4,.3,RZ1-RZ0+3),wm);dk.position.set(-55,.15,(RZ0+RZ1)/2);dk.receiveShadow=true;G.add(dk);for(let z=RZ0;z<=RZ1;z+=4)for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,3,6),wm);p.position.set(-55+s*1.8,-1,z);G.add(p);const rl=new THREE.Mesh(new THREE.BoxGeometry(.1,.9,.1),wm);rl.position.set(-55+s*1.9,.75,z);G.add(rl)}for(const s of[-1,1]){const rr=new THREE.Mesh(new THREE.BoxGeometry(.08,.08,RZ1-RZ0+3),wm);rr.position.set(-55+s*1.9,1.2,(RZ0+RZ1)/2);G.add(rr)}}
 /* 영남루 본루 + 침류각 + 능파각 (벼랑 위) */
 const LX=0,LZ=-22;
 if(!mini){const add=(spec,y)=>{const h=buildHall(Object.assign({solids:[],light:false,mini},spec));h.group.position.y=y;G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)});return h};
  add({x:LX,z:LZ,W:17,D:12.5,nx:5,nz:4,FY:.8,PH:3.6,loft:{h:2.8,stone:false},roof:'hip',name:'嶺南樓',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',rail:true,stairs:'none'},BH);
  add({x:LX-16.5,z:LZ+1,W:8,D:6.4,nx:3,nz:2,FY:.5,PH:3,loft:{h:1.6},roof:'hip',name:'枕流閣',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',rail:true,stairs:'none',roofScale:.85},BH-1.2);
  add({x:LX+15,z:LZ+.5,W:7,D:6,nx:2,nz:2,FY:.5,PH:3,loft:{h:1.8},roof:'hip',name:'凌波閣',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',rail:true,stairs:'none',roofScale:.85},BH);
  /* 층층각: 본루와 침류각을 잇는 계단 지붕 복도 */{const g=new THREE.Group();const wm=M(0x9a3a26),rf=M(0x4a4a50);for(let i=0;i<5;i++){const x=LX-9.2-i*1.4,y=BH+3.4-i*.36;for(const z of[LZ-1.2,LZ+1.6]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.12,.14,3.2,8),wm);p.position.set(x,y-1.2,z);g.add(p)}const roof=new THREE.Mesh(new THREE.BoxGeometry(1.6,.2,3.6),rf);roof.position.set(x,y+.6,LZ+.2);roof.rotation.x=0;g.add(roof);const fl=new THREE.Mesh(new THREE.BoxGeometry(1.5,.12,2.8),M(0x8a6a48));fl.position.set(x,y-2.6,LZ+.2);g.add(fl)}G.add(g)}}
 for(const[x0,x1,z0,z1]of[[LX-8.8,LX+8.8,LZ-6.6,LZ+6.6],[LX-20.6,LX-12.4,LZ-2.4,LZ+4.4],[LX+11.4,LX+18.6,LZ-2.6,LZ+3.6]])solids.push({x0,x1,y0:BH,y1:BH+3,z0,z1});
 /* 아랑각(벼랑 아래 서쪽 대숲 속 사당) */{const sm=M(0x9a3a26);const AX=-26,AZ=RZ0-1.5;const h=buildHall({x:AX,z:AZ-2,ry:0,W:4.6,D:3.6,nx:1,nz:1,FY:.5,PH:2.6,roof:'hip',name:'阿娘祠',pillar:0x9a3a26,bracket:'ik',front:'door',solids:[],light:false,roofScale:.8,mini});h.group.position.y=Math.max(0,H(AX,AZ-2));if(!mini)G.add(h.group);
  const bm=M(0x5a8a3a);for(let i=0;i<40;i++){const x=AX-6+r()*12,z=AZ-5+r()*3;const b=new THREE.Mesh(new THREE.CylinderGeometry(.05,.06,6,5),bm);b.position.set(x,H(x,z)+3,z);G.add(b)}}
 /* 남쪽 나루·나룻배 */
 const DOCK_S=[0,RZ1+.5],DOCK_N=[2,RZ0+.2];
 {const wm=M(0x7a5a38);for(const[dx,dz,len]of[[DOCK_S[0],DOCK_S[1],5],[DOCK_N[0],DOCK_N[1],3]]){const d=new THREE.Mesh(new THREE.BoxGeometry(3,.25,len),wm);d.position.set(dx,0,dz+(dz>0?-len/2+1:len/2-1));G.add(d)}}
 const boat=new THREE.Group();{const hull=new THREE.Mesh(new THREE.BoxGeometry(1.6,.5,4.2),M(0x8a6a44));hull.position.y=.05;boat.add(hull);for(const s of[-1,1]){const sd=new THREE.Mesh(new THREE.BoxGeometry(.12,.35,4.2),M(0x6a4a2a));sd.position.set(s*.8,.35,0);boat.add(sd)}const bow=new THREE.Mesh(new THREE.ConeGeometry(.8,1.2,4),M(0x8a6a44));bow.rotation.x=-Math.PI/2;bow.rotation.y=Math.PI/4;bow.scale.set(1,1,.35);bow.position.set(0,.05,-2.6);boat.add(bow);
  for(const s of[-1,1]){const oar=new THREE.Group();const st=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,2.6,6),M(0x6a4a2a));st.rotation.z=Math.PI/2;st.position.x=s*1.3;oar.add(st);const bl=new THREE.Mesh(new THREE.BoxGeometry(.5,.04,.24),M(0x6a4a2a));bl.position.x=s*2.5;oar.add(bl);oar.position.set(0,.45,.2);oar.name='oar'+(s<0?'L':'R');boat.add(oar)}}
 boat.position.set(DOCK_S[0]+2.6,WY+.15,DOCK_S[1]-3);G.add(boat);
 /* 밤: 누각 불빛·나루 등·강물 달빛 */
 const NL=[];if(!mini){for(const[x,y,z,k]of[[LX,BH+4,LZ,10],[LX-16.5,BH+2.5,LZ+1,6],[LX+15,BH+3,LZ,6],[DOCK_S[0]-2,1.8,DOCK_S[1]+2,6],[-40,BH*.5+2,RZ0-10,5]]){const L=new THREE.PointLight(0xffc080,0,26,1.4);L.position.set(x,y,z);G.add(L);const lp=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),new THREE.MeshStandardMaterial({color:0xf4e8c8,emissive:0}));lp.position.set(x,y-.6,z);G.add(lp);NL.push({L,lp,k})}}
 const moon=new THREE.Mesh(new THREE.PlaneGeometry(3,30),new THREE.MeshBasicMaterial({color:0xfff0c8,transparent:true,opacity:0,depthWrite:false}));moon.rotation.x=-Math.PI/2;moon.position.set(-10,WY+.03,(RZ0+RZ1)/2);G.add(moon);
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const l of NL){l.L.intensity=nk*l.k;l.lp.material.emissive.setRGB(nk,nk*.8,nk*.5)}moon.material.opacity=nk*.22};
 /* 안내 */
 const sp=(x,z,rr,t,h)=>spots.push({x,y:Hb(x,z),z,r:rr,t,h});
 sp(LX,LZ+8.4,3.6,'영남루','밀양강 벼랑 위에 선 누각이에요(국보). 진주 촉석루·평양 부벽루와 함께 조선 3대 누각으로 꼽혀요. 지금 건물은 1844년에 다시 지었고, 2023년 국보로 다시 지정됐어요. 정면 5칸·옆면 4칸, 서쪽 침류각과 층층각, 동쪽 능파각이 날개처럼 이어져요. 간추려 지었어요.');
 sp(LX-16.5,LZ+6,2.6,'침류각과 층층각','본루보다 낮은 침류각을 계단처럼 층층이 내려가는 지붕 복도 층층각이 이어 줘요. 땅 높낮이를 그대로 살린 짜임이에요.');
 sp(-26,RZ0-1.5,3,'아랑각','억울하게 죽은 밀양 부사의 딸 아랑의 넋을 달래는 사당이에요. 밀양 아리랑의 「날 좀 보소」가 아랑 이야기에서 나왔다는 말도 전해요.');
 sp(DOCK_S[0]-3,DOCK_S[1]+3,2.4,'밀양강 나루','나룻배를 저어 강 건너 영남루 아래까지 가 봐요.');
 sp(20,RZ1+8,2.4,'발굴 탐지 자리','밀양 읍성 둘레 땅속에 유물이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 나룻배 노 젓기(11/21): 왼노·오른노를 번갈아 저어 물살(동쪽으로 흐름)을 이기고 북쪽 영남루 나루까지. 90초 */
 let BOAT=null;window.__MYROW=()=>{if(document.getElementById('myP'))return;const H3=window.__H3,ctx=H3.ctx();
  BOAT={x:DOCK_S[0]+2.6,z:DOCK_S[1]-3};for(const q of RS)q.y1=-2.9;let bx=DOCK_S[0]+2.6,bz=DOCK_S[1]-3,yaw=0,vx=0,vz=0,vr=0,done=false,strokes=0,t0=performance.now()/1000,last=t0,lastSide='',swL=0,swR=0;const TL=90,CUR=.7;
  window.__GCAM=()=>{if(!document.getElementById('myP'))return null;const cx=bx+Math.sin(yaw)*7,cz=bz+Math.cos(yaw)*7;return[cx,4.2,cz,bx-Math.sin(yaw)*4,WY+.5,bz-Math.cos(yaw)*4,55]};
  const d=document.createElement('div');d.id='myP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1e2a30;border:3px solid #8ac0d0;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef6f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#bfe8f8">🚣 밀양강 나룻배</b><div id="myS" style="font:18px 'Do Hyeon',sans-serif;margin:4px 0">영남루 나루까지 0%</div><div id="myG" style="font-size:13px;color:#bfe8f8">왼노·오른노를 번갈아 저어요</div><div style="display:flex;gap:8px;margin:6px 0"><button id="myL" style="flex:1;font:18px 'Do Hyeon',sans-serif;background:#8ac0d0;color:#10202a;border:0;border-radius:12px;padding:12px 0;cursor:pointer">◀ 왼노</button><button id="myR" style="flex:1;font:18px 'Do Hyeon',sans-serif;background:#8ac0d0;color:#10202a;border:0;border-radius:12px;padding:12px 0;cursor:pointer">오른노 ▶</button></div><div id="myT" style="font-size:13px">${TL}초</div><div style="font-size:12px;opacity:.85">물살이 동쪽으로 흘러요. 한쪽만 저으면 배가 돌아요 (키보드 ←→)</div>`;
  const Sx=d.querySelector('#myS'),Gd=d.querySelector('#myG'),T=d.querySelector('#myT');
  const splash=()=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,len=.25;const b=AC.createBuffer(1,AC.sampleRate*len,AC.sampleRate),dd=b.getChannelData(0);for(let i=0;i<dd.length;i++)dd[i]=(Math.random()*2-1)*Math.pow(1-i/dd.length,2);const src=AC.createBufferSource();src.buffer=b;const f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=900;const gg=AC.createGain();gg.gain.value=.12;src.connect(f).connect(gg).connect(ctx.out()||AC.destination);src.start(s)}catch(e){}};
  const stroke=side=>{if(done)return;strokes++;const alt=side!==lastSide;lastSide=side;const k=alt?1:.55;vx+=-Math.sin(yaw)*1.05*k;vz+=-Math.cos(yaw)*1.05*k;vr+=(side==='L'?-1:1)*.32;if(side==='L')swL=1;else swR=1;splash()};
  d.querySelector('#myL').onclick=()=>stroke('L');d.querySelector('#myR').onclick=()=>stroke('R');const onKey=e=>{if(e.code==='ArrowLeft'){e.preventDefault();stroke('L')}else if(e.code==='ArrowRight'){e.preventDefault();stroke('R')}};addEventListener('keydown',onKey,true);
  const total=(DOCK_S[1]-3)-(DOCK_N[1]+1.6);
  const fin=ok=>{if(done)return;done=true;removeEventListener('keydown',onKey,true);const el=performance.now()/1000-t0;const prog=Math.max(0,Math.min(1,((DOCK_S[1]-3)-bz)/total));const Q=ok?Math.max(70,Math.round(100-Math.max(0,el-35)*.8)):Math.round(prog*65);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('miryang_row',Q,'밀양강 나룻배')}catch(e){}window.__MYQ=Q;
   if(ok){try{ctx.say('영남루 나루에 닿았어요!',1.6)}catch(e){}}
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#bfe8f8">${ok?'영남루 나루 도착!':'강을 '+Math.round(prog*100)+'% 건넜어요'}</b><div style="font-size:13px;margin:4px 0">다리가 놓이기 전 밀양 사람들은 나룻배로 밀양강을 건너 영남루 아래로 오갔어요. 영남루에 오르면 굽이도는 강과 들판이 한눈에 보여요.</div><div style="font-size:26px;color:#8ac0d0">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-u style="font:15px 'Do Hyeon',sans-serif;background:#8ac0d0;color:#10202a;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">영남루 오르기</button><button data-a style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef6f8;border:2px solid #eef6f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">한 번 더</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__MYROW(),60)};d.querySelector('[data-u]').onclick=()=>{d.remove();try{H3.tp(LX,LZ+9,BH);H3.face(0)}catch(e){}}},ok?1200:600)};
  const loop=()=>{if(!d.isConnected){BOAT=null;for(const q of RS)q.y1=1.5;removeEventListener('keydown',onKey,true);boat.position.set(DOCK_S[0]+2.6,WY+.15,DOCK_S[1]-3);boat.rotation.set(0,0,0);return}const now=performance.now()/1000,dt=Math.min(.05,now-last);last=now;
   if(!done){vx*=Math.pow(.55,dt);vz*=Math.pow(.55,dt);vr*=Math.pow(.25,dt);bx+=(vx+CUR*(bz<RZ1-1.5&&bz>RZ0+1.5?1:.2))*dt;bz+=vz*dt;yaw+=vr*dt;bz=Math.min(DOCK_S[1]-3,Math.max(RZ0+1.2,bz));bx=Math.max(-60,Math.min(60,bx));
    const dn=Math.hypot(bx-DOCK_N[0],bz-(DOCK_N[1]+1.6));if(dn<3.2)fin(true);
    const prog=Math.max(0,Math.min(1,((DOCK_S[1]-3)-bz)/total));Sx.textContent='영남루 나루까지 '+Math.round(prog*100)+'%';Gd.textContent=Math.abs(bx-DOCK_N[0])>14?'물살에 떠내려가요! 서쪽(왼쪽)으로 머리를 돌려요':'왼노·오른노를 번갈아 저어요';
    const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin(false)}
   boat.position.set(bx,WY+.15+Math.sin(now*2)*.04,bz);boat.rotation.set(Math.sin(now*1.7)*.03,yaw,Math.sin(now*1.3)*.03);swL=Math.max(0,swL-dt*3);swR=Math.max(0,swR-dt*3);const oL=boat.getObjectByName('oarL'),oR=boat.getObjectByName('oarR');if(oL)oL.rotation.y=-Math.sin(swL*Math.PI)*.6;if(oR)oR.rotation.y=Math.sin(swR*Math.PI)*.6;
   BOAT.x=bx;BOAT.z=bz+.6;try{const P=H3.P;P.x=bx;P.z=bz+.6}catch(e){}
   requestAnimationFrame(loop)};loop();
  window.__MYG={stroke,get bx(){return bx},get bz(){return bz},get yaw(){return yaw}};try{ctx.say('나룻배를 저어 강 건너 영남루까지 가 봐요!',2.4)}catch(e){}};
 /* 발굴 탐지 */
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'밀양 읍성 기와',h:'영남루 옆 밀양 읍성 건물에 얹었던 기와 조각이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.3,12,1,true,0,Math.PI),M(0x5a5a58,{side:THREE.DoubleSide}));m.rotation.z=Math.PI/2;g.add(m)})},
  {n:'상평통보',h:'조선 후기 엽전이에요. 나룻배 삯도 엽전으로 냈어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})},
  {n:'백자 접시',h:'관아에서 쓰던 흰 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'놋숟가락',h:'놋쇠로 만든 숟가락이에요.',mk:mk(g=>{const s=new THREE.Mesh(new THREE.BoxGeometry(.32,.015,.03),M(0xc8a040,{metalness:.8,roughness:.3}));g.add(s);const b=new THREE.Mesh(new THREE.SphereGeometry(.05,10,6),M(0xc8a040,{metalness:.8}));b.scale.y=.3;b.position.x=.18;g.add(b)})},
  {n:'그물추',h:'밀양강에서 물고기를 잡던 그물 끝 돌추예요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.12,10,8),M(0x7a7468));m.scale.set(1.3,.7,1);g.add(m)})}];
 window.__MYDIG=()=>{window.__DETECT&&window.__DETECT({key:'miryang_dig',title:'밀양 발굴 탐지',emoji:'⛏️',bg:'#1e2a2a',count:4,TL:150,cand:[[20,RZ1+8],[34,RZ1+14],[-14,RZ1+10],[6,RZ1+20],[-30,RZ1+16],[44,RZ1+6],[-46,RZ1+24],[16,RZ1+28]],items:ITEMS,intro:'영남루 건너 둔치 땅속에 옛 물건이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'밀양은 강을 낀 읍성 고을이라 관아와 나루, 고기잡이 흔적이 함께 나와요.'})};
 const meta={quest:{t:'영남루 둘러보기',d:'밀양강과 영남루를 둘러보세요.',steps:[['나루','밀양강 나루'],['영남루','영남루'],['침류각','침류각과 층층각'],['아랑각','아랑각']]},
  title:'밀양 영남루',hint:'밀양강 벼랑 위 영남루를 공개 수치로 간추려 지었어요. 나룻배를 저어 강을 건너고, 서쪽 비탈길로 올라 누각에서 강을 내려다봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,groundY:-4,sign:{x:8,z:RZ1+6,lines:['밀양 영남루','국보 · 조선 3대 누각','밀양강 · 아랑각','간추려 지음']}},
  npc:[['science',[[-6,RZ1+6],[6,RZ1+6],[6,RZ1+12],[-6,RZ1+12]]]],bounds:[-80,80,-60,70],level:()=>'영남루',camCap:()=>Infinity,baseAt:(x,z)=>{if(BOAT&&Math.hypot(x-BOAT.x,z-BOAT.z)<2.5)return WY+.35;return Hb(x,z)},
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.4,ox:0,oz:4,draw(g,X,Z,S){g.fillStyle='#6f8c40';g.fillRect(0,0,300,300);g.fillStyle='#3f6f7a';g.fillRect(0,Z(RZ1),300,(RZ1-RZ0)*S);g.fillStyle='#8a8070';g.fillRect(0,Z(RZ0-1),300,6*S);g.fillStyle='#9a3a26';g.fillRect(X(-8.5),Z(LZ+6),17*S,12*S);g.fillStyle='#b49a6e';g.fillRect(X(-44),Z(RZ0),8*S,22*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:6,z:RZ1+14,yaw:Math.PI},size:{}},meta)}
