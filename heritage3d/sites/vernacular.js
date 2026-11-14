/* 민가 공용 재질: 상자 하나로 만든 작은 집도 가까이서 집처럼 보이게. 갱신 2026-11-14
   벽(앞 띠살문, 뒤 창, 옆 기둥) · 초가(새끼줄 그물) · 기단 돌. 캔버스 한 장씩만 만들고 함께 쓴다.
   BoxGeometry 면 순서: +x, -x, +y, -y, +z(앞), -z(뒤) */
import * as THREE from 'three';
let _wall=null,_thatch=null,_stone=null;
const cv=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return[c,c.getContext('2d')]};
const T=(c,rep)=>{const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;if(rep){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rep[0],rep[1])}return t};
function face(draw){const[c,q]=cv(128,128);q.fillStyle='#f3ede0';q.fillRect(0,0,128,128);q.fillStyle='#8f8a80';q.fillRect(0,104,128,24);q.strokeStyle='#6f6a60';q.lineWidth=2;for(let y=104;y<128;y+=8)for(let x=(y/8%2)*8;x<128;x+=16)q.strokeRect(x,y,16,8);q.fillStyle='#4a3020';q.fillRect(0,0,128,10);q.fillRect(0,0,10,104);q.fillRect(118,0,10,104);draw(q);return new THREE.MeshStandardMaterial({map:T(c),roughness:.9})}
const door=q=>{q.fillStyle='#4a3020';q.fillRect(59,0,10,104);for(const x0 of[30,72]){q.fillStyle='#d9c8a0';q.fillRect(x0,24,26,80);q.strokeStyle='#5a3a22';q.lineWidth=2;q.strokeRect(x0,24,26,80);for(let y=32;y<104;y+=8){q.beginPath();q.moveTo(x0,y);q.lineTo(x0+26,y);q.stroke()}for(const dx of[9,17]){q.beginPath();q.moveTo(x0+dx,24);q.lineTo(x0+dx,104);q.stroke()}}};
const win=q=>{q.fillStyle='#4a3020';q.fillRect(59,0,10,104);for(const x0 of[24,78]){q.fillStyle='#e8dcc0';q.fillRect(x0,34,26,30);q.strokeStyle='#5a3a22';q.lineWidth=2;q.strokeRect(x0,34,26,30);for(let k=1;k<3;k++){q.beginPath();q.moveTo(x0+k*26/3,34);q.lineTo(x0+k*26/3,64);q.moveTo(x0,34+k*10);q.lineTo(x0+26,34+k*10);q.stroke()}}};
const side=q=>{q.fillStyle='#4a3020';q.fillRect(59,0,10,104)};
/* 집 벽 재질 6면 배열 */export function wallMats(){if(_wall)return _wall;const plain=new THREE.MeshStandardMaterial({color:0xf3ede0,roughness:.9});const sd=face(side);return _wall=[sd,sd,plain,plain,face(door),face(win)]}
/* 초가 지붕: 볏짚 색 + 새끼줄 그물 */export function thatchMat(){if(_thatch)return _thatch;const[c,q]=cv(64,64);q.fillStyle='#d9b765';q.fillRect(0,0,64,64);q.strokeStyle='#a8873e';q.lineWidth=2;for(let i=-64;i<128;i+=12){q.beginPath();q.moveTo(i,0);q.lineTo(i+64,64);q.moveTo(i+64,0);q.lineTo(i,64);q.stroke()}return _thatch=new THREE.MeshStandardMaterial({map:T(c,[4,2]),roughness:1})}
/* 기단 돌 */export function stoneMat(){return _stone||(_stone=new THREE.MeshStandardMaterial({color:0xa8a296,roughness:1}))}
/* 초가 한 채(앞이 +z): 기단 + 무늬 벽 + 초가. 크기 w×d, 벽 높이 h. 그룹을 돌려준다 */
export function chogaHut(w=3.2,d=2.2,h=1.6){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.BoxGeometry(w+.5,.25,d+.5),stoneMat());b.position.y=.12;b.receiveShadow=true;g.add(b);
 const body=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),wallMats());body.position.y=.25+h/2;body.castShadow=true;body.receiveShadow=true;g.add(body);
 const rf=new THREE.Mesh(new THREE.SphereGeometry(1,18,8,0,Math.PI*2,0,Math.PI/2),thatchMat());rf.scale.set(w*.66,h*.62,d*.74);rf.position.y=.25+h-.06;rf.castShadow=true;g.add(rf);
 /* 용마름(지붕 꼭대기 새끼 똬리) */const rid=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,w*.75,8).rotateZ(Math.PI/2),new THREE.MeshStandardMaterial({color:0xb08a42,roughness:1}));rid.position.y=.25+h-.06+h*.6;g.add(rid);return g}
