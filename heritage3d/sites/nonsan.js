/* 논산 관촉사·돈암서원 마당(2026-11-22, W28): 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   관촉사 석조미륵보살입상(은진미륵, 국보, 고려 968~1006): 높이 약 18.12m, 우리나라에서 가장 큰 돌부처. 몸을 여러 돌로 나눠 쌓았고, 머리 위에 네모난 갓(보개) 두 겹. 앞에 석등(보물)·석탑.
   전설: 석공들이 큰 돌을 올리지 못하다가, 동자 둘이 흙을 쌓아 돌부처를 세우는 놀이를 보고 흙 언덕을 쌓아 차례로 올렸다고 함.
   돈암서원(사적, 세계유산 「한국의 서원」 2019): 사계 김장생을 기린 서원. 큰 강당 응도당. 논산은 660년 백제 계백과 신라 김유신이 싸운 황산벌.
   놀이: 은진미륵 세우기(움직이는 돌을 알맞게 멈춰 쌓기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {stoneLantern} from './stonekit.js';
export function buildNonsan(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1043);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(220,200);g.rotateX(-Math.PI/2);const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,color:0x8a9a4a,roughness:1}));m.receiveShadow=true;G.add(m)}
 /* 은진미륵(간추림, 높이 18m): 발·몸·가슴·머리·보개 두 겹 */const BX=-24,BZ=-20;const ST=tex(256,256,(q,w,h)=>{q.fillStyle='#b8b0a0';q.fillRect(0,0,w,h);for(let i=0;i<2600;i++){const v=150+(r()*70|0);q.fillStyle=`rgba(${v},${v-4},${v-14},.55)`;q.fillRect(r()*w,r()*h,2+r()*3,2+r()*3)}for(let i=0;i<40;i++){q.fillStyle=`rgba(60,70,50,${.1+r()*.15})`;q.beginPath();q.arc(r()*w,r()*h,4+r()*12,0,7);q.fill()}},[2,3]);const stM=new THREE.MeshStandardMaterial({map:ST,roughness:.95});
 const buddha=new THREE.Group();buddha.position.set(BX,0,BZ);G.add(buddha);
 {const pd=new THREE.Mesh(new THREE.BoxGeometry(6,1,4.4),stM);pd.position.y=.5;buddha.add(pd);
  const body=new THREE.Mesh(new THREE.CylinderGeometry(1.9,2.3,8,14),stM);body.scale.z=.7;body.position.y=5;buddha.add(body);
  const chest=new THREE.Mesh(new THREE.CylinderGeometry(2.1,1.9,2.4,14),stM);chest.scale.z=.7;chest.position.y=10.2;buddha.add(chest);
  for(const s of[-1,1]){const arm=new THREE.Mesh(new THREE.CylinderGeometry(.5,.6,5,8),stM);arm.position.set(s*2.2,7.6,.2);arm.rotation.z=s*.08;buddha.add(arm)}
  const lotus=new THREE.Mesh(new THREE.ConeGeometry(.35,2.4,6),M(0x9aa080));lotus.position.set(-1.2,9.4,1.4);lotus.rotation.z=.3;buddha.add(lotus);
  const head=new THREE.Mesh(new THREE.BoxGeometry(3.4,4.4,3),stM);head.position.y=13.6;buddha.add(head);
  const face=new THREE.Group();face.position.set(0,13.6,1.52);const fm=M(0x5a5448);for(const s of[-1,1]){const eye=new THREE.Mesh(new THREE.BoxGeometry(.9,.12,.05),fm);eye.position.set(s*.75,.5,0);face.add(eye);const ear=new THREE.Mesh(new THREE.BoxGeometry(.4,2.6,.6),stM);ear.position.set(s*1.85,-.1,-1.2);face.add(ear)}const nose=new THREE.Mesh(new THREE.BoxGeometry(.4,1.1,.4),stM);nose.position.set(0,-.2,.15);face.add(nose);const mouth=new THREE.Mesh(new THREE.BoxGeometry(.8,.1,.05),fm);mouth.position.set(0,-1.1,0);face.add(mouth);buddha.add(face);
  const crown=new THREE.Mesh(new THREE.CylinderGeometry(1.1,1.4,1.6,10),stM);crown.position.y=16.6;buddha.add(crown);
  for(const[y,w]of[[17.6,4.6],[18.3,3.8]]){const p=new THREE.Mesh(new THREE.BoxGeometry(w,.35,w),stM);p.position.y=y;buddha.add(p);for(const sx of[-1,1])for(const sz of[-1,1]){const bell=new THREE.Mesh(new THREE.ConeGeometry(.12,.35,6),M(0x6a6040,{metalness:.4}));bell.position.set(sx*w/2,y-.35,sz*w/2);buddha.add(bell)}}
  buddha.traverse(e=>{if(e.isMesh){e.castShadow=true;cam.push(e)}});solids.push({x0:BX-3,x1:BX+3,y0:0,y1:19,z0:BZ-2.2,z1:BZ+2.2})}
 try{const L=stoneLantern(3.6);L.position.set(BX,0,BZ+9);G.add(L);solids.push({cx:BX,cz:BZ+9,r:.8,y0:0,y1:4})}catch(e){}
 if(!mini){const h=buildHall({x:BX+16,z:BZ-6,ry:-Math.PI/2,W:9,D:6,nx:3,nz:2,FY:.9,PH:3,roof:'hip',name:'彌勒殿',pillar:0x9a3a26,bracket:'dapo',front:'window',roofScale:.95,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 /* 돈암서원 응도당(동쪽) */const DX=26,DZ=10;
 if(!mini){const B=spec=>{const h=buildHall(Object.assign({solids,light:false},spec));G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})};
  B({x:DX,z:DZ,ry:Math.PI,W:14,D:8,nx:5,nz:2,FY:1,PH:3.4,roof:'gable',name:'凝道堂',pillar:0x8a6a48,bracket:'ik',front:'open',back:'open',roofScale:1});
  B({x:DX,z:DZ-16,ry:Math.PI,W:8,D:5,nx:3,nz:1,FY:.8,PH:2.8,roof:'gable',name:'養性堂',pillar:0x8a6a48,bracket:'ik',front:'open',roofScale:.85})}
 /* 황산벌 비 */{const x=0,z=34;const b=new THREE.Mesh(new THREE.BoxGeometry(1.2,2.8,.4),M(0x6a6660));b.position.set(x,1.8,z);G.add(b);const tt=new THREE.Mesh(new THREE.BoxGeometry(2,.6,1.2),M(0x8a867e));tt.position.set(x,.3,z);G.add(tt);solids.push({cx:x,cz:z,r:1,y0:0,y1:3})}
 const NL=[];if(!mini){for(const[x,y,z]of[[BX,4,BZ+9],[BX+3,6,BZ+6],[DX,4,DZ+6],[0,3,34]]){const L=new THREE.PointLight(0xffc080,0,24,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(BX+5,BZ+12,3.4,'은진미륵','관촉사 석조미륵보살입상(국보), 높이 약 18m로 우리나라에서 가장 큰 돌부처예요. 고려 광종 때(968) 짓기 시작해 37년 걸렸다고 전해요. 큰 머리와 네모난 갓 두 겹이 특징이에요. 간추려 지었어요.');
 sp(BX-6,BZ+10,2.2,'미륵 세우는 자리','석공들은 흙을 쌓아 돌을 차례로 올렸다고 전해요. 돌을 알맞게 멈춰 은진미륵을 쌓아 봐요.');
 sp(DX,DZ+8,3,'돈암서원 응도당','사계 김장생(예학의 큰 학자)을 기린 서원이에요. 2019년 「한국의 서원」으로 세계유산이 됐어요. 응도당은 서원 강당 가운데 큰 편이에요. 간추려 지었어요.');
 sp(0,37,2.4,'황산벌','660년 백제 계백 장군이 결사대 5천으로 신라 김유신의 5만 군과 네 번 싸워 네 번 이겼지만 끝내 무너진 곳이에요.');
 sp(10,-30,2.4,'발굴 탐지 자리','논산 땅속에 옛 사람들의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 은진미륵 세우기(11/22): 돌이 좌우로 움직여요. 「놓기」로 아래 돌 위에 멈추면 겹친 만큼만 남아요. 받침→발→몸→가슴→머리→갓 여섯 단. 세 번까지 다시 */
 window.__NSSTACK=()=>{if(document.getElementById('nsP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(BX-6,BZ+10,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('nsP')?[BX,9,BZ+30,BX,9,BZ,55]:null;
  const cv=document.createElement('canvas');cv.id='nsC';cv.style.cssText='position:fixed;inset:0;z-index:55;width:100%;height:100%;touch-action:none';document.body.appendChild(cv);const q=cv.getContext('2d');cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio;
  const PARTS=[['받침',1,.42],['발',.9,.3],['몸',.8,.62],['가슴',.86,.28],['머리',.62,.44],['갓',.9,.16]];
  let lv=0,lives=3,done=false,placed=[{x:.5,w:.56}],mx=0,dir=1,spd=.45,dropped=0,acc=[];
  const d=document.createElement('div');d.id='nsP';d.style.cssText="position:fixed;right:12px;top:90px;z-index:60;background:#2a2620;border:3px solid #b8b0a0;border-radius:16px;padding:10px 14px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f0ece0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:200px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#e8e0c8">🗿 은진미륵 세우기</b><div id="nsS" style="font:17px 'Do Hyeon',sans-serif;margin:4px 0"></div><div id="nsG" style="font-size:12px;color:#e8e0c8">돌이 아래 돌 위에 왔을 때 놓아요</div><div id="nsL" style="font-size:13px"></div>`;
  const btn=document.createElement('button');btn.id='nsB';btn.textContent='⬇ 놓기';btn.style.cssText="position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:61;font:22px 'Do Hyeon',sans-serif;background:#b8b0a0;color:#2a2620;border:0;border-radius:16px;padding:14px 42px;cursor:pointer";document.body.appendChild(btn);
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const upd=()=>{d.querySelector('#nsS').textContent=(lv<PARTS.length?PARTS[lv][0]:'완성')+' · '+Math.min(lv,PARTS.length)+' / '+PARTS.length+'단';d.querySelector('#nsL').textContent='다시 할 기회 '+'♥'.repeat(lives)+'♡'.repeat(3-lives)};upd();
  const curW=()=>{const base=placed[placed.length-1].w;return Math.min(base,.56*PARTS[lv][1])};
  const drop=()=>{if(done||lv>=PARTS.length)return;const top=placed[placed.length-1];const w=curW();const a0=Math.max(mx-w/2,top.x-top.w/2),a1=Math.min(mx+w/2,top.x+top.w/2);const ov=a1-a0;
   if(ov<w*.35){lives--;snd(140,.4,'sawtooth');d.querySelector('#nsG').textContent='돌이 미끄러졌어요! 흙을 더 쌓고 다시';upd();if(lives<=0){fin();return}mx=0;return}
   const nw=lv===0?w:Math.max(ov,w*.55);placed.push({x:lv===0?mx:(a0+a1)/2,w:nw});acc.push(ov/w);snd(300+lv*90,.25);d.querySelector('#nsG').textContent=ov/w>.9?'딱 맞아요!':'조금 어긋났지만 올렸어요';lv++;dir=Math.random()<.5?1:-1;mx=dir>0?0:1;spd+=.1;upd();if(lv>=PARTS.length)fin()};
  btn.onclick=drop;const onKey=e=>{if(e.code==='Space'){e.preventDefault();drop()}};addEventListener('keydown',onKey,true);cv.onpointerdown=()=>drop();
  const cleanup=()=>{removeEventListener('keydown',onKey,true);cv.remove();btn.remove()};
  const fin=()=>{if(done)return;done=true;cleanup();const ok=lv>=PARTS.length;const avg=acc.length?acc.reduce((a,b)=>a+b,0)/acc.length:0;const Q=ok?Math.max(60,Math.round(avg*100-(3-lives)*5)):Math.round(lv/PARTS.length*55);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('nonsan_stack',Q,'은진미륵 세우기')}catch(e){}window.__NSQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#e8e0c8">${ok?'은진미륵을 세웠어요!':PARTS[Math.min(lv,5)][0]+'까지 올렸어요'}</b><div style="font-size:13px;margin:4px 0">전설에서 석공들은 동자들의 흙 쌓기 놀이를 보고 흙 언덕을 쌓아 큰 돌을 올렸어요. 은진미륵은 몸을 여러 돌로 나눠 만들어 맞춘 자국이 지금도 보여요.</div><div style="font-size:24px;color:#b8b0a0">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#b8b0a0;color:#2a2620;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f0ece0;border:2px solid #f0ece0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__NSSTACK()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  let last=performance.now()/1000;
  const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}const now=performance.now()/1000,dt=Math.min(.1,now-last);last=now;const W=cv.width,Hh=cv.height;
   if(!done&&lv<PARTS.length){mx+=dir*spd*dt;if(mx>1){mx=1;dir=-1}if(mx<0){mx=0;dir=1}}
   q.clearRect(0,0,W,Hh);q.fillStyle='rgba(30,26,20,.35)';q.fillRect(0,0,W,Hh);const unit=Hh*.09,y0=Hh*.86;
   q.fillStyle='#8a6a40';q.beginPath();q.moveTo(W*.05,y0+unit*.6);q.lineTo(W*.95,y0+unit*.6);q.lineTo(W*.95,Hh);q.lineTo(W*.05,Hh);q.fill();
   let y=y0;const drawStone=(x,w,h,i)=>{q.fillStyle=['#a8a090','#b8b0a0','#b0a898','#bab2a2','#c0b8a8','#9a9284'][i%6];q.fillRect((x-w/2)*W,y-h*unit*2,w*W,h*unit*2);q.strokeStyle='rgba(60,50,40,.6)';q.lineWidth=2;q.strokeRect((x-w/2)*W,y-h*unit*2,w*W,h*unit*2);if(PARTS[i][0]==='머리'){q.fillStyle='#4a4438';q.fillRect((x-w*.25)*W,y-h*unit*1.3,w*.18*W,3);q.fillRect((x+w*.07)*W,y-h*unit*1.3,w*.18*W,3)}};
   for(let i=1;i<placed.length;i++){const p=placed[i];drawStone(p.x,p.w,PARTS[i-1][2],i-1);y-=PARTS[i-1][2]*unit*2}
   if(!done&&lv<PARTS.length){q.globalAlpha=.9;const w=curW();const yy=y-unit*.6;const sy=y;y=yy;drawStone(mx,w,PARTS[lv][2],lv);y=sy;q.globalAlpha=1;q.fillStyle='#f0ece0';q.font=`${Math.round(unit*.45)}px "Do Hyeon",sans-serif`;q.textAlign='center';q.fillText(PARTS[lv][0],mx*W,yy-PARTS[lv][2]*unit*2-6)}
   requestAnimationFrame(loop)};loop();
  window.__NSG={drop,get mx(){return mx},get lv(){return lv},get top(){return placed[placed.length-1]},get lives(){return lives}};try{ctx.say('은진미륵을 차곡차곡 쌓아요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'백제 화살촉',h:'황산벌 싸움 무렵의 쇠 화살촉이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.ConeGeometry(.03,.14,4),M(0x5a4a3a,{metalness:.5}));m.rotation.z=Math.PI/2;g.add(m)})},
  {n:'석공 정',h:'돌을 쪼던 쇠 정이에요. 은진미륵을 깎던 석공들도 썼겠지요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.02,.03,.24,6),M(0x4a4a4a,{metalness:.5}));m.rotation.z=Math.PI/2;g.add(m)})},
  {n:'고려 청자 조각',h:'관촉사가 세워진 고려 때 청자 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.16,.1,.1,14,1,true),M(0x8ab0a0,{side:THREE.DoubleSide,roughness:.3})))})},
  {n:'백자 연적',h:'돈암서원 유생이 쓰던 연적이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.08,12,8),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__NSDIG=()=>{window.__DETECT&&window.__DETECT({key:'nonsan_dig',title:'논산 발굴 탐지',emoji:'⛏️',bg:'#2a2620',count:4,TL:150,cand:[[10,-30],[30,-30],[-40,10],[10,20],[-10,40],[40,30],[-50,-40],[20,50]],items:ITEMS,intro:'논산 땅속에 옛 사람들의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'논산은 황산벌 싸움, 고려의 큰 돌부처, 조선 예학의 서원이 함께 있는 고장이에요.'})};
 const meta={quest:{t:'논산 둘러보기',d:'은진미륵과 돈암서원, 황산벌을 둘러보세요.',steps:[['미륵','은진미륵'],['서원','돈암서원 응도당'],['황산벌','황산벌']]},
  title:'논산 관촉사·돈암서원',hint:'18m 돌부처 은진미륵과 세계유산 돈암서원을 간추려 지었어요. 돌을 쌓아 은진미륵을 세워 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:6,z:10,lines:['논산 관촉사·돈암서원','은진미륵 18m','세계유산 한국의 서원','간추려 지음']}},
  npc:[['science',[[2,12],[12,12],[12,20],[2,20]]]],bounds:[-90,90,-90,90],level:()=>'논산',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.3,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#b8b0a0';g.fillRect(X(BX-3),Z(BZ-2.2),6*S,4.4*S);g.fillStyle='#8a6a48';g.fillRect(X(DX-7),Z(DZ-4),14*S,8*S);g.fillRect(X(DX-4),Z(DZ-18.5),8*S,5*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:6,z:16,yaw:Math.PI},size:{}},meta)}
