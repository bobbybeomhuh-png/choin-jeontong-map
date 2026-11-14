/* 무이 집짓기 섬: 전국 지도 서해에 뜬 섬. 갱신 2026-11-14
   가운데 마을 섬(나무숲·돌밭·나루) + 사람마다 다리로 이어진 집터 섬 하나.
   나무를 베고 돌을 캐서 현대 한옥(유리 벽·기와 지붕), 수영장, 사우나, 정자 같은 것을 짓고 꾸민다. 재료를 모아 집터를 넓힌다.
   저장: 이 기기(localStorage) + 서버(Supabase muui_homes, save_home 함수). 서버 표가 없으면 이 기기에만 저장된다.
   남의 집: 서버 공개 보기(muui_homes_pub)에서 받아 같은 섬에 그린다(읽기만). */
import * as THREE from 'three';
import {hipRoof,materials} from './sungnyemun.js';
import {SB} from '../trk3d.js';
import {myName} from '../net3d.js';
const LV=[0,12,16,20,26,32,38];/* 단계별 집터 한 변(m) */
const LVCOST=[0,0,[20,20],[45,45],[90,90],[160,160],[260,260]];
/* 부품: 이름, 아이콘, 크기(가로 w × 세로 d), 값 [나무, 돌] */
export const PARTS={
 hanokS:{n:'현대 한옥(작은)',i:'🏠',w:7,d:5,c:[20,10]},
 hanokL:{n:'현대 한옥(큰 본채)',i:'🏯',w:11,d:7,c:[45,25]},
 pool:{n:'수영장',i:'🏊',w:7,d:3.6,c:[0,30]},
 sauna:{n:'사우나(한증막)',i:'♨️',w:3.6,d:3.6,c:[12,14]},
 pav:{n:'정자',i:'⛩️',w:3.6,d:3.6,c:[14,4]},
 deck:{n:'나무 데크',i:'🟫',w:4,d:4,c:[6,0]},
 lawn:{n:'잔디밭',i:'🟩',w:4,d:4,c:[0,0]},
 path:{n:'디딤돌 길',i:'🪨',w:1.2,d:4,c:[0,2]},
 wall:{n:'돌담',i:'🧱',w:4,d:.6,c:[0,4]},
 gate:{n:'대문',i:'🚪',w:3.2,d:1,c:[8,2]},
 pond:{n:'연못',i:'🪷',w:3.4,d:3.4,c:[0,6]},
 jars:{n:'장독대',i:'🏺',w:2.2,d:1.6,c:[0,3]},
 lantern:{n:'석등',i:'🏮',w:.8,d:.8,c:[0,2]},
 bench:{n:'평상',i:'🛋️',w:2.2,d:1.4,c:[3,0]},
 fire:{n:'화덕',i:'🔥',w:1.4,d:1.4,c:[0,4]},
 pine:{n:'소나무',i:'🌲',w:1.2,d:1.2,c:[1,0]},
 flowers:{n:'꽃밭',i:'🌸',w:2,d:2,c:[0,0]},
 maple:{n:'단풍나무',i:'🍁',w:1.4,d:1.4,c:[1,0]}};
