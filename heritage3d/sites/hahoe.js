/* 안동 하회마을 마당(2026-11-18): 낙동강이 마을을 감싸 도는 물돌이 마을. 기와집 양진당·충효당, 초가, 삼신당 느티나무, 강가 만송정 솔숲, 강 건너 부용대 절벽.
   새 재미: 선유줄불놀이. 부용대 꼭대기에서 강 건너 솔숲까지 줄을 매고 숯가루 봉지에 불을 붙이면 불꽃이 비처럼 떨어지고, 강에는 달걀불이 떠내려가요.
   건물은 공개 3D 한옥(hanokkit.js·extras.js 출처), 배치는 하회마을을 본떠 작게 지음(실제 거리와 다름). */
import * as THREE from 'three';
import {tex,mulb,materials} from './sungnyemun.js';
import {placeHanok} from './hanokkit.js';
import {stoneLantern} from './stonekit.js';
export function buildHahoe(opts={}){const mini=!!opts.mini;const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(517);
 const TOUCH=typeof matchMedia!=='undefined'&&matchMedia('(pointer:coarse)').matches;
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=!TOUCH;b.receiveShadow=true;return b};
 const CZ=8,RI=36,RO=47,T0=.06*Math.PI,T1=.94*Math.PI,RF=33.5;/* 물돌이 중심(0,CZ), 강 안·바깥 반지름, 북쪽 반원, 울타리 반지름 */
 const AT=(R,th)=>[R*Math.cos(th),CZ-R*Math.sin(th)];
 /* ---------- 땅 ---------- */
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#7a9a4e';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){q.fillStyle=r()<.5?'rgba(90,120,50,.5)':'rgba(150,165,90,.4)';q.fillRect(r()*w,r()*h,2,2)}},[34,34]);const g=new THREE.Mesh(new THREE.PlaneGeometry(260,260),new THREE.MeshStandardMaterial({map:GT,roughness:1}));g.rotation.x=-Math.PI/2;g.receiveShadow=true;G.add(g)}
 /* 흙길: 남쪽 들머리에서 삼신당까지, 거기서 양진당·충효당·강가로 */
 {const DT=tex(256,256,(q,w,h)=>{q.fillStyle='#b59a72';q.fillRect(0,0,w,h);for(let i=0;i<2500;i++){const v=150+r()*50|0;q.fillStyle=`rgba(${v},${v-20},${v-50},.5)`;q.fillRect(r()*w,r()*h,2+r()*3,2)}},[1,6]);const dm=new THREE.MeshStandardMaterial({map:DT,roughness:1});
  const lane=(x0,z0,x1,z1,w)=>{const L=Math.hypot(x1-x0,z1-z0),a=Math.atan2(x1-x0,z1-z0);const p=new THREE.Mesh(new THREE.PlaneGeometry(w,L),dm);p.rotation.x=-Math.PI/2;p.rotation.z=a;p.position.set((x0+x1)/2,.02,(z0+z1)/2);p.receiveShadow=true;G.add(p)};
  lane(0,28,0,2,3.2);lane(0,-2,-12,-8.5,2.4);lane(0,-2,12,-8.5,2.4);lane(0,-4,-2,-23,2.2);lane(-1,10,-12,13,2);lane(1,10,13,12,2);
  const ring=new THREE.Mesh(new THREE.RingGeometry(2.2,4.4,40),dm);ring.rotation.x=-Math.PI/2;ring.position.set(0,.025,-1);G.add(ring)}
 /* ---------- 낙동강 물돌이: 마을 북쪽을 반원으로 감싸 흐름, 안쪽 흰 모래톱 ---------- */
 const WT=tex(256,256,(q,w,h)=>{q.fillStyle='#3f7d86';q.fillRect(0,0,w,h);for(let i=0;i<120;i++){const x=r()*w,y=r()*h,L=8+r()*22;q.strokeStyle='rgba(225,242,245,'+(.06+r()*.1)+')';q.lineWidth=1+r();q.beginPath();for(let k=0;k<=L;k+=2)q.lineTo(x+k,y+Math.sin((x+k)/5)*1.2);q.stroke()}},[22,3]);
 {const wg=new THREE.RingGeometry(RI,RO,120,1,T0,T1-T0);wg.rotateX(-Math.PI/2);const w=new THREE.Mesh(wg,new THREE.MeshStandardMaterial({map:WT,roughness:.15,metalness:.2,color:0xd8eeea}));w.position.set(0,.04,CZ);w.receiveShadow=true;G.add(w);G.userData.water=WT;
  const sg=new THREE.RingGeometry(RI-4,RI,120,1,T0-.04,T1-T0+.08);sg.rotateX(-Math.PI/2);const sm=new THREE.Mesh(sg,M(0xdccfab,{roughness:1}));sm.position.set(0,.03,CZ);sm.receiveShadow=true;G.add(sm);
  const og=new THREE.RingGeometry(RO,RO+2.6,120,1,T0,T1-T0);og.rotateX(-Math.PI/2);const om=new THREE.Mesh(og,M(0xb9aa86,{roughness:1}));om.position.set(0,.03,CZ);G.add(om)}
 /* ---------- 부용대: 강 건너 북쪽 깎아지른 절벽(높이 약 15m로 줄여 지음), 꼭대기 소나무 ---------- */
 const CH=15,CR=50.5;
 {const RK=tex(256,512,(q,w,h)=>{/* 가로로 쌓인 바위 켜: 두께가 고르지 않은 띠 + 갈라진 틈 + 이끼 */let y=0;while(y<h){const th=10+r()*34,v=118+r()*40|0;q.fillStyle=`rgb(${v},${v-8|0},${v-20|0})`;q.fillRect(0,y,w,th);q.fillStyle='rgba(50,42,34,.5)';q.fillRect(0,y+th-2,w,2);y+=th}for(let i=0;i<26;i++){const x=r()*w,y0=r()*h;q.strokeStyle='rgba(40,34,28,.55)';q.lineWidth=1+r()*1.5;q.beginPath();q.moveTo(x,y0);q.lineTo(x+(r()-.5)*14,y0+20+r()*60);q.stroke()}for(let i=0;i<700;i++){q.fillStyle=`rgba(${70+r()*40|0},${100+r()*40|0},${50+r()*20|0},.4)`;q.fillRect(r()*w,r()*h,3+r()*4,2)}for(let i=0;i<5000;i++){q.fillStyle=r()<.5?'rgba(0,0,0,.08)':'rgba(255,255,255,.06)';q.fillRect(r()*w,r()*h,2,2)}},[1,1]);const rm=new THREE.MeshStandardMaterial({map:RK,roughness:1});const top=M(0x5f7a3a,{roughness:1});
  const C0=.2*Math.PI,C1=.8*Math.PI,N=30;for(let i=0;i<N;i++){const a0=C0+(C1-C0)*i/N,a1=C0+(C1-C0)*(i+1)/N,am=(a0+a1)/2;const h=CH*(.82+.18*Math.sin(i*1.7)+.08*Math.sin(i*.6));const L=CR*(a1-a0)+.6;const[x,z]=AT(CR,am);const b=box(L,h,5,rm);b.position.set(x,h/2,z);b.rotation.y=Math.PI/2-am;G.add(b);const t=box(L+.2,.6,5.4,top);t.position.set(x,h+.25,z);t.rotation.y=Math.PI/2-am;G.add(t);
   if(!mini&&i%3===1){const[px,pz]=AT(CR+1,am);const pg=new THREE.Group();pg.position.set(px,h+.4,pz);const tr=new THREE.Mesh(new THREE.CylinderGeometry(.18,.28,3.4,6),M(0x6a4a30));tr.position.y=1.7;pg.add(tr);for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(1.6-k*.35,1.4,7),M(0x3f5f34,{flatShading:true}));c.position.y=2.8+k*.8;pg.add(c)}G.add(pg)}}
  /* 양쪽 끝은 낮은 산으로 이어짐 */for(const sd of[-1,1]){const hill=new THREE.Mesh(new THREE.SphereGeometry(14,16,10,0,Math.PI*2,0,Math.PI/2),M(0x5f7a3a,{flatShading:true}));hill.scale.set(1.3,.75,1);const[x,z]=AT(CR+4,sd<0?C1+.12:C0-.12);hill.position.set(x,-1,z);G.add(hill)}}
 /* ---------- 싸리 울타리: 강가 반원 + 양옆 + 남쪽(들머리 트임) ---------- */
 {const FT=tex(128,64,(q,w,h)=>{q.fillStyle='#7a5c36';q.fillRect(0,0,w,h);for(let x=0;x<w;x+=3){q.fillStyle=`rgb(${110+((x*7)%40)},${84+((x*5)%30)},${50+((x*3)%20)})`;q.fillRect(x,0,2,h)}q.fillStyle='rgba(60,40,20,.85)';q.fillRect(0,h*.28,w,3);q.fillRect(0,h*.72,w,3)},[1,1]);const fm=new THREE.MeshStandardMaterial({map:FT,roughness:1}),pm=M(0x5a4028);
  const seg=(x0,z0,x1,z1)=>{const L=Math.hypot(x1-x0,z1-z0),a=Math.atan2(z1-z0,x1-x0);const p=box(L,1.15,.1,fm);p.position.set((x0+x1)/2,.6,(z0+z1)/2);p.rotation.y=-a;G.add(p);const po=new THREE.Mesh(new THREE.CylinderGeometry(.07,.08,1.4,6),pm);po.position.set(x0,.7,z0);G.add(po);const n=Math.max(1,Math.round(L/.8));for(let i=0;i<=n;i++){const t=i/n;solids.push({cx:x0+(x1-x0)*t,cz:z0+(z1-z0)*t,r:.36,y0:0,y1:1.6})}};
  const N=44;for(let i=0;i<N;i++){const[a,b]=AT(RF,Math.PI*i/N),[c,d]=AT(RF,Math.PI*(i+1)/N);seg(a,b,c,d)}
  seg(RF,CZ,RF,28);seg(-RF,CZ,-RF,28);seg(-RF,28,-3,28);seg(3,28,RF,28)}
 /* 들머리 장승 한 쌍 */
 {const mk=(t1)=>{const c=document.createElement('canvas');c.width=64;c.height=256;const q=c.getContext('2d');q.fillStyle='#c8a676';q.fillRect(0,0,64,256);q.fillStyle='#2a1a10';q.beginPath();q.arc(20,38,6,0,7);q.arc(44,38,6,0,7);q.fill();q.fillStyle='#8e2b20';q.fillRect(16,62,32,8);q.fillStyle='#2a1a10';q.font='bold 26px "Noto Serif KR",serif';q.textAlign='center';[...t1].forEach((ch,i)=>q.fillText(ch,32,104+i*30));const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;return tx};
  [['天下大將軍',-3.8],['地下女將軍',3.8]].forEach(([t1,x])=>{const g=new THREE.Group();g.position.set(x,0,29.2);G.add(g);const p=new THREE.Mesh(new THREE.CylinderGeometry(.3,.36,2.9,10),M(0x9a7a50));p.position.y=1.45;g.add(p);const f=new THREE.Mesh(new THREE.PlaneGeometry(.5,2.0),new THREE.MeshStandardMaterial({map:mk(t1),roughness:.9}));f.position.set(0,1.6,.33);g.add(f);const hat=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.12,12),M(0x2a2a2a));hat.position.y=3.0;g.add(hat);const hc=new THREE.Mesh(new THREE.CylinderGeometry(.18,.24,.4,10),M(0x2a2a2a));hc.position.y=3.25;g.add(hc);solids.push({cx:x,cz:29.2,r:.45,y0:0,y1:3.4})})}
 /* ---------- 기와집: 양진당(서), 충효당(동) ---------- */
 placeHanok(G,solids,'hall',-12,-13,0,{TOUCH});placeHanok(G,solids,'sarang',12,-13,0,{TOUCH});
 /* ---------- 삼신당 느티나무: 마을 한가운데 600살 넘은 나무, 금줄과 소원지 ---------- */
 {const TX=0,TZ=-1;const g=new THREE.Group();g.position.set(TX,0,TZ);G.add(g);const bk=M(0x5a4430,{roughness:1});
  const tr=new THREE.Mesh(new THREE.CylinderGeometry(.75,1.15,5.2,12),bk);tr.position.y=2.6;g.add(tr);
  for(const[a,l,t]of[[.4,3.4,.5],[2.3,3.0,.6],[4.1,3.2,.45]]){const br=new THREE.Mesh(new THREE.CylinderGeometry(.22,.4,l,8),bk);br.position.set(Math.cos(a)*l*.35,4.4+t,Math.sin(a)*l*.35);br.rotation.z=-Math.cos(a)*.8;br.rotation.x=Math.sin(a)*.8;g.add(br)}
  const lv=[M(0x4f7a34,{flatShading:true}),M(0x5f8a3c,{flatShading:true}),M(0x46703a,{flatShading:true})];for(let i=0;i<9;i++){const a=i*2.4,d=i?2.4+r()*1.6:0;const c=new THREE.Mesh(new THREE.IcosahedronGeometry(2.4+r()*1.2,1),lv[i%3]);c.position.set(Math.cos(a)*d,6.6+r()*1.8+(i?0:1.4),Math.sin(a)*d);c.scale.y=.8;c.castShadow=!TOUCH;g.add(c)}
  /* 금줄(새끼줄)과 하얀 소원지 */const rope=new THREE.Mesh(new THREE.TorusGeometry(1.0,.06,6,32),M(0xc8b080));rope.rotation.x=Math.PI/2;rope.position.y=1.7;g.add(rope);const pp=new THREE.MeshStandardMaterial({color:0xfaf6ea,roughness:.9,side:THREE.DoubleSide});for(let i=0;i<22;i++){const a=i/22*Math.PI*2;const s=new THREE.Mesh(new THREE.PlaneGeometry(.16,.42),pp);s.position.set(Math.cos(a)*1.03,1.45,Math.sin(a)*1.03);s.rotation.y=-a+Math.PI/2;s.rotation.z=(r()-.5)*.3;g.add(s)}
  /* 둘레 낮은 돌 테 */const st=M(0x9a9282);for(let i=0;i<20;i++){const a=i/20*Math.PI*2;const b=box(.7,.35,.4,st);b.position.set(Math.cos(a)*2.05,.17,Math.sin(a)*2.05);b.rotation.y=-a;g.add(b)}
  solids.push({cx:TX,cz:TZ,r:2.2,y0:0,y1:9})}
 /* 양진당 앞 석등 한 쌍 */for(const sx of[-1,1]){const L=stoneLantern(1.9);L.position.set(-12+sx*3.2,0,-7.2);G.add(L);solids.push({cx:-12+sx*3.2,cz:-7.2,r:.42,y0:0,y1:2})}
 /* ---------- 선유줄불놀이: 부용대 꼭대기 → 강 건너 솔숲 장대까지 줄 ---------- */
 const PA=new THREE.Vector3(0,CH*.95,CZ-CR+1.6),PB=new THREE.Vector3(-7,8.6,-20.5);
 {const po=new THREE.Mesh(new THREE.CylinderGeometry(.16,.22,8.8,8),M(0x6a4a30));po.position.set(PB.x,4.4,PB.z);G.add(po);solids.push({cx:PB.x,cz:PB.z,r:.3,y0:0,y1:9});
  const pts=[];for(let i=0;i<=30;i++){const t=i/30;const p=PA.clone().lerp(PB,t);p.y-=Math.sin(t*Math.PI)*3.2;pts.push(p)}const cv=new THREE.CatmullRomCurve3(pts);G.userData.rope=cv;const tb=new THREE.Mesh(new THREE.TubeGeometry(cv,60,.035,5),M(0xc8b080));G.add(tb)}
 /* 불꽃: 줄에서 떨어지는 불티(점), 부용대에서 떨어뜨리는 낙화, 강 위 달걀불 */
 const FN=mini?0:900;const fpos=new Float32Array(FN*3),fcol=new Float32Array(FN*3),fv=new Float32Array(FN*3),flife=new Float32Array(FN);
 const fg=new THREE.BufferGeometry();fg.setAttribute('position',new THREE.BufferAttribute(fpos,3));fg.setAttribute('color',new THREE.BufferAttribute(fcol,3));
 const spark=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const q=c.getContext('2d');const gr=q.createRadialGradient(32,32,1,32,32,30);gr.addColorStop(0,'rgba(255,250,220,1)');gr.addColorStop(.35,'rgba(255,190,90,.9)');gr.addColorStop(1,'rgba(255,120,30,0)');q.fillStyle=gr;q.fillRect(0,0,64,64);return new THREE.CanvasTexture(c)})();
 const fp=new THREE.Points(fg,new THREE.PointsMaterial({size:.42,map:spark,vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,sizeAttenuation:true}));fp.frustumCulled=false;fp.visible=false;fp.userData.noBatch=true;G.add(fp);for(let i=0;i<FN;i++){flife[i]=0;fpos[i*3+1]=-50}
 const EN=mini?0:36;const eggs=[];{const em=new THREE.MeshBasicMaterial({color:0xffb04a,transparent:true,opacity:.95,blending:THREE.AdditiveBlending,depthWrite:false});for(let i=0;i<EN;i++){const e=new THREE.Mesh(new THREE.SphereGeometry(.13,8,6),em);e.visible=false;e.userData={th:T1-r()*(T1-T0),R:RI+2+r()*(RO-RI-4),sp:.008+r()*.006};e.userData.noBatch=true;G.add(e);eggs.push(e)}}
 let FIRE=0;
 /* 줄불은 밤 놀이: 시작하면 마당 빛을 2초 동안 낮춰 밤처럼, 끝나면 되돌림 */let NIGHT=0,LITS=null;const dimTo=k=>{const sc=G.parent;if(!sc)return;if(!LITS){LITS=[];sc.traverse(o=>{if(o.isLight&&!o.isPointLight)LITS.push([o,o.intensity])});LITS.bg=sc.background&&sc.background.isColor?sc.background.clone():null}for(const[o,i0]of LITS)o.intensity=i0*(1-k*.78);if(LITS.bg&&sc.background&&sc.background.isColor)sc.background.copy(LITS.bg).lerp(new THREE.Color(0x0d1530),k*.85)};
 window.__HHFIRE=()=>{FIRE=42;fp.visible=true;for(const e of eggs){e.visible=true;e.userData.th=T1-r()*(T1-T0)*.4}try{const H=window.__H3;H.face(Math.PI);H.cam(0,innerWidth<innerHeight?.32:.22,innerWidth<innerHeight?9:7.5)}catch(e){}return true};
 const tick=(P,dt)=>{G.userData.water&&(G.userData.water.offset.x+=dt*.01);if(!FN)return;const live=FIRE>0;if(live)FIRE-=dt;{const tg=live?1:0;if(NIGHT!==tg){NIGHT+=Math.sign(tg-NIGHT)*Math.min(Math.abs(tg-NIGHT),dt/2);dimTo(NIGHT)}}const cv=G.userData.rope;let any=false;
  for(let i=0;i<FN;i++){const k=i*3;if(flife[i]>0){flife[i]-=dt;fv[k+1]-=dt*(i%5===0?3.2:.9);fpos[k]+=fv[k]*dt;fpos[k+1]+=fv[k+1]*dt;fpos[k+2]+=fv[k+2]*dt;const f=Math.max(0,Math.min(1,flife[i]/2))*(0.75+Math.random()*.25);fcol[k]=f;fcol[k+1]=f*.62;fcol[k+2]=f*.25;if(fpos[k+1]<.1)flife[i]=0;any=true}
   else if(live&&Math.random()<dt*2.6){/* 다섯에 하나는 부용대 낙화(절벽에서 쏟아짐), 나머지는 줄에서 떨어지는 불티 */if(i%5===0){const a=(r()-.5)*.5+Math.PI/2;const[x,z]=AT(CR-2.4,a);fpos[k]=x;fpos[k+1]=CH*(.9+r()*.1);fpos[k+2]=z;fv[k]=(r()-.5)*.6;fv[k+1]=0;fv[k+2]=.6+r()*.8;flife[i]=3.5}else{const p=cv.getPoint(.05+r()*.9);fpos[k]=p.x;fpos[k+1]=p.y-.05;fpos[k+2]=p.z;fv[k]=(r()-.5)*.25;fv[k+1]=-.2;fv[k+2]=(r()-.5)*.25;flife[i]=2.2+r()*1.6}any=true}
   else{fpos[k+1]=-50}}
  fg.attributes.position.needsUpdate=true;fg.attributes.color.needsUpdate=true;if(!live&&!any)fp.visible=false;
  for(const e of eggs){if(!e.visible)continue;const u=e.userData;u.th-=u.sp*dt*6;const[x,z]=AT(u.R,u.th);e.position.set(x,.14+Math.sin(performance.now()/400+u.R)*.03,z);if(u.th<T0){if(live){u.th=T1;}else e.visible=false}}};
 /* ---------- 볼거리 ---------- */
 spots.push({x:0,y:0,z:3.6,r:2.4,t:'삼신당 느티나무',h:'마을 한가운데 서 있는 600살 넘은 느티나무예요. 마을을 지켜 주는 삼신(아기를 점지해 주는 신)이 깃든 나무라고 믿어, 사람들이 금줄을 두르고 소원을 적은 종이를 매달아요.'});
 spots.push({x:-12,y:0,z:-7.4,r:2.6,t:'양진당',h:'풍산 류씨 큰집(대종가)이에요. 하회마을에서 가장 오래된 집 가운데 하나로, 사랑채가 높은 기단 위에 우뚝 서 있어요. 보물로 지정돼 있어요.'});
 spots.push({x:12,y:0,z:-7.4,r:2.6,t:'충효당',h:'임진왜란 때 영의정을 지낸 서애 류성룡의 종가예요. 류성룡은 전쟁의 교훈을 「징비록」(국보)에 남겼어요. 집 이름은 충성과 효도를 뜻해요.'});
 spots.push({x:-8,y:0,z:11.5,r:2.4,t:'초가 고샅길',h:'기와집 둘레로 초가들이 모여 있어요. 큰집을 중심으로 작은 집들이 둥글게 자리 잡아, 마을 길(고샅)이 구불구불 이어져요.'});
 spots.push({x:-19,y:0,z:-9,r:2.6,t:'만송정 솔숲',h:'강가 모래톱에 줄지어 선 소나무 숲이에요. 강바람과 모래를 막으려고 조선 때 심었다고 해요. 줄불놀이 줄의 한쪽 끝을 이 숲에 매요.'});
 spots.push({x:-2,y:0,z:-23.2,r:2.8,t:'선유줄불놀이',h:'옛날 선비들이 여름밤에 즐긴 불놀이예요. 강 건너 부용대 꼭대기에서 솔숲까지 긴 줄을 매고, 숯가루 봉지에 불을 붙이면 불티가 비처럼 떨어져요. 부용대에서는 불붙인 솔가지 뭉치를 던지며 "낙화야!" 하고 외쳤고, 강에는 달걀 껍데기에 기름불을 담은 달걀불을 띄웠어요.'});
 spots.push({x:6,y:0,z:-24.2,r:2.4,t:'부용대',h:'마을 북쪽 강 건너에 깎아지른 듯 선 절벽(높이 약 64m)이에요. 꼭대기에 오르면 낙동강이 마을을 S자로 감싸 도는 물돌이(하회)가 한눈에 보여요. 그래서 마을 이름이 하회(河回)예요.'});
 const meta={quest:{t:'하회마을 한 바퀴',d:'물돌이 마을을 걸으며 일곱 곳을 찾아보고, 강가에서 줄불놀이를 해 보세요.',steps:[['삼신당 느티나무','삼신당 느티나무'],['양진당','양진당'],['충효당','충효당'],['초가 고샅길','초가 고샅길'],['만송정 솔숲','만송정 솔숲'],['부용대','부용대'],['선유줄불놀이','선유줄불놀이']]},
  title:'안동 하회마을',hint:'낙동강이 마을을 S자로 감싸 도는 물돌이 마을이에요. 삼신당 느티나무에서 기와집과 초가를 지나 강가로 가 보세요. 강가에서 선유줄불놀이를 시작할 수 있어요.',
  env:{plaza:null,beds:false,trees:true,treeAvoid:(x,z)=>(Math.hypot(x,z-CZ)<RO+12&&z<CZ+3)||(Math.abs(x)<RF+3&&z<31),sign:{x:6.5,z:25.5,lines:['안동 하회마을','낙동강 물돌이 마을','양진당 · 충효당 · 삼신당','강가에서 선유줄불놀이']}},
  npc:[['painter',[[-5,6],[5,6],[5,16],[-5,16]]]],level:P=>P.z<-17?'강가':P.z>24?'마을 들머리':'하회마을',camCap:()=>Infinity,tick,
  mini:{S:2.4,ox:0,oz:-4,draw(g,X,Z,S){g.fillStyle='#7a9a4e';g.fillRect(0,0,300,300);g.strokeStyle='#3f7d86';g.lineWidth=(RO-RI)*S;g.beginPath();g.arc(X(0),Z(CZ),(RI+RO)/2*S,-T1,-T0);g.stroke();g.strokeStyle='#8c8274';g.lineWidth=5*S;g.beginPath();g.arc(X(0),Z(CZ),CR*S,-.8*Math.PI,-.2*Math.PI);g.stroke();g.fillStyle='#b59a72';g.fillRect(X(-1.6),Z(2),3.2*S,26*S);g.fillStyle='#4a4a4a';g.fillRect(X(-20),Z(-16),16*S,6*S);g.fillRect(X(4),Z(-16),16*S,6*S);g.fillStyle='#4f7a34';g.beginPath();g.arc(X(0),Z(-1),3*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:26,yaw:Math.PI},size:{}},meta)}
