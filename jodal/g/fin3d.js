/* 무이 나라 조달청: 유물마다 다른 마지막 손질(3D). 만든 날 2026-11-16
   복원대(restore3d.js) 장면을 닫지 않고, 같은 장면의 실제 유물 3D 모델 위에서 손질한다.
   한 고을 = 조달 사건(고르기) 하나 + 그 유물만의 3D 손질 하나 + 조달 도감 카드 한 장.
   경주 금관: 비축사업 → 실제 금관 가지 끝에 달개·곡옥 걸기
   강진 매병: 품질 검사 → 매병 표면의 메운 자리에 유약 색 맞추고 가마 불로 굽기
   서울 앙부일구: 혁신제품 시범구매 → 금빛 영침을 37.5도로 세우고, 해를 옮겨 그림자를 午 선에
   통영 나전칠함: 중소기업 우선구매 → 뚜껑에 자개 꽃잎 끼우고 결 맞추기, 옻칠 세 번(광택이 실제로 오름)
   이천 달항아리: 공동수급 → 위아래로 갈라 띄운 항아리를 가운데로 옮기고 돌려 쇳물 점을 맞춰 잇기
   시험용 문: window.__JDSP.auto() 가 알맞은 고르기와 손질 완성을 대신 하고, dbg() 로 화면 좌표를 준다. */
export const CARDS={
 bid:{n:'담합 금지',d:'입찰에 나온 사람들이 미리 짜고 값을 정하는 것을 담합이라고 해요. 나라 돈을 축내므로 금지되고, 걸리면 일정 기간 나라 입찰에 나올 수 없어요(부정당업자 제재).'},
 crown:{n:'비축사업',d:'조달청은 구리·알루미늄 같은 원자재를 미리 사 두었다가, 값이 크게 오르거나 모자랄 때 기업에 풀어요.'},
 maebyeong:{n:'품질 검사',d:'나라가 사는 물건이 약속한 규격과 품질에 맞는지 살펴요. 맞지 않으면 받지 않아요.'},
 angbu:{n:'혁신제품 시범구매',d:'새 기술로 만든 물건은 써 본 곳이 없어 팔기 어려워요. 조달청이 혁신제품으로 정하면 나라 기관이 먼저 사서 써 볼 수 있어요.'},
 najeonham:{n:'중소기업 우선구매',d:'나라 기관은 중소기업 제품을 일정 비율 이상 사야 해요. 작은 공방도 나라 일을 맡을 수 있게 길을 여는 거예요.'},
 stock:{n:'물자 관리',d:'조달청은 나라에 꼭 필요한 물자를 미리 사서 창고에 비축해 두고 관리해요. 무거운 것은 아래, 가벼운 것은 위에 쌓아야 안전하고 꺼내기도 쉬워요.'},
 ferry:{n:'납품 운송',d:'나라와 맺은 계약은 물건을 정한 날짜까지 정한 곳에 상하지 않게 대야 끝나요. 늦으면 지체상금을 물고, 상한 물건은 검수에서 받지 않아요.'},
 export:{n:'해외 조달 시장',d:'조달청은 우리 중소기업의 좋은 물건이 다른 나라 정부의 조달 시장에도 나갈 수 있게 길을 열어 줘요. 나라 밖에서도 주문한 규격을 꼼꼼히 지켜야 믿고 사요.'},
 build:{n:'시설 공사',d:'조달청은 물건뿐 아니라 다리·학교 같은 시설 공사도 계약해요. 설계서대로 짓는지 감리가 살피고, 다 지으면 준공 검사를 통과해야 공사가 끝나요.'},
 disaster:{n:'재난 대비 조달',d:'큰 눈·가뭄 같은 재해가 오면 조달청은 비축해 둔 물자를 풀고, 꼭 필요한 장비와 물자를 긴급 구매로 빠르게 사서 보내요.'},
 venture:{n:'벤처나라',d:'조달청은 벤처나라 같은 판로를 열어, 새로 생긴 작은 기업의 물건도 나라 기관이 사 쓸 수 있게 도와요. 나라 일을 맡으며 작은 기업이 자라요.'},
 watch:{n:'공정 조달 감시',d:'조달청은 담합 같은 불공정 행위를 살피고, 신고를 받아 조사해요. 걸린 업체는 한동안 나라 입찰에 나올 수 없어요.'},
 econtract:{n:'전자 계약',d:'옛날엔 계약서를 말로 날라 며칠씩 걸렸어요. 오늘은 나라장터 전자 계약으로 서명한 계약서가 곧바로 닿고, 기록도 남아 누구나 확인할 수 있어요.'},
 excellent:{n:'우수조달물품',d:'조달청은 기술과 품질이 뛰어난 물건을 우수조달물품으로 정해 나라 기관이 믿고 살 수 있게 해요. 시험 성적서와 인증 같은 서류로 품질을 먼저 확인해요.'},
 rauction:{n:'역경매',d:'나라장터 역경매는 공급자들이 값을 실시간으로 낮춰 부르고 가장 낮은 값이 낙찰돼요. 다만 품질과 자격을 갖춘 곳만 참여해야 나라 돈이 제대로 쓰여요.'},
 transfer:{n:'물품 관리전환',d:'나라가 가진 물품은 등록해 관리하고, 쓰임이 바뀌면 필요한 다른 기관으로 옮겨 다시 써요. 새로 사지 않고 아껴 쓰는 나라 살림이에요.'},
 safety:{n:'공사 안전 관리',d:'나라 공사를 맡기면 현장이 안전하게 지어지는지도 살펴요. 일꾼이 다치지 않고 사고 없이 짓는 것이 좋은 공사예요.'},
 reserve:{n:'원자재 비축',d:'조달청은 구리·알루미늄 같은 원자재를 미리 사 두었다가, 값이 크게 오르거나 구하기 어려울 때 중소기업에 풀어 줘요.'},
 direct:{n:'직접생산 확인',d:'중소기업끼리 경쟁하는 물품은 직접 만드는 중소기업만 공공기관에 납품할 수 있어요. 그래서 공장에 가서 정말 직접 만드는지 살펴봐요.'},
 local:{n:'지역 업체 우대',d:'고을의 작은 공사는 그 고을 업체에도 기회를 줘요(지역제한 입찰). 다만 솜씨와 값의 기준은 똑같이 지켜요.'},
 narajangteo:{n:'나라장터',d:'나라장터는 나라의 전자 조달 장터예요. 공공기관의 입찰 공고와 견적, 계약이 한곳에서 이뤄지고 누구나 볼 수 있어요.'},
 fraud:{n:'불량 납품 제재',d:'약속과 다른 물건을 몰래 납품하면 검수에서 걸러 받지 않아요. 속인 업체는 일정 기간 나라 입찰에 나올 수 없어요(부정당업자 제재).'},
 emergency:{n:'긴급 조달',d:'큰비나 산불 같은 재난 때는 입찰 공고 기간을 줄이는 긴급 입찰로 필요한 물자를 빨리 구해요. 미리 쌓아 둔 비축 물자도 바로 풀어요.'},
 moonjar:{n:'공동수급',d:'혼자 맡기 큰 일은 여러 업체가 힘을 모아 한 계약을 함께 맡을 수 있어요(공동계약).'}};
