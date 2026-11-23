/* 해남 녹우당 마당(2026-11-23, 2단계 열째 묶음): 해남 윤씨 종가. 고산 윤선도(「어부사시사」)와 공재 윤두서(자화상, 국보)의 집안.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   입구의 큰 은행나무, 사랑채 녹우당(효종이 스승 윤선도에게 지어 준 집을 옮겨 왔다는 이야기가 전해 옴), ㅁ자 안채, 사당 추원당, 뒷산 비자나무 숲(천연기념물, 바람에 잎 소리가 비 오는 소리 같아 '녹우' — 푸른 비라는 풀이가 전해 옴), 고산유물전시관.
   놀이: 어부사시사 계절 나누기(「어부사시사」는 봄·여름·가을·겨울 네 철의 바닷가 풍경을 읊은 노래예요. 나오는 것을 알맞은 철 바구니에 담아요. 나누기, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {curvedRoof,buildHall} from './hallkit.js';
import {yardMat} from './yardkit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildNogu(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1651);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7c9a4a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr);const yd=new THREE.Mesh(new THREE.PlaneGeometry(30,26),yardMat());yd.rotation.x=-Math.PI/2;yd.position.set(0,.02,0);G.add(yd)}
 const ST=M(0xa8a296),WALLW=M(0xeee6d4),WOOD=M(0x8a7458),ROOF=M(0x4a4a50);
 const plaque=(x,y,z,txt,w=1.6)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 const wing=(x,z,W,D,H,base=.7)=>{/* 11/23 품질: 흰 상자 벽+기둥 → hallkit 한옥 */const h=buildHall({x,z,W,D,nx:Math.max(1,Math.round(W/3)),nz:Math.max(1,Math.round(D/3.2)),FY:base,PH:H,roof:'hip',pillar:0x6b4a2e,bracket:'ik',bare:true,plain:true,front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',mini,solids,light:false,roofScale:.9});G.add(h.group);return base+H};
 /* 비자나무 숲(뒷산) */const BIJA=M(0x2a5a30,{flatShading:true});{const hill=new THREE.Mesh(new THREE.SphereGeometry(40,20,10,0,Math.PI*2,0,Math.PI/2),M(0x4a6a3a,{flatShading:true}));hill.scale.y=.35;hill.position.set(0,0,-58);G.add(hill);if(!mini)for(let i=0;i<46;i++){const x=-34+r()*68,z=-30-r()*20;const t=new THREE.Group();t.position.set(x,0,z);G.add(t);const tr=new THREE.Mesh(new THREE.CylinderGeometry(.22,.3,3,7),M(0x5a3a28));tr.position.y=1.5;t.add(tr);const c=new THREE.Mesh(new THREE.ConeGeometry(1.8+r()*.6,4,8),BIJA);c.position.y=4.2;t.add(c)}}
 sp(0,-26,3,'비자나무 숲','집 뒷산의 500년 넘은 비자나무 숲이에요(천연기념물). 바람이 불면 잎 스치는 소리가 비 오는 소리 같아 "녹우(푸른 비)"라 했다는 풀이가 전해 와요(전해 오는 이야기).');
 /* 입구 은행나무 */{const t=new THREE.Group();t.position.set(10,0,24);G.add(t);const tr=new THREE.Mesh(new THREE.CylinderGeometry(.8,1.1,6,10),M(0x6a5040));tr.position.y=3;t.add(tr);for(let k=0;k<9;k++){const c=new THREE.Mesh(new THREE.DodecahedronGeometry(2.2+r()),M(0xe0c030,{flatShading:true}));c.position.set((r()-.5)*6,7+r()*3,(r()-.5)*6);t.add(c)}solids.push({cx:10,cz:24,r:1.2,y0:0,y1:6})}
 sp(10,28.6,2.8,'은행나무','녹우당 앞을 지키는 500살 넘은 은행나무예요. 가을이면 노랗게 물들어요.');
 /* 솟을대문 */{const Z=14;for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.BoxGeometry(5,2.6,2.4),WALLW);w.position.set(s*4,1.3,Z);G.add(w);solids.push({x0:s*4-2.5,x1:s*4+2.5,y0:0,y1:2.6,z0:Z-1.2,z1:Z+1.2})}curvedRoof(G,0,(3.8)-(1.2)/2,Z,(2.6)/.72,(2)/.72,(1.2)*1.05);for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.16,.18,3.4,8),WOOD);c.position.set(s*1.4,1.7,Z+1.1);G.add(c)}}
 /* 사랑채 녹우당 */const SZ=4;{const y=wing(-2,SZ,11,4.4,2.6);plaque(-2,y-.5,SZ+2.22,'堂雨綠')}
 sp(-2,SZ+5.2,3,'녹우당','해남 윤씨 종가의 사랑채예요. 효종이 스승 윤선도에게 지어 준 집을 이곳으로 옮겨 왔다고 전해 와요(전해 오는 이야기). 현판 "녹우당" 글씨는 옥동 이서가 썼어요.');
 /* 안채(ㅁ자) */{const AZ=-10;wing(0,AZ-3,12,3.6,2.4);wing(0,AZ+3,12,2.6,2.2);wing(-5.4,AZ,2.4,3.6,2.2);wing(5.4,AZ,2.4,3.6,2.2)}
 sp(9,-6,2.4,'안채','네모나게 둘러싼 ㅁ자 안채예요. 대대로 종가 살림을 꾸려 온 곳이에요.');
 /* 사당 추원당 */{const y=wing(16,-18,5,3.4,2.2,.6);plaque(16,y-.4,-16.28,'堂遠追',1.2)}
 sp(16,-13.4,2.4,'추원당','조상의 제사를 모시는 사당이에요.');
 /* 고산유물전시관 */{const b=new THREE.Mesh(new THREE.BoxGeometry(12,4,7),M(0xd8d0c0));b.position.set(-20,2,8);G.add(b);const rf=new THREE.Mesh(new THREE.BoxGeometry(12.6,.4,7.6),ROOF);rf.position.set(-20,4.2,8);G.add(rf);solids.push({x0:-26,x1:-14,y0:0,y1:4,z0:4.5,z1:11.5});const fr=new THREE.Mesh(new THREE.PlaneGeometry(1.6,2),M(0x6a4a2a));fr.position.set(-14.3,2.2,8.4);fr.rotation.y=Math.PI/2;G.add(fr);const pt=new THREE.Mesh(new THREE.PlaneGeometry(1.2,1.6),new THREE.MeshBasicMaterial({map:tex(96,128,(q,w,h)=>{q.fillStyle='#d8c8a0';q.fillRect(0,0,w,h);q.fillStyle='#3a2a1a';q.beginPath();q.ellipse(w/2,h*.4,22,30,0,0,Math.PI*2);q.fill();q.fillStyle='#d8c8a0';q.beginPath();q.ellipse(w/2,h*.38,16,22,0,0,Math.PI*2);q.fill();q.fillStyle='#3a2a1a';for(let i=0;i<40;i++)q.fillRect(w/2-18+r()*36,h*.55+r()*30,1,6)})}));pt.position.set(-14.25,2.2,8.4);pt.rotation.y=Math.PI/2;G.add(pt)}
 sp(-12,8.4,2.6,'고산유물전시관','윤선도의 글과 윤두서의 「자화상」(국보) 같은 집안 유물을 모은 곳이에요. 자화상은 수염 한 올까지 그린 그림으로 이름났어요.');
 /* 어부사시사 계절 나누기(11/23) */const PX=20,PZ=12;const pg=new THREE.Group();pg.position.set(PX,0,PZ);pg.visible=false;G.add(pg);
 const SEAS=[['봄',0xe8a0b8],['여름',0x5ab05a],['가을',0xd88a30],['겨울',0x9ac0e0]];
 const ITEMS=[['진달래',0,0xe060a0],['버들개지',0,0xd8d8a0],['제비',0,0x2a2a4a],['봄비',0,0x8ab8d8],['냉이',0,0x6a9a3a],['아지랑이',0,0xf0e8c0],['보리싹',0,0x7ac050],
  ['연꽃',1,0xf0a0c0],['매미',1,0x6a5a3a],['소나기',1,0x5a7aa0],['반딧불이',1,0xe0f060],['부채',1,0xe8d8a8],['모시 적삼',1,0xf0f0e8],['수박',1,0x3a8a3a],
  ['단풍',2,0xd83a2a],['기러기',2,0x8a8070],['갈대',2,0xc8b080],['감',2,0xe07a20],['국화',2,0xf0c030],['귀뚜라미',2,0x5a4030],['벼 이삭',2,0xd8b040],
  ['함박눈',3,0xf8f8ff],['고드름',3,0xc8e0f0],['얼음낚시',3,0xa8c8e0],['썰매',3,0x8a6a4a],['동백꽃',3,0xc82a3a],['화로',3,0x5a4a3a],['연날리기',3,0xe0d050]];
 window.__NGSEASON=()=>{if(document.getElementById('ngsP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX+6,PZ+3,0)}catch(e){}pg.visible=true;
  const BY=.6;const camA=()=>{const k=innerWidth<innerHeight?2.2:1;return[PX,2.4*k+.8,PZ+3*k+.4,PX,BY+.3,PZ-.2,50]};window.__GCAM=()=>document.getElementById('sssX')?null:document.getElementById('ngsP')?camA():null;
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,100);const rc=new THREE.Raycaster();
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  let rd=0,queue=[],curI=null,right=0,wrong=0,t0=0,done=false,auto=false,last=performance.now(),wait=0,baskets=[],itemG=null,fill=[0,0,0,0],aT=0,fly=null;const res=[];const NR=3;
  const snd=(f,len=.1,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const clr=()=>{while(pg.children.length)pg.remove(pg.children[0]);baskets=[]};
  const lab=(t,col)=>tex(128,64,(q,w,h)=>{q.fillStyle=col;q.fillRect(0,0,w,h);q.fillStyle='#1a1612';q.font='bold 40px sans-serif';q.textAlign='center';q.textBaseline='middle';q.fillText(t,w/2,h/2+2)},[1,1]);
  const build=()=>{clr();const tb=new THREE.Mesh(new THREE.BoxGeometry(4.4,.12,1.6),M(0x7a5a3a));tb.position.y=BY-.06;pg.add(tb);for(const s of[-1,1])for(const t of[-1,1]){const lg=new THREE.Mesh(new THREE.BoxGeometry(.1,BY-.1,.1),M(0x5a3a22));lg.position.set(s*2.1,(BY-.1)/2,t*.7);pg.add(lg)}
   SEAS.forEach(([nm,col],i)=>{const g=new THREE.Group();g.position.set(-1.6+i*1.07,BY,.2);pg.add(g);const bk=new THREE.Mesh(new THREE.CylinderGeometry(.42,.32,.36,16,1,true),M(0xb89a6a,{side:THREE.DoubleSide}));bk.position.y=.18;g.add(bk);const bt=new THREE.Mesh(new THREE.CircleGeometry(.32,16),M(0xa88a5a));bt.rotation.x=-Math.PI/2;bt.position.y=.01;g.add(bt);const lb=new THREE.Mesh(new THREE.PlaneGeometry(.7,.35),new THREE.MeshBasicMaterial({map:lab(nm,'#'+col.toString(16).padStart(6,'0'))}));lb.position.set(0,.2,.43);g.add(lb);const hit=new THREE.Mesh(new THREE.CylinderGeometry(.48,.48,.7,10),new THREE.MeshBasicMaterial({visible:false}));hit.position.y=.3;hit.userData.s=i;g.add(hit);g.userData.hit=hit;g.userData.n=0;baskets.push(g)})};
  const showItem=()=>{if(itemG)pg.remove(itemG);if(curI==null){itemG=null;return}const[nm,,col]=ITEMS[curI];itemG=new THREE.Group();itemG.position.set(0,BY+1.1,-.4);pg.add(itemG);const ob=new THREE.Mesh(new THREE.IcosahedronGeometry(.22,1),M(col,{roughness:.5,flatShading:true}));itemG.add(ob);const lb=new THREE.Mesh(new THREE.PlaneGeometry(1.2,.6),new THREE.MeshBasicMaterial({map:lab(nm,'#f8f0dc'),transparent:true}));lb.position.y=.45;itemG.add(lb)};
  const newRound=()=>{build();const n=[8,10,12][rd];const pool=[...ITEMS.keys()].sort(()=>r()-.5);const per=[0,0,0,0];queue=[];for(const i of pool){if(queue.length>=n)break;const s=ITEMS[i][1];if(per[s]>=Math.ceil(n/4))continue;per[s]++;queue.push(i)}curI=queue.shift();right=0;wrong=0;t0=performance.now();showItem();ui()};
  const put=s=>{if(done||wait>0||curI==null||fly)return;const[nm,ss]=ITEMS[curI];if(s===ss){right++;snd(640+s*60,.15,'sine');const b=baskets[s];b.userData.n++;const piece=new THREE.Mesh(new THREE.IcosahedronGeometry(.09,0),M(ITEMS[curI][2],{flatShading:true}));piece.position.set((r()-.5)*.4,.12+b.userData.n*.03,(r()-.5)*.4);b.add(piece);fly={t:0,from:itemG.position.clone(),to:new THREE.Vector3(b.position.x,BY+.3,b.position.z)};ui(`${nm}은(는) ${SEAS[s][0]}! 맞았어요`)}else{wrong++;snd(200,.2,'sawtooth');ui(`${nm}은(는) ${SEAS[s][0]}이 아니에요. 다시 생각해 봐요`)}};
  const next=()=>{curI=queue.shift();if(curI==null){const tm=(performance.now()-t0)/1000;const n=right;const sc=Math.max(25,Math.round(100-wrong*10-Math.max(0,tm-n*3)*.4));res.push(sc);wait=1.8;snd(800,.5,'sine');ui(`바구니를 다 채웠어요! ${sc}점`)}showItem()};
  const ov=document.createElement('div');ov.id='ngsO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  ov.onpointerdown=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(baskets.map(b=>b.userData.hit),false)[0];if(h)put(h.object.userData.s)};
  const d=document.createElement('div');d.id='ngsP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#22302a;border:3px solid #8ac08a;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef6ee;box-shadow:0 6px 18px rgba(0,0,0,.35);width:232px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#c0e8c0">🎣 어부사시사 계절 나누기 ${rd+1}/${NR}</b><div style="font-size:12px;margin:4px 0;line-height:1.5">윤선도의 「어부사시사」는 네 철 바닷가 풍경을 노래했어요. 떠 있는 것을 알맞은 철 바구니에 눌러 담아요.</div><div style="font-size:15px;margin:4px 0">지금: <b>${curI!=null?ITEMS[curI][0]:'-'}</b></div><div>${SEAS.map(([nm,col],i)=>`<button data-s="${i}" style="font:14px 'Do Hyeon',sans-serif;background:#${col.toString(16).padStart(6,'0')};color:#1a1612;border:0;border-radius:8px;padding:5px 8px;margin:2px;cursor:pointer">${nm}</button>`).join('')}</div><div style="font-size:12px">맞힘 ${right} · 틀림 ${wrong} · 남은 것 ${queue.length+(curI!=null?1:0)}</div><div style="font-size:13px;color:#c0e8c0;min-height:18px">${msg}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#eef6ee;border:1px solid #eef6ee;border-radius:8px;padding:2px 8px;margin-top:4px;cursor:pointer">그만</button>`;d.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>put(+b.dataset.s));d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const cleanup=()=>{clr();if(itemG)pg.remove(itemG);itemG=null;pg.visible=false;ov.remove()};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/res.length);const s2=Q>=80?3:Q>=55?2:Q>0?1:0;try{ctx.done('nogu_season',Q,'어부사시사 계절 나누기')}catch(e){}window.__NGSQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#c0e8c0">네 철을 다 담았어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">윤선도는 보길도에서 봄·여름·가을·겨울 각 10수씩 모두 40수의 「어부사시사」를 지었어요. 후렴 "지국총 지국총 어사와"는 노 젓고 닻 올리는 소리를 흉내 낸 말이래요.</div><div style="font-size:24px;color:#8ac08a">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#8ac08a;color:#22302a;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef6ee;border:2px solid #eef6ee;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__NGSEASON()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(itemG&&!fly){itemG.children[0].rotation.y+=dt;itemG.position.y=BY+1.1+Math.sin(now/400)*.05}
   if(fly){fly.t+=dt*3;const t=Math.min(1,fly.t);if(itemG){itemG.position.lerpVectors(fly.from,fly.to,t);itemG.position.y+=Math.sin(t*Math.PI)*.4;itemG.scale.setScalar(1-t*.7)}if(t>=1){fly=null;next()}}
   if(auto&&wait<=0&&!fly&&curI!=null){aT-=dt;if(aT<=0){aT=.3;put(ITEMS[curI][1])}}
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=NR){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);
  window.__NGSG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},put,get cur(){return curI!=null?ITEMS[curI].slice(0,2):null},scr:i=>{setPC();const v=new THREE.Vector3();baskets[i].getWorldPosition(v);v.y+=.3;v.project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]}};try{ctx.say('네 철 바구니에 알맞게 담아 봐요!',2.4)}catch(e){}};
 spots.push({x:PX,y:0,z:PZ+3,r:2.4,t:'계절 나누는 자리',h:'「어부사시사」의 네 철처럼, 나오는 것을 알맞은 철 바구니에 담아 봐요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,17],[-2,3,SZ+5],[9,3,-6],[16,3,-13],[-12,3,8],[10,3,28],[PX,3,PZ+3]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'비자 열매',h:'비자나무 열매예요. 약으로도 썼어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.04,8,6),M(0x6a5a2a)))})},
  {n:'은행',h:'은행나무 열매 씨앗이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.035,8,6),M(0xe0d0a0)))})},
  {n:'벼루 조각',h:'윤선도 집안 선비들이 쓰던 벼루 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.14,.03,.1),M(0x2a2a2e)))})},
  {n:'백자 연적',h:'먹물에 물을 따르던 작은 백자 연적이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.05,10,8),M(0xf0ece0)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(-14,24,2.4,'발굴 탐지 자리','종가 앞마당 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__NGDIG=()=>{window.__DETECT&&window.__DETECT({key:'nogu_dig',title:'녹우당 발굴 탐지',emoji:'⛏️',bg:'#22302a',count:4,TL:150,cand:[[-8,22],[22,26],[-24,-4],[26,0],[-14,-16],[6,-22],[-28,20],[28,-12],[-4,30],[18,-26]],items:DIG,intro:'녹우당 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'녹우당은 윤선도·윤두서를 낳은 해남 윤씨 종가예요.'})};
 const meta={quest:{t:'녹우당 둘러보기',d:'은행나무와 솟을대문을 지나 사랑채 녹우당, ㅁ자 안채, 추원당, 비자나무 숲, 고산유물전시관을 둘러보세요.',steps:[['은행나무','은행나무'],['녹우당','녹우당'],['안채','안채'],['추원당','추원당'],['비자숲','비자나무 숲'],['전시관','고산유물전시관']]},
  title:'해남 녹우당',hint:'녹우당을 공개 사진으로 간추려 지었어요(배치·크기 어림). 「어부사시사」의 네 철 바구니에 알맞게 담아 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:34,lines:['해남 녹우당','고산 윤선도 · 공재 윤두서','비자나무 숲 · 은행나무','간추려 지음']}},
  npc:[['science',[[-6,32],[6,32],[6,38],[-6,38]]]],bounds:[-40,40,-34,46],level:()=>'해남 녹우당',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:4,draw(g,X,Z,S){g.fillStyle='#7c9a4a';g.fillRect(0,0,300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:36,yaw:Math.PI},size:{}},meta)}
