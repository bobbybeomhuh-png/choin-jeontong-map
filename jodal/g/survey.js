/* 무이 나라 조달청: 「공방 현장 실사」(G29, 직접생산 확인). 만든 날 2026-11-17
   관아 창 「현장 실사」 단추로 연다. 조달 업체로 등록하려는 공방 셋(놋쇠·그릇·옻칠)을 차례로, 3D 한옥 공방 안을 WASD로 걸으며
   단서 넷(금빛 고리)을 E로 살펴 「직접 만든 증거」 또는 「수상해요」를 고르고, 마지막에 「등록」 또는 「반려」를 정한다.
   불 땐 화덕·닳은 도구·만들다 만 물건·쌓인 원재료는 직접 만든 증거, 남의 상회 완제품 상자·포장도 안 뜯은 새 도구·불 땐 적 없는 가마는 수상.
   다 하면 별·엽전, 「직접생산 확인」 카드. runSurvey(ctx,{ST,save,hudDraw,SND}) · window.__SURV */
import * as T from 'three';
import {setupPost} from './post.js';
import {addWorkroom} from './sites/workroom.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {overlay,title,blip,softOut} from './sites/minigames.js';
const CL={
 forge:{n:'화덕',sus:0,see:'화덕 안에 숯불이 빨갛게 살아 있고, 둘레에 쇠 부스러기가 떨어져 있어요.',why:'오늘도 불을 피워 쇠를 달군 흔적이에요. 여기서 직접 만든다는 증거예요.'},
 tools:{n:'도구 걸이',sus:0,see:'망치와 정의 손잡이가 손때로 반질반질하고 날 끝이 닳아 있어요.',why:'오래 써서 닳은 도구는 이 공방에서 늘 일한다는 증거예요.'},
 half:{n:'작업대',sus:0,see:'작업대 위에 반쯤 만든 물건과 깎아 낸 부스러기가 그대로 있어요.',why:'만들다 만 물건은 바로 여기서 만들고 있다는 가장 좋은 증거예요.'},
 mats:{n:'원재료 더미',sus:0,see:'아직 다듬지 않은 원재료가 쌓여 있고, 들여온 날짜가 적힌 장부가 함께 있어요.',why:'완제품이 아니라 원재료를 사 들인다는 건 직접 만든다는 뜻이에요.'},
 lacq:{n:'칠 말리는 시렁',sus:0,see:'옻칠한 판들이 시렁에 걸려 마르고 있고, 칠 붓이 옻에 젖어 있어요.',why:'칠을 말리는 중이니 직접 칠하고 있다는 증거예요.'},
 boxes:{n:'완제품 상자',sus:1,see:'「△△ 상회 완제품」 도장이 찍힌 상자가 천장까지 쌓여 있어요.',why:'다른 상회가 만든 완제품을 사다가 이름만 바꿔 납품하려는 것 같아요. 수상해요.'},
 newt:{n:'새 도구',sus:1,see:'도구가 포장 끈도 안 풀린 채 새것 그대로예요. 흠집 하나 없어요.',why:'한 번도 쓰지 않은 도구로는 물건을 만들 수 없어요. 수상해요.'},
 cold:{n:'가마',sus:1,see:'가마 안이 깨끗하고 차가워요. 그을음도 없고 거미줄까지 쳐져 있어요.',why:'불을 땐 적 없는 가마예요. 그릇을 여기서 굽지 않는다는 뜻이에요. 수상해요.'}};
const ROUNDS=[{n:'놋쇠 경첩 공방',who:'metal',real:1,mat:0xb87333,clues:['forge','tools','half','mats']},
 {n:'급식 그릇 공방',who:'ceramic',real:0,mat:0x8a6a4a,clues:['cold','boxes','mats','newt']},
 {n:'옻칠 책상 공방',who:'painter',real:1,mat:0x5a2a1a,clues:['lacq','tools','half','mats']}];
