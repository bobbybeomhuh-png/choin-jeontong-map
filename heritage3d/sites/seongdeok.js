/* 경주 성덕왕릉 마당(2026-11-20): 국가유산청이 실측한 3D(스케치팹 KHS_Asset, CC BY 4.0)를 실제 크기·실측 위치 그대로.
   통일신라 성덕왕(재위 702~737)의 무덤. 봉분과 둘레 돌난간, 상석, 석사자, 문인석은 측량 좌표가 같아 서로 떨어진 거리까지 실제대로 놓임.
   놀이: 봉분 둘레를 걸으며 십이지신(쥐→돼지)을 순서대로 찾기. 걷는 놀이라 VR 안경으로도 그대로. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildSeongdeok(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(737);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 측량 좌표 → 마당: 봉분 가운데(원본 x 6.4, z -4.15)를 0으로, 앞(상석 쪽)이 +z를 보게 180도 돌림. 조각마다 바닥 높이만 0에 맞춤 */
 const OX=6.4,OZ=-4.15,ROT=Math.PI;const W=(x,z)=>{const dx=x-OX,dz=z-OZ;return[-dx,-dz]};
 const PARTS=[['tomb',1.44],['lion',2.88],['literatus',1.51],['table',2.85]];
 /* 땅: 잔디 능역, 솔숲, 참배길 */{const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#6f9248';q.fillRect(0,0,w,h);for(let i=0;i<3400;i++){q.fillStyle=r()<.5?'rgba(80,115,40,.5)':'rgba(150,165,90,.35)';q.fillRect(r()*w,r()*h,2,2)}},[40,40]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(240,240),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr);
  const KT=tex(256,256,(q,w,h)=>{q.fillStyle='#b8ad98';q.fillRect(0,0,w,h);for(let i=0;i<2400;i++){const v=140+(r()*70|0);q.fillStyle=`rgb(${v},${v-6},${v-16})`;q.fillRect(r()*w,r()*h,3,3)}},[3,20]);const pth=new THREE.Mesh(new THREE.PlaneGeometry(4,36),new THREE.MeshStandardMaterial({map:KT,roughness:1}));pth.rotation.x=-Math.PI/2;pth.position.set(0,.03,34);G.add(pth)}
 if(!mini){const tr=M(0x6a4a30),pn=M(0x355a30);for(let i=0;i<34;i++){const a=i/34*Math.PI*2+r()*.12,d=46+r()*16;const x=Math.cos(a)*d,z=Math.sin(a)*d;if(z>30&&Math.abs(x)<10)continue;const h=6+r()*4;const t=new THREE.Mesh(new THREE.CylinderGeometry(.3,.45,h,7),tr);t.position.set(x,h/2,z);t.rotation.z=(r()-.5)*.15;G.add(t);const c=new THREE.Mesh(new THREE.ConeGeometry(2.6+r(),4.5,8),pn);c.position.set(x,h+1.4,z);G.add(c);solids.push({cx:x,cz:z,r:.5,y0:0,y1:12})}}
 /* 봉분과 돌난간은 넘어가지 않게(둥근 막이) */solids.push({cx:0,cz:0,r:9.4,y0:0,y1:30});
 if(!mini){const gl=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(dr);
  for(const[n,lift]of PARTS)gl.load(new URL('../models/seongdeok/'+n+'.glb',import.meta.url).href,g=>{const o=g.scene;const p=new THREE.Group();p.rotation.y=ROT;o.position.set(-OX,lift,-OZ);p.add(o);o.userData.noBatch=true;p.userData.noBatch=true;o.traverse(e=>{if(e.isMesh){e.castShadow=e.receiveShadow=true;if(e.material){e.material.roughness=.9;e.material.metalness=0;e.material.envMapIntensity=.6}cam.push(e)}});G.add(p);
   if(n!=='tomb'){const bx=new THREE.Box3().setFromObject(p);solids.push({x0:bx.min.x,x1:bx.max.x,y0:0,y1:bx.max.y,z0:bx.min.z,z1:bx.max.z})}},undefined,()=>{})}
 const SRC='(3D: 국가유산청 KHS_Asset, Sketchfab, CC BY 4.0)';
 const [tx,tz]=W(-4.3,-17.6),[lx,lz]=W(-28.8,-.8),[mx,mz]=W(25.8,-15.2);
 spots.push({x:0,y:0,z:14,r:3.4,t:'성덕왕릉',h:'통일신라 33대 성덕왕(재위 702~737)의 무덤이에요. 봉분 아래를 둘레돌이 감싸고, 그 밖을 돌난간이 둘러요. 둘레에는 십이지신상이 서 있어요. 측량 좌표 그대로 실제 크기예요. '+SRC});
 spots.push({x:tx,y:0,z:tz+2.2,r:2.4,t:'상석',h:'제사 때 음식을 차리던 돌상이에요. 실측 위치 그대로예요. '+SRC});
 spots.push({x:lx,y:0,z:lz+2.6,r:2.4,t:'석사자',h:'능을 지키는 돌사자예요. 원래 네 모서리에 있었고 지금은 몇 마리만 남았어요. '+SRC});
 spots.push({x:mx,y:0,z:mz+2.4,r:2.4,t:'문인석',h:'관복을 입고 홀을 든 문신 모습의 돌사람이에요. 능 앞을 지켜요. '+SRC});
 spots.push({x:0,y:0,z:-13,r:3,t:'십이지신 둘레길',h:'봉분 둘레에 열두 띠 동물 신이 방향마다 서서 능을 지켜요. 북쪽 쥐부터 시계 방향으로 돌아보세요. '+SRC});
 /* 십이지신 찾기(11/20): 북쪽(쥐)부터 시계 방향으로 열두 띠 자리를 차례로 밟기. 다음 자리에는 빛기둥. 90초 */
 const ZOD=[['쥐','🐭'],['소','🐮'],['범','🐯'],['토끼','🐰'],['용','🐲'],['뱀','🐍'],['말','🐴'],['양','🐑'],['원숭이','🐵'],['닭','🐔'],['개','🐶'],['돼지','🐷']];const ZR=11.2;
 const zPos=i=>{const a=-Math.PI/2+i*Math.PI/6;return[Math.cos(a)*ZR,Math.sin(a)*ZR]};/* -z(뒤)=북쪽 쥐, 시계 방향으로 */
 window.__SDZOD=()=>{if(document.getElementById('zdP'))return;const H=window.__H3,ctx=H.ctx();try{const[x,z]=zPos(0);H.tp(x+2,z-2.5,0);H.face(Math.PI);H.cam(.6,.5,9)}catch(e){}
  const g=new THREE.Group();G.add(g);const mk=[];for(let i=0;i<12;i++){const[x,z]=zPos(i);const c=document.createElement('canvas');c.width=c.height=128;const q=c.getContext('2d');q.fillStyle='rgba(40,28,18,.85)';q.beginPath();q.arc(64,64,60,0,7);q.fill();q.strokeStyle='#e0b048';q.lineWidth=6;q.stroke();q.font='64px serif';q.textAlign='center';q.textBaseline='middle';q.fillText(ZOD[i][1],64,58);q.font='bold 22px sans-serif';q.fillStyle='#fff4dc';q.fillText(ZOD[i][0],64,108);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,depthWrite:false}));s.scale.set(1.3,1.3,1);s.position.set(x,1.6,z);g.add(s);const d0=new THREE.Mesh(new THREE.CircleGeometry(1.1,24),new THREE.MeshBasicMaterial({color:0xe0b048,transparent:true,opacity:.35,depthWrite:false}));d0.rotation.x=-Math.PI/2;d0.position.set(x,.05,z);g.add(d0);mk.push({s,d0,x,z})}
  const beam=new THREE.Mesh(new THREE.CylinderGeometry(.6,.6,8,16,1,true),new THREE.MeshBasicMaterial({color:0xffe08a,transparent:true,opacity:.28,depthWrite:false,side:THREE.DoubleSide}));beam.position.y=4;g.add(beam);
  const d=document.createElement('div');d.id='zdP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2016;border:3px solid #e0b048;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const TL=90;let idx=0,done=false,t0=performance.now()/1000;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffd890">🐉 십이지신 둘레길</b><div id="zdS" style="font:20px 'Do Hyeon',sans-serif;margin:4px 0">다음: 🐭 쥐</div><div id="zdT" style="font-size:13px">90초 · 0 / 12</div><div style="font-size:12px;opacity:.85">빛기둥이 선 띠 자리를 차례로 밟아요. 북쪽 쥐부터 시계 방향이에요</div>`;const S=d.querySelector('#zdS'),T=d.querySelector('#zdT');
  const ding=i=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='sine';o.frequency.value=[523,587,659,698,784,880,988,1047,1175,1319,1397,1568][i];gg.gain.setValueAtTime(.08,s);gg.gain.exponentialRampToValueAtTime(.0001,s+.9);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+1)}catch(e){}};
  const fin=()=>{if(done)return;done=true;const el=performance.now()/1000-t0;const Q=idx>=12?Math.max(70,Math.round(100-Math.max(0,el-45)*.8)):Math.round(idx/12*65);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('seongdeok_zodiac',Q,'십이지신 둘레길')}catch(e){}window.__SDZQ=Q;beam.visible=false;
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffd890">${idx>=12?'열두 띠를 다 만났어요':'띠 '+idx+'개를 만났어요'}</b><div style="font-size:13px;margin:4px 0">${idx>=12?'성덕왕릉을 한 바퀴 지켜 돌았어요!':'다음엔 빛기둥을 따라 쭉 돌아요.'}</div><div style="font-size:26px;color:#e0b048">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#e0b048;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__SDZOD(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},800)};
  const loop=()=>{if(!d.isConnected){G.remove(g);return}const now=performance.now()/1000;const P=H.P;
   if(!done){const m=mk[idx];beam.position.x=m.x;beam.position.z=m.z;beam.material.opacity=.22+Math.sin(now*4)*.08;if(Math.hypot(P.x-m.x,P.z-m.z)<1.6){m.d0.material.color.setHex(0x8fe08a);m.d0.material.opacity=.6;ding(idx);try{ctx.say(ZOD[idx][0]+'신을 만났어요!'+(idx===11?' 열두 띠 끝!':''),1.4)}catch(e){}idx++;if(idx>=12){fin()}else S.textContent='다음: '+ZOD[idx][1]+' '+ZOD[idx][0]}
    const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초 · '+idx+' / 12';if(left<=0)fin()}
   for(const m of mk)m.s.position.y=1.6+Math.sin(now*2+m.x)*.08;requestAnimationFrame(loop)};loop();
  window.__ZDG={get idx(){return idx},pos:zPos};try{ctx.say('성덕왕릉 둘레에 열두 띠 신이 서 있어요. 북쪽 쥐부터 차례로 만나 봐요!',3)}catch(e){}};
 const tick=()=>{};
 const meta={quest:{t:'성덕왕릉 둘러보기',d:'통일신라 왕릉과 석물을 찾아보세요. 측량 좌표 그대로 실제 크기예요.',steps:[['성덕왕릉','성덕왕릉'],['상석','상석'],['석사자','석사자'],['문인석','문인석'],['십이지신','십이지신 둘레길']]},
  title:'경주 성덕왕릉',hint:'국가유산청이 실측한 성덕왕릉을 측량 좌표 그대로 실제 크기로 놓았어요. 봉분 둘레를 걸으며 상석·석사자·문인석을 찾고, 십이지신 둘레길도 돌아 보세요. '+SRC,
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,sign:{x:-7,z:40,lines:['경주 성덕왕릉','통일신라 성덕왕(702~737)','봉분 · 돌난간 · 석물','실측 3D · 실제 크기']}},
  npc:[['base',[[-5,38],[5,38],[5,46],[-5,46]]],['science',[[-14,14],[14,14],[14,18],[-14,18]]]],
  bounds:[-80,80,-80,80],level:()=>'성덕왕릉',camCap:()=>Infinity,
  baseAt:()=>0,tick,
  mini:{S:2,ox:0,oz:2,draw(g,X,Z,S){g.fillStyle='#6f9248';g.fillRect(0,0,300,300);g.fillStyle='#b8a070';g.beginPath();g.arc(X(0),Z(0),8*S,0,7);g.fill();g.strokeStyle='#8a8070';g.lineWidth=2;g.beginPath();g.arc(X(0),Z(0),9.4*S,0,7);g.stroke();g.fillStyle='#b8ad98';g.fillRect(X(-2),Z(16),4*S,36*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:46,yaw:Math.PI},size:{}},meta)}
