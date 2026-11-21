/* 세종·대전 마당(2026-11-22, W47): 세종대왕 이름을 딴 도시 세종과 대전.
   공개 실측 3D(CC BY)가 없어 공개 사진·지도로 간추려 지음.
   한글 마당(훈민정음 책·자모 돌), 대전 계족산성(백제 산성, 돌로 쌓은 성벽과 문), 대전 둔산 선사 유적(신석기·청동기 움집), 세종 비암사(계유명 전씨 아미타불비상이 나온 절).
   놀이: 한글 짓기(낱자를 차례로 눌러 첫소리·가운뎃소리·끝소리로 글자를 지어 낱말 만들기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildSejong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1446);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x8a9a4a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 const txt=(s,w,h,o={})=>{const c=document.createElement('canvas');c.width=w;c.height=h;const q=c.getContext('2d');q.fillStyle=o.bg||'#f4ecd8';q.fillRect(0,0,w,h);if(o.border){q.strokeStyle=o.border;q.lineWidth=8;q.strokeRect(4,4,w-8,h-8)}q.fillStyle=o.fg||'#2a1e14';q.font=`${o.bold===false?'':'bold '}${o.size||Math.round(h*.7)}px "Do Hyeon","Nanum Myeongjo",serif`;q.textAlign='center';q.textBaseline='middle';q.fillText(s,w/2,h/2+(o.dy||0));const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t};
 /* 한글 마당: 가운데 마당에 펼친 훈민정음 책 + 기본 낱자 여덟 돌(ㄱㄴㅁㅅㅇ·ㆍㅡㅣ) */const HX=0,HZ=-10;
 {const pv=new THREE.Mesh(new THREE.CylinderGeometry(14,14,.12,40),M(0xd8ccb0,{roughness:1}));pv.position.set(HX,.06,HZ);G.add(pv);
  const book=new THREE.Group();book.position.set(HX,0,HZ-3);for(const sx of[-1,1]){const pg=new THREE.Group();const pb=new THREE.Mesh(new THREE.BoxGeometry(2.4,.12,3.2),M(0xf4ecd8));pg.add(pb);const pt=new THREE.Mesh(new THREE.PlaneGeometry(2.3,3.1),new THREE.MeshStandardMaterial({map:txt(sx<0?'訓民正音':'나랏말',256,340,{size:sx<0?62:70}),roughness:.9}));pt.rotation.x=-Math.PI/2;pt.position.y=.065;pg.add(pt);pg.position.set(sx*1.25,1.05,0);pg.rotation.z=sx*-.12;book.add(pg)}const st=new THREE.Mesh(new THREE.BoxGeometry(4.6,1,2.4),M(0x8a6a44));st.position.y=.5;book.add(st);G.add(book);solids.push({x0:HX-2.6,x1:HX+2.6,y0:0,y1:1.3,z0:HZ-4.7,z1:HZ-1.3});
  const base=['ㄱ','ㄴ','ㅁ','ㅅ','ㅇ','ㆍ','ㅡ','ㅣ'];base.forEach((ch,i)=>{const a=Math.PI*(.15+i/7*.7);const x=HX+Math.cos(a)*10,z=HZ-Math.sin(a)*10+2;const g=new THREE.Group();g.position.set(x,0,z);const s=new THREE.Mesh(new THREE.BoxGeometry(1.4,1.8,.5),[M(0x9a9488),M(0x9a9488),M(0x9a9488),M(0x9a9488),new THREE.MeshStandardMaterial({map:txt(ch,256,320,{bg:'#a8a296',fg:'#2a2a2a',size:200}),roughness:.9}),M(0x9a9488)]);s.position.y=.9;g.add(s);g.lookAt(HX,0,HZ+4);G.add(g);solids.push({cx:x,cz:z,r:.8,y0:0,y1:1.8})})}
 /* 한글 짓기 판: 마당 동쪽 벽에 글자 칸 넷 */const BX=22,BZ=-8;const cells=[];{const wall=new THREE.Mesh(new THREE.BoxGeometry(9,4.2,.5),M(0x8a6a44));wall.position.set(BX,2.1,BZ);G.add(wall);const cap=new THREE.Mesh(new THREE.BoxGeometry(9.8,.3,1),M(0x3a4048));cap.position.set(BX,4.35,BZ);G.add(cap);for(let i=0;i<4;i++){const m=new THREE.MeshStandardMaterial({map:txt('',256,256,{border:'#8a6a44'}),roughness:.9});const c=new THREE.Mesh(new THREE.PlaneGeometry(1.8,1.8),m);c.position.set(BX-3.15+i*2.1,2.2,BZ+.26);G.add(c);cells.push(c)}solids.push({x0:BX-4.6,x1:BX+4.6,y0:0,y1:4.4,z0:BZ-.4,z1:BZ+.4})}
 const setCell=(i,s,o)=>{const m=cells[i].material;if(m.map)m.map.dispose();m.map=txt(s,256,256,Object.assign({border:'#8a6a44',size:170},o||{}));m.needsUpdate=true};
 /* 대전 계족산성: 북쪽 언덕 앞 돌 성벽 + 문 */const KX=-30,KZ=-50;{const hill=new THREE.Mesh(new THREE.SphereGeometry(22,24,12,0,Math.PI*2,0,Math.PI/2),M(0x4a6a32,{roughness:1}));hill.scale.y=.6;hill.position.set(KX,0,KZ-20);G.add(hill);solids.push({cx:KX,cz:KZ-20,r:21.5,y0:0,y1:13});
  const ST=tex(256,128,(q,w,h)=>{q.fillStyle='#8a8478';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=16)for(let x=(y/16%2)*14;x<w;x+=28){{const v=(r()*40|0);q.fillStyle=`rgb(${150+v},${145+v},${132+v})`};q.fillRect(x+1,y+1,26,14)}},[6,2]);const sm=new THREE.MeshStandardMaterial({map:ST,roughness:1});
  for(const[x0,x1]of[[-24,-2.5],[2.5,24]]){const w=new THREE.Mesh(new THREE.BoxGeometry(x1-x0,4.5,3),sm);w.position.set(KX+(x0+x1)/2,2.25,KZ);G.add(w);solids.push({x0:KX+x0,x1:KX+x1,y0:0,y1:4.5,z0:KZ-1.5,z1:KZ+1.5})}
  const lt=new THREE.Mesh(new THREE.BoxGeometry(5.6,.6,3.2),sm);lt.position.set(KX,4.2,KZ);G.add(lt)}
 /* 대전 둔산 선사 유적: 움집 셋 */const DX=-34,DZ=10;{const th=M(0xb89a58,{roughness:1});for(const[dx,dz,s]of[[0,0,1],[8,4,.85],[-6,7,.9]]){const g=new THREE.Group();g.position.set(DX+dx,0,DZ+dz);const pit=new THREE.Mesh(new THREE.CylinderGeometry(3.2*s,3.2*s,.1,20),M(0x6a5038));pit.position.y=.02;g.add(pit);const roof=new THREE.Mesh(new THREE.ConeGeometry(3.6*s,4.2*s,14),th);roof.position.y=2.1*s;g.add(roof);const door=new THREE.Mesh(new THREE.BoxGeometry(1*s,1.3*s,.8*s),M(0x3a2a1a));door.position.set(0,.65*s,3*s);door.rotation.x=-.5;g.add(door);G.add(g);solids.push({cx:DX+dx,cz:DZ+dz,r:3.2*s,y0:0,y1:4})}}
 /* 세종 비암사: 서남쪽 작은 법당 + 삼층석탑 */const PX=-44,PZ=-20;if(!mini){const h=buildHall({x:PX,z:PZ,ry:Math.PI/2,W:9,D:6,nx:3,nz:2,FY:.9,PH:3.2,roof:'gable',name:'極樂寶殿',pillar:0x9a3a26,bracket:'ik',front:'door',roofScale:.95,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 {const sm=M(0xa8a296);let y=0;for(const[w,h]of[[2.6,.6],[2.2,.5],[1.6,1],[2,.25],[1.3,.8],[1.7,.22],[1,.7],[1.4,.2]]){const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,w),sm);b.position.set(PX+8,y+h/2,PZ);G.add(b);y+=h}solids.push({cx:PX+8,cz:PZ,r:1.4,y0:0,y1:5})}
 const NL=[];if(!mini){for(const[x,y,z]of[[HX,3,HZ+2],[BX,4,BZ+3],[KX,5,KZ+4],[DX,3,DZ+5]]){const L=new THREE.PointLight(0xffc080,0,26,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8)};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(HX,HZ+4,3.4,'한글 마당','세종은 한글을 만든 세종대왕의 이름을 딴 도시예요. 닿소리 기본 글자 ㄱㄴㅁㅅㅇ은 소리 낼 때 혀·입술·이·목구멍 모양을 본떴고, 홀소리 ㆍㅡㅣ는 하늘·땅·사람을 본떴어요. 여기에 획을 더하고 서로 어울러 모든 글자를 지어요.');
 sp(BX,BZ+3.4,2.6,'한글 짓는 자리','낱자를 차례로 눌러 글자를 짓고 낱말을 만들어 봐요.');
 sp(KX,KZ+5,3.4,'대전 계족산성','계족산 꼭대기를 돌로 둘러쌓은 백제 산성이에요(사적). 신라와 맞닿은 길목을 지켰어요. 성문과 성벽 한쪽을 간추려 지었어요.');
 sp(DX,DZ+6,3,'둔산 선사 유적','대전 둔산에서 신석기·청동기 사람들이 살던 움집 자리가 나왔어요. 땅을 얕게 파고 기둥을 세워 풀로 지붕을 덮었어요.');
 sp(PX+4,PZ+5,3,'세종 비암사','삼국 통일 무렵 백제 사람들이 새긴 「계유명 전씨 아미타불비상」(국보)이 나온 절이에요. 지금은 국립청주박물관에 있어요. 간추려 지었어요.');
 sp(30,30,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 한글 짓기(11/22): 낱말 다섯. 글자마다 첫소리 → 가운뎃소리 → (끝소리) 차례로 낱자를 눌러요. 틀리면 실수 하나. 짓는 중인 글자가 벽 칸에 바로 보여요 */
 const CHO='ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ',JUNG='ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ',JONG=['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
 const dec=ch=>{const c=ch.charCodeAt(0)-0xAC00;return[CHO[Math.floor(c/588)],JUNG[Math.floor(c%588/28)],JONG[c%28]].filter(Boolean)};
 const comp=parts=>{if(parts.length<2)return parts[0]||'';const a=CHO.indexOf(parts[0]),b=JUNG.indexOf(parts[1]),c=parts[2]?JONG.indexOf(parts[2]):0;return String.fromCharCode(0xAC00+(a*21+b)*28+c)};
 const WORDS=['하늘','나무','세종','한글','바다','무지개','별빛','우리말','소나무','달항아리','무이','가람'];
 const CONS='ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'.split(''),VOW='ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣㅐㅔ'.split('');
 window.__SJHAN=()=>{if(document.getElementById('sjP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(BX-4,BZ+5,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('sjP')?[BX,2.6,BZ+19,BX,2.2,BZ,50]:null;
  const RD=5;const list=WORDS.slice().sort(()=>Math.random()-.5).slice(0,RD);let rd=0,si=0,pi=0,miss=0,done=false,msg='',cur=[];
  const word=()=>list[rd],seq=()=>dec(word()[si]);
  const d=document.createElement('div');d.id='sjP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:10px;z-index:60;background:#22201a;border:3px solid #c8a860;border-radius:16px;padding:8px 10px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:330px;max-width:96vw;user-select:none";document.body.appendChild(d);
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const drawWall=()=>{const w=word();for(let i=0;i<4;i++){if(i>=w.length){setCell(i,'',{bg:'#6a5a44',border:'#6a5a44'});continue}if(i<si)setCell(i,w[i],{fg:'#1a3a6a'});else if(i===si)setCell(i,cur.length?comp(cur):'?',{bg:'#fff4c8',fg:cur.length?'#2a1e14':'#b8a888'});else setCell(i,'',{})}};
  const kb=(arr,col)=>arr.map(ch=>`<button data-k="${ch}" style="width:30px;height:34px;margin:2px;font:19px 'Do Hyeon',sans-serif;border:0;border-radius:8px;cursor:pointer;background:${col};color:#22201a">${ch}</button>`).join('');
  const stage=()=>['첫소리','가운뎃소리','끝소리'][pi];
  const render=()=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f8d880">ㄱ 한글 짓기</b><div style="font-size:12px;margin:2px 0">${rd+1} / ${RD} 낱말 · 실수 ${miss}</div><div style="font:22px 'Do Hyeon',sans-serif;letter-spacing:4px;margin:2px 0">${word().split('').map((c,i)=>i<si?`<span style="color:#8ac0f8">${c}</span>`:i===si?`<u>${c}</u>`:c).join('')}</div><div style="font-size:12px;color:#f8d880">「${word()[si]}」의 ${stage()}를 눌러요</div><div style="margin-top:4px">${kb(CONS,'#e8d8b0')}</div><div>${kb(VOW,'#b8d8e8')}</div><div style="font-size:12px;color:#f8c8a0;min-height:16px">${msg}</div>`;d.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>tap(b.dataset.k));drawWall()};
  const tap=ch=>{if(done)return;const sq=seq();if(ch===sq[pi]){cur.push(ch);pi++;snd(520+pi*120,.08);msg='';if(pi>=sq.length){snd(880,.15);si++;pi=0;cur=[];if(si>=word().length){drawWall();rd++;si=0;msg=`「${list[rd-1]}」 다 지었어요!`;if(rd>=RD){fin();return}}}render()}else{miss++;snd(160,.2,'square');const want=sq[pi];msg=pi===0||pi===2?(JUNG.includes(ch)?'지금은 닿소리(자음) 차례예요':'다른 닿소리예요. 소리 내어 읽어 봐요'):(CONS.includes(ch)?'지금은 홀소리(모음) 차례예요':'다른 홀소리예요');render()}};
  const fin=()=>{if(done)return;done=true;const Q=Math.max(0,Math.min(100,100-miss*6));const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('sejong_hangul',Q,'한글 짓기')}catch(e){}window.__SJQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f8d880">낱말 다섯 다 지었어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">세종대왕은 1443년 훈민정음을 만들고 1446년 펴냈어요. 닿소리 열일곱, 홀소리 열하나, 스물여덟 자로 첫소리·가운뎃소리·끝소리를 모아 어떤 소리든 적을 수 있게 했어요.</div><div style="font-size:24px;color:#c8a860">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a860;color:#22201a;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__SJHAN()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  render();window.__SJG={tap,get done(){return done},auto:()=>{let s=0;while(!done&&s<200){tap(seq()[pi]);s++}},get miss(){return miss}};try{ctx.say('낱자를 모아 글자를 지어요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'빗살무늬 토기 조각',h:'둔산 선사 사람들이 쓰던 빗살무늬 토기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.24,.04,.18),M(0x9a7050)))})},
  {n:'간돌검',h:'돌을 갈아 만든 청동기 시대 칼이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.06,.02,.4),M(0x6a6a62)))})},
  {n:'백제 기와',h:'계족산성에서 나온 백제 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18,1,false,0,Math.PI),M(0x5a5a5a)))})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__SJDIG=()=>{window.__DETECT&&window.__DETECT({key:'sejong_dig',title:'세종·대전 발굴 탐지',emoji:'⛏️',bg:'#22201a',count:4,TL:150,cand:[[30,30],[50,10],[-20,40],[40,-30],[-60,30],[10,50],[60,40],[-10,-30]],items:ITEMS,intro:'땅속에 선사 시대부터의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'대전·세종은 선사 움집에서 백제 산성까지 이어진 고장이에요.'})};
 const meta={quest:{t:'세종·대전 둘러보기',d:'한글 마당과 계족산성, 둔산 움집을 둘러보세요.',steps:[['한글 마당','한글 마당'],['계족산성','대전 계족산성'],['둔산 움집','둔산 선사 유적']]},
  title:'세종·대전 한글 마당·계족산성',hint:'한글 마당과 계족산성·둔산 움집·비암사를 공개 사진으로 간추려 지었어요. 낱자를 모아 글자를 지어 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-4,z:20,lines:['세종·대전','한글 마당','계족산성 · 둔산 움집','간추려 지음']}},
  npc:[['science',[[-8,16],[4,16],[4,26],[-8,26]]]],bounds:[-90,90,-90,90],level:()=>'세종',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#d8ccb0';g.beginPath();g.arc(X(HX),Z(HZ),14*S,0,7);g.fill();g.fillStyle='#8a8478';g.fillRect(X(KX-24),Z(KZ-1.5),48*S,3*S);g.fillStyle='#b89a58';g.beginPath();g.arc(X(DX),Z(DZ),4*S,0,7);g.fill();g.fillStyle='#8a6a44';g.fillRect(X(BX-4.5),Z(BZ-.5),9*S,2*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:24,yaw:Math.PI},size:{}},meta)}
