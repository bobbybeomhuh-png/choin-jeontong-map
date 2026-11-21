/* 익산 나바위성당 마당(2026-11-22, 익산 덧붙이기 E6): 스케치팹 lacomi1975 드론 사진 측량(CC BY 4.0) 「Nabawi Shrine, Iksan(나바위성당)」을 실제 크기로(집 크기로 맞춰 1단위≈36m, 약 320×275m).
   나바위성당(사적): 1906년 지은 한옥과 서양식이 어우러진 성당(1916 벽돌 벽으로 고침). 1845년 김대건 신부가 중국 상하이에서 사제가 된 뒤 작은 배 라파엘호를 타고 풍랑을 헤쳐 제주를 거쳐 이곳 황산(나바위) 나루에 닿았음. 성당 뒤 화산 꼭대기 너른 바위(나바위)에 정자 망금정.
   놀이: 라파엘호 균형 잡기(풍랑에 기우는 배를 바로 세우며 나아가기), 발굴 탐지, 밤 등(photosite). */
import {photoSite} from './photosite.js';
const SRC='(3D: lacomi1975, Sketchfab, CC BY 4.0)';
export function buildNabawi(opts={}){return photoSite('nabawi',opts,{h0:2,groundY:-13,groundColor:0x6a6a50,
 title:'익산 나바위성당',hint:'한옥과 서양식이 어우러진 나바위성당과 마을을 드론 실측 그대로 실제 크기로 놓았어요. 풍랑 속 라파엘호의 균형을 잡아 봐요. '+SRC,
 quest:{t:'나바위 둘러보기',d:'성당과 화산 언덕, 나루 쪽 들판을 둘러보세요.',steps:[['성당','나바위성당'],['화산','화산 나바위'],['나루','황산 나루']]},
 spawn:{x:26,z:6,yaw:Math.PI*.8},bounds:[-160,140,-105,160],level:'익산',env:{fog:[120,520],groundY:-13.1,noHills:true,sign:{x:30,z:10,y:2,lines:['익산 나바위성당','한옥 성당(사적) · 1906','김대건 신부가 닿은 나루','드론 실측 3D']}},
 npc:[['science',[[22,8],[30,8],[30,14],[22,14]]]],
 build({G,spots,hAt,THREE}){
  const sp=(x,z,r,t,h)=>spots.push({x,y:hAt(x,z),z,r,t,h});
  sp(34,-30,4,'나바위성당','1906년 한옥으로 지은 성당이에요(사적). 기와 지붕과 서양식 종탑·벽돌 벽이 어우러졌고, 안에는 남녀 자리를 나누던 기둥 줄이 남아 있어요. '+SRC);
  sp(-60,-40,5,'화산 나바위','성당 뒤 언덕 꼭대기에 「너른 바위」가 있어 마을 이름이 나바위가 됐어요. 바위 위 정자 망금정에서 금강 들판이 내려다보여요.');
  sp(40,40,4,'황산 나루','옛날엔 금강 물이 이 앞까지 들어와 배가 닿았어요. 1845년 10월 김대건 신부가 탄 라파엘호가 이 나루에 몰래 닿았어요.');
  sp(26,-2,2.2,'라파엘호 타는 곳','길이 약 8m의 작은 목선 라파엘호는 상하이에서 오는 길에 큰 풍랑을 만났어요. 배의 균형을 잡아 나바위까지 가 봐요.');
  /* 라파엘호 균형 잡기(11/22): 물결이 배를 기울여요. ◀▶로 몸을 반대쪽으로 실어 배를 바로 세우면 앞으로 나아가요. 너무 기울면(40도) 물이 들어와 뒤로 밀려요. 70초, 300리 */
  window.__NBBOAT=()=>{if(document.getElementById('nbP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(26,-2,0)}catch(e){}
   const cv=document.createElement('canvas');cv.id='nbC';cv.style.cssText='position:fixed;inset:0;z-index:55;width:100%;height:100%;touch-action:none';document.body.appendChild(cv);const q=cv.getContext('2d');cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio;
   let tilt=0,vel=0,dist=0,done=false,t0=performance.now()/1000,last=t0,keyL=false,keyR=false,wave=0,gust=0,gustT=1.5,spills=0,wph=0;const GOAL=300,TL=70;
   const d=document.createElement('div');d.id='nbP';d.style.cssText="position:fixed;right:12px;top:90px;z-index:60;background:#14202a;border:3px solid #7aa8c8;border-radius:16px;padding:10px 14px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#e8f2f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:210px;user-select:none";document.body.appendChild(d);
   d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#b8d8f0">⛵ 라파엘호 균형 잡기</b><div id="nbS" style="font:17px 'Do Hyeon',sans-serif;margin:4px 0">0 / ${GOAL}리</div><div style="height:8px;background:#223;border-radius:4px;overflow:hidden"><div id="nbB" style="height:100%;width:0;background:#7aa8c8"></div></div><div id="nbG" style="font-size:12px;color:#b8d8f0;margin-top:4px">배가 기울면 반대쪽 버튼을 눌러요</div><div id="nbT" style="font-size:13px">${TL}초</div>`;
   const pad=document.createElement('div');pad.id='nbPad';pad.style.cssText='position:fixed;left:0;right:0;bottom:24px;z-index:61;display:flex;justify-content:space-between;padding:0 18px;pointer-events:none';pad.innerHTML=`<button id="nbL" style="pointer-events:auto;font:28px sans-serif;width:72px;height:72px;border-radius:50%;border:0;background:rgba(60,110,150,.85);color:#fff">◀</button><button id="nbR" style="pointer-events:auto;font:28px sans-serif;width:72px;height:72px;border-radius:50%;border:0;background:rgba(60,110,150,.85);color:#fff">▶</button>`;document.body.appendChild(pad);
   const hold=(id,on)=>{const b=pad.querySelector(id);b.onpointerdown=e=>{e.preventDefault();on(true)};b.onpointerup=b.onpointerleave=()=>on(false)};hold('#nbL',v=>keyL=v);hold('#nbR',v=>keyR=v);
   const onKey=e=>{if(e.code==='ArrowLeft'||e.code==='KeyA'){keyL=e.type==='keydown';e.preventDefault()}if(e.code==='ArrowRight'||e.code==='KeyD'){keyR=e.type==='keydown';e.preventDefault()}};addEventListener('keydown',onKey,true);addEventListener('keyup',onKey,true);
   const snd=(f,len,type='sine')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
   const cleanup=()=>{removeEventListener('keydown',onKey,true);removeEventListener('keyup',onKey,true);cv.remove();pad.remove()};
   const fin=()=>{if(done)return;done=true;cleanup();const ok=dist>=GOAL;const el=performance.now()/1000-t0;const Q=ok?Math.max(60,Math.round(100-spills*6-Math.max(0,el-45)*.6)):Math.round(dist/GOAL*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('nabawi_boat',Q,'라파엘호 균형 잡기')}catch(e){}window.__NBQ=Q;
    d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#b8d8f0">${ok?'나바위 나루에 닿았어요!':Math.round(dist)+'리까지 왔어요'}</b><div style="font-size:13px;margin:4px 0">라파엘호는 돛대가 부러지고 키를 잃은 채 제주 바다까지 떠밀렸다가, 다시 금강을 거슬러 1845년 10월 12일 이곳 나바위에 닿았어요.</div><div style="font-size:24px;color:#7aa8c8">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#7aa8c8;color:#14202a;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#e8f2f8;border:2px solid #e8f2f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__NBBOAT()};d.querySelector('[data-x]').onclick=()=>d.remove()};
   const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}const now=performance.now()/1000,dt=Math.min(.05,now-last);last=now;wph+=dt;
    if(!done){gustT-=dt;if(gustT<=0){gust=(Math.random()<.5?-1:1)*(25+Math.random()*25+Math.min(25,(now-t0)*.4));gustT=1.2+Math.random()*1.6}
     const torque=gust+Math.sin(wph*1.7)*14+(keyL?-70:0)+(keyR?70:0)+tilt*.6;vel+=torque*dt;vel*=Math.pow(.35,dt);tilt+=vel*dt;tilt=Math.max(-60,Math.min(60,tilt));
     const a=Math.abs(tilt);if(a<15)dist+=dt*9;else if(a<30)dist+=dt*4;if(a>=40){dist=Math.max(0,dist-dt*12);if(!wave){spills++;snd(150,.5,'sawtooth');d.querySelector('#nbG').textContent='물이 들어와요! 반대로 실어요'}wave=1}else{if(wave)d.querySelector('#nbG').textContent='좋아요, 바로 섰어요';wave=0}
     d.querySelector('#nbS').textContent=Math.min(GOAL,Math.round(dist))+' / '+GOAL+'리';d.querySelector('#nbB').style.width=Math.min(100,dist/GOAL*100)+'%';if(dist>=GOAL)fin();const left=Math.max(0,TL-(now-t0));d.querySelector('#nbT').textContent=Math.ceil(left)+'초';if(left<=0)fin()}
    const W=cv.width,Hh=cv.height;q.clearRect(0,0,W,Hh);const gr=q.createLinearGradient(0,0,0,Hh);gr.addColorStop(0,'rgba(40,50,70,.85)');gr.addColorStop(1,'rgba(20,40,60,.9)');q.fillStyle=gr;q.fillRect(0,0,W,Hh);
    const cy=Hh*.62,S=Math.min(W,Hh)/10;q.save();q.translate(W/2,cy+Math.sin(wph*2)*S*.1);q.rotate(tilt*Math.PI/180);
    q.fillStyle='#6a4a2a';q.beginPath();q.moveTo(-S*2.2,-S*.2);q.lineTo(S*2.2,-S*.2);q.lineTo(S*1.6,S*.7);q.lineTo(-S*1.6,S*.7);q.closePath();q.fill();q.fillStyle='#8a6a40';q.fillRect(-S*2.2,-S*.3,S*4.4,S*.15);
    q.fillStyle='#4a3420';q.fillRect(-S*.06,-S*2.8,S*.12,S*2.6);q.fillStyle='#e8dcc0';q.beginPath();q.moveTo(S*.08,-S*2.6);q.lineTo(S*1.3,-S*.6);q.lineTo(S*.08,-S*.6);q.closePath();q.fill();
    q.fillStyle='#f0e0c8';q.beginPath();q.arc(-S*.8,-S*.6,S*.22,0,7);q.fill();q.fillStyle='#1a1a1a';q.fillRect(-S*1.05,-S*.95,S*.5,S*.12);q.restore();
    q.fillStyle='rgba(60,110,150,.9)';q.beginPath();q.moveTo(0,Hh);for(let x=0;x<=W;x+=W/40)q.lineTo(x,cy+S*.45+Math.sin(x/W*12+wph*3)*S*.18);q.lineTo(W,Hh);q.fill();
    q.strokeStyle='rgba(255,255,255,.5)';q.lineWidth=3;q.beginPath();q.arc(W/2,Hh*.2,S*.9,Math.PI*1.1,Math.PI*1.9);q.stroke();q.save();q.translate(W/2,Hh*.2);q.rotate(tilt*Math.PI/180);q.strokeStyle=Math.abs(tilt)>=40?'#ff6040':Math.abs(tilt)>=15?'#ffd040':'#80e080';q.lineWidth=5;q.beginPath();q.moveTo(0,0);q.lineTo(0,-S*.9);q.stroke();q.restore();
    requestAnimationFrame(loop)};loop();
   window.__NBG={get tilt(){return tilt},get vel(){return vel},set keyL(v){keyL=v},set keyR(v){keyR=v},get dist(){return dist}};try{ctx.say('풍랑 속 라파엘호의 균형을 잡아요!',2.2)}catch(e){}};
  /* 발굴 탐지 */const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
  const ITEMS=[
   {n:'묵주 알',h:'기도할 때 세던 묵주 알이에요.',mk:mk(g=>{for(let i=0;i<5;i++){const b=new THREE.Mesh(new THREE.SphereGeometry(.025,8,6),M(0x5a3a2a));b.position.set((i-2)*.05,0,0);g.add(b)}})},
   {n:'기와 조각',h:'한옥 성당 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18),M(0x5a5a5a)))})},
   {n:'벽돌 조각',h:'1916년 성당 벽을 벽돌로 고칠 때 쓴 벽돌 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.06,.1),M(0x8a3a2a)))})},
   {n:'백자 접시',h:'마을에서 쓰던 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
   {n:'옛 동전',h:'옛 마을 가게에서 오가던 동전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.015,18),M(0xb08840,{metalness:.7})))})}];
  window.__NBDIG=()=>{window.__DETECT&&window.__DETECT({key:'nabawi_dig',title:'나바위 발굴 탐지',emoji:'⛏️',bg:'#14202a',count:4,TL:150,cand:[[40,20],[60,30],[20,40],[70,0],[50,50],[30,60],[80,40],[10,30]],items:ITEMS,intro:'나바위 마을 땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'나바위는 한옥 성당과 금강 나루의 이야기가 함께 남은 마을이에요.'})};
  sp(46,24,2.4,'발굴 탐지 자리','마을 땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 }})}
