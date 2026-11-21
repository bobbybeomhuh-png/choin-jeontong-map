/* 순천 낙안읍성 마당(2026-11-21): 공개 실측 3D 가운데 CC BY인 것이 없어(lacomi1975 낙안읍성은 NonCommercial이라 안 씀) 공개 수치로 간추려 지음.
   낙안읍성(사적): 둘레 약 1,410m 돌로 쌓은 읍성, 동문 낙풍루·남문 쌍청루, 객사·동헌, 지금도 사람이 사는 초가 마을. 초가는 한국문화정보원 실측 초가(CC BY, hanokkit choga).
   성벽은 둘레를 실제에 가깝게(긴 변 380m·짧은 변 300m 네모, 둘레 1,360m), 높이 약 4m. 놀이: 초가지붕 이엉 잇기(짚더미에서 이엉을 날라 세 집 지붕을 새로), 발굴 탐지, 밤 장터 등불. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {placeHanok} from './hanokkit.js';
export function buildNaganeup(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1397);
 const TOUCH=opts.touch!=null?!!opts.touch:matchMedia('(pointer:coarse)').matches;
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 const AX=190,AZ=150,WH=4.2,WT=3;
 /* 땅 */
 const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#7d8f4a';q.fillRect(0,0,w,h);for(let i=0;i<3600;i++){q.fillStyle=r()<.5?'rgba(90,110,40,.5)':'rgba(170,150,90,.35)';q.fillRect(r()*w,r()*h,2,2)}},[80,80]);
 const gr=new THREE.Mesh(new THREE.PlaneGeometry(560,480),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.position.y=.01;gr.receiveShadow=true;G.add(gr);
 const DT=tex(256,256,(q,w,h)=>{q.fillStyle='#b8a47e';q.fillRect(0,0,w,h);for(let i=0;i<2000;i++){q.fillStyle=r()<.5?'rgba(140,120,90,.5)':'rgba(210,200,170,.4)';q.fillRect(r()*w,r()*h,3,3)}},[3,60]);
 const road=(x,z,w,l,rot)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,l),new THREE.MeshStandardMaterial({map:DT,roughness:1}));m.rotation.x=-Math.PI/2;if(rot)m.rotation.z=Math.PI/2;m.position.set(x,.02,z);m.receiveShadow=true;G.add(m)};
 road(0,0,7,2*AX+40,true);road(0,AZ/2,6,AZ+30,false);road(-80,-30,4,AZ,false);road(80,-40,4,AZ,false);
 /* 성벽(돌 무늬) */
 const ST=tex(256,256,(q,w,h)=>{q.fillStyle='#8a8478';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=28)for(let x=-(y/28%2)*30;x<w;x+=60){const v=110+(r()*60|0);q.fillStyle=`rgb(${v},${v-4},${v-12})`;q.fillRect(x+2,y+2,56+(r()*6|0)-3,24)}},[1,1]);
 const wall=(x0,z0,x1,z1)=>{const L=Math.hypot(x1-x0,z1-z0);const t=ST.clone();t.needsUpdate=true;t.repeat.set(L/6,1);t.wrapS=t.wrapT=THREE.RepeatWrapping;const m=new THREE.Mesh(new THREE.BoxGeometry(L,WH,WT),new THREE.MeshStandardMaterial({map:t,roughness:.95}));m.position.set((x0+x1)/2,WH/2,(z0+z1)/2);m.rotation.y=-Math.atan2(z1-z0,x1-x0);m.castShadow=m.receiveShadow=true;G.add(m);cam.push(m);
  const pt=new THREE.Mesh(new THREE.BoxGeometry(L,.8,.5),new THREE.MeshStandardMaterial({map:t,roughness:.95}));pt.position.set((x0+x1)/2,WH+.4,(z0+z1)/2);pt.rotation.y=m.rotation.y;const ox=-Math.sin(m.rotation.y)*0,oz=0;G.add(pt);
  solids.push({x0:Math.min(x0,x1)-WT/2,x1:Math.max(x0,x1)+WT/2,y0:0,y1:WH+1,z0:Math.min(z0,z1)-WT/2,z1:Math.max(z0,z1)+WT/2})};
 const GW=7;wall(-AX,-AZ,AX,-AZ);wall(-AX,-AZ,-AX,AZ);wall(-AX,AZ,-GW,AZ);wall(GW,AZ,AX,AZ);wall(AX,-AZ,AX,-GW);wall(AX,GW,AX,AZ);
 /* 문루: 동문 낙풍루, 남문 쌍청루(돌 축대 위 누각) + 옹성 */
 const gate=(x,z,ry,name)=>{const sm=new THREE.MeshStandardMaterial({map:ST,roughness:.95});for(const s of[-1,1]){const b=new THREE.Mesh(new THREE.BoxGeometry(5,WH+.6,7),sm);const lx=s*(GW+2.5);b.position.set(x+(ry?0:lx),(WH+.6)/2,z+(ry?lx:0));if(ry)b.rotation.y=Math.PI/2;G.add(b)}if(!mini){const h=buildHall({x,z,ry,W:13,D:6.5,nx:3,nz:2,FY:0,PH:3.2,base:false,floor:true,roof:'hip',name,pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',rail:true,stairs:'none',solids:[],light:false,mini});h.group.position.y=WH+.6;G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}};
 gate(AX,0,Math.PI/2,'樂豐樓');gate(0,AZ,0,'雙淸樓');
 /* 동문 밖 옹성(반원) */{const sm=new THREE.MeshStandardMaterial({map:ST,roughness:.95});for(let k=0;k<9;k++){const a=-Math.PI/2+k/8*Math.PI*.72+.25;const x=AX+Math.cos(a)*16,z=Math.sin(a)*16;if(Math.abs(z)<GW+1&&x>AX+10)continue;const b=new THREE.Mesh(new THREE.BoxGeometry(6,WH,WT),sm);b.position.set(x,WH/2,z);b.rotation.y=-a+Math.PI/2;G.add(b);solids.push({cx:x,cz:z,r:2.6,y0:0,y1:WH})}}
 /* 관아: 객사(낙안객사)·동헌(사무당) */
 if(!mini){const h1=buildHall({x:0,z:-70,ry:0,W:24,D:8,nx:7,nz:2,FY:.9,PH:3.6,roof:'hip',name:'樂安客舍',pillar:0x8a5a3a,bracket:'ik',front:'door',solids,light:false});G.add(h1.group);const h2=buildHall({x:-55,z:-40,ry:0,W:16,D:8,nx:5,nz:2,FY:.8,PH:3.4,roof:'hip',name:'使務堂',pillar:0x8a5a3a,bracket:'ik',front:'door',solids,light:false});G.add(h2.group)}
 /* 은행나무(400년) */{const t=new THREE.Mesh(new THREE.CylinderGeometry(.9,1.4,9,10),M(0x5a4430));t.position.set(18,4.5,-40);t.castShadow=true;G.add(t);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(7,1),M(0xd8b830));c.position.set(18,12,-40);c.scale.y=.85;c.castShadow=true;G.add(c);solids.push({cx:18,cz:-40,r:1.4,y0:0,y1:10})}
 /* 초가 마을(실측 초가) */
 const HS=[];if(!mini){const ok=(x,z)=>Math.abs(z)>14&&Math.abs(x)>10&&!(Math.abs(x)<20&&z<-55)&&!(x<-35&&x>-75&&z<-25&&z>-55)&&Math.hypot(x-18,z+40)>14&&!(x>40&&x<130&&z>24&&z<62)&&Math.abs(Math.abs(x)-80)>6;
  for(let gx=-160;gx<=160;gx+=24)for(let gz=-125;gz<=125;gz+=22){const x=gx+(r()-.5)*4,z=gz+(r()-.5)*4;if(!ok(x,z))continue;if(r()<.35)continue;HS.push([x,z])}
  for(let i=HS.length-1;i>0;i--){const j=(r()*(i+1))|0;[HS[i],HS[j]]=[HS[j],HS[i]]}window.__NAHS=HS;HS.slice(0,44).forEach(([x,z],i)=>placeHanok(G,solids,i%3?'choga1':'choga2',x,z,[0,Math.PI/2,Math.PI,-Math.PI/2][(i*7)%4],{TOUCH,s:.85}))}
 /* 이엉 잇기 할 집 셋(지붕 띠 넷씩: 묵은 짚 → 새 짚) + 짚더미 */
 const OLD=M(0x6a6050,{roughness:1}),NEW=M(0xd8b860,{roughness:1});const HUTS=[[60,46],[86,52],[112,44]].map(([x,z],hi)=>{const g=new THREE.Group();g.position.set(x,0,z);const wl=new THREE.Mesh(new THREE.BoxGeometry(7,2.4,4.6),M(0xd8c8a8));wl.position.y=1.2;g.add(wl);for(const sx of[-2.4,0,2.4]){const p=new THREE.Mesh(new THREE.BoxGeometry(.18,2.4,.18),M(0x6a4a30));p.position.set(sx,1.2,2.32);g.add(p)}const dr=new THREE.Mesh(new THREE.BoxGeometry(1.1,1.8,.06),M(0x8a6a48));dr.position.set(0,.95,2.33);g.add(dr);
   const strips=[];for(let k=0;k<4;k++){const geo=new THREE.SphereGeometry(1,24,8,0,Math.PI*2,Math.PI/2-(k+1)/4*Math.PI/2,Math.PI/2/4);const m=new THREE.Mesh(geo,OLD);m.scale.set(4.6,1.9,3.3);m.position.y=2.35;m.castShadow=true;g.add(m);strips.push(m)}
   const lad=new THREE.Group();for(const s of[-.3,.3]){const rl=new THREE.Mesh(new THREE.BoxGeometry(.08,3.4,.08),M(0x8a6a48));rl.position.x=s;rl.position.y=1.7;lad.add(rl)}for(let k=0;k<6;k++){const rg=new THREE.Mesh(new THREE.BoxGeometry(.6,.06,.06),M(0x8a6a48));rg.position.y=.4+k*.55;lad.add(rg)}lad.position.set(3.3,0,2.8);lad.rotation.x=-.25;g.add(lad);
   G.add(g);solids.push({x0:x-3.6,x1:x+3.6,y0:0,y1:4.4,z0:z-2.4,z1:z+2.4});return{x,z,strips,n:0,sx:x+3.3,sz:z+3.6}});
 const PX=86,PZ=32;{const p=new THREE.Mesh(new THREE.SphereGeometry(2.2,16,10,0,Math.PI*2,0,Math.PI/2),M(0xd8b860,{roughness:1}));p.scale.y=.8;p.position.set(PX,0,PZ);G.add(p);solids.push({cx:PX,cz:PZ,r:2.1,y0:0,y1:1.8});for(let i=0;i<6;i++){const b=new THREE.Mesh(new THREE.CylinderGeometry(.35,.35,1.6,10),M(0xc8a850));b.rotation.z=Math.PI/2;b.position.set(PX-3.2+(i%3)*.75,.35+(i/3|0)*.7,PZ+2.4);G.add(b)}}
 /* 밤: 큰길 등불·문루 불빛 */
 const NL=[];if(!mini){for(let i=0;i<14;i++){const x=-160+i*24.6;for(const z of[-4.6,4.6]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,2,6),M(0x4a3a2a));p.position.set(x,1,z);G.add(p);const lp=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.42,10),new THREE.MeshStandardMaterial({color:(i%2)?0x2a4a9a:0xa02a2a,emissive:0}));lp.position.set(x,2.2,z);G.add(lp);NL.push({lp})}}for(const[x,y,z]of[[AX,WH+3,0],[0,WH+3,AZ],[0,4,-62],[-55,4,-33],[86,4,40]]){const L=new THREE.PointLight(0xffc080,0,26,1.4);L.position.set(x,y,z);G.add(L);NL.push({L})}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const l of NL){if(l.lp)l.lp.material.emissive.setRGB(nk*.9,nk*.6,nk*.4);if(l.L)l.L.intensity=nk*8}};
 /* 안내 */
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(AX+22,8,4,'낙안읍성','조선 고을 하나가 성벽 안에 통째로 남은 곳이에요(사적). 둘레 약 1,410m 돌 성벽 안에 관아와 초가 마을이 있고, 지금도 사람들이 살아요. 간추려 지었고, 초가는 한국문화정보원 실측이에요.');
 sp(AX-10,8,3,'동문 낙풍루','낙안읍성의 동쪽 문이에요. 문 밖을 반달처럼 감싼 옹성이 있어 적이 바로 문으로 들이닥치지 못하게 했어요.');
 sp(0,-60,3.4,'낙안객사','임금을 상징하는 전패를 모시고 손님을 묵게 하던 객사예요. 읍성 안에서 가장 크고 격식 있는 건물이에요.');
 sp(-55,-31,3,'동헌 사무당','고을 수령인 낙안 군수가 일을 보던 동헌이에요.');
 sp(18,-30,3,'은행나무','성 안 큰길가에 선 400살 넘은 은행나무예요. 가을이면 노랗게 물들어요.');
 sp(PX,PZ-4,2.6,'이엉 짚더미','가을걷이가 끝나면 새 볏짚으로 이엉을 엮어 초가지붕을 새로 덮어요. 이엉을 날라 지붕을 이어 봐요.');
 sp(-30,22,2.4,'발굴 탐지 자리','읍성 땅속에 옛 고을 사람들의 물건이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 이엉 잇기(11/21): 짚더미에서 이엉을 들고 집 사다리(고리)로 가면 지붕 띠가 아래부터 한 줄씩 새 짚으로. 세 집 × 네 띠, 150초 */
 window.__NAYEONG=()=>{if(document.getElementById('naP'))return;const H=window.__H3,ctx=H.ctx();try{H.tp(PX,PZ-4.5,0);H.face(0)}catch(e){}
  for(const h of HUTS){h.n=0;for(const s of h.strips)s.material=OLD}const g=new THREE.Group();G.add(g);
  const rings=HUTS.map(h=>{const m=new THREE.Mesh(new THREE.RingGeometry(.8,1.05,24),new THREE.MeshBasicMaterial({color:0x8ae08a,transparent:true,opacity:.4,depthWrite:false,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;m.position.set(h.sx,.04,h.sz);g.add(m);return m});
  const pr=new THREE.Mesh(new THREE.RingGeometry(1.2,1.5,24),new THREE.MeshBasicMaterial({color:0xffd060,transparent:true,opacity:.45,depthWrite:false,side:THREE.DoubleSide}));pr.rotation.x=-Math.PI/2;pr.position.set(PX,.04,PZ-3.2);g.add(pr);
  const carry=new THREE.Mesh(new THREE.CylinderGeometry(.35,.35,1.6,10),NEW);carry.rotation.z=Math.PI/2;carry.visible=false;g.add(carry);
  const N=HUTS.length*4,TL=150;let has=false,n=0,done=false,t0=performance.now()/1000;
  const d=document.createElement('div');d.id='naP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2418;border:3px solid #d8b860;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffe090">🌾 초가지붕 이엉 잇기</b><div id="naS" style="font:20px 'Do Hyeon',sans-serif;margin:4px 0">0 / ${N}</div><div id="naG" style="font-size:13px;color:#ffe090">짚더미 앞 노란 고리에서 이엉을 들어요</div><div id="naT" style="font-size:13px">${TL}초</div><div style="font-size:12px;opacity:.85">이엉을 들고 집 사다리 앞 초록 고리로 가면 지붕 한 줄이 새 짚이 돼요</div>`;const Sx=d.querySelector('#naS'),Gd=d.querySelector('#naG'),T=d.querySelector('#naT');
  const rustle=()=>{try{const AC=ctx.ac();if(!AC)return;const len=.35;const b=AC.createBuffer(1,AC.sampleRate*len,AC.sampleRate),dd=b.getChannelData(0);for(let i=0;i<dd.length;i++)dd[i]=(Math.random()*2-1)*(1-i/dd.length)*.6;const src=AC.createBufferSource();src.buffer=b;const f=AC.createBiquadFilter();f.type='highpass';f.frequency.value=1800;const gg=AC.createGain();gg.gain.value=.12;src.connect(f).connect(gg).connect(ctx.out()||AC.destination);src.start()}catch(e){}};
  const fin=()=>{if(done)return;done=true;carry.visible=false;const el=performance.now()/1000-t0;const Q=n>=N?Math.max(70,Math.round(100-Math.max(0,el-80)*.5)):Math.round(n/N*65);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('naganeup_yeong',Q,'낙안읍성 이엉 잇기')}catch(e){}window.__NAQ=Q;
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffe090">${n>=N?'세 집 지붕을 다 새로 덮었어요!':'지붕 '+n+'줄을 이었어요'}</b><div style="font-size:13px;margin:4px 0">초가지붕은 해마다 가을에 새 이엉을 덮어요. 묵은 짚 위에 새 이엉을 아래에서 위로 겹겹이 얹고, 꼭대기에 용마름을 씌운 뒤 새끼줄로 묶어 바람에 날리지 않게 해요.</div><div style="font-size:26px;color:#d8b860">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#d8b860;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__NAYEONG(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},800)};
  const loop=()=>{if(!d.isConnected){G.remove(g);return}const now=performance.now()/1000;const P=H.P;
   if(!done){if(!has&&Math.hypot(P.x-PX,P.z-(PZ-3.2))<1.9){has=true;rustle();Gd.textContent='지붕을 이을 집 사다리로 가요'}
    else if(has){for(let i=0;i<HUTS.length;i++){const h=HUTS[i];if(h.n<4&&Math.hypot(P.x-h.sx,P.z-h.sz)<1.6){h.strips[h.n].material=NEW;h.n++;n++;has=false;rustle();try{ctx.say(h.n<4?'지붕 '+h.n+'줄!':'한 집 다 덮었어요!',1.2)}catch(e){}Gd.textContent='짚더미에서 이엉을 또 들어요';if(n>=N)fin();break}}}
    carry.visible=has;if(has)carry.position.set(P.x,P.y+1.9,P.z);rings.forEach((m,i)=>{m.visible=HUTS[i].n<4;m.material.opacity=has?.4+Math.sin(now*5)*.2:.18});pr.material.opacity=has?.15:.45+Math.sin(now*5)*.15;Sx.textContent=n+' / '+N;const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin()}
   requestAnimationFrame(loop)};loop();
  window.__NAG={HUTS,P:[PX,PZ-3.2],get n(){return n}};try{ctx.say('가을이에요! 새 이엉으로 초가지붕을 덮어요.',2.4)}catch(e){}};
 /* 발굴 탐지 */
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'상평통보',h:'조선 후기 엽전이에요. 낙안 장터에서 쓰던 돈이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})},
  {n:'옹기 조각',h:'김치·장을 담던 옹기 조각이에요. 초가 마을 장독대마다 옹기가 있었어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.24,.24,.3,12,1,true,0,1.4),M(0x5a3a24,{side:THREE.DoubleSide})))})},
  {n:'백자 사발',h:'밥과 국을 담던 흰 사발 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.18,14,8,0,Math.PI*2,Math.PI/2,Math.PI/2),M(0xf0ece0,{side:THREE.DoubleSide})))})},
  {n:'놋수저',h:'놋쇠로 만든 숟가락과 젓가락이에요.',mk:mk(g=>{for(const z of[-.03,.03]){const s=new THREE.Mesh(new THREE.BoxGeometry(.34,.015,.02),M(0xc8a040,{metalness:.8}));s.position.z=z;g.add(s)}})},
  {n:'관아 기와',h:'객사와 동헌 지붕의 기와 조각이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.3,12,1,true,0,Math.PI),M(0x5a5a58,{side:THREE.DoubleSide}));m.rotation.z=Math.PI/2;g.add(m)})}];
 window.__NADIG=()=>{window.__DETECT&&window.__DETECT({key:'naganeup_dig',title:'낙안읍성 발굴 탐지',emoji:'⛏️',bg:'#26221a',count:4,TL:150,cand:[[-30,22],[-20,8],[30,-20],[40,10],[-40,-10],[20,30],[-10,-30],[50,-10]],items:ITEMS,intro:'낙안읍성 땅속에 옛 고을 사람들의 물건이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'사람이 수백 년 이어 산 고을이라 집터마다 그릇과 엽전이 나와요.'})};
 const meta={quest:{t:'낙안읍성 둘러보기',d:'성벽 안 초가 마을을 둘러보세요.',steps:[['낙풍루','동문 낙풍루'],['객사','낙안객사'],['동헌','동헌 사무당'],['은행나무','은행나무']]},
  title:'순천 낙안읍성',hint:'성벽 안에 조선 고을과 초가 마을이 통째로 남은 낙안읍성을 간추려 지었어요(초가는 실측). 가을 이엉 잇기를 해 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,fog:[120,560],sign:{x:AX+18,z:14,lines:['순천 낙안읍성','사적 · 둘레 약 1,410m','초가 마을 · 객사 · 동헌','초가 실측 · 성은 간추려 지음']}},
  npc:[['science',[[AX+10,-6],[AX+24,-6],[AX+24,6],[AX+10,6]]]],bounds:[-AX-30,AX+50,-AZ-30,AZ+40],level:()=>'낙안읍성',camCap:()=>Infinity,baseAt:()=>0,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:.65,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#7d8f4a';g.fillRect(0,0,300,300);g.strokeStyle='#8a8478';g.lineWidth=4;g.strokeRect(X(-AX),Z(AZ),2*AX*S,2*AZ*S);g.fillStyle='#b8a47e';g.fillRect(X(-AX),Z(3.5),2*AX*S,4);g.fillStyle='#d8b860';for(const[x,z]of HS.slice(0,44))g.fillRect(X(x)-3,Z(z)-3,6,6)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:AX+34,z:0,yaw:-Math.PI/2},size:{}},meta)}
