/* 의왕·군포 마당(2026-11-22, W83): 왕송호수, 옛 단선 철길과 간이역(신호소·통표), 군포 철쭉 동산.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음.
   의왕: 철도박물관과 왕송호수가 있는 철도의 고장. 옛 단선 철길에서는 한 구간에 열차 하나만 들어가게 통표(둥근 쇠 패)를 주고받았어요.
   군포 철쭉 동산: 봄이면 산비탈이 철쭉으로 붉게 물들어요.
   놀이: 단선 신호수(마주 오는 열차들을 한 구간에 하나씩만 내보내고, 가운데 역 비낌 선로(두 칸)를 잘 써서 꽉 막히지 않게 하기, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildUiwang(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1988);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x86a24e,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 왕송호수 */const LX=-30,LZ=24;{const lk=new THREE.Mesh(new THREE.CircleGeometry(18,40),M(0x4a7a9a,{roughness:.15,metalness:.1}));lk.scale.set(1.5,1,1);lk.rotation.x=-Math.PI/2;lk.position.set(LX,.03,LZ);G.add(lk);solids.push({cx:LX,cz:LZ,r:17,y0:-1,y1:2},{cx:LX-14,cz:LZ,r:12,y0:-1,y1:2},{cx:LX+14,cz:LZ,r:12,y0:-1,y1:2})}
 /* 철쭉 동산(북동쪽 비탈) */{const hill=new THREE.Mesh(new THREE.SphereGeometry(20,20,10,0,Math.PI*2,0,Math.PI/2),M(0x6a8a3a));hill.scale.y=.35;hill.position.set(50,0,-48);G.add(hill);solids.push({cx:50,cz:-48,r:18,y0:0,y1:7});const AZ=[M(0xe84a8a),M(0xf06aa0),M(0xd83a6a)];for(let i=0;i<120;i++){const a=r()*6.28,d=Math.sqrt(r())*18;const x=50+Math.cos(a)*d,z=-48+Math.sin(a)*d;const y=.35*Math.sqrt(Math.max(0,400-d*d));const b=new THREE.Mesh(new THREE.SphereGeometry(.7+r()*.4,7,5),AZ[i%3]);b.scale.y=.6;b.position.set(x,y+.2,z);G.add(b)}}
 /* 단선 철길: x -36 ~ 36, z = TZ. 역 셋(가운데 역은 비낌 선로) */const TZ=0,ST=[-30,0,30],SEC=5;const RG=new THREE.Group();RG.rotation.y=Math.PI/2;RG.position.set(8,0,-10);G.add(RG);/* 철길 묶음: 로컬 x(철길 방향) → 세계 -z, 로컬 z → 세계 x */const wbox=(x0,x1,y1,z0,z1)=>solids.push({x0:8+z0,x1:8+z1,y0:0,y1,z0:-10-x1,z1:-10-x0});const RL=M(0x6a6a70,{metalness:.7,roughness:.4}),SL=M(0x5a4030);
 const track=(x0,x1,z)=>{const L=x1-x0;for(const s of[-.7,.7]){const r2=new THREE.Mesh(new THREE.BoxGeometry(L,.1,.08),RL);r2.position.set((x0+x1)/2,.12,z+s);RG.add(r2)}const n=Math.ceil(L/.9);const im=new THREE.InstancedMesh(new THREE.BoxGeometry(.22,.1,2.2),SL,n);const o=new THREE.Object3D();for(let i=0;i<n;i++){o.position.set(x0+i*.9,.05,z);o.updateMatrix();im.setMatrixAt(i,o.matrix)}RG.add(im)};
 track(-38,38,TZ);track(-8,8,TZ-3.2);for(const s of[-1,1]){const d=new THREE.Mesh(new THREE.BoxGeometry(6.5,.1,.08),RL);d.position.set(s*10.5,.12,TZ-1.6);d.rotation.y=s*.5;RG.add(d)}
 ST.forEach((x,i)=>{const pf=new THREE.Mesh(new THREE.BoxGeometry(10,.6,2.4),M(0xb8b0a0));pf.position.set(x,.3,TZ+2.6);RG.add(pf);wbox(x-5,x+5,.6,TZ+1.4,TZ+3.8);const hs=new THREE.Mesh(new THREE.BoxGeometry(3,2.4,2.4),M(0xe8dcc0));hs.position.set(x,1.2,TZ+5.6);RG.add(hs);const rf=new THREE.Mesh(new THREE.ConeGeometry(2.4,1.2,4),M(0x6a3a2a));rf.rotation.y=Math.PI/4;rf.position.set(x,3,TZ+5.6);RG.add(rf);wbox(x-1.5,x+1.5,3,TZ+4.4,TZ+6.8);const LT=tex(256,64,(q,w,h)=>{q.fillStyle='#f4f0e4';q.fillRect(0,0,w,h);q.strokeStyle='#2a4a8a';q.lineWidth=6;q.strokeRect(3,3,w-6,h-6);q.fillStyle='#1a2a4a';q.font='bold 34px sans-serif';q.textAlign='center';q.fillText(['가 역','나 역(비낌)','다 역'][i],w/2,44)});const sg=new THREE.Sprite(new THREE.SpriteMaterial({map:LT}));sg.scale.set(4,1,1);sg.position.set(x,4.6,TZ+5.6);RG.add(sg)});
 /* 구간 신호등 둘 */const sig=[];for(const x of[-18,18]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,3,6),M(0x3a3a3a));p.position.set(x,1.5,TZ+1.8);RG.add(p);const l=new THREE.Mesh(new THREE.SphereGeometry(.3,10,8),new THREE.MeshStandardMaterial({color:0x30d050,emissive:0x30d050,emissiveIntensity:.8}));l.position.set(x,3.1,TZ+1.8);RG.add(l);sig.push(l)}
 const NL=[];if(!mini){for(const[x,y,z]of[[16,4,-10],[LX,3,LZ-20]]){const L=new THREE.PointLight(0xffc080,0,26,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8)};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(18,-10,3,'옛 단선 철길과 간이역','한 선로로 오가는 단선 철길에서는 한 구간에 열차 하나만 들어가게 통표를 주고받았어요. 가운데 역에는 열차가 비껴 설 선로가 있어요. 간추려 지었어요.');
 sp(17,-4,2,'신호소','마주 오는 열차들을 부딪치지 않게, 오래 기다리지 않게 내보내 봐요.');
 sp(LX,LZ-20,3,'의왕 왕송호수','철도박물관 곁 호수예요. 둘레로 레일바이크가 달려요. 간추려 지었어요.');
 sp(40,-30,3,'군포 철쭉 동산','봄이면 산비탈이 철쭉으로 붉게 물들어요. 간추려 지었어요.');
 sp(-60,40,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 단선 신호수(11/22): 세 판. 가 역·다 역에서 열차가 생겨 반대쪽 끝역으로 가요. 구간(가-나, 나-다)마다 열차 하나만. 나 역은 두 칸까지. 기다리는 열차의 단추를 눌러 내보내요. 막힌 구간에 내보내면 비상 정지(벌점) */
 window.__UWSIG=()=>{if(document.getElementById('uwP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(17,-4,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('uwP')?[10,74,34,10,0,-12,56]:null;
  let rd=0,trains=[],sched=[],t=0,nid=1,wait=0,emerg=0,done=false,auto=false,last=performance.now(),msg='',phase='play',at=0,stuckT=0;const res=[];
  const mkT=(dir,id)=>{const g=new THREE.Group();const b=new THREE.Mesh(new THREE.BoxGeometry(5,1.8,2),M(dir>0?0x2a6ab0:0xc84a2a));b.position.y=1.1;g.add(b);const c=new THREE.Mesh(new THREE.BoxGeometry(1.6,1,1.9),M(0x2a2a2a));c.position.set(-dir*1.6,2.4,0);g.add(c);const LT=tex(64,64,(q,w,h)=>{q.fillStyle='#fff';q.beginPath();q.arc(32,32,30,0,7);q.fill();q.fillStyle='#111';q.font='bold 40px sans-serif';q.textAlign='center';q.fillText(String(id),32,46)});const s=new THREE.Sprite(new THREE.SpriteMaterial({map:LT,depthTest:false}));s.scale.set(2.2,2.2,1);s.position.y=4.4;g.add(s);RG.add(g);return g};
  const newRound=()=>{trains.forEach(o=>RG.remove(o.g));trains=[];const n=4+rd*2;sched=[];let tt=1;for(let i=0;i<n;i++){sched.push({t:tt,dir:Math.random()<.5?1:-1});tt+=2.5+Math.random()*3.5-rd*.6}t=0;emerg=0;phase='play';stuckT=0;msg=`${rd+1}판: 열차 ${n}대`};
  /* 열차: st=있는 역 번호(기다림) 또는 sec=달리는 구간, f=구간 진행 */
  const secOf=(s,dir)=>dir>0?s:s-1;const occ=sec=>trains.some(o=>o.run&&o.sec===sec);const atSt=s=>trains.filter(o=>!o.run&&!o.gone&&o.st===s).length+trains.filter(o=>o.run&&o.to===s).length;
  const send=o=>{if(done||phase!=='play'||o.run||o.gone)return;const sec=secOf(o.st,o.dir),to=o.st+o.dir;if(occ(sec)){emerg++;o.wait+=8;msg=`비상 정지! ${o.id}번이 막힌 구간에 들어가려 했어요`;snd(150,.5,'sawtooth',.05);return}if(to===1&&atSt(1)>=2){msg='나 역은 두 칸이 꽉 찼어요';snd(220,.2,'square',.03);return}o.run=true;o.sec=sec;o.to=to;o.f=0;snd(640,.1,'triangle',.04)};
  const d=document.createElement('div');d.id='uwP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#1a2230;border:3px solid #30d050;border-radius:16px;padding:9px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#eef4f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:310px;max-width:94vw;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🚦 단선 신호수</b><div data-i style="margin:3px 0;font:13.5px 'Do Hyeon',sans-serif"></div><div style="font-size:11.5px;color:#c8d8e8">파랑은 동쪽(다 역)으로, 빨강은 서쪽(가 역)으로 가요. 한 구간에 하나만, 나 역은 두 칸</div><div data-b style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center;margin-top:6px;min-height:36px"></div><div data-m style="font-size:12px;color:#f8e8a0;margin-top:4px"></div>`;
  const iEl=d.querySelector('[data-i]'),bEl=d.querySelector('[data-b]'),mEl=d.querySelector('[data-m]');let bKey='';
  const snd=(f,len,type='sine',v=.05)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(v,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const cleanup=()=>{trains.forEach(o=>RG.remove(o.g));trains=[];sig.forEach(l=>{l.material.color.setHex(0x30d050);l.material.emissive.setHex(0x30d050)})};
  newRound();
  const posOf=o=>{if(o.run){const x0=ST[o.st],x1=ST[o.to];return{x:x0+(x1-x0)*o.f,z:TZ}}const idx=trains.filter(q=>!q.run&&!q.gone&&q.st===o.st).indexOf(o);return{x:ST[o.st]+(o.st===0?-idx*6:o.st===2?idx*6:0),z:o.st===1&&idx===1?TZ-3.2:TZ}};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(phase==='play'){t+=dt;while(sched.length&&sched[0].t<=t){const s=sched.shift();const o={id:nid++,dir:s.dir,st:s.dir>0?0:2,run:false,wait:0,gone:false};o.g=mkT(o.dir,o.id);trains.push(o)}
    for(const o of trains){if(o.gone)continue;if(o.run){o.f+=dt/SEC;if(o.f>=1){o.run=false;o.st=o.to;if((o.dir>0&&o.st===2)||(o.dir<0&&o.st===0)){o.gone=true;RG.remove(o.g)}}}else o.wait+=dt;if(!o.gone){const p=posOf(o);o.g.position.set(p.x,0,p.z)}}
    sig.forEach((l,k)=>{const c=occ(k)?0xe83020:0x30d050;l.material.color.setHex(c);l.material.emissive.setHex(c)});
    if(auto){at+=dt;if(at>.3){at=0;const ws=trains.filter(o=>!o.run&&!o.gone).sort((a,b)=>b.wait-a.wait);for(const o of ws){const sec=secOf(o.st,o.dir),to=o.st+o.dir;if(occ(sec))continue;if(to===1){if(atSt(1)>=2)continue;/* 막힘 피하기: 반대쪽에서 나 역으로 오는 열차가 있으면 한 칸 남겨 둠 */const opp=trains.some(q=>!q.gone&&q.dir!==o.dir&&(q.run?q.to===1:q.st!==1));if(opp&&atSt(1)>=1)continue}send(o);break}}}
    const live=trains.filter(o=>!o.gone);const moving=live.some(o=>o.run);if(live.length&&!moving){stuckT+=dt}else stuckT=0;
    if(!sched.length&&!live.length){const tw=trains.reduce((a,o)=>a+o.wait,0);const n=trains.length;const sc=Math.max(0,Math.min(1,1-Math.max(0,tw/n-6)/30)-emerg*.2);res.push(sc);msg=`다 보냈어요! 한 대 평균 ${(tw/n).toFixed(1)}초 기다림, 비상 정지 ${emerg}번`;snd(sc>.8?780:330,.35);phase='wait';wait=2.4}
    if(stuckT>25){res.push(.1);msg='열차들이 서로 막혀 꼼짝 못해요(교착). 다음 판으로';phase='wait';wait=2.4}}
   if(phase==='wait'){wait-=dt;if(wait<=0){rd++;if(rd>=3){fin();return}newRound()}}
   const ws=trains.filter(o=>!o.run&&!o.gone);const key=ws.map(o=>o.id).join(',')+phase;if(key!==bKey){bKey=key;bEl.innerHTML=ws.map(o=>`<button data-t="${o.id}" style="font:14px 'Do Hyeon',sans-serif;background:${o.dir>0?'#2a6ab0':'#c84a2a'};color:#fff;border:0;border-radius:9px;padding:7px 9px;cursor:pointer">${o.id}번 ${o.dir>0?'▶':'◀'} ${['가','나','다'][o.st]}역</button>`).join('')||'<span style="color:#8a9aaa">기다리는 열차 없음</span>';bEl.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{const o=trains.find(q=>q.id===+b.dataset.t);if(o)send(o)})}
   iEl.textContent=`${Math.min(rd+1,3)} / 3판 · 남은 열차 ${sched.length+trains.filter(o=>!o.gone).length} · 비상 정지 ${emerg}`;mEl.textContent=msg;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('uiwang_signal',Q,'단선 신호수')}catch(e){}window.__UWQ=Q;snd(660,.4);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">하루 운행을 마쳤어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">단선 철길에서는 구간마다 통표 하나를 두고, 통표를 받은 열차만 그 구간에 들어갔어요. 마주 오는 열차는 비낌 선로가 있는 역에서 서로 비켜 지나갔지요.</div><div style="font-size:24px;color:#30d050">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#30d050;color:#1a2230;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f8;border:2px solid #eef4f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__UWSIG()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__UWG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('한 구간에 한 열차!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'통표',h:'단선 구간을 지날 수 있다는 둥근 쇠 패예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.02,20),M(0x9a8a5a,{metalness:.7})))})},
  {n:'철도 못',h:'침목에 레일을 박던 굵은 못이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,.2,6),M(0x5a4a3a,{metalness:.7})))})},
  {n:'옛 기차표',h:'두꺼운 종이 기차표예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.01,.1),M(0xd8c8a0)))})},
  {n:'역무원 단추',h:'옛 역무원 제복 단추예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.01,12),M(0xc8a040,{metalness:.8})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__UWDIG=()=>{window.__DETECT&&window.__DETECT({key:'uiwang_dig',title:'의왕·군포 발굴 탐지',emoji:'⛏️',bg:'#1a2230',count:4,TL:150,cand:[[-60,40],[-20,50],[20,30],[60,10],[-70,-30],[30,-60],[-40,-40],[10,10]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'의왕·군포는 철길과 호수, 철쭉의 고장이에요.'})};
 const meta={quest:{t:'의왕·군포 둘러보기',d:'단선 철길과 왕송호수, 철쭉 동산을 둘러보세요.',steps:[['철길','옛 단선 철길과 간이역'],['왕송호수','의왕 왕송호수'],['철쭉','군포 철쭉 동산']]},
  title:'의왕·군포 철길·왕송호수·철쭉',hint:'옛 단선 철길·왕송호수·철쭉 동산을 공개 사진으로 간추려 지었어요. 마주 오는 열차를 한 구간에 하나씩 보내 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-8,z:14,lines:['의왕·군포','옛 단선 철길 · 간이역','왕송호수 · 철쭉 동산','간추려 지음']}},
  npc:[['science',[[-12,0],[-4,0],[-4,10],[-12,10]]]],bounds:[-90,80,-70,60],level:()=>'의왕',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#86a24e';g.fillRect(0,0,300,300);g.fillStyle='#4a7a9a';g.beginPath();g.ellipse(X(LX),Z(LZ),27*S,18*S,0,0,7);g.fill();g.fillStyle='#6a6a70';g.fillRect(X(7),Z(-48),2*S,76*S);g.fillStyle='#e84a8a';g.beginPath();g.arc(X(50),Z(-48),18*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:22,yaw:Math.PI},size:{}},meta)}
