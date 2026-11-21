/* 경주 양동마을 마당(2026-11-22, 경주 덧붙이기 E9): 공개 실측 3D가 없어 공개 사진·수치로 간추려 지음. 집은 hanokkit 실측 한옥·초가(CC BY).
   양동마을(국가민속문화유산, 세계유산 「한국의 역사마을: 하회와 양동」 2010): 월성 손씨와 여강 이씨가 500년 넘게 함께 일군 양반 마을. 설창산 줄기가 「勿(물)」자 모양 골짜기를 이루고, 높은 곳에 기와집(서백당·무첨당·향단), 낮은 곳에 초가가 자리함. 관가정(보물)은 곡식 자라는 들판을 바라보는 집.
   놀이: 양동마을 그림 맞추기(아홉 칸 밀기 퍼즐), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {placeHanok} from './hanokkit.js';
export function buildYangdong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(2010);
 const TOUCH=opts.touch!=null?!!opts.touch:matchMedia('(pointer:coarse)').matches;
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 勿자 능선 넷(북→남으로 뻗음), 남쪽 안강 들판 */const ss=t=>t<=0?0:t>=1?1:t*t*(3-2*t);const RID=[[-48,-60,-36,10],[-18,-64,-10,14],[12,-64,16,8],[40,-60,44,-4]];
 const PADS=[[-44,-28],[-14,-36],[14,-30],[42,-34],[-40,-6],[-28,-14],[-2,-12],[28,-10],[-30,6],[2,8],[30,10]];const H0=(x,z)=>{let h=0;for(const[x0,z0,x1,z1]of RID){const t=Math.max(0,Math.min(1,((x-x0)*(x1-x0)+(z-z0)*(z1-z0))/((x1-x0)**2+(z1-z0)**2)));const px=x0+(x1-x0)*t,pz=z0+(z1-z0)*t;const d=Math.hypot(x-px,z-pz);h=Math.max(h,(9-t*6)*ss(1-d/12))}return h};const H=(x,z)=>{let h=H0(x,z);for(const[px,pz]of PADS){const d=Math.hypot(x-px,z-pz);if(d<11){const t=ss((d-7)/4);h=H0(px,pz)*(1-t)+h*t}}return h};
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(220,200,140,130);g.rotateX(-Math.PI/2);const p=g.attributes.position;const col=[];const c=new THREE.Color();for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);const h=H(x,z);p.setY(k,h);c.set(z>28?'#a8b050':h>2?'#5f8a3a':'#8a9a4a');col.push(c.r,c.g,c.b)}g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1}));m.receiveShadow=true;G.add(m)}
 /* 집: 능선 위 기와집, 골짜기 초가 */const HOUSES=[];if(!mini){const put=(k,x,z,ry)=>{const y=H(x,z);const n0=G.children.length,s0=solids.length;placeHanok(G,solids,k,x,z,ry,{TOUCH,s:.75});for(let i=n0;i<G.children.length;i++)G.children[i].position.y+=y;for(let i=s0;i<solids.length;i++){if(solids[i].y0!=null)solids[i].y0+=y;if(solids[i].y1!=null)solids[i].y1+=y}HOUSES.push([k,x,z])};
  put('sarang',-44,-28,Math.PI);put('hall',-14,-36,Math.PI);put('sarang',14,-30,Math.PI);put('sarang',42,-34,Math.PI);put('hall',-40,-6,Math.PI*.9);
  put('choga1',-28,-14,Math.PI);put('choga2',-2,-12,Math.PI);put('choga1',28,-10,Math.PI);put('choga2',-30,6,Math.PI);put('nongga',2,8,Math.PI);put('choga1',30,10,Math.PI)}
 /* 관가정 앞 들판(논) */{const pm=M(0x9aa840);for(let i=0;i<10;i++){const p=new THREE.Mesh(new THREE.BoxGeometry(18,.1,7),pm);p.position.set(-60+(i%5)*24,.05,40+((i/5)|0)*9);G.add(p)}}
 /* 나무 */{const tm=M(0x5a3a28),lm=M(0x3f6a2e);for(let i=0;i<40;i++){const x=-90+r()*180,z=-80+r()*40;const y=H(x,z);if(HOUSES.some(([,hx,hz])=>Math.hypot(x-hx,z-hz)<9))continue;const t=new THREE.Mesh(new THREE.CylinderGeometry(.2,.3,5,6),tm);t.position.set(x,y+2.5,z);G.add(t);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(2.2,0),lm);c.position.set(x,y+5.2,z);G.add(c)}}
 const NL=[];if(!mini){for(const[k,x,z]of HOUSES.slice(0,6)){const L=new THREE.PointLight(0xffc080,0,16,1.5);L.position.set(x,H(x,z)+3,z+4);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const L of NL)L.intensity=nk*6};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(0,22,3.4,'양동마을','월성 손씨와 여강 이씨가 500년 넘게 함께 일군 양반 마을이에요. 2010년 하회마을과 함께 세계유산이 됐어요. 산줄기가 「勿(물)」자 모양 골짜기를 이뤄요. 집은 실측 한옥으로 간추려 지었어요.');
 sp(-44,-20,3,'서백당','손씨 종가예요. 「이 집에서 큰 인물 셋이 난다」는 이야기가 전하고, 실제로 우재 손중돈과 회재 이언적이 이 집에서 태어났다고 해요.');
 sp(-14,-28,3,'향단','회재 이언적이 지은 집이에요(보물). 「興(흥)」자 모양으로 지어 겉모습이 화려해요.');
 sp(42,-26,3,'관가정','「곡식 자라는 것을 보는 정자」라는 뜻의 손씨 집이에요(보물). 앞으로 안강 들판이 펼쳐져요.');
 sp(10,26,2.4,'그림 맞추는 평상','양동마을 그림 조각을 밀어 맞춰 봐요.');
 sp(-60,26,2.4,'발굴 탐지 자리','마을 땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 그림 맞추기(11/22): 3×3 밀기 퍼즐. 빈칸 옆 조각을 눌러 밀어요. 120초 */
 const paint=(c,W,Hh)=>{const q=c.getContext('2d');const g=q.createLinearGradient(0,0,0,Hh);g.addColorStop(0,'#8ec0e8');g.addColorStop(1,'#d8ecf4');q.fillStyle=g;q.fillRect(0,0,W,Hh);q.fillStyle='#5a8a4a';q.beginPath();q.moveTo(0,Hh*.55);for(let x=0;x<=W;x+=W/12)q.lineTo(x,Hh*(.38+.1*Math.sin(x/W*9)));q.lineTo(W,Hh);q.lineTo(0,Hh);q.fill();q.fillStyle='#3f6a2e';q.beginPath();q.moveTo(0,Hh*.7);for(let x=0;x<=W;x+=W/10)q.lineTo(x,Hh*(.55+.08*Math.cos(x/W*7)));q.lineTo(W,Hh);q.lineTo(0,Hh);q.fill();q.fillStyle='#c8c060';q.fillRect(0,Hh*.84,W,Hh*.16);
  const roof=(x,y,w,giwa)=>{q.fillStyle=giwa?'#3a3e48':'#b89860';q.beginPath();q.moveTo(x-w*.62,y);q.quadraticCurveTo(x,y-w*.42,x+w*.62,y);q.quadraticCurveTo(x,y-w*.12,x-w*.62,y);q.fill();q.fillStyle='#f0e8d8';q.fillRect(x-w*.42,y,w*.84,w*.32);q.fillStyle='#6a4a2a';for(let k=0;k<4;k++)q.fillRect(x-w*.42+k*w*.27,y,w*.04,w*.32)};
  roof(W*.2,Hh*.47,W*.2,1);roof(W*.5,Hh*.42,W*.24,1);roof(W*.8,Hh*.48,W*.2,1);roof(W*.33,Hh*.66,W*.16,0);roof(W*.62,Hh*.68,W*.15,0);roof(W*.88,Hh*.7,W*.14,0);q.fillStyle='#fff8d8';q.beginPath();q.arc(W*.85,Hh*.14,W*.06,0,7);q.fill();q.fillStyle='#2a2418';q.font=`${Math.round(W*.07)}px serif`;q.fillText('良洞',W*.05,Hh*.12)};
 window.__YDPUZ=()=>{if(document.getElementById('ydP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(10,26,0)}catch(e){}
  const S=3,TL=120;let tiles=[...Array(S*S).keys()];let moves=0,done=false,t0=performance.now()/1000;const blank=S*S-1;
  const nb=i=>{const x=i%S,y=(i/S)|0;return[[x-1,y],[x+1,y],[x,y-1],[x,y+1]].filter(([a,b])=>a>=0&&a<S&&b>=0&&b<S).map(([a,b])=>b*S+a)};
  let pos=tiles.indexOf(blank);let last=-1;for(let k=0;k<60;k++){const c=nb(pos).filter(v=>v!==last);const n=c[(Math.random()*c.length)|0];[tiles[pos],tiles[n]]=[tiles[n],tiles[pos]];last=pos;pos=n}
  const scramble=[];
  const d=document.createElement('div');d.id='ydP';d.style.cssText="position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:60;background:#2a2418;border:3px solid #c8a868;border-radius:16px;padding:10px 12px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);user-select:none";document.body.appendChild(d);
  const SZ=Math.min(300,innerWidth*.8)|0;const img=document.createElement('canvas');img.width=img.height=SZ;paint(img,SZ,SZ);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d890">🧩 양동마을 그림 맞추기</b><div id="ydS" style="font-size:13px;margin:2px 0">밀기 0번</div><div id="ydB" style="position:relative;width:${SZ}px;height:${SZ}px;margin:6px auto;background:#111"></div><div id="ydT" style="font-size:13px">${TL}초</div><button data-x style="font:13px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:3px 10px;margin-top:4px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>d.remove();
  const B=d.querySelector('#ydB');const cell=SZ/S;const els=[];for(let t=0;t<S*S;t++){const c=document.createElement('canvas');c.width=c.height=cell|0;c.getContext('2d').drawImage(img,(t%S)*cell,((t/S)|0)*cell,cell,cell,0,0,cell,cell);c.style.cssText=`position:absolute;width:${cell-2}px;height:${cell-2}px;transition:left .12s,top .12s;cursor:pointer;border-radius:4px`;if(t===blank)c.style.visibility='hidden';c.onclick=()=>tap(t);B.appendChild(c);els[t]=c}
  const place=()=>tiles.forEach((t,i)=>{els[t].style.left=(i%S)*cell+1+'px';els[t].style.top=((i/S)|0)*cell+1+'px'});place();
  const snd=(f,len)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='triangle';o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const solved=()=>tiles.every((t,i)=>t===i);
  const tap=t=>{if(done)return;const i=tiles.indexOf(t),b=tiles.indexOf(blank);if(!nb(b).includes(i))return;[tiles[i],tiles[b]]=[tiles[b],tiles[i]];moves++;snd(500+Math.random()*200,.06);place();d.querySelector('#ydS').textContent='밀기 '+moves+'번';if(solved())fin(true)};
  const fin=ok=>{if(done)return;done=true;els[blank].style.visibility='visible';const el=performance.now()/1000-t0;const Q=ok?Math.max(60,Math.round(100-Math.max(0,el-40)*.4-Math.max(0,moves-40)*.3)):Math.round(tiles.filter((t,i)=>t===i).length/9*55);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('yangdong_puz',Q,'양동마을 그림 맞추기')}catch(e){}window.__YDQ=Q;
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0d890">${ok?'양동마을 그림을 다 맞췄어요!':'그림을 다 못 맞췄어요'}</b><div style="font-size:13px;margin:4px 0;max-width:280px">양동마을은 산줄기 높은 곳에 양반 기와집, 낮은 곳에 초가가 어우러져 조선 시대 신분과 살림 모습을 그대로 보여 줘요.</div><div style="font-size:24px;color:#c8a868">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a868;color:#2a2418;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__YDPUZ()};d.querySelector('[data-x]').onclick=()=>d.remove()},700)};
  const loop=()=>{if(!d.isConnected)return;if(!done){const left=Math.max(0,TL-(performance.now()/1000-t0));d.querySelector('#ydT').textContent=Math.ceil(left)+'초';if(left<=0)fin(false)}requestAnimationFrame(loop)};loop();
  window.__YDG={tap,get tiles(){return tiles.slice()},solved,get blank(){return blank}};try{ctx.say('조각을 밀어 그림을 맞춰요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'백자 제기',h:'종가 제사에 쓰던 백자 제기예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.08,.12,14),M(0xf0ece0,{roughness:.3})))})},
  {n:'놋 수저',h:'양반가에서 쓰던 놋 수저예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.22,.01,.03),M(0xc8a050,{metalness:.7})))})},
  {n:'막새 기와',h:'기와집 지붕 끝을 막던 기와예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18),M(0x5a5a5a)))})},
  {n:'신라 토기 조각',h:'양동 둘레에서는 신라 때 토기 조각도 나와요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.1,.12,12,1,true),M(0x6a6a6a,{side:THREE.DoubleSide})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__YDDIG=()=>{window.__DETECT&&window.__DETECT({key:'yangdong_dig',title:'양동마을 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[-60,26],[-20,30],[30,30],[60,20],[-70,0],[70,-10],[0,34],[-50,34]],items:ITEMS,intro:'마을 땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'양동마을은 500년 넘게 사람이 살아온 살아 있는 세계유산이에요.'})};
 const meta={quest:{t:'양동마을 둘러보기',d:'서백당·향단·관가정을 둘러보세요.',steps:[['서백당','서백당'],['향단','향단'],['관가정','관가정']]},
  title:'경주 양동마을',hint:'세계유산 양동마을을 실측 한옥으로 간추려 지었어요. 마을 그림 조각을 밀어 맞춰 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:20,z:24,lines:['경주 양동마을','세계유산 한국의 역사마을','勿자 골짜기 양반 마을','실측 한옥으로 간추림']}},
  npc:[['science',[[16,22],[24,22],[24,30],[16,30]]]],bounds:[-90,90,-80,90],level:()=>'경주',camCap:()=>Infinity,baseAt:(x,z)=>H(x,z),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:-10,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.strokeStyle='#5f8a3a';g.lineWidth=14*S;for(const[x0,z0,x1,z1]of RID){g.beginPath();g.moveTo(X(x0),Z(z0));g.lineTo(X(x1),Z(z1));g.stroke()}g.fillStyle='#6a4a3a';for(const[k,x,z]of HOUSES)g.fillRect(X(x)-3,Z(z)-3,6,6);g.fillStyle='#a8b050';g.fillRect(0,Z(28),300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:20,z:30,yaw:Math.PI},size:{}},meta)}
