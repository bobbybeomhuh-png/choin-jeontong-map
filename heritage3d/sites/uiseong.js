/* 의성 조문국·탑리·산수유 마당(2026-11-22, W40): 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   조문국: 삼한 시기 의성에 있던 작은 나라(185년 신라에 병합). 금성산 고분군(사적)에 크고 작은 무덤 370여 기, 가장 큰 무덤을 「경덕왕릉」이라 전함.
   탑리리 오층석탑(국보): 벽돌탑(전탑)을 본떠 지붕돌 아래위를 층층이 내어 쌓은 통일신라 석탑. 높이 약 9.6m.
   산수유 마을(화전리): 이른 봄 노란 산수유꽃이 마을을 덮음. 의성은 마늘로도 이름남.
   놀이: 고분 줄 세우기(두 무덤을 골라 자리를 바꿔 크기 순서로 세우기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {placeHanok} from './hanokkit.js';
export function buildUiseong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(185);
 const TOUCH=opts.touch!=null?!!opts.touch:matchMedia('(pointer:coarse)').matches;
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x8aa04a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 금성산 고분군: 크기 다른 봉분 열둘(서쪽) */const MOUNDS=[];{const gm=M(0x6a9a3a,{roughness:1});for(let i=0;i<12;i++){const x=-70+(i%4)*14+(r()-.5)*4,z=-50+((i/4)|0)*16+(r()-.5)*4;const R=i===5?11:3+r()*5;const mo=new THREE.Mesh(new THREE.SphereGeometry(R,24,10,0,Math.PI*2,0,Math.PI/2),gm);mo.scale.y=.5;mo.position.set(x,0,z);G.add(mo);MOUNDS.push([x,z,R]);solids.push({cx:x,cz:z,r:R*.85,y0:0,y1:R*.5})}}
 /* 탑리리 오층석탑: 층층 내어쌓은 지붕돌(전탑 본뜸) */const TX=10,TZ=-10;{const st=M(0xb8b0a0,{flatShading:true});const g=new THREE.Group();g.position.set(TX,0,TZ);let y=0;const bs=new THREE.Mesh(new THREE.BoxGeometry(5,1.2,5),st);bs.position.y=.6;g.add(bs);y=1.2;for(let k=0;k<5;k++){const w=2.8-k*.36,bh=k?.7-k*.06:1.6;const body=new THREE.Mesh(new THREE.BoxGeometry(w,bh,w),st);body.position.y=y+bh/2;g.add(body);y+=bh;for(let s=0;s<3;s++){const b=new THREE.Mesh(new THREE.BoxGeometry(w+.3+s*.35,.14,w+.3+s*.35),st);b.position.y=y+.07+s*.14;g.add(b)}y+=.42;for(let s=0;s<3;s++){const b=new THREE.Mesh(new THREE.BoxGeometry(w+1.2-s*.35,.14,w+1.2-s*.35),st);b.position.y=y+.07+s*.14;g.add(b)}y+=.42}const fin=new THREE.Mesh(new THREE.CylinderGeometry(.1,.2,1,8),st);fin.position.y=y+.5;g.add(fin);G.add(g);solids.push({x0:TX-2.5,x1:TX+2.5,y0:0,y1:y+1,z0:TZ-2.5,z1:TZ+2.5})}
 /* 산수유 마을(동쪽): 초가 + 노란 산수유나무 */if(!mini){for(const[k,x,z,ry]of[['choga1',44,-20,Math.PI],['choga2',56,4,Math.PI/2],['nongga',40,22,0]])placeHanok(G,solids,k,x,z,ry,{TOUCH,s:.7})}
 {const tm=M(0x5a4030),fm=M(0xf0d020,{roughness:.6});for(let i=0;i<30;i++){const x=30+r()*50,z=-40+r()*80;if([[44,-20],[56,4],[40,22]].some(([a,b])=>Math.hypot(x-a,z-b)<8))continue;const t=new THREE.Mesh(new THREE.CylinderGeometry(.14,.22,2.6,6),tm);t.position.set(x,1.3,z);G.add(t);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(1.8,1),fm);c.position.set(x,3.2,z);c.scale.y=.8;G.add(c)}}
 /* 마늘밭 */{const im=new THREE.InstancedMesh(new THREE.ConeGeometry(.06,.6,4),M(0x4a8a3a),900);const o=new THREE.Object3D();let n=0;for(let x=-10;x<20&&n<900;x+=.9)for(let z=20;z<44&&n<900;z+=.9){o.position.set(x,.3,z);o.updateMatrix();im.setMatrixAt(n++,o.matrix)}im.count=n;G.add(im)}
 const NL=[];if(!mini){for(const[x,z]of[[TX,TZ+4],[44,-14],[-40,-30]]){const L=new THREE.PointLight(0xffc080,0,22,1.5);L.position.set(x,3,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*7};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(-34,-14,3.4,'금성산 고분군','삼한 시기 작은 나라 조문국 사람들의 무덤 370여 기가 모여 있어요(사적). 가장 큰 무덤은 「경덕왕릉」이라 전해요. 무덤이 클수록 힘 있는 사람이었어요. 간추려 지었어요.');
 sp(-24,-4,2.2,'고분 줄 세우는 자리','무덤을 크기 순서로 줄 세워 봐요.');
 sp(TX,TZ+6,3,'탑리리 오층석탑','벽돌탑(전탑)을 본떠 지붕돌 아래위를 층층이 내어 쌓은 통일신라 석탑이에요(국보). 높이 약 9.6m예요. 간추려 지었어요.');
 sp(44,-8,3,'산수유 마을','이른 봄이면 노란 산수유꽃이 마을을 온통 덮어요. 가을엔 빨간 열매를 따 약으로 써요.');
 sp(4,18,2.6,'마늘밭','의성은 맵고 단단한 토종 마늘로 이름난 고장이에요.');
 sp(0,50,2.4,'발굴 탐지 자리','땅속에 조문국 사람들의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 고분 줄 세우기(11/22): 크기가 다른 무덤 여덟이 뒤섞여 있어요. 두 무덤을 차례로 누르면 자리가 바뀌어요. 왼쪽부터 큰 순서로 세우기. 적게 바꿀수록 높은 점수. 두 판 */
 window.__USSORT=()=>{if(document.getElementById('usP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(-24,-4,0)}catch(e){}
  const cv=document.createElement('canvas');cv.id='usC';cv.style.cssText='position:fixed;inset:0;z-index:55;width:100%;height:100%;touch-action:none';document.body.appendChild(cv);const q=cv.getContext('2d');cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio;
  const N=8,RD=2;let rd=0,arr=[],sel=-1,swaps=0,minS=0,done=false,res=[];
  const minSwaps=a=>{const b=a.map((v,i)=>[v,i]).sort((x,y)=>y[0]-x[0]);const vis=Array(a.length).fill(false);let s=0;for(let i=0;i<a.length;i++){if(vis[i]||b[i][1]===i)continue;let j=i,c=0;while(!vis[j]){vis[j]=true;j=b[j][1];c++}s+=c-1}return s};
  const setup=()=>{const vals=[];while(vals.length<N){const v=Math.round(2+Math.random()*9);if(!vals.includes(v))vals.push(v)}arr=vals.sort(()=>Math.random()-.5);if(arr.every((v,i)=>i===0||arr[i-1]>v))arr.reverse();swaps=0;sel=-1;minS=minSwaps(arr)};setup();
  const d=document.createElement('div');d.id='usP';d.style.cssText="position:fixed;right:12px;top:80px;z-index:60;background:#22281a;border:3px solid #a8c070;border-radius:16px;padding:10px 14px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f0f4e0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:200px;user-select:none";document.body.appendChild(d);
  const render=msg=>{d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#d8e8a0">⛰️ 고분 줄 세우기</b><div style="font-size:13px;margin:4px 0">${rd+1} / ${RD}판 · 바꾼 횟수 ${swaps} (가장 적게 ${minS}번)</div><div style="font-size:12px;color:#d8e8a0">${msg||'두 무덤을 차례로 눌러 자리를 바꿔요. 왼쪽이 가장 커요'}</div>`};render();
  const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const sorted=()=>arr.every((v,i)=>i===0||arr[i-1]>v);
  const tap=i=>{if(done)return;if(sel<0){sel=i;snd(500,.06);return}if(sel===i){sel=-1;return}[arr[sel],arr[i]]=[arr[i],arr[sel]];swaps++;sel=-1;snd(640,.1);render();if(sorted()){res.push(Math.max(.4,1-(swaps-minS)*.12));snd(880,.3);rd++;if(rd>=RD){fin();return}setup();render('잘 세웠어요! 다음 판')}};
  const xs=i=>cv.width*(.08+i*.84/(N-1));
  cv.onpointerdown=e=>{const X=e.clientX*devicePixelRatio;let bi=-1,bd=cv.width*.06;for(let i=0;i<N;i++){const dd=Math.abs(xs(i)-X);if(dd<bd){bd=dd;bi=i}}if(bi>=0)tap(bi)};
  const cleanup=()=>cv.remove();
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/RD*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('uiseong_sort',Q,'고분 줄 세우기')}catch(e){}window.__USQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#d8e8a0">줄 세우기 ${Q}점</b><div style="font-size:13px;margin:4px 0">고고학자는 무덤 크기와 껴묻거리를 비교해 누가 더 높은 사람이었는지, 나라가 어떻게 커졌는지 읽어 내요.</div><div style="font-size:24px;color:#a8c070">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#a8c070;color:#22281a;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f0f4e0;border:2px solid #f0f4e0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__USSORT()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}if(done){requestAnimationFrame(loop);return}const W=cv.width,Hh=cv.height,S=Math.min(W,Hh);q.clearRect(0,0,W,Hh);q.fillStyle='rgba(20,26,16,.55)';q.fillRect(0,0,W,Hh);const gy=Hh*.6;q.fillStyle='#8aa04a';q.fillRect(0,gy,W,Hh-gy);
   arr.forEach((v,i)=>{const x=xs(i),R=v*S*.0085;q.fillStyle=i===sel?'#c8e070':'#5f8a3a';q.beginPath();q.ellipse(x,gy,R*1.3,R*.75,0,Math.PI,0);q.fill();q.strokeStyle='#3a5a2a';q.lineWidth=2;q.stroke();q.fillStyle='#f0f4e0';q.font=`${Math.round(S*.03)}px "Do Hyeon",sans-serif`;q.textAlign='center';q.fillText(v*3+'m',x,gy+S*.05)});
   requestAnimationFrame(loop)};loop();
  window.__USG={tap,get arr(){return arr.slice()},get rd(){return rd}};try{ctx.say('무덤을 크기 순서로 세워요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'금동관 조각',h:'조문국 무덤에서 나온 금동관 조각이에요. 지배자의 관이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.12,.01),M(0xc8a040,{metalness:.8,roughness:.3})))})},
  {n:'굽다리접시',h:'조문국·신라 무덤에서 나오는 굽다리접시예요.',mk:mk(g=>{const c=new THREE.Mesh(new THREE.CylinderGeometry(.14,.1,.07,14),M(0x5a5a5a));c.position.y=.1;g.add(c);g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.09,.12,10,1,true),M(0x5a5a5a,{side:THREE.DoubleSide})))})},
  {n:'쇠 손칼',h:'작은 쇠칼이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.18,.015,.03),M(0x4a3a30,{metalness:.5})))})},
  {n:'산수유 열매',h:'빨간 산수유 열매예요. 약재로 써요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.03,8,6),M(0xc8241a)))})},
  {n:'유리구슬',h:'목걸이를 꾸미던 유리구슬이에요.',mk:mk(g=>{for(let i=0;i<6;i++){const b=new THREE.Mesh(new THREE.SphereGeometry(.025,8,6),M(0x2a7aa8,{roughness:.2}));b.position.set((i-2.5)*.05,0,0);g.add(b)}})}];
 window.__USDIG=()=>{window.__DETECT&&window.__DETECT({key:'uiseong_dig',title:'조문국 발굴 탐지',emoji:'⛏️',bg:'#22281a',count:4,TL:150,cand:[[0,50],[-20,40],[20,50],[-40,20],[30,40],[-60,20],[10,60],[-30,50]],items:ITEMS,intro:'땅속에 조문국 사람들의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'의성은 작은 나라 조문국이 있던 고장이에요.'})};
 const meta={quest:{t:'의성 둘러보기',d:'금성산 고분군·탑리리 오층석탑·산수유 마을을 둘러보세요.',steps:[['고분군','금성산 고분군'],['석탑','탑리리 오층석탑'],['산수유','산수유 마을']]},
  title:'의성 조문국·탑리·산수유',hint:'조문국 금성산 고분군, 탑리리 오층석탑(국보), 산수유 마을을 간추려 지었어요(집은 실측). 무덤을 크기 순서로 세워 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:4,lines:['의성 조문국·탑리·산수유','금성산 고분군','국보 탑리리 오층석탑','간추려 지음']}},
  npc:[['science',[[-10,2],[-2,2],[-2,10],[-10,10]]]],bounds:[-90,90,-90,90],level:()=>'의성',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.1,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#8aa04a';g.fillRect(0,0,300,300);g.fillStyle='#5f8a3a';for(const[x,z,R]of MOUNDS){g.beginPath();g.arc(X(x),Z(z),R*S,0,7);g.fill()}g.fillStyle='#f0d020';g.fillRect(X(30),Z(-40),50*S,80*S);g.fillStyle='#b8b0a0';g.fillRect(X(TX)-3,Z(TZ)-3,6,6)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-6,z:8,yaw:Math.PI},size:{}},meta)}
