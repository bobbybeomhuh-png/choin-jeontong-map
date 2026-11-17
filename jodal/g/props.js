/* 무이 나라 조달청: 「집 둘레 살림살이」(퀄리티 P2). 만든 날 2026-11-17
   지도의 모든 고을 집(원래 깔린 집 + villages.js 가 세운 일감 고을 집) 곁에 살림살이를 두세 가지씩 놓는다.
   종류: 우물(돌 우물·두레박 틀·작은 지붕), 빨랫줄(기둥 둘·줄·널린 천 셋, 바람에 흔들림), 장작더미, 평상, 짚단, 채마밭(이랑·배추), 장독 셋.
   집마다 조합을 돌려 써서 같은 배치가 되풀이되지 않게. 종류별 부품은 인스턴스로 한 번에 그린다(그리기 횟수 적게).
   자리: 집 옆(좌우 1.9~2.7m) 또는 뒤(1.9m), 땅 높이가 집과 비슷하고 강이 아니며 다른 집·마당과 떨어진 곳만.
   setupProps(scene, extraHouses=[[x,y,z,ry,w,d],...]) 한 번. window.__PROPN = 놓은 수 */
import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {WIND} from './sites/treekit.js';
let rs=29;const R=()=>(rs=(rs*16807)%2147483647)/2147483647;
const CV=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;return t};
const tr=(g,x,y,z,rx=0,ry=0,rz=0,sx=1,sy=1,sz=1)=>{g=g.index?g.toNonIndexed():g;for(const k of Object.keys(g.attributes))if(!['position','normal','uv'].includes(k))g.deleteAttribute(k);if(!g.attributes.uv)g.setAttribute('uv',new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count*2),2));const m=new THREE.Matrix4().compose(new THREE.Vector3(x,y,z),new THREE.Quaternion().setFromEuler(new THREE.Euler(rx,ry,rz)),new THREE.Vector3(sx,sy,sz));return g.applyMatrix4(m)};
const MG=(arr)=>mergeGeometries(arr);
function kit(){const stoneT=CV(128,64,(q,w,h)=>{q.fillStyle='#bdb5a2';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=12)for(let x=(y/12%2)*9;x<w;x+=18){const v=120+(R()*60|0);q.fillStyle=`rgb(${v+6},${v},${v-10})`;q.beginPath();q.ellipse(x+8,y+6,8,5,0,0,7);q.fill()}});stoneT.repeat.set(3,1);
 const strawT=CV(64,64,(q,w,h)=>{q.fillStyle='#c9a85c';q.fillRect(0,0,w,h);for(let i=0;i<300;i++){q.strokeStyle=['#b08a40','#dcbc72','#a07a38'][i%3];q.beginPath();const x=R()*w;q.moveTo(x,0);q.lineTo(x+(R()-.5)*4,h);q.stroke()}});
 const earthT=CV(128,128,(q,w,h)=>{q.fillStyle='#8a6a48';q.fillRect(0,0,w,h);for(let y=8;y<h;y+=21){q.fillStyle='#6e5236';q.fillRect(0,y,w,8)}for(let i=0;i<500;i++){q.fillStyle='rgba(170,140,100,.3)';q.fillRect(R()*w,R()*h,2,2)}});
 const M=o=>new THREE.MeshStandardMaterial(Object.assign({roughness:.9},o));
 const mats={stone:M({map:stoneT}),wood:M({color:0x6a4a2e,roughness:.85}),woodLt:M({color:0x9a7448,roughness:.85}),water:M({color:0x1e3a44,roughness:.15,metalness:.2}),tile:M({color:0x3e434a,roughness:.65}),log:M({color:0x8a6a44,roughness:1}),logEnd:M({color:0xc8a878,roughness:1}),straw:M({map:strawT,roughness:1}),earth:M({map:earthT,roughness:1}),leaf:M({color:0x5f9a3a,roughness:.8}),onggi:M({color:0x5a3424,roughness:.35}),rope:M({color:0x8a7a5a,roughness:1}),
  cloth:new THREE.MeshStandardMaterial({color:0xffffff,roughness:.95,side:THREE.DoubleSide})};
 /* 빨래 천이 바람에 흔들리게(아래쪽일수록 많이) */mats.cloth.onBeforeCompile=sh=>{sh.uniforms.uWind=WIND.t;sh.vertexShader='uniform float uWind;\n'+sh.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n{vec4 ip=instanceMatrix*vec4(0.,0.,0.,1.);float d=clamp(-position.y/.7,0.,1.);transformed.z+=sin(uWind*2.6+ip.x*.7+ip.z*.5+position.x*3.)*.12*d;}')};mats.cloth.customProgramCacheKey=()=>'jodal-cloth';
 /* 부품(지역 좌표, 바닥 y=0) */const P={};
 P.well={stone:MG([tr(new THREE.CylinderGeometry(.5,.55,.55,14,1,true),0,.275,0),tr(new THREE.TorusGeometry(.5,.07,6,16),0,.56,0,Math.PI/2)]),water:MG([tr(new THREE.CircleGeometry(.46,14),0,.38,0,-Math.PI/2)]),
  wood:MG([tr(new THREE.BoxGeometry(.08,1.5,.08),-.6,.75,0),tr(new THREE.BoxGeometry(.08,1.5,.08),.6,.75,0),tr(new THREE.CylinderGeometry(.04,.04,1.3,6),0,1.25,0,0,0,Math.PI/2),tr(new THREE.CylinderGeometry(.1,.12,.18,8),.2,.9,0)]),tile:MG([tr(new THREE.BoxGeometry(1.5,.05,.55),0,1.62,.2,.55),tr(new THREE.BoxGeometry(1.5,.05,.55),0,1.62,-.2,-.55)])};
 P.line={wood:MG([tr(new THREE.CylinderGeometry(.04,.05,1.7,6),-1.4,.85,0),tr(new THREE.CylinderGeometry(.04,.05,1.7,6),1.4,.85,0)]),rope:MG([tr(new THREE.CylinderGeometry(.012,.012,2.8,4),0,1.62,0,0,0,Math.PI/2)])};
 P.cloth=tr(new THREE.PlaneGeometry(.55,.7,3,4),0,-.35,0);
 {const lg=[],en=[];for(let r=0;r<3;r++)for(let i=0;i<4-r;i++){const x=(i-(3-r)/2)*.2;lg.push(tr(new THREE.CylinderGeometry(.09,.09,1.1,7),x,.1+r*.17,0,Math.PI/2));en.push(tr(new THREE.CircleGeometry(.09,7),x,.1+r*.17,.551))}P.pile={log:MG(lg),logEnd:MG(en)}}
 P.bench={woodLt:MG([tr(new THREE.BoxGeometry(1.5,.08,1.0),0,.42,0)].concat([[-.65,-.42],[.65,-.42],[-.65,.42],[.65,.42]].map(([x,z])=>tr(new THREE.BoxGeometry(.08,.4,.08),x,.2,z))))};
 P.straw={straw:MG([0,1,2].map(i=>tr(new THREE.CylinderGeometry(.16,.22,.9,8),(i-1)*.36,.45,(i%2)*.12,0,0,(i-1)*.12)))};
 {const lf=[];for(let r=0;r<3;r++)for(let c=0;c<4;c++)lf.push(tr(new THREE.SphereGeometry(.14,8,6),-.6+c*.4,.1,-.42+r*.42,0,0,0,1,.7,1));P.garden={earth:MG([tr(new THREE.BoxGeometry(1.8,.1,1.3),0,.05,0)]),leaf:MG(lf)}}
 {const J=new THREE.LatheGeometry([[0,0],[.13,0],[.2,.1],[.22,.25],[.18,.4],[.11,.45],[.12,.5],[0,.5]].map(([a,b])=>new THREE.Vector2(a,b)),12);P.jars={stone:MG([tr(new THREE.BoxGeometry(1.2,.1,.7),0,.05,0)]),onggi:MG([tr(J.clone(),-.35,.1,0),tr(J.clone(),.05,.1,.05,0,0,0,.8,.8,.8),tr(J.clone(),.38,.1,-.05,0,0,0,1.15,1.15,1.15)])}}
 return{mats,P}}
