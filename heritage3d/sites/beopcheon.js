/* 원주 법천사지 마당(2026-11-21): 스케치팹 lacomi1975가 사진 측량한 법천사지 중심 권역(CC BY 4.0, 사적)을 측량 좌표 그대로 실제 크기로.
   고려 때 크게 번성한 절터. 가운데 돌 단(탑비전 터)과 지광국사탑비(국보), 둘레 산자락 숲까지. 땅은 높이 지도(나무 밑 땅), 탑비·나무 등 솟은 것만 벽.
   놀이: 법천사지 발굴 탐지. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
export function buildBeopcheon(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 let HG=null;const hAt=(x,z)=>{if(!HG)return 5;const fx=(x-HG.x0)/HG.step,fz=(HG.z0-z)/HG.step;const i=Math.max(0,Math.min(HG.nx-2,Math.floor(fx))),j=Math.max(0,Math.min(HG.nz-2,Math.floor(fz)));const u=Math.max(0,Math.min(1,fx-i)),v=Math.max(0,Math.min(1,fz-j));const H=HG.h;return (H[j][i]*(1-u)+H[j][i+1]*u)*(1-v)+(H[j+1][i]*(1-u)+H[j+1][i+1]*u)*v};
 if(!mini){fetch(new URL('../models/beopcheon/height.json',import.meta.url).href).then(r=>r.json()).then(j=>{HG=j}).catch(()=>{});
  fetch(new URL('../models/beopcheon/obst.json',import.meta.url).href).then(r=>r.json()).then(j=>{for(const[x0,x1,z0,z1,h]of j.obst||[])solids.push({x0,x1,y0:-40,y1:h,z0,z1})}).catch(()=>{});
  const gl=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(dr);
  gl.load(new URL('../models/beopcheon/beopcheon.glb',import.meta.url).href,g=>{const o=g.scene;o.userData.noBatch=true;o.traverse(e=>{if(e.isMesh){e.castShadow=false;e.receiveShadow=true;if(e.material){e.material.roughness=.95;e.material.metalness=0;e.material.envMapIntensity=.55;e.material.transparent=false;e.material.alphaTest=0;e.material.alphaHash=false}cam.push(e)}});G.add(o)},undefined,()=>{})}
 {const gr=new THREE.Mesh(new THREE.PlaneGeometry(600,600),new THREE.MeshBasicMaterial({color:0x5a6a44}));gr.rotation.x=-Math.PI/2;gr.position.y=-3;G.add(gr)}
 const SRC='(3D: lacomi1975, Sketchfab, CC BY 4.0)';
 spots.push({x:-10,y:0,z:14,r:4,t:'법천사지',h:'원주 법천사지는 신라 때 세워져 고려 때 크게 번성한 절터예요(사적). 임진왜란 때 불탄 뒤 터만 남았어요. 측량 좌표 그대로 실제 크기예요. '+SRC});
 spots.push({x:-10,y:0,z:4,r:4,t:'탑비전 터',h:'고려 국사 지광국사 해린의 탑과 탑비가 서 있던 돌 단이에요. 탑비(국보)는 이 자리에 그대로 있고, 탑은 일본으로 반출됐다가 돌아와 오랫동안 고쳐 지었어요. '+SRC});
 spots.push({x:-38,y:0,z:34,r:4,t:'절터 마당',h:'건물 주춧돌과 축대가 남은 넓은 터예요. 발굴로 고려 기와와 청자가 많이 나왔어요. '+SRC});
 const DTM=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.7},o));
 const ITEMS=[{n:'法泉寺 글자 기와',h:'절 이름 법천사(法泉寺)가 새겨진 기와예요. 이 터가 법천사임을 알려 줬어요.',mk:()=>{const g=new THREE.Group();const c=document.createElement('canvas');c.width=c.height=128;const q=c.getContext('2d');q.fillStyle='#6a6660';q.fillRect(0,0,128,128);q.fillStyle='#3a3834';q.font='bold 34px serif';q.fillText('法泉',22,60);q.fillText('寺',44,100);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const p=new THREE.Mesh(new THREE.BoxGeometry(.6,.6,.08),[DTM(0x5a5650),DTM(0x5a5650),DTM(0x5a5650),DTM(0x5a5650),DTM(0xffffff,{map:t}),DTM(0x5a5650)]);p.position.y=.45;g.add(p);return g}},
  {n:'고려 청자 조각',h:'고려 귀족과 스님들이 쓰던 비색 청자 조각이에요.',mk:()=>{const g=new THREE.Group();const s=new THREE.Mesh(new THREE.SphereGeometry(.36,14,10,0,Math.PI*.9,Math.PI*.3,Math.PI*.5),DTM(0x8ac0b0,{roughness:.2,side:THREE.DoubleSide}));s.position.y=.3;g.add(s);return g}},
  {n:'연꽃무늬 수막새',h:'고려 절 지붕 처마 끝 기와예요.',mk:()=>{const g=new THREE.Group();const d=new THREE.Mesh(new THREE.CylinderGeometry(.38,.38,.1,24),DTM(0x6a6660));d.rotation.x=Math.PI/2;d.position.y=.45;g.add(d);return g}},
  {n:'금동 풍탁',h:'처마 끝에서 바람에 울리던 작은 종이에요.',mk:()=>{const g=new THREE.Group();const m=DTM(0xc8a040,{metalness:.7,roughness:.35});const b=new THREE.Mesh(new THREE.CylinderGeometry(.16,.3,.5,12,1,true),m);b.material.side=THREE.DoubleSide;b.position.y=.6;g.add(b);g.userData.lift=.35;return g}},
  {n:'치미 조각',h:'용마루 양 끝을 꾸미던 큰 기와(치미)의 깃털 무늬 조각이에요.',mk:()=>{const g=new THREE.Group();const b=new THREE.Mesh(new THREE.BoxGeometry(.7,.5,.2),DTM(0x7a7468));b.position.y=.4;b.rotation.z=.3;g.add(b);return g}}];
 window.__BCDIG=()=>{window.__DETECT&&window.__DETECT({key:'beopcheon_dig',title:'법천사지 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[-54,-6],[-42,6],[-46,14],[6,10],[-30,18],[2,22],[-42,34],[-14,34],[10,30],[-54,38]],items:ITEMS,intro:'고려 큰 절 법천사 터예요. 땅속 유물을 탐지기로 찾아 봐요!',okText:'법천사지는 지금도 발굴하며 고려 유물이 나오고 있어요.'})};
 spots.push({x:-24,y:0,z:28,r:2.4,t:'발굴 탐지 자리',h:'법천사지 땅속에 고려 유물이 묻혀 있어요. 무이 탐지기로 찾아 봐요.'});
 const meta={quest:{t:'법천사지 둘러보기',d:'고려 큰 절 터를 실측 그대로 둘러보세요.',steps:[['법천사지','법천사지'],['탑비전','탑비전 터'],['마당','절터 마당']]},
  title:'원주 법천사지',hint:'사진 측량한 법천사지 중심 권역을 측량 좌표 그대로 실제 크기로 놓았어요. 가운데 돌 단의 지광국사탑비를 찾아보고 발굴 탐지도 해 봐요. '+SRC,
  ibl:true,env:{fog:[120,520],noHills:true,plaza:null,beds:false,trees:false,treeAvoid:()=>true,sign:{x:-28,z:22,y:4.85,lines:['원주 법천사지','사적 · 고려 큰 절 터','지광국사탑비(국보)','실측 3D · 실제 크기']}},
  npc:[['science',[[-30,30],[-20,30],[-20,38],[-30,38]]]],bounds:[-56,18,-18,56],level:()=>'법천사지',camCap:()=>Infinity,
  baseAt:(x,z)=>hAt(x,z),tick:()=>{},
  mini:{S:2,ox:-18,oz:20,draw(g,X,Z,S){g.fillStyle='#5a6a44';g.fillRect(0,0,300,300);g.fillStyle='#a08a6a';g.fillRect(X(-28),Z(-2),40*S,16*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-20,z:30,yaw:Math.PI},size:{}},meta)}
