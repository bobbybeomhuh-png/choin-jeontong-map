/* 무이 3D 유물 복원 공방. 갱신 2026-11-15
   블록판 '무이 복원 마당'의 손 복원을 실제 유물 3D(공개 자료)로. 진짜 3D 화면을 띄워 돌려 보며 복원한다.
   순서: 1 조각 맞추기(흩어진 조각을 끌어 흐린 윤곽 자리에) → 2 흙·녹 털기(붓질) → 3 도자기는 이음매 메우기 / 금속은 광내기
   끝나면 localStorage muui-h3-restored 에 남아 진열장에 놓인다. 설명 문장은 각 마당 파일의 정본 그대로. */
import * as THREE from 'three';
import {getModel} from './hanokkit.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {overlay,title,blip,finishCard,softOut} from './minigames.js';
export const ART=[
 {k:'crown',m:'gyeongju/crown',n:'천마총 금관',kind:'metal',cut:'ring',np:3,site:'경주',d:'경주 천마총에서 나온 신라 금관(5~6세기)이에요. 높이 32.5cm, 나뭇가지 모양 세움장식 셋과 사슴뿔 모양 둘에 곱은옥과 달개가 주렁주렁 달려 있어요. (3D: 국가유산청)'},
 {k:'maebyeong',m:'gangjin/maebyeong',n:'청자 매병',kind:'ceramic',cut:'ring',np:4,site:'강진',d:'어깨가 넓고 입이 좁은 고려 청자 매병이에요. (3D: 클리블랜드 미술관 공개, CC0)'},
 {k:'hyangro',m:'buyeo/hyangro',n:'백제 금동대향로',kind:'metal',cut:'band',np:3,site:'부여',d:'1993년 부여 능산리 절터에서 나온 백제 향로예요(높이 61.8cm, 국보). 꼭대기 봉황, 뚜껑의 산봉우리와 다섯 악사, 신선과 동물, 몸통의 연꽃, 받침의 용까지 백제의 솜씨가 다 담겼어요. (3D: junhapark1, CC BY)'},
 {k:'moonjar',m:'icheon/jar1983',n:'달항아리',kind:'ceramic',cut:'ring',np:5,site:'이천',d:'보름달처럼 둥글고 하얀 큰 항아리예요(1700년대). 아무 무늬 없이 흰빛과 둥근 모양만으로 아름다워서, 조선 백자를 대표하는 그릇이 되었어요. (클리블랜드 미술관 1983.28, CC0)'},
 {k:'sumaksae',m:'gyeongju/sumaksae',n:'얼굴무늬 수막새',kind:'ceramic',cut:'ring',np:3,site:'경주',d:'"신라의 미소"로 불리는 기와 끝 장식이에요. 실제 지름은 11.5cm예요. 웃는 눈과 입이 손으로 빚은 듯 부드러워요. (3D: 국가유산청)'},
 {k:'bansa',m:'gyeongju/bansa',n:'금동반가사유상',kind:'metal',cut:'band',np:3,site:'경주',d:'한쪽 다리를 무릎에 얹고 손가락을 뺨에 댄 채 생각에 잠긴 금동 불상이에요(삼국시대, 높이 93.5cm). (3D: 국가유산청)'},
 {k:'angbu',m:'hanyang/angbu',n:'앙부일구',kind:'metal',cut:'ring',np:4,site:'서울',d:'세종 때 만든 오목한 해시계예요. 솥을 하늘로 향해 놓은 모양이라 "앙부"라 불러요. 바늘 그림자로 시각과 절기를 함께 읽어요(지름 약 35cm). (3D: 국가유산청)'},
 {k:'dragonjar',m:'icheon/dragonjar',n:'백자 청화 운룡문 항아리',kind:'ceramic',cut:'ring',np:4,site:'이천',d:'푸른 코발트로 구름 속 용을 그린 항아리예요(1700년대). 용무늬 항아리는 왕실 잔치에 썼어요. (클리블랜드 미술관 1986.85, CC0)'},
 {k:'kundika',m:'gangjin/kundika',n:'청자 정병',kind:'ceramic',cut:'ring',np:3,site:'강진',d:'고려 청자 정병이에요. 강진 같은 고려 가마에서 비색 청자를 구웠어요. (클리블랜드 미술관 1921.631, CC0)'},
 {k:'unhyun',m:'icheon/unhyun_bottle',n:'운현궁 백자 병',kind:'ceramic',cut:'ring',np:3,site:'서울',d:'흥선대원군의 집 운현궁에서 쓰던 백자 병이에요. (국가유산청 재현 에셋, CC BY)'},
 {k:'fishbottle',m:'icheon/fishbottle',n:'분청사기 물고기무늬 병',kind:'ceramic',cut:'ring',np:4,site:'이천',d:'회색 흙에 흰 흙을 바르고 긁어 물고기를 그린 분청사기 병이에요(1400년대). (클리블랜드 미술관 1962.153, CC0)'},
 {k:'najeonham',m:'tongyeong/najeonham',n:'나전칠함',kind:'lacquer',cut:'ring',np:4,site:'통영',d:'옻칠한 나무 상자에 얇게 간 전복·조개 껍데기(자개)를 오려 붙여 꽃과 넝쿨을 그렸어요. 통영은 조선 때 통제영 공방(12공방)에서 나전을 만들던 나전칠기의 고장이에요. (3D: KCDF, CC BY)'}];
