/* 강진 무위사 마당(2026-11-23, 2단계 여섯째 묶음): 월출산 남쪽 무위사. 극락보전(국보, 1430)은 맞배지붕의 단정한 조선 초 건물.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   극락보전 안 아미타삼존벽화와 백의관음도: 한 노인(또는 파랑새)이 49일 동안 들여다보지 말라 하고 그림을 그리다, 스님이 마지막 날 엿보자 파랑새가 날아가 관음의 눈동자를 못 그렸다는 이야기가 전해 옴(전해 오는 이야기).
   선각대사탑비(보물, 946), 삼층석탑.
   놀이: 엿보지 말고 맞히기(덮개 판이 하나씩 걷히며 숨은 것이 조금씩 드러나요. 일찍 맞힐수록 높은 점수, 틀리면 감점, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildMuwi(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1430);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7a9a48,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 월출산 바위 봉우리 */for(let i=0;i<12;i++){const k=new THREE.Mesh(new THREE.ConeGeometry(6+r()*5,22+r()*16,5),M(0xb0aca0,{flatShading:true}));k.position.set(-60+i*11,11,-90-r()*10);k.rotation.y=r()*3;G.add(k)}
 const ST=M(0xa8a296),ST2=M(0x948e82),WOODB=M(0x8a7458),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50);
 const plaque=(x,y,z,txt,w=2)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 /* 맞배지붕 건물 */const gable=(x,z,W,D,PH,base=.8)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(W+1.4,base,D+1.4),ST);b.position.set(x,base/2,z);G.add(b);const w=new THREE.Mesh(new THREE.BoxGeometry(W,PH,D),WALLW);w.position.set(x,base+PH/2,z);G.add(w);for(let i=0;i<=3;i++)for(const j of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.2,.24,PH,10),WOODB);c.position.set(x-W/2+i*W/3,base+PH/2,z+j*D/2);G.add(c)}const sh=new THREE.Shape();sh.moveTo(-(D/2+1.4),0);sh.lineTo(0,PH*.75);sh.lineTo(D/2+1.4,0);sh.lineTo(-(D/2+1.4),0);const rf=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:W+1.6,bevelEnabled:false}),ROOF);rf.rotation.y=Math.PI/2;rf.position.set(x-(W+1.6)/2,base+PH,z);G.add(rf);solids.push({x0:x-W/2-.7,x1:x+W/2+.7,y0:0,y1:base+PH,z0:z-D/2-.7,z1:z+D/2+.7});return base+PH};
 /* 일주문 */{for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.3,.32,4,12),M(0x8a3a2a));c.position.set(s*2,2,44);G.add(c);solids.push({cx:s*2,cz:44,r:.35,y0:0,y1:4})}const rf=new THREE.Mesh(new THREE.ConeGeometry(1,1,4),ROOF);rf.rotation.y=Math.PI/4;rf.scale.set(4.3,1.5,2.2);rf.position.set(0,4.75,44);G.add(rf);plaque(0,3.5,44.9,'寺爲無山岬月',2.4)}
 sp(0,48,3,'일주문','월출산 무위사로 들어가는 문이에요.');
 /* 삼층석탑 */{const X=-6,Z=8;let y=0;const st=(w,h)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,w),ST);m.position.set(X,y+h/2,Z);G.add(m);y+=h};st(2.6,.5);st(2,.8);for(let i=0;i<3;i++){st(1-i*.13,.6-i*.08);st(1.7-i*.22,.2)}solids.push({cx:X,cz:Z,r:1.4,y0:0,y1:y})}
 sp(-6,12,2.6,'삼층석탑','극락보전 앞의 삼층석탑이에요.');
 /* 극락보전(맞배) */const KZ=-6;{const y=gable(0,KZ,10,7,3.6,1);plaque(0,y-.5,KZ+3.55,'殿寶樂極',2)}
 sp(0,KZ+7.5,3.4,'극락보전','1430년에 지은 조선 초 법당이에요(국보). 옆에서 보면 사람 인(人) 자 모양인 맞배지붕이 단정해요. 안에 아미타삼존벽화와 백의관음도가 있어요.');
 sp(5,KZ-6,2.6,'백의관음도 이야기','극락보전 뒷벽의 흰옷 입은 관음 그림에는 49일 동안 엿보지 말라던 화가가 파랑새로 날아가 눈동자를 못 그렸다는 이야기가 전해 와요(전해 오는 이야기). 지금 벽화는 따로 보존하고 있어요.');
 /* 선각대사탑비 */{const X=18,Z=-14;const tb=new THREE.Group();tb.position.set(X,0,Z);G.add(tb);const turtle=new THREE.Mesh(new THREE.SphereGeometry(1,14,10),ST2);turtle.scale.set(1,.5,1.5);turtle.position.y=.4;tb.add(turtle);const hd=new THREE.Mesh(new THREE.SphereGeometry(.33,10,8),ST2);hd.position.set(0,.5,1.5);tb.add(hd);const body=new THREE.Mesh(new THREE.BoxGeometry(.95,2,.25),M(0x6a6a68,{roughness:.6}));body.position.y=1.8;tb.add(body);const cap=new THREE.Mesh(new THREE.BoxGeometry(1.3,.5,.45),ST2);cap.position.y=3.05;tb.add(cap);solids.push({cx:X,cz:Z,r:1.2,y0:0,y1:3.3})}
 sp(18,-10,2.6,'선각대사탑비','946년에 세운 선각대사의 탑비예요(보물). 거북 받침과 용 머릿돌이 힘차요.');
 /* 엿보지 말고 맞히기(11/23) */const PX=-20,PZ=10;const pg=new THREE.Group();pg.position.set(PX,0,PZ);pg.visible=false;G.add(pg);
 const ITEMS=[['파랑새',g=>{const b=new THREE.Mesh(new THREE.SphereGeometry(.35,14,10),M(0x3a6ac8));b.scale.set(1.3,1,1);g.add(b);const h=new THREE.Mesh(new THREE.SphereGeometry(.2,12,10),M(0x3a6ac8));h.position.set(.42,.2,0);g.add(h);const bk=new THREE.Mesh(new THREE.ConeGeometry(.06,.18,6),M(0xe0b040));bk.rotation.z=-Math.PI/2;bk.position.set(.65,.18,0);g.add(bk);const w=new THREE.Mesh(new THREE.BoxGeometry(.5,.06,.4),M(0x2a4a9a));w.position.set(-.05,.15,.25);w.rotation.x=.5;g.add(w);const t=new THREE.Mesh(new THREE.BoxGeometry(.4,.05,.2),M(0x2a4a9a));t.position.set(-.55,.1,0);t.rotation.z=.3;g.add(t)}],
  ['정병과 버들가지',g=>{const pts=[];for(let k=0;k<=12;k++){const t=k/12;pts.push(new THREE.Vector2(.08+Math.sin(t*Math.PI)*.28*(t<.7?1:.3),t*.9))}const v=new THREE.Mesh(new THREE.LatheGeometry(pts,16),M(0x7a9a88,{metalness:.3}));v.position.y=-.45;g.add(v);const nk=new THREE.Mesh(new THREE.CylinderGeometry(.03,.04,.4,8),M(0x7a9a88));nk.position.y=.6;g.add(nk);for(let k=0;k<4;k++){const br=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.7,5),M(0x5a8a3a));br.position.set(-.1+k*.07,.85,0);br.rotation.z=.4-k*.25;g.add(br)}}],
  ['연꽃',g=>{for(let k=0;k<8;k++){const p=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),M(0xf0a0b8));p.scale.set(.5,1,.3);const a=k/8*Math.PI*2;p.position.set(Math.cos(a)*.22,Math.sin(a)*.22,0);p.rotation.z=a-Math.PI/2;g.add(p)}const c=new THREE.Mesh(new THREE.SphereGeometry(.12,10,8),M(0xe0c040));g.add(c)}],
  ['염주',g=>{for(let k=0;k<18;k++){const a=k/18*Math.PI*2;const b=new THREE.Mesh(new THREE.SphereGeometry(.06,8,6),M(0x6a3a22));b.position.set(Math.cos(a)*.42,Math.sin(a)*.42,0);g.add(b)}const t=new THREE.Mesh(new THREE.ConeGeometry(.06,.2,6),M(0xc84040));t.position.set(0,-.55,0);g.add(t)}],
  ['범종',g=>{const pts=[];for(let k=0;k<=10;k++){const t=k/10;pts.push(new THREE.Vector2(.25+Math.pow(t,1.6)*.18,.8-t*.8))}const b=new THREE.Mesh(new THREE.LatheGeometry(pts,20),M(0x5a7a62,{metalness:.5}));b.position.y=-.4;g.add(b)}],
  ['연잎',g=>{const l=new THREE.Mesh(new THREE.CircleGeometry(.45,20,.3,Math.PI*1.8),M(0x3a8a3a,{side:THREE.DoubleSide}));g.add(l)}],
  ['보살의 얼굴',g=>{const f=new THREE.Mesh(new THREE.SphereGeometry(.32,14,12),M(0xe8d0b0));f.scale.set(.85,1,.6);g.add(f);for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.BoxGeometry(.1,.02,.02),M(0x2a2622));e.position.set(s*.11,.05,.2);g.add(e)}const crown=new THREE.Mesh(new THREE.ConeGeometry(.25,.3,6),M(0xd8b040,{metalness:.6}));crown.position.y=.42;g.add(crown)}]];
 window.__MWPEEK=()=>{if(document.getElementById('mwpP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX,PZ+9,0)}catch(e){}pg.visible=true;
  const camA=()=>{const k=innerWidth<innerHeight?1.8:1;return[PX,1.6,PZ+2.6*k,PX,1.6,PZ,50]};window.__GCAM=()=>document.getElementById('sssX')?null:document.getElementById('mwpP')?camA():null;
  let rd=0,ans=0,opts=[],tiles=[],shown=0,tt=0,wrong=0,done=false,auto=false,last=performance.now(),wait=0,obj=null,order=[];const res=[];const NT=6,TS=.22,NR=3;
  const snd=(f,len=.1,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const clr=()=>{while(pg.children.length)pg.remove(pg.children[0]);tiles=[]};
  const newRound=()=>{clr();const idx=[...Array(ITEMS.length).keys()].sort(()=>r()-.5);ans=idx[0];opts=idx.slice(0,4).sort(()=>r()-.5);
   const frame=new THREE.Mesh(new THREE.BoxGeometry(NT*TS+.2,NT*TS+.2,.06),M(0x6a4a2a));frame.position.set(0,1.6,-.25);pg.add(frame);const bg=new THREE.Mesh(new THREE.PlaneGeometry(NT*TS,NT*TS),M(0xf0e6d0));bg.position.set(0,1.6,-.2);pg.add(bg);
   obj=new THREE.Group();ITEMS[ans][1](obj);obj.position.set(0,1.6,-.05);obj.rotation.y=-.3;pg.add(obj);
   for(let i=0;i<NT*NT;i++){const c=i%NT,rr=(i/NT)|0;const t=new THREE.Mesh(new THREE.BoxGeometry(TS*.98,TS*.98,.03),M([0x8a6a4a,0x7a5a3a][(c+rr)%2]));t.position.set((c-(NT-1)/2)*TS,1.6+((NT-1)/2-rr)*TS,.25);pg.add(t);tiles.push(t)}
   order=[...Array(NT*NT).keys()].sort(()=>r()-.5);shown=0;tt=0;wrong=0;ui()};
  const d=document.createElement('div');d.id='mwpP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#22283a;border:3px solid #6a9ae0;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef0f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#b8d0f8">🐦 엿보지 말고 맞히기 ${rd+1}/${NR}</b><div style="font-size:12px;margin:4px 0;line-height:1.5">덮개 판이 하나씩 걷혀요. 무엇이 숨어 있는지 알 것 같으면 아래에서 골라요. 일찍 맞힐수록 점수가 높아요!</div><div style="font-size:12px">걷힌 판 ${shown}/${NT*NT}</div><div style="font-size:13px;color:#b8d0f8;min-height:18px">${msg}</div><div>${opts.map(o=>`<button data-o="${o}" style="font:14px 'Do Hyeon',sans-serif;background:#6a9ae0;color:#fff;border:0;border-radius:8px;padding:5px 8px;margin:2px;cursor:pointer">${ITEMS[o][0]}</button>`).join('')}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#eef0f8;border:1px solid #eef0f8;border-radius:8px;padding:2px 8px;margin-top:4px;cursor:pointer">그만</button>`;d.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>guess(+b.dataset.o));d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const guess=o=>{if(done||wait>0)return;if(o===ans){const sc=Math.max(20,Math.round(100-shown/(NT*NT)*80-wrong*15));res.push(sc);tiles.forEach(t=>t.visible=false);wait=1.6;snd(760,.4,'sine');ui(`맞았어요! ${ITEMS[ans][0]}(${sc}점)`)}else{wrong++;snd(180,.25,'sawtooth');ui(`${ITEMS[o][0]}가 아니에요`)}};
  const cleanup=()=>{clr();pg.visible=false};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/res.length);const s2=Q>=80?3:Q>=55?2:Q>0?1:0;try{ctx.done('muwi_peek',Q,'엿보지 말고 맞히기')}catch(e){}window.__MWQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#b8d0f8">다 맞혔어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">무위사 백의관음도에는, 49일 동안 엿보지 말라던 약속을 어기자 그림 그리던 파랑새가 날아가 관음의 눈동자를 다 그리지 못했다는 이야기가 전해 와요(전해 오는 이야기). 끝까지 기다리는 마음도 중요하대요.</div><div style="font-size:24px;color:#6a9ae0">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#6a9ae0;color:#fff;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef0f8;border:2px solid #eef0f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__MWPEEK()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(wait<=0&&shown<NT*NT){tt+=dt;if(tt>.5){tt=0;tiles[order[shown]].visible=false;shown++;if(shown%4===0)ui()}}
   if(obj)obj.rotation.y=-.3+Math.sin(now/1200)*.15;
   if(auto&&wait<=0&&shown>=12)guess(ans);
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=NR){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);window.__MWG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},guess,get ans(){return ans},get shown(){return shown}};try{ctx.say('덮개가 걷히기 전에 무엇인지 맞혀 봐요!',2.4)}catch(e){}};
 spots.push({x:PX,y:0,z:PZ+3,r:2.6,t:'가린 그림 맞히는 자리',h:'덮개 판이 하나씩 걷히는 그림을 보고 무엇인지 맞혀 봐요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,47],[-6,3,12],[0,3,KZ+7],[18,3,-10],[PX,3,PZ+3]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'청자 조각',h:'강진에서 구운 고려청자 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.1,.07,.05,14,1,false,0,3.4),M(0x8ab0a0)))})},
  {n:'기와 조각',h:'절 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'안료 조각',h:'벽화에 쓰던 푸른 안료 덩어리예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.DodecahedronGeometry(.04),M(0x3a6ac8)))})},
  {n:'청동 풍경',h:'처마 끝에서 울리던 작은 종이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.03,.05,.09,10),M(0x5a7a62,{metalness:.5})))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(10,46,2.4,'발굴 탐지 자리','절 들머리 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__MWDIG=()=>{window.__DETECT&&window.__DETECT({key:'muwi_dig',title:'무위사 발굴 탐지',emoji:'⛏️',bg:'#22283a',count:4,TL:150,cand:[[-8,44],[12,36],[-12,24],[12,20],[-14,0],[14,2],[-24,-14],[30,-6],[6,-24],[-30,20]],items:DIG,intro:'무위사 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'무위사 극락보전은 조선 초 건축의 단정함을 잘 보여 주는 국보예요.'})};
 const meta={quest:{t:'무위사 둘러보기',d:'일주문을 지나 삼층석탑과 극락보전, 백의관음도 이야기와 선각대사탑비를 둘러보세요.',steps:[['일주문','일주문'],['삼층석탑','삼층석탑'],['극락보전','극락보전'],['관음도','백의관음도 이야기'],['탑비','선각대사탑비']]},
  title:'강진 무위사',hint:'월출산 무위사를 공개 사진으로 간추려 지었어요(배치·크기 어림). 덮개 판이 걷히는 그림을 보고 무엇인지 일찍 맞혀 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:50,lines:['강진 무위사','월출산 · 극락보전(국보)','백의관음도 · 파랑새 이야기','간추려 지음']}},
  npc:[['science',[[-6,48],[6,48],[6,54],[-6,54]]]],bounds:[-44,44,-36,60],level:()=>'강진 무위사',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:8,draw(g,X,Z,S){g.fillStyle='#7a9a48';g.fillRect(0,0,300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:52,yaw:Math.PI},size:{}},meta)}
