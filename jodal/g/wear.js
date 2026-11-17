/* 무이 나라 조달청: 「무이 꾸미기」(G11). 만든 날 2026-11-17
   나라장터 장터 창의 「꾸밈 가게」에서 엽전으로 갓·노리개·도포를 사서 무이에게 입힌다. 사모(관리 모자)는 사무관이 되면 관아에서 내려 줌(값 없음).
   산 것은 ST.wear.own, 입은 것은 ST.wear.on 에 남아 다시 켜도 그대로. 머리 것(갓·사모)은 하나만.
   setupWear(E) 한 번(E={THREE,ST,save,hudDraw,SND}). openWear(u,E,back) 는 장터 창 안에 가게 화면을 그림. window.__WEAR = {state, apply} */
const ITEMS=[
 {k:'gat',n:'갓',p:40,head:1,d:'말총을 엮어 비치는 넓은 챙. 선비의 나들이 모자예요.'},
 {k:'nori',n:'노리개',p:25,d:'매듭과 붉은 술. 허리춤에서 흔들려요.'},
 {k:'dopo',n:'도포',p:60,d:'옥빛 겉옷과 붉은 세조대(허리끈).'},
 {k:'samo',n:'사모',p:0,head:1,rank:'사무관',d:'관리의 모자. 사무관이 되면 관아에서 내려 줘요.'}];
let ENV=null;
const W=()=>{const S=ENV.ST;return S.wear||(S.wear={own:{},on:{}})};
const rankOk=r=>{const R=['새내기','주무관','사무관'];return R.indexOf(ENV.ST.rank||'새내기')>=R.indexOf(r)};
/* 물건 그림(캔버스 원판) */
const IC={};function icon(k){if(IC[k])return IC[k];const c=document.createElement('canvas');c.width=c.height=96;const q=c.getContext('2d');const g=q.createRadialGradient(40,34,6,48,48,46);g.addColorStop(0,'#f8efd8');g.addColorStop(1,'#e2d2a8');q.fillStyle=g;q.beginPath();q.arc(48,48,44,0,7);q.fill();q.strokeStyle='#c8a050';q.lineWidth=3;q.stroke();q.save();q.translate(48,52);
 if(k==='gat'||k==='samo'){q.fillStyle='#1a1a20';if(k==='gat'){q.globalAlpha=.75;q.beginPath();q.ellipse(0,4,36,9,0,0,7);q.fill();q.globalAlpha=1;q.fillRect(-12,-24,24,26);q.beginPath();q.ellipse(0,-24,12,4,0,0,7);q.fill();q.strokeStyle='#c8862a';q.lineWidth=2;q.beginPath();q.moveTo(-14,6);q.quadraticCurveTo(-4,30,0,30);q.quadraticCurveTo(4,30,14,6);q.stroke()}else{q.beginPath();q.arc(0,0,20,Math.PI,0);q.fill();q.fillRect(-14,-28,28,16);q.save();q.rotate(-.12);q.fillRect(-40,-14,22,9);q.restore();q.save();q.rotate(.12);q.fillRect(18,-14,22,9);q.restore();q.fillRect(-22,0,44,6)}}
 else if(k==='nori'){q.fillStyle='#d8a838';q.beginPath();q.arc(0,-22,6,0,7);q.fill();q.fillStyle='#2f6a4a';q.beginPath();q.moveTo(0,-16);q.lineTo(12,-4);q.lineTo(0,8);q.lineTo(-12,-4);q.closePath();q.fill();q.fillStyle='#c8352a';q.beginPath();q.moveTo(-8,8);q.lineTo(8,8);q.lineTo(12,34);q.lineTo(-12,34);q.closePath();q.fill();q.strokeStyle='rgba(90,20,10,.5)';q.lineWidth=1;for(let x=-10;x<=10;x+=3){q.beginPath();q.moveTo(x*.7,10);q.lineTo(x,34);q.stroke()}}
 else{q.fillStyle='#a9cfd6';q.beginPath();q.moveTo(-14,-28);q.lineTo(14,-28);q.lineTo(30,30);q.lineTo(-30,30);q.closePath();q.fill();q.strokeStyle='#6a9aa4';q.lineWidth=2;q.beginPath();q.moveTo(-14,-28);q.lineTo(4,0);q.lineTo(14,-28);q.stroke();q.fillStyle='#c8352a';q.fillRect(-24,0,48,5);q.fillRect(6,4,4,20);q.fillRect(12,4,4,16)}
 q.restore();return IC[k]=c.toDataURL()}
