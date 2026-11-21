/* 태안 마도 앞바다 수중 발굴 마당(2026-11-21).
   공개 실측(국가유산청 KHS_Asset 「해양 문화유산 재현」 CC BY, 실제 크기): 청자 상감 국화모란 유로죽문 매병(보물, 마도2호선), 청자 퇴화문 두꺼비 모양 벼루(보물, 태안 대섬), 마도1호선 쌀가마니·항아리·대바구니·도자기 묶음.
   태안 마도 앞바다는 고려 때 세곡·공물을 싣고 개경으로 가던 배가 자주 가라앉던 「안흥량」 뱃길이에요. 2007년 주꾸미가 끌어올린 청자로 태안선이 발견된 뒤 마도 1~4호선이 차례로 발굴됐어요.
   배와 바닷가는 공개 사진·수치로 간추려 지음(마도1호선 길이 약 10.8m·너비 약 3.7m). 놀이: 수중 발굴(펄을 걷어 내고 유물을 끌어올리기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
import {placeHanok} from './hanokkit.js';
export function buildTaean(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(3617);
 const TOUCH=opts.touch!=null?!!opts.touch:matchMedia('(pointer:coarse)').matches;
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 서쪽(x<0)이 뭍, 동쪽이 바다. 바닷바닥은 x 8부터 내려가 x 24 너머 -10m */
 const SHORE=0;const ss=t=>t<=0?0:t>=1?1:t*t*(3-2*t);
 const H=(x,z)=>x<SHORE?0:-10*ss((x-SHORE)/22);
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[50,50]);
  const g=new THREE.PlaneGeometry(220,200,110,100);g.rotateX(-Math.PI/2);g.translate(10,0,0);const p=g.attributes.position;const col=[];const c=new THREE.Color();
  for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);const h=H(x,z)+(x>SHORE?(r()-.5)*.25:0);p.setY(k,h);c.set(x<-14?'#7a9a4a':x<SHORE+1?'#e0d0a8':'#8a7a5a');col.push(c.r,c.g,c.b)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1}));m.receiveShadow=true;G.add(m)}
 /* 바다 물낯(반투명) */const WT=tex(256,256,(q,w,h)=>{q.fillStyle='#3a7a8a';q.fillRect(0,0,w,h);for(let i=0;i<220;i++){q.strokeStyle=`rgba(230,245,250,${.08+r()*.14})`;q.lineWidth=1+r()*2;const x=r()*w,y=r()*h;q.beginPath();q.moveTo(x,y);q.lineTo(x+18+r()*20,y);q.stroke()}},[10,10]);WT.wrapS=WT.wrapT=THREE.RepeatWrapping;
 const sea=new THREE.Mesh(new THREE.PlaneGeometry(120,200),new THREE.MeshStandardMaterial({map:WT,roughness:.1,metalness:.15,transparent:true,opacity:.62,depthWrite:false}));sea.rotation.x=-Math.PI/2;sea.position.set(SHORE+60,-.4,0);sea.renderOrder=2;G.add(sea);
 /* 잔교 + 발굴 바지선(갑판 y 1.2) */const BX=34,BZ=0,DECK=1.2;const wd=M(0x8a6a48),st=M(0x6a6e74,{roughness:.6});
 {const pier=new THREE.Mesh(new THREE.BoxGeometry(BX-6-SHORE+2,.25,2.6),wd);pier.position.set((SHORE-2+BX-6)/2,DECK-.12,BZ);G.add(pier);for(let x=SHORE+2;x<BX-6;x+=4)for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,12,6),wd);p.position.set(x,DECK-6,BZ+s*1.2);G.add(p)}
  const barge=new THREE.Mesh(new THREE.BoxGeometry(14,1.6,9),st);barge.position.set(BX,DECK-.8,BZ);G.add(barge);cam.push(barge);
  const crane=new THREE.Group();crane.position.set(BX+5,DECK,BZ+3);const cp=new THREE.Mesh(new THREE.BoxGeometry(.5,6,.5),M(0xe8a020));cp.position.y=3;crane.add(cp);const arm=new THREE.Mesh(new THREE.BoxGeometry(.35,.35,7),M(0xe8a020));arm.position.set(0,6,-3.2);crane.add(arm);const rope=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,6,4),M(0x222222));rope.position.set(0,3,-6.4);crane.add(rope);G.add(crane);
  const hut=new THREE.Mesh(new THREE.BoxGeometry(4,2.6,3),M(0xf0f0ea));hut.position.set(BX-3.5,DECK+1.3,BZ-2.6);G.add(hut);solids.push({x0:BX-5.5,x1:BX-1.5,y0:0,y1:4,z0:BZ-4.1,z1:BZ-1.1});
  solids.push({x0:BX+4.6,x1:BX+5.4,y0:0,y1:8,z0:BZ+2.6,z1:BZ+3.4});
  /* 바다 막기: 잔교·바지선만 걸을 수 있게 */solids.push({x0:SHORE+1.5,x1:BX-7,y0:-20,y1:30,z0:-200,z1:BZ-1.3},{x0:SHORE+1.5,x1:BX-7,y0:-20,y1:30,z0:BZ+1.3,z1:200},{x0:BX-7,x1:BX+7,y0:-20,y1:30,z0:-200,z1:BZ-4.5},{x0:BX-7,x1:BX+7,y0:-20,y1:30,z0:BZ+4.5,z1:200},{x0:BX+7,x1:200,y0:-20,y1:30,z0:-200,z1:200});
  /* 바지선 둘레 펜스 */for(const s of[-1,1]){const rl=new THREE.Mesh(new THREE.BoxGeometry(14,.08,.08),M(0xd0d0d0));rl.position.set(BX,DECK+1,BZ+s*4.5);G.add(rl)}}
 const barAt=(x,z)=>{if(x>BX-7&&x<BX+7&&Math.abs(z-BZ)<4.5)return DECK;if(x>SHORE-2&&x<=BX-6&&Math.abs(z-BZ)<1.3)return DECK;return 0};
 /* 바닷바닥 난파선(마도1호선처럼 평저선): 바지선 아래 */const WX=BX,WZ=BZ+1,WY=-10;const wreck=new THREE.Group();wreck.position.set(WX,WY,WZ);wreck.rotation.y=Math.PI/2+.25;G.add(wreck);
 {const pm=M(0x4a3a28,{roughness:1});for(let i=0;i<5;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(10.8-i*.3,.18,.62),pm);b.position.set(0,.1,-1.4+i*.7);wreck.add(b)}for(const s of[-1,1])for(let k=0;k<3;k++){const b=new THREE.Mesh(new THREE.BoxGeometry(10.2-k*.6,.5,.14),pm);b.position.set(0,.4+k*.42,s*(1.75+k*.08));b.rotation.x=s*.25;if(!(s>0&&k==2))wreck.add(b)}for(let i=-4;i<=4;i+=2){const rb=new THREE.Mesh(new THREE.BoxGeometry(.2,.2,3.6),pm);rb.position.set(i,.4,0);wreck.add(rb)}
  const weeds=new THREE.InstancedMesh(new THREE.ConeGeometry(.08,.9,4),M(0x3a5a2a),120);const o=new THREE.Object3D();for(let k=0;k<120;k++){o.position.set((r()-.5)*24,.45,(r()-.5)*16);o.rotation.z=(r()-.5)*.4;o.updateMatrix();weeds.setMatrixAt(k,o.matrix)}wreck.add(weeds)}
 /* 유물(실측): 바닷바닥 놀이용 + 뭍 전시용 */
 const ART=[['celadon','청자 상감 매병','보물. 마도2호선에서 나왔어요. 목에 대나무 꼬리표(죽찰)가 달려 있어 꿀·참기름을 담아 개경의 관리에게 보낸 것임을 알 수 있어요.',-3.6,-.6],['toadinkstone','두꺼비 모양 청자 벼루','보물. 태안 대섬 앞바다 태안선에서 나왔어요. 두꺼비가 고개를 든 모양이에요.',-1.4,.9],['ricebag','쌀가마니','마도1호선에 실린 세곡이에요. 볍씨와 쌀이 그대로 남아 있었어요.',1,-.7],['jar','항아리','젓갈이나 장을 담아 나르던 항아리예요. 마도1호선.',2.8,.8],['backeta','대바구니','곡식이나 물건을 담던 대바구니예요. 마도1호선.',4.2,-.4],['bowlbundle','도자기 묶음','청자 사발을 포개어 끈으로 묶어 실었어요. 마도1호선.',-.2,0]];
 const ARTO=[];const AL=new GLTFLoader();{const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');AL.setDRACOLoader(dr)}
 const loadArt=(k,cb)=>AL.load(new URL('../models/taean/'+k+'.glb',import.meta.url).href,m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;if(e.material){e.material.transparent=false;e.material.alphaTest=0}}});const b=new THREE.Box3().setFromObject(o);const c=b.getCenter(new THREE.Vector3());o.position.set(-c.x,-b.min.y,-c.z);const w=new THREE.Group();w.add(o);w.userData.noBatch=true;cb(w)},undefined,()=>{});
 if(!mini){ART.forEach(([k,n,h,lx,lz],i)=>{const g=new THREE.Group();g.position.set(lx,.2,lz);g.userData.k=k;g.userData.n=n;g.userData.h=h;wreck.add(g);ARTO.push(g);loadArt(k,w=>g.add(w))})}
 /* 뭍: 해양유물 전시 누각 + 진열대(실측 유물 전시) */const EX=-18,EZ=-14;
 {const fl=new THREE.Mesh(new THREE.BoxGeometry(14,.4,7),M(0xb8b0a0));fl.position.set(EX,.2,EZ);G.add(fl);const rf=new THREE.Mesh(new THREE.BoxGeometry(15,.3,8),M(0x40464e));rf.position.set(EX,4,EZ);G.add(rf);for(const dx of[-6.5,0,6.5])for(const dz of[-3,3]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,3.6,8),M(0x8a5a38));p.position.set(EX+dx,2.2,EZ+dz);G.add(p);solids.push({cx:EX+dx,cz:EZ+dz,r:.25,y0:0,y1:4})}
  if(!mini)ART.forEach(([k],i)=>{const x=EX-5+i*2,z=EZ-1.6;const ped=new THREE.Mesh(new THREE.BoxGeometry(1.3,.9,1),M(0xe8e0d0));ped.position.set(x,.85,z);G.add(ped);solids.push({x0:x-.65,x1:x+.65,y0:0,y1:1.3,z0:z-.5,z1:z+.5});loadArt(k,w=>{const s=k=='ricebag'||k=='bowlbundle'?1:1.2;w.scale.setScalar(s);w.position.set(x,1.3,z);G.add(w)})})}
 /* 바닷가 소나무·바위·집 */{const tm=M(0x5a3a28),lm=M(0x2f5a2a);for(let i=0;i<26;i++){const x=-90+r()*70,z=-90+r()*180;if(Math.abs(x-EX)<10&&Math.abs(z-EZ)<8)continue;if(x>-12&&Math.abs(z)<20)continue;const t=new THREE.Mesh(new THREE.CylinderGeometry(.2,.32,6,6),tm);t.position.set(x,3,z);t.rotation.z=(r()-.5)*.3;G.add(t);for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(1.8-k*.4,1.2,7),lm);c.position.set(x+(r()-.5),5+k*.9,z+(r()-.5));c.scale.y=.6;G.add(c)}solids.push({cx:x,cz:z,r:.35,y0:0,y1:6})}
  const rm=M(0x7a7468,{flatShading:true});for(let i=0;i<14;i++){const z=-90+i*13+(r()-.5)*4;if(Math.abs(z)<5)continue;const s=new THREE.Mesh(new THREE.DodecahedronGeometry(1+r()*1.6,0),rm);s.position.set(SHORE+1+r()*3,-.3,z);G.add(s)}}
 if(!mini){for(const[k,x,z,ry]of[['choga1',-40,24,Math.PI],['choga2',-56,8,Math.PI/2],['sarang',-44,-40,0]])placeHanok(G,solids,k,x,z,ry,{TOUCH,s:.7})}
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[BX,DECK+3,BZ],[EX,3.4,EZ],[SHORE+10,DECK+2,BZ],[-40,3,20]]){const L=new THREE.PointLight(0xffc080,0,20,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0,tt=0;const nightTick=dt=>{tt+=dt;const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7;WT.offset.x+=dt*.01;WT.offset.y+=dt*.006;sea.position.y=-.4+Math.sin(tt*.8)*.05};
 /* 안내 */const sp=(x,z,rr,t,h,y)=>spots.push({x,y:y!=null?y:Math.max(0,H(x,z)),z,r:rr,t,h});
 sp(BX-2,BZ+3,2.2,'수중 발굴 바지선','이 아래 바닷바닥에 고려 배가 가라앉아 있어요. 잠수해서 유물을 끌어올려 봐요.',DECK);
 sp(EX,EZ+2.4,3,'바다에서 건진 유물','국가유산청이 공개한 실측(CC BY)을 실제 크기로 옮겼어요. 왼쪽부터 매병·두꺼비 벼루·쌀가마니·항아리·대바구니·도자기 묶음.');
 sp(SHORE-3,BZ-6,3,'안흥량 뱃길','태안 앞바다는 물살이 거세고 암초가 많아 세곡선이 자주 가라앉던 「안흥량」이에요. 2007년 주꾸미 빨판에 붙어 올라온 청자로 태안선이 발견됐어요.');
 sp(-30,10,2.4,'발굴 탐지 자리','바닷가 땅속에도 옛 사람들의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 수중 발굴(11/21): 바닷바닥 유물 여섯 점. 한 번 누르면 펄을 걷어 내고, 다시 누르면 끌어올려요. 공기는 90초 */
 const DCAM=[WX-1.5,WY+5.5,WZ+7.5,WX,WY+.3,WZ-.5,55];const tintM=new THREE.Mesh(new THREE.SphereGeometry(3,16,10),new THREE.MeshBasicMaterial({color:0x1e6a8a,transparent:true,opacity:.38,side:THREE.BackSide,depthTest:false,depthWrite:false}));tintM.renderOrder=99;tintM.position.set(DCAM[0],DCAM[1],DCAM[2]);tintM.visible=false;G.add(tintM);
 window.__TADIVE=()=>{if(document.getElementById('taP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(BX-2,BZ+3,0)}catch(e){}
  const tint=document.createElement('div');tint.id='taTint';tint.style.cssText="position:fixed;inset:0;z-index:55;pointer-events:none;background:radial-gradient(ellipse at 50% 30%,rgba(60,140,170,.18),rgba(10,40,70,.55));";document.body.appendChild(tint);
  sea.material.opacity=.25;tintM.visible=true;window.__GCAM=()=>document.getElementById('taP')?DCAM:null;
  const mud=[];ARTO.forEach((g,i)=>{g.visible=true;g.position.y=.2;g.userData.st=i%2?1:0;if(g.userData.st){const m=new THREE.Mesh(new THREE.SphereGeometry(.6,12,8,0,Math.PI*2,0,Math.PI/2),M(0x6a5a40));m.scale.set(1,.55,1);m.position.copy(g.position);wreck.add(m);g.userData.mud=m;mud.push(m)}});
  let n=0,done=false,finAt=0,t0=performance.now()/1000;const N=ARTO.length,TL=90;const rising=[];
  const d=document.createElement('div');d.id='taP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#0e2a3a;border:3px solid #5ac0d8;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#e8f6fa;box-shadow:0 6px 18px rgba(0,0,0,.35);width:240px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#9ae0f0">🤿 수중 발굴</b><div id="taS" style="font:19px 'Do Hyeon',sans-serif;margin:4px 0">0 / ${N}점</div><div style="font-size:12px;text-align:left">공기</div><div style="height:12px;background:#223;border-radius:6px;overflow:hidden"><div id="taA" style="height:100%;width:100%;background:#5ac0d8"></div></div><div id="taG" style="font-size:13px;color:#9ae0f0;margin:6px 0">바닷바닥의 유물을 눌러요. 펄에 묻힌 건 한 번 더!</div>`;
  const Sx=d.querySelector('#taS'),A=d.querySelector('#taA'),Gd=d.querySelector('#taG');
  const snd=(f,len,type='sine')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);o.frequency.exponentialRampToValueAtTime(f*1.6,s+len);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const pc=new THREE.PerspectiveCamera(DCAM[6],innerWidth/innerHeight,.1,500);pc.position.set(DCAM[0],DCAM[1],DCAM[2]);pc.lookAt(DCAM[3],DCAM[4],DCAM[5]);pc.updateMatrixWorld();const rc=new THREE.Raycaster();
  const hit=g=>{if(done||!g||g.userData.up)return;if(g.userData.st===1){g.userData.st=0;const m=g.userData.mud;if(m)wreck.remove(m);snd(220,.3,'triangle');Gd.textContent='펄을 걷어 냈어요! 한 번 더 눌러 끌어올려요';return}g.userData.up=true;rising.push(g);n++;snd(500,.4);Sx.textContent=n+' / '+N+'점';Gd.textContent=g.userData.n+' — '+g.userData.h;if(n>=N)finAt=performance.now()/1000+1.2};
  const pick=(cx,cy)=>{pc.aspect=innerWidth/innerHeight;pc.updateProjectionMatrix();rc.setFromCamera(new THREE.Vector2(cx/innerWidth*2-1,-(cy/innerHeight)*2+1),pc);const objs=[];ARTO.forEach(g=>{if(!g.userData.up)objs.push(g)});let best=null,bd=1e9;for(const g of objs){const p=new THREE.Vector3();g.getWorldPosition(p);p.y+=.25;const q=p.clone().project(pc);const dx=(q.x+1)/2*innerWidth-cx,dy=(1-q.y)/2*innerHeight-cy;const dd=Math.hypot(dx,dy);if(dd<bd){bd=dd;best=g}}if(best&&bd<Math.max(60,innerWidth*.07))hit(best)};
  const onDown=e=>{if(e.target.closest&&e.target.closest('#taP'))return;pick(e.clientX,e.clientY)};addEventListener('pointerdown',onDown);
  const cleanup=()=>{removeEventListener('pointerdown',onDown);tint.remove();tintM.visible=false;sea.material.opacity=.62;for(const m of mud)wreck.remove(m);ARTO.forEach(g=>{g.position.y=.2;g.visible=true;g.userData.up=false})};
  const fin=()=>{if(done)return;done=true;const el=performance.now()/1000-t0;const Q=n>=N?Math.max(65,Math.round(100-Math.max(0,el-40)*.8)):Math.round(n/N*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('taean_dive',Q,'태안 수중 발굴')}catch(e){}window.__TAQ=Q;cleanup();
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#9ae0f0">${n>=N?'유물을 다 건졌어요!':'유물 '+n+'점을 건졌어요'}</b><div style="font-size:13px;margin:4px 0">바닷속 펄이 산소를 막아 준 덕에 800년 넘은 배와 짐, 대나무 꼬리표 글씨까지 남았어요. 꼬리표로 누가 누구에게 보낸 짐인지 알 수 있어요.</div><div style="font-size:26px;color:#5ac0d8">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#5ac0d8;color:#0e2a3a;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#e8f6fa;border:2px solid #e8f6fa;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__TADIVE(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},500)};
  let last=t0;const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}const now=performance.now()/1000,dt=Math.min(.1,now-last);last=now;for(const g of rising){if(g.position.y<11)g.position.y+=dt*3;else g.visible=false}
   if(!done&&finAt&&now>=finAt)fin();
   if(!done){const left=Math.max(0,TL-(now-t0));A.style.width=(left/TL*100)+'%';A.style.background=left<20?'#e85a3a':'#5ac0d8';if(left<=0){Gd.textContent='공기가 다 됐어요! 올라가요';fin()}}requestAnimationFrame(loop)};loop();
  window.__TAG={hit,arts:ARTO,pick,get n(){return n}};try{ctx.say('바닷바닥의 고려 배를 찾아 내려가요!',2.2)}catch(e){}};
 /* 발굴 탐지(뭍) */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'대나무 꼬리표(죽찰)',h:'짐에 달던 대나무 꼬리표예요. 받는 사람과 물건 이름을 먹으로 썼어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.04,.26,.01),M(0xc8a860)))})},
  {n:'청자 사발',h:'포개어 실어 나르던 청자 사발이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.1,.12,16,1,true),M(0x8ab0a0,{side:THREE.DoubleSide,roughness:.3})))})},
  {n:'닻돌',h:'옛 배의 닻에 매달던 무거운 돌이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.3,.1,.12),M(0x6a6a6a)))})},
  {n:'볍씨',h:'세곡으로 싣던 볍씨예요.',mk:mk(g=>{for(let i=0;i<10;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(.025,6,4),M(0xb08a40));m.scale.set(1.6,.8,.8);m.position.set((Math.random()-.5)*.2,0,(Math.random()-.5)*.2);g.add(m)}})},
  {n:'상평통보',h:'바닷가 장터에서 쓰던 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__TADIG=()=>{window.__DETECT&&window.__DETECT({key:'taean_dig',title:'태안 발굴 탐지',emoji:'⛏️',bg:'#0e2a3a',count:4,TL:150,cand:[[-30,10],[-50,-20],[-20,30],[-60,40],[-36,-60],[-70,-6],[-26,-34],[-80,20]],items:ITEMS,intro:'태안 바닷가 땅속에도 옛 뱃사람들의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'태안 앞바다는 고려·조선의 세곡선이 오가던 큰 뱃길이었어요.'})};
 const meta={quest:{t:'태안 앞바다 둘러보기',d:'바다에서 건진 유물을 보고 수중 발굴 바지선에 올라 보세요.',steps:[['전시','바다에서 건진 유물'],['뱃길','안흥량 뱃길'],['바지선','수중 발굴 바지선']]},
  title:'태안 마도 수중 발굴',hint:'바다에서 건진 고려 유물은 국가유산청 공개 실측(CC BY)이에요. 바지선에서 잠수해 난파선의 유물을 끌어올려 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,groundY:-12,sign:{x:-8,z:6,lines:['태안 마도 수중 발굴','안흥량 뱃길','고려 난파선 · 바다 유물','실측 + 간추려 지음']}},
  npc:[['science',[[-10,6],[-4,6],[-4,14],[-10,14]]]],bounds:[-100,BX+7,-100,100],level:()=>'태안',camCap:()=>Infinity,baseAt:(x,z)=>Math.max(barAt(x,z),x<SHORE+1.5?0:-10),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.3,ox:-5,oz:0,draw(g,X,Z,S){g.fillStyle='#7a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#e0d0a8';g.fillRect(X(-14),0,14*S,300);g.fillStyle='#3a7a8a';g.fillRect(X(SHORE),0,300,300);g.fillStyle='#8a6a48';g.fillRect(X(SHORE),Z(BZ)-2,(BX-6)*S,4);g.fillStyle='#6a6e74';g.fillRect(X(BX-7),Z(BZ-4.5),14*S,9*S);g.fillStyle='#b8b0a0';g.fillRect(X(EX-7),Z(EZ-3.5),14*S,7*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-8,z:10,yaw:-Math.PI/2},size:{}},meta)}
