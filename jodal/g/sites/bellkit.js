/* 한국 범종 공용 부품. 갱신 2026-11-14
   밋밋한 종 대신 한국 종의 특징을 갖춤: 용뉴(고리 용)와 음통, 상대·하대 무늬 띠, 유곽 넷(각 유두 아홉), 연꽃 당좌 둘.
   종 밑에서 꼭대기까지 높이 H(기본 1.3). 그룹의 원점은 종 아랫면 가운데. 당목(종 치는 나무)은 따로 striker()로. */
import * as THREE from 'three';
let _m=null;
const mats=()=>_m||(_m={body:new THREE.MeshStandardMaterial({color:0x4f6a5c,roughness:.42,metalness:.65,side:THREE.DoubleSide}),dark:new THREE.MeshStandardMaterial({color:0x3a4d42,roughness:.5,metalness:.6}),band:new THREE.MeshStandardMaterial({color:0x5f7a68,roughness:.38,metalness:.7})});
/* 종 몸 옆선(반지름, 높이): 위가 좁고 아래로 벌어지다 입구에서 살짝 오므림 */
const PROF=[[.001,1.3],[.44,1.3],[.5,1.27],[.56,1.18],[.6,1.0],[.64,.75],[.7,.45],[.76,.2],[.8,.07],[.79,0],[.72,0],[.7,.06]];
const rAt=y=>{for(let i=1;i<PROF.length;i++){const[a,ya]=PROF[i-1],[b,yb]=PROF[i];if((y<=ya&&y>=yb)||(y>=ya&&y<=yb)){const t=(y-ya)/((yb-ya)||1);return a+(b-a)*t}}return .6};
export function koreanBell(H=1.3){const M=mats(),g=new THREE.Group(),k=H/1.3;const inner=new THREE.Group();inner.scale.setScalar(k);g.add(inner);
 const body=new THREE.Mesh(new THREE.LatheGeometry(PROF.map(([a,b])=>new THREE.Vector2(a,b)),36),M.body);body.castShadow=true;inner.add(body);
 /* 상대(어깨 띠)와 하대(입술 띠) */for(const [y,h] of[[1.2,.07],[.12,.09]]){const r=rAt(y)+.012;const b=new THREE.Mesh(new THREE.CylinderGeometry(r,r+.01,h,36,1,true),M.band);b.position.y=y;inner.add(b);for(let i=0;i<24;i++){const a=i/24*Math.PI*2;const d=new THREE.Mesh(new THREE.SphereGeometry(.014,6,4),M.dark);d.position.set(Math.cos(a)*(r+.006),y,Math.sin(a)*(r+.006));inner.add(d)}}
 /* 천판 위 용뉴(목을 구부린 용 고리)와 음통(대나무 모양 관) */{const top=new THREE.Mesh(new THREE.CylinderGeometry(.44,.46,.05,30),M.band);top.position.y=1.32;inner.add(top);
  const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(-.2,1.33,0),new THREE.Vector3(-.22,1.5,0),new THREE.Vector3(-.06,1.6,0),new THREE.Vector3(.1,1.56,0),new THREE.Vector3(.16,1.45,0)]);const dr=new THREE.Mesh(new THREE.TubeGeometry(curve,20,.045,8,false),M.dark);dr.castShadow=true;inner.add(dr);const hd=new THREE.Mesh(new THREE.SphereGeometry(.065,10,8),M.dark);hd.scale.set(1.2,.8,.9);hd.position.set(.17,1.43,0);inner.add(hd);
  const um=new THREE.Mesh(new THREE.CylinderGeometry(.045,.05,.3,10),M.dark);um.position.set(-.24,1.47,0);inner.add(um);for(const y of[1.4,1.5,1.58]){const n=new THREE.Mesh(new THREE.TorusGeometry(.05,.012,5,12),M.band);n.rotation.x=Math.PI/2;n.position.set(-.24,y,0);inner.add(n)}}
 /* 유곽 넷: 네모 테 + 유두 아홉 */for(let q=0;q<4;q++){const a=q/4*Math.PI*2+Math.PI/4;const y=.98,r=rAt(y)+.008;const f=new THREE.Group();f.position.set(Math.cos(a)*r,y,Math.sin(a)*r);f.lookAt(Math.cos(a)*5,y,Math.sin(a)*5);inner.add(f);
  for(const [w,h,x,yy] of[[.3,.025,0,.15],[.3,.025,0,-.15],[.025,.3,.15,0],[.025,.3,-.15,0]]){const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,.02),M.band);b.position.set(x,yy,0);f.add(b)}
  for(let i=0;i<3;i++)for(let j=0;j<3;j++){const n=new THREE.Mesh(new THREE.SphereGeometry(.026,8,6),M.dark);n.scale.z=1.2;n.position.set(-.09+i*.09,-.09+j*.09,.012);f.add(n)}}
 /* 당좌 둘: 연꽃 원판(종 치는 자리) */for(const a of[0,Math.PI]){const y=.34,r=rAt(y)+.01;const f=new THREE.Group();f.position.set(Math.cos(a)*r,y,Math.sin(a)*r);f.lookAt(Math.cos(a)*5,y,Math.sin(a)*5);inner.add(f);const disk=new THREE.Mesh(new THREE.CylinderGeometry(.11,.11,.02,20).rotateX(Math.PI/2),M.band);f.add(disk);for(let i=0;i<8;i++){const t=i/8*Math.PI*2;const p=new THREE.Mesh(new THREE.SphereGeometry(.035,8,6),M.dark);p.scale.set(1,.55,.4);p.position.set(Math.cos(t)*.07,Math.sin(t)*.07,.012);p.rotation.z=t;f.add(p)}const c=new THREE.Mesh(new THREE.SphereGeometry(.03,8,6),M.dark);c.position.z=.015;f.add(c)}
 return g}
/* 당목: 줄 두 가닥에 매단 굵은 통나무. 원점은 매다는 높이 가운데, 통나무는 x 방향 */
export function striker(len=1.4,drop=.9){const g=new THREE.Group();const wood=new THREE.MeshStandardMaterial({color:0x6b4a2e,roughness:.85});const rope=new THREE.MeshStandardMaterial({color:0xc8b48a,roughness:1});
 const log=new THREE.Mesh(new THREE.CylinderGeometry(.09,.1,len,10).rotateZ(Math.PI/2),wood);log.position.y=-drop;log.castShadow=true;g.add(log);for(const sx of[-.3,.3]){const r=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,drop,4),rope);r.position.set(sx*len,-drop/2,0);g.add(r)}return g}
