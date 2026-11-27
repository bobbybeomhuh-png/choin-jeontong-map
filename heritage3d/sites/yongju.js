/* 화성 용주사 마당(2026-11-23, 2단계 여덟째 묶음): 정조가 아버지 사도세자의 무덤(융릉)을 지키고 명복을 빌려고 1790년에 다시 세운 절.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   절 앞에 왕실 무덤처럼 홍살문이 선 드문 절. 삼문, 천보루, 대웅보전(보물), 범종(국보, 고려 초 동종).
   절을 다시 짓던 날 밤 정조가 여의주를 문 용이 하늘로 오르는 꿈을 꾸어 '용주사'라 했다는 이야기가 전해 옴(전해 오는 이야기).
   놀이: 범종 치기(당목을 눌러 당겼다 놓아 알맞은 힘으로 종을 쳐요. 너무 약해도 세도 안 되고, 판마다 알맞은 힘 자리가 좁아지고 움직여요, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {curvedRoof,buildHall} from './hallkit.js';
import {tex,mulb} from './sungnyemun.js';
import {lumpyHill} from './treekit.js';
import {placeHanok} from './hanokkit.js';
import {stonePagoda} from './stonekit.js';
import {yardMat} from './yardkit.js';
export function buildYongju(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1790);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7c9a4a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 화산 낮은 언덕 */for(let i=0;i<9;i++){const rr=18+r()*8;const h=lumpyHill(rr,rr*.45,0x557a44,(i*7+19)|0);h.position.set(-80+i*20,0,-92-r()*10);h.rotation.y=r()*3;G.add(h)}
 const ST=M(0xa8a296),WOODB=M(0x8a7458),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50),DAN=M(0x8a3a2a),RED=M(0xb03a2a);
 const plaque=(x,y,z,txt,w=2)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 const hipRoof=(x,z,W,D,y,H)=>{curvedRoof(G,x,(y+H/2-.15)-(H)/2,z,((W+2.4)*.72)/.72,((D+2.4)*.72)/.72,(H)*1.05)};
 const hall=(x,z,W,D,PH,base=.8)=>{/* 11/23 품질: 흰 상자 벽+기둥 → hallkit 법당 */const h=buildHall({x,z,W,D,nx:Math.max(1,Math.round(W/3)),nz:Math.max(1,Math.round(D/3.2)),FY:base,PH:PH,roof:'hip',pillar:0x9a3a26,bracket:(W>=8?'dapo':'ik'),front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',mini,solids,light:false,roofScale:.9,name:'殿寶雄大'});G.add(h.group);return base+PH};
 /* 홍살문 */{const Z=46;for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.2,.22,6,10),RED);c.position.set(s*2.8,3,Z);G.add(c);solids.push({cx:s*2.8,cz:Z,r:.26,y0:0,y1:6})}const bm=new THREE.Mesh(new THREE.BoxGeometry(6.2,.22,.22),RED);bm.position.set(0,5.4,Z);G.add(bm);for(let i=0;i<11;i++){const a=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,1.2,6),RED);a.position.set(-2.5+i*.5,6.1,Z);G.add(a)}const tg=new THREE.Mesh(new THREE.TorusGeometry(.32,.06,8,16),RED);tg.position.set(0,6.1,Z);G.add(tg)}
 sp(0,50,3,'홍살문','왕릉이나 향교 앞에 세우는 붉은 살 문이에요. 왕실이 세운 절이라 절 앞에도 서 있어요.');
 /* 삼문 + 행랑: 솟을대문(한옥 대문 모델) + 양옆 행랑(전각 부품) */const SZ=32;{placeHanok(G,solids,'gate',0,SZ,0,{hole:true});for(const s of[-1,1]){const h=buildHall({x:s*10.5,z:SZ,W:9,D:3,nx:3,nz:1,FY:.4,PH:2.6,roof:'gable',bracket:'ik',pillar:0x9a3a26,front:'window',back:'wall',left:'wall',right:'wall',stairs:'none',mini,solids,light:false,plain:true,roofScale:.8});G.add(h.group)}}
 sp(0,36,3,'삼문','궁궐처럼 솟을삼문에 행랑을 붙인 문이에요. 정조가 세운 왕실 절다운 모습이에요.');
 /* 천보루(누각, 아래 돌기둥 사이로 통과) */const TZ=18;{const h=buildHall({x:0,z:TZ,W:11,D:4.4,nx:5,nz:1,FY:0,PH:2.5,loft:{h:2.7,stone:true},base:false,roof:'hip',bracket:'ik',pillar:0x9a3a26,front:'window',back:'window',left:'wall',right:'wall',stairs:'none',name:'樓保天',mini,solids,light:false});G.add(h.group);}
 {const y=new THREE.Mesh(new THREE.PlaneGeometry(22,22),yardMat());y.rotation.x=-Math.PI/2;y.position.set(0,.03,6);y.receiveShadow=true;G.add(y)}
 sp(0,TZ+4,3,'천보루','누각 아래를 지나면 대웅보전 마당이에요.');
 /* 오층석탑 + 대웅보전 */{const t=stonePagoda(3,5);t.position.set(0,0,8);G.add(t);solids.push({cx:0,cz:8,r:1.5,y0:0,y1:6})}
 sp(-3.5,8,2.4,'오층석탑','대웅보전 앞의 오층석탑이에요.');
 const DZ=-4;hall(0,DZ,12,7,3.8,1.1);
 sp(0,DZ+7.4,3.2,'대웅보전','정조 때 지은 법당이에요(보물). 김홍도가 그렸다고 전하는 후불탱화가 있어요(전해 오는 이야기).');
 /* 범종각 */const BX=-18,BZ=8;const bellG=new THREE.Group(),log=new THREE.Group();{const W=4.4;{const h=buildHall({x:BX,z:BZ,W,D:W,nx:1,nz:1,FY:.3,PH:3.9,roof:'hip',bracket:'ik',pillar:0x9a3a26,front:'open',back:'open',left:'open',right:'open',stairs:'none',mini,solids,light:false,roofScale:.9});G.add(h.group)}const bm=new THREE.Mesh(new THREE.BoxGeometry(W,.25,.25),WOODB);bm.position.set(BX,3.85,BZ);G.add(bm);
  bellG.position.set(BX,3.75,BZ);G.add(bellG);const pts=[];for(let k=0;k<=12;k++){const t=k/12;pts.push(new THREE.Vector2(.62+Math.pow(t,2.2)*.32,-t*2.1))}const bell=new THREE.Mesh(new THREE.LatheGeometry(pts,24),M(0x4a6a58,{metalness:.6,roughness:.45,side:THREE.DoubleSide}));bellG.add(bell);const cap=new THREE.Mesh(new THREE.SphereGeometry(.62,16,8,0,Math.PI*2,0,Math.PI/2),M(0x4a6a58,{metalness:.6,roughness:.45}));bellG.add(cap);const yong=new THREE.Mesh(new THREE.TorusGeometry(.22,.07,8,14,Math.PI),M(0x4a6a58,{metalness:.6}));yong.position.y=.62;bellG.add(yong);const dang=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.04,14),M(0x5a7a62,{metalness:.5}));dang.rotation.z=Math.PI/2;dang.position.set(.82,-1.5,0);bellG.add(dang);
  /* 당목: 종 동쪽에 줄 두 가닥으로 매단 통나무 */log.position.set(BX+2.6,3.75,BZ);G.add(log);for(const s of[-.5,.5]){const rp=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,1.5,4),M(0xc8b890));rp.position.set(0,-.75,s);log.add(rp)}const lg=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,1.8,10),M(0x8a6a44));lg.rotation.z=Math.PI/2;lg.position.set(-.55,-1.5,0);log.add(lg)}
 sp(BX,BZ+4.2,2.6,'범종각','고려 초에 만든 범종(국보)이에요. 종 꼭대기 용뉴와 소리를 울리는 음통, 하늘을 나는 비천이 새겨진 아름다운 종이에요.');
 /* 범종 치기(11/23) */window.__YJBELL=()=>{if(document.getElementById('yjbP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(BX+7,BZ+2,0)}catch(e){}
  const camA=()=>{const k=innerWidth<innerHeight?2.3:1.2;return[BX+1.6+.6*k,2.8,BZ+5.4*k,BX+1.6,2.2,BZ,50]};window.__GCAM=()=>document.getElementById('sssX')?null:document.getElementById('yjbP')?camA():null;
  let rd=0,n=0,pull=0,dir=1,holding=false,sw=0,swV=0,bellA=0,bellV=0,done=false,auto=false,last=performance.now(),wait=0,lo=.5,hi=.7,drift=0;const res=[],hits=[];const NR=3,NS=3;
  const ZONE=[[.5,.72,0],[.56,.72,.06],[.6,.72,.1]];/* [아래, 위, 움직임 크기] → 폭 */
  const snd=(f,len=.1,ty='triangle',v=.06)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(v,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const boom=p=>{const v=.03+p*.12;snd(98,4.5,'sine',v);snd(100.5,4.5,'sine',v*.8);snd(196,2.4,'sine',v*.4);snd(262,1.4,'triangle',v*.15)};
  const zone=()=>{const z=ZONE[rd];const w=z[1]-z[0];const c=(z[0]+z[1])/2+Math.sin(drift)*z[2];return[c-w/2,c+w/2]};
  const d=document.createElement('div');d.id='yjbP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#20282a;border:3px solid #7ab0a0;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef6f4;box-shadow:0 6px 18px rgba(0,0,0,.35);width:230px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;const[a,b]=zone();d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#b8e8d8">🔔 범종 치기 ${rd+1}/${NR}</b><div style="font-size:12px;margin:4px 0;line-height:1.5">'당기기'를 누르고 있으면 당목이 뒤로 당겨져요. 힘 막대가 초록 자리에 왔을 때 손을 떼면 좋은 소리가 나요! (${n+1}/${NS}번째)</div><div id="yjbBar" style="position:relative;height:16px;background:#3a4446;border-radius:8px;margin:6px 0;overflow:hidden"><div id="yjbZ" style="position:absolute;left:${a*100}%;width:${(b-a)*100}%;top:0;bottom:0;background:#5ac878"></div><div id="yjbF" style="position:absolute;left:0;width:${pull*100}%;top:5px;height:6px;background:#f0d070"></div></div><div style="font-size:13px;color:#b8e8d8;min-height:18px">${msg}</div><button data-p style="font:17px 'Do Hyeon',sans-serif;background:#7ab0a0;color:#fff;border:0;border-radius:10px;padding:8px 18px;margin:3px;cursor:pointer;touch-action:none">당기기</button><br><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#eef6f4;border:1px solid #eef6f4;border-radius:8px;padding:2px 8px;margin-top:4px;cursor:pointer">그만</button>`;
   const pb=d.querySelector('[data-p]');pb.onpointerdown=e=>{e.preventDefault();press()};pb.onpointerup=pb.onpointerleave=pb.onpointercancel=e=>{e.preventDefault();release()};d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const bar=()=>{const f=d.querySelector('#yjbF'),z=d.querySelector('#yjbZ');if(f)f.style.width=(pull*100)+'%';if(z){const[a,b]=zone();z.style.left=(a*100)+'%';z.style.width=((b-a)*100)+'%'}};
  const press=()=>{if(done||wait>0||sw>0||holding)return;holding=true;pull=0;dir=1};
  const release=()=>{if(!holding)return;holding=false;sw=pull;swV=0};
  const strike=p=>{const[a,b]=zone();const c=(a+b)/2,hw=(b-a)/2;let sc;if(p>=a&&p<=b)sc=Math.round(100-Math.abs(p-c)/hw*20);else sc=Math.max(0,Math.round(70-(Math.min(Math.abs(p-a),Math.abs(p-b)))*400));hits.push(sc);boom(p);bellV+=p*.5;n++;
   const msg=p<a?`조금 약해요(${sc}점)`:p>b?`너무 세요! 종이 다칠라(${sc}점)`:`댕— 좋은 소리!(${sc}점)`;if(n>=NS){res.push(Math.round(hits.slice(-NS).reduce((x,y)=>x+y,0)/NS));wait=2.6;n=0;ui(msg+' · 판 끝')}else{wait=1.4;ui(msg)}};
  const cleanup=()=>{log.rotation.z=0;bellG.rotation.z=0};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/res.length);const s2=Q>=80?3:Q>=55?2:Q>0?1:0;try{ctx.done('yongju_bell',Q,'범종 치기')}catch(e){}window.__YJBQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#b8e8d8">종소리가 멀리 퍼졌어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">용주사 범종(국보)은 고려 초에 만든 종이에요. 정조는 이 절에서 아버지 사도세자의 명복을 빌었어요. 용이 여의주를 물고 오르는 꿈 이야기도 전해 와요(전해 오는 이야기).</div><div style="font-size:24px;color:#7ab0a0">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#7ab0a0;color:#fff;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef6f4;border:2px solid #eef6f4;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__YJBELL()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  let aHold=0;const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;drift+=dt*1.3;
   if(holding){pull+=dir*dt*.75;if(pull>=1){pull=1;dir=-1}if(pull<=0){pull=0;dir=1}log.rotation.z=pull*.6}
   else if(sw>0){swV+=dt*2.2;log.rotation.z=Math.max(0,sw*.6-swV*sw*.6*1.4);if(log.rotation.z<=0){const p=sw;sw=0;strike(p)}}
   else log.rotation.z*=.9;
   bellV+=(-bellA*30-bellV*1.5)*dt;bellA+=bellV*dt;bellG.rotation.z=bellA*.06;
   bar();
   if(auto&&wait<=0&&sw<=0){const[a,b]=zone();if(!holding){aHold+=dt;if(aHold>.3){aHold=0;press()}}else if(dir>0&&pull>=(a+b)/2)release()}
   if(wait>0){wait-=dt;if(wait<=0){if(res.length>rd){rd++;if(rd>=NR){fin();return}}ui()}}
   requestAnimationFrame(step)};
  ui();requestAnimationFrame(step);
  window.__YJBG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},press,release,get pull(){return pull},get hits(){return hits.slice()}};try{ctx.say('알맞은 힘으로 범종을 쳐 봐요!',2.4)}catch(e){}};
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,49],[0,3,35],[0,3,TZ+3.5],[-3,3,8],[0,3,DZ+7],[BX,3,BZ+4]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'기와 조각',h:'절 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'청동 조각',h:'종을 녹여 붓던 청동 부스러기예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.DodecahedronGeometry(.045),M(0x4a6a58,{metalness:.6})))})},
  {n:'백자 접시 조각',h:'조선 백자 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.1,.08,.03,14,1,false,0,3.2),M(0xf0ece0)))})},
  {n:'경판 조각',h:'부모은중경을 새긴 나무판 조각이에요. 정조의 효심을 떠올려 봐요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.02,.1),M(0x6a4a2a)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(12,44,2.4,'발굴 탐지 자리','절 들머리 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__YJDIG=()=>{window.__DETECT&&window.__DETECT({key:'yongju_dig',title:'용주사 발굴 탐지',emoji:'⛏️',bg:'#20282a',count:4,TL:150,cand:[[-8,42],[10,40],[-14,24],[14,24],[-10,-16],[10,-16],[20,6],[-32,24],[30,32],[-30,-10]],items:DIG,intro:'용주사 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'용주사는 정조가 아버지를 그리며 1790년에 다시 세운 절이에요.'})};
 const meta={quest:{t:'용주사 둘러보기',d:'홍살문과 삼문, 천보루를 지나 오층석탑과 대웅보전, 범종각을 둘러보세요.',steps:[['홍살문','홍살문'],['삼문','삼문'],['천보루','천보루'],['석탑','오층석탑'],['대웅보전','대웅보전'],['범종각','범종각']]},
  title:'화성 용주사',hint:'정조가 세운 용주사를 공개 사진으로 간추려 지었어요(배치·크기 어림). 범종각에서 당목을 당겼다 놓아 알맞은 힘으로 종을 쳐 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:53,lines:['화성 용주사','정조 · 융릉 원찰(1790)','범종(국보)','간추려 지음']}},
  npc:[['science',[[-6,51],[6,51],[6,57],[-6,57]]]],bounds:[-44,44,-32,62],level:()=>'화성 용주사',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:12,draw(g,X,Z,S){g.fillStyle='#7c9a4a';g.fillRect(0,0,300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:55,yaw:Math.PI},size:{}},meta)}
