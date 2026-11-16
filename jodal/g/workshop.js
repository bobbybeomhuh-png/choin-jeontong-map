/* 무이 나라 조달청: 「공방 키우기」. 만든 날 2026-11-17
   되살린 고을마다 그 국보를 맡았던 장인의 공방이 지도 위(방 둘레 빈 땅)에 선다. 처음엔 작은 초가 공방.
   가까이(5m) 가면 「공방 들르기 (E)」. 엽전으로 고쳐 짓기: 초가 → 기와 공방 → 큰 작업장(가마 굴뚝 연기) → 이름난 공방(깃발·청사초롱).
   등급마다 1분에 엽전 2냥씩 쌓이고(최대 30냥), 들러서 받는다. 쌓인 게 있으면 지붕 위에 금빛 엽전이 돈다.
   처음 고쳐 지으면 「벤처나라」 카드. ST.ws={lv:{k:n},t:{k:ms}}
   jodal.js 가 setupWorkshop(env) 로 부른다. env={X,THREE,JOBS,ST,save,hudDraw,ov,SND,esc} */
const LV=[['초가 공방',0],['기와 공방',30],['큰 작업장',60],['이름난 공방',100]];
const CREWN={metal:'금속 장인',ceramic:'도자 장인',science:'과학 기구 장인',painter:'칠 장인',carpenter:'목수 장인'};
export function setupWorkshop(E){const {X,THREE,JOBS}=E;const H=window.__H3;const shops=new Map();let btn=null,near=null;
 const busy=()=>!!document.querySelector('.jd-ov,body>div[data-mg]');
 const S=()=>{const w=E.ST.ws||(E.ST.ws={});w.lv=w.lv||{};w.t=w.t||{};return w};
 const fy=(x,z,y)=>{try{const v=H.floorAt?H.floorAt(x,z,(y||0)+6):0;return isFinite(v)?v:(y||0)}catch(e){return y||0}};
 const free=(x,z)=>{try{const p=new THREE.Vector3(x,fy(x,z),z);H.collide(p);return Math.hypot(p.x-x,p.z-z)<.05&&!(window.__RIVER&&window.__RIVER(x,z))&&!(H.SITEB&&H.SITEB.baseAt&&!H.SITEB.baseAt(x,z))}catch(e){return true}};
 const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.85},o));
 const spot=(c)=>{for(const R of[7,9,11,14,18])for(let k=0;k<20;k++){const a=k/20*Math.PI*2+.9,x=c.x+Math.cos(a)*R,z=c.z+Math.sin(a)*R;let ok=true,lo=1e9,hi=-1e9;for(let i=-1;i<=1&&ok;i++)for(let j=-1;j<=1;j++){const xx=x+i*1.6,zz=z+j*1.4;if(!free(xx,zz)){ok=false;break}const h=fy(xx,zz,c.y);lo=Math.min(lo,h);hi=Math.max(hi,h)}if(ok&&hi-lo<.6)return new THREE.Vector3(x,lo,z)}return null};
 const coinTex=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const q=c.getContext('2d');q.fillStyle='#f2c14e';q.beginPath();q.arc(32,32,28,0,7);q.fill();q.strokeStyle='#a87a1a';q.lineWidth=5;q.stroke();q.fillStyle='#a87a1a';q.fillRect(24,24,16,16);return new THREE.CanvasTexture(c)})();
 /* 등급별 건물 */const model=(lv)=>{const g=new THREE.Group();
  const wall=new THREE.Mesh(new THREE.BoxGeometry(lv>=2?3.6:2.6,1.6,2.2),M(0xece4d2));wall.position.y=.8;wall.castShadow=true;g.add(wall);
  for(const sx of[-1,1]){const p=new THREE.Mesh(new THREE.BoxGeometry(.14,1.6,.14),M(0x6a3a1c));p.position.set(sx*(lv>=2?1.8:1.3),.8,1.11);g.add(p)}
  const door=new THREE.Mesh(new THREE.BoxGeometry(.7,1.1,.06),M(0x6a3a1c));door.position.set(0,.55,1.12);g.add(door);
  if(lv===0){const r=new THREE.Mesh(new THREE.ConeGeometry(2.1,1.2,4),M(0xc8a858,{roughness:1}));r.rotation.y=Math.PI/4;r.scale.set(1,1,.85);r.position.y=2.15;r.castShadow=true;g.add(r)}
  else{const r=new THREE.Mesh(new THREE.ConeGeometry(lv>=2?2.9:2.2,1.3,4),M(0x3a3a3e));r.rotation.y=Math.PI/4;r.scale.set(1.15,1,.8);r.position.y=2.2;r.castShadow=true;g.add(r);const rid=new THREE.Mesh(new THREE.BoxGeometry(lv>=2?3.2:2.4,.14,.2),M(0x2a2a2e));rid.position.y=2.82;g.add(rid)}
  if(lv>=2){const ch=new THREE.Mesh(new THREE.CylinderGeometry(.22,.26,1.6,8),M(0x8a6a4a));ch.position.set(1.3,2.6,-.5);g.add(ch);const kiln=new THREE.Mesh(new THREE.SphereGeometry(.7,12,8,0,Math.PI*2,0,Math.PI/2),M(0x9a5a3a));kiln.position.set(2.6,0,.4);g.add(kiln);g.userData.smoke=new THREE.Vector3(1.3,3.4,-.5)}
  if(lv>=3){const pole=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,3.4,6),M(0x5a3a22));pole.position.set(-2.3,1.7,1.2);g.add(pole);const fl=new THREE.Mesh(new THREE.PlaneGeometry(.9,1.2),new THREE.MeshStandardMaterial({color:0xb8322a,side:THREE.DoubleSide}));fl.position.set(-1.83,2.8,1.2);g.add(fl);
   for(const sx of[-.9,.9]){const l=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.26,8),new THREE.MeshStandardMaterial({color:sx<0?0x2a4aaa:0xc8321a,emissive:sx<0?0x2a4aaa:0xc8321a,emissiveIntensity:1.3}));l.position.set(sx,1.75,1.35);g.add(l)}}
  /* 이름표 */const c=document.createElement('canvas');c.width=256;c.height=64;const q=c.getContext('2d');q.fillStyle='#2a1a10';q.fillRect(0,0,256,64);q.fillStyle='#f2d27a';q.font='bold 34px serif';q.textAlign='center';q.fillText(LV[lv][0],128,44);const tag=new THREE.Mesh(new THREE.PlaneGeometry(1.4,.35),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c)}));tag.position.set(0,1.75,1.13);g.add(tag);
  return g};
 const place=(j)=>{if(shops.has(j.k))return;const P=spot(j.sp);if(!P){shops.set(j.k,{none:1});return}const root=new THREE.Group();root.position.copy(P);root.rotation.y=Math.atan2(j.sp.x-P.x,j.sp.z-P.z);X.scene.add(root);
  const coin=new THREE.Sprite(new THREE.SpriteMaterial({map:coinTex,depthTest:false}));coin.scale.setScalar(.7);coin.renderOrder=9;coin.visible=false;X.scene.add(coin);const sh={j,root,P,coin,lv:-1,smoke:[]};shops.set(j.k,sh);if(!S().t[j.k])S().t[j.k]=Date.now();rebuild(sh)};
 const rebuild=(sh)=>{const lv=S().lv[sh.j.k]||0;if(sh.lv===lv)return;sh.lv=lv;sh.root.clear();sh.root.add(model(lv));for(const s of sh.smoke)X.scene.remove(s);sh.smoke=[];
  const sm=sh.root.children[0].userData.smoke;if(sm){for(let k=0;k<5;k++){const p=new THREE.Mesh(new THREE.SphereGeometry(.25,8,6),new THREE.MeshBasicMaterial({color:0xdddddd,transparent:true,opacity:.5,depthWrite:false}));X.scene.add(p);sh.smoke.push(p);p.userData.k=k}}};
 const income=(k)=>{const lv=S().lv[k]||0;if(!lv)return 0;return Math.min(30,Math.floor((Date.now()-(S().t[k]||Date.now()))/60000*2*lv))};
 const open=(sh)=>{if(busy())return;const k=sh.j.k,lv=S().lv[k]||0,nx=LV[lv+1],inc=income(k);const u=E.ov();const crew=(E.ST.done[k]&&E.ST.done[k].crew)||sh.j.need;
  u.c.innerHTML=`<h2>${sh.j.city} ${CREWN[crew]||'장인'}의 ${LV[lv][0]}</h2><div>국보를 되살린 덕분에 공방에 일감이 늘었어요. 엽전으로 공방을 고쳐 지으면 더 많은 일을 맡고 수입도 늘어요.</div>
   <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:10px 0;font-size:13px">${LV.map((L,i)=>`<div style="padding:6px;border-radius:8px;${i<=lv?'background:#fbf3dc;border:1px solid #d8a838':'background:#e8dcc0;border:1px dashed #b8a880;color:#8a7a60'}"><b>${L[0]}</b><br>${i?L[1]+'냥':'처음'}${i?` · 1분에 ${i*2}냥`:''}</div>`).join('')}</div>
   <div>쌓인 수입: <b style="color:#c98a12">${inc}냥</b>${lv?'':' (고쳐 지으면 수입이 생겨요)'} · 곳간 ${E.ST.coins}냥</div>
   <div class="jd-tip">조달청 한마디: 조달청은 <b>벤처나라</b> 같은 판로를 열어, 새로 생긴 작은 기업의 물건도 나라 기관이 사 쓸 수 있게 도와요. 나라 일을 맡으며 작은 공방이 자라요.</div>
   <div style="margin-top:12px;display:flex;gap:8px;justify-content:center">${nx?`<button type="button" class="jd-btn" data-up ${E.ST.coins<nx[1]?'disabled':''}>${nx[0]}(으)로 고쳐 짓기 · ${nx[1]}냥</button>`:'<span style="font:16px \'Do Hyeon\',sans-serif;color:#2f6a4a">가장 이름난 공방이에요!</span>'}<button type="button" class="jd-btn" data-get ${inc?'':'disabled'}>수입 받기</button><button type="button" class="jd-btn g" data-x>나가기</button></div>`;
  u.c.querySelector('[data-x]').onclick=u.close;const g=u.c.querySelector('[data-get]');g.onclick=()=>{const v=income(k);E.ST.coins+=v;S().t[k]=Date.now();E.save();E.hudDraw();E.SND.coin();u.close();H.say&&H.say(`${sh.j.city} 공방 수입 ${v}냥을 받았어요.`,2.5)};
  const up=u.c.querySelector('[data-up]');if(up)up.onclick=()=>{if(E.ST.coins<nx[1])return;const v=income(k);E.ST.coins+=v-nx[1];S().lv[k]=lv+1;S().t[k]=Date.now();const first=!E.ST.cards||!E.ST.cards.venture;E.ST.cards=E.ST.cards||{};E.ST.cards.venture=1;E.save();E.hudDraw();E.SND.fan();rebuild(sh);u.close();
   const u2=E.ov();u2.c.innerHTML=`<h2>${nx[0]}(으)로 고쳐 지었어요!</h2><div>이제 1분에 ${(lv+1)*2}냥씩 수입이 쌓여요. 지나가다 들러 받아 가요.${v?` 쌓여 있던 ${v}냥도 함께 받았어요.`:''}</div>${first?'<div class="jd-tip">조달 도감 「벤처나라」 카드가 열렸어요.</div>':''}<div style="margin-top:12px"><button type="button" class="jd-btn" data-ok>좋아요</button></div>`;u2.c.querySelector('[data-ok]').onclick=u2.close}};
 const ui=()=>{if(btn)return;btn=document.createElement('button');btn.type='button';btn.textContent='공방 들르기 (E)';btn.style.cssText='position:fixed;left:50%;bottom:270px;transform:translateX(-50%);z-index:9;font:18px "Do Hyeon",sans-serif;padding:10px 20px;border-radius:14px;border:3px solid #d8a838;background:#6a3a1c;color:#fff4dc;cursor:pointer;display:none';btn.onclick=()=>near&&open(near);document.body.append(btn);addEventListener('keydown',e=>{if(e.code==='KeyE'&&btn.style.display!=='none'&&!busy()&&near)open(near)})};
 let last=performance.now();const loop=()=>{const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;try{if(H.P&&X.scene){ui();for(const j of JOBS)if(E.ST.done[j.k]&&j.sp&&!shops.has(j.k))place(j);const P=H.P;near=null;let nd=1e9;
  for(const sh of shops.values()){if(sh.none)continue;rebuild(sh);const d=Math.hypot(P.x-sh.P.x,P.z-sh.P.z);if(d<5&&d<nd){nd=d;near=sh}
   const inc=income(sh.j.k);sh.coin.visible=inc>=5;if(sh.coin.visible){sh.coin.position.set(sh.P.x,sh.P.y+3.7+Math.sin(now/300)*.12,sh.P.z);sh.coin.material.rotation=Math.sin(now/400)*.4}
   for(const p of sh.smoke){const t=((now/1000+p.userData.k*.7)%3.5)/3.5;const base=sh.root.localToWorld(sh.root.children[0].userData.smoke.clone());p.position.set(base.x+t*.6,base.y+t*2.4,base.z);p.scale.setScalar(.6+t*1.6);p.material.opacity=.5*(1-t)}}
  btn.style.display=near&&!busy()?'block':'none'}}catch(e){}requestAnimationFrame(loop)};requestAnimationFrame(loop);
 return{test:{state:()=>[...shops.values()].filter(s=>!s.none).map(s=>({k:s.j.k,P:[s.P.x,s.P.z,s.P.y],lv:S().lv[s.j.k]||0,inc:income(s.j.k)})),open:k=>{const s=shops.get(k);s&&!s.none&&open(s)},age:(k,min)=>{S().t[k]=Date.now()-min*60000}}}}
