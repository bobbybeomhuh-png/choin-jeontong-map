/* 무이 나라 조달청: 「발밑 풀」(퀄리티 R2). 만든 날 2026-11-17
   고을 다섯 둘레(광장 바깥 7.5~30m)에 풀포기를 깔고 바람에 흔들리게 한다. 풀포기 = 풀잎 그림 판 두 장 십자.
   집·담·물 위에는 깔지 않는다(땅 높이가 고을 바닥과 크게 다르면 건너뜀). 시간 재기: window.__GRASSMS */
import * as THREE from 'three';
import {addWind} from './sites/treekit.js';
const tex=()=>{const c=document.createElement('canvas');c.width=128;c.height=128;const q=c.getContext('2d');let s=7;const R=()=>(s=(s*16807)%2147483647)/2147483647;
 for(let i=0;i<46;i++){const x=6+R()*116,h=34+R()*60,lean=(R()-.5)*30,w=3+R()*3;const g=q.createLinearGradient(0,128,0,128-h);const dk=R()<.5;g.addColorStop(0,dk?'#6f9a3e':'#7aa646');g.addColorStop(.6,dk?'#8fb84e':'#9cc456');g.addColorStop(1,R()<.25?'#d4c870':'#b8d468');q.fillStyle=g;
  q.beginPath();q.moveTo(x-w,128);q.quadraticCurveTo(x+lean*.4,128-h*.6,x+lean,128-h);q.quadraticCurveTo(x+lean*.4+1,128-h*.6,x+w,128);q.closePath();q.fill()}
 for(let i=0;i<5;i++){const x=20+R()*88,y=40+R()*40;q.fillStyle=['#f4f0e0','#f2c84a','#e86a98'][i%3];q.beginPath();q.arc(x,y,3,0,7);q.fill()}
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t};
export function setupGrass(scene,JOBS,extra=[]){const H=window.__H3;if(!H||!H.floorAt)return null;const t0=performance.now();
 const a=new THREE.PlaneGeometry(.8,.42).translate(0,.21,0),b=a.clone().rotateY(Math.PI/2);const g=new THREE.BufferGeometry();
 {const pa=[...a.attributes.position.array,...b.attributes.position.array],uv=[...a.attributes.uv.array,...b.attributes.uv.array],n=[...a.attributes.normal.array.map(()=>0)];const nn=new Float32Array(pa.length);for(let i=0;i<nn.length;i+=3)nn[i+1]=1;/* 위쪽 법선: 풀이 땅빛처럼 고르게 받게 */
  const ia=[...a.index.array],ib=[...b.index.array].map(i=>i+a.attributes.position.count);g.setAttribute('position',new THREE.Float32BufferAttribute(pa,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setAttribute('normal',new THREE.Float32BufferAttribute(nn,3));g.setIndex([...ia,...ib])}
 const m=new THREE.MeshStandardMaterial({map:tex(),alphaTest:.5,side:THREE.DoubleSide,roughness:1});addWind(m,.28,.0);
 const centers=JOBS.filter(j=>j.sp).map(j=>({x:j.sp.x,z:j.sp.z,y:j.sp.y||0,r0:7.5,r1:30,n:4500})).concat(extra);const N=centers.reduce((s,c)=>s+c.n,0);
 const im=new THREE.InstancedMesh(g,m,N),o=new THREE.Object3D(),col=new THREE.Color();let k=0;let s=91;const R=()=>(s=(s*16807)%2147483647)/2147483647;im.count=0;im.receiveShadow=true;im.frustumCulled=false;scene.add(im);let busyMs=0;
 /* 고을 하나씩 틈틈이(시작할 때 몇 초씩 멈추지 않게) */const one=(c)=>{const t1=performance.now();const base=H.floorAt(c.x,c.z,(c.y||0)+4);for(let i=0;i<c.n*1.6&&k<N;i++){const a2=R()*6.283,rr=c.r0+Math.sqrt(R())*(c.r1-c.r0),x=c.x+Math.cos(a2)*rr,z=c.z+Math.sin(a2)*rr;
   if(window.__RIVER&&window.__RIVER(x,z))continue;const y=H.floorAt(x,z,base+3);if(!isFinite(y)||Math.abs(y-base)>.6)continue;
   o.position.set(x,y-.02,z);o.rotation.set(0,R()*3.14,0);const sc=.6+R()*.6;o.scale.set(sc,sc*(.7+R()*.5),sc);o.updateMatrix();im.setMatrixAt(k,o.matrix);im.setColorAt(k,col.setHSL(.22+R()*.08,.25,.78+R()*.2));k++}
  im.count=k;im.instanceMatrix.needsUpdate=true;if(im.instanceColor)im.instanceColor.needsUpdate=true;busyMs=Math.max(busyMs,performance.now()-t1)};
 const L=centers.slice();const step=()=>{const c=L.shift();if(!c){window.__GRASSMS=Math.round(busyMs);window.__GRASSN=k;return}one(c);setTimeout(step,120)};setTimeout(step,0);return im}
