/* 공통 바탕(모든 유산 마당): 담장·대문으로 마당 닫기, 흙마당, 석등·장독대·평상·바위, 풀포기·들꽃, 가까운 뒷산.
   갱신 2026-11-12. 마당 범위는 COURTS(유산마다 [x0,x1,z0,z1, 담장 종류, 대문 너비, 담 높이]). 대문은 늘 +z 쪽 가운데(gx로 옮김). */
import * as THREE from 'three';
import {paintedPines,lumpyHill,plantBroad} from './treekit.js';
import {tex,noise,mulb,materials,hipRoof} from './sungnyemun.js';
/* 담장 종류: earth 토담(기와 얹음), stone 돌담, fort 성벽, low 낮은 돌 석축, none 담 없음 */
export const COURTS={
 gyeongju:{x0:-50,x1:50,z0:-96,z1:30,wall:'low',gate:8,noGround:true},
 minhwa:{x0:-20,x1:20,z0:-19,z1:21,wall:'earth',gate:4},
 gangjin:{x0:-26,x1:24,z0:-26,z1:25,wall:'earth',gate:5},
 icheon:{x0:-26,x1:24,z0:-26,z1:25,wall:'earth',gate:5},
 cheongju:{x0:-46,x1:46,z0:-46,z1:36,wall:'earth',gate:6},
 jinju:{x0:-36,x1:36,z0:-16,z1:38,wall:'fort',gate:6,h:4.2,noBack:true,noHills:true},
 tongyeong:{x0:-34,x1:34,z0:-29,z1:29,wall:'stone',gate:6,noBack:true,noHills:true},
 gangneung:{x0:-32,x1:24,z0:-33,z1:25,wall:'earth',gate:4},
 yeongju:{x0:-26,x1:26,z0:-24,z1:19,wall:'low',gate:10},
 yesan:{x0:-24,x1:24,z0:-22,z1:22,wall:'earth',gate:5},
 mungyeong:{x0:-30,x1:30,z0:-29,z1:22,wall:'earth',gate:5},
 hapcheon:{x0:-38,x1:38,z0:-34,z1:20,wall:'earth',gate:6},
 suwon:{x0:-44,x1:42,z0:-2,z1:52,wall:'none',gate:0},
 naju:{x0:-32,x1:32,z0:-34,z1:24,wall:'none',gate:0},
 buyeo:{x0:-40,x1:40,z0:-40,z1:30,wall:'none',gate:0},
 hanyang:{x0:-40,x1:40,z0:-52,z1:34,wall:'none',gate:0},
 sungnyemun:{x0:-48,x1:48,z0:-40,z1:40,wall:'none',gate:0},
 seokguram:{x0:-22,x1:22,z0:-12,z1:34,wall:'none',gate:0,noHills:true}};
