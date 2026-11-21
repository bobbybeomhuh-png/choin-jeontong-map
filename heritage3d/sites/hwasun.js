/* 화순 고인돌 유적 마당(2026-11-21): 공개 실측 3D(CC BY)가 없어 공개 수치로 간추려 지음. 세계유산 「고창·화순·강화 고인돌 유적」(2000).
   도곡면 효산리~춘양면 대신리 보검재 골짜기 약 5km에 청동기 고인돌 590여 기. 핑매바위(덮개돌 길이 7.3m·너비 5m·높이 4m, 200톤 넘음), 감태바위 채석장(덮개돌을 떼어 낸 바위 벼랑), 관청바위 무리.
   놀이: 덮개돌 옮기기(통나무 굴림—뒤로 빠진 통나무를 들어 돌 앞에 다시 깔기, 마지막엔 흙 경사로로 받침돌 위에 올림), 발굴 탐지(__DETECT), 밤엔 모닥불. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildHwasun(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(2000);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 골짜기 풀밭 + 흙길 */
 const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#7d8f4a';q.fillRect(0,0,w,h);for(let i=0;i<3600;i++){q.fillStyle=r()<.5?'rgba(90,110,40,.5)':'rgba(170,150,90,.35)';q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
 const gr=new THREE.Mesh(new THREE.PlaneGeometry(320,320),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.position.y=.01;gr.receiveShadow=true;G.add(gr);
 const PTX=tex(256,256,(q,w,h)=>{q.fillStyle='#a8906a';q.fillRect(0,0,w,h);for(let i=0;i<1600;i++){q.fillStyle=r()<.5?'rgba(130,100,70,.5)':'rgba(200,180,140,.4)';q.fillRect(r()*w,r()*h,3,3)}},[2,30]);
 {const p=new THREE.Mesh(new THREE.PlaneGeometry(4,170),new THREE.MeshStandardMaterial({map:PTX,roughness:1}));p.rotation.x=-Math.PI/2;p.position.set(-6,.02,0);G.add(p);const p2=new THREE.Mesh(new THREE.PlaneGeometry(3.2,34),new THREE.MeshStandardMaterial({map:PTX,roughness:1}));p2.rotation.x=-Math.PI/2;p2.rotation.z=Math.PI/2;p2.position.set(-9,.025,14);G.add(p2)}
 /* 화강암 결: 회색에 얼룩 이끼 */
 const ST=tex(256,256,(q,w,h)=>{q.fillStyle='#8c8880';q.fillRect(0,0,w,h);for(let i=0;i<4200;i++){const v=110+(r()*70|0);q.fillStyle=`rgba(${v},${v-2},${v-8},.5)`;q.fillRect(r()*w,r()*h,1+r()*3,1+r()*3)}for(let i=0;i<40;i++){q.fillStyle=r()<.5?'rgba(150,160,90,.35)':'rgba(200,190,150,.3)';q.beginPath();q.arc(r()*w,r()*h,3+r()*12,0,7);q.fill()}},[1,1]);
 const stoneM=new THREE.MeshStandardMaterial({map:ST,roughness:.9,flatShading:true});
 const rock=(sx,sy,sz,seed)=>{const g=new THREE.IcosahedronGeometry(1,3);const p=g.attributes.position;const a1=seed*1.3,a2=seed*2.1;for(let k=0;k<p.count;k++){let x=p.getX(k),y=p.getY(k),z=p.getZ(k);const f=1+.1*Math.sin(3*x+a1)*Math.sin(3.4*z+a2)+.05*Math.sin(7*y+a1);x*=f*sx;z*=f*sz;y=Math.max(-.55,Math.min(.62,y))*f*sy;p.setXYZ(k,x,y,z)}g.computeVertexNormals();const m=new THREE.Mesh(g,stoneM);m.castShadow=m.receiveShadow=true;return m};
 /* 고인돌 하나: 바둑판식(짧은 받침돌 위 덮개돌) 또는 개석식(땅에 바로) */
 const dolmen=(x,z,L,W,H,kind,ry,seed)=>{const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=ry;const sup=kind==='go'?.5+r()*.3:0;
  if(kind==='go')for(const[a,b]of[[-.3,-.25],[.3,-.25],[-.25,.28],[.28,.25]]){const s=rock(.32,sup*.9,.3,seed+a);s.position.set(a*L,sup*.5,b*W);g.add(s)}
  const c=rock(L/2,H,W/2,seed);c.position.y=sup+H*.55;g.add(c);G.add(g);cam.push(c);const R=Math.max(L,W)/2*.85;solids.push({cx:x,cz:z,r:R,y0:0,y1:sup+H*1.2});return g};
 /* 고인돌 무리(골짜기 따라 흩어짐) */
 const DOL=[];const free=(x,z)=>Math.abs(x+6)>5&&!(x>-30&&x<16&&Math.abs(z-14)<6)&&Math.hypot(x-34,z+30)>10&&Math.hypot(x+48,z+46)>14&&Math.hypot(x-26,z+26)>6;
 for(let i=0;i<46;i++){let x,z,t=0;do{x=-90+r()*170;z=-80+r()*160;t++}while((!free(x,z)||DOL.some(d=>Math.hypot(d[0]-x,d[1]-z)<6))&&t<60);if(t>=60)continue;DOL.push([x,z]);const L=1.6+r()*2.4;dolmen(x,z,L,L*(.55+r()*.3),.5+r()*.6,r()<.55?'go':'flat',r()*3,i+3)}
 /* 핑매바위: 가장 큰 덮개돌(길이 7.3m·너비 5m·높이 4m) */
 {const g=dolmen(34,-30,7.3,5,3.6,'flat',.4,91);g.children[0].position.y=1.9}
 /* 감태바위 채석장: 덮개돌을 떼어 낸 바위 벼랑과 반쯤 떼어 낸 돌 */
 {const cl=rock(12,9,6,7);cl.position.set(-48,3.6,-50);G.add(cl);solids.push({cx:-48,cz:-50,r:10,y0:0,y1:10});
  for(const[x,z,a]of[[-42,-41,.3],[-52,-40,-.2],[-38,-46,.9]]){const s=rock(1.4,.7,1,x);s.position.set(x,.4,z);s.rotation.y=a;G.add(s);solids.push({cx:x,cz:z,r:1.2,y0:0,y1:1})}
  const wm=M(0x8a6a40);for(let i=0;i<5;i++){const w=new THREE.Mesh(new THREE.BoxGeometry(.12,.35,.12),wm);w.position.set(-44.4+i*.6,2.2+(i%2)*.1,-44.6);w.rotation.x=.4;G.add(w)}}
 /* 둘레 언덕(골짜기 느낌) */{const hm=M(0x5f7a3a,{flatShading:true});for(const[x,z,s,h]of[[-120,-40,40,22],[-110,50,36,18],[110,-60,44,24],[100,40,38,20],[0,-130,60,26],[0,130,60,22]]){const m=new THREE.Mesh(new THREE.SphereGeometry(1,16,10,0,Math.PI*2,0,Math.PI/2),hm);m.scale.set(s,h,s*.8);m.position.set(x,0,z);G.add(m)}}
 /* 소나무 */{const tm=M(0x5a4030),lm=M(0x2f5a2c);for(let i=0;i<40;i++){const x=-95+r()*190,z=-90+r()*180;if(!free(x,z)||DOL.some(d=>Math.hypot(d[0]-x,d[1]-z)<4))continue;const t=new THREE.Mesh(new THREE.CylinderGeometry(.22,.36,5,6),tm);t.position.set(x,2.5,z);t.castShadow=true;G.add(t);for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(2.3-k*.6,2.2,7),lm);c.position.set(x,4.4+k*1.2,z);c.castShadow=true;G.add(c)}solids.push({cx:x,cz:z,r:.5,y0:0,y1:8})}}
 /* 덮개돌 옮기기 길: z=14, x=-26 → 받침돌(x=10). 끝 8m는 흙 경사로 */
 const TZ=14,X0=-26,XS=10,RAMP0=2,RAMPH=.75;
 const rampH=x=>x<RAMP0?0:Math.min(RAMPH,(x-RAMP0)/(XS-1-RAMP0)*RAMPH);
 const sups=[];for(const[a,b]of[[-.9,-.6],[.9,-.6],[-.9,.6],[.9,.6]]){const s=rock(.35,RAMPH,.3,a*7+b);s.position.set(XS+a,RAMPH*.5,TZ+b);G.add(s);sups.push(s)}
 const ramp=new THREE.Mesh(new THREE.BoxGeometry(XS+1.6-RAMP0,1,3.4),M(0x8a6a48));{const g=ramp.geometry,p=g.attributes.position;for(let k=0;k<p.count;k++){const x=p.getX(k),y=p.getY(k);const wx=x+(XS+1.6+RAMP0)/2;p.setY(k,y>0?Math.max(.02,rampH(Math.min(wx,XS-1))):0)}g.computeVertexNormals()}ramp.position.set((XS+1.6+RAMP0)/2,0,TZ);ramp.receiveShadow=true;G.add(ramp);
 const CAP=rock(1.35,.75,.95,123);CAP.position.set(X0,.25+.5*.75*1.1,TZ);G.add(CAP);cam.push(CAP);
 const logM=M(0x7a5a38);const LOGS=[];for(const x of[X0-.8,X0+.2,X0+1.2]){const l=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,2.6,10),logM);l.rotation.x=Math.PI/2;l.position.set(x,.18,TZ);l.castShadow=true;G.add(l);LOGS.push({m:l,x,held:false})}
 /* 줄 당기는 마을 사람들 */
 const crew=[];{const bm=M(0xd8c8a8),hm2=M(0xe0b890);for(let i=0;i<6;i++){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.CylinderGeometry(.22,.28,1.1,8),bm);b.position.y=.55;g.add(b);const h=new THREE.Mesh(new THREE.SphereGeometry(.2,10,8),hm2);h.position.y=1.32;g.add(h);g.position.set(X0+4+(i>>1)*1.4,0,TZ+(i%2?.9:-.9));g.rotation.y=-Math.PI/2;G.add(g);crew.push(g)}}
 const ropeM=new THREE.LineBasicMaterial({color:0xc8b080});const ropes=[-1,1].map(s=>{const g=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3()]);const l=new THREE.Line(g,ropeM);G.add(l);return{l,s}});
 const capY=x=>rampH(x)+.36+.75*.62;
 let SX=X0;const placeAll=(t)=>{CAP.position.set(SX,capY(SX),TZ);for(const L of LOGS)if(!L.held)L.m.position.y=rampH(L.x)+.18;for(let i=0;i<crew.length;i++){const c=crew[i];c.position.x=SX+4+(i>>1)*1.4;c.position.y=rampH(c.position.x)+Math.abs(Math.sin(t*4+i))*.05;c.rotation.z=-.15}for(const R of ropes){const p=R.l.geometry.attributes.position;p.setXYZ(0,SX+1.2,capY(SX),TZ+R.s*.5);p.setXYZ(1,SX+7,rampH(SX+7)+1,TZ+R.s*.9);p.needsUpdate=true}};placeAll(0);
 /* 밤 모닥불 */
 const NL=[];if(!mini){for(const[x,z]of[[-12,20],[18,8],[30,-22]]){const f=new THREE.Group();f.position.set(x,0,z);for(let k=0;k<5;k++){const s=new THREE.Mesh(new THREE.DodecahedronGeometry(.22,0),M(0x6a6660));s.position.set(Math.cos(k*1.26)*.55,.1,Math.sin(k*1.26)*.55);f.add(s)}const fl=new THREE.Mesh(new THREE.ConeGeometry(.3,.8,8),new THREE.MeshBasicMaterial({color:0xffa040,transparent:true,opacity:0}));fl.position.y=.45;f.add(fl);const L=new THREE.PointLight(0xff9a50,0,16,1.6);L.position.y=1;f.add(L);G.add(f);NL.push({fl,L})}}
 let nk=0;const nightTick=(dt,t)=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const l of NL){l.L.intensity=nk*(7+Math.sin(t*9)*1.2);l.fl.material.opacity=nk*.9;l.fl.scale.y=1+Math.sin(t*11)*.12}};
 /* 안내 */
 spots.push({x:-2,y:0,z:-20,r:4,t:'화순 고인돌 유적',h:'보검재 골짜기 5km쯤에 청동기 시대 고인돌 590여 기가 모여 있어요. 2000년 고창·강화와 함께 세계유산이 됐어요. 고인돌은 힘 있는 사람의 무덤이었고, 큰 돌을 옮기려면 마을 사람 수백 명이 힘을 모아야 했어요. 간추려 지었어요.'});
 spots.push({x:26,y:0,z:-26,r:3.4,t:'핑매바위',h:'화순에서 가장 큰 덮개돌이에요. 길이 7.3m, 너비 5m, 높이 4m로 200톤이 넘어요. 마고할미가 치마폭에 싸 오다 던졌다는 이야기와, 돌을 던져 위에 얹으면 아들을 낳는다는 이야기가 전해요.'});
 spots.push({x:-38,y:0,z:-40,r:3.4,t:'감태바위 채석장',h:'덮개돌을 떼어 낸 바위 벼랑이에요. 바위 틈에 나무 쐐기를 박고 물을 부으면 나무가 불어나 돌이 갈라졌어요. 떼어 내다 만 돌도 그대로 남아 있어요.'});
 spots.push({x:-22,y:0,z:16.8,r:2.4,t:'덮개돌 옮기는 길',h:'통나무를 깔아 덮개돌을 굴려 옮겨 봐요.'});
 spots.push({x:-20,y:0,z:-6,r:2.4,t:'발굴 탐지 자리',h:'고인돌 아래와 둘레에 청동기 사람들의 물건이 묻혀 있어요. 무이 탐지기로 찾아 봐요.'});
 /* 덮개돌 옮기기(11/21): 마을 사람들이 줄을 당겨요. 돌 뒤로 빠진 통나무를 들어 앞의 초록 고리에 깔아 주면 계속 굴러가요. 150초 */
 window.__HSMOVE=()=>{if(document.getElementById('hsP'))return;const H=window.__H3,ctx=H.ctx();try{H.tp(X0-3,TZ+3,.5);H.face(Math.PI/2)}catch(e){}
  SX=X0;const LX=[X0-.8,X0+.2,X0+1.2];LOGS.forEach((L,i)=>{L.x=LX[i];L.held=false;L.m.position.set(L.x,.18,TZ);L.m.rotation.set(Math.PI/2,0,0)});ramp.visible=true;
  const g=new THREE.Group();G.add(g);const drop=new THREE.Mesh(new THREE.RingGeometry(1.1,1.5,28),new THREE.MeshBasicMaterial({color:0x8ae08a,transparent:true,opacity:.5,depthWrite:false,side:THREE.DoubleSide}));drop.rotation.x=-Math.PI/2;g.add(drop);
  const glow=new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,4,12,1,true),new THREE.MeshBasicMaterial({color:0xffd060,transparent:true,opacity:.22,depthWrite:false,side:THREE.DoubleSide}));g.add(glow);
  const d=document.createElement('div');d.id='hsP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2620;border:3px solid #c8b080;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const TL=150,DIST=XS-X0;let held=null,done=false,stall=0,carries=0,t0=performance.now()/1000,last=t0;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffe0a0">🪨 덮개돌 옮기기</b><div id="hsS" style="font:20px 'Do Hyeon',sans-serif;margin:4px 0">0m / ${DIST}m</div><div id="hsG" style="font-size:13px;color:#ffe0a0">돌 뒤로 빠진 통나무(빛나는 것)를 들어요</div><div id="hsT" style="font-size:13px">${TL}초</div><div style="font-size:12px;opacity:.85">통나무를 돌 앞 초록 고리에 깔면 마을 사람들이 계속 끌어요</div>`;const Sx=d.querySelector('#hsS'),Gd=d.querySelector('#hsG'),T=d.querySelector('#hsT');
  const thud=()=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='triangle';o.frequency.setValueAtTime(140,s);o.frequency.exponentialRampToValueAtTime(60,s+.18);gg.gain.setValueAtTime(.09,s);gg.gain.exponentialRampToValueAtTime(.0001,s+.25);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+.28)}catch(e){}};
  const fin=(ok)=>{if(done)return;done=true;if(held){held.held=false;held=null}LOGS.forEach((L,i)=>{L.x=SX-3.5+i*.55;L.m.position.set(L.x,.18,TZ+2.6);L.m.rotation.set(Math.PI/2,0,0)});const el=performance.now()/1000-t0;const prog=Math.min(1,(SX-X0)/DIST);const Q=ok?Math.max(70,Math.round(100-Math.max(0,el-70)*.4-stall*.3)):Math.round(prog*65);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('hwasun_move',Q,'고인돌 덮개돌 옮기기')}catch(e){}window.__HSQ=Q;
   if(ok){let k=0;const sink=()=>{k+=.02;ramp.scale.y=Math.max(.01,1-k);ramp.position.y=0;CAP.position.y=Math.max(RAMPH+.36+.75*.5,capY(SX));if(k<1)requestAnimationFrame(sink);else ramp.visible=false};sink();try{ctx.say('받침돌 위에 올렸어요! 이제 흙을 걷어 내요.',2.4)}catch(e){}}
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffe0a0">${ok?'고인돌 완성!':Math.round(prog*DIST)+'m 옮겼어요'}</b><div style="font-size:13px;margin:4px 0">청동기 사람들은 통나무를 굴리고 흙으로 경사로를 쌓아 덮개돌을 받침돌 위에 올린 뒤 흙을 걷어 냈다고 여겨져요. 10톤 돌 하나에도 100명 넘게 힘을 모아야 했어요.</div><div style="font-size:26px;color:#c8b080">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8b080;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__HSMOVE(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},ok?1800:700)};
  const loop=()=>{if(!d.isConnected){G.remove(g);if(held){held.held=false;held=null}return}const now=performance.now()/1000,dt=Math.min(.05,now-last);last=now;const P=H.P;
   if(!done){const under=LOGS.some(L=>!L.held&&L.x>SX-.5&&L.x<SX+1.3);if(under){SX=Math.min(XS,SX+.75*dt)}else stall+=dt;
    if(SX>=XS){SX=XS;fin(true)}
    const freeL=LOGS.filter(L=>!L.held&&L.x<SX-1.2);const dx=SX+1.0;drop.position.set(dx,rampH(dx)+.06,TZ);drop.visible=!!held;
    if(!held){const tgt=freeL[0];glow.visible=!!tgt;if(tgt){glow.position.set(tgt.x,rampH(tgt.x)+2,TZ);if(Math.hypot(P.x-tgt.x,P.z-TZ)<1.9){held=tgt;tgt.held=true;thud();carries++;Gd.textContent='돌 앞 초록 고리로 가져가요'}}else Gd.textContent=under?'잘 굴러가요! 뒤로 빠지는 통나무를 기다려요':'통나무가 모자라요!'}
    else{glow.visible=false;held.m.position.set(P.x,P.y+1.6,P.z);held.m.rotation.set(0,0,Math.PI/2);if(Math.hypot(P.x-dx,P.z-TZ)<1.7){held.x=dx;held.held=false;held.m.position.set(dx,rampH(dx)+.18,TZ);held.m.rotation.set(Math.PI/2,0,0);held=null;thud();try{ctx.say('통나무를 깔았어요!',1)}catch(e){}Gd.textContent='다음 통나무를 들어요'}}
    if(!under&&!held&&!freeL.length)Gd.textContent='통나무가 모자라요!';
    Sx.textContent=Math.floor(SX-X0)+'m / '+DIST+'m';const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin(false)}
   if(!done)placeAll(now);requestAnimationFrame(loop)};loop();
  window.__HSG={LOGS,get SX(){return SX},get held(){return held},TZ,XS};try{ctx.say('마을 사람들과 덮개돌을 옮겨요! 돌 뒤로 빠진 통나무를 앞에 다시 깔아 줘요.',3)}catch(e){}};
 /* 발굴 탐지 */
 const mk=(fn)=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'간돌검',h:'돌을 갈아 만든 칼이에요. 고인돌 무덤에 함께 묻은 물건으로, 묻힌 사람의 힘을 보여 줘요.',mk:mk(g=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.7,.03,.1),M(0x5a5a5e,{roughness:.4}));g.add(b);const h=new THREE.Mesh(new THREE.BoxGeometry(.2,.05,.14),M(0x4a4a4e));h.position.x=-.4;g.add(h)})},
  {n:'민무늬 토기',h:'청동기 사람들이 쓴 무늬 없는 토기예요. 바닥이 평평해 세워 두기 좋아요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.2,.13,.38,12),M(0xa8784a));g.add(m)})},
  {n:'반달 돌칼',h:'구멍 두 개에 끈을 꿰어 손에 걸고 벼 이삭을 땄어요. 청동기에 벼농사를 지었다는 증거예요.',mk:mk(g=>{const s=new THREE.Shape();s.moveTo(-.25,0);s.quadraticCurveTo(0,.2,.25,0);s.lineTo(-.25,0);const m=new THREE.Mesh(new THREE.ExtrudeGeometry(s,{depth:.03,bevelEnabled:false}),M(0x6a6660));m.rotation.x=-Math.PI/2;g.add(m)})},
  {n:'가락바퀴',h:'실을 꼬는 가락에 끼우던 돌 바퀴예요. 옷감을 짰다는 걸 알려 줘요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.05,16),M(0x8a7a64));g.add(m)})},
  {n:'대롱옥',h:'푸른 돌을 대롱 모양으로 깎은 구슬이에요. 목걸이로 꿰어 걸었어요.',mk:mk(g=>{for(let i=0;i<3;i++){const m=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,.14,10),M(0x3a8a7a,{roughness:.3}));m.rotation.z=Math.PI/2;m.position.x=(i-1)*.16;g.add(m)}})}];
 window.__HSDIG=()=>{window.__DETECT&&window.__DETECT({key:'hwasun_dig',title:'화순 고인돌 발굴 탐지',emoji:'⛏️',bg:'#26241e',count:4,TL:150,cand:[[-24,-12],[-14,-28],[4,-34],[16,-12],[-30,30],[8,32],[20,24],[-40,8],[44,6],[-16,44]],items:ITEMS,intro:'고인돌 둘레 땅속에 청동기 사람들의 물건이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'고인돌 발굴에서는 간돌검·민무늬 토기·반달 돌칼 같은 청동기 유물이 나와요.'})};
 const meta={quest:{t:'화순 고인돌 둘러보기',d:'청동기 고인돌 골짜기를 둘러보세요.',steps:[['유적','화순 고인돌 유적'],['핑매바위','핑매바위'],['채석장','감태바위 채석장']]},
  title:'화순 고인돌 유적',hint:'청동기 고인돌 590여 기가 모인 골짜기를 공개 수치로 간추려 지었어요. 가장 큰 핑매바위를 보고, 통나무를 깔아 덮개돌을 옮겨 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,sign:{x:2,z:-28,lines:['화순 고인돌 유적','세계유산(2000)','청동기 고인돌 590여 기','간추려 지음']}},
  npc:[['science',[[-12,-24],[-2,-24],[-2,-32],[-12,-32]]]],bounds:[-100,100,-95,95],level:()=>'고인돌 골짜기',camCap:()=>Infinity,baseAt:(x,z)=>{if(Math.abs(z-TZ)<1.7&&x>RAMP0&&x<XS+1.6&&ramp.visible)return rampH(Math.min(x,XS-1));return 0},
  tick:(P,dt)=>{try{nightTick(dt||.016,performance.now()/1000)}catch(e){}},
  mini:{S:1.4,ox:-10,oz:-8,draw(g,X,Z,S){g.fillStyle='#7d8f4a';g.fillRect(0,0,300,300);g.fillStyle='#a8906a';g.fillRect(X(-8),0,4*S,300);g.fillStyle='#8c8880';for(const[x,z]of DOL)g.fillRect(X(x)-2,Z(z)-2,4,4);g.fillRect(X(30),Z(-27),8*S,5*S);g.fillStyle='#6a6660';g.beginPath();g.arc(X(-48),Z(-50),12*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-6,z:-40,yaw:0},size:{}},meta)}
