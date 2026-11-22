/* 칠곡·구미·성주 마당(2026-11-22, W71): 칠곡 송림사 오층전탑과 탑에서 나온 관꾸미개(실측), 칠곡 가실성당, 성주 세종대왕자 태실, 구미 금오산 바위.
   실측: 「Cap Ornament」 국가유산청(KHS_Asset) 스케치팹 CC BY. 1959년 송림사 오층전탑 고칠 때 2층 몸돌 자리 돌함 안에서 나온 관꾸미개. 실측 높이 약 20.2cm 그대로.
   나머지는 공개 사진으로 간추려 지음.
   송림사 오층전탑(보물): 벽돌로 쌓은 탑. 지붕돌 대신 벽돌을 층층이 내어쌓고 들여쌓아 처마를 만들어요.
   성주 세종대왕자 태실(사적): 세종의 아들 열여덟과 손자(단종)의 태를 묻은 태실 열아홉이 한 언덕에 줄지어 있어요.
   칠곡 가실성당(국가등록문화유산): 1923년에 지은 붉은 벽돌 성당.
   놀이: 벽돌 내어쌓기(벽돌을 한 장씩 바깥으로 밀어 쌓아 처마를 내밀기. 위에 놓인 벽돌들의 무게중심이 아래 벽돌 위에 있어야 버텨요. 다섯 장으로 목표만큼 내밀기, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildChilgok(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1959);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x82a04c,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 const BRT=tex(128,128,(q,w,h)=>{q.fillStyle='#7a6a5a';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=8)for(let x=((y/8)%2)*12;x<w;x+=24){const v=100+(r()*40|0);q.fillStyle=`rgb(${v+20},${v},${v-15})`;q.fillRect(x+1,y+1,22,6)}},[1,1]);
 /* 송림사 오층전탑: 몸돌 + 내어쌓기·들여쌓기 처마(층층 계단) */const PX=-14,PZ=-26;{const bm=()=>{const t=BRT.clone();t.needsUpdate=true;return new THREE.MeshStandardMaterial({map:t,roughness:.95})};const g=new THREE.Group();g.position.set(PX,0,PZ);const base=new THREE.Mesh(new THREE.BoxGeometry(7.4,1.2,7.4),M(0xa8a296,{flatShading:true}));base.position.y=.6;g.add(base);let y=1.2;
  for(let k=0;k<5;k++){const w=4.4-k*.55,h=k?1.1:2.2;const tm=bm();tm.map.repeat.set(w/1.2,h/1.2);const bd=new THREE.Mesh(new THREE.BoxGeometry(w,h,w),tm);bd.position.y=y+h/2;g.add(bd);y+=h;for(let s=0;s<5;s++){const ww=w+.25*(s+1);const st=new THREE.Mesh(new THREE.BoxGeometry(ww,.13,ww),bm());st.position.y=y+.065;g.add(st);y+=.13}for(let s=0;s<4;s++){const ww=w+1.25-.3*(s+1);const st=new THREE.Mesh(new THREE.BoxGeometry(ww,.13,ww),bm());st.position.y=y+.065;g.add(st);y+=.13}}
  const sr=new THREE.Mesh(new THREE.CylinderGeometry(.06,.08,2.4,8),M(0x8a7a40,{metalness:.7,roughness:.4}));sr.position.y=y+1.2;g.add(sr);for(let k=0;k<5;k++){const ring=new THREE.Mesh(new THREE.TorusGeometry(.22-k*.025,.04,6,14),sr.material);ring.rotation.x=Math.PI/2;ring.position.y=y+.4+k*.32;g.add(ring)}G.add(g);g.traverse(e=>{if(e.isMesh){e.castShadow=true;cam.push(e)}});solids.push({x0:PX-3.7,x1:PX+3.7,y0:0,y1:y,z0:PZ-3.7,z1:PZ+3.7})}
 /* 관꾸미개 진열장(실측 20.2cm) */const VX=PX+9,VZ=PZ+6;{const ped=new THREE.Mesh(new THREE.BoxGeometry(.8,1,.8),M(0x4a3a2a));ped.position.set(VX,.5,VZ);G.add(ped);const gl=new THREE.Mesh(new THREE.BoxGeometry(.7,.6,.7),new THREE.MeshStandardMaterial({color:0xe8f4ff,transparent:true,opacity:.18,roughness:.05}));gl.position.set(VX,1.3,VZ);G.add(gl);solids.push({x0:VX-.4,x1:VX+.4,y0:0,y1:1.6,z0:VZ-.4,z1:VZ+.4});
  if(!mini){const L=new GLTFLoader();L.load(new URL('../models/chilgok/cap.glb',import.meta.url).href,m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh)e.castShadow=true});const b=new THREE.Box3().setFromObject(o);const c=b.getCenter(new THREE.Vector3());o.position.set(-c.x,-b.min.y,-c.z);const w=new THREE.Group();w.add(o);w.userData.noBatch=true;w.position.set(VX,1.01,VZ);G.add(w);window.__CGCAP=w},undefined,()=>{})}}
 /* 칠곡 가실성당: 붉은 벽돌 + 종탑 */const SX=30,SZ=-30;{const RB=tex(128,128,(q,w,h)=>{q.fillStyle='#9a4434';q.fillRect(0,0,w,h);q.strokeStyle='#d8c8b0';q.lineWidth=1.5;for(let y=0;y<h;y+=10){q.beginPath();q.moveTo(0,y);q.lineTo(w,y);q.stroke();for(let x=((y/10)%2)*12;x<w;x+=24){q.beginPath();q.moveTo(x,y);q.lineTo(x,y+10);q.stroke()}}},[4,2]);const rm=new THREE.MeshStandardMaterial({map:RB,roughness:.9});
  const nave=new THREE.Mesh(new THREE.BoxGeometry(8,6,16),rm);nave.position.set(SX,3,SZ);G.add(nave);cam.push(nave);const roof=new THREE.Mesh(new THREE.CylinderGeometry(4.6,4.6,16.4,3),M(0x3a3a40,{roughness:.6}));roof.rotation.x=-Math.PI/2;roof.scale.set(1,1,.4);roof.position.set(SX,6.92,SZ);G.add(roof);
  const tw=new THREE.Mesh(new THREE.BoxGeometry(3,11,3),rm);tw.position.set(SX,5.5,SZ+9);G.add(tw);const sp=new THREE.Mesh(new THREE.ConeGeometry(2.3,4,4),M(0x3a3a40));sp.rotation.y=Math.PI/4;sp.position.set(SX,13,SZ+9);G.add(sp);const cr=new THREE.Group();const cv=new THREE.Mesh(new THREE.BoxGeometry(.12,1.2,.12),M(0xd8c060,{metalness:.6}));cv.position.y=.6;cr.add(cv);const ch=new THREE.Mesh(new THREE.BoxGeometry(.6,.12,.12),cv.material);ch.position.y=.85;cr.add(ch);cr.position.set(SX,15,SZ+9);G.add(cr);
  const AW=tex(64,128,(q,w,h)=>{q.fillStyle='#d8c8b0';q.fillRect(0,0,w,h);q.fillStyle='#2a4a7a';q.beginPath();q.moveTo(8,h-6);q.lineTo(8,32);q.arc(w/2,32,w/2-8,Math.PI,0);q.lineTo(w-8,h-6);q.fill();q.fillStyle='#c84a3a';q.fillRect(14,50,14,20);q.fillStyle='#e8c040';q.fillRect(34,74,14,22)});for(const sx of[-4.01,4.01])for(let i=-2;i<=2;i++){const wn=new THREE.Mesh(new THREE.PlaneGeometry(1,2.2),new THREE.MeshStandardMaterial({map:AW}));wn.position.set(SX+sx,3.2,SZ+i*3);wn.rotation.y=sx>0?Math.PI/2:-Math.PI/2;G.add(wn)}const dr=new THREE.Mesh(new THREE.PlaneGeometry(1.4,2.6),M(0x4a2a1a));dr.position.set(SX,1.3,SZ+10.51);G.add(dr);
  solids.push({x0:SX-4,x1:SX+4,y0:0,y1:8,z0:SZ-8,z1:SZ+8},{x0:SX-1.5,x1:SX+1.5,y0:0,y1:15,z0:SZ+7.5,z1:SZ+10.5})}
 /* 성주 세종대왕자 태실: 언덕 위 열아홉 */const TX=-40,TZ=10;{const hill=new THREE.Mesh(new THREE.SphereGeometry(16,24,12,0,Math.PI*2,0,Math.PI/2),M(0x7a9848));hill.scale.y=.18;hill.position.set(TX,0,TZ);G.add(hill);const ST=M(0xb8b2a6,{flatShading:true});for(let i=0;i<19;i++){const row=i<10?0:1,col=row?i-10:i;const x=TX-9+col*2+(row?1:0),z=TZ-1.6+row*3.2;const g=new THREE.Group();g.position.set(x,2.7,z);const b=new THREE.Mesh(new THREE.BoxGeometry(1,.25,1),ST);b.position.y=.12;g.add(b);const lo=new THREE.Mesh(new THREE.CylinderGeometry(.42,.5,.3,8),ST);lo.position.y=.4;g.add(lo);const bd=new THREE.Mesh(new THREE.SphereGeometry(.38,10,8),ST);bd.scale.y=.9;bd.position.y=.85;g.add(bd);const cp=new THREE.Mesh(new THREE.CylinderGeometry(.1,.48,.3,8),ST);cp.position.y=1.28;g.add(cp);const jw=new THREE.Mesh(new THREE.SphereGeometry(.1,8,6),ST);jw.position.y=1.5;g.add(jw);G.add(g)}solids.push({cx:TX,cz:TZ,r:12,y0:0,y1:2.6})}
 /* 구미 금오산 바위(뒤) */{const RK=M(0x8a8478,{flatShading:true});for(let i=0;i<7;i++){const h=12+r()*14;const m=new THREE.Mesh(new THREE.DodecahedronGeometry(5,0),RK);m.scale.set(1,h/8,1);m.position.set(-60+i*8,h*.35,-62-r()*6);G.add(m)}}
 /* 내어쌓기 연습대: 벽돌 기단(가장자리 x=EX) */const EX=4,EZ=-14,EY=1.6,BL=.6,BH=.12,BD=.3;{const st=new THREE.Mesh(new THREE.BoxGeometry(2.4,EY,1.2),new THREE.MeshStandardMaterial({map:BRT,roughness:.95}));st.position.set(EX-1.2,EY/2,EZ);G.add(st);solids.push({x0:EX-2.4,x1:EX,y0:0,y1:EY,z0:EZ-.6,z1:EZ+.6});const ln=new THREE.Mesh(new THREE.BoxGeometry(.02,.002,1.25),M(0xf8d040,{emissive:0x806000,emissiveIntensity:.5}));ln.position.set(EX,EY+.002,EZ);G.add(ln)}
 const tgt=new THREE.Mesh(new THREE.BoxGeometry(.015,1.4,.015),M(0xe84030,{emissive:0x801000,emissiveIntensity:.6}));tgt.visible=false;G.add(tgt);
 const NL=[];if(!mini){for(const[x,y,z]of[[PX,4,PZ+8],[SX,4,SZ+13],[TX,5,TZ+6]]){const L=new THREE.PointLight(0xffc080,0,26,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8)};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(PX,PZ+6,3,'칠곡 송림사 오층전탑','벽돌로 쌓은 다섯 층 탑이에요(보물). 지붕은 벽돌을 층층이 내어쌓고 들여쌓아 만들어요. 간추려 지었어요.');
 sp(VX,VZ+1.6,1.8,'송림사 관꾸미개','1959년 이 탑을 고칠 때 2층 몸돌 자리 돌함에서 나온 관꾸미개예요. 나뭇가지 끝마다 보주 모양이 달리고 작은 달개 이백여 개가 달렸어요. 국가유산청 실측 3D를 실제 크기(높이 약 20cm)로 놓았어요.');
 sp(EX+1.6,EZ+1.6,2,'내어쌓기 연습대','벽돌을 한 장씩 바깥으로 밀어 쌓아 처마를 내밀어 봐요.');
 sp(SX,SZ+13,3,'칠곡 가실성당','1923년에 지은 붉은 벽돌 성당이에요(국가등록문화유산). 간추려 지었어요.');
 sp(TX,TZ+8,5.5,'성주 세종대왕자 태실','세종의 아들 열여덟과 손자 단종의 태를 묻은 태실 열아홉이 한 언덕에 줄지어 있어요(사적). 간추려 지었어요.');
 sp(-60,40,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 벽돌 내어쌓기(11/22): 벽돌 다섯 장. 「밀기」를 누르는 동안 새 벽돌이 바깥으로 미끄러져요. 손을 떼면 놓여요.
    버티는 조건: 어느 벽돌이든 그 위에 얹힌 벽돌들(자기 포함)의 무게중심이 바로 아래 벽돌(맨 아래는 기단) 위에 있어야 해요. 세 판, 목표 0.6·0.8·0.95장 */
 window.__CGBRICK=()=>{if(document.getElementById('cgP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(EX+1.8,EZ+1.8,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('cgP')?[EX+.15,EY+.5,EZ+3.2,EX+.15,EY+.3,EZ,42]:null;
  const TG=[.6,.8,.95],NB=5;let rd=0,xs=[],cur=null,cx=0,push=false,done=false,auto=false,last=performance.now(),msg='',wait=0,fall=null;const res=[];const meshes=[];
  const bm=new THREE.MeshStandardMaterial({color:0x9a7a5a,roughness:.95}),bm2=new THREE.MeshStandardMaterial({color:0x7a5a40,roughness:.95});
  const clear=()=>{meshes.forEach(m=>G.remove(m));meshes.length=0};
  const newRound=()=>{clear();xs=[];newBrick();tgt.visible=true;tgt.position.set(EX+TG[rd]*BL,EY+.7,EZ);msg=`${rd+1}판: 빨간 선(${TG[rd]}장)까지 내밀어요`};
  const newBrick=()=>{const below=xs.length?xs[xs.length-1]:0;cx=below;cur=new THREE.Mesh(new THREE.BoxGeometry(BL,BH,BD),xs.length%2?bm2:bm);cur.castShadow=true;G.add(cur);meshes.push(cur);place(cur,cx,xs.length)};
  const place=(m,x,i)=>{m.position.set(EX+(x-.5)*BL,EY+BH/2+i*BH,EZ);m.rotation.set(0,0,0)};
  /* 무너지는 가장 아래 칸 k 찾기(-1이면 버팀) */const check=a=>{for(let k=0;k<a.length;k++){let s=0;for(let j=k;j<a.length;j++)s+=a[j]-.5;const c=s/(a.length-k);const R=k?a[k-1]:0,Lf=k?a[k-1]-1:-1e9;if(c>R+1e-9||c<Lf)return k}return -1};
  const d=document.createElement('div');d.id='cgP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#2a221c;border:3px solid #c89a6a;border-radius:16px;padding:10px 14px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f4f0e4;box-shadow:0 6px 18px rgba(0,0,0,.35);width:300px;max-width:94vw;user-select:none;touch-action:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🧱 벽돌 내어쌓기</b><div data-i style="margin:3px 0;font:14px 'Do Hyeon',sans-serif"></div><button data-p style="width:100%;margin-top:6px;font:18px 'Do Hyeon',sans-serif;background:#8a5a3a;color:#fff;border:0;border-radius:14px;padding:12px 0;cursor:pointer;touch-action:none">누르는 동안 바깥으로 밀기</button><div data-m style="font-size:12px;color:#f8e8a0;margin-top:5px"></div>`;
  const iEl=d.querySelector('[data-i]'),mEl=d.querySelector('[data-m]'),pb=d.querySelector('[data-p]');
  const snd=(f,len,type='sine',v=.05)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(v,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const drop=()=>{if(!cur||fall||wait>0)return;xs.push(cx);cur=null;snd(300,.08,'square',.03);const k=check(xs);
   if(k>=0){const piv=new THREE.Vector3(EX+(k?xs[k-1]:0)*BL,EY+k*BH,EZ);fall={k,piv,a:0,v:0,ms:meshes.slice(k),p0:meshes.slice(k).map(m=>m.position.clone())};msg='와르르! 위 벽돌들의 무게중심이 받침 밖으로 나갔어요';snd(150,.5,'sawtooth',.04);return}
   const tip=xs.reduce((a,b)=>Math.max(a,b),0);if(tip>=TG[rd]-1e-6){res.push(1);msg=`성공! ${tip.toFixed(2)}장 내밀었어요`;snd(780,.3);wait=1.8;return}
   if(xs.length>=NB){res.push(Math.max(0,tip/TG[rd]*.6));msg=`벽돌을 다 썼어요. ${tip.toFixed(2)}장`;wait=1.8;return}newBrick()};
  pb.onpointerdown=e=>{e.preventDefault();if(cur&&!fall&&wait<=0)push=true};pb.onpointerup=pb.onpointerleave=pb.onpointercancel=()=>{if(push){push=false;drop()}};
  const kd=e=>{if(e.code==='Space'&&!e.repeat){e.preventDefault();if(cur&&!fall&&wait<=0)push=true}},ku=e=>{if(e.code==='Space'&&push){push=false;drop()}};addEventListener('keydown',kd);addEventListener('keyup',ku);
  const cleanup=()=>{removeEventListener('keydown',kd);removeEventListener('keyup',ku);clear();tgt.visible=false};
  newRound();
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(fall){fall.v+=dt*6;fall.a=Math.min(1.6,fall.a+fall.v*dt);const q=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),-fall.a);fall.ms.forEach((m,i)=>{const p=fall.p0[i].clone().sub(fall.piv).applyQuaternion(q).add(fall.piv);m.position.copy(p);m.quaternion.copy(q)});if(fall.a>=1.6){fall=null;res.push(0);wait=1.6}}
   else if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=TG.length){fin();return}newRound()}}
   else if(cur){if(auto){const n=NB,i=xs.length;const want=(xs.length?xs[i-1]:0)+.9/(2*(n-i));if(!push&&cx<want-.001)push=true;if(push&&cx>=want){push=false;drop()}}
    if(push){cx+=dt*.22;place(cur,cx,xs.length)}}
   const tip=Math.max(xs.length?Math.max(...xs):0,cur?cx:0);iEl.textContent=`${rd+1} / 3판 · 벽돌 ${Math.min(NB,xs.length+(cur?1:0))}/${NB}장 · 내민 길이 ${tip.toFixed(2)}장 (목표 ${TG[Math.min(rd,2)]})`;mEl.textContent=msg;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/TG.length*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('chilgok_brick',Q,'벽돌 내어쌓기')}catch(e){}window.__CGQ=Q;snd(660,.4);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">처마를 다 내밀었어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">벽돌탑 처마는 아래는 조금, 위로 갈수록 많이 내밀어야 오래 버텨요. 다섯 장이면 이론으로 벽돌 한 장 길이보다 조금 더(약 1.14장) 내밀 수 있어요. 송림사 오층전탑도 이렇게 내어쌓고 들여쌓아 처마를 만들었어요.</div><div style="font-size:24px;color:#c89a6a">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c89a6a;color:#2a221c;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4f0e4;border:2px solid #f4f0e4;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__CGBRICK()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__CGG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},check};try{ctx.say('조금씩 내밀어 봐요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'전돌 조각',h:'전탑을 쌓던 벽돌 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.05,.1),M(0x7a6a5a)))})},
  {n:'달개 장식',h:'관꾸미개에 달던 작고 둥근 달개예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.005,14),M(0xc8a040,{metalness:.8,roughness:.3})))})},
  {n:'태항아리 뚜껑',h:'태를 담던 백자 항아리 뚜껑이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.1,12,6,0,Math.PI*2,0,Math.PI/2),M(0xf0ece0,{roughness:.3})))})},
  {n:'사리병 조각',h:'푸른 유리 사리병 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.05,10,8),M(0x4a8aa8,{roughness:.1,transparent:true,opacity:.8})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__CGDIG=()=>{window.__DETECT&&window.__DETECT({key:'chilgok_dig',title:'칠곡·구미·성주 발굴 탐지',emoji:'⛏️',bg:'#2a221c',count:4,TL:150,cand:[[-60,40],[-20,30],[10,30],[50,10],[-70,-20],[60,40],[20,-50],[-30,-50]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'칠곡·구미·성주는 벽돌탑과 태실, 성당의 고장이에요.'})};
 const meta={quest:{t:'칠곡·구미·성주 둘러보기',d:'송림사 전탑과 관꾸미개, 가실성당, 세종대왕자 태실을 둘러보세요.',steps:[['송림사','칠곡 송림사 오층전탑'],['관꾸미개','송림사 관꾸미개'],['가실성당','칠곡 가실성당'],['태실','성주 세종대왕자 태실']]},
  title:'칠곡·구미·성주 송림사 전탑·태실',hint:'송림사 관꾸미개는 국가유산청 실측 3D를 실제 크기로, 나머지는 공개 사진으로 간추려 지었어요. 벽돌을 내어쌓아 처마를 내밀어 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:14,lines:['칠곡·구미·성주','송림사 오층전탑 · 관꾸미개(실측)','가실성당 · 세종대왕자 태실','간추려 지음']}},
  npc:[['science',[[-8,6],[8,6],[8,20],[-8,20]]]],bounds:[-90,80,-80,60],level:()=>'칠곡',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016);if(window.__CGCAP)window.__CGCAP.rotation.y+=(dt||.016)*.4}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#82a04c';g.fillRect(0,0,300,300);g.fillStyle='#7a6a5a';g.fillRect(X(PX-3.7),Z(PZ-3.7),7.4*S,7.4*S);g.fillStyle='#9a4434';g.fillRect(X(SX-4),Z(SZ-8),8*S,16*S);g.fillStyle='#7a9848';g.beginPath();g.arc(X(TX),Z(TZ),16*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:16,yaw:Math.PI},size:{}},meta)}
