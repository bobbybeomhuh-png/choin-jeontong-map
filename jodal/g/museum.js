/* 무이 나라 조달청: 「보물 곳간 전시관」. 만든 날 2026-11-16
   걸어 들어가는 3D 전시관. 단청 기둥과 기와 처마 아래 진열장 다섯에 되살린 국보(실제 3D 모델)가 놓이고,
   의궤 솜씨 별에 따라 받침 색이 다르다(별 셋 금, 둘 은, 하나 구리, 아직이면 빈 진열장과 「복원 중」 팻말).
   W A S D 로 걷고 마우스로 끌어 둘러본다. 진열장 앞에 서면 설명 판(고을, 맡은 이, 품삯, 솜씨, 출처)이 뜬다.
   jodal.js 의 HUD 「보물 곳간」 단추로 연다. openMuseum(ctx,{JOBS,ST,CARDS}) */
import * as THREE from 'three';
import {setupPost} from './post.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {overlay,title,blip,softOut} from './sites/minigames.js';
import {ART} from './sites/restore3d.js';
import {getModel} from './sites/hanokkit.js';
export function openMuseum(ctx,E){const ui=overlay('#120c08');let alive=true;ui.c.style.display='none';const ac=ctx.ac(),out=softOut(ctx);
 const R=new THREE.WebGLRenderer({antialias:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=THREE.SRGBColorSpace;R.toneMapping=THREE.ACESFilmicToneMapping;R.shadowMap.enabled=true;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new THREE.Scene();try{setupPost(R,sc)}catch(e){console.warn('후처리',e)}sc.background=new THREE.Color(0x1a120b);try{const pm=new THREE.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 sc.add(new THREE.HemisphereLight(0xfff0d8,0x2a1a10,.7));
 const cam=new THREE.PerspectiveCamera(60,1,.05,80);const me={x:0,z:9.5,yaw:0,pitch:-.05};const keys={};
 title(ui.top,'보물 곳간','되살린 국보를 모아 둔 나라 전시관 · W A S D 걷기, 마우스로 끌어 둘러보기');
 /* 바닥·벽·기둥·천장(단청 들보) */
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.8},o));
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(16,24),M(0x6a4a2c,{roughness:.55}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;sc.add(floor);
 /* 마루 결 */{const c=document.createElement('canvas');c.width=512;c.height=512;const q=c.getContext('2d');q.fillStyle='#6a4a2c';q.fillRect(0,0,512,512);for(let i=0;i<16;i++){q.fillStyle=i%2?'#62432a':'#70502f';q.fillRect(0,i*32,512,31);q.strokeStyle='rgba(30,18,8,.4)';q.beginPath();q.moveTo(0,i*32);q.lineTo(512,i*32);q.stroke()}const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(2,3);t.colorSpace=THREE.SRGBColorSpace;floor.material.map=t;floor.material.color.set(0xffffff)}
 const wallM=M(0xe8dcc4,{roughness:.95});for(const[x,z,w,r]of[[-8,0,24,Math.PI/2],[8,0,24,-Math.PI/2],[0,-12,16,0]]){const w0=new THREE.Mesh(new THREE.PlaneGeometry(w,6),wallM);w0.position.set(x,3,z);w0.rotation.y=r;sc.add(w0)}
 const pillar=M(0x8e2b20,{roughness:.6});for(const x of[-6.5,6.5])for(let z=-10;z<=10;z+=4){const p=new THREE.Mesh(new THREE.CylinderGeometry(.28,.32,6,14),pillar);p.position.set(x,3,z);p.castShadow=true;sc.add(p)}
 /* 단청 들보: 초록 바탕에 띠 */{const c=document.createElement('canvas');c.width=512;c.height=64;const q=c.getContext('2d');q.fillStyle='#2f6a4a';q.fillRect(0,0,512,64);const cols=['#b8322a','#d8a838','#2a4a9a','#f2f2e8'];for(let i=0;i<16;i++){q.fillStyle=cols[i%4];q.fillRect(i*32+4,16,24,32)}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;for(const x of[-6.5,6.5]){const b=new THREE.Mesh(new THREE.BoxGeometry(.4,.5,24),new THREE.MeshStandardMaterial({map:t}));b.position.set(x,5.9,0);sc.add(b)}}
 const ceil=new THREE.Mesh(new THREE.PlaneGeometry(16,24),M(0x4a3020));ceil.rotation.x=Math.PI/2;ceil.position.y=6.1;sc.add(ceil);
 /* 현판 */{const c=document.createElement('canvas');c.width=512;c.height=160;const q=c.getContext('2d');q.fillStyle='#2a1a10';q.fillRect(0,0,512,160);q.strokeStyle='#d8a838';q.lineWidth=10;q.strokeRect(6,6,500,148);q.fillStyle='#f2d27a';q.font='bold 92px serif';q.textAlign='center';q.fillText('寶物庫',256,118);const s=new THREE.Mesh(new THREE.PlaneGeometry(3.2,1),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c)}));s.position.set(0,4.6,-11.95);sc.add(s)}
 /* 진열장 다섯: 받침(별 색) + 유리 + 조명 + 실제 국보 */
 const STAR=[0x5a5048,0xb0703a,0xc8ccd4,0xe8b840];const cases=[];const glassM=new THREE.MeshPhysicalMaterial({color:0xffffff,transparent:true,opacity:.12,roughness:0,metalness:0,transmission:0,side:THREE.DoubleSide,depthWrite:false});
 const slots=[[-4,-6],[4,-6],[-4,1],[4,1],[0,-9.5]];
 E.JOBS.forEach((j,i)=>{const [x,z]=slots[i];const d=E.ST.done[j.k];const st=d?d.stars:0;const g=new THREE.Group();g.position.set(x,0,z);sc.add(g);
  const base=new THREE.Mesh(new THREE.CylinderGeometry(.95,1.05,1,32),M(STAR[st],{metalness:st?.85:.1,roughness:st?.3:.8}));base.position.y=.5;base.castShadow=base.receiveShadow=true;g.add(base);
  const glass=new THREE.Mesh(new THREE.CylinderGeometry(.92,.92,1.8,32,1,true),glassM);glass.position.y=1.9;g.add(glass);const lid=new THREE.Mesh(new THREE.CylinderGeometry(.95,.95,.06,32),M(0x3a2a1a));lid.position.y=2.83;g.add(lid);
  const sp=new THREE.SpotLight(0xfff0d0,d?40:8,6,.55,.6,1.5);sp.position.set(x,5.6,z+.3);sp.target.position.set(x,1.2,z);sp.castShadow=true;sc.add(sp,sp.target);
  /* 팻말 */const c=document.createElement('canvas');c.width=512;c.height=256;const q=c.getContext('2d');q.fillStyle='#f6ecd0';q.fillRect(0,0,512,256);q.strokeStyle='#8e2b20';q.lineWidth=8;q.strokeRect(4,4,504,248);q.fillStyle='#8e2b20';q.font='bold 52px sans-serif';q.textAlign='center';q.fillText(j.n,256,78);q.fillStyle='#3b2a1c';q.font='34px sans-serif';q.fillText(d?`${j.city} · ${'★'.repeat(st)}${'☆'.repeat(3-st)}`:`${j.city} · 복원 중`,256,140);q.font='28px sans-serif';q.fillText(d?`맡은 이 ${d.who} · 품삯 ${d.cost}냥`:'방을 붙여 장인을 구해요',256,200);
  const pl=new THREE.Mesh(new THREE.PlaneGeometry(1.4,.7),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c)}));pl.position.set(0,.75,1.07);pl.rotation.x=-.25;g.add(pl);
  const A=ART.find(a=>a.k===j.k);if(d&&A)getModel(A.m).then(s=>{if(!alive)return;const m=s.clone(true);const bb=new THREE.Box3().setFromObject(m),sz=bb.getSize(new THREE.Vector3());const k=1.4/Math.max(sz.x,sz.y,sz.z);m.scale.setScalar(k);const b2=new THREE.Box3().setFromObject(m),c2=b2.getCenter(new THREE.Vector3());m.position.set(-c2.x,1.02-b2.min.y,-c2.z);const holder=new THREE.Group();holder.add(m);g.add(holder);cases[i].art=holder}).catch(()=>{});
  cases.push({g,j,d,x,z,art:null})});
 /* 조달 도감 벽(모은 카드) */if(E.CARDS){const ks=Object.keys(E.CARDS);const c=document.createElement('canvas');c.width=1024;c.height=512;const q=c.getContext('2d');q.fillStyle='#2a1a10';q.fillRect(0,0,1024,512);q.fillStyle='#f2d27a';q.font='bold 46px sans-serif';q.textAlign='center';q.fillText(`조달 도감 ${ks.filter(k=>(E.ST.cards||{})[k]).length} / ${ks.length}`,512,64);ks.forEach((k,i)=>{const on=(E.ST.cards||{})[k];const x=40+(i%3)*325,y=100+Math.floor(i/3)*130;q.fillStyle=on?'#3b2a1c':'#4a3a30';q.fillRect(x,y,300,110);q.strokeStyle=on?'#d8a838':'#6a5a4a';q.lineWidth=4;q.strokeRect(x,y,300,110);q.fillStyle=on?'#f2d27a':'#8a7a6a';q.font='bold 34px sans-serif';q.fillText(E.CARDS[k].n,x+150,y+68)});const w=new THREE.Mesh(new THREE.PlaneGeometry(6,3),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c)}));w.position.set(-7.95,2.6,5);w.rotation.y=Math.PI/2;sc.add(w)}
 /* 설명 판(가까운 진열장) */const info=document.createElement('div');info.style.cssText='position:absolute;right:16px;bottom:16px;z-index:3;width:min(380px,92vw);background:rgba(243,234,214,.96);border:2px solid #d8a838;border-radius:14px;padding:12px 14px;font:14.5px/1.6 "Gowun Dodum",sans-serif;color:#2b1d12;display:none';ui.o.append(info);
 /* 조작 */addEventListener('keydown',kd);addEventListener('keyup',ku);function kd(e){keys[e.code]=true}function ku(e){keys[e.code]=false}
 let drag=null;R.domElement.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY,yaw:me.yaw,pitch:me.pitch};R.domElement.setPointerCapture(e.pointerId)});R.domElement.addEventListener('pointermove',e=>{if(!drag)return;me.yaw=drag.yaw-(e.clientX-drag.x)*.005;me.pitch=Math.max(-.6,Math.min(.5,drag.pitch-(e.clientY-drag.y)*.004))});R.domElement.addEventListener('pointerup',()=>drag=null);
 let last=performance.now(),near=-1,stepT=0;
 const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  const f=(keys.KeyW||keys.ArrowUp?1:0)-(keys.KeyS||keys.ArrowDown?1:0),s=(keys.KeyD||keys.ArrowRight?1:0)-(keys.KeyA||keys.ArrowLeft?1:0);const sp=3.2*dt;let nx=me.x+(-Math.sin(me.yaw)*f+Math.cos(me.yaw)*s)*sp,nz=me.z+(-Math.cos(me.yaw)*f-Math.sin(me.yaw)*s)*sp;
  nx=Math.max(-7.3,Math.min(7.3,nx));nz=Math.max(-11.3,Math.min(11.3,nz));for(const c of cases){const dx=nx-c.x,dz=nz-c.z,d=Math.hypot(dx,dz);if(d<1.4){nx=c.x+dx/d*1.4;nz=c.z+dz/d*1.4}}if(f||s){stepT+=dt;if(stepT>.42){stepT=0;blip(ac,out,160,120,.06,.05,'triangle')}}me.x=nx;me.z=nz;
  cam.position.set(me.x,1.65,me.z);cam.rotation.set(me.pitch,me.yaw,0,'YXZ');
  for(const c of cases)if(c.art)c.art.rotation.y+=dt*.35;
  let bi=-1,bd=3.2;cases.forEach((c,i)=>{const d=Math.hypot(me.x-c.x,me.z-c.z);if(d<bd){bd=d;bi=i}});if(bi!==near){near=bi;if(bi<0)info.style.display='none';else{const c=cases[bi],A=ART.find(a=>a.k===c.j.k);info.style.display='block';info.innerHTML=`<b style="font:20px 'Do Hyeon',sans-serif;color:#8e2b20">${c.j.n}</b> <span style="color:#c98a12">${c.d?'★'.repeat(c.d.stars)+'☆'.repeat(3-c.d.stars):''}</span><br>${c.d?`${c.j.city} 의궤 · 맡은 이 ${c.d.who} · 품삯 ${c.d.cost}냥<br>`:`<b>아직 복원 중이에요.</b> ${c.j.city}에 방을 붙여 장인을 구해요.<br>`}<small style="color:#5a3a12">${A?A.d:''}</small>`;blip(ac,out,660,880,.1,.06,'triangle')}}
  R.render(sc,cam);requestAnimationFrame(loop)};loop();
 const close=()=>{if(!alive)return;alive=false;removeEventListener('keydown',kd);removeEventListener('keyup',ku);try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 window.__MUS={close,me,cases:()=>cases.map(c=>({k:c.j.k,x:c.x,z:c.z,art:!!c.art}))};return{close}}
