/* 자세한 한옥 짓기 부품: 기단·주춧돌·배흘림기둥·창방·공포·칸 채움(분합문·창·회벽)·마루·계자난간·지붕·서까래·현판.
   코드로 짓는 큰 건물(법당·누각·관아)을 이 부품 하나로 같은 수준으로 맞춘다. 갱신 2026-11-14
   좌표: 건물 가운데 (0,0), 앞이 +z. spec.ry는 0, π, ±π/2만. */
import * as THREE from 'three';
import {tex,materials,hipRoof,brackets,rafters} from './sungnyemun.js';
let _K=null;function kitMats(){if(_K)return _K;const MT=materials();
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.85},o));
 /* 띠살문: 세로 살 촘촘, 위·가운데·아래에 가로 띠 */
 const DOOR=tex(128,512,(q,w,h)=>{q.fillStyle='#efe6cf';q.fillRect(0,0,w,h);q.strokeStyle='#6a4024';q.lineWidth=12;q.strokeRect(6,6,w-12,h-12);q.lineWidth=3;for(let x=18;x<w-10;x+=12){q.beginPath();q.moveTo(x,10);q.lineTo(x,h-10);q.stroke()}for(const yc of[64,256,448])for(let k=-2;k<=2;k++){q.beginPath();q.moveTo(10,yc+k*9);q.lineTo(w-10,yc+k*9);q.stroke()}q.fillStyle='rgba(120,80,40,.08)';q.fillRect(0,h*.55,w,h*.45)});
 /* 빗살창(창 칸) */
 const WIN=tex(256,256,(q,w,h)=>{q.fillStyle='#efe6cf';q.fillRect(0,0,w,h);q.strokeStyle='#6a4024';q.lineWidth=4;for(let k=-h;k<w+h;k+=18){q.beginPath();q.moveTo(k,0);q.lineTo(k+h,h);q.stroke();q.beginPath();q.moveTo(k,h);q.lineTo(k+h,0);q.stroke()}q.lineWidth=14;q.strokeRect(7,7,w-14,h-14)});
 /* 머름: 낮은 판, 칸막이 */
 const MEO=tex(256,64,(q,w,h)=>{q.fillStyle='#8a5a34';q.fillRect(0,0,w,h);q.fillStyle='#6a4024';for(let x=0;x<=w;x+=64)q.fillRect(x-4,0,8,h);q.fillRect(0,0,w,8);q.fillRect(0,h-8,w,8);q.fillStyle='rgba(255,220,170,.12)';for(let x=8;x<w;x+=64)q.fillRect(x+4,12,48,h-24)});
 /* 난간 청판: 풍혈(구멍 무늬) */
 const RAILP=tex(256,64,(q,w,h)=>{q.fillStyle='#7a4a2a';q.fillRect(0,0,w,h);q.fillStyle='#2a1a10';for(let x=32;x<w;x+=64){q.beginPath();q.ellipse(x,h/2,18,10,0,0,7);q.fill()}q.strokeStyle='#5a3418';q.lineWidth=6;q.strokeRect(3,3,w-6,h-6)});
 /* 벽선 두른 회벽 */
 const WALL=tex(256,256,(q,w,h)=>{q.fillStyle='#eee5cf';q.fillRect(0,0,w,h);q.strokeStyle='#7a4a2a';q.lineWidth=14;q.strokeRect(7,7,w-14,h-14)});
 /* 계단 장대석 */
 return _K={MT,M,door:new THREE.MeshStandardMaterial({map:DOOR,roughness:.9}),win:new THREE.MeshStandardMaterial({map:WIN,roughness:.9}),meo:new THREE.MeshStandardMaterial({map:MEO,roughness:.85}),railp:new THREE.MeshStandardMaterial({map:RAILP,roughness:.85,side:THREE.DoubleSide}),wall:new THREE.MeshStandardMaterial({map:WALL,roughness:.95}),
  frame:M(0x7a4a2a,{roughness:.8}),stone:MT.granite,stoneTop:M(0xb9b2a4,{roughness:.9}),floor:MT.floor,dan:MT.dan,dan2:MT.dan2,bk:MT.bracket,grn:M(0x2f7a64,{roughness:.7}),red:M(0x9a3a26,{roughness:.6})}}
