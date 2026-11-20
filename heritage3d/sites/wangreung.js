/* 경주 신라 왕릉 마당 둘(2026-11-20): 국가유산청 실측 3D(스케치팹 KHS_Asset, CC BY 4.0)를 실제 크기로.
   흥덕왕릉(사적, 신라 42대 흥덕왕 826~836): 봉분 둘레 돌난간·십이지 호석·무인석·문인석·돌사자, 둘레 도래솔 숲. 놀이: 도래솔 숲 솔방울 줍기.
   경덕왕릉(사적, 신라 35대 경덕왕 742~765): 비탈 위 봉분과 십이지 호석, 돌난간, 상석. 놀이: 발굴 탐지. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
const SRC='(3D: 국가유산청 KHS_Asset, Sketchfab, CC BY 4.0)';
function base(key,mr,seed,opts){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(seed);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#6f9248';q.fillRect(0,0,w,h);for(let i=0;i<3400;i++){q.fillStyle=r()<.5?'rgba(80,115,40,.5)':'rgba(150,165,90,.35)';q.fillRect(r()*w,r()*h,2,2)}},[40,40]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(260,260),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr);
  const KT=tex(256,256,(q,w,h)=>{q.fillStyle='#b8ad98';q.fillRect(0,0,w,h);for(let i=0;i<2400;i++){const v=140+(r()*70|0);q.fillStyle=`rgb(${v},${v-6},${v-16})`;q.fillRect(r()*w,r()*h,3,3)}},[3,16]);const pth=new THREE.Mesh(new THREE.PlaneGeometry(3.5,30),new THREE.MeshStandardMaterial({map:KT,roughness:1}));pth.rotation.x=-Math.PI/2;pth.position.set(0,.02,38);G.add(pth)}
 /* 도래솔(굽은 소나무) 숲 */const PINES=[];if(!mini){const tr=M(0x7a4a2e),pn=M(0x2f5a2c);for(let i=0;i<70;i++){const a=r()*Math.PI*2,d=27+r()*40;const x=Math.cos(a)*d,z=Math.sin(a)*d;if(Math.abs(x)<5&&z>20)continue;const h=6+r()*5,lean=(r()-.5)*.5;const t=new THREE.Mesh(new THREE.CylinderGeometry(.22,.38,h,7),tr);t.position.set(x+Math.sin(lean)*h/2,h/2,z);t.rotation.z=-lean;t.castShadow=true;G.add(t);for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.SphereGeometry(1.4+r()*1.1,8,6),pn);c.scale.y=.45;c.position.set(x+Math.sin(lean)*h+(r()-.5)*2.4,h-.4+k*.7,z+(r()-.5)*2.4);c.castShadow=true;G.add(c)}solids.push({cx:x,cz:z,r:.45,y0:0,y1:12});PINES.push([x,z])}}
 if(!mini){const gl=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(dr);
  gl.load(new URL(`../models/heungdeok/${key}.glb`,import.meta.url).href,g=>{const o=g.scene;o.userData.noBatch=true;o.traverse(e=>{if(e.isMesh){e.castShadow=e.receiveShadow=true;if(e.material){e.material.roughness=.92;e.material.metalness=0;e.material.envMapIntensity=.55;e.material.transparent=false;e.material.alphaTest=0;e.material.alphaHash=false}cam.push(e)}});G.add(o)},undefined,()=>{});
  fetch(new URL('../models/heungdeok/floors.json',import.meta.url).href).then(r=>r.json()).then(F=>{for(const[x0,x1,z0,z1,h]of(F[key]||[]))solids.push({x0,x1,y0:-1,y1:h,z0,z1})}).catch(()=>{})}
 solids.push({cx:0,cz:0,r:mr,y0:-1,y1:30});
 return {G,solids,cam,spots,r,M,PINES,mini}}
