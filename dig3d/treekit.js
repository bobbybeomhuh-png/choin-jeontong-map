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
export function plantBroad(parent,list,{shadow=true}={}){const G=broadGeo(),N=list.length;if(!N)return null;
 const bm=new THREE.MeshStandardMaterial({color:0x5a4030,roughness:.95});const lm=new THREE.MeshStandardMaterial({map:leafTex(),alphaTest:.45,side:THREE.DoubleSide,roughness:.9,vertexColors:true});
 const b=new THREE.InstancedMesh(G.bark,bm,N),l=new THREE.InstancedMesh(G.leaf,lm,N),o=new THREE.Object3D(),c=new THREE.Color();
 list.forEach(([x,y,z,ry,s,hex],i)=>{o.position.set(x,y,z);o.rotation.set(0,ry,0);o.scale.setScalar(s);o.updateMatrix();b.setMatrixAt(i,o.matrix);l.setMatrixAt(i,o.matrix);l.setColorAt(i,c.set(hex==null?0x4f7f3a:hex))});
 b.castShadow=l.castShadow=shadow;b.receiveShadow=l.receiveShadow=true;parent.add(b,l);return [b,l]}
/* 먼 산 소나무: 그린 소나무 판 두 장을 십자로(멀리서 보는 용, 아주 가벼움) */
let PPT=null;
function paintedPineTex(){if(PPT)return PPT;const W=128,H=256,c=document.createElement('canvas');c.width=W;c.height=H;const q=c.getContext('2d'),r=rng(23);
 q.strokeStyle='#4a3020';q.lineWidth=7;q.lineCap='round';q.beginPath();q.moveTo(64,H-2);q.bezierCurveTo(58,H-70,72,H-120,62,60);q.stroke();
 const tiers=5;for(let t=0;t<tiers;t++){const y=H-90-t*30,wd=56-t*6+(r()-.5)*8,cx=64+(r()-.5)*10;q.fillStyle='rgba(40,80,40,.55)';q.beginPath();q.ellipse(cx,y-2,wd*.92,11,0,0,7);q.fill();for(let i=0;i<300;i++){const a=r()*6.28,rr=Math.sqrt(r()),x=cx+Math.cos(a)*wd*rr,yy=y+Math.sin(a)*12*rr-(1-rr)*7;const g=80+(r()*80|0);q.strokeStyle=`rgb(${g*.45|0},${g+28},${g*.5|0})`;q.lineWidth=2.2;q.beginPath();q.moveTo(x,yy);q.lineTo(x+(r()-.5)*8,yy-3-r()*4);q.stroke()}}
 PPT=new THREE.CanvasTexture(c);PPT.colorSpace=THREE.SRGBColorSpace;return PPT}
export function paintedPines(N){const a=new THREE.PlaneGeometry(1,2).translate(0,1,0),b=a.clone().rotateY(Math.PI/2);const geo=mergeGeometries([a,b]);
 const m=new THREE.MeshStandardMaterial({map:paintedPineTex(),alphaTest:.4,side:THREE.DoubleSide,roughness:1});return new THREE.InstancedMesh(geo,m,N)}
/* 울퉁불퉁한 산: 반구에 잔물결 능선과 아래 어둡고 위 밝은 색 */
export function lumpyHill(rr,h,col,seed=1){const r=rng(seed*7+3),g=new THREE.SphereGeometry(rr,40,12,0,Math.PI*2,0,Math.PI/2),p=g.attributes.position,c=new Float32Array(p.count*3),base=new THREE.Color(col),hi=base.clone().offsetHSL(.02,-.05,.08),lo=base.clone().offsetHSL(-.02,0,-.1),k1=r()*6,k2=r()*6,tmp=new THREE.Color();
 for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),a=Math.atan2(z,x),t=y/rr;const n=1+.07*Math.sin(a*5+k1)*Math.sin(t*4+k2)+.04*Math.sin(a*11+k2*2)*(1-t);p.setXYZ(i,x*n,y*(1+.12*Math.sin(a*3+k1))*h/rr,z*n);tmp.copy(lo).lerp(hi,Math.min(1,t*1.3));c[i*3]=tmp.r;c[i*3+1]=tmp.g;c[i*3+2]=tmp.b}
 g.setAttribute('color',new THREE.BufferAttribute(c,3));g.computeVertexNormals();return new THREE.Mesh(g,new THREE.MeshStandardMaterial({vertexColors:true,roughness:1,flatShading:true}))}
