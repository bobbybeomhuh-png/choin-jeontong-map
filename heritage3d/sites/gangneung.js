/* 강릉 오죽헌 초충도 정원. 단위 1 = 1m, 입구 +z.
   갱신 2026-11-12. 그림: 전 신사임당 초충도 8폭과 발문 2장(위키미디어 공용, 공공누리 제1유형, 국립중앙박물관 소장품 사진).
   별당과 전시 정자는 오죽헌(몽룡실) 같은 조선 별당을 본떠 지은 것(실측 아님). 오죽 숲·초충 화단·나비는 그림에서 따 온 연출. */
import * as THREE from 'three';
import {buildHall} from './hallkit.js';
import {tex,noise,mulb,materials,hipRoof} from './sungnyemun.js';
const T=k=>new URL('../textures/gangneung/'+k+'.jpg',import.meta.url).href;
export function buildGangneung(opts={}){const mini=!!opts.mini;const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(83);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
 const TL=new THREE.TextureLoader();
 function art(k,w,h,x,y,z,ry,pad=.1){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry;G.add(g);g.add(box(w+pad*2+.08,h+pad*2+.08,.05,M(0x3b2414)));const silk=new THREE.Mesh(new THREE.PlaneGeometry(w+pad*2,h+pad*2),M(0xd9cbb0));silk.position.z=.03;g.add(silk);
  const m=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.85});if(!mini)TL.load(T(k),t=>{t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;m.map=t;m.needsUpdate=true});const p=new THREE.Mesh(new THREE.PlaneGeometry(w,h),m);p.position.z=.035;g.add(p);return g}
 /* ---------- 마당: 잔디, 흙길 ---------- */
 const PATH=tex(256,256,(q,w,h)=>{q.fillStyle='#cdb98f';q.fillRect(0,0,w,h);noise(q,w,h,4000,['rgba(0,0,0,.06)','rgba(255,255,255,.08)'],2)});PATH.wrapS=PATH.wrapT=THREE.RepeatWrapping;PATH.repeat.set(1,8);
 {const p=new THREE.Mesh(new THREE.PlaneGeometry(3,30),new THREE.MeshStandardMaterial({map:PATH,roughness:1}));p.rotation.x=-Math.PI/2;p.position.set(0,.03,6);p.receiveShadow=true;G.add(p)}
 /* ---------- 오죽 숲: 검은 대나무(뒤편과 서쪽) ---------- */
 if(!mini){const stem=M(0x26221e,{roughness:.5});const LT=tex(64,16,(q,w,h)=>{q.clearRect(0,0,w,h);q.fillStyle='#5a8a3c';q.beginPath();q.moveTo(0,h/2);q.quadraticCurveTo(w*.35,0,w,h/2);q.quadraticCurveTo(w*.35,h,0,h/2);q.fill();q.strokeStyle='#3f6a2a';q.lineWidth=1;q.beginPath();q.moveTo(2,h/2);q.lineTo(w-4,h/2);q.stroke()});const leaf=new THREE.MeshStandardMaterial({map:LT,transparent:true,alphaTest:.4,side:THREE.DoubleSide,roughness:.8});
  const N=240,CL=8,LP=7;/* 오죽: 더 빽빽하게, 잎 다발 더 많이 */const sg=new THREE.CylinderGeometry(.04,.05,1,6);const st=new THREE.InstancedMesh(sg,stem,N);const lg=new THREE.PlaneGeometry(.62,.15);lg.translate(.31,0,0);const lv=new THREE.InstancedMesh(lg,leaf,N*CL*LP);const m4=new THREE.Matrix4(),q=new THREE.Quaternion(),e=new THREE.Euler();let li=0;
  const nodeM=new THREE.InstancedMesh(new THREE.CylinderGeometry(.058,.058,.05,8),M(0x14110e,{roughness:.4}),N*8);let ni=0;/* 대마디 */
  for(let i=0;i<N;i++){let x,z;if(i<N*.65){x=-20+r()*40;z=-24-r()*7}else{x=-24-r()*6;z=-20+r()*30}const h=5+r()*3.5;m4.compose(new THREE.Vector3(x,h/2,z),q.setFromEuler(e.set((r()-.5)*.06,0,(r()-.5)*.06)),new THREE.Vector3(1,h,1));st.setMatrixAt(i,m4);for(let k=1;k<=8;k++){const ny=h*k/9;if(ni<N*8){m4.compose(new THREE.Vector3(x,ny,z),q.identity(),new THREE.Vector3(1,1,1));nodeM.setMatrixAt(ni++,m4)}}
   for(let c=0;c<CL;c++){const y=h*(.45+c*.07)+r()*.2,a0=r()*6.28;for(let k=0;k<LP;k++){m4.compose(new THREE.Vector3(x,y,z),q.setFromEuler(e.set(0,a0+k*1.05+(r()-.5)*.4,-.5-r()*.5,'YXZ')),new THREE.Vector3(.8+r()*.5,1,1));lv.setMatrixAt(li++,m4)}}}
  st.castShadow=true;lv.castShadow=true;nodeM.count=ni;G.add(st,lv,nodeM);S(-20,20,0,9,-31,-24);S(-30,-24,0,9,-20,10)}
 spots.push({x:-6,y:0,z:-21,r:2.6,t:'오죽',h:'줄기가 까마귀처럼 검은 대나무예요. 신사임당이 태어나고 율곡 이이가 태어난 강릉 집 둘레에 오죽이 많아 집 이름이 오죽헌(烏竹軒)이 되었어요.'});
 /* ---------- 별당(몽룡실을 본뜸) ---------- */
 const HX=-9,HZ=-14,W=10,D=6,FY=.8,PH=3;const wall=M(0xf2ede2),pil=M(0x7a5634);
 {/* 자세한 한옥 부품으로: 왼쪽 두 칸 방(띠살문), 오른쪽 두 칸 대청(열림), 익공, 팔작지붕 */G.add(buildHall({x:HX,z:HZ,W,D,nx:4,nz:2,FY,PH,roof:'hip',name:'夢龍室',pillar:0x7a5634,bracket:'ik',front:['door','door','open','open'],entry:-1,back:'wall',left:'wall',right:'window',mini,solids,light:false,plain:true}).group);
  /* 대청에 발문 두 장 */art('cc_9',1.05,1.22,HX+W*.2,FY+1.7,HZ-D/2+.13,0,.08);art('cc_10',1.05,1.22,HX+W*.38,FY+1.7,HZ-D/2+.13,0,.08);
  spots.push({x:HX-W*.25,y:0,z:HZ+D/2+2.4,r:2.2,t:'몽룡실',h:'신사임당이 검은 용이 바다에서 날아드는 꿈을 꾸고 율곡 이이를 낳았다는 방이에요. 그래서 "용꿈 꾼 방", 몽룡실이라 불러요. 오죽헌 별당은 조선 초 집으로 손꼽히게 오래된 살림집이에요. (본떠 지음)'});
  spots.push({x:HX+W*.29,y:FY,z:HZ-.6,r:1.8,t:'발문',h:'초충도 화첩 끝에 후대 학자들이 붙인 글(발문)이에요. 그림이 얼마나 생생한지, 누가 어떻게 간직해 왔는지를 적었어요. (사진: 국립중앙박물관 소장품, 공공누리 제1유형)'})}
 /* ---------- 초충도 전시 정자: 8폭 병풍 ---------- */
 const PX=9,PZ=-6,PW=10,PD=5.5,PPH=3.2,PFY=.4;
 {const base=box(PW+1,PFY,PD+1,M(0xb3aa98));base.position.set(PX,PFY/2,PZ);G.add(base);S(PX-(PW+1)/2,PX+(PW+1)/2,0,PFY,PZ-(PD+1)/2,PZ+(PD+1)/2);const fl=box(PW,.06,PD,M(0x9a7350));fl.position.set(PX,PFY+.03,PZ);G.add(fl);
  for(const x of[-PW/2,0,PW/2])for(const z of[-PD/2,PD/2]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.16,.18,PPH,10),M(0x8a3a2a));c.position.set(PX+x,PFY+PPH/2,PZ+z);c.castShadow=true;G.add(c);solids.push({cx:PX+x,cz:PZ+z,r:.22,y0:0,y1:9})}
  if(!mini){const rf=hipRoof(MT,PW/2+1.3,PD/2+1.3,PW/2-1.8,PFY+PPH+.1,PFY+PPH+2.4,.45,.2,{plain:true,rs:.5});rf.position.set(PX,0,PZ);rf.traverse(o=>{if(o.isMesh)o.castShadow=true});G.add(rf)}
  const W1=1.02,H1=1.18;const g=new THREE.Group();g.position.set(PX,PFY,PZ-PD/2+.9);G.add(g);
  for(let i=0;i<8;i++){const pg=new THREE.Group();pg.position.set((i-3.5)*W1*.99,1.35,(i%2)*.14);pg.rotation.y=(i%2?-1:1)*.16;g.add(pg);pg.add(box(W1+.04,2.2,.04,M(0x3b2414)));const silk=new THREE.Mesh(new THREE.PlaneGeometry(W1-.06,2.1),M(0xcdb991));silk.position.z=.022;pg.add(silk);
   const m=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.85});if(!mini)TL.load(T('cc_'+(i+1)),t=>{t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;m.map=t;m.needsUpdate=true});const p=new THREE.Mesh(new THREE.PlaneGeometry(W1-.14,H1),m);p.position.set(0,.1,.026);pg.add(p)}
  S(PX-4.3,PX+4.3,0,3,PZ-PD/2+.5,PZ-PD/2+1.3);
  spots.push({x:PX,y:PFY,z:PZ+.9,r:2.6,t:'초충도',h:'풀과 벌레를 그린 그림이에요. 수박을 갉아 먹는 들쥐, 가지와 방아깨비, 오이와 개구리, 맨드라미와 쇠똥벌레처럼 집 앞 텃밭의 작은 생명을 다정하게 그렸어요. 신사임당이 그렸다고 전하는 8폭이에요. (사진: 국립중앙박물관 소장품, 공공누리 제1유형)'})}
 /* ---------- 초충 화단: 그림 속 수박·가지·오이·맨드라미·원추리 ---------- */
 const BX=-8,BZ=6;
 {const soil=new THREE.Mesh(new THREE.PlaneGeometry(9,5),M(0x6b4f35));soil.rotation.x=-Math.PI/2;soil.position.set(BX,.04,BZ);G.add(soil);for(const [w,d,x,z] of[[9.4,.2,0,-2.6],[9.4,.2,0,2.6],[.2,5.4,-4.6,0],[.2,5.4,4.6,0]]){const e=box(w,.25,d,M(0x8a7a62));e.position.set(BX+x,.12,BZ+z);G.add(e)}S(BX-4.7,BX+4.7,0,.5,BZ-2.7,BZ+2.7);
  const leaf=M(0x4f8a3a,{side:THREE.DoubleSide});
  /* 수박 */for(let i=0;i<3;i++){const wm=new THREE.Mesh(new THREE.SphereGeometry(.32,16,12),new THREE.MeshStandardMaterial({map:tex(64,64,(q,w,h)=>{q.fillStyle='#2f6a2a';q.fillRect(0,0,w,h);q.fillStyle='#173d17';for(let x=0;x<w;x+=10)q.fillRect(x,0,4,h)}),roughness:.6}));wm.scale.set(1.2,.95,1);wm.position.set(BX-3.2+i*.9,.3,BZ-1.2+(i%2)*.6);wm.castShadow=true;G.add(wm)}
  /* 가지 */for(let i=0;i<5;i++){const st=new THREE.Mesh(new THREE.CylinderGeometry(.02,.03,.7,5),leaf);st.position.set(BX-.8+i*.4,.35,BZ+1.3);G.add(st);const eg=new THREE.Mesh(new THREE.SphereGeometry(.07,10,8),M(0x4a1f5c,{roughness:.3}));eg.scale.set(1,2.2,1);eg.position.set(BX-.75+i*.4,.42,BZ+1.4);G.add(eg)}
  /* 맨드라미 */for(let i=0;i<5;i++){const st=new THREE.Mesh(new THREE.CylinderGeometry(.02,.03,.9,5),leaf);st.position.set(BX+1.6+i*.45,.45,BZ-1.3);G.add(st);const cb=new THREE.Mesh(new THREE.SphereGeometry(.13,10,8),M(0xc4223a,{roughness:.8}));cb.scale.set(1.4,.9,.6);cb.position.set(BX+1.6+i*.45,.95,BZ-1.3);G.add(cb)}
  /* 원추리 */for(let i=0;i<6;i++){for(let k=0;k<5;k++){const l=new THREE.Mesh(new THREE.PlaneGeometry(.06,.7),leaf);l.position.set(BX+2+i*.45,.35,BZ+1.2);l.rotation.set(0,k*1.2,(k-2)*.3);G.add(l)}const fw=new THREE.Mesh(new THREE.ConeGeometry(.09,.18,6,1,true),M(0xf09a2a,{side:THREE.DoubleSide}));fw.position.set(BX+2+i*.45,.85,BZ+1.2);fw.rotation.x=Math.PI;G.add(fw)}
  /* 덩굴 잎 */for(let i=0;i<30;i++){const l=new THREE.Mesh(new THREE.CircleGeometry(.14+r()*.08,7),leaf);l.rotation.x=-Math.PI/2+(r()-.5)*.6;l.position.set(BX-4+r()*3.6,.1+r()*.12,BZ-2.2+r()*2);G.add(l)}
  spots.push({x:BX,y:0,z:BZ+3.6,r:2.6,t:'초충 화단',h:'초충도 속 텃밭을 그대로 옮긴 화단이에요. 수박, 가지, 맨드라미, 원추리가 자라요. 신사임당이 그린 풀벌레가 너무 생생해서, 마당에 말리던 그림을 닭이 진짜 벌레인 줄 알고 쪼았다는 이야기가 전해요.'})}
 /* ---------- 나비와 잠자리(날아다님) ---------- */
 const BUG=[];if(!mini){const cols=['#f2f2ee','#e8b030','#d84a3a','#6aa0d8'];for(let i=0;i<16;i++){const c=cols[i%4];const t=tex(64,32,(q,w,h)=>{q.fillStyle=c;q.beginPath();q.ellipse(16,12,14,10,-.3,0,7);q.ellipse(48,12,14,10,.3,0,7);q.fill();q.beginPath();q.ellipse(18,24,9,7,.3,0,7);q.ellipse(46,24,9,7,-.3,0,7);q.fill();q.fillStyle='#222';q.fillRect(30,6,4,22)});const b=new THREE.Mesh(new THREE.PlaneGeometry(.28,.14),new THREE.MeshBasicMaterial({map:t,transparent:true,side:THREE.DoubleSide,depthWrite:false}));b.rotation.x=-Math.PI/2.4;b.userData={cx:BX+(r()-.5)*8+(i>9?16:0),cz:BZ+(r()-.5)*5-(i>9?10:0),p:r()*6,s:.5+r()*.6};G.add(b);BUG.push(b)}}
 const tick=(P,dt)=>{const t=performance.now()/1000;for(const b of BUG){const u=b.userData;b.position.set(u.cx+Math.sin(t*u.s+u.p)*1.6,1+Math.sin(t*1.7+u.p)*.35,u.cz+Math.cos(t*u.s*1.3+u.p)*1.2);b.scale.x=.4+Math.abs(Math.sin(t*14+u.p))*.6;b.rotation.z=t*u.s+u.p}};
 const meta={quest:{t:'오죽헌 초충도 산책',d:'신사임당의 초충도와 오죽헌을 따라 다섯 곳을 찾아 보세요.',steps:[['초충도','초충도'],['초충 화단','초충 화단'],['몽룡실','몽룡실'],['오죽','오죽'],['발문','발문']],done:'오죽헌 산책을 마쳤어요. 작은 풀벌레까지 다정하게 바라본 눈이 초충도의 힘이에요.'},
  title:'강릉 오죽헌 초충도 정원',video:'chochung',hint:'신사임당이 태어난 강릉 오죽헌을 본떠 지은 마당이에요. 전시 정자에서 초충도 8폭을, 화단에서 그림 속 텃밭을, 별당 대청에서 발문을, 뒤편에서 검은 대나무 오죽을 찾아 보세요. (그림 사진: 국립중앙박물관 소장품, 공공누리 제1유형)',
  env:{plaza:null,beds:false,trees:true,sign:{x:4,z:18,lines:['강릉 오죽헌 초충도 정원','초충도 8폭 · 발문','몽룡실 · 오죽 숲','그림 속 텃밭과 나비']},treeAvoid:(x,z)=>Math.abs(x)<32&&z<24&&z>-34},
  npc:[['painter',[[PX-3,PFY,PZ+2],[PX+3,PFY,PZ+2]]],['carpenter',[[HX-4,0,HZ+D/2+3],[HX+3,0,HZ+D/2+3]]]],
  level:P=>Math.abs(P.x-PX)<PW/2&&Math.abs(P.z-PZ)<PD/2?'초충도 정자':Math.abs(P.x-HX)<W/2&&Math.abs(P.z-HZ)<D/2?'오죽헌 별당':P.z<-20?'오죽 숲':'오죽헌 마당',
  camCap:P=>Math.abs(P.x-HX)<W/2&&Math.abs(P.z-HZ)<D/2?3:Infinity,tick,
  mini:{S:5,ox:0,oz:-6,draw(g,X,Z,S){g.fillStyle='#7aa04e';g.fillRect(0,0,300,300);g.fillStyle='#2f3a28';g.fillRect(X(-20),Z(-31),40*S,7*S);g.fillRect(X(-30),Z(-20),6*S,30*S);g.fillStyle='#cdb98f';g.fillRect(X(-1.5),Z(-9),3*S,30*S);g.fillStyle='#8a6a44';g.fillRect(X(HX-W/2),Z(HZ-D/2),W*S,D*S);g.fillStyle='#8a3a2a';g.fillRect(X(PX-PW/2),Z(PZ-PD/2),PW*S,PD*S);g.fillStyle='#6b4f35';g.fillRect(X(BX-4.5),Z(BZ-2.5),9*S,5*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:20,yaw:Math.PI},size:{}},meta)}