const EV={
 crown:{t:'달개 달기',ev:'금관 가지에 달 금빛 달개를 엮을 금실이 모자라요. 장터에서는 금실 값이 갑자기 세 배로 뛰었어요.',
  ch:[{id:'stock',lab:'나라 비축 곳간에서 꺼내기',sub:'제값 5냥',cost:5,good:1,say:'미리 사 둔 금실을 제값에 꺼냈어요. 값이 뛸 때를 대비해 재료를 쌓아 두는 일, 조달청의 비축사업이에요.'},
      {id:'market',lab:'장터에서 바로 사기',sub:'뛴 값 15냥',cost:15,say:'급하게 비싼 값을 치렀어요. 나라에는 이런 때를 위한 비축 곳간이 있어요.'}]},
 maebyeong:{t:'비색 맞추기',ev:'메운 자리에 입힐 유약 세 통이 들어왔어요. 견본 비색과 견주어 맞는 통만 받아요.',
  ch:[{id:'a',lab:'첫째 통',sw:'#4f8796',bad:1,say:'너무 파래요. 견본과 다르니 돌려보내요.'},
      {id:'b',lab:'둘째 통',sw:'#9ab9a4',good:1,say:'견본 비색과 같아요. 약속한 품질대로 들어온 것을 확인했어요. 이것이 조달청의 품질 검사예요.'},
      {id:'c',lab:'셋째 통',sw:'#a8946a',bad:1,say:'누런 기가 돌아요. 견본과 다르니 돌려보내요.'}],sample:'#9ab9a4'},
 angbu:{t:'영침과 그림자',ev:'젊은 과학 장인이 새로 만든 「방위 잡이 자석 바늘」을 들고 왔어요. 아직 써 본 곳이 한 군데도 없대요.',
  ch:[{id:'try',lab:'시범으로 사서 써 보기',sub:'10냥 · 영침 길잡이가 생겨요',cost:10,good:1,tool:1,say:'나라가 먼저 사서 써 보니 새 도구도 판로가 생겨요. 조달청의 혁신제품 시범구매예요.'},
      {id:'no',lab:'쓰지 않고 해 보기',sub:'0냥 · 길잡이 없이',cost:0,say:'새 도구 없이 해 봐요. 새 기술은 누군가 먼저 써 줘야 자라요.'}]},
 najeonham:{t:'자개와 옻칠',ev:'떨어진 자개 꽃잎을 새로 대어 줄 곳을 골라요. 두 곳 모두 값과 솜씨가 같아요.',
  ch:[{id:'big',lab:'큰 상단에 맡기기',sub:'값·솜씨 같음',say:'큰 상단도 좋지만, 나라는 작은 공방에도 일을 나눠 줘야 해요.'},
      {id:'small',lab:'통영 작은 자개 공방에 맡기기',sub:'값·솜씨 같음 · 우선구매 가점',good:1,bonus:2,say:'작은 공방이 나라 일을 맡았어요. 나라 기관이 중소기업 제품을 먼저 사는 중소기업 우선구매예요.'}]},
 moonjar:{t:'위아래 잇기',ev:'달항아리는 위 사발과 아래 사발을 따로 빚어 이어 붙여요. 이번 일은 큰일이라 두 도공이 함께 맡았어요.',
  ch:[{id:'joint',lab:'두 도공에게 함께 맡기기',sub:'위는 김 도공, 아래는 박 도공',good:1,say:'혼자 맡기 큰 일을 두 사람이 한 계약으로 함께 맡았어요. 이것을 공동수급이라고 해요.'}]}};
const TASK={crown:tCrown,maebyeong:tCeladon,angbu:tAngbu,najeonham:tNajeon,moonjar:tMoonjar};

const css=document.createElement('style');css.textContent=`
.f3-p{position:absolute;left:50%;bottom:calc(env(safe-area-inset-bottom) + 16px);transform:translateX(-50%);z-index:6;width:min(640px,94vw);max-height:52vh;overflow:auto;box-sizing:border-box;background:rgba(243,234,214,.97);border:3px solid #d8a838;border-radius:16px;padding:12px 14px;font:15px/1.55 "Gowun Dodum",sans-serif;color:#2b1d12;text-align:center;box-shadow:0 8px 24px rgba(0,0,0,.45)}
.f3-p h3{margin:0 0 4px;font:21px "Do Hyeon",sans-serif;color:#8e2b20}
.f3-ch{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-top:8px}
.f3-ch button{padding:8px 6px;border-radius:12px;border:2px solid #c8b890;background:#fffaf0;cursor:pointer;font:13.5px/1.4 "Gowun Dodum",sans-serif;color:#2b1d12}.f3-ch button b{display:block;font:16px "Do Hyeon",sans-serif}.f3-ch button:disabled{opacity:.45}
.f3-ctl{position:absolute;left:50%;bottom:calc(env(safe-area-inset-bottom) + 70px);transform:translateX(-50%);z-index:6;display:flex;gap:12px;align-items:center;flex-wrap:wrap;justify-content:center;background:rgba(20,14,8,.78);border:2px solid #d8a838;border-radius:14px;padding:8px 14px;color:#f3ead6;font:14px "Gowun Dodum",sans-serif;width:max-content;max-width:94vw;box-sizing:border-box}
.f3-ctl input[type=range]{width:min(200px,38vw);accent-color:#d8a838}
.f3-ctl .sw{display:inline-block;width:30px;height:30px;border-radius:50%;border:2px solid #f3ead6;vertical-align:middle}
.f3-btn{font:16px "Do Hyeon",sans-serif;padding:8px 16px;border-radius:12px;border:0;background:#8e2b20;color:#fff4dc;cursor:pointer}.f3-btn:disabled{opacity:.45;cursor:default}
.f3-card{margin-top:8px;padding:8px 12px;border-radius:10px;background:#3b2a1c;color:#f3ead6;text-align:left;font:13.5px/1.55 "Gowun Dodum",sans-serif;border:2px solid #d8a838}.f3-card b{font:17px "Do Hyeon",sans-serif;color:#f2d27a}`;document.head.append(css);

