/* 영주 무섬마을 마당(2026-11-23, 2단계 아홉째 묶음): 내성천이 마을을 휘감아 돌아 '물 위의 섬'처럼 보이는 마을(국가민속문화유산).
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림, 강폭과 다리 길이는 줄임: 실제 외나무다리는 약 150m).
   외나무다리(폭 약 30cm, 마을과 바깥을 잇던 유일한 길, 중간중간 비켜 서는 다리), 해우당(1836)·만죽재(1666) 같은 ㅁ자 기와집, 까치구멍집, 초가, 모래톱, 수도교.
   놀이: 외나무다리 건너기(걸으면서 바람에 흔들리는 몸의 균형을 ⬅➡로 잡아요. 기울면 강물에 풍덩, 비켜 선 다리에서 다시 출발. 실시간 균형 잡기, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildMuseom(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1666);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7c9a4a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 내성천(남쪽을 휘감는 강) + 모래톱 */const RZ0=22,RZ1=46;{const sand=new THREE.Mesh(new THREE.PlaneGeometry(200,RZ1-RZ0+10),M(0xe8dcb8));sand.rotation.x=-Math.PI/2;sand.position.set(0,.03,(RZ0+RZ1)/2);G.add(sand);const w=new THREE.Mesh(new THREE.PlaneGeometry(200,RZ1-RZ0-6),M(0x6aa0c0,{roughness:.2,metalness:.05,transparent:true,opacity:.92}));w.rotation.x=-Math.PI/2;w.position.set(0,.06,(RZ0+RZ1)/2);G.add(w);
  for(const s of[-1,1]){const arm=new THREE.Mesh(new THREE.PlaneGeometry(14,70),M(0x6aa0c0,{roughness:.2,transparent:true,opacity:.92}));arm.rotation.x=-Math.PI/2;arm.position.set(s*52,.06,-8);G.add(arm)}}
 /* 먼 산 */for(let i=0;i<9;i++){const h=new THREE.Mesh(new THREE.SphereGeometry(20+r()*8,14,8,0,Math.PI*2,0,Math.PI/2),M(0x557a44,{flatShading:true}));h.scale.y=.55;h.position.set(-80+i*20,0,-92-r()*10);G.add(h)}
 /* 외나무다리(S자 굽이, 통나무 다리 발) */const BR=[[0,48],[3,42],[-2,36],[2.5,30],[0,24],[0,19]];const LOG=M(0x9a7a52),LEG=M(0x6a5236);const bays=[];
 {for(let i=0;i<BR.length-1;i++){const[a,b]=[BR[i],BR[i+1]];const L=Math.hypot(b[0]-a[0],b[1]-a[1]);const n=Math.ceil(L/2);for(let k=0;k<n;k++){const t0=k/n,t1=(k+1)/n;const x0=a[0]+(b[0]-a[0])*t0,z0=a[1]+(b[1]-a[1])*t0,x1=a[0]+(b[0]-a[0])*t1,z1=a[1]+(b[1]-a[1])*t1;const pl=new THREE.Mesh(new THREE.BoxGeometry(.34,.14,Math.hypot(x1-x0,z1-z0)+.04),LOG);pl.position.set((x0+x1)/2,.42,(z0+z1)/2);pl.rotation.y=Math.atan2(x1-x0,z1-z0);G.add(pl);for(const s of[-1,1]){const lg=new THREE.Mesh(new THREE.CylinderGeometry(.05,.06,.5,6),LEG);lg.position.set(x0+s*.12*Math.cos(pl.rotation.y),.2,z0-s*.12*Math.sin(pl.rotation.y));lg.rotation.z=s*.25;G.add(lg)}}}
  for(const i of[1,3]){const[x,z]=BR[i];const by=new THREE.Mesh(new THREE.BoxGeometry(1.4,.14,.9),LOG);by.position.set(x+.6,.42,z);G.add(by);bays.push(i)}}
 sp(4,50,3,'외나무다리','마을과 바깥을 잇던 하나뿐인 길이었던 외나무다리예요. 폭이 한 뼘 남짓이라 마주 오는 사람과는 중간의 비켜 서는 다리에서 비켜 갔대요. 실제로는 150m쯤 돼요.');
 /* 수도교(1983) */{const b=new THREE.Mesh(new THREE.BoxGeometry(3,.5,RZ1-RZ0+6),M(0xb8b8b0));b.position.set(30,.9,(RZ0+RZ1)/2);G.add(b);for(let i=0;i<5;i++){const p=new THREE.Mesh(new THREE.BoxGeometry(2.4,.9,.6),M(0xa8a8a0));p.position.set(30,.35,RZ0+i*6);G.add(p)}}
 sp(26,50,2.6,'수도교','1983년에 놓인 시멘트 다리예요. 그 뒤로 외나무다리는 잠시 사라졌다가 다시 놓였어요.');
 /* ㅁ자 집 */const ROOFG=M(0x4a4a50),THATCH=M(0xb89a5a,{roughness:1}),WALLW=M(0xeee6d4),WOOD=M(0x8a7458),ST=M(0xa8a296);
 const plaque=(x,y,z,txt,w=1.4)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 const wing=(x,z,W,D,H,thatch)=>{const w=new THREE.Mesh(new THREE.BoxGeometry(W,H,D),WALLW);w.position.set(x,.5+H/2,z);G.add(w);const b=new THREE.Mesh(new THREE.BoxGeometry(W+.4,.5,D+.4),ST);b.position.set(x,.25,z);G.add(b);if(thatch){const rf=new THREE.Mesh(new THREE.SphereGeometry(1,12,8,0,Math.PI*2,0,Math.PI/2),THATCH);rf.scale.set(W*.62,1.3,D*.75);rf.position.set(x,.5+H,z);G.add(rf)}else{const rf=new THREE.Mesh(new THREE.ConeGeometry(1,1,4),ROOFG);rf.rotation.y=Math.PI/4;rf.scale.set((W+1.6)*.72,1.4,(D+1.6)*.72);rf.position.set(x,.5+H+.55,z);G.add(rf)}};
 const mhouse=(x,z,S,thatch,name)=>{const t=1.8;wing(x,z+S/2-t/2,S,t,2.6,thatch);wing(x,z-S/2+t/2,S,t,2.4,thatch);wing(x-S/2+t/2,z,t,S-2*t,2.4,thatch);wing(x+S/2-t/2,z,t,S-2*t,2.4,thatch);solids.push({x0:x-S/2-.2,x1:x+S/2+.2,y0:0,y1:3.4,z0:z-S/2-.2,z1:z+S/2+.2});if(name)plaque(x,2.6,z+S/2+.02,name)};
 mhouse(-9,4,8,false,'堂愚海');sp(-9,10.4,2.6,'해우당','1836년에 지은 ㅁ자 기와집이에요. 사랑채가 높아 마을과 강이 내려다보여요. 흥선대원군이 쓴 현판이 걸려 있다고 전해 와요(전해 오는 이야기).');
 mhouse(10,2,7.4,false,'齋竹晩');sp(10,8,2.6,'만죽재','1666년, 무섬마을에 처음 들어온 반남 박씨가 지은 마을에서 가장 오래된 집이에요.');
 mhouse(-20,-10,6.4,true,null);sp(-20,-5,2.4,'까치구멍집','지붕 양 끝에 까치구멍이라는 작은 바람구멍을 낸 ㅁ자 초가예요. 연기가 빠지고 바람이 들어요.');
 mhouse(18,-12,6.4,true,null);mhouse(0,-16,7,false,null);sp(0,-11.2,2.4,'김규진 가옥','ㅁ자 기와집 여럿이 강을 바라보며 모여 앉은 반촌이에요.');
 /* 마을 앞 둔치 소나무 */if(!mini)for(let i=0;i<10;i++){const t=new THREE.Group();t.position.set(-34+i*7.4,0,15+r()*3);G.add(t);const tr=new THREE.Mesh(new THREE.CylinderGeometry(.18,.24,3,6),M(0x6a4a32));tr.position.y=1.5;tr.rotation.z=(r()-.5)*.3;t.add(tr);const cr=new THREE.Mesh(new THREE.ConeGeometry(1.6,2.4,7),M(0x2f5a32,{flatShading:true}));cr.position.y=3.6;t.add(cr)}
 /* 외나무다리 건너기(11/23) — 실제 다리 위에서 */const walker=new THREE.Group();walker.visible=false;G.add(walker);{const bd=new THREE.Mesh(new THREE.SphereGeometry(.28,14,10),M(0xf4f0e4));bd.position.y=.5;walker.add(bd);const hd=new THREE.Mesh(new THREE.SphereGeometry(.2,12,10),M(0xf4f0e4));hd.position.y=.88;walker.add(hd);const ht=new THREE.Mesh(new THREE.CylinderGeometry(.26,.26,.04,14),M(0x2a2622));ht.position.y=1.06;walker.add(ht);const pole=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,1.6,6),M(0x8a6a3a));pole.rotation.z=Math.PI/2;pole.position.y=.62;walker.add(pole)}
 const segL=[];let totL=0;for(let i=0;i<BR.length-1;i++){const L=Math.hypot(BR[i+1][0]-BR[i][0],BR[i+1][1]-BR[i][1]);segL.push(L);totL+=L}
 const at=s=>{let d=s;for(let i=0;i<segL.length;i++){if(d<=segL[i]||i===segL.length-1){const t=Math.min(1,d/segL[i]);const a=BR[i],b=BR[i+1];return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,Math.atan2(b[0]-a[0],b[1]-a[1])]}d-=segL[i]}return[0,0,0]};
 const bayS=bays.map(i=>segL.slice(0,i).reduce((a,b)=>a+b,0));
 window.__MSBRIDGE=()=>{if(document.getElementById('msbP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(6,52,0)}catch(e){}walker.visible=true;
  let rd=0,s=0,b=0,v=0,walking=false,inp=0,falls=0,cp=0,t0=0,gust=0,gT=0,done=false,auto=false,last=performance.now(),wait=0,fallT=0;const res=[];const NR=3;
  const K=[[.9,.5],[1.2,.8],[1.5,1.15]];/* [불안정, 바람] */
  const camA=()=>{const[x,z,a]=at(s);const k=innerWidth<innerHeight?1.4:1;return[x-Math.sin(a)*3.6*k,2.6*k,z-Math.cos(a)*3.6*k,x+Math.sin(a)*2,.8,z+Math.cos(a)*2,55]};window.__GCAM=()=>document.getElementById('sssX')?null:document.getElementById('msbP')?camA():null;
  const snd=(f,len=.1,ty='triangle',vv=.06)=>{try{const AC=ctx.ac();if(!AC)return;const st=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(vv,st);gg.gain.exponentialRampToValueAtTime(.0001,st+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(st);o.stop(st+len+.02)}catch(e){}};
  const d=document.createElement('div');d.id='msbP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1e2a30;border:3px solid #9ac0d8;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef4f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const B=(k,t,w=52)=>`<button data-b="${k}" style="font:19px 'Do Hyeon',sans-serif;background:#9ac0d8;color:#1e2a30;border:0;border-radius:10px;width:${w}px;height:46px;margin:2px;cursor:pointer;touch-action:none">${t}</button>`;
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#c8e4f4">🪵 외나무다리 건너기 ${rd+1}/${NR}</b><div style="font-size:12px;margin:4px 0;line-height:1.5">'걷기'를 누르고 있으면 앞으로 가요. 바람에 몸이 기울면 반대쪽 화살표로 균형을 잡아요. 너무 기울면 풍덩!</div><div id="msbBal" style="position:relative;height:14px;background:#3a4a52;border-radius:7px;margin:4px 0"><div style="position:absolute;left:35%;width:30%;top:0;bottom:0;background:#4a7a5a;border-radius:7px"></div><div id="msbDot" style="position:absolute;left:50%;top:1px;width:12px;height:12px;margin-left:-6px;border-radius:6px;background:#f0d070"></div></div><div id="msbRem" style="font-size:12px">남은 길 ${Math.max(0,totL-s).toFixed(0)}m · 풍덩 ${falls}번</div><div style="font-size:13px;color:#c8e4f4;min-height:18px">${msg}</div><div>${B('l','⬅')}${B('w','걷기',80)}${B('r','➡')}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f8;border:1px solid #eef4f8;border-radius:8px;padding:2px 8px;margin-top:4px;cursor:pointer">그만</button>`;
   d.querySelectorAll('[data-b]').forEach(bt=>{const k=bt.dataset.b;bt.onpointerdown=e=>{e.preventDefault();if(k==='w')walking=true;else inp=k==='l'?-1:1};bt.onpointerup=bt.onpointerleave=bt.onpointercancel=e=>{e.preventDefault();if(k==='w')walking=false;else inp=0}});d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const dot=()=>{const el=d.querySelector('#msbDot');if(el)el.style.left=(50+Math.max(-1,Math.min(1,b))*48)+'%'};
  const newRound=()=>{s=0;cp=0;b=(r()-.5)*.2;v=0;falls=0;gust=0;t0=performance.now();ui()};
  const cleanup=()=>{walker.visible=false};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,c)=>a+c,0)/res.length);const s2=Q>=80?3:Q>=55?2:Q>0?1:0;try{ctx.done('museom_bridge',Q,'외나무다리 건너기')}catch(e){}window.__MSBQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#c8e4f4">무사히 건넜어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">무섬마을 사람들은 350년 동안 장보러 가고, 학교 가고, 시집장가 갈 때도 이 외나무다리를 건넜대요. 꽃가마도 상여도 이 다리로 오갔어요.</div><div style="font-size:24px;color:#9ac0d8">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#9ac0d8;color:#1e2a30;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f8;border:2px solid #eef4f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__MSBRIDGE()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  let uiT=0;const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(wait<=0){
    if(fallT>0){fallT-=dt;walker.position.y-=dt*2;if(fallT<=0){s=cp;b=(r()-.5)*.2;v=0;walker.position.y=0}}
    else{const[ku,kw]=K[rd];gT-=dt;if(gT<=0){gT=1+r()*1.6;gust=(r()-.5)*2*kw}
     if(auto){walking=true;const u=-(b*3+v*1.1);inp=Math.max(-1,Math.min(1,u))}
     const acc=b*ku*(walking?1.6:.6)+gust*(walking?1:.4)+inp*2.4;v+=acc*dt;v*=Math.pow(.5,dt);b+=v*dt;
     if(walking)s=Math.min(totL,s+dt*1.6);for(const q of bayS)if(s>=q&&cp<q){cp=q;snd(660,.1,'sine');ui('비켜 서는 다리에 닿았어요! 여기서 다시 출발할 수 있어요')}
     if(Math.abs(b)>1){falls++;fallT=.8;snd(140,.5,'sawtooth');snd(300,.6,'sine',.03);ui('풍덩! 비켜 선 다리에서 다시 출발해요')}
     if(s>=totL){const tm=(performance.now()-t0)/1000;const sc=Math.max(25,Math.round(100-falls*18-Math.max(0,tm-totL/1.6-6)*.8));res.push(sc);wait=2;snd(820,.5,'sine');walking=false;ui(`건너편에 닿았어요! ${sc}점`)}}
    const[x,z,a]=at(s);walker.position.x=x;walker.position.z=z;if(fallT<=0)walker.position.y=.48;walker.rotation.y=a;walker.rotation.z=-b*.6;dot();uiT-=dt;if(uiT<=0){uiT=.3;const el=d.querySelector('#msbRem');if(el)el.textContent=`남은 길 ${Math.max(0,totL-s).toFixed(0)}m · 풍덩 ${falls}번`}}
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=NR){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);
  window.__MSBG={set auto(v2){auto=v2;if(!v2){walking=false;inp=0}},get done(){return done},get res(){return res.slice()},get s(){return s},get b(){return b},get falls(){return falls},walk:w=>{walking=w},push:x=>{inp=x}};try{ctx.say('균형을 잡으며 외나무다리를 건너요!',2.4)}catch(e){}};
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[4,3,50],[-9,3,10],[10,3,8],[-20,3,-5],[0,3,-11],[3,2,36],[-1,2,26]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'기와 조각',h:'ㅁ자 기와집 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'다리 나무못',h:'외나무다리 발을 박던 나무못이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.015,.02,.14,6),M(0x6a5236)))})},
  {n:'강돌',h:'내성천 모래 속 동글동글한 강돌이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.05,10,8),M(0xb8b0a0)))})},
  {n:'놋숟가락',h:'반가에서 쓰던 놋숟가락이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.02,.01,.16),M(0xc8a040,{metalness:.7})))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(-12,52,2.4,'발굴 탐지 자리','모래톱 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__MSDIG=()=>{window.__DETECT&&window.__DETECT({key:'museom_dig',title:'무섬마을 발굴 탐지',emoji:'⛏️',bg:'#1e2a30',count:4,TL:150,cand:[[-14,56],[14,54],[-24,52],[-6,14],[18,14],[-28,4],[28,-2],[-10,-24],[10,-26],[24,-24]],items:DIG,intro:'무섬마을 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'무섬마을은 물 위에 뜬 섬 같은 마을이에요(국가민속문화유산).'})};
 const meta={quest:{t:'무섬마을 둘러보기',d:'외나무다리를 건너 해우당과 만죽재, 까치구멍집과 김규진 가옥을 둘러보고 수도교도 찾아보세요.',steps:[['다리','외나무다리'],['해우당','해우당'],['만죽재','만죽재'],['까치구멍','까치구멍집'],['가옥','김규진 가옥'],['수도교','수도교']]},
  title:'영주 무섬마을',hint:'무섬마을을 공개 사진으로 간추려 지었어요(배치·크기 어림, 강폭과 다리 길이는 줄임). 외나무다리 앞에서 균형 잡고 건너기에 도전해 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:56,lines:['영주 무섬마을','내성천 · 외나무다리','해우당 · 만죽재','간추려 지음']}},
  npc:[['science',[[-6,54],[6,54],[6,60],[-6,60]]]],bounds:[-44,44,-34,62],level:()=>'영주 무섬마을',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:12,draw(g,X,Z,S){g.fillStyle='#7c9a4a';g.fillRect(0,0,300,300);g.fillStyle='#6aa0c0';g.fillRect(0,150+(RZ0-12)*S,300,(RZ1-RZ0)*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:56,yaw:Math.PI},size:{}},meta)}
