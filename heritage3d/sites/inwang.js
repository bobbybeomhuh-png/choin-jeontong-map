/* 경주 인왕동 절터 마당(2026-11-20): 국가유산청이 실측한 3D(스케치팹 KHS_Asset, CC BY 4.0)로 세운 신라 절터.
   금당(발굴 자료로 되살린 모습), 앞쪽 동·서 삼층석탑, 뒤쪽 강당터, 서쪽 연못, 우물을 실제 크기로 놓고, 절터에서 나온 금동불을 진열장에 함께 둠.
   절터 바닥은 높이 지도로 뽑아 기단 위로 올라설 수 있음. 배치는 발굴 배치를 본떠 간추림(실제 거리와 조금 다름). */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildInwang(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(684);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* [이름, x, z, 돌림, 크기배율] */
 const B=[['geumdang',0,0,0,1],['tap_e',14,22,0,1],['tap_w',-14,22,0,1],['gangdang',0,-30,0,1],['pond',-34,8,Math.PI/2,1],['well',26,-12,0,1]];
 /* 땅: 잔디 절터와 자갈 길 */{const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#7a9450';q.fillRect(0,0,w,h);for(let i=0;i<3200;i++){q.fillStyle=r()<.5?'rgba(90,120,50,.5)':'rgba(150,160,90,.35)';q.fillRect(r()*w,r()*h,2,2)}},[40,40]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(240,240),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr);
  const KT=tex(256,256,(q,w,h)=>{q.fillStyle='#b8ad98';q.fillRect(0,0,w,h);for(let i=0;i<2400;i++){const v=140+(r()*70|0);q.fillStyle=`rgb(${v},${v-6},${v-16})`;q.fillRect(r()*w,r()*h,3,3)}},[3,24]);const pth=new THREE.Mesh(new THREE.PlaneGeometry(4,44),new THREE.MeshStandardMaterial({map:KT,roughness:1}));pth.rotation.x=-Math.PI/2;pth.position.set(0,.03,34);G.add(pth)}
 /* 둘레 소나무 */if(!mini){const tr=M(0x5a4430),pn=M(0x3a5a30);for(const[x,z]of[[-50,40],[-52,-10],[50,34],[52,-24],[-30,-52],[30,-52],[-24,58],[26,58]]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.4,.6,5,8),tr);t.position.set(x,2.5,z);G.add(t);const c=new THREE.Mesh(new THREE.ConeGeometry(3,5,9),pn);c.position.set(x,6.5,z);G.add(c);solids.push({cx:x,cz:z,r:.7,y0:0,y1:8})}}
 /* 유물 진열장: 절터에서 나온 금동불(실측). 작아서 크게 키워 보여 줌 */const CASE={x:22,z:30};if(!mini){const wd=M(0x5a3a22,{roughness:.7});const base=new THREE.Mesh(new THREE.BoxGeometry(1.6,1,1.6),wd);base.position.set(CASE.x,.5,CASE.z);base.castShadow=true;G.add(base);const gl2=new THREE.Mesh(new THREE.BoxGeometry(1.5,1.3,1.5),new THREE.MeshStandardMaterial({color:0xdfefff,transparent:true,opacity:.18,roughness:.05,metalness:.1,depthWrite:false}));gl2.position.set(CASE.x,1.65,CASE.z);G.add(gl2);const lid=new THREE.Mesh(new THREE.BoxGeometry(1.6,.1,1.6),wd);lid.position.set(CASE.x,2.35,CASE.z);G.add(lid);S(CASE.x-.8,CASE.x+.8,0,2.4,CASE.z-.8,CASE.z+.8);const lt=new THREE.PointLight(0xfff0d0,6,4);lt.position.set(CASE.x,2.2,CASE.z+.4);G.add(lt)}
 if(!mini){const gl=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(dr);
  for(const[n,x,z,ry]of B)gl.load(new URL('../models/inwang/'+n+'.glb',import.meta.url).href,g=>{const o=g.scene;o.position.set(x,0,z);o.rotation.y=ry;o.userData.noBatch=true;o.traverse(e=>{if(e.isMesh){e.castShadow=e.receiveShadow=true;if(e.material){e.material.roughness=.9;e.material.metalness=0;e.material.envMapIntensity=.6}cam.push(e)}});G.add(o)},undefined,()=>{});
  gl.load(new URL('../models/inwang/buddha.glb',import.meta.url).href,g=>{const o=g.scene;const bx=new THREE.Box3().setFromObject(o);const h=bx.max.y-bx.min.y||1;const k=.9/h;o.scale.setScalar(k);o.position.set(CASE.x,1.05-bx.min.y*k,CASE.z);o.userData.noBatch=true;o.traverse(e=>{if(e.isMesh&&e.material){e.material.metalness=.55;e.material.roughness=.4;e.material.envMapIntensity=1}});G.add(o);G.userData.buddha=o},undefined,()=>{});
  fetch(new URL('../models/inwang/floors.json',import.meta.url).href).then(r=>r.json()).then(F=>{for(const[n,ox,oz,ry]of B){const L=F[n];if(!L)continue;const c=Math.cos(ry),s=Math.sin(ry);for(const[x0,x1,z0,z1,h]of L){const a=[ox+x0*c+z0*s,oz-x0*s+z0*c],b=[ox+x1*c+z1*s,oz-x1*s+z1*c];S(a[0],b[0],-1,h,a[1],b[1])}}}).catch(()=>{})}
 const SRC='(3D: 국가유산청 KHS_Asset, Sketchfab, CC BY 4.0)';
 spots.push({x:0,y:0,z:16,r:3.4,t:'인왕동 절터 금당',h:'신라 절의 으뜸 법당(금당)이에요. 지금 절터에는 주춧돌과 기단만 남았지만, 국가유산청이 발굴 자료로 옛 모습을 3D로 되살렸어요. 기단 위로 올라가 보세요. '+SRC});
 spots.push({x:14,y:0,z:27,r:2.6,t:'동 삼층석탑',h:'금당 앞 동쪽에 선 신라 삼층석탑이에요. 서탑과 짝을 이루는 쌍탑이에요. '+SRC});
 spots.push({x:-14,y:0,z:27,r:2.6,t:'서 삼층석탑',h:'금당 앞 서쪽 탑이에요. 통일신라 절은 금당 앞에 탑 두 개를 나란히 세웠어요. '+SRC});
 spots.push({x:0,y:0,z:-20,r:3,t:'강당터',h:'스님들이 모여 경전을 배우던 강당 자리예요. 금당 뒤에 있어요. '+SRC});
 spots.push({x:-34,y:0,z:17,r:3,t:'서쪽 연못',h:'절 서쪽에 있던 연못 자리예요. 물을 끌어들이고 내보내던 돌 물길도 남아 있어요. '+SRC});
 spots.push({x:26,y:0,z:-6,r:2.6,t:'절터 우물',h:'스님들이 물을 긷던 우물이에요. 우물 안에서 여러 유물이 나왔대요. '+SRC});
 spots.push({x:CASE.x,y:0,z:CASE.z+2.2,r:2.4,t:'금동불 진열장',h:'인왕동 절터에서 나온 금동 여래 입상이에요. 실제로는 손바닥만큼 작아서 진열장 안에 크게 키워 보여 줘요. '+SRC});
 const tick=(P,dt)=>{const b=G.userData.buddha;if(b)b.rotation.y+=dt*.4};
 const meta={quest:{t:'인왕동 절터 둘러보기',d:'신라 절터의 일곱 곳을 찾아보세요. 실측 3D라 실제 크기예요.',steps:[['금당','인왕동 절터 금당'],['동탑','동 삼층석탑'],['서탑','서 삼층석탑'],['강당터','강당터'],['연못','서쪽 연못'],['우물','절터 우물'],['금동불','금동불 진열장']]},
  title:'경주 인왕동 절터',hint:'국가유산청이 실측한 신라 절터를 실제 크기로 놓았어요. 금당터 기단에 올라 보고, 쌍탑과 강당터, 연못, 우물, 진열장의 금동불까지 둘러보세요. '+SRC,
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,sign:{x:-8,z:44,lines:['경주 인왕동 절터','신라 절의 금당·쌍탑·강당','국가유산청 3D','실제 크기']}},
  npc:[['base',[[-6,40],[6,40],[6,50],[-6,50]]],['science',[[18,26],[26,26],[26,34],[18,34]]]],
  bounds:[-90,90,-80,90],level:P=>P.y>.6?'기단 위':P.z>12?'탑 앞마당':'절터',camCap:()=>Infinity,
  baseAt:()=>0,tick,
  mini:{S:2,ox:-4,oz:0,draw(g,X,Z,S){g.fillStyle='#7a9450';g.fillRect(0,0,300,300);g.fillStyle='#b8ad98';g.fillRect(X(-2),Z(12),4*S,44*S);g.fillStyle='#8a8070';for(const[n,x,z]of B){const w=n==='geumdang'?26:n==='gangdang'?24:n==='pond'?8:4,h=n==='geumdang'?22:n==='gangdang'?16:n==='pond'?16:4;g.fillRect(X(x-w/2),Z(z-h/2),w*S,h*S)}g.fillStyle='#e0b048';g.fillRect(X(CASE.x-1),Z(CASE.z-1),2*S,2*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:56,yaw:Math.PI},size:{}},meta)}
