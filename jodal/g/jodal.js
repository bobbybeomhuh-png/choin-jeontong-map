/* 무이 나라 조달청 (2026 조달청 AI 게임·콘텐츠 공모전 출품용). 만든 날 2026-11-16
   유물 복원이 가장 중요한 나라. 국보가 깨지면 조달청이 방(榜)을 붙여 장인을 구한다.
   흐름: 지도에서 방 붙일 자리로 감 → 방 쓰기(구하는 장인·품삯·기한) → 찾아온 장인 셋 가운데 고르고 수결 → 복원(고른 장인에 따라 쉬워지거나 어려워짐) → 의궤 한 장
   다섯 국보를 다 되살리면 맺음 장면에서 오늘의 조달(입찰 공고·적격 심사·검수·계약 공개)과 잇는다.
   index.html 이 window.__JDX 로 필요한 것을 내준다. */
const X=window.__JDX,THREE=X.THREE;
const CREW={metal:'금속 장인',ceramic:'도공',science:'과학 장인',carpenter:'소목장',painter:'화공'};
const FACE=k=>'../world3d/media/crew_'+k+'.jpg',THUMB=k=>'textures/thumb/'+k+'.webp';
/* 다섯 고을의 깨진 국보: 고을, 유물 키, 필요한 장인, 방에 적는 사연 */
const JOBS=[
 {city:'경주',k:'crown',need:'metal',n:'천마총 금관',why:'금으로 만든 관이에요. 쇠붙이를 다루는 장인이 필요해요.'},
 {city:'강진',k:'maebyeong',need:'ceramic',n:'청자 매병',why:'흙으로 빚어 구운 청자예요. 그릇을 빚는 장인이 필요해요.'},
 {city:'서울',k:'angbu',need:'science',n:'앙부일구',why:'그림자로 시각을 재는 해시계예요. 하늘과 셈을 아는 장인이 필요해요.'},
 {city:'통영',k:'najeonham',need:'carpenter',n:'나전칠함',why:'나무 함에 옻칠하고 자개를 붙였어요. 나무를 다루는 장인이 필요해요.'},
 {city:'이천',k:'moonjar',need:'ceramic',n:'달항아리',why:'흰 흙으로 빚은 큰 항아리예요. 그릇을 빚는 장인이 필요해요.'}];
