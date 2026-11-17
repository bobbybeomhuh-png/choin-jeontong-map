/* 무이 나라 조달청: 「서당 책상 장보기」(G31, 종합쇼핑몰 다수공급자 2단계 경쟁). 만든 날 2026-11-17
   관아 창 「책상 장보기」 단추로 연다. 서당 훈장 무이의 주문: 아이들 좌식 서안 서른 개(높이 30cm 안팎, 모서리 둥근 것, 한 달 안 납품).
   3D 종합쇼핑몰 진열관에 미리 계약된 업체 다섯의 서안이 진열돼 있다. WASD로 걸으며 E로 살펴 「후보」·「제외」(1단계).
   조건에 맞는 둘만 후보가 되면, 둘이 다시 견적을 내고 그중 알맞은 하나를 고름(2단계). 다 하면 별·엽전, 「종합쇼핑몰」 카드.
   runMall(ctx,{ST,save,hudDraw,SND}) · window.__MALL */
import * as T from 'three';
import {setupPost} from './post.js';
import {hallBack,boardFloor} from './sites/dress.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {startAmb} from './amb.js';
import {overlay,title,blip,softOut} from './sites/minigames.js';
const DESK=[{k:'a',who:'한양 목공방',h:30,round:1,price:22,days:20,col:0x9a6a3a,ok:1},
 {k:'b',who:'큰 상단 가구',h:72,round:1,price:30,days:10,col:0x6a4a2a,ok:0,why:'서서 쓰는 높은 책상(72cm)이에요. 바닥에 앉는 서당엔 안 맞아요.'},
 {k:'c',who:'떠돌이 목수',h:32,round:0,price:15,days:12,col:0xb08a5a,ok:0,why:'모서리가 뾰족해요. 아이들이 부딪히면 다쳐요.'},
 {k:'d',who:'남도 소목장',h:28,round:1,price:18,days:45,col:0x8a5a2a,ok:0,why:'납품까지 45일이라 한 달 안에 못 받아요.'},
 {k:'e',who:'이천 나무 공방',h:31,round:1,price:26,days:14,col:0x7a4a22,ok:1}];
