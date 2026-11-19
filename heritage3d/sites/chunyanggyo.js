/* 경주 남천 춘양교 마당(2026-11-19): 국가유산청 실측 3D(스케치팹 KHS_Asset, CC BY 4.0)로 세운 신라 다리 춘양교(일정교).
   누각 다리·돌 교각·양쪽 기슭돌·동문·서문 여섯 조각을 실제 크기 그대로 이어 붙임. 다리 위와 문루 받침은 높이 지도로 뽑은 바닥이라 걸어서 건널 수 있음.
   남천은 다리 아래 6m 낮게 흐름. 춘양교는 월정교 상류 쪽에 있던 다리로, 지금 복원 중인 모습을 3D로 남긴 것. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildChunyanggyo(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1621);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 const RW=27,DK=1.65,BED=DK-6.2,WY=BED+1.6;/* 남천: |x|<RW 가 강, 강바닥 BED, 물 높이 WY */const GX=47.5;/* 문루 가운데 x */
 const inRiver=(x,z)=>Math.abs(x)<RW;
 /* 땅: 양쪽 둑(풀밭), 강바닥 모래, 둑 경사 */{const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#6f8f45';q.fillRect(0,0,w,h);for(let i=0;i<3200;i++){q.fillStyle=r()<.5?'rgba(80,110,40,.5)':'rgba(140,150,80,.35)';q.fillRect(r()*w,r()*h,2,2)}},[30,30]);
  for(const s of[-1,1]){const g=new THREE.Mesh(new THREE.PlaneGeometry(90,220),new THREE.MeshStandardMaterial({map:GT,roughness:1}));g.rotation.x=-Math.PI/2;g.position.set(s*(RW+45),0,0);g.receiveShadow=true;G.add(g);
   const bk=new THREE.Mesh(new THREE.BoxGeometry(1.2,-BED,220),M(0x8a7a5a));bk.position.set(s*(RW+.6),BED/2,0);G.add(bk)}
  const SB=tex(256,256,(q,w,h)=>{q.fillStyle='#b8a98a';q.fillRect(0,0,w,h);for(let i=0;i<900;i++){q.fillStyle=r()<.5?'rgba(110,100,80,.4)':'rgba(220,210,190,.4)';q.beginPath();q.arc(r()*w,r()*h,1+r()*3,0,7);q.fill()}},[10,30]);const bed=new THREE.Mesh(new THREE.PlaneGeometry(RW*2,220),new THREE.MeshStandardMaterial({map:SB,roughness:1}));bed.rotation.x=-Math.PI/2;bed.position.y=BED;G.add(bed);
  const WT=tex(256,256,(q,w,h)=>{q.fillStyle='#4a7a80';q.fillRect(0,0,w,h);for(let i=0;i<140;i++){const x=r()*w,y=r()*h,L=10+r()*24;q.strokeStyle='rgba(225,242,245,'+(.08+r()*.12)+')';q.lineWidth=1+r();q.beginPath();for(let k=0;k<=L;k+=2)q.lineTo(x+Math.sin((y+k)/5)*1.2,y+k);q.stroke()}},[6,24]);const w=new THREE.Mesh(new THREE.PlaneGeometry(RW*2-3,220),new THREE.MeshStandardMaterial({map:WT,roughness:.15,metalness:.15,color:0xcfe6e4,transparent:true,opacity:.86}));w.rotation.x=-Math.PI/2;w.position.y=WY;G.add(w);G.userData.water=WT;
  /* 둑 끝 막이(강으로 떨어지지 않게): 다리 앞뒤 말고 둑 가장자리 낮은 담 */for(const s of[-1,1])for(const zz of[[-110,-9],[9,110]]){S(s*RW-.3*s-.3,s*RW-.3*s+.3,0,1.2,zz[0],zz[1])}
  for(const s of[-1,1])for(const zz of[[-100,-9],[9,100]]){const fc=new THREE.Mesh(new THREE.BoxGeometry(.25,.9,zz[1]-zz[0]),M(0x7a6a50));fc.position.set(s*(RW+.2),.45,(zz[0]+zz[1])/2);G.add(fc)}
  /* 둘레 소나무·버드나무 */if(!mini){const tr=M(0x5a4430),lf=M(0x3f6a35);for(let i=0;i<40;i++){const s=r()<.5?-1:1;const x=s*(RW+8+r()*45),z=(r()-.5)*190;if(Math.abs(z)<22&&Math.abs(x)<GX+20)continue;const t=new THREE.Mesh(new THREE.CylinderGeometry(.2,.32,3,6),tr);t.position.set(x,1.5,z);G.add(t);const c=new THREE.Mesh(new THREE.ConeGeometry(1.8+r(),4+r()*2,8),lf);c.position.set(x,4.6,z);G.add(c);solids.push({cx:x,cz:z,r:.4,y0:0,y1:6})}}}
 /* 실측 조각 불러오기 */const PARTS=[['pier',0,BED,0,0],['pavilion',0,DK,0,0],['abut_e',33.5,BED,0,0],['abut_w',-33.5,BED,0,0],['gate_e',GX,0,0,Math.PI/2],['gate_w',-GX,0,0,-Math.PI/2]];
 if(!mini){const gl=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(dr);
  for(const[n,x,y,z,ry]of PARTS)gl.load(new URL('../models/gyeongju/chy/'+n+'.glb',import.meta.url).href,g=>{const o=g.scene;o.position.set(x,y,z);o.rotation.y=ry;o.userData.noBatch=true;o.traverse(e=>{if(e.isMesh){e.castShadow=e.receiveShadow=true;if(e.material){e.material.roughness=.85;e.material.metalness=0}}});G.add(o);if(n==='pavilion'||n.startsWith('gate'))o.traverse(e=>{if(e.isMesh)cam.push(e)})},undefined,()=>{});
  /* 걸을 바닥: 높이 지도에서 뽑은 상자(누각 바닥·문루 돌 받침과 계단) */fetch(new URL('../models/gyeongju/chy/floors.json',import.meta.url).href).then(r=>r.json()).then(F=>{const put=(list,ox,oy,oz,ry)=>{const c=Math.cos(ry),s=Math.sin(ry);for(const[x0,x1,z0,z1,h]of list){const pts=[[x0,z0],[x1,z1]].map(([x,z])=>[ox+x*c+z*s,oz-x*s+z*c]);S(pts[0][0],pts[1][0],oy-8,oy+h,pts[0][1],pts[1][1])}};put(F.pavilion,0,DK,0,0);put(F.gate_e,GX,0,0,Math.PI/2);put(F.gate_w,-GX,0,0,-Math.PI/2);G.userData.floorsN=solids.length}).catch(()=>{})}
 /* 다리 위를 걷는 동안 강으로 떨어지지 않게 난간 막이(누각 양옆) */S(-39,39,-8,DK+1.4,-7.4,-6.9);S(-39,39,-8,DK+1.4,6.9,7.4);
 /* 다리 끝과 문루 받침 사이 돌길(높이 1.9): 누각 바닥과 문루 받침을 잇는 석축 길 */{const st=tex(256,256,(q,w,h)=>{q.fillStyle='#a49c8c';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=32)for(let x=-(y/32%2)*24;x<w;x+=48){const v=150+(r()*30|0);q.fillStyle=`rgb(${v},${v-5},${v-14})`;q.fillRect(x+2,y+2,44,28)}},[3,2]);for(const sd of[-1,1]){const x0=sd*32.4,x1=sd*42.2;const b=new THREE.Mesh(new THREE.BoxGeometry(Math.abs(x1-x0),1.9-BED,13.6),new THREE.MeshStandardMaterial({map:st,roughness:.95}));b.position.set((x0+x1)/2,(1.9+BED)/2,0);b.receiveShadow=true;G.add(b);S(x0,x1,BED-1,1.9,-6.8,6.8)}}
 /* 누각 바닥 높이(DK+.25)와 돌길(1.9) 사이 턱 없앰: 누각 끝 1m 경사 */
 /* 안내판 */const sign=(x,z,ry,t)=>{const c=document.createElement('canvas');c.width=512;c.height=256;const q=c.getContext('2d');q.fillStyle='#3a2a1a';q.fillRect(0,0,512,256);q.strokeStyle='#d8a838';q.lineWidth=8;q.strokeRect(8,8,496,240);q.fillStyle='#f4e6c0';q.font='bold 46px "Do Hyeon",sans-serif';q.textAlign='center';q.fillText(t[0],256,92);q.font='26px "Gowun Dodum",sans-serif';t.slice(1).forEach((l,i)=>q.fillText(l,256,150+i*38));const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;const g=new THREE.Group();const b=new THREE.Mesh(new THREE.BoxGeometry(2.4,1.2,.08),[M(0x3a2a1a),M(0x3a2a1a),M(0x3a2a1a),M(0x3a2a1a),new THREE.MeshStandardMaterial({map:tx}),M(0x3a2a1a)]);b.position.y=1.5;g.add(b);for(const sx of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,1.5,6),M(0x5a3a22));p.position.set(sx*1,.75,0);g.add(p)}g.position.set(x,0,z);g.rotation.y=ry;G.add(g)};
 spots.push({x:-GX-15,y:0,z:4,r:3,t:'춘양교 들머리',h:'신라 때 경주 남천에 놓인 누각 다리 춘양교(일정교)예요. 월정교 상류 쪽에 있었어요. 이 다리는 국가유산청이 복원 모습을 실측한 3D를 실제 크기로 이어 붙였어요. (3D: 국가유산청 KHS_Asset, Sketchfab, CC BY 4.0)'});
 spots.push({x:-GX,y:2,z:0,r:4,t:'서문 문루',h:'다리 양 끝에는 2층 문루가 서 있어요. 돌 받침 위로 계단을 올라 문을 지나면 다리 위예요. (3D: 국가유산청 KHS_Asset, Sketchfab, CC BY 4.0)'});
 spots.push({x:0,y:.3,z:0,r:5,t:'누각 다리 가운데',h:'다리 위에 지붕을 덮은 긴 누각이에요. 비가 와도 건널 수 있고 남천을 내려다볼 수 있어요. 길이 약 65m예요. (3D: 국가유산청 KHS_Asset, Sketchfab, CC BY 4.0)'});
 spots.push({x:GX,y:2,z:0,r:4,t:'동문 문루',h:'동쪽 문루예요. 건너편 서문과 짝을 이뤄요. (3D: 국가유산청 KHS_Asset, Sketchfab, CC BY 4.0)'});
 spots.push({x:-RW-4,y:0,z:-18,r:3,t:'남천 둑',h:'둑에서 보면 돌 교각 셋이 다리를 받치고 있어요. 물살을 가르게 앞쪽이 뾰족한 배 모양이에요. (3D: 국가유산청 KHS_Asset, Sketchfab, CC BY 4.0)'});
 const tick=(P,dt)=>{if(G.userData.water)G.userData.water.offset.y+=dt*.02};
 const meta={quest:{t:'춘양교 건너기',d:'실측으로 되살린 신라 누각 다리를 서문에서 동문까지 건너 보세요.',steps:[['춘양교 들머리','춘양교 들머리'],['서문 문루','서문 문루'],['누각 다리 가운데','누각 다리 가운데'],['동문 문루','동문 문루'],['남천 둑','남천 둑']]},
  title:'경주 남천 춘양교',hint:'국가유산청이 실측한 춘양교 3D를 실제 크기로 이어 붙였어요. 서문 계단을 올라 누각 다리를 건너 동문까지 가 보세요. (3D: 국가유산청 KHS_Asset, Sketchfab, CC BY 4.0)',
  env:{plaza:null,beds:false,trees:false,groundY:-6.3,fog:[140,520],treeAvoid:()=>true,sign:{x:-GX-17,z:-6,lines:['경주 남천 춘양교','신라 누각 다리','국가유산청 실측 3D','서문 → 누각 다리 → 동문']}},
  npc:[['base',[[-GX-12,10],[-GX-12,-10],[-GX-4,-10],[-GX-4,10]]],['ceramic',[[GX+4,10],[GX+4,-10],[GX+12,-10],[GX+12,10]]]],
  bounds:[-112,112,-100,100],
  level:P=>P.y>1.2?(Math.abs(P.x)<33?'누각 다리 위':'문루'):Math.abs(P.x)<RW?'남천':'남천 둑',camCap:()=>Infinity,
  baseAt:(x,z)=>inRiver(x,z)?BED:0,tick,
  mini:{S:1.4,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#6f8f45';g.fillRect(0,0,300,300);g.fillStyle='#4a7a80';g.fillRect(X(-RW),0,RW*2*S,300);g.fillStyle='#5a3a2a';g.fillRect(X(-33),Z(-7),66*S,14*S);g.fillStyle='#8a3a2a';g.fillRect(X(GX-8),Z(-10),16*S,20*S);g.fillRect(X(-GX-8),Z(-10),16*S,20*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-GX-20,z:6,yaw:Math.PI/2},size:{}},meta)}
