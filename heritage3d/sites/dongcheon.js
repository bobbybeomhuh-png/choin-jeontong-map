/* 완도 보길도 동천석실 마당(2026-11-22, K15): 스케치팹 lacomi1975가 사진 측량한 보길도 윤선도 원림 동천석실(명승, CC BY 4.0).
   자료 단위가 커서(폭 1000) 바위 위 한 칸 정자 지붕(약 3.5m)으로 0.0425배 줄여 폭 약 42m로 맞춤(크기 어림). 땅은 높이 지도, 나무·바위 솟은 것만 벽.
   동천석실: 윤선도가 낙서재 맞은편 산 중턱 바위 위에 지은 한 칸 집과 돌문·석담·석천. 신선이 사는 곳(동천)이라 이름 붙이고 차를 마시며 글을 지었어요.
   놀이: 도르래로 찬합 올리기(용두암에 도르래를 걸어 아래에서 음식을 올렸다는 이야기, 전해 오는 이야기. 왼손·오른손을 번갈아 고르게 당기면 찬합이 흔들림 없이 오르고, 박자가 흐트러지면 흔들려 쏟아짐, 새 방식), 발굴 탐지, 밤 등불. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
export function buildDongcheon(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 let HG=null;const hAt=(x,z)=>{if(!HG)return 3;const fx=(x-HG.x0)/HG.step,fz=(HG.z0-z)/HG.step;const i=Math.max(0,Math.min(HG.nx-2,Math.floor(fx))),j=Math.max(0,Math.min(HG.nz-2,Math.floor(fz)));const u=Math.max(0,Math.min(1,fx-i)),v=Math.max(0,Math.min(1,fz-j));const H=HG.h;const a=H[j][i],b=H[j][i+1],c=H[j+1][i],d=H[j+1][i+1];if(a==null||b==null||c==null||d==null)return (a??b??c??d??0);return (a*(1-u)+b*u)*(1-v)+(c*(1-u)+d*u)*v};
 if(!mini){fetch(new URL('../models/dongcheon/height.json',import.meta.url).href).then(r=>r.json()).then(j=>{HG=j}).catch(e=>console.warn('높이 못 불러옴',e));
  fetch(new URL('../models/dongcheon/obst.json',import.meta.url).href).then(r=>r.json()).then(j=>{for(const[x0,x1,z0,z1,h]of j.obst||[])solids.push({x0,x1,y0:-40,y1:h,z0,z1})}).catch(e=>console.warn('벽 못 불러옴',e));
  const gl=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(dr);
  gl.load(new URL('../models/dongcheon/dongcheon.glb',import.meta.url).href,g=>{const o=g.scene;o.userData.noBatch=true;o.traverse(e=>{if(e.isMesh){e.castShadow=false;e.receiveShadow=true;if(e.material){e.material.roughness=.95;e.material.metalness=0;e.material.envMapIntensity=.55;e.material.transparent=false;e.material.alphaTest=0;e.material.alphaHash=false;e.material.side=THREE.DoubleSide}cam.push(e)}});G.add(o)},undefined,e=>console.warn('모델 못 불러옴','dongcheon',e))}
 {const gr=new THREE.Mesh(new THREE.PlaneGeometry(400,400),new THREE.MeshStandardMaterial({color:0x3f5a34,roughness:1}));gr.rotation.x=-Math.PI/2;gr.position.y=-1.5;G.add(gr)}
 const SRC='(3D: lacomi1975, Sketchfab, CC BY 4.0)';
 const AX=-1.9,AZ=-4.5,BX=8.2,BZ=4.5,LX=4,LZ=14;
 spots.push({x:AX+2,y:0,z:AZ+3,r:3,t:'동천석실',h:'윤선도가 보길도 낙서재 맞은편 산 중턱 바위 위에 지은 한 칸 집이에요(명승 보길도 윤선도 원림). 신선이 사는 곳이라 동천석실이라 부르고, 여기서 차를 마시고 시를 지었어요. 사진 측량, 크기는 어림했어요. '+SRC});
 spots.push({x:BX-1,y:0,z:BZ+3,r:3,t:'석담과 돌계단',h:'바위 사이에 돌로 쌓은 작은 못(석담)과 돌계단, 돌문이 이어져요. 자연 바위를 그대로 살려 정원으로 꾸몄어요. '+SRC});
 spots.push({x:LX,y:0,z:LZ,r:2.6,t:'도르래 자리',h:'아래에서 바위 위 동천석실까지 도르래로 찬합을 올렸다는 이야기가 전해요. 직접 당겨 봐요.'});
 spots.push({x:-10,y:0,z:10,r:2.4,t:'발굴 탐지 자리',h:'동천석실 둘레 흙 속에 옛 흔적이 남아 있대요.'});
 /* 밤 등불 */const NL=[];if(!mini){for(const[x,z]of[[AX+2,AZ+3],[BX-1,BZ+3],[LX,LZ]]){const P=new THREE.PointLight(0xffc080,0,18,1.5);G.add(P);const lg=new THREE.Group();lg.userData.noBatch=true;const lp=new THREE.Mesh(new THREE.CylinderGeometry(.04,.05,2.2,6),M(0x3a2a1a));lp.position.y=1.1;lg.add(lp);const lm=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),new THREE.MeshStandardMaterial({color:0xfff0d0,emissive:0xffc060,emissiveIntensity:0}));lm.position.y=2.3;lg.add(lm);G.add(lg);NL.push({P,lg,lm,x:x+1.4,z})}}
 let nk=0,placed=false;const nightTick=dt=>{if(!placed&&HG){placed=true;NL.forEach(o=>{const y=hAt(o.x,o.z);o.lg.position.set(o.x,y,o.z);o.P.position.set(o.x,y+2.6,o.z)})}const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(o=>{o.P.intensity=nk*40;o.lm.material.emissiveIntensity=nk*8})};
 /* 놀이: 도르래로 찬합 올리기 */
 window.__DCPULL=()=>{if(document.getElementById('dcP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(LX+1.2,LZ+1.2,Math.PI)}catch(e){}
  const P0=new THREE.Vector3(LX,hAt(LX,LZ)+1.2,LZ),P1=new THREE.Vector3(AX+1,hAt(AX+1,AZ+1)+2.2,AZ+1);const L=P0.distanceTo(P1);
  window.__GCAM=()=>{if(!document.getElementById('dcP'))return null;const m=P0.clone().lerp(P1,.5);return [m.x+11,m.y+5,m.z+9,m.x,m.y,m.z,55]};
  const grp=new THREE.Group();grp.userData.noBatch=true;G.add(grp);const rope=new THREE.Line(new THREE.BufferGeometry().setFromPoints([P0,P1]),new THREE.LineBasicMaterial({color:0xd8c090}));grp.add(rope);
  const wheel=new THREE.Mesh(new THREE.TorusGeometry(.3,.05,8,20),M(0x6a4a2a));wheel.position.copy(P1);wheel.lookAt(P0);grp.add(wheel);
  const bx=new THREE.Group();const box=new THREE.Mesh(new THREE.BoxGeometry(.5,.4,.4),M(0x7a2a1a,{roughness:.5}));bx.add(box);const lid=new THREE.Mesh(new THREE.BoxGeometry(.54,.08,.44),M(0x3a1a10));lid.position.y=.24;bx.add(lid);const hang=new THREE.Mesh(new THREE.CylinderGeometry(.01,.01,.6,4),M(0xd8c090));hang.position.y=.55;bx.add(hang);grp.add(bx);
  const RD=[{n:'차 주전자',k:1},{n:'국 찬합',k:1.4},{n:'떡 찬합(무거움)',k:1.8}];let rd=0,prog=0,sw=0,swv=0,lastHand=0,lastT=0,iv=[],spill=0,t=0,phase='pull',wait=0,auto=false,done=false,msg='',last=performance.now(),at=0;const res=[];
  const d=document.createElement('div');d.id='dcP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#1e2a22;border:3px solid #9ac090;border-radius:16px;padding:9px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#eef4ea;box-shadow:0 6px 18px rgba(0,0,0,.35);width:310px;max-width:94vw;user-select:none;touch-action:none";document.body.appendChild(d);
  const bs="font:16px 'Do Hyeon',sans-serif;border:0;border-radius:10px;padding:14px 0;cursor:pointer;flex:1;color:#1e2a22;background:#9ac090;touch-action:none";
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🪢 도르래로 찬합 올리기</b><div data-i style="margin:3px 0;font:14px 'Do Hyeon',sans-serif"></div><div style="display:flex;gap:6px;align-items:center;font-size:12px"><span style="width:34px">높이</span><div style="flex:1;height:10px;background:#0006;border-radius:5px;overflow:hidden"><div data-p style="height:100%;width:0;background:#e8d090"></div></div></div><div style="display:flex;gap:6px;align-items:center;font-size:12px;margin-top:3px"><span style="width:34px">흔들</span><div style="flex:1;height:10px;background:#0006;border-radius:5px;overflow:hidden;position:relative"><div style="position:absolute;left:70%;right:0;top:0;bottom:0;background:#a03a2a88"></div><div data-s style="height:100%;width:0;background:#9ac0e0"></div></div></div><div style="display:flex;gap:6px;margin-top:6px"><button data-h="1" style="${bs}">✋ 왼손</button><button data-h="2" style="${bs}">오른손 🤚</button></div><div style="font-size:11.5px;color:#dce6d8;margin-top:3px">왼손·오른손을 번갈아 고른 박자로 당겨요. 같은 손을 두 번 쓰거나 박자가 들쭉날쭉하면 찬합이 흔들려요.</div><div data-m style="font-size:12px;margin-top:4px;min-height:16px"></div>`;
  const q=k=>d.querySelector(k);const iEl=q('[data-i]'),pEl=q('[data-p]'),sEl=q('[data-s]'),mEl=q('[data-m]');
  const snd=(f,len,type='sine',v=.04)=>{try{const AC=ctx.ac();if(!AC)return;const s0=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s0);gg.gain.setValueAtTime(v,s0);gg.gain.exponentialRampToValueAtTime(.0001,s0+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s0);o.stop(s0+len+.02)}catch(e){}};
  const pull=h=>{if(phase!=='pull')return;const R=RD[rd];const now=t;let kick=.15;if(h===lastHand)kick+=.9;if(lastT>0){const dtp=now-lastT;iv.push(dtp);if(iv.length>4)iv.shift();const mean=iv.reduce((a,b)=>a+b,0)/iv.length;kick+=Math.min(1.2,Math.abs(dtp-mean)/Math.max(.15,mean)*1.6);if(dtp<.22)kick+=.5}swv+=(Math.random()<.5?-1:1)*kick*.9*R.k;lastHand=h;lastT=now;prog=Math.min(1,prog+.045/R.k);snd(200+prog*300,.06,'triangle',.03);wheel.rotation.z+=.6};
  d.querySelectorAll('[data-h]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();pull(+b.dataset.h)});
  const kd=e=>{if(e.code==='ArrowLeft'||e.code==='KeyA')pull(1);if(e.code==='ArrowRight'||e.code==='KeyD')pull(2)};addEventListener('keydown',kd);
  const newRound=()=>{prog=0;sw=0;swv=0;lastHand=0;lastT=0;iv=[];spill=0;t=0;phase='pull';msg=`${rd+1}번째: ${RD[rd].n}을 올려요`};newRound();
  const step=now=>{if(!d.isConnected){G.remove(grp);removeEventListener('keydown',kd);return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;const R=RD[rd];
   if(phase==='pull'){if(auto){at+=dt;if(at>.42){at=0;pull(lastHand===1?2:1)}}
    swv+=-sw*9*dt;swv*=Math.pow(.25,dt);sw+=swv*dt;const S=Math.abs(sw);if(S>.7){spill++;sw*=.3;swv*=.3;prog=Math.max(0,prog-.12);msg='찬합이 크게 흔들려 조금 쏟았어요! 박자를 고르게';snd(160,.3,'sawtooth',.05)}
    if(prog>=1){const sc=Math.max(0,Math.min(1,1-spill*.25-Math.max(0,t-20)/40));res.push(sc);msg=`동천석실에 닿았어요! (${t.toFixed(0)}초${spill?`, 쏟음 ${spill}번`:''})`;snd(880,.35);phase='wait';wait=2.4}else if(t>60){res.push(0);msg='시간이 다 됐어요';phase='wait';wait=2}}
   if(phase==='wait'){wait-=dt;if(wait<=0){rd++;if(rd>=3){fin();return}newRound()}}
   const p=P0.clone().lerp(P1,prog);bx.position.set(p.x,p.y-.6,p.z);bx.rotation.z=sw*.8;
   pEl.style.width=(prog*100)+'%';sEl.style.width=Math.min(100,Math.abs(sw)/1*100)+'%';iEl.textContent=`${Math.min(rd+1,3)} / 3번 · ${R.n}`;mEl.textContent=msg;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;removeEventListener('keydown',kd);const Q=Math.round(res.reduce((a,b)=>a+b,0)/3*100);const st=Q>=80?3:Q>=50?2:Q>0?1:0;try{ctx.done('dongcheon_pull',Q,'도르래로 찬합 올리기')}catch(e){}window.__DCQ=Q;snd(660,.4);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">찬합을 다 올렸어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">윤선도는 보길도에 부용동 원림을 꾸미고, 산 중턱 바위 위 동천석실에서 차를 마시며 글을 지었어요. 아래에서 도르래로 음식을 올렸다는 이야기가 전해요(전해 오는 이야기).</div><div style="font-size:24px;color:#9ac090">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#9ac090;color:#1e2a22;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef4ea;border:2px solid #eef4ea;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();G.remove(grp);window.__DCPULL()};d.querySelector('[data-x]').onclick=()=>{d.remove();G.remove(grp)}};
  requestAnimationFrame(step);window.__DCG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('왼손 오른손 번갈아 당겨요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'찻잔 조각',h:'동천석실에서 차를 마시던 백자 찻잔 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.1,.06,.08,14,1,true,0,2.4),M(0xe8e4d8,{side:THREE.DoubleSide})))})},
  {n:'기와 조각',h:'한 칸 집 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.04,20,1,true,0,2),M(0x5a5a54,{side:THREE.DoubleSide})))})},
  {n:'쇠 도르래 축',h:'도르래를 걸던 쇠막대 조각이에요(이야기 속 도르래).',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,.3,8),M(0x4a4440,{metalness:.5})))})},
  {n:'먹 조각',h:'글을 짓던 먹 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.18,.03,.05),M(0x1a1a1a)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.015,18),M(0x6a5a30,{metalness:.6})))})}];
 window.__DCDIG=()=>{window.__DETECT&&window.__DETECT({key:'dongcheon_dig',title:'동천석실 발굴 탐지',emoji:'⛏️',bg:'#1e2a22',count:4,TL:150,cand:[[-10,10],[-6,14],[2,10],[10,10],[-12,4],[6,-2],[0,2],[-4,16]],items:ITEMS,intro:'동천석실 둘레 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'동천석실은 보길도 윤선도 원림의 일부예요(명승).'})};
 const meta={quest:{t:'동천석실 둘러보기',d:'바위 위 동천석실과 석담, 도르래 자리를 둘러보세요.',steps:[['동천석실','동천석실'],['석담','석담과 돌계단'],['도르래','도르래 자리']]},
  title:'완도 보길도 동천석실',hint:'사진 측량한 동천석실 일대예요(크기 어림). 바위를 올라 한 칸 집까지 가 보고 도르래 놀이도 해 봐요. '+SRC,
  ibl:true,env:{fog:[80,320],noHills:false,plaza:null,beds:false,trees:false,treeAvoid:()=>true,sign:{x:LX+3,z:LZ+3,y:.6,lines:['완도 보길도 동천석실','명승 · 윤선도 원림','사진 측량 3D','크기 어림']}},
  npc:[['science',[[2,14],[6,14],[6,17],[2,17]]]],bounds:[-21,22,-21,21],level:P=>P.z<0?'바위 위':'아래 마당',camCap:()=>Infinity,
  baseAt:(x,z)=>hAt(x,z),tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:6,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#3f5a34';g.fillRect(0,0,300,300);g.fillStyle='#c8c0b0';g.fillRect(X(-8),Z(-10),18*S,20*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:LX+2,z:LZ+3,yaw:Math.PI},size:{}},meta)}
