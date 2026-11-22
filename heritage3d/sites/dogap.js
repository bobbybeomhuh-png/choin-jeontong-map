/* 영암 도갑사 마당(2026-11-23, 2단계 여섯째 묶음): 월출산 서남쪽 도갑사. 해탈문(국보, 1473)은 맞배지붕 세 칸 문으로 양쪽에 금강역사가 서 있어요.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   도선국사·수미왕사비(보물, 1653, 거북 받침), 오층석탑, 미륵전 석조여래좌상, 절 앞 계곡.
   도선국사 어머니가 냇물에 떠내려온 오이를 먹고 도선을 낳았다는 이야기가 전해 옴(전해 오는 이야기).
   놀이: 계곡 물길 건너기(물살에 떠내려가는 통나무·연잎을 밟고 줄마다 건너요. 물에 빠지면 처음부터, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildDogap(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1473);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7a9448,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 월출산 바위 봉우리 */for(let i=0;i<13;i++){const k=new THREE.Mesh(new THREE.ConeGeometry(6+r()*5,24+r()*18,5),M(0xb4b0a4,{flatShading:true}));k.position.set(-66+i*11,12,-92-r()*10);k.rotation.y=r()*3;G.add(k)}
 const ST=M(0xa8a296),ST2=M(0x948e82),WOODB=M(0x8a7458),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50),DAN=M(0x8a3a2a);
 const plaque=(x,y,z,txt,w=2)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 const gableRoof=(x,z,W,D,y,PH)=>{const sh=new THREE.Shape();sh.moveTo(-(D/2+1.2),0);sh.lineTo(0,PH);sh.lineTo(D/2+1.2,0);sh.lineTo(-(D/2+1.2),0);const rf=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:W+1.6,bevelEnabled:false}),ROOF);rf.rotation.y=Math.PI/2;rf.position.set(x-(W+1.6)/2,y,z);G.add(rf)};
 const hall=(x,z,W,D,PH,base=.8,roofT='gable')=>{const b=new THREE.Mesh(new THREE.BoxGeometry(W+1.4,base,D+1.4),ST);b.position.set(x,base/2,z);G.add(b);const w=new THREE.Mesh(new THREE.BoxGeometry(W,PH,D),WALLW);w.position.set(x,base+PH/2,z);G.add(w);for(let i=0;i<=3;i++)for(const j of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.2,.24,PH,10),WOODB);c.position.set(x-W/2+i*W/3,base+PH/2,z+j*D/2);G.add(c)}
  if(roofT==='gable')gableRoof(x,z,W,D,base+PH,PH*.7);else{const rf=new THREE.Mesh(new THREE.ConeGeometry(1,1,4),ROOF);rf.rotation.y=Math.PI/4;rf.scale.set((W+2.4)*.72,PH*.75,(D+2.4)*.72);rf.position.set(x,base+PH+PH*.37,z);G.add(rf)}
  solids.push({x0:x-W/2-.7,x1:x+W/2+.7,y0:0,y1:base+PH,z0:z-D/2-.7,z1:z+D/2+.7});return base+PH};
 /* 일주문 */{for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.3,.32,4,12),DAN);c.position.set(s*2,2,50);G.add(c);solids.push({cx:s*2,cz:50,r:.35,y0:0,y1:4})}const rf=new THREE.Mesh(new THREE.ConeGeometry(1,1,4),ROOF);rf.rotation.y=Math.PI/4;rf.scale.set(4.3,1.5,2.2);rf.position.set(0,4.75,50);G.add(rf);plaque(0,3.5,50.9,'寺岬道山出月',2.4)}
 sp(0,54,3,'일주문','월출산 도갑사로 들어가는 문이에요.');
 /* 해탈문(맞배, 가운데 칸 열림, 양옆 칸에 금강역사) */const HZ=34;{const W=8,D=4,PH=3.2,base=.5;const b=new THREE.Mesh(new THREE.BoxGeometry(W+1,base,D+1),ST);b.position.set(0,base/2,HZ);G.add(b);
  for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.BoxGeometry(W/3-.2,PH,D),WALLW);w.position.set(s*W/3,base+PH/2,HZ);G.add(w);solids.push({x0:s*W/3-W/6-.1,x1:s*W/3+W/6+.1,y0:0,y1:base+PH,z0:HZ-D/2-.5,z1:HZ+D/2+.5});
   /* 금강역사(문 안쪽 통로에서 보이게) */const gk=new THREE.Group();gk.position.set(s*1.55,base,HZ);gk.rotation.y=-s*Math.PI/2;G.add(gk);const bd=new THREE.Mesh(new THREE.CylinderGeometry(.35,.45,1.6,10),M(s<0?0xb04a3a:0x3a5aa0));bd.position.y=.8;gk.add(bd);const hd=new THREE.Mesh(new THREE.SphereGeometry(.28,12,10),M(0xd8b088));hd.position.y=1.85;gk.add(hd);const arm=new THREE.Mesh(new THREE.BoxGeometry(.18,.9,.18),M(0xd8b088));arm.position.set(.45,1.4,.1);arm.rotation.z=-.9;gk.add(arm)}
  for(let i=0;i<=3;i++)for(const j of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.2,.24,PH,10),WOODB);c.position.set(-W/2+i*W/3,base+PH/2,HZ+j*D/2);G.add(c)}
  gableRoof(0,HZ,W,D,base+PH,2.2);plaque(0,base+PH-.4,HZ+2.05,'門脫解',1.6)}
 sp(0,HZ+4,3,'해탈문','1473년에 다시 지은 문이에요(국보). 맞배지붕 세 칸 가운데를 지나면 괴로움을 벗는다는 뜻이고, 양쪽 칸에 절을 지키는 금강역사가 서 있어요.');
 /* 계곡(해탈문 앞 서쪽으로 흐르는 내) */const CX=-22;{const wt=new THREE.Mesh(new THREE.PlaneGeometry(7,70),M(0x4a8ab0,{roughness:.25,metalness:.1}));wt.rotation.x=-Math.PI/2;wt.position.set(CX,.04,10);G.add(wt);for(let i=0;i<24;i++){const b=new THREE.Mesh(new THREE.DodecahedronGeometry(.5+r()*.8),M(0x9a968a,{flatShading:true}));b.position.set(CX+(r()<.5?-1:1)*(3.4+r()),.2,-24+r()*68);G.add(b)}}
 sp(CX+5,20,2.6,'도선국사 이야기','도선국사 어머니가 냇물에 떠내려온 오이를 먹고 도선을 낳았다는 이야기가 전해 와요(전해 오는 이야기). 아기를 숲에 두었더니 비둘기들이 날개로 감싸 지켰대요.');
 /* 오층석탑 */{const X=0,Z=16;let y=0;const st=(w,h)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,w),ST);m.position.set(X,y+h/2,Z);G.add(m);y+=h};st(3,.5);st(2.3,.8);for(let i=0;i<5;i++){st(1.1-i*.1,.5-i*.05);st(1.9-i*.2,.18)}solids.push({cx:X,cz:Z,r:1.6,y0:0,y1:y})}
 sp(0,20,2.6,'오층석탑','대웅보전 앞의 오층석탑이에요.');
 /* 대웅보전 */const DZ=4;{const y=hall(0,DZ,12,7,3.8,1,'hip');plaque(0,y-.5,DZ+3.55,'殿寶雄大',2)}
 sp(0,DZ+7.5,3.4,'대웅보전','도갑사의 큰 법당이에요(다시 지은 건물).');
 /* 미륵전 석조여래좌상 */{const X=-12,Z=-10;const y=hall(X,Z,6,5,3,.8);plaque(X,y-.45,Z+2.55,'殿勒彌',1.4)}
 sp(-12,-4.5,2.6,'미륵전','고려 때 돌로 깎은 여래좌상(보물)을 모신 작은 전각이에요.');
 /* 도선국사·수미왕사비 */{const X=16,Z=-8;const tb=new THREE.Group();tb.position.set(X,0,Z);G.add(tb);const tu=new THREE.Mesh(new THREE.SphereGeometry(1.2,14,10),ST2);tu.scale.set(1,.5,1.6);tu.position.y=.45;tb.add(tu);const hd=new THREE.Mesh(new THREE.SphereGeometry(.38,10,8),ST2);hd.position.set(0,.55,1.85);tb.add(hd);const body=new THREE.Mesh(new THREE.BoxGeometry(1.2,2.8,.3),M(0x6a6a68,{roughness:.6}));body.position.y=2.2;tb.add(body);const cap=new THREE.Mesh(new THREE.BoxGeometry(1.6,.6,.55),ST2);cap.position.y=3.9;tb.add(cap);solids.push({cx:X,cz:Z,r:1.5,y0:0,y1:4.2})}
 sp(16,-3.5,2.6,'도선국사·수미왕사비','1653년에 세운 큰 비석이에요(보물). 거북 받침 위에 도선국사와 수미왕사의 일을 새겼어요.');
 /* 계곡 물길 건너기(11/23) */const PX=26,PZ=24;const pg=new THREE.Group();pg.position.set(PX,0,PZ);pg.visible=false;G.add(pg);
 window.__DGRIVER=()=>{if(document.getElementById('dgrP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX,PZ+9,0)}catch(e){}pg.visible=true;
  const COLS=9,ROWS=7,HW=COLS/2;
  const camA=()=>{const k=innerWidth<innerHeight?1.9:1;return[PX,9*k+2,PZ+7*k,PX,0,PZ-.5,50]};window.__GCAM=()=>document.getElementById('sssX')?null:document.getElementById('dgrP')?camA():null;
  let rd=0,row=0,px=0,fails=0,t0=0,done=false,auto=false,last=performance.now(),wait=0,lanes=[],me=null,akt=0;const res=[];const NR=3;
  const snd=(f,len=.1,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const rz=rr=>(ROWS-1)/2*1-rr;/* 줄 → z(0줄이 앞, 6줄이 뒤) */
  const clr=()=>{while(pg.children.length)pg.remove(pg.children[0])};
  const LOG=M(0x7a5a3a),PAD=M(0x4a9a4a,{side:THREE.DoubleSide});
  const newRound=()=>{clr();lanes=[];const spd=[1,1.3,1.6][rd];
   for(const rr of[0,ROWS-1]){const bk=new THREE.Mesh(new THREE.BoxGeometry(COLS+1,.3,1),M(0x8a7a5a));bk.position.set(0,.15,rz(rr));pg.add(bk)}
   const wt=new THREE.Mesh(new THREE.PlaneGeometry(COLS+1,ROWS-2),M(0x3a7ab0,{roughness:.2}));wt.rotation.x=-Math.PI/2;wt.position.set(0,.05,0);pg.add(wt);
   for(let rr=1;rr<ROWS-1;rr++){const dir=rr%2?1:-1,v=(.8+r()*.9)*spd*dir,pad=rr===3||rr===5&&rd>0;const L=pad?1:2+((r()*2)|0),gap=pad?1.4:2.2+r()*.8;const items=[];const span=COLS+6;let x=-span/2+r()*2;while(x<span/2){const g=new THREE.Group();if(pad){const d=new THREE.Mesh(new THREE.CircleGeometry(.45,16,.4,Math.PI*1.8),PAD);d.rotation.x=-Math.PI/2;d.position.y=.12;g.add(d)}else{const c=new THREE.Mesh(new THREE.CylinderGeometry(.32,.32,L,10),LOG);c.rotation.z=Math.PI/2;c.position.y=.2;g.add(c)}g.position.set(x,0,rz(rr));pg.add(g);items.push({x,g,L});x+=L+gap}lanes[rr]={v,items,span}}
   me=new THREE.Group();const bd=new THREE.Mesh(new THREE.SphereGeometry(.3,14,10),M(0xf4f0e4));bd.position.y=.5;me.add(bd);const ht=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,.05,14),M(0x2a2622));ht.position.y=.82;me.add(ht);pg.add(me);
   /* 떠내려가는 오이 하나(장식) */const cu=new THREE.Mesh(new THREE.CapsuleGeometry(.12,.4,4,8),M(0x5a9a3a));cu.rotation.z=Math.PI/2;cu.position.set(-HW,.15,rz(2)+.35);pg.add(cu);lanes.cu=cu;
   row=0;px=0;t0=performance.now();ui()};
  const under=(rr,x)=>{const ln=lanes[rr];if(!ln)return true;return ln.items.some(it=>Math.abs(x-it.x)<it.L/2+.15)};
  const d=document.createElement('div');d.id='dgrP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1e3040;border:3px solid #5ab0d8;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef4f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:230px;user-select:none";document.body.appendChild(d);
  const B=(k,t)=>`<button data-m="${k}" style="font:20px 'Do Hyeon',sans-serif;background:#5ab0d8;color:#fff;border:0;border-radius:10px;width:52px;height:44px;margin:2px;cursor:pointer;touch-action:manipulation">${t}</button>`;
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#a8dcf4">🪵 계곡 물길 건너기 ${rd+1}/${NR}</b><div style="font-size:12px;margin:4px 0;line-height:1.5">떠내려가는 통나무와 연잎을 밟고 건너편 둑까지 가요. 물에 빠지거나 가장자리로 떠밀려 나가면 처음부터예요.</div><div style="font-size:12px">빠진 횟수 ${fails}</div><div style="font-size:13px;color:#a8dcf4;min-height:18px">${msg}</div><div>${B('u','⬆')}</div><div>${B('l','⬅')}${B('d','⬇')}${B('r','➡')}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f8;border:1px solid #eef4f8;border-radius:8px;padding:2px 8px;margin-top:4px;cursor:pointer">그만</button>`;d.querySelectorAll('[data-m]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();mv(b.dataset.m)});d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const fall=why=>{fails++;snd(160,.3,'sawtooth');row=0;px=0;ui(why)};
  const mv=k=>{if(done||wait>0)return;if(k==='u'){row++;snd(520,.06)}else if(k==='d'){if(row>0){row--;snd(440,.06)}}else if(k==='l'){px=Math.max(-HW+.5,px-1);snd(480,.05)}else if(k==='r'){px=Math.min(HW-.5,px+1);snd(480,.05)}
   if(row>=ROWS-1){row=ROWS-1;const tm=(performance.now()-t0)/1000;const sc=Math.max(20,Math.round(100-fails*15-Math.max(0,tm-15)*1.5));res.push(sc);wait=1.4;snd(760,.4,'sine');ui(`건넜어요! ${sc}점`);return}
   if(row>0&&!under(row,px))fall('풍덩! 처음부터 다시')};
  const cleanup=()=>{clr();pg.visible=false};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/res.length);const s2=Q>=80?3:Q>=55?2:Q>0?1:0;try{ctx.done('dogap_river',Q,'계곡 물길 건너기')}catch(e){}window.__DGRQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#a8dcf4">다 건넜어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">도갑사를 세운 도선국사는, 어머니가 냇물에 떠내려온 오이를 먹고 낳았다는 이야기가 전해 와요(전해 오는 이야기). 물살을 잘 읽어야 건널 수 있지요.</div><div style="font-size:24px;color:#5ab0d8">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#5ab0d8;color:#fff;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f8;border:2px solid #eef4f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__DGRIVER()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   for(let rr=1;rr<ROWS-1;rr++){const ln=lanes[rr];if(!ln)continue;for(const it of ln.items){it.x+=ln.v*dt;if(it.x>ln.span/2)it.x-=ln.span;if(it.x<-ln.span/2)it.x+=ln.span;it.g.position.x=it.x;it.g.visible=Math.abs(it.x)<HW+.6}}
   if(lanes.cu){lanes.cu.position.x+=lanes[2].v*dt;if(Math.abs(lanes.cu.position.x)>HW)lanes.cu.position.x=-Math.sign(lanes[2].v)*HW}
   if(wait<=0&&row>0&&row<ROWS-1){px+=lanes[row].v*dt;if(Math.abs(px)>HW-.2)fall('가장자리로 떠밀려 나갔어요');else if(!under(row,px))fall('풍덩! 처음부터 다시')}
   if(me){me.position.set(px,row>0&&row<ROWS-1?.1:.3,rz(row));me.position.y+=Math.abs(Math.sin(now/180))*.05}
   if(auto&&wait<=0){akt-=dt;if(akt<=0){akt=.12;const nx=row+1;if(nx>=ROWS-1||under(nx,px)&&Math.abs(px+lanes[nx].v*.6)<HW-.8)mv('u');else if(row>0&&Math.abs(px)>2.2){const k=px>0?'l':'r';const t=px+(px>0?-1:1);if(under(row,t))mv(k)}}}
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=NR){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);window.__DGRG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},mv,get row(){return row},get fails(){return fails}};try{ctx.say('통나무를 밟고 계곡을 건너 봐요!',2.4)}catch(e){}};
 spots.push({x:PX,y:0,z:PZ+3.5,r:2.6,t:'계곡 건너는 자리',h:'떠내려가는 통나무와 연잎을 밟고 계곡 물길을 건너 봐요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,53],[0,3,HZ+3.5],[0,3,19],[0,3,DZ+7],[16,3,-4],[-12,3,-5],[PX,3,PZ+3]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'기와 조각',h:'절 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'구림 도기 조각',h:'근처 구림마을 가마에서 구운 옛 도기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.1,.08,.05,14,1,false,0,3.2),M(0x7a6a58)))})},
  {n:'풍경',h:'처마 끝에서 울리던 작은 종이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.03,.05,.09,10),M(0x5a7a62,{metalness:.5})))})},
  {n:'오이 씨앗 그릇 조각',h:'작은 사발 조각이에요. 오이 이야기를 떠올려 봐요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.08,12,8,0,Math.PI*2,0,1.2),M(0xc8c0a8)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(12,52,2.4,'발굴 탐지 자리','절 들머리 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__DGDIG=()=>{window.__DETECT&&window.__DETECT({key:'dogap_dig',title:'도갑사 발굴 탐지',emoji:'⛏️',bg:'#1e3040',count:4,TL:150,cand:[[-8,46],[10,44],[-10,28],[12,26],[-6,-20],[8,-18],[26,4],[-30,40],[30,40],[-4,40]],items:DIG,intro:'도갑사 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'도갑사 해탈문은 조선 초 1473년에 지은 국보 건물이에요.'})};
 const meta={quest:{t:'도갑사 둘러보기',d:'일주문과 해탈문을 지나 오층석탑과 대웅보전, 미륵전과 도선국사비, 계곡의 도선 이야기를 둘러보세요.',steps:[['일주문','일주문'],['해탈문','해탈문'],['석탑','오층석탑'],['대웅보전','대웅보전'],['미륵전','미륵전'],['비','도선국사·수미왕사비'],['도선','도선국사 이야기']]},
  title:'영암 도갑사',hint:'월출산 도갑사를 공개 사진으로 간추려 지었어요(배치·크기 어림). 계곡에서 떠내려가는 통나무를 밟고 물길을 건너 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:56,lines:['영암 도갑사','월출산 · 해탈문(국보)','도선국사 · 수미왕사비','간추려 지음']}},
  npc:[['science',[[-6,54],[6,54],[6,60],[-6,60]]]],bounds:[-44,44,-34,64],level:()=>'영암 도갑사',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:12,draw(g,X,Z,S){g.fillStyle='#7a9448';g.fillRect(0,0,300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:58,yaw:Math.PI},size:{}},meta)}
