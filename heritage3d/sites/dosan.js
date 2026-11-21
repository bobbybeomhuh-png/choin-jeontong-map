/* 안동 도산서원·봉정사 마당(2026-11-21, 안동 덧붙이기 E1): 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   도산서원(사적, 세계유산 「한국의 서원」 2019): 퇴계 이황이 지은 도산서당(1561)과 제자들이 세운 서원(1574). 전교당·동재·서재·광명실(책 두던 곳)·상덕사. 낙동강 건너 시사단은 정조가 1792년 퇴계를 기려 이곳에서 과거(도산별과)를 연 자리.
   봉정사(세계유산 「산사, 한국의 산지승원」 2018): 극락전은 지금 남아 있는 우리나라에서 가장 오래된 나무 건물(고려, 1363년 이전, 국보). 맞배지붕·주심포·배흘림기둥.
   놀이: 광명실 책 정리(경·사·자·집 네 갈래로 나누기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {stonePagoda} from './stonekit.js';
export function buildDosan(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(5381);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 북쪽(z<-10) 서원 뒤 산비탈 계단, 남쪽(z>46) 낙동강, 서쪽(x<-50) 봉정사 언덕 */
 const RZ=46;const ss=t=>t<=0?0:t>=1?1:t*t*(3-2*t);
 const terr=(x,z)=>{let h=0;if(x>-40){if(z<-4)h=z<-22?3.6:z<-12?2.4:1.2}else{h=6*ss((-40-x)/16)}return h};
 const H=(x,z)=>z>RZ?-2:terr(x,z);
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(240,220,240,220);g.rotateX(-Math.PI/2);g.translate(-10,0,0);const p=g.attributes.position;const col=[];const c=new THREE.Color();
  for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);p.setY(k,z>RZ+2?-3:terr(x,z));c.set(z>RZ-1?'#d0c098':x<-40?'#5f8a3a':'#8a9a4a');col.push(c.r,c.g,c.b)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1}));m.receiveShadow=true;G.add(m)}
 /* 돌 축대(계단식 마당) */{const sm=M(0xa89c88,{flatShading:true});for(const[z,y]of[[-4,1.2],[-12,2.4],[-22,3.6]]){const w=new THREE.Mesh(new THREE.BoxGeometry(60,y,.6),sm);w.position.set(10,y/2,z);G.add(w);const st=new THREE.Mesh(new THREE.BoxGeometry(3,y,2.4),M(0xb8ac98));st.position.set(10,y/2-.01,z+1.2);st.scale.y=.999;G.add(st)}}
 /* 낙동강 + 시사단 섬 */const WT=tex(256,256,(q,w,h)=>{q.fillStyle='#4f7f86';q.fillRect(0,0,w,h);for(let i=0;i<200;i++){q.strokeStyle=`rgba(220,240,240,${.08+r()*.12})`;q.lineWidth=1+r()*2;const x=r()*w,y=r()*h;q.beginPath();q.moveTo(x,y);q.lineTo(x+20+r()*20,y);q.stroke()}},[8,4]);WT.wrapS=WT.wrapT=THREE.RepeatWrapping;
 {const rv=new THREE.Mesh(new THREE.PlaneGeometry(400,90),new THREE.MeshStandardMaterial({map:WT,roughness:.12,metalness:.2}));rv.rotation.x=-Math.PI/2;rv.position.set(0,-.6,RZ+45);G.add(rv);solids.push({x0:-200,x1:200,y0:-6,y1:20,z0:RZ+1,z1:RZ+200});
  const isl=new THREE.Mesh(new THREE.CylinderGeometry(7,8.5,3.2,20),M(0x8a9a5a));isl.position.set(14,.9,RZ+26);G.add(isl);const dan=new THREE.Mesh(new THREE.BoxGeometry(4,1.4,4),M(0xb8ac98));dan.position.set(14,3.2,RZ+26);G.add(dan);
  if(!mini){const p=buildHall({x:14,z:RZ+26,ry:Math.PI,W:2.6,D:2.6,nx:1,nz:1,FY:.2,PH:2.2,roof:'hip',name:'試士壇',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',stairs:'none',solids:[],light:false,roofScale:.7});p.group.position.y=3.9;G.add(p.group)}}
 /* 도산서원: 아래 마당 도산서당·농운정사, 가운데 진도문·광명실, 위 전교당·동재·서재, 맨 위 상덕사 */
 if(!mini){const B=(spec,y)=>{const h=buildHall(Object.assign({solids,light:false},spec));h.group.position.y+=y;G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)});return h};
  B({x:-6,z:8,ry:Math.PI,W:7,D:4,nx:3,nz:1,FY:.5,PH:2.6,roof:'gable',name:'陶山書堂',pillar:0x8a6a48,bracket:'ik',front:'open',roofScale:.85},0);
  B({x:22,z:8,ry:Math.PI,W:9,D:5,nx:4,nz:1,FY:.5,PH:2.6,roof:'gable',name:'隴雲精舍',pillar:0x8a6a48,bracket:'ik',roofScale:.85},0);
  B({x:10,z:-8,ry:Math.PI,W:4,D:2.4,nx:3,nz:1,FY:.3,PH:2.6,roof:'gable',name:'進道門',pillar:0x8a5a38,bracket:'ik',front:'open',back:'open',stairs:'none',roofScale:.8},1.2);
  B({x:-2,z:-8,ry:Math.PI/2,W:3.6,D:3,nx:1,nz:1,FY:1.4,PH:2.4,roof:'gable',name:'光明室',pillar:0x8a6a48,bracket:'ik',front:'open',roofScale:.8},1.2);
  B({x:10,z:-28,ry:Math.PI,W:12,D:6,nx:4,nz:2,FY:.7,PH:3,roof:'gable',name:'典敎堂',pillar:0x8a6a48,bracket:'ik',front:'open',roofScale:.9},3.6);
  B({x:-2,z:-18,ry:Math.PI/2,W:7,D:3.6,nx:3,nz:1,FY:.5,PH:2.4,roof:'gable',name:'東齋',pillar:0x8a6a48,bracket:'ik',roofScale:.8},2.4);
  B({x:22,z:-18,ry:-Math.PI/2,W:7,D:3.6,nx:3,nz:1,FY:.5,PH:2.4,roof:'gable',name:'西齋',pillar:0x8a6a48,bracket:'ik',roofScale:.8},2.4);
  /* 봉정사: 서쪽 언덕 위 극락전(맞배·주심포)과 대웅전(다포·팔작), 삼층석탑 */
  const hy=6;B({x:-74,z:-6,ry:Math.PI/2,W:7.4,D:6,nx:3,nz:2,FY:.9,PH:3.4,roof:'gable',name:'極樂殿',pillar:0x7a5a40,bracket:'jusim',front:'door',roofScale:1},hy);
  B({x:-74,z:-28,ry:Math.PI/2,W:11,D:8,nx:3,nz:2,FY:1,PH:4,roof:'hip',name:'大雄寶殿',pillar:0x9a3a26,bracket:'dapo',front:'door',roofScale:1},hy);
  try{const tp=stonePagoda(3.4);tp.position.set(-64,hy,-6);G.add(tp);solids.push({cx:-64,cz:-6,r:1.4,y0:0,y1:hy+4})}catch(e){}}
 /* 나무 */{const tm=M(0x5a3a28),lm=M(0x3f6a2e);for(let i=0;i<40;i++){const x=-110+r()*200,z=-90+r()*60;if(x>-46&&x<40&&z>-36)continue;if(x<-56&&x>-92&&z>-36&&z<6)continue;const y=terr(x,z);const t=new THREE.Mesh(new THREE.CylinderGeometry(.22,.32,5,6),tm);t.position.set(x,y+2.5,z);G.add(t);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(2.4,0),lm);c.position.set(x,y+5.4,z);c.scale.y=.8;G.add(c)}}
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[10,5,-22],[-6,2,12],[-74,8,0],[14,5,RZ+22]]){const L=new THREE.PointLight(0xffc080,0,20,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7;WT.offset.x+=dt*.01};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(10,-21,3.4,'전교당','도산서원에서 유생들이 모여 공부하던 강당이에요. 「도산서원」 현판은 한석봉 글씨로 전해져요. 도산서원은 2019년 「한국의 서원」으로 세계유산이 됐어요. 간추려 지었어요.');
 sp(-6,13,3,'도산서당','퇴계 이황이 1561년 손수 지어 제자를 가르친 작은 집이에요. 방 하나, 마루 하나, 부엌 하나뿐인 검소한 집이에요.');
 sp(-6,-6,2,'광명실 책 정리','광명실은 서원의 책을 두던 곳이에요. 흩어진 책을 경·사·자·집 네 갈래로 정리해 봐요.');
 sp(14,RZ-2,3,'시사단','강 건너 섬의 비각이에요. 정조가 1792년 퇴계를 기려 이곳에서 과거(도산별과)를 열어, 7천 명 넘는 선비가 모였다고 해요.');
 sp(-66,-2,3.4,'봉정사 극락전','지금 남아 있는 우리나라에서 가장 오래된 나무 건물이에요(국보). 1972년 고칠 때 1363년에 지붕을 고쳤다는 글이 나와, 그보다 앞서 지은 것으로 봐요. 맞배지붕·주심포·배흘림기둥. 간추려 지었어요.');
 sp(-66,-24,3,'봉정사 대웅전','조선 초에 지은 다포 건물(국보)이에요. 봉정사는 2018년 「산사, 한국의 산지승원」으로 세계유산이 됐어요.');
 sp(30,20,2.4,'발굴 탐지 자리','서원 마당 땅속에 옛 선비들의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 광명실 책 정리(11/21): 책 이름을 보고 경(경전)·사(역사)·자(사상·기술)·집(문집) 칸에 넣기. 16권, 70초 */
 const BOOKS=[['논어','경'],['맹자','경'],['대학','경'],['중용','경'],['시경','경'],['주역','경'],['사기','사'],['삼국사기','사'],['고려사','사'],['동국통감','사'],['자치통감','사'],['노자','자'],['장자','자'],['한비자','자'],['동의보감','자'],['농사직설','자'],['퇴계집','집'],['율곡전서','집'],['두시언해','집'],['동문선','집'],['연암집','집']];
 const CAT={'경':'경(經) 성현의 가르침','사':'사(史) 역사','자':'자(子) 사상·의학·농사','집':'집(集) 시문집'};
 window.__DSBOOK=()=>{if(document.getElementById('dsP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(-6,-5,0);H3.face(Math.PI)}catch(e){}
  const deck=BOOKS.slice().sort(()=>Math.random()-.5).slice(0,16);let i=0,ok=0,bad=0,done=false,t0=performance.now()/1000;const N=deck.length,TL=70;
  const d=document.createElement('div');d.id='dsP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2218;border:3px solid #c8a868;border-radius:16px;padding:12px 14px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:252px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d890">📚 광명실 책 정리</b><div id="dsS" style="font-size:13px;margin:2px 0">0 / ${N}권</div><div id="dsB" style="font:26px 'Do Hyeon',sans-serif;margin:6px 0;padding:10px 0;background:#f0e4c4;color:#3a2a18;border-radius:8px;border-left:10px solid #3a5a8a"></div><div id="dsG" style="font-size:12px;color:#f0d890;min-height:16px;margin-bottom:6px">어느 칸에 꽂을까요?</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">${['경','사','자','집'].map(k=>`<button data-k="${k}" style="font:14px 'Do Hyeon',sans-serif;background:#c8a868;color:#2a2218;border:0;border-radius:10px;padding:9px 2px;cursor:pointer">${CAT[k]}</button>`).join('')}</div><div id="dsT" style="font-size:13px;margin-top:6px">${TL}초</div>`;
  const Sx=d.querySelector('#dsS'),Bk=d.querySelector('#dsB'),Gd=d.querySelector('#dsG'),T=d.querySelector('#dsT');const show=()=>{Bk.textContent='《'+deck[i][0]+'》'};show();
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const put=k=>{if(done)return;const[b,c]=deck[i];if(k===c){ok++;snd(780,.12);Gd.textContent='맞아요! 《'+b+'》는 '+CAT[c].split(' ')[0]+' 칸'}else{bad++;snd(200,.25,'sawtooth');Gd.textContent='《'+b+'》는 '+CAT[c]+' 칸이에요'}i++;Sx.textContent=i+' / '+N+'권';if(i>=N)fin();else show()};
  d.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>put(b.dataset.k));
  const fin=()=>{if(done)return;done=true;const el=performance.now()/1000-t0;const Q=Math.max(0,Math.round(ok/N*100-Math.max(0,el-40)*.5));const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('dosan_book',Q,'도산서원 책 정리')}catch(e){}window.__DSQ=Q;
   d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#f0d890">${N}권 가운데 ${ok}권을 제자리에!</b><div style="font-size:13px;margin:4px 0">옛 책은 경(경전)·사(역사)·자(사상·의학·농사 같은 여러 학문)·집(시문집) 네 갈래로 나눠 두었어요. 도산서원 광명실에는 퇴계가 읽던 책과 서원에서 펴낸 책 수천 권이 있었어요.</div><div style="font-size:26px;color:#c8a868">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a868;color:#2a2218;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__DSBOOK()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const loop=()=>{if(!d.isConnected)return;if(!done){const left=Math.max(0,TL-(performance.now()/1000-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin()}requestAnimationFrame(loop)};loop();
  window.__DSG={put,cur:()=>deck[i],get ok(){return ok}};try{ctx.say('흩어진 책을 제자리에 꽂아요!',2.2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'벼루',h:'유생들이 먹을 갈던 벼루예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.04,.13),M(0x2a2a2e)))})},
  {n:'백자 연적',h:'벼루에 물을 따르던 작은 백자 그릇이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.08,12,8),M(0xf0ece0,{roughness:.3})))})},
  {n:'책판 조각',h:'서원에서 책을 찍던 나무 판 조각이에요. 도산서원에는 퇴계 문집 책판이 전해요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.26,.03,.16),M(0x6a4a2a)))})},
  {n:'막새 기와',h:'서원 지붕 끝을 막던 기와예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18),M(0x5a5a5a)))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__DSDIG=()=>{window.__DETECT&&window.__DETECT({key:'dosan_dig',title:'도산서원 발굴 탐지',emoji:'⛏️',bg:'#2a2218',count:4,TL:150,cand:[[30,20],[-20,24],[40,-6],[-30,10],[36,34],[-16,36],[4,30],[-44,24]],items:ITEMS,intro:'서원 마당 땅속에 옛 선비들의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'서원은 선비들이 함께 공부하고 앞선 학자를 기리던 곳이에요.'})};
 const meta={quest:{t:'안동 서원과 산사 둘러보기',d:'도산서원과 봉정사를 둘러보세요.',steps:[['서당','도산서당'],['전교당','전교당'],['시사단','시사단'],['극락전','봉정사 극락전']]},
  title:'안동 도산서원·봉정사',hint:'세계유산 도산서원과 봉정사 극락전(가장 오래된 나무 건물)을 간추려 지었어요. 광명실의 책을 정리해 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,groundY:-3.5,sign:{x:30,z:28,lines:['안동 도산서원·봉정사','세계유산 서원·산사','가장 오래된 나무 건물','간추려 지음']}},
  npc:[['science',[[24,24],[34,24],[34,32],[24,32]]]],bounds:[-110,100,-90,RZ],level:()=>'안동',camCap:()=>Infinity,baseAt:(x,z)=>Math.max(0,H(x,z)),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.1,ox:-10,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#5f8a3a';g.fillRect(0,0,X(-40),300);g.fillStyle='#4f7f86';g.fillRect(0,Z(RZ),300,300);g.fillStyle='#8a6a48';for(const[x,z,w,d]of[[10,-28,12,6],[-6,8,7,4],[22,8,9,5],[-74,-6,6,7.4],[-74,-28,8,11]])g.fillRect(X(x-w/2),Z(z-d/2),w*S,d*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:30,z:30,yaw:-Math.PI*.75},size:{}},meta)}
