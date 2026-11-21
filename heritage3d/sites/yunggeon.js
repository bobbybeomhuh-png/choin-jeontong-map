/* 화성 융건릉 마당(2026-11-22, W30): 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   융건릉(세계유산 「조선왕릉」 2009): 융릉은 사도세자(장조)와 혜경궁 홍씨, 건릉은 정조와 효의왕후의 능. 정조가 1789년 아버지 무덤을 양주에서 이곳 화산으로 옮기며 수원 화성을 새로 쌓음.
   융릉 봉분은 모란·연꽃을 새긴 병풍석을 두르고, 정자각과 봉분이 일직선이 아니고 비껴 있음. 둘레는 울창한 소나무 숲.
   이야기: 정조가 융릉에 참배하러 왔다가 송충이가 솔잎을 갉아 먹는 것을 보고 「아버지 무덤의 솔잎까지 먹느냐」며 송충이를 깨물었다고 전함.
   놀이: 송충이 잡기(솔가지에 나타났다 숨는 송충이 누르기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildYunggeon(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1789);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 const ss=t=>t<=0?0:t>=1?1:t*t*(3-2*t);const TOMBS=[[-24,-46],[34,-40]];const H=(x,z)=>Math.max(...TOMBS.map(([a,b])=>5*ss(1-(Math.hypot(x-a,(z-b)*.8)-8)/16)));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(220,200,110,100);g.rotateX(-Math.PI/2);const p=g.attributes.position;for(let k=0;k<p.count;k++)p.setY(k,H(p.getX(k),p.getZ(k)));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,color:0x7a9a4a,roughness:1}));m.receiveShadow=true;G.add(m)}
 const stM=M(0xb8b0a0,{flatShading:true});
 const tomb=(LX,LZ,name,peony)=>{const LY=H(LX,LZ);const bong=new THREE.Mesh(new THREE.SphereGeometry(4.6,24,12,0,Math.PI*2,0,Math.PI/2),M(0x6a9a3a,{roughness:1}));bong.scale.y=.55;bong.position.set(LX,LY,LZ);G.add(bong);solids.push({cx:LX,cz:LZ,r:5.2,y0:-2,y1:LY+3});
  if(peony){const ring=new THREE.Mesh(new THREE.CylinderGeometry(4.8,4.8,.9,32,1,true),M(0xc8c0b0,{side:THREE.DoubleSide}));ring.position.set(LX,LY+.45,LZ);G.add(ring);for(let k=0;k<16;k++){const a=k/16*Math.PI*2;const f=new THREE.Mesh(new THREE.CircleGeometry(.22,8),M(0x9a8a80));f.position.set(LX+Math.cos(a)*4.82,LY+.45,LZ+Math.sin(a)*4.82);f.lookAt(LX+Math.cos(a)*9,LY+.45,LZ+Math.sin(a)*9);G.add(f)}}
  for(let k=0;k<24;k++){const a=k/24*Math.PI*2;const p=new THREE.Mesh(new THREE.BoxGeometry(.22,.8,.22),stM);p.position.set(LX+Math.cos(a)*6,LY+.4,LZ+Math.sin(a)*6);G.add(p)}
  const wall=M(0xc8bca8);for(let k=0;k<14;k++){const a=Math.PI+k/13*Math.PI;const w=new THREE.Mesh(new THREE.BoxGeometry(2,1.5,.5),wall);w.position.set(LX+Math.cos(a)*8.6,LY+.75,LZ+Math.sin(a)*8.6*.9);w.rotation.y=-a+Math.PI/2;G.add(w)}
  const hon=new THREE.Mesh(new THREE.BoxGeometry(2.2,.5,1.3),stM);hon.position.set(LX,LY+.5,LZ+6.2);G.add(hon);
  for(const s of[-1,1]){const mz=new THREE.Mesh(new THREE.CylinderGeometry(.2,.26,2.6,8),stM);mz.position.set(LX+s*3.4,LY+1.3,LZ+6.4);G.add(mz);for(const[dz,h,arm]of[[9,2.4,0],[11.6,2.6,1]]){const g=new THREE.Group();g.position.set(LX+s*2.4,H(LX+s*2.4,LZ+dz),LZ+dz);const b=new THREE.Mesh(new THREE.BoxGeometry(.85,h*.7,.65),stM);b.position.y=h*.35;g.add(b);const hd=new THREE.Mesh(new THREE.BoxGeometry(.65,h*.3,.6),stM);hd.position.y=h*.85;g.add(hd);if(arm){const sw=new THREE.Mesh(new THREE.BoxGeometry(.12,h*.5,.12),stM);sw.position.set(0,h*.4,.38);g.add(sw)}G.add(g)}}
  if(!mini){const zy=H(LX+(peony?4:0),LZ+22);const h=buildHall({x:LX+(peony?4:0),z:LZ+22,ry:Math.PI,W:5.4,D:4.4,nx:3,nz:2,FY:1.1,PH:2.8,roof:'gable',name:name,pillar:0x9a3a26,bracket:'ik',front:'door',roofScale:.9,solids,light:false});h.group.position.y=zy;G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}};
 tomb(TOMBS[0][0],TOMBS[0][1],'隆陵',true);tomb(TOMBS[1][0],TOMBS[1][1],'健陵',false);
 /* 소나무 숲 + 송충이 가지(놀이용) */const PINES=[];{const tm=M(0x6a4030),lm=M(0x2f5a2a);for(let i=0;i<70;i++){const x=-90+r()*180,z=-90+r()*180;if(TOMBS.some(([a,b])=>Math.hypot(x-a,z-b)<14))continue;if(Math.abs(x)<12&&z>-10&&z<40)continue;const y=H(x,z);const t=new THREE.Mesh(new THREE.CylinderGeometry(.22,.34,7,7),tm);t.position.set(x,y+3.5,z);t.rotation.z=(r()-.5)*.25;G.add(t);for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(2.2-k*.45,1.4,8),lm);c.position.set(x+(r()-.5),y+6+k*1,z+(r()-.5));c.scale.y=.6;G.add(c)}solids.push({cx:x,cz:z,r:.4,y0:0,y1:y+7});PINES.push([x,z])}}
 /* 홍살문·참도(융릉 앞) */{const LX=TOMBS[0][0]+4,Z0=TOMBS[0][1]+34;const rd=M(0xb8301a);for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.18,.2,6.6,10),rd);p.position.set(LX+s*3,3.3,Z0);G.add(p)}const b=new THREE.Mesh(new THREE.BoxGeometry(6.6,.3,.3),rd);b.position.set(LX,5.6,Z0);G.add(b);for(let k=0;k<11;k++){const a=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,1.5,5),rd);a.position.set(LX-2.6+k*.52,6.4,Z0);G.add(a)}const pa=new THREE.Mesh(new THREE.BoxGeometry(1.6,.2,10),stM);pa.position.set(LX,.1,Z0-6);G.add(pa)}
 /* 송충이 놀이 자리: 융릉 앞 소나무 여섯 그루(가지 낮게) */const GX=4,GZ=14;const gameP=[];{const tm=M(0x6a4030),lm=M(0x2f5a2a);for(let k=0;k<6;k++){const x=GX-4.2+(k%3)*4.2,z=GZ-((k/3)|0)*5;const t=new THREE.Mesh(new THREE.CylinderGeometry(.24,.34,4.6,7),tm);t.position.set(x,2.3,z);G.add(t);const c=new THREE.Mesh(new THREE.ConeGeometry(2.4,2.2,8),lm);c.position.set(x,4.6,z);G.add(c);solids.push({cx:x,cz:z,r:.4,y0:0,y1:6});gameP.push([x,z])}}
 const NL=[];if(!mini){for(const[a,b]of TOMBS){const L=new THREE.PointLight(0xffc080,0,22,1.5);L.position.set(a,H(a,b)+3,b+10);G.add(L);NL.push(L)}const L=new THREE.PointLight(0xffc080,0,22,1.5);L.position.set(GX,4,GZ+4);G.add(L);NL.push(L)}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(TOMBS[0][0]+5,TOMBS[0][1]+14,3,'융릉','사도세자(장조)와 혜경궁 홍씨의 능이에요. 정조가 1789년 이곳으로 옮겨 모시고, 모란·연꽃을 새긴 병풍석을 두르게 했어요. 조선 왕릉 40기는 2009년 세계유산이 됐어요. 간추려 지었어요.');
 sp(TOMBS[1][0]+5,TOMBS[1][1]+14,3,'건릉','정조와 효의왕후의 능이에요. 정조는 「아버지 곁에 묻어 달라」고 해 융릉 가까이에 잠들었어요.');
 sp(GX,GZ+6,2.4,'송충이 잡는 솔숲','정조가 융릉 소나무의 송충이를 보고 「아버지 무덤의 솔잎까지 먹느냐」며 깨물었다는 이야기가 전해요. 솔가지의 송충이를 잡아 봐요.');
 sp(30,30,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 송충이 잡기(11/22): 여섯 그루 솔가지에 송충이가 잠깐씩 나타나요. 숨기 전에 누르기. 30마리, 50초. 가끔 나타나는 무당벌레(이로운 곤충)는 누르지 않기 */
 window.__YGBUG=()=>{if(document.getElementById('ygP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(GX,GZ+7,0)}catch(e){}
  const CAM=[GX,8,GZ+14,GX,3.8,GZ-2.5,55];window.__GCAM=()=>document.getElementById('ygP')?CAM:null;
  const g=new THREE.Group();G.add(g);const N=30,TL=50;let n=0,miss=0,bad=0,done=false,t0=performance.now()/1000,last=t0,spawnT=0;const bugs=[];
  const mkBug=lady=>{const b=new THREE.Group();if(lady){const s=new THREE.Mesh(new THREE.SphereGeometry(.22,12,8,0,Math.PI*2,0,Math.PI/2),M(0xd8241a,{roughness:.4}));b.add(s);for(const dx of[-.08,.08]){const dt=new THREE.Mesh(new THREE.SphereGeometry(.05,6,4),M(0x111111));dt.position.set(dx,.12,.05);b.add(dt)}}else{for(let k=0;k<6;k++){const seg=new THREE.Mesh(new THREE.SphereGeometry(.12,8,6),M(k%2?0x5a4a2a:0x7a6a3a));seg.position.set(-.3+k*.12,0,0);b.add(seg);const hair=new THREE.Mesh(new THREE.ConeGeometry(.02,.14,4),M(0xd8c890));hair.position.set(-.3+k*.12,.12,0);b.add(hair)}}b.scale.setScalar(1.6);return b};
  const d=document.createElement('div');d.id='ygP';d.style.cssText="position:fixed;right:12px;bottom:140px;z-index:60;background:#1e2a1a;border:3px solid #8ab060;border-radius:16px;padding:10px 14px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef4e0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:220px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#c8e8a0">🐛 송충이 잡기</b><div id="ygS" style="font:19px 'Do Hyeon',sans-serif;margin:4px 0">0 / ${N}마리</div><div id="ygG" style="font-size:12px;color:#c8e8a0">솔가지의 송충이를 눌러요. 무당벌레는 놔둬요!</div><div id="ygT" style="font-size:13px">${TL}초</div>`;
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const pc=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.1,500);
  const hit=bg=>{if(done||!bg||bg.dead)return;bg.dead=true;g.remove(bg.m);if(bg.lady){bad++;snd(180,.3,'sawtooth');d.querySelector('#ygG').textContent='무당벌레는 진딧물을 먹는 이로운 벌레예요!'}else{n++;snd(760+n*8,.08,'square');d.querySelector('#ygS').textContent=n+' / '+N+'마리';d.querySelector('#ygG').textContent='잡았어요!';if(n>=N)fin()}};
  const pick=(cx,cy)=>{pc.aspect=innerWidth/innerHeight;pc.updateProjectionMatrix();pc.position.set(CAM[0],CAM[1],CAM[2]);pc.lookAt(CAM[3],CAM[4],CAM[5]);pc.updateMatrixWorld();let best=null,bd=1e9;for(const bg of bugs){if(bg.dead)continue;const q=bg.m.position.clone().project(pc);const dd=Math.hypot((q.x+1)/2*innerWidth-cx,(1-q.y)/2*innerHeight-cy);if(dd<bd){bd=dd;best=bg}}if(best&&bd<Math.max(44,innerWidth*.07))hit(best)};
  const onDown=e=>{if(e.target.closest&&e.target.closest('#ygP'))return;pick(e.clientX,e.clientY)};addEventListener('pointerdown',onDown);
  const cleanup=()=>{removeEventListener('pointerdown',onDown);G.remove(g)};
  const fin=()=>{if(done)return;done=true;cleanup();const el=performance.now()/1000-t0;const Q=n>=N?Math.max(60,Math.round(100-bad*5-Math.max(0,el-35)*.8)):Math.round(n/N*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('yunggeon_bug',Q,'융릉 송충이 잡기')}catch(e){}window.__YGQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#c8e8a0">송충이 ${n}마리를 잡았어요</b><div style="font-size:13px;margin:4px 0">정조는 화성 둘레에 소나무와 나무를 많이 심게 하고 송충이를 잡게 했어요. 아버지를 그리는 효심이 화성과 융건릉 숲에 남아 있어요.</div><div style="font-size:24px;color:#8ab060">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#8ab060;color:#1e2a1a;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef4e0;border:2px solid #eef4e0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__YGBUG()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}const now=performance.now()/1000,dt=Math.min(.1,now-last);last=now;
   if(!done){spawnT-=dt;if(spawnT<=0){const [x,z]=gameP[(Math.random()*gameP.length)|0];const lady=Math.random()<.15;const m=mkBug(lady);const a=Math.PI*(.15+Math.random()*.7),yy=3.7+Math.random()*1.3,rr=2.4*(5.7-yy)/2.2+.18;m.position.set(x+Math.cos(a)*rr,yy,z+Math.sin(a)*rr);m.rotation.y=Math.random()*6;g.add(m);bugs.push({m,lady,t:0,life:Math.max(.9,1.8-(now-t0)/60),dead:false});spawnT=.35+Math.random()*.35}
    for(const bg of bugs){if(bg.dead)continue;bg.t+=dt;const k=Math.min(1,bg.t/.15,(bg.life-bg.t)/.15);bg.m.scale.setScalar(1.6*Math.max(.01,k));if(bg.t>=bg.life){bg.dead=true;g.remove(bg.m);if(!bg.lady)miss++}}
    const left=Math.max(0,TL-(now-t0));d.querySelector('#ygT').textContent=Math.ceil(left)+'초';if(left<=0)fin()}
   requestAnimationFrame(loop)};loop();
  window.__YGG={hit,bugs,get n(){return n}};try{ctx.say('솔가지의 송충이를 잡아요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'제기 조각',h:'능 제사에 쓰던 놋 제기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.1,.08,14),M(0xb08840,{metalness:.7})))})},
  {n:'막새 기와',h:'정자각 지붕 끝 기와예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18),M(0x5a5a5a)))})},
  {n:'솔방울',h:'융건릉 솔숲의 솔방울이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.ConeGeometry(.05,.1,8),M(0x6a4a2a)))})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__YGDIG=()=>{window.__DETECT&&window.__DETECT({key:'yunggeon_dig',title:'융건릉 발굴 탐지',emoji:'⛏️',bg:'#1e2a1a',count:4,TL:150,cand:[[30,30],[40,10],[-40,20],[20,40],[-30,40],[50,30],[-50,0],[10,50]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'융건릉은 아버지를 그리워한 정조의 효심이 깃든 곳이에요.'})};
 const meta={quest:{t:'융건릉 둘러보기',d:'융릉과 건릉, 솔숲을 둘러보세요.',steps:[['융릉','융릉'],['건릉','건릉'],['솔숲','송충이 잡는 솔숲']]},
  title:'화성 융건릉',hint:'세계유산 조선왕릉 융건릉을 간추려 지었어요. 솔가지의 송충이를 잡아 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:12,z:30,lines:['화성 융건릉','세계유산 조선왕릉','사도세자와 정조','간추려 지음']}},
  npc:[['science',[[8,28],[18,28],[18,36],[8,36]]]],bounds:[-90,90,-90,90],level:()=>'화성',camCap:()=>Infinity,baseAt:(x,z)=>H(x,z),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:-10,draw(g,X,Z,S){g.fillStyle='#7a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#2f5a2a';for(const[x,z]of PINES)g.fillRect(X(x)-2,Z(z)-2,4,4);g.fillStyle='#6a9a3a';for(const[a,b]of TOMBS){g.beginPath();g.arc(X(a),Z(b),4.6*S,0,7);g.fill()}}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:12,z:34,yaw:Math.PI},size:{}},meta)}
