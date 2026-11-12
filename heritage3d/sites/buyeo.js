/* 부여 백제 궁남지 마당. 단위 1 = 1m, 입구 +z.
   갱신 2026-11-12. 궁남지(백제 무왕 때 만든 연못, 가운데 섬 포룡정과 다리)를 본떠 작게 줄여 지음(실측 복제 아님).
   정림사지 오층석탑은 공개 실측값(높이 약 8.33m, 단층 기단, 얇고 넓은 지붕돌)에 맞춰 돌을 쌓듯 지음.
   백제 금동대향로 3D: junhapark1 「Great Gilt-bronze Incense Burner of Baekje」(CC BY 4.0), 실제 높이 61.8cm로 맞춤. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,noise,mulb,materials,hipRoof} from './sungnyemun.js';
const MURL=k=>new URL('../models/buyeo/'+k+'.glb',import.meta.url).href;
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
export function buildBuyeo(opts={}){const mini=!!opts.mini;const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(61);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
 /* ---------- 궁남지 연못(타원), 가운데 섬 ---------- */
 const PX=-6,PZ=-14,PA=26,PB=17,IR=5.2;/* 연못 중심, 반지름(가로·세로), 섬 반지름 */
 const inPond=(x,z)=>((x-PX)/PA)**2+((z-PZ)/PB)**2<1&&Math.hypot(x-PX,z-PZ)>IR;
 {const WT=tex(256,256,(q,w,h)=>{q.fillStyle='#3f7d7a';q.fillRect(0,0,w,h);for(let i=0;i<60;i++){q.strokeStyle='rgba(220,240,235,'+(.05+r()*.1)+')';q.lineWidth=2;q.beginPath();q.ellipse(r()*w,r()*h,8+r()*20,2+r()*3,0,0,7);q.stroke()}});WT.wrapS=WT.wrapT=THREE.RepeatWrapping;WT.repeat.set(10,7);
  const sh=new THREE.Shape();sh.absellipse(PX,-PZ,PA,PB,0,Math.PI*2,false,0);const hole=new THREE.Path();hole.absarc(PX,-PZ,IR,0,Math.PI*2,true);sh.holes.push(hole);const wg=new THREE.ShapeGeometry(sh,64);wg.rotateX(-Math.PI/2);const water=new THREE.Mesh(wg,new THREE.MeshStandardMaterial({map:WT,roughness:.15,metalness:.2,color:0xd8eeea,transparent:true,opacity:.92}));water.position.y=-.25;water.receiveShadow=true;G.add(water);G.userData.water=WT;
  const bed=new THREE.Mesh(new THREE.CircleGeometry(1,64),M(0x5a6a4a));bed.scale.set(PA,PB,1);bed.rotation.x=-Math.PI/2;bed.position.set(PX,-.6,PZ);G.add(bed);
  /* 물가 돌 테 */const rim=new THREE.Mesh(new THREE.TorusGeometry(1,.06,6,96),M(0x9a9284));rim.scale.set(PA,PB,1);rim.rotation.x=Math.PI/2;rim.position.set(PX,-.05,PZ);G.add(rim);
  /* 섬: 낮은 둔덕 */const isl=new THREE.Mesh(new THREE.CylinderGeometry(IR,IR+.4,.6,40),M(0x7aa04e));isl.position.set(PX,-.05,PZ);isl.receiveShadow=true;G.add(isl);S(PX-IR,PX+IR,0,.25,PZ-IR,PZ+IR);
  /* 연잎과 연꽃 */if(!mini){const N=260,lm=new THREE.InstancedMesh(new THREE.CircleGeometry(.45,12).rotateX(-Math.PI/2),M(0x4f8a3a,{side:THREE.DoubleSide}),N);const o=new THREE.Object3D();let k=0;for(let t=0;t<N*6&&k<N;t++){const a=r()*6.28,d=Math.sqrt(r());const x=PX+Math.cos(a)*PA*d,z=PZ+Math.sin(a)*PB*d;if(!inPond(x,z)||Math.abs(x-PX)<2&&z>PZ)continue;o.position.set(x,-.22,z);o.rotation.set(0,r()*6,0);const s=.6+r()*.9;o.scale.set(s,1,s);o.updateMatrix();lm.setMatrixAt(k++,o.matrix)}lm.count=k;G.add(lm);
   const fm=new THREE.InstancedMesh(new THREE.SphereGeometry(.18,8,6,0,Math.PI*2,0,Math.PI/2),M(0xf29ab8),70);k=0;for(let t=0;t<600&&k<70;t++){const a=r()*6.28,d=Math.sqrt(r());const x=PX+Math.cos(a)*PA*d,z=PZ+Math.sin(a)*PB*d;if(!inPond(x,z)||Math.abs(x-PX)<2&&z>PZ)continue;o.position.set(x,-.15+r()*.2,z);o.rotation.set(0,0,0);o.scale.set(1,1.3,1);o.updateMatrix();fm.setMatrixAt(k++,o.matrix)}fm.count=k;G.add(fm)}}
 /* 잔디 바닥: 연못 자리를 뚫어 둠(공통 잔디는 아래로 내림) */{const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#6f8f45';q.fillRect(0,0,w,h);noise(q,w,h,7000,['#7fa152','#5e7d38','#86a85a'],2)});GT.wrapS=GT.wrapT=THREE.RepeatWrapping;GT.repeat.set(60,60);const sh=new THREE.Shape();sh.moveTo(-200,-200);sh.lineTo(200,-200);sh.lineTo(200,200);sh.lineTo(-200,200);sh.closePath();const hole=new THREE.Path();hole.absellipse(PX,-PZ,PA,PB,0,Math.PI*2,true,0);sh.holes.push(hole);const gg=new THREE.ShapeGeometry(sh,64);gg.rotateX(-Math.PI/2);const uv=gg.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)/400+.5,uv.getY(i)/400+.5);const ground=new THREE.Mesh(gg,new THREE.MeshStandardMaterial({map:GT,roughness:1}));ground.receiveShadow=true;G.add(ground)}
 /* ---------- 구름다리(물가 → 섬) ---------- */
 {const wood=M(0x8a5a34);const z0=PZ+PB+.5,z1=PZ+IR-.2,n=16;for(let i=0;i<n;i++){const t=(i+.5)/n,z=z0+(z1-z0)*t,y=.15+Math.sin(t*Math.PI)*1.1;const p=box(2.2,.12,(z0-z1)/n+.02,wood);p.position.set(PX,y,z);G.add(p);S(PX-1.1,PX+1.1,-1,y+.06,z-(z0-z1)/n/2,z+(z0-z1)/n/2)}
  const rm=M(0x8a3a2a);for(const sx of[-1,1]){for(let i=0;i<=8;i++){const t=i/8,z=z0+(z1-z0)*t,y=.15+Math.sin(t*Math.PI)*1.1;const p=box(.1,.9,.1,rm);p.position.set(PX+sx*1.05,y+.45,z);G.add(p)}S(PX+sx*1.05-.08,PX+sx*1.05+.08,-1,3,z1,z0)}
  spots.push({x:PX,y:.2,z:PZ+PB+2,r:2.2,t:'궁남지 구름다리',h:'연못 가운데 섬으로 건너가는 나무다리예요. 궁남지는 백제 무왕(재위 600~641) 때 궁궐 남쪽에 판 연못으로, 우리나라에서 가장 오래된 인공 연못으로 알려져 있어요. 여기서는 줄여서 지었어요.'})}
 /* ---------- 포룡정(섬 가운데 육각 정자) ---------- */
 {const g=new THREE.Group();g.position.set(PX,.25,PZ);G.add(g);const pil=M(0x8a3a2a);const R6=2.1;const fl=new THREE.Mesh(new THREE.CylinderGeometry(R6+.4,R6+.5,.5,6),M(0xb3aa98));fl.position.y=.25;g.add(fl);S(PX-R6-.4,PX+R6+.4,0,.75,PZ-R6-.4,PZ+R6+.4);
  for(let i=0;i<6;i++){const a=i/6*Math.PI*2;const p=new THREE.Mesh(new THREE.CylinderGeometry(.14,.16,2.8,10),pil);p.position.set(Math.cos(a)*R6,.5+1.4,Math.sin(a)*R6);p.castShadow=true;g.add(p);solids.push({cx:PX+Math.cos(a)*R6,cz:PZ+Math.sin(a)*R6,r:.2,y0:0,y1:6})}
  const ring=new THREE.Mesh(new THREE.CylinderGeometry(R6+.15,R6+.15,.35,6,1,true),M(0x2f6b55,{side:THREE.DoubleSide}));ring.position.y=3.2;g.add(ring);
  const roofM=M(0x3a4048,{roughness:.7,flatShading:true});const rf=new THREE.Mesh(new THREE.ConeGeometry(R6+1.5,2.2,6,1),roofM);rf.position.y=4.4;rf.castShadow=true;g.add(rf);const rf2=new THREE.Mesh(new THREE.ConeGeometry(1.2,1.1,6),roofM);rf2.position.y=5.4;g.add(rf2);const top=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),M(0xb8902e,{metalness:.6,roughness:.4}));top.position.y=6.05;g.add(top);
  /* 처마 끝 살짝 들림: 꼭짓점 여섯 */for(let i=0;i<6;i++){const a=i/6*Math.PI*2;const c=new THREE.Mesh(new THREE.ConeGeometry(.12,.5,5),roofM);c.position.set(Math.cos(a)*(R6+1.45),3.45,Math.sin(a)*(R6+1.45));c.rotation.z=Math.cos(a)*.9;c.rotation.x=-Math.sin(a)*.9;g.add(c)}
  spots.push({x:PX,y:.75,z:PZ+1,r:2,t:'포룡정',h:'궁남지 섬 가운데 육각 정자예요. 이름은 "용을 품은 정자"라는 뜻으로, 무왕의 어머니가 연못가에서 용과 만나 무왕을 낳았다는 전설에서 왔어요. 지금 정자는 1970년대에 다시 지었어요.'})}
 /* ---------- 버드나무: 연못가에 늘어진 가지 ---------- */
 if(!mini){const tr=M(0x5a4030);const lf=M(0x7fb84a,{side:THREE.DoubleSide});for(let i=0;i<14;i++){const a=i/14*Math.PI*2+.2;const x=PX+Math.cos(a)*(PA+3),z=PZ+Math.sin(a)*(PB+3);if(z>PZ+PB-1&&Math.abs(x-PX)<5)continue;const t=new THREE.Mesh(new THREE.CylinderGeometry(.25,.35,4,8),tr);t.position.set(x,2,z);t.castShadow=true;G.add(t);solids.push({cx:x,cz:z,r:.4,y0:0,y1:6});
   const cr=new THREE.Group();cr.position.set(x,4,z);G.add(cr);for(let k=0;k<22;k++){const b=r()*6.28,d=.4+r()*1.8,h=1.6+r()*1.8;const s=new THREE.Mesh(new THREE.PlaneGeometry(.35,h),lf);s.position.set(Math.cos(b)*d,.4-h/2,Math.sin(b)*d);s.rotation.y=b;s.castShadow=true;cr.add(s)}const top=new THREE.Mesh(new THREE.SphereGeometry(1.9,10,8),M(0x76ad44,{flatShading:true}));top.scale.y=.55;top.position.y=.6;cr.add(top)}}
 /* ---------- 정림사지 오층석탑(공개 실측값으로 쌓기) ---------- */
 {const TX=18,TZ=-26;const GR=new THREE.MeshStandardMaterial({map:tex(256,256,(q,w,h)=>{q.fillStyle='#a49d90';q.fillRect(0,0,w,h);noise(q,w,h,8000,['rgba(0,0,0,.1)','rgba(255,255,255,.08)','rgba(90,80,60,.1)'],2)}),roughness:.95});
  const g=new THREE.Group();g.position.set(TX,0,TZ);G.add(g);let y=0;const put=(w,h,d=w)=>{const b=box(w,h,d,GR);b.position.y=y+h/2;g.add(b);y+=h;return b};
  put(4.2,.35);put(3.7,.5);/* 단층 기단 */const body=[[2.45,1.55],[1.95,.62],[1.72,.55],[1.5,.5],[1.3,.45]],roof=[4.6,3.95,3.45,3.05,2.65];
  body.forEach(([w,h],i)=>{const b0=y;put(w,h);/* 모서리 기둥(우주)과 가운데 기둥(탱주) 줄 */for(const sx of[-1,1])for(const sz of[-1,1]){const c=box(.16,h,.16,GR);c.position.set(sx*(w/2-.02),b0+h/2,sz*(w/2-.02));g.add(c)}
   put(w*.95,.12);put(w*1.15,.1);/* 지붕받침 */const rw=roof[i];const rf=new THREE.Mesh(new THREE.CylinderGeometry(rw*.55,rw*.71,.28,4,1),GR);rf.rotation.y=Math.PI/4;rf.position.y=y+.14;rf.castShadow=true;g.add(rf);y+=.28;const rt=new THREE.Mesh(new THREE.CylinderGeometry(w*.42,rw*.55,.22,4,1),GR);rt.rotation.y=Math.PI/4;rt.position.y=y+.11;g.add(rt);y+=.22});
  put(.9,.35);const ss=new THREE.Mesh(new THREE.CylinderGeometry(.08,.12,.8,8),GR);ss.position.y=y+.4;g.add(ss);y+=.8;G.userData.tH=y;
  g.traverse(o=>{if(o.isMesh)cam.push(o)});S(TX-2.1,TX+2.1,0,20,TZ-2.1,TZ+2.1);
  spots.push({x:TX,y:0,z:TZ+4,r:2.6,t:'정림사지 오층석탑',h:'백제 사비 시대(6~7세기)에 세운 석탑으로, 높이 약 8.33m예요. 목탑처럼 돌을 짜 맞추고 지붕돌을 얇고 넓게 펼쳐 날렵하고 단정해요. 백제가 멸망할 때 당나라 장수가 탑에 승전 글을 새긴 아픈 흔적도 남아 있어요. 공개 실측값에 맞춰 쌓았어요.'})}
 /* ---------- 향로각: 백제 금동대향로 ---------- */
 {const HX=16,HZ=4;const pil=M(0x8a3a2a),wall=M(0xf2ede2);const fl=box(8,.45,6,M(0xb3aa98));fl.position.set(HX,.22,HZ);G.add(fl);S(HX-4,HX+4,0,.45,HZ-3,HZ+3);
  const bk=box(8,3.2,.2,wall);bk.position.set(HX,2.05,HZ-3);G.add(bk);S(HX-4,HX+4,0,4,HZ-3.15,HZ-2.85);for(const sx of[-1,1]){const w=box(.2,3.2,6,wall);w.position.set(HX+sx*4,2.05,HZ);G.add(w);S(HX+sx*4-.15,HX+sx*4+.15,0,4,HZ-3,HZ+3)}
  for(const sx of[-1,-.33,.33,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.16,.18,3.3,10),pil);p.position.set(HX+sx*4,2.1,HZ+3);p.castShadow=true;G.add(p);solids.push({cx:HX+sx*4,cz:HZ+3,r:.2,y0:0,y1:5})}
  if(!mini){const rf=hipRoof(MT,5.2,4,2.4,3.75,5.6,.45,.2,{plain:true,rs:.5});rf.position.set(HX,0,HZ);rf.traverse(o=>{if(o.isMesh)o.castShadow=true});G.add(rf)}
  const pd=box(1,1.05,1,M(0x3b2414));pd.position.set(HX,.45+.52,HZ-.6);G.add(pd);S(HX-.55,HX+.55,0,2.4,HZ-1.15,HZ-.05);const gb=new THREE.Mesh(new THREE.BoxGeometry(.9,.85,.9),new THREE.MeshPhysicalMaterial({color:0xffffff,transmission:.9,transparent:true,opacity:.18,depthWrite:false}));gb.position.set(HX,1.5+.43,HZ-.6);G.add(gb);
  const lamp=new THREE.PointLight(0xffe8c8,9,8,1.6);lamp.position.set(HX,3,HZ);G.add(lamp);
  if(!mini)new GLTFLoader().load(MURL('hyangro'),m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true}});o.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o),s=b.getSize(V(0,0,0));const sc=.618/s.y;o.scale.setScalar(sc);o.position.set(HX-(b.min.x+b.max.x)/2*sc,1.5-b.min.y*sc,HZ-.6-(b.min.z+b.max.z)/2*sc);G.add(o)});
  spots.push({x:HX,y:.45,z:HZ+1.6,r:2,t:'백제 금동대향로',h:'1993년 부여 능산리 절터에서 나온 백제 향로예요(높이 61.8cm, 국보). 꼭대기 봉황, 뚜껑의 산봉우리와 다섯 악사, 신선과 동물, 몸통의 연꽃, 받침의 용까지 백제의 솜씨가 다 담겼어요. 무이 월드 무대의 다섯 악사도 이 향로에서 왔어요. (3D: junhapark1, CC BY)'})}
 /* ---------- 길 ---------- */
 {const PT=tex(256,256,(q,w,h)=>{q.fillStyle='#c9b48a';q.fillRect(0,0,w,h);noise(q,w,h,4000,['rgba(0,0,0,.06)','rgba(255,255,255,.08)'],2)});PT.wrapS=PT.wrapT=THREE.RepeatWrapping;const lane=(x0,z0,x1,z1,w)=>{const len=Math.hypot(x1-x0,z1-z0);const t=PT.clone();t.needsUpdate=true;t.repeat.set(w/4,len/4);const m=new THREE.Mesh(new THREE.PlaneGeometry(w,len),new THREE.MeshStandardMaterial({map:t,roughness:1}));m.rotation.x=-Math.PI/2;m.rotation.z=-Math.atan2(x1-x0,z1-z0)+Math.PI;m.position.set((x0+x1)/2,.03,(z0+z1)/2);m.receiveShadow=true;G.add(m)};
  lane(PX,24,PX,PZ+PB+.5,3);lane(PX,10,16,7.5,2.6);lane(16,1,18,-23,2.6)}
 const tick=(P,dt)=>{if(G.userData.water){G.userData.water.offset.x+=dt*.006;G.userData.water.offset.y+=dt*.004}};
 const meta={quest:{t:'백제 사비 순례',d:'백제 유산 네 곳을 찾아 보세요.',steps:[['궁남지 구름다리','궁남지 구름다리'],['섬의 포룡정','포룡정'],['정림사지 오층석탑','정림사지 오층석탑'],['백제 금동대향로','백제 금동대향로']],done:'백제 사비의 연못과 석탑, 금동대향로를 다 만났어요. 무이 월드 무대의 다섯 악사가 이 향로에서 왔다는 것도 기억해 두세요.'},
  title:'부여 백제 궁남지 마당',video:'metal',hint:'백제의 연못 궁남지를 본떠 줄여 지은 마당이에요. 구름다리를 건너 섬의 포룡정에 가 보고, 정림사지 오층석탑(실측값)과 향로각의 백제 금동대향로를 보세요. (향로 3D: junhapark1, CC BY)',
  env:{plaza:null,beds:false,trees:true,groundY:-.7,sign:{x:-2,z:24,lines:['부여 백제 궁남지 마당','궁남지 · 포룡정 · 구름다리','정림사지 오층석탑','백제 금동대향로']},treeAvoid:(x,z)=>(((x-PX)/(PA+6))**2+((z-PZ)/(PB+6))**2<1)||Math.hypot(x-18,z+26)<6||Math.abs(x-16)<6&&Math.abs(z-4)<5||Math.abs(x-PX)<3&&z>0},
  npc:[['metal',[[14,.45,5.5],[18,.45,5.5]]],['science',[[PX-2,24],[PX+2,22]]],['painter',[[20,-20],[16,-20]]]],
  baseAt:(x,z)=>inPond(x,z)?-.55:0,
  level:P=>inPond(P.x,P.z)?'연못 물속':Math.hypot(P.x-PX,P.z-PZ)<IR?'포룡정 섬':Math.hypot(P.x-18,P.z+26)<7?'정림사지':Math.abs(P.x-16)<4&&Math.abs(P.z-4)<3?'향로각':'궁남지 둘레',
  camCap:()=>Infinity,tick,
  mini:{S:3.2,ox:2,oz:-6,draw(g,X,Z,S){g.fillStyle='#7aa04e';g.fillRect(0,0,300,300);g.fillStyle='#3f7d7a';g.beginPath();g.ellipse(X(PX),Z(PZ),PA*S,PB*S,0,0,7);g.fill();g.fillStyle='#7aa04e';g.beginPath();g.arc(X(PX),Z(PZ),IR*S,0,7);g.fill();g.fillStyle='#8a3a2a';g.beginPath();g.arc(X(PX),Z(PZ),2*S,0,7);g.fill();g.fillStyle='#a49d90';g.fillRect(X(16),Z(-28),4*S,4*S);g.fillStyle='#d8d0c0';g.fillRect(X(12),Z(1),8*S,6*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:PX,z:26,yaw:Math.PI},size:{}},meta)}
