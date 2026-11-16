/* 영월 민화 사랑방: 조선 민화를 한옥 전시실에 걸어 둔 공간. 단위 1 = 1m, 입구 +z.
   갱신 2026-11-12. 그림은 저작권이 끝난 조선 민화 사진(위키미디어 공용 퍼블릭 도메인. 책가도는 보스턴 미술관 MFAB 1984.824).
   영월에는 한국민화박물관이 있어 무이 민화 쇼츠의 고향으로 둠. 건물은 전시용으로 지은 것(특정 실물 복원 아님). */
import * as THREE from 'three';
import {buildHall} from './hallkit.js';
import {tex,noise,mulb,materials,hipRoof} from './sungnyemun.js';
const T=k=>new URL('../textures/minhwa/'+k+'.jpg',import.meta.url).href;
export function buildMinhwa(opts={}){const mini=!!opts.mini;const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(29);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
 const TL=new THREE.TextureLoader();
 /* 표구된 그림 하나: 비단 테두리 + 나무 테 */function art(k,w,h,x,y,z,ry,pad=.12){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry;G.add(g);const fr=box(w+pad*2+.1,h+pad*2+.1,.06,M(0x3b2414));g.add(fr);const silk=new THREE.Mesh(new THREE.PlaneGeometry(w+pad*2,h+pad*2),M(0xd9cbb0));silk.position.z=.035;g.add(silk);
  const m=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.85});if(!mini)TL.load(T(k),t=>{t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;m.map=t;m.needsUpdate=true});const p=new THREE.Mesh(new THREE.PlaneGeometry(w,h),m);p.position.z=.04;g.add(p);return g}
 /* ---------- 앞마당: 잔디, 돌길, 장독대 ---------- */
 const PATH=tex(256,256,(q,w,h)=>{q.fillStyle='#c9b48a';q.fillRect(0,0,w,h);noise(q,w,h,4000,['rgba(0,0,0,.06)','rgba(255,255,255,.08)'],2)});PATH.wrapS=PATH.wrapT=THREE.RepeatWrapping;PATH.repeat.set(1,6);
 {const p=new THREE.Mesh(new THREE.PlaneGeometry(3,24),new THREE.MeshStandardMaterial({map:PATH,roughness:1}));p.rotation.x=-Math.PI/2;p.position.set(0,.03,8);p.receiveShadow=true;G.add(p)}
 if(!mini){const jm=M(0x4a2a1a,{roughness:.4});for(let i=0;i<9;i++){const s=.5+r()*.35;const j=new THREE.Mesh(new THREE.SphereGeometry(s,16,12),jm);j.scale.y=1.15;j.position.set(9+(i%3)*1.2,s*1.1,6+Math.floor(i/3)*1.2);j.castShadow=true;G.add(j);const lid=new THREE.Mesh(new THREE.CylinderGeometry(s*.55,s*.6,.1,14),jm);lid.position.set(j.position.x,s*2.25,j.position.z);G.add(lid)}const base=box(4.2,.3,4.2,M(0xb3aa98));base.position.set(10.2,.15,7.2);G.add(base);S(8,12.4,0,1.6,5,9.4)}
 /* ---------- 전시 한옥 ---------- */
 const HX=0,HZ=-10,W=22,D=11,FY=.45,PH=4.2;const wall=M(0xf2ede2),pil=M(0x6b4a2e);
 {/* 자세한 한옥 부품으로: 앞이 트인 사랑방 전시실, 익공, 팔작지붕 */G.add(buildHall({x:HX,z:HZ,W,D,nx:5,nz:3,FY,PH,roof:'hip',name:'민화 사랑방',pillar:0x6b4a2e,bracket:'ik',front:'open',back:'wall',left:'wall',right:'wall',mini,solids,light:false,plain:true}).group);
  const lamp1=new THREE.PointLight(0xfff0d8,14,14,1.6);lamp1.position.set(HX-5,FY+PH-.4,HZ);const lamp2=lamp1.clone();lamp2.position.set(HX+5,FY+PH-.4,HZ);G.add(lamp1,lamp2)}
 const Y=FY+2.25;
 /* 뒷벽: 십장생도 병풍(사진 한 장) */art('sipjang',7.2,3.83,HX,FY+2.25,HZ-D/2+.14,0,.15);
 spots.push({x:HX,y:FY,z:HZ-2.6,r:2.4,t:'십장생도',h:'해, 구름, 산, 물, 바위, 소나무, 거북, 학, 사슴, 불로초처럼 오래 사는 열 가지를 한 화면에 그린 그림이에요. 오래 살고 복 받기를 바라는 마음을 담았어요. 궁궐에서는 큰 병풍으로 썼어요. (사진: 퍼블릭 도메인)'});
 /* 뒷벽 양옆: 모란도, 화조도, 문자도(효, 제), 연화백로도, 백자도 */{const BZ=HZ-D/2+.14;art('moran',1.09,2.3,HX-9.7,Y,BZ,0,.1);art('hwajo2',1.17,2.1,HX-7.8,Y,BZ,0,.1);art('mun1',1.16,2.1,HX-5.7,Y,BZ,0,.08);art('mun2',1.3,2.08,HX+4.8,Y,BZ,0,.08);art('yeonhwa',2.2,1.21,HX+7.5,Y+.3,BZ,0,.1);art('baekja',1.5,1,HX+9.9,Y+.3,BZ,0,.08);
  spots.push({x:HX-9.2,y:FY,z:HZ-3,r:1.6,t:'모란도',h:'꽃 중의 왕이라 불린 모란을 바위와 함께 가득 그린 그림이에요. 부귀영화를 바라는 뜻이라 혼례나 잔치 때 병풍으로 세웠어요. (사진: 퍼블릭 도메인)'});
  spots.push({x:HX+7.5,y:FY,z:HZ-3,r:1.6,t:'연화백로도',h:'연꽃 핀 연못에 백로 두 마리를 그린 그림이에요. 백로 한 마리와 연밥은 과거에 한 번에 붙기를(일로연과) 바라는 뜻이 담겨 있어요. (사진: 퍼블릭 도메인)'});
  spots.push({x:HX+9.9,y:FY,z:HZ-3,r:1.4,t:'백자도',h:'석류와 국화, 바위 사이에 새를 그린 그림이에요. 알이 많은 석류는 자손이 많기를 바라는 뜻이에요. (사진: 퍼블릭 도메인)'})}
 /* 왼쪽 벽: 까치호랑이 둘, 쌍학반도도, 어해도 */
 art('tiger1',1.6,2.65,HX-W/2+.16,Y,HZ-2.6,Math.PI/2);art('tiger2',1.4,2.2,HX-W/2+.16,Y,HZ+.4,Math.PI/2);art('ssanghak',1.7,2.15,HX-W/2+.16,Y,HZ+3.2,Math.PI/2);art('eohae',1.6,2.15,HX-W/2+.16,Y,HZ-4.6+.2,Math.PI/2,.1);
 spots.push({x:HX-W/2+2,y:FY,z:HZ-1.1,r:2,t:'까치호랑이',h:'소나무 아래 호랑이와 나뭇가지 위 까치를 함께 그린 그림이에요. 까치는 좋은 소식을, 호랑이는 나쁜 기운을 막는 힘을 뜻해요. 무서운 호랑이를 익살스럽게 그린 것이 민화의 멋이에요. (사진: 퍼블릭 도메인)'});
 spots.push({x:HX-W/2+2,y:FY,z:HZ-4.2,r:1.6,t:'어해도',h:'물고기와 게, 새우 같은 물속 생물을 그린 그림이에요. 물고기는 알을 많이 낳아 자손이 많기를, 잉어는 출세하기를 바라는 뜻이 있어요. (사진: 퍼블릭 도메인)'});
 /* 오른쪽 벽: 화조도, 문자도 넷 */
 art('hwajo1',2.6,1.64,HX+W/2-.16,Y,HZ-3.2,-Math.PI/2);[['mun3',HZ-.1],['mun4',HZ+1.35],['mun5',HZ+2.8],['mun6',HZ+4.2]].forEach(([k,z])=>art(k,1.1,2.1,HX+W/2-.16,Y,z,-Math.PI/2,.08));
 spots.push({x:HX+W/2-2,y:FY,z:HZ-3.2,r:1.8,t:'화조도',h:'꽃과 새를 짝지어 그린 그림이에요. 암수 새는 부부의 화목을, 모란은 부귀를 뜻해요. 신혼 방을 꾸미는 그림으로 사랑받았어요. (사진: 퍼블릭 도메인)'});
 spots.push({x:HX+W/2-2,y:FY,z:HZ+2.1,r:2,t:'문자도',h:'효(孝), 제(悌), 충(忠), 신(信), 예(禮), 의(義), 염(廉), 치(恥) 여덟 글자를 그림처럼 꾸민 그림이에요. 글자 획 속에 그 덕목에 얽힌 이야기 속 물건(잉어, 대나무, 새)을 그려 넣었어요. (사진: 퍼블릭 도메인)'});
 /* 가운데: 책가도 4폭 병풍(지그재그로 세움) */{const PW=1.15,PHh=2.95;const g=new THREE.Group();g.position.set(HX,FY,HZ-.6);G.add(g);
  ['chaek1','chaek2','chaek3','chaek4'].forEach((k,i)=>{const a=(i%2?-1:1)*.22;const x=(i-1.5)*PW*.98;const pg=new THREE.Group();pg.position.set(x,PHh/2+.08,(i%2)*.18);pg.rotation.y=a;g.add(pg);const fr=box(PW+.06,PHh+.16,.05,M(0x3b2414));pg.add(fr);
   for(const sd of[1,-1]){const m=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.85});if(!mini)TL.load(T(k),t=>{t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;m.map=t;m.needsUpdate=true});const p=new THREE.Mesh(new THREE.PlaneGeometry(PW,PHh),m);p.position.z=sd*.03;if(sd<0)p.rotation.y=Math.PI;pg.add(p)}});
  S(HX-2.4,HX+2.4,0,4,HZ-.9,HZ-.1);
  spots.push({x:HX,y:FY,z:HZ+1.6,r:2,t:'책가도',h:'책장에 책과 문방구, 도자기, 꽃을 쌓아 그린 그림이에요. 정조 임금이 학문을 아끼는 마음으로 즐겼다고 해서 양반집과 민간으로 퍼졌어요. 이 4폭은 보스턴 미술관 소장품 사진이에요(퍼블릭 도메인).'})}
 const meta={quest:{t:'민화 감상 순례',d:'사랑방에 걸린 민화 여덟 가지를 찾아 보세요.',steps:[['까치호랑이','까치호랑이'],['책가도','책가도'],['문자도','문자도'],['십장생도','십장생도'],['화조도','화조도'],['어해도','어해도'],['모란도','모란도'],['연화백로도','연화백로도']],done:'민화 여덟 가지를 다 봤어요. 그림마다 담긴 바람(복, 장수, 출세, 화목)을 기억해 두세요.'},
  title:'영월 민화 사랑방',video:'hojak',hint:'조선 민화를 한옥 전시실에 걸어 둔 사랑방이에요. 까치호랑이, 책가도 병풍, 문자도, 십장생도, 화조도, 어해도를 찾아 보세요. (그림 사진: 위키미디어 공용 퍼블릭 도메인 · 책가도: 보스턴 미술관)',
  env:{plaza:null,beds:false,trees:true,sign:{x:4,z:16,lines:['영월 민화 사랑방','까치호랑이 · 책가도 · 문자도','십장생도 · 화조도 · 어해도','조선 민화 사진을 걸었어요']},treeAvoid:(x,z)=>Math.abs(x)<18&&z<22&&z>-20},
  npc:[['painter',[[-6,FY,HZ+2],[6,FY,HZ+2]]],['carpenter',[[-2,12],[2,12]]]],
  level:P=>P.y>FY-.1&&Math.abs(P.x-HX)<W/2&&Math.abs(P.z-HZ)<D/2?'민화 전시실':'사랑방 마당',
  camCap:P=>P.y>FY-.1&&Math.abs(P.x-HX)<W/2&&Math.abs(P.z-HZ)<D/2?3.4:Infinity,
  mini:{S:6,ox:0,oz:-4,draw(g,X,Z,S){g.fillStyle='#7aa04e';g.fillRect(0,0,300,300);g.fillStyle='#c9b48a';g.fillRect(X(-1.5),Z(-4),3*S,24*S);g.fillStyle='#8a6a44';g.fillRect(X(HX-W/2),Z(HZ-D/2),W*S,D*S);g.fillStyle='#4a2a1a';g.fillRect(X(8),Z(5),4.4*S,4.4*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:18,yaw:Math.PI},size:{}},meta)}
