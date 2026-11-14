/* 공개 3D 한옥 부품: 유산 마당 둘레를 실제 한옥으로 채운다(도형으로 깎지 않음).
   출처(모두 CC BY, 스케치팹): 기와 사랑채·농가·교육관·담장 = chrishong "Korea Traditional House",
   대문 = 한국문화정보원 KCISA 외대문, 초가 = KCISA 수내동가옥 초가집.
   원본 수십만 면을 블렌더로 4만 면 안팎으로 줄이고 Draco 압축(models/hanok). 갱신 2026-11-14 */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
const U=p=>new URL('../models/'+p+'.glb',import.meta.url).href;
const gl=new GLTFLoader();{const d=new DRACOLoader();d.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(d)}
const CACHE={};
export function getModel(p){if(!CACHE[p])CACHE[p]=new Promise(res=>gl.load(U(p),m=>{const s=m.scene;s.traverse(e=>{if(e.isMesh){e.castShadow=true;e.receiveShadow=true;const mm=e.material;if(mm&&mm.map)mm.map.anisotropy=8}});s.updateMatrixWorld(true);res(s)},undefined,()=>res(null)));return CACHE[p]}
/* 종류별 원본 정보: f=파일, h=세울 높이(m), fr=앞면을 +z로 돌리는 각도, n=이름 */
export const HANOK={
 sarang:{f:'hanok/giwa_sarangchae',h:6.6,fr:-Math.PI/2,n:'기와 사랑채'},
 nongga:{f:'hanok/giwa_nongga',h:6.4,fr:-Math.PI/2,n:'기와 살림채'},
 hall:{f:'hanok/giwa_hall',h:6.6,fr:-Math.PI/2,n:'기와 큰채'},
 wall:{f:'hanok/giwa_wall',h:2.3,fr:0,n:'기와 담장'},
 gate:{f:'hanok/oedaemun',h:8.2,fr:-Math.PI/2,n:'단청 대문'},
 choga1:{f:'misc/choga1',h:null,fr:0,n:'초가(ㄱ자)'},
 choga2:{f:'misc/choga2',h:null,fr:0,n:'초가(일자)'}};
/* 크기(앞면 +z 기준, 높이 맞춘 뒤): 미리 재 둔 값. 충돌 상자를 모델이 오기 전에 만들 수 있게 */
const FOOT={sarang:[16.1,10.1],nongga:[17.7,7.1],hall:[19.4,7.4],wall:[12.3,1.7],gate:[11.8,8.2],choga1:[14.9,14],choga2:[22.6,6.8]};
export function footOf(k,ry=0,s=1){const[w,d]=FOOT[k];const ax=Math.abs(Math.sin(ry))>.5;return ax?[d*s,w*s]:[w*s,d*s]}
/* 한 채 세우기. SOL에 충돌 상자(속까지 막음)를 넣는다. hole=true면 대문처럼 가운데를 비움 */
export function placeHanok(G,SOL,k,x,z,ry=0,{y=0,s=1,solid=true,hole=false,TOUCH=false}={}){const H=HANOK[k];const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry;G.add(g);
 getModel(H.f).then(src=>{if(!src)return;const o=src.clone();const b=new THREE.Box3().setFromObject(o),sz=b.getSize(new THREE.Vector3());const sc=(H.h?H.h/sz.y:1)*s;o.scale.setScalar(sc);o.rotation.y=H.fr;o.updateMatrixWorld(true);const b2=new THREE.Box3().setFromObject(o);o.position.set(-(b2.min.x+b2.max.x)/2,-b2.min.y,-(b2.min.z+b2.max.z)/2);if(TOUCH)o.traverse(e=>{if(e.isMesh)e.castShadow=false});g.add(o)});
 if(solid&&SOL){const[w,d]=footOf(k,ry,s);const hw=w/2,hd=d/2;if(hole){const ax=Math.abs(Math.sin(ry))>.5;const t=1.4;/* 대문: 양옆 기둥 칸만 막고 가운데 통로는 비움 */if(ax){SOL.push({x0:x-hw,x1:x+hw,y0:-9,y1:20,z0:z-hd,z1:z-hd+t},{x0:x-hw,x1:x+hw,y0:-9,y1:20,z0:z+hd-t,z1:z+hd})}else{SOL.push({x0:x-hw,x1:x-hw+t,y0:-9,y1:20,z0:z-hd,z1:z+hd},{x0:x+hw-t,x1:x+hw,y0:-9,y1:20,z0:z-hd,z1:z+hd})}}
  else SOL.push({x0:x-hw+.3,x1:x+hw-.3,y0:-9,y1:20,z0:z-hd+.3,z1:z+hd-.3})}
 return g}
/* 담장 한 줄: (x0,z0)에서 (x1,z1)까지 같은 담장을 이어 붙인다(축에 나란한 줄만) */
export function hanokWall(G,SOL,x0,z0,x1,z1,{TOUCH=false}={}){const L=Math.hypot(x1-x0,z1-z0),n=Math.max(1,Math.round(L/12.3)),s=L/n/12.3,ry=Math.abs(x1-x0)>Math.abs(z1-z0)?0:Math.PI/2;
 for(let i=0;i<n;i++){const t=(i+.5)/n;placeHanok(G,null,'wall',x0+(x1-x0)*t,z0+(z1-z0)*t,ry,{s,solid:false,TOUCH})}
 const th=.5;SOL.push({x0:Math.min(x0,x1)-th,x1:Math.max(x0,x1)+th,y0:-9,y1:9,z0:Math.min(z0,z1)-th,z1:Math.max(z0,z1)+th})}
