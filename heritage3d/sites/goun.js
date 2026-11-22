/* 의성 고운사 마당(2026-11-23, 2단계 여덟째 묶음): 등운산 고운사. 계곡 위에 긴 기둥을 세워 걸친 누각 가운루(보물)가 이름난 절.
   공개 실측 3D(CC BY)가 없어 공개 사진으로 간추려 지음(배치·크기 어림).
   신라 말 최치원(호 고운 孤雲)이 가운루와 우화루를 지었고 절 이름도 그의 호에서 왔다는 이야기가 전해 옴(전해 오는 이야기).
   대웅보전, 약사전 석조여래좌상(보물), 삼층석탑, 연수전(조선 왕실 기로소 원당, 만세문).
   놀이: 징검다리 잇기(징검돌마다 적힌 수만큼 다리를 놓아 모든 돌을 이어요. 두 돌 사이 다리는 둘까지, 다리끼리 엇갈리면 안 돼요. 새 방식), 발굴 탐지, 밤 등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
export function buildGoun(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(681);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const sp=(x,z,rr,t,h)=>spots.push({x,y:0,z,r:rr,t,h});
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);const gr=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.MeshStandardMaterial({map:GT,color:0x7c9a4a,roughness:1}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;G.add(gr)}
 /* 등운산 */for(let i=0;i<9;i++){const h=new THREE.Mesh(new THREE.SphereGeometry(20+r()*10,14,8,0,Math.PI*2,0,Math.PI/2),M(0x4a6a3a,{flatShading:true}));h.scale.y=.6;h.position.set(-80+i*20,0,-94-r()*12);G.add(h)}
 const ST=M(0xa8a296),ROCK=M(0x8e8a80,{flatShading:true}),WOODB=M(0x8a7458),WALLW=M(0xeee6d4),ROOF=M(0x4a4a50),DAN=M(0x8a3a2a);
 const plaque=(x,y,z,txt,w=2)=>{const LT=tex(256,96,(q,ww,h)=>{q.fillStyle='#2a2a30';q.fillRect(0,0,ww,h);q.fillStyle='#e8d890';q.font='bold 52px serif';q.textAlign='center';q.fillText(txt,ww/2,66)});const bd=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.36),new THREE.MeshBasicMaterial({map:LT}));bd.position.set(x,y,z);G.add(bd);return bd};
 const hipRoof=(x,z,W,D,y,H)=>{const rf=new THREE.Mesh(new THREE.ConeGeometry(1,1,4),ROOF);rf.rotation.y=Math.PI/4;rf.scale.set((W+2.4)*.72,H,(D+2.4)*.72);rf.position.set(x,y+H/2-.15,z);G.add(rf)};
 const hall=(x,z,W,D,PH,base=.8)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(W+1.4,base,D+1.4),ST);b.position.set(x,base/2,z);G.add(b);const w=new THREE.Mesh(new THREE.BoxGeometry(W,PH,D),WALLW);w.position.set(x,base+PH/2,z);G.add(w);for(let i=0;i<=3;i++)for(const j of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.2,.24,PH,10),WOODB);c.position.set(x-W/2+i*W/3,base+PH/2,z+j*D/2);G.add(c)}hipRoof(x,z,W,D,base+PH,PH*.75);solids.push({x0:x-W/2-.7,x1:x+W/2+.7,y0:0,y1:base+PH,z0:z-D/2-.7,z1:z+D/2+.7});return base+PH};
 /* 일주문 */{for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.3,.32,4,12),DAN);c.position.set(s*2,2,46);G.add(c);solids.push({cx:s*2,cz:46,r:.35,y0:0,y1:4})}const rf=new THREE.Mesh(new THREE.ConeGeometry(1,1,4),ROOF);rf.rotation.y=Math.PI/4;rf.scale.set(4.3,1.5,2.2);rf.position.set(0,4.75,46);G.add(rf);plaque(0,3.5,46.9,'寺雲孤山雲騰',2.4)}
 sp(0,50,3,'일주문','등운산 고운사로 들어가는 문이에요.');
 /* 계곡(동서로 흐름) + 돌다리 */const VZ=20;{const w=new THREE.Mesh(new THREE.PlaneGeometry(110,5),M(0x4a8ab0,{roughness:.25,metalness:.1}));w.rotation.x=-Math.PI/2;w.position.set(0,.04,VZ);G.add(w);for(let i=0;i<30;i++){const b=new THREE.Mesh(new THREE.DodecahedronGeometry(.4+r()*.6),ROCK);b.position.set(-50+r()*100,.15,VZ+(r()<.5?-1:1)*(2.4+r()*.8));G.add(b)}const br=new THREE.Mesh(new THREE.BoxGeometry(4,.3,6),ST);br.position.set(0,.15,VZ);G.add(br)}
 /* 가운루: 계곡을 남북으로 걸친 누각(긴 기둥) */const GX=-12;{const L=12,W=5,FY=3.4;for(let i=0;i<=4;i++)for(const s of[-1,1]){const z=VZ-L/2+i*L/4;const c=new THREE.Mesh(new THREE.CylinderGeometry(.24,.28,FY,10),WOODB);c.position.set(GX+s*W/2,FY/2,z);G.add(c);solids.push({cx:GX+s*W/2,cz:z,r:.3,y0:0,y1:FY})}const fl=new THREE.Mesh(new THREE.BoxGeometry(W+.6,.3,L+.6),WOODB);fl.position.set(GX,FY+.15,VZ);G.add(fl);for(let i=0;i<=4;i++)for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.18,.2,2.4,10),WOODB);c.position.set(GX+s*W/2,FY+1.5,VZ-L/2+i*L/4);G.add(c)}hipRoof(GX,VZ,W,L,FY+2.7,1.6);const pl=plaque(GX+W/2+.35,FY+2.3,VZ,'樓雲駕',1.6);pl.rotation.y=Math.PI/2}
 sp(GX+5,VZ+5,3,'가운루','계곡 위에 긴 기둥을 세워 걸친 누각이에요(보물). 아래로 물이 흘러요. 최치원이 지었다는 이야기가 전해 와요(전해 오는 이야기).');
 /* 천왕문 */{const Z=32;for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.BoxGeometry(2.4,3,3.4),WALLW);w.position.set(s*2.4,1.5,Z);G.add(w);solids.push({x0:s*2.4-1.3,x1:s*2.4+1.3,y0:0,y1:3,z0:Z-1.8,z1:Z+1.8})}hipRoof(0,Z,7.2,3.4,3,1.5);plaque(0,2.6,Z+1.75,'門王天',1.4)}
 sp(0,36,3,'천왕문','네 사천왕이 지키는 문이에요.');
 /* 대웅보전 + 삼층석탑 */const DZ=-2;{const y=hall(0,DZ,12,7,3.8,1.1);plaque(0,y-.5,DZ+3.55,'殿寶雄大',2)}
 sp(0,DZ+7.4,3.2,'대웅보전','고운사의 큰 법당이에요.');
 {let y=0;const X=14,Z=6;const st=(w,h)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,w),ST);m.position.set(X,y+h/2,Z);G.add(m);y+=h};st(2.4,.4);st(1.8,.7);for(let i=0;i<3;i++){st(.9-i*.12,.55-i*.07);st(1.5-i*.2,.18)}solids.push({cx:X,cz:Z,r:1.3,y0:0,y1:y})}
 sp(14,9.5,2.4,'삼층석탑','신라 양식의 삼층석탑이에요.');
 /* 약사전 석조여래좌상 */{const X=16,Z=-8;const y=hall(X,Z,5,4,2.8,.7);plaque(X,y-.4,Z+2.05,'殿師藥',1.2)}
 sp(16,-3.5,2.4,'약사전 석조여래좌상','통일신라 말 돌로 깎은 여래좌상이에요(보물).');
 /* 연수전 + 만세문 */{const X=-18,Z=-8;const y=hall(X,Z,6,5,3,.9);plaque(X,y-.45,Z+2.55,'殿壽延',1.3);for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.18,.2,3,10),DAN);c.position.set(X+s*1.4,1.5,Z+6);G.add(c);solids.push({cx:X+s*1.4,cz:Z+6,r:.24,y0:0,y1:3})}hipRoof(X,Z+6,2.4,1,3,.9);plaque(X,2.6,Z+6.55,'門歲萬',1)}
 sp(-18,-1.2,2.4,'연수전','조선 영조 때 왕실이 세운 전각이에요. 왕과 원로 신하들의 장수를 비는 곳이라 만세문이 서 있어요.');
 /* 징검다리 잇기(11/23) */const PX=24,PZ=31;const pg=new THREE.Group();pg.position.set(PX,0,PZ);pg.visible=false;G.add(pg);
 const NUMT=[0,1,2,3,4,5,6,7,8].map(n=>tex(128,128,(q,w,h)=>{q.fillStyle='#d8d4c8';q.beginPath();q.arc(64,64,60,0,Math.PI*2);q.fill();q.fillStyle='#2a2622';q.font='bold 80px sans-serif';q.textAlign='center';q.textBaseline='middle';q.fillText(String(n),64,70)},[1,1]));
 window.__GUBRIDGE=()=>{if(document.getElementById('gubP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(PX+7,PZ+3,0)}catch(e){}pg.visible=true;
  const N=7,CS=.62,BY=.9;const camA=()=>{const k=innerWidth<innerHeight?1.8:1;return[PX,5*k+1.2,PZ+3.2*k+.5,PX,BY,PZ-.15,50]};window.__GCAM=()=>document.getElementById('sssX')?null:document.getElementById('gubP')?camA():null;
  const pc=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.05,100);const rc=new THREE.Raycaster();
  const setPC=()=>{const C=camA();pc.aspect=innerWidth/innerHeight;pc.position.set(C[0],C[1],C[2]);pc.lookAt(C[3],C[4],C[5]);pc.updateProjectionMatrix();pc.updateMatrixWorld();G.updateMatrixWorld()};
  let rd=0,isl=[],sol=new Map(),cur=new Map(),sel=-1,taps=0,minT=0,t0=0,done=false,auto=false,last=performance.now(),wait=0,hitM=[],bG=null,aQ=[],aT=0;const res=[];const NR=3;
  const snd=(f,len=.1,ty='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=ty;o.frequency.value=f;gg.gain.setValueAtTime(.06,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
  const key=(a,b)=>a<b?a+','+b:b+','+a;
  const seg=(a,b)=>{const A=isl[a],B=isl[b];return A.r===B.r?{h:true,c:A.r,lo:Math.min(A.c,B.c),hi:Math.max(A.c,B.c)}:{h:false,c:A.c,lo:Math.min(A.r,B.r),hi:Math.max(A.r,B.r)}};
  const cross=(s,t)=>{if(s.h===t.h)return false;const H=s.h?s:t,V=s.h?t:s;return V.c>H.lo&&V.c<H.hi&&H.c>V.lo&&H.c<V.hi};
  const clear=(a,b,m)=>{const A=isl[a],B=isl[b];if(A.r!==B.r&&A.c!==B.c)return false;const s=seg(a,b);for(let i=0;i<isl.length;i++){if(i===a||i===b)continue;const I=isl[i];if(s.h?(I.r===s.c&&I.c>s.lo&&I.c<s.hi):(I.c===s.c&&I.r>s.lo&&I.r<s.hi))return false}for(const[k,v]of m){if(!v)continue;const[x,y]=k.split(',').map(Number);if(x===a||y===a||x===b||y===b)continue;if(cross(s,seg(x,y)))return false}return true};
  const gen=n=>{for(let tries=0;tries<200;tries++){isl=[{r:(r()*N)|0,c:(r()*N)|0}];const m=new Map();const occ=new Set([isl[0].r*N+isl[0].c]);let guard=0;while(isl.length<n&&guard++<400){const a=(r()*isl.length)|0;const[dr,dc]=[[1,0],[-1,0],[0,1],[0,-1]][(r()*4)|0];const dist=2+((r()*3)|0);const nr=isl[a].r+dr*dist,nc=isl[a].c+dc*dist;if(nr<0||nc<0||nr>=N||nc>=N||occ.has(nr*N+nc))continue;let bad=false;for(const o of isl)if(Math.abs(o.r-nr)+Math.abs(o.c-nc)===1){bad=true;break}if(bad)continue;for(const[k]of m){const[x,y]=k.split(',').map(Number);const X=isl[x],Y=isl[y];if(X.r===Y.r&&X.r===nr&&nc>Math.min(X.c,Y.c)&&nc<Math.max(X.c,Y.c))bad=true;if(X.c===Y.c&&X.c===nc&&nr>Math.min(X.r,Y.r)&&nr<Math.max(X.r,Y.r))bad=true}if(bad)continue;isl.push({r:nr,c:nc});const b=isl.length-1;if(!clear(a,b,m)){isl.pop();continue}occ.add(nr*N+nc);m.set(key(a,b),r()<.4?2:1)}if(isl.length<n)continue;
    for(let a=0;a<isl.length;a++)for(let b=a+1;b<isl.length;b++){if(m.has(key(a,b))||r()>.25)continue;const A=isl[a],B=isl[b];if(A.r!==B.r&&A.c!==B.c)continue;if(clear(a,b,m))m.set(key(a,b),1)}
    isl.forEach((I,i)=>{I.n=0;for(const[k,v]of m){const[x,y]=k.split(',').map(Number);if(x===i||y===i)I.n+=v}});if(isl.every(I=>I.n<=8))return m}return new Map()};
  const pos=I=>[(I.c-(N-1)/2)*CS,(I.r-(N-1)/2)*CS];
  const clr=()=>{while(pg.children.length)pg.remove(pg.children[0]);hitM=[]};
  const deg=i=>{let s=0;for(const[k,v]of cur){const[x,y]=k.split(',').map(Number);if(x===i||y===i)s+=v}return s};
  const drawB=()=>{if(bG)pg.remove(bG);bG=new THREE.Group();pg.add(bG);for(const[k,v]of cur){if(!v)continue;const[a,b]=k.split(',').map(Number);const[ax,az]=pos(isl[a]),[bx,bz]=pos(isl[b]);const len=Math.hypot(bx-ax,bz-az)-.5;for(let q=0;q<v;q++){const off=v===2?(q?.08:-.08):0;const pl=new THREE.Mesh(new THREE.BoxGeometry(ax===bx?.07:len,.05,ax===bx?len:.07),M(0x8a6a44));pl.position.set((ax+bx)/2+(ax===bx?off:0),BY+.06,(az+bz)/2+(ax===bx?0:off));bG.add(pl)}}
   hitM.forEach((m,i)=>{const d=deg(i),n=isl[i].n;m.userData.ring.material.color.setHex(i===sel?0xf0c040:d===n?0x5ac878:d>n?0xd84a3a:0x6a665e)})};
  const newRound=()=>{clr();bG=null;sol=gen([6,8,10][rd]);cur=new Map();sel=-1;taps=0;minT=[...sol.values()].reduce((a,b)=>a+b,0);
   const tb=new THREE.Mesh(new THREE.BoxGeometry(N*CS+.8,.1,N*CS+.8),M(0x6a4a2a));tb.position.y=BY-.06;pg.add(tb);const wt=new THREE.Mesh(new THREE.PlaneGeometry(N*CS+.5,N*CS+.5),M(0x4a8ab0,{roughness:.3}));wt.rotation.x=-Math.PI/2;wt.position.y=BY;pg.add(wt);for(const s of[-1,1])for(const t of[-1,1]){const lg=new THREE.Mesh(new THREE.BoxGeometry(.12,BY-.1,.12),M(0x5a3a22));lg.position.set(s*(N*CS/2+.3),(BY-.1)/2,t*(N*CS/2+.3));pg.add(lg)}
   isl.forEach((I,i)=>{const[x,z]=pos(I);const g=new THREE.Group();g.position.set(x,BY,z);pg.add(g);const st=new THREE.Mesh(new THREE.CylinderGeometry(.24,.27,.12,16),M(0xbab4a6));st.position.y=.06;g.add(st);const top=new THREE.Mesh(new THREE.CircleGeometry(.22,18),new THREE.MeshBasicMaterial({map:NUMT[I.n]}));top.rotation.x=-Math.PI/2;top.position.y=.125;g.add(top);const ring=new THREE.Mesh(new THREE.TorusGeometry(.26,.03,6,20),M(0x6a665e));ring.rotation.x=Math.PI/2;ring.position.y=.12;g.add(ring);const hit=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.3,10),new THREE.MeshBasicMaterial({visible:false}));hit.position.y=.1;hit.userData={i,ring};g.add(hit);hitM.push(hit)});
   drawB();t0=performance.now();aQ=[];ui()};
  const connected=()=>{const seen=new Set([0]),q=[0];while(q.length){const a=q.pop();for(const[k,v]of cur){if(!v)continue;const[x,y]=k.split(',').map(Number);const o=x===a?y:y===a?x:-1;if(o>=0&&!seen.has(o)){seen.add(o);q.push(o)}}}return seen.size===isl.length};
  const check=()=>{if(isl.every((I,i)=>deg(i)===I.n)){if(!connected()){ui('수는 맞는데 모든 돌이 하나로 이어지지 않았어요');return}const tm=(performance.now()-t0)/1000;const sc=Math.max(30,Math.round(100-Math.max(0,taps-minT)*3-Math.max(0,tm-isl.length*6)*.4));res.push(sc);wait=1.8;snd(760,.5,'sine');ui(`다 이었어요! ${sc}점`)}};
  const link=(a,b)=>{if(done||wait>0)return'';if(a===b)return'';const A=isl[a],B=isl[b];if(A.r!==B.r&&A.c!==B.c)return'가로나 세로로 줄 선 돌끼리만 이을 수 있어요';const k=key(a,b);const v=cur.get(k)||0;if(!v&&!clear(a,b,cur))return'사이에 돌이 있거나 다른 다리와 엇갈려요';cur.set(k,(v+1)%3);taps++;snd(380+((v+1)%3)*120,.08);drawB();ui();check();return'ok'};
  const tapI=i=>{if(done||wait>0)return;if(sel<0){sel=i;snd(600,.04);drawB();return}const a=sel;sel=-1;const m=link(a,i);drawB();if(m&&m!=='ok')ui(m)};
  const ov=document.createElement('div');ov.id='gubO';ov.style.cssText='position:fixed;inset:0;z-index:55;cursor:pointer';document.body.appendChild(ov);
  ov.onpointerdown=e=>{setPC();rc.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1),pc);const h=rc.intersectObjects(hitM,false)[0];if(h)tapI(h.object.userData.i);else if(sel>=0){sel=-1;drawB()}};
  const d=document.createElement('div');d.id='gubP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1e2a30;border:3px solid #6ab0d0;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef4f8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:232px;user-select:none";document.body.appendChild(d);
  const ui=(msg='')=>{if(done)return;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#b0dcf0">🪵 징검다리 잇기 ${rd+1}/${NR}</b><div style="font-size:12px;margin:4px 0;line-height:1.5">돌 하나를 누르고 같은 줄의 다른 돌을 누르면 다리가 놓여요(한 번 더: 두 줄, 또 한 번: 없앰). 돌에 적힌 수만큼 다리를 놓고 모두 하나로 이어요. 다리끼리 엇갈리면 안 돼요.</div><div style="font-size:12px">초록 고리=수가 맞음, 빨강=넘침</div><div style="font-size:13px;color:#b0dcf0;min-height:18px">${msg}</div><button data-x style="font:12px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f8;border:1px solid #eef4f8;border-radius:8px;padding:2px 8px;margin-top:4px;cursor:pointer">그만</button>`;d.querySelector('[data-x]').onclick=()=>{cleanup();d.remove()}};
  const cleanup=()=>{clr();pg.visible=false;ov.remove()};
  const fin=()=>{done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/res.length);const s2=Q>=80?3:Q>=55?2:Q>0?1:0;try{ctx.done('goun_bridge',Q,'징검다리 잇기')}catch(e){}window.__GUBQ=Q;
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#b0dcf0">계곡을 다 이었어요! ${Q}점</b><div style="font-size:13px;margin:4px 0">고운사 가운루는 계곡 위에 긴 기둥을 세워 걸친 누각이에요. 물 위를 건너는 다리이자 쉼터였지요.</div><div style="font-size:24px;color:#6ab0d0">${'★'.repeat(s2)}${'☆'.repeat(3-s2)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#6ab0d0;color:#fff;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef4f8;border:2px solid #eef4f8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__GUBRIDGE()};d.querySelector('[data-x]').onclick=()=>d.remove()};
  const step=now=>{if(!d.isConnected){cleanup();return}if(done)return;const dt=Math.min(.05,(now-last)/1000);last=now;
   if(auto&&wait<=0){aT-=dt;if(aT<=0){aT=.15;if(!aQ.length)for(const[k,v]of sol){const[a,b]=k.split(',').map(Number);for(let q=0;q<v;q++)aQ.push([a,b])}const nx=aQ.shift();if(nx){tapI(nx[0]);tapI(nx[1])}}}
   if(wait>0){wait-=dt;if(wait<=0){rd++;if(rd>=NR){fin();return}newRound()}}
   requestAnimationFrame(step)};
  newRound();requestAnimationFrame(step);
  window.__GUBG={set auto(v){auto=v},get done(){return done},get res(){return res.slice()},tapI,get n(){return isl.length},scr:i=>{setPC();const v=new THREE.Vector3();hitM[i].getWorldPosition(v);v.project(pc);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]},sol:()=>[...sol.entries()]};try{ctx.say('징검돌의 수만큼 다리를 놓아 봐요!',2.4)}catch(e){}};
 spots.push({x:PX,y:0,z:PZ+3.4,r:2.6,t:'징검다리 잇는 자리',h:'징검돌마다 적힌 수만큼 다리를 놓아 계곡을 이어 봐요.'});
 /* 밤 */const NL=[];if(!mini){for(const[x,y,z]of[[0,3,49],[0,3,35],[GX+4,3,VZ+4],[0,3,DZ+7],[14,3,9],[16,3,-4],[-18,3,-2],[PX,3,PZ+3]]){const Lt=new THREE.PointLight(0xffc080,0,26,1.5);Lt.position.set(x,y,z);G.add(Lt);NL.push(Lt)}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);NL.forEach(Lt=>Lt.intensity=nk*8)};
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const DIG=[
  {n:'기와 조각',h:'절 지붕의 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.14),M(0x5a5a58)))})},
  {n:'붓 자루',h:'글 쓰던 붓 자루예요. 최치원을 떠올려 봐요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,.16,6),M(0x6a4a2a)))})},
  {n:'왕실 기와',h:'연수전 지붕의 용무늬 기와 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.03,14),M(0x6a6a62)))})},
  {n:'계곡 돌구슬',h:'계곡물에 닳아 동그래진 돌이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.05,10,8),M(0x9a968a)))})},
  {n:'엽전',h:'조선 상평통보예요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.01,18),M(0x6a5a30,{metalness:.6})))})}];
 sp(12,42,2.4,'발굴 탐지 자리','절 들머리 흙 속에 옛 흔적이 묻혀 있대요. 무이 탐지기로 찾아 봐요.');
 window.__GUDIG=()=>{window.__DETECT&&window.__DETECT({key:'goun_dig',title:'고운사 발굴 탐지',emoji:'⛏️',bg:'#1e2a30',count:4,TL:150,cand:[[-8,40],[10,38],[-26,30],[8,28],[-6,-18],[8,-20],[30,4],[-32,6],[28,34],[-30,-20]],items:DIG,intro:'고운사 흙 속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'고운사 가운루는 계곡 위에 걸친 누각이에요(보물).'})};
 const meta={quest:{t:'고운사 둘러보기',d:'일주문과 천왕문을 지나 계곡 위 가운루, 대웅보전과 삼층석탑, 약사전과 연수전을 둘러보세요.',steps:[['일주문','일주문'],['천왕문','천왕문'],['가운루','가운루'],['대웅보전','대웅보전'],['석탑','삼층석탑'],['약사전','약사전 석조여래좌상'],['연수전','연수전']]},
  title:'의성 고운사',hint:'등운산 고운사를 공개 사진으로 간추려 지었어요(배치·크기 어림). 징검돌마다 적힌 수만큼 다리를 놓아 계곡을 이어 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:false,sign:{x:-6,z:52,lines:['의성 고운사','등운산 · 가운루(보물)','최치원(고운) 이야기','간추려 지음']}},
  npc:[['science',[[-6,50],[6,50],[6,56],[-6,56]]]],bounds:[-44,44,-34,60],level:()=>'의성 고운사',camCap:()=>Infinity,
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:2.4,ox:0,oz:10,draw(g,X,Z,S){g.fillStyle='#7c9a4a';g.fillRect(0,0,300,300)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:54,yaw:Math.PI},size:{}},meta)}
