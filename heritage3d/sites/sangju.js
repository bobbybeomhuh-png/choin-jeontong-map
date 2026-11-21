/* 상주 곶감 마을·경천대 마당(2026-11-21): 공개 실측 3D(CC BY)가 없어 간추려 지음(집은 hanokkit 실측 한옥·초가 CC BY).
   상주: 「삼백(쌀·누에고치·곶감)의 고장」. 가을이면 감을 깎아 덕장에 줄줄이 매달아 곶감을 말림(상주 전통 곶감 농업, 국가중요농업유산). 경천대는 낙동강 굽이를 내려다보는 벼랑 위 전망 자리.
   놀이: 곶감 만들기(감 깎아 덕장에 매달기), 발굴 탐지, 밤 마을 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {placeHanok} from './hanokkit.js';
export function buildSangju(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1592);
 const TOUCH=opts.touch!=null?!!opts.touch:matchMedia('(pointer:coarse)').matches;
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 서쪽 마을 평지, 동쪽(x>40) 벼랑 언덕(경천대, 높이 18m) 아래 낙동강(x>80) */
 const ss=t=>t<=0?0:t>=1?1:t*t*(3-2*t);const RX=80;
 const H=(x,z)=>{if(x>RX)return -2;let h=18*ss((x-30)/30);if(x>RX-6)h=h*(1-ss((x-(RX-6))/5));return h};
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(260,240,130,120);g.rotateX(-Math.PI/2);g.translate(10,0,0);const p=g.attributes.position;const col=[];const c=new THREE.Color();
  for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);const h=H(x,z);p.setY(k,h<0?-3:h);const cliff=x>RX-7&&x<=RX;c.set(cliff?'#8a7a68':x>RX?'#d8c8a0':x>30?'#5f8a3a':'#8a9a4a');col.push(c.r,c.g,c.b)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1,flatShading:true}));m.receiveShadow=true;G.add(m)}
 /* 낙동강(굽이) */const WT=tex(256,256,(q,w,h)=>{q.fillStyle='#3f6f7a';q.fillRect(0,0,w,h);for(let i=0;i<200;i++){q.strokeStyle=`rgba(220,240,240,${.08+r()*.12})`;q.lineWidth=1+r()*2;const x=r()*w,y=r()*h;q.beginPath();q.moveTo(x,y);q.lineTo(x+20+r()*20,y);q.stroke()}},[4,8]);WT.wrapS=WT.wrapT=THREE.RepeatWrapping;
 const river=new THREE.Mesh(new THREE.PlaneGeometry(90,400),new THREE.MeshStandardMaterial({map:WT,roughness:.12,metalness:.2}));river.rotation.x=-Math.PI/2;river.position.set(RX+48,-.6,0);G.add(river);const sand=new THREE.Mesh(new THREE.PlaneGeometry(14,400),M(0xd8c8a0));sand.rotation.x=-Math.PI/2;sand.position.set(RX+3,-.5,0);G.add(sand);solids.push({x0:RX-2,x1:RX+200,y0:-6,y1:20,z0:-200,z1:200});
 /* 경천대 전망 정자(벼랑 끝) */if(!mini){const y=H(RX-12,0);const h=buildHall({x:RX-12,z:0,ry:-Math.PI/2,W:6,D:6,nx:1,nz:1,FY:.4,PH:3,roof:'hip',name:'擎天臺',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',rail:true,stairs:'none',solids:[],light:false,roofScale:.8});h.group.position.y=y;G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 /* 벼랑 바위 */{const rm=M(0x7a7060,{flatShading:true});for(let i=0;i<20;i++){const z=-100+i*10+(r()-.5)*3;const s=new THREE.Mesh(new THREE.DodecahedronGeometry(3+r()*1.5,0),rm);s.scale.set(.8,1.6,1.2);s.position.set(RX-3,6+r()*4,z);s.castShadow=true;G.add(s)}}
 /* 마을: 실측 한옥·초가 */
 if(!mini){for(const[k,x,z,ry]of[['sarang',-40,-30,0],['choga1',-14,-34,0],['nongga',-50,4,Math.PI/2],['choga2',-20,32,Math.PI],['sarang',6,36,Math.PI],['choga1',-62,34,Math.PI/2]])placeHanok(G,solids,k,x,z,ry,{TOUCH,s:.7})}
 /* 감나무 밭 */{const tm=M(0x4a3a2a),lm=M(0x6a8a3a),fm=M(0xe8641a,{roughness:.5});for(let i=0;i<28;i++){const x=-90+(i%7)*10+(r()-.5)*3,z=-80+((i/7)|0)*11+(r()-.5)*3;const t=new THREE.Mesh(new THREE.CylinderGeometry(.25,.35,3.2,7),tm);t.position.set(x,1.6,z);G.add(t);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(2.4,1),lm);c.position.set(x,4,z);c.scale.y=.75;c.castShadow=true;G.add(c);const im=new THREE.InstancedMesh(new THREE.SphereGeometry(.2,8,6),fm,26);const o=new THREE.Object3D();for(let k=0;k<26;k++){const a=r()*6.28,e=-.5+r()*1.2;o.position.set(x+Math.cos(a)*2.45*Math.cos(e),4+Math.sin(e)*1.85,z+Math.sin(a)*2.45*Math.cos(e));o.updateMatrix();im.setMatrixAt(k,o.matrix)}G.add(im);solids.push({cx:x,cz:z,r:.45,y0:0,y1:5})}}
 /* 곶감 덕장: 지붕 있는 긴 시렁, 매달린 감 줄 */
 const DX=-10,DZ=-4,DW=16;const HANG=[];{const wm=M(0x7a5a38);for(const s of[-1,1])for(const xx of[-DW/2,0,DW/2]){const p=new THREE.Mesh(new THREE.BoxGeometry(.25,3.6,.25),wm);p.position.set(DX+xx,1.8,DZ+s*2);G.add(p)}const rf=new THREE.Mesh(new THREE.BoxGeometry(DW+2,.2,5.6),M(0x5a5a60));rf.position.set(DX,3.8,DZ);rf.rotation.z=.02;G.add(rf);for(const s of[-1,1]){const b=new THREE.Mesh(new THREE.BoxGeometry(DW+.4,.12,.12),wm);b.position.set(DX,3.4,DZ+s*1.2);G.add(b)}
  const cm=M(0x8a3a1a,{roughness:.6}),sm=M(0xc8b890);for(let i=0;i<24;i++){const s=i%2?1:-1,j=(i/2)|0;const x=DX-DW/2+.8+j*(DW-1.6)/11;const g=new THREE.Group();g.position.set(x,3.4,DZ+s*1.2);const str=new THREE.Mesh(new THREE.CylinderGeometry(.01,.01,2.4,4),sm);str.position.y=-1.2;g.add(str);for(let k=0;k<8;k++){const pm=new THREE.Mesh(new THREE.SphereGeometry(.12,8,6),cm);pm.scale.y=1.15;pm.position.y=-.25-k*.28;g.add(pm)}g.visible=i<12;G.add(g);HANG.push(g)}
  solids.push({x0:DX-DW/2-.4,x1:DX+DW/2+.4,y0:0,y1:4,z0:DZ-2.2,z1:DZ+2.2})}
 /* 감 깎는 평상 + 감 바구니 */const PX=DX,PZ=DZ+6;{const pl=new THREE.Mesh(new THREE.BoxGeometry(3,.5,2),M(0x8a6a44));pl.position.set(PX,.25,PZ);G.add(pl);solids.push({x0:PX-1.5,x1:PX+1.5,y0:0,y1:.6,z0:PZ-1,z1:PZ+1});const bk=new THREE.Mesh(new THREE.CylinderGeometry(.5,.4,.4,14,1,true),M(0xb08850,{side:THREE.DoubleSide}));bk.position.set(PX+1,.7,PZ);G.add(bk);for(let k=0;k<6;k++){const f=new THREE.Mesh(new THREE.SphereGeometry(.15,8,6),M(0xe8641a));f.position.set(PX+1+(r()-.5)*.5,.85,PZ+(r()-.5)*.5);G.add(f)}}
 /* 밤 */
 const NL=[];if(!mini){for(const[x,z]of[[DX,DZ+3],[-40,-24],[-20,26],[RX-12,4]]){const L=new THREE.PointLight(0xffc080,0,18,1.5);L.position.set(x,H(x,z)+3,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7;WT.offset.y+=dt*.03};
 /* 안내 */
 const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(DX,DZ+9,3.4,'곶감 덕장','상주는 쌀·누에고치·곶감이 많이 나 「삼백의 고장」이라 불러요. 가을이면 감을 깎아 덕장에 줄줄이 매달아 찬바람에 40~60일 말려 곶감을 만들어요(국가중요농업유산). 간추려 지었어요.');
 sp(PX-2.6,PZ+1.6,1.8,'감 깎는 평상','감을 깎아 덕장에 매달아 봐요.');
 sp(RX-18,6,3,'경천대','낙동강 굽이를 내려다보는 벼랑 위 자리예요. 「하늘을 떠받친다」는 뜻의 이름으로, 낙동강 1,300리에서 가장 아름다운 곳 가운데 하나로 꼽혀요.');
 sp(-70,-60,3,'감나무 밭','상주에는 오래된 감나무가 많아요. 떫은 감(둥시)을 깎아 말려야 단 곶감이 돼요.');
 sp(-30,10,2.4,'발굴 탐지 자리','상주 땅속에 옛 사람들의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 곶감 만들기(11/21): 「깎기」를 여섯 번 눌러 감 껍질을 벗기고, 「매달기」로 덕장 줄에 걸기. 열두 개, 70초 */
 window.__SJGOT=()=>{if(document.getElementById('sjP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX-2.4,PZ+1.4,0);H3.face(Math.PI)}catch(e){}
  for(let i=12;i<24;i++)HANG[i].visible=false;
  const g=new THREE.Group();G.add(g);const per=new THREE.Mesh(new THREE.SphereGeometry(.32,16,12),new THREE.MeshStandardMaterial({color:0xe8641a,roughness:.5}));per.position.set(PX-.4,1.05,PZ);g.add(per);const cap=new THREE.Mesh(new THREE.CylinderGeometry(.12,.14,.06,4),M(0x4a6a2a));cap.position.set(PX-.4,1.38,PZ);g.add(cap);
  const peel=new THREE.Mesh(new THREE.TorusGeometry(.36,.04,6,30,0),M(0xe0701a));peel.rotation.x=Math.PI/2;peel.position.set(PX-.4,1.05,PZ);g.add(peel);
  window.__GCAM=()=>document.getElementById('sjP')?[PX-2.2,2.6,PZ+2.6,PX-.2,1.4,PZ-1.2,55]:null;
  let n=0,cut=0,done=false,t0=performance.now()/1000;const N=12,TL=70;
  const d=document.createElement('div');d.id='sjP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a1e14;border:3px solid #e8841a;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffc080">🍊 곶감 만들기</b><div id="sjS" style="font:20px 'Do Hyeon',sans-serif;margin:4px 0">덕장에 0 / ${N}개</div><div id="sjG" style="font-size:13px;color:#ffc080">「깎기」로 껍질을 벗겨요</div><div style="display:flex;gap:8px;margin:6px 0"><button id="sjC" style="flex:1;font:18px 'Do Hyeon',sans-serif;background:#e8841a;color:#2a1a10;border:0;border-radius:12px;padding:12px 0;cursor:pointer">🔪 깎기</button><button id="sjH" style="flex:1;font:18px 'Do Hyeon',sans-serif;background:#8a6a44;color:#f4ecd8;border:0;border-radius:12px;padding:12px 0;cursor:pointer;opacity:.5">🪝 매달기</button></div><div id="sjT" style="font-size:13px">${TL}초</div>`;const Sx=d.querySelector('#sjS'),Gd=d.querySelector('#sjG'),T=d.querySelector('#sjT'),Bh=d.querySelector('#sjH');
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const setPeel=()=>{peel.geometry.dispose();peel.geometry=new THREE.TorusGeometry(.36,.04,6,30,Math.max(.01,cut/6*Math.PI*2));per.material.color.setRGB(.91-cut*.04,.39-cut*.02,.1+cut*.015);Bh.style.opacity=cut>=6?1:.5};
  const doCut=()=>{if(done||cut>=6)return;cut++;snd(1400+cut*80,.06,'square');per.rotation.y+=1;setPeel();Gd.textContent=cut<6?'깎는 중… '+cut+'/6':'다 깎았어요! 「매달기」를 눌러요'};
  const doHang=()=>{if(done)return;if(cut<6){Gd.textContent='먼저 껍질을 다 깎아요';snd(200,.15);return}HANG[12+n].visible=true;n++;cut=0;setPeel();snd(660,.2);Sx.textContent='덕장에 '+n+' / '+N+'개';Gd.textContent='다음 감을 깎아요';if(n>=N)fin()};
  d.querySelector('#sjC').onclick=doCut;Bh.onclick=doHang;const onKey=e=>{if(e.code==='Space'){e.preventDefault();doCut()}else if(e.code==='Enter'){e.preventDefault();doHang()}};addEventListener('keydown',onKey);
  const fin=()=>{if(done)return;done=true;removeEventListener('keydown',onKey);G.remove(g);const el=performance.now()/1000-t0;const Q=n>=N?Math.max(65,Math.round(100-Math.max(0,el-35)*.8)):Math.round(n/N*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('sangju_gotgam',Q,'상주 곶감 만들기')}catch(e){}window.__SJQ=Q;
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffc080">${n>=N?'곶감 줄을 다 매달았어요!':'감 '+n+'개를 매달았어요'}</b><div style="font-size:13px;margin:4px 0">깎은 감을 덕장에 매달아 바람에 말리면 떫은맛이 빠지고 단맛이 짙어져요. 겉에 하얗게 피는 가루(시설)는 감 속 당분이에요.</div><div style="font-size:26px;color:#e8841a">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#e8841a;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__SJGOT(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},500)};
  const loop=()=>{if(!d.isConnected){removeEventListener('keydown',onKey);G.remove(g);return}const now=performance.now()/1000;if(!done){const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin()}requestAnimationFrame(loop)};loop();
  window.__SJG={doCut,doHang,get n(){return n}};try{ctx.say('감을 깎아 덕장에 매달아요!',2.2)}catch(e){}};
 /* 발굴 탐지 */
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'누에고치 모양 토제품',h:'누에를 치던 고장답게 누에고치 모양 흙 장식이 나왔어요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CapsuleGeometry(.07,.14,4,8),M(0xe8e0c8));m.rotation.z=Math.PI/2;g.add(m)})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'곶감을 팔고 받은 엽전일지도 몰라요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})},
  {n:'쇠 낫',h:'감을 따고 곡식을 거두던 낫이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.TorusGeometry(.12,.02,6,12,Math.PI),M(0x4a3a30,{metalness:.5})))})},
  {n:'탄화미',h:'불에 탄 쌀알이에요. 쌀의 고장 상주의 오랜 벼농사를 보여 줘요.',mk:mk(g=>{for(let i=0;i<10;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(.025,6,4),M(0x1a1410));m.scale.set(1.6,.8,.8);m.position.set((Math.random()-.5)*.2,0,(Math.random()-.5)*.2);g.add(m)}})}];
 window.__SJDIG=()=>{window.__DETECT&&window.__DETECT({key:'sangju_dig',title:'상주 발굴 탐지',emoji:'⛏️',bg:'#2a1e14',count:4,TL:150,cand:[[-30,10],[-60,-10],[0,20],[-40,50],[10,-30],[-80,20],[20,10],[-70,-40]],items:ITEMS,intro:'상주 땅속에 옛 사람들의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'상주는 낙동강 물길 덕에 일찍부터 쌀·누에·곶감이 풍성했던 고장이에요.'})};
 const meta={quest:{t:'상주 둘러보기',d:'곶감 마을과 경천대를 둘러보세요.',steps:[['덕장','곶감 덕장'],['감나무','감나무 밭'],['경천대','경천대']]},
  title:'상주 곶감 마을·경천대',hint:'「삼백의 고장」 상주의 곶감 마을과 낙동강 경천대를 간추려 지었어요(집은 실측). 감을 깎아 덕장에 매달아 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,groundY:-3.5,sign:{x:DX+12,z:DZ+12,lines:['상주 곶감 마을·경천대','삼백의 고장','곶감 덕장 · 낙동강','간추려 지음']}},
  npc:[['science',[[DX+8,DZ+10],[DX+16,DZ+10],[DX+16,DZ+16],[DX+8,DZ+16]]]],bounds:[-110,RX-2,-110,110],level:()=>'상주',camCap:()=>Infinity,baseAt:(x,z)=>Math.max(0,H(x,z)),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.1,ox:-10,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#5f8a3a';g.fillRect(X(30),0,(RX-30)*S,300);g.fillStyle='#3f6f7a';g.fillRect(X(RX),0,300,300);g.fillStyle='#8a5a3a';g.fillRect(X(DX-DW/2),Z(DZ+2),DW*S,4*S);g.fillStyle='#e8641a';for(let i=0;i<28;i++)g.fillRect(X(-90+(i%7)*10)-2,Z(-80+((i/7)|0)*11)-2,4,4)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:DX+12,z:DZ+20,yaw:Math.PI},size:{}},meta)}
