/* 화순 운주사 마당(2026-11-23, 2단계 셋째 묶음): 천불천탑의 골짜기(사적).
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   골짜기 가운데 길을 따라 구층석탑(보물)·석조불감(보물, 등을 맞댄 두 부처)·원형다층석탑(보물, 둥근 호떡 같은 지붕돌), 양쪽 비탈에 작은 탑과 돌부처들, 서쪽 언덕에 칠성바위와 누운 부처(와불).
   도선국사가 하룻밤에 천 개의 탑과 부처를 세우려 했는데, 닭이 울어 와불을 세우지 못했다는 이야기가 전해 옴(전해 오는 이야기).
   놀이: 하룻밤 탑 쌓기(좌우로 흔들리는 탑돌을 꼭 맞을 때 떨어뜨려 쌓기, 어긋난 만큼 깎여 위로 갈수록 좁아짐, 닭이 울기 전에, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildUnju(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(1000);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7a9a48,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 양쪽 언덕(낮은 비탈, 걷지 않는 배경) */for(const s of[-1,1])for(let i=0;i<5;i++){const h=new THREE.Mesh(new THREE.SphereGeometry(18,14,8,0,Math.PI*2,0,Math.PI/2),M(0x5a7a3a));h.scale.set(1,.35,1.4);h.position.set(s*66,0,-60+i*26);G.add(h)}
 const ST=M(0xa8a296),ST2=M(0x948e82);
 const tower=(x,z,n,w,h=.55,round=false)=>{let y=0;const g=new THREE.Group();g.position.set(x,0,z);G.add(g);const base=new THREE.Mesh(new THREE.BoxGeometry(w*1.5,.5,w*1.5),ST2);base.position.y=.25;g.add(base);y=.5;for(let i=0;i<n;i++){const bw=w*(1-i*.05);const body=round?new THREE.Mesh(new THREE.CylinderGeometry(bw/2,bw/2,h,18),ST):new THREE.Mesh(new THREE.BoxGeometry(bw,h,bw),ST);body.position.y=y+h/2;g.add(body);y+=h;const rf=round?new THREE.Mesh(new THREE.CylinderGeometry(bw*.85,bw*.85,.2,22),ST2):new THREE.Mesh(new THREE.BoxGeometry(bw*1.5,.18,bw*1.5),ST2);rf.position.y=y+.1;g.add(rf);y+=.2}solids.push({cx:x,cz:z,r:w*.8,y0:0,y1:y});return y};
 const buddha=(x,z,s=1,ry=0)=>{const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=ry;const b=new THREE.Mesh(new THREE.BoxGeometry(.7*s,1.5*s,.35*s),ST);b.position.y=.75*s;g.add(b);const hd=new THREE.Mesh(new THREE.SphereGeometry(.28*s,10,8),ST);hd.scale.y=1.15;hd.position.y=1.75*s;g.add(hd);G.add(g);solids.push({cx:x,cz:z,r:.4*s,y0:0,y1:2*s})};
 /* 가운데 길 */{const p=new THREE.Mesh(new THREE.PlaneGeometry(5,110),M(0xc8b890));p.rotation.x=-Math.PI/2;p.position.set(0,.02,0);G.add(p)}
 /* 구층석탑, 석조불감, 원형다층석탑 */tower(0,22,9,2.2);sp(0,27,3,'구층석탑','운주사 들머리의 높은 구층석탑이에요(보물). 몸돌에 마름모·꽃무늬를 새긴 것이 독특해요.');
 {const X=0,Z=2;const roofM=new THREE.Mesh(new THREE.ConeGeometry(2.8,1.4,4),ST2);roofM.rotation.y=Math.PI/4;roofM.position.set(X,4.3,Z);G.add(roofM);const box=new THREE.Mesh(new THREE.BoxGeometry(3,2.8,3.4),ST);box.position.set(X,2.2,Z);G.add(box);const base=new THREE.Mesh(new THREE.BoxGeometry(3.6,.8,4),ST2);base.position.set(X,.4,Z);G.add(base);for(const s of[-1,1]){const op=new THREE.Mesh(new THREE.BoxGeometry(1.6,2,.1),M(0x3a3632));op.position.set(X,2.2,Z+s*1.71);G.add(op);const bb=new THREE.Mesh(new THREE.SphereGeometry(.3,10,8),ST);bb.position.set(X,2.4,Z+s*1.5);G.add(bb)}solids.push({x0:X-1.8,x1:X+1.8,y0:0,y1:5,z0:Z-2,z1:Z+2})}
 sp(0,7,3,'석조불감','돌로 만든 작은 집 안에 두 부처가 등을 맞대고 앉아 있어요(보물). 앞뒤 어느 쪽에서도 부처를 볼 수 있어요.');
 tower(0,-14,6,1.6,.5,true);sp(0,-9.5,3,'원형다층석탑','둥근 몸돌과 둥근 지붕돌을 켜켜이 올린 탑이에요(보물). 지붕돌이 호떡 같다고 「호떡탑」이라고도 불러요.');
 /* 양쪽 비탈 작은 탑·돌부처 */for(let i=0;i<10;i++){const s=i%2?1:-1;tower(s*(12+r()*8),-40+i*8,3+((r()*3)|0),1+r()*.6,.45,r()<.25)}for(let i=0;i<14;i++){const s=i%2?1:-1;buddha(s*(9+r()*4),-44+i*6.5,.8+r()*.6,s>0?-Math.PI/2:Math.PI/2)}
 sp(-10,-20,3,'석불군','바위에 기대어 선 돌부처들이 여럿 모여 있어요. 얼굴과 몸이 소박하고 저마다 달라요.');
 /* 칠성바위: 둥근 돌 일곱을 북두칠성 꼴로(크기 다름) */const QX=-30,QZ=-30;const DIP=[[0,0,1.3],[3.2,.8,1.2],[5.6,2.4,1.1],[7.8,3.6,1],[10.8,3,1.2],[11.6,6,1.15],[8.6,6.8,1]];DIP.forEach(([dx,dz,s])=>{const st=new THREE.Mesh(new THREE.CylinderGeometry(s,s*1.05,.5,20),ST);st.position.set(QX+dx,.25,QZ+dz);G.add(st);solids.push({cx:QX+dx,cz:QZ+dz,r:s,y0:0,y1:.5})});
 sp(QX+5,QZ+10,3.4,'칠성바위','둥근 돌 일곱이 북두칠성처럼 놓여 있어요. 돌 크기와 놓인 자리가 실제 별의 밝기·모양과 닮았다는 연구도 있어요.');
 /* 와불: 서쪽 언덕 위 누운 부처 둘(길이 약 12m·10m, 크기 어림) */const WX=-40,WZ=4;for(const[dz,L]of[[0,12],[3.4,10]]){const g=new THREE.Group();g.position.set(WX,.4,WZ+dz);const b=new THREE.Mesh(new THREE.BoxGeometry(L,.9,2.4),ST);g.add(b);const hd=new THREE.Mesh(new THREE.SphereGeometry(1.1,12,10),ST);hd.scale.set(1,.6,1);hd.position.set(-L/2+.6,.4,0);g.add(hd);G.add(g);solids.push({x0:WX-L/2,x1:WX+L/2,y0:0,y1:1.3,z0:WZ+dz-1.2,z1:WZ+dz+1.2})}
 sp(WX,WZ+7,3.4,'와불','언덕 위 바위에 새긴 채 누워 있는 부처 둘이에요. 이 부처가 일어서면 새 세상이 온다는 이야기가 전해 와요(전해 오는 이야기).');
 /* 대웅전(간추림) */{const b=new THREE.Mesh(new THREE.BoxGeometry(10,3,6),M(0xeee6d4));b.position.set(0,2.1,-40);G.add(b);const st=new THREE.Mesh(new THREE.BoxGeometry(11.4,.6,7.4),ST2);st.position.set(0,.3,-40);G.add(st);const rf=new THREE.Mesh(new THREE.ConeGeometry(1,1,4),M(0x4a4a50));rf.rotation.y=Math.PI/4;rf.scale.set(9.5,2.4,6.6);rf.position.set(0,4.8,-40);G.add(rf);solids.push({x0:-5.7,x1:5.7,y0:0,y1:3.6,z0:-43.7,z1:-36.3})}
 sp(0,-34.5,3,'대웅전','골짜기 안쪽의 법당이에요.');
 /* 하룻밤 탑 쌓기(11/23) */const PX=22,PZ=14;spots.push({x:PX,y:0,z:PZ+5,r:3,t:'탑 쌓는 자리',h:'닭이 울기 전에 하룻밤 동안 탑을 쌓아 봐요.'});{const pl=new THREE.Mesh(new THREE.BoxGeometry(5,.3,5),ST2);pl.position.set(PX,.15,PZ);G.add(pl);solids.push({x0:PX-2.5,x1:PX+2.5,y0:0,y1:.3,z0:PZ-2.5,z1:PZ+2.5})}
 const tg=new THREE.Group();tg.position.set(PX,.3,PZ);G.add(tg);
 window.__UJTOWER=()=>{if(document.getElementById('ujP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX,PZ+16,0)}catch(e){}
  let rd=0,N=5,R0=1.3,top={x:0,r:R0,y:0},cur=null,phase='swing',done=false,auto=false,last=performance.now(),tt=0,nPlaced=0,perf=0,fallP=null,sum=0;const res=[];const H=.55,HP=.18;
  const camA=()=>{const k=innerWidth<innerHeight?1.7:1;const yy=Math.max(2.5,top.y+1.5);return[PX,yy+2.4,PZ+9*k,PX,yy,PZ,50]};window.__GCAM=()=>document.getElementById('ujP')?camA():null;
  const sky=new THREE.Mesh(new THREE.SphereGeometry(120,16,10),new THREE.MeshBasicMaterial({color:0x0a1030,side:THREE.BackSide,transparent:true,opacity:.92,depthWrite:false,fog:false}));sky.position.set(PX,0,PZ);G.add(sky);const lamp=new THREE.PointLight(0xffc080,6,30,1.5);lamp.position.set(PX+3,4,PZ+4);G.add(lamp);
  const snd=(f,len=.12,ty='triangle',v=.06)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(v,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const piece=(rr)=>{const g=new THREE.Group();const b=new THREE.Mesh(new THREE.CylinderGeometry(rr,rr,H,24),ST);b.position.y=H/2;g.add(b);const p=new THREE.Mesh(new THREE.CylinderGeometry(rr*1.3,rr*1.3,HP,26),ST2);p.position.y=H+HP/2;g.add(p);return g};
  const clr=()=>{while(tg.children.length)tg.remove(tg.children[0])};
  const DAWN=[60,55,50];const newRound=()=>{clr();N=[5,7,9][rd];top={x:0,r:R0,y:0};const base=piece(R0);tg.add(base);top.y=H+HP;nPlaced=0;perf=0;sum=0;tt=0;spawn();ui()};
  const spawn=()=>{cur={g:piece(top.r),t:0,sp:1.6+nPlaced*.25+rd*.4};cur.g.position.set(-3,top.y+.4,0);tg.add(cur.g);phase='swing'};
  const d=document.createElement('div');d.id='ujP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1a1e30;border:3px solid #c8b890;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f0ecf8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;const left=Math.max(0,DAWN[rd]-tt);d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#e0d8b0">🌙 하룻밤 탑 쌓기 ${rd+1}/3</b><div style="font:16px 'Do Hyeon',sans-serif;margin:4px 0">${nPlaced}/${N}층 · 닭 울기까지 ${Math.ceil(left)}초</div><div style="font-size:12px;opacity:.9">흔들리는 탑돌이 아래 돌과 꼭 겹칠 때 눌러 내려놓아요. 어긋나면 삐져나온 만큼 깎여요.</div><div style="font-size:13px;color:#e0d8b0;min-height:18px">${msg}</div><button data-g style="font:16px 'Do Hyeon',sans-serif;background:#c8b890;color:#1a1e30;border:0;border-radius:10px;padding:7px 18px;margin:4px;cursor:pointer">내려놓기</button><br><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#f0ecf8;border:1px solid #f0ecf8;border-radius:8px;padding:2px 8px;cursor:pointer">그만</button>`;d.querySelector('[data-g]').onclick=()=>drop();d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const drop=()=>{if(done||phase!=='swing'||!cur)return;const x=cur.g.position.x,dx=x-top.x;if(Math.abs(dx)<.06){cur.g.position.x=top.x;perf++;snd(880,.2,'sine');placeOK(top.x,top.r,'꼭 맞았어요!')}else if(Math.abs(dx)>=top.r*1.6){phase='fall';fallP={g:cur.g,v:0};snd(140,.4,'sawtooth');ui('탑돌이 떨어졌어요! 다시');cur=null;setTimeout(()=>{if(!done&&phase==='fall'){phase='swing';spawn();ui()}},900)}else{const nr=Math.max(.15,top.r-Math.abs(dx)/2),nx=top.x+dx/2;tg.remove(cur.g);const g=piece(nr);g.position.set(nx,top.y,0);tg.add(g);cur.g=g;snd(420,.15);placeOK(nx,nr,nr<.35?'많이 좁아졌어요':'')}};
  const placeOK=(nx,nr,msg)=>{cur.g.position.y=top.y;top={x:nx,r:nr,y:top.y+H+HP};nPlaced++;sum+=nr/R0;cur=null;ui(msg);if(nPlaced>=N){phase='wait';const Q=Math.max(30,Math.round(sum/N*100*.85+perf/N*15));res.push(Math.min(100,Q));snd(660,.4,'sine');setTimeout(()=>{rd++;if(rd>=3)fin();else newRound()},1400)}else spawn()};
  const cleanup=()=>{clr();G.remove(sky);G.remove(lamp)};
  const fin=()=>{done=true;const Q=Math.round(res.reduce((a,b)=>a+b,0)/3);const s2=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('unju_tower',Q,'하룻밤 탑 쌓기')}catch(e){}window.__UJQ=Q;cleanup();
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#e0d8b0">탑 셋을 세웠어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">운주사에는 도선국사가 하룻밤에 천불천탑을 세우다 닭이 울어 와불을 세우지 못했다는 이야기가 전해 와요. 지금도 골짜기에 탑과 돌부처 여럿이 남아 있어요(놀이는 간추린 것).</div><div style="font-size:24px;color:#c8b890">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c8b890;color:#1a1e30;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f0ecf8;border:2px solid #f0ecf8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__UJTOWER()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(phase==='swing'||phase==='fall')tt+=dt;sky.material.opacity=.92*Math.max(0,1-tt/DAWN[rd]*.8);
   if(cur&&phase==='swing'){cur.t+=dt*cur.sp;cur.g.position.x=top.x+Math.sin(cur.t)*2.6;if(auto&&Math.abs(cur.g.position.x-top.x)<.05)drop()}
   if(fallP){fallP.v+=9.8*dt;fallP.g.position.y-=fallP.v*dt;if(fallP.g.position.y<-6){tg.remove(fallP.g);fallP=null}}
   if((phase==='swing'||phase==='fall')&&tt>=DAWN[rd]){phase='wait';snd(700,.6,'square',.05);if(cur){tg.remove(cur.g);cur=null}const Q=Math.round(sum/N*100*.85*.8);res.push(Math.max(0,Q));ui('꼬끼오! 닭이 울었어요');setTimeout(()=>{rd++;if(rd>=3)fin();else newRound()},1400)}
   if(((now/500)|0)%2===0&&phase==='swing')ui._t!==(tt|0)&&(ui._t=tt|0,d.querySelector('div')&&(d.querySelector('div').textContent=`${nPlaced}/${N}층 · 닭 울기까지 ${Math.ceil(Math.max(0,DAWN[rd]-tt))}초`));
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);window.__UJG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},drop,get dx(){return cur?cur.g.position.x-top.x:null}};try{ctx.say('닭이 울기 전에 탑을 쌓아 봐요!',2.4)}catch(e){}};
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,25],[0,3,6],[0,3,-10],[QX+5,2.4,QZ+8],[WX,2.4,WZ+6]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'기와 조각',h:'절 건물의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'돌부처 손 조각',h:'작은 돌부처의 떨어진 손 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.06,.1,.04),M(0xa8a296)))})},
  {n:'쇠 정',h:'돌을 쪼던 석수의 쇠 정이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.015,.008,.16,6),M(0x4a4440,{metalness:.6})))})},
  {n:'청자 조각',h:'고려 때 청자 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.1,.07,.05,14,1,false,0,3.4),M(0x8ab0a0)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(6,38,2.4,'발굴 탐지 자리','운주사 골짜기 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__UJDIG=()=>{window.__DETECT&&window.__DETECT({key:'unju_dig',title:'운주사 발굴 탐지',emoji:'⛏️',bg:'#22281e',count:4,TL:150,cand:[[-6,36],[6,30],[-5,14],[6,-4],[-5,-24],[6,-28],[-18,0],[16,-20],[-20,-44],[18,30]],items:ITEMS,intro:'운주사 골짜기 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'운주사 골짜기에는 지금도 여러 탑과 돌부처가 남아 있어요. 발굴에서 고려 때 기와와 청자도 나왔어요.'})};
 const meta={quest:{t:'운주사 천불천탑 골짜기',d:'가운데 길을 따라 탑과 불감을 보고, 서쪽 언덕 칠성바위와 와불까지 가 보세요.',steps:[['구층석탑','구층석탑'],['석조불감','석조불감'],['원형다층석탑','원형다층석탑'],['석불군','석불군'],['칠성바위','칠성바위'],['와불','와불']]},
  title:'화순 운주사',hint:'천불천탑의 운주사 골짜기를 공개 사진으로 간추려 지었어요(배치·크기 어림). 탑 쌓는 자리에서 닭이 울기 전에 탑을 쌓아 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:44,lines:['화순 운주사','천불천탑의 골짜기','와불 · 칠성바위','간추려 지음']}},
  npc:[['science',[[-6,40],[6,40],[6,46],[-6,46]]]],bounds:[-60,40,-56,56],level:()=>'화순 운주사',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2,ox:-10,oz:0,draw(g,X,Z,S){g.fillStyle='#7a9a48';g.fillRect(0,0,300,300);g.fillStyle='#c8b890';g.fillRect(X(-2.5),Z(55),5*S,110*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:48,yaw:Math.PI},size:{}},meta)}
