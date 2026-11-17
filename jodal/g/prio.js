/* 무이 나라 조달청: 「착한 공방 우선 구매」(G34, 사회적 가치 조달). 만든 날 2026-11-17
   관아 창 「우선 구매」 단추로 연다. 관아 안 3D 입찰 자리: 업체 무이 넷이 저마다 탁자 위에 견적과 서류 묶음을 올려 둔다.
   업체를 눌러 값·솜씨·서류(장애인 표준사업장 인증, 사회적 기업 인증, 여성 기업 확인서)를 살핀 뒤 계약할 곳을 고른다.
   품질과 값이 기준에 맞고 진짜 인증서가 있는 우선 구매 대상을 고르는 것이 정답. 「사회적 기업이라 함」(서류 없음)·「신청 중」은 거른다. 두 판(종이, 붓).
   다 하면 별·엽전, 「우선 구매」 카드. runPrio(ctx,{ST,save,hudDraw,SND}) · window.__PRIO */
import * as T from 'three';
import {setupPost} from './post.js';
import {hallBack} from './sites/dress.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {overlay,title,blip,softOut} from './sites/minigames.js';
const ROUNDS=[{n:'서당 한지 백 묶음',limit:45,need:'상',ans:1,b:[
  {who:'한양 종이 상회',k:'carpenter',p:40,q:'상',doc:null,why:'값과 솜씨는 좋지만 우선 구매 대상이 아니에요. 비슷한 조건의 우선 구매 대상이 있어요.'},
  {who:'햇살 종이 일터',k:'painter',p:41,q:'상',doc:['장애인 표준사업장 인증서',1],why:''},
  {who:'두레 한지',k:'ceramic',p:39,q:'중',doc:['「사회적 기업이에요」 (말뿐, 서류 없음)',0],why:'인증서가 없고 솜씨도 기준(상)에 못 미쳐요. 말만으로는 우선 구매를 할 수 없어요.'},
  {who:'달빛 한지방',k:'metal',p:48,q:'상',doc:['여성 기업 확인서',1],why:'진짜 우선 구매 대상이지만 예산(45냥)을 넘어요. 값도 기준에 맞아야 해요.'}]},
 {n:'서당 붓 쉰 자루',limit:32,need:'상',ans:2,b:[
  {who:'나눔 붓 공방',k:'painter',p:30,q:'하',doc:['사회적 기업 인증서',1],why:'인증은 진짜지만 솜씨가 하 등급이에요. 우선 구매도 품질 기준은 지켜야 해요.'},
  {who:'큰 상단 붓',k:'carpenter',p:28,q:'상',doc:null,why:'값과 솜씨는 좋지만 우선 구매 대상이 아니에요.'},
  {who:'솔바람 붓방',k:'ceramic',p:29,q:'상',doc:['여성 기업 확인서',1],why:''},
  {who:'새봄 붓 일터',k:'metal',p:28,q:'상',doc:['장애인 표준사업장 「신청 중」 (인증서 없음)',0],why:'아직 인증을 받지 못했어요. 인증서가 나온 뒤에야 우선 구매 대상이에요.'}]}];
