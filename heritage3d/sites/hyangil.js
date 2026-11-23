/* 여수 향일암 마당(2026-11-23, 2단계 여섯째 묶음): 돌산도 금오산 벼랑의 암자(원효가 세웠다고 전함). 「해를 향한 암자」라는 이름처럼 남해 해돋이로 이름남.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   돌계단 길 → 큰 바위 사이 좁은 틈 해탈문(몸을 낮춰 지나감) → 원통보전 / 관음전(벼랑 위) / 해돋이 보는 자리. 금오산 바위에는 거북 등 무늬 같은 결이 있어 산 모양을 거북에 빗대요.
   놀이: 이끼 바위 미끄럼 길(한 번 밀면 바위에 막힐 때까지 미끄러지는 거북 돌을 밀어 해돋이 자리에 닿게, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {curvedRoof} from './hallkit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildHyangil(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(644);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(140,200),new THREE.MeshStandardMaterial({map:GT,color:0x7a9a48,roughness:1}));gr.rotation.x=-Math.PI/2;gr.position.set(-46,0,0);gr.receiveShadow=true;G.add(gr)}
 /* 동쪽 바다 + 해 */const SEA=24;{const w=new THREE.Mesh(new THREE.PlaneGeometry(260,260),M(0x3a6a8a,{roughness:.25,metalness:.1}));w.rotation.x=-Math.PI/2;w.position.set(SEA+130,.04,0);G.add(w);solids.push({x0:SEA,x1:300,y0:-5,y1:6,z0:-200,z1:200});const sun=new THREE.Mesh(new THREE.CircleGeometry(9,32),new THREE.MeshBasicMaterial({color:0xffb060,fog:false}));sun.position.set(220,6,0);sun.rotation.y=-Math.PI/2;G.add(sun)}
 const ROCK=M(0x8a8478,{flatShading:true}),ST=M(0xa8a296),WOOD=M(0x8a3a2a),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50);
 /* 거북 등 무늬 바위 */const GT2=tex(128,128,(q,w,h)=>{q.fillStyle='#8a8478';q.fillRect(0,0,w,h);q.strokeStyle='#5a564c';q.lineWidth=3;for(let y=0;y<h;y+=26)for(let x=-(y/26%2)*15;x<w;x+=30){q.beginPath();for(let k=0;k<6;k++){const a=k/6*Math.PI*2;const px=x+15+Math.cos(a)*13,py=y+13+Math.sin(a)*12;k?q.lineTo(px,py):q.moveTo(px,py)}q.closePath();q.stroke()}},[2,2]);const SHELL=new THREE.MeshStandardMaterial({map:GT2,roughness:1,flatShading:true});
 const boulder=(x,z,s,sy=1,mat=ROCK)=>{const b=new THREE.Mesh(new THREE.DodecahedronGeometry(s,0),mat);b.scale.y=sy;b.position.set(x,s*sy*.6,z);b.rotation.y=r()*3;G.add(b);solids.push({cx:x,cz:z,r:s*.9,y0:0,y1:s*sy*1.4});return b};
 /* 뒤 금오산 바위들 */for(let i=0;i<10;i++)boulder(-30-r()*14,-40+i*9,5+r()*3,1.4,SHELL);
 const roof=(x,y,z,W,D,h)=>{curvedRoof(G,x,(y+h/2)-(h)/2,z,(W*.72)/.72,(D*.72)/.72,(h)*1.05)};
 const plaque=(x,y,z,txt,w=2,ry=0)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);bd.rotation.y=ry;G.add(bd)};
 /* 돌계단 길 + 해탈문 둘(큰 바위 사이 좁은 틈) */{const p=new THREE.Mesh(new THREE.PlaneGeometry(3,40),M(0xb0a890));p.rotation.x=-Math.PI/2;p.position.set(0,.02,30);G.add(p);for(const gz of[34,20]){boulder(-3.4,gz,2.8,1.5,SHELL);boulder(3.4,gz,2.8,1.5,SHELL);const cap=new THREE.Mesh(new THREE.DodecahedronGeometry(2.2,0),SHELL);cap.scale.set(1.6,.5,1);cap.position.set(0,4.4,gz);G.add(cap)}plaque(0,3.6,36.9,'門脫解',1.2)}
 sp(0,40,3,'해탈문','커다란 바위 두 개가 맞대어 생긴 좁은 틈이에요. 몸을 낮추고 지나야 해서 「번뇌를 벗는 문」이라 불러요. 이런 바위 틈이 여러 곳 있어요.');
 /* 원통보전(동쪽 바다를 봄) */const HX=4,HZ=2;{const b=new THREE.Mesh(new THREE.BoxGeometry(8.4,.8,9.4),ST);b.position.set(HX,.4,HZ);G.add(b);const w=new THREE.Mesh(new THREE.BoxGeometry(7,3,8),WALLW);w.position.set(HX,2.3,HZ);G.add(w);for(let i=0;i<=3;i++)for(const j of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.18,.2,3,10),WOOD);c.position.set(HX+j*3.5,2.3,HZ-4+i*8/3);G.add(c)}roof(HX,3.8,HZ,10,11,2.4);solids.push({x0:HX-4.2,x1:HX+4.2,y0:0,y1:3.8,z0:HZ-4.7,z1:HZ+4.7});plaque(HX+3.52,3.3,HZ,'殿寶通圓',2,Math.PI/2)}
 sp(HX+7,HZ,3,'원통보전','관세음보살을 모신 법당이에요. 동쪽 바다를 보고 앉아 있어요.');
 /* 관음전(벼랑 위) */{const X=-10,Z=-14;boulder(X,Z,3.4,.8,SHELL);const w=new THREE.Mesh(new THREE.BoxGeometry(4,2.4,3.2),WALLW);w.position.set(X,4,Z);G.add(w);roof(X,5.2,Z,6,5,1.6)}
 sp(-5,-12,3,'관음전','벼랑 바위 위의 작은 전각이에요. 원효대사가 수도했다는 바위(좌선대)가 가까이 있다고 전해요(전해 오는 이야기).');
 /* 해돋이 보는 자리 + 거북 석상 */{const X=18,Z=-6;const deck=new THREE.Mesh(new THREE.BoxGeometry(6,.3,5),ST);deck.position.set(X,.15,Z);G.add(deck);for(let i=0;i<5;i++){const t=new THREE.Group();const sh=new THREE.Mesh(new THREE.SphereGeometry(.28,10,8),M(0x6a6658));sh.scale.set(1,.45,1.25);t.add(sh);const hd=new THREE.Mesh(new THREE.SphereGeometry(.1,8,6),M(0x6a6658));hd.position.set(0,0,.36);t.add(hd);t.position.set(X+2.6,.5,Z-2+i);t.rotation.y=Math.PI/2;G.add(t)}}
 sp(17,-6,3,'해돋이 보는 자리','남해에서 해가 떠오르는 곳이에요. 해마다 새해 첫날 해맞이하러 많은 사람이 와요. 난간의 작은 거북 석상들은 금오산 거북 이야기를 따른 것이에요.');
 /* 이끼 바위 미끄럼 길(11/23) */const BX=-22,BZ=14;const bg=new THREE.Group();bg.position.set(BX,0,BZ);bg.visible=false;G.add(bg);
 window.__HYSLIDE=()=>{if(document.getElementById('hyiP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(BX,BZ+12,0)}catch(e){}bg.visible=true;
  let rd=0,N=6,rocks=new Set(),pos=0,goal=0,moves=0,minM=0,done=false,auto=false,last=performance.now(),t0=0,wait=0,anim=null,plan=[];const res=[];const CS=1.1;
  const camA=()=>{const k=innerWidth<innerHeight?1.7:1;const sp2=N*CS;return[BX,sp2*1.15*k+2,BZ+sp2*.9*k,BX,0,BZ,50]};window.__GCAM=()=>document.getElementById('hyiP')?camA():null;
  const snd=(f,len=.1,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const P=i=>[((i%N)-(N-1)/2)*CS,(((i/N)|0)-(N-1)/2)*CS];
  const slide=(p,d)=>{const[dc,dr]=d;let c=p%N,rr=(p/N)|0;while(true){const nc=c+dc,nr=rr+dr;if(nc<0||nr<0||nc>=N||nr>=N||rocks.has(nr*N+nc))break;c=nc;rr=nr;if(rr*N+c===goal)break}return rr*N+c};
  const DIRS=[[0,-1],[0,1],[-1,0],[1,0]];
  const bfs=(s)=>{const prev=new Map([[s,null]]);const Q=[s];while(Q.length){const p=Q.shift();if(p===goal){const path=[];let k=p;while(prev.get(k)){const[pp,d]=prev.get(k);path.unshift(d);k=pp}return path}for(const d of DIRS){const q=slide(p,d);if(q!==p&&!prev.has(q)){prev.set(q,[p,d]);Q.push(q)}}}return null};
  const clr=()=>{while(bg.children.length)bg.remove(bg.children[0])};let tok=null;
  const newRound=()=>{clr();N=[6,7,8][rd];const need=[4,6,8][rd];for(let tr=0;tr<3000;tr++){rocks=new Set();const nr=Math.round(N*N*.18);while(rocks.size<nr)rocks.add((r()*N*N)|0);const free=[...Array(N*N).keys()].filter(i=>!rocks.has(i));pos=free[(r()*free.length)|0];goal=free[(r()*free.length)|0];if(pos===goal)continue;const pth=bfs(pos);if(pth&&pth.length>=need){plan=pth;minM=pth.length;break}}moves=0;
   for(let i=0;i<N*N;i++){const[x,z]=P(i);const t=new THREE.Mesh(new THREE.BoxGeometry(CS*.97,.2,CS*.97),M(i%2?0x6a8a5a:0x5a7a4a,{roughness:.5}));t.position.set(x,.1,z);bg.add(t);if(rocks.has(i)){const k=new THREE.Mesh(new THREE.DodecahedronGeometry(.5,0),SHELL);k.scale.y=.9;k.position.set(x,.55,z);bg.add(k)}}
   const[gx,gz]=P(goal);const gm=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,.12,20),new THREE.MeshBasicMaterial({color:0xffb060}));gm.position.set(gx,.26,gz);bg.add(gm);
   tok=new THREE.Group();const sh=new THREE.Mesh(new THREE.SphereGeometry(.36,12,8),M(0x6a6658));sh.scale.set(1,.5,1.25);tok.add(sh);const hd=new THREE.Mesh(new THREE.SphereGeometry(.13,8,6),M(0x7a766a));hd.position.set(0,.02,.46);tok.add(hd);const[x0,z0]=P(pos);tok.position.set(x0,.38,z0);bg.add(tok);
   t0=performance.now()/1000;ui()};
  const d=document.createElement('div');d.id='hyiP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1e2a30;border:3px solid #ffb060;border-radius:16px;padding:12px 14px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef4f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const Bs="font:16px 'Do Hyeon',sans-serif;background:#ffb060;color:#1e2a30;border:0;border-radius:8px;width:44px;height:36px;margin:2px;cursor:pointer";
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffd0a0">🐢 이끼 바위 미끄럼 길 ${rd+1}/3</b><div style="font-size:12px;margin:4px 0;line-height:1.5">이끼 낀 바위라 거북 돌을 한 번 밀면 바위에 막힐 때까지 쭉 미끄러져요. 해돋이 자리(주황 원)에 멈추게 해요.</div><div><button data-d="0" style="${Bs}">▲</button></div><div><button data-d="2" style="${Bs}">◀</button><button data-d="1" style="${Bs}">▼</button><button data-d="3" style="${Bs}">▶</button></div><div style="font-size:12px;margin:3px 0">민 횟수 ${moves} (가장 적게 ${minM}번)</div><div style="font-size:13px;color:#ffd0a0;min-height:18px">${msg}</div><button data-z style="font:12px 'Do Hyeon',sans-serif;background:#3a4a50;color:#eef4f8;border:0;border-radius:8px;padding:3px 8px;margin:2px;cursor:pointer">처음 자리로</button><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f8;border:1px solid #eef4f8;border-radius:8px;padding:2px 8px;margin:2px;cursor:pointer">그만</button>`;d.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>push(+b.dataset.d));d.querySelector('[data-z]').onclick=()=>{if(anim||wait>0)return;pos=startP;const[x,z]=P(pos);tok.position.set(x,.38,z);moves+=1;ui()};d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  let startP=0;const _nr=newRound;
  const push=k=>{if(done||wait>0||anim)return;const q=slide(pos,DIRS[k]);if(q===pos){snd(180,.1,'sawtooth');return}moves++;const[x0,z0]=P(pos),[x1,z1]=P(q);anim={x0,z0,x1,z1,t:0,dur:.12*Math.hypot(x1-x0,z1-z0)/CS+.05};tok.rotation.y=Math.atan2(x1-x0,z1-z0);pos=q;snd(300,.15)};
  const onKey=e=>{if(!document.getElementById('hyiP')||done)return;const k={ArrowUp:0,ArrowDown:1,ArrowLeft:2,ArrowRight:3}[e.key];if(k!=null){e.preventDefault();e.stopPropagation();push(k)}};window.addEventListener('keydown',onKey,true);
  const cleanup=()=>{clr();bg.visible=false;window.removeEventListener('keydown',onKey,true)};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3);const s2=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('hyangil_slide',Q,'이끼 바위 미끄럼 길')}catch(e){}window.__HYIQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#ffd0a0">거북 돌이 해돋이 자리에 닿았어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">향일암이 앉은 금오산은 바위에 거북 등 무늬 같은 결이 있어, 산 전체를 바다로 들어가는 거북에 빗대요. 바닷가 바위는 이끼와 물기로 미끄러워 조심조심 걸어야 해요(놀이판은 간추린 것).</div><div style="font-size:24px;color:#ffb060">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#ffb060;color:#1e2a30;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f8;border:2px solid #eef4f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__HYSLIDE()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  let at=0;const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(anim){anim.t+=dt;const k=Math.min(1,anim.t/anim.dur);tok.position.set(anim.x0+(anim.x1-anim.x0)*k,.38,anim.z0+(anim.z1-anim.z0)*k);if(k>=1){anim=null;if(pos===goal){wait=1.3;snd(700,.4,'sine');ui('해돋이 자리에 닿았어요!')}else ui()}}
   if(auto&&wait<=0&&!anim){at+=dt;if(at>.3){at=0;const p=bfs(pos);if(p&&p.length)push(DIRS.findIndex(d2=>d2===p[0]))}}
   if(wait>0){wait-=dt;if(wait<=0){const el=performance.now()/1000-t0;res.push(Math.max(30,Math.round(100-Math.max(0,moves-minM)*6-Math.max(0,el-25-rd*15)*.4)));rd++;if(rd>=3){fin();return}newRound();startP=pos}}
   requestAnimationFrame(step)};
  newRound();startP=pos;requestAnimationFrame(step);window.__HYIG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},push,get moves(){return moves},get min(){return minM}};try{ctx.say('거북 돌을 밀어 해돋이 자리에 멈추게 해 봐요!',2.4)}catch(e){}};
 spots.push({x:BX,y:0,z:BZ+6,r:2.6,t:'미끄럼 바위 마당',h:'이끼 낀 바위 위에서 거북 돌을 밀어 해돋이 자리에 멈추게 해 봐요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,40],[0,3,22],[HX+6,3,HZ],[-6,3,-12],[17,2.4,-6],[BX,3,BZ+6]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'조개껍데기',h:'바닷가 바위 틈에서 나온 조개껍데기예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.06,10,6,0,Math.PI*2,0,Math.PI/2),M(0xe8dcc8)))})},
  {n:'기와 조각',h:'암자 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'청동 풍경',h:'처마 끝에서 울리던 작은 종이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.03,.05,.09,10),M(0x5a7a62,{metalness:.5})))})},
  {n:'백자 등잔',h:'새벽 예불을 밝히던 백자 등잔이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.07,.05,.04,14),M(0xf0ece0)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(8,46,2.4,'발굴 탐지 자리','돌계단 길 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__HYIDIG=()=>{window.__DETECT&&window.__DETECT({key:'hyangil_dig',title:'향일암 발굴 탐지',emoji:'⛏️',bg:'#1e2a30',count:4,TL:150,cand:[[-8,46],[8,28],[-8,26],[8,12],[-10,6],[14,-16],[-14,-26],[10,-24],[-20,30],[16,8]],items:DIG,intro:'향일암 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'향일암은 남해를 내려다보는 벼랑의 암자로, 해돋이 명소예요.'})};
 const meta={quest:{t:'향일암 둘러보기',d:'돌계단을 올라 바위 틈 해탈문을 지나 원통보전·관음전과 해돋이 보는 자리까지 가 보세요.',steps:[['해탈문','해탈문'],['원통보전','원통보전'],['관음전','관음전'],['해돋이','해돋이 보는 자리']]},
  title:'여수 향일암',hint:'금오산 향일암을 공개 사진으로 간추려 지었어요(배치·크기 어림). 이끼 바위 마당에서 거북 돌을 밀어 해돋이 자리에 멈추게 해 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:true,sign:{x:-6,z:50,lines:['여수 향일암','해를 향한 암자','해탈문 · 원통보전 · 해돋이','간추려 지음']}},
  npc:[['science',[[-6,48],[6,48],[6,54],[-6,54]]]],bounds:[-50,SEA,-40,60],level:()=>'여수 향일암',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.2,ox:-10,oz:8,draw(g,X,Z,S){g.fillStyle='#7a9a48';g.fillRect(0,0,300,300);g.fillStyle='#3a6a8a';g.fillRect(X(SEA),0,300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:52,yaw:Math.PI},size:{}},meta)}
