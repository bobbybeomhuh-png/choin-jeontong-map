/* 성곽 공용 부품(2026-11-27): 흰 상자 성벽·성문 대신.
   성벽 = 크기 다른 막돌을 켜켜이 쌓은 돌 결(도형마다 늘어나지 않게 실제 크기로 결을 붙임), 바깥면은 아래가 넓게 기울고(퇴물림), 위에 여장(타구 사이 틈·지붕돌).
   성문 = 홍예(무지개) 문길을 실제로 뚫고 홍예석을 한 장씩 둘러 쌓음, 문짝 두 짝. 문루는 hallkit buildHall 을 위에 얹어 씀.
   fortWall(G,SOL,점들,{H,T,parapet}) / archGate(G,SOL,x,z,ry,{W,H,T,aw,ah}) → {top} */
import * as THREE from 'three';
let _thin=null,_mat=null,_cap=null,_arch=null,_door=null;
function rng(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function stoneCanvas(seed,dressed,thin=false){const W=512,H=512,c=document.createElement('canvas');c.width=W;c.height=H;const q=c.getContext('2d'),r=rng(seed);
 q.fillStyle='#57524a';q.fillRect(0,0,W,H);
 const rows=[];let y=0;while(y<H){const h=thin?7+r()*9:dressed?40+r()*14:24+r()*30;rows.push(h);y+=h}const k=H/y;
 y=0;for(const rh0 of rows){const rh=rh0*k;let x=-r()*60;while(x<W){const w=thin?rh*(3+r()*5):dressed?rh*(1.6+r()*1.2):rh*(1+r()*1.8);
   const v=thin?118+r()*52:dressed?168+r()*30:132+r()*52,wa=thin?r()*8-6:r()*10-3;for(const ox of[0,-W,W]){const x0=x+ox+2,y0=y+2,ww=w-4,hh=rh-4;if(x0>W||x0+ww<0)continue;
    q.beginPath();const j=()=>dressed?r()*1.5:r()*5;q.moveTo(x0+j(),y0+j());q.lineTo(x0+ww-j(),y0+j());q.lineTo(x0+ww-j(),y0+hh-j());q.lineTo(x0+j(),y0+hh-j());q.closePath();
    const g=q.createLinearGradient(x0,y0,x0+ww*.3,y0+hh);g.addColorStop(0,`rgb(${v+wa+16|0},${v+12|0},${v-wa+2|0})`);g.addColorStop(1,`rgb(${v+wa-18|0},${v-20|0},${v-wa-28|0})`);q.fillStyle=g;q.fill()}
   x+=w}y+=rh}
 /* 얼룩·이끼 */for(let i=0;i<260;i++){const a=r()*.08;q.fillStyle=r()<.5?`rgba(60,70,40,${a})`:`rgba(30,28,24,${a})`;q.beginPath();q.arc(r()*W,r()*H,4+r()*22,0,7);q.fill()}
 for(let i=0;i<5000;i++){const v=r()*255|0;q.fillStyle=`rgba(${v},${v},${v},.06)`;q.fillRect(r()*W,r()*H,2,2)}
 return c}
function texOf(c,col=true){const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;if(col)t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t}
export function thinMat(){if(!_thin){const c=stoneCanvas(470,false,true);_thin=new THREE.MeshStandardMaterial({map:texOf(c),bumpMap:texOf(c,false),bumpScale:1.6,roughness:.95})}return _thin}
export function stoneBlock(w,h,d,m){const o=mesh(worldUV(new THREE.BoxGeometry(w,h,d)),m||stoneMat());return o}
/* 성돌: 공개 CC0 사진 재질(Poly Haven japanese_stone_wall, 색·노멀). worldUV 한 장=4m → 돌 하나 약 0.6~0.9m. 2026-11-27 */
function phT(n,srgb){const t=new THREE.TextureLoader().load(new URL('../textures/photo/'+n+'.jpg',import.meta.url).href);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.colorSpace=srgb?THREE.SRGBColorSpace:THREE.NoColorSpace;t.anisotropy=8;return t}
export function stoneMat(){if(!_mat){_mat=new THREE.MeshStandardMaterial({map:phT('wall',true),normalMap:phT('wall_n',false),normalScale:new THREE.Vector2(1.4,1.4),roughness:.92,color:0xf0ebe0});_mat.userData.fin=null}return _mat}
function capMat(){if(!_cap){const c=stoneCanvas(77,true);_cap=new THREE.MeshStandardMaterial({map:texOf(c),bumpMap:texOf(c,false),bumpScale:1.2,roughness:.9,color:0xd8d4cc})}return _cap}
function archMat(){if(!_arch){_arch=new THREE.MeshStandardMaterial({color:0xcfc8b8,roughness:.85})}return _arch}
function doorMat(){if(!_door){const c=document.createElement('canvas');c.width=128;c.height=256;const q=c.getContext('2d');q.fillStyle='#5a3a22';q.fillRect(0,0,128,256);for(let i=0;i<5;i++){q.fillStyle=i%2?'#62402a':'#54361f';q.fillRect(i*26,0,25,256);q.fillStyle='rgba(0,0,0,.35)';q.fillRect(i*26+24,0,2,256)}q.fillStyle='#2a2420';for(let y=20;y<256;y+=46){q.fillRect(0,y,128,7);for(let x=10;x<128;x+=22){q.beginPath();q.arc(x,y+3.5,4,0,7);q.fill()}}const t=texOf(c);_door=new THREE.MeshStandardMaterial({map:t,roughness:.8,side:THREE.DoubleSide})}return _door}
/* 면 방향 따라 실제 크기(S m = 결 한 장)로 UV */
export function worldUV(g,S=4,ox=0){g.computeVertexNormals();const p=g.attributes.position,n=g.attributes.normal,uv=new Float32Array(p.count*2);
 for(let i=0;i<p.count;i++){const x=p.getX(i)+ox,y=p.getY(i),z=p.getZ(i),nx=Math.abs(n.getX(i)),ny=Math.abs(n.getY(i));let u,v;if(ny>.6){u=x;v=z}else if(nx>.6){u=z;v=y}else{u=x;v=y}uv[i*2]=u/S;uv[i*2+1]=v/S}
 g.setAttribute('uv',new THREE.BufferAttribute(uv,2));return g}
function mesh(g,m){const o=new THREE.Mesh(g,m);o.castShadow=o.receiveShadow=true;return o}
/* 여장: 길이 L 을 따라(로컬 z) 타구 틈을 두고 돌담 + 지붕돌 */
function parapet(par,L,x,y,{h=1.25,t=.75,seg=2.3,gap=.45}={}){const n=Math.max(1,Math.round(L/(seg+gap)));const s=L/n;
 for(let i=0;i<n;i++){const len=s-gap,cz=-L/2+(i+.5)*s;const g=worldUV(new THREE.BoxGeometry(t,h,len).translate(0,h/2,0),4,cz);const b=mesh(g,stoneMat());b.position.set(x,y,cz);par.add(b);
  const c=mesh(new THREE.BoxGeometry(t+.18,.14,len+.12),capMat());c.position.set(x,y+h+.07,cz);par.add(c);
  /* 총안(작은 구멍 자국) */const hole=new THREE.Mesh(new THREE.PlaneGeometry(.22,.28),new THREE.MeshBasicMaterial({color:0x1e1b17}));hole.position.set(x+t/2+.005,y+h*.45,cz);hole.rotation.y=Math.PI/2;par.add(hole)}}
/* 성벽 한 줄: pts=[[x,z],...]. 바깥(+x 로컬)은 점 순서의 오른쪽. out:-1 이면 반대 */
export function fortWall(G,SOL,pts,{H=5,T=3,batter=.32,par=true,out=1,closed=false,mat=null,top=null}={}){const WM=mat||stoneMat(),TP=top||capMat();const P=closed?[...pts,pts[0]]:pts;
 for(let i=0;i<P.length-1;i++){const[x1,z1]=P[i],[x2,z2]=P[i+1];const dx=x2-x1,dz=z2-z1,L=Math.hypot(dx,dz)+.6;if(L<.7)continue;
  const g=new THREE.BoxGeometry(T,H,L,1,1,1).translate(0,H/2,0);const p=g.attributes.position;for(let k=0;k<p.count;k++){if(p.getY(k)>H/2&&p.getX(k)>0)p.setX(k,T/2-batter*T)}
  worldUV(g,4,i*7.3);const seg=mesh(g,WM);const grp=new THREE.Group();grp.position.set((x1+x2)/2,0,(z1+z2)/2);grp.rotation.y=Math.atan2(dx,dz)+(out<0?Math.PI:0);grp.add(seg);
  const tc=mesh(new THREE.BoxGeometry(T*(1-batter)+.1,.12,L),TP);tc.position.set(-batter*T/2,H+.06,0);grp.add(tc);
  if(par)parapet(grp,L,T/2-batter*T-.38,H+.12);G.add(grp);
  const n=Math.max(1,Math.ceil(L/2.5));for(let j=0;j<=n;j++){const t=j/n;SOL.push({cx:x1+dx*t,cz:z1+dz*t,r:T/2+.2,y0:-9,y1:H+1.4})}}}
/* 홍예 성문: ry 로 돌림. 로컬 x 가 성벽 방향, z 가 문길(드나드는 방향) */
export function archGate(G,SOL,x,z,ry,{W=11,H=5.6,T=5,aw=3.4,ah=4.2,par=true,door=true}={}){const grp=new THREE.Group();grp.position.set(x,0,z);grp.rotation.y=ry;G.add(grp);
 const R=aw/2,sy=ah-R;const sh=new THREE.Shape();sh.moveTo(-W/2,0);sh.lineTo(-R,0);sh.lineTo(-R,sy);sh.absarc(0,sy,R,Math.PI,0,true);sh.lineTo(R,0);sh.lineTo(W/2,0);sh.lineTo(W/2,H);sh.lineTo(-W/2,H);sh.closePath();
 const g=new THREE.ExtrudeGeometry(sh,{depth:T,bevelEnabled:false,curveSegments:20}).translate(0,0,-T/2);worldUV(g,4);grp.add(mesh(g,stoneMat()));
 /* 홍예석: 부채꼴 돌을 한 장씩 */const N=13,R2=R+.62;for(let i=0;i<N;i++){const a0=Math.PI-(i/N)*Math.PI-.012,a1=Math.PI-((i+1)/N)*Math.PI+.012;const s2=new THREE.Shape();s2.moveTo(Math.cos(a0)*R,Math.sin(a0)*R);s2.lineTo(Math.cos(a0)*R2,Math.sin(a0)*R2);s2.absarc(0,0,R2,a0,a1,true);s2.lineTo(Math.cos(a1)*R,Math.sin(a1)*R);s2.absarc(0,0,R,a1,a0,false);
  for(const fz of[-1,1]){const gg=new THREE.ExtrudeGeometry(s2,{depth:.12,bevelEnabled:false,curveSegments:3});const m=mesh(gg,archMat());m.position.set(0,sy,fz>0?T/2:-T/2-.12);grp.add(m)}}
 /* 문설주 돌(다듬은 긴 돌) */for(const sx of[-1,1])for(const fz of[-1,1]){const m=mesh(new THREE.BoxGeometry(.5,sy,.12),archMat());m.position.set(sx*(R+.25),sy/2,fz*(T/2+.06));grp.add(m)}
 /* 문짝 두 짝(반쯤 열림) */if(door){for(const sx of[-1,1]){const hg=new THREE.Group();hg.position.set(sx*R,0,-T*.15);hg.rotation.y=sx*1.25;const d=new THREE.Mesh(new THREE.PlaneGeometry(R,sy+R*.6),doorMat());d.position.set(-sx*R/2,(sy+R*.6)/2,0);hg.add(d);grp.add(hg)}}
 const tc=mesh(new THREE.BoxGeometry(W+.1,.12,T+.1),capMat());tc.position.y=H+.06;grp.add(tc);
 if(par){for(const fz of[-1,1]){const pg=new THREE.Group();pg.position.z=fz*(T/2-.38);pg.rotation.y=-fz*Math.PI/2;grp.add(pg);parapet(pg,W,0,H+.12)}}
 const cs=Math.cos(ry),sn=Math.sin(ry);const wx=(lx,lz)=>[x+lx*cs+lz*sn,z-lx*sn+lz*cs];
 for(const sx of[-1,1])for(let k=0;k<3;k++){const lx=sx*(R+.4+k*((W/2-R-.4)/2.4));for(const lz of[-T/2+.6,0,T/2-.6]){const[px,pz]=wx(lx,lz);SOL.push({cx:px,cz:pz,r:.9,y0:-9,y1:H+1.4})}}
 for(const lz of[-T/2+.6,0,T/2-.6]){const[px,pz]=wx(0,lz);SOL.push({cx:px,cz:pz,r:R+.2,y0:ah-.1,y1:H+1.4})}
 return{top:H+.12,group:grp}}