const SQL_MISSING_MSG='서버 표가 아직 없어 이 기기에만 저장돼요.';
export function buildHomes(G,{TOP,WATER_Y,MS=1,mulb}){
 const IX=-250,IZ=48,RC=34;/* 가운데 섬 */const r=mulb(4242);const MT=materials();
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.85},o));
 const mats={grass:M(0x7cb85a,{roughness:1}),sand:M(0xe8d8a8,{roughness:1}),stone:M(0xb8b0a2,{roughness:.95}),stoneD:M(0x8a8276),wood:M(0x8a5a34,{roughness:.75}),woodD:M(0x4a3020),woodL:M(0xc89a62),plaster:M(0xf4efe4),glass:new THREE.MeshStandardMaterial({color:0xbfe6f2,roughness:.05,metalness:.1,transparent:true,opacity:.38,side:THREE.DoubleSide}),water:new THREE.MeshStandardMaterial({color:0x4fc0e0,roughness:.05,metalness:.1,transparent:true,opacity:.85}),tile:M(0xdff2f6,{roughness:.4}),leaf:M(0x3f8a3c,{flatShading:true}),red:M(0xe0603a,{flatShading:true}),pink:M(0xf2a6c0),yel:M(0xf4d04a),jar:M(0x4a2f22,{roughness:.4}),steam:new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.45,depthWrite:false}),fireM:new THREE.MeshBasicMaterial({color:0xffa030}),lamp:new THREE.MeshBasicMaterial({color:0xffe6a0})};
 const box=(w,h,d,m,x=0,y=0,z=0,g)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.position.set(x,y,z);b.castShadow=b.receiveShadow=true;g&&g.add(b);return b};
 const cyl=(r1,r2,h,m,x=0,y=0,z=0,g,seg=14)=>{const b=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,seg),m);b.position.set(x,y,z);b.castShadow=b.receiveShadow=true;g&&g.add(b);return b};
 const root=new THREE.Group();root.userData.noBatch=true;/* 집은 바뀌므로 합쳐 그리기에서 뺌 */G.add(root);const anim=[];
 /* ---------- 땅 판정: 가운데 섬 + 집터 섬 + 다리 ---------- */
 const lands=[{x:IX,z:IZ,r:RC}],rects=[];/* rects: {x,z,hw,hd,ry} */
 const onLand=(x,z)=>{for(const l of lands)if(Math.hypot(x-l.x,z-l.z)<l.r)return true;for(const q of rects){const c=Math.cos(q.ry),s=Math.sin(q.ry),dx=x-q.x,dz=z-q.z,lx=dx*c-dz*s,lz=dx*s+dz*c;if(Math.abs(lx)<q.hw&&Math.abs(lz)<q.hd)return true}return false};
 /* ---------- 가운데 섬 ---------- */
 {const top=cyl(RC,RC+1.5,TOP-WATER_Y+.6,mats.grass,IX,(TOP+WATER_Y)/2-.3,IZ,root,48);const rim=cyl(RC+3,RC+4,.4,mats.sand,IX,WATER_Y+.1,IZ,root,48);top.receiveShadow=true;
  /* 이름 간판 */const cv=document.createElement('canvas');cv.width=512;cv.height=160;const q=cv.getContext('2d');q.fillStyle='rgba(43,29,18,.9)';q.beginPath();q.roundRect(6,6,500,148,30);q.fill();q.strokeStyle='#7cb85a';q.lineWidth=8;q.stroke();q.fillStyle='#f2d27a';q.textAlign='center';q.font='bold 60px "Do Hyeon",sans-serif';q.fillText('무이 집짓기 섬',256,78);q.fillStyle='#f3ead6';q.font='32px "Gowun Dodum",sans-serif';q.fillText('나무 베고 돌 캐서 내 집 짓기',256,130);const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:t}));sp.scale.set(10,3.1,1);sp.position.set(IX+8,TOP+13,IZ);root.add(sp);
  /* 나루(동쪽, 육지 쪽) */for(let i=0;i<8;i++)box(1.4,.2,2.4,mats.wood,IX+RC+i*1.4,TOP-.1,IZ,root);rects.push({x:IX+RC+5,z:IZ,hw:6,hd:1.3,ry:0});
  /* 가운데 마당: 디딤돌 둥근 판 + 우물 */const pl=cyl(7,7,.12,mats.stone,IX+6,TOP+.06,IZ,root,32);cyl(1,1.1,.9,mats.stoneD,IX+6,TOP+.45,IZ,root);}
 /* ---------- 캐는 곳: 북쪽 숲(나무) · 남쪽 돌밭(돌) ---------- */
 const nodes=[];const trunkG=new THREE.CylinderGeometry(.22,.3,2.2,8).translate(0,1.1,0),crownG=new THREE.IcosahedronGeometry(1.4,1).translate(0,3,0),rockG=new THREE.DodecahedronGeometry(1,0);
 for(let i=0;i<22;i++){const a=r()*Math.PI*2,d=8+r()*(RC-11);let x=IX+Math.cos(a)*d,z=IZ+Math.sin(a)*d;const tree=z<IZ;/* 북쪽 반=숲, 남쪽 반=돌밭 */if(Math.abs(x-IX-6)<9&&Math.abs(z-IZ)<9)continue;if(x>IX+RC-8&&Math.abs(z-IZ)<5)continue;
  const g=new THREE.Group();g.position.set(x,TOP,z);root.add(g);if(tree){const tr=new THREE.Mesh(trunkG,mats.woodD);tr.castShadow=true;g.add(tr);const cr=new THREE.Mesh(crownG,r()<.3?mats.red:mats.leaf);cr.castShadow=true;cr.scale.set(1,1.1,1);g.add(cr)}else{const rk=new THREE.Mesh(rockG,mats.stone);rk.scale.set(1.1+r()*.5,.8+r()*.4,1+r()*.4);rk.position.y=.55;rk.rotation.y=r()*3;rk.castShadow=true;g.add(rk)}
  nodes.push({g,x,z,kind:tree?'wood':'stone',hp:3,back:0})}
 /* ---------- 저장 ---------- */
 const LS='muui3d-home';let me=null;try{me=JSON.parse(localStorage.getItem(LS)||'null')}catch(e){}
 if(!me||!me.v)me={v:1,level:1,wood:12,stone:8,items:[],slot:null};
 let token=null;try{token=localStorage.getItem('muui3d-home-token');if(!token){token=Array.from(crypto.getRandomValues(new Uint8Array(18)),b=>b.toString(16).padStart(2,'0')).join('');localStorage.setItem('muui3d-home-token',token)}}catch(e){token='t'+Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)}
 let server='unknown';/* unknown | ok | none */
 const hdr={apikey:SB.key,Authorization:'Bearer '+SB.key,'Content-Type':'application/json'};
 let saveT=null;const saveLocal=()=>{try{localStorage.setItem(LS,JSON.stringify(me))}catch(e){}};
 const save=()=>{saveLocal();clearTimeout(saveT);saveT=setTimeout(saveServer,1500)};
 async function saveServer(){if(server==='none')return;try{const res=await fetch(SB.url+'/rest/v1/rpc/save_home',{method:'POST',headers:hdr,body:JSON.stringify({p_sid:SB.sid,p_token:token,p_name:myName(),p_level:me.level,p_data:{items:me.items,wood:me.wood,stone:me.stone}})});if(!res.ok){if(res.status===404||res.status===400)server='none';return}const slot=await res.json();server='ok';if(typeof slot==='number'&&slot!==me.slot){me.slot=slot;saveLocal();layoutAll()}}catch(e){}}
 /* ---------- 집터 배치: 가운데 섬 둘레 서쪽 반원에 고리로 ---------- */
 const lotPos=i=>{let k=0,n=4,s=i;while(s>=n){s-=n;k++;n=4+3*k}const R=RC+30+k*44;const a=Math.PI/2+(s+.5)/n*Math.PI;return{x:IX+Math.cos(a)*R,z:IZ+Math.sin(a)*R,ry:Math.PI/2-a,ring:k}};
 const lots=new Map();/* slot → {g,plat,data,mine} */
 function drawLot(slot,data,mine){let L=lots.get(slot);if(L){root.remove(L.g)}const p=lotPos(slot);const lv=Math.max(1,Math.min(6,data.level||1)),S=LV[lv];const g=new THREE.Group();g.position.set(p.x,0,p.z);g.rotation.y=p.ry;root.add(g);
  /* 섬 판 */const plat=box(S+4,TOP-WATER_Y+.6,S+4,mats.grass,0,(TOP+WATER_Y)/2-.3,0,g);const sand=box(S+6,.4,S+6,mats.sand,0,WATER_Y+.1,0,g);
  /* 집터 테두리 돌 */for(const [w,d,x,z] of[[S,.25,0,-S/2],[S,.25,0,S/2],[.25,S,-S/2,0],[.25,S,S/2,0]])box(w,.18,d,mats.stoneD,x,TOP+.09,z,g);
  /* 다리: 가운데 섬 쪽(로컬 -z가 가운데를 향함) */const dist=Math.hypot(p.x-IX,p.z-IZ)-RC-(S+4)/2+1;const br=new THREE.Group();br.position.set(0,0,-(S+4)/2-dist/2+.5);g.add(br);for(let i=0;i<Math.ceil(dist/1.1);i++)box(2.4,.18,1,mats.wood,0,TOP-.08,-dist/2+i*1.1+.5,br);for(const sx of[-1.25,1.25]){box(.12,.9,dist,mats.woodD,sx,TOP+.45,0,br)}
  /* 이름 말뚝 */const nm=(data.name||'무이')+(mine?' (내 집)':'');const cv=document.createElement('canvas');cv.width=384;cv.height=96;const q=cv.getContext('2d');q.fillStyle=mine?'#e7b75a':'#3b2a1c';q.fillRect(0,0,384,96);q.fillStyle=mine?'#1d1408':'#f2d27a';q.textAlign='center';q.font='bold 40px "Do Hyeon",sans-serif';q.fillText(nm.slice(0,14),192,62);const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;const sg=new THREE.Mesh(new THREE.PlaneGeometry(2.4,.6),new THREE.MeshStandardMaterial({map:t}));sg.position.set(1.8,TOP+1.5,-S/2-.6);sg.rotation.y=Math.PI;g.add(sg);box(.12,1.5,.12,mats.woodD,1.8,TOP+.75,-S/2-.55,g);
  const items=new THREE.Group();g.add(items);for(const it of (data.items||[]))if(PARTS[it.k])addItem(items,it);
  rects.push({x:p.x,z:p.z,hw:(S+4)/2,hd:(S+4)/2,ry:p.ry,slot});/* 다리 판정 */const bx=p.x+Math.sin(p.ry)*(-(S+4)/2-dist/2),bz=p.z+Math.cos(p.ry)*(-(S+4)/2-dist/2);rects.push({x:bx,z:bz,hw:1.3,hd:dist/2+1,ry:p.ry,slot});
  L={g,items,data,mine,p,S};lots.set(slot,L);return L}
 function layoutAll(){/* 다시 그림: 판정 rects 비우고 모두 */rects.splice(1);for(const [s,L] of [...lots]){root.remove(L.g);lots.delete(s)}for(const o of others)drawLot(o.slot,o,false);const ms=me.slot==null?(others.length?Math.max(...others.map(o=>o.slot))+1:0):me.slot;myLot=drawLot(ms,{name:myName(),level:me.level,items:me.items},true)}
 let others=[],myLot=null;
 /* ---------- 부품 모양 ---------- */
 function addItem(par,it){const P=PARTS[it.k];const g=new THREE.Group();g.position.set(it.x,TOP,it.z);g.rotation.y=(it.r||0)*Math.PI/2;g.userData.it=it;par.add(g);buildPart(g,it.k);return g}
 function hanok(g,W,D,H){/* 기단 */box(W+.8,.45,D+.8,mats.stone,0,.22,0,g);
  /* 기둥(어두운 나무) */const cols=Math.round(W/2.4);for(let i=0;i<=cols;i++)for(const z of[-D/2,D/2]){cyl(.13,.15,H,mats.woodD,-W/2+i*W/cols,.45+H/2,z,g,8)}for(const x of[-W/2,W/2])cyl(.13,.15,H,mats.woodD,x,.45+H/2,0,g,8);
  /* 앞은 통유리, 옆·뒤는 흰 벽 + 창살 띠 */const gl=new THREE.Mesh(new THREE.PlaneGeometry(W-.3,H-.4),mats.glass);gl.position.set(0,.45+(H-.4)/2+.05,D/2-.05);g.add(gl);for(let i=1;i<cols;i++)box(.06,H-.4,.08,mats.woodD,-W/2+i*W/cols,.45+(H-.4)/2+.05,D/2-.05,g);
  box(W,H-.4,.15,mats.plaster,0,.45+(H-.4)/2+.05,-D/2+.1,g);for(const x of[-W/2+.1,W/2-.1])box(.15,H-.4,D-.2,mats.plaster,x,.45+(H-.4)/2+.05,0,g);
  box(W+.1,.22,D+.1,mats.woodD,0,.45+H-.1,0,g);/* 창방 */
  /* 툇마루 */box(W,.12,1.1,mats.woodL,0,.5,D/2+.6,g);
  /* 기와 지붕 */try{const rf=hipRoof(MT,W/2+1.2,D/2+1.1,Math.max(.6,W/2-D/2),.45+H+.1,.45+H+D*.36+.6,.35,.15,{plain:true,rs:.5});g.add(rf.group||rf)}catch(e){box(W+2,.4,D+2,mats.woodD,0,.45+H+.4,0,g)}
  /* 안쪽: 마루와 등 */box(W-.4,.06,D-.4,mats.woodL,0,.48,0,g);const lp=new THREE.Mesh(new THREE.SphereGeometry(.18,10,8),mats.lamp);lp.position.set(0,.45+H-.5,0);g.add(lp)}
 function buildPart(g,k){switch(k){
  case 'hanokS':hanok(g,6,4,2.7);break;
  case 'hanokL':hanok(g,10,6,3.1);/* 옆 날개 데크 */box(3,.15,6,mats.woodL,6.6,.3,0,g);break;
  case 'pool':{box(7,.3,3.6,mats.stone,0,.12,0,g);const w=new THREE.Mesh(new THREE.BoxGeometry(6.2,.1,2.8),mats.water);w.position.y=.24;g.add(w);box(6.4,.05,3,mats.tile,0,.16,0,g);anim.push(t=>{w.position.y=.24+Math.sin(t*2)*.012});/* 사다리 */for(const x of[-.2,.2])box(.05,.7,.05,mats.stoneD,2.9+x,.45,-1.3,g);break}
  case 'sauna':{/* 한증막: 흙 돔 + 나무 문 + 굴뚝 김 */const d=new THREE.Mesh(new THREE.SphereGeometry(1.7,18,12,0,Math.PI*2,0,Math.PI/2),M(0xc8a07a,{flatShading:true}));d.castShadow=true;g.add(d);box(.9,1.3,.2,mats.wood,0,.65,1.6,g);cyl(.18,.22,1.2,mats.stoneD,.9,1.7,-.4,g,8);const st=[];for(let i=0;i<4;i++){const s=new THREE.Mesh(new THREE.SphereGeometry(.25,8,6),mats.steam);g.add(s);st.push(s)}anim.push(t=>{st.forEach((s,i)=>{const u=(t*.5+i/4)%1;s.position.set(.9+Math.sin(u*6+i)*.15,2.3+u*1.6,-.4);s.scale.setScalar(.6+u*1.4);s.material.opacity=.45*(1-u)})});break}
  case 'pav':{box(3.4,.35,3.4,mats.stone,0,.17,0,g);for(const x of[-1.4,1.4])for(const z of[-1.4,1.4])cyl(.1,.12,2.3,mats.wood,x,1.5,z,g,8);box(3,.1,3,mats.woodL,0,.75,0,g);try{const rf=hipRoof(MT,2.3,2.3,.2,2.7,3.7,.3,.12,{plain:true,rs:.4});g.add(rf.group||rf)}catch(e){}break}
  case 'deck':box(4,.2,4,mats.woodL,0,.1,0,g);for(let i=0;i<5;i++)box(.04,.21,4,mats.wood,-1.6+i*.8,.1,0,g);break;
  case 'lawn':box(4,.06,4,M(0x5fae3a,{roughness:1}),0,.03,0,g);break;
  case 'path':for(let i=0;i<4;i++)cyl(.45,.5,.1,mats.stone,(i%2?.15:-.15),.05,-1.5+i,g,10);break;
  case 'wall':box(4,1.2,.5,mats.stone,0,.6,0,g);box(4.2,.2,.7,MT&&MT.roof?MT.roof:mats.woodD,0,1.3,0,g);break;
  case 'gate':for(const x of[-1.3,1.3])box(.25,2.4,.25,mats.woodD,x,1.2,0,g);box(1.2,1.9,.1,mats.wood,-.62,.95,0,g);box(1.2,1.9,.1,mats.wood,.62,.95,0,g);box(3.2,.3,.6,mats.woodD,0,2.5,0,g);break;
  case 'pond':{const s=new THREE.Mesh(new THREE.CylinderGeometry(1.7,1.7,.15,24),mats.stone);s.position.y=.07;g.add(s);const w=new THREE.Mesh(new THREE.CylinderGeometry(1.45,1.45,.05,24),mats.water);w.position.y=.16;g.add(w);for(let i=0;i<3;i++){const p=new THREE.Mesh(new THREE.CircleGeometry(.25,10).rotateX(-Math.PI/2),M(0x4f9a3c));p.position.set(Math.cos(i*2)*.7,.2,Math.sin(i*2)*.7);g.add(p);const f=new THREE.Mesh(new THREE.SphereGeometry(.1,8,6),mats.pink);f.position.set(Math.cos(i*2)*.7,.27,Math.sin(i*2)*.7);g.add(f)}break}
  case 'jars':box(2.2,.25,1.6,mats.stone,0,.12,0,g);for(let i=0;i<5;i++){const j=new THREE.Mesh(new THREE.SphereGeometry(.32+(i%2)*.08,12,10),mats.jar);j.scale.y=1.2;j.position.set(-.75+i*.38,.6,(i%2?.35:-.3));j.castShadow=true;g.add(j)}break;
  case 'lantern':cyl(.25,.3,.2,mats.stone,0,.1,0,g,8);cyl(.1,.1,.8,mats.stone,0,.6,0,g,8);box(.45,.4,.45,mats.stone,0,1.2,0,g);box(.3,.25,.3,mats.lamp,0,1.2,0,g);cyl(0,.4,.3,mats.stoneD,0,1.55,0,g,4);break;
  case 'bench':box(2.2,.12,1.4,mats.woodL,0,.45,0,g);for(const x of[-1,1])for(const z of[-.6,.6])box(.1,.45,.1,mats.woodD,x,.22,z,g);break;
  case 'fire':{cyl(.6,.7,.4,mats.stoneD,0,.2,0,g,10);const fl=new THREE.Mesh(new THREE.ConeGeometry(.3,.6,8),mats.fireM);fl.position.y=.65;g.add(fl);anim.push(t=>{fl.scale.set(1,.8+Math.sin(t*12)*.2,1)});break}
  case 'pine':{cyl(.12,.16,1.6,mats.woodD,0,.8,0,g,6);for(let i=0;i<3;i++){const c=new THREE.Mesh(new THREE.ConeGeometry(.9-i*.22,.9,8),mats.leaf);c.position.y=1.4+i*.5;c.castShadow=true;g.add(c)}break}
  case 'maple':{cyl(.12,.16,1.4,mats.woodD,0,.7,0,g,6);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(.9,1),mats.red);c.position.y=1.9;c.castShadow=true;g.add(c);break}
  case 'flowers':box(2,.08,2,M(0x6a4a2e),0,.04,0,g);for(let i=0;i<14;i++){const f=new THREE.Mesh(new THREE.SphereGeometry(.12,6,5),[mats.pink,mats.yel,M(0xffffff),mats.red][i%4]);f.position.set((Math.random()-.5)*1.7,.25,(Math.random()-.5)*1.7);g.add(f)}break}}
 /* ---------- 처음 그리기 + 남의 집 받기 ---------- */
 layoutAll();
 (async()=>{try{const res=await fetch(SB.url+'/rest/v1/muui_homes_pub?select=sid,name,slot,level,data&order=updated_at.desc&limit=40',{headers:hdr});if(!res.ok){server='none';return}server='ok';const rows=await res.json();others=rows.filter(o=>o.sid!==SB.sid&&typeof o.slot==='number').map(o=>({slot:o.slot,name:o.name,level:o.level,items:(o.data&&o.data.items)||[]}));const mine=rows.find(o=>o.sid===SB.sid);if(mine&&typeof mine.slot==='number')me.slot=mine.slot;layoutAll();if(me.slot==null&&me.items.length)saveServer()}catch(e){}})();
 /* ---------- 화면: 재료 수, 짓기 메뉴, 놓기 조종 ---------- */
 const H=()=>window.__H3;const say=(t,s=3)=>{try{H().say(t,s)}catch(e){}};
 const ui=document.createElement('div');ui.id='homeUI';ui.innerHTML=`<style>
#homeUI .res{position:fixed;left:10px;bottom:calc(env(safe-area-inset-bottom) + 12px);z-index:9;background:rgba(22,16,11,.86);color:#f3eadb;border:1px solid rgba(255,236,210,.25);border-radius:12px;padding:6px 10px;font:15px "Do Hyeon",sans-serif;display:flex;gap:10px;align-items:center}
#homeUI .bar{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(env(safe-area-inset-bottom) + 64px);z-index:10;width:min(720px,96vw);max-height:46vh;overflow:auto;background:rgba(22,16,11,.95);border:2px solid #d8a838;border-radius:16px;padding:10px;display:grid;grid-template-columns:repeat(auto-fill,minmax(98px,1fr));gap:6px}
#homeUI .bar h3{grid-column:1/-1;margin:0;color:#f2d27a;font:19px "Do Hyeon",sans-serif;display:flex;justify-content:space-between;align-items:center}
#homeUI .bar button,#homeUI .ctl button,#homeUI .act{font:14px "Do Hyeon",sans-serif;border-radius:10px;border:1px solid #6b5132;background:#3b2a1c;color:#f3ead6;cursor:pointer;padding:6px}
#homeUI .bar button i{display:block;font-style:normal;font-size:24px}#homeUI .bar button small{display:block;color:#d8c8a0;font-size:11.5px}
#homeUI .bar button.no{opacity:.45}
#homeUI .ctl{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(env(safe-area-inset-bottom) + 64px);z-index:10;display:flex;gap:8px}
#homeUI .ctl button{font-size:17px;padding:10px 16px}#homeUI .ctl .ok{background:#e7b75a;color:#1d1408}
#homeUI .act{position:fixed;right:12px;bottom:calc(env(safe-area-inset-bottom) + 230px);z-index:9;font-size:18px;padding:12px 18px;background:#e7b75a;color:#1d1408;border:3px solid #3b2a1c}
</style><div class="res" hidden><span>🪵 <b id="hW">0</b></span><span>🪨 <b id="hS">0</b></span><span id="hL"></span></div><div class="bar" hidden></div><div class="ctl" hidden><button type="button" data-c="rot">⟳ 돌리기</button><button type="button" class="ok" data-c="ok">✔ 놓기</button><button type="button" data-c="no">✕ 그만</button></div><button class="act" type="button" hidden></button>`;document.body.appendChild(ui);
 const $=s=>ui.querySelector(s);const res=$('.res'),bar=$('.bar'),ctl=$('.ctl'),act=$('.act');
 const draw=()=>{$('#hW').textContent=me.wood;$('#hS').textContent=me.stone;$('#hL').textContent=`집터 ${LV[me.level]}m`};draw();
 let ghost=null,gIt=null,mode=null;/* mode: place | null */
 const openBar=()=>{const next=LVCOST[me.level+1];bar.innerHTML=`<h3><span>무엇을 지을까요?</span><button type="button" data-x="1">닫기 ✕</button></h3>`+Object.entries(PARTS).map(([k,p])=>{const ok=me.wood>=p.c[0]&&me.stone>=p.c[1];return`<button type="button" data-k="${k}" class="${ok?'':'no'}"><i>${p.i}</i>${p.n}<small>${p.c[0]?'🪵'+p.c[0]+' ':''}${p.c[1]?'🪨'+p.c[1]:''}${!p.c[0]&&!p.c[1]?'공짜':''}</small></button>`}).join('')+(next?`<button type="button" data-up="1" class="${me.wood>=next[0]&&me.stone>=next[1]?'':'no'}"><i>📐</i>집터 넓히기 ${LV[me.level]}→${LV[me.level+1]}m<small>🪵${next[0]} 🪨${next[1]}</small></button>`:'')+`<button type="button" data-rm="1"><i>🧹</i>치우기<small>가까운 것 하나</small></button>`;bar.hidden=false};
 bar.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.x){bar.hidden=true;return}
  if(b.dataset.up){const n=LVCOST[me.level+1];if(!n)return;if(me.wood<n[0]||me.stone<n[1]){say(`재료가 모자라요. 🪵${n[0]} 🪨${n[1]}이 필요해요.`);return}me.wood-=n[0];me.stone-=n[1];me.level++;save();draw();layoutAll();bar.hidden=true;say(`집터가 ${LV[me.level]}m로 넓어졌어요!`,4);return}
  if(b.dataset.rm){bar.hidden=true;removeNear();return}
  const k=b.dataset.k,p=PARTS[k];if(!p)return;if(me.wood<p.c[0]||me.stone<p.c[1]){say(`재료가 모자라요. 섬 숲에서 나무를, 돌밭에서 돌을 캐 와요.`);return}bar.hidden=true;startPlace(k)});
 const lotLocal=(x,z)=>{const L=myLot;const c=Math.cos(L.p.ry),s=Math.sin(L.p.ry),dx=x-L.p.x,dz=z-L.p.z;return{x:dx*c-dz*s,z:dx*s+dz*c}};
 function startPlace(k){mode='place';gIt={k,x:0,z:0,r:0};ghost=addItem(myLot.items,gIt);ghost.traverse(o=>{if(o.isMesh){o.material=o.material.clone();o.material.transparent=true;o.material.opacity=.55}});ctl.hidden=false;say('무이가 걸어가면 따라와요. 자리를 잡고 ✔ 놓기!',4)}
 const endPlace=()=>{if(ghost){myLot.items.remove(ghost);ghost=null}gIt=null;mode=null;ctl.hidden=true};
 ctl.addEventListener('click',e=>{const c=e.target.closest('button')&&e.target.closest('button').dataset.c;if(!c||!gIt)return;
  if(c==='rot'){gIt.r=((gIt.r||0)+1)%4;ghost.rotation.y=gIt.r*Math.PI/2}
  if(c==='no')endPlace();
  if(c==='ok'){const p=PARTS[gIt.k];if(me.wood<p.c[0]||me.stone<p.c[1]){say('재료가 모자라요.');return}me.wood-=p.c[0];me.stone-=p.c[1];const it={k:gIt.k,x:+gIt.x.toFixed(1),z:+gIt.z.toFixed(1),r:gIt.r||0};me.items.push(it);endPlace();addItem(myLot.items,it);save();draw();try{H().act('hammer',1.2)}catch(e){}say(`${p.n}을(를) 지었어요!`,3)}});
 function removeNear(){const P=H().P,l=lotLocal(P.x,P.z);let bi=-1,bd=4;me.items.forEach((it,i)=>{const d=Math.hypot(it.x-l.x,it.z-l.z);if(d<bd){bd=d;bi=i}});if(bi<0){say('가까이 치울 것이 없어요. 치울 것 옆에 서 봐요.');return}const it=me.items.splice(bi,1)[0];const p=PARTS[it.k];me.wood+=p.c[0];me.stone+=p.c[1];myLot.items.children.filter(g=>g.userData.it===it).forEach(g=>myLot.items.remove(g));save();draw();say(`${p.n}을(를) 치우고 재료를 돌려받았어요.`)}
 /* 집짓기 단추(윗줄) */let hb=null;const addBtn=()=>{const top=document.getElementById('top');if(!top){setTimeout(addBtn,400);return}hb=document.createElement('button');hb.className='btn';hb.id='bHome';hb.type='button';hb.textContent='집짓기';hb.hidden=true;top.insertBefore(hb,document.getElementById('bBack'));hb.addEventListener('click',()=>{if(!inMine){say('내 집터(이름 말뚝이 노란 곳)에 들어가면 지을 수 있어요.');return}if(mode)endPlace();bar.hidden?openBar():bar.hidden=true})};addBtn();
 let near=null,inMine=false,onIsle=false,toldFirst=false,acting=0;
 act.addEventListener('click',()=>{if(!near||acting>0)return;acting=1.1;const n=near;try{H().act(n.kind==='wood'?'hammer':'dig',1.1)}catch(e){}setTimeout(()=>{n.hp--;const got=n.kind==='wood'?3:2;if(n.kind==='wood')me.wood+=got;else me.stone+=got;save();draw();try{const AC=H().AC;if(AC&&!window.__MUTE){const o=AC.createOscillator(),g=AC.createGain();o.type='triangle';o.frequency.value=n.kind==='wood'?320:520;g.gain.setValueAtTime(.18,AC.currentTime);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+.25);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+.26)}}catch(e){}
   n.g.scale.setScalar(.6+n.hp*.13);if(n.hp<=0){n.g.visible=false;n.back=45;say(n.kind==='wood'?'나무 다 베었어요. 조금 있으면 새로 자라요.':'돌 다 캤어요. 조금 있으면 새로 생겨요.')}},700)});
 const tick=(P,dt,t)=>{for(const f of anim)f(t);acting=Math.max(0,acting-dt);
  for(const n of nodes){if(n.back>0){n.back-=dt;if(n.back<=0){n.hp=3;n.g.visible=true;n.g.scale.setScalar(1)}}}
  onIsle=Math.hypot(P.x-IX,P.z-IZ)<RC+180;res.hidden=!onIsle;if(hb)hb.hidden=!onIsle;
  if(!onIsle){act.hidden=true;return}
  if(!toldFirst&&Math.hypot(P.x-IX,P.z-IZ)<RC){toldFirst=true;say('무이 집짓기 섬이에요! 숲에서 나무를, 돌밭에서 돌을 캐서 서쪽 내 집터에 집을 지어요.',6)}
  near=null;let bd=2.6;for(const n of nodes){if(!n.g.visible)continue;const d=Math.hypot(P.x-n.x,P.z-n.z);if(d<bd){bd=d;near=n}}
  act.hidden=!near||!!mode;if(near)act.textContent=near.kind==='wood'?'🪓 나무 베기':'⛏ 돌 캐기';
  if(myLot){const l=lotLocal(P.x,P.z),S=myLot.S;inMine=Math.abs(l.x)<S/2+1&&Math.abs(l.z)<S/2+1;
   if(mode==='place'&&ghost){const ahead=lotLocal(P.x+Math.sin(myYaw())*2.8,P.z+Math.cos(myYaw())*2.8);const p=PARTS[gIt.k];const hw=(gIt.r%2?p.d:p.w)/2,hd=(gIt.r%2?p.w:p.d)/2;gIt.x=Math.round(Math.max(-S/2+hw,Math.min(S/2-hw,ahead.x))*2)/2;gIt.z=Math.round(Math.max(-S/2+hd,Math.min(S/2-hd,ahead.z))*2)/2;ghost.position.set(gIt.x,TOP+.02,gIt.z)}}};
 const myYaw=()=>{try{const R=H().me.root;return R.rotation.y}catch(e){return 0}};
 /* 지도에 쓰는 것 */
 const API={tick,onLand,center:{x:IX,z:IZ},myLot:()=>myLot,draw,lotLocal,myLotPos:()=>myLot?{x:myLot.p.x,z:myLot.p.z}:null,state:()=>({me,server,lots:[...lots.keys()]}),nodes};window.__HOMES=API;return API}
