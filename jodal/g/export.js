/* 무이 나라 조달청: 「해외 조달 시장」(우리 공방 물건 수출). 만든 날 2026-11-17
   관아의 「해외 조달 시장」 단추로 연다. 3D 포구: 돌 부두, 무역선, 바다 건너 세 곳(박물관·정부청사·학교)의 주문 깃발.
   주문마다 부두 상자에서 후보 셋을 하나씩 눌러 들어 올려 돌려 보며(흠은 겉에 있음) 규격에 맞는 걸 「싣기」.
   맞으면 기중기가 배에 싣고, 틀리면 왜 아닌지 알려 준다. 셋 다 실으면 배가 떠나고 「해외 조달 시장」 카드.
   runExport(ctx,{ST,save,hudDraw,SND}) */
import * as T from 'three';
import {setupPost} from './post.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {overlay,title,blip,softOut} from './sites/minigames.js';
const ORD=[{who:'바다 건너 박물관',col:0x2a6a9a,want:'전시용 청자 매병',spec:'비색이 맑고 금 간 곳이 없을 것',kind:'vase',
  cands:[{v:'yellow',n:'누런 매병',why:'빛깔이 누렇게 떠서 비색 규격에 맞지 않아요.'},{v:'crack',n:'금 간 매병',why:'몸통에 금이 가 있어요. 전시하다 깨질 수 있어요.'},{v:'good',n:'맑은 비색 매병',why:''}]},
 {who:'먼 나라 정부청사',col:0x8e2b20,want:'회의실 나전 탁상함',spec:'자개가 빠짐없이 고르게 박히고 옻칠이 고를 것',kind:'box',
  cands:[{v:'good',n:'고른 나전함',why:''},{v:'sparse',n:'자개 빠진 나전함',why:'자개가 군데군데 빠져 무늬가 끊겼어요.'},{v:'patch',n:'얼룩 칠 나전함',why:'옻칠이 얼룩덜룩해요. 칠이 고르지 않으면 금방 벗겨져요.'}]},
 {who:'남쪽 섬나라 학교',col:0x2f6a4a,want:'교실용 앙부일구',spec:'영침이 그 나라 위도 35도로 기울 것',kind:'sun',
  cands:[{v:50,n:'50도 앙부일구',why:'영침이 50도로 기울었어요. 북쪽 나라에 맞는 해시계예요.'},{v:37.5,n:'37.5도 앙부일구',why:'서울(37.5도)에 맞춘 해시계라 그 나라에선 시각이 어긋나요.'},{v:35,n:'35도 앙부일구',why:''}]}];
