/* 강원 고성 왕곡마을 마당(2026-11-23, 2단계 아홉째 묶음): 다섯 봉우리(오봉)에 둘러싸인 분지의 전통 마을(국가민속문화유산). 양근 함씨·강릉 최씨가 모여 살아온 마을.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   추운 북쪽 지방식 'ㄱ자 겹집': 방들이 두 줄로 붙고 부엌에 외양간까지 한 지붕 아래 있어 겨울에도 바깥에 나가지 않고 지냄. 흙과 기와로 쌓고 꼭대기에 항아리를 엎어 얹은 '항아리 굴뚝', 앞마당은 햇볕 들게 트고 뒤쪽만 담.
   놀이: 겹집 방 배치 맞히기(실마리를 보고 한 지붕 아래 방들을 제자리에 놓아요. 실마리는 답이 하나뿐이 되게 컴퓨터가 골라요. 조건 맞춰 놓기, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {lumpyHill} from './treekit.js';
import {curvedRoof} from './hallkit.js';
import {yardMat} from './yardkit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildWanggok(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1400);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7c9a4a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 오봉(다섯 봉우리) *//* 11/23: 뒤쪽 반원에만 울퉁불퉁한 산(전에는 한 봉우리가 들어오는 자리를 덮었음) */for(let i=0;i<5;i++){const a=-Math.PI*.95+i*Math.PI*.225;const h=lumpyHill(24,20+r()*6,0x4a6a3a,i+61);h.position.set(Math.cos(a)*84,-.5,Math.sin(a)*64-20);G.add(h)}
 /* 송지호(동쪽 호수) */{const w=new THREE.Mesh(new THREE.CircleGeometry(16,32),M(0x4a8ab0,{roughness:.2}));w.rotation.x=-Math.PI/2;w.scale.set(1,1.6,1);w.position.set(62,.05,0);G.add(w)}
 /* 마을 앞 실개천 */{const w=new THREE.Mesh(new THREE.PlaneGeometry(110,2.4),M(0x5a8aa8,{roughness:.25}));w.rotation.x=-Math.PI/2;w.position.set(0,.05,30);G.add(w);const br=new THREE.Mesh(new THREE.BoxGeometry(3,.3,3.4),M(0xa8a296));br.position.set(0,.15,30);G.add(br)}
 const ST=M(0xa8a296),WALLW=M(0xe8dcc4),WOOD=M(0x8a7458),ROOFG=M(0x4a4a50),THATCH=M(0xb89a5a,{roughness:1}),CLAY=M(0x9a7a5a),JAR=M(0x4a3020,{roughness:.5});
 /* ㄱ자 겹집 + 항아리 굴뚝 */const house=(x,z,rot,thatch,chim)=>{const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rot;G.add(g);const b=new THREE.Mesh(new THREE.BoxGeometry(11,.5,6.6),ST);b.position.set(0,.25,0);g.add(b);const w=new THREE.Mesh(new THREE.BoxGeometry(10.4,2.6,6),WALLW);w.position.set(0,1.8,0);g.add(w);for(let i=0;i<=4;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.14,.16,2.6,8),WOOD);c.position.set(-5.2+i*2.6,1.8,3.02);g.add(c)}
  const wb=new THREE.Mesh(new THREE.BoxGeometry(3.6,2.4,4),M(0xc8b898));wb.position.set(-3.4,1.7,5);g.add(wb);
  if(thatch){const rf=new THREE.Mesh(new THREE.SphereGeometry(1,14,8,0,Math.PI*2,0,Math.PI/2),THATCH);rf.scale.set(6.6,2,4.2);rf.position.set(0,3.1,0);g.add(rf);const r2=new THREE.Mesh(new THREE.SphereGeometry(1,10,6,0,Math.PI*2,0,Math.PI/2),THATCH);r2.scale.set(2.4,1.4,2.8);r2.position.set(-3.4,2.9,5.4);g.add(r2)}
  else{curvedRoof(g,0,(4.1)-(2.2)/2,0,(9.2)/.72,(6.2)/.72,(2.2)*1.05);curvedRoof(g,-3.4,(3.6)-(1.6)/2,5.4,(3.6)/.72,(4)/.72,(1.6)*1.05)}
  if(chim){const cx=4,cz=4.6;const c=new THREE.Mesh(new THREE.CylinderGeometry(.42,.5,2.6,10),CLAY);c.position.set(cx,1.3,cz);g.add(c);for(let k=0;k<5;k++){const t=new THREE.Mesh(new THREE.TorusGeometry(.46,.05,4,12),M(0x5a5a58));t.rotation.x=Math.PI/2;t.position.set(cx,.4+k*.5,cz);g.add(t)}const jar=new THREE.Mesh(new THREE.SphereGeometry(.42,12,10),JAR);jar.scale.y=1.2;jar.position.set(cx,2.95,cz);jar.rotation.x=Math.PI;g.add(jar)}
  const cs=Math.cos(rot),sn=Math.sin(rot);const tr=(px,pz)=>[x+px*cs+pz*sn,z-px*sn+pz*cs];const pts=[tr(0,0),tr(-3.4,5)];solids.push({cx:pts[0][0],cz:pts[0][1],r:5.4,y0:0,y1:4});solids.push({cx:pts[1][0],cz:pts[1][1],r:2.2,y0:0,y1:3})};
 house(-10,4,0,false,true);house(12,2,0,true,true);house(-14,-16,.2,true,true);house(10,-18,-.1,false,true);house(30,-6,-.4,true,false);
 /* 뒤쪽 돌담 */for(let i=0;i<16;i++){const w=new THREE.Mesh(new THREE.BoxGeometry(4.2,1.4,.7),M(0x8e8a80,{flatShading:true}));w.position.set(-32+i*4.2,.7,-28);G.add(w)}
 sp(-10,10.8,3,'ㄱ자 겹집','방이 앞뒤 두 줄로 붙은 겹집이에요. 부엌 옆에 외양간까지 한 지붕 아래 두어, 눈 많은 겨울에도 집 밖에 나가지 않고 소를 돌봤어요.');
 sp(-6,9.6,2.2,'항아리 굴뚝','흙과 기와를 켜켜이 쌓고 꼭대기에 항아리를 엎어 얹은 굴뚝이에요. 불티가 초가에 옮겨붙지 않게 하고, 연기가 천천히 빠지며 방을 따뜻하게 했대요.');
 sp(12,8.4,2.6,'초가 겹집','볏짚 지붕 겹집이에요. 앞마당은 햇볕이 잘 들게 트고, 뒤쪽에만 담을 쌓았어요.');
 sp(0,-24,2.6,'뒷담','북쪽 찬바람을 막는 뒷담이에요. 왕곡마을 집들은 앞쪽은 담 없이 열어 둬요.');
 sp(52,0,3,'송지호','마을 가까이 있는 호수예요. 겨울이면 고니(백조)가 찾아와요.');
 sp(0,34,3,'오봉 분지','다섯 봉우리에 둘러싸여 바깥에서 잘 보이지 않는 마을이에요. 그래서 전쟁 때에도 큰 피해를 입지 않았다고 전해 와요(전해 오는 이야기).');
 /* 겹집 방 배치 맞히기(11/23) */const PX=-24,PZ=16;const pg=new THREE.Group();pg.position.set(PX,0,PZ);pg.visible=false;G.add(pg);
 const LAY=[[['부엌','안방'],['외양간','사랑방']],[['부엌','안방','웃방'],['외양간','마루','사랑방']],[['외양간','부엌','안방','웃방'],['고방','정주간','마루','사랑방']]];
 const RC={'부엌':0xb86a3a,'안방':0xe0b860,'웃방':0xd8c080,'외양간':0x8a6a3a,'사랑방':0x6a9ac8,'마루':0xc8a878,'고방':0x8a8a7a,'정주간':0xd88a50};
 const labelTex={};const lt=n=>labelTex[n]||(labelTex[n]=tex(256,128,(q,w,h)=>{q.fillStyle='#'+RC[n].toString(16).padStart(6,'0');q.fillRect(0,0,w,h);q.fillStyle='#1a1612';q.font='bold 54px sans-serif';q.textAlign='center';q.textBaseline='middle';q.fillText(n,w/2,h/2+4)},[1,1]));
 window.__WGROOM=()=>{if(document.getElementById('wgrP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX+7,PZ+3,0)}catch(e){}pg.visible=true;
  const BY=.8,CW=.95,CD=.8;const camA=()=>{const k=innerWidth<innerHeight?1.35:1;return[PX,4*k+1.2,PZ+2.8*k+.4,PX,BY,PZ-.1,50]};window.__GCAM=()=>document.getElementById('sssX')?null:document.getElementById('wgrP')?camA():null;
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,100);const rc=new THREE.Raycaster();
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  let rd=0,R=2,C=2,rooms=[],sol=[],cur=[],clues=[],selRoom=null,checks=0,done=false,auto=false,last=performance.now(),wait=0,cellM=[],aT=0,badSet=new Set();const res=[];const NR=3;
  const snd=(f,len=.1,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const rcOf=(pl,n)=>{const i=pl.indexOf(n);return[(i/C)|0,i%C]};
  const truth=(cl,pl)=>{const[t,a,b]=cl;const[ar,ac]=rcOf(pl,a);if(t==='row')return ar===b;if(t==='edge')return b==='L'?ac===0:ac===C-1;const[br,bc]=rcOf(pl,b);if(t==='adj')return Math.abs(ar-br)+Math.abs(ac-bc)===1;if(t==='nadj')return Math.abs(ar-br)+Math.abs(ac-bc)!==1;if(t==='left')return ar===br&&bc===ac+1;if(t==='behind')return ac===bc&&ar===0&&br===1;if(t==='samecol')return ac===bc;return false};
  const txt=cl=>{const[t,a,b]=cl;return t==='row'?`${a}은(는) ${b?'앞줄':'뒷줄'}에 있어요`:t==='edge'?`${a}은(는) 맨 ${b==='L'?'왼쪽':'오른쪽'} 칸이에요`:t==='adj'?`${a}과(와) ${b}은(는) 벽을 맞대요`:t==='nadj'?`${a}과(와) ${b}은(는) 붙어 있지 않아요`:t==='left'?`${a} 바로 오른쪽이 ${b}예요`:t==='behind'?`${a}은(는) ${b} 바로 뒤에 있어요`:`${a}과(와) ${b}은(는) 같은 세로줄이에요`};
  const perms=a=>{if(a.length<=1)return[a.slice()];const out=[];a.forEach((x,i)=>{for(const p of perms(a.slice(0,i).concat(a.slice(i+1))))out.push([x].concat(p))});return out};
  const makeClues=()=>{const all=[];for(const a of rooms){for(const rw of[0,1])all.push(['row',a,rw]);for(const e of['L','R'])all.push(['edge',a,e]);for(const b of rooms){if(a===b)continue;for(const t of['adj','nadj','left','behind','samecol'])all.push([t,a,b])}}const tr=all.filter(cl=>truth(cl,sol));tr.sort(()=>r()-.5);const P=perms(rooms);let cand=P;const out=[];for(const cl of tr){const nc=cand.filter(p=>truth(cl,p));if(nc.length<cand.length){out.push(cl);cand=nc}if(cand.length===1)break}
   for(let i=out.length-1;i>=0;i--){const tryc=out.slice(0,i).concat(out.slice(i+1));if(P.filter(p=>tryc.every(c=>truth(c,p))).length===1)out.splice(i,1)}return out};
  const clr=()=>{while(pg.children.length)pg.remove(pg.children[0]);cellM=[]};
  const draw=()=>{cellM.forEach(m=>{const n=cur[m.userData.i];m.material=n?new THREE.MeshStandardMaterial({map:lt(n),roughness:.8}):yardMat();m.position.y=BY+(n?.06:.02)})};
  const newRound=()=>{clr();const L=LAY[rd];R=L.length;C=L[0].length;sol=L.flat();rooms=sol.slice().sort(()=>r()-.5);cur=new Array(R*C).fill(null);clues=makeClues();selRoom=null;checks=0;badSet=new Set();
   const tb=new THREE.Mesh(new THREE.BoxGeometry(C*CW+.6,.1,R*CD+.6),M(0x6a4a2a));tb.position.y=BY-.06;pg.add(tb);const rf=new THREE.Mesh(new THREE.BoxGeometry(C*CW+.8,.06,.2),ROOFG);rf.position.set(0,BY+.4,-R*CD/2-.25);pg.add(rf);
   for(let i=0;i<R*C;i++){const rr=(i/C)|0,c=i%C;const m=new THREE.Mesh(new THREE.BoxGeometry(CW*.94,.08,CD*.92),yardMat());m.position.set((c-(C-1)/2)*CW,BY+.02,(rr-(R-1)/2)*CD);m.userData.i=i;pg.add(m);cellM.push(m)}
   const fr=new THREE.Mesh(new THREE.PlaneGeometry(C*CW+.4,.3),new THREE.MeshBasicMaterial({map:tex(256,64,(q,w,h)=>{q.fillStyle='#e8dcc0';q.fillRect(0,0,w,h);q.fillStyle='#2a2622';q.font='bold 26px sans-serif';q.textAlign='center';q.fillText('위쪽=뒷줄 · 아래쪽=앞줄(마당)',w/2,42)},[1,1])}));fr.rotation.x=-Math.PI/2;fr.position.set(0,BY+.01,R*CD/2+.2);pg.add(fr);
   draw();ui()};
  const place=i=>{if(done||wait>0)return;if(selRoom){const prev=cur.indexOf(selRoom);if(prev>=0)cur[prev]=null;const old=cur[i];cur[i]=selRoom;if(old&&prev>=0)cur[prev]=old;selRoom=null;snd(520,.06)}else if(cur[i]){selRoom=cur[i];cur[i]=null;snd(440,.05)}draw();ui()};
  const check=()=>{if(done||wait>0)return;if(cur.some(x=>!x)){ui('방을 모두 놓아 주세요');return}checks++;const bad=clues.map((c,k)=>truth(c,cur)?-1:k).filter(k=>k>=0);badSet=new Set(bad);if(!bad.length){const sc=Math.max(30,100-(checks-1)*20);res.push(sc);wait=2;snd(760,.5,'sine');ui(`겹집을 다 맞혔어요! ${sc}점`)}else{snd(220,.2,'sawtooth');ui(`실마리 ${bad.length}개가 안 맞아요(빨간 줄)`)}};
  const ov=document.createElement('div');ov.id='wgrO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  ov.onpointerdown=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(cellM,false)[0];if(h)place(h.object.userData.i)};
  const d=document.createElement('div');d.id='wgrP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2620;border:3px solid #c8a060;border-radius:16px;padding:10px 14px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f6f0e4;box-shadow:0 6px 18px rgba(0,0,0,.35);width:250px;max-height:70vh;overflow:auto;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;const left=rooms.filter(n=>!cur.includes(n));const hex=n=>'#'+RC[n].toString(16).padStart(6,'0');d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d8a0">🏠 겹집 방 배치 ${rd+1}/${NR}</b><div style="font-size:12px;margin:3px 0">방 이름을 누르고 집 칸을 눌러 놓아요(놓인 방을 누르면 다시 집어요).</div><div style="text-align:left;font-size:12px;line-height:1.6;margin:4px 0">${clues.map((c,k)=>`<div style="color:${badSet.has(k)?'#ff8a7a':'#f6f0e4'}">• ${txt(c)}</div>`).join('')}</div><div>${left.map(n=>`<button data-r="${n}" style="font:13px 'Do Hyeon',sans-serif;background:${hex(n)};color:#1a1612;border:${selRoom===n?'3px solid #fff':'0'};border-radius:8px;padding:4px 7px;margin:2px;cursor:pointer">${n}</button>`).join('')}${selRoom&&!left.includes(selRoom)?`<div style="font-size:12px">집은 방: <b>${selRoom}</b></div>`:''}</div><button data-c style="font:14px 'Do Hyeon',sans-serif;background:#c8a060;color:#2a2620;border:0;border-radius:10px;padding:5px 14px;margin:4px;cursor:pointer">다 놓았어요</button><div style="font-size:13px;color:#f0d8a0;min-height:16px">${msg}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#f6f0e4;border:1px solid #f6f0e4;border-radius:8px;padding:2px 8px;cursor:pointer">그만</button>`;
   d.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{selRoom=b.dataset.r;snd(600,.04);ui()});d.querySelector('[data-c]').onclick=()=>check();d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const cleanup=()=>{clr();pg.visible=false;ov.remove()};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/res.length);const s2=Q>=80?3:Q>=55?2:Q>0?1:0;try{ctx.done('wanggok_room',Q,'겹집 방 배치 맞히기')}catch(e){}window.__WGRQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0d8a0">겹집을 다 지었어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">왕곡마을 겹집은 부엌과 외양간, 방들을 한 지붕 아래 두 줄로 붙여, 눈 많은 겨울을 집 안에서 따뜻하게 났어요. 실제 집마다 방 배치는 조금씩 달라요.</div><div style="font-size:24px;color:#c8a060">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a060;color:#2a2620;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f6f0e4;border:2px solid #f6f0e4;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__WGROOM()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(auto&&wait<=0){aT-=dt;if(aT<=0){aT=.2;const k=sol.findIndex((n,i)=>cur[i]!==n);if(k<0)check();else{selRoom=sol[k];place(k)}}}
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=NR){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);
  window.__WGRG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},get clues(){return clues.map(txt)},sel:n=>{selRoom=n},place,check,scr:i=>{setPC();const v=new THREE.Vector3();cellM[i].getWorldPosition(v);v.project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]}};try{ctx.say('실마리를 보고 방을 제자리에 놓아요!',2.4)}catch(e){}};
 spots.push({x:PX,y:0,z:PZ+3,r:2.4,t:'방 배치 맞히는 자리',h:'실마리를 보고 겹집 한 지붕 아래 방들을 제자리에 놓아 봐요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[-10,3,10],[-6,2.6,9],[12,3,8],[-14,3,-10],[10,3,-12],[0,3,34],[PX,3,PZ+3]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'굴뚝 항아리 조각',h:'항아리 굴뚝 꼭대기에 얹던 옹기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.1,.08,.05,14,1,false,0,3.2),M(0x4a3020)))})},
  {n:'쇠죽 바가지 조각',h:'외양간 소에게 쇠죽을 퍼 주던 바가지 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.07,10,6,0,Math.PI*2,0,Math.PI/2),M(0xc8a870)))})},
  {n:'기와 조각',h:'겹집 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'놋그릇 조각',h:'놋쇠 밥그릇 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.08,.06,.04,14,1,true),M(0xc8a040,{metalness:.7})))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(14,24,2.4,'발굴 탐지 자리','마을 앞마당 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__WGDIG=()=>{window.__DETECT&&window.__DETECT({key:'wanggok_dig',title:'왕곡마을 발굴 탐지',emoji:'⛏️',bg:'#2a2620',count:4,TL:150,cand:[[-6,22],[18,18],[-24,0],[24,8],[0,-6],[-2,-22],[22,-22],[-28,-10],[30,14],[-32,24]],items:DIG,intro:'왕곡마을 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'왕곡마을은 북쪽 지방식 겹집과 항아리 굴뚝이 남은 마을이에요(국가민속문화유산).'})};
 const meta={quest:{t:'왕곡마을 둘러보기',d:'다섯 봉우리 분지에 들어와 ㄱ자 겹집과 항아리 굴뚝, 초가 겹집, 뒷담, 송지호를 둘러보세요.',steps:[['오봉','오봉 분지'],['겹집','ㄱ자 겹집'],['굴뚝','항아리 굴뚝'],['초가','초가 겹집'],['뒷담','뒷담'],['송지호','송지호']]},
  title:'강원 고성 왕곡마을',hint:'왕곡마을을 공개 사진으로 간추려 지었어요(배치·크기 어림). 실마리를 보고 겹집 방 배치를 맞혀 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:40,lines:['고성 왕곡마을','오봉 분지 · ㄱ자 겹집','항아리 굴뚝','간추려 지음']}},
  npc:[['science',[[-6,38],[6,38],[6,44],[-6,44]]]],bounds:[-44,60,-34,50],level:()=>'강원 고성 왕곡마을',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:6,draw(g,X,Z,S){g.fillStyle='#7c9a4a';g.fillRect(0,0,300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:42,yaw:Math.PI},size:{}},meta)}
