/* 단양 온달산성 마당: 산성 드론 실측 3D를 큰 '산성 모형'으로 놓고 전망대에서 내려다본다. 무이가 꼭대기에 장대를 반투명하게 되살려 보여 준다(상상).
   무이가 모형 위에 옛 건물을 반투명하게 되살려 보여 준다(되살린 모습은 터를 보고 상상해 본 것).
   갱신 2026-11-17. 3D: lacomi1975 드론 실측 「Ondalsanseong Fortress, Danyang (온달산성)」(Sketchfab, CC BY 4.0). 회암사지·공산성 마당과 같은 방식.
   원본은 겨울 산 전체라 낮은 질 비탈이 많아, 성벽 둘레 반지름 8만 잘라 씀(블렌더). 눈높이로 가까이 보면 스캔 면이 거칠어 위에서 보게 함. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,mulb,materials,hipRoof} from './sungnyemun.js';
import {stoneLantern} from './stonekit.js';
const MURL=k=>new URL('../models/ondal/'+k+'.glb',import.meta.url).href;
/* 되살릴 누각(모형 좌표 x,z, 폭, 깊이, 회전, 높이): 위에서 본 사진의 큰 바닥 자리를 골라 둠 */
const HALLS=[];
export function buildOndal(opts={}){const mini=!!opts.mini;const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(331);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
 {const g=new THREE.Mesh(new THREE.PlaneGeometry(160,160),M(0x7d8a5a));g.rotation.x=-Math.PI/2;g.receiveShadow=true;G.add(g)}
 const PV=tex(256,256,(q,w,h)=>{q.fillStyle='#8e887c';q.fillRect(0,0,w,h);for(let i=0;i<6;i++)for(let j=0;j<7;j++){const v=150+Math.floor(r()*40);q.fillStyle=`rgb(${v},${v-5},${v-14})`;q.fillRect(i*43+2,j*43-((i%2)*20)+2,39,39)}},[10,10]);
 {const p=new THREE.Mesh(new THREE.PlaneGeometry(44,48),new THREE.MeshStandardMaterial({map:PV,roughness:1}));p.rotation.x=-Math.PI/2;p.position.y=.01;p.receiveShadow=true;G.add(p)}
 /* ---------- 산성 모형: 낮은 돌 받침 위 ---------- */
 const MW=16,MD=15;
 {const base=box(MW+1.2,.5,MD+1.2,M(0x8e887c));base.position.set(0,.25,0);G.add(base);S(-(MW+1.2)/2,(MW+1.2)/2,0,4,-(MD+1.2)/2,(MD+1.2)/2);
  const rim=box(MW+1.6,.12,MD+1.6,M(0x5a4a3a));rim.position.set(0,.5,0);G.add(rim)}
 const model=new THREE.Group();model.position.y=.52;G.add(model);let MB=null;const ms=[];
 const ghosts=new THREE.Group();ghosts.visible=false;ghosts.userData.noBatch=true;G.add(ghosts);
 const gm=new THREE.MeshStandardMaterial({color:0xf2d27a,transparent:true,opacity:.45,emissive:0x8a6a20,emissiveIntensity:.6,depthWrite:false,roughness:.6});
 function addHall([x,z,w,d,ry,h]){const rc=new THREE.Raycaster();rc.set(new THREE.Vector3(x,30,z),new THREE.Vector3(0,-1,0));const hit=rc.intersectObjects(ms,false)[0];const y=hit?hit.point.y:(MB?MB.min.y:.5);
  const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry;const body=box(w*.86,h*.5,d*.8,gm);body.castShadow=false;body.position.y=h*.25;g.add(body);
  try{const rf=hipRoof(MT,w/2,d/2,Math.max(.05,w/2-d*.25),h*.5,h,.05,.02,{plain:true,rs:.3});rf.traverse(e=>{if(e.isMesh){e.material=gm;e.castShadow=false}});g.add(rf)}catch(e){}
  ghosts.add(g)}
 if(!mini)new GLTFLoader().load(MURL('scan'),m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.receiveShadow=true;e.castShadow=true;if(e.material){e.material.roughness=1;e.material.metalness=0}ms.push(e)}});o.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o),sz=b.getSize(new THREE.Vector3());const sc=Math.min(MW/sz.x,MD/sz.z);o.scale.setScalar(sc);o.position.set(-(b.min.x+b.max.x)/2*sc,-b.min.y*sc,-(b.min.z+b.max.z)/2*sc);model.add(o);/* 산 덩어리가 높아(약 6m) 아랫부분(질 낮은 비탈)은 받침 아래로 묻고 꼭대기 3.2m만 보이게 */{const hh=b.getSize(new THREE.Vector3()).y*sc;if(hh>3.2)o.position.y-=hh-3.2}model.updateMatrixWorld(true);MB=new THREE.Box3().setFromObject(model);
  /* 장대: 성벽이 두른 꼭대기 평지(모형 가운데) */HALLS.push([0,.3,1.2,.85,0,1.05]);
  for(const H of HALLS)addHall(H);window.__ODL={MB:{min:MB.min.toArray(),max:MB.max.toArray()},ms,addHall,ghosts}},undefined,e=>console.warn('온달산성 스캔 못 불러옴',e));
 /* 되살리기: 건물이 땅에서 솟아오름 */
 window.__ODUP=()=>{if(ghosts.visible){ghosts.visible=false;return false}ghosts.visible=true;try{const H=window.__H3;H.face(Math.PI);H.cam(0,innerWidth<innerHeight?1.05:.9,innerWidth<innerHeight?13:10)}catch(e){}const t0=performance.now();const step=()=>{const k=Math.min(1,(performance.now()-t0)/2400),e=1-Math.pow(1-k,3);for(const g of ghosts.children)g.scale.y=Math.max(.001,e);if(k<1)requestAnimationFrame(step)};step();return true};
 /* ---------- 남쪽 전망대: 계단으로 올라 모형을 내려다봄 ---------- */
 const DH=3.4,DZ0=9.4,DZ1=13;
 {const wd=M(0x6a4a2e),pil=M(0x8a3a2a);const fl=box(14,.2,DZ1-DZ0,wd);fl.position.set(0,DH-.1,(DZ0+DZ1)/2);G.add(fl);S(-7,7,0,DH,DZ0,DZ1);
  for(const x of[-6.6,-2.2,2.2,6.6])for(const z of[DZ0+.2,DZ1-.2]){const p=box(.24,DH,.24,pil);p.position.set(x,DH/2,z);G.add(p)}
  for(const[x0,z0,x1,z1]of[[-7,DZ0,7,DZ0],[-7,DZ0,-7,DZ1],[7,DZ0,7,DZ1]]){const L=Math.hypot(x1-x0,z1-z0),a=Math.atan2(z1-z0,x1-x0);const rl=box(L,.08,.08,wd);rl.position.set((x0+x1)/2,DH+.9,(z0+z1)/2);rl.rotation.y=-a;G.add(rl);const n=Math.round(L/.6);for(let i=0;i<=n;i++){const t=i/n,pp=box(.06,.9,.06,wd);pp.position.set(x0+(x1-x0)*t,DH+.45,z0+(z1-z0)*t);G.add(pp)}if(z0===z1)S(x0,x1,DH,DH+1,z0-.1,z0+.1);else S(x0-.1,x0+.1,DH,DH+1,z0,z1)}
  const n=10;for(let i=0;i<n;i++){const h=DH*(i+1)/n,z1=DZ1+(n-i)*.42,z0=z1-.42;const st=box(2.4,h,.42,M(0x9a9282));st.position.set(0,h/2,(z0+z1)/2);G.add(st);S(-1.2,1.2,0,h,z0,z1)}}
 /* ---------- 마당 둘레: 낮은 돌담(남쪽 가운데 트임), 계단 앞 석등 한 쌍, 쉼터 의자 ---------- */
 {const HX=22,HZ=24;const st=M(0x9a9282),cp=M(0x5a5248,{roughness:.8});const wall=(x0,z0,x1,z1)=>{const L=Math.hypot(x1-x0,z1-z0),a=Math.atan2(z1-z0,x1-x0);const w=box(L,.7,.5,st);w.position.set((x0+x1)/2,.35,(z0+z1)/2);w.rotation.y=-a;G.add(w);const c=box(L+.1,.14,.66,cp);c.position.set((x0+x1)/2,.77,(z0+z1)/2);c.rotation.y=-a;G.add(c);if(Math.abs(z1-z0)<.01)S(x0,x1,0,.9,z0-.25,z0+.25);else S(x0-.25,x0+.25,0,.9,z0,z1)};
  wall(-HX,-HZ,HX,-HZ);wall(-HX,-HZ,-HX,HZ);wall(HX,-HZ,HX,HZ);wall(-HX,HZ,-3,HZ);wall(3,HZ,HX,HZ);
  for(const sx of[-1,1]){const L=stoneLantern(2.2);L.position.set(sx*2.6,0,DZ1+4.4);G.add(L);solids.push({cx:sx*2.6,cz:DZ1+4.4,r:.45,y0:0,y1:2.3});
   const bw=M(0x6a4a2e,{roughness:.7});const bn=new THREE.Group();bn.position.set(sx*(HX-5),0,HZ-6);bn.rotation.y=Math.PI;G.add(bn);const seat=box(2.2,.1,.5,bw);seat.position.y=.45;bn.add(seat);for(const lx of[-.9,.9]){const lg=box(.12,.45,.42,bw);lg.position.set(lx,.22,0);bn.add(lg)}solids.push({cx:sx*(HX-5),cz:HZ-6,r:.9,y0:0,y1:.5,nt:1})}}
 /* ---------- 실물 사진 안내판(위키미디어 공용 자유 사진, 출처 표기) ---------- */
 {const PH=[['od1',1.228,-15,0,'실물: 단양 온달산성 (문화재청, 공공누리 제1유형)']];const tl=new THREE.TextureLoader();PH.forEach(([k,ar,x,z,cap],i)=>{const w=2.6,h=w/ar;const g=new THREE.Group();g.position.set(x,1.25+h/2,z);g.rotation.y=Math.PI/2;G.add(g);const fr=box(w+.16,h+.16,.06,M(0x2a1a10));g.add(fr);const bk=box(w+.3,h+.3,.05,M(0x8a6040));bk.position.z=-.055;g.add(bk);for(let i=1;i<Math.round((w+.3)/.3);i++){const ln=box(.02,h+.3,.052,M(0x5a3a22));ln.position.set(-(w+.3)/2+i*.3,0,-.06);g.add(ln)}for(const sd of[-1,1]){const rf=box(w+.6,.05,.32,M(0x3a3e44));rf.position.set(0,h/2+.24,sd*.1);rf.rotation.x=sd*.45;g.add(rf)}{const rd=box(w+.66,.07,.08,M(0x2a2d32));rd.position.set(0,h/2+.31,0);g.add(rd)}for(const lx of[-w/2+.15,w/2-.15]){const lg=box(.1,1.25+.1,.1,M(0x5a3a22));lg.position.set(lx,-h/2-(1.25)/2,-.05);g.add(lg)}
  const pm=new THREE.MeshBasicMaterial({color:0xffffff});tl.load(new URL('../textures/scansites/'+k+'.jpg',import.meta.url).href,t=>{t.colorSpace=THREE.SRGBColorSpace;pm.map=t;pm.needsUpdate=true});const pl=new THREE.Mesh(new THREE.PlaneGeometry(w,h),pm);pl.position.z=.035;g.add(pl);
  const cv=document.createElement('canvas');cv.width=640;cv.height=64;const q=cv.getContext('2d');q.fillStyle='#f3ead6';q.fillRect(0,0,640,64);q.fillStyle='#2b1d12';q.font='bold 24px "Gowun Dodum",sans-serif';q.textAlign='center';q.fillText(cap,320,42,620);const ct=new THREE.CanvasTexture(cv);ct.colorSpace=THREE.SRGBColorSpace;const lb=new THREE.Mesh(new THREE.PlaneGeometry(2.6,.26),new THREE.MeshBasicMaterial({map:ct}));lb.position.set(0,-h/2-.24,.04);g.add(lb);solids.push({cx:x,cz:z,r:.5,y0:0,y1:4})})}
 /* ---------- 볼거리 ---------- */
 spots.push({x:0,y:0,z:-10,r:3,t:'온달산성 모형',h:'남한강을 내려다보는 산꼭대기를 돌로 둘러쌓은 삼국 시대 산성이에요. 고구려 장수 온달이 이곳에서 싸우다 숨졌다는 이야기가 전해져 온달산성이라 불러요. 성벽 둘레는 약 680m예요. 드론으로 찍은 실제 산성을 모형처럼 줄여 놓았어요. (3D: lacomi1975 드론 실측, CC BY)'});
 spots.push({x:0,y:DH,z:(DZ0+DZ1)/2,r:2.6,t:'산성 전망대',h:'위에서 보면 산꼭대기를 성벽이 테두리처럼 두르고 있어요. 무이와 함께 꼭대기에 장대(성을 지휘하던 누각)를 세워 보세요. (되살린 장대는 상상해 본 모습이에요)'});
 const meta={quest:{t:'온달산성 둘러보기',d:'산성 모형을 보고 전망대에 올라 장대를 되살려 보세요.',steps:[['온달산성 모형','온달산성 모형'],['산성 전망대','산성 전망대']]},
  title:'단양 온달산성',hint:'남한강 위 산꼭대기를 돌로 두른 삼국 시대 산성이에요. 드론으로 찍은 실제 산성을 모형처럼 놓았어요. 전망대에 올라 내려다보고, 무이와 함께 꼭대기에 장대를 세워 보세요. (3D: lacomi1975 드론 실측, CC BY)',
  env:{plaza:null,beds:false,trees:true,treeAvoid:(x,z)=>Math.abs(x)<26&&Math.abs(z)<26,sign:{x:-6,z:20,lines:['단양 온달산성','남한강 위 삼국 시대 산성','드론 실측 산성 모형','전망대에서 장대 되살리기']}},
  npc:[['carpenter',[[-13,2],[-13,-6]]]],level:P=>P.y>DH-.2?'전망대':'산성 마당',camCap:()=>Infinity,
  mini:{S:4,ox:0,oz:2,draw(g,X,Z,S){g.fillStyle='#7d8a5a';g.fillRect(0,0,300,300);g.fillStyle='#a8a090';g.fillRect(X(-22),Z(-22),44*S,44*S);g.fillStyle='#5a6a3a';g.fillRect(X(-MW/2),Z(-MD/2),MW*S,MD*S);g.fillStyle='#6a4a2e';g.fillRect(X(-7),Z(DZ0),14*S,(DZ1-DZ0)*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:24,yaw:Math.PI},size:{}},meta)}
