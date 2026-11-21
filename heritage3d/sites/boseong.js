/* 보성 차밭·벌교 갯벌 마당(2026-11-22, W35): 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   보성 차밭: 산비탈을 따라 계단처럼 둥글게 이어진 녹차밭(우리나라 녹차의 큰 산지, 「보성 전통 차 농업」 국가중요농업유산).
   벌교 갯벌(세계유산 「한국의 갯벌」 2021, 보성·순천 갯벌): 꼬막의 고장. 아낙들이 한쪽 무릎을 널빤지(뻘배)에 올리고 다른 발로 뻘을 밀며 갯벌을 미끄러져 다니며 꼬막을 캠(뻘배어업, 국가중요어업유산).
   놀이: 뻘배 꼬막 캐기(미끄러지는 뻘배를 몰아 꼬막 모으기, 밀물 전에), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {placeHanok} from './hanokkit.js';
export function buildBoseong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(2021);
 const TOUCH=opts.touch!=null?!!opts.touch:matchMedia('(pointer:coarse)').matches;
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 북쪽 차밭 언덕(z<-14, 계단식), 남쪽 갯벌(z>22) */const ss=t=>t<=0?0:t>=1?1:t*t*(3-2*t);const step=v=>Math.floor(v/1.2)*1.2;
 const H=(x,z)=>{if(z>22)return -.4;if(z<-14){const u=(-14-z)/40;return step(14*ss(u))*ss((70-Math.abs(x))/20)}return 0};
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(220,220,220,110);g.rotateX(-Math.PI/2);const p=g.attributes.position;const col=[];const c=new THREE.Color();for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);const h=H(x,z);p.setY(k,h);c.set(z>21?'#5a4a3a':h>0?'#6a8a3a':'#8a9a4a');col.push(c.r,c.g,c.b)}g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1}));m.receiveShadow=true;G.add(m)}
 /* 차밭 줄(계단 따라 휘어진 줄) */{const im=new THREE.InstancedMesh(new THREE.SphereGeometry(.6,8,6),M(0x2f7a2a,{roughness:.8}),2400);const o=new THREE.Object3D();let n=0;for(let z=-15.2;z>-60&&n<2400;z-=1.2)for(let x=-60;x<=60&&n<2400;x+=1.1){const zz=z+Math.sin(x/9)*.4;if(H(x,zz)<=0)continue;o.position.set(x,H(x,zz)+.35,zz);o.scale.set(1,.7,1.3);o.updateMatrix();im.setMatrixAt(n++,o.matrix)}im.count=n;G.add(im);for(let i=0;i<12;i++){const t=new THREE.Mesh(new THREE.CylinderGeometry(.3,.4,14,8),M(0x5a3a28));const x=-66+i*12;t.position.set(x,H(x,-58)+7,-62);G.add(t);const c=new THREE.Mesh(new THREE.ConeGeometry(2,8,8),M(0x2f5a2a));c.position.set(x,H(x,-58)+15,-62);G.add(c)}}
 /* 바닷가 마을 + 갯벌 위 뻘배·꼬막 무더기 */if(!mini){for(const[k,x,z,ry]of[['choga1',-30,10,Math.PI],['choga2',-12,12,Math.PI],['nongga',20,10,Math.PI],['choga1',40,8,Math.PI]])placeHanok(G,solids,k,x,z,ry,{TOUCH,s:.7})}
 {const sled=new THREE.Group();const b=new THREE.Mesh(new THREE.BoxGeometry(.5,.08,2),M(0x8a6a44));sled.add(b);const box=new THREE.Mesh(new THREE.BoxGeometry(.45,.35,.5),M(0x6a4a2a));box.position.set(0,.2,.5);sled.add(box);sled.position.set(4,-.3,30);sled.rotation.y=.4;G.add(sled);const ko=new THREE.InstancedMesh(new THREE.SphereGeometry(.12,8,6,0,Math.PI*2,0,Math.PI/2),M(0x8a7a6a),120);const o=new THREE.Object3D();for(let k=0;k<120;k++){o.position.set(-6+r()*3,-.35,26+r()*3);o.rotation.set(-Math.PI/2+(r()-.5),r()*6,0);o.updateMatrix();ko.setMatrixAt(k,o.matrix)}G.add(ko)}
 const WT=tex(256,256,(q,w,h)=>{q.fillStyle='#4a7a80';q.fillRect(0,0,w,h);for(let i=0;i<200;i++){q.strokeStyle=`rgba(230,245,250,${.08+r()*.12})`;q.lineWidth=1+r()*2;const x=r()*w,y=r()*h;q.beginPath();q.moveTo(x,y);q.lineTo(x+18+r()*20,y);q.stroke()}},[10,10]);WT.wrapS=WT.wrapT=THREE.RepeatWrapping;
 const sea=new THREE.Mesh(new THREE.PlaneGeometry(240,120),new THREE.MeshStandardMaterial({map:WT,roughness:.1,metalness:.2,transparent:true,opacity:.85}));sea.rotation.x=-Math.PI/2;sea.position.set(0,-.6,112);G.add(sea);
 const NL=[];if(!mini){for(const[x,z]of[[-30,16],[-12,18],[20,16],[40,14]]){const L=new THREE.PointLight(0xffc080,0,18,1.5);L.position.set(x,3,z);G.add(L);NL.push(L)}}
 let nk=0,tt=0;const nightTick=dt=>{tt+=dt;const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7;sea.position.z=112-14*(.5+.5*Math.sin(tt*.04))};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:Math.max(0,H(x,z)),z,r:rr,t,h});
 sp(0,-10,3.4,'보성 차밭','산비탈을 따라 계단처럼 둥글게 이어진 녹차밭이에요. 보성은 우리나라에서 녹차가 가장 많이 나는 고장이에요(보성 전통 차 농업, 국가중요농업유산). 간추려 지었어요.');
 sp(0,20,3,'벌교 갯벌','꼬막의 고장 벌교 갯벌이에요. 2021년 「한국의 갯벌」로 세계유산이 됐어요. 밀물과 썰물에 따라 바다가 오가요.');
 sp(6,22,2.2,'뻘배 타는 곳','아낙들은 널빤지(뻘배)에 한쪽 무릎을 올리고 다른 발로 뻘을 밀어 미끄러지며 꼬막을 캤어요. 밀물이 들기 전에 꼬막을 캐 봐요!');
 sp(-50,6,2.4,'발굴 탐지 자리','바닷가 마을 땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 뻘배 꼬막 캐기(11/22): 위에서 본 갯벌. 방향을 누르면 그쪽으로 뻘을 밀어 미끄러져요(멈추려면 반대로). 꼬막 무더기에 닿으면 캐요. 밀물이 위에서부터 차올라요. 20무더기, 70초 */
 window.__BSMUD=()=>{if(document.getElementById('bsP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(6,22,0)}catch(e){}
  const cv=document.createElement('canvas');cv.id='bsC';cv.style.cssText='position:fixed;inset:0;z-index:55;width:100%;height:100%;touch-action:none';document.body.appendChild(cv);const q=cv.getContext('2d');cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio;
  const N=20,TL=70;let x=.5,y=.85,vx=0,vy=0,n=0,done=false,t0=performance.now()/1000,last=t0,keys={},tide=0,stuck=0;const cl=[];const spawn=()=>{cl.push({x:.08+Math.random()*.84,y:.2+Math.random()*.72})};for(let i=0;i<5;i++)spawn();
  const d=document.createElement('div');d.id='bsP';d.style.cssText="position:fixed;right:12px;top:90px;z-index:60;background:#2a2018;border:3px solid #a8885a;border-radius:16px;padding:10px 14px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:200px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d0a0">🐚 뻘배 꼬막 캐기</b><div id="bsS" style="font:18px 'Do Hyeon',sans-serif;margin:4px 0">0 / ${N}무더기</div><div id="bsG" style="font-size:12px;color:#f0d0a0">뻘을 밀어 미끄러져요</div><div id="bsT" style="font-size:13px">${TL}초</div>`;
  const pad=document.createElement('div');pad.id='bsPad';pad.style.cssText='position:fixed;left:16px;bottom:24px;z-index:61;display:grid;grid-template-columns:repeat(3,58px);grid-template-rows:repeat(3,58px);gap:4px';const dirs={U:[1,0,'▲'],L:[0,1,'◀'],R:[2,1,'▶'],D:[1,2,'▼']};for(const k in dirs){const[c,r2,l]=dirs[k];const b=document.createElement('button');b.textContent=l;b.style.cssText=`grid-column:${c+1};grid-row:${r2+1};font:22px sans-serif;border:0;border-radius:12px;background:rgba(168,136,90,.9);color:#fff`;b.onpointerdown=e=>{e.preventDefault();keys[k]=1};b.onpointerup=b.onpointerleave=()=>keys[k]=0;pad.appendChild(b)}document.body.appendChild(pad);
  const map={ArrowUp:'U',KeyW:'U',ArrowDown:'D',KeyS:'D',ArrowLeft:'L',KeyA:'L',ArrowRight:'R',KeyD:'R'};const onKey=e=>{const k=map[e.code];if(k){keys[k]=e.type==='keydown'?1:0;e.preventDefault()}};addEventListener('keydown',onKey,true);addEventListener('keyup',onKey,true);
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const cleanup=()=>{removeEventListener('keydown',onKey,true);removeEventListener('keyup',onKey,true);cv.remove();pad.remove()};
  const fin=()=>{if(done)return;done=true;cleanup();const el=performance.now()/1000-t0;const Q=n>=N?Math.max(60,Math.round(100-Math.max(0,el-45)*.8)):Math.round(n/N*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('boseong_mud',Q,'뻘배 꼬막 캐기')}catch(e){}window.__BSQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0d0a0">꼬막 ${n}무더기를 캤어요</b><div style="font-size:13px;margin:4px 0">뻘배는 몸무게를 넓게 나눠 깊은 뻘에 빠지지 않고 미끄러지게 해 줘요. 벌교 아낙들은 밀물 때를 맞춰 하루 몇 시간씩 뻘배를 탔어요.</div><div style="font-size:24px;color:#a8885a">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#a8885a;color:#2a2018;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__BSMUD()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}const now=performance.now()/1000,dt=Math.min(.05,now-last);last=now;const W=cv.width,Hh=cv.height,S=Math.min(W,Hh);
   if(!done){const el=now-t0;tide=Math.min(.5,el/TL*.5);const ax=(keys.R?1:0)-(keys.L?1:0),ay=(keys.D?1:0)-(keys.U?1:0);vx+=ax*.55*dt;vy+=ay*.55*dt;vx*=Math.pow(.55,dt);vy*=Math.pow(.55,dt);x=Math.max(.04,Math.min(.96,x+vx*dt));y=Math.max(.04,Math.min(.96,y+vy*dt));
    if(y<tide+.04){y=tide+.04;vy=Math.abs(vy)*.3;d.querySelector('#bsG').textContent='밀물이에요! 아래로 피해요'}
    for(let i=cl.length-1;i>=0;i--){const c=cl[i];if(c.y<tide){cl.splice(i,1);spawn();continue}if(Math.hypot((c.x-x)*W,(c.y-y)*Hh)<S*.045){cl.splice(i,1);n++;snd(600+n*20,.12);d.querySelector('#bsS').textContent=n+' / '+N+'무더기';d.querySelector('#bsG').textContent='꼬막을 캤어요!';if(n>=N){fin();return}const c2={x:.08+Math.random()*.84,y:Math.max(tide+.08,.2)+Math.random()*(.92-Math.max(tide+.08,.2))};cl.push(c2)}}
    const left=Math.max(0,TL-el);d.querySelector('#bsT').textContent=Math.ceil(left)+'초';if(left<=0){fin();return}}
   q.clearRect(0,0,W,Hh);q.fillStyle='#5a4a3a';q.fillRect(0,0,W,Hh);q.fillStyle='rgba(30,22,16,.25)';for(let i=0;i<60;i++){q.beginPath();q.arc((i*137%W),(i*251%Hh),S*.01,0,7);q.fill()}q.fillStyle='rgba(74,122,128,.9)';q.fillRect(0,0,W,tide*Hh);
   for(const c of cl){q.fillStyle='#c8b8a0';for(let k=0;k<4;k++){q.beginPath();q.arc(c.x*W+(k%2-.5)*S*.02,c.y*Hh+((k/2|0)-.5)*S*.02,S*.012,0,7);q.fill()}}
   q.save();q.translate(x*W,y*Hh);q.rotate(Math.atan2(vy,vx)+Math.PI/2);q.fillStyle='#8a6a44';q.fillRect(-S*.015,-S*.05,S*.03,S*.1);q.fillStyle='#f0e0c8';q.beginPath();q.arc(0,S*.01,S*.016,0,7);q.fill();q.restore();
   requestAnimationFrame(loop)};loop();
  window.__BSG={get x(){return x},get y(){return y},get cl(){return cl},keys,get n(){return n}};try{ctx.say('밀물이 들기 전에 꼬막을 캐요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'꼬막 껍데기',h:'부챗살 무늬가 뚜렷한 꼬막 껍데기예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.06,10,6,0,Math.PI*2,0,Math.PI/2),M(0xc8b8a0)))})},
  {n:'조개더미 토기 조각',h:'옛사람들이 조개를 먹고 버린 조개더미에서 나온 토기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.1,.12,12,1,true),M(0x7a6a5a,{side:THREE.DoubleSide})))})},
  {n:'찻잔 조각',h:'차를 마시던 잔 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.08,.05,.08,14,1,true),M(0xa8a090,{side:THREE.DoubleSide})))})},
  {n:'그물추',h:'그물을 가라앉히던 흙 그물추예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.1,10),M(0x8a6a4a)))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__BSDIG=()=>{window.__DETECT&&window.__DETECT({key:'boseong_dig',title:'보성 발굴 탐지',emoji:'⛏️',bg:'#2a2018',count:4,TL:150,cand:[[-50,6],[-60,-4],[50,0],[60,10],[-20,0],[30,-4],[-70,10],[70,0]],items:ITEMS,intro:'바닷가 마을 땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'보성은 차와 갯벌이 함께 키운 고장이에요.'})};
 const meta={quest:{t:'보성 둘러보기',d:'차밭과 갯벌을 둘러보세요.',steps:[['차밭','보성 차밭'],['갯벌','벌교 갯벌'],['뻘배','뻘배 타는 곳']]},
  title:'보성 차밭·벌교 갯벌',hint:'보성 차밭과 세계유산 벌교 갯벌을 간추려 지었어요(집은 실측). 뻘배를 몰아 밀물 전에 꼬막을 캐 봐요. 바다는 밀물·썰물로 오가요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,groundY:-3,sign:{x:-6,z:2,lines:['보성 차밭·벌교 갯벌','세계유산 한국의 갯벌','뻘배 · 꼬막','간추려 지음']}},
  npc:[['science',[[-10,0],[-2,0],[-2,6],[-10,6]]]],bounds:[-90,90,-80,80],level:()=>'보성',camCap:()=>Infinity,baseAt:(x,z)=>Math.max(0,H(x,z)),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#2f7a2a';g.fillRect(0,0,300,Z(-14));g.fillStyle='#5a4a3a';g.fillRect(0,Z(22),300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-6,z:4,yaw:Math.PI},size:{}},meta)}