const LS='muui-h3-restored';
export const restored=()=>{try{return new Set(JSON.parse(localStorage.getItem(LS)||'[]'))}catch(e){return new Set()}};
const markRestored=k=>{try{const s=restored();s.add(k);localStorage.setItem(LS,JSON.stringify([...s]))}catch(e){}try{window.__CABINET&&window.__CABINET()}catch(e){}};

/* ---------- 공방 고르기 ---------- */
export function workshopGame(ctx){const ui=overlay('radial-gradient(circle at 50% 30%,#5a3a20,#1a120b)');let alive=true;const R=restored();
 title(ui.top,'무이 복원 공방','복원할 유물을 골라요. 조각을 맞추고, 흙을 털고, 틈을 메우면 진열장에 놓여요.');ui.c.style.display='none';
 const box=document.createElement('div');box.style.cssText='position:absolute;left:50%;top:50%;transform:translate(-50%,-44%);display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;width:min(560px,92vw);z-index:2';
 box.innerHTML=ART.map(a=>`<button type="button" data-k="${a.k}" style="padding:14px 10px;border-radius:14px;border:2px solid ${R.has(a.k)?'#f2d27a':'rgba(255,255,255,.15)'};background:rgba(255,248,232,${R.has(a.k)?.95:.88});color:#2b1d12;font:17px 'Do Hyeon',sans-serif;cursor:pointer;text-align:center">${R.has(a.k)?'✦ ':''}${a.n}<br><small style="font:12px 'Gowun Dodum',sans-serif;opacity:.75">${a.site} · ${a.kind==='metal'?'녹 닦기·광내기':a.kind==='lacquer'?'먼지 털기·광내기':'흙 털기·틈 메우기'}${R.has(a.k)?' · 복원 완료':''}</small></button>`).join('')+`<div style="grid-column:1/-1;text-align:center;color:#e8d6b0;font:14px 'Gowun Dodum',sans-serif;margin-top:6px">진열장 ${R.size} / ${ART.length}</div>`;
 ui.o.append(box);box.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;alive=false;ui.o.remove();restoreGame(ctx,b.dataset.k)});ui.x.onclick=()=>{alive=false;ui.o.remove()};window.__WS={open:k=>{ui.o.remove();restoreGame(ctx,k)}}}

