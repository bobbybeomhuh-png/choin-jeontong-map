/* 고려 목조건축 두 곳: 영주 부석사 무량수전, 예산 수덕사 대웅전. 단위 1 = 1m, 입구 +z.
   갱신 2026-11-12. 공개 실측 3D가 없어 공개 수치로 본떠 지음(배흘림기둥, 주심포, 무량수전 팔작지붕 정면 5칸 측면 3칸, 수덕사 대웅전 맞배지붕 정면 3칸 측면 4칸).
   실물 사진(위키미디어 공용): 무량수전 Bernard Gagnon(CC0)·Cho Park(CC BY-SA 4.0), 소조여래좌상 tristanskye(CC BY 2.0), 석등 Jjw(CC BY-SA 3.0), 수덕사 대웅전 Jjw(CC BY 4.0). */
import * as THREE from 'three';
import {tex,noise,mulb,materials,hipRoof} from './sungnyemun.js';
const T=k=>new URL('../textures/goryeo/'+k+'.jpg',import.meta.url).href;
function kit(seed,mini){const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(seed);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
 const TL=new THREE.TextureLoader();
 /* 사진 액자(받침대 위, 실물 사진임을 밝힘) */function photo(k,w,h,x,y,z,ry,cap){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry;G.add(g);g.add(box(w+.16,h+.16,.06,M(0x2a1a10)));const m=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.8});if(!mini)TL.load(T(k),t=>{t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;m.map=t;m.needsUpdate=true});const p=new THREE.Mesh(new THREE.PlaneGeometry(w,h),m);p.position.z=.035;g.add(p);
  if(cap){const cv=document.createElement('canvas');cv.width=512;cv.height=64;const q=cv.getContext('2d');q.fillStyle='#f3ead6';q.fillRect(0,0,512,64);q.fillStyle='#2b1d12';q.font='bold 26px "Gowun Dodum",sans-serif';q.textAlign='center';q.fillText(cap,256,42,496);const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;const lb=new THREE.Mesh(new THREE.PlaneGeometry(Math.min(w,2.4),.3),new THREE.MeshBasicMaterial({map:t}));lb.position.set(0,-h/2-.28,.04);g.add(lb)}return g}
 /* 배흘림기둥: 아래 1/3에서 가장 굵고 위아래로 가늘어짐 */function column(h,rMax){const pts=[];for(let i=0;i<=12;i++){const t=i/12;const k=t<.33?1-(.33-t)*.12:1-(t-.33)/(.67)*.22;pts.push(new THREE.Vector2(rMax*k,t*h))}return new THREE.LatheGeometry(pts,14)}
 /* 고려 목조 법당 하나 */function hall({x=0,z=0,nx,nz,W,D,PH,FY,roof,name,open=true}){const g=new THREE.Group();g.position.set(x,0,z);G.add(g);const pil=M(0x8a6a4a),wall=M(0xf0e6c8),red=M(0x8a3a2a),grn=M(0x3f7a64),stn=M(0xb3aa98);
  const base=box(W+2.4,FY,D+2.4,stn);base.position.y=FY/2;g.add(base);S(x-W/2-1.2,x+W/2+1.2,0,FY,z-D/2-1.2,z+D/2+1.2);
  for(let i=0;i<3;i++){const st=box(4,FY*(i+1)/3,.42,stn);st.position.set(0,FY*(i+1)/6,D/2+1.2+(2-i)*.42+.21);g.add(st);S(x-2,x+2,0,FY*(i+1)/3,z+D/2+1.2+(2-i)*.42,z+D/2+1.2+(3-i)*.42)}
  const fl=box(W,.06,D,M(0x7a5a3a));fl.position.y=FY+.03;g.add(fl);
  const XS=[...Array(nx+1)].map((_,i)=>-W/2+i*W/nx),ZS=[...Array(nz+1)].map((_,i)=>-D/2+i*D/nz);const cg=column(PH,.32);
  for(const cx of XS)for(const cz of ZS){const edge=Math.abs(cx)>W/2-.1||Math.abs(cz)>D/2-.1;if(!edge&&Math.abs(cz)<D/2-D/nz+.1)continue;const c=new THREE.Mesh(cg,pil);c.position.set(cx,FY,cz);c.castShadow=true;g.add(c);solids.push({cx:x+cx,cz:z+cz,r:.36,y0:0,y1:9});
   /* 주심포: 기둥 위에만 공포 */if(edge){const b1=box(.7,.2,.7,grn);b1.position.set(cx,FY+PH+.1,cz);g.add(b1);const b2=box(1.3,.2,.4,red);b2.position.set(cx,FY+PH+.3,cz);if(Math.abs(cz)>D/2-.1)b2.rotation.y=0;else b2.rotation.y=Math.PI/2;g.add(b2);const b3=box(.5,.22,.5,grn);b3.position.set(cx,FY+PH+.5,cz);g.add(b3)}}
  /* 창방·평방 */for(const sz of[-1,1]){const bm=box(W+.4,.34,.3,red);bm.position.set(0,FY+PH-.1,sz*D/2);g.add(bm)}for(const sx of[-1,1]){const bm=box(.3,.34,D+.4,red);bm.position.set(sx*W/2,FY+PH-.1,0);g.add(bm)}
  /* 벽: 뒤와 옆은 흙벽, 앞은 가운데 칸 열고 나머지 문살 */const lat=tex(128,128,(q,w,h)=>{q.fillStyle='#e9dcc0';q.fillRect(0,0,w,h);q.strokeStyle='#7a5634';q.lineWidth=5;for(let i=0;i<=w;i+=18){q.beginPath();q.moveTo(i,0);q.lineTo(i,h);q.stroke()}for(let i=0;i<=h;i+=32){q.beginPath();q.moveTo(0,i);q.lineTo(w,i);q.stroke()}});const latM=new THREE.MeshStandardMaterial({map:lat,roughness:.9});
  const bk=box(W,PH-.3,.18,wall);bk.position.set(0,FY+(PH-.3)/2,-D/2);g.add(bk);S(x-W/2,x+W/2,0,9,z-D/2-.15,z-D/2+.15);for(const sx of[-1,1]){const sw=box(.18,PH-.3,D,wall);sw.position.set(sx*W/2,FY+(PH-.3)/2,0);g.add(sw);S(x+sx*W/2-.15,x+sx*W/2+.15,0,9,z-D/2,z+D/2)}
  const mid=Math.floor(nx/2);for(let i=0;i<nx;i++){if(i===mid)continue;const cx=-W/2+(i+.5)*W/nx;const dp=new THREE.Mesh(new THREE.PlaneGeometry(W/nx-.5,PH-.5),latM);dp.position.set(cx,FY+(PH-.5)/2,D/2-.05);g.add(dp);const db=box(W/nx-.5,PH-.5,.1,wall);db.position.set(cx,FY+(PH-.5)/2,D/2-.13);g.add(db);S(x+cx-W/nx/2,x+cx+W/nx/2,0,9,z+D/2-.2,z+D/2)}
  /* 지붕 */if(!mini){if(roof==='hip'){const rf=hipRoof(MT,W/2+2.2,D/2+2.2,W/2-1.6,FY+PH+.6,FY+PH+4.6,.9,.35,{plain:true,rs:.7});rf.traverse(o=>{if(o.isMesh)o.castShadow=true});g.add(rf)}
   else{/* 맞배: 두 경사면 + 용마루, 옆은 박공만 1m 내밈 */const y0=FY+PH+.45,y1=FY+PH+4.4,ez=D/2+2.2,sl=Math.hypot(ez,y1-y0),ang=Math.atan2(y1-y0,ez);for(const sz of[-1,1]){const pl=new THREE.Mesh(new THREE.BoxGeometry(W+2.2,.18,sl),MT.tile);pl.position.set(0,(y0+y1)/2,sz*ez/2);pl.rotation.x=sz*ang;pl.castShadow=true;g.add(pl);const un=new THREE.Mesh(new THREE.PlaneGeometry(W+2.2,sl),MT.raft);un.position.set(0,(y0+y1)/2-.12,sz*ez/2);un.rotation.x=sz*ang-Math.PI/2;g.add(un)}
    const rd=box(W+2.4,.4,.5,MT.ridgeDk);rd.position.set(0,y1+.15,0);g.add(rd);for(const sx of[-1,1]){const bg=box(.12,.45,sl*1.02,M(0x6b4a2e));for(const sz of[-1,1]){const b2=bg.clone();b2.position.set(sx*(W/2+1.1),(y0+y1)/2+.05,sz*ez/2);b2.rotation.x=sz*ang;g.add(b2)}}
    /* 맞배 옆면: 드러난 가구(대들보·동자주·우미량) */for(const sx of[-1,1]){const gx=sx*(W/2+.02);const tri=new THREE.Shape();tri.moveTo(-D/2-.2,0);tri.lineTo(D/2+.2,0);tri.lineTo(0,3.9);tri.closePath();const tm=new THREE.Mesh(new THREE.ShapeGeometry(tri),M(0xf0e6c8,{side:THREE.DoubleSide}));tm.rotation.y=Math.PI/2;tm.position.set(gx,FY+PH+.5,0);g.add(tm);
     const beam=(y,len,zc=0)=>{const b=box(.22,.32,len,red);b.position.set(gx+sx*.06,FY+PH+y,zc);g.add(b)};beam(.6,D+.4);beam(1.9,D*.62);beam(3,D*.28);
     for(const zz of[-D*.31,D*.31,-D*.14,D*.14]){const p=box(.24,Math.abs(zz)>D*.2?1.3:1.1,.24,pil);p.position.set(gx+sx*.06,FY+PH+(Math.abs(zz)>D*.2?1.25:2.45),zz);g.add(p)}
     for(const s2 of[-1,1]){const cu=new THREE.Mesh(new THREE.TorusGeometry(D*.22,.09,6,16,Math.PI*.55),red);cu.rotation.y=Math.PI/2;cu.position.set(gx+sx*.06,FY+PH+.75,s2*D*.36);cu.rotation.z=s2>0?Math.PI*.05:Math.PI*.4;g.add(cu)}}}}
  /* 현판 */{const cv=document.createElement('canvas');cv.width=640;cv.height=170;const q=cv.getContext('2d');q.fillStyle='#2a1a10';q.fillRect(0,0,640,170);q.strokeStyle='#d8a838';q.lineWidth=10;q.strokeRect(6,6,628,158);q.fillStyle='#f2d27a';q.textAlign='center';q.font='bold 96px "Noto Serif KR",serif';q.fillText(name,320,120,600);const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;const pl=new THREE.Mesh(new THREE.PlaneGeometry(2.4,.65),new THREE.MeshBasicMaterial({map:t}));pl.position.set(0,FY+PH-.6,D/2+.2);g.add(pl)}
  const lp=new THREE.PointLight(0xffe8c8,10,16,1.5);lp.position.set(0,FY+PH-.5,0);g.add(lp);return g}
 /* 먼 산줄기(겹겹이) */function ridges(z0,cols){if(mini)return;cols.forEach((c,i)=>{const pts=[];for(let k=0;k<=40;k++){const x=-260+k*13;pts.push(new THREE.Vector2(x,8+Math.sin(k*.7+i*2)*5+Math.sin(k*.23+i)*7+i*5))}pts.push(new THREE.Vector2(260,-20),new THREE.Vector2(-260,-20));const m=new THREE.Mesh(new THREE.ShapeGeometry(new THREE.Shape(pts)),new THREE.MeshBasicMaterial({color:c,fog:true}));m.position.set(0,-6,z0-i*40);G.add(m)})}
 /* 석등(8각, 연꽃 받침·화사석 4창·지붕돌) */function lantern(x,z,s=1){const g=new THREE.Group();g.position.set(x,0,z);g.scale.setScalar(s);G.add(g);const st=M(0xa8a196,{roughness:.95});const oct=(r1,r2,h,y)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,8),st);m.position.y=y;m.castShadow=true;g.add(m);return m};
  oct(.9,.95,.3,.15);oct(.62,.8,.35,.47);oct(.5,.62,.2,.75);oct(.18,.18,1.1,1.4);oct(.62,.4,.3,2.05);oct(.5,.5,.12,2.26);const fire=oct(.42,.42,.9,2.77);const hole=M(0x1d1610);for(let i=0;i<4;i++){const w=box(.26,.5,.02,hole);const a=i*Math.PI/2+Math.PI/8;w.position.set(Math.sin(a)*.41,2.8,Math.cos(a)*.41);w.rotation.y=a;g.add(w)}
  const roofS=new THREE.Mesh(new THREE.CylinderGeometry(.25,.95,.38,8),st);roofS.position.y=3.41;roofS.castShadow=true;g.add(roofS);oct(.12,.2,.35,3.77);solids.push({cx:x,cz:z,r:.95*s,y0:0,y1:4*s});return g}
 return {MT,G,solids,cam,spots,r,S,M,box,photo,hall,ridges,lantern}}
