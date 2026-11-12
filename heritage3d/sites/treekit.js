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
