/* 장성 백양사 마당(2026-11-23, 2단계 다섯째 묶음): 백암산 백양사. 쌍계루 앞 연못에 비친 백학봉 바위 벼랑으로 이름난 절.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   비자나무 숲 길(천연기념물) → 계곡물을 돌 보로 막아 만든 연못과 쌍계루(정몽주 시판이 걸림) → 대웅전·팔층석탑 / 고불매(천연기념물, 오래된 매화) / 뒤 백학봉 흰 바위.
   흰 양이 스님의 설법을 듣고 하늘로 올라갔다는 절 이름 이야기는 전해 오는 이야기.
   놀이: 보 막아 물 채우기(돌 보 틈에 돌을 반쯤·다 막아 들어오는 물과 새는 물이 맞는 높이에서 연못이 잔잔해지게. 너무 막으면 넘치고 덜 막으면 안 차요. 맞으면 쌍계루가 물에 비쳐요, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildBaegyang(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(632);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7a9a48,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 백학봉: 북쪽 흰 바위 벼랑 */{for(let i=0;i<7;i++){const k=new THREE.Mesh(new THREE.ConeGeometry(9+r()*5,30+r()*16,5),M(0xd0ccc0,{flatShading:true}));k.position.set(-30+i*10,14,-100-r()*6);k.rotation.y=r()*3;G.add(k)}for(let i=0;i<6;i++){const c2=new THREE.Mesh(new THREE.ConeGeometry(22+r()*10,26+r()*10,7),M(0x4a6a3a,{flatShading:true}));c2.position.set(-96+i*38,12,-90);G.add(c2)}}
 const ST=M(0xa8a296),ST2=M(0x948e82),WOOD=M(0x8a3a2a),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50);
 const roof=(x,y,z,W,D,h)=>{const rf=new THREE.Mesh(new THREE.ConeGeometry(1,1,4),ROOF);rf.rotation.y=Math.PI/4;rf.scale.set(W*.72,h,D*.72);rf.position.set(x,y+h/2,z);rf.castShadow=true;G.add(rf);return rf};
 const plaque=(x,y,z,txt,w=2)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 const hall=(x,z,W,D,PH,base=.6)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(W+1.4,base,D+1.4),ST);b.position.set(x,base/2,z);G.add(b);const w=new THREE.Mesh(new THREE.BoxGeometry(W,PH,D),WALLW);w.position.set(x,base+PH/2,z);G.add(w);const n=Math.max(2,Math.round(W/3));for(let i=0;i<=n;i++)for(const j of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.18,.2,PH,10),WOOD);c.position.set(x-W/2+i*W/n,base+PH/2,z+j*D/2);G.add(c)}roof(x,base+PH,z,W+3,D+3,PH*.8);solids.push({x0:x-W/2-.7,x1:x+W/2+.7,y0:0,y1:base+PH,z0:z-D/2-.7,z1:z+D/2+.7});return base+PH};
 /* 비자나무 숲 길 */{const p=new THREE.Mesh(new THREE.PlaneGeometry(3,24),M(0xc8b890));p.rotation.x=-Math.PI/2;p.position.set(-18,.02,40);G.add(p);for(let i=0;i<14;i++){const s=i%2?1:-1,z=50-i*1.8;const t=new THREE.Mesh(new THREE.CylinderGeometry(.25,.35,5,7),M(0x5a4030));t.position.set(-18+s*(2.6+r()*2),2.5,z);G.add(t);const c=new THREE.Mesh(new THREE.SphereGeometry(1.8,8,6),M(0x2a4a2a));c.scale.y=.8;c.position.set(t.position.x,5.4,z);G.add(c);solids.push({cx:t.position.x,cz:z,r:.4,y0:0,y1:5})}}
 sp(-18,48,3,'비자나무 숲','백양사 들머리의 비자나무 숲이에요(천연기념물). 우리나라 비자나무가 자라는 북쪽 끝 무렵이래요.');
 /* 연못(보로 막음) + 아래 계곡 */const PX0=-14,PX1=14,PZ0=6,PZ1=20,WZ=20.6;{const bed=new THREE.Mesh(new THREE.PlaneGeometry(PX1-PX0,PZ1-PZ0),M(0x6a6658));bed.rotation.x=-Math.PI/2;bed.position.set(0,-.6,(PZ0+PZ1)/2);G.add(bed);solids.push({x0:PX0,x1:PX1,y0:-3,y1:3,z0:PZ0,z1:PZ1+.4});const ds=new THREE.Mesh(new THREE.PlaneGeometry(220,5),M(0x5a8a9a,{roughness:.2}));ds.rotation.x=-Math.PI/2;ds.position.set(0,.04,25);G.add(ds);solids.push({x0:-110,x1:-20,y0:-2,y1:3,z0:22.5,z1:27.5},{x0:-16,x1:110,y0:-2,y1:3,z0:22.5,z1:27.5});const br=new THREE.Mesh(new THREE.BoxGeometry(4,.3,6),ST);br.position.set(-18,.15,25);G.add(br)}
 const water=new THREE.Mesh(new THREE.PlaneGeometry(PX1-PX0,PZ1-PZ0),new THREE.MeshStandardMaterial({color:0x4a7a8a,roughness:.15,metalness:.2,transparent:true,opacity:.9}));water.rotation.x=-Math.PI/2;water.position.set(0,.05,(PZ0+PZ1)/2);G.add(water);
 /* 쌍계루(연못 북쪽 기슭) + 물에 비친 모습 */const SX=6,SZ=2;const pav=new THREE.Group();pav.position.set(SX,0,SZ);G.add(pav);{for(let i=0;i<4;i++)for(const j of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.2,.22,5,10),WOOD);c.position.set(-4.5+i*3,2.5,j*2);pav.add(c)}const dk=new THREE.Mesh(new THREE.BoxGeometry(10,.25,4.6),M(0x8a6a4a));dk.position.set(0,2.6,0);pav.add(dk);const rf=new THREE.Mesh(new THREE.ConeGeometry(1,1,4),ROOF);rf.rotation.y=Math.PI/4;rf.scale.set(13*.72,2,7.6*.72);rf.position.set(0,6,0);pav.add(rf);for(let i=0;i<4;i++)for(const j of[-1,1])solids.push({cx:SX-4.5+i*3,cz:SZ+j*2,r:.25,y0:0,y1:5})}
 plaque(SX,4.5,SZ+2.35,'樓溪雙',1.6);const refl=pav.clone();refl.scale.y=-1;refl.position.set(SX,.1,SZ+4.6);refl.traverse(o=>{if(o.isMesh){o.material=o.material.clone();o.material.transparent=true;o.material.opacity=0;o.material.depthTest=false;o.material.depthWrite=false;o.renderOrder=5}});G.add(refl);const wy=h=>.03+h*.5;
 sp(SX,SZ+3.6,3,'쌍계루','두 계곡물이 만나는 연못가의 누각이에요. 연못에 비친 쌍계루와 백학봉이 아름답기로 이름나요. 누각 안에 고려 정몽주의 시를 새긴 판이 걸려 있어요.');
 /* 대웅전·팔층석탑·고불매 */{const y=hall(0,-16,11,6,3.2,1);plaque(0,y-.45,-16+3.05,'殿雄大',1.8)}sp(0,-10,3,'대웅전','백양사의 큰 법당이에요. 뒤로 백학봉 흰 바위가 병풍처럼 서 있어요.');
 {const X=-10,Z=-24;let y=0;const st=(w,h)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,w),ST);m.position.set(X,y+h/2,Z);G.add(m);y+=h};st(2.4,.5);for(let i=0;i<8;i++){st(1.1-i*.07,.42-i*.02);st(1.7-i*.11,.14)}solids.push({cx:X,cz:Z,r:1.3,y0:0,y1:y})}
 sp(-10,-20,2.6,'팔층석탑','대웅전 뒤의 팔층석탑이에요. 부처님 진신사리를 모셨다고 전해요.');
 {const X=16,Z=-10;const t=new THREE.Mesh(new THREE.CylinderGeometry(.3,.45,3,8),M(0x4a3a2a));t.position.set(X,1.5,Z);t.rotation.z=-.3;G.add(t);for(let k=0;k<8;k++){const f=new THREE.Mesh(new THREE.SphereGeometry(.8,8,6),M(0xe8a0b8));f.position.set(X+(r()-.5)*3,2.8+r()*1.4,Z+(r()-.5)*3);G.add(f)}solids.push({cx:X,cz:Z,r:.5,y0:0,y1:3})}
 sp(16,-6,2.6,'고불매','오래된 홍매화예요(천연기념물). 이른 봄 연분홍 꽃이 피고 향이 진해요.');
 /* 보 막아 물 채우기(11/23): 연못 남쪽 돌 보 틈 */const NS=6,SLW=(PX1-PX0)/NS;const weir=new THREE.Group();G.add(weir);const slots=[];for(let i=0;i<NS;i++){const x=PX0+SLW*(i+.5);for(const s of[-1,1]){const b=new THREE.Mesh(new THREE.BoxGeometry(SLW*.3,1.8,.9),ST2);b.position.set(x+s*SLW*.35,.2,WZ);weir.add(b)}const plug=new THREE.Group();plug.position.set(x,0,WZ);weir.add(plug);const hit=new THREE.Mesh(new THREE.BoxGeometry(SLW*.4,1.8,1.2),new THREE.MeshBasicMaterial({visible:false}));hit.position.y=.3;hit.userData.slot=i;plug.add(hit);slots.push({x,plug,hit,st:2})}
 const setPlug=(i,st)=>{const S=slots[i];S.st=st;while(S.plug.children.length>1)S.plug.remove(S.plug.children[1]);if(st>=1){const b=new THREE.Mesh(new THREE.BoxGeometry(SLW*.38,st===2?1.7:.8,.8),ST);b.position.y=st===2?.15:-.3;S.plug.add(b)}};for(let i=0;i<NS;i++)setPlug(i,2);
 let H=.05;const flows=[];const PH0=-.55,PHMAX=1.25;
 window.__BYWEIR=()=>{if(document.getElementById('bywP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(0,WZ+12,0)}catch(e){}
  let rd=0,K=[],F=0,band=[0,0],hold=0,done=false,auto=false,last=performance.now(),t0=0,wait=0,clicks=0,best=null;const res=[];
  const camA=()=>{const k=innerWidth<innerHeight?1.6:1;return[0,6*k,WZ+10*k,0,.4,PZ0+4,50]};window.__GCAM=()=>document.getElementById('bywP')?camA():null;
  const snd=(f,len=.1,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const fac=[1,.45,0];const leak=()=>slots.reduce((a,S,i)=>a+K[i]*fac[S.st],0);const eq=L=>L<=0?99:Math.pow(F/L,2);
  const newRound=()=>{K=slots.map(()=>.6+r()*.9);const tgt=[.75,.85,.95][rd];band=[tgt-[.14,.1,.07][rd],tgt+[.14,.1,.07][rd]];
   /* 정답 하나를 고르고 그에 맞춰 들어오는 물을 정함 */let tries=0,ans;do{ans=slots.map(()=>(r()*3)|0)}while((ans.every(v=>v===2)||ans.every(v=>v===0))&&tries++<50);const La=slots.reduce((a,S,i)=>a+K[i]*fac[ans[i]],0)||.5;F=Math.sqrt(tgt)*La;
   /* 가장 적게 바꾸는 답 찾기(3^6 = 729) */best=null;for(let c=0;c<729;c++){const st=[];let x=c;for(let i=0;i<NS;i++){st.push(x%3);x=(x/3)|0}const L=slots.reduce((a,S,i)=>a+K[i]*fac[st[i]],0);const h=eq(L);if(h>=band[0]+.02&&h<=band[1]-.02){const ch=st.filter(v=>v!==0).length;if(!best||ch<best.ch)best={st,ch}}}
   slots.forEach((S,i)=>setPlug(i,0));H=.05;hold=0;clicks=0;t0=performance.now()/1000;ui()};
  const d=document.createElement('div');d.id='bywP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1e2a30;border:3px solid #6ab0c0;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef4f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const level=()=>Math.round(Math.max(0,H)*100);
  const ui=(msg='')=>{if(done)return;const L=leak();const he=eq(L);d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#a8dce8">💧 보 막아 물 채우기 ${rd+1}/3</b><div style="font-size:12px;margin:4px 0;line-height:1.5">보의 틈을 누르면 돌이 열림 → 반쯤 → 다 막힘으로 바뀌어요. 들어오는 물과 새는 물이 맞아 연못이 초록 띠 높이에서 잔잔해지면 쌍계루가 물에 비쳐요. 너무 막으면 넘쳐요!</div><div style="font:15px 'Do Hyeon',sans-serif">물 높이 ${level()}cm · 목표 ${Math.round(band[0]*100)}~${Math.round(band[1]*100)}cm</div><div style="font-size:13px;color:#a8dce8;min-height:18px">${msg||(H>PHMAX?'물이 보를 넘쳐요!':hold>0?'잔잔해지고 있어요… '+Math.ceil(4-hold)+'초':'')}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f8;border:1px solid #eef4f8;border-radius:8px;padding:2px 8px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const tap=i=>{if(done||wait>0)return;setPlug(i,(slots[i].st+1)%3);clicks++;snd(300+slots[i].st*120,.12);ui()};
  const band3=new THREE.Mesh(new THREE.PlaneGeometry(1.4,.1),new THREE.MeshBasicMaterial({color:0x5ad06a}));G.add(band3);const gauge=new THREE.Mesh(new THREE.BoxGeometry(.12,2.2,.12),M(0xe8e0c8));gauge.position.set(PX0+1,.5,PZ1-1.3);G.add(gauge);
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.1,300);const rc=new THREE.Raycaster();const ov=document.createElement('div');ov.id='bywO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  ov.onpointerdown=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(slots.map(S=>S.hit),false)[0];if(h)tap(h.object.userData.slot)};
  const cleanup=()=>{ov.remove();G.remove(band3);G.remove(gauge);slots.forEach((S,i)=>setPlug(i,2));H=.05;water.position.y=wy(.85);refl.position.y=wy(.85);refl.traverse(o=>{if(o.isMesh)o.material.opacity=.4})};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3);const s2=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('baegyang_weir',Q,'보 막아 물 채우기')}catch(e){}window.__BYQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#a8dce8">연못에 쌍계루가 비쳤어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">백양사 쌍계루 앞 연못은 계곡물을 돌 보로 막아 만들었어요. 물이 알맞게 차서 잔잔해야 누각과 백학봉이 거울처럼 비쳐요(놀이의 물 높이와 틈은 간추린 것).</div><div style="font-size:24px;color:#6ab0c0">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#6ab0c0;color:#1e2a30;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f8;border:2px solid #eef4f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__BYWEIR()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  let at=0,ut=0;const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   const L=leak();const out=L*Math.sqrt(Math.max(0,H))+(H>PHMAX?(H-PHMAX)*6:0);H+=(F-out)*dt*.9;H=Math.max(0,H);water.position.y=wy(H);refl.position.y=wy(H);
   const ok=H>=band[0]&&H<=band[1]&&Math.abs(F-out)<.06;if(wait<=0){if(ok)hold+=dt;else hold=Math.max(0,hold-dt*2)}
   refl.traverse(o=>{if(o.isMesh)o.material.opacity=Math.min(.55,hold/4*.55)});band3.position.set(PX0+1.75,wy((band[0]+band[1])/2),PZ1-1);band3.scale.y=(band[1]-band[0])*.5/.1;
   if(auto&&wait<=0&&best){at+=dt;if(at>.3){at=0;const i=slots.findIndex((S,k)=>S.st!==best.st[k]);if(i>=0)tap(i)}}
   ut+=dt;if(ut>.4){ut=0;ui()}
   if(wait<=0&&hold>=4){wait=1.4;snd(760,.5,'sine');ui('잔잔해진 연못에 쌍계루가 비쳤어요!')}
   if(wait>0){wait-=dt;if(wait<=0){const el=performance.now()/1000-t0;res.push(Math.max(30,Math.round(100-Math.max(0,clicks-(best?best.st.reduce((a,v)=>a+v,0):clicks))*3-Math.max(0,el-30-rd*10)*.5)));rd++;if(rd>=3){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);window.__BYG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},get H(){return H},tap,scr:i=>{setPC();const v=new THREE.Vector3();slots[i].hit.getWorldPosition(v);v.project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]},get st(){return slots.map(S=>S.st)}};try{ctx.say('보 틈을 막아 연못을 알맞게 채워 봐요!',2.4)}catch(e){}};
 spots.push({x:0,y:0,z:WZ+4.5,r:3,t:'보 막는 자리',h:'연못 아래 돌 보의 틈을 막아 물을 알맞게 채워 봐요.'});
 /* 평소 연못 높이 */water.position.y=wy(.85);refl.position.y=wy(.85);refl.traverse(o=>{if(o.isMesh)o.material.opacity=.4});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[-18,3,44],[-18,2.4,28],[SX,3,SZ+4],[0,3,-10],[16,2.4,-6]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'비자 열매',h:'비자나무 열매예요. 옛날엔 약으로도 썼어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),M(0x6a5a3a)))})},
  {n:'기와 조각',h:'절 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'청동 풍경',h:'처마 끝에서 울리던 작은 종이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.03,.05,.09,10),M(0x5a7a62,{metalness:.5})))})},
  {n:'백자 발우 조각',h:'스님의 밥그릇(발우) 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.08,.06,14,1,true,0,2.4),M(0xf0ece0,{side:THREE.DoubleSide})))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(-30,40,2.4,'발굴 탐지 자리','숲길 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__BYDIG=()=>{window.__DETECT&&window.__DETECT({key:'baegyang_dig',title:'백양사 발굴 탐지',emoji:'⛏️',bg:'#1e2a30',count:4,TL:150,cand:[[-30,46],[-6,40],[10,34],[-28,14],[22,10],[-22,-8],[22,-20],[6,-26],[-30,-24],[34,4]],items:DIG,intro:'백양사 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'백양사는 백암산 백학봉 아래의 절로, 쌍계루 연못 풍경으로 이름나요.'})};
 const meta={quest:{t:'백양사 둘러보기',d:'비자나무 숲을 지나 다리를 건너 쌍계루 연못, 대웅전, 탑과 고불매를 둘러보세요.',steps:[['비자나무 숲','비자나무 숲'],['쌍계루','쌍계루'],['대웅전','대웅전'],['팔층석탑','팔층석탑'],['고불매','고불매']]},
  title:'장성 백양사',hint:'백암산 백양사를 공개 사진으로 간추려 지었어요(배치·크기 어림). 연못 아래 보 틈을 막아 물을 알맞게 채우면 쌍계루가 물에 비쳐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-24,z:52,lines:['장성 백양사','백암산 · 백학봉','쌍계루 · 고불매','간추려 지음']}},
  npc:[['science',[[-22,52],[-14,52],[-14,58],[-22,58]]]],bounds:[-50,50,-40,62],level:()=>'장성 백양사',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.2,ox:-4,oz:8,draw(g,X,Z,S){g.fillStyle='#7a9a48';g.fillRect(0,0,300,300);g.fillStyle='#4a7a8a';g.fillRect(X(PX0),Z(PZ1),(PX1-PX0)*S,(PZ1-PZ0)*S);g.fillStyle='#5a8a9a';g.fillRect(0,Z(27.5),300,5*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-18,z:56,yaw:Math.PI},size:{}},meta)}
