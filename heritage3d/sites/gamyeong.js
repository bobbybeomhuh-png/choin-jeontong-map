/* 원주 강원감영 마당(2026-11-22, 원주 덧붙이기 E13): 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   강원감영(사적): 1395년(태조 4)부터 500년 넘게 강원도 관찰사가 머물며 도를 다스린 관청. 정문 포정루(2층 문루) → 중삼문 → 내삼문 → 관찰사 집무 건물 선화당(1667 다시 지음), 뒤뜰 연못과 봉래각.
   관찰사는 해마다 도 안의 고을을 돌아보는 「순력」을 했음(『관동별곡』의 정철도 강원도 관찰사 시절 순력하며 지음).
   놀이: 관찰사 순력 길 짜기(원주에서 떠나 고을을 모두 들러 돌아오는 가장 짧은 길 고르기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildGamyeong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1395);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#b8a888';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=150+(r()*50|0);q.fillStyle=`rgba(${v},${v-12},${v-30},.5)`;q.fillRect(r()*w,r()*h,2,2)}},[40,40]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 if(!mini){const B=spec=>{const h=buildHall(Object.assign({solids,light:false},spec));G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)});return h};
  B({x:0,z:36,ry:Math.PI,W:9,D:4.6,nx:3,nz:2,FY:.6,PH:3.4,roof:'hip',name:'布政樓',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',stairs:'none',upper:{h:2.6},roofScale:.95});
  B({x:0,z:20,ry:Math.PI,W:6,D:2.6,nx:3,nz:1,FY:.3,PH:2.8,roof:'gable',name:'中三門',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',stairs:'none',roofScale:.75});
  B({x:0,z:8,ry:Math.PI,W:6,D:2.6,nx:3,nz:1,FY:.3,PH:2.8,roof:'gable',name:'內三門',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',stairs:'none',roofScale:.75});
  B({x:0,z:-8,ry:Math.PI,W:16,D:9,nx:5,nz:2,FY:1.2,PH:3.6,roof:'hip',name:'宣化堂',pillar:0x9a3a26,bracket:'ik',front:'open',roofScale:1});
  B({x:16,z:-30,ry:Math.PI,W:4,D:4,nx:1,nz:1,FY:1,PH:2.8,roof:'hip',name:'蓬萊閣',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',stairs:'none',rail:true,roofScale:.8});
  const wm=M(0xc8bca8),cap=M(0x50545c);const wall=(x0,z0,x1,z1)=>{const L=Math.hypot(x1-x0,z1-z0);const w=new THREE.Mesh(new THREE.BoxGeometry(L,2,.5),wm);w.position.set((x0+x1)/2,1,(z0+z1)/2);w.rotation.y=-Math.atan2(z1-z0,x1-x0);G.add(w);const c=new THREE.Mesh(new THREE.BoxGeometry(L+.3,.25,.9),cap);c.position.copy(w.position);c.position.y=2.1;c.rotation.y=w.rotation.y;G.add(c);solids.push({x0:Math.min(x0,x1)-.3,x1:Math.max(x0,x1)+.3,y0:0,y1:2.2,z0:Math.min(z0,z1)-.3,z1:Math.max(z0,z1)+.3})};
  wall(-26,-42,26,-42);wall(-26,-42,-26,36);wall(26,-42,26,36);wall(-26,36,-5,36);wall(5,36,26,36);wall(-26,20,-3.5,20);wall(3.5,20,26,20);wall(-26,8,-3.5,8);wall(3.5,8,26,8)}
 {const WT=tex(128,128,(q,w,h)=>{q.fillStyle='#4a7a78';q.fillRect(0,0,w,h)},[2,2]);const pond=new THREE.Mesh(new THREE.BoxGeometry(14,.1,10),new THREE.MeshStandardMaterial({map:WT,roughness:.1}));pond.position.set(14,.06,-30);G.add(pond);solids.push({x0:7,x1:13.5,y0:0,y1:2,z0:-35,z1:-25})}
 const NL=[];if(!mini){for(const[x,y,z]of[[0,5,40],[0,3,24],[0,3,12],[0,5,-2],[16,3,-26]]){const L=new THREE.PointLight(0xffc080,0,22,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(0,44,3,'포정루','강원감영의 정문인 2층 문루예요. 1395년부터 500년 넘게 강원도 관찰사가 이곳에서 도를 다스렸어요(사적). 간추려 지었어요.');
 sp(0,0,3.4,'선화당','관찰사가 일을 보던 중심 건물이에요. 「임금의 덕을 펴 백성을 교화한다」는 뜻이에요.');
 sp(10,-22,2.6,'봉래각','뒤뜰 연못가의 정자예요. 관찰사들이 쉬며 시를 지었어요.');
 sp(-10,-20,2.4,'순력 길 짜는 자리','관찰사는 해마다 도 안의 고을을 돌아보는 순력을 했어요. 정철도 강원도 관찰사 때 순력하며 「관동별곡」을 지었어요. 가장 짧은 순력 길을 짜 봐요.');
 sp(-40,40,2.4,'발굴 탐지 자리','감영 둘레 땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 순력 길 짜기(11/22): 지도의 고을을 차례로 눌러 원주에서 떠나 모두 들르고 원주로 돌아오는 길을 짜요. 가장 짧은 길에 가까울수록 높은 점수. 두 판 */
 const TOWNS={원주:[127.92,37.34],춘천:[127.73,37.88],철원:[127.31,38.15],양양:[128.62,38.07],강릉:[128.88,37.75],삼척:[129.17,37.45],영월:[128.46,37.18],평창:[128.39,37.37],홍천:[127.89,37.70],정선:[128.66,37.38],간성:[128.47,38.38]};
 const ROUNDS=[['춘천','강릉','삼척','영월','홍천'],['철원','양양','강릉','정선','평창','간성']];
 window.__GYTOUR=()=>{if(document.getElementById('gyP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(-10,-20,0)}catch(e){}
  const cv=document.createElement('canvas');cv.id='gyC';cv.style.cssText='position:fixed;inset:0;z-index:55;width:100%;height:100%;touch-action:none';document.body.appendChild(cv);const q=cv.getContext('2d');cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio;
  let ri=0,path=['원주'],done=false,res=[];const dist=(a,b)=>{const[x1,y1]=TOWNS[a],[x2,y2]=TOWNS[b];return Math.hypot((x1-x2)*88,(y1-y2)*111)};
  const len=p=>{let s=0;for(let i=1;i<p.length;i++)s+=dist(p[i-1],p[i]);return s};
  const best=list=>{let b=1e9;const perm=(a,l)=>{if(!a.length){b=Math.min(b,len(['원주',...l,'원주']));return}a.forEach((x,i)=>perm(a.filter((_,j)=>j!==i),[...l,x]))};perm(list,[]);return b};
  const d=document.createElement('div');d.id='gyP';d.style.cssText="position:fixed;right:12px;top:80px;z-index:60;background:#2a2418;border:3px solid #c8a868;border-radius:16px;padding:10px 14px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:210px;user-select:none";document.body.appendChild(d);
  const render=msg=>{const list=ROUNDS[ri]||[];d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d890">🗺️ 관찰사 순력</b><div style="font-size:13px;margin:4px 0">${ri+1} / ${ROUNDS.length}판 · ${Math.round(len(path))}리</div><div style="font-size:12px;color:#f0d890">${msg||'원주에서 떠나 고을을 모두 들르고 원주로 돌아와요'}</div><button id="gyU" style="margin-top:6px;font:13px 'Do Hyeon',sans-serif;background:#5a4a34;color:#fff;border:0;border-radius:8px;padding:4px 10px;cursor:pointer">한 칸 되돌리기</button>`;d.querySelector('#gyU').onclick=()=>{if(path.length>1){path.pop();render()}}};render();
  const snd=(f,len2,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len2);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len2+.02)}catch(e){}};
  const visit=name=>{if(done)return;const list=ROUNDS[ri];if(name==='원주'){if(list.every(t=>path.includes(t))){path.push('원주');const L=len(path),B=best(list);const sc=Math.max(0,1-(L-B)/B*2.5);res.push(sc);snd(sc>.9?880:600,.4);const msg=`${Math.round(L)}리(가장 짧은 길 ${Math.round(B)}리) ${sc>.95?'— 가장 짧은 길이에요!':''}`;ri++;path=['원주'];if(ri>=ROUNDS.length){fin(msg);return}render(msg)}return}if(!list.includes(name)||path.includes(name))return;path.push(name);snd(500+path.length*40,.08);render()};
  const box=()=>{const W=cv.width,Hh=cv.height;const s=Math.min(W*.9,Hh*.62);return{x0:(W-s)/2,y0:Hh*.12,s}};const pos=n=>{const b=box();const[lo,la]=TOWNS[n];return[b.x0+(lo-127.1)/2.2*b.s,b.y0+(38.5-la)/1.45*b.s]};
  cv.onpointerdown=e=>{const X=e.clientX*devicePixelRatio,Y=e.clientY*devicePixelRatio;const names=['원주',...(ROUNDS[ri]||[])];let bn=null,bd=1e9;for(const n of names){const[x,y]=pos(n);const dd=Math.hypot(x-X,y-Y);if(dd<bd){bd=dd;bn=n}}if(bn&&bd<box().s*.07)visit(bn)};
  const cleanup=()=>cv.remove();
  const fin=msg=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/ROUNDS.length*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('gamyeong_tour',Q,'관찰사 순력 길 짜기')}catch(e){}window.__GYQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0d890">순력 ${Q}점</b><div style="font-size:12px;margin:2px 0;color:#f0d890">${msg||''}</div><div style="font-size:13px;margin:4px 0">강원도는 대관령 같은 높은 고개가 많아 순력 길이 험했어요. 관찰사는 고을 수령이 백성을 잘 돌보는지 살폈어요.</div><div style="font-size:24px;color:#c8a868">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a868;color:#2a2418;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__GYTOUR()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}if(done){requestAnimationFrame(loop);return}const W=cv.width,Hh=cv.height,b=box(),S=b.s;q.clearRect(0,0,W,Hh);q.fillStyle='rgba(30,26,18,.6)';q.fillRect(0,0,W,Hh);q.fillStyle='#e8dcc0';q.fillRect(b.x0-10,b.y0-10,S+20,S+20);q.strokeStyle='#8a7a5a';q.lineWidth=3;q.strokeRect(b.x0-10,b.y0-10,S+20,S+20);
   q.fillStyle='#6a9ab0';q.beginPath();q.moveTo(b.x0+S*.78,b.y0);q.lineTo(b.x0+S+10,b.y0);q.lineTo(b.x0+S+10,b.y0+S);q.lineTo(b.x0+S*.98,b.y0+S);q.lineTo(b.x0+S*.86,b.y0+S*.4);q.closePath();q.fill();
   q.strokeStyle='#c83a2a';q.lineWidth=4;q.beginPath();path.forEach((n,i)=>{const[x,y]=pos(n);i?q.lineTo(x,y):q.moveTo(x,y)});q.stroke();
   for(const n of['원주',...(ROUNDS[ri]||[])]){const[x,y]=pos(n);const v=path.includes(n)&&n!=='원주';q.fillStyle=n==='원주'?'#c83a2a':v?'#5a7a3a':'#3a2a18';q.beginPath();q.arc(x,y,S*.025,0,7);q.fill();q.fillStyle='#2a2418';q.font=`${Math.round(S*.045)}px "Do Hyeon",sans-serif`;q.fillText(n,x+S*.03,y-S*.02)}
   requestAnimationFrame(loop)};loop();
  window.__GYG={visit,best,get ri(){return ri},ROUNDS,order:list=>{let bp=null,b=1e9;const perm=(a,l)=>{if(!a.length){const L=len(['원주',...l,'원주']);if(L<b){b=L;bp=l}return}a.forEach((x,i)=>perm(a.filter((_,j)=>j!==i),[...l,x]))};perm(list,[]);return bp}};try{ctx.say('가장 짧은 순력 길을 짜요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'관인 도장 조각',h:'관청 문서에 찍던 관인의 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.08,.08,.08),M(0x6a5a30,{metalness:.6})))})},
  {n:'막새 기와',h:'감영 건물 지붕 끝 기와예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18),M(0x5a5a5a)))})},
  {n:'백자 접시',h:'감영에서 쓰던 백자 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'벼루',h:'공문을 쓰던 벼루예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.04,.13),M(0x2a2a2e)))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__GYDIG=()=>{window.__DETECT&&window.__DETECT({key:'gamyeong_dig',title:'강원감영 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[-40,40],[40,40],[-40,-40],[40,-40],[-50,0],[50,0],[0,60],[0,-60]],items:ITEMS,intro:'감영 둘레 땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'강원감영은 500년 동안 강원도를 다스린 관청이에요.'})};
 const meta={quest:{t:'강원감영 둘러보기',d:'포정루를 지나 선화당과 봉래각까지 둘러보세요.',steps:[['포정루','포정루'],['선화당','선화당'],['봉래각','봉래각']]},
  title:'원주 강원감영',hint:'500년 동안 강원도를 다스린 강원감영을 간추려 지었어요. 관찰사가 되어 가장 짧은 순력 길을 짜 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:8,z:46,lines:['원주 강원감영','1395~1895 강원도 관청','포정루 · 선화당','간추려 지음']}},
  npc:[['science',[[4,44],[12,44],[12,52],[4,52]]]],bounds:[-90,90,-90,90],level:()=>'원주',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.3,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#b8a888';g.fillRect(0,0,300,300);g.strokeStyle='#8a7a5a';g.lineWidth=3;g.strokeRect(X(-26),Z(-42),52*S,78*S);g.fillStyle='#9a3a26';g.fillRect(X(-8),Z(-12.5),16*S,9*S);g.fillStyle='#4a7a78';g.fillRect(X(7),Z(-35),14*S,10*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:8,z:50,yaw:Math.PI},size:{}},meta)}
