/* 광주(경기) 남한산성 마당(2026-11-21): 공개 실측 3D(CC BY)가 없어 공개 수치로 간추려 지음.
   남한산성(세계유산 2014): 산 능선을 두른 산성, 본성 둘레 약 7.5km(바깥 성까지 약 12km). 행궁(임금이 머물던 궁, 상궐·하궐·한남루), 남문 지화문, 서쪽 높은 곳 지휘소 수어장대. 1636년 병자호란 때 인조가 47일 동안 머문 곳.
   성 둘레는 줄여서(지름 약 230m) 능선 그릇 모양 땅에 둘렀음. 놀이: 수어장대 오방기 신호(방향에 맞는 색 깃발 올리기), 발굴 탐지, 밤 행궁 등불. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {hanokWall} from './hanokkit.js';
export function buildNamhan(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1636);
 const TOUCH=opts.touch!=null?!!opts.touch:matchMedia('(pointer:coarse)').matches;
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 const RW=115;const ss=t=>t<=0?0:t>=1?1:t*t*(3-2*t);
 const H=(x,z)=>{const d=Math.hypot(x,z);const a=Math.atan2(z,x);let h=16*ss((d-55)/55)+(d>RW?-14*ss((d-RW)/40):0);h+=4*Math.max(0,-Math.cos(a))*ss((d-70)/40);/* 서쪽이 더 높음(수어장대) */return h};
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[70,70]);
  const g=new THREE.PlaneGeometry(340,340,170,170);g.rotateX(-Math.PI/2);const p=g.attributes.position;const col=[];const c=new THREE.Color();
  for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);p.setY(k,H(x,z));const d=Math.hypot(x,z);const yard=Math.abs(x)<26&&z>-30&&z<26;const road=(Math.abs(x)<2.5&&z>20&&z<RW+20);c.set(yard?'#c8b894':road?'#b49a6e':d>RW-8?'#5f7a38':'#6f8c40');col.push(c.r,c.g,c.b)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1}));m.receiveShadow=true;G.add(m)}
 /* 성벽: 능선 따라 돌(남쪽 지화문 자리만 비움) */
 {const ST=tex(256,128,(q,w,h)=>{q.fillStyle='#8a8478';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=20)for(let x=-(y/20%2)*24;x<w;x+=48){const v=110+(r()*60|0);q.fillStyle=`rgb(${v},${v-4},${v-12})`;q.fillRect(x+2,y+2,44,16)}},[1,1]);const sm=new THREE.MeshStandardMaterial({map:ST,roughness:.95});
  const N=124;const im=new THREE.InstancedMesh(new THREE.BoxGeometry(6.2,5,2.4),sm,N);const ip=new THREE.InstancedMesh(new THREE.BoxGeometry(6.2,1,.6),sm,N);const o=new THREE.Object3D();let k=0;
  for(let i=0;i<N;i++){const a=i/N*Math.PI*2;if(Math.abs(a-Math.PI/2)<.045)continue;const x=Math.cos(a)*RW,z=Math.sin(a)*RW;const y=H(x,z);o.position.set(x,y+1.6,z);o.rotation.set(0,-a+Math.PI/2,0);o.updateMatrix();im.setMatrixAt(k,o.matrix);o.position.set(x+Math.cos(a)*.9,y+4.6,z+Math.sin(a)*.9);o.updateMatrix();ip.setMatrixAt(k,o.matrix);k++;solids.push({cx:x,cz:z,r:3,y0:y-2,y1:y+5})}
  im.count=ip.count=k;im.castShadow=im.receiveShadow=true;G.add(im,ip)}
 /* 남문 지화문 */
 if(!mini){const y=H(0,RW);const h=buildHall({x:0,z:RW,ry:0,W:9,D:5,nx:3,nz:1,FY:0,PH:3,base:false,floor:true,roof:'hip',name:'至和門',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',rail:true,stairs:'none',solids:[],light:false});h.group.position.y=y+4.2;G.add(h.group);const sm=M(0x8a8478);for(const s of[-1,1]){const b=new THREE.Mesh(new THREE.BoxGeometry(4,4.4,6),sm);b.position.set(s*4.6,y+2.2,RW);G.add(b);solids.push({x0:s*4.6-2,x1:s*4.6+2,y0:y-1,y1:y+4.4,z0:RW-3,z1:RW+3})}const arch=new THREE.Mesh(new THREE.BoxGeometry(5.2,1.2,6),sm);arch.position.set(0,y+3.8,RW);G.add(arch)}
 /* 행궁: 하궐(외행전)·상궐(내행전)·한남루, 담 */
 if(!mini){const add=(sp)=>{const h=buildHall(Object.assign({solids,light:false,bracket:'ik',pillar:0x9a3a26},sp));G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})};
  add({x:0,z:-2,ry:0,W:16,D:9,nx:5,nz:3,FY:.9,PH:3.6,roof:'hip',name:'外行殿',front:'door'});
  add({x:0,z:-22,ry:0,W:18,D:9,nx:5,nz:3,FY:1.2,PH:3.6,roof:'hip',name:'內行殿',front:'door'});
  add({x:0,z:22,ry:0,W:9,D:5,nx:3,nz:1,FY:.4,PH:3.2,loft:{h:2.4,stone:true},roof:'hip',name:'漢南樓',front:'open',back:'open',left:'open',right:'open',rail:true,stairs:'none'});
  hanokWall(G,solids,-26,-32,26,-32,{TOUCH});hanokWall(G,solids,-26,-32,-26,24,{TOUCH});hanokWall(G,solids,26,-32,26,24,{TOUCH});hanokWall(G,solids,-26,24,-5,24,{TOUCH});hanokWall(G,solids,5,24,26,24,{TOUCH})}
 /* 수어장대(서쪽 높은 곳, 2층 누각) + 오방기 다섯 */
 const SX=-RW+16,SZ=0,SY=H(SX,SZ);
 if(!mini){const h=buildHall({x:SX,z:SZ,ry:Math.PI/2,W:11,D:8,nx:5,nz:3,FY:.8,PH:3.2,loft:{h:3,stone:false},roof:'hip',name:'守禦將臺',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',rail:true,stairs:'none',solids:[],light:false});h.group.position.y=SY;G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)});solids.push({x0:SX-4.2,x1:SX+4.2,y0:SY,y1:SY+4,z0:SZ-5.7,z1:SZ+5.7})}
 const FL=[['동','파랑(청)',0x2a5ab8],['서','하양(백)',0xf4f0e8],['남','빨강(적)',0xc8302a],['북','검정(흑)',0x1a1a1a],['가운데','노랑(황)',0xe0b030]];
 const FLAG=FL.map(([dir,cn,col],i)=>{const order=[2,0,4,1,3][i];const x=SX+9,z=SZ-8+order*4;const y=H(x,z);const g=new THREE.Group();g.position.set(x,y,z);const pole=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,3.2,6),M(0x6a4a2e));pole.position.y=1.6;g.add(pole);const cl=new THREE.Mesh(new THREE.PlaneGeometry(1.4,1),new THREE.MeshStandardMaterial({color:col,side:THREE.DoubleSide,roughness:.7}));cl.position.set(.7,1.6,0);g.add(cl);G.add(g);return{dir,cn,col,x,z,g,cl,sx:x+1.4,sz:z}});
 /* 수어장대 축대 */{const ped=new THREE.Mesh(new THREE.BoxGeometry(14,6,11),M(0x8a8478));ped.position.set(SX,SY-3+.05,SZ);ped.receiveShadow=true;G.add(ped)}
 /* 능선 소나무 */{const tm=M(0x5a4030),lm=M(0x2f5a2c);for(let i=0;i<150;i++){const a=r()*6.28,d=48+r()*110;const x=Math.cos(a)*d,z=Math.sin(a)*d;if(Math.abs(d-RW)<6)continue;if(Math.abs(x)<32&&z>-36&&z<30)continue;if(Math.abs(x)<6&&z>20)continue;if(Math.hypot(x-SX,z-SZ)<16)continue;const y=H(x,z);const t=new THREE.Mesh(new THREE.CylinderGeometry(.2,.32,5,6),tm);t.position.set(x,y+2.5,z);t.castShadow=true;G.add(t);for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(2.1-k*.5,2.1,7),lm);c.position.set(x,y+4.3+k*1.1,z);c.castShadow=true;G.add(c)}solids.push({cx:x,cz:z,r:.45,y0:y,y1:y+8})}}
 /* 밤 */
 const NL=[];if(!mini){for(const[x,y,z]of[[0,4,6],[0,4.5,-14],[0,4,26],[SX,SY+5,SZ],[0,H(0,RW)+6,RW-4]]){const L=new THREE.PointLight(0xffc080,0,24,1.4);L.position.set(x,y,z);G.add(L);NL.push({L})}for(let i=0;i<10;i++){const z=30+i*8.5;const y=H(3,z);const lp=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.4,10),new THREE.MeshStandardMaterial({color:i%2?0x2a4a9a:0xa02a2a,emissive:0}));lp.position.set(3,y+2,z);G.add(lp);const pl=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,1.8,6),M(0x4a3a2a));pl.position.set(3,y+.9,z);G.add(pl);NL.push({lp})}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const l of NL){if(l.L)l.L.intensity=nk*8;if(l.lp)l.lp.material.emissive.setRGB(nk*.9,nk*.6,nk*.4)}};
 /* 안내 */
 const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(6,RW-10,3.4,'남한산성 남문 지화문','남한산성의 정문이에요. 남한산성은 산 능선을 따라 둘레 약 7.5km(바깥 성까지 약 12km) 성을 쌓은 산성으로, 2014년 세계유산이 됐어요. 간추려 지었어요.');
 sp(0,30,3.4,'남한산성 행궁','전쟁이나 난리 때 임금이 머물도록 지은 궁이에요. 1636년 병자호란 때 인조가 이곳에서 47일 동안 버텼어요. 하궐(외행전)과 상궐(내행전), 정문 한남루가 있어요.');
 sp(SX+6,SZ+8,3,'수어장대','성의 서쪽 가장 높은 곳에 세운 지휘소예요. 장수가 여기서 깃발과 북으로 성 안 군사들에게 명령을 내렸어요.');
 sp(SX+11,SZ+12,1.8,'오방기 신호 자리','방향에 맞는 색 깃발을 올려 군사들에게 신호를 보내 봐요.');
 sp(30,40,2.4,'발굴 탐지 자리','산성 안 땅속에 옛 군사와 사람들의 물건이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 오방기 신호(11/21): 「○쪽에 적이 보여요!」 하면 그 방향 색 깃발 앞에 서기. 열 번, 90초 */
 window.__NHFLAG=()=>{if(document.getElementById('nhP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(SX+12,SZ,SY);H3.face(-Math.PI/2)}catch(e){}
  const seq=[];for(let i=0;i<10;i++){let k;do{k=(Math.random()*5)|0}while(seq.length&&seq[seq.length-1]===k);seq.push(k)}let qi=0,miss=0,done=false,t0=performance.now()/1000,last=null,raise={};const TL=90;
  const g=new THREE.Group();G.add(g);for(const f of FLAG){f.ring=new THREE.Mesh(new THREE.RingGeometry(.6,.8,22),new THREE.MeshBasicMaterial({color:0xffd060,transparent:true,opacity:.35,depthWrite:false,side:THREE.DoubleSide}));f.ring.rotation.x=-Math.PI/2;f.ring.position.set(f.sx,H(f.sx,f.sz)+.05,f.sz);g.add(f.ring)}
  const d=document.createElement('div');d.id='nhP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1e2228;border:3px solid #c8a060;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffd890">🚩 수어장대 오방기 신호</b><div id="nhS" style="font:16px 'Do Hyeon',sans-serif;margin:6px 0"></div><div id="nhC" style="font-size:13px">0 / 10</div><div id="nhT" style="font-size:13px">${TL}초</div><div style="font-size:12px;opacity:.9;line-height:1.5">동=파랑 · 서=하양 · 남=빨강 · 북=검정 · 가운데=노랑<br>그 색 깃발 앞 고리에 서면 깃발이 올라가요</div>`;const Sx=d.querySelector('#nhS'),C=d.querySelector('#nhC'),T=d.querySelector('#nhT');
  const show=()=>{const f=FLAG[seq[qi]];Sx.innerHTML=f.dir==='가운데'?'<span style="color:#ffd890">성 가운데</span>로 모이라고 알려요!':`<span style="color:#ffd890">${f.dir}쪽</span>에 적이 보여요!`;C.textContent=qi+' / 10'};show();
  const drum=()=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='sine';o.frequency.setValueAtTime(90,s);o.frequency.exponentialRampToValueAtTime(50,s+.3);gg.gain.setValueAtTime(.18,s);gg.gain.exponentialRampToValueAtTime(.0001,s+.45);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+.5)}catch(e){}};
  const fin=()=>{if(done)return;done=true;G.remove(g);const el=performance.now()/1000-t0;const Q=qi>=10?Math.max(60,Math.round(100-Math.max(0,el-45)*.6-miss*6)):Math.round(qi/10*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('namhan_flag',Q,'남한산성 오방기 신호')}catch(e){}window.__NHQ=Q;
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffd890">${qi>=10?'신호를 다 보냈어요!':qi+'번 신호를 보냈어요'}</b><div style="font-size:13px;margin:4px 0">조선 군대는 다섯 방향을 다섯 색으로 나타낸 오방기로 명령을 전했어요. 수어장대처럼 높은 곳에서 깃발과 북소리로 넓은 성 안 군사들을 움직였어요.</div><div style="font-size:26px;color:#c8a060">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a060;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__NHFLAG(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},700)};
  const loop=()=>{if(!d.isConnected){G.remove(g);for(const f of FLAG)f.cl.position.y=1.6;return}const now=performance.now()/1000;const P=H3.P;
   if(!done){let hit=null;for(let i=0;i<FLAG.length;i++){const f=FLAG[i];if(Math.hypot(P.x-f.sx,P.z-f.sz)<.9)hit=i}
    if(hit!==null&&hit!==last){raise[hit]=now;drum();if(hit===seq[qi]){qi++;try{ctx.say(FLAG[hit].cn+' 깃발!',1)}catch(e){}if(qi>=10)fin();else show()}else{miss++;try{ctx.say('그건 '+FLAG[hit].dir+(FLAG[hit].dir==='가운데'?'':'쪽')+' 깃발이에요',1.4)}catch(e){}}}
    last=hit;const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin()}
   for(let i=0;i<FLAG.length;i++){const a=raise[i]!=null?now-raise[i]:9;FLAG[i].cl.position.y=1.6+(a<1.2?Math.sin(a/1.2*Math.PI)*1.2:0);FLAG[i].cl.rotation.y=Math.sin(now*3+i)*.25}
   requestAnimationFrame(loop)};loop();
  window.__NHG={FLAG,get seq(){return seq},get qi(){return qi},get miss(){return miss}};try{ctx.say('수어장대에서 깃발로 신호를 보내요! 방향과 색을 맞춰요.',2.6)}catch(e){}};
 /* 발굴 탐지 */
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'대형 기와',h:'남한산성 행궁 터에서는 길이 60cm 가까운 아주 큰 통일신라 기와가 나왔어요. 이곳이 신라 때도 큰 성(주장성)이었다는 증거예요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.26,.26,.6,12,1,true,0,Math.PI),M(0x5a5a58,{side:THREE.DoubleSide}));m.rotation.z=Math.PI/2;g.add(m)})},
  {n:'쇠 화살촉',h:'성을 지키던 군사들의 화살촉이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.ConeGeometry(.04,.22,4),M(0x3a3a3e,{metalness:.6}));m.rotation.z=Math.PI/2;g.add(m)})},
  {n:'상평통보',h:'조선 후기 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})},
  {n:'백자 사발',h:'성 안 사람들이 쓰던 그릇 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.18,14,8,0,Math.PI*2,Math.PI/2,Math.PI/2),M(0xf0ece0,{side:THREE.DoubleSide})))})},
  {n:'쇠 포탄',h:'성 위 대포에 쓰던 둥근 쇠 탄환이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.12,12,10),M(0x3a3a3a,{metalness:.6})))})}];
 window.__NHDIG=()=>{window.__DETECT&&window.__DETECT({key:'namhan_dig',title:'남한산성 발굴 탐지',emoji:'⛏️',bg:'#22261e',count:4,TL:150,cand:[[30,40],[-34,30],[40,-10],[-40,-20],[20,60],[-20,60],[50,30],[-50,10]],items:ITEMS,intro:'산성 안 땅속에 옛 군사와 사람들의 물건이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'남한산성은 신라 때부터 조선까지 오래 쓴 성이라 여러 시대 유물이 함께 나와요.'})};
 const meta={quest:{t:'남한산성 둘러보기',d:'산성과 행궁, 수어장대를 둘러보세요.',steps:[['지화문','남한산성 남문 지화문'],['행궁','남한산성 행궁'],['수어장대','수어장대']]},
  title:'광주 남한산성',hint:'산 능선을 두른 남한산성과 행궁, 수어장대를 공개 수치로 간추려 지었어요. 수어장대에서 오방기로 신호를 보내 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:true,sign:{x:8,z:RW-14,lines:['광주 남한산성','세계유산(2014)','행궁 · 지화문 · 수어장대','간추려 지음']}},
  npc:[['science',[[-6,RW-20],[6,RW-20],[6,RW-12],[-6,RW-12]]]],bounds:[-RW-30,RW+30,-RW-30,RW+40],level:()=>'남한산성',camCap:()=>Infinity,baseAt:(x,z)=>H(x,z),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#6f8c40';g.fillRect(0,0,300,300);g.strokeStyle='#8a8478';g.lineWidth=4;g.beginPath();g.arc(X(0),Z(0),RW*S,0,7);g.stroke();g.fillStyle='#c8b894';g.fillRect(X(-26),Z(24),52*S,56*S);g.fillStyle='#9a3a26';g.fillRect(X(SX-4),Z(SZ+5.5),8*S,11*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:RW+22,yaw:Math.PI},size:{}},meta)}
