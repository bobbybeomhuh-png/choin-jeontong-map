/* 홍천·횡성 마당(2026-11-22, W56)
   실측: 홍천 괘석리 사사자 삼층석탑(고려, 보물. lacomi1975 공개 실측 CC BY, 둘레 땅을 잘라내고 높이 약 3.2m 그대로). 소달구지(국가유산청 KHS 공개 실측 「Cart」, CC BY).
   홍천 수타사(대적광전), 횡성 들판(한우의 고장)은 공개 사진으로 간추려 지음.
   놀이: 소 쟁기질(소가 밭고랑 끝 둑에 닿기 전에 「워!」로 멈추기, 소는 바로 서지 못하고 조금 더 걸어요), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildHongcheon(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1971);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x7a9a48,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 괘석리 석탑 자리: 잔디 마당 + 낮은 돌 테두리 */const PX=0,PZ=-12;{const lawn=new THREE.Mesh(new THREE.CircleGeometry(6,32),M(0x6a9a3a));lawn.rotation.x=-Math.PI/2;lawn.position.set(PX,.03,PZ);G.add(lawn);const rim=new THREE.Mesh(new THREE.TorusGeometry(3,.12,6,32),M(0xa8a296));rim.rotation.x=Math.PI/2;rim.position.set(PX,.1,PZ);G.add(rim);solids.push({cx:PX,cz:PZ,r:2.2,y0:0,y1:3.3})}
 /* 횡성 들판: 동쪽 밭(고랑 여섯) + 둑 */const FX=30,FZ=-4,FL=16,ROWS=6,RS=2.2;const furrows=[];{const soil=new THREE.Mesh(new THREE.BoxGeometry(FL+4,.1,ROWS*RS+2),M(0x8a6a48,{roughness:1}));soil.position.set(FX+FL/2,.05,FZ+(ROWS-1)*RS/2);G.add(soil);const bank=new THREE.Mesh(new THREE.BoxGeometry(1,.6,ROWS*RS+3),M(0x6a8a3a));bank.position.set(FX+FL+.6,.3,FZ+(ROWS-1)*RS/2);G.add(bank);const line=new THREE.Mesh(new THREE.BoxGeometry(.08,.04,ROWS*RS+2),M(0xf8f0d0));line.position.set(FX+FL,.12,FZ+(ROWS-1)*RS/2);G.add(line);
  for(let i=0;i<ROWS;i++){const f=new THREE.Mesh(new THREE.BoxGeometry(1,.06,.5),M(0x4a3424));f.position.set(FX,.12,FZ+i*RS);f.scale.x=.001;G.add(f);furrows.push(f)}solids.push({x0:FX-2,x1:FX+FL+2,y0:0,y1:.6,z0:FZ-1.6,z1:FZ+(ROWS-1)*RS+1.6})}
 /* 소 + 쟁기 */const ox=new THREE.Group();{const OM=M(0xa86a30);const b=new THREE.Mesh(new THREE.BoxGeometry(2,1,.8),OM);b.position.y=1.1;ox.add(b);for(const[lx,lz]of[[-.75,-.28],[-.75,.28],[.75,-.28],[.75,.28]]){const l=new THREE.Mesh(new THREE.BoxGeometry(.18,.7,.18),OM);l.position.set(lx,.35,lz);ox.add(l)}const hd=new THREE.Mesh(new THREE.BoxGeometry(.6,.5,.5),OM);hd.position.set(1.25,1.3,0);ox.add(hd);for(const s of[-1,1]){const hn=new THREE.Mesh(new THREE.ConeGeometry(.05,.3,6),M(0xe8e0c8));hn.position.set(1.3,1.65,s*.2);hn.rotation.x=s*.6;ox.add(hn)}const yoke=new THREE.Mesh(new THREE.BoxGeometry(.12,.12,1),M(0x6a4a30));yoke.position.set(.9,1.65,0);ox.add(yoke);const pole=new THREE.Mesh(new THREE.BoxGeometry(2.6,.08,.08),M(0x6a4a30));pole.position.set(-1.5,.7,0);pole.rotation.z=.25;ox.add(pole);const share=new THREE.Mesh(new THREE.ConeGeometry(.12,.4,4),M(0x4a4a4a,{metalness:.5}));share.rotation.z=Math.PI/2;share.position.set(-2.7,.1,0);ox.add(share);const man=new THREE.Group();const mb=new THREE.Mesh(new THREE.CylinderGeometry(.2,.26,1.1,8),M(0xe8e0d0));mb.position.y=.55;man.add(mb);const mh=new THREE.Mesh(new THREE.SphereGeometry(.16,10,8),M(0xe0b890));mh.position.y=1.25;man.add(mh);man.position.set(-3.4,0,0);ox.add(man)}
 ox.position.set(FX,0,FZ);G.add(ox);
 /* 수타사: 북쪽 대적광전 */const SX=-6,SZ=-44;if(!mini){const h=buildHall({x:SX,z:SZ,ry:0,W:11,D:7,nx:3,nz:2,FY:1,PH:3.4,roof:'gable',name:'大寂光殿',pillar:0x9a3a26,bracket:'dapo',front:'door',roofScale:1,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 {for(let k=0;k<24;k++){const t=new THREE.Mesh(new THREE.ConeGeometry(1.4,5,7),M(k%5?0x2a4a24:0xc86a24));t.position.set(SX-26+r()*52,2.5,SZ-10-r()*14);G.add(t)}}
 /* 실측 3D */if(!mini){const L=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');L.setDRACOLoader(dr);const prep=(m,mode)=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;if(e.material){e.material.transparent=false;e.material.alphaTest=0;e.material.side=THREE.DoubleSide}}});const b=new THREE.Box3().setFromObject(o);const c=b.getCenter(new THREE.Vector3());o.position.set(-c.x,mode==='keep'?0:-b.min.y,-c.z);const w=new THREE.Group();w.add(o);w.userData.noBatch=true;return w};
  L.load(new URL('../models/hongcheon/pagoda.glb',import.meta.url).href,m=>{const w=prep(m,'keep');w.position.set(PX,0,PZ);G.add(w)},undefined,()=>{});
  L.load(new URL('../models/hongcheon/cart.glb',import.meta.url).href,m=>{const w=prep(m);w.position.set(FX-6,0,FZ+16);w.rotation.y=.4;G.add(w);solids.push({cx:FX-6,cz:FZ+16,r:1.6,y0:0,y1:1.3})},undefined,()=>{})}
 const NL=[];if(!mini){for(const[x,y,z]of[[PX,3,PZ+5],[SX,4,SZ+6],[FX+8,3,FZ+14]]){const L=new THREE.PointLight(0xffc080,0,26,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8)};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(PX,PZ+5,3,'홍천 괘석리 사사자 삼층석탑','고려 때 탑으로, 아래 받침의 네 모서리에 사자 넷이 탑을 떠받치고 있어요(보물). 공개 실측 3D를 실제 크기 그대로 세웠어요(높이 약 3.2m).');
 sp(SX,SZ+7,3,'홍천 수타사','공작산 기슭의 오래된 절이에요. 대적광전과 단풍 숲을 간추려 지었어요.');
 sp(FX+FL/2,FZ+(ROWS-1)*RS+4,3.4,'횡성 들판','횡성은 한우로 이름난 고장이에요. 옛날엔 소가 쟁기를 끌어 밭을 갈았어요. 옆의 소달구지는 국가유산청 공개 실측 3D예요.');
 sp(FX-3,FZ+(ROWS-1)*RS+4,2.4,'쟁기질하는 자리','소가 둑에 닿기 전에 「워!」 하고 멈춰 봐요.');
 sp(-40,30,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 소 쟁기질(11/22): 고랑 여섯. 소가 고랑 끝 흰 금(16m)을 향해 걸어가요(빠르기는 고랑마다 달라요). 「워!」를 누르면 소가 0.25초 뒤부터 서서히 멈춰요. 흰 금 바로 앞에 멈출수록 좋고, 금을 넘어 둑을 밟으면 그 고랑은 0점 */
 window.__HCPLOW=()=>{if(document.getElementById('hcP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(FX-3,FZ+(ROWS-1)*RS+5,0)}catch(e){}
  let row=0,x=0,v=0,st='walk',react=0,t=0,last=performance.now(),done=false,auto=false,msg='';const res=[];const newRow=()=>{x=0;v=2.4+Math.random()*1.4;st='walk';react=0;ox.position.set(FX,0,FZ+row*RS)};newRow();furrows.forEach(f=>f.scale.x=.001);
  window.__GCAM=()=>document.getElementById('hcP')?[FX+x-2,5,FZ+row*RS+9,FX+x+3,.8,FZ+row*RS,50]:null;
  const d=document.createElement('div');d.id='hcP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#2a2014;border:3px solid #d8a860;border-radius:16px;padding:10px 14px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f8f0e0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:300px;max-width:94vw;user-select:none;touch-action:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f8d080">🐂 소 쟁기질</b><div data-i style="margin:4px 0;font:14px 'Do Hyeon',sans-serif"></div><div style="position:relative;height:14px;background:#4a3a2a;border-radius:7px"><div style="position:absolute;left:${(FL/(FL+2))*100}%;top:-2px;bottom:-2px;width:3px;background:#fff"></div><div data-o style="position:absolute;top:1px;width:12px;height:12px;border-radius:50%;background:#c87a30;left:0"></div></div><button data-w style="width:100%;margin-top:8px;font:24px 'Do Hyeon',sans-serif;background:#c87a30;color:#fff;border:0;border-radius:14px;padding:12px 0;cursor:pointer;touch-action:none">워! ✋</button><div data-m style="font-size:12px;color:#f8d080;margin-top:5px">소는 바로 서지 못해요. 미리 불러요</div>`;
  const iEl=d.querySelector('[data-i]'),oEl=d.querySelector('[data-o]'),mEl=d.querySelector('[data-m]');
  const snd=(f,len,type='sine')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const whoa=()=>{if(done||st!=='walk')return;st='react';react=.25;snd(240,.25,'triangle')};
  d.querySelector('[data-w]').onpointerdown=e=>{e.preventDefault();whoa()};const kd=e=>{if(e.code==='Space'){e.preventDefault();whoa()}};addEventListener('keydown',kd);
  const cleanup=()=>{removeEventListener('keydown',kd);ox.position.set(FX,0,FZ)};
  let wait=0;
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;
   if(auto&&st==='walk'&&x+v*.25+v*v/12>=FL-.15)whoa();
   if(st==='walk'||st==='react'){x+=v*dt;if(st==='react'){react-=dt;if(react<=0)st='stop'}}else if(st==='stop'){v=Math.max(0,v-6*dt);x+=v*dt;if(v<=0){st='done';const dd=FL-x;let sc;if(dd<-.2){sc=0;msg=`앗, 둑을 ${(-dd).toFixed(1)}m 밟았어요`;snd(150,.3,'square')}else{sc=Math.max(0,1-Math.abs(dd)/3);msg=dd<.4?'딱 알맞게 멈췄어요!':`금까지 ${dd.toFixed(1)}m 남았어요`;snd(sc>.8?780:520,.2)}res.push(sc);wait=1.2}}
   else if(st==='done'){wait-=dt;if(wait<=0){row++;if(row>=ROWS){fin();return}newRow()}}
   if(x>FL+1.6&&st!=='done'){v=0;st='stop'}
   ox.position.set(FX+x,0,FZ+row*RS);ox.children[0].position.y=1.1+Math.sin(t*9)*.03*(v>0?1:0);const f=furrows[row];if(f){f.scale.x=Math.max(.001,Math.min(FL,x-0));f.position.x=FX+f.scale.x/2}
   oEl.style.left=`calc(${Math.min(100,x/(FL+2)*100)}% - 6px)`;iEl.textContent=`${row+1} / ${ROWS}번째 고랑 · 소 빠르기 ${v.toFixed(1)}m/초`;mEl.textContent=msg||mEl.textContent;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/ROWS*100);const st2=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('hongcheon_plow',Q,'소 쟁기질')}catch(e){}window.__HCQ=Q;snd(660,.3);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f8d080">밭을 다 갈았어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">농부는 「이랴」로 소를 걷게 하고 「워」로 세웠어요. 소는 무거워서 바로 서지 못하니, 빠르기를 보고 미리 불러야 둑을 밟지 않아요. 소는 농사의 가장 큰 일꾼이었어요.</div><div style="font-size:24px;color:#d8a860">${'★'.repeat(st2)}${'☆'.repeat(3-st2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#d8a860;color:#2a2014;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f8f0e0;border:2px solid #f8f0e0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__HCPLOW()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__HCG={set auto(v){auto=v},whoa,get done(){return done},get res(){return res.slice()}};try{ctx.say('이랴! 둑 앞에서 워!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'쟁기 보습',h:'흙을 갈아엎던 쇠 보습이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.ConeGeometry(.1,.25,4),M(0x4a4a4a,{metalness:.5})))})},
  {n:'워낭',h:'소 목에 달던 놋쇠 방울이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.07,10,8),M(0xb8902a,{metalness:.7})))})},
  {n:'고려 기와',h:'옛 절터에서 나온 고려 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18,1,false,0,Math.PI),M(0x5a5a5a)))})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__HCDIG=()=>{window.__DETECT&&window.__DETECT({key:'hongcheon_dig',title:'홍천·횡성 발굴 탐지',emoji:'⛏️',bg:'#2a2014',count:4,TL:150,cand:[[-40,30],[-60,0],[0,40],[60,40],[-30,-20],[20,40],[-60,40],[70,-30]],items:ITEMS,intro:'땅속에 옛 사람들의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'홍천·횡성은 고려 석탑과 소의 고장이에요.'})};
 const meta={quest:{t:'홍천·횡성 둘러보기',d:'괘석리 석탑과 수타사, 횡성 들판을 둘러보세요.',steps:[['석탑','홍천 괘석리 사사자 삼층석탑'],['수타사','홍천 수타사'],['들판','횡성 들판']]},
  title:'홍천·횡성 사사자 석탑·들판',hint:'괘석리 사사자 삼층석탑과 소달구지는 공개 실측 3D, 수타사와 들판은 간추려 지었어요. 소가 둑에 닿기 전에 워! 하고 세워 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-4,z:16,lines:['홍천·횡성','괘석리 사사자 석탑(실측)','수타사 · 횡성 들판','소달구지(실측)']}},
  npc:[['science',[[-8,12],[4,12],[4,22],[-8,22]]]],bounds:[-90,90,-90,90],level:()=>'홍천',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#7a9a48';g.fillRect(0,0,300,300);g.fillStyle='#6a9a3a';g.beginPath();g.arc(X(PX),Z(PZ),6*S,0,7);g.fill();g.fillStyle='#8a6a48';g.fillRect(X(FX-2),Z(FZ-1),(FL+4)*S,(ROWS*RS+2)*S);g.fillStyle='#9a3a26';g.fillRect(X(SX-5.5),Z(SZ-3.5),11*S,7*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:22,yaw:Math.PI},size:{}},meta)}