const PAY=[{k:0,n:'적게',c:20},{k:1,n:'알맞게',c:40},{k:2,n:'넉넉히',c:65}],TERM=[{k:0,n:'사흘',d:'아주 급하게'},{k:1,n:'열흘',d:'알맞게'},{k:2,n:'한 달',d:'넉넉히'}];
const LS='jodal-v1',START=230;
const load=()=>{try{const s=JSON.parse(localStorage.getItem(LS)||'null');if(s&&s.done)return s}catch(e){}return{coins:START,done:{},intro:0}};
let ST=load();const save=()=>{try{localStorage.setItem(LS,JSON.stringify(ST))}catch(e){}};
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const josa=(w,a,b)=>((w.charCodeAt(w.length-1)-0xac00)%28)?a:b;
const css=document.createElement('style');css.textContent=`
#bVisit,#bHome,#bStamp,#bShorts,#bStory,#bBack,#bNet,#bGreet,#wmSeason,#quest,#credChip{display:none!important}
.jd-ov{position:fixed;inset:0;z-index:28;background:rgba(10,7,4,.78);display:grid;place-items:center;padding:12px;font:15px/1.6 "Gowun Dodum",sans-serif;color:#2b1d12}
.jd-card{background:#f3ead6;border:4px solid #d8a838;border-radius:18px;padding:16px 18px;width:min(760px,96vw);max-height:94vh;overflow:auto;box-sizing:border-box;text-align:center}
.jd-card h2{font:26px "Do Hyeon",sans-serif;color:#8e2b20;margin:0 0 4px}.jd-card h3{font:18px "Do Hyeon",sans-serif;color:#3b2a1c;margin:12px 0 6px;text-align:left}
.jd-btn{font:17px "Do Hyeon",sans-serif;padding:9px 18px;border-radius:12px;border:0;background:#8e2b20;color:#fff4dc;cursor:pointer}.jd-btn.g{background:#fff4dc;color:#3b2a1c;border:2px solid #3b2a1c}.jd-btn:disabled{opacity:.45;cursor:default}
.jd-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(104px,1fr));gap:8px}
.jd-opt{padding:8px 6px;border-radius:12px;border:2px solid #c8b890;background:#fffaf0;cursor:pointer;font:14px/1.35 "Gowun Dodum",sans-serif;color:#2b1d12}.jd-opt b{display:block;font:16px "Do Hyeon",sans-serif}.jd-opt.on{border-color:#8e2b20;background:#ffe9c8;box-shadow:0 0 0 2px #8e2b20 inset}
.jd-opt img{width:56px;height:56px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 4px;border:2px solid #d8a838}
.jd-tip{margin:10px 0 0;padding:7px 10px;border-radius:10px;background:#fff8e6;border:1px dashed #b8902e;font-size:13.5px;color:#5a3a12;text-align:left}
.jd-bang{background:#fbf3dc;border:2px solid #3b2a1c;border-radius:4px;padding:12px 14px;margin:8px auto;max-width:520px;text-align:left;font:16px/1.7 "Noto Serif KR",serif;box-shadow:0 4px 10px rgba(0,0,0,.25);position:relative}
.jd-bang:before{content:'榜';position:absolute;right:10px;top:4px;font:700 34px "Noto Serif KR",serif;color:rgba(142,43,32,.28)}
.jd-cand{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px}
.jd-c{border:2px solid #c8b890;border-radius:14px;background:#fffaf0;padding:10px;cursor:pointer;text-align:center;font:13.5px/1.5 "Gowun Dodum",sans-serif;color:#2b1d12}.jd-c.on{border-color:#8e2b20;box-shadow:0 0 0 2px #8e2b20 inset;background:#ffe9c8}
.jd-c .f{width:72px;height:72px;border-radius:50%;object-fit:cover;border:3px solid #d8a838}.jd-c .s{height:84px;display:grid;place-items:center;background:radial-gradient(circle at 50% 30%,#8a6e52,#2a1e14 78%);border-radius:8px;margin:6px 0;position:relative;overflow:hidden}.jd-c .s img{height:76px}
.jd-pae{display:inline-block;padding:1px 8px;border-radius:8px;font:13px "Do Hyeon",sans-serif}
#jdHud{position:fixed;left:12px;top:calc(env(safe-area-inset-top) + 58px);z-index:9;background:rgba(30,20,12,.88);border:2px solid #d8a838;border-radius:14px;padding:8px 12px;color:#f3ead6;font:14px/1.5 "Gowun Dodum",sans-serif;max-width:min(300px,62vw)}
#jdHud b{font:17px "Do Hyeon",sans-serif;color:#f2d27a}#jdHud button{margin-top:6px;font:14px "Do Hyeon",sans-serif;padding:5px 10px;border-radius:9px;border:0;background:#d8a838;color:#1d1408;cursor:pointer}
@media (max-width:640px){#jdHud{top:calc(env(safe-area-inset-top) + 100px);font-size:12.5px;padding:6px 9px}}
@keyframes jdStamp{0%{transform:scale(2.4) rotate(-18deg);opacity:0}60%{transform:scale(.9) rotate(-12deg);opacity:1}100%{transform:scale(1) rotate(-12deg);opacity:1}}`;
document.head.append(css);

const ov=()=>{const o=document.createElement('div');o.className='jd-ov';const c=document.createElement('div');c.className='jd-card';o.append(c);document.body.append(o);try{for(const k in X.keys)X.keys[k]=false}catch(e){}return{o,c,close:()=>o.remove()}};
const starStr=n=>'★'.repeat(n)+'☆'.repeat(3-n);
const doneN=()=>JOBS.filter(j=>ST.done[j.k]).length;

