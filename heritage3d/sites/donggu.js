/* 구리 동구릉·남양주 다산 마당(2026-11-22, W29): 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   동구릉(세계유산 「조선왕릉」 2009): 왕릉 아홉이 모인 곳. 건원릉(태조 이성계)은 고향 함흥의 억새를 덮어 봉분에 잔디 대신 억새가 자람. 왕릉 차례: 홍살문 → 참도(신도·어도) → 정자각(丁자 모양 제사 건물) → 언덕 위 능침(봉분·병풍석·난간석·혼유석·망주석·문인석·무인석·석마·석양·석호).
   남양주 마재마을 여유당: 다산 정약용(1762~1836)이 태어나고 돌아와 생을 마친 집. 정조 때 수원 화성을 쌓으며 도르래를 엮은 거중기를 설계(「기기도설」 참고)해 큰 돌을 적은 힘으로 들어 올림.
   놀이: 거중기로 돌 들기(돌 무게를 보고 움직도르래 수 고르기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {placeHanok} from './hanokkit.js';
export function buildDonggu(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1408);
 const TOUCH=opts.touch!=null?!!opts.touch:matchMedia('(pointer:coarse)').matches;
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 북쪽 능침 언덕(z<-30) */const ss=t=>t<=0?0:t>=1?1:t*t*(3-2*t);const H=(x,z)=>{const d=Math.hypot(x+10,(z+48)*.8);return 6*ss(1-(d-10)/18)};
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(220,200,110,100);g.rotateX(-Math.PI/2);const p=g.attributes.position;for(let k=0;k<p.count;k++)p.setY(k,H(p.getX(k),p.getZ(k)));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,color:0x7a9a4a,roughness:1}));m.receiveShadow=true;G.add(m)}
 const stM=M(0xb8b0a0,{flatShading:true});const LX=-10,LZ=-48,LY=6;
 /* 홍살문 */{const rd=M(0xb8301a);const g=new THREE.Group();g.position.set(LX,0,20);for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.18,.2,7,10),rd);p.position.set(s*3,3.5,0);g.add(p)}const b=new THREE.Mesh(new THREE.BoxGeometry(6.6,.3,.3),rd);b.position.y=5.8;g.add(b);for(let k=0;k<11;k++){const a=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,1.6,5),rd);a.position.set(-2.6+k*.52,6.7,0);g.add(a)}const t=new THREE.Mesh(new THREE.TorusGeometry(.3,.06,6,16),M(0x2a4a8a));t.position.set(0,6.6,.05);g.add(t);G.add(g)}
 /* 참도: 가운데 높은 신도, 옆 낮은 어도 */{const a=new THREE.Mesh(new THREE.BoxGeometry(1.6,.22,30),stM);a.position.set(LX-.6,.11,4);G.add(a);const b=new THREE.Mesh(new THREE.BoxGeometry(1.2,.12,30),stM);b.position.set(LX+1,.06,4);G.add(b)}
 /* 정자각(丁자) */if(!mini){const h=buildHall({x:LX,z:-16,ry:Math.PI,W:6,D:5,nx:3,nz:2,FY:1.2,PH:3,roof:'gable',name:'丁字閣',pillar:0x9a3a26,bracket:'ik',front:'door',roofScale:.95,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)});const h2=buildHall({x:LX,z:-21,ry:Math.PI,W:3.6,D:4,nx:1,nz:1,FY:1.2,PH:3,roof:'gable',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',stairs:'none',roofScale:.9,solids,light:false});h2.group.rotation.y=Math.PI/2;h2.group.position.set(LX,0,-21);G.add(h2.group)}
 /* 능침: 억새 봉분(건원릉) + 곡장 + 석물 */{const bong=new THREE.Mesh(new THREE.SphereGeometry(5,24,12,0,Math.PI*2,0,Math.PI/2),M(0xc8b070,{roughness:1}));bong.scale.y=.55;bong.position.set(LX,LY,LZ);G.add(bong);solids.push({cx:LX,cz:LZ,r:5.4,y0:0,y1:LY+3})
  const reeds=new THREE.InstancedMesh(new THREE.ConeGeometry(.08,1,4),M(0xd8c088),900);const o=new THREE.Object3D();for(let k=0;k<900;k++){const a=r()*6.28,u=r();const rr=5*Math.sqrt(u)*.98;const y=Math.sqrt(Math.max(0,1-(rr/5)**2))*5*.55;o.position.set(LX+Math.cos(a)*rr,LY+y+.3,LZ+Math.sin(a)*rr);o.rotation.set((r()-.5)*.5,0,(r()-.5)*.5);o.updateMatrix();reeds.setMatrixAt(k,o.matrix)}G.add(reeds);
  for(let k=0;k<24;k++){const a=k/24*Math.PI*2;const p=new THREE.Mesh(new THREE.BoxGeometry(.25,.9,.25),stM);p.position.set(LX+Math.cos(a)*6.4,LY+.45,LZ+Math.sin(a)*6.4);G.add(p)}
  const wall=M(0xc8bca8);for(let k=0;k<16;k++){const a=Math.PI+k/15*Math.PI;const x=LX+Math.cos(a)*9,z=LZ+Math.sin(a)*9*.9;const w=new THREE.Mesh(new THREE.BoxGeometry(2,1.6,.5),wall);w.position.set(x,LY+.8,z);w.rotation.y=-a+Math.PI/2;G.add(w)}
  const hon=new THREE.Mesh(new THREE.BoxGeometry(2.4,.5,1.4),stM);hon.position.set(LX,LY+.5,LZ+6.6);G.add(hon);
  for(const s of[-1,1]){const mz=new THREE.Mesh(new THREE.CylinderGeometry(.22,.28,2.8,8),stM);mz.position.set(LX+s*3.6,LY+1.4,LZ+6.8);G.add(mz);
   const fig=(x,z,h,arm)=>{const g=new THREE.Group();g.position.set(x,LY,z);const b=new THREE.Mesh(new THREE.BoxGeometry(.9,h*.7,.7),stM);b.position.y=h*.35;g.add(b);const hd=new THREE.Mesh(new THREE.BoxGeometry(.7,h*.3,.65),stM);hd.position.y=h*.85;g.add(hd);if(arm){const sw=new THREE.Mesh(new THREE.BoxGeometry(.12,h*.5,.12),stM);sw.position.set(0,h*.4,.4);g.add(sw)}G.add(g);solids.push({cx:x,cz:z,r:.6,y0:0,y1:LY+h})};
   fig(LX+s*2.6,LZ+9.4,2.6,false);fig(LX+s*2.6,LZ+12.2,2.8,true);
   const horse=new THREE.Mesh(new THREE.BoxGeometry(.6,1,1.4),stM);horse.position.set(LX+s*4,LY+.5,LZ+10.8);G.add(horse);
   for(const k of[0,1]){const an=new THREE.Mesh(new THREE.BoxGeometry(.5,.6,.9),stM);const a=Math.PI/2+s*(1.1+k*.5);an.position.set(LX+Math.cos(a)*7.4,LY+.3,LZ-Math.sin(a)*7.4*-1);G.add(an)}}}
 /* 남양주 여유당(동쪽) + 거중기 */const YX=40,YZ=0;if(!mini){for(const[k,x,z,ry]of[['sarang',YX,YZ-10,Math.PI],['choga1',YX+14,YZ-8,Math.PI]])placeHanok(G,solids,k,x,z,ry,{TOUCH,s:.75})}
 const QX=YX-2,QZ=YZ+12;const crane=new THREE.Group();crane.position.set(QX,0,QZ);G.add(crane);const wd=M(0x8a6a44);let hook,stone,ropeL;
 {for(const sx of[-1.6,1.6])for(const sz of[-1.2,1.2]){const p=new THREE.Mesh(new THREE.BoxGeometry(.22,6,.22),wd);p.position.set(sx,3,sz);crane.add(p)}for(const sz of[-1.2,1.2]){const b=new THREE.Mesh(new THREE.BoxGeometry(3.6,.25,.25),wd);b.position.set(0,6,sz);crane.add(b)}const top=new THREE.Mesh(new THREE.BoxGeometry(.3,.3,2.8),wd);top.position.set(0,6.1,0);crane.add(top);
  for(const sx of[-1,1]){const wh=new THREE.Mesh(new THREE.CylinderGeometry(.6,.6,.2,16),wd);wh.rotation.z=Math.PI/2;wh.position.set(sx*2.1,1.2,0);crane.add(wh)}
  for(let k=0;k<4;k++){const pu=new THREE.Mesh(new THREE.TorusGeometry(.18,.05,6,14),M(0x6a5a40,{metalness:.4}));pu.position.set(-.45+k*.3,5.85,0);crane.add(pu)}
  hook=new THREE.Group();crane.add(hook);for(let k=0;k<4;k++){const pu=new THREE.Mesh(new THREE.TorusGeometry(.16,.05,6,14),M(0x6a5a40,{metalness:.4}));pu.position.set(-.45+k*.3,0,0);hook.add(pu)}stone=new THREE.Mesh(new THREE.BoxGeometry(1.2,.7,.9),stM);stone.position.y=-.6;hook.add(stone);ropeL=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,1,4),M(0xc8a860));crane.add(ropeL);hook.position.y=.95;
  crane.traverse(e=>{if(e.isMesh)cam.push(e)});solids.push({x0:QX-1.8,x1:QX+1.8,y0:0,y1:6,z0:QZ-1.4,z1:QZ+1.4})}
 const setHook=y=>{hook.position.y=y;ropeL.scale.y=Math.max(.1,6-y);ropeL.position.set(0,(6+y)/2,0)};setHook(.95);
 const NL=[];if(!mini){for(const[x,y,z]of[[LX,3,22],[LX,4,-12],[LX,LY+3,LZ+8],[YX,3,YZ-4]]){const L=new THREE.PointLight(0xffc080,0,22,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(LX+4,24,3,'동구릉 홍살문','동구릉은 조선 왕릉 아홉 곳이 모인 곳이에요. 조선 왕릉 40기는 2009년 세계유산이 됐어요. 붉은 홍살문부터 신성한 곳이 시작돼요. 간추려 지었어요.');
 sp(LX+3,-10,2.6,'정자각','丁(정)자 모양의 제사 건물이에요. 가운데 높은 길(신도)은 혼령이, 옆 낮은 길(어도)은 임금이 걸었어요.');
 sp(LX+6,LZ+12,3,'건원릉','태조 이성계의 능이에요. 고향 함흥을 그리워한 태조를 위해 함흥의 억새를 옮겨 심어, 지금도 봉분에 잔디 대신 억새가 자라요. 해마다 한식에 한 번 베어요.');
 sp(QX-3.4,QZ+2.4,2,'거중기','다산 정약용이 정조의 명으로 설계한 기계예요. 위아래 도르래를 여러 개 엮어 작은 힘으로 큰 돌을 들었어요. 수원 화성을 쌓을 때 썼어요.');
 sp(YX,YZ-3,3,'여유당','다산 정약용이 태어나 자라고, 18년 유배를 마치고 돌아와 「목민심서」 등을 다듬으며 생을 마친 집이에요. 「여유(與猶)」는 조심하라는 뜻이에요.');
 sp(20,30,2.4,'발굴 탐지 자리','땅속에 옛 사람들의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 거중기로 돌 들기(11/22): 돌 무게를 보고 움직도르래 수(1~4)를 골라 「당기기」. 도르래 하나에 힘이 절반씩 줄어(무게÷(2×도르래)) 사람 힘(25관) 안이면 들 수 있지만, 도르래가 많을수록 줄을 길게 당겨야 해서 느려요. 돌 여섯, 75초 */
 window.__DGCRANE=()=>{if(document.getElementById('dgP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(QX-3.4,QZ+2.4,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('dgP')?[QX-5,4,QZ+8,QX,3,QZ,55]:null;
  const W=[40,90,140,60,180,120],N=W.length,TL=75,STR=25;let i=0,pul=1,lift=0,pulling=false,done=false,t0=performance.now()/1000,last=t0,strain=0,score=0;
  const d=document.createElement('div');d.id='dgP';d.style.cssText="position:fixed;right:12px;bottom:130px;z-index:60;background:#2a2218;border:3px solid #c8a860;border-radius:16px;padding:10px 14px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:240px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d890">⚙️ 거중기로 돌 들기</b><div id="dgS" style="font-size:13px;margin:2px 0"></div><div id="dgW" style="font:18px 'Do Hyeon',sans-serif"></div><div style="display:flex;gap:4px;justify-content:center;margin:6px 0">${[1,2,3,4].map(k=>`<button data-p="${k}" style="font:14px 'Do Hyeon',sans-serif;border:0;border-radius:8px;padding:6px 10px;cursor:pointer">도르래 ${k}</button>`).join('')}</div><div id="dgF" style="font-size:13px"></div><div style="height:10px;background:#444;border-radius:5px;overflow:hidden;margin:4px 0"><div id="dgB" style="height:100%;width:0;background:#9ad060"></div></div><button id="dgPull" style="width:100%;font:18px 'Do Hyeon',sans-serif;background:#c8a860;color:#2a2218;border:0;border-radius:12px;padding:10px 0;cursor:pointer">🪢 당기기(누르고 있기)</button><div id="dgG" style="font-size:12px;color:#f0d890;margin-top:4px">무게를 보고 도르래 수를 골라요</div><div id="dgT">${TL}초</div>`;
  const pb=[...d.querySelectorAll('[data-p]')];const force=()=>W[i]/(2*pul);
  const draw=()=>{for(let k=0;k<4;k++)hook.children[k].visible=k<pul;d.querySelector('#dgS').textContent=(i+1)+' / '+N+'번째 돌 · 성공 '+score;d.querySelector('#dgW').textContent='돌 무게 '+W[i]+'관';pb.forEach(b=>{const k=+b.dataset.p;b.style.background=k===pul?'#c8a860':'#5a4a34';b.style.color=k===pul?'#2a2218':'#f4ecd8'});const f=force();d.querySelector('#dgF').textContent='당기는 힘 '+f.toFixed(1)+'관 / 사람 힘 '+STR+'관 '+(f<=STR?'✔':'✖ 너무 무거워요');d.querySelector('#dgB').style.width=Math.round(lift*100)+'%'};
  pb.forEach(b=>b.onclick=()=>{if(done)return;pul=+b.dataset.p;lift=0;draw()});
  const pull=d.querySelector('#dgPull');pull.onpointerdown=e=>{e.preventDefault();pulling=true};pull.onpointerup=pull.onpointerleave=()=>pulling=false;const onKey=e=>{if(e.code==='Space'){e.preventDefault();pulling=e.type==='keydown'}};addEventListener('keydown',onKey,true);addEventListener('keyup',onKey,true);
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  let tick=0;const cleanup=()=>{removeEventListener('keydown',onKey,true);removeEventListener('keyup',onKey,true);setHook(.95);for(let k=0;k<4;k++)hook.children[k].visible=true};
  const fin=()=>{if(done)return;done=true;cleanup();const el=performance.now()/1000-t0;const Q=score>=N?Math.max(60,Math.round(100-Math.max(0,el-40)*.8-strain*2)):Math.round(score/N*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('donggu_crane',Q,'거중기로 돌 들기')}catch(e){}window.__DGQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0d890">돌 ${score}개를 들어 올렸어요</b><div style="font-size:13px;margin:4px 0">움직도르래 하나는 힘을 절반으로 줄여 주지만 줄은 두 배로 당겨야 해요. 다산은 이 원리로 거중기를 만들어, 화성 공사에서 일꾼의 힘과 비용을 크게 줄였어요.</div><div style="font-size:24px;color:#c8a860">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a860;color:#2a2218;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__DGCRANE()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  draw();
  const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}const now=performance.now()/1000,dt=Math.min(.1,now-last);last=now;
   if(!done){if(pulling){if(force()>STR){strain+=dt;d.querySelector('#dgG').textContent='꼼짝도 안 해요! 도르래를 늘려요';if(((tick+=dt)%.4)<dt)snd(120,.15,'sawtooth')}else{lift+=dt/(1.2*pul);d.querySelector('#dgG').textContent='영차! 올라가요';if(((tick+=dt)%.25)<dt)snd(500+lift*400,.05,'square')}}
    stone.scale.set(1+W[i]/300,1+W[i]/400,1);setHook(.95+lift*4);if(lift>=1){score++;snd(880,.25);lift=0;i++;if(i>=N){fin()}else{pul=1;d.querySelector('#dgG').textContent='다음 돌! 무게를 보고 도르래를 골라요'}}if(!done)draw();
    const left=Math.max(0,TL-(now-t0));d.querySelector('#dgT').textContent=Math.ceil(left)+'초';if(left<=0)fin()}
   requestAnimationFrame(loop)};loop();
  window.__DGG={setPul:k=>{pul=k;lift=0},set pulling(v){pulling=v},get i(){return i},W,get score(){return score}};try{ctx.say('도르래 수를 골라 돌을 들어 봐요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'제기 조각',h:'왕릉 제사에 쓰던 놋 제기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.1,.08,14),M(0xb08840,{metalness:.7})))})},
  {n:'도르래 바퀴',h:'나무 도르래 바퀴예요. 거중기에도 이런 바퀴를 썼어요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.TorusGeometry(.1,.03,6,14),M(0x6a4a2a));g.add(m)})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})},
  {n:'먹',h:'다산이 500권 넘는 책을 쓸 때도 먹을 갈았겠지요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.16,.04,.05),M(0x1a1a1a)))})}];
 window.__DGDIG=()=>{window.__DETECT&&window.__DETECT({key:'donggu_dig',title:'동구릉·다산 발굴 탐지',emoji:'⛏️',bg:'#2a2218',count:4,TL:150,cand:[[20,30],[30,40],[-30,30],[50,30],[-36,10],[60,-20],[24,-30],[-40,40]],items:ITEMS,intro:'땅속에 옛 사람들의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'왕릉의 정성과 실학자의 꾀가 함께 남은 곳이에요.'})};
 const meta={quest:{t:'동구릉과 여유당 둘러보기',d:'왕릉 길을 따라 건원릉까지, 그리고 다산의 집과 거중기를 둘러보세요.',steps:[['홍살문','동구릉 홍살문'],['정자각','정자각'],['건원릉','건원릉'],['거중기','거중기'],['여유당','여유당']]},
  title:'구리 동구릉·남양주 다산',hint:'세계유산 동구릉 건원릉(억새 봉분)과 다산 정약용의 여유당·거중기를 간추려 지었어요. 도르래 수를 골라 돌을 들어 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:12,z:26,lines:['구리 동구릉 · 남양주 다산','세계유산 조선왕릉','건원릉 억새 · 거중기','간추려 지음']}},
  npc:[['science',[[8,24],[18,24],[18,32],[8,32]]]],bounds:[-90,90,-90,90],level:()=>'구리',camCap:()=>Infinity,baseAt:(x,z)=>H(x,z),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.3,ox:0,oz:-10,draw(g,X,Z,S){g.fillStyle='#7a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#c8b070';g.beginPath();g.arc(X(LX),Z(LZ),5*S,0,7);g.fill();g.fillStyle='#b8b0a0';g.fillRect(X(LX-1.4),Z(-11),2.8*S,31*S);g.fillStyle='#b8301a';g.fillRect(X(LX-3),Z(20)-2,6*S,4);g.fillStyle='#8a6a48';g.fillRect(X(YX-5),Z(YZ-13),10*S,6*S);g.fillRect(X(QX-1.6),Z(QZ-1.2),3.2*S,2.4*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:12,z:30,yaw:Math.PI},size:{}},meta)}
