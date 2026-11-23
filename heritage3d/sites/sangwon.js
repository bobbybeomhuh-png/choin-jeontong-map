/* 평창 상원사 마당(2026-11-23, 2단계 여섯째 묶음): 오대산 상원사. 725년에 만든, 지금 남은 우리나라 종 가운데 가장 오래된 동종(국보)이 있는 절.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   관대걸이(세조가 의관을 걸었다는 돌, 전해 오는 이야기) → 돌계단과 고양이 석상(세조를 구한 고양이 이야기, 전해 오는 이야기) → 동정각의 상원사 동종(비천상이 공후·생황을 연주) / 문수전(목조 문수동자좌상, 국보) / 영산전.
   놀이: 비천상 탁본 다른 곳 찾기(옛 탁본과 새로 뜬 탁본을 나란히 놓고 달라진 곳을 눌러 찾기, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {curvedRoof,buildHall} from './hallkit.js';
import {lumpyHill} from './treekit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildSangwon(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(725);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x6a8a48,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 오대산 전나무 숲 */for(let i=0;i<40;i++){const x=(r()<.5?-1:1)*(14+r()*30),z=-40+r()*90;if([[18,-18,9],[-24,6,7],[-10,12,5],[8,46,4]].some(([a2,b2,rr])=>Math.hypot(x-a2,z-b2)<rr))continue;const t=new THREE.Mesh(new THREE.CylinderGeometry(.25,.35,8,7),M(0x5a4030));t.position.set(x,4,z);G.add(t);const c=new THREE.Mesh(new THREE.ConeGeometry(2.2,7,8),M(0x2a4a2a));c.position.set(x,9,z);G.add(c);solids.push({cx:x,cz:z,r:.4,y0:0,y1:8})}
 for(let i=0;i<6;i++){const c=lumpyHill((26+r()*10)*1.3,(34+r()*12)*.75,0x3a5a34,((-80+i*32)*.13+57)|0);c.position.set(-80+i*32,-.5,-100-r()*10);G.add(c)}
 const ST=M(0xa8a296),ST2=M(0x948e82),WOOD=M(0x8a3a2a),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50),BRZ=M(0x5a7a62,{metalness:.5,roughness:.45});
 const roof=(x,y,z,W,D,h)=>{curvedRoof(G,x,(y+h/2)-(h)/2,z,(W*.72)/.72,(D*.72)/.72,(h)*1.05)};
 const plaque=(x,y,z,txt,w=2)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 const hall=(x,z,W,D,PH,base=.6)=>{/* 11/23 품질: 흰 상자 벽+기둥 → hallkit 법당 */const h=buildHall({x,z,W,D,nx:Math.max(1,Math.round(W/3)),nz:Math.max(1,Math.round(D/3.2)),FY:base,PH:PH,roof:'hip',pillar:0x9a3a26,bracket:(W>=8?'dapo':'ik'),front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',mini,solids,light:false,roofScale:.9});G.add(h.group);return base+PH};
 /* 관대걸이 */{const X=-4,Z=44;const b=new THREE.Mesh(new THREE.BoxGeometry(.5,1.4,.4),ST);b.position.set(X,.7,Z);G.add(b);const t=new THREE.Mesh(new THREE.BoxGeometry(1.2,.3,.5),ST2);t.position.set(X,1.5,Z);G.add(t);solids.push({cx:X,cz:Z,r:.6,y0:0,y1:1.7})}
 sp(-4,48,2.6,'관대걸이','세조가 오대산 계곡에서 목욕할 때 의관을 걸어 두었다는 돌이에요(전해 오는 이야기). 그때 문수동자가 나타나 등을 밀어 주자 병이 나았다는 이야기가 함께 전해요.');
 /* 돌계단 + 고양이 석상 */{for(let i=0;i<8;i++){const s=new THREE.Mesh(new THREE.BoxGeometry(5,.25,1.2),ST);s.position.set(0,.12,34-i*1.2);G.add(s)}for(const s of[-1,1]){const g=new THREE.Group();g.position.set(s*3.4,0,26);const b=new THREE.Mesh(new THREE.BoxGeometry(.6,.6,.5),ST);b.position.y=.3;g.add(b);const bd=new THREE.Mesh(new THREE.SphereGeometry(.32,10,8),ST);bd.scale.y=1.2;bd.position.y=.95;g.add(bd);const hd=new THREE.Mesh(new THREE.SphereGeometry(.2,10,8),ST);hd.position.set(0,1.45,.05);g.add(hd);for(const e of[-1,1]){const ear=new THREE.Mesh(new THREE.ConeGeometry(.07,.15,4),ST);ear.position.set(e*.12,1.64,0);g.add(ear)}G.add(g);solids.push({cx:s*3.4,cz:26,r:.4,y0:0,y1:1.7})}}
 sp(0,30,3,'고양이 석상','계단 양쪽의 고양이 석상이에요. 법당에 숨은 자객을 고양이가 옷자락을 물어 알려 세조를 구했다는 이야기가 전해요(전해 오는 이야기).');
 /* 동정각 + 상원사 동종 */const BX=-10,BZ=12;{for(const[i,j]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.2,.22,3.8,8),WOOD);c.position.set(BX+i*1.8,1.9,BZ+j*1.8);G.add(c);solids.push({cx:BX+i*1.8,cz:BZ+j*1.8,r:.25,y0:0,y1:3.8})}roof(BX,3.8,BZ,5.6,5.6,2);const bell=new THREE.Group();bell.position.set(BX,2.6,BZ);const pts=[];for(let k=0;k<=12;k++){const t=k/12;pts.push(new THREE.Vector2(.5+Math.pow(t,1.6)*.32,1.6-t*1.6))}const b=new THREE.Mesh(new THREE.LatheGeometry(pts,24),BRZ);b.position.y=-1.6;bell.add(b);const top=new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,.12,24),BRZ);bell.add(top);const yt=new THREE.Mesh(new THREE.CylinderGeometry(.08,.1,.4,8),BRZ);yt.position.set(.25,.25,0);bell.add(yt);G.add(bell)}
 sp(BX+3.4,BZ,2.6,'상원사 동종','725년(성덕왕 24)에 만든, 지금 남은 우리나라 종 가운데 가장 오래된 종이에요(국보). 몸에 공후와 생황을 연주하며 하늘을 나는 비천상이 새겨져 있어요.');
 /* 문수전 + 영산전 */{const y=hall(4,-6,11,6,3.2,1);plaque(4,y-.45,-6+3.05,'殿殊文',1.6)}sp(4,0,3,'문수전','지혜의 보살 문수보살을 모신 전각이에요. 1466년에 만든 목조 문수동자좌상(국보)이 있어요. 세조의 딸 의숙공주가 만들게 했다는 기록이 동자상 안에서 나왔어요.');
 hall(18,-18,7,4.4,2.6,.6);sp(18,-13,2.6,'영산전','석가모니와 제자들을 모신 전각이에요.');
 /* 비천상 탁본 다른 곳 찾기(11/23) */const PX=-24,PZ=6;const pg=new THREE.Group();pg.position.set(PX,0,PZ);pg.visible=false;G.add(pg);
 window.__SWDIFF=()=>{if(document.getElementById('swdP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX,PZ+10,0)}catch(e){}pg.visible=true;
  const camA=()=>{const k=innerWidth<innerHeight?2:1;return[PX,1.75,PZ+3*k,PX,1.65,PZ,50]};window.__GCAM=()=>document.getElementById('swdP')?camA():null;
  let rd=0,diffs=[],found=new Set(),mist=0,done=false,auto=false,last=performance.now(),t0=0,wait=0,els=[],hits=[];const res=[];
  const INK=M(0x2a2826),PAPER=M(0xe8e0cc),INK2=M(0x7a3a2a);const W=1.3,H=1.6,GAP=.25;
  const snd=(f,len=.1,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const clr=()=>{while(pg.children.length)pg.remove(pg.children[0]);hits=[]};
  /* 비천상 요소: [종류, x, y, 크기, 회전] (판 안 좌표 -0.5~0.5) */
  const genEls=()=>{const L=[];L.push(['body',0,.05,1,-.5]);L.push(['head',-.12,.24,1,0]);L.push(['scarf',.18,.12,1,0]);L.push(['scarf2',-.2,-.15,1,0]);L.push(['harp',.12,-.02,1,.3]);for(let i=0;i<4;i++)L.push(['cloud',-.32+i*.21,-.38+(i%2)*.06,.8+r()*.4,0]);L.push(['flower',.33,.32,1,0]);L.push(['flower',-.33,.36,1,0]);L.push(['halo',-.12,.24,1,0]);L.push(['ribbon',.3,-.2,1,.6]);return L};
  const mkEl=(e,mod)=>{const[t,x,y,s,rot]=e;const g=new THREE.Group();g.position.set(x*W,y*H,0);g.rotation.z=rot;g.scale.setScalar(s);const m=mod==='color'?INK2:INK;
   if(t==='body'){const b=new THREE.Mesh(new THREE.CapsuleGeometry(.07,.26,4,8),m);g.add(b)}
   else if(t==='head'){g.add(new THREE.Mesh(new THREE.SphereGeometry(.07,12,10),m))}
   else if(t==='halo'){g.add(new THREE.Mesh(new THREE.TorusGeometry(.11,.012,6,20),m))}
   else if(t==='scarf'||t==='scarf2'){const pts=[];for(let k=0;k<=10;k++){const u=k/10;pts.push(new THREE.Vector3(u*.32-.16,Math.sin(u*Math.PI*1.5)*.06,0))}g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),16,.014,6),m))}
   else if(t==='harp'){g.add(new THREE.Mesh(new THREE.TorusGeometry(.09,.012,6,16,Math.PI*1.2),m));for(let k=0;k<4;k++){const sl=new THREE.Mesh(new THREE.BoxGeometry(.004,.12,.004),m);sl.position.set(-.04+k*.03,.02,0);g.add(sl)}}
   else if(t==='cloud'){for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.TorusGeometry(.035,.01,6,14),m);c.position.set(-.05+k*.05,(k%2)*.02,0);g.add(c)}}
   else if(t==='flower'){for(let k=0;k<5;k++){const p=new THREE.Mesh(new THREE.SphereGeometry(.022,8,6),m);const a=k/5*Math.PI*2;p.position.set(Math.cos(a)*.035,Math.sin(a)*.035,0);g.add(p)}}
   else if(t==='ribbon'){const pts=[];for(let k=0;k<=8;k++){const u=k/8;pts.push(new THREE.Vector3(Math.sin(u*Math.PI*2)*.04,u*.22-.11,0))}g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),12,.01,6),m))}
   if(mod==='flip')g.scale.x*=-1;if(mod==='big')g.scale.multiplyScalar(1.6);if(mod==='move')g.position.x+=.12*W;if(mod==='rot')g.rotation.z+=1.2;return g};
  const panel=(ox,list,mods)=>{const pp=new THREE.Group();pp.position.set(ox,1.65,0);const bg=new THREE.Mesh(new THREE.PlaneGeometry(W,H),PAPER);bg.position.z=-.01;pp.add(bg);const fr=new THREE.Mesh(new THREE.BoxGeometry(W+.08,H+.08,.02),M(0x6a4a2a));fr.position.z=-.03;pp.add(fr);list.forEach((e,i)=>{const md=mods?mods[i]:null;if(md==='gone')return;pp.add(mkEl(e,md))});pg.add(pp);return pp};
  const newRound=()=>{clr();found=new Set();mist=0;const k=[3,4,5][rd];els=genEls();const idx=[...Array(els.length).keys()].sort(()=>r()-.5).slice(0,k);const kinds=['gone','color','flip','big','move','rot'];const mods={};idx.forEach(i=>{let kd=kinds[(r()*kinds.length)|0];if(['head','body'].includes(els[i][0])&&kd==='gone')kd='color';if(els[i][0]==='halo'&&(kd==='flip'||kd==='rot'))kd='big';if(els[i][0]==='flower'&&(kd==='rot'||kd==='flip'))kd='gone';mods[i]=kd});diffs=idx;
   const L=panel(-(W/2+GAP/2),els,null),R=panel(W/2+GAP/2,els,mods);
   const lb=(txt,ox)=>{const T=tex(256,48,(q,w,h)=>{q.fillStyle='#2a2418';q.fillRect(0,0,w,h);q.fillStyle='#f0e0b0';q.font='bold 30px sans-serif';q.textAlign='center';q.fillText(txt,w/2,34)});const m=new THREE.Mesh(new THREE.PlaneGeometry(.8,.15),new THREE.MeshBasicMaterial({map:T}));m.position.set(ox,1.65+H/2+.15,0);pg.add(m)};lb('옛 탁본',-(W/2+GAP/2));lb('새 탁본',W/2+GAP/2);
   els.forEach((e,i)=>{for(const ox of[-(W/2+GAP/2),W/2+GAP/2]){const hm=new THREE.Mesh(new THREE.CircleGeometry(.11,12),new THREE.MeshBasicMaterial({visible:false}));hm.position.set(ox+e[1]*W+(ox>0&&mods[i]==='move'?.06*W:0),1.65+e[2]*H,.02);hm.userData.el=i;pg.add(hm);hits.push(hm)}});
   t0=performance.now()/1000;ui()};
  const d=document.createElement('div');d.id='swdP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#22282a;border:3px solid #8ab098;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef4f0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#c8e8d0">🔔 비천상 탁본 다른 곳 찾기 ${rd+1}/3</b><div style="font-size:12px;margin:4px 0;line-height:1.5">상원사 동종 비천상을 뜬 옛 탁본과 새 탁본이에요. 새 탁본에서 달라진 곳 ${diffs.length}군데를 찾아 눌러요(빠짐·색·뒤집힘·크기·자리·기울기).</div><div style="font:16px 'Do Hyeon',sans-serif">찾은 곳 ${found.size}/${diffs.length}</div><div style="font-size:13px;color:#c8e8d0;min-height:18px">${msg}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f0;border:1px solid #eef4f0;border-radius:8px;padding:2px 8px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const mark=i=>{for(const ox of[-(W/2+GAP/2),W/2+GAP/2]){const e=els[i];const ring=new THREE.Mesh(new THREE.RingGeometry(.12,.14,20),new THREE.MeshBasicMaterial({color:0xe04040}));ring.position.set(ox+e[1]*W,1.65+e[2]*H,.03);pg.add(ring)}};
  const tap=i=>{if(done||wait>0)return;if(found.has(i))return;if(diffs.includes(i)){found.add(i);mark(i);snd(660,.15);ui('찾았어요!');if(found.size===diffs.length){wait=1.3;snd(800,.4,'sine');ui('다른 곳을 다 찾았어요!')}}else{mist++;snd(180,.2,'sawtooth');ui('거기는 같아요')}};
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,100);const rc=new THREE.Raycaster();const ov=document.createElement('div');ov.id='swdO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  ov.onpointerdown=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(hits,false)[0];if(h)tap(h.object.userData.el);else{mist++;snd(180,.2,'sawtooth');ui('거기는 같아요')}};
  const cleanup=()=>{ov.remove();clr();pg.visible=false};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3);const s2=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('sangwon_diff',Q,'비천상 탁본 다른 곳 찾기')}catch(e){}window.__SWQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#c8e8d0">탁본을 꼼꼼히 견줬어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">상원사 동종의 비천상은 무릎을 꿇은 듯한 자세로 하늘을 날며 공후와 생황을 연주해요. 문화유산을 기록할 때는 탁본·사진·실측을 견주어 달라진 곳(닳음·깨짐)을 살펴요(놀이의 무늬는 간추린 것).</div><div style="font-size:24px;color:#8ab098">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#8ab098;color:#22282a;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f0;border:2px solid #eef4f0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__SWDIFF()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  let at=0;const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(auto&&wait<=0){at+=dt;if(at>.4){at=0;const i=diffs.find(i=>!found.has(i));if(i!=null)tap(i)}}
   if(wait>0){wait-=dt;if(wait<=0){const el=performance.now()/1000-t0;res.push(Math.max(30,Math.round(100-mist*8-Math.max(0,el-20-rd*10)*.5)));rd++;if(rd>=3){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);window.__SWG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},get found(){return found.size},scr:i=>{setPC();const e=els[i];const v=new THREE.Vector3(PX+W/2+GAP/2+e[1]*W,1.65+e[2]*H,PZ+.02).project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]},get diffs(){return diffs.slice()}};try{ctx.say('두 탁본에서 달라진 곳을 찾아 봐요!',2.4)}catch(e){}};
 spots.push({x:PX,y:0,z:PZ+3,r:2.6,t:'탁본 견주는 자리',h:'동종 비천상 옛 탁본과 새 탁본의 다른 곳을 찾아 봐요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[-4,3,46],[0,3,28],[BX+3,3,BZ],[4,3,0],[PX,3,PZ+3]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'청동 조각',h:'종을 부을 때 흘러내린 청동 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.DodecahedronGeometry(.05),M(0x5a7a62,{metalness:.5})))})},
  {n:'기와 조각',h:'절 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'백자 발우 조각',h:'스님의 밥그릇(발우) 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.08,.06,14,1,true,0,2.4),M(0xf0ece0,{side:THREE.DoubleSide})))})},
  {n:'전나무 솔방울',h:'오대산 전나무 솔방울이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.ConeGeometry(.04,.1,8),M(0x6a4a2a)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(8,46,2.4,'발굴 탐지 자리','절 들머리 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__SWDIG=()=>{window.__DETECT&&window.__DETECT({key:'sangwon_dig',title:'상원사 발굴 탐지',emoji:'⛏️',bg:'#22282a',count:4,TL:150,cand:[[-8,40],[8,38],[-6,20],[8,18],[-14,0],[12,4],[-6,-14],[26,-8],[-10,-26],[10,-28]],items:DIG,intro:'상원사 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'상원사에는 우리나라에서 가장 오래된 종인 상원사 동종이 있어요.'})};
 const meta={quest:{t:'상원사 둘러보기',d:'관대걸이를 지나 돌계단의 고양이 석상, 동종과 문수전·영산전을 둘러보세요.',steps:[['관대걸이','관대걸이'],['고양이','고양이 석상'],['동종','상원사 동종'],['문수전','문수전'],['영산전','영산전']]},
  title:'평창 상원사',hint:'오대산 상원사를 공개 사진으로 간추려 지었어요(배치·크기 어림). 동종 비천상 옛 탁본과 새 탁본에서 달라진 곳을 찾아 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-8,z:52,lines:['평창 상원사','오대산 · 동종(725)','문수전 · 고양이 석상','간추려 지음']}},
  npc:[['science',[[-6,50],[6,50],[6,56],[-6,56]]]],bounds:[-46,46,-40,60],level:()=>'평창 상원사',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:-4,oz:8,draw(g,X,Z,S){g.fillStyle='#6a8a48';g.fillRect(0,0,300,300);g.fillStyle='#a8a296';g.fillRect(X(-2.5),Z(34),5*S,10*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:54,yaw:Math.PI},size:{}},meta)}
