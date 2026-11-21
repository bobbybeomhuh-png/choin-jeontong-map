/* 함안 말이산 고분군 마당(2026-11-22, 함안 덧붙이기 E5): 고분 능선은 공개 사진·수치로 간추려 지음.
   공개 실측: 말머리가리개(국가유산청 KHS_Asset 「Horse Headgear」 CC BY, 경주 사라리 65호 출토, 실제 크기 약 0.6m) — 함안 마갑총(1992 아파트 공사 중 발견)에서 나온 말갑옷과 같은 때의 같은 꼴 말갖춤.
   말이산 고분군(사적, 세계유산 「가야고분군」 2023): 아라가야 왕과 귀족의 무덤 100여 기가 함안 시내 남북 능선(약 1.9km) 위에 줄지어 있음. 13호분 덮개돌에서 남두육성·전갈자리 등 별자리 홈 125개가 발견(2018).
   놀이: 덮개돌 별자리 잇기(남두육성·전갈자리), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildMalisan(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(2023);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 남북(z)으로 뻗은 능선(x≈0), 높이 8m */const ss=t=>t<=0?0:t>=1?1:t*t*(3-2*t);const H=(x,z)=>8*ss(1-Math.abs(x)/26)*ss((90-Math.abs(z))/30);
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(220,220,110,110);g.rotateX(-Math.PI/2);const p=g.attributes.position;for(let k=0;k<p.count;k++)p.setY(k,H(p.getX(k),p.getZ(k)));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,color:0x7aa04a,roughness:1}));m.receiveShadow=true;G.add(m)}
 /* 능선 위 큰 봉분 줄 */const MOUNDS=[];{const gm=M(0x6a9a3a,{roughness:1});for(let k=0;k<9;k++){const z=-64+k*16+(r()-.5)*3,x=(r()-.5)*3;const R=4.5+r()*3.5,h=(1.6+r()*1.4);const mo=new THREE.Mesh(new THREE.SphereGeometry(R,24,10,0,Math.PI*2,0,Math.PI/2),gm);mo.scale.y=h/R*1.6;mo.position.set(x,H(x,z)-.2,z);mo.receiveShadow=true;G.add(mo);MOUNDS.push([x,z,R]);solids.push({cx:x,cz:z,r:R*.85,y0:-2,y1:H(x,z)+h*1.6})}}
 /* 13호분 앞 덮개돌(별자리 홈) 전시 */const CX=12,CZ=-4;const capY=H(CX,CZ);{const cs=new THREE.Mesh(new THREE.BoxGeometry(3.4,.5,2),M(0x8a8070,{flatShading:true}));cs.position.set(CX,capY+.5,CZ);G.add(cs);const dots=new THREE.InstancedMesh(new THREE.CylinderGeometry(.04,.04,.02,8),M(0x2a2620),60);const o=new THREE.Object3D();for(let k=0;k<60;k++){o.position.set(CX+(r()-.5)*3,capY+.76,CZ+(r()-.5)*1.7);o.updateMatrix();dots.setMatrixAt(k,o.matrix)}G.add(dots);solids.push({x0:CX-1.8,x1:CX+1.8,y0:0,y1:capY+1,z0:CZ-1.1,z1:CZ+1.1})}
 /* 말갖춤 전시대(말머리가리개 실측) */const EX=-14,EZ=10;const ey=H(EX,EZ);{const ped=new THREE.Mesh(new THREE.BoxGeometry(1.4,1,1.2),M(0xe8e0d0));ped.position.set(EX,ey+.5,EZ);G.add(ped);const glass=new THREE.Mesh(new THREE.BoxGeometry(1.3,.9,1.1),new THREE.MeshStandardMaterial({color:0xd8f0f8,transparent:true,opacity:.18,roughness:.05}));glass.position.set(EX,ey+1.45,EZ);G.add(glass);solids.push({x0:EX-.8,x1:EX+.8,y0:0,y1:ey+2,z0:EZ-.7,z1:EZ+.7});
  if(!mini){const L=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');L.setDRACOLoader(dr);L.load(new URL('../models/malisan/headgear.glb',import.meta.url).href,m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;if(e.material){e.material.transparent=false;e.material.alphaTest=0}}});const b=new THREE.Box3().setFromObject(o);const c=b.getCenter(new THREE.Vector3());const w=new THREE.Group();o.position.set(-c.x,-b.min.y,-c.z);w.add(o);w.position.set(EX,ey+1.02,EZ);w.rotation.y=Math.PI/2;w.userData.noBatch=true;G.add(w)},undefined,()=>{})}}
 /* 아라가야 왕궁 터 망루(간추림) */if(!mini){const y=H(-30,-30);const h=buildHall({x:-30,z:-30,ry:0,W:4,D:4,nx:1,nz:1,FY:2.6,PH:2.4,roof:'gable',name:'',pillar:0x6a4a2a,bracket:'ik',front:'open',back:'open',left:'open',right:'open',stairs:'none',rail:true,roofScale:.8,solids:[],light:false,plain:true});h.group.position.y=y;G.add(h.group)}
 const NL=[];if(!mini){for(const[x,z]of[[CX,CZ+3],[EX,EZ+2],[4,30]]){const L=new THREE.PointLight(0xffc080,0,20,1.5);L.position.set(x,H(x,z)+3,z);G.add(L);NL.push(L)}}
 /* 밤하늘 별 */const stars=new THREE.Points(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(Array.from({length:600},()=>{const a=r()*6.28,e=.15+r()*1.3,R=180;return[Math.cos(a)*Math.cos(e)*R,Math.sin(e)*R,Math.sin(a)*Math.cos(e)*R]}).flat(),3)),new THREE.PointsMaterial({color:0xffffff,size:1.4,transparent:true,opacity:0,sizeAttenuation:false}));G.add(stars);
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7;stars.material.opacity=nk};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(6,40,3.4,'말이산 고분군','아라가야 왕과 귀족의 무덤 100여 기가 함안 시내 능선 위에 줄지어 있어요. 2023년 「가야고분군」으로 세계유산이 됐어요. 간추려 지었어요.');
 sp(CX-3,CZ+2.6,2.2,'13호분 덮개돌','2018년 13호분 덮개돌에서 남두육성과 전갈자리 등 별자리를 새긴 홈 125개가 발견됐어요. 별자리를 이어 봐요.');
 sp(EX+2,EZ+1.6,2.2,'말머리가리개','싸울 때 말 머리를 지키던 쇠 투구예요. 1992년 함안 아파트 공사 중 마갑총에서 말갑옷 한 벌이 거의 온전히 나와 아라가야의 강한 기병을 보여 줬어요. 3D: 국가유산청(경주 사라리 출토 같은 꼴), CC BY.');
 sp(-26,-26,2.6,'아라가야 왕궁 터','함안 가야리에서 흙으로 쌓은 성벽과 망루·건물 터가 발굴돼 아라가야 왕궁 터로 봐요. 간추려 지었어요.');
 sp(30,40,2.4,'발굴 탐지 자리','함안 땅속에 아라가야 사람들의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 별자리 잇기(11/22): 덮개돌 홈(별) 가운데 별자리를 이루는 별을 차례로 눌러 이어요. 남두육성(6) → 전갈자리(8). 틀리면 그 별자리 처음부터. 90초 */
 const CONS=[['남두육성','국자 모양 여섯 별(궁수자리). 오래 살게 해 준다고 믿었어요.',[[.22,.62],[.32,.55],[.44,.58],[.55,.5],[.66,.38],[.78,.42]]],['전갈자리','머리부터 꼬리까지 여덟 별. 붉은 별 안타레스(심수)가 가운데 있어요.',[[.25,.25],[.3,.34],[.36,.42],[.42,.52],[.46,.62],[.52,.72],[.62,.76],[.72,.7]]]];
 window.__MLSTAR=()=>{if(document.getElementById('mlP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(CX-3,CZ+2.6,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('mlP')?[CX,capY+4.2,CZ+2.6,CX,capY+.6,CZ,55]:null;
  const cv=document.createElement('canvas');cv.id='mlC';cv.style.cssText='position:fixed;inset:0;z-index:55;width:100%;height:100%;touch-action:none';document.body.appendChild(cv);const q=cv.getContext('2d');cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio;
  let ci=0,step=0,mist=0,done=false,t0=performance.now()/1000,flash=0;const TL=90;const noise=Array.from({length:34},()=>[.08+Math.random()*.84,.12+Math.random()*.76]);
  const box=()=>{const W=cv.width,Hh=cv.height,s=Math.min(W,Hh*.62);return{x0:(W-s)/2,y0:Hh*.18,s}};
  const pts=()=>{const b=box();const own=CONS[ci][2].map(([u,v])=>({x:b.x0+u*b.s,y:b.y0+v*b.s,real:true}));const nz=noise.map(([u,v])=>({x:b.x0+u*b.s,y:b.y0+v*b.s,real:false})).filter(p=>own.every(o=>Math.hypot(o.x-p.x,o.y-p.y)>b.s*.07));return{own,nz}};
  const d=document.createElement('div');d.id='mlP';d.style.cssText="position:fixed;right:12px;bottom:24px;z-index:60;background:#1a1e2a;border:3px solid #a8b8e0;border-radius:16px;padding:10px 14px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef0f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:230px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#c8d8ff">✨ 덮개돌 별자리 잇기</b><div id="mlN" style="font:18px 'Do Hyeon',sans-serif;margin:4px 0"></div><div id="mlH" style="font-size:12px;color:#c8d8ff"></div><div id="mlT" style="font-size:13px;margin-top:4px">${TL}초</div>`;
  const snd=(f,len,type='sine')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const info=()=>{d.querySelector('#mlN').textContent=CONS[ci][0]+' · '+step+' / '+CONS[ci][2].length;d.querySelector('#mlH').textContent=CONS[ci][1]+(step===0?' 첫 별(빛나는 별)부터 차례로 눌러요.':'')};info();
  const choose=k=>{if(done)return;if(k===step){step++;snd(600+step*80,.18);if(step>=CONS[ci][2].length){snd(990,.4);ci++;step=0;if(ci>=CONS.length){fin();return}}}else{mist++;step=0;flash=.5;snd(160,.3,'sawtooth')}info()};
  const pick=(cx,cy)=>{const X=cx*devicePixelRatio,Y=cy*devicePixelRatio;const{own,nz}=pts();const b=box();let best=-2,bd=1e9;own.forEach((p,k)=>{const dd=Math.hypot(p.x-X,p.y-Y);if(dd<bd){bd=dd;best=k}});nz.forEach(p=>{const dd=Math.hypot(p.x-X,p.y-Y);if(dd<bd){bd=dd;best=-1}});if(bd<b.s*.06)choose(best)};
  cv.onpointerdown=e=>pick(e.clientX,e.clientY);
  const cleanup=()=>cv.remove();
  const fin=()=>{if(done)return;done=true;cleanup();const ok=ci>=CONS.length;const el=performance.now()/1000-t0;const Q=ok?Math.max(60,Math.round(100-mist*5-Math.max(0,el-40)*.5)):Math.round(ci/CONS.length*55);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('malisan_star',Q,'덮개돌 별자리 잇기')}catch(e){}window.__MLQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#c8d8ff">${ok?'두 별자리를 다 이었어요!':'별자리 '+ci+'개를 이었어요'}</b><div style="font-size:13px;margin:4px 0">아라가야 사람들은 무덤 덮개돌에 별자리를 새겨, 죽은 이가 하늘의 별과 함께하길 빌었던 것으로 보여요. 가야의 천문 지식을 보여 주는 귀한 자료예요.</div><div style="font-size:24px;color:#a8b8e0">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#a8b8e0;color:#1a1e2a;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef0f8;border:2px solid #eef0f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__MLSTAR()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  let last=t0;const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}const now=performance.now()/1000,dt=Math.min(.1,now-last);last=now;flash=Math.max(0,flash-dt);
   if(!done){const left=Math.max(0,TL-(now-t0));d.querySelector('#mlT').textContent=Math.ceil(left)+'초';if(left<=0){fin();return}
    const W=cv.width,Hh=cv.height,b=box();q.clearRect(0,0,W,Hh);q.fillStyle=flash>0?'rgba(80,20,20,.55)':'rgba(10,14,30,.62)';q.fillRect(0,0,W,Hh);q.fillStyle='rgba(120,110,95,.5)';q.fillRect(b.x0-12,b.y0-12,b.s+24,b.s+24);
    const{own,nz}=pts();const R=b.s*.018;q.fillStyle='#d8d0c0';for(const p of nz){q.beginPath();q.arc(p.x,p.y,R*.85,0,7);q.fill()}
    q.strokeStyle='#ffe080';q.lineWidth=R*.6;q.beginPath();for(let k=0;k<step;k++){k?q.lineTo(own[k].x,own[k].y):q.moveTo(own[k].x,own[k].y)}q.stroke();
    own.forEach((p,k)=>{q.fillStyle=k<step?'#ffe080':'#d8d0c0';q.beginPath();q.arc(p.x,p.y,R,0,7);q.fill();if(k===0&&step===0){q.strokeStyle=`rgba(255,224,128,${.5+.5*Math.sin(now*6)})`;q.lineWidth=3;q.beginPath();q.arc(p.x,p.y,R*2.2,0,7);q.stroke()}})}
   requestAnimationFrame(loop)};loop();
  window.__MLG={choose,get ci(){return ci},get step(){return step}};try{ctx.say('덮개돌 홈을 이어 별자리를 찾아요!',2.2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'불꽃무늬 굽다리접시',h:'굽에 불꽃 모양 구멍을 낸 아라가야만의 토기예요.',mk:mk(g=>{const c=new THREE.Mesh(new THREE.CylinderGeometry(.16,.1,.08,14),M(0x5a5a5a));c.position.y=.12;g.add(c);g.add(new THREE.Mesh(new THREE.CylinderGeometry(.06,.1,.14,10,1,true),M(0x5a5a5a,{side:THREE.DoubleSide})))})},
  {n:'말갑옷 비늘',h:'말갑옷을 이루던 쇠 비늘 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.1,.01,.06),M(0x4a3a30,{metalness:.6})))})},
  {n:'덩이쇠',h:'가야의 쇠는 돈처럼 쓰이고 바다 건너로 팔려 나갔어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.26,.03,.07),M(0x4a3a30,{metalness:.5})))})},
  {n:'고리자루 큰칼',h:'손잡이 끝에 고리가 달린 큰칼이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.36,.02,.04),M(0x5a4a3a,{metalness:.5})))})},
  {n:'유리구슬',h:'목걸이를 꾸미던 푸른 유리구슬이에요.',mk:mk(g=>{for(let i=0;i<6;i++){const b=new THREE.Mesh(new THREE.SphereGeometry(.025,8,6),M(0x2a7aa8,{roughness:.2}));b.position.set((i-2.5)*.05,0,0);g.add(b)}})}];
 window.__MLDIG=()=>{window.__DETECT&&window.__DETECT({key:'malisan_dig',title:'아라가야 발굴 탐지',emoji:'⛏️',bg:'#1a1e2a',count:4,TL:150,cand:[[30,40],[40,0],[-40,20],[30,-40],[-40,-50],[44,30],[-46,40],[24,60]],items:ITEMS,intro:'함안 땅속에 아라가야 사람들의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'아라가야는 쇠와 말을 잘 다룬 강한 가야 나라였어요.'})};
 const meta={quest:{t:'말이산 둘러보기',d:'능선의 고분과 덮개돌, 말갖춤을 둘러보세요.',steps:[['고분군','말이산 고분군'],['덮개돌','13호분 덮개돌'],['말갖춤','말머리가리개'],['왕궁','아라가야 왕궁 터']]},
  title:'함안 말이산 고분군',hint:'세계유산 가야고분군 말이산을 간추려 지었고, 말머리가리개는 공개 실측(CC BY)이에요. 덮개돌 홈을 이어 별자리를 찾아 봐요. 밤엔 별이 떠요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:24,z:34,lines:['함안 말이산 고분군','세계유산 가야고분군','덮개돌 별자리 · 말갑옷','간추려 지음 · 실측 1점']}},
  npc:[['science',[[20,30],[28,30],[28,38],[20,38]]]],bounds:[-90,90,-90,90],level:()=>'함안',camCap:()=>Infinity,baseAt:(x,z)=>H(x,z),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.3,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#7aa04a';g.fillRect(0,0,300,300);g.fillStyle='#5a8a30';g.fillRect(X(-14),0,28*S,300);g.fillStyle='#4a7a2a';for(const[x,z,R]of MOUNDS){g.beginPath();g.arc(X(x),Z(z),R*S,0,7);g.fill()}g.fillStyle='#8a8070';g.fillRect(X(CX-1.7),Z(CZ-1),3.4*S,2*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:26,z:36,yaw:Math.PI*1.2},size:{}},meta)}
