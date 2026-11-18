/* 무이 나라 조달청: 「검수 3D」(N13). 만든 날 2026-11-18
   검수 조서의 사진 두 장 대신 실제 국보 3D 둘을 나란히 띄운다. 왼쪽은 요청서 규격 견본, 오른쪽은 장인이 되살려 온 것.
   마우스로 끌면 두 국보가 함께 돌아가고, 그냥 두면 천천히 돈다. 다른 곳(di): 0=빛깔이 바램, 1=금(검은 금이 감), 2=크기가 작음, -1=없음.
   inspect3D(host, key, di) → {ok}. 3D가 안 되면 ok:false(사진 그대로) */
import * as THREE from 'three';
import {ART} from './sites/restore3d.js';
import {getModel} from './sites/hanokkit.js';
export function inspect3D(host,key,di){const A=ART.find(a=>a.k===key);if(!A)return{ok:false};let R;try{R=new THREE.WebGLRenderer({antialias:true,alpha:true})}catch(e){return{ok:false}}
 R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=THREE.SRGBColorSpace;R.toneMapping=THREE.ACESFilmicToneMapping;R.setScissorTest(true);R.domElement.style.cssText='display:block;width:100%;height:100%;cursor:grab;touch-action:none';host.append(R.domElement);
 const mk=()=>{const sc=new THREE.Scene();sc.add(new THREE.HemisphereLight(0xfff4e0,0x3a2a1a,1.5));const d=new THREE.DirectionalLight(0xffffff,2.3);d.position.set(2,4,3);sc.add(d);const f=new THREE.DirectionalLight(0xffd8a0,.7);f.position.set(-3,1.5,-2);sc.add(f);const ped=new THREE.Mesh(new THREE.CylinderGeometry(.95,1.05,.12,40),new THREE.MeshStandardMaterial({color:0x5a3a22,roughness:.6}));ped.position.y=-.06;sc.add(ped);return sc};
 const L=mk(),Rt=mk();const cam=new THREE.PerspectiveCamera(32,1,.05,40);let yaw=.4,pitch=.28,auto=true;const tgt=new THREE.Vector3(0,.7,0);let dist=4;
 const lab=(sc,txt)=>{};let models=[];
 getModel(A.m).then(s=>{if(!s||!host.isConnected)return;for(const[sc,side]of[[L,0],[Rt,1]]){const o=s.clone(true);o.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o),z=b.getSize(new THREE.Vector3());let k=Math.min(1.5/z.y,1.6/Math.max(z.x,z.z));if(side&&di===2)k*=.76;o.scale.setScalar(k);o.position.set(-(b.min.x+b.max.x)/2*k,-b.min.y*k,-(b.min.z+b.max.z)/2*k);o.updateMatrixWorld(true);
   if(side&&di===0)o.traverse(e=>{if(e.isMesh&&e.material){e.material=e.material.clone();if(e.material.color){const c=e.material.color;const g=(c.r+c.g+c.b)/3;c.setRGB(g*.92+.08,g*.8+.06,g*.62)}if(e.material.map)e.material.color&&e.material.color.multiplyScalar(.92);e.material.roughness=Math.min(1,(e.material.roughness||.5)+.35)}});
   const grp=new THREE.Group();grp.add(o);sc.add(grp);models.push(grp);
   if(side&&di===1){/* 검은 금: 앞쪽 겉면을 따라 꺾인 선 두 줄 */const h=z.y*k,wd=Math.max(z.x,z.z)*k;const rc=new THREE.Raycaster();const pts=[];for(const[x0,y0,dx,dy,n]of[[-.12,.75,.06,-.09,6],[.1,.6,-.05,-.08,5]]){const line=[];let x=x0*wd,y=y0*h;for(let i=0;i<n;i++){rc.set(new THREE.Vector3(x,y,5),new THREE.Vector3(0,0,-1));const hit=rc.intersectObject(o,true)[0];if(hit)line.push(hit.point.clone().add(new THREE.Vector3(0,0,.01)));x+=dx*wd*(i%2?1:-.6);y+=dy*h}if(line.length>1)pts.push(line)}for(const line of pts){const g=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(line),line.length*6,.012*Math.max(1,h),5,false);const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:0x140c08}));grp.add(m)}}
   const h=z.y*k;tgt.set(0,Math.max(.5,h*.5),0);dist=Math.max(3.3,h*2.7+1.1)}}).catch(()=>{});
 let drag=null;R.domElement.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY,yaw,pitch};auto=false;R.domElement.style.cursor='grabbing';try{R.domElement.setPointerCapture(e.pointerId)}catch(x){}});
 R.domElement.addEventListener('pointermove',e=>{if(!drag)return;yaw=drag.yaw-(e.clientX-drag.x)*.01;pitch=Math.max(-.2,Math.min(1.1,drag.pitch+(e.clientY-drag.y)*.006))});
 const up=()=>{drag=null;R.domElement.style.cursor='grab'};R.domElement.addEventListener('pointerup',up);R.domElement.addEventListener('pointerleave',up);
 let last=performance.now(),gone=0;const loop=()=>{if(!host.isConnected){if(++gone>90){try{R.dispose();R.forceContextLoss&&R.forceContextLoss()}catch(e){}return}requestAnimationFrame(loop);return}gone=0;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;if(auto)yaw+=dt*.45;
  const W=host.clientWidth||380,H=host.clientHeight||150;if(R.domElement.width!==Math.round(W*R.getPixelRatio()))R.setSize(W,H,false);const hw=Math.floor(W/2);cam.aspect=hw/H;cam.updateProjectionMatrix();cam.position.set(tgt.x+Math.sin(yaw)*Math.cos(pitch)*dist,tgt.y+Math.sin(pitch)*dist,tgt.z+Math.cos(yaw)*Math.cos(pitch)*dist);cam.lookAt(tgt);
  R.setViewport(0,0,hw,H);R.setScissor(0,0,hw,H);R.render(L,cam);R.setViewport(hw,0,W-hw,H);R.setScissor(hw,0,W-hw,H);R.render(Rt,cam);requestAnimationFrame(loop)};requestAnimationFrame(loop);
 window.__INSP3D={n:()=>models.length};return{ok:true}}
