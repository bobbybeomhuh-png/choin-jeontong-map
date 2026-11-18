/* 담양 소쇄원 마당(2026-11-19): 조선 선비 양산보가 지은 정원. 가운데로 흐르는 계곡, 계곡 곁 광풍각, 위쪽 단 제월당, 물이 담 밑으로 흘러드는 오곡문 담장, 대숲, 입구 초정 대봉대.
   건물은 공개 3D 한옥(hanokkit.js 출처)과 이 파일이 지은 작은 정자, 배치는 소쇄원을 본떠 작게 지음(실제 거리와 다름).
   새 놀이: 징검다리 건너기(계곡 돌을 밟고 건너편까지, 물에 빠지면 처음부터). */
import * as THREE from 'three';
import {tex,mulb,materials,hipRoof} from './sungnyemun.js';
import {placeHanok,hanokWall} from './hanokkit.js';
import {chogaHut} from './vernacular.js';
export function buildSoswae(opts={}){const mini=!!opts.mini;const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(911);
 const TOUCH=typeof matchMedia!=='undefined'&&matchMedia('(pointer:coarse)').matches;
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.92},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=!TOUCH;b.receiveShadow=true;return b};
 /* 계곡: 북(-z)에서 남(+z)으로 굽이쳐 흐름. 가운데 선 x=SX(z), 폭 2.4 */
 const SX=z=>Math.sin(z*.11)*2.2,SW=1.25,ZE=23,inStream=(x,z)=>Math.abs(x-SX(z))<SW&&z>-30&&z<ZE;
 /* ---------- 땅 ---------- */
 {const GT=tex(256,256,(q,w,h)=>{q.fillStyle='#6f8f45';q.fillRect(0,0,w,h);for(let i=0;i<3400;i++){q.fillStyle=r()<.5?'rgba(80,110,40,.5)':'rgba(140,150,80,.35)';q.fillRect(r()*w,r()*h,2,2)}},[34,34]);const g=new THREE.Mesh(new THREE.PlaneGeometry(260,260,1,1),new THREE.MeshStandardMaterial({map:GT,roughness:1}));g.rotation.x=-Math.PI/2;g.receiveShadow=true;G.add(g)}
 /* 계곡 바닥과 물(땅보다 낮게), 양쪽 바위 기슭 */
 {const pts=[];for(let z=-30;z<=ZE;z+=1)pts.push(z);const mk=(w,y,mat)=>{const geo=new THREE.BufferGeometry(),P=[],I=[];pts.forEach((z,i)=>{const c=SX(z);P.push(c-w,y,z,c+w,y,z);if(i){const k=i*2;I.push(k-2,k,k-1,k-1,k,k+1)}});geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3));geo.setIndex(I);geo.computeVertexNormals();const m=new THREE.Mesh(geo,mat);m.receiveShadow=true;G.add(m);return m};
  /* 땅에 계곡 구멍: 계곡 폭만큼 땅 위를 덮지 않으려 같은 색 둑을 따로 세우는 대신 땅보다 살짝 위에 바닥을 깔고 둑 바위로 가림 */
  mk(SW+.05,.011,M(0x4a5a40));const WT=tex(128,256,(q,w,h)=>{q.fillStyle='#4f8a92';q.fillRect(0,0,w,h);for(let i=0;i<70;i++){q.strokeStyle='rgba(230,245,248,'+(.1+r()*.2)+')';q.lineWidth=1+r();const x=r()*w,y=r()*h;q.beginPath();q.moveTo(x,y);q.quadraticCurveTo(x+4,y+8,x,y+16);q.stroke()}},[1,14]);WT.wrapS=WT.wrapT=THREE.RepeatWrapping;const wm=mk(SW-.1,.06,new THREE.MeshStandardMaterial({map:WT,roughness:.1,metalness:.15,transparent:true,opacity:.88}));G.userData.water=WT;
  const rg=new THREE.DodecahedronGeometry(1,1),rms=[M(0x8a857a),M(0x6f6b62),M(0x9a9488)];for(let z=-30;z<ZE;z+=.9)for(const sd of[-1,1]){const b=new THREE.Mesh(rg,rms[(r()*3)|0]);const s2=.35+r()*.35;b.scale.set(s2*1.2,s2*.6,s2);b.position.set(SX(z)+sd*(SW+.15+r()*.2),.05,z+r()*.4);b.rotation.y=r()*6;b.castShadow=!TOUCH;G.add(b)}}
 /* 계곡 남쪽 끝: 물이 땅속으로 스며드는 돌무더기 */{const rm=M(0x8a857a);for(let i=0;i<7;i++){const b=new THREE.Mesh(new THREE.DodecahedronGeometry(.5+r()*.3,1),rm);b.scale.y=.6;b.position.set(SX(ZE)+(i-3)*.42,.1,ZE+.3+r()*.3);G.add(b)}S(SX(ZE)-1.6,SX(ZE)+1.6,0,.45,ZE,ZE+.8)}
 /* ---------- 징검다리: 계곡을 가로지르는 돌(놀이) ---------- */
 const SZ=6,STONES=[];{const st=M(0xa8a296,{roughness:.85});for(let i=0;i<7;i++){const t=i/6,x=SX(SZ)-SW-.2+(SW*2+.4)*t,z=SZ+Math.sin(i*1.9)*.55;const s=new THREE.Mesh(new THREE.CylinderGeometry(.34,.4,.42,9),st);s.position.set(x,.21,z);s.castShadow=!TOUCH;G.add(s);STONES.push({x,z,m:s})}}
 /* 계곡 위 외나무 다리(남쪽 입구 쪽) */{const bz=19,c=SX(bz);const b=box(SW*2+1.4,.16,.9,M(0x7a5a3a));b.position.set(c,.32,bz);G.add(b);S(c-SW-.7,c+SW+.7,0,.4,bz-.45,bz+.45)}
 /* ---------- 오곡문 담장: 계곡을 가로지르는 담, 밑에 물길 구멍 ---------- */
 {const WZ=-16,c=SX(WZ);const wl=M(0xd8ccb0),cap=M(0x3a3e44),st=M(0x8e887c);for(const[x0,x1]of[[-14,c-SW-.2],[c+SW+.2,14]]){const L=x1-x0;const b=box(L,1.6,.45,wl);b.position.set((x0+x1)/2,.8+.2,WZ);G.add(b);const base=box(L,.4,.55,st);base.position.set((x0+x1)/2,.2,WZ);G.add(base);const k=box(L+.2,.18,.7,cap);k.position.set((x0+x1)/2,1.88,WZ);G.add(k);S(x0,x1,0,2.2,WZ-.3,WZ+.3)}
  /* 물 위로 건너지른 담: 돌 기둥 둘이 받치고 그 아래로 물이 흘러듦 */for(const sx of[-1,1]){const p=box(.5,1.2,.55,st);p.position.set(c+sx*(SW+.05),.6,WZ);G.add(p)}const over=box(SW*2+.6,.9,.45,wl);over.position.set(c,1.55,WZ);G.add(over);const k2=box(SW*2+.8,.18,.7,cap);k2.position.set(c,2.08,WZ);G.add(k2);S(c-SW-.3,c+SW+.3,1.1,2.3,WZ-.3,WZ+.3)}
 /* ---------- 대숲: 서쪽 비탈, 남쪽 입구 길 양옆 ---------- */
 if(!mini){const bm=new THREE.MeshStandardMaterial({color:0x6a8a3a,roughness:.6}),lm=new THREE.MeshStandardMaterial({color:0x4f7a30,roughness:.8,side:THREE.DoubleSide});const N=260;const stem=new THREE.InstancedMesh(new THREE.CylinderGeometry(.045,.06,1,6),bm,N),leaf=new THREE.InstancedMesh(new THREE.PlaneGeometry(.9,.3),lm,N*3);const o=new THREE.Object3D();let k=0,kl=0;
  for(let i=0;i<N;i++){let x,z;if(i<170){x=-26+r()*12;z=-26+r()*52}else{x=(r()<.5?-1:1)*(4.5+r()*5);z=22+r()*10}if(inStream(x,z))continue;const h=6+r()*4;o.position.set(x,h/2,z);o.rotation.set((r()-.5)*.08,0,(r()-.5)*.08);o.scale.set(1,h,1);o.updateMatrix();stem.setMatrixAt(k++,o.matrix);for(let j=0;j<3;j++){o.position.set(x+(r()-.5)*.6,h*(.72+j*.1),z+(r()-.5)*.6);o.rotation.set(r()*.6,r()*6,r()*.6);o.scale.set(1+r(),1,1);o.updateMatrix();leaf.setMatrixAt(kl++,o.matrix)}if(i<170&&i%3===0)solids.push({cx:x,cz:z,r:.12,y0:0,y1:9})}stem.count=k;leaf.count=kl;G.add(stem,leaf);
  G.userData.bamboo=leaf}
 /* ---------- 광풍각: 계곡 동쪽 기슭 작은 정자(사방 트임, 가운데 방 하나) ---------- */
 const KX=SX(-2)+5.2,KZ=-2;{const g=new THREE.Group();g.position.set(KX,0,KZ);G.add(g);const pil=M(0x6a4a30),fl=M(0x8a6a48);const base=box(5.2,.6,4.2,M(0x9a9282));base.position.y=.3;g.add(base);const mar=box(4.8,.12,3.8,fl);mar.position.y=.66;g.add(mar);for(const x of[-2.2,0,2.2])for(const z of[-1.7,1.7]){const p=box(.2,2.4,.2,pil);p.position.set(x,1.9,z);g.add(p)}const room=box(1.8,1.8,1.6,M(0xe8dcc4));room.position.set(0,1.6,0);g.add(room);try{const rf=hipRoof(MT,3.2,2.6,1.6,3.0,4.5,.35,.1,{plain:true,rs:.6});g.add(rf)}catch(e){}
  {const cv=document.createElement('canvas');cv.width=512;cv.height=150;const q=cv.getContext('2d');q.fillStyle='#2a1a10';q.fillRect(0,0,512,150);q.strokeStyle='#d8a838';q.lineWidth=8;q.strokeRect(6,6,500,138);q.fillStyle='#f2d27a';q.textAlign='center';q.font='bold 88px "Noto Serif KR",serif';q.fillText('光風閣',256,108,480);const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;const pl=new THREE.Mesh(new THREE.PlaneGeometry(1.6,.47),new THREE.MeshBasicMaterial({map:t}));pl.position.set(0,2.75,1.82);g.add(pl)}
  S(KX-2.6,KX+2.6,0,.66,KZ-2.1,KZ+2.1);for(const x of[-2.2,0,2.2])for(const z of[-1.7,1.7])solids.push({cx:KX+x,cz:KZ+z,r:.18,y0:.6,y1:4})}
 /* 광풍각 오르는 돌계단 */{const st=M(0x9a9282);for(let i=0;i<2;i++){const s=box(1.6,.3*(i+1),.4,st);s.position.set(KX-3.1+i*.0,.15*(i+1),KZ+(i===0?.35:-.05));}const s1=box(.5,.3,1.4,st);s1.position.set(KX-2.85,.15,KZ);G.add(s1);S(KX-3.1,KX-2.6,0,.3,KZ-.7,KZ+.7)}
 /* ---------- 제월당: 동쪽 높은 단(석축 위) 집 ---------- */
 {const JX=14,JZ=-10;/* 석축: 막돌을 쌓은 결 + 위는 풀과 마당 흙 */const STX=tex(256,128,(q,w,h)=>{q.fillStyle='#7a746a';q.fillRect(0,0,w,h);for(let y=0;y<h;y+=18)for(let x=-(y%36?20:0);x<w;x+=34+((x*y)%11)){const v=120+r()*45|0;q.fillStyle=`rgb(${v},${v-4|0},${v-12|0})`;q.beginPath();q.ellipse(x+16,y+9,15+r()*3,7.5,0,0,7);q.fill();q.strokeStyle='rgba(40,36,30,.55)';q.lineWidth=1.5;q.stroke()}},[5,1]);const ter=box(16,1.0,9,new THREE.MeshStandardMaterial({map:STX,roughness:1}));ter.position.set(JX,.5,JZ);G.add(ter);const tg=new THREE.Mesh(new THREE.PlaneGeometry(15.6,8.6),M(0x7a9a4e,{roughness:1}));tg.rotation.x=-Math.PI/2;tg.position.set(JX,1.012,JZ);tg.receiveShadow=true;G.add(tg);S(JX-8,JX+8,0,1.0,JZ-4.5,JZ+4.5);const g=placeHanok(G,null,'sarang',JX,JZ-1,Math.PI/2*0,{y:1.0,TOUCH,solid:false});S(JX-6,JX+6,1,9,JZ-4,JZ+1.5);
  /* 석축 오르는 계단 */const st=M(0xa8a296);for(let i=0;i<3;i++){const s=box(2.2,.34*(i+1),.4,st);s.position.set(JX-9+i*.0,.17*(i+1),JZ+3.2);}for(let i=0;i<3;i++){const s=box(.42,.34*(i+1),2.2,st);s.position.set(JX-8-(2-i)*.42-.21,.17*(i+1),JZ+3);G.add(s);S(JX-8-(3-i)*.42,JX-8-(2-i)*.42,0,.34*(i+1),JZ+1.9,JZ+4.1)}}
 /* ---------- 대봉대: 입구의 작은 초정(봉황을 기다리는 정자) ---------- */
 {const DX=7,DZ=16;const h=chogaHut(2.6,2.6,1.4);h.position.set(DX,0,DZ);G.add(h);solids.push({cx:DX,cz:DZ,r:1.6,y0:0,y1:3})}
 /* ---------- 애양단 담: 입구 길 서쪽 ---------- */
 if(!mini)try{hanokWall(G,solids,-12,4,-12,14,{TOUCH})}catch(e){}
 /* ---------- 징검다리 놀이 ---------- */
 window.__SWSTONE=()=>{if(document.getElementById('swP'))return;const H=window.__H3,ctx=H.ctx();const A=STONES[0],Z=STONES[STONES.length-1];const startX=A.x-1.1,endX=Z.x+1.0;try{H.tp(startX,A.z,0);H.face(Math.PI/2)}catch(e){}
  const d=document.createElement('div');d.id='swP';d.style.cssText='position:fixed;right:16px;top:calc(env(safe-area-inset-top) + 70px);z-index:30;background:#f3ead6;border:4px solid #d8a838;border-radius:16px;padding:10px 14px;color:#2b1d12;width:220px;font:15px/1.5 "Gowun Dodum",sans-serif;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,.4)';document.body.append(d);
  const TL=25;let t0=performance.now()/1000,fall=0,done=false,lastStone=-1;try{H.say('징검다리 돌만 밟고 계곡 건너편까지! 물에 빠지면 처음부터예요.')}catch(e){}
  const loop=()=>{if(!d.isConnected)return;const P=H.P,now=performance.now()/1000,left=Math.max(0,TL-(now-t0));let on=-1;STONES.forEach((s,i)=>{if(Math.hypot(P.x-s.x,P.z-s.z)<.5)on=i});if(on>=0){lastStone=Math.max(lastStone,on);STONES[on].m.position.y=.21-.04*Math.abs(Math.sin(now*8))}
   if(!done&&inStream(P.x,P.z)&&P.y<.1&&on<0){fall++;try{H.tp(startX,A.z,0);H.face(Math.PI/2)}catch(e){}lastStone=-1;try{ctx.say('풍덩! 다시 첫 돌부터!')}catch(e){}}
   d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#2f6b3a">🪨 징검다리 건너기</b><div style="font-size:24px;font-family:'Do Hyeon',sans-serif">${Math.max(0,lastStone+1)} / ${STONES.length}</div><div style="height:8px;background:#e0d4bc;border-radius:4px;overflow:hidden"><div style="height:100%;width:${left/TL*100}%;background:#2f6b3a"></div></div><div style="font-size:13px;color:#6a5a44">남은 시간 ${left.toFixed(0)}초 · 풍덩 ${fall}번</div>`;
   if(!done&&(P.x>endX&&lastStone>=STONES.length-1||left<=0)){done=true;const ok=P.x>endX;const Q=ok?Math.max(40,Math.round(100-fall*15-Math.max(0,(TL-left)-8)*2)):Math.round((lastStone+1)/STONES.length*50);const st=Q>=90?3:Q>=70?2:Q>0?1:0;try{ctx.done('soswae_stones',Q,'징검다리')}catch(e){}try{ctx.say(ok?(st>=3?'사뿐사뿐! 선비처럼 건넜어요.':'건넜어요! 다음엔 더 가볍게.'):'시간이 다 됐어요. 한 번 더!')}catch(e){}window.__SWQ=Q;
    d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#2f6b3a">${ok?'건넜어요!':'아쉬워요'}</b><div style="font-size:26px;color:#d8a838">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><div>풍덩 ${fall}번</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#2f6b3a;color:#fff;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:#fff;border:2px solid #8a6a3a;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">닫기</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__SWSTONE()};d.querySelector('[data-x]').onclick=()=>d.remove();return}
   requestAnimationFrame(loop)};loop();window.__SWST=STONES};
 const tick=(P,dt)=>{G.userData.water&&(G.userData.water.offset.y-=dt*.25)};
 /* ---------- 볼거리 ---------- */
 spots.push({x:2,y:0,z:26.5,r:2.6,t:'대숲 오솔길',h:'소쇄원 들머리는 대나무 숲길이에요. 바람이 불면 댓잎이 사르락사르락 소리를 내요. 소쇄(瀟灑)는 맑고 깨끗하다는 뜻이에요.'});
 spots.push({x:DX0(),y:0,z:18.6,r:2.4,t:'대봉대',h:'봉황을 기다리는 정자라는 뜻의 작은 초정이에요. 손님을 맞이하던 자리예요.'});
 spots.push({x:SX(SZ)-SW-1.6,y:0,z:SZ,r:2.4,t:'징검다리',h:'계곡을 건너는 돌다리예요. 돌만 밟고 건너편까지 가 보세요. 징검다리 건너기를 누르면 시작해요.'});
 spots.push({x:KX-4,y:0,z:KZ,r:2.6,t:'광풍각',h:'비 갠 뒤 부는 맑은 바람이라는 뜻의 정자예요. 계곡 바로 곁이라 물소리를 들으며 손님과 이야기를 나눴어요.'});
 spots.push({x:SX(-16)+3.2,y:0,z:-13.6,r:2.6,t:'오곡문 담장',h:'계곡물이 담장 밑으로 흘러들게 담을 쌓았어요. 자연을 막지 않고 그대로 들인 소쇄원의 마음이 담긴 자리예요.'});
 spots.push({x:5.5,y:0,z:-6.8,r:2.6,t:'제월당',h:'비 갠 뒤의 밝은 달이라는 뜻의 집이에요. 높은 단 위에 있어 정원 전체가 내려다보여요. 주인이 머물며 책을 읽던 곳이에요.'});
 function DX0(){return 7}
 const meta={quest:{t:'소쇄원 거닐기',d:'맑고 깨끗한 정원 소쇄원의 여섯 곳을 찾아보세요.',steps:[['대숲 오솔길','대숲 오솔길'],['대봉대','대봉대'],['징검다리','징검다리'],['광풍각','광풍각'],['오곡문 담장','오곡문 담장'],['제월당','제월당']]},
  title:'담양 소쇄원',hint:'조선 선비가 계곡을 그대로 들여 지은 정원이에요. 대숲 길을 지나 징검다리를 건너고, 광풍각과 제월당에 올라 보세요.',
  env:{plaza:null,beds:false,trees:true,treeAvoid:(x,z)=>Math.abs(x)<30&&Math.abs(z)<34,sign:{x:-6,z:31.5,lines:['담양 소쇄원','조선 선비의 정원','광풍각 · 제월당 · 오곡문','징검다리 건너기']}},
  baseAt:(x,z)=>inStream(x,z)&&!(Math.abs(z-19)<.5)?-.42:0,tick,
  npc:[['painter',[[6,-2],[9,-2],[9,6],[6,6]]]],level:P=>P.y>.8&&P.x>6?'제월당':P.z>20?'대숲 들머리':'소쇄원',camCap:()=>Infinity,
  mini:{S:4,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#6f8f45';g.fillRect(0,0,300,300);g.strokeStyle='#4f8a92';g.lineWidth=SW*2*S;g.beginPath();for(let z=-30;z<=28;z+=2){const x=SX(z);z===-30?g.moveTo(X(x),Z(z)):g.lineTo(X(x),Z(z))}g.stroke();g.fillStyle='#4f7a30';g.fillRect(X(-26),Z(-26),12*S,52*S);g.fillStyle='#8a6a48';g.fillRect(X(KX-2.6),Z(KZ-2.1),5.2*S,4.2*S);g.fillStyle='#4a4a4a';g.fillRect(X(6),Z(-14.5),16*S,9*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:2,z:30,yaw:Math.PI},size:{}},meta)}
