/* 무이 나라 조달청: 길 위 사건 「불량 납품 수레 추격전」. 만든 날 2026-11-16
   세 고을을 되살리면 한 번 뜬다. 가짜 금실·가짜 자개를 실은 수레가 고을을 빠져나가 지도 위를 달아난다.
   수레는 걷는 무이(초당 5)보다 빠르고 말(초당 17)보다 느림(초당 11). 말을 타고 수레 앞쪽으로 돌아가 가로막으면 선다.
   잡으면 짐을 살펴 가짜를 가려내고(셋 중 둘이 가짜), 검수·부정당 제재 한마디와 카드, 수고비. 60초 안에 못 잡으면 다시.
   jodal.js 가 setupChase(env) 로 부른다. env={X,THREE,JOBS,ST,save,hudDraw,ov,SND,esc,busyEv} */
export function setupChase(E){const {X,THREE,JOBS}=E;const H=window.__H3;let ev=null;
 const st=()=>E.ST.chase||(E.ST.chase={});
 const busy=()=>!!document.querySelector('.jd-ov,body>div[data-mg]');
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.85},o));
 /* 수상한 수레: 검은 천을 덮은 짐, 붉은 깃발, 머리 위 느낌표 */
 const cart=()=>{const g=new THREE.Group();const bed=new THREE.Mesh(new THREE.BoxGeometry(1.2,.2,1.8),M(0x4a3020));bed.position.y=.6;bed.castShadow=true;g.add(bed);const wh=[];for(const s of[-1,1])for(const z of[-.55,.55]){const w=new THREE.Mesh(new THREE.TorusGeometry(.32,.07,8,16),M(0x2a1a10));w.rotation.y=Math.PI/2;w.position.set(s*.66,.34,z);g.add(w);wh.push(w)}
  const load=new THREE.Mesh(new THREE.BoxGeometry(1.05,.7,1.5),M(0x1c1c22,{roughness:.6}));load.position.y=1.05;load.castShadow=true;g.add(load);const rope=new THREE.Mesh(new THREE.TorusGeometry(.6,.03,6,20),M(0x8a7050));rope.rotation.x=Math.PI/2;rope.position.y=1.1;rope.scale.set(1,1.3,1);g.add(rope);
  /* 몰고 가는 수상한 사람(삿갓 쓴 그림자) */const body=new THREE.Mesh(new THREE.CapsuleGeometry(.25,.6,4,8),M(0x2a2a30));body.position.set(0,1.0,1.25);g.add(body);const hat=new THREE.Mesh(new THREE.ConeGeometry(.45,.25,16),M(0xc8a868));hat.position.set(0,1.55,1.25);g.add(hat);
  const fl=new THREE.Mesh(new THREE.PlaneGeometry(.5,.32),new THREE.MeshStandardMaterial({color:0xb8322a,side:THREE.DoubleSide}));fl.position.set(.45,1.9,-.6);g.add(fl);const pole=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,1,5),M(0x3a2a1a));pole.position.set(.2,1.6,-.6);g.add(pole);
  const c=document.createElement('canvas');c.width=c.height=64;const q=c.getContext('2d');q.fillStyle='#ffcf3a';q.beginPath();q.arc(32,32,28,0,7);q.fill();q.fillStyle='#8e2b20';q.font='bold 46px sans-serif';q.textAlign='center';q.fillText('!',32,48);const ex=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false}));ex.scale.setScalar(.9);ex.position.y=3;ex.renderOrder=9;g.add(ex);g.userData={wh,ex};return g};
 const pick=()=>{const done=JOBS.filter(j=>E.ST.done[j.k]&&j.sp);if(done.length<3)return null;return done[done.length-1]};
 const offer=()=>{const j=pick();if(!j)return;st().offered=1;E.save();const u=E.ov();
  u.c.innerHTML=`<h2>수상한 수레가 달아나요!</h2><div style="text-align:left;max-width:560px;margin:6px auto">${j.city} 고을에 국보를 고칠 재료를 대겠다던 상인이, 놋쇠에 금칠한 <b>가짜 금실</b>과 조개 대신 칠한 <b>가짜 자개</b>를 실은 수레를 몰고 몰래 빠져나가요. 수레 앞을 가로막아 세워 주세요. <b>말을 타면(H)</b> 따라잡을 수 있어요. 60초!</div>
   <div class="jd-tip">조달청 한마디: 약속과 다른 물건을 몰래 들이면 나라 보물이 망가지고 나라 돈이 새요. 그래서 들어오는 물건을 꼼꼼히 살펴요.</div>
   <div style="margin-top:12px;display:flex;gap:8px;justify-content:center"><button type="button" class="jd-btn" data-ok>쫓아가기</button><button type="button" class="jd-btn g" data-x>나중에</button></div>`;
  u.c.querySelector('[data-x]').onclick=()=>{u.close();st().later=Date.now();E.save()};u.c.querySelector('[data-ok]').onclick=()=>{u.close();start(j)}};
 const start=(j)=>{if(ev)return;const C=cart();const P0=new THREE.Vector3(j.sp.x+3,(j.sp.y||0),j.sp.z-6);C.position.copy(P0);X.scene.add(C);
  let head=Math.random()*Math.PI*2;ev={j,C,P0,head,t:60,turnT:0,dust:[]};try{H.tp(j.sp.x,j.sp.z+3,(j.sp.y||0)+.5);H.face(Math.PI);H.setRide&&H.setRide(true)}catch(e){}H.say&&H.say('수레가 달아나요! 금빛 화살표를 따라가 앞을 가로막아요.',4);E.SND.nail();E.hudDraw()};
 const end=(ok,quiet)=>{if(!ev)return;const e=ev;ev=null;X.scene.remove(e.C);for(const d of e.dust)X.scene.remove(d);E.hudDraw();if(quiet)return;
  if(!ok){const u=E.ov();u.c.innerHTML=`<h2>수레를 놓쳤어요</h2><div>고을 사람들이 수레를 다시 봤대요. 말을 타고(H) 수레 앞쪽으로 돌아가 막아 봐요.</div><div style="margin-top:12px;display:flex;gap:8px;justify-content:center"><button type="button" class="jd-btn" data-ok>다시 쫓아가기</button><button type="button" class="jd-btn g" data-x>나중에</button></div>`;u.c.querySelector('[data-ok]').onclick=()=>{u.close();start(e.j)};u.c.querySelector('[data-x]').onclick=()=>{u.close();st().later=Date.now();E.save()};return}
  /* 잡음: 짐 살피기(셋 가운데 가짜 둘 고르기) */const items=[{id:'gold',n:'금실 꾸러미',d:'긁으면 누런 놋쇠가 드러나요',fake:1},{id:'pearl',n:'자개 상자',d:'빛에 비춰도 무지갯빛이 안 돌아요. 칠한 조개껍데기',fake:1},{id:'lacq',n:'옻칠 단지',d:'진짜 옻 냄새가 나고 결이 고와요',fake:0}].sort(()=>Math.random()-.5);const sel=new Set();const u=E.ov();
  const draw=(msg)=>{u.c.innerHTML=`<h2>수레를 세웠어요! 짐을 살펴요</h2><div>약속과 다른 가짜 짐 <b>둘</b>을 골라요.</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px">${items.map(it=>`<button type="button" class="jd-opt ${sel.has(it.id)?'on':''}" data-it="${it.id}"><b>${it.n}</b>${it.d}</button>`).join('')}</div>${msg?`<div class="jd-tip" style="border-color:#b8322a;color:#8e2b20">${msg}</div>`:''}<div style="margin-top:12px"><button type="button" class="jd-btn" data-ok ${sel.size===2?'':'disabled'}>가짜라고 적기</button></div>`;
   u.c.querySelectorAll('[data-it]').forEach(b=>b.onclick=()=>{const id=b.dataset.it;if(sel.has(id))sel.delete(id);else if(sel.size<2)sel.add(id);draw()});
   u.c.querySelector('[data-ok]').onclick=()=>{const right=items.filter(i=>i.fake).every(i=>sel.has(i.id));if(!right){sel.clear();draw('진짜 옻칠 단지를 골랐어요. 냄새와 결을 다시 살펴요.');return}
    st().done=1;E.ST.coins+=25;E.ST.cards=E.ST.cards||{};E.ST.cards.fraud=1;E.save();E.hudDraw();E.SND.fan();u.c.innerHTML=`<h2>가짜 짐을 가려냈어요!</h2><div>남은 시간 ${Math.max(0,Math.round(e.t))}초 · 나라에서 수고비 25냥을 내려 주었어요.</div><div class="f3-card" style="margin:10px auto 0;max-width:560px"><b>조달 도감 카드가 열렸어요 · 불량 납품 제재</b><br>약속과 다른 물건을 몰래 납품하면 검수에서 걸러 받지 않아요. 속인 업체는 일정 기간 나라 입찰에 나올 수 없어요(부정당업자 제재).</div><div style="margin-top:12px"><button type="button" class="jd-btn" data-ok>좋아요</button></div>`;u.c.querySelector('[data-ok]').onclick=u.close}};draw()};
 /* 수레 움직임: 지도 충돌에 막히면 방향을 틀고, 너무 멀어지면 출발점 쪽으로 */
 const free=(x,z,y)=>{try{const p=new THREE.Vector3(x,y,z);H.collide(p);return Math.hypot(p.x-x,p.z-z)<.05}catch(e){return true}};
 let last=performance.now();const dustM=new THREE.MeshBasicMaterial({color:0xc8b890,transparent:true,opacity:.5,depthWrite:false});
 const loop=()=>{const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;try{if(ev&&Date.now()-(window.__ENDING||0)<60000)end(false,true);/* 11/18 D56: 맺음이 시작되면 결과 창 없이 거둠 */
  if(!ev){const s=st();if(!window.__NOEV&&!s.done&&!busy()&&(!s.later||Date.now()-s.later>90000)&&(!s.offered||s.later)&&pick()&&!(E.busyEv&&E.busyEv()))offer()}
  else if(!busy()){const C=ev.C,P=H.P;ev.t-=dt;ev.turnT-=dt;const sp=11;let nx=C.position.x+Math.sin(ev.head)*sp*dt,nz=C.position.z+Math.cos(ev.head)*sp*dt;const fy=H.floorAt?H.floorAt(nx,nz,C.position.y+2):C.position.y;
   const far=Math.hypot(nx-ev.P0.x,nz-ev.P0.z)>160;if(!free(nx,nz,(fy||0))||far||Math.abs((fy||0)-C.position.y)>1.2||ev.turnT<0){ev.head=far?Math.atan2(ev.P0.x-C.position.x,ev.P0.z-C.position.z)+(Math.random()-.5):ev.head+(Math.random()<.5?1:-1)*(.8+Math.random()*1.4);ev.turnT=2.5+Math.random()*2.5}else{C.position.set(nx,fy||0,nz)}
   C.rotation.y+=(((ev.head-C.rotation.y+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI)*Math.min(1,dt*6);for(const w of C.userData.wh)w.rotation.x+=dt*sp*3;C.userData.ex.position.y=3+Math.sin(now/180)*.15;
   if(Math.random()<.3){const d=new THREE.Mesh(new THREE.SphereGeometry(.25,6,4),dustM);d.position.set(C.position.x,C.position.y+.2,C.position.z);d.userData.t=0;X.scene.add(d);ev.dust.push(d)}for(let i=ev.dust.length-1;i>=0;i--){const d=ev.dust[i];d.userData.t+=dt;d.scale.setScalar(1+d.userData.t*3);d.position.y+=dt*.6;if(d.userData.t>.9){X.scene.remove(d);ev.dust.splice(i,1)}}
   if(P){const dx=P.x-C.position.x,dz=P.z-C.position.z,d=Math.hypot(dx,dz);ev.dist=d;const ahead=Math.sin(ev.head)*dx+Math.cos(ev.head)*dz;if(d<4.2&&ahead>0.4){end(true);return}if(d<4.2&&!ev.warned){ev.warned=1;H.say&&H.say('뒤에서는 못 세워요. 앞쪽으로 돌아가 가로막아요!',3)}}
   ev.hudT=(ev.hudT||0)-dt;if(ev.hudT<=0){ev.hudT=.4;E.hudDraw()}
   if(ev&&ev.t<=0)end(false)}}catch(e){}requestAnimationFrame(loop)};requestAnimationFrame(loop);
 return{active:()=>!!ev,target:()=>ev?ev.C.position:null,hud:()=>!ev?'':`<br><span style="color:#ff9a7a">수레 추격: ${Math.round(ev.dist||0)}m · 남은 ${Math.max(0,Math.ceil(ev.t))}초 · 앞을 막아요</span>`,
  test:{start:()=>{const j=pick();if(j)start(j);return!!j},state:()=>ev&&{t:ev.t,dist:ev.dist,c:[ev.C.position.x,ev.C.position.z],head:ev.head}}}}
