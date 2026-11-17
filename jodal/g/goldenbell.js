/* 무이 나라 조달청: 「조달 골든벨」. 만든 날 2026-11-17
   관아 창의 「조달 골든벨」 단추로 연다. 3D 무대: 단상 위 무이, 뒤에 문제 판, 앞에 O·X 큰 판, 객석의 장인 무이들.
   그동안 연 도감 카드 문제를 먼저, 모자라면 기본 문제로 열 개. O·X 판을 누르거나 키보드 O·X(또는 1·2).
   맞히면 단상이 오르고 객석이 환호, 틀리면 해설과 함께 기회 하나가 준다(기회 둘). 열 문제를 다 넘기면 금빛 종이 내려와 울린다.
   runGoldenBell(ctx,{ST,save,hudDraw,SND}) */
import * as T from 'three';
import {setupPost} from './post.js';
import {hallBack,boardFloor} from './sites/dress.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {overlay,title,blip,softOut} from './sites/minigames.js';
const QS=[['bid','입찰에 나온 업체끼리 미리 짜고 값을 정해도 괜찮다.',0,'미리 짜고 값을 정하는 건 담합이에요. 걸리면 나라 입찰에 못 나와요.'],
 ['crown','조달청은 원자재를 미리 사 두었다가 모자랄 때 기업에 풀기도 한다.',1,'비축사업이에요. 값이 크게 오르거나 모자랄 때 풀어요.'],
 ['maebyeong','약속한 규격과 다른 물건이라도 값이 싸면 받아 준다.',0,'규격과 품질이 약속과 다르면 받지 않아요(품질 검사).'],
 ['angbu','새 기술로 만든 혁신제품은 나라 기관이 먼저 사서 써 볼 수 있다.',1,'혁신제품 시범구매예요. 나라가 첫 손님이 되어 줘요.'],
 ['najeonham','나라 기관은 중소기업 제품을 일정 비율 이상 사야 한다.',1,'중소기업 우선구매예요. 작은 공방에도 길을 열어요.'],
 ['narajangteo','나라장터의 입찰 공고는 아무나 볼 수 없게 숨겨 둔다.',0,'나라장터의 공고와 계약은 누구나 볼 수 있게 공개해요.'],
 ['fraud','몰래 불량품을 납품한 업체는 일정 기간 나라 입찰에 나올 수 없다.',1,'부정당업자 제재예요.'],
 ['stock','비축 창고에서는 가벼운 물건을 아래 칸에 쌓는 게 안전하다.',0,'무거운 건 아래, 가벼운 건 위에 쌓아야 안전해요.'],
 ['ferry','납품 기한을 넘겨도 아무 책임이 없다.',0,'기한을 넘기면 하루마다 지체상금을 물어요.'],
 ['export','조달청은 우리 중소기업이 다른 나라 정부 조달 시장에 나가도록 돕는다.',1,'해외 조달 시장 진출을 도와요.'],
 ['build','다리 공사는 다 지은 뒤 준공 검사를 통과해야 끝난다.',1,'감리가 살피고 준공 검사를 통과해야 끝나요.'],
 ['disaster','재해가 나면 조달청은 긴급 구매로 필요한 물자를 빠르게 산다.',1,'재난 대비 조달이에요.'],
 ['emergency','재난 때는 입찰 공고 기간을 줄여 물자를 빨리 구할 수 있다.',1,'긴급 입찰이에요.'],
 ['moonjar','큰 일은 여러 업체가 힘을 모아 한 계약을 함께 맡을 수 있다.',1,'공동계약(공동수급)이에요.'],
 [null,'조달청은 나라에 필요한 물품과 공사를 사고 맡기는 중앙 기관이다.',1,'맞아요. 조달청은 나라 살림의 장보기를 맡아요.'],
 [null,'적격 심사에서는 값이 가장 싼 곳이 무조건 낙찰된다.',0,'값만이 아니라 솜씨와 자격을 함께 봐요.'],
 [null,'예정 가격을 넘게 써낸 견적은 낙찰될 수 없다.',1,'나라 돈은 정해진 만큼만 써요.'],
 [null,'계약한 내용은 의궤처럼 기록해 두고 공개한다.',1,'계약 정보 공개예요. 누가 무엇을 얼마에 했는지 남겨요.']];
