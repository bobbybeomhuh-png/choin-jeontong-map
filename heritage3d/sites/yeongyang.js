/* 영양 반딧불 마당(2026-11-22, W84): 수비면 반딧불이 생태공원·국제 밤하늘 보호공원, 시골 마을 길과 가로등.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음.
   영양 국제 밤하늘 보호공원: 2015년 아시아에서 처음으로 국제 밤하늘 보호공원이 되었어요. 빛 공해가 적어 별과 반딧불이를 볼 수 있어요.
   놀이: 반딧불 지키는 가로등(마을 건널목은 모두 밝히면서, 반딧불이 사는 물가는 어둡게 두도록 가로등을 켬·갓 씌움·끔으로 고르기, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildYeongyang(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(2015);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x7a9a4a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 const BX=0,BZ=-24;/* 놀이 판 중심 */
 /* 길(십자 둘) */const RD=M(0xc8b890);const road=(x0,z0,x1,z1)=>{const L=Math.hypot(x1-x0,z1-z0);const m=new THREE.Mesh(new THREE.PlaneGeometry(2.4,L),RD);m.rotation.x=-Math.PI/2;m.rotation.z=Math.atan2(-(x1-x0),-(z1-z0));m.position.set((x0+x1)/2,.03,(z0+z1)/2);G.add(m)};
 road(BX-26,BZ-6,BX+26,BZ-6);road(BX-26,BZ+8,BX+26,BZ+8);road(BX-10,BZ-18,BX-10,BZ+18);road(BX+12,BZ-18,BX+12,BZ+18);
 const CROSS=[[BX-10,BZ-6],[BX+12,BZ-6],[BX-10,BZ+8],[BX+12,BZ+8]];
 /* 반딧불이 물가(서식지) */const HAB=[[BX-21,BZ-14],[BX+1,BZ-15],[BX+22,BZ+0],[BX-20,BZ+15],[BX+2,BZ+15]];const habM=[];HAB.forEach(([x,z])=>{const w=new THREE.Mesh(new THREE.CircleGeometry(3.4,20),M(0x3a5a4a,{roughness:.2}));w.rotation.x=-Math.PI/2;w.position.set(x,.04,z);G.add(w);habM.push(w);for(let k=0;k<10;k++){const g=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,1,4),M(0x5a8a3a));g.position.set(x+(r()-.5)*7,.5,z+(r()-.5)*7);G.add(g)}solids.push({cx:x,cz:z,r:3.2,y0:-1,y1:1})});
 /* 가로등 여섯 */const LAMP=[[BX-17,BZ-3],[BX+1,BZ-9],[BX+19,BZ-3],[BX-13,BZ+12],[BX+5,BZ+5],[BX+15,BZ+12]];const lamps=[];
 LAMP.forEach(([x,z])=>{const g=new THREE.Group();g.position.set(x,0,z);const p=new THREE.Mesh(new THREE.CylinderGeometry(.08,.1,4,8),M(0x4a4a50,{metalness:.5}));p.position.y=2;g.add(p);const head=new THREE.Mesh(new THREE.SphereGeometry(.3,10,8),new THREE.MeshStandardMaterial({color:0xfff0c0,emissive:0xffd080,emissiveIntensity:0}));head.position.y=4.1;g.add(head);const shade=new THREE.Mesh(new THREE.ConeGeometry(.55,.45,12,1,true),M(0x2a2a30,{side:THREE.DoubleSide}));shade.position.y=4.3;shade.visible=false;g.add(shade);const L=new THREE.PointLight(0xffd8a0,0,14,1.4);L.position.y=4;g.add(L);G.add(g);solids.push({cx:x,cz:z,r:.25,y0:0,y1:4});lamps.push({g,head,shade,L,mode:0,x,z})});
 /* 반딧불이 */const FF=[];const fT=tex(32,32,(q,w,h)=>{const g=q.createRadialGradient(16,16,0,16,16,16);g.addColorStop(0,'rgba(220,255,120,1)');g.addColorStop(1,'rgba(220,255,120,0)');q.fillStyle=g;q.fillRect(0,0,w,h)});HAB.forEach(([x,z],hi)=>{for(let k=0;k<16;k++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:fT,transparent:true,depthWrite:false,fog:false}));s.scale.set(.45,.45,1);s.userData={hi,a:r()*6.28,R:.5+r()*3.6,h:.4+r()*2,sp:.3+r()*.6,ph:r()*6};G.add(s);FF.push(s)}});
 /* 밤 하늘 돔(놀이 때) */const NV=new THREE.Mesh(new THREE.SphereGeometry(150,20,10),new THREE.MeshBasicMaterial({color:0x060a16,side:THREE.BackSide,fog:false,depthWrite:false}));NV.position.set(BX,0,BZ);NV.visible=false;G.add(NV);const stars=new THREE.Points(new THREE.BufferGeometry(),new THREE.PointsMaterial({color:0xffffff,size:.6,fog:false}));{const n=600,p=new Float32Array(n*3);for(let i=0;i<n;i++){const a=r()*6.28,e=Math.asin(.1+r()*.9);p[i*3]=BX+Math.cos(a)*Math.cos(e)*140;p[i*3+1]=Math.sin(e)*140;p[i*3+2]=BZ+Math.sin(a)*Math.cos(e)*140}stars.geometry.setAttribute('position',new THREE.BufferAttribute(p,3))}stars.visible=false;G.add(stars);
 const RON=9,RSH=4.5,GLARE=13,GSH=5;/* 켬: 길 9m 밝힘·물가 13m까지 방해, 갓: 길 4.5m·물가 5m */
 const lit=(x,z)=>lamps.some(l=>{const d=Math.hypot(l.x-x,l.z-z);return l.mode===0&&d<=RON||l.mode===1&&d<=RSH});const dist=(x,z)=>lamps.some(l=>{const d=Math.hypot(l.x-x,l.z-z);return l.mode===0&&d<=GLARE||l.mode===1&&d<=GSH});
 const applyLamps=(on)=>lamps.forEach(l=>{const k=on?(l.mode===0?1:l.mode===1?.45:0):0;l.head.material.emissiveIntensity=k*2;l.L.intensity=k*30;l.L.distance=l.mode===1?6:16;l.shade.visible=l.mode===1});
 let nk=0,tt=0,game=false;const nightTick=dt=>{tt+=dt;const n=game||!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);if(!game){lamps.forEach(l=>{l.head.material.emissiveIntensity=nk*2;l.L.intensity=nk*30})}
  for(const s of FF){const u=s.userData;u.a+=dt*u.sp;const[x,z]=HAB[u.hi];s.position.set(x+Math.cos(u.a)*u.R,u.h+Math.sin(tt*1.3+u.ph)*.3,z+Math.sin(u.a*1.3)*u.R);const blink=.5+.5*Math.sin(tt*3+u.ph);const ok=!game||!dist(x,z);s.material.opacity=(game?1:nk)*(ok?blink:blink*.08);s.visible=s.material.opacity>.02}};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(BX,BZ+20,3.2,'영양 반딧불이 생태공원','2015년 아시아에서 처음 국제 밤하늘 보호공원이 된 곳이에요. 빛 공해가 적어 밤에 반딧불이와 별을 볼 수 있어요. 간추려 지었어요.');
 sp(BX+4,BZ+21,2,'가로등 손보는 자리','건널목은 모두 밝히고, 반딧불이 물가는 어둡게 지켜 봐요.');
 sp(-60,40,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 반딧불 지키는 가로등(11/22): 세 판(가로등 자리가 판마다 조금씩 달라요). 가로등을 눌러 켬 → 갓 씌움 → 끔. 건널목 넷이 모두 밝아야 하고, 어두운 물가가 많을수록 좋아요(가장 좋은 답과 견줌) */
 window.__YYLAMP=()=>{if(document.getElementById('yyP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(BX+4,BZ+21,0)}catch(e){}
  const CAM=[BX,66,BZ+40,BX,0,BZ+1,56];window.__GCAM=()=>document.getElementById('yyP')?CAM:null;game=true;NV.visible=true;stars.visible=true;const SC=G.parent;const saved=[];let envS=null;if(SC){SC.traverse(o=>{if(o.isLight&&!G.getObjectById(o.id)){saved.push([o,o.intensity]);o.intensity*=.08}});envS=SC.environment;SC.environment=null}
  let rd=0,best=0,bestM=[],done=false,auto=false,last=performance.now(),msg='',phase='set',wait=0,at=0;const res=[];
  const score=()=>({lit:CROSS.filter(([x,z])=>lit(x,z)).length,dark:HAB.filter(([x,z])=>!dist(x,z)).length});
  const solve=()=>{let b=-1,bm=null;const n=lamps.length;for(let m=0;m<3**n;m++){let t=m;lamps.forEach(l=>{l.mode=t%3;t=Math.floor(t/3)});const s=score();if(s.lit===4&&s.dark>b){b=s.dark;bm=lamps.map(l=>l.mode)}}return[b,bm]};
  const newRound=()=>{for(let k=0;k<30;k++){lamps.forEach((l,i)=>{const[x,z]=LAMP[i];l.x=x+(Math.random()-.5)*rd*3*(k<20?1:0);l.z=z+(Math.random()-.5)*rd*3*(k<20?1:0);l.g.position.set(l.x,0,l.z)});[best,bestM]=solve();if(best>=0)break}lamps.forEach(l=>l.mode=0);applyLamps(true);phase='set';msg=`${rd+1}판: 가로등을 눌러 바꿔요(켬→갓→끔)`};
  const d=document.createElement('div');d.id='yyP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#0a1220;border:3px solid #d8f080;border-radius:16px;padding:9px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#eef4e0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:300px;max-width:94vw;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">✨ 반딧불 지키는 가로등</b><div data-i style="margin:3px 0;font:14px 'Do Hyeon',sans-serif"></div><div style="font-size:11.5px;color:#c8d8b0">켬: 길 넓게 밝힘, 물가 멀리까지 눈부심 · 갓: 바로 밑만 밝힘 · 끔: 어둠</div><button data-ok style="width:100%;margin-top:7px;font:16px 'Do Hyeon',sans-serif;background:#d8f080;color:#0a1220;border:0;border-radius:10px;padding:9px 0;cursor:pointer">이대로 밤을 지내요</button><div data-m style="font-size:12px;color:#f8e8a0;margin-top:4px"></div>`;
  const iEl=d.querySelector('[data-i]'),mEl=d.querySelector('[data-m]');
  const snd=(f,len,type='sine',v=.05)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(v,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const cyc=i=>{if(phase!=='set')return;lamps[i].mode=(lamps[i].mode+1)%3;applyLamps(true);snd([660,520,380][lamps[i].mode],.06,'triangle',.04)};
  const ok=()=>{if(phase!=='set')return;const s=score();if(s.lit<4){msg=`건널목 ${4-s.lit}곳이 어두워요. 길을 밝혀요`;snd(200,.25,'sawtooth',.03);return}const sc=Math.min(1,s.dark/Math.max(1,best));res.push(sc);msg=s.dark>=best?`반딧불 물가 ${s.dark}곳이 어두워요! 가장 좋은 답이에요`:`어두운 물가 ${s.dark}곳(가장 좋은 답은 ${best}곳)`;snd(sc>=1?780:400,.35);phase='wait';wait=2.4};d.querySelector('[data-ok]').onclick=ok;
  const pc=new THREE.PerspectiveCamera(CAM[6],innerWidth/innerHeight,.1,500);const rc=new THREE.Raycaster();const plane=new THREE.Plane(new THREE.Vector3(0,1,0),0);
  const ov=document.createElement('div');ov.id='yyO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  ov.onpointerdown=e=>{pc.aspect=innerWidth/innerHeight;pc.position.set(CAM[0],CAM[1],CAM[2]);pc.lookAt(CAM[3],CAM[4],CAM[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const v=new THREE.Vector3();if(!rc.ray.intersectPlane(plane,v))return;let bi=-1,bd=3.5;lamps.forEach((l,i)=>{const dd=Math.hypot(l.x-v.x,l.z-v.z);if(dd<bd){bd=dd;bi=i}});if(bi>=0)cyc(bi)};
  /* 건널목 표시 */const marks=CROSS.map(([x,z])=>{const m=new THREE.Mesh(new THREE.RingGeometry(1.1,1.4,24),new THREE.MeshBasicMaterial({color:0xff6040,fog:false}));m.rotation.x=-Math.PI/2;m.position.set(x,.08,z);G.add(m);return m});
  const cleanup=()=>{saved.forEach(([o,i])=>o.intensity=i);if(SC)SC.environment=envS;ov.remove();game=false;NV.visible=false;stars.visible=false;marks.forEach(m=>G.remove(m));lamps.forEach((l,i)=>{l.mode=0;l.shade.visible=false;l.L.distance=14;[l.x,l.z]=LAMP[i];l.g.position.set(l.x,0,l.z)})};
  newRound();
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   marks.forEach((m,k)=>m.material.color.setHex(lit(...CROSS[k])?0x60ff80:0xff6040));
   if(phase==='set'&&auto){at+=dt;if(at>.25){at=0;const i=lamps.findIndex((l,k)=>l.mode!==bestM[k]);if(i>=0)cyc(i);else ok()}}
   if(phase==='wait'){wait-=dt;if(wait<=0){rd++;if(rd>=3){fin();return}newRound()}}
   const s=score();iEl.textContent=`${Math.min(rd+1,3)} / 3판 · 밝은 건널목 ${s.lit}/4 · 어두운 물가 ${s.dark}/5`;mEl.textContent=msg;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('yeongyang_lamp',Q,'반딧불 지키는 가로등')}catch(e){}window.__YYQ=Q;snd(660,.4);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">반딧불이 밤을 지켰어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">반딧불이는 빛으로 짝을 찾아서, 밤이 너무 밝으면 짝을 못 찾아요. 영양은 가로등에 갓을 씌우고 빛을 아래로만 비추게 해 밤하늘을 지켜요.</div><div style="font-size:24px;color:#d8f080">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#d8f080;color:#0a1220;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef4e0;border:2px solid #eef4e0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__YYLAMP()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__YYG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('반딧불이를 지켜요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'고추 씨 단지',h:'영양 고추 씨를 담던 작은 단지예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.08,10,8),M(0x8a5a3a)))})},
  {n:'호롱',h:'밤길을 밝히던 호롱이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.04,.05,.1,10),M(0x6a6a70,{metalness:.5})))})},
  {n:'백자 접시',h:'조선 백자 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'짚신',h:'밤길 걷던 짚신이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.24,.03,.09),M(0xc8a860)))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__YYDIG=()=>{window.__DETECT&&window.__DETECT({key:'yeongyang_dig',title:'영양 발굴 탐지',emoji:'⛏️',bg:'#0a1220',count:4,TL:150,cand:[[-60,40],[-30,40],[30,40],[60,10],[-60,-30],[50,-50],[-40,0],[40,20]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'영양은 반딧불이와 밤하늘의 고장이에요.'})};
 const meta={quest:{t:'영양 반딧불 둘러보기',d:'반딧불이 생태공원 마을을 둘러보세요.',steps:[['생태공원','영양 반딧불이 생태공원']]},
  title:'영양 반딧불이·밤하늘 보호공원',hint:'반딧불이 생태공원 마을을 공개 사진으로 간추려 지었어요. 길은 밝히고 반딧불이 물가는 어둡게 가로등을 골라 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-8,z:14,lines:['영양','반딧불이 생태공원','국제 밤하늘 보호공원','간추려 지음']}},
  npc:[['science',[[-12,6],[-4,6],[-4,18],[-12,18]]]],bounds:[-90,80,-70,60],level:()=>'영양',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#7a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#3a5a4a';HAB.forEach(([x,z])=>{g.beginPath();g.arc(X(x),Z(z),3.4*S,0,7);g.fill()});g.fillStyle='#ffd080';LAMP.forEach(([x,z])=>g.fillRect(X(x)-2,Z(z)-2,4,4))}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:22,yaw:Math.PI},size:{}},meta)}
