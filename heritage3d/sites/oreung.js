/* 경주 오릉·남산 서쪽 마당(2026-11-22): 신라 시조 박혁거세와 알영부인, 남해왕·유리왕·파사왕의 무덤으로 전해 오는 오릉, 지마왕릉·경애왕릉, 남산 용장사곡 삼층석탑.
   실측: 국가유산청 KHS_Asset 스케치팹 CC BY 「Five Royal Tombs, Gyeongju」(약 91×126m), 「Tomb Of King Jima」, 「Tomb of King Gyeongae」, 「Three story Stone Pagoda in Yongjangsagok Valley」. 모두 미터 단위라 실제 크기 그대로, 땅 높이만 맞췄어요.
   삼국유사에는 혁거세가 하늘로 올라간 뒤 몸이 다섯으로 나뉘어 떨어져 따로 묻어서 오릉이라 했다는 이야기가 전해요(전해 오는 이야기).
   놀이: 그림자로 봉분 높이 재기(1m 막대 그림자로 해의 기울기를 알고, 봉분 그림자 끝을 3D에서 눌러 높이를 어림하기. 실측 높이와 견줘요, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildOreung(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(57);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.95},o));
 const PL=[{f:'oreung.glb',x:0,z:-30,y:6.45},{f:'jima.glb',x:78,z:-10,y:1.5},{f:'gyeongae.glb',x:78,z:26,y:1.1},{f:'yongjang.glb',x:-66,z:18,y:2.25}];
 const scans=[];if(!mini){const L=new GLTFLoader();PL.forEach(p=>L.load(new URL('../models/oreung/'+p.f,import.meta.url).href,g=>{const o=g.scene;o.traverse(e=>{if(e.isMesh){e.receiveShadow=true;e.castShadow=true}});const w=new THREE.Group();w.add(o);w.userData.noBatch=true;w.position.set(p.x,p.y,p.z);G.add(w);scans.push(w)},undefined,()=>{}))}
 /* 오릉 봉분(실측 위 자리, 걸어 넘지 않게) */const MD=[{x:-3.2,z:12.6,r:13},{x:1.3,z:-22.1,r:8},{x:20.9,z:-26.6,r:8},{x:-22.9,z:-44.8,r:8},{x:-21.4,z:-23.6,r:8}].map(m=>({x:m.x,z:m.z-30,r:m.r}));MD.forEach(m=>solids.push({cx:m.x,cz:m.z,r:m.r*.75,y0:0,y1:12}));
 solids.push({cx:78,cz:-10,r:7,y0:0,y1:6},{cx:78,cz:26,r:6,y0:0,y1:5},{cx:-66,cz:18,r:2.4,y0:0,y1:6});
 const NL=[];if(!mini){for(const[x,y,z]of[[10,3,-6],[70,3,-2],[70,3,34],[-60,3,24]]){const P=new THREE.PointLight(0xffc080,0,26,1.5);P.position.set(x,y,z);G.add(P);NL.push(P);const lg=new THREE.Group();lg.userData.noBatch=true;const lp=new THREE.Mesh(new THREE.CylinderGeometry(.05,.06,y,6),M(0x3a2a1a));lp.position.y=y/2;lg.add(lp);const lm=new THREE.Mesh(new THREE.SphereGeometry(.34,12,8),new THREE.MeshStandardMaterial({color:0xfff0d0,emissive:0xffc060,emissiveIntensity:0}));lm.position.y=y+.1;lg.add(lm);lg.position.set(x+1.9,0,z);G.add(lg);P.userData.lm=lm}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(P=>{P.intensity=nk*60;if(P.userData.lm)P.userData.lm.material.emissiveIntensity=nk*8})};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(6,4,3.4,'경주 오릉','신라 시조 박혁거세와 알영부인, 남해왕·유리왕·파사왕의 무덤으로 전해요. 혁거세의 몸이 다섯으로 나뉘어 떨어져 따로 묻었다는 이야기도 전해요. 국가유산청 실측, 실제 크기예요.');
 sp(70,-1,3,'지마왕릉','신라 제6대 지마왕의 무덤으로 전해요. 국가유산청 실측, 실제 크기예요.');
 sp(70,36,3,'경애왕릉','신라 제55대 경애왕의 무덤으로 전해요. 국가유산청 실측, 실제 크기예요.');
 sp(-60,24,2.6,'용장사곡 삼층석탑','경주 남산 용장골 바위 위에 세운 삼층석탑이에요. 산 전체를 아래층 기단으로 삼았다고들 해요. 국가유산청 실측, 실제 크기예요.');
 sp(14,8,2.4,'그림자 재기 자리','막대 그림자로 봉분 높이를 재 봐요.');
 sp(-30,30,2.4,'발굴 탐지 자리','솔숲 흙 속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 그림자로 봉분 높이 재기(11/22) */
 window.__ORSHADOW=()=>{if(document.getElementById('orP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(16,10,0)}catch(e){}
  const RDS=[{m:0,alt:38,az:2.4},{m:1,alt:30,az:1.9},{m:2,alt:46,az:2.8}];let rd=0,phase='play',wait=0,auto=false,done=false,msg='',last=performance.now(),tip=null,apex=0,base=null;const res=[];const grp=new THREE.Group();grp.userData.noBatch=true;G.add(grp);
  const rcD=new THREE.Raycaster();const apexAt=(x,z)=>{rcD.set(new THREE.Vector3(x,60,z),new THREE.Vector3(0,-1,0));const h=rcD.intersectObjects(scans,true)[0];return h?h.point.y:0};
  const camOf=()=>{const m=MD[RDS[rd].m];const R=RDS[rd];const dx=Math.cos(R.az),dz=Math.sin(R.az);return[m.x+dx*12-dz*30,26,m.z+dz*12+dx*30,m.x+dx*12,0,m.z+dz*12,50]};
  window.__GCAM=()=>document.getElementById('orP')?camOf():null;
  const d=document.createElement('div');d.id='orP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#2a2418;border:3px solid #a8a070;border-radius:16px;padding:9px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:310px;max-width:94vw;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">📏 그림자로 봉분 높이 재기</b><div data-i style="margin:3px 0;font:14px 'Do Hyeon',sans-serif"></div><div data-k style="font:14px 'Do Hyeon',sans-serif;color:#f8e8a0"></div><div style="font-size:11.5px;color:#e0d8c0">봉분 그림자의 맨 끝을 눌러요. 막대 그림자와 같은 비율로 높이를 구해요</div><div data-m style="font-size:12px;color:#f8e8a0;margin-top:4px"></div>`;
  const q=k=>d.querySelector(k);const iEl=q('[data-i]'),kEl=q('[data-k]'),mEl=q('[data-m]');
  const snd=(f,len,type='sine',v=.05)=>{try{const AC=ctx.ac();if(!AC)return;const s0=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s0);g.gain.setValueAtTime(v,s0);g.gain.exponentialRampToValueAtTime(.0001,s0+len);o.connect(g).connect(ctx.out()||AC.destination);o.start(s0);o.stop(s0+len+.02)}catch(e){}};
  const SH=new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.32,depthWrite:false,side:THREE.DoubleSide});
  const newRound=()=>{while(grp.children.length)grp.remove(grp.children[0]);const R=RDS[rd],m=MD[R.m];const dx=Math.cos(R.az),dz=Math.sin(R.az);apex=Math.max(1,apexAt(m.x,m.z));const t=1/Math.tan(R.alt*Math.PI/180);const Ls=apex*t;tip={x:m.x+dx*Ls,z:m.z+dz*Ls};
   /* 봉분 그림자: 땅 높이를 따라 깐 점 그림자 */const yAt=(x,z)=>{rcD.set(new THREE.Vector3(x,60,z),new THREE.Vector3(0,-1,0));const h=rcD.intersectObjects(scans,true)[0];return h?h.point.y:0};const ang=Math.atan2(dz,dx);const inSh=(x,z)=>{const rx=x-m.x,rz=z-m.z;const along=rx*dx+rz*dz,perp=-rx*dz+rz*dx;if(Math.hypot(rx,rz)<m.r*.85)return along>-m.r*.2;if(along<0||along>Ls)return false;const w=m.r*.85*(1-along/Ls);return Math.abs(perp)<w};const pts=[];for(let gx=-m.r-2;gx<=Ls+m.r;gx+=.9)for(let gz=-m.r-2;gz<=m.r+2;gz+=.9){const x=m.x+dx*gx-dz*gz,z=m.z+dz*gx+dx*gz;if(inSh(x,z))pts.push([x,yAt(x,z)+.12,z])}const im=new THREE.InstancedMesh(new THREE.CircleGeometry(.72,10).rotateX(-Math.PI/2),SH,pts.length);const o3=new THREE.Object3D();pts.forEach((p,k)=>{o3.position.set(p[0],p[1],p[2]);o3.updateMatrix();im.setMatrixAt(k,o3.matrix)});grp.add(im);
   /* 1m 막대와 그림자 */const sx=m.x+dx*(m.r+4)-dz*(m.r+3),sz=m.z+dz*(m.r+4)+dx*(m.r+3);const sy=yAt(sx,sz);const pole=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,1,8),M(0xc8302a));pole.position.set(sx,sy+.5,sz);grp.add(pole);const pg=new THREE.Group();pg.position.set(sx,sy+.1,sz);pg.rotation.y=-ang;const ps=new THREE.Mesh(new THREE.PlaneGeometry(t,.16),SH);ps.rotation.x=-Math.PI/2;ps.position.x=t/2;pg.add(ps);grp.add(pg);
   base={sx,sz,t};phase='play';msg=`${rd+1}판: 해 높이가 바뀌었어요`;kEl.textContent=`1m 막대 그림자 = ${t.toFixed(2)}m`};
  const judge=(x,z)=>{if(phase!=='play')return;const R=RDS[rd],m=MD[R.m];const dx=Math.cos(R.az),dz=Math.sin(R.az);const L=Math.max(0,(x-m.x)*dx+(z-m.z)*dz);const est=L/base.t;const err=Math.abs(est-apex)/apex;const sc=Math.max(0,1-err*2.5);res.push(sc);const mk=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,1.6,8),M(0xffd040));mk.position.set(x,(()=>{rcD.set(new THREE.Vector3(x,60,z),new THREE.Vector3(0,-1,0));const h=rcD.intersectObjects(scans,true)[0];return h?h.point.y:0})()+.8,z);grp.add(mk);msg=`어림 높이 ${est.toFixed(1)}m · 실측 높이 ${apex.toFixed(1)}m`;snd(sc>.8?820:360,.3);phase='wait';wait=3};
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.1,400);const rc=new THREE.Raycaster();const gp=new THREE.Plane(new THREE.Vector3(0,1,0),0);const ov=document.createElement('div');ov.id='orO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:crosshair';document.body.appendChild(ov);
  ov.onpointerdown=e=>{const C=window.__GCAM();if(!C)return;pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(scans,true)[0];if(h)judge(h.point.x,h.point.z);else{const p=new THREE.Vector3();if(rc.ray.intersectPlane(gp,p))judge(p.x,p.z)}};
  const cleanup=()=>{ov.remove();G.remove(grp)};
  newRound();let at=0;
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(phase==='play'&&auto){at+=dt;if(at>1){at=0;judge(tip.x,tip.z)}}
   if(phase==='wait'){wait-=dt;if(wait<=0){rd++;if(rd>=3){fin();return}newRound()}}
   iEl.textContent=`${Math.min(rd+1,3)} / 3판 · 해 높이 ${RDS[Math.min(rd,2)].alt}°`;mEl.textContent=msg;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('oreung_shadow',Q,'그림자로 봉분 높이 재기')}catch(e){}window.__ORQ=Q;snd(660,.4);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">봉분 높이를 다 쟀어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">같은 때 같은 해 아래에서는 높이와 그림자 길이의 비율이 같아요. 1m 막대 그림자가 2m라면 그림자가 20m인 봉분은 10m쯤 돼요. 올라가지 않고도 높이를 재는 옛 방법이에요.</div><div style="font-size:24px;color:#a8a070">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#a8a070;color:#2a2418;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__ORSHADOW()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__ORG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('그림자 끝을 찾아요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'신라 토기 조각',h:'회청색 신라 토기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.1,.08,12,1,true,0,2),M(0x6a7078)))})},
  {n:'기와 조각',h:'능 앞 제사 건물 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.04,20,1,true,0,2),M(0x6a6a64)))})},
  {n:'솔방울',h:'능 둘레 솔숲의 솔방울이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.ConeGeometry(.05,.1,8),M(0x6a4a2a)))})},
  {n:'쇠못',h:'옛 건물에 쓴 쇠못이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.015,.01,.18,6),M(0x4a3a30,{metalness:.6})))})},
  {n:'곱은옥',h:'신라 사람들이 지니던 곱은옥이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.TorusGeometry(.05,.02,8,12,Math.PI*1.3),M(0x3a8a6a)))})}];
 window.__ORDIG=()=>{window.__DETECT&&window.__DETECT({key:'oreung_dig',title:'오릉 솔숲 발굴 탐지',emoji:'⛏️',bg:'#2a2418',count:4,TL:150,cand:[[-30,30],[-40,10],[40,30],[40,-60],[-50,-60],[20,40],[-20,44],[56,-40]],items:ITEMS,intro:'솔숲 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'오릉은 신라가 시작된 이야기가 깃든 곳이에요.'})};
 const meta={quest:{t:'오릉과 남산 서쪽 둘러보기',d:'오릉, 지마왕릉, 경애왕릉, 용장사곡 삼층석탑을 둘러보세요.',steps:[['오릉','경주 오릉'],['지마왕릉','지마왕릉'],['경애왕릉','경애왕릉'],['석탑','용장사곡 삼층석탑']]},
  title:'경주 오릉·남산 서쪽',hint:'능 셋과 석탑은 국가유산청 실측(실제 크기)이에요. 곳마다 따로 찍은 실측이라 서로 거리는 간추렸어요.',
  ibl:true,env:{plaza:null,beds:false,trees:true,treeAvoid:(x,z)=>(x>-50&&x<50&&z>-100&&z<36)||Math.hypot(x-78,z-8)<34||Math.hypot(x+66,z-18)<10,noHills:false,sign:{x:-8,z:40,lines:['경주 오릉·남산 서쪽','오릉·지마왕릉·경애왕릉','용장사곡 삼층석탑','모두 실측']}},
  npc:[['science',[[-6,40],[6,40],[6,46],[-6,46]]]],bounds:[-90,100,-100,60],level:()=>'경주',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1,ox:0,oz:-20,draw(g,X,Z,S){g.fillStyle='#9ab070';g.fillRect(0,0,300,300);g.fillStyle='#c8b080';g.fillRect(X(-45),Z(-93),90*S,126*S);g.fillStyle='#7a9a5a';MD.forEach(m=>{g.beginPath();g.arc(X(m.x),Z(m.z),m.r*S,0,7);g.fill()})}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:48,yaw:Math.PI},size:{}},meta)}
