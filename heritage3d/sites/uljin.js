/* 울진 마당(2026-11-22, W84): 소광리 금강송 숲, 십이령 보부상 고갯길·주막, 성류굴 입구, 덕구 온천.
   실측: 「A_frame_Carrier(지게)」 국가유산청(KHS_Asset) 스케치팹 CC BY, 실측 크기(높이 약 1m) 그대로. 나머지는 공개 사진으로 간추려 지음.
   십이령길: 울진 바닷가에서 봉화 내륙까지 열두 고개를 넘던 보부상 길. 미역·소금·건어물을 지고 넘어가 곡식과 바꿨어요.
   소광리 금강송 숲: 곧고 붉은 줄기의 금강소나무가 빽빽한 숲. 궁궐을 지을 나무로 지켜 왔어요.
   성류굴(천연기념물): 석회암 동굴. 덕구 온천: 땅에서 솟는 따뜻한 물.
   놀이: 보부상 지게 꾸리기(지게가 견딜 무게 안에서 봉화 장에서 값이 가장 많이 나갈 짐을 골라 싣기. 값은 놀이용, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildUljin(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1212);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x7a9448,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 금강송 숲: 곧고 높은 붉은 줄기 */const BT=tex(64,256,(q,w,h)=>{q.fillStyle='#a8543a';q.fillRect(0,0,w,h);for(let i=0;i<120;i++){q.fillStyle=`rgba(${120+r()*60|0},${60+r()*30|0},${40+r()*20|0},.7)`;q.fillRect(r()*w,r()*h,6+r()*14,3+r()*6)}},[1,3]);const BM=new THREE.MeshStandardMaterial({map:BT,roughness:.9});const LF=M(0x2a5a32);
 for(let i=0;i<70;i++){const x=-80+r()*60,z=-70+r()*90;if(Math.hypot(x+10,z)<14)continue;const h=18+r()*10;const t=new THREE.Mesh(new THREE.CylinderGeometry(.35,.55,h,8),BM);t.position.set(x,h/2,z);G.add(t);const c=new THREE.Mesh(new THREE.ConeGeometry(3.2,5,8),LF);c.position.set(x,h+1,z);c.scale.y=.6;G.add(c);solids.push({cx:x,cz:z,r:.6,y0:0,y1:h})}
 /* 십이령 고갯길 + 주막 */{const pts=[];for(let i=0;i<=30;i++){const t=i/30;pts.push(new THREE.Vector3(-90+t*80,.03,-20+Math.sin(t*9)*8))}const pm=M(0xc8b088);for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1];const L=a.distanceTo(b);const m=new THREE.Mesh(new THREE.PlaneGeometry(2.4,L+.2),pm);m.rotation.x=-Math.PI/2;m.rotation.z=Math.atan2(-(b.x-a.x),-(b.z-a.z));m.position.set((a.x+b.x)/2,.04,(a.z+b.z)/2);G.add(m)}
  const JM=new THREE.Group();JM.position.set(-4,0,-12);const wl=new THREE.Mesh(new THREE.BoxGeometry(6,2,3.4),M(0xd8c8a8));wl.position.y=1;JM.add(wl);const rf=new THREE.Mesh(new THREE.SphereGeometry(1,16,10,0,Math.PI*2,0,Math.PI/2),M(0xc8b080));rf.scale.set(3.8,1.2,2.3);rf.position.y=2;JM.add(rf);G.add(JM);JM.traverse(e=>{if(e.isMesh)cam.push(e)});solids.push({x0:-7,x1:-1,y0:0,y1:3,z0:-13.7,z1:-10.3})}
 /* 성류굴 입구: 석회암 벼랑 + 굴 + 종유석 */const KX=40,KZ=-40;{const LM=new THREE.MeshStandardMaterial({color:0xc8c0b0,roughness:1,flatShading:true});const cl=new THREE.Mesh(new THREE.BoxGeometry(30,16,8),LM);cl.position.set(KX,8,KZ);G.add(cl);cam.push(cl);solids.push({x0:KX-15,x1:KX+15,y0:0,y1:16,z0:KZ-4,z1:KZ+4});const hole=new THREE.Mesh(new THREE.CircleGeometry(3,18),M(0x14100c));hole.scale.y=.8;hole.position.set(KX,3,KZ+4.02);G.add(hole);for(let i=0;i<9;i++){const s=new THREE.Mesh(new THREE.ConeGeometry(.18,.6+r()*.8,6),LM);s.rotation.x=Math.PI;s.position.set(KX-2.4+i*.6,5.1-r()*.2,KZ+4.1);G.add(s)}}
 /* 덕구 온천: 김 오르는 웅덩이 */const OX=30,OZ=18;const steam=[];{const pool=new THREE.Mesh(new THREE.CircleGeometry(4,24),M(0x6aa0b0,{roughness:.1}));pool.rotation.x=-Math.PI/2;pool.position.set(OX,.05,OZ);G.add(pool);for(let i=0;i<14;i++){const ring=new THREE.Mesh(new THREE.DodecahedronGeometry(.6,0),M(0x8a8478,{flatShading:true}));const a=i/14*6.28;ring.position.set(OX+Math.cos(a)*4.3,.2,OZ+Math.sin(a)*4.3);G.add(ring)}solids.push({cx:OX,cz:OZ,r:4.5,y0:0,y1:1});const SMT=new THREE.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.35,depthWrite:false});for(let i=0;i<10;i++){const s=new THREE.Mesh(new THREE.SphereGeometry(.8,8,6),SMT.clone());s.userData.t=r()*3;G.add(s);steam.push(s)}}
 /* 지게 실측 + 짐 쌓는 자리 */const JX=-12,JZ=2;let jige=null;const load=new THREE.Group();load.position.set(JX,0,JZ);G.add(load);
 if(!mini){const L=new GLTFLoader();L.load(new URL('../models/uljin/jige.glb',import.meta.url).href,m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh)e.castShadow=true});const b=new THREE.Box3().setFromObject(o);const c=b.getCenter(new THREE.Vector3());o.position.set(-c.x,-b.min.y,-c.z);const w=new THREE.Group();w.add(o);w.userData.noBatch=true;w.position.set(JX,0,JZ);G.add(w);jige=w},undefined,()=>{})}
 solids.push({cx:JX,cz:JZ,r:.7,y0:0,y1:1.2});
 const NL=[];if(!mini){for(const[x,y,z]of[[-4,3,-8],[KX,4,KZ+8],[OX,3,OZ+6]]){const L=new THREE.PointLight(0xffc080,0,24,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8);for(const s of steam){s.userData.t+=dt;const t=s.userData.t%3;s.position.set(OX+Math.sin(s.userData.t*7)*1.5,.5+t*1.4,OZ+Math.cos(s.userData.t*5)*1.5);s.scale.setScalar(1+t*.6);s.material.opacity=.35*(1-t/3)}};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(-40,-4,3,'소광리 금강송 숲','곧고 붉은 줄기의 금강소나무가 빽빽한 숲이에요. 궁궐을 지을 나무로 지켜 왔어요. 간추려 지었어요.');
 sp(-4,-6.5,3,'십이령 보부상 주막','울진 바닷가에서 봉화 내륙까지 열두 고개를 넘던 보부상 길의 주막이에요. 간추려 지었어요.');
 sp(JX+1.8,JZ+1.6,2,'보부상 지게','국가유산청 실측 지게(높이 약 1m)예요. 봉화 장에 가져갈 짐을 꾸려 봐요.');
 sp(KX,KZ+8,3,'울진 성류굴','석회암 동굴이에요(천연기념물). 천장에서 종유석이 자라요. 간추려 지었어요.');
 sp(OX,OZ+6,2.6,'덕구 온천','땅에서 따뜻한 물이 솟는 온천이에요. 간추려 지었어요.');
 sp(-60,40,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 보부상 지게 꾸리기(11/22): 세 판. 짐 일곱 가지 가운데 골라 지게에 싣기. 무게(kg)가 지게 한도를 넘으면 못 떠나요. 봉화 장 값(냥)의 합이 클수록 좋아요(가장 좋은 꾸림과 견줌) */
 const GOODS=[['미역',0x2a4a2a,'bundle'],['소금',0xf0ece4,'sack'],['고등어 자반',0x6a7a8a,'fish'],['문어 말림',0x8a3a2a,'fish'],['멸치',0xb8b8c0,'sack'],['김',0x1a2a1a,'bundle'],['젓갈 단지',0x7a5a3a,'jar']];
 window.__UJPACK=()=>{if(document.getElementById('ujP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(JX+1.8,JZ+1.8,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('ujP')?[JX+1.6,1.6,JZ+2.6,JX,.8,JZ,48]:null;
  let rd=0,items=[],sel=[],cap=0,best=0,bestSet=[],done=false,auto=false,last=performance.now(),msg='',phase='pack',wait=0,at=0;const res=[];
  const knap=()=>{const n=items.length;let bv=0,bs=[];for(let m=0;m<(1<<n);m++){let w=0,v=0;for(let i=0;i<n;i++)if(m>>i&1){w+=items[i].w;v+=items[i].v}if(w<=cap&&v>bv){bv=v;bs=[...Array(n).keys()].filter(i=>m>>i&1)}}return[bv,bs]};
  const newRound=()=>{cap=[30,36,40][rd];items=GOODS.map(([n,c,k])=>({n,c,k,w:4+Math.floor(Math.random()*12),v:0}));items.forEach(it=>{it.v=Math.round(it.w*(1.5+Math.random()*2.5))});[best,bestSet]=knap();sel=items.map(()=>false);phase='pack';draw();msg=`${rd+1}판: 지게 한도 ${cap}kg`};
  const tot=()=>items.reduce((a,it,i)=>sel[i]?[a[0]+it.w,a[1]+it.v]:a,[0,0]);
  const draw=()=>{load.clear();let y=.45;items.forEach((it,i)=>{if(!sel[i])return;const h=.06+it.w*.012;let m;if(it.k==='jar'){m=new THREE.Mesh(new THREE.SphereGeometry(h*.7,10,8),M(it.c));m.scale.y=1.2}else if(it.k==='fish'){m=new THREE.Mesh(new THREE.BoxGeometry(.5,h,.12),M(it.c))}else if(it.k==='sack'){m=new THREE.Mesh(new THREE.CylinderGeometry(.22,.25,h,10),M(it.c))}else{m=new THREE.Mesh(new THREE.BoxGeometry(.45,h,.3),M(it.c))}m.position.set(0,y+h/2,-.18);load.add(m);y+=h+.01});const[w]=tot();load.rotation.x=w>cap?.25:0;if(jige)jige.rotation.x=w>cap?.12:0};
  const d=document.createElement('div');d.id='ujP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#2a2016;border:3px solid #a8543a;border-radius:16px;padding:9px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f4ece0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:310px;max-width:94vw;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🎒 보부상 지게 꾸리기</b><div data-i style="margin:3px 0;font:14px 'Do Hyeon',sans-serif"></div><div data-l style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:4px"></div><button data-go style="width:100%;margin-top:6px;font:16px 'Do Hyeon',sans-serif;background:#a8543a;color:#fff;border:0;border-radius:10px;padding:9px 0;cursor:pointer">고개 넘어 떠나기</button><div data-m style="font-size:12px;color:#f8e8a0;margin-top:4px"></div>`;
  const iEl=d.querySelector('[data-i]'),lEl=d.querySelector('[data-l]'),mEl=d.querySelector('[data-m]');
  const snd=(f,len,type='sine',v=.05)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(v,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const list=()=>{lEl.innerHTML=items.map((it,i)=>`<button data-k="${i}" style="font:12.5px 'Gowun Dodum',sans-serif;background:${sel[i]?'#f8d878':'#4a3a2e'};color:${sel[i]?'#2a2016':'#f4ece0'};border:0;border-radius:8px;padding:6px 2px;cursor:pointer"><b>${it.n}</b><br>${it.w}kg · ${it.v}냥</button>`).join('');lEl.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>tog(+b.dataset.k))};
  const tog=i=>{if(phase!=='pack')return;sel[i]=!sel[i];draw();list();snd(sel[i]?560:380,.06,'triangle',.04)};
  const go=()=>{if(phase!=='pack')return;const[w,v]=tot();if(w>cap){msg=`${w}kg! 지게가 기울어요. 한도 ${cap}kg로 줄여요`;snd(160,.3,'sawtooth',.04);return}const sc=v/best;res.push(sc);msg=v>=best?`가장 좋은 꾸림이에요! ${v}냥`:`${v}냥 (가장 좋은 꾸림은 ${best}냥: ${bestSet.map(i=>items[i].n).join('·')})`;snd(v>=best?780:400,.35);phase='wait';wait=2.8};d.querySelector('[data-go]').onclick=go;
  const cleanup=()=>{load.clear();if(jige)jige.rotation.x=0};
  newRound();list();
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(phase==='pack'&&auto){at+=dt;if(at>.3){at=0;const i=items.findIndex((_,k)=>sel[k]!==bestSet.includes(k));if(i>=0)tog(i);else go()}}
   if(phase==='wait'){wait-=dt;if(wait<=0){rd++;if(rd>=3){fin();return}newRound();list()}}
   const[w,v]=tot();iEl.textContent=`${Math.min(rd+1,3)} / 3판 · 무게 ${w}/${cap}kg · 값 ${v}냥`;iEl.style.color=w>cap?'#ff8a70':'#fff';mEl.textContent=msg;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('uljin_pack',Q,'보부상 지게 꾸리기')}catch(e){}window.__UJQ=Q;snd(660,.4);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">십이령을 넘을 짐을 다 꾸렸어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">울진 보부상들은 바닷가 미역·소금·건어물을 지게에 지고 열두 고개를 넘어 봉화·영주 장에 팔고, 곡식을 사서 돌아왔어요. 가볍고 값진 짐을 고르는 눈이 장사의 솜씨였지요. 놀이 속 값은 지어낸 것이에요.</div><div style="font-size:24px;color:#a8543a">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#a8543a;color:#fff;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ece0;border:2px solid #f4ece0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__UJPACK()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__UJG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('가볍고 값진 짐으로!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'보부상 패',h:'보부상이 차던 나무 신분 패예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.06,.12,.01),M(0x8a6a44)))})},
  {n:'소금 가마니 끈',h:'소금 짐을 묶던 새끼줄이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.TorusGeometry(.06,.01,5,12),M(0xc8a860)))})},
  {n:'종유석 조각',h:'석회 동굴 종유석 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.ConeGeometry(.03,.12,6),M(0xd8d0c0)))})},
  {n:'솔방울',h:'금강송 솔방울이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.ConeGeometry(.05,.1,8),M(0x6a4a2a)))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__UJDIG=()=>{window.__DETECT&&window.__DETECT({key:'uljin_dig',title:'울진 발굴 탐지',emoji:'⛏️',bg:'#2a2016',count:4,TL:150,cand:[[-60,40],[-20,40],[20,40],[60,10],[0,-40],[60,-10],[-30,20],[10,20]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'울진은 금강송과 보부상 길, 동굴과 온천의 고장이에요.'})};
 const meta={quest:{t:'울진 둘러보기',d:'금강송 숲과 보부상 주막, 성류굴, 덕구 온천을 둘러보세요.',steps:[['금강송','소광리 금강송 숲'],['주막','십이령 보부상 주막'],['성류굴','울진 성류굴'],['온천','덕구 온천']]},
  title:'울진 금강송·십이령·성류굴',hint:'지게는 국가유산청 실측을 실제 크기로, 나머지는 공개 사진으로 간추려 지었어요. 보부상 지게에 값진 짐을 꾸려 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-8,z:14,lines:['울진','금강송 숲 · 십이령 보부상길','지게(실측) · 성류굴 · 덕구 온천','간추려 지음']}},
  npc:[['science',[[-12,6],[-4,6],[-4,18],[-12,18]]]],bounds:[-90,80,-70,60],level:()=>'울진',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#7a9448';g.fillRect(0,0,300,300);g.fillStyle='#2a5a32';g.fillRect(X(-80),Z(-70),60*S,90*S);g.fillStyle='#c8c0b0';g.fillRect(X(KX-15),Z(KZ-4),30*S,8*S);g.fillStyle='#6aa0b0';g.beginPath();g.arc(X(OX),Z(OZ),4*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:22,yaw:Math.PI},size:{}},meta)}
