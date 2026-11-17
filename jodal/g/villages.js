/* 무이 나라 조달청: 「고을 다섯을 서로 다른 마을로」(퀄리티 P1). 만든 날 2026-11-17
   지도의 모든 도시에 똑같이 깔린 집·장독대·둘레 돌담을 일감 고을 다섯에서만 숨기고, 고을마다 성격이 다른 마을을 새로 세운다.
   경주 = 기와 반가(토담으로 두른 큰 집, 솟을대문, 안채·사랑채·행랑채)
   강진 = 가마 마을(언덕을 타고 오르는 오름가마와 연기, 장작더미, 옹기 늘어놓기, 지붕만 있는 공방)
   서울 = 육조거리(넓은 흙길 양쪽 긴 행랑 관청, 해치상 한 쌍, 길 끝 관청 문)
   통영 = 바닷가 어촌(초가 마을, 그물 말리는 틀, 엎어 둔 고깃배, 나전 공방)
   이천 = 도자 마을(작은 가마와 연기, 그릇 말리는 선반, 물레 공방, 장작)
   집 한 채 = 막돌 기단 + 회벽 + 앞 띠살문·뒤 창 + 기둥·인방 + 곡선 기와지붕(숭례문 지붕을 구워 씀) 또는 초가지붕.
   고을마다 재질별로 한 덩어리로 묶어 그린다(그리기 횟수 적게). 집·가마는 부딪힘(solids)도 넣는다.
   setupVillages(scene, JOBS) 한 번. 시간: window.__VILMS */
import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {hipRoof,materials} from './sites/sungnyemun.js';
import {volPines,plantBroad} from './sites/treekit.js';
const TOWN={crown:'gyeongju',maebyeong:'gangjin',angbu:'seoul',najeonham:'tongyeong',moonjar:'icheon'};
const FOCUS=[];export const HOUSES=[];let rs=7;const R=()=>(rs=(rs*16807)%2147483647)/2147483647;
const CV=(w,h,f,rep)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8;if(rep)t.repeat.set(rep[0],rep[1]);return t};
let MAT=null;function mats(){if(MAT)return MAT;
 const stone=CV(256,128,(q,w,h)=>{q.fillStyle='#cfc7b4';q.fillRect(0,0,w,h);for(let y=2;y<h;y+=16+R()*6)for(let x=-10+R()*10;x<w;x+=20+R()*14){const v=105+(R()*75|0),ww=17+R()*12,hh=12+R()*6;q.fillStyle=`rgb(${v+8},${v},${v-12})`;q.beginPath();q.ellipse(x+ww/2,y+hh/2,ww/2,hh/2,(R()-.5)*.4,0,7);q.fill();q.fillStyle='rgba(255,255,255,.14)';q.beginPath();q.ellipse(x+ww/2-2,y+hh/2-2,ww/3,hh/4,0,0,7);q.fill();if(R()<.25){q.fillStyle='rgba(80,110,50,.3)';q.fillRect(x+R()*ww,y+hh-4,7,3)}}});
 const plaster=CV(128,128,(q,w,h)=>{q.fillStyle='#efe8d8';q.fillRect(0,0,w,h);for(let i=0;i<400;i++){q.fillStyle=`rgba(${R()<.5?'120,100,70':'255,255,255'},.06)`;q.fillRect(R()*w,R()*h,3,3)}q.fillStyle='rgba(120,90,50,.25)';q.fillRect(0,h-10,w,10)});
 const door=CV(128,128,(q,w,h)=>{q.fillStyle='#4a3020';q.fillRect(0,0,w,h);for(const x0 of[6,66]){q.fillStyle='#e6d8b6';q.fillRect(x0,8,56,112);q.strokeStyle='#5a3a22';q.lineWidth=2.4;q.strokeRect(x0,8,56,112);for(let y=18;y<120;y+=10){q.beginPath();q.moveTo(x0,y);q.lineTo(x0+56,y);q.stroke()}for(const dx of[14,28,42]){q.beginPath();q.moveTo(x0+dx,8);q.lineTo(x0+dx,120);q.stroke()}}});
 const win=CV(128,128,(q,w,h)=>{q.fillStyle='#efe8d8';q.fillRect(0,0,w,h);q.fillStyle='#4a3020';q.fillRect(30,30,68,52);q.fillStyle='#e8dcc0';q.fillRect(34,34,60,44);q.strokeStyle='#5a3a22';q.lineWidth=2;for(let k=1;k<4;k++){q.beginPath();q.moveTo(34+k*15,34);q.lineTo(34+k*15,78);q.stroke()}for(let k=1;k<3;k++){q.beginPath();q.moveTo(34,34+k*14.7);q.lineTo(94,34+k*14.7);q.stroke()}});
 const thatch=CV(256,128,(q,w,h)=>{q.fillStyle='#c8a55a';q.fillRect(0,0,w,h);for(let i=0;i<1600;i++){const x=R()*w,y=R()*h,l=6+R()*14;q.strokeStyle=['#b08a40','#d8b868','#a07a38','#e0c27a'][i%4];q.lineWidth=1;q.beginPath();q.moveTo(x,y);q.lineTo(x+(R()-.5)*3,y+l);q.stroke()}q.strokeStyle='rgba(90,64,28,.55)';q.lineWidth=2;for(let x=0;x<w;x+=22){q.beginPath();q.moveTo(x,0);q.lineTo(x,h);q.stroke()}for(let y=0;y<h;y+=26){q.beginPath();q.moveTo(0,y);q.lineTo(w,y);q.stroke()}},[2,1]);
 const earth=CV(256,256,(q,w,h)=>{q.fillStyle='#b49a72';q.fillRect(0,0,w,h);for(let i=0;i<2600;i++){const v=R();q.fillStyle=v<.5?'rgba(120,96,64,.25)':'rgba(220,200,160,.25)';q.fillRect(R()*w,R()*h,2+R()*3,2+R()*3)}for(let k=0;k<6;k++){q.strokeStyle='rgba(110,86,56,.35)';q.lineWidth=3;q.beginPath();const y=R()*h;q.moveTo(0,y);q.bezierCurveTo(w*.3,y+(R()-.5)*30,w*.6,y+(R()-.5)*30,w,y+(R()-.5)*20);q.stroke()}},[3,3]);
 const brick=CV(128,128,(q,w,h)=>{q.fillStyle='#8a5a3a';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=12)for(let x=(y/12%2)*12;x<w;x+=24){const v=(R()*40|0);q.fillStyle=`rgb(${150+v},${92+v*.6|0},${62+v*.4|0})`;q.fillRect(x+1,y+1,22,10)}q.fillStyle='rgba(0,0,0,.18)';for(let i=0;i<30;i++)q.fillRect(R()*w,R()*h,8,4)},[3,1]);
 const net=CV(128,128,(q,w,h)=>{q.clearRect(0,0,w,h);q.strokeStyle='#3a3a2e';q.lineWidth=2;for(let i=-128;i<256;i+=12){q.beginPath();q.moveTo(i,0);q.lineTo(i+128,128);q.stroke();q.beginPath();q.moveTo(i+128,0);q.lineTo(i,128);q.stroke()}},[2,1]);
 const M=(o)=>new THREE.MeshStandardMaterial(Object.assign({roughness:.9},o));
 MAT={stone:M({map:stone}),plaster:M({map:plaster}),door:M({map:door}),win:M({map:win}),wood:M({color:0x5a3a24,roughness:.8}),red:M({color:0x8e2b20,roughness:.7}),green:M({color:0x2f6b55,roughness:.7}),thatch:M({map:thatch,roughness:1}),earth:M({map:earth,roughness:1}),brick:M({map:brick,roughness:.95}),
  onggi:M({color:0x5a3424,roughness:.35}),white:M({color:0xf2efe6,roughness:.3}),celadon:M({color:0x9cc4b0,roughness:.25}),log:M({color:0x8a6a44,roughness:1}),logEnd:M({color:0xc8a878,roughness:1}),net:M({map:net,transparent:true,alphaTest:.3,side:THREE.DoubleSide,roughness:1}),granite:M({color:0xb8b2a6,roughness:.9}),tileDk:M({color:0x3e434a,roughness:.65})};
 return MAT}
