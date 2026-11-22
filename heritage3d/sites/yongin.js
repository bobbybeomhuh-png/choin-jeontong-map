/* 용인 마당(2026-11-22, W76): 처인성(고려 때 흙으로 쌓은 작은 성), 와우정사 실측 지형 모형(1/100).
   실측: 「Waujeongsa Temple (와우정사)」 lacomi1975 스케치팹 CC BY. 드론으로 찍은 절 일대 지형(가로 약 440m). 크기 단위가 정해져 있지 않아 주차칸(약 2.4m)과 승용차 길이로 재어 1단위 약 0.44m로 맞추고, 1/100 모형(가로 약 4.4m)으로 놓았어요.
   와우정사: 1970년에 세운 절. 큰 불두와 누운 부처, 동남아 여러 나라에서 들여온 불상들이 있어요.
   처인성(경기도 기념물): 1232년 몽골 침입 때 승려 김윤후와 처인부곡 사람들이 이 작은 토성을 지켜 적장 살리타를 물리쳤어요.
   놀이: 판축 다지기(나무 틀 안 흙을 달구로 고르게 다지기. 한 번 찧으면 그 칸은 많이, 옆 칸은 조금 다져져요. 찧을 횟수 안에 고르게, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {tex,mulb} from './sungnyemun.js';
export function buildYongin(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1232);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x84a04c,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 처인성: 둥근 흙 성벽(높이 약 2.5m) + 문터 + 비석 */const CX=-20,CZ=-26,CR=16;const SOIL=M(0x9a7a50);{const n=48;for(let i=0;i<n;i++){const a=i/n*Math.PI*2;if(Math.abs(a-Math.PI/2)<.22)continue;const x=CX+Math.cos(a)*CR,z=CZ+Math.sin(a)*CR*.8;const seg=new THREE.Mesh(new THREE.CylinderGeometry(1.6,2.6,2.5,6),SOIL);seg.position.set(x,1.25,z);seg.scale.z=.9;G.add(seg);solids.push({cx:x,cz:z,r:2.1,y0:0,y1:2.5})}const gm=new THREE.Mesh(new THREE.CircleGeometry(CR-2,40),M(0x8aa050));gm.rotation.x=-Math.PI/2;gm.scale.y=.8;gm.position.set(CX,.02,CZ);G.add(gm);const st=new THREE.Mesh(new THREE.BoxGeometry(1.2,2,.4),M(0x9a948a,{flatShading:true}));st.position.set(CX,1,CZ+CR*.8+4);G.add(st);solids.push({cx:CX,cz:CZ+CR*.8+4,r:.8,y0:0,y1:2});const LT=tex(128,256,(q,w,h)=>{q.fillStyle='#9a948a';q.fillRect(0,0,w,h);q.fillStyle='#3a3630';q.font='bold 44px serif';q.textAlign='center';['處','仁','城'].forEach((c,k)=>q.fillText(c,w/2,70+k*70))});const pl=new THREE.Mesh(new THREE.PlaneGeometry(.8,1.6),new THREE.MeshStandardMaterial({map:LT}));pl.position.set(CX,1.05,CZ+CR*.8+4.21);G.add(pl)}
 /* 판축 틀(성벽 쌓는 자리): 나무 널판 틀 + 흙 칸 8×3 */const PX=10,PZ=-14,NC=8,NR=3,CS=.6;const pframe=new THREE.Group();pframe.position.set(PX,0,PZ);G.add(pframe);{const WD=M(0x8a6a44);for(const s of[-1,1]){const b=new THREE.Mesh(new THREE.BoxGeometry(NC*CS+.4,1.6,.12),WD);b.position.set(0,.8,s*(NR*CS/2+.06));pframe.add(b)}for(const s of[-1,1]){const b=new THREE.Mesh(new THREE.BoxGeometry(.12,1.6,NR*CS+.24),WD);b.position.set(s*(NC*CS/2+.14),.8,0);pframe.add(b)}for(const x of[-2.2,2.2])for(const s of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,2.2,6),WD);p.position.set(x,1.1,s*(NR*CS/2+.2));pframe.add(p)}solids.push({x0:PX-NC*CS/2-.3,x1:PX+NC*CS/2+.3,y0:0,y1:1.6,z0:PZ-NR*CS/2-.3,z1:PZ+NR*CS/2+.3})}
 const base=new THREE.Mesh(new THREE.BoxGeometry(NC*CS,.4,NR*CS),M(0x7a5a3a));base.position.y=.2;pframe.add(base);const done1=[];
 const cells=[];const cm=(i)=>new THREE.MeshStandardMaterial({color:0x8a6a44,roughness:1,map:null});for(let rw=0;rw<NR;rw++)for(let c=0;c<NC;c++){const m=new THREE.Mesh(new THREE.BoxGeometry(CS*.98,1,CS*.98),cm());m.position.set((c-(NC-1)/2)*CS,.4,(rw-(NR-1)/2)*CS);m.userData={c,rw};m.scale.y=.001;pframe.add(m);cells.push(m)}
 const ram=new THREE.Group();{const h=new THREE.Mesh(new THREE.CylinderGeometry(.18,.2,.4,10),M(0x6a4a30));ram.add(h);const sh=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,1.4,6),M(0x8a6a44));sh.position.y=.9;ram.add(sh)}ram.visible=false;pframe.add(ram);
 /* 와우정사 실측 지형 모형: 탁자 위 1/100 */const DX=-2,DZ=14;{const tb=new THREE.Mesh(new THREE.BoxGeometry(5,.8,4.2),M(0x5a4030));tb.position.set(DX,.4,DZ);G.add(tb);solids.push({x0:DX-2.5,x1:DX+2.5,y0:0,y1:1.6,z0:DZ-2.1,z1:DZ+2.1});const LT=tex(512,64,(q,w,h)=>{q.fillStyle='#2a2018';q.fillRect(0,0,w,h);q.fillStyle='#f4e8c8';q.font='bold 26px sans-serif';q.textAlign='center';q.fillText('와우정사 일대 실측 지형 모형 1/100',w/2,42)});const pl=new THREE.Mesh(new THREE.PlaneGeometry(3,.38),new THREE.MeshStandardMaterial({map:LT}));pl.position.set(DX,.5,DZ+2.11);G.add(pl);
  if(!mini){const L=new GLTFLoader();L.load(new URL('../models/yongin/wau.glb',import.meta.url).href,m=>{const o=m.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=true;e.receiveShadow=true}});const b=new THREE.Box3().setFromObject(o);const c=b.getCenter(new THREE.Vector3());o.position.set(-c.x,-b.min.y,-c.z);const w=new THREE.Group();w.add(o);w.userData.noBatch=true;w.position.set(DX,.8,DZ);G.add(w)},undefined,()=>{})}}
 const NL=[];if(!mini){for(const[x,y,z]of[[CX,4,CZ+CR],[DX,3,DZ+3],[PX,3,PZ+3]]){const L=new THREE.PointLight(0xffc080,0,24,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8)};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(CX,CZ+CR*.8+6,3,'용인 처인성','1232년 몽골이 쳐들어왔을 때 승려 김윤후와 처인부곡 사람들이 이 작은 흙 성을 지켜 적장 살리타를 물리쳤어요. 간추려 지었어요.');
 sp(PX,PZ+2.6,2,'판축 다지는 자리','나무 틀 안 흙을 달구로 고르게 다져 성벽을 쌓아 봐요.');
 sp(DX,DZ+3.6,2.4,'와우정사 실측 지형 모형','용인 와우정사 일대를 드론으로 찍은 실측 3D(lacomi1975, CC BY)를 1/100 모형으로 놓았어요. 주차칸과 차 길이로 크기를 재어 맞췄어요. 1970년에 세운 절로 큰 불두와 누운 부처가 있어요.');
 sp(-60,30,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 판축 다지기(11/22): 세 켜. 켜마다 흙 높이가 칸마다 달라요(밝을수록 높음). 칸을 누르면 달구로 찧어요: 그 칸 넘친 높이의 45%, 옆 네 칸 15%가 다져져요. 찧을 횟수 안에 고르게(넘친 높이 합을 작게) */
 window.__YIRAM=()=>{if(document.getElementById('yiP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX+3.6,PZ+2.4,0)}catch(e){}
  const CAM=[PX,6.8,PZ+2.9,PX,.8,PZ,46];window.__GCAM=()=>document.getElementById('yiP')?CAM:null;
  let rd=0,h=[],h0=0,ref=.7,hits=0,budget=0,done=false,auto=false,last=performance.now(),msg='',phase='play',wait=0,at=0,anim=null;const res=[];const N=NC*NR;
  const lvl=()=>.4+rd*.35;
  const show=()=>{base.scale.y=lvl()/.4;base.position.y=lvl()/2;cells.forEach((m,i)=>{const hh=.08+h[i];m.scale.y=hh;m.position.y=lvl()+hh/2;const t=Math.min(1,h[i]/.5);m.material.color.setRGB(.3+t*.48,.2+t*.36,.12+t*.24,THREE.SRGBColorSpace)})};
  const newRound=()=>{h=Array.from({length:N},()=>.15+Math.random()*.35);h0=h.reduce((a,b)=>a+b,0);hits=0;budget=14+rd*2;{const sv=h.slice();for(let k=0;k<budget;k++){let bi=0,bg=-1;for(let i=0;i<N;i++){const g=gain(i);if(g>bg){bg=g;bi=i}}h[bi]*=.55;nb(bi).forEach(j=>h[j]*=.85)}ref=(1-h.reduce((a,b)=>a+b,0)/h0)*.95;h=sv}phase='play';show();msg=`${rd+1}켜: ${budget}번 찧어 고르게 다져요`};
  const nb=i=>{const c=i%NC,rw=Math.floor(i/NC),o=[];for(const[dc,dr]of[[1,0],[-1,0],[0,1],[0,-1]]){const c2=c+dc,r2=rw+dr;if(c2>=0&&c2<NC&&r2>=0&&r2<NR)o.push(r2*NC+c2)}return o};
  const gain=i=>h[i]*.45+nb(i).reduce((a,j)=>a+h[j]*.15,0);
  const snd=(f,len,type='sine',v=.05)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(v,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const hit=i=>{if(done||phase!=='play'||anim)return;anim={i,t:0};const m=cells[i];ram.visible=true;ram.position.set(m.position.x,lvl()+1.2,m.position.z)};
  const apply=i=>{h[i]*=.55;nb(i).forEach(j=>h[j]*=.85);hits++;show();snd(90,.15,'square',.06);if(hits>=budget){const rem=h.reduce((a,b)=>a+b,0);const sc=Math.max(0,Math.min(1,(1-rem/h0)/ref));res.push(sc);msg=sc>=.95?'아주 고르게 다졌어요!':`덜 다져진 곳이 남았어요(${Math.round(sc*100)}점)`;phase='wait';wait=1.8;snd(sc>.8?780:330,.3)}};
  const d=document.createElement('div');d.id='yiP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#2a2016;border:3px solid #c8a060;border-radius:16px;padding:10px 12px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f4ece0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:300px;max-width:94vw;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🪵 판축 다지기</b><div data-i style="margin:3px 0;font:14px 'Do Hyeon',sans-serif"></div><div style="font-size:12px;color:#e8d8c0">흙이 밝고 높은 칸을 눌러 찧어요. 찧은 칸은 많이, 옆 칸은 조금 다져져요</div><div data-m style="font-size:12px;color:#f8e8a0;margin-top:5px"></div>`;
  const iEl=d.querySelector('[data-i]'),mEl=d.querySelector('[data-m]');
  const pc=new THREE.PerspectiveCamera(CAM[6],innerWidth/innerHeight,.1,500);const rc=new THREE.Raycaster();const ov=document.createElement('div');ov.id='yiO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  ov.onpointerdown=e=>{pc.aspect=innerWidth/innerHeight;pc.position.set(CAM[0],CAM[1],CAM[2]);pc.lookAt(CAM[3],CAM[4],CAM[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld(true);rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const hh=rc.intersectObjects(cells,false)[0];if(hh){const u=hh.object.userData;hit(u.rw*NC+u.c)}};
  const cleanup=()=>{ov.remove();ram.visible=false;cells.forEach(m=>{m.scale.y=.001;m.position.y=.4});base.scale.y=1;base.position.y=.2};
  cells.forEach(m=>{m.material=new THREE.MeshStandardMaterial({color:0x8a6a44,roughness:1})});newRound();
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(anim){anim.t+=dt*3.2;const m=cells[anim.i];const top=lvl()+.08+h[anim.i];ram.position.y=anim.t<.5?top+.2+(1-anim.t*2)*1:top+.2+(anim.t-.5)*2;if(anim.t>=.5&&!anim.hit){anim.hit=true;apply(anim.i)}if(anim.t>=1){anim=null;ram.visible=false}}
   else if(phase==='play'&&auto){at+=dt;if(at>.25){at=0;let b=0,bg=-1;for(let i=0;i<N;i++){const g=gain(i);if(g>bg){bg=g;b=i}}hit(b)}}
   if(phase==='wait'){wait-=dt;if(wait<=0){rd++;if(rd>=3){fin();return}newRound()}}
   iEl.textContent=`${Math.min(rd+1,3)} / 3켜 · 찧은 횟수 ${hits}/${budget}`;mEl.textContent=msg;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/3*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('yongin_ram',Q,'판축 다지기')}catch(e){}window.__YIQ=Q;snd(660,.4);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">흙 성벽 세 켜를 다 쌓았어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">판축은 나무 틀을 세우고 흙을 얇게 부어 달구로 찧어 다지는 일을 켜켜이 되풀이해 벽을 쌓는 방법이에요. 처인성 같은 토성도 이렇게 쌓았어요. 고르게 다져야 비에도 무너지지 않아요.</div><div style="font-size:24px;color:#c8a060">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8a060;color:#2a2016;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ece0;border:2px solid #f4ece0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__YIRAM()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__YIG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('쿵! 고르게 다져요',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'화살촉',h:'고려 때 쇠 화살촉이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.ConeGeometry(.03,.14,4),M(0x4a3a30,{metalness:.6})))})},
  {n:'고려 청자 대접',h:'고려 청자 대접 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.1,.08,18),M(0x8aa890,{roughness:.3})))})},
  {n:'기와 조각',h:'성 안 건물 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.2,10,1,false,0,Math.PI),M(0x5a5a5a)))})},
  {n:'달구 손잡이',h:'흙을 다지던 달구의 나무 손잡이 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.2,6),M(0x6a4a30)))})},
  {n:'해동통보',h:'고려 때 만든 돈 해동통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__YIDIG=()=>{window.__DETECT&&window.__DETECT({key:'yongin_dig',title:'용인 발굴 탐지',emoji:'⛏️',bg:'#2a2016',count:4,TL:150,cand:[[-60,30],[-20,30],[30,30],[60,10],[-70,-20],[50,-40],[20,0],[-40,10]],items:ITEMS,intro:'땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'용인은 처인성을 지킨 사람들의 고장이에요.'})};
 const meta={quest:{t:'용인 둘러보기',d:'처인성과 와우정사 실측 지형 모형을 둘러보세요.',steps:[['처인성','용인 처인성'],['와우정사 모형','와우정사 실측 지형 모형']]},
  title:'용인 처인성·와우정사 실측 모형',hint:'와우정사 일대는 실측 3D를 크기 재어 1/100 모형으로, 처인성은 공개 사진으로 간추려 지었어요. 판축 틀의 흙을 고르게 다져 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-8,z:12,lines:['용인','처인성(간추림)','와우정사 실측 모형 1/100','판축 다지기']}},
  npc:[['science',[[-12,4],[-4,4],[-4,8],[-12,8]]]],bounds:[-90,80,-70,60],level:()=>'용인',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#84a04c';g.fillRect(0,0,300,300);g.strokeStyle='#9a7a50';g.lineWidth=4;g.beginPath();g.ellipse(X(CX),Z(CZ),CR*S,CR*.8*S,0,0,7);g.stroke();g.fillStyle='#5a4030';g.fillRect(X(DX-2.5),Z(DZ-2.1),5*S,4.2*S);g.fillStyle='#8a6a44';g.fillRect(X(PX-2.5),Z(PZ-1),5*S,2*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:22,yaw:Math.PI},size:{}},meta)}
