/* 제주목 관아 마당(2026-11-19): 한국문화정보원(KCISA)이 실측한 3D(스케치팹 kcisameta, CC BY 4.0) 일곱 채를 실제 크기로 세운 조선 제주 관아.
   관덕정(보물, 담 밖 앞마당), 외대문 → 중대문 → 홍화각(목사 집무처)·연희각(목사 살림채) → 망경루(2층 누각), 동쪽 연못가 우련당.
   건물마다 높이 지도로 뽑은 바닥이라 기단과 마루에 올라설 수 있음. 배치는 제주목 관아 배치를 본떠 간추림(실제 거리와 조금 다름). */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildJejumok(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1709);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 const R90=Math.PI/2;/* [이름, x, z, 돌림] : 앞면이 남쪽(+z)을 보게 90도 돌림 */
 const B=[['oedae',0,38,R90],['jungdae',0,20,R90],['honghwa',-17,-2,R90],['yeonhui',17,-2,R90],['manggyeong',0,-30,R90],['uryeon',28,-34,R90],['gwandeok',-48,52,R90],['gyullim',-24,-34,0],['yeongju',21,22,R90]];
 /* 땅: 다진 흙 마당(담 안), 풀밭(담 밖), 돌길 */{const ET=tex(256,256,(q,w,h)=>{q.fillStyle='#b9a68a';q.fillRect(0,0,w,h);for(let i=0;i<2600;i++){q.fillStyle=r()<.5?'rgba(120,100,80,.35)':'rgba(220,205,180,.35)';q.fillRect(r()*w,r()*h,2,2)}},[20,20]);const yd=new THREE.Mesh(new THREE.PlaneGeometry(68,96),new THREE.MeshStandardMaterial({map:ET,roughness:1}));yd.rotation.x=-Math.PI/2;yd.position.set(0,.02,-6);yd.receiveShadow=true;G.add(yd);
  const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#6f8f45';q.fillRect(0,0,w,h);for(let i=0;i<3200;i++){q.fillStyle=r()<.5?'rgba(80,110,40,.5)':'rgba(140,150,80,.35)';q.fillRect(r()*w,r()*h,2,2)}},[40,40]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(240,240),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr);
  const PT=tex(256,256,(q,w,h)=>{q.fillStyle='#8a8478';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=40)for(let x=-(y/40%2)*30;x<w;x+=60){const v=120+(r()*35|0);q.fillStyle=`rgb(${v},${v-4},${v-10})`;q.fillRect(x+3,y+3,54,34)}},[2,14]);const pth=new THREE.Mesh(new THREE.PlaneGeometry(4,70),new THREE.MeshStandardMaterial({map:PT,roughness:.95}));pth.rotation.x=-Math.PI/2;pth.position.set(0,.04,26);G.add(pth);
  const sq=new THREE.Mesh(new THREE.PlaneGeometry(60,26),new THREE.MeshStandardMaterial({map:ET,roughness:1}));sq.rotation.x=-Math.PI/2;sq.position.set(-24,.03,52);G.add(sq)}
 /* 제주 돌담(현무암) 둘레, 외대문 자리만 틔움 */{const BT=tex(256,128,(q,w,h)=>{q.fillStyle='#2e2b28';q.fillRect(0,0,w,h);for(let i=0;i<90;i++){const v=50+(r()*35|0);q.fillStyle=`rgb(${v},${v-3},${v-6})`;q.beginPath();q.ellipse(r()*w,r()*h,8+r()*16,6+r()*10,r()*3,0,7);q.fill()}for(let i=0;i<500;i++){q.fillStyle='rgba(0,0,0,.4)';q.beginPath();q.arc(r()*w,r()*h,1+r()*1.5,0,7);q.fill()}},[1,1]);BT.wrapS=BT.wrapT=THREE.RepeatWrapping;
  const wall=(x0,z0,x1,z1)=>{const L=Math.hypot(x1-x0,z1-z0);const t=BT.clone();t.needsUpdate=true;t.repeat.set(L/3,1);const m=new THREE.Mesh(new THREE.BoxGeometry(L,1.9,.9),new THREE.MeshStandardMaterial({map:t,roughness:1}));m.position.set((x0+x1)/2,.95,(z0+z1)/2);m.rotation.y=-Math.atan2(z1-z0,x1-x0);m.castShadow=m.receiveShadow=true;G.add(m);S(x0-.45,x1+.45,0,1.9,z0-.45,z1+.45)};
  const X0=-33,X1=33,Z0=-52,Z1=40;wall(X0,Z0,X1,Z0);wall(X0,Z0,X0,Z1);wall(X1,Z0,X1,Z1);wall(X0,Z1,-6,Z1);wall(6,Z1,X1,Z1)}
 /* 우련당 연못 */{const pond=new THREE.Mesh(new THREE.CircleGeometry(1,40),new THREE.MeshStandardMaterial({color:0x3f6f72,roughness:.15,metalness:.2}));pond.rotation.x=-Math.PI/2;pond.scale.set(7,5,1);pond.position.set(28,.05,-20);G.add(pond);const rim=new THREE.Mesh(new THREE.TorusGeometry(1,.06,5,40),M(0x55504a));rim.rotation.x=Math.PI/2;rim.scale.set(7,5,1);rim.position.set(28,.08,-20);G.add(rim);S(21.5,34.5,0,.6,-24.5,-15.5)}
 /* 귤나무와 팽나무 */const GYUL=[];if(!mini){const tr=M(0x5a4430),lf=M(0x2f5a2a),or=M(0xf08a20);for(const[x,z]of[[-26,30],[-26,8],[31,10],[26,8],[-26,-44],[-12,-44],[12,-44],[-26,-20],[-33,-30],[-14,-26],[-17,-47],[-33,-46]]){const TO=[];GYUL.push({x,z,o:TO});const t=new THREE.Mesh(new THREE.CylinderGeometry(.14,.2,1.6,6),tr);t.position.set(x,.8,z);G.add(t);const c=new THREE.Mesh(new THREE.SphereGeometry(1.4,10,8),lf);c.position.set(x,2.2,z);c.scale.y=.8;G.add(c);for(let k=0;k<11;k++){const o=new THREE.Mesh(new THREE.SphereGeometry(.12,8,6),or);TO.push(o);const a=r()*6.28,b=r()*1.2;o.position.set(x+Math.cos(a)*1.3*Math.cos(b-.6),2.2+Math.sin(b-.6)*1.1,z+Math.sin(a)*1.3*Math.cos(b-.6));G.add(o)}solids.push({cx:x,cz:z,r:.3,y0:0,y1:3})}
  for(const[x,z]of[[-70,30],[-62,70],[-12,66],[40,62],[50,10],[-50,-20],[48,-50]]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.5,.8,5,8),tr);t.position.set(x,2.5,z);G.add(t);const c=new THREE.Mesh(new THREE.SphereGeometry(4,10,8),M(0x3f6a35));c.position.set(x,6.5,z);c.scale.y=.7;G.add(c);solids.push({cx:x,cz:z,r:.9,y0:0,y1:8})}}
 if(!mini){const gl=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(dr);
  for(const[n,x,z,ry]of B)gl.load(new URL('../models/jejumok/'+n+'.glb',import.meta.url).href,g=>{const o=g.scene;o.position.set(x,0,z);o.rotation.y=ry;o.userData.noBatch=true;o.traverse(e=>{if(e.isMesh){e.castShadow=e.receiveShadow=true;if(e.material){e.material.roughness=.85;e.material.metalness=0;e.material.envMapIntensity=.6}cam.push(e)}});G.add(o)},undefined,()=>{});
  fetch(new URL('../models/jejumok/floors.json',import.meta.url).href).then(r=>r.json()).then(F=>{for(const[n,ox,oz,ry]of B){const L=F[n];if(!L)continue;const c=Math.cos(ry),s=Math.sin(ry);for(const[x0,x1,z0,z1,h]of L){const a=[ox+x0*c+z0*s,oz-x0*s+z0*c],b=[ox+x1*c+z1*s,oz-x1*s+z1*c];S(a[0],b[0],-1,h,a[1],b[1])}}}).catch(()=>{})}
 const SRC='(3D: 한국문화정보원 KCISA, Sketchfab kcisameta, CC BY 4.0)';
 spots.push({x:-48,y:0,z:66,r:3.4,t:'관덕정',h:'조선 세종 30년(1448) 병사를 훈련하려고 세운 정자예요. 제주에서 가장 오래된 건물 가운데 하나로 보물이에요. 활쏘기와 군사 훈련, 잔치가 여기서 열렸어요. '+SRC});
 spots.push({x:0,y:0,z:46,r:3,t:'외대문',h:'제주목 관아로 들어가는 바깥 문이에요. 2층 누문으로 진해루라고도 불렀어요. '+SRC});
 spots.push({x:-24,y:0,z:-26,r:2.6,t:'귤림당',h:'귤나무 숲(귤림) 속에 지은 작은 정자예요. 목사가 책을 읽고 쉬던 곳이래요. '+SRC});
 spots.push({x:21,y:0,z:32,r:2.8,t:'영주협당',h:'제주목 관아의 군관들이 일을 보던 곳이에요. 영주는 제주의 옛 이름이에요. '+SRC});
 spots.push({x:0,y:0,z:27,r:2.6,t:'중대문',h:'바깥 마당과 안 마당을 나누는 가운데 문이에요. '+SRC});
 spots.push({x:-17,y:0,z:9,r:3,t:'홍화각',h:'제주 목사가 일을 보던 집무처예요. 이름은 임금의 큰 덕화가 백성에게 미친다는 뜻이래요. '+SRC});
 spots.push({x:17,y:0,z:9,r:3,t:'연희각',h:'목사가 머물며 정사를 보던 곳이에요. '+SRC});
 spots.push({x:28,y:0,z:-13,r:3,t:'우련당',h:'연못가에 지은 정자예요. 연꽃을 벗한다는 뜻의 이름처럼 연못을 바라보며 쉬던 곳이에요. '+SRC});
 spots.push({x:0,y:0,z:-18,r:3.4,t:'망경루',h:'관아 맨 안쪽의 2층 누각이에요. 이름은 서울(임금)을 바라본다는 뜻이에요. 멀리 바다 건너 한양을 그리던 목사의 마음이 담겼어요. '+SRC});
 /* 귤 따기(11/20): 귤림당 둘레 귤나무를 돌며 60초 안에 귤 30개. 나무 가까이 가면 '귤 따기'가 켜져요. 조선 때 제주 귤은 임금께 올리는 진상품이었대요 */
 window.__JJGYUL=()=>{if(document.getElementById('gyP')||!GYUL.length)return;const H=window.__H3,ctx=H.ctx();try{H.tp(-24,-20,0);H.face(Math.PI);H.cam(0,.35,7)}catch(e){}
  for(const t of GYUL)for(const o of t.o){o.visible=true;o.userData.gone=false}
  const d=document.createElement('div');d.id='gyP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#20381e;border:3px solid #f0a030;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:230px;user-select:none";document.body.appendChild(d);
  const NEED=30,TL=60;let got=0,done=false,t0=performance.now()/1000;
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffc060">🍊 귤림 귤 따기</b><div id="gyS" style="font:20px 'Do Hyeon',sans-serif;margin:4px 0">0 / ${NEED}</div><div id="gyT" style="font-size:13px;margin:2px 0">60초</div><div style="font-size:12px;opacity:.85">귤나무 가까이 가서 따요. 임금께 올릴 귤이에요!</div><button data-p style="font:18px 'Do Hyeon',sans-serif;background:#f0a030;color:#2a1a10;border:0;border-radius:10px;padding:8px 22px;margin-top:6px;cursor:pointer">귤 따기</button>`;
  const S=d.querySelector('#gyS'),T=d.querySelector('#gyT'),B=d.querySelector('[data-p]');
  const pop=()=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(520+got*12,s);o.frequency.exponentialRampToValueAtTime(980+got*12,s+.09);g.gain.setValueAtTime(.12,s);g.gain.exponentialRampToValueAtTime(.0001,s+.16);o.connect(g).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+.18)}catch(e){}};
  const near=()=>{const P=H.P;let b=null,bd=1e9;for(const t of GYUL){if(!t.o.some(o=>!o.userData.gone))continue;const dd=Math.hypot(t.x-P.x,t.z-P.z);if(dd<bd){bd=dd;b=t}}return{t:b,d:bd}};
  const pick=()=>{if(done)return;const n=near();if(!n.t||n.d>2.8){try{ctx.say(n.t?'귤나무 쪽으로 더 가까이 가요!':'귤을 다 땄어요!',1.5)}catch(e){}return}const o=n.t.o.find(o=>!o.userData.gone);o.userData.gone=true;got++;S.textContent=got+' / '+NEED;pop();
   const p0=o.position.clone(),st=performance.now();const P=H.P;(function hop(){const u=Math.min(1,(performance.now()-st)/380);o.position.set(p0.x+(P.x-p0.x)*u,p0.y+Math.sin(u*Math.PI)*.8+(1.2-p0.y)*u,p0.z+(P.z-p0.z)*u);if(u<1)requestAnimationFrame(hop);else{o.visible=false;o.position.copy(p0)}})();
   if(got%10===0)try{ctx.say(['귤 열 개! 새콤한 냄새가 나요.','스무 개! 진상 바구니가 차 가요.'][got/10-1]||'',2)}catch(e){}
   if(got>=NEED)fin()};
  B.onclick=pick;const kd=e=>{if(e.code==='Space'&&e.type==='keydown'&&!e.repeat){e.preventDefault();e.stopPropagation();pick()}};addEventListener('keydown',kd,true);
  const fin=()=>{if(done)return;done=true;removeEventListener('keydown',kd,true);const el=performance.now()/1000-t0;const Q=got>=NEED?Math.max(70,Math.round(100-Math.max(0,el-35)*1.2)):Math.round(got/NEED*65);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('jejumok_gyul',Q,'귤 따기')}catch(e){}window.__JJGQ=Q;
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffc060">귤 ${got}개를 땄어요</b><div style="font-size:13px;margin:4px 0">${got>=NEED?'진상 바구니를 가득 채웠어요!':'다음엔 나무 사이를 더 빨리 돌아 봐요.'}</div><div style="font-size:26px;color:#f0a030">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#f0a030;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__JJGYUL(),60)};d.querySelector('[data-x]').onclick=()=>{d.remove();for(const t of GYUL)for(const o of t.o){o.visible=true;o.userData.gone=false}}},700)};
  const loop=()=>{if(!d.isConnected){removeEventListener('keydown',kd,true);return}if(!done){const left=Math.max(0,TL-(performance.now()/1000-t0));T.textContent=Math.ceil(left)+'초';const n=near();const ok=n.t&&n.d<=2.8;B.style.opacity=ok?1:.45;B.textContent=ok?'귤 따기':'나무로 가요';if(left<=0)fin()}requestAnimationFrame(loop)};loop();
  window.__GYG={pick,get got(){return got},trees:GYUL};try{ctx.say('귤림당 둘레 귤나무예요. 60초 안에 귤 서른 개를 따 봐요!',3)}catch(e){}};
 const tick=()=>{};
 const meta={quest:{t:'제주목 관아 둘러보기',d:'조선 제주 관아의 일곱 채를 찾아보세요. 실측 3D라 실제 크기예요.',steps:[['관덕정','관덕정'],['외대문','외대문'],['중대문','중대문'],['홍화각','홍화각'],['연희각','연희각'],['우련당','우련당'],['망경루','망경루']]},
  title:'제주목 관아와 관덕정',hint:'한국문화정보원이 실측한 제주목 관아 건물 일곱 채를 실제 크기로 세웠어요. 관덕정 앞마당에서 외대문을 지나 망경루까지 걸어 보세요. '+SRC,
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,sign:{x:-20,z:60,lines:['제주목 관아','조선 제주 고을의 관청','관덕정 · 홍화각 · 망경루','실측 3D · 실제 크기']}},
  npc:[['base',[[-30,48],[-10,48],[-10,58],[-30,58]]],['ceramic',[[-6,10],[6,10],[6,-10],[-6,-10]]]],
  bounds:[-110,110,-100,100],level:P=>P.y>1.2?'마루 위':Math.abs(P.x)<33&&P.z<40&&P.z>-52?'관아 안마당':'관덕정 앞마당',camCap:()=>Infinity,
  baseAt:()=>0,tick,
  mini:{S:1.6,ox:-8,oz:6,draw(g,X,Z,S){g.fillStyle='#6f8f45';g.fillRect(0,0,300,300);g.fillStyle='#b9a68a';g.fillRect(X(-33),Z(-52),66*S,92*S);g.fillStyle='#2e2b28';g.strokeStyle='#2e2b28';g.lineWidth=2;g.strokeRect(X(-33),Z(-52),66*S,92*S);g.fillStyle='#8a3a2a';for(const[,x,z]of B)g.fillRect(X(x-6),Z(z-4),12*S,8*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-20,z:70,yaw:Math.PI},size:{}},meta)}
