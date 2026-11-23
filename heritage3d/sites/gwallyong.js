/* 창녕 관룡사 마당(2026-11-23, 2단계 여덟째 묶음): 화왕산 관룡사. 입구 돌장승 한 쌍, 대웅전(보물), 약사전(보물)과 삼층석탑,
   산마루 바위 용선대 위 석조여래좌상(보물, 동쪽을 바라봄; 바위가 반야용선을 닮았다 해서 용선대).
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림, 산마루는 낮은 바위 언덕으로 줄임).
   원효대사가 백일기도를 마치던 날 연못에서 아홉 마리 용이 하늘로 오르는 것을 보고 '관룡(용을 봄)'이라 했다는 이야기가 전해 옴(전해 오는 이야기).
   놀이: 아홉 용 승천길 잇기(같은 빛깔 여의주 두 개를 칸을 따라 손으로 이어요. 길끼리 엇갈리거나 겹치면 안 돼요. 넘버링크형, 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {curvedRoof,buildHall} from './hallkit.js';
import {lumpyHill} from './treekit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildGwallyong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(583);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7c984a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 화왕산 바위 봉우리 */for(let i=0;i<12;i++){const k=lumpyHill((5+r()*5)*1.3,(16+r()*14)*.75,0x9a968a,((-66+i*12)*.13+57)|0);k.position.set(-66+i*12,-.5,-90-r()*12);k.rotation.y=r()*3;G.add(k)}
 const ST=M(0xa8a296),ROCK=M(0x8e8a80,{flatShading:true}),WOODB=M(0x8a7458),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50),DAN=M(0x8a3a2a);
 const plaque=(x,y,z,txt,w=2)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd);return bd};
 const hipRoof=(x,z,W,D,y,H)=>{curvedRoof(G,x,(y+H/2-.15)-(H)/2,z,((W+2.4)*.72)/.72,((D+2.4)*.72)/.72,(H)*1.05)};
 const hall=(x,z,W,D,PH,base=.8)=>{/* 11/23 품질: 흰 상자 벽+기둥 → hallkit 법당 */const h=buildHall({x,z,W,D,nx:Math.max(1,Math.round(W/3)),nz:Math.max(1,Math.round(D/3.2)),FY:base,PH:PH,roof:'hip',pillar:0x9a3a26,bracket:(W>=8?'dapo':'ik'),front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',mini,solids,light:false,roofScale:.9});G.add(h.group);return base+PH};
 /* 일주문 */{for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.3,.32,4,12),DAN);c.position.set(s*2,2,48);G.add(c);solids.push({cx:s*2,cz:48,r:.35,y0:0,y1:4})}curvedRoof(G,0,(4.75)-(1.5)/2,48,(4.3)/.72,(2.2)/.72,(1.5)*1.05);plaque(0,3.5,48.9,'寺龍觀山旺火',2.4)}
 sp(0,52,3,'일주문','화왕산 관룡사로 들어가는 문이에요.');
 /* 돌장승 한 쌍 */for(const s of[-1,1]){const g=new THREE.Group();g.position.set(s*3.2,0,40);G.add(g);const bd=new THREE.Mesh(new THREE.CylinderGeometry(.42,.5,2.2,10),ST);bd.position.y=1.1;g.add(bd);const hd=new THREE.Mesh(new THREE.SphereGeometry(.55,12,10),ST);hd.scale.y=1.15;hd.position.y=2.5;g.add(hd);for(const e of[-1,1]){const ey=new THREE.Mesh(new THREE.SphereGeometry(.12,8,6),M(0x6a665e));ey.position.set(e*.2,2.6,.46);g.add(ey)}const ns=new THREE.Mesh(new THREE.SphereGeometry(.14,8,6),ST);ns.position.set(0,2.4,.52);g.add(ns);const mo=new THREE.Mesh(new THREE.BoxGeometry(.3,.05,.05),M(0x6a665e));mo.position.set(0,2.15,.48);g.add(mo);solids.push({cx:s*3.2,cz:40,r:.55,y0:0,y1:3})}
 sp(0,40,2.6,'돌장승','절 입구를 지키는 돌장승 한 쌍이에요. 툭 튀어나온 눈과 주먹코가 익살스러워요.');
 /* 대웅전 */const DZ=0;{const y=hall(0,DZ,12,7,3.8,1.1);plaque(0,y-.5,DZ+3.55,'殿雄大',1.8)}
 sp(0,DZ+7.4,3.2,'대웅전','조선 때 다시 지은 법당이에요(보물). 안에 석가·아미타·약사 세 부처님을 모셨어요.');
 /* 약사전 + 삼층석탑 */{const X=-16,Z=4;const b=new THREE.Mesh(new THREE.BoxGeometry(4.6,.6,4.6),ST);b.position.set(X,.3,Z);G.add(b);const w=new THREE.Mesh(new THREE.BoxGeometry(3.4,2.8,3.4),WALLW);w.position.set(X,2,Z);G.add(w);for(const[sx,sz]of[[-1,-1],[1,-1],[1,1],[-1,1]]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.16,.18,2.8,10),WOODB);c.position.set(X+sx*1.7,2,Z+sz*1.7);G.add(c)}const sh=new THREE.Shape();sh.moveTo(-3,0);sh.lineTo(0,1.6);sh.lineTo(3,0);sh.lineTo(-3,0);const rf=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:5.2,bevelEnabled:false}),ROOF);rf.rotation.y=Math.PI/2;rf.position.set(X-2.6,3.4,Z);G.add(rf);plaque(X,3.05,Z+1.75,'殿師藥',1.1);solids.push({x0:X-2.4,x1:X+2.4,y0:0,y1:3.4,z0:Z-2.4,z1:Z+2.4});
  let y=0;const st=(w2,h)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w2,h,w2),ST);m.position.set(X,y+h/2,Z+6);G.add(m);y+=h};st(1.8,.35);st(1.3,.5);for(let i=0;i<3;i++){st(.7-i*.1,.42-i*.06);st(1.1-i*.15,.14)}solids.push({cx:X,cz:Z+6,r:1,y0:0,y1:y})}
 sp(-16,13.5,2.6,'약사전','지붕이 몸채보다 커 보이는 작은 맞배집이에요(보물). 앞에 작은 삼층석탑이 있어요.');
 /* 용선대(바위 배 위 석조여래좌상, 동쪽 봄) */const YX=22,YZ=-22;{const boat=new THREE.Mesh(new THREE.SphereGeometry(5,16,10,0,Math.PI*2,0,Math.PI/2),ROCK);boat.scale.set(1.6,.6,.8);boat.position.set(YX,0,YZ);G.add(boat);const prow=new THREE.Mesh(new THREE.ConeGeometry(1.6,4,6),ROCK);prow.rotation.z=-Math.PI/2;prow.position.set(YX+8.4,1.2,YZ);G.add(prow);solids.push({x0:YX-8,x1:YX+10,y0:0,y1:3.5,z0:YZ-4,z1:YZ+4});
  const B=new THREE.Group();B.position.set(YX,3,YZ);B.rotation.y=Math.PI/2;G.add(B);const pd=new THREE.Mesh(new THREE.CylinderGeometry(.9,1,.6,8),ST);pd.position.y=.3;B.add(pd);const lo=new THREE.Mesh(new THREE.SphereGeometry(.9,14,10),ST);lo.scale.set(1.1,.55,.8);lo.position.y=.95;B.add(lo);const tr=new THREE.Mesh(new THREE.CylinderGeometry(.42,.6,1.2,10),ST);tr.position.y=1.7;B.add(tr);const hd=new THREE.Mesh(new THREE.SphereGeometry(.32,12,10),ST);hd.position.y=2.55;B.add(hd);const us=new THREE.Mesh(new THREE.SphereGeometry(.17,10,8),ST);us.position.y=2.86;B.add(us)}
 sp(YX-10,YZ+4,3,'용선대 석조여래좌상','반야용선을 닮은 바위 위에서 동쪽을 바라보는 통일신라 부처님이에요(보물). 진짜는 화왕산 산마루 높은 곳에 있어요.');
 /* 아홉 용 연못 이야기 */{const X=14,Z=16;const pd=new THREE.Mesh(new THREE.CircleGeometry(3,24),M(0x3a6a8a,{roughness:.2}));pd.rotation.x=-Math.PI/2;pd.position.set(X,.05,Z);G.add(pd);for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const s=new THREE.Mesh(new THREE.DodecahedronGeometry(.4),ROCK);s.position.set(X+Math.cos(a)*3.2,.15,Z+Math.sin(a)*3.2);G.add(s)}}
 sp(14,20.5,2.6,'아홉 용 연못','원효대사가 백일기도를 마친 날 연못에서 아홉 마리 용이 하늘로 오르는 것을 보았다고 해요. 그래서 "용을 본 절", 관룡사래요(전해 오는 이야기).');
 /* 아홉 용 승천길 잇기(11/23) */const PX=-22,PZ=24;const pg=new THREE.Group();pg.position.set(PX,0,PZ);pg.visible=false;G.add(pg);
 const LV=[["AAAAB","CCCAB","CDDAB","CDEAB","CDEEB"],["AAAAAB","CCCCAB","CDDCAB","CDEFAB","CDEFFB","GGEEFB"],["AAAABBB","CCCABDB","CECABDB","CECADDB","CEEAFFB","CGGGFHB","CIIIIHB"]];
 const COLS=[0xd8443a,0x3a6ad8,0x3aa85a,0xe0b030,0x9a4ac8,0xe07a30,0x3ab8c8,0xd85aa0,0x8a6a3a];
 window.__GRDRAGON=()=>{if(document.getElementById('grdP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX+8,PZ+3,0)}catch(e){}pg.visible=true;
  const BY=.9;let N=5,CS=.7;const camA=()=>{const k=innerWidth<innerHeight?1.8:1;return[PX,5.2*k+1.2,PZ+3.2*k+.5,PX,BY,PZ-.15,50]};window.__GCAM=()=>document.getElementById('sssX')?null:document.getElementById('grdP')?camA():null;
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,100);const rc=new THREE.Raycaster();
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  let rd=0,ends={},sol={},paths={},drawing=null,moves=0,t0=0,done=false,auto=false,last=performance.now(),wait=0,plane=null,pG=null,aQ=[],aT=0;const res=[];const NR=3;
  const snd=(f,len=.1,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const cxz=(rr,c)=>[(c-(N-1)/2)*CS,(rr-(N-1)/2)*CS];const K=(rr,c)=>rr*N+c;
  const clr=()=>{while(pg.children.length)pg.remove(pg.children[0])};
  const solve=g=>{const out={};for(const ch of new Set(g.join(''))){const cells=[];g.forEach((row,rr)=>[...row].forEach((x,c)=>{if(x===ch)cells.push([rr,c])}));const deg=p=>cells.filter(q=>Math.abs(q[0]-p[0])+Math.abs(q[1]-p[1])===1).length;let cur=cells.find(p=>deg(p)===1);const path=[cur];const used=new Set([K(...cur)]);while(true){const nx=cells.find(q=>!used.has(K(...q))&&Math.abs(q[0]-cur[0])+Math.abs(q[1]-cur[1])===1);if(!nx)break;path.push(nx);used.add(K(...nx));cur=nx}out[ch]=path}return out};
  const owner=k=>{for(const ch in paths)if(paths[ch].some(p=>K(...p)===k))return ch;return null};
  const endAt=k=>{for(const ch in ends)if(ends[ch].some(p=>K(...p)===k))return ch;return null};
  const complete=ch=>{const p=paths[ch];if(!p||p.length<2)return false;const a=K(...p[0]),b=K(...p[p.length-1]);const e=ends[ch].map(q=>K(...q));return a!==b&&e.includes(a)&&e.includes(b)};
  const redraw=()=>{if(pG)pg.remove(pG);pG=new THREE.Group();pg.add(pG);for(const ch in paths){const p=paths[ch],col=COLS[ch.charCodeAt(0)-65];const m=M(col,{roughness:.5,emissive:col,emissiveIntensity:complete(ch)?.35:.05});p.forEach((q,i)=>{const[x,z]=cxz(...q);const dot=new THREE.Mesh(new THREE.CylinderGeometry(CS*.18,CS*.18,.05,12),m);dot.position.set(x,BY+.04,z);pG.add(dot);if(i){const[px,pz]=cxz(...p[i-1]);const sg=new THREE.Mesh(new THREE.BoxGeometry(px===x?CS*.3:CS,.05,px===x?CS:CS*.3),m);sg.position.set((x+px)/2,BY+.04,(z+pz)/2);pG.add(sg)}})}};
  const newRound=()=>{clr();pG=null;const g=LV[rd];N=g.length;CS=[.7,.62,.54][rd];sol=solve(g);ends={};paths={};for(const ch in sol){const p=sol[ch];ends[ch]=[p[0],p[p.length-1]]}
   const tb=new THREE.Mesh(new THREE.BoxGeometry(N*CS+.7,.1,N*CS+.7),M(0x5a3a22));tb.position.y=BY-.06;pg.add(tb);for(const s of[-1,1])for(const t of[-1,1]){const lg=new THREE.Mesh(new THREE.BoxGeometry(.12,BY-.1,.12),M(0x4a2a18));lg.position.set(s*(N*CS/2+.25),(BY-.1)/2,t*(N*CS/2+.25));pg.add(lg)}
   for(let rr=0;rr<N;rr++)for(let c=0;c<N;c++){const[x,z]=cxz(rr,c);const t=new THREE.Mesh(new THREE.BoxGeometry(CS*.94,.04,CS*.94),M((rr+c)%2?0xd8ccb0:0xe8dcc0));t.position.set(x,BY,z);pg.add(t)}
   for(const ch in ends)for(const q of ends[ch]){const[x,z]=cxz(...q);const col=COLS[ch.charCodeAt(0)-65];const o=new THREE.Mesh(new THREE.SphereGeometry(CS*.3,14,10),M(col,{roughness:.3,metalness:.2,emissive:col,emissiveIntensity:.2}));o.position.set(x,BY+.2,z);pg.add(o)}
   plane=new THREE.Mesh(new THREE.PlaneGeometry(N*CS,N*CS),new THREE.MeshBasicMaterial({visible:false}));plane.rotation.x=-Math.PI/2;plane.position.y=BY+.05;pg.add(plane);
   moves=0;t0=performance.now();drawing=null;aQ=[];redraw();ui()};
  const cellAt=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=plane&&rc.intersectObject(plane,false)[0];if(!h)return null;const p=pg.worldToLocal(h.point.clone());const c=Math.floor(p.x/CS+N/2),rr=Math.floor(p.z/CS+N/2);if(c<0||rr<0||c>=N||rr>=N)return null;return[rr,c]};
  const down=q=>{if(done||wait>0||!q)return;const k=K(...q);const e=endAt(k);if(e){paths[e]=[q];drawing=e;moves++;snd(500,.05);redraw();return}const o=owner(k);if(o){const p=paths[o];const i=p.findIndex(x=>K(...x)===k);paths[o]=p.slice(0,i+1);drawing=o;redraw()}};
  const move=q=>{if(!drawing||!q||done||wait>0)return;const p=paths[drawing];const lastC=p[p.length-1];if(K(...q)===K(...lastC))return;if(Math.abs(q[0]-lastC[0])+Math.abs(q[1]-lastC[1])!==1)return;if(complete(drawing)&&p.length>1){/* 다 이었으면 되돌리기만 */if(p.length>1&&K(...p[p.length-2])===K(...q)){p.pop();redraw()}return}
   const k=K(...q);if(p.length>1&&K(...p[p.length-2])===k){p.pop();redraw();return}const e=endAt(k);if(e&&e!==drawing)return;const own=p.findIndex(x=>K(...x)===k);if(own>=0){paths[drawing]=p.slice(0,own+1);redraw();return}
   const o=owner(k);if(o&&o!==drawing){const op=paths[o];const i=op.findIndex(x=>K(...x)===k);paths[o]=op.slice(0,i)}p.push(q);snd(420+p.length*12,.03);if(complete(drawing)){snd(820,.2,'sine');drawing=null}redraw();check()};
  const up=()=>{drawing=null};
  const check=()=>{if(Object.keys(ends).every(complete)){const tm=(performance.now()-t0)/1000;const cnt=Object.keys(ends).length;const sc=Math.max(30,Math.round(100-Math.max(0,moves-cnt)*4-Math.max(0,tm-cnt*6)*.5));res.push(sc);wait=1.8;snd(760,.6,'sine');ui(`용 ${cnt}마리가 모두 하늘로 올랐어요! ${sc}점`)}else ui()};
  const ov=document.createElement('div');ov.id='grdO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:crosshair;touch-action:none';document.body.appendChild(ov);
  ov.onpointerdown=e=>{e.preventDefault();try{ov.setPointerCapture(e.pointerId)}catch(_){}down(cellAt(e))};ov.onpointermove=e=>{if(drawing)move(cellAt(e))};ov.onpointerup=ov.onpointercancel=()=>up();
  const d=document.createElement('div');d.id='grdP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#262230;border:3px solid #c89a50;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4f0e6;box-shadow:0 6px 18px rgba(0,0,0,.35);width:230px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;const cnt=Object.keys(ends).length,ok=Object.keys(ends).filter(complete).length;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#f0d090">🐉 아홉 용 승천길 ${rd+1}/${NR}</b><div style="font-size:12px;margin:4px 0;line-height:1.5">같은 빛깔 여의주에서 손을 떼지 말고 칸을 따라 짝 여의주까지 이어요. 길끼리 겹치면 먼저 길이 끊겨요.</div><div style="font-size:13px">이은 용 ${ok}/${cnt}</div><div style="font-size:13px;color:#f0d090;min-height:18px">${msg}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#f4f0e6;border:1px solid #f4f0e6;border-radius:8px;padding:2px 8px;margin-top:4px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const cleanup=()=>{clr();pg.visible=false;ov.remove()};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/res.length);const s2=Q>=80?3:Q>=55?2:Q>0?1:0;try{ctx.done('gwallyong_dragon',Q,'아홉 용 승천길 잇기')}catch(e){}window.__GRDQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#f0d090">아홉 용이 다 올랐어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">원효대사가 아홉 용이 하늘로 오르는 것을 보았다는 관룡사 이야기예요(전해 오는 이야기). 산마루 용선대 부처님도 꼭 올라가 보세요.</div><div style="font-size:24px;color:#c89a50">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#c89a50;color:#fff;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4f0e6;border:2px solid #f4f0e6;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__GRDRAGON()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(auto&&wait<=0){aT-=dt;if(aT<=0){aT=.06;if(!aQ.length)for(const ch in sol)if(!complete(ch)){const p=sol[ch];aQ.push(['d',p[0]]);for(const q of p.slice(1))aQ.push(['m',q]);aQ.push(['u'])}const a=aQ.shift();if(a){if(a[0]==='d')down(a[1]);else if(a[0]==='m')move(a[1]);else up()}}}
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=NR){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);
  window.__GRDG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},down,move,up,sol:()=>sol,scr:q=>{setPC();const[x,z]=cxz(...q);const v=new THREE.Vector3(PX+x,BY+.05,PZ+z).project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]},complete:ch=>complete(ch)};try{ctx.say('같은 빛깔 여의주를 이어 용을 하늘로 보내요!',2.4)}catch(e){}};
 spots.push({x:PX,y:0,z:PZ+3.4,r:2.6,t:'용 승천길 잇는 자리',h:'같은 빛깔 여의주를 이어 아홉 용을 하늘로 보내요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,51],[0,3,40],[0,3,DZ+7],[-16,3,12],[YX-9,3,YZ+4],[14,3,20],[PX,3,PZ+3]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'기와 조각',h:'절 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'용무늬 기와',h:'용이 새겨진 막새 조각이에요. 아홉 용 이야기를 떠올려 봐요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.03,14),M(0x6a6a62)))})},
  {n:'화왕산 억새 씨앗 그릇',h:'작은 토기 그릇 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.07,10,6,0,Math.PI*2,0,Math.PI/2),M(0x8a6a4a)))})},
  {n:'돌 구슬',h:'여의주를 닮은 동그란 돌이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.05,10,8),M(0xc8b890)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(12,44,2.4,'발굴 탐지 자리','절 들머리 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__GRDIG=()=>{window.__DETECT&&window.__DETECT({key:'gwallyong_dig',title:'관룡사 발굴 탐지',emoji:'⛏️',bg:'#262230',count:4,TL:150,cand:[[-8,42],[10,32],[-12,24],[24,24],[-8,-14],[8,-16],[30,2],[-32,-6],[30,36],[-30,40]],items:DIG,intro:'관룡사 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'관룡사 용선대 부처님은 바위 배 위에서 동쪽을 바라봐요(보물).'})};
 const meta={quest:{t:'관룡사 둘러보기',d:'일주문과 돌장승을 지나 대웅전, 약사전과 삼층석탑, 아홉 용 연못, 용선대 부처님을 둘러보세요.',steps:[['일주문','일주문'],['장승','돌장승'],['대웅전','대웅전'],['약사전','약사전'],['연못','아홉 용 연못'],['용선대','용선대 석조여래좌상']]},
  title:'창녕 관룡사',hint:'화왕산 관룡사를 공개 사진으로 간추려 지었어요(배치·크기 어림). 같은 빛깔 여의주를 이어 아홉 용을 하늘로 보내요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:54,lines:['창녕 관룡사','화왕산 · 용선대(보물)','돌장승 · 약사전','간추려 지음']}},
  npc:[['science',[[-6,52],[6,52],[6,58],[-6,58]]]],bounds:[-44,44,-34,62],level:()=>'창녕 관룡사',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:12,draw(g,X,Z,S){g.fillStyle='#7c984a';g.fillRect(0,0,300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:56,yaw:Math.PI},size:{}},meta)}
