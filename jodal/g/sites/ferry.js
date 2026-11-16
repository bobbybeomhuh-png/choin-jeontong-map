/* 전국 지도 나루터 배 길. 갱신 2026-11-15
   큰 강(한강 낙동강 금강 영산강)마다 윗나루 가운데나루 아랫나루 셋. 나루 둔치에 서면 '나룻배 타기' 단추,
   가고 싶은 나루를 고르면 사공 무이가 노를 저어 강줄기를 따라 데려다 준다. 겨울에 강이 얼면 배는 쉰다.
   강 좌표는 worldmap.js 가 모은 RVP(강 이름별 점 목록, 첫 점이 상류) 를 쓴다. */
import * as THREE from 'three';
export function buildFerry(G,{RVP,TOP,landAt,riverAt}){
 const root=new THREE.Group();root.userData.noBatch=true;G.add(root);
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.85},o));
 const wood=M(0x8a5a34,{roughness:.75}),woodD=M(0x5a3a22),woodL=M(0xb88a5a),rope=M(0xd8c49a);
 const box=(w,h,d,m,x,y,z,g)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.position.set(x,y,z);b.castShadow=true;b.receiveShadow=true;g.add(b);return b};
 const cyl=(r1,r2,h,m,x,y,z,g,s=8)=>{const b=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,s),m);b.position.set(x,y,z);b.castShadow=true;g.add(b);return b};
 const H=()=>window.__H3;
 /* 나룻배: 바닥이 평평하고 이물·고물이 들린 배 */
 function makeBoat(){const g=new THREE.Group();
  const sh=new THREE.Shape();sh.moveTo(-1.9,0);sh.quadraticCurveTo(-2.2,.42,-2.35,.55);sh.lineTo(2.35,.55);sh.quadraticCurveTo(2.2,.42,1.9,0);sh.lineTo(-1.9,0);
  /* 옆판 둘 */for(const z of[-.55,.55]){const s=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:.07,bevelEnabled:false}),wood);s.position.z=z-.035;s.castShadow=true;g.add(s)}
  box(3.8,.06,1.1,woodD,0,.04,0,g);/* 이물·고물 막이 */box(.07,.5,1.17,wood,-2.3,.3,0,g);box(.07,.5,1.17,wood,2.3,.3,0,g);
  /* 가로 앉을판 */for(const x of[-1,.6])box(.28,.05,1.1,woodL,x,.36,0,g);
  /* 뱃전 테 */for(const z of[-.58,.58])box(4.7,.06,.1,woodD,0,.56,z,g);
  /* 노 걸이 + 노(사공이 고물에서 젓는 젓는노) */const oar=new THREE.Group();oar.position.set(-2.2,.6,.3);g.add(oar);const sh2=cyl(.035,.035,2.6,woodL,0,0,0,oar,6);sh2.rotation.z=Math.PI/2;sh2.position.x=-1.1;box(.6,.04,.22,woodL,-2.4,0,0,oar);oar.rotation.y=.25;oar.rotation.z=-.35;g.userData.oar=oar;
  g.traverse(o=>{if(o.isMesh)o.userData.noBatch=true});return g}
 /* 강 줄기를 끊김 없는 토막으로 나눔(언덕에서 건너뛴 곳은 끊음) */
 const runs=[];for(const nm of['한강','낙동강','금강','영산강']){const p=RVP[nm];if(!p||p.length<8)continue;let cur=[p[0]];for(let i=1;i<p.length;i++){const d=Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]);if(d>3.2){if(cur.length>8)runs.push({nm,p:cur});cur=[]}cur.push(p[i])}if(cur.length>8)runs.push({nm,p:cur})}
 const lenOf=p=>{const c=[0];for(let i=1;i<p.length;i++)c.push(c[i-1]+Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]));return c};
 const at=(R,s)=>{const p=R.p,c=R.c;s=Math.max(0,Math.min(c[c.length-1],s));let i=1;while(i<c.length-1&&c[i]<s)i++;const u=(s-c[i-1])/((c[i]-c[i-1])||1);const x=p[i-1][0]+(p[i][0]-p[i-1][0])*u,z=p[i-1][1]+(p[i][1]-p[i-1][1])*u;const dx=p[i][0]-p[i-1][0],dz=p[i][1]-p[i-1][1],l=Math.hypot(dx,dz)||1;return{x,z,ux:dx/l,uz:dz/l}};
 const docks=[];const byRiver={};
 for(const R of runs){R.c=lenOf(R.p);const L=R.c[R.c.length-1];if(L<40)continue;const k=(byRiver[R.nm]=byRiver[R.nm]||[]);if(k.length||runs.some(o=>o!==R&&o.nm===R.nm&&o.p.length>R.p.length))continue;/* 강마다 가장 긴 토막 하나 */
  const NM=['윗나루','가운데나루','아랫나루'];[.1,.5,.9].forEach((f,i)=>{const q=at(R,L*f);/* 어느 쪽이 둔치(땅)인지 */let side=0,off=0;for(let o=2.4;o<=10&&!side;o+=.4)for(const sg of[1,-1]){const bx=q.x-q.uz*sg*o,bz=q.z+q.ux*sg*o;if(landAt(bx,bz)&&riverAt(bx,bz)==null){side=sg;off=o;break}}if(!side)return;const Z0=off-3.2;
   const nx=-q.uz*side,nz=q.ux*side;/* 둔치 쪽 단위벡터 */const wy=(riverAt(q.x,q.z)??TOP+.16);
   const g=new THREE.Group();g.position.set(q.x,0,q.z);g.rotation.y=Math.atan2(nx,nz);root.add(g);/* g 의 +z 가 둔치 쪽 */
   /* 나무 나루 다리: 물가에서 강 쪽으로 */for(let j=0;j<7;j++)box(1.2,.08,.42,woodL,0,wy+.28,Z0+.6+j*.46,g);for(const x of[-.55,.55]){box(.08,.08,3.2,woodD,x,wy+.22,Z0+1.95,g);for(const z of[.5,1.7,2.9])cyl(.07,.08,1,woodD,x,wy-.2,Z0+z,g,6)}
   /* 매어 둔 배 */const bt=makeBoat();bt.position.set(-1.4,wy-.12,Z0+.4);bt.rotation.y=Math.PI/2;g.add(bt);const rp=box(.03,.03,1.2,rope,-.7,wy+.35,Z0+.9,g);rp.rotation.y=.5;
   /* 둔치 말뚝 표지 */const c=document.createElement('canvas');c.width=512;c.height=150;const qq=c.getContext('2d');qq.fillStyle='rgba(43,29,18,.9)';qq.beginPath();qq.roundRect(6,6,500,138,26);qq.fill();qq.strokeStyle='#d8a838';qq.lineWidth=6;qq.stroke();qq.fillStyle='#f2d27a';qq.textAlign='center';qq.font='bold 58px "Do Hyeon",sans-serif';qq.fillText(R.nm+' '+NM[i],256,74);qq.fillStyle='#e8dcc0';qq.font='30px "Gowun Dodum",sans-serif';qq.fillText('⛵ 나룻배 타는 곳',256,124);const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,depthWrite:false}));sp.scale.set(3.6,1.05,1);sp.position.set(.9,TOP+3.1,off+1);g.add(sp);cyl(.08,.1,2.6,woodD,.9,TOP+1.3,off+1,g,6);
   const D={nm:R.nm+' '+NM[i],R,s:L*f,x:q.x,z:q.z,bx:q.x+nx*(off+1.2),bz:q.z+nz*(off+1.2),wy,bt,g};docks.push(D);k.push(D)})}
 /* 단추와 행선지 고르기 */
 const btn=document.createElement('button');btn.type='button';btn.textContent='⛵ 나룻배 타기';btn.hidden=true;btn.style.cssText='position:fixed;left:50%;bottom:92px;transform:translateX(-50%);z-index:20;padding:12px 22px;border-radius:999px;border:0;background:#2f7a9a;color:#fff;font:600 17px "Gowun Dodum",sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.3);cursor:pointer';document.body.appendChild(btn);
 const pan=document.createElement('div');pan.hidden=true;pan.style.cssText='position:fixed;left:50%;bottom:150px;transform:translateX(-50%);z-index:21;background:rgba(43,29,18,.94);color:#f3ead6;padding:12px 14px;border-radius:16px;min-width:240px;font:15px "Gowun Dodum",sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.35)';document.body.appendChild(pan);
 let near=null,ride=null,boatman=null,bmLoading=false;
 const frozen=()=>!!(window.__SEASON&&window.__SEASON.get&&window.__SEASON.get()==='winter');
 btn.addEventListener('click',()=>{if(!near||ride)return;if(frozen()){H().say('강이 꽁꽁 얼어 나룻배가 쉬어요. 얼음 위 썰매를 타 보세요!',4);return}
  const others=byRiver[near.R.nm].filter(d=>d!==near);pan.innerHTML=`<div style="font-weight:700;color:#f2d27a;margin-bottom:6px">${near.nm}에서 어디로 갈까요?</div>`+others.map((d,i)=>`<button type="button" data-i="${docks.indexOf(d)}" style="display:block;width:100%;margin-top:6px;padding:10px;border:0;border-radius:10px;background:#f3ead6;color:#2b1d12;font:600 15px 'Gowun Dodum',sans-serif;cursor:pointer">${d.s<near.s?'⬆':'⬇'} ${d.nm} (${Math.round(Math.abs(d.s-near.s))}걸음)</button>`).join('')+`<button type="button" data-x="1" style="display:block;width:100%;margin-top:8px;padding:8px;border:0;border-radius:10px;background:#6a5040;color:#fff;cursor:pointer">안 탈래요</button>`;pan.hidden=false});
 pan.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;pan.hidden=true;if(b.dataset.x)return;start(near,docks[+b.dataset.i])});
 /* 타고 가는 배(매어 둔 배와 따로) */
 const SEAT={on:false,y:0,yaw:0};window.__SEAT=SEAT;const RB=makeBoat();RB.visible=false;root.add(RB);
 const loadBoatman=async()=>{if(boatman||bmLoading)return;bmLoading=true;try{const mm=await H().makeMuui('carpenter',1.1);boatman=mm;try{H().scene.remove(mm.root)}catch(e){}RB.add(mm.root);mm.root.position.set(-1.9,.1,0);mm.root.rotation.y=Math.PI/2;mm.play('push',.2)}catch(e){}bmLoading=false};
 function start(a,b){ride={a,b,s:a.s,dir:Math.sign(b.s-a.s),t:0,said:0};near=null;btn.hidden=true;RB.visible=true;a.bt.visible=false;loadBoatman();H().say(`사공 무이: 꼭 잡아요! ${b.nm}까지 모셔다 드릴게요.`,4);try{H().act('sit_idle',1)}catch(e){}}
 function end(){SEAT.on=false;const b=ride.b,a=ride.a;a.bt.visible=true;RB.visible=false;try{H().tp(b.bx,b.bz,TOP+.05)}catch(e){}ride=null;H().say(`${b.nm}에 닿았어요! 둘레를 걸어 구경해요.`,4)}
 const tick=(P,dt,t)=>{
  if(ride){const r=ride;r.t+=dt;const sp=r.t<1.2?4+r.t*5:10;r.s+=r.dir*sp*dt;const done=r.dir>0?r.s>=r.b.s:r.s<=r.b.s;if(done){end();return}
   const q=at(r.a.R,r.s);const wy=riverAt(q.x,q.z)??r.a.wy;const yaw=Math.atan2(q.ux*r.dir,q.uz*r.dir);RB.position.set(q.x,wy-.12+Math.sin(t*2.2)*.04,q.z);RB.rotation.set(Math.sin(t*1.7)*.03,yaw+Math.PI/2*(-1),0);
   /* 배의 +x 가 앞: rotation.y 를 진행 방향-90° 로 */RB.rotation.y=yaw-Math.PI/2;
   const o=RB.userData.oar;if(o)o.rotation.y=.25+Math.sin(t*2.6)*.45;
   try{const fx=Math.sin(yaw),fz=Math.cos(yaw);H().tp(q.x+fx*.5,q.z+fz*.5,wy);SEAT.on=true;SEAT.y=wy+.28+Math.sin(t*2.2)*.04;SEAT.yaw=yaw}catch(e){}
   if(boatman)try{boatman.mx.update(dt)}catch(e){}
   return}
  near=null;let bd=4.2;for(const d of docks){const k=Math.hypot(P.x-d.bx,P.z-d.bz);if(k<bd){bd=k;near=d}}btn.hidden=!near;if(!near&&!pan.hidden)pan.hidden=true};
 const API={tick,docks,riding:()=>!!ride,start:(i,j)=>start(docks[i],docks[j])};window.__FERRY=API;return API}
