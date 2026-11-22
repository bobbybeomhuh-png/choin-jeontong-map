/* 구례·광양 마당(2026-11-22, W67): 구례 화엄사 각황전·석등, 운조루와 타인능해 뒤주, 광양 매화마을.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음.
   화엄사 각황전(국보): 두 층으로 보이는 아주 큰 불전. 앞의 석등(국보)은 우리나라에서 가장 큰 석등 가운데 하나.
   운조루(국가민속문화유산): 류이주가 지은 집. 사랑채 앞 쌀뒤주 마개에 「他人能解(타인능해, 누구나 열 수 있다)」라 써 두고 배고픈 이웃이 쌀을 가져가게 했다고 전함.
   광양 매화마을: 섬진강 가 매화 언덕.
   놀이: 타인능해 쌀 나누기(마개를 돌려 식구 수만큼 쌀을 받아 주기, 쌀은 마개를 닫은 뒤에도 조금 더 흘러요), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildGurye(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1776);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x7a9a48,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 화엄사 각황전 + 석등 */const HX=-14,HZ=-42;if(!mini){const h=buildHall({x:HX,z:HZ,ry:0,W:16,D:11,nx:5,nz:3,FY:1.4,PH:4.6,roof:'hip',name:'覺皇殿',pillar:0x9a3a26,bracket:'dapo',front:'door',upper:{h:3.6},roofScale:1.05,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 {const ST=M(0x9a948a,{flatShading:true});const g=new THREE.Group();g.position.set(HX,0,HZ+12);const b=new THREE.Mesh(new THREE.BoxGeometry(2.4,.6,2.4),ST);b.position.y=.3;g.add(b);const lo=new THREE.Mesh(new THREE.CylinderGeometry(.9,1,.6,8),ST);lo.position.y=.9;g.add(lo);const drum=new THREE.Mesh(new THREE.CylinderGeometry(.55,.75,2.2,8),ST);drum.position.y=2.3;g.add(drum);const up=new THREE.Mesh(new THREE.CylinderGeometry(1.1,.8,.5,8),ST);up.position.y=3.65;g.add(up);const fire=new THREE.Mesh(new THREE.CylinderGeometry(.75,.75,1.4,8),ST);fire.position.y=4.6;g.add(fire);const win=new THREE.Mesh(new THREE.CylinderGeometry(.76,.76,.7,4),M(0x1a1612));win.position.y=4.6;g.add(win);const rf=new THREE.Mesh(new THREE.ConeGeometry(1.4,.8,8),ST);rf.position.y=5.7;g.add(rf);const bd=new THREE.Mesh(new THREE.SphereGeometry(.3,8,6),ST);bd.position.y=6.25;g.add(bd);G.add(g);solids.push({cx:HX,cz:HZ+12,r:1.4,y0:0,y1:6.4})}
 const lamp=new THREE.PointLight(0xffb060,0,16,1.6);lamp.position.set(HX,4.6,HZ+12);G.add(lamp);
 /* 운조루: 사랑채 + 담 + 뒤주 */const UX=16,UZ=-6;if(!mini){const h=buildHall({x:UX,z:UZ-4,ry:0,W:12,D:5,nx:5,nz:1,FY:.9,PH:2.6,roof:'gable',name:'雲鳥樓',pillar:0x8a6a44,bracket:'ik',front:'open',roofScale:.95,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 const DJ={x:UX+3,z:UZ+1.2};const rice=new THREE.Mesh(new THREE.ConeGeometry(.2,.12,16),M(0xf4f0e4,{roughness:.8}));{const WD=M(0x7a5a3a);const box=new THREE.Mesh(new THREE.BoxGeometry(1.1,1,.9),WD);box.position.set(DJ.x,.75,DJ.z);G.add(box);for(const[lx,lz]of[[-.5,-.4],[.5,-.4],[.5,.4],[-.5,.4]]){const l=new THREE.Mesh(new THREE.BoxGeometry(.1,.3,.1),WD);l.position.set(DJ.x+lx,.15,DJ.z+lz);G.add(l)}const lid=new THREE.Mesh(new THREE.BoxGeometry(1.2,.08,1),M(0x6a4a30));lid.position.set(DJ.x,1.29,DJ.z);G.add(lid);
  const LT=tex(256,64,(q,w,h)=>{q.fillStyle='#8a6a44';q.fillRect(0,0,w,h);q.fillStyle='#2a1a10';q.font='bold 40px serif';q.textAlign='center';q.fillText('他人能解',w/2,46)});const sg=new THREE.Mesh(new THREE.PlaneGeometry(.7,.18),new THREE.MeshStandardMaterial({map:LT}));sg.position.set(DJ.x,.6,DJ.z+.456);G.add(sg);const plug=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.1,10),M(0x5a3a24));plug.rotation.x=Math.PI/2;plug.position.set(DJ.x,.36,DJ.z+.5);G.add(plug);plug.name='plug';
  const bowl=new THREE.Mesh(new THREE.SphereGeometry(.22,16,8,0,Math.PI*2,Math.PI/2,Math.PI/2),M(0xc8a060,{side:THREE.DoubleSide}));bowl.position.set(DJ.x,.22,DJ.z+.75);G.add(bowl);rice.position.set(DJ.x,.06,DJ.z+.75);rice.scale.set(.001,.001,.001);G.add(rice);solids.push({x0:DJ.x-.6,x1:DJ.x+.6,y0:0,y1:1.4,z0:DJ.z-.5,z1:DJ.z+.5})
  const wm=M(0xb8a888);for(const[x0,x1,z]of[[UX-10,UX-2,UZ+6],[UX+2,UX+10,UZ+6]]){const w=new THREE.Mesh(new THREE.BoxGeometry(x1-x0,1.6,.4),wm);w.position.set((x0+x1)/2,.8,z);G.add(w);solids.push({x0,x1,y0:0,y1:1.6,z0:z-.2,z1:z+.2})}}
 const stream=new THREE.Points(new THREE.BufferGeometry(),new THREE.PointsMaterial({color:0xf8f4e8,size:.025}));{const n=60,p=new Float32Array(n*3);stream.geometry.setAttribute('position',new THREE.BufferAttribute(p,3));stream.visible=false;G.add(stream)}
 /* 광양 매화마을: 동쪽 언덕 매화 + 섬진강 */const MX=46,MZ=20;{const river=new THREE.Mesh(new THREE.PlaneGeometry(14,200),M(0x5a8aa8,{roughness:.2,metalness:.1}));river.rotation.x=-Math.PI/2;river.position.set(MX+22,.04,0);G.add(river);solids.push({x0:MX+15,x1:MX+29,y0:-1,y1:3,z0:-100,z1:100});const FL=[M(0xf8f0f4),M(0xf8d8e4),M(0xfff8f8)];for(let k=0;k<40;k++){const x=MX-10+r()*22,z=MZ-24+r()*44;const t=new THREE.Mesh(new THREE.CylinderGeometry(.1,.16,1.4,6),M(0x4a3a2a));t.position.set(x,.7,z);t.rotation.z=(r()-.5)*.4;G.add(t);const c=new THREE.Mesh(new THREE.SphereGeometry(1+r()*.4,8,6),FL[k%3]);c.scale.y=.7;c.position.set(x,1.9,z);G.add(c)}}
 const NL=[];if(!mini){for(const[x,y,z]of[[HX,4,HZ+15],[UX,3,UZ+4],[MX,3,MZ]]){const L=new THREE.PointLight(0xffc080,0,26,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8);lamp.intensity=nk*6};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(HX,HZ+16,3.4,'화엄사 각황전과 석등','지리산 화엄사의 각황전은 겉으로 두 층인 아주 큰 불전이에요(국보). 앞의 석등도 우리나라에서 손꼽히게 큰 석등이에요(국보). 밤에는 석등에 불이 켜져요. 간추려 지었어요.');
 sp(UX,UZ+3,3,'구례 운조루','조선 영조 때 류이주가 지은 집이에요. 사랑채 앞 쌀뒤주 마개에 「타인능해(누구나 열 수 있다)」라 써 두고, 배고픈 이웃이 눈치 보지 않고 쌀을 가져가게 했대요. 간추려 지었어요.');
 sp(DJ.x+1.6,DJ.z+1.8,2,'뒤주 여는 자리','찾아온 이웃에게 식구 수만큼 쌀을 받아 줘 봐요.');
 sp(MX,MZ+26,3,'광양 매화마을','섬진강 가 언덕에 봄이면 매화가 하얗게 피어요. 간추려 지었어요.');
 sp(-50,40,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 타인능해 쌀 나누기(11/22): 이웃 다섯. 식구 수만큼 「되」로 받아 줘요(한 사람 한 되). 「마개 돌리기」를 누르고 있으면 쌀이 흘러나와요(점점 빨라져요). 놓으면 마개가 닫혀도 쌀이 조금 더 흘러요. 알맞게 받으면 좋아요 */
 window.__GRRICE=()=>{if(document.getElementById('grP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(DJ.x+1.6,DJ.z+1.6,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('grP')?[DJ.x+.6,1,DJ.z+2,DJ.x,.4,DJ.z+.5,50]:null;
  let rd=0,amt=0,rate=0,hold=false,lag=0,target=0,done=false,auto=false,last=performance.now(),msg='',wait=0,closed=false;const res=[];const sp2=stream.geometry.attributes.position.array;
  const visitor=new THREE.Group();{const b=new THREE.Mesh(new THREE.CylinderGeometry(.2,.28,1.1,8),M(0xd8d0c0));b.position.y=.55;visitor.add(b);const h=new THREE.Mesh(new THREE.SphereGeometry(.16,10,8),M(0xe0b890));h.position.y=1.25;visitor.add(h)}visitor.position.set(DJ.x-.9,0,DJ.z+1.2);G.add(visitor);
  const newV=()=>{target=2+Math.floor(Math.random()*5);amt=0;rate=0;lag=0;closed=false;rice.scale.set(.001,.001,.001);visitor.position.x=DJ.x-.9};newV();
  const d=document.createElement('div');d.id='grP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#2a2418;border:3px solid #e8dcc0;border-radius:16px;padding:10px 14px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f8f4e8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:290px;max-width:94vw;user-select:none;touch-action:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🍚 타인능해 쌀 나누기</b><div data-i style="margin:4px 0;font:14px 'Do Hyeon',sans-serif"></div><div style="position:relative;height:16px;background:#4a3a2a;border-radius:8px;overflow:hidden"><div data-a style="height:100%;width:0;background:#f4f0e4"></div><div data-g style="position:absolute;top:0;bottom:0;width:3px;background:#f8c060"></div></div><button data-p style="width:100%;margin-top:8px;font:18px 'Do Hyeon',sans-serif;background:#8a6a44;color:#fff;border:0;border-radius:14px;padding:12px 0;cursor:pointer;touch-action:none">누르고 있는 동안 마개 돌리기</button><div data-m style="font-size:12px;color:#f8e8a0;margin-top:5px">닫아도 조금 더 흘러요. 미리 놓아요</div>`;
  const iEl=d.querySelector('[data-i]'),aEl=d.querySelector('[data-a]'),gEl=d.querySelector('[data-g]'),mEl=d.querySelector('[data-m]'),pb=d.querySelector('[data-p]');
  const snd=(f,len,type='sine')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const press=()=>{if(done||wait>0||closed)return;hold=true};const rel=()=>{if(!hold)return;hold=false;closed=true;lag=.45};
  pb.onpointerdown=e=>{e.preventDefault();press()};pb.onpointerup=pb.onpointerleave=pb.onpointercancel=rel;const kd=e=>{if(e.code==='Space'&&!e.repeat){e.preventDefault();press()}},ku=e=>{if(e.code==='Space')rel()};addEventListener('keydown',kd);addEventListener('keyup',ku);
  const cleanup=()=>{removeEventListener('keydown',kd);removeEventListener('keyup',ku);G.remove(visitor);stream.visible=false};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(wait>0){wait-=dt;visitor.position.x-=dt*.8;if(wait<=0){rd++;if(rd>=5){fin();return}newV();msg=''}}
   else{if(auto&&!closed){if(!hold)press();else if(amt+rate*.45*.6>=target-.02)rel()}
    if(hold)rate=Math.min(2.2,rate+dt*2.4);else if(lag>0){lag-=dt;rate*=Math.pow(.15,dt)}else rate=0;amt+=rate*dt;
    if(closed&&lag<=0&&rate===0){const e=Math.abs(amt-target);const sc=e<=.2?1:Math.max(0,1-(e-.2)/1.5);res.push(sc);msg=e<=.2?`딱 ${target}되예요! 고맙다며 돌아가요`:amt>target?`${amt.toFixed(1)}되, 조금 많이 드렸어요`:`${amt.toFixed(1)}되, 조금 모자라요`;snd(sc>.8?780:400,.2);wait=1.4}}
   stream.visible=rate>.02;if(stream.visible){for(let i=0;i<60;i++){const f=(i/60+now/400)%1;sp2[i*3]=DJ.x+(Math.random()-.5)*.03;sp2[i*3+1]=.36-f*.26;sp2[i*3+2]=DJ.z+.55+f*.2}stream.geometry.attributes.position.needsUpdate=true}
   const s=Math.max(.001,Math.cbrt(amt/6));rice.scale.set(s,s,s);const mx=8;aEl.style.width=Math.min(100,amt/mx*100)+'%';gEl.style.left=`calc(${target/mx*100}% - 1px)`;
   iEl.textContent=`${Math.min(rd+1,5)} / 5번째 이웃 · 식구 ${target}명 → ${target}되 · 받은 쌀 ${amt.toFixed(1)}되`;mEl.textContent=msg||mEl.textContent;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();rice.scale.set(.001,.001,.001);const Q=Math.round(res.reduce((a,b)=>a+b,0)/5*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('gurye_rice',Q,'타인능해 쌀 나누기')}catch(e){}window.__GRQ=Q;snd(660,.3);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">이웃 다섯 집에 쌀을 나눴어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">운조루 주인은 쌀을 가져가는 사람이 부끄럽지 않도록 뒤주를 사랑채 앞에 두고 누구나 마개를 열게 했대요. 나눔을 드러내지 않는 마음이 「타인능해」 넉 자에 담겨 있어요.</div><div style="font-size:24px;color:#e8dcc0">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#e8dcc0;color:#2a2418;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f8f4e8;border:2px solid #f8f4e8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__GRRICE()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__GRG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('식구 수만큼 나눠 줘요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'뒤주 마개',h:'쌀뒤주 구멍을 막던 나무 마개예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.1,10),M(0x5a3a24)))})},
  {n:'되(곡식 됫박)',h:'곡식을 되던 나무 됫박 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.16,.08,.16),M(0x8a6a44)))})},
  {n:'석등 화창 조각',h:'석등 불창 둘레 돌 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.18,.08,.06),M(0x9a948a)))})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__GRDIG=()=>{window.__DETECT&&window.__DETECT({key:'gurye_dig',title:'구례·광양 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[-50,40],[-40,0],[10,40],[30,-40],[-60,-20],[20,25],[-20,30],[-70,10]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'구례·광양은 큰 절과 나눔의 집, 매화의 고장이에요.'})};
 const meta={quest:{t:'구례·광양 둘러보기',d:'화엄사 각황전과 운조루, 매화마을을 둘러보세요.',steps:[['각황전','화엄사 각황전과 석등'],['운조루','구례 운조루'],['매화마을','광양 매화마을']]},
  title:'구례·광양 화엄사·운조루·매화마을',hint:'화엄사 각황전·운조루·매화마을을 공개 사진으로 간추려 지었어요. 타인능해 뒤주에서 이웃에게 쌀을 알맞게 나눠 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-4,z:16,lines:['구례·광양','화엄사 각황전 · 석등','운조루 타인능해 · 매화','간추려 지음']}},
  npc:[['science',[[-8,12],[4,12],[4,22],[-8,22]]]],bounds:[-90,66,-90,90],level:()=>'구례',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#7a9a48';g.fillRect(0,0,300,300);g.fillStyle='#9a3a26';g.fillRect(X(HX-8),Z(HZ-5.5),16*S,11*S);g.fillRect(X(UX-6),Z(UZ-6.5),12*S,5*S);g.fillStyle='#f8d8e4';g.fillRect(X(MX-10),Z(MZ-24),22*S,44*S);g.fillStyle='#5a8aa8';g.fillRect(X(MX+15),0,14*S,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:22,yaw:Math.PI},size:{}},meta)}
