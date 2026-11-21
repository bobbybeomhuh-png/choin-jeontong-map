/* 거제 옥포·해금강 마당(2026-11-22, W37): 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   옥포해전(1592.5.7): 임진왜란 때 이순신이 이끈 조선 수군의 첫 승리. 거제 옥포만에서 왜선 26척을 깨뜨림(옥포대첩 기념공원·옥포루).
   한산도대첩(1592.7.8): 거제와 통영 사이 좁은 견내량에 있던 왜선을 넓은 한산도 앞바다로 꾀어내 학의 날개처럼 펼친 학익진으로 크게 이김.
   해금강(명승): 거제 남쪽 바다의 바위섬, 십자 모양으로 뚫린 바다 동굴(십자동굴).
   놀이: 학익진 펼치기(적선이 견내량을 나오기 전에 판옥선을 학 날개 자리에 배치), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildGeoje(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1592);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 서쪽 언덕 공원(x<20), 동쪽 옥포만 바다 */const SEA=20;const ss=t=>t<=0?0:t>=1?1:t*t*(3-2*t);const H=(x,z)=>x>SEA?-3:6*ss((SEA-x)/50);
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(220,220,110,110);g.rotateX(-Math.PI/2);const p=g.attributes.position;const col=[];const c=new THREE.Color();for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);const h=H(x,z);p.setY(k,x>SEA+2?-3:Math.max(0,h));c.set(x>SEA-1?'#8a7a68':'#6a9a3a');col.push(c.r,c.g,c.b)}g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1}));m.receiveShadow=true;G.add(m)}
 const WT=tex(256,256,(q,w,h)=>{q.fillStyle='#2f6a86';q.fillRect(0,0,w,h);for(let i=0;i<220;i++){q.strokeStyle=`rgba(230,245,250,${.08+r()*.14})`;q.lineWidth=1+r()*2;const x=r()*w,y=r()*h;q.beginPath();q.moveTo(x,y);q.lineTo(x+18+r()*20,y);q.stroke()}},[10,10]);WT.wrapS=WT.wrapT=THREE.RepeatWrapping;
 {const sea=new THREE.Mesh(new THREE.PlaneGeometry(160,240),new THREE.MeshStandardMaterial({map:WT,roughness:.1,metalness:.2}));sea.rotation.x=-Math.PI/2;sea.position.set(SEA+80,-.6,0);G.add(sea);solids.push({x0:SEA+.5,x1:300,y0:-6,y1:40,z0:-200,z1:200})}
 /* 옥포대첩 기념탑 + 옥포루 */{const y=H(-10,0);const tw=new THREE.Mesh(new THREE.BoxGeometry(2,16,2),M(0xd8d0c0));tw.position.set(-10,y+8,0);G.add(tw);const tp=new THREE.Mesh(new THREE.ConeGeometry(1.6,3,4),M(0xd8d0c0));tp.rotation.y=Math.PI/4;tp.position.set(-10,y+17.5,0);G.add(tp);const bs=new THREE.Mesh(new THREE.BoxGeometry(6,1,6),M(0xb8b0a0));bs.position.set(-10,y+.5,0);G.add(bs);solids.push({x0:-13,x1:-7,y0:0,y1:y+20,z0:-3,z1:3})}
 if(!mini){const y=H(-24,-24);const h=buildHall({x:-24,z:-24,ry:-Math.PI/2,W:7,D:5,nx:3,nz:2,FY:1.6,PH:3,roof:'hip',name:'玉浦樓',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',stairs:'front',rail:true,roofScale:.9,solids,light:false});h.group.position.y=y;G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 /* 판옥선 셋(바다) */const mkPan=()=>{const s=new THREE.Group();const wd=M(0x6a4a2a);const hull=new THREE.Mesh(new THREE.BoxGeometry(20,2.6,7),wd);hull.position.y=.6;s.add(hull);const up=new THREE.Mesh(new THREE.BoxGeometry(16,2.2,7.6),M(0x7a5a38));up.position.y=3;s.add(up);for(let k=0;k<8;k++){const sh=new THREE.Mesh(new THREE.BoxGeometry(1.6,1,.1),M(0xc8b890));sh.position.set(-7+k*2,3,3.85);s.add(sh)}const pv=new THREE.Mesh(new THREE.BoxGeometry(5,2.2,4),M(0x9a3a26));pv.position.set(-3,5.2,0);s.add(pv);for(const x of[-5,4]){const ms=new THREE.Mesh(new THREE.CylinderGeometry(.18,.22,10,8),wd);ms.position.set(x,8,0);s.add(ms)}return s};
 const ships=[];for(const[x,z,ry]of[[44,-20,.3],[60,6,0],[46,30,-.3]]){const s=mkPan();s.position.set(x,-.6,z);s.rotation.y=ry;G.add(s);ships.push(s);s.traverse(e=>{if(e.isMesh)cam.push(e)})}
 /* 해금강 바위섬 + 십자동굴(남동) */{const rk=M(0x7a6e60,{flatShading:true});const isl=new THREE.Group();isl.position.set(90,-1,-60);for(let k=0;k<6;k++){const b=new THREE.Mesh(new THREE.DodecahedronGeometry(6+r()*4,0),rk);b.position.set((r()-.5)*14,4+r()*6,(r()-.5)*10);b.scale.y=1.4;isl.add(b)}const cv=new THREE.Mesh(new THREE.BoxGeometry(3,7,20),M(0x0e0c0a));cv.position.set(0,3,0);isl.add(cv);const cv2=new THREE.Mesh(new THREE.BoxGeometry(20,7,3),M(0x0e0c0a));cv2.position.set(0,3,0);isl.add(cv2);G.add(isl)}
 const NL=[];if(!mini){for(const[x,y,z]of[[-10,3,4],[-24,4,-20],[44,6,-20],[60,6,6]]){const L=new THREE.PointLight(0xffc080,0,24,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0,tt=0;const nightTick=dt=>{tt+=dt;const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7;WT.offset.x+=dt*.008;ships.forEach((s,i)=>{s.position.y=-.6+Math.sin(tt*.8+i)*.15})};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:Math.max(0,H(x,z)),z,r:rr,t,h});
 sp(-10,6,3,'옥포대첩 기념탑','1592년 5월 7일, 이순신이 이끈 조선 수군이 이곳 옥포만에서 왜선 26척을 깨뜨린 첫 승리를 기려요.');
 sp(-24,-17,3,'옥포루','옥포 바다를 내려다보는 누각이에요. 간추려 지었어요.');
 sp(14,10,2.4,'학익진 펼치는 자리','한산도대첩에서 이순신은 거제와 통영 사이 좁은 견내량의 왜선을 넓은 바다로 꾀어내, 학이 날개를 펼친 모양(학익진)으로 둘러싸 크게 이겼어요. 판옥선을 학 날개 자리에 배치해 봐요.');
 sp(16,-40,3,'해금강','거제 남쪽 바다의 바위섬이에요(명승). 바위 사이로 십자 모양 바다 동굴이 뚫려 있어요. 간추려 지었어요.');
 sp(-50,30,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 학익진 펼치기(11/22): 위에서 본 바다. 아래쪽 판옥선을 누르고 → 날개 자리(점선 원)를 눌러 옮겨요. 적선이 좁은 물길(위)에서 다 나오기 전에 여덟 척을 모두 자리에 두고 「쏴라!」. 세 판 */
 window.__GJHAK=()=>{if(document.getElementById('gjP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(14,10,0)}catch(e){}
  const cv=document.createElement('canvas');cv.id='gjC';cv.style.cssText='position:fixed;inset:0;z-index:55;width:100%;height:100%;touch-action:none';document.body.appendChild(cv);const q=cv.getContext('2d');cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio;
  const N=8,RD=3;let rd=0,sel=-1,done=false,res=[],enemy=0,last=performance.now()/1000;let ships=[],slots=[];
  const setup=()=>{slots=[];for(let i=0;i<N;i++){const a=Math.PI*(.12+.76*i/(N-1));slots.push({x:.5-Math.cos(a)*.4,y:.62-Math.sin(a)*.22,f:-1})}ships=[];for(let i=0;i<N;i++)ships.push({x:.1+i*.8/(N-1)+(Math.random()-.5)*.03,y:.9,s:-1});sel=-1;enemy=0};setup();
  const d=document.createElement('div');d.id='gjP';d.style.cssText="position:fixed;right:12px;top:80px;z-index:60;background:#14222a;border:3px solid #c8a050;border-radius:16px;padding:10px 14px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#e8f4f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:200px;user-select:none";document.body.appendChild(d);
  const render=msg=>{d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d080">🦢 학익진 펼치기</b><div style="font:15px 'Do Hyeon',sans-serif;margin:4px 0">${rd+1} / ${RD}판 · 자리 ${slots.filter(s=>s.f>=0).length}/${N}</div><div style="font-size:12px;color:#f0d080">${msg||'배를 누르고 → 자리를 눌러요'}</div><button id="gjF" style="width:100%;margin-top:6px;font:17px 'Do Hyeon',sans-serif;background:#c83a2a;color:#fff;border:0;border-radius:12px;padding:8px 0;cursor:pointer">💥 쏴라!</button>`;d.querySelector('#gjF').onclick=fire};
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const pickShip=i=>{if(done)return;sel=i;snd(500,.08)};
  const pickSlot=j=>{if(done||sel<0)return;const sh=ships[sel];if(slots[j].f>=0&&slots[j].f!==sel){const o=slots[j].f;ships[o].s=-1;ships[o].x=sh.x;ships[o].y=sh.y}if(sh.s>=0)slots[sh.s].f=-1;slots[j].f=sel;sh.s=j;sh.x=slots[j].x;sh.y=slots[j].y;sel=-1;snd(700,.1);render()};
  const fire=()=>{if(done)return;const placed=slots.filter(s=>s.f>=0).length;const timing=enemy;const score=placed===N?(timing>=.5&&timing<=.9?1:.7):placed/N*.5;res.push(score);snd(120,.6,'sawtooth');setTimeout(()=>{},0);rd++;if(rd>=RD){fin();return}setup();render(placed===N?(timing>=.5?'적선을 넓은 바다로 끌어내 둘러쌌어요!':'조금 일찍 쐈어요. 적을 더 끌어내요'):'자리가 덜 찼어요')};
  const hit=(cx,cy)=>{const W=cv.width,Hh=cv.height,X=cx*devicePixelRatio/W,Y=cy*devicePixelRatio/Hh;let bi=-1,bd=.05;ships.forEach((s,i)=>{const dd=Math.hypot(s.x-X,(s.y-Y)*Hh/W);if(dd<bd){bd=dd;bi=i}});if(bi>=0){pickShip(bi);return}let si=-1;bd=.05;slots.forEach((s,j)=>{const dd=Math.hypot(s.x-X,(s.y-Y)*Hh/W);if(dd<bd){bd=dd;si=j}});if(si>=0)pickSlot(si)};
  cv.onpointerdown=e=>hit(e.clientX,e.clientY);
  const cleanup=()=>cv.remove();
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/RD*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('geoje_hak',Q,'학익진 펼치기')}catch(e){}window.__GJQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0d080">학익진 ${Q}점</b><div style="font-size:13px;margin:4px 0">한산도대첩에서 조선 수군은 왜선 59척을 깨뜨리거나 사로잡았어요. 판옥선의 단단함과 화포, 학익진이 함께 만든 승리예요.</div><div style="font-size:24px;color:#c8a050">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a050;color:#14222a;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#e8f4f8;border:2px solid #e8f4f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__GJHAK()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  render();
  const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}const now=performance.now()/1000,dt=Math.min(.1,now-last);last=now;const W=cv.width,Hh=cv.height,S=Math.min(W,Hh);
   if(!done){enemy=Math.min(1,enemy+dt/(16-rd*2.5));if(enemy>=1){res.push(slots.filter(s=>s.f>=0).length/N*.4);rd++;snd(160,.5,'sawtooth');if(rd>=RD){fin();return}setup();render('적이 먼저 다 나와 버렸어요!')}
    q.clearRect(0,0,W,Hh);q.fillStyle='rgba(30,90,120,.92)';q.fillRect(0,0,W,Hh);q.fillStyle='#6a8a4a';q.fillRect(0,0,W*.38,Hh*.12);q.fillRect(W*.62,0,W*.38,Hh*.12);q.fillStyle='#f0e8d0';q.font=`${Math.round(S*.035)}px "Do Hyeon",sans-serif`;q.fillText('견내량',W*.43,Hh*.05);
    const ne=Math.round(enemy*10);for(let k=0;k<ne;k++){const ex=.42+(k%3)*.08,ey=.08+Math.floor(k/3)*.06*enemy*2.4;q.fillStyle='#2a2a2a';q.fillRect(ex*W-S*.015,ey*Hh,S*.03,S*.05)}
    for(const s of slots){q.strokeStyle=s.f>=0?'rgba(255,224,128,.25)':'#ffe080';q.setLineDash([6,5]);q.lineWidth=2;q.beginPath();q.arc(s.x*W,s.y*Hh,S*.03,0,7);q.stroke();q.setLineDash([])}
    ships.forEach((s,i)=>{q.fillStyle=i===sel?'#ffd040':'#8a5a30';q.beginPath();q.ellipse(s.x*W,s.y*Hh,S*.018,S*.034,0,0,7);q.fill();q.fillStyle='#c83a2a';q.fillRect(s.x*W-S*.008,s.y*Hh-S*.01,S*.016,S*.016)});
    q.fillStyle='rgba(255,255,255,.2)';q.fillRect(W*.1,Hh*.15,W*.8,8);q.fillStyle=enemy>=.5&&enemy<=.9?'#5ad05a':'#e8a040';q.fillRect(W*.1,Hh*.15,W*.8*enemy,8)}
   requestAnimationFrame(loop)};loop();
  window.__GJG={pickShip,pickSlot,fire,get enemy(){return enemy},get rd(){return rd}};try{ctx.say('학 날개 모양으로 배를 펼쳐요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'천자총통 포탄',h:'판옥선의 큰 화포 천자총통이 쏘던 쇠 포탄이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.08,12,8),M(0x3a3a3a,{metalness:.6})))})},
  {n:'조선 화살촉',h:'조선 수군의 쇠 화살촉이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.ConeGeometry(.03,.14,4),M(0x5a4a3a,{metalness:.5}));m.rotation.z=Math.PI/2;g.add(m)})},
  {n:'배 못',h:'판옥선을 짜 맞추던 나무못이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,.2,6),M(0x6a4a2a)))})},
  {n:'분청사기 조각',h:'조선 초 분청사기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.16,.1,.1,14,1,true),M(0xa8a090,{side:THREE.DoubleSide})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__GJDIG=()=>{window.__DETECT&&window.__DETECT({key:'geoje_dig',title:'거제 발굴 탐지',emoji:'⛏️',bg:'#14222a',count:4,TL:150,cand:[[-50,30],[-40,-40],[-60,0],[-30,40],[-70,-20],[0,30],[-20,-50],[-70,40]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'거제 바다는 조선 수군이 나라를 지킨 바다예요.'})};
 const meta={quest:{t:'옥포 둘러보기',d:'기념탑과 옥포루, 판옥선과 해금강을 둘러보세요.',steps:[['기념탑','옥포대첩 기념탑'],['옥포루','옥포루'],['해금강','해금강']]},
  title:'거제 옥포·해금강',hint:'옥포대첩 기념공원과 해금강을 간추려 지었어요. 판옥선을 학익진으로 펼쳐 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,groundY:-3.5,sign:{x:4,z:16,lines:['거제 옥포·해금강','1592 옥포해전 첫 승리','학익진 · 판옥선','간추려 지음']}},
  npc:[['science',[[0,14],[8,14],[8,22],[0,22]]]],bounds:[-90,SEA,-90,90],level:()=>'거제',camCap:()=>Infinity,baseAt:(x,z)=>Math.max(0,H(x,z)),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.1,ox:-10,oz:0,draw(g,X,Z,S){g.fillStyle='#6a9a3a';g.fillRect(0,0,300,300);g.fillStyle='#2f6a86';g.fillRect(X(SEA),0,300,300);g.fillStyle='#d8d0c0';g.fillRect(X(-11),Z(-1),3,3)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:4,z:20,yaw:Math.PI},size:{}},meta)}
