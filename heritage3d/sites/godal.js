/* 여주 고달사지 승탑 마당(2026-11-21): 스케치팹 lacomi1975 사진 측량(CC BY 4.0) 고달사지 승탑(국보)과 둘레 돌 축대·울타리.
   실측 단위가 100배쯤 커서 승탑 실제 높이 4.3m에 맞춰 줄임(0.012배). 놀이: 고달사 터 발굴 탐지. */
import {photoSite} from './photosite.js';
const SRC='(3D: lacomi1975, Sketchfab, CC BY 4.0)';
export function buildGodal(opts={}){return photoSite('godal',opts,{h0:0,groundY:-.4,groundColor:0x8a7a5a,
 title:'여주 고달사지 승탑',hint:'사진 측량한 고달사지 승탑을 실제 높이(4.3m)로 놓았어요. 승탑 둘레를 돌며 구름·용·거북 무늬를 보고 발굴 탐지도 해 봐요. '+SRC,
 quest:{t:'고달사지 승탑 보기',d:'고려 승탑을 실측 그대로 둘러보세요.',steps:[['승탑','고달사지 승탑']]},
 spawn:{x:0,z:5,yaw:Math.PI},bounds:[-5,6.5,-6,6],level:'고달사지',env:{fog:[60,300],sign:{x:-3.6,z:5,y:0,lines:['여주 고달사지 승탑','국보 · 고려 초','여덟모 승탑 · 거북·용 무늬','실측 3D · 실제 높이']}},
 npc:[['science',[[-2,4.6],[2,4.6]]]],
 build({spots,THREE}){
  spots.push({x:0,y:0,z:3,r:2.4,t:'고달사지 승탑',h:'고려 초 고달사 스님의 사리를 모신 승탑이에요(국보). 높이 4.3m, 가운데 받침돌에 거북 머리와 용 네 마리, 구름이 힘차게 새겨져 있어요. 우리나라 여덟모 승탑 가운데 가장 크고 아름다운 것으로 꼽혀요. '+SRC});
  const DTM=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.7},o));
  const ITEMS=[{n:'고려 청자 조각',h:'고달사 스님들이 쓰던 청자 조각이에요.',mk:()=>{const g=new THREE.Group();const s=new THREE.Mesh(new THREE.SphereGeometry(.3,14,10,0,Math.PI*.9,Math.PI*.3,Math.PI*.5),DTM(0x8ac0b0,{roughness:.2,side:THREE.DoubleSide}));s.position.y=.3;g.add(s);return g}},
   {n:'연꽃무늬 수막새',h:'절 지붕 처마 끝 기와예요.',mk:()=>{const g=new THREE.Group();const d=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.08,24),DTM(0x6a6660));d.rotation.x=Math.PI/2;d.position.y=.4;g.add(d);return g}},
   {n:'철제 솥 조각',h:'많은 스님이 함께 먹던 큰 무쇠솥 조각이에요. 고달사는 한때 스님이 수백 명이나 되는 큰 절이었어요.',mk:()=>{const g=new THREE.Group();const b=new THREE.Mesh(new THREE.SphereGeometry(.34,14,8,0,Math.PI,Math.PI/2,Math.PI/2),DTM(0x3a3a3a,{metalness:.5,roughness:.6,side:THREE.DoubleSide}));b.position.y=.45;g.add(b);return g}},
   {n:'돌 받침 조각',h:'건물 기둥을 받치던 주춧돌 조각이에요.',mk:()=>{const g=new THREE.Group();const b=new THREE.Mesh(new THREE.CylinderGeometry(.3,.36,.25,10),DTM(0x9a948a));b.position.y=.25;g.add(b);return g}}];
  window.__GDLDIG=()=>{window.__DETECT&&window.__DETECT({key:'godal_dig',title:'고달사 터 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:3,TL:90,cand:[[-4,4],[0.5,4],[5,4],[-3,1.5],[4.5,2],[6,-1.5],[-5,-4.5],[5.5,-4]],items:ITEMS,intro:'고려 큰 절 고달사 터예요. 승탑 둘레 땅속 유물을 탐지기로 찾아 봐요!',okText:'고달사지는 발굴로 큰 절의 건물 터와 유물이 많이 드러났어요.'})};
  spots.push({x:2.5,y:0,z:4.5,r:1.6,t:'발굴 탐지 자리',h:'승탑 둘레 땅속 유물을 무이 탐지기로 찾아 봐요.'});
 },
 mini:{S:20,ox:.5,oz:0,draw(g,X,Z,S){g.fillStyle='#8a7a5a';g.fillRect(0,0,300,300);g.fillStyle='#9a948a';g.beginPath();g.arc(X(0),Z(0),1.6*S,0,7);g.fill()}}})}