export function setupProps(scene,extra=[]){const H=window.__H3;if(!H||!H.floorAt||!scene||scene.userData.props)return null;scene.userData.props=1;const t0=performance.now();
 /* 집 목록: 원래 깔린 집(숨긴 것 빼고) + 일감 고을 집 */const houses=[];const Mx=new THREE.Matrix4(),P=new THREE.Vector3(),Q=new THREE.Quaternion(),S=new THREE.Vector3(),E=new THREE.Euler();
 scene.traverse(o=>{if(!o.isInstancedMesh||o.userData.vill!=='house')return;for(let i=0;i<o.count;i++){o.getMatrixAt(i,Mx);Mx.decompose(P,Q,S);if(S.x<.01)continue;E.setFromQuaternion(Q);houses.push([P.x,P.y,P.z,E.y,S.x,S.z])}});
 for(const h of extra)houses.push(h);
 const pads=[];scene.traverse(o=>{const p=o.isMesh&&o.geometry&&o.geometry.parameters;if(p&&p.radiusTop===6&&p.radiusBottom===6.4){const v=new THREE.Vector3();o.getWorldPosition(v);pads.push(v)}});
 const {mats,P:K}=kit();const KINDS=['well','line','pile','bench','straw','garden','jars'];const COMBO=[['line','pile'],['jars','garden'],['well','straw'],['bench','line','jars'],['pile','garden'],['straw','bench'],['well','jars','pile'],['garden','line']];
 const place={};for(const k of KINDS)place[k]=[];const cloths=[];const used=houses.map(h=>[h[0],h[2],Math.max(h[4],h[5])*.75+.6]);const SOL=H.SITEB&&H.SITEB.solids;let n=0;
 houses.forEach((h,hi)=>{const[x,y,z,ry,w,d]=h;const combo=COMBO[(((hi*5+((x*13+z*7)|0))%COMBO.length)+COMBO.length)%COMBO.length];const slots=[[w/2+1.5,0],[-(w/2+1.5),0],[0,-(d/2+1.4)],[w/2+1.2,-(d/2+1.2)]];let si=(hi*3)%slots.length;
  for(const kind of combo){let ok=null;for(let t=0;t<slots.length;t++){const[sx,sz]=slots[(si+t)%slots.length];const px=x+sx*Math.cos(ry)+sz*Math.sin(ry),pz=z-sx*Math.sin(ry)+sz*Math.cos(ry);
    if(pads.some(v=>Math.hypot(v.x-px,v.z-pz)<8.2))continue;if(used.some(([ux,uz,ur])=>Math.hypot(ux-px,uz-pz)<ur))continue;if(window.__RIVER&&window.__RIVER(px,pz))continue;const fy=H.floorAt(px,pz,y+2.5);if(!isFinite(fy)||Math.abs(fy-y)>.6)continue;ok=[px,fy,pz,(si+t)%slots.length];break}
   if(!ok)continue;si=(ok[3]+1)%slots.length;const pr=kind==='line'||kind==='garden'?1.3:.9;used.push([ok[0],ok[2],pr]);const rot=ry+(kind==='line'?(R()-.5)*.4:R()*6.28*(kind==='well'?0:1)*.1);place[kind].push([ok[0],ok[1],ok[2],rot]);n++;
   if(kind==='line'){const C=[0xf4f0e6,0x3a5a8a,0xe8dcc0,0xf0e8d0,0x8a3a3a];for(let c=0;c<3;c++)cloths.push([ok[0],ok[1],ok[2],rot,-.85+c*.85,C[(hi+c)%C.length]])}
   if(SOL&&(kind==='well'||kind==='bench'))SOL.push({cx:ok[0],cz:ok[2],r:kind==='well'?.7:.8,y0:ok[1]-1,y1:ok[1]+1.6})}});
 const root=new THREE.Group();root.name='jodal-props';scene.add(root);const o=new THREE.Object3D();
 for(const kind of KINDS){const L=place[kind];if(!L.length)continue;for(const[mk,geo]of Object.entries(K[kind])){const im=new THREE.InstancedMesh(geo,mats[mk],L.length);L.forEach(([x,y,z,r],i)=>{o.position.set(x,y,z);o.rotation.set(0,r,0);o.scale.set(1,1,1);o.updateMatrix();im.setMatrixAt(i,o.matrix)});im.castShadow=true;im.receiveShadow=true;im.frustumCulled=false;root.add(im)}}
 if(cloths.length){const im=new THREE.InstancedMesh(K.cloth,mats.cloth,cloths.length),c=new THREE.Color();cloths.forEach(([x,y,z,r,off,col],i)=>{o.position.set(x+off*Math.cos(r),y+1.6,z-off*Math.sin(r));o.rotation.set(0,r,0);o.updateMatrix();im.setMatrixAt(i,o.matrix);im.setColorAt(i,c.setHex(col))});im.castShadow=true;im.frustumCulled=false;root.add(im)}
 /* 11/17 P3: 길이 강을 건너는 곳에 나무다리(널 바닥·난간·다리 기둥). 길 띠의 마디를 따라가며 강 위 구간을 찾음 */try{let road=null;scene.traverse(q=>{if(q.isMesh&&q.material&&q.material.map&&Math.abs((q.material.alphaTest||0)-.08)<1e-4&&q.material.depthWrite===false)road=q});
  if(road&&window.__RIVER){const pa=road.geometry.attributes.position;const C=[];for(let i=0;i+1<pa.count;i+=2)C.push([(pa.getX(i)+pa.getX(i+1))/2,(pa.getY(i)+pa.getY(i+1))/2,(pa.getZ(i)+pa.getZ(i+1))/2]);
   const runs=[];let cur=null;for(let i=0;i<C.length;i++){const c=C[i],gap=i&&Math.hypot(c[0]-C[i-1][0],c[2]-C[i-1][2])>3.5;const wet=window.__RIVER(c[0],c[2]);if(gap&&cur){runs.push(cur);cur=null}if(wet){if(!cur)cur={a:Math.max(0,i-1),b:i,gapA:gap};else cur.b=i}else if(cur){cur.b=i;runs.push(cur);cur=null}}if(cur)runs.push(cur);
   const plank=[],rail=[],post=[];const BX=new THREE.BoxGeometry(1,1,1);const add=(arr,x,y,z,ry,sx,sy,sz,rx=0)=>arr.push(tr(BX.clone(),x,y,z,rx,ry,0,sx,sy,sz));let nb=0;
   for(const r of runs){const A=C[r.a],B=C[r.b];const L=Math.hypot(B[0]-A[0],B[2]-A[2])+1.6;if(L<2.5||L>30)continue;const ry=Math.atan2(B[0]-A[0],B[2]-A[2]);const mx=(A[0]+B[0])/2,mz=(A[2]+B[2])/2,y0=Math.max(A[1],B[1])+.06;const ux=Math.sin(ry),uz=Math.cos(ry),vx=Math.cos(ry),vz=-Math.sin(ry);
    const N=Math.ceil(L/.32);for(let k=0;k<N;k++){const t=(k+.5)/N-.5,arch=Math.cos(t*Math.PI)*.45;add(plank,mx+ux*t*L,y0+arch,mz+uz*t*L,ry,2.6,.08,.28)}
    for(const sd of[-1,1]){for(let k=0;k<=Math.ceil(L/2.2);k++){const t=k/Math.ceil(L/2.2)-.5,arch=Math.cos(t*Math.PI)*.45;add(post,mx+ux*t*L+vx*sd*1.25,y0+arch+.3,mz+uz*t*L+vz*sd*1.25,ry,.1,.62,.1);if(Math.abs(t)<.45)add(post,mx+ux*t*L+vx*sd*1.1,y0+arch-.7,mz+uz*t*L+vz*sd*1.1,ry,.16,1.6,.16)}
     const M2=8;for(let k=0;k<M2;k++){const t0=k/M2-.5,t1=(k+1)/M2-.5,a0=Math.cos(t0*Math.PI)*.45,a1=Math.cos(t1*Math.PI)*.45,tm=(t0+t1)/2;const seg=L/M2;add(rail,mx+ux*tm*L+vx*sd*1.25,y0+(a0+a1)/2+.58,mz+uz*tm*L+vz*sd*1.25,ry,.08,.08,seg*1.04,0)}}nb++}
   const bm=new THREE.MeshStandardMaterial({color:0x7a5a38,roughness:.9}),bm2=new THREE.MeshStandardMaterial({color:0x5a3e26,roughness:.85});for(const[arr,m]of[[plank,bm],[rail,bm2],[post,bm2]]){if(!arr.length)continue;const me=new THREE.Mesh(mergeGeometries(arr),m);me.castShadow=true;me.receiveShadow=true;root.add(me)}window.__BRIDGES=nb}}catch(e){console.warn('나무다리',e)}
 window.__PROPN=n;window.__PROPMS=Math.round(performance.now()-t0);window.__PROPS={houses:houses.length,by:Object.fromEntries(KINDS.map(k=>[k,place[k].length]))};return root}
