/* 창녕 마당(2026-11-22, W75): 우포늪(따오기 복원)·전망대, 교동과 송현동 고분군, 진흥왕 척경비.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음.
   우포늪(천연보호구역·람사르 습지): 우리나라에서 가장 큰 자연 내륙 습지. 사라졌던 따오기를 이곳에서 복원해 2019년부터 자연으로 내보내고 있어요.
   따오기(천연기념물): 흰 몸에 날개 안쪽이 연한 주홍빛, 얼굴이 붉고 부리가 길게 아래로 휘어요. 백로는 온몸이 희고 목이 길며 부리가 곧아요.
   교동과 송현동 고분군(사적): 비화가야 지배층 무덤들.
   놀이: 따오기 세기(우포늪 위로 날아가는 새 가운데 따오기만 세기. 백로·왜가리가 섞여 날아요, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildChangnyeong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(2019);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x88a450,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 우포늪: 넓은 물 + 물풀(마름·생이가래) + 왕버들 */const UX=20,UZ=-36;{const wt=new THREE.Mesh(new THREE.CircleGeometry(30,48),M(0x5a7a6a,{roughness:.25,metalness:.05}));wt.scale.set(1.4,1,.8);wt.rotation.x=-Math.PI/2;wt.position.set(UX,.04,UZ);G.add(wt);solids.push({cx:UX,cz:UZ,r:23,y0:-1,y1:3});
  const PL=new THREE.InstancedMesh(new THREE.CircleGeometry(.5,6),M(0x6a9a3a,{side:THREE.DoubleSide}),500);const o=new THREE.Object3D();let k=0;for(let i=0;i<500;i++){const a=r()*6.28,d=Math.sqrt(r())*28;const x=UX+Math.cos(a)*d*1.4,z=UZ+Math.sin(a)*d*.8;o.position.set(x,.07,z);o.rotation.set(-Math.PI/2,0,r()*3);o.scale.setScalar(.6+r()*1.2);o.updateMatrix();PL.setMatrixAt(k++,o.matrix)}G.add(PL);
  const TR=M(0x5a4a34),LF=M(0x5a8a3a);for(let i=0;i<14;i++){const a=r()*6.28;const x=UX+Math.cos(a)*(31+r()*4)*1.4,z=UZ+Math.sin(a)*(31+r()*4)*.8;if(z>UZ+20)continue;const h=3+r()*2;const t=new THREE.Mesh(new THREE.CylinderGeometry(.25,.4,h,6),TR);t.position.set(x,h/2,z);t.rotation.z=(r()-.5)*.5;G.add(t);const c=new THREE.Mesh(new THREE.SphereGeometry(2.2,8,6),LF);c.scale.y=.7;c.position.set(x,h+.8,z);G.add(c);solids.push({cx:x,cz:z,r:.5,y0:0,y1:h})}}
 /* 전망대(나무 데크) */const OX=UX,OZ=UZ+26;{const W=M(0x8a6a44);const dk=new THREE.Mesh(new THREE.BoxGeometry(6,.2,3),W);dk.position.set(OX,2.4,OZ);G.add(dk);for(const[x,z]of[[-2.8,-1.3],[2.8,-1.3],[2.8,1.3],[-2.8,1.3]]){const p=new THREE.Mesh(new THREE.BoxGeometry(.2,2.4,.2),W);p.position.set(OX+x,1.2,OZ+z);G.add(p)}const rl=new THREE.Mesh(new THREE.BoxGeometry(6,.08,.08),W);rl.position.set(OX,3.3,OZ-1.45);G.add(rl);for(let k=0;k<8;k++){const st=new THREE.Mesh(new THREE.BoxGeometry(1.2,.12,.4),W);st.position.set(OX+3.6,.2+k*.3,OZ+1.2+(7-k)*.35);G.add(st)}solids.push({x0:OX-3,x1:OX+3,y0:2.3,y1:2.5,z0:OZ-1.5,z1:OZ+1.5})}
 /* 교동·송현동 고분군 */const KX=-38,KZ=-10;{const GM=M(0x7a9a48);for(const[x,z,rr]of[[0,0,7],[13,-4,5],[-11,6,5.5],[6,12,4],[-16,-8,4.5],[16,9,3.5]]){const m=new THREE.Mesh(new THREE.SphereGeometry(rr,24,12,0,Math.PI*2,0,Math.PI/2),GM);m.scale.y=.45;m.position.set(KX+x,0,KZ+z);G.add(m);solids.push({cx:KX+x,cz:KZ+z,r:rr*.95,y0:0,y1:rr*.45})}}
 /* 진흥왕 척경비 */{const st=new THREE.Mesh(new THREE.BoxGeometry(1.6,1.8,.35),M(0x9a948a,{flatShading:true}));st.position.set(-14,.9,8);st.rotation.y=.2;G.add(st);solids.push({cx:-14,cz:8,r:1,y0:0,y1:1.8})}
 /* 새 모양 셋 */const mkBird=kind=>{const g=new THREE.Group();const W=M(kind==='ibis'?0xf4ece8:kind==='egret'?0xfafafa:0x9aa0a8);const body=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),W);body.scale.set(1.8,.8,.8);g.add(body);
  const neckL=kind==='ibis'?.25:.45;const nk=new THREE.Mesh(new THREE.CylinderGeometry(.05,.06,neckL,6),W);nk.rotation.z=-Math.PI/2+.15;nk.position.set(.38+neckL/2,.04,0);g.add(nk);const hx=.4+neckL;const hd=new THREE.Mesh(new THREE.SphereGeometry(.09,8,6),kind==='ibis'?M(0xd8382a):W);hd.position.set(hx,.06,0);g.add(hd);
  const bill=new THREE.Mesh(new THREE.CylinderGeometry(.012,.03,kind==='ibis'?.38:.28,6),M(kind==='ibis'?0x1a1a1a:kind==='egret'?0xe8c030:0xc8a040));if(kind==='ibis'){bill.rotation.z=-Math.PI/2-.55;bill.position.set(hx+.15,-.06,0)}else{bill.rotation.z=-Math.PI/2;bill.position.set(hx+.2,.06,0)}g.add(bill);
  const wingM=kind==='ibis'?new THREE.MeshStandardMaterial({color:0xf8c8a8,side:THREE.DoubleSide,roughness:.9}):new THREE.MeshStandardMaterial({color:kind==='egret'?0xfafafa:0x8a909a,side:THREE.DoubleSide,roughness:.9});const wg=new THREE.PlaneGeometry(.5,1.1);wg.translate(0,.55,0);const wl=new THREE.Group(),wr=new THREE.Group();const ml=new THREE.Mesh(wg,wingM);ml.rotation.x=-Math.PI/2;wl.add(ml);const mr=new THREE.Mesh(wg,wingM);mr.rotation.x=Math.PI/2;wr.add(mr);g.add(wl,wr);g.userData={wl,wr};
  const legs=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,kind==='ibis'?.35:.6,4),M(kind==='ibis'?0xd8584a:0x2a2a2a));legs.rotation.z=Math.PI/2;legs.position.set(-.45-(kind==='ibis'?.17:.3),0,0);g.add(legs);return g};
 const flock=new THREE.Group();G.add(flock);
 const NL=[];if(!mini){for(const[x,y,z]of[[OX,4,OZ+3],[KX,3,KZ+12]]){const L=new THREE.PointLight(0xffc080,0,26,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8)};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(UX-10,UZ+28,3,'창녕 우포늪','우리나라에서 가장 큰 자연 내륙 습지예요(람사르 습지). 사라졌던 따오기를 이곳에서 되살려 2019년부터 자연으로 내보내고 있어요. 간추려 지었어요.');
 sp(OX+4.4,OZ+4.4,2,'따오기 세는 전망대','우포늪 위를 나는 새 가운데 따오기만 세어 봐요.');
 sp(KX,KZ+12,3,'교동과 송현동 고분군','비화가야 지배층의 무덤들이에요(사적). 간추려 지었어요.');
 sp(-14,10.5,2,'진흥왕 척경비','신라 진흥왕이 이 땅을 다스리게 된 뒤 세운 비석이에요(국보). 간추려 지었어요.');
 sp(-60,30,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 따오기 세기(11/22): 세 판. 새들이 늪 위를 가로질러 날아가요. 따오기를 볼 때마다 「+1」. 다 날아가면 센 수를 맞춰요 */
 window.__CNIBIS=()=>{if(document.getElementById('cnP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(OX+4.4,OZ+4.4,0)}catch(e){}
  const CAM=[OX,4.3,OZ+.2,OX,7.5,UZ,60];window.__GCAM=()=>document.getElementById('cnP')?CAM:null;
  let rd=0,birds=[],cnt=0,truth=0,done=false,auto=false,last=performance.now(),msg='',phase='fly',t=0,wait=0;const res=[];const seen=new Set();
  const newRound=()=>{flock.clear();birds=[];cnt=0;t=0;phase='fly';seen.clear();const nI=4+rd*2+Math.floor(Math.random()*3),nO=4+rd*3;truth=nI;const kinds=[];for(let i=0;i<nI;i++)kinds.push('ibis');for(let i=0;i<nO;i++)kinds.push(Math.random()<.6?'egret':'heron');kinds.sort(()=>Math.random()-.5);
   kinds.forEach((k,i)=>{const b=mkBird(k);const dir=Math.random()<.5?1:-1;const y=5.5+Math.random()*6,z=UZ+10-Math.random()*12;const sp=3.2+Math.random()*1.6+rd*.6;const t0=i*(1.3-rd*.25)+Math.random()*.6;b.userData={...b.userData,k,dir,y,z,sp,t0,x0:OX-dir*26,id:i};b.visible=false;b.scale.setScalar(1.7);flock.add(b);birds.push(b)});msg=`${rd+1}판: 따오기만 세어요(백로·왜가리는 빼요)`};
  const d=document.createElement('div');d.id='cnP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#1a2a24;border:3px solid #f8b8a0;border-radius:16px;padding:10px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f4f0ec;box-shadow:0 6px 18px rgba(0,0,0,.35);width:300px;max-width:94vw;user-select:none;touch-action:manipulation";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🪶 따오기 세기</b><div data-i style="margin:3px 0;font:14px 'Do Hyeon',sans-serif"></div><div style="font-size:12px;color:#e8d8d0">따오기: 붉은 얼굴, 아래로 휜 검은 부리, 날개 안쪽 연한 주홍빛 · 백로: 온통 흰빛, 곧은 노란 부리 · 왜가리: 잿빛</div><div style="display:flex;gap:6px;margin-top:7px"><button data-n style="flex:1;font:18px 'Do Hyeon',sans-serif;background:#4a5a54;color:#fff;border:0;border-radius:12px;padding:11px 0;cursor:pointer">−1</button><button data-p style="flex:2;font:20px 'Do Hyeon',sans-serif;background:#f8b8a0;color:#1a2a24;border:0;border-radius:12px;padding:11px 0;cursor:pointer">따오기 +1</button></div><div data-m style="font-size:12px;color:#f8e8a0;margin-top:5px"></div>`;
  const iEl=d.querySelector('[data-i]'),mEl=d.querySelector('[data-m]');
  const snd=(f,len,type='sine',v=.05)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(v,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const inc=v=>{if(done||phase!=='fly')return;cnt=Math.max(0,cnt+v);snd(v>0?700:400,.06,'triangle',.04)};
  d.querySelector('[data-p]').onclick=()=>inc(1);d.querySelector('[data-n]').onclick=()=>inc(-1);const kd=e=>{if(e.code==='Space'||e.code==='ArrowUp'){e.preventDefault();inc(1)}if(e.code==='ArrowDown'||e.code==='Backspace')inc(-1)};addEventListener('keydown',kd);
  const cleanup=()=>{removeEventListener('keydown',kd);flock.clear()};
  newRound();
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;
   if(phase==='fly'){let alive=false;for(const b of birds){const u=b.userData;const tt=t-u.t0;if(tt<0){alive=true;continue}const x=u.x0+u.dir*u.sp*tt;if(Math.abs(x-OX)>28&&tt>1){b.visible=false;continue}alive=true;b.visible=true;b.position.set(x,u.y+Math.sin(tt*1.3+u.id)*.4,u.z);b.rotation.y=u.dir>0?0:Math.PI;const f=Math.sin(tt*(u.k==='ibis'?9:6))*.7;u.wl.rotation.x=f;u.wr.rotation.x=-f;
     if(auto&&u.k==='ibis'&&!seen.has(u.id)&&Math.abs(x-OX)<10){seen.add(u.id);inc(1)}}
    if(!alive){phase='wait';const e=Math.abs(cnt-truth);const sc=Math.max(0,1-e/truth*1.5);res.push(sc);msg=e===0?`딱 맞아요! 따오기 ${truth}마리`:`따오기는 ${truth}마리였어요. 센 수 ${cnt}`;snd(e===0?780:330,.35);wait=2.2}}
   if(phase==='wait'){wait-=dt;if(wait<=0){rd++;if(rd>=3){fin();return}newRound()}}
   iEl.textContent=`${Math.min(rd+1,3)} / 3판 · 센 따오기 ${cnt}마리`;mEl.textContent=msg;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('changnyeong_ibis',Q,'따오기 세기')}catch(e){}window.__CNQ=Q;snd(660,.4);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">따오기를 다 셌어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">따오기는 우리나라에서 1979년 뒤로 자취를 감췄어요. 2008년 중국에서 따오기 한 쌍을 들여와 우포늪 곁에서 길러 수를 늘렸고, 2019년부터 자연으로 내보내고 있어요. 내보낸 뒤에도 사람들이 꾸준히 세고 지켜봐요.</div><div style="font-size:24px;color:#f8b8a0">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#f8b8a0;color:#1a2a24;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4f0ec;border:2px solid #f4f0ec;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__CNIBIS()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__CNG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('따오기만 세어요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'굽다리 접시',h:'비화가야 굽다리 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.06,.12,14),M(0x5a5a5a)))})},
  {n:'금동관 조각',h:'고분에서 나올 법한 금동관 세움 장식 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.04,.2,.01),M(0xc8a040,{metalness:.8,roughness:.3})))})},
  {n:'따오기 깃털',h:'날개 안쪽이 연한 주홍빛인 따오기 깃털이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.PlaneGeometry(.04,.18),new THREE.MeshStandardMaterial({color:0xf8c8a8,side:THREE.DoubleSide})))})},
  {n:'쇠손칼',h:'작은 쇠칼이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.16,.01,.03),M(0x4a3a30,{metalness:.6})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__CNDIG=()=>{window.__DETECT&&window.__DETECT({key:'changnyeong_dig',title:'창녕 발굴 탐지',emoji:'⛏️',bg:'#1a2a24',count:4,TL:150,cand:[[-60,30],[-20,30],[20,30],[60,10],[-70,-30],[60,30],[-10,-40],[40,10]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'창녕은 늪과 따오기, 비화가야의 고장이에요.'})};
 const meta={quest:{t:'창녕 둘러보기',d:'우포늪과 고분군, 척경비를 둘러보세요.',steps:[['우포늪','창녕 우포늪'],['고분군','교동과 송현동 고분군'],['척경비','진흥왕 척경비']]},
  title:'창녕 우포늪·따오기·비화가야',hint:'우포늪·고분군·척경비를 공개 사진으로 간추려 지었어요. 늪 위를 나는 새 가운데 따오기만 세어 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:14,lines:['창녕','우포늪 · 따오기','교동 고분군 · 척경비','간추려 지음']}},
  npc:[['science',[[-8,6],[6,6],[6,20],[-8,20]]]],bounds:[-90,80,-80,60],level:()=>'창녕',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#88a450';g.fillRect(0,0,300,300);g.fillStyle='#5a7a6a';g.beginPath();g.ellipse(X(UX),Z(UZ),42*S,24*S,0,0,7);g.fill();g.fillStyle='#7a9a48';g.beginPath();g.arc(X(KX),Z(KZ),8*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:16,yaw:Math.PI},size:{}},meta)}
