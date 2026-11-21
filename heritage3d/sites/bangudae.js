/* 울산 반구천 암각화 마당(2026-11-21): 국보 「울주 대곡리 반구대 암각화」와 「울주 천전리 명문과 암각화」(2025년 7월 유네스코 세계유산 「반구천의 암각화」).
   천전리 각석은 공개 실측 3D(Arqueomodel3D @juanbrualla, CC BY 4.0, 국립경주박물관 전시 본뜸)를 실제 크기(너비 약 10m, 높이 2.78m)로 놓음.
   반구대 암각화 절벽은 공개 실측이 없어 간추려 지음(그림 바위 너비 약 8m·높이 약 4m, 고래 50여 마리를 포함해 300점 넘는 그림). 실제로는 두 바위가 대곡천을 따라 2km쯤 떨어져 있어요.
   놀이: 고래 그림 찾기(강 건너 전망대 망원경으로 바위 그림 속 고래만 골라 누르기), 발굴 탐지(__DETECT). */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildBangudae(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(7000);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅·대곡천 */
 const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#6f8a46';q.fillRect(0,0,w,h);for(let i=0;i<3600;i++){q.fillStyle=r()<.5?'rgba(80,110,40,.5)':'rgba(150,150,90,.35)';q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
 for(const[z0,z1]of[[-180,-7.2],[7.2,180]]){const gr=new THREE.Mesh(new THREE.PlaneGeometry(360,z1-z0),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.position.set(0,-.02,(z0+z1)/2);gr.receiveShadow=true;G.add(gr)}for(const s of[-1,1]){const bank=new THREE.Mesh(new THREE.BoxGeometry(360,.5,.8),M(0x7a6a52));bank.position.set(0,-.12,s*7.4);G.add(bank)}
 const RW=new THREE.Mesh(new THREE.PlaneGeometry(360,14.5),M(0x3f6f78,{roughness:.12,metalness:.2}));RW.rotation.x=-Math.PI/2;RW.position.set(0,.04,0);G.add(RW);
 const bed=new THREE.Mesh(new THREE.BoxGeometry(360,.6,15),M(0x3a3a30));bed.position.set(0,-.3,0);G.add(bed);
 solids.push({x0:-180,x1:180,y0:-1,y1:1.2,z0:-7.2,z1:7.2});
 /* 물가 자갈 */{const pm=M(0x9a958a);const gm=new THREE.InstancedMesh(new THREE.DodecahedronGeometry(.32,0),pm,260);const o=new THREE.Object3D();for(let i=0;i<260;i++){o.position.set(-150+r()*300,-.05,(r()<.5?-1:1)*(7.3+r()*1.8));o.scale.set(.6+r(),.4+r()*.5,.6+r());o.rotation.set(r()*3,r()*3,r()*3);o.updateMatrix();gm.setMatrixAt(i,o.matrix)}G.add(gm)}
 /* 반구대 절벽: 강 북쪽(+z)으로 높이 솟은 바위 벼랑(울퉁불퉁한 덩어리를 겹쳐 쌓음) */
 const RT=tex(512,512,(q,w,h)=>{q.fillStyle='#857a6a';q.fillRect(0,0,w,h);let y=0;while(y<h){const bh=4+r()*16;const v=110+(r()*50|0);q.fillStyle=`rgb(${v},${v-8},${v-22})`;q.fillRect(0,y,w,bh);y+=bh;q.fillStyle='rgba(40,34,28,.45)';q.fillRect(0,y,w,1.5)}for(let i=0;i<3000;i++){const v=90+(r()*80|0);q.fillStyle=`rgba(${v},${v-6},${v-18},.35)`;q.fillRect(r()*w,r()*h,2+r()*4,1+r()*2)}q.strokeStyle='rgba(30,26,20,.45)';q.lineWidth=2;for(let i=0;i<26;i++){q.beginPath();let x=r()*w,yy=r()*h;q.moveTo(x,yy);for(let k=0;k<4;k++){x+=(r()-.5)*20;yy+=10+r()*30;q.lineTo(x,yy)}q.stroke()}},[2,2]);
 const rockM=new THREE.MeshStandardMaterial({map:RT,roughness:.95,flatShading:true});
 /* 울퉁불퉁한 바위 덩어리: 공 모양을 늘이고 물결 무늬로 흔든 뒤 바닥을 평평하게 */
 const blob=(cx,cy,cz,sx,sy,sz,seed)=>{const g=new THREE.IcosahedronGeometry(1,4);const p=g.attributes.position;const a1=seed*1.7,a2=seed*2.3,a3=seed*.9;for(let k=0;k<p.count;k++){let x=p.getX(k),y=p.getY(k),z=p.getZ(k);const f=1+.13*Math.sin(3.1*x+a1)*Math.sin(3.7*y+a2)+.07*Math.sin(8*z+a3+y*5)+.05*Math.sin(13*y+a1);x*=f*sx;y*=f*sy;z*=f*sz;if(y<-sy*.85)y=-sy*.85;p.setXYZ(k,x,y,z)}g.computeVertexNormals();const m=new THREE.Mesh(g,rockM);m.position.set(cx,cy+sy*.85,cz);m.castShadow=m.receiveShadow=true;G.add(m);return m};
 for(let i=0;i<26;i++){const x=-124+i*9.6+(r()-.5)*3;if(Math.abs(x)<9)continue;const h=10+r()*9+(Math.abs(x)<34?5:0);blob(x,-.6,17+r()*3,7+r()*2.5,h,6.5+r()*2,i+1)}
 /* 그림 바위 둘레: 뒤 큰 바위와 그림 면 위로 처마처럼 튀어나온 바위(실제로 비를 막아 줘 그림이 남았어요) */
 blob(0,-.6,17.5,9,15,7.5,77);blob(-7.6,-.6,12.4,3.2,4.2,3,31);blob(7.6,-.6,12.4,3.2,4.4,3,43);
 {const eave=blob(0,5.1,11.6,6.6,1.1,3.1,59);eave.rotation.x=-.08;const foot=new THREE.Mesh(new THREE.BoxGeometry(10,1.4,2.6),rockM);foot.position.set(0,-.2,9.6);G.add(foot);const back=new THREE.Mesh(new THREE.BoxGeometry(9.4,5.2,1),rockM);back.position.set(0,2.9,9.4);G.add(back)}
 /* 벼랑 위 소나무 */{const tm=M(0x5a4030),lm=M(0x2f5a2c);for(let i=0;i<34;i++){const x=-120+r()*230;const z=19+r()*8;const top=Math.abs(x)<34?20:16;const y=top+r()*3;const t=new THREE.Mesh(new THREE.CylinderGeometry(.2,.32,4,6),tm);t.position.set(x,y+2,z);G.add(t);for(let k=0;k<2;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(2.2-k*.6,2.2,7),lm);c.position.set(x,y+3.6+k*1.2,z);G.add(c)}}}
 /* 그림 면(8m × 4m): 쪼아 새긴 그림을 밝은 점으로 그림. 고래 9마리와 다른 그림을 섞음 */
 const FIG=[];const PW=8,PH=4,PX=0,PY=.9,PZ=8.85;
 const add=(t,u,v,s,a=0)=>FIG.push({t,u,v,s,a});
 /* 고래(위에서 본 모습, 머리가 위) — 찾을 것 */
 add('whale',.12,.42,1.1,-.15);add('whale',.22,.62,.9,.1);add('whaleCalf',.33,.35,1.15,0);add('whale',.47,.55,1.2,.05);add('whaleSpout',.58,.3,1,-.1);
 add('whaleHarpoon',.7,.58,1.1,.12);add('whale',.84,.4,.95,-.05);add('whaleSide',.4,.8,1.1,0);add('whaleSpout',.9,.75,.85,.1);
 /* 다른 그림 */
 add('deer',.08,.18,.9);add('deer',.27,.15,.8);add('deer',.74,.16,.85);add('tiger',.5,.14,.9);add('tiger',.93,.2,.75);add('boar',.17,.85,.8);add('boar',.63,.85,.75);
 add('turtle',.05,.66,.7);add('turtle',.78,.85,.7);add('boat',.3,.9,1);add('boat',.55,.95,.9);add('man',.4,.18,.7);add('man',.97,.5,.6);add('net',.66,.38,.7);add('deer',.88,.95,.7);add('bird',.2,.27,.6);add('seal',.96,.34,.6);add('fish',.02,.9,.6);
 const CW=2048,CH=1024;
 const pc=document.createElement('canvas');pc.width=CW;pc.height=CH;const q=pc.getContext('2d');
 {q.fillStyle='#766a5a';q.fillRect(0,0,CW,CH);for(let i=0;i<26000;i++){const v=90+(r()*60|0);q.fillStyle=`rgba(${v},${v-6},${v-16},.45)`;q.fillRect(r()*CW,r()*CH,2+r()*5,2+r()*4)}
  q.strokeStyle='rgba(28,24,20,.55)';q.lineWidth=3;for(let i=0;i<22;i++){q.beginPath();let x=r()*CW,y=0;q.moveTo(x,y);while(y<CH){x+=(r()-.5)*80;y+=30+r()*60;q.lineTo(x,y)}q.stroke()}
  const g=q.createLinearGradient(0,CH*.82,0,CH);g.addColorStop(0,'rgba(40,46,40,0)');g.addColorStop(1,'rgba(40,52,44,.55)');q.fillStyle=g;q.fillRect(0,0,CW,CH)}
 /* 쪼아 새긴 느낌: 모양을 그린 뒤 그 안을 밝은 점으로 채움 */
 const peck=(draw)=>{const c=document.createElement('canvas');c.width=CW;c.height=CH;const k=c.getContext('2d');k.fillStyle='#fff';k.strokeStyle='#fff';draw(k);const d=k.getImageData(0,0,CW,CH).data;q.save();q.globalCompositeOperation='source-over';const pat=document.createElement('canvas');pat.width=CW;pat.height=CH;const pq=pat.getContext('2d');for(let y=0;y<CH;y+=3)for(let x=0;x<CW;x+=3){const a=d[((y*CW+x)<<2)+3];if(a>100&&r()<.85){const v=168+(r()*50|0);pq.fillStyle=`rgb(${v},${v-10},${v-26})`;pq.fillRect(x+(r()*2|0),y+(r()*2|0),2+(r()*2|0),2+(r()*2|0))}}q.drawImage(pat,0,0);q.restore()};
 const SH={
  whale:(k,s)=>{k.beginPath();k.ellipse(0,0,28*s,78*s,0,0,7);k.fill();k.beginPath();k.moveTo(-6*s,70*s);k.lineTo(-30*s,100*s);k.lineTo(0,90*s);k.lineTo(30*s,100*s);k.lineTo(6*s,70*s);k.fill();for(const sx of[-1,1]){k.beginPath();k.ellipse(sx*30*s,-14*s,7*s,22*s,sx*.6,0,7);k.fill()}},
  whaleCalf:(k,s)=>{SH.whale(k,s);k.save();k.translate(36*s,-44*s);k.beginPath();k.ellipse(0,0,12*s,30*s,.2,0,7);k.fill();k.restore()},
  whaleSpout:(k,s)=>{SH.whale(k,s);k.lineWidth=5*s;for(const a of[-.5,0,.5]){k.beginPath();k.moveTo(0,-80*s);k.quadraticCurveTo(a*30*s,-110*s,a*46*s,-120*s);k.stroke()}},
  whaleHarpoon:(k,s)=>{SH.whale(k,s);k.lineWidth=5*s;k.beginPath();k.moveTo(10*s,-10*s);k.lineTo(70*s,-60*s);k.stroke();k.beginPath();k.moveTo(70*s,-60*s);k.lineTo(140*s,-30*s);k.stroke()},
  whaleSide:(k,s)=>{k.beginPath();k.ellipse(0,0,80*s,24*s,0,0,7);k.fill();k.beginPath();k.moveTo(72*s,-4*s);k.lineTo(104*s,-28*s);k.lineTo(96*s,0);k.lineTo(104*s,26*s);k.fill();k.beginPath();k.ellipse(-20*s,22*s,18*s,6*s,.5,0,7);k.fill()},
  deer:(k,s)=>{k.beginPath();k.ellipse(0,0,44*s,18*s,0,0,7);k.fill();k.beginPath();k.ellipse(48*s,-24*s,12*s,9*s,-.4,0,7);k.fill();k.lineWidth=6*s;k.beginPath();k.moveTo(36*s,-10*s);k.lineTo(46*s,-22*s);k.stroke();for(const x of[-34,-22,24,34]){k.beginPath();k.moveTo(x*s,10*s);k.lineTo(x*s,46*s);k.stroke()}k.lineWidth=4*s;for(const d of[-1,1]){k.beginPath();k.moveTo(48*s,-32*s);k.lineTo((48+d*8)*s,-62*s);k.lineTo((48+d*20)*s,-70*s);k.moveTo((48+d*4)*s,-48*s);k.lineTo((48+d*16)*s,-52*s);k.stroke()}},
  tiger:(k,s)=>{k.beginPath();k.ellipse(0,0,52*s,17*s,0,0,7);k.fill();k.beginPath();k.arc(56*s,-10*s,14*s,0,7);k.fill();k.lineWidth=7*s;for(const x of[-40,-28,28,40]){k.beginPath();k.moveTo(x*s,8*s);k.lineTo(x*s,42*s);k.stroke()}k.beginPath();k.moveTo(-50*s,-4*s);k.quadraticCurveTo(-80*s,-10*s,-84*s,-36*s);k.stroke();k.globalCompositeOperation='destination-out';k.lineWidth=4*s;for(let x=-36;x<40;x+=12){k.beginPath();k.moveTo(x*s,-14*s);k.lineTo((x+4)*s,12*s);k.stroke()}k.globalCompositeOperation='source-over'},
  boar:(k,s)=>{k.beginPath();k.ellipse(0,0,40*s,22*s,0,0,7);k.fill();k.beginPath();k.moveTo(36*s,-10*s);k.lineTo(62*s,4*s);k.lineTo(36*s,12*s);k.fill();k.lineWidth=7*s;for(const x of[-26,-14,16,28]){k.beginPath();k.moveTo(x*s,14*s);k.lineTo(x*s,36*s);k.stroke()}},
  turtle:(k,s)=>{k.beginPath();k.ellipse(0,0,30*s,38*s,0,0,7);k.fill();k.beginPath();k.arc(0,-46*s,10*s,0,7);k.fill();for(const sx of[-1,1])for(const sy of[-1,1]){k.beginPath();k.ellipse(sx*32*s,sy*24*s,12*s,6*s,sx*sy*.6,0,7);k.fill()}},
  boat:(k,s)=>{k.lineWidth=8*s;k.beginPath();k.moveTo(-80*s,-10*s);k.quadraticCurveTo(0,30*s,80*s,-16*s);k.stroke();k.lineWidth=5*s;for(let x=-56;x<=56;x+=14){k.beginPath();k.moveTo(x*s,4*s);k.lineTo(x*s,-22*s);k.stroke()}},
  man:(k,s)=>{k.lineWidth=7*s;k.beginPath();k.arc(0,-50*s,10*s,0,7);k.fill();k.beginPath();k.moveTo(0,-40*s);k.lineTo(0,10*s);k.moveTo(-26*s,-48*s);k.lineTo(-14*s,-24*s);k.lineTo(14*s,-24*s);k.lineTo(26*s,-48*s);k.moveTo(0,10*s);k.lineTo(-14*s,44*s);k.moveTo(0,10*s);k.lineTo(14*s,44*s);k.stroke()},
  net:(k,s)=>{k.lineWidth=4*s;k.beginPath();for(let i=0;i<=5;i++){k.moveTo((-40+i*16)*s,-40*s);k.lineTo((-40+i*16)*s,40*s);k.moveTo(-40*s,(-40+i*16)*s);k.lineTo(40*s,(-40+i*16)*s)}k.stroke()},
  bird:(k,s)=>{k.beginPath();k.ellipse(0,0,24*s,10*s,0,0,7);k.fill();k.lineWidth=5*s;k.beginPath();k.moveTo(-10*s,0);k.lineTo(-30*s,-34*s);k.moveTo(10*s,0);k.lineTo(30*s,-34*s);k.stroke()},
  seal:(k,s)=>{k.beginPath();k.ellipse(0,0,16*s,40*s,0,0,7);k.fill();k.beginPath();k.moveTo(-4*s,36*s);k.lineTo(-16*s,54*s);k.lineTo(16*s,54*s);k.lineTo(4*s,36*s);k.fill()},
  fish:(k,s)=>{k.beginPath();k.ellipse(0,0,36*s,13*s,0,0,7);k.fill();k.beginPath();k.moveTo(30*s,0);k.lineTo(50*s,-16*s);k.lineTo(50*s,16*s);k.fill()}};
 peck(k=>{for(const f of FIG){k.save();k.translate(f.u*CW,f.v*CH);k.rotate(f.a);SH[f.t](k,f.s*1.25);k.restore()}});
 const PT=new THREE.CanvasTexture(pc);PT.colorSpace=THREE.SRGBColorSpace;PT.anisotropy=8;
 const panelM=new THREE.MeshStandardMaterial({map:PT,roughness:.9});
 const panel=new THREE.Mesh(new THREE.PlaneGeometry(PW,PH),panelM);panel.position.set(PX,PY+PH/2,PZ);panel.rotation.y=Math.PI;panel.receiveShadow=true;G.add(panel);
 /* 그림 자리 → 세상 자리(강 쪽에서 보면 그림 왼쪽이 +x) */
 const figW=f=>new THREE.Vector3(PX+PW/2-f.u*PW,PY+PH-f.v*PH,PZ-.05);
 /* 강 남쪽 둔치: 전망대·망원경 */
 const WD=M(0x8a6a48);
 {const deck=new THREE.Mesh(new THREE.BoxGeometry(14,.5,6),WD);deck.position.set(0,.25,-24);deck.castShadow=deck.receiveShadow=true;G.add(deck);solids.push({x0:-7,x1:7,y0:0,y1:.5,z0:-27,z1:-21});
  for(const x of[-6.8,6.8])for(const z of[-21.2,-26.8]){const p=new THREE.Mesh(new THREE.BoxGeometry(.18,1.2,.18),WD);p.position.set(x,1,z);G.add(p)}
  const rail=new THREE.Mesh(new THREE.BoxGeometry(14,.12,.12),WD);rail.position.set(0,1.55,-21.1);G.add(rail);
  for(const x of[-3,0,3]){const t=new THREE.Group();t.position.set(x,.5,-21.8);const leg=new THREE.Mesh(new THREE.CylinderGeometry(.06,.1,1.2,8),M(0x3a3a3a,{metalness:.5}));leg.position.y=.6;t.add(leg);const tb=new THREE.Mesh(new THREE.CylinderGeometry(.11,.16,.6,12),M(0x2a4a6a,{metalness:.4,roughness:.4}));tb.rotation.x=Math.PI/2-.08;tb.position.y=1.3;t.add(tb);G.add(t);cam.push(tb)}
  const sb=new THREE.Mesh(new THREE.BoxGeometry(2.2,1.1,.12),M(0x5a3a22));sb.position.set(-8.5,1.1,-22);G.add(sb)}
 /* 둔치 길 */{const PTX=tex(256,256,(q,w,h)=>{q.fillStyle='#b9a582';q.fillRect(0,0,w,h);for(let i=0;i<1600;i++){q.fillStyle=r()<.5?'rgba(140,120,90,.5)':'rgba(210,200,170,.4)';q.fillRect(r()*w,r()*h,3,3)}},[2,40]);const p=new THREE.Mesh(new THREE.PlaneGeometry(4,150),new THREE.MeshStandardMaterial({map:PTX,roughness:1}));p.rotation.x=-Math.PI/2;p.rotation.z=Math.PI/2;p.position.set(-30,.01,-16);G.add(p);const p2=new THREE.Mesh(new THREE.PlaneGeometry(3.4,30),new THREE.MeshStandardMaterial({map:PTX,roughness:1}));p2.rotation.x=-Math.PI/2;p2.position.set(0,.01,-38);G.add(p2)}
 /* 천전리 각석(실측): 상류 쪽 둔치. 실제로는 2km쯤 위쪽 대곡천 가 */
 const CJX=-72,CJZ=-14;
 {const fm=M(0x6a4a30);for(let i=0;i<12;i++){const a=-.2+i/11*Math.PI*.9+Math.PI*.05;const p=new THREE.Mesh(new THREE.BoxGeometry(.1,.8,.1),fm);p.position.set(CJX+Math.cos(a)*7.5,.4,CJZ-Math.sin(a)*4.5-1);G.add(p)}
  solids.push({x0:CJX-5.4,x1:CJX+5.4,y0:0,y1:2.9,z0:CJZ-.5,z1:CJZ+.5});
  if(!mini){const gl=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(dr);
   gl.load(new URL('../models/bangudae/cheonjeon.glb',import.meta.url).href,m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=e.receiveShadow=true;if(e.material){e.material.roughness=.9;e.material.metalness=0;e.material.transparent=false;e.material.alphaTest=0}cam.push(e)}});const b=new THREE.Box3().setFromObject(o);const c=b.getCenter(new THREE.Vector3());o.position.set(-c.x,-b.min.y,-c.z);const p=new THREE.Group();p.add(o);p.position.set(CJX,0,CJZ);p.rotation.y=Math.PI;p.userData.noBatch=true;o.userData.noBatch=true;G.add(p);window.__CJ=p},undefined,()=>{})}}
 /* 소나무 몇 그루(둔치) */{const tm=M(0x5a4030),lm=M(0x2f5a2c);for(const[x,z]of[[-40,-30],[-52,-40],[30,-34],[44,-28],[58,-40],[-96,-30],[-20,-50],[22,-56],[70,-20],[-110,-14]]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.25,.4,6,7),tm);t.position.set(x,3,z);t.castShadow=true;G.add(t);for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(2.6-k*.6,2.4,8),lm);c.position.set(x,5.4+k*1.3,z);c.castShadow=true;G.add(c)}solids.push({cx:x,cz:z,r:.6,y0:0,y1:8})}}
 /* 밤: 그림 바위에 은은한 조명, 전망대 등 */
 const NL=[];if(!mini){for(const x of[-3,3]){const L=new THREE.SpotLight(0xffd8a0,0,30,.45,.6,1.2);L.position.set(x,.6,4);L.target.position.set(x*.3,3,PZ);G.add(L,L.target);NL.push({L,k:28})}
  for(const x of[-6.4,6.4]){const lp=new THREE.Mesh(new THREE.SphereGeometry(.18,10,8),new THREE.MeshStandardMaterial({color:0xffe0a0,emissive:0x000000}));lp.position.set(x,1.8,-21.2);G.add(lp);const L=new THREE.PointLight(0xffc080,0,12,1.5);L.position.set(x,1.9,-21.4);G.add(L);NL.push({L,k:5,lp})}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const l of NL){l.L.intensity=nk*l.k;if(l.lp)l.lp.material.emissive.setRGB(nk,nk*.8,nk*.5)}};
 /* 안내 자리 */
 spots.push({x:0,y:.5,z:-22.8,r:3,t:'반구대 암각화 전망대',h:'강 건너 절벽 아래에 신석기 끝 무렵부터 새긴 그림 바위가 있어요(국보). 너비 8m쯤 되는 바위 면에 고래·사슴·호랑이·배와 사람 등 300점 넘는 그림이 있어요. 고래만 50마리가 넘어, 세계에서 가장 오래된 고래잡이 그림 가운데 하나로 꼽혀요. 간추려 지었어요.'});
 spots.push({x:-3,y:.5,z:-21.6,r:1.6,t:'고래 그림 망원경',h:'망원경으로 바위 그림을 보며 고래 그림만 찾아 봐요.'});
 spots.push({x:CJX+7,y:0,z:CJZ-6,r:3.4,t:'천전리 각석',h:'대곡천 상류의 큰 바위예요(국보). 위쪽엔 마름모·동그라미 같은 무늬와 사람 얼굴이, 아래쪽엔 신라 법흥왕 때(525·539) 왕족이 이 골짜기 「서석곡」에 다녀간 글이 새겨져 있어요. 반구대 암각화와 함께 2025년 「반구천의 암각화」로 세계유산이 됐어요. 실측 3D(Arqueomodel3D, CC BY)를 실제 크기로 놓았어요.'});
 spots.push({x:16,y:0,z:-10,r:3,t:'대곡천과 사연댐',h:'1965년 아래쪽에 사연댐을 막은 뒤로 비가 많이 오면 그림 바위가 물에 잠겨요. 물에 잠겼다 드러나기를 되풀이하며 그림이 닳아, 물길을 바꾸어 바위를 지키는 일이 계속되고 있어요.'});
 spots.push({x:26,y:0,z:-26,r:2.4,t:'발굴 탐지 자리',h:'반구천 둔치에 옛 사람들의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.'});
 /* 고래 그림 찾기(11/21): 망원경으로 바위 그림을 크게 보며 고래만 골라 누르기. 90초 */
 window.__BGWHALE=()=>{if(document.getElementById('bgP'))return;const H=window.__H3,ctx=H.ctx();try{H.tp(0,-22.6,.5);H.face(0)}catch(e){}
  const WH=FIG.filter(f=>f.t.startsWith('whale')),N=WH.length,TL=90;const g=new THREE.Group();G.add(g);
  const CP=new THREE.Vector3(0,2.3,-21.6),LK=new THREE.Vector3(0,PY+PH/2,PZ);const dist=CP.distanceTo(LK);
  const fovFor=()=>{const asp=innerWidth/innerHeight;const needH=Math.max(PH*1.25,PW*1.12/asp);return 2*Math.atan(needH/2/dist)*180/Math.PI};
  let zoom=true,rst=false;window.__GCAM=()=>{if(document.getElementById('bgP')&&zoom)return[CP.x,CP.y,CP.z,LK.x,LK.y,LK.z,fovFor()];if(!rst){rst=true;return[CP.x,CP.y,CP.z-.01,LK.x,LK.y,LK.z,innerWidth/innerHeight<.8?68:55]}return null};
  const pcam=new THREE.PerspectiveCamera(50,1,.1,100);
  const d=document.createElement('div');d.id='bgP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1e2a30;border:3px solid #8ac8e0;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef6f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  let n=0,done=false,miss=0,t0=performance.now()/1000;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#bfe8f8">🐋 고래 그림 찾기</b><div id="bgS" style="font:20px 'Do Hyeon',sans-serif;margin:4px 0">0 / ${N}</div><div id="bgG" style="font-size:13px;color:#bfe8f8">바위 그림에서 고래만 눌러요</div><div id="bgT" style="font-size:13px">${TL}초</div><div style="font-size:12px;opacity:.85">사슴·호랑이·거북·배는 고래가 아니에요. 고래는 대부분 위에서 본 모습(머리가 위)으로 새겨졌어요.</div>`;const Sx=d.querySelector('#bgS'),Gd=d.querySelector('#bgG'),T=d.querySelector('#bgT');
  const ring=(f,col)=>{const p=figW(f);const m=new THREE.Mesh(new THREE.RingGeometry(.32*f.s,.4*f.s,32),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.9,depthWrite:false,side:THREE.DoubleSide}));m.position.copy(p);m.position.z-=.04;m.rotation.y=Math.PI;g.add(m);return m};
  const tone=(f0,f1,len)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='sine';o.frequency.setValueAtTime(f0,s);o.frequency.exponentialRampToValueAtTime(f1,s+len);gg.gain.setValueAtTime(.08,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len+.05);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.08)}catch(e){}};
  const NAME={deer:'사슴',tiger:'호랑이',boar:'멧돼지',turtle:'거북',boat:'배',man:'사람',net:'그물',bird:'새',seal:'물개',fish:'물고기'};
  const pick=(ev)=>{if(done||!zoom)return;if(ev.target&&ev.target.closest&&ev.target.closest('#bgP'))return;const k=window.__GCAM&&window.__GCAM();if(!k)return;pcam.fov=k[6];pcam.aspect=innerWidth/innerHeight;pcam.position.set(k[0],k[1],k[2]);pcam.lookAt(k[3],k[4],k[5]);pcam.updateMatrixWorld(true);pcam.updateProjectionMatrix();
   const mx=ev.clientX,my=ev.clientY;let best=null,bd=1e9;for(const f of FIG){if(f.found)continue;const v=figW(f).project(pcam);const sx=(v.x+1)/2*innerWidth,sy=(1-v.y)/2*innerHeight;const pxPerM=innerHeight/(2*Math.tan(k[6]*Math.PI/360)*dist);const rad=.42*f.s*pxPerM;const dd=Math.hypot(sx-mx,sy-my);if(dd<rad&&dd<bd){bd=dd;best=f}}
   if(!best)return;if(best.t.startsWith('whale')){best.found=true;ring(best,0x7af0a0);n++;tone(520,880,.25);Sx.textContent=n+' / '+N;const tip={whaleCalf:'새끼를 업은 어미 고래예요!',whaleSpout:'물을 뿜는 고래예요!',whaleHarpoon:'작살이 꽂힌 고래예요. 고래잡이 장면이에요.',whaleSide:'옆에서 본 고래예요.'}[best.t]||'고래예요!';Gd.textContent=tip;if(n>=N)fin()}
   else{miss++;tone(300,160,.2);const m=ring(best,0xff6a5a);setTimeout(()=>g.remove(m),700);Gd.textContent='그건 '+(NAME[best.t]||'다른 그림')+'이에요'}};
  addEventListener('pointerdown',pick,true);
  const fin=()=>{if(done)return;done=true;const el=performance.now()/1000-t0;const Q=n>=N?Math.max(60,Math.round(100-Math.max(0,el-40)*.5-miss*4)):Math.round(n/N*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('bangudae_whale',Q,'반구대 고래 그림 찾기')}catch(e){}window.__BGQ=Q;
   setTimeout(()=>{if(!d.isConnected)return;zoom=false;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#bfe8f8">${n>=N?'고래를 다 찾았어요!':N+'마리 중 '+n+'마리'}</b><div style="font-size:13px;margin:4px 0">진짜 반구대 암각화엔 고래가 50마리 넘게 있어요. 새끼 업은 고래, 작살 맞은 고래, 배를 탄 고래잡이까지 7천 년쯤 전 바닷가 사람들의 삶이 바위에 남았어요.</div><div style="font-size:26px;color:#8ac8e0">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#8ac8e0;color:#10202a;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef6f8;border:2px solid #eef6f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__BGWHALE(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},700)};
  const loop=()=>{if(!d.isConnected){G.remove(g);removeEventListener('pointerdown',pick,true);for(const f of FIG){f.found=false;f.hint=null}return}const now=performance.now()/1000;if(!done){const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin();if(left<40&&!WH.every(f=>f.found)){for(const f of WH)if(!f.found&&!f.hint){f.hint=ring(f,0xffe080);f.hint.material.opacity=.0}for(const f of WH)if(f.hint&&!f.found)f.hint.material.opacity=.15+Math.sin(now*4)*.12;else if(f.hint)f.hint.visible=false}}requestAnimationFrame(loop)};loop();
  window.__BGG={FIG,WH,get n(){return n},fig:figW,tap:(f)=>{const k=window.__GCAM();pcam.fov=k[6];pcam.aspect=innerWidth/innerHeight;pcam.position.set(k[0],k[1],k[2]);pcam.lookAt(k[3],k[4],k[5]);pcam.updateMatrixWorld(true);pcam.updateProjectionMatrix();const v=figW(f).project(pcam);pick({clientX:(v.x+1)/2*innerWidth,clientY:(1-v.y)/2*innerHeight,target:document.body})}};
  try{ctx.say('강 건너 바위에 새긴 그림이에요. 망원경으로 보며 고래만 찾아 봐요!',3)}catch(e){}};
 /* 발굴 탐지 */
 const mkObj=(fn)=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'뼈 작살',h:'고래 뼈를 갈아 만든 작살 촉이에요. 근처 울산 황성동 유적에서 고래 뼈에 꽂힌 뼈 작살이 나와, 신석기 사람들이 정말 고래를 잡았다는 걸 보여 줬어요.',mk:mkObj(g=>{const m=new THREE.Mesh(new THREE.ConeGeometry(.06,.6,6),M(0xe8dcc0));m.rotation.z=Math.PI/2;g.add(m);for(const s of[-1,1]){const b=new THREE.Mesh(new THREE.BoxGeometry(.12,.03,.03),M(0xe8dcc0));b.position.set(.05,s*.05,0);b.rotation.z=s*.6;g.add(b)}})},
  {n:'빗살무늬 토기 조각',h:'신석기 사람들이 빗처럼 금을 그어 무늬를 낸 토기 조각이에요.',mk:mkObj(g=>{const c=document.createElement('canvas');c.width=c.height=64;const k=c.getContext('2d');k.fillStyle='#8a6a4a';k.fillRect(0,0,64,64);k.strokeStyle='#4a3424';k.lineWidth=2;for(let i=-64;i<64;i+=8){k.beginPath();k.moveTo(i,0);k.lineTo(i+32,64);k.stroke()}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const m=new THREE.Mesh(new THREE.CylinderGeometry(.3,.26,.36,10,1,true,0,1.6),new THREE.MeshStandardMaterial({map:t,side:THREE.DoubleSide,roughness:.9}));g.add(m)})},
  {n:'돌 그물추',h:'그물 끝에 매달던 돌추예요. 양쪽을 오목하게 깎아 줄을 묶었어요.',mk:mkObj(g=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.16,12,10),M(0x7a7468));m.scale.set(1.3,.7,1);g.add(m);const t=new THREE.Mesh(new THREE.TorusGeometry(.12,.015,6,20),M(0x9a8a60));t.rotation.y=Math.PI/2;g.add(t)})},
  {n:'돌 쪼기 도구',h:'단단한 돌로 바위를 톡톡 쪼아 그림을 새겼어요. 이런 돌망치로 그림 선을 만들었을 거예요.',mk:mkObj(g=>{const m=new THREE.Mesh(new THREE.DodecahedronGeometry(.16,0),M(0x5a5a58));m.scale.set(1.4,.9,.9);g.add(m)})},
  {n:'간 돌 화살촉',h:'돌을 갈아 날카롭게 만든 화살촉이에요. 사슴과 멧돼지를 사냥했어요.',mk:mkObj(g=>{const m=new THREE.Mesh(new THREE.ConeGeometry(.08,.3,3),M(0x3a3a3e,{roughness:.5}));m.rotation.z=-Math.PI/2;m.scale.set(1,1,.3);g.add(m)})}];
 window.__BGDIG=()=>{window.__DETECT&&window.__DETECT({key:'bangudae_dig',title:'반구천 발굴 탐지',emoji:'⛏️',bg:'#1e2a2a',count:4,TL:150,cand:[[20,-30],[34,-22],[40,-44],[12,-48],[-14,-34],[-24,-46],[-46,-22],[-58,-34],[52,-14],[-86,-26]],items:ITEMS,intro:'반구천 둔치에 바위 그림을 새긴 사람들의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'고래 그림을 새긴 사람들은 바다와 강에서 고래·물고기를 잡고, 숲에서 사슴을 사냥하며 살았어요.'})};
 const meta={quest:{t:'반구천 암각화 둘러보기',d:'두 그림 바위를 둘러보세요.',steps:[['전망대','반구대 암각화 전망대'],['천전리','천전리 각석'],['사연댐','대곡천과 사연댐']]},
  title:'울산 반구천의 암각화',hint:'강 건너 절벽 아래 바위에 7천 년쯤 전 사람들이 고래를 새겼어요. 망원경으로 고래 그림을 찾고, 상류 쪽 천전리 각석(실측)도 보러 가요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,sign:{x:16,z:-36,lines:['울산 반구천의 암각화','국보 · 세계유산(2025)','반구대 암각화 · 천전리 각석','천전리 각석 실측 · 반구대 간추려 지음']}},
  npc:[['science',[[-10,-32],[10,-32],[10,-40],[-10,-40]]]],bounds:[-130,90,-70,7],level:()=>'반구천',camCap:()=>Infinity,baseAt:()=>0,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.3,ox:-20,oz:-10,draw(g,X,Z,S){g.fillStyle='#6f8a46';g.fillRect(0,0,300,300);g.fillStyle='#3f6f78';g.fillRect(0,Z(7),300,14*S);g.fillStyle='#6e6558';g.fillRect(0,0,300,Z(9));g.fillStyle='#c8b080';g.fillRect(X(-2),Z(9.2),4*S,3);g.fillStyle='#8a6a48';g.fillRect(X(-7),Z(-21),14*S,6*S);g.fillStyle='#d8c8a0';g.fillRect(X(CJX-5),Z(CJZ+.5),10*S,2)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:-44,yaw:0},size:{}},meta)}
