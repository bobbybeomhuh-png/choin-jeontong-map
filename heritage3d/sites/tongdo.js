/* 양산 통도사 마당(2026-11-21): 공개 실측 3D(CC BY)가 없어 공개 수치로 간추려 지음.
   통도사(세계유산 「산사, 한국의 산지승원」 2018): 자장율사가 646년 세운 불보사찰. 대웅전(국보)엔 불상이 없고, 뒤 창 너머 금강계단(국보)의 부처 진신사리를 모심.
   일주문 → 천왕문 → 불이문 → 대웅전·금강계단, 삼층석탑, 범종루(법고·운판·목어·범종 사물), 무풍한송로 소나무 길. 놀이: 사물 치기(부르는 생명에 맞는 악기 치기), 발굴 탐지, 밤 연등·석등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {koreanBell} from './bellkit.js';
import {stonePagoda,stoneLantern} from './stonekit.js';
export function buildTongdo(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(646);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 /* 땅: 절 마당(마사토) + 둘레 숲 */
 const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#6f8c40';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){q.fillStyle=r()<.5?'rgba(90,110,40,.5)':'rgba(170,150,90,.35)';q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
 const gr=new THREE.Mesh(new THREE.PlaneGeometry(320,240),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.position.y=.01;gr.receiveShadow=true;G.add(gr);
 const ST=tex(256,256,(q,w,h)=>{q.fillStyle='#cbbd9c';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){q.fillStyle=r()<.5?'rgba(160,140,110,.45)':'rgba(230,220,190,.4)';q.fillRect(r()*w,r()*h,2,2)}},[30,10]);
 {const yard=new THREE.Mesh(new THREE.PlaneGeometry(130,34),new THREE.MeshStandardMaterial({map:ST,roughness:1}));yard.rotation.x=-Math.PI/2;yard.position.set(-4,.02,2);yard.receiveShadow=true;G.add(yard);const path=new THREE.Mesh(new THREE.PlaneGeometry(70,4.5),new THREE.MeshStandardMaterial({map:ST,roughness:1}));path.rotation.x=-Math.PI/2;path.position.set(92,.02,0);G.add(path)}
 /* 계곡 시내(입구 남쪽) */{const w=new THREE.Mesh(new THREE.PlaneGeometry(140,7),M(0x4a7a84,{roughness:.15,metalness:.15}));w.rotation.x=-Math.PI/2;w.position.set(70,.04,-14);G.add(w);solids.push({x0:0,x1:140,y0:0,y1:1,z0:-17.5,z1:-10.5})}
 const hall=(spec)=>{if(mini)return null;const h=buildHall(Object.assign({solids,light:false,mini,bracket:'ik',pillar:0x9a3a26},spec));G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)});return h};
 /* 문 셋(동→서) */
 hall({x:60,z:0,ry:Math.PI/2,W:6,D:3.4,nx:1,nz:1,FY:.3,PH:3.6,roof:'hip',name:'靈鷲山通度寺',front:'open',back:'open',left:'wall',right:'wall',stairs:'none',roofScale:.9});
 hall({x:34,z:0,ry:Math.PI/2,W:10,D:6,nx:3,nz:2,FY:.5,PH:3.4,roof:'hip',name:'天王門',front:'open',back:'open',left:'wall',right:'wall',stairs:'none'});
 hall({x:8,z:0,ry:Math.PI/2,W:9,D:5,nx:3,nz:1,FY:.5,PH:3.4,roof:'hip',name:'不二門',front:'open',back:'open',left:'open',right:'open',stairs:'none'});
 /* 대웅전(정면 3칸·옆면 5칸, 사방에 현판—간추려 동쪽 하나) + 금강계단 */
 hall({x:-30,z:0,ry:Math.PI/2,W:13,D:17,nx:3,nz:5,FY:1.1,PH:4.4,roof:'hip',name:'大雄殿',front:'door',back:'window',left:'door',right:'door'});
 {const sm=M(0xc8c0ae),sm2=M(0xb0a898);const g=new THREE.Group();g.position.set(-50,0,0);for(const[w,h,y]of[[13,.8,.4],[9.5,.8,1.2]]){const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,w),y<1?sm2:sm);b.position.y=y;b.castShadow=b.receiveShadow=true;g.add(b)}
  const bs=new THREE.Mesh(new THREE.CylinderGeometry(1,1.2,.6,16),sm);bs.position.y=1.9;g.add(bs);const pts=[];for(let i=0;i<=14;i++){const t=i/14;pts.push(new THREE.Vector2(Math.max(.02,1.0*Math.sqrt(Math.max(0,1-Math.pow(t,3)))),t*2.4))}const bell=new THREE.Mesh(new THREE.LatheGeometry(pts,20),sm);bell.position.y=2.2;g.add(bell);const top=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),sm);top.position.y=4.65;g.add(top);
  for(const[x,z]of[[-6,-6],[6,-6],[-6,6],[6,6]]){const p=new THREE.Mesh(new THREE.BoxGeometry(.6,1.6,.6),sm2);p.position.set(x*.75,1.6,z*.75);g.add(p)}
  G.add(g);cam.push(bell);solids.push({x0:-56.5,x1:-43.5,y0:0,y1:1.6,z0:-6.5,z1:6.5});
  /* 금강계단 둘레 돌담 */for(const[x0,z0,x1,z1]of[[-58,-8,-42,-8],[-58,8,-42,8],[-58,-8,-58,8]]){const l=Math.hypot(x1-x0,z1-z0);const w=new THREE.Mesh(new THREE.BoxGeometry(x0===x1?.5:l,1.1,x0===x1?l:.5),M(0x8a8478));w.position.set((x0+x1)/2,.55,(z0+z1)/2);G.add(w);solids.push({x0:Math.min(x0,x1)-.25,x1:Math.max(x0,x1)+.25,y0:0,y1:1.1,z0:Math.min(z0,z1)-.25,z1:Math.max(z0,z1)+.25})}}
 /* 삼층석탑·석등 */{const p=stonePagoda(5.5);p.position.set(-8,0,9);G.add(p);solids.push({cx:-8,cz:9,r:1.4,y0:0,y1:6});for(const[x,z]of[[-20,-4],[-20,4]]){const l=stoneLantern(2.6);l.position.set(x,0,z);G.add(l);solids.push({cx:x,cz:z,r:.5,y0:0,y1:2.6})}}
 /* 법당 몇 채(간추려): 영산전·관음전·명부전 */
 hall({x:-6,z:-12,ry:0,W:9,D:6,nx:3,nz:2,FY:.7,PH:3.4,roof:'hip',name:'靈山殿',front:'door'});
 hall({x:-14,z:12,ry:Math.PI,W:7,D:5,nx:3,nz:1,FY:.6,PH:3.2,roof:'hip',name:'觀音殿',front:'door'});
 hall({x:20,z:12,ry:Math.PI,W:8,D:5.5,nx:3,nz:2,FY:.6,PH:3.2,roof:'gable',name:'冥府殿',front:'door'});
 /* 범종루(사물): 아래층 열린 누각에 법고·운판·목어·범종 */
 const BX=20,BZ=-12;
 hall({x:BX,z:BZ,ry:0,W:9,D:7,nx:3,nz:2,FY:.3,PH:3.6,roof:'hip',name:'梵鐘樓',front:'open',back:'open',left:'open',right:'open',stairs:'none',roofScale:.9});
 const INS={};{const g=new THREE.Group();g.position.set(BX,.3,BZ);G.add(g);
  /* 범종 */const bl=koreanBell(1.6);bl.position.set(-2.6,1.1,0);g.add(bl);const beam=new THREE.Mesh(new THREE.BoxGeometry(2.2,.18,.18),M(0x6a4a2e));beam.position.set(-2.6,2.95,0);g.add(beam);const hook=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.3,6),M(0x3a3a30));hook.position.set(-2.6,2.8,0);g.add(hook);
  /* 법고 */const drum=new THREE.Group();const db=new THREE.Mesh(new THREE.CylinderGeometry(.75,.75,1.1,24),M(0x9a3a26));db.rotation.x=Math.PI/2;drum.add(db);for(const s of[-1,1]){const sk=new THREE.Mesh(new THREE.CircleGeometry(.72,24),M(0xe8d8b0));sk.position.z=s*.56;sk.rotation.y=s<0?Math.PI:0;drum.add(sk)}const ds=new THREE.Mesh(new THREE.BoxGeometry(1.4,.9,.5),M(0x4a6a3a));ds.position.y=-1;drum.add(ds);drum.position.set(2.6,1.45,0);g.add(drum);
  /* 목어(물고기 모양 나무) */const fish=new THREE.Group();const fb=new THREE.Mesh(new THREE.SphereGeometry(.35,14,10),M(0xb08840));fb.scale.set(3,1,1);fish.add(fb);const tail=new THREE.Mesh(new THREE.ConeGeometry(.4,.6,4),M(0xb08840));tail.rotation.z=Math.PI/2;tail.position.x=-1.2;fish.add(tail);const head=new THREE.Mesh(new THREE.SphereGeometry(.3,12,8),M(0x2a6a4a));head.position.x=.95;fish.add(head);fish.position.set(1.2,2.6,2.4);g.add(fish);
  /* 운판(구름 모양 청동판) */const c=new THREE.Shape();c.moveTo(-.6,0);c.quadraticCurveTo(-.7,.5,-.3,.55);c.quadraticCurveTo(0,.85,.3,.55);c.quadraticCurveTo(.7,.5,.6,0);c.quadraticCurveTo(0,-.35,-.6,0);const un=new THREE.Mesh(new THREE.ExtrudeGeometry(c,{depth:.04,bevelEnabled:false}),M(0x5f7a68,{metalness:.6,roughness:.4}));un.position.set(-1.2,2.2,2.4);g.add(un);
  INS.drum={o:drum,x:BX+2.6,z:BZ,n:'법고',who:'땅 위에 사는 짐승'};INS.bell={o:bl,x:BX-2.6,z:BZ,n:'범종',who:'모든 생명(지옥까지)'};INS.fish={o:fish,x:BX+1.2,z:BZ+2.4,n:'목어',who:'물속에 사는 생명'};INS.cloud={o:un,x:BX-1.2,z:BZ+2.4,n:'운판',who:'하늘을 나는 새'};
  for(const k in INS){const I=INS[k];const ring=new THREE.Mesh(new THREE.RingGeometry(.7,.9,24),new THREE.MeshBasicMaterial({color:0xffd060,transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;I.sx=I.x;I.sz=I.z+(k==='fish'||k==='cloud'?1.3:1.7);ring.position.set(I.sx,.34,I.sz);G.add(ring);I.ring=ring}
  solids.push({cx:BX-2.6,cz:BZ,r:.9,y0:0,y1:3},{cx:BX+2.6,cz:BZ,r:.9,y0:0,y1:2.2})}
 /* 무풍한송로: 입구 길 따라 굽은 소나무 */{const tm=M(0x6a4a32),lm=M(0x2f5a2c);for(let i=0;i<46;i++){const x=64+r()*90,z=(r()<.5?-1:1)*(4+r()*10);if(z<-9&&z>-19)continue;const h=6+r()*4,lean=(r()-.5)*.4;const t=new THREE.Mesh(new THREE.CylinderGeometry(.22,.38,h,6),tm);t.position.set(x,h/2,z);t.rotation.z=lean;t.castShadow=true;G.add(t);for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.IcosahedronGeometry(1.6-k*.3,0),lm);c.scale.y=.5;c.position.set(x-Math.sin(lean)*h*.9+(r()-.5)*1.4,h*.85+k*.7,z+(r()-.5)*1.4);c.castShadow=true;G.add(c)}solids.push({cx:x,cz:z,r:.45,y0:0,y1:h})}}
 /* 둘레 산 */{const hm=M(0x4f6e34,{flatShading:true});for(const[x,z,s,h]of[[-110,0,60,40],[-60,-70,50,26],[-60,70,50,28],[30,-80,60,24],[30,80,60,22]]){const m=new THREE.Mesh(new THREE.SphereGeometry(1,14,8,0,Math.PI*2,0,Math.PI/2),hm);m.scale.set(s,h,s*.8);m.position.set(x,0,z);G.add(m)}}
 /* 밤: 연등 줄 + 석등 불 */
 const NL=[];if(!mini){const cols=[0xf08aa0,0xf4c040,0x8ac0f0,0x9ad08a,0xffffff];for(let i=0;i<26;i++){const x=56-i*3.4;for(const z of[-2.6,2.6]){const lp=new THREE.Mesh(new THREE.SphereGeometry(.24,10,8),new THREE.MeshStandardMaterial({color:cols[(i+(z>0?2:0))%5],emissive:0x000000,transparent:true,opacity:.95}));lp.position.set(x,3.2,z);G.add(lp);NL.push({lp})}}for(const[x,z]of[[-20,-4],[-20,4],[0,0],[-40,0],[30,0]]){const L=new THREE.PointLight(0xffc080,0,18,1.5);L.position.set(x,2.6,z);G.add(L);NL.push({L})}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const l of NL){if(l.lp)l.lp.material.emissive.setRGB(nk*.9,nk*.7,nk*.5);if(l.L)l.L.intensity=nk*7}};
 /* 안내 */
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(66,4,3,'통도사 일주문','영축산 통도사로 들어가는 첫 문이에요. 통도사는 신라 자장율사가 646년에 세운 절로, 부처의 진신사리를 모신 불보사찰이에요. 2018년 「산사, 한국의 산지승원」으로 세계유산이 됐어요. 간추려 지었어요.');
 sp(-22,5,3.4,'대웅전','통도사 대웅전(국보)에는 불상이 없어요. 불상 자리 뒤 창 너머로 금강계단에 모신 부처의 진신사리를 바로 바라보게 했어요. 지붕이 T자처럼 짜이고 사방에 서로 다른 현판이 걸려 있어요.');
 sp(-40,9,3,'금강계단','자장율사가 당나라에서 가져온 부처의 사리를 모신 돌 계단이에요(국보). 가운데 종 모양 탑 아래 사리가 있고, 스님이 되는 계를 받는 곳이기도 해요.');
 sp(BX,BZ+6,3,'범종루','새벽과 저녁 예불 전에 법고·운판·목어·범종 네 악기(사물)를 쳐요. 악기마다 깨우는 생명이 달라요.');
 sp(BX+5.2,BZ+3.6,1.8,'사물 치는 자리','부르는 생명에 맞는 악기를 쳐 봐요.');
 sp(100,6,3,'무풍한송로','바람도 춤추듯 굽은 소나무가 늘어선 통도사 들머리 숲길이에요.');
 sp(-4,14,2.4,'발굴 탐지 자리','절 마당 땅속에 옛 절의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 사물 치기(11/21): 「○○를 깨워요」 부름에 맞는 악기로 가서 치기, 여덟 번. 100초 */
 window.__TDSAMUL=()=>{if(document.getElementById('tdP'))return;const H=window.__H3,ctx=H.ctx();try{H.tp(BX,BZ+4.4,.3);H.face(Math.PI)}catch(e){}
  const keys=Object.keys(INS);const seq=[];for(let i=0;i<8;i++){let k;do{k=keys[(Math.random()*4)|0]}while(seq.length&&seq[seq.length-1]===k);seq.push(k)}let qi=0,miss=0,done=false,t0=performance.now()/1000,lastHit=null,anim={};const TL=100;
  const d=document.createElement('div');d.id='tdP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2018;border:3px solid #c8a060;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffd890">🔔 범종루 사물 치기</b><div id="tdS" style="font:15px 'Do Hyeon',sans-serif;margin:6px 0;line-height:1.5"></div><div id="tdC" style="font-size:13px">0 / 8</div><div id="tdT" style="font-size:13px">${TL}초</div><div style="font-size:12px;opacity:.85">법고=땅 짐승 · 운판=날짐승 · 목어=물고기 · 범종=모든 생명</div>`;const Sx=d.querySelector('#tdS'),C=d.querySelector('#tdC'),T=d.querySelector('#tdT');
  const show=()=>{const I=INS[seq[qi]];Sx.innerHTML=`<span style="color:#ffd890">「${I.who}」</span>을(를) 깨워요!`;C.textContent=qi+' / 8'};show();
  const play=k=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,out=ctx.out()||AC.destination;const tone=(f,len,type,v,f2)=>{const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);if(f2)o.frequency.exponentialRampToValueAtTime(f2,s+len*.5);g.gain.setValueAtTime(v,s);g.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(g).connect(out);o.start(s);o.stop(s+len+.05)};
   if(k==='bell'){tone(92,4.5,'sine',.14);tone(95,4.5,'sine',.08);tone(230,2.5,'sine',.04)}else if(k==='drum'){tone(80,.6,'sine',.2,45);tone(140,.25,'triangle',.06,60)}else if(k==='fish'){tone(620,.18,'square',.05,420);tone(900,.08,'triangle',.04)}else{tone(1180,1.6,'sine',.06);tone(1730,1.2,'sine',.03);tone(2470,.8,'sine',.02)}}catch(e){}};
  const fin=()=>{if(done)return;done=true;for(const k in INS)INS[k].ring.material.opacity=0;const el=performance.now()/1000-t0;const Q=qi>=8?Math.max(60,Math.round(100-Math.max(0,el-40)*.5-miss*6)):Math.round(qi/8*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('tongdo_samul',Q,'통도사 사물 치기')}catch(e){}window.__TDQ=Q;
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffd890">${qi>=8?'모든 생명을 깨웠어요!':qi+'번 쳤어요'}</b><div style="font-size:13px;margin:4px 0">법고는 땅 위 짐승, 운판은 하늘의 새, 목어는 물속 생명, 범종은 모든 생명을 위해 친다고 해요. 절에서는 새벽과 저녁마다 이 네 소리로 하루를 열고 닫아요.</div><div style="font-size:26px;color:#c8a060">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a060;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__TDSAMUL(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},800)};
  const loop=()=>{if(!d.isConnected){for(const k in INS)INS[k].ring.material.opacity=0;return}const now=performance.now()/1000;const P=H.P;
   if(!done){let hit=null;for(const k in INS){const I=INS[k];I.ring.material.opacity=.35+Math.sin(now*4)*.12;if(Math.hypot(P.x-I.sx,P.z-I.sz)<1.5)hit=k}
    if(hit&&hit!==lastHit){play(hit);anim[hit]=now;if(hit===seq[qi]){qi++;try{ctx.say(INS[hit].n+' 소리!',1)}catch(e){}if(qi>=8)fin();else show()}else{miss++;try{ctx.say(INS[hit].n+'은(는) '+INS[hit].who+'를 깨워요',1.6)}catch(e){}}}
    lastHit=hit;const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin()}
   for(const k in anim){const a=now-anim[k];const o=INS[k].o;if(a<1){if(k==='bell')o.rotation.z=Math.sin(a*14)*.06*(1-a);else o.position.y+=Math.sin(a*40)*.004*(1-a)}else{if(k==='bell')o.rotation.z=0;delete anim[k]}}
   requestAnimationFrame(loop)};loop();
  window.__TDG={INS,get seq(){return seq},get qi(){return qi},get miss(){return miss}};try{ctx.say('범종루에서 사물을 쳐요! 부르는 생명에 맞는 악기로 가요.',2.6)}catch(e){}};
 /* 발굴 탐지 */
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'연꽃무늬 수막새',h:'처마 끝 기와예요. 둥근 면에 연꽃이 새겨져 있어요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.05,20),M(0x5a5a58));m.rotation.x=Math.PI/2;g.add(m)})},
  {n:'청동 풍탁',h:'처마 끝에 매달아 바람에 울리던 작은 종이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.06,.12,.22,10),M(0x5f7a68,{metalness:.6}));g.add(m)})},
  {n:'청동 향로 조각',h:'법당에서 향을 피우던 향로의 다리 조각이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.03,.05,.25,8),M(0x6a5a3a,{metalness:.6}));m.rotation.z=.4;g.add(m)})},
  {n:'분청 사발',h:'스님들이 공양 때 쓰던 분청사기 사발 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.18,14,8,0,Math.PI*2,Math.PI/2,Math.PI/2),M(0x9a9480,{side:THREE.DoubleSide})))})},
  {n:'글자 새긴 기와',h:'절 이름이나 지은 해를 새긴 기와 조각이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.36,.04,.26),M(0x6a6660));g.add(m)})}];
 window.__TDDIG=()=>{window.__DETECT&&window.__DETECT({key:'tongdo_dig',title:'통도사 발굴 탐지',emoji:'⛏️',bg:'#26221c',count:4,TL:150,cand:[[-4,14],[10,14],[-30,13],[40,8],[46,-6],[-10,-4],[26,6],[-16,-14]],items:ITEMS,intro:'통도사 마당 땅속에 옛 절의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'천 년 넘게 이어진 절이라 마당 아래에 여러 시대의 기와와 그릇이 겹겹이 묻혀 있어요.'})};
 const meta={quest:{t:'통도사 둘러보기',d:'불보사찰 통도사를 둘러보세요.',steps:[['일주문','통도사 일주문'],['범종루','범종루'],['대웅전','대웅전'],['금강계단','금강계단']]},
  title:'양산 통도사',hint:'부처의 진신사리를 모신 불보사찰 통도사를 공개 수치로 간추려 지었어요. 소나무 길로 들어와 범종루에서 사물을 쳐 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:true,sign:{x:76,z:6,lines:['양산 통도사','세계유산 산사(2018)','대웅전·금강계단 국보','간추려 지음']}},
  npc:[['science',[[70,-3],[80,-3],[80,3],[70,3]]]],bounds:[-80,150,-60,60],level:()=>'통도사',camCap:()=>Infinity,baseAt:()=>0,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.1,ox:20,oz:0,draw(g,X,Z,S){g.fillStyle='#6f8c40';g.fillRect(0,0,300,300);g.fillStyle='#cbbd9c';g.fillRect(X(-69),Z(19),130*S,34*S);g.fillRect(X(57),Z(2.2),70*S,4.5*S);g.fillStyle='#4a7a84';g.fillRect(X(0),Z(-10.5),140*S,7*S);g.fillStyle='#9a3a26';for(const[x,z,w,d]of[[-30,0,17,13],[34,0,6,10],[8,0,5,9],[60,0,3.4,6],[BX,BZ,9,7]])g.fillRect(X(x-w/2),Z(z+d/2),w*S,d*S);g.fillStyle='#c8c0ae';g.fillRect(X(-56.5),Z(6.5),13*S,13*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:110,z:0,yaw:-Math.PI/2},size:{}},meta)}