/* ---------- 지도: 고을마다 방 게시판 ---------- */
const boards=new Map();
function boardAt(job,sp){const g=new THREE.Group(),M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.8},o));const wd=M(0x5a3a22);
 for(const sx of[-.9,.9]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.07,.08,2.3,8),wd);p.position.set(sx,1.15,0);g.add(p)}
 const pl=new THREE.Mesh(new THREE.BoxGeometry(2.1,1.25,.08),M(0x7a5634));pl.position.set(0,1.55,0);g.add(pl);const rf=new THREE.Mesh(new THREE.BoxGeometry(2.4,.1,.5),M(0x3b3a38));rf.position.set(0,2.32,0);g.add(rf);
 const cv=document.createElement('canvas');cv.width=320;cv.height=220;const tx=new THREE.CanvasTexture(cv);tx.colorSpace=THREE.SRGBColorSpace;const pp=new THREE.Mesh(new THREE.PlaneGeometry(1.5,1.03),new THREE.MeshStandardMaterial({map:tx,roughness:1}));pp.position.set(0,1.55,.05);g.add(pp);
 const beam=new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,26,20,1,true),new THREE.MeshBasicMaterial({color:0xffd27a,transparent:true,opacity:.22,side:THREE.DoubleSide,depthWrite:false}));beam.position.y=13;g.add(beam);
 const lamp=new THREE.PointLight(0xffd27a,0,9,1.6);lamp.position.set(0,2.8,.6);g.add(lamp);
 g.position.set(sp.x-2.6,sp.y,sp.z-.4);g.rotation.y=.35;X.scene.add(g);
 const paint=()=>{const q=cv.getContext('2d'),dn=ST.done[job.k];q.fillStyle=dn?'#f6ecd0':'#fbf3dc';q.fillRect(0,0,320,220);q.strokeStyle='#3b2a1c';q.lineWidth=6;q.strokeRect(5,5,310,210);q.fillStyle='#8e2b20';q.textAlign='center';q.font='bold 58px serif';q.fillText('榜',160,74);q.fillStyle='#2b1d12';q.font='bold 30px sans-serif';q.fillText(job.n,160,124,290);q.font='24px sans-serif';q.fillText(dn?'되살렸음 '+starStr(dn.stars):'장인을 구하오',160,168,290);if(dn){q.strokeStyle='#b8322a';q.lineWidth=7;q.beginPath();q.arc(262,64,38,0,7);q.stroke();q.fillStyle='#b8322a';q.font='bold 26px sans-serif';q.fillText('완료',262,74)}tx.needsUpdate=true;beam.visible=!dn;lamp.intensity=dn?9:0};paint();boards.set(job.k,{g,paint})}
function setupMap(){const SP=X.SPOTS;let n=0;for(const s of SP){if(s.go){/* 조달청판에는 유산 마당이 없으므로 들어가기를 끔 */s.go=null;s.t=String(s.t).split(' · ')[0]}}
 for(const job of JOBS){const s=SP.find(q=>q.t===job.city||String(q.t).startsWith(job.city+' '))||SP.find(q=>String(q.t).startsWith(job.city));if(!s){console.warn('고을 없음',job.city);continue}s.jodal=job.k;s.r=Math.max(s.r||3,3.4);job.sp=s;boardAt(job,s);n++}
 return n}

/* ---------- 겉 화면: 진행 상자 ---------- */
const hud=document.createElement('div');hud.id='jdHud';document.body.append(hud);
function hudDraw(){const n=doneN(),nx=JOBS.find(j=>!ST.done[j.k]&&j.sp);hud.innerHTML=`<b>무이 나라 조달청</b><br>되살린 국보 ${n} / ${JOBS.length} · 곳간 ${ST.coins}냥`+(nx?`<br>다음 방 붙일 고을: ${nx.city}(${esc(nx.n)})<br><button type="button" data-go>${nx.city}${josa(nx.city,'으로','로')} 가기</button>`:`<br><button type="button" data-end>의궤 펼쳐 보기</button>`)+` <button type="button" data-cred style="background:#3b2a1c;color:#f3ead6">출처</button>`;
 const b=hud.querySelector('[data-go]');if(b)b.onclick=()=>{try{window.__H3.tp(nx.sp.x,nx.sp.z+1.2,(nx.sp.y||0)+.5);window.__H3.face(Math.PI)}catch(e){}};const e=hud.querySelector('[data-end]');if(e)e.onclick=ending;hud.querySelector('[data-cred]').onclick=()=>{const c=document.getElementById('bCred');if(c)c.click()}}

