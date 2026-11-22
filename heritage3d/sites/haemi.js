/* 서산 해미읍성. 단위 1 = 1m(성 크기는 줄여 지음), 진남문(남문)이 +z, 동헌 구역이 -z.
   갱신 2026-11-15. 배치는 드론 실측 3D(lacomi1975, Sketchfab, CC BY 4.0)의 성곽 모양과 관아·객사·옥사 자리를 본떠 줄임.
   실측 스캔은 하늘에서 찍어 눈높이에선 뭉개지므로 건물은 공용 부품(hallkit·hanokkit)으로 새로 짓고, 스캔은 '하늘에서 본 해미읍성' 축소 모형으로 둔다.
   사실 출처: 국가유산 사적, 서산시 안내(1417~1421 축성, 둘레 약 1.8km, 1963 사적 지정, 회화나무 약 300년). */
import * as THREE from 'three';
import {tex,noise,mulb,materials} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {placeHanok,hanokWall,getModel} from './hanokkit.js';
import {plantBroad} from './treekit.js';
import {chogaHut} from './vernacular.js';import {buildMarket} from './market.js';
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
export function buildHaemi(opts={}){const mini=!!opts.mini;const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(417);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
 const TOUCH=matchMedia('(pointer:coarse)').matches;
 /* ---------- 성곽 크기: 타원(가로 A, 세로 B), 높이 H, 윗길 폭 TW, 안쪽 흙 비탈 폭 SL ---------- */
 const A=58,B=42,H=5,TW=2.6,SL=5;
 /* ---------- 땅: 성 안 잔디, 바깥 들 ---------- */
 const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#78964a';q.fillRect(0,0,w,h);noise(q,w,h,9000,['#86a656','#6a8a40','#90ae5e','#7a8c48'],2)});GT.wrapS=GT.wrapT=THREE.RepeatWrapping;GT.repeat.set(70,50);
 {const gr=new THREE.Mesh(new THREE.PlaneGeometry(280,200),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 흙길: 마당 바닥보다 2cm 위 얇은 판, 1m 단위 반복 무늬 */
 const DT=tex(256,256,(q,w,h)=>{q.fillStyle='#c8b28a';q.fillRect(0,0,w,h);noise(q,w,h,6000,['#b8a07a','#d6c29c','#a8916c','#cdb994'],2);for(let i=0;i<40;i++){q.fillStyle='rgba(120,100,70,.35)';q.beginPath();q.arc(r()*w,r()*h,1+r()*2.5,0,7);q.fill()}});DT.wrapS=DT.wrapT=THREE.RepeatWrapping;
 const pathM=new THREE.MeshStandardMaterial({map:DT,roughness:1,polygonOffset:true,polygonOffsetFactor:-2});
 const road=(x0,z0,x1,z1,w=3.2)=>{const L=Math.hypot(x1-x0,z1-z0);const t=DT.clone();t.needsUpdate=true;t.repeat.set(w/2,L/2);const m=new THREE.Mesh(new THREE.PlaneGeometry(w,L),pathM.clone());m.material.map=t;m.rotation.x=-Math.PI/2;m.rotation.z=-Math.atan2(x1-x0,z1-z0)+Math.PI;m.position.set((x0+x1)/2,.02,(z0+z1)/2);m.receiveShadow=true;G.add(m);/* 꺾이는 곳 둥근 마감 */for(const[x,z]of[[x0,z0],[x1,z1]]){const c=new THREE.Mesh(new THREE.CircleGeometry(w/2,20),m.material);c.rotation.x=-Math.PI/2;c.position.set(x,.021,z);G.add(c)}};
 road(0,B+14,0,B+4,4);road(0,B-4,0,2,4);road(0,2,-6,0,3.2);road(0,8,22,-4,3);road(0,14,20,12,2.6);road(-6,0,-6,-3,3.2);road(-6,-18.3,-6,-16,2.2);road(-6,B-13,0,B-10,2.4);road(0,2,A-TW-SL-3,0,3);road(0,2,-(A-TW-SL-3),0,3);
 /* ---------- 성벽 ---------- */
 /* 성돌: 아래는 큰 막돌, 위로 갈수록 작은 돌(해미읍성 바깥 면처럼). 텍스처 한 장 = 성벽 높이 전체, 가로 4m 반복 */
 const WT=tex(512,512,(q,w,h)=>{q.fillStyle='#4a443c';q.fillRect(0,0,w,h);let y=h;let row=0;while(y>0){const rh=Math.max(34,92-row*9)+r()*10;let x=-r()*60;while(x<w){const bw=rh*(1.1+r()*.9);const g=135+(r()*45|0),wa=r()*14;q.fillStyle=`rgb(${g+wa|0},${g-4|0},${g-16|0})`;q.beginPath();q.roundRect(x+3,y-rh+3,bw-6,rh-6,10+r()*8);q.fill();q.fillStyle='rgba(255,255,255,.08)';q.fillRect(x+8,y-rh+6,bw-16,5);q.fillStyle='rgba(0,0,0,.14)';q.fillRect(x+6,y-10,bw-12,5);for(let k=0;k<26;k++){const gv=r()<.5?60:210;q.fillStyle=`rgba(${gv},${gv-4},${gv-10},${.07+r()*.1})`;q.fillRect(x+6+r()*(bw-12),y-rh+6+r()*(rh-12),2+r()*4,2+r()*3)}/* 이끼 */if(row<2&&r()<.35){q.fillStyle='rgba(80,110,50,.25)';q.beginPath();q.ellipse(x+bw/2,y-6,bw*.4,8,0,0,7);q.fill()}x+=bw}y-=rh;row++}});WT.wrapS=THREE.RepeatWrapping;
 const wallM=new THREE.MeshStandardMaterial({map:WT,roughness:.95});
 const ST=tex(256,256,(q,w,h)=>{q.fillStyle='#7c9150';q.fillRect(0,0,w,h);noise(q,w,h,7000,['#8aa25c','#6c8244','#94a868','#7a7a52'],2)});ST.wrapS=ST.wrapT=THREE.RepeatWrapping;
 const slopeM=new THREE.MeshStandardMaterial({map:ST,roughness:1});
 const TOPT=tex(128,128,(q,w,h)=>{q.fillStyle='#a89a80';q.fillRect(0,0,w,h);noise(q,w,h,2500,['#9a8c72','#b6a88c'],2)});TOPT.wrapS=TOPT.wrapT=THREE.RepeatWrapping;const topM=new THREE.MeshStandardMaterial({map:TOPT,roughness:1});
 const ell=t=>[A*Math.cos(t),B*Math.sin(t)];const nrm=t=>{const nx=B*Math.cos(t),nz=A*Math.sin(t),l=Math.hypot(nx,nz);return[nx/l,nz/l]};/* 바깥쪽 단위 법선 */
 const spd=t=>Math.hypot(A*Math.sin(t),B*Math.cos(t));/* 각도 1 당 둘레 길이 */
 /* 문: 남 진남문(큰 문), 동문, 서문. 자료: 동 남 서 세 곳에 문루 */
 const GATES=[{t:0,GW:12,name:'동문',big:false},{t:Math.PI/2,GW:15,name:'진남문',big:true},{t:Math.PI,GW:12,name:'서문',big:false}];for(const g of GATES)g.half=(g.GW/2)/spd(g.t);
 const strips=[];for(let k=0;k<GATES.length;k++){const a=GATES[k],b=GATES[(k+1)%GATES.length];strips.push([a.t+a.half,(k+1<GATES.length?b.t:b.t+Math.PI*2)-b.half])}
 const yj=new THREE.MeshStandardMaterial({map:WT.clone(),roughness:.95});yj.map.repeat.set(.4,.25);yj.map.needsUpdate=true;const capM=M(0x8a8478);
 for(const[T0,T1]of strips){const N=Math.max(8,Math.round((mini?60:220)*(T1-T0)/(Math.PI*2)));const pos=[[],[],[]],uv=[[],[],[]],idx=[[],[],[]];let arc=0,prev=null;
  /* 세 띠: 0 바깥 돌면(수직), 1 윗길, 2 안쪽 흙 비탈 */
  for(let i=0;i<=N;i++){const t=T0+(T1-T0)*i/N;const[x,z]=ell(t),[nx,nz]=nrm(t);if(prev)arc+=Math.hypot(x-prev[0],z-prev[1]);prev=[x,z];
   const rows=[[[x+nx*.35,-.3,z+nz*.35],[x,H,z]],[[x,H,z],[x-nx*TW,H,z-nz*TW]],[[x-nx*TW,H,z-nz*TW],[x-nx*(TW+SL),0,z-nz*(TW+SL)]]];
   rows.forEach((rw,k)=>{for(const[j,p]of rw.entries()){pos[k].push(...p);uv[k].push(arc/(k===0?4:2),k===0?(j?1:0):j*(k===1?1.3:2.6))}if(i>0){const b=(i-1)*2,c=i*2;idx[k].push(b,c,b+1,b+1,c,c+1)}})}
  [wallM,topM,slopeM].forEach((m,k)=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos[k],3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv[k],2));g.setIndex(idx[k]);g.computeVertexNormals();const me=new THREE.Mesh(g,m);me.material.side=THREE.DoubleSide;me.castShadow=k!==2;me.receiveShadow=true;G.add(me);if(k===0)cam.push(me)});
  /* 여장(성가퀴): 바깥 끝 낮은 담, 사이사이 총 쏘는 틈 */
  if(!mini){const L=1.9,gap=.45;const segs=[];let acc=0;prev=null;const NN=Math.round(900*(T1-T0)/(Math.PI*2));for(let i=0;i<=NN;i++){const t=T0+(T1-T0)*i/NN;const[x,z]=ell(t);if(prev)acc+=Math.hypot(x-prev[0],z-prev[1]);prev=[x,z];if(acc>=L+gap&&i<NN-2){acc=0;segs.push(t)}}
   const im=new THREE.InstancedMesh(new THREE.BoxGeometry(L,1.15,.55),yj,segs.length);const cap=new THREE.InstancedMesh(new THREE.BoxGeometry(L+.08,.12,.66),capM,segs.length);const o=new THREE.Object3D();segs.forEach((t,i)=>{const[x,z]=ell(t),[nx,nz]=nrm(t);o.position.set(x-nx*.28,H+.57,z-nz*.28);o.rotation.set(0,Math.atan2(-nz,nx)+Math.PI/2,0);o.updateMatrix();im.setMatrixAt(i,o.matrix);o.position.y=H+1.2;o.updateMatrix();cap.setMatrixAt(i,o.matrix)});im.castShadow=true;G.add(im);G.add(cap)}
  /* 부딪힘: 성벽 몸통을 따라 둥근 기둥(비탈 아래쪽까지) */
  const NC=Math.round(360*(T1-T0)/(Math.PI*2));for(let i=0;i<=NC;i++){const t=T0+(T1-T0)*i/NC;const[x,z]=ell(t),[nx,nz]=nrm(t);for(const d of[.2,1.8,3.4,5])solids.push({cx:x-nx*d,cz:z-nz*d,r:1.05,y0:0,y1:H+1.4})}}
 /* ---------- 문: 홍예(돌 무지개 문) 육축 위 문루. 그룹 안에서 +z 가 성 밖 ---------- */
 const GD=TW+SL+1.2;
 function gateAt(g){const[x,z]=ell(g.t),[nx,nz]=nrm(g.t);const ry=Math.atan2(nx,nz),cs=Math.cos(ry),sn=Math.sin(ry);const gg=new THREE.Group();gg.position.set(x,0,z);gg.rotation.y=ry;G.add(gg);
  const W2=(lx,lz)=>[x+lx*cs+lz*sn,z-lx*sn+lz*cs];
  const SL2=(x0,x1,y0,y1,z0,z1)=>{const a=W2(x0,z0),b=W2(x1,z1),c=W2(x0,z1),d=W2(x1,z0);const xs=[a[0],b[0],c[0],d[0]],zs=[a[1],b[1],c[1],d[1]];solids.push({x0:Math.min(...xs),x1:Math.max(...xs),y0,y1,z0:Math.min(...zs),z1:Math.max(...zs)})};
  const GW=g.GW,AW=g.big?4.2:3.6,AH=g.big?3.1:2.8,TOPY=H+.35;
  const sh=new THREE.Shape();sh.moveTo(-GW/2,0);sh.lineTo(-AW/2,0);sh.lineTo(-AW/2,AH);sh.absarc(0,AH,AW/2,Math.PI,0,true);sh.lineTo(AW/2,0);sh.lineTo(GW/2,0);sh.lineTo(GW/2-.25,TOPY);sh.lineTo(-GW/2+.25,TOPY);sh.closePath();
  const gt=WT.clone();gt.needsUpdate=true;gt.repeat.set(.25,1/TOPY);gt.wrapT=THREE.RepeatWrapping;const gm=new THREE.MeshStandardMaterial({map:gt,roughness:.95});
  const geo=new THREE.ExtrudeGeometry(sh,{depth:GD,bevelEnabled:false,curveSegments:28});geo.translate(0,0,-GD/2);const gate=new THREE.Mesh(geo,gm);gate.position.set(0,0,-GD/2+.6);gate.castShadow=gate.receiveShadow=true;gg.add(gate);cam.push(gate);
  /* 육축 위 바닥(문루 마루 둘레) */{const tp=box(GW-.5,.12,GD,topM);tp.position.set(0,TOPY+.06,-GD/2+.6);gg.add(tp)}
  /* 홍예 테두리 무지개돌 + 문설주 돌 */{const rm=M(0xb8b0a0,{roughness:.85});const n=g.big?13:11;for(let i=0;i<n;i++){const a=Math.PI-i/(n-1)*Math.PI;const k=box(.5,.36,.4,rm);k.position.set(Math.cos(a)*(AW/2+.18),AH+Math.sin(a)*(AW/2+.18),.62);k.rotation.z=a-Math.PI/2;gg.add(k)}for(const sx of[-1,1])for(let y=0;y<AH;y+=.62){const k=box(.42,.58,.4,rm);k.position.set(sx*(AW/2+.18),y+.29,.62);gg.add(k)}}
  /* 나무 문짝 두 짝(활짝 열려 홍예 안 벽에 붙음, 쇠 띠) */if(!mini){const dm=M(0x6a4428,{roughness:.8}),iron=M(0x2b2a28,{metalness:.5,roughness:.5});for(const sx of[-1,1]){const d=box(.14,AH+.4,AW/2,dm);d.position.set(sx*(AW/2-.12),(AH+.4)/2,-1.5);gg.add(d);for(let y=.4;y<AH;y+=.7){const st=box(.16,.06,AW/2-.1,iron);st.position.set(sx*(AW/2-.12),y,-1.5);gg.add(st)}}}
  /* 육축 부딪힘(홍예 길만 비움) */SL2(-GW/2,-AW/2,0,H+2,-GD+.6,.6);SL2(AW/2,GW/2,0,H+2,-GD+.6,.6);SL2(-AW/2,AW/2,AH,H+2,-GD+.6,.6);
  /* 문루: 사방 트임, 팔작지붕 */gg.add(buildHall({x:0,z:-GD/2+.6,W:g.big?9:7.4,D:g.big?5:4.4,nx:3,nz:2,FY:TOPY,PH:g.big?3.1:2.8,roof:'hip',...(g.big?{name:'鎭南門'}:{}),/* 진남문 현판(동·서문 이름은 확인 전이라 비움) */pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',rail:true,stairs:'none',mini,solids:[],light:false}).group);
  return{gg,W2}}
 const GS=gateAt(GATES[1]),GE=gateAt(GATES[0]),GWs=gateAt(GATES[2]);const GZ=B;
 {const p=GS.W2(0,4.2);spots.push({x:p[0],y:0,z:p[1],r:2.6,t:'진남문',h:'해미읍성의 남쪽 정문이에요. 돌을 무지개처럼 둥글게 쌓은 홍예문 위에 나무 문루를 올렸어요. 성 밖에서 들어오는 사람은 모두 이 문을 지났어요.'})}
 {const p=GE.W2(0,-GD-1.6);spots.push({x:p[0],y:0,z:p[1],r:2.4,t:'동문',h:'해미읍성의 동쪽 문이에요. 해미읍성에는 동쪽, 남쪽, 서쪽 세 곳에 문루가 있어요.'})}
 {const p=GWs.W2(0,-GD-1.6);spots.push({x:p[0],y:0,z:p[1],r:2.4,t:'서문',h:'해미읍성의 서쪽 문이에요. 서문 밖 순교성지에는 천주교 순교자를 기리는 순교현양비가 서 있어요.'})}
 /* 각자성석: 진남문 양쪽 성돌에 새긴 고을 이름(밖에서 보아 오른쪽 公州, 왼쪽 淸州) */
 if(!mini){const carve=t=>{const c=document.createElement('canvas');c.width=256;c.height=160;const q=c.getContext('2d');q.fillStyle='#b9b0a0';q.fillRect(0,0,256,160);noise(q,256,160,1800,['#a89e8c','#c6bdae'],2);q.font='bold 96px "Noto Serif KR",serif';q.textAlign='center';q.fillStyle='rgba(255,255,255,.35)';q.fillText(t,130,118);q.fillStyle='#5a5246';q.fillText(t,128,116);const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshStandardMaterial({map:tx,roughness:.95})};
  for(const[sx,t]of[[1,'公州'],[-1,'淸州']]){const st=box(1.15,.72,.12,carve(t));st.position.set(sx*5.2,1.25,.64);GS.gg.add(st)}
  const p=GS.W2(5.2,2.6);spots.push({x:p[0],y:0,z:p[1],r:2,t:'고을 이름 새긴 성돌',h:'진남문 양쪽 성돌에 공주, 청주 같은 고을 이름이 새겨져 있어요. 고을마다 맡아 쌓은 구간을 표시한 것이라고 해요.'})}
 /* 탱자나무 울타리: 성벽 바깥 발치 가시 덤불(가을이라 노란 탱자 열매) */
 if(!mini){const pts=[];for(const[T0,T1]of strips){const L=(T1-T0)*spd((T0+T1)/2);const n=Math.round(L/1.15);for(let i=1;i<n;i++){const t=T0+(T1-T0)*i/n;const[x,z]=ell(t),[nx,nz]=nrm(t);pts.push([x+nx*(1.5+r()*.5),z+nz*(1.5+r()*.5),.7+r()*.35])}}
  const bm=M(0x3f5a2c,{roughness:1,flatShading:true});const bush=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,1),bm,pts.length);const fm=M(0xe8c23a,{roughness:.6});const fr=new THREE.InstancedMesh(new THREE.SphereGeometry(.07,8,6),fm,pts.length*3);const o=new THREE.Object3D();let fi=0;
  pts.forEach(([x,z,s],i)=>{o.position.set(x,s*.55,z);o.rotation.set(r(),r()*6,r());o.scale.set(s,s*.8,s);o.updateMatrix();bush.setMatrixAt(i,o.matrix);for(let k=0;k<3;k++){const a=r()*Math.PI*2,e=r()*.9;o.position.set(x+Math.cos(a)*s*.85*Math.cos(e),s*.55+Math.sin(e)*s*.6,z+Math.sin(a)*s*.85*Math.cos(e));o.rotation.set(0,0,0);o.scale.setScalar(1);o.updateMatrix();fr.setMatrixAt(fi++,o.matrix)}});bush.castShadow=true;G.add(bush);G.add(fr);
  /* 가시: 가는 막대 몇 개씩 */const tm=M(0x2f3f20);const th=new THREE.InstancedMesh(new THREE.CylinderGeometry(.008,.02,.35,4),tm,pts.length*4);let ti=0;pts.forEach(([x,z,s])=>{for(let k=0;k<4;k++){const a=r()*Math.PI*2;o.position.set(x+Math.cos(a)*s*.95,s*(.3+r()*.6),z+Math.sin(a)*s*.95);o.rotation.set(r()*2-1,0,r()*2-1);o.scale.setScalar(1);o.updateMatrix();th.setMatrixAt(ti++,o.matrix)}});G.add(th);
  {const t=Math.PI/2+.22;const[x,z]=ell(t),[nx,nz]=nrm(t);spots.push({x:x+nx*4.4,y:0,z:z+nz*4.4,r:2.4,t:'탱자나무 울타리',h:'성벽 둘레에 가시가 많은 탱자나무를 심어 적이 다가오지 못하게 막았다고 전해요. 지금은 거의 남아 있지 않아요.'})}}
 spots.push({x:-14,y:0,z:B-8.6,r:2.6,t:'해미읍성 성벽',h:'조선 초 1417년(태종 17)에 쌓기 시작한 성이에요. 충청도의 군사를 지휘하는 병영이 있던 곳이라 성이 크고 단단해요. 둘레는 약 1.8km, 높이는 약 5m예요. 바깥은 돌로 쌓고 안쪽은 흙으로 비탈지게 다졌어요. 1963년 사적으로 지정됐어요.'});
 /* ---------- 동헌 구역: 담장, 바깥 대문, 동헌 ---------- */
 const DX=-6,DZ=-8;{hanokWall(G,solids,DX-11,DZ+7,DX-2.2,DZ+7,{TOUCH});hanokWall(G,solids,DX+2.2,DZ+7,DX+11,DZ+7,{TOUCH});hanokWall(G,solids,DX-11,DZ+7,DX-11,DZ-9,{TOUCH});hanokWall(G,solids,DX+11,DZ+7,DX+11,DZ-9,{TOUCH});hanokWall(G,solids,DX-11,DZ-9,DX-2,DZ-9,{TOUCH});hanokWall(G,solids,DX+2,DZ-9,DX+11,DZ-9,{TOUCH});
  /* 바깥 대문: 한 칸 맞배 대문(두 짝 문 열림) */{G.add(buildHall({x:DX,z:DZ+7,W:4.2,D:2.2,nx:1,nz:1,FY:.35,PH:2.9,roof:'gable',pillar:0x7a4a2a,bracket:'jusim',front:'open',back:'open',left:'wall',right:'wall',stairs:'none',mini,solids,light:false}).group);const dm=M(0x8a5a34,{roughness:.8});for(const sx of[-1,1]){const d=box(.1,2.5,1.75,dm);d.position.set(DX+sx*1.9,1.6,DZ+7+.9);G.add(d)}}
  G.add(buildHall({x:DX,z:DZ-2.5,W:13,D:6.6,nx:5,nz:2,FY:.9,PH:3.6,roof:'hip',pillar:0x7a4a2a,bracket:'ik',front:'door',back:'wall',left:'wall',right:'wall',mini,solids,light:true}).group);
  spots.push({x:DX,y:0,z:DZ+3.2,r:2.6,t:'동헌',h:'병영의 우두머리가 일을 보던 관청 건물이에요. 군사 일과 재판도 여기서 했어요. 젊은 시절의 이순신도 이 병영에서 군관으로 열 달 남짓 근무했다는 기록이 있어요.'});
  /* 내아: 동헌 서쪽 좁은 문 너머 살림집 */if(!mini){placeHanok(G,solids,'nongga',DX-21,DZ-1,0,{TOUCH});hanokWall(G,solids,DX-29,DZ+6,DX-13,DZ+6,{TOUCH});hanokWall(G,solids,DX-29,DZ+6,DX-29,DZ-9,{TOUCH});hanokWall(G,solids,DX-29,DZ-9,DX-11,DZ-9,{TOUCH})}
  spots.push({x:DX-21,y:0,z:DZ+3.8,r:2.4,t:'내아',h:'동헌 서쪽 좁은 문을 지나면 나오는 관리 가족의 살림집이에요. 일하는 동헌과 사는 내아를 담으로 나눴어요.'})}
 /* ---------- 청허정: 동헌 뒤 계단 위 뒷동산 정자 ---------- */
 const QX=-6,QZ=-30,QH=2.4,QR=6;{const mound=new THREE.Mesh(new THREE.CylinderGeometry(QR,QR+.9,QH,28),new THREE.MeshStandardMaterial({map:GT,roughness:1}));mound.position.set(QX,QH/2,QZ);mound.receiveShadow=true;G.add(mound);solids.push({cx:QX,cz:QZ,r:QR,y0:0,y1:QH});
  /* 돌계단(동헌 뒤에서 남쪽으로 내려옴) */const stM=M(0xa8a090);for(let i=0;i<11;i++){const y=(i+1)*QH/11,z=QZ+QR+.9+(10-i)*.5;const st=box(2.2,y,.5,stM);st.position.set(QX,y/2,z);st.receiveShadow=true;G.add(st);S(QX-1.1,QX+1.1,0,y,z-.25,z+.25)}for(const sx of[-1,1]){const cw=box(.3,QH+.3,5.8,stM);cw.position.set(QX+sx*1.25,(QH+.3)/2,QZ+QR+3.4);G.add(cw);S(QX+sx*1.25-.15,QX+sx*1.25+.15,0,QH+.6,QZ+QR+.5,QZ+QR+6.3)}
  G.add(buildHall({x:QX,z:QZ-1,W:5,D:4,nx:2,nz:2,FY:QH+.5,PH:2.6,roof:'hip',pillar:0x7a4a2a,bracket:'ik',front:'open',back:'open',left:'open',right:'open',rail:true,railGap:[-.8,.8],stairs:'front',mini,solids,light:false}).group);
  if(!mini)plantBroad(G,[[QX-6,QH,QZ-4,1,1.1,0x4f7a38],[QX+5.5,QH,QZ-3,2,1,0x5a8a40],[QX-4,QH,QZ+4,3,.9,0x4a7034],[QX+4.5,QH,QZ+4.5,4,1.05,0x5f8a3e]]);
  spots.push({x:QX,y:QH,z:QZ+4.2,r:2.4,t:'청허정',h:'동헌 뒤편 계단을 오르면 나오는 뒷동산의 정자예요. 읍성 안이 한눈에 내려다보여요.'})}
 /* ---------- 객사: 가운데 정청(높은 맞배) + 양쪽 익헌 ---------- */
 const KX=22,KZ=-10;{G.add(buildHall({x:KX,z:KZ,W:7.2,D:6,nx:3,nz:2,FY:1.1,PH:4.2,roof:'gable',pillar:0x9a3a26,bracket:'ik',front:'door',back:'wall',left:'wall',right:'wall',mini,solids,light:false}).group);
  for(const sx of[-1,1])G.add(buildHall({x:KX+sx*7.6,z:KZ+.3,W:7.8,D:5.4,nx:3,nz:2,FY:.8,PH:3.3,roof:'hip',pillar:0x9a3a26,bracket:'ik',front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',mini,solids,light:false}).group);
  spots.push({x:KX,y:0,z:KZ+5.4,r:2.6,t:'객사',h:'임금을 상징하는 전패를 모시고, 나랏일로 온 관리가 묵던 건물이에요. 가운데 정청 지붕이 양쪽 날개 건물(익헌)보다 높아요. 고을 관리들은 이곳에서 임금께 예를 올렸어요.'})}
 /* ---------- 옥사: 담장 두른 옥, 초가 옥방 둘 ---------- */
 const OX=27,OZ=13,OR=6.5;{const wm=new THREE.MeshStandardMaterial({map:(()=>{const t=WT.clone();t.needsUpdate=true;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(.35,.45);return t})(),roughness:.95});const N=40;for(let i=0;i<N;i++){const a=i/N*Math.PI*2;if(Math.abs(Math.atan2(Math.sin(a-Math.PI),Math.cos(a-Math.PI)))<.22)continue;/* 서쪽(-x)이 들어가는 문 */const x=OX+Math.cos(a)*OR,z=OZ+Math.sin(a)*OR;const w=box(OR*2*Math.PI/N+.08,2.3,.5,wm);w.position.set(x,1.15,z);w.rotation.y=-a+Math.PI/2;G.add(w);const cp=box(OR*2*Math.PI/N+.14,.16,.9,MT.tile||M(0x4a4f58));cp.position.set(x,2.38,z);const rd=box(OR*2*Math.PI/N+.14,.14,.3,M(0x3a3e44));rd.position.set(x,2.5,z);rd.rotation.y=-a+Math.PI/2;G.add(rd);cp.rotation.y=-a+Math.PI/2;G.add(cp);solids.push({cx:x,cz:z,r:.5,y0:0,y1:3})}
  if(!mini)for(const[dx,dz,ry]of[[1.2,-2.2,0],[1.2,2.4,Math.PI]]){const h=chogaHut(4.6,2.2,1.9);h.position.set(OX+dx,0,OZ+dz);h.rotation.y=ry;G.add(h);S(OX+dx-2.6,OX+dx+2.6,0,3,OZ+dz-1.4,OZ+dz+1.4);/* 옥방 앞 나무 살창 */const bm=M(0x5a3a22);for(let k=-1.9;k<=1.9;k+=.32){const b=box(.08,1.6,.08,bm);b.position.set(OX+dx+k,1.05,OZ+dz+(ry?-1.2:1.2));G.add(b)}}
  spots.push({x:OX-OR-1.6,y:0,z:OZ,r:2.4,t:'옥사',h:'죄인을 가두던 옥이에요. 조선 후기 천주교 박해 때 많은 신자들이 이곳에 갇혀 문초를 받았어요. 옛터를 발굴해 다시 지었어요.'})}
 /* ---------- 회화나무: 약 300년 된 큰 나무 ---------- */
 const HX=13,HZ=13;{const BT=tex(256,512,(q,w,h)=>{q.fillStyle='#3e3428';q.fillRect(0,0,w,h);for(let i=0;i<70;i++){const x=Math.random()*w;q.strokeStyle=['#2a221a','#54473a','#4a3e30','#1e1812'][i%4];q.lineWidth=2+Math.random()*7;q.beginPath();q.moveTo(x,0);for(let y=0;y<=h;y+=32)q.lineTo(x+Math.sin(y*.03+i)*7,y);q.stroke()}noise(q,w,h,5000,['#5e5040','#2c241c','#6a5a48'],2)});BT.wrapS=BT.wrapT=THREE.RepeatWrapping;BT.repeat.set(2,1.5);
  const bark=new THREE.MeshStandardMaterial({map:BT,roughness:1,color:0x9a8a78});
  /* 줄기: 밑동이 퍼지고 울퉁불퉁한 고목 */const tg=new THREE.CylinderGeometry(.8,1.35,4.6,20,10);{const P=tg.attributes.position;for(let i=0;i<P.count;i++){const x=P.getX(i),y=P.getY(i),z=P.getZ(i);const a=Math.atan2(z,x);const k=1+.13*Math.sin(a*5+y*1.3)+.07*Math.sin(a*11-y*2.1)+(y<-1.6?(-1.6-y)*.35:0);P.setX(i,x*k);P.setZ(i,z*k)}tg.computeVertexNormals()}
  const tr=new THREE.Mesh(tg,bark);tr.position.set(HX,2.3,HZ);tr.castShadow=true;G.add(tr);solids.push({cx:HX,cz:HZ,r:1.2,y0:0,y1:6});
  /* 굵은 가지: 옆으로 비스듬히 뻗음(철사를 매던 가지 이야기) */for(const[a,l,t]of[[.4,5.2,.85],[2.3,4.6,.9],[3.9,5.4,.8],[5.3,4.2,.95]]){const b=new THREE.Mesh(new THREE.CylinderGeometry(.22,.42,l,8),bark);b.position.set(HX+Math.cos(a)*l*.32,4.4+Math.cos(t)*l*.3,HZ+Math.sin(a)*l*.32);b.rotation.set(0,-a,0);b.rotateZ(-t);b.castShadow=true;G.add(b)}
  if(!mini)plantBroad(G,[[HX+1.6,3.2,HZ-1,.4,1.35,0x5d7f3c],[HX-1.8,3.6,HZ+1.2,2.1,1.25,0x56763a],[HX+.4,4.4,HZ+2,3.7,1.15,0x648640],[HX-.8,3.4,HZ-2.2,5.2,1.2,0x5a7a3c]]);
  /* 둘레: 낮은 원형 돌 화단(보호수 둘레석) */{const ringT=WT.clone();ringT.needsUpdate=true;ringT.wrapS=ringT.wrapT=THREE.RepeatWrapping;ringT.repeat.set(3,.18);const rm=new THREE.MeshStandardMaterial({map:ringT,roughness:.95,side:THREE.DoubleSide});const ring=new THREE.Mesh(new THREE.CylinderGeometry(2.45,2.5,.45,40,1,true),rm);ring.position.set(HX,.22,HZ);ring.castShadow=ring.receiveShadow=true;G.add(ring);const cap=new THREE.Mesh(new THREE.RingGeometry(2.25,2.55,40).rotateX(-Math.PI/2),M(0xa89a80,{side:THREE.DoubleSide}));cap.position.set(HX,.46,HZ);G.add(cap);const soil=new THREE.Mesh(new THREE.CircleGeometry(2.3,32).rotateX(-Math.PI/2),M(0x6a5236,{roughness:1}));soil.position.set(HX,.05,HZ);G.add(soil);solids.push({cx:HX,cz:HZ,r:2.5,y0:0,y1:.5})}
  spots.push({x:HX-3.2,y:0,z:HZ+2,r:2.4,t:'회화나무',h:'수령 약 300년으로 짐작되는 회화나무예요. 천주교 박해 때 이 나무 가지에 신자들을 매달아 고문했다는 이야기가 전해요. 마을에서는 호야나무라고도 불러요.'})}
 /* ---------- 하늘에서 본 해미읍성: 드론 실측 3D 축소 모형 ---------- */
 const MX=-11,MZ=B-13;{const tb=box(5.2,.9,4,M(0x8a6a48));tb.position.set(MX,.45,MZ);G.add(tb);S(MX-2.7,MX+2.7,0,1.3,MZ-2.1,MZ+2.1);const top=box(5,.06,3.8,M(0xd8cfbc));top.position.set(MX,.93,MZ);G.add(top);
  if(!mini)getModel('haemi/scan_mini').then(s=>{if(!s)return;const o=s.clone();o.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o),sz=b.getSize(V(0,0,0));const sc=4.1/Math.max(sz.x,sz.z);o.scale.setScalar(sc);o.position.set(-(b.min.x+b.max.x)/2*sc,-b.min.y*sc,-(b.min.z+b.max.z)/2*sc);const g=new THREE.Group();g.position.set(MX,.96,MZ);g.rotation.y=SCAN_RY;g.add(o);G.add(g)});
  spots.push({x:MX,y:0,z:MZ+3,r:2.2,t:'하늘에서 본 해미읍성',h:'드론으로 찍은 사진으로 만든 실제 해미읍성 3D예요. 둥근 성곽 안에 관아와 객사, 옥사, 숲이 어떻게 놓였는지 한눈에 보여요. 이 마당은 이 배치를 줄여서 지었어요. (3D: lacomi1975, Sketchfab, CC BY 4.0)'})}
 /* ---------- 민속가옥: 성 안 동남쪽 초가 몇 채 ---------- */
 if(!mini){for(const[x,z,ry,w]of[[-30,14,.3,5],[-36,6,-.2,4.4],[-24,22,.1,4.6]]){const h=chogaHut(w,2.6,2);h.position.set(x,0,z);h.rotation.y=ry;G.add(h);solids.push({cx:x,cz:z,r:w*.5+.2,y0:0,y1:3.4})}
  spots.push({x:-30,y:0,z:18.4,r:2.4,t:'민속가옥',h:'읍성 안에 옛 모습대로 다시 지은 초가예요. 병영 둘레에 살던 사람들의 살림집 모습을 보여 줘요.'})}
 /* 뒷동산 소나무 숲 */if(!mini){const L=[];for(let i=0;i<14;i++){const a=r()*Math.PI*2,d=8+r()*9;const x=QX-10+Math.cos(a)*d*1.3,z=QZ+2+Math.sin(a)*d*.6;if(Math.hypot(x-QX,z-QZ)<QR+1||Math.abs(x-QX)<2.4&&z>QZ)continue;if((x/(A-8))**2+(z/(B-8))**2>1)continue;L.push([x,0,z,r()*6,.9+r()*.35,0x4a7034])}plantBroad(G,L)}
/* ---------- 성 안 장터와 민가 (2026-11-16): 남문 길 동쪽에 장터 거리, 서남·동남에 초가 살림집 ---------- */
 if(!mini){try{buildMarket(G,solids,[],[{x:8.6,z0:13,z1:30,face:-1,k:4}],{seed:19})}catch(e){console.warn('해미 장터',e)}
  const jar=M(0x5a3420,{roughness:.35}),fence=M(0x7a6448,{roughness:1}),stn=M(0x9a948a,{roughness:1});
  const yard=(x,z,ry,w)=>{const h=chogaHut(w,2.4,1.9);h.position.set(x,0,z);h.rotation.y=ry;G.add(h);solids.push({cx:x,cz:z,r:w*.5+.2,y0:0,y1:3.4});
   const c=Math.cos(ry),s=Math.sin(ry),P=(lx,lz)=>[x+lx*c+lz*s,z-lx*s+lz*c];
   /* 장독대: 낮은 돌단 위 크고 작은 독 */{const [jx,jz]=P(w*.5+1.2,-.6);const bd=box(1.4,.25,1,stn);bd.position.set(jx,.12,jz);bd.rotation.y=ry;G.add(bd);for(const[dx,dz,sc]of[[-.4,-.2,1],[.15,-.25,.85],[.45,.2,.7],[-.2,.25,.75]]){const [px,pz]=P(w*.5+1.2+dx,-.6+dz);const o=new THREE.Mesh(new THREE.SphereGeometry(.26*sc,12,8),jar);o.scale.y=1.15;o.position.set(px,.25+.27*sc,pz);o.castShadow=true;G.add(o);const lid=new THREE.Mesh(new THREE.CylinderGeometry(.17*sc,.2*sc,.06,12),jar);lid.position.set(px,.25+.56*sc,pz);G.add(lid)}solids.push({cx:jx,cz:jz,r:.8,y0:0,y1:1})}
   /* 싸리 울타리: 앞마당 둘레(앞쪽은 사립문 자리 비움) */for(const[lx0,lz0,lx1,lz1]of[[-w*.5-.8,1.6,-w*.5-.8,4.2],[w*.5+.8,1.6,w*.5+.8,4.2],[-w*.5-.8,4.2,-.9,4.2],[.9,4.2,w*.5+.8,4.2]]){const L=Math.hypot(lx1-lx0,lz1-lz0),n=Math.max(2,Math.round(L/.18));for(let i=0;i<=n;i++){const u=i/n,[px,pz]=P(lx0+(lx1-lx0)*u,lz0+(lz1-lz0)*u);const st=new THREE.Mesh(new THREE.CylinderGeometry(.025,.03,.85+((i*7)%5)*.04,5),fence);st.position.set(px,.43,pz);G.add(st)}const [ax,az]=P((lx0+lx1)/2,(lz0+lz1)/2);const rail=box(L,.04,.04,fence);rail.position.set(ax,.6,az);rail.rotation.y=ry+Math.atan2(-(lz1-lz0),lx1-lx0);G.add(rail);const [bx0,bz0]=P(lx0,lz0),[bx1,bz1]=P(lx1,lz1);S(Math.min(bx0,bx1)-.08,Math.max(bx0,bx1)+.08,0,1,Math.min(bz0,bz1)-.08,Math.max(bz0,bz1)+.08)}
   /* 마당 빨랫줄과 멍석 */{const [mx,mz]=P(-.6,2.6);const ms=box(1.6,.03,1.1,M(0xb89a62,{roughness:1}));ms.position.set(mx,.02,mz);ms.rotation.y=ry+.2;G.add(ms)}};
  for(const[x,z,ry,w]of[[-42,14,.9,4.6],[-18,31,.1,4.2],[21,28,-.2,4.6],[31,24,-.6,4.2]])yard(x,z,ry,w);/* 성벽 안쪽 둔덕(타원 0.7 밖)에 걸리지 않게 */
  spots.push({x:2.6,y:0,z:21.5,r:2.6,t:'읍성 장터',h:'읍성 안에는 관아만 있지 않았어요. 성 안팎 백성이 모여 쌀, 소금, 옹기, 피륙을 사고팔았어요. 해미 장은 내포 지방 사람들이 모이는 큰 장이었다고 해요. (본떠 지은 연출)'});
  spots.push({x:25,y:0,z:30,r:2.6,t:'초가 살림집',h:'흙벽에 볏짚 지붕을 얹은 초가예요. 앞마당에 장독대와 싸리 울타리를 두고, 멍석을 펴 곡식을 말렸어요. (본떠 지은 연출)'})}
/* ---------- 나무: 성 안 몇 그루 ---------- */
 if(!mini)plantBroad(G,[[-24,0,8,1,1,0x5a8a40],[-30,0,-2,2,1.1,0x4f7a38],[30,0,-2,3,.95,0x5f8a3e],[34,0,8,4,1,0x56843c],[-20,0,16,5,.9,0x5a8a40],[8,0,-26,6,1,0x4f7a38],[22,0,-22,1,1.1,0x5a8a40],[-26,0,-24,2,1,0x4a7034]]);
 const tick=()=>{};
 /* 발굴 탐지(11/22 N21): 볼거리 둘레 맨땅(지붕·성벽 위·물속·단 위 빼고 3m 넘게 떨어진 곳)에 묻어 둠 */spots.push({x:-3,y:0,z:B+8,r:2.4,t:'발굴 탐지 자리',h:'이 마당 흙 속에 옛 물건이 묻혀 있대요. 무이 탐지기로 찾아 봐요.'});window.__HMDIG=()=>{const base=spots.filter(q=>q.t!=='발굴 탐지 자리'&&!(q.y>.5));const cand=[];base.forEach(q=>{for(const a of[0,2.1,4.2]){const r2=(q.r||2)+1.2;cand.push([q.x+Math.cos(a+q.x)*r2,q.z+Math.sin(a+q.z)*r2])}});try{const H=window.__H3;const ok=cand.filter(([x,z])=>{const f1=H.floorAt(x,z,2.2),f2=H.floorAt(x,z,40);return isFinite(f1)&&f1>-.15&&f1<.5&&Math.abs(f2-f1)<.3});const sp2=[];for(const c of ok)if(sp2.every(d=>Math.hypot(d[0]-c[0],d[1]-c[1])>3))sp2.push(c);if(sp2.length>=5)cand.splice(0,cand.length,...sp2)}catch(e){}window.__DETECT&&window.__DETECT({key:'haemi_dig',title:'해미읍성 발굴 탐지',emoji:'⛏️',bg:'#24201a',count:4,TL:150,cand,items:[{n:'성벽 돌 조각',h:'성벽을 쌓던 다듬은 돌 조각이에요.',mk:()=>{const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.BoxGeometry(.3,.14,.2),M(0x9a948a)));return g}},{n:'화살촉',h:'병영 군사의 쇠 화살촉이에요.',mk:()=>{const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.ConeGeometry(.04,.16,4),M(0x4a4440,{metalness:.5})));return g}},{n:'분청사기 조각',h:'조선 초 분청사기 그릇 조각이에요.',mk:()=>{const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.CylinderGeometry(.15,.1,.08,16,1,true,0,2.2),M(0xa8a490,{side:THREE.DoubleSide})));return g}},{n:'기와 조각',h:'관아 지붕의 기와 조각이에요.',mk:()=>{const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.04,20,1,true,0,2),M(0x5a5a54,{side:THREE.DoubleSide})));return g}},{n:'엽전',h:'조선 상평통보예요.',mk:()=>{const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,.015,18),M(0x6a5a30,{metalness:.6})));return g}}],intro:'해미읍성 흙 속에 옛 읍성의 흔적이 묻혀 있대요. 탐지기로 찾아 봐요!',okText:'해미읍성은 조선 때 충청 병마절도사 영이 있던 성으로, 성 안 관아·객사 자리를 발굴해 다시 지었어요.'})};
 const meta={quest:{t:'해미읍성 순례',d:'성벽과 진남문을 지나 읍성 안 여덟 곳을 찾아 보세요.',steps:[['진남문','진남문'],['하늘에서 본 해미읍성','하늘에서 본 해미읍성'],['성벽','해미읍성 성벽'],['회화나무','회화나무'],['옥사','옥사'],['객사','객사'],['동헌','동헌'],['청허정','청허정']],done:'진남문부터 청허정까지 해미읍성을 다 둘러봤어요.'},
  title:'서산 해미읍성',hint:'충청도 병영이 있던 서산 해미읍성이에요. 진남문 홍예문으로 들어가 실측 축소 모형을 보고, 회화나무와 옥사, 객사, 동헌, 뒷동산 청허정까지 걸어 보세요. (배치: 드론 실측 3D lacomi1975, Sketchfab, CC BY 4.0 · 건물은 본떠 지음)',
  env:{plaza:null,beds:false,trees:true,groundY:0,sign:{x:6,z:44,lines:['서산 해미읍성','진남문 · 성벽 · 동헌 · 객사','옥사 · 회화나무 · 청허정','1417년 쌓기 시작한 충청 병영성']},treeAvoid:(x,z)=>(x/(A+6))**2+(z/(B+6))**2<1||Math.abs(x)<5&&z>0},
  npc:[['carpenter',[[-3,0,B-12],[3,0,B-12]]],['science',[[MX+3,0,MZ-2],[MX+5,0,MZ+1]]],['painter',[[KX-3,0,KZ+7],[KX+3,0,KZ+7]]]],
  baseAt:()=>0,
  level:P=>P.y>1.6&&Math.hypot(P.x-QX,P.z-QZ)<8?'청허정 뒷동산':Math.abs(P.x-DX)<11&&P.z<DZ+7&&P.z>DZ-9?'동헌':Math.hypot(P.x-OX,P.z-OZ)<OR?'옥사':(P.x/A)**2+(P.z/B)**2<1?'읍성 안':'성 밖',
  camCap:P=>/* 동헌 바로 앞(처마 아래까지): 뒤돌아서면 카메라가 동헌 지붕 속으로 들어가던 것 */(Math.abs(P.x-DX)<7.5&&P.z>DZ+.4&&P.z<DZ+4.6&&P.y<2)?2.2:Infinity,tick,
  mini:{S:2.1,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#7aa04e';g.fillRect(0,0,300,300);g.strokeStyle='#9a9284';g.lineWidth=S*2.4;g.beginPath();g.ellipse(X(0),Z(0),A*S,B*S,0,0,7);g.stroke();g.fillStyle='#c8b28a';g.fillRect(X(-1.5),Z(-4),3*S,(B+8)*S);g.fillStyle='#8a5a34';g.fillRect(X(DX-6.5),Z(DZ-6),13*S,7*S);g.fillRect(X(KX-11),Z(KZ-3),22*S,6*S);g.strokeStyle='#b8ac94';g.lineWidth=S;g.beginPath();g.arc(X(OX),Z(OZ),OR*S,0,7);g.stroke();g.fillStyle='#4f7a38';g.beginPath();g.arc(X(HX),Z(HZ),3*S,0,7);g.fill();g.beginPath();g.arc(X(QX),Z(QZ),8*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:B+12,yaw:Math.PI},size:{}},meta)}
const SCAN_RY=-.35;/* 스캔 축소 모형 방향(진남문이 +z 를 보게): 시험 뒤 맞춤 */
