/* 무이 나라 조달청: 「견본 감정」(돋보기). 만든 날 2026-11-16
   장인 고르기에서 견본을 3D로 돌려 보며 흠을 찾는다. 견본은 실제 국보 3D 모델.
   흠 있는 견본(bad): 표면에 금 간 줄 둘과 땜질 덩이 하나가 숨어 있음 → 눌러서 찾기. 흠 없는 견본(good): 「흠 없음 확인」.
   결과 {found, total, clean} 를 onDone 으로 돌려준다. 시험용 window.__SMP={dbg, findAll}
   inspectSample(ctx,{k,q,name,onDone}) */
import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {overlay,title,blip,softOut} from './sites/minigames.js';
import {ART} from './sites/restore3d.js';
import {getModel} from './sites/hanokkit.js';
export function inspectSample(ctx,opt){const ui=overlay('radial-gradient(circle at 50% 40%,#3e2e20,#0e0906)');let alive=true;ui.c.style.display='none';const ac=ctx.ac(),out=softOut(ctx);
 const R=new THREE.WebGLRenderer({antialias:true,alpha:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=THREE.SRGBColorSpace;R.toneMapping=THREE.ACESFilmicToneMapping;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new THREE.Scene();try{const pm=new THREE.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}sc.add(new THREE.HemisphereLight(0xfff4e0,0x3a2a1a,1.4));const dl=new THREE.DirectionalLight(0xffffff,2);dl.position.set(2,4,3);sc.add(dl);
 const cam=new THREE.PerspectiveCamera(36,1,.02,40);let yaw=.4,pitch=.25,dist=3;const tgt=new THREE.Vector3(0,.7,0);
 const bad=opt.q==='bad';title(ui.top,`${opt.name}의 견본 감정`,bad||opt.q==='good'?'끌어서 돌려 보고, 흠(금 간 줄·땜질 자국)이 보이면 눌러요':'견본이 없어요');
 const bar=document.createElement('div');bar.style.cssText='position:absolute;left:50%;bottom:22px;transform:translateX(-50%);z-index:3;display:flex;gap:8px;align-items:center';ui.o.append(bar);
 const chip=document.createElement('div');chip.style.cssText='padding:7px 14px;border-radius:12px;background:rgba(20,14,8,.85);border:2px solid #d8a838;color:#f2d27a;font:16px "Do Hyeon",sans-serif';bar.append(chip);
 const okB=document.createElement('button');okB.type='button';okB.textContent='흠 없음 확인';okB.style.cssText='font:16px "Do Hyeon",sans-serif;padding:8px 16px;border-radius:12px;border:0;background:#2f6a4a;color:#fff;cursor:pointer';bar.append(okB);
 const doneB=document.createElement('button');doneB.type='button';doneB.textContent='감정 마치기';doneB.style.cssText='font:16px "Do Hyeon",sans-serif;padding:8px 16px;border-radius:12px;border:0;background:#8e2b20;color:#fff4dc;cursor:pointer';bar.append(doneB);
 const flaws=[];let found=0,model=null;const meshes=[];
 const upd=()=>{chip.textContent=bad?`찾은 흠 ${found} / 3`:'흠을 찾아보세요'};upd();
 const A=ART.find(a=>a.k===opt.k);
 if(A)getModel(A.m).then(s=>{if(!alive)return;model=s.clone(true);const bb=new THREE.Box3().setFromObject(model),sz=bb.getSize(new THREE.Vector3());const k=1.5/Math.max(sz.x,sz.y,sz.z);model.scale.setScalar(k);const b2=new THREE.Box3().setFromObject(model),c2=b2.getCenter(new THREE.Vector3());model.position.set(-c2.x,-b2.min.y,-c2.z);sc.add(model);model.updateMatrixWorld(true);model.traverse(o=>{if(o.isMesh)meshes.push(o)});
  const b3=new THREE.Box3().setFromObject(model);tgt.set(0,(b3.max.y)/2,0);
  if(bad){/* 겉면 점 셋을 쏴서 찾고 금·땜질을 붙임 */const rc=new THREE.Raycaster();const pts=[];for(let n=0;n<40&&pts.length<3;n++){const a=Math.random()*Math.PI*2,y=b3.min.y+(b3.max.y-b3.min.y)*(.25+Math.random()*.55);const o=new THREE.Vector3(Math.cos(a)*4,y,Math.sin(a)*4);rc.set(o,new THREE.Vector3(-Math.cos(a),0,-Math.sin(a)));const h=rc.intersectObjects(meshes,false)[0];if(h&&pts.every(p=>p.point.distanceTo(h.point)>.25))pts.push(h)}
   pts.forEach((h,i)=>{const n=h.face?h.face.normal.clone().transformDirection(h.object.matrixWorld):new THREE.Vector3(0,0,1);let m;if(i<2){const pts2=[];const t=new THREE.Vector3().crossVectors(n,new THREE.Vector3(0,1,0)).normalize();for(let s=-4;s<=4;s++)pts2.push(h.point.clone().addScaledVector(t,s*.025).addScaledVector(new THREE.Vector3(0,1,0),Math.sin(s*1.3)*.02).addScaledVector(n,.004));m=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts2),24,.006,5,false),new THREE.MeshBasicMaterial({color:0x140c06}))}else{m=new THREE.Mesh(new THREE.SphereGeometry(.05,8,6),new THREE.MeshStandardMaterial({color:0x6a6460,metalness:.6,roughness:.7}));m.scale.set(1,.7,.5);m.position.copy(h.point).addScaledVector(n,.01)}
    m.userData.flaw=1;const hit=new THREE.Mesh(new THREE.SphereGeometry(.09,8,6),new THREE.MeshBasicMaterial({visible:false}));hit.position.copy(h.point);hit.userData.flaw=m;sc.add(m,hit);flaws.push({m,hit,p:h.point.clone(),got:0})})}
  dist=Math.max(2.2,(b3.max.y-b3.min.y)*2.4)}).catch(()=>{});
 /* 포인터: 끌면 돌림, 누르면 흠 찾기 */const ray=new THREE.Raycaster(),mv=new THREE.Vector2();let drag=null,moved=0;
 R.domElement.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY,yaw,pitch};moved=0;R.domElement.setPointerCapture(e.pointerId)});
 R.domElement.addEventListener('pointermove',e=>{if(!drag)return;moved+=Math.abs(e.movementX)+Math.abs(e.movementY);yaw=drag.yaw-(e.clientX-drag.x)*.008;pitch=Math.max(-.4,Math.min(1.2,drag.pitch+(e.clientY-drag.y)*.006))});
 R.domElement.addEventListener('pointerup',e=>{const d=drag;drag=null;if(!d||moved>8)return;const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,cam);const h=ray.intersectObjects(flaws.filter(f=>!f.got).map(f=>f.hit),false)[0];
  if(h){const f=flaws.find(f=>f.hit===h.object);f.got=1;found++;const ring=new THREE.Mesh(new THREE.TorusGeometry(.11,.012,8,24),new THREE.MeshBasicMaterial({color:0xff4a3a,depthTest:false}));ring.position.copy(f.p);ring.lookAt(cam.position);ring.renderOrder=9;sc.add(ring);blip(ac,out,880,1320,.15,.12,'triangle');upd();if(found===3)chip.textContent='흠 셋을 다 찾았어요! 이 장인은 피하는 게 좋겠어요'}else blip(ac,out,200,160,.08,.06,'square')});
 const finish=(clean)=>{close();opt.onDone&&opt.onDone({found,total:bad?3:0,clean})};
 okB.onclick=()=>{if(bad){chip.textContent='잘 보세요. 금 간 줄이나 땜질 자국이 숨어 있어요';blip(ac,out,220,160,.12,.08,'square');return}finish(true)};doneB.onclick=()=>finish(false);ui.x.onclick=()=>finish(false);
 let last=performance.now();const loop=()=>{if(!alive)return;const now=performance.now();last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  cam.position.set(tgt.x+Math.sin(yaw)*Math.cos(pitch)*dist,tgt.y+Math.sin(pitch)*dist,tgt.z+Math.cos(yaw)*Math.cos(pitch)*dist);cam.lookAt(tgt);R.render(sc,cam);requestAnimationFrame(loop)};loop();
 const close=()=>{if(!alive)return;alive=false;window.__SMP=null;try{R.dispose()}catch(e){}ui.o.remove()};
 window.__SMP={dbg:()=>({loaded:!!model,flaws:flaws.length,found}),findAll:()=>{for(const f of flaws)if(!f.got){f.got=1;found++}upd()},done:()=>doneB.click(),ok:()=>okB.click()};return{close}}