/* ---------- 유물 하나 복원 ---------- */
export function restoreGame(ctx,key){const A=ART.find(a=>a.k===key)||ART[0];const ui=overlay('radial-gradient(circle at 50% 35%,#4a3828,#120c08)');let alive=true;ui.c.style.display='none';
 const ac=ctx.ac(),out=softOut(ctx);
 const R=new THREE.WebGLRenderer({antialias:true,alpha:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=THREE.SRGBColorSpace;R.toneMapping=THREE.ACESFilmicToneMapping;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new THREE.Scene();try{const pm=new THREE.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}sc.add(new THREE.HemisphereLight(0xfff4e0,0x3a2a1a,1.6));const dl=new THREE.DirectionalLight(0xffffff,2.2);dl.position.set(2,4,3);sc.add(dl);const fl=new THREE.DirectionalLight(0xffd8a0,.8);fl.position.set(-3,1.5,-2);sc.add(fl);
 const cam=new THREE.PerspectiveCamera(38,1,.05,50);let yaw=.5,pitch=.32,dist=4.2;const tgt=new THREE.Vector3(0,.8,0);
 /* 작업대 */{const t=new THREE.Mesh(new THREE.CylinderGeometry(1.9,1.9,.12,48),new THREE.MeshStandardMaterial({color:0x6b4a2e,roughness:.7}));t.position.y=-.06;sc.add(t);const cl=new THREE.Mesh(new THREE.CircleGeometry(1.7,48),new THREE.MeshStandardMaterial({color:0xe8dcc0,roughness:1}));cl.rotation.x=-Math.PI/2;cl.position.y=.005;sc.add(cl)}
 const head=(a,b)=>title(ui.top,A.n+' 복원',a+(b?' · '+b:''));head('불러오는 중');
 const bar=document.createElement('div');bar.style.cssText='position:absolute;left:50%;bottom:calc(env(safe-area-inset-bottom) + 22px);transform:translateX(-50%);width:min(360px,80vw);height:10px;border-radius:6px;background:rgba(255,255,255,.15);z-index:3;overflow:hidden';const fill=document.createElement('div');fill.style.cssText='height:100%;width:0;background:linear-gradient(90deg,#d8a838,#f2d27a);transition:width .2s';bar.append(fill);ui.o.append(bar);
 const stepTag=document.createElement('div');stepTag.style.cssText='position:absolute;left:50%;bottom:calc(env(safe-area-inset-bottom) + 40px);transform:translateX(-50%);z-index:3;color:#f2d27a;font:15px "Do Hyeon",sans-serif;letter-spacing:1px';ui.o.append(stepTag);
 let step=0,pieces=[],dirt=[],seams=[],ghost=null,art=null,H=1.6,drag=null,orbit=null,t0=performance.now(),miss=0,doneAll=false;
 const STEPS=A.kind==='ceramic'?['조각 맞추기','흙 털기','이음매 메우기']:A.kind==='metal'?['조각 맞추기','녹 닦기','광내기']:['조각 맞추기','먼지 털기','광내기'];
 const setStep=i=>{step=i;stepTag.textContent=`${i+1} / 3  ${STEPS[i]}`;fill.style.width='0';
  if(i===0)head('흩어진 조각을 끌어서 흐린 자리에 맞춰요','빈 곳을 끌면 돌려 볼 수 있어요');
  if(i===1)head(A.kind==='ceramic'?'붓으로 문질러 흙을 털어요':A.kind==='metal'?'솔로 문질러 푸른 녹을 닦아요':'붓으로 먼지를 털어요','빈 곳을 끌면 돌려요');
  if(i===2)head(A.kind==='ceramic'?'반짝이는 점을 눌러 이음매 틈을 메워요':'천으로 문질러 반짝반짝 광을 내요','빈 곳을 끌면 돌려요')};
 /* 모델 불러와서 크기 맞추고 조각으로 나눔 */
 (async()=>{const s=await getModel(A.m);if(!alive)return;if(!s){head('유물을 불러오지 못했어요','잠시 뒤 다시 열어 주세요');return}
  const o=s.clone(true);o.updateMatrixWorld(true);const bb=new THREE.Box3().setFromObject(o),sz=bb.getSize(new THREE.Vector3());const sc0=1.6/Math.max(sz.y,sz.x*1.3,sz.z*1.3);
  const M0=new THREE.Matrix4().makeScale(sc0,sc0,sc0).multiply(new THREE.Matrix4().makeTranslation(-(bb.min.x+bb.max.x)/2,-bb.min.y,-(bb.min.z+bb.max.z)/2));H=sz.y*sc0;const RAD=Math.max(sz.x,sz.z)*sc0/2;tgt.set(0,H*.5,0);dist=Math.max(3.6,H*2.6,(RAD+1.5)*2.5);
  const subs=[];o.traverse(m=>{if(!m.isMesh)return;let g=m.geometry.index?m.geometry.toNonIndexed():m.geometry.clone();g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(M0,m.matrixWorld));if(!g.attributes.normal)g.computeVertexNormals();subs.push({g,mat:Array.isArray(m.material)?m.material[0]:m.material})});
  /* 조각 번호: ring=둘레 각도로, band=높이로 */const np=A.np,pid=(x,y,z)=>{if(A.cut==='band')return Math.min(np-1,Math.floor(y/H*np));const a=(Math.atan2(z,x)+Math.PI)/(Math.PI*2);return Math.min(np-1,Math.floor(((a+.13)%1)*np))};
  for(let p=0;p<np;p++){const grp=new THREE.Group();grp.userData.p=p;pieces.push(grp);sc.add(grp)}
  for(const sb of subs){const pos=sb.g.attributes.position,n=pos.count/3|0;const lists=[...Array(np)].map(()=>[]);for(let t=0;t<n;t++){const i=t*3;const cx=(pos.getX(i)+pos.getX(i+1)+pos.getX(i+2))/3,cy=(pos.getY(i)+pos.getY(i+1)+pos.getY(i+2))/3,cz=(pos.getZ(i)+pos.getZ(i+1)+pos.getZ(i+2))/3;lists[pid(cx,cy,cz)].push(t)}
   lists.forEach((L,p)=>{if(!L.length)return;const g=new THREE.BufferGeometry();for(const nm of['position','normal','uv']){const a=sb.g.attributes[nm];if(!a)continue;const k=a.itemSize,arr=new Float32Array(L.length*3*k);L.forEach((t,j)=>{for(let v=0;v<3;v++)for(let c=0;c<k;c++)arr[(j*3+v)*k+c]=a.array[(t*3+v)*k+c]});g.setAttribute(nm,new THREE.BufferAttribute(arr,k))}
    const mt=sb.mat.clone();if(A.kind==='metal'){mt.metalness=Math.max(mt.metalness||0,.5);mt.roughness=.5;mt.envMapIntensity=.9}const me=new THREE.Mesh(g,mt);me.userData.base=mt.clone();pieces[p].add(me);
    /* 흙(녹) 층: 정점 색 알파로 지워 나감 */const dg=g.clone();const P=dg.attributes.position,N=dg.attributes.normal,C=new Float32Array(P.count*4);const col=A.kind==='metal'?[[.33,.45,.36],[.42,.5,.38],[.36,.33,.24]]:A.kind==='lacquer'?[[.42,.38,.33],[.48,.44,.38],[.36,.33,.29]]:[[.45,.33,.22],[.52,.4,.27],[.38,.28,.18]];for(let v=0;v<P.count;v++){P.setXYZ(v,P.getX(v)+N.getX(v)*.006,P.getY(v)+N.getY(v)*.006,P.getZ(v)+N.getZ(v)*.006);const c=col[(Math.sin(P.getX(v)*37+P.getY(v)*53+P.getZ(v)*29)*.5+.5)*col.length|0];C.set([c[0],c[1],c[2],.96],v*4)}dg.setAttribute('color',new THREE.BufferAttribute(C,4));
    const dm=new THREE.Mesh(dg,new THREE.MeshStandardMaterial({vertexColors:true,transparent:true,roughness:1,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1}));dm.userData.dirt=true;pieces[p].add(dm);dirt.push(dm)})}
  /* 흐린 윤곽(제자리 안내) */ghost=new THREE.Group();for(const sb of subs){const gm=new THREE.Mesh(sb.g,new THREE.MeshBasicMaterial({color:0xf2d27a,transparent:true,opacity:.1,depthWrite:false}));ghost.add(gm)}sc.add(ghost);
  /* 조각을 둘레로 흩어 놓음 */pieces.forEach((g,i)=>{const a=i/np*Math.PI*2+.6,r=Math.max(1.15,RAD+.85)+Math.random()*.2;g.userData.home=new THREE.Vector3();g.position.set(Math.cos(a)*r,.02+(A.cut==='band'?-i*H/np+.1:0),Math.sin(a)*r);g.rotation.set((Math.random()-.5)*.6,Math.random()*Math.PI*2,(Math.random()-.5)*.6);g.userData.rot0=g.rotation.clone();g.userData.placed=false;g.position.y=0;g.updateMatrixWorld(true);const bb2=new THREE.Box3().setFromObject(g);if(isFinite(bb2.min.y))g.position.y=.02-bb2.min.y});
  art=true;setStep(0);ctx.say(`${A.n} 조각이 흩어져 있어요. 하나씩 제자리에 맞춰 봐요.`)})();
 /* ---------- 포인터: 조각 끌기 / 붓질 / 점 누르기 / 돌려 보기 ---------- */
 const ray=new THREE.Raycaster(),mv=new THREE.Vector2();const pick=(e,objs)=>{const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,cam);return ray.intersectObjects(objs,true)[0]};
 const plane=new THREE.Plane(),hitP=new THREE.Vector3();
 R.domElement.addEventListener('pointerdown',e=>{if(!art||doneAll)return;R.domElement.setPointerCapture(e.pointerId);
  if(step===0){const h=pick(e,pieces.filter(p=>!p.userData.placed));if(h){let g=h.object;while(g.parent&&!pieces.includes(g))g=g.parent;plane.setFromNormalAndCoplanarPoint(cam.getWorldDirection(new THREE.Vector3()).negate(),g.position);drag={g,off:g.position.clone().sub(h.point)};blip(ac,out,380,300,.08,.08);return}}
  if(step===1||(step===2&&A.kind!=='ceramic')){const h=pick(e,dirt.filter(d=>d.visible));if(h){drag={brush:true};brushAt(h);return}}
  if(step===2&&A.kind==='ceramic'){const h=pick(e,seams.filter(s=>!s.userData.done));if(h){fillSeam(h.object);return}}
  orbit={x:e.clientX,y:e.clientY,yaw,pitch}});
 R.domElement.addEventListener('pointermove',e=>{if(drag&&drag.g){const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,cam);if(ray.ray.intersectPlane(plane,hitP)){drag.g.position.copy(hitP.add(drag.off));drag.g.position.y=Math.max(-.2,drag.g.position.y)}const d=drag.g.position.length();const k=Math.max(0,Math.min(1,1-(d-.15)/.8));const r0=drag.g.userData.rot0;drag.g.rotation.set(r0.x*(1-k),r0.y*(1-k),r0.z*(1-k));return}
  if(drag&&drag.brush){const h=pick(e,dirt.filter(d=>d.visible));if(h)brushAt(h);return}
  if(orbit){yaw=orbit.yaw-(e.clientX-orbit.x)*.008;pitch=Math.max(-.2,Math.min(1.2,orbit.pitch+(e.clientY-orbit.y)*.006))}});
 R.domElement.addEventListener('pointerup',()=>{if(drag&&drag.g){const g=drag.g;if(g.position.length()<.32){g.userData.placed=true;g.userData.snap=1;blip(ac,out,600,900,.18,.16);const left=pieces.filter(p=>!p.userData.placed).length;fill.style.width=((pieces.length-left)/pieces.length*100)+'%';ctx.say(left?`딱 맞았어요! 남은 조각 ${left}개`:'조각을 다 맞췄어요!');if(!left)setTimeout(()=>{ghost.visible=false;setStep(1)},900)}else{miss++;blip(ac,out,220,160,.1,.08,'square')}}drag=null;orbit=null});
 R.domElement.addEventListener('wheel',e=>{dist=Math.max(1.8,Math.min(8,dist*(1+Math.sign(e.deltaY)*.08)));e.preventDefault()},{passive:false});
 /* 붓질: 닿은 점 둘레 정점 알파를 줄임 */
 const tmpV=new THREE.Vector3();let lastSnd=0;
 function brushAt(h){const m=h.object;const loc=m.worldToLocal(h.point.clone());const P=m.geometry.attributes.position,C=m.geometry.attributes.color;const rad=step===2?.09:.13;let ch=false;for(let v=0;v<P.count;v++){tmpV.fromBufferAttribute(P,v);const d=tmpV.distanceTo(loc);if(d<rad){const a=C.getW(v),na=Math.max(0,a-(1-d/rad)*.35);if(na!==a){C.setW(v,na);ch=true}}}if(ch)C.needsUpdate=true;
  const now=performance.now();if(now-lastSnd>90){lastSnd=now;blip(ac,out,900+Math.random()*400,600,.05,.035,'triangle')}}
 const dirtLeft=()=>{let s=0,n=0;for(const d of dirt){const C=d.geometry.attributes.color;for(let v=0;v<C.count;v+=7){s+=C.getW(v);n++}}return n?s/n/.96:0};
 /* 이음매: 조각 경계를 따라 점 몇 개 */
 function makeSeams(){const P=[];const pts=[];for(const d of dirt){const pos=d.geometry.attributes.position;for(let v=0;v<pos.count;v+=3){tmpV.fromBufferAttribute(pos,v);d.localToWorld(tmpV);pts.push(tmpV.clone())}}
  const np=A.np;for(let b=0;b<np;b++){let cand;if(A.cut==='band'){if(b===0)continue;const y=b/np*H;cand=pts.filter(p=>Math.abs(p.y-y)<H*.03).sort((a,c)=>Math.atan2(a.z,a.x)-Math.atan2(c.z,c.x))}else{const ang=(b/np-.13)*Math.PI*2-Math.PI;cand=pts.filter(p=>{const a=Math.atan2(p.z,p.x);return Math.abs(Math.atan2(Math.sin(a-ang),Math.cos(a-ang)))<.08&&Math.hypot(p.x,p.z)>.05}).sort((a,c)=>a.y-c.y)}
   if(cand.length<6)continue;for(let i=1;i<=4;i++){const p=cand[Math.floor(cand.length*i/5)];const s=new THREE.Mesh(new THREE.SphereGeometry(.045,12,10),new THREE.MeshBasicMaterial({color:0xfff0a0}));s.position.copy(p).multiplyScalar(1.01);s.userData.ph=Math.random()*6;sc.add(s);seams.push(s)}}
  if(!seams.length)finishAll()}
 function fillSeam(s){s.userData.done=true;s.material=new THREE.MeshStandardMaterial({color:A.k==='moonjar'?0xf2efe6:0xb8c8b0,roughness:.4});s.scale.setScalar(.8);blip(ac,out,700,1050,.14,.14);const left=seams.filter(x=>!x.userData.done).length;fill.style.width=((seams.length-left)/seams.length*100)+'%';if(!left){ctx.say('이음매를 다 메웠어요!');setTimeout(finishAll,700)}}
 /* 광내기용 층(금속·옻칠): 흙 층을 다시 씌우되 흐린 잿빛 */
 function makePolish(){for(const d of dirt){const C=d.geometry.attributes.color;for(let v=0;v<C.count;v++){C.setXYZW(v,.42,.4,.36,.55)}C.needsUpdate=true;d.visible=true}}
 function finishAll(){if(doneAll)return;doneAll=true;for(const d of dirt)d.visible=false;for(const s of seams)if(s.userData.done)s.visible=true;for(const g of pieces)for(const m of g.children)if(m.material&&!m.userData.dirt&&A.kind==='metal'){m.material.metalness=.8;m.material.roughness=.28;m.material.envMapIntensity=1.3}
  markRestored(A.k);const sec=(performance.now()-t0)/1000;const Q=Math.max(30,Math.min(100,Math.round(100-miss*3-Math.max(0,sec-120)*.2)));blip(ac,out,520,1040,.5,.2);head('복원 완료!','천천히 돌려 보세요');stepTag.textContent='복원 완료';fill.style.width='100%';
  setTimeout(()=>{if(!alive)return;ctx.done('restore_'+A.k,Q,A.n+' 복원');finishCard(ui,`${A.n}, 복원 완료!`,A.d+` 진열장에 놓였어요(${restored().size} / ${ART.length}).`,Q,close)},2600)}
 /* ---------- 그리기 ---------- */
 let last=performance.now(),chk=0;
 const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.updateProjectionMatrix()}
  if(doneAll)yaw+=dt*.35;cam.position.set(tgt.x+Math.sin(yaw)*Math.cos(pitch)*dist,tgt.y+Math.sin(pitch)*dist,tgt.z+Math.cos(yaw)*Math.cos(pitch)*dist);cam.lookAt(tgt);
  for(const g of pieces)if(g.userData.snap){g.position.lerp(g.userData.home,Math.min(1,dt*10));g.rotation.x*=.85;g.rotation.y*=.85;g.rotation.z*=.85;if(g.position.length()<.002){g.position.set(0,0,0);g.rotation.set(0,0,0);g.userData.snap=0}}
  if(ghost)for(const m of ghost.children)m.material.opacity=.07+.06*Math.sin(now/300);
  for(const s of seams)if(!s.userData.done)s.scale.setScalar(1+.25*Math.sin(now/200+s.userData.ph));
  chk-=dt;if(chk<=0&&art&&!doneAll){chk=.25;if(step===1||(step===2&&A.kind!=='ceramic')){const l=dirtLeft();fill.style.width=Math.round((1-l)*100)+'%';if(l<.12){if(step===1){for(const d of dirt)d.visible=false;ctx.say(A.kind==='ceramic'?'흙을 다 털었어요! 이제 이음매를 메워요':'깨끗해졌어요! 이제 광을 내요');setStep(2);if(A.kind==='ceramic')makeSeams();else makePolish()}else finishAll()}}}
  R.render(sc,cam);requestAnimationFrame(loop)};loop();
 const close=()=>{alive=false;try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;ui.again=()=>{close();restoreGame(ctx,key)};
 window.__RS={state:()=>({step,doneAll,pieces:pieces.map(p=>p.userData.placed),dirt:art?dirtLeft():1,seams:seams.filter(s=>!s.userData.done).length}),place:i=>{const g=pieces[i];if(!g||g.userData.placed)return;g.userData.placed=true;g.userData.snap=1;const left=pieces.filter(p=>!p.userData.placed).length;fill.style.width=((pieces.length-left)/pieces.length*100)+'%';if(!left)setTimeout(()=>{ghost.visible=false;setStep(1)},900)},clean:()=>{for(const d of dirt){const C=d.geometry.attributes.color;for(let v=0;v<C.count;v++)C.setW(v,0);C.needsUpdate=true}},seam:()=>{for(const s of seams.filter(x=>!x.userData.done))fillSeam(s)}}}
