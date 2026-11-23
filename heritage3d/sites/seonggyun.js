/* 서울 성균관 문묘 마당(2026-11-23, 2단계 다섯째 묶음): 조선의 최고 교육기관 성균관(1398)과 공자 사당 문묘(사적).
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   앞쪽 제사 공간: 신삼문 → 대성전(보물)과 동무·서무. 뒤쪽 공부 공간: 명륜당(보물)과 앞 은행나무 두 그루(천연기념물, 1519년 대사성 윤탁이 심었다고 전함), 동재·서재(유생 기숙사), 존경각(책 곳간), 탕평비각(1742 영조).
   놀이: 탕평비 글 잇기(영조가 세운 탕평비의 한자 글귀를 뜻풀이를 보며 차례대로 비석에 새기기. 섞인 다른 글자도 있음, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {curvedRoof,buildHall} from './hallkit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildSeonggyun(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1398);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshStandardMaterial({map:GT,color:0x8aa258,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 const ST=M(0xa8a296),ST2=M(0x948e82),WOOD=M(0x8a3a2a),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50),WALL=M(0xb89880);
 const roof=(x,y,z,W,D,h)=>{curvedRoof(G,x,(y+h/2)-(h)/2,z,(W*.72)/.72,(D*.72)/.72,(h)*1.05)};
 const plaque=(x,y,z,txt,w=2)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 const hall=(x,z,W,D,PH,base=.6)=>{/* 11/23 품질: 흰 상자 벽+기둥 → hallkit 한옥 */const h=buildHall({x,z,W,D,nx:Math.max(1,Math.round(W/3)),nz:Math.max(1,Math.round(D/3.2)),FY:base,PH:PH,roof:'hip',pillar:0x6b4a2e,bracket:'ik',bare:true,plain:true,front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',mini,solids,light:false,roofScale:.9});G.add(h.group);return base+PH};
 const wallSeg=(x0,z0,x1,z1,h=2.2)=>{const L=Math.hypot(x1-x0,z1-z0);const w=new THREE.Mesh(new THREE.BoxGeometry(x1===x0?.5:L,h,z1===z0?.5:L),WALL);w.position.set((x0+x1)/2,h/2,(z0+z1)/2);G.add(w);solids.push({x0:Math.min(x0,x1)-.25,x1:Math.max(x0,x1)+.25,y0:0,y1:h,z0:Math.min(z0,z1)-.25,z1:Math.max(z0,z1)+.25})};
 /* 문묘(앞): 담 + 신삼문 + 대성전 + 동무·서무 */wallSeg(-20,44,-2,44);wallSeg(2,44,20,44);wallSeg(-20,44,-20,14);wallSeg(20,44,20,14);wallSeg(-20,14,-12,14);wallSeg(-8,14,8,14);wallSeg(12,14,20,14);
 {for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.BoxGeometry(.6,3,1.6),WALLW);p.position.set(s*2.2,1.5,44);G.add(p)}roof(0,3,44,6,3.6,1.4);plaque(0,2.8,44.85,'門三神',1.4)}
 sp(0,48,3,'신삼문','문묘로 들어가는 세 칸 문이에요. 가운데 문은 신(공자)이 드나드는 문이라 사람은 양옆 문으로 다녀요.');
 {const y=hall(0,24,14,7,3.6,1.2);plaque(0,y-.5,24+3.55,'殿成大',2)}hall(-15,32,3.4,12,2.4,.5);hall(15,32,3.4,12,2.4,.5);
 sp(0,32,3.4,'대성전','공자와 제자, 중국과 우리나라의 이름난 유학자의 위패를 모신 사당이에요(보물). 해마다 봄가을에 석전대제를 지내요.');
 /* 성균관(뒤): 명륜당 + 은행나무 + 동재·서재 + 존경각 + 탕평비각 */{const y=hall(0,-14,16,7,3.4,1);plaque(0,y-.5,-14+3.55,'堂倫明',2.2)}
 for(const s of[-1,1]){const X=s*8,Z=-1;const t=new THREE.Mesh(new THREE.CylinderGeometry(.9,1.3,9,10),M(0x5a4a38));t.position.set(X,4.5,Z);G.add(t);const c=new THREE.Mesh(new THREE.SphereGeometry(5,12,10),M(0xd8b830));c.scale.y=1.15;c.position.set(X,12,Z);G.add(c);solids.push({cx:X,cz:Z,r:1.3,y0:0,y1:9})}
 sp(0,-6,3.4,'명륜당','유생들이 모여 공부하던 강당이에요(보물). 「인륜을 밝힌다」는 뜻이에요.');sp(8,3.5,3,'은행나무','명륜당 앞의 오래된 은행나무 두 그루예요(천연기념물). 1519년에 대사성 윤탁이 심었다고 전해요. 공자가 은행나무 아래서 가르쳤다는 이야기를 따라 향교·서원에 은행나무를 심었어요.');
 hall(-16,-8,4,12,2.4,.5);hall(16,-8,4,12,2.4,.5);sp(-11,-8,2.6,'동재·서재','유생들이 묵던 기숙사예요. 아침저녁 식당에 가서 밥을 먹으면 원점 1점을 받았고, 원점이 300점은 되어야 과거(문과) 응시 자격이 생겼어요.');
 hall(12,-28,6,4,2.4,.6);sp(12,-23,2.6,'존경각','성균관의 책을 모아 둔 도서관이에요.');
 /* 탕평비각 + 탕평비 */const BX=-14,BZ=-26;{for(const[i,j]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.14,.16,2.8,8),WOOD);c.position.set(BX+i*1.3,1.4,BZ+j*1.3);G.add(c);solids.push({cx:BX+i*1.3,cz:BZ+j*1.3,r:.2,y0:0,y1:2.8})}roof(BX,2.8,BZ,3.6,3.6,1.3);const st=new THREE.Mesh(new THREE.BoxGeometry(.9,1.8,.3),M(0x4a4a48,{roughness:.6}));st.position.set(BX,1.2,BZ);G.add(st);const bs=new THREE.Mesh(new THREE.BoxGeometry(1.3,.3,.7),ST);bs.position.set(BX,.15,BZ);G.add(bs)}
 sp(BX,BZ+4,2.6,'탕평비','1742년 영조가 세운 비예요. 「두루 사귀되 편을 가르지 않는 것이 군자의 마음」이라는 글로, 붕당 싸움을 그치고 고르게 인재를 쓰자는 뜻을 새겼어요.');
 /* 탕평비 글 잇기(11/23) */const PX=-24,PZ=-12;const pg=new THREE.Group();pg.position.set(PX,0,PZ);pg.visible=false;G.add(pg);
 const ROUNDS=[{t:'周而弗比',m:'두루 사귀되 편을 가르지 않는다',ch:[['周','주','두루'],['而','이','~하되'],['弗','불','아니다'],['比','비','편 가르다']],ex:[]},
  {t:'乃君子之公心',m:'이것이 군자의 공평한 마음이다',ch:[['乃','내','이것이 곧'],['君','군','군자의 군'],['子','자','군자의 자'],['之','지','~의'],['公','공','공평한'],['心','심','마음']],ex:[['私','사','사사로운']]},
  {t:'比而弗周寔小人之私意',m:'편을 가르고 두루 사귀지 않는 것은 소인의 사사로운 생각이다',ch:[['比','비','편 가르다'],['而','이','~하되'],['弗','불','아니다'],['周','주','두루'],['寔','식','이것은'],['小','소','작은'],['人','인','사람'],['之','지','~의'],['私','사','사사로운'],['意','의','생각']],ex:[['公','공','공평한'],['心','심','마음']]}];
 window.__SGTANG=()=>{if(document.getElementById('sgkP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX,PZ+10,0)}catch(e){}pg.visible=true;
  let rd=0,R=null,tiles=[],slots=[],pos=0,mist=0,done=false,auto=false,last=performance.now(),t0=0,wait=0;const res=[];
  const camA=()=>{const k=innerWidth<innerHeight?1.8:1;return[PX,1.7,PZ+3.4*k,PX,1.45,PZ,50]};window.__GCAM=()=>document.getElementById('sgkP')?camA():null;
  const snd=(f,len=.1,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const tileTex=(c,read,mean,cut)=>tex(128,160,(q,w,h)=>{q.fillStyle=cut?'#4a4a48':'#d8d0bc';q.fillRect(0,0,w,h);q.fillStyle=cut?'#f0e8d0':'#2a2418';q.font='bold 78px serif';q.textAlign='center';q.fillText(c,w/2,84);if(!cut){q.font='bold 24px sans-serif';q.fillText(read,w/2,118);q.font='18px sans-serif';q.fillText(mean,w/2,146)}});
  const clr=()=>{while(pg.children.length)pg.remove(pg.children[0]);tiles=[];slots=[]};
  const newRound=()=>{clr();R=ROUNDS[rd];pos=0;mist=0;const n=R.ch.length;const cols=n>6?2:1;const per=Math.ceil(n/cols);
   const stele=new THREE.Mesh(new THREE.BoxGeometry(cols*.42+.3,per*.36+.4,.25),M(0x4a4a48,{roughness:.6}));stele.position.set(0,1.45+.0,-.4);pg.add(stele);const base=new THREE.Mesh(new THREE.BoxGeometry(cols*.42+.7,.3,.7),ST);base.position.set(0,1.45-(per*.36+.4)/2-.15,-.4);pg.add(base);
   for(let i=0;i<n;i++){const col=(i/per)|0,row=i%per;const m=new THREE.Mesh(new THREE.PlaneGeometry(.34,.32),new THREE.MeshBasicMaterial({color:0x3a3a38}));m.position.set((cols-1)*.21-col*.42,1.45+(per-1)/2*.36-row*.36,-.27);pg.add(m);slots.push(m)}
   const all=[...R.ch.map((c,i)=>({c,i})),...R.ex.map(c=>({c,i:-1}))].sort(()=>r()-.5);const nt=all.length;const tcols=Math.min(6,nt),trows=Math.ceil(nt/tcols);
   all.forEach((o,k)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.3,.38,.06),[M(0xc8c0ac),M(0xc8c0ac),M(0xc8c0ac),M(0xc8c0ac),new THREE.MeshBasicMaterial({map:tileTex(o.c[0],o.c[1],o.c[2],false)}),M(0xc8c0ac)]);const col=k%tcols,row=(k/tcols)|0;m.position.set((col-(tcols-1)/2)*.36,.95-row*.44,.55);m.rotation.x=-.35;m.userData.k=k;pg.add(m);tiles.push({m,o,used:false})});
   const shelf=new THREE.Mesh(new THREE.BoxGeometry(tcols*.36+.3,.06,trows*.44+.2),M(0x6a4a2a));shelf.position.set(0,.72-(trows-1)*.22,.6);pg.add(shelf);
   t0=performance.now()/1000;ui()};
  const d=document.createElement('div');d.id='sgkP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2418;border:3px solid #c8a868;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d890">📜 탕평비 글 잇기 ${rd+1}/3</b><div style="font-size:13px;margin:4px 0;line-height:1.5">뜻: 「${R.m}」</div><div style="font-size:12px;opacity:.9">아래 글자 돌의 음과 뜻을 보고, 비석 위에서부터(오른쪽 줄 먼저) 차례대로 글자를 눌러 새겨요.${R.ex.length?' 안 쓰는 글자도 섞여 있어요!':''}</div><div style="font:18px 'Do Hyeon',sans-serif;margin:4px 0;letter-spacing:2px">${R.ch.slice(0,pos).map(c=>c[0]).join('')}<span style="opacity:.3">${'□'.repeat(R.ch.length-pos)}</span></div><div style="font-size:13px;color:#f0d890;min-height:18px">${msg}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:1px solid #f4ecd8;border-radius:8px;padding:2px 8px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const tap=k=>{if(done||wait>0)return;const T=tiles[k];if(T.used)return;const need=R.ch[pos];if(T.o.c[0]===need[0]){T.used=true;T.m.visible=false;slots[pos].material=new THREE.MeshBasicMaterial({map:tileTex(need[0],'','',true)});pos++;snd(420+pos*30,.12);if(pos>=R.ch.length){wait=1.4;snd(700,.4,'sine');ui('글귀를 다 새겼어요: '+R.t)}else ui()}else{mist++;snd(180,.25,'sawtooth');T.m.position.x+=.03;setTimeout(()=>{T.m.position.x-=.03},120);ui(`「${T.o.c[0]}(${T.o.c[1]}, ${T.o.c[2]})」는 지금 자리가 아니에요`)}};
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,200);const rc=new THREE.Raycaster();const ov=document.createElement('div');ov.id='sgkO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  ov.onpointerdown=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(tiles.filter(t=>!t.used).map(t=>t.m),false)[0];if(h)tap(h.object.userData.k)};
  const cleanup=()=>{ov.remove();clr();pg.visible=false};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3);const s2=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('seonggyun_tang',Q,'탕평비 글 잇기')}catch(e){}window.__SGKQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0d890">탕평비 글을 다 새겼어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">周而弗比 乃君子之公心 比而弗周 寔小人之私意 — 『논어』의 구절을 바탕으로, 영조가 성균관 유생들에게 붕당을 짓지 말라고 당부한 글이에요. 「탕평」은 고르고 평평하다는 뜻이에요.</div><div style="font-size:24px;color:#c8a868">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a868;color:#2a2418;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__SGTANG()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  let at=0;const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(auto&&wait<=0){at+=dt;if(at>.25){at=0;const k=tiles.findIndex(t=>!t.used&&t.o.c[0]===R.ch[pos][0]);if(k>=0)tap(k)}}
   if(wait>0){wait-=dt;if(wait<=0){const el=performance.now()/1000-t0;res.push(Math.max(30,Math.round(100-mist*8-Math.max(0,el-15-rd*15)*.4)));rd++;if(rd>=3){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);window.__SGKG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},get pos(){return pos},scr:k=>{setPC();const v=new THREE.Vector3();tiles[k].m.getWorldPosition(v);v.project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]},right:()=>tiles.findIndex(t=>!t.used&&t.o.c[0]===R.ch[pos][0])};try{ctx.say('탕평비 글을 차례대로 새겨 봐요!',2.4)}catch(e){}};
 spots.push({x:PX,y:0,z:PZ+3,r:2.6,t:'비석 새기는 자리',h:'탕평비 글귀를 뜻을 보며 차례대로 새겨 봐요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,47],[0,3,31],[0,3,-5],[BX,2.4,BZ+3],[PX,3,PZ+3]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'벼루 조각',h:'유생이 먹을 갈던 돌 벼루 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.16,.03,.1),M(0x2e2e30)))})},
  {n:'백자 연적',h:'벼루에 물을 따르던 작은 백자 연적이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.05,12,8),M(0xf0ece0,{roughness:.3})))})},
  {n:'은행 열매',h:'명륜당 앞 은행나무 열매예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),M(0xe0c060)))})},
  {n:'기와 조각',h:'성균관 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'상평통보',h:'조선 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x8a6a3a,{metalness:.6})))})}];
 sp(10,50,2.4,'발굴 탐지 자리','성균관 앞 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__SGKDIG=()=>{window.__DETECT&&window.__DETECT({key:'seonggyun_dig',title:'성균관 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[-12,50],[14,52],[-26,30],[26,30],[-6,6],[14,6],[-26,-2],[26,-2],[0,-30],[-30,-20]],items:DIG,intro:'성균관 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'성균관은 조선의 최고 교육기관으로, 지금도 문묘에서 석전대제를 지내요.'})};
 const meta={quest:{t:'성균관 문묘 둘러보기',d:'신삼문으로 문묘에 들어가 대성전을 보고, 뒤 명륜당·은행나무·동재·존경각·탕평비를 둘러보세요.',steps:[['신삼문','신삼문'],['대성전','대성전'],['명륜당','명륜당'],['은행나무','은행나무'],['동재','동재·서재'],['존경각','존경각'],['탕평비','탕평비']]},
  title:'서울 성균관 문묘',hint:'성균관과 문묘를 공개 사진으로 간추려 지었어요(배치·크기 어림). 탕평비 옆에서 영조의 탕평비 글귀를 차례대로 새겨 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:54,lines:['서울 성균관 문묘','1398 · 조선 최고 교육기관','대성전 · 명륜당 · 탕평비','간추려 지음']}},
  npc:[['science',[[-6,52],[6,52],[6,58],[-6,58]]]],bounds:[-44,44,-40,62],level:()=>'서울 성균관 문묘',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.6,ox:0,oz:8,draw(g,X,Z,S){g.fillStyle='#8aa258';g.fillRect(0,0,300,300);g.strokeStyle='#b89880';g.lineWidth=2;g.strokeRect(X(-20),Z(44),40*S,30*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:56,yaw:Math.PI},size:{}},meta)}
