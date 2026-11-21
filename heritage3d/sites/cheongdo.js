/* 청도 운문사·석빙고 마당(2026-11-22, W41): 공개 실측 3D(CC BY)가 없어 공개 사진·수치로 간추려 지음.
   청도 석빙고(보물, 1713): 남아 있는 석빙고 가운데 가장 오래된 것. 반지하에 화강암 아치(무지개 모양 홍예) 넷을 걸어 천장을 만들고, 위를 흙과 잔디로 덮고 환기 구멍을 냄. 겨울에 강 얼음을 떠서 짚으로 덮어 여름까지 썼음.
   운문사: 비구니 스님들이 공부하는 큰 절, 마당의 처진소나무(천연기념물). 청도는 소싸움(머리 맞대고 밀어내기) 축제로도 이름남.
   놀이: 석빙고 얼음 지키기(달마다 짚과 환기구를 정해 여름까지 얼음 남기기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildCheongdo(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1713);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x8a9a4a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 석빙고: 흙 둔덕 + 앞쪽 돌 입구 + 위 환기구 셋, 안은 아치 굴(걸어 들어감) */const BX=-20,BZ=10;{const st=M(0xa89c88,{flatShading:true,side:THREE.DoubleSide});const g=new THREE.Group();g.position.set(BX,0,BZ);
  const vault=new THREE.Mesh(new THREE.CylinderGeometry(2.6,2.6,13,20,1,true,0,Math.PI),st);vault.rotation.set(0,0,Math.PI/2);vault.rotation.set(Math.PI/2,0,0);vault.rotation.z=0;g.add(vault);vault.rotation.set(-Math.PI/2,Math.PI/2,0);
  const vv=new THREE.Mesh(new THREE.CylinderGeometry(2.6,2.6,13,20,1,true,0,Math.PI),st);vv.geometry.rotateZ(Math.PI/2);vv.geometry.rotateY(Math.PI/2);g.remove(vault);g.add(vv);
  for(let k=0;k<4;k++){const a=new THREE.Mesh(new THREE.TorusGeometry(2.55,.22,6,20,Math.PI),M(0x8a8070));a.position.set(0,0,-5+k*3.3);g.add(a)}
  const mound=new THREE.Mesh(new THREE.CylinderGeometry(4.2,4.2,15,20,1,true,0,Math.PI),M(0x6a9a3a,{roughness:1}));mound.geometry.rotateZ(Math.PI/2);mound.geometry.rotateY(Math.PI/2);mound.scale.y=.85;g.add(mound);
  const back=new THREE.Mesh(new THREE.CircleGeometry(2.6,20,0,Math.PI),st);back.position.z=-6.5;g.add(back);
  const fr=new THREE.Mesh(new THREE.BoxGeometry(7,3.4,.6),M(0xa89c88));fr.position.set(0,1.7,7.4);g.add(fr);const door=new THREE.Mesh(new THREE.BoxGeometry(1.6,2.2,.7),M(0x1a1612));door.position.set(0,1.1,7.4);g.add(door);
  for(const dz of[-4,0,4]){const ch=new THREE.Mesh(new THREE.BoxGeometry(.9,.9,.9),M(0x9a9080));ch.position.set(0,3.9,dz);g.add(ch);const cap=new THREE.Mesh(new THREE.BoxGeometry(1.3,.2,1.3),M(0x8a8070));cap.position.set(0,4.45,dz);g.add(cap)}
  const fl=new THREE.Mesh(new THREE.BoxGeometry(5,.1,13),M(0x5a5248));fl.position.y=.05;g.add(fl);
  G.add(g);solids.push({x0:BX-4.3,x1:BX-2.4,y0:0,y1:5,z0:BZ-7.6,z1:BZ+7.6},{x0:BX+2.4,x1:BX+4.3,y0:0,y1:5,z0:BZ-7.6,z1:BZ+7.6},{x0:BX-4.3,x1:BX+4.3,y0:0,y1:5,z0:BZ-7.6,z1:BZ-6.4},{x0:BX-3.5,x1:BX-.8,y0:0,y1:3.4,z0:BZ+7,z1:BZ+7.8},{x0:BX+.8,x1:BX+3.5,y0:0,y1:3.4,z0:BZ+7,z1:BZ+7.8})}
 /* 운문사: 대웅보전 + 처진소나무 */const UX=26,UZ=-24;if(!mini){const h=buildHall({x:UX,z:UZ,ry:Math.PI,W:12,D:8,nx:5,nz:2,FY:1,PH:3.6,roof:'hip',name:'大雄寶殿',pillar:0x9a3a26,bracket:'dapo',front:'door',roofScale:1,solids,light:false});G.add(h.group);h.group.traverse(e=>{if(e.isMesh)cam.push(e)})}
 {const t=new THREE.Mesh(new THREE.CylinderGeometry(.5,.8,3,8),M(0x6a4030));t.position.set(UX-14,1.5,UZ+12);G.add(t);const lm=M(0x2f5a2a);for(let k=0;k<10;k++){const a=k/10*Math.PI*2;const c=new THREE.Mesh(new THREE.SphereGeometry(2.4,10,8),lm);c.scale.set(1,.4,1);c.position.set(UX-14+Math.cos(a)*4.4,2.6-Math.abs(Math.sin(a*2))*.6,UZ+12+Math.sin(a)*4.4);G.add(c)}const cc=new THREE.Mesh(new THREE.SphereGeometry(3,10,8),lm);cc.scale.y=.5;cc.position.set(UX-14,3.4,UZ+12);G.add(cc);for(let k=0;k<6;k++){const p=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,2,5),M(0x8a6a44));const a=k/6*Math.PI*2;p.position.set(UX-14+Math.cos(a)*5,1,UZ+12+Math.sin(a)*5);G.add(p)}solids.push({cx:UX-14,cz:UZ+12,r:1,y0:0,y1:4})}
 /* 소싸움 경기장(동쪽, 안내만) */{const ar=new THREE.Mesh(new THREE.CylinderGeometry(12,12,.1,32),M(0xc8b080));ar.position.set(50,.05,30);G.add(ar);const fence=new THREE.Mesh(new THREE.TorusGeometry(12,.1,6,40),M(0x8a6a44));fence.rotation.x=Math.PI/2;fence.position.set(50,1,30);G.add(fence)}
 const NL=[];if(!mini){for(const[x,y,z]of[[BX,3,BZ+9],[BX,2,BZ],[UX,4,UZ+6],[50,3,30]]){const L=new THREE.PointLight(0xffc080,0,22,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach((L,i)=>L.intensity=i===1?1.5+nk*4:nk*7)};
 /* 안내 */const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(BX,BZ+10,3,'청도 석빙고','1713년에 지은, 남아 있는 석빙고 가운데 가장 오래된 얼음 창고예요(보물). 돌 아치 넷으로 천장을 받치고 흙을 덮었어요. 지붕 위 굴뚝 같은 구멍으로 더운 공기를 내보냈어요. 걸어 들어가 봐요. 간추려 지었어요.');
 sp(BX+5,BZ+12,2.2,'얼음 지키는 자리','겨울에 떠 온 얼음을 여름까지 지켜 봐요.');
 sp(UX,UZ+8,3,'운문사','비구니 스님들이 공부하는 큰 절이에요. 마당의 처진소나무는 가지가 우산처럼 늘어진 천연기념물이에요. 간추려 지었어요.');
 sp(50,44,3,'소싸움 경기장','청도는 소가 머리를 맞대고 밀어내는 전통 소싸움 축제로 이름났어요. 먼저 물러나는 소가 져요.');
 sp(-50,40,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 석빙고 얼음 지키기(11/22): 1월에 얼음 100을 넣어요. 달마다 「짚 덮기」(짚단 모두 8개)와 「환기구 열기/닫기」를 정하고 「다음 달」. 따뜻할수록 얼음이 녹아요. 짚은 녹는 것을 줄이고, 더운 달엔 환기구를 열어 더운 공기를 빼야 덜 녹아요. 추운 달에 열면 찬 기운이 빠져요. 8월까지 많이 남길수록 좋아요 */
 const MON=[['1월',-2],['2월',0],['3월',6],['4월',12],['5월',17],['6월',22],['7월',26],['8월',27]];
 window.__CDICE=()=>{if(document.getElementById('cdP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(BX+5,BZ+12,0)}catch(e){}
  let m=0,ice=100,straw=8,cover=0,vent=false,done=false,log=[];
  const d=document.createElement('div');d.id='cdP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:16px;z-index:60;background:#1a2228;border:3px solid #a8d0e0;border-radius:16px;padding:10px 14px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#eef6f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:310px;max-width:94vw;user-select:none";document.body.appendChild(d);
  const snd=(f,len,type='sine')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const render=msg=>{const[name,T]=MON[m];d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#c8e8f4">🧊 석빙고 얼음 지키기</b><div style="display:flex;justify-content:space-between;margin:6px 0;font:15px 'Do Hyeon',sans-serif"><span>${name} · 바깥 ${T}°C</span><span>얼음 ${Math.round(ice)}</span></div><div style="height:12px;background:#2a3a44;border-radius:6px;overflow:hidden"><div style="height:100%;width:${Math.max(0,ice)}%;background:#a8d8f0"></div></div><div style="display:flex;gap:6px;margin-top:8px;align-items:center;justify-content:center"><span>짚 덮음 ${cover}단 (남은 짚 ${straw})</span><button data-s style="font:13px 'Do Hyeon',sans-serif;background:#c8a860;color:#1a2228;border:0;border-radius:8px;padding:4px 8px;cursor:pointer">+짚 덮기</button></div><div style="margin-top:6px"><button data-v style="font:13px 'Do Hyeon',sans-serif;background:${vent?'#4a9ad8':'#5a5a5a'};color:#fff;border:0;border-radius:8px;padding:4px 10px;cursor:pointer">환기구 ${vent?'열림':'닫힘'}</button></div><button data-n style="width:100%;margin-top:8px;font:16px 'Do Hyeon',sans-serif;background:#a8d0e0;color:#1a2228;border:0;border-radius:12px;padding:8px 0;cursor:pointer">다음 달 ▶</button><div style="font-size:12px;color:#c8e8f4;margin-top:4px">${msg||'짚과 환기구를 정하고 다음 달로 넘어가요'}</div>`;
   d.querySelector('[data-s]').onclick=()=>{if(done||straw<=0)return;straw--;cover++;snd(400,.08);render()};d.querySelector('[data-v]').onclick=()=>{if(done)return;vent=!vent;snd(600,.06);render()};d.querySelector('[data-n]').onclick=next};
  const next=()=>{if(done)return;const[name,T]=MON[m];let melt=Math.max(0,T+3)*1.25;melt*=Math.max(.25,1-cover*.11);if(T>=12)melt*=vent?.7:1.15;else if(vent)melt+=3;ice=Math.max(0,ice-melt);snd(300,.15);log.push(Math.round(melt));m++;if(m>=MON.length){fin();return}render(`${name}에 얼음 ${Math.round(melt)}이 녹았어요`)};
  const fin=()=>{if(done)return;done=true;const Q=Math.min(100,Math.round(ice*1.6));const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('cheongdo_ice',Q,'석빙고 얼음 지키기')}catch(e){}window.__CDQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#c8e8f4">8월에 얼음 ${Math.round(ice)}이 남았어요</b><div style="font-size:13px;margin:4px 0">석빙고는 반지하라 땅의 찬 기운을 쓰고, 천장 아치 사이 골로 더운 공기를 모아 환기구로 내보냈어요. 얼음은 짚과 왕겨로 덮어 녹지 않게 했어요.</div><div style="font-size:24px;color:#a8d0e0">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#a8d0e0;color:#1a2228;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef6f8;border:2px solid #eef6f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__CDICE()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  render();window.__CDG={addStraw:()=>d.querySelector('[data-s]')&&d.querySelector('[data-s]').onclick(),setVent:v=>{vent=v;render()},next,get m(){return m},get ice(){return ice},get straw(){return straw},MON};try{ctx.say('여름까지 얼음을 지켜요!',2)}catch(e){}};
 /* 발굴 탐지 */const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'얼음 뜨던 쇠갈고리',h:'강 얼음을 끌어 나르던 쇠갈고리예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.TorusGeometry(.08,.015,6,12,Math.PI*1.3),M(0x4a3a30,{metalness:.5})))})},
  {n:'짚 뭉치',h:'얼음을 덮던 짚이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.24,6),M(0xd8c088)))})},
  {n:'막새 기와',h:'운문사 지붕 끝 기와예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18),M(0x5a5a5a)))})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__CDDIG=()=>{window.__DETECT&&window.__DETECT({key:'cheongdo_dig',title:'청도 발굴 탐지',emoji:'⛏️',bg:'#1a2228',count:4,TL:150,cand:[[-50,40],[-40,-30],[0,40],[-60,0],[10,-50],[-20,50],[60,-20],[-70,30]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'청도는 오래된 석빙고와 산사가 있는 고장이에요.'})};
 const meta={quest:{t:'청도 둘러보기',d:'석빙고와 운문사, 소싸움 경기장을 둘러보세요.',steps:[['석빙고','청도 석빙고'],['운문사','운문사'],['소싸움','소싸움 경기장']]},
  title:'청도 운문사·석빙고',hint:'남아 있는 가장 오래된 석빙고와 운문사를 간추려 지었어요. 짚과 환기구로 여름까지 얼음을 지켜 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-2,z:30,lines:['청도 운문사·석빙고','1713 석빙고(보물)','처진소나무 · 소싸움','간추려 지음']}},
  npc:[['science',[[-6,28],[2,28],[2,36],[-6,36]]]],bounds:[-90,90,-90,90],level:()=>'청도',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#6a9a3a';g.fillRect(X(BX-4.2),Z(BZ-7.5),8.4*S,15*S);g.fillStyle='#9a3a26';g.fillRect(X(UX-6),Z(UZ-4),12*S,8*S);g.fillStyle='#c8b080';g.beginPath();g.arc(X(50),Z(30),12*S,0,7);g.fill()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-2,z:34,yaw:Math.PI},size:{}},meta)}
