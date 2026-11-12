/* 통영 나전칠기 공방과 세병관. 단위 1 = 1m, 입구 +z, 바다는 -z.
   갱신 2026-11-12. 나전 3D: 한국공예디자인문화진흥원 KCDF 나전칠함(CC BY), 클리블랜드 미술관 1990.15 용봉무늬 두루마리 상자(CC0).
   세병관은 삼도수군통제영 객사(정면 9칸, 측면 5칸 큰 마루집)를 본떠 지은 것(실측 아님). 공방·자개 더미·바다는 연출. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,noise,mulb,materials,hipRoof} from './sungnyemun.js';
const MURL=k=>new URL('../models/tongyeong/'+k+'.glb',import.meta.url).href;
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
export function buildTongyeong(opts={}){const mini=!!opts.mini;const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(61);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
 const gl=new GLTFLoader();
 function place(k,{x,y=0,z,h=null,len=null,ry=0}={}){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry;G.add(g);if(mini)return g;gl.load(MURL(k),m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;e.receiveShadow=true}});o.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o),s=b.getSize(V(0,0,0));const sc=h?h/s.y:len?len/Math.max(s.x,s.z):1;o.scale.setScalar(sc);o.position.set(-(b.min.x+b.max.x)/2*sc,-b.min.y*sc,-(b.min.z+b.max.z)/2*sc);g.add(o)},undefined,e=>console.warn('모델 못 불러옴',k,e));return g}
 const SZ=-30;/* 바닷가 */
 /* ---------- 땅, 돌축대, 바다 ---------- */
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#7a9a4c';q.fillRect(0,0,w,h);noise(q,w,h,7000,['#86a85a','#6a8a40','#8fae60'],2)});GT.wrapS=GT.wrapT=THREE.RepeatWrapping;GT.repeat.set(40,22);const gr=new THREE.Mesh(new THREE.PlaneGeometry(240,130),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.position.set(0,0,SZ+65);gr.receiveShadow=true;G.add(gr);
  const PT=tex(256,256,(q,w,h)=>{q.fillStyle='#c8b48c';q.fillRect(0,0,w,h);noise(q,w,h,5000,['rgba(0,0,0,.07)','rgba(255,255,255,.08)'],2)});PT.wrapS=PT.wrapT=THREE.RepeatWrapping;PT.repeat.set(8,8);const yd=new THREE.Mesh(new THREE.PlaneGeometry(56,40),new THREE.MeshStandardMaterial({map:PT,roughness:1}));yd.rotation.x=-Math.PI/2;yd.position.set(0,.02,4);yd.receiveShadow=true;G.add(yd);
  const RK=tex(256,128,(q,w,h)=>{q.fillStyle='#8a847a';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=16)for(let x=(y/16%2)*14;x<w;x+=28){const g=110+(r()*50|0);q.fillStyle=`rgb(${g},${g-4},${g-10})`;q.fillRect(x+1,y+1,26,14)}});RK.wrapS=RK.wrapT=THREE.RepeatWrapping;RK.repeat.set(30,1);const wall=new THREE.Mesh(new THREE.PlaneGeometry(240,2.2),new THREE.MeshStandardMaterial({map:RK,roughness:1}));wall.position.set(0,-1.1,SZ);G.add(wall);S(-120,120,0,1.2,SZ-1,SZ);
  const WT=tex(256,256,(q,w,h)=>{q.fillStyle='#2f7f98';q.fillRect(0,0,w,h);for(let i=0;i<80;i++){q.strokeStyle='rgba(225,242,245,'+(.06+r()*.14)+')';q.lineWidth=2;q.beginPath();q.ellipse(r()*w,r()*h,10+r()*24,2+r()*3,0,0,7);q.stroke()}});WT.wrapS=WT.wrapT=THREE.RepeatWrapping;WT.repeat.set(30,12);const sea=new THREE.Mesh(new THREE.PlaneGeometry(240,140),new THREE.MeshStandardMaterial({map:WT,roughness:.15,metalness:.2,color:0xd8eef0}));sea.rotation.x=-Math.PI/2;sea.position.set(0,-1.6,SZ-70);G.add(sea);G.userData.water=WT;
  /* 앞바다 섬들 */if(!mini)for(let i=0;i<9;i++){const h=new THREE.Mesh(new THREE.SphereGeometry(6+r()*9,12,8,0,Math.PI*2,0,Math.PI/2),M(0x4f8a4a,{flatShading:true}));h.scale.y=.5;h.position.set(-100+i*25+r()*8,-1.6,SZ-60-r()*50);G.add(h)}
  /* 돛단배 */if(!mini){const sail=M(0xf3ead6,{side:THREE.DoubleSide}),hull=M(0x6b4a2e);const B=[];for(let i=0;i<5;i++){const b=new THREE.Group();const hb=box(4,.8,1.4,hull);hb.position.y=.2;b.add(hb);const ms=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,4,6),hull);ms.position.y=2.2;b.add(ms);const sl=new THREE.Mesh(new THREE.PlaneGeometry(2.4,2.8),sail);sl.position.set(.1,2.6,0);sl.rotation.y=Math.PI/2;b.add(sl);b.position.set(-60+i*28,-1.5,SZ-14-r()*30);b.userData.p=r()*6;G.add(b);B.push(b)}G.userData.boats=B}}
 /* ---------- 세병관: 정면 9칸, 측면 5칸 큰 마루집 ---------- */
 const HX=0,HZ=-12,W=27,D=12,FY=1.1,PH=4.6;
 {const stn=M(0xb8b1a4),pil=M(0x8a3a2a);const base=box(W+2.4,FY,D+2.4,stn);base.position.set(HX,FY/2,HZ);G.add(base);S(HX-(W+2.4)/2,HX+(W+2.4)/2,0,FY,HZ-(D+2.4)/2,HZ+(D+2.4)/2);
  /* 앞 돌계단 */for(let i=0;i<4;i++){const st=box(5,FY*(i+1)/4,.45,stn);st.position.set(HX,FY*(i+1)/8,HZ+D/2+1.2+(3-i)*.45+.22);G.add(st);S(HX-2.5,HX+2.5,0,FY*(i+1)/4,HZ+D/2+1.2+(3-i)*.45,HZ+D/2+1.2+(4-i)*.45)}
  const fl=box(W,.1,D,M(0x9a7350));fl.position.set(HX,FY+.05,HZ);G.add(fl);
  const XS=[...Array(10)].map((_,i)=>-W/2+i*W/9),ZS=[...Array(6)].map((_,i)=>-D/2+i*D/5);
  for(const x of XS)for(const z of ZS){if(Math.abs(x)<W/2-.1&&Math.abs(z)<D/2-.1)continue;const c=new THREE.Mesh(new THREE.CylinderGeometry(.28,.3,PH,12),pil);c.position.set(HX+x,FY+PH/2,HZ+z);c.castShadow=true;G.add(c);solids.push({cx:HX+x,cz:HZ+z,r:.34,y0:0,y1:9})}
  const ce=box(W+.4,.3,D+.4,M(0x5a3a22));ce.position.set(HX,FY+PH+.15,HZ);G.add(ce);
  if(!mini){const rf=hipRoof(MT,W/2+2,D/2+2,W/2-3.5,FY+PH+.3,FY+PH+4.4,.8,.3,{plain:true,rs:.7});rf.position.set(HX,0,HZ);rf.traverse(o=>{if(o.isMesh)o.castShadow=true});G.add(rf)}
  {const cv=document.createElement('canvas');cv.width=640;cv.height=200;const q=cv.getContext('2d');q.fillStyle='#2a1a10';q.fillRect(0,0,640,200);q.strokeStyle='#d8a838';q.lineWidth=10;q.strokeRect(6,6,628,188);q.fillStyle='#f2d27a';q.textAlign='center';q.font='bold 120px "Noto Serif KR",serif';q.fillText('洗兵館',320,148,600);const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;const pl=new THREE.Mesh(new THREE.PlaneGeometry(3.2,1),new THREE.MeshBasicMaterial({map:t}));pl.position.set(HX,FY+PH-.6,HZ+D/2+.32);G.add(pl)}
  const lamp1=new THREE.PointLight(0xfff0d8,14,16,1.6);lamp1.position.set(HX-5,FY+PH-.6,HZ);const lamp2=lamp1.clone();lamp2.position.set(HX+5,FY+PH-.6,HZ);G.add(lamp1,lamp2);
  spots.push({x:HX,y:0,z:HZ+D/2+4.4,r:3,t:'세병관',h:'삼도수군통제영(경상·전라·충청 바다를 지키던 수군 본부)의 객사예요. 1605년에 세운 큰 마루집으로, 이름은 "은하수를 끌어와 병기를 씻는다"는 시에서 땄어요. 전쟁이 끝나 평화를 바란다는 뜻이에요. 이곳은 본떠 지은 것이에요.'})}
 /* ---------- 세병관 안 나전 진열장 ---------- */
 {const glass=new THREE.MeshPhysicalMaterial({color:0xffffff,transmission:.9,roughness:.05,transparent:true,opacity:.16,depthWrite:false});const ped=M(0x2a1a12,{roughness:.4});
  const cases=[['najeonham',HX-4,'나전칠 함',.46,'나전칠함'],['scrollbox',HX+4,'용봉무늬 두루마리 상자',null,'두루마리 상자']];
  for(const [k,x,n,h,t] of cases){const z=HZ-1;const pd=box(2.2,1,1.4,ped);pd.position.set(x,FY+.5,z);G.add(pd);const gb=new THREE.Mesh(new THREE.BoxGeometry(2.1,.9,1.3),glass);gb.position.set(x,FY+1.45,z);G.add(gb);S(x-1.15,x+1.15,0,FY+2,z-.75,z+.75);
   if(k==='scrollbox')place(k,{x,y:FY+1.02,z,len:1.7,ry:Math.PI/2});else place(k,{x,y:FY+1.02,z,h});
   const cv=document.createElement('canvas');cv.width=360;cv.height=80;const q=cv.getContext('2d');q.fillStyle='#f3ead6';q.fillRect(0,0,360,80);q.fillStyle='#2b1d12';q.font='bold 30px "Gowun Dodum",sans-serif';q.textAlign='center';q.fillText(n,180,52,340);const tx=new THREE.CanvasTexture(cv);tx.colorSpace=THREE.SRGBColorSpace;const lb=new THREE.Mesh(new THREE.PlaneGeometry(1,.22),new THREE.MeshBasicMaterial({map:tx}));lb.position.set(x,FY+.75,z+.71);G.add(lb)}
  spots.push({x:HX-4,y:FY,z:HZ+1.4,r:2,t:'나전칠함',h:'옻칠한 나무 상자에 얇게 간 전복·조개 껍데기(자개)를 오려 붙여 꽃과 넝쿨을 그렸어요. 실물은 손바닥만 한 작은 함이라 여섯 배로 키워 보여 드려요. 통영은 조선 때 통제영 공방(12공방)에서 나전을 만들던 나전칠기의 고장이에요. (3D: KCDF, CC BY)'});
  spots.push({x:HX+4,y:FY,z:HZ+1.4,r:2,t:'두루마리 상자',h:'두루마리 그림이나 글을 넣어 두던 긴 상자예요. 뚜껑에 용과 봉황을 자개로 새겼어요. 실제 크기의 두 배로 보여 드려요. (3D: 클리블랜드 미술관 1990.15, CC0)'})}
 /* ---------- 나전 공방(동쪽): 작업대, 자개 판, 전복 껍데기 더미, 칠 말리는 장 ---------- */
 const WX=20,WZ=6;
 {const wood=M(0x6b4a2e);const fl=box(10,.3,7,M(0x9a7350));fl.position.set(WX,.15,WZ);G.add(fl);S(WX-5,WX+5,0,.3,WZ-3.5,WZ+3.5);for(const[a,b]of[[-4.8,-3.3],[4.8,-3.3],[-4.8,3.3],[4.8,3.3]]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.15,.17,3,10),wood);p.position.set(WX+a,1.8,WZ+b);G.add(p);solids.push({cx:WX+a,cz:WZ+b,r:.2,y0:0,y1:4})}
  if(!mini){const rf=hipRoof(MT,6.2,4.6,3,3.1,4.8,.4,.2,{plain:true,rs:.5});rf.position.set(WX,0,WZ);rf.traverse(o=>{if(o.isMesh)o.castShadow=true});G.add(rf)}
  const nacre=new THREE.MeshPhysicalMaterial({color:0xe8f0f0,roughness:.15,metalness:.3,iridescence:1,iridescenceIOR:1.6,sheen:1,sheenColor:new THREE.Color(0x9fd8ff)});
  /* 작업대와 자개 조각 */const tb=box(3,.1,1.4,M(0x5a3a22));tb.position.set(WX-1.5,.95,WZ+.4);G.add(tb);for(const sx of[-1,1])for(const sz of[-1,1]){const l=box(.1,.65,.1,wood);l.position.set(WX-1.5+sx*1.35,.6,WZ+.4+sz*.6);G.add(l)}S(WX-3,WX,0,1,WZ-.3,WZ+1.1);
  const lac=box(1.2,.04,.8,M(0x1a0d08,{roughness:.25}));lac.position.set(WX-1.5,1.02,WZ+.4);G.add(lac);for(let i=0;i<40;i++){const t=new THREE.Mesh(new THREE.CircleGeometry(.025+r()*.04,5),nacre);t.rotation.x=-Math.PI/2;t.position.set(WX-2+r()*1,1.045,WZ+.1+r()*.6);G.add(t)}
  /* 전복 껍데기 더미 */for(let i=0;i<60;i++){const sh=new THREE.Mesh(new THREE.SphereGeometry(.12+r()*.06,10,6,0,Math.PI*2,0,Math.PI/2.3),nacre);sh.scale.set(1.3,.35,1);const a=r()*6.28,d=Math.sqrt(r())*1.1;sh.position.set(WX+2.6+Math.cos(a)*d,.32+Math.max(0,1.1-d)*.35+r()*.05,WZ+1.6+Math.sin(a)*d);sh.rotation.set((r()-.5)*.6,r()*6,(r()-.5)*.6);G.add(sh)}solids.push({cx:WX+2.6,cz:WZ+1.6,r:1.1,y0:0,y1:1});
  /* 칠 말리는 장(옻칠은 습한 곳에서 말림) */const sh=M(0x3b2414);const cab=box(2.6,2.2,.8,sh);cab.position.set(WX+1.5,1.4,WZ-2.6);G.add(cab);S(WX+.2,WX+2.8,0,2.6,WZ-3,WZ-2.2);for(let i=0;i<3;i++){const tr=box(.9,.08,.6,M(0x1a0d08,{roughness:.2}));tr.position.set(WX+1.5,.9+i*.6,WZ-2.15);G.add(tr)}
  spots.push({x:WX-1.5,y:.3,z:WZ+2.2,r:1.8,t:'자개 작업대',h:'전복 껍데기를 얇게 갈아 만든 자개를 실톱으로 오리고(끊음질), 옻칠한 판 위에 붙여 무늬를 만들어요. 그 위에 다시 옻칠을 여러 번 하고 갈아 내면 자개가 반짝이며 드러나요.'});
  spots.push({x:WX+2.6,y:.3,z:WZ+3.4,r:1.6,t:'전복 껍데기',h:'통영 앞바다의 전복 껍데기는 무지갯빛이 고와서 나전 재료로 으뜸이었어요. 껍데기 안쪽의 빛나는 층을 쓰기 때문에 같은 무늬라도 보는 각도마다 색이 달라져요.'})}
 spots.push({x:0,y:0,z:SZ+2.4,r:3,t:'통영 바다',h:'통영(統營)이라는 이름은 삼도수군통제영에서 왔어요. 1604년 이 바닷가로 통제영을 옮긴 뒤, 수군에 필요한 물건을 만드는 공방이 모여 나전칠기, 통영갓, 소반 같은 공예가 꽃피었어요.'});
 const tick=(P,dt)=>{const t=performance.now()/1000;for(const b of G.userData.boats||[]){b.position.y=-1.5+Math.sin(t*1.2+b.userData.p)*.12;b.rotation.z=Math.sin(t*.9+b.userData.p)*.05;b.position.x+=dt*.6;if(b.position.x>80)b.position.x=-80}const w=G.userData.water;if(w)w.offset.x=t*.01};
 const meta={quest:{t:'통영 나전 순례',d:'통제영과 나전칠기의 고장 통영에서 여섯 곳을 찾아 보세요.',steps:[['세병관','세병관'],['나전칠함','나전칠함'],['두루마리 상자','두루마리 상자'],['자개 작업대','자개 작업대'],['전복 껍데기','전복 껍데기'],['통영 바다','통영 바다']],done:'통영 나전 순례를 마쳤어요. 바다를 지키던 수군의 도시가 어떻게 공예의 도시가 되었는지 기억해 두세요.'},
  title:'통영 나전칠기 공방',short:'s063',hint:'삼도수군통제영의 세병관(본떠 지음)과 나전칠기 공방이에요. 세병관 안 진열장에서 나전칠함과 용봉무늬 두루마리 상자를 보고, 동쪽 공방에서 자개 작업대와 전복 껍데기를 찾아 보세요. (3D: KCDF CC BY · 클리블랜드 미술관 CC0)',
  env:{plaza:null,beds:false,trees:true,groundY:-1.6,sign:{x:5,z:22,lines:['통영 나전칠기 공방','세병관 · 통영 바다','나전칠함 · 두루마리 상자','자개 작업대 · 전복 껍데기']},treeAvoid:(x,z)=>z<28&&Math.abs(x)<34||z<SZ+2},
  npc:[['painter',[[WX-3,.3,WZ+2.6],[WX+3,.3,WZ+2.6]]],['carpenter',[[-8,FY,HZ+3],[8,FY,HZ+3]]]],
  level:P=>Math.abs(P.x-HX)<W/2&&Math.abs(P.z-HZ)<D/2&&P.y>FY-.2?'세병관':Math.abs(P.x-WX)<5&&Math.abs(P.z-WZ)<3.5?'나전 공방':P.z<SZ+6?'통영 바닷가':'통제영 마당',
  camCap:P=>Math.abs(P.x-HX)<W/2&&Math.abs(P.z-HZ)<D/2&&P.y>FY-.2?4.6:Infinity,tick,
  baseAt:(x,z)=>z<SZ?-1.6:0,
  mini:{S:3,ox:0,oz:-4,draw(g,X,Z,S){g.fillStyle='#7a9a4c';g.fillRect(0,0,300,300);g.fillStyle='#2f7f98';g.fillRect(0,Z(SZ),300,300);g.fillStyle='#c8b48c';g.fillRect(X(-28),Z(-16),56*S,40*S);g.fillStyle='#8a3a2a';g.fillRect(X(HX-W/2),Z(HZ-D/2),W*S,D*S);g.fillStyle='#9a7350';g.fillRect(X(WX-5),Z(WZ-3.5),10*S,7*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:24,yaw:Math.PI},size:{}},meta)}
