/* 김천 직지사 마당(2026-11-23, 2단계 일곱째 묶음): 황악산 직지사. 대웅전(보물) 앞 동서 삼층석탑(보물, 문경 도천사 터에서 옮겨 옴), 비로전(천불전) 앞 삼층석탑.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   비로전에는 흰 옥돌로 깎은 천 분의 부처님이 있고, 그 가운데 하나뿐인 벌거숭이 동자상을 첫눈에 찾으면 소원이 이뤄진다는 이야기가 전해 옴(전해 오는 이야기).
   사명대사가 출가한 절, 만세루.
   놀이: 천불전 동자 찾기(줄줄이 앉은 부처님 사이에서 서 있는 동자 하나를 찾아 눌러요. 판마다 더 많아지고 더 닮아져요, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {curvedRoof,buildHall} from './hallkit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildJikji(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(418);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7c9a4a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 황악산 */for(let i=0;i<9;i++){const h=new THREE.Mesh(new THREE.SphereGeometry(22+r()*10,14,8,0,Math.PI*2,0,Math.PI/2),M(0x4a6a3a,{flatShading:true}));h.scale.y=.6;h.position.set(-80+i*20,0,-100-r()*12);G.add(h)}
 const ST=M(0xa8a296),WOODB=M(0x8a7458),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50),DAN=M(0x8a3a2a);
 const plaque=(x,y,z,txt,w=2)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 const hall=(x,z,W,D,PH,base=.8)=>{/* 11/23 품질: 흰 상자 벽+기둥 → hallkit 법당 */const h=buildHall({x,z,W,D,nx:Math.max(1,Math.round(W/3)),nz:Math.max(1,Math.round(D/3.2)),FY:base,PH:PH,roof:'hip',pillar:0x9a3a26,bracket:(W>=8?'dapo':'ik'),front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',mini,solids,light:false,roofScale:.9});G.add(h.group);return base+PH};
 const tower=(X,Z,s=1)=>{let y=0;const st=(w,h)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w*s,h*s,w*s),ST);m.position.set(X,y+h*s/2,Z);G.add(m);y+=h*s};st(2.4,.4);st(1.8,.7);for(let i=0;i<3;i++){st(.9-i*.12,.55-i*.07);st(1.5-i*.2,.18)}solids.push({cx:X,cz:Z,r:1.3*s,y0:0,y1:y})};
 /* 일주문 */{for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.34,.36,4.2,12),DAN);c.position.set(s*2.1,2.1,50);G.add(c);solids.push({cx:s*2.1,cz:50,r:.4,y0:0,y1:4.2})}curvedRoof(G,0,(5)-(1.6)/2,50,(4.5)/.72,(2.3)/.72,(1.6)*1.05);plaque(0,3.7,50.95,'藍伽一第國東',2.4)}
 sp(0,54,3,'일주문','"동국제일가람(東國第一伽藍)", 우리나라에서 으뜸가는 절이라는 현판이 걸린 문이에요.');
 /* 만세루(누각, 아래로 지나감) */const MZ=30;{const W=10,D=4;for(let i=0;i<=4;i++)for(const j of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.22,.24,2.6,10),WOODB);c.position.set(-W/2+i*W/4,1.3,MZ+j*D/2);G.add(c);if(i!==2)solids.push({cx:-W/2+i*W/4,cz:MZ+j*D/2,r:.28,y0:0,y1:2.6})}const fl=new THREE.Mesh(new THREE.BoxGeometry(W+.6,.3,D+.6),WOODB);fl.position.set(0,2.75,MZ);G.add(fl);const up=new THREE.Mesh(new THREE.BoxGeometry(W,2,D),WALLW);up.position.set(0,3.9,MZ);G.add(up);curvedRoof(G,0,(5.7)-(1.6)/2,MZ,((W+2.4)*.72)/.72,((D+2.4)*.72)/.72,(1.6)*1.05);plaque(0,4.4,MZ+2.05,'樓歲萬',1.6)}
 sp(0,MZ+4,3,'만세루','누각 아래를 지나 대웅전 마당으로 올라가요.');
 /* 동서 삼층석탑 + 대웅전 */tower(-5,12);tower(5,12);
 sp(-5,16,2.6,'동서 삼층석탑','대웅전 앞의 두 탑은 문경 도천사 터에서 옮겨 온 신라 탑이에요(보물).');
 const DZ=0;{const y=hall(0,DZ,13,7,4,1.1);plaque(0,y-.5,DZ+3.55,'殿雄大',1.8)}
 sp(0,DZ+7.5,3.4,'대웅전','직지사의 큰 법당이에요(보물). 안에 큰 후불탱화 세 폭이 있어요.');
 /* 비로전(천불전) + 앞 석탑 */const BX=24,BZ=4;{const y=hall(BX,BZ,9,6,3.4,.8);plaque(BX,y-.45,BZ+3.05,'殿盧毘',1.5);tower(BX,BZ+9,.9)}
 sp(BX,BZ+6.5,3,'비로전(천불전)','흰 옥돌로 깎은 천 분의 부처님이 모셔져 있어요. 그 가운데 하나뿐인 벌거숭이 동자를 첫눈에 찾으면 소원이 이뤄진다는 이야기가 전해 와요(전해 오는 이야기).');
 /* 사명각 */{const y=hall(-22,-2,6,4.5,3,.8);plaque(-22,y-.4,.3,'閣溟泗',1.3)}
 sp(-22,3,2.6,'사명각','임진왜란 때 승병을 이끈 사명대사는 직지사에서 출가했어요.');
 /* 천불전 동자 찾기(11/23) */const PX=-24,PZ=22;const pg=new THREE.Group();pg.position.set(PX,0,PZ);pg.visible=false;G.add(pg);
 window.__JJCHILD=()=>{if(document.getElementById('jjcP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX+9,PZ+4,0)}catch(e){}pg.visible=true;
  const WW=7.2,HH=4.2;const camA=()=>{const k=innerWidth<innerHeight?2.4:1;return[PX,2.4,PZ+6.6*k,PX,2.4,PZ,50]};window.__GCAM=()=>document.getElementById('sssX')?null:document.getElementById('jjcP')?camA():null;
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,100);const rc=new THREE.Raycaster();
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  let rd=0,nc=0,nr=0,odd=0,t0=0,wrong=0,done=false,auto=false,last=performance.now(),wait=0,hitP=null,figs=[],aT=0;const res=[];const NR=3;
  const snd=(f,len=.1,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const clr=()=>{while(pg.children.length)pg.remove(pg.children[0]);figs=[]};
  const JADE=M(0xf2eee2,{roughness:.5}),GOLD=M(0xd8b048,{metalness:.4,roughness:.5}),SKIN=M(0xe8c8a0,{roughness:.6}),SH=M(0x6a4a2a);
  const cell=i=>{const c=i%nc,rr=(i/nc)|0;return[(c+.5)/nc*WW-WW/2,HH-(rr+.5)/nr*HH+.4]};
  const newRound=()=>{clr();[nc,nr]=[[10,6],[14,8],[18,10]][rd];const n=nc*nr;odd=(r()*n)|0;const sz=Math.min(WW/nc,HH/nr);
   const back=new THREE.Mesh(new THREE.BoxGeometry(WW+.4,HH+.4,.1),M(0x5a3a22));back.position.set(0,HH/2+.4,-.3);pg.add(back);
   for(let rr=0;rr<nr;rr++){const sh=new THREE.Mesh(new THREE.BoxGeometry(WW+.2,.05,.5),SH);sh.position.set(0,HH-(rr+1)/nr*HH+.4,-.05);pg.add(sh)}
   const mat=rd===0?JADE:rd===1?JADE:GOLD;const B=new THREE.ConeGeometry(.42*sz,.6*sz,10),Hd=new THREE.SphereGeometry(.17*sz,10,8);
   for(let i=0;i<n;i++){const[x,y]=cell(i);const g=new THREE.Group();g.position.set(x,y-HH/nr/2+.03,0);pg.add(g);figs.push(g);
    if(i===odd){/* 서 있는 동자 */const bd=new THREE.Mesh(new THREE.CylinderGeometry(.13*sz,.16*sz,.62*sz,10),rd===0?SKIN:mat);bd.position.y=.31*sz;g.add(bd);const hd=new THREE.Mesh(Hd,rd===0?SKIN:mat);hd.position.y=.78*sz;g.add(hd);for(const s of[-1,1]){const a=new THREE.Mesh(new THREE.CylinderGeometry(.04*sz,.04*sz,.36*sz,6),rd===0?SKIN:mat);a.position.set(s*.2*sz,.5*sz,0);a.rotation.z=s*.5;g.add(a)}}
    else{const bd=new THREE.Mesh(B,mat);bd.position.y=.3*sz;g.add(bd);const hd=new THREE.Mesh(Hd,mat);hd.position.y=.7*sz;g.add(hd);const ush=new THREE.Mesh(new THREE.SphereGeometry(.07*sz,8,6),mat);ush.position.y=.86*sz;g.add(ush)}}
   hitP=new THREE.Mesh(new THREE.PlaneGeometry(WW,HH),new THREE.MeshBasicMaterial({visible:false}));hitP.position.set(0,HH/2+.4,.05);pg.add(hitP);
   t0=performance.now();wrong=0;aT=0;ui()};
  const ov=document.createElement('div');ov.id='jjcO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:crosshair';document.body.appendChild(ov);
  const pick=i=>{if(done||wait>0)return;if(i===odd){const tm=(performance.now()-t0)/1000;const sc=Math.max(20,Math.round(100-Math.max(0,tm-3)*3-wrong*12));res.push(sc);wait=1.6;snd(760,.4,'sine');const g=figs[odd];g.scale.setScalar(1.8);g.position.z=.3;ui(`찾았어요! ${tm.toFixed(1)}초 · ${sc}점`)}else{wrong++;snd(180,.2,'sawtooth');const g=figs[i];if(g){g.rotation.z=.3;setTimeout(()=>{g.rotation.z=0},300)}ui('부처님이에요. 서 있는 동자를 찾아요')}};
  ov.onpointerdown=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=hitP&&rc.intersectObject(hitP,false)[0];if(!h)return;const p=pg.worldToLocal(h.point.clone());const c=Math.floor((p.x+WW/2)/WW*nc),rr=Math.floor((HH+.4-p.y)/HH*nr);if(c<0||c>=nc||rr<0||rr>=nr)return;pick(rr*nc+c)};
  const d=document.createElement('div');d.id='jjcP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2420;border:3px solid #d8b048;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4eee0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:220px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d890">🧒 천불전 동자 찾기 ${rd+1}/${NR}</b><div style="font-size:12px;margin:4px 0;line-height:1.5">줄줄이 앉은 부처님 ${nc*nr}분 사이에 서 있는 동자가 딱 하나 있어요. 빨리 찾아 눌러요!</div><div style="font-size:13px;color:#f0d890;min-height:18px">${msg}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#f4eee0;border:1px solid #f4eee0;border-radius:8px;padding:2px 8px;margin-top:4px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const cleanup=()=>{clr();pg.visible=false;ov.remove()};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/res.length);const s2=Q>=80?3:Q>=55?2:Q>0?1:0;try{ctx.done('jikji_child',Q,'천불전 동자 찾기')}catch(e){}window.__JJCQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0d890">다 찾았어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">직지사 비로전 천불상 가운데 하나뿐인 동자를 첫눈에 찾으면 소원이 이뤄진다는 이야기가 전해 와요(전해 오는 이야기). 직접 가서 찾아봐요!</div><div style="font-size:24px;color:#d8b048">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#d8b048;color:#2a2420;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4eee0;border:2px solid #f4eee0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__JJCHILD()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(rd===2)figs.forEach((g,i)=>{g.rotation.y=Math.sin(now/700+i)*.25});
   if(auto&&wait<=0){aT+=dt;if(aT>2.5){aT=-99;pick((odd+1)%(nc*nr));pick(odd)}}
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=NR){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);
  window.__JJCG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},pick,get odd(){return odd},scr:i=>{setPC();const[x,y]=cell(i);const v=new THREE.Vector3(PX+x,y,PZ+.05).project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]}};try{ctx.say('서 있는 동자를 찾아 봐요!',2.4)}catch(e){}};
 spots.push({x:PX,y:0,z:PZ+3.5,r:2.6,t:'동자 찾는 자리',h:'줄줄이 앉은 부처님 사이에서 서 있는 동자 하나를 찾아 봐요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,53],[0,3,MZ+3.5],[0,3,15],[0,3,DZ+7],[BX,3,BZ+6],[-22,3,3],[PX,3,PZ+3]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'옥돌 조각',h:'천불상을 깎던 흰 옥돌 부스러기예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.DodecahedronGeometry(.05),M(0xf2eee2,{roughness:.4})))})},
  {n:'기와 조각',h:'절 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'풍경',h:'처마 끝에서 울리던 작은 종이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.03,.05,.09,10),M(0x5a7a62,{metalness:.5})))})},
  {n:'분청 사발 조각',h:'조선 분청사기 사발 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.1,.07,.05,14,1,false,0,3.2),M(0x9a9480)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(12,52,2.4,'발굴 탐지 자리','절 들머리 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__JJDIG=()=>{window.__DETECT&&window.__DETECT({key:'jikji_dig',title:'직지사 발굴 탐지',emoji:'⛏️',bg:'#2a2420',count:4,TL:150,cand:[[-8,44],[10,42],[-12,20],[14,22],[-8,-14],[10,-12],[34,-8],[-34,10],[34,30],[-4,40]],items:DIG,intro:'직지사 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'직지사 대웅전 앞 두 삼층석탑은 신라 때 탑이에요(보물).'})};
 const meta={quest:{t:'직지사 둘러보기',d:'일주문과 만세루를 지나 동서 삼층석탑과 대웅전, 비로전(천불전)과 사명각을 둘러보세요.',steps:[['일주문','일주문'],['만세루','만세루'],['석탑','동서 삼층석탑'],['대웅전','대웅전'],['비로전','비로전(천불전)'],['사명각','사명각']]},
  title:'김천 직지사',hint:'황악산 직지사를 공개 사진으로 간추려 지었어요(배치·크기 어림). 천불전 부처님 사이에서 서 있는 동자를 찾아 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:56,lines:['김천 직지사','황악산 · 대웅전(보물)','천불전 · 사명대사 출가','간추려 지음']}},
  npc:[['science',[[-6,54],[6,54],[6,60],[-6,60]]]],bounds:[-44,44,-30,64],level:()=>'김천 직지사',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:14,draw(g,X,Z,S){g.fillStyle='#7c9a4a';g.fillRect(0,0,300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:58,yaw:Math.PI},size:{}},meta)}