const SPOT=[[-3.6,-2.6,.75],[3.6,-2.6,-.75],[-3.8,2.4,2.2],[3.8,2.4,-2.2]];
export function runSurvey(ctx,E){const ui=overlay('#120c08');let alive=true;ui.c.style.display='none';const ac=ctx.ac(),out=softOut(ctx);
 const R=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.shadowMap.enabled=true;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new T.Scene();try{setupPost(R,sc)}catch(e){console.warn('후처리',e)}sc.background=new T.Color(0x1a120c);try{const pm=new T.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 sc.add(new T.HemisphereLight(0xfff2dc,0x4a3a2a,.9));const sun=new T.DirectionalLight(0xffe8c8,1.6);sun.position.set(-4,9,5);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-8,right:8,top:8,bottom:-8});sc.add(sun);
 try{addWorkroom(sc,{floorY:0,RAD:7.2,H:4.2})}catch(e){console.warn('공방 방',e)}
 const cam=new T.PerspectiveCamera(52,1,.05,60);
 title(ui.top,'공방 현장 실사','WASD로 걷기 · 금빛 고리에서 E로 살피기 · 정말 이 공방에서 직접 만드는지 가려요');
 const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.85},o));
 const cv=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'));const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t};
 /* 단서 모형 */const prop=(k,rd)=>{const g=new T.Group();const add=(m,x,y,z)=>{m.position.set(x,y,z);m.castShadow=true;g.add(m);return m};
  if(k==='forge'){add(new T.Mesh(new T.BoxGeometry(1.2,.8,1),M(0x6a6460)),0,.4,0);for(let i=0;i<9;i++)add(new T.Mesh(new T.SphereGeometry(.09,8,6),M(0x2a1a10,{emissive:0xff5a10,emissiveIntensity:1.2+Math.random()})),-.35+(i%3)*.35,.84,-.25+Math.floor(i/3)*.25);add(new T.Mesh(new T.CylinderGeometry(.18,.24,1.6,10),M(0x4a4440)),0,1.6,-.35);for(let i=0;i<6;i++)add(new T.Mesh(new T.BoxGeometry(.06,.02,.04),M(0x8a8a90,{metalness:.8})),-.6+Math.random()*1.2,.02,.6+Math.random()*.3)}
  else if(k==='tools'||k==='newt'){add(new T.Mesh(new T.BoxGeometry(1.6,1.1,.08),M(0x6a4a2c)),0,1.3,-.3);for(let i=0;i<4;i++){const hd=add(new T.Mesh(new T.CylinderGeometry(.03,.035,.6,6),M(k==='tools'?0x5a3a1a:0xd8c4a0,{roughness:k==='tools'?.35:.9})),-.55+i*.37,1.2,-.22);const he=add(new T.Mesh(new T.BoxGeometry(.2,.09,.09),M(k==='tools'?0x5a5a60:0xc8ccd4,{metalness:.8,roughness:k==='tools'?.6:.15})),-.55+i*.37,1.5,-.22);if(k==='newt'){const wr=add(new T.Mesh(new T.BoxGeometry(.16,.5,.12),M(0xf4ecd8)),-.55+i*.37,1.22,-.2);add(new T.Mesh(new T.BoxGeometry(.17,.03,.13),M(0xb8322a)),-.55+i*.37,1.3,-.2)}}
   add(new T.Mesh(new T.BoxGeometry(1.4,.6,.6),M(0x7a5634)),0,.3,0)}
  else if(k==='half'){add(new T.Mesh(new T.BoxGeometry(1.8,.75,.9),M(0x7a5634)),0,.375,0);if(rd.who==='metal'){for(let i=0;i<3;i++)add(new T.Mesh(new T.BoxGeometry(.28,.02,.38),M(i<2?0xc8a040:0x8a7050,{metalness:.8,roughness:.35})),-.45+i*.42,.77,0)}else{const b=add(new T.Mesh(new T.BoxGeometry(1,.08,.6),M(0xc8a070)),0,.79,0);add(new T.Mesh(new T.BoxGeometry(.5,.085,.6),M(0x3a1410,{roughness:.2})),-.25,.795,0)}for(let i=0;i<14;i++){const s=add(new T.Mesh(new T.BoxGeometry(.08,.01,.03),M(0xd8b880)),-.9+Math.random()*1.8,.01,.5+Math.random()*.4);s.rotation.y=Math.random()*3}}
  else if(k==='mats'){if(rd.who==='metal'){for(let i=0;i<9;i++)add(new T.Mesh(new T.BoxGeometry(.4,.14,.2),M(0xb87333,{metalness:.7,roughness:.45})),-.45+(i%3)*.45,.07+Math.floor(i/3)*.15,0)}else if(rd.who==='ceramic'){for(let i=0;i<6;i++){const s=add(new T.Mesh(new T.SphereGeometry(.24,12,8),M(0x9a7a5a,{roughness:1})),-.5+(i%3)*.5,.2+Math.floor(i/3)*.3,0);s.scale.y=.7}}else{for(let i=0;i<3;i++)add(new T.Mesh(new T.CylinderGeometry(.26,.26,.6,14),M(0x3a2414,{roughness:.6})),-.6+i*.6,.3,0)}
   const led=add(new T.Mesh(new T.BoxGeometry(.32,.04,.42),M(0xf0e4c4)),.9,.02,.35);led.rotation.y=.4}
  else if(k==='lacq'){for(const x of[-.7,.7])add(new T.Mesh(new T.CylinderGeometry(.05,.05,2,6),M(0x5a3a22)),x,1,0);for(let i=0;i<3;i++)add(new T.Mesh(new T.CylinderGeometry(.03,.03,1.5,6),M(0x5a3a22)),0,.6+i*.55,0).rotation.z=Math.PI/2;for(let i=0;i<3;i++)add(new T.Mesh(new T.BoxGeometry(1.1,.42,.03),M(i%2?0x3a1410:0x6a1a10,{roughness:.12})),0,.4+i*.55,.05)}
  else if(k==='boxes'){const lab=cv(256,160,q=>{q.fillStyle='#c8a868';q.fillRect(0,0,256,160);q.strokeStyle='#5a3a1a';q.lineWidth=6;q.strokeRect(3,3,250,154);q.fillStyle='#b8322a';q.font='bold 34px sans-serif';q.textAlign='center';q.fillText('△△ 상회',128,68);q.fillStyle='#3b2a1c';q.font='bold 30px sans-serif';q.fillText('완제품',128,116)});const mb=[M(0xc8a868),M(0xc8a868),M(0xc8a868),M(0xc8a868),new T.MeshStandardMaterial({map:lab,roughness:.9}),M(0xc8a868)];for(let i=0;i<9;i++)add(new T.Mesh(new T.BoxGeometry(.62,.5,.5),mb),-.66+(i%3)*.66,.25+Math.floor(i/3)*.52,0)}
  else if(k==='cold'){const d=add(new T.Mesh(new T.SphereGeometry(1,22,12,0,Math.PI*2,0,Math.PI/2),M(0xc8bcaa,{roughness:1})),0,0,0);d.scale.set(1,.9,1.2);add(new T.Mesh(new T.CircleGeometry(.36,16,0,Math.PI),M(0x8a7e6e,{side:T.DoubleSide})),0,0,1.17);for(let i=0;i<3;i++){const w=add(new T.Mesh(new T.TorusGeometry(.12+i*.1,.004,4,24),new T.MeshBasicMaterial({color:0xf4f4f4,transparent:true,opacity:.7})),.45,.55,1.0)}}
  return g};
 let RD=0,round=null,me=null,near=null,talking=null,phase='walk',score=0,total=0,verdicts=[];
 const props=new T.Group();sc.add(props);const rings=[];
 const H=window.__H3;let owner=null;
 const hud=document.createElement('div');hud.style.cssText='position:absolute;left:16px;top:70px;z-index:3;padding:10px 14px;border-radius:12px;background:rgba(20,14,10,.78);color:#f2d27a;font:16px "Do Hyeon",sans-serif;line-height:1.7';ui.o.append(hud);
 const msg=document.createElement('div');msg.style.cssText='position:absolute;left:50%;bottom:16px;transform:translateX(-50%);z-index:3;max-width:min(780px,94vw);padding:8px 14px;border-radius:12px;background:rgba(243,234,214,.97);border:2px solid #d8a838;font:15px/1.6 "Gowun Dodum",sans-serif;color:#2b1d12;text-align:center';ui.o.append(msg);
 const say=(t,bad)=>{msg.style.borderColor=bad?'#b8322a':'#d8a838';msg.innerHTML=t};
 const BTN="font:16px 'Do Hyeon',sans-serif;padding:8px 14px;border-radius:12px;border:0;cursor:pointer";
 const load=i=>{RD=i;round=ROUNDS[i];props.clear();rings.length=0;phase='walk';talking=null;near=null;
  round.clues.forEach((k,j)=>{const[x,z,ry]=SPOT[j];const g=prop(k,round);g.position.set(x,0,z);g.rotation.y=ry;props.add(g);const ring=new T.Mesh(new T.RingGeometry(.75,.95,32),new T.MeshBasicMaterial({color:0xffe08a,transparent:true,opacity:.5,side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;const fw=new T.Vector3(0,0,1.7).applyAxisAngle(new T.Vector3(0,1,0),ry);ring.position.set(x+fw.x,.03,z+fw.z);props.add(ring);rings.push({k,ring,res:null,x:ring.position.x,z:ring.position.z})});
  if(owner){sc.remove(owner.root);owner=null}if(H&&H.makeMuui)H.makeMuui(round.who,1.15).then(m=>{if(!alive||ROUNDS[RD]!==round)return;owner=m;m.root.position.set(0,0,-4.4);sc.add(m.root);m.play('idle')}).catch(()=>{});
  if(me){me.root.position.set(0,0,4);me.root.rotation.y=Math.PI}
  say(`<b>${i+1}번째 공방 · ${round.n}</b><br>조달 업체로 등록해 달라는 공방이에요. 금빛 고리 넷을 돌며 정말 이 공방에서 직접 만드는지 살펴봐요.`)};
 if(H&&H.makeMuui)H.makeMuui('base',1.2).then(m=>{me=m;m.root.position.set(0,0,4);m.root.rotation.y=Math.PI;sc.add(m.root);m.play('idle')}).catch(()=>{});
 const look=r=>{talking=r;const c=CL[r.k];try{E.SND&&E.SND.paper&&E.SND.paper()}catch(e){}say(`<b>${c.n}</b><br>${c.see}<div style="margin-top:8px;display:flex;gap:8px;justify-content:center"><button type="button" data-y style="${BTN};background:#2f6a4a;color:#fff">직접 만든 증거</button><button type="button" data-n style="${BTN};background:#8e2b20;color:#fff4dc">수상해요</button></div>`);
  msg.querySelector('[data-y]').onclick=()=>mark(r,0);msg.querySelector('[data-n]').onclick=()=>mark(r,1)};
 const mark=(r,v)=>{const c=CL[r.k];r.res=v;const ok=v===c.sus;total++;if(ok)score++;r.ring.material.color.setHex(ok?0x6ad08a:0xff7a6a);r.ring.material.opacity=.7;talking=null;blip(ac,out,ok?600:220,ok?800:140,.1,.07,ok?'triangle':'square');
  say(`${ok?'<b>맞아요!</b>':'<b>다시 보면…</b>'} ${c.why}`,!ok);if(rings.every(x=>x.res!=null))setTimeout(verdict,1500)};
 const verdict=()=>{phase='verdict';const sus=rings.filter(x=>CL[x.k].sus).length;say(`<b>${round.n} 실사 끝</b> · 살핀 단서 넷 가운데 수상한 것 ${rings.filter(x=>x.res===1).length}개를 짚었어요.<br>이 공방을 조달 업체로 등록할까요?<div style="margin-top:8px;display:flex;gap:8px;justify-content:center"><button type="button" data-ok style="${BTN};background:#2f6a4a;color:#fff">등록 (직접생산 확인)</button><button type="button" data-no style="${BTN};background:#8e2b20;color:#fff4dc">반려</button></div>`);
  msg.querySelector('[data-ok]').onclick=()=>decide(1);msg.querySelector('[data-no]').onclick=()=>decide(0)};
 const decide=v=>{const ok=v===round.real;total++;if(ok)score++;verdicts.push(ok);blip(ac,out,ok?660:200,ok?880:120,.12,.08,ok?'triangle':'square');if(owner)owner.play(round.real&&v?'cheer':'idle');
  const why=round.real?'원재료를 들여 직접 만들고 있는 공방이에요.':'완제품을 사다 이름만 바꿔 납품하려던 공방이에요. 이런 곳은 등록해 주면 안 돼요.';
  say(`${ok?'<b>바른 판정!</b>':'<b>판정이 틀렸어요.</b>'} ${why}<div style="margin-top:8px"><button type="button" data-nx style="${BTN};background:#3b2a1c;color:#f2d27a">${RD<ROUNDS.length-1?'다음 공방으로':'실사 마치기'}</button></div>`,!ok);
  msg.querySelector('[data-nx]').onclick=()=>{if(RD<ROUNDS.length-1)load(RD+1);else finish()}};
 const finish=()=>{phase='done';const stars=score===total?3:score>=total-3?2:1;const coins=6+stars*7;E.ST.coins+=coins;E.ST.cards=E.ST.cards||{};E.ST.cards.direct=1;E.ST.survey=Math.max(E.ST.survey||0,stars);try{E.save&&E.save();E.hudDraw&&E.hudDraw();E.SND&&E.SND.fan&&E.SND.fan()}catch(e){}
  say(`<b>현장 실사 끝! ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</b> 판단 ${total}번 가운데 ${score}번 맞혔어요 · 엽전 ${coins}냥.<br>중소기업끼리 경쟁하는 물품은 <b>직접 만드는 중소기업</b>만 공공기관에 납품할 수 있어요. 그래서 공장에 가서 정말 직접 만드는지 살펴봐요(직접생산 확인). 「직접생산 확인」 카드가 열렸어요.<div style="margin-top:8px"><button type="button" data-x style="${BTN};background:#8e2b20;color:#fff4dc">마치기</button></div>`);msg.querySelector('[data-x]').onclick=close};
 const key={};const kd=e=>{if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)){key[e.code]=true;e.preventDefault()}if(e.code==='KeyE'&&near&&!talking&&phase==='walk')look(near)},ku=e=>{key[e.code]=false};addEventListener('keydown',kd);addEventListener('keyup',ku);
 load(0);
 const camPos=new T.Vector3(0,5.5,9);let last=performance.now();const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  for(const g of rings)if(g.res==null)g.ring.material.opacity=.35+.25*Math.sin(now/300);if(owner)owner.mx.update(dt);
  if(me){me.mx.update(dt);const p=me.root.position;if(!talking&&phase==='walk'){const f=(key.KeyW||key.ArrowUp?1:0)-(key.KeyS||key.ArrowDown?1:0),s=(key.KeyD||key.ArrowRight?1:0)-(key.KeyA||key.ArrowLeft?1:0);
    if(f||s){const v=new T.Vector3(s,0,-f).normalize().multiplyScalar(3.4*dt);p.add(v);const d=Math.hypot(p.x,p.z);if(d>5.6){p.x*=5.6/d;p.z*=5.6/d}for(const g of props.children){if(!g.isGroup)continue;const dd=Math.hypot(p.x-g.position.x,p.z-g.position.z);if(dd<1.25){p.x=g.position.x+(p.x-g.position.x)/dd*1.25;p.z=g.position.z+(p.z-g.position.z)/dd*1.25}}me.root.rotation.y=Math.atan2(v.x,v.z);me.play('walk')}else me.play('idle')}
   near=null;for(const g of rings){if(g.res!=null)continue;if(Math.hypot(p.x-g.x,p.z-g.z)<1.1)near=g}
   if(near&&!talking&&phase==='walk'&&!msg.querySelector('[data-look]'))say(`<b>${CL[near.k].n}</b>이 보여요. <button type="button" data-look style="${BTN};background:#3b2a1c;color:#f2d27a">E 살피기</button>`),msg.querySelector('[data-look]').onclick=()=>look(near);
   const tgt=new T.Vector3(p.x*.55,p.y+4.6,p.z*.55+4.2);const dd=Math.hypot(tgt.x,tgt.z);if(dd>6.4){tgt.x*=6.4/dd;tgt.z*=6.4/dd}camPos.lerp(tgt,Math.min(1,dt*3));cam.position.copy(camPos);cam.lookAt(p.x,p.y+.7,p.z-1)}
  hud.innerHTML=`공방 ${RD+1} / ${ROUNDS.length} · 살핀 단서 ${rings.filter(x=>x.res!=null).length} / 4<br>맞힌 판단 ${score}`;
  R.render(sc,cam);requestAnimationFrame(loop)};loop();
 const close=()=>{if(!alive)return;alive=false;removeEventListener('keydown',kd);removeEventListener('keyup',ku);try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 window.__SURV={state:()=>({rd:RD,phase,score,total,me:me&&[me.root.position.x,me.root.position.z],near:near&&near.k,talking:talking&&talking.k,rings:rings.map(g=>({k:g.k,sus:CL[g.k].sus,res:g.res,x:g.x,z:g.z})),real:round.real,ready:!!me&&!!owner}),key,close};
 return{close}}