export function buildEnvKit(scene,SITE,EV,SOL,TOUCH,SP=[]){const C=COURTS[SITE];if(!C||EV.noKit)return;const r=mulb(SITE.length*97+13);const MT=materials();const G=new THREE.Group();scene.add(G);const gy=C.y||0;
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
 const hit=(x,z,rr)=>SOL.some(s=>s.r?Math.hypot(x-s.cx,z-s.cz)<s.r+rr:(x>s.x0-rr&&x<s.x1+rr&&z>s.z0-rr&&z<s.z1+rr));
 const inC=(x,z,m=0)=>x>C.x0-m&&x<C.x1+m&&z>C.z0-m&&z<C.z1+m;
 const gx=C.gx||0,GW=C.gate||0;G.userData.gate=GW>0?{x:gx,z:C.z1,w:GW}:null;
 /* ---------- 담장 ---------- */
 if(C.wall!=='none'){const H=C.h||(C.wall==='low'?1.1:C.wall==='fort'?4:2.1),T=C.wall==='fort'?2.2:.6;
  const EW=tex(256,128,(q,w,h)=>{q.fillStyle='#b8a07c';q.fillRect(0,0,w,h);for(let i=0;i<90;i++){const g=120+(r()*60|0);q.fillStyle=`rgb(${g},${g-8},${g-24})`;q.beginPath();q.ellipse(r()*w,r()*h,6+r()*10,4+r()*6,r()*3,0,7);q.fill()}noise(q,w,h,3000,['rgba(0,0,0,.08)','rgba(255,240,210,.08)'],2)});EW.wrapS=EW.wrapT=THREE.RepeatWrapping;
  const SW=tex(256,128,(q,w,h)=>{q.fillStyle='#8a847a';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=18)for(let x=-(y/18%2)*16;x<w;x+=32){const g=120+(r()*55|0);q.fillStyle=`rgb(${g},${g-3},${g-10})`;q.fillRect(x+1,y+1,30,16)}noise(q,w,h,2500,['rgba(0,0,0,.1)'],2)});SW.wrapS=SW.wrapT=THREE.RepeatWrapping;
  const wm=new THREE.MeshStandardMaterial({map:C.wall==='earth'?EW:SW,roughness:.95});const cap=MT.tile,ridge=MT.ridgeDk||M(0x3a3e44);
  const seg=(ax,az,bx,bz)=>{const L=Math.hypot(bx-ax,bz-az);if(L<.5)return;const a=Math.atan2(bx-ax,bz-az);const cx=(ax+bx)/2,cz=(az+bz)/2;const m=wm.clone();m.map=wm.map.clone();m.map.needsUpdate=true;m.map.repeat.set(L/4,H/2);const w=new THREE.Mesh(new THREE.BoxGeometry(T,H,L),m);w.position.set(cx,gy+H/2,cz);w.rotation.y=a;w.castShadow=w.receiveShadow=true;G.add(w);
   if(C.wall==='earth'||C.wall==='stone'){/* 담 기와: 기와 골이 길이 따라 반복되게(늘어난 줄무늬 방지) + 처마 끝 막새 줄 */let capM=cap;if(cap.map){capM=cap.clone();capM.map=cap.map.clone();capM.map.wrapS=capM.map.wrapT=THREE.RepeatWrapping;capM.map.repeat.set(1,Math.max(1,(L+.3)/1.2));capM.map.needsUpdate=true}
    {const n=Math.max(2,Math.round((L+.3)/.26));const im=new THREE.InstancedMesh(new THREE.CylinderGeometry(.075,.075,.1,10,1,false,0,Math.PI),ridge,n*2);const o=new THREE.Object3D();let k=0;for(const sd of[-1,1])for(let i=0;i<n;i++){const t=(i+.5)/n-.5;const ox=Math.cos(a)*sd*.55,oz=-Math.sin(a)*sd*.55;o.position.set(cx+Math.sin(a)*t*(L+.3)+ox,gy+H+.02,cz+Math.cos(a)*t*(L+.3)+oz);o.rotation.set(0,a+(sd>0?Math.PI/2:-Math.PI/2),Math.PI/2);o.updateMatrix();im.setMatrixAt(k++,o.matrix)}im.castShadow=true;G.add(im)}
    for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.BoxGeometry(.62,.07,L+.3),capM);p.position.set(cx+Math.cos(a)*s*.27,gy+H+.16,cz-Math.sin(a)*s*.27);p.rotation.set(0,a,0);p.rotateZ(s*.5);p.castShadow=true;G.add(p)}const rd=new THREE.Mesh(new THREE.BoxGeometry(.2,.16,L+.3),ridge);rd.position.set(cx,gy+H+.32,cz);rd.rotation.y=a;G.add(rd)}
   if(C.wall==='fort'){const n=Math.floor(L/2.2);for(let i=0;i<n;i++){const t=(i+.5)/n;const b=box(.5,.9,1.4,wm);b.position.set(ax+(bx-ax)*t+Math.cos(a)*.85,gy+H+.45,az+(bz-az)*t-Math.sin(a)*.85);b.rotation.y=a;G.add(b)}}
   const x0=Math.min(ax,bx),x1=Math.max(ax,bx),z0=Math.min(az,bz),z1=Math.max(az,bz);SOL.push({x0:x0-T/2,x1:x1+T/2,y0:-9,y1:gy+H+.5,z0:z0-T/2,z1:z1+T/2})};
  const {x0,x1,z0,z1}=C;if(!C.noBack)seg(x0,z0,x1,z0);seg(x0,z0,x0,z1);seg(x1,z0,x1,z1);if(GW>0){seg(x0,z1,gx-GW/2,z1);seg(gx+GW/2,z1,x1,z1)}else seg(x0,z1,x1,z1);
  /* 대문: 기둥 둘과 기와 지붕(성벽은 문루 대신 돌기둥) */if(GW>0){const pil=M(C.wall==='fort'?0x8a847a:0x7a5634);const PH=C.wall==='low'?2.6:C.wall==='fort'?H+1.2:3.2;for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.2,.24,PH,10),pil);p.position.set(gx+s*GW/2,gy+PH/2,z1);p.castShadow=true;G.add(p);SOL.push({cx:gx+s*GW/2,cz:z1,r:.3,y0:-9,y1:gy+PH})}
   const lin=box(GW+.6,.28,.32,M(0x6b4428));lin.position.set(gx,gy+PH-.1,z1);G.add(lin);const rf=hipRoof(MT,GW/2+1.1,1.25,GW/2-.2,gy+PH+.05,gy+PH+1.25,.3,.12,{plain:true,rs:.45});rf.position.set(gx,0,z1);rf.traverse(o=>{if(o.isMesh)o.castShadow=true});G.add(rf)}}
 /* ---------- 흙마당 바닥(담 안) ---------- */
 if(C.wall!=='none'&&!C.noGround){const W=C.x1-C.x0,D=C.z1-C.z0;const CW=1024,CH=Math.max(256,Math.min(2048,Math.round(1024*D/W)));const gxu=((C.gx||0)-C.x0)/W;
  const DT=tex(CW,CH,(q,w,h)=>{q.fillStyle='#c0a982';q.fillRect(0,0,w,h);
   /* 큰 얼룩(습기·다짐 차이) */for(let i=0;i<70;i++){const x=r()*w,y=r()*h,rr=60+r()*220,lt=r()<.5;const gr=q.createRadialGradient(x,y,0,x,y,rr);gr.addColorStop(0,lt?'rgba(222,204,166,.35)':'rgba(140,116,82,.28)');gr.addColorStop(1,'rgba(0,0,0,0)');q.fillStyle=gr;q.fillRect(x-rr,y-rr,rr*2,rr*2)}
   /* 대문에서 안쪽으로 닳은 길(밝고 단단함) */{const gx=gxu*w;for(let k=0;k<26;k++){const t=k/25,y=h-t*h*.72,x=gx+Math.sin(t*3+r())*w*.02;const rr=w*(.05+.02*Math.sin(t*5))+20;const gr=q.createRadialGradient(x,y,0,x,y,rr);gr.addColorStop(0,'rgba(226,212,180,.28)');gr.addColorStop(1,'rgba(226,212,180,0)');q.fillStyle=gr;q.fillRect(x-rr,y-rr,rr*2,rr*2)}}
   /* 비질 자국 */q.lineCap='round';for(let i=0;i<260;i++){const x=r()*w,y=r()*h,a=r()*6.28,L=30+r()*60;q.strokeStyle=`rgba(${r()<.5?110:235},${r()<.5?95:220},${r()<.5?70:190},.10)`;q.lineWidth=1+r()*1.5;q.beginPath();q.arc(x,y,L,a,a+.5+r()*.5);q.stroke()}
   /* 담 밑: 어두운 습기 띠와 풀 */const ed=Math.max(18,w*.025);for(const[x0,y0,x1,y1]of[[0,0,w,ed],[0,0,ed,h],[w-ed,0,w,h]]){const gr=x1-x0>y1-y0?q.createLinearGradient(0,y0,0,y1):q.createLinearGradient(x0,0,x1,0);const rev=x0>0;gr.addColorStop(rev?1:0,'rgba(96,104,60,.55)');gr.addColorStop(rev?0:1,'rgba(96,104,60,0)');q.fillStyle=gr;q.fillRect(x0,y0,x1-x0,y1-y0)}
   for(let i=0;i<1600;i++){const side=r()*3|0;let x,y;if(side===0){x=r()*w;y=Math.pow(r(),2.2)*ed*2.2}else if(side===1){x=Math.pow(r(),2.2)*ed*2.2;y=r()*h}else{x=w-Math.pow(r(),2.2)*ed*2.2;y=r()*h}q.strokeStyle=`rgba(${70+r()*40|0},${100+r()*50|0},${40+r()*20|0},.7)`;q.lineWidth=1;q.beginPath();q.moveTo(x,y);q.lineTo(x+(r()-.5)*3,y-2-r()*4);q.stroke()}
   /* 자갈과 흙 알갱이 */for(let i=0;i<5200;i++){const g=110+(r()*110|0);q.fillStyle=`rgba(${g},${g-8},${g-24},${.35+r()*.5})`;q.beginPath();q.arc(r()*w,r()*h,.5+r()*1.6,0,7);q.fill()}
   noise(q,w,h,9000,['rgba(0,0,0,.05)','rgba(255,250,235,.06)'],1.5)});DT.wrapS=DT.wrapT=THREE.ClampToEdgeWrapping;DT.anisotropy=8;
  const gm=new THREE.MeshStandardMaterial({map:DT,roughness:1,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});gm.userData.finKind='soil';const g=new THREE.Mesh(new THREE.PlaneGeometry(W,D).rotateX(-Math.PI/2),gm);g.position.set((C.x0+C.x1)/2,gy+.008,(C.z0+C.z1)/2);g.receiveShadow=true;G.add(g)}
 /* ---------- 대문에서 안쪽으로 디딤돌 ---------- */
 if(GW>0){const sm=M(0xb2a994,{roughness:.95,flatShading:true});for(let i=0;i<9;i++){const z=C.z1+3-i*1.25;if(hit(gx,z,.6))continue;const st=new THREE.Mesh(new THREE.CylinderGeometry(.5+r()*.12,.56+r()*.12,.05,7),sm);st.position.set(gx+(r()-.5)*.3,gy+.025,z);st.rotation.y=r()*3;st.receiveShadow=true;G.add(st)}}
 /* ---------- 소품: 석등 한 쌍, 장독대, 평상, 물확 ---------- */
 const stm=M(0xa8a196,{roughness:.95});
 const lantern=(x,z)=>{if(hit(x,z,.8))return;const g=new THREE.Group();g.position.set(x,gy,z);G.add(g);const o=(r1,r2,h,y)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,8),stm);m.position.y=y;m.castShadow=true;g.add(m)};o(.5,.55,.2,.1);o(.12,.12,.9,.65);o(.38,.25,.18,1.18);o(.27,.27,.5,1.52);const hole=M(0x2a1a10,{emissive:0xffa040,emissiveIntensity:.25});for(let i=0;i<4;i++){const w=box(.16,.28,.02,hole);const a=i*Math.PI/2;w.position.set(Math.sin(a)*.27,1.53,Math.cos(a)*.27);w.rotation.y=a;g.add(w)}const rf=new THREE.Mesh(new THREE.CylinderGeometry(.12,.6,.26,8),stm);rf.position.y=1.9;rf.castShadow=true;g.add(rf);o(.06,.1,.22,2.12);SOL.push({cx:x,cz:z,r:.55,y0:-9,y1:gy+2.3})};
 const jang=(x,z)=>{if(hit(x,z,2.4))return false;const base=box(4,.3,3,stm);base.position.set(x,gy+.15,z);G.add(base);const jm=M(0x4a2a1a,{roughness:.3});for(let i=0;i<8;i++){const s=.3+r()*.13;/* 장독끼리 파고들지 않게(간격 0.95m) */const j=new THREE.Mesh(new THREE.SphereGeometry(s,14,10),jm);j.scale.y=1.12;j.position.set(x-1.4+(i%4)*.95,gy+.3+s*1.05,z-.7+Math.floor(i/4)*1.3);j.castShadow=true;G.add(j);const lid=new THREE.Mesh(new THREE.CylinderGeometry(s*.55,s*.6,.08,12),jm);lid.position.set(j.position.x,j.position.y+s*1.1,j.position.z);G.add(lid)}SOL.push({x0:x-2,x1:x+2,y0:-9,y1:gy+1.6,z0:z-1.5,z1:z+1.5});return true};
 const pyeong=(x,z)=>{if(hit(x,z,1.8))return false;const wd=M(0x8a6a44,{roughness:.8});const top=box(2.4,.12,1.6,wd);top.position.set(x,gy+.55,z);G.add(top);for(const sx of[-1,1])for(const sz of[-1,1]){const l=box(.12,.5,.12,wd);l.position.set(x+sx*1.05,gy+.25,z+sz*.65);G.add(l)}const mat=box(1.2,.03,.8,M(0xc8b080));mat.position.set(x+.4,gy+.63,z);G.add(mat);SOL.push({x0:x-1.2,x1:x+1.2,y0:-9,y1:gy+.6,z0:z-.8,z1:z+.8});return true};
 const basin=(x,z)=>{if(hit(x,z,.8))return;const b=new THREE.Mesh(new THREE.CylinderGeometry(.55,.5,.5,14),stm);b.position.set(x,gy+.25,z);b.castShadow=true;G.add(b);const w=new THREE.Mesh(new THREE.CircleGeometry(.44,16).rotateX(-Math.PI/2),M(0x5f8fa0,{roughness:.1,metalness:.2}));w.position.set(x,gy+.49,z);G.add(w);SOL.push({cx:x,cz:z,r:.55,y0:-9,y1:gy+.5})};
 if(C.wall!=='none'&&C.wall!=='fort'){if(GW>0){lantern(gx-GW/2-1.2,C.z1-3.2);lantern(gx+GW/2+1.2,C.z1-3.2)}
  /* 담 안 네 모서리 근처에 하나씩 */const cs=[[C.x0+3.2,C.z0+3.2],[C.x1-3.2,C.z0+3.2],[C.x0+3.2,C.z1-4],[C.x1-3.2,C.z1-4]];const kinds=[jang,pyeong,jang,pyeong];cs.forEach(([x,z],i)=>{for(let t=0;t<6;t++){const dx=(x<0?1:-1)*t*1.5,dz=(z<0?1:-1)*t*1.2;if(kinds[(i+SITE.length)%4](x+dx,z+dz))break}});basin(C.x1-2.2,C.z1-8)}
 /* ---------- 바위와 돌무더기(담 밖) ---------- */
 {const rm=M(0x8d877c,{roughness:1,flatShading:true});const N=40;const im=new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1,0),rm,N);const o=new THREE.Object3D();let k=0;for(let t=0;t<N*8&&k<N;t++){const x=(r()-.5)*220,z=(r()-.5)*220;if(inC(x,z,6)||EV.treeAvoid&&EV.treeAvoid(x,z)||hit(x,z,2)||EV.baseAt&&EV.baseAt(x,z)<-.2)continue;const s=.5+r()*1.4;o.position.set(x,gy+s*.25,z);o.rotation.set(r()*3,r()*3,r()*3);o.scale.set(s*1.3,s*.6,s);o.updateMatrix();im.setMatrixAt(k++,o.matrix);if(s>1)SOL.push({cx:x,cz:z,r:s,y0:-9,y1:gy+s*.6})}im.count=k;im.castShadow=im.receiveShadow=true;G.add(im)}
 /* ---------- 풀포기와 들꽃 ---------- */
 {const GT=tex(64,64,(q,w,h)=>{q.clearRect(0,0,w,h);for(let i=0;i<14;i++){const x=6+r()*52;q.strokeStyle=['#5f8a3a','#6f9a44','#4f7a32','#86a84e'][i%4];q.lineWidth=2.4;q.beginPath();q.moveTo(x,h);q.quadraticCurveTo(x+(r()-.5)*14,h*.5,x+(r()-.5)*22,4+r()*20);q.stroke()}});
  const gm=new THREE.MeshStandardMaterial({map:GT,transparent:true,alphaTest:.45,side:THREE.DoubleSide,roughness:1});const pg=new THREE.PlaneGeometry(.9,.6);pg.translate(0,.3,0);const g2=pg.clone().rotateY(Math.PI/2);const geo=new THREE.BufferGeometry();
  {const a=pg.toNonIndexed(),b=g2.toNonIndexed();const pos=new Float32Array([...a.attributes.position.array,...b.attributes.position.array]),uv=new Float32Array([...a.attributes.uv.array,...b.attributes.uv.array]),nm=new Float32Array([...a.attributes.normal.array,...b.attributes.normal.array]);geo.setAttribute('position',new THREE.BufferAttribute(pos,3));geo.setAttribute('uv',new THREE.BufferAttribute(uv,2));geo.setAttribute('normal',new THREE.BufferAttribute(nm,3))}
  const N=TOUCH?1400:2600;const im=new THREE.InstancedMesh(geo,gm,N);const o=new THREE.Object3D();let k=0;
  for(let t=0;t<N*4&&k<N;t++){const near=t%3!==0;const x=near?(C.x0+C.x1)/2+(r()-.5)*(C.x1-C.x0+50):(r()-.5)*240,z=near?(C.z0+C.z1)/2+(r()-.5)*(C.z1-C.z0+50):(r()-.5)*240;if(inC(x,z,.4))continue;if(hit(x,z,.4))continue;if(EV.sea&&z>130)continue;if(EV.baseAt&&EV.baseAt(x,z)<-.2)continue;/* 물·구덩이 자리는 건너뜀 */const s=.7+r()*.9;o.position.set(x,gy,z);o.rotation.set(0,r()*6,0);o.scale.set(s,s*(.8+r()*.6),s);o.updateMatrix();im.setMatrixAt(k++,o.matrix)}
  /* 담 밑 안쪽 띠에도 조금 */if(C.wall!=='none'){for(let t=0;t<600&&k<N;t++){const side=(r()*4)|0;const x=side<2?C.x0+.8+r()*(C.x1-C.x0-1.6):side===2?C.x0+.8+r()*.8:C.x1-.8-r()*.8,z=side===0?C.z0+.8+r()*.9:side===1?C.z1-.8-r()*.9:C.z0+r()*(C.z1-C.z0);if(hit(x,z,.3)||Math.abs(x-gx)<GW/2+1&&z>C.z1-2)continue;o.position.set(x,gy,z);o.rotation.set(0,r()*6,0);const s=.5+r()*.6;o.scale.set(s,s,s);o.updateMatrix();im.setMatrixAt(k++,o.matrix)}}
  im.count=k;G.add(im);
  const FC=[0xf2d03a,0xf6f2e8,0xe86a8a,0xb88ad8,0xf08a3a];const fm=new THREE.MeshStandardMaterial({roughness:.8});const NF=TOUCH?300:600;const fl=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.09,0),fm,NF);let kf=0;const col=new THREE.Color();
  for(let t=0;t<NF*4&&kf<NF;t++){const x=(C.x0+C.x1)/2+(r()-.5)*(C.x1-C.x0+60),z=(C.z0+C.z1)/2+(r()-.5)*(C.z1-C.z0+60);if(inC(x,z,.5)||hit(x,z,.3)||EV.sea&&z>130)continue;const cx=x,cz=z;const n=3+((r()*4)|0);for(let j=0;j<n&&kf<NF;j++){o.position.set(cx+(r()-.5)*1.2,gy+.35+r()*.2,cz+(r()-.5)*1.2);o.scale.setScalar(1);o.rotation.set(0,0,0);o.updateMatrix();fl.setMatrixAt(kf,o.matrix);fl.setColorAt(kf++,col.setHex(FC[(r()*FC.length)|0]))}}fl.count=kf;G.add(fl)}
 /* ---------- 마당 둘레 나무: 넓은 마당이 휑하지 않게 담 안쪽을 따라 ---------- */
 if(!['gyeongju','sungnyemun','hanyang','seokguram','geobukseon','suwon','worldmap','village'].includes(SITE)&&C.wall!=='none'||SITE==='naju'){const TL=[],GP=[0x4f7f3a,0x5f8c40,0x6a9446,0x7a9a48,0xd8a040],gxx=C.gx||0,GWW=C.gate||0,ins=2.8,step=8.5,sh=(x,z,r)=>SP.some(t=>Math.hypot(x-t.x,z-t.z)<(t.r||1.5)+r);
  const tryT=(x,z)=>{if(hit(x,z,1.6)||sh(x,z,2.2))return;if(Math.abs(x-gxx)<GWW/2+5&&z>C.z1-9)return;TL.push([x,gy,z,r()*6,.95+r()*.35,GP[(r()*GP.length)|0]]);SOL.push({cx:x,cz:z,r:.45,y0:-9,y1:gy+6})};
  for(let x=C.x0+ins;x<=C.x1-ins;x+=step){tryT(x+(r()-.5)*2,C.z0+ins);tryT(x+(r()-.5)*2,C.z1-ins)}for(let z=C.z0+ins+step;z<=C.z1-ins-step;z+=step){tryT(C.x0+ins,z+(r()-.5)*2);tryT(C.x1-ins,z+(r()-.5)*2)}
  if(TL.length)plantBroad(G,TL)}
 /* ---------- 가까운 뒷산: 마당 뒤를 감싸는 숲 언덕 ---------- */
 if(!EV.noHills&&!C.noHills){const hz=C.z0-28,W=C.x1-C.x0;const hm=[0x4f7a44,0x5a8450,0x456d3c];const tr=paintedPines(500),pc=new THREE.Color();const o=new THREE.Object3D();let k=0;
  for(let i=0;i<7;i++){const x=C.x0-40+i*(W+80)/6+(r()-.5)*10,z=hz-r()*25,rr=26+r()*16,h=12+r()*12;const m=lumpyHill(rr,h,hm[i%3],i+1);m.position.set(x,gy-1,z);m.receiveShadow=true;G.add(m);
   for(let j=0;j<70&&k<500;j++){const a=r()*Math.PI*2,d=Math.sqrt(r())*rr*.92;const tx=x+Math.cos(a)*d,tz=z+Math.sin(a)*d;const ty=gy-1+h*Math.sqrt(Math.max(0,1-(d/rr)**2));const s=2.2+r()*1.8;o.position.set(tx,ty-.5,tz);o.rotation.set(0,r()*6,0);o.scale.set(s*2.1,s*1.5,s*2.1);o.updateMatrix();tr.setColorAt(k,pc.setHSL(.27+r()*.06,.35+r()*.15,.55+r()*.25));tr.setMatrixAt(k++,o.matrix)}}
  tr.count=k;tr.castShadow=false;G.add(tr)}
 return G}
