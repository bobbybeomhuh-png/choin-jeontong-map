/* 김제 벽골제 마당(2026-11-21): 공개 실측 3D(CC BY)가 없어 공개 수치로 간추려 지음.
   벽골제(사적): 백제 때(330년 무렵) 쌓은 우리나라에서 가장 오래되고 큰 저수지 둑. 지금 남은 둑 약 2.5km, 높이 약 4.3m, 윗너비 약 7.5m·아랫너비 약 17.5m. 돌기둥 수문 장생거·경장거가 남아 있음. 쌍룡(청룡·백룡) 이야기.
   놀이: 수문 지키기(비 오는 동안 수문을 여닫아 저수지 물높이를 알맞게, 논에 물 대기), 발굴 탐지, 밤 둑길 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildByeokgol(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(330);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 둑: x를 따라 길게, z=0이 가운데. 높이 4.3, 윗너비 7.5, 아랫너비 17.5 */
 const DH=4.3,TW=3.75,BW=8.75;const H=(x,z)=>{const a=Math.abs(z);if(a<=TW)return DH;if(a>=BW)return 0;return DH*(BW-a)/(BW-TW)};
 const GX=[-40,40];/* 수문 자리(둑이 끊기고 돌기둥) */const gap=x=>GX.some(g=>Math.abs(x-g)<2.2);
 const Hg=(x,z)=>gap(x)&&Math.abs(z)<BW?0:H(x,z);
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(320,200,320,100);g.rotateX(-Math.PI/2);const p=g.attributes.position;const col=[];const c=new THREE.Color();
  for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);const h=Hg(x,z);p.setY(k,h);const top=Math.abs(z)<TW&&!gap(x);c.set(top?'#c8b894':h>0?'#7a9a48':z<0?'#6a7a5a':'#8aa04a');col.push(c.r,c.g,c.b)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1}));m.receiveShadow=true;G.add(m)}
 /* 저수지(북쪽) */const RES=new THREE.Mesh(new THREE.PlaneGeometry(400,180),M(0x3f6f7a,{roughness:.1,metalness:.2}));RES.rotation.x=-Math.PI/2;RES.position.set(0,1.8,-BW-90);G.add(RES);solids.push({x0:-200,x1:200,y0:-3,y1:8,z0:-200,z1:-BW-.5});
 /* 논(남쪽 바둑판) */
 const PAD=[];{const pm=M(0x6a9a3a),wm=new THREE.MeshStandardMaterial({color:0x6a8aa0,roughness:.1,metalness:.2,transparent:true,opacity:.0});for(let i=-6;i<6;i++)for(let j=0;j<4;j++){const x=i*24+12,z=BW+10+j*18;const f=new THREE.Mesh(new THREE.PlaneGeometry(22,16),pm);f.rotation.x=-Math.PI/2;f.position.set(x,.02,z);G.add(f);const w=new THREE.Mesh(new THREE.PlaneGeometry(22,16),wm);w.rotation.x=-Math.PI/2;w.position.set(x,.08,z);G.add(w);PAD.push(w);for(let t=0;t<30;t++){const s=new THREE.Mesh(new THREE.ConeGeometry(.12,.5,4),M(0x5a8a2a));s.position.set(x-10+(t%6)*4,.25,z-7+((t/6)|0)*3.5);G.add(s)}}
  const dm=M(0x8a7a5a);for(let i=-6;i<=6;i++){const d=new THREE.Mesh(new THREE.BoxGeometry(.8,.4,74),dm);d.position.set(i*24,.2,BW+37);G.add(d)}for(let j=0;j<=4;j++){const d=new THREE.Mesh(new THREE.BoxGeometry(290,.4,.8),dm);d.position.set(0,.2,BW+1+j*18);G.add(d)}
  /* 물길: 수문에서 논으로 */for(const gx of GX){const ch=new THREE.Mesh(new THREE.PlaneGeometry(2.6,BW*2+10),M(0x4a7a8a,{roughness:.1}));ch.rotation.x=-Math.PI/2;ch.position.set(gx,.05,4);G.add(ch)}}
 /* 수문: 돌기둥 둘(높이 약 5.5m) + 홈에 끼운 나무판 */
 const PLANK=[];{const sm=M(0x9a948a,{roughness:.85});for(const gx of GX){for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.BoxGeometry(.8,5.5,.8),sm);p.position.set(gx+s*1.7,2.75,0);p.castShadow=true;G.add(p);cam.push(p);solids.push({x0:gx+s*1.7-.4,x1:gx+s*1.7+.4,y0:0,y1:5.5,z0:-.4,z1:.4})}const pl=new THREE.Mesh(new THREE.BoxGeometry(3,.6,.25),M(0x7a5a38));pl.position.set(gx,.3,0);G.add(pl);PLANK.push(pl);const pl2=new THREE.Mesh(new THREE.BoxGeometry(3,4,.24),M(0x6a4a2e));pl2.position.set(gx,2.2,0);G.add(pl2);PLANK.push(pl2);solids.push({x0:gx-1.3,x1:gx+1.3,y0:0,y1:4,z0:-.3,z1:.3})}}
 /* 쌍룡 돌 조각(둑 가운데, 청룡·백룡) */{const g=new THREE.Group();g.position.set(0,DH,0);for(const[s,col]of[[-1,0x3a7a6a],[1,0xe8e4d8]]){const pts=[];for(let i=0;i<20;i++){const t=i/19;pts.push(new THREE.Vector3(s*(1.2+Math.sin(t*9)*.6),.6+t*4.2,Math.cos(t*9)*.6))}const tb=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),40,.28,8),M(col,{roughness:.5}));g.add(tb);const hd=new THREE.Mesh(new THREE.SphereGeometry(.45,12,8),M(col,{roughness:.5}));hd.position.copy(pts[19]);g.add(hd)}const bs=new THREE.Mesh(new THREE.CylinderGeometry(1.6,1.8,.6,12),M(0x9a948a));bs.position.y=.3;g.add(bs);G.add(g);solids.push({cx:0,cz:0,r:1.8,y0:DH,y1:DH+5})}
 /* 둑길 버드나무 */{const tm=M(0x5a4430),lm=M(0x8ab05a);for(let i=0;i<22;i++){const x=-150+i*14+(r()-.5)*4;if(gap(x)||Math.abs(x)<4)continue;const z=(i%2?1:-1)*(BW+2);const t=new THREE.Mesh(new THREE.CylinderGeometry(.25,.35,4,6),tm);t.position.set(x,2,z);G.add(t);const c=new THREE.Mesh(new THREE.SphereGeometry(2.4,10,8),lm);c.scale.y=1.2;c.position.set(x,4.6,z);c.castShadow=true;G.add(c);solids.push({cx:x,cz:z,r:.4,y0:0,y1:6})}}
 /* 밤 */
 const NL=[];if(!mini){for(let i=0;i<12;i++){const x=-110+i*20;if(gap(x))continue;const lp=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.4,10),new THREE.MeshStandardMaterial({color:i%2?0x2a4a9a:0xa02a2a,emissive:0}));lp.position.set(x,DH+1.9,2.8);G.add(lp);const pl=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,1.8,6),M(0x4a3a2a));pl.position.set(x,DH+.9,2.8);G.add(pl);NL.push({lp})}for(const gx of GX){const L=new THREE.PointLight(0xffc080,0,16,1.5);L.position.set(gx,6.4,2);G.add(L);NL.push({L})}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const l of NL){if(l.lp)l.lp.material.emissive.setRGB(nk*.9,nk*.6,nk*.4);if(l.L)l.L.intensity=nk*7}};
 /* 안내 */
 const sp=(x,z,rr,t,h)=>spots.push({x,y:Hg(x,z),z,r:rr,t,h});
 sp(14,1,3.4,'벽골제','백제 때 쌓은 우리나라에서 가장 오래되고 큰 저수지 둑이에요(사적). 지금 남은 둑만 약 2.5km, 높이 약 4.3m예요. 이 둑에 모은 물로 김제 넓은 들(호남평야)에 농사를 지었어요. 간추려 지었어요.');
 sp(GX[0]+5,5,3,'장생거','둑 아래로 물을 내보내던 돌기둥 수문이에요. 두 돌기둥 홈에 나무판을 끼워 올리고 내려 물을 조절했어요.');
 sp(5,-2,3,'쌍룡 이야기','벽골제를 지키던 청룡과, 둑을 무너뜨리려던 백룡이 싸웠다는 이야기가 전해요. 둑을 쌓다 희생된 단야 낭자 이야기도 함께 내려와요.');
 sp(GX[1]+4,6,1.8,'수문 지키는 자리','비 오는 동안 수문을 여닫아 저수지 물높이를 지키고 논에 물을 대 봐요.');
 sp(30,40,2.4,'발굴 탐지 자리','벽골제 둘레 땅속에 옛 농사의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 수문 지키기(11/21): 비가 오면 저수지가 차오름. 수문을 열면 저수지가 낮아지고 논에 물이 참. 저수지는 초록 칸(넘치지도 바닥나지도), 논은 물이 참 칸에 오래 있을수록 점수. 60초 */
 window.__BGGATE=()=>{if(document.getElementById('bgjP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(GX[1]+3,4,0);H3.face(Math.PI)}catch(e){}
  window.__GCAM=()=>document.getElementById('bgjP')?[GX[1]+22,16,30,GX[1]-6,1,-12,55]:null;
  let res=.5,field=.45,open=false,rain=.3,good=0,t0=performance.now()/1000,last=t0,done=false;const TL=60;
  const d=document.createElement('div');d.id='bgjP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1e2622;border:3px solid #8ac0a0;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef6f0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const bar=(id,lbl)=>`<div style="font-size:12px;text-align:left;margin-top:4px">${lbl}</div><div style="position:relative;height:14px;background:#2a3a34;border-radius:7px;overflow:hidden"><div style="position:absolute;left:30%;width:45%;top:0;bottom:0;background:rgba(140,224,140,.3)"></div><div id="${id}" style="height:100%;width:0;background:#4a9ac0"></div></div>`;
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#c0f0d0">🌧️ 벽골제 수문 지키기</b><div id="bgjR" style="font-size:13px;margin:4px 0">비: 약함</div>${bar('bgjA','저수지 물높이')}${bar('bgjB','논 물')}<button id="bgjBtn" style="font:20px 'Do Hyeon',sans-serif;background:#8ac0a0;color:#102018;border:0;border-radius:12px;padding:10px 18px;margin:8px 0 4px;cursor:pointer;width:100%">수문 열기</button><div id="bgjS" style="font-size:13px">좋은 때 0초</div><div id="bgjT" style="font-size:13px">${TL}초</div>`;
  const A=d.querySelector('#bgjA'),B=d.querySelector('#bgjB'),Rr=d.querySelector('#bgjR'),Btn=d.querySelector('#bgjBtn'),Sx=d.querySelector('#bgjS'),T=d.querySelector('#bgjT');
  const creak=()=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='sawtooth';o.frequency.setValueAtTime(110,s);o.frequency.linearRampToValueAtTime(70,s+.4);gg.gain.setValueAtTime(.04,s);gg.gain.exponentialRampToValueAtTime(.0001,s+.45);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+.5)}catch(e){}};
  const toggle=()=>{if(done)return;open=!open;creak();Btn.textContent=open?'수문 닫기':'수문 열기'};Btn.onclick=toggle;const onKey=e=>{if(e.code==='Space'){e.preventDefault();toggle()}};addEventListener('keydown',onKey);
  const drops=new THREE.Group();G.add(drops);const dm=new THREE.MeshBasicMaterial({color:0xaac8e0,transparent:true,opacity:.6});for(let i=0;i<160;i++){const dr=new THREE.Mesh(new THREE.BoxGeometry(.04,.8,.04),dm);dr.position.set(GX[1]-30+Math.random()*60,Math.random()*20,-20+Math.random()*50);drops.add(dr)}
  const fin=()=>{if(done)return;done=true;removeEventListener('keydown',onKey);G.remove(drops);const Q=Math.round(Math.min(100,good/TL*100*1.15));const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('byeokgol_gate',Q,'벽골제 수문 지키기')}catch(e){}window.__BGJQ=Q;
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#c0f0d0">알맞게 지킨 시간 ${Math.round(good)}초</b><div style="font-size:13px;margin:4px 0">벽골제는 비가 많이 오면 물을 가두고, 가물면 수문을 열어 넓은 들에 물을 댔어요. 덕분에 김제·만경 들은 우리나라 으뜸 곡창이 됐어요.</div><div style="font-size:26px;color:#8ac0a0">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#8ac0a0;color:#102018;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef6f0;border:2px solid #eef6f0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__BGGATE(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},500)};
  const loop=()=>{if(!d.isConnected){removeEventListener('keydown',onKey);G.remove(drops);return}const now=performance.now()/1000,dt=Math.min(.05,now-last);last=now;const el=now-t0;
   if(!done){rain=.25+.55*Math.max(0,Math.sin(el*.22))+.2*Math.max(0,Math.sin(el*.9+1));res+=(rain*.03-(open?.045:0))*dt*1.4;field+=((open?.05:0)-.012)*dt*1.4;res=Math.max(0,Math.min(1,res));field=Math.max(0,Math.min(1,field));
    const okR=res>.3&&res<.75,okF=field>.3&&field<.75;if(okR&&okF)good+=dt;
    A.style.width=(res*100)+'%';A.style.background=okR?'#4ac08a':res>=.75?'#e05a4a':'#c0a04a';B.style.width=(field*100)+'%';B.style.background=okF?'#4ac08a':field>=.75?'#e05a4a':'#c0a04a';Rr.textContent='비: '+(rain>.7?'세찬 비':rain>.45?'보통':'약함');Sx.textContent='좋은 때 '+Math.round(good)+'초';
    const left=Math.max(0,TL-el);T.textContent=Math.ceil(left)+'초';if(left<=0)fin()}
   RES.position.y=.6+res*3;for(const w of PAD){w.material.opacity=field*.7}PLANK[1].position.y=open?5.4:2.2;PLANK[3].position.y=open?5.4:2.2;
   for(const dr of drops.children){dr.position.y-=dt*24;if(dr.position.y<0)dr.position.y=20}dm.opacity=.2+rain*.5;
   requestAnimationFrame(loop)};loop();
  window.__BGJG={toggle,get res(){return res},get field(){return field},get open(){return open},get good(){return good}};try{ctx.say('비가 와요! 수문을 여닫아 저수지와 논 물을 알맞게 지켜요.',2.6)}catch(e){}};
 /* 발굴 탐지 */
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'나무 말뚝',h:'둑을 쌓을 때 흙이 미끄러지지 않게 박은 나무 말뚝이에요. 벽골제 발굴에서 둑 속 나무 구조가 나왔어요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.05,.07,.5,8),M(0x5a3a24));m.rotation.z=Math.PI/2;g.add(m)})},
  {n:'풀 줄기 깐 흙층',h:'흙 사이사이 풀과 나뭇잎을 깔아 둑을 튼튼하게 다진 흔적이에요(부엽 공법).',mk:mk(g=>{for(let i=0;i<4;i++){const l=new THREE.Mesh(new THREE.BoxGeometry(.4,.03,.12),M(i%2?0x6a5a30:0x8a6a48));l.position.y=i*.035;g.add(l)}})},
  {n:'탄화미(불탄 쌀)',h:'불에 타 숯처럼 남은 쌀알이에요. 오래전부터 이곳에서 벼농사를 지었다는 증거예요.',mk:mk(g=>{for(let i=0;i<10;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(.025,6,4),M(0x1a1410));m.scale.set(1.6,.8,.8);m.position.set((Math.random()-.5)*.2,0,(Math.random()-.5)*.2);g.add(m)}})},
  {n:'따비 날',h:'땅을 일구던 농기구 따비의 쇠날이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.08,.02,.3),M(0x4a3a30,{metalness:.5}));g.add(m)})},
  {n:'백제 토기 조각',h:'둑을 쌓던 백제 사람들이 쓴 토기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.28,12,1,true,0,1.4),M(0x6a6258,{side:THREE.DoubleSide})))})}];
 window.__BGJDIG=()=>{window.__DETECT&&window.__DETECT({key:'byeokgol_dig',title:'벽골제 발굴 탐지',emoji:'⛏️',bg:'#1e2622',count:4,TL:150,cand:[[30,40],[-30,30],[60,22],[-60,44],[90,30],[-90,26],[10,60],[-20,70]],items:ITEMS,intro:'벽골제 둘레 땅속에 옛 농사의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'벽골제 발굴에서는 둑 속 나무 구조와 풀 깐 흙층이 나와, 백제 사람들의 둑 쌓는 솜씨를 보여 줘요.'})};
 const meta={quest:{t:'벽골제 둘러보기',d:'백제의 큰 둑을 걸어 보세요.',steps:[['벽골제','벽골제'],['장생거','장생거'],['쌍룡','쌍룡 이야기']]},
  title:'김제 벽골제',hint:'백제 때 쌓은 가장 오래된 저수지 둑을 공개 수치로 간추려 지었어요. 둑 위를 걷고, 비 오는 날 수문을 여닫아 논에 물을 대 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:14,z:14,lines:['김제 벽골제','사적 · 백제 저수지 둑','장생거·경장거 수문','간추려 지음']}},
  npc:[['science',[[6,12],[20,12],[20,20],[6,20]]]],bounds:[-150,150,-BW,100],level:()=>'벽골제',camCap:()=>Infinity,baseAt:(x,z)=>Hg(x,z),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1,ox:0,oz:30,draw(g,X,Z,S){g.fillStyle='#8aa04a';g.fillRect(0,0,300,300);g.fillStyle='#3f6f7a';g.fillRect(0,0,300,Z(-BW));g.fillStyle='#c8b894';g.fillRect(0,Z(TW),300,TW*2*S);g.fillStyle='#6a5a48';for(const gx of GX)g.fillRect(X(gx-2),Z(3),4*S,6*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:14,z:28,yaw:Math.PI},size:{}},meta)}
