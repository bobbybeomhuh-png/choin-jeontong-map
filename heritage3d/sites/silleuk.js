/* 여주 신륵사 마당(2026-11-23, 2단계 일곱째 묶음): 남한강(여강) 가 바위 언덕에 선 절. 강가 바위 위 다층전탑(보물, 벽돌탑)과 정자 강월헌.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   극락보전 앞 다층석탑(보물, 흰 대리석), 조사당(보물), 보제존자석종(보물, 나옹선사 사리탑).
   강에서 나온 사나운 용마를 나옹선사가 신령한 굴레(神勒)로 길들였다는 이야기가 전해 옴(전해 오는 이야기).
   놀이: 전탑 벽돌 무늬 맞추기(가로줄·세로줄마다 같은 무늬가 한 번씩만 들어가게 빈 벽돌을 눌러 무늬를 바꿔요. 라틴 방진, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {curvedRoof,buildHall} from './hallkit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildSilleuk(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1379);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7c9a4a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 남한강(동쪽) */const RX=30;{const w=new THREE.Mesh(new THREE.PlaneGeometry(80,220),M(0x4a7ea8,{roughness:.2,metalness:.1}));w.rotation.x=-Math.PI/2;w.position.set(RX+40,.04,0);G.add(w);const far=new THREE.Mesh(new THREE.BoxGeometry(30,6,220),M(0x5a7a44,{flatShading:true}));far.position.set(RX+95,3,0);G.add(far);
  /* 황포돛배 */const bt=new THREE.Group();bt.position.set(RX+16,.04,-10);G.add(bt);const hull=new THREE.Mesh(new THREE.BoxGeometry(1.8,.5,6),M(0x7a5a3a));hull.position.y=.25;bt.add(hull);const mast=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,5,6),M(0x6a4a2a));mast.position.y=2.9;bt.add(mast);const sail=new THREE.Mesh(new THREE.PlaneGeometry(2.6,3.4),M(0xd8b048,{side:THREE.DoubleSide}));sail.position.set(0,3,0);sail.rotation.y=Math.PI/2;bt.add(sail)}
 const ST=M(0xa8a296),ST2=M(0x948e82),ROCK=M(0x8e8a80,{flatShading:true}),BRK=M(0x9a5a3a),WOODB=M(0x8a7458),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50),DAN=M(0x8a3a2a);
 const plaque=(x,y,z,txt,w=2,ry=0)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);bd.rotation.y=ry;G.add(bd)};
 const hall=(x,z,W,D,PH,base=.8)=>{/* 11/23 품질: 흰 상자 벽+기둥 → hallkit 법당 */const h=buildHall({x,z,W,D,nx:Math.max(1,Math.round(W/3)),nz:Math.max(1,Math.round(D/3.2)),FY:base,PH:PH,roof:'hip',pillar:0x9a3a26,bracket:(W>=8?'dapo':'ik'),front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',mini,solids,light:false,roofScale:.9});G.add(h.group);return base+PH};
 /* 일주문 */{for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.3,.32,4,12),DAN);c.position.set(s*2,2,46);G.add(c);solids.push({cx:s*2,cz:46,r:.35,y0:0,y1:4})}curvedRoof(G,0,(4.75)-(1.5)/2,46,(4.3)/.72,(2.2)/.72,(1.5)*1.05);plaque(0,3.5,46.9,'寺勒神山鳳',2.4)}
 sp(0,50,3,'일주문','봉미산 신륵사로 들어가는 문이에요.');
 /* 강가 바위(낮은 둔덕, 걸어 오를 수 있게 낮게) */const TX=20,TZ=-4;{for(let i=0;i<7;i++){const k=new THREE.Mesh(new THREE.DodecahedronGeometry(2+r()*1.5),ROCK);k.scale.y=.35;k.position.set(TX+3+r()*6,.3,TZ-8+i*3.4);G.add(k)}}
 /* 다층전탑(벽돌) */{let y=0;const box=(w,h,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,w),m);b.position.set(TX,y+h/2,TZ);G.add(b);y+=h};box(4.6,.5,ST);box(3.8,.5,ST);box(3.2,.6,ST);for(let i=0;i<6;i++){box(2.4-i*.14,.85-i*.05,BRK);box(2.9-i*.15,.16,M(0x7a4a32))}const sp1=new THREE.Mesh(new THREE.CylinderGeometry(.12,.3,1.2,8),M(0x6a6a60,{metalness:.4}));sp1.position.set(TX,y+.6,TZ);G.add(sp1);solids.push({cx:TX,cz:TZ,r:2.4,y0:0,y1:y})}
 sp(TX-3.5,TZ,2.6,'다층전탑','강가 바위 위에 선 벽돌탑이에요(보물). 우리나라에 몇 남지 않은 고려 벽돌탑으로, 벽돌에는 반원 무늬가 찍혀 있어요. 뱃사람들의 길잡이 등대 노릇도 했대요.');
 /* 강월헌(바위 위 정자) */{const X=TX+3,Z=TZ+11;const b=new THREE.Mesh(new THREE.BoxGeometry(4.4,.5,4.4),ROCK);b.position.set(X,.25,Z);G.add(b);for(const[sx,sz]of[[-1,-1],[1,-1],[1,1],[-1,1]]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.16,.18,2.6,10),DAN);c.position.set(X+sx*1.6,1.8,Z+sz*1.6);G.add(c);solids.push({cx:X+sx*1.6,cz:Z+sz*1.6,r:.22,y0:0,y1:3})}const rf=new THREE.Mesh(new THREE.ConeGeometry(1,1,6),ROOF);rf.scale.set(3.2,1.4,3.2);rf.position.set(X,3.8,Z);G.add(rf);plaque(X-1.9,2.8,Z,'軒月江',1.2,-Math.PI/2)}
 sp(TX+3,TZ+11,2.4,'강월헌','강가 바위 위 정자예요. 나옹선사를 기려 세웠고, 남한강이 한눈에 보여요.');
 /* 극락보전 + 다층석탑(흰 대리석) */const KX=-6,KZ=-8;{const y=hall(KX,KZ,11,7,3.8,1);plaque(KX,y-.5,KZ+3.55,'殿寶樂極',2);let ty=0;const box=(w,h)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,w),M(0xe8e4dc,{roughness:.45}));b.position.set(KX,ty+h/2,KZ+10);G.add(b);ty+=h};box(2.6,.5);box(2,.7);for(let i=0;i<7;i++){box(1-i*.07,.4);box(1.6-i*.1,.14)}solids.push({cx:KX,cz:KZ+10,r:1.4,y0:0,y1:ty})}
 sp(KX,KZ+7.6,3.2,'극락보전','아미타부처님을 모신 법당이에요.');
 sp(KX+3,KZ+12,2.4,'다층석탑','흰 대리석으로 쌓은 조선 초 탑이에요(보물). 용과 구름 무늬가 새겨져 있어요.');
 /* 조사당 */{const y=hall(-22,-16,5,4,2.8,.7);plaque(-22,y-.4,-13.95,'堂師祖',1.2)}
 sp(-22,-11.5,2.4,'조사당','나옹선사와 스승 지공·제자 무학의 초상을 모신 작은 건물이에요(보물).');
 /* 보제존자석종 */{const X=-8,Z=-28;const b=new THREE.Mesh(new THREE.BoxGeometry(3.4,.5,3.4),ST);b.position.set(X,.25,Z);G.add(b);const pts=[];for(let k=0;k<=12;k++){const t=k/12;pts.push(new THREE.Vector2(Math.sin(t*Math.PI*.85)*.85+.1,t*2.2))}const bell=new THREE.Mesh(new THREE.LatheGeometry(pts,18),ST2);bell.position.set(X,.5,Z);G.add(bell);const tp=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),ST);tp.position.set(X,2.85,Z);G.add(tp);solids.push({cx:X,cz:Z,r:1.8,y0:0,y1:3})}
 sp(-8,-24,2.6,'보제존자석종','나옹선사(보제존자)의 사리를 모신 종 모양 승탑이에요(보물). 강에서 나온 용마를 나옹선사가 신령한 굴레로 길들였다는 이야기가 전해 와요(전해 오는 이야기).');
 /* 전탑 벽돌 무늬 맞추기(11/23) */const PX=8,PZ=16;const pg=new THREE.Group();pg.position.set(PX,0,PZ);pg.visible=false;G.add(pg);
 const PAT=['#c84a3a','#3a6ac8','#3a9a5a','#d8a830','#8a4ab0'];const PTX=PAT.map((c,i)=>tex(128,96,(q,w,h)=>{q.fillStyle='#b8704a';q.fillRect(0,0,w,h);q.strokeStyle='#7a4428';q.lineWidth=4;q.strokeRect(2,2,w-4,h-4);q.fillStyle=c;q.strokeStyle=c;q.lineWidth=7;const cx=w/2,cy=h/2;
  if(i===0){q.beginPath();q.arc(cx,cy+18,30,Math.PI,0);q.stroke()}/* 반원 */
  else if(i===1){q.beginPath();q.arc(cx,cy,22,0,Math.PI*2);q.fill()}/* 원 */
  else if(i===2){q.beginPath();q.moveTo(cx,cy-28);q.lineTo(cx+28,cy);q.lineTo(cx,cy+28);q.lineTo(cx-28,cy);q.closePath();q.fill()}/* 마름모 */
  else if(i===3){q.beginPath();q.moveTo(cx-34,cy+10);q.quadraticCurveTo(cx-17,cy-26,cx,cy+10);q.quadraticCurveTo(cx+17,cy-26,cx+34,cy+10);q.stroke()}/* 물결 */
  else{for(let k=0;k<3;k++){q.fillRect(cx-30+k*22,cy-20,10,40)}}/* 세 줄 */},[1,1]));
 window.__SLBRICK=()=>{if(document.getElementById('slbP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX+8,PZ+5,0)}catch(e){}pg.visible=true;
  const camA=()=>{const k=innerWidth<innerHeight?2.1:1;return[PX,2.6,PZ+6.2*k,PX,2.6,PZ,50]};window.__GCAM=()=>document.getElementById('sssX')?null:document.getElementById('slbP')?camA():null;
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,100);const rc=new THREE.Raycaster();
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  let rd=0,N=4,sol=[],cur=[],fixed=[],cells=[],moves=0,t0=0,done=false,auto=false,last=performance.now(),wait=0,aT=0;const res=[];const NR=3;
  const snd=(f,len=.1,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const shuf=a=>{for(let i=a.length-1;i>0;i--){const j=(r()*(i+1))|0;[a[i],a[j]]=[a[j],a[i]]}return a};
  const genLatin=n=>{const rp=shuf([...Array(n).keys()]),cp=shuf([...Array(n).keys()]),sp2=shuf([...Array(n).keys()]);return Array.from({length:n*n},(_,k)=>sp2[(rp[(k/n)|0]+cp[k%n])%n])};
  const count=(g,n,lim=2)=>{let c=0;const a=g.slice();const ok=(k,v)=>{const rr=(k/n)|0,cc=k%n;for(let i=0;i<n;i++){if(a[rr*n+i]===v||a[i*n+cc]===v)return false}return true};const rec=()=>{const k=a.indexOf(-1);if(k<0){c++;return}for(let v=0;v<n&&c<lim;v++)if(ok(k,v)){a[k]=v;rec();a[k]=-1}};rec();return c};
  const makePuzzle=(n,holes)=>{const s=genLatin(n);let g=s.slice();const idx=shuf([...Array(n*n).keys()]);let h=0;for(const k of idx){if(h>=holes)break;const v=g[k];g[k]=-1;if(count(g,n)!==1)g[k]=v;else h++}return[s,g]};
  const clr=()=>{while(pg.children.length)pg.remove(pg.children[0]);cells=[]};
  const BW=1.1,BH=.8;const cpos=k=>{const rr=(k/N)|0,cc=k%N;return[(cc-(N-1)/2)*BW,.9+(N-1-rr)*BH]};
  const MAT_E=M(0xc8a080),MATS=PTX.map(t=>new THREE.MeshStandardMaterial({map:t,roughness:.8})),MATF=PTX.map(t=>new THREE.MeshStandardMaterial({map:t,roughness:.8,color:0xd8c8b8}));
  const paint=k=>{const v=cur[k];cells[k].material=v<0?MAT_E:fixed[k]?MATF[v]:MATS[v];cells[k].position.z=fixed[k]?-.06:0};
  const newRound=()=>{clr();N=[4,4,5][rd];const holes=[7,10,14][rd];[sol,cur]=makePuzzle(N,holes);fixed=cur.map(v=>v>=0);
   const fr=new THREE.Mesh(new THREE.BoxGeometry(N*BW+.5,N*BH+.5,.3),M(0x7a4a32));fr.position.set(0,.9+(N-1)/2*BH,-.3);pg.add(fr);
   const cap=new THREE.Mesh(new THREE.BoxGeometry(N*BW+1.1,.2,.9),M(0x6a3a24));cap.position.set(0,.9+(N-.5)*BH+.3,-.1);pg.add(cap);
   for(let k=0;k<N*N;k++){const[x,y]=cpos(k);const m=new THREE.Mesh(new THREE.BoxGeometry(BW*.96,BH*.94,.24),MAT_E);m.position.set(x,y,0);m.userData.k=k;pg.add(m);cells.push(m);paint(k)}
   moves=0;t0=performance.now();aT=0;ui()};
  const conflicts=()=>{const bad=new Set();for(let a=0;a<N*N;a++){if(cur[a]<0)continue;for(let b=a+1;b<N*N;b++){if(cur[b]!==cur[a])continue;if(((a/N)|0)===((b/N)|0)||a%N===b%N){bad.add(a);bad.add(b)}}}return bad};
  const check=()=>{const bad=conflicts();cells.forEach((m,k)=>{m.scale.setScalar(bad.has(k)?1.06:1)});if(cur.every(v=>v>=0)&&!bad.size){const tm=(performance.now()-t0)/1000;const need=fixed.filter(f=>!f).length;const sc=Math.max(25,Math.round(100-Math.max(0,moves-need*1.6)*2-Math.max(0,tm-need*4)*.6));res.push(sc);wait=1.8;snd(760,.5,'sine');ui(`다 맞췄어요! ${sc}점`);return}ui(bad.size?'같은 무늬가 한 줄에 둘 있어요(살짝 튀어나온 벽돌)':'')};
  const tap=k=>{if(done||wait>0||fixed[k])return;cur[k]=cur[k]+1>=N?-1:cur[k]+1;moves++;paint(k);snd(420+cur[k]*60,.06);check()};
  const ov=document.createElement('div');ov.id='slbO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  ov.onpointerdown=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(cells,false)[0];if(h)tap(h.object.userData.k)};
  const d=document.createElement('div');d.id='slbP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2e2420;border:3px solid #c87a50;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f6eee6;box-shadow:0 6px 18px rgba(0,0,0,.35);width:230px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0c0a0">🧱 전탑 벽돌 무늬 ${rd+1}/${NR}</b><div style="font-size:12px;margin:4px 0;line-height:1.5">빈 벽돌을 눌러 무늬를 바꿔요. 가로줄과 세로줄마다 ${N}가지 무늬가 한 번씩만 들어가면 완성!</div><div style="font-size:12px">누른 횟수 ${moves}</div><div style="font-size:13px;color:#f0c0a0;min-height:18px">${msg}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#f6eee6;border:1px solid #f6eee6;border-radius:8px;padding:2px 8px;margin-top:4px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const cleanup=()=>{clr();pg.visible=false;ov.remove()};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/res.length);const s2=Q>=80?3:Q>=55?2:Q>0?1:0;try{ctx.done('silleuk_brick',Q,'전탑 벽돌 무늬 맞추기')}catch(e){}window.__SLBQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0c0a0">전탑을 다 쌓았어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">신륵사 다층전탑은 반원 무늬를 찍은 벽돌로 쌓은 고려 탑이에요(보물). 강가 바위 위에 있어 배들의 길잡이가 되었대요.</div><div style="font-size:24px;color:#c87a50">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c87a50;color:#fff;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f6eee6;border:2px solid #f6eee6;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__SLBRICK()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(auto&&wait<=0){aT-=dt;if(aT<=0){aT=.15;const k=cur.findIndex((v,i)=>!fixed[i]&&v!==sol[i]);if(k>=0)tap(k)}}
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=NR){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);
  window.__SLBG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},tap,get sol(){return sol.slice()},get cur(){return cur.slice()},get fixed(){return fixed.slice()},scr:k=>{setPC();const v=new THREE.Vector3();cells[k].getWorldPosition(v);v.z+=.12;v.project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]}};try{ctx.say('가로세로 무늬가 겹치지 않게 벽돌을 채워 봐요!',2.4)}catch(e){}};
 spots.push({x:PX,y:0,z:PZ+3.5,r:2.6,t:'벽돌 무늬 맞추는 자리',h:'전탑 벽돌의 무늬가 가로세로 겹치지 않게 채워 봐요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,49],[TX-3,3,TZ],[TX+3,3,TZ+10],[KX,3,KZ+7],[-22,3,-12],[-8,3,-24],[PX,3,PZ+3]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'반원 무늬 벽돌 조각',h:'다층전탑 벽돌처럼 반원 무늬가 찍힌 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.18,.06,.1),M(0x9a5a3a)))})},
  {n:'대리석 조각',h:'다층석탑과 같은 흰 대리석 부스러기예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.DodecahedronGeometry(.05),M(0xe8e4dc)))})},
  {n:'기와 조각',h:'절 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'그물추',h:'강에서 고기 잡던 그물에 달던 흙 추예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.08,10),M(0x8a6a4a)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(-12,42,2.4,'발굴 탐지 자리','절 들머리 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__SLDIG=()=>{window.__DETECT&&window.__DETECT({key:'silleuk_dig',title:'신륵사 발굴 탐지',emoji:'⛏️',bg:'#2e2420',count:4,TL:150,cand:[[-8,38],[10,38],[-14,24],[-4,26],[-28,0],[6,-20],[12,4],[-30,30],[-20,-30],[24,30]],items:DIG,intro:'신륵사 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'신륵사 다층전탑은 고려 때 벽돌로 쌓은 몇 안 되는 탑이에요(보물).'})};
 const meta={quest:{t:'신륵사 둘러보기',d:'일주문을 지나 극락보전과 다층석탑, 강가 바위의 다층전탑과 강월헌, 조사당과 보제존자석종을 둘러보세요.',steps:[['일주문','일주문'],['극락보전','극락보전'],['석탑','다층석탑'],['전탑','다층전탑'],['강월헌','강월헌'],['조사당','조사당'],['석종','보제존자석종']]},
  title:'여주 신륵사',hint:'남한강 가 신륵사를 공개 사진으로 간추려 지었어요(배치·크기 어림). 전탑 벽돌 무늬를 가로세로 겹치지 않게 채워 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:52,lines:['여주 신륵사','남한강 · 다층전탑(보물)','강월헌 · 나옹선사','간추려 지음']}},
  npc:[['science',[[-6,50],[6,50],[6,56],[-6,56]]]],bounds:[-44,RX+2,-36,60],level:()=>'여주 신륵사',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:10,draw(g,X,Z,S){g.fillStyle='#7c9a4a';g.fillRect(0,0,300,300);g.fillStyle='#4a7ea8';g.fillRect(150+RX*S,0,300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:54,yaw:Math.PI},size:{}},meta)}
