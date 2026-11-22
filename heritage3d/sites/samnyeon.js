/* 보은 삼년산성 마당(2026-11-23, 2단계 아홉째 묶음): 신라 자비마립간 13년(470)에 쌓기 시작해 3년 걸렸다 하여 삼년산성(사적). 둘레 약 1.7km, 높이 13~20m의 돌 성.
   스케치팹 lacomi1975 실측은 NonCommercial이라 쓰지 않고, 공개 사진·수치로 간추려 지음(둘레·높이는 줄임, 배치 어림).
   남문 터, 현문식 서문(성문 문턱이 땅에서 높아 사다리로 오르던 문), 반달 모양 곡성(치성), 성 안 연못 아미지와 바위 글씨 '蛾眉池'(김생 글씨라 전해 옴), 건물터 초석.
   놀이: 성 안 돌무더기 치우기(가로·세로로만 밀리는 돌덩이들을 밀어 비켜, 돌 수레를 서쪽 성문으로 빼내요. 막힌 길 풀기형, 판은 답이 있는지 계산해 만듦, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildSamnyeon(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(470);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7a9448,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 for(let i=0;i<10;i++){const h=new THREE.Mesh(new THREE.SphereGeometry(20+r()*10,14,8,0,Math.PI*2,0,Math.PI/2),M(0x557a44,{flatShading:true}));h.scale.y=.55;h.position.set(-90+i*20,0,-96-r()*10);G.add(h)}
 /* 성벽 고리(남문·서문 자리 비움) */const SW=tex(256,256,(q,w,h)=>{q.fillStyle='#8e8676';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=16){const off=(y/16)%2?12:0;for(let x=-off;x<w;x+=26){const v=110+(r()*40|0);q.fillStyle=`rgb(${v+10},${v+4},${v-8})`;q.fillRect(x+1,y+1,24,14)}}},[2,2]);const WALL=new THREE.MeshStandardMaterial({map:SW,roughness:1});
 const RW=36,NS=56,WH=7;const gateS=Math.PI/2,gateW=Math.PI;/* 남(+z), 서(-x) */
 for(let i=0;i<NS;i++){const a=(i+.5)/NS*Math.PI*2;const dS=Math.abs(Math.atan2(Math.sin(a-gateS),Math.cos(a-gateS))),dW=Math.abs(Math.atan2(Math.sin(a-gateW),Math.cos(a-gateW)));if(dS<.07)continue;const x=Math.cos(a)*RW,z=Math.sin(a)*RW;const L=2*Math.PI*RW/NS+.15;
  const isW=dW<.07;const h=isW?3:WH;const seg=new THREE.Mesh(new THREE.BoxGeometry(5.5,h,L),WALL);seg.position.set(x,h/2,z);seg.rotation.y=-a;G.add(seg);if(isW){const up=new THREE.Mesh(new THREE.BoxGeometry(5.5,1.4,L),WALL);up.position.set(x,WH-.7,z);up.rotation.y=-a;G.add(up)}
  solids.push({cx:x,cz:z,r:2.9,y0:0,y1:WH})}
 /* 곡성(동쪽 반달 치성) */{const c=new THREE.Mesh(new THREE.CylinderGeometry(5,5.4,WH,20,1,false,-Math.PI/2,Math.PI),WALL);c.position.set(RW+2.6,WH/2,0);G.add(c);solids.push({cx:RW+3,cz:0,r:5})}
 /* 남문 터 */for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.BoxGeometry(1.2,.4,1.2),M(0xa8a296));p.position.set(s*2.4,.2,RW);G.add(p)}
 sp(0,RW+4,3,'남문 터','성으로 드나들던 남쪽 문 자리예요. 둘레 1.7km, 높이 13~20m의 돌 성을 3년 걸려 쌓았다 해서 삼년산성이에요(470년).');
 /* 현문식 서문 + 사다리 */{const x=-RW+3.4;for(let k=0;k<2;k++){const rl=new THREE.Mesh(new THREE.BoxGeometry(.08,3.6,.08),M(0x8a6a3a));rl.position.set(x,1.6,(k-.5)*.8);rl.rotation.z=-.35;G.add(rl)}for(let i=0;i<7;i++){const rg=new THREE.Mesh(new THREE.BoxGeometry(.06,.06,.9),M(0x8a6a3a));rg.position.set(x+.55-i*.17,.3+i*.48,0);G.add(rg)}}
 sp(-RW+7,0,2.8,'서문 터(현문)','문턱이 땅에서 3m쯤 높이 나 있어 사다리나 나무 다리로 오르던 문이에요. 적이 쉽게 들어오지 못하게 했어요.');
 sp(RW-5,0,2.6,'곡성','성벽 바깥으로 반달처럼 튀어나오게 쌓아, 성벽에 붙은 적을 옆에서 막던 곳이에요.');
 /* 아미지 + 바위 글씨 */{const pd=new THREE.Mesh(new THREE.CircleGeometry(6,28),M(0x4a7a8a,{roughness:.2}));pd.rotation.x=-Math.PI/2;pd.position.set(-8,.05,-8);G.add(pd);for(let i=0;i<16;i++){const a=i/16*Math.PI*2;const st=new THREE.Mesh(new THREE.DodecahedronGeometry(.5),M(0x8e8a80,{flatShading:true}));st.position.set(-8+Math.cos(a)*6.3,.2,-8+Math.sin(a)*6.3);G.add(st)}
  const rk=new THREE.Mesh(new THREE.DodecahedronGeometry(2.2),M(0x9a968a,{flatShading:true}));rk.scale.set(1.3,.9,.7);rk.position.set(-8,1.6,-16);G.add(rk);solids.push({cx:-8,cz:-16,r:2.6,y0:0,y1:3});const LT=tex(256,96,(q,w,h)=>{q.fillStyle='rgba(0,0,0,0)';q.clearRect(0,0,w,h);q.fillStyle='#3a3630';q.font='bold 60px serif';q.textAlign='center';q.fillText('蛾眉池',w/2,70)});const t=new THREE.Mesh(new THREE.PlaneGeometry(2.4,.9),new THREE.MeshBasicMaterial({map:LT,transparent:true}));t.position.set(-8,1.8,-14.4);G.add(t)}
 sp(-8,.6,2.6,'아미지','성 안의 연못이에요. 성에 갇혀도 물을 쓸 수 있게 했어요. 곁의 바위에 새긴 "아미지(蛾眉池)" 글씨는 명필 김생의 글씨라고 전해 와요(전해 오는 이야기).');
 /* 건물터 초석 */for(let i=0;i<4;i++)for(let j=0;j<3;j++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.4,.45,.25,10),M(0xa8a296));c.position.set(10+i*3,.12,-10+j*3);G.add(c)}
 sp(14.5,-3,2.4,'건물터','성 안에 있던 건물의 주춧돌이에요. 발굴에서 신라 토기와 기와가 많이 나왔어요.');
 /* 성 안 돌무더기 치우기(11/23) */const PX=14,PZ=18;const pg=new THREE.Group();pg.position.set(PX,0,PZ);pg.visible=false;G.add(pg);
 window.__SNSLIDE=()=>{if(document.getElementById('snsP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX+7,PZ+4,0)}catch(e){}pg.visible=true;
  const N=6,CS=.55,BY=.9,TR=2;/* 수레 줄 */const camA=()=>{const k=innerWidth<innerHeight?1.8:1;return[PX,4.6*k+1.2,PZ+3*k+.4,PX,BY,PZ-.1,50]};window.__GCAM=()=>document.getElementById('sssX')?null:document.getElementById('snsP')?camA():null;
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,100);const rc=new THREE.Raycaster();
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  let rd=0,blocks=[],sel=0,moves=0,minM=0,t0=0,done=false,auto=false,last=performance.now(),wait=0,meshes=[],aPlan=[],aT=0;const res=[];const NR=3;
  const snd=(f,len=.1,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  /* 블록: {h:가로?,len,r,c}; 0번이 수레(가로, TR줄), 왼쪽(c=0) 출구로 빼냄 */
  const grid=bs=>{const g=new Array(N*N).fill(-1);bs.forEach((b,i)=>{for(let k=0;k<b.len;k++){const rr=b.r+(b.h?0:k),cc=b.c+(b.h?k:0);g[rr*N+cc]=i}});return g};
  const key=bs=>bs.map(b=>b.h?b.c:b.r).join(',');
  const nexts=bs=>{const g=grid(bs);const out=[];bs.forEach((b,i)=>{for(const dd of[-1,1]){const nb={...b};if(b.h){nb.c+=dd;const cc=dd<0?nb.c:nb.c+b.len-1;if(cc<0||cc>=N||g[b.r*N+cc]!==-1)continue}else{nb.r+=dd;const rr=dd<0?nb.r:nb.r+b.len-1;if(rr<0||rr>=N||g[rr*N+b.c]!==-1)continue}const ns=bs.slice();ns[i]=nb;out.push([ns,i,dd])}});return out};
  const solve=bs=>{const q=[[bs,[]]];const seen=new Set([key(bs)]);let qi=0;while(qi<q.length&&seen.size<60000){const[s,p]=q[qi++];if(s[0].c===0)return p;for(const[ns,i,dd]of nexts(s)){const k=key(ns);if(seen.has(k))continue;seen.add(k);q.push([ns,p.concat([[i,dd]])])}}return null};
  const gen=(lo,hi,nb)=>{let best=null;for(let t=0;t<400;t++){const bs=[{h:true,len:2,r:TR,c:3+((r()*2)|0)}];let g=grid(bs);let tries=0;while(bs.length<nb&&tries++<200){const h=r()<.45,len=r()<.3?3:2;const rr=(r()*N)|0,cc=(r()*N)|0;const b={h,len,r:h?rr:Math.min(rr,N-len),c:h?Math.min(cc,N-len):cc};if(h&&b.r===TR)continue;let ok=true;for(let k=0;k<len;k++){const x=b.r+(h?0:k),y=b.c+(h?k:0);if(g[x*N+y]!==-1){ok=false;break}}if(!ok)continue;bs.push(b);g=grid(bs)}const p=solve(bs);if(!p)continue;if(p.length>=lo&&p.length<=hi)return[bs,p];if(!best||Math.abs(p.length-lo)<Math.abs(best[1].length-lo))best=[bs,p]}return best};
  const clr=()=>{while(pg.children.length)pg.remove(pg.children[0]);meshes=[]};
  const cxz=(rr,c)=>[(c-(N-1)/2)*CS,(rr-(N-1)/2)*CS];
  const draw=()=>{meshes.forEach(m=>pg.remove(m));meshes=[];blocks.forEach((b,i)=>{const W=b.h?b.len*CS:CS,D=b.h?CS:b.len*CS;const g=new THREE.Group();const[x0,z0]=cxz(b.r,b.c);g.position.set(x0+(W-CS)/2,BY,z0+(D-CS)/2);if(i===0){const cart=new THREE.Mesh(new THREE.BoxGeometry(W*.9,.22,D*.8),M(0x8a6a3a));cart.position.y=.2;g.add(cart);for(const s of[-1,1]){const wh=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.05,12),M(0x5a3a22));wh.rotation.x=Math.PI/2;wh.position.set(s*W*.28,.12,D*.42);g.add(wh)}const ld=new THREE.Mesh(new THREE.DodecahedronGeometry(.17),M(0xc8a860,{flatShading:true}));ld.position.y=.42;g.add(ld)}else{const st=new THREE.Mesh(new THREE.BoxGeometry(W*.92,.34,D*.92),M(i===sel?0xb8b090:0x8e8676,{flatShading:true,emissive:i===sel?0x403820:0}));st.position.y=.18;g.add(st)}g.userData.i=i;g.traverse(o=>{o.userData.i=i});pg.add(g);meshes.push(g)})};
  const newRound=()=>{clr();const[lo,hi,nb]=[[4,7,6],[8,13,8],[14,40,10]][rd];const gg=gen(lo,hi,nb);blocks=gg[0];minM=gg[1].length;sel=0;moves=0;aPlan=[];
   const tb=new THREE.Mesh(new THREE.BoxGeometry(N*CS+.6,.1,N*CS+.6),M(0x5a4a3a));tb.position.y=BY-.06;pg.add(tb);const fl=new THREE.Mesh(new THREE.BoxGeometry(N*CS,.04,N*CS),M(0xb8a888));fl.position.y=BY-.02;pg.add(fl);
   for(const[w,h,x,z]of[[N*CS+.4,.2,0,-N*CS/2-.1],[N*CS+.4,.2,0,N*CS/2+.1],[.2,N*CS+.4,N*CS/2+.1,0]]){const e=new THREE.Mesh(new THREE.BoxGeometry(w,.4,h),WALL);e.position.set(x,BY+.15,z);pg.add(e)}
   {const[,gz]=cxz(TR,0);const segs=[[-N*CS/2-.1,(-N*CS/2+gz-CS/2)/2,Math.abs(gz-CS/2+N*CS/2)],[-N*CS/2-.1,(N*CS/2+gz+CS/2)/2,Math.abs(N*CS/2-gz-CS/2)]];for(const[x,z,len]of segs){if(len<.01)continue;const e=new THREE.Mesh(new THREE.BoxGeometry(.2,.4,len+.2),WALL);e.position.set(x,BY+.15,z);pg.add(e)}const ar=new THREE.Mesh(new THREE.ConeGeometry(.12,.3,4),M(0xe0b030,{emissive:0x604810}));ar.rotation.z=Math.PI/2;ar.position.set(-N*CS/2-.45,BY+.2,gz);pg.add(ar)}
   for(let rr=0;rr<N;rr++)for(let c=0;c<N;c++){const[x,z]=cxz(rr,c);const t=new THREE.Mesh(new THREE.BoxGeometry(CS*.96,.01,CS*.96),M((rr+c)%2?0xc8b898:0xbcac8c));t.position.set(x,BY+.005,z);t.userData.cell=[rr,c];pg.add(t)}
   t0=performance.now();draw();ui()};
  const mv=dd=>{if(done||wait>0)return;const opts=nexts(blocks).filter(([,i,d])=>i===sel&&d===dd);if(!opts.length){snd(200,.08,'square');ui('그쪽은 막혔어요');return}blocks=opts[0][0];moves++;snd(380+moves%5*40,.06);draw();if(blocks[0].c===0){const tm=(performance.now()-t0)/1000;const sc=Math.max(30,Math.round(100*Math.min(1,minM/moves)-Math.max(0,tm-minM*5)*.2));res.push(sc);wait=1.8;snd(760,.5,'sine');ui(`수레가 성문을 나갔어요! ${moves}번(가장 적게 ${minM}번) · ${sc}점`)}else ui()};
  const ov=document.createElement('div');ov.id='snsO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  ov.onpointerdown=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(meshes,true)[0];if(h&&h.object.userData.i!=null){sel=h.object.userData.i;snd(600,.04);draw();ui()}};
  const d=document.createElement('div');d.id='snsP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2822;border:3px solid #b8a070;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4f0e6;box-shadow:0 6px 18px rgba(0,0,0,.35);width:232px;user-select:none";document.body.appendChild(d);
  const B=(k,t)=>`<button data-m="${k}" style="font:20px 'Do Hyeon',sans-serif;background:#b8a070;color:#2a2822;border:0;border-radius:10px;width:52px;height:44px;margin:2px;cursor:pointer;touch-action:manipulation">${t}</button>`;
  const ui=(msg='')=>{if(done)return;const b=blocks[sel];d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d8a0">🪨 돌무더기 치우기 ${rd+1}/${NR}</b><div style="font-size:12px;margin:4px 0;line-height:1.5">돌덩이를 눌러 고르고 화살표로 밀어요. 가로 돌은 좌우로, 세로 돌은 위아래로만 움직여요. 돌 수레를 왼쪽 노란 화살표 성문으로 빼내요!</div><div style="font-size:12px">고른 것: ${sel===0?'돌 수레':'돌덩이'} · 민 횟수 ${moves}</div><div style="font-size:13px;color:#f0d8a0;min-height:18px">${msg}</div><div>${b&&!b.h?B(-1,'⬆')+B(1,'⬇'):B(-1,'⬅')+B(1,'➡')}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#f4f0e6;border:1px solid #f4f0e6;border-radius:8px;padding:2px 8px;margin-top:4px;cursor:pointer">그만</button>`;d.querySelectorAll('[data-m]').forEach(bt=>bt.onclick=()=>mv(+bt.dataset.m));d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const cleanup=()=>{clr();pg.visible=false;ov.remove()};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/res.length);const s2=Q>=80?3:Q>=55?2:Q>0?1:0;try{ctx.done('samnyeon_slide',Q,'돌무더기 치우기')}catch(e){}window.__SNSQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0d8a0">길을 다 텄어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">신라 사람들은 납작한 돌을 가로세로 엇갈려 쌓아 3년 만에 높이 13~20m의 삼년산성을 쌓았어요. 지금도 거의 무너지지 않고 남아 있어요.</div><div style="font-size:24px;color:#b8a070">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#b8a070;color:#2a2822;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4f0e6;border:2px solid #f4f0e6;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__SNSLIDE()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(auto&&wait<=0){aT-=dt;if(aT<=0){aT=.12;if(!aPlan.length)aPlan=solve(blocks)||[];const a=aPlan.shift();if(a){sel=a[0];mv(a[1])}}}
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=NR){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);
  window.__SNSG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},mv,sel:i=>{sel=i;draw();ui()},get minM(){return minM},get n(){return blocks.length},scr:i=>{setPC();const v=new THREE.Vector3();meshes[i].getWorldPosition(v);v.y+=.2;v.project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]},get selI(){return sel}};try{ctx.say('돌덩이를 밀어 수레 길을 터 봐요!',2.4)}catch(e){}};
 spots.push({x:PX,y:0,z:PZ+3.2,r:2.4,t:'돌무더기 치우는 자리',h:'돌덩이를 밀어 비켜 돌 수레를 성문 밖으로 빼내 봐요.'});
 /* 밤(성벽 횃불) */const NL=[];if(!mini){for(const[x,y,z]of[[0,4,RW-3],[-RW+6,4,0],[RW-6,4,0],[-8,3,-12],[14,3,-3],[PX,3,PZ+3]]){const Lt=new THREE.PointLight(0xffb060,0,28,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'신라 토기 조각',h:'회색빛 굳은 신라 토기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.1,.08,.05,14,1,false,0,3.2),M(0x6a6a66)))})},
  {n:'쇠 화살촉',h:'성을 지키던 병사의 쇠 화살촉이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.ConeGeometry(.025,.1,4),M(0x5a5048,{metalness:.5})))})},
  {n:'납작 성돌',h:'삼년산성을 쌓은 납작한 점판암 성돌 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.18,.04,.1),M(0x8e8676)))})},
  {n:'기와 조각',h:'성 안 건물의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'돌 공',h:'성 위에서 굴려 떨어뜨리던 둥근 돌이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.06,10,8),M(0x9a968a)))})}];
 sp(-14,24,2.4,'발굴 탐지 자리','성 안 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__SNDIG=()=>{window.__DETECT&&window.__DETECT({key:'samnyeon_dig',title:'삼년산성 발굴 탐지',emoji:'⛏️',bg:'#2a2822',count:4,TL:150,cand:[[-18,20],[-24,8],[-20,-22],[0,-26],[18,-20],[24,6],[4,10],[-2,24],[22,-6],[10,-28]],items:DIG,intro:'삼년산성 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'삼년산성은 1,500년 넘게 거의 그대로 남은 신라의 돌 성이에요(사적).'})};
 const meta={quest:{t:'삼년산성 둘러보기',d:'남문 터로 들어가 아미지와 바위 글씨, 건물터, 곡성, 현문식 서문을 둘러보세요.',steps:[['남문','남문 터'],['아미지','아미지'],['건물터','건물터'],['곡성','곡성'],['서문','서문 터(현문)']]},
  title:'보은 삼년산성',hint:'삼년산성을 공개 사진·수치로 간추려 지었어요(둘레·높이 줄임, 배치 어림). 돌덩이를 밀어 수레 길을 터 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:RW+10,lines:['보은 삼년산성','신라 470년 · 3년 걸려 쌓음','아미지 · 현문식 서문','간추려 지음']}},
  npc:[['science',[[-6,RW+8],[6,RW+8],[6,RW+14],[-6,RW+14]]]],bounds:[-44,44,-44,60],level:()=>'보은 삼년산성',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:6,draw(g,X,Z,S){g.fillStyle='#7a9448';g.fillRect(0,0,300,300);g.strokeStyle='#8e8676';g.lineWidth=6;g.beginPath();g.arc(150,150-6*S,RW*S,0,Math.PI*2);g.stroke()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:RW+12,yaw:Math.PI},size:{}},meta)}
