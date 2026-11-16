/* 무이 나라 조달청: 「혁신제품 시범 구매」. 만든 날 2026-11-17
   두 고을을 되살린 뒤 장터 둘레에 발명가 무이(머리 위 「!」)가 선다. 가까이 가면 새 도구 셋을 보여 준다.
   시험장(3D): 흙덩이로 덮인 청자 조각을 마우스로 끌어 털어 내며 도구마다 직접 써 본다.
   바람 풀무 붓 = 진짜 새 기술(넓고 빠르게, 조각 안전) / 새 이름 붓 = 옛 붓에 이름만 바꿈 / 쇠갈퀴 털개 = 빠르지만 조각을 긁음.
   알맞은 걸 「시범 구매」하면 엽전과 함께 다음 현장부터 흙 털기·모래 빨기가 빨라진다(ST.innov=1).
   jodal.js 가 setupInnov(env) 로 부른다. env={X,THREE,JOBS,ST,save,hudDraw,ov,SND,esc,anchor:()=>Vector3|null} */
import * as T from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {overlay,title,blip,softOut} from './sites/minigames.js';
const TOOLS=[{k:'fan',n:'바람 풀무 붓',rate:2.6,rad:.55,hurt:0,pitch:'풀무 바람으로 흙을 날리고 부드러운 털로 쓸어요. 처음 보는 새 기술이에요.',
  verdict:'넓게, 빠르게, 조각은 멀쩡해요. 새 기술이면서 써 보니 쓸모가 있어요.'},
 {k:'same',n:'새 이름 붓',rate:1,rad:.34,hurt:0,pitch:'이름도 새롭고 상자도 반짝여요. 「세상에 없던 붓」이래요.',verdict:'옛 붓과 똑같아요. 겉만 바꾼 물건은 혁신제품이 아니에요.'},
 {k:'rake',n:'쇠갈퀴 털개',rate:3.2,rad:.5,hurt:1,pitch:'쇠 갈퀴로 단숨에 긁어 내요. 아주 빨라요!',verdict:'빠르지만 조각에 긁힌 자국이 났어요. 안전이 검증되지 않은 도구는 국보에 쓸 수 없어요.'}];
