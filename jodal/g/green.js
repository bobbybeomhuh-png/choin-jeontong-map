/* 무이 나라 조달청: 「녹색 물건 고르기」(G42, 녹색 제품 구매). 만든 날 2026-11-17
   관아 창 「녹색 구매」 단추로 연다. 서당 비품 진열대(3D)에 물건 여섯, 저마다 붙은 표지가 다르다.
   물건을 누르면 표지를 크게 보여 준다: 진짜 환경표지(초록 둥근 인증, 인증 번호), 가짜(손으로 그린 잎·「친환경!!」·번호 없음), 표지 없음.
   진짜 표지 셋만 「사기」, 나머지는 「거르기」. 다 하면 별·엽전, 「녹색 구매」 카드. runGreen(ctx,{ST,save,hudDraw,SND}) · window.__GREEN */
import * as T from 'three';
import {setupPost} from './post.js';
import {hallBack} from './sites/dress.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {startAmb} from './amb.js';
import {overlay,title,blip,softOut} from './sites/minigames.js';
const IT=[{k:'paper',n:'재활용 한지 묶음',lab:'real',no:'제 0213호'},{k:'lamp',n:'기름 덜 먹는 등잔',lab:'fake'},{k:'ink',n:'콩기름 먹',lab:'real',no:'제 1187호'},{k:'cloth',n:'무명 책상보',lab:'none'},{k:'bucket',n:'대나무 물통',lab:'real',no:'제 0546호'},{k:'brush',n:'새 붓통',lab:'fake'}];
const labelCanvas=(it)=>{const c=document.createElement('canvas');c.width=c.height=256;const q=c.getContext('2d');q.fillStyle='#fbf3dc';q.fillRect(0,0,256,256);
 if(it.lab==='real'){q.fillStyle='#2f8a4a';q.beginPath();q.arc(128,112,84,0,7);q.fill();q.strokeStyle='#fff';q.lineWidth=6;q.beginPath();q.arc(128,112,72,0,7);q.stroke();q.fillStyle='#fff';q.beginPath();q.moveTo(128,62);q.bezierCurveTo(176,82,170,140,128,162);q.bezierCurveTo(86,140,80,82,128,62);q.fill();q.strokeStyle='#2f8a4a';q.lineWidth=4;q.beginPath();q.moveTo(128,72);q.lineTo(128,156);q.stroke();q.fillStyle='#1d5a30';q.font='bold 26px sans-serif';q.textAlign='center';q.fillText('환경표지 인증',128,222);q.font='20px sans-serif';q.fillText(it.no,128,246)}
 else if(it.lab==='fake'){q.strokeStyle='#5aa040';q.lineWidth=5;q.beginPath();q.moveTo(100,70);q.quadraticCurveTo(170,50,160,130);q.quadraticCurveTo(110,150,100,70);q.stroke();q.fillStyle='#e05a2a';q.font='bold 40px sans-serif';q.textAlign='center';q.save();q.translate(128,200);q.rotate(-.12);q.fillText('친환경!!',0,0);q.restore();q.fillStyle='#7a6a5a';q.font='18px sans-serif';q.fillText('(번호 없음)',128,240)}
 else{q.fillStyle='#7a6a5a';q.font='bold 30px sans-serif';q.textAlign='center';q.fillText('표지 없음',128,136)}return c};
