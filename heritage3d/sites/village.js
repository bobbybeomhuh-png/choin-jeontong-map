/* 무이 마을: 쓰레드에서 이웃이 된 사람마다 한옥 한 채. 단위 1 = 1m. 골목은 z축(입구 +z → 안쪽 -z).
   갱신 2026-11-12. 이웃 명단은 ../village/neighbors.json 하나만 고치면 집이 늘어난다.
   명단 한 줄: {"name":"표시 이름","date":"2026-11-12","from":"threads","note":"한마디(선택)"}
   집 모양(기와집·초가집, 벽·문 색)은 이름으로 정해져 늘 같은 집이 나온다. 민가라 잡상·취두는 없다. */
import * as THREE from 'three';
import {tex,noise,mulb,materials,hipRoof} from './sungnyemun.js';
const NB_URL=new URL('../village/neighbors.json',import.meta.url).href;
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
const hash=s=>{let h=2166136261;for(const c of String(s)){h^=c.codePointAt(0);h=Math.imul(h,16777619)}return h>>>0};
const CREW=[{name:'목수 무이',crew:1,type:'giwa',note:'다보탑과 숭례문을 맡아요.'},{name:'도공 무이',crew:1,type:'choga',note:'달항아리를 빚어요.'},{name:'화공 무이',crew:1,type:'giwa',note:'일월오봉도와 단청을 칠해요.'},{name:'과학 무이',crew:1,type:'giwa',note:'측우기와 거북선을 살펴요.'},{name:'금속 무이',crew:1,type:'choga',note:'금동대향로를 다듬어요.'}];/* 무이 복원단 다섯 집: 마을 입구 첫 줄 */
const LOT=10.5,LX=9.6,EMPTY=6;/* 집터 간격, 골목 가운데에서 집터 가운데까지, 늘 남겨 둘 빈 집터 수 */
export function lotPos(i){const side=i%2?1:-1,row=Math.floor(i/2);return{x:side*LX,z:-3-row*LOT,side,row}}
export function buildVillage(opts={}){const mini=!!opts.mini;const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(77);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
 const stone=M(0x9a9286),stoneD=M(0x7d766b),woodB=M(0x6b4a2e),woodL=M(0x9a7350),straw=M(0xc9a865,{flatShading:true}),strawD=M(0xa88a4e),capT=M(0x4a4c50,{roughness:.7});
 const WALLS=[0xf1ece2,0xe9e1d0,0xf3efe8,0xe6dccb],DOORS=[0x6b4a2e,0x8a3a2a,0x3d5a46,0x5a4632];
 const LATT=tex(256,256,(q,w,h)=>{q.fillStyle='#efe6d2';q.fillRect(0,0,w,h);q.strokeStyle='#6b4a2e';q.lineWidth=6;for(let i=0;i<=8;i++){q.beginPath();q.moveTo(i*w/8,0);q.lineTo(i*w/8,h);q.stroke();q.beginPath();q.moveTo(0,i*h/8);q.lineTo(w,i*h/8);q.stroke()}q.lineWidth=12;q.strokeRect(0,0,w,h)});
 const latt=new THREE.MeshStandardMaterial({map:LATT,roughness:.9});
 /* 골목 돌길과 입구 */
 const PAVE=tex(256,256,(q,w,h)=>{q.fillStyle='#a49c8e';q.fillRect(0,0,w,h);for(let i=0;i<40;i++){const g=150+(r()*40|0);q.fillStyle=`rgb(${g},${g-6},${g-16})`;q.beginPath();q.ellipse(r()*w,r()*h,14+r()*20,10+r()*14,r()*3,0,7);q.fill()}noise(q,w,h,2000,['rgba(0,0,0,.08)','rgba(255,255,255,.06)'],2)});PAVE.wrapS=PAVE.wrapT=THREE.RepeatWrapping;
 let lane=null;const setLane=len=>{if(lane)G.remove(lane);const t=PAVE.clone();t.needsUpdate=true;t.repeat.set(1.2,len/4);lane=new THREE.Mesh(new THREE.PlaneGeometry(5,len),new THREE.MeshStandardMaterial({map:t,roughness:.95}));lane.rotation.x=-Math.PI/2;lane.position.set(0,.02,10-len/2);lane.receiveShadow=true;G.add(lane)};
 /* 입구: 장승 둘, 솟대 */if(!mini){for(const sx of[-1,1]){const g=new THREE.Group();const p=new THREE.Mesh(new THREE.CylinderGeometry(.28,.34,2.6,10),woodL);p.position.y=1.3;g.add(p);const hd=new THREE.Mesh(new THREE.SphereGeometry(.36,12,10),woodL);hd.scale.set(1,1.15,.9);hd.position.y=2.55;g.add(hd);const hat=new THREE.Mesh(new THREE.CylinderGeometry(.2,.42,.5,10),M(0x2a2420));hat.position.y=3.05;g.add(hat);
   const face=tex(128,256,(q,w,h)=>{q.fillStyle='rgba(0,0,0,0)';q.clearRect(0,0,w,h);q.fillStyle='#1d1408';q.beginPath();q.ellipse(40,60,14,10,0,0,7);q.ellipse(88,60,14,10,0,0,7);q.fill();q.fillStyle='#a8352a';q.fillRect(54,80,20,40);q.fillStyle='#f2e6c0';q.fillRect(36,130,56,14);q.fillStyle='#1d1408';q.font='bold 34px serif';q.textAlign='center';q.fillText(sx<0?'天':'地',64,200)});const fm=new THREE.Mesh(new THREE.PlaneGeometry(.6,1.2),new THREE.MeshBasicMaterial({map:face,transparent:true}));fm.position.set(0,2.2,.33);g.add(fm);g.position.set(sx*3.4,0,11);g.traverse(o=>{if(o.isMesh)o.castShadow=true});G.add(g);solids.push({cx:sx*3.4,cz:11,r:.4,y0:0,y1:3.2})}
  const sd=new THREE.Mesh(new THREE.CylinderGeometry(.06,.08,6,6),woodL);sd.position.set(-5.2,3,12.5);G.add(sd);const bird=new THREE.Mesh(new THREE.ConeGeometry(.16,.7,6),woodL);bird.rotation.z=Math.PI/2;bird.position.set(-5.2,6.1,12.5);G.add(bird)}
 /* 집 한 채(집터 가운데가 원점, 앞이 +z) */
 function house(nb,i){const h=hash(nb.name),type=nb.type||(h%3===0?'choga':'giwa');const g=new THREE.Group();const wall=M(WALLS[h%4]),door=M(DOORS[(h>>>3)%4]);
  const base=box(7.2,.45,4.6,stone);base.position.y=.225;g.add(base);
  for(const x of[-3,-1,1,3])for(const z of[-1.9,1.9]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.13,.15,2.5,8),woodB);p.position.set(x,.45+1.25,z);p.castShadow=true;g.add(p)}
  const back=box(6,2.3,.16,wall);back.position.set(0,1.6,-1.9);g.add(back);for(const sx of[-1,1]){const sd=box(.16,2.3,3.8,wall);sd.position.set(sx*3,1.6,0);g.add(sd)}
  for(const x of[-2,0,2]){const d=new THREE.Mesh(new THREE.PlaneGeometry(1.7,1.9),x===0?door:latt);d.position.set(x,1.45,1.25);g.add(d);const fr=box(1.8,.1,.12,woodB);fr.position.set(x,2.45,1.25);g.add(fr)}
  const front=box(6.1,.5,.14,wall);front.position.set(0,2.65,1.25);g.add(front);
  const maru=box(6.6,.12,.7,woodL);maru.position.set(0,.62,1.75);g.add(maru);
  if(type==='giwa'){const rf=hipRoof(MT,4.3,3.1,2.4,2.95,4.45,.35,.18,{plain:true,rs:.55});g.add(rf);rf.traverse(o=>{if(o.isMesh)o.castShadow=true})}
  else{const th=new THREE.Mesh(new THREE.SphereGeometry(1,20,10,0,Math.PI*2,0,Math.PI/2),straw);th.scale.set(4.2,1.55,3.0);th.position.y=2.85;th.castShadow=true;g.add(th);const eave=new THREE.Mesh(new THREE.CylinderGeometry(1,1,.32,24,1,true),strawD);eave.scale.set(4.2,1,3.0);eave.position.y=2.75;g.add(eave);
   for(let k=-3;k<=3;k++){const rp=new THREE.Mesh(new THREE.TorusGeometry(1,.025,4,24,Math.PI),strawD);rp.scale.set(3.0,1.56,1);rp.rotation.y=Math.PI/2;rp.position.set(k*.55,2.85,0);g.add(rp)}}
  /* 담장(입구만 비움)과 이름표 */const fen=type==='giwa'?stone:M(0x8a6a44);const fh=type==='giwa'?1.25:1.05;const half=4.6;
  const seg=(x0,z0,x1,z1)=>{const len=Math.hypot(x1-x0,z1-z0);const w=box(len,fh,.38,fen);w.position.set((x0+x1)/2,fh/2,(z0+z1)/2);w.rotation.y=-Math.atan2(z1-z0,x1-x0);g.add(w);if(type==='giwa'){const c=box(len+.1,.14,.56,capT);c.position.set((x0+x1)/2,fh+.07,(z0+z1)/2);c.rotation.y=w.rotation.y;g.add(c)}};
  seg(-half,-half,half,-half);seg(-half,-half,-half,half);seg(half,-half,half,half);seg(-half,half,-1.1,half);seg(1.1,half,half,half);
  return{g,type}}
 /* 이름표 판(골목을 봄) */function plate(txt,sub){const cv=document.createElement('canvas');cv.width=512;cv.height=200;const q=cv.getContext('2d');q.fillStyle='#3b2414';q.fillRect(0,0,512,200);q.strokeStyle='#d8a838';q.lineWidth=8;q.strokeRect(8,8,496,184);q.fillStyle='#f2d27a';q.textAlign='center';let fs=64;q.font=`bold ${fs}px "Do Hyeon","Noto Sans KR",sans-serif`;while(q.measureText(txt).width>460&&fs>28){fs-=4;q.font=`bold ${fs}px "Do Hyeon","Noto Sans KR",sans-serif`}q.fillText(txt,256,96);q.fillStyle='#f3ead6';q.font='30px "Gowun Dodum",sans-serif';q.fillText(sub,256,158);const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;
  const g=new THREE.Group();const b=new THREE.Mesh(new THREE.PlaneGeometry(1.7,.66),new THREE.MeshBasicMaterial({map:t}));b.position.y=1.85;g.add(b);const bk=box(1.8,.76,.08,woodB);bk.position.set(0,1.85,-.05);g.add(bk);const post=new THREE.Mesh(new THREE.CylinderGeometry(.07,.08,1.9,8),woodB);post.position.y=.95;g.add(post);return g}
 const LOTS=[];
 function lotAt(i,nb){const{ x,z,side}=lotPos(i);const lg=new THREE.Group();lg.position.set(x,0,z);lg.rotation.y=side<0?Math.PI/2:-Math.PI/2;/* 앞(+z)이 골목을 보게 */G.add(lg);
  const gx=x-side*4.6,gz=z;/* 대문 자리(골목 쪽) */
  if(nb){const{g,type}=house(nb,i);if(mini){g.traverse(o=>{if(o.isMesh)o.receiveShadow=false})}else g.traverse(o=>{if(o.isMesh)cam.push(o)});lg.add(g);
   if(!mini){const pl=nb.crew?plate(nb.name+'네','무이 복원단'):plate(nb.name+'님 댁',(nb.date||'').replace(/-/g,'.')+' 이웃');pl.position.set(1.6,0,5.0);lg.add(pl)}
   /* 충돌: 집채(마루에는 올라설 수 있게 기단만), 담장 */const c=Math.cos(lg.rotation.y),s=Math.sin(lg.rotation.y);const L2W=(lx,lz)=>[x+lx*c+lz*s,z-lx*s+lz*c];
   const box2=(lx0,lx1,lz0,lz1,y0,y1)=>{const a=L2W(lx0,lz0),b=L2W(lx1,lz1);S(a[0],b[0],y0,y1,a[1],b[1])};
   box2(-3.6,3.6,-2.3,2.3,0,.45);box2(-3.1,3.1,-2.0,1.3,0,3.4);box2(-4.8,4.8,-4.8,-4.4,0,1.3);box2(-4.8,-4.4,-4.8,4.8,0,1.3);box2(4.4,4.8,-4.8,4.8,0,1.3);box2(-4.8,-1.1,4.4,4.8,0,1.3);box2(1.1,4.8,4.4,4.8,0,1.3);
   if(nb.crew)spots.push({x:gx,y:0,z:gz,r:2.2,t:nb.name+'네',h:`무이 복원단 ${nb.name}의 집이에요. ${nb.note} 복원단 다섯 집 다음부터가 쓰레드 이웃들의 집이에요.`});else spots.push({x:gx,y:0,z:gz,r:2.2,t:nb.name+'님 댁',h:`${(nb.date||'').replace(/-/g,'.')}에 무이 마을 이웃이 되었어요.${nb.note?' 한마디: '+nb.note:''} 집은 이름에 맞춰 ${type==='giwa'?'기와집':'초가집'}으로 지었어요. 이웃이 늘면 골목이 길어져요.`})}
  else{if(!mini){const pl=plate('빈 집터','쓰레드 댓글로 이웃이 되어 주세요');pl.position.set(0,0,3.6);lg.add(pl);for(const[a,b]of[[-4.6,-4.6],[4.6,-4.6],[-4.6,4.6],[4.6,4.6]]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.8,6),woodL);p.position.set(a,.4,b);lg.add(p)}const rope=box(9.2,.03,.03,M(0xd8c8a0));rope.position.set(0,.7,4.6);lg.add(rope)}
   spots.push({x:gx,y:0,z:gz,r:2.2,t:'빈 집터',h:'아직 비어 있는 집터예요. 무이 쓰레드(@korea.traditional.with.ai) 글에 댓글을 남기면 이 자리에 이름을 단 한옥을 지어 드려요. 기와집일지 초가집일지는 이름에 따라 정해져요.'})}
  LOTS.push({i,x,z,nb})}
 let N=0;const titleEl=()=>document.getElementById('ttl');
 function build(list){const ppl=list.filter(n=>n&&n.name);N=ppl.length;const nbs=[...CREW,...ppl];const total=(mini?Math.min(nbs.length,12):nbs.length)+(mini?0:EMPTY);for(let i=0;i<total;i++)lotAt(i,nbs[i]);const rows=Math.ceil(total/2);setLane(rows*LOT+14);
  const end=-3-rows*LOT;/* 골목 끝: 무이 복원단 마당 정자 */if(!mini){const pj=new THREE.Group();const fl=box(5,.5,5,stone);fl.position.y=.25;pj.add(fl);for(const[a,b]of[[-2,-2],[2,-2],[-2,2],[2,2]]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.14,.16,2.6,8),M(0x8a3a2a));p.position.set(a,1.8,b);pj.add(p)}const rf=hipRoof(MT,3.2,3.2,.2,3.1,4.6,.5,.15,{plain:true,rs:.5});pj.add(rf);pj.position.set(0,0,end-2);pj.traverse(o=>{if(o.isMesh)o.castShadow=true});G.add(pj);S(-2.5,2.5,0,.5,end-4.5,end+.5)}
  if(titleEl()&&!mini)titleEl().textContent=N?`무이 마을 · 이웃 ${N}명`:'무이 마을 · 첫 이웃을 기다려요';G.userData.N=N;G.userData.rows=rows}
 const vt=+(new URLSearchParams(location.search).get('vtest')||0);/* 시험용: ?vtest=12 면 가짜 이웃 12명으로 미리보기(명단 파일은 그대로) */
 if(vt&&!opts.list)opts.list=Array.from({length:vt},(_,k)=>({name:'시험 이웃 '+(k+1),date:'2026-11-12'}));
 if(opts.list)build(opts.list);else fetch(NB_URL+'?v='+Date.now()).then(r=>r.json()).then(build).catch(()=>build([]));
 const meta={title:'무이 마을',hint:'쓰레드에서 이웃이 된 분들의 집이 모인 무이 마을이에요. 골목을 따라 걸으며 이름표를 찾아보세요. 빈 집터는 다음 이웃의 자리예요.',
  env:{plaza:null,beds:false,trees:true,sign:{x:4.2,z:13.2,lines:['무이 마을','쓰레드 이웃의 집','댓글 하나에 한옥 한 채','@korea.traditional.with.ai']},treeAvoid:(x,z)=>Math.abs(x)<16&&z<16},
  npc:[['carpenter',[[-1.4,8],[-1.4,-40],[1.4,-40],[1.4,8]]],['ceramic',[[1.6,2],[1.6,-26],[-1.6,-26]]],['painter',[[-1,-10],[1,-50]]]],
  level:P=>{const row=Math.max(0,Math.round((-3-P.z)/LOT));return P.z>8?'마을 입구':`골목 ${row+1}번째 줄`},
  camCap:()=>Infinity,
  mini:{S:2.2,ox:0,oz:-30,draw(g,X,Z,S){g.fillStyle='#7aa04e';g.fillRect(0,0,300,300);g.fillStyle='#b9b2a6';g.fillRect(X(-2.5),Z(14),5*S,300);for(const l of LOTS){g.fillStyle=l.nb?'#4a4e54':'#d8c8a0';g.fillRect(X(l.x-4.6),Z(l.z-4.6),9.2*S,9.2*S)}}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:16,yaw:Math.PI},size:{},tick:null},meta)}
