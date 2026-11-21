/* 산청·하동 지리산 자락 마당(2026-11-21).
   공개 실측: 산청 괘석리 사사자 삼층석탑(스케치팹 lacomi1975 「Gwaeseok-ri Four Lions Three-story Stone Pagoda」 CC BY, 사진 측량, 실제 크기 약 3.4m).
   남명 조식의 산천재(남명매), 하동 화개장터·차밭·섬진강은 공개 사진과 수치로 간추려 지음(집은 hanokkit 실측 한옥·초가 CC BY).
   하동 화개는 신라 흥덕왕 때(828) 대렴이 당에서 가져온 차씨를 지리산 자락에 심었다는 기록이 있는 「차 시배지」. 놀이: 녹차 덖기(가마솥 온도 맞추며 덖기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {placeHanok} from './hanokkit.js';
export function buildSancheong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(2471);
 const TOUCH=opts.touch!=null?!!opts.touch:matchMedia('(pointer:coarse)').matches;
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 동쪽 차밭 언덕(x 30~74, 계단식 높이 최대 10.5m), 그 너머 섬진강(x>84) */
 const RX=84;const step=v=>Math.floor(v/1.5)*1.5;
 const H=(x,z)=>{if(x>RX)return -2;if(x<30||x>76)return 0;const u=(x-30)/22;let h=x<52?step(u*10.5):step((76-x)/24*10.5);const zf=Math.max(0,1-Math.max(0,Math.abs(z)-40)/12);return Math.max(0,h*zf)};
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(240,220,240,110);g.rotateX(-Math.PI/2);g.translate(10,0,0);const p=g.attributes.position;const col=[];const c=new THREE.Color();
  for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);const h=H(x,z);p.setY(k,x>RX?-3:h);c.set(x>RX-2?'#d8c8a0':h>0?'#6a8a3a':'#8a9a4a');col.push(c.r,c.g,c.b)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1}));m.receiveShadow=true;G.add(m)}
 /* 섬진강 */const WT=tex(256,256,(q,w,h)=>{q.fillStyle='#4a7a80';q.fillRect(0,0,w,h);for(let i=0;i<200;i++){q.strokeStyle=`rgba(220,240,240,${.08+r()*.12})`;q.lineWidth=1+r()*2;const x=r()*w,y=r()*h;q.beginPath();q.moveTo(x,y);q.lineTo(x+20+r()*20,y);q.stroke()}},[4,8]);WT.wrapS=WT.wrapT=THREE.RepeatWrapping;
 {const rv=new THREE.Mesh(new THREE.PlaneGeometry(70,400),new THREE.MeshStandardMaterial({map:WT,roughness:.12,metalness:.2}));rv.rotation.x=-Math.PI/2;rv.position.set(RX+36,-.7,0);G.add(rv);solids.push({x0:RX+2,x1:RX+200,y0:-6,y1:20,z0:-200,z1:200})}
 /* 차밭: 계단 위 줄줄이 차나무 */{const im=new THREE.InstancedMesh(new THREE.SphereGeometry(.55,8,6),M(0x2f6a2a,{roughness:.8}),1400);const o=new THREE.Object3D();let n=0;for(let x=31;x<75&&n<1400;x+=1.5)for(let z=-38;z<=38&&n<1400;z+=1.4){const h=H(x+.75,z);if(h<=0)continue;o.position.set(x+.75,h+.35,z);o.scale.set(1.1,.7,1.2);o.updateMatrix();im.setMatrixAt(n++,o.matrix)}im.count=n;im.castShadow=true;G.add(im)}
 /* 산천재(남명 조식이 61세에 지어 제자를 가르친 집) + 남명매 */
 if(!mini){const h=buildHall({x:-40,z:-12,ry:0,W:9,D:5,nx:3,nz:1,FY:.6,PH:2.8,roof:'gable',name:'山天齋',pillar:0x8a6a48,bracket:'ik',front:'open',solids,light:false,roofScale:.9,plain:true});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 {const t=new THREE.Group();t.position.set(-33,0,-4);const bm=M(0x3a2a20);const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.18,.32,2.2,7),bm);trunk.position.y=1.1;trunk.rotation.z=.2;t.add(trunk);for(let i=0;i<6;i++){const b=new THREE.Mesh(new THREE.CylinderGeometry(.05,.1,1.8,5),bm);b.position.set(Math.cos(i)*.6,2.4,Math.sin(i)*.6);b.rotation.set(Math.sin(i*2)*.7,0,Math.cos(i*2)*.7);t.add(b)}const fl=new THREE.InstancedMesh(new THREE.SphereGeometry(.09,6,4),M(0xffd6e0,{roughness:.6}),160);const o=new THREE.Object3D();for(let k=0;k<160;k++){const a=r()*6.28,rr=.3+r()*1.4;o.position.set(Math.cos(a)*rr,2.1+r()*1.5,Math.sin(a)*rr);o.updateMatrix();fl.setMatrixAt(k,o.matrix)}t.add(fl);G.add(t);solids.push({cx:-33,cz:-4,r:.4,y0:0,y1:3})}
 /* 괘석리 사사자 삼층석탑 실측 */const AX=-52,AZ=20;{const bs=new THREE.Mesh(new THREE.CylinderGeometry(3.2,3.4,.3,24),M(0xb0a898));bs.position.set(AX,.15,AZ);G.add(bs);solids.push({cx:AX,cz:AZ,r:1.9,y0:0,y1:4})}
 if(!mini){const L=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');L.setDRACOLoader(dr);L.load(new URL('../models/sancheong/four.glb',import.meta.url).href,m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;if(e.material){e.material.transparent=false;e.material.alphaTest=0}cam.push(e)}});const b=new THREE.Box3().setFromObject(o);const c=b.getCenter(new THREE.Vector3());o.position.set(AX-c.x,.3-b.min.y,AZ-c.z);o.userData.noBatch=true;G.add(o)},undefined,()=>{})}
 /* 마을 집(실측) */if(!mini){for(const[k,x,z,ry]of[['sarang',-62,-30,0],['choga1',-20,-34,0],['choga2',-70,0,Math.PI/2],['nongga',-20,40,Math.PI]])placeHanok(G,solids,k,x,z,ry,{TOUCH,s:.7})}
 /* 화개장터: 지붕 덮은 좌판 줄 */const goods=[0x3a6a2a,0xc8a060,0x8a3a1a,0xe8641a,0x6a4a8a,0xd8d0c0];{const wm=M(0x7a5a38),rm=M(0x5a5a60);for(let i=0;i<6;i++){const x=-2+i*5,z=26;for(const[dx,dz]of[[-2,-1.4],[2,-1.4],[-2,1.4],[2,1.4]]){const p=new THREE.Mesh(new THREE.BoxGeometry(.15,2.6,.15),wm);p.position.set(x+dx,1.3,z+dz);G.add(p)}const rf=new THREE.Mesh(new THREE.BoxGeometry(4.6,.12,3.4),rm);rf.position.set(x,2.65,z);rf.rotation.x=.08;G.add(rf);const tb=new THREE.Mesh(new THREE.BoxGeometry(3.4,.8,1.6),wm);tb.position.set(x,.4,z-.3);G.add(tb);for(let k=0;k<8;k++){const gq=new THREE.Mesh(new THREE.SphereGeometry(.18,8,6),M(goods[(i+k)%6]));gq.position.set(x-1.3+(k%4)*.85,.95,z-.6+((k/4)|0)*.6);G.add(gq)}solids.push({x0:x-1.8,x1:x+1.8,y0:0,y1:1,z0:z-1.2,z1:z+.6})}}
 /* 덖음 차 가마솥 부뚜막 */const TX=18,TZ=-6;let pan,leaves;{const bt=new THREE.Mesh(new THREE.BoxGeometry(2.4,.9,1.8),M(0x9a7a5a));bt.position.set(TX,.45,TZ);G.add(bt);pan=new THREE.Mesh(new THREE.SphereGeometry(.8,24,10,0,Math.PI*2,Math.PI/2,Math.PI/2),M(0x2a2a2a,{metalness:.6,roughness:.4,side:THREE.DoubleSide}));pan.scale.y=.35;pan.position.set(TX,1.2,TZ);G.add(pan);const fire=new THREE.PointLight(0xff6a20,0,4,1.5);fire.position.set(TX,.3,TZ+1);G.add(fire);pan.userData.fire=fire;
  leaves=new THREE.InstancedMesh(new THREE.BoxGeometry(.12,.015,.06),M(0x5aa03a),60);const o=new THREE.Object3D();for(let k=0;k<60;k++){const a=r()*6.28,rr=r()*.5;o.position.set(TX+Math.cos(a)*rr,.95+.04*r()+rr*rr*.25,TZ+Math.sin(a)*rr);o.rotation.y=r()*6;o.updateMatrix();leaves.setMatrixAt(k,o.matrix)}leaves.visible=false;G.add(leaves);solids.push({x0:TX-1.2,x1:TX+1.2,y0:0,y1:1.2,z0:TZ-.9,z1:TZ+.9});
  const sh=new THREE.Mesh(new THREE.BoxGeometry(5,.12,4),M(0x6a5a40));sh.position.set(TX,3,TZ);G.add(sh);for(const[dx,dz]of[[-2.3,-1.8],[2.3,-1.8],[-2.3,1.8],[2.3,1.8]]){const p=new THREE.Mesh(new THREE.BoxGeometry(.18,3,.18),M(0x7a5a38));p.position.set(TX+dx,1.5,TZ+dz);G.add(p)}}
 /* 밤 */const NL=[];if(!mini){for(const[x,z]of[[TX,TZ+3],[10,22],[-40,-6],[AX,AZ-4]]){const L=new THREE.PointLight(0xffc080,0,18,1.5);L.position.set(x,3,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7;WT.offset.y+=dt*.03};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(AX+3.6,AZ,3,'괘석리 사사자 삼층석탑','네 마리 사자가 탑의 몸돌을 떠받치는 통일신라 말~고려 초 석탑이에요(산청 단성면 괘석리). 공개 실측(lacomi1975, CC BY)을 실제 크기로 옮겼어요.');
 sp(-40,-5,3,'산천재','남명 조식(1501~1572)이 61세에 지리산 천왕봉이 보이는 이곳에 짓고 제자를 가르친 집이에요. 「경(敬)과 의(義)」를 내세워 실천을 중시했어요. 간추려 지었어요.');
 sp(-33,0,2,'남명매','남명이 손수 심었다는 매화나무예요. 산청 3매(남명매·원정매·정당매) 가운데 하나로, 이른 봄에 꽃을 피워요.');
 sp(TX-2.2,TZ+2,1.8,'덖음 차 가마솥','갓 딴 찻잎을 뜨거운 가마솥에 덖어 녹차를 만들어 봐요.');
 sp(10,22,3,'화개장터','경상도 하동과 전라도 구례 사람들이 섬진강을 따라 모여 장을 보던 곳이에요. 지금도 녹차·산나물·약초가 많이 나와요. 간추려 지었어요.');
 sp(40,0,3,'하동 차 시배지','신라 흥덕왕 3년(828) 대렴이 당에서 가져온 차씨를 지리산 자락에 심었다고 해요. 하동 전통 차 농업은 세계중요농업유산이에요.');
 sp(-10,10,2.4,'발굴 탐지 자리','지리산 자락 땅속에 옛 사람들의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 녹차 덖기(11/21): 가마솥 온도를 「알맞음」 칸에 두고 「덖기」로 찻잎을 계속 뒤집어 주면 한 솥이 익어요. 너무 뜨거우면 탐. 세 솥, 80초 */
 window.__SCTEA=()=>{if(document.getElementById('scP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(TX-2.2,TZ+2.2,0);H3.face(Math.PI*.75)}catch(e){}
  window.__GCAM=()=>document.getElementById('scP')?[TX-1.6,2.9,TZ+2.2,TX,1,TZ,55]:null;leaves.visible=true;
  let temp=40,prog=0,batch=0,burn=0,lastStir=-9,done=false,t0=performance.now()/1000,last=t0;const N=3,TL=80,LO=62,HI=82;
  const d=document.createElement('div');d.id='scP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1e2a16;border:3px solid #7ab04a;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef4e0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:240px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#bde08a">🍵 녹차 덖기</b><div id="scS" style="font:19px 'Do Hyeon',sans-serif;margin:4px 0">0 / ${N}솥</div><div style="font-size:12px;text-align:left">솥 온도</div><div style="position:relative;height:16px;background:#333;border-radius:8px;overflow:hidden"><div style="position:absolute;left:${LO}%;width:${HI-LO}%;top:0;bottom:0;background:#4a8a2a"></div><div id="scTm" style="position:absolute;top:0;bottom:0;width:4px;background:#ffd040"></div></div><div style="font-size:12px;text-align:left;margin-top:4px">익은 정도</div><div style="height:10px;background:#333;border-radius:5px;overflow:hidden"><div id="scPg" style="height:100%;width:0;background:#9ad060"></div></div><div id="scG" style="font-size:13px;color:#bde08a;margin:4px 0">불을 넣어 솥을 달궈요</div><div style="display:flex;gap:8px"><button id="scF" style="flex:1;font:17px 'Do Hyeon',sans-serif;background:#e86a2a;color:#fff;border:0;border-radius:12px;padding:12px 0;cursor:pointer">🔥 불 넣기</button><button id="scR" style="flex:1;font:17px 'Do Hyeon',sans-serif;background:#7ab04a;color:#1a2a10;border:0;border-radius:12px;padding:12px 0;cursor:pointer">🖐 덖기</button></div><div id="scT" style="font-size:13px;margin-top:4px">${TL}초</div>`;
  const Sx=d.querySelector('#scS'),Tm=d.querySelector('#scTm'),Pg=d.querySelector('#scPg'),Gd=d.querySelector('#scG'),T=d.querySelector('#scT');
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const col=new THREE.Color(),cA=new THREE.Color(0x5aa03a),cB=new THREE.Color(0x3a5a22),cX=new THREE.Color(0x2a2016);
  const fire=()=>{if(done)return;temp=Math.min(110,temp+11);snd(180,.15,'sawtooth')};
  const stir=()=>{if(done)return;lastStir=performance.now()/1000;snd(900+r()*300,.05,'square');leaves.position.set((r()-.5)*.06,0,(r()-.5)*.06)};
  d.querySelector('#scF').onclick=fire;d.querySelector('#scR').onclick=stir;const onKey=e=>{if(e.code==='KeyF'){e.preventDefault();fire()}else if(e.code==='Space'){e.preventDefault();stir()}};addEventListener('keydown',onKey);
  const fin=()=>{if(done)return;done=true;removeEventListener('keydown',onKey);leaves.visible=false;pan.userData.fire.intensity=0;const el=performance.now()/1000-t0;const Q=batch>=N?Math.max(65,Math.round(100-Math.max(0,el-45)*.9)):Math.round(batch/N*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('sancheong_tea',Q,'하동 녹차 덖기')}catch(e){}window.__SCQ=Q;
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#bde08a">${batch>=N?'녹차 세 솥을 다 덖었어요!':'녹차 '+batch+'솥을 덖었어요'}</b><div style="font-size:13px;margin:4px 0">뜨거운 솥에 찻잎을 덖으면 풋내가 날아가고 잎이 부드러워져요. 덖고 비비기를 여러 번 되풀이해 「덖음차」를 만들어요.</div><div style="font-size:26px;color:#9ad060">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#7ab04a;color:#1a2a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef4e0;border:2px solid #eef4e0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__SCTEA(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},500)};
  const loop=()=>{if(!d.isConnected){removeEventListener('keydown',onKey);leaves.visible=false;pan.userData.fire.intensity=0;return}const now=performance.now()/1000,dt=Math.min(.1,now-last);last=now;
   if(!done){temp=Math.max(20,temp-5*dt);const stirring=now-lastStir<.7;const ok=temp>=LO&&temp<=HI;
    if(temp>HI+8){burn+=dt;Gd.textContent='너무 뜨거워요! 불을 쉬어요';if(burn>1.5){prog=0;burn=0;temp=70;Gd.textContent='찻잎이 탔어요… 새 잎으로 다시';snd(140,.4,'sawtooth')}}else{burn=Math.max(0,burn-dt);if(ok&&stirring){prog+=dt/7;Gd.textContent='좋아요! 계속 덖어요'}else if(ok)Gd.textContent='「덖기」로 잎을 뒤집어요';else if(temp<LO)Gd.textContent='불을 넣어 솥을 달궈요'}
    if(prog>=1){batch++;prog=0;snd(660,.25);Sx.textContent=batch+' / '+N+'솥';Gd.textContent='한 솥 완성! 새 잎을 덖어요';if(batch>=N)fin()}
    Tm.style.left=Math.min(98,temp)+'%';Pg.style.width=Math.round(prog*100)+'%';col.copy(cA).lerp(cB,prog);if(burn>0)col.lerp(cX,burn/1.5);leaves.material.color.copy(col);pan.userData.fire.intensity=Math.max(0,(temp-30)/12);
    const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin()}
   requestAnimationFrame(loop)};loop();
  window.__SCT={fire,stir,get temp(){return temp},get batch(){return batch}};try{ctx.say('가마솥에 찻잎을 덖어요!',2.2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'찻사발 조각',h:'차를 마시던 사발 조각이에요. 화개는 우리나라 차 시배지로 알려져 있어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.1,.14,16,1,true),M(0x8a7a5a,{side:THREE.DoubleSide})))})},
  {n:'분청사기 접시',h:'산청 방목리 가마터에서는 조선 분청사기가 많이 나왔어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.13,.05,18),M(0xa8a090)))})},
  {n:'돌 사자 조각',h:'석탑을 떠받치던 사자처럼 생긴 작은 돌조각이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.16,.2,.1),M(0xb0a898));g.add(m)})},
  {n:'상평통보',h:'화개장터에서 오가던 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})},
  {n:'먹과 벼루 조각',h:'산천재에서 글을 배우던 선비들이 쓰던 벼루 조각일지도 몰라요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.04,.13),M(0x2a2a2e)))})}];
 window.__SCDIG=()=>{window.__DETECT&&window.__DETECT({key:'sancheong_dig',title:'산청·하동 발굴 탐지',emoji:'⛏️',bg:'#1e2a16',count:4,TL:150,cand:[[-10,10],[-30,-26],[0,-20],[-60,40],[10,40],[-26,26],[-6,-40],[-74,-18]],items:ITEMS,intro:'지리산 자락 땅속에 옛 사람들의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'지리산 자락은 선비의 공부, 차 농사, 장터가 함께 이어진 곳이에요.'})};
 const meta={quest:{t:'지리산 자락 둘러보기',d:'산청과 하동을 둘러보세요.',steps:[['사자탑','괘석리 사사자 삼층석탑'],['산천재','산천재'],['장터','화개장터'],['차밭','하동 차 시배지']]},
  title:'산청·하동 지리산 자락',hint:'괘석리 사사자 삼층석탑은 공개 실측, 산천재·화개장터·차밭은 간추려 지었어요(집은 실측). 가마솥에 녹차를 덖어 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,groundY:-3.5,sign:{x:-4,z:4,lines:['산청·하동 지리산 자락','사사자 삼층석탑 · 산천재','화개장터 · 차 시배지','실측 + 간추려 지음']}},
  npc:[['science',[[-6,6],[6,6],[6,16],[-6,16]]]],bounds:[-100,RX+1,-100,100],level:()=>'산청·하동',camCap:()=>Infinity,baseAt:(x,z)=>Math.max(0,H(x,z)),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:-5,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#2f6a2a';g.fillRect(X(30),Z(-40),46*S,80*S);g.fillStyle='#4a7a80';g.fillRect(X(RX),0,300,300);g.fillStyle='#b0a898';g.beginPath();g.arc(X(AX),Z(AZ),4,0,7);g.fill();g.fillStyle='#8a5a3a';g.fillRect(X(-2),Z(24),30*S,4*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-4,z:12,yaw:Math.PI},size:{}},meta)}
