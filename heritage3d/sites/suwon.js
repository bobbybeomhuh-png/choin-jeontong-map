/* 수원 화성 장안문과 축성 현장. 단위 1 = 1m, 입구 +z(성 안쪽), 장안문 옹성은 -z(성 밖).
   갱신 2026-11-12. 장안문(옹성, 성벽 포함)과 홍이포는 한국문화정보원 KCISA 3D(CC BY), 거중기는 KBU jiin712921(CC BY).
   장안문 원본 167만 면을 20만 면으로 줄이고 색 텍스처만 남김(Draco 압축). 충돌은 블렌더 높이 지도로 뽑은 상자(suwon_col.js).
   화성능행도 8폭 병풍은 위키미디어 공용 퍼블릭 도메인 사진(국립고궁박물관 소장, 김득신 등). 축성 현장 마당과 전시 정자는 본떠 지은 것. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,noise,mulb,materials,hipRoof} from './sungnyemun.js';
import {JG_COL} from './suwon_col.js';
const MURL=k=>new URL('../models/suwon/'+k+'.glb',import.meta.url).href;
const TURL=k=>new URL('../textures/suwon/'+k+'.jpg',import.meta.url).href;
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
export function buildSuwon(opts={}){const mini=!!opts.mini;const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(91);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
 const gl=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(dr);
 const TL=new THREE.TextureLoader();
 /* 모델 놓기: h 높이 맞춤, len 긴 변 맞춤, 없으면 원래 크기. 바닥을 y에 붙이고 가운데 정렬 */
 function place(k,{x,y=0,z,h=null,len=null,ry=0,cb=null}={}){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry;G.add(g);if(mini)return g;gl.load(MURL(k),m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;e.receiveShadow=true}});o.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o),s=b.getSize(V(0,0,0));const sc=h?h/s.y:len?len/Math.max(s.x,s.z):1;o.scale.setScalar(sc);
   o.position.set(-(b.min.x+b.max.x)/2*sc,-b.min.y*sc,-(b.min.z+b.max.z)/2*sc);g.add(o);if(cb)cb(o)},undefined,e=>console.warn('모델 못 불러옴',k,e));return g}
 /* ---------- 땅: 잔디, 앞마당 흙길 ---------- */
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#7a9a4c';q.fillRect(0,0,w,h);noise(q,w,h,7000,['#86a85a','#6a8a40','#8fae60'],2)});GT.wrapS=GT.wrapT=THREE.RepeatWrapping;GT.repeat.set(50,50);const gr=new THREE.Mesh(new THREE.PlaneGeometry(320,320),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.position.y=.01;gr.receiveShadow=true;G.add(gr);
  const PT=tex(256,256,(q,w,h)=>{q.fillStyle='#c8b48c';q.fillRect(0,0,w,h);noise(q,w,h,5000,['rgba(0,0,0,.07)','rgba(255,255,255,.08)'],2)});PT.wrapS=PT.wrapT=THREE.RepeatWrapping;PT.repeat.set(10,8);const yd=new THREE.Mesh(new THREE.PlaneGeometry(76,50),new THREE.MeshStandardMaterial({map:PT,roughness:1}));yd.rotation.x=-Math.PI/2;yd.position.set(-2,.02,26);yd.receiveShadow=true;G.add(yd);
  const rd=new THREE.Mesh(new THREE.PlaneGeometry(6,44),new THREE.MeshStandardMaterial({map:PT,roughness:1}));rd.rotation.x=-Math.PI/2;rd.position.set(-1.9,.02,-22);G.add(rd)}
 /* ---------- 장안문(성벽은 x축을 따라, 옹성은 -z). 문짝은 열어 둠(숨김) ---------- */
 const GX=-1.9;/* 성문 통로 가운데 x */
 place('janganmun',{x:0,y:-.42,z:-8,ry:Math.PI/2,cb:o=>{o.traverse(e=>{if(e.isMesh){const n=(e.material&&e.material.name)||'';if(/MetalDoor/i.test(n))e.visible=false;if(/Flag/i.test(n))e.castShadow=false}})}});
 for(const [x0,x1,z0,z1,h] of JG_COL)S(x0,x1,0,h,z0,z1);
 spots.push({x:GX,y:0,z:4,r:3,t:'장안문',h:'수원 화성의 북쪽 정문이에요. 서울에서 내려오는 임금이 이 문으로 들어왔어요. 2층 문루를 올린 큰 성문으로, 한국전쟁 때 문루가 불탔다가 1978년 화성성역의궤 기록대로 다시 지었어요. (3D: 한국문화정보원 KCISA, CC BY)'});
 spots.push({x:GX,y:0,z:-30,r:3.4,t:'옹성',h:'성문 바깥을 반달 모양으로 한 번 더 감싼 성이에요. 적이 성문에 바로 닿지 못하고, 들어오면 사방에서 공격받게 만든 장치예요. 화성의 네 대문 가운데 장안문과 팔달문에 옹성이 있어요.'});
 /* ---------- 홍이포 둘: 성문 안쪽 양옆 ---------- */
 for(const sx of[-1,1]){place('hongipo',{x:GX+sx*9,z:5,ry:Math.PI/2+(sx>0?.15:-.15)});S(GX+sx*9-1.1,GX+sx*9+1.1,0,1.6,3,7)}
 spots.push({x:GX+9,y:0,z:8,r:2.2,t:'홍이포',h:'17세기에 네덜란드식 대포를 본떠 만든 큰 대포예요. 나무 수레에 얹어 옮기고 쇠공을 멀리 쏘았어요. 화성 같은 큰 성에 두어 성을 지켰어요. (3D: 한국문화정보원 KCISA, CC BY)'});
 /* ---------- 축성 현장(서쪽): 거중기, 성돌 더미, 유형거, 감독 천막 ---------- */
 const BX=-26,BZ=18;const stn=M(0xbab3a6),stn2=M(0xa59e92);
 {place('geojunggi',{x:BX,z:BZ,ry:0});S(BX-4.3,BX+4.3,0,4.3,BZ-1.1,BZ+1.1);
  /* 거중기에 매달린 성돌 */const hang=box(1.2,.6,.9,stn);hang.position.set(BX,1.6,BZ);G.add(hang);G.userData.hang=hang;
  /* 다듬은 성돌 더미 */for(let i=0;i<26;i++){const w=.9+r()*.5,h=.45+r()*.2,d=.6+r()*.3;const b=box(w,h,d,r()<.5?stn:stn2);const L=i%9,row=Math.floor(i/9);b.position.set(BX-8+(L%3)*1.15+row*.2,h/2+row*.62,BZ+5+Math.floor(L/3)*.9);b.rotation.y=(r()-.5)*.15;G.add(b)}
  S(BX-8.8,BX-4.2,0,2,BZ+4.4,BZ+8);
  /* 유형거(돌 나르는 수레) */{const cart=new THREE.Group();cart.position.set(BX+7,0,BZ+6);cart.rotation.y=.4;G.add(cart);const wd=M(0x7a5232);const bed=box(1.4,.12,2.6,wd);bed.position.y=.75;cart.add(bed);for(const sx of[-1,1]){const wh=new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,.12,16),wd);wh.rotation.z=Math.PI/2;wh.position.set(sx*.8,.55,0);cart.add(wh);const sh=box(.08,.08,2.4,wd);sh.position.set(sx*.45,.72,2.2);sh.rotation.x=-.25;cart.add(sh)}const st=box(1,.45,.8,stn);st.position.y=1.03;cart.add(st);S(BX+5.6,BX+8.4,0,1.3,BZ+4.4,BZ+7.6)}
  /* 감독 천막 */{const tw=M(0xf0ead8,{side:THREE.DoubleSide});const tent=new THREE.Mesh(new THREE.ConeGeometry(3.6,1.6,4,1,true),tw);tent.rotation.y=Math.PI/4;tent.position.set(BX-2,3.4,BZ-6.5);G.add(tent);for(const [px,pz] of[[-2.4,-2.4],[2.4,-2.4],[-2.4,2.4],[2.4,2.4]]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,2.6,6),M(0x6b4a2e));p.position.set(BX-2+px,1.3,BZ-6.5+pz);G.add(p);solids.push({cx:BX-2+px,cz:BZ-6.5+pz,r:.12,y0:0,y1:3})}
   const tb=box(2,.08,1,M(0x8a6a44));tb.position.set(BX-2,.8,BZ-6.5);G.add(tb);S(BX-3,BX-1,0,.84,BZ-7,BZ-6);
   /* 성역의궤 펼친 책 */const bk=box(.7,.03,.5,M(0xe9dfc4));bk.position.set(BX-2,.86,BZ-6.5);G.add(bk)}
  spots.push({x:BX,y:0,z:BZ+3,r:2.6,t:'거중기',h:'정약용이 중국에서 들여온 책 『기기도설』을 참고해 만든 들어 올리는 기계예요. 위아래에 도르래를 여러 개 달아 작은 힘으로 무거운 성돌을 들었어요. 덕분에 10년 걸릴 거라던 화성 공사가 2년 9개월(1794~1796) 만에 끝났어요. (3D: KBU jiin712921, CC BY)'});
  spots.push({x:BX-6.5,y:0,z:BZ+3,r:2.2,t:'성돌 더미',h:'화성 성벽은 다듬은 돌로 쌓았어요. 돌을 캐고 나른 사람, 날짜, 품삯까지 『화성성역의궤』에 다 적어 두었기 때문에 지금도 그대로 다시 쌓을 수 있어요.'});
  spots.push({x:BX+7,y:0,z:BZ+3.6,r:2,t:'유형거',h:'정약용이 만든 돌 나르는 수레예요. 바퀴 위 받침이 시소처럼 움직여 무거운 돌을 쉽게 싣고 내렸어요. 보통 수레보다 훨씬 적은 사람으로 많은 돌을 날랐어요.'})}
 /* ---------- 화성능행도 전시각(동쪽): 8폭 병풍 + 배다리 확대 ---------- */
 const PX=24,PZ=22,PW=12,PD=7,PH=3.4,FY=.4;
 {const base=box(PW+1,FY,PD+1,M(0xb3aa98));base.position.set(PX,FY/2,PZ);G.add(base);S(PX-(PW+1)/2,PX+(PW+1)/2,0,FY,PZ-(PD+1)/2,PZ+(PD+1)/2);
  const fl=box(PW,.06,PD,M(0x9a7350));fl.position.set(PX,FY+.03,PZ);G.add(fl);
  for(const x of[-PW/2,-PW/6,PW/6,PW/2])for(const z of[-PD/2,PD/2]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.18,.2,PH,10),M(0x8a3a2a));c.position.set(PX+x,FY+PH/2,PZ+z);c.castShadow=true;G.add(c);solids.push({cx:PX+x,cz:PZ+z,r:.24,y0:0,y1:9})}
  const bw=box(PW,PH,.2,M(0xf2ede2));bw.position.set(PX,FY+PH/2,PZ-PD/2);G.add(bw);S(PX-PW/2,PX+PW/2,0,9,PZ-PD/2-.15,PZ-PD/2+.15);
  if(!mini){const rf=hipRoof(MT,PW/2+1.4,PD/2+1.4,PW/2-2,FY+PH+.1,FY+PH+2.6,.5,.2,{plain:true,rs:.5});rf.position.set(PX,0,PZ);rf.traverse(o=>{if(o.isMesh)o.castShadow=true});G.add(rf)}
  /* 8폭 병풍(지그재그) */{const W1=1.05,H1=2.33;const g=new THREE.Group();g.position.set(PX,FY+.08,PZ-PD/2+1.1);G.add(g);
   for(let i=0;i<8;i++){const pg=new THREE.Group();pg.position.set((i-3.5)*W1*.985,H1/2+.06,(i%2)*.16);pg.rotation.y=(i%2?-1:1)*.18;g.add(pg);pg.add(box(W1+.05,H1+.14,.04,M(0x3b2414)));
    const m=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.85});if(!mini)TL.load(TURL('nh_'+(i+1)),t=>{t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;m.map=t;m.needsUpdate=true});const p=new THREE.Mesh(new THREE.PlaneGeometry(W1,H1),m);p.position.z=.025;pg.add(p)}
   S(PX-4.4,PX+4.4,0,3,PZ-PD/2+.8,PZ-PD/2+1.5)}
  /* 배다리 확대 족자(오른쪽) */{const g=new THREE.Group();g.position.set(PX+PW/2-.9,FY+1.75,PZ+.6);g.rotation.y=-Math.PI/2;G.add(g);g.add(box(1.3,2.75,.05,M(0x3b2414)));const m=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.85});if(!mini)TL.load(TURL('baedari'),t=>{t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;m.map=t;m.needsUpdate=true});const p=new THREE.Mesh(new THREE.PlaneGeometry(1.14,2.55),m);p.position.z=.03;g.add(p);const st=box(.6,FY+.2,.6,M(0x5a3a22));st.position.set(PX+PW/2-.9,FY/2,PZ+.6);G.add(st);S(PX+PW/2-1.6,PX+PW/2-.2,0,3.2,PZ-.2,PZ+1.4)}
  {const cv=document.createElement('canvas');cv.width=640;cv.height=170;const q=cv.getContext('2d');q.fillStyle='#2a1a10';q.fillRect(0,0,640,170);q.strokeStyle='#d8a838';q.lineWidth=10;q.strokeRect(6,6,628,158);q.fillStyle='#f2d27a';q.textAlign='center';q.font='bold 76px "Noto Serif KR",serif';q.fillText('능행도 전시각',320,112,600);const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;const pl=new THREE.Mesh(new THREE.PlaneGeometry(3,.8),new THREE.MeshBasicMaterial({map:t}));pl.position.set(PX,FY+PH-.3,PZ+PD/2+.25);G.add(pl)}
  spots.push({x:PX,y:FY,z:PZ+.4,r:2.6,t:'화성능행도',h:'1795년 윤2월, 정조가 어머니 혜경궁 홍씨의 회갑을 맞아 화성으로 8일 동안 다녀온 행차를 그린 8폭 병풍이에요. 잔치, 과거 시험, 군사 훈련, 돌아오는 행렬까지 수천 명을 한 사람씩 그렸어요. (사진: 국립고궁박물관 소장품, 퍼블릭 도메인)'});
  spots.push({x:PX+PW/2-2.6,y:FY,z:PZ+.6,r:1.6,t:'배다리',h:'한강을 건너려고 배 수십 척을 나란히 묶고 그 위에 널판을 깐 다리예요. 정조의 큰 행렬이 이 배다리로 한강을 건넜어요. 설계는 정약용이 도왔다고 전해요.'})}
 /* ---------- 오방색 깃발 줄(앞마당) ---------- */
 if(!mini){const cols=[0x2f5fa8,0xc8342c,0xe6c23a,0xf2f2ee,0x2a2a2a];for(let i=0;i<10;i++){const x=-24+i*5.2,z=48;const p=new THREE.Mesh(new THREE.CylinderGeometry(.05,.06,4.2,6),M(0x6b4a2e));p.position.set(x,2.1,z);G.add(p);const f=new THREE.Mesh(new THREE.PlaneGeometry(1.1,.8),M(cols[i%5],{side:THREE.DoubleSide}));f.position.set(x+.58,3.7,z);G.add(f);solids.push({cx:x,cz:z,r:.1,y0:0,y1:4})}}
 const meta={quest:{t:'화성 축성 순례',d:'정조와 정약용이 쌓은 화성의 여섯 곳을 찾아 보세요.',steps:[['장안문','장안문'],['옹성','옹성'],['거중기','거중기'],['유형거','유형거'],['홍이포','홍이포'],['화성능행도','화성능행도']],done:'화성 축성 순례를 마쳤어요. 거중기와 유형거, 그리고 모든 걸 적어 둔 의궤 덕분에 화성은 지금도 그대로 다시 지을 수 있어요.'},
  title:'수원 화성 장안문',video:'geojung',hint:'수원 화성의 북문 장안문(옹성과 성벽 포함, 실측 3D)과 성을 쌓던 현장이에요. 성문 통로를 지나 옹성까지 걸어가 보고, 서쪽 축성 현장의 거중기와 동쪽 전시각의 화성능행도 병풍을 찾아 보세요. (3D: 한국문화정보원 KCISA·KBU, CC BY · 병풍 사진: 퍼블릭 도메인)',
  env:{plaza:null,beds:false,trees:true,sign:{x:4,z:44,lines:['수원 화성 장안문','장안문 · 옹성 · 성벽(실측 3D)','거중기 · 유형거 · 홍이포','화성능행도 8폭 병풍']},treeAvoid:(x,z)=>(Math.abs(x)<92&&z>-44&&z<56)},
  npc:[['carpenter',[[BX-4,BZ+2.4],[BX+4,BZ+2.4]]],['painter',[[PX-4,PZ+5],[PX+4,PZ+5]]]],
  level:P=>P.z<-14?'장안문 옹성':P.z<1?'장안문 통로':Math.abs(P.x-PX)<PW/2&&Math.abs(P.z-PZ)<PD/2?'능행도 전시각':P.x<-14?'축성 현장':'장안문 앞마당',
  camCap:P=>P.z<1&&P.z>-14&&Math.abs(P.x-GX)<3?3:Math.abs(P.x-PX)<PW/2&&Math.abs(P.z-PZ)<PD/2?3.2:Infinity,
  tick(P,dt){const u=G.userData;u.t=(u.t||0)+(dt||0);if(u.hang)u.hang.position.y=1.4+Math.sin(u.t*.6)*.9},
  mini:{S:2.4,ox:0,oz:4,draw(g,X,Z,S){g.fillStyle='#7a9a4c';g.fillRect(0,0,300,300);g.fillStyle='#c8b48c';g.fillRect(X(-40),Z(1),76*S,50*S);g.fillStyle='#8f877a';g.fillRect(X(-80),Z(-16),160*S,5*S);g.beginPath();g.arc(X(GX),Z(-22),12*S,Math.PI,0,false);g.lineWidth=2.5*S;g.strokeStyle='#8f877a';g.stroke();g.fillStyle='#6b4a2e';g.fillRect(X(PX-PW/2),Z(PZ-PD/2),PW*S,PD*S);g.fillStyle='#9a8a70';g.fillRect(X(BX-5),Z(BZ-1),10*S,2*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:GX,z:40,yaw:Math.PI},size:{}},meta)}