/* 숭례문 곡선 기와지붕을 한 번 구워 재질별 기하로(가로 반폭 1, 세로 반폭 1, 높이 1) */
let ROOF=null;function roofParts(){if(ROOF)return ROOF;const MT=materials();const g=hipRoof(MT,4.4,3.2,2.3,0,2.9,.55,.16,{plain:true,rs:.55});g.updateMatrixWorld(true);const S=new THREE.Matrix4().makeScale(1/4.4,1/2.9,1/3.2);const by=new Map();
 const put=(mat,geo)=>{let gg=geo.index?geo.toNonIndexed():geo;for(const k of Object.keys(gg.attributes))if(!['position','normal','uv'].includes(k))gg.deleteAttribute(k);if(!gg.attributes.uv)gg.setAttribute('uv',new THREE.Float32BufferAttribute(new Float32Array(gg.attributes.position.count*2),2));if(!gg.attributes.normal)gg.computeVertexNormals();if(!by.has(mat))by.set(mat,[]);by.get(mat).push(gg)};
 g.traverse(o=>{if(!o.isMesh)return;const m0=Array.isArray(o.material)?o.material[0]:o.material;if(o.isInstancedMesh){const M=new THREE.Matrix4();for(let i=0;i<o.count;i++){o.getMatrixAt(i,M);put(m0,o.geometry.clone().applyMatrix4(new THREE.Matrix4().multiplyMatrices(S,o.matrixWorld).multiply(M)))}}else put(m0,o.geometry.clone().applyMatrix4(new THREE.Matrix4().multiplyMatrices(S,o.matrixWorld)))});
 ROOF=[];for(const[m,parts]of by){const mg=mergeGeometries(parts);if(mg)ROOF.push([m,mg])}return ROOF}