/* ---------- 바깥 문: 복원대 장면(F)에서 부름. 결과 {q,ch,good} ---------- */
export function fin3d(job,E,F){return new Promise(res=>{const D=EV[job.k],T=TASK[job.k];if(!D||!T)return res({q:0});
 const THREE=F.THREE,ui=F.ui;let chosen=null,miss=0,task=null,ctl=null;
 F.set({});F.view({yaw:0,pitch:.3});
 const panel=document.createElement('div');panel.className='f3-p';ui.o.append(panel);
 const head=(a,b)=>F.head(a,b);
 const evDraw=msg=>{head('마지막 손질 · '+D.t,job.city);panel.style.display='block';panel.innerHTML=`<h3>${job.city} · 마지막 손질: ${D.t}</h3><div>${D.ev}</div>
  <div class="f3-ch">${D.ch.map(c=>`<button type="button" data-ch="${c.id}" ${c.cost&&E.coins()<c.cost?'disabled':''}>${c.sw?`<span style="display:block;width:40px;height:40px;margin:2px auto 6px;border-radius:50%;background:${c.sw};border:2px solid #3b2a1c"></span>`:''}<b>${c.lab}</b>${c.sub||''}</button>`).join('')}${D.sample?`<button type="button" disabled style="opacity:1;border-style:dashed"><span style="display:block;width:40px;height:40px;margin:2px auto 6px;border-radius:50%;background:${D.sample};border:3px double #8e2b20"></span><b>견본 비색</b>조달청이 정한 규격</button>`:''}</div>
  ${msg?`<div style="margin-top:8px;color:#8e2b20">${msg}</div>`:''}`;panel.querySelectorAll('[data-ch]').forEach(b=>b.onclick=()=>pick(b.dataset.ch))};
 const pick=id=>{const c=D.ch.find(x=>x.id===id);if(!c||chosen)return;if(c.bad){miss++;E.SND.paper();evDraw(c.say);return}chosen=c;if(c.cost)E.pay(c.cost);E.SND.coin();
  panel.innerHTML=`<h3>${D.t}</h3><div>${c.say}</div><div style="margin-top:10px"><button type="button" class="f3-btn" data-go>손질 시작</button></div>`;panel.querySelector('[data-go]').onclick=start};
 const start=()=>{panel.style.display='none';ctl=document.createElement('div');ctl.className='f3-ctl';ctl.style.display='none';ui.o.append(ctl);
  const api={THREE,F,E,ctl,tool:!!(chosen&&chosen.tool),say:(a,b)=>head(a,b||'빈 곳을 끌면 돌려 봐요'),miss:()=>{miss++},snd:E.SND,
   done:q=>{F.set({frame:task&&task.frame,down:orbitDown,move:orbitMove,up:orbitUp});ctl.remove();E.SND.light();F.shake(.05);
    panel.style.display='block';panel.innerHTML=`<h3>${D.t} 끝!</h3><div class="f3-card"><b>조달 도감 카드가 열렸어요 · ${CARDS[job.k].n}</b><br>${CARDS[job.k].d}</div><div style="margin-top:10px"><button type="button" class="f3-btn" data-ok>의궤에 적기</button></div>`;
    panel.querySelector('[data-ok]').onclick=()=>{panel.remove();window.__JDSP=null;res({q:Math.max(0,Math.min(8,q+(chosen.bonus||0)-miss)),ch:chosen.id,good:!!chosen.good})}}};
  task=T(api);F.set(task)};
 /* 빈 곳 끌어 돌려 보기(손질이 안 잡을 때) */let ob=null;const orbitDown=e=>{const v=F.getView();ob={x:e.clientX,y:e.clientY,yaw:v.yaw,pitch:v.pitch}};const orbitMove=e=>{if(!ob)return;F.view({yaw:ob.yaw-(e.clientX-ob.x)*.008,pitch:Math.max(-.2,Math.min(1.3,ob.pitch+(e.clientY-ob.y)*.006))})};const orbitUp=()=>{ob=null};
 F.set({down:orbitDown,move:orbitMove,up:orbitUp});
 window.__JDSP={auto:()=>{if(!chosen){const c=D.ch.find(x=>x.good)||D.ch[0];pick(c.id)}const go=panel.querySelector('[data-go]');if(go)go.click();setTimeout(()=>task&&task.solve&&task.solve(),300)},choose:id=>pick(id),go:()=>{const go=panel.querySelector('[data-go]');if(go)go.click()},solve:()=>task&&task.solve&&task.solve(),dbg:()=>task&&task.dbg&&task.dbg()};
 E.SND.paper();evDraw()})}

/* ---------- 공통 도구 ---------- */
function kit(api){const {THREE,F}=api;const ray=new THREE.Raycaster(),mv=new THREE.Vector2();
 const rect=()=>F.R.domElement.getBoundingClientRect();
 const setRay=e=>{const r=rect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,F.cam);return ray};
 const scr=v=>{const r=rect(),p=v.clone().project(F.cam);return[r.left+(p.x+1)/2*r.width,r.top+(1-p.y)/2*r.height]};
 const meshes=F.meshes();const box=new THREE.Box3();for(const m of meshes)box.expandByObject(m);
 const verts=(step=1)=>{const L=[];for(const m of meshes){const P=m.geometry.attributes.position;m.updateMatrixWorld();for(let i=0;i<P.count;i+=step){const v=new THREE.Vector3().fromBufferAttribute(P,i).applyMatrix4(m.matrixWorld);L.push(v)}}return L};
 const hitModel=(o,d,all)=>{ray.set(o,d.clone().normalize());const h=ray.intersectObjects(meshes,false);return all?h:h[0]||null};
 /* 카메라를 보는 평면 위로 끌기 */const pl=new THREE.Plane(),hp=new THREE.Vector3();const dragTo=(e,through)=>{pl.setFromNormalAndCoplanarPoint(F.cam.getWorldDirection(new THREE.Vector3()).negate(),through);setRay(e);return ray.ray.intersectPlane(pl,hp)?hp.clone():null};
 const orbit={o:null,down:e=>{const v=F.getView();orbit.o={x:e.clientX,y:e.clientY,yaw:v.yaw,pitch:v.pitch}},move:e=>{const o=orbit.o;if(!o)return false;F.view({yaw:o.yaw-(e.clientX-o.x)*.008,pitch:Math.max(-.2,Math.min(1.35,o.pitch+(e.clientY-o.y)*.006))});return true},up:()=>{orbit.o=null}};
 const ringTex=(col)=>{const c=document.createElement('canvas');c.width=c.height=64;const q=c.getContext('2d');q.strokeStyle=col;q.lineWidth=7;q.shadowColor=col;q.shadowBlur=10;q.beginPath();q.arc(32,32,20,0,7);q.stroke();return new THREE.CanvasTexture(c)};
 const label=(txt,col='#ffe7a8',px=56)=>{const c=document.createElement('canvas');c.width=c.height=96;const q=c.getContext('2d');q.font=`bold ${px}px "Noto Serif KR",serif`;q.textAlign='center';q.textBaseline='middle';q.lineWidth=8;q.strokeStyle='rgba(20,10,4,.85)';q.strokeText(txt,48,50);q.fillStyle=col;q.fillText(txt,48,50);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false,transparent:true}));s.renderOrder=9;return s};
 return{ray,setRay,scr,meshes,box,verts,hitModel,dragTo,orbit,ringTex,label}}

