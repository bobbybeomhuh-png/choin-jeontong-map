/* 부산 해동용궁사 마당(2026-11-22, K12): 부산 기장 바닷가 바위 위에 지은 절.
   사진 실측: 아르케오모델3D(juanbrualla) 스케치팹 CC BY 「Stairs in Yonggungsa Temple」(용 조각 답도를 가운데 둔 돌계단). 자료에 단위가 없어 계단 한 단 높이를 보통 계단(약 17cm)으로 보아 전체 높이 약 3.1m로 어림했어요.
   바닷가 바위·법당·탑은 간추려 지었어요.
   놀이: 파도 사이 바위 건너기(밀물과 썰물처럼 오르내리는 물결을 보고, 낮은 바위는 물이 빠졌을 때만 건너 해안 끝 바위까지 가기, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildYonggung(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1376);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.95},o));
 const RT=tex(128,128,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<500;i++){const v=150+(r()*100|0);q.fillStyle=`rgb(${v},${v},${v-6})`;q.fillRect(r()*w,r()*h,4,3)}});
 const sea=new THREE.Mesh(new THREE.PlaneGeometry(400,300),M(0x2a6a9a,{roughness:.15,metalness:.1,transparent:true,opacity:.92}));sea.rotation.x=-Math.PI/2;sea.position.set(0,.05,-170);G.add(sea);solids.push({x0:-200,x1:200,y0:-1,y1:3,z0:-320,z1:-22});
 /* 해안 바위(간추림) */for(let i=0;i<26;i++){const x=-40+i*3.2+(r()-.5)*2,z=-21+(r()-.5)*3;const s=new THREE.Mesh(new THREE.DodecahedronGeometry(1.2+r()*1.4,0),M(0x6a645c,{map:RT}));s.position.set(x,.3,z);s.rotation.set(r()*3,r()*3,r()*3);G.add(s)}
 /* 실측 계단(답도) */const SX=0,SZ=-6;if(!mini){new GLTFLoader().load(new URL('../models/yonggung/stairs.glb',import.meta.url).href,g=>{const o=g.scene;o.traverse(e=>{if(e.isMesh){e.receiveShadow=true;e.castShadow=true}});const w=new THREE.Group();w.add(o);w.userData.noBatch=true;w.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o);o.position.y-=b.min.y;w.position.set(SX,0,SZ);G.add(w)},undefined,e=>console.warn('YGLOADERR'))}
 /* 법당 터와 법당(간추림) */{const tr=new THREE.Mesh(new THREE.BoxGeometry(18,3.1,10),M(0x9a948a,{map:RT}));tr.position.set(SX,1.55,SZ-8.8);G.add(tr);const hall=new THREE.Group();hall.position.set(SX,3.1,SZ-10);const b=new THREE.Mesh(new THREE.BoxGeometry(9,3.4,5),M(0xc8302a));b.position.y=1.7;hall.add(b);const rf=new THREE.Mesh(new THREE.ConeGeometry(6.8,2.4,4),M(0x3a4a3a));rf.rotation.y=Math.PI/4;rf.scale.z=.62;rf.position.y=4.6;hall.add(rf);G.add(hall);solids.push({x0:SX-9,x1:SX+9,y0:0,y1:3.1,z0:SZ-13.8,z1:SZ-3.8})}
 /* 바다를 보는 석등·탑(간추림) */for(const[x,z]of[[-8,-14],[9,-15]]){const g=new THREE.Group();g.position.set(x,0,z);for(let k=0;k<3;k++){const b=new THREE.Mesh(new THREE.BoxGeometry(1.6-k*.35,.9,1.6-k*.35),M(0xa8a298,{map:RT}));b.position.y=.45+k*1.05;g.add(b);const rf=new THREE.Mesh(new THREE.BoxGeometry(1.9-k*.35,.15,1.9-k*.35),M(0x8a847a));rf.position.y=.95+k*1.05;g.add(rf)}G.add(g);solids.push({cx:x,cz:z,r:1,y0:0,y1:3.4})}
 /* 바위 건너기 길 */const PX=14,PZ=-20;const ROCK=[[0,0,1.05],[2.4,-1.4,.42],[4.6,-.4,1.05],[6.8,-2,.32],[9.2,-1,1.05],[11.4,-2.6,.38],[13.8,-1.6,1.1]];const rockM=[];
 const path=new THREE.Group();path.userData.noBatch=true;path.position.set(PX,0,PZ);G.add(path);ROCK.forEach(([x,z,h])=>{const s=new THREE.Mesh(new THREE.CylinderGeometry(.9,1.2,h+.8,9),M(0x5a5650,{map:RT}));s.position.set(x,(h+.8)/2-.8,z);path.add(s);rockM.push(s)});
 const water=new THREE.Mesh(new THREE.PlaneGeometry(22,8),M(0x3a8ab8,{transparent:true,opacity:.75,roughness:.1}));water.rotation.x=-Math.PI/2;water.position.set(7,.1,-1.3);path.add(water);
 const NL=[];if(!mini){for(const[x,y,z]of[[-4,3,-1],[PX,3,PZ+3],[8,3,4]]){const P=new THREE.PointLight(0xffc080,0,26,1.5);P.position.set(x,y,z);G.add(P);NL.push(P);const lg=new THREE.Group();lg.userData.noBatch=true;const lp=new THREE.Mesh(new THREE.CylinderGeometry(.05,.06,y,6),M(0x3a2a1a));lp.position.y=y/2;lg.add(lp);const lm=new THREE.Mesh(new THREE.SphereGeometry(.34,12,8),new THREE.MeshStandardMaterial({color:0xfff0d0,emissive:0xffc060,emissiveIntensity:0}));lm.position.y=y+.1;lg.add(lm);lg.position.set(x+1.9,0,z);G.add(lg);P.userData.lm=lm}}
 let nk=0,wt=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(P=>{P.intensity=nk*60;if(P.userData.lm)P.userData.lm.material.emissiveIntensity=nk*8});wt+=dt;if(!path.userData.busy)water.position.y=.1+Math.sin(wt*.7)*.2};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(SX,SZ+4,2.6,'용 조각 답도','법당으로 오르는 돌계단 가운데에 용을 새긴 답도예요. 사진 실측(CC BY), 계단 높이로 크기를 어림했어요.');
 sp(SX+6,SZ-1,2.4,'해동용궁사','바다 바로 곁 바위 위에 지은 절이에요. 법당·탑은 간추려 지었어요.');
 sp(PX-2,PZ+3,2.2,'바위 건너기 자리','파도를 보며 바위를 건너 봐요.');
 sp(-24,12,2.4,'발굴 탐지 자리','바닷가 흙 속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 파도 사이 바위 건너기(11/22) */
 window.__YGWAVE=()=>{if(document.getElementById('ywP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX-2,PZ+3.4,0)}catch(e){}
  path.userData.busy=true;window.__GCAM=()=>document.getElementById('ywP')?[PX+7,6,PZ+11,PX+7,0,PZ-1,50]:null;
  const tok=new THREE.Group();const tb=new THREE.Mesh(new THREE.CapsuleGeometry(.25,.5,4,8),M(0xf4f0e8));tb.position.y=.55;tok.add(tb);const th=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),M(0xf4f0e8));th.position.y=1.1;tok.add(th);path.add(tok);
  const RD=[{amp:.42,per:5.2},{amp:.48,per:4.4},{amp:.52,per:3.6}];let rd=0,pos=0,hop=0,from=0,wets=0,phase='play',wait=0,auto=false,done=false,msg='',last=performance.now(),t=0,lvl=0,T=0;const res=[];
  const d=document.createElement('div');d.id='ywP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#14283a;border:3px solid #6ab0e0;border-radius:16px;padding:9px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#eef4f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:310px;max-width:94vw;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🌊 파도 사이 바위 건너기</b><div data-i style="margin:3px 0;font:14px 'Do Hyeon',sans-serif"></div><div style="height:10px;background:#0006;border-radius:6px;position:relative;overflow:hidden"><div data-w style="position:absolute;left:0;top:0;bottom:0;background:#6ab0e0"></div></div><div style="font-size:11.5px;color:#d8e4ee;margin-top:3px">「건너기」로 다음 바위로 가요. 다음 바위가 물에 잠겨 있으면 미끄러져요. 물이 빠질 때를 기다려요</div><button data-g style="width:100%;margin-top:6px;font:15px 'Do Hyeon',sans-serif;background:#6ab0e0;color:#14283a;border:0;border-radius:10px;padding:8px 0;cursor:pointer">건너기</button><div data-m style="font-size:12px;color:#f8e8a0;margin-top:4px"></div>`;
  const q=k=>d.querySelector(k);const iEl=q('[data-i]'),wEl=q('[data-w]'),mEl=q('[data-m]');
  const snd=(f,len,type='sine',v=.05)=>{try{const AC=ctx.ac();if(!AC)return;const s0=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s0);g.gain.setValueAtTime(v,s0);g.gain.exponentialRampToValueAtTime(.0001,s0+len);o.connect(g).connect(ctx.out()||AC.destination);o.start(s0);o.stop(s0+len+.02)}catch(e){}};
  const top=i=>ROCK[i][2];const lvlAt=tt=>{const R=RD[rd];return .32+R.amp*Math.sin(tt/R.per*Math.PI*2)+.08*Math.sin(tt*1.9)};
  const place=()=>{const[a,b]=[ROCK[from],ROCK[pos]];const k=hop>0?1-hop/.6:1;tok.position.set(a[0]+(b[0]-a[0])*k,(a[2]+(b[2]-a[2])*k)+Math.sin(k*Math.PI)*.8,a[1]+(b[1]-a[1])*k)};
  const go=()=>{if(phase!=='play'||hop>0||pos>=ROCK.length-1)return;from=pos;pos++;hop=.6;snd(520,.1,'triangle',.04)};q('[data-g]').onclick=go;
  const newRound=()=>{pos=0;from=0;hop=0;wets=0;t=0;phase='play';msg=`${rd+1}판: 물결이 ${['느려요','조금 빨라요','빨라요'][rd]}`;place()};
  const cleanup=()=>{path.remove(tok);path.userData.busy=false};
  newRound();
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(phase==='play'){t+=dt;lvl=lvlAt(t);water.position.y=lvl;
    if(auto&&hop<=0&&pos<ROCK.length-1){const nx=top(pos+1);const fut=lvlAt(t+.6);if(fut<nx-.08&&lvlAt(t+1.4)<nx-.02&&lvl<nx)go()}
    if(hop>0){hop-=dt;if(hop<=0){hop=0;if(top(pos)<lvl){wets++;msg='앗, 잠긴 바위에서 미끄러졌어요! 한 칸 뒤로';snd(160,.3,'sawtooth',.05);from=pos;pos=Math.max(0,pos-1);hop=.6}else{msg=pos===ROCK.length-1?'끝 바위에 닿았어요!':'잘 건넜어요';if(pos===ROCK.length-1){const sc=Math.max(0,1-wets*.2-Math.max(0,t-25)/50);res.push(sc);phase='wait';wait=2;snd(820,.3)}}}}
    else if(top(pos)<lvl-.05&&pos>0){wets++;msg='서 있던 바위가 잠겼어요! 한 칸 뒤로';snd(160,.3,'sawtooth',.05);from=pos;pos--;hop=.6}
    place()}
   wEl.style.width=Math.max(0,Math.min(100,(lvl+.4)/1.6*100))+'%';
   if(phase==='wait'){wait-=dt;if(wait<=0){rd++;if(rd>=3){fin();return}newRound()}}
   iEl.textContent=`${Math.min(rd+1,3)} / 3판 · 바위 ${pos+1}/${ROCK.length} · 미끄러짐 ${wets}`;mEl.textContent=msg;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('yonggung_wave',Q,'파도 사이 바위 건너기')}catch(e){}window.__YWQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">바위를 다 건넜어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">바닷물은 하루에 두 번쯤 밀려왔다 빠져나가요(밀물·썰물). 부산 바닷가 사람들은 물때를 보고 갯바위에 나가 미역·해초를 거뒀어요.</div><div style="font-size:24px;color:#6ab0e0">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#6ab0e0;color:#14283a;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f8;border:2px solid #eef4f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__YGWAVE()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__YWG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('물이 빠질 때 건너요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'기와 조각',h:'옛 법당 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.04,20,1,true,0,2),M(0x6a6a64)))})},
  {n:'조개껍데기',h:'바닷가 조개껍데기예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.06,10,6,0,Math.PI*2,0,Math.PI/2),M(0xe8e0d0)))})},
  {n:'동전',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.02,20),M(0x6a5a30,{metalness:.6})))})},
  {n:'그물추',h:'그물 끝에 달던 흙 그물추예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.12,8),M(0x8a6a4a)))})},
  {n:'향로 조각',h:'절에서 쓰던 향로 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.08,.08,12,1,true,0,2),M(0x6a5a30,{metalness:.5})))})}];
 window.__YGDIG=()=>{window.__DETECT&&window.__DETECT({key:'yonggung_dig',title:'용궁사 바닷가 발굴 탐지',emoji:'⛏️',bg:'#14283a',count:4,TL:150,cand:[[-24,12],[-30,0],[26,12],[30,2],[-14,18],[14,18],[-32,14],[32,14]],items:ITEMS,intro:'바닷가 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'해동용궁사는 바다와 맞닿은 절이에요.'})};
 const meta={quest:{t:'해동용궁사 둘러보기',d:'용 조각 답도와 법당, 바위 건너기 자리를 둘러보세요.',steps:[['답도','용 조각 답도'],['절','해동용궁사'],['바위','바위 건너기 자리']]},
  title:'부산 해동용궁사',hint:'용 조각 계단은 사진 실측(크기 어림), 법당·탑·바위는 간추려 지었어요.',
  ibl:true,env:{plaza:null,beds:false,trees:true,treeAvoid:(x,z)=>z<12&&Math.abs(x)<34,noHills:false,sign:{x:-8,z:16,lines:['부산 해동용궁사','용 조각 답도(실측)','바위 건너기','크기 어림']}},
  npc:[['science',[[-12,10],[-4,10],[-4,16],[-12,16]]]],bounds:[-40,40,-24,30],level:()=>'부산',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a6a';g.fillRect(0,0,300,300);g.fillStyle='#2a6a9a';g.fillRect(0,0,300,Z(-22))}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:20,yaw:Math.PI},size:{}},meta)}