export function runPrio(ctx,E){const ui=overlay('#120c08');let alive=true;ui.c.style.display='none';const ac=ctx.ac(),out=softOut(ctx);
 const R=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.shadowMap.enabled=true;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none;cursor:pointer';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new T.Scene();try{setupPost(R,sc)}catch(e){}sc.background=new T.Color(0x1c140e);try{const pm=new T.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 sc.add(new T.HemisphereLight(0xfff0d8,0x3a2a1a,.85));const sun=new T.DirectionalLight(0xffe2b8,1.7);sun.position.set(4,10,6);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-9,right:9,top:9,bottom:-9});sc.add(sun);
 const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.7},o));
 const cv=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'));const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t};
 const fl=new T.Mesh(new T.PlaneGeometry(30,30),M(0x7a5a3a));fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;sc.add(fl);try{hallBack(sc,{z:-5,w:26,h:7,y0:0})}catch(e){}
 const cam=new T.PerspectiveCamera(46,1,.05,80);cam.position.set(0,5.2,8.6);cam.lookAt(0,1.3,-1);
 title(ui.top,'착한 공방 우선 구매','업체를 눌러 값·솜씨·서류를 살펴요 · 기준에 맞는 진짜 우선 구매 대상과 계약해요');
 const H=window.__H3;const seats=[];let rd=0,score=0,tries=0,phase='pick',sel=null;
 const hud=document.createElement('div');hud.style.cssText='position:absolute;left:16px;top:70px;z-index:3;padding:10px 14px;border-radius:12px;background:rgba(20,14,10,.78);color:#f2d27a;font:16px "Do Hyeon",sans-serif;line-height:1.7';ui.o.append(hud);
 const bar=document.createElement('div');bar.style.cssText='position:absolute;left:50%;bottom:16px;transform:translateX(-50%);z-index:3;max-width:min(820px,94vw);padding:8px 14px;border-radius:12px;background:rgba(243,234,214,.97);border:2px solid #d8a838;font:15px/1.6 "Gowun Dodum",sans-serif;color:#2b1d12;text-align:center';ui.o.append(bar);
 const BTN="font:16px 'Do Hyeon',sans-serif;padding:8px 14px;border-radius:12px;border:0;cursor:pointer";
 const say=(h,bad)=>{bar.style.borderColor=bad?'#b8322a':'#d8a838';bar.innerHTML=h};
 const load=i=>{rd=i;phase='pick';sel=null;for(const s of seats){sc.remove(s.g)}seats.length=0;const r=ROUNDS[i];
  r.b.forEach((b,j)=>{const g=new T.Group();g.position.set(-5.4+j*3.6,0,-1);sc.add(g);const tb=new T.Mesh(new T.BoxGeometry(2,.7,1),M(0x6a4a2c));tb.position.set(.3,.35,.6);tb.castShadow=true;g.add(tb);
   const card=new T.Mesh(new T.PlaneGeometry(1.5,.71),new T.MeshBasicMaterial({toneMapped:false,map:cv(380,180,q=>{q.fillStyle='#fbf3dc';q.fillRect(0,0,380,180);q.strokeStyle='#3b2a1c';q.lineWidth=6;q.strokeRect(3,3,374,174);q.fillStyle='#8e2b20';q.font='bold 34px sans-serif';q.textAlign='center';q.fillText(b.who,190,50);q.fillStyle='#2b1d12';q.font='bold 32px sans-serif';q.fillText(`${b.p}냥 · 솜씨 ${b.q}`,190,104);q.font='26px sans-serif';q.fillStyle=b.doc?'#2f6a4a':'#7a6a5a';q.fillText(b.doc?'서류 묶음 있음':'서류 없음',190,152)})}));card.position.set(-.02,1.0,.78);card.rotation.x=-.55;g.add(card);
   /* 서류: 진짜 인증서는 금빛 테 액자, 말뿐·신청 중은 구겨진 종이 */if(b.doc){if(b.doc[1]){const fr=new T.Mesh(new T.BoxGeometry(.7,.9,.05),M(0xd8a838,{metalness:.6,roughness:.3}));fr.position.set(1.08,1.12,.55);fr.rotation.x=-.2;g.add(fr);const pp=new T.Mesh(new T.PlaneGeometry(.58,.76),new T.MeshBasicMaterial({toneMapped:false,map:cv(116,152,q=>{q.fillStyle='#fff8e4';q.fillRect(0,0,116,152);q.fillStyle='#3b2a1c';q.font='bold 18px sans-serif';q.textAlign='center';q.fillText('인 증',58,34);for(let k=0;k<4;k++)q.fillRect(18,52+k*16,80,4);q.strokeStyle='#c8352a';q.lineWidth=4;q.beginPath();q.arc(80,124,16,0,7);q.stroke()})}));pp.position.set(1.08,1.12,.58);pp.rotation.x=-.2;g.add(pp)}else{const pp=new T.Mesh(new T.PlaneGeometry(.6,.7),new T.MeshStandardMaterial({color:0xe8e0cc,side:T.DoubleSide,roughness:1}));pp.position.set(1.0,.72,.6);pp.rotation.set(-Math.PI/2+.2,0,.4);g.add(pp);const q2=new T.Mesh(new T.PlaneGeometry(.2,.2),new T.MeshBasicMaterial({color:0x8a7a6a}));q2.position.set(1.0,.73,.6);q2.rotation.x=-Math.PI/2;g.add(q2)}}
   const ring=new T.Mesh(new T.RingGeometry(1.2,1.4,32),new T.MeshBasicMaterial({color:0xffe08a,transparent:true,opacity:.0,side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.set(0,.03,.2);g.add(ring);
   const S={b,g,ring,j};g.traverse(o=>{if(o.isMesh)o.userData.seat=j});seats.push(S);
   if(H&&H.makeMuui)H.makeMuui(b.k,1.15).then(m=>{if(!alive||ROUNDS[rd]!==r){return}m.root.position.set(-1.25,0,.55);m.root.rotation.y=.35;g.add(m.root);m.play('idle');S.m=m;m.root.traverse(o=>{if(o.isMesh)o.userData.seat=j})}).catch(()=>{})});
  say(`<b>${r.n}</b> 입찰이에요. 예산 ${r.limit}냥 · 솜씨 ${r.need} 등급 이상. 값과 솜씨가 맞으면 <b>우선 구매 대상</b>(장애인 표준사업장·사회적 기업·여성 기업 등, 인증서가 있는 곳)과 계약해요. 업체를 눌러 살펴봐요.`)};
 const show=j=>{if(phase!=='pick')return;sel=j;const S=seats[j],b=S.b;for(const s of seats)s.ring.material.opacity=s===S?.7:0;try{E.SND&&E.SND.paper&&E.SND.paper()}catch(e){}
  say(`<b>${b.who}</b> · 견적 ${b.p}냥 · 솜씨 ${b.q}<br>서류: ${b.doc?(b.doc[1]?`<b style="color:#2f6a4a">${b.doc[0]}</b> (도장 찍힌 진짜 서류)`:`<b style="color:#b8322a">${b.doc[0]}</b>`):'우선 구매 서류 없음'}<div style="margin-top:8px;display:flex;gap:8px;justify-content:center"><button type="button" data-ok style="${BTN};background:#2f6a4a;color:#fff">이 업체와 계약</button><button type="button" data-bk style="${BTN};background:#fff4dc;color:#3b2a1c;border:2px solid #3b2a1c">다른 업체 보기</button></div>`);
  bar.querySelector('[data-ok]').onclick=()=>decide(j);bar.querySelector('[data-bk]').onclick=()=>{sel=null;S.ring.material.opacity=0;say('다른 업체를 눌러 살펴봐요.')}};
 const decide=j=>{const r=ROUNDS[rd],S=seats[j];tries++;const ok=j===r.ans;if(ok){if(tries===1)score++;phase='done1';blip(ac,out,660,880,.12,.08,'triangle');S.m&&S.m.play('cheer');S.ring.material.color.setHex(0x6ad08a);
   say(`<b>계약했어요!</b> ${S.b.who}는 값(${S.b.p}냥)과 솜씨(${S.b.q})가 기준에 맞고, <b>${S.b.doc[0]}</b>가 있는 진짜 우선 구매 대상이에요.<div style="margin-top:8px"><button type="button" data-nx style="${BTN};background:#3b2a1c;color:#f2d27a">${rd<ROUNDS.length-1?'다음 입찰':'결과 보기'}</button></div>`);bar.querySelector('[data-nx]').onclick=()=>{tries=0;if(rd<ROUNDS.length-1)load(rd+1);else finish()}}
  else{blip(ac,out,220,140,.1,.07,'square');S.ring.material.color.setHex(0xff7a6a);say(`<b>다시 생각해 봐요.</b> ${S.b.why}`,1);setTimeout(()=>{if(alive&&phase==='pick'){S.ring.material.color.setHex(0xffe08a);S.ring.material.opacity=0}},1800)}};
 const finish=()=>{phase='done';const stars=score===2?3:score===1?2:1;const coins=6+stars*7;E.ST.coins+=coins;E.ST.cards=E.ST.cards||{};E.ST.cards.prio=1;E.ST.prio=Math.max(E.ST.prio||0,stars);try{E.save&&E.save();E.hudDraw&&E.hudDraw();E.SND&&E.SND.fan&&E.SND.fan()}catch(e){}
  say(`<b>우선 구매 끝! ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</b> 두 입찰 가운데 ${score}번을 한 번에 맞혔어요 · 엽전 ${coins}냥.<br>공공기관은 중증장애인 생산품, 사회적 기업, 여성 기업 등의 물건을 일정 비율 넘게 사도록 정해져 있어요(우선 구매). 그래도 품질과 값은 맞아야 하고, 진짜 인증 서류가 있어야 해요. 「우선 구매」 카드가 열렸어요.<div style="margin-top:8px"><button type="button" data-x style="${BTN};background:#8e2b20;color:#fff4dc">마치기</button></div>`);bar.querySelector('[data-x]').onclick=close};
 const ray=new T.Raycaster(),mv=new T.Vector2();R.domElement.addEventListener('pointerdown',e=>{const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,cam);const h=ray.intersectObjects(sc.children,true).find(x=>x.object.userData.seat!=null);if(h)show(h.object.userData.seat)});
 load(0);
 let last=performance.now();const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  for(const s of seats)s.m&&s.m.mx.update(dt);hud.innerHTML=`입찰 ${Math.min(rd+1,2)} / 2<br>한 번에 맞힘 ${score}`;R.render(sc,cam);requestAnimationFrame(loop)};loop();
 const close=()=>{if(!alive)return;alive=false;try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 const scr=j=>{const s=seats[j];if(!s)return null;const v=new T.Vector3(0,.9,.6).add(s.g.position).project(cam);const r=R.domElement.getBoundingClientRect();return[r.left+(v.x+1)/2*r.width,r.top+(1-v.y)/2*r.height]};
 window.__PRIO={state:()=>({rd,phase,score,ans:ROUNDS[rd]&&ROUNDS[rd].ans,ready:seats.every(s=>s.m)}),scr,close};
 return{close}}