/* ---------- 1 방 쓰기 ---------- */
function writeBang(job){const u=ov();const pick={crew:null,pay:1,term:1};
 const draw=()=>{u.c.innerHTML=`<h2>${job.city} 고을에 방 붙이기</h2><div>나라의 보물 <b>${esc(job.n)}</b>${josa(job.n,'이','가')} 깨졌어요. 방을 써서 고칠 장인을 구해요.</div>
 <div style="display:flex;gap:12px;align-items:center;justify-content:center;margin:8px 0"><div style="width:120px;height:110px;display:grid;place-items:center;background:radial-gradient(circle at 50% 30%,#8a6e52,#2a1e14 78%);border-radius:10px"><img src="${THUMB(job.k)}" alt="" style="height:96px;filter:grayscale(.85) brightness(.6)"></div><div style="text-align:left;max-width:360px;font-size:14px">${esc(job.why)}</div></div>
 <h3>1. 어떤 장인을 구할까요?</h3><div class="jd-row">${Object.keys(CREW).map(k=>`<button type="button" class="jd-opt ${pick.crew===k?'on':''}" data-crew="${k}"><img src="${FACE(k)}" alt=""><b>${CREW[k]}</b></button>`).join('')}</div>
 <h3>2. 품삯은 얼마로 할까요? <small style="font:13px 'Gowun Dodum',sans-serif;color:#6b4a26">곳간에 ${ST.coins}냥</small></h3><div class="jd-row">${PAY.map(p=>`<button type="button" class="jd-opt ${pick.pay===p.k?'on':''}" data-pay="${p.k}" ${ST.coins<p.c?'disabled':''}><b>${p.n}</b>${p.c}냥</button>`).join('')}</div>
 <h3>3. 기한은 언제까지로 할까요?</h3><div class="jd-row">${TERM.map(p=>`<button type="button" class="jd-opt ${pick.term===p.k?'on':''}" data-term="${p.k}"><b>${p.n}</b>${p.d}</button>`).join('')}</div>
 <div class="jd-bang">${job.city} 고을 백성은 보시오.<br>나라의 보물 <b>${esc(job.n)}</b>${josa(job.n,'을','를')} 되살릴 <b>${pick.crew?CREW[pick.crew]:'〔 장인 〕'}</b>${pick.crew?josa(CREW[pick.crew],'을','를'):'을'} 구하오.<br>품삯은 <b>${PAY[pick.pay].c}냥</b>, 기한은 <b>${TERM[pick.term].n}</b>이오. 솜씨 견본을 들고 조달청으로 오시오.</div>
 <div class="jd-tip">조달청 한마디: 필요한 것을 또렷이 적어야 알맞은 사람이 와요. 오늘의 조달청은 이것을 <b>입찰 공고</b>라고 불러요.</div>
 <div style="margin-top:12px;display:flex;gap:8px;justify-content:center"><button type="button" class="jd-btn" data-ok ${pick.crew?'':'disabled'}>방 붙이기</button><button type="button" class="jd-btn g" data-x>나중에</button></div>`;
  u.c.querySelectorAll('[data-crew]').forEach(b=>b.onclick=()=>{pick.crew=b.dataset.crew;draw()});u.c.querySelectorAll('[data-pay]').forEach(b=>b.onclick=()=>{pick.pay=+b.dataset.pay;draw()});u.c.querySelectorAll('[data-term]').forEach(b=>b.onclick=()=>{pick.term=+b.dataset.term;draw()});
  u.c.querySelector('[data-x]').onclick=u.close;u.c.querySelector('[data-ok]').onclick=()=>{u.close();pickArtisan(job,pick)}};draw()}

