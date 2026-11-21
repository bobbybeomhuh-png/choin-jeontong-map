/* 장성 필암서원 마당(2026-11-22, W27): 필암서원은 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   공개 3D: 마을 어귀 장승 「Korean Totem Pole- Jangseung」(스케치팹 ththqkf, CC BY, 높이 약 2.8m로 맞춤).
   필암서원(사적, 세계유산 「한국의 서원」 2019): 하서 김인후(1510~1560)를 기린 서원. 문루 확연루, 강당 청절당(사당 쪽을 바라보도록 뒤로 앉음), 경장각(인종이 하서에게 그려 준 묵죽도 판), 사당 우동사.
   장성은 실존 인물 홍길동(연산군 때 의적)의 고장이라 전해, 홍길동 테마파크가 있음. 놀이: 홍길동 분신술(섞이는 분신 가운데 진짜 찾기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {placeHanok} from './hanokkit.js';
export function buildJangseong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(8231);
 const TOUCH=opts.touch!=null?!!opts.touch:matchMedia('(pointer:coarse)').matches;
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(220,200,10,10);g.rotateX(-Math.PI/2);const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,color:0x8a9a4a,roughness:1}));m.receiveShadow=true;G.add(m)}
 /* 필암서원: 남쪽 확연루 → 청절당 → 경장각 → 우동사(북) */const SX=-20,SZ=0;
 if(!mini){const B=spec=>{const h=buildHall(Object.assign({solids,light:false},spec));G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)});return h};
  B({x:SX,z:SZ+20,ry:Math.PI,W:7,D:4,nx:3,nz:1,FY:1.8,PH:2.4,roof:'gable',name:'廓然樓',pillar:0x8a6a48,bracket:'ik',front:'open',back:'open',left:'open',right:'open',stairs:'none',rail:true,roofScale:.85});
  B({x:SX,z:SZ+6,ry:0,W:11,D:6,nx:4,nz:2,FY:.8,PH:3,roof:'gable',name:'淸節堂',pillar:0x8a6a48,bracket:'ik',front:'open',roofScale:.9});
  B({x:SX,z:SZ-8,ry:Math.PI,W:5,D:3.6,nx:3,nz:1,FY:.9,PH:2.6,roof:'gable',name:'敬藏閣',pillar:0x9a3a26,bracket:'ik',roofScale:.85});
  B({x:SX,z:SZ-20,ry:Math.PI,W:7,D:5,nx:3,nz:1,FY:1,PH:2.8,roof:'gable',name:'祐東祠',pillar:0x9a3a26,bracket:'ik',roofScale:.85});
  for(const s of[-1,1])B({x:SX+s*11,z:SZ-4,ry:s*Math.PI/2,W:7,D:3.6,nx:3,nz:1,FY:.5,PH:2.4,roof:'gable',name:s<0?'進德齋':'崇義齋',pillar:0x8a6a48,bracket:'ik',roofScale:.8});
  const wm=M(0xc8bca8),cap=M(0x50545c);const wall=(x0,z0,x1,z1)=>{const L=Math.hypot(x1-x0,z1-z0);const w=new THREE.Mesh(new THREE.BoxGeometry(L,1.8,.5),wm);w.position.set((x0+x1)/2,.9,(z0+z1)/2);w.rotation.y=-Math.atan2(z1-z0,x1-x0);G.add(w);const c=new THREE.Mesh(new THREE.BoxGeometry(L+.3,.25,.9),cap);c.position.copy(w.position);c.position.y=1.9;c.rotation.y=w.rotation.y;G.add(c);solids.push({x0:Math.min(x0,x1)-.3,x1:Math.max(x0,x1)+.3,y0:0,y1:2,z0:Math.min(z0,z1)-.3,z1:Math.max(z0,z1)+.3})};
  wall(SX-16,SZ-26,SX+16,SZ-26);wall(SX-16,SZ-26,SX-16,SZ+21);wall(SX+16,SZ-26,SX+16,SZ+21);wall(SX-16,SZ+21,SX-4,SZ+21);wall(SX+4,SZ+21,SX+16,SZ+21)}
 /* 마을 어귀 장승(공개 3D) 한 쌍 */const JX=14,JZ=34;if(!mini){const L=new GLTFLoader();{const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');L.setDRACOLoader(dr)}L.load(new URL('../models/jangseong/jangseung.glb',import.meta.url).href,m=>{for(const s of[-1,1]){const o=s<0?m.scene:m.scene.clone();o.traverse(e=>{if(e.isMesh){e.castShadow=true;if(e.material){e.material.transparent=false;e.material.alphaTest=0}}});const b=new THREE.Box3().setFromObject(o);const c=b.getCenter(new THREE.Vector3());const w=new THREE.Group();o.position.set(-c.x,-b.min.y,-c.z);w.add(o);w.position.set(JX+s*2.2,0,JZ);w.rotation.y=s<0?0:.15;w.userData.noBatch=true;G.add(w)}},undefined,()=>{});for(const s of[-1,1])solids.push({cx:JX+s*2.2,cz:JZ,r:.4,y0:0,y1:3})}
 /* 홍길동 마당(놀이 자리): 낮은 돌 무대 */const HX=24,HZ=4;{const st=new THREE.Mesh(new THREE.CylinderGeometry(7,7.4,.4,32),M(0xb8ac98));st.position.set(HX,.2,HZ);G.add(st)}
 if(!mini){for(const[k,x,z,ry]of[['choga1',40,-30,0],['choga2',50,10,Math.PI/2],['sarang',38,40,Math.PI],['nongga',-56,30,Math.PI/2]])placeHanok(G,solids,k,x,z,ry,{TOUCH,s:.7})}
 /* 대숲(필암서원 뒤) */{const bm=M(0x5a8a3a);const im=new THREE.InstancedMesh(new THREE.CylinderGeometry(.06,.08,7,5),bm,500);const lf=new THREE.InstancedMesh(new THREE.ConeGeometry(.7,2.4,5),M(0x3f7a2e),500);const o=new THREE.Object3D();for(let k=0;k<500;k++){const x=SX-22+r()*44,z=SZ-34-r()*16;o.position.set(x,3.5,z);o.rotation.set((r()-.5)*.1,0,(r()-.5)*.1);o.updateMatrix();im.setMatrixAt(k,o.matrix);o.position.y=6.4;o.updateMatrix();lf.setMatrixAt(k,o.matrix)}G.add(im,lf)}
 const NL=[];if(!mini){for(const[x,y,z]of[[SX,4,SZ+24],[SX,3,SZ+10],[HX,3,HZ],[JX,3,JZ+2]]){const L=new THREE.PointLight(0xffc080,0,20,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(SX,SZ+25,3,'필암서원','하서 김인후를 기린 서원이에요. 2019년 「한국의 서원」으로 세계유산이 됐어요. 강당 청절당이 사당 쪽을 바라보도록 뒤로 앉은 것이 특징이에요. 간추려 지었어요.');
 sp(SX+4,SZ-4,2.6,'경장각','인종이 세자 때 스승 하서에게 손수 그려 준 묵죽도(대나무 그림)를 새긴 판을 모신 곳이에요. 정조가 쓴 현판이 걸려 있어요.');
 sp(JX,JZ+3,2.4,'마을 장승','마을 어귀를 지키는 장승이에요. 「천하대장군」과 「지하여장군」이 짝을 이뤄요. 3D: ththqkf, Sketchfab, CC BY.');
 sp(HX,HZ+8,2.4,'홍길동 마당','장성은 연산군 때 실제로 있었던 의적 홍길동의 고장으로 전해요. 허균의 소설 「홍길동전」의 주인공이 됐어요. 분신술 속 진짜 홍길동을 찾아 봐요!');
 sp(-50,10,2.4,'발굴 탐지 자리','장성 땅속에 옛 사람들의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 홍길동 분신술(11/22): 진짜(빨간 띠)를 보여 준 뒤 다섯 분신이 자리를 바꿔요. 다 섞이면 진짜를 눌러요. 다섯 판 */
 const mkHong=()=>{const g=new THREE.Group();const body=new THREE.Mesh(new THREE.CylinderGeometry(.38,.55,1.5,12),M(0x3a4a6a));body.position.y=.75;g.add(body);const head=new THREE.Mesh(new THREE.SphereGeometry(.32,14,10),M(0xe8c8a0));head.position.y=1.8;g.add(head);const brim=new THREE.Mesh(new THREE.CylinderGeometry(.62,.62,.03,20),M(0x1a1a1a));brim.position.y=2.08;g.add(brim);const crown=new THREE.Mesh(new THREE.CylinderGeometry(.2,.24,.36,14),M(0x1a1a1a));crown.position.y=2.26;g.add(crown);const belt=new THREE.Mesh(new THREE.TorusGeometry(.48,.06,6,20),M(0xd8341a,{emissive:0x000000}));belt.rotation.x=Math.PI/2;belt.position.y=1.05;g.add(belt);g.userData.belt=belt;return g};
 window.__JSHONG=()=>{if(document.getElementById('jsP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(HX,HZ+8.5,0)}catch(e){}
  const CAM=[HX,8.5,HZ+12.5,HX,1,HZ,55];window.__GCAM=()=>document.getElementById('jsP')?CAM:null;
  const N=5,slots=[-3.2,-1.6,0,1.6,3.2];const g=new THREE.Group();G.add(g);const men=slots.map((x,i)=>{const m=mkHong();m.position.set(HX+x,.4,HZ);m.userData.slot=i;g.add(m);return m});
  let round=0,score=0,phase='show',t=0,real=0,swaps=[],cur=null,done=false,last=performance.now()/1000;
  const d=document.createElement('div');d.id='jsP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1e2230;border:3px solid #d8341a;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f0f0f4;box-shadow:0 6px 18px rgba(0,0,0,.35);width:230px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ff9a7a">🥷 홍길동 분신술</b><div id="jsS" style="font:19px 'Do Hyeon',sans-serif;margin:4px 0">1 / ${N}판 · 찾음 0</div><div id="jsG" style="font-size:13px;color:#ff9a7a">빨간 띠가 진짜 홍길동이에요. 잘 보세요!</div>`;const Sx=d.querySelector('#jsS'),Gd=d.querySelector('#jsG');
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const setBelts=show=>men.forEach((m,i)=>{m.userData.belt.material.color.set(show&&i===real?0xd8341a:0x3a4a6a)});
  const startRound=()=>{real=(Math.random()*N)|0;men.forEach((m,i)=>{m.userData.slot=i;m.position.set(HX+slots[i],.4,HZ)});setBelts(true);phase='show';t=0;const k=4+round*2;swaps=[];for(let i=0;i<k;i++){const a=(Math.random()*N)|0;let b=(Math.random()*N)|0;if(b===a)b=(a+1+((Math.random()*(N-1))|0))%N;swaps.push([a,b])}Sx.textContent=(round+1)+' / '+N+'판 · 찾음 '+score;Gd.textContent='빨간 띠가 진짜 홍길동이에요. 잘 보세요!'};
  const pc=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.1,500);
  const pick=(cx,cy)=>{if(phase!=='pick'||done)return;pc.aspect=innerWidth/innerHeight;pc.updateProjectionMatrix();pc.position.set(CAM[0],CAM[1],CAM[2]);pc.lookAt(CAM[3],CAM[4],CAM[5]);pc.updateMatrixWorld();let best=-1,bd=1e9;men.forEach((m,i)=>{const p=m.position.clone();p.y+=1.2;const q=p.project(pc);const dd=Math.hypot((q.x+1)/2*innerWidth-cx,(1-q.y)/2*innerHeight-cy);if(dd<bd){bd=dd;best=i}});if(best>=0&&bd<innerWidth*.12)choose(best)};
  const choose=i=>{if(phase!=='pick')return;setBelts(true);if(i===real){score++;snd(880,.2);Gd.textContent='찾았어요! 진짜 홍길동이에요'}else{snd(180,.3,'sawtooth');Gd.textContent='앗, 분신이었어요! 진짜는 빨간 띠'}phase='after';t=0;Sx.textContent=(round+1)+' / '+N+'판 · 찾음 '+score};
  const onDown=e=>{if(e.target.closest&&e.target.closest('#jsP'))return;pick(e.clientX,e.clientY)};addEventListener('pointerdown',onDown);
  const cleanup=()=>{removeEventListener('pointerdown',onDown);G.remove(g)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(score/N*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('jangseong_hong',Q,'홍길동 분신술')}catch(e){}window.__JSQ=Q;
   d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ff9a7a">${N}판 가운데 ${score}판 찾았어요</b><div style="font-size:13px;margin:4px 0">홍길동전에서 길동은 짚으로 만든 허수아비 일곱에 혼을 불어넣어 여덟 길동이 팔도를 누볐어요. 실제 홍길동은 1500년 무렵 붙잡힌 도적 우두머리로 실록에 나와요.</div><div style="font-size:26px;color:#d8341a">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#d8341a;color:#fff;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f0f0f4;border:2px solid #f0f0f4;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__JSHONG()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  startRound();
  const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}const now=performance.now()/1000,dt=Math.min(.1,now-last);last=now;t+=dt;
   if(!done){if(phase==='show'&&t>1.6){setBelts(false);phase='mix';t=0;Gd.textContent='섞여요… 눈을 떼지 마세요!'}
    else if(phase==='mix'){const dur=Math.max(.28,.6-round*.07);if(!cur&&swaps.length){const[a,b]=swaps.shift();cur={a:men.find(m=>m.userData.slot===a),b:men.find(m=>m.userData.slot===b),xa:HX+slots[a],xb:HX+slots[b],t:0,dur};cur.a.userData.slot=b;cur.b.userData.slot=a;snd(400+Math.random()*200,.05,'square')}
     if(cur){cur.t+=dt;const u=Math.min(1,cur.t/cur.dur),e=u*u*(3-2*u);cur.a.position.x=cur.xa+(cur.xb-cur.xa)*e;cur.a.position.z=HZ+Math.sin(e*Math.PI)*1.2;cur.b.position.x=cur.xb+(cur.xa-cur.xb)*e;cur.b.position.z=HZ-Math.sin(e*Math.PI)*1.2;if(u>=1){cur.a.position.z=cur.b.position.z=HZ;cur=null}}
     else if(!swaps.length){phase='pick';t=0;Gd.textContent='진짜 홍길동을 눌러요!'}}
    else if(phase==='after'&&t>1.4){round++;if(round>=N)fin();else startRound()}}
   requestAnimationFrame(loop)};loop();
  window.__JSG={choose,get real(){return real},get phase(){return phase},get score(){return score}};try{ctx.say('진짜 홍길동을 찾아요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'백자 연적',h:'서원 유생이 쓰던 연적이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.08,12,8),M(0xf0ece0,{roughness:.3})))})},
  {n:'먹',h:'글씨를 쓰던 먹이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.16,.04,.05),M(0x1a1a1a)))})},
  {n:'막새 기와',h:'서원 지붕 끝을 막던 기와예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18),M(0x5a5a5a)))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})},
  {n:'짚신 조각',h:'짚으로 삼은 신이에요. 홍길동전의 허수아비도 짚으로 만들었어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.24,.03,.09),M(0xc8a860)))})}];
 window.__JSDIG=()=>{window.__DETECT&&window.__DETECT({key:'jangseong_dig',title:'장성 발굴 탐지',emoji:'⛏️',bg:'#1e2230',count:4,TL:150,cand:[[-50,10],[-60,-20],[30,-10],[0,40],[-40,40],[60,-40],[10,-40],[-70,50]],items:ITEMS,intro:'장성 땅속에 옛 사람들의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'장성은 선비의 서원과 홍길동 이야기가 함께 전하는 고장이에요.'})};
 const meta={quest:{t:'장성 둘러보기',d:'필암서원과 장승, 홍길동 마당을 둘러보세요.',steps:[['서원','필암서원'],['경장각','경장각'],['장승','마을 장승'],['홍길동','홍길동 마당']]},
  title:'장성 필암서원·홍길동 마당',hint:'세계유산 필암서원을 간추려 지었고, 마을 장승은 공개 3D(CC BY)예요. 분신 속 진짜 홍길동을 찾아 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:8,z:26,lines:['장성 필암서원','세계유산 한국의 서원','홍길동의 고장','간추려 지음 · 장승 공개 3D']}},
  npc:[['science',[[2,24],[10,24],[10,30],[2,30]]]],bounds:[-100,100,-100,100],level:()=>'장성',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.1,ox:-5,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#8a6a48';g.fillRect(X(SX-16),Z(SZ-26),32*S,47*S);g.fillStyle='#3f7a2e';g.fillRect(X(SX-22),Z(SZ-50),44*S,16*S);g.fillStyle='#b8ac98';g.beginPath();g.arc(X(HX),Z(HZ),7*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:6,z:30,yaw:Math.PI},size:{}},meta)}
