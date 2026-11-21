/* 영주 소수서원 마당(2026-11-22, 영주 덧붙이기 E10): 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   소수서원(사적, 세계유산 「한국의 서원」 2019): 1543년 풍기군수 주세붕이 세운 우리나라 첫 서원 백운동서원. 1550년 퇴계 이황의 청으로 명종이 「紹修書院」 현판을 내린 첫 사액서원. 죽계천 가 정자 경렴정, 냇가 바위에 새긴 붉은 「敬」 자(경자바위), 둘레 소나무 숲(학자수림), 강학당.
   놀이: 투호(화살을 항아리에 던져 넣기 — 선비와 궁중에서 즐긴 놀이), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildSosu(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1543);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x8a9a4a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 죽계천(동쪽, 남북으로) */const CX=34;{const WT=tex(128,128,(q,w,h)=>{q.fillStyle='#5a8a8a';q.fillRect(0,0,w,h);for(let i=0;i<60;i++){q.strokeStyle='rgba(230,245,250,.25)';q.beginPath();const x=Math.random()*w,y=Math.random()*h;q.moveTo(x,y);q.lineTo(x,y+12);q.stroke()}},[2,12]);WT.wrapS=WT.wrapT=THREE.RepeatWrapping;const st=new THREE.Mesh(new THREE.PlaneGeometry(9,220),new THREE.MeshStandardMaterial({map:WT,roughness:.1}));st.rotation.x=-Math.PI/2;st.position.set(CX,.03,0);G.add(st);solids.push({x0:CX-4.5,x1:CX+4.5,y0:-2,y1:5,z0:-100,z1:100})
  const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(2.4,0),M(0x9a9488,{flatShading:true}));rock.scale.set(1.4,.9,1);rock.position.set(CX+5.4,1.2,6);G.add(rock);const kc=document.createElement('canvas');kc.width=kc.height=128;const kq=kc.getContext('2d');kq.fillStyle='#c8281a';kq.font='bold 96px serif';kq.textAlign='center';kq.textBaseline='middle';kq.fillText('敬',64,70);const kt=new THREE.CanvasTexture(kc);const kp=new THREE.Mesh(new THREE.PlaneGeometry(1.6,1.6),new THREE.MeshBasicMaterial({map:kt,transparent:true}));kp.position.set(CX+1.95,1.4,6);kp.rotation.y=-Math.PI/2;G.add(kp)}
 /* 서원 건물: 지도문 → 강학당 → 문성공묘, 경렴정(냇가) */
 if(!mini){const B=spec=>{const h=buildHall(Object.assign({solids,light:false},spec));G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})};
  B({x:0,z:14,ry:Math.PI,W:3.6,D:2,nx:1,nz:1,FY:.3,PH:2.6,roof:'gable',name:'志道門',pillar:0x8a6a48,bracket:'ik',front:'open',back:'open',stairs:'none',roofScale:.7});
  B({x:0,z:-2,ry:Math.PI,W:11,D:7,nx:4,nz:2,FY:1,PH:3,roof:'hip',name:'紹修書院',pillar:0x8a6a48,bracket:'ik',front:'open',roofScale:.95});
  B({x:-16,z:-18,ry:Math.PI,W:6,D:4.4,nx:3,nz:1,FY:.9,PH:2.8,roof:'gable',name:'文成公廟',pillar:0x9a3a26,bracket:'ik',roofScale:.85});
  B({x:14,z:-14,ry:-Math.PI/2,W:7,D:3.6,nx:3,nz:1,FY:.6,PH:2.4,roof:'gable',name:'直方齋',pillar:0x8a6a48,bracket:'ik',roofScale:.8});
  B({x:CX-8,z:10,ry:-Math.PI/2,W:4,D:4,nx:1,nz:1,FY:.8,PH:2.6,roof:'hip',name:'景濂亭',pillar:0x8a6a48,bracket:'ik',front:'open',back:'open',left:'open',right:'open',stairs:'none',rail:true,roofScale:.8})}
 /* 학자수림: 소나무 숲 */{const tm=M(0x7a4a30),lm=M(0x2f5a2a);for(let i=0;i<60;i++){const x=-90+r()*110,z=-90+r()*180;if(Math.abs(x)<24&&Math.abs(z)<28)continue;if(Math.abs(x+10)<12&&Math.abs(z-30)<10)continue;const t=new THREE.Mesh(new THREE.CylinderGeometry(.22,.34,7,7),tm);t.position.set(x,3.5,z);t.rotation.z=(r()-.5)*.35;G.add(t);for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(2.2-k*.4,1.3,8),lm);c.position.set(x+(r()-.5),6.4+k*.9,z+(r()-.5));c.scale.y=.6;G.add(c)}solids.push({cx:x,cz:z,r:.4,y0:0,y1:7})}}
 /* 투호 마당: 항아리 */const TX=-10,TZ=30;{const pot=new THREE.Mesh(new THREE.CylinderGeometry(.18,.28,.7,16),M(0x4a5a7a,{roughness:.4}));pot.position.set(TX,.35,TZ-4);G.add(pot);for(const s of[-1,1]){const ear=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.2,10,1,true),M(0x4a5a7a,{side:THREE.DoubleSide}));ear.rotation.z=Math.PI/2;ear.position.set(TX+s*.26,.6,TZ-4);G.add(ear)}const mat=new THREE.Mesh(new THREE.BoxGeometry(3,.04,9),M(0xc8a860));mat.position.set(TX,.02,TZ);G.add(mat)}
 const NL=[];if(!mini){for(const[x,y,z]of[[0,4,4],[0,3,17],[CX-8,3,10],[TX,3,TZ]]){const L=new THREE.PointLight(0xffc080,0,20,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(0,20,3,'소수서원','1543년 주세붕이 세운 우리나라 첫 서원(백운동서원)이에요. 1550년 퇴계 이황의 청으로 임금이 「소수서원」 현판을 내린 첫 사액서원이에요. 2019년 세계유산이 됐어요. 간추려 지었어요.');
 sp(CX-4,6,2.6,'경자바위','죽계천 바위에 붉은 「敬(경)」 자가 새겨져 있어요. 「늘 삼가고 공경하라」는 선비 공부의 첫걸음이에요.');
 sp(CX-12,12,2.4,'경렴정','냇물을 바라보며 시를 짓던 정자예요.');
 sp(TX+2.6,TZ+3.6,2.2,'투호 마당','선비들이 쉬는 틈에 화살을 항아리에 던져 넣는 「투호」를 즐겼어요. 던져 봐요!');
 sp(-40,40,2.4,'발굴 탐지 자리','서원 둘레 땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 투호(11/22): 옆에서 본 마당. ① 기울기 막대가 오르내릴 때 「던지기」로 각도 정하고 ② 힘 막대가 찰 때 다시 눌러 힘 정하기 → 포물선으로 날아가 항아리(입·귀)에 들어가면 점수. 화살 10개 */
 window.__SSTUHO=()=>{if(document.getElementById('ssP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(TX+2.6,TZ+3.6,0)}catch(e){}
  const cv=document.createElement('canvas');cv.id='ssC';cv.style.cssText='position:fixed;inset:0;z-index:55;width:100%;height:100%;touch-action:none';document.body.appendChild(cv);const q=cv.getContext('2d');cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio;
  const N=10;let n=0,score=0,phase='aim',ang=0,pow=0,t=0,arrow=null,done=false,last=performance.now()/1000,res=[];const POT=4.2;
  const d=document.createElement('div');d.id='ssP';d.style.cssText="position:fixed;right:12px;top:90px;z-index:60;background:#2a2418;border:3px solid #c8a868;border-radius:16px;padding:10px 14px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:200px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d890">🏺 투호</b><div id="ssS" style="font:17px 'Do Hyeon',sans-serif;margin:4px 0"></div><div id="ssG" style="font-size:12px;color:#f0d890">각도를 정해요</div>`;
  const btn=document.createElement('button');btn.textContent='🏹 던지기';btn.style.cssText="position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:61;font:22px 'Do Hyeon',sans-serif;background:#c8a868;color:#2a2418;border:0;border-radius:16px;padding:14px 42px;cursor:pointer";document.body.appendChild(btn);
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const info=()=>{d.querySelector('#ssS').textContent='화살 '+Math.min(n+1,N)+' / '+N+' · '+score+'점'};info();
  const A=()=>.25+.55*(.5+.5*Math.sin(t*2.4)),P=()=>.35+.65*(.5+.5*Math.sin(t*3.1));
  const press=()=>{if(done||arrow)return;if(phase==='aim'){ang=A();phase='pow';t=0;d.querySelector('#ssG').textContent='힘을 정해요'}else if(phase==='pow'){pow=P();const v=4+pow*5.2;arrow={x:0,y:1.1,vx:Math.cos(ang)*v,vy:Math.sin(ang)*v};phase='fly';snd(700,.1)}};
  btn.onclick=press;const onKey=e=>{if(e.code==='Space'){e.preventDefault();press()}};addEventListener('keydown',onKey,true);
  const cleanup=()=>{removeEventListener('keydown',onKey,true);cv.remove();btn.remove()};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.min(100,Math.round(score/(N*2)*100*1.25));const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('sosu_tuho',Q,'소수서원 투호')}catch(e){}window.__SSQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0d890">투호 ${score}점!</b><div style="font-size:13px;margin:4px 0">투호는 화살이 항아리 입에 들어가면 2점, 귀에 걸리면 1점 같은 셈법이 있었어요. 마음을 가다듬어야 잘 들어가서 선비들의 수양 놀이로도 여겼어요.</div><div style="font-size:24px;color:#c8a868">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a868;color:#2a2418;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__SSTUHO()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}const now=performance.now()/1000,dt=Math.min(.05,now-last);last=now;t+=dt;const W=cv.width,Hh=cv.height,S=Math.min(W/6,Hh/5);const ox=W*.12,oy=Hh*.8;const X=x=>ox+x*S,Y=y=>oy-y*S;
   if(arrow){arrow.vy-=9.8*dt;arrow.x+=arrow.vx*dt;arrow.y+=arrow.vy*dt;let res2=null;if(arrow.y<=.7&&arrow.vy<0&&Math.abs(arrow.x-POT)<.16)res2=2;else if(arrow.y<=.62&&arrow.vy<0&&Math.abs(Math.abs(arrow.x-POT)-.27)<.07)res2=1;else if(arrow.y<=0)res2=0;
    if(res2!==null){score+=res2;res.push(res2);snd(res2===2?990:res2===1?660:180,.3,res2?'triangle':'sawtooth');d.querySelector('#ssG').textContent=res2===2?'쏙! 항아리 입에 들어갔어요(2점)':res2===1?'귀에 걸렸어요(1점)':'아깝게 빗나갔어요';arrow=null;n++;phase='aim';t=0;info();if(n>=N)fin()}}
   q.clearRect(0,0,W,Hh);q.fillStyle='rgba(30,26,18,.5)';q.fillRect(0,0,W,Hh);q.fillStyle='#c8a860';q.fillRect(0,oy,W,Hh-oy);
   q.fillStyle='#4a5a7a';q.fillRect(X(POT-.16),Y(.7),.32*S,.7*S);q.fillRect(X(POT-.34),Y(.62),.12*S,.12*S);q.fillRect(X(POT+.22),Y(.62),.12*S,.12*S);q.fillStyle='#1a1a2a';q.fillRect(X(POT-.13),Y(.72),.26*S,.04*S);
   q.fillStyle='#f0e0c8';q.beginPath();q.arc(X(0),Y(1.1),S*.12,0,7);q.fill();
   if(!done&&!arrow){const a=phase==='aim'?A():ang;q.strokeStyle='rgba(255,224,128,.8)';q.lineWidth=4;q.setLineDash([8,6]);q.beginPath();q.moveTo(X(0),Y(1.1));q.lineTo(X(Math.cos(a)*1.4),Y(1.1+Math.sin(a)*1.4));q.stroke();q.setLineDash([]);if(phase==='pow'){q.fillStyle='rgba(255,255,255,.2)';q.fillRect(W*.1,Hh*.15,W*.3,14);q.fillStyle='#e8a040';q.fillRect(W*.1,Hh*.15,W*.3*P(),14)}}
   if(arrow){const a=Math.atan2(arrow.vy,arrow.vx);q.save();q.translate(X(arrow.x),Y(arrow.y));q.rotate(-a);q.fillStyle='#8a6a40';q.fillRect(-S*.35,-2,S*.35,4);q.fillStyle='#d8341a';q.beginPath();q.moveTo(-S*.35,0);q.lineTo(-S*.45,-6);q.lineTo(-S*.45,6);q.fill();q.restore()}
   requestAnimationFrame(loop)};loop();
  window.__SSG={press,get phase(){return phase},A,P,get score(){return score},get n(){return n},POT};try{ctx.say('항아리에 화살을 던져 넣어요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'투호 화살',h:'투호 놀이에 쓰던 나무 화살이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.01,.01,.4,5),M(0x8a6a40));m.rotation.z=Math.PI/2;g.add(m)})},
  {n:'백자 연적',h:'서원 유생이 쓰던 연적이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.08,12,8),M(0xf0ece0,{roughness:.3})))})},
  {n:'숙수사 기와 조각',h:'소수서원 자리는 원래 통일신라 숙수사 절터였어요. 당간지주가 지금도 남아 있어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18),M(0x5a5a5a)))})},
  {n:'벼루',h:'글공부하던 벼루예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.04,.13),M(0x2a2a2e)))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__SSDIG=()=>{window.__DETECT&&window.__DETECT({key:'sosu_dig',title:'소수서원 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[-40,40],[-30,0],[20,40],[-50,-30],[10,-40],[-20,50],[20,-30],[-60,10]],items:ITEMS,intro:'서원 둘레 땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'소수서원은 절터 위에 세운 우리나라 첫 서원이에요.'})};
 const meta={quest:{t:'소수서원 둘러보기',d:'서원과 경자바위, 경렴정을 둘러보세요.',steps:[['서원','소수서원'],['경자바위','경자바위'],['경렴정','경렴정'],['투호','투호 마당']]},
  title:'영주 소수서원',hint:'우리나라 첫 서원 소수서원(세계유산)을 간추려 지었어요. 투호 놀이로 항아리에 화살을 던져 넣어 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:8,z:24,lines:['영주 소수서원','우리나라 첫 서원(1543)','경자바위 · 학자수림','간추려 지음']}},
  npc:[['science',[[4,22],[12,22],[12,30],[4,30]]]],bounds:[-90,CX-5,-90,90],level:()=>'영주',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#5a8a8a';g.fillRect(X(CX-4.5),0,9*S,300);g.fillStyle='#8a6a48';g.fillRect(X(-5.5),Z(-5.5),11*S,7*S);g.fillStyle='#c8a860';g.fillRect(X(TX-1.5),Z(TZ-4.5),3*S,9*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:8,z:28,yaw:Math.PI},size:{}},meta)}