/* ---------- 2 찾아온 장인 고르기 ---------- */
function candidates(job,pick){const wrong=pick.crew!==job.need,real=!wrong&&pick.pay>=1&&pick.term>=1;const ck=pick.crew;const base=PAY[pick.pay].c;const L=[];
 if(real)L.push({id:'real',name:'묵묵한 '+CREW[ck],face:ck,say:'견본부터 보시지요. 말은 그다음에 하겠습니다.',pae:true,sample:'good',cost:base,stars:3,npAdd:0});
 L.push({id:'cheap',name:'떠돌이 일꾼',face:ck,say:'반값에 해 드리지요! 견본은… 오다가 좀 깨졌습니다.',pae:false,sample:'bad',cost:Math.round(base*.5),stars:1,npAdd:3});
 L.push({id:'talk',name:'말 잘하는 '+CREW[ck],face:ck,say:'제가 나라에서 으뜸입니다. 견본은 안 가져왔지만 믿으십시오!',pae:false,sample:'none',cost:Math.round(base*1.3),stars:2,npAdd:1});
 if(!real)L.push({id:'cheap2',name:'지나가던 장사꾼',face:ck,say:'고치는 건 처음이지만 손은 빠릅니다.',pae:false,sample:'bad',cost:Math.round(base*.6),stars:1,npAdd:3});
 return{L:L.sort(()=>Math.random()-.5),wrong,real}}
function pickArtisan(job,pick){const u=ov();const C=candidates(job,pick);let sel=null;
 const why=C.wrong?`방에 <b>${CREW[pick.crew]}</b>${josa(CREW[pick.crew],'을','를')} 구한다고 써서 ${CREW[pick.crew]}만 왔어요. ${esc(job.n)}${josa(job.n,'은','는')} ${CREW[job.need]}${josa(CREW[job.need],'이','가')} 고쳐야 해요.`:!C.real?(pick.pay<1?'품삯이 너무 적어서 솜씨 좋은 장인이 오지 않았어요.':'기한이 너무 급해서 솜씨 좋은 장인이 오지 않았어요.'):'';
 const draw=()=>{u.c.innerHTML=`<h2>방을 보고 장인들이 찾아왔어요</h2><div>견본과 자격 패, 품삯을 함께 보고 한 사람을 골라요.</div>${why?`<div class="jd-tip" style="border-color:#b8322a;color:#8e2b20">${why} 방을 고쳐 쓸 수 있어요.</div>`:''}
 <div class="jd-cand" style="margin-top:10px">${C.L.map(a=>`<button type="button" class="jd-c ${sel===a.id?'on':''}" data-a="${a.id}"><img class="f" src="${FACE(a.face)}" alt="" style="${a.id==='real'?'':a.id==='talk'?'filter:saturate(1.5) contrast(1.1)':'filter:grayscale(.5) brightness(.9)'}"><b style="display:block;font:17px 'Do Hyeon',sans-serif">${a.name}</b><div class="s">${a.sample==='none'?'<span style="color:#d8cbb0">견본 없음</span>':`<img src="${THUMB(job.k)}" alt="" style="${a.sample==='bad'?'filter:grayscale(.7) brightness(.55) blur(.6px)':''}">`}${a.sample==='bad'?'<span style="position:absolute;inset:0;background:linear-gradient(115deg,transparent 46%,rgba(20,10,5,.9) 47%,rgba(20,10,5,.9) 49%,transparent 50%),linear-gradient(60deg,transparent 58%,rgba(20,10,5,.85) 59%,rgba(20,10,5,.85) 60.5%,transparent 61.5%)"></span>':''}</div><div>견본: <b>${a.sample==='good'?'매끈하게 고친 조각':a.sample==='bad'?'금이 간 조각':'없음'}</b></div><div><span class="jd-pae" style="${a.pae?'background:#2f6a4a;color:#fff':'background:#d8cbb0;color:#5a4a3a'}">${a.pae?'나라 장인 패 있음':'장인 패 없음'}</span></div><div>품삯 <b>${a.cost}냥</b></div><div style="margin-top:4px;color:#5a3a12">“${a.say}”</div></button>`).join('')}</div>
 <div class="jd-tip">조달청 한마디: 값이 싸다고, 말을 잘한다고 맡기면 안 돼요. 솜씨와 자격을 함께 보는 것을 오늘의 조달청은 <b>적격 심사</b>라고 해요.</div>
 <div style="margin-top:12px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><button type="button" class="jd-btn" data-ok ${sel?'':'disabled'}>수결하고 맡기기</button><button type="button" class="jd-btn g" data-re>방 고쳐 쓰기</button></div>`;
  u.c.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{sel=b.dataset.a;draw()});u.c.querySelector('[data-re]').onclick=()=>{u.close();writeBang(job)};
  u.c.querySelector('[data-ok]').onclick=()=>{const a=C.L.find(x=>x.id===sel);if(ST.coins<a.cost){X.hint('곳간의 냥이 모자라요.',2500);return}/* 수결 도장 */const s=document.createElement('div');s.textContent='手決';s.style.cssText='position:fixed;left:50%;top:44%;z-index:40;margin:-70px 0 0 -70px;width:140px;height:140px;border:8px solid #b8322a;border-radius:14px;color:#b8322a;display:grid;place-items:center;font:700 54px "Noto Serif KR",serif;background:rgba(255,250,240,.9);animation:jdStamp .5s ease-out forwards';document.body.append(s);setTimeout(()=>{s.remove();u.close();startRestore(job,pick,a,C.wrong)},1100)}};draw()}