export function buildHeungdeok(opts={}){const B=base('heungdeok',13.2,826,opts);const {G,solids,cam,spots,M,PINES}=B;
 spots.push({x:0,y:0,z:22,r:3.4,t:'흥덕왕릉',h:'신라 42대 흥덕왕(재위 826~836)의 무덤이에요. 봉분 둘레를 십이지신을 새긴 호석과 돌난간이 감싸요. 실측 그대로 실제 크기예요. '+SRC});
 spots.push({x:13,y:0,z:14,r:2.6,t:'무인석',h:'능 앞을 지키는 무인 돌사람이에요. 깊은 눈과 높은 코, 곱슬 수염이 서역 사람 같아요. 신라가 멀리 서역과도 오갔다는 흔적이에요. '+SRC});
 spots.push({x:-13,y:0,z:14,r:2.6,t:'문인석',h:'홀을 든 문신 돌사람이에요. 무인석과 마주 보며 능을 지켜요. '+SRC});
 spots.push({x:0,y:0,z:-24,r:3,t:'도래솔 숲',h:'왕릉 둘레를 감싼 굽은 소나무 숲을 도래솔이라 해요. 흥덕왕릉 솔숲은 경주에서 가장 아름답다고 손꼽혀요.'});
 /* 솔방울 줍기(11/20): 도래솔 숲 아래 솔방울 스물을 60초 안에 */
 window.__HDPINE=()=>{if(document.getElementById('hpnP'))return;const H=window.__H3,ctx=H.ctx();try{H.tp(0,30,0);H.face(Math.PI)}catch(e){}
  const g=new THREE.Group();G.add(g);const cones=[];const cm=M(0x7a5030,{roughness:.9});for(let i=0;i<20;i++){const p=PINES[(i*7)%PINES.length]||[30,0];const a=Math.random()*6.28,d=1.4+Math.random()*2.4;const x=p[0]+Math.cos(a)*d,z=p[1]+Math.sin(a)*d;const c=new THREE.Mesh(new THREE.ConeGeometry(.16,.34,7),cm);c.position.set(x,.2,z);c.rotation.x=Math.PI;g.add(c);const glow=new THREE.Mesh(new THREE.RingGeometry(.35,.5,16),new THREE.MeshBasicMaterial({color:0xffe08a,transparent:true,opacity:.5,depthWrite:false,side:THREE.DoubleSide}));glow.rotation.x=-Math.PI/2;glow.position.set(x,.03,z);g.add(glow);cones.push({x,z,c,glow,got:false})}
  const d=document.createElement('div');d.id='hpnP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#22301e;border:3px solid #e0b048;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const TL=60;let n=0,done=false,t0=performance.now()/1000;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffd890">🌲 도래솔 숲 솔방울 줍기</b><div id="hpnS" style="font:20px 'Do Hyeon',sans-serif;margin:4px 0">0 / 20</div><div id="hpnT" style="font-size:13px">${TL}초</div><div style="font-size:12px;opacity:.85">왕릉을 감싼 솔숲 아래 솔방울을 주워요. 노란 고리를 찾아요</div>`;const Sx=d.querySelector('#hpnS'),T=d.querySelector('#hpnT');
  const pick=()=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='triangle';o.frequency.value=880+n*30;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+.2);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+.22)}catch(e){}};
  const fin=()=>{if(done)return;done=true;const el=performance.now()/1000-t0;const Q=n>=20?Math.max(70,Math.round(100-Math.max(0,el-35)*1.2)):Math.round(n/20*65);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('heungdeok_pine',Q,'도래솔 숲 솔방울 줍기')}catch(e){}window.__HDPQ=Q;
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffd890">솔방울 ${n}개를 주웠어요</b><div style="font-size:13px;margin:4px 0">도래솔은 무덤을 지키는 소나무예요. 천 년 넘게 왕릉 곁을 지켜 왔어요.</div><div style="font-size:26px;color:#e0b048">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#e0b048;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__HDPINE(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},800)};
  const loop=()=>{if(!d.isConnected){G.remove(g);return}const now=performance.now()/1000;const P=H.P;
   if(!done){for(const c of cones)if(!c.got&&Math.hypot(P.x-c.x,P.z-c.z)<1.2){c.got=true;c.c.visible=false;c.glow.visible=false;n++;pick();if(n>=20)fin()}Sx.textContent=n+' / 20';const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin()}
   for(const c of cones)if(!c.got)c.glow.material.opacity=.35+Math.sin(now*4+c.x)*.15;
   requestAnimationFrame(loop)};loop();window.__HPN={cones,get n(){return n}};try{ctx.say('흥덕왕릉 도래솔 숲이에요. 솔방울을 주워 봐요!',2.5)}catch(e){}};
 spots.push({x:-5,y:0,z:30,r:2.4,t:'솔숲 입구',h:'흥덕왕릉 둘레 도래솔 숲으로 들어가는 길이에요. 솔방울을 주워 봐요.'});
 const meta={quest:{t:'흥덕왕릉 둘러보기',d:'신라 흥덕왕릉과 석물을 실측 그대로 둘러보세요.',steps:[['흥덕왕릉','흥덕왕릉'],['무인석','무인석'],['문인석','문인석'],['도래솔','도래솔 숲']]},
  title:'경주 흥덕왕릉',hint:'국가유산청이 실측한 흥덕왕릉을 실제 크기로 놓았어요. 서역 사람 얼굴의 무인석을 찾아보고, 도래솔 숲에서 솔방울도 주워 봐요. '+SRC,
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,sign:{x:-6,z:40,lines:['경주 흥덕왕릉','신라 42대 흥덕왕(826~836)','십이지 호석 · 무인석 · 문인석','실측 3D · 실제 크기']}},
  npc:[['science',[[-5,36],[5,36],[5,44],[-5,44]]]],bounds:[-90,90,-90,90],level:()=>'흥덕왕릉',camCap:()=>Infinity,baseAt:()=>0,tick:()=>{},
  mini:{S:2,ox:0,oz:4,draw(g,X,Z,S){g.fillStyle='#6f9248';g.fillRect(0,0,300,300);g.fillStyle='#b8a070';g.beginPath();g.arc(X(0),Z(0),12*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:46,yaw:Math.PI},size:{}},meta)}
