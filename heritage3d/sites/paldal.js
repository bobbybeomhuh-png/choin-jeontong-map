/* 수원 화성 팔달문 마당(2026-11-20): 한국문화정보원(KCISA)이 실측한 3D(스케치팹 kcisameta, CC BY 4.0) 팔달문을 실제 크기로.
   화성의 남문(보물). 2층 문루와 둥근 옹성, 양옆 성벽 끝, 옹성 위 깃발까지 실측 그대로. 지금처럼 둘레를 찻길이 돌고 앞에 시장 골목이 있는 모습을 간추려 지음.
   높이 지도로 뽑은 바닥이라 성벽 오르는 길이 있는 곳은 걸어 올라갈 수 있음. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildPaldal(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1796);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 const RY=Math.PI/2;/* 실측의 문 통로(x 방향)를 들어오는 쪽(+z)으로 돌림: 성 안쪽이 +z, 옹성이 -z */
 /* 땅: 돌 광장, 둘레 찻길, 풀밭 */{const PT=tex(256,256,(q,w,h)=>{q.fillStyle='#9a958c';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=32)for(let x=-(y/32%2)*20;x<w;x+=40){const v=140+(r()*30|0);q.fillStyle=`rgb(${v},${v-3},${v-8})`;q.fillRect(x+2,y+2,36,28)}},[30,30]);const pl=new THREE.Mesh(new THREE.CircleGeometry(44,64),new THREE.MeshStandardMaterial({map:PT,roughness:.95}));pl.rotation.x=-Math.PI/2;pl.position.y=.01;pl.receiveShadow=true;G.add(pl);
  const rd=new THREE.Mesh(new THREE.RingGeometry(44,56,72),M(0x3c3d40,{roughness:.9}));rd.rotation.x=-Math.PI/2;rd.position.y=.02;rd.receiveShadow=true;G.add(rd);const ln=new THREE.Mesh(new THREE.RingGeometry(49.85,50.15,96),M(0xe8d070,{roughness:.6}));ln.rotation.x=-Math.PI/2;ln.position.y=.03;G.add(ln);
  const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#6f8f45';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){q.fillStyle=r()<.5?'rgba(80,110,40,.5)':'rgba(140,150,80,.35)';q.fillRect(r()*w,r()*h,2,2)}},[40,40]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(260,260),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 찻길 밖 시장 골목(간추린 가게 줄) */if(!mini){const cols=[0xb8432e,0x2f6b8a,0xd8a838,0x3f7a4a,0x8a5a9a,0xc86a3a];for(let i=0;i<40;i++){const a=i/40*Math.PI*2,d=62;if(Math.abs(Math.cos(a))<.42)continue;const x=Math.cos(a)*d,z=Math.sin(a)*d;const w=5+r()*2,h=3.2+r()*1.4;const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,5),M([0xcbb89a,0xb8a080,0xd6c6a8][i%3]));b.position.set(x,h/2,z);b.rotation.y=-a+Math.PI/2;b.castShadow=true;G.add(b);const rf=new THREE.Mesh(new THREE.BoxGeometry(w+1.2,.5,6.2),M(0x3a3c40,{roughness:.8}));rf.position.set(x,h+.25,z);rf.rotation.y=b.rotation.y;rf.castShadow=true;G.add(rf);const aw=new THREE.Mesh(new THREE.BoxGeometry(w+.2,.15,1.6),M(cols[i%cols.length],{roughness:.7}));aw.position.set(x-Math.cos(a)*3,2.6,z-Math.sin(a)*3);aw.rotation.y=b.rotation.y;aw.rotation.x=.25;G.add(aw);S(x-3.5,x+3.5,0,h,z-3.5,z+3.5)}}
 if(!mini){const gl=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(dr);
  gl.load(new URL('../models/paldal/paldal.glb',import.meta.url).href,g=>{const o=g.scene;o.rotation.y=RY;o.userData.noBatch=true;o.traverse(e=>{if(e.isMesh){e.castShadow=e.receiveShadow=true;if(e.material){e.material.roughness=.85;e.material.metalness=0;e.material.envMapIntensity=.6}cam.push(e)}});G.add(o)},undefined,()=>{});
  fetch(new URL('../models/paldal/floors.json',import.meta.url).href).then(r=>r.json()).then(F=>{const c=Math.cos(RY),sn=Math.sin(RY);for(const[x0,x1,z0,z1,h]of(F.paldal||[])){const a=[x0*c+z0*sn,-x0*sn+z0*c],b=[x1*c+z1*sn,-x1*sn+z1*c];S(a[0],b[0],-1,h,a[1],b[1])}}).catch(()=>{})}
 const SRC='(3D: 한국문화정보원 KCISA, Sketchfab kcisameta, CC BY 4.0)';
 spots.push({x:0,y:0,z:38,r:3.4,t:'팔달문',h:'수원 화성의 남문이에요(보물). 1796년 화성을 쌓을 때 지었어요. 2층 문루를 둥근 옹성이 감싸 적이 문을 바로 치지 못하게 했어요. 실측 그대로 실제 크기예요. '+SRC});
 spots.push({x:0,y:0,z:-38,r:3.4,t:'팔달문 옹성',h:'문 앞을 반달처럼 둘러싼 성벽, 옹성이에요. 옹성 위에 깃발이 꽂혀 있어요. '+SRC});
 spots.push({x:36,y:0,z:0,r:3,t:'팔달문 찻길',h:'지금 팔달문은 둘레를 찻길이 도는 섬처럼 서 있어요. 둘레에는 지동시장·남문시장 같은 시장 골목이 이어져요. '+SRC});
 const tick=()=>{};
 const meta={quest:{t:'팔달문 둘러보기',d:'수원 화성 남문을 실측 그대로 둘러보세요.',steps:[['팔달문','팔달문'],['옹성','팔달문 옹성'],['찻길','팔달문 찻길']]},
  title:'수원 화성 팔달문',hint:'한국문화정보원이 실측한 팔달문을 실제 크기로 세웠어요. 2층 문루와 옹성, 성벽 끝을 둘러보고 둘레 시장 골목도 걸어 보세요. '+SRC,
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,sign:{x:-8,z:42,lines:['수원 화성 팔달문','화성의 남문(보물)','문루 · 옹성 · 성벽','실측 3D · 실제 크기']}},
  npc:[['base',[[-8,40],[8,40],[8,46],[-8,46]]],['metal',[[30,-10],[36,-10],[36,10],[30,10]]]],
  bounds:[-100,100,-100,100],level:P=>P.y>2?'성벽 위':Math.hypot(P.x,P.z)>44?'시장 골목':'팔달문 광장',camCap:()=>Infinity,
  baseAt:()=>0,tick,
  mini:{S:1.4,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#6f8f45';g.fillRect(0,0,300,300);g.fillStyle='#3c3d40';g.beginPath();g.arc(X(0),Z(0),56*S,0,7);g.fill();g.fillStyle='#9a958c';g.beginPath();g.arc(X(0),Z(0),44*S,0,7);g.fill();g.fillStyle='#5a4a3a';g.fillRect(X(-29),Z(-20),58*S,40*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:44,yaw:Math.PI},size:{}},meta)}
