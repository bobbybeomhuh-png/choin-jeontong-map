/* 강릉 선교장 마당(2026-11-23, 2단계 여섯째 묶음): 경포호 가까운 사대부 큰 집(국가민속문화재). 효령대군 후손 이내번이 18세기 초에 터를 잡았다고 전함.
   옛날 경포호가 넓을 때 배로 건너다녔다 해서 「배다리 마을(선교)」이라는 이름이 났다고 전함.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   연못 위 정자 활래정(1816) → 길게 이어진 행랑채와 솟을대문 → 사랑채 열화당(1815, 앞에 서양식 차양을 덧댐) / 안채 / 동별당.
   놀이: 숫자 무늬 맞추기(줄마다 적힌 숫자만큼 이어진 칸을 칠해 숨은 무늬를 찾기, 노노그램, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {curvedRoof,buildHall} from './hallkit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildSeongyo(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1703);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x86a04c,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 for(let i=0;i<24;i++){const x=-50+i*4.4+r()*2,z=-36-r()*8;const t=new THREE.Mesh(new THREE.CylinderGeometry(.25,.35,7,7),M(0x6a4030));t.position.set(x,3.5,z);t.rotation.z=(r()-.5)*.3;G.add(t);const c=new THREE.Mesh(new THREE.ConeGeometry(2.2,2.4,8),M(0x2f5a2a));c.scale.y=.6;c.position.set(x,7,z);G.add(c)}
 const ST=M(0xa8a296),WOOD=M(0x8a6a48),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50),EARTH=M(0xb8a080);
 const roof=(x,y,z,W,D,h)=>{curvedRoof(G,x,(y+h/2)-(h)/2,z,(W*.72)/.72,(D*.72)/.72,(h)*1.05)};
 const plaque=(x,y,z,txt,w=2)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 const hall=(x,z,W,D,PH,base=.6)=>{/* 11/23 품질: 흰 상자 벽+기둥 → hallkit 한옥 */const h=buildHall({x,z,W,D,nx:Math.max(1,Math.round(W/3)),nz:Math.max(1,Math.round(D/3.2)),FY:base,PH:PH,roof:'hip',pillar:0x6b4a2e,bracket:'ik',bare:true,plain:true,front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',mini,solids,light:false,roofScale:.9});G.add(h.group);return base+PH};
 /* 연못과 활래정(앞) */const PZ=30;{const p=new THREE.Mesh(new THREE.PlaneGeometry(22,12),M(0x4a7a8a,{roughness:.2}));p.rotation.x=-Math.PI/2;p.position.set(-12,.05,PZ);G.add(p);solids.push({x0:-23,x1:-1,y0:-2,y1:3,z0:PZ-6,z1:PZ+6});for(let i=0;i<20;i++){const l=new THREE.Mesh(new THREE.CircleGeometry(.5+r()*.3,12),M(0x3a7a3a));l.rotation.x=-Math.PI/2;l.position.set(-21+r()*18,.07,PZ-5+r()*10);G.add(l);if(i%4===0){const f=new THREE.Mesh(new THREE.SphereGeometry(.2,8,6),M(0xf0a0b8));f.position.set(l.position.x,.3,l.position.z);G.add(f)}}
  const X=-6,Z=PZ-2;for(const[i,j]of[[-1,-1],[1,-1],[-1,1],[1,1],[-1,0],[1,0]]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.15,.17,3.2,8),WOOD);c.position.set(X+i*2.2,1.6,Z+j*1.8);G.add(c)}const dk=new THREE.Mesh(new THREE.BoxGeometry(5,.2,4.2),WOOD);dk.position.set(X,1.2,Z);G.add(dk);roof(X,3.2,Z,7,6.4,1.6);plaque(X,2.9,Z+2.12,'亭來活',1.4)}
 sp(-6,PZ+7.5,3,'활래정','연못에 기둥을 담그고 선 정자예요(1816). 「살아 있는 물이 흘러온다」는 뜻으로, 연꽃 핀 연못을 내려다봐요.');
 /* 행랑채(길게) + 솟을대문 + 평대문 */const HZ=14;{const L1=-30,L2=30;for(const[a,b]of[[L1,-3],[3,14],[18,L2]]){const w=new THREE.Mesh(new THREE.BoxGeometry(b-a,2.4,3.4),WALLW);w.position.set((a+b)/2,1.2,HZ);G.add(w);roof((a+b)/2,2.4,HZ,b-a+1.4,5,1.3);solids.push({x0:a,x1:b,y0:0,y1:2.4,z0:HZ-1.7,z1:HZ+1.7})}const tg=new THREE.Mesh(new THREE.BoxGeometry(6,1.2,3.4),WALLW);tg.position.set(0,3,HZ);G.add(tg);roof(0,3.6,HZ,7.4,5,1.4);plaque(0,3.3,HZ+1.72,'莊橋船',1.6)}
 sp(0,HZ+4,3,'솟을대문','긴 행랑채 가운데 지붕을 높이 솟게 한 대문이에요. 현판 船橋莊은 「배다리 집」이라는 뜻이에요.');sp(16,HZ+4,2.6,'행랑채','길게 이어진 행랑채예요. 일꾼들이 지내고 곡식과 살림을 두던 곳이에요.');
 /* 열화당(사랑채, 차양) */{const y=hall(-6,2,10,5,2.8,.9);plaque(-6,y-.45,2+2.55,'堂話悅',1.6);const can=new THREE.Mesh(new THREE.BoxGeometry(10.4,.08,2.4),M(0x5a7a6a,{metalness:.4,roughness:.5}));can.position.set(-6,3.2,2+3.6);can.rotation.x=.18;G.add(can);for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,3,6),M(0x3a3a3a,{metalness:.5}));p.position.set(-6+s*5,1.5,2+4.7);G.add(p)}}
 sp(-6,9.5,3,'열화당','손님을 맞던 사랑채예요(1815). 앞에 동판으로 덮은 서양식 차양을 덧대었어요. 러시아 공사관에서 선물했다는 이야기가 전해요(전해 오는 이야기). 지금은 열화당이라는 이름의 출판사도 있어요.');
 hall(12,-6,12,6,2.6,.6);sp(12,0,2.6,'안채','집안 살림을 하던 안채예요.');hall(-22,-6,6,4.4,2.6,.6);sp(-22,-1,2.6,'동별당','집안 어른이 지내던 별당이에요.');
 /* 숫자 무늬 맞추기(11/23) */const PX=24,PZ2=-2+0;const BX=26,BZ=24;const pg=new THREE.Group();pg.position.set(BX,0,BZ);pg.visible=false;G.add(pg);
 const PATS=[{n:'꽃잎 무늬',b:['..#..','.###.','#####','.###.','..#..']},{n:'박쥐 무늬(복을 뜻함)',b:['#....#','##..##','######','.####.','..##..','......']},{n:'항아리 무늬',b:['..###..','...#...','.#####.','#######','#######','.#####.','..###..']}];
 const runs=a=>{const o=[];let c=0;for(const v of a){if(v)c++;else if(c){o.push(c);c=0}}if(c)o.push(c);return o.length?o:[0]};
 window.__SYNONO=()=>{if(document.getElementById('synP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(BX,BZ+10,0)}catch(e){}pg.visible=true;
  let rd=0,N=5,sol=[],cur=[],cells=[],clicks=0,done=false,auto=false,last=performance.now(),t0=0,wait=0,rowC=[],colC=[];const res=[];const CS=.36;
  const camA=()=>{const k=innerWidth<innerHeight?1.9:1;return[BX,1.9,BZ+(2.4+N*.18)*k,BX,1.75,BZ,50]};window.__GCAM=()=>document.getElementById('synP')?camA():null;
  const snd=(f,len=.08,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const clr=()=>{while(pg.children.length)pg.remove(pg.children[0]);cells=[]};
  const FILL=M(0x8a3a2a),EMP=M(0xf0e6d0);
  const lab=(txt,x,y,w,h,col='#2a2418')=>{const T=tex(128,64,(q,ww,hh)=>{q.fillStyle='rgba(0,0,0,0)';q.clearRect(0,0,ww,hh);q.fillStyle=col;q.font='bold 34px sans-serif';q.textAlign='center';q.fillText(txt,ww/2,44)});const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:T,transparent:true}));m.position.set(x,y,.03);pg.add(m);return m};
  const ok=()=>{for(let i=0;i<N;i++){if(runs(cur[i]).join()!==rowC[i].join())return false;if(runs(cur.map(rw=>rw[i])).join()!==colC[i].join())return false}return true};
  const newRound=()=>{clr();const P=PATS[rd];N=P.b.length;sol=P.b.map(rw=>[...rw].map(c=>c==='#'));cur=sol.map(rw=>rw.map(()=>false));rowC=sol.map(runs);colC=[...Array(N).keys()].map(i=>runs(sol.map(rw=>rw[i])));clicks=0;
   const ox=-(N-1)/2*CS+.3,oy=1.2;const board=new THREE.Mesh(new THREE.BoxGeometry(N*CS+1.3,N*CS+1.1,.1),M(0xc8b898));board.position.set(.05,oy+(N-1)/2*CS+.25,-.06);pg.add(board);const legs=new THREE.Mesh(new THREE.BoxGeometry(N*CS+1,.1,.4),WOOD);legs.position.set(.05,oy-.6,0);pg.add(legs);
   for(let rr=0;rr<N;rr++)for(let c=0;c<N;c++){const m=new THREE.Mesh(new THREE.BoxGeometry(CS*.92,CS*.92,.05),EMP);m.position.set(ox+c*CS,oy+(N-1-rr)*CS,0);m.userData.rc=[rr,c];pg.add(m);cells.push(m)}
   rowC.forEach((rc,rr)=>lab(rc.join(' '),ox-CS*.5-.32,oy+(N-1-rr)*CS,.6,.3));colC.forEach((cc,c)=>cc.forEach((v,k)=>lab(String(v),ox+c*CS,oy+N*CS-.08+(cc.length-1-k)*.22,.3,.22)));
   t0=performance.now()/1000;ui()};
  const paint=()=>cells.forEach(m=>{const[rr,c]=m.userData.rc;m.material=cur[rr][c]?FILL:EMP});
  const d=document.createElement('div');d.id='synP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2418;border:3px solid #8a3a2a;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0c0a0">🧩 숫자 무늬 맞추기 ${rd+1}/3</b><div style="font-size:12px;margin:4px 0;line-height:1.5">왼쪽 숫자는 그 가로줄, 위 숫자는 그 세로줄에서 이어 칠할 칸 수예요(숫자가 둘이면 사이에 빈칸 하나 이상). 칸을 눌러 칠하고, 다시 누르면 지워요.</div><div style="font-size:13px;color:#f0c0a0;min-height:18px">${msg}</div><div style="font-size:12px">누른 횟수 ${clicks}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:1px solid #f4ecd8;border-radius:8px;padding:2px 8px;margin-top:4px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const tap=(rr,c)=>{if(done||wait>0)return;cur[rr][c]=!cur[rr][c];clicks++;snd(cur[rr][c]?520:360);paint();if(ok()){wait=1.5;snd(760,.4,'sine');ui(PATS[rd].n+'가 나왔어요!')}else ui()};
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,100);const rc=new THREE.Raycaster();const ov=document.createElement('div');ov.id='synO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  ov.onpointerdown=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(cells,false)[0];if(h)tap(...h.object.userData.rc)};
  const cleanup=()=>{ov.remove();clr();pg.visible=false};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3);const s2=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('seongyo_nono',Q,'숫자 무늬 맞추기')}catch(e){}window.__SYQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0c0a0">숨은 무늬를 다 찾았어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">옛집의 담장·굴뚝·창살에는 꽃, 박쥐(복을 뜻함), 항아리 같은 좋은 뜻의 무늬를 넣곤 했어요(놀이의 무늬와 숫자 규칙은 간추린 것).</div><div style="font-size:24px;color:#8a3a2a">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#8a3a2a;color:#fff;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__SYNONO()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  let at=0;const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(auto&&wait<=0){at+=dt;if(at>.1){at=0;outer:for(let rr=0;rr<N;rr++)for(let c=0;c<N;c++)if(cur[rr][c]!==sol[rr][c]){tap(rr,c);break outer}}}
   if(wait>0){wait-=dt;if(wait<=0){const el=performance.now()/1000-t0;const need=sol.flat().filter(Boolean).length;res.push(Math.max(30,Math.round(100-Math.max(0,clicks-need)*2-Math.max(0,el-40-rd*30)*.3)));rd++;if(rd>=3){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);window.__SYG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},scr:(rr,c)=>{setPC();const v=new THREE.Vector3();cells[rr*N+c].getWorldPosition(v);v.project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]},get filled(){return cur.flat().filter(Boolean).length}};try{ctx.say('숫자를 보고 칸을 칠해 숨은 무늬를 찾아 봐요!',2.4)}catch(e){}};
 spots.push({x:BX,y:0,z:BZ+3,r:2.6,t:'무늬 맞추는 자리',h:'숫자를 보고 칸을 칠해 옛집 무늬를 찾아 봐요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[-6,3,PZ+6],[0,3,HZ+3],[-6,3,9],[12,3,0],[BX,3,BZ+3]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'백자 사발 조각',h:'큰 집 부엌에서 쓰던 백자 사발 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.08,.06,14,1,true,0,2.4),M(0xf0ece0,{side:THREE.DoubleSide})))})},
  {n:'놋쇠 숟가락',h:'놋쇠 숟가락이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.01,.03),M(0xc8a040,{metalness:.7})))})},
  {n:'기와 조각',h:'옛집 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'쇠 장석',h:'반닫이나 문짝에 달던 쇠 장식이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,8),M(0x3a3632,{metalness:.6})))})},
  {n:'상평통보',h:'조선 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x8a6a3a,{metalness:.6})))})}];
 sp(14,40,2.4,'발굴 탐지 자리','선교장 앞 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__SYDIG=()=>{window.__DETECT&&window.__DETECT({key:'seongyo_dig',title:'선교장 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[6,38],[22,40],[-28,40],[30,20],[-34,20],[2,6],[-14,-14],[24,-14],[-30,-16],[34,4]],items:DIG,intro:'선교장 둘레 흙 속에 옛 살림의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'선교장은 조선 후기 강릉의 큰 사대부 집으로, 지금도 후손이 살며 집을 지켜요.'})};
 const meta={quest:{t:'선교장 둘러보기',d:'연못의 활래정에서 솟을대문으로 들어가 열화당·안채·동별당을 둘러보세요.',steps:[['활래정','활래정'],['솟을대문','솟을대문'],['행랑채','행랑채'],['열화당','열화당'],['안채','안채'],['동별당','동별당']]},
  title:'강릉 선교장',hint:'강릉 선교장을 공개 사진으로 간추려 지었어요(배치·크기 어림). 행랑채 앞마당에서 숫자를 보고 칸을 칠해 옛집 무늬를 찾아 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:8,z:46,lines:['강릉 선교장','배다리 마을의 큰 집','활래정 · 열화당','간추려 지음']}},
  npc:[['science',[[2,44],[8,44],[8,50],[2,50]]]],bounds:[-50,50,-34,60],level:()=>'강릉 선교장',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:10,draw(g,X,Z,S){g.fillStyle='#86a04c';g.fillRect(0,0,300,300);g.fillStyle='#4a7a8a';g.fillRect(X(-23),Z(PZ+6),22*S,12*S);g.fillStyle='#eee6d4';g.fillRect(X(-30),Z(HZ+1.7),60*S,3.4*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:6,z:52,yaw:Math.PI},size:{}},meta)}
