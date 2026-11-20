/* 수원 화성행궁 마당(2026-11-19): 한국문화정보원(KCISA)이 실측한 3D(스케치팹 kcisameta, CC BY 4.0) 일곱 채를 실제 크기로 세운 정조의 행궁.
   정문 신풍루 → 좌익문 → 중양문 → 봉수당(정조가 어머니 혜경궁 회갑잔치를 연 곳), 뒤쪽 복내당, 서쪽 활터 득중정, 뒷동산 미로한정.
   건물마다 높이 지도로 뽑은 바닥이라 기단과 마루에 올라설 수 있음. 배치는 화성행궁을 본떠 간추림(실제 거리와 조금 다름). */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildHaenggung(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1777);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 const R90=Math.PI/2;/* [이름, x, z, 돌림] : 앞면이 남쪽(+z)을 보게 90도 돌림 */
 const B=[['sinpung',0,44,R90],['jwaik',0,26,R90],['jungyang',0,10,R90],['bongsu',0,-14,R90],['boknae',22,-38,R90],['deukjung',-44,-18,0],['miro',-8,-52,R90],['naknam',-40,-42,R90],['yuyeo',36,-12,R90],['gyeongryong',36,-32,R90],['namgun',-22,32,R90],['bukgun',22,32,R90],['oejeong',32,16,0],['jipsa',-30,14,0],['unhan',-92,-10,0]];
 /* 땅: 다진 흙 마당(담 안), 풀밭(담 밖), 돌길 */{const ET=tex(256,256,(q,w,h)=>{q.fillStyle='#b9a68a';q.fillRect(0,0,w,h);for(let i=0;i<2600;i++){q.fillStyle=r()<.5?'rgba(120,100,80,.35)':'rgba(220,205,180,.35)';q.fillRect(r()*w,r()*h,2,2)}},[20,20]);const yd=new THREE.Mesh(new THREE.PlaneGeometry(122,104),new THREE.MeshStandardMaterial({map:ET,roughness:1}));yd.rotation.x=-Math.PI/2;yd.position.set(-12,.02,-6);yd.receiveShadow=true;G.add(yd);
  const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#6f8f45';q.fillRect(0,0,w,h);for(let i=0;i<3200;i++){q.fillStyle=r()<.5?'rgba(80,110,40,.5)':'rgba(140,150,80,.35)';q.fillRect(r()*w,r()*h,2,2)}},[40,40]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(240,240),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr);
  const PT=tex(256,256,(q,w,h)=>{q.fillStyle='#8a8478';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=40)for(let x=-(y/40%2)*30;x<w;x+=60){const v=120+(r()*35|0);q.fillStyle=`rgb(${v},${v-4},${v-10})`;q.fillRect(x+3,y+3,54,34)}},[2,14]);const pth=new THREE.Mesh(new THREE.PlaneGeometry(4,70),new THREE.MeshStandardMaterial({map:PT,roughness:.95}));pth.rotation.x=-Math.PI/2;pth.position.set(0,.04,26);G.add(pth);
  const sq=new THREE.Mesh(new THREE.PlaneGeometry(70,24),new THREE.MeshStandardMaterial({map:ET,roughness:1}));sq.rotation.x=-Math.PI/2;sq.position.set(0,.03,60);G.add(sq)}
 /* 행궁 담장, 신풍루 자리만 틔움 */{const BT=tex(256,128,(q,w,h)=>{q.fillStyle='#8a8478';q.fillRect(0,0,w,h);for(let i=0;i<90;i++){const v=130+(r()*35|0);q.fillStyle=`rgb(${v},${v-3},${v-6})`;q.beginPath();q.ellipse(r()*w,r()*h,8+r()*16,6+r()*10,r()*3,0,7);q.fill()}for(let i=0;i<500;i++){q.fillStyle='rgba(0,0,0,.4)';q.beginPath();q.arc(r()*w,r()*h,1+r()*1.5,0,7);q.fill()}},[1,1]);BT.wrapS=BT.wrapT=THREE.RepeatWrapping;
  const wall=(x0,z0,x1,z1)=>{const L=Math.hypot(x1-x0,z1-z0);const t=BT.clone();t.needsUpdate=true;t.repeat.set(L/3,1);const m=new THREE.Mesh(new THREE.BoxGeometry(L,1.9,.9),new THREE.MeshStandardMaterial({map:t,roughness:1}));m.position.set((x0+x1)/2,.95,(z0+z1)/2);m.rotation.y=-Math.atan2(z1-z0,x1-x0);m.castShadow=m.receiveShadow=true;G.add(m);S(x0-.45,x1+.45,0,1.9,z0-.45,z1+.45)};
  const X0=-72,X1=48,Z0=-58,Z1=46;wall(X0,Z0,X1,Z0);wall(X0,Z0,X0,Z1);wall(X1,Z0,X1,Z1);wall(X0,Z1,-6,Z1);wall(6,Z1,X1,Z1)}
 /* 득중정 활터 과녁 */{const c=document.createElement('canvas');c.width=128;c.height=160;const q=c.getContext('2d');q.fillStyle='#f4efe2';q.fillRect(0,0,128,160);q.fillStyle='#1c1c1c';q.fillRect(0,0,128,16);q.fillRect(0,144,128,16);q.fillStyle='#b8241c';q.beginPath();q.ellipse(64,80,30,38,0,0,7);q.fill();const tx=new THREE.CanvasTexture(c);const t=new THREE.Mesh(new THREE.BoxGeometry(2,2.6,.12),[M(0x6a4a30),M(0x6a4a30),M(0x6a4a30),M(0x6a4a30),new THREE.MeshStandardMaterial({map:tx}),M(0x6a4a30)]);t.position.set(-44,1.5,10);t.rotation.y=Math.PI;G.add(t);S(-45.1,-42.9,0,3,9.8,10.2)}
 /* 귤나무와 팽나무 */if(!mini){const tr=M(0x5a4430),lf=M(0x2f5a2a),or=M(0xf08a20);for(const[x,z]of[[-20,30],[-20,14],[20,30],[20,14],[-34,-48],[34,-48],[-60,-40],[-60,30]]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.14,.2,1.6,6),tr);t.position.set(x,.8,z);G.add(t);const c=new THREE.Mesh(new THREE.SphereGeometry(1.4,10,8),lf);c.position.set(x,2.2,z);c.scale.y=.8;G.add(c);for(let k=0;k<9;k++){const o=new THREE.Mesh(new THREE.SphereGeometry(.09,6,5),or);const a=r()*6.28,b=r()*1.2;o.position.set(x+Math.cos(a)*1.3*Math.cos(b-.6),2.2+Math.sin(b-.6)*1.1,z+Math.sin(a)*1.3*Math.cos(b-.6));G.add(o)}solids.push({cx:x,cz:z,r:.3,y0:0,y1:3})}
  for(const[x,z]of[[-80,50],[-40,70],[40,70],[60,20],[60,-30],[-85,-20],[-30,-70],[30,-70]]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.5,.8,5,8),tr);t.position.set(x,2.5,z);G.add(t);const c=new THREE.Mesh(new THREE.SphereGeometry(4,10,8),M(0x3f6a35));c.position.set(x,6.5,z);c.scale.y=.7;G.add(c);solids.push({cx:x,cz:z,r:.9,y0:0,y1:8})}}
 if(!mini){const gl=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(dr);
  for(const[n,x,z,ry]of B)gl.load(new URL('../models/haenggung/'+n+'.glb',import.meta.url).href,g=>{const o=g.scene;o.position.set(x,0,z);o.rotation.y=ry;o.userData.noBatch=true;o.traverse(e=>{if(e.isMesh){e.castShadow=e.receiveShadow=true;if(e.material){e.material.roughness=.85;e.material.metalness=0;e.material.envMapIntensity=.6}cam.push(e)}});G.add(o)},undefined,()=>{});
  fetch(new URL('../models/haenggung/floors.json',import.meta.url).href).then(r=>r.json()).then(F=>{for(const[n,ox,oz,ry]of B){const L=F[n];if(!L)continue;const c=Math.cos(ry),s=Math.sin(ry);for(const[x0,x1,z0,z1,h]of L){const a=[ox+x0*c+z0*s,oz-x0*s+z0*c],b=[ox+x1*c+z1*s,oz-x1*s+z1*c];S(a[0],b[0],-1,h,a[1],b[1])}}}).catch(()=>{})}
 const SRC='(3D: 한국문화정보원 KCISA, Sketchfab kcisameta, CC BY 4.0)';/* 꽃나무는 벚꽃 빛 */
 spots.push({x:0,y:0,z:54,r:3.4,t:'신풍루',h:'화성행궁의 정문이에요. 정조가 새로운 고향이라는 뜻으로 신풍루라 이름 붙였어요. 2층 누문이에요. '+SRC});
 spots.push({x:0,y:0,z:33,r:2.6,t:'좌익문',h:'신풍루 다음의 중간 문이에요. '+SRC});
 spots.push({x:0,y:0,z:16,r:2.6,t:'중양문',h:'봉수당 앞마당으로 들어가는 안쪽 문이에요. '+SRC});
 spots.push({x:0,y:0,z:5,r:3.4,t:'봉수당',h:'행궁의 으뜸 건물이에요. 1795년 정조가 어머니 혜경궁 홍씨의 회갑 잔치를 여기서 열었어요. 오래 사시라는 뜻의 이름이에요. '+SRC});
 spots.push({x:22,y:0,z:-26,r:3,t:'복내당',h:'행궁의 안채예요. 왕이 머무는 동안 살림을 하던 곳이에요. '+SRC});
 spots.push({x:-44,y:0,z:-8,r:3.4,t:'득중정',h:'정조가 활을 쏘던 활터 정자예요. 활을 쏘아 과녁을 맞히면 마음을 얻는다는 뜻이에요. 정조는 활을 아주 잘 쐈대요. '+SRC});
 spots.push({x:-40,y:0,z:-24,r:3.4,t:'낙남헌',h:'정조가 혜경궁 회갑 때 군사들에게 상을 내리고 과거 시험을 치른 큰 건물이에요. 일제 강점기에도 헐리지 않고 남은 행궁 건물이에요. '+SRC});
 spots.push({x:36,y:0,z:-2,r:3,t:'유여택',h:'정조가 행궁에 머물 때 신하들을 만나던 곳이에요. '+SRC});
 spots.push({x:36,y:0,z:-24,r:2.6,t:'경룡관',h:'봉수당 뒤쪽으로 이어지는 건물이에요. 용(임금)이 기쁘게 머문다는 뜻이래요. '+SRC});
 spots.push({x:-22,y:0,z:40,r:2.8,t:'남군영',h:'행궁을 지키던 군사들이 머물던 곳이에요. 북군영과 짝을 이뤄 정문 안쪽 양옆에 있어요. '+SRC});
 spots.push({x:22,y:0,z:40,r:2.8,t:'북군영',h:'남군영과 마주 보는 군사 숙소예요. '+SRC});
 spots.push({x:32,y:0,z:24,r:2.6,t:'외정리소',h:'정조의 화성 행차를 준비하던 관청이에요. 원행을묘정리의궤를 펴낸 곳으로 이어져요. '+SRC});
 spots.push({x:-30,y:0,z:22,r:2.6,t:'집사청',h:'행궁 일을 보던 집사들이 머물던 곳이에요. '+SRC});
 spots.push({x:-92,y:0,z:16,r:3.4,t:'화령전 운한각',h:'정조의 초상(어진)을 모신 화령전의 으뜸 건물이에요. 순조가 아버지 정조를 기리려고 1801년에 지었고, 지금도 처음 모습 그대로 남아 보물로 지정됐어요. '+SRC});
 spots.push({x:-8,y:0,z:-44,r:3,t:'미로한정',h:'행궁 뒷동산의 작은 정자예요. 정조가 늙으면 여기서 쉬겠다고 이름 붙였어요. '+SRC});
 /* 정조처럼 활쏘기(11/20): 득중정에서 과녁(18m)으로 열 발. 흔들리는 조준점을 멈춰 쏘고, 바람이 살짝 밀어요. 정조는 50발 중 49발을 맞혔대요 */
 const AR={list:[]};const TX=-44,TY=1.5,TZ=9.9;
 window.__HGARCH=()=>{if(document.getElementById('arP'))return;const H=window.__H3,ctx=H.ctx();try{H.tp(-42.6,-9,0);H.face(-.12);H.cam(Math.PI+.12,.02,3)}catch(e){}
  for(const a of AR.list)G.remove(a);AR.list.length=0;
  const aim=new THREE.Mesh(new THREE.RingGeometry(.14,.24,24),new THREE.MeshBasicMaterial({color:0xffe070,depthTest:false,transparent:true,opacity:.95,side:THREE.DoubleSide}));aim.renderOrder=9;aim.rotation.y=Math.PI;G.add(aim);
  const d=document.createElement('div');d.id='arP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2b1d14;border:3px solid #e0b048;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:230px;user-select:none";document.body.appendChild(d);
  const N=10;let n=0,pts=0,hit=0,flying=false,done=false,t0=performance.now()/1000,wind=0;const newWind=()=>{wind=(Math.random()-.5)*.9};newWind();
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffd890">🏹 정조처럼 활쏘기</b><div id="arS" style="font:20px 'Do Hyeon',sans-serif;margin:4px 0">0 / ${N}발 · 0점</div><div id="arW" style="font-size:13px;margin:2px 0"></div><div style="font-size:12px;opacity:.85">노란 고리가 과녁 가운데 올 때 쏘세요. 빨간 곳은 2점, 과녁 판은 1점</div><button data-s style="font:18px 'Do Hyeon',sans-serif;background:#e0b048;color:#2a1a10;border:0;border-radius:10px;padding:8px 22px;margin-top:6px;cursor:pointer">쏘기!</button>`;
  const S=d.querySelector('#arS'),W=d.querySelector('#arW');const showW=()=>{const k=Math.round(Math.abs(wind)*10);W.textContent=k<1?'바람 없음':'바람 '+(wind>0?'← ':'→ ')+'세기 '+k};showW();
  const snd=(f1,f2,dur,type='triangle',v=.12)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.setValueAtTime(f1,s);o.frequency.exponentialRampToValueAtTime(f2,s+dur);g.gain.setValueAtTime(v,s);g.gain.exponentialRampToValueAtTime(.0001,s+dur);o.connect(g).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+dur+.02)}catch(e){}};
  let ax=0,ay=0;
  const shoot=()=>{if(done||flying)return;flying=true;n++;snd(900,300,.25,'sawtooth',.05);const hx=ax+wind,hy=ay+(Math.random()-.5)*.08;
   const ar=new THREE.Group();const sh=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.85,5),new THREE.MeshStandardMaterial({color:0x8a6a40}));sh.rotation.x=Math.PI/2;ar.add(sh);const fe=new THREE.Mesh(new THREE.BoxGeometry(.06,.002,.14),new THREE.MeshStandardMaterial({color:0xf4f0e0}));fe.position.z=-.38;ar.add(fe);G.add(ar);AR.list.push(ar);
   const from=new THREE.Vector3(-42.9,1.45,-8.4),onB=Math.abs(hx)<1&&Math.abs(hy)<1.3,to=new THREE.Vector3(TX-hx,TY+hy,onB?TZ-.05:TZ+6);const st=performance.now();
   const fly=()=>{const u=Math.min(1,(performance.now()-st)/650);const p=from.clone().lerp(to,u);p.y+=Math.sin(u*Math.PI)*1.1;const u2=Math.min(1,u+.02);const q=from.clone().lerp(to,u2);q.y+=Math.sin(u2*Math.PI)*1.1;ar.position.copy(p);if(u<1){ar.lookAt(q);requestAnimationFrame(fly);return}
    const red=(hx/.47)**2+(hy/.62)**2<=1;let g=0,msg;if(onB&&red){g=2;hit++;msg=['관중! 한가운데예요!','또 관중!','정조도 감탄했겠어요!'][Math.floor(Math.random()*3)];snd(1200,1600,.35,'sine',.1);setTimeout(()=>snd(1600,2100,.3,'sine',.08),120)}else if(onB){g=1;hit++;msg='과녁에 맞았어요!';snd(220,160,.15,'square',.08)}else{msg=['아깝게 빗나갔어요. 바람을 보세요!','과녁 옆으로 갔어요.'][Math.floor(Math.random()*2)];ar.visible=false}
    pts+=g;S.textContent=n+' / '+N+'발 · '+pts+'점';try{ctx.say(msg,1.8)}catch(e){}flying=false;newWind();showW();if(n>=N)fin()};fly()};
  d.querySelector('[data-s]').onclick=shoot;const kd=e=>{if(e.code==='Space'&&e.type==='keydown'&&!e.repeat){e.preventDefault();e.stopPropagation();shoot()}};addEventListener('keydown',kd,true);
  const fin=()=>{done=true;removeEventListener('keydown',kd,true);G.remove(aim);const Q=Math.round(pts/(N*2)*100);const st=Q>=75?3:Q>=45?2:Q>0?1:0;try{ctx.done('haenggung_archery',Q,'정조 활쏘기')}catch(e){}window.__HGARQ=Q;
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffd890">열 발 중 ${hit}발 맞힘 · ${pts}점</b><div style="font-size:13px;margin:4px 0">${hit>=9?'정조(50발 중 49발)만큼 잘 쐈어요!':hit>=6?'활 솜씨가 좋아요!':'바람을 읽으면 더 잘 맞아요.'}</div><div style="font-size:26px;color:#e0b048">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#e0b048;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__HGARCH(),60)};d.querySelector('[data-x]').onclick=()=>{d.remove();for(const a of AR.list)G.remove(a);AR.list.length=0}},900)};
  const loop=()=>{if(!d.isConnected){removeEventListener('keydown',kd,true);G.remove(aim);return}const t=performance.now()/1000-t0;const sp=1+n*.08;if(!flying&&!done){ax=Math.sin(t*1.6*sp)*1.15;ay=Math.sin(t*2.3*sp+1)*1.0}aim.position.set(TX-ax,TY+ay,TZ-.08);aim.visible=!done;requestAnimationFrame(loop)};loop();
  window.__ARG={shoot,get n(){return n},get pts(){return pts},get ax(){return ax},get ay(){return ay}};try{ctx.say('정조가 활을 쏘던 득중정이에요. 열 발을 쏴 보세요!',3)}catch(e){}};
 const tick=()=>{};
 const meta={quest:{t:'화성행궁 둘러보기',d:'정조의 행궁 일곱 곳을 찾아보세요. 실측 3D라 실제 크기예요.',steps:[['신풍루','신풍루'],['좌익문','좌익문'],['중양문','중양문'],['봉수당','봉수당'],['복내당','복내당'],['득중정','득중정'],['미로한정','미로한정']]},
  title:'수원 화성행궁',hint:'한국문화정보원이 실측한 화성행궁 건물 일곱 채를 실제 크기로 세웠어요. 정문 신풍루에서 봉수당까지 걸어 보고, 득중정 활터도 들러 보세요. '+SRC,
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,sign:{x:-12,z:62,lines:['수원 화성행궁','정조의 행궁','신풍루 · 봉수당 · 득중정','실측 3D · 실제 크기']}},
  npc:[['base',[[-20,52],[20,52],[20,66],[-20,66]]],['metal',[[-30,-6],[-30,-30],[-56,-30],[-56,-6]]]],
  bounds:[-110,110,-100,100],level:P=>P.y>1.2?'마루 위':P.x>-72&&P.x<48&&P.z<46&&P.z>-58?'행궁 안마당':'신풍루 앞',camCap:()=>Infinity,
  baseAt:()=>0,tick,
  mini:{S:1.4,ox:-12,oz:0,draw(g,X,Z,S){g.fillStyle='#6f8f45';g.fillRect(0,0,300,300);g.fillStyle='#b9a68a';g.fillRect(X(-72),Z(-58),120*S,104*S);g.strokeStyle='#8a8478';g.lineWidth=2;g.strokeRect(X(-72),Z(-58),120*S,104*S);g.fillStyle='#8a3a2a';for(const[,x,z]of B)g.fillRect(X(x-6),Z(z-4),12*S,8*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:72,yaw:Math.PI},size:{}},meta)}
