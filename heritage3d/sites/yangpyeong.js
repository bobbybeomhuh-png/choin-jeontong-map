/* 양평·가평 마당(2026-11-22, W46): 북한강과 남한강이 만나는 두물머리.
   공개 3D: 은행나무(PuzzledPapaya, CC BY)를 양평 용문사 은행나무 실제 높이 42m로 맞춤(천연기념물, 1100살 넘는다고 전함).
   두물머리 느티나무·황포돛배, 용문사 대웅전, 북한강 뗏목길은 공개 사진·지도로 간추려 지음.
   옛날 강원도 산골 나무를 뗏목으로 엮어 북한강을 타고 가평·두물머리를 지나 한양 마포까지 띄워 보냈음(떼꾼).
   놀이: 뗏목 몰기(북한강 바위를 피해 뗏목을 두물머리까지), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildYangpyeong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1100);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x8a9a4a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 물길: 북한강(북쪽에서 x -10~0), 남한강(동쪽에서 z 10~22), 만나서 한강(서쪽). 두물머리 땅은 북동쪽 */const WM=M(0x4a86a8,{roughness:.18,metalness:.12});
 {const pl=(w,h,x,z)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),WM);m.rotation.x=-Math.PI/2;m.position.set(x,.04,z);G.add(m)};pl(10,112,-5,-44);pl(112,12,44,16);pl(100,12,-60,16);pl(10,12,-5,16);
  const SA=M(0xd8c8a0,{roughness:1});for(const[w,h,x,z]of[[1.4,104,.7,-46],[104,1.4,52,9.3]]){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),SA);m.rotation.x=-Math.PI/2;m.position.set(x,.03,z);G.add(m)}
  /* 물 건너편(서·남) 산 */for(let k=0;k<18;k++){const t=new THREE.Mesh(new THREE.ConeGeometry(2+r()*2,8+r()*8,7),M(0x3a5a30,{roughness:1}));t.position.set(-30-r()*50,4,-80+k*9);G.add(t)}}
 /* 두물머리 느티나무(400살) + 황포돛배 */const TX=6,TZ=4;{const tr=new THREE.Mesh(new THREE.CylinderGeometry(.9,1.4,5,10),M(0x5a4434));tr.position.set(TX,2.5,TZ);G.add(tr);const lm=M(0x5a7a2a);for(let k=0;k<9;k++){const a=k/9*Math.PI*2;const c=new THREE.Mesh(new THREE.SphereGeometry(4,10,8),lm);c.scale.y=.6;c.position.set(TX+Math.cos(a)*5,7+r()*1.5,TZ+Math.sin(a)*5);G.add(c)}const c0=new THREE.Mesh(new THREE.SphereGeometry(5,10,8),lm);c0.scale.y=.6;c0.position.set(TX,9,TZ);G.add(c0);solids.push({cx:TX,cz:TZ,r:1.6,y0:0,y1:6})
  for(const[bx,bz,ry]of[[12,15,.2],[22,17,-.1]]){const g=new THREE.Group();g.position.set(bx,.05,bz);g.rotation.y=ry;const h=new THREE.Mesh(new THREE.BoxGeometry(7,.8,2),M(0x8a6a44));h.position.y=.3;g.add(h);const mast=new THREE.Mesh(new THREE.CylinderGeometry(.08,.1,6,6),M(0x6a4a30));mast.position.y=3.5;g.add(mast);const sail=new THREE.Mesh(new THREE.PlaneGeometry(3.4,4.4),M(0xd8a840,{side:THREE.DoubleSide}));sail.position.set(.1,4,0);sail.rotation.y=Math.PI/2;g.add(sail);G.add(g)}}
 /* 용문사: 은행나무(공개 3D, 높이 42m) + 대웅전 */const GX=50,GZ=-48;
 if(!mini){const L=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');L.setDRACOLoader(dr);L.load(new URL('../models/yangpyeong/ginkgo.glb',import.meta.url).href,m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;if(e.material&&e.material.map){e.material.alphaTest=.45;e.material.transparent=false}}});const b=new THREE.Box3().setFromObject(o);const c=b.getCenter(new THREE.Vector3());o.position.set(-c.x,-b.min.y,-c.z);const w=new THREE.Group();w.add(o);/* 줄기가 모델 가운데에서 비껴 있어(블렌더 실측 x -2.57, z +0.79) 줄기를 울타리 가운데로 */w.position.set(GX+2.57,0,GZ-.79);w.userData.noBatch=true;G.add(w)},undefined,()=>{});
  const h=buildHall({x:GX+4,z:GZ-30,ry:0,W:11,D:7,nx:3,nz:2,FY:1,PH:3.4,roof:'hip',name:'大雄殿',pillar:0x9a3a26,bracket:'dapo',front:'door',roofScale:1,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 {const fence=new THREE.Mesh(new THREE.TorusGeometry(6,.06,4,40),M(0x8a6a44));fence.rotation.x=Math.PI/2;fence.position.set(GX,.7,GZ);G.add(fence);for(let k=0;k<12;k++){const a=k/12*Math.PI*2;const p=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.8,5),M(0x8a6a44));p.position.set(GX+Math.cos(a)*6,.4,GZ+Math.sin(a)*6);G.add(p)}solids.push({cx:GX,cz:GZ,r:5.6,y0:0,y1:8});
  const LV=M(0xe8c030,{side:THREE.DoubleSide});for(let k=0;k<160;k++){const a=r()*6.28,rr=7+r()*16;const l=new THREE.Mesh(new THREE.CircleGeometry(.14,5,0,Math.PI),LV);l.rotation.set(-Math.PI/2,0,r()*6);l.position.set(GX+Math.cos(a)*rr,.03,GZ+Math.sin(a)*rr);G.add(l)}}
 /* 뗏목 놀이: 북한강 물길(x -9~-1)을 따라 북쪽(z -88)에서 두물머리(z 8)까지 */const RX0=-9,RX1=-1,RZ0=-88,RZ1=8;
 const LOG=M(0x8a6040),ROPE=M(0xc8b080);const mkRaft=()=>{const g=new THREE.Group();for(let i=0;i<8;i++){const l=new THREE.Mesh(new THREE.CylinderGeometry(.16,.18,4.2,8),LOG);l.rotation.x=Math.PI/2;l.position.set(-1.12+i*.32,.14,0);g.add(l)}for(const dz of[-1.4,1.4]){const b=new THREE.Mesh(new THREE.BoxGeometry(2.7,.08,.12),ROPE);b.position.set(0,.3,dz);g.add(b)}const man=new THREE.Group();const bd=new THREE.Mesh(new THREE.CylinderGeometry(.2,.25,.9,8),M(0xe8e0d0));bd.position.y=.75;man.add(bd);const hd=new THREE.Mesh(new THREE.SphereGeometry(.17,10,8),M(0xd8b090));hd.position.y=1.35;man.add(hd);const pole=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,3,5),M(0x6a4a30));pole.position.set(.4,1,.3);pole.rotation.x=.5;man.add(pole);man.position.z=-1.2;g.add(man);return g};
 const raft=mkRaft();raft.position.set((RX0+RX1)/2,.04,RZ1-2);G.add(raft);const rocks=[];const RKM=M(0x7a7a72,{flatShading:true});
 const NL=[];if(!mini){for(const[x,y,z]of[[TX,3,TZ+6],[GX,4,GZ+8],[GX+4,4,GZ-24]]){const L=new THREE.PointLight(0xffc080,0,26,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8)};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(TX+4,TZ-6,3,'두물머리','금강산에서 오는 북한강과 강원 산골에서 오는 남한강, 두 물이 만나는 머리라서 두물머리예요. 400살 느티나무 아래 나루터에 황포돛배가 쉬어요. 간추려 지었어요.');
 sp(2,-14,2.6,'뗏목 띄우는 자리','강원도 나무를 엮은 뗏목을 몰아 북한강 바위를 피해 두물머리까지 내려와 봐요.');
 sp(GX,GZ+8,3.4,'용문사 은행나무','높이 42m, 1100살이 넘었다고 전하는 우리나라에서 가장 큰 은행나무예요(천연기념물). 마의태자가 심었다는 이야기도 있어요. 은행나무 3D는 공개 자료를 실제 높이로 키웠어요.');
 sp(GX+4,GZ-22,3,'용문사 대웅전','용문산 기슭의 오래된 절이에요. 간추려 지었어요.');
 sp(40,-10,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 뗏목 몰기(11/22): 뗏목이 물살 따라 저절로 내려가요(초속 4m). ◀ ▶를 누르고 있으면 옆으로 움직여요. 바위에 부딪히면 통나무가 하나씩 풀려 떠내려가요. 두물머리에 닿을 때 남은 통나무가 점수 */
 window.__YPRAFT=()=>{if(document.getElementById('ypP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(3,-14,0)}catch(e){}
  rocks.forEach(k=>G.remove(k));rocks.length=0;for(let i=0;i<16;i++){const z=RZ0+12+i*5.6;const x=RX0+.8+Math.random()*(RX1-RX0-1.6);const k=new THREE.Mesh(new THREE.DodecahedronGeometry(.7+Math.random()*.35,0),RKM);k.position.set(x,.2,z);k.scale.y=.6;G.add(k);rocks.push(k)}
  let rx=(RX0+RX1)/2,rz=RZ0,dir=0,logs=8,done=false,last=performance.now(),auto=false,hitT=0;raft.position.set(rx,.04,rz);raft.children.forEach(c=>c.visible=true);
  window.__GCAM=()=>document.getElementById('ypP')?[rx,4.2,rz-7.5,rx,.4,rz+7,55]:null;
  const d=document.createElement('div');d.id='ypP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#16262e;border:3px solid #d8a840;border-radius:16px;padding:10px 14px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f0f4f4;box-shadow:0 6px 18px rgba(0,0,0,.35);width:290px;max-width:94vw;user-select:none;touch-action:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f8d070">🪵 뗏목 몰기</b><div data-i style="margin:5px 0;font:14px 'Do Hyeon',sans-serif"></div><div style="height:10px;background:#2a3a44;border-radius:5px;overflow:hidden"><div data-t style="height:100%;width:0;background:#d8a840"></div></div><div style="display:flex;gap:8px;margin-top:8px"><button data-l style="flex:1;font:24px 'Do Hyeon',sans-serif;background:#3a6a8a;color:#fff;border:0;border-radius:12px;padding:10px 0;cursor:pointer;touch-action:none">◀</button><button data-r style="flex:1;font:24px 'Do Hyeon',sans-serif;background:#3a6a8a;color:#fff;border:0;border-radius:12px;padding:10px 0;cursor:pointer;touch-action:none">▶</button></div><div data-m style="font-size:12px;color:#f8d070;margin-top:5px">누르고 있으면 옆으로 비켜요. 바위를 피해요!</div>`;
  /* 카메라가 남쪽(+z)을 보므로 화면 오른쪽은 -x */const hold=(el,v)=>{el.onpointerdown=e=>{e.preventDefault();dir=v};el.onpointerup=el.onpointerleave=el.onpointercancel=()=>{if(dir===v)dir=0}};hold(d.querySelector('[data-l]'),1);hold(d.querySelector('[data-r]'),-1);
  const kd=e=>{if(e.key==='ArrowLeft')dir=1;if(e.key==='ArrowRight')dir=-1},ku=e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight')dir=0};addEventListener('keydown',kd);addEventListener('keyup',ku);
  const iEl=d.querySelector('[data-i]'),tEl=d.querySelector('[data-t]'),mEl=d.querySelector('[data-m]');
  const snd=(f,len,type='sine')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const cleanup=()=>{removeEventListener('keydown',kd);removeEventListener('keyup',ku);rocks.forEach(k=>G.remove(k));rocks.length=0;raft.position.set((RX0+RX1)/2,.04,RZ1-2);raft.rotation.z=0;raft.children.forEach(c=>c.visible=true)};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.1,(now-last)/1000);last=now;
   if(auto){let tgt=rx;for(const k of rocks){if(k.visible&&k.position.z>rz-2.4&&k.position.z<rz+7&&Math.abs(k.position.x-rx)<2.2){tgt=k.position.x>(RX0+RX1)/2?k.position.x-2.6:k.position.x+2.6;break}}dir=Math.abs(tgt-rx)<.15?0:Math.sign(tgt-rx)}
   rx=Math.max(RX0+1.3,Math.min(RX1-1.3,rx+dir*4.5*dt));rz+=4*dt;hitT=Math.max(0,hitT-dt);raft.position.set(rx,.04+Math.sin(now/300)*.04,rz);raft.rotation.z=hitT>0?Math.sin(now/40)*.08:-dir*.05;
   for(const k of rocks){if(!k.visible)continue;if(Math.abs(k.position.z-rz)<1.9&&Math.abs(k.position.x-rx)<1.35+.6){k.visible=false;logs--;hitT=.5;snd(140,.25,'square');const lg=raft.children.filter(c=>c.geometry&&c.geometry.type==='CylinderGeometry'&&c.visible&&c.material===LOG);const off=lg[lg.length-1];if(off)off.visible=false;mEl.textContent='쿵! 통나무 하나가 풀려 떠내려갔어요';if(logs<=0){fin();return}}}
   iEl.textContent=`남은 통나무 ${logs} / 8 · 두물머리까지 ${Math.max(0,Math.round(RZ1-rz))}m`;tEl.style.width=Math.min(100,(rz-RZ0)/(RZ1-RZ0)*100)+'%';
   if(rz>=RZ1-2){fin();return}requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(Math.max(0,logs)/8*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('yangpyeong_raft',Q,'뗏목 몰기')}catch(e){}window.__YPQ=Q;snd(660,.2);snd(880,.3);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f8d070">${logs>0?`통나무 ${logs}개를 지켜 두물머리에 닿았어요`:'뗏목이 다 풀렸어요'}</b><div style="font-size:13px;margin:4px 0">옛 떼꾼들은 강원 산골 나무를 뗏목으로 엮어 북한강을 타고 한양까지 며칠씩 내려갔어요. 물살 센 여울과 바위를 넘는 위험한 일이라 품삯이 아주 많았대요.</div><div style="font-size:24px;color:#d8a840">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#d8a840;color:#16262e;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f0f4f4;border:2px solid #f0f4f4;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__YPRAFT()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__YPG={set auto(v){auto=v},get logs(){return logs},get done(){return done},get rz(){return rz}};try{ctx.say('바위를 피해 뗏목을 몰아요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'뗏목 엮던 칡 밧줄',h:'통나무를 묶던 칡넝쿨 밧줄 토막이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.TorusGeometry(.1,.025,6,14),M(0x8a7a50)))})},
  {n:'은행 열매',h:'용문사 은행나무 열매예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.06,8,6),M(0xd8c060)))})},
  {n:'막새 기와',h:'절집 지붕 끝 기와예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18),M(0x5a5a5a)))})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'떼꾼 품삯이었을 옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__YPDIG=()=>{window.__DETECT&&window.__DETECT({key:'yangpyeong_dig',title:'양평·가평 발굴 탐지',emoji:'⛏️',bg:'#16262e',count:4,TL:150,cand:[[40,-10],[60,-20],[30,-30],[20,-60],[70,-70],[80,-30],[25,-80],[60,0]],items:ITEMS,intro:'땅속에 나루터 사람들의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'양평·가평은 두 물이 만나고 뗏목이 지나던 고장이에요.'})};
 const meta={quest:{t:'양평·가평 둘러보기',d:'두물머리와 용문사 은행나무를 둘러보세요.',steps:[['두물머리','두물머리'],['은행나무','용문사 은행나무'],['대웅전','용문사 대웅전']]},
  title:'양평·가평 두물머리·용문사',hint:'용문사 은행나무(공개 3D)를 실제 높이 42m로, 두물머리와 뗏목길은 간추려 지었어요. 바위를 피해 뗏목을 몰아 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:20,z:-6,lines:['양평·가평','두물머리 · 황포돛배','용문사 은행나무 42m','간추려 지음']}},
  npc:[['science',[[14,-12],[26,-12],[26,-2],[14,-2]]]],bounds:[1.5,90,-90,8.5],level:()=>'양평',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#4a86a8';g.fillRect(X(-10),0,10*S,Z(22));g.fillRect(0,Z(10),300,12*S);g.fillStyle='#e8c030';g.beginPath();g.arc(X(GX),Z(GZ),8*S,0,7);g.fill();g.fillStyle='#9a3a26';g.fillRect(X(GX-1.5),Z(GZ-33.5),11*S,7*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:20,z:0,yaw:Math.PI},size:{}},meta)}
