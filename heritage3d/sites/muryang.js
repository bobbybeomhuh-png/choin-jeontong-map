/* 부여 무량사 마당(2026-11-23, 2단계 일곱째 묶음): 만수산 무량사. 극락전(보물)은 겉으로 두 층인 드문 불전(안은 한 층으로 트임).
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   극락전 앞 오층석탑(보물)과 석등(보물). 「금오신화」를 쓴 매월당 김시습이 말년을 보내고 세상을 떠난 절(김시습 부도, 영정을 모신 영각).
   놀이: 매월당 수수께끼(숨겨 둔 오방색 구슬 네 개의 순서를, 맞힐 때마다 받는 실마리(●자리까지 맞음 ○빛깔만 맞음)로 추리해 맞혀요. 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildMuryang(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1493);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7c984a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 만수산 */for(let i=0;i<9;i++){const h=new THREE.Mesh(new THREE.SphereGeometry(22+r()*10,14,8,0,Math.PI*2,0,Math.PI/2),M(0x4a6a3a,{flatShading:true}));h.scale.y=.6;h.position.set(-80+i*20,0,-96-r()*12);G.add(h)}
 const ST=M(0xa8a296),ST2=M(0x948e82),WOODB=M(0x8a7458),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50),DAN=M(0x8a3a2a);
 const plaque=(x,y,z,txt,w=2)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 const hipRoof=(x,z,W,D,y,H)=>{const rf=new THREE.Mesh(new THREE.ConeGeometry(1,1,4),ROOF);rf.rotation.y=Math.PI/4;rf.scale.set((W+2.4)*.72,H,(D+2.4)*.72);rf.position.set(x,y+H/2-.15,z);G.add(rf)};
 const hall=(x,z,W,D,PH,base=.8)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(W+1.4,base,D+1.4),ST);b.position.set(x,base/2,z);G.add(b);const w=new THREE.Mesh(new THREE.BoxGeometry(W,PH,D),WALLW);w.position.set(x,base+PH/2,z);G.add(w);for(let i=0;i<=3;i++)for(const j of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.2,.24,PH,10),WOODB);c.position.set(x-W/2+i*W/3,base+PH/2,z+j*D/2);G.add(c)}hipRoof(x,z,W,D,base+PH,PH*.75);solids.push({x0:x-W/2-.7,x1:x+W/2+.7,y0:0,y1:base+PH,z0:z-D/2-.7,z1:z+D/2+.7});return base+PH};
 /* 일주문 */{for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.3,.32,4,12),DAN);c.position.set(s*2,2,46);G.add(c);solids.push({cx:s*2,cz:46,r:.35,y0:0,y1:4})}const rf=new THREE.Mesh(new THREE.ConeGeometry(1,1,4),ROOF);rf.rotation.y=Math.PI/4;rf.scale.set(4.3,1.5,2.2);rf.position.set(0,4.75,46);G.add(rf);plaque(0,3.5,46.9,'寺量無山壽萬',2.4)}
 sp(0,50,3,'일주문','만수산 무량사로 들어가는 문이에요.');
 /* 천왕문 */{const Z=32;for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.BoxGeometry(2.4,3,3.4),WALLW);w.position.set(s*2.4,1.5,Z);G.add(w);solids.push({x0:s*2.4-1.3,x1:s*2.4+1.3,y0:0,y1:3,z0:Z-1.8,z1:Z+1.8})}hipRoof(0,Z,7.2,3.4,3,1.5);plaque(0,2.6,Z+1.75,'門王天',1.4)}
 sp(0,36,3,'천왕문','네 사천왕이 지키는 문이에요.');
 /* 극락전(겉 두 층) */const KZ=-4;{const W=13,D=9,base=1.2;const b=new THREE.Mesh(new THREE.BoxGeometry(W+1.6,base,D+1.6),ST);b.position.set(0,base/2,KZ);G.add(b);const w1=new THREE.Mesh(new THREE.BoxGeometry(W,4,D),WALLW);w1.position.set(0,base+2,KZ);G.add(w1);for(let i=0;i<=4;i++)for(const j of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.24,.28,4,10),WOODB);c.position.set(-W/2+i*W/4,base+2,KZ+j*D/2);G.add(c)}
  hipRoof(0,KZ,W,D,base+4,1.3);const w2=new THREE.Mesh(new THREE.BoxGeometry(W*.72,3.7,D*.66),M(0xd8ccb0));w2.position.set(0,base+4+1.85,KZ);G.add(w2);hipRoof(0,KZ,W*.72,D*.66,base+4+1.3+2.4,3);plaque(0,base+4+1.3+1.6,KZ+D*.33+.05,'殿樂極',1.8);solids.push({x0:-W/2-.8,x1:W/2+.8,y0:0,y1:base+4,z0:KZ-D/2-.8,z1:KZ+D/2+.8})}
 sp(0,KZ+8,3.4,'극락전','겉으로는 두 층인데 안은 한 층으로 시원하게 트인 드문 불전이에요(보물). 아주 큰 소조 아미타삼존불이 모셔져 있어요.');
 /* 오층석탑·석등 */{let y=0;const X=0,Z=12;const st=(w,h)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,w),ST);m.position.set(X,y+h/2,Z);G.add(m);y+=h};st(3.4,.5);st(2.6,.9);for(let i=0;i<5;i++){st(1.3-i*.12,.6-i*.06);st(2.4-i*.25,.2)}solids.push({cx:X,cz:Z,r:1.8,y0:0,y1:y});
  const L=new THREE.Group();L.position.set(0,0,7.2);G.add(L);const bs=new THREE.Mesh(new THREE.CylinderGeometry(.5,.6,.4,8),ST);bs.position.y=.2;L.add(bs);const pl=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,1.2,8),ST);pl.position.y=1;L.add(pl);const fb=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,.7,8),ST2);fb.position.y=1.95;L.add(fb);const lc=new THREE.Mesh(new THREE.ConeGeometry(.75,.4,8),ST);lc.position.y=2.5;L.add(lc);solids.push({cx:0,cz:7.2,r:.7,y0:0,y1:2.7})}
 sp(-4,12,2.6,'오층석탑','극락전 앞의 고려 오층석탑이에요(보물). 넓적한 지붕돌이 백제 탑을 닮았어요.');
 /* 영각(김시습 영정) */{const y=hall(-20,6,5,4,2.8,.7);plaque(-20,y-.4,8.05,'閣影',1)}
 sp(-20,10.5,2.4,'김시습 영각','「금오신화」를 쓴 매월당 김시습은 무량사에서 말년을 보내다 세상을 떠났어요. 스스로 그린 초상(보물)을 모셨어요.');
 /* 김시습 부도 */{const X=-24,Z=-20;const g=new THREE.Group();g.position.set(X,0,Z);G.add(g);let y=0;const oc=(rb,rt,h,m=ST)=>{const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,8),m);o.position.y=y+h/2;g.add(o);y+=h};oc(1.2,1.1,.3);oc(.8,.7,.5);oc(.95,.95,.25);oc(.55,.55,.8,ST2);const rf=new THREE.Mesh(new THREE.ConeGeometry(1,.45,8),ST2);rf.position.y=y+.22;g.add(rf);solids.push({cx:X,cz:Z,r:1.3,y0:0,y1:y+.5})}
 sp(-24,-16.5,2.4,'김시습 부도','매월당 김시습의 사리를 모신 승탑이에요. 조금 떨어진 언덕에 있어요.');
 /* 매월당 수수께끼(11/23) */const PX=20,PZ=12;const pg=new THREE.Group();pg.position.set(PX,0,PZ);pg.visible=false;G.add(pg);
 const COL=[['청',0x2a5ac8],['적',0xc83a2a],['황',0xe0b830],['백',0xf4f0e6],['흑',0x2a2622]];
 window.__MRRIDDLE=()=>{if(document.getElementById('mrrP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX+7,PZ+5,0)}catch(e){}pg.visible=true;
  const L=4,MAXT=8;const camA=()=>{const k=innerWidth<innerHeight?1.35:1;return[PX,4.6*k+1.2,PZ+3.6*k+.8,PX,.6,PZ-1.2,50]};window.__GCAM=()=>document.getElementById('sssX')?null:document.getElementById('mrrP')?camA():null;
  let rd=0,code=[],tries=[],cur=[],done=false,auto=false,last=performance.now(),wait=0,aT=0;const res=[];const NR=3;
  const snd=(f,len=.1,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const ALL=[];(function p(a){if(a.length===L){ALL.push(a.slice());return}for(let c=0;c<5;c++)if(!a.includes(c)){a.push(c);p(a);a.pop()}})([]);
  const fb=(g,c)=>{let b=0,w=0;for(let i=0;i<L;i++){if(g[i]===c[i])b++;else if(c.includes(g[i]))w++}return[b,w]};
  const clr=()=>{while(pg.children.length)pg.remove(pg.children[0])};
  const SPH=new THREE.SphereGeometry(.17,14,10),SM=new THREE.SphereGeometry(.07,8,6);
  const draw=()=>{clr();const tb=new THREE.Mesh(new THREE.BoxGeometry(3.2,.12,MAXT*.46+.9),M(0x6a4a2a));tb.position.set(0,.7,-MAXT*.23+.2);pg.add(tb);for(const s of[-1,1])for(const t of[-1,1]){const lg=new THREE.Mesh(new THREE.BoxGeometry(.12,.64,.12),M(0x5a3a22));lg.position.set(s*1.4,.32,t*(MAXT*.23)-MAXT*.23+.2);pg.add(lg)}
   /* 덮인 답 자리 */for(let i=0;i<L;i++){const cv=new THREE.Mesh(done||wait>0?SPH:new THREE.BoxGeometry(.36,.2,.36),done||wait>0?M(COL[code[i]][1],{roughness:.4}):M(0x3a2a1a));cv.position.set(-1.05+i*.5,.86,-MAXT*.46+.15);pg.add(cv)}
   const rows=tries.concat(cur.length?[[cur,null]]:[]);rows.forEach(([g,f],ti)=>{const z=.35-ti*.46;g.forEach((c,i)=>{const s=new THREE.Mesh(SPH,M(COL[c][1],{roughness:.4}));s.position.set(-1.05+i*.5,.9,z);pg.add(s)});if(f){let k=0;for(let q=0;q<f[0];q++,k++){const s=new THREE.Mesh(SM,M(0x111111));s.position.set(1.0+(k%2)*.18,.82,z-.08+((k/2)|0)*.16);pg.add(s)}for(let q=0;q<f[1];q++,k++){const s=new THREE.Mesh(SM,M(0xffffff));s.position.set(1.0+(k%2)*.18,.82,z-.08+((k/2)|0)*.16);pg.add(s)}}})};
  const newRound=()=>{const a=[0,1,2,3,4].sort(()=>r()-.5);code=a.slice(0,L);tries=[];cur=[];draw();ui()};
  const d=document.createElement('div');d.id='mrrP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#24222e;border:3px solid #a890d8;border-radius:16px;padding:12px 14px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f0eef6;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const fbTxt=f=>'●'.repeat(f[0])+'○'.repeat(f[1])||'없음';
  const ui=(msg='')=>{if(done)return;const hex=c=>'#'+COL[c][1].toString(16).padStart(6,'0');d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#d0c0f4">🔮 매월당 수수께끼 ${rd+1}/${NR}</b><div style="font-size:12px;margin:4px 0;line-height:1.5">덮어 둔 오방색 구슬 네 개(같은 빛깔 없음)의 순서를 맞혀요. ● 빛깔·자리 다 맞음, ○ 빛깔만 맞음. ${MAXT}번 안에!</div><div style="font-size:12px">${tries.map(([g,f])=>g.map(c=>COL[c][0]).join('')+' '+fbTxt(f)).slice(-3).join(' · ')}</div><div style="margin:4px 0;font-size:18px;letter-spacing:4px">${[0,1,2,3].map(i=>cur[i]!=null?`<span style="color:${hex(cur[i])};text-shadow:0 0 2px #fff">●</span>`:'◌').join('')}</div><div>${COL.map((c,i)=>`<button data-c="${i}" ${cur.includes(i)?'disabled':''} style="font:14px 'Do Hyeon',sans-serif;background:${hex(i)};color:${i===3||i===2?'#222':'#fff'};border:0;border-radius:8px;width:38px;height:34px;margin:2px;cursor:pointer;opacity:${cur.includes(i)?.35:1}">${c[0]}</button>`).join('')}</div><button data-b style="font:13px 'Do Hyeon',sans-serif;background:#555;color:#fff;border:0;border-radius:8px;padding:4px 10px;margin:3px;cursor:pointer">지우기</button><button data-g style="font:13px 'Do Hyeon',sans-serif;background:#a890d8;color:#fff;border:0;border-radius:8px;padding:4px 10px;margin:3px;cursor:pointer">맞혀 보기</button><div style="font-size:13px;color:#d0c0f4;min-height:18px">${msg}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#f0eef6;border:1px solid #f0eef6;border-radius:8px;padding:2px 8px;cursor:pointer">그만</button>`;
   d.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>pick(+b.dataset.c));d.querySelector('[data-b]').onclick=()=>{cur.pop();draw();ui()};d.querySelector('[data-g]').onclick=()=>guess();d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const pick=c=>{if(done||wait>0||cur.length>=L||cur.includes(c))return;cur.push(c);snd(400+c*80,.08);draw();ui()};
  const guess=()=>{if(done||wait>0)return;if(cur.length<L){ui('구슬 네 개를 먼저 골라요');return}const f=fb(cur,code);tries.push([cur.slice(),f]);cur=[];snd(f[0]===L?760:300+f[0]*80,.2,'sine');
   if(f[0]===L||tries.length>=MAXT){const win=f[0]===L;const sc=win?Math.max(30,Math.round(100-Math.max(0,tries.length-3)*14)):15;res.push(sc);wait=2.2;draw();ui(win?`맞혔어요! ${tries.length}번 만에(${sc}점)`:`아쉬워요. 답은 ${code.map(c=>COL[c][0]).join('')}`);return}draw();ui(`실마리: ${fbTxt(f)}`)};
  const cleanup=()=>{clr();pg.visible=false};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/res.length);const s2=Q>=80?3:Q>=55?2:Q>0?1:0;try{ctx.done('muryang_riddle',Q,'매월당 수수께끼')}catch(e){}window.__MRRQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#d0c0f4">수수께끼를 풀었어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">매월당 김시습은 다섯 살에 시를 지어 '오세 신동'이라 불렸고, 우리나라 첫 한문 소설 「금오신화」를 썼어요. 무량사에서 생을 마쳤어요.</div><div style="font-size:24px;color:#a890d8">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#a890d8;color:#fff;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f0eef6;border:2px solid #f0eef6;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__MRRIDDLE()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(auto&&wait<=0){aT-=dt;if(aT<=0){aT=.4;const cand=ALL.filter(c=>tries.every(([g,f])=>{const x=fb(g,c);return x[0]===f[0]&&x[1]===f[1]}));const g=tries.length?cand[(r()*cand.length)|0]:[0,1,2,3];cur=g.slice();guess()}}
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=NR){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);
  window.__MRRG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},pick,guess,get code(){return code.slice()},get tries(){return tries.length}};try{ctx.say('실마리로 구슬 순서를 추리해 봐요!',2.4)}catch(e){}};
 spots.push({x:PX,y:0,z:PZ+3,r:2.6,t:'수수께끼 푸는 자리',h:'매월당이 덮어 둔 오방색 구슬의 순서를 실마리로 추리해 봐요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,49],[0,3,35],[0,3,KZ+8],[-4,3,12],[-20,3,10],[-24,3,-17],[PX,3,PZ+3]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 const lampF=new THREE.PointLight(0xffb060,0,8,1.6);lampF.position.set(0,1.95,7.2);G.add(lampF);
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8);lampF.intensity=nk*6};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'기와 조각',h:'절 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'붓두껍',h:'글 쓰던 붓을 끼우던 뚜껑이에요. 매월당을 떠올려 봐요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,.14,8),M(0x6a4a2a)))})},
  {n:'백제 기와 조각',h:'연꽃무늬가 찍힌 백제 수막새 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.03,14),M(0x7a7a72)))})},
  {n:'흙 등잔',h:'기름을 부어 불 밝히던 작은 등잔이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.07,.05,.04,12),M(0x8a6a4a)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(12,42,2.4,'발굴 탐지 자리','절 들머리 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__MRDIG=()=>{window.__DETECT&&window.__DETECT({key:'muryang_dig',title:'무량사 발굴 탐지',emoji:'⛏️',bg:'#24222e',count:4,TL:150,cand:[[-8,40],[10,38],[-12,22],[12,26],[-8,-18],[10,-16],[30,-4],[-32,20],[30,32],[-30,36]],items:DIG,intro:'무량사 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'무량사 극락전은 겉은 두 층, 안은 한 층으로 트인 드문 건물이에요(보물).'})};
 const meta={quest:{t:'무량사 둘러보기',d:'일주문과 천왕문을 지나 석등과 오층석탑, 두 층 극락전, 김시습 영각과 부도를 둘러보세요.',steps:[['일주문','일주문'],['천왕문','천왕문'],['석탑','오층석탑'],['극락전','극락전'],['영각','김시습 영각'],['부도','김시습 부도']]},
  title:'부여 무량사',hint:'만수산 무량사를 공개 사진으로 간추려 지었어요(배치·크기 어림). 매월당이 덮어 둔 구슬 순서를 실마리로 추리해 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:52,lines:['부여 무량사','만수산 · 극락전(보물)','매월당 김시습','간추려 지음']}},
  npc:[['science',[[-6,50],[6,50],[6,56],[-6,56]]]],bounds:[-44,44,-34,60],level:()=>'부여 무량사',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:10,draw(g,X,Z,S){g.fillStyle='#7c984a';g.fillRect(0,0,300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:54,yaw:Math.PI},size:{}},meta)}
