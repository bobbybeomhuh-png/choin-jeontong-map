/* 전국 지도 계절과 날씨. 갱신 2026-11-14
   계절 4개: 지금 달로 시작하고 위 단추로 바꾼다. 나무·들·논·땅·산 색과 무이 둘레에 흩날리는 것(꽃잎·반딧불·단풍잎·눈)이 바뀐다.
   날씨: 땅 위를 떠도는 비구름 4개. 비(겨울엔 눈)가 오다 그치면 무지개가 뜬다. 무이가 구름 아래 들어가면 빗소리와 한마디. */
import * as THREE from 'three';
const SN=['spring','summer','autumn','winter'],KO={spring:'봄',summer:'여름',autumn:'가을',winter:'겨울'},ICON={spring:'🌸',summer:'🌿',autumn:'🍁',winter:'❄️'};
const LINE={spring:'봄이에요! 벚꽃이 피고 논에 물이 찼어요.',summer:'여름이에요! 들이 온통 초록이고 밤엔 반딧불이 날아요.',autumn:'가을이에요! 산마다 단풍이 들고 논이 누렇게 익었어요.',winter:'겨울이에요! 산과 들에 하얗게 눈이 쌓였어요.'};
const LEAF={spring:[0xf6b8c8,0xf9d2dc,0xfdf0f2,0xf2a6bc,0xa8d870,0xb8e07a,0xf6c4d2,0x9cd060],summer:[0x5f9e3a,0x4f8f34,0x6fae44,0x3f7f30,0x7fbc4a,0x58983a,0x68a83e,0x4a8a32],winter:[0xeef2f4,0xe4eaee,0xf6f8fa,0xd8dee2,0x9a8a78,0xe8eef0,0xf2f4f6,0xdce2e6]};
const FIELD={spring:[0xf4e04d,0xf6e65a,0xf2a6c0,0xa8d870,0xf4e04d,0xfdf0f2],summer:[0x7fbc4a,0x6fae44,0x8fca58,0x5f9e3a,0xc98bd8,0x7fbc4a],winter:[0xf2f4f6,0xe8ecee,0xf6f8fa,0xdfe4e6,0xeef0f2,0xc8bca8]};
const FOG={spring:0xf2e6ea,summer:0xd8eaf2,autumn:0xd8d4c8,winter:0xe2e8ee};
const spriteTex=(draw)=>{const c=document.createElement('canvas');c.width=c.height=64;const q=c.getContext('2d');draw(q);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t};
const PT={
 spring:spriteTex(q=>{q.fillStyle='#f7b6c8';q.beginPath();q.ellipse(32,32,22,13,.5,0,7);q.fill();q.fillStyle='#fde4ea';q.beginPath();q.ellipse(28,29,10,6,.5,0,7);q.fill()}),
 summer:spriteTex(q=>{const g=q.createRadialGradient(32,32,0,32,32,30);g.addColorStop(0,'rgba(250,255,170,1)');g.addColorStop(.3,'rgba(200,255,90,.7)');g.addColorStop(1,'rgba(160,230,60,0)');q.fillStyle=g;q.fillRect(0,0,64,64)}),
 autumn:spriteTex(q=>{q.fillStyle='#e8603c';q.beginPath();for(let i=0;i<5;i++){const a=-Math.PI/2+i*Math.PI*2/5;q.moveTo(32,34);q.lineTo(32+Math.cos(a-.25)*14,34+Math.sin(a-.25)*14);q.lineTo(32+Math.cos(a)*26,34+Math.sin(a)*26);q.lineTo(32+Math.cos(a+.25)*14,34+Math.sin(a+.25)*14)}q.fill();q.strokeStyle='#8a3a1c';q.lineWidth=2;q.beginPath();q.moveTo(32,34);q.lineTo(32,58);q.stroke()}),
 winter:spriteTex(q=>{const g=q.createRadialGradient(32,32,0,32,32,26);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.5,'rgba(255,255,255,.8)');g.addColorStop(1,'rgba(255,255,255,0)');q.fillStyle=g;q.fillRect(0,0,64,64)})};
