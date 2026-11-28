/* 인천 마당(2026-11-22, W52): 개항장 거리와 팔미도 등대, 인천항 갑문.
   공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   인천 앞바다는 밀물·썰물 높이 차가 9m 안팎으로 매우 커서, 1974년 갑문(배가 드나드는 물 계단)을 만들어 안쪽 항구 물 높이를 늘 높게 유지함.
   개항장(1883 개항): 청·일 조계지 경계 계단, 옛 은행 건물, 붉은 중국식 건물. 팔미도 등대(1903, 우리나라 첫 근대 등대).
   놀이: 갑문 배 넘기기(물 높이를 맞춰 문을 열고 배를 바다↔안쪽 항구로 넘기기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildIncheon(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1883);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[50,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(600,800),new THREE.MeshStandardMaterial({color:0xa8a49a,roughness:1}));gr.material.userData.finKind='bakseok';/* 11/28: 결 없는 회색 판 → 돌 포장 사진 결 */gr.rotation.x=-Math.PI/2;gr.position.x=-275;gr.receiveShadow=true;G.add(gr)}
 const at=(m,x,y,z)=>{m.position.set(x,y,z);return m};const CON=M(0x9a9690),WATER=()=>M(0x2a6a8a,{roughness:.2,metalness:.1});
 /* 갑문: x 30~40, z -30~10 갑실. 바다는 z<-30, 안쪽 항구는 z>10. 물 높이(m, 0~9)는 y=높이-10으로 보임 */const LX0=30,LX1=40,LZ0=-30,LZ1=10;const Y=h=>h-10;
 const seaM=new THREE.Mesh(new THREE.PlaneGeometry(400,400),WATER());seaM.rotation.x=-Math.PI/2;seaM.position.set(225,0,-230);G.add(seaM);
 const dockM=new THREE.Mesh(new THREE.PlaneGeometry(400,400),WATER());dockM.rotation.x=-Math.PI/2;dockM.position.set(225,0,210);G.add(dockM);
 const chM=new THREE.Mesh(new THREE.PlaneGeometry(LX1-LX0,LZ1-LZ0),WATER());chM.rotation.x=-Math.PI/2;chM.position.set((LX0+LX1)/2,0,(LZ0+LZ1)/2);G.add(chM);
 {const fl=new THREE.Mesh(new THREE.PlaneGeometry(400,900),M(0x5a5448));fl.rotation.x=-Math.PI/2;fl.position.set(225,-12,0);G.add(fl);
  const blk=(x0,x1,z0,z1)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(x1-x0,12,z1-z0),CON);b.position.set((x0+x1)/2,-6,(z0+z1)/2);G.add(b)};blk(25,LX0,LZ0,LZ1);blk(LX1,425,LZ0,LZ1);blk(25,LX0,-430,LZ0);blk(25,LX0,LZ1,410);
  /* 난간 */for(const[x,z0,z1]of[[25,-100,100]]){const rl=new THREE.Mesh(new THREE.BoxGeometry(.1,.1,z1-z0),M(0xd8d0c0));rl.position.set(x-.3,1,(z0+z1)/2);G.add(rl);for(let z=z0;z<=z1;z+=4){const p=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,1,5),M(0xd8d0c0));p.position.set(x-.3,.5,z);G.add(p)}}}
 const mkGate=z=>{const g=new THREE.Mesh(new THREE.BoxGeometry(LX1-LX0,12,1),M(0x5a6a7a,{metalness:.4,roughness:.5}));g.position.set((LX0+LX1)/2,-6,z);G.add(g);return g};const gSea=mkGate(LZ0),gDock=mkGate(LZ1);
 /* 배 */const mkShip=c=>{const g=new THREE.Group();const h=new THREE.Mesh(new THREE.BoxGeometry(5,1.6,14),M(c));h.position.y=.4;g.add(h);const bw=new THREE.Mesh(new THREE.ConeGeometry(2.5,4,4),M(c));bw.rotation.x=Math.PI/2;bw.rotation.y=Math.PI/4;bw.scale.set(1,1,.6);g.add(bw);const cb=new THREE.Mesh(new THREE.BoxGeometry(3.6,2.2,4),M(0xf0ece4));cb.position.set(0,2.3,-3);g.add(cb);const fn=new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,1.6,10),M(0xc83a2a));fn.position.set(0,4.2,-3);g.add(fn);g.userData.bow=bw;return g};
 /* 개항장 거리(서쪽) */const KX=-30;{const bank=new THREE.Group();bank.position.set(KX,0,-20);bank.add(at(new THREE.Mesh(new THREE.BoxGeometry(12,6,9),M(0xe8e0d0)),0,3,0));const dome=new THREE.Mesh(new THREE.SphereGeometry(2.4,16,8,0,Math.PI*2,0,Math.PI/2),M(0x4a6a6a,{metalness:.3}));dome.position.y=6;bank.add(dome);for(let k=0;k<4;k++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,5,10),M(0xf4f0e8));c.position.set(-3+k*2,2.5,4.7);bank.add(c)}G.add(bank);solids.push({x0:KX-6,x1:KX+6,y0:0,y1:6,z0:-24.5,z1:-15.5});
  const ch=new THREE.Group();ch.position.set(KX,0,12);ch.add(at(new THREE.Mesh(new THREE.BoxGeometry(12,7,9),M(0xb83a2a)),0,3.5,0));for(let k=0;k<5;k++){const w=new THREE.Mesh(new THREE.BoxGeometry(1.2,1.6,.1),M(0xe8c040));w.position.set(-4.4+k*2.2,4.6,4.55);ch.add(w)}const sg=new THREE.Mesh(new THREE.BoxGeometry(6,1,.2),M(0x2a2a2a));sg.position.set(0,7.6,4.5);ch.add(sg);for(const sx of[-5,5]){const l=new THREE.Mesh(new THREE.SphereGeometry(.45,10,8),M(0xe83a2a,{emissive:0x501010}));l.scale.y=1.3;l.position.set(sx,4,5);ch.add(l)}G.add(ch);solids.push({x0:KX-6,x1:KX+6,y0:0,y1:8,z0:7.5,z1:16.5});
  /* 청·일 조계지 경계 계단 */const st=new THREE.Group();st.position.set(KX-16,0,-2);for(let k=0;k<12;k++){const s=new THREE.Mesh(new THREE.BoxGeometry(4,.3,1),M(0xb8b0a0));s.position.set(0,.15+k*.3,-k);st.add(s)}for(const sx of[-2.4,2.4])for(let k=0;k<4;k++){const lm=new THREE.Mesh(new THREE.BoxGeometry(.4,1.2,.4),M(0x9a9488));lm.position.set(sx,.6+k*.9,-k*3);st.add(lm)}G.add(st)}
 /* 팔미도 등대: 남쪽 바다 작은 섬 */const PX=82,PZ=-80;{const isl=new THREE.Mesh(new THREE.SphereGeometry(8,16,8,0,Math.PI*2,0,Math.PI/2),M(0x5a6a3a,{roughness:1}));isl.scale.y=1.65;isl.position.set(PX,-12,PZ);G.add(isl);const lh=new THREE.Mesh(new THREE.CylinderGeometry(.9,1.3,7.9,12),M(0xf4f4f0));lh.position.set(PX,1.2+3.95,PZ);G.add(lh);const top=new THREE.Mesh(new THREE.CylinderGeometry(1,1,1.2,12),M(0xfff0c0,{emissive:0x403010}));top.position.set(PX,1.2+8.5,PZ);G.add(top);const cap=new THREE.Mesh(new THREE.ConeGeometry(1.2,1,12),M(0x2a2a2a));cap.position.set(PX,1.2+9.6,PZ);G.add(cap)}
 const beam=new THREE.PointLight(0xfff0c0,0,60,1.2);beam.position.set(PX,10.5,PZ);G.add(beam);
 const NL=[];if(!mini){for(const[x,y,z]of[[KX,4,-14],[KX,4,18],[20,3,-10]]){const L=new THREE.PointLight(0xffc080,0,26,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0,tt=0,tideT=0;let S=4.5,C=8,D=8;const tide=()=>4.5+4.3*Math.sin(tideT*.11);
 const nightTick=dt=>{tt+=dt;const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8);beam.intensity=nk*(Math.sin(tt*2)>.6?30:2);if(!document.getElementById('icP')){tideT+=dt;S=tide()}seaM.position.y=Y(S);dockM.position.y=Y(D);chM.position.y=Y(C)};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(20,-10,3.4,'인천항 갑문','인천 앞바다는 밀물과 썰물의 높이 차가 9m나 돼요. 그래서 안쪽 항구를 문으로 막아 물을 늘 높게 두고, 배는 갑실에서 물 높이를 맞춘 뒤 드나들어요(1974년 완공). 간추려 지었어요.');
 sp(20,0,2.4,'갑문 다루는 자리','물 높이를 맞춰 문을 열고 배를 넘겨 봐요.');
 sp(KX,-12,3,'개항장 옛 은행','1883년 인천항이 열린 뒤 외국 은행과 상점이 들어섰어요. 둥근 지붕 서양식 은행 건물을 간추려 지었어요.');
 sp(KX,20,3,'붉은 중국 거리','청나라 조계지였던 거리에 중국 사람들이 살며 음식점을 열었어요. 짜장면이 여기서 처음 팔렸다고 해요.');
 sp(KX-16,2,2.6,'조계지 경계 계단','계단 왼쪽은 청나라, 오른쪽은 일본 조계지였어요. 양쪽 석등 모양이 달라요.');
 sp(20,-60,3,'팔미도 등대','1903년 불을 밝힌 우리나라 첫 근대 등대예요(높이 7.9m). 밤에 깜빡이는 불빛을 봐요.');
 sp(-50,50,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 갑문 배 넘기기(11/22): 75초. 바다 물 높이는 밀물·썰물로 오르내려요(0~9m). 안쪽 항구는 늘 8m. 문은 갑실 물 높이와 그쪽 물 높이가 0.3m 안으로 같을 때만 열려요. 두 문이 다 닫혔을 때 「물 채우기」(안쪽 항구 물을 받아 8m까지) / 「물 빼기」(바다 높이까지). 문이 열리면 기다리던 배가 들어오고, 반대쪽 문이 열리면 나가요 */
 window.__ICLOCK=()=>{if(document.getElementById('icP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(20,0,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('icP')?[8,22,-34,36,-6,-10,50]:null;
  const TL=75;let t=0,last=performance.now(),done=false,auto=false,oSea=false,oDock=false,mode=0,passed=0,miss=0,msg='';C=S;let ship=null,shipSt='wait',shipDir=1,shipT=0;const ships=[];
  const newShip=()=>{shipDir=passed%2===0?1:-1;ship=mkShip([0x2a5a8a,0x8a3a2a,0x3a7a3a,0x7a5a2a][passed%4]);ship.rotation.y=shipDir>0?0:Math.PI;G.add(ship);ships.push(ship);shipSt='wait';shipT=0};newShip();
  const d=document.createElement('div');d.id='icP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:12px;z-index:60;background:#16222e;border:3px solid #8ab8d8;border-radius:16px;padding:8px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#eef4f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:320px;max-width:96vw;user-select:none";document.body.appendChild(d);
  const B=(k,l)=>`<button data-k="${k}" style="flex:1;font:14px 'Do Hyeon',sans-serif;background:#3a6a8a;color:#fff;border:0;border-radius:10px;padding:8px 2px;cursor:pointer">${l}</button>`;
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#bfe0f4">⚓ 갑문 배 넘기기</b><div data-i style="margin:3px 0;font:14px 'Do Hyeon',sans-serif"></div><div data-l style="display:flex;gap:4px;margin:4px 0;align-items:flex-end;height:64px"></div><div style="display:flex;gap:5px">${B('s','바다 쪽 문')}${B('d','항구 쪽 문')}</div><div style="display:flex;gap:5px;margin-top:5px">${B('f','물 채우기 ⬆')}${B('e','물 빼기 ⬇')}</div><div data-m style="font-size:12px;color:#f8e8a0;margin-top:4px;min-height:16px"></div>`;
  const iEl=d.querySelector('[data-i]'),lEl=d.querySelector('[data-l]'),mEl=d.querySelector('[data-m]');
  const snd=(f,len,type='sine')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const gate=side=>{if(done)return;if(side==='s'){if(oSea){oSea=false;snd(300,.15);msg='바다 쪽 문을 닫았어요';return}if(oDock){msg='항구 쪽 문을 먼저 닫아요';return}if(Math.abs(C-S)>.3){miss++;snd(160,.2,'square');msg=`물 높이가 달라요! 갑실 ${C.toFixed(1)}m, 바다 ${S.toFixed(1)}m`;return}oSea=true;mode=0;snd(500,.15);msg='바다 쪽 문을 열었어요'}else{if(oDock){oDock=false;snd(300,.15);msg='항구 쪽 문을 닫았어요';return}if(oSea){msg='바다 쪽 문을 먼저 닫아요';return}if(Math.abs(C-D)>.3){miss++;snd(160,.2,'square');msg=`물 높이가 달라요! 갑실 ${C.toFixed(1)}m, 항구 ${D.toFixed(1)}m`;return}oDock=true;mode=0;snd(500,.15);msg='항구 쪽 문을 열었어요'}};
  const water=m=>{if(done)return;if(oSea||oDock){msg='문을 닫아야 물을 옮길 수 있어요';return}mode=m;snd(m>0?620:380,.12);msg=m>0?'안쪽 항구 물을 받아요':'바다로 물을 빼요'};
  d.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{const k=b.dataset.k;if(k==='s'||k==='d')gate(k);else water(k==='f'?1:-1)});
  const zWait=dir=>dir>0?LZ0-12:LZ1+12,zIn=(LZ0+LZ1)/2,zOut=dir=>dir>0?LZ1+16:LZ0-16;
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.1,(now-last)/1000);last=now;t+=dt;tideT+=dt;S=tide();
   if(oSea)C=S;else if(oDock)C=D;else if(mode>0){C=Math.min(D,C+dt*1.2);if(C>=D)mode=0}else if(mode<0){C=Math.max(S,C-dt*1.2);if(C<=S+.001)mode=0}
   gSea.visible=!oSea;gDock.visible=!oDock;
   if(ship){const from=shipDir>0?'s':'d',to=shipDir>0?'d':'s';const lv=z=>z<LZ0?S:z>LZ1?D:C;
    if(shipSt==='wait'){ship.position.set((LX0+LX1)/2,Y(lv(zWait(shipDir)))+.2,zWait(shipDir));if((from==='s'&&oSea)||(from==='d'&&oDock)){shipSt='in';shipT=0}}
    else if(shipSt==='in'){shipT+=dt/2.5;const z=zWait(shipDir)+(zIn-zWait(shipDir))*Math.min(1,shipT);ship.position.set((LX0+LX1)/2,Y(lv(z))+.2,z);if(shipT>=1){shipSt='lock';msg='배가 갑실에 들어왔어요. 문을 닫고 물 높이를 맞춰요'}}
    else if(shipSt==='lock'){ship.position.y=Y(C)+.2;if((to==='d'&&oDock)||(to==='s'&&oSea)){shipSt='out';shipT=0}}
    else if(shipSt==='out'){shipT+=dt/2.5;const z=zIn+(zOut(shipDir)-zIn)*Math.min(1,shipT);ship.position.set((LX0+LX1)/2,Y(lv(z))+.2,z);if(shipT>=1){passed++;snd(880,.3);msg=`배 ${passed}척을 넘겼어요!`;const old=ship;setTimeout(()=>{G.remove(old)},1500);newShip()}}}
   if(auto){const from=shipDir>0?'s':'d',to=shipDir>0?'d':'s';const want=shipSt==='wait'?from:shipSt==='lock'?to:null;if(want){const tl=want==='s'?S:D;if(want==='s'&&oDock)gate('d');else if(want==='d'&&oSea)gate('s');else if(!(want==='s'?oSea:oDock)){if(Math.abs(C-tl)<=.25)gate(want);else if(mode===0)water(tl>C?1:-1)}}}
   const bar=(nm,v,c)=>`<div style="flex:1"><div style="height:${Math.max(2,v/9*46)}px;background:${c};border-radius:4px 4px 0 0"></div><div style="font-size:10px">${nm} ${v.toFixed(1)}m</div></div>`;
   lEl.innerHTML=bar('바다',S,'#3a8ac8')+bar('갑실',C,'#5ab0e8')+bar('항구',D,'#2a6a9a');
   iEl.textContent=`${Math.max(0,Math.ceil(TL-t))}초 · 넘긴 배 ${passed}척 · 배는 ${shipDir>0?'바다 → 항구':'항구 → 바다'} · 바다 ${S>4.5?'밀물':'썰물'}`;mEl.textContent=msg;
   if(t>=TL){fin();return}requestAnimationFrame(step)};
  const cleanup=()=>{ships.forEach(s=>G.remove(s));ships.length=0;ship=null;gSea.visible=gDock.visible=true;C=D};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.max(0,Math.min(100,Math.round(passed/5*100)-miss*5));const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('incheon_lock',Q,'갑문 배 넘기기')}catch(e){}window.__ICQ=Q;snd(660,.3);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#bfe0f4">배 ${passed}척을 넘겼어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">갑문은 물 계단이에요. 두 문 사이 갑실의 물을 채우고 빼서 배를 엘리베이터처럼 올리고 내려요. 인천항 갑문 덕분에 썰물 때도 큰 배가 항구에 댈 수 있어요.</div><div style="font-size:24px;color:#8ab8d8">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#8ab8d8;color:#16222e;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f8;border:2px solid #eef4f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__ICLOCK()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__ICG={set auto(v){auto=v},get done(){return done},get passed(){return passed},get miss(){return miss}};try{ctx.say('물 높이를 맞춰 배를 넘겨요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'옛 은화',h:'개항 무렵 오가던 외국 은화예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.02,20),M(0xc8c8c0,{metalness:.8,roughness:.3})))})},
  {n:'유리병 조각',h:'개항장 상점에서 팔던 서양 유리병 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.07,.25,10),M(0x5a8a6a,{roughness:.2,transparent:true,opacity:.8})))})},
  {n:'붉은 벽돌',h:'개항장 건물 벽돌이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.23,.06,.11),M(0xa8483a)))})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__ICDIG=()=>{window.__DETECT&&window.__DETECT({key:'incheon_dig',title:'인천 발굴 탐지',emoji:'⛏️',bg:'#16222e',count:4,TL:150,cand:[[-50,50],[-60,10],[-10,40],[-70,-40],[0,-60],[-40,70],[10,60],[-75,30]],items:ITEMS,intro:'땅속에 개항장 시절 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'인천은 바다로 열린 개항의 도시예요.'})};
 const meta={quest:{t:'인천 둘러보기',d:'갑문과 개항장 거리, 팔미도 등대를 둘러보세요.',steps:[['갑문','인천항 갑문'],['개항장','개항장 옛 은행'],['등대','팔미도 등대']]},
  title:'인천 개항장·갑문·팔미도 등대',hint:'인천 개항장과 갑문, 팔미도 등대를 공개 사진·수치로 간추려 지었어요. 물 높이를 맞춰 배를 넘겨 봐요.',
  ibl:true,env:{groundY:-13,plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-4,z:30,lines:['인천','개항장 거리','갑문 · 팔미도 등대','간추려 지음']}},
  npc:[['science',[[-8,26],[4,26],[4,36],[-8,36]]]],bounds:[-85,24.4,-90,90],level:()=>'인천',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#a8a49a';g.fillRect(0,0,X(25),300);g.fillStyle='#2a6a8a';g.fillRect(X(25),0,300,300);g.fillStyle='#9a9690';g.fillRect(X(40),Z(LZ0),70*S,40*S);g.fillStyle='#e8e0d0';g.fillRect(X(KX-6),Z(-24.5),12*S,9*S);g.fillStyle='#b83a2a';g.fillRect(X(KX-6),Z(7.5),12*S,9*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:34,yaw:Math.PI},size:{}},meta)}
