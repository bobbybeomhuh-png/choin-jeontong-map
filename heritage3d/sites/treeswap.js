/* 장난감 나무 바꾸기(2026-11-28): 장소 코드가 원뿔·각진 공으로 만든 나무를 화면에서 찾아
   원뿔 나무 → 실제 소나무 모델(pine_lo, 인스턴스), 덩어리 나무 → 잎 달린 활엽수(plantBroad)로 바꾼다.
   장소 파일을 하나씩 고치지 않고 모든 장소에 한 번에 적용. 원래 나무는 숨기기만 함(충돌 판은 그대로). */
import * as THREE from 'three';
import {tamePineRoots,leafCloudGeo,leafMat,lumpyHill} from './treekit.js';
import {getModel} from './hanokkit.js';
const FOL=new Set(['ConeGeometry','IcosahedronGeometry','DodecahedronGeometry','OctahedronGeometry','SphereGeometry']);
const isGreen=c=>{const h={};c.getHSL(h);return h.h>.17&&h.h<.48&&h.s>.15&&h.l<.62};
const isBrown=c=>{const h={};c.getHSL(h);return (h.h<.13||h.h>.95)&&h.s>.12&&h.l<.5};
export function findToyTrees(scene,GY=0){scene.updateMatrixWorld(true);const fol=[],tr=[],bb=new THREE.Box3(),sz=new THREE.Vector3();
 scene.traverse(o=>{if(!o.isMesh||o.isInstancedMesh||o.isSkinnedMesh||!o.visible||!o.geometry)return;let p=o.parent;while(p){if(!p.visible)return;p=p.parent}const m=o.material;if(!m||Array.isArray(m)||m.map||m.transparent||m.vertexColors||!m.color)return;const t=o.geometry.type;
  bb.setFromObject(o);bb.getSize(sz);const w=Math.max(sz.x,sz.z);
  if(FOL.has(t)&&isGreen(m.color)&&sz.y>.45&&sz.y<9&&w<9&&w>.35&&bb.min.y>GY+.2)fol.push({o,min:bb.min.y,max:bb.max.y,x:(bb.min.x+bb.max.x)/2,z:(bb.min.z+bb.max.z)/2,r:w/2,cone:t==='ConeGeometry',sx:sz.x,sy:sz.y,sz:sz.z});
  else if(t==='CylinderGeometry'&&isBrown(m.color)&&sz.y>.3&&sz.y<7&&w<2.6)tr.push({o,min:bb.min.y,max:bb.max.y,x:(bb.min.x+bb.max.x)/2,z:(bb.min.z+bb.max.z)/2,used:false})});
 /* 잎 덩어리 묶기: 가운데가 가까우면 한 나무 */
 const cl=[];for(const f of fol){let c=cl.find(c=>Math.hypot(c.x-f.x,c.z-f.z)<Math.max(.7,Math.min(c.r,f.r)*.75));if(!c){c={x:f.x,z:f.z,r:f.r,min:f.min,max:f.max,parts:[],cones:0};cl.push(c)}c.parts.push(f.o);c.min=Math.min(c.min,f.min);c.max=Math.max(c.max,f.max);c.r=Math.max(c.r,f.r);if(f.cone)c.cones++}
 const out=[];for(const c of cl){let best=null,bd=1e9;for(const t of tr){if(t.used)continue;const d=Math.hypot(t.x-c.x,t.z-c.z);if(d<Math.max(.6,c.r*.5)&&t.max>c.min-.8&&d<bd){bd=d;best=t}}
  const cone=c.cones*2>=c.parts.length;if(!best&&!(cone&&(c.min<GY+1.6||c.cones>=2)))continue;/* 줄기 없는 공은 나무가 아닐 수 있음(장식) */
  if(best)best.used=true;const base=best?best.min:(c.min<GY+1.6?GY:c.min-c.r*.6);const H=c.max-base;if(H<1.2||H>16)continue;
  out.push({x:best?best.x:c.x,z:best?best.z:c.z,base,H,cone,hide:best?[...c.parts,best.o]:c.parts})}
 out.blobs=fol.filter(f=>!f.cone);return out}
