/* 서울 문화역서울284(옛 서울역) 마당(2026-11-20): 한국문화정보원(KCISA)이 실측한 3D(스케치팹 kcisameta, CC BY 4.0)를 실제 크기로.
   바깥: 1925년에 지은 붉은 벽돌 역사(돔·시계탑), 길이 약 167m. 광장 높이 바닥은 높이 지도로 뽑아 걸어 다님.
   안: 중앙홀·귀빈실·귀빈예비실·역장실·전시실을 실제 크기 방으로 따로 두고, 정문 앞 '안으로 들어가기'로 옮겨 감(눈높이 그대로, VR 시험용). */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildSeoulstation(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1925);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 const OY=-4.0;/* 실측 광장 높이(약 4m)를 땅 0에 맞춤 */
 /* 실내 방: [이름, 실측 가운데 x, z, 바닥 Z0, 놓을 x, z, 너비, 깊이] (실내 구역은 x=300 줄) */
 const ROOMS=[['hall',4.6,9.4,-15.66,300,0,24.7,33.9,'중앙홀'],['vip',-.67,-2.37,-4.82,340,0,8.1,13.6,'귀빈실'],['vip2',-3.54,-2.84,-1.06,360,0,10.1,6.6,'귀빈예비실'],['office',-2.95,1.12,-5.11,380,0,9.9,5.6,'역장실'],['exhibit',4.6,4.91,-4.55,400,0,9.9,9.9,'전시실']];
 /* 땅: 광장 돌바닥과 둘레 길 */{const PT=tex(256,256,(q,w,h)=>{q.fillStyle='#9a958c';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=32)for(let x=-(y/32%2)*20;x<w;x+=40){const v=140+(r()*30|0);q.fillStyle=`rgb(${v},${v-3},${v-8})`;q.fillRect(x+2,y+2,36,28)}},[60,60]);const g=new THREE.Mesh(new THREE.PlaneGeometry(320,240),new THREE.MeshStandardMaterial({map:PT,roughness:.95}));g.rotation.x=-Math.PI/2;g.position.y=-.02;g.receiveShadow=true;G.add(g);
  const fl=new THREE.Mesh(new THREE.PlaneGeometry(160,60),M(0xb8a888));fl.rotation.x=-Math.PI/2;fl.position.set(350,-.01,0);G.add(fl)}
 if(!mini){const gl=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(dr);
  gl.load(new URL('../models/seoulstation/outside.glb',import.meta.url).href,g=>{const o=g.scene;o.position.set(-75.38,OY,-29.71);o.userData.noBatch=true;o.traverse(e=>{if(e.isMesh){e.castShadow=e.receiveShadow=true;if(e.material){e.material.roughness=.85;e.material.metalness=0;e.material.envMapIntensity=.55}cam.push(e)}});G.add(o)},undefined,()=>{});
  for(const[n,cx,cz,z0,px,pz]of ROOMS)gl.load(new URL('../models/seoulstation/'+n+'.glb',import.meta.url).href,g=>{const o=g.scene;o.position.set(px-cx,-z0,pz-cz);o.userData.noBatch=true;o.traverse(e=>{if(e.isMesh){e.receiveShadow=true;if(e.material){e.material.roughness=.8;e.material.metalness=0;e.material.envMapIntensity=.55;e.material.side=THREE.DoubleSide}cam.push(e)}});G.add(o)},undefined,()=>{});
  fetch(new URL('../models/seoulstation/floors.json',import.meta.url).href).then(r=>r.json()).then(F=>{for(const[x0,x1,z0,z1,h]of F.outside)S(x0-75.38,x1-75.38,OY-1,OY+h,z0-29.71,z1-29.71);for(const[n,cx,cz,z0,px,pz]of ROOMS){for(const[x0,x1,zz0,zz1,h]of(F[n]||[]))S(px+x0-cx,px+x1-cx,-1,Math.min(h,.3),pz+zz0-cz,pz+zz1-cz)}}).catch(()=>{})}
 /* 실내 방 벽(밖으로 나가지 않게) */for(const[n,cx,cz,z0,px,pz,w,d]of ROOMS){const hw=w/2,hd=d/2;S(px-hw-.5,px-hw,0,6,pz-hd,pz+hd);S(px+hw,px+hw+.5,0,6,pz-hd,pz+hd);S(px-hw,px+hw,0,6,pz-hd-.5,pz-hd);S(px-hw,px+hw,0,6,pz+hd,pz+hd+.5)}
 /* 정문 앞 '안으로', 방마다 '밖으로'·다음 방 */window.__SSGO=(i)=>{const H=window.__H3;if(i<0){try{H.tp(0,40,0);H.face(Math.PI);H.say('다시 서울역 광장이에요.',3)}catch(e){}return}const R=ROOMS[i];try{H.tp(R[4],R[5]+R[7]/2-2,0);H.face(Math.PI);H.cam(0,.15,3.2);H.say(R[8]+'이에요. 1925년 서울역 안을 실측한 그대로예요.',4)}catch(e){}};
 const SRC='(3D: 한국문화정보원 KCISA, Sketchfab kcisameta, CC BY 4.0)';
 spots.push({x:0,y:0,z:42,r:4,t:'옛 서울역 정문',h:'1925년에 지은 경성역, 옛 서울역이에요. 붉은 벽돌에 초록 돔을 얹었어요. 2004년 새 역사가 생긴 뒤 문화역서울284로 바뀌었어요. 안으로 들어가기를 누르면 실측한 중앙홀로 가요. '+SRC});
 spots.push({x:-60,y:0,z:40,r:3.4,t:'서울역 광장 서쪽',h:'역사 길이가 약 167m나 돼요. 실제 크기라 끝에서 끝까지 걸으면 꽤 멀어요. '+SRC});
 for(let i=0;i<ROOMS.length;i++){const R=ROOMS[i];spots.push({x:R[4],y:0,z:R[5]+R[7]/2-2.5,r:2.4,t:R[8],h:R[8]+'이에요. 옛 서울역 안을 실측한 그대로예요. 다음 방이나 밖으로 갈 수 있어요. '+SRC})}
 const tick=()=>{};
 /* 발굴 탐지(11/22 N21): 볼거리 둘레 맨땅(지붕·성벽 위·물속·단 위 빼고 3m 넘게 떨어진 곳)에 묻어 둠 */spots.push({x:-3,y:0,z:56,r:2.4,t:'발굴 탐지 자리',h:'이 마당 흙 속에 옛 물건이 묻혀 있대요. 무이 탐지기로 찾아 봐요.'});window.__SSDIG=()=>{const base=spots.filter(q=>q.t!=='발굴 탐지 자리'&&!(q.y>.5));const cand=[];base.forEach(q=>{for(const a of[0,2.1,4.2]){const r2=(q.r||2)+1.2;cand.push([q.x+Math.cos(a+q.x)*r2,q.z+Math.sin(a+q.z)*r2])}});try{const H=window.__H3;const DS0=spots.find(q=>q.t==='발굴 탐지 자리')||{x:0,z:0};const ok=cand.filter(([x,z])=>{if(Math.hypot(x-DS0.x,z-DS0.z)>90)return false;const f1=H.floorAt(x,z,2.2),f2=H.floorAt(x,z,40);return isFinite(f1)&&f1>-.15&&f1<.5&&Math.abs(f2-f1)<.3});const sp2=[];for(const c of ok)if(sp2.every(d=>Math.hypot(d[0]-c[0],d[1]-c[1])>3))sp2.push(c);if(sp2.length>=5)cand.splice(0,cand.length,...sp2)}catch(e){}window.__DETECT&&window.__DETECT({key:'seoulstation_dig',title:'옛 서울역 발굴 탐지',emoji:'⛏️',bg:'#20202a',count:4,TL:150,cand,items:[{n:'기차표 펀치 조각',h:'표에 구멍을 뚫던 쇠 펀치 조각이에요.',mk:()=>{const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.BoxGeometry(.04,.02,.18),M(0x4a4440,{metalness:.5})));return g}},{n:'붉은 벽돌',h:'역사 벽을 쌓은 붉은 벽돌 조각이에요.',mk:()=>{const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.BoxGeometry(.24,.07,.11),M(0x9a3a2a)));return g}},{n:'선로 못',h:'선로를 고정하던 큰 쇠못이에요.',mk:()=>{const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.CylinderGeometry(.015,.01,.24,6),M(0x4a4440,{metalness:.5})));return g}},{n:'유리 조각',h:'역사 창문의 유리 조각이에요.',mk:()=>{const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.BoxGeometry(.14,.01,.1),M(0xa8c8d0,{transparent:true,opacity:.6})));return g}},{n:'옛 동전',h:'근대에 쓰던 동전이에요.',mk:()=>{const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.012,18),M(0xa87a40,{metalness:.6})));return g}}],intro:'옛 서울역 둘레 흙 속에 근대의 흔적이 묻혀 있대요. 탐지기로 찾아 봐요!',okText:'옛 서울역(문화역서울 284)은 1925년 지은 역사예요. 지금은 전시 공간이 되었어요.'})};
 const meta={quest:{t:'옛 서울역 둘러보기',d:'1925년 경성역을 실측한 그대로 걸어 보세요. 바깥 광장과 안쪽 방 다섯.',steps:[['옛 서울역 정문','옛 서울역 정문'],['중앙홀','중앙홀'],['귀빈실','귀빈실'],['역장실','역장실'],['전시실','전시실']]},
  title:'서울 문화역서울284(옛 서울역)',hint:'1925년 지은 옛 서울역을 한국문화정보원 실측 3D로 실제 크기 그대로 세웠어요. 정문 앞에서 안으로 들어가 중앙홀과 귀빈실도 둘러보세요. '+SRC,
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,sign:{x:24,z:46,lines:['문화역서울284','옛 서울역(1925)','바깥 광장 · 안쪽 방 다섯','실측 3D · 실제 크기']}},
  npc:[['base',[[-30,44],[30,44],[30,52],[-30,52]]],['metal',[[296,10],[304,10],[304,-10],[296,-10]]]],
  bounds:[-150,420,-100,100],level:P=>P.x>250?'역 안':'서울역 광장',camCap:()=>Infinity,
  baseAt:()=>0,tick,
  mini:{S:1.1,ox:0,oz:20,draw(g,X,Z,S){g.fillStyle='#9a958c';g.fillRect(0,0,300,300);g.fillStyle='#a0442a';g.fillRect(X(-84),Z(-30),167*S,60*S);g.fillStyle='#3a7a5a';g.beginPath();g.arc(X(0),Z(-5),6*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:60,yaw:Math.PI},size:{}},meta)}
