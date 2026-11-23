/* 고흥 마당(2026-11-22, W66): 운대리 분청사기 가마터와 팔영산.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(찾은 분청 항아리 3D는 실물 스캔이 아닌 작가의 창작이라 안 씀).
   고흥 운대리 분청사기 가마터(사적): 조선 초 분청사기를 굽던 가마터가 수십 곳 모인 곳. 분청은 회색 흙그릇에 흰 흙(백토)을 바르고 꾸민 그릇으로, 귀얄(넓은 풀비)로 쓱 바르는 「귀얄 분청」이 대표.
   팔영산: 여덟 봉우리가 늘어선 산.
   놀이: 귀얄 바르기(물레가 도는 그릇에 귀얄을 대고 꼭 한 바퀴 돈 뒤 떼어 흰 띠를 잇기), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {lumpyHill} from './treekit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildGoheung(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1420);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,200),new THREE.MeshStandardMaterial({map:GT,color:0x8a9a4a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 오름가마: 북쪽 비탈을 따라 계단처럼 오르는 굴 가마(칸 여섯) */const KX=-14,KZ=-24;{const slope=new THREE.Mesh(new THREE.BoxGeometry(10,5,26),M(0x7a6a4a,{roughness:1}));slope.position.set(KX,-.4,KZ-6);slope.rotation.x=.18;G.add(slope);const KM=M(0x8a5a3a,{flatShading:true});for(let k=0;k<6;k++){const z=KZ+4-k*4,y=.5+k*.75;const c=new THREE.Mesh(new THREE.CylinderGeometry(1.6,1.6,3.8,14,1,false,0,Math.PI),KM);c.rotation.set(Math.PI/2,0,Math.PI/2);c.rotation.set(0,0,0);c.geometry.rotateZ(Math.PI/2);c.geometry.rotateY(Math.PI/2);c.position.set(KX,y,z);G.add(c);const hole=new THREE.Mesh(new THREE.CircleGeometry(.25,10),M(0x1a1410));hole.position.set(KX+1.61,y+.6,z);hole.rotation.y=Math.PI/2;G.add(hole)}const mouth=new THREE.Mesh(new THREE.CircleGeometry(.6,12,0,Math.PI),M(0x2a1a10));mouth.position.set(KX,.5,KZ+5.95);G.add(mouth);const chim=new THREE.Mesh(new THREE.BoxGeometry(1,2.4,1),KM);chim.position.set(KX,5.4,KZ-19);G.add(chim);solids.push({x0:KX-2,x1:KX+2,y0:0,y1:8,z0:KZ-20,z1:KZ+6});
  /* 버린 조각 무더기 */const SH=[M(0x7a7a72),M(0xd8d4c8)];for(let k=0;k<40;k++){const s=new THREE.Mesh(new THREE.BoxGeometry(.15+r()*.2,.03,.12+r()*.15),SH[k%2]);s.position.set(KX+4+r()*4,.05+r()*.25,KZ+r()*8);s.rotation.set(r(),r()*3,r());G.add(s)}}
 /* 물레 작업장 */const WX=12,WZ=-6;const bowl=new THREE.Group();let btex=null,bctx=null;const BW=512,BH=128;
 {const shed=new THREE.Group();shed.position.set(WX,0,WZ);for(const[px,pz]of[[-3,-2.4],[3,-2.4],[3,2.4],[-3,2.4]]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,2.8,8),M(0x6a4a30));p.position.set(px,1.4,pz);shed.add(p)}const rf=new THREE.Mesh(new THREE.CylinderGeometry(.1,4.8,1.4,4),M(0xc8a860,{roughness:1}));rf.rotation.y=Math.PI/4;rf.scale.z=.8;rf.position.y=3.4;shed.add(rf);G.add(shed);
  const wheel=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,.08,24),M(0x6a4a30));wheel.position.set(WX,.7,WZ);G.add(wheel);const stand=new THREE.Mesh(new THREE.CylinderGeometry(.12,.3,.66,10),M(0x5a3a24));stand.position.set(WX,.33,WZ);G.add(stand);solids.push({cx:WX,cz:WZ,r:.6,y0:0,y1:1});
  const c=document.createElement('canvas');c.width=BW;c.height=BH;bctx=c.getContext('2d');btex=new THREE.CanvasTexture(c);btex.colorSpace=THREE.SRGBColorSpace;btex.wrapS=THREE.RepeatWrapping;
  const pts=[];for(let i=0;i<=20;i++){const t=i/20;pts.push(new THREE.Vector2(.07+.18*Math.sin(t*Math.PI*.55)+t*.03,t*.16))}const lg=new THREE.LatheGeometry(pts,48);const bm=new THREE.Mesh(lg,new THREE.MeshStandardMaterial({map:btex,roughness:.7,side:THREE.DoubleSide}));bowl.add(bm);const foot=new THREE.Mesh(new THREE.CircleGeometry(.075,24),new THREE.MeshStandardMaterial({color:0x6a6e6a,side:THREE.DoubleSide}));foot.rotation.x=-Math.PI/2;foot.position.y=.002;bowl.add(foot);bowl.position.set(WX,.74,WZ);bowl.scale.setScalar(.45);G.add(bowl)}
 const resetBowl=()=>{bctx.fillStyle='#6a6e6a';bctx.fillRect(0,0,BW,BH);for(let i=0;i<400;i++){bctx.fillStyle=`rgba(${80+Math.random()*30|0},${84+Math.random()*30|0},${80+Math.random()*30|0},.5)`;bctx.fillRect(Math.random()*BW,Math.random()*BH,2,2)}btex.needsUpdate=true};if(!mini)resetBowl();
 const brush=new THREE.Group();{const h=new THREE.Mesh(new THREE.CylinderGeometry(.008,.008,.22,6),M(0x8a6a44));h.rotation.z=Math.PI/2;h.position.x=.11;brush.add(h);const b=new THREE.Mesh(new THREE.BoxGeometry(.012,.035,.05),M(0xe8dcc0));brush.add(b);brush.position.set(WX+.26,.82,WZ);G.add(brush)}
 /* 팔영산: 여덟 봉우리 */{for(let k=0;k<8;k++){const p=lumpyHill((5+r()*2)*1.3,(14+r()*8)*.75,0x8a8478,((-35+k*10)*.13+57)|0);p.position.set(-35+k*10,-.5,-80-r()*6);G.add(p)}const sea=new THREE.Mesh(new THREE.PlaneGeometry(300,60),M(0x3a7a9a,{roughness:.2,metalness:.12}));sea.rotation.x=-Math.PI/2;sea.position.set(0,.04,95);G.add(sea);solids.push({x0:-150,x1:150,y0:-1,y1:4,z0:66,z1:130})}
 const NL=[];if(!mini){for(const[x,y,z]of[[KX+3,3,KZ+6],[WX,3,WZ+3]]){const L=new THREE.PointLight(0xffc080,0,26,1.5);L.position.set(x,y,z);G.add(L);NL.push(L)}}
 const glow=new THREE.PointLight(0xff6a1a,0,10,2);glow.position.set(KX,1,KZ+6.4);G.add(glow);
 let nk=0,tt=0;const nightTick=dt=>{tt+=dt;const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(L=>L.intensity=nk*8);glow.intensity=nk*(5+Math.sin(tt*7)*1.5)};
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 sp(KX+4,KZ+8,3.4,'운대리 분청사기 가마터','조선 초 분청사기를 굽던 가마가 수십 곳 모여 있던 곳이에요(사적). 비탈을 따라 칸칸이 오르는 오름가마에서 구웠고, 곁에는 깨진 그릇 조각이 무더기로 남아요. 간추려 지었어요.');
 sp(WX,WZ+3.4,2.4,'귀얄 바르는 자리','도는 그릇에 귀얄을 대고 꼭 한 바퀴 돈 뒤 떼어 흰 띠를 이어 봐요.');
 sp(0,-58,3.4,'팔영산','여덟 봉우리가 늘어선 고흥의 산이에요. 간추려 멀리 세웠어요.');
 sp(40,40,2.4,'발굴 탐지 자리','땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 귀얄 바르기(11/22): 그릇 넷. 물레가 돌아요(그릇마다 빠르기가 달라요). 「귀얄 대기」를 누르고 있는 동안 흰 흙이 발리고, 놓으면 떨어져요. 꼭 한 바퀴 돌았을 때 떼면 끊김도 겹침도 없는 고른 띠가 돼요 */
 window.__GHBRUSH=()=>{if(document.getElementById('ghP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(WX-1.4,WZ+1.4,0)}catch(e){}
  window.__GCAM=()=>document.getElementById('ghP')?[WX+.04,1.02,WZ+.5,WX,.8,WZ,45]:null;
  const NA=360;let rd=0,ang=0,spd=0,hold=false,cnt=new Uint8Array(NA),started=false,done=false,auto=false,last=performance.now(),msg='',wait=0,acc=0;const res=[];
  const newBowl=()=>{resetBowl();cnt.fill(0);started=false;acc=0;spd=Math.PI*2/(2+Math.random()*1.4)};newBowl();
  const d=document.createElement('div');d.id='ghP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:60;background:#24241e;border:3px solid #d8d4c8;border-radius:16px;padding:10px 14px;text-align:center;font:13px 'Gowun Dodum',sans-serif;color:#f4f2ea;box-shadow:0 6px 18px rgba(0,0,0,.35);width:290px;max-width:94vw;user-select:none;touch-action:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#fff">🖌️ 귀얄 바르기</b><div data-i style="margin:4px 0;font:14px 'Do Hyeon',sans-serif"></div><div style="position:relative;height:12px;background:#3a3a34;border-radius:6px;overflow:hidden"><div data-a style="height:100%;width:0;background:#e8e4d8"></div><div style="position:absolute;left:calc(100% - 3px);top:0;bottom:0;width:3px;background:#f8c060"></div></div><button data-p style="width:100%;margin-top:8px;font:20px 'Do Hyeon',sans-serif;background:#8a8a7a;color:#fff;border:0;border-radius:14px;padding:12px 0;cursor:pointer;touch-action:none">누르고 있는 동안 귀얄 대기</button><div data-m style="font-size:12px;color:#f8e8a0;margin-top:5px">한 바퀴(막대 끝)에서 떼요</div>`;
  const iEl=d.querySelector('[data-i]'),aEl=d.querySelector('[data-a]'),mEl=d.querySelector('[data-m]'),pb=d.querySelector('[data-p]');
  const snd=(f,len,type='sine')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const lift=()=>{if(!hold)return;hold=false;if(!started||wait>0)return;let cov=0,ov=0;for(const v of cnt){if(v>0)cov++;if(v>1)ov++}const sc=Math.max(0,cov/NA-ov/NA*1.5);res.push(sc);msg=cov<NA*.97?`띠가 ${Math.round((1-cov/NA)*360)}도 끊겼어요`:ov>NA*.03?`띠가 ${Math.round(ov/NA*360)}도 겹쳐 두꺼워요`:'끊김 없이 고른 띠예요!';snd(sc>.9?780:360,.2);wait=1.4};
  pb.onpointerdown=e=>{e.preventDefault();if(wait<=0&&!done){hold=true;if(!started){started=true;acc=0}}};pb.onpointerup=pb.onpointerleave=pb.onpointercancel=()=>lift();
  const kd=e=>{if(e.code==='Space'&&!e.repeat){e.preventDefault();if(wait<=0&&!done){hold=true;if(!started){started=true;acc=0}}}},ku=e=>{if(e.code==='Space')lift()};addEventListener('keydown',kd);addEventListener('keyup',ku);
  const paint=(a0,a1)=>{/* 그릇 둘레 각도 a → 텍스처 x. 띠는 높이 35~75% */bctx.fillStyle='rgba(236,232,220,.9)';const steps=Math.max(1,Math.ceil(Math.abs(a1-a0)/.01));for(let k=0;k<=steps;k++){const a=a0+(a1-a0)*k/steps;const x=((a/(Math.PI*2))%1+1)%1*BW;bctx.fillRect(x,BH*.25,3,BH*.4);bctx.fillStyle='rgba(200,196,184,.6)';for(let s=0;s<6;s++)bctx.fillRect(x,BH*.27+s*BH*.065,3,1);bctx.fillStyle='rgba(236,232,220,.9)'}btex.needsUpdate=true};
  const step=now=>{if(!d.isConnected){removeEventListener('keydown',kd);removeEventListener('keyup',ku);return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   const prevA=ang;ang+=spd*dt;bowl.rotation.y=ang;
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=4){fin();return}newBowl();msg=''}}
   else{if(auto){if(!started){hold=true;started=true;acc=0}else if(hold&&acc+spd*dt>=Math.PI*2)lift()}
    if(hold&&started){paint(-prevA,-ang);acc+=spd*dt;const i0=Math.floor(((prevA/(Math.PI*2))%1)*NA),n=Math.max(1,Math.round(spd*dt/(Math.PI*2)*NA));for(let k=0;k<n;k++)cnt[(i0+k)%NA]=Math.min(255,cnt[(i0+k)%NA]+1)}}
   brush.position.x=WX+(hold?.13:.26);aEl.style.width=Math.min(100,acc/(Math.PI*2)*100)+'%';aEl.style.background=acc>Math.PI*2*1.03?'#e86a4a':'#e8e4d8';iEl.textContent=`${Math.min(rd+1,4)} / 4번째 그릇 · 한 바퀴 ${(Math.PI*2/spd).toFixed(1)}초`;mEl.textContent=msg||mEl.textContent;requestAnimationFrame(step)};
  const fin=()=>{if(done)return;done=true;removeEventListener('keydown',kd);removeEventListener('keyup',ku);const Q=Math.round(Math.max(0,res.reduce((a,b)=>a+b,0)/4*100));const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('goheung_brush',Q,'귀얄 바르기')}catch(e){}window.__GHQ=Q;snd(660,.3);
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#fff">분청 그릇 넷에 귀얄을 발랐어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">귀얄 분청은 물레를 돌리며 넓은 풀비에 흰 흙을 묻혀 한 번에 쓱 발라요. 붓 자국이 그대로 남아 시원하고 힘찬 멋이 나요. 고흥 운대리 가마에서 이런 그릇을 많이 구웠어요.</div><div style="font-size:24px;color:#d8d4c8">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#d8d4c8;color:#24241e;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4f2ea;border:2px solid #f4f2ea;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__GHBRUSH()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  requestAnimationFrame(step);window.__GHG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()}};try{ctx.say('한 바퀴 쓱!',2)}catch(e){}};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'귀얄 분청 조각',h:'흰 흙 붓 자국이 남은 분청사기 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0xb8b4a8)))})},
  {n:'가마 도지미',h:'가마 안에서 그릇을 받치던 받침이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.08,.1,.08,10),M(0x8a5a3a)))})},
  {n:'인화 분청 조각',h:'도장으로 꽃무늬를 찍은 분청 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.16,.03,.12),M(0x8a8a80)))})},
  {n:'백자 접시',h:'조선 때 접시 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.2,.12,.05,18),M(0xf0ece0,{roughness:.3})))})},
  {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
 window.__GHDIG=()=>{window.__DETECT&&window.__DETECT({key:'goheung_dig',title:'고흥 발굴 탐지',emoji:'⛏️',bg:'#24241e',count:4,TL:150,cand:[[40,40],[-40,40],[10,40],[50,-30],[-50,0],[30,20],[-20,30],[60,10]],items:ITEMS,intro:'땅속에 가마터 그릇 조각이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'고흥은 분청사기 가마의 고장이에요.'})};
 const meta={quest:{t:'고흥 둘러보기',d:'분청사기 가마터와 물레 작업장, 팔영산을 둘러보세요.',steps:[['가마터','운대리 분청사기 가마터'],['물레','귀얄 바르는 자리'],['팔영산','팔영산']]},
  title:'고흥 운대리 분청사기 가마터',hint:'운대리 가마터와 팔영산을 공개 사진으로 간추려 지었어요. 도는 그릇에 귀얄로 흰 띠를 한 바퀴 둘러 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-4,z:16,lines:['고흥','운대리 분청사기 가마터','오름가마 · 귀얄','간추려 지음']}},
  npc:[['science',[[-8,12],[4,12],[4,22],[-8,22]]]],bounds:[-90,90,-90,65],level:()=>'고흥',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#8a9a4a';g.fillRect(0,0,300,300);g.fillStyle='#3a7a9a';g.fillRect(0,Z(66),300,300);g.fillStyle='#8a5a3a';g.fillRect(X(KX-2),Z(KZ-20),4*S,26*S);g.fillStyle='#c8a860';g.fillRect(X(WX-3),Z(WZ-2.4),6*S,4.8*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:22,yaw:Math.PI},size:{}},meta)}
