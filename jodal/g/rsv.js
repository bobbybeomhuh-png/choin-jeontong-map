/* 무이 나라 조달청: 「비축 물자 풀기」(G30, 조달청 원자재 비축). 만든 날 2026-11-17
   관아 창 「비축 물자 풀기」 단추로 연다. 3D 관아 비축 창고 안: 구리 덩이·주석 덩이·옻 통이 세 무더기로 쌓여 있고, 벽에 큰 시세판(선 그래프 셋)이 움직인다.
   값이 붉은 선(공방이 버틸 수 있는 값)을 넘으면 공방 장인 무이가 시무룩해진다. 그 물자 단추(또는 1·2·3 키)를 눌러 창고 물자를 풀면 값이 내려간다.
   한 판 25초, 풀 수 있는 횟수 넷. 붉은 선 아래일 때 풀면 창고만 빔(낭비). 세 판. 다 하면 별·엽전, 「원자재 비축」 카드.
   runReserve(ctx,{ST,save,hudDraw,SND}) · window.__RSV */
import * as T from 'three';
import {setupPost} from './post.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {overlay,title,blip,softOut} from './sites/minigames.js';
import {groundTex,hallBack} from './sites/dress.js';
const MAT=[{n:'구리',col:0xb87333,who:'metal',css:'#c8743a'},{n:'주석',col:0xb8bcc4,who:'science',css:'#7a8a9a'},{n:'옻',col:0x3a1a10,who:'painter',css:'#6a2a1a'}];
const LINE=100,ROUND=25,TRIES=4;
export function runReserve(ctx,E){const ui=overlay('#100c08');let alive=true;ui.c.style.display='none';const ac=ctx.ac(),out=softOut(ctx);
 const R=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.shadowMap.enabled=true;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new T.Scene();try{setupPost(R,sc)}catch(e){}sc.background=new T.Color(0x1c140e);try{const pm=new T.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 sc.add(new T.HemisphereLight(0xfff0d8,0x3a2a1a,.8));const sun=new T.DirectionalLight(0xffe2b8,1.8);sun.position.set(5,10,8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-10,right:10,top:10,bottom:-10});sc.add(sun);
 const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.8},o));
 const cam=new T.PerspectiveCamera(48,1,.05,80);cam.position.set(0,4.6,10.5);cam.lookAt(0,2.2,-2);
 title(ui.top,'비축 물자 풀기','값이 붉은 선을 넘으면 그 물자 단추(1·2·3)를 눌러 창고 물자를 풀어요 · 너무 일찍 풀면 창고만 비어요');
 /* 창고: 널 바닥, 뒤 벽(기둥·창호), 서까래 */const fl=new T.Mesh(new T.PlaneGeometry(30,24),new T.MeshStandardMaterial({map:groundTex('pave',8),roughness:1,color:0xb8a890}));fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;sc.add(fl);
 try{hallBack(sc,{z:-5.5,w:22,h:7,y0:0})}catch(e){const w=new T.Mesh(new T.PlaneGeometry(22,7),M(0xe8dcc4));w.position.set(0,3.5,-5.5);sc.add(w)}

 /* 시세판 */const bc=document.createElement('canvas');bc.width=1024;bc.height=420;const bq=bc.getContext('2d');const bt=new T.CanvasTexture(bc);bt.colorSpace=T.SRGBColorSpace;const board=new T.Mesh(new T.PlaneGeometry(8.4,3.45),new T.MeshBasicMaterial({map:bt,toneMapped:false}));board.position.set(0,4.5,-3.3);sc.add(board);const frame=new T.Mesh(new T.BoxGeometry(8.8,3.85,.12),M(0x3b2a1c));frame.position.set(0,4.5,-3.42);sc.add(frame);for(const x of[-4.3,4.3]){const po=new T.Mesh(new T.CylinderGeometry(.14,.16,6.4,10),M(0x5a3a22));po.position.set(x,3.2,-3.5);po.castShadow=true;sc.add(po)}{const cap=new T.Mesh(new T.BoxGeometry(9.4,.22,.5),M(0x3a3a3e));cap.position.set(0,6.5,-3.4);sc.add(cap)}
 /* 물자 무더기 셋 */const piles=MAT.map((m,i)=>{const g=new T.Group();g.position.set(-5+i*5,0,-1.6);sc.add(g);const items=[];for(let k=0;k<12;k++){const lv=Math.floor(k/4),c=k%4;let it;if(i===2){it=new T.Mesh(new T.CylinderGeometry(.32,.32,.62,14),M(m.col,{roughness:.5}));it.position.set(-1.05+c*.7,.31+lv*.64,0)}else{it=new T.Mesh(new T.BoxGeometry(.62,.26,.34),M(m.col,{metalness:.75,roughness:.35}));it.position.set(-1.05+c*.7,.13+lv*.28,(lv%2)*.1)}it.castShadow=true;g.add(it);items.push(it)}
  const pal=new T.Mesh(new T.BoxGeometry(3,.1,1.1),M(0x7a5634));pal.position.y=-.03;g.add(pal);
  const lc=document.createElement('canvas');lc.width=256;lc.height=80;const q=lc.getContext('2d');q.fillStyle='#2a1a10';q.fillRect(0,0,256,80);q.strokeStyle='#d8a838';q.lineWidth=5;q.strokeRect(3,3,250,74);q.fillStyle='#f2d27a';q.font='bold 44px sans-serif';q.textAlign='center';q.fillText('비축 '+m.n,128,56);const lt=new T.CanvasTexture(lc);lt.colorSpace=T.SRGBColorSpace;const lb=new T.Mesh(new T.PlaneGeometry(1.6,.5),new T.MeshBasicMaterial({map:lt,toneMapped:false}));lb.position.set(0,1.9,.3);g.add(lb);return{g,items}});
 /* 공방 장인 무이 셋(앞줄) */const H=window.__H3;const folk=[];MAT.forEach((m,i)=>{if(H&&H.makeMuui)H.makeMuui(m.who,1.1).then(mm=>{if(!alive)return;mm.root.position.set(-5+i*5,0,1.6);mm.root.rotation.y=0;sc.add(mm.root);mm.play('idle');folk[i]=mm}).catch(()=>{})});
 const hud=document.createElement('div');hud.style.cssText='position:absolute;left:16px;top:70px;z-index:3;padding:10px 14px;border-radius:12px;background:rgba(20,14,10,.78);color:#f2d27a;font:16px "Do Hyeon",sans-serif;line-height:1.7';ui.o.append(hud);
 const bar=document.createElement('div');bar.style.cssText='position:absolute;left:50%;bottom:16px;transform:translateX(-50%);z-index:3;max-width:min(820px,94vw);padding:8px 14px;border-radius:12px;background:rgba(243,234,214,.97);border:2px solid #d8a838;font:15px/1.6 "Gowun Dodum",sans-serif;color:#2b1d12;text-align:center';ui.o.append(bar);
 const BTN="font:17px 'Do Hyeon',sans-serif;padding:9px 16px;border-radius:12px;border:0;cursor:pointer;color:#fff4dc";
 let rd=0,t=0,live=false,price=[],hist=[],left=TRIES,over=[0,0,0],waste=0,wins=0,results=[],shock=[],msg='';
 const say=(h,bad)=>{bar.style.borderColor=bad?'#b8322a':'#d8a838';bar.innerHTML=h};
 const ctrl=()=>`<div style="margin-top:6px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">${MAT.map((m,i)=>`<button type="button" data-r="${i}" style="${BTN};background:${m.css}">${i+1} · ${m.n} 풀기</button>`).join('')}</div>`;
 const start=()=>{t=0;live=true;for(const p of piles)for(const it of p.items)it.visible=true;left=TRIES;over=[0,0,0];waste=0;price=[70,75,72];hist=[[],[],[]];
  /* 판마다 값이 치솟는 때(초)와 물자를 정해 둠: 판이 갈수록 더 잦게 */const n=3+rd*2;shock=[];for(let k=0;k<n;k++)shock.push({at:2+k*(ROUND-6)/n+Math.random()*2,i:(k+rd)%3,amt:30+Math.random()*16,done:0});
  say(`<b>${rd+1}번째 판</b> · 시세판을 지켜보다가 값이 붉은 선을 넘으면 그 물자를 풀어요. 남은 풀기 ${left}번.`+ctrl());bind()};
 const bind=()=>bar.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>release(+b.dataset.r));
 const release=i=>{if(!live)return;if(left<=0){say(`창고에서 더 풀 수 있는 물자가 없어요. 판이 끝날 때까지 버텨요.`+ctrl(),1);bind();return}left--;const p=piles[i];const vis=p.items.filter(x=>x.visible);for(let k=0;k<3&&vis.length;k++)vis.pop().visible=false;
  if(price[i]>LINE){price[i]=Math.max(55,price[i]-38);blip(ac,out,620,880,.1,.07,'triangle');try{E.SND&&E.SND.coin&&E.SND.coin()}catch(e){}folk[i]&&folk[i].play('cheer');say(`<b>${MAT[i].n}</b>을 풀었어요! 값이 내려가 공방이 다시 일할 수 있어요. 남은 풀기 ${left}번.`+ctrl())}
  else{waste++;price[i]=Math.max(55,price[i]-10);blip(ac,out,220,140,.1,.07,'square');say(`<b>${MAT[i].n}</b> 값은 아직 괜찮았어요. 창고만 비었어요(낭비). 남은 풀기 ${left}번.`+ctrl(),1)}bind()};
 const end=()=>{live=false;const f=(over[0]+over[1]+over[2])/ROUND;const ok=f<1.6&&waste<=1;if(ok)wins++;results.push({over:+f.toFixed(2),waste,ok});
  say(`${ok?'<b>잘 지켰어요!</b>':'<b>아쉬워요.</b>'} 값이 붉은 선 위에 있던 시간 ${f.toFixed(1)}초(물자 셋 합쳐 1초당), 낭비 ${waste}번.<div style="margin-top:8px"><button type="button" data-nx style="${BTN};background:#3b2a1c;color:#f2d27a">${rd<2?'다음 판':'결과 보기'}</button></div>`,!ok);bar.querySelector('[data-nx]').onclick=()=>{if(rd<2){rd++;start()}else finish()}};
 const finish=()=>{const stars=Math.max(1,wins);const coins=6+stars*7;E.ST.coins+=coins;E.ST.cards=E.ST.cards||{};E.ST.cards.reserve=1;E.ST.reserve=Math.max(E.ST.reserve||0,stars);try{E.save&&E.save();E.hudDraw&&E.hudDraw();E.SND&&E.SND.fan&&E.SND.fan()}catch(e){}rd=3;
  say(`<b>비축 물자 풀기 끝! ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</b> 세 판 가운데 ${wins}판을 지켰어요 · 엽전 ${coins}냥.<br>조달청은 구리·알루미늄 같은 원자재를 미리 사 두었다가, 값이 크게 오르거나 구하기 어려울 때 중소기업에 풀어 줘요(원자재 비축). 「원자재 비축」 카드가 열렸어요.<div style="margin-top:8px"><button type="button" data-x style="${BTN};background:#8e2b20">마치기</button></div>`);bar.querySelector('[data-x]').onclick=close};
 const kd=e=>{const k={Digit1:0,Digit2:1,Digit3:2,Numpad1:0,Numpad2:1,Numpad3:2}[e.code];if(k!=null&&live)release(k)};addEventListener('keydown',kd);
 const draw=()=>{const q=bq,W=1024,Hh=420;q.fillStyle='#f6ecd2';q.fillRect(0,0,W,Hh);q.fillStyle='#3b2a1c';q.font='bold 34px sans-serif';q.textAlign='left';q.fillText('나라 원자재 시세판',24,46);q.textAlign='right';q.font='bold 28px sans-serif';q.fillText(live?`남은 ${Math.max(0,ROUND-t).toFixed(0)}초`:'',W-24,46);
  const x0=40,x1=W-30,y0=Hh-30,y1=70,ys=v=>y0-(v-40)/(160-40)*(y0-y1);q.strokeStyle='#d8c8a0';q.lineWidth=1;for(let v=60;v<=160;v+=20){q.beginPath();q.moveTo(x0,ys(v));q.lineTo(x1,ys(v));q.stroke()}
  q.strokeStyle='#c8352a';q.lineWidth=4;q.setLineDash([16,10]);q.beginPath();q.moveTo(x0,ys(LINE));q.lineTo(x1,ys(LINE));q.stroke();q.setLineDash([]);q.fillStyle='#c8352a';q.font='bold 22px sans-serif';q.textAlign='left';q.fillText('공방이 버틸 수 있는 값',x0+6,ys(LINE)-8);
  MAT.forEach((m,i)=>{const h=hist[i]||[];q.strokeStyle=m.css;q.lineWidth=6;q.beginPath();h.forEach((v,k)=>{const x=x0+(k/(ROUND*5))*(x1-x0);k?q.lineTo(x,ys(v)):q.moveTo(x,ys(v))});q.stroke();if(h.length){const x=x0+((h.length-1)/(ROUND*5))*(x1-x0),y=ys(h[h.length-1]);q.fillStyle=m.css;q.beginPath();q.arc(x,y,10,0,7);q.fill();q.font='bold 24px sans-serif';q.fillText(`${m.n} ${Math.round(h[h.length-1])}`,Math.min(x+14,x1-120),y-12)}});bt.needsUpdate=true};
 let last=performance.now(),acc=0;const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  for(const f of folk)f&&f.mx.update(dt);
  if(live){t+=dt;for(const s of shock)if(!s.done&&t>=s.at){s.done=1;price[s.i]+=s.amt}for(let i=0;i<3;i++){price[i]+=(Math.random()-.45)*dt*14+(price[i]<68?dt*4:0);price[i]=Math.min(160,Math.max(50,price[i]));if(price[i]>LINE){over[i]+=dt;if(folk[i]&&folk[i].__s!=='sad'){folk[i].__s='sad';folk[i].play('idle')}folk[i]&&(folk[i].root.rotation.z=Math.sin(now/120)*.05)}else if(folk[i]){folk[i].__s='';folk[i].root.rotation.z=0}}
   acc+=dt;if(acc>=.2){acc=0;for(let i=0;i<3;i++)hist[i].push(price[i]);draw()}if(t>=ROUND)end()}
  hud.innerHTML=`판 ${Math.min(rd+1,3)} / 3 · 지킨 판 ${wins}<br>남은 풀기 ${left}번 · 낭비 ${waste}`;
  R.render(sc,cam);requestAnimationFrame(loop)};
 say(`관아 비축 창고예요. 공방들이 쓰는 <b>구리·주석·옻</b> 값이 들쭉날쭉해요. 값이 <b style="color:#c8352a">붉은 선</b>을 넘으면 공방이 일을 못 해요. 그때 창고 물자를 풀어 값을 눌러 주세요.<div style="margin-top:8px"><button type="button" data-go style="${BTN};background:#8e2b20">시작</button></div>`);bar.querySelector('[data-go]').onclick=start;draw();loop();
 const close=()=>{if(!alive)return;alive=false;removeEventListener('keydown',kd);try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 window.__RSV={state:()=>({rd,t,live,price:price.map(v=>Math.round(v)),left,waste,wins,results,ready:folk.filter(Boolean).length===3}),release,close};
 return{close}}
