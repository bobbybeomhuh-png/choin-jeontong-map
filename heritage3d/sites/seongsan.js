/* 제주 성산일출봉·만장굴 마당(2026-11-22, 제주 덧붙이기 E12): 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   제주 화산섬과 용암동굴(세계자연유산 2007): 성산일출봉은 바다 속에서 터진 화산이 만든 응회구(높이 약 180m, 분화구 지름 약 600m, 둘레 99개 봉우리). 여기서는 1/6 크기로 줄여 지음.
   만장굴: 길이 약 7.4km 용암동굴. 세계에서 가장 큰 축에 드는 용암석주(높이 7.6m), 용암발가락·거북바위·용암유선·용암선반 같은 지형. 굴 일부를 실제 크기 느낌으로 지어 걸어 들어감(약 80m).
   놀이: 만장굴 탐험(어둠 속 손전등으로 용암 지형 다섯 곳 찾기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildSeongsan(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(2007);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 성산일출봉(북쪽, 중심 0,-62): 바깥 비탈 + 들쭉날쭉한 분화구 테두리 + 안쪽 사발 */const SX=0,SZ=-62;const ss=t=>t<=0?0:t>=1?1:t*t*(3-2*t);
 const H=(x,z)=>{const d=Math.hypot(x-SX,z-SZ);const a=Math.atan2(z-SZ,x-SX);const rim=30+Math.sin(a*11)*1.6+Math.sin(a*29)*.8;if(d>44)return 0;if(d>17)return rim*ss((44-d)/27);if(d>13)return rim;return rim-(13-d)*1.3};
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(220,220,180,180);g.rotateX(-Math.PI/2);const p=g.attributes.position;const col=[];const c=new THREE.Color();for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);const h=H(x,z);p.setY(k,h);const d=Math.hypot(x-SX,z-SZ);c.set(d<13?'#7aa040':d<19?'#7a6a58':h>4?'#6a9a3a':'#8a9a4a');col.push(c.r,c.g,c.b)}g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1,flatShading:true}));m.receiveShadow=true;G.add(m)}
 /* 바다(북·동쪽) */{const WT=tex(256,256,(q,w,h)=>{q.fillStyle='#2f6a86';q.fillRect(0,0,w,h);for(let i=0;i<220;i++){q.strokeStyle=`rgba(230,245,250,${.08+r()*.14})`;q.lineWidth=1+r()*2;const x=r()*w,y=r()*h;q.beginPath();q.moveTo(x,y);q.lineTo(x+18+r()*20,y);q.stroke()}},[10,10]);const sea=new THREE.Mesh(new THREE.RingGeometry(46,200,48),new THREE.MeshStandardMaterial({map:WT,roughness:.1,metalness:.2,side:THREE.DoubleSide}));sea.rotation.x=-Math.PI/2;sea.position.set(SX,-.3,SZ-20);G.add(sea)}
 /* 오르는 길(남쪽 비탈 계단 난간) */{const rail=M(0x8a6a44);for(let k=0;k<26;k++){const t=k/26;const z=SZ+42-t*26,x=SX+6+Math.sin(t*4)*3;const p=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,1,5),rail);p.position.set(x,H(x,z)+.5,z);G.add(p)}}
 /* 만장굴(남쪽, 동서로 긴 굴): 반원통 껍질(안에서 보이게 양면) */const TX0=-40,TX1=40,TZ=34,TR=5.2;const lavaM=M(0x3a3430,{roughness:1,side:THREE.DoubleSide});
 {const shell=new THREE.Mesh(new THREE.CylinderGeometry(TR,TR,TX1-TX0,28,8,true,0,Math.PI),lavaM);shell.rotation.z=Math.PI/2;shell.rotation.x=0;shell.position.set((TX0+TX1)/2,0,TZ);shell.rotation.set(0,0,Math.PI/2);G.add(shell);
  const fix=new THREE.Group();G.add(fix);
  const cap=new THREE.Mesh(new THREE.CircleGeometry(TR,24,0,Math.PI),lavaM);cap.rotation.y=Math.PI/2;cap.position.set(TX1,0,TZ);G.add(cap);
  const mound=new THREE.Mesh(new THREE.CylinderGeometry(TR+1.4,TR+1.4,TX1-TX0,20,1,true,0,Math.PI),M(0x6a8a3a,{roughness:1}));mound.rotation.set(0,0,Math.PI/2);mound.position.set((TX0+TX1)/2,-.05,TZ);mound.scale.set(1,1,1);G.add(mound);
  const fl=new THREE.Mesh(new THREE.BoxGeometry(TX1-TX0,.1,TR*1.8),M(0x2a2420));fl.position.set((TX0+TX1)/2,.05,TZ);G.add(fl);
  solids.push({x0:TX0,x1:TX1+1,y0:-1,y1:8,z0:TZ-TR-1.6,z1:TZ-TR*.8},{x0:TX0,x1:TX1+1,y0:-1,y1:8,z0:TZ+TR*.8,z1:TZ+TR+1.6},{x0:TX1-.3,x1:TX1+1.6,y0:-1,y1:8,z0:TZ-TR,z1:TZ+TR});
  /* 굴 안 지형 다섯 */const F=[];const col=M(0x4a423a,{roughness:1,flatShading:true});
  {const c=new THREE.Mesh(new THREE.CylinderGeometry(.7,1.4,TR,10),col);c.position.set(TX1-6,TR/2,TZ);G.add(c);solids.push({cx:TX1-6,cz:TZ,r:1.4,y0:0,y1:TR});F.push(['용암석주',TX1-9,TZ,'천장의 구멍으로 쏟아진 용암이 바닥에 쌓여 생긴 기둥이에요. 높이 7.6m로 세계에서 가장 큰 축에 들어요.'])}
  {const t=new THREE.Mesh(new THREE.DodecahedronGeometry(1,0),col);t.scale.set(1.4,.5,1);t.position.set(4,.4,TZ+2);G.add(t);F.push(['거북바위',4,TZ,'바닥에 떨어진 용암 덩어리가 거북처럼 생겼어요. 제주도 모양을 닮았다고도 해요.'])}
  {for(let k=0;k<4;k++){const tw=new THREE.Mesh(new THREE.SphereGeometry(.5,8,6),col);tw.scale.set(1.6,.4,.6);tw.position.set(-22+k*.9,.2,TZ-2.6+k*.3);G.add(tw)}F.push(['용암발가락',-21,TZ-1,'굳어 가던 용암이 발가락처럼 여러 갈래로 흘러내린 자국이에요.'])}
  {for(let k=0;k<3;k++){const ln=new THREE.Mesh(new THREE.BoxGeometry(30,.08,.1),M(0x6a5a4a));ln.position.set(-4,1.2+k*.5,TZ-TR+.35+k*.05);G.add(ln)}F.push(['용암유선',-12,TZ-2,'굴 벽에 가로로 그어진 줄무늬예요. 용암이 흐르던 높이가 바뀔 때마다 생겼어요.'])}
  {const sh=new THREE.Mesh(new THREE.BoxGeometry(14,.3,1.4),col);sh.position.set(22,1.6,TZ+TR-1.4);G.add(sh);F.push(['용암선반',22,TZ+2,'벽에 선반처럼 튀어나온 턱이에요. 용암이 빠져나가며 굳은 자리예요.'])}
  window.__SSF=F}
 const NL=[];if(!mini){for(const x of[-30,-10,10,30]){const L=new THREE.PointLight(0xffd8a0,.6,10,1.5);L.position.set(x,3,TZ);G.add(L);NL.push(L)}}
 const sun=new THREE.Mesh(new THREE.SphereGeometry(5,20,14),new THREE.MeshBasicMaterial({color:0xffb060,transparent:true,opacity:0}));sun.position.set(SX+60,10,SZ-140);G.add(sun);
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=.6+nk*3;sun.material.opacity=nk*.0};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(SX+10,SZ+46,3.4,'성산일출봉','바다 속에서 터진 화산이 만든 응회구예요. 높이 약 180m, 분화구 둘레에 99개의 바위 봉우리가 왕관처럼 둘러 있어요. 2007년 세계자연유산. 1/6 크기로 줄여 지었어요. 꼭대기까지 올라가 봐요.');
 sp(SX,SZ,4,'분화구','지름 약 600m의 사발 모양 분화구예요. 안쪽은 풀밭이에요.');
 sp(TX0-4,TZ,2.6,'만장굴 입구','길이 약 7.4km의 용암동굴이에요(세계자연유산). 손전등을 들고 들어가 용암이 만든 지형을 찾아 봐요.');
 sp(30,64,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 만장굴 탐험(11/22): 화면이 어두워지고 손전등 빛만 남아요. 굴 안을 걸으며 다섯 지형에 다가가면 이름이 밝혀져요. 120초 */
 window.__SSCAVE=()=>{if(document.getElementById('scvP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(TX0+2,TZ,0);H3.face(-Math.PI/2)}catch(e){}
  const F=window.__SSF;const got=F.map(()=>false);let n=0,done=false,t0=performance.now()/1000;const TL=120;
  const dark=document.createElement('div');dark.id='scvD';dark.style.cssText="position:fixed;inset:0;z-index:54;pointer-events:none;background:radial-gradient(circle at 50% 55%,rgba(0,0,0,0) 0,rgba(0,0,0,0) 18%,rgba(0,0,0,.92) 42%)";document.body.appendChild(dark);
  const d=document.createElement('div');d.id='scvP';d.style.cssText="position:fixed;right:12px;top:90px;z-index:60;background:#1a1614;border:3px solid #c8a060;border-radius:16px;padding:10px 14px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:220px;user-select:none";document.body.appendChild(d);
  const list=()=>F.map((f,i)=>`<div style="text-align:left;${got[i]?'color:#f0d080':'opacity:.5'}">${got[i]?'✔ '+f[0]:'? ? ?'}</div>`).join('');
  const render=(msg)=>{d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d080">🔦 만장굴 탐험</b><div style="font:16px 'Do Hyeon',sans-serif;margin:4px 0">${n} / ${F.length}곳</div>${list()}<div id="scvG" style="font-size:12px;color:#f0d080;margin-top:4px">${msg||'굴 안을 걸어 지형을 찾아요'}</div><div id="scvT">${Math.ceil(Math.max(0,TL-(performance.now()/1000-t0)))}초</div>`};render();
  const snd=(f,len)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='sine';o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const fin=()=>{if(done)return;done=true;dark.remove();const el=performance.now()/1000-t0;const Q=n>=F.length?Math.max(60,Math.round(100-Math.max(0,el-60)*.6)):Math.round(n/F.length*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('seongsan_cave',Q,'만장굴 탐험')}catch(e){}window.__SCVQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0d080">지형 ${n}곳을 찾았어요</b><div style="font-size:13px;margin:4px 0">만장굴은 약 10만~30만 년 전 흐른 용암의 겉이 먼저 굳고 속의 용암이 빠져나가며 생긴 굴이에요. 제주에는 이런 용암동굴이 160개 넘게 있어요.</div><div style="font-size:24px;color:#c8a060">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a060;color:#1a1614;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__SSCAVE()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  let tick=0,last=t0;const loop=()=>{if(!d.isConnected){dark.remove();return}const now=performance.now()/1000,dt=now-last;last=now;
   if(!done){const P=H3.P;if(P){F.forEach((f,i)=>{if(got[i])return;if(Math.hypot(P.x-f[1],P.z-f[2])<4.2){got[i]=true;n++;snd(520+n*90,.5);render(f[0]+' — '+f[3]);if(n>=F.length)fin()}})}tick+=dt;if(tick>1&&!done){tick=0;const t=d.querySelector('#scvT');if(t)t.textContent=Math.ceil(Math.max(0,TL-(now-t0)))+'초'}if(now-t0>=TL)fin()}
   requestAnimationFrame(loop)};loop();
  window.__SCVG={get n(){return n},F};try{ctx.say('손전등을 들고 만장굴로 들어가요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'현무암 조각',h:'구멍이 숭숭 난 제주 현무암이에요. 용암 속 가스가 빠져나간 자리예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.DodecahedronGeometry(.1,0),M(0x3a3634,{flatShading:true})))})},
  {n:'화산탄',h:'화산이 터질 때 날아가 공중에서 굳은 용암 덩어리예요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.09,10,8),M(0x4a3a30));m.scale.set(1.4,.9,.9);g.add(m)})},
  {n:'탐라 토기 조각',h:'옛 탐라국 사람들이 쓰던 토기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.1,.12,12,1,true),M(0x7a5a3a,{side:THREE.DoubleSide})))})},
  {n:'조개껍데기',h:'성산 바닷가 조개무지에서 나온 조개껍데기예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.06,10,6,0,Math.PI*2,0,Math.PI/2),M(0xe8e0d0)))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__SSSDIG=()=>{window.__DETECT&&window.__DETECT({key:'seongsan_dig',title:'성산 발굴 탐지',emoji:'⛏️',bg:'#1a1614',count:4,TL:150,cand:[[30,64],[-30,60],[50,40],[-50,40],[0,70],[60,10],[-60,10],[20,80]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'제주는 화산이 빚은 섬이에요.'})};
 const meta={quest:{t:'성산과 만장굴 둘러보기',d:'성산일출봉에 오르고 만장굴에 들어가 보세요.',steps:[['성산','성산일출봉'],['분화구','분화구'],['굴','만장굴 입구']]},
  title:'제주 성산일출봉·만장굴',hint:'세계자연유산 성산일출봉(1/6 크기)과 만장굴을 간추려 지었어요. 손전등을 들고 만장굴을 탐험해 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:true,groundY:-1,sign:{x:-50,z:44,lines:['제주 성산일출봉·만장굴','세계자연유산','화산섬과 용암동굴','간추려 지음']}},
  npc:[['science',[[-56,46],[-48,46],[-48,54],[-56,54]]]],bounds:[-90,90,-100,90],level:()=>'제주',camCap:()=>Infinity,baseAt:(x,z)=>H(x,z),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.1,ox:0,oz:-10,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#2f6a86';g.beginPath();g.arc(X(SX),Z(SZ-20),120*S,Math.PI,0);g.fill();g.fillStyle='#6a9a3a';g.beginPath();g.arc(X(SX),Z(SZ),44*S,0,7);g.fill();g.fillStyle='#7aa040';g.beginPath();g.arc(X(SX),Z(SZ),13*S,0,7);g.fill();g.fillStyle='#3a3430';g.fillRect(X(TX0),Z(TZ-TR),(TX1-TX0)*S,TR*2*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-50,z:50,yaw:-Math.PI/2},size:{}},meta)}
