/* 해남 우수영·울돌목 마당(2026-11-21): 공개 실측 3D(CC BY)가 없어 공개 수치로 간추려 지음.
   울돌목(명량): 해남 우수영과 진도 사이 좁은 물길(가장 좁은 곳 약 300m), 물살이 울며 소용돌이친다고 「울돌목」. 1597년 이순신이 13척으로 이긴 명량해전의 바다.
   우수영 강강술래: 달 밝은 밤 여인들이 손잡고 둥글게 돌며 부르는 놀이(국가무형유산, 유네스코 인류무형유산). 우수영 일대에서 크게 전해 옴.
   놀이: 달밤 강강술래(점점 빨라지는 장단에 맞춰 손뼉), 발굴 탐지, 밤 보름달. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildUsuyeong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1597);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 북쪽 해남 언덕, 남쪽(z>40) 울돌목 물길, 건너편 진도 언덕 */
 const SZ0=40,SZ1=110;const H=(x,z)=>{if(z>SZ0&&z<SZ1)return -2;if(z>=SZ1)return Math.min(14,(z-SZ1)*.4);return Math.min(16,Math.max(0,(-z-10)*.18))+Math.max(0,(x+50)*-.1)};
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(300,300,150,150);g.rotateX(-Math.PI/2);g.translate(0,0,30);const p=g.attributes.position;const col=[];const c=new THREE.Color();
  for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);const h=H(x,z);p.setY(k,h<0?-3:h);const yard=Math.hypot(x,z-10)<13;const shore=z>SZ0-6&&z<=SZ0||(z>=SZ1&&z<SZ1+5);c.set(yard?'#c8b894':shore?'#a89a7a':'#5f8a3a');col.push(c.r,c.g,c.b)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1}));m.receiveShadow=true;G.add(m)}
 /* 울돌목 물: 흐르는 물결 + 소용돌이 */
 const WT=tex(256,256,(q,w,h)=>{q.fillStyle='#2f6a7a';q.fillRect(0,0,w,h);for(let i=0;i<300;i++){q.strokeStyle=`rgba(220,240,240,${.1+r()*.2})`;q.lineWidth=1+r()*2;const x=r()*w,y=r()*h;q.beginPath();q.moveTo(x,y);q.quadraticCurveTo(x+15,y-6,x+30+r()*20,y);q.stroke()}},[8,3]);WT.wrapS=WT.wrapT=THREE.RepeatWrapping;
 const water=new THREE.Mesh(new THREE.PlaneGeometry(400,SZ1-SZ0+10),new THREE.MeshStandardMaterial({map:WT,roughness:.15,metalness:.2}));water.rotation.x=-Math.PI/2;water.position.set(0,-.4,(SZ0+SZ1)/2);G.add(water);
 const WH=[];{const sm=new THREE.MeshBasicMaterial({color:0xe8f4f4,transparent:true,opacity:.45,depthWrite:false,side:THREE.DoubleSide});for(const[x,z,rr]of[[-20,70,9],[24,78,7],[60,66,6],[-60,84,8]]){const g=new THREE.Group();for(let k=0;k<3;k++){const ring=new THREE.Mesh(new THREE.RingGeometry(rr*(.4+k*.25),rr*(.46+k*.25),40,1,0,Math.PI*1.4),sm);ring.rotation.x=-Math.PI/2;ring.rotation.z=k;g.add(ring)}g.position.set(x,-.3,z);G.add(g);WH.push(g)}}
 solids.push({x0:-200,x1:200,y0:-6,y1:1.5,z0:SZ0,z1:SZ1});
 /* 우수영 성터 돌담·망해루 */{const sm=M(0x8a8478);for(let i=0;i<10;i++){const a=-.2-i*.3;const x=-30+Math.cos(a)*42,z=-30+Math.sin(a)*42;const y=H(x,z);const b=new THREE.Mesh(new THREE.BoxGeometry(13,2.2,1.4),sm);b.position.set(x,y+1.1,z);b.rotation.y=-a+Math.PI/2;G.add(b);solids.push({cx:x,cz:z,r:3,y0:y,y1:y+2.2})}
  if(!mini){const y=H(-40,-30);const h=buildHall({x:-40,z:-30,ry:0,W:8,D:6,nx:3,nz:2,FY:.6,PH:3.2,loft:{h:2.2,stone:true},roof:'hip',name:'望海樓',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',rail:true,stairs:'none',solids:[],light:false});h.group.position.y=y;G.add(h.group);solids.push({x0:-44,x1:-36,y0:y,y1:y+4,z0:-33,z1:-27})}}
 /* 바닷가 소나무 */{const tm=M(0x5a4030),lm=M(0x2f5a2c);for(let i=0;i<50;i++){const x=-140+r()*280,z=-100+r()*130;if(Math.hypot(x,z-10)<18||Math.hypot(x+40,z+30)<10)continue;const y=H(x,z);const t=new THREE.Mesh(new THREE.CylinderGeometry(.2,.32,5,6),tm);t.position.set(x,y+2.5,z);G.add(t);for(let k=0;k<3;k++){const cc=new THREE.Mesh(new THREE.ConeGeometry(2-k*.5,2,7),lm);cc.position.set(x,y+4.2+k*1.1,z);cc.castShadow=true;G.add(cc)}solids.push({cx:x,cz:z,r:.4,y0:y,y1:y+8})}
  for(let i=0;i<30;i++){const x=-140+r()*280,z=SZ1+8+r()*60;const y=H(x,z);const t=new THREE.Mesh(new THREE.ConeGeometry(2,5,7),lm);t.position.set(x,y+2.5,z);G.add(t)}}
 /* 강강술래 마당: 둥근 마당 + 여인 열둘(한복) */
 const KX=0,KZ=10,KR=7;const DANCERS=[];{const cols=[0xf0e8d8,0xe86a7a,0x6a8ae0,0xf0d060,0x8ad09a];for(let i=0;i<12;i++){const g=new THREE.Group();const sk=new THREE.Mesh(new THREE.ConeGeometry(.55,1.3,12),M(cols[i%5],{roughness:.6}));sk.position.y=.65;g.add(sk);const jg=new THREE.Mesh(new THREE.CylinderGeometry(.2,.28,.45,10),M(0xf4f0e8));jg.position.y=1.45;g.add(jg);const hd=new THREE.Mesh(new THREE.SphereGeometry(.2,12,10),M(0xe8c8a0));hd.position.y=1.85;g.add(hd);const hr=new THREE.Mesh(new THREE.SphereGeometry(.21,12,10,0,Math.PI*2,0,Math.PI/2),M(0x1a1410));hr.position.y=1.88;g.add(hr);for(const s of[-1,1]){const ar=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.7,6),M(0xf4f0e8));ar.position.set(s*.4,1.4,0);ar.rotation.z=s*1.2;g.add(ar)}G.add(g);DANCERS.push(g)}}
 /* 보름달 */const moon=new THREE.Mesh(new THREE.SphereGeometry(10,24,16),new THREE.MeshBasicMaterial({color:0xfff4d0,fog:false}));moon.position.set(-80,90,-260);moon.visible=false;G.add(moon);
 const moonL=new THREE.PointLight(0xfff0d0,0,40,1.2);moonL.position.set(KX,8,KZ);G.add(moonL);
 /* 밤 */
 let nk=0,ang=0,spin=.25,tt=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);moon.visible=nk>.2;moonL.intensity=nk*6;tt+=dt;WT.offset.x+=dt*.06;for(let i=0;i<WH.length;i++)WH[i].rotation.y+=dt*(.5+i*.15);ang+=dt*spin;DANCERS.forEach((g,i)=>{const a=ang+i/12*Math.PI*2;g.position.set(KX+Math.cos(a)*KR,H(KX,KZ)+Math.abs(Math.sin(tt*spin*12+i))*.08,KZ+Math.sin(a)*KR);g.rotation.y=-a})};
 /* 안내 */
 const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(10,SZ0-6,3.4,'울돌목','해남과 진도 사이 좁은 바닷길이에요. 물살이 빨라 바다가 우는 소리를 낸다고 「울돌목」이라 불러요. 1597년 이순신 장군이 이 물살을 이용해 명량해전을 이긴 바다예요. 간추려 지었어요.');
 sp(-34,-24,3,'망해루','우수영(전라우수영) 성터 높은 곳에서 바다를 내려다보는 누각이에요.');
 sp(KX+KR+4,KZ,3,'강강술래 마당','달 밝은 밤 여인들이 손잡고 둥글게 돌며 부르는 강강술래(국가무형유산, 유네스코 인류무형유산)가 이곳 우수영에서 크게 전해 와요.');
 sp(KX+KR+3,KZ+4,1.8,'강강술래 함께 도는 자리','무이도 손잡고 강강술래를 돌아 봐요.');
 sp(-24,-6,2.4,'발굴 탐지 자리','우수영 땅속에 옛 수군 진영의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 달밤 강강술래(11/21): 북 장단에 맞춰 손뼉. 느린 → 중간 → 자진(빠름) 세 마디, 박자마다 고리가 가장 밝을 때 누르기 */
 window.__USGANG=()=>{if(document.getElementById('usP'))return;const H3=window.__H3,ctx=H3.ctx();
  const STG=[[.9,8,.25,'느린 강강술래'],[.65,10,.45,'중강강술래'],[.42,14,.75,'자진강강술래']];let si=0,beat=0,nextT=0,hits=0,total=0,lastPress=-9,done=false;const t0=performance.now()/1000;nextT=t0+1.5;
  const ring=new THREE.Mesh(new THREE.RingGeometry(KR-.4,KR+.4,48),new THREE.MeshBasicMaterial({color:0xffe08a,transparent:true,opacity:.2,depthWrite:false,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.set(KX,H(KX,KZ)+.06,KZ);G.add(ring);
  window.__GCAM=()=>document.getElementById('usP')?[KX+12,7,KZ+12,KX,1,KZ,50]:null;
  const d=document.createElement('div');d.id='usP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1a1e2e;border:3px solid #ffe08a;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef0f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffe08a">🌕 달밤 강강술래</b><div id="usS" style="font:16px 'Do Hyeon',sans-serif;margin:4px 0">느린 강강술래</div><div id="usG" style="font-size:13px;color:#ffe08a">북이 「둥」 할 때 손뼉!</div><button id="usB" style="font:20px 'Do Hyeon',sans-serif;background:#ffe08a;color:#1a1e2e;border:0;border-radius:12px;padding:10px 18px;margin:6px 0;cursor:pointer;width:100%">👏 손뼉</button><div id="usC" style="font-size:13px">맞힌 박자 0</div>`;const Sx=d.querySelector('#usS'),Gd=d.querySelector('#usG'),Cc=d.querySelector('#usC');
  const drum=(hi)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='sine';o.frequency.setValueAtTime(hi?150:95,s);o.frequency.exponentialRampToValueAtTime(55,s+.25);gg.gain.setValueAtTime(.16,s);gg.gain.exponentialRampToValueAtTime(.0001,s+.35);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+.4)}catch(e){}};
  const clap=()=>{try{const AC=ctx.ac();if(!AC)return;const len=.08;const b=AC.createBuffer(1,AC.sampleRate*len,AC.sampleRate),dd=b.getChannelData(0);for(let i=0;i<dd.length;i++)dd[i]=(Math.random()*2-1)*Math.pow(1-i/dd.length,4);const src=AC.createBufferSource();src.buffer=b;const f=AC.createBiquadFilter();f.type='bandpass';f.frequency.value=1500;const gg=AC.createGain();gg.gain.value=.5;src.connect(f).connect(gg).connect(ctx.out()||AC.destination);src.start()}catch(e){}};
  let lastBeat=-9,beatHit=false;
  const press=()=>{if(done)return;clap();const now=performance.now()/1000;const per=STG[si][0];const dtb=Math.min(Math.abs(now-lastBeat),Math.abs(now-nextT));if(dtb<Math.min(.16,per*.3)&&!beatHit){hits++;beatHit=true;Gd.textContent='좋아요!';Cc.textContent='맞힌 박자 '+hits}else Gd.textContent='북이 「둥」 할 때!';lastPress=now};
  d.querySelector('#usB').onclick=press;const onKey=e=>{if(e.code==='Space'){e.preventDefault();press()}};addEventListener('keydown',onKey);
  const fin=()=>{if(done)return;done=true;removeEventListener('keydown',onKey);spin=.25;G.remove(ring);const Q=Math.round(hits/total*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('usuyeong_ganggang',Q,'달밤 강강술래')}catch(e){}window.__USQ=Q;
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffe08a">${total}박자 가운데 ${hits}박자!</b><div style="font-size:13px;margin:4px 0">강강술래는 느리게 시작해 점점 빨라지다 마지막엔 뛰듯이 돌아요. 「강강술래~」 하는 받는소리를 다 같이 부르며, 고사리 꺾기·청어 엮기 같은 놀이도 섞어 했어요.</div><div style="font-size:26px;color:#ffe08a">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#ffe08a;color:#1a1e2e;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef0f8;border:2px solid #eef0f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__USGANG(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},500)};
  const loop=()=>{if(!d.isConnected){removeEventListener('keydown',onKey);spin=.25;G.remove(ring);return}const now=performance.now()/1000;
   if(!done){spin=STG[si][2];if(now>=nextT){drum(beat%2===0);lastBeat=nextT;nextT+=STG[si][0];beat++;total++;beatHit=false;if(beat>=STG[si][1]){si++;beat=0;if(si>=STG.length){fin()}else{Sx.textContent=STG[si][3];try{ctx.say(STG[si][3]+'!',1.2)}catch(e){}}}}
    const ph=1-Math.min(1,(now-lastBeat)/.25);ring.material.opacity=.15+ph*.6}
   /* 무이도 원 위에서 함께 돎 */try{const a=ang+Math.PI*2*12.5/12;const P=H3.P;P.x=KX+Math.cos(a)*KR;P.z=KZ+Math.sin(a)*KR}catch(e){}
   requestAnimationFrame(loop)};loop();
  window.__USG={press,get nextT(){return nextT},get lastBeat(){return lastBeat},get hits(){return hits},get total(){return total}};try{ctx.say('보름달이 떴어요! 손잡고 강강술래를 돌아요.',2.4)}catch(e){}};
 /* 발굴 탐지 */
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'수군 진영 기와',h:'전라우수영 건물 지붕의 기와 조각이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.3,12,1,true,0,Math.PI),M(0x5a5a58,{side:THREE.DoubleSide}));m.rotation.z=Math.PI/2;g.add(m)})},
  {n:'철 화살촉',h:'수군이 쓰던 화살촉이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.ConeGeometry(.04,.22,4),M(0x3a3a3e,{metalness:.6}));m.rotation.z=Math.PI/2;g.add(m)})},
  {n:'백자 사발',h:'진영 사람들이 쓰던 그릇 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.18,14,8,0,Math.PI*2,Math.PI/2,Math.PI/2),M(0xf0ece0,{side:THREE.DoubleSide})))})},
  {n:'상평통보',h:'조선 후기 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})},
  {n:'닻돌',h:'배를 멈추게 바다 밑에 내리던 돌 닻이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.4,.14,.2),M(0x6a6660));g.add(m);const h=new THREE.Mesh(new THREE.TorusGeometry(.06,.02,6,12),M(0x6a6660));h.position.y=.1;g.add(h)})}];
 window.__USDIG=()=>{window.__DETECT&&window.__DETECT({key:'usuyeong_dig',title:'우수영 발굴 탐지',emoji:'⛏️',bg:'#1a1e2e',count:4,TL:150,cand:[[-24,-6],[20,-10],[-50,-10],[30,20],[-20,24],[44,0],[-60,20],[10,-30]],items:ITEMS,intro:'우수영 땅속에 옛 수군 진영의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'전라우수영은 조선 수군의 큰 진영이라 기와와 무기, 생활 그릇이 함께 나와요.'})};
 const meta={quest:{t:'우수영 둘러보기',d:'울돌목과 강강술래 마당을 둘러보세요.',steps:[['울돌목','울돌목'],['망해루','망해루'],['강강술래','강강술래 마당']]},
  title:'해남 우수영·울돌목',hint:'물살이 우는 울돌목과 강강술래의 고장 우수영을 공개 수치로 간추려 지었어요. 밤에 보름달이 뜨면 더 좋아요. 강강술래를 함께 돌아 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:true,groundY:-3.5,sign:{x:18,z:20,lines:['해남 우수영·울돌목','명량의 바다','강강술래(유네스코)','간추려 지음']}},
  npc:[['science',[[12,18],[22,18],[22,26],[12,26]]]],bounds:[-120,120,-100,SZ0],level:()=>'우수영',camCap:()=>Infinity,baseAt:(x,z)=>Math.max(0,H(x,z)),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.1,ox:0,oz:10,draw(g,X,Z,S){g.fillStyle='#5f8a3a';g.fillRect(0,0,300,300);g.fillStyle='#2f6a7a';g.fillRect(0,Z(SZ1),300,(SZ1-SZ0)*S);g.fillStyle='#c8b894';g.beginPath();g.arc(X(KX),Z(KZ),13*S,0,7);g.fill();g.fillStyle='#9a3a26';g.fillRect(X(-44),Z(-27),8*S,6*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:20,z:30,yaw:-Math.PI*.75},size:{}},meta)}
