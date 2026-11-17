/* 무이 나라 조달청: 「서당 설계 공모 심사」(G39, 공공 건축 설계 공모). 만든 날 2026-11-17
   관아 창 「설계 공모」 단추로 연다. 심사장 받침대 셋 위에 서당 설계안 모형(갑·을·병)이 있고, 오른쪽(남쪽)에 해가 떠 있다.
   끌기 또는 A·D로 모형을 함께 돌려 보며, 모형을 눌러 기준 셋(남쪽 해 드는 큰 창 / 아이가 오르기 쉬운 낮은 계단 / 공사비 100냥 안)을 예·아니오로 매긴 뒤
   당선작을 고른다. 갑=다 맞음(당선), 을=창이 북쪽, 병=계단 높고 예산 넘음. 다 하면 별·엽전, 「설계 공모」 카드.
   runDesign(ctx,{ST,save,hudDraw,SND}) · window.__DSN */
import * as T from 'three';
import {setupPost} from './post.js';
import {hallBack} from './sites/dress.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {startAmb} from './amb.js';
import {overlay,title,blip,softOut} from './sites/minigames.js';
const DS=[{k:'a',n:'갑',cost:92,south:1,low:1,col:0xece4d2},{k:'b',n:'을',cost:84,south:0,low:1,col:0xe8dcc8},{k:'c',n:'병',cost:128,south:1,low:0,col:0xf0e6d4}];
const CR=[['south','해 드는 남쪽에 큰 창이 있나요?'],['low','아이가 오르기 쉬운 낮은 계단인가요?'],['cost','공사비가 예산 100냥 안인가요?']];
const truth=(d,c)=>c==='cost'?(d.cost<=100?1:0):d[c];
export function runDesign(ctx,E){const ui=overlay('#120c08');let alive=true;ui.c.style.display='none';const ac=ctx.ac(),out=softOut(ctx);const stopAmb=startAmb(ctx,'hall');
 const R=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.shadowMap.enabled=true;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none;cursor:pointer';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new T.Scene();try{setupPost(R,sc)}catch(e){}sc.background=new T.Color(0x1c140e);try{const pm=new T.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 sc.add(new T.HemisphereLight(0xfff0d8,0x3a2a1a,.7));const sun=new T.DirectionalLight(0xffe8b0,2.2);sun.position.set(12,9,2);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-10,right:10,top:10,bottom:-10});sc.add(sun);
 const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.75},o));
 const cv=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'));const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t};
 const fl=new T.Mesh(new T.PlaneGeometry(34,30),M(0x7a5a3a));fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;sc.add(fl);try{hallBack(sc,{z:-5,w:30,h:8,y0:0})}catch(e){}
 /* 해(남쪽) 표지 */{const s=new T.Mesh(new T.CircleGeometry(.8,32),new T.MeshBasicMaterial({color:0xffc840,toneMapped:false}));s.position.set(7.2,4.6,-1);s.rotation.y=-.5;sc.add(s);for(let k=0;k<12;k++){const r=new T.Mesh(new T.BoxGeometry(.08,.5,.02),s.material);const a=k/12*Math.PI*2;r.position.set(7.2+Math.cos(a)*1.15*Math.cos(.5),4.6+Math.sin(a)*1.15,-1+Math.cos(a)*1.15*Math.sin(.5));r.rotation.set(0,-.5,a-Math.PI/2);sc.add(r)}
  const lb=new T.Mesh(new T.PlaneGeometry(2,.5),new T.MeshBasicMaterial({toneMapped:false,map:cv(320,80,q=>{q.fillStyle='#8e2b20';q.fillRect(0,0,320,80);q.fillStyle='#fff4dc';q.font='bold 42px sans-serif';q.textAlign='center';q.fillText('남쪽 · 해',160,56)})}));lb.position.set(7.2,3.1,-1);lb.rotation.y=-.5;sc.add(lb)}
 const cam=new T.PerspectiveCamera(44,1,.05,80);cam.position.set(0,6.4,10.6);cam.lookAt(0,1.6,0);
 title(ui.top,'서당 설계 공모 심사','끌기·A·D로 모형 돌려 보기 · 모형을 눌러 기준 셋을 매기고 당선작을 골라요');
 /* 설계안 모형: 기단(높이), 계단(단수), 몸채, 창(남쪽 +x 또는 북쪽 -x), 기와지붕 */const build=d=>{const g=new T.Group();const baseH=d.low?.25:.9;const base=new T.Mesh(new T.BoxGeometry(2.6,baseH,1.8),M(0x9a948a));base.position.y=baseH/2;base.castShadow=true;g.add(base);
  const steps=d.low?2:6;for(let i=0;i<steps;i++){const st=new T.Mesh(new T.BoxGeometry(.7,baseH/steps,.22),M(0x8a847a));st.position.set(0,(i+.5)*baseH/steps,.9+.22*(steps-i)-.11);g.add(st)}
  const body=new T.Mesh(new T.BoxGeometry(2.2,1,1.4),M(d.col));body.position.y=baseH+.5;body.castShadow=true;g.add(body);for(const x of[-1.05,1.05])for(const z of[-.65,.65]){const p=new T.Mesh(new T.CylinderGeometry(.06,.06,1,8),M(0x8a2a1a));p.position.set(x,baseH+.5,z);g.add(p)}
  const wx=d.south?1.11:-1.11;const win=new T.Mesh(new T.PlaneGeometry(1.1,.6),new T.MeshStandardMaterial({map:cv(110,60,q=>{q.fillStyle='#f6ecd2';q.fillRect(0,0,110,60);q.strokeStyle='#6a4a2a';q.lineWidth=3;for(let x=0;x<=110;x+=18){q.beginPath();q.moveTo(x,0);q.lineTo(x,60);q.stroke()}for(let y=0;y<=60;y+=15){q.beginPath();q.moveTo(0,y);q.lineTo(110,y);q.stroke()}}),roughness:.8}));win.position.set(wx,baseH+.55,0);win.rotation.y=wx>0?Math.PI/2:-Math.PI/2;g.add(win);
  const sm=new T.Mesh(new T.PlaneGeometry(.35,.3),M(0xd8c8a8));sm.position.set(-wx*.995,baseH+.6,0);sm.rotation.y=wx>0?-Math.PI/2:Math.PI/2;g.add(sm);
  const rf=new T.Mesh(new T.ConeGeometry(1.85,.8,4),M(0x3a3a3e));rf.rotation.y=Math.PI/4;rf.scale.set(1.15,1,.85);rf.position.y=baseH+1.4;rf.castShadow=true;g.add(rf);return g};
 const pods=DS.map((d,i)=>{const g=new T.Group();g.position.set(-5.2+i*5.2,0,-.6);sc.add(g);const p=new T.Mesh(new T.CylinderGeometry(1.9,2,.6,32),M(0x5a3a22));p.position.y=.3;p.receiveShadow=true;g.add(p);const turn=new T.Group();turn.position.y=.6;g.add(turn);turn.add(build(d));
  const tag=new T.Mesh(new T.PlaneGeometry(2.6,.62),new T.MeshBasicMaterial({toneMapped:false,map:cv(520,124,q=>{q.fillStyle='#fbf3dc';q.fillRect(0,0,520,124);q.strokeStyle='#3b2a1c';q.lineWidth=6;q.strokeRect(3,3,514,118);q.fillStyle='#8e2b20';q.font='bold 44px sans-serif';q.textAlign='center';q.fillText(`설계안 ${d.n}`,260,52);q.fillStyle='#2b1d12';q.font='bold 36px sans-serif';q.fillText(`공사비 ${d.cost}냥`,260,102)})}));tag.position.set(0,.3,2.05);g.add(tag);
  const ring=new T.Mesh(new T.RingGeometry(2.05,2.25,40),new T.MeshBasicMaterial({color:0xffe08a,transparent:true,opacity:0,side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.02;g.add(ring);g.traverse(o=>{if(o.isMesh)o.userData.ds=i});return{d,g,turn,ring,ans:{}}});
 const hud=document.createElement('div');hud.style.cssText='position:absolute;left:16px;top:70px;z-index:3;padding:10px 14px;border-radius:12px;background:rgba(20,14,10,.78);color:#f2d27a;font:16px "Do Hyeon",sans-serif;line-height:1.7';ui.o.append(hud);
 const bar=document.createElement('div');bar.style.cssText='position:absolute;left:50%;bottom:16px;transform:translateX(-50%);z-index:3;max-width:min(820px,94vw);padding:8px 14px;border-radius:12px;background:rgba(243,234,214,.97);border:2px solid #d8a838;font:15px/1.6 "Gowun Dodum",sans-serif;color:#2b1d12;text-align:center';ui.o.append(bar);
 const BTN="font:15px 'Do Hyeon',sans-serif;padding:6px 12px;border-radius:10px;border:0;cursor:pointer";
 const say=(h,bad)=>{bar.style.borderColor=bad?'#b8322a':'#d8a838';bar.innerHTML=h};
 let sel=null,yaw=0,phase='judge',right=0,total=0,win=null;
 say('서당을 새로 지으려고 설계 공모를 했어요. 설계안 셋의 <b>모형</b>을 돌려 보고, 하나씩 눌러 심사 기준 셋을 매겨요. 해는 오른쪽 <b>남쪽</b>에 있어요.');
 const open=i=>{if(phase!=='judge')return;sel=i;const P=pods[i];for(const p of pods)p.ring.material.opacity=p===P?.8:(Object.keys(p.ans).length===3?.4:0);try{E.SND&&E.SND.paper&&E.SND.paper()}catch(e){}
  say(`<b>설계안 ${P.d.n}</b> 심사표<div style="display:grid;grid-template-columns:1fr auto;gap:4px 10px;margin-top:6px;text-align:left">${CR.map(([c,q])=>`<span>${q}</span><span><button type="button" data-c="${c}" data-v="1" style="${BTN};background:${P.ans[c]===1?'#2f6a4a':'#fff4dc'};color:${P.ans[c]===1?'#fff':'#3b2a1c'};border:2px solid #2f6a4a">예</button> <button type="button" data-c="${c}" data-v="0" style="${BTN};background:${P.ans[c]===0?'#8e2b20':'#fff4dc'};color:${P.ans[c]===0?'#fff':'#3b2a1c'};border:2px solid #8e2b20">아니오</button></span>`).join('')}</div>`);
  bar.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{P.ans[b.dataset.c]=+b.dataset.v;open(i);if(pods.every(p=>Object.keys(p.ans).length===3))setTimeout(pickStage,600)})};
 const pickStage=()=>{if(phase!=='judge')return;phase='pick';right=0;total=0;for(const p of pods)for(const[c]of CR){total++;if(p.ans[c]===truth(p.d,c))right++}
  say(`심사표를 다 매겼어요(맞게 본 것 ${right} / ${total}). 이제 <b>당선작</b>을 골라요.<div style="margin-top:6px;display:flex;gap:8px;justify-content:center">${pods.map((p,i)=>`<button type="button" data-w="${i}" style="${BTN};background:#3b2a1c;color:#f2d27a">설계안 ${p.d.n}</button>`).join('')}</div>`);bar.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>decide(+b.dataset.w))};
 const decide=i=>{win=i;const ok=i===0;blip(ac,out,ok?660:200,ok?880:120,.12,.08,ok?'triangle':'square');pods[i].ring.material.color.setHex(ok?0x6ad08a:0xff7a6a);pods[i].ring.material.opacity=.9;
  const why=ok?'남쪽 큰 창으로 햇빛이 들고, 계단이 낮아 아이들이 오르기 쉽고, 공사비도 예산 안이에요.':i===1?'설계안 을은 값은 싸지만 큰 창이 북쪽이라 교실이 어두워요.':'설계안 병은 계단이 높아 아이들에게 위험하고 공사비가 예산을 넘어요.';
  phase='done';const stars=ok&&right===total?3:ok&&right>=total-2?2:1;const coins=6+stars*7;E.ST.coins+=coins;E.ST.cards=E.ST.cards||{};E.ST.cards.design=1;E.ST.design=Math.max(E.ST.design||0,stars);try{E.save&&E.save();E.hudDraw&&E.hudDraw();E.SND&&E.SND.fan&&E.SND.fan()}catch(e){}
  say(`${ok?'<b>당선! 설계안 갑</b>':`<b>설계안 ${pods[i].d.n}는 아쉬워요.</b>`} ${why}<br><b>설계 공모 심사 끝! ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</b> 심사표 ${right}/${total} · 엽전 ${coins}냥. 나라의 큰 건물은 설계안을 공모해 미리 정한 기준대로 심사하고 가장 알맞은 안을 골라요(설계 공모). 「설계 공모」 카드가 열렸어요.<div style="margin-top:8px"><button type="button" data-x style="${BTN};background:#8e2b20;color:#fff4dc">마치기</button></div>`,!ok);bar.querySelector('[data-x]').onclick=close};
 const ray=new T.Raycaster(),mv=new T.Vector2();let drag=null,moved=0;R.domElement.addEventListener('pointerdown',e=>{drag=e.clientX;moved=0});const pm=e=>{if(drag!=null){yaw+=(e.clientX-drag)*.008;moved+=Math.abs(e.clientX-drag);drag=e.clientX}};addEventListener('pointermove',pm);
 const pu=e=>{if(drag!=null&&moved<6&&e.target===R.domElement){const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,cam);const h=ray.intersectObjects(sc.children,true).find(x=>x.object.userData.ds!=null);if(h)open(h.object.userData.ds)}drag=null};addEventListener('pointerup',pu);
 const key={};const kd=e=>{if(['KeyA','KeyD','ArrowLeft','ArrowRight'].includes(e.code)){key[e.code]=true;e.preventDefault()}},ku=e=>{key[e.code]=false};addEventListener('keydown',kd);addEventListener('keyup',ku);
 let last=performance.now();const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  if(key.KeyA||key.ArrowLeft)yaw-=dt*1.3;if(key.KeyD||key.ArrowRight)yaw+=dt*1.3;for(const p of pods)p.turn.rotation.y=yaw;
  hud.innerHTML=`매긴 설계안 ${pods.filter(p=>Object.keys(p.ans).length===3).length} / 3`;R.render(sc,cam);requestAnimationFrame(loop)};loop();
 const close=()=>{if(!alive)return;alive=false;try{stopAmb()}catch(e){}removeEventListener('keydown',kd);removeEventListener('keyup',ku);removeEventListener('pointerup',pu);removeEventListener('pointermove',pm);try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 const scr=i=>{const v=new T.Vector3(0,1.6,0).add(pods[i].g.position).project(cam);const r=R.domElement.getBoundingClientRect();return[r.left+(v.x+1)/2*r.width,r.top+(1-v.y)/2*r.height]};
 window.__DSN={state:()=>({phase,right,total,win,ans:pods.map(p=>p.ans),truth:pods.map(p=>Object.fromEntries(CR.map(([c])=>[c,truth(p.d,c)])))}),scr,setYaw:a=>{yaw=a},close};
 return{close}}
