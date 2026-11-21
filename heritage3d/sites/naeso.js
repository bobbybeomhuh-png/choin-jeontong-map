/* 부안 내소사 마당(2026-11-21): 공개 실측 3D(CC BY)가 없어 공개 수치로 간추려 지음.
   내소사: 능가산 아래 백제 때(633) 세웠다고 전하는 절. 일주문에서 600m쯤 이어지는 전나무 숲길, 천년 느티나무, 대웅보전(보물, 1633)의 꽃살문(연꽃·국화를 통나무에 새겨 맞춘 문살, 색을 칠하지 않은 나무 빛)으로 이름남. 삼층석탑.
   놀이: 꽃살문 맞추기(돌아간 꽃살 조각을 눌러 바로 돌리기), 발굴 탐지, 밤 연등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {stonePagoda,stoneLantern} from './stonekit.js';
export function buildNaeso(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(633);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 const H=(x,z)=>Math.max(0,(-z-20)*.08);/* 절 마당 쪽(−z)으로 살짝 오름 */
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(220,300,110,150);g.rotateX(-Math.PI/2);g.translate(0,0,30);const p=g.attributes.position;const col=[];const c=new THREE.Color();
  for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);p.setY(k,H(x,z));const road=Math.abs(x)<3&&z>-24;const yard=Math.abs(x)<30&&z<-24&&z>-80;c.set(road||yard?'#c8b894':'#5f8a3a');col.push(c.r,c.g,c.b)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1}));m.receiveShadow=true;G.add(m)}
 /* 전나무 숲길(길 양옆 키 큰 전나무 줄) */{const tm=M(0x5a4030),lm=M(0x26502a);for(let i=0;i<40;i++){const z=150-i*4.3;for(const s of[-1,1]){const x=s*(5+r()*2.5);const h=16+r()*6;const t=new THREE.Mesh(new THREE.CylinderGeometry(.3,.5,h,7),tm);t.position.set(x,h/2,z);t.castShadow=true;G.add(t);for(let k=0;k<4;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(2.6-k*.5,h*.3,8),lm);c.position.set(x,h*.38+k*h*.17,z);c.castShadow=true;G.add(c)}solids.push({cx:x,cz:z,r:.6,y0:0,y1:h})}}}
 /* 일주문 */if(!mini){const h=buildHall({x:0,z:150,ry:0,W:6,D:3,nx:1,nz:1,FY:.2,PH:3.6,roof:'hip',name:'楞伽山來蘇寺',pillar:0x8a6a48,bracket:'dapo',front:'open',back:'open',left:'wall',right:'wall',stairs:'none',solids,light:false,roofScale:.9});G.add(h.group)}
 /* 천년 느티나무 */{const t=new THREE.Mesh(new THREE.CylinderGeometry(1.4,2,8,10),M(0x5a4430));t.position.set(14,4+H(14,-30),-30);G.add(t);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(9,1),M(0x6a9a3a));c.position.set(14,14,-30);c.scale.y=.7;c.castShadow=true;G.add(c);solids.push({cx:14,cz:-30,r:2,y0:0,y1:10})}
 /* 대웅보전 + 꽃살문 판 */
 const DZ=-66,DY=H(0,DZ);
 if(!mini){const h=buildHall({x:0,z:DZ,ry:0,W:14,D:9,nx:3,nz:3,FY:1.4,PH:3.8,roof:'hip',name:'大雄寶殿',pillar:0x8a6a48,bracket:'dapo',front:'door',solids:[],light:false});h.group.position.y=DY;G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)});solids.push({x0:-7.6,x1:7.6,y0:0,y1:DY+9,z0:DZ-5,z1:DZ+4.4})}
 /* 꽃살 그림: 연꽃(줄기가 아래로, 잎이 오른쪽) — 돌리면 맞지 않음 */
 const flowerTex=(()=>{const c=document.createElement('canvas');c.width=c.height=128;const q=c.getContext('2d');q.fillStyle='#b08a5a';q.fillRect(0,0,128,128);q.strokeStyle='#7a5a38';q.lineWidth=6;q.strokeRect(3,3,122,122);q.strokeStyle='#8a6a44';q.lineWidth=3;for(const a of[0,Math.PI/4,Math.PI/2,Math.PI*3/4]){q.beginPath();q.moveTo(64-Math.cos(a)*60,64-Math.sin(a)*60);q.lineTo(64+Math.cos(a)*60,64+Math.sin(a)*60);q.stroke()}
  q.fillStyle='#c89a68';q.strokeStyle='#6a4a2a';q.lineWidth=2;q.fillRect(61,60,6,60);q.strokeRect(61,60,6,60);q.beginPath();q.ellipse(88,92,20,9,-.5,0,7);q.fill();q.stroke();for(let i=0;i<8;i++){const a=i/8*6.28-Math.PI/2;q.save();q.translate(64,46);q.rotate(a);q.beginPath();q.ellipse(0,-14,8,15,0,0,7);q.fill();q.stroke();q.restore()}q.fillStyle='#e0b878';q.beginPath();q.arc(64,46,9,0,7);q.fill();q.stroke();const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t})();
 const TILES=[];const TW=.6,NX=4,NY=4;const DX0=-(NX-1)*TW/2,PANZ=DZ+4.62,PANY=DY+1.4+.9;
 for(let j=0;j<NY;j++)for(let i=0;i<NX;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(TW*.98,TW*.98),new THREE.MeshStandardMaterial({map:flowerTex,roughness:.8}));m.position.set(DX0+i*TW,PANY+(NY-1-j)*TW,PANZ);G.add(m);TILES.push({m,rot:0})}
 /* 삼층석탑·석등 */{const p=stonePagoda(4.6);p.position.set(-14,H(-14,-46),-46);G.add(p);solids.push({cx:-14,cz:-46,r:1.2,y0:0,y1:6});const l=stoneLantern(2.4);l.position.set(0,H(0,-54),-54);G.add(l);solids.push({cx:0,cz:-54,r:.5,y0:0,y1:3})}
 /* 다른 전각(간추려) */if(!mini){for(const[x,z,n,ry]of[[-22,-62,'冥府殿',Math.PI/2],[22,-60,'鳳來樓',-Math.PI/2]]){const h=buildHall({x,z,ry,W:9,D:6,nx:3,nz:2,FY:.7,PH:3.2,roof:'hip',name:n,pillar:0x8a6a48,bracket:'ik',front:'door',solids:[],light:false});h.group.position.y=H(x,z);G.add(h.group);solids.push({x0:x-3.4,x1:x+3.4,y0:0,y1:H(x,z)+7,z0:z-4.8,z1:z+4.8})}}
 /* 능가산 */{const hm=M(0x4f6e34,{flatShading:true});const m=new THREE.Mesh(new THREE.SphereGeometry(1,16,8,0,Math.PI*2,0,Math.PI/2),hm);m.scale.set(150,50,60);m.position.set(0,0,-150);G.add(m);for(let i=0;i<4;i++){const c=new THREE.Mesh(new THREE.ConeGeometry(16,46,6),M(0x7a7468,{flatShading:true}));c.position.set(-60+i*40,30,-150);G.add(c)}}
 /* 밤 */
 const NL=[];if(!mini){const cols=[0xf08aa0,0xf4c040,0x8ac0f0,0x9ad08a];for(let i=0;i<20;i++){const z=140-i*8;for(const x of[-3.2,3.2]){const lp=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),new THREE.MeshStandardMaterial({color:cols[i%4],emissive:0}));lp.position.set(x,H(x,z)+2.6,z);G.add(lp);NL.push({lp})}}const L=new THREE.PointLight(0xffc080,0,24,1.4);L.position.set(0,DY+4,DZ+8);G.add(L);NL.push({L});const L2=new THREE.PointLight(0xffc080,0,16,1.4);L2.position.set(0,H(0,-54)+2.4,-54);G.add(L2);NL.push({L:L2})}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const l of NL){if(l.lp)l.lp.material.emissive.setRGB(nk*.9,nk*.7,nk*.5);if(l.L)l.L.intensity=nk*8}};
 /* 안내 */
 const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(6,146,3,'내소사 일주문','능가산 내소사로 들어가는 문이에요. 백제 때(633) 세웠다고 전하는 절이에요. 간추려 지었어요.');
 sp(5,100,3,'전나무 숲길','일주문에서 절 마당까지 키 큰 전나무가 600m쯤 늘어선 숲길이에요. 우리나라에서 손꼽히는 아름다운 숲길이에요.');
 sp(20,-26,3,'천년 느티나무','절 마당 가운데 선 천 년 가까이 된 느티나무예요.');
 sp(4,DZ+8,3.4,'대웅보전 꽃살문','대웅보전(보물) 앞문은 연꽃·국화·모란을 통나무에 새겨 짜 맞춘 꽃살문이에요. 색을 칠하지 않아 나뭇결이 그대로 드러나요. 못을 쓰지 않고 지었다는 이야기도 전해요.');
 sp(-3,DZ+7,1.6,'꽃살문 맞추는 자리','돌아간 꽃살 조각을 눌러 바로 맞춰 봐요.');
 sp(-24,0,2.4,'발굴 탐지 자리','내소사 둘레 땅속에 옛 절의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 꽃살문 맞추기(11/21): 16조각 가운데 여럿이 돌아가 있음. 눌러서 90도씩 돌려 모두 바로(줄기가 아래, 잎이 오른쪽). 90초 */
 window.__NSFLOWER=()=>{if(document.getElementById('nsfP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(-1,DZ+7.6,DY);H3.face(Math.PI)}catch(e){}
  const CP=[0,PANY+(NY-1)*TW/2,PANZ+3.2],LK=[0,PANY+(NY-1)*TW/2,PANZ];window.__GCAM=()=>document.getElementById('nsfP')?[...CP,...LK,50]:null;
  for(const t of TILES){t.rot=(1+((Math.random()*3)|0))*(Math.random()<.85?1:0);t.m.rotation.z=-t.rot*Math.PI/2}if(TILES.every(t=>t.rot===0)){TILES[0].rot=1;TILES[0].m.rotation.z=-Math.PI/2}
  let taps=0,done=false,t0=performance.now()/1000;const TL=90;const need=TILES.reduce((a,t)=>a+((4-t.rot)%4),0);
  const d=document.createElement('div');d.id='nsfP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2018;border:3px solid #c89a68;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffd8a8">🌸 꽃살문 맞추기</b><div id="nsfS" style="font:18px 'Do Hyeon',sans-serif;margin:4px 0"></div><div style="font-size:13px;color:#ffd8a8">조각을 누르면 오른쪽으로 돌아요</div><div id="nsfT" style="font-size:13px">${TL}초</div><div style="font-size:12px;opacity:.85">연꽃이 위, 줄기가 아래, 잎이 오른쪽이면 바로예요</div>`;const Sx=d.querySelector('#nsfS'),T=d.querySelector('#nsfT');
  const knock=()=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='triangle';o.frequency.setValueAtTime(520,s);o.frequency.exponentialRampToValueAtTime(300,s+.08);gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+.12);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+.14)}catch(e){}};
  const upd=()=>{const ok=TILES.filter(t=>t.rot===0).length;Sx.textContent=`바로 맞은 조각 ${ok} / ${TILES.length}`;if(ok===TILES.length)fin()};upd();
  const rc=new THREE.Raycaster(),pcam=new THREE.PerspectiveCamera(50,1,.01,30),ndc=new THREE.Vector2();
  const tapAt=(cx,cy)=>{if(done)return;const k=window.__GCAM&&window.__GCAM();if(!k)return;pcam.fov=k[6];pcam.aspect=innerWidth/innerHeight;pcam.position.set(k[0],k[1],k[2]);pcam.lookAt(k[3],k[4],k[5]);pcam.updateMatrixWorld(true);pcam.updateProjectionMatrix();ndc.set(cx/innerWidth*2-1,-(cy/innerHeight)*2+1);rc.setFromCamera(ndc,pcam);const hit=rc.intersectObjects(TILES.map(t=>t.m))[0];if(!hit)return;const t=TILES.find(t=>t.m===hit.object);t.rot=(t.rot+3)%4;t.m.rotation.z=-t.rot*Math.PI/2;taps++;knock();upd()};
  const pd=ev=>{if(ev.target&&ev.target.closest&&ev.target.closest('#nsfP'))return;tapAt(ev.clientX,ev.clientY)};addEventListener('pointerdown',pd,true);
  const fin=()=>{if(done)return;done=true;removeEventListener('pointerdown',pd,true);const el=performance.now()/1000-t0;const ok=TILES.filter(t=>t.rot===0).length;const Q=ok===TILES.length?Math.max(65,Math.round(100-Math.max(0,el-30)*.6-Math.max(0,taps-need)*2)):Math.round(ok/TILES.length*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('naeso_flower',Q,'내소사 꽃살문 맞추기')}catch(e){}window.__NSFQ=Q;
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffd8a8">${ok===TILES.length?'꽃살문이 피었어요!':'조각 '+ok+'개를 맞췄어요'}</b><div style="font-size:13px;margin:4px 0">내소사 꽃살문은 문살 한 칸 한 칸에 꽃을 새겨 짜 맞췄어요. 세월에 색이 바래 나뭇결만 남아, 오히려 더 아름답다는 말을 들어요.</div><div style="font-size:26px;color:#c89a68">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c89a68;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__NSFLOWER(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},600)};
  const loop=()=>{if(!d.isConnected){removeEventListener('pointerdown',pd,true);return}const now=performance.now()/1000;if(!done){const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin()}requestAnimationFrame(loop)};loop();
  window.__NSFG={TILES,tap:i=>{const k=window.__GCAM();pcam.fov=k[6];pcam.aspect=innerWidth/innerHeight;pcam.position.set(k[0],k[1],k[2]);pcam.lookAt(k[3],k[4],k[5]);pcam.updateMatrixWorld(true);pcam.updateProjectionMatrix();const v=TILES[i].m.position.clone().project(pcam);tapAt((v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight)}};try{ctx.say('꽃살 조각이 돌아가 있어요! 눌러서 바로 맞춰요.',2.4)}catch(e){}};
 /* 발굴 탐지 */
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'고려 동종 조각',h:'내소사에는 고려 때 만든 동종(보물)이 전해요. 그와 같은 청동 종 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.16,.2,14,1,true,0,2),M(0x4a5a48,{metalness:.6,side:THREE.DoubleSide})))})},
  {n:'연꽃무늬 수막새',h:'처마 끝 기와예요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.05,20),M(0x5a5a58));m.rotation.x=Math.PI/2;g.add(m)})},
  {n:'꽃살 나무 조각',h:'옛 꽃살문을 고칠 때 떨어져 나온 나무 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.24,.04,.24),M(0xb08a5a)))})},
  {n:'분청 사발',h:'스님들이 쓰던 그릇 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.18,14,8,0,Math.PI*2,Math.PI/2,Math.PI/2),M(0x9a9480,{side:THREE.DoubleSide})))})},
  {n:'상평통보',h:'조선 후기 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__NSFDIG=()=>{window.__DETECT&&window.__DETECT({key:'naeso_dig',title:'내소사 발굴 탐지',emoji:'⛏️',bg:'#262018',count:4,TL:150,cand:[[-24,0],[24,10],[-20,-36],[24,-46],[-26,-74],[26,-76],[-14,40],[18,60]],items:ITEMS,intro:'내소사 둘레 땅속에 옛 절의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'내소사는 백제 때부터 이어 왔다고 전하는 절이라 여러 시대 유물이 함께 나와요.'})};
 const meta={quest:{t:'내소사 둘러보기',d:'전나무 숲길을 지나 꽃살문까지.',steps:[['일주문','내소사 일주문'],['숲길','전나무 숲길'],['느티나무','천년 느티나무'],['꽃살문','대웅보전 꽃살문']]},
  title:'부안 내소사',hint:'전나무 숲길과 꽃살문으로 이름난 내소사를 공개 수치로 간추려 지었어요. 대웅보전 앞에서 꽃살문 조각을 맞춰 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:true,sign:{x:7,z:158,lines:['부안 내소사','전나무 숲길 · 꽃살문','대웅보전(보물)','간추려 지음']}},
  npc:[['science',[[-4,160],[4,160],[4,168],[-4,168]]]],bounds:[-80,80,-90,175],level:()=>'내소사',camCap:()=>Infinity,baseAt:(x,z)=>H(x,z),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:.9,ox:0,oz:40,draw(g,X,Z,S){g.fillStyle='#5f8a3a';g.fillRect(0,0,300,300);g.fillStyle='#c8b894';g.fillRect(X(-3),Z(150),6*S,175*S);g.fillRect(X(-30),Z(-24),60*S,56*S);g.fillStyle='#26502a';for(let z=-20;z<150;z+=8){g.fillRect(X(-8),Z(z),3,3);g.fillRect(X(6),Z(z),3,3)}g.fillStyle='#8a6a48';g.fillRect(X(-7),Z(DZ+4.5),14*S,9*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:166,yaw:Math.PI},size:{}},meta)}