/* ---------- 경주 금관: 실제 금관 가지 끝에 달개·곡옥 걸기 ---------- */
function tCrown(api){const {THREE,F}=api,K=kit(api),H=F.H,sc=F.sc;const S=H*.048;const G=new THREE.Group();sc.add(G);
 /* 걸 고리: 금관 윗부분 꼭짓점을 가로로 여덟 칸으로 나눠 칸마다 가장 높은 점보다 조금 아래 */
 const V=K.verts(3).filter(v=>v.y>K.box.min.y+H*.45);const x0=K.box.min.x,x1=K.box.max.x,NB=8,bins=[...Array(NB)].map(()=>null);
 for(const v of V){const b=Math.min(NB-1,Math.max(0,Math.floor((v.x-x0)/(x1-x0)*NB)));if(!bins[b]||v.y>bins[b].y)bins[b]=v}
 const hooks=bins.filter(Boolean).map((v,i,a)=>({p:v.clone().add(new THREE.Vector3(0,-H*.06,0)),t:(i===0||i===a.length-1)?'j':'g',used:0}));
 for(const h of hooks){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:K.ringTex(h.t==='j'?'#5ff0a0':'#ffe08a'),depthTest:false,transparent:true}));s.scale.setScalar(S*2.6);s.position.copy(h.p);s.renderOrder=8;G.add(s);h.mark=s}
 const gold=new THREE.MeshStandardMaterial({color:0xf2c14e,metalness:.95,roughness:.22,side:THREE.DoubleSide,envMapIntensity:1.4});
 const jade=new THREE.MeshPhysicalMaterial({color:0x2f9a64,roughness:.18,metalness:0,clearcoat:1,clearcoatRoughness:.1,sheen:.4});
 const mkG=()=>{const g=new THREE.Group();const d=new THREE.Mesh(new THREE.CylinderGeometry(S,S,S*.08,24),gold);d.rotation.x=Math.PI/2;d.position.y=-S*1.2;g.add(d);const w=new THREE.Mesh(new THREE.CylinderGeometry(S*.06,S*.06,S*1.2,6),gold);w.position.y=-S*.6;g.add(w);return g};
 const mkJ=()=>{const g=new THREE.Group();const head=new THREE.Mesh(new THREE.SphereGeometry(S*.78,20,14),jade);head.position.y=-S*1.4;g.add(head);const tail=new THREE.Mesh(new THREE.TorusGeometry(S*.9,S*.42,12,20,Math.PI*.9),jade);tail.position.set(S*.62,-S*2.0,0);tail.rotation.z=Math.PI*.95;g.add(tail);const w=new THREE.Mesh(new THREE.CylinderGeometry(S*.06,S*.06,S*.9,6),gold);w.position.y=-S*.45;g.add(w);return g};
 const nG=hooks.filter(h=>h.t==='g').length,nJ=hooks.length-nG;const items=[];const N=nG+nJ,ty=K.box.min.y+.03,tz=K.box.max.z+H*.35;
 for(let i=0;i<N;i++){const t=i<nG?'g':'j';const g=t==='g'?mkG():mkJ();const home=new THREE.Vector3(x0+(x1-x0)*(i+.5)/N,ty+S*2.4,tz);g.position.copy(home);g.userData={t,home,h:null,a:0,v:0};G.add(g);items.push(g)}
 /* 쟁반 */{const tr=new THREE.Mesh(new THREE.BoxGeometry(x1-x0+H*.2,S*.4,S*5),new THREE.MeshStandardMaterial({color:0x5a3a22,roughness:.8}));tr.position.set((x0+x1)/2,ty,tz);G.add(tr)}
 F.view({yaw:0,pitch:.25,ty:K.box.min.y+H*.55});api.say('금빛 달개는 금빛 고리에, 초록 곡옥은 초록 고리에 끌어다 걸어요');
 let drag=null,fin=false;
 const hang=(g,h)=>{g.userData.h=h;h.used=1;h.mark.visible=false;g.position.copy(h.p);g.userData.v=.35;api.snd.coin();F.puff(h.p,F.GOLD,18,.8,.4,.3)};
 const check=()=>{const left=items.filter(g=>!g.userData.h).length;if(left)api.say(`잘 걸렸어요! 남은 장식 ${left}개`);else if(!fin){fin=true;api.say('달개가 살랑이며 반짝여요. 금관이 제 모습을 찾았어요!','');setTimeout(()=>api.done(5),900)}};
 return{
  down:e=>{if(fin){K.orbit.down(e);return}K.setRay(e);const h=K.ray.intersectObjects(items.filter(g=>!g.userData.h),true)[0];if(!h){K.orbit.down(e);return}let g=h.object;while(g.parent&&!items.includes(g))g=g.parent;drag=g;F.R.domElement.setPointerCapture(e.pointerId)},
  move:e=>{if(drag){const p=K.dragTo(e,hooks[0].p);if(p)drag.position.copy(p);return}K.orbit.move(e)},
  up:e=>{K.orbit.up();if(!drag)return;const g=drag;drag=null;const sp=K.scr(g.position);let b=null,bd=48;for(const h of hooks){if(h.used)continue;const s=K.scr(h.p),d=Math.hypot(s[0]-sp[0],s[1]-sp[1]);if(d<bd){bd=d;b=h}}
   if(b&&b.t===g.userData.t){hang(g,b);check()}else{if(b){api.miss();api.snd.paper();api.say(g.userData.t==='j'?'곡옥은 초록 고리에 걸어요':'달개는 금빛 고리에 걸어요')}g.position.copy(g.userData.home)}},
  frame:(dt,now)=>{for(const g of items){const u=g.userData;if(u.h){u.v+=-u.a*dt*14;u.v*=Math.pow(.25,dt);u.a+=u.v*dt*6;g.rotation.z=u.a;g.rotation.y+=dt*.6}}for(const h of hooks)if(!h.used)h.mark.material.opacity=.6+.4*Math.sin(now/220)},
  solve:()=>{for(const g of items){if(g.userData.h)continue;const h=hooks.find(h=>!h.used&&h.t===g.userData.t);if(h)hang(g,h)}check()},
  dbg:()=>({items:items.map(g=>({t:g.userData.t,h:!!g.userData.h,s:K.scr(g.position)})),hooks:hooks.map(h=>({t:h.t,u:h.used,s:K.scr(h.p)}))})}}