export function setupInnov(E){const {X,THREE,JOBS}=E;const H=window.__H3;let npc=null,tried=false,asked=0;
 const busy=()=>!!document.querySelector('.jd-ov,body>div[data-mg]');
 const n=()=>JOBS.filter(j=>E.ST.done[j.k]).length;
 const free=(x,z)=>{try{const y=H.floorAt?H.floorAt(x,z,60):0;const p=new THREE.Vector3(x,y,z);H.collide(p);return Math.hypot(p.x-x,p.z-z)<.05&&!(window.__RIVER&&window.__RIVER(x,z))&&!(H.SITEB&&H.SITEB.baseAt&&!H.SITEB.baseAt(x,z))}catch(e){return true}};
 const mark=()=>{const c=document.createElement('canvas');c.width=c.height=64;const q=c.getContext('2d');q.fillStyle='#4ac0ff';q.beginPath();q.arc(32,32,28,0,7);q.fill();q.fillStyle='#fff';q.font='bold 46px sans-serif';q.textAlign='center';q.fillText('!',32,48);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false}));s.scale.setScalar(.75);s.renderOrder=9;return s};
 const place=()=>{if(tried)return;const a=E.anchor&&E.anchor();if(!a)return;tried=true;let P=null;for(const R of[9,12,15,19,24])for(let k=0;k<16&&!P;k++){const ang=k/16*Math.PI*2+.4,x=a.x+Math.cos(ang)*R,z=a.z+Math.sin(ang)*R;if(free(x,z)&&free(x+1,z)&&free(x,z+1))P=new THREE.Vector3(x,H.floorAt?H.floorAt(x,z,(a.y||0)+5)||0:0,z)}if(!P||!H.makeMuui)return;
  H.makeMuui('science',1.0).then(m=>{m.root.position.copy(P);m.root.rotation.y=Math.atan2(a.x-P.x,a.z-P.z);X.scene.add(m.root);m.play('wave');const q=mark();q.position.set(P.x,P.y+1.7,P.z);X.scene.add(q);
   /* 시연 탁자와 도구 상자 */const tb=new THREE.Mesh(new THREE.BoxGeometry(1.4,.7,.7),new THREE.MeshStandardMaterial({color:0x6a4a2c}));const d=new THREE.Vector3(Math.cos(m.root.rotation.y),0,-Math.sin(m.root.rotation.y));tb.position.set(P.x+d.x*1.1,P.y+.35,P.z+d.z*1.1);tb.rotation.y=m.root.rotation.y;tb.castShadow=true;X.scene.add(tb);
   for(let i=0;i<3;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(.3,.18,.22),new THREE.MeshStandardMaterial({color:[0x2a6a9a,0xf2c14e,0x6a6a70][i],metalness:i===1?.6:.1}));b.position.set(tb.position.x+d.x*(i-1)*.42,P.y+.79,tb.position.z+d.z*(i-1)*.42);b.rotation.y=tb.rotation.y;X.scene.add(b)}
   npc={m,q,P}}).catch(()=>{})};
 const talk=()=>{const u=E.ov();u.c.style.width='min(860px,96vw)';u.c.innerHTML=`<h2>발명가 무이의 새 도구</h2><div>「조달청 나리! 제가 만든 새 도구들이에요. 써 본 곳이 없어서 아무도 안 사 줘요. 나라에서 먼저 써 봐 주시면 안 될까요?」</div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px">${TOOLS.map(t=>`<div class="jd-opt" style="cursor:default"><b>${t.n}</b><small>${t.pitch}</small></div>`).join('')}</div>
  <div class="jd-tip">조달청 한마디: 새 기술로 만든 물건은 써 본 곳이 없어 팔기 어려워요. 조달청은 <b>혁신제품</b>으로 정해 나라 기관이 먼저 사서 써 보게 해요(<b>시범 구매</b>). 다만 정말 새롭고, 쓸모 있고, 안전한지 직접 써 보고 골라요.</div>
  <div style="margin-top:12px;display:flex;gap:8px;justify-content:center"><button type="button" class="jd-btn" data-go>시험장에서 써 보기</button><button type="button" class="jd-btn g" data-x>나중에</button></div>`;
  u.c.querySelector('[data-x]').onclick=u.close;u.c.querySelector('[data-go]').onclick=()=>{u.close();X.mgOpen(function innov(ctx){runTrial(ctx,E,()=>{if(npc){X.scene.remove(npc.q);npc.m.play('cheer')}})})}};
 let last=performance.now();const loop=()=>{const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;try{if(H.P&&X.scene&&n()>=2&&!E.ST.innov)place();
  if(npc){npc.m.mx.update(dt);if(npc.q.parent)npc.q.position.y=npc.P.y+1.7+Math.sin(now/300)*.08;const d=Math.hypot(H.P.x-npc.P.x,H.P.z-npc.P.z);if(!window.__NOEV&&!E.ST.innov&&d<4&&!asked&&!busy()){asked=1;talk()}if(d>8)asked=0}}catch(e){}requestAnimationFrame(loop)};requestAnimationFrame(loop);
 return{where:()=>npc&&npc.P,test:{talk,state:()=>({npc:npc&&[npc.P.x,npc.P.z],innov:!!E.ST.innov})}}}