/* 조각 모으기: 재질별로 기하를 모았다가 마지막에 한 덩어리씩 */
function Bag(){const B=new Map();const T=new THREE.Matrix4(),Q=new THREE.Quaternion(),E=new THREE.Euler(),V=new THREE.Vector3(),SC=new THREE.Vector3();
 const add=(geo,mat,x,y,z,ry=0,sx=1,sy=1,sz=1,rx=0,rz=0)=>{E.set(rx,ry,rz);Q.setFromEuler(E);T.compose(V.set(x,y,z),Q,SC.set(sx,sy,sz));let g=geo.index?geo.toNonIndexed():geo.clone();for(const k of Object.keys(g.attributes))if(!['position','normal','uv'].includes(k))g.deleteAttribute(k);if(!g.attributes.uv)g.setAttribute('uv',new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count*2),2));g.applyMatrix4(T);if(!B.has(mat))B.set(mat,[]);B.get(mat).push(g)};
 const addM=(geo,mat,m4)=>{let g=geo.index?geo.toNonIndexed():geo.clone();for(const k of Object.keys(g.attributes))if(!['position','normal','uv'].includes(k))g.deleteAttribute(k);if(!g.attributes.uv)g.setAttribute('uv',new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count*2),2));g.applyMatrix4(m4);if(!B.has(mat))B.set(mat,[]);B.get(mat).push(g)};
 const build=(parent)=>{for(const[m,parts]of B){const mg=mergeGeometries(parts);if(!mg)continue;const me=new THREE.Mesh(mg,m);me.castShadow=true;me.receiveShadow=true;parent.add(me)}};return{add,addM,build}}
const G={box:(w,h,d)=>new THREE.BoxGeometry(w,h,d),cyl:(r0,r1,h,n=8)=>new THREE.CylinderGeometry(r0,r1,h,n),plane:(w,h)=>new THREE.PlaneGeometry(w,h)};
/* 집 한 채(지역 좌표: 앞 = +z). o={w,d,h,roof:'tile'|'thatch',wing:true(ㄱ자)} */
function house(bag,M,x,y,z,ry,o){const w=o.w||3,d=o.d||2,h=o.h||1.3,bh=.32;const rot=(lx,lz)=>[x+lx*Math.cos(ry)+lz*Math.sin(ry),z-lx*Math.sin(ry)+lz*Math.cos(ry)];
 const P=(geo,mat,lx,ly,lz,ry2=0,sx=1,sy=1,sz=1)=>{const[px,pz]=rot(lx,lz);bag.add(geo,mat,px,y+ly,pz,ry+ry2,sx,sy,sz)};
 P(G.box(w+.6,bh,d+.6),M.stone,0,bh/2,0);P(G.box(w,h,d),M.plaster,0,bh+h/2,0);
 const nd=Math.max(1,Math.round(w/1.05)),dw=w/nd;for(let i=0;i<nd;i++){const lx=-w/2+dw*(i+.5);if(!(o.wing&&i===nd-1))P(G.plane(dw*.86,h*.86),M.door,lx,bh+h*.45,d/2+.012)}
 for(let i=0;i<Math.max(1,nd-1);i++)P(G.plane(.62,.62),M.win,-w/2+(w/Math.max(1,nd-1))*(i+.5),bh+h*.58,-d/2-.012,Math.PI);
 for(let i=0;i<=nd;i++)P(G.cyl(.075,.085,h+.04,8),M.wood,-w/2+dw*i,bh+h/2,d/2+.03);for(const sx of[-1,1])P(G.cyl(.075,.085,h+.04,8),M.wood,sx*w/2,bh+h/2,-d/2-.03);
 P(G.box(w+.12,.1,.1),M.wood,0,bh+h-.05,d/2+.04);
 if(o.roof==='thatch'){const s=new THREE.SphereGeometry(1,20,10,0,Math.PI*2,0,Math.PI/2);const pa=s.attributes.position;for(let i=0;i<pa.count;i++){const yy=pa.getY(i);pa.setY(i,yy*(1+.04*Math.sin(pa.getX(i)*9)))}s.computeVertexNormals();P(s,M.thatch,0,bh+h-.08,0,0,w/2*1.18,.72+w*.06,d/2*1.32);
  P(G.cyl(.05,.05,w*1.05,6).rotateZ(Math.PI/2),M.wood,0,bh+h+.66+w*.06,0)}
 else{const rf=roofParts();const m=new THREE.Matrix4();const[px,pz]=rot(0,0);m.compose(new THREE.Vector3(px,y+bh+h-.02,pz),new THREE.Quaternion().setFromEuler(new THREE.Euler(0,ry,0)),new THREE.Vector3(w/2*1.22,.62+w*.1,d/2*1.42));for(const[mt,geo]of rf)bag.addM(geo,mt,m)}
 if(o.wing){/* ㄱ자: 오른쪽 끝에서 앞으로 꺾인 날개 */const ww=d,wd=o.wd||2.4;const lx=w/2-ww/2,lz=d/2+wd/2;const[px,pz]=rot(lx,lz);house(bag,M,px,y,pz,ry-Math.PI/2,{w:wd,d:ww,h:h,roof:o.roof})}
 return Math.hypot(w,d)/2}
