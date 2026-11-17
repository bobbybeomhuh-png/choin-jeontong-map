/* 무이 나라 조달청: 「비축 창고 쌓기」(조달청 물자 비축). 만든 날 2026-11-17
   나라장터 옆 비축 창고 안. 바닥에 내려놓은 물자 열둘(옻통·유약 단지·구리 덩이·한지 묶음 …)을 눌러 저울에 올리면 무게(근)가 나온다.
   겉모습으로는 모른다: 작은 구리 덩이는 무겁고, 커다란 한지 묶음은 가볍다. 무게를 보고 선반 칸을 눌러 쌓는다.
   규칙(벽 팻말): 40근 넘으면 아래 칸, 15~40근 가운데 칸, 15근 아래는 위 칸. 틀리면 선반이 흔들리고 저울로 돌아온다.
   다 쌓으면 실수 수에 따라 별, 엽전, 「물자 관리」 카드.
   runStock(ctx,{ST,save,hudDraw,SND}) */
import * as THREE from 'three';
import {setupPost} from './post.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {overlay,title,blip,softOut} from './sites/minigames.js';
const ITEMS=[['옻칠 통',60,'oil'],['유약 단지',52,'jar'],['장작 묶음',45,'wood'],['구리 덩이',70,'copper'],
 ['흙 자루',30,'sack'],['자개 상자',22,'box'],['놋그릇 꾸러미',34,'brass'],['소금 가마니',26,'straw'],
 ['한지 묶음',8,'paper'],['금실 타래',3,'gold'],['붓 묶음',4,'brush'],['비단 두루마리',9,'silk']];