/* ---------- 3 복원 ---------- */
function startRestore(job,pick,a,wrong){ST.coins-=a.cost;save();hudDraw();const npAdd=(a.npAdd||0)+(wrong?2:0);
 X.mgOpen(function restore(ctx){X.restoreGame(ctx,job.k,{jodal:{npAdd,done:(Q,miss,sec)=>ledger(job,pick,a,wrong,Q)}});setTimeout(()=>{try{ctx.say(a.id==='real'&&!wrong?'솜씨 좋은 장인이 조각을 곱게 다듬어 왔어요. 맞추기만 하면 돼요!':wrong?'전공이 다른 장인이라 조각이 더 잘게 부서졌어요. 그래도 끝까지 맞춰 봐요.':'서툰 손이 거들다가 조각이 더 깨졌어요. 조심조심 맞춰요.')}catch(e){}},1600)})}

/* ---------- 4 의궤 한 장 ---------- */
function ledger(job,pick,a,wrong,Q){const qs=Q>=90?3:Q>=70?2:1;const stars=Math.max(1,Math.min(qs,wrong?1:a.stars));ST.done[job.k]={crew:pick.crew,who:a.name,cost:a.cost,term:pick.term,stars,q:Q,wrong};save();hudDraw();const B=boards.get(job.k);if(B)B.paint();
 const u=ov();const all=doneN()===JOBS.length;
 u.c.innerHTML=`<h2>의궤에 적었어요</h2><div style="background:#fbf3dc;border:2px solid #3b2a1c;border-radius:6px;padding:14px;margin:8px auto;max-width:560px;display:grid;grid-template-columns:150px 1fr;gap:12px;align-items:center;text-align:left;box-shadow:0 6px 14px rgba(0,0,0,.25)"><div style="height:150px;display:grid;place-items:center;background:radial-gradient(circle at 50% 30%,#8a6e52,#2a1e14 78%);border-radius:8px"><img src="${THUMB(job.k)}" alt="" style="height:132px"></div><div style="font:15.5px/1.75 'Noto Serif KR',serif"><b style="font:22px 'Do Hyeon',sans-serif;color:#8e2b20">${esc(job.n)}</b><br>고을: ${job.city}<br>맡은 이: ${esc(a.name)}<br>품삯: ${a.cost}냥 · 기한: ${TERM[pick.term].n}<br>솜씨: <span style="color:#c98a12;font-size:20px;letter-spacing:2px">${starStr(stars)}</span></div></div>
 <div class="jd-tip">${stars>=3?'알맞은 장인을 제값에 맡겨 국보가 온전히 되살아났어요.':wrong?'전공이 다른 장인에게 맡겨 흠이 남았어요. 방에 필요한 장인을 또렷이 적으면 더 잘 고칠 수 있어요.':a.id==='cheap'||a.id==='cheap2'?'값만 보고 맡겼더니 흠이 남았어요. 견본과 자격 패를 함께 보면 더 잘 고칠 수 있어요.':a.id==='talk'?'말만 믿고 맡겼더니 조금 아쉬워요. 견본을 꼭 보고 골라요.':'조각을 더 꼼꼼히 맞추면 별을 더 받을 수 있어요.'}<br>조달청 한마디: 누가, 무엇을, 얼마에 했는지 남김없이 적어 두는 것을 오늘의 조달청은 <b>계약 정보 공개</b>라고 해요.</div>
 <div style="margin-top:12px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><button type="button" class="jd-btn" data-ok>${all?'의궤 펼쳐 보기':'다음 고을로'}</button>${stars<3?'<button type="button" class="jd-btn g" data-re>이 국보 다시 맡기기</button>':''}</div>`;
 u.c.querySelector('[data-ok]').onclick=()=>{u.close();if(all)ending()};const r=u.c.querySelector('[data-re]');if(r)r.onclick=()=>{u.close();ST.coins+=a.cost;delete ST.done[job.k];save();hudDraw();if(B)B.paint();writeBang(job)}}

