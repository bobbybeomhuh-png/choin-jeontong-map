/* 경주 신라 유산 마당(실제 크기). 단위 1 = 1m, 입구는 +z(남쪽), 안쪽이 -z.
   갱신 2026-11-12. 국가유산청(KOREA HERITAGE SERVICE) 공개 3D 모델(CC BY 4.0): 성덕대왕신종, 경주 인왕동 사지 서 삼층석탑,
   김유신 묘, 천마총 금관, 금동반가사유상, 얼굴무늬 수막새. 첨성대는 공개 실측값(높이 9.17m, 몸통 27단, 밑지름 약 4.9m)으로 쌓음.
   크기: 신종 3.66m, 금관 32.5cm(드리개 포함 약 44cm), 반가사유상 93.5cm, 수막새 지름 11.5cm(유리장 안은 6배 확대). */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,noise,mulb,materials,hipRoof} from './sungnyemun.js';
const MURL=k=>new URL('../models/gyeongju/'+k+'.glb',import.meta.url).href;
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
export function buildGyeongju(opts={}){const mini=!!opts.mini;const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(57);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
 const add=(o,x,y,z,col=true)=>{o.position.set(x,y,z);G.add(o);if(col)o.traverse(m=>{if(m.isMesh)cam.push(m)});return o};
 const gl=new GLTFLoader();
 /* 모델 하나를 실제 높이 h(m)에 맞춰 바닥(y)에 세운다. fit:'h' 높이 맞춤 / 'none' 원래 크기 */
 function place(k,{x,y=0,z,h=null,ry=0,scale=null,onload,raw=null}={}){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry;G.add(g);if(mini&&k==='crown')return g;
  gl.load(MURL(k),m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;e.receiveShadow=true;if(e.material){e.material.metalness=Math.min(e.material.metalness??0,.5)}}});o.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o),s=b.getSize(V(0,0,0));const sc=scale||(h?h/s.y:1);o.scale.setScalar(sc);if(raw)o.position.set(raw[0],raw[1],raw[2]);else o.position.set(-(b.min.x+b.max.x)/2*sc,-b.min.y*sc,-(b.min.z+b.max.z)/2*sc);g.add(o);if(!mini)o.traverse(e=>{if(e.isMesh)cam.push(e)});onload&&onload(o,sc,s)},undefined,e=>console.warn('모델 못 불러옴',k,e));return g}
 /* ---------- 바닥: 잔디, 흙길, 낮은 돌담 ---------- */
 const PATH=tex(256,256,(q,w,h)=>{q.fillStyle='#c9b48a';q.fillRect(0,0,w,h);noise(q,w,h,4000,['rgba(0,0,0,.06)','rgba(255,255,255,.08)','rgba(120,90,50,.08)'],2)});PATH.wrapS=PATH.wrapT=THREE.RepeatWrapping;
 const pathM=new THREE.MeshStandardMaterial({map:PATH,roughness:1});
 const lane=(x0,z0,x1,z1,w)=>{const len=Math.hypot(x1-x0,z1-z0);const t=PATH.clone();t.needsUpdate=true;t.repeat.set(w/4,len/4);const m=new THREE.Mesh(new THREE.PlaneGeometry(w,len),new THREE.MeshStandardMaterial({map:t,roughness:1}));m.rotation.x=-Math.PI/2;m.rotation.z=-Math.atan2(x1-x0,z1-z0)+Math.PI;m.position.set((x0+x1)/2,.03,(z0+z1)/2);m.receiveShadow=true;G.add(m)};
 lane(0,24,0,-62,5);lane(-26,-6,26,-6,4);lane(-26,-6,-26,-36,4);lane(26,-6,26,-30,4);
 /* ---------- 첨성대: 공개 실측값으로 쌓기 ---------- */
 {const CH=new THREE.Group();CH.position.set(-26,0,-40);G.add(CH);const GR=M(0xc9c0ae),GRd=M(0xb3aa98);
  const STN=tex(512,256,(q,w,h)=>{q.fillStyle='#b9b09e';q.fillRect(0,0,w,h);for(let x=0;x<w;x+=34+((x/34)%3)*4){const g=175+(r()*30|0);q.fillStyle=`rgb(${g},${g-6},${g-16})`;q.fillRect(x+2,3,30+((x/34)%3)*4,h-6)}noise(q,w,h,3000,['rgba(0,0,0,.08)','rgba(255,255,255,.08)'],2)});STN.wrapS=THREE.RepeatWrapping;
  /* 기단 2단(정사각) */const b1=box(5.36,.4,5.36,GRd);b1.position.y=.2;CH.add(b1);const b2=box(5.02,.38,5.02,GR);b2.position.y=.59;CH.add(b2);
  /* 몸통 27단: 밑지름 4.93m → 윗지름 2.85m, 아래쪽이 살짝 부푼 병 모양 */const H0=.78,CN=27,ch=.3;let y=H0;const JT=new THREE.MeshStandardMaterial({color:0x6e6658,roughness:1});
  for(let i=0;i<CN;i++){const t=i/(CN-1);const rad=(2.465-(2.465-1.425)*Math.pow(t,1.25))*(1+.035*Math.sin(Math.min(1,t*1.6)*Math.PI));const rad2=(2.465-(2.465-1.425)*Math.pow(Math.min(1,(i+1)/(CN-1)),1.25))*(1+.035*Math.sin(Math.min(1,(i+1)/(CN-1)*1.6)*Math.PI));const tt=STN.clone();tt.needsUpdate=true;tt.repeat.set(Math.round(rad*6.28/1.1)/15,1);
   const c=new THREE.Mesh(new THREE.CylinderGeometry(Math.min(rad,rad2)+.02,rad,ch,40,1,false),new THREE.MeshStandardMaterial({map:tt,roughness:.95}));c.position.y=y+ch/2;c.castShadow=c.receiveShadow=true;CH.add(c);if(i){const jt=new THREE.Mesh(new THREE.CylinderGeometry(rad+.025,rad+.025,.035,40,1,true),JT);jt.position.y=y;CH.add(jt)}y+=ch}
  /* 남쪽 네모 창(13~15단, 약 1m) */const win=new THREE.Mesh(new THREE.PlaneGeometry(.95,.95),M(0x1d1814));const wy=H0+13*ch+.45,wr=2.465-(2.465-1.425)*Math.pow(13.5/26,1.25);win.position.set(0,wy,wr*1.035+.01);CH.add(win);
  /* 꼭대기 정자석 2단(井자 틀) */for(const[k,yy]of[[0,y],[1,y+.32]]){for(const s of[-1,1]){const a=box(3.06,.3,.32,GR);a.position.set(0,yy+.15,s*1.37);CH.add(a);const b=box(.32,.3,3.06,GR);b.position.set(s*1.37,yy+.15,0);CH.add(b)}}
  CH.traverse(o=>{if(o.isMesh)cam.push(o)});solids.push({cx:-26,cz:-40,r:2.75,y0:0,y1:20});
  spots.push({x:-26,y:0,z:-35.6,r:2.4,t:'첨성대',h:'신라 선덕여왕(재위 632~647) 때 쌓은 천문대로, 지금 남아 있는 동양에서 가장 오래된 천문대로 꼽혀요. 높이 약 9.17m, 둥근 몸통은 돌 27단이고 남쪽 가운데에 네모 창이 있어요. 꼭대기에는 우물 정(井) 자 모양 돌이 두 단 얹혀 있어요. 이 모형은 공개된 실측값으로 쌓았어요.'})}
 /* ---------- 성덕대왕신종과 종각 ---------- */
 {const BX=26,BZ=-38;const pil=M(0x8a3a2a);for(const sx of[-1,1])for(const sz of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.22,.26,5.6,12),pil);p.position.set(BX+sx*3.2,2.8,BZ+sz*3.2);p.castShadow=true;G.add(p);solids.push({cx:BX+sx*3.2,cz:BZ+sz*3.2,r:.32,y0:0,y1:9})}
  const fl=box(8.4,.35,8.4,M(0xb3aa98));fl.position.set(BX,.17,BZ);G.add(fl);S(BX-4.2,BX+4.2,0,.35,BZ-4.2,BZ+4.2);
  const beam=box(7.2,.45,.45,M(0x3d6a52));beam.position.set(BX,5.4,BZ);G.add(beam);
  if(!mini){const rf=hipRoof(MT,5.4,5.4,1.6,5.8,8.2,.6,.2,{plain:true,rs:.6});rf.position.set(BX,0,BZ);rf.traverse(o=>{if(o.isMesh)o.castShadow=true});G.add(rf)}
  place('bell',{x:BX,y:5.2-3.75,z:BZ,h:3.75});
  spots.push({x:BX,y:.35,z:BZ+3.4,r:2.6,t:'성덕대왕신종',h:'771년 신라 혜공왕 때 완성한 큰 종으로, 높이 3.66m, 무게 약 18.9톤이에요. 아기를 넣어 만들었다는 슬픈 전설 때문에 "에밀레종"이라고도 불려요. 종 위의 용뉴(용 모양 고리)와 소리를 울리는 음통, 몸통의 비천상이 아름다워요. (3D: 국가유산청)'})}
 /* ---------- 인왕동 사지 서 삼층석탑 ---------- */
 place('pagoda',{x:0,z:-30,h:5.38});solids.push({cx:0,cz:-30,r:1.9,y0:0,y1:9});
 spots.push({x:0,y:0,z:-26.4,r:2.2,t:'경주 인왕동 사지 서 삼층석탑',h:'경주 인왕동 절터에 남은 통일신라 삼층석탑이에요. 기단 면에 신장(神將)을 돋을새김했어요. 이 탑은 국가유산청이 3D로 기록한 그대로예요. (3D: 국가유산청)'});
 /* ---------- 김유신 묘(맨 안쪽) ---------- */
 /* 원본 좌표의 땅 높이가 y=-1.2, 봉분 꼭대기 약 4.0(높이 5.2m, 실제 약 5.3m) → 땅을 0에 맞추고, 봉분 가운데(원본 z≈-10)를 z=-82에 둔다 */place('kimyusin',{x:0,z:-72,scale:1,raw:[0,1.15,0]});
 solids.push({cx:0,cz:-82,r:9.6,y0:0,y1:30});
 spots.push({x:0,y:0,z:-63,r:3,t:'김유신 묘',h:'삼국 통일을 이끈 신라 장군 김유신(595~673)의 무덤이에요. 둥근 봉분 둘레를 십이지신상이 새겨진 둘레돌이 감싸고, 그 밖을 돌난간이 둘러요. 실제 크기 3D 스캔 그대로예요. (3D: 국가유산청)'});
 /* ---------- 유물 전시관(유리장 셋) ---------- */
 {const HX=-3,HZ=8,W=14,D=8;/* 입구 오른쪽(동쪽)에 놓되 길을 막지 않게 */const hx=14,hz=6;const wall=M(0xf2ede2),wood=M(0x6b4a2e),red=M(0x8a3a2a);
  const base=box(W+1,.45,D+1,M(0xb3aa98));base.position.set(hx,.22,hz);G.add(base);S(hx-(W+1)/2,hx+(W+1)/2,0,.45,hz-(D+1)/2,hz+(D+1)/2);
  for(const sx of[-1,1]){const w=box(.2,3.2,D,wall);w.position.set(hx+sx*W/2,2.05,hz);G.add(w);S(hx+sx*W/2-.15,hx+sx*W/2+.15,0,4,hz-D/2,hz+D/2)}
  {const w=box(W,3.2,.2,wall);w.position.set(hx,2.05,hz-D/2);G.add(w);S(hx-W/2,hx+W/2,0,4,hz-D/2-.15,hz-D/2+.15)}
  for(const sx of[-1,1]){const w=box(W/2-2,3.2,.2,wall);w.position.set(hx+sx*(W/4+1),2.05,hz+D/2);G.add(w);S(hx+sx*1.9,hx+sx*W/2,0,4,hz+D/2-.15,hz+D/2+.15)}
  for(const[a,b]of[[-W/2,-D/2],[W/2,-D/2],[-W/2,D/2],[W/2,D/2],[-1.9,D/2],[1.9,D/2]]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.18,.2,3.4,10),red);p.position.set(hx+a,2.1,hz+b);p.castShadow=true;G.add(p)}
  if(!mini){const rf=hipRoof(MT,W/2+1.4,D/2+1.4,W/2-2.5,3.65,6.2,.5,.2,{plain:true,rs:.6});rf.position.set(hx,0,hz);rf.traverse(o=>{if(o.isMesh)o.castShadow=true});G.add(rf);const ceil=box(W,.1,D,M(0x5a3a22));ceil.position.set(hx,3.62,hz);G.add(ceil)}
  /* 현판 */{const cv=document.createElement('canvas');cv.width=512;cv.height=160;const q=cv.getContext('2d');q.fillStyle='#2a1a10';q.fillRect(0,0,512,160);q.strokeStyle='#d8a838';q.lineWidth=8;q.strokeRect(6,6,500,148);q.fillStyle='#f2d27a';q.textAlign='center';q.font='bold 70px "Noto Serif KR",serif';q.fillText('신라 보물관',256,104);const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;const pl=new THREE.Mesh(new THREE.PlaneGeometry(2.6,.8),new THREE.MeshBasicMaterial({map:t}));pl.position.set(hx,3.25,hz+D/2+.12);G.add(pl)}
  /* 유리장 셋 */const glass=new THREE.MeshPhysicalMaterial({color:0xffffff,transmission:.9,roughness:.05,transparent:true,opacity:.25,depthWrite:false});const ped=M(0x3b2414);
  const lamp=new THREE.PointLight(0xfff0d8,10,9,1.6);lamp.position.set(hx,3.2,hz);G.add(lamp);G.userData.inLights=[lamp];
  const cases=[{k:'crown',x:hx,z:hz-1.6,h:.44,t:'천마총 금관',d:'경주 천마총에서 나온 신라 금관(5~6세기)이에요. 높이 32.5cm, 나뭇가지 모양 세움장식 셋과 사슴뿔 모양 둘에 곱은옥과 달개가 주렁주렁 달려 있어요. 실제 크기로 놓았어요. (3D: 국가유산청)'},{k:'bansa',x:hx-4.2,z:hz,h:.935,t:'금동반가사유상',d:'한쪽 다리를 무릎에 얹고 손가락을 뺨에 댄 채 생각에 잠긴 금동 불상이에요(삼국시대, 높이 93.5cm). 실제 크기로 놓았어요. (3D: 국가유산청)'},{k:'sumaksae',x:hx+4.2,z:hz,h:.152*6/0.152*0.115/1,t:'얼굴무늬 수막새',d:'"신라의 미소"로 불리는 기와 끝 장식이에요. 실제 지름은 11.5cm라, 유리장 안에는 6배로 키워 놓았어요. 웃는 눈과 입이 손으로 빚은 듯 부드러워요. (3D: 국가유산청)'}];
  for(const c of cases){const pd=box(1.3,1.0,1.3,ped);pd.position.set(c.x,.45+.5,c.z);G.add(pd);const gb=new THREE.Mesh(new THREE.BoxGeometry(1.2,1.25,1.2),glass);gb.position.set(c.x,1.45+.63,c.z);G.add(gb);S(c.x-.65,c.x+.65,0,2.8,c.z-.65,c.z+.65);
   if(c.k==='sumaksae')place('sumaksae',{x:c.x,y:1.6,z:c.z,h:.69,ry:0});else place(c.k,{x:c.x,y:1.47,z:c.z,h:c.h});
   spots.push({x:c.x,y:.45,z:c.z+1.4,r:1.2,t:c.t,h:c.d})}
  /* 감은사 서탑 사리장엄: 앞쪽 두 유리장 */for(const [cx,w] of[[hx-4.4,1.9],[hx+4.4,1.3]]){const cz=hz+2.6;const pd=box(w,1.0,1.2,ped);pd.position.set(cx,.95,cz);G.add(pd);const gb=new THREE.Mesh(new THREE.BoxGeometry(w-.1,1.1,1.1),glass);gb.position.set(cx,2.0,cz);G.add(gb);S(cx-w/2,cx+w/2,0,2.6,cz-.6,cz+.6)}
  place('gam_outer',{x:hx-4.85,y:1.47,z:hz+2.6,h:.58});place('gam_inner',{x:hx-3.95,y:1.47,z:hz+2.6,h:.5});place('gam_crystal',{x:hx+4.4,y:1.47,z:hz+2.6,h:.42});
  spots.push({x:hx-4.4,y:.45,z:hz+.9,r:1.2,t:'감은사 사리장엄',h:'경주 감은사 터 서쪽 삼층석탑 안에서 나온 사리 그릇이에요(통일신라, 682년 무렵). 사천왕을 두드려 새긴 금동 바깥 함 안에, 난간과 악사·승려 조각을 두른 집 모양 안쪽 함이 들어 있었어요. 두 배로 키워 보여 드려요. (3D: 국가유산청, CC BY)'});
  spots.push({x:hx+4.4,y:.45,z:hz+.9,r:1.1,t:'수정 사리병',h:'안쪽 함 가운데 모셨던 손가락만 한 수정 병이에요(높이 약 3.7cm). 금으로 짠 뚜껑을 덮었어요. 너무 작아서 열네 배로 키워 보여 드려요. (3D: 국가유산청, CC BY)'})}
 /* ---------- 나무와 꽃: 신라 고분 정원 느낌 ---------- */
 if(!mini){const tr=new THREE.InstancedMesh(new THREE.CylinderGeometry(.2,.3,1,6).translate(0,.5,0),M(0x6b4a2e),60),cr=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,1),new THREE.MeshStandardMaterial({roughness:.85,flatShading:true}),60);const o=new THREE.Object3D(),col=new THREE.Color();const PAL=[0xe0482e,0xf07a28,0xf4b42a,0x7dbb4a,0xc8352a];let k=0;
  for(let t=0;t<400&&k<60;t++){const x=-46+r()*92,z=-70+r()*96;if(Math.abs(x)<5||Math.hypot(x+26,z+40)<8||Math.hypot(x-26,z+38)<8||Math.abs(x-14)<9&&Math.abs(z-6)<7||Math.abs(x)<4&&z<-20||Math.abs(z+6)<3||Math.hypot(x,z+30)<5||Math.hypot(x,z+82)<18)continue;const s=1+r()*.8;o.position.set(x,0,z);o.rotation.set(0,r()*6,0);o.scale.set(s,2.2*s,s);o.updateMatrix();tr.setMatrixAt(k,o.matrix);o.position.y=2.6*s;o.scale.set(2*s,1.7*s,2*s);o.updateMatrix();cr.setMatrixAt(k,o.matrix);cr.setColorAt(k,col.setHex(PAL[(r()*PAL.length)|0]));solids.push({cx:x,cz:z,r:.4,y0:0,y1:6});k++}tr.count=cr.count=k;tr.castShadow=cr.castShadow=true;G.add(tr,cr)}
 const meta={quest:{t:'경주 신라 유산 순례',d:'천년 신라의 유산 일곱을 찾아 살펴보세요.',steps:[['첨성대','첨성대'],['성덕대왕신종','성덕대왕신종'],['인왕동 삼층석탑','경주 인왕동 사지 서 삼층석탑'],['김유신 묘','김유신 묘'],['보물관 천마총 금관','천마총 금관'],['보물관 금동반가사유상','금동반가사유상'],['보물관 얼굴무늬 수막새','얼굴무늬 수막새']]},title:'경주 신라 유산 마당 · 실제 크기',hint:'천년 신라의 유산을 실제 크기로 모았어요. 왼쪽 첨성대, 오른쪽 성덕대왕신종, 가운데 삼층석탑, 맨 안쪽 김유신 묘, 입구 오른쪽 신라 보물관(금관·반가사유상·얼굴무늬 수막새). (3D: 국가유산청 KHS, CC BY · 첨성대는 공개 실측값으로 쌓음)',video:'emille',
  env:{plaza:null,beds:false,trees:true,sign:{x:4.5,z:20,lines:['경주 신라 유산 마당','첨성대 · 성덕대왕신종 · 김유신 묘','금관 · 반가사유상 · 수막새','실제 크기로 지었어요']},treeAvoid:(x,z)=>Math.abs(x)<50&&z<30&&z>-110},
  npc:[['science',[[-24,-30],[-30,-30],[-30,-36]]],['metal',[[24,-30],[28,-30]]],['ceramic',[[10,4],[18,4]]],['carpenter',[[-2,10],[2,-20]]]],
  level:P=>Math.abs(P.x-14)<7&&Math.abs(P.z-6)<4?'신라 보물관':Math.hypot(P.x+26,P.z-(-40))<9?'첨성대':Math.hypot(P.x-26,P.z+38)<9?'성덕대왕신종':P.z<-55?'김유신 묘':'경주 마당',
  camCap:P=>Math.abs(P.x-14)<7&&Math.abs(P.z-6)<4?3.0:Infinity,
  mini:{S:2.6,ox:0,oz:-30,draw(g,X,Z,S){g.fillStyle='#7aa04e';g.fillRect(0,0,300,300);g.fillStyle='#c9b48a';g.fillRect(X(-2.5),Z(-62),5*S,86*S);g.fillRect(X(-26),Z(-8),52*S,4*S);g.fillStyle='#b9b09e';g.beginPath();g.arc(X(-26),Z(-40),2.7*S,0,7);g.fill();g.fillStyle='#8a3a2a';g.fillRect(X(22),Z(-42),8*S,8*S);g.fillStyle='#d8d0c0';g.fillRect(X(7),Z(2),14*S,8*S);g.fillStyle='#5f8a4c';g.beginPath();g.arc(X(0),Z(-82),14*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:22,yaw:Math.PI},size:{}},meta)}