/* 토담(기와 얹은 막돌 담) 한 칸: 시작점→끝점 */
function wallSeg(bag,M,ax,az,bx,bz,y,h=1.15){const L=Math.hypot(bx-ax,bz-az),ry=Math.atan2(bx-ax,bz-az)-Math.PI/2,cx=(ax+bx)/2,cz=(az+bz)/2;bag.add(G.box(L,h,.38),M.stone,cx,y+h/2,cz,ry);bag.add(G.box(L+.1,.1,.62),M.tileDk,cx,y+h+.05,cz,ry);bag.add(G.cyl(.07,.07,L+.1,6).rotateZ(Math.PI/2),M.tileDk,cx,y+h+.16,cz,ry)}
/* 솟을대문: 가운데 높은 문간 + 양옆 낮은 행랑 */
function gate(bag,M,x,y,z,ry){FOCUS.push(['gate',x,y,z]);const rot=(lx,lz)=>[x+lx*Math.cos(ry)+lz*Math.sin(ry),z-lx*Math.sin(ry)+lz*Math.cos(ry)];
 for(const sx of[-1,1]){const[px,pz]=rot(sx*1.9,0);house(bag,M,px,y,pz,ry,{w:2.2,d:1.6,h:1.15,roof:'tile'})}
 const[gx,gz]=rot(0,0);bag.add(G.box(1.7,.3,1.8),M.stone,gx,y+.15,gz,ry);for(const sx of[-1,1])for(const sz of[-1,1]){const[px,pz]=rot(sx*.75,sz*.7);bag.add(G.cyl(.09,.1,2.0,8),M.wood,px,y+1.3,pz,ry)}
 {const[px,pz]=rot(0,0);bag.add(G.box(1.4,1.5,.08),M.wood,px,y+1.05,pz,ry)}
 const rf=roofParts();const m=new THREE.Matrix4();m.compose(new THREE.Vector3(gx,y+2.28,gz),new THREE.Quaternion().setFromEuler(new THREE.Euler(0,ry,0)),new THREE.Vector3(1.25,.75,1.2));for(const[mt,geo]of rf)bag.addM(geo,mt,m)}
/* 오름가마: 언덕을 타고 오르는 칸 n개 + 굴뚝. 돌려주는 값: 굴뚝 위치 */
function kiln(bag,M,x,y,z,ry,n=5,s=1){FOCUS.push(['kiln',x,y,z]);const out=[];for(let i=0;i<n;i++){const lz=-i*1.35*s,ly=i*.28*s;const c=new THREE.CylinderGeometry(.95*s,.95*s,1.3*s,16,1,false,0,Math.PI);c.rotateZ(Math.PI/2);c.rotateY(Math.PI/2);const px=x+lz*Math.sin(ry),pz=z+lz*Math.cos(ry);bag.add(c,M.brick,px,y+ly,pz,ry);
  const dr=G.box(.36*s,.5*s,.05);bag.add(dr,M.wood,px+Math.cos(ry)*.96*s,y+ly+.28*s,pz-Math.sin(ry)*.96*s,ry+Math.PI/2)}
 const lz=-n*1.35*s+.2,px=x+lz*Math.sin(ry),pz=z+lz*Math.cos(ry),py=y+n*.28*s;bag.add(G.cyl(.32*s,.42*s,1.8*s,10),M.brick,px,py+.6*s,pz,ry);out.push(new THREE.Vector3(px,py+1.6*s,pz));
 const fl=G.box(1.0*s,.5*s,.08);bag.add(fl,M.stone,x+Math.sin(ry)*.7*s,y+.15,z+Math.cos(ry)*.7*s,ry);return out}
function logPile(bag,M,x,y,z,ry,n=4){FOCUS.push(['logPile',x,y,z]);const lg=G.cyl(.11,.11,1.5,7).rotateX(Math.PI/2),en=new THREE.CircleGeometry(.11,7);for(let r=0;r<n;r++)for(let i=0;i<n-r;i++){const lx=(i-(n-r-1)/2)*.23,ly=.11+r*.2;const px=x+lx*Math.cos(ry),pz=z-lx*Math.sin(ry);bag.add(lg,M.log,px,y+ly,pz,ry);bag.add(en,M.logEnd,px+Math.sin(ry)*.751,y+ly,pz+Math.cos(ry)*.751,ry)}}
const JAR=new THREE.LatheGeometry([[0,0],[.16,0],[.24,.12],[.27,.3],[.22,.48],[.14,.55],[.15,.6],[0,.6]].map(([a,b])=>new THREE.Vector2(a,b)),14);
const BOWL=new THREE.LatheGeometry([[0,0],[.1,0],[.13,.03],[.19,.1],[.2,.12]].map(([a,b])=>new THREE.Vector2(a,b)),12);
const VASE=new THREE.LatheGeometry([[0,0],[.12,0],[.18,.12],[.2,.3],[.12,.45],[.07,.52],[.09,.56],[0,.56]].map(([a,b])=>new THREE.Vector2(a,b)),14);
function shed(bag,M,x,y,z,ry,w=3,d=2.2,thatchRoof=true){FOCUS.push(['shed',x,y,z]);const rot=(lx,lz)=>[x+lx*Math.cos(ry)+lz*Math.sin(ry),z-lx*Math.sin(ry)+lz*Math.cos(ry)];for(const sx of[-1,1])for(const sz of[-1,1]){const[px,pz]=rot(sx*w/2,sz*d/2);bag.add(G.cyl(.07,.08,1.7,8),M.wood,px,y+.85,pz,ry)}
 const[px,pz]=rot(0,0);if(thatchRoof){const s=new THREE.SphereGeometry(1,16,8,0,Math.PI*2,0,Math.PI/2);bag.add(s,M.thatch,px,y+1.62,pz,ry,w/2*1.25,.7,d/2*1.35)}else{const rf=roofParts();const m=new THREE.Matrix4();m.compose(new THREE.Vector3(px,y+1.68,pz),new THREE.Quaternion().setFromEuler(new THREE.Euler(0,ry,0)),new THREE.Vector3(w/2*1.25,.7,d/2*1.4));for(const[mt,geo]of rf)bag.addM(geo,mt,m)}
 bag.add(G.box(w*.9,.06,d*.8),M.wood,px,y+.06,pz,ry)}
