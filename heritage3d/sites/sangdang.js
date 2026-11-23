/* 청주 상당산성 마당(2026-11-23, 2단계 열째 묶음): 청주 동쪽 것대산 자락의 돌 산성(사적). 조선 숙종 때(1716) 크게 고쳐 쌓았고, 둘레 약 4.2km.
   공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음(성벽 둘레·높이는 줄임, 배치 어림).
   남문 공남문(무지개 홍예문 위 문루), 동문 진동문, 서문 미호문, 몰래 드나들던 암문, 성벽에서 튀어나온 치성, 성 안 저수지와 산성마을.
   놀이: 산성 병사 우물고누(우리 옛 땅따먹기 놀이 '고누' 가운데 가장 쉬운 우물고누를 컴퓨터와 둬요. 말이 움직일 곳이 없게 막으면 이겨요. 컴퓨터와 차례로 두기, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildSangdang(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1716);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7a9448,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 for(let i=0;i<9;i++){const h=new THREE.Mesh(new THREE.SphereGeometry(22+r()*10,14,8,0,Math.PI*2,0,Math.PI/2),M(0x4a6a3a,{flatShading:true}));h.scale.y=.6;h.position.set(-80+i*20,0,-90-r()*12);G.add(h)}
 const SW=tex(256,256,(q,w,h)=>{q.fillStyle='#9a9282';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=22){const off=(y/22)%2?16:0;for(let x=-off;x<w;x+=34){const v=120+(r()*36|0);q.fillStyle=`rgb(${v+6},${v+2},${v-8})`;q.fillRect(x+1,y+1,32,20)}}},[2,1]);const WALL=new THREE.MeshStandardMaterial({map:SW,roughness:1});
 const ROOF=M(0x4a4a50),WOOD=M(0x8a7458),DAN=M(0x8a3a2a),ST=M(0xa8a296);
 const plaque=(x,y,z,txt,w=1.6)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 /* 성벽(산을 두르는 고리, 남·동·서문과 암문 자리 비움) */const RW=38,NS=60,WH=5;const gaps=[Math.PI/2,0,Math.PI,-Math.PI*.3];
 for(let i=0;i<NS;i++){const a=(i+.5)/NS*Math.PI*2;if(gaps.some(g=>Math.abs(Math.atan2(Math.sin(a-g),Math.cos(a-g)))<.06))continue;const rr=RW;const x=Math.cos(a)*rr,z=Math.sin(a)*rr*.9;const L=2*Math.PI*RW/NS+.5;const seg=new THREE.Mesh(new THREE.BoxGeometry(2.6,WH,L),WALL);seg.position.set(x,WH/2,z);seg.rotation.y=-Math.atan2(z,x);G.add(seg);const cap=new THREE.Mesh(new THREE.BoxGeometry(2.8,.25,L),M(0x8e8676));cap.position.set(x,WH+.12,z);cap.rotation.y=seg.rotation.y;G.add(cap);solids.push({cx:x,cz:z,r:2,y0:0,y1:WH})}
 /* 공남문(남문: 홍예 + 문루) */{const z=RW*.9;for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.BoxGeometry(3,WH,3.2),WALL);p.position.set(s*3,WH/2,z);G.add(p);solids.push({x0:s*3-1.5,x1:s*3+1.5,y0:0,y1:WH,z0:z-1.6,z1:z+1.6})}const top=new THREE.Mesh(new THREE.BoxGeometry(9,1.6,3.2),WALL);top.position.set(0,WH-.8,z);G.add(top);const arch=new THREE.Mesh(new THREE.TorusGeometry(1.5,.25,6,16,Math.PI),M(0x8e8676));arch.position.set(0,WH-2.6,z+1.62);G.add(arch);
  for(let i=0;i<=3;i++)for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.16,.18,2.2,8),DAN);c.position.set(-3.6+i*2.4,WH+1.1,z+s*1.2);G.add(c)}const rf=new THREE.Mesh(new THREE.ConeGeometry(1,1,4),ROOF);rf.rotation.y=Math.PI/4;rf.scale.set(7.2,1.6,3.4);rf.position.set(0,WH+2.9,z);G.add(rf);plaque(0,WH+1.7,z+1.25,'門南控',1.4)}
 sp(0,RW*.9+5,3,'공남문','남쪽 정문이에요. 돌로 무지개처럼 둥글게 쌓은 홍예문 위에 문루를 얹었어요. 숙종 때(1716) 성을 크게 고쳐 쌓았어요.');
 /* 동문 진동문 · 서문 미호문 */for(const[s,n,t]of[[1,'진동문','門東鎭'],[-1,'미호문','門湖弭']]){const x=s*RW;const t1=new THREE.Mesh(new THREE.BoxGeometry(3,1.2,7),WALL);t1.position.set(x,WH-.6,0);G.add(t1);for(const q of[-1,1]){const p=new THREE.Mesh(new THREE.BoxGeometry(3,WH,2),WALL);p.position.set(x,WH/2,q*2.8);G.add(p);solids.push({cx:x,cz:q*2.8,r:1.6,y0:0,y1:WH})}plaque(x-s*1.55,WH-.6,0,t,1.2);G.children[G.children.length-1].rotation.y=-s*Math.PI/2}
 sp(RW-6,0,2.6,'진동문','동쪽 문이에요.');sp(-RW+6,0,2.6,'미호문','서쪽 문이에요. 문 밖으로 청주 시내가 내려다보여요.');
 /* 암문 */{const a=-Math.PI*.3;const x=Math.cos(a)*(RW-2),z=Math.sin(a)*(RW-2)*.9;const d=new THREE.Mesh(new THREE.BoxGeometry(1.4,1.8,.3),M(0x3a2a1a));d.position.set(x,.9,z);d.rotation.y=-a+Math.PI/2;G.add(d)}
 sp(Math.cos(-Math.PI*.3)*(RW-6),Math.sin(-Math.PI*.3)*(RW-6)*.9,2.4,'암문','적 몰래 군사와 물자를 드나들던 작은 비밀 문이에요.');
 /* 치성 */{const a=Math.PI*.75;const x=Math.cos(a)*(RW+2),z=Math.sin(a)*(RW+2)*.9;const c=new THREE.Mesh(new THREE.BoxGeometry(5,WH,5),WALL);c.position.set(x,WH/2,z);c.rotation.y=-a;G.add(c);solids.push({cx:x,cz:z,r:3.2,y0:0,y1:WH})}
 sp(Math.cos(Math.PI*.75)*(RW-5),Math.sin(Math.PI*.75)*(RW-5)*.9,2.4,'치성','성벽에서 바깥으로 네모나게 튀어나오게 쌓아, 성벽에 붙은 적을 옆에서 막던 곳이에요.');
 /* 저수지 + 산성마을 */{const w=new THREE.Mesh(new THREE.CircleGeometry(8,28),M(0x4a7a8a,{roughness:.2}));w.rotation.x=-Math.PI/2;w.scale.set(1.3,1,1);w.position.set(8,.05,-12);G.add(w)}
 sp(8,-2.6,2.6,'저수지','성 안의 큰 저수지예요. 오래 버티려면 물이 꼭 있어야 했어요.');
 const house=(x,z,rot)=>{const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rot;G.add(g);const w=new THREE.Mesh(new THREE.BoxGeometry(7,2.4,3.6),M(0xeee6d4));w.position.y=1.5;g.add(w);const b=new THREE.Mesh(new THREE.BoxGeometry(7.6,.3,4.2),ST);b.position.y=.15;g.add(b);const rf=new THREE.Mesh(new THREE.ConeGeometry(1,1,4),ROOF);rf.rotation.y=Math.PI/4;rf.scale.set(5.8,1.4,3.6);rf.position.y=3.3;g.add(rf);solids.push({cx:x,cz:z,r:3.6,y0:0,y1:3})};
 house(-14,-6,.1);house(-20,6,-.2);house(-8,10,0);house(-16,-18,.3);
 sp(-10,2,2.6,'산성마을','성 안에 자리한 마을이에요. 지금도 사람들이 살며 음식점이 모여 있어요.');
 /* 산성 병사 우물고누(11/23) */const PX=14,PZ=14;const pg=new THREE.Group();pg.position.set(PX,0,PZ);pg.visible=false;G.add(pg);
 /* 점: 0 왼위,1 오위,2 왼아래,3 오아래,4 가운데. 줄: 우물(0-1 위쪽) 없음 */const PT=[[-1,-1],[1,-1],[-1,1],[1,1],[0,0]];const ADJ=[[2,4],[3,4],[0,3,4],[1,2,4],[0,1,2,3]];
 window.__SDGONU=()=>{if(document.getElementById('sdgP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX+6,PZ+3,0)}catch(e){}pg.visible=true;
  const BY=.6,U=.7;const camA=()=>{const k=innerWidth<innerHeight?1.6:1;return[PX,2.8*k+.8,PZ+2.2*k+.4,PX,BY,PZ-.1,50]};window.__GCAM=()=>document.getElementById('sssX')?null:document.getElementById('sdgP')?camA():null;
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,100);const rc=new THREE.Raycaster();
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  let rd=0,bd=[],turn=1,sel=-1,moves=0,done=false,auto=false,last=performance.now(),wait=0,aiT=0,ptM=[],pcs=[],firstMove=true,aT=0;const res=[];const NR=3;
  const snd=(f,len=.1,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const legal=(b,p)=>{const out=[];b.forEach((v,i)=>{if(v===p)for(const j of ADJ[i])if(b[j]===0)out.push([i,j])});return out};
  const apply=(b,[i,j])=>{const n=b.slice();n[j]=n[i];n[i]=0;return n};
  const mm=(b,p,dep)=>{const ms=legal(b,p);if(!ms.length)return p===2?-1000:1000;if(dep===0){return(legal(b,2).length-legal(b,1).length)*10}let best=p===2?-1e9:1e9;for(const m of ms){const v=mm(apply(b,m),p===2?1:2,dep-1);best=p===2?Math.max(best,v):Math.min(best,v)}return best};
  const aiMove=()=>{const ms=legal(bd,2);if(!ms.length)return null;if(rd===0)return ms[(r()*ms.length)|0];const dep=rd===1?2:7;let best=null,bv=-1e9;for(const m of ms.sort(()=>r()-.5)){const v=mm(apply(bd,m),1,dep-1)+(r()*.1);if(v>bv){bv=v;best=m}}return best};
  const clr=()=>{while(pg.children.length)pg.remove(pg.children[0]);ptM=[];pcs=[]};
  const draw=()=>{pcs.forEach(m=>pg.remove(m));pcs=[];bd.forEach((v,i)=>{if(!v)return;const[x,z]=PT[i];const m=new THREE.Mesh(new THREE.CylinderGeometry(.16,.18,.1,16),M(v===1?0xf4f0e6:0x2a2622,{roughness:.4}));m.position.set(x*U,BY+.07+(i===sel?.12:0),z*U);pg.add(m);pcs.push(m)})};
  const newGame=()=>{clr();bd=[2,2,1,1,0];/* 컴퓨터(검정) 위, 무이(흰) 아래 */turn=1;sel=-1;moves=0;firstMove=true;
   const slab=new THREE.Mesh(new THREE.BoxGeometry(2.4*U+.6,.5,2.4*U+.6),M(0x9a968a,{flatShading:true}));slab.position.y=BY-.25;pg.add(slab);
   const LN=M(0x3a3226);const line=(a,b)=>{const[x1,z1]=PT[a],[x2,z2]=PT[b];const L=Math.hypot(x2-x1,z2-z1)*U;const m=new THREE.Mesh(new THREE.BoxGeometry(.05,.02,L),LN);m.position.set((x1+x2)/2*U,BY+.01,(z1+z2)/2*U);m.rotation.y=Math.atan2(x2-x1,z2-z1);pg.add(m)};[[0,2],[1,3],[2,3],[0,4],[1,4],[2,4],[3,4]].forEach(([a,b])=>line(a,b));
   const well=new THREE.Mesh(new THREE.TorusGeometry(.32,.04,6,16,Math.PI),LN);well.rotation.x=-Math.PI/2;well.position.set(0,BY+.01,-U);pg.add(well);
   PT.forEach(([x,z],i)=>{const h=new THREE.Mesh(new THREE.CylinderGeometry(.26,.26,.3,10),new THREE.MeshBasicMaterial({visible:false}));h.position.set(x*U,BY+.1,z*U);h.userData.i=i;pg.add(h);ptM.push(h);const dot=new THREE.Mesh(new THREE.CircleGeometry(.06,10),LN);dot.rotation.x=-Math.PI/2;dot.position.set(x*U,BY+.012,z*U);pg.add(dot)});draw();ui('무이(흰 말) 차례예요. 말을 누르고 옮길 점을 눌러요.')};
  const end=(win,draw_)=>{const sc=win?100:draw_?60:25;res.push(sc);wait=2;snd(win?780:draw_?520:220,.5,'sine');ui(win?`이겼어요! 컴퓨터 말을 꼼짝 못 하게 막았어요 (${sc}점)`:draw_?`비겼어요(${sc}점)`:`졌어요… 다음엔 꼭! (${sc}점)`)};
  const afterMove=()=>{moves++;draw();if(moves>=40){end(false,true);return}const nxt=turn===1?2:1;if(!legal(bd,nxt).length){end(turn===1,false);return}turn=nxt;if(turn===2){aiT=.7;ui('컴퓨터가 생각해요…')}else ui('무이 차례예요.')};
  const tap=i=>{if(done||wait>0||turn!==1)return;if(bd[i]===1){sel=i;snd(600,.04);draw();return}if(sel>=0&&bd[i]===0&&ADJ[sel].includes(i)){const nb=apply(bd,[sel,i]);if(firstMove&&!legal(nb,2).length){ui('첫 수로 바로 막는 수는 둘 수 없어요(우물고누 규칙)');return}bd=nb;sel=-1;firstMove=false;snd(440,.06);afterMove()}};
  const ov=document.createElement('div');ov.id='sdgO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  ov.onpointerdown=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(ptM,false)[0];if(h)tap(h.object.userData.i)};
  const d=document.createElement('div');d.id='sdgP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2622;border:3px solid #b8a080;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f6f0e6;box-shadow:0 6px 18px rgba(0,0,0,.35);width:232px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d8b0">⚫ 우물고누 ${rd+1}/${NR}판 (${['쉬운','보통','센'][rd]} 컴퓨터)</b><div style="font-size:12px;margin:4px 0;line-height:1.5">말을 줄을 따라 옆 빈 점으로 한 칸씩 옮겨요. 위쪽 '우물'(둥근 곳)은 지나갈 수 없어요. 상대 말이 움직일 곳이 없게 막으면 이겨요!</div><div style="font-size:13px;color:#f0d8b0;min-height:18px">${msg}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#f6f0e6;border:1px solid #f6f0e6;border-radius:8px;padding:2px 8px;margin-top:4px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const cleanup=()=>{clr();pg.visible=false;ov.remove()};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/res.length);const s2=Q>=80?3:Q>=55?2:Q>0?1:0;try{ctx.done('sangdang_gonu',Q,'산성 병사 우물고누')}catch(e){}window.__SDGQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0d8b0">고누 세 판 끝! ${Q}점</b><div style="font-size:13px;margin:4px 0">고누는 땅이나 돌에 판을 그리고 돌·나뭇조각으로 두던 우리 옛 놀이예요. 우물고누, 네줄고누, 참고누 등 여러 가지가 있어요.</div><div style="font-size:24px;color:#b8a080">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#b8a080;color:#2a2622;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f6f0e6;border:2px solid #f6f0e6;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__SDGONU()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(turn===2&&wait<=0){aiT-=dt;if(aiT<=0){const m=aiMove();if(m){bd=apply(bd,m);snd(330,.06);turn=2;afterMove()}}}
   else if(auto&&turn===1&&wait<=0){aT-=dt;if(aT<=0){aT=.4;const ms=legal(bd,1).filter(m=>!(firstMove&&!legal(apply(bd,m),2).length));let best=ms[0],bv=-1e9;for(const m of ms){const v=-mm(apply(bd,m),2,6);if(v>bv){bv=v;best=m}}if(best){tap(best[0]);tap(best[1])}}}
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=NR){fin();return}newGame()}}
   requestAnimationFrame(step)};
  newGame();requestAnimationFrame(step);
  window.__SDGG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},tap,get bd(){return bd.slice()},get turn(){return turn},scr:i=>{setPC();const v=new THREE.Vector3();ptM[i].getWorldPosition(v);v.project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]}};try{ctx.say('컴퓨터와 우물고누 한 판 둬요!',2.4)}catch(e){}};
 spots.push({x:PX,y:0,z:PZ+3,r:2.4,t:'고누 두는 자리',h:'성을 지키던 병사들처럼 돌판에 우물고누를 둬 봐요.'});
 /* 밤(성문 횃불) */const NL=[];if(!mini){for(const[x,y,z]of[[0,4,RW*.9+3],[RW-5,3,0],[-RW+5,3,0],[8,2,-3],[-10,3,2],[PX,3,PZ+3]]){const Lt=new THREE.PointLight(0xffb060,0,28,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'고누 말 돌',h:'병사들이 고누 둘 때 쓰던 납작한 돌이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.015,12),M(0x2a2622)))})},
  {n:'성돌 조각',h:'숙종 때 고쳐 쌓은 성돌 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.18,.08,.1),M(0x9a9282)))})},
  {n:'쇠 화살촉',h:'성을 지키던 병사의 화살촉이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.ConeGeometry(.025,.1,4),M(0x5a5048,{metalness:.5})))})},
  {n:'기와 조각',h:'성문 문루의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(-4,22,2.4,'발굴 탐지 자리','성 안 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__SDDIG=()=>{window.__DETECT&&window.__DETECT({key:'sangdang_dig',title:'상당산성 발굴 탐지',emoji:'⛏️',bg:'#2a2622',count:4,TL:150,cand:[[-10,24],[4,26],[-24,-10],[24,8],[-4,-24],[20,-22],[-26,16],[24,-6],[-2,-6],[-20,-20]],items:DIG,intro:'상당산성 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'상당산성은 조선 숙종 때 고쳐 쌓은 둘레 4.2km의 돌 산성이에요(사적).'})};
 const meta={quest:{t:'상당산성 둘러보기',d:'공남문으로 들어가 산성마을과 저수지, 진동문·미호문, 암문과 치성을 둘러보세요.',steps:[['공남문','공남문'],['마을','산성마을'],['저수지','저수지'],['동문','진동문'],['서문','미호문'],['암문','암문'],['치성','치성']]},
  title:'청주 상당산성',hint:'상당산성을 공개 사진·수치로 간추려 지었어요(둘레·높이 줄임, 배치 어림). 병사들처럼 우물고누를 둬 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:RW*.9+10,lines:['청주 상당산성','숙종 1716 · 둘레 4.2km','공남문 · 산성마을','간추려 지음']}},
  npc:[['science',[[-6,RW*.9+8],[6,RW*.9+8],[6,RW*.9+14],[-6,RW*.9+14]]]],bounds:[-46,46,-44,56],level:()=>'청주 상당산성',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.2,ox:0,oz:4,draw(g,X,Z,S){g.fillStyle='#7a9448';g.fillRect(0,0,300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:RW*.9+12,yaw:Math.PI},size:{}},meta)}
