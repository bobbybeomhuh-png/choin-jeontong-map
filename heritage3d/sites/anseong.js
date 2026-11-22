/* 안성 마당(2026-11-22, W53): 남사당 줄타기와 안성 유기(놋그릇) 공방.
   실측: 신라 놋그릇(국가유산청 KHS 공개 실측 「Brassware Bowls」, CC BY, 실제 지름 약 18cm). 안성 유기는 「안성맞춤」이라는 말이 생길 만큼 이름난 놋그릇.
   안성 남사당(바우덕이): 조선 후기 떠돌이 놀이패. 줄타기(어름)는 줄 위에서 부채로 균형을 잡으며 재담을 함(줄타기·남사당놀이 모두 유네스코 인류무형유산).
   공방·마당·줄은 공개 사진으로 간추려 지음.
   놀이: 줄타기(부채로 몸 기울기를 바로잡으며 줄 끝까지 건너기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildAnseong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1848);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x9a9a5a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 남사당 놀이 마당: 흙마당 + 줄(높이 3m, 길이 12m) + 양끝 Λ자 나무 받침 */const RX=0,RZ=-14,RL=12,RH=3;const WOOD=M(0x7a5a3a);
 {const yard=new THREE.Mesh(new THREE.CircleGeometry(16,40),M(0xc8b088,{roughness:1}));yard.rotation.x=-Math.PI/2;yard.position.set(RX,.02,RZ);G.add(yard);
  for(const sx of[-1,1]){const x=RX+sx*RL/2;for(const sz of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.08,.1,RH*1.12,8),WOOD);p.position.set(x,RH/2,RZ+sz*.7);p.rotation.x=-sz*.24;G.add(p)}const stay=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,4.6,4),M(0xd8c8a0));stay.position.set(x+sx*1.9,RH/2,RZ);stay.rotation.z=sx*.68;G.add(stay);solids.push({cx:x,cz:RZ,r:.9,y0:0,y1:RH})}
  const rope=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,RL,6),M(0xe8dcc0));rope.rotation.z=Math.PI/2;rope.position.set(RX,RH,RZ);G.add(rope);
  /* 악사 자리: 장구·북·꽹과리 */for(const[dx,c]of[[-3,0xc83a2a],[-1.5,0x2a5a8a],[0,0x8a6a2a]]){const dr=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.5,14),M(c));dr.rotation.z=Math.PI/2;dr.position.set(RX+dx,.35,RZ+8);G.add(dr)}
  const banner=new THREE.Mesh(new THREE.PlaneGeometry(1.4,3),M(0xf4ecd8,{side:THREE.DoubleSide}));banner.position.set(RX+9,2.6,RZ+3);G.add(banner);const bp=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,4.6,6),WOOD);bp.position.set(RX+9.75,2.3,RZ+3);G.add(bp)}
 /* 줄광대: 몸·머리·갓·부채 */const walker=new THREE.Group();{const body=new THREE.Mesh(new THREE.CylinderGeometry(.16,.26,1.1,10),M(0xf4f0e8));body.position.y=.55;walker.add(body);const hd=new THREE.Mesh(new THREE.SphereGeometry(.14,12,10),M(0xe8c8a0));hd.position.y=1.25;walker.add(hd);const brim=new THREE.Mesh(new THREE.CylinderGeometry(.32,.32,.02,16),M(0x1a1a1a));brim.position.y=1.38;walker.add(brim);const crown=new THREE.Mesh(new THREE.CylinderGeometry(.1,.12,.18,12),M(0x1a1a1a));crown.position.y=1.48;walker.add(crown);const arm=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.9,6),M(0xf4f0e8));arm.rotation.z=Math.PI/2;arm.position.y=.95;walker.add(arm);const fan=new THREE.Mesh(new THREE.CircleGeometry(.32,12,0,Math.PI),M(0xf8e0a0,{side:THREE.DoubleSide}));fan.position.set(.5,1,0);walker.add(fan);walker.userData.fan=fan}
 walker.position.set(RX-RL/2+.6,RH,RZ);G.add(walker);
 /* 안성 유기 공방(동쪽) */const BX=28,BZ=8;if(!mini){const h=buildHall({x:BX,z:BZ,ry:-Math.PI/2,W:10,D:6,nx:3,nz:2,FY:.5,PH:3,roof:'gable',name:'鍮器',pillar:0x6a4a30,bracket:'ik',front:'open',roofScale:.95,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 const bowlSpots=[];{const fg=new THREE.Mesh(new THREE.BoxGeometry(1.4,1,1.4),M(0x6a4a3a));fg.position.set(BX-6,.5,BZ-4);G.add(fg);const fire=new THREE.PointLight(0xff7a2a,2,5,2);fire.position.set(BX-6,1.3,BZ-4);G.add(fire);const ember=new THREE.Mesh(new THREE.SphereGeometry(.35,10,8),M(0xff6a1a,{emissive:0xc83a0a}));ember.scale.y=.4;ember.position.set(BX-6,1.05,BZ-4);G.add(ember);solids.push({cx:BX-6,cz:BZ-4,r:.9,y0:0,y1:1.2});
  const anv=new THREE.Mesh(new THREE.BoxGeometry(.5,.6,.3),M(0x3a3a3a,{metalness:.6}));anv.position.set(BX-6,.3,BZ-1.8);G.add(anv);
  const tb=new THREE.Mesh(new THREE.BoxGeometry(3,.8,1),M(0x8a6a44));tb.position.set(BX-6,.4,BZ+3);G.add(tb);solids.push({x0:BX-7.6,x1:BX-4.4,y0:0,y1:.9,z0:BZ+2.4,z1:BZ+3.6});for(let i=0;i<5;i++)bowlSpots.push([BX-7.1+i*.55,.8,BZ+3]);
  const ped=new THREE.Mesh(new THREE.CylinderGeometry(.7,.8,1,16),M(0x9a9488));ped.position.set(BX-6,.5,BZ+7);G.add(ped);solids.push({cx:BX-6,cz:BZ+7,r:.8,y0:0,y1:2})}
 if(!mini){const L=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');L.setDRACOLoader(dr);L.load(new URL('../models/anseong/bowl.glb',import.meta.url).href,m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;if(e.material){e.material.transparent=false;e.material.alphaTest=0}}});const b=new THREE.Box3().setFromObject(o);const c=b.getCenter(new THREE.Vector3());o.position.set(-c.x,-b.min.y,-c.z);const w=new THREE.Group();w.add(o);w.userData.noBatch=true;
  bowlSpots.forEach(([x,y,z],i)=>{const c2=w.clone();c2.position.set(x,y,z);c2.scale.setScalar(1-i*.06);G.add(c2)});const big=w.clone();big.scale.setScalar(6);big.position.set(BX-6,1,BZ+7);G.add(big)},undefined,()=>{})}
 const NL=[];if(!mini){for(const[x,y,z]of[[RX-4,3,RZ+6],[RX+4,3,RZ+6],[BX-3,3,BZ]]){const L=new THREE.PointLight(0xffc080,0,26,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 /* 밤: 마당 횃불 */const torches=[];if(!mini)for(const[x,z]of[[RX-10,RZ+6],[RX+10,RZ+6],[RX-10,RZ-6],[RX+10,RZ-6]]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.05,.06,2.2,6),WOOD);p.position.set(x,1.1,z);G.add(p);const f=new THREE.Mesh(new THREE.ConeGeometry(.18,.5,8),M(0xffa030,{emissive:0xff6a10}));f.position.set(x,2.45,z);f.visible=false;G.add(f);torches.push(f)}
 let nk=0,tt=0;const nightTick=dt=>{tt+=dt;const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8);torches.forEach((f,i)=>{f.visible=nk>.3;f.scale.y=1+Math.sin(tt*9+i)*.15});if(!document.getElementById('asP')){walker.rotation.z=Math.sin(tt*1.3)*.12;walker.userData.fan.rotation.z=Math.sin(tt*2)*.4}};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(RX,RZ+10,3.4,'남사당 놀이 마당','안성은 조선 후기 떠돌이 놀이패 남사당의 근거지예요. 여자로서 남사당 꼭두쇠(우두머리)가 된 바우덕이가 이름났어요. 줄타기·남사당놀이는 유네스코 인류무형유산이에요. 간추려 지었어요.');
 sp(RX+5,RZ+10,2.4,'줄 타는 자리','부채로 균형을 잡으며 줄 끝까지 건너 봐요.');
 sp(BX-2,BZ,3,'안성 유기 공방','놋쇠(구리+주석)를 녹여 붓거나 두드려 만든 그릇이 유기예요. 안성 유기가 주문한 대로 꼭 맞게 잘 만들어 「안성맞춤」이라는 말이 생겼어요. 공방은 간추려 지었어요.');
 sp(BX-4,BZ+8.5,2.6,'놋그릇 실측','신라 놋그릇을 국가유산청이 실측한 3D예요(지름 약 18cm). 좌판의 그릇이 실제 크기, 받침 위는 여섯 배로 키운 모습이에요. 신라 놋그릇은 당나라와 멀리 아라비아까지 팔렸대요.');
 sp(-40,30,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 줄타기(11/22): 줄광대가 저절로 앞으로 걸어요(몸이 곧을 때만). 몸은 가만두면 점점 한쪽으로 기울고 바람도 불어요. ◀ ▶를 누르고 있으면 부채로 반대쪽 힘을 줘요. 50도 넘게 기울면 떨어져 2m 뒤에서 다시. 줄 끝(12m)까지 60초 안에 */
 window.__ASROPE=()=>{if(document.getElementById('asP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(RX+5,RZ+11,0)}catch(e){}
  let x=0,th=0,om=0,dir=0,t=0,last=performance.now(),falls=0,done=false,auto=false,gust=0,gT=2,msg='';const TL=60;
  window.__GCAM=()=>document.getElementById('asP')?[RX-RL/2+x-5,RH+2,RZ+.3,RX-RL/2+x+4,RH+.5,RZ,55]:null;
  const d=document.createElement('div');d.id='asP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#2a1e18;border:3px solid #f8d080;border-radius:16px;padding:10px 14px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f8f0e0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:300px;max-width:94vw;user-select:none;touch-action:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f8d080">🪭 남사당 줄타기</b><div data-i style="margin:4px 0;font:14px 'Do Hyeon',sans-serif"></div><div style="position:relative;height:14px;background:#4a3a2a;border-radius:7px;margin:6px 0"><div style="position:absolute;left:40%;width:20%;top:0;bottom:0;background:#5a8a3a;border-radius:4px"></div><div data-g style="position:absolute;top:-3px;width:8px;height:20px;background:#f8d080;border-radius:3px;left:50%;margin-left:-4px"></div></div><div style="height:8px;background:#3a2a1a;border-radius:4px;overflow:hidden"><div data-p style="height:100%;width:0;background:#e8a040"></div></div><div style="display:flex;gap:8px;margin-top:8px"><button data-l style="flex:1;font:22px 'Do Hyeon',sans-serif;background:#8a5a3a;color:#fff;border:0;border-radius:12px;padding:10px 0;cursor:pointer;touch-action:none">◀ 왼쪽</button><button data-r style="flex:1;font:22px 'Do Hyeon',sans-serif;background:#8a5a3a;color:#fff;border:0;border-radius:12px;padding:10px 0;cursor:pointer;touch-action:none">오른쪽 ▶</button></div><div data-m style="font-size:12px;color:#f8d080;margin-top:5px">몸이 기우는 반대쪽을 눌러 노란 막대를 초록 칸에!</div>`;
  /* 카메라가 남쪽에서 북쪽(-z)을 봐서 화면 오른쪽이 +x(줄 앞쪽). 기울기 th>0 = 화면 오른쪽(앞)으로 기욺 → 몸은 z축 둘레로 돎. 여기서는 옆(z) 방향 기울기를 화면 좌우로 보여 줌 */
  const hold=(el,v)=>{el.onpointerdown=e=>{e.preventDefault();dir=v};el.onpointerup=el.onpointerleave=el.onpointercancel=()=>{if(dir===v)dir=0}};hold(d.querySelector('[data-l]'),-1);hold(d.querySelector('[data-r]'),1);
  const kd=e=>{if(e.key==='ArrowLeft')dir=-1;if(e.key==='ArrowRight')dir=1},ku=e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight')dir=0};addEventListener('keydown',kd);addEventListener('keyup',ku);
  const iEl=d.querySelector('[data-i]'),gEl=d.querySelector('[data-g]'),pEl=d.querySelector('[data-p]'),mEl=d.querySelector('[data-m]');
  const snd=(f,len,type='sine')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const cleanup=()=>{removeEventListener('keydown',kd);removeEventListener('keyup',ku);walker.position.x=RX-RL/2+.6;walker.rotation.x=0;walker.position.y=RH};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;
   gT-=dt;if(gT<=0){gust=(Math.random()-.5)*1.6;gT=1.5+Math.random()*2;if(Math.abs(gust)>.5){msg=gust>0?'바람이 오른쪽으로 불어요!':'바람이 왼쪽으로 불어요!'}}
   if(auto){const k=th+.45*om;dir=Math.abs(k)<.03?0:(k>0?-1:1)}
   om+=(2.4*Math.sin(th)+gust+dir*3.2)*dt;om*=Math.pow(.6,dt);th+=om*dt;
   if(Math.abs(th)>.87){falls++;snd(140,.4,'square');msg='앗, 떨어졌어요! 2m 뒤에서 다시 올라가요';x=Math.max(0,x-2);th=0;om=0}
   const ok=Math.abs(th)<.35;if(ok)x+=.55*dt;if(ok&&Math.random()<dt*.6)snd(520+Math.random()*200,.06,'triangle');
   walker.position.x=RX-RL/2+.6+x;walker.rotation.x=th;walker.position.y=RH;walker.userData.fan.rotation.z=dir*.8+Math.sin(now/120)*.2;
   gEl.style.left=(50+th/.87*50)+'%';pEl.style.width=Math.min(100,x/(RL-1.2)*100)+'%';iEl.textContent=`${Math.max(0,Math.ceil(TL-t))}초 · ${x.toFixed(1)} / ${(RL-1.2).toFixed(1)}m · 떨어짐 ${falls}번`;mEl.textContent=msg||mEl.textContent;
   if(x>=RL-1.2){fin(true);return}if(t>=TL){fin(false);return}requestAnimationFrame(step)};
  const fin=ok=>{if(done)return;done=true;cleanup();const prog=Math.min(1,x/(RL-1.2));const Q=Math.round(Math.max(0,Math.min(100,ok?100-falls*15-Math.max(0,t-30)*.8:prog*60)));const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('anseong_rope',Q,'남사당 줄타기')}catch(e){}window.__ASQ=Q;snd(ok?780:260,.4);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f8d080">${ok?'줄 끝까지 건넜어요! 얼씨구!':'시간이 다 됐어요'} ${Q}점</b><div style="font-size:13px;margin:4px 0">줄광대는 부채를 기우는 쪽으로 펴서 무게중심을 줄 위로 되돌려요. 줄 위에서 앉고, 뛰고, 재담을 하며 아래 어릿광대와 말을 주고받아요.</div><div style="font-size:24px;color:#f8d080">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#f8d080;color:#2a1e18;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f8f0e0;border:2px solid #f8f0e0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__ASROPE()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__ASG={set auto(v){auto=v},get done(){return done},get x(){return x},get falls(){return falls}};try{ctx.say('부채로 균형을 잡아요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'놋숟가락',h:'안성 유기 공방에서 만든 놋숟가락이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.04,.01,.22),M(0xc8a040,{metalness:.8,roughness:.3})))})},
  {n:'꽹과리 조각',h:'남사당 풍물패가 치던 꽹과리 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.02,18),M(0xb8902a,{metalness:.7})))})},
  {n:'부채 살',h:'줄광대 부채의 대나무 살이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.01,.01,.3),M(0x9a7a4a)))})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'놀이패에게 던져 준 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__ASDIG=()=>{window.__DETECT&&window.__DETECT({key:'anseong_dig',title:'안성 발굴 탐지',emoji:'⛏️',bg:'#2a1e18',count:4,TL:150,cand:[[-40,30],[-60,0],[0,40],[40,-30],[-30,-50],[50,40],[-60,40],[20,-55]],items:ITEMS,intro:'땅속에 놀이패와 장인의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'안성은 남사당과 놋그릇의 고장이에요.'})};
 const meta={quest:{t:'안성 둘러보기',d:'남사당 놀이 마당과 유기 공방을 둘러보세요.',steps:[['놀이 마당','남사당 놀이 마당'],['유기 공방','안성 유기 공방'],['놋그릇','놋그릇 실측']]},
  title:'안성 남사당·유기 공방',hint:'신라 놋그릇(국가유산청 실측)을 실제 크기로, 남사당 마당·유기 공방은 간추려 지었어요. 부채로 균형을 잡으며 줄을 건너 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-4,z:20,lines:['안성','남사당 바우덕이','안성맞춤 유기','간추려 지음']}},
  npc:[['science',[[-8,16],[4,16],[4,26],[-8,26]]]],bounds:[-90,90,-90,90],level:()=>'안성',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#9a9a5a';g.fillRect(0,0,300,300);g.fillStyle='#c8b088';g.beginPath();g.arc(X(RX),Z(RZ),16*S,0,7);g.fill();g.strokeStyle='#5a3a2a';g.lineWidth=2;g.beginPath();g.moveTo(X(RX-6),Z(RZ));g.lineTo(X(RX+6),Z(RZ));g.stroke();g.fillStyle='#6a4a30';g.fillRect(X(BX-3),Z(BZ-5),6*S,10*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:24,yaw:Math.PI},size:{}},meta)}
