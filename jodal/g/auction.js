/* 무이 나라 조달청: 「역경매 장터」(나라장터 역경매). 만든 날 2026-11-17
   관아 창의 「역경매」 단추로 연다. 3D 경매장: 단상 위 업체 무이 넷(머리 위 부른 값·품질 깃발 상/중/하), 뒤에 큰 값 판.
   한 판 20초 동안 업체들이 값을 낮춰 부른다. 시간이 끝나면 남은 업체 가운데 가장 낮은 값이 낙찰.
   품질 「하」 업체는 값을 마구 후려친다(덤핑). 경매 도중 그 업체를 눌러 실격시켜야 한다. 멀쩡한 업체를 실격시키면 감점.
   세 판(금실·유약·자개). 끝나면 별, 엽전, 「역경매」 카드.
   runAuction(ctx,{ST,save,hudDraw,SND}) */
import * as T from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {overlay,title,blip,softOut} from './sites/minigames.js';
const ROUNDS=[{n:'금실 열 타래',start:120},{n:'청자 유약 다섯 단지',start:90},{n:'자개 백 장',start:150}];
const NAMES=['한양 금방','큰 상단','남도 조합','떠돌이 상인','서라벌 공방','통영 자개방','장터 잡화상'];
export function runAuction(ctx,E){const ui=overlay('#1a1008');let alive=true;ui.c.style.display='none';const ac=ctx.ac(),out=softOut(ctx);
 const R=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.shadowMap.enabled=true;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new T.Scene();sc.background=new T.Color(0x24160c);try{const pm=new T.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 sc.add(new T.HemisphereLight(0xfff0d8,0x2a1a10,.55));const sp=new T.SpotLight(0xfff2d8,70,30,.6,.5,1.2);sp.position.set(0,12,8);sp.castShadow=true;sc.add(sp,sp.target);
 const cam=new T.PerspectiveCamera(44,1,.05,80);cam.position.set(0,5.2,12.5);cam.lookAt(0,2.2,0);
 title(ui.top,'역경매 장터','업체들이 값을 낮춰 불러요 · 품질 「하」 업체를 눌러 실격시키고, 끝까지 남은 가장 낮은 값이 낙찰');
 const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.75},o));
 const cv=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;const q=c.getContext('2d');f(q);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.userData={c,q};return t};
 /* 마루·단상·병풍 */const fl=new T.Mesh(new T.PlaneGeometry(40,30),M(0x5a3a22));fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;sc.add(fl);
 const stage=new T.Mesh(new T.BoxGeometry(14,.6,4),M(0x8e2b20));stage.position.set(0,.3,-1);stage.receiveShadow=true;sc.add(stage);
 const wall=new T.Mesh(new T.PlaneGeometry(18,8),M(0x3a2414));wall.position.set(0,4,-4);sc.add(wall);
 /* 큰 값 판 */const boardTex=cv(1024,256,q=>{});const board=new T.Mesh(new T.PlaneGeometry(10,2.5),new T.MeshBasicMaterial({map:boardTex,toneMapped:false}));board.position.set(0,4.95,-3.9);board.scale.setScalar(.9);sc.add(board);
 const drawBoard=(top,mid,col='#ffe08a')=>{const q=boardTex.userData.q;q.fillStyle='#1a2a4a';q.fillRect(0,0,1024,256);q.strokeStyle='#d8a838';q.lineWidth=10;q.strokeRect(5,5,1014,246);q.fillStyle='#f2d27a';q.font='bold 46px sans-serif';q.textAlign='center';q.fillText(top,512,80);q.fillStyle=col;q.font='bold 92px sans-serif';q.fillText(mid,512,200);boardTex.needsUpdate=true};
 /* 망치 */const ham=new T.Group();{const h=new T.Mesh(new T.CylinderGeometry(.06,.06,1.2,8),M(0x6a4a2c));h.rotation.z=Math.PI/2;h.position.x=.5;ham.add(h);const hd=new T.Mesh(new T.CylinderGeometry(.2,.2,.5,12),M(0x4a2a14));ham.add(hd)}ham.position.set(5.6,1.6,1.6);sc.add(ham);
 const block=new T.Mesh(new T.CylinderGeometry(.4,.45,.25,16),M(0x4a2a14));block.position.set(5.6,.72,1.6);sc.add(block);const tbl=new T.Mesh(new T.BoxGeometry(1.6,.6,1),M(0x6a3a1c));tbl.position.set(5.6,.3,1.6);sc.add(tbl);
 const H=window.__H3;
 /* 업체 자리 넷 */const pods=[];for(let i=0;i<4;i++){const x=-4.5+i*3;const g=new T.Group();g.position.set(x,.6,-1);sc.add(g);const pd=new T.Mesh(new T.BoxGeometry(1.6,.5,.6),M(0xd8ccb0));pd.position.set(0,.25,1.0);pd.castShadow=true;g.add(pd);
  const tag=cv(256,160,q=>{});const tg=new T.Mesh(new T.PlaneGeometry(1.5,.94),new T.MeshBasicMaterial({map:tag,toneMapped:false}));tg.position.set(0,2.75,.3);g.add(tg);
  const hit=new T.Mesh(new T.BoxGeometry(1.8,3.4,1.6),new T.MeshBasicMaterial({visible:false}));hit.position.y=1.6;g.add(hit);
  const red=new T.Mesh(new T.PlaneGeometry(1.7,1.7),new T.MeshBasicMaterial({transparent:true,toneMapped:false,map:cv(256,256,q=>{q.strokeStyle='#e8322a';q.lineWidth=26;q.beginPath();q.moveTo(40,40);q.lineTo(216,216);q.moveTo(216,40);q.lineTo(40,216);q.stroke()})}));red.position.set(0,1.4,1.4);red.visible=false;g.add(red);
  const P={g,tag,hit,red,x,i,m:null};pods.push(P);if(H&&H.makeMuui)H.makeMuui(['metal','ceramic','painter','carpenter'][i],1.2).then(m=>{m.root.position.set(0,0,0);g.add(m.root);m.play('idle');P.m=m}).catch(()=>{})}
 const drawTag=P=>{const q=P.tag.userData.q;q.clearRect(0,0,256,160);q.fillStyle=P.out?'#5a4a40':'#fbf3dc';q.fillRect(0,0,256,160);q.strokeStyle='#3b2a1c';q.lineWidth=6;q.strokeRect(3,3,250,154);q.fillStyle='#2b1d12';q.font='bold 26px sans-serif';q.textAlign='center';q.fillText(P.name,128,36);q.font='bold 64px sans-serif';q.fillStyle=P.out?'#aaa':'#8e2b20';q.fillText(P.out?'실격':P.price+'냥',128,104);
  q.font='bold 26px sans-serif';const qc={상:'#2f6a4a',중:'#8a6a14',하:'#b8322a'}[P.q];q.fillStyle=qc;q.fillRect(70,118,116,34);q.fillStyle='#fff';q.fillText('품질 '+P.q,128,144);P.tag.needsUpdate=true};
 /* UI */const bar=document.createElement('div');bar.style.cssText='position:absolute;left:50%;bottom:16px;transform:translateX(-50%);z-index:3;max-width:min(780px,94vw);padding:8px 14px;border-radius:12px;background:rgba(243,234,214,.97);border:2px solid #d8a838;font:15px/1.6 "Gowun Dodum",sans-serif;color:#2b1d12;text-align:center';ui.o.append(bar);
 const hud=document.createElement('div');hud.style.cssText='position:absolute;left:16px;top:70px;z-index:3;padding:8px 12px;border-radius:12px;background:rgba(20,14,10,.78);color:#f2d27a;font:17px "Do Hyeon",sans-serif;line-height:1.6';ui.o.append(hud);
 const say=(t,bad)=>{bar.style.borderColor=bad?'#b8322a':'#d8a838';bar.innerHTML=t};const BTN="font:16px 'Do Hyeon',sans-serif;padding:8px 16px;border-radius:12px;border:0;cursor:pointer";
 let ri=-1,t=0,live=false,score=0,wrongOut=0,nextBid=0,hamT=0,results=[];
 const setup=()=>{ri++;const r=ROUNDS[ri];const nm=NAMES.slice().sort(()=>Math.random()-.5);const bad=(Math.random()*4)|0;const qs=['상','중','중','상'].sort(()=>Math.random()-.5);
  pods.forEach((P,i)=>{P.name=nm[i];P.q=i===bad?'하':qs[i];P.price=r.start-((Math.random()*8)|0);P.floor=P.q==='하'?Math.round(r.start*.35):Math.round(r.start*(.62+Math.random()*.12));P.out=false;P.red.visible=false;P.m&&P.m.play('idle');drawTag(P)});
  t=20;live=false;drawBoard(`${ri+1}번째 판 · ${r.n}`,'준비…');say(`<b>${ri+1}번째 판: ${r.n}</b> · 업체 넷이 값을 낮춰 불러요. 품질 깃발을 보고, <b>품질 「하」</b> 업체는 눌러서 실격시켜요.<div style="margin-top:8px"><button type="button" data-go style="${BTN};background:#2f6a4a;color:#fff">경매 시작</button></div>`);bar.querySelector('[data-go]').onclick=()=>{live=true;say('값을 낮춰 부르는 중… 품질 「하」 업체를 눌러 실격!');blip(ac,out,500,700,.15,.08,'triangle')}};
 const low=()=>pods.filter(p=>!p.out).reduce((a,b)=>!a||b.price<a.price?b:a,null);
 const endRound=()=>{live=false;hamT=1;const w=low();const ok=w&&w.q!=='하';const badLeft=pods.some(p=>p.q==='하'&&!p.out);if(ok)score++;results.push({ok,w});E.SND&&E.SND.coin&&E.SND.coin();blip(ac,out,120,90,.2,.15,'sine');w&&w.m&&w.m.play(ok?'cheer':'wave');
  drawBoard(`낙찰 · ${w?w.name:'없음'}`,w?w.price+'냥':'-',ok?'#bff0c8':'#ffb0a0');
  say(`땅! <b>${w.name}</b>이(가) <b>${w.price}냥</b>에 낙찰됐어요. ${ok?'품질도 갖춘 곳이라 알맞아요.':'그런데 품질 「하」 업체예요. 덤핑으로 값을 후려친 곳이 낙찰되면 물건이 엉망으로 와요.'}${badLeft&&ok?'':''}${wrongOut?` (멀쩡한 업체를 실격시킨 횟수 ${wrongOut})`:''}<div style="margin-top:8px"><button type="button" data-n style="${BTN};background:#8e2b20;color:#fff4dc">${ri<ROUNDS.length-1?'다음 판':'결과 보기'}</button></div>`,!ok);
  bar.querySelector('[data-n]').onclick=()=>{if(ri<ROUNDS.length-1)setup();else finish()}};
 const finish=()=>{const stars=score===3&&wrongOut===0?3:score>=2?2:1;const coins=8+stars*7;E.ST.coins+=coins;E.ST.cards=E.ST.cards||{};E.ST.cards.rauction=1;E.ST.auction=Math.max(E.ST.auction||0,stars);E.save&&E.save();E.hudDraw&&E.hudDraw();E.SND&&E.SND.fan&&E.SND.fan();
  drawBoard('역경매 끝',`${score} / 3 판 성공`);say(`<b>역경매 끝! ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</b> 엽전 ${coins}냥.<br>나라장터 <b>역경매</b>는 공급자들이 값을 실시간으로 낮춰 부르고 가장 낮은 값이 낙찰돼요. 다만 품질과 자격을 갖춘 곳만 참여해야 나라 돈이 제대로 쓰여요. 「역경매」 카드가 열렸어요.<div style="margin-top:8px"><button type="button" data-x style="${BTN};background:#8e2b20;color:#fff4dc">마치기</button></div>`);bar.querySelector('[data-x]').onclick=close};
 const ray=new T.Raycaster(),mv=new T.Vector2();const podAt=e=>{const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,cam);const h=ray.intersectObjects(pods.map(p=>p.hit),false)[0];return h&&pods.find(p=>p.hit===h.object)};
 const kick=P=>{if(!live||P.out)return;P.out=true;P.red.visible=true;drawTag(P);P.m&&P.m.play('wave');if(P.q==='하'){blip(ac,out,700,900,.1,.06,'triangle');say(`<b>${P.name}</b> 실격! 품질 「하」로 덤핑하던 곳이에요.`)}else{wrongOut++;blip(ac,out,200,140,.14,.1,'square');say(`<b>${P.name}</b>은(는) 품질 「${P.q}」로 멀쩡한 곳이었어요. 함부로 실격시키면 안 돼요.`,true)}};
 R.domElement.addEventListener('pointerdown',e=>{const P=podAt(e);if(P)kick(P)});R.domElement.addEventListener('pointermove',e=>{const P=podAt(e);R.domElement.style.cursor=P&&live&&!P.out?'pointer':'default'});
 let last=performance.now();const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  for(const P of pods)if(P.m)P.m.mx.update(dt);
  if(live){t-=dt;nextBid-=dt;if(nextBid<=0){nextBid=.45+Math.random()*.5;const c=pods.filter(p=>!p.out&&p.price>p.floor);if(c.length){const P=c[(Math.random()*c.length)|0];const lo=low();const step=P.q==='하'?4+((Math.random()*6)|0):1+((Math.random()*4)|0);P.price=Math.max(P.floor,Math.min(P.price-step,lo&&lo!==P?lo.price-((Math.random()*3)|0):P.price-step));drawTag(P);P.m&&P.m.play('wave');setTimeout(()=>P.m&&P.m.play('idle'),400);blip(ac,out,400+P.i*80,380+P.i*80,.04,.04,'triangle')}}
   const lo=low();drawBoard(`${ri+1}번째 판 · 남은 ${Math.max(0,Math.ceil(t))}초`,lo?`가장 낮은 값 ${lo.price}냥`:'-');if(t<=0)endRound()}
  if(hamT>0){hamT=Math.max(0,hamT-dt*2);ham.rotation.z=Math.sin(hamT*Math.PI)*.9}
  hud.innerHTML=`판 ${Math.max(1,ri+1)} / 3 · 성공 ${score}${wrongOut?`<br>잘못 실격 ${wrongOut}`:''}`;
  R.render(sc,cam);requestAnimationFrame(loop)};setup();loop();
 const close=()=>{if(!alive)return;alive=false;try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 window.__AUC={state:()=>({ri,t,live,score,wrongOut,pods:pods.map(p=>({n:p.name,q:p.q,price:p.price,out:p.out})),ready:pods.every(p=>p.m)}),start:()=>{const b=bar.querySelector('[data-go]');b&&b.click()},next:()=>{const b=bar.querySelector('[data-n]');b&&b.click()},
  scr:i=>{const v=pods[i].g.position.clone();v.y+=1.6;v.project(cam);const r=R.domElement.getBoundingClientRect();return[r.left+(v.x+1)/2*r.width,r.top+(1-v.y)/2*r.height]},close};
 return{close}}