let PINE=null;
async function pineParts(){if(PINE)return PINE;const s0=await getModel('misc/pine_lo');if(!s0)return null;const src=s0.clone(true);tamePineRoots(src);src.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(src),sz=b.getSize(new THREE.Vector3());const inv=new THREE.Matrix4().makeTranslation(-(b.min.x+b.max.x)/2,-b.min.y,-(b.min.z+b.max.z)/2);const parts=[];src.traverse(e=>{if(e.isMesh&&e.material&&e.material.visible!==false)parts.push({g:e.geometry,m:e.material,mw:inv.clone().multiply(e.matrixWorld)})});return PINE={parts,h:sz.y}}
export async function swapToyTrees(scene,{GY=0,max=400}={}){try{swapToyHills(scene)}catch(e){console.warn('산 바꾸기',e)}const ALL=findToyTrees(scene,GY),T=ALL.slice(0,max);T.blobs=ALL.blobs;if(!T.length&&!T.blobs.length)return 0;
 const pines=T.filter(t=>t.cone);let n=0;
 if(pines.length){const P=await pineParts();if(P){const o=new THREE.Object3D(),M=new THREE.Matrix4();let s=7;const rnd=()=>{s=(s*16807)%2147483647;return s/2147483647};const mats=pines.map(t=>{o.position.set(t.x,t.base,t.z);o.rotation.set(0,rnd()*6.28,0);o.scale.setScalar(t.H*1.2/P.h);o.updateMatrix();return o.matrix.clone()});
   for(const p of P.parts){const im=new THREE.InstancedMesh(p.g,p.m,mats.length);mats.forEach((m,i)=>im.setMatrixAt(i,M.copy(m).multiply(p.mw)));im.castShadow=true;im.receiveShadow=true;im.userData.noPhoto=1;im.computeBoundingSphere&&im.computeBoundingSphere();im.frustumCulled=false;scene.add(im)}
   for(const t of pines)for(const h of t.hide)h.visible=false;n+=pines.length}}
 /* 각진 공 잎 → 잎 구름(같은 자리·크기·색) */const B=T.blobs||[];if(B.length){const im=new THREE.InstancedMesh(leafCloudGeo(),leafMat(),B.length),o=new THREE.Object3D(),c=new THREE.Color();B.forEach((f,i)=>{o.position.set(f.x,(f.min+f.max)/2,f.z);o.rotation.set(0,i*2.4,0);o.scale.set(f.sx*.6,f.sy*.62,f.sz*.6);o.updateMatrix();im.setMatrixAt(i,o.matrix);const h={};f.o.material.color.getHSL(h);c.setHSL(h.h,Math.min(.5,h.s*.8),Math.min(.42,h.l*1.05));im.setColorAt(i,c);f.o.visible=false});im.castShadow=true;im.receiveShadow=true;im.frustumCulled=false;im.userData.noPhoto=1;scene.add(im);n+=B.length}
 return n}

/* 각진 반구 산 → 능선 있는 숲 산(lumpyHill). 장소마다 SphereGeometry(…,0,π/2)+flatShading 초록으로 만든 산 */
export function swapToyHills(scene){scene.updateMatrixWorld(true);const L=[];scene.traverse(o=>{if(!o.isMesh||o.isInstancedMesh||!o.visible||!o.geometry||o.geometry.type!=='SphereGeometry')return;const P=o.geometry.parameters;if(!P||P.radius<6||Math.abs((P.thetaLength||Math.PI)-Math.PI/2)>.01)return;const m=o.material;if(!m||Array.isArray(m)||m.map||m.vertexColors||!m.color||!isGreen(m.color))return;L.push(o)});
 let k=0;for(const o of L){const sc=new THREE.Vector3();o.getWorldScale(sc);const rr=P_(o).radius*Math.max(sc.x,sc.z),h=P_(o).radius*sc.y;const m=lumpyHill(rr,h,o.material.color.getHex(),++k);const wp=new THREE.Vector3();o.getWorldPosition(wp);m.position.copy(wp);m.receiveShadow=true;scene.add(m);o.visible=false}return L.length}
const P_=o=>o.geometry.parameters;