const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
function column(h,rMax,bae=true){const pts=[];for(let i=0;i<=12;i++){const t=i/12;const k=bae?(t<.33?1-(.33-t)*.12:1-(t-.33)/(.67)*.22):1-t*.08;pts.push(new THREE.Vector2(rMax*k,t*h))}return new THREE.LatheGeometry(pts,16)}
/* spec: x,z,ry, W,D,nx,nz, FY(기단 높이), PH(기둥 높이), roof:'hip'|'gable', name(현판), pillar(색), bae(배흘림), bracket:'jusim'|'dapo'|'ik',
   front/back/left/right: 칸 채움 배열 또는 한 값('door'|'window'|'wall'|'open'), entry: 앞 칸 중 열어 둔 칸 번호(기본 가운데),
   loft:{h, stone:true} 누각(아래층 기둥 높이 h, 돌기둥), rail: 위층 난간, stairs:'front'|'none'|'east', roofScale, mini, solids(배열), light */
export function buildHall(spec){const K=kitMats(),{MT,M}=K;const s=Object.assign({ry:0,nx:3,nz:2,FY:.9,PH:4,roof:'hip',pillar:0x9a3a26,bae:true,bracket:'jusim',front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',roofScale:1,light:true},spec);
 const {W,D,nx,nz,FY,PH}=s;const G=new THREE.Group();G.position.set(s.x||0,0,s.z||0);G.rotation.y=s.ry;const SOL=s.solids||[];
 const cs=Math.cos(s.ry),sn=Math.sin(s.ry);const wx=(lx,lz)=>[s.x+lx*cs+lz*sn,s.z-lx*sn+lz*cs];
 const S=(x0,x1,y0,y1,z0,z1)=>{const a=wx(x0,z0),b=wx(x1,z1);SOL.push({x0:Math.min(a[0],b[0]),x1:Math.max(a[0],b[0]),y0,y1,z0:Math.min(a[1],b[1]),z1:Math.max(a[1],b[1])})};
 const C=(lx,lz,r,y0,y1)=>{const p=wx(lx,lz);SOL.push({cx:p[0],cz:p[1],r,y0,y1})};
 const LH=s.loft?s.loft.h:0;/* 누각이면 아래층 높이 */const BY=FY+LH;/* 위층 바닥 높이 */
 /* ---------- 기단: 두 단 + 갑석 ---------- */
 const bw=W+2.2,bd=D+2.2;if(s.base!==false){const b1=box(bw+.5,FY*.5,bd+.5,K.stone);b1.position.y=FY*.25;G.add(b1);const b2=box(bw,FY*.5,bd,K.stone);b2.position.y=FY*.75;G.add(b2);const cap=box(bw+.16,.12,bd+.16,K.stoneTop);cap.position.y=FY-.04;G.add(cap);S(-bw/2-.25,bw/2+.25,-9,FY,-bd/2-.25,bd/2+.25)}
 /* 계단 + 소맷돌 */if(s.stairs!=='none'&&s.base!==false){const n=Math.max(2,Math.round(FY/.2)),sh=FY/n,sw=Math.min(4,W/nx+.6);for(let i=0;i<n;i++){const st=box(sw,sh*(i+1),.36,K.stoneTop);st.position.set(0,sh*(i+1)/2,bd/2+.25+(n-1-i)*.36+.18);G.add(st);S(-sw/2,sw/2,-9,sh*(i+1),bd/2+.25+(n-1-i)*.36,bd/2+.25+(n-i)*.36)}
  for(const sx of[-1,1]){const L=n*.36,sm=new THREE.Mesh(new THREE.BoxGeometry(.32,FY+.18,L),K.stone);sm.position.set(sx*(sw/2+.16),(FY+.18)/2,bd/2+.25+L/2);sm.castShadow=true;G.add(sm);const cut=box(.34,.2,L*1.02,K.stoneTop);cut.position.set(sx*(sw/2+.16),FY*.55,bd/2+.25+L/2+.02);cut.rotation.x=Math.atan2(FY,L);G.add(cut)}}
 /* ---------- 기둥 자리 ---------- */
 const XS=[...Array(nx+1)].map((_,i)=>-W/2+i*W/nx),ZS=[...Array(nz+1)].map((_,i)=>-D/2+i*D/nz);const edge=(x,z)=>Math.abs(x)>W/2-.05||Math.abs(z)>D/2-.05;
 const ju=new THREE.CylinderGeometry(.5,.56,.22,8),ju2=new THREE.CylinderGeometry(.36,.44,.1,16);const pr=Math.min(.34,Math.max(.22,W/nx*.07));
 const pillarM=M(s.pillar,{roughness:.62});const cg=column(PH,pr,s.bae);
 /* 누각 아래층: 돌기둥(네모) */if(s.loft){const lg=s.loft.stone?new THREE.BoxGeometry(pr*2.1,LH,pr*2.1):column(LH,pr,false);const lm=s.loft.stone?K.stoneTop:pillarM;for(const x of XS)for(const z of ZS){const p=new THREE.Mesh(lg,lm);p.position.set(x,FY+LH/2*(s.loft.stone?1:0),z);if(!s.loft.stone)p.position.y=FY;p.castShadow=true;G.add(p);C(x,z,pr+.08,-9,BY+.4)}
  const fl=box(W+.9,.32,D+.9,K.frame);fl.position.y=BY-.16;G.add(fl);S(-W/2-.45,W/2+.45,BY-.32,BY,-D/2-.45,D/2+.45);for(const sz of[-1,1]){const b=box(W+.6,.4,.32,K.dan);b.position.set(0,BY-.5,sz*D/2);G.add(b)}for(const sx of[-1,1]){const b=box(.32,.4,D+.6,K.dan);b.position.set(sx*W/2,BY-.5,0);G.add(b)}}
 /* 주춧돌과 기둥 */for(const x of XS)for(const z of ZS){const outer=edge(x,z);if(!outer&&!s.inner)continue;if(!s.loft&&s.base!==false){const a=new THREE.Mesh(ju,K.stoneTop);a.position.set(x,FY+.11,z);a.castShadow=true;G.add(a);const b=new THREE.Mesh(ju2,K.stoneTop);b.position.set(x,FY+.27,z);G.add(b)}
  const c=new THREE.Mesh(cg,pillarM);c.position.set(x,BY+(s.loft?0:.3),z);c.castShadow=true;G.add(c);C(x,z,pr+.05,BY-.2,BY+PH+1)}
 /* 마루 */if(s.floor!==false){const f=box(W+(s.loft?.8:.2),.08,D+(s.loft?.8:.2),K.floor);f.position.y=BY+(s.loft?.04:.32);G.add(f);if(!s.loft)S(-W/2,W/2,FY,FY+.34,-D/2,D/2)}
 const TOP=BY+(s.loft?0:.3)+PH;/* 기둥 머리 높이 */
 /* ---------- 창방·평방(단청) ---------- */
 for(const sz of[-1,1]){const b=box(W+.5,.42,.3,K.dan);b.position.set(0,TOP-.24,sz*D/2);G.add(b);if(s.bracket==='dapo'){const p=box(W+.7,.22,.42,K.grn);p.position.set(0,TOP+.1,sz*D/2);G.add(p)}}
 for(const sx of[-1,1]){const b=box(.3,.42,D+.5,K.dan);b.position.set(sx*W/2,TOP-.24,0);G.add(b);if(s.bracket==='dapo'){const p=box(.42,.22,D+.7,K.grn);p.position.set(sx*W/2,TOP+.1,0);G.add(p)}}
 /* ---------- 공포 ---------- */
 if(!s.mini){if(s.bracket==='dapo'){const bk=brackets(MT,W/2,D/2,TOP+.2,Math.max(.9,W/nx/3));G.add(bk)}
  else{for(const x of XS)for(const z of ZS){if(!edge(x,z))continue;const ju=box(.62,.24,.62,K.grn);ju.position.set(x,TOP+.12,z);G.add(ju);const along=Math.abs(z)>D/2-.05;
   const a1=box(along?1.5:.34,.24,along?.34:1.5,K.bk);a1.position.set(x,TOP+.36,z);G.add(a1);const a2=box(along?2.1:.32,.22,along?.32:2.1,K.bk);a2.position.set(x,TOP+.58,z);G.add(a2);
   /* 쇠서(앞으로 내민 부재) */const sh=box(.26,.26,1.5,K.red);sh.position.set(x+(along?0:Math.sign(x)*.7),TOP+.42,z+(along?Math.sign(z)*.7:0));if(!along)sh.rotation.y=Math.PI/2;G.add(sh);if(s.bracket==='ik'){sh.scale.set(1,.8,.8)}}}
  /* 장혀·도리 */for(const sz of[-1,1]){const d=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,W+1.6,10),K.frame);d.rotation.z=Math.PI/2;d.position.set(0,TOP+.85,sz*(D/2));G.add(d)}}
 /* ---------- 칸 채움 ---------- */
 const fill=(side)=>{let L=s[side];const n=side==='front'||side==='back'?nx:nz;if(!Array.isArray(L))L=[...Array(n)].map(()=>L);return L};
 const FR=fill('front');const entry=s.entry!=null?s.entry:Math.floor(nx/2);
 const bay=(type,cx,len,face,isEntry)=>{/* face: 'z+','z-','x+','x-'. 로컬에서 앞면(+z)으로 만들고 돌린다 */if(type==='open')return;const g=new THREE.Group();const h=PH-.5,y0=BY+(s.loft?0:.36);
  const sill=box(len,.2,.22,K.frame);sill.position.set(0,y0+.1,0);g.add(sill);const lint=box(len,.2,.22,K.frame);lint.position.set(0,y0+h-.1,0);g.add(lint);for(const sx of[-1,1]){const p=box(.16,h,.22,K.frame);p.position.set(sx*(len/2-.08),y0+h/2,0);g.add(p)}
  if(type==='door'){const lv=4,lw=(len-.32)/lv;const dh=Math.min(h-.5,2.9);for(let i=0;i<lv;i++){const d=new THREE.Mesh(new THREE.PlaneGeometry(lw-.04,dh),K.door);const lx=-len/2+.16+lw*(i+.5);if(isEntry){/* 들어열개: 위로 걸어 올린 모습 */d.rotation.x=-Math.PI/2+.08;d.position.set(lx,y0+h-.32,.32+dh/2*0);d.position.z=dh/2-.1;d.position.y=y0+h-.25}else d.position.set(lx,y0+.2+dh/2,.04);g.add(d);const db=new THREE.Mesh(new THREE.PlaneGeometry(lw-.04,dh),K.door);db.rotation.y=Math.PI;db.position.copy(d.position);db.rotation.x=d.rotation.x;db.position.z-=.02;if(!isEntry)g.add(db)}
   if(h-.5>dh+.3){const tw=box(len-.32,h-.5-dh,.12,K.wall);tw.position.set(0,y0+.2+dh+(h-.5-dh)/2,0);g.add(tw)}}
  else if(type==='window'){const mh=.7;const m=new THREE.Mesh(new THREE.PlaneGeometry(len-.32,mh),K.meo);m.position.set(0,y0+.2+mh/2,.04);g.add(m);const wh=Math.min(1.5,h-mh-.9);const w=new THREE.Mesh(new THREE.PlaneGeometry(len-.32,wh),K.win);w.position.set(0,y0+.2+mh+.1+wh/2,.04);g.add(w);const top=h-.2-mh-.1-wh;if(top>.05){const tw=box(len-.32,top,.12,K.wall);tw.position.set(0,y0+.2+mh+.1+wh+top/2,0);g.add(tw)}const bk=box(len-.32,h-.4,.1,K.wall);bk.position.set(0,y0+.2+(h-.4)/2,-.08);g.add(bk)}
  else{const w=box(len-.32,h-.4,.16,K.wall);w.position.set(0,y0+.2+(h-.4)/2,0);g.add(w);const mid=box(len-.32,.16,.2,K.frame);mid.position.set(0,y0+h*.5,0);g.add(mid)}
  const ang={'z+':0,'z-':Math.PI,'x+':Math.PI/2,'x-':-Math.PI/2}[face];g.rotation.y=ang;const off=(face[0]==='z'?D:W)/2;if(face==='z+')g.position.set(cx,0,off);else if(face==='z-')g.position.set(cx,0,-off);else if(face==='x+')g.position.set(off,0,cx);else g.position.set(-off,0,cx);G.add(g);
  if(!isEntry){const t=.2;if(face[0]==='z'){const zz=face==='z+'?off:-off;S(cx-len/2,cx+len/2,BY,BY+PH,zz-t,zz+t)}else{const xx=face==='x+'?off:-off;S(xx-t,xx+t,BY,BY+PH,cx-len/2,cx+len/2)}}};
 FR.forEach((t,i)=>bay(t,-W/2+(i+.5)*W/nx,W/nx,'z+',i===entry&&t!=='wall'));fill('back').forEach((t,i)=>bay(t,-W/2+(i+.5)*W/nx,W/nx,'z-',false));
 fill('right').forEach((t,i)=>bay(t,-D/2+(i+.5)*D/nz,D/nz,'x+',false));fill('left').forEach((t,i)=>bay(t,-D/2+(i+.5)*D/nz,D/nz,'x-',false));
 /* ---------- 계자난간(누각 위층) ---------- */
 if(s.rail){const y=BY;const run=(len,face,c0=0)=>{const g=new THREE.Group();const n=Math.max(2,Math.round(len/1.1));for(let i=0;i<=n;i++){const lx=-len/2+i*len/n;const leg=box(.1,.75,.42,K.frame);leg.position.set(lx,y+.38,.22);leg.rotation.x=-.25;g.add(leg)}const p=new THREE.Mesh(new THREE.PlaneGeometry(len,.32),K.railp);p.position.set(0,y+.3,.32);g.add(p);const top=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,len,8),K.frame);top.rotation.z=Math.PI/2;top.position.set(0,y+.82,.42);g.add(top);for(let i=0;i<n;i++){const st=box(.06,.32,.06,K.frame);st.position.set(-len/2+(i+.5)*len/n,y+.62,.4);g.add(st)}
   const ang={'z+':0,'z-':Math.PI,'x+':Math.PI/2,'x-':-Math.PI/2}[face];g.rotation.y=ang;if(face==='z+')g.position.z=D/2+.25;else if(face==='z-')g.position.z=-D/2-.25;else if(face==='x+')g.position.x=W/2+.25;else g.position.x=-W/2-.25;if(face[0]==='z')g.position.x+=c0;else g.position.z+=c0;G.add(g)};
  const gap=s.railGap||null;run(W+.5,'z+');run(W+.5,'z-');run(D+.5,'x-');S(-W/2-.5,W/2+.5,y,y+1,D/2+.2,D/2+.6);S(-W/2-.5,W/2+.5,y,y+1,-D/2-.6,-D/2-.2);S(-W/2-.6,-W/2-.2,y,y+1,-D/2-.5,D/2+.5);
  /* 오른쪽(x+) 난간은 계단 자리(railGap=[z0,z1])를 비움. 계단 쪽 가로 기둥에 C(x+.4..)로 막히지 않게 */if(gap){const a0=-D/2-.25,b1=D/2+.25;const L1=gap[0]-a0,L2=b1-gap[1];if(L1>.4){run(L1,'x+',(a0+gap[0])/2);S(W/2+.2,W/2+.6,y,y+1,a0,gap[0])}if(L2>.4){run(L2,'x+',(gap[1]+b1)/2);S(W/2+.2,W/2+.6,y,y+1,gap[1],b1)}}else{run(D+.5,'x+');S(W/2+.2,W/2+.6,y,y+1,-D/2-.5,D/2+.5)}}
 /* ---------- 지붕 ---------- */
 if(!s.mini){const R=s.roofScale,ex=2.1*R,X=W/2+ex,Z=D/2+ex,h0=TOP+(s.bracket==='dapo'?1.15:.95),rise=Math.max(3.4,D*.42)*R;
  if(s.roof==='hip'){const rf=hipRoof(MT,X,Z,Math.max(.8,W/2-D*.18),h0,h0+rise,.95,.38,{plain:!!s.plain,rs:Math.min(1,.55+W/40)});rf.traverse(o=>{if(o.isMesh)o.castShadow=true});G.add(rf)}
  else{const y0=h0-.1,y1=h0+rise,ez=Z,sl=Math.hypot(ez,y1-y0),ang=Math.atan2(y1-y0,ez);for(const sz of[-1,1]){const pl=new THREE.Mesh(new THREE.BoxGeometry(W+2.4,.2,sl),MT.tile);pl.position.set(0,(y0+y1)/2,sz*ez/2);pl.rotation.x=sz*ang;pl.castShadow=true;G.add(pl)}
   const rd=box(W+2.6,.5,.6,MT.ridge);rd.position.set(0,y1+.2,0);G.add(rd);for(const sx of[-1,1]){const tri=new THREE.Shape();tri.moveTo(-ez,0);tri.lineTo(ez,0);tri.lineTo(0,y1-y0);tri.closePath();const tm=new THREE.Mesh(new THREE.ShapeGeometry(tri),K.wall);tm.rotation.y=Math.PI/2;tm.position.set(sx*(W/2+.05),y0,0);G.add(tm);
    for(const sz of[-1,1]){const bg=box(.14,.5,sl*1.03,K.frame);bg.position.set(sx*(W/2+1.2),(y0+y1)/2+.08,sz*ez/2);bg.rotation.x=sz*ang;G.add(bg)}const pp=box(.1,y1-y0,.12,K.frame);pp.position.set(sx*(W/2+.1),y0+(y1-y0)/2,0);G.add(pp)}}
  const RF=rafters(MT,X-.7,Z-.7,h0-.25,.4);RF.forEach(m=>G.add(m))}
 /* ---------- 현판 ---------- */
 if(s.name){const cv=document.createElement('canvas');cv.width=640;cv.height=180;const q=cv.getContext('2d');q.fillStyle='#24160d';q.fillRect(0,0,640,180);q.strokeStyle='#d8a838';q.lineWidth=12;q.strokeRect(8,8,624,164);q.strokeStyle='#2f7a64';q.lineWidth=6;q.strokeRect(24,24,592,132);q.fillStyle='#f2d27a';q.textAlign='center';q.font='bold 104px "Noto Serif KR","Batang",serif';q.fillText(s.name,320,128,580);const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;const pw=Math.min(3.2,W/nx*1.05);const pl=new THREE.Mesh(new THREE.PlaneGeometry(pw,pw*.28),new THREE.MeshStandardMaterial({map:t,roughness:.6}));pl.position.set(0,TOP+.55,D/2+.42);pl.rotation.x=-.12;G.add(pl)}
 if(s.light){const lp=new THREE.PointLight(0xffe2b8,8,Math.max(W,D)*1.2,1.6);lp.position.set(0,BY+PH*.7,0);G.add(lp)}
 return{group:G,top:TOP,floorY:BY+(s.loft?0:.34)}}
