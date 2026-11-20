/* 창원의 집 마당(2026-11-20): 한국문화정보원(KCISA)이 실측한 3D(스케치팹 kcisameta, CC BY 4.0) 일곱 채를 실제 크기로 세운 창원 전통 한옥.
   대문 → 사랑채 → 중문 → 안채 → 효경문(사당 문), 옆 정원에 퇴은정, 마당에 연자방아. 조선 후기 순흥 안씨 집안이 살던 집을 창원시가 전통 문화 공간으로 꾸민 곳.
   건물마다 높이 지도로 뽑은 바닥이라 기단과 마루에 올라설 수 있음. 배치는 실제 배치를 본떠 간추림(실제 거리와 조금 다름). */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildChangwon(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1985);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 const R90=Math.PI/2;/* [이름, x, z, 돌림] : 앞면이 남쪽(+z)을 보게 90도 돌림 */
 const B=[['daemun',0,36,R90],['sarang',0,18,R90],['jungmun',0,3,R90],['anchae',0,-12,R90],['hyogyeong',0,-30,R90],['toeeun',27,8,R90],['yeonja',-20,22,0]];
 const X0=-34,X1=42,Z0=-38,Z1=36;
 /* 땅: 다진 흙 마당(담 안), 풀밭(담 밖), 돌길 */{const ET=tex(256,256,(q,w,h)=>{q.fillStyle='#bfae90';q.fillRect(0,0,w,h);for(let i=0;i<2600;i++){q.fillStyle=r()<.5?'rgba(120,100,80,.35)':'rgba(225,210,185,.35)';q.fillRect(r()*w,r()*h,2,2)}},[20,20]);const yd=new THREE.Mesh(new THREE.PlaneGeometry(X1-X0,Z1-Z0),new THREE.MeshStandardMaterial({map:ET,roughness:1}));yd.rotation.x=-Math.PI/2;yd.position.set((X0+X1)/2,.02,(Z0+Z1)/2);yd.receiveShadow=true;G.add(yd);
  const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#6f8f45';q.fillRect(0,0,w,h);for(let i=0;i<3200;i++){q.fillStyle=r()<.5?'rgba(80,110,40,.5)':'rgba(140,150,80,.35)';q.fillRect(r()*w,r()*h,2,2)}},[40,40]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(240,240),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr);
  const PT=tex(256,256,(q,w,h)=>{q.fillStyle='#8a8478';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=40)for(let x=-(y/40%2)*30;x<w;x+=60){const v=120+(r()*35|0);q.fillStyle=`rgb(${v},${v-4},${v-10})`;q.fillRect(x+3,y+3,54,34)}},[2,10]);const pth=new THREE.Mesh(new THREE.PlaneGeometry(3,30),new THREE.MeshStandardMaterial({map:PT,roughness:.95}));pth.rotation.x=-Math.PI/2;pth.position.set(0,.04,52);G.add(pth);const p2=new THREE.Mesh(new THREE.PlaneGeometry(2.4,10),new THREE.MeshStandardMaterial({map:PT,roughness:.95}));p2.rotation.x=-Math.PI/2;p2.position.set(8.5,.04,38);G.add(p2)}
 /* 흙돌담(기와 얹은 토담) 둘레, 대문 자리만 틔움 */{const BT=tex(256,128,(q,w,h)=>{q.fillStyle='#b49a78';q.fillRect(0,0,w,h);for(let i=0;i<70;i++){const v=120+(r()*50|0);q.fillStyle=`rgb(${v},${v-10},${v-25})`;q.beginPath();q.ellipse(r()*w,r()*h,8+r()*12,6+r()*8,r()*3,0,7);q.fill()}},[1,1]);BT.wrapS=BT.wrapT=THREE.RepeatWrapping;const roof=M(0x3a3c40,{roughness:.8});
  const wall=(x0,z0,x1,z1)=>{const L=Math.hypot(x1-x0,z1-z0);const t=BT.clone();t.needsUpdate=true;t.repeat.set(L/3,1);const m=new THREE.Mesh(new THREE.BoxGeometry(L,1.8,.6),new THREE.MeshStandardMaterial({map:t,roughness:1}));m.position.set((x0+x1)/2,.9,(z0+z1)/2);m.rotation.y=-Math.atan2(z1-z0,x1-x0);m.castShadow=m.receiveShadow=true;G.add(m);const c=new THREE.Mesh(new THREE.BoxGeometry(L+.2,.18,1.1),roof);c.position.set((x0+x1)/2,1.9,(z0+z1)/2);c.rotation.y=m.rotation.y;c.castShadow=true;G.add(c);S(x0-.35,x1+.35,0,2,z0-.35,z1+.35)};
  wall(X0,Z0,X1,Z0);wall(X0,Z0,X0,Z1);wall(X1,Z0,X1,Z1);wall(X0,Z1,-5.6,Z1);/* 대문은 실측 그대로 닫혀 있어 오른쪽에 쪽문 길 */wall(5.6,Z1,7,Z1);wall(10,Z1,X1,Z1);/* 안채 마당과 사랑 마당을 나누는 내담 */wall(X0,4,-7,4);wall(7,4,18,4)}
 /* 장독대와 소나무·감나무 */if(!mini){const ja=M(0x4a2e1e,{roughness:.45});for(let i=0;i<9;i++){const j=new THREE.Mesh(new THREE.SphereGeometry(.45+(i%3)*.12,12,10),ja);j.scale.y=1.15;j.position.set(-24+(i%3)*1.2,.55,-14+Math.floor(i/3)*1.2);j.castShadow=true;G.add(j)}S(-25,-21,0,1,-15,-11);
  const tr=M(0x5a4430),pn=M(0x3a5a30),gam=M(0x4a6a30),or=M(0xe07020);for(const[x,z]of[[-50,40],[-46,0],[54,30],[50,-20],[-20,60],[24,58],[-48,-34]]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.4,.6,5,8),tr);t.position.set(x,2.5,z);G.add(t);const c=new THREE.Mesh(new THREE.ConeGeometry(3,5,9),pn);c.position.set(x,6.5,z);G.add(c);solids.push({cx:x,cz:z,r:.7,y0:0,y1:8})}
  for(const[x,z]of[[-26,-28],[16,-26],[34,-6]]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.18,.25,2.2,7),tr);t.position.set(x,1.1,z);G.add(t);const c=new THREE.Mesh(new THREE.SphereGeometry(1.6,10,8),gam);c.position.set(x,2.9,z);c.scale.y=.8;G.add(c);for(let k=0;k<10;k++){const o=new THREE.Mesh(new THREE.SphereGeometry(.11,7,5),or);const a=r()*6.28,b=r()*1.1;o.position.set(x+Math.cos(a)*1.5*Math.cos(b-.5),2.9+Math.sin(b-.5)*1.2,z+Math.sin(a)*1.5*Math.cos(b-.5));G.add(o)}solids.push({cx:x,cz:z,r:.3,y0:0,y1:3})}}
 if(!mini){const gl=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(dr);
  for(const[n,x,z,ry]of B)gl.load(new URL('../models/changwon/'+n+'.glb',import.meta.url).href,g=>{const o=g.scene;o.position.set(x,0,z);o.rotation.y=ry;o.userData.noBatch=true;o.traverse(e=>{if(e.isMesh){e.castShadow=e.receiveShadow=true;if(e.material){e.material.roughness=.85;e.material.metalness=0;e.material.envMapIntensity=.6}cam.push(e)}});G.add(o)},undefined,()=>{});
  fetch(new URL('../models/changwon/floors.json',import.meta.url).href).then(r=>r.json()).then(F=>{for(const[n,ox,oz,ry]of B){const L=F[n];if(!L)continue;const c=Math.cos(ry),s=Math.sin(ry);for(const[x0,x1,z0,z1,h]of L){const a=[ox+x0*c+z0*s,oz-x0*s+z0*c],b=[ox+x1*c+z1*s,oz-x1*s+z1*c];S(a[0],b[0],-1,h,a[1],b[1])}}}).catch(()=>{})}
 const SRC='(3D: 한국문화정보원 KCISA, Sketchfab kcisameta, CC BY 4.0)';
 spots.push({x:0,y:0,z:44,r:3,t:'창원의 집 대문',h:'창원의 집으로 들어가는 솟을대문이에요. 대문이 닫혀 있으니 오른쪽 쪽문으로 들어가요. 조선 후기 순흥 안씨 집안이 살던 한옥을 창원시가 전통 문화 공간으로 꾸몄어요. '+SRC});
 spots.push({x:0,y:0,z:28.5,r:3,t:'사랑채',h:'집안 어른이 손님을 맞고 책을 읽던 바깥채예요. 넓은 대청마루에 올라가 볼 수 있어요. '+SRC});
 spots.push({x:-20,y:0,z:31,r:3,t:'연자방아',h:'소나 말이 큰 돌바퀴를 굴려 곡식을 찧던 방아예요. 마을 사람들이 같이 썼대요. '+SRC});
 spots.push({x:0,y:0,z:8.8,r:2.6,t:'중문',h:'사랑 마당과 안마당 사이의 중문채예요. 지금은 향토역사관 현판이 걸려 있어요. '+SRC});
 spots.push({x:0,y:0,z:-3.5,r:3,t:'안채',h:'안주인과 식구들이 살던 안쪽 살림채예요. 옆에 장독대가 있어요. '+SRC});
 spots.push({x:0,y:0,z:-23,r:2.6,t:'효경문',h:'조상을 모신 사당으로 들어가는 문이에요. 효도와 공경을 뜻하는 이름이에요. '+SRC});
 spots.push({x:27,y:0,z:21,r:3,t:'퇴은정',h:'벼슬에서 물러나 숨어 산다는 뜻의 정자예요. 집 옆 정원에서 쉬며 글을 짓던 곳이에요. '+SRC});
 const tick=()=>{};
 const meta={quest:{t:'창원의 집 둘러보기',d:'창원의 전통 한옥 일곱 곳을 찾아보세요. 실측 3D라 실제 크기예요.',steps:[['대문','창원의 집 대문'],['사랑채','사랑채'],['연자방아','연자방아'],['중문','중문'],['안채','안채'],['효경문','효경문'],['퇴은정','퇴은정']]},
  title:'창원의 집',hint:'한국문화정보원이 실측한 창원의 집 일곱 채를 실제 크기로 세웠어요. 대문에서 사랑채, 중문 지나 안채와 퇴은정까지 걸어 보세요. '+SRC,
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,sign:{x:-10,z:48,lines:['창원의 집','창원 전통 한옥','사랑채 · 안채 · 퇴은정','실측 3D · 실제 크기']}},
  npc:[['base',[[-12,40],[12,40],[12,52],[-12,52]]],['ceramic',[[-8,-2],[8,-2],[8,-6],[-8,-6]]]],
  bounds:[-90,90,-80,90],level:P=>P.y>1.0?'마루 위':P.z>Z1?'대문 앞':P.z>4?'사랑 마당':'안마당',camCap:()=>Infinity,
  baseAt:()=>0,tick,
  mini:{S:1.9,ox:4,oz:2,draw(g,X,Z,S){g.fillStyle='#6f8f45';g.fillRect(0,0,300,300);g.fillStyle='#bfae90';g.fillRect(X(X0),Z(Z0),(X1-X0)*S,(Z1-Z0)*S);g.strokeStyle='#8a7050';g.lineWidth=2;g.strokeRect(X(X0),Z(Z0),(X1-X0)*S,(Z1-Z0)*S);g.fillStyle='#5a4a3a';for(const[,x,z]of B)g.fillRect(X(x-5),Z(z-3),10*S,6*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:60,yaw:Math.PI},size:{}},meta)}
