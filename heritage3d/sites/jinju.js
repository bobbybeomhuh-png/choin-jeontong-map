/* 진주성 촉석루와 무기고. 단위 1 = 1m, 입구 +z, 남강은 -z 쪽 절벽 아래.
   갱신 2026-11-12. 촉석루·성벽·의암은 진주성 배치를 본떠 지음(실측 복제 아님). 촉석루는 정면 5칸, 측면 4칸 누각, 아래층은 돌기둥.
   3D: 국가유산청(CC BY) 현자총통·사인검·활·쇠뇌·월도·판갑·화승총·팔 보호구 재현 에셋, Heat Of Fusion(CC BY) 조선 장수 갑옷 두정갑. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,noise,mulb,materials,hipRoof,brackets} from './sungnyemun.js';
import {placeHanok} from './hanokkit.js';
import {buildHall} from './hallkit.js';
const MURL=k=>new URL('../models/jinju/'+k+'.glb',import.meta.url).href;
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
export function buildJinju(opts={}){const mini=!!opts.mini;const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(71);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
 const gl=new GLTFLoader();
 function place(k,{x,y=0,z,h=null,len=null,rx=0,ry=0,rz=0}={}){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.set(rx,ry,rz);G.add(g);if(mini)return g;gl.load(MURL(k),m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;e.receiveShadow=true}});o.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o),s=b.getSize(V(0,0,0));const sc=h?h/s.y:len?len/Math.max(s.x,s.z):1;o.scale.setScalar(sc);o.position.set(-(b.min.x+b.max.x)/2*sc,-b.min.y*sc,-(b.min.z+b.max.z)/2*sc);g.add(o)},undefined,e=>console.warn('모델 못 불러옴',k,e));return g}
 const CZ=-18;/* 절벽 끝 */
 /* ---------- 땅: 성 안 잔디(절벽까지), 절벽, 남강, 건너편 ---------- */
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#6f8f45';q.fillRect(0,0,w,h);noise(q,w,h,7000,['#7fa152','#5e7d38','#86a85a'],2)});GT.wrapS=GT.wrapT=THREE.RepeatWrapping;GT.repeat.set(40,25);const gr=new THREE.Mesh(new THREE.PlaneGeometry(260,140),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.position.set(0,0,CZ+70);gr.receiveShadow=true;G.add(gr);
  const RK=tex(256,256,(q,w,h)=>{q.fillStyle='#7d766b';q.fillRect(0,0,w,h);for(let i=0;i<80;i++){const g=100+(r()*50|0);q.fillStyle=`rgb(${g},${g-4},${g-12})`;q.fillRect(r()*w,r()*h,20+r()*40,10+r()*20)}noise(q,w,h,4000,['rgba(0,0,0,.1)'],2)});RK.wrapS=RK.wrapT=THREE.RepeatWrapping;RK.repeat.set(30,1);const cliff=new THREE.Mesh(new THREE.PlaneGeometry(260,4.4),new THREE.MeshStandardMaterial({map:RK,roughness:1}));cliff.position.set(0,-2.2,CZ);G.add(cliff);
  const WT=tex(256,256,(q,w,h)=>{q.fillStyle='#3d7f8a';q.fillRect(0,0,w,h);for(let i=0;i<70;i++){q.strokeStyle='rgba(225,242,245,'+(.06+r()*.12)+')';q.lineWidth=2;q.beginPath();q.ellipse(r()*w,r()*h,10+r()*24,2+r()*3,0,0,7);q.stroke()}});WT.wrapS=WT.wrapT=THREE.RepeatWrapping;WT.repeat.set(26,8);const river=new THREE.Mesh(new THREE.PlaneGeometry(260,60),new THREE.MeshStandardMaterial({map:WT,roughness:.15,metalness:.2,color:0xd8eef0}));river.rotation.x=-Math.PI/2;river.position.set(0,-3.4,CZ-30);G.add(river);G.userData.water=WT;
  const far=new THREE.Mesh(new THREE.PlaneGeometry(260,80),new THREE.MeshStandardMaterial({map:GT,roughness:1}));far.rotation.x=-Math.PI/2;far.position.set(0,-2.6,CZ-100);G.add(far);
  /* 건너편 대숲 언덕 */if(!mini)for(let i=0;i<20;i++){const h=new THREE.Mesh(new THREE.SphereGeometry(8+r()*8,12,8,0,Math.PI*2,0,Math.PI/2),M(0x4f8a4a,{flatShading:true}));h.scale.y=.45;h.position.set(-120+i*12+r()*4,-2.6,CZ-64-r()*10);G.add(h)}}
 /* ---------- 의암: 강 위 바위 ---------- */
 {const rk=new THREE.Mesh(new THREE.DodecahedronGeometry(1.8,0),M(0x8a8478,{flatShading:true}));rk.scale.set(1.6,.6,1.2);rk.position.set(7,-3.1,CZ-7);rk.castShadow=true;G.add(rk);
  spots.push({x:7,y:0,z:CZ+1.4,r:2.2,t:'의암',h:'촉석루 아래 남강에 있는 바위예요. 임진왜란(1593) 진주성 싸움 뒤 논개가 왜장을 끌어안고 이 바위에서 강으로 뛰어들었다는 이야기가 전해요. 그래서 "의로운 바위", 의암이라 불러요.'})}
 /* ---------- 촉석루: 절벽 위 큰 누각 ---------- */
 const LX=0,LZ=CZ+6.5,W=15,D=10,H1=2.4,PH=3.6;
 /* 자세한 한옥 부품으로: 아래층 돌기둥, 위층 마루·계자난간·단청, 팔작지붕, 사방이 트인 누각 */
 const FY=.6+H1;{G.add(buildHall({x:LX,z:LZ,W,D,nx:5,nz:3,FY:.6,PH,loft:{h:H1,stone:true},roof:'hip',name:'矗石樓',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',rail:true,railGap:[-1.6,.6],stairs:'none',mini,solids,light:false}).group);
  /* 오르는 나무 계단(동쪽) */for(let i=0;i<10;i++){const sh=FY,st=box(1.6,.12,.42,M(0x8a5a34));const y=(i+1)*sh/10;st.position.set(LX+W/2+1.6,y-.06,LZ+3.6-i*.42);G.add(st);S(LX+W/2+.8,LX+W/2+2.4,0,y,LZ+3.6-i*.42-.21,LZ+3.6-i*.42+.21)}
  {const lnd=box(1.8,.12,1.4,M(0x8a5a34));lnd.position.set(LX+W/2+1.0,FY-.06,LZ-.6);G.add(lnd);S(LX+W/2+.1,LX+W/2+1.9,0,FY,LZ-1.3,LZ+.1)}
  spots.push({x:LX,y:FY,z:LZ,r:3,t:'촉석루',h:'남강 절벽 위에 선 진주성의 누각이에요. 평소엔 과거 시험장과 잔치 자리였고, 싸움 때는 장수가 지휘하던 곳이에요. 아래층은 돌기둥, 위층은 마루로 된 누각이에요. 한국전쟁 때 불타 1960년에 다시 지었어요. 계단은 동쪽에 있어요.'});
  spots.push({x:LX,y:0,z:LZ+8,r:2.6,t:'누각 앞마당',h:'계단(동쪽)으로 누각 위에 올라 남강과 의암을 내려다보세요.'})}
 /* ---------- 성벽과 여장(절벽 위) ---------- */
 {const stn=new THREE.MeshStandardMaterial({map:tex(256,128,(q,w,h)=>{q.fillStyle='#9a9284';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=32)for(let x=-(y/32%2)*30;x<w;x+=60){const g=150+(r()*40|0);q.fillStyle=`rgb(${g},${g-5},${g-14})`;q.fillRect(x+2,y+2,56,28)}}),roughness:.95});
  for(const[x0,x1]of[[-60,-10],[10,60]]){const len=x1-x0;const w=box(len,1.3,.9,stn);w.position.set((x0+x1)/2,.65,CZ+.5);G.add(w);S(x0,x1,0,9,CZ+.05,CZ+.95);for(let x=x0+1;x<x1;x+=2.2){const m=box(1.6,.6,.9,stn);m.position.set(x,1.6,CZ+.5);G.add(m)}}
  const rl=M(0x8a3a2a);const b=box(20,.1,.1,rl);b.position.set(0,1,CZ+.4);G.add(b);S(-10,10,0,9,CZ+.3,CZ+.5);
  spots.push({x:-18,y:0,z:CZ+2.4,r:2.4,t:'진주성 성벽',h:'진주성은 남강을 끼고 쌓은 성이에요. 임진왜란 때 1592년 김시민 장군이 3,800여 군사로 2만 왜군을 막아 낸 진주대첩의 현장이에요. 성벽 위 낮은 담(여장) 사이로 활과 총을 쏘았어요.'})}
 /* ---------- 현자총통 포대 ---------- */
 {const wood=M(0x6b4a2e);for(let i=0;i<3;i++){const x=-22+i*3.2,z=CZ+4.2;const cart=box(.7,.35,1.3,wood);cart.position.set(x,.45,z);G.add(cart);for(const sx of[-1,1]){const wh=new THREE.Mesh(new THREE.CylinderGeometry(.32,.32,.1,14),wood);wh.rotation.z=Math.PI/2;wh.position.set(x+sx*.42,.32,z+.2);G.add(wh)}place('cannon',{x,y:.62,z,len:.79,ry:0});solids.push({cx:x,cz:z,r:.8,y0:0,y1:1.2})}
  const bm=M(0x2d2b29,{metalness:.5,roughness:.5});for(let i=0;i<10;i++){const s=new THREE.Mesh(new THREE.SphereGeometry(.07,10,8),bm);s.position.set(-17+(i%4)*.15,.07+Math.floor(i/4)*.12,CZ+4.6+(i%2)*.12);G.add(s)}
  spots.push({x:-19,y:0,z:CZ+6.6,r:2.4,t:'현자총통',h:'조선의 화포 가운데 하나로, 길이 약 79cm예요(천자·지자·현자·황자 순으로 작아져요). 큰 화살(차대전)이나 쇠 탄환을 쏘았어요. 임진왜란 때 성과 배에서 크게 쓰였어요. (3D: 국가유산청 재현 에셋)'})}
 /* ---------- 무기고 ---------- */
 {const AX=16,AZ=6,AW=12,AD=7;const wall=M(0xf2ede2),pil=M(0x6b4a2e);const fl=box(AW+1,.45,AD+1,M(0xb3aa98));fl.position.set(AX,.22,AZ);G.add(fl);S(AX-(AW+1)/2,AX+(AW+1)/2,0,.45,AZ-(AD+1)/2,AZ+(AD+1)/2);
  const bk=box(AW,3.4,.2,wall);bk.position.set(AX,2.15,AZ-AD/2);G.add(bk);S(AX-AW/2,AX+AW/2,0,5,AZ-AD/2-.15,AZ-AD/2+.15);for(const sx of[-1,1]){const w=box(.2,3.4,AD,wall);w.position.set(AX+sx*AW/2,2.15,AZ);G.add(w);S(AX+sx*AW/2-.15,AX+sx*AW/2+.15,0,5,AZ-AD/2,AZ+AD/2)}
  for(const x of[-6,-2,2,6]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.18,.2,3.5,10),pil);p.position.set(AX+x,2.2,AZ+AD/2);G.add(p);solids.push({cx:AX+x,cz:AZ+AD/2,r:.22,y0:0,y1:5})}
  if(!mini){const rf=hipRoof(MT,AW/2+1.3,AD/2+1.3,AW/2-2,3.85,5.9,.45,.2,{plain:true,rs:.55});rf.position.set(AX,0,AZ);rf.traverse(o=>{if(o.isMesh)o.castShadow=true});G.add(rf)}
  {const cv=document.createElement('canvas');cv.width=512;cv.height=140;const q=cv.getContext('2d');q.fillStyle='#2a1a10';q.fillRect(0,0,512,140);q.strokeStyle='#d8a838';q.lineWidth=8;q.strokeRect(6,6,500,128);q.fillStyle='#f2d27a';q.textAlign='center';q.font='bold 70px "Noto Serif KR",serif';q.fillText('軍器庫 무기고',256,95);const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;const pl=new THREE.Mesh(new THREE.PlaneGeometry(2.6,.7),new THREE.MeshBasicMaterial({map:t}));pl.position.set(AX,3.55,AZ+AD/2+.25);G.add(pl)}
  const lamp=new THREE.PointLight(0xffe8c8,10,10,1.6);lamp.position.set(AX,3.2,AZ);G.add(lamp);
  /* 뒷벽 무기 걸개: 사인검, 월도, 활, 쇠뇌, 화승총 */const rack=box(10,.12,.3,M(0x5a3a22));rack.position.set(AX,1.2,AZ-AD/2+.3);G.add(rack);const rack2=rack.clone();rack2.position.y=2.4;G.add(rack2);
  place('woldo',{x:AX-3.2,y:.45,z:AZ-AD/2+.35,len:3.2,rz:Math.PI/2});place('sword',{x:AX-1.6,y:1.6,z:AZ-AD/2+.35,len:1.5});place('matchlock',{x:AX+.6,y:1.25,z:AZ-AD/2+.35,len:1.39});place('bow',{x:AX+2.4,y:1.9,z:AZ-AD/2+.4,len:1.1,ry:Math.PI/2,rz:Math.PI/2});place('crossbow',{x:AX+4.1,y:1.3,z:AZ-AD/2+.5,len:1.2,rx:-1.2});
  /* 갑옷: 두정갑(장수), 판갑과 팔 보호구 */const st=M(0x3b2414);for(const[x,k]of[[AX-4,'dujeonggap'],[AX+4,'platearmor']]){const pd=box(.9,.35,.9,st);pd.position.set(x,.45+.17,AZ+.6);G.add(pd);S(x-.5,x+.5,0,2.6,AZ+.1,AZ+1.1)}
  place('dujeonggap',{x:AX-4,y:.8,z:AZ+.6,h:1.7});place('platearmor',{x:AX+4,y:1.4,z:AZ+.6,h:.69});place('armguard',{x:AX+4,y:.8,z:AZ+.6,h:.4});
  {const pole=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.65,6),M(0x3b2414));pole.position.set(AX+4,1.1,AZ+.6);G.add(pole)}
  spots.push({x:AX-4,y:.45,z:AZ+2.2,r:1.6,t:'두정갑',h:'조선 장수가 입던 갑옷이에요. 천 안쪽에 쇠 미늘을 대고 겉에 둥근 못(두정)을 박아 "두정갑"이라 해요. 투구와 함께 붉은 비단으로 지어 위엄이 있었어요. (3D: Heat Of Fusion, CC BY)'});
  spots.push({x:AX+4,y:.45,z:AZ+2.2,r:1.6,t:'판갑',h:'쇠판을 이어 몸통을 감싼 판갑과 팔뚝을 지키는 팔 보호구예요. 오래전부터 쓰인 갑옷 방식이에요. (3D: 국가유산청 재현 에셋)'});
  spots.push({x:AX,y:.45,z:AZ-1.2,r:2,t:'무기 걸개',h:'왼쪽부터 월도(긴 자루 끝에 반달 칼날), 사인검(호랑이 기운을 담은 칼), 화승총(조총), 각궁(소뿔로 만든 조선 활), 쇠뇌예요. 조선 군사는 특히 활쏘기에 강했어요. (3D: 국가유산청 재현 에셋)'})}
 /* ---------- 성 안 건물: 공북문, 창렬사, 영남포정사(공개 3D 한옥으로) ---------- */
 if(!mini){const TOUCH=matchMedia('(pointer:coarse)').matches;placeHanok(G,solids,'gate',0,31.5,0,{hole:true,TOUCH});placeHanok(G,solids,'hall',-24,22,0,{TOUCH,walls:true});placeHanok(G,solids,'sarang',24.5,24,Math.PI,{TOUCH});
  spots.push({x:0,y:0,z:26,r:2.4,t:'공북문',h:'진주성의 정문이에요. 북쪽 임금이 계신 곳을 향해 절한다는 뜻으로 이름 지었어요. 2002년에 옛 모습대로 다시 세웠어요. (3D: 한국문화정보원 외대문, CC BY · 본떠 세움)'});
  spots.push({x:-24,y:0,z:16,r:2.4,t:'창렬사',h:'진주성 싸움에서 목숨을 바친 김시민 장군과 김천일 장군 등을 모신 사당이에요. 해마다 제사를 지내 그 뜻을 기려요. (3D 한옥: chrishong, CC BY · 본떠 세움)'});
  spots.push({x:24.5,y:0,z:17,r:2.4,t:'영남포정사',h:'조선 후기 경상우도 관찰사가 일을 보던 관아예요. 진주가 경상도 서쪽의 중심 고을이었다는 걸 보여 줘요. 지금은 문루가 남아 있어요. (3D 한옥: chrishong, CC BY · 본떠 세움)'})}
 const tick=(P,dt)=>{if(G.userData.water){G.userData.water.offset.x+=dt*.012}};
 const meta={quest:{t:'진주성 순례',d:'진주성의 이야기가 담긴 여섯 곳을 찾아 보세요.',steps:[['진주성 성벽','진주성 성벽'],['현자총통 포대','현자총통'],['촉석루 위','촉석루'],['남강의 의암','의암'],['무기고의 두정갑','두정갑'],['무기 걸개','무기 걸개']],done:'진주대첩의 성벽과 촉석루, 무기고까지 다 둘러봤어요.'},
  title:'진주성 촉석루와 무기고',hint:'남강 절벽 위 진주성이에요. 성벽과 현자총통 포대를 지나 촉석루(동쪽 계단)에 올라 의암을 내려다보고, 무기고에서 조선 장수 갑옷과 무기를 보세요. (3D: 국가유산청 재현 에셋 · Heat Of Fusion, CC BY · 건물은 본떠 지음)',
  env:{plaza:null,beds:false,trees:true,groundY:-6,sign:{x:5,z:24,lines:['진주성 촉석루와 무기고','촉석루 · 의암 · 성벽','현자총통 · 두정갑 · 무기','임진왜란 진주대첩의 성']},treeAvoid:(x,z)=>z<36&&Math.abs(x)<34||z<CZ+2},
  npc:[['metal',[[14,.45,8],[18,.45,8]]],['carpenter',[[-24,CZ+7],[-14,CZ+7]]],['science',[[-4,6],[4,6]]]],
  baseAt:(x,z)=>z<CZ?-3.4:0,
  level:P=>P.y>2.5&&Math.abs(P.x-LX)<8&&Math.abs(P.z-LZ)<5.5?'촉석루 위':Math.abs(P.x-16)<6&&Math.abs(P.z-6)<3.5?'무기고':P.z<CZ+3?'성벽 위':'진주성 안',
  camCap:P=>Math.abs(P.x-16)<6&&Math.abs(P.z-6)<3.5?3.2:Infinity,tick,
  mini:{S:3.6,ox:0,oz:-6,draw(g,X,Z,S){g.fillStyle='#7aa04e';g.fillRect(0,0,300,300);g.fillStyle='#3d7f8a';g.fillRect(0,0,300,Z(CZ));g.fillStyle='#9a9284';g.fillRect(0,Z(CZ),300,S);g.fillStyle='#8a3a2a';g.fillRect(X(LX-7.5),Z(LZ-5),15*S,10*S);g.fillStyle='#d8d0c0';g.fillRect(X(10),Z(2.5),12*S,7*S);g.fillStyle='#8a8478';g.beginPath();g.arc(X(7),Z(CZ-7),2*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:24,yaw:Math.PI},size:{}},meta)}
