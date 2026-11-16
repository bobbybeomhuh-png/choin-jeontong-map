/* 무이 나라 조달청: 「공공조달 박람회」(우수조달물품 추천). 만든 날 2026-11-17
   관아 창의 「조달 박람회」 단추로 연다. 3D 관아 앞마당에 천막 다섯(반원), 천막마다 장인 무이와 새 물건, 구경꾼 무이들.
   WASD(방향키)로 걷고, 천막 앞(2.5m)에서 E(또는 화면 단추)로 상담. 물건 설명과 서류(시험 성적서·품질 인증·납품 실적)를 보고
   「우수조달물품 추천」 또는 「보류」. 서류가 다 갖춰진 셋만 추천이 맞다. 다섯 곳을 다 보면 결과, 엽전, 「우수조달물품」 카드.
   runFair(ctx,{ST,save,hudDraw,SND}) */
import * as T from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {overlay,title,blip,softOut} from './sites/minigames.js';
const BOOTHS=[{k:'metal',n:'녹슬지 않는 놋쇠 경첩',who:'금속 장인',col:0xb8322a,good:1,docs:[1,1,1],why:'시험 성적서·품질 인증·납품 실적이 다 있어요.'},
 {k:'ceramic',n:'잘 깨지지 않는 급식 그릇',who:'도자 장인',col:0x2a5a9a,good:1,docs:[1,1,1],why:'떨어뜨림 시험을 통과했고 인증도 있어요.'},
 {k:'science',n:'교실용 해시계 교구',who:'과학 기구 장인',col:0x2f6a4a,good:0,docs:[1,0,1],why:'품질 인증이 없어요. 「곧 받을 예정」만으로는 추천할 수 없어요.'},
 {k:'painter',n:'냄새 없는 옻칠 책상',who:'칠 장인',col:0x8a5a2a,good:1,docs:[1,1,1],why:'유해 물질 시험 성적서와 인증이 모두 있어요.'},
 {k:'carpenter',n:'접이식 장터 평상',who:'목수 장인',col:0x6a4a8a,good:0,docs:[0,1,0],why:'시험 성적서가 없어 튼튼한지 확인할 수 없어요.'}];