/* ---------- 5 맺음 ---------- */
function ending(){const u=ov();const tot=JOBS.reduce((s,j)=>s+(ST.done[j.k]?ST.done[j.k].stars:0),0),mx=JOBS.length*3;
 u.c.innerHTML=`<h2>무이 나라 의궤가 완성됐어요</h2><div>다섯 국보가 모두 되살아나 나라가 환해졌어요. 솜씨 별 <b style="color:#c98a12">${tot} / ${mx}</b> · 곳간에 남은 냥 <b>${ST.coins}</b></div>
 <div style="display:flex;justify-content:center;gap:6px;flex-wrap:wrap;margin:10px 0">${JOBS.map(j=>`<div style="width:104px"><div style="height:92px;display:grid;place-items:center;background:radial-gradient(circle at 50% 30%,#8a6e52,#2a1e14 78%);border-radius:8px"><img src="${THUMB(j.k)}" alt="" style="height:80px"></div><small>${esc(j.n)}<br><span style="color:#c98a12">${ST.done[j.k]?starStr(ST.done[j.k].stars):'☆☆☆'}</span></small></div>`).join('')}</div>
 <h3 style="text-align:center">무이 나라에서 한 일, 오늘의 조달청에서는</h3>
 <table style="margin:0 auto;border-collapse:collapse;font-size:14.5px;text-align:left">${[['방 붙이기','입찰 공고','나라에 필요한 것을 누구나 볼 수 있게 알려요'],['장인 고르기','적격 심사','값만이 아니라 솜씨와 자격을 함께 봐요'],['수결','계약','약속을 글로 남기고 서로 지켜요'],['조각 살피기','검수','받은 물건이 약속대로인지 확인해요'],['의궤에 적기','계약 정보 공개','누가 무엇을 얼마에 했는지 모두에게 알려요']].map(r=>`<tr><td style="padding:4px 10px;border-bottom:1px solid #d8c8a0"><b>${r[0]}</b></td><td style="padding:4px 10px;border-bottom:1px solid #d8c8a0;color:#8e2b20"><b>${r[1]}</b></td><td style="padding:4px 10px;border-bottom:1px solid #d8c8a0">${r[2]}</td></tr>`).join('')}</table>
 <p style="margin:12px 0 4px;font:17px 'Do Hyeon',sans-serif;color:#3b2a1c">나라 살림은 예나 지금이나 공정하고 투명하게.<br>오늘도 조달청이 나라에 필요한 것을 바르게 구하고 있어요.</p>
 <div style="margin-top:10px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><button type="button" class="jd-btn" data-x>지도 둘러보기</button><button type="button" class="jd-btn g" data-new>처음부터 다시</button></div>`;
 u.c.querySelector('[data-x]').onclick=u.close;u.c.querySelector('[data-new]').onclick=()=>{ST={coins:START,done:{},intro:1};save();for(const b of boards.values())b.paint();hudDraw();u.close()}}

