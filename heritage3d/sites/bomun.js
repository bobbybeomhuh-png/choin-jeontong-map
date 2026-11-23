/* 강화 보문사 마당(2026-11-23, 2단계 여덟째 묶음): 석모도 낙가산 보문사. 서해를 내려다보는 관음 도량.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림, 산비탈은 평지로 줄임).
   눈썹바위 아래 마애석불좌상(1928, 관음), 바위굴 석실(나한 석상), 극락보전, 큰 맷돌, 향나무(천연기념물).
   신라 때 한 어부의 그물에 사람 모양 돌 스물두 개가 걸려 올라와, 꿈의 계시대로 석굴에 모셨다는 이야기가 전해 옴(전해 오는 이야기).
   놀이: 돌부처 굴려 모시기(판을 기울여 돌을 굴려 석굴 감실까지 보내요. 구멍에 빠지면 처음 자리로, 새 방식·기울이기 미로), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {curvedRoof,buildHall} from './hallkit.js';
import {tex,mulb} from './sungnyemun.js';
export function buildBomun(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(635);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7a984a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 서해(서쪽) */const SX=-34;{const w=new THREE.Mesh(new THREE.PlaneGeometry(90,220),M(0x4a7aa8,{roughness:.2,metalness:.1}));w.rotation.x=-Math.PI/2;w.position.set(SX-45,.04,0);G.add(w);for(let i=0;i<5;i++){const isl=new THREE.Mesh(new THREE.SphereGeometry(4+r()*5,12,8,0,Math.PI*2,0,Math.PI/2),M(0x5a7a48,{flatShading:true}));isl.scale.y=.5;isl.position.set(SX-30-r()*40,0,-60+i*30);G.add(isl)}}
 /* 낙가산 */for(let i=0;i<7;i++){const h=new THREE.Mesh(new THREE.SphereGeometry(20+r()*8,14,8,0,Math.PI*2,0,Math.PI/2),M(0x4a6a3a,{flatShading:true}));h.scale.y=.7;h.position.set(-40+i*16,0,-70-r()*10);G.add(h)}
 const ST=M(0xa8a296),ROCK=M(0x8a867c,{flatShading:true}),WOODB=M(0x8a7458),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50),DAN=M(0x8a3a2a);
 const plaque=(x,y,z,txt,w=2)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd)};
 const hall=(x,z,W,D,PH,base=.8)=>{/* 11/23 품질: 흰 상자 벽+기둥 → hallkit 법당 */const h=buildHall({x,z,W,D,nx:Math.max(1,Math.round(W/3)),nz:Math.max(1,Math.round(D/3.2)),FY:base,PH:PH,roof:'hip',pillar:0x9a3a26,bracket:(W>=8?'dapo':'ik'),front:'door',back:'wall',left:'wall',right:'wall',stairs:'front',mini,solids,light:false,roofScale:.9});G.add(h.group);return base+PH};
 /* 일주문 */{for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.3,.32,4,12),DAN);c.position.set(s*2,2,46);G.add(c);solids.push({cx:s*2,cz:46,r:.35,y0:0,y1:4})}curvedRoof(G,0,(4.75)-(1.5)/2,46,(4.3)/.72,(2.2)/.72,(1.5)*1.05);plaque(0,3.5,46.9,'寺門普山伽洛',2.4)}
 sp(0,50,3,'일주문','낙가산 보문사로 들어가는 문이에요. 낙가산은 관음보살이 사는 산(보타락가)에서 따온 이름이에요.');
 /* 극락보전 */const KZ=-2;{const y=hall(0,KZ,11,7,3.6,1);plaque(0,y-.5,KZ+3.55,'殿寶樂極',2)}
 sp(0,KZ+7.4,3.2,'극락보전','보문사의 큰 법당이에요.');
 /* 석실(바위굴) */const CX=-16,CZ=-8;{const mound=new THREE.Mesh(new THREE.SphereGeometry(6,16,10,0,Math.PI*2,0,Math.PI/2),ROCK);mound.scale.set(1.2,.75,1);mound.position.set(CX,0,CZ-2);G.add(mound);solids.push({cx:CX,cz:CZ-2,r:6.4,y0:0,y1:4.5});const hole=new THREE.Mesh(new THREE.PlaneGeometry(3.2,2.6),M(0x1a1612));hole.position.set(CX,1.3,CZ+3.95);G.add(hole);for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.BoxGeometry(.5,2.8,.5),ST);c.position.set(CX+s*1.8,1.4,CZ+4);G.add(c)}const lt=new THREE.Mesh(new THREE.BoxGeometry(4.2,.4,.6),ST);lt.position.set(CX,2.9,CZ+4);G.add(lt);plaque(CX,3.4,CZ+4.35,'室石',1.1)}
 sp(CX,CZ+7,2.8,'석실','바위굴 안에 나한 석상들을 모신 석실이에요. 어부의 그물에 걸려 올라온 돌 스물두 개를 꿈의 계시대로 이곳에 모셨다는 이야기가 전해 와요(전해 오는 이야기).');
 /* 눈썹바위와 마애불 */const NX=14,NZ=-26;{const cliff=new THREE.Mesh(new THREE.BoxGeometry(14,10,4),ROCK);cliff.position.set(NX,5,NZ-2);G.add(cliff);const brow=new THREE.Mesh(new THREE.BoxGeometry(10,1,3.4),ROCK);brow.position.set(NX,9.6,NZ+.8);brow.rotation.x=-.12;G.add(brow);solids.push({x0:NX-7,x1:NX+7,y0:0,y1:10,z0:NZ-4,z1:NZ+.2});
  const BT=tex(256,384,(q,w,h)=>{q.fillStyle='#8a867c';q.fillRect(0,0,w,h);q.strokeStyle='#5a564e';q.lineWidth=6;q.beginPath();q.ellipse(w/2,h*.33,w*.36,h*.3,0,0,Math.PI*2);q.stroke();q.beginPath();q.ellipse(w/2,h*.22,28,36,0,0,Math.PI*2);q.stroke();q.beginPath();q.moveTo(w/2-24,h*.18);q.lineTo(w/2+24,h*.18);q.stroke();q.beginPath();q.moveTo(w*.22,h*.9);q.quadraticCurveTo(w*.2,h*.4,w/2,h*.32);q.quadraticCurveTo(w*.8,h*.4,w*.78,h*.9);q.stroke();q.beginPath();q.ellipse(w/2,h*.88,w*.36,16,0,0,Math.PI*2);q.stroke();q.beginPath();q.arc(w/2,h*.6,22,0,Math.PI*2);q.stroke()});const bud=new THREE.Mesh(new THREE.PlaneGeometry(3.4,5.1),new THREE.MeshStandardMaterial({map:BT,roughness:1}));bud.position.set(NX,4.4,NZ+.02);G.add(bud)}
 sp(NX,NZ+4,3,'눈썹바위 마애불','눈썹처럼 튀어나온 바위 아래 새긴 관음보살 좌상이에요(1928). 서해 낙조가 아름다운 자리예요.');
 /* 향나무 */{const X=10,Z=8;const tr=new THREE.Group();tr.position.set(X,0,Z);G.add(tr);let p=new THREE.Vector3();for(let i=0;i<6;i++){const seg=new THREE.Mesh(new THREE.CylinderGeometry(.3-i*.03,.36-i*.03,1.3,8),M(0x6a4a32));const a=i*.7;seg.position.set(Math.sin(a)*.5*i*.3,.65+i*1.1,Math.cos(a)*.4*i*.3);seg.rotation.z=Math.sin(a)*.35;tr.add(seg)}for(let i=0;i<7;i++){const f=new THREE.Mesh(new THREE.DodecahedronGeometry(1.3+r()*.6),M(0x2f5a32,{flatShading:true}));f.position.set((r()-.5)*4,5+r()*2.4,(r()-.5)*4);f.scale.y=.6;tr.add(f)}solids.push({cx:X,cz:Z,r:.6,y0:0,y1:5})}
 sp(10,12,2.4,'향나무','수백 년 묵은 향나무예요(천연기념물). 용이 꿈틀대며 오르는 듯 굽은 줄기가 멋져요.');
 /* 큰 맷돌 */{const X=-8,Z=12;for(let i=0;i<2;i++){const m=new THREE.Mesh(new THREE.CylinderGeometry(1.3,1.3,.45,20),ST);m.position.set(X,.22+i*.47,Z);G.add(m)}const hd=new THREE.Mesh(new THREE.BoxGeometry(.2,.2,1),WOODB);hd.position.set(X+1.1,.8,Z);G.add(hd);solids.push({cx:X,cz:Z,r:1.4,y0:0,y1:1})}
 sp(-8,15.5,2.4,'큰 맷돌','스님들이 많을 때 콩을 갈던 아주 큰 맷돌이에요.');
 /* 돌부처 굴려 모시기(11/23) */const PX=-16,PZ=14;const pg=new THREE.Group();pg.position.set(PX,0,PZ);pg.visible=false;G.add(pg);
 const MAPS=[["S..#...",".#.#.#.",".#...#.",".####..","...O.#.",".#.#.#.",".#...#G"],["S.#....",".##.##.","...O...","##.###.","...#O..",".#.#...",".O...#G"],["S...#..","##.O#.#","...#...",".#...#.",".#O#.#.",".#..O#.","...#..G"]];
 window.__BMTILT=()=>{if(document.getElementById('bmtP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX+7,PZ+4,0)}catch(e){}pg.visible=true;
  const N=7,CS=.7,HB=N*CS/2,BR=.22,BY=.9;
  const camA=()=>{const k=innerWidth<innerHeight?1.8:1;return[PX,5.4*k+1,PZ+3.4*k+.6,PX,BY,PZ-.2,50]};window.__GCAM=()=>document.getElementById('sssX')?null:document.getElementById('bmtP')?camA():null;
  let rd=0,grid=[],walls=[],traps=[],goal=null,start=null,bx=0,bz=0,vx=0,vz=0,tx=0,tz=0,inX=0,inZ=0,fails=0,t0=0,done=false,auto=false,last=performance.now(),wait=0,board=null,ball=null,stuck=0;const res=[];const NR=3;
  const snd=(f,len=.1,ty='triangle',v=.06)=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(v,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const cc=(rr,c)=>[(c-(N-1)/2)*CS,(rr-(N-1)/2)*CS];
  const clr=()=>{while(pg.children.length)pg.remove(pg.children[0])};
  const newRound=()=>{clr();grid=MAPS[rd].map(s=>s.split(''));walls=[];traps=[];
   const tb=new THREE.Mesh(new THREE.BoxGeometry(HB*2+1.2,.1,HB*2+1.2),M(0x6a4a2a));tb.position.y=BY-.5;pg.add(tb);for(const s of[-1,1])for(const t of[-1,1]){const lg=new THREE.Mesh(new THREE.BoxGeometry(.14,BY-.5,.14),M(0x5a3a22));lg.position.set(s*(HB+.4),(BY-.5)/2,t*(HB+.4));pg.add(lg)}
   board=new THREE.Group();board.position.y=BY;pg.add(board);const base=new THREE.Mesh(new THREE.BoxGeometry(HB*2+.3,.12,HB*2+.3),M(0xb8a888));base.position.y=-.06;board.add(base);
   for(const[w,h,x,z]of[[HB*2+.3,.15,0,-HB-.08],[HB*2+.3,.15,0,HB+.08],[.15,HB*2+.3,-HB-.08,0],[.15,HB*2+.3,HB+.08,0]]){const e=new THREE.Mesh(new THREE.BoxGeometry(w,.3,h),M(0x7a6a50));e.position.set(x,.15,z);board.add(e)}
   for(let rr=0;rr<N;rr++)for(let c=0;c<N;c++){const ch=grid[rr][c],[x,z]=cc(rr,c);if(ch==='#'){const b=new THREE.Mesh(new THREE.BoxGeometry(CS,.34,CS),ROCK);b.position.set(x,.17,z);board.add(b);walls.push([x-CS/2,x+CS/2,z-CS/2,z+CS/2])}else if(ch==='O'){const h=new THREE.Mesh(new THREE.CircleGeometry(.27,18),M(0x0a0806));h.rotation.x=-Math.PI/2;h.position.set(x,.005,z);board.add(h);traps.push([x,z])}else if(ch==='G'){const g=new THREE.Group();g.position.set(x,0,z);board.add(g);const ni=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.02,18),M(0xe8c860,{emissive:0x604810}));ni.position.y=.01;g.add(ni);const ar=new THREE.Mesh(new THREE.TorusGeometry(.3,.05,8,16,Math.PI),ST);ar.position.y=.02;ar.rotation.y=0;g.add(ar);goal=[x,z]}else if(ch==='S'){start=[x,z]}}
   ball=new THREE.Group();const bs=new THREE.Mesh(new THREE.SphereGeometry(BR,16,12),M(0x9a968a,{roughness:.7}));ball.add(bs);const hd=new THREE.Mesh(new THREE.SphereGeometry(BR*.5,10,8),M(0x9a968a));hd.position.y=BR*.9;ball.add(hd);board.add(ball);
   [bx,bz]=start;vx=vz=0;fails=0;t0=performance.now();stuck=0;ui()};
  const hold=(x,z)=>{inX=x;inZ=z};
  const d=document.createElement('div');d.id='bmtP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#22282e;border:3px solid #8ab0c8;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef2f6;box-shadow:0 6px 18px rgba(0,0,0,.35);width:230px;user-select:none";document.body.appendChild(d);
  const B=(k,t)=>`<button data-t="${k}" style="font:20px 'Do Hyeon',sans-serif;background:#8ab0c8;color:#fff;border:0;border-radius:10px;width:52px;height:44px;margin:2px;cursor:pointer;touch-action:none">${t}</button>`;
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#c0dcf0">🪨 돌부처 굴려 모시기 ${rd+1}/${NR}</b><div style="font-size:12px;margin:4px 0;line-height:1.5">화살표를 누르고 있으면 판이 그쪽으로 기울어요. 돌을 굴려 금빛 감실까지 보내요. 검은 구멍에 빠지면 처음부터!</div><div style="font-size:12px">빠진 횟수 ${fails}</div><div style="font-size:13px;color:#c0dcf0;min-height:18px">${msg}</div><div>${B('u','⬆')}</div><div>${B('l','⬅')}${B('d','⬇')}${B('r','➡')}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#eef2f6;border:1px solid #eef2f6;border-radius:8px;padding:2px 8px;margin-top:4px;cursor:pointer">그만</button>`;
   const V={u:[0,-1],d:[0,1],l:[-1,0],r:[1,0]};d.querySelectorAll('[data-t]').forEach(b=>{b.onpointerdown=e=>{e.preventDefault();hold(...V[b.dataset.t])};b.onpointerup=b.onpointerleave=b.onpointercancel=e=>{e.preventDefault();hold(0,0)}});d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const cleanup=()=>{clr();pg.visible=false};
  const cellOf=(x,z)=>[Math.max(0,Math.min(N-1,Math.round(z/CS+(N-1)/2))),Math.max(0,Math.min(N-1,Math.round(x/CS+(N-1)/2)))];
  const nextCell=()=>{const[sr,sc]=cellOf(bx,bz);const key=(a,b)=>a*N+b;const prev=new Map([[key(sr,sc),-1]]);const q=[[sr,sc]];while(q.length){const[a,b]=q.shift();if(grid[a][b]==='G'){let k=key(a,b),p=prev.get(k);while(p!==key(sr,sc)&&p!==-1){k=p;p=prev.get(k)}return[(k/N)|0,k%N]}for(const[da,db]of[[1,0],[-1,0],[0,1],[0,-1]]){const na=a+da,nb=b+db;if(na<0||nb<0||na>=N||nb>=N)continue;const ch=grid[na][nb];if(ch==='#'||ch==='O'||prev.has(key(na,nb)))continue;prev.set(key(na,nb),key(a,b));q.push([na,nb])}}return[sr,sc]};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/res.length);const s2=Q>=80?3:Q>=55?2:Q>0?1:0;try{ctx.done('bomun_tilt',Q,'돌부처 굴려 모시기')}catch(e){}window.__BMTQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#c0dcf0">돌부처를 다 모셨어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">보문사 석실에는 어부의 그물에 걸려 올라온 돌을 모셨다는 이야기가 전해 와요(전해 오는 이야기). 눈썹바위 마애불에서 보는 서해 노을도 꼭 보세요.</div><div style="font-size:24px;color:#8ab0c8">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#8ab0c8;color:#fff;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef2f6;border:2px solid #eef2f6;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__BMTILT()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.033,(now-last)/1000);last=now;
   if(auto&&wait<=0){const[nr,nc]=nextCell();const[gx,gz]=cc(nr,nc);let ax=(gx-bx)*4-vx*1.6,az=(gz-bz)*4-vz*1.6;const m=Math.max(1,Math.hypot(ax,az));inX=ax/m;inZ=az/m;stuck+=dt;const[cr,ccc]=cellOf(bx,bz);if(stuck>5){[bx,bz]=cc(nr,nc);vx=vz=0;stuck=0}if(cr===nr&&ccc===nc)stuck=0}
   tx+=(inX-tx)*Math.min(1,dt*8);tz+=(inZ-tz)*Math.min(1,dt*8);if(board){board.rotation.z=-tx*.14;board.rotation.x=tz*.14}
   if(wait<=0&&board){const A=6;vx+=tx*A*dt;vz+=tz*A*dt;vx*=Math.pow(.35,dt);vz*=Math.pow(.35,dt);const sp2=Math.hypot(vx,vz);if(sp2>3.2){vx*=3.2/sp2;vz*=3.2/sp2}
    const sub=3;for(let s=0;s<sub;s++){bx+=vx*dt/sub;bz+=vz*dt/sub;
     const lim=HB-BR;if(bx<-lim){bx=-lim;vx=-vx*.3}if(bx>lim){bx=lim;vx=-vx*.3}if(bz<-lim){bz=-lim;vz=-vz*.3}if(bz>lim){bz=lim;vz=-vz*.3}
     for(const[x0,x1,z0,z1]of walls){const px=Math.max(x0,Math.min(bx,x1)),pz=Math.max(z0,Math.min(bz,z1));const dx=bx-px,dz=bz-pz,dd=Math.hypot(dx,dz);if(dd<BR&&dd>1e-6){const nx=dx/dd,nz=dz/dd;bx=px+nx*BR;bz=pz+nz*BR;const vn=vx*nx+vz*nz;if(vn<0){vx-=1.3*vn*nx;vz-=1.3*vn*nz}}else if(dd<=1e-6){bx-= vx*dt/sub;bz-=vz*dt/sub;vx=vz=0}}}
    for(const[x,z]of traps)if(Math.hypot(bx-x,bz-z)<.22){fails++;snd(160,.3,'sawtooth');[bx,bz]=start;vx=vz=0;ui('구멍에 빠졌어요! 처음부터');break}
    if(goal&&Math.hypot(bx-goal[0],bz-goal[1])<.26){const tm=(performance.now()-t0)/1000;const sc=Math.max(25,Math.round(100-fails*15-Math.max(0,tm-15)*1.2));res.push(sc);wait=1.8;snd(760,.5,'sine');[bx,bz]=goal;vx=vz=0;ui(`석굴 감실에 모셨어요! ${sc}점`)}
    ball.position.set(bx,BR,bz);ball.rotation.x+=vz*dt/BR;ball.rotation.z-=vx*dt/BR}
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=NR){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);
  window.__BMTG={set auto(v){auto=v;if(!v)hold(0,0)},get done(){return done},get res(){return res.slice()},hold,get pos(){return[bx,bz]},get fails(){return fails}};try{ctx.say('판을 기울여 돌을 굴려 봐요!',2.4)}catch(e){}};
 spots.push({x:PX,y:0,z:PZ+3.6,r:2.6,t:'돌 굴리는 자리',h:'판을 기울여 돌부처를 석굴 감실까지 굴려 보내요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,49],[0,3,KZ+7],[CX,3,CZ+6],[NX,3,NZ+4],[10,3,12],[-8,3,15],[PX,3,PZ+3]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'기와 조각',h:'절 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'그물추',h:'어부들이 그물에 달던 돌 추예요. 그물에 걸린 돌 이야기를 떠올려 봐요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,.09,10),M(0x7a766c)))})},
  {n:'조개껍데기',h:'바닷가 절이라 흙 속에 조개껍데기도 나와요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.06,10,6,0,Math.PI*2,0,Math.PI/2),M(0xe8dcc8)))})},
  {n:'향나무 조각',h:'향이 나는 향나무 가지예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.02,.025,.16,6),M(0x6a4a32)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(12,42,2.4,'발굴 탐지 자리','절 들머리 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__BMDIG=()=>{window.__DETECT&&window.__DETECT({key:'bomun_dig',title:'보문사 발굴 탐지',emoji:'⛏️',bg:'#22282e',count:4,TL:150,cand:[[-8,40],[10,36],[-26,24],[16,24],[-4,-16],[24,-10],[28,10],[-28,30],[26,34],[-4,26]],items:DIG,intro:'보문사 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'보문사 눈썹바위 마애불은 서해를 내려다보는 관음보살이에요.'})};
 const meta={quest:{t:'보문사 둘러보기',d:'일주문을 지나 극락보전과 석실, 향나무와 큰 맷돌, 눈썹바위 마애불을 둘러보세요.',steps:[['일주문','일주문'],['극락보전','극락보전'],['석실','석실'],['향나무','향나무'],['맷돌','큰 맷돌'],['마애불','눈썹바위 마애불']]},
  title:'강화 보문사',hint:'석모도 보문사를 공개 사진으로 간추려 지었어요(배치·크기 어림, 산비탈은 평지로). 판을 기울여 돌부처를 석굴 감실까지 굴려 보내요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:52,lines:['강화 보문사','석모도 낙가산 · 서해','눈썹바위 마애불 · 석실','간추려 지음']}},
  npc:[['science',[[-6,50],[6,50],[6,56],[-6,56]]]],bounds:[SX+2,40,-32,60],level:()=>'강화 보문사',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:10,draw(g,X,Z,S){g.fillStyle='#7a984a';g.fillRect(0,0,300,300);g.fillStyle='#4a7aa8';g.fillRect(0,0,150+SX*S,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:54,yaw:Math.PI},size:{}},meta)}
