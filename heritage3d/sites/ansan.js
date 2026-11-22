/* 안산·시흥 마당(2026-11-22, W78): 오이도 빨간 등대·선사 조개무지, 시흥 갯골(구불구불 갯고랑)·옛 소금 창고, 대부도 갯벌.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음.
   오이도 패총(사적): 신석기 사람들이 조개를 먹고 버린 조개무지가 섬 곳곳에 있어요. 빨간 등대는 오이도의 상징.
   시흥 갯골: 바닷물이 드나드는 내륙 깊은 갯고랑. 옛 소래 염전 소금 창고가 남아 있어요.
   놀이: 등대 불빛 읽기(밤바다에서 등대마다 다른 빛깔·깜빡임 수·주기를 보고 어느 등대인지 알아맞히기. 놀이 속 등대 불빛 규칙은 간추려 지은 것, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildAnsan(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1463);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,120),new THREE.MeshStandardMaterial({map:GT,color:0x8aa050,roughness:1}));gr.rotation.x=-Math.PI/2;gr.position.z=40;gr.receiveShadow=true;G.add(gr)}
 /* 갯벌 + 바다(북쪽 -z) */const SZ=-20;{const mud=new THREE.Mesh(new THREE.PlaneGeometry(220,30),M(0x7a6a58,{roughness:.6}));mud.rotation.x=-Math.PI/2;mud.position.set(0,.01,SZ-15);G.add(mud);const sea=new THREE.Mesh(new THREE.PlaneGeometry(400,300),M(0x3a5a7a,{roughness:.2,metalness:.1}));sea.rotation.x=-Math.PI/2;sea.position.set(0,.02,SZ-30-150);G.add(sea);solids.push({x0:-200,x1:200,y0:-1,y1:3,z0:-400,z1:SZ-30})
  /* 갯골: 구불구불한 물길 */const pts=[];for(let i=0;i<=40;i++){const t=i/40;pts.push(new THREE.Vector3(-40+t*80,.03,SZ-28+t*26+Math.sin(t*12)*4))}const crv=new THREE.CatmullRomCurve3(pts);const tube=new THREE.Mesh(new THREE.TubeGeometry(crv,120,1.2,6,false),M(0x5a7a8a,{roughness:.15}));tube.scale.y=.05;G.add(tube)}
 /* 오이도 빨간 등대 + 조개무지 */const OX=26,OZ=SZ-6;{const tw=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.6,9,16),M(0xc8302a,{roughness:.5}));tw.position.set(OX,4.5,OZ);G.add(tw);cam.push(tw);const gal=new THREE.Mesh(new THREE.CylinderGeometry(1.7,1.7,.2,16),M(0xf4f4f4));gal.position.set(OX,9.1,OZ);G.add(gal);const lr=new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,1.2,12),new THREE.MeshStandardMaterial({color:0xfff0d0,emissive:0x804020,emissiveIntensity:.4,transparent:true,opacity:.7}));lr.position.set(OX,9.8,OZ);G.add(lr);const cp=new THREE.Mesh(new THREE.ConeGeometry(1.1,.9,16),M(0xc8302a));cp.position.set(OX,10.85,OZ);G.add(cp);solids.push({cx:OX,cz:OZ,r:1.7,y0:0,y1:11});
  const sh=new THREE.Mesh(new THREE.SphereGeometry(4,16,8,0,Math.PI*2,0,Math.PI/2),M(0xd8d0c0));sh.scale.y=.3;sh.position.set(OX-12,0,OZ+12);G.add(sh);solids.push({cx:OX-12,cz:OZ+12,r:3.8,y0:0,y1:1.2});const SM=M(0xf0e8d8);for(let i=0;i<36;i++){const a=r()*6.28,d=r()*3.6;const s=new THREE.Mesh(new THREE.SphereGeometry(.12,6,4,0,Math.PI*2,0,Math.PI/2),SM);s.scale.y=.4;s.position.set(OX-12+Math.cos(a)*d,1.1-d*.25,OZ+12+Math.sin(a)*d);G.add(s)}}
 const ol=new THREE.PointLight(0xff3020,0,40,1.4);ol.position.set(OX,9.8,OZ);G.add(ol);
 /* 옛 소금 창고(갯골 가) */{const SX=-24,SZ2=SZ+8;const wh=new THREE.Mesh(new THREE.BoxGeometry(10,3,5),M(0x6a5038));wh.position.set(SX,1.5,SZ2);G.add(wh);cam.push(wh);for(const sd of[-1,1]){const rf=new THREE.Mesh(new THREE.BoxGeometry(10.6,.15,3.2),M(0x4a3a2a));rf.position.set(SX,3.6,SZ2+sd*1.3);rf.rotation.x=sd*.45;G.add(rf)}solids.push({x0:SX-5,x1:SX+5,y0:0,y1:4,z0:SZ2-2.5,z1:SZ2+2.5})}
 /* 밤 관측(놀이 때만): 어두운 하늘 돔 + 수평선 등대 셋 */const NV=new THREE.Group();NV.visible=false;G.add(NV);const EYE=new THREE.Vector3(OX-6,4,OZ+2);{const dm=new THREE.Mesh(new THREE.SphereGeometry(230,24,12),new THREE.MeshBasicMaterial({color:0x070b18,side:THREE.BackSide,fog:false,depthWrite:false}));dm.position.copy(EYE);NV.add(dm);const ds=new THREE.Mesh(new THREE.CircleGeometry(220,40),new THREE.MeshBasicMaterial({color:0x0a1424,fog:false}));ds.rotation.x=-Math.PI/2;ds.position.set(EYE.x,.3,EYE.z);NV.add(ds)}
 const LH=[];const glowT=tex(64,64,(q,w,h)=>{const g=q.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.3,'rgba(255,255,255,.6)');g.addColorStop(1,'rgba(255,255,255,0)');q.fillStyle=g;q.fillRect(0,0,w,h)});
 for(let k=0;k<3;k++){const a=(-.5+k*.5)*.36;const p=new THREE.Vector3(EYE.x+Math.sin(a)*120,0,EYE.z-Math.cos(a)*120);const tw=new THREE.Mesh(new THREE.CylinderGeometry(.9,1.2,7,10),new THREE.MeshBasicMaterial({color:0x1a1e28,fog:false}));tw.position.set(p.x,3.5,p.z);NV.add(tw);const fl=new THREE.Sprite(new THREE.SpriteMaterial({map:glowT,fog:false,depthWrite:false,transparent:true,color:0xffffff}));fl.scale.set(9,9,1);fl.position.set(p.x,7.6,p.z);NV.add(fl);LH.push({fl,a})}
 const NL=[];if(!mini){for(const[x,y,z]of[[-24,3,SZ+12],[OX-12,3,OZ+16]]){const L=new THREE.PointLight(0xffc080,0,24,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0,tt=0;const nightTick=dt=>{tt+=dt;const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8);ol.intensity=nk*12*((tt%4)<.6?1:0)};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(OX-3,OZ+5,3,'오이도 빨간 등대','오이도의 상징인 빨간 등대예요. 밤에는 빨간 불빛이 깜빡여요. 간추려 지었어요.');
 sp(OX-6,OZ+4.5,1.8,'등대 불빛 읽는 자리','밤바다 등대 불빛을 보고 어느 등대인지 맞혀 봐요.');
 sp(OX-12,OZ+17,3,'오이도 조개무지','신석기 사람들이 조개를 먹고 버린 조개무지예요(사적). 간추려 지었어요.');
 sp(-24,SZ+12,3,'시흥 갯골과 소금 창고','바닷물이 드나드는 구불구불한 갯고랑이에요. 옛 소래 염전 소금 창고가 남아 있어요. 간추려 지었어요.');
 sp(-60,40,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 등대 불빛 읽기(11/22): 세 판. 수평선에 등대 셋이 저마다 빛깔·깜빡임 수·주기로 빛나요. 표를 보고 묻는 등대를 골라요. 판마다 헷갈리는 등대가 섞여요. (놀이용으로 간추려 지은 불빛 규칙) */
 const LIB=[{n:'빨간 등대',c:0xff3020,f:1,p:4},{n:'초록 등대',c:0x30ff60,f:2,p:6},{n:'흰 등대',c:0xffffff,f:1,p:3},{n:'흰 쌍둥이 등대',c:0xffffff,f:2,p:8},{n:'빨간 쌍둥이 등대',c:0xff3020,f:2,p:5},{n:'초록 홑 등대',c:0x30ff60,f:1,p:5},{n:'흰 세쌍 등대',c:0xffffff,f:3,p:9}];
 const cname={16724000:'빨강',3211104:'초록',16777215:'흰빛'};
 window.__ASLIGHT=()=>{if(document.getElementById('asP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(OX-6,OZ+4.5,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('asP')?[EYE.x,EYE.y,EYE.z,EYE.x,EYE.y+1.6,EYE.z-30,48]:null;NV.visible=true;
  let rd=0,set=[],ask=0,done=false,auto=false,last=performance.now(),msg='',t=0,phase='q',wait=0;const res=[];
  const pick3=()=>{const pool=LIB.slice();if(rd===0)pool.splice(3);const out=[];while(out.length<3){out.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0])}
   if(rd>=1){/* 헷갈리게: 같은 빛깔 둘 이상 */const same=LIB.filter(x=>x.c===0xffffff);const s2=same.sort(()=>Math.random()-.5).slice(0,rd===1?2:3);for(let i=0;i<s2.length;i++)out[i]=s2[i];out.sort(()=>Math.random()-.5)}return out};
  const newRound=()=>{set=pick3();ask=Math.floor(Math.random()*3);t=0;phase='q';set.forEach((L,k)=>{LH[k].fl.material.color.setHex(L.c)});const q=set[ask];iEl.innerHTML=`${rd+1} / 3판 · 찾을 등대: <b>${q.n}</b>`;hEl.textContent=`${q.n}: ${cname[q.c]} 빛, ${q.p}초마다 ${q.f}번 깜빡`;msg=''};
  const d=document.createElement('div');d.id='asP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#0e1424;border:3px solid #c8302a;border-radius:16px;padding:10px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#e8eef8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:300px;max-width:94vw;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🗼 등대 불빛 읽기</b><div data-i style="margin:3px 0;font:14px 'Do Hyeon',sans-serif"></div><div data-h style="font-size:12.5px;color:#f8e8a0"></div><div style="font-size:11px;color:#a8b8d0;margin-top:3px">한 번 깜빡임을 셋 동안 세어 봐요</div><div style="display:flex;gap:6px;margin-top:7px">${['왼쪽','가운데','오른쪽'].map((x,k)=>`<button data-k="${k}" style="flex:1;font:16px 'Do Hyeon',sans-serif;background:#2a3a5a;color:#fff;border:0;border-radius:10px;padding:10px 0;cursor:pointer">${x}</button>`).join('')}</div><div data-m style="font-size:12px;color:#f8e8a0;margin-top:5px"></div>`;
  const iEl=d.querySelector('[data-i]'),hEl=d.querySelector('[data-h]'),mEl=d.querySelector('[data-m]');
  const snd=(f,len,type='sine',v=.05)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(v,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const choose=k=>{if(done||phase!=='q')return;const okk=k===ask;const sc=okk?Math.max(.6,1-Math.max(0,t-12)/40):0;res.push(sc);msg=okk?`맞아요! 저 등대가 ${set[ask].n}예요`:`아니에요. ${['왼쪽','가운데','오른쪽'][ask]}이 ${set[ask].n}였어요`;snd(okk?780:240,.3,okk?'sine':'sawtooth',okk?.05:.03);phase='wait';wait=2.2};
  d.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>choose(+b.dataset.k));const kd=e=>{const m={Digit1:0,Digit2:1,Digit3:2,ArrowLeft:0,ArrowUp:1,ArrowRight:2}[e.code];if(m!=null)choose(m)};addEventListener('keydown',kd);
  const cleanup=()=>{removeEventListener('keydown',kd);NV.visible=false};
  newRound();
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;
   set.forEach((L,k)=>{const ph=(t+k*.7)%L.p;let on=false;for(let i=0;i<L.f;i++){if(ph>=i*.7&&ph<i*.7+.35)on=true}LH[k].fl.material.opacity=on?1:0;LH[k].fl.scale.setScalar(on?9:0.1)});
   if(phase==='q'&&auto&&t>Math.max(...set.map(x=>x.p))+.5)choose(ask);
   if(phase==='wait'){wait-=dt;if(wait<=0){rd++;if(rd>=3){fin();return}newRound()}}
   mEl.textContent=msg;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('ansan_light',Q,'등대 불빛 읽기')}catch(e){}window.__ASQ=Q;snd(660,.4);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">밤바다 등대를 다 읽었어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">등대는 저마다 빛깔과 깜빡이는 수, 주기가 달라서 뱃사람은 밤에 불빛만 보고도 어느 등대인지 알아요. 이 규칙을 등질이라고 해요. 놀이 속 등질은 간추려 지은 것이에요.</div><div style="font-size:24px;color:#c8302a">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8302a;color:#fff;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#e8eef8;border:2px solid #e8eef8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__ASLIGHT()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__ASG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('깜빡임을 세어 봐요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'빗살무늬 토기 조각',h:'신석기 빗살무늬 토기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.1,.16,12,1,true),M(0x9a7a5a,{side:THREE.DoubleSide})))})},
  {n:'굴 껍데기',h:'조개무지의 굴 껍데기예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.08,8,4,0,Math.PI*2,0,Math.PI/2),M(0xd8d0c0)))})},
  {n:'그물추',h:'그물을 가라앉히던 돌 그물추예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.TorusGeometry(.05,.025,6,10),M(0x8a8478)))})},
  {n:'소금 가마니 끈',h:'소금을 담던 가마니 끈 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.01,.01,.2,4),M(0xc8a860)))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__ASDIG=()=>{window.__DETECT&&window.__DETECT({key:'ansan_dig',title:'안산·시흥 발굴 탐지',emoji:'⛏️',bg:'#0e1424',count:4,TL:150,cand:[[-60,40],[-20,40],[20,40],[60,30],[-70,10],[50,10],[0,20],[-40,25]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'안산·시흥은 갯벌과 조개무지, 등대의 고장이에요.'})};
 const meta={quest:{t:'안산·시흥 둘러보기',d:'빨간 등대와 조개무지, 갯골 소금 창고를 둘러보세요.',steps:[['등대','오이도 빨간 등대'],['조개무지','오이도 조개무지'],['갯골','시흥 갯골과 소금 창고']]},
  title:'안산·시흥 오이도 등대·갯골',hint:'오이도 등대·조개무지·갯골 소금 창고를 공개 사진으로 간추려 지었어요. 밤바다 등대 불빛을 읽어 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:true,sign:{x:-6,z:16,lines:['안산·시흥','오이도 빨간 등대 · 조개무지','시흥 갯골 · 소금 창고','간추려 지음']}},
  npc:[['science',[[-10,8],[-2,8],[-2,20],[-10,20]]]],bounds:[-90,80,-48,60],level:()=>'안산',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#8aa050';g.fillRect(0,0,300,300);g.fillStyle='#3a5a7a';g.fillRect(0,0,300,Z(SZ-30));g.fillStyle='#7a6a58';g.fillRect(0,Z(SZ-30),300,30*S);g.fillStyle='#c8302a';g.beginPath();g.arc(X(OX),Z(OZ),2*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:22,yaw:Math.PI},size:{}},meta)}