export function runGreen(ctx,E){const ui=overlay('#120c08');let alive=true;ui.c.style.display='none';const ac=ctx.ac(),out=softOut(ctx);const stopAmb=startAmb(ctx,'market');
 const R=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.shadowMap.enabled=true;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none;cursor:pointer';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new T.Scene();try{setupPost(R,sc)}catch(e){}sc.background=new T.Color(0x1c140e);try{const pm=new T.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 sc.add(new T.HemisphereLight(0xfff0d8,0x3a2a1a,.85));const sun=new T.DirectionalLight(0xffe2b8,1.6);sun.position.set(3,9,7);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-8,right:8,top:8,bottom:-8});sc.add(sun);
 const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.75},o));
 const fl=new T.Mesh(new T.PlaneGeometry(30,30),M(0x7a5a3a));fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;sc.add(fl);try{hallBack(sc,{z:-4,w:24,h:7,y0:0})}catch(e){}
 /* 진열대: 두 단 나무 선반 */const shelf=new T.Group();sc.add(shelf);for(const y of[.9,2.2]){const b=new T.Mesh(new T.BoxGeometry(9,.14,1.4),M(0x6a4a2c));b.position.set(0,y,-1.4);b.castShadow=true;b.receiveShadow=true;shelf.add(b)}for(const x of[-4.4,4.4]){const p=new T.Mesh(new T.BoxGeometry(.16,3.2,1.4),M(0x5a3a22));p.position.set(x,1.6,-1.4);shelf.add(p)}
 const mk=k=>{const g=new T.Group();let m;
  if(k==='paper'){for(let i=0;i<4;i++){const s=new T.Mesh(new T.BoxGeometry(.9,.08,.6),M(0xf4ecd8));s.position.y=.04+i*.085;s.rotation.y=(i%2)*.05;g.add(s)}const st=new T.Mesh(new T.BoxGeometry(.06,.36,.62),M(0x8a6a3a));st.position.y=.18;g.add(st)}
  else if(k==='lamp'){const b=new T.Mesh(new T.CylinderGeometry(.08,.16,.5,12),M(0x8a6a4a));b.position.y=.25;g.add(b);const d=new T.Mesh(new T.CylinderGeometry(.22,.14,.1,16),M(0xc8b090));d.position.y=.55;g.add(d);const f=new T.Mesh(new T.ConeGeometry(.04,.12,8),new T.MeshBasicMaterial({color:0xffb040}));f.position.y=.66;g.add(f)}
  else if(k==='ink'){for(let i=0;i<3;i++){const s=new T.Mesh(new T.BoxGeometry(.14,.08,.5),M(0x141418,{roughness:.4}));s.position.set(-.2+i*.2,.04,0);g.add(s)}}
  else if(k==='cloth'){const s=new T.Mesh(new T.BoxGeometry(.9,.12,.55),M(0xe8e0cc,{roughness:1}));s.position.y=.06;g.add(s);const s2=new T.Mesh(new T.BoxGeometry(.9,.1,.55),M(0x9ab4c8,{roughness:1}));s2.position.y=.17;g.add(s2)}
  else if(k==='bucket'){const b=new T.Mesh(new T.CylinderGeometry(.24,.22,.5,16,1,true),M(0x9ab060,{side:T.DoubleSide}));b.position.y=.25;g.add(b);for(const y of[.1,.4]){const r=new T.Mesh(new T.TorusGeometry(.245,.02,6,24),M(0x6a5a3a));r.rotation.x=Math.PI/2;r.position.y=y;g.add(r)}}
  else{const b=new T.Mesh(new T.CylinderGeometry(.16,.16,.5,14),M(0x5a3424,{roughness:.3}));b.position.y=.25;g.add(b);for(let i=0;i<4;i++){const s=new T.Mesh(new T.CylinderGeometry(.015,.015,.5,6),M(0xc8a070));s.position.set(-.06+i*.04,.6,0);g.add(s)}}
  g.traverse(o=>{if(o.isMesh)o.castShadow=true});return g};
 const items=IT.map((it,i)=>{const x=-3+(i%3)*3,y=i<3?2.27:.97;const g=mk(it.k);g.position.set(x,y,-1.3);shelf.add(g);const tag=new T.Mesh(new T.PlaneGeometry(.5,.5),new T.MeshBasicMaterial({toneMapped:false,map:new T.CanvasTexture(labelCanvas(it))}));tag.position.set(x+.75,y+.3,-.69);shelf.add(tag);
  const nm=document.createElement('canvas');nm.width=360;nm.height=64;{const q=nm.getContext('2d');q.fillStyle='#2a1a10';q.fillRect(0,0,360,64);q.fillStyle='#f2d27a';q.font='bold 30px sans-serif';q.textAlign='center';q.fillText(it.n,180,44)}const nt=new T.Mesh(new T.PlaneGeometry(1.8,.32),new T.MeshBasicMaterial({toneMapped:false,map:new T.CanvasTexture(nm)}));nt.position.set(x,y-.17,-.69);shelf.add(nt);
  const hit=new T.Mesh(new T.BoxGeometry(2.4,1,1),new T.MeshBasicMaterial({visible:false}));hit.position.set(x+.2,y+.4,-1.1);hit.userData.it=i;shelf.add(hit);
  const mark=new T.Mesh(new T.CircleGeometry(.2,24),new T.MeshBasicMaterial({color:0x6ad08a,transparent:true,opacity:0}));mark.position.set(x-.85,y+.55,-.68);mark.visible=false;shelf.add(mark);return{it,g,mark,res:null}});
 const cam=new T.PerspectiveCamera(44,1,.05,60);cam.position.set(0,2.6,7.4);cam.lookAt(0,1.6,-1);
 title(ui.top,'녹색 물건 고르기','물건을 눌러 표지를 살펴요 · 진짜 환경표지가 붙은 물건만 사요');
 const hud=document.createElement('div');hud.style.cssText='position:absolute;left:16px;top:70px;z-index:3;padding:10px 14px;border-radius:12px;background:rgba(20,14,10,.78);color:#f2d27a;font:16px "Do Hyeon",sans-serif;line-height:1.7';ui.o.append(hud);
 const bar=document.createElement('div');bar.style.cssText='position:absolute;left:50%;bottom:16px;transform:translateX(-50%);z-index:3;max-width:min(820px,94vw);padding:8px 14px;border-radius:12px;background:rgba(243,234,214,.97);border:2px solid #d8a838;font:15px/1.6 "Gowun Dodum",sans-serif;color:#2b1d12;text-align:center';ui.o.append(bar);
 const BTN="font:16px 'Do Hyeon',sans-serif;padding:8px 14px;border-radius:12px;border:0;cursor:pointer";
 const say=(h,bad)=>{bar.style.borderColor=bad?'#b8322a':'#d8a838';bar.innerHTML=h};
 let right=0,phase='look';say('서당 비품을 살 때 나라 기관은 <b>녹색 제품</b>(환경표지 인증 등)을 먼저 사야 해요. 물건을 눌러 붙은 <b>표지</b>를 살피고, 진짜 인증 표지가 있는 것만 사요.');
 const open=i=>{if(phase!=='look'||items[i].res!=null)return;const it=items[i].it;try{E.SND&&E.SND.paper&&E.SND.paper()}catch(e){}const src=labelCanvas(it).toDataURL();
  say(`<div style="display:flex;gap:12px;align-items:center;justify-content:center"><img src="${src}" alt="" style="width:110px;height:110px;border:2px solid #3b2a1c;border-radius:8px;background:#fff"><div style="text-align:left"><b>${it.n}</b><br>붙은 표지를 잘 보세요. 인증 표지는 초록 둥근 틀과 인증 번호가 있어요.<div style="margin-top:6px;display:flex;gap:8px"><button type="button" data-v="1" style="${BTN};background:#2f6a4a;color:#fff">사기</button><button type="button" data-v="0" style="${BTN};background:#8e2b20;color:#fff4dc">거르기</button></div></div></div>`);bar.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>mark(i,+b.dataset.v))};
 const mark=(i,v)=>{const o=items[i],it=o.it;o.res=v;const want=it.lab==='real'?1:0;const ok=v===want;if(ok)right++;o.mark.material.color.setHex(v?0x3ad06a:0xb0a090);o.mark.material.opacity=.95;o.mark.visible=true;blip(ac,out,ok?600:220,ok?800:140,.1,.07,ok?'triangle':'square');
  const why=it.lab==='real'?`진짜 환경표지(${it.no})가 붙은 녹색 제품이에요.`:it.lab==='fake'?'손으로 그린 잎과 「친환경!!」 글씨뿐, 인증 번호가 없는 가짜 표지예요.':'좋은 물건일 수 있지만 녹색 제품 인증이 없어요. 이번엔 인증 제품을 먼저 사요.';
  say(`${ok?'<b>맞아요.</b>':'<b>다시 보면…</b>'} ${why}`,!ok);if(items.every(x=>x.res!=null))setTimeout(finish,1400)};
 const finish=()=>{phase='done';const stars=right===6?3:right>=5?2:1;const coins=6+stars*7;E.ST.coins+=coins;E.ST.cards=E.ST.cards||{};E.ST.cards.green=1;E.ST.green=Math.max(E.ST.green||0,stars);try{E.save&&E.save();E.hudDraw&&E.hudDraw();E.SND&&E.SND.fan&&E.SND.fan()}catch(e){}
  say(`<b>녹색 구매 끝! ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</b> 여섯 가운데 ${right}개를 바르게 골랐어요 · 엽전 ${coins}냥.<br>공공기관은 환경을 덜 해치는 녹색 제품을 먼저 사도록 정해져 있어요(녹색 제품 구매). 그래서 진짜 인증 표지인지 꼭 확인해요. 「녹색 구매」 카드가 열렸어요.<div style="margin-top:8px"><button type="button" data-x style="${BTN};background:#8e2b20;color:#fff4dc">마치기</button></div>`);bar.querySelector('[data-x]').onclick=close};
 const ray=new T.Raycaster(),mv=new T.Vector2();R.domElement.addEventListener('pointerdown',e=>{const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,cam);const h=ray.intersectObjects(shelf.children,false).find(x=>x.object.userData.it!=null);if(h)open(h.object.userData.it)});
 let last=performance.now();const loop=()=>{if(!alive)return;const now=performance.now();last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  items.forEach((o,i)=>{if(o.res==null)o.g.rotation.y=Math.sin(now/900+i)*.3});hud.innerHTML=`살핀 물건 ${items.filter(x=>x.res!=null).length} / 6`;R.render(sc,cam);requestAnimationFrame(loop)};loop();
 const close=()=>{if(!alive)return;alive=false;try{stopAmb()}catch(e){}try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 const scr=i=>{const v=items[i].g.position.clone();v.y+=.3;v.project(cam);const r=R.domElement.getBoundingClientRect();return[r.left+(v.x+1)/2*r.width,r.top+(1-v.y)/2*r.height]};
 window.__GREEN={state:()=>({phase,right,lab:IT.map(x=>x.lab),res:items.map(x=>x.res)}),scr,close};
 return{close}}
