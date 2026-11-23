/* 해남 미황사 마당(2026-11-23, 2단계 다섯째 묶음): 달마산 미황사(749년 세웠다고 전함). 땅끝 가까운 절로, 뒤로 달마산 바위 능선이 병풍처럼 섬.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   일주문 → 자하루 → 높은 석축 위 대웅보전(보물, 단청이 바래 나뭇결이 드러남, 주춧돌에 게·거북 같은 바다 생물을 새김) / 응진당(보물) / 부도밭(승탑에도 게·거북·물고기를 새김).
   돌배가 경전과 불상을 싣고 와 소에 싣고 가다 소가 누운 자리에 절을 지었다는 이름 이야기는 전해 오는 이야기.
   놀이: 승탑 옥개석 옮기기(부도밭 받침 셋 사이에서 옥개석을 한 번에 하나씩, 큰 돌을 작은 돌 위에 올리지 않고 다른 받침으로 모두 옮기기, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {curvedRoof,buildHall} from './hallkit.js';
import {lumpyHill} from './treekit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildMihwang(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(749);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7a9a48,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 달마산 바위 능선 */for(let i=0;i<16;i++){const k=lumpyHill((4+r()*4)*1.3,(16+r()*16)*.75,0xb4b0a4,((-70+i*9+r()*4)*.13+57)|0);k.position.set(-70+i*9+r()*4,-.5,-80-r()*10);k.rotation.y=r()*3;G.add(k)}for(let i=0;i<6;i++){const c=lumpyHill((24+r()*8)*1.3,16,0x4a6a3a,i+51);c.position.set(-80+i*32,-.5,-90);G.add(c)}
 const ST=M(0xa8a296),ST2=M(0x948e82),WOODB=M(0x8a7458),WALLW=M(0xe6dcc8),ROOF=M(0x4a4a50);
 const roof=(x,y,z,W,D,h)=>{curvedRoof(G,x,(y+h/2)-(h)/2,z,(W*.72)/.72,(D*.72)/.72,(h)*1.05)};
 const plaque=(x,y,z,txt,w=2)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 const hall=(x,z,W,D,PH,base=.6)=>{/* 11/23 품질: 흰 상자 벽+기둥 → hallkit 법당 */const h=buildHall({x,z,W,D,nx:Math.max(1,Math.round(W/3)),nz:Math.max(1,Math.round(D/3.2)),FY:base,PH:PH,roof:'hip',pillar:0x9a3a26,bracket:(W>=8?'dapo':'ik'),front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',mini,solids,light:false,roofScale:.9});G.add(h.group);return base+PH};
 /* 일주문 */{for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.3,.32,4,12),M(0x8a3a2a));c.position.set(s*2,2,42);G.add(c);solids.push({cx:s*2,cz:42,r:.35,y0:0,y1:4})}roof(0,4,42,6,3,1.6);plaque(0,3.5,42.9,'寺黃美山磨達',2.4)}
 sp(0,46,3,'일주문','달마산 미황사로 들어가는 첫 문이에요. 땅끝 가까이 있는 절이라 「땅끝 절」이라고도 해요.');
 /* 자하루(아래로 지나감) */const JZ=22;{const deck=new THREE.Mesh(new THREE.BoxGeometry(12,.25,5),M(0x8a6a4a));deck.position.set(0,2.6,JZ);G.add(deck);for(let i=0;i<=4;i++)for(const j of[-1,1]){const x=-6+i*3;const c=new THREE.Mesh(new THREE.CylinderGeometry(.2,.22,5,10),WOODB);c.position.set(x,2.5,JZ+j*2.5);G.add(c);if(i!==2)solids.push({cx:x,cz:JZ+j*2.5,r:.28,y0:0,y1:5})}roof(0,5,JZ,15,8,2);plaque(0,4.4,JZ+2.6,'樓霞紫',1.6)}
 sp(0,JZ+4,3,'자하루','대웅보전 마당 아래의 누각이에요. 아래로 지나 높은 석축 위 마당으로 올라가요.');
 /* 대웅보전(높은 석축 위) + 바다 생물 주춧돌 */const DZ=-6;{const y=hall(0,DZ,11,7,3.4,1.6);plaque(0,y-.5,DZ+3.55,'殿寶雄大',1.8);for(const[x,k]of[[-3.7,0],[3.7,1],[-1.2,2],[1.2,3]]){const g=new THREE.Group();g.position.set(x,1.62,DZ+3.55);if(k%2===0){const b=new THREE.Mesh(new THREE.SphereGeometry(.16,10,6),M(0x8a8478));b.scale.set(1.3,.35,1);g.add(b);for(const s of[-1,1]){const cl=new THREE.Mesh(new THREE.ConeGeometry(.04,.16,5),M(0x8a8478));cl.rotation.z=s*1.2;cl.position.set(s*.2,.02,.08);g.add(cl)}}else{const sh=new THREE.Mesh(new THREE.SphereGeometry(.17,10,6),M(0x8a8478));sh.scale.set(1,.4,1.3);g.add(sh);const hd=new THREE.Mesh(new THREE.SphereGeometry(.06,8,6),M(0x8a8478));hd.position.set(0,0,.24);g.add(hd)}G.add(g)}}
 sp(0,DZ+7.5,3,'대웅보전','1754년에 다시 지은 법당이에요(보물). 단청이 바래 나뭇결이 그대로 드러나 소박하고 아름다워요. 앞 주춧돌에 게와 거북 같은 바다 생물이 새겨져 있어요.');
 hall(16,-14,7,4.4,2.6,.8);sp(16,-9,2.6,'응진당','부처님의 제자 나한을 모신 전각이에요(보물). 뒤로 달마산 바위가 가깝게 보여요.');
 /* 부도밭: 승탑 여럿 */const BX=-30,BZ=-18;const stupa=(x,z,s=1)=>{const b=new THREE.Mesh(new THREE.CylinderGeometry(.6*s,.7*s,.4*s,8),ST);b.position.set(x,.2*s,z);G.add(b);const body=new THREE.Mesh(new THREE.SphereGeometry(.5*s,10,8),ST);body.scale.y=1.2;body.position.set(x,.95*s,z);G.add(body);const rf=new THREE.Mesh(new THREE.ConeGeometry(.75*s,.4*s,8),ST2);rf.position.set(x,1.7*s,z);G.add(rf);const tp=new THREE.Mesh(new THREE.SphereGeometry(.15*s,8,6),ST);tp.position.set(x,2*s,z);G.add(tp);solids.push({cx:x,cz:z,r:.7*s,y0:0,y1:2.2*s})};
 for(let i=0;i<9;i++)stupa(BX-6+(i%5)*3,BZ-3-((i/5)|0)*3.4,.8+r()*.4);
 sp(BX,BZ+3,3,'부도밭','스님들의 사리를 모신 승탑이 모여 있어요. 받침돌에 게·거북·물고기 같은 바다 생물을 새긴 것이 많아 바닷가 절다워요.');
 /* 승탑 옥개석 옮기기(11/23) */const HX=BX+2,HZ=BZ+9;const hg=new THREE.Group();hg.position.set(HX,0,HZ);hg.visible=false;G.add(hg);
 window.__MHHANOI=()=>{if(document.getElementById('mhP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(HX,HZ+9,0)}catch(e){}hg.visible=true;
  let rd=0,N=3,pegs=[[],[],[]],sel=-1,moves=0,mist=0,done=false,auto=false,last=performance.now(),t0=0,wait=0,discs=[],plan=[];const res=[];const PX=[-1.45,0,1.45];const DH=.22;
  const camA=()=>{const k=innerWidth<innerHeight?1.8:1;return[HX,2.4,HZ+3.6*(innerWidth<innerHeight?2.3:1),HX,1,HZ,50]};window.__GCAM=()=>document.getElementById('mhP')?camA():null;
  const snd=(f,len=.1,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const clr=()=>{while(hg.children.length)hg.remove(hg.children[0]);discs=[]};
  const hanoi=(n,a,b,c,out)=>{if(n===0)return;hanoi(n-1,a,c,b,out);out.push([a,c]);hanoi(n-1,b,a,c,out)};
  const place=()=>{pegs.forEach((p,i)=>p.forEach((dk,j)=>{discs[dk].position.set(PX[i],.5+j*DH+DH/2,0)}));if(sel>=0&&pegs[sel].length){const dk=pegs[sel][pegs[sel].length-1];discs[dk].position.y+=.45}};
  const newRound=()=>{clr();N=[3,4,5][rd];pegs=[[...Array(N).keys()].reverse(),[],[]];moves=0;mist=0;sel=-1;plan=[];hanoi(N,0,1,2,plan);
   for(let i=0;i<3;i++){const b=new THREE.Mesh(new THREE.CylinderGeometry(.55,.62,.5,8),ST);b.position.set(PX[i],.25,0);b.userData.peg=i;hg.add(b);const lbl=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,1.4,6),M(0x6a5038));lbl.position.set(PX[i],1.1,0);lbl.userData.peg=i;hg.add(lbl);const hit=new THREE.Mesh(new THREE.CylinderGeometry(.75,.75,2.6,8),new THREE.MeshBasicMaterial({visible:false}));hit.position.set(PX[i],1.3,0);hit.userData.peg=i;hg.add(hit)}
   const goal=new THREE.Mesh(new THREE.RingGeometry(.72,.86,24),new THREE.MeshBasicMaterial({color:0x8ad08a,side:THREE.DoubleSide}));goal.rotation.x=-Math.PI/2;goal.position.set(PX[2],.02,0);hg.add(goal);
   for(let k=0;k<N;k++){const rr=.22+k*.1;const m=new THREE.Mesh(new THREE.CylinderGeometry(rr*.85,rr,DH*.9,8),M([0xd8b878,0xc89858,0xb87848,0xa86040,0x8a4a30][k]));m.userData.disc=k;hg.add(m);discs.push(m)}place();t0=performance.now()/1000;ui()};
  const d=document.createElement('div');d.id='mhP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2418;border:3px solid #a8a296;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#e8e0c8">🪨 승탑 옥개석 옮기기 ${rd+1}/3</b><div style="font-size:12px;margin:4px 0;line-height:1.5">왼쪽 받침의 옥개석 ${N}개를 초록 테두리 받침으로 모두 옮겨요. 받침을 눌러 맨 위 돌을 들고, 다른 받침을 눌러 내려놓아요. 큰 돌을 작은 돌 위에 올리면 안 돼요!</div><div style="font:15px 'Do Hyeon',sans-serif">옮긴 횟수 ${moves} (가장 적게 ${plan.length}번)</div><div style="font-size:13px;color:#e8e0c8;min-height:18px">${msg}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:1px solid #f4ecd8;border-radius:8px;padding:2px 8px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const tap=i=>{if(done||wait>0)return;if(sel<0){if(!pegs[i].length){ui('빈 받침이에요');return}sel=i;snd(480,.06);place();return}if(i===sel){sel=-1;place();return}const top=pegs[sel][pegs[sel].length-1];const dst=pegs[i][pegs[i].length-1];if(dst!=null&&dst<top){mist++;snd(180,.25,'sawtooth');ui('큰 돌을 작은 돌 위에 올릴 수 없어요');return}pegs[sel].pop();pegs[i].push(top);sel=-1;moves++;snd(320+top*40,.12);place();if(pegs[2].length===N){wait=1.3;snd(700,.4,'sine');ui('옥개석을 모두 옮겼어요!')}else ui()};
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,200);const rc=new THREE.Raycaster();const ov=document.createElement('div');ov.id='mhO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  ov.onpointerdown=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const objs=[];hg.traverse(o=>{if(o.isMesh&&o.userData.peg!=null)objs.push(o)});const h=rc.intersectObjects(objs,false)[0];if(h)tap(h.object.userData.peg)};
  const cleanup=()=>{ov.remove();clr();hg.visible=false};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3);const s2=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('mihwang_hanoi',Q,'승탑 옥개석 옮기기')}catch(e){}window.__MHQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#e8e0c8">옥개석을 다 옮겼어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">승탑은 스님의 사리를 모신 돌탑으로, 지붕돌(옥개석)·몸돌·받침돌을 차례로 쌓아 만들어요. 미황사 부도밭 승탑에는 바닷가 절답게 게와 거북, 물고기가 새겨져 있어요(놀이의 옮기기 규칙은 간추린 것).</div><div style="font-size:24px;color:#a8a296">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#a8a296;color:#2a2418;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__MHHANOI()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  let at=0,pi=0;const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(auto&&wait<=0){at+=dt;if(at>.12){at=0;if(moves<plan.length){const[a,c]=plan[moves];if(sel<0)tap(a);else tap(c)}}}
   if(wait>0){wait-=dt;if(wait<=0){const el=performance.now()/1000-t0;res.push(Math.max(30,Math.round(100-Math.max(0,moves-plan.length)*2-mist*5-Math.max(0,el-20-rd*25)*.3)));rd++;if(rd>=3){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);window.__MHG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},tap,get moves(){return moves},scr:i=>{setPC();const v=new THREE.Vector3(HX+PX[i],1,HZ).project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]},get pegs(){return pegs.map(p=>p.length)}};try{ctx.say('옥개석을 하나씩 옮겨 봐요. 큰 돌은 작은 돌 위에 못 올려요!',2.6)}catch(e){}};
 spots.push({x:HX,y:0,z:HZ+3,r:2.6,t:'옥개석 옮기는 자리',h:'승탑 옥개석을 다른 받침으로 옮겨 봐요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,45],[0,2.2,JZ],[0,3,DZ+6],[16,3,-9],[BX,2.4,BZ+3]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'조개껍데기',h:'바닷가 절 둘레 흙에서 나온 조개껍데기예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.06,10,6,0,Math.PI*2,0,Math.PI/2),M(0xe8dcc8)))})},
  {n:'기와 조각',h:'절 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'청동 풍경',h:'처마 끝에서 울리던 작은 종이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.03,.05,.09,10),M(0x5a7a62,{metalness:.5})))})},
  {n:'백자 발우 조각',h:'스님의 밥그릇(발우) 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.08,.06,14,1,true,0,2.4),M(0xf0ece0,{side:THREE.DoubleSide})))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(10,44,2.4,'발굴 탐지 자리','절 들머리 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__MHDIG=()=>{window.__DETECT&&window.__DETECT({key:'mihwang_dig',title:'미황사 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[-10,44],[12,32],[-12,28],[14,14],[-14,10],[-22,-2],[26,-4],[30,-22],[-42,-6],[8,-24]],items:DIG,intro:'미황사 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'미황사는 땅끝 가까운 달마산의 절로, 바다 생물을 새긴 주춧돌과 승탑으로 이름나요.'})};
 const meta={quest:{t:'미황사 둘러보기',d:'일주문·자하루를 지나 대웅보전과 응진당, 부도밭까지 둘러보세요.',steps:[['일주문','일주문'],['자하루','자하루'],['대웅보전','대웅보전'],['응진당','응진당'],['부도밭','부도밭']]},
  title:'해남 미황사',hint:'달마산 미황사를 공개 사진으로 간추려 지었어요(배치·크기 어림). 부도밭 옆에서 승탑 옥개석을 다른 받침으로 옮겨 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:50,lines:['해남 미황사','달마산 · 땅끝 절','대웅보전 · 부도밭','간추려 지음']}},
  npc:[['science',[[-6,48],[6,48],[6,54],[-6,54]]]],bounds:[-50,44,-40,60],level:()=>'해남 미황사',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.2,ox:-6,oz:6,draw(g,X,Z,S){g.fillStyle='#7a9a48';g.fillRect(0,0,300,300);g.fillStyle='#c8c0b0';g.fillRect(X(-8),Z(DZ+5),16*S,10*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:52,yaw:Math.PI},size:{}},meta)}
