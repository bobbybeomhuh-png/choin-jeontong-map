/* 공용 나무 세트: 넓은잎나무(잎 판 묶음) + 소나무(가벼운 실측판). 한 번에 많이 그리기(Instanced) */
import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
let LEAFTEX=null,BROAD=null;
function rng(seed){let a=seed;return()=>{a=(a*16807)%2147483647;return a/2147483647}}
function leafTex(){if(LEAFTEX)return LEAFTEX;const c=document.createElement('canvas');c.width=c.height=256;const q=c.getContext('2d'),r=rng(11);
 for(let i=0;i<190;i++){const x=22+r()*212,y=22+r()*212,a=r()*6.28,l=7+r()*7,w=l*.5,v=185+(r()*70|0);q.save();q.translate(x,y);q.rotate(a);q.fillStyle=`rgb(${v},${v},${v})`;q.beginPath();q.ellipse(0,0,l,w,0,0,7);q.fill();q.strokeStyle=`rgba(0,0,0,.18)`;q.lineWidth=1.2;q.beginPath();q.moveTo(-l,0);q.lineTo(l,0);q.stroke();q.restore()}
 LEAFTEX=new THREE.CanvasTexture(c);LEAFTEX.colorSpace=THREE.SRGBColorSpace;return LEAFTEX}
function broadGeo(){if(BROAD)return BROAD;const r=rng(5),bark=[],leaf=[];
 const tr=new THREE.CylinderGeometry(.16,.3,3.4,8).translate(0,1.7,0);bark.push(tr);
 const tips=[];for(let i=0;i<5;i++){const a=i/5*6.28+r()*.6,tilt=.55+r()*.35,L=1.6+r()*.9,y0=2.2+r()*1;const g=new THREE.CylinderGeometry(.05,.12,L,6).translate(0,L/2,0);const m=new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(tilt,a,0,'YXZ'));m.setPosition(0,y0,0);g.applyMatrix4(m);bark.push(g);const tip=new THREE.Vector3(0,L,0).applyMatrix4(m);tips.push(tip)}
 for(let i=0;i<46;i++){let p;if(i<tips.length*4){const t=tips[i%tips.length];p=new THREE.Vector3(t.x+(r()-.5)*1.4,t.y+(r()-.3)*1.1,t.z+(r()-.5)*1.4)}else{const u=r()*6.28,v=Math.acos(2*r()-1),R=.4+r()*.6;p=new THREE.Vector3(Math.sin(v)*Math.cos(u)*2.3*R,4.3+Math.cos(v)*1.5*R,Math.sin(v)*Math.sin(u)*2.3*R)}
  const s=1.3+r()*.7,g=new THREE.PlaneGeometry(s,s);g.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(r()*3.14,r()*3.14,r()*3.14)));g.translate(p.x,p.y,p.z);
  /* 위로 갈수록 밝게(음영 흉내): 정점 색 */const n=g.attributes.position.count,col=new Float32Array(n*3);for(let k=0;k<n;k++){const y=g.attributes.position.getY(k),b=.72+.28*Math.min(1,Math.max(0,(y-2.6)/3));col[k*3]=col[k*3+1]=col[k*3+2]=b}g.setAttribute('color',new THREE.BufferAttribute(col,3));leaf.push(g)}
 for(const g of bark){g.deleteAttribute('uv');g.deleteAttribute('normal');g.computeVertexNormals()}
 BROAD={bark:mergeGeometries(bark.map(g=>g.toNonIndexed())),leaf:mergeGeometries(leaf.map(g=>g.toNonIndexed()))};return BROAD}
