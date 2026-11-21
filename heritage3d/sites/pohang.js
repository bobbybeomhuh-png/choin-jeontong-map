/* 포항 영일만 마당(2026-11-21): 연오랑·세오녀 이야기와 포항 냉수리 신라비.
   냉수리 신라비(국보, 503년, 지금 남은 가장 오래된 신라비 가운데 하나)는 실제 크기(높이 약 67cm)로 간추려 지음(공개 실측 Arqueomodel3D 「Silla Stele」 CC BY는 줄이면 텍스처가 조각나 보여 다음에 다시).
   연오랑·세오녀(삼국유사): 연오랑이 바위를 타고 바다 건너가자 해와 달이 빛을 잃었고, 세오녀가 짠 비단으로 제사를 지내자 빛이 돌아왔다는 이야기. 제사 지낸 못을 일월지라 함.
   바닷가·바위·일월지·베 짜는 집은 간추려 지음. 놀이: 세오녀 비단 짜기(북을 좌우로 번갈아 넣어 비단을 짜면 해가 빛을 되찾음), 발굴 탐지, 밤 바다 달빛. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildPohang(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(157);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 const SX=30;/* 동쪽(x>SX) 바다 */const H=(x,z)=>x>SX?-2:Math.max(0,(SX-6-x)*.03);
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(260,240,130,120);g.rotateX(-Math.PI/2);g.translate(-60,0,0);const p=g.attributes.position;const col=[];const c=new THREE.Color();
  for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);const h=H(x,z);p.setY(k,h<0?-3:h);c.set(x>SX-8?'#d8c8a0':'#6f9a44');col.push(c.r,c.g,c.b)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1}));m.receiveShadow=true;G.add(m)}
 const sea=new THREE.Mesh(new THREE.PlaneGeometry(600,600),M(0x2a6a8a,{roughness:.08,metalness:.25}));sea.rotation.x=-Math.PI/2;sea.position.set(SX+300,-.2,0);G.add(sea);solids.push({x0:SX+2,x1:SX+600,y0:-5,y1:3,z0:-300,z1:300});
 const foam=new THREE.Mesh(new THREE.PlaneGeometry(3,240),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.35,depthWrite:false}));foam.rotation.x=-Math.PI/2;foam.position.set(SX+1,-.15,0);G.add(foam);
 /* 연오랑이 탄 바위 + 갯바위 */{const rm=M(0x5a5650,{flatShading:true});const big=new THREE.Mesh(new THREE.DodecahedronGeometry(4,1),rm);big.scale.set(1.5,.5,1);big.position.set(SX+26,.2,-6);G.add(big);cam.push(big);for(let i=0;i<14;i++){const s=new THREE.Mesh(new THREE.DodecahedronGeometry(1+r()*1.8,0),rm);s.position.set(SX+2+r()*8,-.3,-80+i*12+(r()-.5)*4);s.scale.y=.6;G.add(s)}}
 /* 일월지(못) + 일월사당 */const PX=-40,PZ=-20;{const w=new THREE.Mesh(new THREE.CircleGeometry(12,40),M(0x3a6a7a,{roughness:.06,metalness:.3}));w.rotation.x=-Math.PI/2;w.position.set(PX,H(PX,PZ)+.05,PZ);G.add(w);const rim=new THREE.Mesh(new THREE.TorusGeometry(12.2,.35,8,48),M(0x9a948a));rim.rotation.x=Math.PI/2;rim.position.set(PX,H(PX,PZ)+.15,PZ);G.add(rim);solids.push({cx:PX,cz:PZ,r:12.4,y0:0,y1:3});
  if(!mini){const h=buildHall({x:PX-20,z:PZ,ry:Math.PI/2,W:6,D:4.4,nx:3,nz:1,FY:.6,PH:2.8,roof:'hip',name:'日月祠堂',pillar:0x9a3a26,bracket:'ik',front:'door',solids:[],light:false,roofScale:.85});h.group.position.y=H(PX-20,PZ);G.add(h.group);solids.push({x0:PX-22.4,x1:PX-17.6,y0:0,y1:6,z0:PZ-3.2,z1:PZ+3.2})}}
 /* 베 짜는 집(세오녀) + 베틀 */
 const LX=-14,LZ=22;let shuttle=null,clothC=null,clothT=null;
 if(!mini){const h=buildHall({x:LX,z:LZ,ry:Math.PI/2,W:8,D:6,nx:3,nz:2,FY:.4,PH:2.8,roof:'hip',name:'細烏',pillar:0x7a5a3a,bracket:'ik',front:'open',back:'wall',left:'wall',right:'wall',solids:[],light:false,roofScale:.85});h.group.position.y=H(LX,LZ);G.add(h.group);solids.push({x0:LX-3.4,x1:LX+3.4,y0:0,y1:5,z0:LZ-4.4,z1:LZ+4.4})}
 {const wm=M(0x8a6a44);const g=new THREE.Group();g.position.set(LX+1.2,H(LX,LZ)+.42,LZ);for(const z of[-.7,.7]){const p=new THREE.Mesh(new THREE.BoxGeometry(.1,1.6,.1),wm);p.position.set(.3,.8,z);g.add(p);const p2=new THREE.Mesh(new THREE.BoxGeometry(1.6,.08,.08),wm);p2.position.set(-.3,.5,z);g.add(p2)}const beam=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,1.6,8),wm);beam.rotation.x=Math.PI/2;beam.position.set(.3,1.5,0);g.add(beam);
  clothC=document.createElement('canvas');clothC.width=64;clothC.height=256;clothT=new THREE.CanvasTexture(clothC);clothT.colorSpace=THREE.SRGBColorSpace;const cloth=new THREE.Mesh(new THREE.PlaneGeometry(1.3,1.1),new THREE.MeshStandardMaterial({map:clothT,transparent:true,side:THREE.DoubleSide,roughness:.4,metalness:.1}));cloth.rotation.y=Math.PI/2;cloth.position.set(.31,.95,0);g.add(cloth);
  for(let i=0;i<14;i++){const th=new THREE.Mesh(new THREE.BoxGeometry(.005,1.1,.005),new THREE.MeshBasicMaterial({color:0xf4ecd8}));th.position.set(.3,.95,-.6+i*.092);g.add(th)}
  shuttle=new THREE.Mesh(new THREE.CapsuleGeometry(.04,.22,4,8),M(0x6a4a2a));shuttle.rotation.x=Math.PI/2;shuttle.position.set(.35,.6,0);g.add(shuttle);G.add(g)}
 /* 냉수리 신라비(작은 비각 안, 간추린 돌) */const BX=-30,BZ=34;{const pd=new THREE.Mesh(new THREE.BoxGeometry(1.4,.4,1.2),M(0x8a8478));pd.position.set(BX,H(BX,BZ)+.2,BZ);G.add(pd);solids.push({x0:BX-.8,x1:BX+.8,y0:0,y1:1.2,z0:BZ-.7,z1:BZ+.7});
  const c=document.createElement('canvas');c.width=256;c.height=256;const q=c.getContext('2d');q.fillStyle='#8a7e6a';q.fillRect(0,0,256,256);for(let k=0;k<2200;k++){const v=110+(r()*60|0);q.fillStyle=`rgba(${v},${v-6},${v-18},.5)`;q.fillRect(r()*256,r()*256,2,2)}q.fillStyle='rgba(50,44,36,.55)';q.font='15px serif';const ch='斯羅喙斯夫智王乃智王此二王敎用珍而麻村節居利爲證介令其得財敎耳';for(let k=0;k<ch.length;k++)q.fillText(ch[k],18+(k%9)*24,26+((k/9)|0)*26);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const g=new THREE.BoxGeometry(.72,.67,.3,3,3,2);const pp=g.attributes.position;for(let k=0;k<pp.count;k++){pp.setX(k,pp.getX(k)*(1+(r()-.5)*.08));if(pp.getY(k)>0)pp.setY(k,pp.getY(k)-(pp.getX(k)+.36)*.12)}g.computeVertexNormals();const st=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:t,roughness:.9}));st.position.set(BX,H(BX,BZ)+.4+.335,BZ);st.castShadow=true;G.add(st);cam.push(st);
  if(!mini){const h=buildHall({x:BX,z:BZ,ry:0,W:3.6,D:3.6,nx:1,nz:1,FY:.2,PH:2.6,roof:'hip',name:'新羅碑',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',stairs:'none',solids:[],light:false,roofScale:.7});h.group.position.y=H(BX,BZ);G.add(h.group)}}
 /* 해(빛을 잃었다가 되찾음) */
 const sunM=new THREE.MeshBasicMaterial({color:0xffd070,fog:false});const sun=new THREE.Mesh(new THREE.SphereGeometry(9,24,16),sunM);sun.position.set(320,70,-30);G.add(sun);
 const glowC=document.createElement('canvas');glowC.width=glowC.height=128;{const q=glowC.getContext('2d');const gr=q.createRadialGradient(64,64,6,64,64,64);gr.addColorStop(0,'rgba(255,220,140,.9)');gr.addColorStop(1,'rgba(255,160,60,0)');q.fillStyle=gr;q.fillRect(0,0,128,128)}const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(glowC),transparent:true,depthWrite:false,fog:false}));glow.scale.set(90,90,1);glow.position.copy(sun.position);G.add(glow);
 const setSun=k=>{sunM.color.setRGB(.25+.75*k,.22+.6*k,.18+.26*k);glow.material.opacity=k};
 /* 소나무 */{const tm=M(0x5a4030),lm=M(0x2f5a2c);for(let i=0;i<50;i++){const x=-180+r()*190,z=-110+r()*220;if(Math.hypot(x-PX,z-PZ)<16||Math.hypot(x-LX,z-LZ)<9||Math.hypot(x-BX,z-BZ)<5||Math.hypot(x-PX+20,z-PZ)<6)continue;const y=H(x,z);const t=new THREE.Mesh(new THREE.CylinderGeometry(.2,.32,5,6),tm);t.position.set(x,y+2.5,z);G.add(t);for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(2-k*.5,2,7),lm);c.position.set(x,y+4.2+k*1.1,z);c.castShadow=true;G.add(c)}solids.push({cx:x,cz:z,r:.4,y0:y,y1:y+8})}}
 /* 밤 */
 const moonP=new THREE.Mesh(new THREE.PlaneGeometry(260,4),new THREE.MeshBasicMaterial({color:0xfff0c8,transparent:true,opacity:0,depthWrite:false}));moonP.rotation.x=-Math.PI/2;moonP.position.set(SX+140,-.1,-20);G.add(moonP);
 const NL=[];if(!mini){for(const[x,z]of[[LX+3,LZ],[BX,BZ+2],[PX-17,PZ]]){const L=new THREE.PointLight(0xffc080,0,16,1.5);L.position.set(x,H(x,z)+2.6,z);G.add(L);NL.push(L)}}
 let nk=0,ft=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*6;moonP.material.opacity=nk*.22;sun.visible=glow.visible=nk<.5;ft+=dt;foam.material.opacity=.25+Math.sin(ft*1.3)*.12};
 /* 안내 */
 const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(SX-6,0,3.4,'영일만 바닷가','삼국유사에 연오랑이 바닷가 바위에 올랐더니 바위가 움직여 바다 건너 일본으로 갔다는 이야기가 있어요. 그 뒤 신라의 해와 달이 빛을 잃었대요. 바닷가는 간추려 지었어요.');
 sp(PX+14,PZ,3,'일월지','세오녀가 보낸 비단으로 하늘에 제사를 지내자 해와 달이 다시 빛났다는 이야기가 깃든 못이에요. 제사 지낸 곳을 영일현(해를 맞는 고을)이라 했다고 해요.');
 sp(LX+5,LZ,2.6,'세오녀 베 짜는 집','남편을 따라 바다를 건넌 세오녀는 고운 비단을 짜 신라로 보냈어요.');
 sp(LX+4,LZ+3,1.8,'베틀 앞 자리','비단을 짜서 해의 빛을 되찾아 봐요.');
 sp(BX+3,BZ+2,2.6,'냉수리 신라비','503년에 세운 신라 비석이에요(국보). 지금 남은 가장 오래된 신라 비석 가운데 하나로, 재산 다툼을 판결한 내용이 새겨져 있어요. 실제 크기(높이 약 67cm)로 간추려 놓았어요.');
 sp(-60,40,2.4,'발굴 탐지 자리','영일 땅속에 신라 사람들의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 세오녀 비단 짜기(11/21) */
 window.__PHWEAVE=()=>{if(document.getElementById('phP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(LX+3.6,LZ,H(LX,LZ));H3.face(-Math.PI/2)}catch(e){}
  const q=clothC.getContext('2d');q.clearRect(0,0,64,256);clothT.needsUpdate=true;setSun(.15);
  window.__GCAM=()=>document.getElementById('phP')?[LX+4.2,H(LX,LZ)+2.2,LZ+1.6,LX+1.3,H(LX,LZ)+1.3,LZ,50]:null;
  let rows=0,tangle=0,last='',done=false,t0=performance.now()/1000;const N=24,TL=50;
  const d=document.createElement('div');d.id='phP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2018;border:3px solid #f0c070;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffd890">🧵 세오녀 비단 짜기</b><div id="phS" style="font:20px 'Do Hyeon',sans-serif;margin:4px 0">0 / ${N}줄</div><div id="phG" style="font-size:13px;color:#ffd890">북을 왼쪽·오른쪽 번갈아 넣어요</div><div style="display:flex;gap:8px;margin:6px 0"><button id="phL" style="flex:1;font:18px 'Do Hyeon',sans-serif;background:#f0c070;color:#2a1a10;border:0;border-radius:12px;padding:12px 0;cursor:pointer">◀ 북</button><button id="phR" style="flex:1;font:18px 'Do Hyeon',sans-serif;background:#f0c070;color:#2a1a10;border:0;border-radius:12px;padding:12px 0;cursor:pointer">북 ▶</button></div><div id="phT" style="font-size:13px">${TL}초</div><div style="font-size:12px;opacity:.85">한 줄 짤 때마다 해가 조금씩 밝아져요 (키보드 ←→)</div>`;const Sx=d.querySelector('#phS'),Gd=d.querySelector('#phG'),T=d.querySelector('#phT');
  const tick=(f)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='triangle';o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+.12);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+.14)}catch(e){}};
  const cols=['#e8b0c0','#f0d080','#a8d0e8','#c8e0a0'];
  const throwS=side=>{if(done)return;if(side===last){tangle++;tick(180);Gd.textContent='실이 엉켰어요! 반대쪽으로';return}last=side;rows++;tick(520+rows*12);const y=256-rows*(256/N);q.fillStyle=cols[(rows/6|0)%4];q.fillRect(0,y,64,256/N+.5);q.fillStyle='rgba(255,255,255,.25)';for(let x=(rows%2)*4;x<64;x+=8)q.fillRect(x,y,4,256/N);clothT.needsUpdate=true;if(shuttle)shuttle.position.z=side==='L'?-.75:.75;setSun(.15+.85*rows/N);Sx.textContent=rows+' / '+N+'줄';Gd.textContent='좋아요!';if(rows>=N)fin()};
  d.querySelector('#phL').onclick=()=>throwS('L');d.querySelector('#phR').onclick=()=>throwS('R');const onKey=e=>{if(e.code==='ArrowLeft'){e.preventDefault();throwS('L')}else if(e.code==='ArrowRight'){e.preventDefault();throwS('R')}};addEventListener('keydown',onKey,true);
  const fin=()=>{if(done)return;done=true;removeEventListener('keydown',onKey,true);const el=performance.now()/1000-t0;const Q=rows>=N?Math.max(65,Math.round(100-Math.max(0,el-18)*.8-tangle*4)):Math.round(rows/N*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('pohang_weave',Q,'세오녀 비단 짜기')}catch(e){}window.__PHQ=Q;
   if(rows>=N){setSun(1);try{ctx.say('해가 다시 빛나요!',2)}catch(e){}}
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffd890">${rows>=N?'해와 달이 빛을 되찾았어요!':'비단 '+rows+'줄'}</b><div style="font-size:13px;margin:4px 0">삼국유사에 따르면 세오녀가 짠 비단으로 하늘에 제사를 지내자 해와 달이 다시 밝아졌고, 그 비단을 나라의 보물로 모셨대요. 그래서 포항 영일은 「해를 맞는 고을」이 됐어요.</div><div style="font-size:26px;color:#f0c070">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#f0c070;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__PHWEAVE(),60)};d.querySelector('[data-x]').onclick=()=>{d.remove();setSun(1)}},1000)};
  const loop=()=>{if(!d.isConnected){removeEventListener('keydown',onKey,true);if(!done)setSun(1);return}const now=performance.now()/1000;if(!done){const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin()}requestAnimationFrame(loop)};loop();
  window.__PHG={throwS,get rows(){return rows}};try{ctx.say('해가 빛을 잃었어요! 비단을 짜서 빛을 되찾아요.',2.6)}catch(e){}};
 /* 발굴 탐지 */
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'신라 굽다리 접시',h:'신라 사람들이 쓴 토기예요.',mk:mk(g=>{const t=new THREE.Mesh(new THREE.CylinderGeometry(.2,.06,.08,16),M(0x5a5450));t.position.y=.14;g.add(t);g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.12,.16,12),M(0x5a5450)))})},
  {n:'가락바퀴',h:'실을 꼬던 돌 바퀴예요. 비단을 짜려면 먼저 실을 뽑아야 했어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.05,16),M(0x8a7a64)))})},
  {n:'청동 거울',h:'해를 닮은 둥근 청동 거울이에요. 해와 빛을 우러른 마음을 보여 줘요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,.02,24),M(0x7a8a5a,{metalness:.7,roughness:.3})))})},
  {n:'조개껍데기',h:'바닷가 사람들이 먹고 버린 조개껍데기예요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.12,12,8,0,Math.PI*2,0,Math.PI/2),M(0xe8dcc8,{side:THREE.DoubleSide}));m.scale.y=.4;g.add(m)})},
  {n:'쇠 낫',h:'신라 사람들의 농기구예요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.TorusGeometry(.12,.02,6,12,Math.PI),M(0x4a3a30,{metalness:.5}));g.add(m)})}];
 window.__PHDIG=()=>{window.__DETECT&&window.__DETECT({key:'pohang_dig',title:'영일 발굴 탐지',emoji:'⛏️',bg:'#22261e',count:4,TL:150,cand:[[-60,40],[-70,0],[-20,-40],[10,30],[-90,20],[0,-60],[-50,60],[-100,-30]],items:ITEMS,intro:'영일 땅속에 신라 사람들의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'포항 일대에서는 냉수리·중성리 신라비 같은 아주 오래된 신라 유물이 나왔어요.'})};
 const meta={quest:{t:'영일만 둘러보기',d:'연오랑·세오녀 이야기와 신라비를 둘러보세요.',steps:[['바닷가','영일만 바닷가'],['일월지','일월지'],['베 짜는 집','세오녀 베 짜는 집'],['신라비','냉수리 신라비']]},
  title:'포항 영일만',hint:'연오랑·세오녀 이야기가 깃든 영일만을 간추려 지었어요. 냉수리 신라비를 보고, 세오녀처럼 비단을 짜서 해의 빛을 되찾아 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:true,groundY:-3.5,sign:{x:SX-14,z:8,lines:['포항 영일만','연오랑·세오녀 이야기','냉수리 신라비(국보)','간추려 지음']}},
  npc:[['science',[[SX-20,-4],[SX-12,-4],[SX-12,6],[SX-20,6]]]],bounds:[-160,SX,-110,110],level:()=>'영일만',camCap:()=>Infinity,baseAt:(x,z)=>Math.max(0,H(x,z)),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.1,ox:-40,oz:0,draw(g,X,Z,S){g.fillStyle='#6f9a44';g.fillRect(0,0,300,300);g.fillStyle='#2a6a8a';g.fillRect(X(SX),0,300,300);g.fillStyle='#3a6a7a';g.beginPath();g.arc(X(PX),Z(PZ),12*S,0,7);g.fill();g.fillStyle='#9a3a26';g.fillRect(X(LX-3),Z(LZ+4),6*S,8*S);g.fillRect(X(BX-1.8),Z(BZ+1.8),3.6*S,3.6*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:SX-14,z:-2,yaw:-Math.PI/2},size:{}},meta)}
