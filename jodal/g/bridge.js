/* 무이 나라 조달청: 「다리 공사」(시설 공사 계약). 만든 날 2026-11-17
   관아 창의 「다리 공사」 단추로 연다. 3D 강가: 끊긴 강, 앞 둑에 부품 더미, 설계서를 든 감리 무이.
   부품을 누르면 들어 올려 치수가 나온다(설계서: 교각 굵기 30cm, 보 길이 3m, 난간은 소나무). 빛나는 자리를 눌러 놓는다.
   순서: 교각 셋 → 보 넷 → 난간 둘. 순서를 어기면 부품이 물에 빠지고, 규격 미달(가는 교각·짧은 보·썩은 난간)은 감리가 돌려보낸다.
   다 놓으면 감리 무이가 다리를 건너며 준공 검사, 「시설 공사」 카드.
   runBridge(ctx,{ST,save,hudDraw,SND}) */
import * as T from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {overlay,title,blip,softOut} from './sites/minigames.js';
export function runBridge(ctx,E){const ui=overlay('#0d1a24');let alive=true;ui.c.style.display='none';const ac=ctx.ac(),out=softOut(ctx);
 const R=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.shadowMap.enabled=true;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new T.Scene();sc.background=new T.Color(0xa8d0ec);sc.fog=new T.Fog(0xa8d0ec,30,70);try{const pm=new T.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 sc.add(new T.HemisphereLight(0xffffff,0x5a7a4a,.6));const sun=new T.DirectionalLight(0xfff0d0,2.3);sun.position.set(-6,12,8);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-12,right:12,top:12,bottom:-8});sc.add(sun);
 const cam=new T.PerspectiveCamera(44,1,.05,120);cam.position.set(0,8.6,15.2);cam.lookAt(0,.6,.6);
 title(ui.top,'다리 공사','부품을 눌러 치수를 보고, 설계서대로 빛나는 자리를 눌러 놓아요');
 const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.85},o));
 const cv=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'));const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t};
 /* 강과 양쪽 둑(x: 강 -4.5..4.5) */const water=new T.Mesh(new T.PlaneGeometry(9,40),M(0x3a7aa8,{roughness:.15,transparent:true,opacity:.9}));water.rotation.x=-Math.PI/2;water.position.y=-.3;sc.add(water);
 const bed=new T.Mesh(new T.PlaneGeometry(9,40),M(0x3a4a3a));bed.rotation.x=-Math.PI/2;bed.position.y=-1.4;sc.add(bed);
 for(const s of[-1,1]){const b=new T.Mesh(new T.BoxGeometry(14,2,40),M(0x6a9a4a));b.position.set(s*(4.5+7),-.5,0);b.receiveShadow=true;sc.add(b);const cut=new T.Mesh(new T.BoxGeometry(.4,2,40),M(0x7a6a4a));cut.position.set(s*4.6,-.5,0);sc.add(cut)}
 /* 앞 둑(부품 놓는 곳): 강 앞쪽에 모래톱 */
 for(let k=0;k<8;k++){const tr=new T.Group();const t=new T.Mesh(new T.CylinderGeometry(.15,.2,1.4,6),M(0x6a4a2c));t.position.y=.7;tr.add(t);const c=new T.Mesh(new T.ConeGeometry(1,2.4,7),M(k%3?0x3a6a3a:0xb85a2a));c.position.y=2.3;c.castShadow=true;tr.add(c);tr.position.set((k%2?1:-1)*(7+Math.random()*4),.5,-6+k*1.2);sc.add(tr)}
 /* 설계서 판(감리 옆) */const plan=new T.Mesh(new T.PlaneGeometry(2.6,1.8),new T.MeshBasicMaterial({toneMapped:false,map:cv(520,360,q=>{q.fillStyle='#1a3a6a';q.fillRect(0,0,520,360);q.strokeStyle='#cfe0ff';q.lineWidth=3;q.strokeRect(8,8,504,344);q.fillStyle='#fff';q.font='bold 34px sans-serif';q.textAlign='center';q.fillText('설 계 서',260,50);q.font='26px sans-serif';q.textAlign='left';q.fillText('① 교각 셋 · 굵기 30cm',36,110);q.fillText('② 보 넷 · 길이 3m',36,160);q.fillText('③ 난간 둘 · 소나무',36,210);q.fillText('순서: 교각 → 보 → 난간',36,270);q.strokeStyle='#cfe0ff';q.beginPath();q.moveTo(40,320);q.lineTo(480,320);q.stroke();for(const x of[150,260,370]){q.strokeRect(x-6,300,12,40)}})}));plan.position.set(-6.8,2.5,-3.8);plan.rotation.y=.45;sc.add(plan);{const leg=new T.Mesh(new T.BoxGeometry(.08,1.6,.08),M(0x5a3a22));leg.position.set(-6.8,.85,-3.85);sc.add(leg)}
 /* 감리 무이 */let boss=null;const H=window.__H3;if(H&&H.makeMuui)H.makeMuui('science',1.3).then(m=>{m.root.position.set(-5.4,.5,-2.6);m.root.rotation.y=.7;sc.add(m.root);m.play('idle');boss=m}).catch(()=>{});
 /* 자리: 교각(강 속, x -2.25·0·2.25), 보(구간 넷), 난간(앞·뒤) */const PX=[-2.25,0,2.25];const SPANS=[[-4.6,-2.25],[-2.25,0],[0,2.25],[2.25,4.6]];
 const slots=[];const ghost=(geo,pos,kind,idx)=>{const m=new T.Mesh(geo,new T.MeshBasicMaterial({color:0xffe08a,transparent:true,opacity:0,depthWrite:false}));m.position.copy(pos);sc.add(m);slots.push({m,kind,idx,item:null});return m};
 PX.forEach((x,i)=>ghost(new T.BoxGeometry(.6,2.2,.6),new T.Vector3(x,.1,0),'pier',i));
 SPANS.forEach(([a,b],i)=>ghost(new T.BoxGeometry(b-a,.25,1.8),new T.Vector3((a+b)/2,1.3,0),'beam',i));
 [-.85,.85].forEach((z,i)=>ghost(new T.BoxGeometry(9.2,.6,.12),new T.Vector3(0,1.75,z),'rail',i));
 /* 부품 */const wood=M(0x9a6a3a),stone=M(0x8a8a86,{roughness:1}),rot=M(0x5a4a32,{roughness:1});
 const mkPart=(kind,bad)=>{const g=new T.Group();let m;
  if(kind==='pier'){m=new T.Mesh(new T.CylinderGeometry(bad?.12:.3,bad?.14:.32,2.2,12),stone);m.rotation.z=Math.PI/2;m.position.y=bad?.14:.32}
  else if(kind==='beam'){m=new T.Mesh(new T.BoxGeometry(bad?1.6:2.35,.22,1.8),wood);m.position.y=.11;for(let k=-3;k<=3;k++){const l=new T.Mesh(new T.BoxGeometry(.02,.23,1.8),M(0x6a4a2a));l.position.set(k*(bad?.22:.32),.11,0);g.add(l)}}
  else{m=new T.Mesh(new T.BoxGeometry(9.2,.08,.08),bad?rot:wood);m.position.y=.5;for(let k=0;k<9;k++){const p=new T.Mesh(new T.BoxGeometry(.08,.55,.08),bad?rot:wood);p.position.set(-4.4+k*1.1,.27,0);g.add(p)}if(bad)for(let k=0;k<5;k++){const h=new T.Mesh(new T.SphereGeometry(.05,6,4),M(0x2a2018));h.position.set(-4+k*2,.5,.04);g.add(h)}g.scale.set(.45,1,1)}
  m.castShadow=true;g.add(m);/* 누르기 쉽게 보이지 않는 상자 */const hb=new T.Mesh(kind==='pier'?new T.BoxGeometry(2.3,.7,.7):kind==='beam'?new T.BoxGeometry(2.4,.4,1.9):new T.BoxGeometry(9.4,.8,.5),new T.MeshBasicMaterial({visible:false}));hb.position.y=kind==='rail'?.35:.3;hb.userData.hit=1;g.add(hb);g.userData.hb=hb;return g};
 const SPEC={pier:{n:'교각',ok:'굵기 30cm 돌 교각',bad:'굵기 20cm 돌 교각',why:'설계서엔 굵기 30cm인데 20cm예요. 가는 교각은 물살에 버티지 못해요.'},
  beam:{n:'보',ok:'길이 3m 소나무 보',bad:'길이 2m 소나무 보',why:'설계서엔 길이 3m인데 2m예요. 교각 사이에 닿지 않아요.'},
  rail:{n:'난간',ok:'소나무 난간',bad:'벌레 먹은 난간',why:'벌레 먹고 썩은 나무예요. 사람이 기대면 부러져요.'}};
 const parts=[];const lay=[['pier',0],['beam',0],['rail',0],['pier',1],['beam',0],['pier',0],['beam',1],['beam',0],['rail',0],['pier',0],['rail',1],['beam',0]];
 const cnt={pier:0,beam:0,rail:0};lay.forEach(([k,b])=>{const g=mkPart(k,!!b);const c=cnt[k]++;let home;
  /* 왼쪽 둑: 교각(앞)과 난간(뒤), 오른쪽 둑: 보 */if(k==='pier')home=new T.Vector3(-6.6,.5,1.4+c*1.05);else if(k==='rail')home=new T.Vector3(-5.6-c*.9,.5,-1.2);else home=new T.Vector3(6.1+(c%2)*2.1,.5,1.0+Math.floor(c/2)*2.1);
  g.position.copy(home);g.rotation.y=k==='rail'?Math.PI/2:k==='beam'?Math.PI/2:(Math.random()-.5)*.3;sc.add(g);parts.push({g,kind:k,bad:!!b,home,placed:null,anim:null})});
 /* 물보라 */const SN=200,sp=new Float32Array(SN*3).fill(-99),sv=new Float32Array(SN*3),sl=new Float32Array(SN);const sg=new T.BufferGeometry();sg.setAttribute('position',new T.BufferAttribute(sp,3));sc.add(new T.Points(sg,new T.PointsMaterial({color:0xe8f4ff,size:.12,transparent:true,depthWrite:false})));let si=0;
 const splash=(x,z)=>{for(let k=0;k<40;k++){const i=si++%SN;sp[i*3]=x;sp[i*3+1]=-.25;sp[i*3+2]=z;sv[i*3]=(Math.random()-.5)*3;sv[i*3+1]=2+Math.random()*3;sv[i*3+2]=(Math.random()-.5)*3;sl[i]=1}};
 const bar=document.createElement('div');bar.style.cssText='position:absolute;left:50%;bottom:16px;transform:translateX(-50%);z-index:3;max-width:min(780px,94vw);padding:8px 14px;border-radius:12px;background:rgba(243,234,214,.96);border:2px solid #d8a838;font:15px/1.6 "Gowun Dodum",sans-serif;color:#2b1d12;text-align:center';ui.o.append(bar);
 const say=(t,bad)=>{bar.style.borderColor=bad?'#b8322a':'#d8a838';bar.innerHTML=t};
 const stage=()=>slots.filter(s=>s.kind==='pier').every(s=>s.item)?(slots.filter(s=>s.kind==='beam').every(s=>s.item)?'rail':'beam'):'pier';
 let sel=null,miss=0,fall=0,done=false,hover=null,walk=null;
 say('감리 무이: 「설계서대로 지어 주세요. 먼저 <b>교각</b>부터!」 부품을 눌러 치수를 확인해요.');
 const fly=(p,to,h,after,rot)=>{p.anim={from:p.g.position.clone(),to:to.clone(),t:0,h,after,r0:p.g.rotation.y,r1:rot==null?p.g.rotation.y:rot}};
 const pick=p=>{if(p.placed||p.anim||done)return;if(sel&&sel!==p)fly(sel,sel.home,.4);sel=p;E.SND&&E.SND.paper&&E.SND.paper();const S=SPEC[p.kind];fly(p,new T.Vector3(p.home.x,1.2,p.home.z-.6),.3);say(`<b>${S.n}</b> · ${p.bad?S.bad:S.ok}<br>지금 놓을 차례: <b>${SPEC[stage()].n}</b> · 빛나는 자리를 눌러요.`)};
 const put=s=>{if(!sel||sel.anim||s.item||done)return;const p=sel;if(s.kind!==p.kind){blip(ac,out,200,140,.12,.08,'square');say(`${SPEC[p.kind].n}은(는) 그 자리에 맞지 않아요. ${SPEC[s.kind].n} 자리예요.`,true);return}
  if(p.kind!==stage()){fall++;sel=null;const to=new T.Vector3(s.m.position.x,-1.2,s.m.position.z);fly(p,to,1,()=>{splash(to.x,to.z);blip(ac,out,120,60,.3,.14,'sine');p.g.position.copy(p.home);p.g.rotation.y=p.kind==='pier'?0:Math.PI/2},p.g.rotation.y);say(`풍덩! ${stage()==='pier'?'교각이':'보가'} 먼저예요. 받칠 것 없이 올리면 무너져 물에 빠져요. 부품은 건져 둑에 다시 놓았어요.`,true);return}
  if(p.bad){miss++;sel=null;fly(p,p.home,.5);blip(ac,out,200,140,.14,.1,'square');boss&&boss.play('wave');say(`감리 무이: 「잠깐! ${SPEC[p.kind].why} 설계서와 다른 자재는 받을 수 없어요.」`,true);return}
  s.item=p;p.placed=s;sel=null;E.SND&&E.SND.coin&&E.SND.coin();const pos=s.m.position.clone();let rot=0;if(p.kind==='pier'){pos.y=-1.0;rot=0}else if(p.kind==='beam'){pos.y=1.2;rot=0}else{pos.y=1.25;rot=0}
  fly(p,pos,1.2,()=>{if(p.kind==='pier'){p.g.children[0].rotation.z=0;p.g.children[0].position.y=1.1}if(p.kind==='rail')p.g.scale.set(1,1,1);if(p.kind==='beam'){const w=SPANS[s.idx][1]-SPANS[s.idx][0];p.g.scale.x=w/2.35}blip(ac,out,400,520,.06,.05,'triangle');const st=stage();if(slots.every(x=>x.item))finish();else say(`잘 놓았어요. 이제 <b>${SPEC[st].n}</b> 차례예요.`)},rot)};
 const finish=()=>{done=true;say('다 지었어요! 감리 무이가 다리를 건너며 <b>준공 검사</b>를 해요…');if(boss){boss.root.position.set(-5.2,1.35,0);boss.root.rotation.y=Math.PI/2;boss.play('walk');walk={t:0}}else end()};
 const end=()=>{const stars=miss+fall===0?3:miss+fall<=2?2:1;const coins=8+stars*7;E.ST.coins+=coins;E.ST.cards=E.ST.cards||{};E.ST.cards.build=1;E.ST.bridge=Math.max(E.ST.bridge||0,stars);E.save&&E.save();E.hudDraw&&E.hudDraw();E.SND&&E.SND.fan&&E.SND.fan();boss&&boss.play('cheer');
  say(`<b>준공 검사 통과! ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</b> 규격 미달 ${miss}번 · 순서 틀림 ${fall}번 · 수고비 ${coins}냥.<br>조달청은 물건뿐 아니라 다리·학교 같은 <b>시설 공사</b>도 계약해요. 설계서대로 지었는지 <b>감리</b>가 살피고, 다 지으면 <b>준공 검사</b>를 통과해야 공사가 끝나요. 「시설 공사」 카드가 열렸어요.<div style="margin-top:8px"><button type="button" data-x style="font:16px 'Do Hyeon',sans-serif;padding:8px 18px;border-radius:12px;border:0;background:#8e2b20;color:#fff4dc;cursor:pointer">마치기</button></div>`);bar.querySelector('[data-x]').onclick=close};
 const ray=new T.Raycaster(),mv=new T.Vector2();const hitAt=e=>{const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,cam);
  const ph=ray.intersectObjects(parts.filter(p=>!p.placed).map(p=>p.g),true)[0];if(ph){const p=parts.find(x=>{let o=ph.object;while(o){if(o===x.g)return true;o=o.parent}return false});if(p)return{p}}
  if(sel){const sh=ray.intersectObjects(slots.filter(s=>!s.item&&s.kind===sel.kind).map(s=>s.m),false)[0];if(sh)return{s:slots.find(s=>s.m===sh.object)}}return null};
 R.domElement.addEventListener('pointerdown',e=>{const h=hitAt(e);if(!h)return;if(h.p)pick(h.p);else if(h.s)put(h.s)});R.domElement.addEventListener('pointermove',e=>{const h=hitAt(e);hover=h&&h.s||null;R.domElement.style.cursor=h?'pointer':'default'});
 let last=performance.now();const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  for(const p of parts){const a=p.anim;if(!a)continue;a.t=Math.min(1,a.t+dt*1.8);const k=a.t*a.t*(3-2*a.t);p.g.position.lerpVectors(a.from,a.to,k);p.g.position.y+=Math.sin(a.t*Math.PI)*a.h;p.g.rotation.y=a.r0+(a.r1-a.r0)*k;if(a.t>=1){p.anim=null;a.after&&a.after()}}
  const st=stage();for(const s of slots)s.m.material.opacity=sel&&!sel.anim&&!s.item&&s.kind===sel.kind?(s===hover?.45:.18+.1*Math.sin(now/200)):0;
  for(let i=0;i<SN;i++){if(sl[i]<=0)continue;sl[i]-=dt;sv[i*3+1]-=9*dt;for(let a=0;a<3;a++)sp[i*3+a]+=sv[i*3+a]*dt;if(sl[i]<=0)sp[i*3+1]=-99}sg.attributes.position.needsUpdate=true;
  if(boss){boss.mx.update(dt);if(walk){walk.t+=dt/5;boss.root.position.x=-5.2+walk.t*10.4;boss.root.position.y=1.35+Math.sin(walk.t*Math.PI)*.08;if(walk.t>=1){walk=null;boss.root.position.y=.5;boss.root.position.x=5.6;end()}}}
  water.material.opacity=.85+Math.sin(now/700)*.05;
  R.render(sc,cam);requestAnimationFrame(loop)};loop();
 const close=()=>{if(!alive)return;alive=false;if(boss)sc.remove(boss.root);try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 window.__BRG={state:()=>({stage:stage(),miss,fall,done,placed:slots.filter(s=>s.item).length,parts:parts.map(p=>[p.kind,p.bad,!!p.placed])}),
  scrP:i=>{const v=new T.Vector3();parts[i].g.userData.hb.getWorldPosition(v);v.project(cam);const r=R.domElement.getBoundingClientRect();return[r.left+(v.x+1)/2*r.width,r.top+(1-v.y)/2*r.height]},
  scrS:(k,i)=>{const s=slots.find(x=>x.kind===k&&x.idx===i);const v=s.m.position.clone();v.project(cam);const r=R.domElement.getBoundingClientRect();return[r.left+(v.x+1)/2*r.width,r.top+(1-v.y)/2*r.height]},close};
 return{close}}
