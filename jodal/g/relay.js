/* 무이 나라 조달청: 「파발마 레이스」(전자 계약). 만든 날 2026-11-17
   관아 창의 「파발 레이스」 단추로 시작. 무이가 말에 오르고, 되살린 고을마다 금빛 깃발 고리(빛기둥)가 선다.
   고리를 차례로 지나(4.5m 안) 마지막에 관아로 돌아오면 끝. 길잡이 화살표와 위쪽 진행 표시가 다음 고리를 알려 준다.
   기준 시간(거리÷12m/s+10초) 안이면 별 셋. 끝나면 「종이 계약서를 말로 전하면 이만큼, 전자 계약은 한 번에」 한마디와 「전자 계약」 카드.
   jodal.js 가 setupRelay(env) 로 부른다. env={X,THREE,JOBS,ST,save,hudDraw,ov,SND,esc,home:()=>Vector3|null} */
export function setupRelay(E){const {X,THREE,JOBS}=E;const H=window.__H3;let run=null;
 const ringMesh=(n,last)=>{const g=new THREE.Group();const t=new THREE.Mesh(new THREE.TorusGeometry(2.6,.22,10,40),new THREE.MeshStandardMaterial({color:last?0x4ad07a:0xf2c14e,emissive:last?0x2a8a4a:0xc89a2a,emissiveIntensity:.8,metalness:.5,roughness:.3}));t.position.y=3;g.add(t);
  const beam=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.2,40,16,1,true),new THREE.MeshBasicMaterial({color:last?0x6aff9a:0xffe08a,transparent:true,opacity:.14,side:THREE.DoubleSide,depthWrite:false}));beam.position.y=20;g.add(beam);
  const c=document.createElement('canvas');c.width=c.height=128;const q=c.getContext('2d');q.fillStyle=last?'#2a8a4a':'#8e2b20';q.beginPath();q.arc(64,64,60,0,7);q.fill();q.fillStyle='#fff';q.font='bold 72px sans-serif';q.textAlign='center';q.fillText(last?'終':String(n),64,90);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false}));s.scale.setScalar(1.6);s.position.y=6.4;s.renderOrder=9;g.add(s);g.userData.t=t;return g};
 const start=()=>{if(run)return;const home=E.home&&E.home();const towns=JOBS.filter(j=>E.ST.done[j.k]&&j.sp);if(!home||!towns.length)return false;
  /* 관아에서 가까운 고을부터 이어 가는 길 */const pts=[];let cur=home.clone();const left=towns.slice();while(left.length){left.sort((a,b)=>Math.hypot(a.sp.x-cur.x,a.sp.z-cur.z)-Math.hypot(b.sp.x-cur.x,b.sp.z-cur.z));const j=left.shift();const p=new THREE.Vector3(j.sp.x+3,0,j.sp.z+3);p.y=H.floorAt?(H.floorAt(p.x,p.z,(j.sp.y||0)+6)||0):0;pts.push({p,name:j.city});cur=p}
  pts.push({p:home.clone(),name:'관아',last:1});let dist=0,a=home;for(const q of pts){dist+=Math.hypot(q.p.x-a.x,q.p.z-a.z);a=q.p}const par=Math.round(dist/12+10);
  pts.forEach((q,i)=>{q.g=ringMesh(i+1,q.last);q.g.position.copy(q.p);const nx=pts[i+1]?pts[i+1].p:home;q.g.children[0].rotation.y=Math.atan2(nx.x-q.p.x,nx.z-q.p.z);X.scene.add(q.g);q.g.visible=i===0||i===1});
  run={pts,i:0,t0:performance.now(),par,dist};try{H.setRide&&H.setRide(true)}catch(e){}E.SND.fan();H.say&&H.say(`파발이오! ${pts.length}개 고리를 차례로 지나 관아로 돌아와요. 기준 ${par}초!`,3.5);E.hudDraw();return true};
 const stop=()=>{if(!run)return;for(const q of run.pts)X.scene.remove(q.g);run=null;E.hudDraw()};
 const finish=()=>{const r=run;const sec=(performance.now()-r.t0)/1000;const stars=sec<=r.par?3:sec<=r.par*1.35?2:1;const coins=6+stars*6;const best=E.ST.relay&&E.ST.relay.best;E.ST.relay={best:best?Math.min(best,sec):sec,stars:Math.max((E.ST.relay&&E.ST.relay.stars)||0,stars)};E.ST.coins+=coins;E.ST.cards=E.ST.cards||{};E.ST.cards.econtract=1;E.save();E.SND.fan();stop();
  const u=E.ov();u.c.innerHTML=`<h2>파발 도착! ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</h2><div>${r.pts.length}개 고리 · ${Math.round(r.dist)}m를 <b>${sec.toFixed(1)}초</b>에 달렸어요(기준 ${r.par}초${best?` · 가장 빠른 기록 ${Math.min(best,sec).toFixed(1)}초`:''}). 엽전 ${coins}냥.</div>
   <div class="jd-tip">조달청 한마디: 옛날엔 계약서를 말로 날라 며칠씩 걸렸어요. 오늘은 <b>나라장터 전자 계약</b>으로 서명한 계약서가 곧바로 닿고, 기록도 남아 누구나 확인할 수 있어요. 「전자 계약」 카드가 열렸어요.</div><div style="margin-top:12px"><button type="button" class="jd-btn" data-ok>좋아요</button></div>`;u.c.querySelector('[data-ok]').onclick=u.close};
 let last=performance.now(),lastSec=0;const loop=()=>{const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;try{if(run&&H.P){const P=H.P;const q=run.pts[run.i];
  for(const r of run.pts)if(r.g.visible)r.g.userData.t.rotation.z+=dt*.8;
  if(Math.hypot(P.x-q.p.x,P.z-q.p.z)<4.5){E.SND.coin();X.scene.remove(q.g);run.i++;if(run.i>=run.pts.length){finish()}else{const n=run.pts[run.i+1];if(n)n.g.visible=true;H.say&&H.say(`${q.name} 통과! ${run.pts.length-run.i}개 남았어요.`,1.6);E.hudDraw()}}
  if(run&&((now/1000)|0)!==lastSec){lastSec=(now/1000)|0;E.hudDraw()}}}catch(e){}requestAnimationFrame(loop)};requestAnimationFrame(loop);
 return{active:()=>!!run,start,stop,hud:()=>run?`<br><span style="color:#ffe08a">파발 ${run.i+1} / ${run.pts.length} · ${((performance.now()-run.t0)/1000).toFixed(0)}초 (기준 ${run.par}초)</span>`:'',target:()=>run?run.pts[run.i].p:null,
  test:{start,stop,state:()=>run&&{i:run.i,n:run.pts.length,par:run.par,pts:run.pts.map(q=>[q.p.x,q.p.z])}}}}
