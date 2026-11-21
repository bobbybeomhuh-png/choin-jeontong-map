/* 철원 도피안사·고석정 마당(2026-11-22, W39): 공개 실측 1점 + 공개 사진·수치로 간추려 지음.
   공개 실측: 통일신라 말 「돌 비로자나불 좌상」(국가유산청 KHS_Asset CC BY, 대좌·광배 포함 높이 약 2.9m) — 도피안사 철조비로자나불(국보, 865)과 같은 시기·같은 지권인 부처. 전시 「같은 꼴」로 놓음.
   고석정(한탄강, 국가지질공원): 용암이 식으며 생긴 육각 기둥 모양 주상절리 협곡과 강 가운데 우뚝 선 바위(고석), 임꺽정이 숨어 지냈다는 이야기.
   철원 평야는 겨울마다 두루미(천연기념물)와 재두루미가 찾아오는 곳.
   놀이: 두루미 세기(날아가는 무리 가운데 두루미만 세기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {stonePagoda} from './stonekit.js';
export function buildCheorwon(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(865);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 동쪽 한탄강 협곡(x 26~46, 깊이 10m) */const C0=26,C1=46;const H=(x,z)=>x>C0&&x<C1?-10:0;
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0xa8a060,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 협곡: 바닥 강물 + 양쪽 주상절리 벽(육각 기둥) */{const WT=tex(128,128,(q,w,h)=>{q.fillStyle='#4a7a78';q.fillRect(0,0,w,h);for(let i=0;i<60;i++){q.strokeStyle='rgba(230,245,250,.25)';const x=Math.random()*w,y=Math.random()*h;q.beginPath();q.moveTo(x,y);q.lineTo(x,y+12);q.stroke()}},[2,12]);const rv=new THREE.Mesh(new THREE.PlaneGeometry(C1-C0,200),new THREE.MeshStandardMaterial({map:WT,roughness:.1}));rv.rotation.x=-Math.PI/2;rv.position.set((C0+C1)/2,.04,0);G.add(rv);
  const bm=M(0x4a4440,{flatShading:true});const col=new THREE.InstancedMesh(new THREE.CylinderGeometry(.6,.6,1,6),bm,800);const o=new THREE.Object3D();let n=0;for(const side of[C0,C1])for(let z=-96;z<96&&n<800;z+=1.1){const h=4+Math.abs(Math.sin(z*.7+side))*3;o.position.set(side+(side===C0?-.4:.4),h/2,z);o.scale.set(1,h,1);o.rotation.y=(z*13)%1;o.updateMatrix();col.setMatrixAt(n++,o.matrix)}col.count=n;G.add(col);
  solids.push({x0:C0-.2,x1:C1+.2,y0:-12,y1:20,z0:-200,z1:200});
  const rock=new THREE.Mesh(new THREE.CylinderGeometry(2.6,3.4,9,7),M(0x6a6458,{flatShading:true}));rock.position.set((C0+C1)/2,3.5,-6);G.add(rock)}
 if(!mini){const h=buildHall({x:C0-6,z:-6,ry:-Math.PI/2,W:4,D:4,nx:1,nz:1,FY:.6,PH:2.6,roof:'hip',name:'孤石亭',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',stairs:'none',rail:true,roofScale:.8,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 /* 도피안사: 대적광전 + 삼층석탑 + 비로자나불 실측(같은 꼴) */const DX=-30,DZ=-14;if(!mini){const h=buildHall({x:DX,z:DZ-10,ry:0,W:9,D:6,nx:3,nz:2,FY:1,PH:3.2,roof:'hip',name:'大寂光殿',pillar:0x9a3a26,bracket:'dapo',front:'open',roofScale:.95,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)});
  const L=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');L.setDRACOLoader(dr);L.load(new URL('../models/cheorwon/vairocana.glb',import.meta.url).href,m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;if(e.material){e.material.transparent=false;e.material.alphaTest=0}}});const b=new THREE.Box3().setFromObject(o);const c=b.getCenter(new THREE.Vector3());const w=new THREE.Group();o.position.set(-c.x,-b.min.y,-c.z);w.add(o);w.position.set(DX,1,DZ-10.4);w.userData.noBatch=true;G.add(w)},undefined,()=>{})}
 try{const tp=stonePagoda(4.1);tp.position.set(DX,0,DZ+2);G.add(tp);solids.push({cx:DX,cz:DZ+2,r:1.2,y0:0,y1:5})}catch(e){}
 /* 들판의 두루미 몇 마리(장식) */const cranes=[];{const mk=()=>{const g=new THREE.Group();const b=new THREE.Mesh(new THREE.SphereGeometry(.35,10,8),M(0xf4f4f0));b.scale.set(1.5,1,1);b.position.y=1.1;g.add(b);const nk2=new THREE.Mesh(new THREE.CylinderGeometry(.05,.06,.9,6),M(0x1a1a1a));nk2.position.set(.45,1.55,0);nk2.rotation.z=-.35;g.add(nk2);const hd=new THREE.Mesh(new THREE.SphereGeometry(.09,8,6),M(0xd8241a));hd.position.set(.62,1.98,0);g.add(hd);for(const s of[-.08,.08]){const lg=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,.9,4),M(0x2a2a2a));lg.position.set(0,.45,s);g.add(lg)}return g};for(let i=0;i<7;i++){const c=mk();c.position.set(-70+r()*40,0,30+r()*30);c.rotation.y=r()*6;G.add(c);cranes.push(c)}}
 const NL=[];if(!mini){for(const[x,y,z]of[[DX,4,DZ-4],[C0-6,3,-2],[DX,3,DZ+6]]){const L=new THREE.PointLight(0xffc080,0,22,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0,tt=0;const nightTick=dt=>{tt+=dt;const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7;cranes.forEach((c,i)=>{c.children[1].rotation.z=-.35+Math.sin(tt*1.5+i)*.25})};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(DX+4,DZ-2,3,'도피안사','통일신라 865년에 세운 절이에요. 쇠로 만든 비로자나불(국보)과 삼층석탑(보물)이 있어요. 여기 부처님은 같은 시기·같은 손 모양(지권인)의 돌 비로자나불 실측이에요. 3D: 국가유산청, CC BY.');
 sp(C0-4,-12,3,'고석정','한탄강 가운데 우뚝 선 바위(고석)와 정자예요. 협곡 벽은 용암이 식으며 육각 기둥으로 갈라진 주상절리예요. 임꺽정이 이곳에 숨어 지냈다는 이야기가 전해요.');
 sp(-50,26,3,'두루미 들판','철원 평야는 겨울마다 두루미와 재두루미 수천 마리가 찾아오는 곳이에요(두루미는 천연기념물). 날아가는 무리를 세어 봐요.');
 sp(-10,30,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 두루미 세기(11/22): 하늘을 가로지르는 새 무리를 잠깐 보여 줘요(두루미=흰 몸·검은 목·붉은 머리, 재두루미=잿빛). 다 지나가면 두루미가 몇 마리였는지 골라요. 다섯 판 */
 window.__CWCRANE=()=>{if(document.getElementById('cwP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(-50,26,0)}catch(e){}
  const cv=document.createElement('canvas');cv.id='cwC';cv.style.cssText='position:fixed;inset:0;z-index:55;width:100%;height:100%;touch-action:none';document.body.appendChild(cv);const q=cv.getContext('2d');cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio;
  const RD=5;let rd=0,birds=[],phase='fly',t=0,ans=0,score=0,done=false,last=performance.now()/1000;
  const setup=()=>{const nW=4+rd*2+((Math.random()*4)|0),nG=3+rd+((Math.random()*3)|0);birds=[];for(let i=0;i<nW+nG;i++)birds.push({w:i<nW,x:-.1-Math.random()*.5,y:.15+Math.random()*.45,v:.22+Math.random()*.06,ph:Math.random()*6});ans=nW;phase='fly';t=0};setup();
  const d=document.createElement('div');d.id='cwP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:20px;z-index:60;background:#1a2028;border:3px solid #d8e0e8;border-radius:16px;padding:10px 14px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f0f4f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:290px;max-width:92vw;user-select:none";document.body.appendChild(d);
  const render=msg=>{if(phase==='ask'){const opts=[ans,ans+1,ans-1,ans+2].sort(()=>Math.random()-.5);d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif">🕊️ 두루미 세기</b><div style="font-size:13px;margin:4px 0">${rd+1} / ${RD}판 · 두루미(흰 몸)는 몇 마리였을까요?</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">${opts.map(v=>`<button data-v="${v}" style="font:18px 'Do Hyeon',sans-serif;background:#d8e0e8;color:#1a2028;border:0;border-radius:10px;padding:8px 0;cursor:pointer">${v}</button>`).join('')}</div>`;d.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>answer(+b.dataset.v))}else d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif">🕊️ 두루미 세기</b><div style="font-size:13px;margin:4px 0">${rd+1} / ${RD}판 · 흰 두루미만 세어요(잿빛 재두루미는 빼고)</div><div style="font-size:12px;color:#c8d8e8">${msg||''}</div>`};render();
  const snd=(f,len,type='sine')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const answer=v=>{if(done||phase!=='ask')return;const ok=v===ans;if(ok){score++;snd(880,.3)}else snd(200,.3,'sawtooth');rd++;if(rd>=RD){fin();return}const msg=ok?'맞아요! '+ans+'마리':'아쉬워요, '+ans+'마리였어요';setup();render(msg)};
  const cleanup=()=>cv.remove();
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(score/RD*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('cheorwon_crane',Q,'두루미 세기')}catch(e){}window.__CWQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif">${RD}판 가운데 ${score}판 맞혔어요</b><div style="font-size:13px;margin:4px 0">철원에서는 해마다 겨울에 두루미 수를 세어 보살펴요. 세계에 3천 마리 남짓 남은 두루미의 큰 쉼터가 비무장지대 가까운 철원 평야예요.</div><div style="font-size:24px;color:#d8e0e8">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#d8e0e8;color:#1a2028;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f0f4f8;border:2px solid #f0f4f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__CWCRANE()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}const now=performance.now()/1000,dt=Math.min(.05,now-last);last=now;const W=cv.width,Hh=cv.height,S=Math.min(W,Hh);
   if(!done){t+=dt;if(phase==='fly'){for(const b of birds){b.x+=b.v*dt;b.ph+=dt*6}if(birds.every(b=>b.x>1.1)){phase='ask';render()}}
    q.clearRect(0,0,W,Hh);const g=q.createLinearGradient(0,0,0,Hh);g.addColorStop(0,'rgba(140,170,200,.95)');g.addColorStop(1,'rgba(220,210,180,.95)');q.fillStyle=g;q.fillRect(0,0,W,Hh);q.fillStyle='#b8a870';q.fillRect(0,Hh*.78,W,Hh*.22);
    if(phase==='fly')for(const b of birds){const x=b.x*W,y=b.y*Hh,s=S*.03,f=Math.sin(b.ph)*s*.9;q.fillStyle=b.w?'#f8f8f4':'#8a8e94';q.beginPath();q.ellipse(x,y,s,s*.35,0,0,7);q.fill();q.beginPath();q.moveTo(x-s*.4,y);q.lineTo(x-s*.2,y-f-s*.2);q.lineTo(x+s*.4,y);q.fill();if(b.w){q.fillStyle='#1a1a1a';q.fillRect(x+s*.8,y-s*.12,s*.7,s*.18);q.fillStyle='#d8241a';q.beginPath();q.arc(x+s*1.5,y-s*.05,s*.14,0,7);q.fill()}else{q.fillStyle='#6a6e74';q.fillRect(x+s*.8,y-s*.12,s*.7,s*.18)}}}
   requestAnimationFrame(loop)};loop();
  window.__CWG={get ans(){return ans},get phase(){return phase},answer};try{ctx.say('흰 두루미만 세어 봐요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'철 조각',h:'쇠부처를 부어 만든 무쇠 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.DodecahedronGeometry(.07,0),M(0x3a3634,{metalness:.5})))})},
  {n:'현무암 조각',h:'한탄강 주상절리를 이룬 현무암이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.14,6),M(0x3a3634,{flatShading:true})))})},
  {n:'두루미 깃털',h:'겨울 들판에 떨어진 두루미 깃털이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.PlaneGeometry(.06,.24),new THREE.MeshStandardMaterial({color:0xf4f4f0,side:THREE.DoubleSide})))})},
  {n:'신라 기와 조각',h:'도피안사 둘레의 통일신라 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18),M(0x5a5a5a)))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__CWDIG=()=>{window.__DETECT&&window.__DETECT({key:'cheorwon_dig',title:'철원 발굴 탐지',emoji:'⛏️',bg:'#1a2028',count:4,TL:150,cand:[[-10,30],[0,50],[-60,-40],[10,-40],[-70,10],[16,40],[-20,50],[0,-60]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'철원은 용암 대지 위에 자리한 고장이에요.'})};
 const meta={quest:{t:'철원 둘러보기',d:'도피안사·고석정·두루미 들판을 둘러보세요.',steps:[['도피안사','도피안사'],['고석정','고석정'],['두루미','두루미 들판']]},
  title:'철원 도피안사·고석정',hint:'도피안사와 한탄강 주상절리·고석정을 간추려 지었고, 비로자나불은 같은 시기 공개 실측(CC BY)이에요. 두루미를 세어 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,groundY:-1,sign:{x:-6,z:12,lines:['철원 도피안사·고석정','한탄강 주상절리','두루미의 고장','간추림 · 실측 1점']}},
  npc:[['science',[[-10,10],[-2,10],[-2,18],[-10,18]]]],bounds:[-90,C0,-90,90],level:()=>'철원',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.1,ox:-10,oz:0,draw(g,X,Z,S){g.fillStyle='#a8a060';g.fillRect(0,0,300,300);g.fillStyle='#4a7a78';g.fillRect(X(C0),0,(C1-C0)*S,300);g.fillStyle='#9a3a26';g.fillRect(X(DX-4.5),Z(DZ-13),9*S,6*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-6,z:16,yaw:Math.PI},size:{}},meta)}
