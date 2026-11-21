/* 전주 풍남문·전주사고 마당(2026-11-22, 전주 덧붙이기 E3): 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   풍남문(보물): 전주부성의 남문. 앞에 반달꼴 옹성을 두른 2층 문루(1768 다시 지음). 성은 1907년 헐리고 이 문만 남음.
   전주사고(경기전 안, 1991 복원): 조선왕조실록을 지키던 2층 누각 창고. 임진왜란(1592) 때 네 사고 가운데 전주사고본만 살아남음 — 태인 선비 안의·손홍록이 실록과 어진을 내장산 용굴암으로 옮겨 1년 넘게 번갈아 지킴.
   포쇄: 실록이 습기·좀에 상하지 않도록 사관이 2~3년마다 맑은 날 책을 꺼내 바람과 볕에 말리던 일.
   놀이: 실록 포쇄(볕 날 때 펼치고 비 오기 전 덮기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildPungnam(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(9137);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#b8a888';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=150+(r()*50|0);q.fillStyle=`rgba(${v},${v-12},${v-30},.5)`;q.fillRect(r()*w,r()*h,2,2)}},[40,40]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 풍남문: 석축 문(무지개문) + 2층 문루 + 앞 반달 옹성 */const FX=0,FZ=-20;const sm=M(0xb0a48e,{flatShading:true}),cap=M(0x5a5e66);
 {const base=new THREE.Mesh(new THREE.BoxGeometry(16,5,9),sm);base.position.set(FX,2.5,FZ);G.add(base);const hole=new THREE.Mesh(new THREE.BoxGeometry(4,3.8,9.2),M(0x2a2620));hole.position.set(FX,1.9,FZ);G.add(hole);const arch=new THREE.Mesh(new THREE.CylinderGeometry(2,2,9.2,20,1,false,0,Math.PI),M(0x2a2620));arch.rotation.z=Math.PI/2;arch.rotation.y=Math.PI/2;arch.position.set(FX,3.8,FZ);G.add(arch);
  solids.push({x0:FX-8,x1:FX-2,y0:0,y1:5,z0:FZ-4.5,z1:FZ+4.5},{x0:FX+2,x1:FX+8,y0:0,y1:5,z0:FZ-4.5,z1:FZ+4.5},{x0:FX-2,x1:FX+2,y0:3.8,y1:5,z0:FZ-4.5,z1:FZ+4.5});
  if(!mini){const h=buildHall({x:FX,z:FZ,ry:0,W:12,D:6,nx:3,nz:2,FY:5,PH:3,base:false,stairs:'none',roof:'hip',name:'豐南門',pillar:0x9a3a26,bracket:'dapo',front:'open',back:'open',left:'open',right:'open',rail:true,upper:{h:2.8},roofScale:1,solids:[],light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
  /* 옹성(남쪽 반달 벽) */const R=12,seg=14;for(let k=0;k<seg;k++){const a0=Math.PI*(k/seg),a1=Math.PI*((k+1)/seg);if(k===6||k===7)continue;const x0=FX+Math.cos(a0)*R,z0=FZ+4+Math.sin(a0)*R,x1=FX+Math.cos(a1)*R,z1=FZ+4+Math.sin(a1)*R;const L=Math.hypot(x1-x0,z1-z0)+.2;const w=new THREE.Mesh(new THREE.BoxGeometry(L,3.6,1.4),sm);w.position.set((x0+x1)/2,1.8,(z0+z1)/2);w.rotation.y=-Math.atan2(z1-z0,x1-x0);G.add(w);const c=new THREE.Mesh(new THREE.BoxGeometry(L,.4,1.6),cap);c.position.copy(w.position);c.position.y=3.8;c.rotation.y=w.rotation.y;G.add(c);solids.push({cx:(x0+x1)/2,cz:(z0+z1)/2,r:1.4,y0:0,y1:4})}
  /* 남은 성벽 한 토막씩 */for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.BoxGeometry(10,4.2,3),sm);w.position.set(FX+s*13,2.1,FZ);G.add(w);solids.push({x0:FX+s*13-5,x1:FX+s*13+5,y0:0,y1:4.2,z0:FZ-1.5,z1:FZ+1.5})}}
 /* 전주사고: 담 안 2층 누각 창고 + 포쇄 마당 */const KX=-6,KZ=26;
 if(!mini){const h=buildHall({x:KX,z:KZ,ry:Math.PI,W:9,D:6,nx:3,nz:2,FY:.8,PH:2.6,roof:'hip',name:'全州史庫',pillar:0x9a3a26,bracket:'ik',front:'door',loft:{h:2.6},roofScale:.95,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)});
  const wm=M(0xc8bca8);const wall=(x0,z0,x1,z1)=>{const L=Math.hypot(x1-x0,z1-z0);const w=new THREE.Mesh(new THREE.BoxGeometry(L,1.8,.5),wm);w.position.set((x0+x1)/2,.9,(z0+z1)/2);w.rotation.y=-Math.atan2(z1-z0,x1-x0);G.add(w);const c=new THREE.Mesh(new THREE.BoxGeometry(L+.3,.25,.9),cap);c.position.copy(w.position);c.position.y=1.9;c.rotation.y=w.rotation.y;G.add(c);solids.push({x0:Math.min(x0,x1)-.3,x1:Math.max(x0,x1)+.3,y0:0,y1:2,z0:Math.min(z0,z1)-.3,z1:Math.max(z0,z1)+.3})};
  wall(KX-14,KZ+8,KX+14,KZ+8);wall(KX-14,KZ+8,KX-14,KZ-14);wall(KX+14,KZ+8,KX+14,KZ-14);wall(KX-14,KZ-14,KX-3,KZ-14);wall(KX+3,KZ-14,KX+14,KZ-14)}
 /* 포쇄 멍석 + 실록 궤 */const PX=KX,PZ=KZ-8;const books=[];{const mat=new THREE.Mesh(new THREE.BoxGeometry(6.4,.05,6.4),M(0xc8a860));mat.position.set(PX,.03,PZ);G.add(mat);for(let i=0;i<9;i++){const b=new THREE.Group();b.position.set(PX-1.9+(i%3)*1.9,.08,PZ-1.9+((i/3)|0)*1.9);const cl=new THREE.Mesh(new THREE.BoxGeometry(.8,.16,1.1),M(0x8a5a2a));cl.position.y=.08;b.add(cl);const op=new THREE.Mesh(new THREE.BoxGeometry(1.5,.04,1.1),M(0xf0e8d0));op.position.y=.03;op.visible=false;b.add(op);b.userData={cl,op};G.add(b);books.push(b)}}
 const NL=[];if(!mini){for(const[x,y,z]of[[FX,7,FZ+6],[KX,4,KZ-6],[FX-12,3,FZ+10],[FX+12,3,FZ+10]]){const L=new THREE.PointLight(0xffc080,0,22,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(FX,FZ+8,3.4,'풍남문','전주부성의 남문이에요(보물). 앞을 반달 모양 옹성이 감싸 적이 문을 바로 치지 못하게 했어요. 1907년 성을 헐 때 이 문만 남았어요. 간추려 지었어요.');
 sp(KX,KZ-15,3,'전주사고','조선왕조실록을 지키던 2층 창고예요. 임진왜란 때 서울·충주·성주 사고는 불탔고 전주사고본만 살아남았어요. 태인의 선비 안의·손홍록이 실록과 태조 어진을 내장산으로 옮겨 1년 넘게 지켰어요.');
 sp(PX-6,PZ,2.2,'포쇄 마당','사관은 2~3년마다 맑은 날을 골라 실록을 꺼내 바람과 볕에 말렸어요(포쇄). 실록을 펼쳐 말려 봐요.');
 sp(20,6,2.4,'발굴 탐지 자리','전주 땅속에 옛 사람들의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 실록 포쇄(11/22): 날씨가 맑음→구름→비로 바뀌어요(다음 날씨 미리 보임). 맑을 때 펼치면 마르고, 비 올 때 펼쳐 두면 젖어요. 아홉 권 다 말리기, 75초 */
 window.__PNPOS=()=>{if(document.getElementById('pnP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX-6,PZ,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('pnP')?[PX,7.5,PZ-8,PX,0,PZ+.5,55]:null;
  const N=9,TL=75;const st=books.map((b,i)=>({open:false,dry:0,wet:0,done:false,i:i%3*2}));let wx='sun',next='rain',wt=0,wdur=6,done=false,t0=performance.now()/1000,last=t0,damage=0;
  const WXS={sun:['☀️','맑음'],cloud:['☁️','흐림'],rain:['🌧️','비']};const seq=()=>{const k=Math.random();return wx==='sun'?(k<.65?'cloud':'rain'):wx==='cloud'?(k<.6?'sun':'rain'):(k<.75?'sun':'cloud')};
  const d=document.createElement('div');d.id='pnP';d.style.cssText="position:fixed;right:12px;bottom:140px;z-index:60;background:#2a2218;border:3px solid #c8a868;border-radius:16px;padding:10px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:250px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d890">📜 실록 포쇄</b><div style="display:flex;justify-content:space-around;margin:4px 0"><div>지금 <span id="pnW" style="font-size:20px"></span></div><div style="opacity:.8">다음 <span id="pnN" style="font-size:16px"></span> <span id="pnC"></span></div></div><div id="pnG" style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px"></div><div id="pnS" style="margin-top:6px">다 마른 책 0 / ${N}</div><div id="pnT">${TL}초</div><div style="font-size:11px;opacity:.85">맑을 때 눌러 펼치고, 비 오기 전에 다시 눌러 덮어요</div>`;
  const grid=d.querySelector('#pnG');const btn=st.map((s,i)=>{const b=document.createElement('button');b.style.cssText="font:13px 'Do Hyeon',sans-serif;border:0;border-radius:8px;padding:6px 0;cursor:pointer;background:#8a5a2a;color:#fff;position:relative;overflow:hidden";b.onclick=()=>toggle(i);grid.appendChild(b);return b});
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const draw=()=>{st.forEach((s,i)=>{const b=btn[i];const p=Math.round(s.dry*100);b.textContent=s.done?'✔ 다 마름':(s.open?'📖 ':'📕 ')+'실록 '+(i+1)+' '+p+'%';b.style.background=s.done?'#4a7a3a':s.open?(s.wet>0?'#5a6a8a':'#c8a868'):'#8a5a2a';b.style.color=s.open&&!s.done?'#2a2218':'#fff';books[i].userData.cl.visible=!s.open;books[i].userData.op.visible=s.open;books[i].userData.op.material.color.set(s.wet>0?0xb0b8c8:0xf0e8d0)});d.querySelector('#pnW').textContent=WXS[wx][0]+' '+WXS[wx][1];d.querySelector('#pnN').textContent=WXS[next][0];d.querySelector('#pnS').textContent='다 마른 책 '+st.filter(s=>s.done).length+' / '+N};
  const toggle=i=>{if(done)return;const s=st[i];if(s.done)return;s.open=!s.open;snd(s.open?660:440,.08);draw()};
  const cleanup=()=>{books.forEach(b=>{b.userData.cl.visible=true;b.userData.op.visible=false})};
  const fin=()=>{if(done)return;done=true;cleanup();const n=st.filter(s=>s.done).length;const el=performance.now()/1000-t0;const Q=n>=N?Math.max(60,Math.round(100-damage*3-Math.max(0,el-45)*.6)):Math.round(n/N*60);const stars=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('pungnam_poswae',Q,'실록 포쇄')}catch(e){}window.__PNQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0d890">실록 ${n}권을 말렸어요</b><div style="font-size:13px;margin:4px 0">사관은 포쇄한 날짜와 책 이름을 「포쇄형지안」에 꼼꼼히 적었어요. 이렇게 지킨 조선왕조실록은 1997년 유네스코 세계기록유산이 됐어요.</div><div style="font-size:24px;color:#c8a868">${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a868;color:#2a2218;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__PNPOS()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  draw();
  const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}const now=performance.now()/1000,dt=Math.min(.1,now-last);last=now;
   if(!done){wt+=dt;const left=wdur-wt;d.querySelector('#pnC').textContent=Math.ceil(Math.max(0,left))+'초 뒤';if(wt>=wdur){wx=next;next=seq();wt=0;wdur=5+Math.random()*4;snd(wx==='rain'?220:520,.3,'sine')}
    for(const s of st){if(s.done||!s.open)continue;if(wx==='sun'){s.dry=Math.min(1,s.dry+dt/(8+(s.i||0)));s.wet=Math.max(0,s.wet-dt)}else if(wx==='cloud'){s.dry=Math.min(1,s.dry+dt/24)}else{s.dry=Math.max(0,s.dry-dt/8);s.wet+=dt;damage+=dt}if(s.dry>=1){s.done=true;s.open=false;snd(880,.15)}}
    draw();if(st.every(s=>s.done))fin();const tl=Math.max(0,TL-(now-t0));d.querySelector('#pnT').textContent=Math.ceil(tl)+'초';if(tl<=0)fin()}
   requestAnimationFrame(loop)};loop();
  window.__PNG={toggle,st,get wx(){return wx},get next(){return next},get wleft(){return wdur-wt}};try{ctx.say('맑은 날 실록을 펼쳐 말려요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'성벽 돌',h:'1907년 헐린 전주부성의 성돌이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.3,.16,.2),M(0xb0a48e)))})},
  {n:'궤 쇠장식',h:'실록을 담던 나무 궤의 쇠 장식이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.14,.02,.1),M(0x4a3a30,{metalness:.6})))})},
  {n:'한지 조각',h:'전주는 질 좋은 한지(전주 한지)로 이름났어요. 실록도 한지에 찍었어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.22,.005,.16),M(0xf0e8d0)))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})}];
 window.__PNDIG=()=>{window.__DETECT&&window.__DETECT({key:'pungnam_dig',title:'전주 풍남문 발굴 탐지',emoji:'⛏️',bg:'#2a2218',count:4,TL:150,cand:[[20,6],[30,-10],[-30,0],[24,30],[-30,-30],[34,20],[-34,10],[10,40]],items:ITEMS,intro:'풍남문 둘레 땅속에 옛 전주부성의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'전주는 조선 왕실의 뿌리이자 실록을 지켜 낸 고장이에요.'})};
 const meta={quest:{t:'풍남문과 전주사고 둘러보기',d:'풍남문과 전주사고를 둘러보세요.',steps:[['풍남문','풍남문'],['사고','전주사고'],['포쇄','포쇄 마당']]},
  title:'전주 풍남문·전주사고',hint:'옹성을 두른 풍남문과 실록을 지켜 낸 전주사고를 간추려 지었어요. 맑은 날 실록을 펼쳐 말려 봐요(포쇄).',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:12,z:2,lines:['전주 풍남문·전주사고','보물 풍남문','실록을 지킨 사고','간추려 지음']}},
  npc:[['science',[[8,0],[16,0],[16,8],[8,8]]]],bounds:[-90,90,-90,90],level:()=>'전주',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.3,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#b8a888';g.fillRect(0,0,300,300);g.fillStyle='#b0a48e';g.fillRect(X(FX-18),Z(FZ-4.5),36*S,9*S);g.strokeStyle='#b0a48e';g.lineWidth=4;g.beginPath();g.arc(X(FX),Z(FZ+4),12*S,0,Math.PI);g.stroke();g.fillStyle='#8a5a38';g.fillRect(X(KX-14),Z(KZ-14),28*S,22*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:12,z:6,yaw:Math.PI},size:{}},meta)}