export function runGoldenBell(ctx,E){const ui=overlay('#120c18');let alive=true;ui.c.style.display='none';const ac=ctx.ac(),out=softOut(ctx);
 const R=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.shadowMap.enabled=true;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new T.Scene();try{setupPost(R,sc)}catch(e){console.warn('후처리',e)}sc.background=new T.Color(0x1a1430);try{const pm=new T.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 sc.add(new T.HemisphereLight(0xfff0e0,0x2a1a30,.5));const spot=new T.SpotLight(0xfff2d0,60,30,.45,.5,1.2);spot.position.set(0,12,6);spot.castShadow=true;sc.add(spot,spot.target);
 const cam=new T.PerspectiveCamera(44,1,.05,80);
 title(ui.top,'조달 골든벨','O·X 판을 누르거나 키보드 O·X(1·2) · 열 문제를 넘기면 골든벨!');
 const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.7},o));
 const cv=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),c);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t};
 /* 무대 */const stage=new T.Mesh(new T.CylinderGeometry(7,7.4,.6,48),M(0x8e2b20));stage.position.y=.3;stage.receiveShadow=true;sc.add(stage);const rim=new T.Mesh(new T.TorusGeometry(7,.08,8,64),new T.MeshBasicMaterial({color:0xffd24a,toneMapped:false}));rim.rotation.x=Math.PI/2;rim.position.y=.62;sc.add(rim);
 const fl=new T.Mesh(new T.PlaneGeometry(60,60),boardFloor(0x7a6a5a,12));fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;sc.add(fl);try{hallBack(sc,{z:-10,w:34,h:11,y0:0})}catch(e){console.warn('대청',e)}
 /* 뒤 병풍과 문제 판 */const screen=new T.Mesh(new T.PlaneGeometry(10,4.2),new T.MeshBasicMaterial({toneMapped:false}));screen.position.set(0,6.2,-6);sc.add(screen);const frame=new T.Mesh(new T.BoxGeometry(10.6,4.8,.2),M(0x3b2a1c));frame.position.set(0,6.2,-6.15);sc.add(frame);
 const drawQ=(top,body,col='#fbf3dc')=>{screen.material.map=cv(1000,420,q=>{q.fillStyle='#1a2a4a';q.fillRect(0,0,1000,420);q.strokeStyle='#d8a838';q.lineWidth=10;q.strokeRect(6,6,988,408);q.fillStyle='#f2d27a';q.font='bold 44px sans-serif';q.textAlign='center';q.fillText(top,500,72);q.fillStyle=col;q.font='bold 46px sans-serif';const words=body.split(' ');let line='',y=170;for(const w of words){const t=line?line+' '+w:w;if(q.measureText(t).width>880){q.fillText(line,500,y);line=w;y+=64}else line=t}q.fillText(line,500,y)});screen.material.needsUpdate=true};
 /* 단상(오르내림)과 무이 */const pod=new T.Group();const col=new T.Mesh(new T.CylinderGeometry(.9,1,1,24),M(0xf2d27a,{metalness:.5,roughness:.3}));col.position.y=.5;pod.add(col);pod.position.set(0,.6,0);sc.add(pod);let me=null;const H=window.__H3;
 if(H&&H.makeMuui)H.makeMuui('base',1.4).then(m=>{m.root.position.set(0,1,0);pod.add(m.root);m.play('idle');me=m}).catch(()=>{});
 /* O·X 판 */const mkPanel=(txt,c,x)=>{const g=new T.Mesh(new T.CircleGeometry(1.2,40),new T.MeshBasicMaterial({toneMapped:false,map:cv(256,256,q=>{q.fillStyle=c;q.beginPath();q.arc(128,128,124,0,7);q.fill();q.strokeStyle='#fff';q.lineWidth=26;if(txt==='O'){q.beginPath();q.arc(128,128,70,0,7);q.stroke()}else{q.beginPath();q.moveTo(70,70);q.lineTo(186,186);q.moveTo(186,70);q.lineTo(70,186);q.stroke()}})}));g.position.set(x,2.6,3.2);sc.add(g);return g};
 const pO=mkPanel('O','#2a5aaa',-3.3),pX=mkPanel('X','#b8322a',3.3);pO.scale.setScalar(.85);pX.scale.setScalar(.85);
 /* 객석 무이 */const crowd=[];['metal','ceramic','science','painter','carpenter'].forEach((k,i)=>{if(!H||!H.makeMuui)return;H.makeMuui(k,1.1).then(m=>{m.root.position.set(-5+i*2.5,0,8.4+(i%2)*.6);m.root.rotation.y=Math.PI;sc.add(m.root);m.play('idle');crowd.push(m)}).catch(()=>{})});
 /* 금빛 종 */const bell=new T.Group();{const pts=[[0,0],[.9,0],[.8,.25],[.62,.9],[.5,1.4],[.2,1.6],[0,1.62]].map(([x,y])=>new T.Vector2(x,y));const b=new T.Mesh(new T.LatheGeometry(pts,36),M(0xf2c14e,{metalness:.9,roughness:.2,side:T.DoubleSide}));b.castShadow=true;bell.add(b);const cl=new T.Mesh(new T.SphereGeometry(.18,12,10),M(0xc8a040,{metalness:.9}));cl.position.y=.1;bell.add(cl);const rope=new T.Mesh(new T.CylinderGeometry(.03,.03,8,6),M(0x8e2b20));rope.position.y=5.6;bell.add(rope)}bell.position.set(6.4,20,-2);sc.add(bell);
 /* 불꽃 */const FN=500,fp=new Float32Array(FN*3).fill(-99),fv=new Float32Array(FN*3),fl2=new Float32Array(FN);const fg=new T.BufferGeometry();fg.setAttribute('position',new T.BufferAttribute(fp,3));sc.add(new T.Points(fg,new T.PointsMaterial({color:0xffe08a,size:.14,transparent:true,depthWrite:false,blending:T.AdditiveBlending})));let fi=0;
 const burst=(x,y,z,n=60)=>{for(let k=0;k<n;k++){const i=fi++%FN;fp[i*3]=x;fp[i*3+1]=y;fp[i*3+2]=z;const a=Math.random()*Math.PI*2,b=Math.random()*Math.PI-Math.PI/2,s=2+Math.random()*3;fv[i*3]=Math.cos(a)*Math.cos(b)*s;fv[i*3+1]=Math.sin(b)*s+2;fv[i*3+2]=Math.sin(a)*Math.cos(b)*s;fl2[i]=1.3}};
 /* 문제 고르기: 연 카드 먼저 */const cards=E.ST.cards||{};const own=QS.filter(q=>q[0]&&cards[q[0]]),rest=QS.filter(q=>!(q[0]&&cards[q[0]]));const sh=a=>a.sort(()=>Math.random()-.5);const list=sh(own).concat(sh(rest)).slice(0,10);
 const bar=document.createElement('div');bar.style.cssText='position:absolute;left:50%;bottom:16px;transform:translateX(-50%);z-index:3;max-width:min(760px,94vw);padding:8px 14px;border-radius:12px;background:rgba(243,234,214,.96);border:2px solid #d8a838;font:15px/1.6 "Gowun Dodum",sans-serif;color:#2b1d12;text-align:center';ui.o.append(bar);
 const hud=document.createElement('div');hud.style.cssText='position:absolute;left:16px;top:70px;z-index:3;padding:8px 12px;border-radius:12px;background:rgba(20,14,10,.75);color:#f2d27a;font:17px "Do Hyeon",sans-serif;line-height:1.6';ui.o.append(hud);
 const say=(t,bad)=>{bar.style.borderColor=bad?'#b8322a':'#d8a838';bar.innerHTML=t};
 let qi=0,lives=2,wait=false,fin=false,podY=.6,want=.6,bellY=20,bellT=20,ring=0;
 const draw=()=>{hud.innerHTML=`문제 ${Math.min(qi+1,list.length)} / ${list.length}<br>기회 ${'♥'.repeat(lives)}${'♡'.repeat(2-lives)}`};
 const ask=()=>{const q=list[qi];drawQ(`제 ${qi+1} 문제`,q[1]);say('O일까요, X일까요? 판을 누르거나 키보드 O·X(1·2).');wait=false;draw();blip(ac,out,660,880,.1,.06,'triangle')};
 const answer=v=>{if(wait||fin)return;wait=true;const q=list[qi];const ok=v===q[2];const tag=(q[2]?'O':'X');
  if(ok){E.SND&&E.SND.coin&&E.SND.coin();for(const m of crowd)m.play('cheer');me&&me.play('cheer');want+=.45;drawQ(`정답 ${tag}!`,q[3],'#bff0c8');say(`<b>정답!</b> ${q[3]}`);burst(0,podY+2.2,0,30);qi++;setTimeout(()=>{for(const m of crowd)m.play('idle');me&&me.play('idle');if(qi>=list.length)win();else ask()},1900)}
  else{lives--;blip(ac,out,200,120,.2,.1,'square');me&&me.play('wave');drawQ(`아쉬워요, 정답은 ${tag}`,q[3],'#ffc8c0');say(`<b>틀렸어요.</b> ${q[3]}${lives>0?' 기회가 하나 남았어요.':''}`,true);draw();qi++;setTimeout(()=>{if(lives<=0)lose();else if(qi>=list.length)win();else ask()},2400)}};
 const end=(html)=>{fin=true;say(html+`<div style="margin-top:8px"><button type="button" data-x style="font:16px 'Do Hyeon',sans-serif;padding:8px 18px;border-radius:12px;border:0;background:#8e2b20;color:#fff4dc;cursor:pointer">마치기</button></div>`);bar.querySelector('[data-x]').onclick=close};
 const win=()=>{const stars=lives===2?3:2;const coins=10+stars*8;E.ST.coins+=coins;E.ST.bell=Math.max(E.ST.bell||0,stars);E.save&&E.save();E.hudDraw&&E.hudDraw();E.SND&&E.SND.fan&&E.SND.fan();bellT=podY+4.2;ring=1;drawQ('골든벨!','열 문제를 모두 넘겼어요. 조달 박사 무이!','#ffe08a');for(const m of crowd)m.play('cheer');
  for(let k=0;k<5;k++)setTimeout(()=>{burst((Math.random()-.5)*8,6+Math.random()*3,(Math.random()-.5)*4);[784,988,1175,1568].forEach((f,i)=>setTimeout(()=>blip(ac,out,f,f,.5,.08,'sine'),i*90))},800+k*400);
  end(`<b>골든벨을 울렸어요! ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</b> 엽전 ${coins}냥. 조달 도감의 내용을 꼼꼼히 익혔어요.`)};
 const lose=()=>{const n=qi-2+lives;E.ST.coins+=5;E.save&&E.save();E.hudDraw&&E.hudDraw();drawQ('도전 끝','다음엔 골든벨을 울려 봐요!');end(`<b>도전 끝!</b> ${Math.max(0,qi-2)}문제를 맞혔어요. 참가 상으로 5냥. 보물 곳간의 도감 카드를 다시 읽고 도전해 봐요.`)};
 const ray=new T.Raycaster(),mv=new T.Vector2();R.domElement.addEventListener('pointerdown',e=>{const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,cam);const h=ray.intersectObjects([pO,pX],false)[0];if(h)answer(h.object===pO?1:0)});
 R.domElement.addEventListener('pointermove',e=>{const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,cam);const h=ray.intersectObjects([pO,pX],false)[0];R.domElement.style.cursor=h?'pointer':'default';pO.scale.setScalar(h&&h.object===pO?.95:.85);pX.scale.setScalar(h&&h.object===pX?.95:.85)});
 const kd=e=>{if(e.repeat)return;if(e.code==='KeyO'||e.code==='Digit1'){e.preventDefault();answer(1)}else if(e.code==='KeyX'||e.code==='Digit2'){e.preventDefault();answer(0)}};addEventListener('keydown',kd);
 let last=performance.now();const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  podY+=(want-podY)*Math.min(1,dt*2.5);const hh=1+(podY-.6);col.scale.y=hh;col.position.y=hh/2;if(me)me.root.position.y=hh;
  cam.position.set(0,podY+4.3,12.8);cam.lookAt(0,podY+3.1,0);pO.position.y=pX.position.y=podY+1.3;screen.position.y=podY+4.9;frame.position.y=podY+4.9;spot.target.position.set(0,podY,0);
  bellY+=(bellT-bellY)*Math.min(1,dt*1.5);bell.position.y=bellY;if(ring){bell.rotation.z=Math.sin(now/180)*.35*ring;ring=Math.max(.2,ring-dt*.1)}
  for(const m of crowd)m.mx.update(dt);if(me)me.mx.update(dt);
  for(let i=0;i<FN;i++){if(fl2[i]<=0)continue;fl2[i]-=dt;fv[i*3+1]-=3*dt;for(let a=0;a<3;a++)fp[i*3+a]+=fv[i*3+a]*dt;if(fl2[i]<=0)fp[i*3+1]=-99}fg.attributes.position.needsUpdate=true;
  rim.material.color.setHSL((now/3000)%1,.8,.6);
  R.render(sc,cam);requestAnimationFrame(loop)};ask();loop();
 const close=()=>{if(!alive)return;alive=false;removeEventListener('keydown',kd);for(const m of crowd)sc.remove(m.root);try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 window.__GB={state:()=>({qi,lives,fin,ans:list[qi]&&list[qi][2],n:list.length,own:own.length}),answer,close};
 return{close}}