/* ---------- 강진 매병: 메운 자리 유약 색 맞추기 → 가마 불 ---------- */
function tCeladon(api){const {THREE,F}=api,K=kit(api),H=F.H,sc=F.sc;
 /* 메운 자리: 어깨 앞쪽 표면 한 점 둘레의 삼각형을 떠서 살짝 띄운 덧칠 면 */
 const c0=new THREE.Vector3(0,K.box.min.y+H*.66,0);const hit=K.hitModel(new THREE.Vector3(0,c0.y,K.box.max.z+1),new THREE.Vector3(0,0,-1));const P=hit?hit.point:new THREE.Vector3(0,c0.y,K.box.max.z);const rad=H*.11;
 const pos=[],nor=[];for(const m of K.meshes){const g=m.geometry,A=g.attributes.position,Nn=g.attributes.normal;m.updateMatrixWorld();const v=new THREE.Vector3(),n=new THREE.Vector3();for(let i=0;i+2<A.count;i+=3){let ok=true;const tri=[];for(let k=0;k<3;k++){v.fromBufferAttribute(A,i+k).applyMatrix4(m.matrixWorld);const r=v.distanceTo(P)*(1+.25*Math.sin(Math.atan2(v.y-P.y,v.x-P.x)*5));if(r>rad){ok=false;break}n.set(0,0,1);if(Nn)n.fromBufferAttribute(Nn,i+k).transformDirection(m.matrixWorld);tri.push([v.clone().addScaledVector(n,H*.003),n.clone()])}if(ok)for(const[a,b]of tri){pos.push(a.x,a.y,a.z);nor.push(b.x,b.y,b.z)}}}
 const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));pg.setAttribute('normal',new THREE.Float32BufferAttribute(nor,3));
 const T={h:150,l:68},cur={h:96,l:44};const pm=new THREE.MeshStandardMaterial({roughness:.95,metalness:0,transparent:true,opacity:1,polygonOffset:true,polygonOffsetFactor:-2});const patch=new THREE.Mesh(pg,pm);sc.add(patch);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(rad*1.05,H*.004,8,48),new THREE.MeshBasicMaterial({color:0xffd27a,transparent:true,opacity:.7}));ring.position.copy(P).addScaledVector(hit?hit.face.normal.clone().transformDirection(hit.object.matrixWorld):new THREE.Vector3(0,0,1),H*.01);ring.lookAt(ring.position.clone().multiplyScalar(2).sub(new THREE.Vector3(0,P.y,0)));sc.add(ring);
 const kiln=new THREE.PointLight(0xff7a2a,0,H*4,1.5);kiln.position.set(P.x,K.box.min.y+H*.15,P.z+H*.5);sc.add(kiln);
 const setCol=()=>{pm.color.setHSL(cur.h/360,.24,cur.l/100)};setCol();
 F.view({yaw:Math.atan2(P.x,P.z),pitch:.12,ty:P.y,dist:H*2.4});
 const c=api.ctl;c.style.display='flex';c.innerHTML=`<span>견본 <span class="sw" style="background:hsl(${T.h},24%,${T.l}%)"></span></span><span>섞은 색 <span class="sw" data-sw></span></span><label>푸른 기 <input type="range" min="60" max="220" value="${cur.h}" data-h></label><label>맑기 <input type="range" min="30" max="90" value="${cur.l}" data-l></label><button type="button" class="f3-btn" data-fire disabled>가마에 굽기</button>`;
 const rh=c.querySelector('[data-h]'),rl=c.querySelector('[data-l]'),bf=c.querySelector('[data-fire]'),sw=c.querySelector('[data-sw]');let fin=false,fire=0;
 const near=()=>{const dh=cur.h-T.h,dl=cur.l-T.l;return{dh,dl,d:Math.abs(dh)/40+Math.abs(dl)/14}};
 const upd=()=>{cur.h=+rh.value;cur.l=+rl.value;setCol();sw.style.background=`hsl(${cur.h},24%,${cur.l}%)`;const n=near();bf.disabled=n.d>.3||fin;api.say(n.d<=.3?'견본과 거의 같아요. 가마에 구워요!':Math.abs(n.dh)/40>Math.abs(n.dl)/14?(n.dh<0?'메운 자리 색: 조금 더 푸르게':'메운 자리 색: 푸른 기를 조금 빼요'):(n.dl<0?'메운 자리 색: 조금 더 맑게':'메운 자리 색: 조금 더 깊게'),'금빛 테 안이 메운 자리예요 · 빈 곳을 끌면 돌려 봐요')};rh.oninput=rl.oninput=upd;upd();
 const doFire=()=>{if(fin)return;fin=true;bf.disabled=true;fire=.001;api.snd.light();api.say('가마 불에 굽는 중…','');ring.visible=false;const q0=near().d};bf.onclick=doFire;
 return{down:e=>K.orbit.down(e),move:e=>K.orbit.move(e),up:()=>K.orbit.up(),
  frame:(dt,now)=>{if(!fire){ring.material.opacity=.45+.35*Math.sin(now/260);return}fire+=dt;kiln.intensity=fire<2.2?(8+6*Math.sin(now/45))*Math.min(1,fire*2):Math.max(0,kiln.intensity-dt*12);if(fire>1.2){const k=Math.min(1,(fire-1.2)/1.6);pm.color.lerp(new THREE.Color().setHSL(T.h/360,.24,T.l/100),k*.08);pm.roughness=.95-.7*k;pm.opacity=1-.85*k}if(fire>3.2&&fire<9){fire=9;api.say('메운 자리가 비색으로 녹아들었어요. 어디였는지 찾기 어려울 만큼!','');F.puff(P,F.WHITE,30,1,.5,.3);setTimeout(()=>api.done(near().d<.12?5:3),700)}},
  solve:()=>{rh.value=T.h;rl.value=T.l;upd();doFire()},dbg:()=>({T,cur})}}

