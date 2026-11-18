/* 무이 나라 조달청: 「기한 해시계」(N18). 만든 날 2026-11-18
   발굴 현장 구덩이 뒤 오른편에 앙부일구 모양 해시계(오목한 솥, 날짜 눈금, 영침)를 둔다.
   흙을 파고 조각을 캘수록 그림자 끝이 날짜 눈금을 따라 돈다. 기한 눈금은 붉은 선.
   사흘(아주 급하게)로 잡았으면 일이 나흘 걸려 그림자가 기한을 넘고 「하루 늦음」 패와 함께 엽전이 떨어진다(의궤의 지체상금과 같은 규칙).
   sundial(FDX, termIdx) */
export function sundial(F,term){const T=F.THREE,sc=F.sc;const D=[3,10,30][term]??10,NEED=term===0?4:8;
 const g=new T.Group();g.position.set(1.0,0,2.35);g.rotation.y=.2;g.scale.setScalar(.75);sc.add(g);const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.5},o));
 const ped=new T.Mesh(new T.CylinderGeometry(.42,.5,.5,20),M(0x8a847a,{roughness:.9}));ped.position.y=.25;g.add(ped);
 const bowl=new T.Mesh(new T.SphereGeometry(.46,28,14,0,Math.PI*2,Math.PI/2,Math.PI/2),M(0x3a3226,{metalness:.6,roughness:.35,side:T.DoubleSide}));bowl.position.y=.92;g.add(bowl);
 for(let k=0;k<4;k++){const l=new T.Mesh(new T.CylinderGeometry(.025,.025,.42,6),M(0x3a3226,{metalness:.6}));const a=k/4*Math.PI*2;l.position.set(Math.cos(a)*.34,.7,Math.sin(a)*.34);l.rotation.z=Math.cos(a)*.3;l.rotation.x=-Math.sin(a)*.3;g.add(l)}
 /* 날짜 눈금: 솥 안쪽 둘레를 270도에 걸쳐 D칸, 기한은 붉게 */const ring=new T.Group();ring.position.y=.93;g.add(ring);const R0=.38,SPAN=Math.PI*1.5;const ang=d=>-SPAN/2+SPAN*Math.min(1.25,d/Math.max(D,NEED+.5));
 const MAXD=Math.max(D,NEED+1);for(let d=0;d<=MAXD;d++){const a=ang(d);const tk=new T.Mesh(new T.BoxGeometry(.012,.012,d===D?.12:.06),new T.MeshBasicMaterial({color:d===D?0xd8322a:0xe8d8a8}));tk.position.set(Math.sin(a)*R0,-.12,Math.cos(a)*R0);tk.rotation.y=a;ring.add(tk)}
 const lim=new T.Mesh(new T.BoxGeometry(.018,.02,.2),new T.MeshBasicMaterial({color:0xd8322a}));{const a=ang(D);lim.position.set(Math.sin(a)*(R0-.05),-.1,Math.cos(a)*(R0-.05));lim.rotation.y=a}ring.add(lim);
 const gn=new T.Mesh(new T.CylinderGeometry(.008,.008,.5,6),M(0xd8a838,{metalness:.8}));gn.rotation.x=Math.PI/2.6;gn.position.set(0,1.05,0);g.add(gn);
 /* 그림자 끝(검은 바늘) */const sh=new T.Mesh(new T.BoxGeometry(.02,.006,.32),new T.MeshBasicMaterial({color:0x0c0806,transparent:true,opacity:.75}));const shp=new T.Group();shp.position.y=.8;shp.add(sh);sh.position.z=.16;g.add(shp);
 /* 패: 「기한 n일 · 지금 m일째」 */const cv=document.createElement('canvas');cv.width=256;cv.height=84;const tx=new T.CanvasTexture(cv);tx.colorSpace=T.SRGBColorSpace;const pl=new T.Sprite(new T.SpriteMaterial({map:tx,depthTest:false,transparent:true}));pl.scale.set(.9,.3,1);pl.position.y=1.55;pl.renderOrder=8;g.add(pl);
 let last='';const paint=(day,late)=>{const t=late?`기한 ${D}일 · ${late}일 늦음`:`기한 ${D}일 · ${day}일째`;if(t===last)return;last=t;const q=cv.getContext('2d');q.clearRect(0,0,256,84);q.fillStyle=late?'#8e2b20':'#2a1a10';q.beginPath();q.roundRect?q.roundRect(3,3,250,78,14):q.rect(3,3,250,78);q.fill();q.strokeStyle='#d8a838';q.lineWidth=4;q.stroke();q.fillStyle='#fff4dc';q.font='bold 32px "Do Hyeon",sans-serif';q.textAlign='center';q.fillText(t,128,54);tx.needsUpdate=true};paint(0,0);
 const coins=[];let dropped=0;const drop=()=>{const c=new T.Mesh(new T.CylinderGeometry(.06,.06,.015,18),M(0xd8a838,{metalness:.8,roughness:.3}));c.position.set((Math.random()-.5)*.2,1.4,0);c.userData.vy=0;g.add(c);coins.push(c)};
 let p0=null,prog=0,lastT=performance.now(),tt=0;
 const loop=()=>{if(!F.alive())return;const now=performance.now(),dt=Math.min(.05,(now-lastT)/1000);lastT=now;tt+=dt;
  try{const L=window.__FD&&window.__FD.dbg&&window.__FD.dbg().left;if(L){const n=(L.soil||0)+(L.sh||0)*3+(L.cov||0)+(L.pl||0);if(p0==null||n>p0)p0=Math.max(1,n);const p=1-n/p0;prog+=(p-prog)*Math.min(1,dt*3)}}catch(e){}
  const day=prog*NEED,late=day>D+.3?Math.max(1,Math.round(day-D)):0;shp.rotation.y=ang(day);paint(Math.min(MAXD,Math.ceil(day)),late>0?late:0);
  if(late>dropped){dropped=late;for(let k=0;k<3;k++)setTimeout(drop,k*160)}lim.material.color.setHex(late?(Math.sin(tt*8)>0?0xff5040:0x8e2b20):0xd8322a);
  for(const c of coins){if(c.position.y>.56){c.userData.vy-=6*dt;c.position.y+=c.userData.vy*dt;c.rotation.x+=dt*9}else{c.position.y=.56;c.rotation.x=Math.PI/2}}
  requestAnimationFrame(loop)};requestAnimationFrame(loop);
 window.__SUN={day:()=>prog*NEED,D}}
