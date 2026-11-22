/* 강화 광성보 마당(2026-11-23, 2단계 덧붙이기): 강화 해안 방어 진지(사적). 1871년 신미양요 때 어재연 장군과 군사들이 미군과 싸운 곳.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   용두돈대: 바다 쪽으로 용머리처럼 길게 뻗은 돈대. 손돌목돈대: 둥근 돈대. 안해루: 광성보 성문 문루. 신미순의총: 신미양요 때 숨진 군사들의 무덤 일곱. 쌍충비: 어재연·어재순 형제 비.
   손돌목: 강화와 김포 사이 물살이 센 좁은 바다. 고려 때 왕을 태운 뱃사공 손돌이 바가지를 띄워 물길을 알려 주었다는 이야기가 전해 옴(전해 오는 이야기).
   놀이: 손돌 바가지 띄우기(물살 그림을 보고 바가지를 띄울 자리를 골라, 흐르는 물을 따라 암초를 피해 손돌목 물목까지 가게, 물때마다 물살이 바뀜, 세 판, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildGwangseong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1871);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 const SEA=20;
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[40,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(140,200),new THREE.MeshStandardMaterial({map:GT,color:0x86a04c,roughness:1}));gr.rotation.x=-Math.PI/2;gr.position.set(SEA-70,0,0);gr.receiveShadow=true;G.add(gr)}
 const WAT=new THREE.Mesh(new THREE.PlaneGeometry(260,260),M(0x3a6a7a,{roughness:.25,metalness:.1}));WAT.rotation.x=-Math.PI/2;WAT.position.set(SEA+130,.04,0);G.add(WAT);
 {const sh=new THREE.Mesh(new THREE.PlaneGeometry(4,200),M(0x8a7a5a));sh.rotation.x=-Math.PI/2;sh.position.set(SEA-1,.01,0);G.add(sh)}
 /* 바다는 못 들어가게(용두돈대 자리만 열어 둠) */const DZ0=-13,DZ1=-7,DX1=SEA+16;solids.push({x0:SEA,x1:300,y0:-5,y1:6,z0:-200,z1:DZ0},{x0:SEA,x1:300,y0:-5,y1:6,z0:DZ1,z1:200},{x0:DX1+4.5,x1:300,y0:-5,y1:6,z0:DZ0-1,z1:DZ1+1});
 const STONE=M(0xa8a296),STONE2=M(0x948e82);
 const wall=(x0,z0,x1,z1,h=1.3,t=.8,m=STONE)=>{const L=Math.hypot(x1-x0,z1-z0);const b=new THREE.Mesh(new THREE.BoxGeometry(L,h,t),m);b.position.set((x0+x1)/2,h/2,(z0+z1)/2);b.rotation.y=-Math.atan2(z1-z0,x1-x0);b.castShadow=true;G.add(b);const n=Math.ceil(L/1.2);for(let k=0;k<=n;k++){const x=x0+(x1-x0)*k/n,z=z0+(z1-z0)*k/n;solids.push({cx:x,cz:z,r:t*.6,y0:0,y1:h})}};
 /* 용두돈대: 바다로 뻗은 좁은 돌길 + 둥근 끝 */{const p=new THREE.Mesh(new THREE.BoxGeometry(DX1-SEA+2,.6,DZ1-DZ0),M(0xb0a890));p.position.set((SEA+DX1)/2-1,-.1,(DZ0+DZ1)/2);G.add(p);wall(SEA,DZ0,DX1,DZ0,1.1,.6);wall(SEA,DZ1,DX1,DZ1,1.1,.6);const e=new THREE.Mesh(new THREE.CylinderGeometry(4.8,5,.6,24),M(0xb0a890));e.position.set(DX1+.5,-.1,(DZ0+DZ1)/2);G.add(e);for(let k=0;k<14;k++){const a=-Math.PI/2+k/13*Math.PI;const x=DX1+.5+Math.cos(a)*4.6,z=(DZ0+DZ1)/2+Math.sin(a)*4.6;const s=new THREE.Mesh(new THREE.BoxGeometry(1.1,1.1,.6),STONE);s.position.set(x,.55,z);s.rotation.y=-a;G.add(s);solids.push({cx:x,cz:z,r:.45,y0:0,y1:1.1})}}
 const UZ=(DZ0+DZ1)/2;sp(DX1-1,UZ,3,'용두돈대','바다 쪽으로 용머리처럼 길게 뻗은 돈대예요. 손돌목의 센 물살을 내려다보며 지켰어요. 신미양요 때 가장 치열했던 곳 가운데 하나예요(간추려 지음).');
 /* 손돌목돈대: 둥근 돌담(지름 약 20m), 서쪽에 문 */const SX=-8,SZ=-26,SR=10;for(let k=0;k<36;k++){const a=k/36*Math.PI*2;if(Math.abs(Math.atan2(Math.sin(a-Math.PI),Math.cos(a-Math.PI)))<.3)continue;const x=SX+Math.cos(a)*SR,z=SZ+Math.sin(a)*SR;const s=new THREE.Mesh(new THREE.BoxGeometry(1.9,2.4,1),STONE);s.position.set(x,1.2,z);s.rotation.y=-a+Math.PI/2;s.castShadow=true;G.add(s);solids.push({cx:x,cz:z,r:.7,y0:0,y1:2.4})}
 {const pv=new THREE.Mesh(new THREE.CylinderGeometry(.18,.22,2,8),M(0x6a4a30));pv.position.set(SX,1,SZ);G.add(pv)}
 sp(SX,SZ,3.4,'손돌목돈대','둥글게 쌓은 돈대예요. 신미양요 때 어재연 장군이 이끈 군사들이 마지막까지 싸운 곳이에요(간추려 지음).');
 /* 광성돈대(작은 네모 돌담) */{const QX=4,QZ=8;wall(QX-6,QZ-5,QX+6,QZ-5);wall(QX+6,QZ-5,QX+6,QZ+5);wall(QX-6,QZ+5,QX-2,QZ+5);wall(QX+2,QZ+5,QX+6,QZ+5);wall(QX-6,QZ-5,QX-6,QZ+5);const cn=new THREE.Mesh(new THREE.CylinderGeometry(.22,.28,2.2,10),M(0x2a2a2a,{metalness:.5}));cn.rotation.z=Math.PI/2;cn.position.set(QX+3,.7,QZ);G.add(cn);for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.4,.4,.15,12),M(0x5a3a22));w.rotation.x=Math.PI/2;w.position.set(QX+3,.4,QZ+s*.4);G.add(w)}
  sp(QX,QZ+1.5,3.6,'광성돈대','네모난 돌담 안에 대포를 두었던 돈대예요. 안에 옛 대포가 놓여 있어요(간추려 지음).')}
 /* 안해루(광성보 문): 돌 성벽 + 홍예문 + 문루 */const AX=-20,AZ=30;{wall(AX-26,AZ,AX-2.4,AZ,4,2.4);wall(AX+2.4,AZ,AX+26,AZ,4,2.4);const top=new THREE.Mesh(new THREE.BoxGeometry(5,1.2,2.4),STONE);top.position.set(AX,3.4,AZ);G.add(top);for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.BoxGeometry(.6,2.8,2.4),STONE2);p.position.set(AX+s*2.1,1.4,AZ);G.add(p)}
  const ROOF=M(0x4a4a50);const rf=new THREE.Mesh(new THREE.ConeGeometry(4.6,2,4),ROOF);rf.rotation.y=Math.PI/4;rf.scale.set(1.3,1,.62);rf.position.set(AX,6.2,AZ);G.add(rf);for(const[x,z]of[[-2.4,-.9],[2.4,-.9],[-2.4,.9],[2.4,.9]]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,1.4,8),M(0x8a3a2a));c.position.set(AX+x,4.7,AZ+z);G.add(c)}
  const LT=tex(256,96,(q,w,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,w,h);q.fillStyle='#f0e8d0';q.font='bold 60px serif';q.textAlign='center';q.fillText('按海樓',w/2,70)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(1.6,.6),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(AX,5.1,AZ+1.25);G.add(bd)}
 sp(AX,AZ-4,3.4,'안해루','광성보로 들어가는 문 위의 누각이에요. 1977년에 성문과 함께 다시 지었어요(간추려 지음).');
 /* 신미순의총(무덤 일곱) + 쌍충비 */const TX0=-34,TZ0=-2;for(let k=0;k<7;k++){const m=new THREE.Mesh(new THREE.SphereGeometry(1.6,14,8,0,Math.PI*2,0,Math.PI/2),M(0x7a9a48));m.scale.y=.6;m.position.set(TX0+(k%4)*4.2,0,TZ0+((k/4)|0)*4.6);G.add(m);solids.push({cx:m.position.x,cz:m.position.z,r:1.4,y0:0,y1:1})}
 sp(TX0+6,TZ0+11,3,'신미순의총','신미양요 때 숨진 조선 군사 쉰한 명 가운데 이름을 모르는 이들을 일곱 무덤에 모셨어요.');
 for(const s of[-1,1]){const st=new THREE.Mesh(new THREE.BoxGeometry(.9,2.2,.35),M(0xc0bcb0));st.position.set(-26+s*1.6,1.3,14);G.add(st);const bs=new THREE.Mesh(new THREE.BoxGeometry(1.4,.4,.9),STONE2);bs.position.set(-26+s*1.6,.2,14);G.add(bs);solids.push({cx:-26+s*1.6,cz:14,r:.7,y0:0,y1:2.4})}
 sp(-26,18,2.6,'쌍충비','신미양요 때 싸우다 숨진 어재연·어재순 형제를 기리는 비예요.');
 /* 소나무 몇 그루 */for(const[x,z]of[[-40,20],[-46,-16],[10,-30],[-14,8],[12,22],[-2,40]]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.22,.32,6,7),M(0x6a4030));t.position.set(x,3,z);t.rotation.z=(r()-.5)*.3;G.add(t);const c=new THREE.Mesh(new THREE.ConeGeometry(2.2,2.4,8),M(0x2f5a2a));c.scale.y=.6;c.position.set(x,6,z);G.add(c);solids.push({cx:x,cz:z,r:.4,y0:0,y1:6})}
 /* 손돌 바가지 띄우기(11/23): 물살은 북쪽으로 흐르고 옆으로 굽이침. 남쪽 줄에서 띄울 자리를 골라 북쪽 물목까지 */
 const BX0=SEA+22,BX1=SEA+70,BZ0=22,BZ1=-34;const gg=new THREE.Group();gg.visible=false;G.add(gg);
 const TIDES=[{A:2.2,k:10,ph:0,rocks:[[SEA+44,-6,3]],goal:SEA+52},{A:3,k:8,ph:1.3,rocks:[[SEA+38,4,3],[SEA+55,-14,3.2]],goal:SEA+34},{A:-3.4,k:7,ph:.6,rocks:[[SEA+46,8,3],[SEA+36,-16,2.6],[SEA+60,-4,3]],goal:SEA+39.3}];
 const flow=(T,x,z)=>{let vx=T.A*Math.sin((z-BZ0)/T.k+T.ph),vz=-3.2;for(const[rx,rz,rr]of T.rocks){const dx=x-rx,dz=z-rz,d=Math.hypot(dx,dz);if(d<rr*2.6&&d>.01){const f=(rr*2.6-d)/(rr*2.6)*2.4;vx+=dx/d*f;vz+=dz/d*f*.5}}return[vx,vz]};
 const sim=(T,x0)=>{let x=x0,z=BZ0;const P=[[x,z]];for(let i=0;i<900;i++){const[vx,vz]=flow(T,x,z);x+=vx*.05;z+=vz*.05;if(i%3===0)P.push([x,z]);for(const[rx,rz,rr]of T.rocks)if(Math.hypot(x-rx,z-rz)<rr)return{P,res:'rock'};if(x<BX0-6||x>BX1+6)return{P,res:'out'};if(z<=BZ1)return{P,res:Math.abs(x-T.goal)<3.2?'ok':'miss',x}}return{P,res:'out'}};
 window.__GSGOURD=()=>{if(document.getElementById('gsP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(DX1-2,UZ,0)}catch(e){}gg.visible=true;
  const CAM=[(BX0+BX1)/2,46,BZ0+30,(BX0+BX1)/2,0,(BZ0+BZ1)/2+2,52];window.__GCAM=()=>document.getElementById('gsP')?CAM:null;
  let rd=0,T=null,rx=0,tries=0,anim=null,done=false,auto=false;const res=[];const deco=[];
  const snd=(f,len=.15,v=.06)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),g2=AC.createGain();o.type='sine';o.frequency.value=f;g2.gain.setValueAtTime(v,s);g2.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(g2).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const clr=()=>{deco.forEach(o=>gg.remove(o));deco.length=0};
  const add=o=>{gg.add(o);deco.push(o);return o};
  const gourd=new THREE.Group();{const a=new THREE.Mesh(new THREE.SphereGeometry(.7,12,10),M(0xd8b860));const b=new THREE.Mesh(new THREE.SphereGeometry(.45,12,10),M(0xd8b860));b.position.set(0,.2,-.8);gourd.add(a,b)}gg.add(gourd);
  const marker=new THREE.Mesh(new THREE.ConeGeometry(.8,1.8,10),M(0xffd060,{emissive:0x604010}));marker.rotation.x=Math.PI;gg.add(marker);
  const newRound=()=>{clr();T=TIDES[rd];tries=0;rx=(BX0+BX1)/2;
   /* 물살 화살표 */for(let x=BX0;x<=BX1;x+=6)for(let z=BZ0-2;z>=BZ1+2;z-=6){const[vx,vz]=flow(T,x,z);const L=Math.min(4,Math.hypot(vx,vz)*.9);const ar=add(new THREE.Mesh(new THREE.ConeGeometry(.6,L+.6,5),new THREE.MeshBasicMaterial({color:0xe8f6fa,transparent:true,opacity:.75})));ar.rotation.x=-Math.PI/2;ar.rotation.z=-Math.atan2(vx,-vz);ar.rotation.order='YXZ';ar.rotation.set(-Math.PI/2,0,0);const gr2=new THREE.Group();gr2.position.set(x,.15,z);gr2.rotation.y=Math.atan2(-vx,-vz);ar.position.set(0,0,0);gg.remove(ar);gr2.add(ar);add(gr2)}
   for(const[x,z,rr]of T.rocks){const k=add(new THREE.Mesh(new THREE.DodecahedronGeometry(rr*.9,0),M(0x4a4640,{flatShading:true})));k.scale.y=.5;k.position.set(x,.1,z)}
   const gl=add(new THREE.Mesh(new THREE.TorusGeometry(3.2,.3,8,24),M(0x7ad07a,{emissive:0x205020})));gl.rotation.x=Math.PI/2;gl.position.set(T.goal,.15,BZ1);
   for(const s of[-1,1]){const b=add(new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,3,8),M(0xc84030)));b.position.set(T.goal+s*3.6,1,BZ1)}
   const ln=add(new THREE.Mesh(new THREE.BoxGeometry(BX1-BX0,.1,.3),M(0xffd060)));ln.position.set((BX0+BX1)/2,.1,BZ0);
   gourd.position.set(rx,.3,BZ0);marker.position.set(rx,2.6,BZ0);anim=null;ui()};
  const d=document.createElement('div');d.id='gsP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1e2a30;border:3px solid #d8b860;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef4f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const B="font:15px 'Do Hyeon',sans-serif;border:0;border-radius:10px;padding:6px 10px;margin:3px;cursor:pointer";
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d890">🫙 손돌 바가지 띄우기 ${rd+1}/3</b><div style="font-size:12px;margin:3px 0">물살 화살표를 보고 바가지를 띄울 자리를 골라요. 암초를 피해 초록 고리(물목)로!</div><div style="font-size:13px;color:#f0d890;min-height:18px">${msg}</div><div><button data-l style="${B};background:#3a5a6a;color:#fff">◀</button><button data-g style="${B};background:#d8b860;color:#2a2418">띄우기</button><button data-r style="${B};background:#3a5a6a;color:#fff">▶</button></div><div style="font-size:12px;opacity:.85">띄운 횟수 ${tries}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f8;border:1px solid #eef4f8;border-radius:8px;padding:2px 8px;cursor:pointer">그만</button>`;
   d.querySelector('[data-l]').onclick=()=>move(-1);d.querySelector('[data-r]').onclick=()=>move(1);d.querySelector('[data-g]').onclick=()=>go();d.querySelector('[data-x]').onclick=()=>{gg.visible=false;clr();d.remove()}};
  const move=s=>{if(anim||done)return;rx=Math.max(BX0,Math.min(BX1,rx+s*1.5));gourd.position.set(rx,.3,BZ0);marker.position.set(rx,2.6,BZ0);snd(500+s*40,.06)};
  const go=()=>{if(anim||done)return;tries++;const S=sim(T,rx);anim={S,i:0};const tr=new THREE.BufferGeometry().setFromPoints(S.P.map(([x,z])=>new THREE.Vector3(x,.2,z)));add(new THREE.Line(tr,new THREE.LineBasicMaterial({color:0xf0d890,transparent:true,opacity:.5})));snd(420,.2)};
  const fin=()=>{done=true;gg.visible=false;clr();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('gwangseong_gourd',Q,'손돌 바가지 띄우기')}catch(e){}window.__GSQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0d890">바가지가 물목을 지났어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">손돌목은 물살이 세고 바닥이 험해 배가 다니기 어려운 좁은 바다예요. 뱃사공 손돌이 바가지를 띄워 물길을 알려 주었다는 이야기가 전해 와요(전해 오는 이야기, 물살은 간추린 것).</div><div style="font-size:24px;color:#d8b860">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#d8b860;color:#2a2418;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f8;border:2px solid #eef4f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__GSGOURD()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const step=()=>{if(!d.isConnected){gg.visible=false;clr();return}if(done)return;
   if(auto&&!anim){let best=null;for(let x=BX0;x<=BX1;x+=1.5)if(sim(T,x).res==='ok'){best=x;break}if(best!=null&&Math.abs(rx-best)>.1)move(best>rx?1:-1);else go()}
   if(anim){const{S}=anim;anim.i+=2;const p=S.P[Math.min(S.P.length-1,anim.i)];gourd.position.set(p[0],.3+Math.sin(anim.i*.3)*.08,p[1]);marker.position.set(p[0],2.6,p[1]);
    if(anim.i>=S.P.length-1){const R=S.res;anim=null;if(R==='ok'){res.push(Math.max(30,100-(tries-1)*20));snd(700,.5,.08);rd++;if(rd>=3){fin();return}setTimeout(()=>{if(!done)newRound()},900);ui('물목을 지났어요!')}else{snd(200,.3);gourd.position.set(rx,.3,BZ0);marker.position.set(rx,2.6,BZ0);ui(R==='rock'?'암초에 걸렸어요. 다른 자리에서!':R==='miss'?'물목을 비껴갔어요. 조금 옮겨 봐요':'물살에 밀려 나갔어요')}}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);window.__GSG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},get tries(){return tries},sim:x=>sim(T,x).res};try{ctx.say('손돌처럼 바가지를 띄워 물길을 찾아 봐요!',2.4)}catch(e){}};
 sp(DX1-6,UZ+1.6,2.2,'바가지 띄우는 곳','용두돈대 위에서 손돌목 물살에 바가지를 띄워 물길을 찾아 봐요.');
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[AX,3,AZ-3],[DX1,2.4,UZ],[SX+4,3,SZ+12],[-26,3,10]]){const L=new THREE.PointLight(0xffc080,0,26,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'쇠 포탄',h:'조선 대포에 넣어 쏘던 둥근 쇠 탄환이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.12,14,10),M(0x3a3a3a,{metalness:.6})))})},
  {n:'화승총 납탄',h:'조선 군사의 화승총 납 탄환이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),M(0x7a7a80,{metalness:.5})))})},
  {n:'투구 조각',h:'쇠 투구의 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.14,12,8,0,Math.PI*2,0,Math.PI/2),M(0x4a4440,{metalness:.5})))})},
  {n:'기와 조각',h:'돈대 건물의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'백자 사발 조각',h:'군사들이 쓰던 백자 사발 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.08,.06,14,1,true,0,2.4),M(0xf0ece0,{side:THREE.DoubleSide})))})}];
 sp(-10,40,2.4,'발굴 탐지 자리','광성보 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__GSDIG=()=>{window.__DETECT&&window.__DETECT({key:'gwangseong_dig',title:'광성보 발굴 탐지',emoji:'⛏️',bg:'#1e2428',count:4,TL:150,cand:[[-30,40],[0,30],[14,0],[-20,-12],[8,-14],[-44,8],[-38,-26],[12,34],[-6,-44],[16,-22]],items:ITEMS,intro:'광성보 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'광성보는 신미양요(1871) 때 조선 군사들이 미군과 싸운 강화 해안 진지예요.'})};
 const meta={quest:{t:'광성보 둘러보기',d:'안해루로 들어가 돈대들과 순의총을 둘러보세요.',steps:[['안해루','안해루'],['쌍충비','쌍충비'],['순의총','신미순의총'],['손돌목돈대','손돌목돈대'],['광성돈대','광성돈대'],['용두돈대','용두돈대']]},
  title:'강화 광성보',hint:'신미양요의 광성보를 공개 사진으로 간추려 지었어요(배치·크기 어림). 용두돈대에서 손돌 바가지를 띄워 손돌목 물길을 찾아 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-14,z:44,lines:['강화 광성보','사적 · 신미양요 1871','용두돈대 · 손돌목돈대','간추려 지음']}},
  npc:[['science',[[-24,38],[-16,38],[-16,44],[-24,44]]]],bounds:[-70,SEA+22,-60,60],level:()=>'강화 광성보',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.4,ox:-10,oz:0,draw(g,X,Z,S){g.fillStyle='#86a04c';g.fillRect(0,0,300,300);g.fillStyle='#3a6a7a';g.fillRect(X(SEA),0,300,300);g.fillStyle='#b0a890';g.fillRect(X(SEA),Z(DZ0),(DX1-SEA+5)*S,(DZ1-DZ0)*S);g.strokeStyle='#a8a296';g.lineWidth=2;g.beginPath();g.arc(X(SX),Z(SZ),SR*S,0,Math.PI*2);g.stroke()}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:-20,z:50,yaw:Math.PI},size:{}},meta)}
