/* 아산 외암마을 마당(2026-11-21): 공개 실측 3D(CC BY)가 없어 간추려 지음(집은 hanokkit 실측 한옥·초가 CC BY).
   외암마을(국가민속문화유산): 설화산 아래 500년 넘은 예안 이씨 마을. 집집을 잇는 돌담길이 5km 넘게 굽이굽이 이어지고, 기와집(건재고택·참판댁)과 초가가 섞여 있음. 마을 앞 시내와 물레방아, 장승.
   놀이: 돌담길 떡 심부름(굽은 돌담길에서 깃발 꽂힌 세 집을 찾아 떡 바구니 나르기), 발굴 탐지, 밤 등불. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {placeHanok} from './hanokkit.js';
export function buildOeam(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1500);
 const TOUCH=opts.touch!=null?!!opts.touch:matchMedia('(pointer:coarse)').matches;
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#7d8f4a';q.fillRect(0,0,w,h);for(let i=0;i<3600;i++){q.fillStyle=r()<.5?'rgba(90,110,40,.5)':'rgba(170,150,90,.35)';q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
 const gr=new THREE.Mesh(new THREE.PlaneGeometry(320,280),new THREE.MeshStandardMaterial({map:GT,roughness:1}));gr.rotation.x=-Math.PI/2;gr.position.y=.01;gr.receiveShadow=true;G.add(gr);
 /* 돌담 미로: 6×4칸(한 칸 22m). 깊이 우선으로 길을 뚫음(같은 씨앗이라 늘 같은 마을) */
 const NX=6,NZ=4,CS=22,OX=-NX*CS/2,OZ=-NZ*CS/2;const cx=i=>OX+i*CS+CS/2,cz=j=>OZ+j*CS+CS/2;
 const open={};const key=(a,b,c,d)=>a<c||(a===c&&b<d)?`${a},${b}|${c},${d}`:`${c},${d}|${a},${b}`;const vis=new Set();const deg={};
 {const st=[[2,NZ-1]];vis.add('2,'+(NZ-1));while(st.length){const si=(r()*st.length)|0;const[i,j]=st[si];const nb=[[1,0],[-1,0],[0,1],[0,-1]].map(([a,b])=>[i+a,j+b]).filter(([a,b])=>a>=0&&b>=0&&a<NX&&b<NZ&&!vis.has(a+','+b));if(!nb.length){st.splice(si,1);continue}const[a,b]=nb[(r()*nb.length)|0];open[key(i,j,a,b)]=1;vis.add(a+','+b);st.push([a,b])}
  for(let i=0;i<NX;i++)for(let j=0;j<NZ;j++){let d=0;for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]])if(open[key(i,j,i+a,j+b)])d++;deg[i+','+j]=d}}
 const SW=tex(256,128,(q,w,h)=>{q.fillStyle='#6a6458';q.fillRect(0,0,w,h);for(let i=0;i<70;i++){const x=r()*w,y=r()*h,rw=14+r()*22,rh=10+r()*14;const v=120+(r()*60|0);q.fillStyle=`rgb(${v},${v-6},${v-16})`;q.beginPath();q.ellipse(x,y,rw/2,rh/2,r(),0,7);q.fill();q.strokeStyle='rgba(40,34,28,.5)';q.lineWidth=2;q.stroke()}},[1,1]);
 const WH=1.7,WT=.8;const wall=(x0,z0,x1,z1)=>{const L=Math.hypot(x1-x0,z1-z0)+WT;const t=SW.clone();t.needsUpdate=true;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(L/3,1);const m=new THREE.Mesh(new THREE.BoxGeometry(L,WH,WT),new THREE.MeshStandardMaterial({map:t,roughness:.95}));m.position.set((x0+x1)/2,WH/2,(z0+z1)/2);m.rotation.y=-Math.atan2(z1-z0,x1-x0);m.castShadow=m.receiveShadow=true;G.add(m);
  const cap=new THREE.Mesh(new THREE.BoxGeometry(L,.25,WT+.2),M(0x5a5448));cap.position.set(m.position.x,WH+.1,m.position.z);cap.rotation.y=m.rotation.y;G.add(cap);solids.push({x0:Math.min(x0,x1)-WT/2,x1:Math.max(x0,x1)+WT/2,y0:0,y1:WH+.3,z0:Math.min(z0,z1)-WT/2,z1:Math.max(z0,z1)+WT/2})};
 const EN=[2,NZ-1];/* 입구: 남쪽 가운데 칸 아래 */
 for(let i=0;i<NX;i++)for(let j=0;j<NZ;j++){const x0=OX+i*CS,z0=OZ+j*CS;if(i<NX-1&&!open[key(i,j,i+1,j)])wall(x0+CS,z0,x0+CS,z0+CS);if(j<NZ-1&&!open[key(i,j,i,j+1)])wall(x0,z0+CS,x0+CS,z0+CS)}
 wall(OX,OZ,OX+NX*CS,OZ);wall(OX,OZ,OX,OZ+NZ*CS);wall(OX+NX*CS,OZ,OX+NX*CS,OZ+NZ*CS);wall(OX,OZ+NZ*CS,OX+EN[0]*CS+5,OZ+NZ*CS);wall(OX+EN[0]*CS+CS-5,OZ+NZ*CS,OX+NX*CS,OZ+NZ*CS);
 /* 길(마사토) */{const PT=tex(128,128,(q,w,h)=>{q.fillStyle='#b8a47e';q.fillRect(0,0,w,h);for(let i=0;i<700;i++){q.fillStyle=r()<.5?'rgba(140,120,90,.5)':'rgba(210,200,170,.4)';q.fillRect(r()*w,r()*h,3,3)}},[2,8]);const pm=new THREE.MeshStandardMaterial({map:PT,roughness:1});
  for(const k in open){const[a,b]=k.split('|').map(s=>s.split(',').map(Number));const x0=cx(a[0]),z0=cz(a[1]),x1=cx(b[0]),z1=cz(b[1]);const L=Math.hypot(x1-x0,z1-z0)+4;const p=new THREE.Mesh(new THREE.PlaneGeometry(4,L),pm);p.rotation.x=-Math.PI/2;p.rotation.z=Math.atan2(x1-x0,z1-z0);p.position.set((x0+x1)/2,.02,(z0+z1)/2);G.add(p)}
  const p=new THREE.Mesh(new THREE.PlaneGeometry(4,30),pm);p.rotation.x=-Math.PI/2;p.position.set(cx(EN[0]),.02,OZ+NZ*CS+4);G.add(p)}
 /* 막다른 칸 = 집. 집 앞이 열린 쪽을 봄 */
 const HOUSES=[];const kinds=['sarang','choga1','nongga','choga2','sarang','choga1','choga1','sarang','nongga','choga2'];let hk=0;
 for(let i=0;i<NX;i++)for(let j=0;j<NZ;j++){if(i===EN[0]&&j===EN[1])continue;if(deg[i+','+j]!==1)continue;let dir=null;for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]])if(open[key(i,j,i+a,j+b)])dir=[a,b];const x=cx(i)-dir[0]*3,z=cz(j)-dir[1]*3;const ry=Math.atan2(dir[0],dir[1]);const k=kinds[hk++%kinds.length];if(!mini)placeHanok(G,solids,k,x,z,ry,{TOUCH,s:k.startsWith('choga')?.62:.6});HOUSES.push({i,j,x,z,fx:cx(i)+dir[0]*6.5,fz:cz(j)+dir[1]*6.5,k})}
 /* 다른 칸: 감나무·장독대 */{const tm=M(0x5a4430),lm=M(0x5a8a3a),fm=M(0xe07a20);for(let i=0;i<NX;i++)for(let j=0;j<NZ;j++){if(deg[i+','+j]===1)continue;for(let t=0;t<2;t++){const x=cx(i)+(t?-1:1)*(6+r()*2),z=cz(j)+(r()<.5?-1:1)*(6+r()*2);const tr=new THREE.Mesh(new THREE.CylinderGeometry(.22,.32,3.4,7),tm);tr.position.set(x,1.7,z);G.add(tr);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(2.2,1),lm);c.position.set(x,4.2,z);c.scale.y=.8;c.castShadow=true;G.add(c);for(let f=0;f<8;f++){const fr=new THREE.Mesh(new THREE.SphereGeometry(.14,8,6),fm);const a=r()*6.28;fr.position.set(x+Math.cos(a)*1.9,3.6+r()*1.4,z+Math.sin(a)*1.9);G.add(fr)}solids.push({cx:x,cz:z,r:.4,y0:0,y1:5})}
   const jx=cx(i)+(r()-.5)*4,jz=cz(j)+(r()<.5?-7:7);for(let k=0;k<5;k++){const jar=new THREE.Mesh(new THREE.SphereGeometry(.35+r()*.15,12,8),M(0x5a3a24,{roughness:.5}));jar.scale.y=1.2;jar.position.set(jx+(k-2)*.9,.45,jz);G.add(jar)}solids.push({x0:jx-2.3,x1:jx+2.3,y0:0,y1:1,z0:jz-.5,z1:jz+.5})}}
 /* 마을 앞: 시내·물레방아·장승·방앗간 */
 const SZ=OZ+NZ*CS+14;{const w=new THREE.Mesh(new THREE.PlaneGeometry(260,6),M(0x4a7a84,{roughness:.12,metalness:.15}));w.rotation.x=-Math.PI/2;w.position.set(0,.04,SZ+8);G.add(w);solids.push({x0:-130,x1:cx(EN[0])-3,y0:0,y1:1,z0:SZ+5,z1:SZ+11},{x0:cx(EN[0])+3,x1:130,y0:0,y1:1,z0:SZ+5,z1:SZ+11});
  const br=new THREE.Mesh(new THREE.BoxGeometry(5,.3,8),M(0x7a5a38));br.position.set(cx(EN[0]),.25,SZ+8);G.add(br);
  const wh=new THREE.Group();wh.position.set(cx(EN[0])+14,2.2,SZ+5);const wr=new THREE.Mesh(new THREE.TorusGeometry(2,.18,8,24),M(0x6a4a2e));wh.add(wr);for(let k=0;k<12;k++){const pd=new THREE.Mesh(new THREE.BoxGeometry(.3,1,.6),M(0x7a5a38));const a=k/12*6.28;pd.position.set(Math.cos(a)*2,Math.sin(a)*2,0);pd.rotation.z=a;wh.add(pd)}wh.rotation.y=Math.PI/2;G.add(wh);window.__OEWHEEL=wh;
  const mill=new THREE.Mesh(new THREE.BoxGeometry(5,3,4),M(0xd8c8a8));mill.position.set(cx(EN[0])+18,1.5,SZ+3);G.add(mill);const mr=new THREE.Mesh(new THREE.ConeGeometry(4,1.8,4),M(0xb89a5a));mr.rotation.y=Math.PI/4;mr.position.set(cx(EN[0])+18,3.9,SZ+3);G.add(mr);solids.push({x0:cx(EN[0])+15.5,x1:cx(EN[0])+20.5,y0:0,y1:4,z0:SZ+1,z1:SZ+5});
  for(const s of[-1,1]){const js=new THREE.Group();js.position.set(cx(EN[0])+s*4,0,OZ+NZ*CS+6);const b=new THREE.Mesh(new THREE.CylinderGeometry(.3,.36,2.6,8),M(0x8a6a48));b.position.y=1.3;js.add(b);const hd=new THREE.Mesh(new THREE.SphereGeometry(.42,10,8),M(0x8a6a48));hd.position.y=2.8;js.add(hd);const ht=new THREE.Mesh(new THREE.CylinderGeometry(.3,.4,.4,8),M(0x2a2a2a));ht.position.y=3.2;js.add(ht);G.add(js);solids.push({cx:js.position.x,cz:js.position.z,r:.4,y0:0,y1:3.4})}}
 /* 밤 */
 const NL=[];if(!mini){for(const h of HOUSES){const L=new THREE.PointLight(0xffc080,0,14,1.5);L.position.set(h.fx,2.4,h.fz);G.add(L);const lp=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.4,10),new THREE.MeshStandardMaterial({color:0xa02a2a,emissive:0}));lp.position.set(h.fx,2.2,h.fz);G.add(lp);NL.push({L,lp})}}
 let nk=0,wt=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const l of NL){l.L.intensity=nk*6;l.lp.material.emissive.setRGB(nk*.9,nk*.6,nk*.4)}wt+=dt;if(window.__OEWHEEL)window.__OEWHEEL.rotation.x=wt*.8};
 /* 안내 */
 const EX=cx(EN[0]),EZ=OZ+NZ*CS;const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(EX+6,EZ+10,3.4,'외암마을','설화산 아래 500년 넘게 이어 온 예안 이씨 마을이에요(국가민속문화유산). 집과 집을 잇는 돌담길이 모두 5km가 넘어요. 기와집과 초가가 섞여 있고, 지금도 사람들이 살아요. 간추려 지었어요.');
 sp(EX-6,EZ+8,2.4,'장승','마을 들머리를 지키는 장승이에요. 나쁜 기운이 마을에 들어오지 못하게 막는다고 믿었어요.');
 sp(EX+14,EZ+14,2.6,'물레방아와 방앗간','시냇물로 물레방아를 돌려 곡식을 찧었어요. 방앗간에서 떡을 쪄 이웃과 나눴어요.');
 sp(EX+12,EZ+9,1.8,'떡 바구니 받는 곳','방앗간 떡을 돌담길 안쪽 깃발 꽂힌 집들에 날라 봐요.');
 sp(EX-14,EZ+12,2.4,'발굴 탐지 자리','마을 앞 땅속에 옛 사람들의 물건이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 돌담길 떡 심부름(11/21): 깃발 꽂힌 집 셋에 떡 바구니. 150초 */
 window.__OEDDEOK=()=>{if(document.getElementById('oeP'))return;const H=window.__H3,ctx=H.ctx();try{H.tp(EX+12,EZ+8,0);H.face(Math.PI)}catch(e){}
  const pool=HOUSES.slice().sort(()=>Math.random()-.5).slice(0,3);const g=new THREE.Group();G.add(g);
  const T3=pool.map((h,k)=>{const fl=new THREE.Group();const pole=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,9,6),M(0x6a4a2e));pole.position.y=4.5;fl.add(pole);const cl=new THREE.Mesh(new THREE.PlaneGeometry(2.2,1.4),new THREE.MeshBasicMaterial({color:[0xe04a3a,0x3a7ae0,0xe0b030][k],side:THREE.DoubleSide}));cl.position.set(1.1,8.2,0);fl.add(cl);fl.position.set(h.x,0,h.z);g.add(fl);const ring=new THREE.Mesh(new THREE.RingGeometry(1,1.3,24),new THREE.MeshBasicMaterial({color:0x8ae08a,transparent:true,opacity:.5,depthWrite:false,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.set(h.fx,.05,h.fz);g.add(ring);return{h,fl,cl,ring,got:false}});
  const basket=new THREE.Mesh(new THREE.CylinderGeometry(.45,.35,.35,14),M(0xb08850));g.add(basket);
  let n=0,done=false,t0=performance.now()/1000;const TL=150;
  const d=document.createElement('div');d.id='oeP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2418;border:3px solid #d8a060;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffd890">🧺 돌담길 떡 심부름</b><div id="oeS" style="font:20px 'Do Hyeon',sans-serif;margin:4px 0">0 / 3 집</div><div id="oeG" style="font-size:13px;color:#ffd890">돌담 너머 깃발이 꽂힌 집을 찾아가요</div><div id="oeT" style="font-size:13px">${TL}초</div><div style="font-size:12px;opacity:.85">돌담길이 굽이져요. 깃발을 보며 길을 찾아 집 앞 초록 고리에 서요</div>`;const Sx=d.querySelector('#oeS'),Gd=d.querySelector('#oeG'),T=d.querySelector('#oeT');
  const ding=()=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='triangle';o.frequency.setValueAtTime(660,s);o.frequency.setValueAtTime(880,s+.12);gg.gain.setValueAtTime(.07,s);gg.gain.exponentialRampToValueAtTime(.0001,s+.5);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+.55)}catch(e){}};
  const fin=()=>{if(done)return;done=true;const el=performance.now()/1000-t0;const Q=n>=3?Math.max(70,Math.round(100-Math.max(0,el-70)*.5)):Math.round(n/3*65);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('oeam_ddeok',Q,'외암마을 떡 심부름')}catch(e){}window.__OEQ=Q;basket.visible=false;
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffd890">${n>=3?'세 집에 떡을 다 돌렸어요!':n+'집에 떡을 돌렸어요'}</b><div style="font-size:13px;margin:4px 0">외암마을 돌담은 밭에서 나온 돌을 쌓아 만들었어요. 굽이진 돌담길이 집과 집을 잇고, 잔치나 제사 때면 떡을 이웃과 나눠 먹었어요.</div><div style="font-size:26px;color:#d8a060">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#d8a060;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__OEDDEOK(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},800)};
  const loop=()=>{if(!d.isConnected){G.remove(g);return}const now=performance.now()/1000;const P=H.P;
   if(!done){for(const t of T3){if(t.got)continue;t.cl.rotation.y=Math.sin(now*3)*.3;if(Math.hypot(P.x-t.h.fx,P.z-t.h.fz)<1.8){t.got=true;n++;ding();t.ring.visible=false;t.cl.material.color.set(0x8ae08a);try{ctx.say('떡 왔어요!',1.2)}catch(e){}if(n>=3)fin()}}
    basket.position.set(P.x,P.y+1.8,P.z);Sx.textContent=n+' / 3 집';Gd.textContent=n<3?'돌담 너머 깃발이 꽂힌 집을 찾아가요':'';const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin()}
   requestAnimationFrame(loop)};loop();
  window.__OEG={T3:T3.map(t=>t.h),get n(){return n}};try{ctx.say('방앗간 떡을 돌담길 안 세 집에 날라요!',2.4)}catch(e){}};
 /* 발굴 탐지 */
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'떡살',h:'떡에 무늬를 찍던 나무 도장이에요. 집안마다 무늬가 달랐어요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.5,.08,.12),M(0x8a6a48));g.add(m);for(let i=0;i<3;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.02,10),M(0x5a3a24));c.position.set(-.15+i*.15,.05,0);g.add(c)}})},
  {n:'옹기 조각',h:'장독대 옹기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.24,.24,.3,12,1,true,0,1.4),M(0x5a3a24,{side:THREE.DoubleSide})))})},
  {n:'상평통보',h:'조선 후기 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})},
  {n:'백자 제기',h:'제사 때 음식을 올리던 백자 그릇이에요. 양반 마을이라 제사 그릇이 많이 남아요.',mk:mk(g=>{const b=new THREE.Mesh(new THREE.CylinderGeometry(.18,.08,.12,16),M(0xf0ece0,{roughness:.3}));b.position.y=.12;g.add(b);const f=new THREE.Mesh(new THREE.CylinderGeometry(.08,.12,.12,16),M(0xf0ece0,{roughness:.3}));g.add(f)})},
  {n:'놋수저',h:'놋쇠 숟가락과 젓가락이에요.',mk:mk(g=>{for(const z of[-.03,.03]){const s=new THREE.Mesh(new THREE.BoxGeometry(.34,.015,.02),M(0xc8a040,{metalness:.8}));s.position.z=z;g.add(s)}})}];
 window.__OEDIG=()=>{window.__DETECT&&window.__DETECT({key:'oeam_dig',title:'외암마을 발굴 탐지',emoji:'⛏️',bg:'#26221a',count:4,TL:150,cand:[[EX-14,EZ+12],[EX-30,EZ+6],[EX+30,EZ+8],[EX-46,EZ+14],[EX+44,EZ+16],[EX-22,EZ+18],[EX+26,EZ+18],[EX-60,EZ+8]],items:ITEMS,intro:'외암마을 앞 땅속에 옛 사람들의 물건이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'500년 넘게 한 집안이 이어 산 마을이라 떡살·제기 같은 살림살이가 남아 있어요.'})};
 const meta={quest:{t:'외암마을 둘러보기',d:'돌담길 마을을 둘러보세요.',steps:[['외암마을','외암마을'],['장승','장승'],['물레방아','물레방아와 방앗간']]},
  title:'아산 외암마을',hint:'굽이진 돌담길이 집과 집을 잇는 외암마을을 간추려 지었어요(집은 실측 한옥·초가). 방앗간 떡을 깃발 꽂힌 집들에 날라 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:EX+8,z:EZ+18,lines:['아산 외암마을','국가민속문화유산','돌담길 5km · 기와집과 초가','간추려 지음']}},
  npc:[['science',[[EX-4,EZ+14],[EX+4,EZ+14],[EX+4,EZ+20],[EX-4,EZ+20]]]],bounds:[OX-30,-OX+30,OZ-30,EZ+40],level:()=>'외암마을',camCap:()=>Infinity,baseAt:(x,z)=>(Math.abs(x-cx(EN[0]))<2.6&&Math.abs(z-(SZ+8))<4.2)?.4:0,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.4,ox:0,oz:8,draw(g,X,Z,S){g.fillStyle='#7d8f4a';g.fillRect(0,0,300,300);g.strokeStyle='#6a6458';g.lineWidth=2;for(let i=0;i<NX;i++)for(let j=0;j<NZ;j++){const x0=OX+i*CS,z0=OZ+j*CS;if(i<NX-1&&!open[key(i,j,i+1,j)]){g.beginPath();g.moveTo(X(x0+CS),Z(z0));g.lineTo(X(x0+CS),Z(z0+CS));g.stroke()}if(j<NZ-1&&!open[key(i,j,i,j+1)]){g.beginPath();g.moveTo(X(x0),Z(z0+CS));g.lineTo(X(x0+CS),Z(z0+CS));g.stroke()}}g.strokeRect(X(OX),Z(OZ),NX*CS*S,NZ*CS*S);g.fillStyle='#8a5a3a';for(const h of HOUSES)g.fillRect(X(h.x)-3,Z(h.z)-3,6,6);g.fillStyle='#4a7a84';g.fillRect(0,Z(SZ+5),300,6*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:EX,z:SZ+20,yaw:Math.PI},size:{}},meta)}