export function runExport(ctx,E){const ui=overlay('#0d1a24');let alive=true;ui.c.style.display='none';const ac=ctx.ac(),out=softOut(ctx);
 const R=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.shadowMap.enabled=true;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new T.Scene();try{setupPost(R,sc)}catch(e){console.warn('후처리',e)}sc.background=new T.Color(0x9cc8e8);sc.fog=new T.Fog(0x9cc8e8,30,80);try{const pm=new T.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 sc.add(new T.HemisphereLight(0xffffff,0x4a6a7a,.6));const sun=new T.DirectionalLight(0xfff0d0,2.3);sun.position.set(8,14,6);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-14,right:14,top:14,bottom:-10});sc.add(sun);
 const cam=new T.PerspectiveCamera(42,1,.05,120);const CAM0={p:new T.Vector3(0,6.2,11.5),l:new T.Vector3(0,1.4,-1)};cam.position.copy(CAM0.p);cam.lookAt(CAM0.l);
 title(ui.top,'해외 조달 시장','주문 규격을 읽고, 상자에서 후보를 꺼내 돌려 보며 맞는 걸 실어요');
 const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.85},o));
 const cv=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'));const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t};
 /* 바다, 부두 */const sea=new T.Mesh(new T.PlaneGeometry(200,200),M(0x2a6a98,{roughness:.2,metalness:.1}));sea.rotation.x=-Math.PI/2;sea.position.y=-.4;sc.add(sea);
 const pier=new T.Mesh(new T.BoxGeometry(18,1,9),new T.MeshStandardMaterial({map:cv(512,256,q=>{q.fillStyle='#8a8478';q.fillRect(0,0,512,256);for(let y=0;y<8;y++)for(let x=0;x<12;x++){q.strokeStyle='#5a564e';q.lineWidth=3;q.strokeRect(x*44+(y%2)*22,y*32,44,32)}}),roughness:.95}));pier.position.set(0,0,2);pier.receiveShadow=true;sc.add(pier);
 /* 무역선(오른쪽 뒤) */const ship=new T.Group();{const hull=new T.Mesh(new T.BoxGeometry(3.2,1.4,9),M(0x6a3a1c));hull.position.y=.3;hull.castShadow=true;ship.add(hull);const bow=new T.Mesh(new T.ConeGeometry(1.6,2.4,4),M(0x6a3a1c));bow.rotation.x=-Math.PI/2;bow.rotation.y=Math.PI/4;bow.scale.set(1,1,.5);bow.position.set(0,.3,-5.6);ship.add(bow);const deck=new T.Mesh(new T.BoxGeometry(3,.1,8.6),M(0xb08a5a));deck.position.y=1.02;ship.add(deck);
  const mast=new T.Mesh(new T.CylinderGeometry(.12,.14,7,8),M(0x5a3a22));mast.position.set(0,4.5,-1);ship.add(mast);const sail=new T.Mesh(new T.PlaneGeometry(3.4,4.2),new T.MeshStandardMaterial({side:T.DoubleSide,map:cv(256,320,q=>{q.fillStyle='#efe4cc';q.fillRect(0,0,256,320);q.strokeStyle='#8a6a40';q.lineWidth=4;for(let y=40;y<320;y+=56){q.beginPath();q.moveTo(0,y);q.lineTo(256,y);q.stroke()}q.fillStyle='#8e2b20';q.font='bold 110px serif';q.textAlign='center';q.fillText('調',128,190)})}));sail.position.set(0,4.8,-.92);sail.rotation.y=Math.PI/2;ship.add(sail)}
 ship.position.set(7.6,-.2,-4.6);ship.rotation.y=Math.PI/2+.15;sc.add(ship);const hold=[];
 /* 기중기 */const crane=new T.Group();{const p=new T.Mesh(new T.CylinderGeometry(.18,.22,5,8),M(0x5a3a22));p.position.y=2.5;crane.add(p);const arm=new T.Mesh(new T.BoxGeometry(5.5,.22,.22),M(0x5a3a22));arm.position.set(2.5,4.9,0);crane.add(arm);const hook=new T.Mesh(new T.CylinderGeometry(.02,.02,1.6,4),M(0x2a2a2a));hook.position.set(5,4.1,0);crane.add(hook)}crane.position.set(6.6,.5,.4);crane.rotation.y=.4;sc.add(crane);
 /* 주문 깃발 셋(부두 뒤) */const flags=ORD.map((o,i)=>{const g=new T.Group();const pole=new T.Mesh(new T.CylinderGeometry(.06,.06,3.6,6),M(0x5a3a22));pole.position.y=1.8;g.add(pole);const f=new T.Mesh(new T.PlaneGeometry(2.2,1.3),new T.MeshBasicMaterial({side:T.DoubleSide,toneMapped:false,map:cv(352,208,q=>{q.fillStyle='#'+o.col.toString(16).padStart(6,'0');q.fillRect(0,0,352,208);q.fillStyle='#fff';q.font='bold 40px sans-serif';q.textAlign='center';q.fillText(o.who,176,90);q.font='30px sans-serif';q.fillText(o.want,176,150)})}));f.position.set(1.15,3,0);g.add(f);g.position.set(-6.5+i*4.6,.5,-1.6);sc.add(g);return{g,f}});
 /* 후보 물건 만들기 */const make=(kind,v)=>{const g=new T.Group();
  if(kind==='vase'){const pts=[[0,0],[.28,0],[.34,.1],[.5,.55],[.58,.95],[.5,1.25],[.26,1.42],[.16,1.5],[.2,1.62],[0,1.62]].map(([x,y])=>new T.Vector2(x,y));const m=new T.Mesh(new T.LatheGeometry(pts,40),M(v==='yellow'?0xb4ae6a:0x86b49e,{roughness:.22}));m.castShadow=true;g.add(m);
   if(v==='crack'){const cm=M(0x1a2620);let y=.4,a=.5;for(let k=0;k<7;k++){const s=new T.Mesh(new T.BoxGeometry(.03,.2,.03),cm);const r=.52+Math.sin(y*2)*.06;s.position.set(Math.sin(a)*r,y,Math.cos(a)*r);s.rotation.z=(k%2?.5:-.4);g.add(s);y+=.13;a+=.12}}g.scale.setScalar(.95)}
  else if(kind==='box'){const b=new T.Mesh(new T.BoxGeometry(1.2,.6,.8),M(v==='patch'?0x2a1a12:0x141010,{roughness:.25}));b.position.y=.3;b.castShadow=true;g.add(b);
   if(v==='patch')for(let k=0;k<6;k++){const p=new T.Mesh(new T.PlaneGeometry(.3+Math.random()*.2,.18),M(0x6a3a1c,{roughness:.8}));p.position.set(-.4+k*.17,.15+(k%3)*.15,.402);g.add(p)}
   const pm=M(0xe8f0ff,{roughness:.2,emissive:0x8090a8,emissiveIntensity:.35});for(let i=0;i<7;i++)for(let j=0;j<3;j++){if(v==='sparse'&&(i*3+j)%3===1)continue;const d=new T.Mesh(new T.CircleGeometry(.055,6),pm);d.position.set(-.45+i*.15,.16+j*.15,.402);g.add(d);const d2=d.clone();d2.rotation.x=-Math.PI/2;d2.position.set(-.45+i*.15,.602,-.25+j*.25);g.add(d2)}}
  else{const bowl=new T.Mesh(new T.SphereGeometry(.6,32,16,0,Math.PI*2,Math.PI/2,Math.PI/2),M(0xb08a40,{metalness:.7,roughness:.35,side:T.DoubleSide}));bowl.position.y=.65;g.add(bowl);for(let k=0;k<4;k++){const l=new T.Mesh(new T.CylinderGeometry(.04,.05,.5,6),M(0x8a6a30,{metalness:.6}));l.position.set(Math.cos(k*Math.PI/2)*.4,.25,Math.sin(k*Math.PI/2)*.4);g.add(l)}
   const gn=new T.Mesh(new T.CylinderGeometry(.018,.018,.75,6),M(0x2a2a2a,{metalness:.8}));gn.position.y=.375;const piv=new T.Group();piv.add(gn);piv.position.set(0,.2,0);piv.rotation.x=-(90-v)*Math.PI/180;g.add(piv);
   /* 각도 눈금판 */const arc=new T.Mesh(new T.PlaneGeometry(.9,.9),new T.MeshBasicMaterial({transparent:true,side:T.DoubleSide,toneMapped:false,map:cv(256,256,q=>{q.strokeStyle='#fff';q.lineWidth=4;q.beginPath();q.arc(128,128,110,Math.PI,Math.PI*1.5);q.stroke();for(const d of[30,40,50,60]){const a=Math.PI+d*Math.PI/180;q.beginPath();q.moveTo(128+Math.cos(a)*96,128+Math.sin(a)*96);q.lineTo(128+Math.cos(a)*118,128+Math.sin(a)*118);q.stroke();q.fillStyle='#fff';q.font='bold 20px sans-serif';q.fillText(d+'°',128+Math.cos(a)*70-12,128+Math.sin(a)*70+6)}})}));arc.rotation.y=Math.PI/2;arc.position.set(.02,.2,0);g.add(arc)}
  return g};
 /* 상자(앞 부두) */const crates=[];for(let i=0;i<3;i++){const c=new T.Mesh(new T.BoxGeometry(1.5,.9,1.2),new T.MeshStandardMaterial({map:cv(128,96,q=>{q.fillStyle='#b08a5a';q.fillRect(0,0,128,96);q.strokeStyle='#6a4a2c';q.lineWidth=5;for(let y=0;y<96;y+=24){q.beginPath();q.moveTo(0,y);q.lineTo(128,y);q.stroke()}q.fillStyle='#3a2a1a';q.font='bold 34px sans-serif';q.textAlign='center';q.fillText('ㄱㄴㄷ'[i],64,60)})}));c.position.set(-3.2+i*3.2,.95,3.4);c.castShadow=true;sc.add(c);crates.push(c)}
 const table=new T.Mesh(new T.CylinderGeometry(.9,.9,.12,24),M(0x7a5634));table.position.set(0,2.4,6.2);sc.add(table);table.visible=false;
 /* UI */const bar=document.createElement('div');bar.style.cssText='position:absolute;left:50%;bottom:14px;transform:translateX(-50%);z-index:3;display:flex;flex-direction:column;align-items:center;gap:8px;max-width:min(860px,96vw)';ui.o.append(bar);
 const msg=document.createElement('div');msg.style.cssText='padding:8px 14px;border-radius:12px;background:rgba(243,234,214,.96);border:2px solid #d8a838;font:15px/1.6 "Gowun Dodum",sans-serif;color:#2b1d12;text-align:center';const row=document.createElement('div');row.style.cssText='display:flex;gap:8px;flex-wrap:wrap;justify-content:center';bar.append(msg,row);
 const BTN="font:16px 'Do Hyeon',sans-serif;padding:8px 14px;border-radius:12px;border:2px solid #d8a838;background:#3b2a1c;color:#f2d27a;cursor:pointer";
 const say=(t,bad)=>{msg.style.borderColor=bad?'#b8322a':'#d8a838';msg.innerHTML=t};
 let oi=0,items=[],look=null,miss=0,busy=false,done=false,lift=null;const camT={p:CAM0.p.clone(),l:CAM0.l.clone()};
 const setOrder=()=>{const o=ORD[oi];items.forEach(it=>sc.remove(it.g));items=o.cands.map((c,i)=>{const g=make(o.kind,c.v);g.position.copy(crates[i].position).setY(1.4);g.scale.multiplyScalar(.8);sc.add(g);return{g,c,i,home:g.position.clone()}});flags.forEach((f,i)=>f.g.scale.setScalar(i===oi?1.15:.9));
  say(`<b>${o.who}</b>의 주문 · ${o.want}<br>규격: <b>${o.spec}</b><br>상자 위 후보를 눌러 들어 올려 돌려 봐요.`);row.innerHTML='';blip(ac,out,500,620,.08,.06,'triangle')};
 const inspect=it=>{if(busy||done)return;if(look&&look!==it)back(look);look=it;E.SND.paper();lift={it,t:0,from:it.g.position.clone(),to:new T.Vector3(0,2.55,6.2)};table.visible=true;camT.p.set(0,3.75,10.6);camT.l.set(0,2.85,6.2);
  const o=ORD[oi];row.innerHTML=`<button type="button" data-load style="${BTN};background:#2f6a4a;color:#fff">이걸로 싣기</button><button type="button" data-back style="${BTN}">내려놓기</button>`;row.querySelector('[data-load]').onclick=()=>load(it);row.querySelector('[data-back]').onclick=()=>{back(it);look=null;row.innerHTML='';camT.p.copy(CAM0.p);camT.l.copy(CAM0.l);table.visible=false};
  say(`후보 ${'ㄱㄴㄷ'[it.i]} · 마우스로 끌어 돌려 보며 규격(<b>${o.spec}</b>)에 맞는지 살펴요.`)};
 const back=it=>{lift={it,t:0,from:it.g.position.clone(),to:it.home.clone()}};
 const load=it=>{if(busy)return;const o=ORD[oi];if(it.c.why){miss++;blip(ac,out,200,140,.14,.1,'square');say(`${it.c.why} 다시 골라요.`,true);return}
  busy=true;E.SND.coin();say(`<b>${o.who}</b>에 맞는 물건이에요! 기중기로 배에 실어요.`);row.innerHTML='';camT.p.copy(CAM0.p);camT.l.copy(CAM0.l);table.visible=false;
  const hp=new T.Vector3(ship.position.x-2+hold.length*1.6,1.6,ship.position.z+.2);lift={it,t:0,from:it.g.position.clone(),to:hp,arc:3.2,dur:1.6,after:()=>{hold.push(it);items=items.filter(x=>x!==it);look=null;busy=false;oi++;if(oi<ORD.length)setTimeout(setOrder,500);else finish()}}};
 const finish=()=>{done=true;const stars=miss===0?3:miss<=2?2:1;const coins=8+stars*6;E.ST.coins+=coins;E.ST.cards=E.ST.cards||{};E.ST.cards.export=1;E.ST.export=Math.max(E.ST.export||0,stars);E.save();E.hudDraw();E.SND.fan();
  for(const it of items)sc.remove(it.g);items=[];setTimeout(()=>{ship.userData.sail=1;blip(ac,out,110,100,.9,.2,'sine')},600);
  say(`<b>배가 떠나요! ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</b> 잘못 고른 횟수 ${miss} · 수고비 ${coins}냥.<br>조달청은 우리 중소기업의 좋은 물건이 <b>다른 나라 정부 조달 시장</b>에도 나갈 수 있게 길을 열어 줘요. 나라 밖에서도 규격을 꼼꼼히 지켜야 믿고 사요. 「해외 조달 시장」 카드가 열렸어요.`);
  row.innerHTML=`<button type="button" data-x style="${BTN};background:#8e2b20;color:#fff4dc">마치기</button>`;row.querySelector('[data-x]').onclick=close};
 /* 마우스: 누르면 후보 고르기, 끌면 돌리기 */const ray=new T.Raycaster(),mv=new T.Vector2();let drag=null;
 const pickAt=e=>{const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,cam);const h=ray.intersectObjects(items.map(i=>i.g),true)[0];if(!h)return null;return items.find(i=>{let o=h.object;while(o){if(o===i.g)return true;o=o.parent}return false})};
 R.domElement.addEventListener('pointerdown',e=>{const it=pickAt(e);if(it&&it!==look){inspect(it);return}drag={x:e.clientX,y:e.clientY}});addEventListener('pointerup',()=>{drag=null});
 R.domElement.addEventListener('pointermove',e=>{if(drag&&look&&!lift){look.g.rotation.y+=(e.clientX-drag.x)*.012;look.g.rotation.x=Math.max(-.6,Math.min(.6,look.g.rotation.x+(e.clientY-drag.y)*.008));drag={x:e.clientX,y:e.clientY}}R.domElement.style.cursor=pickAt(e)?'pointer':(look?'grab':'default')});
 let last=performance.now();const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  if(lift){lift.t=Math.min(1,lift.t+dt/(lift.dur||.6));const k=lift.t*lift.t*(3-2*lift.t);lift.it.g.position.lerpVectors(lift.from,lift.to,k);lift.it.g.position.y+=Math.sin(lift.t*Math.PI)*(lift.arc||.6);if(lift.arc)crane.rotation.y=-k*1.1;if(lift.t>=1){const f=lift.after;if(lift.to.y<2){lift.it.g.rotation.set(0,0,0)}lift=null;f&&f()}}
  else if(look&&!drag)look.g.rotation.y+=dt*.5;
  if(!lift)crane.rotation.y+=(.4-crane.rotation.y)*Math.min(1,dt*3);
  cam.position.lerp(camT.p,Math.min(1,dt*3));const want=camT.l.clone();cam.userData.l=(cam.userData.l||CAM0.l.clone()).lerp(want,Math.min(1,dt*3));cam.lookAt(cam.userData.l);
  ship.position.y=-.2+Math.sin(now/900)*.06;ship.rotation.z=Math.sin(now/1100)*.02;if(ship.userData.sail){ship.position.z-=dt*2.4;ship.position.x+=dt*.8;for(const h of hold){h.g.position.z-=dt*2.4;h.g.position.x+=dt*.8}}
  for(const f of flags)f.f.rotation.y=Math.sin(now/500+f.g.position.x)*.15;
  R.render(sc,cam);requestAnimationFrame(loop)};setOrder();loop();
 const close=()=>{if(!alive)return;alive=false;try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 window.__EXP={state:()=>({oi,miss,done,look:look&&look.c.v,items:items.map(i=>i.c.v)}),inspect:i=>inspect(items.find(x=>x.i===i)),load:()=>look&&load(look),
  scr:i=>{const it=items.find(x=>x.i===i);const v=it.g.position.clone();v.y+=.5;v.project(cam);const r=R.domElement.getBoundingClientRect();return[r.left+(v.x+1)/2*r.width,r.top+(1-v.y)/2*r.height]},good:()=>ORD[oi]&&ORD[oi].cands.findIndex(c=>!c.why),close};
 return{close}}
