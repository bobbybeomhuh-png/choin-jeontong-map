/* 종묘 마당: 정전 월대와 신로, 제례악 악기, 영녕전. 단위 1 = 1m, 입구 +z(남신문), 정전은 -z.
   갱신 2026-11-16. 국가유산청(KOREA HERITAGE SERVICE, Sketchfab KHS_Asset) 공개 3D(CC BY 4.0): 종묘 영녕전, 종묘제례 악기 여덟 점.
   정전·월랑·월대·신로·남신문은 종묘 배치를 본떠 지음(실측 복제 아님). 실제 정전은 신실 19칸, 길이 약 101m. 여기서는 길이를 줄임.
   악기 이름은 국가유산청 자료에 이름이 없어 모양을 보고 붙였음(특종·운라·장구·아쟁·절고·좌고·노고·나각). */
import * as THREE from 'three';
import {buildHall} from './hallkit.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,mulb,materials} from './sungnyemun.js';
const MURL=k=>new URL('../models/jongmyo/'+k+'.glb',import.meta.url).href;
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
export function buildJongmyo(opts={}){const mini=!!opts.mini;const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(127);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
 const add=(o,x,y,z,col=true)=>{o.position.set(x,y,z);G.add(o);if(col)o.traverse(m=>{if(m.isMesh)cam.push(m)});return o};
 const gl=new GLTFLoader();
 /* 공개 3D 놓기: h=높이 맞춤, L=가장 긴 변 맞춤, sc=배율 그대로 */
 function place(k,{x,y=0,z,h=null,L=null,sc=null,ry=0,onload=null}={}){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry;G.add(g);if(mini)return g;
  gl.load(MURL(k),m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;e.receiveShadow=true;if(e.material&&!Array.isArray(e.material))e.material=e.material.clone()}});o.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o),s=b.getSize(V(0,0,0));
   const f=sc||(h?h/s.y:L?L/Math.max(s.x,s.y,s.z):1);o.scale.setScalar(f);o.position.set(-(b.min.x+b.max.x)/2*f,-b.min.y*f,-(b.min.z+b.max.z)/2*f);g.add(o);o.traverse(e=>{if(e.isMesh)cam.push(e)});if(onload)onload(o,g)},undefined,e=>console.warn('모델 못 불러옴',k,e));return g}
 /* ---------- 돌 재질: 박석(넓적 돌), 장대석(긴 돌) ---------- */
 const PBC=(()=>{const c=document.createElement('canvas');c.width=c.height=512;const q=c.getContext('2d');q.fillStyle='#8d877b';q.fillRect(0,0,512,512);const N=7,cw=512/N;for(let i=0;i<N;i++)for(let j=0;j<N;j++){const x=i*cw+(r()-.5)*10,y=j*cw+(j%2?cw*.4:0)+(r()-.5)*10;const v=150+Math.floor(r()*45);q.fillStyle=`rgb(${v},${v-6},${v-16})`;q.beginPath();q.moveTo(x+3,y+3);q.lineTo(x+cw-3+(r()-.5)*8,y+3+(r()-.5)*6);q.lineTo(x+cw-3+(r()-.5)*8,y+cw-3);q.lineTo(x+3+(r()-.5)*6,y+cw-3+(r()-.5)*8);q.closePath();q.fill();for(let k=0;k<30;k++){q.fillStyle=`rgba(${r()<.5?60:220},${r()<.5?60:210},${r()<.5?50:190},.10)`;q.fillRect(x+r()*cw,y+r()*cw,2+r()*5,2+r()*5)}}return c})();
 const stone=(rx,ry,c=0xffffff)=>{const t=new THREE.CanvasTexture(PBC);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx,ry);t.anisotropy=8;return new THREE.MeshStandardMaterial({map:t,color:c,roughness:1})};
 const JDS=tex(256,64,(q,w,h)=>{q.fillStyle='#a49d8f';q.fillRect(0,0,w,h);q.fillStyle='#6f6a60';q.fillRect(0,0,w,3);q.fillRect(0,h-3,w,3);for(let x=0;x<w;x+=64+Math.floor(r()*30)){q.fillRect(x,0,3,h)}for(let k=0;k<200;k++){q.fillStyle=`rgba(40,36,30,${.05+r()*.08})`;q.fillRect(r()*w,r()*h,2,2)}});
 const jds=(rx)=>{const t=JDS.clone();t.needsUpdate=true;t.repeat.set(rx,1);return new THREE.MeshStandardMaterial({map:t,roughness:.95})};
 /* ---------- 땅: 넓은 흙 마당 ---------- */
 const WH=1.1,HZ=-12,HW=66,HD=10;
 {const g=new THREE.Mesh(new THREE.PlaneGeometry(240,140),M(0x7d8a5a));g.rotation.x=-Math.PI/2;g.position.set(-30,-.01,0);g.receiveShadow=true;G.add(g)}
 {const yd=new THREE.Mesh(new THREE.PlaneGeometry(92,60),M(0xb5a888));yd.rotation.x=-Math.PI/2;yd.position.set(0,.005,0);yd.receiveShadow=true;G.add(yd)}
 /* ---------- 상월대: 정전 앞 넓은 돌 기단 ---------- */
 {const top=new THREE.Mesh(new THREE.BoxGeometry(80,WH,36),[jds(20),jds(20),stone(16,7),stone(1,1),jds(20),jds(20)]);top.position.set(0,WH/2,-4);top.receiveShadow=true;G.add(top);S(-40,40,0,WH,-22,14);
  /* 계단 셋: 가운데(신로가 닿는 곳)와 동·서 */for(const sx of[-14,0,14]){const w=sx?3.2:4.4;for(let i=0;i<3;i++){const st=box(w,WH*(i+1)/3,.42,jds(2));st.position.set(sx,WH*(i+1)/6,14+(3-i)*.42-.21);G.add(st);S(sx-w/2,sx+w/2,0,WH*(i+1)/3,14+(2-i)*.42,14+(3-i)*.42)}}
  /* 월대 가장자리 돌 띠 */const ed=box(80.4,.12,.5,M(0x8e887c));ed.position.set(0,WH+.06,13.8);G.add(ed)}
 /* ---------- 정전: 신실 19칸, 맞배지붕, 붉은 기둥 ---------- */
 G.add(buildHall({x:0,z:HZ,W:HW,D:HD,nx:19,nz:2,FY:WH-.02,PH:4.4,base:false,stairs:'none',roof:'gable',name:'宗廟',pillar:0x8a2a22,bracket:'ik',front:'door',back:'wall',left:'wall',right:'wall',roofScale:1,mini,solids,light:false}).group);
 /* ---------- 동·서 월랑: 정전 양옆에서 앞으로 뻗은 날개 건물. 동월랑은 벽, 서월랑은 기둥만 ---------- */
 for(const sx of[-1,1]){G.add(buildHall({x:sx*37,z:2,W:16,D:4.6,ry:sx<0?Math.PI/2:-Math.PI/2,nx:5,nz:1,FY:WH-.02,PH:3.4,base:false,stairs:'none',roof:'gable',pillar:0x8a2a22,bracket:'ik',front:sx<0?'open':'wall',back:'wall',left:'wall',right:'wall',roofScale:.85,mini,solids,light:false,plain:true}).group)}
 /* ---------- 신로: 가운데 조금 높은 길(신이 다니는 길)과 양옆 길 ---------- */
 {const z0=14,z1=58,len=z1-z0,zc=(z0+z1)/2;const mid=box(1.4,.2,len,stone(1,len/1.4,0xc8c2b4));mid.position.set(0,.1,zc);G.add(mid);for(const sx of[-1,1]){const sd=box(1.3,.1,len,stone(1,len/1.3,0xb0aa9c));sd.position.set(sx*1.5,.05,zc);G.add(sd)}}
 /* ---------- 담장과 남신문 ---------- */
 {const wm=M(0x9a6e4a),cap=M(0x40444a,{roughness:.8});const wall=(x0,z0,x1,z1)=>{const L=Math.hypot(x1-x0,z1-z0),a=Math.atan2(z1-z0,x1-x0);const w=box(L,2.3,.6,wm);w.position.set((x0+x1)/2,1.15,(z0+z1)/2);w.rotation.y=-a;G.add(w);const c=box(L+.2,.25,1.1,cap);c.position.set((x0+x1)/2,2.42,(z0+z1)/2);c.rotation.y=-a;G.add(c);if(Math.abs(z1-z0)<.01)S(x0,x1,0,2.6,z0-.3,z0+.3);else S(x0-.3,x0+.3,0,2.6,z0,z1)};
  wall(-46,30,-6,30);wall(6,30,46,30);wall(-46,-30,46,-30);wall(46,-30,46,30);wall(-46,-30,-46,-4);wall(-46,4,-46,30);
  /* 남신문: 세 칸 맞배 대문 */G.add(buildHall({x:0,z:30,W:11,D:3.6,nx:3,nz:1,FY:.25,PH:3.2,base:false,floor:false,stairs:'none',roof:'gable',pillar:0x8a2a22,bracket:'ik',front:'open',back:'open',left:'wall',right:'wall',roofScale:.8,mini,solids,light:false,plain:true}).group);
  /* 서문(영녕전 가는 길) */for(const sz of[-1,1]){const p=box(.5,3,.5,M(0x8a2a22));p.position.set(-46,1.5,sz*4);G.add(p)}const ln=box(.6,.5,8.6,M(0x2f6b55));ln.position.set(-46,3,0);G.add(ln)}
 /* ---------- 영녕전 가는 길(흙길) ---------- */
 {const seg=(x0,z0,x1,z1)=>{const p=new THREE.Mesh(new THREE.PlaneGeometry(Math.abs(x1-x0)+3.2,Math.abs(z1-z0)+3.2),M(0xb5a888));p.rotation.x=-Math.PI/2;p.position.set((x0+x1)/2,.012,(z0+z1)/2);p.receiveShadow=true;G.add(p)};seg(-60,0,-46,0);seg(-60,0,-60,11);seg(-96,11,-60,11)}
 /* ---------- 영녕전: 국가유산청 실측 3D(가운데 네 칸 지붕이 높음) ---------- */
 const YX=-96,YZ=-4,YW=52;
 place('yeongnyeong',{x:YX,z:YZ,L:YW,onload:(o,g)=>{const b=new THREE.Box3().setFromObject(o);window.__YNB={min:b.min.toArray(),max:b.max.toArray()}}});
 /* 영녕전 디딜 곳(실측 높이를 재서 맞춤): 하월대 0.77m, 상월대 1.5m, 가운데 계단. 건물 몸채와 양옆 협실은 막음 */
 S(YX-21,YX+21,0,.77,YZ+7.5,YZ+10.2);S(YX-19,YX+19,0,1.5,YZ+2.4,YZ+7.5);
 for(let i=0;i<2;i++){S(YX-2.2,YX+2.2,0,.385*(i+1),YZ+10.2+(1-i)*.4,YZ+10.6+(1-i)*.4);S(YX-2.2,YX+2.2,0,.77+.365*(i+1),YZ+7.5+(1-i)*.4,YZ+7.9+(1-i)*.4)}
 S(YX-22,YX+22,0,9,YZ-10.2,YZ+2.4);S(YX-26,YX-20,0,6,YZ-3,YZ+9.5);S(YX+20,YX+26,0,6,YZ-3,YZ+9.5);
 /* ---------- 제례악 악기 여덟: 월대 앞쪽, 신로 양옆 ---------- */
 const INST=[
  {k:'tukjong',n:'특종',d:'큰 쇠종 하나를 틀에 매달아 치는 악기예요.',x:-2.5,h:.62,frame:true,snd:'bell'},
  {k:'unra',n:'운라',d:'작은 징 열 개를 틀에 매달아 맑고 높은 소리를 내요.',x:-4.4,h:1.25,snd:'unra'},
  {k:'janggu',n:'장구',d:'허리가 잘록한 북이에요. 양쪽 가죽을 쳐서 두 가지 소리를 내요.',x:-6.3,L:.72,y:.42,stand:true,snd:'janggu'},
  {k:'ajaeng',n:'아쟁',d:'활로 줄을 문질러 낮고 굵은 소리를 내는 현악기예요.',x:-8.5,L:1.6,y:.38,stand:true,snd:'ajaeng'},
  {k:'jeolgo',n:'절고',d:'받침 위에 비스듬히 얹은 북이에요. 음악의 마디를 짚어 줘요.',x:2.5,h:1.15,snd:'drum'},
  {k:'jwago',n:'좌고',d:'틀에 매단 북이에요. 앉아서 쳐요.',x:4.4,h:1.75,snd:'drum2'},
  {k:'nogo',n:'노고',d:'북 두 개를 엇갈려 틀에 매단 북이에요.',x:6.4,h:2.3,snd:'drum3'},
  {k:'nagak',n:'나각',d:'큰 소라 껍데기로 만든 나팔이에요. 뿌우 하고 길게 울려요.',x:8.4,L:.95,y:.72,stand:true,snd:'conch'}];
 const IZ=8.6,tapList=[];
 for(const I of INST){const y0=WH+(I.y||0);
  if(I.stand){const t=box(I.L*.9+.2,.06,.55,M(0x6a3a22,{roughness:.6}));t.position.set(I.x,y0-.03,IZ);G.add(t);for(const lx of[-1,1])for(const lz of[-1,1]){const lg=box(.05,(I.y||0)-.06,.05,M(0x5a3018));lg.position.set(I.x+lx*(I.L*.45),WH+((I.y||0)-.06)/2,IZ+lz*.22);G.add(lg)}}
  let hy=y0;if(I.frame){const fm=M(0x8a2a22,{roughness:.6});for(const sx of[-1,1]){const p=box(.09,1.9,.09,fm);p.position.set(I.x+sx*.45,WH+.95,IZ);G.add(p);const ft=box(.36,.12,.5,M(0x3a2a1a));ft.position.set(I.x+sx*.45,WH+.06,IZ);G.add(ft)}const bar=box(1.2,.12,.12,M(0x2f6b55));bar.position.set(I.x,WH+1.9,IZ);G.add(bar);hy=WH+1.12;const cd=box(.02,.16,.02,M(0x2a2a2a));cd.position.set(I.x,WH+1.78,IZ);G.add(cd)}
  I.g=place(I.k,{x:I.x,y:hy,z:IZ,h:I.h||null,L:I.L||null,ry:0,onload:()=>{}});
  /* 바닥 금빛 고리: 차례가 오면 빛남 */const ring=new THREE.Mesh(new THREE.RingGeometry(.42,.56,32),new THREE.MeshBasicMaterial({color:0xf2d27a,transparent:true,opacity:0,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.position.set(I.x,WH+.02,IZ);G.add(ring);I.ring=ring;I.glow=0;/* 빛나고 눌리는 것이라 마당 합치기에서 뺌 */ring.userData.noBatch=true;I.g.userData.noBatch=true;
  solids.push({cx:I.x,cz:IZ,r:.45,y0:WH,y1:WH+2.4});
  I.g.userData.tap=()=>hit(INST.indexOf(I),true);tapList.push(I.g)}
 /* ---------- 소리: 악기마다 짧게 지어 냄 ---------- */
 const H3=()=>window.__H3||{};
 function snd(kind){const ac=H3().AC,out=H3().AM;if(!ac||!out)return;const t0=ac.currentTime;const env=(g,a,d,peak=.4)=>{g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(peak,t0+a);g.gain.exponentialRampToValueAtTime(.0001,t0+a+d)};
  const osc=(type,f,a,d,peak,f2)=>{const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+a+d*.6);env(g,a,d,peak);o.connect(g).connect(out);o.start(t0);o.stop(t0+a+d+.05);return o};
  const noise=(f,q,a,d,peak)=>{const n=ac.createBufferSource(),b=ac.createBuffer(1,ac.sampleRate*.5,ac.sampleRate),c=b.getChannelData(0);for(let i=0;i<c.length;i++)c[i]=Math.random()*2-1;n.buffer=b;const bp=ac.createBiquadFilter(),g=ac.createGain();bp.type='bandpass';bp.frequency.value=f;bp.Q.value=q;env(g,a,d,peak);n.connect(bp).connect(g).connect(out);n.start(t0);n.stop(t0+a+d+.05)};
  if(kind==='bell'){osc('sine',196,.005,3.2,.32);osc('sine',196*2.76,.005,1.6,.12);osc('sine',196*5.4,.005,.7,.05)}
  else if(kind==='unra'){const f=[880,988,1109,1319][Math.floor(Math.random()*4)];osc('sine',f,.003,1.1,.18);osc('sine',f*2.3,.003,.35,.06)}
  else if(kind==='janggu'){noise(2400,3,.002,.08,.35);osc('sine',150,.004,.35,.35,70)}
  else if(kind==='ajaeng'){const o=ac.createOscillator(),lp=ac.createBiquadFilter(),g=ac.createGain(),v=ac.createOscillator(),vg=ac.createGain();o.type='sawtooth';o.frequency.value=147;v.frequency.value=5.2;vg.gain.value=2.4;v.connect(vg).connect(o.frequency);lp.type='lowpass';lp.frequency.value=900;g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(.16,t0+.12);g.gain.exponentialRampToValueAtTime(.0001,t0+1.3);o.connect(lp).connect(g).connect(out);o.start(t0);v.start(t0);o.stop(t0+1.35);v.stop(t0+1.35)}
  else if(kind==='conch'){const o=ac.createOscillator(),lp=ac.createBiquadFilter(),g=ac.createGain();o.type='square';o.frequency.setValueAtTime(185,t0);o.frequency.linearRampToValueAtTime(196,t0+.3);lp.type='lowpass';lp.frequency.value=700;g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(.14,t0+.25);g.gain.setValueAtTime(.14,t0+1);g.gain.exponentialRampToValueAtTime(.0001,t0+1.5);o.connect(lp).connect(g).connect(out);o.start(t0);o.stop(t0+1.55)}
  else{const f={drum:110,drum2:90,drum3:72}[kind]||100;osc('sine',f,.004,.55,.5,f*.45);noise(300,.8,.002,.12,.2)}}
 /* ---------- 빛남: 차례가 온 악기와 바닥 고리 ---------- */
 let raf=0;const tick=()=>{let any=false;for(const I of INST){if(I.glow>0){any=true;I.glow=Math.max(0,I.glow-.035)}const v=I.glow;I.ring.material.opacity=v*.9;I.ring.scale.setScalar(1+(1-v)*.5);I.g.traverse(e=>{if(e.isMesh&&e.material&&e.material.emissive){e.material.emissive.setRGB(.55*v,.4*v,.1*v)}});I.g.position.y=I.g.userData.y0+(v>0?Math.sin(v*Math.PI)*.04:0)}raf=any?requestAnimationFrame(tick):0};
 const glow=i=>{const I=INST[i];if(I.g.userData.y0===undefined)I.g.userData.y0=I.g.position.y;I.glow=1;snd(I.snd);if(!raf)raf=requestAnimationFrame(tick)};
 for(const I of INST)I.g.userData.y0=I.g.position.y;
 /* ---------- 놀이: 제례악 따라 치기. 무이가 먼저 친 순서대로 실제 악기를 눌러요 ---------- */
 let ST=null;const say=t=>{try{H3().say(t,4)}catch(e){}};
 /* 놀이 중 안내는 화면 위 띠에(동행 말풍선이 악기를 가리지 않게) */let BN=null,BT=0;const gsay=t=>{try{if(!BN){BN=document.createElement('div');BN.style.cssText='position:fixed;top:62px;left:50%;transform:translateX(-50%);max-width:88vw;background:rgba(42,26,16,.9);color:#f6e7c4;border:2px solid #d8a838;padding:8px 16px;border-radius:14px;font:16px "Gowun Dodum",sans-serif;z-index:40;pointer-events:none;text-align:center;line-height:1.4';document.body.append(BN)}BN.textContent=t;BN.style.display='block';clearTimeout(BT)}catch(e){}};
 /* 놀이 중 누르기: 눌린 자리에서 가장 가까운 악기(작은 화면에서도 잘 맞게) */let TL=null;function tapOn(){const cv=document.querySelector('canvas');if(!cv||TL)return;let d0=null;const dn=e=>{d0={x:e.clientX,y:e.clientY,t:performance.now()}};const up=e=>{if(!d0||!ST)return;const ok=Math.hypot(e.clientX-d0.x,e.clientY-d0.y)<12&&performance.now()-d0.t<500;d0=null;if(!ok)return;const h=H3(),T=h.THREE,r=cv.getBoundingClientRect();let best=-1,bd=1e9;INST.forEach((I,i)=>{const c=new T.Box3().setFromObject(I.g).getCenter(new T.Vector3()).project(h.CAM);if(c.z>1)return;const x=r.left+(c.x+1)/2*r.width,y=r.top+(1-c.y)/2*r.height,d=Math.hypot(x-e.clientX,y-e.clientY);if(d<bd){bd=d;best=i}});if(best>=0&&bd<Math.max(60,r.width*.09))hit(best,true)};cv.addEventListener('pointerdown',dn);cv.addEventListener('pointerup',up);TL={cv,dn,up};try{const cb=document.getElementById('compB');if(cb)cb.style.visibility='hidden'}catch(e){}window.__TAPS=(window.__TAPS||[]).filter(o=>!tapList.includes(o))}
 function tapOff(){try{const cb=document.getElementById('compB');if(cb)cb.style.visibility=''}catch(e){}if(TL){TL.cv.removeEventListener('pointerdown',TL.dn);TL.cv.removeEventListener('pointerup',TL.up);TL=null}if(!mini){window.__TAPS=(window.__TAPS||[]).filter(o=>o.parent&&!tapList.includes(o));window.__TAPS.push(...tapList)}BT=setTimeout(()=>{if(BN)BN.style.display='none'},3500)}
 const LENS=[3,4,5,6];
 function show(){if(!ST)return;ST.mode='show';ST.i=0;let j=0;const step=()=>{if(!ST)return;if(j>=ST.seq.length){ST.mode='input';gsay(`이제 같은 순서로 악기 ${ST.seq.length}개를 눌러요.`);return}glow(ST.seq[j]);j++;setTimeout(step,850)};setTimeout(step,900)}
 function round(){if(!ST)return;const n=LENS[ST.round];while(ST.seq.length<n){let k;do{k=Math.floor(Math.random()*INST.length)}while(ST.seq.length&&k===ST.seq[ST.seq.length-1]);ST.seq.push(k)}gsay(`${ST.round+1}째 가락이에요. 무이가 먼저 쳐요. 잘 보세요!`);show()}
 function hit(i,byTap){glow(i);const I=INST[i];if(!ST||ST.mode!=='input'){if(byTap&&!ST)say(`${I.n}: ${I.d}`);return}
  if(i===ST.seq[ST.i]){ST.i++;if(ST.i>=ST.seq.length){ST.mode='wait';ST.round++;if(ST.round>=LENS.length){const Q=Math.max(60,100-ST.miss*10);const c=(H3().ctx&&H3().ctx())||null;ST=null;tapOff();gsay(`제례악 한 마당 완성! 품질 ${Q}점이에요.`);say(`제례악 한 마당 완성! 품질 ${Q}점이에요.`);try{c&&c.done('jerye',Q,'제례악 따라 치기')}catch(e){}window.__JMDONE=Q;return}gsay('좋아요! 다음 가락은 하나 더 길어요.');setTimeout(round,1500)}}
  else{ST.miss++;ST.mode='wait';gsay(`앗, 그건 ${I.n}이에요. 다시 보여 줄게요.`);setTimeout(show,1400)}}
 window.__JMPLAY=()=>{if(ST)return;ST={round:0,seq:[],i:0,miss:0,mode:'wait'};try{const h=H3();h.tp(0,12.6,WH);h.face(Math.PI);/* 악기 여덟이 한 화면에, 말풍선 아래로 보이게 카메라를 뒤로 높이 */h.cam(0,innerWidth<innerHeight?1.1:.78,innerWidth<innerHeight?26:13)}catch(e){}tapOn();round()};
 window.__JM={INST,get ST(){return ST},hit};
 if(!mini){window.__TAPS=(window.__TAPS||[]).filter(o=>o.parent);window.__TAPS.push(...tapList)}
 /* ---------- 향나무·소나무 몇 그루(마당 둘레) ---------- */
 /* ---------- 볼거리 ---------- */
 spots.push({x:0,y:0,z:34,r:2.6,t:'남신문',h:'종묘 정전으로 들어가는 남쪽 문이에요. 제례 때 신주와 제관이 이 문으로 드나들어요. 세 칸 문 가운데는 신이 지나는 길과 이어져요.'});
 spots.push({x:0,y:.2,z:46,r:2.4,t:'신로',h:'가운데 조금 높은 길은 조상의 혼이 다니는 길(신로)이라 사람은 밟지 않았어요. 동쪽 길은 임금, 서쪽 길은 세자가 걸었어요. 무이도 옆길로 걸어요.'});
 spots.push({x:-22,y:WH,z:6,r:3,t:'월대',h:'정전 앞 넓은 돌 기단(월대)이에요. 실제로는 동서 약 109m, 남북 약 69m예요. 제례 때 제관과 악사, 줄 지어 춤추는 일무가 여기 섰어요.'});
 spots.push({x:-18,y:WH,z:HZ+7.6,r:3,t:'정전',h:'조선 왕과 왕비의 신주를 모신 사당이에요. 신주를 모신 방(신실)이 열아홉 칸이고, 실제 길이는 약 101m로 무척 길어요. 1995년 유네스코 세계유산이 되었어요. 여기서는 길이를 줄여 지었어요.'});
 spots.push({x:-6,y:WH,z:11.2,r:2.6,t:'제례악 악기',h:'종묘제례악은 제사 때 연주하는 음악이에요. 악기 소리와 노래, 춤(일무)이 함께해요. 2001년 종묘제례와 함께 유네스코 인류무형유산이 되었어요. 악기를 눌러 소리를 들어 보세요. (3D: 국가유산청 종묘제례 에셋)'});
 spots.push({x:-33,y:WH,z:6,r:2.4,t:'월랑',h:'정전 양옆에서 앞으로 뻗은 날개 건물(월랑)이에요. 동쪽 월랑은 벽으로 막혀 있고, 서쪽 월랑은 기둥만 서 있어 트여 있어요.'});
 spots.push({x:YX,y:0,z:YZ+18,r:3.2,t:'영녕전',h:'정전에서 모시지 못하게 된 왕과 왕비의 신주를 옮겨 모신 사당이에요. 세종 3년(1421)에 지었어요. 가운데 네 칸은 지붕이 양옆보다 높아요. 국가유산청이 3D로 기록한 실제 영녕전이에요. (3D: 국가유산청)'});
 const meta={quest:{t:'종묘 제례 순례',d:'종묘의 볼거리 일곱을 찾아 살펴보세요.',steps:[['남신문','남신문'],['신로','신로'],['월대','월대'],['정전','정전'],['제례악 악기','제례악 악기'],['월랑','월랑'],['영녕전','영녕전']]},
  title:'종묘 마당',hint:'조선 왕실의 사당 종묘예요. 남신문으로 들어가 신로 옆길을 따라 월대에 오르고, 제례악 악기를 눌러 소리를 들어 보세요. 서쪽 문으로 나가면 영녕전이 있어요. (3D: 국가유산청 KHS, CC BY · 정전은 배치를 본떠 지음)',
  env:{plaza:null,beds:false,trees:true,sign:{x:9,z:42,lines:['종묘 마당','정전 · 월대 · 신로','제례악 악기 · 영녕전','배치를 본떠 지었어요']},treeAvoid:(x,z)=>(Math.abs(x)<50&&z<34&&z>-34)||(x<-44&&x>-63&&z>-3&&z<14)||(x<-58&&x>-100&&z>8&&z<14)||(x<-64&&x>-128&&z>-26&&z<22)||(Math.abs(x)<5&&z>26)},
  npc:[['painter',[[-4,38],[-4,20]]],['carpenter',[[20,8],[20,4]]]],
  level:P=>P.y>WH-.1&&Math.abs(P.x)<40&&P.z<14&&P.z>-22?'월대':P.x<-46?'영녕전':P.z>30?'남신문 밖':'정전 마당',
  camCap:()=>Infinity,
  mini:{S:2.2,ox:-24,oz:0,draw(g,X,Z,S){g.fillStyle='#7d8a5a';g.fillRect(0,0,300,300);g.fillStyle='#b5a888';g.fillRect(X(-46),Z(-30),92*S,60*S);g.fillStyle='#a49d8f';g.fillRect(X(-40),Z(-22),80*S,36*S);g.fillStyle='#8a2a22';g.fillRect(X(-HW/2),Z(HZ-HD/2),HW*S,HD*S);g.fillStyle='#c8c2b4';g.fillRect(X(-2),Z(14),4*S,44*S);g.fillStyle='#8a2a22';g.fillRect(X(YX-YW/2),Z(YZ-6),YW*S,10*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-2.6,z:56,yaw:Math.PI},size:{}},meta)}
