/* 강원 고성 건봉사 마당(2026-11-23, 2단계 넷째 묶음): 신라 때 세웠다고 전하는 큰 절. 758년 발징화상이 만일염불회를 처음 열었다고 전함. 한국전쟁 때 거의 다 불타 넓은 절터가 남음.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   불이문(1920, 돌기둥에 금강저 무늬) → 개울 위 능파교(보물, 무지개 돌다리, 위로 걸어 건넘) → 길 양쪽 십바라밀 석주(바라밀을 뜻하는 기호를 새긴 돌기둥) → 대웅전 / 적멸보궁과 사리탑(부처님 치아 사리를 모심) / 불탄 옛 절터 주춧돌.
   놀이: 연등 모두 밝히기(등 하나를 누르면 그 등과 앞뒤옆 등이 함께 켜지고 꺼짐. 모든 등을 밝히기, 판은 다 켠 상태에서 거꾸로 섞어 반드시 풀림, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {curvedRoof,buildHall} from './hallkit.js';
import {lumpyHill} from './treekit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildGeonbong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(758);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7a9a48,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 for(let i=0;i<7;i++){const c=lumpyHill((24+r()*10)*1.3,(30+r()*12)*.75,0x4a6a3a,((-96+i*32)*.13+57)|0);c.position.set(-96+i*32,-.5,-112-r()*10);G.add(c)}
 const ST=M(0xa8a296),ST2=M(0x948e82),WOOD=M(0x8a3a2a),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50);
 const roof=(x,y,z,W,D,h)=>{curvedRoof(G,x,(y+h/2)-(h)/2,z,(W*.72)/.72,(D*.72)/.72,(h)*1.05)};
 const plaque=(x,y,z,txt,w=2)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 const hall=(x,z,W,D,PH,base=.6)=>{/* 11/23 품질: 흰 상자 벽+기둥 → hallkit 법당 */const h=buildHall({x,z,W,D,nx:Math.max(1,Math.round(W/3)),nz:Math.max(1,Math.round(D/3.2)),FY:base,PH:PH,roof:'hip',pillar:0x9a3a26,bracket:(W>=8?'dapo':'ik'),front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',mini,solids,light:false,roofScale:.9});G.add(h.group);return base+PH};
 /* 불이문: 네 돌기둥 위 나무 + 지붕, 금강저 무늬 */{const Z=42;for(const s of[-1,1])for(const dz of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.32,.36,2.4,12),ST);c.position.set(s*2,1.2,Z+dz*.9);G.add(c);const w=new THREE.Mesh(new THREE.CylinderGeometry(.22,.24,1.6,10),WOOD);w.position.set(s*2,3.2,Z+dz*.9);G.add(w);solids.push({cx:s*2,cz:Z+dz*.9,r:.4,y0:0,y1:4})}const LT=tex(64,128,(q,w,h)=>{q.fillStyle='#a8a296';q.fillRect(0,0,w,h);q.strokeStyle='#4a4438';q.lineWidth=4;q.beginPath();q.moveTo(32,10);q.lineTo(32,118);q.moveTo(14,30);q.quadraticCurveTo(32,60,50,30);q.moveTo(14,98);q.quadraticCurveTo(32,68,50,98);q.stroke()});for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.PlaneGeometry(.4,.8),new THREE.MeshBasicMaterial({map:LT}));p.position.set(s*2,1.3,Z+1.27);G.add(p)}roof(0,4,Z,7,4.4,1.8);plaque(0,3.7,Z+1.3,'門二不',1.5)}
 sp(0,46,3,'불이문','1920년에 세운 문이에요. 돌기둥에 번개를 뜻하는 금강저 무늬를 새겨, 한국전쟁 때 불타지 않고 남았어요.');
 /* 개울(동서) + 능파교(위로 걸어 건넘) */const SZ=28,TOP=1.6;{const w=new THREE.Mesh(new THREE.PlaneGeometry(220,6),M(0x5a8a9a,{roughness:.2}));w.rotation.x=-Math.PI/2;w.position.set(0,.04,SZ);G.add(w);solids.push({x0:-110,x1:-2.2,y0:-2,y1:3,z0:SZ-3,z1:SZ+3},{x0:2.2,x1:110,y0:-2,y1:3,z0:SZ-3,z1:SZ+3});
  for(let k=0;k<13;k++){const a0=Math.PI*k/13,a1=Math.PI*(k+1)/13;const sh=new THREE.Shape();sh.absarc(0,0,3.4,a0,a1,false);sh.absarc(0,0,2.8,a1,a0,true);const g=new THREE.ExtrudeGeometry(sh,{depth:4,bevelEnabled:false});const m=new THREE.Mesh(g,ST2);m.rotation.y=Math.PI/2;m.position.set(-2,-1.9,SZ);G.add(m)}
  const n=5;for(const s of[-1,1])for(let i=1;i<=n;i++){const z0=SZ+s*(3+(n-i)*.6),z1=z0+s*.6,h=TOP*i/n;solids.push({x0:-2,x1:2,y0:-2,y1:h,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});const st=new THREE.Mesh(new THREE.BoxGeometry(4,.14,.6),ST);st.position.set(0,h-.07,(z0+z1)/2);G.add(st)}solids.push({x0:-2,x1:2,y0:-2,y1:TOP,z0:SZ-3,z1:SZ+3});const dk=new THREE.Mesh(new THREE.BoxGeometry(4,.2,6),ST);dk.position.set(0,TOP-.1,SZ);G.add(dk)}
 sp(0,SZ+7.5,3,'능파교','개울 위 무지개 돌다리예요(보물). 「물결을 밟고 건넌다」는 이름처럼 다리 위로 올라 건너요.');
 /* 십바라밀 석주: 길 양쪽 다섯 쌍 */const SYM=['○','◐','⊙','◑','△','□','✕','卍','◇','☆'];for(let i=0;i<10;i++){const s=i<5?-1:1,z=20-(i%5)*2.4;const c=new THREE.Mesh(new THREE.BoxGeometry(.4,1.6,.4),ST);c.position.set(s*3,.8,z);G.add(c);solids.push({cx:s*3,cz:z,r:.3,y0:0,y1:1.6});const LT=tex(64,64,(q,w,h)=>{q.fillStyle='#a8a296';q.fillRect(0,0,w,h);q.fillStyle='#3a3428';q.font='bold 44px serif';q.textAlign='center';q.fillText(SYM[i],32,48)});const p=new THREE.Mesh(new THREE.PlaneGeometry(.36,.36),new THREE.MeshBasicMaterial({map:LT}));p.position.set(s*3-s*.21,1.3,z);p.rotation.y=-s*Math.PI/2;G.add(p)}
 sp(0,15,3,'십바라밀 석주','길 양쪽에 바라밀(깨달음에 이르는 열 가지 닦음)을 뜻하는 기호를 새긴 돌기둥이 늘어서 있어요. 기호 모양은 간추려 새겼어요.');
 /* 대웅전 */{const y=hall(0,-10,11,6,3.2,1);plaque(0,y-.45,-10+3.05,'殿雄大',1.8)}sp(0,-4,3,'대웅전','전쟁 뒤에 다시 지은 법당이에요.');
 /* 적멸보궁 + 사리탑 */{hall(26,-10,7,4.4,2.8,.8);const b=new THREE.Mesh(new THREE.CylinderGeometry(1.4,1.6,.6,16),ST);b.position.set(26,.3,-20);G.add(b);const bell=new THREE.Mesh(new THREE.SphereGeometry(1.1,16,12),ST);bell.scale.y=1.3;bell.position.set(26,1.9,-20);G.add(bell);const top=new THREE.Mesh(new THREE.ConeGeometry(.35,.9,10),ST2);top.position.set(26,3.6,-20);G.add(top);solids.push({cx:26,cz:-20,r:1.6,y0:0,y1:4})}
 sp(26,-4.5,3,'적멸보궁','부처님 치아 사리를 모신 곳이에요. 1986년에 도둑맞았다가 일부가 돌아와 다시 모셨어요. 법당 안에는 불상을 두지 않고 뒤 사리탑을 향해 절해요.');
 /* 불탄 옛 절터 주춧돌 */for(let i=0;i<6;i++)for(let j=0;j<4;j++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.45,.55,.3,10),ST2);c.position.set(-30+i*3,.15,-4+j*3);G.add(c)}
 sp(-22.5,6,3,'옛 절터 주춧돌','건봉사는 한때 수백 칸에 이르는 큰 절이었지만 한국전쟁 때 거의 다 불탔어요. 넓은 터에 주춧돌만 남은 곳이 많아요.');
 /* 연등 모두 밝히기(11/23): 적멸보궁 앞 등줄 */const LX=26,LZ=0;const lg=new THREE.Group();lg.position.set(LX,0,LZ);lg.visible=false;G.add(lg);
 window.__GBLAMP=()=>{if(document.getElementById('gbP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(LX,LZ+10,0)}catch(e){}lg.visible=true;
  let rd=0,N=3,on=[],lamps=[],clicks=0,minC=0,done=false,auto=false,last=performance.now(),t0=0,wait=0,sol=[];const res=[];const S=1.1;
  const camA=()=>{const k=innerWidth<innerHeight?1.6:1;return[LX,2.6+N*.2,LZ+(3.2+N*.9)*k,LX,1.9,LZ,50]};window.__GCAM=()=>document.getElementById('gbP')?camA():null;
  const snd=(f,len=.1,ty='sine')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const ON=new THREE.MeshStandardMaterial({color:0xffb0b8,emissive:0xff6070,emissiveIntensity:.9}),OFF=M(0x6a5a5a);
  const clr=()=>{while(lg.children.length)lg.remove(lg.children[0]);lamps=[]};
  const nbr=i=>{const c=i%N,rr=(i/N)|0;const o=[i];if(c>0)o.push(i-1);if(c<N-1)o.push(i+1);if(rr>0)o.push(i-N);if(rr<N-1)o.push(i+N);return o};
  const flip=i=>nbr(i).forEach(j=>on[j]=!on[j]);
  const paint=()=>lamps.forEach((l,i)=>{l.m.material=on[i]?ON:OFF;l.light.intensity=on[i]?1.2:0});
  const newRound=()=>{clr();N=[3,4,5][rd];on=new Array(N*N).fill(true);sol=[];const k=[3,5,7][rd];const picks=new Set();while(picks.size<k)picks.add((r()*N*N)|0);picks.forEach(i=>{flip(i);sol.push(i)});minC=sol.length;clicks=0;
   const frame=new THREE.Group();for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,N*S+1.6,8),M(0x5a3a22));p.position.set(s*(N*S/2+.3),(N*S+1.6)/2,-.1);frame.add(p)}for(let rr=0;rr<N;rr++){const w=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,N*S+.6,6),M(0x2a2622));w.rotation.z=Math.PI/2;w.position.set(0,1.2+(N-1-rr)*S+.45,0);frame.add(w)}lg.add(frame);
   for(let i=0;i<N*N;i++){const c=i%N,rr=(i/N)|0;const g=new THREE.Group();g.position.set((c-(N-1)/2)*S,1.2+(N-1-rr)*S,0);const m=new THREE.Mesh(new THREE.SphereGeometry(.32,14,10),OFF);m.scale.y=1.15;m.userData.i=i;g.add(m);const cap=new THREE.Mesh(new THREE.CylinderGeometry(.12,.16,.08,10),M(0x2a6a3a));cap.position.y=.38;g.add(cap);const tail=new THREE.Mesh(new THREE.ConeGeometry(.1,.3,8),M(0xe0c040));tail.rotation.x=Math.PI;tail.position.y=-.5;g.add(tail);const light=new THREE.PointLight(0xff8090,0,2.4,2);g.add(light);lg.add(g);lamps.push({m,light})}
   paint();t0=performance.now()/1000;ui()};
  const d=document.createElement('div');d.id='gbP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a1e22;border:3px solid #ff8090;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f8ecec;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffc0c8">🏮 연등 모두 밝히기 ${rd+1}/3</b><div style="font-size:12px;margin:4px 0;line-height:1.5">등 하나를 누르면 그 등과 앞뒤옆 등이 함께 켜지거나 꺼져요. 모든 연등을 밝혀요!</div><div style="font:15px 'Do Hyeon',sans-serif">켜진 등 ${on.filter(Boolean).length}/${N*N} · 누른 횟수 ${clicks}</div><div style="font-size:13px;color:#ffc0c8;min-height:18px">${msg}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#f8ecec;border:1px solid #f8ecec;border-radius:8px;padding:2px 8px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const tap=i=>{if(done||wait>0)return;flip(i);clicks++;const si=sol.indexOf(i);if(si>=0)sol.splice(si,1);else sol.push(i);snd(on[i]?660:420,.12);paint();if(on.every(Boolean)){wait=1.3;snd(880,.5);ui('연등이 모두 밝았어요!')}else ui()};
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,300);const rc=new THREE.Raycaster();const ov=document.createElement('div');ov.id='gbO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  ov.onpointerdown=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(lamps.map(l=>l.m),false)[0];if(h)tap(h.object.userData.i)};
  const cleanup=()=>{ov.remove();clr();lg.visible=false};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3);const s2=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('geonbong_lamp',Q,'연등 모두 밝히기')}catch(e){}window.__GBQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#ffc0c8">연등이 모두 밝았어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">연등은 마음을 밝히는 등불이라는 뜻으로 절 마당에 달아요. 건봉사는 신라 때 1만 날 동안 염불하는 만일염불회를 처음 열었다는 이야기가 전하는 절이에요(놀이의 등 켜는 규칙은 간추린 것).</div><div style="font-size:24px;color:#ff8090">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#ff8090;color:#2a1e22;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f8ecec;border:2px solid #f8ecec;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__GBLAMP()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  let at=0;const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(auto&&wait<=0){at+=dt;if(at>.3&&sol.length){at=0;tap(sol[0])}}
   if(wait>0){wait-=dt;if(wait<=0){const el=performance.now()/1000-t0;res.push(Math.max(30,Math.round(100-Math.max(0,clicks-minC)*4-Math.max(0,el-25-rd*20)*.3)));rd++;if(rd>=3){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);window.__GBG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},tap,get on(){return on.filter(Boolean).length},scr:i=>{setPC();const v=new THREE.Vector3();lamps[i].m.getWorldPosition(v);v.project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]}};try{ctx.say('등을 눌러 연등을 모두 밝혀 봐요!',2.4)}catch(e){}};
 spots.push({x:LX,y:0,z:LZ+3,r:2.6,t:'연등 다는 자리',h:'적멸보궁 앞 등줄의 연등을 모두 밝혀 봐요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,44],[0,3,SZ+5],[0,3,16],[0,3,-4],[26,3,-4],[-22,2.4,6]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'불탄 기와 조각',h:'전쟁 때 불에 그을린 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x2a2622)))})},
  {n:'청동 풍경',h:'처마 끝에서 울리던 작은 종이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.03,.05,.09,10),M(0x5a7a62,{metalness:.5})))})},
  {n:'백자 발우 조각',h:'스님의 밥그릇(발우) 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.08,.06,14,1,true,0,2.4),M(0xf0ece0,{side:THREE.DoubleSide})))})},
  {n:'염주 알',h:'염불할 때 돌리던 나무 염주 알이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.03,10,8),M(0x6a3a22)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(10,48,2.4,'발굴 탐지 자리','절 들머리 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__GBDIG=()=>{window.__DETECT&&window.__DETECT({key:'geonbong_dig',title:'건봉사 발굴 탐지',emoji:'⛏️',bg:'#2a1e22',count:4,TL:150,cand:[[-10,46],[12,38],[-12,18],[12,10],[-32,10],[-36,-12],[14,-20],[40,-6],[-12,-24],[36,16]],items:DIG,intro:'건봉사 터 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'건봉사는 전쟁으로 대부분 불탔지만 불이문과 능파교가 남아 옛 큰 절의 모습을 전해요.'})};
 const meta={quest:{t:'건봉사 둘러보기',d:'불이문을 지나 능파교를 건너고, 십바라밀 석주와 법당, 적멸보궁과 옛 절터까지 둘러보세요.',steps:[['불이문','불이문'],['능파교','능파교'],['석주','십바라밀 석주'],['대웅전','대웅전'],['적멸보궁','적멸보궁'],['절터','옛 절터 주춧돌']]},
  title:'고성 건봉사',hint:'고성 건봉사를 공개 사진으로 간추려 지었어요(배치·크기 어림). 적멸보궁 앞 등줄의 연등을 모두 밝혀 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:52,lines:['고성 건봉사','불이문 · 능파교','십바라밀 석주 · 적멸보궁','간추려 지음']}},
  npc:[['science',[[-6,50],[6,50],[6,56],[-6,56]]]],bounds:[-50,50,-40,60],level:()=>'고성 건봉사',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.2,ox:0,oz:8,draw(g,X,Z,S){g.fillStyle='#7a9a48';g.fillRect(0,0,300,300);g.fillStyle='#5a8a9a';g.fillRect(0,Z(SZ+3),300,6*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:54,yaw:Math.PI},size:{}},meta)}
