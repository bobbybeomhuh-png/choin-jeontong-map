/* 무이 나라 조달청: 「입찰함 3D 개찰」(N3). 만든 날 2026-11-18
   개찰 창 위에 작은 3D 탁자를 띄운다. 입찰함 뚜껑이 열리고 봉투가 하나씩 솟아 부채꼴로 선다.
   봉투를 누르면 붉은 봉인 끈이 툭 끊어져 날아가고, 봉투가 앞으로 눕고 값 쪽지가 떠오른다(이름·값).
   열기 규칙(누르면 열림, 3.5초 뒤 저절로, 다 열면 결과표)은 jodal.js 의 개찰 코드가 그대로 맡고,
   여기는 보이는 것과 누르는 것만 한다. bid3D(host, list, {pick:k=>...}) → {open(k), ok}  */
import * as THREE from 'three';
const CV=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t};
export function bid3D(host,list,o={}){let R;try{R=new THREE.WebGLRenderer({antialias:true,alpha:true})}catch(e){return{ok:false,open(){}}}
 R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=THREE.SRGBColorSpace;R.toneMapping=THREE.ACESFilmicToneMapping;R.shadowMap.enabled=true;
 R.domElement.style.cssText='display:block;width:100%;height:100%;cursor:pointer;border-radius:8px';host.append(R.domElement);
 const sc=new THREE.Scene();const cam=new THREE.PerspectiveCamera(34,2,.05,40);cam.position.set(0,2.15,3.7);cam.lookAt(0,.62,0);
 sc.add(new THREE.HemisphereLight(0xfff2dc,0x3a2614,1.25));const sun=new THREE.DirectionalLight(0xfff0d6,2.1);sun.position.set(2.2,4,2.6);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-3,right:3,top:3,bottom:-3});sc.add(sun);
 const M=(c,x={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.75},x));
 /* 탁자: 결 있는 나무, 붉은 비단 깔개 */
 const wood=CV(512,256,(q,w,h)=>{q.fillStyle='#6a4426';q.fillRect(0,0,w,h);for(let k=0;k<70;k++){q.strokeStyle=`rgba(${40+Math.random()*30},${22+Math.random()*16},10,${.15+Math.random()*.2})`;q.lineWidth=1+Math.random()*2;q.beginPath();const y=Math.random()*h;q.moveTo(0,y);q.bezierCurveTo(w*.3,y+Math.random()*10-5,w*.7,y+Math.random()*10-5,w,y+Math.random()*8-4);q.stroke()}});
 const top=new THREE.Mesh(new THREE.BoxGeometry(5.2,.14,2.4),new THREE.MeshStandardMaterial({map:wood,roughness:.55}));top.position.y=-.07;top.receiveShadow=true;sc.add(top);
 const silk=new THREE.Mesh(new THREE.PlaneGeometry(3.6,1.5),M(0x8e2b20,{roughness:.9}));silk.rotation.x=-Math.PI/2;silk.position.set(0,.002,.1);silk.receiveShadow=true;sc.add(silk);
 for(const sx of[-1,1]){const tr=new THREE.Mesh(new THREE.PlaneGeometry(3.6,.08),M(0xd8a838,{metalness:.5,roughness:.4}));tr.rotation.x=-Math.PI/2;tr.position.set(0,.004,.1+sx*.68);sc.add(tr)}
 /* 입찰함: 검은 옻칠 상자, 금빛 장식, 「入札函」 */
 const box=new THREE.Group();box.position.set(0,0,-.55);sc.add(box);const lac=M(0x1c1410,{roughness:.3,metalness:.1}),brass=M(0xc8a040,{metalness:.75,roughness:.3});
 const body=new THREE.Mesh(new THREE.BoxGeometry(1.5,.55,.8),lac);body.position.y=.275;body.castShadow=true;box.add(body);
 for(const[x,z,w,d]of[[0,.401,1.52,.04],[0,-.401,1.52,.04],[.751,0,.04,.82],[-.751,0,.04,.82]]){const r=new THREE.Mesh(new THREE.BoxGeometry(w,.06,d),brass);r.position.set(x,.03,z);box.add(r);const r2=r.clone();r2.position.y=.53;box.add(r2)}
 const lbl=new THREE.Mesh(new THREE.PlaneGeometry(.62,.24),new THREE.MeshStandardMaterial({map:CV(256,96,(q,w,h)=>{q.fillStyle='#f2e6c8';q.fillRect(0,0,w,h);q.strokeStyle='#8e2b20';q.lineWidth=6;q.strokeRect(4,4,w-8,h-8);q.fillStyle='#1c1410';q.font='bold 58px serif';q.textAlign='center';q.textBaseline='middle';q.fillText('入札函',w/2,h/2+3)}),roughness:.8}));lbl.position.set(0,.28,.402);box.add(lbl);
 const lidP=new THREE.Group();lidP.position.set(0,.55,-.4);box.add(lidP);const lid=new THREE.Mesh(new THREE.BoxGeometry(1.56,.08,.84),lac);lid.position.set(0,.04,.42);lid.castShadow=true;lidP.add(lid);const knob=new THREE.Mesh(new THREE.SphereGeometry(.05,12,8),brass);knob.position.set(0,.1,.42);lidP.add(knob);
 /* 봉투들 */
 const N=list.length,envs=[];const paper=M(0xefe0bc,{roughness:.9});
 list.forEach((x,k)=>{const g=new THREE.Group();const ang=(k-(N-1)/2)*Math.min(.32,1.4/Math.max(1,N-1));const fx=Math.sin(ang)*1.6,fz=-.25+(1-Math.cos(ang))*.9;
  const env=new THREE.Mesh(new THREE.BoxGeometry(.5,.66,.03),paper);env.castShadow=true;g.add(env);
  const flap=new THREE.Mesh(new THREE.ConeGeometry(.33,.2,3),M(0xd8c49a,{roughness:.9}));flap.rotation.set(Math.PI/2,0,Math.PI);flap.scale.set(1,1,.08);flap.position.set(0,.22,.018);g.add(flap);
  const seal=new THREE.Mesh(new THREE.CylinderGeometry(.075,.08,.03,20),M(0xa82218,{roughness:.35}));seal.rotation.x=Math.PI/2;seal.position.set(0,.12,.03);g.add(seal);
  const cordM=M(0xb8322a,{roughness:.7});const cords=[-1,1].map(s=>{const c=new THREE.Mesh(new THREE.BoxGeometry(.26,.018,.012),cordM);c.position.set(s*.13,.12,.025);g.add(c);return c});
  const num=new THREE.Mesh(new THREE.PlaneGeometry(.3,.12),new THREE.MeshBasicMaterial({map:CV(128,52,(q,w,h)=>{q.fillStyle='#efe0bc';q.fillRect(0,0,w,h);q.fillStyle='#6b4a26';q.font='bold 30px "Do Hyeon",sans-serif';q.textAlign='center';q.textBaseline='middle';q.fillText(`${k+1}번`,w/2,h/2+2)})}));num.position.set(0,-.18,.017);g.add(num);
  const card=new THREE.Mesh(new THREE.PlaneGeometry(.62,.42),new THREE.MeshBasicMaterial({map:CV(300,200,(q,w,h)=>{q.fillStyle='#fbf6ea';q.fillRect(0,0,w,h);q.strokeStyle='#8a6a3a';q.lineWidth=5;q.strokeRect(4,4,w-8,h-8);q.fillStyle='#8e2b20';q.font='bold 64px "Do Hyeon",sans-serif';q.textAlign='center';q.fillText(`${x.cost}냥`,w/2,96);q.fillStyle='#3b2a1c';q.font='26px "Gowun Dodum",sans-serif';const nm=String(x.name||'');q.fillText(nm.length>11?nm.slice(0,11)+'…':nm,w/2,150)}),transparent:true,opacity:0,side:THREE.DoubleSide}));card.position.set(0,.2,.05);card.visible=false;g.add(card);
  g.position.set(fx*.0,.1,-.55);g.rotation.y=-ang*.6;g.scale.setScalar(.01);sc.add(g);
  envs.push({k,g,env,cords,seal,card,flap,fx,fz,ang,t0:.35+k*.18,open:0,ot:0,bits:[]});env.userData.k=k;flap.userData.k=k;seal.userData.k=k});
 /* 고르기 */
 const rc=new THREE.Raycaster(),mv=new THREE.Vector2();const pickAt=e=>{const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);rc.setFromCamera(mv,cam);const hits=rc.intersectObjects(envs.flatMap(v=>[v.env,v.flap,v.seal]),false);return hits.length?hits[0].object.userData.k:null};
 R.domElement.addEventListener('pointerdown',e=>{e.stopPropagation();const k=pickAt(e);if(k!=null&&o.pick)o.pick(k)});
 R.domElement.addEventListener('pointermove',e=>{const k=pickAt(e);envs.forEach(v=>v.hover=v.k===k&&!v.open)});
 R.domElement.addEventListener('click',e=>e.stopPropagation());
 /* 열기: 끈이 두 동강 나 날아가고, 봉투가 앞으로 눕고, 값 쪽지가 떠오름 */
 const open=k=>{const v=envs[k];if(!v||v.open)return;v.open=1;v.ot=0;v.cords.forEach((c,i)=>{v.bits.push({m:c,vx:(i?1:-1)*(.9+Math.random()*.5),vy:1.2+Math.random()*.6,vr:(Math.random()-.5)*14})});v.seal.material=v.seal.material.clone();v.card.visible=true};
 let t=0,last=performance.now(),alive=true;const size=()=>{const w=host.clientWidth||600,h=host.clientHeight||240;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()};size();
 const loop=()=>{if(!alive)return;if(!host.isConnected){alive=false;try{R.dispose();R.forceContextLoss&&R.forceContextLoss()}catch(e){}return}const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;
  if(R.domElement.width!==Math.round((host.clientWidth||600)*R.getPixelRatio()))size();
  lidP.rotation.x=-Math.min(1,t/.35)*1.9;
  for(const v of envs){const a=Math.max(0,Math.min(1,(t-v.t0)/.45)),e=1-Math.pow(1-a,3);v.g.scale.setScalar(.01+.99*e);v.g.position.set(v.fx*e,.1+e*.42+Math.sin(e*Math.PI)*.25,-.55+(v.fz+.95)*e);
   if(v.open){v.ot+=dt;const b=Math.min(1,v.ot/.45),eb=1-Math.pow(1-b,3);v.env.rotation.x=-eb*1.15;v.flap.rotation.x=Math.PI/2-eb*1.15;v.env.position.y=-eb*.12;v.flap.position.y=.22-eb*.2;v.flap.position.z=.018+eb*.2;v.seal.scale.setScalar(1-eb*.6);v.seal.position.y=.12-eb*.18;v.seal.position.z=.03+eb*.12;
    v.card.material.opacity=Math.min(1,v.ot/.35);v.card.position.y=.2+eb*.62;v.card.position.z=.05+eb*.1;v.card.rotation.x=-(1-eb)*.6;
    for(const p of v.bits){p.vy-=4.5*dt;p.m.position.x+=p.vx*dt;p.m.position.y+=p.vy*dt;p.m.position.z+=.4*dt;p.m.rotation.z+=p.vr*dt;if(p.m.position.y<-.6)p.m.visible=false}}
   else{const h=v.hover?.06:0;v.env.position.y+=(h-v.env.position.y)*Math.min(1,dt*12)}}
  R.render(sc,cam);requestAnimationFrame(loop)};requestAnimationFrame(loop);
 window.__BID3D={envs:()=>envs.map(v=>({k:v.k,open:v.open})),scr:k=>{const v=envs[k];const p=new THREE.Vector3();v.env.getWorldPosition(p);p.project(cam);const r=R.domElement.getBoundingClientRect();return[r.left+(p.x+1)/2*r.width,r.top+(1-p.y)/2*r.height]}};
 return{ok:true,open}}