/* ---------- 서울 앙부일구: 영침 세우기 → 해 옮겨 그림자를 午 선에 ---------- */
function tAngbu(api){const {THREE,F}=api,K=kit(api),H=F.H,sc=F.sc,R=F.R;const B0=K.box;const RAD=Math.max(B0.max.x-B0.min.x,B0.max.z-B0.min.z)/2;
 /* 솥 바닥 안쪽: 가운데 위에서 내려 쏴서 위를 보는 면 */let base=null;for(const h of K.hitModel(new THREE.Vector3(0,B0.max.y+1,0),new THREE.Vector3(0,-1,0),true)){const n=h.face.normal.clone().transformDirection(h.object.matrixWorld);if(n.y>.5&&h.point.y>B0.min.y+H*.3){base=h.point.clone();break}}if(!base)base=new THREE.Vector3(0,B0.min.y+H*.55,0);
 const L=Math.min(RAD*.55,(B0.max.y-base.y)*1.25);const LAT=37.5*Math.PI/180;
 const gold=new THREE.MeshStandardMaterial({color:0xf2c14e,metalness:.9,roughness:.25,emissive:0x3a2a08});
 const rod=new THREE.Group();rod.position.copy(base);sc.add(rod);const stick=new THREE.Mesh(new THREE.CylinderGeometry(H*.012,H*.016,L,10),gold);stick.position.y=L/2;rod.add(stick);const knob=new THREE.Mesh(new THREE.SphereGeometry(H*.022,12,10),gold);knob.position.y=L;rod.add(knob);
 let el=-.05;/* 영침 기울기(라디안, 북쪽으로) */const setRod=()=>{rod.rotation.set(-(Math.PI/2-el),0,0)};setRod();/* 북쪽 = -z */
 const ghost=new THREE.Mesh(new THREE.CylinderGeometry(H*.01,H*.01,L,8),new THREE.MeshBasicMaterial({color:0xff6a50,transparent:true,opacity:.55,depthTest:false}));ghost.renderOrder=7;const gg=new THREE.Group();gg.position.copy(base);gg.add(ghost);ghost.position.y=L/2;gg.rotation.set(-(Math.PI/2-LAT),0,0);gg.visible=api.tool;sc.add(gg);
 const north=K.label('北','#ffd27a',60);north.scale.setScalar(H*.15);north.position.set(0,B0.max.y+H*.08,B0.min.z+H*.02);sc.add(north);
 const tip=()=>{const v=new THREE.Vector3(0,L,0);rod.updateMatrixWorld();return v.applyMatrix4(rod.matrixWorld)};
 /* 해: 아침 동쪽(+x) → 정오 남쪽 높이(+z) → 저녁 서쪽 */let t=8.5;const sunDir=tt=>{const a=Math.PI*(tt-6)/12;return new THREE.Vector3(Math.cos(a),.18+Math.sin(a)*.82,Math.sin(a)*.8).normalize()};
 const sun=new THREE.Sprite(new THREE.SpriteMaterial({map:(()=>{const c=document.createElement('canvas');c.width=c.height=128;const q=c.getContext('2d');const g=q.createRadialGradient(64,64,4,64,64,62);g.addColorStop(0,'#fffbe0');g.addColorStop(.3,'#ffd86a');g.addColorStop(1,'rgba(255,170,40,0)');q.fillStyle=g;q.fillRect(0,0,128,128);return new THREE.CanvasTexture(c)})(),depthTest:false,transparent:true}));sun.scale.setScalar(H*.32);sun.renderOrder=9;sun.visible=false;sc.add(sun);
 const SR=Math.max(RAD*2.2,H*2.2);const placeSun=()=>{sun.position.copy(sunDir(t)).multiplyScalar(SR).add(new THREE.Vector3(0,base.y,0));F.dl.position.copy(sun.position)};
 /* 그림자 길: 영침 위 점들에서 해 반대쪽으로 쏴 솥 안에 닿는 점 */const shadowPts=tt=>{const d=sunDir(tt).negate(),pts=[];rod.updateMatrixWorld();for(let i=2;i<=12;i++){const p=new THREE.Vector3(0,L*i/12,0).applyMatrix4(rod.matrixWorld);const h=K.hitModel(p,d);if(h&&h.distance<RAD*3)pts.push(h.point.clone())}return pts};
 const tube=(pts,r,mat)=>pts.length>1?new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),Math.max(4,pts.length*3),r,6,false),mat):null;
 const silver=new THREE.MeshStandardMaterial({color:0xe8ecf2,metalness:.9,roughness:.25,emissive:0x303438});const noonMat=new THREE.MeshStandardMaterial({color:0xffd86a,metalness:.8,roughness:.3,emissive:0x5a4010});
 const HR=[['卯',6],['辰',8],['巳',10],['午',12],['未',14],['申',16],['酉',18]];const lines=new THREE.Group();sc.add(lines);
 let shadow=null;const shMat=new THREE.MeshBasicMaterial({color:0x050302,transparent:true,opacity:.92,depthWrite:false});
 const drawShadow=()=>{if(shadow){sc.remove(shadow);shadow.geometry.dispose()}const pts=shadowPts(t);shadow=tube(pts,H*.022,shMat);if(shadow){shadow.renderOrder=6;sc.add(shadow)}};
 let phase=0,fin=false,drag=null;
 F.view({yaw:Math.PI,pitch:1.0,ty:base.y,dist:Math.max(H*2.6,RAD*4.0)});/* 검은 청동 솥 안을 청동빛으로 조금 밝혀 그림자가 보이게 */for(const m of K.meshes){const mm=m.material;if(mm&&mm.emissive){mm.emissive.setHex(0x5a4228);mm.emissiveIntensity=.55;mm.needsUpdate=true}}api.say(api.tool?'영침을 위로 끌어 빨간 길잡이에 맞춰 세워요':'영침을 위로 끌어 北 쪽으로 37.5도 세워요','서울은 북위 37.5도라 영침도 그만큼 기울여 북극을 가리켜요');
 const c=api.ctl;
 const toPhase1=()=>{phase=1;el=LAT;setRod();gg.visible=false;api.snd.coin();F.puff(tip(),F.GOLD,20,.8,.4,.3);
  for(const[n,h]of HR){const pts=shadowPts(h);const m=tube(pts,H*(h===12?.007:.004),h===12?noonMat:silver);if(m)lines.add(m);if(pts.length){const s=K.label(n,h===12?'#ffd86a':'#f3ead6',h===12?62:52);s.scale.setScalar(H*(h===12?.16:.12));s.position.copy(pts[pts.length-1]).add(new THREE.Vector3(0,H*.05,0));lines.add(s)}}
  sun.visible=true;placeSun();F.dl.intensity=3.2;drawShadow();c.style.display='flex';c.innerHTML=`<span>해 옮기기</span><span style="opacity:.8">아침</span><input type="range" min="6.5" max="17.5" step="0.05" value="${t}" data-t><span style="opacity:.8">저녁</span>`;
  const rt=c.querySelector('[data-t]');rt.oninput=()=>{t=+rt.value;placeSun();drawShadow();chk()};api.say('해를 옮겨 영침 그림자가 금빛 午(정오) 선에 오게 해요','은빛 줄은 시각선이에요 · 해는 위 손잡이로도, 해를 직접 끌어서도')};
 const chk=()=>{if(fin||phase!==1)return;if(Math.abs(t-12)<.3){fin=true;t=12;placeSun();drawShadow();api.snd.light();api.say('그림자가 午 선에 닿았어요. 지금은 정오, 앙부일구가 다시 시각을 알려요!','');setTimeout(()=>api.done(5),1100)}};
 return{
  down:e=>{if(fin){K.orbit.down(e);return}K.setRay(e);if(phase===0){const h=K.ray.intersectObjects([stick,knob],false)[0];const ts=K.scr(tip()),d=Math.hypot(ts[0]-e.clientX,ts[1]-e.clientY);if(h||d<60){drag={rod:1};return}}if(phase===1){const ss=K.scr(sun.position);if(Math.hypot(ss[0]-e.clientX,ss[1]-e.clientY)<70){drag={sun:1};return}}K.orbit.down(e)},
  move:e=>{if(drag&&drag.rod){/* 끌어 올린 높이로 기울기 */const p=K.dragTo(e,tip());if(p){const v=p.sub(base);el=Math.max(-.05,Math.min(1.35,Math.atan2(v.y,Math.max(.001,-v.z))));if(v.z>0)el=Math.min(1.35,Math.PI/2-.0);setRod()}return}
   if(drag&&drag.sun){const r=F.R.domElement.getBoundingClientRect();const fx=(e.clientX-r.left)/r.width;t=Math.max(6.5,Math.min(17.5,6.5+(1-fx)*11));const rt=c.querySelector('[data-t]');if(rt)rt.value=t;placeSun();drawShadow();chk();return}K.orbit.move(e)},
  up:()=>{K.orbit.up();if(drag&&drag.rod){drag=null;const tol=(api.tool?7:5)*Math.PI/180;if(Math.abs(el-LAT)<tol)toPhase1();else{api.say(el<LAT?'조금 더 세워요':'너무 섰어요. 조금 눕혀요',`지금 ${Math.round(el*180/Math.PI)}도 · 목표 37.5도`)}}drag=null},
  frame:(dt,now)=>{if(phase===0&&api.tool)ghost.material.opacity=.35+.3*Math.sin(now/240)},
  solve:()=>{if(!phase)toPhase1();t=12;const rt=c.querySelector('[data-t]');if(rt)rt.value=12;placeSun();drawShadow();chk()},
  dbg:()=>({phase,el,LAT,tip:K.scr(tip()),base:K.scr(base),sun:K.scr(sun.position),t})}}