const tierOf=w=>w>40?0:w>=15?1:2;const TN=['아래 칸','가운데 칸','위 칸'];
export function runStock(ctx,E){const ui=overlay('#120d08');let alive=true;ui.c.style.display='none';const ac=ctx.ac(),out=softOut(ctx);
 const R=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=THREE.SRGBColorSpace;R.toneMapping=THREE.ACESFilmicToneMapping;R.shadowMap.enabled=true;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new THREE.Scene();try{setupPost(R,sc)}catch(e){console.warn('후처리',e)}sc.background=new THREE.Color(0x1a120b);sc.fog=new THREE.Fog(0x1a120b,10,22);try{const pm=new THREE.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 sc.add(new THREE.HemisphereLight(0xfff0d8,0x2a1a10,.55));const sun=new THREE.DirectionalLight(0xffe2b0,2.2);sun.position.set(-4,6,4);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-6,right:6,top:6,bottom:-3});sc.add(sun);
 const cam=new THREE.PerspectiveCamera(44,1,.05,40);cam.position.set(0,2.8,6.6);cam.lookAt(0,1.1,-.2);
 title(ui.top,'비축 창고','물자를 눌러 저울에 올리고, 무게에 맞는 선반 칸을 눌러 쌓아요');
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.85},o));
 const tex=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),c);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t};
 /* 창고: 마루, 벽, 창살 빛 */
 const fl=new THREE.Mesh(new THREE.PlaneGeometry(16,12),new THREE.MeshStandardMaterial({map:tex(512,512,q=>{q.fillStyle='#6a4a2c';q.fillRect(0,0,512,512);for(let i=0;i<16;i++){q.fillStyle=i%2?'#5e4026':'#72502f';q.fillRect(0,i*32,512,30)}for(let i=0;i<300;i++){q.fillStyle='rgba(30,18,8,.18)';q.fillRect(Math.random()*512,Math.random()*512,20+Math.random()*40,1)}}),roughness:.9}));fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;sc.add(fl);
 const wall=new THREE.Mesh(new THREE.PlaneGeometry(16,6),new THREE.MeshStandardMaterial({map:tex(1024,384,q=>{q.fillStyle='#d9ccb0';q.fillRect(0,0,1024,384);for(let i=0;i<9;i++){q.fillStyle='#5a3a22';q.fillRect(i*128-6,0,12,384)}q.fillRect(0,0,1024,14);q.fillRect(0,300,1024,14)})}));wall.position.set(0,3,-2.4);sc.add(wall);
 for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.PlaneGeometry(8,6),M(0xcbbd9e));w.position.set(s*6,3,1.2);w.rotation.y=-s*Math.PI/2;sc.add(w)}
 /* 높은 창살 창 */const win=new THREE.Mesh(new THREE.PlaneGeometry(2.4,.9),new THREE.MeshBasicMaterial({map:tex(256,96,q=>{q.fillStyle='#fff3cf';q.fillRect(0,0,256,96);q.fillStyle='#4a2e1a';for(let i=0;i<=8;i++)q.fillRect(i*32-3,0,6,96);for(let j=0;j<=3;j++)q.fillRect(0,j*32-3,256,6)}),toneMapped:false}));win.position.set(-3.4,4.3,-2.38);sc.add(win);
 /* 규칙 팻말 */const sign=new THREE.Mesh(new THREE.PlaneGeometry(2.6,1.1),new THREE.MeshBasicMaterial({map:tex(520,220,q=>{q.fillStyle='#1a2a4a';q.fillRect(0,0,520,220);q.strokeStyle='#d8a838';q.lineWidth=8;q.strokeRect(4,4,512,212);q.fillStyle='#f2d27a';q.textAlign='center';q.font='bold 34px sans-serif';q.fillText('쌓는 법',260,48);q.font='bold 28px sans-serif';q.fillText('위 칸 · 15근 아래',260,98);q.fillText('가운데 칸 · 15~40근',260,142);q.fillText('아래 칸 · 40근 넘음',260,186)}),toneMapped:false}));sign.position.set(-4.85,3.5,-2.36);sign.scale.setScalar(.85);sc.add(sign);
 /* 선반: 세 칸 × 넷 */const shelf=new THREE.Group();shelf.position.set(0,0,-1.55);sc.add(shelf);const wd=M(0x7a4a26,{roughness:.7});const TY=[.12,1.12,2.12],SX=[-2.1,-.7,.7,2.1];
 for(const y of TY){const b=new THREE.Mesh(new THREE.BoxGeometry(5.9,.1,1),wd);b.position.y=y;b.castShadow=b.receiveShadow=true;shelf.add(b)}
 for(const x of[-2.9,-1.4,0,1.4,2.9]){const p=new THREE.Mesh(new THREE.BoxGeometry(.12,3.1,.12),wd);p.position.set(x,1.55,.42);p.castShadow=true;shelf.add(p);const p2=p.clone();p2.position.z=-.42;shelf.add(p2)}
 const top=new THREE.Mesh(new THREE.BoxGeometry(6.1,.12,1.1),wd);top.position.y=3.1;shelf.add(top);
 /* 칸 이름표 */TY.forEach((y,t)=>{const l=new THREE.Mesh(new THREE.PlaneGeometry(.9,.24),new THREE.MeshBasicMaterial({map:tex(240,64,q=>{q.fillStyle='#f3ead6';q.fillRect(0,0,240,64);q.fillStyle='#3b2a1c';q.font='bold 34px sans-serif';q.textAlign='center';q.fillText(TN[t],120,45)}),toneMapped:false}));l.position.set(-3.45,y+.3,.45);shelf.add(l)});
 /* 칸 고르는 자리(보이지 않게, 고를 때 은은히 빛남) */const slots=[];TY.forEach((y,t)=>SX.forEach((x,i)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(1.3,.9,.95),new THREE.MeshBasicMaterial({color:0xffe08a,transparent:true,opacity:0,depthWrite:false}));m.position.set(x,y+.5,0);shelf.add(m);slots.push({m,t,i,item:null})}));
 /* 저울(오른쪽 앞) */const scale=new THREE.Group();scale.position.set(3.4,0,1.15);sc.add(scale);{const b=new THREE.Mesh(new THREE.BoxGeometry(1.1,.5,1),M(0x5a3a22));b.position.y=.25;b.castShadow=true;scale.add(b);const pan=new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,.06,24),M(0xb08a40,{metalness:.7,roughness:.35}));pan.position.y=.53;scale.add(pan);const post=new THREE.Mesh(new THREE.BoxGeometry(.12,1,.12),M(0x5a3a22));post.position.set(0,1,-.45);scale.add(post)}
 const dc=document.createElement('canvas');dc.width=dc.height=256;const dtex=new THREE.CanvasTexture(dc);dtex.colorSpace=THREE.SRGBColorSpace;const dial=new THREE.Mesh(new THREE.CircleGeometry(.42,32),new THREE.MeshBasicMaterial({map:dtex,toneMapped:false}));dial.position.set(0,1.5,-.38);scale.add(dial);
 let shown=0,want=0;const drawDial=(w,name)=>{const q=dc.getContext('2d');q.fillStyle='#fbf3dc';q.beginPath();q.arc(128,128,126,0,7);q.fill();q.strokeStyle='#3b2a1c';q.lineWidth=8;q.stroke();q.lineWidth=3;for(let k=0;k<=8;k++){const a=Math.PI*.8+k/8*Math.PI*1.4;q.beginPath();q.moveTo(128+Math.cos(a)*100,128+Math.sin(a)*100);q.lineTo(128+Math.cos(a)*116,128+Math.sin(a)*116);q.stroke()}
  /* 15근, 40근 눈금 색 */for(const[v,c]of[[15,'#2f6a4a'],[40,'#b8322a']]){const a=Math.PI*.8+v/80*Math.PI*1.4;q.strokeStyle=c;q.lineWidth=7;q.beginPath();q.moveTo(128+Math.cos(a)*92,128+Math.sin(a)*92);q.lineTo(128+Math.cos(a)*118,128+Math.sin(a)*118);q.stroke()}
  const a=Math.PI*.8+Math.min(80,w)/80*Math.PI*1.4;q.strokeStyle='#8e2b20';q.lineWidth=6;q.beginPath();q.moveTo(128,128);q.lineTo(128+Math.cos(a)*96,128+Math.sin(a)*96);q.stroke();q.fillStyle='#3b2a1c';q.beginPath();q.arc(128,128,9,0,7);q.fill();
  q.textAlign='center';q.font='bold 40px sans-serif';q.fillText(name?Math.round(w)+'근':'저울',128,196);q.font='bold 22px sans-serif';q.fillStyle='#5a3a12';if(name)q.fillText(name,128,226);dtex.needsUpdate=true};drawDial(0,'');
 /* 물자 만들기 */const mk=(kind)=>{const g=new THREE.Group();const add=(geo,mat,x=0,y=0,z=0,rx=0,rz=0)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.rotation.set(rx,0,rz);m.castShadow=true;g.add(m);return m};
  if(kind==='oil'){add(new THREE.CylinderGeometry(.27,.3,.56,18),M(0x3a2414,{roughness:.4}),0,.28);for(const y of[.1,.46])add(new THREE.TorusGeometry(.29,.025,6,20),M(0x2a2a2a,{metalness:.6}),0,y,0,Math.PI/2)}
  else if(kind==='jar'){const j=add(new THREE.SphereGeometry(.3,18,14),M(0x7a9a86,{roughness:.3}),0,.3);j.scale.set(1,1.1,1);add(new THREE.CylinderGeometry(.12,.15,.12,14),M(0x7a9a86,{roughness:.3}),0,.66)}
  else if(kind==='wood'){for(let k=0;k<6;k++)add(new THREE.CylinderGeometry(.08,.08,.7,8),M(0x8a5a32),-.17+(k%3)*.17,.09+Math.floor(k/3)*.15,0,0,Math.PI/2);add(new THREE.TorusGeometry(.26,.02,6,16),M(0xc8b080),0,.17,0,0,Math.PI/2)}
  else if(kind==='copper'){for(let k=0;k<3;k++)add(new THREE.BoxGeometry(.3,.09,.14),M(0xb8653a,{metalness:.85,roughness:.3}),0,.05+k*.095,(k%2)*.03)}
  else if(kind==='sack'){const s=add(new THREE.SphereGeometry(.3,14,10),M(0xc8b088),0,.26);s.scale.set(1,.85,.9);add(new THREE.CylinderGeometry(.06,.1,.14,8),M(0xc8b088),0,.55)}
  else if(kind==='box'){add(new THREE.BoxGeometry(.48,.3,.36),M(0x1a1412,{roughness:.25}),0,.15);for(let k=0;k<5;k++)add(new THREE.CircleGeometry(.03,8),M(0xe8f0ff,{emissive:0x8a9ab0,emissiveIntensity:.3}),-.16+k*.08,.17+(k%2)*.05,.181)}
  else if(kind==='brass'){for(let k=0;k<4;k++)add(new THREE.CylinderGeometry(.2-k*.012,.16-k*.012,.08,18),M(0xc8a040,{metalness:.8,roughness:.3}),0,.05+k*.08);add(new THREE.BoxGeometry(.44,.02,.06),M(0x8a2a1a),0,.36)}
  else if(kind==='straw'){add(new THREE.BoxGeometry(.56,.38,.38),M(0xc8b060,{roughness:1}),0,.19);for(const x of[-.15,.15])add(new THREE.BoxGeometry(.03,.4,.4),M(0x8a7a40),x,.19)}
  else if(kind==='paper'){for(let k=0;k<4;k++)add(new THREE.BoxGeometry(.62,.1,.44),M(k%2?0xf6f0e0:0xeee6d2),0,.05+k*.1);add(new THREE.BoxGeometry(.05,.42,.46),M(0x8e2b20),0,.21)}
  else if(kind==='gold'){add(new THREE.TorusGeometry(.12,.05,10,20),M(0xf2c14e,{metalness:.9,roughness:.25}),0,.06,0,Math.PI/2)}
  else if(kind==='brush'){for(let k=0;k<5;k++){add(new THREE.CylinderGeometry(.018,.018,.4,6),M(0xa07a48),-.08+k*.04,.03,0,Math.PI/2);add(new THREE.ConeGeometry(.03,.09,6),M(0x2a2a2a),-.08+k*.04,.03,.24,Math.PI/2)}}
  else if(kind==='silk'){add(new THREE.CylinderGeometry(.13,.13,.64,16),M(0xb8322a,{roughness:.5}),0,.13,0,0,Math.PI/2);add(new THREE.CylinderGeometry(.135,.135,.08,16),M(0xf2c14e),0,.13,0,0,Math.PI/2)}
  return g};
 /* 바닥에 섞어 놓기(두 줄) */const order=ITEMS.map((x,i)=>i).sort(()=>Math.random()-.5);const items=order.map((ix,n)=>{const [name,w,kind]=ITEMS[ix];const g=mk(kind);const home=new THREE.Vector3(-2.75+(n%6)*1.1,0,.55+Math.floor(n/6)*1.05);g.position.copy(home);g.rotation.y=(Math.random()-.5)*.6;sc.add(g);return{g,name,w,t:tierOf(w),home,placed:null,anim:null}});
 const bar=document.createElement('div');bar.style.cssText='position:absolute;left:50%;bottom:18px;transform:translateX(-50%);z-index:3;max-width:min(760px,94vw);padding:8px 14px;border-radius:12px;background:rgba(243,234,214,.96);border:2px solid #d8a838;font:15px/1.6 "Gowun Dodum",sans-serif;color:#2b1d12;text-align:center';ui.o.append(bar);
 const say=(t,bad)=>{bar.style.borderColor=bad?'#b8322a':'#d8a838';bar.innerHTML=t};
 let sel=null,miss=0,done=0,shake=0,hover=null,finished=false;
 say('바닥의 물자를 눌러 <b>저울</b>에 올려요. 겉모습만 보고는 무게를 몰라요!');
 const fly=(it,to,y0,after,sc1=1)=>{it.anim={from:it.g.position.clone(),to:to.clone(),t:0,h:y0,after,s0:it.g.scale.x,s1:sc1}};
 const SP=new THREE.Vector3(3.4,.56,1.15);
 const pick=(it)=>{if(it.placed||it.anim||finished)return;if(sel&&sel!==it&&!sel.placed)fly(sel,sel.home,.6);sel=it;E.SND.paper();fly(it,SP,.9,()=>{want=it.w;blip(ac,out,300,420,.08,.06,'triangle');say(`<b>${it.name}</b> · ${it.w}근. 어느 칸에 둘까요? 선반 칸을 눌러요.`)})};
 const put=(s)=>{if(!sel||sel.anim||s.item||finished)return;const it=sel;if(s.t!==it.t){miss++;shake=.6;blip(ac,out,180,120,.14,.1,'square');say(`${it.name}은(는) ${it.w}근이라 <b>${TN[it.t]}</b>이에요. ${it.t===0?'무거운 걸 위에 두면 선반이 휘고 무너져요.':it.t===2?'가벼운 건 위 칸에 두어야 무거운 짐에 깔리지 않아요.':'가운데 무게는 가운데 칸이에요.'}`,true);return}
  s.item=it;it.placed=s;sel=null;want=0;const wp=new THREE.Vector3();s.m.getWorldPosition(wp);wp.y=TY[s.t]+.05;wp.z=shelf.position.z+.05;E.SND.coin();fly(it,wp,.7,()=>{done++;if(done===items.length)finish();else say(`잘 쌓았어요. ${done} / ${items.length}`)},1.45)};
 const finish=()=>{finished=true;const stars=miss===0?3:miss<=2?2:1;const coins=5+stars*5;E.ST.coins+=coins;E.ST.cards=E.ST.cards||{};E.ST.cards.stock=1;E.ST.stock=Math.max(E.ST.stock||0,stars);E.save();E.hudDraw();E.SND.fan();
  say(`<b>비축 완료! ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</b> 실수 ${miss}번 · 수고비 ${coins}냥.<br>조달청은 나라에 꼭 필요한 물자를 미리 사서 창고에 <b>비축</b>해 두었다가, 모자라거나 값이 크게 오를 때 풀어요. 무거운 건 아래, 가벼운 건 위에 쌓아야 안전하고 꺼내기도 쉬워요. 「물자 관리」 카드가 열렸어요.<div style="margin-top:8px"><button type="button" data-x style="font:16px 'Do Hyeon',sans-serif;padding:8px 18px;border-radius:12px;border:0;background:#8e2b20;color:#fff4dc;cursor:pointer">마치기</button></div>`);bar.querySelector('[data-x]').onclick=close};
 const ray=new THREE.Raycaster(),mv=new THREE.Vector2();const hitAt=e=>{const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,cam);
  const ih=ray.intersectObjects(items.filter(x=>!x.placed).map(x=>x.g),true)[0];if(ih){const it=items.find(x=>{let o=ih.object;while(o){if(o===x.g)return true;o=o.parent}return false});if(it)return{it}}
  if(sel){const sh=ray.intersectObjects(slots.filter(s=>!s.item).map(s=>s.m),false)[0];if(sh)return{s:slots.find(s=>s.m===sh.object)}}return null};
 R.domElement.addEventListener('pointerdown',e=>{const h=hitAt(e);if(!h)return;if(h.it)pick(h.it);else if(h.s)put(h.s)});
 R.domElement.addEventListener('pointermove',e=>{const h=hitAt(e);hover=h&&h.s||null;R.domElement.style.cursor=h?'pointer':'default'});
 let last=performance.now();const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  for(const it of items){const a=it.anim;if(!a)continue;a.t=Math.min(1,a.t+dt*2.2);const k=a.t*a.t*(3-2*a.t);it.g.position.lerpVectors(a.from,a.to,k);it.g.position.y+=Math.sin(a.t*Math.PI)*a.h;it.g.scale.setScalar(a.s0+(a.s1-a.s0)*k);if(a.t>=1){it.anim=null;a.after&&a.after()}}
  shown+=(want-shown)*Math.min(1,dt*6);if(Math.abs(want-shown)>.05||(!want&&shown>.05))drawDial(shown,sel&&!sel.anim?sel.name:(want?' ':''));
  if(shake>0){shake=Math.max(0,shake-dt);shelf.rotation.z=Math.sin(now/30)*.02*shake/.6}else shelf.rotation.z=0;
  for(const s of slots)s.m.material.opacity=sel&&!sel.anim&&!s.item?(s===hover?.38:.1):0;
  R.render(sc,cam);requestAnimationFrame(loop)};loop();
 const close=()=>{if(!alive)return;alive=false;try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 /* 시험용 */window.__STK={state:()=>({done,miss,sel:sel&&sel.name,items:items.map(x=>({n:x.name,w:x.w,t:x.t,placed:!!x.placed}))}),pick:i=>pick(items[i]),put:(t,i)=>put(slots.find(s=>s.t===t&&s.i===i)),
  solve:()=>{const free=t=>slots.find(s=>s.t===t&&!s.item);const step=()=>{const it=items.find(x=>!x.placed);if(!it||!alive)return;pick(it);setTimeout(()=>{put(free(it.t));setTimeout(step,700)},700)};step()},
  screen:(it,s)=>{const v=(it!=null?items[it].g.position:slots.find(x=>x.t===s[0]&&x.i===s[1]).m.getWorldPosition(new THREE.Vector3())).clone();if(it!=null)v.y+=.15;v.project(cam);const r=R.domElement.getBoundingClientRect();return[r.left+(v.x+1)/2*r.width,r.top+(1-v.y)/2*r.height]},close};
 return{close}}
