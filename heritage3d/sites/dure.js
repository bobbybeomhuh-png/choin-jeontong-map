/* 김포 두레 마당(2026-11-22, K2): 김포 통진두레놀이(경기도 무형유산)처럼 마을 사람들이 두레로 함께 농사짓던 들판.
   3D 자료: 한국문화정보원 KCISA 스케치팹 kcisameta CC BY 농기구 일곱(낫·홀태·부뚜·볏섬·볏단·허수아비·노적가리). 한 파일에 같은 것이 셋씩 들어 있어 하나만 떼어 썼고, 크기는 자료 그대로예요(낫 길이 약 52cm, 허수아비 약 1.7m).
   논·초가·두레기(농자천하지대본)는 간추려 지었어요.
   놀이: 가을걷이 줄(벼를 낫으로 베고, 홀태로 훑고, 부뚜로 바람을 일으켜 쭉정이를 날리고, 섬에 담기. 네 자리를 눌러 차례로 넘기는데 벼가 쌓이면 썩어요. 흐름을 막히지 않게 다루기, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildDure(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1984);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.95},o));
 const L=mini?null:new GLTFLoader();const put=(f,x,z,ry=0,cb)=>{if(!L)return;L.load(new URL('../models/dure/'+f,import.meta.url).href,g=>{const o=g.scene;const w=new THREE.Group();w.add(o);w.userData.noBatch=true;w.rotation.y=ry;w.position.set(x,0,z);G.add(w);cb&&cb(w)},undefined,()=>{})};
 /* 논(가을 누런 벼, 간추림) */const PT=tex(256,256,(q,w,h)=>{q.fillStyle='#c8a848';q.fillRect(0,0,w,h);for(let i=0;i<2500;i++){q.fillStyle=['#d8b858','#b89838','#e0c068','#a88830'][i%4];q.fillRect(r()*w,r()*h,2,5)}},[6,4]);
 for(const[x,z,w,d]of[[-18,-18,22,14],[8,-18,22,14],[-18,-36,22,14],[8,-36,22,14]]){const p=new THREE.Mesh(new THREE.BoxGeometry(w,.35,d),new THREE.MeshStandardMaterial({map:PT,roughness:1}));p.position.set(x,.175,z);G.add(p);const db=new THREE.Mesh(new THREE.BoxGeometry(w+.6,.25,d+.6),M(0x8a7a4a));db.position.set(x,.08,z);G.add(db)}
 /* 초가 두 채(간추림) */for(const[x,z]of[[-24,4],[-14,8]]){const h=new THREE.Group();h.position.set(x,0,z);const wl=new THREE.Mesh(new THREE.BoxGeometry(6,2.2,3.6),M(0xe8dcc0));wl.position.y=1.1;h.add(wl);const rf=new THREE.Mesh(new THREE.SphereGeometry(1,16,10,0,Math.PI*2,0,Math.PI/2),M(0xc8a860));rf.scale.set(4,1.6,2.6);rf.position.y=2.2;h.add(rf);G.add(h);solids.push({x0:x-3.1,x1:x+3.1,y0:0,y1:3.8,z0:z-1.9,z1:z+1.9})}
 /* KCISA 자료: 허수아비·노적가리·볏섬·볏단·두레기 */
 put('scarecrow.glb',-6,-18);put('scarecrow.glb',20,-36,1.2);put('haystack.glb',-28,14);put('haystack.glb',-31,10,.8);
 {const fl=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,6,8),M(0x5a3a24));fl.position.set(-4,3,4);G.add(fl);const T=tex(128,256,(q,w,h)=>{q.fillStyle='#f4ecd8';q.fillRect(0,0,w,h);q.strokeStyle='#c8302a';q.lineWidth=8;q.strokeRect(4,4,w-8,h-8);q.fillStyle='#2a2018';q.font='bold 34px serif';q.textAlign='center';['農','者','天','下','之','大','本'].forEach((c,i)=>q.fillText(c,w/2,34+i*33))});const bn=new THREE.Mesh(new THREE.PlaneGeometry(1.1,2.2),new THREE.MeshStandardMaterial({map:T,side:THREE.DoubleSide}));bn.position.set(-3.4,4.6,4);G.add(bn);solids.push({cx:-4,cz:4,r:.2,y0:0,y1:6})}
 /* 가을걷이 줄: 네 자리 */const LX=4,LZ=6;const ST=[{n:'벼 베기',f:'sickle.glb',t:'낫'},{n:'홀태 훑기',f:'thresher.glb',t:'홀태'},{n:'부뚜질',f:'fan.glb',t:'부뚜'},{n:'섬에 담기',f:'sack.glb',t:'볏섬'}];const CXL=LX+3.9,CZL=LZ;const PXY=[[-1.45,1.3],[1.45,1.3],[1.45,-1.5],[-1.45,-1.5]];const SX=i=>CXL+PXY[i][0];const SZ=i=>CZL+PXY[i][1];
 const line=new THREE.Group();line.userData.noBatch=true;G.add(line);{const mat=new THREE.Mesh(new THREE.BoxGeometry(6.4,.06,6),M(0xb89a6a));mat.position.set(CXL,.03,CZL);G.add(mat)}
 const hits=[];ST.forEach((s,i)=>{const T=tex(256,64,(q,w,h)=>{q.fillStyle='#3a2a1a';q.fillRect(0,0,w,h);q.fillStyle='#f4ecd8';q.font='bold 28px sans-serif';q.textAlign='center';q.fillText(`${i+1}. ${s.n}`,w/2,42)});const sg=new THREE.Mesh(new THREE.PlaneGeometry(1.9,.45),new THREE.MeshStandardMaterial({map:T}));sg.rotation.x=-Math.PI/2.6;sg.position.set(SX(i),.3,SZ(i)+1.05);G.add(sg);const hb=new THREE.Mesh(new THREE.BoxGeometry(2.6,1.6,2.6),new THREE.MeshBasicMaterial({visible:false}));hb.position.set(SX(i),.8,SZ(i));hb.userData.i=i;G.add(hb);hits.push(hb);
  const tx=SX(i)+(i===2?0:.55),tz=SZ(i)+(i===2?-.5:-.45);put(s.f,tx,tz,i===2?Math.PI/2:0,w=>{if(i===2){w.scale.setScalar(.55)}})});
 const NL=[];if(!mini){for(const[x,y,z]of[[LX+8,3,LZ+3],[-4,3,6],[-18,3,-10]]){const P=new THREE.PointLight(0xffc080,0,26,1.5);P.position.set(x,y,z);G.add(P);NL.push(P);const lg=new THREE.Group();lg.userData.noBatch=true;const lp=new THREE.Mesh(new THREE.CylinderGeometry(.05,.06,y,6),M(0x3a2a1a));lp.position.y=y/2;lg.add(lp);const lm=new THREE.Mesh(new THREE.SphereGeometry(.34,12,8),new THREE.MeshStandardMaterial({color:0xfff0d0,emissive:0xffc060,emissiveIntensity:0}));lm.position.y=y+.1;lg.add(lm);lg.position.set(x+1.9,0,z);G.add(lg);P.userData.lm=lm}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(P=>{P.intensity=nk*60;if(P.userData.lm)P.userData.lm.material.emissiveIntensity=nk*8})};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(-4,7,2,'두레기','「농자천하지대본」은 농사가 세상의 큰 근본이라는 뜻이에요. 두레 때 앞세우던 깃발을 간추려 지었어요.');
 sp(-6,-9,2.4,'가을 들판','누렇게 익은 논과 허수아비예요. 허수아비·노적가리는 한국문화정보원 3D 자료(크기 그대로)예요.');
 sp(CXL-4.6,CZL+3.6,2.2,'가을걷이 마당','낫·홀태·부뚜·볏섬으로 벼를 거둬 봐요. 농기구는 한국문화정보원 3D 자료예요.');
 sp(20,16,2.4,'발굴 탐지 자리','논둑 흙 속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 가을걷이 줄(11/22): 자리 i에 벼가 있으면 누를 때 처리(0.5초) 뒤 다음 자리로 */
 const mkItem=st=>{const g=new THREE.Group();if(st===0){for(let k=0;k<9;k++){const s=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,1,4),M(0xc8a848));s.position.set((k%3-1)*.12,.5,(Math.floor(k/3)-1)*.12);g.add(s);const e=new THREE.Mesh(new THREE.SphereGeometry(.05,6,4),M(0xd8b040));e.scale.y=2;e.position.set(s.position.x,1.02,s.position.z);g.add(e)}}else if(st===1){const b=new THREE.Mesh(new THREE.CylinderGeometry(.18,.22,.9,10),M(0xc8a848));b.rotation.z=Math.PI/2;b.position.y=.2;g.add(b)}else if(st===2){const c=new THREE.Mesh(new THREE.ConeGeometry(.35,.3,14),M(0xb8984a));c.position.y=.15;g.add(c);const sw=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.5,4),M(0xd8c070));sw.rotation.z=1.2;sw.position.set(.3,.1,0);g.add(sw)}else{const c=new THREE.Mesh(new THREE.ConeGeometry(.32,.26,14),M(0xe8d080));c.position.y=.13;g.add(c)}return g};
 window.__DRHARV=()=>{if(document.getElementById('drP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(CXL-5,CZL+4,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('drP')?[CXL,7.4,CZL+6.2,CXL,.3,CZL-.2,50]:null;
  const RD=[{iv:2.8,T:28},{iv:2.2,T:28},{iv:1.7,T:28}];let rd=0,t=0,nextIn=0,slot=[null,null,null,null],busy=[0,0,0,0],queue=0,doneN=0,lost=0,phase='play',wait=0,auto=false,done=false,msg='',last=performance.now(),at=0,sacks=[];const res=[];
  const d=document.createElement('div');d.id='drP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#2a2418;border:3px solid #d8b040;border-radius:16px;padding:9px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f8ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:310px;max-width:94vw;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🌾 가을걷이 줄</b><div data-i style="margin:3px 0;font:14px 'Do Hyeon',sans-serif"></div><div style="font-size:11.5px;color:#e8dcc8">벼가 있는 자리를 눌러 1→2→3→4로 넘겨요. 쌓이면 썩어요</div><div data-m style="font-size:12px;color:#f8e8a0;margin-top:4px"></div>`;
  const iEl=d.querySelector('[data-i]'),mEl=d.querySelector('[data-m]');
  const snd=(f,len,type='sine',v=.05)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);g.gain.setValueAtTime(v,s);g.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(g).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const qPile=new THREE.Group();line.add(qPile);
  const setSlot=(i,st)=>{if(slot[i]){line.remove(slot[i].m)}slot[i]=st==null?null:{st,m:mkItem(st)};if(slot[i]){slot[i].m.position.set(SX(i)-.45,.06,SZ(i)+.3);line.add(slot[i].m)}};
  const drawQ=()=>{while(qPile.children.length)qPile.remove(qPile.children[0]);for(let k=0;k<queue;k++){const m=mkItem(0);m.scale.setScalar(.7);m.position.set(SX(0)-1.5-k*.45,.06,SZ(0)+.3);qPile.add(m)}};
  const press=i=>{if(phase!=='play'||!slot[i]||busy[i]>0)return;if(i<3&&slot[i+1]){msg=`다음 자리(${ST[i+1].n})가 아직 차 있어요`;snd(260,.1,'square',.03);return}busy[i]=.5;snd(300+i*120,.12,'triangle',.05)};
  const finishStep=i=>{if(i<3){setSlot(i+1,i+1);setSlot(i,null)}else{setSlot(i,null);doneN++;const s=new THREE.Mesh(new THREE.CylinderGeometry(.28,.3,.6,10),M(0xc8a860));s.rotation.z=Math.PI/2;s.position.set(SX(3)-1.6-(sacks.length%4)*.62,.3+Math.floor(sacks.length/4)*.55,SZ(3));line.add(s);sacks.push(s);msg=`볏섬 ${doneN}개!`}if(i===0&&queue>0&&!slot[0]){queue--;setSlot(0,0);drawQ()}};
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.1,100);const rc=new THREE.Raycaster();const ov=document.createElement('div');ov.id='drO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  ov.onpointerdown=e=>{const C=window.__GCAM();if(!C)return;pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(hits,false)[0];if(h)press(h.object.userData.i)};
  const clearAll=()=>{for(let i=0;i<4;i++)setSlot(i,null);queue=0;drawQ();sacks.forEach(s=>line.remove(s));sacks=[]};
  const newRound=()=>{clearAll();t=0;nextIn=.3;busy=[0,0,0,0];doneN=0;lost=0;phase='play';msg=`${rd+1}판: 벼가 ${['천천히','조금 빨리','빨리'][rd]} 들어와요`};
  const cleanup=()=>{ov.remove();clearAll();G.remove(line);G.add(line)};
  newRound();
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(phase==='play'){t+=dt;nextIn-=dt;if(nextIn<=0&&t<RD[rd].T-3){nextIn=RD[rd].iv;if(!slot[0])setSlot(0,0);else{queue++;if(queue>3){queue--;lost++;msg='벼가 쌓여 한 단이 썩었어요!';snd(160,.3,'sawtooth',.05)}drawQ()}}
    for(let i=3;i>=0;i--){if(busy[i]>0){busy[i]-=dt;if(slot[i])slot[i].m.rotation.y+=dt*12;if(busy[i]<=0){busy[i]=0;finishStep(i)}}}
    if(auto){at+=dt;if(at>.2){at=0;for(let i=3;i>=0;i--){if(slot[i]&&!busy[i]&&(i===3||!slot[i+1])){press(i);break}}}}
    if(t>=RD[rd].T){const tot=doneN+lost+queue+slot.filter(Boolean).length;const sc=tot?Math.max(0,doneN/tot):0;res.push(sc);msg=`이번 판 볏섬 ${doneN}개, 썩은 벼 ${lost}단`;snd(sc>.8?820:380,.3);phase='wait';wait=2.4}}
   if(phase==='wait'){wait-=dt;if(wait<=0){rd++;if(rd>=3){fin();return}newRound()}}
   iEl.textContent=`${Math.min(rd+1,3)} / 3판 · 남은 시간 ${Math.max(0,Math.ceil(RD[Math.min(rd,2)].T-t))}초 · 볏섬 ${doneN} · 기다리는 벼 ${queue}`;mEl.textContent=msg;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('dure_harvest',Q,'가을걷이 줄')}catch(e){}window.__DRQ=Q;snd(660,.4);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">가을걷이를 마쳤어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">낫으로 벤 벼를 홀태 빗살에 걸어 낟알을 훑고, 부뚜로 바람을 일으켜 쭉정이와 먼지를 날린 뒤 섬에 담았어요. 일이 한 곳에서 막히면 모두 멈추니, 두레꾼들은 손을 나눠 줄이 막히지 않게 했어요.</div><div style="font-size:24px;color:#d8b040">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#d8b040;color:#2a2418;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f8ecd8;border:2px solid #f8ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__DRHARV()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__DRG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('줄이 막히지 않게!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'호미 날',h:'김매기에 쓰던 호미 날이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.14,.02,.1),M(0x4a3a30,{metalness:.6})))})},
  {n:'볍씨',h:'옛 볍씨 알갱이예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.03,8,6),M(0xc8a848)))})},
  {n:'짚신 조각',h:'짚으로 엮은 짚신 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.08),M(0xc8a860)))})},
  {n:'옹기 조각',h:'물이나 새참을 담던 옹기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.1,.08,12,1,true,0,2),M(0x6a4a30)))})},
  {n:'쇠 보습 조각',h:'쟁기 끝에 달던 쇠 보습 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.ConeGeometry(.08,.16,3),M(0x4a3a30,{metalness:.6})))})}];
 window.__DRDIG=()=>{window.__DETECT&&window.__DETECT({key:'dure_dig',title:'두레 들판 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[20,16],[28,4],[-20,18],[-30,-4],[24,-12],[-30,-26],[10,20],[-8,22]],items:ITEMS,intro:'논둑 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'두레는 마을이 함께 농사짓던 힘이었어요.'})};
 const meta={quest:{t:'두레 들판 둘러보기',d:'두레기와 가을 들판, 가을걷이 마당을 둘러보세요.',steps:[['두레기','두레기'],['들판','가을 들판'],['가을걷이','가을걷이 마당']]},
  title:'김포 두레 들판',hint:'농기구·허수아비·노적가리는 한국문화정보원 3D 자료(크기 그대로), 논과 초가는 간추려 지었어요.',
  ibl:true,env:{plaza:null,beds:false,trees:true,treeAvoid:(x,z)=>Math.abs(x)<36&&z>-46&&z<24,noHills:false,sign:{x:-8,z:16,lines:['김포 두레 들판','농기구(KCISA 자료)','가을걷이 마당','간추려 지음']}},
  npc:[['science',[[-12,12],[-4,12],[-4,18],[-12,18]]]],bounds:[-40,40,-46,32],level:()=>'김포',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2,ox:0,oz:-8,draw(g,X,Z,S){g.fillStyle='#9ab070';g.fillRect(0,0,300,300);g.fillStyle='#c8a848';for(const[x,z,w,d]of[[-18,-18,22,14],[8,-18,22,14],[-18,-36,22,14],[8,-36,22,14]])g.fillRect(X(x-w/2),Z(z-d/2),w*S,d*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:22,yaw:Math.PI},size:{}},meta)}