/* ---------- 통영 나전칠함: 앞면 꽃무늬에 빠진 자개 꽃잎 끼우기 → 옻칠 세 번 ---------- */
function tNajeon(api){const {THREE,F}=api,K=kit(api),H=F.H,sc=F.sc;const B0=K.box;
 /* 앞면(+z) 높이: 앞에서 쏴서 닿는 z */const frontAt=(x,y)=>{const h=K.hitModel(new THREE.Vector3(x,y,B0.max.z+1),new THREE.Vector3(0,0,-1));return h?h.point.z:null};
 const W=B0.max.x-B0.min.x,Hh=B0.max.y-B0.min.y;const fcx=B0.min.x+W*.72,fcy=B0.min.y+Hh*.52;const fz=frontAt(fcx,fcy)??B0.max.z;const S=Math.min(W,Hh)*.05;
 const shape=new THREE.Shape();shape.moveTo(0,-S*1.6);shape.bezierCurveTo(S*.9,-S*.9,S*.9,S*.9,0,S*1.6);shape.bezierCurveTo(-S*.9,S*.9,-S*.9,-S*.9,0,-S*1.6);
 const pearl=new THREE.MeshPhysicalMaterial({color:0xf4f6ff,roughness:.18,metalness:.15,iridescence:1,iridescenceIOR:1.6,iridescenceThicknessRange:[200,800],side:THREE.DoubleSide,clearcoat:1});
 const R5=S*2.0;const slots=[0,1,2,3,4].map(i=>{const a=i*2*Math.PI/5;const x=fcx+Math.sin(a)*R5,y=fcy+Math.cos(a)*R5;const z=fz+H*.009;const r=((-a)%Math.PI+Math.PI)%Math.PI;const ol=new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(shape.getPoints(24).map(p=>new THREE.Vector3(p.x,p.y,0))),new THREE.LineBasicMaterial({color:0xffe0a0,transparent:true,opacity:.9,depthTest:false}));ol.renderOrder=7;ol.position.set(x,y,z+H*.002);ol.rotation.z=r;sc.add(ol);return{p:new THREE.Vector3(x,y,z),r,used:0,ol}});
 /* 자개가 떨어져 나간 자리: 꽃 하나를 칠 바탕으로 덮어 빈 자리로 보이게 */const hole=new THREE.Mesh(new THREE.CircleGeometry(R5+S*2,40),new THREE.MeshStandardMaterial({color:0x1d1a22,roughness:.55,metalness:.05}));hole.position.set(fcx,fcy,fz+H*.004);sc.add(hole);const flower=new THREE.Mesh(new THREE.CircleGeometry(S*.55,20),new THREE.MeshStandardMaterial({color:0xe8c060,metalness:.8,roughness:.3}));flower.position.set(fcx,fcy,fz+H*.011);sc.add(flower);
 const ST5=Math.PI/5;const petals=slots.map((s,i)=>{const m=new THREE.Mesh(new THREE.ShapeGeometry(shape,12),pearl);const home=new THREE.Vector3(B0.min.x+W*(.18+i*.16),B0.max.y+Hh*.22,fz+H*.05);m.position.copy(home);m.rotation.z=((i*2+1)%5)*ST5;m.userData={home,s:null};sc.add(m);return m});
 const near=(a,b)=>{let d=Math.abs(a-b)%Math.PI;return Math.min(d,Math.PI-d)<.06};
 /* 옻칠: 앞면에 붓 자국, 칸 채우기, 마를 때마다 함 전체 광택이 오름 */const strokes=new THREE.Group();sc.add(strokes);const NX=14,NY=8;let cover=new Uint8Array(NX*NY),coat=0,dry=0,phase=0,fin=false,drag=null,brushing=false;
 const lacq=new THREE.MeshStandardMaterial({color:0x2a0804,roughness:.12,metalness:.1,transparent:true,opacity:.5,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-3});const sGeo=new THREE.CircleGeometry(S*.95,14);
 const mats=[];for(const m of K.meshes){const mm=m.material;mats.push([mm,mm.roughness,mm.envMapIntensity??1])}
 F.view({yaw:0,pitch:.12,ty:B0.min.y+Hh*.62,dist:Math.max(H*2.4,W*1.75)});api.say('앞면 꽃무늬에서 빠진 자개 꽃잎을 금빛 테두리 자리로 끌어 넣어요','넣은 자개를 누르면 결이 돌아가요 · 빈 곳을 끌면 돌려 봐요');
 const status=()=>{const placed=petals.filter(p=>p.userData.s).length,ok=petals.filter(p=>p.userData.s&&near(p.rotation.z,p.userData.s.r)).length;if(ok===5&&phase===0){phase=1;api.snd.light();for(const s of slots)s.ol.visible=false;F.puff(new THREE.Vector3(fcx,fcy,fz),F.WHITE,30,1,.4,.2);api.say('자개 꽃이 다시 피었어요! 이제 붓으로 앞면을 문질러 옻칠해요 (1 / 3번째)','칠할수록 광택이 올라요');return}if(phase===0)api.say(placed<5?`자개를 금빛 자리에 끌어 넣어요 (${placed} / 5)`:`결이 안 맞는 자개를 눌러 돌려요 (맞은 것 ${ok} / 5)`,'테두리 모양과 같은 방향이 되게')};
 const paintAt=e=>{K.setRay(e);const pl=new THREE.Plane(new THREE.Vector3(0,0,1),-fz);const p=new THREE.Vector3();if(!K.ray.ray.intersectPlane(pl,p))return;if(p.x<B0.min.x||p.x>B0.max.x||p.y<B0.min.y||p.y>B0.max.y)return;const PX0=B0.min.x+W*.05,PW=W*.9,PY0=B0.min.y+Hh*.14,PH=Hh*.76;/* 칠할 판: 앞면 판(모서리·다리 뺌) */const i=Math.floor((p.x-PX0)/PW*NX),j=Math.floor((p.y-PY0)/PH*NY);let nw=0;for(let dj=-1;dj<=1;dj++)for(let di=-1;di<=1;di++){const a=i+di,b=j+dj;if(a>=0&&a<NX&&b>=0&&b<NY&&!cover[b*NX+a]){cover[b*NX+a]=1;nw++}}if(nw&&strokes.children.length<400){const s=new THREE.Mesh(sGeo,lacq);s.position.set(p.x,p.y,fz+H*.006);strokes.add(s)}const pc=cover.reduce((a,v)=>a+v,0)/cover.length;F.fill.style.width=(pc*100)+'%';if(pc>.82)coatDone()};
 const coatDone=()=>{if(dry||fin)return;dry=.001;brushing=false;api.snd.paper();api.say('옻칠을 말리는 중…','')};
 const afterDry=()=>{dry=0;coat++;cover.fill(0);F.fill.style.width='0';while(strokes.children.length)strokes.remove(strokes.children[0]);for(const[mm,r0,e0]of mats){mm.roughness=Math.max(.08,r0*(1-.3*coat));mm.envMapIntensity=e0*(1+.45*coat);mm.needsUpdate=true}F.puff(new THREE.Vector3(fcx,fcy,fz),F.WHITE,16,.8,.3,.2);
  if(coat>=3){fin=true;api.snd.light();api.say('옻칠을 세 번 올렸어요. 자개가 칠 속에서 은은하게 빛나요!','');setTimeout(()=>api.done(5),900)}else api.say(`잘 말랐어요. 옻칠 ${coat+1} / 3번째를 올려요`,'칠할수록 광택이 올라요')};
 return{
  down:e=>{if(dry)return;if(fin){K.orbit.down(e);return}K.setRay(e);if(phase===0){const h=K.ray.intersectObjects(petals,false)[0];if(h){const p=h.object;if(p.userData.s){if(!near(p.rotation.z,p.userData.s.r)){p.rotation.z=(p.rotation.z+ST5)%Math.PI;api.snd.coin();status()}return}drag=p;return}K.orbit.down(e);return}
   /* 앞면 판 둘레(조금 넉넉히)에서 시작하면 붓질, 아니면 돌려 보기 */{const p=new THREE.Vector3();if(K.ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,0,1),-fz),p)&&p.x>B0.min.x-W*.08&&p.x<B0.max.x+W*.08&&p.y>B0.min.y-Hh*.05&&p.y<B0.max.y+Hh*.1&&F.getView().yaw>-1.2&&F.getView().yaw<1.2){brushing=true;paintAt(e);return}}K.orbit.down(e)},
  move:e=>{if(drag){const p=K.dragTo(e,new THREE.Vector3(fcx,fcy,fz));if(p)drag.position.copy(p);return}if(brushing){paintAt(e);return}K.orbit.move(e)},
  up:()=>{K.orbit.up();brushing=false;if(!drag)return;const p=drag;drag=null;const sp=K.scr(p.position);let b=null,bd=56;for(const s of slots){if(s.used)continue;const q=K.scr(s.p),d=Math.hypot(q[0]-sp[0],q[1]-sp[1]);if(d<bd){bd=d;b=s}}if(b){p.userData.s=b;b.used=1;p.position.copy(b.p);api.snd.coin();F.puff(b.p,F.WHITE,10,.6,.3,.2)}else p.position.copy(p.userData.home);status()},
  frame:(dt,now)=>{if(dry){dry+=dt/1.6;lacq.opacity=.5*(1-Math.min(1,dry));if(dry>=1){lacq.opacity=.5;afterDry()}}for(const s of slots)if(!s.used)s.ol.material.opacity=.55+.4*Math.sin(now/260)},
  solve:()=>{for(const p of petals){if(!p.userData.s){const s=slots.find(s=>!s.used);s.used=1;p.userData.s=s;p.position.copy(s.p)}p.rotation.z=p.userData.s.r}status();coat=2;cover.fill(1);coatDone()},
  dbg:()=>({phase,coat,dry,petals:petals.map(p=>({s:p.userData.s?slots.indexOf(p.userData.s):-1,ok:p.userData.s?near(p.rotation.z,p.userData.s.r):false,xy:K.scr(p.position)})),slots:slots.map(s=>({u:s.used,xy:K.scr(s.p)})),lid:[K.scr(new THREE.Vector3(B0.min.x+W*.06,B0.max.y-Hh*.12,fz)),K.scr(new THREE.Vector3(B0.max.x-W*.06,B0.min.y+Hh*.16,fz))]})}}