/* ---------------- 영주 부석사 무량수전 ---------------- */
export function buildYeongju(opts={}){const mini=!!opts.mini;const K=kit(19,mini);const {G,solids,cam,spots,S,M,box,photo}=K;
 /* 땅: 높은 석축 위 마당(돌계단으로 오름) */{const PT=tex(256,256,(q,w,h)=>{q.fillStyle='#c4b08a';q.fillRect(0,0,w,h);noise(q,w,h,6000,['rgba(0,0,0,.07)','rgba(255,255,255,.08)'],2)});PT.wrapS=PT.wrapT=THREE.RepeatWrapping;PT.repeat.set(8,6);const yd=new THREE.Mesh(new THREE.PlaneGeometry(50,36),new THREE.MeshStandardMaterial({map:PT,roughness:1}));yd.rotation.x=-Math.PI/2;yd.position.set(0,.02,-2);yd.receiveShadow=true;G.add(yd)}
 const W=18.8,D=11.6,HZ=-10;K.hall({x:0,z:HZ,nx:5,nz:3,W,D,PH:4.6,FY:1.2,roof:'hip',name:'無量壽殿'});
 /* 안: 서쪽에 동쪽을 바라보는 불단 + 실물 사진 */{const FY=1.2;const dan=box(3,1,3.4,M(0x8a3a2a));dan.position.set(-W/2+2.4,FY+.5,HZ);G.add(dan);S(-W/2+.9,-W/2+3.9,0,FY+1,HZ-1.7,HZ+1.7);photo('mrb',1.6,2.4,-W/2+2.4,FY+2.4,HZ,Math.PI/2,'실물: 소조여래좌상(국보) 사진');
  spots.push({x:-W/2+5.6,y:FY,z:HZ,r:2.4,t:'소조여래좌상',h:'흙으로 빚어 금을 입힌 고려 불상(국보)이에요. 다른 법당과 달리 건물 서쪽에 앉아 동쪽을 바라봐요. 서방 극락정토의 아미타불을 모신 뜻이라고 해요. 높이는 약 2.8m예요. (사진: tristanskye, CC BY 2.0)'})}
 spots.push({x:0,y:0,z:HZ+D/2+4,r:3,t:'무량수전',h:'고려 1376년에 다시 지은 기록이 남은 아주 오래된 목조 법당이에요(국보). 정면 5칸, 측면 3칸에 팔작지붕을 얹었어요. 꾸밈을 줄이고 비례로 아름다움을 낸 고려 건축의 대표예요. (본떠 지음)'});
 spots.push({x:W/2-.3,y:0,z:HZ+D/2+2,r:2.2,t:'배흘림기둥',h:'기둥 아래 3분의 1쯤이 가장 굵고 위아래로 살짝 가늘어져요. 멀리서 볼 때 기둥 가운데가 가늘어 보이는 착시를 바로잡고, 안정감을 줘요. 무량수전 배흘림기둥은 우리나라에서 가장 이름난 기둥이에요.'});
 spots.push({x:-W/2+1,y:0,z:HZ+D/2+2,r:2.2,t:'주심포',h:'지붕 무게를 받치는 나무 짜임(공포)을 기둥 위에만 올린 방식이에요. 공포가 기둥 사이에도 있는 다포식보다 단정하고 힘 있어 보여요. 고려 건축의 특징이에요.'});
 /* 석등(국보) */K.lantern(0,HZ+D/2+6,1);photo('mrl',1.4,1.87,4.4,1.7,HZ+D/2+7,-.5,'실물: 무량수전 앞 석등 사진');
 spots.push({x:0,y:0,z:HZ+D/2+8.4,r:2.2,t:'석등',h:'무량수전 앞마당 가운데의 통일신라 석등(국보)이에요. 8각 받침에 연꽃을 새기고, 불을 넣는 화사석 네 면에 보살을 새겼어요. 비례가 아름다워 한국 석등 가운데 으뜸으로 꼽혀요. (본떠 지음, 옆 액자는 Jjw 사진 CC BY-SA 3.0)'});
 /* 안양루 쪽 전망대와 소백산 줄기 */{const tz=14;const deck=box(10,.5,4,M(0xb3aa98));deck.position.set(0,.25,tz);G.add(deck);S(-5,5,0,.5,tz-2,tz+2);for(const sx of[-1,1]){const rail=box(.1,.9,4,M(0x6b4a2e));rail.position.set(sx*5,.95,tz);G.add(rail)}const rf=box(10,.1,.1,M(0x6b4a2e));rf.position.set(0,1.4,tz+2);G.add(rf);S(-5,5,0,1.5,tz+1.9,tz+2.1);
  photo('mr1',2.4,1.37,6.4,1.6,tz-1,-.6,'실물: 부석사 안양루 쪽 사진(Bernard Gagnon, CC0)');photo('mr2',2,1.5,-6.4,1.6,tz-1,.6,'실물: 무량수전 처마 아래(Cho Park, CC BY-SA 4.0)');
  spots.push({x:0,y:.5,z:tz,r:2.6,t:'소백산 전망',h:'부석사는 봉황산 비탈에 계단처럼 자리 잡아, 무량수전 앞에서 돌아보면 소백산 줄기가 겹겹이 물결쳐요. 이 풍경까지 건축의 일부로 끌어들였다고 해서 한국 건축의 백미로 꼽혀요.'})}
 K.ridges(-60,[0x7d95a8,0x95a9b8,0xadbcc8].reverse());{const fr=new THREE.Group();G.add(fr)}
 /* 앞쪽 먼 산(전망대 너머) */if(!mini){[0x6f8aa0,0x88a0b4,0xa3b6c6].forEach((c,i)=>{const pts=[];for(let k=0;k<=40;k++)pts.push(new THREE.Vector2(-260+k*13,6+Math.sin(k*.6+i)*5+Math.sin(k*.21+i*3)*6+i*4));pts.push(new THREE.Vector2(260,-20),new THREE.Vector2(-260,-20));const m=new THREE.Mesh(new THREE.ShapeGeometry(new THREE.Shape(pts)),new THREE.MeshBasicMaterial({color:c,side:THREE.DoubleSide}));m.position.set(0,-2+i*3,80+i*40);m.scale.y=1.6;m.rotation.y=Math.PI;G.add(m)})}
 const meta={quest:{t:'무량수전 고려 건축 산책',d:'고려 건축의 멋을 여섯 곳에서 찾아 보세요.',steps:[['석등','석등'],['무량수전','무량수전'],['배흘림기둥','배흘림기둥'],['주심포','주심포'],['소조여래좌상','소조여래좌상'],['소백산 전망','소백산 전망']],done:'무량수전 산책을 마쳤어요. 배흘림기둥에 기대 소백산을 바라본 옛사람의 마음을 떠올려 보세요.'},
  title:'영주 부석사 무량수전',video:'buseok',hint:'고려 목조건축의 대표, 부석사 무량수전을 공개 수치로 본떠 지은 곳이에요. 석등, 배흘림기둥, 주심포, 서쪽에 앉은 불상(실물 사진), 소백산 전망을 찾아 보세요.',
  env:{plaza:null,beds:false,trees:true,sign:{x:5,z:20,lines:['영주 부석사 무량수전','배흘림기둥 · 주심포 · 팔작지붕','석등(국보) · 소조여래좌상','소백산이 보이는 마당']},treeAvoid:(x,z)=>Math.abs(x)<26&&z<24&&z>-24},
  npc:[['carpenter',[[-6,0,4],[6,0,4]]]],
  level:P=>Math.abs(P.x)<W/2&&Math.abs(P.z-HZ)<D/2?'무량수전 안':P.z>11?'안양루 전망대':'무량수전 앞마당',
  camCap:P=>Math.abs(P.x)<W/2&&Math.abs(P.z-HZ)<D/2?3.4:Infinity,
  mini:{S:4,ox:0,oz:-2,draw(g,X,Z,S){g.fillStyle='#7aa04e';g.fillRect(0,0,300,300);g.fillStyle='#c4b08a';g.fillRect(X(-25),Z(-20),50*S,36*S);g.fillStyle='#8a6a4a';g.fillRect(X(-W/2),Z(HZ-D/2),W*S,D*S);g.fillStyle='#b3aa98';g.fillRect(X(-5),Z(12),10*S,4*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:9,yaw:Math.PI},size:{}},meta)}
/* ---------------- 예산 수덕사 대웅전 ---------------- */
export function buildYesan(opts={}){const mini=!!opts.mini;const K=kit(23,mini);const {G,solids,cam,spots,S,M,box,photo}=K;
 {const PT=tex(256,256,(q,w,h)=>{q.fillStyle='#c9b994';q.fillRect(0,0,w,h);noise(q,w,h,6000,['rgba(0,0,0,.07)','rgba(255,255,255,.08)'],2)});PT.wrapS=PT.wrapT=THREE.RepeatWrapping;PT.repeat.set(8,6);const yd=new THREE.Mesh(new THREE.PlaneGeometry(48,36),new THREE.MeshStandardMaterial({map:PT,roughness:1}));yd.rotation.x=-Math.PI/2;yd.position.set(0,.02,-2);yd.receiveShadow=true;G.add(yd)}
 const W=15.7,D=10.7,HZ=-8;K.hall({x:0,z:HZ,nx:3,nz:4,W,D,PH:4.8,FY:1.1,roof:'gable',name:'大雄殿'});
 /* 삼층석탑(마당) */{const st=M(0xa8a196,{roughness:.95});const g=new THREE.Group();g.position.set(-7,0,6);G.add(g);let y=0;for(const [w,h] of[[3.2,.5],[2.8,.6],[1.9,1.1],[2.4,.35],[1.6,.8],[2.1,.32],[1.3,.6],[1.8,.3]]){const b=box(w,h,w,st);b.position.y=y+h/2;g.add(b);y+=h}const pin=new THREE.Mesh(new THREE.CylinderGeometry(.06,.1,1.2,8),M(0x6a6258));pin.position.y=y+.6;g.add(pin);solids.push({cx:-7,cz:6,r:1.7,y0:0,y1:6})}
 /* 실물 사진 세 장(마당 안내판) */{const PX=8,PZ=6;photo('sd3',2.6,1.7,PX-1.6,1.8,PZ,-.35,'실물: 수덕사 대웅전 정면(Jjw, CC BY 4.0)');photo('sd2',2.6,1.49,PX+1.6,1.8,PZ+.6,-.6,'실물: 맞배 옆면 가구(Jjw, CC BY 4.0)');for(const dx of[-1.6,1.6]){const p=box(.12,1.4,.12,M(0x3b2414));p.position.set(PX+dx,.7,PZ+(dx>0?.6:0));G.add(p)}S(PX-3,PX+3,0,2.6,PZ-.4,PZ+1)}
 spots.push({x:0,y:0,z:HZ+D/2+4,r:3,t:'대웅전',h:'1308년에 지었다는 먹 글씨(묵서명)가 나와, 지은 해를 정확히 아는 가장 오래된 목조건축 가운데 하나예요(국보). 정면 3칸, 측면 4칸에 맞배지붕을 얹었어요. (본떠 지음)'});
 spots.push({x:W/2+2.6,y:0,z:HZ,r:2.6,t:'맞배 옆면',h:'옆에서 보면 지붕이 사람 인(人) 자처럼 맞붙고, 벽에 기둥과 들보, 굽은 소꼬리 모양 들보(우미량)가 그대로 드러나요. 이 나무 짜임의 선이 수덕사 대웅전의 가장 큰 아름다움이에요.'});
 spots.push({x:-W/2+.2,y:0,z:HZ+D/2+2,r:2.2,t:'배흘림기둥',h:'수덕사 대웅전도 아래쪽이 불룩한 배흘림기둥을 썼어요. 무량수전과 함께 고려 주심포 건축의 짝으로 꼽혀요.'});
 spots.push({x:-7,y:0,z:8.4,r:2,t:'삼층석탑',h:'대웅전 앞마당의 고려 삼층석탑이에요. 법당과 탑이 한 줄로 서서 절의 중심을 이뤄요. (본떠 지음)'});
 spots.push({x:8,y:0,z:8.4,r:2,t:'실물 사진',h:'왼쪽은 정면, 오른쪽은 옆면 가구를 찍은 실제 사진이에요. 지은 공간과 사진을 나란히 놓고 비교해 보세요. (사진: Jjw, CC BY 4.0)'});
 K.ridges(-70,[0x7d95a8,0x95a9b8,0xadbcc8].reverse());
 const meta={quest:{t:'수덕사 대웅전 산책',d:'700년 넘은 법당의 멋을 다섯 곳에서 찾아 보세요.',steps:[['삼층석탑','삼층석탑'],['대웅전','대웅전'],['맞배 옆면','맞배 옆면'],['배흘림기둥','배흘림기둥'],['실물 사진','실물 사진']],done:'수덕사 대웅전 산책을 마쳤어요. 꼭 옆으로 돌아가 맞배 옆면의 나무 선을 다시 보세요.'},
  title:'예산 수덕사 대웅전',short:'s011',hint:'1308년에 지은 기록이 남은 수덕사 대웅전을 공개 수치로 본떠 지은 곳이에요. 옆으로 돌아가 맞배지붕 옆면의 드러난 나무 짜임을 꼭 보세요. 마당에 실물 사진도 있어요.',
  env:{plaza:null,beds:false,trees:true,sign:{x:4,z:18,lines:['예산 수덕사 대웅전','1308년 · 맞배지붕','정면 3칸 · 측면 4칸','옆면 나무 짜임이 멋']},treeAvoid:(x,z)=>Math.abs(x)<24&&z<22&&z>-22},
  npc:[['carpenter',[[-5,0,4],[5,0,4]]]],
  level:P=>Math.abs(P.x)<W/2&&Math.abs(P.z-HZ)<D/2?'대웅전 안':'대웅전 앞마당',
  camCap:P=>Math.abs(P.x)<W/2&&Math.abs(P.z-HZ)<D/2?3.4:Infinity,
  mini:{S:4.4,ox:0,oz:-2,draw(g,X,Z,S){g.fillStyle='#7aa04e';g.fillRect(0,0,300,300);g.fillStyle='#c9b994';g.fillRect(X(-24),Z(-20),48*S,36*S);g.fillStyle='#8a6a4a';g.fillRect(X(-W/2),Z(HZ-D/2),W*S,D*S);g.fillStyle='#a8a196';g.fillRect(X(-8.6),Z(4.4),3.2*S,3.2*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:16,yaw:Math.PI},size:{}},meta)}