function rack(bag,M,x,y,z,ry,bowlMat){FOCUS.push(['rack',x,y,z]);const rot=(lx,lz)=>[x+lx*Math.cos(ry)+lz*Math.sin(ry),z-lx*Math.sin(ry)+lz*Math.cos(ry)];for(const sx of[-1,1]){const[px,pz]=rot(sx*1.1,0);bag.add(G.box(.08,1.4,.5),M.wood,px,y+.7,pz,ry)}
 for(let t=0;t<3;t++){const[px,pz]=rot(0,0);bag.add(G.box(2.3,.05,.5),M.wood,px,y+.3+t*.45,pz,ry);for(let i=0;i<7;i++){const[bx,bz]=rot(-.95+i*.32,(t%2?.08:-.08));bag.add(BOWL,bowlMat,bx,y+.33+t*.45,bz,0,1,1,1)}}}
function netFrame(bag,M,x,y,z,ry){FOCUS.push(['netFrame',x,y,z]);const rot=(lx,lz)=>[x+lx*Math.cos(ry)+lz*Math.sin(ry),z-lx*Math.sin(ry)+lz*Math.cos(ry)];for(const sx of[-1,1]){const[px,pz]=rot(sx*1.5,0);bag.add(G.cyl(.05,.06,2.0,6),M.wood,px,y+1,pz,ry)}const[px,pz]=rot(0,0);bag.add(G.cyl(.03,.03,3.1,6).rotateZ(Math.PI/2),M.wood,px,y+1.95,pz,ry);bag.add(G.plane(3,1.6),M.net,px,y+1.15,pz,ry)}
function boat(bag,M,x,y,z,ry){FOCUS.push(['boat',x,y,z]);const hull=new THREE.CylinderGeometry(.55,.55,3,12,1,false,0,Math.PI);hull.rotateX(Math.PI/2);hull.scale(1,.55,1);bag.add(hull,M.wood,x,y+.32,z,ry)}
function haechi(bag,M,x,y,z,ry){FOCUS.push(['haechi',x,y,z]);/* 앉은 해치: 받침돌, 뒷다리 엉덩이, 곧게 선 앞다리 둘, 가슴, 갈기 두른 머리, 주둥이, 뿔 하나 */const rot=(lx,ly,lz)=>[x+lx*Math.cos(ry)+lz*Math.sin(ry),y+ly,z-lx*Math.sin(ry)+lz*Math.cos(ry)];const P=(g,lx,ly,lz,sx=1,sy=1,sz=1,rx=0)=>{const[px,py,pz]=rot(lx,ly,lz);bag.add(g,M.granite,px,py,pz,ry,sx,sy,sz,rx)};const SPH=new THREE.SphereGeometry(1,14,10);
 P(G.box(1.0,.32,1.3),0,.16,0);P(G.box(1.1,.08,1.4),0,.34,0);P(SPH,0,.62,-.25,.42,.32,.48);P(SPH,0,.95,.12,.32,.4,.3);for(const sx of[-1,1]){P(G.cyl(.09,.11,.62,8),sx*.17,.66,.32);P(SPH,sx*.17,.4,.38,.12,.07,.16);P(SPH,sx*.3,.55,-.3,.14,.22,.3)}
 P(SPH,0,1.38,.2,.3,.27,.28);P(new THREE.TorusGeometry(.26,.09,8,16),0,1.33,.13,1,1,1,Math.PI/2*.6);P(G.box(.24,.16,.24),0,1.3,.46);P(SPH,0,1.33,.58,.1,.07,.06);for(const sx of[-1,1]){P(new THREE.ConeGeometry(.07,.16,6),sx*.2,1.62,.12);P(SPH,sx*.12,1.44,.42,.05,.05,.04)}P(G.cyl(.02,.05,.24,6),0,1.7,.24);P(SPH,0,.62,-.72,.08,.08,.22)}
/* 연기: 부드러운 덩이 스프라이트가 굴뚝에서 피어오름 */
let PUFF=null;function smoke(parent,pos){if(!PUFF)PUFF=CV(64,64,(q,w,h)=>{const g=q.createRadialGradient(32,32,2,32,32,30);g.addColorStop(0,'rgba(235,235,230,.9)');g.addColorStop(1,'rgba(235,235,230,0)');q.fillStyle=g;q.fillRect(0,0,w,h)});const L=[];for(let i=0;i<9;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:PUFF,transparent:true,depthWrite:false,opacity:.5}));s.userData.t=i/9;parent.add(s);L.push(s)}
 const tick=()=>{const t=performance.now()/1000;for(const s of L){const k=(s.userData.t+t*.12)%1;s.position.set(pos.x+Math.sin(t*.7+s.userData.t*9)*.3+k*1.6,pos.y+k*5.5,pos.z+k*.8);const sc=.6+k*2.4;s.scale.set(sc,sc,1);s.material.opacity=.42*(1-k)*Math.min(1,k*6)}requestAnimationFrame(tick)};tick()}
