/* 강진 고려청자 가마 마당. 단위 1 = 1m, 입구 +z.
   갱신 2026-11-12. 청자 3D: 클리블랜드 미술관(CC0) 고려청자 다섯 점(상감 국화모란무늬 주자 1917.357, 음각 모란무늬 매병 1921.645,
   음각 연꽃무늬 주자 1921.628, 음각 넝쿨무늬 주자 1928.172, 정병 1921.631)과 국가유산청(CC BY) 사자 뚜껑 향로·두꺼비 벼루·표형 주전자 재현 에셋.
   가마·작업장은 강진 사당리 가마터 같은 고려 오름가마(비탈에 길게 오르는 굴 가마)를 본떠 지음(특정 가마 실측 아님). */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,noise,mulb,materials,hipRoof} from './sungnyemun.js';
const MURL=k=>new URL('../models/gangjin/'+k+'.glb',import.meta.url).href;
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
export function buildGangjin(opts={}){const mini=!!opts.mini;const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(47);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
 const gl=new GLTFLoader();
 function place(k,{x,y=0,z,h=null,ry=0}={}){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry;G.add(g);if(mini)return g;gl.load(MURL(k),m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;e.receiveShadow=true}});o.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o),s=b.getSize(V(0,0,0));const sc=h?h/s.y:1;o.scale.setScalar(sc);o.position.set(-(b.min.x+b.max.x)/2*sc,-b.min.y*sc,-(b.min.z+b.max.z)/2*sc);g.add(o)},undefined,e=>console.warn('모델 못 불러옴',k,e));return g}
 /* ---------- 땅: 붉은 흙 마당과 비탈 ---------- */
 const SOIL=tex(256,256,(q,w,h)=>{q.fillStyle='#a8774f';q.fillRect(0,0,w,h);noise(q,w,h,6000,['rgba(0,0,0,.08)','rgba(255,230,200,.08)','rgba(90,50,20,.1)'],2)});SOIL.wrapS=SOIL.wrapT=THREE.RepeatWrapping;SOIL.repeat.set(8,8);
 {const yard=new THREE.Mesh(new THREE.CircleGeometry(24,48),new THREE.MeshStandardMaterial({map:SOIL,roughness:1}));yard.rotation.x=-Math.PI/2;yard.position.set(0,.02,-2);yard.receiveShadow=true;G.add(yard)}
 /* ---------- 오름가마: 비탈을 따라 길게 오르는 굴 가마 ---------- */
 const KX=-12,KZ0=4,KZ1=-20,KH0=0,KH1=4.2;/* 아래 아궁이(z=4)에서 위 굴뚝(z=-20)까지 */
 {const clay=new THREE.MeshStandardMaterial({map:tex(256,256,(q,w,h)=>{q.fillStyle='#9c6a44';q.fillRect(0,0,w,h);for(let i=0;i<500;i++){q.fillStyle=`rgba(${120+r()*60|0},${70+r()*40|0},${40+r()*20|0},.5)`;q.fillRect(r()*w,r()*h,6+r()*10,4+r()*6)}noise(q,w,h,4000,['rgba(0,0,0,.1)'],2)}),roughness:1});
  /* 비탈 흙둔덕: 옆에서 본 쐐기 모양을 x 방향으로 밀어 냄 */const len=Math.hypot(KZ1-KZ0,KH1-KH0),ang=Math.atan2(KH1-KH0,KZ0-KZ1);{const sh=new THREE.Shape();sh.moveTo(-(KZ0+1.5),0);sh.lineTo(-(KZ1-1.5),0);sh.lineTo(-(KZ1-1.5),KH1+.1);sh.lineTo(-KZ1,KH1+.1);sh.lineTo(-KZ0,KH0);sh.closePath();const eg=new THREE.ExtrudeGeometry(sh,{depth:7,bevelEnabled:false});eg.rotateY(Math.PI/2);eg.translate(KX-3.5,0,0);const sm=SOIL.clone();sm.needsUpdate=true;sm.repeat.set(.3,.3);const mound=new THREE.Mesh(eg,new THREE.MeshStandardMaterial({map:sm,roughness:1,color:0xc8a07a}));mound.receiveShadow=true;mound.castShadow=true;G.add(mound)}
  /* 둔덕 윗면은 비탈: 여러 단으로 쪼갠 땅 */for(let i=0;i<12;i++){const t0=i/12,t1=(i+1)/12;const z0=KZ0+(KZ1-KZ0)*t0,z1=KZ0+(KZ1-KZ0)*t1,y=KH0+(KH1-KH0)*t1;S(KX-3,KX+3,0,y,Math.min(z0,z1),Math.max(z0,z1))}
  /* 가마 굴(반원 터널): 반원통을 비탈 기울기만큼 눕힘 */const tg0=new THREE.CylinderGeometry(1.55,1.55,len,28,1,false,-Math.PI/2,Math.PI);tg0.rotateX(-Math.PI/2);const tube=new THREE.Mesh(tg0,clay);tube.castShadow=tube.receiveShadow=true;const tg=new THREE.Group();tg.position.set(KX,(KH0+KH1)/2+.05,(KZ0+KZ1)/2);tg.rotation.x=ang;tg.add(tube);G.add(tg);
  S(KX-1.7,KX+1.7,0,9,KZ1-1,KZ0);
  /* 옆 불창(장작 넣는 구멍) */for(let i=1;i<8;i++){const t=i/8;const z=KZ0+(KZ1-KZ0)*t,y=KH0+(KH1-KH0)*t;for(const sx of[-1,1]){const h=new THREE.Mesh(new THREE.CircleGeometry(.22,12),M(0x1d120c));h.position.set(KX+sx*1.53,y+.7,z);h.rotation.y=sx*Math.PI/2;G.add(h)}}
  /* 아궁이와 불빛 */const mouth=new THREE.Mesh(new THREE.CircleGeometry(.75,20,0,Math.PI),M(0x140b06));mouth.position.set(KX,KH0+.02,KZ0+.02);G.add(mouth);const fire=new THREE.PointLight(0xff8a30,14,9,1.6);fire.position.set(KX,.6,KZ0+.8);G.add(fire);G.userData.fire=fire;
  const FL=[];if(!mini){const fm=new THREE.MeshBasicMaterial({color:0xffa040,transparent:true,opacity:.85,blending:THREE.AdditiveBlending,depthWrite:false});for(let i=0;i<14;i++){const f=new THREE.Mesh(new THREE.ConeGeometry(.12+r()*.1,.5+r()*.5,6),fm);f.position.set(KX+(r()-.5)*.9,.25,KZ0+.15+r()*.3);f.userData.p=r()*6;G.add(f);FL.push(f)}}G.userData.flames=FL;
  /* 굴뚝과 연기 */const ch=new THREE.Mesh(new THREE.CylinderGeometry(.5,.7,2.4,12),clay);ch.position.set(KX,KH1+1.4,KZ1-.4);ch.castShadow=true;G.add(ch);
  const SMK=[];if(!mini){const st=tex(64,64,(q,w,h)=>{const g=q.createRadialGradient(32,32,2,32,32,30);g.addColorStop(0,'rgba(230,226,220,.8)');g.addColorStop(1,'rgba(220,216,210,0)');q.fillStyle=g;q.fillRect(0,0,w,h)});st.wrapS=st.wrapT=THREE.ClampToEdgeWrapping;for(let i=0;i<16;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:st,transparent:true,depthWrite:false}));s.userData.t=i/16*5;G.add(s);SMK.push(s)}}G.userData.smoke=SMK;
  /* 장작더미 */const wd=M(0x6b4a2e);for(let i=0;i<24;i++){const l=new THREE.Mesh(new THREE.CylinderGeometry(.09,.1,1.4,6),wd);l.rotation.z=Math.PI/2;l.position.set(KX+3.4+(i%4)*.2,.1+Math.floor(i/4)*.19,KZ0-.4+(i%3)*.05);l.castShadow=true;G.add(l)}S(KX+3,KX+4.4,0,1.3,KZ0-1.2,KZ0+.4);
  spots.push({x:KX+1.6,y:0,z:KZ0+2.4,r:2.4,t:'오름가마 아궁이',h:'고려 도공들은 비탈을 따라 길게 오르는 굴 가마(오름가마)에서 청자를 구웠어요. 아래 아궁이에 불을 지피면 뜨거운 기운이 비탈을 타고 위로 올라가요. 1,250도 안팎까지 올려 하루 넘게 구워요.'});
  spots.push({x:KX+2.6,y:0,z:-8,r:2.6,t:'옆 불창',h:'가마 옆구리의 작은 구멍(불창)으로 장작을 넣어 칸마다 온도를 맞춰요. 불을 잘 다스려야 비색(翡色)이라 부른 맑은 푸른빛이 나와요.'})}
 /* ---------- 깨진 청자 조각 더미 ---------- */
 {const sh=[];const cm=[M(0x8fb3a0,{roughness:.35}),M(0x7fa592,{roughness:.35}),M(0xa3c1b0,{roughness:.35}),M(0x9a7a5a)];for(let i=0;i<140;i++){const t=new THREE.Mesh(new THREE.BoxGeometry(.15+r()*.2,.025,.1+r()*.15),cm[(r()*4)|0]);const a=r()*6.28,d=Math.sqrt(r())*2.2;t.position.set(KX+5.5+Math.cos(a)*d,.05+Math.max(0,(2.2-d))*.25+r()*.06,-12+Math.sin(a)*d);t.rotation.set(r()*.8,r()*6,r()*.8);t.castShadow=true;G.add(t)}solids.push({cx:KX+5.5,cz:-12,r:2.2,y0:0,y1:1.2});
  spots.push({x:KX+5.5,y:0,z:-9.2,r:2,t:'청자 조각 더미',h:'마음에 차지 않게 구워진 그릇은 깨뜨려 버렸어요. 그래서 가마터 둘레에는 청자 조각이 산처럼 쌓여 있어요. 연구자들은 이 조각으로 언제 어떤 청자를 구웠는지 알아내요.'})}
 /* ---------- 작업장: 물레, 건조대 ---------- */
 {const WX=9,WZ=0;const wood=M(0x6b4a2e);const fl=box(9,.3,6,M(0x9a7350));fl.position.set(WX,.15,WZ);G.add(fl);S(WX-4.5,WX+4.5,0,.3,WZ-3,WZ+3);for(const[a,b]of[[-4.3,-2.8],[4.3,-2.8],[-4.3,2.8],[4.3,2.8]]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.14,.16,3,10),wood);p.position.set(WX+a,1.8,WZ+b);G.add(p);solids.push({cx:WX+a,cz:WZ+b,r:.2,y0:0,y1:4})}
  if(!mini){const rf=hipRoof(MT,5.6,4,2.6,3.1,4.6,.4,.2,{plain:true,rs:.5});rf.position.set(WX,0,WZ);rf.traverse(o=>{if(o.isMesh)o.castShadow=true});G.add(rf)}
  /* 물레(돌아감) */const wh=new THREE.Group();wh.position.set(WX-1.6,.3,WZ+.6);G.add(wh);const base=new THREE.Mesh(new THREE.CylinderGeometry(.5,.6,.35,20),wood);base.position.y=.17;wh.add(base);const top=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,.06,24),M(0x5a3a22));top.position.y=.38;wh.add(top);
  const clayM=M(0xb88a62,{roughness:.6});const pot=new THREE.Mesh(new THREE.LatheGeometry([[.001,0],[.16,0],[.2,.1],[.17,.25],[.08,.34],[.09,.38],[.001,.38]].map(([a,b])=>new THREE.Vector2(a,b)),24),clayM);pot.position.y=.41;wh.add(pot);G.userData.wheel=wh;solids.push({cx:WX-1.6,cz:WZ+.6,r:.6,y0:0,y1:1});
  /* 건조대: 초벌 전 그릇들 */const sh=M(0x7a5634);for(let lv=0;lv<3;lv++){const p=box(3.4,.06,.7,sh);p.position.set(WX+2,.6+lv*.7,WZ-2.3);G.add(p)}for(const sx of[-1,1]){const l=box(.08,2.2,.7,sh);l.position.set(WX+2+sx*1.7,1.4,WZ-2.3);G.add(l)}S(WX+.2,WX+3.8,0,3,WZ-2.7,WZ-1.9);
  const green=M(0xd8c3a0,{roughness:.8});for(let lv=0;lv<3;lv++)for(let i=0;i<6;i++){const prof=[[.001,0],[.07,0],[.1,.08],[.09+r()*.03,.18+r()*.06],[.04,.26],[.05,.3],[.001,.3]].map(([a,b])=>new THREE.Vector2(a,b));const p=new THREE.Mesh(new THREE.LatheGeometry(prof,14),green);p.position.set(WX+.6+i*.55,.63+lv*.7,WZ-2.3);p.castShadow=true;G.add(p)}
  spots.push({x:WX-1.6,y:.3,z:WZ+2.2,r:1.8,t:'물레',h:'발로 물레를 돌리며 흙을 빚어 그릇 모양을 잡아요. 다 빚으면 조각칼로 무늬를 새기거나, 홈을 파고 흰 흙·붉은 흙을 메워 상감 무늬를 넣어요. 상감청자는 고려가 처음 꽃피운 기법이에요.'});
  spots.push({x:WX+2,y:.3,z:WZ-.4,r:1.6,t:'건조대',h:'빚은 그릇은 그늘에서 천천히 말린 뒤 한 번 낮은 불에 굽고(초벌), 유약을 입혀 다시 높은 불에 구워요(재벌). 유약 속 철분이 불 기운과 만나 푸른빛이 돼요.'})}
 /* ---------- 청자 진열각: 여덟 점을 실제 크기로 ---------- */
 {const DX=0,DZ=12;const pil=M(0x8a3a2a);const fl=box(12,.4,5,M(0xb3aa98));fl.position.set(DX,.2,DZ);G.add(fl);S(DX-6,DX+6,0,.4,DZ-2.5,DZ+2.5);for(const[a,b]of[[-5.6,-2.2],[5.6,-2.2],[-5.6,2.2],[5.6,2.2]]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.16,.18,3,10),pil);p.position.set(DX+a,1.9,DZ+b);G.add(p);solids.push({cx:DX+a,cz:DZ+b,r:.22,y0:0,y1:4})}
  if(!mini){const rf=hipRoof(MT,7.2,3.6,4.2,3.4,5.1,.5,.2,{plain:true,rs:.5});rf.position.set(DX,0,DZ);rf.traverse(o=>{if(o.isMesh)o.castShadow=true});G.add(rf)}
  const glass=new THREE.MeshPhysicalMaterial({color:0xffffff,transmission:.9,roughness:.05,transparent:true,opacity:.18,depthWrite:false});const ped=M(0xd9c9a8);
  const items=[['pitcher','청자 상감 국화모란무늬 주자',.192],['maebyeong','청자 음각 모란무늬 매병',.315],['winepot','청자 음각 연꽃무늬 주자',.235],['ewer','청자 음각 넝쿨무늬 주자',.235],['kundika','청자 정병',.364],['lion','청자 사자 뚜껑 향로',.434],['toad','청자 두꺼비 모양 벼루',.142],['kettle','청자 상감 표형 주전자',.252]];
  items.forEach(([k,n,h],i)=>{const x=DX-4.9+i*1.4,z=DZ-.2;const pd=box(.62,1.0,.62,ped);pd.position.set(x,.4+.5,z);G.add(pd);const gb=new THREE.Mesh(new THREE.BoxGeometry(.6,.62,.6),glass);gb.position.set(x,1.4+.31,z);G.add(gb);S(x-.32,x+.32,0,2.1,z-.32,z+.32);place(k,{x,y:1.42,z,h:Math.min(h*1.0,.55)});
   const cv=document.createElement('canvas');cv.width=320;cv.height=80;const q=cv.getContext('2d');q.fillStyle='#f3ead6';q.fillRect(0,0,320,80);q.fillStyle='#2b1d12';q.font='bold 24px "Gowun Dodum",sans-serif';q.textAlign='center';q.fillText(n.length>12?n.slice(0,12):n,160,34);if(n.length>12)q.fillText(n.slice(12),160,66);const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;const lb=new THREE.Mesh(new THREE.PlaneGeometry(.8,.2),new THREE.MeshBasicMaterial({map:t}));lb.position.set(x,.75,z+.46);G.add(lb)});
  const lamp=new THREE.PointLight(0xfff0d8,10,10,1.6);lamp.position.set(DX,3,DZ);G.add(lamp);
  spots.push({x:DX-2.1,y:.4,z:DZ+1.6,r:2,t:'상감청자',h:'왼쪽 첫 그릇은 홈에 흰 흙·붉은 흙을 메워 국화와 모란을 그린 상감청자 주자예요(1100년대). 두 번째는 어깨가 넓고 입이 좁은 매병이에요. 클리블랜드 미술관이 공개한 3D(CC0)를 실제 크기로 놓았어요.'});
  spots.push({x:DX+2.8,y:.4,z:DZ+1.6,r:2,t:'청자 사자 향로',h:'뚜껑 위에 사자가 앉은 향로, 두꺼비 모양 벼루, 표주박 모양 주전자예요. 고려 도공들은 생김새를 살린 상형청자도 잘 만들었어요. 국가유산청 재현 에셋(CC BY)이에요.'})}
 const tick=(P,dt)=>{const t=performance.now()/1000;const w=G.userData.wheel;if(w)w.rotation.y+=dt*4;const f=G.userData.fire;if(f)f.intensity=12+Math.sin(t*9)*2+Math.sin(t*23)*1.5;for(const fl of G.userData.flames||[]){fl.scale.y=.7+Math.abs(Math.sin(t*7+fl.userData.p))*.7;fl.position.y=.2+fl.scale.y*.25}
  for(const s of G.userData.smoke||[]){s.userData.t+=dt;const u=(s.userData.t%5)/5;s.position.set(KX+Math.sin(u*4+s.id)*.4*u,KH1+2.7+u*6,KZ1-.4-u*1.5);const k=.8+u*3;s.scale.set(k,k,1);s.material.opacity=.55*(1-u)}};
 const meta={quest:{t:'고려청자 가마 탐방',d:'청자가 만들어지는 길을 따라 여섯 곳을 살펴보세요.',steps:[['물레','물레'],['건조대','건조대'],['오름가마 아궁이','오름가마 아궁이'],['옆 불창','옆 불창'],['청자 조각 더미','청자 조각 더미'],['진열각의 상감청자','상감청자']],done:'흙에서 비색 청자가 되기까지의 길을 다 걸었어요. 진열각의 사자 향로와 두꺼비 벼루도 놓치지 마세요.'},
  title:'강진 고려청자 가마 마당',video:'unhak',hint:'고려청자를 굽던 오름가마와 도공의 작업장이에요. 물레와 건조대를 지나 가마 아궁이와 청자 조각 더미를 보고, 진열각에서 고려청자 여덟 점을 실제 크기로 보세요. (3D: 클리블랜드 미술관 CC0 · 국가유산청 CC BY)',
  env:{plaza:null,beds:false,trees:true,sign:{x:4,z:20,lines:['강진 고려청자 가마 마당','오름가마 · 물레 · 조각 더미','청자 진열각(실제 크기 8점)','가마는 본떠 지었어요']},treeAvoid:(x,z)=>Math.hypot(x,z+2)<27},
  npc:[['ceramic',[[7,.3,2.6],[11,.3,2.6]]],['metal',[[-8,0,6],[-8,0,-6]]]],
  level:P=>Math.abs(P.x-KX)<3.5&&P.z<KZ0+2?'오름가마':Math.abs(P.x-9)<4.5&&Math.abs(P.z)<3?'작업장':Math.abs(P.z-12)<2.6&&Math.abs(P.x)<6?'청자 진열각':'가마 마당',
  camCap:()=>Infinity,tick,
  mini:{S:5,ox:0,oz:-2,draw(g,X,Z,S){g.fillStyle='#7aa04e';g.fillRect(0,0,300,300);g.fillStyle='#a8774f';g.beginPath();g.arc(X(0),Z(-2),24*S,0,7);g.fill();g.fillStyle='#6b4a2e';g.fillRect(X(KX-1.6),Z(KZ1),3.2*S,(KZ0-KZ1)*S);g.fillStyle='#9a7350';g.fillRect(X(4.5),Z(-3),9*S,6*S);g.fillStyle='#8a3a2a';g.fillRect(X(-6),Z(9.5),12*S,5*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:22,yaw:Math.PI},size:{}},meta)}
