/* 고창 고인돌·선운사 마당(2026-11-22, 고창 덧붙이기 E7): 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   고창 고인돌 유적(세계유산 「고창·화순·강화 고인돌 유적」 2000): 죽림리·도산리 일대 1.8km에 440여 기가 모인 세계에서 가장 큰 고인돌 무리. 탁자식(북방식)·바둑판식(남방식)·개석식이 함께 있고, 뒷산 채석장에서 덮개돌을 떼어 냈음.
   떼어 내기: 바위 틈에 구멍을 줄지어 파고 마른 나무 쐐기를 박은 뒤 물을 부으면 나무가 불어 바위가 갈라짐.
   선운사: 백제 때 세웠다고 전하는 절, 대웅전 뒤 3천 그루 동백숲(천연기념물).
   놀이: 덮개돌 떼어 내기(쐐기를 고르게 박고 물 붓기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildGochangdol(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(2000);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 북쪽(z<-30) 채석장 뒷산 */const ss=t=>t<=0?0:t>=1?1:t*t*(3-2*t);const H=(x,z)=>10*ss((-26-z)/30);
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(220,200,110,100);g.rotateX(-Math.PI/2);const p=g.attributes.position;for(let k=0;k<p.count;k++)p.setY(k,H(p.getX(k),p.getZ(k)));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,color:0x8a9a4a,roughness:1}));m.receiveShadow=true;G.add(m)}
 const rk=M(0x8a8478,{flatShading:true}),rk2=M(0x7a7468,{flatShading:true});
 const slab=(w,h,d)=>{const g=new THREE.BoxGeometry(w,h,d,4,2,4);const p=g.attributes.position;const sd=r()*100;const nz=(x,y,z)=>{const v=Math.sin(x*12.9898+y*78.233+z*37.719+sd)*43758.5453;return v-Math.floor(v)-.5};for(let k=0;k<p.count;k++){const x=p.getX(k),y=p.getY(k),z=p.getZ(k);const n=nz(Math.round(x*100),Math.round(y*100),Math.round(z*100));p.setX(k,x*(1+n*.12));p.setY(k,y*(1+n*.25));p.setZ(k,z*(1+n*.12))}g.computeVertexNormals();return new THREE.Mesh(g,r()<.5?rk:rk2)};
 /* 고인돌 무리: 세 가지 꼴 */const DOL=[];const kinds=['탁자식','바둑판식','개석식'];for(let i=0;i<16;i++){const x=-60+(i%8)*16+(r()-.5)*5,z=-18+((i/8)|0)*22+(r()-.5)*5;const y=H(x,z);const k=i%3;const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=r()*3;const w=3+r()*2.4,d=2.2+r()*1.4;
  if(k===0){for(const s of[-1,1]){const st=slab(.4,1.6,d*.8);st.position.set(s*w*.32,.8,0);g.add(st)}const top=slab(w,.5,d);top.position.y=1.85;g.add(top)}
  else if(k===1){for(const[a,b]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const st=slab(.5,.45,.5);st.position.set(a*w*.3,.22,b*d*.3);g.add(st)}const top=slab(w,1,d);top.position.y=.95;g.add(top)}
  else{const top=slab(w,.9,d);top.position.y=.45;g.add(top)}
  G.add(g);DOL.push([x,z,k]);solids.push({cx:x,cz:z,r:Math.max(w,d)*.45,y0:-2,y1:y+2.4})}
 /* 채석장 바위 벼랑 */{for(let k=0;k<10;k++){const x=-40+k*9+(r()-.5)*3,z=-46-r()*4;const b=slab(6+r()*3,4+r()*3,3);b.position.set(x,H(x,z)+1.5,z);G.add(b)}}
 /* 선운사 일주문 + 동백숲 (동쪽) */const SX=60,SZ=10;if(!mini){const h=buildHall({x:SX,z:SZ+14,ry:Math.PI,W:5,D:2.4,nx:1,nz:1,FY:.3,PH:3,base:false,stairs:'none',roof:'hip',name:'禪雲寺',pillar:0x9a3a26,bracket:'dapo',front:'open',back:'open',left:'open',right:'open',roofScale:.85,solids:[],light:false});G.add(h.group);const h2=buildHall({x:SX,z:SZ-12,ry:Math.PI,W:10,D:7,nx:3,nz:2,FY:1,PH:3.4,roof:'gable',name:'大雄寶殿',pillar:0x9a3a26,bracket:'dapo',front:'door',roofScale:.95,solids,light:false});G.add(h2.group);h2.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 {const lm=M(0x1f4a24),fm=M(0xd8241a,{roughness:.5});for(let i=0;i<34;i++){const x=SX-16+r()*32,z=SZ-34+r()*14;const t=new THREE.Mesh(new THREE.CylinderGeometry(.15,.22,2.4,6),M(0x5a4030));t.position.set(x,1.2,z);G.add(t);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(1.6,1),lm);c.position.set(x,3,z);c.scale.y=1.1;G.add(c);const im=new THREE.InstancedMesh(new THREE.SphereGeometry(.12,6,4),fm,10);const o=new THREE.Object3D();for(let k=0;k<10;k++){const a=r()*6.28,e=(r()-.3)*1.2;o.position.set(x+Math.cos(a)*1.65*Math.cos(e),3+Math.sin(e)*1.8,z+Math.sin(a)*1.65*Math.cos(e));o.updateMatrix();im.setMatrixAt(k,o.matrix)}G.add(im)}}
 const NL=[];if(!mini){for(const[x,z]of[[0,4],[SX,SZ-6],[SX,SZ+18],[-30,-38]]){const L=new THREE.PointLight(0xffc080,0,22,1.5);L.position.set(x,H(x,z)+3,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(0,10,3.4,'고창 고인돌','청동기 시대 무덤이에요. 고창에는 440여 기가 모여 세계에서 가장 큰 고인돌 무리를 이뤄요(2000년 세계유산). 탁자식·바둑판식·개석식이 다 있어요. 간추려 지었어요.');
 sp(-30,-34,3,'채석장','뒷산 바위 벼랑에서 덮개돌을 떼어 냈어요. 바위 틈에 나무 쐐기를 박고 물을 부어 갈랐다고 해요. 덮개돌을 떼어 내 봐요.');
 sp(SX,SZ+20,3,'선운사','백제 때 세웠다고 전하는 절이에요. 대웅전 뒤 동백숲은 3천 그루쯤 되고, 봄이면 붉은 동백꽃이 통째로 떨어져요(천연기념물). 간추려 지었어요.');
 sp(30,30,2.4,'발굴 탐지 자리','고인돌 둘레 땅속에 청동기 사람들의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 덮개돌 떼어 내기(11/22): 바위에 그어진 금을 따라 눌러 쐐기 여섯을 박아요(고르게 박을수록 잘 갈라짐). 그다음 「물 붓기」를 눌러 쐐기를 불리면 쩍! 세 덮개돌, 75초 */
 window.__GCSPLIT=()=>{if(document.getElementById('gdP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(-30,-34,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('gdP')?[-30,H(-30,-40)+6,-30,-30,H(-30,-46)+2,-46,55]:null;
  const cv=document.createElement('canvas');cv.id='gdC';cv.style.cssText='position:fixed;inset:0;z-index:55;width:100%;height:100%;touch-action:none';document.body.appendChild(cv);const q=cv.getContext('2d');cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio;
  const N=3,TL=75,NW=6;let ri=0,wedges=[],water=0,phase='wedge',done=false,t0=performance.now()/1000,last=t0,scores=[],crack=null,splitT=0,pouring=false;
  const newRock=()=>{const a=-.4+Math.random()*.8;crack={a,cy:.5+(Math.random()-.5)*.1};wedges=[];water=0;phase='wedge';splitT=0};newRock();
  const box=()=>{const W=cv.width,Hh=cv.height;const w=Math.min(W*.9,Hh*.6),h=w*.62;return{x0:(W-w)/2,y0:Hh*.22,w,h}};
  const lineAt=u=>{const b=box();const cx=b.x0+u*b.w,cy=b.y0+b.h*crack.cy+(u-.5)*b.w*Math.tan(crack.a);return[cx,cy]};
  const d=document.createElement('div');d.id='gdP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:20px;z-index:60;background:#2a2620;border:3px solid #a8a090;border-radius:16px;padding:10px 14px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f0ece0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:280px;max-width:92vw;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#e8e0c8">🪨 덮개돌 떼어 내기</b><div id="gdS" style="font-size:13px;margin:2px 0"></div><div id="gdG" style="font-size:12px;color:#e8e0c8;margin:4px 0"></div><button id="gdW" style="width:100%;font:17px 'Do Hyeon',sans-serif;background:#4a7aa8;color:#fff;border:0;border-radius:12px;padding:10px 0;cursor:pointer;opacity:.4">💧 물 붓기(누르고 있기)</button><div id="gdT" style="font-size:13px;margin-top:4px">${TL}초</div>`;
  const wb=d.querySelector('#gdW');wb.onpointerdown=e=>{e.preventDefault();pouring=true};wb.onpointerup=wb.onpointerleave=()=>pouring=false;
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const even=()=>{if(wedges.length<2)return 1;const s=wedges.slice().sort((a,b)=>a-b);const gaps=[s[0]-.06,...s.slice(1).map((v,i)=>v-s[i]),.94-s[s.length-1]];const m=gaps.reduce((a,b)=>a+b,0)/gaps.length;const sd=Math.sqrt(gaps.reduce((a,b)=>a+(b-m)**2,0)/gaps.length);return Math.max(0,1-sd/m)};
  const info=()=>{d.querySelector('#gdS').textContent=(ri+1)+' / '+N+'번째 덮개돌 · 쐐기 '+wedges.length+' / '+NW;d.querySelector('#gdG').textContent=phase==='wedge'?'금을 따라 고르게 눌러 쐐기를 박아요':phase==='water'?'물을 부어 쐐기를 불려요! 고르게 박을수록 빨리 갈라져요':'쩍! 갈라졌어요';wb.style.opacity=phase==='water'?1:.4};info();
  const place=u=>{if(done||phase!=='wedge')return;u=Math.max(.06,Math.min(.94,u));if(wedges.some(w=>Math.abs(w-u)<.04))return;wedges.push(u);snd(700,.08,'square');if(wedges.length>=NW)phase='water';info()};
  cv.onpointerdown=e=>{const b=box();const X=e.clientX*devicePixelRatio,Y=e.clientY*devicePixelRatio;const u=(X-b.x0)/b.w;if(u<0||u>1)return;const[,ly]=lineAt(u);if(Math.abs(Y-ly)<b.h*.12)place(u)};
  const cleanup=()=>cv.remove();
  const fin=()=>{if(done)return;done=true;cleanup();const avg=scores.length?scores.reduce((a,b)=>a+b,0)/scores.length:0;const Q=scores.length>=N?Math.max(60,Math.round(60+avg*40)):Math.round(scores.length/N*55);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('gochang_split',Q,'덮개돌 떼어 내기')}catch(e){}window.__GDQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#e8e0c8">덮개돌 ${scores.length}개를 떼어 냈어요</b><div style="font-size:13px;margin:4px 0">떼어 낸 덮개돌은 통나무를 깔고 밧줄로 끌어 옮겼어요. 수십 톤 덮개돌을 옮기려면 수백 명이 힘을 모아야 해서, 고인돌은 큰 마을과 힘 있는 우두머리가 있었음을 보여 줘요.</div><div style="font-size:24px;color:#a8a090">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#a8a090;color:#2a2620;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f0ece0;border:2px solid #f0ece0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__GCSPLIT()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}const now=performance.now()/1000,dt=Math.min(.1,now-last);last=now;
   if(!done){if(phase==='water'&&pouring){water+=dt*(.25+even()*.45);if(((now*8)|0)%2)snd(1200+Math.random()*300,.03,'sine');if(water>=1){phase='split';splitT=0;scores.push(even());snd(90,.6,'sawtooth');info()}}
    if(phase==='split'){splitT+=dt;if(splitT>1.2){ri++;if(ri>=N){fin();return}newRock();info()}}
    const left=Math.max(0,TL-(now-t0));d.querySelector('#gdT').textContent=Math.ceil(left)+'초';if(left<=0){fin();return}
    const W=cv.width,Hh=cv.height,b=box();q.clearRect(0,0,W,Hh);q.fillStyle='rgba(20,18,14,.45)';q.fillRect(0,0,W,Hh);
    const off=phase==='split'?Math.min(1,splitT*2)*b.h*.08:0;const pts=[];for(let k=0;k<=20;k++)pts.push(lineAt(k/20));
    const half=(up)=>{q.fillStyle=up?'#8a8478':'#7a7468';q.beginPath();q.moveTo(b.x0,up?b.y0:b.y0+b.h);for(const[x,y]of(up?pts:pts.slice().reverse()))q.lineTo(x,y+(up?-off:off));q.lineTo(up?b.x0+b.w:b.x0,up?b.y0:b.y0+b.h);q.closePath();q.fill();q.strokeStyle='#4a4438';q.lineWidth=3;q.stroke()};
    half(true);half(false);
    q.setLineDash([10,8]);q.strokeStyle=phase==='wedge'?'#ffe080':'rgba(40,30,20,.8)';q.lineWidth=4;q.beginPath();pts.forEach(([x,y],k)=>k?q.lineTo(x,y):q.moveTo(x,y));q.stroke();q.setLineDash([]);
    const sw=1+water*.8;for(const u of wedges){const[x,y]=lineAt(u);q.fillStyle=water>0?`rgb(${150-water*40},${110-water*30},${70})`:'#a87a48';q.fillRect(x-b.w*.012*sw,y-b.h*.08,b.w*.024*sw,b.h*.16)}
    if(phase==='water'){q.fillStyle='rgba(255,255,255,.2)';q.fillRect(b.x0,b.y0+b.h+12,b.w,10);q.fillStyle='#4a9ad8';q.fillRect(b.x0,b.y0+b.h+12,b.w*water,10)}}
   requestAnimationFrame(loop)};loop();
  window.__GDG={place,set pouring(v){pouring=v},get phase(){return phase},get ri(){return ri}};try{ctx.say('바위 금을 따라 쐐기를 박아요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'간돌검',h:'돌을 갈아 만든 칼이에요. 고인돌 무덤에서 자주 나와요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.3,.02,.05),M(0x6a6a6a)))})},
  {n:'민무늬토기 조각',h:'청동기 시대 무늬 없는 토기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.1,.14,12,1,true),M(0x9a7a5a,{side:THREE.DoubleSide})))})},
  {n:'반달돌칼',h:'이삭을 따던 반달 모양 돌칼이에요. 구멍 두 개에 끈을 꿰었어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.02,16,1,false,0,Math.PI),M(0x7a7468)))})},
  {n:'비파형 동검 조각',h:'비파처럼 생긴 청동 칼 조각이에요. 힘 있는 사람만 가졌어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.015,.06),M(0x5a7a5a,{metalness:.6})))})},
  {n:'가락바퀴',h:'실을 잣던 흙 가락바퀴예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.03,14),M(0x8a6a4a)))})}];
 window.__GCDDIG=()=>{window.__DETECT&&window.__DETECT({key:'gochangdol_dig',title:'고창 고인돌 발굴 탐지',emoji:'⛏️',bg:'#2a2620',count:4,TL:150,cand:[[30,30],[-50,30],[10,40],[-20,44],[40,-6],[-64,10],[20,24],[-36,30]],items:ITEMS,intro:'고인돌 둘레 땅속에 청동기 사람들의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'고창은 청동기 시대 큰 마을이 있던 곳이에요.'})};
 const meta={quest:{t:'고창 고인돌 둘러보기',d:'고인돌 세 꼴과 채석장, 선운사를 둘러보세요.',steps:[['고인돌','고창 고인돌'],['채석장','채석장'],['선운사','선운사']]},
  title:'고창 고인돌·선운사',hint:'세계유산 고창 고인돌 무리(탁자식·바둑판식·개석식)와 선운사 동백숲을 간추려 지었어요. 쐐기와 물로 덮개돌을 떼어 내 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:20,z:22,lines:['고창 고인돌·선운사','세계유산 고인돌 유적','탁자식·바둑판식·개석식','간추려 지음']}},
  npc:[['science',[[16,20],[24,20],[24,28],[16,28]]]],bounds:[-90,90,-80,90],level:()=>'고창',camCap:()=>Infinity,baseAt:(x,z)=>H(x,z),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#6a7a3a';g.fillRect(0,0,300,Z(-30));g.fillStyle='#7a7468';for(const[x,z]of DOL)g.fillRect(X(x)-3,Z(z)-2,6,4);g.fillStyle='#1f4a24';g.fillRect(X(SX-16),Z(SZ-34),32*S,14*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:20,z:26,yaw:Math.PI},size:{}},meta)}
