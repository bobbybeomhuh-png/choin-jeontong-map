/* 안동 병산서원 마당(2026-11-23, 2단계 덧붙이기): 서애 류성룡을 모신 서원(사적, 한국의 서원 유네스코 세계유산 2019).
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   복례문 → 만대루(앞면 7칸 2층 누각, 아래로 지나 들어감) → 마당 양쪽 동재·서재 → 강당 입교당 → 뒤 존덕사. 문밖 달팽이 모양 흙담 뒷간. 앞으로 낙동강과 병산 벼랑.
   놀이: 그랭이질(울퉁불퉁한 덤벙 주춧돌 위에 기둥을 세우려 기둥 밑을 쪽쪽 깎아 틈 없이 앉히기. 닿아 있는 쪽을 깎아야 기둥이 내려앉음, 크게 보기 놀이판, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {curvedRoof,buildHall} from './hallkit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildByeongsan(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1572);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x86a04c,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 낙동강·모래밭·병산 벼랑(남쪽) */{/* 11/28: 곧은 띠 두 장(강·모래밭) → 같은 굽이를 따르는 강과 모래톱(기슭은 따로 물결) */const RC=x=>60+Math.sin(x*.028+.7)*2.6+Math.sin(x*.09)*.9;const band=(f0,f1,y,mat)=>{const pos=[],idx=[];let k=0;for(let x=-110;x<=110;x+=2){pos.push(x,y,f0(x),x,y,f1(x));if(k>0){const i=(k-1)*2;idx.push(i,i+1,i+2,i+1,i+3,i+2)}k++}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();if(g.attributes.normal.getY(0)<0){g.index.array.reverse();g.computeVertexNormals()}const m=new THREE.Mesh(g,mat);m.receiveShadow=true;G.add(m);return m};const sand=band(x=>RC(x)-22-Math.sin(x*.07+1)*2.2-Math.sin(x*.19)*.8,x=>RC(x)-11,.02,M(0xd8c8a0));sand.userData.noFill=true;const w=band(x=>RC(x)-13+Math.sin(x*.11+2)*.9,x=>RC(x)+14,.04,M(0x4a7a8a,{roughness:.25}));solids.push({x0:-110,x1:110,y0:-5,y1:6,z0:47,z1:200});for(let i=0;i<9;i++){const c=new THREE.Mesh(new THREE.DodecahedronGeometry(14+r()*6,0),M(0x5a6a48,{flatShading:true}));c.scale.set(1.4,1.6,.7);c.position.set(-80+i*20,8,86+r()*6);G.add(c)}}
 const STONE=M(0xa8a296),WOOD=M(0x8a6a4a),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50),EARTH=M(0xb8a080);
 const roof=(x,y,z,W,D,h)=>{curvedRoof(G,x,(y+h/2)-(h)/2,z,(W*.72)/.72,(D*.72)/.72,(h)*1.05)};
 const hall=(x,z,W,D,PH,base=.6)=>{/* 11/23 품질: 흰 상자 벽+기둥 → hallkit 한옥 */const h=buildHall({x,z,W,D,nx:Math.max(1,Math.round(W/3)),nz:Math.max(1,Math.round(D/3.2)),FY:base,PH:PH,roof:'hip',pillar:0x6b4a2e,bracket:'ik',bare:true,plain:true,front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',mini,solids,light:false,roofScale:.9});G.add(h.group);return undefined};
 const wallSeg=(x0,z0,x1,z1,h=1.8)=>{const L=Math.hypot(x1-x0,z1-z0);const w=new THREE.Mesh(new THREE.BoxGeometry(x1===x0?.5:L,h,z1===z0?.5:L),EARTH);w.position.set((x0+x1)/2,h/2,(z0+z1)/2);G.add(w);solids.push({x0:Math.min(x0,x1)-.25,x1:Math.max(x0,x1)+.25,y0:0,y1:h,z0:Math.min(z0,z1)-.25,z1:Math.max(z0,z1)+.25})};
 /* 복례문과 바깥 담 */const FZ=20;wallSeg(-24,FZ,-1.6,FZ);wallSeg(1.6,FZ,24,FZ);wallSeg(-24,FZ,-24,-32);wallSeg(24,FZ,24,-32);wallSeg(-24,-32,24,-32);roof(0,2.6,FZ,4.4,2.6,1.2);for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,2.6,8),M(0x8a3a2a));p.position.set(s*1.5,1.3,FZ);G.add(p)}
 sp(0,FZ+4,3.2,'복례문','병산서원 바깥 문이에요. 「예로 돌아간다」는 뜻의 이름이에요.');
 /* 만대루: 앞면 7칸(약 21m)·옆면 2칸, 2층 마루, 아래로 지나감 */const MZ=9,MW=21,MD=6,FL=2.6;{const deck=new THREE.Mesh(new THREE.BoxGeometry(MW,.25,MD),WOOD);deck.position.set(0,FL,MZ);G.add(deck);for(let i=0;i<=7;i++)for(let j=0;j<=2;j++){const x=-MW/2+i*MW/7,z=MZ-MD/2+j*MD/2;const c=new THREE.Mesh(new THREE.CylinderGeometry(.2,.24,FL+2.6,10),WOOD);c.position.set(x,(FL+2.6)/2,z);G.add(c);const st=new THREE.Mesh(new THREE.DodecahedronGeometry(.45,0),STONE);st.scale.y=.5;st.position.set(x,.1,z);G.add(st);solids.push({cx:x,cz:z,r:.3,y0:0,y1:FL+2.6})}
  const rail=new THREE.Mesh(new THREE.BoxGeometry(MW,.5,.08),WOOD);rail.position.set(0,FL+.4,MZ+MD/2);G.add(rail);roof(0,FL+2.6,MZ,MW+3,MD+3,2)}
 sp(0,MZ+4.2,3.4,'만대루','앞면 일곱 칸의 긴 2층 누각이에요. 마루에 오르면 기둥 사이로 낙동강과 병산 벼랑이 그림처럼 펼쳐져요. 아래로 지나 서원 마당에 들어가요.');
 /* 동재·서재·입교당·존덕사 */hall(-12,-3,7,4,2.4,.5);hall(12,-3,7,4,2.4,.5);hall(0,-13,15,5.4,2.8,.9);
 sp(0,-7.5,3.4,'입교당','유생들이 모여 공부하던 강당이에요. 마루에 앉으면 만대루 너머로 강과 산이 보여요.');sp(-12,1.6,2.6,'동재·서재','유생들이 묵으며 공부하던 기숙사예요. 마당 양쪽에 마주 보고 서 있어요.');
 wallSeg(-8,-19,-1.4,-19,1.4);wallSeg(1.4,-19,8,-19,1.4);hall(0,-26,6,3.6,2.2,.6);
 for(const[x,z]of[[-5,-21],[5,-21],[-18,-15]]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.18,.25,2,7),M(0x8a7a6a));t.position.set(x,1,z);G.add(t);const c=new THREE.Mesh(new THREE.SphereGeometry(1.5,10,8),M(0xd06a9a));c.scale.y=.7;c.position.set(x,2.6,z);G.add(c);solids.push({cx:x,cz:z,r:.3,y0:0,y1:2})}
 sp(0,-21.6,2.6,'존덕사','서애 류성룡의 위패를 모신 사당이에요. 둘레에 여름이면 붉게 피는 배롱나무가 있어요.');
 /* 달팽이 뒷간: 소용돌이 흙담 */const DX=30,DZ=24;for(let k=0;k<26;k++){const a=k/26*Math.PI*2*1.4,rr=2.4-k*.05;const x=DX+Math.cos(a)*rr,z=DZ+Math.sin(a)*rr;const b=new THREE.Mesh(new THREE.BoxGeometry(.7,1.6,.3),EARTH);b.position.set(x,.8,z);b.rotation.y=-a;G.add(b);if(k<20)solids.push({cx:x,cz:z,r:.25,y0:0,y1:1.6})}
 sp(DX,DZ+4,2.6,'달팽이 뒷간','흙담을 달팽이처럼 둥글게 감아 문 없이도 안이 안 보이게 한 뒷간이에요. 일하던 사람들이 쓰던 곳이에요.');
 /* 그랭이질(11/23) */const GXo=-34,GZo=8;spots.push({x:GXo,y:0,z:GZo+5,r:3,t:'그랭이질 자리',h:'울퉁불퉁한 주춧돌에 맞춰 기둥 밑을 깎는 그랭이질을 해 봐요(크게 보기 놀이판).'});
 {const bench=new THREE.Mesh(new THREE.BoxGeometry(4,.5,2),WOOD);bench.position.set(GXo,.25,GZo-3);G.add(bench);for(let i=0;i<3;i++){const lg=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,4,10),M(0x9a7a50));lg.rotation.z=Math.PI/2;lg.position.set(GXo,.75+i*.5,GZo-3);G.add(lg)}solids.push({x0:GXo-2,x1:GXo+2,y0:0,y1:1.6,z0:GZo-4,z1:GZo-2})}
 const gb=new THREE.Group();gb.position.set(GXo,0,GZo);gb.visible=false;G.add(gb);
 window.__BSGRENG=()=>{if(document.getElementById('bsP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(GXo,GZo+6,0)}catch(e){}gb.visible=true;
  const CAM=[GXo,1.9,GZo+4.6,GXo,.9,GZo,45];window.__GCAM=()=>document.getElementById('bsP')?CAM:null;
  const Q=.05,S0=.4,PH=2;let rd=0,n=7,k=[],c=[],Y=0,Yv=0,clicks=0,opt=0,done=false,auto=false,last=performance.now(),strips=[],gaps=[],t0=0;const res=[];
  const WOODP=M(0xb08a58),STN=M(0x8a8478,{flatShading:true}),GAP=new THREE.MeshBasicMaterial({color:0xfff0a0});
  const snd=(f,len=.1)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='sawtooth';o.frequency.value=f;gg.gain.setValueAtTime(.03,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const clr=()=>{while(gb.children.length)gb.remove(gb.children[0]);strips=[];gaps=[]};
  const restY=()=>Math.max(...k.map((v,i)=>S0+v*Q-c[i]));
  const newRound=()=>{clr();n=[7,9,11][rd];const w=1.4/n;k=[];let v=2+((r()*3)|0);for(let i=0;i<n;i++){v=Math.max(0,Math.min(6,v+((r()*3)|0)-1));k.push(v)}if(Math.max(...k)===Math.min(...k))k[(n/2)|0]+=2;c=k.map(()=>0);clicks=0;const mn=Math.min(...k);opt=k.reduce((a,v)=>a+v-mn,0);
   for(let i=0;i<n;i++){const x=-.7+w*(i+.5);const sh=S0+k[i]*Q;const st=new THREE.Mesh(new THREE.BoxGeometry(w*1.01,sh,1),STN);st.position.set(x,sh/2,0);gb.add(st);const s=new THREE.Mesh(new THREE.BoxGeometry(w*.98,1,.9),WOODP);s.userData.i=i;gb.add(s);strips.push(s);const g=new THREE.Mesh(new THREE.PlaneGeometry(w*.9,1),GAP);g.position.z=.46;gb.add(g);gaps.push(g)}
   const cap=new THREE.Mesh(new THREE.BoxGeometry(1.45,.12,.95),M(0x8a6a40));cap.userData.cap=1;gb.add(cap);
   Y=restY();Yv=Y+.6;t0=performance.now()/1000;ui()};
  const layout=()=>{const w=1.4/n;const top=Yv+PH;strips.forEach((s,i)=>{const b=Yv+c[i];const h=top-b;s.scale.y=h;s.position.set(-.7+w*(i+.5),b+h/2,0);const sh=S0+k[i]*Q;const gp=b-sh;gaps[i].visible=gp>.004;gaps[i].scale.y=Math.max(.001,gp);gaps[i].position.set(-.7+w*(i+.5),sh+gp/2,.46)});gb.children.forEach(o=>{if(o.userData.cap)o.position.set(0,top+.06,0)})};
  const d=document.createElement('div');d.id='bsP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2418;border:3px solid #c8a868;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const gapsN=()=>k.filter((v,i)=>Y+c[i]-(S0+v*Q)>.004).length;
  const ui=()=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d890">🪚 그랭이질 ${rd+1}/3</b><div style="font:16px 'Do Hyeon',sans-serif;margin:4px 0">빛 새는 틈 ${gapsN()}곳 · 깎은 번 ${clicks}</div><div style="font-size:12px;opacity:.9">기둥 밑 조각을 누르면 한 켜 깎여요. 노란 빛이 새는 틈이 없어지면 끝! 닿아 있는 쪽을 깎아야 기둥이 내려앉아요.</div><button data-x style="font:13px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:3px 10px;margin-top:6px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  let wait=0;const tap=i=>{if(done||wait>0)return;c[i]+=Q;clicks++;Y=restY();snd(180+r()*60);ui();if(gapsN()===0){wait=1.2;snd(660,.4)}};
  const pc=new THREE.PerspectiveCamera(45,innerWidth/innerHeight,.05,200);const rc=new THREE.Raycaster();const ov=document.createElement('div');ov.id='bsO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  ov.onpointerdown=e=>{pc.fov=CAM[6];pc.aspect=innerWidth/innerHeight;pc.position.set(CAM[0],CAM[1],CAM[2]);pc.lookAt(CAM[3],CAM[4],CAM[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(strips,false)[0];if(h)tap(h.object.userData.i)};
  const cleanup=()=>{ov.remove();clr();gb.visible=false};
  const fin=()=>{done=true;cleanup();const QQ=Math.round(res.reduce((a,b)=>a+b,0)/3);const st=QQ>=85?3:QQ>=60?2:QQ>0?1:0;try{ctx.done('byeongsan_grengi',QQ,'그랭이질')}catch(e){}window.__BSQ=QQ;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0d890">기둥이 꼭 앉았어요! ${QQ}점</b><div style="font-size:13px;margin:4px 0">옛 목수는 다듬지 않은 덤벙 주춧돌에 기둥을 세울 때 그레(컴퍼스 같은 도구)로 돌 모양을 기둥 밑에 옮겨 그리고 그만큼 깎아 냈어요. 이것을 그랭이질이라 해요. 만대루 기둥도 이렇게 자연석 위에 서 있어요(놀이판은 크게 보기로 간추린 것).</div><div style="font-size:24px;color:#c8a868">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a868;color:#2a2418;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__BSGRENG()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  let at=0;const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;Yv+=(Y-Yv)*Math.min(1,dt*8);layout();
   if(auto&&wait<=0){at+=dt;if(at>.12){at=0;const i=k.findIndex((v,i)=>Math.abs(Y+c[i]-(S0+v*Q))<.004);if(i>=0)tap(i)}}
   if(wait>0){wait-=dt;if(wait<=0){const el=performance.now()/1000-t0;res.push(Math.max(30,Math.round(100-(clicks-opt)*7-Math.max(0,el-20-rd*8)*.5)));rd++;if(rd>=3){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();layout();requestAnimationFrame(step);window.__BSG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},get opt(){return opt},get clicks(){return clicks},tap};try{ctx.say('기둥 밑을 깎아 주춧돌에 꼭 맞춰 봐요!',2.4)}catch(e){}};
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,FZ+3],[0,2.2,MZ],[0,3,-7],[GXo,3,GZo+4]]){const L=new THREE.PointLight(0xffc080,0,26,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'벼루 조각',h:'유생이 먹을 갈던 돌 벼루 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.16,.03,.1),M(0x2e2e30)))})},
  {n:'백자 연적',h:'벼루에 물을 따르던 작은 백자 연적이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.05,12,8),M(0xf0ece0,{roughness:.3})))})},
  {n:'놋쇠 촛대 받침',h:'밤 공부를 밝히던 촛대의 받침이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.06,.08,.03,14),M(0xc8a040,{metalness:.7})))})},
  {n:'기와 조각',h:'서원 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(-12,30,2.4,'발굴 탐지 자리','서원 앞 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__BSDIG=()=>{window.__DETECT&&window.__DETECT({key:'byeongsan_dig',title:'병산서원 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[-20,28],[10,30],[30,10],[-34,24],[-40,-10],[38,-10],[16,4],[-16,4],[6,-30],[-30,-30]],items:ITEMS,intro:'서원 둘레 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'병산서원은 서애 류성룡을 모신 서원으로, 한국의 서원 아홉 곳과 함께 유네스코 세계유산이에요.'})};
 const meta={quest:{t:'병산서원 둘러보기',d:'복례문으로 들어가 만대루 아래를 지나 서원을 둘러보세요.',steps:[['복례문','복례문'],['만대루','만대루'],['동재·서재','동재·서재'],['입교당','입교당'],['존덕사','존덕사'],['뒷간','달팽이 뒷간']]},
  title:'안동 병산서원',hint:'병산서원을 공개 사진으로 간추려 지었어요(배치·크기 어림). 만대루 아래로 들어가 보고, 그랭이질로 기둥을 주춧돌에 앉혀 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:30,lines:['안동 병산서원','사적 · 유네스코 한국의 서원','만대루 · 입교당','간추려 지음']}},
  npc:[['science',[[-6,26],[6,26],[6,32],[-6,32]]]],bounds:[-60,60,-50,46],level:()=>'안동 병산서원',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#86a04c';g.fillRect(0,0,300,300);g.fillStyle='#4a7a8a';g.fillRect(0,Z(47),300,300);g.fillStyle='#b8a080';g.fillRect(X(-24),Z(20),48*S,1.5*S);g.fillStyle='#8a6a4a';g.fillRect(X(-10.5),Z(6),21*S,6*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:36,yaw:Math.PI},size:{}},meta)}
