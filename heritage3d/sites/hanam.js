/* 하남·성남 마당(2026-11-22, W80): 하남 춘궁리 절터(동사지 오층·삼층 석탑, 주춧돌), 이성산성(돌로 쌓은 산성과 아홉모 건물터).
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음.
   하남 동사지(사적): 고려 초 큰 절터. 오층석탑과 삼층석탑(보물)이 나란히 남아 있어요.
   이성산성(사적): 삼국 때 쌓은 돌 산성. 성 안에서 아홉모·여덟모 건물터와 나무 글자판(목간)이 나왔어요.
   놀이: 그렝이질(울퉁불퉁한 덤벙 주춧돌 위에 기둥을 세우려고, 기둥 밑을 돌 모양대로 깎아 맞추기. 틈이 없을수록 좋아요, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildHanam(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(940);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x86a24c,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 const STT=tex(128,128,(q,w,h)=>{q.fillStyle='#a49e92';q.fillRect(0,0,w,h);for(let i=0;i<600;i++){const v=130+(r()*60|0);q.fillStyle=`rgba(${v},${v-3},${v-10},.55)`;q.fillRect(r()*w,r()*h,2+r()*4,2+r()*3)}},[1,1]);const ST=new THREE.MeshStandardMaterial({map:STT,roughness:1,flatShading:true});
 /* 동사지: 탑 둘 + 금당터 주춧돌 */const DX=-10,DZ=-24;const pagoda=(x,z,n,s)=>{const g=new THREE.Group();g.position.set(x,0,z);let y=0;const b=new THREE.Mesh(new THREE.BoxGeometry(3.6*s,.9*s,3.6*s),ST);b.position.y=.45*s;g.add(b);y=.9*s;for(let k=0;k<n;k++){const w=(1.9-k*.22)*s,h=(k?.6:1.2)*s;const bd=new THREE.Mesh(new THREE.BoxGeometry(w,h,w),ST);bd.position.y=y+h/2;g.add(bd);y+=h;const rf=new THREE.Mesh(new THREE.BoxGeometry(w+1.3*s,.22*s,w+1.3*s),ST);rf.position.y=y+.11*s;g.add(rf);const rs=new THREE.Mesh(new THREE.BoxGeometry(w+.7*s,.16*s,w+.7*s),ST);rs.position.y=y+.3*s;g.add(rs);y+=.38*s}G.add(g);solids.push({cx:x,cz:z,r:2*s,y0:0,y1:y});g.traverse(e=>{if(e.isMesh)cam.push(e)})};pagoda(DX-5,DZ,5,1.1);pagoda(DX+5,DZ+2,3,.9);
 for(let i=0;i<5;i++)for(let k=0;k<3;k++){const sg=new THREE.Mesh(new THREE.DodecahedronGeometry(.5,0),ST);sg.scale.set(1.2,.45,1.1);sg.position.set(DX-8+i*4,.18,DZ-12+k*3.5);sg.rotation.y=r()*3;G.add(sg)}
 /* 이성산성: 돌 성벽 일부 + 아홉모 건물터 */const IX=34,IZ=-30;{const n=26;for(let i=0;i<n;i++){const a=-.3+i/n*2.2;const x=IX+Math.cos(a)*18,z=IZ+Math.sin(a)*12;const w=new THREE.Mesh(new THREE.BoxGeometry(4.6,3,2.2),ST);w.position.set(x,1.5,z);w.rotation.y=-a;G.add(w);solids.push({cx:x,cz:z,r:1.6,y0:0,y1:3})}const nine=new THREE.Mesh(new THREE.CylinderGeometry(4,4,.25,9),ST);nine.position.set(IX-4,.12,IZ+2);G.add(nine);for(let k=0;k<9;k++){const a=k/9*Math.PI*2;const sg=new THREE.Mesh(new THREE.CylinderGeometry(.35,.45,.3,8),ST);sg.position.set(IX-4+Math.cos(a)*3.4,.4,IZ+2+Math.sin(a)*3.4);G.add(sg)}}
 /* 그렝이 작업대: 주춧돌 + 기둥(놀이 때 바뀜) */const WX=8,WZ=-6;const NP=9,PW=.6;/* 기둥 지름 60cm, 단면 아홉 점 */
 solids.push({x0:WX-.6,x1:WX+.6,y0:0,y1:2.2,z0:WZ-.5,z1:WZ+.5});const stoneG=new THREE.Group();stoneG.position.set(WX,0,WZ);G.add(stoneG);const pillarG=new THREE.Group();pillarG.position.set(WX,0,WZ);G.add(pillarG);
 let rock=[],cut=[];const xs=i=>-PW/2+i*PW/(NP-1);
 const buildStone=()=>{stoneG.clear();const sh=new THREE.Shape();sh.moveTo(-.55,0);sh.lineTo(-.55,.22+rock[0]*.6);for(let i=0;i<NP;i++)sh.lineTo(xs(i)*1.0,.25+rock[i]);sh.lineTo(.55,.22+rock[NP-1]*.6);sh.lineTo(.55,0);sh.closePath();const g=new THREE.ExtrudeGeometry(sh,{depth:.9,bevelEnabled:true,bevelSize:.05,bevelThickness:.05,bevelSegments:1});g.translate(0,0,-.45);const m=new THREE.Mesh(g,ST);stoneG.add(m)};
 const pMat=new THREE.MeshStandardMaterial({color:0x9a5a34,roughness:.8});const buildPillar=(lift)=>{pillarG.clear();const sh=new THREE.Shape();sh.moveTo(-PW/2,2.2);sh.lineTo(-PW/2,.25+cut[0]);for(let i=0;i<NP;i++)sh.lineTo(xs(i),.25+cut[i]);sh.lineTo(PW/2,2.2);sh.closePath();const g=new THREE.ExtrudeGeometry(sh,{depth:PW,bevelEnabled:false});g.translate(0,0,-PW/2);const m=new THREE.Mesh(g,pMat);m.position.y=lift;pillarG.add(m);const ln=new THREE.Line(new THREE.BufferGeometry().setFromPoints(cut.map((c,i)=>new THREE.Vector3(xs(i),.25+c+lift,PW/2+.005))),new THREE.LineBasicMaterial({color:0x2a1a10}));pillarG.add(ln)};
 rock=Array.from({length:NP},(_,i)=>Math.sin(i*.9)*.04+.02);cut=rock.slice();buildStone();buildPillar(0);
 const NL=[];if(!mini){for(const[x,y,z]of[[DX,4,DZ+6],[IX-4,3,IZ+8],[WX,3,WZ+3]]){const L=new THREE.PointLight(0xffc080,0,24,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8)};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(DX,DZ+6,3.2,'하남 동사지 석탑','고려 초 큰 절터에 오층석탑과 삼층석탑(보물)이 나란히 남아 있어요. 금당터 주춧돌도 흩어져 있어요. 간추려 지었어요.');
 sp(IX-4,IZ+9,3,'이성산성','삼국 때 쌓은 돌 산성이에요(사적). 성 안에서 아홉모 건물터와 나무 글자판이 나왔어요. 간추려 지었어요.');
 sp(WX+2,WZ+2,2,'그렝이 작업대','울퉁불퉁한 주춧돌에 꼭 맞게 기둥 밑을 깎아 봐요.');
 sp(-60,30,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 그렝이질(11/22): 세 판. 기둥 밑 아홉 점을 위아래로 깎아 돌 윗면과 맞춰요. 점을 고르고 ▲▼(1cm씩). 「앉혀 보기」를 누르면 기둥이 내려앉아 틈이 보여요. 돌보다 낮게 깎으면 그 자리가 걸려서 기둥이 떠요 */
 window.__HNGR=()=>{if(document.getElementById('hnP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(WX+2,WZ+2.4,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('hnP')?[WX,.45,WZ+2.5,WX,.48,WZ,38]:null;
  let rd=0,sel=4,done=false,auto=false,last=performance.now(),msg='',phase='cut',wait=0,at=0,lift=.25,tries=0;const res=[];
  const mkRock=()=>{const a=.03+rd*.015,f=.7+Math.random()*.8,p=Math.random()*6;return Array.from({length:NP},(_,i)=>Math.max(0,a+Math.sin(i*f+p)*a+(Math.random()-.5)*rd*.03))};
  const newRound=()=>{rock=mkRock();cut=Array(NP).fill(Math.max(...rock)+.01);buildStone();lift=.25;buildPillar(lift);sel=4;phase='cut';tries=0;msg=`${rd+1}판: 기둥 밑을 돌 모양대로 깎아요`};
  const seat=()=>{/* 기둥이 내려앉는 높이: 가장 먼저 닿는 곳 */let drop=-1e9;for(let i=0;i<NP;i++)drop=Math.max(drop,rock[i]-cut[i]);const gaps=cut.map((c,i)=>c+drop-rock[i]);const mg=gaps.reduce((a,b)=>a+b,0)/NP;return{drop,mg}};
  const d=document.createElement('div');d.id='hnP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#2a1e16;border:3px solid #c89060;border-radius:16px;padding:9px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f4ece0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:310px;max-width:94vw;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🪚 그렝이질</b><div data-i style="margin:3px 0;font:14px 'Do Hyeon',sans-serif"></div><div data-pts style="display:flex;gap:3px;justify-content:center;margin:4px 0">${Array.from({length:NP},(_,i)=>`<button data-p="${i}" style="width:28px;height:28px;font:13px 'Do Hyeon',sans-serif;border:0;border-radius:7px;cursor:pointer">${i+1}</button>`).join('')}</div><div style="display:flex;gap:6px"><button data-u style="flex:1;font:16px 'Do Hyeon',sans-serif;background:#5a4030;color:#fff;border:0;border-radius:10px;padding:9px 0;cursor:pointer">▲ 덜 깎기</button><button data-dn style="flex:1;font:16px 'Do Hyeon',sans-serif;background:#5a4030;color:#fff;border:0;border-radius:10px;padding:9px 0;cursor:pointer">▼ 더 깎기</button><button data-s style="flex:1.2;font:16px 'Do Hyeon',sans-serif;background:#c89060;color:#2a1e16;border:0;border-radius:10px;padding:9px 0;cursor:pointer">앉혀 보기</button></div><div data-m style="font-size:12px;color:#f8e8a0;margin-top:5px"></div>`;
  const iEl=d.querySelector('[data-i]'),mEl=d.querySelector('[data-m]');const pbs=[...d.querySelectorAll('[data-p]')];
  const snd=(f,len,type='sine',v=.05)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(v,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const adj=v=>{if(phase!=='cut')return;cut[sel]=Math.max(-.02,Math.min(.2,+(cut[sel]+v).toFixed(3)));lift=.25;buildPillar(lift);snd(v<0?300:420,.05,'square',.02)};
  pbs.forEach(b=>b.onclick=()=>{sel=+b.dataset.p});d.querySelector('[data-u]').onclick=()=>adj(.01);d.querySelector('[data-dn]').onclick=()=>adj(-.01);
  const trySeat=()=>{if(phase!=='cut')return;tries++;phase='seat';const s=seat();anim={from:lift,to:s.drop,t:0,s}};let anim=null;d.querySelector('[data-s]').onclick=trySeat;
  const kd=e=>{if(e.code==='ArrowLeft')sel=Math.max(0,sel-1);if(e.code==='ArrowRight')sel=Math.min(NP-1,sel+1);if(e.code==='ArrowUp'){e.preventDefault();adj(.01)}if(e.code==='ArrowDown'){e.preventDefault();adj(-.01)}if(e.code==='Enter')trySeat()};addEventListener('keydown',kd);
  const cleanup=()=>{removeEventListener('keydown',kd);rock=Array.from({length:NP},(_,i)=>Math.sin(i*.9)*.04+.02);cut=rock.slice();buildStone();buildPillar(0)};
  newRound();
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   pbs.forEach((b,i)=>{b.style.background=i===sel?'#f8d878':'#4a3a2e';b.style.color=i===sel?'#2a1e16':'#f4ece0'});
   if(phase==='cut'&&auto){at+=dt;if(at>.06){at=0;const i=cut.findIndex((c,k)=>Math.abs(c-rock[k])>.006);if(i<0)trySeat();else{sel=i;adj(cut[i]>rock[i]?-.01:.01);if(Math.abs(cut[i]-rock[i])<.006)cut[i]=rock[i]}}}
   if(phase==='seat'&&anim){anim.t+=dt*1.6;const f=Math.min(1,anim.t);lift=anim.from+(anim.to-anim.from)*f;buildPillar(lift);if(f>=1){const mg=anim.s.mg;const cm=mg*100;if(cm<.6){const sc=Math.max(.6,1-(tries-1)*.1);res.push(sc);msg=`꼭 맞아요! 틈 평균 ${cm.toFixed(1)}cm`;snd(780,.35);phase='wait';wait=2}else{msg=`틈이 평균 ${cm.toFixed(1)}cm 있어요. 다시 깎아요`;snd(260,.25,'sawtooth',.03);phase='cut';if(tries>=4){res.push(Math.max(0,.5-cm/10));phase='wait';wait=2;msg+=' (다음 판으로)'}}anim=null}}
   if(phase==='wait'){wait-=dt;if(wait<=0){rd++;if(rd>=3){fin();return}newRound()}}
   iEl.textContent=`${Math.min(rd+1,3)} / 3판 · ${sel+1}번 점 · 앉혀 본 횟수 ${tries}`;mEl.textContent=msg;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('hanam_grengi',Q,'그렝이질')}catch(e){}window.__HNQ=Q;snd(660,.4);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">기둥 셋을 다 세웠어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">옛 목수는 다듬지 않은 덤벙 주춧돌 위에 기둥을 세울 때, 그렝이 자로 돌 모양을 기둥 밑에 옮겨 그려 깎았어요. 이것을 그렝이질이라고 해요. 꼭 맞으면 기둥이 미끄러지지 않고 오래 버텨요.</div><div style="font-size:24px;color:#c89060">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c89060;color:#2a1e16;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ece0;border:2px solid #f4ece0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__HNGR()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__HNG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('돌 모양대로 깎아요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'나무 글자판(목간)',h:'글을 적던 나무 조각이에요. 이성산성에서 나왔어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.03,.25,.01),M(0x8a6a40)))})},
  {n:'기와 조각',h:'절집 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.2,10,1,false,0,Math.PI),M(0x5a5a5a)))})},
  {n:'철제 자물쇠',h:'옛 쇠 자물쇠예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.12,.06,.04),M(0x4a3a30,{metalness:.6})))})},
  {n:'그렝이 자',h:'돌 모양을 기둥에 옮겨 그리던 그렝이 자예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.02,.03),M(0x8a6a44)))})},
  {n:'해동통보',h:'고려 때 돈이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__HNDIG=()=>{window.__DETECT&&window.__DETECT({key:'hanam_dig',title:'하남·성남 발굴 탐지',emoji:'⛏️',bg:'#2a1e16',count:4,TL:150,cand:[[-60,30],[-20,30],[20,30],[60,10],[-70,0],[-40,-40],[10,15],[-30,10]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'하남·성남은 옛 절터와 산성의 고장이에요.'})};
 const meta={quest:{t:'하남·성남 둘러보기',d:'동사지 석탑과 이성산성을 둘러보세요.',steps:[['동사지','하남 동사지 석탑'],['이성산성','이성산성']]},
  title:'하남·성남 동사지·이성산성',hint:'동사지 석탑·이성산성을 공개 사진으로 간추려 지었어요. 덤벙 주춧돌에 맞춰 기둥 밑을 깎아 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-8,z:14,lines:['하남·성남','동사지 오층·삼층 석탑','이성산성 · 그렝이질','간추려 지음']}},
  npc:[['science',[[-12,6],[-4,6],[-4,18],[-12,18]]]],bounds:[-90,80,-70,60],level:()=>'하남',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#86a24c';g.fillRect(0,0,300,300);g.fillStyle='#a49e92';g.fillRect(X(DX-7),Z(DZ-2),4*S,4*S);g.fillRect(X(DX+3.5),Z(DZ+.5),3*S,3*S);g.strokeStyle='#a49e92';g.lineWidth=3;g.beginPath();g.ellipse(X(IX),Z(IZ),18*S,12*S,0,-.3,1.9);g.stroke()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:22,yaw:Math.PI},size:{}},meta)}
