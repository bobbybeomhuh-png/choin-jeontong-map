/* 무이 나라 조달청: 「비축 물자 수송 길 짜기」(G40, 물자 수송). 만든 날 2026-11-17
   관아 창 「수송 길」 단추로 연다. 3D 지도 탁자 위 8×6 칸: 비축 창고 하나, 고을 넷, 강(못 지남, 여울 칸만 다리), 산(길 값 2·느림).
   칸을 눌러 길을 놓고(창고나 놓인 길에 붙은 칸만, 다시 누르면 걷음) 예산 18냥 안에서 고을 넷을 다 잇는다.
   「수레 보내기」를 누르면 수레가 길을 따라 달리고, 고을마다 12일 안에 닿아야 한다. 다 하면 별·엽전, 「물자 수송」 카드.
   runRoute(ctx,{ST,save,hudDraw,SND}) · window.__ROUTE */
import * as T from 'three';
import {setupPost} from './post.js';
import {hallBack} from './sites/dress.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {overlay,title,blip,softOut} from './sites/minigames.js';
const MAP=['MM..R..1','W...R...','..M.B..M','..M.R.2.','3...R...','...MR.4.'];
const GW=8,GH=6,BUDGET=18,LIMIT=12;const COST={'.':1,M:2,B:3},TIME={'.':1,M:2,B:2};const TN={1:'경주',2:'강진',3:'서울',4:'통영'};
export function runRoute(ctx,E){const ui=overlay('#120c08');let alive=true;ui.c.style.display='none';const ac=ctx.ac(),out=softOut(ctx);
 const R=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.shadowMap.enabled=true;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none;cursor:pointer';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new T.Scene();try{setupPost(R,sc)}catch(e){}sc.background=new T.Color(0x1c140e);try{const pm=new T.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 sc.add(new T.HemisphereLight(0xfff0d8,0x3a2a1a,.85));const sun=new T.DirectionalLight(0xffe2b8,1.7);sun.position.set(3,10,6);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-8,right:8,top:8,bottom:-8});sc.add(sun);
 const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.8},o));
 const cv=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'));const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t};
 const fl=new T.Mesh(new T.PlaneGeometry(30,30),M(0x7a5a3a));fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;sc.add(fl);try{hallBack(sc,{z:-6,w:26,h:7,y0:0})}catch(e){}
 const top=new T.Mesh(new T.BoxGeometry(GW*1.1+.8,.3,GH*1.1+.8),M(0x5a3a22));top.position.y=1;top.castShadow=true;sc.add(top);for(const[x,z]of[[-4.6,-3.4],[4.6,-3.4],[-4.6,3.4],[4.6,3.4]]){const l=new T.Mesh(new T.BoxGeometry(.3,1,.3),M(0x4a2a18));l.position.set(x,.5,z);sc.add(l)}
 const cam=new T.PerspectiveCamera(44,1,.05,80);cam.position.set(0,9.6,7.4);cam.lookAt(0,1,.4);
 title(ui.top,'비축 물자 수송 길 짜기','칸을 눌러 창고에서 고을 넷까지 길을 이어요 · 강은 여울에만 다리 · 산길은 비싸고 느려요');
 const pos=(x,y)=>new T.Vector3((x-(GW-1)/2)*1.1,1.15,(y-(GH-1)/2)*1.1);
 const cells=[];const road=new Set();const key=(x,y)=>x+','+y;
 for(let y=0;y<GH;y++)for(let x=0;x<GW;x++){const t=MAP[y][x];const p=pos(x,y);let col=0x7aa858,h=.12;if(t==='R'){col=0x4a88b8;h=.06}else if(t==='B'){col=0x6a9ac0;h=.06}else if(t==='M'){col=0x6a7a5a;h=.12}else if(t==='W'){col=0xb08a5a}else if('1234'.includes(t)){col=0xc8b080}
  const m=new T.Mesh(new T.BoxGeometry(1.04,h,1.04),M(col,{roughness:t==='R'||t==='B'?.15:.9}));m.position.copy(p);m.position.y+=(t==='R'||t==='B')?.01:h/2-.06;m.receiveShadow=true;m.userData.cell=[x,y];sc.add(m);
  if(t==='M'){const mt=new T.Mesh(new T.ConeGeometry(.42,.7,6),M(0x5a6a4a));mt.position.set(p.x,p.y+.4,p.z);mt.castShadow=true;mt.userData.cell=[x,y];sc.add(mt)}
  if(t==='B'){const st=new T.Mesh(new T.BoxGeometry(.8,.04,.2),M(0xa8a090));st.position.set(p.x,p.y+.02,p.z);sc.add(st)}
  if(t==='W'||'1234'.includes(t)){const g=new T.Group();g.position.set(p.x,p.y,p.z);const b=new T.Mesh(new T.BoxGeometry(t==='W'?.8:.55,.4,.5),M(0xece4d2));b.position.y=.2;b.castShadow=true;g.add(b);const rf=new T.Mesh(new T.ConeGeometry(t==='W'?.7:.5,.35,4),M(0x3a3a3e));rf.rotation.y=Math.PI/4;rf.position.y=.57;g.add(rf);
   const lb=new T.Mesh(new T.PlaneGeometry(1.1,.36),new T.MeshBasicMaterial({toneMapped:false,map:cv(220,72,q=>{q.fillStyle=t==='W'?'#2f6a4a':'#8e2b20';q.fillRect(0,0,220,72);q.fillStyle='#fff4dc';q.font='bold 40px sans-serif';q.textAlign='center';q.fillText(t==='W'?'비축 창고':TN[t],110,50)})}));lb.position.set(0,1.0,0);lb.rotation.x=-.6;g.add(lb);g.traverse(o=>{if(o.isMesh)o.userData.cell=[x,y]});sc.add(g)}
  cells.push({x,y,t,m})}
 const plank=new T.MeshStandardMaterial({color:0x9a6a3a,roughness:.9}),bridge=new T.MeshStandardMaterial({color:0x7a4a22,roughness:.8});const roadMesh={};
 const at=(x,y)=>x>=0&&y>=0&&x<GW&&y<GH?MAP[y][x]:null;
 const isNode=(x,y)=>{const t=at(x,y);return t==='W'||(t&&'1234'.includes(t))||road.has(key(x,y))};
 const spent=()=>[...road].reduce((a,k)=>{const[x,y]=k.split(',').map(Number);return a+COST[at(x,y)]},0);
 const hud=document.createElement('div');hud.style.cssText='position:absolute;left:16px;top:70px;z-index:3;padding:10px 14px;border-radius:12px;background:rgba(20,14,10,.78);color:#f2d27a;font:16px "Do Hyeon",sans-serif;line-height:1.7';ui.o.append(hud);
 const bar=document.createElement('div');bar.style.cssText='position:absolute;left:50%;bottom:16px;transform:translateX(-50%);z-index:3;max-width:min(820px,94vw);padding:8px 14px;border-radius:12px;background:rgba(243,234,214,.97);border:2px solid #d8a838;font:15px/1.6 "Gowun Dodum",sans-serif;color:#2b1d12;text-align:center';ui.o.append(bar);
 const BTN="font:16px 'Do Hyeon',sans-serif;padding:8px 14px;border-radius:12px;border:0;cursor:pointer";
 const GO=`<div style="margin-top:6px;display:flex;gap:8px;justify-content:center"><button type="button" data-send style="${BTN};background:#8e2b20;color:#fff4dc">수레 보내기</button><button type="button" data-clr style="${BTN};background:#fff4dc;color:#3b2a1c;border:2px solid #3b2a1c">길 모두 걷기</button></div>`;
 const say=(h,bad)=>{bar.style.borderColor=bad?'#b8322a':'#d8a838';bar.innerHTML=h+GO;bar.querySelector('[data-send]').onclick=()=>send();bar.querySelector('[data-clr]').onclick=()=>{for(const k of[...road])toggle(...k.split(',').map(Number),true);say('길을 모두 걷었어요. 창고 옆 칸부터 다시 놓아요.')}};
 let phase='build',tries=0,carts=[],result=null;
 say(`비축 창고의 물자를 고을 넷에 날라야 해요. 창고에 붙은 칸부터 눌러 길을 이어요. 예산 <b>${BUDGET}냥</b>(들판 1 · 산 2 · 여울 다리 3), 고을마다 <b>${LIMIT}일</b> 안(산길·다리는 2일).`);
 const toggle=(x,y,silent)=>{const t=at(x,y);const k=key(x,y);if(phase!=='build')return;if(road.has(k)){road.delete(k);sc.remove(roadMesh[k]);delete roadMesh[k];if(!silent)blip(ac,out,300,200,.05,.05,'triangle');return}
  if(!(t in COST)){if(!silent)say(t==='R'?'<b>강</b>은 그냥 건널 수 없어요. 돌다리가 보이는 <b>여울</b> 칸에만 다리를 놓아요.':'창고와 고을은 길이 아니라 잇는 곳이에요.',1);return}
  if(![[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>isNode(x+dx,y+dy))){say('창고나 이미 놓은 길에 <b>붙은 칸</b>에만 길을 놓을 수 있어요.',1);return}
  if(spent()+COST[t]>BUDGET){say(`예산이 모자라요(${spent()} / ${BUDGET}냥). 돌아가는 길을 걷고 더 짧게 이어 봐요.`,1);return}
  road.add(k);const p=pos(x,y);const mm=new T.Mesh(new T.BoxGeometry(t==='B'?1.05:.6,t==='B'?.14:.06,t==='B'?.5:.6),t==='B'?bridge:plank);mm.position.set(p.x,p.y+(t==='M'?.08:t==='B'?.08:.04),p.z);mm.castShadow=true;sc.add(mm);roadMesh[k]=mm;blip(ac,out,520,640,.05,.05,'triangle')};
 /* 수레 보내기: 창고에서 길(와 고을)을 따라 가장 빠른 날수 */const send=()=>{if(phase!=='build')return;tries++;const W=[0,1];const dist={},prev={};const Q=[[0,W]];dist[key(...W)]=0;
  while(Q.length){Q.sort((a,b)=>a[0]-b[0]);const[d,[x,y]]=Q.shift();if(d>dist[key(x,y)])continue;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(!isNode(nx,ny))continue;const t=at(nx,ny);const nd=d+(TIME[t]||1);const k=key(nx,ny);if(dist[k]==null||nd<dist[k]){dist[k]=nd;prev[k]=[x,y];if(!'1234'.includes(t))Q.push([nd,[nx,ny]])}}}
  const res=[];for(let y=0;y<GH;y++)for(let x=0;x<GW;x++){const t=at(x,y);if('1234'.includes(t))res.push({t,x,y,d:dist[key(x,y)]})}
  /* 수레 띄우기 */for(const c of carts)sc.remove(c.m);carts=[];for(const r of res){if(r.d==null)continue;const path=[];let k=key(r.x,r.y),cur=[r.x,r.y];while(cur){path.unshift(cur);cur=prev[key(...cur)]}const m=new T.Group();const b=new T.Mesh(new T.BoxGeometry(.32,.18,.24),M(0xb8322a));b.position.y=.16;m.add(b);const s=new T.Mesh(new T.BoxGeometry(.26,.14,.2),M(0xc8a868));s.position.y=.3;m.add(s);sc.add(m);carts.push({m,path,t:0})}
  const miss=res.filter(r=>r.d==null),late=res.filter(r=>r.d!=null&&r.d>LIMIT);phase='run';result={res,miss,late};bar.style.borderColor='#d8a838';bar.innerHTML='수레가 비축 창고를 떠났어요. 길을 따라 고을로 달려가요…';
  setTimeout(()=>{if(!alive)return;const ok=!miss.length&&!late.length;blip(ac,out,ok?660:200,ok?880:120,.12,.08,ok?'triangle':'square');
   if(ok){finish()}else{phase='build';say(`${miss.length?`<b>${miss.map(r=>TN[r.t]).join('·')}</b>까지 길이 안 이어졌어요. `:''}${late.length?`<b>${late.map(r=>TN[r.t]+' '+r.d+'일').join('·')}</b>, 기한(${LIMIT}일)을 넘겨요. 산길을 피해 봐요. `:''}길을 고쳐 다시 보내요.`,1)}},2600)};
 const finish=()=>{phase='done';const sp=spent();const stars=tries===1&&sp<=16?3:tries<=2?2:1;const coins=6+stars*7;E.ST.coins+=coins;E.ST.cards=E.ST.cards||{};E.ST.cards.haul=1;E.ST.route=Math.max(E.ST.route||0,stars);try{E.save&&E.save();E.hudDraw&&E.hudDraw();E.SND&&E.SND.fan&&E.SND.fan()}catch(e){}
  bar.style.borderColor='#d8a838';bar.innerHTML=`<b>수송 길 완성! ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</b> 길 값 ${sp}냥 · 보낸 횟수 ${tries} · 고을마다 ${result.res.map(r=>TN[r.t]+' '+r.d+'일').join(', ')} · 엽전 ${coins}냥.<br>비축한 물자는 필요한 곳에 제때 닿아야 쓸모가 있어요. 조달청은 물자를 어디에 쌓고 어떻게 나를지까지 미리 따져 둬요. 「물자 수송」 카드가 열렸어요.<div style="margin-top:8px"><button type="button" data-x style="${BTN};background:#8e2b20;color:#fff4dc">마치기</button></div>`;bar.querySelector('[data-x]').onclick=close};
 const ray=new T.Raycaster(),mv=new T.Vector2();R.domElement.addEventListener('pointerdown',e=>{const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,cam);const h=ray.intersectObjects(sc.children,true).find(x=>x.object.userData.cell);if(h)toggle(...h.object.userData.cell)});
 let last=performance.now();const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  for(const c of carts){c.t=Math.min(c.path.length-1,c.t+dt*3.2);const i=Math.floor(c.t),f=c.t-i;const a=pos(...c.path[i]),b=pos(...c.path[Math.min(i+1,c.path.length-1)]);c.m.position.copy(a.lerp(b,f));c.m.position.y+=.06;if(i<c.path.length-1)c.m.rotation.y=Math.atan2(b.x-a.x,b.z-a.z)}
  hud.innerHTML=`길 값 ${spent()} / ${BUDGET}냥<br>보낸 횟수 ${tries}`;R.render(sc,cam);requestAnimationFrame(loop)};loop();
 const close=()=>{if(!alive)return;alive=false;try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 const scr=(x,y)=>{const v=pos(x,y);v.y+=.1;v.project(cam);const r=R.domElement.getBoundingClientRect();return[r.left+(v.x+1)/2*r.width,r.top+(1-v.y)/2*r.height]};
 window.__ROUTE={state:()=>({phase,tries,spent:spent(),road:[...road],result}),scr,close};
 return{close}}
