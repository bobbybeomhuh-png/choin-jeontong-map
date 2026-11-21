/* 충주 중원 마당(2026-11-21): 공개 실측 3D(CC BY)가 없어 공개 수치로 간추려 지음.
   탑평리 칠층석탑(국보, 중앙탑): 통일신라, 높이 약 14.5m, 신라 땅 한가운데라 「중앙탑」. 남한강가 흙 둔덕 위.
   충주 고구려비(국보): 우리나라에 하나뿐인 고구려 비석, 높이 약 2m 네모 돌기둥, 1979년 입석마을에서 찾음. 「高麗太王」 글자가 새겨져 있음(실제로는 몇 km 떨어진 곳, 여기선 강가에 모음).
   놀이: 고구려비 탁본 뜨기(종이 위를 문질러 글자 드러내기), 발굴 탐지, 밤 탑 조명. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
export function buildChungju(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1979);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 const RZ=46;/* 강 시작 z */
 const MR=15,MH=3;const H=(x,z)=>{const d=Math.hypot(x,z);return d<MR?MH*(1-(d/MR)**2)**.6:0};
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(300,240,150,120);g.rotateX(-Math.PI/2);g.translate(0,0,-30);const p=g.attributes.position;const col=[];const c=new THREE.Color();
  for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);p.setY(k,z>RZ?-3:H(x,z));const path=(Math.abs(x)<2&&z>MR&&z<RZ)||(Math.abs(z-24)<1.8&&x<0&&x>-46);c.set(path?'#c8b894':'#6f9a44');col.push(c.r,c.g,c.b)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1}));m.receiveShadow=true;G.add(m)}
 /* 남한강 */{const w=new THREE.Mesh(new THREE.PlaneGeometry(400,200),M(0x3f6f7a,{roughness:.1,metalness:.2}));w.rotation.x=-Math.PI/2;w.position.set(0,-.6,RZ+100);G.add(w);solids.push({x0:-200,x1:200,y0:-4,y1:2,z0:RZ+1,z1:RZ+200});const bank=new THREE.Mesh(new THREE.BoxGeometry(400,1,3),M(0x9a9080));bank.position.set(0,-.3,RZ+.8);G.add(bank)}
 /* 탑평리 칠층석탑(14.5m): 2단 기단 + 7층 몸돌·지붕돌 + 상륜 */
 const TY=MH;{const sm=M(0xb8b2a4,{roughness:.85}),sd=M(0x9a948a);const g=new THREE.Group();g.position.set(0,TY-.1,0);let y=0;
  for(const[w,h,m]of[[6.4,1.1,sd],[5,1.3,sm]]){const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,w),m);b.position.y=y+h/2;g.add(b);const cap=new THREE.Mesh(new THREE.BoxGeometry(w+.3,.25,w+.3),sm);cap.position.y=y+h+.12;g.add(cap);y+=h+.25}
  for(let k=0;k<7;k++){const s=2.9-k*.26,h=(k===0?1.5:.95-k*.05);const body=new THREE.Mesh(new THREE.BoxGeometry(s,h,s),sm);body.position.y=y+h/2;g.add(body);y+=h;const rw=s*1.55;const rf=new THREE.Mesh(new THREE.CylinderGeometry(rw*.5,rw*.72,.42,4,1),sm);rf.rotation.y=Math.PI/4;rf.position.y=y+.21;g.add(rf);const tip=new THREE.Mesh(new THREE.BoxGeometry(rw*1.02,.08,rw*1.02),sd);tip.position.y=y+.02;g.add(tip);y+=.42}
  const sp=new THREE.Mesh(new THREE.CylinderGeometry(.12,.22,1.4,8),sd);sp.position.y=y+.7;g.add(sp);for(let i=0;i<3;i++){const ring=new THREE.Mesh(new THREE.SphereGeometry(.28-i*.05,10,8),sd);ring.position.y=y+.3+i*.45;g.add(ring)}
  g.traverse(e=>{if(e.isMesh){e.castShadow=e.receiveShadow=true;cam.push(e)}});G.add(g);window.__CJTH=y;solids.push({x0:-3.4,x1:3.4,y0:0,y1:20,z0:-3.4,z1:3.4})}
 /* 고구려비 비각 + 비석 */
 const BX=-48,BZ=24;{const sm=M(0x8a8478,{roughness:.9});const st=new THREE.Mesh(new THREE.BoxGeometry(.55,2.03,.55),sm);st.position.set(BX,1.02+.3,BZ);st.castShadow=true;G.add(st);cam.push(st);const bs=new THREE.Mesh(new THREE.BoxGeometry(1.4,.3,1.4),M(0xa8a294));bs.position.set(BX,.15,BZ);G.add(bs);solids.push({x0:BX-.8,x1:BX+.8,y0:0,y1:2.5,z0:BZ-.8,z1:BZ+.8});
  /* 비석 면에 옅은 글자 무늬 */const c=document.createElement('canvas');c.width=64;c.height=256;const q=c.getContext('2d');q.fillStyle='#8a8478';q.fillRect(0,0,64,256);q.fillStyle='rgba(60,56,50,.5)';q.font='14px serif';const chars='五月中高麗太王祖王令新羅寐錦世世爲願';for(let i=0;i<chars.length;i++)q.fillText(chars[i],(i%3)*20+4,16+((i/3)|0)*26);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;st.material=[sm,sm,sm,sm,new THREE.MeshStandardMaterial({map:t,roughness:.9}),sm];
  if(!mini){const h=buildHall({x:BX,z:BZ,ry:0,W:4.4,D:4.4,nx:1,nz:1,FY:.3,PH:3,roof:'hip',name:'高句麗碑',pillar:0x9a3a26,bracket:'ik',front:'open',back:'open',left:'open',right:'open',stairs:'none',solids:[],light:false,roofScale:.75});G.add(h.group)}}
 /* 둘레 나무 */{const tm=M(0x5a4030),lm=M(0x4a7a34);for(let i=0;i<50;i++){const x=-140+r()*280,z=-140+r()*180;if(Math.hypot(x,z)<22||Math.hypot(x-BX,z-BZ)<8||(Math.abs(x)<4&&z>0))continue;const t=new THREE.Mesh(new THREE.CylinderGeometry(.22,.32,3.6,6),tm);t.position.set(x,1.8,z);G.add(t);const cc=new THREE.Mesh(new THREE.IcosahedronGeometry(2.4,1),lm);cc.position.set(x,4.4,z);cc.scale.y=.8;cc.castShadow=true;G.add(cc);solids.push({cx:x,cz:z,r:.4,y0:0,y1:6})}}
 /* 밤: 탑 조명 넷 */
 const NL=[];if(!mini){for(const[x,z]of[[7,7],[-7,7],[7,-7],[-7,-7]]){const L=new THREE.SpotLight(0xffe0b0,0,40,.5,.6,1);L.position.set(x,H(x,z)+.4,z);L.target.position.set(0,TY+8,0);G.add(L,L.target);NL.push(L)}const L2=new THREE.PointLight(0xffc080,0,14,1.5);L2.position.set(BX,3,BZ+3);G.add(L2);NL.push(L2)}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach((L,i)=>L.intensity=nk*(i<4?30:6))};
 /* 안내 */
 const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(0,MR+4,3.4,'탑평리 칠층석탑(중앙탑)','통일신라 때 세운 높이 약 14.5m의 칠층석탑이에요(국보). 신라 땅의 한가운데에 세웠다고 해서 「중앙탑」이라 불러요. 남한강가 흙 둔덕 위에 서 있어요. 간추려 지었어요.');
 sp(BX+4,BZ+3,3,'충주 고구려비','우리나라에 하나뿐인 고구려 비석이에요(국보). 높이 약 2m 네모 돌기둥 네 면에 글자를 새겼는데, 「高麗太王」이라는 말이 보여요. 1979년 마을 사람들이 빨래판처럼 쓰던 돌에서 글자가 발견됐어요.');
 sp(BX+2.6,BZ-2.6,1.6,'탁본 뜨는 자리','고구려비에 종이를 대고 먹을 두드려 글자를 떠 봐요.');
 sp(0,RZ-4,3,'남한강','남한강은 고구려·백제·신라가 서로 차지하려 다툰 물길이에요. 그래서 이곳에 세 나라의 흔적이 모두 남아 있어요.');
 sp(24,10,2.4,'발굴 탐지 자리','중원 땅속에 세 나라의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 고구려비 탁본(11/21): 비석 앞 종이를 눌러 문지르면 먹이 묻고, 새긴 글자는 하얗게 남아요. 70% 넘게 칠하면 완성. 60초 */
 window.__CJTAKBON=()=>{if(document.getElementById('cjtP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(BX,BZ+2.2,0);H3.face(Math.PI)}catch(e){}
  const W=256,HH=512;const mask=document.createElement('canvas');mask.width=W;mask.height=HH;{const q=mask.getContext('2d');q.fillStyle='#000';q.fillRect(0,0,W,HH);q.fillStyle='#fff';q.font="bold 104px serif";q.textAlign='center';q.textBaseline='middle';const ch='高麗太王';for(let i=0;i<4;i++)q.fillText(ch[i],W/2,70+i*118)}const md=mask.getContext('2d').getImageData(0,0,W,HH).data;
  const pc=document.createElement('canvas');pc.width=W;pc.height=HH;const q=pc.getContext('2d');q.fillStyle='#f4eedc';q.fillRect(0,0,W,HH);const pt=new THREE.CanvasTexture(pc);pt.colorSpace=THREE.SRGBColorSpace;
  const paper=new THREE.Mesh(new THREE.PlaneGeometry(.5,1),new THREE.MeshBasicMaterial({map:pt}));paper.position.set(BX,1.4,BZ+.285);G.add(paper);
  const CP=[BX,1.4,BZ+1.35],LK=[BX,1.4,BZ];window.__GCAM=()=>document.getElementById('cjtP')?[...CP,...LK,55]:null;
  const ink=document.createElement('canvas');ink.width=ink.height=48;{const iq=ink.getContext('2d');const gr=iq.createRadialGradient(24,24,2,24,24,24);gr.addColorStop(0,'rgba(20,18,16,.55)');gr.addColorStop(1,'rgba(20,18,16,0)');iq.fillStyle=gr;iq.fillRect(0,0,48,48)}
  const cov=new Uint8Array((W/8)*(HH/8));let done=false,down=false,t0=performance.now()/1000;const TL=60;
  const dab=(u,v)=>{const x=u*W,y=(1-v)*HH;q.save();q.globalCompositeOperation='source-over';q.drawImage(ink,x-24,y-24);q.restore();/* 글자 자리는 다시 종이색으로(돋을새김이 안 묻음) */const x0=Math.max(0,(x-26)|0),y0=Math.max(0,(y-26)|0),x1=Math.min(W,(x+26)|0),y1=Math.min(HH,(y+26)|0);const id=q.getImageData(x0,y0,x1-x0,y1-y0);for(let yy=0;yy<id.height;yy++)for(let xx=0;xx<id.width;xx++){const mi=(((y0+yy)*W)+(x0+xx))*4;if(md[mi]>128){const o=(yy*id.width+xx)*4;id.data[o]=244;id.data[o+1]=238;id.data[o+2]=220}}q.putImageData(id,x0,y0);pt.needsUpdate=true;for(let gy=Math.max(0,((y-20)/8)|0);gy<Math.min(HH/8,((y+20)/8)|0);gy++)for(let gx=Math.max(0,((x-20)/8)|0);gx<Math.min(W/8,((x+20)/8)|0);gx++)cov[gy*(W/8)+gx]=1};
  const rc=new THREE.Raycaster(),pcam=new THREE.PerspectiveCamera(55,1,.01,20),ndc=new THREE.Vector2();
  const at=(ev)=>{const k=window.__GCAM&&window.__GCAM();if(!k)return;pcam.fov=k[6];pcam.aspect=innerWidth/innerHeight;pcam.position.set(k[0],k[1],k[2]);pcam.lookAt(k[3],k[4],k[5]);pcam.updateMatrixWorld(true);pcam.updateProjectionMatrix();ndc.set(ev.clientX/innerWidth*2-1,-(ev.clientY/innerHeight)*2+1);rc.setFromCamera(ndc,pcam);const hit=rc.intersectObject(paper)[0];if(hit&&hit.uv)dab(hit.uv.x,hit.uv.y)};
  const pd=ev=>{if(ev.target&&ev.target.closest&&ev.target.closest('#cjtP'))return;down=true;at(ev)},pm=ev=>{if(down)at(ev)},pu=()=>{down=false};addEventListener('pointerdown',pd,true);addEventListener('pointermove',pm,true);addEventListener('pointerup',pu,true);
  const d=document.createElement('div');d.id='cjtP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#26221e;border:3px solid #c8b890;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffe8b0">🖌️ 고구려비 탁본 뜨기</b><div id="cjtS" style="font:20px 'Do Hyeon',sans-serif;margin:4px 0">0%</div><div style="font-size:13px;color:#ffe8b0">종이를 누른 채 문질러 먹을 묻혀요</div><div id="cjtT" style="font-size:13px">${TL}초</div><div style="font-size:12px;opacity:.85">새긴 글자 자리는 먹이 안 묻어 하얗게 떠올라요</div>`;const Sx=d.querySelector('#cjtS'),T=d.querySelector('#cjtT');
  const cleanup=()=>{removeEventListener('pointerdown',pd,true);removeEventListener('pointermove',pm,true);removeEventListener('pointerup',pu,true)};
  const fin=()=>{if(done)return;done=true;cleanup();const pc2=cov.reduce((a,b)=>a+b,0)/cov.length;const el=performance.now()/1000-t0;const Q=pc2>=.7?Math.max(70,Math.round(100-Math.max(0,el-25))):Math.round(pc2/.7*65);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('chungju_takbon',Q,'고구려비 탁본')}catch(e){}window.__CJTQ=Q;
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffe8b0">「高麗太王」 탁본 완성!</b><div style="font-size:13px;margin:4px 0">탁본은 비석에 젖은 종이를 붙이고 먹방망이로 두드려 새긴 글자를 그대로 떠 내는 방법이에요. 닳아 잘 안 보이는 고구려비 글자도 탁본으로 읽어 냈어요.</div><div style="font-size:26px;color:#c8b890">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8b890;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();G.remove(paper);setTimeout(()=>window.__CJTAKBON(),60)};d.querySelector('[data-x]').onclick=()=>{d.remove()}},500)};
  const loop=()=>{if(!d.isConnected){cleanup();setTimeout(()=>G.remove(paper),3000);return}const now=performance.now()/1000;if(!done){const pc2=cov.reduce((a,b)=>a+b,0)/cov.length;Sx.textContent=Math.round(pc2*100)+'%';if(pc2>=.7)fin();const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin()}requestAnimationFrame(loop)};loop();
  window.__CJTG={rub:()=>{for(let y=.03;y<1;y+=.06)for(let x=.03;x<1;x+=.07)dab(x,y)},get cov(){return cov.reduce((a,b)=>a+b,0)/cov.length}};try{ctx.say('고구려비에 종이를 대고 먹을 두드려 글자를 떠 봐요!',2.4)}catch(e){}};
 /* 발굴 탐지 */
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'고구려 토기 조각',h:'고구려 사람들이 쓴 누런 토기 조각이에요. 중원 땅에 고구려가 머물렀던 흔적이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.3,12,1,true,0,1.4),M(0xa8885a,{side:THREE.DoubleSide})))})},
  {n:'백제 기와 조각',h:'백제 사람들이 남긴 기와 조각이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.3,12,1,true,0,Math.PI),M(0x6a6660,{side:THREE.DoubleSide}));m.rotation.z=Math.PI/2;g.add(m)})},
  {n:'신라 굽다리 접시',h:'신라 토기예요. 결국 이 땅을 차지한 신라가 중앙탑을 세웠어요.',mk:mk(g=>{const t=new THREE.Mesh(new THREE.CylinderGeometry(.2,.06,.08,16),M(0x5a5450));t.position.y=.14;g.add(t);g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.12,.16,12),M(0x5a5450)))})},
  {n:'쇠 덩이',h:'충주는 예부터 쇠가 나는 고장이었어요. 세 나라가 이 땅을 탐낸 까닭 가운데 하나예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.DodecahedronGeometry(.12,0),M(0x4a3a30,{metalness:.5})))})},
  {n:'청동 거울 조각',h:'뒷면에 무늬가 있는 청동 거울 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.02,20,1,false,0,4),M(0x5f7a68,{metalness:.6})))})}];
 window.__CJDIG2=()=>{window.__DETECT&&window.__DETECT({key:'chungju_dig',title:'중원 발굴 탐지',emoji:'⛏️',bg:'#22261e',count:4,TL:150,cand:[[24,10],[30,-20],[-24,-24],[-30,10],[20,30],[-10,-40],[40,0],[-60,0]],items:ITEMS,intro:'중원 땅속에 고구려·백제·신라의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'충주 일대에서는 세 나라의 유물이 모두 나와, 남한강을 두고 다툰 역사를 보여 줘요.'})};
 const meta={quest:{t:'중원 둘러보기',d:'중앙탑과 고구려비를 둘러보세요.',steps:[['중앙탑','탑평리 칠층석탑(중앙탑)'],['고구려비','충주 고구려비'],['남한강','남한강']]},
  title:'충주 중앙탑·고구려비',hint:'남한강가 중앙탑과 하나뿐인 고구려 비석을 간추려 지었어요. 고구려비 탁본을 떠 「高麗太王」 글자를 찾아 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,groundY:-3.2,sign:{x:10,z:34,lines:['충주 중앙탑·고구려비','탑평리 칠층석탑(국보)','충주 고구려비(국보)','간추려 지음']}},
  npc:[['science',[[4,30],[14,30],[14,40],[4,40]]]],bounds:[-110,110,-120,RZ],level:()=>'중원',camCap:()=>Infinity,baseAt:(x,z)=>H(x,z),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.4,ox:-20,oz:10,draw(g,X,Z,S){g.fillStyle='#6f9a44';g.fillRect(0,0,300,300);g.fillStyle='#3f6f7a';g.fillRect(0,Z(RZ),300,300);g.fillStyle='#8a8a5a';g.beginPath();g.arc(X(0),Z(0),MR*S,0,7);g.fill();g.fillStyle='#b8b2a4';g.fillRect(X(-3),Z(3),6*S,6*S);g.fillStyle='#9a3a26';g.fillRect(X(BX-2.2),Z(BZ+2.2),4.4*S,4.4*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:40,yaw:Math.PI},size:{}},meta)}
