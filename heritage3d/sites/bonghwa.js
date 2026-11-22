/* 봉화 마당(2026-11-22, W70): 닭실마을 청암정(연못 속 거북 바위 위 정자), 청량사(바위 봉우리 아래 절), 송이 공판장.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음.
   청암정(명승): 충재 권벌이 거북 모양 바위 위에 지은 정자. 둘레에 연못을 파고 돌다리를 놓았어요.
   청량사: 청량산 열두 봉우리 아래 바위 벼랑에 기대 지은 절.
   봉화 송이: 소나무 숲에서 나는 송이버섯. 공판장에서 길이와 갓이 핀 정도로 등급을 나눠요(놀이는 간추린 규칙).
   놀이: 송이 등급 나누기(실제 크기 송이를 1cm 눈금판 위에서 재고 갓을 보고 네 바구니에 나눠 담기, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildBonghwa(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1526);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x7a9448,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 소나무(춘양목) 숲 */{const TR=M(0x8a4a2a),LF=M(0x2a5a30);for(let i=0;i<46;i++){const a=r()*Math.PI*2,d=40+r()*40;const x=Math.cos(a)*d,z=Math.sin(a)*d*.8-10;if(x>30&&z<-20)continue;const h=7+r()*5;const t=new THREE.Mesh(new THREE.CylinderGeometry(.18,.3,h,6),TR);t.position.set(x,h/2,z);t.rotation.z=(r()-.5)*.15;G.add(t);for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(1.8-k*.4,1.4,7),LF);c.scale.y=.6;c.position.set(x+(r()-.5),h-1.4+k*.8,z+(r()-.5));G.add(c)}solids.push({cx:x,cz:z,r:.4,y0:0,y1:h})}}
 /* 닭실마을 청암정: 연못 + 거북 바위 + 정자 + 돌다리 */const CX=-22,CZ=-20;{const pond=new THREE.Mesh(new THREE.CircleGeometry(10,40),M(0x4a6a6a,{roughness:.15,metalness:.1}));pond.rotation.x=-Math.PI/2;pond.position.set(CX,.04,CZ);G.add(pond);
  const rock=new THREE.Mesh(new THREE.SphereGeometry(5,14,10),M(0x8a8478,{flatShading:true}));rock.scale.set(1.1,.32,.9);rock.position.set(CX,.2,CZ);G.add(rock);cam.push(rock);
  solids.push({cx:CX,cz:CZ,r:9.8,y0:-1,y1:1.7});
  if(!mini){const h=buildHall({x:CX,z:CZ,ry:0,W:6,D:4.5,nx:3,nz:2,FY:1.6,PH:2.6,roof:'hip',name:'靑巖亭',pillar:0x7a5a3a,bracket:'ik',front:'open',roofScale:1,solids:[],light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
  const br=new THREE.Mesh(new THREE.BoxGeometry(1.4,.3,6.4),M(0xa8a296));br.position.set(CX,.7,CZ+6.4);br.rotation.x=.12;G.add(br);
  const wall=M(0xc8b898);for(const[x0,x1]of[[CX-14,CX-3],[CX+3,CX+14]]){const w=new THREE.Mesh(new THREE.BoxGeometry(x1-x0,1.5,.4),wall);w.position.set((x0+x1)/2,.75,CZ+12);G.add(w);solids.push({x0,x1,y0:0,y1:1.5,z0:CZ+11.8,z1:CZ+12.2})}}
 /* 청량사: 바위 벼랑 + 작은 법당 + 오층석탑 */const QX=34,QZ=-44;{const RK=M(0x7a7468,{flatShading:true});for(let i=0;i<8;i++){const h=10+r()*12;const m=new THREE.Mesh(new THREE.CylinderGeometry(2+r()*2,3+r()*2,h,6),RK);m.position.set(QX-16+i*4.5,h/2,QZ-10-r()*4);G.add(m)}
  if(!mini){const h=buildHall({x:QX,z:QZ,ry:0,W:8,D:5,nx:3,nz:2,FY:.9,PH:2.8,roof:'gable',name:'琉璃寶殿',pillar:0x8a3a26,bracket:'ik',front:'door',roofScale:1,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
  const SM=M(0x9a948a,{flatShading:true});const g=new THREE.Group();g.position.set(QX,0,QZ+7);let y=0;const b=new THREE.Mesh(new THREE.BoxGeometry(2,.8,2),SM);b.position.y=.4;g.add(b);y=.8;for(let k=0;k<5;k++){const w=1.1-k*.12;const bd=new THREE.Mesh(new THREE.BoxGeometry(w,.55,w),SM);bd.position.y=y+.27;g.add(bd);y+=.55;const rf=new THREE.Mesh(new THREE.BoxGeometry(w+.7,.15,w+.7),SM);rf.position.y=y+.07;g.add(rf);y+=.17}G.add(g);solids.push({cx:QX,cz:QZ+7,r:1.2,y0:0,y1:y})}
 /* 송이 공판장: 천막 + 탁자 + 눈금판 + 바구니 넷 */const SX=14,SZ=6;const TBY=.9;
 {const tent=new THREE.Mesh(new THREE.ConeGeometry(5,2,4),M(0xe8e0d0,{side:THREE.DoubleSide}));tent.rotation.y=Math.PI/4;tent.position.set(SX,3.6,SZ);G.add(tent);for(const[dx,dz]of[[-3.4,-3.4],[3.4,-3.4],[3.4,3.4],[-3.4,3.4]]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,2.6,6),M(0x8a8a8a));p.position.set(SX+dx,1.3,SZ+dz);G.add(p)}
  const tb=new THREE.Mesh(new THREE.BoxGeometry(2.4,.06,1),M(0x8a6a44));tb.position.set(SX,TBY-.03,SZ);G.add(tb);for(const[dx,dz]of[[-1.1,-.4],[1.1,-.4],[1.1,.4],[-1.1,.4]]){const l=new THREE.Mesh(new THREE.BoxGeometry(.06,TBY,.06),M(0x6a4a30));l.position.set(SX+dx,TBY/2-.03,SZ+dz);G.add(l)}solids.push({x0:SX-1.2,x1:SX+1.2,y0:0,y1:TBY,z0:SZ-.5,z1:SZ+.5})}
 const GRID=tex(256,128,(q,w,h)=>{q.fillStyle='#f4f0e4';q.fillRect(0,0,w,h);q.strokeStyle='#c8b898';q.lineWidth=1;for(let x=0;x<=w;x+=16){q.beginPath();q.moveTo(x,0);q.lineTo(x,h);q.stroke()}for(let y=0;y<=h;y+=16){q.beginPath();q.moveTo(0,y);q.lineTo(w,y);q.stroke()}q.strokeStyle='#8a5a3a';q.lineWidth=2;for(let x=0;x<=w;x+=80){q.beginPath();q.moveTo(x,0);q.lineTo(x,h);q.stroke()}q.fillStyle='#8a5a3a';q.font='bold 11px sans-serif';for(let k=0;k<=3;k++)q.fillText(k*5+'cm',k*80+2,12)});
 /* 눈금판: 16cm × 8cm, 1칸=1cm */const board=new THREE.Mesh(new THREE.PlaneGeometry(.16,.08),new THREE.MeshStandardMaterial({map:GRID}));board.rotation.x=-Math.PI/2;board.position.set(SX,TBY+.002,SZ);G.add(board);const BX0=SX-.08;
 const BASK=[{n:'1등',c:0xc8a040},{n:'2등',c:0x9aa860},{n:'3등',c:0x8a9aa8},{n:'등외',c:0x9a6a5a}];const baskets=[];
 BASK.forEach((b,k)=>{const g=new THREE.Group();g.position.set(SX-.066+k*.044,TBY,SZ+.066);const bk=new THREE.Mesh(new THREE.CylinderGeometry(.019,.015,.025,16,1,true),M(0xb89a68,{side:THREE.DoubleSide}));bk.position.y=.0125;g.add(bk);const bt=new THREE.Mesh(new THREE.CircleGeometry(.015,16),M(0x9a7a4a));bt.rotation.x=-Math.PI/2;bt.position.y=.002;g.add(bt);const LT=tex(128,48,(q,w,h)=>{q.fillStyle='#'+b.c.toString(16).padStart(6,'0');q.fillRect(0,0,w,h);q.fillStyle='#1a1410';q.font='bold 30px sans-serif';q.textAlign='center';q.fillText(b.n,w/2,36)});const lb=new THREE.Mesh(new THREE.PlaneGeometry(.036,.0135),new THREE.MeshStandardMaterial({map:LT}));lb.position.set(0,.03,.021);lb.rotation.x=-.5;g.add(lb);G.add(g);baskets.push(g)});
 /* 송이 한 개: L(cm 길이), o(갓 핀 정도 0~1), bug(상처) */const makePine=(L,o,bug)=>{const g=new THREE.Group();const cm=.01;const sd=1.5*cm+(L-5)*.08*cm;const stem=new THREE.Mesh(new THREE.CylinderGeometry(sd*.9,sd*1.15,L*cm*.82,14),M(0xe8dcc4,{roughness:.7}));stem.rotation.z=Math.PI/2;stem.position.x=L*cm*.41;g.add(stem);
  const capR=sd*(1.15+o*1.5),capL=L*cm*.2*(1-o*.4);const cap=new THREE.Mesh(new THREE.SphereGeometry(1,16,12,0,Math.PI*2,0,Math.PI*(.55+o*.0)),M(0x6a4a30,{roughness:.6}));cap.scale.set(capR,capL+sd*.2,capR);cap.rotation.z=-Math.PI/2;cap.position.x=L*cm*.8;g.add(cap);
  if(o>0){const gill=new THREE.Mesh(new THREE.CircleGeometry(capR*.95,16),M(0xf0e8d8,{side:THREE.DoubleSide}));gill.rotation.y=Math.PI/2;gill.position.x=L*cm*.8+.001;g.add(gill)}
  if(bug){for(let k=0;k<3;k++){const s=new THREE.Mesh(new THREE.CircleGeometry(sd*.35,8),M(0x2a1a10));s.position.set(L*cm*(.2+k*.18),sd*1.02,0);s.rotation.x=-Math.PI/2;g.add(s)}}
  g.traverse(e=>{if(e.isMesh)e.castShadow=true});return g};
 const gradeOf=(L,o,bug)=>bug||o>.34?3:o>0?2:L>=8?0:L>=6?1:2;
 const NL=[];if(!mini){for(const[x,y,z]of[[CX,3,CZ+10],[QX,4,QZ+10],[SX,3,SZ+3]]){const L=new THREE.PointLight(0xffc080,0,24,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8)};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(CX,CZ+14,3.2,'닭실마을 청암정','충재 권벌이 거북 모양 바위 위에 지은 정자예요(명승). 둘레에 연못을 파고 돌다리를 놓았어요. 닭실마을은 한과로도 이름나요. 간추려 지었어요.');
 sp(QX,QZ+11,3,'청량사','청량산 열두 봉우리 아래 바위 벼랑에 기대 지은 절이에요. 간추려 지었어요.');
 sp(SX,SZ+2.4,2,'송이 공판장','봉화 소나무 숲에서 딴 송이를 길이와 갓 핀 정도로 등급을 나눠 봐요.');
 sp(-50,30,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 송이 등급 나누기(11/22): 송이 열 개. 눈금판(1칸 1cm) 위에 놓인 송이를 보고 바구니를 골라요.
    간추린 규칙: 갓이 많이 피었거나(1/3 넘게) 상처가 있으면 등외 · 갓이 조금 피었으면 3등 · 갓이 닫혔으면 8cm 넘으면 1등, 6~8cm 2등, 6cm 안 되면 3등 */
 window.__BHSONG=()=>{if(document.getElementById('bhP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(SX+2.2,SZ+2.2,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('bhP')?[SX,TBY+.33,SZ+.25,SX,TBY,SZ+.03,50]:null;
  let n=0,cur=null,info=null,done=false,auto=false,last=performance.now(),msg='',t=0,fly=null;const res=[];const N=10;
  const deck=[];for(let i=0;i<N;i++){const kind=i%5;let L,o=0,bug=false;if(kind===0){L=8.5+Math.random()*3.5}else if(kind===1){L=6.3+Math.random()*1.3}else if(kind===2){L=5+Math.random()*5;o=.12+Math.random()*.2}else if(kind===3){L=6+Math.random()*5;o=.45+Math.random()*.4}else{L=4+Math.random()*1.5}if(Math.random()<.15&&kind<2)bug=true;deck.push({L:+L.toFixed(1),o,bug})}deck.sort(()=>Math.random()-.5);
  const show=()=>{if(cur)G.remove(cur);info=deck[n];cur=makePine(info.L,info.o,info.bug);cur.position.set(BX0+.005,TBY+.012,SZ);cur.rotation.y=0;G.add(cur);t=0};
  const d=document.createElement('div');d.id='bhP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#2a2418;border:3px solid #c8a040;border-radius:16px;padding:10px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f4f0e4;box-shadow:0 6px 18px rgba(0,0,0,.35);width:310px;max-width:94vw;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🍄 송이 등급 나누기</b><div data-i style="margin:3px 0;font:14px 'Do Hyeon',sans-serif"></div><div style="font-size:11px;line-height:1.5;color:#e8dcc0">갓 많이 핌·상처 → 등외 · 갓 조금 핌 → 3등<br>갓 닫힘: 8cm 넘으면 1등 · 6~8cm 2등 · 6cm 안 되면 3등</div><div style="display:flex;gap:5px;margin-top:7px">${BASK.map((b,k)=>`<button data-k="${k}" style="flex:1;font:16px 'Do Hyeon',sans-serif;background:#${b.c.toString(16).padStart(6,'0')};color:#1a1410;border:0;border-radius:10px;padding:10px 0;cursor:pointer">${b.n}</button>`).join('')}</div><div data-m style="font-size:12px;color:#f8e8a0;margin-top:5px">눈금 한 칸이 1cm예요</div>`;
  const iEl=d.querySelector('[data-i]'),mEl=d.querySelector('[data-m]');
  const snd=(f,len,type='sine',v=.05)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(v,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const pick=k=>{if(done||fly||!info)return;const want=gradeOf(info.L,info.o,info.bug);const ok=k===want;res.push(ok?1:0);const why=info.bug?'상처가 있어요':info.o>.34?'갓이 많이 피었어요':info.o>0?'갓이 조금 피었어요':`갓이 닫혔고 ${info.L}cm예요`;msg=ok?`맞아요! ${BASK[want].n}(${why})`:`${BASK[want].n}이에요. ${why}`;snd(ok?780:240,.22,ok?'sine':'sawtooth',ok?.05:.03);
   const p0=cur.position.clone(),b=baskets[k].position;fly={p0,p1:new THREE.Vector3(b.x-.02,b.y+.02,b.z),t:0}};
  d.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>pick(+b.dataset.k));
  const kd=e=>{const m={Digit1:0,Digit2:1,Digit3:2,Digit4:3}[e.code];if(m!=null)pick(m)};addEventListener('keydown',kd);
  const cleanup=()=>{removeEventListener('keydown',kd);if(cur)G.remove(cur);cur=null};
  show();
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;
   if(fly){fly.t+=dt*2;const f=Math.min(1,fly.t);cur.position.lerpVectors(fly.p0,fly.p1,f);cur.position.y+=Math.sin(f*Math.PI)*.08;cur.scale.setScalar(1-f*.3);if(f>=1){fly=null;n++;if(n>=N){fin();return}show()}}
   else if(cur){cur.rotation.x=Math.sin(now/700)*.25;if(auto&&t>.7)pick(gradeOf(info.L,info.o,info.bug))}
   iEl.textContent=`${Math.min(n+1,N)} / ${N}번째 송이 · 맞힌 것 ${res.filter(x=>x).length}`;mEl.textContent=msg||mEl.textContent;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/N*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('bonghwa_song',Q,'송이 등급 나누기')}catch(e){}window.__BHQ=Q;snd(660,.4);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">송이 열 개를 다 나눴어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">송이는 소나무 뿌리와 함께 자라 사람이 기르기 어려워요. 봉화·울진 같은 소나무 숲에서 가을에 따서, 공판장에서 길이와 갓 핀 정도를 보고 등급을 매겨요. 놀이 규칙은 간추린 것이에요.</div><div style="font-size:24px;color:#c8a040">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a040;color:#2a2418;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4f0e4;border:2px solid #f4f0e4;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__BHSONG()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__BHG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('길이와 갓을 잘 봐요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'한과 틀',h:'닭실마을 한과를 찍던 나무 틀 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.05,.1),M(0x8a6a44)))})},
  {n:'솔방울',h:'춘양목 소나무 솔방울이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.ConeGeometry(.06,.12,8),M(0x6a4a2a)))})},
  {n:'백자 접시',h:'조선 백자 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'문방 연적',h:'선비 방에서 먹을 갈 때 물을 붓던 연적이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.08,12,8),M(0xd8e0d8,{roughness:.3})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__BHDIG=()=>{window.__DETECT&&window.__DETECT({key:'bonghwa_dig',title:'봉화 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[-50,30],[-40,10],[0,30],[30,20],[-10,-40],[50,0],[20,40],[-30,40]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'봉화는 정자와 산사, 소나무와 송이의 고장이에요.'})};
 const meta={quest:{t:'봉화 둘러보기',d:'청암정과 청량사, 송이 공판장을 둘러보세요.',steps:[['청암정','닭실마을 청암정'],['청량사','청량사'],['공판장','송이 공판장']]},
  title:'봉화 청암정·청량사·송이',hint:'청암정·청량사·송이 공판장을 공개 사진으로 간추려 지었어요. 송이를 길이와 갓으로 등급 나눠 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-4,z:14,lines:['봉화','닭실마을 청암정','청량사 · 송이','간추려 지음']}},
  npc:[['science',[[-8,6],[6,6],[6,20],[-8,20]]]],bounds:[-90,80,-80,60],level:()=>'봉화',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#7a9448';g.fillRect(0,0,300,300);g.fillStyle='#4a6a6a';g.beginPath();g.arc(X(CX),Z(CZ),10*S,0,7);g.fill();g.fillStyle='#8a3a26';g.fillRect(X(QX-4),Z(QZ-2.5),8*S,5*S);g.fillStyle='#e8e0d0';g.fillRect(X(SX-3.4),Z(SZ-3.4),6.8*S,6.8*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:16,yaw:Math.PI},size:{}},meta)}
