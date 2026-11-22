/* 페르시아 마당(2026-11-22, G22): 비단길 서쪽 페르시아. 사산 왕조(224~651년)의 은그릇·유리그릇은 동쪽으로 퍼졌고, 신라 무덤에서도 서아시아 계통 유리그릇이 나와요.
   11세기 페르시아 서사시 「쿠쉬나메」에는 페르시아 왕자가 바실라(신라로 보는 견해가 있어요)로 가서 공주와 혼인했다는 이야기가 나와요. 이야기로 전해 오는 내용이라고 밝혀요.
   실측: 클리블랜드 미술관 CC0 「Sasanian Bowl」(500~700년 은 사발, 미술관 수치 지름 13.4cm로 맞춤), 「Dish with King Hormizd II or III Hunting Lions」(400~600년 금도금 은 접시, 지름 20.8cm로 맞춤).
   페르세폴리스 기둥·계단은 간추려 지었어요(아파다나 기둥은 높이 20m쯤으로 알려져 있어요).
   놀이: 은판 두드려 그릇 만들기(은판을 3D에서 두드려 우묵하게. 목표 깊이보다 얕으면 파랗고 깊으면 붉어요. 고르게 두드려 접시·사발·잔 모양 맞추기, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildPersia(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(651);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const ST=tex(128,128,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<500;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v-8})`;q.fillRect(r()*w,r()*h,3,3)}},[2,2]);
 /* 페르세폴리스 단과 기둥(간추림) */const PX=0,PZ=-30;{const tr=new THREE.Mesh(new THREE.BoxGeometry(40,3,24),M(0xc8b898,{map:ST}));tr.position.set(PX,1.5,PZ);G.add(tr);solids.push({x0:PX-20,x1:PX+20,y0:0,y1:3,z0:PZ-12,z1:PZ+12});for(let i=0;i<12;i++){const st=new THREE.Mesh(new THREE.BoxGeometry(8,.25,.6),M(0xc0b090,{map:ST}));st.position.set(PX,.125+i*.25,PZ+12+6-i*.5);G.add(st)}
  for(let i=0;i<6;i++)for(let k=0;k<3;k++){if((i+k)%4===3)continue;const h=k===1?18:11+r()*7;const x=PX-15+i*6,z=PZ-8+k*7;const c=new THREE.Mesh(new THREE.CylinderGeometry(.8,.9,h,16),M(0xd0c0a0,{map:ST}));c.position.set(x,3+h/2,z);G.add(c);if(h>16){const cap=new THREE.Mesh(new THREE.BoxGeometry(3,1.6,1.4),M(0xc0b090,{map:ST}));cap.position.set(x,3+h+.8,z);G.add(cap)}}
  const RL=tex(512,128,(q,w,h)=>{q.fillStyle='#d8c8a8';q.fillRect(0,0,w,h);for(let i=0;i<9;i++){const x=30+i*54;q.fillStyle='#a89878';q.fillRect(x,40,18,70);q.beginPath();q.arc(x+9,32,10,0,7);q.fill();q.fillRect(x-4,20,26,6)}q.fillStyle='#5a4a30';q.font='bold 20px sans-serif';q.fillText('여러 나라 사신 행렬 부조(간추림)',120,124)});const rel=new THREE.Mesh(new THREE.PlaneGeometry(14,3.5),new THREE.MeshStandardMaterial({map:RL}));rel.position.set(PX-12,1.5,PZ+12.02);G.add(rel)}
 /* 실측 은그릇 둘 */const VX=8,VZ=0;[{x:-.45,f:'bowl.glb',n:'사산 은 사발',s:'클리블랜드 실측 · 지름 13.4cm'},{x:.45,f:'dish.glb',n:'사자 사냥 은 접시',s:'클리블랜드 실측 · 지름 20.8cm'}].forEach(C=>{const ped=new THREE.Mesh(new THREE.BoxGeometry(.7,1,.7),M(0x2a2420));ped.position.set(VX+C.x,.5,VZ);G.add(ped);const LT=tex(320,72,(q,w,h)=>{q.fillStyle='#f4ecd8';q.fillRect(0,0,w,h);q.fillStyle='#2a2018';q.font='bold 22px sans-serif';q.textAlign='center';q.fillText(C.n,w/2,30);q.font='15px sans-serif';q.fillText(C.s,w/2,56)});const lb=new THREE.Mesh(new THREE.PlaneGeometry(.66,.15),new THREE.MeshStandardMaterial({map:LT}));lb.position.set(VX+C.x,.85,VZ+.36);G.add(lb);const L=new THREE.PointLight(0xfff0d8,1.2,2.2,2);L.position.set(VX+C.x,1.6,VZ+.4);G.add(L);
  if(!mini){new GLTFLoader().load(new URL('../models/persia/'+C.f,import.meta.url).href,m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh&&e.material){e.material.metalness=Math.max(e.material.metalness||0,.55);e.material.roughness=Math.min(e.material.roughness??1,.45)}});const w=new THREE.Group();w.add(o);w.userData.noBatch=true;w.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o);o.position.set(-(b.min.x+b.max.x)/2,-b.min.y,-(b.min.z+b.max.z)/2);w.position.set(VX+C.x,1,VZ);G.add(w)},undefined,()=>{})}});solids.push({x0:VX-.85,x1:VX+.85,y0:0,y1:1.3,z0:VZ-.4,z1:VZ+.4});
 /* 쿠쉬나메 판 */const BX=-10,BZ=4;{const T=tex(512,320,(q,w,h)=>{q.fillStyle='#f0e4c8';q.fillRect(0,0,w,h);q.strokeStyle='#2a5a8a';q.lineWidth=6;q.strokeRect(3,3,w-6,h-6);q.fillStyle='#2a2018';q.font='bold 30px serif';q.textAlign='center';q.fillText('쿠쉬나메 속 바실라',w/2,46);q.font='20px sans-serif';['11세기 페르시아 서사시 쿠쉬나메에는','페르시아 왕자가 바실라로 가서','공주와 혼인했다는 이야기가 나와요.','바실라를 신라로 보는 견해가 있어요.'].forEach((t,i)=>q.fillText(t,w/2,98+i*36));q.fillStyle='#6a5a40';q.font='16px sans-serif';q.fillText('이야기로 전해 오는 내용이에요',w/2,296)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(3,1.9),new THREE.MeshStandardMaterial({map:T}));bd.position.set(BX,1.6,BZ);G.add(bd);for(const k of[-1,1]){const p=new THREE.Mesh(new THREE.BoxGeometry(.12,2.6,.12),M(0x2a5a8a));p.position.set(BX+k*1.55,1.3,BZ-.05);G.add(p)}solids.push({x0:BX-1.6,x1:BX+1.6,y0:0,y1:2.6,z0:BZ-.25,z1:BZ+.1})}
 /* 은 공방 */const WX=10,WZ=8,WY=.8;{const an=new THREE.Mesh(new THREE.CylinderGeometry(.5,.6,WY,16),M(0x5a4a3a));an.position.set(WX,WY/2,WZ);G.add(an);solids.push({cx:WX,cz:WZ,r:.7,y0:0,y1:WY})}
 const NR=14,NS=40,RAD=.5;const dg=new THREE.BufferGeometry();const pos=[],col=[],idx=[],rr=[];for(let i=0;i<=NR;i++)for(let j=0;j<NS;j++){const rad=i/NR*RAD,a=j/NS*Math.PI*2;pos.push(Math.cos(a)*rad,0,Math.sin(a)*rad);col.push(1,1,1);rr.push(rad);if(i===0)break}
 const vi=(i,j)=>i===0?0:1+(i-1)*NS+(j%NS);for(let j=0;j<NS;j++)idx.push(0,vi(1,j+1),vi(1,j));for(let i=1;i<NR;i++)for(let j=0;j<NS;j++){idx.push(vi(i,j),vi(i,j+1),vi(i+1,j));idx.push(vi(i,j+1),vi(i+1,j+1),vi(i+1,j))}
 dg.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));dg.setAttribute('color',new THREE.Float32BufferAttribute(col,3));dg.setIndex(idx);dg.computeVertexNormals();
 const disk=new THREE.Mesh(dg,new THREE.MeshStandardMaterial({color:0xe8e8f0,metalness:.75,roughness:.3,vertexColors:true,side:THREE.DoubleSide}));disk.userData.noBatch=true;disk.position.set(WX,WY+.42,WZ);G.add(disk);
 const NL=[];if(!mini){for(const[x,y,z]of[[PX,8,PZ+14],[VX,3,VZ+2],[WX,3,WZ+2],[BX,3,BZ+2]]){const P=new THREE.PointLight(0xffc080,0,26,1.5);P.position.set(x,y,z);G.add(P);NL.push(P);const lg=new THREE.Group();lg.userData.noBatch=true;const lp=new THREE.Mesh(new THREE.CylinderGeometry(.05,.06,y,6),new THREE.MeshStandardMaterial({color:0x3a2a1a,map:null}));lp.position.y=y/2;if(y<5)lg.add(lp);const lm=new THREE.Mesh(new THREE.SphereGeometry(.34,12,8),new THREE.MeshStandardMaterial({color:0xfff0d0,emissive:0xffc060,emissiveIntensity:0}));lm.position.y=y+.1;lg.add(lm);lg.position.set(x,0,z);G.add(lg);P.userData.lm=lm}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(P=>{P.intensity=nk*60;if(P.userData.lm)P.userData.lm.material.emissiveIntensity=nk*8})};
 const sp=(x,z,rr2,t,h)=>spots.push({x,y:0,z,r:rr2,t,h});
 sp(PX,PZ+19,4,'페르세폴리스','페르시아 왕들이 의식을 열던 궁전 터예요. 높이 20m쯤으로 알려진 기둥과 사신 행렬 부조가 남아 있어요. 간추려 지었어요.');
 sp(VX,VZ+1.4,1.6,'사산 은그릇','사산 왕조 은 사발과 사자 사냥 은 접시예요. 클리블랜드 미술관 실측(CC0), 지름 13.4cm·20.8cm예요.');
 sp(BX,BZ+2,2,'쿠쉬나메 속 바실라','11세기 페르시아 서사시 쿠쉬나메에 바실라 공주 이야기가 나와요. 바실라를 신라로 보는 견해가 있어요.');
 sp(WX-2.4,WZ+1.6,1.8,'은 공방','은판을 두드려 그릇을 만들어 봐요. 놀이용으로 크게 만든 은판이에요.');
 sp(-24,16,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 sp(0,22,2.4,'세계로 가는 나루로 돌아가기','인천 「세계로 가는 나루」로 돌아가요.');
 /* 은판 두드려 그릇 만들기(11/22) */
 window.__PSHAMMER=()=>{if(document.getElementById('psP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(WX-2.4,WZ+1.6,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('psP')?[WX,WY+2.1,WZ+1.25,WX,WY+.3,WZ,50]:null;
  const RD=[{n:'접시',D:.11,p:2.4},{n:'사발',D:.19,p:2},{n:'잔',D:.28,p:1.6}];let rd=0,taps=0,phase='play',wait=0,auto=false,done=false,msg='',last=performance.now(),at=0,swing=0;const res=[];const dep=new Float32Array(rr.length);
  const tgt=i=>{const R=RD[rd];const t=rr[i]/RAD;return R.D*Math.max(0,1-Math.pow(t,R.p))};
  const d=document.createElement('div');d.id='psP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#22262e;border:3px solid #b8c0d0;border-radius:16px;padding:9px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#eef0f4;box-shadow:0 6px 18px rgba(0,0,0,.35);width:310px;max-width:94vw;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🔨 은판 두드려 그릇 만들기</b><div data-i style="margin:3px 0;font:14px 'Do Hyeon',sans-serif"></div><div data-q style="height:9px;background:#0005;border-radius:6px;overflow:hidden"><div data-b style="height:100%;width:0;background:#c8d8f0"></div></div><div style="font-size:11.5px;color:#d8dce8;margin-top:4px">은판을 눌러 두드려요. 파란 곳은 더, 붉은 곳은 그만</div><button data-f style="width:100%;margin-top:6px;font:14px 'Do Hyeon',sans-serif;background:#b8c0d0;color:#22262e;border:0;border-radius:10px;padding:7px 0;cursor:pointer">다 됐어요</button><div data-m style="font-size:12px;color:#f8e8a0;margin-top:4px"></div>`;
  const q=k=>d.querySelector(k);const iEl=q('[data-i]'),bEl=q('[data-b]'),mEl=q('[data-m]');
  const snd=(f,len,type='sine',v=.05)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);g.gain.setValueAtTime(v,s);g.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(g).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const P=dg.attributes.position,Cc=dg.attributes.color;
  const err=()=>{let s=0;for(let i=0;i<rr.length;i++){const e=dep[i]-tgt(i);s+=e*e}return Math.sqrt(s/rr.length)};
  const fitness=()=>Math.max(0,1-err()/(RD[rd].D*.45));
  const redraw=()=>{for(let i=0;i<rr.length;i++){P.setY(i,-dep[i]);const e=(dep[i]-tgt(i))/RD[rd].D;if(e<-.08){const t=Math.min(1,-e*2.5);Cc.setXYZ(i,1-t*.6,1-t*.4,1)}else if(e>.08){const t=Math.min(1,e*2.5);Cc.setXYZ(i,1,1-t*.6,1-t*.6)}else Cc.setXYZ(i,1,1,1)}P.needsUpdate=true;Cc.needsUpdate=true;dg.computeVertexNormals()};
  const hit=(x,z)=>{if(phase!=='play')return;taps++;swing=1;const sg=.065,k=.016;for(let i=0;i<rr.length;i++){const dx=P.getX(i)-x,dz=P.getZ(i)-z;const w=Math.exp(-(dx*dx+dz*dz)/(sg*sg));dep[i]=Math.min(RD[rd].D*1.6,dep[i]+k*w*(1-rr[i]/RAD*.3))}redraw();snd(1800+Math.random()*400,.06,'square',.03)};
  const finish=()=>{if(phase!=='play')return;const s=fitness();res.push(s);msg=s>.85?`${RD[rd].n}를 고르게 두드렸어요!`:`${RD[rd].n} 모양이 ${(s*100|0)}점만큼 닮았어요`;snd(s>.85?820:380,.3);phase='wait';wait=2.2};
  q('[data-f]').onclick=finish;
  const ham=new THREE.Group();const hh=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.14,10),M(0x5a5a5a,{metalness:.7}));hh.rotation.z=Math.PI/2;ham.add(hh);const hs=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.3,6),M(0x7a5434));hs.position.y=.15;ham.add(hs);ham.visible=false;G.add(ham);
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,100);const rc=new THREE.Raycaster();const ov=document.createElement('div');ov.id='psO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  ov.onpointerdown=e=>{const C=window.__GCAM();if(!C)return;pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();disk.updateMatrixWorld(true);rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObject(disk,false)[0];if(h){const lp=disk.worldToLocal(h.point.clone());ham.visible=true;ham.position.set(h.point.x,h.point.y+.02,h.point.z);hit(lp.x,lp.z)}};
  const newRound=()=>{dep.fill(0);taps=0;redraw();phase='play';msg=`${rd+1}판: ${RD[rd].n} 깊이 ${(RD[rd].D/RAD*20.8|0)}cm쯤(지름 20.8cm 기준)로`};
  const cleanup=()=>{ov.remove();G.remove(ham);dep.fill(0);for(let i=0;i<rr.length;i++){P.setY(i,0);Cc.setXYZ(i,1,1,1)}P.needsUpdate=true;Cc.needsUpdate=true;dg.computeVertexNormals()};
  newRound();
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(phase==='play'&&auto){at+=dt;if(at>.04){at=0;let bi=-1,bv=.012;for(let i=0;i<rr.length;i++){const v=tgt(i)-dep[i];if(v>bv){bv=v;bi=i}}if(bi<0||taps>400)finish();else hit(P.getX(bi),P.getZ(bi))}}
   swing=Math.max(0,swing-dt*6);ham.rotation.z=-swing*.8;
   if(phase==='wait'){wait-=dt;if(wait<=0){rd++;if(rd>=3){fin();return}newRound()}}
   iEl.textContent=`${Math.min(rd+1,3)} / 3판 · ${RD[Math.min(rd,2)].n} · 두드린 횟수 ${taps}`;bEl.style.width=(fitness()*100)+'%';mEl.textContent=msg;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('persia_hammer',Q,'은판 두드려 그릇 만들기')}catch(e){}window.__PSQ=Q;snd(660,.4);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">은그릇을 다 만들었어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">은은 무르고 잘 늘어나서 판을 망치로 고르게 두드리면 우묵한 그릇이 돼요. 사산 장인들은 이렇게 만든 그릇 겉에 무늬를 두드려 내고 금을 입혔어요.</div><div style="font-size:24px;color:#b8c0d0">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#b8c0d0;color:#22262e;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef0f4;border:2px solid #eef0f4;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__PSHAMMER()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__PSG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('고르게 두드려요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'은화',h:'사산 왕조 은화예요. 비단길 장사에 널리 쓰였어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.02,20),M(0xc8c8c0,{metalness:.7,roughness:.35})))})},
  {n:'유리 조각',h:'둥근 무늬를 깎아 낸 유리 그릇 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.1,.06,12,1,true,0,2),M(0xd8e8d8,{roughness:.15,transparent:true,opacity:.8})))})},
  {n:'채색 벽돌 조각',h:'푸른 유약을 입힌 벽돌 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.18,.05,.1),M(0x2a6ab8)))})},
  {n:'도장',h:'인물과 동물을 새긴 돌 도장이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.04,14),M(0x8a5a3a)))})},
  {n:'은 숟가락',h:'은 숟가락 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.01,.04),M(0xc8c8c0,{metalness:.7})))})}];
 window.__PSDIG=()=>{window.__DETECT&&window.__DETECT({key:'persia_dig',title:'페르시아 발굴 탐지',emoji:'⛏️',bg:'#22262e',count:4,TL:150,cand:[[-24,16],[-30,2],[24,16],[30,2],[-12,22],[12,22],[-30,-14],[30,-14]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'페르시아의 은과 유리는 비단길을 따라 동쪽 끝까지 갔어요.'})};
 const meta={quest:{t:'페르시아 둘러보기',d:'페르세폴리스와 은그릇, 쿠쉬나메 판, 은 공방을 둘러보세요.',steps:[['궁전 터','페르세폴리스'],['은그릇','사산 은그릇'],['쿠쉬나메','쿠쉬나메 속 바실라'],['공방','은 공방']]},
  title:'페르시아',hint:'은그릇 둘은 클리블랜드 미술관 실측, 페르세폴리스와 놀이 은판은 간추려 지었어요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:14,lines:['페르시아','사산 은그릇(실측)','페르세폴리스','간추려 지음']}},
  npc:[['science',[[-12,10],[-4,10],[-4,16],[-12,16]]]],bounds:[-40,40,-44,32],level:()=>'세계',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2,ox:0,oz:-8,draw(g,X,Z,S){g.fillStyle='#d8c8a0';g.fillRect(0,0,300,300);g.fillStyle='#c8b898';g.fillRect(X(PX-20),Z(PZ-12),40*S,24*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:20,yaw:Math.PI},size:{}},meta)}
