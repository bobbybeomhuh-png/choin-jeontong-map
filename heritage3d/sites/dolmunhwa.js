/* 제주 돌문화공원 마당(2026-11-22, K11): 제주 사람들의 돌 문화를 모은 공원(제주시 조천읍).
   사진 실측: 아르케오모델3D(juanbrualla) 스케치팹 CC BY 「TOMBS - Stone Park Jeju」(산담 무덤과 동자석), 「Roca Volcanica」(화산 돌), 「Boat」(배 모양 돌), 「Stone Blister」(부풀어 오른 용암 돌).
   자료에 단위가 없어 크기는 어림했어요(동자석 키 약 1.1m가 되도록 무덤을 맞추는 식). 돌담·초가는 간추려 지었어요.
   놀이: 바람 구멍 돌담 쌓기(크고 작은 돌을 줄마다 떨어뜨려 쌓는데, 제주 돌담처럼 틈이 알맞게 있어야 센 바람에도 안 무너져요. 틈이 너무 없거나 너무 많으면 무너져요, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildDolmunhwa(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(4033);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.95},o));
 const BS=tex(128,128,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<260;i++){q.fillStyle=`rgba(0,0,0,${.2+r()*.4})`;q.beginPath();q.arc(r()*w,r()*h,1+r()*4,0,7);q.fill()}});
 const PL=[{f:'tombs.glb',x:-10,z:-14,n:'산담 무덤과 동자석'},{f:'bomb.glb',x:8,z:-12,n:'화산 돌'},{f:'boat.glb',x:16,z:-2,n:'배 모양 돌'},{f:'blister.glb',x:-16,z:4,n:'부풀어 오른 용암 돌'}];
 if(!mini){const L=new GLTFLoader();PL.forEach(p=>L.load(new URL('../models/dolmunhwa/'+p.f,import.meta.url).href,g=>{const o=g.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;e.receiveShadow=true}});const w=new THREE.Group();w.add(o);w.userData.noBatch=true;w.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o);o.position.y-=b.min.y;w.position.set(p.x,0,p.z);G.add(w)},undefined,e=>console.warn('DMLOADERR',p.f)))}
 solids.push({cx:-10,cz:-14,r:2,y0:0,y1:3},{cx:8,cz:-12,r:1.3,y0:0,y1:2.4},{cx:16,cz:-2,r:1.6,y0:0,y1:1.4},{cx:-16,cz:4,r:1.6,y0:0,y1:2});
 /* 둘레 밭담(간추림) */{const DM=new THREE.MeshStandardMaterial({color:0x3a3a3a,map:BS,roughness:1});for(let i=0;i<70;i++){const a=i/70*Math.PI*2;const R2=34;const s=new THREE.Mesh(new THREE.DodecahedronGeometry(.35+r()*.2,0),DM);s.position.set(Math.cos(a)*R2,.3+(i%2)*.35,Math.sin(a)*R2-4);s.rotation.set(r()*3,r()*3,r()*3);G.add(s)}}
 /* 돌담 쌓기 자리 */const WX=0,WZ=10,COLS=8,ROWS=4,CW=.55,RH=.42;const wall=new THREE.Group();wall.userData.noBatch=true;wall.position.set(WX,0,WZ);G.add(wall);{const base=new THREE.Mesh(new THREE.BoxGeometry(COLS*CW+.4,.1,.8),M(0x6a5a44));base.position.y=.05;wall.add(base)}
 const NL=[];if(!mini){for(const[x,y,z]of[[-10,3,-10],[8,3,-8],[-9,3,14]]){const P=new THREE.PointLight(0xffc080,0,26,1.5);P.position.set(x,y,z);G.add(P);NL.push(P);const lg=new THREE.Group();lg.userData.noBatch=true;const lp=new THREE.Mesh(new THREE.CylinderGeometry(.05,.06,y,6),M(0x3a2a1a));lp.position.y=y/2;lg.add(lp);const lm=new THREE.Mesh(new THREE.SphereGeometry(.34,12,8),new THREE.MeshStandardMaterial({color:0xfff0d0,emissive:0xffc060,emissiveIntensity:0}));lm.position.y=y+.1;lg.add(lm);lg.position.set(x+1.9,0,z);G.add(lg);P.userData.lm=lm}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(P=>{P.intensity=nk*60;if(P.userData.lm)P.userData.lm.material.emissiveIntensity=nk*8})};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(-10,-10,2.6,'산담 무덤과 동자석','제주 무덤은 소와 말이 들어오지 못하게 돌담(산담)을 두르고, 무덤을 지키는 동자석을 세웠어요. 사진 실측(CC BY), 크기는 어림했어요.');
 sp(8,-9,2.2,'화산 돌','화산이 내뿜은 용암과 돌이에요. 사진 실측, 크기는 어림했어요.');
 sp(16,1,2,'배 모양 돌','배처럼 생긴 돌이에요. 사진 실측, 크기는 어림했어요.');
 sp(-16,7,2,'부풀어 오른 용암 돌','용암 속 가스가 부풀어 오르며 굳은 돌이에요. 사진 실측, 크기는 어림했어요.');
 sp(WX+3,WZ+2,2.2,'돌담 쌓기 자리','제주 돌담처럼 바람 구멍이 있는 담을 쌓아 봐요.');
 sp(-24,20,2.4,'발굴 탐지 자리','현무암 흙 속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 바람 구멍 돌담 쌓기(11/22) */
 window.__DMWALL=()=>{if(document.getElementById('dwP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(WX+3.4,WZ+2.4,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('dwP')?[WX,1.7,WZ+8.6,WX,.9,WZ,50]:null;
  const SM=new THREE.MeshStandardMaterial({color:0x34322f,map:BS,roughness:1});let rd=0,h=[],gaps=0,cur=1,nextW=1,phase='play',wait=0,auto=false,done=false,msg='',last=performance.now(),at=0,shake=0,fall=0;const res=[];const stones=[];
  const d=document.createElement('div');d.id='dwP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#1e2422;border:3px solid #8a9a8a;border-radius:16px;padding:9px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#eef0ec;box-shadow:0 6px 18px rgba(0,0,0,.35);width:310px;max-width:94vw;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🪨 바람 구멍 돌담 쌓기</b><div data-i style="margin:3px 0;font:14px 'Do Hyeon',sans-serif"></div><div data-g style="font:14px 'Do Hyeon',sans-serif;color:#f8e8a0"></div><div style="font-size:11.5px;color:#d8e0d8">담 위 칸을 눌러 돌을 떨어뜨려요. 틈(바람 구멍)이 15~35%일 때 바람에 안 무너져요</div><div data-m style="font-size:12px;color:#f8e8a0;margin-top:4px"></div>`;
  const q=k=>d.querySelector(k);const iEl=q('[data-i]'),gEl=q('[data-g]'),mEl=q('[data-m]');
  const snd=(f,len,type='sine',v=.05)=>{try{const AC=ctx.ac();if(!AC)return;const s0=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s0);g.gain.setValueAtTime(v,s0);g.gain.exponentialRampToValueAtTime(.0001,s0+len);o.connect(g).connect(ctx.out()||AC.destination);o.start(s0);o.stop(s0+len+.02)}catch(e){}};
  const colX=c=>(c-(COLS-1)/2)*CW;
  const ghost=new THREE.Mesh(new THREE.BoxGeometry(CW*.95,RH*.9,.5),new THREE.MeshBasicMaterial({color:0xffd040,transparent:true,opacity:.25}));wall.add(ghost);
  const hits=[];for(let c=0;c<COLS;c++){const hb=new THREE.Mesh(new THREE.BoxGeometry(CW,ROWS*RH+1.2,.9),new THREE.MeshBasicMaterial({visible:false}));hb.position.set(colX(c),(ROWS*RH+1.2)/2,0);hb.userData.c=c;wall.add(hb);hits.push(hb)}
  const rollW=()=>Math.random()<.42?2:1;
  const canAt=c=>c+cur<=COLS&&Math.max(...h.slice(c,c+cur))<ROWS;
  const drop=c=>{if(phase!=='play')return;if(c+cur>COLS)c=COLS-cur;if(!canAt(c)){msg='거기엔 못 올려요';return}const y=Math.max(...h.slice(c,c+cur));for(let k=c;k<c+cur;k++){gaps+=y-h[k];h[k]=y+1}const s=new THREE.Mesh(new THREE.DodecahedronGeometry(1,0),SM);s.scale.set(CW*cur*.5,RH*.55,.3);s.rotation.set(Math.random()*.4,Math.random()*.4,Math.random()*.6);s.position.set(colX(c)+(cur-1)*CW/2,y*RH+RH/2+.1,0);s.userData.ty=s.position.y;s.position.y+=1.2;wall.add(s);stones.push(s);snd(180+Math.random()*60,.12,'triangle',.05);cur=nextW;nextW=rollW();if(h.every(v=>v>=ROWS)||!Array.from({length:COLS},(_,c)=>canAt(c)).some(Boolean))windTest()};
  const windTest=()=>{const tot=COLS*ROWS;const g=gaps/tot;const full=h.reduce((a,v)=>a+Math.min(v,ROWS),0)/tot;const ok=g>=.15&&g<=.35&&full>.95;const sc=full*(ok?1:g<.15?Math.max(0,1-(.15-g)*5):Math.max(0,1-(g-.35)*4));res.push(Math.min(1,sc));phase='wind';shake=1.6;fall=ok?0:1;msg=ok?`틈 ${(g*100|0)}%: 바람이 빠져나가 담이 버텨요!`:g<.15?`틈 ${(g*100|0)}%: 너무 꽉 막혀 바람에 밀려 무너져요`:`틈 ${(g*100|0)}%: 구멍이 너무 많아 무너져요`;snd(ok?820:160,.5,ok?'sine':'sawtooth',.06)};
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,50);const rc=new THREE.Raycaster();const ov=document.createElement('div');ov.id='dwO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  ov.onpointerdown=e=>{const C=window.__GCAM();if(!C)return;pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();wall.updateMatrixWorld(true);rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const hh=rc.intersectObjects(hits,false)[0];if(hh)drop(hh.object.userData.c)};
  ov.onpointermove=e=>{const C=window.__GCAM();if(!C)return;pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const hh=rc.intersectObjects(hits,false)[0];if(hh){let c=Math.min(hh.object.userData.c,COLS-cur);ghost.position.set(colX(c)+(cur-1)*CW/2,ROWS*RH+.5,0);ghost.scale.x=cur}};
  const clearSt=()=>{stones.forEach(s=>wall.remove(s));stones.length=0};
  const cleanup=()=>{ov.remove();clearSt();wall.remove(ghost);hits.forEach(x=>wall.remove(x))};
  const newRound=()=>{clearSt();h=new Array(COLS).fill(0);gaps=0;cur=rollW();nextW=rollW();phase='play';msg=`${rd+1}판: 돌을 쌓아요`;ghost.position.set(0,ROWS*RH+.5,0);ghost.scale.x=cur};
  newRound();
  /* 자동 시험: 틈 25% 쪽으로 가는 자리 고르기 */const pickAuto=()=>{let best=-1,bv=1e9;const tot=COLS*ROWS;for(let c=0;c+cur<=COLS;c++){if(!canAt(c))continue;const y=Math.max(...h.slice(c,c+cur));let g2=gaps;for(let k=c;k<c+cur;k++)g2+=y-h[k];const filled=h.reduce((a,v)=>a+v,0)+cur;const want=.25*filled;const v=Math.abs(g2-want)+y*.3;if(v<bv){bv=v;best=c}}return best};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   stones.forEach(s=>{if(s.position.y>s.userData.ty&&fall<=0)s.position.y=Math.max(s.userData.ty,s.position.y-dt*6)});
   if(phase==='play'&&auto){at+=dt;if(at>.12){at=0;const c=pickAuto();if(c>=0)drop(c);else windTest()}}
   if(phase==='wind'){shake-=dt;wall.position.x=WX+Math.sin(now/30)*.02*Math.max(0,shake);if(fall>0)stones.forEach((s,i)=>{s.position.z+=dt*(1+i%3);s.position.y=Math.max(.2,s.position.y-dt*2);s.rotation.x+=dt*3});if(shake<=0){wall.position.x=WX;phase='wait';wait=1.6}}
   if(phase==='wait'){wait-=dt;if(wait<=0){rd++;if(rd>=3){fin();return}newRound()}}
   const tot=COLS*ROWS;iEl.textContent=`${Math.min(rd+1,3)} / 3판 · 이번 돌 ${cur===2?'큰 돌(두 칸)':'작은 돌(한 칸)'} · 다음 ${nextW===2?'큰 돌':'작은 돌'}`;gEl.textContent=`바람 구멍 ${(gaps/tot*100|0)}% · 쌓은 높이 ${Math.min(...h)}~${Math.max(...h)}/${ROWS}`;mEl.textContent=msg;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('dolmunhwa_wall',Q,'바람 구멍 돌담 쌓기')}catch(e){}window.__DWQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">돌담을 다 쌓았어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">제주 돌담은 구멍이 숭숭 뚫려 있어요. 센 바람이 틈으로 빠져나가 담이 쓰러지지 않아요. 밭담·집담·산담으로 섬 곳곳을 둘러 바람과 마소를 막았어요.</div><div style="font-size:24px;color:#8a9a8a">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#8a9a8a;color:#1e2422;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef0ec;border:2px solid #eef0ec;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__DMWALL()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__DWG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('틈을 알맞게!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'현무암 맷돌 조각',h:'구멍 숭숭한 현무암 맷돌 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.05,16),M(0x3a3a3a,{map:BS})))})},
  {n:'동자석 조각',h:'무덤을 지키던 작은 돌사람 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CapsuleGeometry(.04,.1,4,8),M(0x6a6a64)))})},
  {n:'허벅 조각',h:'물을 길어 나르던 제주 옹기 허벅 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.1,.08,12,1,true,0,2),M(0x7a4a30)))})},
  {n:'조개껍데기',h:'바닷가 조개껍데기예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.06,10,6,0,Math.PI*2,0,Math.PI/2),M(0xe8e0d0)))})},
  {n:'쇠 호미',h:'밭을 매던 쇠 호미 날이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.14,.02,.1),M(0x4a3a30,{metalness:.6})))})}];
 window.__DMDIG=()=>{window.__DETECT&&window.__DETECT({key:'dolmunhwa_dig',title:'돌문화공원 발굴 탐지',emoji:'⛏️',bg:'#1e2422',count:4,TL:150,cand:[[-24,20],[-28,4],[24,18],[26,-16],[-20,-24],[10,24],[-6,24],[28,4]],items:ITEMS,intro:'현무암 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'제주 사람들은 돌로 집도 담도 무덤도 지었어요.'})};
 const meta={quest:{t:'돌문화공원 둘러보기',d:'산담 무덤, 화산 돌, 배 모양 돌, 돌담 쌓기 자리를 둘러보세요.',steps:[['산담','산담 무덤과 동자석'],['화산 돌','화산 돌'],['배 모양 돌','배 모양 돌'],['돌담','돌담 쌓기 자리']]},
  title:'제주 돌문화공원',hint:'돌 넷은 사진 실측(크기 어림), 둘레 밭담은 간추려 지었어요.',
  ibl:true,env:{plaza:null,beds:false,trees:true,treeAvoid:(x,z)=>Math.hypot(x,z+4)<36,noHills:false,sign:{x:-6,z:20,lines:['제주 돌문화공원','산담·동자석·화산 돌(실측)','돌담 쌓기','크기 어림']}},
  npc:[['science',[[-8,16],[-2,16],[-2,22],[-8,22]]]],bounds:[-40,40,-40,32],level:()=>'제주',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2,ox:0,oz:-4,draw(g,X,Z,S){g.fillStyle='#7a8a5a';g.fillRect(0,0,300,300);g.strokeStyle='#3a3a3a';g.lineWidth=3;g.beginPath();g.arc(X(0),Z(-4),34*S,0,7);g.stroke()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:24,yaw:Math.PI},size:{}},meta)}