/* list: [[x,y,z,ry,scale,colorHex]] */
export function plantBroad(parent,list,{shadow=true,chunk=0}={}){
 /* chunk(m): 넓은 땅에 흩어 심을 때 칸별로 나눠 묶음 → 화면 밖 칸은 그리지 않음. 돌려주는 값은 [껍질 묶음들, 잎 묶음들] */
 if(chunk&&list.length>60){const cells=new Map();for(const t of list){const k=Math.floor(t[0]/chunk)+','+Math.floor(t[2]/chunk);if(!cells.has(k))cells.set(k,[]);cells.get(k).push(t)}const B=[],L=[];for(const part of cells.values()){const r=plantBroad(parent,part,{shadow});if(r){r[0].computeBoundingSphere();r[1].computeBoundingSphere();B.push(r[0]);L.push(r[1])}}return [B,L]}
 const G=broadGeo(),N=list.length;if(!N)return null;
 const bm=new THREE.MeshStandardMaterial({color:0x5a4030,roughness:.95});const lm=new THREE.MeshStandardMaterial({map:leafTex(),alphaTest:.45,side:THREE.DoubleSide,roughness:.9,vertexColors:true});
 const b=new THREE.InstancedMesh(G.bark,bm,N),l=new THREE.InstancedMesh(G.leaf,lm,N),o=new THREE.Object3D(),c=new THREE.Color();
 const CR=window.__CROWNS||(window.__CROWNS=[]);list.forEach(([x,y,z,ry,s,hex],i)=>{CR.push({x,y:y+4.3*s,z,r:2.5*s});/* 카메라용 우듬지 자리 */o.position.set(x,y,z);o.rotation.set(0,ry,0);o.scale.setScalar(s);o.updateMatrix();b.setMatrixAt(i,o.matrix);l.setMatrixAt(i,o.matrix);l.setColorAt(i,c.set(hex==null?0x4f7f3a:hex))});
 b.castShadow=l.castShadow=shadow;b.receiveShadow=l.receiveShadow=true;parent.add(b,l);return [b,l]}
/* 먼 산 소나무: 그린 소나무 판 두 장을 십자로(멀리서 보는 용, 아주 가벼움) */
let PPT=null;
function paintedPineTex(){if(PPT)return PPT;/* 11/17: 층층 전나무 판 → 우리 소나무(적송): 휘어 오른 붉은 줄기, 위쪽에 옆으로 퍼진 솔잎 구름 덩어리 */const W=256,H=512,c=document.createElement('canvas');c.width=W;c.height=H;const q=c.getContext('2d'),r=rng(23);
 /* 줄기: 붉은 갈색, 거북등 껍질 */const tx=[128,118,134,124,140];const path=()=>{q.beginPath();q.moveTo(126,H-2);q.bezierCurveTo(108,H-150,150,H-260,126,150)};
 q.lineCap='round';q.strokeStyle='#5a2e1c';q.lineWidth=22;path();q.stroke();q.strokeStyle='#9a4a2a';q.lineWidth=15;path();q.stroke();q.strokeStyle='rgba(200,110,70,.55)';q.lineWidth=5;q.beginPath();q.moveTo(122,H-6);q.bezierCurveTo(104,H-150,146,H-260,122,152);q.stroke();
 for(let i=0;i<70;i++){const t=r(),y=H-10-t*(H-170),x=126+Math.sin(t*3.2)*12+(r()-.5)*8;q.strokeStyle='rgba(50,22,12,.6)';q.lineWidth=1.5;q.beginPath();q.moveTo(x-5,y);q.lineTo(x+5,y+(r()-.5)*3);q.stroke()}
 /* 가지 */const tufts=[];const br=(x0,y0,x1,y1,w)=>{q.strokeStyle='#5a2e1c';q.lineWidth=w;q.beginPath();q.moveTo(x0,y0);q.quadraticCurveTo((x0+x1)/2,y1+10,x1,y1);q.stroke();tufts.push([x1,y1])};
 br(124,230,48,196,7);br(132,200,212,170,7);br(126,170,70,120,6);br(128,150,190,108,6);br(126,160,128,70,6);br(120,260,30,262,5);br(134,250,226,236,5);
 /* 솔잎 구름: 아래 어둡게, 위 밝게, 바늘 획 */for(const[tx2,ty2]of tufts){const wd=46+r()*26,ht=22+r()*10;
  q.fillStyle='rgba(22,52,36,.92)';q.beginPath();q.ellipse(tx2,ty2+4,wd,ht,0,0,7);q.fill();
  for(let i=0;i<520;i++){const a=r()*6.28,rr=Math.sqrt(r()),x=tx2+Math.cos(a)*wd*rr,y=ty2+Math.sin(a)*ht*rr*.9;const up=(ty2+ht-y)/(ht*2);const g=70+(up*90|0)+(r()*30|0);q.strokeStyle=`rgb(${g*.38|0},${g+16},${g*.62|0})`;q.lineWidth=1.6;q.beginPath();q.moveTo(x,y);const an=-1.6+(r()-.5)*1.6;q.lineTo(x+Math.cos(an)*6,y+Math.sin(an)*6);q.stroke()}
  q.fillStyle='rgba(210,235,170,.18)';q.beginPath();q.ellipse(tx2-6,ty2-ht*.45,wd*.6,ht*.35,0,0,7);q.fill()}
 PPT=new THREE.CanvasTexture(c);PPT.colorSpace=THREE.SRGBColorSpace;PPT.anisotropy=4;return PPT}