/* ---------- 여는 글 ---------- */
function intro(){const u=ov();u.c.innerHTML=`<h2>무이 나라 조달청</h2><div style="display:flex;justify-content:center;gap:4px;margin:6px 0">${['crown','maebyeong','angbu','najeonham','moonjar'].map(k=>`<div style="width:92px;height:92px;display:grid;place-items:center;background:radial-gradient(circle at 50% 30%,#8a6e52,#2a1e14 78%);border-radius:10px"><img src="${THUMB(k)}" alt="" style="height:80px;filter:grayscale(.85) brightness(.6)"></div>`).join('')}</div>
 <p style="margin:6px 0;text-align:left">무이 나라는 옛 보물을 되살리는 일을 가장 귀하게 여기는 나라예요. 그런데 다섯 고을의 국보가 깨지고 말았어요.</p><p style="margin:6px 0;text-align:left">당신은 나라 살림을 맡은 <b>조달청</b>의 새내기 무이예요. 고을마다 <b>방(榜)</b>을 붙여 장인을 구하고, 알맞은 사람에게 맡겨 국보를 되살려 주세요. 곳간의 냥은 ${START}냥뿐이니 아껴 써야 해요.</p>
 <div class="jd-tip">하는 법: 빛기둥이 선 고을로 가서 「방 붙이기」를 눌러요. 왼쪽 위 상자의 단추로 다음 고을에 바로 갈 수 있어요.</div><div style="margin-top:12px"><button type="button" class="jd-btn" data-ok>첫 방 붙이러 가기</button></div>`;
 u.c.querySelector('[data-ok]').onclick=()=>{u.close();ST.intro=1;save();const nx=JOBS.find(j=>!ST.done[j.k]&&j.sp);if(nx)try{window.__H3.tp(nx.sp.x,nx.sp.z+1.2,(nx.sp.y||0)+.5);window.__H3.face(Math.PI)}catch(e){}}}

/* ---------- 문 ---------- */
window.__JODAL={label:s=>{const j=JOBS.find(x=>x.k===s.jodal);return ST.done[j.k]?`${j.city} · 의궤 보기 ${starStr(ST.done[j.k].stars)}`:`${j.city} · 방 붙이기 ✦`},
 open:s=>{const j=JOBS.find(x=>x.k===s.jodal);if(!j)return;const d=ST.done[j.k];if(d){const u=ov();u.c.innerHTML=`<h2>${j.city} 의궤</h2><div><b>${esc(j.n)}</b> · 맡은 이 ${esc(d.who)} · 품삯 ${d.cost}냥 · 솜씨 <span style="color:#c98a12">${starStr(d.stars)}</span></div><div style="margin-top:12px;display:flex;gap:8px;justify-content:center"><button type="button" class="jd-btn g" data-x>닫기</button>${d.stars<3?'<button type="button" class="jd-btn" data-re>다시 맡기기</button>':''}</div>`;u.c.querySelector('[data-x]').onclick=u.close;const r=u.c.querySelector('[data-re]');if(r)r.onclick=()=>{u.close();ST.coins+=d.cost;delete ST.done[j.k];save();hudDraw();const B=boards.get(j.k);if(B)B.paint();writeBang(j)};return}writeBang(j)},
 state:()=>JSON.parse(JSON.stringify(ST)),jobs:()=>JOBS.map(j=>({k:j.k,city:j.city,ok:!!j.sp,x:j.sp&&j.sp.x,z:j.sp&&j.sp.z,y:j.sp&&j.sp.y})),reset:()=>{ST={coins:START,done:{},intro:0};save();hudDraw();for(const b of boards.values())b.paint()},ending,intro};
(function boot(n){const H=window.__H3;if(!H||!H.me||!X.SPOTS||X.SPOTS.length<5){if(n<200)setTimeout(()=>boot(n+1),250);return}try{const c=setupMap();hudDraw();const tt=document.getElementById('ttl');if(tt)tt.textContent='무이 나라 조달청';setInterval(()=>{const t2=document.getElementById('ttl');if(t2&&t2.textContent!=='무이 나라 조달청')t2.textContent='무이 나라 조달청'},1500);if(!ST.intro&&c)setTimeout(intro,900)}catch(e){console.error('조달청판 준비',e)}})(0);
