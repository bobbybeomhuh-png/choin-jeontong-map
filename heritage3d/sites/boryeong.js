/* 보령·계룡 마당(2026-11-22, W63): 보령 성주사지와 낭혜화상탑비, 충청수영성, 계룡산.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(찾은 거북 비석 3D는 AI로 만든 것이라 안 씀).
   성주사지(사적): 신라 말 큰 절터. 오층석탑과 삼층석탑 셋이 나란히 남아 있고, 최치원이 글을 지은 낭혜화상탑비(국보)가 거북 받침 위에 서 있어요.
   충청수영성: 오천항의 조선 수군 성(돌로 쌓은 무지개문). 계룡산: 북쪽 산줄기.
   놀이: 탁본 뜨기(3D 비석 앞면 종이를 문질러 새긴 글씨를 먹으로 떠내기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {lumpyHill} from './treekit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildBoryeong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(890);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x8a9a4a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 const ST=M(0x9a948a,{flatShading:true}),ST2=M(0x8a8478);
 /* 석탑: 층수·크기 */const pagoda=(x,z,fl,s)=>{const g=new THREE.Group();g.position.set(x,0,z);let y=0;const base=new THREE.Mesh(new THREE.BoxGeometry(3*s,.8*s,3*s),ST);base.position.y=.4*s;g.add(base);y=.8*s;const b2=new THREE.Mesh(new THREE.BoxGeometry(2.4*s,.7*s,2.4*s),ST);b2.position.y=y+.35*s;g.add(b2);y+=.7*s;for(let k=0;k<fl;k++){const w=(1.4-k*.14)*s;const body=new THREE.Mesh(new THREE.BoxGeometry(w,(k?.5:.9)*s,w),ST);body.position.y=y+(k?.25:.45)*s;g.add(body);y+=(k?.5:.9)*s;const roof=new THREE.Mesh(new THREE.BoxGeometry(w*1.8,.2*s,w*1.8),ST2);roof.position.y=y+.1*s;g.add(roof);y+=.2*s}const top=new THREE.Mesh(new THREE.CylinderGeometry(.08*s,.12*s,.8*s,8),ST2);top.position.y=y+.4*s;g.add(top);G.add(g);solids.push({cx:x,cz:z,r:1.6*s,y0:0,y1:y})};
 const SX=0,SZ=-20;{pagoda(SX,SZ+6,5,1.25);for(let i=0;i<3;i++)pagoda(SX-6+i*6,SZ-6,3,1);const pl=new THREE.Mesh(new THREE.BoxGeometry(20,.5,10),M(0xb8b0a0));pl.position.set(SX,.25,SZ-16);G.add(pl);for(let i=0;i<8;i++)for(let j=0;j<3;j++){const st=new THREE.Mesh(new THREE.CylinderGeometry(.5,.55,.25,10),ST2);st.position.set(SX-8.4+i*2.4,.62,SZ-19+j*3);G.add(st)}}
 /* 낭혜화상탑비: 거북 받침 + 비몸 + 머릿돌. 앞면(+z)에 탁본 종이 */const BX=16,BZ=-4,BW=1.5,BH=2.5;let paper=null,pctx=null,ptex=null,relief=null;
 {const g=new THREE.Group();g.position.set(BX,0,BZ);const shell=new THREE.Mesh(new THREE.SphereGeometry(1.6,16,10,0,Math.PI*2,0,Math.PI/2),M(0x7a7468,{flatShading:true}));shell.scale.set(1,.45,1.35);g.add(shell);const hd=new THREE.Mesh(new THREE.SphereGeometry(.42,12,10),M(0x7a7468,{flatShading:true}));hd.scale.set(.8,.8,1.3);hd.position.set(0,.45,2);g.add(hd);for(const[lx,lz]of[[-1.3,1.2],[1.3,1.2],[-1.3,-1.2],[1.3,-1.2]]){const lg=new THREE.Mesh(new THREE.SphereGeometry(.35,8,6),M(0x7a7468));lg.scale.y=.5;lg.position.set(lx,.15,lz);g.add(lg)}
  const body=new THREE.Mesh(new THREE.BoxGeometry(BW,BH,.35),M(0x4a4846,{roughness:.6}));body.position.y=.72+BH/2;g.add(body);const cap=new THREE.Mesh(new THREE.BoxGeometry(BW+.4,.7,.55),M(0x5a5652,{flatShading:true}));cap.position.y=.72+BH+.35;g.add(cap);for(const sx of[-1,1]){const dr=new THREE.Mesh(new THREE.TorusGeometry(.22,.07,6,10,Math.PI*1.3),M(0x5a5652));dr.position.set(sx*.45,.72+BH+.55,.25);g.add(dr)}
  /* 새긴 글씨(음각, 파인 곳) 무늬: 테두리 + 큰 글자 넷 + 작은 글줄. 탁본하면 겉면에 먹이 묻고 파인 글씨는 하얗게 남아요 */const RW=192,RH=320;relief=document.createElement('canvas');relief.width=RW;relief.height=RH;{const q=relief.getContext('2d');q.fillStyle='#000';q.fillRect(0,0,RW,RH);q.strokeStyle='#fff';q.lineWidth=6;q.strokeRect(8,8,RW-16,RH-16);q.fillStyle='#fff';q.font='bold 34px serif';q.textAlign='center';['朗','慧','和','尙'].forEach((c,i)=>q.fillText(c,RW/2,64+i*40));for(let col=0;col<6;col++)for(let row=0;row<9;row++){if(r()<.2)continue;q.fillRect(22+col*26,214+row*10,14,5)}}
  const pc=document.createElement('canvas');pc.width=RW;pc.height=RH;pctx=pc.getContext('2d');pctx.fillStyle='#f4f0e6';pctx.fillRect(0,0,RW,RH);ptex=new THREE.CanvasTexture(pc);ptex.colorSpace=THREE.SRGBColorSpace;
  paper=new THREE.Mesh(new THREE.PlaneGeometry(BW-.1,BH-.1),new THREE.MeshStandardMaterial({map:ptex,roughness:1}));paper.position.set(0,.72+BH/2,.18);paper.visible=false;g.add(paper);
  const ga=new THREE.Mesh(new THREE.PlaneGeometry(BW-.1,BH-.1),new THREE.MeshStandardMaterial({map:new THREE.CanvasTexture(relief),color:0x555555,transparent:true,opacity:.35}));ga.position.set(0,.72+BH/2,.176);g.add(ga);
  G.add(g);solids.push({cx:BX,cz:BZ,r:1.9,y0:0,y1:4.2})}
 /* 충청수영성(서쪽 바닷가): 돌 성벽 + 무지개문 + 바다 */const CX=-50,CZ=10;{const sea=new THREE.Mesh(new THREE.PlaneGeometry(40,200),M(0x3a7a9a,{roughness:.2,metalness:.12}));sea.rotation.x=-Math.PI/2;sea.position.set(-90,.04,0);G.add(sea);solids.push({x0:-110,x1:-70,y0:-1,y1:4,z0:-100,z1:100});
  const SWT=tex(256,128,(q,w,h)=>{q.fillStyle='#8a8478';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=16)for(let x=(y/16%2)*14;x<w;x+=28){const v=(r()*40|0);q.fillStyle=`rgb(${150+v},${145+v},${132+v})`;q.fillRect(x+1,y+1,26,14)}},[4,1]);const sw=new THREE.MeshStandardMaterial({map:SWT,roughness:1});
  for(const[z0,z1]of[[-24,-2.2],[2.2,24]]){const w=new THREE.Mesh(new THREE.BoxGeometry(2.6,4,z1-z0),sw);w.position.set(CX,2,CZ+(z0+z1)/2);G.add(w);solids.push({x0:CX-1.3,x1:CX+1.3,y0:0,y1:4,z0:CZ+z0,z1:CZ+z1})}
  const top=new THREE.Mesh(new THREE.BoxGeometry(2.6,1.2,4.4),sw);top.position.set(CX,3.4,CZ);G.add(top);const arch=new THREE.Mesh(new THREE.TorusGeometry(2.2,.45,6,16,Math.PI),sw);arch.rotation.y=Math.PI/2;arch.position.set(CX,2.6,CZ);G.add(arch)}
 /* 계룡산: 북쪽 산줄기 */{for(let k=0;k<7;k++){const h=lumpyHill((12+r()*6)*1.3,(18+r()*10)*.75,0x4a6a3a,((-40+k*14)*.13+57)|0);h.position.set(-40+k*14,-.5,-80-r()*8);G.add(h)}}
 const NL=[];if(!mini){for(const[x,y,z]of[[SX,4,SZ+12],[BX,3,BZ+4],[CX+4,3,CZ]]){const L=new THREE.PointLight(0xffc080,0,26,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8)};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(SX,SZ+12,3.4,'보령 성주사지','신라 말 큰 절이 있던 터예요(사적). 오층석탑과 삼층석탑 셋이 나란히 남아 있고, 뒤에는 금당 주춧돌이 줄지어 있어요. 간추려 지었어요.');
 sp(BX,BZ+4,3,'낭혜화상탑비','신라의 큰 스님 낭혜화상을 기린 비석이에요(국보). 글은 최치원이 지었어요. 거북 받침 위에 비몸을 세우고 용을 새긴 머릿돌을 얹었어요. 간추려 지었어요.');
 sp(BX+3,BZ+4,2.2,'탁본 뜨는 자리','비석 앞면에 종이를 붙이고 문질러 새긴 글씨를 떠 봐요.');
 sp(CX+5,CZ,3,'충청수영성','조선 수군이 충청도 바다를 지키던 성이에요. 돌로 쌓은 무지개문이 남아 있어요. 간추려 지었어요.');
 sp(40,40,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 탁본 뜨기(11/22): 40초. 비석 앞면에 종이를 붙였어요. 화면을 누른 채 문지르면 먹방망이가 지나간 자리에 먹이 묻어요. 비석 겉면에 먹이 고르게 묻을수록 파인 글씨가 하얗게 또렷이 떠올라요. 한 곳을 너무 오래 문지르면 먹이 번지고 종이가 상해요 */
 window.__BRRUB=()=>{if(document.getElementById('brP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(BX+2.6,BZ+3,0)}catch(e){}
  const CY=.72+BH/2,DIST=4.2,FOV=40;window.__GCAM=()=>document.getElementById('brP')?[BX,CY,BZ+.18+DIST,BX,CY,BZ+.18,FOV]:null;
  const RW=relief.width,RH=relief.height;const rel=relief.getContext('2d').getImageData(0,0,RW,RH).data;const ink=new Float32Array(RW*RH);let relN=0;for(let i=0;i<RW*RH;i++)if(rel[i*4]<128)relN++;
  pctx.fillStyle='#f4f0e6';pctx.fillRect(0,0,RW,RH);ptex.needsUpdate=true;paper.visible=true;
  let t=0,last=performance.now(),done=false,auto=false,down=false,px=-1,py=-1,blot=0,msg='';const TL=40;
  const ov=document.createElement('div');ov.id='brOv';ov.style.cssText='position:fixed;inset:0;z-index:55;touch-action:none;cursor:crosshair';document.body.appendChild(ov);
  const d=document.createElement('div');d.id='brP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#22201c;border:3px solid #c8c0b0;border-radius:16px;padding:8px 14px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f4f0e6;box-shadow:0 6px 18px rgba(0,0,0,.35);width:290px;max-width:94vw;user-select:none;pointer-events:auto";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🖌️ 탁본 뜨기</b><div data-i style="margin:3px 0;font:14px 'Do Hyeon',sans-serif"></div><div style="height:8px;background:#3a3a34;border-radius:4px;overflow:hidden"><div data-c style="height:100%;width:0;background:#e8e0d0"></div></div><button data-o style="width:100%;margin-top:6px;font:15px 'Do Hyeon',sans-serif;background:#5a5a54;color:#fff;border:0;border-radius:10px;padding:7px 0;cursor:pointer">다 떴어요</button><div data-m style="font-size:12px;color:#f8e8a0;margin-top:4px">비석을 누른 채 문질러요</div>`;
  const iEl=d.querySelector('[data-i]'),cEl=d.querySelector('[data-c]'),mEl=d.querySelector('[data-m]');
  /* 화면 좌표 → 종이 픽셀(카메라가 비석 정면을 보고 있어 바로 계산) */const toPaper=(cx,cy)=>{const W=innerWidth,H=innerHeight,hh=Math.tan(FOV/2*Math.PI/180)*DIST,hw=hh*W/H;const wx=(cx/W*2-1)*hw,wy=-(cy/H*2-1)*hh;const u=(wx+(BW-.1)/2)/(BW-.1),v=1-(wy+(BH-.1)/2)/(BH-.1);return[u*RW,v*RH]};
  const dab=(x,y)=>{const R=11;for(let yy=Math.max(0,y-R|0);yy<Math.min(RH,y+R);yy++)for(let xx=Math.max(0,x-R|0);xx<Math.min(RW,x+R);xx++){const dd=Math.hypot(xx-x,yy-y);if(dd>R)continue;const i=yy*RW+xx;const isRel=rel[i*4]<128;ink[i]+=isRel?.22:.05;if(ink[i]>5&&ink[i]<5.3)blot++}};
  const paint=()=>{const img=pctx.getImageData(0,0,RW,RH),p=img.data;let cov=0;for(let i=0;i<RW*RH;i++){const k=Math.min(1,ink[i]);const over=Math.max(0,ink[i]-4);const v=Math.max(10,244-k*220-over*20);p[i*4]=v;p[i*4+1]=v-2;p[i*4+2]=v-6;p[i*4+3]=255;if(rel[i*4]<128&&ink[i]>=1)cov++}pctx.putImageData(img,0,0);ptex.needsUpdate=true;return cov/relN};
  const rub=(cx,cy)=>{const[x,y]=toPaper(cx,cy);if(x<0||x>RW||y<0||y>RH)return;if(px>=0){const n=Math.ceil(Math.hypot(x-px,y-py)/4);for(let k=1;k<=n;k++)dab(px+(x-px)*k/n,py+(y-py)*k/n)}else dab(x,y);px=x;py=y};
  ov.onpointerdown=e=>{down=true;px=py=-1;rub(e.clientX,e.clientY)};ov.onpointermove=e=>{if(down)rub(e.clientX,e.clientY)};ov.onpointerup=ov.onpointercancel=ov.onpointerleave=()=>{down=false;px=py=-1};
  d.querySelector('[data-o]').onclick=()=>fin();
  const snd=(f,len,type='sine')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  let ay=0,adir=1,cov=0,fr=0;
  const step=now=>{if(!d.isConnected){ov.remove();paper.visible=false;return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;
   if(auto){/* 줄줄이 문지르기 */for(let k=0;k<6;k++){const x=(ay%2?RW-((t*900+k*30)%RW):((t*900+k*30)%RW));dab(x,8+(ay*9)%(RH-8))}if((t*900)%RW<30)ay++;if(cov>.9)fin()}
   if(++fr%3===0){cov=paint();cEl.style.width=Math.min(100,cov*100)+'%'}
   iEl.textContent=`${Math.max(0,Math.ceil(TL-t))}초 · 먹이 고르게 묻은 만큼 ${Math.round(cov*100)}%${blot>400?' · 먹이 번졌어요':''}`;
   if(t>=TL){fin();return}requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;ov.remove();cov=paint();const bl=blot/relN;const Q=Math.round(Math.max(0,Math.min(100,cov*110-bl*120)));const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('boryeong_rubbing',Q,'탁본 뜨기')}catch(e){}window.__BRQ=Q;snd(660,.3);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">탁본을 떴어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">탁본은 비석에 젖은 종이를 붙이고 먹방망이로 두드려, 새긴 글씨를 그대로 떠내는 방법이에요. 덕분에 닳아 가는 옛 비석의 글을 종이에 남겨 연구할 수 있어요. 낭혜화상탑비의 글은 최치원이 지었어요.</div><div style="font-size:24px;color:#c8c0b0">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8c0b0;color:#22201c;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4f0e6;border:2px solid #f4f0e6;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__BRRUB()};d.querySelector('[data-x]').onclick=()=>{d.remove();paper.visible=false}};
  requestAnimationFrame(step);window.__BRG={set auto(v){auto=v},get done(){return done},get cov(){return cov},rub,toPaper};try{ctx.say('비석 글씨를 떠내요!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'먹 조각',h:'탁본할 때 쓰던 먹 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.06,.02,.16),M(0x1a1a1a)))})},
  {n:'신라 기와',h:'성주사 터에서 나온 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18,1,false,0,Math.PI),M(0x5a5a5a)))})},
  {n:'금동 불상 손',h:'작은 금동 불상의 손 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.05,.1,.03),M(0xb8902a,{metalness:.7})))})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__BRDIG=()=>{window.__DETECT&&window.__DETECT({key:'boryeong_dig',title:'보령·계룡 발굴 탐지',emoji:'⛏️',bg:'#22201c',count:4,TL:150,cand:[[40,40],[-40,40],[10,40],[50,-30],[-30,-30],[30,20],[-20,30],[60,10]],items:ITEMS,intro:'땅속에 큰 절의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'보령은 신라 큰 절터와 바다 성의 고장이에요.'})};
 const meta={quest:{t:'보령·계룡 둘러보기',d:'성주사지와 낭혜화상탑비, 충청수영성을 둘러보세요.',steps:[['성주사지','보령 성주사지'],['탑비','낭혜화상탑비'],['수영성','충청수영성']]},
  title:'보령·계룡 성주사지·충청수영성',hint:'성주사지·낭혜화상탑비·충청수영성을 공개 사진으로 간추려 지었어요. 비석 앞면을 문질러 탁본을 떠 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-4,z:16,lines:['보령·계룡','성주사지 · 낭혜화상탑비','충청수영성 · 계룡산','간추려 지음']}},
  npc:[['science',[[-8,12],[4,12],[4,22],[-8,22]]]],bounds:[-69,90,-90,90],level:()=>'보령',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#3a7a9a';g.fillRect(0,0,X(-70),300);g.fillStyle='#9a948a';for(const[x,z]of[[SX,SZ+6],[SX-6,SZ-6],[SX,SZ-6],[SX+6,SZ-6]]){g.fillRect(X(x-1.5),Z(z-1.5),3*S,3*S)}g.fillStyle='#4a4846';g.fillRect(X(BX-1),Z(BZ-1.5),2*S,3*S);g.fillStyle='#8a8478';g.fillRect(X(CX-1.3),Z(CZ-24),2.6*S,48*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:22,yaw:Math.PI},size:{}},meta)}
