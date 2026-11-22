/* 포천·동두천 마당(2026-11-22, W55): 산정호수, 한탄강 비둘기낭 폭포, 동두천 소요산 자재암.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음.
   비둘기낭 폭포: 한탄강 지질공원(유네스코 세계지질공원)의 현무암 협곡 속 폭포와 동굴(국가 명승). 산정호수: 산으로 둘러싸인 호수. 소요산 자재암: 원효가 수행했다는 절.
   놀이: 물수제비(돌을 낮고 빠르게 던져 물 위로 여러 번 튀기기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildPocheon(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1977);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x7a9a48,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 산정호수: 북쪽 큰 호수 + 둘레 산 + 나무 데크 */const LX=0,LZ=-50,LR=36;const lakeM=M(0x3a7a8a,{roughness:.15,metalness:.15});{const lk=new THREE.Mesh(new THREE.CircleGeometry(LR,48),lakeM);lk.rotation.x=-Math.PI/2;lk.scale.x=1.3;lk.position.set(LX,.04,LZ);G.add(lk);solids.push({cx:LX,cz:LZ,r:LR*.95,y0:0,y1:2});
  for(let k=0;k<11;k++){const a=Math.PI*(1.05+k*.09);const h=new THREE.Mesh(new THREE.SphereGeometry(18+r()*8,16,8,0,Math.PI*2,0,Math.PI/2),M(0x4a6a32,{roughness:1}));h.scale.y=.55+r()*.3;h.position.set(LX+Math.cos(a)*(LR*1.3+14),0,LZ+Math.sin(a)*(LR+14));G.add(h)}
  const deck=new THREE.Mesh(new THREE.BoxGeometry(4,.3,10),M(0x8a6a44));deck.position.set(LX,.3,LZ+LR-2);G.add(deck);for(const sx of[-1.9,1.9]){const rl=new THREE.Mesh(new THREE.BoxGeometry(.08,.08,10),M(0x6a4a30));rl.position.set(LX+sx,1.2,LZ+LR-2);G.add(rl)}}
 const ripples=[];const RM=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.7,side:THREE.DoubleSide});
 /* 비둘기낭 폭포: 동쪽 현무암 협곡 아래 폭포·소·동굴 */const BX=50,BZ=10;{const BS=M(0x4a4440,{flatShading:true,roughness:.95});for(let k=0;k<38;k++){const a=Math.PI*(.15+k/37*1.2);const rr=9+r()*.8;const h=6+r()*1.2;const c=new THREE.Mesh(new THREE.CylinderGeometry(.6,.65,h,6),BS);c.position.set(BX+Math.cos(a)*rr,h/2-2,BZ-Math.sin(a)*rr);G.add(c)}const pool=new THREE.Mesh(new THREE.CircleGeometry(7.5,32),M(0x2a7a7a,{roughness:.1,metalness:.2}));pool.rotation.x=-Math.PI/2;pool.position.set(BX,.05,BZ);G.add(pool);solids.push({cx:BX,cz:BZ,r:9.6,y0:0,y1:5});
  const cave=new THREE.Mesh(new THREE.SphereGeometry(4,16,8,0,Math.PI,0,Math.PI/2),M(0x1a1816,{side:THREE.DoubleSide}));cave.rotation.y=Math.PI;cave.scale.set(1.4,.7,1);cave.position.set(BX,.1,BZ-8);G.add(cave);
  const fall=new THREE.Mesh(new THREE.PlaneGeometry(1.6,4.2),new THREE.MeshStandardMaterial({color:0xe8f4f8,transparent:true,opacity:.8,emissive:0x203040}));fall.position.set(BX,2.4,BZ-6.8);G.add(fall);fall.userData.f=true;
  const mist=new THREE.Mesh(new THREE.CircleGeometry(1.4,16),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.5}));mist.rotation.x=-Math.PI/2;mist.position.set(BX,.08,BZ-6);G.add(mist)}
 /* 동두천 소요산 자재암: 서쪽 언덕 앞 작은 절 */const JX=-48,JZ=6;{const hill=new THREE.Mesh(new THREE.SphereGeometry(20,20,10,0,Math.PI*2,0,Math.PI/2),M(0x3a5a2a,{roughness:1}));hill.scale.y=.7;hill.position.set(JX-14,0,JZ-6);G.add(hill);solids.push({cx:JX-14,cz:JZ-6,r:19.5,y0:0,y1:14});if(!mini){const h=buildHall({x:JX,z:JZ,ry:Math.PI/2,W:8,D:5,nx:3,nz:2,FY:1,PH:3,roof:'hip',name:'自在庵',pillar:0x9a3a26,bracket:'ik',front:'door',roofScale:.95,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
  for(let k=0;k<20;k++){const t=new THREE.Mesh(new THREE.ConeGeometry(1.3,4.5,7),M(k%4?0x2a4a24:0xc85a24));t.position.set(JX-6-r()*14,2.2,JZ-14+r()*30);G.add(t)}}
 const NL=[];if(!mini){for(const[x,y,z]of[[LX,3,LZ+LR+2],[BX,3,BZ+11],[JX+5,3,JZ]]){const L=new THREE.PointLight(0xffc080,0,26,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0,tt=0;const nightTick=dt=>{tt+=dt;const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8);for(let i=ripples.length-1;i>=0;i--){const p=ripples[i];p.t+=dt;p.m.scale.setScalar(.3+p.t*2.2);p.m.material.opacity=Math.max(0,.7-p.t*.5);if(p.t>1.4){G.remove(p.m);p.m.material.dispose();ripples.splice(i,1)}}};
 const ripple=(x,z)=>{const m=new THREE.Mesh(new THREE.RingGeometry(.35,.5,24),RM.clone());m.rotation.x=-Math.PI/2;m.position.set(x,.08,z);G.add(m);ripples.push({m,t:0})};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(LX,LZ+LR+6,3.4,'포천 산정호수','산에 둘러싸여 「산속의 우물」이라는 이름이 붙은 호수예요. 겨울엔 얼음 썰매를 타요. 간추려 지었어요.');
 sp(LX+4,LZ+LR+8,2.4,'물수제비 뜨는 자리','납작한 돌을 낮고 빠르게 던져 물 위로 여러 번 튀겨 봐요.');
 sp(BX,BZ+12,3.4,'비둘기낭 폭포','한탄강의 현무암 협곡 속에 숨은 폭포예요(국가 명승). 용암이 식으며 생긴 육각 기둥 절벽과 동굴이 있어요. 옛날 비둘기가 둥지를 틀어 비둘기낭이라 불러요. 한탄강은 유네스코 세계지질공원이에요.');
 sp(JX+6,JZ,3,'소요산 자재암','원효대사가 수행했다는 절이에요. 가을 단풍이 이름났어요. 간추려 지었어요.');
 sp(30,45,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 물수제비(11/22): 다섯 번 던져요. 「던지기」를 한 번 누르면 각도 막대가 움직이고, 다시 누르면 각도가 정해지고 힘 막대가 움직여요, 또 누르면 던져요. 각도가 낮을수록(10~20도) 잘 튀고, 힘이 셀수록 오래 가요. 물에 닿을 때 들어가는 각도가 25도보다 크거나 너무 느리면 퐁당 */
 window.__PCSKIP=()=>{if(document.getElementById('pcP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(LX+4,LZ+LR+8,0)}catch(e){}
  const O={x:LX,y:1.6,z:LZ+LR-6};window.__GCAM=()=>document.getElementById('pcP')?[O.x+5,4.5,O.z+7,O.x-2,0,O.z-20,55]:null;
  const RD=5;let rd=0,total=0,best=0,done=false,stage=0,ang=0,pow=0,ph=0,last=performance.now(),auto=false,flying=null,msg='';const res=[];
  const stone=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.025,12),M(0x6a6a66));stone.visible=false;G.add(stone);
  const d=document.createElement('div');d.id='pcP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#16262a;border:3px solid #8ad0d8;border-radius:16px;padding:10px 14px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#eef8f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:300px;max-width:94vw;user-select:none;touch-action:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#bfeef4">🪨 물수제비</b><div data-i style="margin:4px 0;font:14px 'Do Hyeon',sans-serif"></div><div style="text-align:left;font-size:11px">각도</div><div style="position:relative;height:12px;background:#2a3a44;border-radius:6px"><div style="position:absolute;left:11%;width:11%;top:0;bottom:0;background:#4a9a5a;border-radius:4px"></div><div data-a style="position:absolute;top:-3px;width:6px;height:18px;background:#f8e080;left:0"></div></div><div style="text-align:left;font-size:11px;margin-top:4px">힘</div><div style="height:12px;background:#2a3a44;border-radius:6px;overflow:hidden"><div data-p style="height:100%;width:0;background:#f8a060"></div></div><button data-t style="width:100%;margin-top:8px;font:20px 'Do Hyeon',sans-serif;background:#4a9ab0;color:#fff;border:0;border-radius:14px;padding:10px 0;cursor:pointer;touch-action:none">던지기</button><div data-m style="font-size:12px;color:#f8e8a0;margin-top:5px">눌러서 각도 → 힘 → 던지기</div>`;
  const iEl=d.querySelector('[data-i]'),aEl=d.querySelector('[data-a]'),pEl=d.querySelector('[data-p]'),mEl=d.querySelector('[data-m]'),tb=d.querySelector('[data-t]');
  const snd=(f,len,type='sine')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const angOf=()=>5+ph*85,powOf=()=>.3+.7*ph;
  const press=()=>{if(done||flying)return;if(stage===0){stage=1;ph=0;tb.textContent='각도 정하기'}else if(stage===1){ang=angOf();stage=2;ph=0;tb.textContent='힘 정해서 던지기'}else if(stage===2){pow=powOf();stage=0;tb.textContent='던지기';throwIt()}};
  tb.onpointerdown=e=>{e.preventDefault();press()};
  const throwIt=()=>{const a=ang*Math.PI/180,sp=7+pow*13;flying={x:O.x,y:O.y,z:O.z,vx:-Math.sin(.15)*sp*Math.cos(a)*.2,vz:-sp*Math.cos(a),vy:sp*Math.sin(a)*.6+.5,skips:0};stone.visible=true;snd(500,.1,'triangle');msg=`각도 ${Math.round(ang)}도로 던졌어요`};
  let dir=1;
  const step=now=>{if(!d.isConnected){G.remove(stone);return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(stage>0){ph+=dir*dt*(stage===1?.9:1.2);if(ph>1){ph=1;dir=-1}if(ph<0){ph=0;dir=1}if(auto){if(stage===1&&Math.abs(angOf()-14)<2.5)press();else if(stage===2&&ph>.93)press()}}else if(auto&&!flying&&rd<RD)press();
   aEl.style.left=(stage===1?angOf():ang||5)/90*100+'%';pEl.style.width=(stage===2?powOf():pow)*100+'%';
   if(flying){const f=flying;f.vy-=9.8*dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.z+=f.vz*dt;stone.position.set(f.x,Math.max(.06,f.y),f.z);stone.rotation.y+=dt*30;
    const onLake=Math.hypot((f.x-LX)/1.3,f.z-LZ)<LR;if(f.y<=.06&&f.vy<0){const hs=Math.hypot(f.vx,f.vz),inc=Math.atan2(-f.vy,hs)*180/Math.PI;if(onLake&&inc<25&&hs>3.2){f.skips++;ripple(f.x,f.z);snd(900-f.skips*40,.06,'triangle');f.vy=-f.vy*.62;f.vx*=.8;f.vz*=.8;f.y=.07}else{if(onLake){ripple(f.x,f.z);ripple(f.x,f.z)}snd(180,.25);const n=f.skips;res.push(n);total+=n;best=Math.max(best,n);msg=n>0?`${n}번 튀었어요!`:inc>=25?'퐁당! 너무 높게 던졌어요':'퐁당! 힘이 모자랐어요';flying=null;stone.visible=false;rd++;if(rd>=RD){fin();return}}}}
   iEl.textContent=`${Math.min(rd+1,RD)} / ${RD}번째 · 모두 ${total}번 튐 · 최고 ${best}번`;mEl.textContent=msg||mEl.textContent;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;G.remove(stone);const Q=Math.min(100,Math.round(total/25*100));const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('pocheon_skip',Q,'물수제비')}catch(e){}window.__PCQ=Q;snd(780,.3);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#bfeef4">모두 ${total}번 튀었어요(최고 ${best}번)! ${Q}점</b><div style="font-size:13px;margin:4px 0">납작한 돌을 물과 거의 나란히(20도쯤) 빠르게 던지면, 물이 돌 밑을 받쳐 튀어 올라요. 각도가 크면 물을 파고들어 퐁당 가라앉아요.</div><div style="font-size:24px;color:#8ad0d8">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#8ad0d8;color:#16262a;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef8f8;border:2px solid #eef8f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__PCSKIP()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__PCG={set auto(v){auto=v},get done(){return done},get total(){return total},get res(){return res.slice()}};try{ctx.say('낮고 빠르게 던져요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'현무암 조각',h:'구멍이 숭숭 난 한탄강 현무암 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.DodecahedronGeometry(.1,0),M(0x3a3634)))})},
  {n:'주먹도끼',h:'한탄강 둘레에서 나오는 구석기 주먹도끼예요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.ConeGeometry(.08,.2,5),M(0x8a7a66));m.scale.z=.5;g.add(m)})},
  {n:'막새 기와',h:'자재암 지붕 끝 기와예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18),M(0x5a5a5a)))})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__PCDIG=()=>{window.__DETECT&&window.__DETECT({key:'pocheon_dig',title:'포천·동두천 발굴 탐지',emoji:'⛏️',bg:'#16262a',count:4,TL:150,cand:[[30,45],[-30,40],[10,50],[60,40],[-60,40],[20,25],[-20,25],[70,-30]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'포천·동두천은 현무암 협곡과 호수의 고장이에요.'})};
 const meta={quest:{t:'포천·동두천 둘러보기',d:'산정호수와 비둘기낭 폭포, 자재암을 둘러보세요.',steps:[['산정호수','포천 산정호수'],['비둘기낭','비둘기낭 폭포'],['자재암','소요산 자재암']]},
  title:'포천·동두천 산정호수·비둘기낭 폭포',hint:'산정호수·비둘기낭 폭포·자재암을 공개 사진으로 간추려 지었어요. 낮고 빠르게 돌을 던져 물수제비를 떠 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-4,z:16,lines:['포천·동두천','산정호수','비둘기낭 폭포 · 자재암','간추려 지음']}},
  npc:[['science',[[-8,12],[4,12],[4,22],[-8,22]]]],bounds:[-90,90,-90,90],level:()=>'포천',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#7a9a48';g.fillRect(0,0,300,300);g.fillStyle='#3a7a8a';g.beginPath();g.ellipse(X(LX),Z(LZ),LR*1.3*S,LR*S,0,0,7);g.fill();g.fillStyle='#4a4440';g.beginPath();g.arc(X(BX),Z(BZ),10*S,0,7);g.fill();g.fillStyle='#2a7a7a';g.beginPath();g.arc(X(BX),Z(BZ),7*S,0,7);g.fill();g.fillStyle='#9a3a26';g.fillRect(X(JX-2.5),Z(JZ-4),5*S,8*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:20,yaw:Math.PI},size:{}},meta)}
