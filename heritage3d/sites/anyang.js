/* 안양·과천 마당(2026-11-22, W87): 안양 석수동 마애종(바위에 새긴 종 치는 스님), 중초사지 당간지주, 종각, 과천 향교.
   3D: 「KCDF-동종(Bronze Bell)」 한국공예·디자인문화진흥원 스케치팹 CC BY. 크기 자료가 없어 종각에 맞게 높이 1.4m로 어림해 놓았어요. 나머지는 공개 사진으로 간추려 지음.
   석수동 마애종(경기도 유형문화유산): 바위에 종각과 종, 종을 치는 스님을 새긴 고려 때 조각.
   중초사지 당간지주(보물): 826년에 세웠다는 글이 새겨진 당간지주.
   맥놀이: 우리 종은 소리가 「웅~웅~」 하고 커졌다 작아졌다 하며 길게 울려요. 아주 조금 다른 두 소리가 겹쳐 생기는 떨림이에요.
   놀이: 종 맥놀이 맞추기(종을 조금씩 깎아 두 소리의 차이를 바꿔, 맥놀이 주기를 본보기 등불의 깜빡임에 맞추기, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildAnyang(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(826);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x84a04c,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 const STT=tex(256,256,(q,w,h)=>{q.fillStyle='#9a948a';q.fillRect(0,0,w,h);for(let i=0;i<900;i++){const v=120+(r()*60|0);q.fillStyle=`rgba(${v},${v-3},${v-10},.5)`;q.fillRect(r()*w,r()*h,3+r()*6,2+r()*4)}},[1,1]);
 /* 마애종 바위: 바위 면에 종·종틀·스님 새김(캔버스로 얕은 새김 무늬) */const MX=-24,MZ=-28;{const CT=tex(512,512,(q,w,h)=>{q.fillStyle='#9a948a';q.fillRect(0,0,w,h);for(let i=0;i<1500;i++){const v=120+(r()*60|0);q.fillStyle=`rgba(${v},${v-3},${v-10},.5)`;q.fillRect(r()*w,r()*h,3+r()*6,2+r()*4)}q.strokeStyle='rgba(50,44,36,.85)';q.lineWidth=7;q.beginPath();q.moveTo(120,110);q.lineTo(400,110);q.moveTo(150,110);q.lineTo(150,420);q.moveTo(370,110);q.lineTo(370,420);q.stroke();q.beginPath();q.moveTo(230,140);q.lineTo(230,170);q.stroke();q.beginPath();q.moveTo(190,170);q.quadraticCurveTo(180,330,175,360);q.lineTo(290,360);q.quadraticCurveTo(285,330,275,170);q.closePath();q.stroke();q.beginPath();q.arc(232,300,14,0,7);q.stroke();q.beginPath();q.arc(330,230,16,0,7);q.stroke();q.beginPath();q.moveTo(330,246);q.lineTo(325,330);q.lineTo(300,360);q.moveTo(325,330);q.lineTo(345,360);q.moveTo(328,270);q.lineTo(292,290);q.stroke()});
  const rk=new THREE.Mesh(new THREE.BoxGeometry(9,7,4),new THREE.MeshStandardMaterial({map:STT,roughness:1,flatShading:true}));rk.position.set(MX,3.5,MZ);G.add(rk);cam.push(rk);const face=new THREE.Mesh(new THREE.PlaneGeometry(5,5),new THREE.MeshStandardMaterial({map:CT,roughness:1}));face.position.set(MX,3.6,MZ+2.01);G.add(face);solids.push({x0:MX-4.5,x1:MX+4.5,y0:0,y1:7,z0:MZ-2,z1:MZ+2})}
 /* 중초사지 당간지주 */{const SM=new THREE.MeshStandardMaterial({map:STT,roughness:1,flatShading:true});for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.BoxGeometry(.6,3.8,.9),SM);p.position.set(18+s*.55,1.9,-30);G.add(p)}solids.push({x0:16.9,x1:19.1,y0:0,y1:3.8,z0:-30.5,z1:-29.5})}
 /* 종각: 기둥 넷·우진각 지붕·KCDF 동종 */const BX=0,BZ=-8;let bell=null;{const pv=new THREE.Group();pv.position.set(BX,0,BZ);const rm=M(0x8a3a26);for(const[x,z]of[[-2.4,-2.4],[2.4,-2.4],[2.4,2.4],[-2.4,2.4]]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.16,.18,4,8),rm);p.position.set(x,2,z);pv.add(p)}const fl=new THREE.Mesh(new THREE.BoxGeometry(6,.4,6),M(0xb8b0a0));fl.position.y=.2;pv.add(fl);const rf=new THREE.Mesh(new THREE.ConeGeometry(5,2.2,4),M(0x3a3e48));rf.rotation.y=Math.PI/4;rf.position.y=5.1;pv.add(rf);const beam=new THREE.Mesh(new THREE.BoxGeometry(5,.25,.25),M(0x6a4a30));beam.position.y=3.9;pv.add(beam);
  const ram=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,1.6,10),M(0x8a6a44));ram.rotation.z=Math.PI/2;ram.position.set(1.6,1.6,0);pv.add(ram);pv.userData.ram=ram;G.add(pv);pv.traverse(e=>{if(e.isMesh)cam.push(e)});solids.push({x0:BX-3,x1:BX+3,y0:0,y1:.4,z0:BZ-3,z1:BZ+3},{cx:BX,cz:BZ,r:1,y0:0,y1:4});G.userData.pv=pv}
 const glow=new THREE.PointLight(0xffd080,0,8,1.5);glow.position.set(BX,2,BZ+1.5);G.add(glow);
 if(!mini){const L=new GLTFLoader();L.load(new URL('../models/anyang/bell.glb',import.meta.url).href,m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh)e.castShadow=true});const b=new THREE.Box3().setFromObject(o);const c=b.getCenter(new THREE.Vector3());o.position.set(-c.x,-b.max.y,-c.z);const w=new THREE.Group();w.add(o);w.userData.noBatch=true;w.position.set(BX,3.85,BZ);G.add(w);bell=w},undefined,()=>{})}
 /* 과천 향교(간추린 명륜당) */{const g=new THREE.Group();g.position.set(30,0,4);const wl=new THREE.Mesh(new THREE.BoxGeometry(8,2.6,4),M(0xe8e0cc));wl.position.y=1.3;g.add(wl);const rf=new THREE.Mesh(new THREE.ConeGeometry(6.4,2,4),M(0x3a3e48));rf.rotation.y=Math.PI/4;rf.scale.z=.5;rf.position.y=3.5;g.add(rf);G.add(g);g.traverse(e=>{if(e.isMesh)cam.push(e)});solids.push({x0:26,x1:34,y0:0,y1:4,z0:2,z1:6})}
 /* 본보기 등불(맥놀이 주기) */const lamp=new THREE.Mesh(new THREE.SphereGeometry(.25,12,10),new THREE.MeshStandardMaterial({color:0xfff0c0,emissive:0xffb040,emissiveIntensity:0}));lamp.position.set(BX-2.6,2.6,BZ+2.6);G.add(lamp);
 const NL=[];if(!mini){for(const[x,y,z]of[[MX,4,MZ+6],[BX,3,BZ+5],[30,3,9]]){const L=new THREE.PointLight(0xffc080,0,24,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8)};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(MX,MZ+5,3,'석수동 마애종','바위에 종틀과 종, 종을 치는 스님을 새긴 고려 때 조각이에요(경기도 유형문화유산). 간추려 지었어요.');
 sp(18,-27,2.4,'중초사지 당간지주','826년에 세웠다는 글이 새겨진 당간지주예요(보물). 간추려 지었어요.');
 sp(BX+3.4,BZ+3.4,2,'종각','한국공예·디자인문화진흥원 동종 3D(CC BY)를 걸었어요. 크기 자료가 없어 높이 1.4m로 어림했어요. 종을 깎아 맥놀이를 맞춰 봐요.');
 sp(30,9,3,'과천 향교','조선 때 고을 학교 향교예요. 간추려 지었어요.');
 sp(-60,30,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 종 맥놀이 맞추기(11/22): 세 판. 종을 치면 두 소리(f, f+차이)가 겹쳐 맥놀이(커졌다 작아졌다)가 생겨요. 주기 = 1/차이. 본보기 등불이 목표 주기로 깜빡여요. 「얇게 깎기」는 차이를 키우고(맥놀이 빨라짐), 「두껍게 덧대기」는 줄여요. 맞으면 「이 소리로!」 */
 window.__AYBELL=()=>{if(document.getElementById('ayP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(BX+3.4,BZ+3.6,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('ayP')?[BX+2.2,2.4,BZ+5.6,BX,2.4,BZ,50]:null;
  const TG=[3,2,1.2];let rd=0,df=0,t=0,ring=0,done=false,auto=false,last=performance.now(),msg='',phase='tune',wait=0,at=0,nodes=null;const res=[];const F0=168;
  const stopSnd=()=>{if(nodes){try{nodes.forEach(n=>n.stop())}catch(e){}nodes=null}};
  const strike=()=>{ring=6;stopSnd();try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime;const g=AC.createGain();g.gain.setValueAtTime(.0001,s);g.gain.exponentialRampToValueAtTime(.08,s+.03);g.gain.exponentialRampToValueAtTime(.0001,s+6);g.connect(ctx.out()||AC.destination);nodes=[F0,F0+df,F0*2.76].map((f,i)=>{const o=AC.createOscillator();o.frequency.value=f;const gg=AC.createGain();gg.gain.value=i<2?.5:.12;o.connect(gg).connect(g);o.start(s);o.stop(s+6.1);return o})}catch(e){}};
  const newRound=()=>{df=.05+Math.random()*1.5;if(Math.abs(1/df-TG[rd])<.4)df+=.6;phase='tune';t=0;msg=`${rd+1}판: 맥놀이 주기를 ${TG[rd]}초에 맞춰요`;strike()};
  const d=document.createElement('div');d.id='ayP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#1e1a14;border:3px solid #c8a050;border-radius:16px;padding:9px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f4ece0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:300px;max-width:94vw;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🔔 종 맥놀이 맞추기</b><div data-i style="margin:3px 0;font:13.5px 'Do Hyeon',sans-serif"></div><div style="display:flex;gap:6px;align-items:center;justify-content:center;margin:4px 0"><span style="font-size:11px">본보기</span><div data-t style="width:22px;height:22px;border-radius:50%;background:#ffb040"></div><span style="font-size:11px;margin-left:10px">우리 종</span><div data-b style="width:22px;height:22px;border-radius:50%;background:#ffd080"></div></div><div style="display:flex;gap:5px;margin-top:5px"><button data-k="-" style="flex:1;font:14px 'Do Hyeon',sans-serif;background:#4a3a2a;color:#fff;border:0;border-radius:10px;padding:9px 0;cursor:pointer">두껍게 덧대기</button><button data-k="s" style="flex:.8;font:15px 'Do Hyeon',sans-serif;background:#8a6a44;color:#fff;border:0;border-radius:10px;padding:9px 0;cursor:pointer">당좌 치기</button><button data-k="+" style="flex:1;font:14px 'Do Hyeon',sans-serif;background:#4a3a2a;color:#fff;border:0;border-radius:10px;padding:9px 0;cursor:pointer">얇게 깎기</button></div><button data-ok style="width:100%;margin-top:5px;font:16px 'Do Hyeon',sans-serif;background:#c8a050;color:#1e1a14;border:0;border-radius:10px;padding:9px 0;cursor:pointer">이 소리로!</button><div data-m style="font-size:12px;color:#f8e8a0;margin-top:4px"></div>`;
  const iEl=d.querySelector('[data-i]'),mEl=d.querySelector('[data-m]'),tL=d.querySelector('[data-t]'),bL=d.querySelector('[data-b]');
  const tune=v=>{if(phase!=='tune')return;df=Math.max(.05,Math.min(3,df*(v>0?1.08:1/1.08)));strike()};
  d.querySelector('[data-k="-"]').onclick=()=>tune(-1);d.querySelector('[data-k="+"]').onclick=()=>tune(1);d.querySelector('[data-k="s"]').onclick=()=>{if(phase==='tune')strike()};
  const ok=()=>{if(phase!=='tune')return;const P=1/df,e=Math.abs(P-TG[rd])/TG[rd];const sc=Math.max(0,1-Math.max(0,e-.06)/.5);res.push(sc);msg=e<=.06?`딱 맞아요! 맥놀이 ${P.toFixed(2)}초`:`맥놀이 ${P.toFixed(2)}초 (목표 ${TG[rd]}초)`;phase='wait';wait=2.4};d.querySelector('[data-ok]').onclick=ok;
  const cleanup=()=>{stopSnd();lamp.material.emissiveIntensity=0;glow.intensity=0};
  newRound();
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;ring=Math.max(0,ring-dt);
   const tb=Math.abs(Math.cos(Math.PI*t/TG[rd]));lamp.material.emissiveIntensity=tb*2;tL.style.opacity=(.15+.85*tb).toFixed(2);
   const bb=Math.abs(Math.cos(Math.PI*df*t))*(ring>0?Math.min(1,ring/2+.3):.15);glow.intensity=bb*12;bL.style.opacity=(.15+.85*bb).toFixed(2);
   const pv=G.userData.pv;if(pv)pv.userData.ram.position.x=1.6+Math.max(0,ring-5.6)*1.5;if(bell)bell.rotation.z=Math.sin(t*9)*.004*ring;
   if(phase==='tune'&&auto){at+=dt;if(at>.25){at=0;const P=1/df;if(Math.abs(P-TG[rd])/TG[rd]>.05)tune(P>TG[rd]?1:-1);else ok()}}
   if(phase==='wait'){wait-=dt;if(wait<=0){rd++;if(rd>=3){fin();return}newRound()}}
   iEl.textContent=`${Math.min(rd+1,3)} / 3판 · 목표 맥놀이 ${TG[Math.min(rd,2)]}초마다 한 번`;mEl.textContent=msg;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('anyang_bell',Q,'종 맥놀이 맞추기')}catch(e){}window.__AYQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">종소리를 다 맞췄어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">우리 옛 종은 몸이 아주 조금 고르지 않아, 비슷한 두 소리가 겹쳐 「웅~웅~」 하는 맥놀이가 생겨요. 두 소리 차이가 작을수록 맥놀이가 느리고 길게 울려요. 성덕대왕신종 같은 종은 이 맥놀이로 이름나요.</div><div style="font-size:24px;color:#c8a050">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a050;color:#1e1a14;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ece0;border:2px solid #f4ece0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__AYBELL()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__AYG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('웅~웅~ 맥놀이를 들어요',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'종 조각',h:'청동 종 깨진 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.14,.1,.02),M(0x5a6a50,{metalness:.6})))})},
  {n:'기와 조각',h:'절집 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.2,10,1,false,0,Math.PI),M(0x5a5a5a)))})},
  {n:'청자 대접',h:'고려 청자 대접 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.1,.08,18),M(0x8aa890,{roughness:.3})))})},
  {n:'벼루',h:'향교 학생이 쓰던 벼루 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.16,.03,.1),M(0x2a2a2a)))})},
  {n:'해동통보',h:'고려 때 돈이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__AYDIG=()=>{window.__DETECT&&window.__DETECT({key:'anyang_dig',title:'안양·과천 발굴 탐지',emoji:'⛏️',bg:'#1e1a14',count:4,TL:150,cand:[[-60,30],[-30,30],[20,30],[60,10],[-60,-40],[50,-40],[-40,0],[40,-15]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'안양·과천은 마애종과 옛 절터, 향교의 고장이에요.'})};
 const meta={quest:{t:'안양·과천 둘러보기',d:'마애종 바위와 당간지주, 종각, 향교를 둘러보세요.',steps:[['마애종','석수동 마애종'],['당간지주','중초사지 당간지주'],['종각','종각'],['향교','과천 향교']]},
  title:'안양·과천 마애종·종각·향교',hint:'종은 KCDF 동종 3D(크기 어림), 나머지는 공개 사진으로 간추려 지었어요. 종을 깎아 맥놀이 주기를 맞춰 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-8,z:14,lines:['안양·과천','석수동 마애종 · 당간지주','종각 동종 · 과천 향교','간추려 지음']}},
  npc:[['science',[[-12,6],[-4,6],[-4,18],[-12,18]]]],bounds:[-90,80,-70,60],level:()=>'안양',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#84a04c';g.fillRect(0,0,300,300);g.fillStyle='#9a948a';g.fillRect(X(MX-4.5),Z(MZ-2),9*S,4*S);g.fillStyle='#8a3a26';g.fillRect(X(BX-3),Z(BZ-3),6*S,6*S);g.fillStyle='#e8e0cc';g.fillRect(X(26),Z(2),8*S,4*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:22,yaw:Math.PI},size:{}},meta)}
