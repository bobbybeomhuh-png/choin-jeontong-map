/* 익산 왕궁리 유적 마당(2026-11-23, 2단계 덧붙이기): 백제 무왕 때 궁궐 터(백제역사유적지구, 유네스코 세계유산 2015).
   공개 실측 3D(CC BY)가 없어 공개 사진·발굴 보고로 간추려 지음.
   오층석탑(국보): 높이 약 9m, 넓고 얇은 지붕돌의 백제계 석탑. 1965년 고칠 때 금제 사리함·녹색 유리 사리병이 나옴(진열은 안 함, 글로만).
   궁 터: 둘레 담장(궁장, 동서 약 245m·남북 약 490m) 가운데 남쪽 한 토막만 낮은 돌 기초로, 큰 건물 터(주춧돌), 금·유리 공방 터, 대형 화장실 터(길이 약 10m 구덩이), 정원 터(괴석·물길).
   놀이: 정원 물길 잇기(돌 물길판을 3D에서 눌러 90도씩 돌려 샘물이 연못까지 흐르게, 4·5·6칸 세 판, 적게 돌릴수록 높은 점수, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildWanggung(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(639);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(240,220),new THREE.MeshStandardMaterial({map:GT,color:0x8aa458,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 const STONE=M(0xb8b2a4),STONE2=M(0xa8a294),DARK=M(0x6a665e);
 const box=(w,h,d,x,y,z,m,sol=true)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.position.set(x,y+h/2,z);b.castShadow=true;b.receiveShadow=true;G.add(b);if(sol)solids.push({x0:x-w/2,x1:x+w/2,y0:0,y1:y+h,z0:z-d/2,z1:z+d/2});return b};
 /* 흙길(남문 터에서 탑까지) */{const p=new THREE.Mesh(new THREE.PlaneGeometry(5,64),M(0xc8b890));p.rotation.x=-Math.PI/2;p.position.set(0,.02,8);G.add(p)}
 /* 오층석탑(약 9m): 기단 두 켜 + 몸돌 다섯 + 넓고 얇은 지붕돌 + 상륜 */const TX=0,TZ=-22;{let y=0;box(5.6,.5,5.6,TX,y,TZ,STONE2);y+=.5;box(4.6,1.1,4.6,TX,y,TZ,STONE);y+=1.1;
  const W=[2.3,1.95,1.7,1.5,1.32],BH=[1.6,.65,.6,.55,.5];for(let i=0;i<5;i++){box(W[i],BH[i],W[i],TX,y,TZ,STONE,i===0);y+=BH[i];const rw=W[i]+1.9-i*.18;const rf=new THREE.Mesh(new THREE.CylinderGeometry(rw*.5,rw*.62,.34,4,1),STONE2);rf.rotation.y=Math.PI/4;rf.scale.set(1.414,1,1.414);rf.position.set(TX,y+.17,TZ);rf.castShadow=true;G.add(rf);y+=.34;const st=new THREE.Mesh(new THREE.BoxGeometry(W[i]*.8,.12,W[i]*.8),STONE);st.position.set(TX,y+.06,TZ);G.add(st);y+=.12}
  const sang=new THREE.Mesh(new THREE.CylinderGeometry(.12,.3,1.1,8),M(0x8a8478));sang.position.set(TX,y+.55,TZ);G.add(sang);window.__WGTOWERH=y+1.1}
 sp(TX,TZ+6,3.4,'왕궁리 오층석탑','높이 약 9m의 백제계 석탑이에요(국보). 지붕돌이 넓고 얇아 목탑을 닮았어요. 1965년 고칠 때 금으로 만든 사리함과 녹색 유리 사리병이 나왔어요. 실제 크기로 간추려 지었어요.');
 /* 궁장(남쪽 담장 기초 한 토막) + 남문 터 */for(const s of[-1,1]){box(46,1.1,3,s*27,0,44,M(0x9a9282))}for(const s of[-1,1])box(1.2,.4,1.2,s*3,0,44,DARK,false);
 sp(0,48,3.4,'궁장 남문 터','왕궁을 둘러싼 담장(궁장)은 동서 약 245m, 남북 약 490m로 네모나요. 지금은 돌 기초만 남아 남쪽 한 토막만 낮게 간추려 놓았어요.');
 /* 큰 건물 터: 기단 위 주춧돌 7×4 */const BX=-30,BZ=4;box(28,.5,14,BX,0,BZ,M(0xa89c84),false);{const st=new THREE.Mesh(new THREE.BoxGeometry(28,.5,.4),STONE2);st.position.set(BX,.25,BZ+7.2);G.add(st)}for(let i=0;i<7;i++)for(let j=0;j<4;j++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.5,.6,.25,10),STONE);c.position.set(BX-12+i*4,.62,BZ-5+j*3.4);G.add(c)}
 sp(BX,BZ+10,3.4,'큰 건물 터','왕이 나랏일을 보던 큰 건물이 서 있던 자리예요. 지금은 기단과 주춧돌만 남았어요(배치는 간추림).');
 /* 공방 터: 도가니·숯 무더기 */const KX=30,KZ=8;{const pit=new THREE.Mesh(new THREE.CylinderGeometry(3,3,.06,20),M(0x5a4a3a));pit.position.set(KX,.03,KZ);G.add(pit);for(let k=0;k<5;k++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.22,.14,.36,10,1,true),M(0x7a6a5a,{side:THREE.DoubleSide}));c.position.set(KX-1.5+k*.75,.2,KZ+(k%2?.6:-.6));G.add(c)}const coal=new THREE.Mesh(new THREE.ConeGeometry(.9,.5,9),M(0x2a2622));coal.position.set(KX+2,.25,KZ-1.8);G.add(coal)}
 sp(KX,KZ+5,3,'금·유리 공방 터','왕궁 안에서 금과 유리를 다루던 공방 자리예요. 도가니와 금 조각, 유리 구슬이 나왔어요.');
 /* 대형 화장실 터: 길쭉한 구덩이 셋 */const WX=32,WZ=-14;for(let k=0;k<3;k++){const h=new THREE.Mesh(new THREE.BoxGeometry(1.8,.05,10.4),M(0x3a3026));h.position.set(WX-4+k*4,.03,WZ);G.add(h);const rim=new THREE.Mesh(new THREE.BoxGeometry(2.2,.18,10.8),M(0x9a8a6a));rim.position.set(WX-4+k*4,.0,WZ);G.add(rim);solids.push({x0:WX-4+k*4-1.1,x1:WX-4+k*4+1.1,y0:0,y1:.6,z0:WZ-5.4,z1:WZ+5.4})}
 sp(WX,WZ+8,3,'대형 화장실 터','길이 약 10m 구덩이가 나란히 있는 백제 왕궁의 공중 화장실 터예요. 흙에서 기생충 알과 뒤처리용 나무 막대가 나와 화장실인 줄 알게 됐어요.');
 /* 정원 터: 괴석 + 물길 잇기 놀이판 */const GX=-26,GZ=-34;for(const[x,z,s]of[[GX-9,GZ-6,1.2],[GX-10,GZ+3,.9],[GX+9,GZ-7,1.4],[GX+10,GZ+5,1]]){const g=new THREE.Mesh(new THREE.DodecahedronGeometry(s,0),M(0x8a8a7e,{flatShading:true}));g.scale.y=1.6;g.position.set(x,s*1.2,z);g.rotation.y=r()*3;G.add(g);solids.push({cx:x,cz:z,r:s,y0:0,y1:s*2.6})}
 sp(GX,GZ+9,3,'정원 물길','왕궁 북쪽에서 괴석을 놓고 물길을 낸 정원 터가 나왔어요. 돌 물길판을 돌려 샘물을 연못까지 흐르게 해 봐요.');
 /* 물길 잇기(11/23): 칸 N×N, 열림 N1 E2 S4 W8, 오른쪽으로 돌리기 */const CS=1.5;const board=new THREE.Group();board.position.set(GX,0,GZ);board.visible=false;G.add(board);
 const rot=m=>((m<<1)|(m>>3))&15;const DIR=[[1,-1,0],[2,0,1],[4,1,0],[8,0,-1]];const OPP={1:4,2:8,4:1,8:2};
 const slabM=M(0xc8c0ac),chM=M(0x5a5248),wetM=M(0x3a8ad0,{emissive:0x10304a}),srcM=M(0x6ab0e0,{emissive:0x10304a});
 window.__WGWATER=()=>{if(document.getElementById('wgP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(GX,GZ+8,0)}catch(e){}board.visible=true;
  let rd=0,N=4,cells=[],tiles=[],moves=0,minMv=0,done=false,auto=false,t0=0,fill=-1,wetList=[];const res=[];let CAM=[GX,15,GZ+10,GX,0,GZ+.5,50];window.__GCAM=()=>document.getElementById('wgP')?CAM:null;
  const snd=(f,len=.15,v=.06)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='triangle';o.frequency.value=f;gg.gain.setValueAtTime(v,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const d=document.createElement('div');d.id='wgP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1e2a30;border:3px solid #6ab0e0;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef4f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const ui=()=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#9ad0f0">💧 정원 물길 잇기 ${rd+1}/3</b><div style="font:18px 'Do Hyeon',sans-serif;margin:4px 0">돌린 횟수 ${moves}</div><div style="font-size:12px;opacity:.9">돌 물길판을 눌러 오른쪽으로 돌려요. 위쪽 샘물이 오른쪽 아래 연못까지 흐르면 끝!</div><button data-x style="font:13px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f8;border:2px solid #eef4f8;border-radius:10px;padding:3px 10px;margin-top:6px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const clear=()=>{while(board.children.length)board.remove(board.children[0]);tiles=[]};
  const pos=(rw,c)=>[(c-(N-1)/2)*CS,(rw-(N-1)/2)*CS];
  const mkTile=(i)=>{const C=cells[i];const g=new THREE.Group();const[x,z]=pos(C.r,C.c);g.position.set(x,0,z);const s=new THREE.Mesh(new THREE.BoxGeometry(CS*.94,.24,CS*.94),slabM);s.position.y=.12;s.userData.i=i;g.add(s);tiles.push(s);
   const arm=new THREE.Group();g.add(arm);C.arms=[];const mid=new THREE.Mesh(new THREE.BoxGeometry(.42,.06,.42),chM);mid.position.y=.26;arm.add(mid);C.arms.push(mid);
   for(const[bit,dr,dc]of DIR)if(C.base&bit){const a=new THREE.Mesh(new THREE.BoxGeometry(dc?CS*.47:.42,.06,dr?CS*.47:.42),chM);a.position.set(dc*CS*.26,.26,dr*CS*.26);arm.add(a);C.arms.push(a)}
   C.arm=arm;C.cur=C.rot*-Math.PI/2;arm.rotation.y=C.cur;board.add(g)};
  const mask=C=>{let m=C.base;for(let k=0;k<C.rot;k++)m=rot(m);return m};
  const flow=()=>{const seen=new Set();const q=[];if(mask(cells[0])&1){q.push(0);seen.add(0)}while(q.length){const i=q.shift();const C=cells[i],m=mask(C);for(const[bit,dr,dc]of DIR){if(!(m&bit))continue;const rr=C.r+dr,cc=C.c+dc;if(rr<0||cc<0||rr>=N||cc>=N)continue;const j=rr*N+cc;if(seen.has(j))continue;if(mask(cells[j])&OPP[bit]){seen.add(j);q.push(j)}}}const last=N*N-1;return{seen,ok:seen.has(last)&&(mask(cells[last])&4)}};
  const paint=()=>{const f=flow();cells.forEach((C,i)=>C.arms.forEach(a=>a.material=f.seen.has(i)?wetM:chM));return f};
  const newRound=()=>{clear();N=[4,5,6][rd];CAM=[GX,9+N*1.4,GZ+5+N*1.1,GX,0,GZ+.4,50];moves=0;
   /* 샘에서 연못까지 한 줄 길(되돌아가며 찾기) */let path=null;for(let tr=0;tr<200&&!path;tr++){const vis=new Set([0]);const p=[[0,0]];const go=()=>{const[cr,cc]=p[p.length-1];if(cr===N-1&&cc===N-1)return true;const ds=[[0,1],[1,0],[0,-1],[-1,0]].sort(()=>r()-.5);for(const[a,b]of ds){const nr=cr+a,nc=cc+b;if(nr<0||nc<0||nr>=N||nc>=N||vis.has(nr*N+nc))continue;vis.add(nr*N+nc);p.push([nr,nc]);if(go())return true;p.pop()}return false};if(go()&&p.length>=N*2)path=p}
   const bitOf=(a,b)=>b[0]<a[0]?1:b[1]>a[1]?2:b[0]>a[0]?4:8;cells=[];for(let i=0;i<N*N;i++)cells.push({r:(i/N)|0,c:i%N,base:r()<.5?5:3,rot:0,need:null});
   path.forEach((p,k)=>{const prev=k===0?[-1,0]:path[k-1],next=k===path.length-1?[N,N-1]:path[k+1];const want=bitOf(p,prev)|bitOf(p,next);const straight=want===5||want===10;const C=cells[p[0]*N+p[1]];C.base=straight?5:3;let m=C.base,k2=0;while(m!==want){m=rot(m);k2++}C.need=straight?[k2%2,k2%2+2]:[k2]});
   minMv=0;cells.forEach(C=>{C.rot=(r()*4)|0;if(C.need){const ds=C.need.map(n=>(n-C.rot+4)%4);minMv+=Math.min(...ds)}});if(minMv===0){cells[0].rot=(cells[0].rot+1)%4;minMv=1}
   cells.forEach((C,i)=>mkTile(i));
   const src=new THREE.Mesh(new THREE.CylinderGeometry(.6,.6,.3,14),srcM);const[sx,sz]=pos(-1,0);src.position.set(sx,.15,sz);board.add(src);const pd=new THREE.Mesh(new THREE.CylinderGeometry(1.1,1.1,.12,18),srcM);const[px,pz]=pos(N,N-1);pd.position.set(px,.06,pz);board.add(pd);
   paint();t0=performance.now()/1000;fill=-1;ui()};
  const tap=i=>{if(done||fill>=0)return;const C=cells[i];C.rot=(C.rot+1)%4;moves++;snd(380+((C.r+C.c)%4)*60,.08);const f=paint();ui();if(f.ok){fill=performance.now()/1000;snd(660,.5,.08)}};
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.1,500);const rc=new THREE.Raycaster();const ov=document.createElement('div');ov.id='wgO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  ov.onpointerdown=e=>{pc.fov=CAM[6];pc.aspect=innerWidth/innerHeight;pc.position.set(CAM[0],CAM[1],CAM[2]);pc.lookAt(CAM[3],CAM[4],CAM[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(tiles,false)[0];if(h)tap(h.object.userData.i)};
  const cleanup=()=>{ov.remove();clear();board.visible=false};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('wanggung_water',Q,'정원 물길 잇기')}catch(e){}window.__WGQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#9ad0f0">물이 연못까지 흘렀어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">왕궁리 정원 터에서는 괴석과 함께 물을 끌어들이던 물길이 나왔어요. 백제 사람들은 궁 안에 물이 흐르는 정원을 꾸몄어요(놀이판은 간추린 것).</div><div style="font-size:24px;color:#6ab0e0">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#6ab0e0;color:#1e2a30;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f8;border:2px solid #eef4f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__WGWATER()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const step=()=>{if(!d.isConnected){cleanup();return}if(done)return;const now=performance.now()/1000;
   cells.forEach(C=>{if(!C.arm)return;const tg=C.rot*-Math.PI/2;const dd=Math.atan2(Math.sin(tg-C.cur),Math.cos(tg-C.cur));C.cur+=dd*.3;C.arm.rotation.y=C.cur});
   if(auto&&fill<0){const C=cells.find(C=>C.need&&!C.need.includes(C.rot));if(C&&((now*10)|0)%3===0)tap(cells.indexOf(C))}
   if(fill>=0){const k=(now-fill);board.children.forEach(o=>{if(o.material===srcM)o.scale.y=1+Math.sin(k*8)*.1});if(k>1.4){const el=fill-t0;res.push(Math.max(30,Math.round(100-Math.max(0,moves-minMv)*5-Math.max(0,el-20-rd*15)*.6)));rd++;if(rd>=3){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);window.__WGG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},get min(){return minMv},get moves(){return moves},get N(){return N}};try{ctx.say('샘물을 연못까지 흐르게 해 봐요!',2)}catch(e){}};
 /* 밤: 탑 둘레·남문 터 등불 */const NL=[];if(!mini){for(const[x,y,z]of[[TX+5,3,TZ+5],[TX-5,3,TZ+5],[0,3,40],[BX,3,BZ+9]]){const L=new THREE.PointLight(0xffc080,0,26,1.5);L.position.set(x,y,z);G.add(L);NL.push(L);const lp=new THREE.Mesh(new THREE.BoxGeometry(.4,.6,.4),new THREE.MeshStandardMaterial({color:0xfff0c0,emissive:0xffb050,emissiveIntensity:.6}));lp.position.set(x,1.4,z);G.add(lp);const pole=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,1.1,6),M(0x4a3a2a));pole.position.set(x,.55,z);G.add(pole)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'수부 도장 기와',h:'「首府(수부)」 도장이 찍힌 기와예요. 왕궁리에서 나와 이곳이 백제 왕궁이었다는 실마리가 됐어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.26,.04,.18),M(0x6a6660)))})},
  {n:'유리 구슬',h:'공방에서 만든 작은 유리 구슬이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.035,10,8),M(0x3a9a7a,{roughness:.2,transparent:true,opacity:.85})))})},
  {n:'도가니 조각',h:'금과 유리를 녹이던 흙 도가니 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.1,.07,.12,12,1,true,0,2.4),M(0x5a4a3a,{side:THREE.DoubleSide})))})},
  {n:'금 조각',h:'공방에서 쓰고 남은 작은 금 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.04,.01,.03),M(0xe0b040,{metalness:.9,roughness:.25})))})},
  {n:'연꽃무늬 수막새',h:'처마 끝을 막던 백제 연꽃무늬 기와예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.03,18),M(0x7a766e)))})}];
 sp(8,30,2.4,'발굴 탐지 자리','왕궁 터 흙 속에 백제의 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__WGDIG=()=>{window.__DETECT&&window.__DETECT({key:'wanggung_dig',title:'왕궁리 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[-10,30],[12,20],[-14,-10],[14,-8],[22,26],[-46,-14],[18,-30],[-8,-40],[46,22],[-50,20]],items:ITEMS,intro:'왕궁 터 흙 속에 백제의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'익산 왕궁리 유적은 백제 무왕 때 궁궐 터로, 공주·부여 유적과 함께 백제역사유적지구(유네스코 세계유산)예요.'})};
 const meta={quest:{t:'왕궁리 둘러보기',d:'백제 왕궁 터의 탑과 건물 터, 공방과 정원을 둘러보세요.',steps:[['남문','궁장 남문 터'],['탑','왕궁리 오층석탑'],['건물 터','큰 건물 터'],['공방','금·유리 공방 터'],['화장실','대형 화장실 터'],['정원','정원 물길']]},
  title:'익산 왕궁리 유적',hint:'백제 무왕 때 왕궁 터와 오층석탑을 공개 사진·발굴 보고로 간추려 지었어요(탑은 실제 높이 약 9m). 정원 물길판을 돌려 샘물을 연못까지 흐르게 해 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-7,z:52,lines:['익산 왕궁리 유적','백제 무왕 때 궁궐 터','오층석탑 · 국보 · 약 9m','간추려 지음']}},
  npc:[['science',[[-6,30],[6,30],[6,36],[-6,36]]]],bounds:[-100,100,-90,90],level:()=>'익산 왕궁리',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#8aa458';g.fillRect(0,0,300,300);g.fillStyle='#c8b890';g.fillRect(X(-2.5),Z(-24),5*S,64*S);g.fillStyle='#9a9282';g.fillRect(X(-50),Z(43),100*S,3*S);g.fillStyle='#b8b2a4';g.fillRect(X(-3),Z(-25),6*S,6*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:58,yaw:Math.PI},size:{}},meta)}
