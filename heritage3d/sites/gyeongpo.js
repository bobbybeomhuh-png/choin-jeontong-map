/* 강릉 경포대 마당(2026-11-23, 2단계 열한째 묶음): 경포호 서쪽 언덕 위 누각 경포대(보물). 정면 5칸·측면 5칸 팔작지붕 누각, 소나무 숲에 둘러싸임.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(누각 크기·호수 폭 어림, 지붕은 간추린 모양).
   현판 '鏡浦臺'와 '第一江山'이 걸려 있음(옛 현판은 오른쪽에서 왼쪽으로 읽으므로 거꾸로 씀).
   경포대에서는 달이 다섯 개 뜬다는 이야기 — 하늘의 달, 호수의 달, 바다의 달, 술잔의 달, 님 눈동자의 달(전해 오는 이야기).
   호수 속 홍장암: 강원 안렴사 박신과 기생 홍장의 이야기가 전해 오는 바위(전해 오는 이야기).
   놀이: 다섯 달 거울 비추기(호수 위 청동 거울을 눌러 '/'·'\'로 돌려, 하늘 달빛을 꺾어 달 자리마다 닿게 해요. 빛을 반사시켜 길을 잇는 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildGyeongpo(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1347);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(240,240),new THREE.MeshStandardMaterial({map:GT,color:0x7a9a4a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 경포호(북쪽 넓은 호수) + 건너편 솔숲 모래톱 + 동해 */const WZ0=-6,WZ1=-84;const WM=M(0x4a7e98,{roughness:.12,metalness:.08});{const w=new THREE.Mesh(new THREE.PlaneGeometry(200,WZ0-WZ1),WM);w.rotation.x=-Math.PI/2;w.position.set(0,.06,(WZ0+WZ1)/2);G.add(w);const gv=new THREE.Mesh(new THREE.PlaneGeometry(200,3),M(0xc8c0a8));gv.rotation.x=-Math.PI/2;gv.position.set(0,.04,WZ0+1.2);G.add(gv);
  const sand=new THREE.Mesh(new THREE.PlaneGeometry(240,10),M(0xe0d4b0));sand.rotation.x=-Math.PI/2;sand.position.set(0,.05,WZ1-5);G.add(sand);const sea=new THREE.Mesh(new THREE.PlaneGeometry(260,60),M(0x2f6a8a,{roughness:.1,metalness:.1}));sea.rotation.x=-Math.PI/2;sea.position.set(0,.07,WZ1-40);G.add(sea)}
 const pine=(x,z,s=1)=>{const t=new THREE.Mesh(new THREE.CylinderGeometry(.18*s,.28*s,4*s,7),M(0x6a4a32));t.position.set(x,2*s,z);t.rotation.z=(r()-.5)*.25;G.add(t);for(let i=0;i<3;i++){const c=new THREE.Mesh(new THREE.ConeGeometry((2.2-i*.5)*s,1.4*s,8),M(0x2f5a32,{flatShading:true}));c.position.set(x+(r()-.5)*.4,(3.6+i*.9)*s,z+(r()-.5)*.4);G.add(c)}};
 for(let i=0;i<34;i++){const x=-110+i*6.6+r()*2;pine(x,WZ1-8-r()*3,.9+r()*.3)}
 /* 경포대 누각(언덕 위, 소나무 숲) */const PX=0,PZ=10,PW=15.6,PD=12,FY=1.5;const WOOD=M(0x8a3a2a),ROOF=M(0x4a4a52),ST=M(0xa8a296);
 {const b=new THREE.Mesh(new THREE.BoxGeometry(PW+1.2,FY-.2,PD+1.2),ST);b.position.set(PX,(FY-.2)/2,PZ);G.add(b);const fl=new THREE.Mesh(new THREE.BoxGeometry(PW+.4,.2,PD+.4),M(0x9a7a58));fl.position.set(PX,FY-.1,PZ);G.add(fl);
  for(let i=0;i<=5;i++)for(let j=0;j<=4;j++){const edge=i===0||i===5||j===0||j===4;const inner=(i===1||i===4)&&(j===1||j===3);if(!edge&&!inner)continue;const c=new THREE.Mesh(new THREE.CylinderGeometry(.2,.23,3.3,10),WOOD);c.position.set(PX-PW/2+i*PW/5,FY+1.65,PZ-PD/2+j*PD/4);G.add(c)}
  const bm=new THREE.Mesh(new THREE.BoxGeometry(PW+.6,.4,PD+.6),M(0x3a6a5a));bm.position.set(PX,FY+3.4,PZ);G.add(bm);
  const rf=new THREE.Mesh(new THREE.ConeGeometry(1,1,4),ROOF);rf.rotation.y=Math.PI/4;rf.scale.set((PW+4.4)*.72,3.2,(PD+4.4)*.72);rf.position.set(PX,FY+5.2,PZ);G.add(rf);const rg=new THREE.Mesh(new THREE.BoxGeometry(PW*.5,.45,.5),ROOF);rg.position.set(PX,FY+6.6,PZ);G.add(rg);
  for(const[txt,z,ry]of[['臺浦鏡',PZ+PD/2+.32,0],['山江一第',PZ-PD/2-.32,Math.PI]]){const LT=tex(320,110,(q,w,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,w,h);q.strokeStyle='#c8a040';q.lineWidth=6;q.strokeRect(5,5,w-10,h-10);q.fillStyle='#f0e0a0';q.font='bold 62px serif';q.textAlign='center';q.fillText(txt,w/2,78)});const pl=new THREE.Mesh(new THREE.PlaneGeometry(2.4,.82),new THREE.MeshBasicMaterial({map:LT}));pl.position.set(PX,FY+2.9,z);pl.rotation.y=ry;G.add(pl)}
  for(const s of[-1,1]){const st=new THREE.Mesh(new THREE.BoxGeometry(2.4,.6,1),ST);st.position.set(PX+s*4.4,.3,PZ+PD/2+1.1);G.add(st)}
  solids.push({x0:PX-PW/2-.6,x1:PX+PW/2+.6,y0:0,y1:FY+3.6,z0:PZ-PD/2-.6,z1:PZ+PD/2+.6})}
 for(const[x,z]of[[-14,4],[-15,14],[-12,22],[14,4],[15,14],[12,22],[-20,9],[20,10],[-8,-2],[9,-2.4],[-26,20],[26,22]]){pine(x,z,1+r()*.3);solids.push({cx:x,cz:z,r:.5,y0:0,y1:5})}
 sp(PX,PZ+PD/2+3.4,3,'경포대','경포호 서쪽 언덕 위 누각이에요(보물). 정면 5칸·측면 5칸 큰 누각이고, 앞에 "鏡浦臺", 뒤에 "第一江山" 현판이 걸려 있어요. 달밤에는 하늘·호수·바다·술잔·님 눈동자에 달이 다섯 개 뜬다는 이야기가 전해 와요(전해 오는 이야기).');
 /* 홍장암(호수 속 바위) */{const rk=new THREE.Mesh(new THREE.DodecahedronGeometry(2),M(0x8a8478,{flatShading:true}));rk.scale.set(1.4,.7,1);rk.position.set(-24,.5,-22);G.add(rk);const LT=tex(256,80,(q,w,h)=>{q.clearRect(0,0,w,h);q.fillStyle='#3a3630';q.font='bold 46px serif';q.textAlign='center';q.fillText('紅粧岩',w/2,58)});const t=new THREE.Mesh(new THREE.PlaneGeometry(1.8,.56),new THREE.MeshBasicMaterial({map:LT,transparent:true}));t.position.set(-24,.9,-20.5);G.add(t)}
 sp(-24,-3.6,2.6,'홍장암','호수 속 바위 홍장암이에요. 강원 안렴사 박신이 기생 홍장을 그리워하자, 강릉 부사가 달밤에 홍장을 배에 태워 선녀처럼 꾸며 보냈다는 이야기가 전해 와요(전해 오는 이야기).');
 /* 하늘의 달(밤에 더 밝게) */const moon=new THREE.Mesh(new THREE.SphereGeometry(4,20,14),new THREE.MeshBasicMaterial({color:0xfff4d0,transparent:true,opacity:.35}));moon.position.set(-40,46,-150);G.add(moon);
 /* 다섯 달 거울 비추기(11/23) — 경포호 위 */const GX=0,GZ=-15;const pg=new THREE.Group();pg.position.set(GX,0,GZ);pg.visible=false;G.add(pg);
 window.__GPMOON=()=>{if(document.getElementById('gpmP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(GX,-3,0)}catch(e){}pg.visible=true;
  const NAMES=['호수의 달','바다의 달','술잔의 달','님 눈동자의 달'];const CFG=[{N:5,m:[2,3],T:2,D:1},{N:6,m:[3,4],T:3,D:3},{N:6,m:[4,6],T:4,D:5}];
  let rd=0,N=5,CS=1.5,src=0,mir=new Map(),sol=new Map(),targ=[],taps=0,minT=0,t0=0,done=false,auto=false,last=performance.now(),wait=0,aT=0,hits=[],litSet=new Set();const res=[];const NR=3;
  const camA=()=>{const k=innerWidth<innerHeight?2:1;const s=N*CS;return[GX,s*1.05*k+2,GZ+s*.95*k+3,GX,0,GZ-.4,50]};window.__GCAM=()=>document.getElementById('sssX')?null:document.getElementById('gpmP')?camA():null;
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,200);const rc=new THREE.Raycaster();
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  const snd=(f,len=.1,ty='triangle',v=.06)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(v,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const K=(c,w)=>w*N+c;const turn=(o,dx,dw)=>o==='/'?[-dw,-dx]:[dw,dx];
  /* 빛 따라가기: 왼쪽 가장자리 src 줄에서 오른쪽으로 들어와 거울마다 꺾임 */
  const trace=mm=>{let c=-1,w=src,dx=1,dw=0;const pts=[[c,w]],cells=new Set();for(let s=0;s<N*N*4;s++){c+=dx;w+=dw;if(c<0||w<0||c>=N||w>=N){pts.push([c,w]);break}const k=K(c,w);cells.add(k);const o=mm.get(k);if(o){[dx,dw]=turn(o,dx,dw);pts.push([c,w])}}return{pts,cells}};
  const gen=()=>{const C=CFG[rd];for(let t=0;t<400;t++){src=(r()*N)|0;let c=-1,w=src,dx=1,dw=0;const vis=new Set(),m=new Map(),path=[];let run=0,ok=true;
    for(let s=0;s<N*N;s++){c+=dx;w+=dw;if(c<0||w<0||c>=N||w>=N)break;const k=K(c,w);if(vis.has(k)){ok=false;break}vis.add(k);path.push(k);run++;
     if(run>=2&&r()<.42&&m.size<C.m[1]){const o=r()<.5?'/':'\\';const[nx,nw]=turn(o,dx,dw);if(c+nx>=0&&w+nw>=0&&c+nx<N&&w+nw<N){m.set(k,o);dx=nx;dw=nw;run=0}}}
    if(!ok||m.size<C.m[0])continue;const lastM=path.findIndex(k=>k===[...m.keys()].pop());const after=path.slice(lastM+1).filter(k=>!m.has(k));const free=path.filter(k=>!m.has(k));if(after.length<1||free.length<C.T+1)continue;
    const tg=[after[(r()*after.length)|0]];let g=0;while(tg.length<C.T&&g++<200){const k=free[(r()*free.length)|0];if(!tg.includes(k)&&!tg.some(q=>Math.abs(q%N-k%N)+Math.abs(((q/N)|0)-((k/N)|0))<2))tg.push(k)}if(tg.length<C.T)continue;
    const all=new Map(m);let dg=0;while(dg<C.D&&g++<400){const k=(r()*N*N)|0;if(vis.has(k)||all.has(k))continue;all.set(k,r()<.5?'/':'\\');dg++}
    if(!tg.every(k=>trace(all).cells.has(k)))continue;return{sol:m,all,tg}}return null};
  const clr=()=>{while(pg.children.length)pg.remove(pg.children[0]);hits=[]};
  const cpos=k=>[((k%N)-(N-1)/2)*CS,(((k/N)|0)-(N-1)/2)*CS];const gp=(c,w)=>[(c-(N-1)/2)*CS,(w-(N-1)/2)*CS];
  const BR=new THREE.MeshBasicMaterial({color:0xfff0a0,transparent:true,opacity:.92});const MIRM=M(0xb08a48,{metalness:.8,roughness:.25,emissive:0x302010});
  const TOFF=M(0xd8d8d0,{emissive:0x222222,roughness:.6}),TON=M(0xfff4c0,{emissive:0xffd070,emissiveIntensity:1.1,roughness:.4});
  let beam=new THREE.Group(),mirObj=new Map(),tgObj=[];
  const label=(txt)=>{const T=tex(256,64,(q,w,h)=>{q.clearRect(0,0,w,h);q.fillStyle='rgba(20,30,40,.75)';q.fillRect(0,4,w,h-8);q.fillStyle='#fff4c0';q.font='bold 30px sans-serif';q.textAlign='center';q.fillText(txt,w/2,43)});const s=new THREE.Sprite(new THREE.SpriteMaterial({map:T,transparent:true,depthTest:false}));s.scale.set(1.9,.48,1);return s};
  const draw=()=>{pg.remove(beam);beam=new THREE.Group();pg.add(beam);const{pts,cells}=trace(mir);
   for(let i=0;i<pts.length-1;i++){let[a,b]=pts[i],[c2,d2]=pts[i+1];const[x0,z0]=gp(a,b),[x1,z1]=gp(c2,d2);const xa=i===0?x0+CS*.5:x0,za=z0;const xe=i===pts.length-2?(x0+x1)/2+(x1-x0)/2*.75:x1,ze=i===pts.length-2?(z0+z1)/2+(z1-z0)/2*.75:z1;const L=Math.hypot(xe-xa,ze-za);const m=new THREE.Mesh(new THREE.BoxGeometry(L,.06,.1),BR);m.position.set((xa+xe)/2,.42,(za+ze)/2);m.rotation.y=-Math.atan2(ze-za,xe-xa);beam.add(m)}
   litSet=new Set(targ.filter(k=>cells.has(k)));tgObj.forEach(o=>{const on=litSet.has(o.userData.k);o.children[0].material=on?TON:TOFF});
   mirObj.forEach((o,k)=>{o.rotation.y=mir.get(k)==='/'?Math.PI/4:-Math.PI/4})};
  const newRound=()=>{clr();pg.remove(beam);mirObj=new Map();tgObj=[];const C=CFG[rd];N=C.N;CS=N>5?1.35:1.5;let g=null;while(!g)g=gen();sol=g.sol;targ=g.tg;
   mir=new Map();for(const[k,o]of g.all)mir.set(k,o);let tries=0;do{for(const k of sol.keys())mir.set(k,r()<.5?'/':'\\');for(const k of g.all.keys())if(!sol.has(k))mir.set(k,r()<.5?'/':'\\');tries++}while(targ.every(k=>trace(mir).cells.has(k))&&tries<50);
   minT=[...sol.keys()].filter(k=>mir.get(k)!==sol.get(k)).length;taps=0;
   const fr=new THREE.Mesh(new THREE.BoxGeometry(N*CS+.4,.08,N*CS+.4),M(0x3a5a6a,{transparent:true,opacity:.35}));fr.position.y=.1;pg.add(fr);
   for(let k=0;k<N*N;k++){const[x,z]=cpos(k);const pad=new THREE.Mesh(new THREE.CylinderGeometry(CS*.38,CS*.4,.06,14),M(0x4a7a42,{roughness:.8}));pad.position.set(x,.14,z);pg.add(pad)}
   for(const[k]of mir){const[x,z]=cpos(k);const o=new THREE.Group();o.position.set(x,.15,z);const disc=new THREE.Mesh(new THREE.BoxGeometry(CS*.92,.62,.08),MIRM);disc.position.y=.36;o.add(disc);const rim=new THREE.Mesh(new THREE.BoxGeometry(CS*.96,.08,.12),M(0x5a3a22));rim.position.y=.05;o.add(rim);pg.add(o);mirObj.set(k,o);const hb=new THREE.Mesh(new THREE.BoxGeometry(CS*.95,.9,CS*.95),new THREE.MeshBasicMaterial({visible:false}));hb.position.set(x,.45,z);hb.userData.k=k;pg.add(hb);hits.push(hb)}
   targ.forEach((k,i)=>{const[x,z]=cpos(k);const o=new THREE.Group();o.position.set(x,.16,z);o.userData.k=k;const d0=new THREE.Mesh(new THREE.CylinderGeometry(CS*.3,CS*.3,.05,24),TOFF);o.add(d0);const lb=label(NAMES[i]);lb.position.set(0,1.1,0);o.add(lb);pg.add(o);tgObj.push(o)});
   {const[x,z]=gp(-1,src);const p=new THREE.Mesh(new THREE.CylinderGeometry(.08,.1,1,8),M(0x6a4a32));p.position.set(x,.5,z);pg.add(p);const s=new THREE.Mesh(new THREE.SphereGeometry(.3,16,12),new THREE.MeshBasicMaterial({color:0xfff4d0}));s.position.set(x,.95,z);pg.add(s);const lb=label('하늘의 달');lb.position.set(x,1.7,z);pg.add(lb)}
   t0=performance.now();draw();ui()};
  const tap=k=>{if(done||wait>0||!mir.has(k))return;mir.set(k,mir.get(k)==='/'?'\\':'/');taps++;snd(620+((k*37)%5)*60,.09);draw();
   if(litSet.size===targ.length){const tm=(performance.now()-t0)/1000;const sc=Math.max(30,Math.round(100-Math.max(0,taps-minT)*5-Math.max(0,tm-12*rd-15)*.35));res.push(sc);wait=2.2;snd(880,.5,'sine',.07);setTimeout(()=>snd(1320,.6,'sine',.05),180);ui(`달빛이 달 ${targ.length+1}개를 다 이었어요! 누른 횟수 ${taps}(가장 적게 ${minT}) · ${sc}점`)}else ui()};
  const ov=document.createElement('div');ov.id='gpmO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  ov.onpointerdown=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(hits,false)[0];if(h)tap(h.object.userData.k)};
  const d=document.createElement('div');d.id='gpmP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#18222e;border:3px solid #f0d890;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4f0e4;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f8e4a0">🌕 다섯 달 거울 비추기 ${rd+1}/${NR}</b><div style="font-size:12px;margin:4px 0;line-height:1.5">호수 위 청동 거울을 누르면 방향이 바뀌어요(/ ↔ \\). 하늘의 달빛이 거울에 꺾여 나아가요. <b>달 자리 ${targ.length}곳</b>을 모두 지나게 해요.</div><div style="font-size:13px">닿은 달 ${litSet.size}/${targ.length} · 누른 횟수 ${taps}</div><div style="font-size:13px;color:#f8e4a0;min-height:18px">${msg}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#f4f0e4;border:1px solid #f4f0e4;border-radius:8px;padding:2px 8px;margin-top:4px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const cleanup=()=>{clr();pg.remove(beam);pg.visible=false;ov.remove()};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/res.length);const s2=Q>=80?3:Q>=55?2:Q>0?1:0;try{ctx.done('gyeongpo_moon',Q,'다섯 달 거울 비추기')}catch(e){}window.__GPMQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f8e4a0">달 다섯 개가 떴어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">경포대에서는 하늘·호수·바다·술잔·님 눈동자에 달이 다섯 개 뜬다는 이야기가 전해 와요(전해 오는 이야기). 거울은 빛이 들어온 각도만큼 꺾어 내보내요.</div><div style="font-size:24px;color:#f0d890">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#f0d890;color:#18222e;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4f0e4;border:2px solid #f4f0e4;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__GPMOON()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;const tt=now/1000;
   tgObj.forEach(o=>{if(litSet.has(o.userData.k))o.children[0].scale.setScalar(1+Math.sin(tt*5)*.08);else o.children[0].scale.setScalar(1)});
   if(auto&&wait<=0){aT-=dt;if(aT<=0){aT=.35;const k=[...sol.keys()].find(x=>mir.get(x)!==sol.get(x));if(k!=null)tap(k)}}
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=NR){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);
  window.__GPMG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},tap,get lit(){return litSet.size},get T(){return targ.length},get minT(){return minT},get mirrors(){return [...mir.keys()]},scr:k=>{setPC();const m=hits.find(c=>c.userData.k===k);const v=new THREE.Vector3();m.getWorldPosition(v);v.project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]}};try{ctx.say('거울을 돌려 달빛을 이어 봐요!',2.4)}catch(e){}};
 sp(GX,-3,2.6,'다섯 달 거울','호숫가에서 청동 거울을 돌려 하늘의 달빛을 호수·바다·술잔·님 눈동자의 달 자리로 이어 봐요.');
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[PX,FY+3,PZ],[PX-6,3,PZ+9],[PX+6,3,PZ+9],[-24,2,-4],[GX,2,-3],[16,2,26]]){const Lt=new THREE.PointLight(0xffc080,0,28,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8);moon.material.opacity=.35+nk*.65};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'술잔 조각',h:'누각에서 달을 띄워 마시던 백자 술잔 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.07,.04,.05,14,1,true,0,3.6),M(0xf0ece0,{side:THREE.DoubleSide})))})},
  {n:'조개껍데기',h:'경포 바닷가에서 밀려온 조개껍데기예요.',mk:mk(g=>{const s=new THREE.Mesh(new THREE.SphereGeometry(.05,10,6,0,Math.PI*2,0,Math.PI/2),M(0xe8d8c8));s.scale.y=.4;g.add(s)})},
  {n:'솔방울',h:'경포대를 둘러싼 소나무의 솔방울이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.ConeGeometry(.03,.07,8),M(0x6a4a2a)))})},
  {n:'기와 조각',h:'누각 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(22,30,2.4,'발굴 탐지 자리','경포대 언덕 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__GPDIG=()=>{window.__DETECT&&window.__DETECT({key:'gyeongpo_dig',title:'경포대 발굴 탐지',emoji:'⛏️',bg:'#18222e',count:4,TL:150,cand:[[-20,28],[-6,30],[8,32],[26,30],[-30,4],[30,4],[-22,-2],[22,-2],[-32,26],[32,16]],items:DIG,intro:'경포대 언덕 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'경포대는 관동팔경의 하나로 꼽히는 누각이에요(보물).'})};
 const meta={quest:{t:'경포대 둘러보기',d:'누각 경포대를 보고, 호숫가 홍장암 이야기를 듣고, 달빛 거울 놀이를 해 보세요.',steps:[['경포대','경포대'],['홍장암','홍장암'],['다섯 달','다섯 달 거울']]},
  title:'강릉 경포대',hint:'경포대를 공개 사진으로 간추려 지었어요(누각 크기·호수 폭 어림). 호숫가에서 거울로 달빛을 이어 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-8,z:30,lines:['강릉 경포대','관동팔경 · 누각(보물)','鏡浦臺 · 第一江山','간추려 지음']}},
  npc:[['science',[[-6,26],[6,26],[6,32],[-6,32]]]],bounds:[-40,40,-6,36],level:()=>'강릉 경포대',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:-10,draw(g,X,Z,S){g.fillStyle='#7a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#4a7e98';g.fillRect(0,0,300,150+(WZ0+10)*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:28,yaw:Math.PI},size:{}},meta)}