/* 무이 몸에 붙일 3D 소품. 몸 크기(뼈대 상자)에 맞춰 놓음 */
function build(T,k,bb){const g=new T.Group();g.name='wear_'+k;const H=bb.max.y-bb.min.y,cx=(bb.min.x+bb.max.x)/2,cz=(bb.min.z+bb.max.z)/2,rx=(bb.max.x-bb.min.x)/2,rz=(bb.max.z-bb.min.z)/2,top=bb.max.y;const s=H/1.45;
 const blk=new T.MeshStandardMaterial({color:0x15151a,roughness:.45});
 if(k==='gat'){const BR=Math.max(.44*s,rx*1.35),CR=Math.max(.15*s,rx*.42);const brim=new T.Mesh(new T.CylinderGeometry(BR,BR,.012*s,40,1,true),new T.MeshStandardMaterial({color:0x101014,roughness:.4,transparent:true,opacity:.78,side:T.DoubleSide,depthWrite:false}));const disc=new T.Mesh(new T.CircleGeometry(BR,48),brim.material);disc.rotation.x=-Math.PI/2;const ring=new T.Mesh(new T.TorusGeometry(BR,.01*s,6,64),blk);ring.rotation.x=Math.PI/2;g.add(disc,ring);
  const cr=new T.Mesh(new T.CylinderGeometry(CR*.92,CR,.26*s,28),new T.MeshStandardMaterial({color:0x101014,roughness:.4,transparent:true,opacity:.92}));cr.position.y=.13*s;const cap=new T.Mesh(new T.CircleGeometry(CR*.92,28),blk);cap.rotation.x=-Math.PI/2;cap.position.y=.26*s;g.add(cr,cap);
  /* 갓끈: 호박 구슬 줄이 양옆에서 턱 아래로 */const bead=new T.MeshStandardMaterial({color:0xc8862a,roughness:.3,emissive:0x3a2008,emissiveIntensity:.3});const bg=new T.SphereGeometry(.018*s,8,6);for(const sd of[-1,1])for(let i=0;i<8;i++){const t=i/7;const b=new T.Mesh(bg,bead);b.position.set(sd*rx*(.62-.4*t),-t*rx*.78,rx*(.55+.38*t));g.add(b)}
  g.position.set(cx,top-rx*.42,cz);g.rotation.x=-.06}
 else if(k==='samo'){const cr=new T.Mesh(new T.SphereGeometry(.2*s,20,12,0,Math.PI*2,0,Math.PI/2),blk);cr.scale.set(1,.8,1);g.add(cr);const back=new T.Mesh(new T.CylinderGeometry(.13*s,.15*s,.2*s,16),blk);back.position.set(0,.1*s,-.06*s);g.add(back);for(const sx of[-1,1]){const w=new T.Mesh(new T.BoxGeometry(.26*s,.1*s,.012*s),blk);w.position.set(sx*.3*s,.12*s,-.08*s);w.rotation.z=sx*.12;g.add(w)}g.position.set(cx,top-.07*s,cz)}
 else if(k==='nori'){const gold=new T.MeshStandardMaterial({color:0xd8a838,metalness:.7,roughness:.3}),jade=new T.MeshStandardMaterial({color:0x3f8a62,roughness:.3}),red=new T.MeshStandardMaterial({color:0xc8352a,roughness:.8});const r1=new T.Mesh(new T.TorusGeometry(.03*s,.008*s,6,14),gold);g.add(r1);const j=new T.Mesh(new T.OctahedronGeometry(.045*s,0),jade);j.position.y=-.07*s;j.scale.set(1,1.2,.5);g.add(j);const knot=new T.Mesh(new T.TorusKnotGeometry(.025*s,.008*s,24,5),red);knot.position.y=-.14*s;g.add(knot);const ts=new T.Mesh(new T.CylinderGeometry(.018*s,.04*s,.16*s,10,1,true),red);ts.material.side=T.DoubleSide;ts.position.y=-.25*s;g.add(ts);g.userData.swing=1;
  g.position.set(cx+rx*.92,bb.min.y+H*.36,cz+rz*.2)}
 else if(k==='dopo'){const yo=new T.MeshStandardMaterial({color:0x7fb3bd,roughness:.85,side:T.DoubleSide}),red=new T.MeshStandardMaterial({color:0xc8352a,roughness:.7});const R=Math.max(rx,rz);const pts=[];for(let i=0;i<=8;i++){const t=i/8;pts.push(new T.Vector2(R*(.84+.24*t),-t*H*.3))}const sk=new T.Mesh(new T.LatheGeometry(pts,36),yo);g.add(sk);/* 앞섶 겹친 선 */const seam=new T.MeshStandardMaterial({color:0x4f8590,roughness:.9});for(const dx of[-.04,.05]){const ln=new T.Mesh(new T.BoxGeometry(.018*s,H*.3,.01*s),seam);ln.position.set(dx*s,-H*.15,R*.98);ln.rotation.x=-.24;g.add(ln)}const belt=new T.Mesh(new T.TorusGeometry(R*.85,.022*s,8,40),red);belt.rotation.x=Math.PI/2;g.add(belt);for(const dx of[.05,.11]){const tie=new T.Mesh(new T.CylinderGeometry(.012*s,.012*s,.26*s,6),red);tie.position.set(dx*s,-.13*s,R*.86);g.add(tie)}
  g.position.set(cx,bb.min.y+H*.4,cz);g.scale.set(rx/R,1,rz/R)}
 g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.frustumCulled=false}});return g}
