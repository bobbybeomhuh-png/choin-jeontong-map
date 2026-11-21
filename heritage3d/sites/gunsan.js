/* 군산 근대 거리·뜬다리부두 마당(2026-11-22, W32): 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   옛 군산세관(1908, 등록문화유산): 붉은 벽돌과 화강암, 지붕에 작은 탑 셋을 올린 서양식 건물. 뜬다리부두(부잔교, 등록문화유산): 밀물·썰물 차이가 6m 넘는 군산항에서 물높이를 따라 오르내리도록 1920~30년대 만든 부두.
   일제강점기 군산항은 호남평야의 쌀을 일본으로 실어 내던 곳이어서, 그 시절 건물(옛 조선은행·나가사키18은행·히로쓰 가옥·동국사)이 남아 근대 역사를 보여 줌.
   놀이: 뜬다리 건너기(출렁이는 배와 부두 높이가 맞을 때 손님 건너기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildGunsan(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1899);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 서쪽 거리, 동쪽(x>40) 금강 하구 바다 */const SEA=40;
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#c8c0b0';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=150+(r()*60|0);q.fillStyle=`rgba(${v},${v-6},${v-14},.5)`;q.fillRect(r()*w,r()*h,2,2)}},[50,50]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(160,200),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.position.set(SEA-80,0,0);gr.receiveShadow=true;G.add(gr);const qw=new THREE.Mesh(new THREE.BoxGeometry(2,7,200),M(0x8a8478));qw.position.set(SEA-1,-3.4,0);G.add(qw)}
 const WT=tex(256,256,(q,w,h)=>{q.fillStyle='#5a7a78';q.fillRect(0,0,w,h);for(let i=0;i<220;i++){q.strokeStyle=`rgba(230,245,250,${.08+r()*.12})`;q.lineWidth=1+r()*2;const x=r()*w,y=r()*h;q.beginPath();q.moveTo(x,y);q.lineTo(x+18+r()*20,y);q.stroke()}},[10,10]);WT.wrapS=WT.wrapT=THREE.RepeatWrapping;
 const sea=new THREE.Mesh(new THREE.PlaneGeometry(120,200),new THREE.MeshStandardMaterial({map:WT,roughness:.1,metalness:.2}));sea.rotation.x=-Math.PI/2;sea.position.set(SEA+60,-3,0);G.add(sea);solids.push({x0:SEA+.2,x1:200,y0:-10,y1:20,z0:-200,z1:-4},{x0:SEA+.2,x1:200,y0:-10,y1:20,z0:4,z1:200},{x0:SEA+26,x1:200,y0:-10,y1:20,z0:-4,z1:4});
 /* 뜬다리: 연결 다리 + 물에 뜬 함선(부잔교) */const PX=SEA+14,PZ=0;const pont=new THREE.Group();G.add(pont);{const pb=new THREE.Mesh(new THREE.BoxGeometry(20,2.2,8),M(0x4a5058,{metalness:.3,roughness:.6}));pb.position.y=-1.1;pont.add(pb);const dk=new THREE.Mesh(new THREE.BoxGeometry(20,.12,8),M(0x8a6a48));dk.position.y=.06;pont.add(dk);for(const s of[-1,1]){const rl=new THREE.Mesh(new THREE.BoxGeometry(20,.06,.06),M(0xd0d0d0));rl.position.set(0,1,s*3.9);pont.add(rl)}pont.position.set(PX,-1,PZ)}
 const bridge=new THREE.Mesh(new THREE.BoxGeometry(6,.2,3),M(0x6a6a70,{metalness:.4}));G.add(bridge);
 /* 배(놀이) */const boat=new THREE.Group();{const h=new THREE.Mesh(new THREE.BoxGeometry(12,2,5),M(0x2a4a6a));h.position.y=-.4;boat.add(h);const cab=new THREE.Mesh(new THREE.BoxGeometry(4,2,3.4),M(0xf0ece0));cab.position.set(-2,1.4,0);boat.add(cab);const mast=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,5,6),M(0x5a4a3a));mast.position.set(2,2.5,0);boat.add(mast)}boat.position.set(PX,-1.2,PZ+9.5);G.add(boat);
 /* 옛 군산세관(간추림): 붉은 벽돌 + 화강암 띠 + 탑 셋 */{const BT=tex(256,256,(q,w,h)=>{q.fillStyle='#8a3a2a';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=8)for(let x=-(y/8%2)*8;x<w;x+=16){const v=120+(r()*50|0);q.fillStyle=`rgb(${v},${v*.42|0},${v*.32|0})`;q.fillRect(x+1,y+1,14,6)}},[4,3]);const brick=new THREE.MeshStandardMaterial({map:BT,roughness:.9}),stone=M(0xd8d0c0);
  const C=new THREE.Group();C.position.set(14,0,-24);const body=new THREE.Mesh(new THREE.BoxGeometry(16,6,9),brick);body.position.y=3;C.add(body);for(const y of[.4,3.2,5.9]){const b=new THREE.Mesh(new THREE.BoxGeometry(16.3,.35,9.3),stone);b.position.y=y;C.add(b)}const rf=new THREE.Mesh(new THREE.BoxGeometry(17,.6,10),M(0x3a3e44));rf.position.y=6.4;C.add(rf);const ridge=new THREE.Mesh(new THREE.CylinderGeometry(.01,4.6,2.4,4,1),M(0x3a3e44));ridge.rotation.y=Math.PI/4;ridge.scale.set(1.9,1,1);ridge.position.y=7.8;C.add(ridge);
  for(const x of[-5,0,5]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.5,.6,1.6,8),M(0xd8d0c0));t.position.set(x,9,0);C.add(t);const dm=new THREE.Mesh(new THREE.ConeGeometry(.75,1.4,8),M(0x4a6a6a,{metalness:.3}));dm.position.set(x,10.5,0);C.add(dm)}
  for(let k=0;k<6;k++){const w=new THREE.Mesh(new THREE.BoxGeometry(1.1,1.8,.1),M(0x2a3a4a));w.position.set(-6.2+k*2.5,3.2,4.55);C.add(w)}const dr=new THREE.Mesh(new THREE.BoxGeometry(2,2.6,.1),M(0x4a3020));dr.position.set(0,1.3,4.56);C.add(dr);G.add(C);C.traverse(e=>{if(e.isMesh)cam.push(e)});solids.push({x0:6,x1:22,y0:0,y1:11,z0:-28.5,z1:-19.5})}
 /* 근대 거리: 은행 건물(석조 기둥) + 일본식 2층 가옥 + 동국사 꼴 절 */{const st=M(0xd0c8b8),wd=M(0x5a4a3a),rf=M(0x3a3e44);
  const bank=new THREE.Group();bank.position.set(-14,0,-24);const bb=new THREE.Mesh(new THREE.BoxGeometry(12,7,9),st);bb.position.y=3.5;bank.add(bb);for(let k=0;k<4;k++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.35,.4,5,12),M(0xe8e0d0));c.position.set(-3.6+k*2.4,2.9,4.8);bank.add(c)}const bt=new THREE.Mesh(new THREE.BoxGeometry(12.6,.8,9.6),rf);bt.position.y=7.4;bank.add(bt);G.add(bank);solids.push({x0:-20,x1:-8,y0:0,y1:8,z0:-29,z1:-19});
  const hz=(x,z,ry)=>{const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=ry;const b1=new THREE.Mesh(new THREE.BoxGeometry(9,3,7),M(0xd8c8a8));b1.position.y=1.5;g.add(b1);const r1=new THREE.Mesh(new THREE.BoxGeometry(10,.25,8),rf);r1.position.y=3.1;g.add(r1);const b2=new THREE.Mesh(new THREE.BoxGeometry(7,2.6,5.4),M(0xd8c8a8));b2.position.y=4.5;g.add(b2);const r2=new THREE.Mesh(new THREE.ConeGeometry(5.4,1.8,4),rf);r2.rotation.y=Math.PI/4;r2.scale.set(1.2,1,.85);r2.position.y=6.7;g.add(r2);for(let k=0;k<4;k++){const sl=new THREE.Mesh(new THREE.BoxGeometry(.08,2.4,.06),wd);sl.position.set(-3+k*2,4.5,2.72);g.add(sl)}G.add(g);solids.push({cx:x,cz:z,r:4.8,y0:0,y1:8})};
  hz(-36,-22,0);hz(-36,20,Math.PI);
  const tp=new THREE.Group();tp.position.set(-14,0,24);const tb=new THREE.Mesh(new THREE.BoxGeometry(10,4,8),M(0xe8e0d0));tb.position.y=2;tp.add(tb);const troof=new THREE.Mesh(new THREE.ConeGeometry(8.4,4.2,4),rf);troof.rotation.y=Math.PI/4;troof.scale.set(1,1,.78);troof.position.y=6;tp.add(troof);G.add(tp);solids.push({cx:-14,cz:24,r:6,y0:0,y1:8})}
 const NL=[];if(!mini){for(const[x,y,z]of[[14,4,-18],[-14,4,-18],[PX,2,PZ],[-14,3,18],[-36,3,-16]]){const L=new THREE.PointLight(0xffd8a0,0,22,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0,tt=0,tide=0;const nightTick=dt=>{tt+=dt;const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7;WT.offset.x+=dt*.01;
  if(!window.__GSPLAY){tide=Math.sin(tt*.05)*1.2;sea.position.y=-3+tide;pont.position.y=-1+tide;boat.position.y=-1.2+tide+Math.sin(tt*1.3)*.12;const a=new THREE.Vector3(SEA-1,0,0),b=new THREE.Vector3(PX-10,pont.position.y+.12,0);bridge.position.set((a.x+b.x)/2,(a.y+b.y)/2,0);bridge.rotation.z=Math.atan2(b.y-a.y,b.x-a.x);bridge.scale.x=a.distanceTo(b)/6}};
 nightTick(0);
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(14,-16,3.4,'옛 군산세관','1908년 붉은 벽돌과 화강암으로 지은 서양식 세관이에요(등록문화유산). 지붕의 작은 탑 셋이 특징이에요. 간추려 지었어요.');
 sp(-14,-16,3,'근대 은행 건물','일제강점기 군산항은 호남평야의 쌀을 일본으로 실어 내던 곳이었어요. 그때 은행·회사 건물이 거리에 남아 우리 근대의 아픈 역사를 보여 줘요.');
 sp(-36,-14,2.6,'일본식 가옥','그 시절 들어온 일본식 2층 집이에요. 군산에는 이런 집이 거리째 남아 있어요.');
 sp(-14,16,2.6,'동국사 꼴 절','동국사는 우리나라에 남은 하나뿐인 일본식 절(1913)이에요. 간추려 지었어요.');
 sp(SEA-3,4,2.4,'뜬다리부두','군산항은 밀물과 썰물 차이가 6m가 넘어요. 그래서 물높이를 따라 오르내리는 「뜬다리」를 놓았어요. 출렁이는 배에 손님을 건너게 해 봐요.');
 sp(-30,40,2.4,'발굴 탐지 자리','근대 거리 땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 뜬다리 건너기(11/22): 배와 부잔교가 저마다 출렁여요. 두 높이가 맞을 때(초록) 「건너기」. 어긋날 때 건너면 첨벙! 손님 10명, 60초 */
 window.__GSCROSS=()=>{if(document.getElementById('gsP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(SEA-3,4,0)}catch(e){}window.__GSPLAY=1;
  window.__GCAM=()=>document.getElementById('gsP')?[PX-6,7,PZ+36,PX,0,PZ+4,55]:null;
  const N=10,TL=60,TOL=.25;let n=0,splash=0,done=false,t0=performance.now()/1000,last=t0,ph1=0,ph2=1.7,walker=null;
  const d=document.createElement('div');d.id='gsP';d.style.cssText="position:fixed;right:12px;bottom:130px;z-index:60;background:#1a2428;border:3px solid #6a9aa8;border-radius:16px;padding:10px 14px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#e8f2f4;box-shadow:0 6px 18px rgba(0,0,0,.35);width:220px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#a8d8e8">⚓ 뜬다리 건너기</b><div id="gsS" style="font:18px 'Do Hyeon',sans-serif;margin:4px 0">0 / ${N}명</div><div style="position:relative;height:60px;background:#0e1a1e;border-radius:8px;margin:4px 0"><div id="gsA" style="position:absolute;left:18%;width:22%;height:6px;background:#8a6a48"></div><div id="gsB" style="position:absolute;right:18%;width:22%;height:6px;background:#2a4a6a"></div></div><div id="gsG" style="font-size:12px;color:#a8d8e8">높이가 맞아 초록이 되면 건너요</div><button id="gsX" style="width:100%;font:18px 'Do Hyeon',sans-serif;background:#6a9aa8;color:#1a2428;border:0;border-radius:12px;padding:10px 0;cursor:pointer;margin-top:4px">🚶 건너기</button><div id="gsT" style="font-size:13px;margin-top:4px">${TL}초</div>`;
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  let hp=0,hb=0;const gap=()=>hb-hp;
  const cross=()=>{if(done||walker)return;if(Math.abs(gap())<=TOL){n++;snd(700+n*30,.15);d.querySelector('#gsG').textContent='무사히 건넜어요!';walker={t:0,ok:true}}else{splash++;snd(160,.5,'sawtooth');d.querySelector('#gsG').textContent='첨벙! 높이가 어긋났어요';walker={t:0,ok:false}}d.querySelector('#gsS').textContent=n+' / '+N+'명';if(n>=N)fin()};
  d.querySelector('#gsX').onclick=cross;const onKey=e=>{if(e.code==='Space'){e.preventDefault();cross()}};addEventListener('keydown',onKey,true);
  const cleanup=()=>{removeEventListener('keydown',onKey,true);window.__GSPLAY=0};
  const fin=()=>{if(done)return;done=true;cleanup();const el=performance.now()/1000-t0;const Q=n>=N?Math.max(60,Math.round(100-splash*6-Math.max(0,el-35)*.6)):Math.round(n/N*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('gunsan_cross',Q,'뜬다리 건너기')}catch(e){}window.__GSQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#a8d8e8">손님 ${n}명이 건넜어요</b><div style="font-size:13px;margin:4px 0">뜬다리부두는 밀물에 떠오르고 썰물에 내려가 언제나 배와 높이를 맞춰요. 그러나 그 부두로는 우리 쌀이 일본으로 실려 나가기도 했어요.</div><div style="font-size:24px;color:#6a9aa8">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#6a9aa8;color:#1a2428;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#e8f2f4;border:2px solid #e8f2f4;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__GSCROSS()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}const now=performance.now()/1000,dt=Math.min(.1,now-last);last=now;
   if(!done){const el=now-t0;const sp=1+el/50;ph1+=dt*1.1*sp;ph2+=dt*1.6*sp;hp=Math.sin(ph1)*.7;hb=Math.sin(ph2)*.9+Math.sin(ph2*.37)*.3;
    pont.position.y=-1+hp;boat.position.y=-1.2+hb;sea.position.y=-3+(hp+hb)*.3;
    const ok=Math.abs(gap())<=TOL;d.querySelector('#gsA').style.top=(27-hp*22)+'px';d.querySelector('#gsB').style.top=(27-hb*22)+'px';d.querySelector('#gsA').style.background=ok?'#5ad05a':'#8a6a48';d.querySelector('#gsB').style.background=ok?'#5ad05a':'#2a4a6a';
    if(walker){walker.t+=dt;if(walker.t>.6)walker=null}
    const left=Math.max(0,TL-el);d.querySelector('#gsT').textContent=Math.ceil(left)+'초';if(left<=0)fin()}
   requestAnimationFrame(loop)};loop();
  window.__GSG={cross,gap:()=>gap(),get n(){return n},get busy(){return !!walker}};try{ctx.say('높이가 맞을 때 건너요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'쌀 가마니 표찰',h:'쌀가마니에 달던 나무 표찰이에요. 군산항에서 수많은 쌀이 일본으로 실려 갔어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.18,.02,.08),M(0xb89860)))})},
  {n:'근대 벽돌',h:'세관 같은 근대 건물에 쓰인 붉은 벽돌이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.21,.06,.1),M(0x8a3a2a)))})},
  {n:'유리병',h:'근대 상점에서 쓰던 유리병이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.04,.05,.18,10),M(0x6a9a8a,{roughness:.1,transparent:true,opacity:.7})))})},
  {n:'옛 동전',h:'근대에 쓰던 동전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.015,18),M(0xb08840,{metalness:.7})))})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요. 근대 이전 마을의 흔적이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})}];
 window.__GSDIG=()=>{window.__DETECT&&window.__DETECT({key:'gunsan_dig',title:'군산 발굴 탐지',emoji:'⛏️',bg:'#1a2428',count:4,TL:150,cand:[[-30,40],[0,40],[-50,0],[20,10],[-60,40],[30,30],[-50,-40],[0,-44]],items:ITEMS,intro:'근대 거리 땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'군산 근대 거리는 우리가 잊지 말아야 할 역사를 보여 줘요.'})};
 const meta={quest:{t:'군산 근대 거리 둘러보기',d:'옛 세관과 근대 건물, 뜬다리부두를 둘러보세요.',steps:[['세관','옛 군산세관'],['은행','근대 은행 건물'],['절','동국사 꼴 절'],['부두','뜬다리부두']]},
  title:'군산 근대 거리·뜬다리부두',hint:'옛 군산세관과 근대 거리, 뜬다리부두를 간추려 지었어요. 출렁이는 배에 손님을 건너게 해 봐요. 바다는 밀물·썰물에 따라 천천히 오르내려요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,groundY:-6,sign:{x:4,z:6,lines:['군산 근대 거리','옛 군산세관 · 뜬다리부두','근대 역사의 거리','간추려 지음']}},
  npc:[['science',[[0,4],[10,4],[10,12],[0,12]]]],bounds:[-90,SEA+26,-90,90],level:()=>'군산',camCap:()=>Infinity,baseAt:(x,z)=>x>SEA&&Math.abs(z-PZ)<4&&x<SEA+26?Math.max(-1.5,pont.position.y+.12):0,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.3,ox:-10,oz:0,draw(g,X,Z,S){g.fillStyle='#c8c0b0';g.fillRect(0,0,300,300);g.fillStyle='#5a7a78';g.fillRect(X(SEA),0,300,300);g.fillStyle='#8a3a2a';g.fillRect(X(6),Z(-28.5),16*S,9*S);g.fillStyle='#4a5058';g.fillRect(X(PX-10),Z(PZ-4),20*S,8*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:6,z:10,yaw:Math.PI},size:{}},meta)}
