/* 무이 나라 조달청: 「암행어사 담합 감시」. 만든 날 2026-11-17
   관아 창의 「암행 감찰」 단추로 연다. 밤 장터 뒷골목(3D): 초롱, 가게 벽, 통·상자(숨는 곳), 가운데 모닥불가에서 수군대는 업체 무이 셋,
   골목을 오가는 망꾼 무이 둘(발밑에 노란 시야 부채꼴). WASD(또는 방향키)로 걷는다. 통·상자 뒤는 시야가 가려진다.
   업체 무이 곁(4m)에서 들키지 않으면 엿듣기 막대가 차고 대화가 한 줄씩 들린다. 다 차면 담합 증거, 골목 입구(초록 빛)로 돌아오면 성공.
   망꾼 시야에 들면 경계 막대가 차고, 다 차면 들켜서 처음 자리로. 성공하면 엽전과 「공정 조달 감시」 카드.
   runSneak(ctx,{ST,save,hudDraw,SND}) */
import * as T from 'three';
import {setupPost} from './post.js';
import {groundTex} from './sites/dress.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {overlay,title,blip,softOut} from './sites/minigames.js';
const TALK=['「이번 금실 입찰은 우리 셋이 값을 미리 맞추세.」','「자네는 일부러 비싸게 써내고, 이번엔 내가 받겠네.」','「다음 번엔 자네 차례일세. 아무도 모를 걸세.」','「…그럼 셋이 똑같이 나누는 걸로 하지.」'];
export function runSneak(ctx,E){const ui=overlay('#05070f');let alive=true;ui.c.style.display='none';const ac=ctx.ac(),out=softOut(ctx);
 const R=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.shadowMap.enabled=true;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new T.Scene();try{setupPost(R,sc)}catch(e){console.warn('후처리',e)}sc.background=new T.Color(0x0a1022);sc.fog=new T.Fog(0x0a1022,14,34);try{const pm=new T.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 R.toneMappingExposure=.75;sc.add(new T.HemisphereLight(0x8090c0,0x1a1410,.35));const moon=new T.DirectionalLight(0xa0b8ff,.7);moon.position.set(-8,14,6);moon.castShadow=true;moon.shadow.mapSize.set(2048,2048);Object.assign(moon.shadow.camera,{left:-16,right:16,top:16,bottom:-16});sc.add(moon);
 const cam=new T.PerspectiveCamera(50,1,.05,80);
 title(ui.top,'암행 감찰','WASD로 걷기 · 노란 시야를 피해 통·상자 뒤로 · 업체 무이 곁에서 엿듣기');
 const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 /* 바닥과 담 */const fl=new T.Mesh(new T.PlaneGeometry(30,30),M(0x8a8478,{map:groundTex('pave',9)}));fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;sc.add(fl);
 /* 11/17 P10: 골목 담 = 막돌 담 무늬 + 기와 갓(검은 기와), 바닥 = 박석 */const STN=(()=>{const c=document.createElement('canvas');c.width=256;c.height=128;const q=c.getContext('2d');q.fillStyle='#cfc7b4';q.fillRect(0,0,256,128);let r5=9;const rr=()=>(r5=(r5*16807)%2147483647)/2147483647;for(let y=2;y<128;y+=16+rr()*6)for(let x=-10+rr()*10;x<256;x+=20+rr()*14){const v=100+(rr()*80|0),ww=17+rr()*12,hh=12+rr()*6;q.fillStyle=`rgb(${v+8},${v},${v-12})`;q.beginPath();q.ellipse(x+ww/2,y+hh/2,ww/2,hh/2,(rr()-.5)*.4,0,7);q.fill()}return c})();const TILE=M(0x2e3238,{roughness:.6});
 const blocks=[];const box=(x,z,w,d,h,c)=>{let mat=M(c);if(c===0xd8ccb0||c===0xc8b898){const t=new T.CanvasTexture(STN);t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(Math.max(w,d)/1.6,h/1.1);mat=M(c===0xd8ccb0?0xb0a898:0xa89e8c,{map:t})}const m=new T.Mesh(new T.BoxGeometry(w,h,d),mat);m.position.set(x,h/2,z);m.castShadow=m.receiveShadow=true;sc.add(m);blocks.push({x,z,w,d,h,m});
  if(c===0xd8ccb0||c===0xc8b898){const cap=new T.Mesh(new T.BoxGeometry(w+.25,.14,d+.25),TILE);cap.position.set(x,h+.07,z);cap.castShadow=true;sc.add(cap);const rg=new T.Mesh(new T.BoxGeometry(w>d?w+.25:.16,.12,w>d?.16:d+.25),TILE);rg.position.set(x,h+.2,z);sc.add(rg)}return m};
 for(const[x,z,w,d]of[[0,-12,26,1],[0,12,26,1],[-13,0,1,24],[13,0,1,24]])box(x,z,w,d,1.2,0xd8ccb0);
 /* 가게 벽(골목) */for(const[x,z,w,d]of[[-7,-5,5,1.2],[7,-5,5,1.2],[-7,5,5,1.2],[7,5,5,1.2],[-3.5,-9,1.2,4],[3.5,9,1.2,4]])box(x,z,w,d,1.8,0xc8b898);
 /* 숨는 곳: 통·상자 */const hide=[[-4.5,1.5],[-1.8,-3.2],[2.2,3.4],[4.4,-1.6],[-6,-8.5],[6.5,8],[0,8.8],[-9,2.5],[-3.6,-5.6]];for(const[x,z]of hide){if((x+z)%2){const c=new T.Mesh(new T.CylinderGeometry(.55,.6,1.3,14),M(0x6a4a2c));c.position.set(x,.65,z);c.castShadow=true;sc.add(c);blocks.push({x,z,w:1.1,d:1.1,h:1.3,m:c})}else box(x,z,1.3,1.3,1.2,0x8a6a40)}
 /* 초롱 */for(const[x,z]of[[-10,-10],[10,-10],[-10,10],[10,10],[0,-11],[-12,0],[12,0]]){const l=new T.Mesh(new T.CylinderGeometry(.22,.22,.42,10),new T.MeshStandardMaterial({color:0xc8321a,emissive:0xff6a2a,emissiveIntensity:1.8}));l.position.set(x,2.3,z);sc.add(l);const pl=new T.PointLight(0xff9a5a,6,8);pl.position.set(x,2.2,z);sc.add(pl)}
 /* 모닥불(가운데) */const fire=new T.PointLight(0xff8a3a,14,9);fire.position.set(0,1,0);sc.add(fire);const fm=new T.Mesh(new T.ConeGeometry(.35,.8,8),new T.MeshBasicMaterial({color:0xffa040}));fm.position.set(0,.4,0);sc.add(fm);
 /* 입구(초록 빛) */const START=new T.Vector3(-10.5,0,-10.2);const gate=new T.Mesh(new T.CylinderGeometry(1,1,.05,24),new T.MeshBasicMaterial({color:0x4aff8a,transparent:true,opacity:.35}));gate.position.set(START.x,.03,START.z);sc.add(gate);
 /* 무이들 */const H=window.__H3;let me=null;const gang=[],guards=[];
 const load=(k,h,cb)=>{if(H&&H.makeMuui)H.makeMuui(k,h).then(m=>{sc.add(m.root);cb(m)}).catch(()=>{})};
 load('base',1.2,m=>{me=m;m.root.position.copy(START);m.play('idle')});
 [[0,1.3],[1.15,-.6],[-1.15,-.6]].forEach(([x,z],i)=>load(['metal','painter','carpenter'][i],1.15,m=>{m.root.position.set(x,0,z);m.root.rotation.y=Math.atan2(-x,-z);m.play('idle');gang.push(m)}));
 const PATH=[null,[[-1,-8],[10,-8]]];/* 0번은 모닥불 둘레를 도는 망꾼 */
 PATH.forEach((p,i)=>load('science',1.2,m=>{if(p)m.root.position.set(p[0][0],0,p[0][1]);m.play('walk');const cone=new T.Mesh(new T.CircleGeometry(6,32,-Math.PI/5,Math.PI*2/5),new T.MeshBasicMaterial({color:0xffe08a,transparent:true,opacity:.22,depthWrite:false,side:T.DoubleSide}));cone.rotation.x=-Math.PI/2;cone.position.y=.04;sc.add(cone);guards.push({m,p,t:i*.5,dir:1,cone,look:0})}));
 /* UI */const hud=document.createElement('div');hud.style.cssText='position:absolute;left:16px;top:70px;z-index:3;padding:10px 14px;border-radius:12px;background:rgba(10,12,24,.8);color:#f2d27a;font:16px "Do Hyeon",sans-serif;line-height:1.7;min-width:230px';ui.o.append(hud);
 const msg=document.createElement('div');msg.style.cssText='position:absolute;left:50%;bottom:18px;transform:translateX(-50%);z-index:3;max-width:min(760px,94vw);padding:8px 14px;border-radius:12px;background:rgba(243,234,214,.96);border:2px solid #d8a838;font:15px/1.6 "Gowun Dodum",sans-serif;color:#2b1d12;text-align:center';ui.o.append(msg);
 const say=(t,bad)=>{msg.style.borderColor=bad?'#b8322a':'#d8a838';msg.innerHTML=t};
 say('마패를 품은 암행어사 무이! 장터 뒷골목에서 업체들이 담합을 꾸민대요. <b>노란 시야</b>를 피해 통·상자 뒤로 다가가 엿들어요.');
 const key={};const kd=e=>{if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)){key[e.code]=true;e.preventDefault()}},ku=e=>{key[e.code]=false};addEventListener('keydown',kd);addEventListener('keyup',ku);
 let listen=0,alert=0,caught=0,heard=0,have=false,done=false,flash=0;
 const ray=new T.Raycaster();const blockedBetween=(a,b)=>{const d=new T.Vector3().subVectors(b,a);const L=d.length();ray.set(a,d.normalize());ray.far=L;return ray.intersectObjects(blocks.map(x=>x.m),false).length>0};
 const collide=p=>{for(const b of blocks){const hx=b.w/2+.35,hz=b.d/2+.35;const dx=p.x-b.x,dz=p.z-b.z;if(Math.abs(dx)<hx&&Math.abs(dz)<hz){const ox=hx-Math.abs(dx),oz=hz-Math.abs(dz);if(ox<oz)p.x+=Math.sign(dx)*ox;else p.z+=Math.sign(dz)*oz}}const r=Math.hypot(p.x,p.z);if(r<1.9){p.x*=1.9/r;p.z*=1.9/r}};
 const finish=()=>{done=true;const stars=caught===0?3:caught<=2?2:1;const coins=10+stars*8;E.ST.coins+=coins;E.ST.cards=E.ST.cards||{};E.ST.cards.watch=1;E.ST.sneak=Math.max(E.ST.sneak||0,stars);E.save&&E.save();E.hudDraw&&E.hudDraw();E.SND&&E.SND.fan&&E.SND.fan();
  say(`<b>암행어사 출두요! ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</b> 들킨 횟수 ${caught} · 엽전 ${coins}냥.<br>담합 증거를 잡아 세 업체는 나라 입찰에 한동안 나올 수 없게 됐어요. 조달청은 담합 같은 <b>불공정 행위</b>를 살피고, 신고를 받아 조사해요. 「공정 조달 감시」 카드가 열렸어요.<div style="margin-top:8px"><button type="button" data-x style="font:16px 'Do Hyeon',sans-serif;padding:8px 18px;border-radius:12px;border:0;background:#8e2b20;color:#fff4dc;cursor:pointer">마치기</button></div>`);msg.querySelector('[data-x]').onclick=close;for(const g of gang)g.play('wave')};
 let last=performance.now(),camYaw=0;const camPos=new T.Vector3(-10.5,9,-2);const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  for(const g of gang)g.mx.update(dt);
  /* 망꾼: 길 따라 왕복, 끝에서 잠깐 두리번 */for(const g of guards){g.m.mx.update(dt);if(!g.p){g.t+=dt*1.15/6.3;const x=Math.cos(g.t)*6.3,z=Math.sin(g.t)*6.3;g.m.root.position.set(x,0,z);g.m.root.rotation.y=Math.atan2(-Math.sin(g.t),Math.cos(g.t));}else{const[a,b]=g.p;const L=Math.hypot(b[0]-a[0],b[1]-a[1]);if(g.look>0){g.look-=dt;g.m.root.rotation.y+=Math.sin(now/300)*dt*1.5;if(g.look<=0)g.m.play('walk')}else{g.t+=g.dir*dt*1.5/L;if(g.t>=1||g.t<=0){g.t=Math.max(0,Math.min(1,g.t));g.dir*=-1;g.look=1.6;g.m.play('idle')}const x=a[0]+(b[0]-a[0])*g.t,z=a[1]+(b[1]-a[1])*g.t;g.m.root.position.set(x,0,z);g.m.root.rotation.y=Math.atan2((b[0]-a[0])*g.dir,(b[1]-a[1])*g.dir)}}
   const ry=g.m.root.rotation.y;g.cone.position.set(g.m.root.position.x,.04,g.m.root.position.z);g.cone.rotation.z=ry-Math.PI/2;g.cone.material.color.setHex(alert>.5?0xff6a4a:0xffe08a)}
  if(me&&!done){me.mx.update(dt);const f=(key.KeyW||key.ArrowUp?1:0)-(key.KeyS||key.ArrowDown?1:0),s=(key.KeyD||key.ArrowRight?1:0)-(key.KeyA||key.ArrowLeft?1:0);const p=me.root.position;
   if(f||s){/* 화면 기준: 위=+z쪽 앞으로 */const v=new T.Vector3(-s,0,f).normalize().multiplyScalar(3.2*dt);v.applyAxisAngle(new T.Vector3(0,1,0),camYaw);p.add(v);collide(p);me.root.rotation.y=Math.atan2(v.x,v.z);me.play('walk')}else me.play('idle');
   /* 들킴 판정 */let seen=false;for(const g of guards){const gp=g.m.root.position;const dx=p.x-gp.x,dz=p.z-gp.z,d=Math.hypot(dx,dz);if(d>6)continue;const ang=Math.atan2(dx,dz)-g.m.root.rotation.y;const a=Math.atan2(Math.sin(ang),Math.cos(ang));if(Math.abs(a)<Math.PI/5&&!blockedBetween(new T.Vector3(gp.x,1,gp.z),new T.Vector3(p.x,1,p.z))){seen=true}}
   alert=Math.max(0,Math.min(1,alert+(seen?dt*1.1:-dt*.35)));if(seen&&Math.random()<dt*3)blip(ac,out,900,700,.03,.03,'square');
   if(alert>=1){caught++;alert=0;listen=Math.max(0,listen-.25);p.copy(START);flash=1;blip(ac,out,300,120,.3,.12,'sawtooth');say(`<b>들켰어요!</b> 망꾼이 「거기 누구냐!」 하고 소리쳤어요. 골목 입구로 물러났어요. 통·상자 뒤로 숨어 다가가요. (엿들은 것 ${Math.round(listen*100)}%)`,true)}
   /* 엿듣기 */const dc=Math.hypot(p.x,p.z);if(!have&&dc<4&&!seen){listen=Math.min(1,listen+dt/9);const n=Math.min(TALK.length,Math.floor(listen*TALK.length+.0001));if(n>heard){heard=n;say(`엿들었어요: <b>${TALK[n-1]}</b>`);blip(ac,out,500,520,.05,.04,'triangle')}if(listen>=1){have=true;E.SND&&E.SND.coin&&E.SND.coin();say('<b>담합 증거를 잡았어요!</b> 들키지 말고 <b>골목 입구(초록 빛)</b>로 돌아가요.')}}
   if(have&&Math.hypot(p.x-START.x,p.z-START.z)<1.3)finish()}
  /* 카메라: 무이 뒤 위에서 */if(me){const p=me.root.position;const want=new T.Vector3(p.x*.7,p.y+15,p.z*.7-7.5);camPos.lerp(want,Math.min(1,dt*3));cam.position.copy(camPos);cam.lookAt(p.x*.8,p.y,p.z*.8+1)}
  fm.scale.y=1+Math.sin(now/90)*.15;fire.intensity=13+Math.sin(now/70)*3;flash=Math.max(0,flash-dt);gate.material.opacity=have?.35+.25*Math.sin(now/200):.18;
  hud.innerHTML=`엿듣기 <span style="display:inline-block;width:120px;height:10px;background:#333;border-radius:5px;vertical-align:middle"><span style="display:block;height:10px;width:${listen*100}%;background:#6ad08a;border-radius:5px"></span></span><br>경계 <span style="display:inline-block;width:120px;height:10px;background:#333;border-radius:5px;vertical-align:middle"><span style="display:block;height:10px;width:${alert*100}%;background:${alert>.6?'#ff4a3a':'#ffd24a'};border-radius:5px"></span></span><br>들킨 횟수 ${caught}${have?'<br><b style="color:#6ad08a">증거 확보! 입구로</b>':''}`;
  R.render(sc,cam);requestAnimationFrame(loop)};loop();
 const close=()=>{if(!alive)return;alive=false;removeEventListener('keydown',kd);removeEventListener('keyup',ku);for(const m of[me,...gang,...guards.map(g=>g.m)])if(m)sc.remove(m.root);try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 window.__SNK={state:()=>({listen,alert,caught,have,done,me:me&&[me.root.position.x,me.root.position.z],guards:guards.map(g=>[g.m.root.position.x,g.m.root.position.z,g.m.root.rotation.y]),ready:!!me&&gang.length===3&&guards.length===2}),key,close};
 return{close}}