function apply(){const H=window.__H3;if(!ENV||!H||!H.me)return;const me=H.me,T=ENV.THREE;const on=W().on;const sig=Object.keys(on).filter(k=>on[k]).sort().join(',');if(me.root.userData.wearSig===sig)return;
 me.root.children.filter(c=>c.name&&c.name.startsWith('wear_')).forEach(c=>me.root.remove(c));
 /* 몸 상자는 지금 선 자리에서 재고(세계 좌표) 무이 발밑 기준으로 옮김. 앞뒤·옆 폭은 작은 쪽(팔 벌림 빼고 몸통) */
 if(sig){me.root.updateMatrixWorld(true);const wb=new T.Box3().setFromObject(me.root);const rp=me.root.position;const h=wb.max.y-wb.min.y;if(!(h>.6&&h<4))return;const r=Math.min(wb.max.x-wb.min.x,wb.max.z-wb.min.z)/2;const bb=new T.Box3(new T.Vector3(-r,wb.min.y-rp.y,-r),new T.Vector3(r,wb.max.y-rp.y,r));
  for(const k of sig.split(','))try{me.root.add(build(T,k,bb))}catch(e){console.warn('꾸미기',k,e)}}
 me.root.userData.wearSig=sig}
export function setupWear(E){ENV=E;if(window.__WEAR)return;let t=0;const tick=()=>{const now=performance.now();if(now-t>800){t=now;try{if(rankOk('사무관')&&!W().own.samo){W().own.samo=1;E.save()}apply()}catch(e){}}
  /* 노리개 흔들림 */try{const me=window.__H3&&window.__H3.me;if(me){const n=me.root.getObjectByName('wear_nori');if(n)n.rotation.z=Math.sin(now/260)*.18}}catch(e){}requestAnimationFrame(tick)};requestAnimationFrame(tick);
 window.__WEAR={state:()=>JSON.parse(JSON.stringify(W())),apply,items:ITEMS.map(i=>i.k)}}
export function openWear(u,E,back){ENV=ENV||E;const S=W();const draw=msg=>{u.c.innerHTML=`<h2>무이 꾸밈 가게</h2><div>엽전으로 우리 옷과 꾸미개를 사서 무이에게 입혀요. 산 것은 언제든 벗고 입을 수 있어요. 지금 엽전 <b>${E.ST.coins}냥</b></div>
 <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:10px">${ITEMS.map(it=>{const own=S.own[it.k],on=S.on[it.k],lock=it.rank&&!rankOk(it.rank);return `<button type="button" class="jd-opt ${on?'on':''}" data-w="${it.k}" ${(!own&&(lock||E.ST.coins<it.p))?'disabled':''}><img src="${icon(it.k)}" alt="" style="width:58px;height:58px;display:block;margin:0 auto 4px"><b>${it.n}</b>${own?(on?'입는 중 · 눌러 벗기':'눌러 입기'):(lock?it.rank+'이 되면 받아요':`<span style="font:20px 'Do Hyeon',sans-serif;color:#8e2b20">${it.p}냥</span>`)}<br><small>${it.d}</small></button>`}).join('')}</div>
 ${msg?`<div class="jd-tip" style="border-color:#2f6a4a">${msg}</div>`:''}<div class="jd-tip">조달청 한마디: 공공기관은 나라장터 <b>종합쇼핑몰</b>에서 미리 계약해 둔 물건을 장 보듯 골라 살 수 있어요. 값과 품질을 미리 따져 계약해 두었기 때문에 빠르고 믿을 수 있어요.</div>
 <div style="margin-top:12px"><button type="button" class="jd-btn" data-bk>장터로 돌아가기</button> <button type="button" class="jd-btn g" data-x>나가기</button></div>`;
 u.c.querySelector('[data-x]').onclick=u.close;u.c.querySelector('[data-bk]').onclick=back;
 u.c.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{const it=ITEMS.find(i=>i.k===b.dataset.w);let m='';if(!S.own[it.k]){if(E.ST.coins<it.p)return;E.ST.coins-=it.p;S.own[it.k]=1;try{E.SND.coin()}catch(e){}m=`${it.n}을 샀어요! 무이가 바로 입었어요. 사진첩(K)으로 찍어 두세요.`;S.on[it.k]=1}else{S.on[it.k]=!S.on[it.k];try{E.SND.paper()}catch(e){}m=S.on[it.k]?`${it.n}을 입었어요.`:`${it.n}을 벗었어요.`}
  if(it.head&&S.on[it.k])for(const o of ITEMS)if(o.head&&o.k!==it.k)S.on[o.k]=0;E.save();try{E.hudDraw()}catch(e){}apply();draw(m)})};draw()}
