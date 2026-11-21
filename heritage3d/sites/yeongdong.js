/* 영동·괴산 마당(2026-11-22, W44): 충북 남쪽 국악의 고장 영동과 괴산 화양구곡.
   실측: 운라(국가유산청 KHS 공개 실측 「종묘 제례 악기 에셋 010」, CC BY). 놋징 지름 약 10cm에 맞춰 전체 높이 0.8m로 맞춤.
   영동: 세종 때 아악을 바로잡은 난계 박연의 고향. 난계사(사당)와 국악 마당을 간추려 지음.
   괴산 화양구곡: 송시열이 머문 계곡, 물가 너럭바위 위 암서재(정자). 간추려 지음.
   놀이: 운라 소리 맞히기(같은 크기 놋징이 두께에 따라 소리가 달라요. 들려준 소리와 같은 징 찾기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildYeongdong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1378);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x8a9a4a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 국악 마당: 앞이 트인 전각 안에 운라(실측) */const HX=0,HZ=-14;if(!mini){const h=buildHall({x:HX,z:HZ,ry:0,W:12,D:8,nx:3,nz:2,FY:1,PH:3.6,roof:'hip',name:'蘭溪國樂',pillar:0x9a3a26,bracket:'dapo',front:'open',roofScale:1,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 const PJ={x:HX,y:1.32,z:HZ+1.2};
 if(!mini){const L=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');L.setDRACOLoader(dr);L.load(new URL('../models/yeongdong/unra.glb',import.meta.url).href,m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;if(e.material){e.material.transparent=false;e.material.alphaTest=0}}});const b=new THREE.Box3().setFromObject(o);const c=b.getCenter(new THREE.Vector3());o.position.set(-c.x,-b.min.y,-c.z);const w=new THREE.Group();w.add(o);w.position.set(PJ.x,PJ.y,PJ.z);w.userData.noBatch=true;G.add(w)},undefined,()=>{})}
 /* 난계사: 박연 사당(서쪽 담 안 작은 사당) */const NX=-30,NZ=-20;if(!mini){const h=buildHall({x:NX,z:NZ,ry:0,W:7,D:5,nx:3,nz:1,FY:.8,PH:2.8,roof:'gable',name:'蘭溪祠',pillar:0x9a3a26,bracket:'ik',front:'door',roofScale:.9,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 {const wm=M(0xb8a890);for(const[x0,z0,x1,z1]of[[NX-8,NZ-7,NX+8,NZ-7],[NX-8,NZ-7,NX-8,NZ+7],[NX+8,NZ-7,NX+8,NZ+7],[NX-8,NZ+7,NX-1.5,NZ+7],[NX+1.5,NZ+7,NX+8,NZ+7]]){const L=Math.hypot(x1-x0,z1-z0);const w=new THREE.Mesh(new THREE.BoxGeometry(L+.4,1.6,.4),wm);w.position.set((x0+x1)/2,.8,(z0+z1)/2);w.rotation.y=-Math.atan2(z1-z0,x1-x0);G.add(w);solids.push({x0:Math.min(x0,x1)-.3,x1:Math.max(x0,x1)+.3,y0:0,y1:1.6,z0:Math.min(z0,z1)-.3,z1:Math.max(z0,z1)+.3})}
  const gate=new THREE.Group();gate.position.set(NX,0,NZ+7);for(const sx of[-1.4,1.4]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,2.6,8),M(0x9a3a26));p.position.set(sx,1.3,0);gate.add(p)}const gr=new THREE.Mesh(new THREE.BoxGeometry(3.6,.3,.9),M(0x3a4048));gr.position.y=2.7;gate.add(gr);G.add(gate)}
 /* 괴산 화양구곡: 동쪽 계곡 물길 + 너럭바위 + 암서재 */const VX=40,VZ=10;{const WM=M(0x5a9ab0,{roughness:.2,metalness:.1});const st=new THREE.Mesh(new THREE.PlaneGeometry(10,120),WM);st.rotation.set(-Math.PI/2,0,.12);st.position.set(VX,.04,VZ);G.add(st);const RM=M(0xd8d0c0,{flatShading:true,roughness:.8});for(let k=0;k<16;k++){const rk=new THREE.Mesh(new THREE.DodecahedronGeometry(1+r()*2.2,0),RM);const z=VZ-50+k*6.5+r()*2,side=k%2?1:-1;rk.position.set(VX+side*(4.4+r()*2)-(z-VZ)*.12,.4,z);rk.scale.y=.5;rk.rotation.y=r()*3;G.add(rk)}
  const ban=new THREE.Mesh(new THREE.CylinderGeometry(5.5,6.2,1.6,9),RM);ban.position.set(VX+9,.8,VZ-6);G.add(ban);solids.push({cx:VX+9,cz:VZ-6,r:5.8,y0:0,y1:1.6});
  const pv=new THREE.Group();pv.position.set(VX+9,1.6,VZ-6);const fl=new THREE.Mesh(new THREE.BoxGeometry(4.4,.25,3.4),M(0x8a6a44));fl.position.y=.2;pv.add(fl);for(const[px,pz]of[[-2,-1.5],[2,-1.5],[2,1.5],[-2,1.5]]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,2.4,8),M(0x8a5a3a));p.position.set(px,1.4,pz);pv.add(p)}const wl=new THREE.Mesh(new THREE.BoxGeometry(4,2,.1),M(0xe8e0d0));wl.position.set(0,1.4,-1.45);pv.add(wl);const pr=new THREE.Mesh(new THREE.CylinderGeometry(.2,3.4,1.4,4),M(0x4a5058));pr.rotation.y=Math.PI/4;pr.scale.z=.8;pr.position.y=3.2;pv.add(pr);G.add(pv);
  /* 첨성대(별 보던 바위 봉우리) */const cs=new THREE.Mesh(new THREE.CylinderGeometry(1.2,3.4,11,7),RM);cs.position.set(VX+14,5.5,VZ+24);G.add(cs);solids.push({cx:VX+14,cz:VZ+24,r:3,y0:0,y1:11});
  for(let k=0;k<20;k++){const t=new THREE.Mesh(new THREE.ConeGeometry(1.3,4.4,7),M(0x2a4a24));t.position.set(VX+16+r()*20,2.2,VZ-50+r()*100);G.add(t)}}
 const NL=[];if(!mini){for(const[x,y,z]of[[HX,4,HZ+5],[NX,3,NZ+8],[VX+9,4,VZ-6]]){const L=new THREE.PointLight(0xffc080,0,24,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8)};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(HX,HZ+6,3,'운라','작은 놋징 열 개를 나무틀에 매단 악기 운라예요(국가유산청 공개 실측, 실제 크기). 징 크기는 모두 같고 두께가 달라서, 두꺼울수록 높은 소리가 나요. 영동은 우리 음악을 바로잡은 박연의 고향이라 국악기 마당을 꾸몄어요.');
 sp(HX+4,HZ+7,2.2,'운라 치는 자리','들려주는 소리와 같은 징을 찾아 쳐 봐요.');
 sp(NX,NZ+9.5,3,'난계사','영동에서 난 난계 박연을 모신 사당이에요. 박연은 세종 때 궁중 음악의 음높이를 바로잡고, 우리 돌로 편경을 새로 만들었어요. 간추려 지었어요.');
 sp(VX+2,VZ-6,3,'괴산 화양구곡','맑은 물과 하얀 너럭바위가 아홉 굽이 이어지는 계곡이에요(국가 명승). 바위 위 정자 암서재는 송시열이 글을 읽던 곳이에요. 간추려 지었어요.');
 sp(VX+8,VZ+24,2.6,'첨성대 바위','별을 바라보던 곳이라 해서 이름 붙은 우뚝한 바위 봉우리예요.');
 sp(-24,40,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 편종 소리 맞히기(11/22): 8판. 「소리 듣기」로 들려준 음과 같은 종을 16개 가운데 골라요. 종을 누르면 그 소리가 나고, 「이 종이에요」로 정해요. 첫 번에 맞히면 1점, 두 번째 0.5점, 세 번째에 틀리면 답을 보여 줘요 */
 const NM=['황종','태주','중려','임종','남려','청황종','청태주','청중려','청임종','청남려'];const SEMI=[0,2,5,7,9,12,14,17,19,21];const HZQ=i=>311.1*Math.pow(2,SEMI[i]/12);
 window.__YDPJ=()=>{if(document.getElementById('pjP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(HX+4,HZ+7,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('pjP')?[PJ.x+.1,1.9,PJ.z+1.6,PJ.x,1.7,PJ.z,45]:null;
  const RD=8;let rd=0,target=0,sel=-1,tries=0,res=[],done=false,msg='',lv=0;
  const bell=(i,len=1.6)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,f=HZQ(i);for(const[m,a]of[[1,.08],[2.76,.025],[5.4,.012]]){const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(f*m,s);g.gain.setValueAtTime(a,s);g.gain.exponentialRampToValueAtTime(.0001,s+len/m*1.4);o.connect(g).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.05)}}catch(e){}};
  const next=()=>{let t;do{t=Math.floor(Math.random()*10)}while(t===target&&rd>0);target=t;tries=0;sel=-1;setTimeout(()=>bell(target),300)};
  const d=document.createElement('div');d.id='pjP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:12px;z-index:60;background:#2a1e14;border:3px solid #d8b060;border-radius:16px;padding:8px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f8f0e0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:320px;max-width:96vw;user-select:none";document.body.appendChild(d);
  /* 운라 모양: 맨 위 하나 + 셋씩 세 줄 (놀이에서는 아래부터 차례로 높게 놓음) */const rows=[[9],[6,7,8],[3,4,5],[0,1,2]];
  const btn=i=>`<button data-b="${i}" title="${NM[i]}" style="width:46px;height:46px;border:0;border-radius:50%;cursor:pointer;background:${i===sel?'#f8d880':'radial-gradient(#e8d8a0,#9a8040)'};color:#2a1e14;font:11px 'Do Hyeon',sans-serif;box-shadow:inset 0 0 0 ${1+Math.round(i/2)}px rgba(90,60,20,.6)">${NM[i].replace('청','<br>청').slice(-2)}</button>`;
  const render=()=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f8d880">🔔 운라 소리 맞히기</b><div style="font-size:12px;margin:3px 0">${rd+1} / ${RD}판 · ${tries}번 골랐어요</div><div style="background:#4a2a1a;border-radius:10px;padding:6px 4px;display:grid;gap:6px">${rows.map(rw=>`<div style="display:flex;gap:8px;justify-content:center">${rw.map(btn).join('')}</div>`).join('')}</div><div style="display:flex;gap:6px;margin-top:7px"><button data-l style="flex:1;font:15px 'Do Hyeon',sans-serif;background:#5a8ac8;color:#fff;border:0;border-radius:10px;padding:7px 0;cursor:pointer">소리 듣기 🔊</button><button data-o style="flex:1;font:15px 'Do Hyeon',sans-serif;background:${sel<0?'#6a5a4a':'#d8b060'};color:#2a1e14;border:0;border-radius:10px;padding:7px 0;cursor:pointer">이 징이에요</button></div><div style="font-size:12px;color:#f8d880;margin-top:5px">${msg||'소리를 듣고, 징을 눌러 비교한 뒤 정해요. 테두리가 두꺼울수록 높아요'}</div>`;
   d.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{sel=+b.dataset.b;bell(sel,1.2);render()});d.querySelector('[data-l]').onclick=()=>bell(target);d.querySelector('[data-o]').onclick=()=>choose(sel)};
  const choose=i=>{if(done||i<0)return;tries++;if(i===target){res.push(tries===1?1:tries===2?.5:0);msg=`맞아요! ${NM[target]} 소리예요`;bell(target,1);rd++;if(rd>=RD){fin();return}next();render();return}
   const hi=i<target;if(tries>=3){res.push(0);msg=`답은 ${NM[target]}이었어요`;rd++;if(rd>=RD){fin();return}next();render();return}msg=`${NM[i]}보다 ${hi?'더 높은':'더 낮은'} 소리예요`;sel=-1;render()};
  const fin=()=>{if(done)return;done=true;const Q=Math.round(res.reduce((a,b)=>a+b,0)/RD*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('yeongdong_unra',Q,'운라 소리 맞히기')}catch(e){}window.__PJQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f8d880">소리 맞히기 ${Q}점</b><div style="font-size:13px;margin:4px 0">운라와 편종·편경은 크기가 같은 징·종·돌의 두께를 달리해 음높이를 맞춰요. 박연은 기장 낱알로 길이를 잰 대나무 관으로 기준음 황종을 정하고, 거기서 열두 음을 차례로 얻었어요.</div><div style="font-size:24px;color:#d8b060">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#d8b060;color:#2a1e14;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f8f0e0;border:2px solid #f8f0e0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__YDPJ()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  next();render();window.__PJG={choose,get target(){return target},get rd(){return rd},get done(){return done},auto:()=>{let s=0;while(!done&&s<30){choose(target);s++}}};try{ctx.say('같은 소리 나는 징을 찾아요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'운라 채',h:'운라를 치던 작은 나무 채예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.2,8),M(0xd8c8a0)))})},
  {n:'편경 돌 조각',h:'ㄱ자로 깎은 경돌 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.3,.04,.12),M(0x6a7a70)))})},
  {n:'막새 기와',h:'사당 지붕 끝 기와예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18),M(0x5a5a5a)))})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__YGDIG=()=>{window.__DETECT&&window.__DETECT({key:'yeongdong_dig',title:'영동·괴산 발굴 탐지',emoji:'⛏️',bg:'#2a1e14',count:4,TL:150,cand:[[-24,40],[-60,10],[0,50],[20,30],[-50,-50],[10,60],[-60,40],[20,-50]],items:ITEMS,intro:'땅속에 옛 사람들의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'영동은 국악의 고장, 괴산은 맑은 계곡의 고장이에요.'})};
 const meta={quest:{t:'영동·괴산 둘러보기',d:'운라와 난계사, 화양구곡을 둘러보세요.',steps:[['운라','운라'],['난계사','난계사'],['화양구곡','괴산 화양구곡']]},
  title:'영동·괴산 국악 마당·화양구곡',hint:'운라(국가유산청 실측)를 실제 크기로, 난계사와 화양구곡은 간추려 지었어요. 소리를 듣고 같은 종을 찾아 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-2,z:22,lines:['영동·괴산','운라(국가유산청 실측)','난계사 · 화양구곡','간추려 지음']}},
  npc:[['science',[[-6,18],[4,18],[4,28],[-6,28]]]],bounds:[-90,90,-90,90],level:()=>'영동',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#9a3a26';g.fillRect(X(HX-6),Z(HZ-4),12*S,8*S);g.fillRect(X(NX-3.5),Z(NZ-2.5),7*S,5*S);g.fillStyle='#5a9ab0';g.fillRect(X(VX-5),0,10*S,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:26,yaw:Math.PI},size:{}},meta)}
