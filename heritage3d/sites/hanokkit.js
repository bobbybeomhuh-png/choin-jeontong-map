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
export function placeHanok(G,SOL,k,x,z,ry=0,{y=0,s=1,sx=1,solid=true,hole=false,TOUCH=false,walls=false}={}){const H=HANOK[k];const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry;G.add(g);
 getModel(H.f).then(src=>{if(!src)return;const o=src.clone();const b=new THREE.Box3().setFromObject(o),sz=b.getSize(new THREE.Vector3());const sc=(H.h?H.h/sz.y:1)*s;o.scale.setScalar(sc);o.scale.x*=sx;/* 담장처럼 길이만 늘이고 높이·두께는 그대로 */o.rotation.y=H.fr;o.updateMatrixWorld(true);const b2=new THREE.Box3().setFromObject(o);o.position.set(-(b2.min.x+b2.max.x)/2,-b2.min.y,-(b2.min.z+b2.max.z)/2);if(TOUCH)o.traverse(e=>{if(e.isMesh)e.castShadow=false});g.add(o)});
 /* 큰채(hall) 모델은 뒤·옆이 기둥만 있어 속이 비침 → 뒤와 양옆에 화방벽+회벽+살창을 채움(앞은 문짝이 있으니 그대로). 몸채 범위는 모델을 재서 얻은 값 */
 if(walls&&k==='hall'){const W=new THREE.Group();g.add(W);const mk=c=>new THREE.MeshStandardMaterial({color:c,roughness:.9});const pl=mk(0xefe6d6),hw=mk(0x9a5a48),wd=mk(0x5a3a22),wn=mk(0x3a4a3a);const X0=-8.5,X1=8.45,Z0=-2.52,Z1=2.5,Y0=.45,Y1=3.0;
  const bx=(w,h,d,m,x,yy,z)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.position.set(x,yy,z);b.castShadow=b.receiveShadow=true;W.add(b)};
  const wall=(ax,az,bx2,bz,win)=>{const L=Math.hypot(bx2-ax,bz-az),cx=(ax+bx2)/2,cz=(az+bz)/2,along=Math.abs(bx2-ax)>Math.abs(bz-az);const t=.2;const W2=along?L:t,D2=along?t:L;bx(W2,.9,D2,hw,cx,Y0+.45,cz);bx(W2,Y1-Y0-.9,D2,pl,cx,Y0+.9+(Y1-Y0-.9)/2,cz);bx(along?L:t+.04,.14,along?t+.04:L,wd,cx,Y0+.92,cz);bx(along?L:t+.04,.14,along?t+.04:L,wd,cx,Y1-.05,cz);
   const n=Math.max(1,Math.round(L/3.4));for(let i=0;i<n;i++){const u=-L/2+L*(i+.5)/n;const x=along?cx+u:cx,z=along?cz:cz+u;if(!win)continue;bx(along?1:t+.06,.7,along?t+.06:1,wn,x,Y0+1.65,z);for(let q=-2;q<=2;q++)bx(along?.04:t+.08,.7,along?t+.08:.04,wd,along?x+q*.2:x,Y0+1.65,along?z:z+q*.2)}};
  wall(X0,Z0,X1,Z0,true);wall(X0,Z0,X0,Z1,true);wall(X1,Z0,X1,Z1,true);
  if(SOL){const c=Math.cos(ry),sn=Math.sin(ry);const tw=(lx,lz)=>[x+lx*c+lz*sn,z-lx*sn+lz*c];for(const [a,b2,cc,d] of[[X0,X1,Z0-.15,Z0+.15],[X0-.15,X0+.15,Z0,Z1],[X1-.15,X1+.15,Z0,Z1]]){const p1=tw(a,cc),p2=tw(b2,d);SOL.push({x0:Math.min(p1[0],p2[0]),x1:Math.max(p1[0],p2[0]),y0:-9,y1:9,z0:Math.min(p1[1],p2[1]),z1:Math.max(p1[1],p2[1])})}}}
 if(solid&&SOL){const[w,d]=footOf(k,ry,s);const hw=w/2,hd=d/2;if(hole){const ax=Math.abs(Math.sin(ry))>.5;const t=1.4;/* 대문: 양옆 기둥 칸만 막고 가운데 통로는 비움 */if(ax){SOL.push({x0:x-hw,x1:x+hw,y0:-9,y1:20,z0:z-hd,z1:z-hd+t},{x0:x-hw,x1:x+hw,y0:-9,y1:20,z0:z+hd-t,z1:z+hd})}else{SOL.push({x0:x-hw,x1:x-hw+t,y0:-9,y1:20,z0:z-hd,z1:z+hd},{x0:x+hw-t,x1:x+hw,y0:-9,y1:20,z0:z-hd,z1:z+hd})}}
  else SOL.push({x0:x-hw+.3,x1:x+hw-.3,y0:-9,y1:20,z0:z-hd+.3,z1:z+hd-.3})}
 return g}
/* 담장 한 줄: (x0,z0)에서 (x1,z1)까지 같은 담장을 이어 붙인다(축에 나란한 줄만) */
export function hanokWall(G,SOL,x0,z0,x1,z1,{TOUCH=false,ext=.6,extA=ext,extB=ext}={}){/* 양끝을 담 두께 절반쯤 늘려 모퉁이에서 두 줄이 빈틈 없이 만나게 한다. 높이는 늘이지 않고 길이만 맞춘다 */const L0=Math.hypot(x1-x0,z1-z0),ux=(x1-x0)/L0,uz=(z1-z0)/L0;/* 대문에 닿는 끝은 extA/extB=0으로 늘이지 않음(문을 파고들지 않게) */const ax=x0-ux*extA,az=z0-uz*extA,bx=x1+ux*extB,bz=z1+uz*extB;const L=L0+extA+extB,n=Math.max(1,Math.round(L/12.3)),sx=L/n/12.3,ry=Math.abs(x1-x0)>Math.abs(z1-z0)?0:Math.PI/2;
 for(let i=0;i<n;i++){const t=(i+.5)/n;placeHanok(G,null,'wall',ax+(bx-ax)*t,az+(bz-az)*t,ry,{sx,solid:false,TOUCH})}
 const th=.5;SOL.push({x0:Math.min(x0,x1)-th,x1:Math.max(x0,x1)+th,y0:-9,y1:9,z0:Math.min(z0,z1)-th,z1:Math.max(z0,z1)+th})}
