/* 함안 무기연당 마당(2026-11-21): 스케치팹 lacomi1975 사진 측량(CC BY 4.0), 측량좌표 그대로 실제 크기.
   조선 영조 때 주재성의 집 안에 만든 연못 정원(국가민속문화유산). 네모 연못 가운데 섬(양심대), 정자 하환정, 풍욕루와 기와집들. 놀이: 옛 살림 발굴 탐지. */
import {photoSite} from './photosite.js';
const SRC='(3D: lacomi1975, Sketchfab, CC BY 4.0)';
export function buildMugi(opts={}){return photoSite('mugi',opts,{h0:2.5,
 title:'함안 무기연당',hint:'사진 측량한 무기연당 집과 연못 정원을 실제 크기로 놓았어요. 연못과 정자를 둘러보고 옛 살림 탐지도 해 봐요. '+SRC,
 quest:{t:'무기연당 둘러보기',d:'조선 연못 정원을 실측 그대로 둘러보세요.',steps:[['무기연당','무기연당'],['연못','연당과 양심대']]},
 spawn:{x:-24,z:26,yaw:Math.PI},bounds:[-36,36,-36,36],level:'무기연당',
 env:{sign:{x:-28,z:22,y:2.2,lines:['함안 무기연당','국가민속문화유산','조선 연못 정원 · 하환정','실측 3D · 실제 크기']}},
 npc:[['carpenter',[[-30,30],[-20,30],[-20,22],[-30,22]]]],
 build({G,spots,THREE}){
  spots.push({x:-22,y:0,z:22,r:5,t:'무기연당',h:'조선 영조 때(1728) 의병을 일으킨 주재성의 집이에요. 나라에서 공을 기려 집 안에 연못을 파 주었다고 전해요(국가민속문화유산). '+SRC});
  spots.push({x:-12,y:0,z:6,r:6,t:'연당과 양심대',h:'네모난 연못 가운데 둥근 섬을 두었어요. 하늘은 둥글고 땅은 네모나다는 옛 생각을 담았어요. 연못가 정자 하환정에서 연꽃을 바라봤어요. '+SRC});
  const DTM=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.7},o));
  const ITEMS=[{n:'놋그릇',h:'양반집 제사와 손님상에 쓰던 놋쇠 그릇이에요.',mk:()=>{const g=new THREE.Group();const b=new THREE.Mesh(new THREE.SphereGeometry(.3,16,10,0,Math.PI*2,Math.PI/2,Math.PI/2),DTM(0xd0a848,{metalness:.8,roughness:.3,side:THREE.DoubleSide}));b.position.y=.5;g.add(b);return g}},
   {n:'상평통보',h:'조선 후기 엽전이에요.',mk:()=>{const g=new THREE.Group();const m=DTM(0x8a6a30,{metalness:.7,roughness:.4});for(let i=0;i<3;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.03,20),m);c.position.set(i*.1,.3+i*.04,0);g.add(c)}return g}},
   {n:'백자 접시',h:'조선 선비 집에서 쓰던 하얀 접시예요.',mk:()=>{const g=new THREE.Group();const p=new THREE.Mesh(new THREE.CylinderGeometry(.36,.2,.08,22),DTM(0xf4f0e6,{roughness:.2}));p.position.y=.4;g.add(p);return g}},
   {n:'벼루',h:'선비가 먹을 갈던 돌 벼루예요.',mk:()=>{const g=new THREE.Group();const b=new THREE.Mesh(new THREE.BoxGeometry(.5,.08,.34),DTM(0x2a2a2c));b.position.y=.4;g.add(b);return g}},
   {n:'기와 조각',h:'집 지붕에서 떨어진 암키와 조각이에요.',mk:()=>{const g=new THREE.Group();const t=new THREE.Mesh(new THREE.CylinderGeometry(.33,.33,.7,16,1,true,0,Math.PI),DTM(0x5a5650,{side:THREE.DoubleSide}));t.rotation.z=Math.PI/2;t.position.y=.4;g.add(t);return g}}];
  window.__MGDIG=()=>{window.__DETECT&&window.__DETECT({key:'mugi_dig',title:'무기연당 옛 살림 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[-30,30],[-16,27],[-33,15],[-27,-30],[-15,-30],[24,-30],[30,-15],[30,-27],[-10,30]],items:ITEMS,intro:'무기연당 땅속에 옛 살림이 묻혀 있대요. 탐지기로 찾아 봐요!',okText:'300년 가까이 한 집안이 살아온 집이라 옛 살림이 그대로 남아 있어요.'})};
  spots.push({x:-30,y:0,z:26,r:2.4,t:'발굴 탐지 자리',h:'무기연당 둘레 땅속 옛 살림을 무이 탐지기로 찾아 봐요.'});
 },
 mini:{S:3,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#6a8a48';g.fillRect(0,0,300,300);g.fillStyle='#4a6a7a';g.fillRect(X(-6),Z(14),14*S,12*S)}}})}