const RE={a:{price:21,days:28,note:'값을 1냥 깎고 납기는 28일'},e:{price:19,days:14,note:'값을 7냥 깎고 납기는 그대로 14일'}};
export function runMall(ctx,E){const ui=overlay('#0d1424');let alive=true;ui.c.style.display='none';const ac=ctx.ac(),out=softOut(ctx);const stopAmb=startAmb(ctx,'market');
 const R=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.shadowMap.enabled=true;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new T.Scene();try{setupPost(R,sc)}catch(e){}sc.background=new T.Color(0x20160e);try{const pm=new T.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 sc.add(new T.HemisphereLight(0xfff2dc,0x4a3a2a,.85));const sun=new T.DirectionalLight(0xffe8c8,1.7);sun.position.set(-5,10,7);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-12,right:12,top:12,bottom:-12});sc.add(sun);
 {let mt;try{mt=boardFloor(0x9a8470,8)}catch(e){mt=new T.MeshStandardMaterial({color:0x9a7a52})}const f=new T.Mesh(new T.PlaneGeometry(40,30),mt);f.rotation.x=-Math.PI/2;f.receiveShadow=true;sc.add(f)}try{hallBack(sc,{z:-6,w:36,h:7,y0:0})}catch(e){}
 const cam=new T.PerspectiveCamera(50,1,.05,80);
 title(ui.top,'서당 책상 장보기','WASD로 걷기 · 진열대 앞에서 E로 살피기 · 서당 조건에 맞는 서안만 후보로 골라요');
 const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.7},o));
 const cv=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'));const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t};
 /* 진열관 간판 */{const sg=new T.Mesh(new T.PlaneGeometry(6,1.2),new T.MeshBasicMaterial({toneMapped:false,map:cv(600,120,q=>{q.fillStyle='#1a2a4a';q.fillRect(0,0,600,120);q.strokeStyle='#d8a838';q.lineWidth=8;q.strokeRect(4,4,592,112);q.fillStyle='#f2d27a';q.font='bold 56px sans-serif';q.textAlign='center';q.fillText('나라장터 종합쇼핑몰',300,80)})}));sg.position.set(0,4.15,-5.8);sc.add(sg)}
 /* 서안(좌식 책상) 모형: 높이(cm)를 그대로 줄여 씀, 둥근 모서리는 판 끝을 둥글게 */const deskMesh=d=>{const g=new T.Group();const H=d.h/100*1.6,W=1.4,D=.6,th=.07,m=M(d.col,{roughness:.45});
  let top;if(d.round){const s=new T.Shape();const r=.12;s.moveTo(-W/2+r,-D/2);s.lineTo(W/2-r,-D/2);s.quadraticCurveTo(W/2,-D/2,W/2,-D/2+r);s.lineTo(W/2,D/2-r);s.quadraticCurveTo(W/2,D/2,W/2-r,D/2);s.lineTo(-W/2+r,D/2);s.quadraticCurveTo(-W/2,D/2,-W/2,D/2-r);s.lineTo(-W/2,-D/2+r);s.quadraticCurveTo(-W/2,-D/2,-W/2+r,-D/2);top=new T.Mesh(new T.ExtrudeGeometry(s,{depth:th,bevelEnabled:true,bevelSize:.02,bevelThickness:.02,bevelSegments:3}),m);top.rotation.x=-Math.PI/2;top.position.y=H}else{top=new T.Mesh(new T.BoxGeometry(W,th,D),m);top.position.y=H+th/2;for(const sx of[-1,1]){const sp=new T.Mesh(new T.ConeGeometry(.05,.16,4),M(0xd8d8d8,{metalness:.6}));sp.rotation.z=-sx*Math.PI/2;sp.position.set(sx*(W/2+.06),H+th/2,0);g.add(sp)}}
  top.castShadow=true;g.add(top);for(const[x,z]of[[-W/2+.12,-D/2+.1],[W/2-.12,-D/2+.1],[-W/2+.12,D/2-.1],[W/2-.12,D/2-.1]]){const l=new T.Mesh(new T.BoxGeometry(.07,H,.07),m);l.position.set(x,H/2,z);l.castShadow=true;g.add(l)}return g};
 const booths=[];const Hh=window.__H3;
 DESK.forEach((d,i)=>{const x=-8+i*4,z=-2.4;const g=new T.Group();g.position.set(x,0,z);sc.add(g);const pl=new T.Mesh(new T.BoxGeometry(2.6,.3,1.8),M(0xe8dcc4));pl.position.y=.15;pl.receiveShadow=true;g.add(pl);const dk=deskMesh(d);dk.position.y=.3;g.add(dk);
  const tag=new T.Mesh(new T.PlaneGeometry(2.2,1.1),new T.MeshBasicMaterial({toneMapped:false,map:cv(440,220,q=>{q.fillStyle='#fbf3dc';q.fillRect(0,0,440,220);q.strokeStyle='#3b2a1c';q.lineWidth=6;q.strokeRect(3,3,434,214);q.fillStyle='#8e2b20';q.font='bold 34px sans-serif';q.textAlign='center';q.fillText(d.who,220,48);q.fillStyle='#2b1d12';q.font='bold 30px sans-serif';q.fillText(`높이 ${d.h}cm · 모서리 ${d.round?'둥긂':'각짐'}`,220,102);q.fillText(`한 개 ${d.price}냥 · 납기 ${d.days}일`,220,150);q.fillStyle='#5a7a4a';q.font='24px sans-serif';q.fillText('계약 단가 (미리 계약됨)',220,196)})}));tag.position.set(0,2.6,-.4);g.add(tag);
  const ring=new T.Mesh(new T.RingGeometry(.7,.9,32),new T.MeshBasicMaterial({color:0xffe08a,transparent:true,opacity:.5,side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.set(0,.03,1.8);g.add(ring);booths.push({...d,g,ring,res:null,sx:x,sz:z+1.8})});
 let me=null,boss=null;if(Hh&&Hh.makeMuui){Hh.makeMuui('base',1.2).then(m=>{me=m;m.root.position.set(0,0,5);m.root.rotation.y=Math.PI;sc.add(m.root);m.play('idle')}).catch(()=>{});Hh.makeMuui('science',1.15).then(m=>{boss=m;m.root.position.set(-10.5,0,3);m.root.rotation.y=.9;sc.add(m.root);m.play('idle')}).catch(()=>{})}
 const hud=document.createElement('div');hud.style.cssText='position:absolute;left:16px;top:70px;z-index:3;padding:10px 14px;border-radius:12px;background:rgba(20,14,10,.78);color:#f2d27a;font:16px "Do Hyeon",sans-serif;line-height:1.7';ui.o.append(hud);
 const msg=document.createElement('div');msg.style.cssText='position:absolute;left:50%;bottom:16px;transform:translateX(-50%);z-index:3;max-width:min(800px,94vw);padding:8px 14px;border-radius:12px;background:rgba(243,234,214,.97);border:2px solid #d8a838;font:15px/1.6 "Gowun Dodum",sans-serif;color:#2b1d12;text-align:center';ui.o.append(msg);
 const say=(t,bad)=>{msg.style.borderColor=bad?'#b8322a':'#d8a838';msg.innerHTML=t};
 const BTN="font:16px 'Do Hyeon',sans-serif;padding:8px 14px;border-radius:12px;border:0;cursor:pointer";
 const NEED='<b>서당 주문</b>: 바닥에 앉아 쓰는 서안 서른 개 · 높이 30cm 안팎 · 모서리 둥근 것 · 한 달(30일) 안 납품';
 say(`훈장 무이가 서당 서안을 주문했어요. ${NEED}<br>진열대를 돌며 조건에 맞는 것만 <b>후보</b>로 골라요.`);
 let phase='look',talking=null,near=null,score=0,total=0,pick2=null;
 const talk=b=>{talking=b;try{E.SND&&E.SND.paper&&E.SND.paper()}catch(e){}say(`<b>${b.who}의 서안</b> · 높이 ${b.h}cm · 모서리 ${b.round?'둥긂':'각짐'} · 한 개 ${b.price}냥 · 납기 ${b.days}일<br><small>${NEED}</small><div style="margin-top:8px;display:flex;gap:8px;justify-content:center"><button type="button" data-y style="${BTN};background:#2f6a4a;color:#fff">후보</button><button type="button" data-n style="${BTN};background:#8e2b20;color:#fff4dc">제외</button></div>`);
  msg.querySelector('[data-y]').onclick=()=>judge(b,1);msg.querySelector('[data-n]').onclick=()=>judge(b,0)};
 const judge=(b,v)=>{b.res=v;const ok=v===b.ok;total++;if(ok)score++;talking=null;b.ring.material.color.setHex(v?0x6ad08a:0xb0a090);b.ring.material.opacity=.75;blip(ac,out,ok?600:220,ok?800:140,.1,.07,ok?'triangle':'square');
  say(`${ok?'<b>좋은 판단!</b>':'<b>다시 보면…</b>'} ${b.ok?'서당 조건에 다 맞는 서안이에요.':b.why}`,!ok);if(booths.every(x=>x.res!=null))setTimeout(stage2,1500)};
 const stage2=()=>{phase='quote';const C=booths.filter(b=>b.ok);say(`<b>2단계 경쟁</b> · 조건에 맞는 두 곳에 서른 개 값을 다시 물었어요. 다수공급자 물품은 이렇게 한 번 더 견적을 받아요.<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">${C.map(b=>`<button type="button" data-q="${b.k}" style="${BTN};background:#fff4dc;color:#3b2a1c;border:2px solid #3b2a1c;text-align:left"><b>${b.who}</b><br>한 개 ${RE[b.k].price}냥 · 납기 ${RE[b.k].days}일<br><small>${RE[b.k].note}</small></button>`).join('')}</div>`);
  msg.querySelectorAll('[data-q]').forEach(x=>x.onclick=()=>final(x.dataset.q))};
 const final=k=>{pick2=k;const ok=k==='e';total++;if(ok)score++;blip(ac,out,ok?660:200,ok?880:120,.12,.08,ok?'triangle':'square');boss&&boss.play(ok?'cheer':'idle');const b=booths.find(x=>x.k===k);
  const why=ok?'같은 조건에 값이 더 싸고(19냥) 납기도 빨라요(14일). 서른 개면 60냥을 아껴요.':'한양 목공방은 21냥에 28일이라, 19냥에 14일인 이천 나무 공방보다 비싸고 느려요.';
  say(`${ok?'<b>알맞게 골랐어요!</b>':'<b>아쉬워요.</b>'} ${why}<div style="margin-top:8px"><button type="button" data-f style="${BTN};background:#3b2a1c;color:#f2d27a">결과 보기</button></div>`,!ok);msg.querySelector('[data-f]').onclick=finish};
 const finish=()=>{phase='done';const stars=score===total?3:score>=total-1?2:1;const coins=6+stars*7;E.ST.coins+=coins;E.ST.cards=E.ST.cards||{};E.ST.cards.mall=1;E.ST.mall=Math.max(E.ST.mall||0,stars);try{E.save&&E.save();E.hudDraw&&E.hudDraw();E.SND&&E.SND.fan&&E.SND.fan()}catch(e){}
  say(`<b>서당 책상 장보기 끝! ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</b> 판단 ${total}번 가운데 ${score}번 맞혔어요 · 엽전 ${coins}냥.<br>공공기관은 나라장터 <b>종합쇼핑몰</b>에서 조달청이 미리 계약해 둔 물건을 골라 사요. 여러 업체가 계약된 물건은 조건에 맞는 곳끼리 한 번 더 견적을 받아 고르기도 해요(2단계 경쟁). 「종합쇼핑몰」 카드가 열렸어요.<div style="margin-top:8px"><button type="button" data-x style="${BTN};background:#8e2b20;color:#fff4dc">마치기</button></div>`);msg.querySelector('[data-x]').onclick=close};
 const key={};const kd=e=>{if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)){key[e.code]=true;e.preventDefault()}if(e.code==='KeyE'&&near&&!talking&&phase==='look')talk(near)},ku=e=>{key[e.code]=false};addEventListener('keydown',kd);addEventListener('keyup',ku);
 const camPos=new T.Vector3(0,5,11);let last=performance.now();const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  for(const b of booths)if(b.res==null)b.ring.material.opacity=.35+.25*Math.sin(now/300);if(boss)boss.mx.update(dt);
  if(me){me.mx.update(dt);const p=me.root.position;if(!talking&&phase==='look'){const f=(key.KeyW||key.ArrowUp?1:0)-(key.KeyS||key.ArrowDown?1:0),s=(key.KeyD||key.ArrowRight?1:0)-(key.KeyA||key.ArrowLeft?1:0);
    if(f||s){const v=new T.Vector3(s,0,-f).normalize().multiplyScalar(4*dt);p.add(v);p.x=Math.max(-11,Math.min(11,p.x));p.z=Math.max(-.4,Math.min(7,p.z));me.root.rotation.y=Math.atan2(v.x,v.z);me.play('walk')}else me.play('idle')}
   near=null;for(const b of booths){if(b.res!=null)continue;if(Math.hypot(p.x-b.sx,p.z-b.sz)<1.1)near=b}
   if(near&&!talking&&phase==='look'&&!msg.querySelector('[data-talk]'))say(`<b>${near.who}</b>의 진열대예요. <button type="button" data-talk style="${BTN};background:#3b2a1c;color:#f2d27a">E 살피기</button>`),msg.querySelector('[data-talk]').onclick=()=>talk(near);
   camPos.lerp(new T.Vector3(p.x*.7,4.6,p.z+6.5),Math.min(1,dt*3));cam.position.copy(camPos);cam.lookAt(p.x*.85,1.2,p.z-3)}
  hud.innerHTML=`살핀 진열대 ${booths.filter(b=>b.res!=null).length} / 5<br>맞힌 판단 ${score}`;R.render(sc,cam);requestAnimationFrame(loop)};loop();
 const close=()=>{if(!alive)return;alive=false;try{stopAmb()}catch(e){}removeEventListener('keydown',kd);removeEventListener('keyup',ku);try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 window.__MALL={state:()=>({phase,score,total,me:me&&[me.root.position.x,me.root.position.z],near:near&&near.k,booths:booths.map(b=>({k:b.k,ok:b.ok,res:b.res,x:b.sx,z:b.sz})),ready:!!me&&!!boss}),close};
 return{close}}
