/* 한양 궁궐 마당(경복궁 근정전 일대를 본뜬 실제 크기 공간). 단위 1 = 1m, 입구 +z(남쪽), 정전은 -z.
   갱신 2026-11-12. 국가유산청(KOREA HERITAGE SERVICE) 공개 3D(CC BY 4.0): 광화문 해태 한 쌍, 앙부일구, 근정전 어좌, 일월오봉도,
   근정전 향로, 어보, 궁궐 등. 건물(월대·정전·행각)과 박석·품계석은 근정전 배치를 본떠 지음(실측 복제 아님).
   근정전 실제: 정면 5칸 측면 5칸 중층 건물, 두 단 월대. 여기서는 단층 지붕으로 줄여 지음. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,noise,mulb,materials,hipRoof,brackets} from './sungnyemun.js';
const MURL=k=>new URL('../models/hanyang/'+k+'.glb',import.meta.url).href;
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
export function buildHanyang(opts={}){const mini=!!opts.mini;const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(83);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
 const add=(o,x,y,z,col=true)=>{o.position.set(x,y,z);G.add(o);if(col)o.traverse(m=>{if(m.isMesh)cam.push(m)});return o};
 const gl=new GLTFLoader();
 function place(k,{x,y=0,z,h=null,ry=0,scale=null}={}){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry;G.add(g);if(mini&&!['haetae_a','haetae_b','throne','ilwol'].includes(k))return g;
  gl.load(MURL(k),m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;e.receiveShadow=true}});o.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o),s=b.getSize(V(0,0,0));const sc=scale||(h?h/s.y:1);o.scale.setScalar(sc);o.position.set(-(b.min.x+b.max.x)/2*sc,-b.min.y*sc,-(b.min.z+b.max.z)/2*sc);g.add(o);if(!mini)o.traverse(e=>{if(e.isMesh)cam.push(e)})},undefined,e=>console.warn('모델 못 불러옴',k,e));return g}
 /* ---------- 조정 바닥: 거친 박석 ---------- */
 const PB=tex(512,512,(q,w,h)=>{q.fillStyle='#8f877a';q.fillRect(0,0,w,h);for(let i=0;i<70;i++){const x=r()*w,y=r()*h,rw=40+r()*50,rh=30+r()*40;const g=150+(r()*45|0);q.fillStyle=`rgb(${g},${g-6},${g-14})`;q.beginPath();q.moveTo(x,y);q.lineTo(x+rw,y+r()*8);q.lineTo(x+rw-r()*8,y+rh);q.lineTo(x+r()*6,y+rh-r()*6);q.closePath();q.fill()}noise(q,w,h,6000,['rgba(0,0,0,.08)','rgba(255,255,255,.06)'],2)});PB.wrapS=PB.wrapT=THREE.RepeatWrapping;PB.repeat.set(12,14);
 const yard=new THREE.Mesh(new THREE.PlaneGeometry(64,66),new THREE.MeshStandardMaterial({map:PB,roughness:1}));yard.rotation.x=-Math.PI/2;yard.position.set(0,.02,-8);yard.receiveShadow=true;G.add(yard);
 /* 가운데 삼도(임금이 다니는 가운데 길이 조금 높음) */const PT=M(0xb9b09e);for(const[x,w,hh]of[[0,3.2,.12],[-2.4,1.6,.06],[2.4,1.6,.06]]){const p=box(w,hh,40,PT);p.position.set(x,hh/2,4);G.add(p)}
 /* ---------- 품계석: 동쪽 문관, 서쪽 무관, 정1품~정9품 ---------- */
 {const ST=M(0xc2baa8);const NM=['정1품','정2품','정3품','정4품','정5품','정6품','정7품','정8품','정9품'];
  for(const sx of[-1,1])NM.forEach((n,i)=>{const z=-14+i*3.2;const s=box(.42,.9,.28,ST);s.position.set(sx*5.2,.45,z);G.add(s);solids.push({cx:sx*5.2,cz:z,r:.3,y0:0,y1:1});
   if(!mini){const cv=document.createElement('canvas');cv.width=64;cv.height=128;const q=cv.getContext('2d');q.fillStyle='#c2baa8';q.fillRect(0,0,64,128);q.fillStyle='#3b2a1c';q.font='bold 26px "Noto Serif KR",serif';q.textAlign='center';[...n].forEach((ch,j)=>q.fillText(ch,32,34+j*32));const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;const pl=new THREE.Mesh(new THREE.PlaneGeometry(.38,.76),new THREE.MeshStandardMaterial({map:t,roughness:.9}));pl.position.set(sx*5.2,.47,z+.145);G.add(pl)}});
  spots.push({x:3.4,y:0,z:-6,r:2,t:'품계석',h:'신하들이 벼슬 품계에 맞춰 서던 자리를 알리는 돌이에요. 정전을 바라보고 오른쪽(동쪽)에 문관, 왼쪽(서쪽)에 무관이 섰어요. 정1품부터 정9품까지, 높은 품계일수록 정전에 가까워요.'})}
 /* ---------- 해태 한 쌍(입구 양옆) ---------- */
 place('haetae_a',{x:8,z:30,ry:Math.PI});place('haetae_b',{x:-8,z:30,ry:Math.PI});for(const sx of[-1,1])solids.push({x0:sx*8-1.5,x1:sx*8+1.5,y0:0,y1:4,z0:29,z1:31});/* 실제처럼 문 바깥 양옆 */
 spots.push({x:5.4,y:0,z:32.4,r:2.2,t:'광화문 해태',h:'광화문 앞을 지키던 해태(해치) 한 쌍이에요. 옳고 그름을 가리고 화재를 막는다고 믿은 상상의 동물이에요. 국가유산청이 3D로 기록한 실제 해태 그대로예요. (3D: 국가유산청)'});
 /* ---------- 앙부일구(해시계) ---------- */
 {const st=box(1.1,.9,1.1,M(0xb3aa98));st.position.set(-11,.45,-2);G.add(st);solids.push({cx:-11,cz:-2,r:.8,y0:0,y1:1.4});place('angbu',{x:-11,y:.9,z:-2,scale:.001});
  spots.push({x:-11,y:0,z:.2,r:1.8,t:'앙부일구',h:'세종 때 만든 오목한 해시계예요. 솥을 하늘로 향해 놓은 모양이라 "앙부"라 불러요. 바늘 그림자로 시각과 절기를 함께 읽어요. 실제 크기 그대로 놓았어요(지름 약 35cm). (3D: 국가유산청)'})}
 /* ---------- 월대 두 단과 정전 ---------- */
 const WZ=-30,T1=1.1,T2=2.2;const WS=M(0xc4bcaa),WSd=M(0xa9a190);
 {const t1=box(34,T1,20,WSd);t1.position.set(0,T1/2,WZ);G.add(t1);const t2=box(30,T1,16,WS);t2.position.set(0,T1+T1/2,WZ-1);G.add(t2);
  /* 앞 계단(가운데 답도 포함) */for(let i=0;i<6;i++){const sh=(i+1)*T2/6;const st=box(6,sh,.42,WS);st.position.set(0,sh/2,WZ+10+(5-i)*.42+.21);G.add(st)}
  S(-17,17,0,T1,WZ-10,WZ+10);S(-15,15,0,T2,WZ-9,WZ+7);for(let i=0;i<6;i++)S(-3,3,0,(i+1)*T2/6,WZ+10+(5-i)*.42,WZ+10+(6-i)*.42);
  /* 월대 난간(돌기둥과 살대) */const RL=M(0xd2cbbb);for(const[x0,x1,z]of[[-17,-3,WZ+10],[3,17,WZ+10]]){for(let x=x0;x<=x1;x+=2){const p=box(.22,.8,.22,RL);p.position.set(x,T1+.4,z);G.add(p)}const b=box(x1-x0,.12,.12,RL);b.position.set((x0+x1)/2,T1+.72,z);G.add(b);S(x0,x1,T1,T1+1,z-.15,z+.15)}
  /* 드무(불 막는 물그릇) */for(const sx of[-1,1]){const d=new THREE.Mesh(new THREE.CylinderGeometry(.75,.6,.9,20),M(0x5a4a32,{metalness:.5,roughness:.5}));d.position.set(sx*13,T2+.45,WZ+5.5);d.castShadow=true;G.add(d);solids.push({cx:sx*13,cz:WZ+5.5,r:.8,y0:0,y1:4})}
  spots.push({x:0,y:T2,z:WZ+6.6,r:2.4,t:'월대',h:'정전을 받치는 두 단의 넓은 돌 기단이에요. 나라의 큰 의식 때 왕과 신하가 오르던 무대예요. 가운데 계단의 넓은 돌(답도)에는 원래 봉황을 새겨요. 양쪽 쇠 그릇(드무)에는 물을 담아 불귀신을 쫓는다고 믿었어요.'})}
 const HZ=WZ-2,HW=24,HD=12,HY=T2+.3,PH=6.4;
 {const pil=M(0x8a3a2a),wall=M(0xf1ece2),lat=new THREE.MeshStandardMaterial({map:tex(256,256,(q,w,h)=>{q.fillStyle='#ead9b0';q.fillRect(0,0,w,h);q.strokeStyle='#7a2f22';q.lineWidth=5;for(let i=0;i<=10;i++){q.beginPath();q.moveTo(i*w/10,0);q.lineTo(i*w/10,h);q.stroke();q.beginPath();q.moveTo(0,i*h/10);q.lineTo(w,i*h/10);q.stroke()}q.lineWidth=14;q.strokeStyle='#8a3a2a';q.strokeRect(0,0,w,h)}),roughness:.9});
  const fl=box(HW,.3,HD,M(0x9a7350));fl.position.set(0,T2+.15,HZ);G.add(fl);S(-HW/2,HW/2,0,HY,HZ-HD/2,HZ+HD/2);
  const XS=[-12,-7.2,-2.4,2.4,7.2,12],ZS=[-6,-2,2,6];for(const x of XS)for(const z of ZS){if(Math.abs(z)<3&&Math.abs(x)<10)continue;const c=new THREE.Mesh(new THREE.CylinderGeometry(.34,.38,PH,14),pil);c.position.set(x,HY+PH/2,HZ+z);c.castShadow=true;G.add(c);solids.push({cx:x,cz:HZ+z,r:.42,y0:0,y1:20})}
  for(const x of[-4.8,4.8])for(const z of[-2,2]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.4,.44,PH+1.2,14),pil);c.position.set(x,HY+(PH+1.2)/2,HZ+z);c.castShadow=true;G.add(c);solids.push({cx:x,cz:HZ+z,r:.48,y0:0,y1:20})}
  /* 뒤·옆 벽은 창호, 앞은 문을 활짝 열어 둠 */for(let i=0;i<5;i++){const x0=XS[i],x1=XS[i+1];const p=new THREE.Mesh(new THREE.PlaneGeometry(x1-x0-.7,PH-1.2),lat);p.position.set((x0+x1)/2,HY+(PH-1.2)/2,HZ-6+.05);G.add(p)}S(-HW/2,HW/2,0,20,HZ-6.3,HZ-5.8);
  for(const sx of[-1,1]){for(let j=0;j<3;j++){const z0=ZS[j],z1=ZS[j+1];const p=new THREE.Mesh(new THREE.PlaneGeometry(z1-z0-.7,PH-1.2),lat);p.rotation.y=sx*Math.PI/2;p.position.set(sx*(12-.05),HY+(PH-1.2)/2,HZ+(z0+z1)/2);G.add(p)}S(sx*12-.3,sx*12+.3,0,20,HZ-6,HZ+6)}
  const ceil=box(HW,.2,HD,M(0x2f5a46));ceil.position.set(0,HY+PH+.1,HZ);G.add(ceil);
  /* 창방 단청 띠 */const dan=M(0x2f6b55);for(const z of[-6,6]){const b=box(HW+.6,.6,.5,dan);b.position.set(0,HY+PH-.3,HZ+z);G.add(b)}for(const x of[-12,12]){const b=box(.5,.6,HD+.6,dan);b.position.set(x,HY+PH-.3,HZ);G.add(b)}
  if(!mini){const bk=brackets(MT,12.4,6.4,HY+PH+.15,1.15);bk.position.z=HZ;G.add(bk);const rf=hipRoof(MT,16.5,10.2,8.5,HY+PH+1.4,HY+PH+7.2,1.2,.5,{rs:.95});rf.position.set(0,0,HZ);rf.traverse(o=>{if(o.isMesh)o.castShadow=true});G.add(rf)}
  /* 현판 勤政殿 */{const cv=document.createElement('canvas');cv.width=640;cv.height=200;const q=cv.getContext('2d');q.fillStyle='#1d1612';q.fillRect(0,0,640,200);q.strokeStyle='#d8a838';q.lineWidth=12;q.strokeRect(8,8,624,184);q.fillStyle='#f2e6c0';q.font='bold 120px "Noto Serif KR","Batang",serif';q.textAlign='center';q.fillText('勤政殿',320,150);const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;const pl=new THREE.Mesh(new THREE.PlaneGeometry(3.6,1.1),new THREE.MeshBasicMaterial({map:t}));pl.position.set(0,HY+PH+.9,HZ+6.45);G.add(pl)}
  /* 어탑과 어좌, 일월오봉도, 향로, 등, 어보 */const AT=M(0x8a3a2a);const at=box(6,.9,3.6,AT);at.position.set(0,HY+.45,HZ-3.6);G.add(at);S(-3,3,0,HY+.9,HZ-5.4,HZ-1.8);for(let i=0;i<3;i++){const st=box(2,.3*(i+1),.35,AT);st.position.set(0,HY+.15*(i+1),HZ-1.6+(2-i)*.35);G.add(st);S(-1,1,0,HY+.3*(i+1),HZ-1.75+(2-i)*.35,HZ-1.4+(2-i)*.35)}
  place('ilwol',{x:0,y:HY+.9,z:HZ-5.2});place('throne',{x:0,y:HY+.9,z:HZ-3.9});place('lamp',{x:-2.6,y:HY+.9,z:HZ-3.4,h:1.6});place('lamp',{x:2.6,y:HY+.9,z:HZ-3.4,h:1.6});
  for(const sx of[-1,1]){const pd=box(.7,.8,.7,M(0x5a3a22));pd.position.set(sx*2.4,HY+.4,HZ);G.add(pd);solids.push({cx:sx*2.4,cz:HZ,r:.5,y0:0,y1:4});place('hyangro',{x:sx*2.4,y:HY+.8,z:HZ,h:.62})}
  {const tb=box(.9,.75,.6,M(0x8a3a2a));tb.position.set(3.6,HY+.375,HZ-1.2);G.add(tb);solids.push({cx:3.6,cz:HZ-1.2,r:.55,y0:0,y1:3});place('eobo',{x:3.6,y:HY+.75,z:HZ-1.2,h:.11})}
  const lamp=new THREE.PointLight(0xffe2b8,22,16,1.6);lamp.position.set(0,HY+5,HZ-1);G.add(lamp);
  spots.push({x:0,y:HY,z:HZ+1.4,r:2.4,t:'어좌와 일월오봉도',h:'정전 안 높은 단(어탑) 위 임금 자리(어좌)와 그 뒤 일월오봉도 병풍이에요. 해와 달, 다섯 봉우리, 소나무와 물결로 왕의 다스림이 온 세상에 미치기를 바랐어요. 어좌와 병풍, 양옆 등, 앞 향로는 근정전 유물을 3D로 기록한 국가유산청 자료예요. (3D: 국가유산청)'});
  spots.push({x:3.6,y:HY,z:HZ+.4,r:1.2,t:'어보',h:'임금의 도장(어보)이에요. 나라의 큰 문서에 찍고, 왕실의 정통을 상징했어요. (3D: 국가유산청)'});
  spots.push({x:0,y:T2,z:HZ+8.4,r:2.6,t:'정전',h:'나라의 큰 의식을 치르던 궁궐의 으뜸 건물(정전)이에요. 경복궁 근정전을 본떠 지었어요. 실제 근정전은 지붕이 두 겹인 2층 건물이고, 정면 5칸 측면 5칸이에요. 여기서는 지붕을 한 겹으로 줄였어요.'})}
 /* ---------- 행각: 마당을 둘러싼 회랑 ---------- */
 {const pil=M(0x8a3a2a),rfm=M(0x3a4048);const run=(x0,z0,x1,z1)=>{const len=Math.hypot(x1-x0,z1-z0),n=Math.round(len/3.5);for(let i=0;i<=n;i++){const x=x0+(x1-x0)*i/n,z=z0+(z1-z0)*i/n;for(const off of[-1.4,1.4]){const ox=(z1-z0)/len*off,oz=-(x1-x0)/len*off;const p=new THREE.Mesh(new THREE.CylinderGeometry(.18,.2,3,8),pil);p.position.set(x+ox,1.5,z+oz);p.castShadow=true;G.add(p)}solids.push({cx:x,cz:z,r:1.6,y0:0,y1:4})}const rf=box(len+1.2,.35,4.2,rfm);rf.position.set((x0+x1)/2,3.2,(z0+z1)/2);rf.rotation.y=-Math.atan2(z1-z0,x1-x0);rf.castShadow=true;G.add(rf);const fl=box(len,.3,3.2,M(0xb3aa98));fl.position.set((x0+x1)/2,.15,(z0+z1)/2);fl.rotation.y=rf.rotation.y;G.add(fl)};
  run(-32,24,-5,24);run(5,24,32,24);run(-32,24,-32,-44);run(32,24,32,-44);run(-32,-44,32,-44)}
 /* 정문(가운데 문) */{const g=new THREE.Group();g.position.set(0,0,24);G.add(g);for(const sx of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.3,.34,5,12),M(0x8a3a2a));p.position.set(sx*4.2,2.5,0);p.castShadow=true;g.add(p);solids.push({cx:sx*4.2,cz:24,r:.4,y0:0,y1:9})}if(!mini){const rf=hipRoof(MT,6.2,3.2,3.2,5.2,7.4,.6,.2,{plain:true,rs:.6});g.add(rf)}const ln=box(9,.6,.6,M(0x2f6b55));ln.position.y=5;g.add(ln)}
 const meta={quest:{t:'한양 궁궐 순례',d:'궁궐 마당의 볼거리 일곱을 찾아 살펴보세요.',steps:[['광화문 해태','광화문 해태'],['품계석','품계석'],['앙부일구','앙부일구'],['월대','월대'],['정전','정전'],['어좌와 일월오봉도','어좌와 일월오봉도'],['어보','어보']]},
  title:'한양 궁궐 마당 · 실제 크기',video:'geunjeong',hint:'경복궁 근정전 일대를 본떠 지은 궁궐 마당이에요. 해태가 지키는 문을 지나 품계석 사이로 걸어가 월대에 오르고, 정전 안 어좌와 일월오봉도를 보세요. (3D: 국가유산청 KHS, CC BY · 건물은 근정전 배치를 본떠 지음)',
  env:{plaza:null,beds:false,trees:true,sign:{x:13,z:35,lines:['한양 궁궐 마당','근정전 · 품계석 · 해태','어좌 · 일월오봉도 · 앙부일구','궁궐 배치를 본떠 지었어요']},treeAvoid:(x,z)=>Math.abs(x)<40&&z<34&&z>-52},
  npc:[['carpenter',[[-2.4,18],[-2.4,-14]]],['painter',[[8,10],[8,-12]]],['science',[[-12,2],[-9,-4]]]],
  level:P=>P.y>HY-.1&&Math.abs(P.x)<12&&Math.abs(P.z-HZ)<6?'정전 안':P.y>T1-.1?'월대':P.z>21?'궁궐 문':'조정 마당',
  camCap:P=>P.y>HY-.1&&Math.abs(P.x)<12&&Math.abs(P.z-HZ)<6?4:Infinity,
  mini:{S:3.6,ox:0,oz:-10,draw(g,X,Z,S){g.fillStyle='#7aa04e';g.fillRect(0,0,300,300);g.fillStyle='#9a9284';g.fillRect(X(-32),Z(-44),64*S,68*S);g.fillStyle='#c4bcaa';g.fillRect(X(-17),Z(WZ-10),34*S,20*S);g.fillStyle='#8a3a2a';g.fillRect(X(-12),Z(HZ-6),24*S,12*S);g.fillStyle='#b9b09e';g.fillRect(X(-1.6),Z(-16),3.2*S,40*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:40,yaw:Math.PI},size:{}},meta)}
