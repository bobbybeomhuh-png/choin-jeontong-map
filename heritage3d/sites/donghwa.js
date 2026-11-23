/* 대구 동화사 마당(2026-11-23, 2단계 여섯째 묶음): 팔공산 동화사. 832년 심지왕사가 다시 지을 때 한겨울에 오동나무 꽃이 피어 「동화(桐華)」라 했다는 이야기가 전해 옴(전해 오는 이야기).
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   봉황문 → 길가 바위 마애여래좌상(보물, 구름 위에 앉은 부처와 둥근 광배) → 당간지주(보물) → 봉서루 → 대웅전(보물) / 비로암 삼층석탑(보물) / 오동나무.
   놀이: 광배 무늬 맞추기(둥근 광배의 고리를 돌려 불꽃·연꽃 무늬를 제자리로. 고리 하나를 돌리면 바로 바깥 고리도 함께 돌아가요, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {curvedRoof,buildHall} from './hallkit.js';
import {lumpyHill} from './treekit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildDonghwa(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(832);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7a9a48,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 for(let i=0;i<7;i++){const c=lumpyHill((28+r()*10)*1.3,(36+r()*12)*.75,0x4a6a3a,((-96+i*32)*.13+57)|0);c.position.set(-96+i*32,-.5,-112-r()*10);G.add(c)}
 const ST=M(0xa8a296),ST2=M(0x948e82),WOOD=M(0x8a3a2a),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50),ROCK=M(0x9a9488,{flatShading:true});
 const roof=(x,y,z,W,D,h)=>{curvedRoof(G,x,(y+h/2)-(h)/2,z,(W*.72)/.72,(D*.72)/.72,(h)*1.05)};
 const plaque=(x,y,z,txt,w=2)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 const hall=(x,z,W,D,PH,base=.6)=>{/* 11/23 품질: 흰 상자 벽+기둥 → hallkit 법당 */const h=buildHall({x,z,W,D,nx:Math.max(1,Math.round(W/3)),nz:Math.max(1,Math.round(D/3.2)),FY:base,PH:PH,roof:'hip',pillar:0x9a3a26,bracket:(W>=8?'dapo':'ik'),front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',mini,solids,light:false,roofScale:.9});G.add(h.group);return base+PH};
 /* 광배 무늬 그림(마애불·놀이 같이 씀) */const haloTex=tex(512,512,(q,w,h)=>{const cx=w/2,cy=h/2;q.fillStyle='#b8a888';q.fillRect(0,0,w,h);const rings=[[60,'#9a8a6a'],[120,'#c8b890'],[180,'#a89878'],[240,'#c0b088']];for(let i=rings.length-1;i>=0;i--){q.fillStyle=rings[i][1];q.beginPath();q.arc(cx,cy,rings[i][0],0,7);q.fill()}q.strokeStyle='#5a4a30';q.lineWidth=5;
  for(let k=0;k<8;k++){const a=k/8*Math.PI*2;q.beginPath();q.ellipse(cx+Math.cos(a)*32,cy+Math.sin(a)*32,22,9,a,0,7);q.stroke()}
  for(let k=0;k<12;k++){const a=k/12*Math.PI*2;q.beginPath();q.arc(cx+Math.cos(a)*92,cy+Math.sin(a)*92,13,0,7);q.stroke()}
  for(let k=0;k<16;k++){const a=k/16*Math.PI*2;const x=cx+Math.cos(a)*150,y=cy+Math.sin(a)*150;q.beginPath();q.moveTo(x+Math.cos(a)*-20,y+Math.sin(a)*-20);q.quadraticCurveTo(x+Math.cos(a+.6)*20,y+Math.sin(a+.6)*20,x+Math.cos(a)*24,y+Math.sin(a)*24);q.stroke()}
  for(let k=0;k<20;k++){const a=k/20*Math.PI*2;const x=cx+Math.cos(a)*212,y=cy+Math.sin(a)*212;q.beginPath();q.moveTo(x-Math.cos(a)*18,y-Math.sin(a)*18);q.lineTo(x+Math.cos(a+.25)*22,y+Math.sin(a+.25)*22);q.lineTo(x+Math.cos(a)*6,y+Math.sin(a)*6);q.stroke()}
  q.fillStyle='#8a2a2a';for(let i=0;i<4;i++){const rr=[45,90,150,210][i];q.beginPath();q.arc(cx,cy-rr,9,0,7);q.fill()}});
 /* 봉황문 */{for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.BoxGeometry(2.6,3,2.6),WALLW);w.position.set(s*2.8,1.5,46);G.add(w);solids.push({x0:s*2.8-1.3,x1:s*2.8+1.3,y0:0,y1:3,z0:44.7,z1:47.3})}roof(0,3,46,9,5,1.6);plaque(0,2.7,47.35,'門凰鳳',1.4)}
 sp(0,50,3,'봉황문','동화사로 들어가는 문이에요. 절 이름과 함께 봉황 이야기가 얽혀 있어 봉황문이라 해요.');
 /* 마애여래좌상: 길가 바위 벼랑 */{const X=-11,Z=36;const rk=new THREE.Mesh(new THREE.BoxGeometry(5,7,3),ROCK);rk.position.set(X,3.5,Z);G.add(rk);solids.push({x0:X-2.5,x1:X+2.5,y0:0,y1:7,z0:Z-1.5,z1:Z+1.5});const halo=new THREE.Mesh(new THREE.CircleGeometry(1.6,32),new THREE.MeshStandardMaterial({map:haloTex,roughness:1}));halo.position.set(X+2.52,4.4,Z);halo.rotation.y=Math.PI/2;G.add(halo);const bd=new THREE.Mesh(new THREE.SphereGeometry(.9,12,10),M(0x8a8478));bd.scale.set(.3,1.1,.9);bd.position.set(X+2.6,3.6,Z);G.add(bd);const hd=new THREE.Mesh(new THREE.SphereGeometry(.42,12,10),M(0x8a8478));hd.scale.x=.4;hd.position.set(X+2.6,4.6,Z);G.add(hd);for(let k=0;k<3;k++){const cl=new THREE.Mesh(new THREE.TorusGeometry(.3,.08,6,14),M(0x8a8478));cl.position.set(X+2.6,2.4,Z-.6+k*.6);cl.rotation.y=Math.PI/2;G.add(cl)}}
 sp(-6,36,3,'마애여래좌상','길가 바위에 새긴 통일신라 부처님이에요(보물). 구름 위 연꽃 자리에 앉아 있고, 뒤에 둥근 광배가 있어요.');
 /* 당간지주 */{for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.BoxGeometry(.5,3.6,.8),ST);p.position.set(5+s*.45,1.8,28);G.add(p)}solids.push({cx:5,cz:28,r:.8,y0:0,y1:3.6})}sp(5,31.5,2.6,'당간지주','절 앞에 깃발(당)을 단 장대를 세우던 두 돌기둥이에요(보물).');
 /* 봉서루(아래로 지나감) */const BZ=14;{const deck=new THREE.Mesh(new THREE.BoxGeometry(12,.25,5),M(0x8a6a4a));deck.position.set(0,2.6,BZ);G.add(deck);for(let i=0;i<=4;i++)for(const j of[-1,1]){const x=-6+i*3;const c=new THREE.Mesh(new THREE.CylinderGeometry(.2,.22,5,10),WOOD);c.position.set(x,2.5,BZ+j*2.5);G.add(c);if(i!==2)solids.push({cx:x,cz:BZ+j*2.5,r:.28,y0:0,y1:5})}roof(0,5,BZ,15,8,2);plaque(0,4.4,BZ+2.6,'樓棲鳳',1.6);for(let k=0;k<3;k++){const st=new THREE.Mesh(new THREE.SphereGeometry(.35,10,8),ST2);st.position.set(-1+k,.3,BZ+4.5);G.add(st)}}
 sp(0,BZ+4.4,3,'봉서루','봉황이 깃든 누각이라는 뜻이에요. 앞 계단에 봉황의 알을 닮은 둥근 돌 셋과 꼬리 같은 바위가 있어요.');
 {const y=hall(0,-8,12,7,3.4,1.2);plaque(0,y-.5,-8+3.55,'殿雄大',1.8)}sp(0,-2,3.4,'대웅전','조선 후기 다시 지은 법당이에요(보물). 앞 기둥 몇은 휘어진 나무를 그대로 썼어요.');
 {const X=24,Z=-16;let y=0;const st=(w,h)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,w),ST);m.position.set(X,y+h/2,Z);G.add(m);y+=h};st(3,.5);st(2.4,.9);for(let i=0;i<3;i++){st(1.2-i*.15,.7-i*.1);st(2-i*.25,.22)}solids.push({cx:X,cz:Z,r:1.6,y0:0,y1:y})}sp(24,-12,2.6,'비로암 삼층석탑','통일신라 삼층석탑이에요(보물). 863년 민애왕의 명복을 빌려고 세웠다는 기록이 탑 안 사리호에서 나왔어요.');
 {const X=-14,Z=-4;const t=new THREE.Mesh(new THREE.CylinderGeometry(.35,.5,6,8),M(0x6a5a48));t.position.set(X,3,Z);G.add(t);for(let k=0;k<6;k++){const c=new THREE.Mesh(new THREE.SphereGeometry(1.6,8,6),M(0x4a7a3a));c.position.set(X+(r()-.5)*3,6.4+r()*1.4,Z+(r()-.5)*3);G.add(c);const f=new THREE.Mesh(new THREE.SphereGeometry(.3,6,5),M(0xb8a0d8));f.position.set(c.position.x+.8,c.position.y-.6,c.position.z);G.add(f)}solids.push({cx:X,cz:Z,r:.5,y0:0,y1:6})}
 sp(-14,0,2.6,'오동나무','보랏빛 꽃이 피는 오동나무예요. 한겨울에 오동꽃이 피었다는 절 이름 이야기가 전해 와요(전해 오는 이야기).');
 /* 광배 무늬 맞추기(11/23) */const HX=-22,HZ=24;const hg=new THREE.Group();hg.position.set(HX,0,HZ);hg.visible=false;G.add(hg);
 window.__DHHALO=()=>{if(document.getElementById('dhhP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(HX,HZ+9,0)}catch(e){}hg.visible=true;
  const camA=()=>{const k=innerWidth<innerHeight?1.9:1;return[HX,1.9,HZ+3.2*k,HX,1.9,HZ,50]};window.__GCAM=()=>document.getElementById('dhhP')?camA():null;
  const NR=4,STP=8;let rd=0,rot=[0,0,0,0],linked=true,rings=[],moves=0,minM=0,done=false,auto=false,last=performance.now(),t0=0,wait=0,ops=[];const res=[];const R=1.3,RR=[[0,.29],[.29,.55],[.55,.86],[.86,1.12]];
  const snd=(f,len=.08,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const clr=()=>{while(hg.children.length)hg.remove(hg.children[0]);rings=[]};
  /* 고리 k를 한 칸(45°) 돌리면 k+1도 한 칸(연동) — 안쪽부터 차례로 풀면 언제나 풀림 */
  const solve=(rv)=>{const need=[...rv].map(v=>(STP-v)%STP);const o=[0,0,0,0];let carry=0;for(let k=0;k<NR;k++){const t=(need[k]-carry+STP*4)%STP;o[k]=t;carry=linked?t:0}return o};
  const newRound=()=>{clr();linked=rd>0;rot=[0,0,0,0];for(let k=0;k<NR;k++){const n=1+((r()*(STP-1))|0);for(let i=0;i<n;i++){rot[k]=(rot[k]+1)%STP;if(linked&&k+1<NR)rot[k+1]=(rot[k+1]+1)%STP}}if(rd===2){for(let k=0;k<NR;k++)rot[k]=(rot[k]+((r()*STP)|0))%STP}if(rot.every(v=>v===0))rot[0]=3;minM=solve(rot).reduce((a,b)=>a+b,0);moves=0;
   const stone=new THREE.Mesh(new THREE.CylinderGeometry(R+.15,R+.15,.25,40),ROCK);stone.rotation.x=Math.PI/2;stone.position.set(0,1.9,-.15);hg.add(stone);const leg=new THREE.Mesh(new THREE.BoxGeometry(1.2,.8,.5),ST);leg.position.set(0,.4,-.5);hg.add(leg);
   for(let k=0;k<NR;k++){const g=new THREE.Mesh(new THREE.RingGeometry(RR[k][0]*R,RR[k][1]*R,48,1),new THREE.MeshBasicMaterial({map:haloTex}));g.position.set(0,1.9,.0+k*.004);g.userData.k=k;g.rotation.z=rot[k]*Math.PI*2/STP;g.userData.cur=g.rotation.z;hg.add(g);rings.push(g);const geo=g.geometry;const uv=geo.attributes.uv,pos=geo.attributes.position;for(let i=0;i<uv.count;i++){uv.setXY(i,pos.getX(i)/(2*R*1.12)*1.0+.5,pos.getY(i)/(2*R*1.12)+.5)}uv.needsUpdate=true}
   const mark=new THREE.Mesh(new THREE.ConeGeometry(.08,.2,3),new THREE.MeshBasicMaterial({color:0xe04040}));mark.rotation.z=Math.PI;mark.position.set(0,1.9+R+.28,0);hg.add(mark);
   t0=performance.now()/1000;ui()};
  const d=document.createElement('div');d.id='dhhP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2418;border:3px solid #c8b890;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0e0b0">🌕 광배 무늬 맞추기 ${rd+1}/3</b><div style="font-size:12px;margin:4px 0;line-height:1.5">광배 고리를 눌러 한 칸씩 돌려요. 고리마다 있는 빨간 점이 모두 맨 위 빨간 표시 아래 한 줄로 서면 끝!${linked?' 고리 하나를 돌리면 바로 바깥 고리도 같이 돌아가요.':''}</div><div style="font-size:12px">돌린 횟수 ${moves} (가장 적게 ${minM}번)</div><div style="font-size:13px;color:#f0e0b0;min-height:18px">${msg}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:1px solid #f4ecd8;border-radius:8px;padding:2px 8px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const turn=k=>{if(done||wait>0)return;rot[k]=(rot[k]+1)%STP;if(linked&&k+1<NR)rot[k+1]=(rot[k+1]+1)%STP;moves++;snd(380+k*80,.08);if(rot.every(v=>v===0)){wait=1.4;snd(760,.5,'sine');ui('광배 무늬가 제자리에 맞았어요!')}else ui()};
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,100);const rc=new THREE.Raycaster();const ov=document.createElement('div');ov.id='dhhO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  ov.onpointerdown=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(rings,false)[0];if(h)turn(h.object.userData.k)};
  const cleanup=()=>{ov.remove();clr();hg.visible=false};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3);const s2=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('donghwa_halo',Q,'광배 무늬 맞추기')}catch(e){}window.__DHHQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0e0b0">광배가 제 모습을 찾았어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">광배는 부처님 몸에서 나오는 빛을 둥근 띠로 나타낸 거예요. 안쪽 연꽃잎부터 바깥 불꽃 무늬까지 여러 겹으로 새겨요. 동화사 마애여래좌상 뒤에도 둥근 광배가 있어요(놀이의 무늬는 간추린 것).</div><div style="font-size:24px;color:#c8b890">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8b890;color:#2a2418;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__DHHALO()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  let at=0;const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   rings.forEach((g,k)=>{const tg=rot[k]*Math.PI*2/STP;let cur=g.userData.cur;const dd=Math.atan2(Math.sin(tg-cur),Math.cos(tg-cur));cur+=dd*Math.min(1,dt*10);g.userData.cur=cur;g.rotation.z=cur});
   if(auto&&wait<=0){at+=dt;if(at>.15){at=0;const o=solve(rot);const k=o.findIndex(v=>v>0);if(k>=0)turn(k)}}
   if(wait>0){wait-=dt;if(wait<=0){const el=performance.now()/1000-t0;res.push(Math.max(30,Math.round(100-Math.max(0,moves-minM)*3-Math.max(0,el-20-rd*15)*.4)));rd++;if(rd>=3){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);window.__DHHG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},turn,get moves(){return moves},get rot(){return rot.slice()},scr:k=>{setPC();const rr=(RR[k][0]+RR[k][1])/2*R;const v=new THREE.Vector3(HX+rr,1.9,HZ+.01).project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]}};try{ctx.say('광배 고리를 돌려 무늬를 맞춰 봐요!',2.4)}catch(e){}};
 spots.push({x:HX,y:0,z:HZ+3,r:2.6,t:'광배 맞추는 자리',h:'둥근 광배 고리를 돌려 무늬를 제자리로 맞춰 봐요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,49],[-6,3,36],[0,2.2,BZ],[0,3,-2],[24,3,-12],[HX,3,HZ+3]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'기와 조각',h:'절 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'납석 사리호 조각',h:'사리를 담던 돌 항아리의 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.08,.06,.06,12,1,true,0,2.4),M(0x9a9070,{side:THREE.DoubleSide})))})},
  {n:'청동 풍경',h:'처마 끝에서 울리던 작은 종이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.03,.05,.09,10),M(0x5a7a62,{metalness:.5})))})},
  {n:'오동 열매',h:'오동나무 열매예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),M(0x6a5a3a)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(10,48,2.4,'발굴 탐지 자리','절 들머리 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__DHHDIG=()=>{window.__DETECT&&window.__DETECT({key:'donghwa_dig',title:'동화사 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[-8,48],[12,38],[-4,26],[12,20],[-16,10],[14,0],[-24,-16],[30,-4],[6,-24],[-32,8]],items:DIG,intro:'동화사 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'동화사는 팔공산의 큰 절로, 마애여래좌상과 비로암 삼층석탑 같은 통일신라 유산이 남아 있어요.'})};
 const meta={quest:{t:'동화사 둘러보기',d:'봉황문을 지나 마애불·당간지주·봉서루·대웅전과 탑, 오동나무를 둘러보세요.',steps:[['봉황문','봉황문'],['마애불','마애여래좌상'],['당간지주','당간지주'],['봉서루','봉서루'],['대웅전','대웅전'],['오동나무','오동나무'],['삼층석탑','비로암 삼층석탑']]},
  title:'대구 동화사',hint:'팔공산 동화사를 공개 사진으로 간추려 지었어요(배치·크기 어림). 마애불 옆에서 광배 고리를 돌려 무늬를 맞춰 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:54,lines:['대구 동화사','팔공산 · 832 중창','마애불 · 봉서루 · 대웅전','간추려 지음']}},
  npc:[['science',[[-6,52],[6,52],[6,58],[-6,58]]]],bounds:[-46,46,-40,62],level:()=>'대구 동화사',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:8,draw(g,X,Z,S){g.fillStyle='#7a9a48';g.fillRect(0,0,300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:56,yaw:Math.PI},size:{}},meta)}
