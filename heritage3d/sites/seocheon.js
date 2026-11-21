/* 서천 한산모시·신성리 갈대밭 마당(2026-11-21): 공개 실측 3D(CC BY)가 없어 간추려 지음(집은 hanokkit 실측 한옥·초가 CC BY).
   한산모시짜기는 국가무형유산이자 2011년 유네스코 인류무형문화유산. 모시풀 껍질을 벗겨 말린 태모시를 이로 쪼개는 「모시 째기」, 무릎에 비벼 잇는 「모시 삼기」를 거쳐 베틀에 짜요.
   신성리 갈대밭은 금강 하구의 너른 갈대밭이에요. 놀이: 모시 째기(알맞은 때 눌러 가늘게 쪼개기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {placeHanok} from './hanokkit.js';
export function buildSeocheon(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(4127);
 const TOUCH=opts.touch!=null?!!opts.touch:matchMedia('(pointer:coarse)').matches;
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 금강 하구(x>60) */const RX=60;
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(240,220,120,110);g.rotateX(-Math.PI/2);g.translate(10,0,0);const p=g.attributes.position;const col=[];const c=new THREE.Color();
  for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);p.setY(k,x>RX+2?-3:0);c.set(x>RX-1?'#c8b890':x>20?'#a8a070':'#8a9a4a');col.push(c.r,c.g,c.b)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1}));m.receiveShadow=true;G.add(m)}
 const WT=tex(256,256,(q,w,h)=>{q.fillStyle='#5a7a80';q.fillRect(0,0,w,h);for(let i=0;i<200;i++){q.strokeStyle=`rgba(220,240,240,${.08+r()*.12})`;q.lineWidth=1+r()*2;const x=r()*w,y=r()*h;q.beginPath();q.moveTo(x,y);q.lineTo(x+20+r()*20,y);q.stroke()}},[4,8]);WT.wrapS=WT.wrapT=THREE.RepeatWrapping;
 {const rv=new THREE.Mesh(new THREE.PlaneGeometry(90,400),new THREE.MeshStandardMaterial({map:WT,roughness:.12,metalness:.2}));rv.rotation.x=-Math.PI/2;rv.position.set(RX+47,-.5,0);G.add(rv);solids.push({x0:RX+1,x1:RX+200,y0:-6,y1:20,z0:-200,z1:200})}
 /* 신성리 갈대밭(x 22~58): 갈대 + 나무 데크 길 */const reedM=new THREE.MeshStandardMaterial({color:0xc8b078,roughness:.9,side:THREE.DoubleSide});let reeds;
 {const geo=new THREE.PlaneGeometry(.035,2.6);geo.translate(0,1.3,0);const NR=9000;reeds=new THREE.InstancedMesh(geo,reedM,NR);const heads=new THREE.InstancedMesh(new THREE.SphereGeometry(1,6,4),M(0xe0d4b8,{roughness:1}),NR);const o=new THREE.Object3D(),q=new THREE.Object3D();let n=0;for(let i=0;i<16000&&n<NR;i++){const x=22+r()*37,z=-90+r()*180;if(Math.abs(z-(x-40)*.4)<1.8)continue;const sy=.7+r()*.6,lx=(r()-.5)*.25,lz=(r()-.5)*.25;o.position.set(x,0,z);o.rotation.set(lx,r()*3.14,lz);o.scale.set(1,sy,1);o.updateMatrix();reeds.setMatrixAt(n,o.matrix);const tip=new THREE.Vector3(0,2.6,0).applyMatrix4(o.matrix);q.position.copy(tip);q.rotation.set(lx+.35,0,lz);q.scale.set(.07,.32,.07);q.updateMatrix();heads.setMatrixAt(n,q.matrix);n++}reeds.count=n;heads.count=n;G.add(reeds,heads);
  const dk=new THREE.Mesh(new THREE.BoxGeometry(40,.15,2),M(0x9a7a58));dk.position.set(40,.12,0);dk.rotation.y=-Math.atan(.4);G.add(dk)}
 /* 한산모시관(간추림) */if(!mini){const h=buildHall({x:-24,z:-16,ry:0,W:12,D:7,nx:4,nz:2,FY:.7,PH:3.2,roof:'hip',name:'韓山모시館',pillar:0x8a5a38,bracket:'ik',front:'open',solids,light:false,roofScale:.95});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 /* 모시밭: 키 큰 모시풀 */{const sm=M(0x4a7a2a),lm=M(0x6a9a3a,{side:THREE.DoubleSide});const st=new THREE.InstancedMesh(new THREE.CylinderGeometry(.02,.03,1.8,4),sm,900),lf=new THREE.InstancedMesh(new THREE.CircleGeometry(.18,6),lm,1800);const o=new THREE.Object3D();let n=0,m=0;for(let x=-60;x<-36;x+=.8)for(let z=10;z<40;z+=.8){o.position.set(x+(r()-.5)*.3,.9,z+(r()-.5)*.3);o.rotation.set(0,0,0);o.scale.setScalar(1);o.updateMatrix();if(n<900)st.setMatrixAt(n++,o.matrix);for(let k=0;k<2&&m<1800;k++){o.position.y=.9+r()*.9;o.rotation.set(-Math.PI/2+(r()-.5)*.8,r()*6,0);o.updateMatrix();lf.setMatrixAt(m++,o.matrix)}}st.count=n;lf.count=m;G.add(st,lf)}
 /* 모시 째는 마루 */const PX=-8,PZ=-4;{const pl=new THREE.Mesh(new THREE.BoxGeometry(3.4,.5,2.4),M(0x8a6a44));pl.position.set(PX,.25,PZ);G.add(pl);solids.push({x0:PX-1.7,x1:PX+1.7,y0:0,y1:.6,z0:PZ-1.2,z1:PZ+1.2});
  const bun=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,1.4,10),M(0xe8e0c0));bun.rotation.z=Math.PI/2;bun.position.set(PX+.9,.65,PZ);G.add(bun);
  for(let i=0;i<8;i++){const s=new THREE.Mesh(new THREE.CylinderGeometry(.01,.01,1.6,3),M(0xf0ead0));s.rotation.z=Math.PI/2;s.position.set(PX+.4+(r()-.5)*.3,1.2+i*.05,PZ+.8);G.add(s)}
  const rk=new THREE.Group();rk.position.set(PX-4,0,PZ-1.5);for(const dx of[-1.5,1.5]){const p=new THREE.Mesh(new THREE.BoxGeometry(.12,2.2,.12),M(0x7a5a38));p.position.set(dx,1.1,0);rk.add(p)}const bar=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,3.2,6),M(0x7a5a38));bar.rotation.z=Math.PI/2;bar.position.y=2.1;rk.add(bar);for(let i=0;i<14;i++){const t=new THREE.Mesh(new THREE.BoxGeometry(.08,1.6,.01),M(0xf4eedc,{roughness:.7}));t.position.set(-1.3+i*.2,1.3,0);rk.add(t)}G.add(rk);solids.push({x0:PX-5.6,x1:PX-2.4,y0:0,y1:2.3,z0:PZ-1.7,z1:PZ-1.3})}
 if(!mini){for(const[k,x,z,ry]of[['choga1',-50,-30,0],['choga2',-6,30,Math.PI],['sarang',-70,-6,Math.PI/2],['nongga',8,-36,0]])placeHanok(G,solids,k,x,z,ry,{TOUCH,s:.7})}
 /* 밤 */const NL=[];if(!mini){for(const[x,z]of[[PX,PZ+2],[-24,-10],[40,0],[-6,24]]){const L=new THREE.PointLight(0xffc080,0,18,1.5);L.position.set(x,3,z);G.add(L);NL.push(L)}}
 let nk=0,tt=0;const nightTick=dt=>{tt+=dt;const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7;WT.offset.y+=dt*.02;reedM.color.setHSL(.11,.38,.62+Math.sin(tt*.7)*.02)};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(-24,-9,3.4,'한산모시관','한산모시짜기는 국가무형유산이고 2011년 유네스코 인류무형문화유산이 됐어요. 잠자리 날개처럼 가볍고 시원해 「세모시」라고 불러요. 간추려 지었어요.');
 sp(PX-2.6,PZ+1.8,1.8,'모시 째는 마루','말린 태모시를 이로 가늘게 쪼개 봐요(모시 째기).');
 sp(PX-4,PZ,1.8,'모시 말리는 시렁','쪼갠 모시 올을 무릎에 비벼 이은 뒤(모시 삼기) 날실로 걸어 말려요.');
 sp(-48,8,3,'모시밭','모시풀은 1년에 세 번 베어요. 껍질을 벗겨 겉껍질을 긁어 내고 햇볕에 말리면 태모시가 돼요.');
 sp(24,-6,3,'신성리 갈대밭','금강 하구의 너른 갈대밭이에요. 가을이면 은빛 갈대꽃이 바람에 흔들리고, 겨울엔 철새가 모여요.');
 sp(-30,16,2.4,'발굴 탐지 자리','서천 땅속에 옛 사람들의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 모시 째기(11/21): 막대가 오가는 동안 가운데 칸에서 「째기」를 누르면 깨끗이 쪼개져요. 한 올을 네 번 쪼개면 세모시 한 올. 다섯 올, 75초 */
 window.__SCMOSI=()=>{if(document.getElementById('mzP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX-2.4,PZ+1.6,0);H3.face(Math.PI*.8)}catch(e){}
  window.__GCAM=()=>document.getElementById('mzP')?[PX-1.4,2.4,PZ+2.2,PX+.3,1,PZ,55]:null;
  const g=new THREE.Group();G.add(g);const fib=[];const mkF=lv=>{for(const f of fib)g.remove(f);fib.length=0;const k=1<<lv;for(let i=0;i<k;i++){const f=new THREE.Mesh(new THREE.BoxGeometry(1.6,.012,.16/k*.9),M(0xece4c4,{roughness:.6}));f.position.set(PX+.2,1.02,PZ-.08+(i+.5)*(.16/k)+(lv?i*.02:0));g.add(f);fib.push(f)}};mkF(0);
  let lv=0,cnt=0,miss=0,done=false,t0=performance.now()/1000,ph=0;const N=5,TL=75;
  const d=document.createElement('div');d.id='mzP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2a22;border:3px solid #e8e0c0;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4f0e0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:240px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0e6c0">🧵 모시 째기</b><div id="mzS" style="font:19px 'Do Hyeon',sans-serif;margin:4px 0">세모시 0 / ${N}올</div><div id="mzL" style="font-size:13px">이번 올: 0 / 4번 쪼갬</div><div style="position:relative;height:18px;background:#444;border-radius:9px;margin:6px 0;overflow:hidden"><div id="mzZ" style="position:absolute;top:0;bottom:0;background:#8ac060"></div><div id="mzK" style="position:absolute;top:0;bottom:0;width:5px;background:#ffd040"></div></div><div id="mzG" style="font-size:13px;color:#f0e6c0;margin:4px 0">막대가 초록 칸에 올 때 눌러요</div><button id="mzB" style="width:100%;font:18px 'Do Hyeon',sans-serif;background:#e8e0c0;color:#2a2a22;border:0;border-radius:12px;padding:12px 0;cursor:pointer">🦷 째기</button><div id="mzT" style="font-size:13px;margin-top:4px">${TL}초</div>`;
  const Sx=d.querySelector('#mzS'),Lx=d.querySelector('#mzL'),Z=d.querySelector('#mzZ'),K=d.querySelector('#mzK'),Gd=d.querySelector('#mzG'),T=d.querySelector('#mzT');
  const zone=()=>{const w=30-lv*5;return[50-w/2,50+w/2]};const setZ=()=>{const[a,b]=zone();Z.style.left=a+'%';Z.style.width=(b-a)+'%'};setZ();
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const pos=()=>50+48*Math.sin(ph);
  const cut=()=>{if(done)return;const x=pos(),[a,b]=zone();if(x>=a&&x<=b){lv++;snd(1200+lv*150,.08,'square');Gd.textContent=lv<4?'깨끗이 쪼갰어요! 더 가늘게':'세모시 한 올 완성!';if(lv>=4){cnt++;Sx.textContent='세모시 '+cnt+' / '+N+'올';lv=0;snd(660,.25);if(cnt>=N)fin()}mkF(lv);setZ();Lx.textContent='이번 올: '+lv+' / 4번 쪼갬'}else{miss++;snd(160,.2,'sawtooth');Gd.textContent='올이 거칠게 갈라졌어요. 다시 해요';if(lv>0){lv--;mkF(lv);setZ();Lx.textContent='이번 올: '+lv+' / 4번 쪼갬'}}};
  d.querySelector('#mzB').onclick=cut;const onKey=e=>{if(e.code==='Space'){e.preventDefault();cut()}};addEventListener('keydown',onKey);
  const fin=()=>{if(done)return;done=true;removeEventListener('keydown',onKey);G.remove(g);const el=performance.now()/1000-t0;const Q=cnt>=N?Math.max(65,Math.round(100-Math.max(0,el-40)*.8-miss*2)):Math.round(cnt/N*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('seocheon_mosi',Q,'서천 모시 째기')}catch(e){}window.__MZQ=Q;
   d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#f0e6c0">${cnt>=N?'세모시 다섯 올 완성!':'세모시 '+cnt+'올을 만들었어요'}</b><div style="font-size:13px;margin:4px 0">태모시를 이로 쪼개고 또 쪼개 머리카락보다 가늘게 만들어요. 고운 세모시 한 필에는 몇 달의 손길이 들어요.</div><div style="font-size:26px;color:#e8e0c0">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#e8e0c0;color:#2a2a22;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4f0e0;border:2px solid #f4f0e0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__SCMOSI()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  let last=t0;const loop=()=>{if(!d.isConnected){removeEventListener('keydown',onKey);G.remove(g);return}const now=performance.now()/1000,dt=Math.min(.1,now-last);last=now;if(!done){ph+=dt*(2.4+lv*.5);K.style.left=pos()+'%';const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin()}requestAnimationFrame(loop)};loop();
  window.__MZ={cut,zone,pos,get cnt(){return cnt}};try{ctx.say('태모시를 가늘게 쪼개요!',2.2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'가락바퀴',h:'실을 꼬던 돌 가락바퀴예요. 옛날부터 이곳에서 실을 자았어요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.04,16),M(0x7a6a5a));g.add(m)})},
  {n:'뼈바늘',h:'옷을 깁던 뼈바늘이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.006,.01,.18,5),M(0xe8dcc0));m.rotation.z=Math.PI/2;g.add(m)})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'한산 모시장에서 오가던 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})},
  {n:'쇠 가위',h:'모시를 자르던 쇠 가위 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.02,.04),M(0x4a3a30,{metalness:.5})))})}];
 window.__SCMDIG=()=>{window.__DETECT&&window.__DETECT({key:'seocheon_dig',title:'서천 발굴 탐지',emoji:'⛏️',bg:'#2a2a22',count:4,TL:150,cand:[[-30,16],[-10,40],[0,-24],[-60,-40],[-40,-4],[10,20],[-74,24],[-20,-44]],items:ITEMS,intro:'서천 땅속에 옛 사람들의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'서천 한산은 1,500년 넘게 모시를 짜 온 고장으로 알려져 있어요.'})};
 const meta={quest:{t:'서천 둘러보기',d:'한산모시관과 신성리 갈대밭을 둘러보세요.',steps:[['모시관','한산모시관'],['모시밭','모시밭'],['갈대밭','신성리 갈대밭']]},
  title:'서천 한산모시·신성리 갈대밭',hint:'한산모시(유네스코 인류무형문화유산)와 금강 하구 갈대밭을 간추려 지었어요(집은 실측). 태모시를 가늘게 쪼개 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,groundY:-3.5,sign:{x:4,z:6,lines:['서천 한산모시·신성리 갈대밭','유네스코 인류무형문화유산','모시 째기 · 금강 갈대','간추려 지음']}},
  npc:[['science',[[0,8],[10,8],[10,16],[0,16]]]],bounds:[-100,RX,-100,100],level:()=>'서천',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:-5,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#c8b078';g.fillRect(X(22),0,37*S,300);g.fillStyle='#5a7a80';g.fillRect(X(RX),0,300,300);g.fillStyle='#4a7a2a';g.fillRect(X(-60),Z(10),24*S,30*S);g.fillStyle='#8a5a38';g.fillRect(X(-30),Z(-19.5),12*S,7*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:4,z:12,yaw:Math.PI},size:{}},meta)}
