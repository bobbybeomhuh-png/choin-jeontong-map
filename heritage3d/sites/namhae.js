/* 남해 가천 다랭이마을·관음포 마당(2026-11-22, W36): 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음(집은 hanokkit 실측 초가 CC BY).
   가천 다랭이마을(국가명승 「남해 가천마을 다랭이논」): 바다로 떨어지는 가파른 비탈에 100층이 넘는 작은 논을 계단처럼 쌓아 일군 마을. 마을 지킴이 암수바위(미륵바위).
   관음포(이순신 순국 공원): 1598년 노량해전에서 이순신 장군이 「나의 죽음을 알리지 말라」는 말을 남기고 순국한 바다. 이락사(李落祠)가 있음.
   놀이: 다랭이논 물대기(위 논부터 물꼬를 열고 닫아 모든 논을 알맞게 채우기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {placeHanok} from './hanokkit.js';
export function buildNamhae(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1598);
 const TOUCH=opts.touch!=null?!!opts.touch:matchMedia('(pointer:coarse)').matches;
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 북쪽 높은 산(z<-50, 24m)에서 남쪽 바다(z>40)로 떨어지는 계단 비탈 */const SEAZ=40;const step=v=>Math.floor(v/1.4)*1.4;const ss=t=>t<=0?0:t>=1?1:t*t*(3-2*t);
 const H=(x,z)=>{if(z>SEAZ)return -3;const u=(SEAZ-z)/90;const wav=Math.sin(x/14)*1.5;return Math.max(0,step(24*ss(u)+wav*ss(u*2)))};
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(220,220,220,220);g.rotateX(-Math.PI/2);const p=g.attributes.position;const col=[];const c=new THREE.Color();for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);const h=H(x,z);p.setY(k,h);const tier=Math.round(h/1.4)%2;c.set(z>SEAZ-1?'#8a7a68':tier?'#8aa840':'#9ab048');col.push(c.r,c.g,c.b)}g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1,flatShading:true}));m.receiveShadow=true;G.add(m)}
 const WT=tex(256,256,(q,w,h)=>{q.fillStyle='#2f6a86';q.fillRect(0,0,w,h);for(let i=0;i<220;i++){q.strokeStyle=`rgba(230,245,250,${.08+r()*.14})`;q.lineWidth=1+r()*2;const x=r()*w,y=r()*h;q.beginPath();q.moveTo(x,y);q.lineTo(x+18+r()*20,y);q.stroke()}},[10,10]);WT.wrapS=WT.wrapT=THREE.RepeatWrapping;
 {const sea=new THREE.Mesh(new THREE.PlaneGeometry(260,120),new THREE.MeshStandardMaterial({map:WT,roughness:.1,metalness:.2}));sea.rotation.x=-Math.PI/2;sea.position.set(0,-.6,SEAZ+60);G.add(sea);solids.push({x0:-200,x1:200,y0:-6,y1:30,z0:SEAZ+1,z1:SEAZ+200});for(let k=0;k<16;k++){const rk=new THREE.Mesh(new THREE.DodecahedronGeometry(1.6+r()*2,0),M(0x6a6458,{flatShading:true}));rk.position.set(-100+k*13+(r()-.5)*4,-.6,SEAZ+1+r()*3);G.add(rk)}}
 /* 논두렁 돌담 줄(계단 경계 표시) */{const wm=M(0x8a8068,{flatShading:true});for(let z=SEAZ-2;z>-40;z-=4.2){for(let x=-80;x<=80;x+=10){const h=H(x,z);if(h<=0)continue;const s=new THREE.Mesh(new THREE.BoxGeometry(10.2,.5,.5),wm);s.position.set(x,h+.05,z);G.add(s)}}}
 /* 마을 초가 + 암수바위 */if(!mini){for(const[k,x,z]of[['choga1',-40,-10],['choga2',-24,-18],['choga1',30,-14],['nongga',44,-6],['choga2',-56,0]]){const y=H(x,z);const n0=G.children.length,s0=solids.length;placeHanok(G,solids,k,x,z,Math.PI,{TOUCH,s:.7});for(let i=n0;i<G.children.length;i++)G.children[i].position.y+=y;for(let i=s0;i<solids.length;i++){if(solids[i].y0!=null)solids[i].y0+=y;if(solids[i].y1!=null)solids[i].y1+=y}}}
 {const y=H(8,-2);const m1=new THREE.Mesh(new THREE.CylinderGeometry(.8,1.1,5.6,10),M(0x8a8478,{flatShading:true}));m1.position.set(8,y+2.8,-2);G.add(m1);const m2=new THREE.Mesh(new THREE.SphereGeometry(1.4,10,8),M(0x8a8478,{flatShading:true}));m2.scale.set(1,.8,.7);m2.position.set(11,y+.9,-2);G.add(m2);solids.push({cx:9,cz:-2,r:2,y0:0,y1:y+6})}
 /* 관음포 이락사 + 바다의 판옥선(동쪽 끝) */if(!mini){const y=H(66,22);const h=buildHall({x:66,z:22,ry:Math.PI,W:5,D:4,nx:3,nz:1,FY:.8,PH:2.8,roof:'gable',name:'李落祠',pillar:0x9a3a26,bracket:'ik',front:'door',roofScale:.85,solids,light:false});h.group.position.y=y;G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 {const ship=new THREE.Group();const hull=new THREE.Mesh(new THREE.BoxGeometry(16,2.6,6),M(0x6a4a2a));hull.position.y=.6;ship.add(hull);const up=new THREE.Mesh(new THREE.BoxGeometry(12,2,6.4),M(0x7a5a38));up.position.y=2.8;ship.add(up);const pv=new THREE.Mesh(new THREE.BoxGeometry(4,2,3.4),M(0x9a3a26));pv.position.set(-2,4.6,0);ship.add(pv);for(const x of[-4,3]){const ms=new THREE.Mesh(new THREE.CylinderGeometry(.15,.2,9,8),M(0x5a3a28));ms.position.set(x,7,0);ship.add(ms)}ship.position.set(70,-.6,SEAZ+18);ship.rotation.y=.4;G.add(ship)}
 const NL=[];if(!mini){for(const[x,z]of[[-40,-4],[-24,-12],[30,-8],[66,26],[9,2]]){const L=new THREE.PointLight(0xffc080,0,18,1.5);L.position.set(x,H(x,z)+3,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7;WT.offset.x+=dt*.008};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(0,20,3.4,'다랭이논','바다로 떨어지는 가파른 비탈에 돌을 쌓아 100층이 넘는 작은 논을 일궜어요(국가명승). 「삿갓을 덮으니 논 한 배미가 사라졌다」는 우스개가 있을 만큼 작은 논도 있어요. 간추려 지었어요.');
 sp(8,3,2.4,'암수바위','마을을 지키는 남녀 바위예요(미륵바위). 아이를 바라는 사람들이 빌던 곳이에요.');
 sp(-10,12,2.2,'물꼬 보는 자리','다랭이논은 위 논에서 아래 논으로 물을 차례로 흘려 보내요. 물꼬를 열고 닫아 모든 논에 물을 알맞게 대 봐요.');
 sp(62,30,3,'관음포 이락사','1598년 노량해전에서 이순신 장군이 「나의 죽음을 적에게 알리지 말라」는 말을 남기고 순국한 바다예요. 이락사는 「이순신이 떨어진 곳」이라는 뜻의 사당이에요.');
 sp(-60,10,2.4,'발굴 탐지 자리','마을 땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 다랭이논 물대기(11/22): 맨 위 샘에서 물이 들어와요. 논마다 「물꼬」를 열면 아래 논으로 물이 흘러요. 모든 논을 초록 칸(60~85%)에 맞추고 「다 됐어요」. 넘치면 둑이 터져 감점. 75초 */
 window.__NHWATER=()=>{if(document.getElementById('nhP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(-10,12,0)}catch(e){}
  const N=6,TL=75,LO=.6,HI=.85;const lv=Array(N).fill(0),open=Array(N).fill(false);let spills=0,done=false,t0=performance.now()/1000,last=t0;const cap=[1,.8,1.1,.7,.9,1.2];
  const d=document.createElement('div');d.id='nhP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:16px;z-index:60;background:#1e2a18;border:3px solid #8ab060;border-radius:16px;padding:10px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#eef4e0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:300px;max-width:94vw;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#c8e8a0">🌾 다랭이논 물대기</b><div id="nhR" style="margin:6px 0"></div><button id="nhOK" style="width:100%;font:16px 'Do Hyeon',sans-serif;background:#8ab060;color:#1e2a18;border:0;border-radius:12px;padding:8px 0;cursor:pointer">✔ 다 됐어요</button><div id="nhG" style="font-size:12px;color:#c8e8a0;margin-top:4px">위 논부터 물꼬를 열어 물을 내려보내요</div><div id="nhT">${TL}초</div>`;
  const R=d.querySelector('#nhR');const rows=lv.map((v,i)=>{const row=document.createElement('div');row.style.cssText=`display:flex;align-items:center;gap:6px;margin:3px 0;padding-left:${i*10}px`;row.innerHTML=`<span style="width:34px;font-size:11px">${i+1}층</span><div style="flex:1;position:relative;height:16px;background:#3a3020;border-radius:4px;overflow:hidden"><div style="position:absolute;left:${LO*100}%;width:${(HI-LO)*100}%;top:0;bottom:0;background:rgba(120,200,90,.35)"></div><div data-f style="position:absolute;left:0;top:0;bottom:0;background:#4a9ad8"></div></div><button data-o style="font:12px 'Do Hyeon',sans-serif;border:0;border-radius:6px;padding:3px 6px;cursor:pointer;width:58px"></button>`;row.querySelector('[data-o]').onclick=()=>{open[i]=!open[i]};R.appendChild(row);return row});
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const draw=()=>rows.forEach((row,i)=>{row.querySelector('[data-f]').style.width=Math.min(100,lv[i]*100)+'%';const b=row.querySelector('[data-o]');b.textContent=open[i]?'물꼬 열림':'물꼬 닫힘';b.style.background=open[i]?'#4a9ad8':'#5a4a34';b.style.color='#fff'});
  const allOk=()=>lv.every(v=>v>=LO&&v<=HI);
  const fin=byBtn=>{if(done)return;done=true;const ok=lv.filter(v=>v>=LO&&v<=HI).length;const el=performance.now()/1000-t0;const Q=ok===N?Math.max(60,Math.round(100-spills*8-Math.max(0,el-40)*.6)):Math.round(ok/N*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('namhae_water',Q,'다랭이논 물대기')}catch(e){}window.__NHQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#c8e8a0">논 ${ok}배미에 물을 알맞게 댔어요</b><div style="font-size:13px;margin:4px 0">다랭이논은 위 논의 물이 아래 논으로 차례로 내려가요. 한 배미라도 둑이 터지면 아래 논까지 무너져, 마을 사람들은 함께 물꼬를 살폈어요.</div><div style="font-size:24px;color:#8ab060">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#8ab060;color:#1e2a18;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef4e0;border:2px solid #eef4e0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__NHWATER()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  d.querySelector('#nhOK').onclick=()=>{if(allOk())fin(true);else{d.querySelector('#nhG').textContent='아직 알맞지 않은 논이 있어요';snd(200,.2)}};
  const loop=()=>{if(!d.isConnected)return;const now=performance.now()/1000,dt=Math.min(.1,now-last);last=now;
   if(!done){let inflow=.12*dt;for(let i=0;i<N;i++){lv[i]+=inflow/cap[i];inflow=0;lv[i]=Math.max(0,lv[i]-.004*dt);if(open[i]&&lv[i]>0){const out=Math.min(lv[i],.16*dt/cap[i]);lv[i]-=out;inflow=out*cap[i]}if(lv[i]>1){spills++;lv[i]=.7;snd(150,.4,'sawtooth');d.querySelector('#nhG').textContent=(i+1)+'층 둑이 터졌어요! 물꼬를 열어요'}}
    draw();const left=Math.max(0,TL-(now-t0));d.querySelector('#nhT').textContent=Math.ceil(left)+'초';if(left<=0)fin(false)}
   requestAnimationFrame(loop)};loop();
  window.__NHG={lv,open,LO,HI,ok:()=>d.querySelector('#nhOK').onclick()};try{ctx.say('물꼬를 열고 닫아 논에 물을 대요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'조선 화살촉',h:'노량해전 무렵 조선 수군의 쇠 화살촉이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.ConeGeometry(.03,.14,4),M(0x5a4a3a,{metalness:.5}));m.rotation.z=Math.PI/2;g.add(m)})},
  {n:'호미',h:'논밭을 매던 쇠 호미예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.16,.02,.08),M(0x4a3a30,{metalness:.5})))})},
  {n:'옹기 조각',h:'물을 길어 나르던 옹기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.16,.12,.14,12,1,true),M(0x5a3a28,{side:THREE.DoubleSide})))})},
  {n:'그물추',h:'바다 그물을 가라앉히던 흙 그물추예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.1,10),M(0x8a6a4a)))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__NHDIG=()=>{window.__DETECT&&window.__DETECT({key:'namhae_dig',title:'남해 발굴 탐지',emoji:'⛏️',bg:'#1e2a18',count:4,TL:150,cand:[[-60,10],[-40,20],[20,20],[40,10],[-70,-10],[50,-20],[-20,30],[60,0]],items:ITEMS,intro:'마을 땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'남해는 바다를 일군 사람들과 나라를 지킨 사람들의 이야기가 함께 있는 섬이에요.'})};
 const meta={quest:{t:'남해 둘러보기',d:'다랭이논과 암수바위, 관음포 이락사를 둘러보세요.',steps:[['다랭이논','다랭이논'],['암수바위','암수바위'],['이락사','관음포 이락사']]},
  title:'남해 다랭이마을·관음포',hint:'바닷가 벼랑의 다랭이논과 이순신 장군이 순국한 관음포를 간추려 지었어요(집은 실측). 물꼬를 열고 닫아 논에 물을 대 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:true,groundY:-4,sign:{x:-6,z:24,lines:['남해 다랭이마을','국가명승 다랭이논','관음포 이락사','간추려 지음']}},
  npc:[['science',[[-10,22],[-2,22],[-2,30],[-10,30]]]],bounds:[-100,100,-90,SEAZ],level:()=>'남해',camCap:()=>Infinity,baseAt:(x,z)=>Math.max(0,H(x,z)),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.1,ox:0,oz:-10,draw(g,X,Z,S){for(let k=0;k<12;k++){g.fillStyle=k%2?'#8aa840':'#9ab048';g.fillRect(0,Z(SEAZ-(k+1)*8),300,8*S)}g.fillStyle='#2f6a86';g.fillRect(0,Z(SEAZ),300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-6,z:28,yaw:Math.PI},size:{}},meta)}
