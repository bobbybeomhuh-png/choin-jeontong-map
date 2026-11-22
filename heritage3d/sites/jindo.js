/* 진도·목포·무안 마당(2026-11-22, W69): 진도 강강술래 마당(보름달)·진돗개, 목포 옛 일본영사관(붉은 벽돌 근대 건물)·유달산 바위, 무안 백련지.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음.
   강강술래(국가무형유산·유네스코 인류무형유산): 한가위 보름달 아래 여인들이 손을 잡고 둥글게 돌며 부르는 노래와 춤. 진도·해남 등 전남 바닷가에서 이어져 와요.
   그 사이에 하는 놀이 「청어 엮기·청어 풀기」: 줄 끝 사람이 팔 사이(문)를 차례로 빠져나가며 줄을 엮고, 엮은 차례를 거꾸로 되짚어 풀어요.
   목포 옛 일본영사관(1900, 사적): 붉은 벽돌 2층 근대 건물, 지금은 목포근대역사관.
   놀이: 청어 엮기·풀기(엮는 차례를 보고 거꾸로 짚어 풀기, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildJindo(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(815);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x8aa050,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 보름달(늘 하늘에) */const moon=new THREE.Mesh(new THREE.SphereGeometry(9,24,16),new THREE.MeshBasicMaterial({color:0xfff4d0,fog:false}));moon.position.set(-60,70,-160);G.add(moon);
 /* 강강술래 마당: 모래 마당 + 춤추는 이(줄) */const KX=0,KZ=-18;{const sand=new THREE.Mesh(new THREE.CircleGeometry(13,40),M(0xd8c8a0));sand.rotation.x=-Math.PI/2;sand.position.set(KX,.02,KZ);G.add(sand)}
 const CHIMA=[0x2a4a8a,0xb83a4a,0x3a7a5a,0x8a3a8a,0x2a6a8a,0xc85a2a,0x4a5a9a,0x9a2a3a];const N=8;const dancers=[];
 for(let i=0;i<N;i++){const g=new THREE.Group();const sk=new THREE.Mesh(new THREE.ConeGeometry(.42,1.1,12),M(CHIMA[i]));sk.position.y=.55;g.add(sk);const jg=new THREE.Mesh(new THREE.CylinderGeometry(.2,.26,.42,10),M(0xf4f0e4));jg.position.y=1.28;g.add(jg);const hd=new THREE.Mesh(new THREE.SphereGeometry(.17,12,10),M(0xe0b890));hd.position.y=1.66;g.add(hd);const hr=new THREE.Mesh(new THREE.SphereGeometry(.175,12,8,0,Math.PI*2,0,Math.PI/2),M(0x1a1410));hr.position.y=1.68;g.add(hr);
  const armL=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.55,6),M(0xf4f0e4));armL.geometry.translate(0,-.27,0);armL.position.set(0,1.45,-.24);g.add(armL);const armR=armL.clone();armR.position.z=.24;g.add(armR);g.userData={armL,armR};G.add(g);dancers.push(g)}
 const lineX=i=>KX-7+i*2;const home=()=>dancers.forEach((g,i)=>{g.position.set(lineX(i),0,KZ);g.rotation.y=Math.PI/2;g.userData.armL.rotation.x=0;g.userData.armR.rotation.x=0});home();
 /* 손 잡은 팔 사이 문(번호) */const gateLbl=[];for(let k=0;k<N-1;k++){const LT=tex(64,64,(q,w,h)=>{q.fillStyle='#f8e8a0';q.beginPath();q.arc(32,32,28,0,7);q.fill();q.fillStyle='#2a2418';q.font='bold 40px sans-serif';q.textAlign='center';q.fillText(String(k+1),32,46)});const s=new THREE.Sprite(new THREE.SpriteMaterial({map:LT,depthTest:false}));s.scale.set(.55,.55,1);s.position.set(lineX(k)+1,2.5,KZ);s.visible=false;G.add(s);gateLbl.push(s)}
 const trail=new THREE.Line(new THREE.BufferGeometry(),new THREE.LineBasicMaterial({color:0xf8d040}));trail.visible=false;G.add(trail);
 /* 진돗개(간추린 모양) */{const W=M(0xe8dcc0);const g=new THREE.Group();g.position.set(KX+16,0,KZ+4);const b=new THREE.Mesh(new THREE.CapsuleGeometry(.22,.6,4,8),W);b.rotation.z=Math.PI/2;b.position.y=.55;g.add(b);for(const[x,z]of[[-.3,-.12],[-.3,.12],[.3,-.12],[.3,.12]]){const l=new THREE.Mesh(new THREE.CylinderGeometry(.06,.05,.42,6),W);l.position.set(x,.21,z);g.add(l)}const h=new THREE.Mesh(new THREE.SphereGeometry(.2,10,8),W);h.position.set(.55,.85,0);g.add(h);const sn=new THREE.Mesh(new THREE.ConeGeometry(.09,.22,8),W);sn.rotation.z=-Math.PI/2;sn.position.set(.75,.8,0);g.add(sn);for(const z of[-.09,.09]){const e=new THREE.Mesh(new THREE.ConeGeometry(.06,.16,4),W);e.position.set(.5,1.06,z);g.add(e)}const t=new THREE.Mesh(new THREE.TorusGeometry(.13,.04,6,10,Math.PI*1.4),W);t.position.set(-.45,.85,0);g.add(t);G.add(g);g.rotation.y=-.6}
 /* 목포 옛 일본영사관: 붉은 벽돌 2층 */const MX=-38,MZ=-40;{const BR=tex(256,256,(q,w,h)=>{q.fillStyle='#9a4030';q.fillRect(0,0,w,h);q.strokeStyle='#c8b8a0';q.lineWidth=2;for(let y=0;y<h;y+=16){q.beginPath();q.moveTo(0,y);q.lineTo(w,y);q.stroke();for(let x=((y/16)%2)*16;x<w;x+=32){q.beginPath();q.moveTo(x,y);q.lineTo(x,y+16);q.stroke()}}},[3,2]);const bm=new THREE.MeshStandardMaterial({map:BR,roughness:.9});
  const body=new THREE.Mesh(new THREE.BoxGeometry(14,7.5,9),bm);body.position.set(MX,3.75,MZ);G.add(body);cam.push(body);const band=new THREE.Mesh(new THREE.BoxGeometry(14.3,.3,9.3),M(0xe8e0cc));band.position.set(MX,3.7,MZ);G.add(band);const crn=new THREE.Mesh(new THREE.BoxGeometry(14.4,.35,9.4),M(0xe8e0cc));crn.position.set(MX,7.6,MZ);G.add(crn);
  const rm=M(0x3a3e48,{roughness:.6});const rf=new THREE.Mesh(new THREE.ConeGeometry(9.6,3.2,4),rm);rf.rotation.y=Math.PI/4;rf.scale.set(1.05,1,.68);rf.position.set(MX,9.4,MZ);G.add(rf);
  const WT=tex(64,128,(q,w,h)=>{q.fillStyle='#e8e0cc';q.fillRect(0,0,w,h);q.fillStyle='#2a3a48';q.fillRect(8,14,w-16,h-22);q.strokeStyle='#e8e0cc';q.lineWidth=4;q.beginPath();q.moveTo(w/2,14);q.lineTo(w/2,h);q.moveTo(8,h*.45);q.lineTo(w-8,h*.45);q.stroke();q.fillStyle='#e8e0cc';q.beginPath();q.arc(w/2,16,w/2-8,Math.PI,0);q.fill()});const wmat=new THREE.MeshStandardMaterial({map:WT});
  for(const y of[2,5.6])for(let i=-2;i<=2;i++){if(y<3&&i===0)continue;const w=new THREE.Mesh(new THREE.PlaneGeometry(1.1,2),wmat);w.position.set(MX+i*2.6,y,MZ+4.51);G.add(w)}const por=new THREE.Mesh(new THREE.BoxGeometry(3,3.2,1.6),bm);por.position.set(MX,1.6,MZ+5.2);G.add(por);const dr=new THREE.Mesh(new THREE.PlaneGeometry(1.4,2.4),M(0x3a2418));dr.position.set(MX,1.2,MZ+6.01);G.add(dr);for(let k=0;k<4;k++){const st=new THREE.Mesh(new THREE.BoxGeometry(3.6,.18,.4),M(0xb8b0a0));st.position.set(MX,.09+k*.18,MZ+7.2-k*.35);G.add(st)}
  solids.push({x0:MX-7,x1:MX+7,y0:0,y1:9,z0:MZ-4.5,z1:MZ+6})}
 /* 유달산 바위 봉우리(뒤) */{const RK=M(0x8a8478,{flatShading:true});for(let i=0;i<6;i++){const h=6+r()*8;const m=new THREE.Mesh(new THREE.DodecahedronGeometry(3+r()*2,0),RK);m.scale.y=h/5;m.position.set(MX-10+i*5,h*.4,MZ-22-r()*8);G.add(m)}}
 /* 무안 백련지: 연못 + 흰 연꽃 */const LX=40,LZ=-34;{const pond=new THREE.Mesh(new THREE.CircleGeometry(14,40),M(0x4a7a7a,{roughness:.15,metalness:.1}));pond.rotation.x=-Math.PI/2;pond.position.set(LX,.04,LZ);G.add(pond);solids.push({cx:LX,cz:LZ,r:13.6,y0:-1,y1:2});const LF=M(0x4a8a3a,{side:THREE.DoubleSide});const PW=M(0xfaf8f0),PC=M(0xf0d060);for(let i=0;i<70;i++){const a=r()*Math.PI*2,d=Math.sqrt(r())*12.5;const x=LX+Math.cos(a)*d,z=LZ+Math.sin(a)*d;const lf=new THREE.Mesh(new THREE.CircleGeometry(.55+r()*.3,12),LF);lf.rotation.x=-Math.PI/2;lf.position.set(x,.08+r()*.3,z);G.add(lf);if(i%3===0){const f=new THREE.Group();f.position.set(x+.2,.6,z);for(let k=0;k<8;k++){const p=new THREE.Mesh(new THREE.SphereGeometry(.16,8,6),PW);p.scale.set(.5,1,.3);const aa=k/8*Math.PI*2;p.position.set(Math.cos(aa)*.13,.1,Math.sin(aa)*.13);p.rotation.set(Math.sin(aa)*.5,0,-Math.cos(aa)*.5);f.add(p)}const c=new THREE.Mesh(new THREE.CylinderGeometry(.07,.05,.06,8),PC);c.position.y=.12;f.add(c);G.add(f)}}}
 const NL=[];if(!mini){for(const[x,y,z]of[[KX,5,KZ+6],[MX,4,MZ+9],[LX,3,LZ+15]]){const L=new THREE.PointLight(0xffc080,0,28,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 const moonL=new THREE.PointLight(0xdde6ff,0,40,1.2);moonL.position.set(KX,12,KZ);G.add(moonL);
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8);moonL.intensity=nk*10};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(KX,KZ+8,3.2,'진도 강강술래 마당','한가위 보름달 아래 여인들이 손을 잡고 둥글게 돌며 부르던 노래와 춤이에요(국가무형유산, 유네스코 인류무형유산). 간추려 지었어요.');
 sp(KX+11,KZ+9,2,'청어 엮는 자리','줄 끝 사람이 팔 사이 문을 빠져나가는 차례를 보고, 거꾸로 짚어 풀어 봐요.');
 sp(KX+16,KZ+7,2.4,'진돗개','진도에서 기르던 우리 토종개예요(천연기념물). 간추려 지었어요.');
 sp(MX,MZ+10,3.2,'목포 옛 일본영사관','1900년에 지은 붉은 벽돌 2층 건물이에요(사적). 지금은 목포근대역사관이에요. 뒤로 유달산 바위 봉우리가 보여요. 간추려 지었어요.');
 sp(LX,LZ+16,3,'무안 백련지','흰 연꽃이 가득 피는 큰 연못이에요. 간추려 지었어요.');
 sp(-50,30,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 청어 엮기·풀기(11/22): 엮기 때 줄 끝 사람(0번)이 문 몇 개를 차례로 빠져나가요(노란 실이 남아요). 실이 사라지면, 풀기는 거꾸로 짚어야 해요. 세 판(문 3·4·5개) */
 let anim=null;
 window.__JDWEAVE=()=>{if(document.getElementById('jdP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(KX+11,KZ+9,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('jdP')?[KX,12,KZ+21,KX,.6,KZ,58]:null;
  home();gateLbl.forEach(s=>s.visible=true);let rd=0,seq=[],input=[],phase='show',done=false,auto=false,last=performance.now(),msg='',t=0;const res=[];const lead=dancers[0];
  const path=[];const setTrail=()=>{trail.geometry.dispose();trail.geometry=new THREE.BufferGeometry().setFromPoints(path.length?path:[new THREE.Vector3()]);trail.visible=path.length>1};
  const gateP=k=>new THREE.Vector3(lineX(k)+1,.6,KZ);
  const newRound=()=>{const L=3+rd;const pool=[0,1,2,3,4,5,6];seq=[];while(seq.length<L){const k=pool.splice(Math.floor(Math.random()*pool.length),1)[0];seq.push(k)}input=[];path.length=0;phase='show';t=0;home();setTrail();msg=`${rd+1}판: 엮는 차례를 잘 봐요`;
   anim={pts:[new THREE.Vector3(lineX(0),0,KZ+1.4)].concat(seq.flatMap((k,j)=>[new THREE.Vector3(lineX(k)+1,0,KZ+(j%2?-1.4:1.4)),new THREE.Vector3(lineX(k)+1,0,KZ+(j%2?1.4:-1.4))])),i:0,f:0,spd:2.6}};
  const d=document.createElement('div');d.id='jdP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#1a2238;border:3px solid #f8e8a0;border-radius:16px;padding:10px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f4f0e4;box-shadow:0 6px 18px rgba(0,0,0,.35);width:310px;max-width:94vw;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🌕 청어 엮기·풀기</b><div data-i style="margin:3px 0;font:14px 'Do Hyeon',sans-serif"></div><div data-g style="display:flex;gap:4px;justify-content:center;margin-top:6px">${[1,2,3,4,5,6,7].map(n=>`<button data-k="${n-1}" style="width:36px;height:40px;font:18px 'Do Hyeon',sans-serif;background:#f8e8a0;color:#1a2238;border:0;border-radius:10px;cursor:pointer">${n}</button>`).join('')}</div><div data-m style="font-size:12px;color:#f8e8a0;margin-top:6px"></div>`;
  const iEl=d.querySelector('[data-i]'),mEl=d.querySelector('[data-m]');
  const snd=(f,len,type='sine',v=.05)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(v,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const NOTE=[392,440,523,587,659,784,880];
  const pick=k=>{if(done||phase!=='undo')return;input.push(k);const want=seq[seq.length-input.length];snd(NOTE[k],.25,'triangle');const g=gateP(k);path.push(new THREE.Vector3(g.x,.6,g.z+(input.length%2?1.2:-1.2)));setTrail();
   if(k!==want){res.push((input.length-1)/seq.length);msg=`앗, ${want+1}번 문이었어요. 차례: ${seq.map(x=>x+1).join('→')} 이니 거꾸로 ${seq.slice().reverse().map(x=>x+1).join('→')}`;phase='wait';t=0;snd(220,.4,'sawtooth',.03)}
   else if(input.length===seq.length){res.push(1);msg='줄이 다 풀렸어요! 다시 둥글게 돌아요';phase='wait';t=0;snd(784,.3)}};
  d.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>pick(+b.dataset.k));
  const kd=e=>{const n=+e.key;if(n>=1&&n<=7){pick(n-1)}};addEventListener('keydown',kd);
  const cleanup=()=>{removeEventListener('keydown',kd);gateLbl.forEach(s=>s.visible=false);trail.visible=false;anim=null;home()};
  newRound();
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;
   /* 춤추는 이들 살짝 흔들기 + 팔 올리기(문) */dancers.forEach((g,i)=>{if(i===0&&phase==='show')return;g.position.y=Math.abs(Math.sin(now/300+i))*.05;g.userData.armL.rotation.x=2.2;g.userData.armR.rotation.x=-2.2});
   if(phase==='show'&&anim){const a=anim;if(a.i<a.pts.length-1){const p0=a.pts[a.i],p1=a.pts[a.i+1];const L=p0.distanceTo(p1)||1;a.f+=dt*a.spd/L;if(a.f>=1){a.f=0;a.i++;if(a.i%2===0&&a.i>0)snd(NOTE[seq[(a.i-2)/2]],.2,'triangle',.04)}const q=p0.clone().lerp(p1,Math.min(1,a.f));lead.position.set(q.x,0,q.z);lead.rotation.y=Math.atan2(p1.x-p0.x,p1.z-p0.z)+Math.PI/2;path.push(new THREE.Vector3(q.x,.6,q.z));if(path.length>400)path.shift();setTrail()}if(a.i>=a.pts.length-1){if(!a.endT)a.endT=now;if(now-a.endT>900){phase='undo';path.length=0;setTrail();anim=null;msg='이제 거꾸로 짚어 풀어요(마지막 문부터)'}}}
   if(phase==='undo'&&auto&&t>.6){t=0;pick(seq[seq.length-1-input.length])}
   if(phase==='wait'&&t>1.8){rd++;if(rd>=3){fin();return}newRound()}
   iEl.textContent=`${Math.min(rd+1,3)} / 3판 · 문 ${seq.length}개 · ${phase==='show'?'보는 중':phase==='undo'?`풀기 ${input.length}/${seq.length}`:''}`;mEl.textContent=msg;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('jindo_weave',Q,'청어 엮기·풀기')}catch(e){}window.__JDQ=Q;snd(660,.4);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">청어를 다 풀었어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">강강술래는 둥글게 돌다가 「청어 엮기·풀기」, 「기와 밟기」, 「고사리 꺾기」 같은 놀이를 섞어 해요. 엮은 차례를 거꾸로 되짚어야 줄이 풀리지요.</div><div style="font-size:24px;color:#f8e8a0">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#f8e8a0;color:#1a2238;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4f0e4;border:2px solid #f4f0e4;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__JDWEAVE()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__JDG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('강강술래~ 차례를 잘 봐요!',2)}catch(e){}};
 /* 평소: 둥글게 천천히 돌기 */let ring=0;const idle=dt=>{if(document.getElementById('jdP'))return;ring+=dt*.25;dancers.forEach((g,i)=>{const a=ring+i/N*Math.PI*2;g.position.set(KX+Math.cos(a)*4,Math.abs(Math.sin(ring*6+i))*.05,KZ+Math.sin(a)*4);g.rotation.y=-a;g.userData.armL.rotation.x=.5;g.userData.armR.rotation.x=-.5})};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'꽹과리 조각',h:'놋쇠로 만든 꽹과리 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,.03,20),M(0xb89a50,{metalness:.8,roughness:.3})))})},
  {n:'근대 벽돌',h:'목포 근대 건물에 쓰던 붉은 벽돌이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.22,.07,.1),M(0x9a4030)))})},
  {n:'옛 우표',h:'근대 우편에 쓰던 우표예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.1,.005,.12),M(0xc8a040)))})},
  {n:'분청 대접',h:'조선 분청사기 대접 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.1,.08,18),M(0xb8b0a0,{roughness:.4})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__JDDIG=()=>{window.__DETECT&&window.__DETECT({key:'jindo_dig',title:'진도·목포·무안 발굴 탐지',emoji:'⛏️',bg:'#1a2238',count:4,TL:150,cand:[[-50,30],[-60,0],[20,20],[60,10],[-20,40],[70,-60],[0,40],[-70,-60]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'진도·목포·무안은 강강술래와 근대 항구, 연꽃의 고장이에요.'})};
 const meta={quest:{t:'진도·목포·무안 둘러보기',d:'강강술래 마당과 옛 영사관, 백련지를 둘러보세요.',steps:[['강강술래','진도 강강술래 마당'],['영사관','목포 옛 일본영사관'],['백련지','무안 백련지']]},
  title:'진도·목포·무안 강강술래·근대 항구·백련지',hint:'강강술래 마당·목포 옛 일본영사관·백련지를 공개 사진으로 간추려 지었어요. 청어 엮기를 보고 거꾸로 풀어 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:12,lines:['진도·목포·무안','강강술래 · 진돗개','옛 일본영사관 · 백련지','간추려 지음']}},
  npc:[['science',[[-10,6],[8,6],[8,20],[-10,20]]]],bounds:[-90,80,-80,60],level:()=>'진도',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016);idle(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#8aa050';g.fillRect(0,0,300,300);g.fillStyle='#d8c8a0';g.beginPath();g.arc(X(KX),Z(KZ),13*S,0,7);g.fill();g.fillStyle='#9a4030';g.fillRect(X(MX-7),Z(MZ-4.5),14*S,9*S);g.fillStyle='#4a7a7a';g.beginPath();g.arc(X(LX),Z(LZ),14*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:14,yaw:Math.PI},size:{}},meta)}