const DOC=['시험 성적서','품질 인증','납품 실적'];
export function runFair(ctx,E){const ui=overlay('#0d1424');let alive=true;ui.c.style.display='none';const ac=ctx.ac(),out=softOut(ctx);
 const R=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.shadowMap.enabled=true;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new T.Scene();sc.background=new T.Color(0xa8d0ec);sc.fog=new T.Fog(0xa8d0ec,30,60);try{const pm=new T.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 sc.add(new T.HemisphereLight(0xffffff,0x6a5a40,.6));const sun=new T.DirectionalLight(0xfff0d0,2.3);sun.position.set(-8,14,10);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-16,right:16,top:16,bottom:-16});sc.add(sun);
 const cam=new T.PerspectiveCamera(50,1,.05,80);
 title(ui.top,'공공조달 박람회','WASD로 걷기 · 천막 앞에서 E로 상담 · 서류를 보고 우수조달물품을 추천해요');
 const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.85},o));
 const cv=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'));const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t};
 /* 마당과 관아 */const gr=new T.Mesh(new T.PlaneGeometry(50,50),M(0xc8b080));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;sc.add(gr);
 const hall=new T.Group();{const w=new T.Mesh(new T.BoxGeometry(10,3,3),M(0xece4d2));w.position.y=1.5;hall.add(w);const rf=new T.Mesh(new T.ConeGeometry(7,2.2,4),M(0x3a3a3e));rf.rotation.y=Math.PI/4;rf.scale.set(1.4,1,.6);rf.position.y=4.1;hall.add(rf);const sg=new T.Mesh(new T.PlaneGeometry(4.6,1.1),new T.MeshBasicMaterial({toneMapped:false,map:cv(512,128,q=>{q.fillStyle='#1a2a4a';q.fillRect(0,0,512,128);q.strokeStyle='#d8a838';q.lineWidth=8;q.strokeRect(4,4,504,120);q.fillStyle='#f2d27a';q.font='bold 58px sans-serif';q.textAlign='center';q.fillText('공공조달 박람회',256,84)})}));sg.position.set(0,2.4,1.52);hall.add(sg)}hall.position.set(0,0,-11);sc.add(hall);
 /* 깃발 줄 */for(let k=0;k<12;k++){const f=new T.Mesh(new T.PlaneGeometry(.5,.6),new T.MeshStandardMaterial({color:[0xb8322a,0x2a5a9a,0xf2c14e,0x2f6a4a][k%4],side:T.DoubleSide}));f.position.set(-11+k*2,4.2,-6);sc.add(f)}
 /* 천막 다섯(반원) */const booths=[];const H=window.__H3;
 BOOTHS.forEach((b,i)=>{const a=Math.PI*(1.15+.7*i/4);const x=Math.cos(a)*-8,z=Math.sin(a)*8+1;const g=new T.Group();g.position.set(x,0,z);g.rotation.y=Math.atan2(-x,2-z);sc.add(g);
  for(const[px,pz]of[[-1.3,-1],[1.3,-1],[-1.3,1],[1.3,1]]){const p=new T.Mesh(new T.CylinderGeometry(.06,.06,2.6,6),M(0x5a3a22));p.position.set(px,1.3,pz);g.add(p)}
  const roof=new T.Mesh(new T.ConeGeometry(2.3,1.3,4),M(b.col));roof.rotation.y=Math.PI/4;roof.position.y=3.2;roof.castShadow=true;g.add(roof);
  const tb=new T.Mesh(new T.BoxGeometry(2.4,.8,.9),M(0x7a5634));tb.position.set(0,.4,.6);tb.castShadow=true;g.add(tb);
  /* 물건 모형 */let pr;if(b.k==='metal'){pr=new T.Group();for(let k=0;k<3;k++){const h=new T.Mesh(new T.BoxGeometry(.3,.4,.04),M(0xc8a040,{metalness:.8,roughness:.3}));h.position.set(-.5+k*.5,1.05,.6);pr.add(h)}}
  else if(b.k==='ceramic'){pr=new T.Group();for(let k=0;k<3;k++){const bw=new T.Mesh(new T.CylinderGeometry(.22,.13,.16,16),M(0xe8eef0,{roughness:.3}));bw.position.set(-.5+k*.5,.9,.6);pr.add(bw)}}
  else if(b.k==='science'){pr=new T.Mesh(new T.SphereGeometry(.32,20,10,0,Math.PI*2,Math.PI/2,Math.PI/2),M(0xb08a40,{metalness:.7,side:T.DoubleSide}));pr.position.set(0,1.15,.6)}
  else if(b.k==='painter'){pr=new T.Mesh(new T.BoxGeometry(.9,.35,.5),M(0x3a1a12,{roughness:.2}));pr.position.set(0,.98,.6)}
  else{pr=new T.Mesh(new T.BoxGeometry(1,.12,.6),M(0xb08a5a));pr.position.set(0,.9,.6)}g.add(pr);
  /* 서류 꽂이: 있는 서류는 초록 도장, 빠진 서류는 빈 칸 */const docs=new T.Mesh(new T.PlaneGeometry(1.4,.9),new T.MeshBasicMaterial({toneMapped:false,map:cv(280,180,q=>{q.fillStyle='#fbf3dc';q.fillRect(0,0,280,180);q.strokeStyle='#3b2a1c';q.lineWidth=4;q.strokeRect(2,2,276,176);q.font='bold 24px sans-serif';b.docs.forEach((d,j)=>{q.fillStyle='#2b1d12';q.fillText(DOC[j],16,48+j*52);q.fillStyle=d?'#2f6a4a':'#b8322a';q.beginPath();q.arc(240,40+j*52,16,0,7);d?q.fill():q.stroke();if(!d){q.font='bold 22px sans-serif';q.fillText('?',233,48+j*52);q.font='bold 24px sans-serif'}})})}));docs.position.set(1.0,1.5,1.06);g.add(docs);
  const sign=new T.Mesh(new T.PlaneGeometry(2.4,.5),new T.MeshBasicMaterial({toneMapped:false,map:cv(480,100,q=>{q.fillStyle='#2a1a10';q.fillRect(0,0,480,100);q.fillStyle='#f2d27a';q.font='bold 38px sans-serif';q.textAlign='center';q.fillText(b.n,240,64)})}));sign.position.set(0,2.45,1.02);g.add(sign);
  const ring=new T.Mesh(new T.RingGeometry(1.1,1.35,32),new T.MeshBasicMaterial({color:0xffe08a,transparent:true,opacity:.5,side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.set(0,.03,2.4);g.add(ring);
  const B={...b,g,ring,res:null,spot:new T.Vector3(0,0,2.4).applyMatrix4(g.matrixWorld.compose(g.position,new T.Quaternion().setFromEuler(g.rotation),new T.Vector3(1,1,1)))};booths.push(B);
  if(H&&H.makeMuui)H.makeMuui(b.k,1.15).then(m=>{m.root.position.set(-.6,0,-.2);g.add(m.root);m.play('idle');B.m=m}).catch(()=>{})});
 /* 구경꾼 */const folk=[];for(let k=0;k<4;k++)if(H&&H.makeMuui)H.makeMuui(['base','carpenter','ceramic','painter'][k],1.0).then(m=>{sc.add(m.root);m.play('walk');folk.push({m,t:Math.random()*6,r:3+k*.9})}).catch(()=>{});
 let me=null;if(H&&H.makeMuui)H.makeMuui('base',1.2).then(m=>{me=m;m.root.position.set(0,0,9);m.root.rotation.y=Math.PI;sc.add(m.root);m.play('idle')}).catch(()=>{});
 const hud=document.createElement('div');hud.style.cssText='position:absolute;left:16px;top:70px;z-index:3;padding:10px 14px;border-radius:12px;background:rgba(20,14,10,.78);color:#f2d27a;font:16px "Do Hyeon",sans-serif;line-height:1.7';ui.o.append(hud);
 const msg=document.createElement('div');msg.style.cssText='position:absolute;left:50%;bottom:16px;transform:translateX(-50%);z-index:3;max-width:min(780px,94vw);padding:8px 14px;border-radius:12px;background:rgba(243,234,214,.97);border:2px solid #d8a838;font:15px/1.6 "Gowun Dodum",sans-serif;color:#2b1d12;text-align:center';ui.o.append(msg);
 const say=(t,bad)=>{msg.style.borderColor=bad?'#b8322a':'#d8a838';msg.innerHTML=t};
 say('조달청 심사관 무이! 장인들이 새 물건을 내놓았어요. 천막 앞 금빛 고리에 서서 <b>E</b>로 상담하고, 서류가 다 갖춰진 물건만 <b>우수조달물품</b>으로 추천해요.');
 const key={};let near=null,talking=null,done=false;const kd=e=>{if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)){key[e.code]=true;e.preventDefault()}if(e.code==='KeyE'&&near&&!talking&&!done)talk(near)},ku=e=>{key[e.code]=false};addEventListener('keydown',kd);addEventListener('keyup',ku);
 const BTN="font:16px 'Do Hyeon',sans-serif;padding:8px 14px;border-radius:12px;border:0;cursor:pointer";
 const talk=b=>{talking=b;b.m&&b.m.play('wave');E.SND&&E.SND.paper&&E.SND.paper();say(`<b>${b.who}의 「${b.n}」</b><br>서류: ${b.docs.map((d,j)=>`${DOC[j]} ${d?'<b style="color:#2f6a4a">있음</b>':'<b style="color:#b8322a">없음</b>'}`).join(' · ')}<div style="margin-top:8px;display:flex;gap:8px;justify-content:center"><button type="button" data-y style="${BTN};background:#2f6a4a;color:#fff">우수조달물품 추천</button><button type="button" data-n style="${BTN};background:#8e2b20;color:#fff4dc">보류</button></div>`);
  msg.querySelector('[data-y]').onclick=()=>judge(b,1);msg.querySelector('[data-n]').onclick=()=>judge(b,0)};
 const judge=(b,v)=>{b.res=v;b.ok=v===b.good;talking=null;b.ring.material.color.setHex(b.ok?0x6ad08a:0xff7a6a);b.m&&b.m.play(b.ok&&v?'cheer':'idle');blip(ac,out,b.ok?600:220,b.ok?800:140,.1,.07,b.ok?'triangle':'square');
  say(`${b.ok?'<b>좋은 판단!</b>':'<b>아쉬워요.</b>'} ${b.why}`,!b.ok);if(booths.every(x=>x.res!=null))setTimeout(finish,1400)};
 const finish=()=>{done=true;const ok=booths.filter(b=>b.ok).length;const stars=ok===5?3:ok>=4?2:1;const coins=6+stars*7;E.ST.coins+=coins;E.ST.cards=E.ST.cards||{};E.ST.cards.excellent=1;E.ST.fair=Math.max(E.ST.fair||0,stars);E.save&&E.save();E.hudDraw&&E.hudDraw();E.SND&&E.SND.fan&&E.SND.fan();
  say(`<b>박람회 심사 끝! ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</b> 다섯 곳 가운데 ${ok}곳을 바르게 심사했어요 · 엽전 ${coins}냥.<br>조달청은 기술과 품질이 뛰어난 물건을 <b>우수조달물품</b>으로 정해 나라 기관이 믿고 살 수 있게 해요. 서류로 품질을 확인하는 게 먼저예요. 「우수조달물품」 카드가 열렸어요.<div style="margin-top:8px"><button type="button" data-x style="${BTN};background:#8e2b20;color:#fff4dc">마치기</button></div>`);msg.querySelector('[data-x]').onclick=close};
 const camPos=new T.Vector3(0,9,18);let last=performance.now();const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  for(const b of booths){if(b.m)b.m.mx.update(dt);if(b.res==null)b.ring.material.opacity=.35+.25*Math.sin(now/300)}
  for(const f of folk){f.m.mx.update(dt);f.t+=dt*.25;const x=Math.cos(f.t)*f.r,z=Math.sin(f.t)*f.r*.6+1;f.m.root.position.set(x,0,z);f.m.root.rotation.y=Math.atan2(-Math.sin(f.t)*f.r,Math.cos(f.t)*f.r*.6)}
  if(me){me.mx.update(dt);const p=me.root.position;if(!talking&&!done){const f=(key.KeyW||key.ArrowUp?1:0)-(key.KeyS||key.ArrowDown?1:0),s=(key.KeyD||key.ArrowRight?1:0)-(key.KeyA||key.ArrowLeft?1:0);
    if(f||s){const v=new T.Vector3(s,0,-f).normalize().multiplyScalar(4*dt);p.add(v);p.x=Math.max(-14,Math.min(14,p.x));p.z=Math.max(-8,Math.min(13,p.z));for(const b of booths){const d=Math.hypot(p.x-b.g.position.x,p.z-b.g.position.z);if(d<1.9){p.x=b.g.position.x+(p.x-b.g.position.x)/d*1.9;p.z=b.g.position.z+(p.z-b.g.position.z)/d*1.9}}me.root.rotation.y=Math.atan2(v.x,v.z);me.play('walk')}else me.play('idle')}
   near=null;for(const b of booths){if(b.res!=null)continue;const w=new T.Vector3(0,0,2.4).applyAxisAngle(new T.Vector3(0,1,0),b.g.rotation.y).add(b.g.position);if(Math.hypot(p.x-w.x,p.z-w.z)<1.6)near=b}
   if(near&&!talking&&!done&&!msg.querySelector('[data-talk]'))say(`<b>${near.who}</b>의 천막이에요. <button type="button" data-talk style="${BTN};background:#3b2a1c;color:#f2d27a">E 상담하기</button>`),msg.querySelector('[data-talk]').onclick=()=>talk(near);
   camPos.lerp(new T.Vector3(p.x*.6,p.y+8,p.z+9),Math.min(1,dt*3));cam.position.copy(camPos);cam.lookAt(p.x*.8,p.y+.8,p.z-2)}
  const n=booths.filter(b=>b.res!=null).length;hud.innerHTML=`심사한 천막 ${n} / 5`;
  R.render(sc,cam);requestAnimationFrame(loop)};loop();
 const close=()=>{if(!alive)return;alive=false;removeEventListener('keydown',kd);removeEventListener('keyup',ku);try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 window.__FAIR={state:()=>({me:me&&[me.root.position.x,me.root.position.z],near:near&&near.k,talking:talking&&talking.k,done,booths:booths.map(b=>({k:b.k,good:b.good,res:b.res,spot:(()=>{const w=new T.Vector3(0,0,2.4).applyAxisAngle(new T.Vector3(0,1,0),b.g.rotation.y).add(b.g.position);return[w.x,w.z]})()})),ready:!!me&&booths.every(b=>b.m)}),key,close};
 return{close}}
