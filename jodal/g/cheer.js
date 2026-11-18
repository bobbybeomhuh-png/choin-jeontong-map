/* 무이 나라 조달청: 「고을 환호」(N6). 만든 날 2026-11-18
   국보가 의궤에 오르면 그 고을 마당에 고을 무이 여섯이 둥글게 모여 환호한다(cheer·joy·wave 번갈아, 폴짝).
   가운데엔 상모 돌리는 풍물 무이 둘, 꽹과리·장구 장단(합성 효과음, BGM 아님) 6초, 오색 종이 꽃가루가 흩날림.
   25초 뒤(또는 플레이어가 40m 넘게 멀어지면) 조용히 흩어짐. townCheer(pos) 한 번. */
export function townCheer(pos,opt={}){const H=window.__H3;if(!H||!H.makeMuui||!pos)return;const T=H.THREE;const sc=H.scene;const crowd=[];let alive=true,t=0;
 const N=6,R=3.4;const moves=['cheer','joy','wave','cheer','joy','wave'];
 for(let i=0;i<N;i++){const a=i/N*Math.PI*2+.3;H.makeMuui('base',.95).then(m=>{if(!alive){sc.remove(m.root);return}const x=pos.x+Math.cos(a)*R,z=pos.z+Math.sin(a)*R;let y=pos.y||0;try{y=H.floorAt(x,z,60)}catch(e){}m.root.position.set(x,y,z);m.root.lookAt(pos.x,y,pos.z);m.play(moves[i]);crowd.push({m,y,ph:i*.7,i})}).catch(()=>{})}
 /* 풍물 무이 둘: 가운데에서 빙글, 머리 위 상모(흰 끈) */
 for(let i=0;i<2;i++){H.makeMuui(i?'carpenter':'ceramic',1).then(m=>{if(!alive){sc.remove(m.root);return}const x=pos.x+(i?1:-1)*1.1,z=pos.z+.6;let y=pos.y||0;try{y=H.floorAt(x,z,60)}catch(e){}m.root.position.set(x,y,z);m.play('cheer');try{const hb=m.root.getObjectByName('head');const v=new T.Vector3();hb.getWorldPosition(v);m.root.worldToLocal(v);const sg=new T.Group();sg.position.set(v.x,v.y+.32,v.z);const hat=new T.Mesh(new T.CylinderGeometry(.16,.18,.12,14),new T.MeshStandardMaterial({color:0x1c1410}));sg.add(hat);const rib=new T.Mesh(new T.PlaneGeometry(1.4,.06),new T.MeshStandardMaterial({color:0xfaf6ec,side:T.DoubleSide}));rib.position.set(.75,.1,0);sg.add(rib);m.root.add(sg);m.sangmo=sg}catch(e){}crowd.push({m,y,ph:i*3,drum:1,i:10+i})}).catch(()=>{})}
 /* 꽃가루 */
 const NC=180,pp=new Float32Array(NC*3),vv=new Float32Array(NC*3),cc=new Float32Array(NC*3);const cols=[[.85,.2,.16],[.95,.76,.31],[.17,.29,.6],[.18,.42,.29],[.97,.95,.9]];
 for(let k=0;k<NC;k++){pp[k*3]=pos.x+(Math.random()-.5)*7;pp[k*3+1]=(pos.y||0)+4+Math.random()*4;pp[k*3+2]=pos.z+(Math.random()-.5)*7;vv[k*3]=(Math.random()-.5)*.6;vv[k*3+1]=-(.5+Math.random()*.7);vv[k*3+2]=(Math.random()-.5)*.6;const c=cols[k%cols.length];cc[k*3]=c[0];cc[k*3+1]=c[1];cc[k*3+2]=c[2]}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pp,3));g.setAttribute('color',new T.BufferAttribute(cc,3));const pts=new T.Points(g,new T.PointsMaterial({size:.14,vertexColors:true,transparent:true,opacity:.95,depthWrite:false}));pts.frustumCulled=false;sc.add(pts);
 /* 꽹과리·장구 장단(6초): 쇳소리는 높은 네모파 두 겹을 짧게, 장구는 낮은 둥 + 딱 */
 try{const ac=H.AC;if(ac&&!opt.mute){const out=ac.createGain();out.gain.value=.22;out.connect(ac.destination);const t0=ac.currentTime+.15;
  const kkw=(at,v=1)=>{for(const f of[1870,2730]){const o=ac.createOscillator(),gg=ac.createGain();o.type='square';o.frequency.value=f*(1+(Math.random()-.5)*.01);gg.gain.setValueAtTime(.0001,at);gg.gain.exponentialRampToValueAtTime(.16*v,at+.004);gg.gain.exponentialRampToValueAtTime(.0001,at+.16);o.connect(gg).connect(out);o.start(at);o.stop(at+.2)}};
  const jang=(at,hi)=>{const o=ac.createOscillator(),gg=ac.createGain();o.type='sine';o.frequency.setValueAtTime(hi?220:110,at);o.frequency.exponentialRampToValueAtTime(hi?160:70,at+.14);gg.gain.setValueAtTime(.0001,at);gg.gain.exponentialRampToValueAtTime(hi?.35:.7,at+.006);gg.gain.exponentialRampToValueAtTime(.0001,at+(hi?.12:.28));o.connect(gg).connect(out);o.start(at);o.stop(at+.32)};
  /* 휘모리 비슷한 장단: 한 마디 0.75초 */const bar=.75;for(let b=0;b<8;b++){const s=t0+b*bar;kkw(s,1);kkw(s+bar*.25,.6);kkw(s+bar*.5,.9);kkw(s+bar*.625,.5);kkw(s+bar*.75,.7);jang(s,false);jang(s+bar*.5,true);jang(s+bar*.75,false)}kkw(t0+8*bar,1.2);jang(t0+8*bar,false);setTimeout(()=>{try{out.disconnect()}catch(e){}},8000)}}catch(e){}
 let last=performance.now();const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;
  for(const c of crowd){c.m.mx.update(dt);if(c.drum){c.m.root.rotation.y+=dt*2.4;if(c.m.sangmo)c.m.sangmo.rotation.y+=dt*9}else{c.m.root.position.y=c.y+Math.max(0,Math.sin(t*5+c.ph))*.18}}
  const p=g.attributes.position;for(let k=0;k<NC;k++){p.array[k*3]+=vv[k*3]*dt+Math.sin(t*2+k)*.004;p.array[k*3+1]+=vv[k*3+1]*dt;p.array[k*3+2]+=vv[k*3+2]*dt;if(p.array[k*3+1]<(pos.y||0)+.05){if(t<14){p.array[k*3+1]=(pos.y||0)+6+Math.random()*2}else p.array[k*3+1]=(pos.y||0)+.05}}p.needsUpdate=true;
  const P=H.P;const far=P&&Math.hypot(P.x-pos.x,P.z-pos.z)>40;if(t>25||far){alive=false;for(const c of crowd)sc.remove(c.m.root);sc.remove(pts);g.dispose();window.__CHEER=null;return}
  requestAnimationFrame(loop)};requestAnimationFrame(loop);
 window.__CHEER={n:()=>crowd.length,t:()=>t};}
