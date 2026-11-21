/* 대구 경상감영·약령시 마당(2026-11-21): 공개 실측 3D(CC BY)가 없어 공개 수치로 간추려 지음.
   경상감영: 1601년 대구로 옮겨 온 경상도 관찰사 관청. 선화당(관찰사가 일하던 곳, 시 유형문화유산, 1807 다시 지음, 정면 6칸·옆면 4칸 팔작지붕), 징청각(관찰사가 지내던 곳), 측우대(본뜸, 진짜는 기상청이 보관하는 보물), 관찰사 선정비 무리.
   약령시: 1658년 무렵 감영 안에서 열린 약재 시장, 조선 3대 약령시 가운데 가장 오래 이어짐(지금 남성로). 놀이: 약재 고르기(처방에 든 약재만 바구니에서 골라 담기), 발굴 탐지, 밤 청사초롱. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {placeHanok,hanokWall} from './hanokkit.js';
export function buildDaegu(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1601);
 const TOUCH=opts.touch!=null?!!opts.touch:matchMedia('(pointer:coarse)').matches;
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 /* 땅: 감영 마당(마사토) + 약령시 거리(박석) */
 const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#c8b894';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){q.fillStyle=r()<.5?'rgba(150,130,100,.45)':'rgba(220,210,180,.4)';q.fillRect(r()*w,r()*h,2,2)}},[50,50]);
 const GG=tex(256,256,(q,w,h)=>{q.fillStyle='#7d8f4a';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){q.fillStyle=r()<.5?'rgba(90,110,40,.5)':'rgba(170,150,90,.35)';q.fillRect(r()*w,r()*h,2,2)}},[50,50]);const gg=new THREE.Mesh(new THREE.PlaneGeometry(300,300),new THREE.MeshStandardMaterial({map:GG,roughness:1}));gg.rotation.x=-Math.PI/2;gg.position.y=.005;gg.receiveShadow=true;G.add(gg);for(const[x,z,w,d]of[[0,-6,52,64],[0,34,30,16],[64,6,80,30]]){const gr=new THREE.Mesh(new THREE.PlaneGeometry(w,d),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.position.set(x,.012,z);gr.receiveShadow=true;G.add(gr)}
 const BT=tex(256,256,(q,w,h)=>{q.fillStyle='#9a9286';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=32)for(let x=-(y/32%2)*24;x<w;x+=48){const v=130+(r()*50|0);q.fillStyle=`rgb(${v},${v-4},${v-12})`;q.fillRect(x+2,y+2,44,28)}},[4,30]);
 {const st=new THREE.Mesh(new THREE.PlaneGeometry(9,96),new THREE.MeshStandardMaterial({map:BT,roughness:.95}));st.rotation.x=-Math.PI/2;st.rotation.z=Math.PI/2;st.position.set(70,.02,6);G.add(st)}
 /* 감영: 선화당(앞), 징청각(뒤) */
 if(!mini){const h1=buildHall({x:0,z:0,ry:0,W:19.8,D:10.4,nx:6,nz:4,FY:1.1,PH:4.2,roof:'hip',name:'宣化堂',bracket:'ik',front:'door',solids,light:true});G.add(h1.group);h1.group.traverse(e=>{if(e.isMesh)cam.push(e)});
  const h2=buildHall({x:0,z:-26,ry:0,W:18,D:9.6,nx:6,nz:4,FY:.9,PH:3.8,roof:'hip',name:'澄淸閣',bracket:'ik',front:'door',solids,light:true});G.add(h2.group)}
 else{const b=new THREE.Mesh(new THREE.BoxGeometry(19.8,6,10.4),M(0x9a6a4a));b.position.set(0,3,0);G.add(b)}
 /* 감영 담과 대문 */if(!mini){hanokWall(G,solids,-26,-38,26,-38,{TOUCH});hanokWall(G,solids,-26,-38,-26,26,{TOUCH});hanokWall(G,solids,26,-38,26,-2,{TOUCH});hanokWall(G,solids,26,14,26,26,{TOUCH});hanokWall(G,solids,-26,26,-7,26,{TOUCH});hanokWall(G,solids,7,26,26,26,{TOUCH});placeHanok(G,solids,'gate',0,26,0,{TOUCH,s:.9,hole:true})}
 /* 측우대(본뜸): 화강암 받침 위 측우기 */{const g=new THREE.Group();g.position.set(9,0,12);const b=new THREE.Mesh(new THREE.BoxGeometry(.9,.75,.9),M(0xb8b0a0));b.position.y=.375;g.add(b);const top=new THREE.Mesh(new THREE.BoxGeometry(.6,.06,.6),M(0xa8a090));top.position.y=.78;g.add(top);const c=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.42,20,1,true),M(0x6a6a4a,{metalness:.6,roughness:.4,side:THREE.DoubleSide}));c.position.y=1.02;g.add(c);for(const y of[.86,1.02,1.18]){const rg=new THREE.Mesh(new THREE.TorusGeometry(.145,.012,6,20),M(0x4a4a30,{metalness:.6}));rg.rotation.x=Math.PI/2;rg.position.y=y;g.add(rg)}G.add(g);solids.push({cx:9,cz:12,r:.6,y0:0,y1:1.3});cam.push(b)}
 /* 관찰사 선정비 무리(공원 한쪽 줄지어 선 비석) */{const sm=M(0x8a8478);for(let i=0;i<14;i++){const x=-22+i*1.4,z=18;const h=1.4+r()*.5;const g=new THREE.Group();g.position.set(x,0,z);const base=new THREE.Mesh(new THREE.BoxGeometry(.9,.3,.6),sm);base.position.y=.15;g.add(base);const st=new THREE.Mesh(new THREE.BoxGeometry(.55,h,.18),sm);st.position.y=.3+h/2;g.add(st);if(i%3===0){const cap=new THREE.Mesh(new THREE.BoxGeometry(.8,.18,.34),M(0x6a6458));cap.position.y=.3+h+.09;g.add(cap)}G.add(g)}solids.push({x0:-22.6,x1:-2.6,y0:0,y1:2.2,z0:17.6,z1:18.4})}
 /* 하마비 */{const s=new THREE.Mesh(new THREE.BoxGeometry(.5,1.6,.2),M(0x8a8478));s.position.set(-5,.8,33);G.add(s);solids.push({cx:-5,cz:33,r:.4,y0:0,y1:1.6})}
 /* 회화나무 */{const tm=M(0x5a4430),lm=M(0x4a7a34);for(const[x,z,s]of[[-16,8,1.2],[16,-12,1],[-16,-14,1.1],[18,20,1]]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.35*s,.55*s,4*s,8),tm);t.position.set(x,2*s,z);t.castShadow=true;G.add(t);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(3.4*s,1),lm);c.position.set(x,5.4*s,z);c.scale.y=.7;c.castShadow=true;G.add(c);solids.push({cx:x,cz:z,r:.6*s,y0:0,y1:7})}}
 /* 약령시 거리: 감영 동쪽 담 문(z=6) 밖으로 이어진 약재 가게들 */
 if(!mini){for(let i=0;i<4;i++){const x=40+i*14;placeHanok(G,solids,'nongga',x,-6.5,0,{TOUCH,s:.72});placeHanok(G,solids,'nongga',x,18.5,Math.PI,{TOUCH,s:.72})}}
 /* 약재 바구니와 가게 이름 */
 const HERB=[['감초','#d8b860','slice'],['당귀','#c8a878','root'],['천궁','#8a6a40','knob'],['황기','#e0d0a0','strip'],['계피','#8a4a2a','bark'],['숙지황','#2a1a14','knob'],['백작약','#eee8d8','slice'],['대추','#a02a20','ball'],['생강','#d8c080','knob'],['인삼','#e8d8b0','root'],['구기자','#c03020','ball'],['오미자','#6a1420','ball']];
 const label=(txt,w=1.6,col='#3a2414',bg='#f4ead0')=>{const c=document.createElement('canvas');c.width=256;c.height=96;const q=c.getContext('2d');q.fillStyle=bg;q.fillRect(0,0,256,96);q.strokeStyle='#6a4024';q.lineWidth=8;q.strokeRect(4,4,248,88);q.fillStyle=col;q.font="bold 52px 'Do Hyeon',sans-serif";q.textAlign='center';q.textBaseline='middle';q.fillText(txt,128,52);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,depthWrite:false}));s.scale.set(w,w*.375,1);return s};
 const BAS=[];{const wm=M(0xb08850),tm=M(0x7a5a38);const pieceG={slice:new THREE.CylinderGeometry(.09,.09,.02,10),root:new THREE.CylinderGeometry(.03,.02,.3,6),knob:new THREE.DodecahedronGeometry(.07,0),strip:new THREE.BoxGeometry(.03,.012,.28),bark:new THREE.CylinderGeometry(.04,.04,.26,8,1,true),ball:new THREE.SphereGeometry(.05,8,6)};
  HERB.forEach(([n,c,k],i)=>{const side=i<6?-1:1;const j=i%6;const x=40+j*8.4,z=side<0?1.4:10.6;const g=new THREE.Group();g.position.set(x,0,z);
   const tb=new THREE.Mesh(new THREE.BoxGeometry(1.6,.7,1.1),tm);tb.position.y=.35;g.add(tb);const bs=new THREE.Mesh(new THREE.CylinderGeometry(.62,.5,.18,18,1,true),wm);bs.material.side=THREE.DoubleSide;bs.position.y=.79;g.add(bs);
   const pm=M(c,{roughness:.8});const im=new THREE.InstancedMesh(pieceG[k],pm,34);const o=new THREE.Object3D();for(let a=0;a<34;a++){const rr=Math.sqrt(r())*.46,t=r()*6.28;o.position.set(Math.cos(t)*rr,.78+r()*.1+(.46-rr)*.25,Math.sin(t)*rr);o.rotation.set(r()*3,r()*3,r()*3);o.updateMatrix();im.setMatrixAt(a,o.matrix)}g.add(im);
   const lb=label(n);lb.position.y=1.8;g.add(lb);const ring=new THREE.Mesh(new THREE.RingGeometry(.85,1.05,28),new THREE.MeshBasicMaterial({color:0x8ae08a,transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.03;ring.position.z=side<0?1.1:-1.1;g.add(ring);
   G.add(g);solids.push({x0:x-.8,x1:x+.8,y0:0,y1:.9,z0:z-.55,z1:z+.55});BAS.push({n,x,z:z+(side<0?1.1:-1.1),ring,g})})}
 /* 거리 깃발: 약령시 */{const p=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,5,8),M(0x6a4a30));p.position.set(33,2.5,1.2);G.add(p);const fl=label('대구 약령시',3.2,'#f4ead0','#8a2a1a');fl.position.set(33,4.4,1.2);G.add(fl)}
 /* 밤: 청사초롱 */
 const NL=[];if(!mini){for(let i=0;i<8;i++){const x=38+i*7.6;for(const z of[.2,11.8]){const lp=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.45,10),new THREE.MeshStandardMaterial({color:i%2?0x2a4a9a:0xa02a2a,emissive:0x000000,transparent:true,opacity:.95}));lp.position.set(x,2.6,z);G.add(lp);NL.push({lp,L:null})}}for(const[x,z]of[[-4,9],[4,9],[50,6],[70,6]]){const L=new THREE.PointLight(0xffc080,0,18,1.5);L.position.set(x,3,z);G.add(L);NL.push({L})}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const l of NL){if(l.lp)l.lp.material.emissive.setRGB(nk*.9,nk*.6,nk*.4);if(l.L)l.L.intensity=nk*7}};
 /* 안내 */
 spots.push({x:0,y:0,z:9,r:4,t:'선화당',h:'경상도 관찰사가 일하던 감영의 으뜸 건물이에요. 1601년 감영이 대구로 옮겨 온 뒤 여러 번 불에 탔고, 지금 건물은 1807년에 다시 지었어요. 정면 6칸·옆면 4칸 팔작지붕이에요. 간추려 지었어요.'});
 spots.push({x:0,y:0,z:-17,r:3.4,t:'징청각',h:'관찰사가 머물며 지내던 건물이에요. 「맑고 깨끗하게 다스린다」는 뜻의 이름이에요.'});
 spots.push({x:9,y:0,z:14,r:2.2,t:'측우대',h:'비의 양을 재는 측우기를 올려놓던 받침돌이에요. 영조 46년(1770)에 만든 경상감영 측우대(보물)는 지금 기상청이 보관하고, 여기엔 본뜬 것을 두었어요.'});
 spots.push({x:-12,y:0,z:21,r:3,t:'관찰사 선정비',h:'백성을 잘 다스린 관찰사를 기리려 세운 비석들이 줄지어 서 있어요. 대구 곳곳에 있던 것을 한데 모았어요.'});
 spots.push({x:34,y:0,z:6,r:3.2,t:'대구 약령시',h:'1658년 무렵 감영 안에서 열리던 약재 시장이에요. 봄·가을로 전국 약재가 모였고, 조선 3대 약령시 가운데 가장 오래 이어져 지금도 남성로에 한약방 거리가 있어요.'});
 spots.push({x:36,y:0,z:8.6,r:2,t:'약방 처방 받는 곳',h:'처방에 적힌 약재만 바구니에서 골라 담아 봐요.'});
 spots.push({x:-14,y:0,z:-4,r:2.4,t:'발굴 탐지 자리',h:'감영 터 땅속에 조선 관청의 물건이 묻혀 있어요. 무이 탐지기로 찾아 봐요.'});
 /* 약재 고르기(11/21): 약방 손님 셋의 처방. 바구니 앞 초록 고리를 밟아 담기, 처방에 없는 약재를 밟으면 감점. 150초 */
 const ORD=[{n:'쌍화탕',w:'몸이 고단한 손님',it:['백작약','숙지황','당귀','천궁','감초']},{n:'생강대추차',w:'으슬으슬 추운 손님',it:['생강','대추','계피','감초']},{n:'오미자 구기자차',w:'더위 먹은 손님',it:['오미자','구기자','인삼','황기']}];
 window.__DGHERB=()=>{if(document.getElementById('dgP'))return;const H=window.__H3,ctx=H.ctx();try{H.tp(36,6,.5);H.face(Math.PI/2)}catch(e){}
  const orders=ORD.slice().sort(()=>Math.random()-.5);let oi=0,got=new Set(),wrong=0,done=false,t0=performance.now()/1000,lastHit=null;const TL=150;
  const d=document.createElement('div');d.id='dgP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2018;border:3px solid #c89a5a;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const tone=(f0,f1,len)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='triangle';o.frequency.setValueAtTime(f0,s);o.frequency.exponentialRampToValueAtTime(f1,s+len);gg.gain.setValueAtTime(.07,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len+.05);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.08)}catch(e){}};
  const draw=()=>{const o=orders[oi];d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffd890">🌿 약재 고르기 ${oi+1}/3</b><div style="font-size:13px;margin:4px 0">${o.w}의 처방: <b style="color:#ffd890">${o.n}</b></div><div style="font:15px 'Do Hyeon',sans-serif;margin:4px 0;line-height:1.6">${o.it.map(n=>got.has(n)?`<span style="color:#8ae08a">✔${n}</span>`:`<span>${n}</span>`).join(' · ')}</div><div id="dgT" style="font-size:13px"></div><div style="font-size:12px;opacity:.85">바구니 앞 고리를 밟으면 담아요. 처방에 없는 약재는 담지 마세요.</div>`};draw();
  for(const b of BAS)b.ring.material.opacity=.45;
  const fin=()=>{if(done)return;done=true;for(const b of BAS)b.ring.material.opacity=0;const el=performance.now()/1000-t0;const Q=oi>=3?Math.max(60,Math.round(100-Math.max(0,el-70)*.4-wrong*6)):Math.round(oi/3*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('daegu_herb',Q,'대구 약령시 약재 고르기')}catch(e){}window.__DGQ=Q;
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffd890">${oi>=3?'처방 셋을 다 지었어요!':oi+'첩 지었어요'}</b><div style="font-size:13px;margin:4px 0">약령시엔 봄·가을마다 전국에서 약재가 모였어요. 약방에선 처방에 맞게 약재를 저울에 달아 종이에 싸 한 첩씩 지어 주었어요. (놀이용 처방이에요. 약은 한의사와 상의해요.)</div><div style="font-size:26px;color:#c89a5a">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c89a5a;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__DGHERB(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},600)};
  const loop=()=>{if(!d.isConnected){for(const b of BAS)b.ring.material.opacity=0;return}const now=performance.now()/1000;const P=H.P;
   if(!done){let hit=null;for(const b of BAS)if(Math.hypot(P.x-b.x,P.z-b.z)<1.05){hit=b;break}
    if(hit&&hit!==lastHit){const o=orders[oi];if(o.it.includes(hit.n)){if(!got.has(hit.n)){got.add(hit.n);tone(600,900,.18);try{ctx.say(hit.n+' 담았어요',1)}catch(e){}if(o.it.every(n=>got.has(n))){oi++;got=new Set();tone(700,1200,.35);try{ctx.say(o.n+' 한 첩 완성!',1.6)}catch(e){}if(oi>=3){fin()}}if(!done)draw()}}else{wrong++;tone(260,150,.22);try{ctx.say(hit.n+'은(는) 이 처방에 없어요',1.4)}catch(e){}}}
    lastHit=hit;const T=d.querySelector('#dgT');const left=Math.max(0,TL-(now-t0));if(T)T.textContent=Math.ceil(left)+'초';if(left<=0)fin();
    for(const b of BAS)b.ring.material.opacity=.3+Math.sin(now*4)*.12}
   requestAnimationFrame(loop)};loop();
  window.__DGG={BAS,get orders(){return orders},get oi(){return oi},get wrong(){return wrong}};try{ctx.say('약방 손님 셋의 처방이 왔어요! 처방에 든 약재만 골라 담아요.',3)}catch(e){}};
 /* 발굴 탐지 */
 const mk=(fn)=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'상평통보',h:'조선 후기에 널리 쓴 엽전이에요. 가운데 네모 구멍에 줄을 꿰어 다녔어요. 약령시에서도 이 돈으로 약재를 사고팔았어요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.02,20),M(0x6a5a30,{metalness:.6,roughness:.5}));g.add(m);const h=new THREE.Mesh(new THREE.BoxGeometry(.06,.03,.06),M(0x1a1a1a));g.add(h)})},
  {n:'관인(관청 도장)',h:'관청이 문서에 찍던 네모난 구리 도장이에요. 관찰사의 명령은 이 도장이 찍혀야 효력이 있었어요.',mk:mk(g=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.2,.08,.2),M(0x8a6a30,{metalness:.6}));g.add(b);const k=new THREE.Mesh(new THREE.TorusGeometry(.05,.015,6,12),M(0x8a6a30,{metalness:.6}));k.position.y=.08;g.add(k)})},
  {n:'백자 약사발',h:'약을 달여 따르던 흰 그릇이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.18,16,8,0,Math.PI*2,Math.PI/2,Math.PI/2),M(0xf0ece0,{roughness:.3,side:THREE.DoubleSide}));m.rotation.x=Math.PI;g.add(m)})},
  {n:'약연',h:'약재를 갈던 배 모양 그릇과 바퀴예요. 바퀴 손잡이를 밀고 당겨 약재를 곱게 갈았어요.',mk:mk(g=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.5,.12,.14),M(0x5a5048,{metalness:.4}));g.add(b);const w=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.03,16),M(0x4a4038,{metalness:.4}));w.rotation.x=Math.PI/2;w.position.y=.1;g.add(w)})},
  {n:'감영 기와 조각',h:'감영 건물 지붕에 얹었던 기와 조각이에요. 감영 터 발굴에서 여러 시대의 기와가 나왔어요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.36,12,1,true,0,Math.PI),M(0x5a5a58,{side:THREE.DoubleSide}));m.rotation.z=Math.PI/2;g.add(m)})}];
 window.__DGDIG=()=>{window.__DETECT&&window.__DETECT({key:'daegu_dig',title:'경상감영 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[-18,-4],[-18,-22],[16,-34],[-10,14],[14,4],[18,-20],[-20,10],[10,20],[-6,-36]],items:ITEMS,intro:'경상감영 터 땅속에 조선 관청의 물건이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'경상감영은 300년 넘게 경상도를 다스린 곳이라 터 곳곳에서 조선 유물이 나와요.'})};
 const meta={quest:{t:'경상감영 둘러보기',d:'감영과 약령시를 둘러보세요.',steps:[['선화당','선화당'],['징청각','징청각'],['측우대','측우대'],['약령시','대구 약령시']]},
  title:'대구 경상감영·약령시',hint:'경상도 관찰사가 다스리던 감영과 그 곁 약령시를 공개 수치로 간추려 지었어요. 측우대를 보고, 약방 처방대로 약재를 골라 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,sign:{x:6,z:36,lines:['대구 경상감영·약령시','선화당 · 징청각','측우대(본뜸)','간추려 지음']}},
  npc:[['science',[[-8,14],[8,14],[8,22],[-8,22]]]],bounds:[-60,110,-60,60],level:()=>'경상감영',camCap:()=>Infinity,baseAt:()=>0,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.5,ox:20,oz:0,draw(g,X,Z,S){g.fillStyle='#c8b894';g.fillRect(0,0,300,300);g.fillStyle='#8a6a4a';g.fillRect(X(-10),Z(5),20*S,10*S);g.fillRect(X(-9),Z(-21),18*S,10*S);g.fillStyle='#9a9286';g.fillRect(X(22),Z(10),96*S,9*S);g.strokeStyle='#6a5a48';g.lineWidth=2;g.strokeRect(X(-26),Z(26),52*S,64*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:44,yaw:Math.PI},size:{}},meta)}
