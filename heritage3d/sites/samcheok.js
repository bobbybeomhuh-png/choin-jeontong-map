/* 삼척 죽서루·환선굴 마당(2026-11-22, W38): 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   죽서루(국보, 관동팔경의 으뜸): 오십천 벼랑 위 자연 암반에 지은 누각. 땅을 고르지 않고 울퉁불퉁한 바위 높이에 맞춰 길이가 서로 다른 기둥 17개를 세움(그중 일부는 바위에 바로, 일부는 주춧돌 위에).
   환선굴(천연기념물): 대이리 동굴지대의 큰 석회동굴. 여기서는 입구만 간추림.
   놀이: 죽서루 기둥 길이 맞추기(바위 높이를 보고 알맞은 길이 기둥을 골라 마루를 평평하게), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildSamcheok(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1266);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 오십천(동쪽 x>24 아래로 6m 벼랑) */const RX=24;const H=(x,z)=>x>RX+6?-6:x>RX?-6*Math.min(1,(x-RX)/6):0;
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(220,220,110,110);g.rotateX(-Math.PI/2);const p=g.attributes.position;const col=[];const c=new THREE.Color();for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);p.setY(k,H(x,z));c.set(x>RX?'#8a8478':'#7a9a4a');col.push(c.r,c.g,c.b)}g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1,flatShading:true}));m.receiveShadow=true;G.add(m)}
 {const WT=tex(128,128,(q,w,h)=>{q.fillStyle='#4a8088';q.fillRect(0,0,w,h);for(let i=0;i<60;i++){q.strokeStyle='rgba(230,245,250,.25)';const x=Math.random()*w,y=Math.random()*h;q.beginPath();q.moveTo(x,y);q.lineTo(x,y+12);q.stroke()}},[3,12]);WT.wrapS=WT.wrapT=THREE.RepeatWrapping;const rv=new THREE.Mesh(new THREE.PlaneGeometry(60,240),new THREE.MeshStandardMaterial({map:WT,roughness:.1}));rv.rotation.x=-Math.PI/2;rv.position.set(RX+36,-5.6,0);G.add(rv);solids.push({x0:RX+.5,x1:200,y0:-10,y1:20,z0:-200,z1:200})}
 /* 죽서루: 울퉁불퉁 바위 위, 길이 다른 기둥 */const JX=8,JZ=0,FL=3.2;const ROCK=[];{const rk=M(0x8a8070,{flatShading:true});for(let i=0;i<5;i++)for(let j=0;j<3;j++){const x=JX-8+i*4,z=JZ-3+j*3;const h=.3+Math.abs(Math.sin(i*1.7+j*2.3))*1.6;ROCK.push([x,z,h]);const b=new THREE.Mesh(new THREE.DodecahedronGeometry(1.3,0),rk);b.scale.set(1.3,h/1.3*1.2,1.1);b.position.set(x,h*.45,z);G.add(b);const p=new THREE.Mesh(new THREE.CylinderGeometry(.22,.26,FL-h,10),M(0x8a5a38));p.position.set(x,h+(FL-h)/2,z);G.add(p)}
  const fl=new THREE.Mesh(new THREE.BoxGeometry(18,.3,8),M(0x9a7048));fl.position.set(JX,FL+.15,JZ);G.add(fl);
  if(!mini){const h=buildHall({x:JX,z:JZ,ry:0,W:16,D:7,nx:5,nz:2,FY:.02,PH:3,base:false,stairs:'none',roof:'hip',name:'竹西樓',pillar:0x8a5a38,bracket:'ik',front:'open',back:'open',left:'open',right:'open',rail:true,roofScale:.95,solids:[],light:false});h.group.position.y=FL+.3;G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
  solids.push({x0:JX-9,x1:JX+9,y0:0,y1:FL,z0:JZ-4,z1:JZ+4})}
 /* 환선굴 입구(서쪽 산 아래) */{const mt=new THREE.Mesh(new THREE.SphereGeometry(26,24,12,0,Math.PI*2,0,Math.PI/2),M(0x5f8a3a,{flatShading:true}));mt.scale.y=.6;mt.position.set(-60,0,-50);G.add(mt);const hole=new THREE.Mesh(new THREE.CircleGeometry(3.4,20),M(0x0e0c0a));hole.position.set(-48,3,-30);hole.lookAt(0,3,20);G.add(hole);solids.push({cx:-60,cz:-50,r:24,y0:0,y1:16})}
 const NL=[];if(!mini){for(const[x,y,z]of[[JX,FL+3,JZ],[-46,3,-26],[0,3,20]]){const L=new THREE.PointLight(0xffc080,0,24,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(JX-12,JZ+6,3,'죽서루','오십천 벼랑 위 바위에 지은 누각이에요(국보). 관동팔경 가운데 으뜸으로 꼽혀요. 땅을 고르지 않고 바위 높이에 맞춰 길이가 다른 기둥 17개를 세웠어요. 간추려 지었어요.');
 sp(JX-12,JZ-6,2.2,'기둥 맞추는 자리','바위마다 높이가 달라요. 알맞은 길이의 기둥을 골라 마루를 평평하게 맞춰 봐요.');
 sp(-44,-24,3,'환선굴','큰 석회동굴이에요(천연기념물). 굴 안에는 종유석·석순·폭포가 있어요. 입구만 간추려 지었어요.');
 sp(20,30,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 기둥 길이 맞추기(11/22): 옆에서 본 바위 위 기둥 자리 여섯. 자리마다 바위 높이가 달라요. 아래 기둥(길이 다름) 가운데 알맞은 것을 골라 세우면 맨 위가 마루 선에 닿아요. 세 판 */
 window.__SCPILLAR=()=>{if(document.getElementById('spP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(JX-12,JZ-6,0)}catch(e){}
  const cv=document.createElement('canvas');cv.id='spC';cv.style.cssText='position:fixed;inset:0;z-index:55;width:100%;height:100%;touch-action:none';document.body.appendChild(cv);const q=cv.getContext('2d');cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio;
  const N=6,RD=3,FLOOR=3.2;let rd=0,rocks=[],pool=[],placed=[],sel=-1,miss=0,done=false,res=[];
  const setup=()=>{rocks=Array.from({length:N},()=>Math.round((.3+Math.random()*1.8)*10)/10);pool=rocks.map(h=>Math.round((FLOOR-h)*10)/10);for(let k=0;k<3;k++)pool.push(Math.round((1.2+Math.random()*2.6)*10)/10);pool.sort(()=>Math.random()-.5);placed=Array(N).fill(-1);sel=-1;miss=0};setup();
  const d=document.createElement('div');d.id='spP';d.style.cssText="position:fixed;right:12px;top:80px;z-index:60;background:#2a2418;border:3px solid #c8a868;border-radius:16px;padding:10px 14px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:200px;user-select:none";document.body.appendChild(d);
  const render=msg=>{d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d890">🏛️ 기둥 길이 맞추기</b><div style="font-size:13px;margin:4px 0">${rd+1} / ${RD}판 · 세운 기둥 ${placed.filter(v=>v>=0).length}/${N}</div><div style="font-size:12px;color:#f0d890">${msg||'아래 기둥을 누르고 → 바위 자리를 눌러요'}</div>`};render();
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const pickPool=k=>{if(done||placed.includes(k))return;sel=k;snd(500,.06)};
  const pickSlot=i=>{if(done||sel<0||placed[i]>=0)return;const ok=Math.abs(rocks[i]+pool[sel]-FLOOR)<.05;if(ok){placed[i]=sel;snd(760,.15);sel=-1;render('딱 맞아요!');if(placed.every(v=>v>=0)){res.push(Math.max(.4,1-miss*.15));rd++;if(rd>=RD){fin();return}setup();render('다음 판! 바위가 바뀌었어요')}}else{miss++;snd(180,.3,'sawtooth');render(rocks[i]+pool[sel]>FLOOR?'너무 길어 마루가 솟아요':'너무 짧아 마루에 닿지 않아요')}};
  const lay=()=>{const W=cv.width,Hh=cv.height,S=Math.min(W*.13,Hh*.09);const gy=Hh*.58;return{W,Hh,S,gy,x:i=>W*.5+(i-(N-1)/2)*S*1.4,px:k=>W*.5+(k-(pool.length-1)/2)*S*.95}};
  cv.onpointerdown=e=>{const X=e.clientX*devicePixelRatio,Y=e.clientY*devicePixelRatio;const L=lay();if(Y>L.Hh*.72){let bk=-1,bd=L.S*.5;pool.forEach((p,k)=>{const dd=Math.abs(L.px(k)-X);if(dd<bd){bd=dd;bk=k}});if(bk>=0)pickPool(bk)}else{let bi=-1,bd=L.S*.7;for(let i=0;i<N;i++){const dd=Math.abs(L.x(i)-X);if(dd<bd){bd=dd;bi=i}}if(bi>=0)pickSlot(bi)}};
  const cleanup=()=>cv.remove();
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/RD*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('samcheok_pillar',Q,'죽서루 기둥 맞추기')}catch(e){}window.__SPQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0d890">기둥 맞추기 ${Q}점</b><div style="font-size:13px;margin:4px 0">죽서루는 자연을 깎아 내지 않고 바위 생김새에 건물을 맞췄어요. 옛 목수들은 주춧돌 모양에 맞춰 기둥 밑을 깎아 내는 「그랭이질」도 했어요.</div><div style="font-size:24px;color:#c8a868">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a868;color:#2a2418;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__SCPILLAR()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}if(done){requestAnimationFrame(loop);return}const L=lay();const{W,Hh,S,gy}=L;const u=S*.75;q.clearRect(0,0,W,Hh);q.fillStyle='rgba(30,26,18,.6)';q.fillRect(0,0,W,Hh);
   q.strokeStyle='#ffe080';q.setLineDash([10,6]);q.lineWidth=3;q.beginPath();q.moveTo(L.x(0)-S,gy-FLOOR*u);q.lineTo(L.x(N-1)+S,gy-FLOOR*u);q.stroke();q.setLineDash([]);q.fillStyle='#ffe080';q.font=`${Math.round(S*.3)}px "Do Hyeon",sans-serif`;q.fillText('마루 높이',L.x(0)-S,gy-FLOOR*u-8);
   for(let i=0;i<N;i++){const x=L.x(i);q.fillStyle='#8a8070';q.beginPath();q.moveTo(x-S*.65,gy);q.lineTo(x-S*.45,gy-rocks[i]*u);q.lineTo(x+S*.45,gy-rocks[i]*u+u*.1);q.lineTo(x+S*.65,gy);q.closePath();q.fill();q.fillStyle='#f0ece0';q.fillText(rocks[i].toFixed(1)+'m',x-S*.3,gy+S*.4);if(placed[i]>=0){q.fillStyle='#8a5a38';q.fillRect(x-S*.15,gy-FLOOR*u,S*.3,pool[placed[i]]*u)}}
   q.fillStyle='#5a4a34';q.fillRect(0,Hh*.72,W,Hh*.28);pool.forEach((p,k)=>{if(placed.includes(k))return;const x=L.px(k);q.fillStyle=k===sel?'#ffd040':'#a87a48';q.fillRect(x-S*.13,Hh*.95-p*u*.55,S*.26,p*u*.55);q.fillStyle='#f0ece0';q.fillText(p.toFixed(1),x-S*.2,Hh*.95-p*u*.55-6)});
   requestAnimationFrame(loop)};loop();
  window.__SPG={pickPool,pickSlot,get rocks(){return rocks},get pool(){return pool},get placed(){return placed},get rd(){return rd},FLOOR};try{ctx.say('바위에 맞는 기둥을 골라요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'막새 기와',h:'죽서루 지붕 끝 기와예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18),M(0x5a5a5a)))})},
  {n:'종유석 조각',h:'석회동굴 천장에서 자라는 종유석 조각이에요. 1cm 자라는 데 수십 년이 걸려요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.ConeGeometry(.04,.2,8),M(0xe8e0d0)))})},
  {n:'백자 잔',h:'누각에서 시를 지으며 쓰던 잔 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.06,.04,.06,12,1,true),M(0xf0ece0,{side:THREE.DoubleSide,roughness:.3})))})},
  {n:'쇠 못',h:'누각을 짜던 쇠 못이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.01,.015,.12,6),M(0x4a3a30,{metalness:.5})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__SCKDIG=()=>{window.__DETECT&&window.__DETECT({key:'samcheok_dig',title:'삼척 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[20,30],[-20,30],[0,50],[-30,10],[10,-30],[-10,50],[16,-50],[-36,30]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'삼척은 벼랑 위 누각과 땅속 동굴이 함께 있는 고장이에요.'})};
 const meta={quest:{t:'삼척 둘러보기',d:'죽서루와 환선굴 입구를 둘러보세요.',steps:[['죽서루','죽서루'],['환선굴','환선굴']]},
  title:'삼척 죽서루·환선굴',hint:'오십천 벼랑 위 죽서루(국보)와 환선굴 입구를 간추려 지었어요. 바위 높이에 맞춰 기둥을 골라 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,groundY:-7,sign:{x:-4,z:20,lines:['삼척 죽서루·환선굴','관동팔경의 으뜸','바위에 맞춘 기둥','간추려 지음']}},
  npc:[['science',[[-8,18],[0,18],[0,26],[-8,26]]]],bounds:[-90,RX,-90,90],level:()=>'삼척',camCap:()=>Infinity,baseAt:(x,z)=>Math.max(0,H(x,z)),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:-10,oz:0,draw(g,X,Z,S){g.fillStyle='#7a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#4a8088';g.fillRect(X(RX+6),0,300,300);g.fillStyle='#8a5a38';g.fillRect(X(JX-9),Z(JZ-4),18*S,8*S);g.fillStyle='#5f8a3a';g.beginPath();g.arc(X(-60),Z(-50),26*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-4,z:24,yaw:Math.PI},size:{}},meta)}