export function buildSeason(G,{TOP,provAt,HALL,mulb,MS=1,scene}){const U=G.userData,r=mulb(1411);const tc=new THREE.Color(),tw=new THREE.Color();
 /* 처음 색을 기억해 두고 계절마다 거기서 바꾼다 */
 const keep=(im)=>{if(!im||!im.instanceColor)return null;return Float32Array.from(im.instanceColor.array)};
 const leafIM=U.broad?U.broad[1]:null,leaf0=keep(leafIM),pine0=keep(U.pines),field0=keep(U.fields);
 const LM0={};if(U.LM)for(const k in U.LM)LM0[k]=U.LM[k].color.clone();
 const terr=U.terr,terC0=terr?Float32Array.from(terr.geometry.attributes.color.array):null;
 const paddy=U.paddy,paddyMap=paddy?paddy.map:null;const sea=U.sea,sea0=sea?sea.color.clone():null;
 const recolor=(im,src,pal,mix=1)=>{if(!im||!src)return;const a=im.instanceColor.array,rr=mulb(77);for(let i=0;i<im.count;i++){tc.setRGB(src[i*3],src[i*3+1],src[i*3+2]);if(pal){tw.setHex(pal[(rr()*pal.length)|0]);tc.lerp(tw,mix)}a[i*3]=tc.r;a[i*3+1]=tc.g;a[i*3+2]=tc.b}im.instanceColor.needsUpdate=true};
 let cur='autumn';
 function apply(s){cur=s;
  recolor(leafIM,leaf0,s==='autumn'?null:LEAF[s]);
  recolor(U.fields,field0,s==='autumn'?null:FIELD[s]);
  if(U.pines&&pine0){const a=U.pines.instanceColor.array;for(let i=0;i<U.pines.count;i++){tc.setRGB(pine0[i*3],pine0[i*3+1],pine0[i*3+2]);if(s==='winter')tc.lerp(tw.setHex(0xffffff),.55);else if(s==='summer')tc.multiplyScalar(.9);else if(s==='spring')tc.lerp(tw.setHex(0xc8f0a0),.15);a[i*3]=tc.r;a[i*3+1]=tc.g;a[i*3+2]=tc.b}U.pines.instanceColor.needsUpdate=true}
  if(U.LM)for(const k in U.LM){const c=U.LM[k].color.copy(LM0[k]);if(s==='winter')c.lerp(tw.setHex(0xf2f4f6),.7);else if(s==='spring')c.lerp(tw.setHex(0xb8e07a),.18);else if(s==='summer')c.lerp(tw.setHex(0x5f9e3a),.25)}
  if(terr&&terC0){const ca=terr.geometry.attributes.color,pa=terr.geometry.attributes.position;for(let i=0;i<ca.count;i++){tc.setRGB(terC0[i*3],terC0[i*3+1],terC0[i*3+2]);const h=pa.getY(i)-(TOP-.3);
    if(s==='winter')tc.lerp(tw.setHex(0xf6f8fa),h>2.5?.92:.6);
    else if(s==='autumn'&&h>1.2&&h<11){const k=(Math.sin(pa.getX(i)*.37+pa.getZ(i)*.23)*.5+.5);tc.lerp(tw.setHex(k>.66?0xd8503a:k>.33?0xe88a3a:0xd8a83a),.4)}
    else if(s==='spring'){if(h<4)tc.lerp(tw.setHex(0x9cd060),.35);if(h>11)tc.lerp(tw.setHex(0xf6f8fa),.5)}
    else if(s==='summer')tc.lerp(tw.setHex(0x3f8a34),h<10?.3:.1);
    ca.setXYZ(i,tc.r,tc.g,tc.b)}ca.needsUpdate=true}
  if(paddy){if(s==='winter'){paddy.map=null;paddy.color.setHex(0xeef2f4)}else{paddy.map=paddyMap;paddy.color.setHex(s==='spring'?0x9cc8e0:s==='summer'?0x8fd060:0xffffff)}paddy.needsUpdate=true}
  if(sea&&sea0){sea.color.copy(sea0);if(s==='winter')sea.color.lerp(tw.setHex(0xa8c8d8),.4);if(s==='summer')sea.color.lerp(tw.setHex(0xb8f4f0),.3)}
  {const sc=scene||(window.__H3&&window.__H3.scene);if(sc&&sc.fog)sc.fog.color.setHex(FOG[s])}
  FL.material.map=PT[s];FL.material.size=s==='summer'?.4:s==='winter'?.55:.75;FL.material.blending=s==='summer'?THREE.AdditiveBlending:THREE.NormalBlending;FL.material.needsUpdate=true;
  for(const C of CL)C.isSnow=s==='winter';
  if(btn)btn.textContent=ICON[s]+' '+KO[s];try{localStorage.setItem('muui-wm-season',s)}catch(e){}}
 /* 무이 둘레 흩날림(꽃잎·반딧불·단풍잎·눈) */
 const NF=500,fp=new Float32Array(NF*3),fv=[];for(let i=0;i<NF;i++){fp[i*3]=(r()-.5)*70;fp[i*3+1]=r()*26;fp[i*3+2]=(r()-.5)*70;fv.push(r()*6.28)}
 const fg=new THREE.BufferGeometry();fg.setAttribute('position',new THREE.BufferAttribute(fp,3));const FL=new THREE.Points(fg,new THREE.PointsMaterial({size:.75,map:PT.autumn,transparent:true,depthWrite:false,alphaTest:.05}));FL.frustumCulled=false;FL.renderOrder=3;G.add(FL);
 /* 비구름 4개: 땅 위를 천천히 돈다. 40초 비 → 20초 갬(무지개) */
 const cm=new THREE.MeshStandardMaterial({color:0x8a929c,roughness:1,transparent:true,opacity:.95});const lm=new THREE.LineBasicMaterial({color:0xe4f0fa,transparent:true,opacity:.85});
 const sm=new THREE.PointsMaterial({size:.5,map:PT.winter,transparent:true,depthWrite:false});
 const RBC=[0xe84a3a,0xf08c3a,0xf6d04a,0x7cc85a,0x4aa0e0,0x4a5ac8,0x9a5ac8];
 const homes=[[-30,-60],[60,-110],[-20,40],[40,20],[-50,90],[80,-30]].map(([a,b])=>[a*MS,b*MS]).filter(([x,z])=>provAt(x,z)).slice(0,4);
 const CL=homes.map(([hx,hz],ci)=>{const g=new THREE.Group();const n=6;for(let j=0;j<n;j++){const b=new THREE.Mesh(new THREE.SphereGeometry(4+r()*2.5,10,8),cm);b.position.set(j*3.6-n*1.8,r()*1.6,(r()-.5)*5);b.scale.y=.62;g.add(b)}
  const NR=650,rp=new Float32Array(NR*6);const RH=28;for(let i=0;i<NR;i++){const a=r()*6.28,d=Math.sqrt(r())*13,x=Math.cos(a)*d,z=Math.sin(a)*d,y=-r()*RH;rp.set([x,y,z,x+.18,y-2.2,z],i*6)}
  const rg=new THREE.BufferGeometry();rg.setAttribute('position',new THREE.BufferAttribute(rp,3));const rain=new THREE.LineSegments(rg,lm);rain.frustumCulled=false;g.add(rain);
  const sp=new Float32Array(NR*3);for(let i=0;i<NR;i++){sp[i*3]=rp[i*6];sp[i*3+1]=rp[i*6+1];sp[i*3+2]=rp[i*6+2]}const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(sp,3));const snow=new THREE.Points(sg,sm);snow.frustumCulled=false;snow.visible=false;g.add(snow);
  const rb=new THREE.Group();RBC.forEach((c,k)=>{const m=new THREE.Mesh(new THREE.TorusGeometry(16-k*.55,.3,6,64,Math.PI),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:0,depthWrite:false,fog:false}));rb.add(m)});rb.visible=false;G.add(rb);
  const y=TOP+30;g.position.set(hx,y,hz);G.add(g);return{g,rain,snow,rb,rp,sp,NR,RH,hx,hz,a:ci*1.7,rad:(18+ci*6)*MS,ph:ci*13,raining:true,isSnow:false,inside:false}});
 /* 빗소리: 걸러낸 잡음, 구름 아래 가까울수록 크게 */
 let rainG=null;const rainSound=()=>{if(rainG)return rainG;try{const AC=window.__H3&&window.__H3.AC;if(!AC)return null;const len=AC.sampleRate*2,b=AC.createBuffer(1,len,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;const s=AC.createBufferSource();s.buffer=b;s.loop=true;const f=AC.createBiquadFilter();f.type='bandpass';f.frequency.value=1800;f.Q.value=.6;const gn=AC.createGain();gn.gain.value=0;s.connect(f);f.connect(gn);gn.connect(AC.destination);s.start();rainG=gn}catch(e){}return rainG};
 const say=(t,s=4)=>{try{window.__H3&&window.__H3.say(t,s)}catch(e){}};
 let lastRainbowSay=-99;
 const tick=(P,dt,t)=>{if(!P)return;const cyc=60;let wet=0;
  /* 흩날림: 무이를 따라다님 */{const a=fg.attributes.position.array;FL.position.set(P.x,TOP,P.z);const s=cur;for(let i=0;i<NF;i++){const k=i*3;fv[i]+=dt*(s==='summer'?.6:1.4);
    if(s==='summer'){a[k]+=Math.sin(fv[i])*dt*.8;a[k+1]+=Math.cos(fv[i]*.7)*dt*.4;a[k+2]+=Math.cos(fv[i]*1.3)*dt*.8;if(a[k+1]<0.3)a[k+1]=3;if(a[k+1]>6)a[k+1]=.5}
    else{const fall=s==='winter'?1.6:s==='spring'?1.1:1.3;a[k+1]-=fall*dt;a[k]+=Math.sin(fv[i])*dt*(s==='winter'?.4:1.2)+dt*.5;a[k+2]+=Math.cos(fv[i]*.8)*dt*.6;if(a[k+1]<0){a[k+1]=24+Math.random()*4;a[k]=(Math.random()-.5)*70;a[k+2]=(Math.random()-.5)*70}}
    if(a[k]>35)a[k]-=70;if(a[k]<-35)a[k]+=70;if(a[k+2]>35)a[k+2]-=70;if(a[k+2]<-35)a[k+2]+=70}fg.attributes.position.needsUpdate=true;
   /* 여름 반딧불은 낮게 깔리게: 높이 0.3~6 안에서만 */FL.visible=!(window.__SEASON_OFF)}
  for(const C of CL){C.a+=dt*.015;const x=C.hx+Math.cos(C.a)*C.rad,z=C.hz+Math.sin(C.a)*C.rad;C.g.position.x=x;C.g.position.z=z;
   const ph=((t+C.ph)%cyc+cyc)%cyc,on=ph<40;const was=C.raining;C.raining=on;
   const far=Math.hypot(P.x-x,P.z-z);const show=far<260;C.rain.visible=on&&show&&!C.isSnow;C.snow.visible=on&&show&&C.isSnow;
   if(show&&on){const sp=C.isSnow?2.2:26;if(!C.isSnow){const a=C.rp;for(let i=0;i<C.NR;i++){const k=i*6;a[k+1]-=sp*dt;a[k+4]-=sp*dt;if(a[k+1]<-C.RH){a[k+1]+=C.RH;a[k+4]+=C.RH}}C.rain.geometry.attributes.position.needsUpdate=true}
    else{const a=C.sp;for(let i=0;i<C.NR;i++){const k=i*3;a[k+1]-=sp*dt;a[k]+=Math.sin(t*1.3+i)*dt*.3;if(a[k+1]<-C.RH)a[k+1]+=C.RH}C.snow.geometry.attributes.position.needsUpdate=true}}
   /* 갬: 구름 옆에 무지개(무이 쪽을 보게) */const rbA=on?0:Math.min(1,(ph-40)/3)*Math.min(1,(60-ph)/3);C.rb.visible=rbA>0.01&&show&&!C.isSnow;if(C.rb.visible){C.rb.position.set(x,TOP-1.5,z);C.rb.rotation.y=Math.atan2(P.x-x,P.z-z);C.rb.children.forEach(m=>m.material.opacity=rbA*.55)}
   cm.opacity=.95;
   const inside=far<15;if(inside&&on)wet=Math.max(wet,1-far/15);
   if(inside&&on&&!C.inside){say(C.isSnow?'눈이 펑펑 와요! 하얗다~':'앗, 소나기예요! 금방 그칠 거예요.')}
   if(was&&!on&&far<60&&!C.isSnow&&t-lastRainbowSay>30){lastRainbowSay=t;say('비 그쳤다! 저기 무지개 좀 보세요! 🌈',5)}
   C.inside=inside&&on}
  const g=wet>0?rainSound():rainG;if(g){const want=cur==='winter'?0:wet*.16;g.gain.value+=(want-g.gain.value)*Math.min(1,dt*3)}};
 /* 계절 단추 */let btn=null;
 if(typeof document!=='undefined'){const add=()=>{const top=document.getElementById('top');if(!top){setTimeout(add,300);return}btn=document.createElement('button');btn.className='btn';btn.id='wmSeason';btn.type='button';btn.style.pointerEvents='auto';const v=document.getElementById('bView');top.insertBefore(btn,v);btn.textContent=ICON[cur]+' '+KO[cur];btn.addEventListener('click',()=>{const n=SN[(SN.indexOf(cur)+1)%4];apply(n);say(LINE[n],4)})};add()}
 /* 처음 계절: 주소 ?season= > 지난번 고른 것 > 지금 달 */
 const qs=new URLSearchParams(location.search);let s0=qs.get('season');if(!SN.includes(s0)){try{s0=localStorage.getItem('muui-wm-season')}catch(e){s0=null}}if(!SN.includes(s0)){const m=new Date().getMonth()+1;s0=m>=3&&m<=5?'spring':m<=8&&m>=6?'summer':m>=9&&m<=11?'autumn':'winter'}
 apply(s0);setTimeout(()=>apply(cur),2500);
 window.__SEASON={set:apply,get:()=>cur,clouds:CL};
 return{tick,apply}}
