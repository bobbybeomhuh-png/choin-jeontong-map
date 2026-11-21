/* 춘천 청평사 마당(2026-11-21): 공개 실측 3D(CC BY)가 없어 공개 수치로 간추려 지음.
   청평사: 오봉산 아래 고려 이자현이 가꾼 문수원 터에 선 절. 고려 정원 터(명승), 네모난 연못 영지(오봉산이 비침), 회전문(보물), 극락보전, 구성폭포, 소양호 뱃길.
   상사뱀 전설: 당나라 공주를 사랑한 뱀이 공주 몸을 감았는데, 공주가 청평사 회전문을 지나자 뱀이 돌아갔다는 이야기.
   놀이: 상사뱀 피해 회전문까지(영지를 돌아 회전문으로), 발굴 탐지, 밤 연등·석등. */
import * as THREE from 'three';
import {tex,mulb} from './sungnyemun.js';
import {buildHall} from './hallkit.js';
import {stoneLantern} from './stonekit.js';
export function buildCheongpyeong(opts={}){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(973);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 /* 땅: 남쪽 소양호에서 북쪽 오봉산으로 오르는 골짜기 */
 const LZ=118;const H=(x,z)=>{let h=Math.max(0,(80-z)*.06);if(z<0)h+= -z*.05;h+=Math.max(0,Math.abs(x)-40)*.12;return h};
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#fff';q.fillRect(0,0,w,h);for(let i=0;i<3000;i++){const v=200+(r()*55|0);q.fillStyle=`rgb(${v},${v},${v})`;q.fillRect(r()*w,r()*h,2,2)}},[60,60]);
  const g=new THREE.PlaneGeometry(240,240,120,120);g.rotateX(-Math.PI/2);g.translate(0,0,10);const p=g.attributes.position;const col=[];const c=new THREE.Color();
  for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);p.setY(k,z>LZ?-1.5:H(x,z));const path=Math.abs(x-Math.sin(z*.05)*4)<2.2&&z>18&&z<LZ;const yard=Math.abs(x)<24&&z<8&&z>-24;c.set(path||yard?'#c8b894':'#5f8a3a');col.push(c.r,c.g,c.b)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:GT,vertexColors:true,roughness:1}));m.receiveShadow=true;G.add(m)}
 /* 소양호 */{const w=new THREE.Mesh(new THREE.PlaneGeometry(400,160),M(0x3f6f7a,{roughness:.1,metalness:.2}));w.rotation.x=-Math.PI/2;w.position.set(0,-.4,LZ+80);G.add(w);solids.push({x0:-200,x1:-3,y0:-3,y1:1,z0:LZ+1,z1:LZ+160},{x0:3,x1:200,y0:-3,y1:1,z0:LZ+1,z1:LZ+160});const dk=new THREE.Mesh(new THREE.BoxGeometry(5,.3,10),M(0x7a5a38));dk.position.set(0,.1,LZ+4);G.add(dk);const bt=new THREE.Mesh(new THREE.BoxGeometry(3.2,.9,9),M(0xe8e4d8));bt.position.set(5,.1,LZ+6);G.add(bt);const cab=new THREE.Mesh(new THREE.BoxGeometry(2.6,1.4,3),M(0x3a6a9a));cab.position.set(5,1.2,LZ+5);G.add(cab)}
 /* 오봉산 다섯 봉우리 */{const rm=M(0x5a6a48,{flatShading:true}),rk=M(0x8a8478,{flatShading:true});for(let i=0;i<5;i++){const x=-60+i*30,z=-110-r()*14,h=55+r()*20;const m=new THREE.Mesh(new THREE.ConeGeometry(22,h,7),i%2?rm:rk);m.position.set(x,h/2-4,z);G.add(m)}const bk=new THREE.Mesh(new THREE.SphereGeometry(1,16,8,0,Math.PI*2,0,Math.PI/2),rm);bk.scale.set(140,40,50);bk.position.set(0,0,-130);G.add(bk)}
 /* 구성폭포(서쪽 바위 벼랑) */const FX=-26,FZ=74;{const cl=new THREE.Mesh(new THREE.BoxGeometry(14,11,6),M(0x7a7468,{flatShading:true}));cl.position.set(FX,H(FX,FZ)+5.5,FZ);G.add(cl);const wt=tex(64,256,(q,w,h)=>{q.fillStyle='rgba(220,240,250,.9)';q.fillRect(0,0,w,h);for(let i=0;i<120;i++){q.fillStyle='rgba(160,200,220,.6)';q.fillRect(r()*w,r()*h,2,10+r()*20)}},[1,2]);wt.wrapS=wt.wrapT=THREE.RepeatWrapping;const fall=new THREE.Mesh(new THREE.PlaneGeometry(2.4,9),new THREE.MeshStandardMaterial({map:wt,transparent:true,opacity:.85,roughness:.2}));fall.position.set(FX+3,H(FX,FZ)+5,FZ+3.05);G.add(fall);window.__CPFALL=wt;const pool=new THREE.Mesh(new THREE.CircleGeometry(3.4,24),M(0x4a7a8a,{roughness:.1}));pool.rotation.x=-Math.PI/2;pool.position.set(FX+3,H(FX+3,FZ+5)+.05,FZ+5.5);G.add(pool);solids.push({x0:FX-7,x1:FX+7,y0:0,y1:30,z0:FZ-3,z1:FZ+3},{cx:FX+3,cz:FZ+5.5,r:3,y0:0,y1:2})}
 /* 공주탕(돌 웅덩이) */const KX=8,KZ=52;{const ky=H(KX,KZ);const rim=new THREE.Mesh(new THREE.TorusGeometry(1.6,.35,8,20),M(0x9a948a));rim.rotation.x=Math.PI/2;rim.position.set(KX,ky+.2,KZ);G.add(rim);const w=new THREE.Mesh(new THREE.CircleGeometry(1.5,20),M(0x5a8a9a,{roughness:.1}));w.rotation.x=-Math.PI/2;w.position.set(KX,ky+.15,KZ);G.add(w);solids.push({cx:KX,cz:KZ,r:1.9,y0:0,y1:ky+1})}
 /* 영지: 네모난 연못(오봉산 비침) */const YX=0,YZ=30,YW=16,YD=10;{const y=H(YX,YZ);const w=new THREE.Mesh(new THREE.PlaneGeometry(YW,YD),M(0x3a6a7a,{roughness:.05,metalness:.35}));w.rotation.x=-Math.PI/2;w.position.set(YX,y+.06,YZ);G.add(w);const sm=M(0xa8a294);for(const[l,px,pz,ry]of[[YW+1,0,-YD/2,0],[YW+1,0,YD/2,0],[YD+1,-YW/2,0,Math.PI/2],[YD+1,YW/2,0,Math.PI/2]]){const b=new THREE.Mesh(new THREE.BoxGeometry(l,.4,.5),sm);b.position.set(YX+px,y+.2,YZ+pz);b.rotation.y=ry;G.add(b)}for(let i=0;i<3;i++){const s=new THREE.Mesh(new THREE.DodecahedronGeometry(.6+r()*.4,0),sm);s.position.set(YX-4+i*4,y+.3,YZ+(r()-.5)*3);G.add(s)}solids.push({x0:YX-YW/2-.3,x1:YX+YW/2+.3,y0:0,y1:y+1,z0:YZ-YD/2-.3,z1:YZ+YD/2+.3})}
 /* 회전문(보물) + 극락보전 + 석등 */
 const GX=0,GZ=12;
 if(!mini){const g1=buildHall({x:GX,z:GZ,ry:0,W:10,D:4,nx:3,nz:1,FY:.4,PH:3.2,roof:'gable',name:'迴轉門',pillar:0x8a5a3a,bracket:'ik',front:'open',back:'open',left:'wall',right:'wall',stairs:'none',solids,light:false});g1.group.position.y=H(GX,GZ);G.add(g1.group);g1.group.traverse(e=>{if(e.isMesh)cam.push(e)});
  const g2=buildHall({x:0,z:-14,ry:0,W:12,D:8,nx:3,nz:2,FY:1.2,PH:3.6,roof:'hip',name:'極樂寶殿',pillar:0x9a3a26,bracket:'dapo',front:'door',solids:[],light:false});g2.group.position.y=H(0,-14);G.add(g2.group);g2.group.traverse(e=>{if(e.isMesh)cam.push(e)});solids.push({x0:-6.2,x1:6.2,y0:0,y1:H(0,-14)+6,z0:-18.2,z1:-9.8});
  const g3=buildHall({x:-16,z:-6,ry:Math.PI/2,W:9,D:6,nx:3,nz:2,FY:.8,PH:3.2,roof:'hip',name:'寂滅寶宮',pillar:0x9a3a26,bracket:'ik',front:'door',solids:[],light:false});g3.group.position.y=H(-16,-6);G.add(g3.group);solids.push({x0:-19.2,x1:-12.8,y0:0,y1:H(-16,-6)+6,z0:-10.5,z1:-1.5})}
 {const l=stoneLantern(2.6);l.position.set(0,H(0,-4),-4);G.add(l);solids.push({cx:0,cz:-4,r:.5,y0:0,y1:H(0,-4)+3})}
 /* 길가 나무 */{const tm=M(0x5a4030),lm=M(0x3f6a2c),am=M(0xc8642a);for(let i=0;i<70;i++){const x=(r()<.5?-1:1)*(8+r()*70),z=-30+r()*145;if(Math.abs(x)<26&&z>-26&&z<40)continue;if(Math.hypot(x-FX,z-FZ)<10||Math.hypot(x-KX,z-KZ)<5)continue;const y=H(x,z);const t=new THREE.Mesh(new THREE.CylinderGeometry(.2,.32,4,6),tm);t.position.set(x,y+2,z);G.add(t);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(2.2,1),r()<.3?am:lm);c.position.set(x,y+4.6,z);c.scale.y=.8;c.castShadow=true;G.add(c);solids.push({cx:x,cz:z,r:.4,y0:y,y1:y+7})}}
 /* 밤 */
 const NL=[];if(!mini){const cols=[0xf08aa0,0xf4c040,0x8ac0f0,0x9ad08a];for(let i=0;i<18;i++){const z=110-i*5.4;const x=Math.sin(z*.05)*4+2.6;const lp=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),new THREE.MeshStandardMaterial({color:cols[i%4],emissive:0}));lp.position.set(x,H(x,z)+2.4,z);G.add(lp);NL.push({lp})}for(const[x,z]of[[0,-4],[0,12],[0,30]]){const L=new THREE.PointLight(0xffc080,0,20,1.4);L.position.set(x,H(x,z)+3,z);G.add(L);NL.push({L})}}
 let nk=0;const nightTick=dt=>{const n=!!(window.__WX&&window.__WX.night);nk+=((n?1:0)-nk)*Math.min(1,dt*2);for(const l of NL){if(l.lp)l.lp.material.emissive.setRGB(nk*.9,nk*.7,nk*.5);if(l.L)l.L.intensity=nk*7}if(window.__CPFALL)window.__CPFALL.offset.y-=dt*.8};
 /* 안내 */
 const sp=(x,z,rr,t,h)=>spots.push({x,y:H(x,z),z,r:rr,t,h});
 sp(3,LZ-6,3.4,'청평사 뱃길','소양호를 배로 건너 청평사로 들어가요. 오봉산 아래 고려 때 이자현이 가꾼 문수원 터에 선 절이에요. 간추려 지었어요.');
 sp(FX+6,FZ+8,3,'구성폭포','아홉 가지 소리를 낸다는 폭포예요. 청평사로 오르는 길가에 있어요.');
 sp(KX+3,KZ+3,2.4,'공주탕','상사뱀에게 시달리던 당나라 공주가 몸을 씻었다는 웅덩이예요.');
 sp(YX+10,YZ+6,3,'영지','고려 때 만든 네모난 연못이에요. 물에 오봉산 봉우리가 비치도록 만든 고려 정원의 연못으로 손꼽혀요.');
 sp(GX+6,GZ+4,3,'회전문','보물로 지정된 청평사의 문이에요. 상사뱀이 공주를 따라 이 문 앞까지 왔다가 돌아갔다는 이야기가 전해요. 윤회(돌고 돎)를 깨우치라는 뜻의 이름이라고도 해요.');
 sp(KX-3,KZ+5,1.8,'상사뱀 놀이 자리','상사뱀을 피해 회전문까지 가 봐요.');
 sp(-12,96,2.4,'발굴 탐지 자리','청평사 골짜기 땅속에 고려 절의 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 /* 상사뱀 피해 회전문까지(11/21): 뱀이 천천히 따라와요. 영지를 돌아 회전문 앞 고리에 닿으면 뱀이 돌아가요. 60초 */
 window.__CPSNAKE=()=>{if(document.getElementById('cpP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(KX-3,KZ-1,H(KX,KZ));H3.face(Math.PI)}catch(e){}
  const g=new THREE.Group();G.add(g);const seg=[];const sm=M(0x5a8a4a,{roughness:.5}),sm2=M(0x3a6a3a,{roughness:.5});for(let i=0;i<14;i++){const s=new THREE.Mesh(new THREE.SphereGeometry(.28-i*.012,10,8),i%2?sm:sm2);g.add(s);seg.push(s)}{const ey=new THREE.Mesh(new THREE.SphereGeometry(.07,8,6),M(0x111111));ey.position.set(.12,.12,.2);seg[0].add(ey);const ey2=ey.clone();ey2.position.x=-.12;seg[0].add(ey2)}
  const trail=[];let sx=KX+5,sz=KZ+4;for(let i=0;i<60;i++)trail.push([sx,sz+i*.15]);
  const ring=new THREE.Mesh(new THREE.RingGeometry(1.4,1.8,28),new THREE.MeshBasicMaterial({color:0x8ae08a,transparent:true,opacity:.55,depthWrite:false,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.set(GX,H(GX,GZ+4)+.06,GZ+4);g.add(ring);
  let done=false,t0=performance.now()/1000,last=t0,back=false,caught=0;const TL=60,SPD=2.4;
  const d=document.createElement('div');d.id='cpP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1e2a20;border:3px solid #8ac080;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef6ec;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
  d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#c8f0b8">🐍 상사뱀 피해 회전문까지</b><div id="cpS" style="font:16px 'Do Hyeon',sans-serif;margin:4px 0">회전문까지 가요!</div><div id="cpT" style="font-size:13px">${TL}초</div><div style="font-size:12px;opacity:.85">뱀이 천천히 따라와요. 영지(연못)를 돌아 회전문 앞 초록 고리로</div>`;const Sx=d.querySelector('#cpS'),T=d.querySelector('#cpT');
  const hiss=()=>{try{const AC=ctx.ac();if(!AC)return;const len=.5;const b=AC.createBuffer(1,AC.sampleRate*len,AC.sampleRate),dd=b.getChannelData(0);for(let i=0;i<dd.length;i++)dd[i]=(Math.random()*2-1)*Math.sin(i/dd.length*Math.PI)*.5;const src=AC.createBufferSource();src.buffer=b;const f=AC.createBiquadFilter();f.type='highpass';f.frequency.value=3000;const gg=AC.createGain();gg.gain.value=.08;src.connect(f).connect(gg).connect(ctx.out()||AC.destination);src.start()}catch(e){}};
  const fin=ok=>{if(done)return;done=true;back=ok;const el=performance.now()/1000-t0;const Q=ok?Math.max(70,Math.round(100-Math.max(0,el-20)*1-caught*10)):Math.round(Math.max(0,1-Math.hypot(H3.P.x-GX,H3.P.z-GZ-4)/50)*60);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('cheongpyeong_snake',Q,'청평사 상사뱀 피하기')}catch(e){}window.__CPQ=Q;
   if(ok){try{ctx.say('회전문을 지났어요! 뱀이 돌아가요.',2)}catch(e){}}
   setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#c8f0b8">${ok?'회전문에 닿았어요!':'시간이 다 됐어요'}</b><div style="font-size:13px;margin:4px 0">전설에서 공주가 회전문을 지나 절에 들어가자, 뱀은 문을 넘지 못하고 돌아가 소나기 속에 죽었다고 해요. 공주는 이를 고마워해 절에 탑을 세웠다고 전해요.</div><div style="font-size:26px;color:#8ac080">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#8ac080;color:#102010;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef6ec;border:2px solid #eef6ec;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__CPSNAKE(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},1200)};
  const loop=()=>{if(!d.isConnected){G.remove(g);return}const now=performance.now()/1000,dt=Math.min(.05,now-last);last=now;const P=H3.P;
   let tx=P.x,tz=P.z;if(back){tx=KX+30;tz=KZ+40}const dx=tx-sx,dz=tz-sz,dd=Math.hypot(dx,dz);const spd=back?4:(now-t0<2?0:SPD);if(dd>.5){let nx=sx+dx/dd*spd*dt,nz=sz+dz/dd*spd*dt;if(!back&&nx>YX-YW/2-.8&&nx<YX+YW/2+.8&&nz>YZ-YD/2-.8&&nz<YZ+YD/2+.8){nx=sx+(dx>0?1:-1)*spd*dt*.2+(nx>YX?1:-1)*spd*dt;nz=sz}sx=nx;sz=nz}
   if(Math.hypot(trail[0][0]-sx,trail[0][1]-sz)>.15){trail.unshift([sx,sz]);if(trail.length>80)trail.pop()}seg.forEach((s,i)=>{const p=trail[Math.min(trail.length-1,i*3)];s.position.set(p[0],H(p[0],p[1])+.28+Math.sin(now*8-i*.7)*.04,p[1])});seg[0].lookAt(P.x,seg[0].position.y,P.z);
   if(!done){if(dd<1.2&&now-t0>2){caught++;hiss();try{ctx.say('뱀에게 잡혔어요! 다시 달려요',1.2)}catch(e){}sx=P.x+(Math.random()<.5?-1:1)*6;sz=P.z+6}
    Sx.textContent=caught?`뱀에게 ${caught}번 잡혔어요`:'회전문까지 가요!';if(Math.hypot(P.x-GX,P.z-GZ-4)<1.8)fin(true);const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin(false)}
   ring.material.opacity=.4+Math.sin(now*4)*.15;requestAnimationFrame(loop)};loop();
  window.__CPG={get caught(){return caught},ring:[GX,GZ+4]};hiss();try{ctx.say('상사뱀이 쫓아와요! 회전문까지 가요!',2.2)}catch(e){}};
 /* 발굴 탐지 */
 const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
 const ITEMS=[
  {n:'고려 청자 조각',h:'고려 문수원 시절의 청자 그릇 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.18,14,8,0,2,Math.PI/2,Math.PI/2),M(0x8ab8a0,{roughness:.25,side:THREE.DoubleSide})))})},
  {n:'문수원기 비석 조각',h:'고려 때 문수원의 내력을 새긴 비석의 조각이에요. 글씨가 새겨져 있어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.3,.06,.22),M(0x5a5a5e)))})},
  {n:'연꽃무늬 수막새',h:'처마 끝 기와예요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.05,20),M(0x5a5a58));m.rotation.x=Math.PI/2;g.add(m)})},
  {n:'청동 숟가락',h:'고려 사람들이 쓰던 청동 숟가락이에요.',mk:mk(g=>{const s=new THREE.Mesh(new THREE.BoxGeometry(.32,.015,.03),M(0x6a7a4a,{metalness:.6}));g.add(s)})},
  {n:'해무리굽 그릇',h:'굽 바닥이 해무리처럼 둥근 그릇이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.18,.08,.08,16),M(0x9a9a80,{roughness:.4})))})}];
 window.__CPDIG=()=>{window.__DETECT&&window.__DETECT({key:'cheongpyeong_dig',title:'청평사 발굴 탐지',emoji:'⛏️',bg:'#1e2a20',count:4,TL:150,cand:[[-12,96],[14,90],[-18,60],[20,64],[-8,46],[18,40],[-30,30],[30,20]],items:ITEMS,intro:'청평사 골짜기 땅속에 고려 절의 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'청평사 일대는 고려 문수원과 정원 터라 고려 유물이 많이 나와요.'})};
 const meta={quest:{t:'청평사 둘러보기',d:'소양호 건너 청평사를 둘러보세요.',steps:[['뱃길','청평사 뱃길'],['구성폭포','구성폭포'],['영지','영지'],['회전문','회전문']]},
  title:'춘천 청평사',hint:'소양호 건너 오봉산 아래 청평사를 공개 수치로 간추려 지었어요. 영지에 비친 봉우리를 보고, 상사뱀을 피해 회전문까지 가 봐요.',
  ibl:true,env:{plaza:null,beds:false,trees:false,treeAvoid:()=>true,noHills:true,sign:{x:8,z:LZ-10,lines:['춘천 청평사','회전문(보물) · 영지','고려 정원 터 · 상사뱀 전설','간추려 지음']}},
  npc:[['science',[[-6,LZ-16],[6,LZ-16],[6,LZ-8],[-6,LZ-8]]]],bounds:[-80,80,-40,LZ+6],level:()=>'청평사',camCap:()=>Infinity,baseAt:(x,z)=>H(x,z),
  tick:(P,dt)=>{try{nightTick(dt||.016)}catch(e){}},
  mini:{S:1.1,ox:0,oz:40,draw(g,X,Z,S){g.fillStyle='#5f8a3a';g.fillRect(0,0,300,300);g.fillStyle='#3f6f7a';g.fillRect(0,Z(LZ),300,300);g.fillStyle='#3a6a7a';g.fillRect(X(YX-YW/2),Z(YZ+YD/2),YW*S,YD*S);g.fillStyle='#8a5a3a';g.fillRect(X(-5),Z(GZ+2),10*S,4*S);g.fillStyle='#9a3a26';g.fillRect(X(-6),Z(-10),12*S,8*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:LZ+2,yaw:Math.PI},size:{}},meta)}
