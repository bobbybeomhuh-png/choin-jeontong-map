/* 동해 마당(2026-11-22, W59): 추암 촛대바위와 해암정, 무릉계곡 무릉반석·삼화사.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음.
   추암 촛대바위: 바닷가에 촛대처럼 솟은 바위. 해가 바위 끝에 걸리는 일출로 이름남. 해암정: 고려 때 처음 지었다는 바닷가 정자.
   무릉계곡: 수백 명이 앉을 만한 너럭바위 무릉반석과 쌍폭포, 계곡 입구의 삼화사.
   놀이: 촛대바위 일출 찍기(바닷가를 옮겨 다니며 해가 바위 끝에 딱 걸릴 때 찰칵), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildDonghae(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1361);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[50,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(140,200),new THREE.MeshStandardMaterial({map:GT,color:0x8a9a5a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.position.x=-50;gr.receiveShadow=true;G.add(gr)}
 /* 동쪽 모래 해변(x 20~30) + 바다(x>30) */const SEAX=30;{const sand=new THREE.Mesh(new THREE.PlaneGeometry(10,200),M(0xe8dcc0,{roughness:1}));sand.rotation.x=-Math.PI/2;sand.position.set(SEAX-5,.02,0);G.add(sand);const sea=new THREE.Mesh(new THREE.PlaneGeometry(900,900),M(0x2a6a9a,{roughness:.2,metalness:.15}));sea.rotation.x=-Math.PI/2;sea.position.set(SEAX+450,.03,0);G.add(sea)}
 /* 촛대바위 무리(바다 쪽 멀리, x 140) */const RX=140,RZ=-10,RH=10;const RKM=M(0x8a8478,{flatShading:true,roughness:.95});{const c=new THREE.Mesh(new THREE.CylinderGeometry(.9,1.6,RH,7),RKM);c.position.set(RX,RH/2,RZ);G.add(c);const cap=new THREE.Mesh(new THREE.DodecahedronGeometry(1,0),RKM);cap.scale.set(.9,.7,.9);cap.position.set(RX,RH,RZ);G.add(cap);for(const[dx,dz,h,w]of[[-6,6,6,2.4],[-3,10,4,2],[5,-8,7,3],[9,-4,3,2.6],[-9,-6,5,2.2],[2,14,3.5,2.8]]){const s=new THREE.Mesh(new THREE.CylinderGeometry(w*.45,w,h,7),RKM);s.position.set(RX+dx,h/2,RZ+dz);s.rotation.y=r()*3;G.add(s)}}
 /* 해암정: 해변 언덕 위 정자 */const HX=10,HZ=-30;if(!mini){const h=buildHall({x:HX,z:HZ,ry:-Math.PI/2,W:6,D:4.6,nx:3,nz:2,FY:.9,PH:2.8,roof:'hip',name:'海巖亭',pillar:0x9a3a26,bracket:'ik',front:'open',roofScale:.95,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 /* 무릉계곡: 서쪽 큰 너럭바위 + 물길 + 쌍폭포 + 삼화사 */const MX=-46,MZ=-6;{const slab=new THREE.Mesh(new THREE.CylinderGeometry(14,15,1,10),M(0xd8d0c0,{flatShading:true,roughness:.8}));slab.scale.z=.6;slab.position.set(MX,.3,MZ);G.add(slab);const LT=tex(256,64,(q,w,h)=>{q.fillStyle='rgba(0,0,0,0)';q.clearRect(0,0,w,h);q.fillStyle='#5a5248';q.font='bold 40px serif';q.textAlign='center';q.fillText('武陵仙源',w/2,46)});const cal=new THREE.Mesh(new THREE.PlaneGeometry(6,1.5),new THREE.MeshStandardMaterial({map:LT,transparent:true}));cal.rotation.x=-Math.PI/2;cal.position.set(MX+2,.82,MZ+2);G.add(cal);
  const st=new THREE.Mesh(new THREE.PlaneGeometry(5,90),M(0x6aa0b8,{roughness:.15}));st.rotation.set(-Math.PI/2,0,.2);st.position.set(MX-4,.04,MZ-20);G.add(st);
  for(const dx of[-4,4]){const cl=new THREE.Mesh(new THREE.BoxGeometry(6,14,4),M(0x7a7468,{flatShading:true}));cl.position.set(MX+dx*3,7,MZ-48);G.add(cl);const fall=new THREE.Mesh(new THREE.PlaneGeometry(1.4,12),new THREE.MeshStandardMaterial({color:0xeef6fa,transparent:true,opacity:.85,emissive:0x203040}));fall.position.set(MX+dx*3,6.5,MZ-45.9);G.add(fall)}
  if(!mini){const h=buildHall({x:MX+16,z:MZ-30,ry:0,W:9,D:6,nx:3,nz:2,FY:1,PH:3.2,roof:'gable',name:'三和寺',pillar:0x9a3a26,bracket:'ik',front:'door',roofScale:.95,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
  for(let k=0;k<24;k++){const t=new THREE.Mesh(new THREE.ConeGeometry(1.4,5,7),M(k%4?0x2a4a24:0xc86a24));t.position.set(MX-30+r()*60,2.5,MZ-40-r()*14);G.add(t)}}
 /* 해(일출 놀이 때) */const sun=new THREE.Mesh(new THREE.SphereGeometry(7,24,16),new THREE.MeshBasicMaterial({color:0xffb050,fog:false}));sun.visible=false;G.add(sun);
 const NL=[];if(!mini){for(const[x,y,z]of[[HX,4,HZ],[MX,3,MZ+8],[MX+16,4,MZ-24]]){const L=new THREE.PointLight(0xffc080,0,26,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8)};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(22,-4,3.4,'추암 촛대바위','바다 위에 촛대처럼 우뚝 선 바위예요. 해가 바위 끝에 걸리는 일출이 아름다워 「애국가」 첫 장면에도 나왔어요. 바위는 간추려 멀리 세웠어요.');
 sp(22,4,2.4,'일출 찍는 자리','바닷가를 옮겨 다니며 해가 바위 끝에 딱 걸릴 때 찍어 봐요.');
 sp(HX+5,HZ,3,'해암정','촛대바위 곁 바닷가 정자예요. 고려 때 처음 지었다고 전해요. 간추려 지었어요.');
 sp(MX,MZ+11,3.4,'무릉계곡 무릉반석','수백 명이 앉을 수 있는 너럭바위예요. 바위에는 「무릉선원」 같은 옛 글씨가 새겨져 있어요. 계곡 안쪽엔 쌍폭포가 있어요. 간추려 지었어요.');
 sp(MX+16,MZ-23,3,'삼화사','무릉계곡 입구의 절이에요. 간추려 지었어요.');
 sp(-60,40,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 촛대바위 일출 찍기(11/22): 세 번(사흘 아침). 해는 날마다 조금 다른 자리에서 떠올라요. ◀ ▶를 누르고 있으면 바닷가를 따라 옮겨 가요(가까운 바위만 옆으로 움직이고 먼 해는 그대로예요). 해가 바위 끝에 딱 얹힐 때 「찰칵」 */
 window.__DHSUN=()=>{if(document.getElementById('dhP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(22,4,0)}catch(e){}
  const VX=24,EY=1.6;let pz=-10,dir=0,rd=0,el=-1.2,phi=0,last=performance.now(),done=false,auto=false,shot=false,wait=0,msg='';const res=[];const D2R=Math.PI/180,SR=Math.atan(7/350)/D2R;
  const newDay=()=>{phi=(Math.random()*2-1)*3.2;el=-1.2;shot=false;pz=-10+(Math.random()<.5?-5:5)};newDay();
  window.__GCAM=()=>document.getElementById('dhP')?[VX,EY,pz,VX+100,EY+6,pz,22]:null;sun.visible=true;
  const d=document.createElement('div');d.id='dhP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#2a1e1a;border:3px solid #ffb050;border-radius:16px;padding:10px 14px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#fff4e8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:300px;max-width:94vw;user-select:none;touch-action:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffd090">🌅 촛대바위 일출 찍기</b><div data-i style="margin:4px 0;font:14px 'Do Hyeon',sans-serif"></div><div style="display:flex;gap:6px;margin-top:6px"><button data-l style="flex:1;font:20px 'Do Hyeon',sans-serif;background:#6a4a3a;color:#fff;border:0;border-radius:12px;padding:10px 0;cursor:pointer;touch-action:none">◀</button><button data-c style="flex:1.4;font:20px 'Do Hyeon',sans-serif;background:#e8903a;color:#fff;border:0;border-radius:12px;padding:10px 0;cursor:pointer;touch-action:none">찰칵 📷</button><button data-r style="flex:1;font:20px 'Do Hyeon',sans-serif;background:#6a4a3a;color:#fff;border:0;border-radius:12px;padding:10px 0;cursor:pointer;touch-action:none">▶</button></div><div data-m style="font-size:12px;color:#ffd090;margin-top:5px">해가 바위 바로 위로 오게 옮겨 서요</div>`;
  /* 카메라가 동쪽(+x)을 봐서 화면 왼쪽이 북쪽(-z) */const hold=(el2,v)=>{el2.onpointerdown=e=>{e.preventDefault();dir=v};el2.onpointerup=el2.onpointerleave=el2.onpointercancel=()=>{if(dir===v)dir=0}};hold(d.querySelector('[data-l]'),-1);hold(d.querySelector('[data-r]'),1);
  const iEl=d.querySelector('[data-i]'),mEl=d.querySelector('[data-m]');
  const snd=(f,len,type='sine')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const errs=()=>{const rAz=Math.atan2(RZ-pz,RX-VX)/D2R,rEl=Math.atan2(RH+.6-EY,Math.hypot(RX-VX,RZ-pz))/D2R;return{az:phi-rAz,el:el-(rEl+SR)}};
  const snap=()=>{if(done||shot)return;shot=true;const e=errs();const err=Math.hypot(e.az,e.el);const sc=Math.max(0,1-err/1.6);res.push(sc);snd(1200,.05,'square');snd(900,.08,'square');msg=sc>.85?'딱 걸렸어요! 멋진 사진이에요':sc>.5?`조금 비껴갔어요 (${err.toFixed(1)}도)`:`해와 바위가 떨어져 있어요 (${err.toFixed(1)}도)`;wait=1.6};
  d.querySelector('[data-c]').onpointerdown=e=>{e.preventDefault();snap()};const kd=e=>{if(e.key==='ArrowLeft')dir=-1;if(e.key==='ArrowRight')dir=1;if(e.code==='Space'){e.preventDefault();snap()}},ku=e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight')dir=0};addEventListener('keydown',kd);addEventListener('keyup',ku);
  const cleanup=()=>{removeEventListener('keydown',kd);removeEventListener('keyup',ku);sun.visible=false};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=3){fin();return}newDay();msg='다음 날 아침이에요'}}
   else{el+=dt*.26;const tz=RZ-(RX-VX)*Math.tan(phi*D2R);if(auto){const dd=tz-pz;dir=Math.abs(dd)<.15?0:Math.sign(dd)}pz=Math.max(-40,Math.min(20,pz+dir*3*dt));if(auto&&Math.abs(errs().el)<.08&&Math.abs(errs().az)<.15)snap();if(!shot&&el>9){res.push(0);msg='해가 너무 높이 떴어요';shot=true;wait=1.2}}
   const sd=new THREE.Vector3(Math.cos(el*D2R)*Math.cos(phi*D2R),Math.sin(el*D2R),Math.cos(el*D2R)*Math.sin(phi*D2R));sun.position.set(VX+sd.x*350,EY+sd.y*350,pz+sd.z*350);sun.material.color.setHSL(.08+Math.max(0,el)*.005,1,.6);
   iEl.textContent=`${rd+1} / 3일째 아침 · 해 높이 ${el.toFixed(1)}도`;mEl.textContent=msg||mEl.textContent;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('donghae_sun',Q,'촛대바위 일출 찍기')}catch(e){}window.__DHQ=Q;snd(660,.3);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#ffd090">사흘 일출 사진 ${Q}점</b><div style="font-size:13px;margin:4px 0">해는 아주 멀어서 옆으로 걸어도 제자리지만, 가까운 바위는 걸으면 옆으로 비켜나요(시차). 사진가들은 이 원리로 자리를 옮겨 해를 바위 끝에 얹어요. 해 뜨는 자리는 계절마다 조금씩 옮겨 가요.</div><div style="font-size:24px;color:#ffb050">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#ffb050;color:#2a1e1a;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#fff4e8;border:2px solid #fff4e8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__DHSUN()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__DHG={set auto(v){auto=v},snap,get done(){return done},get res(){return res.slice()}};try{ctx.say('해가 바위 끝에 걸릴 때 찰칵!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'몽돌',h:'파도에 닳아 동글동글해진 바닷가 돌이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.1,12,10),M(0x5a5a58,{roughness:.4}));m.scale.y=.5;g.add(m)})},
  {n:'석회암 조각',h:'동해 둘레 땅을 이루는 석회암 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.DodecahedronGeometry(.09,0),M(0xd8d4c8)))})},
  {n:'막새 기와',h:'삼화사 지붕 끝 기와예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18),M(0x5a5a5a)))})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__DHDIG=()=>{window.__DETECT&&window.__DETECT({key:'donghae_dig',title:'동해 발굴 탐지',emoji:'⛏️',bg:'#2a1e1a',count:4,TL:150,cand:[[-60,40],[-20,30],[0,50],[10,20],[-70,-40],[-10,-20],[-30,50],[5,-55]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'동해는 바다 일출과 계곡의 고장이에요.'})};
 const meta={quest:{t:'동해 둘러보기',d:'촛대바위와 해암정, 무릉계곡을 둘러보세요.',steps:[['촛대바위','추암 촛대바위'],['해암정','해암정'],['무릉반석','무릉계곡 무릉반석']]},
  title:'동해 추암 촛대바위·무릉계곡',hint:'촛대바위·해암정·무릉계곡·삼화사를 공개 사진으로 간추려 지었어요. 바닷가를 옮겨 다니며 해가 바위 끝에 걸릴 때 찍어 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:true,sign:{x:-4,z:16,lines:['동해','추암 촛대바위 일출','무릉계곡 · 삼화사','간추려 지음']}},
  npc:[['science',[[-8,12],[4,12],[4,22],[-8,22]]]],bounds:[-90,29,-90,90],level:()=>'동해',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a5a';g.fillRect(0,0,300,300);g.fillStyle='#e8dcc0';g.fillRect(X(20),0,10*S,300);g.fillStyle='#2a6a9a';g.fillRect(X(30),0,300,300);g.fillStyle='#d8d0c0';g.beginPath();g.ellipse(X(MX),Z(MZ),14*S,8.4*S,0,0,7);g.fill();g.fillStyle='#9a3a26';g.fillRect(X(HX-2.3),Z(HZ-3),4.6*S,6*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:20,yaw:Math.PI},size:{}},meta)}
