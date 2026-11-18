/* 무이 나라 조달청: 「되살린 국보가 고을로 돌아옴」(M2). 만든 날 2026-11-19
   의궤에 오른 국보를 그 고을 마당 한쪽 돌 받침 위에 세운다. 국보 3D가 천천히 돌고, 둘레에 금빛 둥근 빛과 반짝이.
   지도에 늘 남으므로 다섯 고을이 하나씩 채워진다. 받침 앞 패에 「되살린 국보 · ○○」.
   showTreasure(job) 여러 번 불러도 한 번만. */
import {ART} from './sites/restore3d.js';
import {getModel} from './sites/hanokkit.js';
const DONE=new Set();
export function showTreasure(job){const H=window.__H3;if(!H||!job||!job.sp||DONE.has(job.k))return;const T=H.THREE,sc=H.scene;const A=ART.find(a=>a.k===job.k);if(!A)return;DONE.add(job.k);
 const g=new T.Group();const x=job.sp.x-3.0,z=job.sp.z+1.7;let y=job.sp.y||0;try{y=H.floorAt(x,z,60)}catch(e){}g.position.set(x,y,z);sc.add(g);
 const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.8},o));
 const base=new T.Mesh(new T.CylinderGeometry(.72,.82,.32,24),M(0x8a847a,{roughness:.95}));base.position.y=.16;base.castShadow=true;base.receiveShadow=true;g.add(base);
 const top=new T.Mesh(new T.CylinderGeometry(.6,.66,.5,24),M(0x9a948a,{roughness:.9}));top.position.y=.57;top.castShadow=true;g.add(top);
 const rim=new T.Mesh(new T.TorusGeometry(.6,.03,8,40),M(0xd8a838,{metalness:.7,roughness:.3}));rim.rotation.x=Math.PI/2;rim.position.y=.83;g.add(rim);
 const glow=new T.Mesh(new T.CircleGeometry(1.15,40),new T.MeshBasicMaterial({color:0xffd27a,transparent:true,opacity:.28,depthWrite:false}));glow.rotation.x=-Math.PI/2;glow.position.y=.04;g.add(glow);
 /* 패 */{const c=document.createElement('canvas');c.width=320;c.height=110;const q=c.getContext('2d');q.fillStyle='#2a1a10';q.fillRect(0,0,320,110);q.strokeStyle='#d8a838';q.lineWidth=6;q.strokeRect(4,4,312,102);q.fillStyle='#f2d27a';q.textAlign='center';q.font='bold 26px "Do Hyeon",sans-serif';q.fillText('되살린 국보',160,42);q.fillStyle='#fff4dc';q.font='bold 32px "Do Hyeon",sans-serif';q.fillText(job.n,160,84);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;const pl=new T.Mesh(new T.PlaneGeometry(.78,.27),new T.MeshStandardMaterial({map:t,roughness:.7}));pl.position.set(0,.5,.665);g.add(pl)}
 const spin=new T.Group();spin.position.y=.84;g.add(spin);
 /* 반짝이 */const N=40,pa=new Float32Array(N*3),ph=new Float32Array(N);for(let i=0;i<N;i++){ph[i]=Math.random()*6.28}const gg=new T.BufferGeometry();gg.setAttribute('position',new T.BufferAttribute(pa,3));const pts=new T.Points(gg,new T.PointsMaterial({color:0xffe9a8,size:.07,transparent:true,opacity:.9,depthWrite:false}));pts.frustumCulled=false;g.add(pts);
 getModel(A.m).then(s=>{if(!s)return;const o=s.clone(true);o.updateMatrixWorld(true);const b=new T.Box3().setFromObject(o),zz=b.getSize(new T.Vector3());const k=Math.min(1.25/zz.y,1.05/Math.max(zz.x,zz.z));o.scale.setScalar(k);o.position.set(-(b.min.x+b.max.x)/2*k,-b.min.y*k,-(b.min.z+b.max.z)/2*k);o.traverse(e=>{if(e.isMesh){e.castShadow=true}});spin.add(o);g.userData.h=zz.y*k}).catch(()=>{});
 try{const SOL=H.SITEB&&H.SITEB.solids;if(SOL)SOL.push({cx:x,cz:z,r:.9,y0:y-1,y1:y+3})}catch(e){}
 let t=0,last=performance.now();const loop=()=>{const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;spin.rotation.y+=dt*.5;glow.material.opacity=.22+.08*Math.sin(t*2);const h=(g.userData.h||1);for(let i=0;i<N;i++){const a=ph[i]+t*.6,r=.55+.2*Math.sin(ph[i]*3+t);pa[i*3]=Math.cos(a)*r;pa[i*3+1]=.9+((ph[i]*1.7+t*.35)%1)*h*1.1;pa[i*3+2]=Math.sin(a)*r}gg.attributes.position.needsUpdate=true;requestAnimationFrame(loop)};requestAnimationFrame(loop);
 window.__TREASURE=window.__TREASURE||{};window.__TREASURE[job.k]=[x,z]}
