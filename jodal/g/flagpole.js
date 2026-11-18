/* 무이 나라 조달청: 「공정 깃대」(M12). 만든 날 2026-11-19
   발굴 현장 구덩이 왼편 앞에 나무 깃대를 세운다. 흙을 파고 조각을 캘수록 「공정 ○할」 깃발이 깃대를 타고 한 칸씩 오르고(눈금 넷),
   다 차면 깃발이 금빛 「竣工」으로 바뀌며 반짝이가 돈다(계약 이행을 눈으로 확인). 깃발은 바람에 펄럭인다.
   flagPole(FDX) — 진행은 해시계와 같이 window.__FD.dbg().left 에서 읽음 */
export function flagPole(F){const T=F.THREE,sc=F.sc;
 const g=new T.Group();g.position.set(-2.35,0,.15);g.scale.setScalar(.72);sc.add(g);const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.7},o));
 const base=new T.Mesh(new T.CylinderGeometry(.24,.3,.22,14),M(0x8a847a,{roughness:.9}));base.position.y=.11;g.add(base);
 const pole=new T.Mesh(new T.CylinderGeometry(.035,.045,2.0,10),M(0x6a4226));pole.position.y=1.1;g.add(pole);const top=new T.Mesh(new T.SphereGeometry(.07,12,8),M(0xd8a838,{metalness:.7,roughness:.3}));top.position.y=2.13;g.add(top);
 /* 눈금 넷(2할·5할·7할·준공) */const Y0=.5,Y1=1.78;for(let k=1;k<=4;k++){const r=new T.Mesh(new T.TorusGeometry(.055,.012,6,14),M(k===4?0xd8a838:0x3b2a1c,{metalness:k===4?.7:0}));r.rotation.x=Math.PI/2;r.position.y=Y0+(Y1-Y0)*k/4;g.add(r)}
 const cv=document.createElement('canvas');cv.width=256;cv.height=160;const tx=new T.CanvasTexture(cv);tx.colorSpace=T.SRGBColorSpace;let lastTxt='';
 const paint=(pct,done)=>{const txt=done?'done':String(pct);if(txt===lastTxt)return;lastTxt=txt;const q=cv.getContext('2d');q.fillStyle=done?'#e8b838':'#b8322a';q.fillRect(0,0,256,160);q.strokeStyle=done?'#8e2b20':'#f2d27a';q.lineWidth=8;q.strokeRect(6,6,244,148);q.fillStyle=done?'#8e2b20':'#fff4dc';q.textAlign='center';if(done){q.font='bold 80px "Noto Serif KR",serif';q.fillText('竣工',128,108)}else{q.font='bold 38px "Do Hyeon",sans-serif';q.fillText('공정',128,62);q.font='bold 52px "Do Hyeon",sans-serif';q.fillText(pct+'할',128,122)}tx.needsUpdate=true};paint(0,false);
 const fg=new T.PlaneGeometry(.78,.5,10,4);const P=fg.attributes.position,X=new Float32Array(P.count);for(let i=0;i<P.count;i++)X[i]=P.getX(i);
 const flag=new T.Mesh(fg,new T.MeshStandardMaterial({map:tx,side:T.DoubleSide,roughness:.9}));flag.position.set(.43,Y0,0);g.add(flag);
 const bits=[];for(let k=0;k<8;k++){const b=new T.Mesh(new T.OctahedronGeometry(.035),new T.MeshBasicMaterial({color:0xfff0b0}));b.visible=false;g.add(b);bits.push({b,a:k/8*Math.PI*2})}
 let p0=null,prog=0,lastT=performance.now(),tt=0,done=false,stepShown=0;
 const loop=()=>{if(!F.alive())return;const now=performance.now(),dt=Math.min(.05,(now-lastT)/1000);lastT=now;tt+=dt;
  try{const L=window.__FD&&window.__FD.dbg&&window.__FD.dbg().left;if(L){const n=(L.soil||0)+(L.sh||0)*3+(L.cov||0)+(L.pl||0);if(p0==null||n>p0)p0=Math.max(1,n);const p=1-n/p0;prog+=(p-prog)*Math.min(1,dt*3);if(n===0&&p0>1)prog=Math.max(prog,.999)}}catch(e){}
  /* 깃발은 눈금 칸마다 올라감(조금씩 미끄러지듯) */const step=Math.min(4,Math.floor(prog*4+1e-3));const want=Y0+(Y1-Y0)*step/4;flag.position.y+=(want-flag.position.y)*Math.min(1,dt*4);
  if(step>stepShown){stepShown=step;try{window.__JDSND&&window.__JDSND.paper()}catch(e){}}
  if(step>=4&&!done){done=true}paint(Math.round(step/4*10),done);
  if(F.cam){g.rotation.y=Math.atan2(F.cam.position.x-g.position.x,F.cam.position.z-g.position.z)}
  for(let i=0;i<P.count;i++){const x=X[i]+.39;P.setZ(i,Math.sin(x*9-tt*6)*.05*x)}P.needsUpdate=true;fg.computeVertexNormals();
  for(const s of bits){s.b.visible=done;if(done){s.a+=dt*1.6;s.b.position.set(Math.cos(s.a)*.5+.43,Y1+Math.sin(s.a*2)*.12,Math.sin(s.a)*.3);s.b.rotation.y+=dt*5}}
  requestAnimationFrame(loop)};requestAnimationFrame(loop);
 window.__FLAG={prog:()=>prog,step:()=>stepShown,done:()=>done}}
