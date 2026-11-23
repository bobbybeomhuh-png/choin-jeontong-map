/* 해남 대흥사 마당(2026-11-23, 2단계 덧붙이기): 두륜산 대흥사(산사, 한국의 산지승원 유네스코 세계유산 2018).
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   일주문 → 개울 건너 침계루 → 대웅보전(현판 원교 이광사 글씨로 알려짐) / 천불전(옥돌 부처 천 분, 일본으로 떠내려갔다 돌아왔다는 이야기는 전해 오는 이야기) / 표충사(서산대사).
   위쪽 일지암: 초의선사가 머물며 차를 가꾼 작은 암자, 샘·차밭.
   놀이: 물 끓는 모습 읽기(초의선사가 엮은 『다신전』의 탕변처럼 거품이 새우눈·게눈·물고기눈·구슬 꿰듯·물결 북치듯으로 바뀌는 것을 보고, 다 끓은 순숙에 불에서 내리기. 온도계 없이 눈과 김으로만, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {curvedRoof,buildHall} from './hallkit.js';
import {lumpyHill} from './treekit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildDaeheung(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1828);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7a9a48,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 두륜산 봉우리(뒤) */for(let i=0;i<7;i++){const c=lumpyHill((26+r()*10)*1.3,(36+r()*14)*.75,0x4a6a3a,((-90+i*30)*.13+57)|0);c.position.set(-90+i*30,-.5,-110-r()*10);G.add(c)}
 const STONE=M(0xa8a296),WOOD=M(0x8a3a2a),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50);
 const roof=(x,y,z,W,D,h)=>{curvedRoof(G,x,(y+h/2)-(h)/2,z,(W*.72)/.72,(D*.72)/.72,(h)*1.05)};
 const plaque=(x,y,z,txt,w=2)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 const hall=(x,z,W,D,PH,base=.6)=>{/* 11/23 품질: 흰 상자 벽+기둥 → hallkit 법당 */const h=buildHall({x,z,W,D,nx:Math.max(1,Math.round(W/3)),nz:Math.max(1,Math.round(D/3.2)),FY:base,PH:PH,roof:'hip',pillar:0x9a3a26,bracket:(W>=8?'dapo':'ik'),front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',mini,solids,light:false,roofScale:.9});G.add(h.group);return base+PH};
 /* 일주문 */{for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.3,.32,4.4,12),WOOD);c.position.set(s*2,2.2,44);G.add(c);solids.push({cx:s*2,cz:44,r:.35,y0:0,y1:4.4})}roof(0,4.4,44,6,3,1.6);plaque(0,3.9,44.9,'寺興大山輪頭',2.4)}
 sp(0,48,3.2,'일주문','두륜산 대흥사로 들어가는 첫 문이에요. 기둥이 한 줄로만 서 있어 일주문이라 해요.');
 /* 흙길·개울·돌다리 */{const p=new THREE.Mesh(new THREE.PlaneGeometry(4,50),M(0xc8b890));p.rotation.x=-Math.PI/2;p.position.set(0,.02,24);G.add(p);const cr=new THREE.Mesh(new THREE.PlaneGeometry(200,5),M(0x5a8a9a,{roughness:.25}));cr.rotation.x=-Math.PI/2;cr.position.set(0,.03,22);G.add(cr);solids.push({x0:-100,x1:-2.2,y0:-2,y1:3,z0:19.5,z1:24.5},{x0:2.2,x1:100,y0:-2,y1:3,z0:19.5,z1:24.5});const br=new THREE.Mesh(new THREE.BoxGeometry(4.2,.3,6),STONE);br.position.set(0,.15,22);G.add(br)}
 sp(0,27,2.6,'금당천 돌다리','절 앞을 흐르는 개울을 돌다리로 건너요.');
 /* 침계루(문루, 아래로 지나감) */const CZ=14;{const deck=new THREE.Mesh(new THREE.BoxGeometry(12,.25,5),M(0x8a6a4a));deck.position.set(0,2.6,CZ);G.add(deck);for(let i=0;i<=4;i++)for(const j of[-1,1]){const x=-6+i*3;const c=new THREE.Mesh(new THREE.CylinderGeometry(.2,.22,5,10),WOOD);c.position.set(x,2.5,CZ+j*2.5);G.add(c);if(i!==2)solids.push({cx:x,cz:CZ+j*2.5,r:.28,y0:0,y1:5})}roof(0,5,CZ,15,8,2);plaque(0,4.4,CZ+2.6,'樓溪枕',1.6)}
 sp(0,CZ+4,3,'침계루','「개울을 베고 누운 누각」이라는 이름의 문루예요. 아래로 지나 대웅보전 마당에 들어가요.');
 /* 대웅보전 */{const y=hall(0,-4,13,7,3.4,1);plaque(0,y-.5,-4+3.55,'殿寶雄大',2.4)}
 sp(0,2.6,3.4,'대웅보전','대흥사의 큰 법당이에요. 현판 글씨는 조선 후기 명필 원교 이광사가 썼다고 알려져 있어요.');
 /* 천불전(오른쪽 마당) */{hall(28,-6,10,6,3,.8);const g=new THREE.Group();g.position.set(28,1.3,-6);for(let i=0;i<40;i++){const b=new THREE.Mesh(new THREE.CapsuleGeometry(.07,.12,3,6),M(0xe8e4d4));b.position.set(-4+(i%10)*.9,(i/10|0)*.35,3.05);g.add(b)}G.add(g)}
 sp(28,0,3,'천불전','옥돌로 깎은 부처님 천 분을 모신 전각이에요. 경주에서 배로 옮기다 일부가 일본으로 떠내려갔다 돌아왔다는 이야기가 전해 와요(전해 오는 이야기).');
 /* 표충사(왼쪽) */{hall(-28,-6,8,5,2.6,.7);plaque(-28,3,-6+2.55,'祠忠表',1.6)}
 sp(-28,-1,3,'표충사','임진왜란 때 승병을 이끈 서산대사와 제자들을 모신 사당이에요. 서산대사의 옷과 발우가 이 절에 전해 와요.');
 /* 일지암: 북서쪽 언덕 위 초가 암자, 샘, 차밭 */const IX=-44,IZ=-34;{const b=new THREE.Mesh(new THREE.BoxGeometry(5,2.2,3.6),WALLW);b.position.set(IX,1.1,IZ);G.add(b);const rf=new THREE.Mesh(new THREE.ConeGeometry(4,1.8,4),M(0xb8a070));rf.rotation.y=Math.PI/4;rf.scale.set(1.1,1,.8);rf.position.set(IX,3,IZ);G.add(rf);solids.push({x0:IX-2.8,x1:IX+2.8,y0:0,y1:2.6,z0:IZ-2.1,z1:IZ+2.1});const sp2=new THREE.Mesh(new THREE.CylinderGeometry(.7,.7,.25,14),M(0x5a8a9a,{roughness:.2}));sp2.position.set(IX+5,.12,IZ-2);G.add(sp2);for(let i=0;i<6;i++)for(let j=0;j<3;j++){const t=new THREE.Mesh(new THREE.SphereGeometry(.45,8,6),M(0x2f5a2a));t.scale.y=.6;t.position.set(IX-8+i*1.4,.3,IZ+6+j*1.6);G.add(t)}}
 sp(IX,IZ+4,3,'일지암','초의선사가 40년 가까이 머물며 차를 가꾼 작은 암자예요. 『동다송』을 지었고, 추사 김정희·다산 정약용과 차로 사귀었어요.');
 /* 물 끓는 모습 읽기(11/23) */const PX=IX+3.5,PZ=IZ+3;const pg=new THREE.Group();pg.position.set(PX,0,PZ);G.add(pg);{const st=new THREE.Mesh(new THREE.CylinderGeometry(.55,.65,.6,12),M(0x8a6a4a));st.position.y=.3;pg.add(st);const pot=new THREE.Mesh(new THREE.CylinderGeometry(.42,.34,.42,20,1,true),M(0x3a3632,{metalness:.5,side:THREE.DoubleSide}));pot.position.y=.81;pg.add(pot);solids.push({cx:PX,cz:PZ,r:.7,y0:0,y1:1})}
 const water=new THREE.Mesh(new THREE.CircleGeometry(.4,28),M(0x6a9aa8,{roughness:.15,metalness:.2}));water.rotation.x=-Math.PI/2;water.position.y=.95;pg.add(water);const fire=new THREE.PointLight(0xff8030,0,4,2);fire.position.y=.3;pg.add(fire);
 sp(PX,PZ+2.4,2.2,'찻물 끓이는 화로','화로에 찻물을 올려 두었어요. 물이 끓는 모습을 보고 꼭 알맞을 때 내려 봐요.');
 const STG=[[0,'고요'],[70,'새우눈'],[80,'게눈'],[88,'물고기눈'],[94,'구슬 꿰듯'],[98,'물결이 북치듯(순숙)']];
 window.__DHTEA=()=>{if(document.getElementById('dhP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX,PZ+2.6,0)}catch(e){}
  const CAM=[PX,2.3,PZ+1.4,PX,.9,PZ,48];window.__GCAM=()=>document.getElementById('dhP')?CAM:null;
  let rd=0,T=20,rate=1,tBoil=-1,done=false,auto=false,last=performance.now(),gust=0,on=true,el=0;const res=[];const bub=[],steam=[];
  const BM=new THREE.MeshStandardMaterial({color:0xe8f4f8,roughness:.1,transparent:true,opacity:.85});const SM=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.25,depthWrite:false});
  const d=document.createElement('div');d.id='dhP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#22281e;border:3px solid #9ab878;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f0f4e8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const snd=(f,len=.12,v=.05,ty='sine')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(v,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const ui=msg=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#c8e0a8">🍵 찻물 끓이기 ${rd+1}/3</b><div style="font-size:12px;margin:4px 0;line-height:1.5">거품이 새우눈 → 게눈 → 물고기눈 → 구슬 꿰듯 → 물결이 북치듯 커져요. 물결이 북치듯 다 끓은 「순숙」 때 내려요. 너무 오래 끓이면 물이 쇠어요.</div><div style="font-size:13px;color:#c8e0a8;min-height:18px">${msg||''}</div><button data-o style="font:15px 'Do Hyeon',sans-serif;background:#9ab878;color:#22281e;border:0;border-radius:10px;padding:6px 14px;margin:4px;cursor:pointer">불에서 내리기</button><br><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#f0f4e8;border:1px solid #f0f4e8;border-radius:8px;padding:2px 8px;cursor:pointer">그만</button>`;d.querySelector('[data-o]').onclick=()=>off();d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const stage=()=>{let k=0;STG.forEach((s,i)=>{if(T>=s[0])k=i});return k};
  const newRound=()=>{T=20+r()*15;rate=[6,7.5,9][rd]*(.85+r()*.3);tBoil=-1;on=true;el=0;gust=0;bub.forEach(b=>pg.remove(b));bub.length=0;ui()};
  const off=()=>{if(done||!on)return;on=false;const k=stage();let sc,msg;if(k===5){const over=el-tBoil;sc=over<4?100:Math.max(40,Math.round(100-(over-4)*12));msg=over<4?'꼭 알맞은 순숙이에요!':'조금 오래 끓었어요(물이 쇠기 시작)'}else{sc=[10,25,40,60,80][k];msg=STG[k][1]+' 때 내렸어요. 아직 덜 끓었어요'}res.push(sc);snd(k===5?660:300,.4,.07);ui(msg);setTimeout(()=>{rd++;if(rd>=3)fin();else newRound()},1600)};
  const cleanup=()=>{fire.intensity=0;bub.forEach(b=>pg.remove(b));bub.length=0;steam.forEach(s=>pg.remove(s));steam.length=0;water.position.y=.95};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('daeheung_tea',Q,'찻물 끓이기')}catch(e){}window.__DHQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#c8e0a8">차 석 잔을 우렸어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">초의선사가 엮은 『다신전』에는 물 끓는 정도를 거품 모양과 소리, 김으로 가려 보는 법이 있어요. 덜 끓은 물도 너무 끓어 쇤 물도 차 맛을 해친다고 했지요(놀이의 온도·단계는 간추린 것).</div><div style="font-size:24px;color:#9ab878">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#9ab878;color:#22281e;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f0f4e8;border:2px solid #f0f4e8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__DHTEA()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  let bt=0;const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;el+=dt;
   if(on){gust-=dt;if(gust<-2.5&&r()<.01)gust=1.5;const g=gust>0?1.8:1;T=Math.min(101,T+rate*g*dt*(1-(T-20)/170));if(T>=98&&tBoil<0)tBoil=el;fire.intensity=1.2*g+Math.sin(now/90)*.3}else{T=Math.max(60,T-6*dt);fire.intensity=0}
   const k=stage();
   /* 거품: 단계마다 크기·수 */const SZ=[0,.006,.012,.022,.03,.04][k],N=[0,6,10,14,24,34][k];bt+=dt;if(k>0&&bt>1/N){bt=0;const b=new THREE.Mesh(new THREE.SphereGeometry(SZ*(.7+r()*.6),8,6),BM);const a=r()*6.28,rr=Math.sqrt(r())*(k>=4?.36:.3);b.position.set(Math.cos(a)*rr,.95,Math.sin(a)*rr);b.userData.t=0;b.userData.L=k>=4?.35:.6;pg.add(b);bub.push(b)}
   for(let i=bub.length-1;i>=0;i--){const b=bub[i];b.userData.t+=dt;b.scale.setScalar(1+b.userData.t*.8);if(b.userData.t>b.userData.L){pg.remove(b);bub.splice(i,1)}}
   water.position.y=.95+(k>=5?Math.sin(now/70)*.012:k>=4?Math.sin(now/110)*.005:0);
   if(T>60&&r()<(T-60)/40*.5){const s=new THREE.Mesh(new THREE.SphereGeometry(.05+r()*.04,12,10),SM);s.position.set((r()-.5)*.5,1,(r()-.5)*.5);s.userData.t=0;pg.add(s);steam.push(s)}
   for(let i=steam.length-1;i>=0;i--){const s=steam[i];s.userData.t+=dt;s.position.y+=dt*(.35+T/300);s.position.x+=(k>=5?0:Math.sin(now/300+i)*.003);s.scale.setScalar(1+s.userData.t*1.4);s.material.opacity=.18;if(s.userData.t>1.6){pg.remove(s);steam.splice(i,1)}}
   if(on&&k>0&&r()<dt*N*.15)snd(900+r()*900-k*120,.04,.015,'triangle');
   if(on&&tBoil>=0&&el-tBoil>12)off();
   if(auto&&on&&k===5&&el-tBoil>.8)off();
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);window.__DHG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},get T(){return T},get stage(){return stage()}};try{ctx.say('물 끓는 모습을 잘 봐요!',2)}catch(e){}};
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,46],[0,2.2,CZ],[0,3,2],[IX+2,2.4,IZ+3]]){const L=new THREE.PointLight(0xffc080,0,26,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'찻잔 조각',h:'스님들이 차를 마시던 막사발 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.09,.06,.06,14,1,true,0,2.6),M(0xc8b8a0,{side:THREE.DoubleSide})))})},
  {n:'옥돌 조각',h:'옥돌을 다듬다 나온 작은 돌 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.DodecahedronGeometry(.05),M(0xe8e4d4,{roughness:.3})))})},
  {n:'쇠 다관 뚜껑 꼭지',h:'차를 끓이던 쇠 그릇 뚜껑의 꼭지예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.02,.03,.05,8),M(0x3a3632,{metalness:.6})))})},
  {n:'기와 조각',h:'절 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(10,34,2.4,'발굴 탐지 자리','절 앞 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__DHDIG=()=>{window.__DETECT&&window.__DETECT({key:'daeheung_dig',title:'대흥사 발굴 탐지',emoji:'⛏️',bg:'#22281e',count:4,TL:150,cand:[[-10,34],[14,40],[-16,8],[16,8],[40,10],[-40,10],[-30,-20],[12,-20],[40,-22],[-20,30]],items:ITEMS,intro:'대흥사 둘레 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'대흥사는 두륜산의 큰 절로, 우리나라 산사 일곱 곳과 함께 유네스코 세계유산이에요.'})};
 const meta={quest:{t:'대흥사 둘러보기',d:'일주문에서 개울 건너 침계루를 지나 법당과 일지암까지 둘러보세요.',steps:[['일주문','일주문'],['돌다리','금당천 돌다리'],['침계루','침계루'],['대웅보전','대웅보전'],['천불전','천불전'],['표충사','표충사'],['일지암','일지암']]},
  title:'해남 대흥사',hint:'두륜산 대흥사와 일지암을 공개 사진으로 간추려 지었어요(배치·크기 어림). 일지암 화로에서 물 끓는 모습을 보고 꼭 알맞을 때 내려 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:52,lines:['해남 대흥사','두륜산 · 유네스코 산사','침계루 · 천불전 · 일지암','간추려 지음']}},
  npc:[['science',[[-6,50],[6,50],[6,56],[-6,56]]]],bounds:[-70,60,-60,64],level:()=>'해남 대흥사',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.8,ox:-5,oz:0,draw(g,X,Z,S){g.fillStyle='#7a9a48';g.fillRect(0,0,300,300);g.fillStyle='#5a8a9a';g.fillRect(0,Z(24.5),300,5*S);g.fillStyle='#c8b890';g.fillRect(X(-2),Z(49),4*S,50*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:58,yaw:Math.PI},size:{}},meta)}