export function paintedPines(N){/* 판 세 장(60도씩)으로 어느 쪽에서 봐도 납작하지 않게 */const a=new THREE.PlaneGeometry(1.1,2.2).translate(0,1.1,0),b=a.clone().rotateY(Math.PI/3),c2=a.clone().rotateY(-Math.PI/3);const geo=mergeGeometries([a,b,c2]);
 const m=new THREE.MeshStandardMaterial({map:paintedPineTex(),alphaTest:.45,side:THREE.DoubleSide,roughness:1});return new THREE.InstancedMesh(geo,m,N)}
/* 울퉁불퉁한 산: 반구에 잔물결 능선과 아래 어둡고 위 밝은 색 */
export function lumpyHill(rr,h,col,seed=1){const r=rng(seed*7+3),g=new THREE.SphereGeometry(rr,64,20,0,Math.PI*2,0,Math.PI/2),p=g.attributes.position,c=new Float32Array(p.count*3),base=new THREE.Color(col),hi=base.clone().offsetHSL(.02,-.05,.08),lo=base.clone().offsetHSL(-.02,0,-.1),k1=r()*6,k2=r()*6,tmp=new THREE.Color();
 for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),a=Math.atan2(z,x),t=y/rr;const n=1+.07*Math.sin(a*5+k1)*Math.sin(t*4+k2)+.04*Math.sin(a*11+k2*2)*(1-t);p.setXYZ(i,x*n,y*(1+.12*Math.sin(a*3+k1))*h/rr,z*n);tmp.copy(lo).lerp(hi,Math.min(1,t*1.3));c[i*3]=tmp.r;c[i*3+1]=tmp.g;c[i*3+2]=tmp.b}
 g.setAttribute('color',new THREE.BufferAttribute(c,3));g.computeVertexNormals();const mm=new THREE.MeshStandardMaterial({vertexColors:true,roughness:1});mm.userData.finKind='forest';return new THREE.Mesh(g,mm)}
/* 소나무 모델(pine_lo) 밑동 뿌리 판 오므리기: 아래 12% 높이에서 옆으로 뻗은 납작한 뿌리가 거미 다리처럼 보임 → 줄기 둘레로 당김. 원본에 한 번만 */
export function tamePineRoots(root){if(!root||root.userData.tamed)return root;root.userData.tamed=true;root.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(root),H=b.max.y-b.min.y;if(!(H>0))return root;
 const v=new THREE.Vector3(),inv=new THREE.Matrix4();let sx=0,sz=0,n=0;root.traverse(m=>{if(!m.isMesh||!/bark/i.test(m.material&&m.material.name||''))return;const pa=m.geometry.attributes.position;for(let i=0;i<pa.count;i++){v.fromBufferAttribute(pa,i).applyMatrix4(m.matrixWorld);if(v.y<b.min.y+H*.3&&v.y>b.min.y+H*.15){sx+=v.x;sz+=v.z;n++}}});const cx=n?sx/n:(b.min.x+b.max.x)/2,cz=n?sz/n:(b.min.z+b.max.z)/2,R0=.04*H;
 root.traverse(m=>{if(!m.isMesh||!/bark/i.test(m.material&&m.material.name||''))return;const g=m.geometry=m.geometry.clone(),pa=g.attributes.position;inv.copy(m.matrixWorld).invert();for(let i=0;i<pa.count;i++){v.fromBufferAttribute(pa,i).applyMatrix4(m.matrixWorld);if(v.y>b.min.y+H*.12)continue;const dx=v.x-cx,dz=v.z-cz,rr=Math.hypot(dx,dz);if(rr<=R0)continue;const nr=R0+(rr-R0)*.04;v.x=cx+dx/rr*nr;v.z=cz+dz/rr*nr;v.applyMatrix4(inv);pa.setXYZ(i,v.x,v.y,v.z)}pa.needsUpdate=true;g.computeVertexNormals();g.computeBoundingSphere()});return root}
