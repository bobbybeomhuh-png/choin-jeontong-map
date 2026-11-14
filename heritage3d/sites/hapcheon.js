/* 합천 해인사 장경판전. 단위 1 = 1m, 입구 +z.
   갱신 2026-11-12. 공개된 실측 3D가 없어 공개 수치로 본떠 지음: 수다라장·법보전 각 정면 15칸(약 60m), 측면 2칸(약 9m), 맞배지붕,
   앞뒤 벽 위아래 크기가 다른 살창, 5단 판가, 경판 한 장 약 70 x 24 x 3cm(81,258장). 경판 수는 판가를 다 채우지 않고 보이는 만큼만 꽂음. */
import * as THREE from 'three';
import {stonePagoda,stoneLantern} from './stonekit.js';
import {tex,noise,mulb,materials,hipRoof} from './sungnyemun.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
const MU=(d,k)=>new URL('../models/'+d+'/'+k+'.glb',import.meta.url).href;
export function buildHapcheon(opts={}){const mini=!!opts.mini;const MT=materials();const G=new THREE.Group();const solids=[],cam=[],spots=[];const r=mulb(37);
 const S=(x0,x1,y0,y1,z0,z1)=>solids.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),y0,y1,z0:Math.min(z0,z1),z1:Math.max(z0,z1)});
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 const box=(w,h,d,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.castShadow=b.receiveShadow=true;return b};
 /* ---------- 마당: 산사 흙마당과 돌계단 ---------- */
 {const PT=tex(256,256,(q,w,h)=>{q.fillStyle='#c4b08a';q.fillRect(0,0,w,h);noise(q,w,h,6000,['rgba(0,0,0,.07)','rgba(255,255,255,.08)'],2)});PT.wrapS=PT.wrapT=THREE.RepeatWrapping;PT.repeat.set(12,8);const yd=new THREE.Mesh(new THREE.PlaneGeometry(76,52),new THREE.MeshStandardMaterial({map:PT,roughness:1}));yd.rotation.x=-Math.PI/2;yd.position.set(0,.02,-8);yd.receiveShadow=true;G.add(yd)}
 /* 살창 텍스처: 나무 살 사이가 뚫림(alphaTest) */
 const LAT=tex(128,128,(q,w,h)=>{q.clearRect(0,0,w,h);q.fillStyle='#5a3e26';for(let x=0;x<w;x+=16)q.fillRect(x,0,7,h);q.fillRect(0,0,w,8);q.fillRect(0,h-8,w,8)});
 const latM=new THREE.MeshStandardMaterial({map:LAT,transparent:true,alphaTest:.5,side:THREE.DoubleSide,roughness:.9});
 const wallM=M(0xefe8d6),pil=M(0x7a5634),stn=M(0xb3aa98);
 const blockM=M(0x5a4030,{roughness:.8}),blockM2=M(0x6a4c36,{roughness:.8});
 /* 판전 한 동: 가운데 x=0, 앞면 +z. front=true 면 앞벽 아래 살창이 크고 위가 작음(뒤는 반대) */
 const L=60,D=8.8,PH=4.4,FY=.5;
 function hall(cz,name){const g=new THREE.Group();G.add(g);
  const base=box(L+1.6,FY,D+1.6,stn);base.position.set(0,FY/2,cz);g.add(base);S(-L/2-.8,L/2+.8,0,FY,cz-D/2-.8,cz+D/2+.8);
  const fl=new THREE.Mesh(new THREE.PlaneGeometry(L,D),M(0x8a6a4a));fl.rotation.x=-Math.PI/2;fl.position.set(0,FY+.01,cz);g.add(fl);
  /* 기둥: 15칸 */for(let i=0;i<=15;i++){const x=-L/2+i*L/15;for(const z of[-D/2,D/2]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.2,.23,PH,10),pil);c.position.set(x,FY+PH/2,cz+z);c.castShadow=true;g.add(c)}}
  /* 앞뒤 벽: 칸마다 위아래 살창. 가운데 칸은 문 */for(const side of[1,-1]){const zw=cz+side*D/2;const big=side>0;/* 앞: 아래 큼, 뒤: 위 큼 */
   for(let i=0;i<15;i++){const x0=-L/2+i*L/15,cx=x0+L/30,bw=L/15-.5;if(side>0&&i===7){/* 문 칸 */const lt=box(bw,.6,.16,wallM);lt.position.set(cx,FY+PH-.3,zw);g.add(lt);continue}
    const lo=big?1.5:.6,hi=big?.6:1.5;/* 살창 높이 */const loY=FY+.5,hiY=FY+PH-.4-hi;
    const w1=box(bw,.5,.16,wallM);w1.position.set(cx,FY+.25,zw);g.add(w1);
    const l1=new THREE.Mesh(new THREE.PlaneGeometry(bw*(big?.8:.5),lo),latM);l1.position.set(cx,loY+lo/2,zw);g.add(l1);const wl=box(bw*(big?.2:.5),lo,.16,wallM);wl.position.set(cx+bw*(big?.4:.25),loY+lo/2,zw);g.add(wl);
    const mid=box(bw,hiY-(loY+lo),.16,wallM);mid.position.set(cx,(hiY+loY+lo)/2,zw);g.add(mid);
    const l2=new THREE.Mesh(new THREE.PlaneGeometry(bw*(big?.5:.8),hi),latM);l2.position.set(cx,hiY+hi/2,zw);g.add(l2);const wh=box(bw*(big?.5:.2),hi,.16,wallM);wh.position.set(cx+bw*(big?.25:.4),hiY+hi/2,zw);g.add(wh);
    const top=box(bw,FY+PH-(hiY+hi),.16,wallM);top.position.set(cx,(FY+PH+hiY+hi)/2,zw);g.add(top)}
   if(side>0){S(-L/2,-1.7,0,9,zw-.15,zw+.15);S(1.7,L/2,0,9,zw-.15,zw+.15)}else S(-L/2,L/2,0,9,zw-.15,zw+.15)}
  for(const sx of[-1,1]){const sw=box(.16,PH,D,wallM);sw.position.set(sx*L/2,FY+PH/2,cz);g.add(sw);S(sx*L/2-.15,sx*L/2+.15,0,9,cz-D/2,cz+D/2)}
  /* 맞배지붕(용마루가 끝까지 가는 hipRoof) */if(!mini){const rf=hipRoof(MT,L/2+1.6,D/2+1.8,L/2+1.6,FY+PH+.1,FY+PH+3.4,.35,.15,{plain:true,rs:.6});rf.position.set(0,0,cz);rf.traverse(o=>{if(o.isMesh)o.castShadow=true});g.add(rf);
   for(const sx of[-1,1]){const gs=new THREE.Shape();gs.moveTo(-D/2-1.6,0);gs.lineTo(D/2+1.6,0);gs.lineTo(0,3.3);gs.closePath();const ge=new THREE.Mesh(new THREE.ShapeGeometry(gs),M(0x6b4a2e,{side:THREE.DoubleSide}));ge.rotation.y=Math.PI/2;ge.position.set(sx*(L/2+1.5),FY+PH+.1,cz);g.add(ge)}}
  /* 판가 두 줄, 5단(앞줄은 문 앞 가운데를 비워 통로) */const segs=zr=>zr>0?[[-L/2+1.5,-2.2],[2.2,L/2-1.5]]:[[-L/2+1.5,L/2-1.5]];
  for(const zr of[-2.2,2.2]){const z=cz+zr;for(const [a,b] of segs(zr)){const len=b-a,mx=(a+b)/2;for(let k=0;k<6;k++){const sh=box(len,.06,.82,M(0x6b4a2e));sh.position.set(mx,FY+.25+k*.78,z);g.add(sh)}const np=Math.max(2,Math.round(len/2.8));for(let i=0;i<=np;i++){const p=box(.1,4.2,.1,M(0x5a3a22));p.position.set(a+i*len/np,FY+2.1,z+.38);g.add(p);const p2=p.clone();p2.position.z=z-.38;g.add(p2)}S(a-.1,b+.1,0,9,z-.45,z+.45)}}
  /* 경판(InstancedMesh): 단마다 세워 꽂음 */if(!mini){let tot=0;for(const zr of[-2.2,2.2])for(const [a,b] of segs(zr))tot+=Math.floor((b-a-.3)/.052)*5;const im=new THREE.InstancedMesh(new THREE.BoxGeometry(.032,.66,.7),blockM,tot);const m4=new THREE.Matrix4();let n=0;const col=new THREE.Color();
   for(const zr of[-2.2,2.2])for(const [a,b] of segs(zr)){const n0=Math.floor((b-a-.3)/.052);for(let k=0;k<5;k++)for(let i=0;i<n0;i++){m4.makeTranslation(a+.2+i*.052,FY+.25+k*.78+.36,cz+zr);im.setMatrixAt(n,m4);col.setHSL(.07,.35,.2+r()*.12);im.setColorAt(n,col);n++}}
   im.count=n;g.add(im)}
  /* 현판 */{const cv=document.createElement('canvas');cv.width=640;cv.height=170;const q=cv.getContext('2d');q.fillStyle='#2a1a10';q.fillRect(0,0,640,170);q.strokeStyle='#d8a838';q.lineWidth=10;q.strokeRect(6,6,628,158);q.fillStyle='#f2d27a';q.textAlign='center';q.font='bold 92px "Noto Serif KR",serif';q.fillText(name,320,118,600);const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;const pl=new THREE.Mesh(new THREE.PlaneGeometry(2.6,.7),new THREE.MeshBasicMaterial({map:t}));pl.position.set(0,FY+PH-.35,cz+D/2+.2);g.add(pl)}
  const lp=new THREE.PointLight(0xfff0d8,8,30,1.4);lp.position.set(0,FY+PH-.6,cz);g.add(lp);return g}
 const Z1=-4,Z2=-24;hall(Z1,'修多羅藏');hall(Z2,'法寶殿');
 /* 두 판전 사이 동·서 사간판전(작은 집) */for(const sx of[-1,1]){const x=sx*24,z=(Z1+Z2)/2;const b=box(7,.4,4,stn);b.position.set(x,.2,z);G.add(b);const w=box(6.4,3,3.4,wallM);w.position.set(x,1.9,z);G.add(w);S(x-3.5,x+3.5,0,9,z-2,z+2);if(!mini){const rf=hipRoof(MT,4.2,2.6,4.2,3.4,5.2,.25,.1,{plain:true,rs:.5});rf.position.set(x,0,z);G.add(rf)}}
 /* ---------- 마당에 경판 한 장 크게(인쇄면 보기) ---------- */
 {const KT=tex(512,192,(q,w,h)=>{q.fillStyle='#4a3424';q.fillRect(0,0,w,h);q.fillStyle='#2e1f14';q.fillRect(14,14,w-28,h-28);q.fillStyle='#6b4c34';q.font='bold 15px "Noto Serif KR",serif';const H='大方廣佛華嚴經如是我聞一時佛在摩竭提國阿蘭若法菩提場中始成正覺其地堅固金剛所成上妙寶輪及衆寶華清淨摩尼以爲嚴飾諸色相海無邊顯現';let k=0;for(let x=w-34;x>30;x-=19)for(let y=34;y<h-20;y+=17){q.save();q.translate(x,y);q.scale(-1,1);q.fillText(H[k++%H.length],0,0);q.restore()}});
  const st=box(.9,.9,.5,stn);st.position.set(9,.45,10);G.add(st);S(8.5,9.5,0,1.5,9.7,10.3);const pl=new THREE.Group();pl.position.set(9,1.25,10);pl.rotation.x=-.5;G.add(pl);const b=box(.7*2,.24*2,.035*2,M(0x4a3424));pl.add(b);const f=new THREE.Mesh(new THREE.PlaneGeometry(1.36,.46),new THREE.MeshStandardMaterial({map:KT,roughness:.7}));f.position.z=.04;pl.add(f);
  spots.push({x:9,y:0,z:12,r:2,t:'경판 한 장',h:'고려대장경 경판 한 장은 가로 약 70cm, 세로 24cm, 두께 3cm쯤이에요. 산벚나무·돌배나무 같은 나무를 바닷물에 담갔다 말려 뒤틀림을 막고, 글자를 거꾸로 새겼어요. 앞뒤로 한 면에 스물세 줄 남짓, 이렇게 8만 1천여 장이에요. (두 배로 키워 보여 드려요)'})}
 spots.push({x:0,y:0,z:Z1+D/2+3,r:3,t:'수다라장',h:'장경판전 앞 건물이에요. 정면 15칸, 길이 60m쯤 되는 긴 집에 팔만대장경판을 꽂아 두었어요. 1488년 무렵 다시 지은 건물로, 꾸밈없이 오직 경판을 잘 보존하려고 지었어요. 1995년 세계유산이 되었어요. (본떠 지음)'});
 spots.push({x:-12,y:0,z:Z1+D/2+1.6,r:2.4,t:'살창',h:'벽마다 나무 살창이 위아래로 있어요. 앞벽은 아래 창이 크고 위가 작고, 뒷벽은 반대로 위가 크고 아래가 작아요. 바람이 건물 안을 한 바퀴 돌아 나가게 해서, 기계 없이도 습기와 온도가 고르게 유지돼요.'});
 spots.push({x:0,y:FY,z:Z1+1.2,r:2.4,t:'판가',h:'경판을 책처럼 세워 꽂는 5단 선반이에요. 경판 양 끝에 붙인 마구리(나무 테) 덕분에 경판끼리 살짝 떨어져 바람이 통해요. 지금은 그 사이를 다 채우지 않고 보이는 만큼만 꽂았어요.'});
 spots.push({x:16,y:FY,z:Z1-1.2,r:2.4,t:'흙바닥',h:'판전 바닥은 흙인데, 그 아래에 숯, 횟가루, 소금, 모래를 켜켜이 깔았다고 전해요. 비가 오면 습기를 빨아들이고, 마르면 내보내서 경판이 760년 넘게 썩지 않았어요.'});
 spots.push({x:0,y:0,z:Z2+D/2+2.6,r:3,t:'법보전',h:'수다라장 뒤 건물이에요. 수다라장과 똑같은 크기로 마주 보고 서서, 둘 사이 마당으로 바람이 지나가요. 양 옆 작은 집(사간판전)에는 절에서 따로 새긴 경판을 두었어요.'});
 /* ---------- 앞마당 채우기: 석탑, 범종각, 실측 소나무, 연꽃 월문, 판전 안 빛줄기 ---------- */
 const gl=new GLTFLoader();const TOUCH=typeof matchMedia!=='undefined'&&matchMedia('(pointer:coarse)').matches;
 /* 삼층석탑 */{/* 공용 석탑 */const g=stonePagoda(6.6);g.position.set(-12,0,9);G.add(g);solids.push({cx:-12,cz:9,r:2.15,y0:0,y1:7});
  spots.push({x:-12,y:0,z:11.6,r:2,t:'삼층석탑',h:'절 마당 한가운데 서서 부처의 사리를 모신다는 뜻을 지닌 돌탑이에요. 해인사 대적광전 앞에도 신라 때 세운 석탑이 있어요. (본떠 지음)'})}
 /* 범종각: 기둥 넷, 기와지붕, 종(성덕대왕신종 3D를 작게) */{const BX=22,BZ=9;const pil=M(0x8a3a2a);const base=box(6.4,.5,6.4,M(0xb3aa98));base.position.set(BX,.25,BZ);G.add(base);S(BX-3.2,BX+3.2,0,.5,BZ-3.2,BZ+3.2);for(const sx of[-1,1])for(const sz of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.2,.22,4,10),pil);c.position.set(BX+sx*2.6,2.5,BZ+sz*2.6);c.castShadow=true;G.add(c);solids.push({cx:BX+sx*2.6,cz:BZ+sz*2.6,r:.26,y0:0,y1:9})}
  const bm=box(5.6,.3,.3,M(0x6b4428));bm.position.set(BX,4.3,BZ);G.add(bm);if(!mini){const rf=hipRoof(MT,4.2,4.2,1.2,4.6,6.6,.5,.2,{plain:true,rs:.5});rf.position.set(BX,0,BZ);rf.traverse(o=>{if(o.isMesh)o.castShadow=true});G.add(rf);
   gl.load(MU('gyeongju','bell'),m=>{const o=m.scene;o.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o),sz=b.getSize(new THREE.Vector3());const sc=2.2/sz.y;o.scale.setScalar(sc);o.position.set(BX-(b.min.x+b.max.x)/2*sc,4.15-b.max.y*sc,BZ-(b.min.z+b.max.z)/2*sc);o.traverse(e=>{if(e.isMesh)e.castShadow=true});G.add(o)})}
  const stk=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,2.2,8),M(0x8a6a44));stk.rotation.z=Math.PI/2;stk.position.set(BX+2.2,2.8,BZ);G.add(stk);
  spots.push({x:BX,y:.5,z:BZ+4.4,r:2.4,t:'범종각',h:'절에서 아침저녁으로 종을 쳐 시간을 알리고, 그 소리가 고통받는 이들에게 닿기를 빌어요. 종은 성덕대왕신종 3D(국가유산청)를 작게 줄여 걸었어요.'})}
 /* 실측 소나무(한국문화정보원 화성행궁 소나무 3D 재활용) */if(!mini){const P=[[-30,10,10],[31,16,9],[-33,-12,11],[33,-31,10],[-22,16,8.5],[13,17,9],[-34,-30,9.5],[34,-2,10.5]];gl.load(MU('misc','pine_lo'),m=>{const src=m.scene;src.traverse(e=>{if(e.isMesh){e.castShadow=!TOUCH;e.material.side=THREE.DoubleSide}});src.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(src),sz=b.getSize(new THREE.Vector3());for(const [x,z,h] of P){const o=src.clone();const sc=h/sz.y;o.scale.setScalar(sc);o.position.set(x-(b.min.x+b.max.x)/2*sc,-b.min.y*sc,z-(b.min.z+b.max.z)/2*sc);o.rotation.y=x*.37;G.add(o)}});for(const [x,z] of P)solids.push({cx:x,cz:z,r:.5,y0:0,y1:9})}
 /* 수다라장 가운데 문: 연꽃 봉오리 같은 둥근 문틀(월문) */{const fr=new THREE.Mesh(new THREE.TorusGeometry(1.5,.14,8,32,Math.PI),M(0x5a3e26));fr.position.set(0,FY+2.1,Z1+D/2+.1);G.add(fr);for(const sx of[-1,1]){const p=box(.28,2.1,.28,M(0x5a3e26));p.position.set(sx*1.5,FY+1.05,Z1+D/2+.1);G.add(p)}
  spots.push({x:0,y:0,z:Z1+D/2+1.6,r:1.4,t:'수다라장 월문',h:'수다라장 가운데 출입문은 위가 둥근 문이에요. 해가 비치면 바닥에 연꽃 봉오리 같은 그림자가 생겨 "연꽃문"이라고도 불러요.'})}
 /* 판전 안 빛줄기(앞 살창으로 들어오는 햇빛) */if(!mini&&!TOUCH){const LG=tex(64,256,(q,w,h)=>{const g=q.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(255,240,200,.0)');g.addColorStop(.3,'rgba(255,236,190,.22)');g.addColorStop(1,'rgba(255,230,180,0)');q.fillStyle=g;q.fillRect(0,0,w,h)});const lm=new THREE.MeshBasicMaterial({map:LG,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide});
  for(const cz of[Z1,Z2])for(let i=0;i<15;i++){if(i===7&&cz===Z1)continue;const x=-L/2+(i+.5)*L/15;const sh=new THREE.Mesh(new THREE.PlaneGeometry(2.2,5.2),lm);sh.position.set(x,FY+1.3,cz+D/2-1.6);sh.rotation.x=-.9;G.add(sh)}}
 const meta={quest:{t:'장경판전 바람길 순례',d:'팔만대장경을 760년 지켜 온 비밀을 여덟 곳에서 찾아 보세요.',steps:[['수다라장','수다라장'],['살창','살창'],['판가','판가'],['흙바닥','흙바닥'],['법보전','법보전'],['경판 한 장','경판 한 장'],['수다라장 월문','수다라장 월문'],['범종각','범종각']],done:'장경판전의 비밀을 다 찾았어요. 위아래가 다른 살창, 바람길, 흙바닥. 기계 하나 없이 나무 경판을 지켜 온 지혜예요.'},
  title:'합천 해인사 장경판전',video:'janggyeong',hint:'팔만대장경을 보관한 해인사 장경판전을 공개 수치로 본떠 지은 곳이에요(정면 15칸, 길이 약 60m). 앞뒤 크기가 다른 살창, 5단 판가에 꽂힌 경판, 흙바닥, 마당의 경판 한 장을 찾아 보세요.',
  env:{plaza:null,beds:false,trees:true,sign:{x:5,z:18,lines:['합천 해인사 장경판전','수다라장 · 법보전 (정면 15칸)','살창 · 판가 · 흙바닥','팔만대장경 81,258장']},treeAvoid:(x,z)=>Math.abs(x)<40&&z<20&&z>-34},
  npc:[['carpenter',[[-10,FY,Z1+1.2],[10,FY,Z1+1.2]]],['painter',[[-8,0,8],[8,0,8]]],['science',[[-14,FY,Z2+1.2],[14,FY,Z2+1.2]]],['painter',[[16,0,14],[28,0,14]]]],
  level:P=>Math.abs(P.x)<L/2&&Math.abs(P.z-Z1)<D/2?'수다라장 안':Math.abs(P.x)<L/2&&Math.abs(P.z-Z2)<D/2?'법보전 안':'판전 마당',
  camCap:P=>Math.abs(P.x)<L/2&&(Math.abs(P.z-Z1)<D/2||Math.abs(P.z-Z2)<D/2)?2.2:Infinity,
  mini:{S:3.4,ox:0,oz:-10,draw(g,X,Z,S){g.fillStyle='#7aa04e';g.fillRect(0,0,300,300);g.fillStyle='#c4b08a';g.fillRect(X(-38),Z(-34),76*S,52*S);g.fillStyle='#6b4a2e';g.fillRect(X(-L/2),Z(Z1-D/2),L*S,D*S);g.fillRect(X(-L/2),Z(Z2-D/2),L*S,D*S);g.fillRect(X(-27.5),Z(-16),7*S,4*S);g.fillRect(X(20.5),Z(-16),7*S,4*S)}}};
 return Object.assign({group:G,solids,cam,spots,spawn:{x:0,z:18,yaw:Math.PI},size:{}},meta)}
