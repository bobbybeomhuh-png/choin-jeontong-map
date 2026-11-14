/* 한양 궁궐 마당(경복궁 근정전 일대를 본뜬 실제 크기 공간). 단위 1 = 1m, 입구 +z(남쪽), 정전은 -z.
   갱신 2026-11-12. 국가유산청(KOREA HERITAGE SERVICE) 공개 3D(CC BY 4.0): 광화문 해태 한 쌍, 앙부일구, 근정전 어좌, 일월오봉도,
   근정전 향로, 어보, 궁궐 등. 건물(월대·정전·행각)과 박석·품계석은 근정전 배치를 본떠 지음(실측 복제 아님).
   근정전 실제: 정면 5칸 측면 5칸 중층 건물, 두 단 월대. 여기서는 단층 지붕으로 줄여 지음. */
import * as THREE from 'three';
import {buildHall} from './hallkit.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,noise,mulb,materials,hipRoof,brackets} from './sungnyemun.js';
const MURL=k=>new URL('../models/hanyang/'+k+'.glb',import.meta.url).href;
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
export function buildHanyang(opts={}){const mini=!!opts.mini;const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(83);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
 const add=(o,x,y,z,col=true)=>{o.position.set(x,y,z);G.add(o);if(col)o.traverse(m=>{if(m.isMesh)cam.push(m)});return o};
 const gl=new GLTFLoader();
 function place(k,{x,y=0,z,h=null,ry=0,scale=null}={}){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry;G.add(g);if(mini&&!['haetae_a','haetae_b','throne','ilwol'].includes(k))return g;
  gl.load(MURL(k),m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;e.receiveShadow=true}});o.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o),s=b.getSize(V(0,0,0));const sc=scale||(h?h/s.y:1);o.scale.setScalar(sc);o.position.set(-(b.min.x+b.max.x)/2*sc,-b.min.y*sc,-(b.min.z+b.max.z)/2*sc);g.add(o);if(!mini)o.traverse(e=>{if(e.isMesh)cam.push(e)})},undefined,e=>console.warn('모델 못 불러옴',k,e));return g}
 /* ---------- 조정 바닥: 거친 박석 ---------- */
 const PB=tex(512,512,(q,w,h)=>{/* 박석: 크기가 조금씩 다른 넓적 돌을 빈틈없이 맞춰 깔고 좁은 이음줄. 이음 점을 흔들어 돌 모양을 불규칙하게(바둑판 무늬가 되풀이돼도 이어지게 가장자리 맞춤) */const N=8,cw=w/N,chh=h/N;const J=[];for(let i=0;i<=N;i++){J.push([]);for(let j=0;j<=N;j++){const ii=i%N,jj=j%N;const sx=Math.sin(ii*12.9+jj*78.2)*43758.5,sy=Math.sin(ii*39.3+jj*11.1)*24634.6;J[i].push([i*cw+(sx-Math.floor(sx)-.5)*cw*.55,j*chh+(sy-Math.floor(sy)-.5)*chh*.55])}}
  q.fillStyle='#6f685c';q.fillRect(0,0,w,h);for(let i=0;i<N;i++)for(let j=0;j<N;j++){const g=160+(r()*38|0),warm=r()*8;q.fillStyle=`rgb(${g},${g-5-warm},${g-14-warm})`;const P=[J[i][j],J[i+1][j],J[i+1][j+1],J[i][j+1]];q.beginPath();P.forEach(([x,y],k)=>{const cx=(P[0][0]+P[2][0])/2,cy=(P[0][1]+P[2][1])/2;const xx=x+(cx-x)*.035,yy=y+(cy-y)*.035;k?q.lineTo(xx,yy):q.moveTo(xx,yy)});q.closePath();q.fill();
   for(const [dx,dy] of[[w,0],[-w,0],[0,h],[0,-h]]){q.save();q.translate(dx,dy);q.fill();q.restore()}
   const grd=q.createLinearGradient(P[0][0],P[0][1],P[2][0],P[2][1]);grd.addColorStop(0,'rgba(255,255,255,.07)');grd.addColorStop(1,'rgba(0,0,0,.08)');q.fillStyle=grd;q.fill()}
  noise(q,w,h,9000,['rgba(0,0,0,.07)','rgba(255,255,255,.07)','rgba(90,80,60,.06)'],2)});PB.wrapS=PB.wrapT=THREE.RepeatWrapping;PB.repeat.set(8,8.5);/* 돌 하나 약 1m */
 const yard=new THREE.Mesh(new THREE.PlaneGeometry(64,66),new THREE.MeshStandardMaterial({map:PB,roughness:1}));yard.rotation.x=-Math.PI/2;yard.position.set(0,.02,-8);yard.receiveShadow=true;G.add(yard);
 /* 가운데 삼도(임금이 다니는 가운데 길이 조금 높음) */const PT=M(0xb9b09e);for(const[x,w,hh]of[[0,3.2,.12],[-2.4,1.6,.06],[2.4,1.6,.06]]){const p=box(w,hh,40,PT);p.position.set(x,hh/2,4);G.add(p)}
 /* ---------- 품계석: 동쪽 문관, 서쪽 무관, 정1품~정9품 ---------- */
 {const ST=M(0xc2baa8);const NM=['정1품','정2품','정3품','정4품','정5품','정6품','정7품','정8품','정9품'];
  for(const sx of[-1,1])NM.forEach((n,i)=>{const z=-14+i*3.2;const s=box(.42,.9,.28,ST);s.position.set(sx*5.2,.45,z);G.add(s);solids.push({cx:sx*5.2,cz:z,r:.3,y0:0,y1:1});
   if(!mini){const cv=document.createElement('canvas');cv.width=64;cv.height=128;const q=cv.getContext('2d');q.fillStyle='#c2baa8';q.fillRect(0,0,64,128);q.fillStyle='#3b2a1c';q.font='bold 26px "Noto Serif KR",serif';q.textAlign='center';[...n].forEach((ch,j)=>q.fillText(ch,32,34+j*32));const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;const pl=new THREE.Mesh(new THREE.PlaneGeometry(.38,.76),new THREE.MeshStandardMaterial({map:t,roughness:.9}));pl.position.set(sx*5.2,.47,z+.145);G.add(pl)}});
  spots.push({x:3.4,y:0,z:-6,r:2,t:'품계석',h:'신하들이 벼슬 품계에 맞춰 서던 자리를 알리는 돌이에요. 정전을 바라보고 오른쪽(동쪽)에 문관, 왼쪽(서쪽)에 무관이 섰어요. 정1품부터 정9품까지, 높은 품계일수록 정전에 가까워요.'})}
 /* ---------- 해태 한 쌍(입구 양옆) ---------- */
 place('haetae_a',{x:8,z:30,ry:Math.PI});place('haetae_b',{x:-8,z:30,ry:Math.PI});for(const sx of[-1,1])solids.push({x0:sx*8-1.5,x1:sx*8+1.5,y0:0,y1:4,z0:29,z1:31});/* 실제처럼 문 바깥 양옆 */
 spots.push({x:5.4,y:0,z:32.4,r:2.2,t:'광화문 해태',h:'광화문 앞을 지키던 해태(해치) 한 쌍이에요. 옳고 그름을 가리고 화재를 막는다고 믿은 상상의 동물이에요. 국가유산청이 3D로 기록한 실제 해태 그대로예요. (3D: 국가유산청)'});
 /* ---------- 앙부일구(해시계) ---------- */
 {/* 받침돌: 네모 상자 대신 아래 굽 + 몸돌(가운데 판을 살짝 들임) + 윗돌(내밈) */const sm=M(0xb3aa98),sd=M(0x9d9484);const b0=box(1.35,.16,1.35,sd);b0.position.set(-11,.08,-2);G.add(b0);const b1=box(.98,.56,.98,sm);b1.position.set(-11,.44,-2);G.add(b1);for(const [dx,dz,w,d] of[[0,.5,.66,.03],[0,-.5,.66,.03],[.5,0,.03,.66],[-.5,0,.03,.66]]){const pn=box(w,.36,d,sd);pn.position.set(-11+dx,.44,-2+dz);G.add(pn)}const b2=box(1.2,.18,1.2,sm);b2.position.set(-11,.81,-2);G.add(b2);solids.push({cx:-11,cz:-2,r:.8,y0:0,y1:1.4});place('angbu',{x:-11,y:.9,z:-2,scale:.001});
  spots.push({x:-11,y:0,z:.2,r:1.8,t:'앙부일구',h:'세종 때 만든 오목한 해시계예요. 솥을 하늘로 향해 놓은 모양이라 "앙부"라 불러요. 바늘 그림자로 시각과 절기를 함께 읽어요. 실제 크기 그대로 놓았어요(지름 약 35cm). (3D: 국가유산청)'})}
 /* ---------- 월대 두 단과 정전 ---------- */
 const WZ=-30,T1=1.1,T2=2.2;const WS=M(0xc4bcaa),WSd=M(0xa9a190);
 /* 월대 옆면 장대석: 긴 돌 켜와 이음줄(면 크기에 맞춰 무늬 반복). 윗면은 그대로 */const _sc={};const stoneTex=(rx,ry,base)=>{const k=base;if(!_sc[k]){const c=document.createElement('canvas');c.width=256;c.height=64;const q=c.getContext('2d');q.fillStyle='#'+base.toString(16).padStart(6,'0');q.fillRect(0,0,256,64);for(let i=0;i<400;i++){q.fillStyle=`rgba(${Math.random()<.5?0:255},${Math.random()<.5?0:255},${Math.random()<.5?0:255},.04)`;q.fillRect(Math.random()*256,Math.random()*64,3,3)}q.strokeStyle='rgba(60,55,45,.55)';q.lineWidth=2;q.strokeRect(1,1,254,62);q.beginPath();q.moveTo(128,0);q.lineTo(128,64);q.stroke();_sc[k]=c}const t=new THREE.CanvasTexture(_sc[k]);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx,ry);return new THREE.MeshStandardMaterial({map:t,roughness:.9})};
 const sbox=(w,h,d,base)=>{const top=M(base);const a=stoneTex(Math.max(1,d/2.4),Math.max(1,Math.round(h/.55)),base),b=stoneTex(Math.max(1,w/2.4),Math.max(1,Math.round(h/.55)),base);const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),[a,a,top,top,b,b]);m.castShadow=m.receiveShadow=true;return m};
 {const t1=sbox(34,T1,20,0xa9a190);t1.position.set(0,T1/2,WZ);G.add(t1);const t2=sbox(30,T1,16,0xc4bcaa);t2.position.set(0,T1+T1/2,WZ-1);G.add(t2);
  /* 앞 계단(가운데 답도 포함) */for(let i=0;i<6;i++){const sh=(i+1)*T2/6;const st=box(6,sh,.42,WS);st.position.set(0,sh/2,WZ+10+(5-i)*.42+.21);G.add(st)}
  S(-17,17,0,T1,WZ-10,WZ+10);S(-15,15,0,T2,WZ-9,WZ+7);for(let i=0;i<6;i++)S(-3,3,0,(i+1)*T2/6,WZ+10+(5-i)*.42,WZ+10+(6-i)*.42);
  /* 월대 난간(돌기둥과 살대) */const RL=M(0xd2cbbb);for(const[x0,x1,z]of[[-17,-3,WZ+10],[3,17,WZ+10]]){/* 돌난간: 네모 기둥(위 연봉 머리) + 칸마다 하엽동자 + 둥근 돌란대 + 아래 지대석 */for(let x=x0;x<=x1;x+=2){const p=box(.22,.8,.22,RL);p.position.set(x,T1+.4,z);G.add(p);const kn=new THREE.Mesh(new THREE.SphereGeometry(.13,10,8),RL);kn.scale.y=1.3;kn.position.set(x,T1+.92,z);G.add(kn);if(x+1<=x1){const dj=new THREE.Mesh(new THREE.CylinderGeometry(.06,.09,.5,8),RL);dj.position.set(x+1,T1+.33,z);G.add(dj);const hy=new THREE.Mesh(new THREE.SphereGeometry(.12,10,6,0,Math.PI*2,0,Math.PI/2),RL);hy.scale.set(1.2,.5,1);hy.position.set(x+1,T1+.58,z);hy.rotation.x=Math.PI;G.add(hy)}}{const rail=new THREE.Mesh(new THREE.CylinderGeometry(.065,.065,x1-x0,10),RL);rail.rotation.z=Math.PI/2;rail.position.set((x0+x1)/2,T1+.7,z);G.add(rail);const sill=box(x1-x0+.3,.1,.32,RL);sill.position.set((x0+x1)/2,T1+.05,z);G.add(sill)}S(x0,x1,T1,T1+1,z-.15,z+.15)}
  /* 드무(불 막는 물그릇) */for(const sx of[-1,1]){const d=new THREE.Mesh(new THREE.CylinderGeometry(.75,.6,.9,20),M(0x5a4a32,{metalness:.5,roughness:.5}));d.position.set(sx*13,T2+.45,WZ+5.5);d.castShadow=true;G.add(d);solids.push({cx:sx*13,cz:WZ+5.5,r:.8,y0:0,y1:4})}
  spots.push({x:0,y:T2,z:WZ+6.6,r:2.4,t:'월대',h:'정전을 받치는 두 단의 넓은 돌 기단이에요. 나라의 큰 의식 때 왕과 신하가 오르던 무대예요. 가운데 계단의 넓은 돌(답도)에는 원래 봉황을 새겨요. 양쪽 쇠 그릇(드무)에는 물을 담아 불귀신을 쫓는다고 믿었어요.'})}
 const HZ=WZ-2,HW=24,HD=12,HY=T2+.3,PH=6.4;
 {const pil=M(0x8a3a2a),wall=M(0xf1ece2),lat=new THREE.MeshStandardMaterial({map:tex(256,256,(q,w,h)=>{q.fillStyle='#ead9b0';q.fillRect(0,0,w,h);q.strokeStyle='#7a2f22';q.lineWidth=5;for(let i=0;i<=10;i++){q.beginPath();q.moveTo(i*w/10,0);q.lineTo(i*w/10,h);q.stroke();q.beginPath();q.moveTo(0,i*h/10);q.lineTo(w,i*h/10);q.stroke()}q.lineWidth=14;q.strokeStyle='#8a3a2a';q.strokeRect(0,0,w,h)}),roughness:.9});
  /* 자세한 한옥 부품으로: 정면 5칸·측면 3칸 중층, 다포, 앞 가운데 칸 열림, 옆·뒤 창호 */G.add(buildHall({x:0,z:HZ,W:HW,D:HD,nx:5,nz:3,FY:T2-.02,PH,base:false,stairs:'none',roof:'hip',name:'勤政殿',pillar:0x9a3a26,bracket:'dapo',front:'door',entry:[1,2,3],back:'window',left:'window',right:'window',upper:{h:3.4},roofScale:1.15,mini,solids,light:false}).group);
  for(const x of[-4.8,4.8])for(const z of[-2,2]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.4,.44,PH+1.2,14),pil);c.position.set(x,HY+(PH+1.2)/2,HZ+z);c.castShadow=true;G.add(c);solids.push({cx:x,cz:HZ+z,r:.48,y0:0,y1:20})}
  /* 어탑과 어좌, 일월오봉도, 향로, 등, 어보 */const AT=M(0x8a3a2a);const at=box(6,.9,3.6,AT);at.position.set(0,HY+.45,HZ-3.6);G.add(at);S(-3,3,0,HY+.9,HZ-5.4,HZ-1.8);for(let i=0;i<3;i++){const st=box(2,.3*(i+1),.35,AT);st.position.set(0,HY+.15*(i+1),HZ-1.6+(2-i)*.35);G.add(st);S(-1,1,0,HY+.3*(i+1),HZ-1.75+(2-i)*.35,HZ-1.4+(2-i)*.35)}
  place('ilwol',{x:0,y:HY+.9,z:HZ-5.2});place('throne',{x:0,y:HY+.9,z:HZ-3.9});place('lamp',{x:-2.6,y:HY+.9,z:HZ-3.4,h:1.6});place('lamp',{x:2.6,y:HY+.9,z:HZ-3.4,h:1.6});
  for(const sx of[-1,1]){const pd=box(.7,.8,.7,M(0x5a3a22));pd.position.set(sx*2.4,HY+.4,HZ);G.add(pd);solids.push({cx:sx*2.4,cz:HZ,r:.5,y0:0,y1:4});place('hyangro',{x:sx*2.4,y:HY+.8,z:HZ,h:.62})}
  {const tb=box(.9,.75,.6,M(0x8a3a2a));tb.position.set(3.6,HY+.375,HZ-1.2);G.add(tb);solids.push({cx:3.6,cz:HZ-1.2,r:.55,y0:0,y1:3});place('eobo',{x:3.6,y:HY+.75,z:HZ-1.2,h:.11})}
  const lamp=new THREE.PointLight(0xffe2b8,22,16,1.6);lamp.position.set(0,HY+5,HZ-1);G.add(lamp);
  spots.push({x:0,y:HY,z:HZ+1.4,r:2.4,t:'어좌와 일월오봉도',h:'정전 안 높은 단(어탑) 위 임금 자리(어좌)와 그 뒤 일월오봉도 병풍이에요. 해와 달, 다섯 봉우리, 소나무와 물결로 왕의 다스림이 온 세상에 미치기를 바랐어요. 어좌와 병풍, 양옆 등, 앞 향로는 근정전 유물을 3D로 기록한 국가유산청 자료예요. (3D: 국가유산청)'});
  spots.push({x:3.6,y:HY,z:HZ+.4,r:1.2,t:'어보',h:'임금의 도장(어보)이에요. 나라의 큰 문서에 찍고, 왕실의 정통을 상징했어요. (3D: 국가유산청)'});
  spots.push({x:0,y:T2,z:HZ+8.4,r:2.6,t:'정전',h:'나라의 큰 의식을 치르던 궁궐의 으뜸 건물(정전)이에요. 경복궁 근정전을 본떠 지었어요. 실제 근정전은 지붕이 두 겹인 2층 건물이고, 정면 5칸 측면 5칸이에요. 여기서는 지붕을 한 겹으로 줄였어요.'})}
 /* ---------- 행각: 마당을 둘러싼 회랑 ---------- */
 {const rafM=(()=>{/* 처마 밑: 진초록 평판 대신 서까래 줄(붉은 서까래 + 사이 초록 단청 + 끝 연꽃 머리초) */const c=document.createElement('canvas');c.width=32;c.height=128;const q=c.getContext('2d');q.fillStyle='#2f6b55';q.fillRect(0,0,32,128);q.fillStyle='#8a3a2a';q.fillRect(9,0,14,128);q.fillStyle='rgba(0,0,0,.25)';q.fillRect(21,0,2,128);for(const y of[10,118]){q.fillStyle='#f2d27a';q.beginPath();q.arc(16,y,6,0,7);q.fill();q.fillStyle='#c8352a';q.beginPath();q.arc(16,y,3,0,7);q.fill()}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;return new THREE.MeshStandardMaterial({map:t,roughness:.8})})();const pil=M(0x8a3a2a),rfm=M(0x3a4048),rfu=M(0x2f6b55),hwa=M(0x9a5a48),pls=M(0xefe6d6),win=M(0x355a4a),flm=M(0xb3aa98),rdg=M(0x23272c);
  /* 행각(복도 회랑): 기둥 두 줄 + 맞배 기와지붕 + 단청 도리. 마당 바깥쪽 줄은 화방벽(아래 벽돌)+회벽+살창으로 막고, 마당 쪽은 트여 있다. */
  const run=(x0,z0,x1,z1)=>{const len=Math.hypot(x1-x0,z1-z0),n=Math.round(len/3.5);const g=new THREE.Group();g.position.set((x0+x1)/2,0,(z0+z1)/2);g.rotation.y=-Math.atan2(z1-z0,x1-x0);G.add(g);
   /* 로컬 z 중 마당 중심(0,-10)에서 먼 쪽 = 바깥 */const nx=-(z1-z0)/len,nz=(x1-x0)/len;const mx=(x0+x1)/2,mz=(z0+z1)/2;const outS=Math.hypot(mx+nx*1.4,mz-10*0+nz*1.4+10)>Math.hypot(mx-nx*1.4,mz-nz*1.4+10)?1:-1;
   const bx=(w,h,d,m,x,y,z,rx=0)=>{const b=box(w,h,d,m);b.position.set(x,y,z);b.rotation.x=rx;b.castShadow=true;b.receiveShadow=true;g.add(b);return b};
   for(let i=0;i<=n;i++){const lx=-len/2+len*i/n;for(const off of[-1.4,1.4]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.18,.2,3,8),pil);p.position.set(lx,1.5,off);p.castShadow=true;g.add(p)}const x=x0+(x1-x0)*i/n,z=z0+(z1-z0)*i/n;solids.push({cx:x,cz:z,r:1.6,y0:0,y1:4})}
   /* 단청 도리(기둥 위 가로 부재)와 대들보 */for(const off of[-1.4,1.4])bx(len+.4,.3,.26,rfu,0,3.05,off);for(let i=0;i<=n;i++)bx(.22,.26,3.1,rfu,-len/2+len*i/n,3.05,0);
   /* 맞배지붕: 기와 두 판 + 용마루 + 처마 아래 단청 */for(const sd of[-1,1]){bx(len+1.2,.22,2.75,rfm,0,3.62,sd*1.18,sd*.42);{const um=rafM.clone();um.map=rafM.map.clone();um.map.needsUpdate=true;um.map.repeat.set((len+1.2)/.36,1);bx(len+1.2,.06,2.6,[um,um,um,um,um,um],0,3.48,sd*1.15,sd*.42)}for(let k=0;k<Math.floor(len/1.1);k++)bx(.12,.12,2.7,rdg,-len/2+.4+k*1.1,3.76,sd*1.2,sd*.42)}bx(len+1.5,.32,.42,rdg,0,4.16,0);
   /* 바깥벽: 아래 화방벽 + 위 회벽 + 칸마다 살창 */const oz=outS*1.4;bx(len,.95,.3,hwa,0,.48,oz);bx(len,1.95,.24,pls,0,1.93,oz);for(let i=0;i<n;i++){const cx=-len/2+len*(i+.5)/n;bx(1.1,.75,.3,win,cx,2.1,oz);for(let q=-2;q<=2;q++)bx(.04,.75,.32,pil,cx+q*.2,2.1,oz)}
   const fl=bx(len,.3,3.2,flm,0,.15,0)};
  run(-32,24,-5,24);run(5,24,32,24);run(-32,24,-32,-44);run(32,24,32,-44);run(-32,-44,32,-44)}
 /* 정문(가운데 문) */{const g=new THREE.Group();g.position.set(0,0,24);G.add(g);for(const sx of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.3,.34,5,12),M(0x8a3a2a));p.position.set(sx*4.2,2.5,0);p.castShadow=true;g.add(p);solids.push({cx:sx*4.2,cz:24,r:.4,y0:0,y1:9})}if(!mini){const rf=hipRoof(MT,6.2,3.2,3.2,5.2,7.4,.6,.2,{plain:true,rs:.6});g.add(rf)}const ln=box(9,.6,.6,M(0x2f6b55));ln.position.y=5;g.add(ln)}
 const meta={quest:{t:'한양 궁궐 순례',d:'궁궐 마당의 볼거리 일곱을 찾아 살펴보세요.',steps:[['광화문 해태','광화문 해태'],['품계석','품계석'],['앙부일구','앙부일구'],['월대','월대'],['정전','정전'],['어좌와 일월오봉도','어좌와 일월오봉도'],['어보','어보']]},
  title:'한양 궁궐 마당 · 실제 크기',video:'geunjeong',hint:'경복궁 근정전 일대를 본떠 지은 궁궐 마당이에요. 해태가 지키는 문을 지나 품계석 사이로 걸어가 월대에 오르고, 정전 안 어좌와 일월오봉도를 보세요. (3D: 국가유산청 KHS, CC BY · 건물은 근정전 배치를 본떠 지음)',
  env:{plaza:null,beds:false,trees:true,sign:{x:13,z:35,lines:['한양 궁궐 마당','근정전 · 품계석 · 해태','어좌 · 일월오봉도 · 앙부일구','궁궐 배치를 본떠 지었어요']},treeAvoid:(x,z)=>Math.abs(x)<40&&z<34&&z>-52},
  npc:[['carpenter',[[-2.4,18],[-2.4,-14]]],['painter',[[8,10],[8,-12]]],['science',[[-12,2],[-9,-4]]]],
  level:P=>P.y>HY-.1&&Math.abs(P.x)<12&&Math.abs(P.z-HZ)<6?'정전 안':P.y>T1-.1?'월대':P.z>21?'궁궐 문':'조정 마당',
  camCap:P=>P.y>HY-.1&&Math.abs(P.x)<12&&Math.abs(P.z-HZ)<6?4:Infinity,
  mini:{S:3.6,ox:0,oz:-10,draw(g,X,Z,S){g.fillStyle='#7aa04e';g.fillRect(0,0,300,300);g.fillStyle='#9a9284';g.fillRect(X(-32),Z(-44),64*S,68*S);g.fillStyle='#c4bcaa';g.fillRect(X(-17),Z(WZ-10),34*S,20*S);g.fillStyle='#8a3a2a';g.fillRect(X(-12),Z(HZ-6),24*S,12*S);g.fillStyle='#b9b09e';g.fillRect(X(-1.6),Z(-16),3.2*S,40*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:40,yaw:Math.PI},size:{}},meta)}