export function setupVillages(scene,JOBS){const H=window.__H3;if(!H||!H.floorAt||!scene||scene.userData.vil)return null;scene.userData.vil=1;const t0=performance.now();const M=mats();
 /* 고을 가운데 = 일감 자리에서 가장 가까운 마당 돌판(반지름 6 원판) 가운데. 일감 자리는 마당에서 몇 m 비껴 있음 */const pads=[];scene.traverse(o=>{const p=o.isMesh&&o.geometry&&o.geometry.parameters;if(p&&p.radiusTop===6&&p.radiusBottom===6.4){const v=new THREE.Vector3();o.getWorldPosition(v);pads.push(v)}});
 const towns=JOBS.filter(j=>j.sp&&TOWN[j.k]).map(j=>{let c=null,bd=20;for(const v of pads){const d=Math.hypot(v.x-j.sp.x,v.z-j.sp.z);if(d<bd){bd=d;c=v}}return{k:j.k,kind:TOWN[j.k],x:c?c.x:j.sp.x,z:c?c.z:j.sp.z,y:j.sp.y||0,off:c?+bd.toFixed(2):-1}});
 /* 1 원래 깔린 집·장독대·둘레 돌담을 이 고을들에서 숨김(부딪힘도 지움) */const Z0=new THREE.Matrix4().makeScale(0,0,0),Mx=new THREE.Matrix4(),P=new THREE.Vector3();const gone=[];
 scene.traverse(o=>{if(!o.isInstancedMesh||!o.userData.vill)return;let ch=false;for(let i=0;i<o.count;i++){o.getMatrixAt(i,Mx);P.setFromMatrixPosition(Mx);const lim=o.userData.vill==='tree'?22:17.5;if(towns.some(t=>Math.hypot(P.x-t.x,P.z-t.z)<lim)){if(o.userData.vill==='house'||o.userData.vill==='jar'||o.userData.vill==='tree')gone.push([P.x,P.z]);o.setMatrixAt(i,Z0);ch=true}}if(ch)o.instanceMatrix.needsUpdate=true});
 const SOL=H.SITEB&&H.SITEB.solids;if(SOL){for(let i=SOL.length-1;i>=0;i--){const s=SOL[i];if(s.r!=null&&gone.some(([x,z])=>Math.abs(s.cx-x)<.05&&Math.abs(s.cz-z)<.05))SOL.splice(i,1)}}
 const addSolid=(x,z,r,y,h=4)=>{if(SOL)SOL.push({cx:x,cz:z,r,y0:y-1,y1:y+h})};
 const root=new THREE.Group();root.name='jodal-villages';scene.add(root);const PINES=[],BROAD=[],CHIM=[];
 for(const T of towns){const bag=Bag();/* 바닥 높이: 마당 가운데엔 유산 모형이 있어 꼭대기가 잡히므로, 일감 자리의 땅 높이를 씀 */const base=T.y;T.miss=[];const NUD=[[0,0],[2,0],[-2,0],[0,-2],[0,2],[3,-3],[-3,-3],[3,3],[-3,3],[5,0],[-5,0],[0,-5],[0,5],[6,-4],[-6,-4]];
  const at=(lx,lz,nudge=true)=>{for(const[dx,dz]of(nudge?NUD:[[0,0]])){const r=at0(lx+dx,lz+dz,dx||dz);if(r)return r}T.miss.push(lx+' '+lz);return null};
  const at0=(lx,lz,quiet)=>{const x=T.x+lx,z=T.z+lz;const y=H.floorAt(x,z,base+3);const rv=window.__RIVER&&window.__RIVER(x,z);if(!isFinite(y)||Math.abs(y-base)>.9||rv)return null;/* 이미 세운 집과 겹치면 다른 자리 */if(USED.some(([ux,uz,ur])=>Math.hypot(ux-x,uz-z)<ur))return null;return[x,y-.02,z]};const USED=[];
  const face=(lx,lz)=>Math.atan2(-lx,-lz);/* 집 앞이 고을 가운데를 보게 */
  const H1=(lx,lz,o,ry)=>{const p=at(lx,lz);if(!p)return;const r=house(bag,M,p[0],p[1],p[2],ry==null?face(p[0]-T.x,p[2]-T.z):ry,o);addSolid(p[0],p[2],Math.max(1,r*.85),p[1]);USED.push([p[0],p[2],r+1.2]);HOUSES.push([p[0],p[1],p[2],ry==null?face(p[0]-T.x,p[2]-T.z):ry,o.w||3,o.d||2])};
  const tree=(lx,lz,pine,s=1)=>{const p=at(lx,lz);if(!p)return;if(pine)PINES.push([p[0],p[1],p[2],s]);else BROAD.push([p[0],p[1],p[2],R()*6,.5*s,[0xe8603c,0xf08c3a,0xf6c04a,0x9cc05a,0xd8503a][(R()*5)|0]])};
  if(T.kind==='gyeongju'){/* 토담 두른 반가: 남쪽 가운데 솟을대문 */const cx=0,cz=-16,hw=7,hd=4.6;const p0=at(cx,cz,false);const yy=p0?p0[1]:base;
   const C=[[cx-hw,cz-hd],[cx+hw,cz-hd],[cx+hw,cz+hd],[cx-hw,cz+hd]];for(let i=0;i<4;i++){const[a,b]=[C[i],C[(i+1)%4]];if(i===2){wallSeg(bag,M,T.x+a[0],T.z+a[1],T.x+1.1,T.z+b[1],yy);wallSeg(bag,M,T.x-1.1,T.z+a[1],T.x+b[0],T.z+b[1],yy)}else wallSeg(bag,M,T.x+a[0],T.z+a[1],T.x+b[0],T.z+b[1],yy)}
   gate(bag,M,T.x,yy,T.z+cz+hd,0);bag.add(G.plane(hw*2-.6,hd*2-.6).rotateX(-Math.PI/2),M.earth,T.x+cx,yy+.03,T.z+cz);
   H1(cx-2.6,cz-1.6,{w:4.2,d:2.2,h:1.45,roof:'tile',wing:true,wd:2.4},0);H1(cx+3.8,cz-.6,{w:3,d:2,h:1.35,roof:'tile'},-Math.PI/2);H1(cx-5.2,cz+2.2,{w:2.4,d:1.7,h:1.2,roof:'tile'},Math.PI/2);
   for(const[lx,lz]of[[-11,-6],[11,-7]])H1(lx,lz,{w:3,d:2,h:1.3,roof:'tile'});H1(-12.5,1.5,{w:2.8,d:1.9,h:1.25,roof:'thatch'});H1(12.5,1,{w:2.8,d:1.9,h:1.25,roof:'tile'});
   for(const[lx,lz]of[[-9,-15],[9,-16],[-10,-21],[8,-22],[0,-23],[-14,-11],[14,-12]])tree(lx,lz,true,1.1+R()*.4);for(const[lx,lz]of[[-15,-3],[15,-2],[-6,-22]])tree(lx,lz,false)}
  if(T.kind==='gangjin'){/* 가마 마을 */const p=at(-12,-9);if(p){CHIM.push(...kiln(bag,M,p[0],p[1],p[2],Math.PI*.8,5,1));addSolid(p[0]-2.5,p[2]+3,2.2,p[1],3)}
   {const q=at(-7.5,-13);if(q)logPile(bag,M,q[0],q[1],q[2],.4,5)}{const q=at(-4,-15.5);if(q)logPile(bag,M,q[0],q[1],q[2],-.2,4)}
   {const q=at(6,-10);if(q){bag.add(G.box(3.4,.18,1.6),M.stone,q[0],q[1]+.09,q[2],.3);for(let i=0;i<10;i++){const lx=-1.4+(i%5)*.7,lz=(i<5?-.4:.4);bag.add(JAR,M.onggi,q[0]+lx*Math.cos(.3)+lz*Math.sin(.3),q[1]+.18,q[2]-lx*Math.sin(.3)+lz*Math.cos(.3),R()*6,.9+R()*.4,.9+R()*.4,.9+R()*.4)}}}
   {const q=at(10,-4);if(q){shed(bag,M,q[0],q[1],q[2],face(10,-4),3.2,2.4,true);for(let i=0;i<5;i++)bag.add(VASE,M.celadon,q[0]-.9+i*.45,q[1]+.12,q[2]+(R()-.5)*.6,0,1.2,1.2,1.2);addSolid(q[0],q[2],1.6,q[1])}}
   H1(0,-15,{w:2.8,d:1.9,h:1.2,roof:'thatch'});H1(5.5,-15.5,{w:2.6,d:1.8,h:1.2,roof:'thatch'});H1(12,-10,{w:3.2,d:2,h:1.3,roof:'tile'});H1(-13,1,{w:2.6,d:1.8,h:1.2,roof:'thatch'});
   for(const[lx,lz]of[[-17,-14],[-15,-18],[2,-21],[9,-20],[16,-14]])tree(lx,lz,true,1+R()*.3);for(const[lx,lz]of[[15,-1],[-6,-20]])tree(lx,lz,false)}
  if(T.kind==='seoul'){/* 육조거리: 북쪽으로 넓은 흙길, 양쪽 긴 관청 행랑, 해치 한 쌍, 길 끝 관청 문 */const p0=at(0,-18,false);const yy=p0?p0[1]:base;bag.add(G.plane(5,22).rotateX(-Math.PI/2),M.earth,T.x,yy+.04,T.z-19);
   for(const sx of[-1,1]){for(const lz of[-13,-23]){const q=at(sx*6,lz);if(q){house(bag,M,q[0],q[1],q[2],sx<0?Math.PI/2:-Math.PI/2,{w:8.5,d:2.2,h:1.4,roof:'tile'});if(SOL)SOL.push({x0:q[0]-1.3,x1:q[0]+1.3,z0:q[2]-4.4,z1:q[2]+4.4,y0:q[1]-1,y1:q[1]+4})}}
    const h=at(sx*2.6,-8.6);if(h){haechi(bag,M,h[0],h[1],h[2],Math.PI);addSolid(h[0],h[2],.6,h[1],2)}}
   {const g=at(0,-30.5);if(g)gate(bag,M,g[0],g[1],g[2],0)}for(const[lx,lz]of[[-11,-8],[11,-9],[-11,-30],[11,-30]])tree(lx,lz,true,1.1);for(const[lx,lz]of[[-13,-18],[13,-18]])tree(lx,lz,false)}
  if(T.kind==='tongyeong'){/* 어촌 */H1(-10,-8,{w:2.6,d:1.8,h:1.15,roof:'thatch'});H1(-6,-14,{w:2.8,d:1.9,h:1.2,roof:'thatch'});H1(8.5,-12.5,{w:2.6,d:1.8,h:1.15,roof:'thatch'});H1(13,-5.5,{w:2.4,d:1.7,h:1.1,roof:'thatch'});
   H1(1.5,-15.5,{w:3.6,d:2.2,h:1.4,roof:'tile'});/* 나전 공방 간판 */{const q=at(1.5,-15.5);if(q){const sg=CV(256,96,(c,w,h)=>{c.fillStyle='#1f1a16';c.fillRect(0,0,w,h);c.strokeStyle='#c8b070';c.lineWidth=5;c.strokeRect(5,5,w-10,h-10);c.fillStyle='#f0e6c8';c.font='bold 52px "Do Hyeon",sans-serif';c.textAlign='center';c.fillText('나전 공방',w/2,66)});const sm=new THREE.Mesh(G.plane(1.6,.6),new THREE.MeshStandardMaterial({map:sg,roughness:.6}));const ry=face(1.5,-15.5);sm.position.set(q[0]+Math.sin(ry)*1.2,q[1]+1.95,q[2]+Math.cos(ry)*1.2);sm.rotation.y=ry;root.add(sm)}}
   for(const[lx,lz,ry]of[[-14,-1,.4],[-13.5,3.5,.2],[14.5,-12,-.6]]){const q=at(lx,lz);if(q)netFrame(bag,M,q[0],q[1],q[2],ry)}
   for(const[lx,lz,ry]of[[15,2,.3],[12.5,5,-.2]]){const q=at(lx,lz);if(q){boat(bag,M,q[0],q[1],q[2],ry);addSolid(q[0],q[2],1.2,q[1],1.2)}}
   {const q=at(-3,-10);if(q){bag.add(G.box(2.2,.16,1.2),M.stone,q[0],q[1]+.08,q[2],0);for(let i=0;i<6;i++)bag.add(JAR,M.onggi,q[0]-.8+(i%3)*.8,q[1]+.16,q[2]+(i<3?-.3:.3),R()*6,.8+R()*.3,.8+R()*.3,.8+R()*.3)}}
   for(const[lx,lz]of[[-16,-12],[5,-21],[-9,-20],[16,-17]])tree(lx,lz,true,1+R()*.3);for(const[lx,lz]of[[11,-17]])tree(lx,lz,false)}
  if(T.kind==='icheon'){/* 도자 마을 */const p=at(12.5,-9);if(p){CHIM.push(...kiln(bag,M,p[0],p[1],p[2],-Math.PI*.75,3,.85));addSolid(p[0]+1.4,p[2]+1.4,1.8,p[1],3)}
   for(const[lx,lz,ry]of[[-9,-10,.5],[-5.5,-13.5,.2],[-1.8,-15,0]]){const q=at(lx,lz);if(q)rack(bag,M,q[0],q[1],q[2],ry,M.white)}
   {const q=at(-12,-3);if(q){shed(bag,M,q[0],q[1],q[2],face(-12,-3),3,2.2,false);bag.add(G.cyl(.35,.4,.5,14),M.wood,q[0],q[1]+.25,q[2]);bag.add(G.cyl(.32,.32,.06,16),M.earth,q[0],q[1]+.53,q[2]);bag.add(VASE,M.white,q[0],q[1]+.56,q[2],0,.9,.9,.9);addSolid(q[0],q[2],1.6,q[1])}}
   {const q=at(8,-14.5);if(q)logPile(bag,M,q[0],q[1],q[2],.8,5)}
   H1(4,-16,{w:3,d:2,h:1.3,roof:'tile'});H1(-9,-17,{w:3,d:2,h:1.3,roof:'tile',wing:true,wd:2.2});H1(13,-1,{w:2.6,d:1.8,h:1.15,roof:'thatch'});
   for(const[lx,lz]of[[-15,-12],[0,-21],[15,-17],[-14,-20]])tree(lx,lz,true,1+R()*.3);for(const[lx,lz]of[[-16,1],[7,-21]])tree(lx,lz,false)}
  const g=new THREE.Group();g.name='vil-'+T.k;bag.build(g);root.add(g)}
 if(PINES.length){const im=volPines(PINES.length),o=new THREE.Object3D(),c=new THREE.Color();PINES.forEach(([x,y,z,s],i)=>{o.position.set(x,y,z);o.rotation.set(0,R()*6,0);o.scale.set(2.2*s,1.9*s,2.2*s);o.updateMatrix();im.setMatrixAt(i,o.matrix);im.setColorAt(i,c.setHSL(.25,.3,.85));addSolid(x,z,.6*s,y)});im.count=PINES.length;im.castShadow=true;root.add(im)}
 if(BROAD.length){plantBroad(root,BROAD);for(const b of BROAD)addSolid(b[0],b[2],.7,b[1])}
 for(const c of CHIM)smoke(root,c);
 window.__VILMS=Math.round(performance.now()-t0);window.__VIL={towns:towns.map(t=>[t.k,+t.x.toFixed(1),+t.z.toFixed(1),t.off]),miss:Object.fromEntries(towns.map(t=>[t.k,t.miss])),focus:FOCUS.map(f=>[f[0],+f[1].toFixed(1),+f[2].toFixed(2),+f[3].toFixed(1)]),root};return root}