export function buildGyeongdeok(opts={}){const B=base('gyeongdeok',12,742,opts);const {G,solids,cam,spots,M}=B;
 spots.push({x:0,y:0,z:22,r:3.4,t:'경덕왕릉',h:'신라 35대 경덕왕(재위 742~765)의 무덤이에요. 성덕대왕신종을 만들기 시작하고 불국사·석굴암을 세우던 때의 임금이에요. 봉분 둘레 호석에 십이지신을 새겼어요. 실측 그대로 실제 크기예요. '+SRC});
 spots.push({x:-14,y:0,z:10,r:2.6,t:'십이지 호석',h:'봉분 아래를 두른 돌 사이사이에 갑옷 입은 십이지신을 새겨 넣었어요. '+SRC});
 const DTM=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.7},o));
 const ITEMS=[{n:'신라 기와 조각',h:'능 둘레 제사 건물에 얹었던 기와 조각이에요.',mk:()=>{const g=new THREE.Group();const t=new THREE.Mesh(new THREE.CylinderGeometry(.33,.33,.8,16,1,true,0,Math.PI),DTM(0x5a5650,{side:THREE.DoubleSide}));t.rotation.z=Math.PI/2;t.position.y=.4;g.add(t);return g}},
  {n:'굽다리 접시',h:'제사 음식을 올리던 신라 토기 접시예요.',mk:()=>{const g=new THREE.Group();const m=DTM(0x4a4a4c);const c=new THREE.Mesh(new THREE.CylinderGeometry(.32,.2,.16,18),m);c.position.y=.5;g.add(c);const f=new THREE.Mesh(new THREE.CylinderGeometry(.08,.24,.38,12),m);f.position.y=.22;g.add(f);return g}},
  {n:'청동 숟가락',h:'신라 사람들이 쓰던 청동 숟가락이에요.',mk:()=>{const g=new THREE.Group();const m=DTM(0x7a8a5a,{metalness:.6,roughness:.4});const h=new THREE.Mesh(new THREE.BoxGeometry(.05,.02,.7),m);h.position.y=.4;g.add(h);const b=new THREE.Mesh(new THREE.SphereGeometry(.12,12,8),m);b.scale.set(1,.3,1.3);b.position.set(0,.4,.42);g.add(b);return g}},
  {n:'호석 돌 조각',h:'호석에서 떨어져 나온 십이지신 조각이에요. 발굴하면 제자리를 찾아 다시 끼워요.',mk:()=>{const g=new THREE.Group();const b=new THREE.Mesh(new THREE.BoxGeometry(.7,.6,.2),DTM(0x9a948a));b.position.y=.4;g.add(b);return g}},
  {n:'토우 말',h:'흙으로 빚은 작은 말 인형이에요.',mk:()=>{const g=new THREE.Group();const m=DTM(0x9a7a5a);const b=new THREE.Mesh(new THREE.BoxGeometry(.5,.22,.18),m);b.position.y=.42;g.add(b);const h=new THREE.Mesh(new THREE.BoxGeometry(.14,.26,.14),m);h.position.set(.26,.56,0);g.add(h);for(const[x,z]of[[.18,.06],[.18,-.06],[-.18,.06],[-.18,-.06]]){const l=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.3,5),m);l.position.set(x,.18,z);g.add(l)}return g}}];
 window.__GDDIG=()=>{window.__DETECT&&window.__DETECT({key:'gyeongdeok_dig',title:'경덕왕릉 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[-20,24],[20,26],[-26,0],[26,-4],[0,32],[-18,-22],[18,-24],[10,36]],items:ITEMS,intro:'경덕왕릉 둘레 땅속에 신라 유물이 묻혀 있대요. 탐지기로 찾아 봐요!',okText:'왕릉 둘레는 발굴로 제사 터와 유물을 찾아 옛 모습을 알아내요.'})};
 spots.push({x:6,y:0,z:30,r:2.4,t:'발굴 탐지 자리',h:'경덕왕릉 둘레 땅속에 신라 유물이 묻혀 있어요. 무이 탐지기로 찾아 봐요.'});
 const meta={quest:{t:'경덕왕릉 둘러보기',d:'신라 경덕왕릉을 실측 그대로 둘러보세요.',steps:[['경덕왕릉','경덕왕릉'],['호석','십이지 호석']]},
  title:'경주 경덕왕릉',hint:'국가유산청이 실측한 경덕왕릉을 실제 크기로 놓았어요. 비탈 위 봉분과 십이지 호석을 둘러보고 발굴 탐지도 해 봐요. '+SRC,
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,sign:{x:-6,z:40,lines:['경주 경덕왕릉','신라 35대 경덕왕(742~765)','십이지 호석 · 돌난간','실측 3D · 실제 크기']}},
  npc:[['science',[[-5,36],[5,36],[5,44],[-5,44]]]],bounds:[-90,90,-90,90],level:()=>'경덕왕릉',camCap:()=>Infinity,baseAt:()=>0,tick:()=>{},
  mini:{S:2,ox:0,oz:4,draw(g,X,Z,S){g.fillStyle='#6f9248';g.fillRect(0,0,300,300);g.fillStyle='#b8a070';g.beginPath();g.arc(X(0),Z(0),12*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:46,yaw:Math.PI},size:{}},meta)}