/* ---------- 이천 달항아리: 위아래 잇기 ---------- */
function tMoonjar(api){const {THREE,F}=api,K=kit(api),H=F.H,sc=F.sc,R=F.R;const B0=K.box;R.localClippingEnabled=true;const mid=B0.min.y+H*.5;
 const cut=(keepUp)=>{const g=new THREE.Group();const pl=keepUp?new THREE.Plane(new THREE.Vector3(0,1,0),-mid):new THREE.Plane(new THREE.Vector3(0,-1,0),mid);for(const m of K.meshes){const mm=m.material.clone();mm.clippingPlanes=[pl];mm.side=THREE.DoubleSide;const c=new THREE.Mesh(m.geometry,mm);c.matrixAutoUpdate=false;c.matrix.copy(m.matrixWorld);g.add(c)}return{g,pl}};
 for(const p of F.pieces)p.visible=false;
 const lo=cut(false);sc.add(lo.g);const upPiv=new THREE.Group();sc.add(upPiv);const up=cut(true);upPiv.add(up.g);
 /* 쇳물 점: 앞쪽(+z) 이음선 위아래 */const spotAt=y=>{const h=K.hitModel(new THREE.Vector3(0,y,B0.max.z+1),new THREE.Vector3(0,0,-1));return h?h.point:new THREE.Vector3(0,y,B0.max.z)};const smat=new THREE.MeshStandardMaterial({color:0x6a3a1c,roughness:.6});
 const s1=new THREE.Mesh(new THREE.SphereGeometry(H*.022,12,10),smat);s1.scale.set(1,1.5,.35);s1.position.copy(spotAt(mid-H*.05));sc.add(s1);const s2=s1.clone();s2.position.copy(spotAt(mid+H*.05));upPiv.add(s2);
 const seam=new THREE.Mesh(new THREE.TorusGeometry(Math.max(B0.max.x-B0.min.x,B0.max.z-B0.min.z)*.5,H*.008,8,64),new THREE.MeshBasicMaterial({color:0xffd27a,transparent:true,opacity:0}));seam.rotation.x=Math.PI/2;seam.position.y=mid;sc.add(seam);
 let dx=(Math.random()<.5?-1:1)*H*(.3+Math.random()*.15),phi=(100+Math.random()*140)*Math.PI/180,lift=H*.12,fin=false,drag=null,glow=0;
 const place=()=>{upPiv.position.set(dx,lift,0);upPiv.rotation.y=phi;up.pl.constant=-(mid+lift);/* 위 사발 몸통 가운데를 축으로 돌림 */};place();
 F.view({yaw:0,pitch:.18,ty:mid,dist:H*2.6});
 const c=api.ctl;c.style.display='flex';c.innerHTML=`<label>위 사발 돌리기 <input type="range" min="0" max="360" value="${Math.round(phi*180/Math.PI)}" data-p></label><button type="button" class="f3-btn" data-join disabled>두 사발 이어 붙이기</button>`;const rp=c.querySelector('[data-p]'),bj=c.querySelector('[data-join]');
 const ok=()=>Math.abs(dx)<H*.02&&Math.cos(phi)>.985;
 const upd=()=>{bj.disabled=!ok()||fin;api.say(ok()?'두 쇳물 점이 맞았어요. 이어 붙여요!':Math.abs(dx)>=H*.02?'위 사발을 끌어 아래 사발 바로 위에 놓아요':'돌리기 손잡이로 위 사발의 쇳물 점을 아래 점 위로 맞춰요','위는 김 도공, 아래는 박 도공이 빚었어요 · 빈 곳을 끌면 돌려 봐요')};
 rp.oninput=()=>{phi=+rp.value*Math.PI/180;if(Math.cos(phi)>.985)phi=0;place();upd()};upd();
 const join=()=>{if(fin)return;fin=true;bj.disabled=true;api.snd.light();glow=.001;api.say('위아래가 한 몸이 되었어요. 달처럼 둥근 항아리가 돌아왔어요!','')};bj.onclick=join;
 return{
  down:e=>{if(fin){K.orbit.down(e);return}K.setRay(e);const h=K.ray.intersectObjects(up.g.children,false).find(x=>x.point.y>mid);if(h){drag={x0:e.clientX,d0:dx};return}K.orbit.down(e)},
  move:e=>{if(drag){const r=F.R.domElement.getBoundingClientRect();const v=F.getView();const k=(v.dist*Math.tan(F.cam.fov*Math.PI/360)*2)/r.height;dx=drag.d0+(e.clientX-drag.x0)*k*Math.cos(v.yaw);if(Math.abs(dx)<H*.02)dx=0;place();upd();return}K.orbit.move(e)},
  up:()=>{K.orbit.up();drag=null},
  frame:(dt,now)=>{if(glow){glow+=dt;lift=Math.max(0,lift-dt*H*.25);place();seam.material.opacity=glow<1?glow:Math.max(0,1-(glow-1)*.6);if(glow>1.1&&glow<9){glow=9.0001;F.puff(new THREE.Vector3(0,mid,0),F.GOLD,40,1.2,.4,.3);setTimeout(()=>api.done(5),900)}if(glow>9)seam.material.opacity=Math.max(0,seam.material.opacity-dt*.6)}},
  solve:()=>{dx=0;phi=0;rp.value=0;place();upd();join()},
  dbg:()=>({dx,phi,H,up:K.scr(new THREE.Vector3(dx,mid+H*.2,0))})}}
