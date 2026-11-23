/* 서울 운현궁 마당(2026-11-23, 2단계 열째 묶음): 흥선대원군의 집이자 고종이 왕이 되기 전 자란 곳(사적). 1866년 고종과 명성황후의 가례(혼례)가 노락당에서 열림.
   실측: 국가유산청 KHS_Asset 「Unhyun_」 운현궁 살림 실측 3D(CC BY 4.0) — 촛대(높이 0.40m)·삼층장(1.79m)·통영반(0.27m)을 실제 크기로.
   건물(수직사·노안당·노락당·이로당)은 공개 실측이 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   놀이: 노락당 촛불 밝히기(방바닥 칸에 실측 촛대를 놓아 방 안 모든 칸을 밝혀요. 불빛은 가로·세로로 곧게 뻗고 삼층장에 막혀요. 촛대는 적게! 빛 채우기 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {yardMat} from './yardkit.js';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
export function buildUnhyeon(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1866);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x8a9a5a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr);const yd=new THREE.Mesh(new THREE.PlaneGeometry(40,50),yardMat());yd.rotation.x=-Math.PI/2;yd.position.set(0,.02,2);G.add(yd)}
 for(let i=0;i<14;i++){const h=12+r()*24;const b=new THREE.Mesh(new THREE.BoxGeometry(8+r()*6,h,8),M(0x9aa4b0));b.position.set(-90+i*14,h/2,-80-r()*10);G.add(b)}
 const ST=M(0xa8a296),WALLW=M(0xeee6d4),WOOD=M(0x8a7458),ROOF=M(0x4a4a50);
 const plaque=(x,y,z,txt,w=1.6)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 /* 11/23 품질: 상자+원뿔 지붕 → hallkit 한옥(민가 지붕·띠살문·주춧돌) */const wing=(x,z,W,D,H,base=.7,name)=>{const h=buildHall({x,z,W,D,nx:Math.max(1,Math.round(W/2.6)),nz:1,FY:base,PH:H,roof:'hip',name,pillar:0x6b4a2e,bracket:'ik',front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',mini,solids,light:false,plain:true,bare:true,roofScale:.75});G.add(h.group);return h.top};
 /* 담장 + 정문 */for(const[w,d,x,z]of[[18,.5,-12,26],[18,.5,12,26],[.5,52,-21,0],[.5,52,21,0],[42,.5,0,-26]]){const m=new THREE.Mesh(new THREE.BoxGeometry(w,2,d),M(0xc8b898));m.position.set(x,1,z);G.add(m);solids.push({x0:x-w/2,x1:x+w/2,y0:0,y1:2,z0:z-d/2,z1:z+d/2})}
 {const h=buildHall({x:0,z:26,W:3.2,D:1.8,nx:1,nz:1,FY:.3,PH:2.9,roof:'gable',pillar:0x6b4a2e,bracket:'ik',front:'open',back:'open',left:'wall',right:'wall',stairs:'none',mini,solids,light:false,plain:true,bare:true,roofScale:.6});G.add(h.group)}
 sp(0,29.5,3,'운현궁 정문','흥선대원군의 집 운현궁이에요. 아들 고종이 열두 살에 왕이 되면서 "궁"이라 불렸어요.');
 /* 수직사 */{wing(12,20,12,3,2.2,.7,'舍直守')}
 sp(12,23.6,3,'수직사','운현궁을 지키던 사람들이 머물던 행랑채예요.');
 /* 노안당(사랑채) */{wing(-8,8,12,4.2,2.8,.7,'堂安老')}
 sp(-8,13,2.8,'노안당','흥선대원군이 머물던 사랑채예요. 현판은 추사 김정희의 글씨를 모아 새겼다고 해요. 처마 끝에 햇빛 가리개 차양이 달린 게 특징이에요.');
 /* 노락당(안채, 가례) */const NZ=-6;{wing(6,NZ,13,5,3,.9,'堂樂老')}
 sp(6,NZ+5.6,3,'노락당','운현궁에서 가장 큰 안채예요. 1866년 고종과 명성황후의 가례가 이곳에서 열렸어요. 해마다 가을에 재현 행사가 열려요.');
 /* 이로당(ㅁ자 안채) */{const X=-8,Z=-17;wing(X,Z-3,10,2.6,2.4);wing(X,Z+3,10,2.6,2.2,.7,'堂老二')}
 sp(-8,-12,2.4,'이로당','바깥 출입이 적은 여인들이 지내던 ㅁ자 안채예요. 안으로 둘러싸 바깥에서 들여다보이지 않아요.');
 /* 실측 살림(노락당 툇마루 앞 전시) */const PX0=6,PZ0=NZ+3.6;let CANDLE=null;const SCAN=[];
 if(!mini){const gl=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(dr);
  const ld=(f,x,z,ry,cb)=>gl.load(new URL('../models/unhyeon/'+f,import.meta.url).href,g=>{const o=g.scene;o.userData.noBatch=true;o.traverse(e=>{if(e.isMesh){e.castShadow=true;e.receiveShadow=true;if(e.material){e.material.metalness=0}}});o.position.set(x,0,z);o.rotation.y=ry;if(x!==null)G.add(o);cb&&cb(o)},undefined,()=>{});
  const deck=new THREE.Mesh(new THREE.BoxGeometry(4.6,.5,2.2),WOOD);deck.position.set(-12,.25,-1);G.add(deck);solids.push({x0:-14.3,x1:-9.7,y0:0,y1:.6,z0:-2.1,z1:.1});
  ld('cupboard.glb',-13.4,-1.2,0,o=>{o.position.y=.5});ld('table.glb',-11.2,-.6,0,o=>{o.position.y=.5});ld('candle.glb',-10.4,-.6,0,o=>{o.position.y=.5});
  ld('candle.glb',0,0,0,o=>{G.remove(o);CANDLE=o})}
 sp(-12,2.4,2.6,'운현궁 살림','운현궁에서 쓰던 삼층장·통영반·촛대예요. 국가유산청이 실측한 3D를 실제 크기로 놓았어요(삼층장 높이 1.79m, 통영반 0.27m, 촛대 0.40m).');
 /* 노락당 촛불 밝히기(11/23) */const PX=16,PZ=-18;const pg=new THREE.Group();pg.position.set(PX,0,PZ);pg.visible=false;G.add(pg);
 window.__UHLIGHT=()=>{if(document.getElementById('uhlP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX,PZ+6,0)}catch(e){}pg.visible=true;
  let rd=0,N=6,CS=.62,walls=new Set(),cands=new Set(),K=0,tries=0,t0=0,done=false,auto=false,last=performance.now(),wait=0,cells=[],aPlan=[],aT=0,lit=new Set();const res=[];const NR=3;
  const camA=()=>{const k=innerWidth<innerHeight?1.7:1;const s=N*CS;return[PX,s*1.15*k+1.2,PZ+s*.8*k+.6,PX,0,PZ-.1,50]};window.__GCAM=()=>document.getElementById('sssX')?null:document.getElementById('uhlP')?camA():null;
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,100);const rc=new THREE.Raycaster();
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  const snd=(f,len=.1,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const ray=(k,ws)=>{const out=new Set([k]);const rr=(k/N)|0,c=k%N;for(const[dr,dc]of[[1,0],[-1,0],[0,1],[0,-1]]){let a=rr+dr,b=c+dc;while(a>=0&&b>=0&&a<N&&b<N&&!ws.has(a*N+b)){out.add(a*N+b);a+=dr;b+=dc}}return out};
  const litOf=(cs,ws)=>{const L=new Set();for(const k of cs)for(const x of ray(k,ws))L.add(x);return L};
  const greedy=ws=>{const empty=[...Array(N*N).keys()].filter(k=>!ws.has(k));const need=new Set(empty);const pick=[];while(need.size){let best=-1,bv=-1;for(const k of empty){let v=0;for(const x of ray(k,ws))if(need.has(x))v++;v+=r()*.5;if(v>bv){bv=v;best=k}}pick.push(best);for(const x of ray(best,ws))need.delete(x)}
   for(let i=pick.length-1;i>=0;i--){const rest=pick.slice(0,i).concat(pick.slice(i+1));if(litOf(rest,ws).size===empty.length)pick.splice(i,1)}return pick};
  const gen=()=>{let best=null;for(let t=0;t<30;t++){const ws=new Set();const nw=[5,8,12][rd];while(ws.size<nw)ws.add((r()*N*N)|0);let g=null;for(let k=0;k<12;k++){const p=greedy(ws);if(!g||p.length<g.length)g=p}if(!best||Math.abs(g.length-[3,5,6][rd])<Math.abs(best[1].length-[3,5,6][rd]))best=[ws,g]}return best};
  const clr=()=>{while(pg.children.length)pg.remove(pg.children[0]);cells=[]};
  const FL=M(0x6a5a48,{roughness:.9}),FLL=M(0xffe8a0,{emissive:0xc08a30,emissiveIntensity:.6,roughness:.6});
  const cpos=k=>[((k%N)-(N-1)/2)*CS,(((k/N)|0)-(N-1)/2)*CS];
  const draw=()=>{lit=litOf(cands,walls);cells.forEach(m=>{const k=m.userData.k;m.material=lit.has(k)?FLL:FL});pg.children.filter(o=>o.userData.cand).forEach(o=>pg.remove(o));for(const k of cands){const[x,z]=cpos(k);let o;if(CANDLE){o=CANDLE.clone()}else{o=new THREE.Group();const c=new THREE.Mesh(new THREE.CylinderGeometry(.05,.07,.4,10),M(0xc8a040,{metalness:.6}));c.position.y=.2;o.add(c)}o.position.set(x,.05,z);o.userData.cand=true;const fl=new THREE.Mesh(new THREE.SphereGeometry(.04,8,6),new THREE.MeshBasicMaterial({color:0xffc060}));fl.position.y=.44;o.add(fl);pg.add(o)}};
  const newRound=()=>{clr();N=[6,7,8][rd];CS=[.62,.56,.5][rd];const[ws,sol]=gen();walls=ws;K=sol.length;aPlan=sol.slice();cands=new Set();tries=0;
   const rm=new THREE.Mesh(new THREE.BoxGeometry(N*CS+.5,.08,N*CS+.5),M(0x6a4a2a));rm.position.y=-.02;pg.add(rm);for(const[w,d,x,z]of[[N*CS+.5,.12,0,-N*CS/2-.25],[.12,N*CS+.5,-N*CS/2-.25,0],[.12,N*CS+.5,N*CS/2+.25,0]]){const m=new THREE.Mesh(new THREE.BoxGeometry(w,1.2,d),WALLW);m.position.set(x,.6,z);pg.add(m)}
   for(let k=0;k<N*N;k++){const[x,z]=cpos(k);if(walls.has(k)){const b=new THREE.Mesh(new THREE.BoxGeometry(CS*.9,1,CS*.6),M(0x7a4a2a));b.position.set(x,.5,z);pg.add(b);const dr=new THREE.Mesh(new THREE.BoxGeometry(CS*.8,.04,.02),M(0xc8a040,{metalness:.6}));dr.position.set(x,.7,z+CS*.31);pg.add(dr);continue}const m=new THREE.Mesh(new THREE.BoxGeometry(CS*.95,.04,CS*.95),FL);m.position.set(x,.02,z);m.userData.k=k;pg.add(m);cells.push(m)}
   t0=performance.now();draw();ui()};
  const toggle=k=>{if(done||wait>0||walls.has(k))return;if(cands.has(k)){cands.delete(k);snd(300,.06)}else{cands.add(k);tries++;snd(560,.08)}draw();const empty=N*N-walls.size;if(lit.size===empty){const extra=Math.max(0,cands.size-K);const tm=(performance.now()-t0)/1000;const sc=Math.max(25,Math.round(100-extra*15-Math.max(0,tries-K*2)*3-Math.max(0,tm-K*8)*.3));res.push(sc);wait=2;snd(800,.5,'sine');ui(`방이 다 밝아졌어요! 촛대 ${cands.size}개(가장 적게 ${K}개) · ${sc}점`)}else ui()};
  const ov=document.createElement('div');ov.id='uhlO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  ov.onpointerdown=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(cells,false)[0];if(h)toggle(h.object.userData.k)};
  const d=document.createElement('div');d.id='uhlP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2420;border:3px solid #e0b060;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f8f0e0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:232px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;const empty=N*N-walls.size;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f8d890">🕯️ 노락당 촛불 밝히기 ${rd+1}/${NR}</b><div style="font-size:12px;margin:4px 0;line-height:1.5">방바닥을 누르면 촛대를 놓아요(다시 누르면 치워요). 불빛은 가로·세로로 곧게 뻗다가 장에 막혀요. 모든 칸을 밝혀요. 촛대는 <b>${K}개</b>면 돼요!</div><div style="font-size:13px">밝은 칸 ${lit.size}/${empty} · 촛대 ${cands.size}</div><div style="font-size:13px;color:#f8d890;min-height:18px">${msg}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#f8f0e0;border:1px solid #f8f0e0;border-radius:8px;padding:2px 8px;margin-top:4px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const cleanup=()=>{clr();pg.visible=false;ov.remove()};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/res.length);const s2=Q>=80?3:Q>=55?2:Q>0?1:0;try{ctx.done('unhyeon_light',Q,'노락당 촛불 밝히기')}catch(e){}window.__UHLQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f8d890">노락당이 환해졌어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">1866년 고종과 명성황후의 가례가 열린 노락당이에요. 놀이에 놓은 촛대는 운현궁에서 쓰던 실제 촛대를 실측한 3D예요.</div><div style="font-size:24px;color:#e0b060">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#e0b060;color:#2a2420;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f8f0e0;border:2px solid #f8f0e0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__UHLIGHT()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(auto&&wait<=0){aT-=dt;if(aT<=0){aT=.3;const k=aPlan.find(x=>!cands.has(x));if(k!=null)toggle(k)}}
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=NR){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);
  window.__UHLG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},toggle,get K(){return K},get lit(){return lit.size},get cells(){return cells.map(m=>m.userData.k)},scr:k=>{setPC();const m=cells.find(c=>c.userData.k===k);const v=new THREE.Vector3();m.getWorldPosition(v);v.project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]}};try{ctx.say('촛대를 놓아 방을 모두 밝혀요!',2.4)}catch(e){}};
 spots.push({x:PX,y:0,z:PZ+4,r:2.4,t:'촛불 밝히는 자리',h:'실측 촛대를 놓아 방 안 모든 칸을 밝혀 봐요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,29],[12,3,23],[-8,3,12],[6,3,NZ+5],[-8,3,-12],[-12,2,2],[PX,3,PZ+4]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'백자 접시 조각',h:'운현궁에서 쓰던 백자 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.1,.08,.03,14,1,false,0,3.2),M(0xf0ece0)))})},
  {n:'놋쇠 장석',h:'삼층장 같은 가구에 다는 놋쇠 장식이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.01,8),M(0xc8a040,{metalness:.7})))})},
  {n:'촛농 덩이',h:'촛대 아래 굳은 촛농이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.04,8,6),M(0xf0e8c8)))})},
  {n:'기와 조각',h:'운현궁 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'당백전',h:'흥선대원군 때 만든 큰 돈 당백전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.012,18),M(0x7a6030,{metalness:.6})))})}];
 sp(14,8,2.4,'발굴 탐지 자리','운현궁 마당 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__UHDIG=()=>{window.__DETECT&&window.__DETECT({key:'unhyeon_dig',title:'운현궁 발굴 탐지',emoji:'⛏️',bg:'#2a2420',count:4,TL:150,cand:[[-14,20],[4,18],[-16,4],[16,4],[0,-2],[-2,-22],[14,-8],[-16,-6],[8,10],[16,14]],items:DIG,intro:'운현궁 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'운현궁은 고종이 어린 시절을 보내고 가례를 올린 곳이에요(사적).'})};
 const meta={quest:{t:'운현궁 둘러보기',d:'정문과 수직사를 지나 노안당, 노락당, 이로당, 실측 살림을 둘러보세요.',steps:[['정문','운현궁 정문'],['수직사','수직사'],['노안당','노안당'],['노락당','노락당'],['이로당','이로당'],['살림','운현궁 살림']]},
  title:'서울 운현궁',hint:'살림(삼층장·통영반·촛대)은 국가유산청 실측 3D(실제 크기), 건물은 공개 사진으로 간추려 지었어요. 실측 촛대로 노락당 방을 밝혀 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:true,sign:{x:-7,z:32,lines:['서울 운현궁','흥선대원군 · 고종 가례(1866)','살림 실측 3D','건물은 간추려 지음']}},
  npc:[['science',[[-6,30],[6,30],[6,36],[-6,36]]]],bounds:[-36,36,-34,44],level:()=>'서울 운현궁',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:4,draw(g,X,Z,S){g.fillStyle='#8a9a5a';g.fillRect(0,0,300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:34,yaw:Math.PI},size:{}},meta)}