/* 시험장: 흙덩이 덮인 청자 조각을 도구로 털기 */
export function runTrial(ctx,E,onDone){const ui=overlay('#14100b');let alive=true;ui.c.style.display='none';const ac=ctx.ac(),out=softOut(ctx);
 const R=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.shadowMap.enabled=true;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new T.Scene();sc.background=new T.Color(0x9cc4e4);try{const pm=new T.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 sc.add(new T.HemisphereLight(0xffffff,0x6a5a40,.7));const sun=new T.DirectionalLight(0xfff0d0,2.4);sun.position.set(3,6,2);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-3,right:3,top:3,bottom:-3});sc.add(sun);
 const cam=new T.PerspectiveCamera(40,1,.05,40);cam.position.set(0,3.6,3.1);cam.lookAt(0,.2,.1);
 title(ui.top,'혁신제품 시험장','도구를 고르고, 마우스를 누른 채 끌어 흙을 털어 봐요');
 const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
 /* 마당, 시험 판 */const gr=new T.Mesh(new T.PlaneGeometry(14,10),M(0x7a9a5a));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;sc.add(gr);
 const slab=new T.Mesh(new T.BoxGeometry(3.4,.3,2.3),M(0x8a6a44));slab.position.y=.15;slab.receiveShadow=true;slab.castShadow=true;sc.add(slab);
 const rim=new T.Mesh(new T.BoxGeometry(3.6,.36,2.5),M(0x5a3a22));rim.position.y=.12;sc.add(rim);
 /* 청자 조각: 상감 학 무늬가 든 오목한 대접 밑 조각(깨진 가장자리) */const shTex=(()=>{const c=document.createElement('canvas');c.width=512;c.height=256;const q=c.getContext('2d');q.fillStyle='#86ae98';q.fillRect(0,0,512,256);for(let i=0;i<500;i++){q.fillStyle=`rgba(40,80,60,${Math.random()*.08})`;q.fillRect(Math.random()*512,Math.random()*256,3,3)}
  q.strokeStyle='#f4f1e6';q.lineWidth=4;for(const[x,y]of[[90,120],[260,90],[420,140]]){q.beginPath();q.arc(x,y,46,0,7);q.stroke();q.fillStyle='#f4f1e6';q.beginPath();q.ellipse(x,y,20,8,-.5,0,7);q.fill();q.fillRect(x-30,y-3,22,3);q.fillStyle='#2a2a2a';q.beginPath();q.arc(x+18,y-9,3,0,7);q.fill()}q.strokeStyle='#3a4a40';q.lineWidth=2;q.beginPath();q.moveTo(0,30);q.lineTo(512,30);q.stroke();const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.wrapS=T.RepeatWrapping;return t})();
 const sh=new T.Mesh(new T.SphereGeometry(.9,48,16,.3,Math.PI*1.45,Math.PI*.7,Math.PI*.3),new T.MeshStandardMaterial({map:shTex,roughness:.22,side:T.DoubleSide}));sh.scale.set(1,.3,1);sh.position.set(0,.585,-.1);sh.castShadow=sh.receiveShadow=true;sc.add(sh);
 const cracks=new T.Group();sc.add(cracks);
 /* 흙덩이 */const NX=30,NZ=20,N=NX*NZ;const geo=new T.DodecahedronGeometry(.075,0);const im=new T.InstancedMesh(geo,M(0x6a4a2a),N);im.castShadow=true;sc.add(im);const base=[],amt=new Float32Array(N),over=[];const m4=new T.Matrix4(),q4=new T.Quaternion(),s3=new T.Vector3(),p3=new T.Vector3();
 for(let i=0;i<NX;i++)for(let j=0;j<NZ;j++){const x=-1.6+i*(3.2/(NX-1))+(Math.random()-.5)*.05,z=-1.05+j*(2.1/(NZ-1))+(Math.random()-.5)*.05;base.push({x,z,y:.33+Math.random()*.05,r:Math.random()*6,s:.9+Math.random()*.7});over.push(x*x+(z+.1)**2<.62*.62)}
 const col=new T.Color();for(let k=0;k<N;k++){col.setHSL(.08,.35,.22+Math.random()*.12);im.setColorAt(k,col)}
 const reset=()=>{amt.fill(1);cracks.clear();upd()};
 const upd=()=>{for(let k=0;k<N;k++){const b=base[k],a=amt[k];q4.setFromAxisAngle(p3.set(0,1,0),b.r);s3.setScalar(Math.max(.001,b.s*(a>.02?.35+.65*a:0)));m4.compose(p3.set(b.x,b.y-(1-a)*.08,b.z),q4,s3);im.setMatrixAt(k,m4)}im.instanceMatrix.needsUpdate=true};
 const NOV=over.filter(Boolean).length;const cleared=()=>{let c=0;for(let k=0;k<N;k++)if(over[k]&&amt[k]<.05)c++;return c/NOV};
 /* 도구 모형 */const tools={};{const g=new T.Group();const h=new T.Mesh(new T.CylinderGeometry(.04,.04,.6,8),M(0x8a5a32));h.position.y=.4;g.add(h);const bel=new T.Mesh(new T.BoxGeometry(.32,.12,.24),M(0x8a2a1a));bel.position.y=.18;g.add(bel);const no=new T.Mesh(new T.ConeGeometry(.06,.16,8),M(0xc8a040,{metalness:.7}));no.rotation.x=Math.PI;no.position.y=.06;g.add(no);const br=new T.Mesh(new T.CylinderGeometry(.14,.12,.08,12),M(0xe8dcc0));br.position.y=.0;g.add(br);tools.fan=g}
 {const g=new T.Group();const h=new T.Mesh(new T.CylinderGeometry(.035,.035,.6,8),M(0xf2c14e,{metalness:.6,roughness:.3}));h.position.y=.38;g.add(h);const br=new T.Mesh(new T.CylinderGeometry(.08,.06,.12,10),M(0x2a2a2a));br.position.y=.04;g.add(br);tools.same=g}
 {const g=new T.Group();const h=new T.Mesh(new T.CylinderGeometry(.035,.035,.6,8),M(0x5a3a22));h.position.y=.4;g.add(h);const bar=new T.Mesh(new T.BoxGeometry(.42,.04,.05),M(0x6a6a70,{metalness:.8,roughness:.3}));bar.position.y=.1;g.add(bar);for(let i=0;i<6;i++){const t=new T.Mesh(new T.ConeGeometry(.018,.12,5),M(0x6a6a70,{metalness:.8,roughness:.3}));t.rotation.x=Math.PI;t.position.set(-.18+i*.072,.02,0);g.add(t)}tools.rake=g}
 for(const k in tools){tools[k].visible=false;tools[k].rotation.z=.35;sc.add(tools[k])}
 /* 먼지 */const DN=160,dp=new Float32Array(DN*3).fill(-99),dv=new Float32Array(DN*3),dl=new Float32Array(DN);const dg=new T.BufferGeometry();dg.setAttribute('position',new T.BufferAttribute(dp,3));const dust=new T.Points(dg,new T.PointsMaterial({color:0xa08860,size:.05,transparent:true,opacity:.8,depthWrite:false}));sc.add(dust);let di=0;
 const puff=(x,z,w)=>{for(let k=0;k<3;k++){const i=di++%DN;dp[i*3]=x;dp[i*3+1]=.4;dp[i*3+2]=z;dv[i*3]=(Math.random()-.5)*w;dv[i*3+1]=.6+Math.random();dv[i*3+2]=(Math.random()-.5)*w;dl[i]=.8}};
 const bar=document.createElement('div');bar.style.cssText='position:absolute;left:50%;bottom:16px;transform:translateX(-50%);z-index:3;display:flex;flex-direction:column;align-items:center;gap:8px;max-width:min(820px,96vw)';ui.o.append(bar);
 const msg=document.createElement('div');msg.style.cssText='padding:8px 14px;border-radius:12px;background:rgba(243,234,214,.96);border:2px solid #d8a838;font:15px/1.6 "Gowun Dodum",sans-serif;color:#2b1d12;text-align:center';const row=document.createElement('div');row.style.cssText='display:flex;gap:8px;flex-wrap:wrap;justify-content:center';bar.append(msg,row);
 const BTN="font:16px 'Do Hyeon',sans-serif;padding:8px 14px;border-radius:12px;border:2px solid #d8a838;background:#3b2a1c;color:#f2d27a;cursor:pointer";
 const say=(t,bad)=>{msg.style.borderColor=bad?'#b8322a':'#d8a838';msg.innerHTML=t};
 let cur=null,t0=0,el=0,down=false,hit=null,hurtN=0,res={},finished=false;
 const menu=()=>{row.innerHTML=TOOLS.map((t,i)=>`<button type="button" data-t="${i}" style="${BTN}${cur===t?';background:#8e2b20;color:#fff4dc':''}">${t.n}${res[t.k]?' ✓':''}</button>`).join('')+(Object.keys(res).length===3?`<button type="button" data-pick style="${BTN};background:#2f6a4a;color:#fff">시범 구매 고르기</button>`:'');
  row.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>use(TOOLS[+b.dataset.t]));const pk=row.querySelector('[data-pick]');if(pk)pk.onclick=choose};
 const use=t=>{if(finished)return;cur=t;reset();hurtN=0;el=0;t0=0;for(const k in tools)tools[k].visible=k===t.k;E.SND.paper();say(`<b>${t.n}</b>: ${t.pitch}<br>마우스를 누른 채 흙 위를 끌어 청자 조각을 드러내요.`);menu()};
 const doneTool=()=>{const t=cur;res[t.k]={sec:el,hurt:hurtN};blip(ac,out,600,800,.1,.08,'triangle');say(`<b>${t.n}</b> 다 털었어요 · ${el.toFixed(1)}초${hurtN?` · 긁힌 자국 ${hurtN}개`:''}<br>${t.verdict}${Object.keys(res).length<3?'<br>다른 도구도 써 봐요.':'<br>셋 다 써 봤어요. 「시범 구매 고르기」를 눌러요.'}`,!!t.hurt||t.k==='same');cur=null;for(const k in tools)tools[k].visible=false;menu()};
 const choose=()=>{row.innerHTML=TOOLS.map((t,i)=>`<button type="button" data-c="${i}" style="${BTN}">${t.n} 시범 구매</button>`).join('');say(`써 본 기록: ${TOOLS.map(t=>`${t.n} ${res[t.k]?res[t.k].sec.toFixed(1)+'초':'안 써 봄'}${res[t.k]&&res[t.k].hurt?`(긁힘 ${res[t.k].hurt})`:''}`).join(' · ')}<br>정말 <b>새롭고</b>, <b>쓸모 있고</b>, <b>안전한</b> 도구는 무엇일까요?`);
  row.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{const t=TOOLS[+b.dataset.c];if(t.k!=='fan'){blip(ac,out,200,140,.14,.1,'square');say(t.k==='same'?'새 이름 붓은 옛 붓과 똑같았어요. 이름과 상자만 바꾼 물건은 혁신제품이 아니에요. 다시 골라요.':'쇠갈퀴는 빨랐지만 청자를 긁었어요. 안전과 품질이 검증되지 않으면 나라가 살 수 없어요. 다시 골라요.',true);return}
   finished=true;E.ST.innov=1;E.ST.coins+=20;E.save();E.hudDraw();E.SND.fan();
   say('<b>「바람 풀무 붓」 시범 구매!</b> 혁신제품 지정서에 조달청 도장을 찍었어요. 수고비 20냥.<br>이제 다음 현장부터 흙 털기와 모래 빨기가 훨씬 빨라져요. 나라가 먼저 써 주니 발명가 공방도 다른 고을에 팔 수 있게 됐어요.');
   const st=new T.Mesh(new T.PlaneGeometry(1.2,1.2),new T.MeshBasicMaterial({map:(()=>{const c=document.createElement('canvas');c.width=c.height=256;const q=c.getContext('2d');q.strokeStyle='#b8322a';q.lineWidth=14;q.strokeRect(14,14,228,228);q.fillStyle='#b8322a';q.font='bold 64px serif';q.textAlign='center';q.fillText('革新',128,112);q.fillText('製品',128,196);const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;return tx})(),transparent:true,toneMapped:false}));st.rotation.x=-Math.PI/2;st.rotation.z=.2;st.position.set(0,.62,-.1);st.renderOrder=5;st.material.depthTest=false;sc.add(st);
   row.innerHTML=`<button type="button" data-x style="${BTN};background:#8e2b20;color:#fff4dc">마치기</button>`;row.querySelector('[data-x]').onclick=close;onDone&&onDone()})};
 say('도구 셋을 하나씩 골라 직접 써 봐요. 겉말이 아니라 써 본 결과로 골라요.');menu();
 const ray=new T.Raycaster(),mv=new T.Vector2(),pl=new T.Plane(new T.Vector3(0,1,0),-.33);const aim=e=>{const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,cam);const p=new T.Vector3();return ray.ray.intersectPlane(pl,p)?p:null};
 R.domElement.addEventListener('pointerdown',e=>{down=true;hit=aim(e)});addEventListener('pointerup',()=>{down=false});R.domElement.addEventListener('pointermove',e=>{hit=aim(e)});
 let last=performance.now(),sndT=0;const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  if(cur&&hit){const tl=tools[cur.k];tl.position.set(hit.x,.3+(down?0:.15),hit.z);tl.rotation.y=Math.sin(now/90)*(down?.4:.05);
   if(down){if(!t0)t0=now;el=(now-t0)/1000;let ch=false;for(let k=0;k<N;k++){if(amt[k]<=0)continue;const b=base[k];const d=Math.hypot(b.x-hit.x,b.z-hit.z);if(d<cur.rad){amt[k]=Math.max(0,amt[k]-cur.rate*dt*4.2*(1-d/cur.rad*.6));ch=true}}
    if(ch){upd();puff(hit.x,hit.z,cur.k==='fan'?2.2:.9);sndT-=dt;if(sndT<=0){sndT=.12;blip(ac,out,cur.k==='rake'?900:300,cur.k==='rake'?700:240,.03,.04,cur.k==='rake'?'sawtooth':'triangle')}}
    /* 쇠갈퀴: 드러난 조각 위를 긁으면 자국 */if(cur.hurt&&Math.random()<dt*9){const onShard=hit.x*hit.x+(hit.z+.1)**2<.62*.62;let bare=true;for(let k=0;k<N;k++){const b=base[k];if(Math.hypot(b.x-hit.x,b.z-hit.z)<.15&&amt[k]>.3){bare=false;break}}if(onShard&&bare&&hurtN<9){hurtN++;const c=new T.Mesh(new T.BoxGeometry(.28,.01,.012),new T.MeshBasicMaterial({color:0x2a3a30}));c.position.set(hit.x,.43,hit.z);c.rotation.y=Math.random()*3;cracks.add(c);blip(ac,out,1400,900,.05,.06,'square')}}
    if(cleared()>.9)doneTool()}}
  for(let i=0;i<DN;i++){if(dl[i]<=0)continue;dl[i]-=dt;dv[i*3+1]-=2*dt;for(let a=0;a<3;a++)dp[i*3+a]+=dv[i*3+a]*dt;if(dl[i]<=0)dp[i*3+1]=-99}dg.attributes.position.needsUpdate=true;
  R.render(sc,cam);requestAnimationFrame(loop)};reset();loop();
 const close=()=>{if(!alive)return;alive=false;try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;
 window.__INV={state:()=>({cur:cur&&cur.k,res,hurt:hurtN,cleared:cleared(),done:finished}),use:i=>use(TOOLS[i]),choose,pick:i=>{const b=row.querySelector(`[data-c="${i}"]`);b&&b.click()},
  scr:(x,z)=>{const v=new T.Vector3(x,.33,z).project(cam);const r=R.domElement.getBoundingClientRect();return[r.left+(v.x+1)/2*r.width,r.top+(1-v.y)/2*r.height]},close};
 return{close}}
