/* 태백 철암역 탄광 마당(2026-11-21): 스케치팹 lacomi1975 드론 사진 측량(CC BY 4.0) 「Traces of the coal mine at Cheoram Station(철암역)」에서 역 둘레 약 280×260m를 잘라 실제 크기 그대로(측량 좌표 m).
   철암역 선탄시설(등록문화유산): 1930년대에 지은 우리나라 첫 무연탄 선탄장. 캐낸 석탄에서 돌을 골라내고 크기별로 나눠 기차에 실었음. 철암천 위 까치발 건물(철암 탄광역사촌)은 1960~70년대 탄광 마을 살림을 보여 줌.
   놀이: 선탄(흐르는 석탄 가운데 돌 골라내기), 발굴 탐지, 밤 등(photosite). */
import {photoSite} from './photosite.js';
const SRC='(3D: lacomi1975, Sketchfab, CC BY 4.0)';
export function buildCheoram(opts={}){return photoSite('cheoram',opts,{h0:1,groundY:-12,groundColor:0x4a4a44,
 title:'태백 철암역 탄광',hint:'우리나라 첫 무연탄 선탄장 철암역과 탄광 마을을 드론 실측 그대로 실제 크기로 놓았어요. 흐르는 석탄에서 돌을 골라 봐요. '+SRC,
 quest:{t:'철암 둘러보기',d:'선탄장과 역, 까치발 건물을 실측 그대로 둘러보세요.',steps:[['선탄장','철암역 선탄시설'],['역','철암역 기찻길'],['까치발','까치발 건물']]},
 spawn:{x:23,z:4,yaw:-Math.PI/2},bounds:[-136,136,-126,126],level:'태백',env:{fog:[120,520],groundY:-12.1,noHills:true,sign:{x:26,z:10,y:0,lines:['태백 철암역 탄광','첫 무연탄 선탄장(등록문화유산)','철암천 까치발 건물','드론 실측 3D']}},
 npc:[['science',[[20,8],[28,8],[28,16],[20,16]]]],
 build({G,spots,hAt,THREE}){
  const sp=(x,z,r,t,h)=>spots.push({x,y:hAt(x,z),z,r,t,h});
  sp(-60,-6,5,'철암역 선탄시설','1935년 무렵 지은 우리나라 첫 무연탄 선탄장이에요(등록문화유산). 탄광에서 캐낸 석탄을 높은 컨베이어로 끌어올려 돌을 골라내고 크기별로 나눠 기차에 실었어요. 지금도 석탄을 다뤄요. '+SRC);
  sp(-14,8,4,'철암역 기찻길','1940년 영암선(지금 영동선) 철길이 놓이며 철암역이 열렸어요. 석탄을 실은 화차가 이곳에서 전국으로 떠났어요.');
  sp(58,-46,4,'까치발 건물','철암천 위로 기둥을 세워 내단 가게·살림집이에요. 땅이 모자라 물 위까지 집을 넓혔어요. 지금은 「철암 탄광역사촌」으로 남아 그때 광부들의 삶을 보여 줘요.');
  sp(80,20,3,'철암천','석탄 가루가 섞여 물이 검게 흘렀다고 해요. 지금은 맑아졌어요.');
  sp(110,24,4,'탄광 마을','산비탈을 따라 광부 가족이 모여 살던 마을이에요. 1980년대에는 철암에만 수만 명이 살았어요.');
  /* 선탄(11/21): 컨베이어 위로 흐르는 석탄 가운데 회색 돌만 눌러 골라내요. 석탄을 누르면 실수. 돌을 놓치면 감점. 돌 20개, 70초 */
  const BX=14,BZ=-14;
  window.__CRSORT=()=>{if(document.getElementById('crP'))return;const H3=window.__H3,ctx=H3.ctx();const by=hAt(BX,BZ);try{H3.tp(BX+3.2,BZ+3,0)}catch(e){}
   const g=new THREE.Group();g.position.set(BX,by,BZ);g.rotation.y=-Math.PI/2;G.add(g);const belt=new THREE.Mesh(new THREE.BoxGeometry(9,.1,1.4),new THREE.MeshStandardMaterial({color:0x2a2a2a,roughness:.9}));belt.position.y=1;g.add(belt);for(const s of[-1,1]){const rl=new THREE.Mesh(new THREE.BoxGeometry(9,.25,.1),new THREE.MeshStandardMaterial({color:0x5a6a7a,metalness:.4}));rl.position.set(0,1.1,s*.75);g.add(rl)}for(const dx of[-4,0,4]){const lg=new THREE.Mesh(new THREE.BoxGeometry(.15,1,.15),new THREE.MeshStandardMaterial({color:0x5a6a7a}));lg.position.set(dx,.5,0);g.add(lg)}
   const CAM=[BX,by+7.4,BZ+8.6,BX,by+.6,BZ-.4,55];window.__GCAM=()=>document.getElementById('crP')?CAM:null;
   const coalM=new THREE.MeshStandardMaterial({color:0x141414,roughness:.5,metalness:.2}),rockM=new THREE.MeshStandardMaterial({color:0x9a968c,roughness:1});
   const items=[];let spawnT=0,got=0,bad=0,lost=0,done=false,t0=performance.now()/1000,last=t0;const N=20,TL=70;
   const d=document.createElement('div');d.id='crP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1c1c1e;border:3px solid #8a8a90;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eeeef0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
   d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#d0d0d8">⛏️ 선탄</b><div id="crS" style="font:19px 'Do Hyeon',sans-serif;margin:4px 0">돌 0 / ${N}</div><div id="crG" style="font-size:13px;color:#d0d0d8">회색 돌만 눌러 골라내요. 까만 석탄은 그대로!</div><div id="crT" style="font-size:13px;margin-top:4px">${TL}초</div>`;
   const Sx=d.querySelector('#crS'),Gd=d.querySelector('#crG'),T=d.querySelector('#crT');
   const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
   const add=()=>{const rock=Math.random()<.38;const m=new THREE.Mesh(new THREE.DodecahedronGeometry(rock?.2:.17,0),rock?rockM:coalM);m.scale.set(1,.7+Math.random()*.4,1);m.rotation.set(Math.random()*3,Math.random()*3,0);m.position.set(-4.4,1.2,(Math.random()-.5)*1);g.add(m);items.push({m,rock,dead:false})};
   const pc=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.1,500);
   const hit=it=>{if(done||!it||it.dead)return;it.dead=true;g.remove(it.m);if(it.rock){got++;snd(880,.1,'square');Sx.textContent='돌 '+got+' / '+N;Gd.textContent='좋아요! 돌을 골라냈어요';if(got>=N)fin()}else{bad++;snd(180,.25,'sawtooth');Gd.textContent='앗, 그건 석탄이에요!'}};
   const pick=(cx,cy)=>{pc.aspect=innerWidth/innerHeight;pc.updateProjectionMatrix();pc.position.set(CAM[0],CAM[1],CAM[2]);pc.lookAt(CAM[3],CAM[4],CAM[5]);pc.updateMatrixWorld();let best=null,bd=1e9;for(const it of items){if(it.dead)continue;const p=new THREE.Vector3();it.m.getWorldPosition(p);const q=p.project(pc);const dd=Math.hypot((q.x+1)/2*innerWidth-cx,(1-q.y)/2*innerHeight-cy);if(dd<bd){bd=dd;best=it}}if(best&&bd<Math.max(36,innerWidth*.045))hit(best)};
   const onDown=e=>{if(e.target.closest&&e.target.closest('#crP'))return;pick(e.clientX,e.clientY)};addEventListener('pointerdown',onDown);
   const cleanup=()=>{removeEventListener('pointerdown',onDown);G.remove(g)};
   const fin=()=>{if(done)return;done=true;cleanup();const el=performance.now()/1000-t0;const Q=got>=N?Math.max(60,Math.round(100-bad*4-lost*3-Math.max(0,el-45)*.6)):Math.round(got/N*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('cheoram_sort',Q,'철암 선탄')}catch(e){}window.__CRQ=Q;
    d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#d0d0d8">돌 ${got}개를 골라냈어요</b><div style="font-size:13px;margin:4px 0">선탄부는 쉴 새 없이 흐르는 석탄에서 돌(경석)을 손으로 골라냈어요. 고른 석탄은 크기별로 나눠 화차에 실어 전국의 연탄 공장으로 보냈어요.</div><div style="font-size:26px;color:#c0c0c8">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c0c0c8;color:#1c1c1e;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eeeef0;border:2px solid #eeeef0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__CRSORT()};d.querySelector('[data-x]').onclick=()=>d.remove()};
   const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}const now=performance.now()/1000,dt=Math.min(.1,now-last);last=now;
    if(!done){const sp=1.3+Math.min(1.2,(now-t0)/40);spawnT-=dt;if(spawnT<=0){add();spawnT=.45+Math.random()*.35}
     for(const it of items){if(it.dead)continue;it.m.position.x+=sp*dt;if(it.m.position.x>4.4){it.dead=true;g.remove(it.m);if(it.rock){lost++;Gd.textContent='돌을 놓쳤어요!';snd(240,.2)}}}
     const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin()}
    requestAnimationFrame(loop)};loop();
   window.__CRG={hit,items,get got(){return got}};try{ctx.say('흐르는 석탄에서 돌을 골라내요!',2.4)}catch(e){}};
  sp(BX+3.2,BZ+3,2,'선탄 컨베이어','흐르는 석탄에서 돌을 골라내 봐요(선탄).');
  /* 발굴 탐지 */
  const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
  const ITEMS=[
   {n:'광부 안전등',h:'광부가 머리에 쓰던 안전등이에요. 갱도 속 유일한 빛이었어요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.08,.1,.12,12),M(0xd0a030,{metalness:.5}));g.add(m)})},
   {n:'연탄',h:'구멍 뚫린 둥근 연탄이에요. 철암 석탄은 연탄이 되어 집집을 데웠어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,.14,18),M(0x1a1a1a)))})},
   {n:'도시락',h:'양은 도시락이에요. 탄가루가 날아들어 「밥 반, 탄가루 반」이라는 말도 있었어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.22,.07,.14),M(0xc8c8c0,{metalness:.6})))})},
   {n:'곡괭이 날',h:'석탄을 캐던 곡괭이 날이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.3,.03,.05),M(0x4a4a4a,{metalness:.5})))})},
   {n:'화폐(옛 동전)',h:'탄광 마을 가게에서 오가던 옛 동전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.015,18),M(0xb08840,{metalness:.7})))})}];
  window.__CRDIG=()=>{window.__DETECT&&window.__DETECT({key:'cheoram_dig',title:'철암 발굴 탐지',emoji:'⛏️',bg:'#1c1c1e',count:4,TL:150,cand:[[23,20],[30,-40],[40,40],[10,60],[-20,40],[36,-80],[12,-60],[44,70]],items:ITEMS,intro:'탄광 마을 땅속에 그때 사람들의 물건이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'철암은 석탄이 우리 겨울을 데우던 시절의 흔적이 고스란히 남은 마을이에요.'})};
  sp(30,24,2.4,'발굴 탐지 자리','탄광 마을 땅속에 그때 사람들의 물건이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 }})}
