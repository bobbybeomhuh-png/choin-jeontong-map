/* 화순 쌍봉사 마당(2026-11-23, 2단계 일곱째 묶음): 신라 말 철감선사 도윤이 연 절. 대웅전은 드물게 세 층 목탑 모양(1984년 불에 탄 뒤 다시 지음).
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   철감선사탑(국보, 868 무렵): 팔각 승탑으로 기와골·서까래·사자·가릉빈가까지 돌에 새긴 가장 아름다운 승탑 가운데 하나. 철감선사탑비(보물): 거북 받침과 머릿돌만 남음.
   놀이: 풍경 울리기(세 층 대웅전 처마 끝 풍경 가운데 흔들리기 시작한 것을 멈추기 전에 눌러 울려요. 판마다 빨라지고 둘씩도 흔들려요, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {curvedRoof,buildHall} from './hallkit.js';
import {yardMat} from './yardkit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildSsangbong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(868);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7a984a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 쌍봉(두 봉우리) 산 */for(const[x,s]of[[-30,1],[24,1.1]]){const h=new THREE.Mesh(new THREE.SphereGeometry(26*s,16,10,0,Math.PI*2,0,Math.PI/2),M(0x4a6a3a,{flatShading:true}));h.scale.y=.8;h.position.set(x,0,-100);G.add(h)}for(let i=0;i<8;i++){const h=new THREE.Mesh(new THREE.SphereGeometry(18+r()*8,12,8,0,Math.PI*2,0,Math.PI/2),M(0x557a44,{flatShading:true}));h.scale.y=.5;h.position.set(-90+i*26,0,-84-r()*8);G.add(h)}
 const ST=M(0xa8a296),ST2=M(0x948e82),WOODB=M(0x8a7458),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50),DAN=M(0x8a3a2a);
 const plaque=(x,y,z,txt,w=2)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 const hall=(x,z,W,D,PH,base=.8)=>{/* 11/23 품질: 흰 상자 벽+기둥 → hallkit 법당 */const h=buildHall({x,z,W,D,nx:Math.max(1,Math.round(W/3)),nz:Math.max(1,Math.round(D/3.2)),FY:base,PH:PH,roof:'hip',pillar:0x9a3a26,bracket:(W>=8?'dapo':'ik'),front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',mini,solids,light:false,roofScale:.9});G.add(h.group);return base+PH};
 /* 일주문 */{for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.3,.32,4,12),DAN);c.position.set(s*2,2,46);G.add(c);solids.push({cx:s*2,cz:46,r:.35,y0:0,y1:4})}curvedRoof(G,0,(4.75)-(1.5)/2,46,(4.3)/.72,(2.2)/.72,(1.5)*1.05);plaque(0,3.5,46.9,'寺峰雙山岳中',2.4)}
 sp(0,50,3,'일주문','쌍봉사로 들어가는 문이에요. 절 뒤로 봉우리 두 개가 솟아 있어 쌍봉사라고 해요.');
 /* 세 층 목탑 모양 대웅전 */const DX=0,DZ=10;const BELLS=[];{const base=1;const b=new THREE.Mesh(new THREE.BoxGeometry(9.4,base,9.4),ST);b.position.set(DX,base/2,DZ);G.add(b);
  let y=base;const tiers=[[7.2,3.4],[5.4,2.4],[3.8,2]];tiers.forEach(([W,H],ti)=>{const w=new THREE.Mesh(new THREE.BoxGeometry(W,H,W),ti?yardMat():WALLW);w.position.set(DX,y+H/2,DZ);G.add(w);if(!ti){for(let i=0;i<=3;i++)for(const s of[-1,1]){for(const[cx,cz]of[[DX-W/2+i*W/3,DZ+s*W/2],[DX+s*W/2,DZ-W/2+i*W/3]]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.2,.24,H,10),WOODB);c.position.set(cx,y+H/2,cz);G.add(c)}}}
   y+=H;const RS=(W+2.6)*.72,RH=ti===2?2.4:1.1;curvedRoof(G,DX,(y+RH/2-.2)-(RH)/2,DZ,(RS)/.72,(RS)/.72,(RH)*1.05);
   const hs=RS*.707;for(const[sx,sz]of[[-1,1],[1,1],[1,-1],[-1,-1]]){const g=new THREE.Group();g.position.set(DX+sx*hs*.98,y-.25,DZ+sz*hs*.98);G.add(g);const bl=new THREE.Mesh(new THREE.CylinderGeometry(.09,.16,.32,10),M(0x5a7a62,{metalness:.5,roughness:.4,emissive:0x000000}));bl.position.y=-.2;g.add(bl);const fish=new THREE.Mesh(new THREE.BoxGeometry(.04,.22,.12),M(0x5a7a62,{metalness:.5}));fish.position.y=-.5;g.add(fish);BELLS.push({g,bl,ti,sx,sz})}
   if(ti===0)plaque(DX,y-.7,DZ+W/2+.05,'殿雄大',1.8)});
  const spire=new THREE.Mesh(new THREE.CylinderGeometry(.06,.12,2.4,8),M(0x6a5a3a,{metalness:.6}));spire.position.set(DX,y+2.6,DZ);G.add(spire);solids.push({x0:DX-4.3,x1:DX+4.3,y0:0,y1:y,z0:DZ-4.3,z1:DZ+4.3})}
 sp(DX,DZ+7.5,3.4,'대웅전','세 층 목탑 모양의 드문 법당이에요. 1984년 불에 탄 뒤 옛 모습대로 다시 지었어요. 처마 끝마다 물고기 풍경이 달려 있어요.');
 /* 극락전 */{const y=hall(-18,4,8,5,3,.8);plaque(-18,y-.4,6.55,'殿樂極',1.4)}
 sp(-18,9,2.6,'극락전','아미타부처님을 모신 법당이에요.');
 /* 철감선사탑(팔각 승탑) */const CX=20,CZ=-10;{const g=new THREE.Group();g.position.set(CX,0,CZ);G.add(g);let y=0;const oct=(rb,rt,h,m=ST)=>{const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,8),m);o.position.y=y+h/2;g.add(o);y+=h};oct(1.6,1.5,.35);oct(1.3,1.1,.45);oct(.9,.9,.3,ST2);oct(1.25,1.25,.35);oct(.62,.62,.95,ST2);const rf=new THREE.Mesh(new THREE.ConeGeometry(1.35,.55,8),ST2);rf.position.y=y+.27;g.add(rf);y+=.55;const top=new THREE.Mesh(new THREE.SphereGeometry(.2,10,8),ST);top.position.y=y+.15;g.add(top);
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const l=new THREE.Mesh(new THREE.SphereGeometry(.13,8,6),ST2);l.position.set(Math.cos(a)*1.15,1.0,Math.sin(a)*1.15);g.add(l)}solids.push({cx:CX,cz:CZ,r:1.7,y0:0,y1:y+.4})}
 sp(CX,CZ+4,2.8,'철감선사탑','868년 무렵 철감선사 도윤의 사리를 모신 팔각 승탑이에요(국보). 기와골과 서까래, 사자와 소리 좋은 새 가릉빈가까지 돌에 새겼어요.');
 /* 철감선사탑비 */{const X=CX+5,Z=CZ-2;const tu=new THREE.Mesh(new THREE.SphereGeometry(1.1,14,10),ST2);tu.scale.set(1,.5,1.5);tu.position.set(X,.42,Z);G.add(tu);const hd=new THREE.Mesh(new THREE.SphereGeometry(.34,10,8),ST2);hd.position.set(X,.52,Z+1.6);G.add(hd);const cap=new THREE.Mesh(new THREE.BoxGeometry(1.3,.5,.5),ST2);cap.position.set(X,1.15,Z);G.add(cap);solids.push({cx:X,cz:Z,r:1.3,y0:0,y1:1.5})}
 sp(CX+5,CZ+2,2.4,'철감선사탑비','비몸은 없어지고 거북 받침과 용 머릿돌만 남았어요(보물). 거북의 오른발 하나를 살짝 든 모습이 재미있어요.');
 /* 풍경 울리기(11/23) */window.__SBBELL=()=>{if(document.getElementById('sbbP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(DX+10,DZ+12,0)}catch(e){}
  const camA=()=>{const k=innerWidth<innerHeight?1.7:1;return[DX+9*k,6.5,DZ+11*k,DX,5.2,DZ,50]};window.__GCAM=()=>document.getElementById('sssX')?null:document.getElementById('sbbP')?camA():null;
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,200);const rc=new THREE.Raycaster();
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  const vis=BELLS.filter(b=>!(b.sx<0&&b.sz<0));/* 카메라에서 보이는 아홉 개 */
  const hits=vis.map((b,i)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.7,8,6),new THREE.MeshBasicMaterial({visible:false}));m.position.y=-.3;m.userData.i=i;b.g.add(m);return m});
  let rd=0,act=[],nextT=0,tl=0,hit=0,spawned=0,miss=0,done=false,auto=false,last=performance.now(),wait=0;const res=[];const NR=3,RT=16;
  const WIN=[1.6,1.2,.95],GAP=[.9,.7,.55];
  const snd=(f,len=.1,ty='triangle',vol=.06)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(vol,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const ding=ti=>{const f=[880,1046,1318][ti];snd(f,1.2,'sine',.07);snd(f*2.76,.5,'sine',.02)};
  const reset=()=>{vis.forEach(b=>{b.bl.material.emissive.setHex(0);b.g.rotation.set(0,0,0)});act=[]};
  const newRound=()=>{reset();tl=RT;nextT=.6;hit=0;spawned=0;miss=0;ui()};
  const ov=document.createElement('div');ov.id='sbbO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  const tap=i=>{if(done||wait>0)return;const a=act.find(q=>q.i===i);if(a){act=act.filter(q=>q!==a);hit++;const b=vis[i];b.bl.material.emissive.setHex(0x40a060);setTimeout(()=>{if(!act.some(q=>q.i===i))b.bl.material.emissive.setHex(0)},250);ding(b.ti);ui('딸랑!')}else{miss++;snd(200,.12,'square',.03)}};
  ov.onpointerdown=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(hits,false)[0];if(h)tap(h.object.userData.i);else{miss++}};
  const d=document.createElement('div');d.id='sbbP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1e2a26;border:3px solid #6ab890;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef6f0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:220px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#a8e8c8">🎐 풍경 울리기 ${rd+1}/${NR}</b><div style="font-size:12px;margin:4px 0;line-height:1.5">처마 끝 물고기 풍경이 빛나며 흔들리면, 멈추기 전에 눌러 울려 줘요!</div><div style="font-size:13px">울린 풍경 ${hit} · 남은 시간 ${Math.max(0,Math.ceil(tl))}초</div><div style="font-size:13px;color:#a8e8c8;min-height:18px">${msg}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#eef6f0;border:1px solid #eef6f0;border-radius:8px;padding:2px 8px;margin-top:4px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const cleanup=()=>{reset();ov.remove();hits.forEach(m=>m.parent&&m.parent.remove(m))};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/res.length);const s2=Q>=80?3:Q>=55?2:Q>0?1:0;try{ctx.done('ssangbong_bell',Q,'풍경 울리기')}catch(e){}window.__SBBQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#a8e8c8">잘 울렸어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">처마 끝 풍경에 물고기를 다는 건, 밤에도 눈을 감지 않는 물고기처럼 늘 깨어 있으라는 뜻이래요. 쌍봉사 대웅전은 세 층 처마마다 풍경이 달려요.</div><div style="font-size:24px;color:#6ab890">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#6ab890;color:#fff;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef6f0;border:2px solid #eef6f0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__SBBELL()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  let uiT=0;const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(wait<=0){tl-=dt;nextT-=dt;
    if(nextT<=0&&tl>WIN[rd]){const free=vis.map((b,i)=>i).filter(i=>!act.some(q=>q.i===i));const n=rd===2&&r()<.4?2:1;for(let k=0;k<n&&free.length;k++){const j=free.splice((r()*free.length)|0,1)[0];act.push({i:j,t:WIN[rd],a:0});spawned++;snd(1400,.05,'sine',.015)}nextT=WIN[rd]*.6+GAP[rd]+r()*.4}
    for(const q of act.slice()){q.t-=dt;q.a+=dt;const b=vis[q.i];b.g.rotation.z=Math.sin(q.a*14)*.35;b.bl.material.emissive.setHex(0xc89a30);if(q.t<=0){act=act.filter(x=>x!==q);b.g.rotation.z=0;b.bl.material.emissive.setHex(0)}}
    if(auto)for(const q of act.slice())if(q.a>.35)tap(q.i);
    uiT-=dt;if(uiT<=0){uiT=.5;ui()}
    if(tl<=0){reset();const sc=Math.max(10,Math.round(100*hit/Math.max(1,spawned)-Math.min(30,miss*3)));res.push(sc);wait=1.6;snd(760,.4,'sine');ui(`${spawned}개 가운데 ${hit}개 울렸어요(${sc}점)`)}}
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=NR){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);
  window.__SBBG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},tap,get act(){return act.map(q=>q.i)},scr:i=>{setPC();const v=new THREE.Vector3();vis[i].bl.getWorldPosition(v);v.project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]}};try{ctx.say('흔들리는 풍경을 눌러 울려 봐요!',2.4)}catch(e){}};
 sp(DX+8,DZ+10,2.6,'풍경 울리는 자리','세 층 대웅전 처마 끝 풍경이 흔들리면 눌러 울려 봐요.');
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,49],[DX,3,DZ+7],[DX+8,3,DZ+9],[-18,3,8],[CX,3,CZ+4],[CX+5,3,CZ+2]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'기와 조각',h:'절 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'물고기 풍경 조각',h:'처마 끝 풍경에 달던 청동 물고기예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.03,.14,.08),M(0x5a7a62,{metalness:.5})))})},
  {n:'불탄 숯 조각',h:'1984년 대웅전이 불탔을 때의 숯 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.1,.05,.06),M(0x2a2622)))})},
  {n:'석탑 돌 부스러기',h:'승탑을 깎던 화강암 부스러기예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.DodecahedronGeometry(.05),M(0xa8a296)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(12,44,2.4,'발굴 탐지 자리','절 들머리 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__SBDIG=()=>{window.__DETECT&&window.__DETECT({key:'ssangbong_dig',title:'쌍봉사 발굴 탐지',emoji:'⛏️',bg:'#1e2a26',count:4,TL:150,cand:[[-8,40],[10,36],[-12,22],[14,24],[-8,-14],[6,-18],[32,4],[-32,-8],[30,30],[-30,30]],items:DIG,intro:'쌍봉사 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'쌍봉사 철감선사탑은 우리나라 승탑 가운데 가장 정교하다고 손꼽혀요(국보).'})};
 const meta={quest:{t:'쌍봉사 둘러보기',d:'일주문을 지나 세 층 목탑 모양 대웅전과 극락전, 철감선사탑과 탑비를 둘러보세요.',steps:[['일주문','일주문'],['대웅전','대웅전'],['극락전','극락전'],['승탑','철감선사탑'],['탑비','철감선사탑비']]},
  title:'화순 쌍봉사',hint:'쌍봉사를 공개 사진으로 간추려 지었어요(배치·크기 어림). 세 층 대웅전 처마 끝 풍경이 흔들리면 눌러 울려 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:52,lines:['화순 쌍봉사','세 층 목탑 모양 대웅전','철감선사탑(국보)','간추려 지음']}},
  npc:[['science',[[-6,50],[6,50],[6,56],[-6,56]]]],bounds:[-44,44,-34,60],level:()=>'화순 쌍봉사',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:10,draw(g,X,Z,S){g.fillStyle='#7a984a';g.fillRect(0,0,300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:54,yaw:Math.PI},size:{}},meta)}
