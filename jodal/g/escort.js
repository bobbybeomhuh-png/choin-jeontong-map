/* 무이 나라 조달청: 「국보 순회 전시 호송」(물품 관리전환). 만든 날 2026-11-17
   관아 창의 「순회 전시 호송」 단추로 시작. 되살린 국보 하나를 실은 수레(붉은 비단·바퀴)가 무이 뒤를 따라온다.
   목적지: 다른 되살린 고을의 방(빛기둥). 가는 길에 도굴꾼 그림자(검은 무이)가 몇 초마다 나타나 수레로 달려든다.
   무이가 몸으로 부딪히면(2m) 연기와 함께 달아난다. 도굴꾼이 수레에 닿으면 수레가 한 번 털린다(셋이면 실패).
   목적지 방 6m 안에 수레와 함께 닿으면 성공: 엽전, 「물품 관리전환」 카드. 위쪽 진행 표시와 길잡이 화살표 연결.
   jodal.js 가 setupEscort(env) 로 부른다. env={X,THREE,JOBS,ST,save,hudDraw,ov,SND,esc} */
export function setupEscort(E){const {X,THREE,JOBS}=E;const H=window.__H3;let run=null;
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.8},o));
 const fy=(x,z,y)=>{try{const v=H.floorAt?H.floorAt(x,z,(y||0)+8):0;return isFinite(v)?v:(y||0)}catch(e){return y||0}};
 const cart=()=>{const g=new THREE.Group();const bed=new THREE.Mesh(new THREE.BoxGeometry(1.4,.25,2),M(0x7a5232));bed.position.y=.55;bed.castShadow=true;g.add(bed);
  for(const[x,z]of[[-.75,-.6],[.75,-.6],[-.75,.6],[.75,.6]]){const w=new THREE.Mesh(new THREE.TorusGeometry(.32,.07,8,16),M(0x4a2a14));w.rotation.y=Math.PI/2;w.position.set(x,.33,z);g.add(w)}
  const box=new THREE.Mesh(new THREE.BoxGeometry(1.1,.7,1.3),M(0xb8322a,{roughness:.5}));box.position.y=1.03;box.castShadow=true;g.add(box);const knot=new THREE.Mesh(new THREE.TorusGeometry(.18,.05,8,16),M(0xf2c14e,{metalness:.6}));knot.position.set(0,1.42,0);knot.rotation.x=Math.PI/2;g.add(knot);
  const pole=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,1.6,6),M(0x5a3a22));pole.position.set(.6,1.6,-.8);g.add(pole);const fl=new THREE.Mesh(new THREE.PlaneGeometry(.6,.4),new THREE.MeshStandardMaterial({color:0x2a4a9a,side:THREE.DoubleSide}));fl.position.set(.9,2.2,-.8);g.add(fl);X.scene.add(g);return g};
 const beam=(p)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(2.2,2.2,30,16,1,true),new THREE.MeshBasicMaterial({color:0x8ad0ff,transparent:true,opacity:.18,side:THREE.DoubleSide,depthWrite:false}));m.position.set(p.x,p.y+15,p.z);X.scene.add(m);return m};
 const puff=(p)=>{for(let k=0;k<8;k++){const s=new THREE.Mesh(new THREE.SphereGeometry(.3,8,6),new THREE.MeshBasicMaterial({color:0x888888,transparent:true,opacity:.6,depthWrite:false}));s.position.set(p.x+(Math.random()-.5),p.y+.6+Math.random()*.8,p.z+(Math.random()-.5));X.scene.add(s);const t0=performance.now();const f=()=>{const k2=(performance.now()-t0)/700;if(k2>=1){X.scene.remove(s);return}s.scale.setScalar(1+k2*2);s.material.opacity=.6*(1-k2);s.position.y+=.01;requestAnimationFrame(f)};f()}};
 const start=()=>{if(run)return false;const towns=JOBS.filter(j=>E.ST.done[j.k]&&j.sp);if(towns.length<2)return false;const P=H.P;
  /* 출발: 무이 곁, 목적지: 무이에서 알맞게 먼(60~250m) 되살린 고을 */const ds=towns.map(j=>({j,d:Math.hypot(j.sp.x-P.x,j.sp.z-P.z)})).sort((a,b)=>Math.abs(a.d-140)-Math.abs(b.d-140));const dest=ds[0].j;const item=towns.find(j=>j!==dest)||towns[0];
  const c=cart();c.position.set(P.x+1.5,P.y,P.z+2.5);const dp=new THREE.Vector3(dest.sp.x,fy(dest.sp.x,dest.sp.z,dest.sp.y),dest.sp.z);
  run={c,dest,item,dp,b:beam(dp),hp:3,thieves:[],spawn:6,t0:performance.now(),scared:0};E.SND.fan();H.say&&H.say(`${item.city}의 국보를 ${dest.city} 전시관까지! 수레를 노리는 도굴꾼을 쫓아내요.`,3.5);E.hudDraw();return true};
 const stop=()=>{if(!run)return;X.scene.remove(run.c);X.scene.remove(run.b);for(const t of run.thieves)X.scene.remove(t.m.root);run=null;E.hudDraw()};
 const end=(ok)=>{const r=run;const sec=(performance.now()-r.t0)/1000;stop();const u=E.ov();
  if(ok){const stars=r.hp===3?3:r.hp===2?2:1;const coins=8+stars*7;E.ST.coins+=coins;E.ST.cards=E.ST.cards||{};E.ST.cards.transfer=1;E.ST.escort=Math.max(E.ST.escort||0,stars);E.save();E.SND.fan();
   u.c.innerHTML=`<h2>순회 전시 도착! ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</h2><div>${r.item.city}의 ${E.esc(r.item.n)}${((r.item.n.charCodeAt(r.item.n.length-1)-0xac00)%28)?'이':'가'} ${r.dest.city} 전시관에 무사히 닿았어요. 도굴꾼 ${r.scared}명을 쫓아냈고, 수레는 ${3-r.hp}번 털렸어요(${sec.toFixed(0)}초). 엽전 ${coins}냥.</div><div class="jd-tip">조달청 한마디: 나라가 가진 물품은 등록해 관리하고, 쓰임이 바뀌면 필요한 다른 기관으로 옮겨 다시 써요(<b>물품 관리전환</b>). 새로 사지 않고 아껴 쓰는 나라 살림이에요. 「물품 관리전환」 카드가 열렸어요.</div>`}
  else u.c.innerHTML=`<h2>수레가 세 번 털렸어요</h2><div>도굴꾼들이 수레를 흔들어 놓아 전시를 미뤘어요. 관아에서 다시 맡아 볼까요? 도굴꾼이 수레에 닿기 전에 몸으로 부딪혀 쫓아내요.</div>`;
  u.c.innerHTML+=`<div style="margin-top:12px"><button type="button" class="jd-btn" data-ok>좋아요</button></div>`;u.c.querySelector('[data-ok]').onclick=u.close};
 let last=performance.now(),sec=0;const loop=()=>{const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;try{if(run&&H.P){const r=run,P=H.P,c=r.c;
  /* 수레: 무이 뒤 3m를 따라감 */const dx=P.x-c.position.x,dz=P.z-c.position.z,d=Math.hypot(dx,dz);if(d>3){const sp=Math.min((d-3)*2.5,H.RIDE?13:6.5);c.position.x+=dx/d*sp*dt;c.position.z+=dz/d*sp*dt;c.rotation.y=Math.atan2(dx,dz);for(const w of c.children)if(w.geometry&&w.geometry.type==='TorusGeometry'&&w.rotation.y)w.rotation.x+=sp*dt*2}if(d>40){c.position.set(P.x-2,P.y,P.z-2)}
  const gy=fy(c.position.x,c.position.z,P.y);c.position.y+=(gy-c.position.y)*Math.min(1,dt*8);c.rotation.z=Math.sin(now/120)*.02;
  /* 도굴꾼 */r.spawn-=dt;if(r.spawn<=0&&r.thieves.length<2&&H.makeMuui){r.spawn=7+Math.random()*4;const a=Math.random()*Math.PI*2,R=14;const x=c.position.x+Math.cos(a)*R,z=c.position.z+Math.sin(a)*R;const th={m:null,loading:1};r.thieves.push(th);H.makeMuui('base',1.05).then(m=>{if(!run){X.scene.remove(m.root);return}m.root.traverse(o=>{if(o.isMesh){o.material=o.material.clone();o.material.color&&o.material.color.setHex(0x1a1a22);o.material.emissive&&o.material.emissive.setHex(0x000000)}});m.root.position.set(x,fy(x,z,P.y),z);X.scene.add(m.root);m.play('run');th.m=m;th.loading=0}).catch(()=>{th.dead=1})}
  for(const th of r.thieves){if(!th.m||th.dead)continue;const m=th.m;m.mx.update(dt);const tp=m.root.position;const vx=c.position.x-tp.x,vz=c.position.z-tp.z,vd=Math.hypot(vx,vz);tp.x+=vx/vd*3.6*dt;tp.z+=vz/vd*3.6*dt;tp.y+=(fy(tp.x,tp.z,tp.y)-tp.y)*Math.min(1,dt*8);m.root.rotation.y=Math.atan2(vx,vz);
   if(Math.hypot(P.x-tp.x,P.z-tp.z)<2){puff(tp);X.scene.remove(m.root);th.dead=1;r.scared++;E.SND.coin();H.say&&H.say('도굴꾼을 쫓아냈어요!',1.4)}
   else if(vd<1.5){puff(tp);X.scene.remove(m.root);th.dead=1;r.hp--;E.SND.paper();c.rotation.z=.3;H.say&&H.say(`수레가 털렸어요! 남은 짐 ${r.hp} / 3`,2);E.hudDraw();if(r.hp<=0){end(false);return requestAnimationFrame(loop)}}}
  r.thieves=r.thieves.filter(t=>!t.dead);
  if(Math.hypot(c.position.x-r.dp.x,c.position.z-r.dp.z)<6&&Math.hypot(P.x-r.dp.x,P.z-r.dp.z)<8){end(true);return requestAnimationFrame(loop)}
  if(((now/1000)|0)!==sec){sec=(now/1000)|0;E.hudDraw()}}}catch(e){}requestAnimationFrame(loop)};requestAnimationFrame(loop);
 return{active:()=>!!run,start,stop,hud:()=>run?`<br><span style="color:#ffb8a8">호송: ${run.item.city} 국보 → ${run.dest.city} · 수레 ${'■'.repeat(run.hp)}${'□'.repeat(3-run.hp)} · 쫓아냄 ${run.scared}</span>`:'',target:()=>run?run.dp:null,
  test:{start,stop,state:()=>run&&{dest:[run.dp.x,run.dp.z],cart:[run.c.position.x,run.c.position.z],hp:run.hp,scared:run.scared,thieves:run.thieves.filter(t=>t.m).map(t=>[t.m.root.position.x,t.m.root.position.z])}}}}
