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
 {k:'eobo',m:'hanyang/eobo',n:'어보',kind:'metal',cut:'band',np:3,site:'서울',d:'임금의 도장(어보)이에요. 나라의 큰 문서에 찍고, 왕실의 정통을 상징했어요. (3D: 국가유산청)'},
 {k:'bell',m:'gyeongju/bell',n:'성덕대왕신종',kind:'metal',cut:'band',np:3,site:'경주',d:'771년 신라 혜공왕 때 완성한 큰 종으로, 높이 3.66m, 무게 약 18.9톤이에요. 아기를 넣어 만들었다는 슬픈 전설 때문에 "에밀레종"이라고도 불려요. 종 위의 용뉴(용 모양 고리)와 소리를 울리는 음통, 몸통의 비천상이 아름다워요. (3D: 국가유산청)'},
 {k:'scrollbox',m:'tongyeong/scrollbox',n:'용봉무늬 두루마리 상자',kind:'lacquer',cut:'ring',np:3,site:'통영',d:'두루마리 그림이나 글을 넣어 두던 긴 상자예요. 뚜껑에 용과 봉황을 자개로 새겼어요. (3D: 클리블랜드 미술관 1990.15, CC0)'},
 {k:'jikjitype',m:'cheongju/jikji_type',n:'금속활자',kind:'metal',cut:'ring',np:3,site:'청주',d:'글자 하나를 쇠로 부어 만든 활자예요. 밀랍에 글자를 새기고 흙으로 감싼 뒤 녹인 쇳물을 부어 만들었다고 해요(밀랍주조법). 진짜 활자는 손톱만 해요. (3D: 한국문화정보원, CC BY)'},
 {k:'haetae',m:'hanyang/haetae_a',n:'광화문 해태',kind:'stone',cut:'band',np:3,site:'서울',d:'광화문 앞을 지키던 해태(해치)예요. 옳고 그름을 가리고 화재를 막는다고 믿은 상상의 동물이에요. (3D: 국가유산청)'},
 {k:'najeonham',m:'tongyeong/najeonham',n:'나전칠함',kind:'lacquer',cut:'ring',np:4,site:'통영',d:'옻칠한 나무 상자에 얇게 간 전복·조개 껍데기(자개)를 오려 붙여 꽃과 넝쿨을 그렸어요. 통영은 조선 때 통제영 공방(12공방)에서 나전을 만들던 나전칠기의 고장이에요. (3D: KCDF, CC BY)'}];
try{window.__ARTN=Object.fromEntries(ART.map(a=>[a.k,a.n]))}catch(e){}
const LS='muui-h3-restored';
/* 오늘의 의뢰: 한국 날짜로 하루 하나. 해내면 엽전 덤 */
const DAY=()=>Math.floor((Date.now()+9*36e5)/864e5);export const todayArt=()=>ART[DAY()%ART.length];const todayDone=()=>{try{return localStorage.getItem('muui-h3-restore-day')===String(DAY())}catch(e){return false}};
export const restored=()=>{try{return new Set(JSON.parse(localStorage.getItem(LS)||'[]'))}catch(e){return new Set()}};
const markRestored=k=>{try{const s=restored();s.add(k);localStorage.setItem(LS,JSON.stringify([...s]))}catch(e){}try{window.__CABINET&&window.__CABINET()}catch(e){}};

/* ---------- 공방 고르기 ---------- */
export function workshopGame(ctx){const ui=overlay('radial-gradient(circle at 50% 30%,#5a3a20,#1a120b)');let alive=true;const R=restored();
 title(ui.top,'무이 복원 공방','복원할 유물을 골라요. 조각을 맞추고, 흙을 털고, 틈을 메우면 진열장에 놓여요.');ui.c.style.display='none';
 const box=document.createElement('div');box.style.cssText='position:absolute;left:50%;top:120px;bottom:12px;transform:translateX(-50%);display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));align-content:start;gap:10px;width:min(560px,92vw);overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:2';/* 제목 아래부터, 넘치면 안에서 굴림 */requestAnimationFrame(()=>{try{box.style.top=Math.round(ui.top.getBoundingClientRect().bottom+8)+'px'}catch(e){}});
 const TD=todayArt();box.innerHTML=`<div style="grid-column:1/-1;text-align:center;color:#f2d27a;font:16px 'Do Hyeon',sans-serif">오늘의 의뢰 ★ ${TD.n}${todayDone()?' · 완료!':' · 해내면 엽전 덤'}</div>`+ART.map(a=>`<button type="button" data-k="${a.k}" style="padding:14px 10px;border-radius:14px;border:2px solid ${a===TD?'#ff9a5a':R.has(a.k)?'#f2d27a':'rgba(255,255,255,.15)'};background:rgba(255,248,232,${R.has(a.k)?.95:.88});color:#2b1d12;font:17px 'Do Hyeon',sans-serif;cursor:pointer;text-align:center">${a===TD?'★ ':R.has(a.k)?'✦ ':''}${a.n}<br><small style="font:12px 'Gowun Dodum',sans-serif;opacity:.75">${a.site} · ${a.kind==='metal'?'녹 닦기·광내기':a.kind==='lacquer'?'먼지 털기·광내기':a.kind==='stone'?'이끼 털기·틈 메우기':'흙 털기·틈 메우기'}${R.has(a.k)?' · 눌러서 크게 보기 '+'★'.repeat(starOfArt(a.k)):''}</small></button>`).join('')+`<div style="grid-column:1/-1;text-align:center;color:#e8d6b0;font:14px 'Gowun Dodum',sans-serif;margin-top:6px">진열장 ${R.size} / ${ART.length}</div>`;
 ui.o.append(box);box.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||!b.dataset.k)return;alive=false;ui.o.remove();const k=b.dataset.k;/* 복원한 유물은 크게 보기부터(거기서 다시 복원 가능) */if(R.has(k))artViewer(k,{again:k2=>restoreGame(ctx,k2)});else restoreGame(ctx,k)});ui.x.onclick=()=>{alive=false;ui.o.remove()};window.__WS={open:k=>{ui.o.remove();restoreGame(ctx,k)}}}

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
 const CER=A.kind==='ceramic'||A.kind==='stone';const STEPS=A.kind==='stone'?['조각 맞추기','이끼 털기','틈 메우기']:A.kind==='ceramic'?['조각 맞추기','흙 털기','이음매 메우기']:A.kind==='metal'?['조각 맞추기','녹 닦기','광내기']:['조각 맞추기','먼지 털기','광내기'];
 const setStep=i=>{step=i;stepTag.textContent=`${i+1} / 3  ${STEPS[i]}`;fill.style.width='0';
  if(i===0)head('흩어진 조각을 끌어서 흐린 자리에 맞춰요','빈 곳을 끌면 돌려 볼 수 있어요');
  if(i===1)head(A.kind==='stone'?'솔로 문질러 이끼와 먼지를 털어요':A.kind==='ceramic'?'붓으로 문질러 흙을 털어요':A.kind==='metal'?'솔로 문질러 푸른 녹을 닦아요':'붓으로 먼지를 털어요','빈 곳을 끌면 돌려요');
  if(i===2)head(CER?'반짝이는 점을 눌러 이음매 틈을 메워요':'천으로 문질러 반짝반짝 광을 내요','빈 곳을 끌면 돌려요')};
 /* 모델 불러와서 크기 맞추고 조각으로 나눔 */
 (async()=>{const s=await getModel(A.m);if(!alive)return;if(!s){head('유물을 불러오지 못했어요','잠시 뒤 다시 열어 주세요');return}
  const o=s.clone(true);o.updateMatrixWorld(true);const bb=new THREE.Box3().setFromObject(o),sz=bb.getSize(new THREE.Vector3());const sc0=1.6/Math.max(sz.y,sz.x*1.3,sz.z*1.3);
  const M0=new THREE.Matrix4().makeScale(sc0,sc0,sc0).multiply(new THREE.Matrix4().makeTranslation(-(bb.min.x+bb.max.x)/2,-bb.min.y,-(bb.min.z+bb.max.z)/2));H=sz.y*sc0;let RAD=Math.max(sz.x,sz.z)*sc0/2;tgt.set(0,H*.5,0);dist=Math.max(3.6,H*2.6,(RAD+1.5)*2.5);
  const subs=[];o.traverse(m=>{if(!m.isMesh)return;let g=m.geometry.index?m.geometry.toNonIndexed():m.geometry.clone();g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(M0,m.matrixWorld));if(!g.attributes.normal)g.computeVertexNormals();subs.push({g,mat:Array.isArray(m.material)?m.material[0]:m.material})});
  /* 꼭짓점을 옮긴 실제 위치로 다시 맞춤(뼈대가 있는 모델은 상자 크기와 꼭짓점이 어긋남) */{const U=new THREE.Box3();for(const sb of subs){sb.g.computeBoundingBox();U.union(sb.g.boundingBox)}const z=U.getSize(new THREE.Vector3());if(isFinite(z.y)&&z.y>0){const k=1.6/Math.max(z.y,z.x*1.3,z.z*1.3);const F=new THREE.Matrix4().makeScale(k,k,k).multiply(new THREE.Matrix4().makeTranslation(-(U.min.x+U.max.x)/2,-U.min.y,-(U.min.z+U.max.z)/2));for(const sb of subs)sb.g.applyMatrix4(F);H=z.y*k;const RAD2=Math.max(z.x,z.z)*k/2;tgt.set(0,H*.5,0);dist=Math.max(3.6,H*2.6,(RAD2+1.5)*2.5);RAD=RAD2}}
  /* 조각 번호: ring=둘레 각도로, band=높이로 */const np=A.np,cl=v=>isFinite(v)?Math.max(0,Math.min(np-1,v)):0,pid=(x,y,z)=>{if(A.cut==='band')return cl(Math.floor(y/H*np));const a=(Math.atan2(z,x)+Math.PI)/(Math.PI*2);return cl(Math.floor(((a+.13)%1)*np))};
  for(let p=0;p<np;p++){const grp=new THREE.Group();grp.userData.p=p;pieces.push(grp);sc.add(grp)}
  for(const sb of subs){const pos=sb.g.attributes.position,n=pos.count/3|0;const lists=[...Array(np)].map(()=>[]);for(let t=0;t<n;t++){const i=t*3;const cx=(pos.getX(i)+pos.getX(i+1)+pos.getX(i+2))/3,cy=(pos.getY(i)+pos.getY(i+1)+pos.getY(i+2))/3,cz=(pos.getZ(i)+pos.getZ(i+1)+pos.getZ(i+2))/3;lists[pid(cx,cy,cz)].push(t)}
   lists.forEach((L,p)=>{if(!L.length)return;const g=new THREE.BufferGeometry();for(const nm of['position','normal','uv']){const a=sb.g.attributes[nm];if(!a)continue;const k=a.itemSize,arr=new Float32Array(L.length*3*k);L.forEach((t,j)=>{for(let v=0;v<3;v++)for(let c=0;c<k;c++)arr[(j*3+v)*k+c]=a.array[(t*3+v)*k+c]});g.setAttribute(nm,new THREE.BufferAttribute(arr,k))}
    const mt=sb.mat.clone();if(A.kind==='metal'){mt.metalness=Math.max(mt.metalness||0,.5);mt.roughness=.5;mt.envMapIntensity=.9}const me=new THREE.Mesh(g,mt);me.userData.base=mt.clone();pieces[p].add(me);
    /* 흙(녹) 층: 정점 색 알파로 지워 나감 */const dg=g.clone();const P=dg.attributes.position,N=dg.attributes.normal,C=new Float32Array(P.count*4);const col=A.kind==='metal'?[[.33,.45,.36],[.42,.5,.38],[.36,.33,.24]]:A.kind==='stone'?[[.36,.42,.28],[.42,.46,.32],[.3,.34,.24]]:A.kind==='lacquer'?[[.42,.38,.33],[.48,.44,.38],[.36,.33,.29]]:[[.45,.33,.22],[.52,.4,.27],[.38,.28,.18]];for(let v=0;v<P.count;v++){P.setXYZ(v,P.getX(v)+N.getX(v)*.006,P.getY(v)+N.getY(v)*.006,P.getZ(v)+N.getZ(v)*.006);const c=col[(Math.sin(P.getX(v)*37+P.getY(v)*53+P.getZ(v)*29)*.5+.5)*col.length|0];C.set([c[0],c[1],c[2],N.getY(v)<-.55?0:.96],v*4)/* 밑면(돌려 봐도 안 보이는 곳)엔 흙 없음 */}dg.setAttribute('color',new THREE.BufferAttribute(C,4));
    const dm=new THREE.Mesh(dg,new THREE.MeshStandardMaterial({vertexColors:true,transparent:true,roughness:1,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1}));dm.userData.dirt=true;pieces[p].add(dm);dirt.push(dm)})}
  /* 흐린 윤곽(제자리 안내) */ghost=new THREE.Group();for(const sb of subs){const gm=new THREE.Mesh(sb.g,new THREE.MeshBasicMaterial({color:0xf2d27a,transparent:true,opacity:.1,depthWrite:false}));ghost.add(gm)}sc.add(ghost);
  /* 조각을 둘레로 흩어 놓음 */pieces.forEach((g,i)=>{const a=i/np*Math.PI*2+.6,r=Math.max(1.15,RAD+.85)+Math.random()*.2;g.userData.home=new THREE.Vector3();g.position.set(Math.cos(a)*r,.02+(A.cut==='band'?-i*H/np+.1:0),Math.sin(a)*r);g.rotation.set((Math.random()-.5)*.6,Math.random()*Math.PI*2,(Math.random()-.5)*.6);g.userData.rot0=g.rotation.clone();g.userData.placed=false;g.position.y=0;g.updateMatrixWorld(true);const bb2=new THREE.Box3().setFromObject(g);if(isFinite(bb2.min.y))g.position.y=.02-bb2.min.y});
  art=true;setStep(0);ctx.say(`${A.n} 조각이 흩어져 있어요. 하나씩 제자리에 맞춰 봐요.`)})();
 /* ---------- 포인터: 조각 끌기 / 붓질 / 점 누르기 / 돌려 보기 ---------- */
 const ray=new THREE.Raycaster(),mv=new THREE.Vector2();const pick=(e,objs)=>{const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,cam);return ray.intersectObjects(objs,true)[0]};/* 가는 유물(금관 등)은 살짝 빗나가도 닿게: 누른 점 둘레 링 두 겹을 더 봄 */const pickNear=(e,objs)=>{let h=pick(e,objs);if(h)return h;for(const rad of[10,20])for(let k=0;k<8;k++){const a=k*Math.PI/4;h=pick({clientX:e.clientX+Math.cos(a)*rad,clientY:e.clientY+Math.sin(a)*rad},objs);if(h)return h}return null};
 const plane=new THREE.Plane(),hitP=new THREE.Vector3();
 R.domElement.addEventListener('pointerdown',e=>{if(!art||doneAll)return;R.domElement.setPointerCapture(e.pointerId);
  if(step===0){const h=pickNear(e,pieces.filter(p=>!p.userData.placed));if(h){let g=h.object;while(g.parent&&!pieces.includes(g))g=g.parent;plane.setFromNormalAndCoplanarPoint(cam.getWorldDirection(new THREE.Vector3()).negate(),g.position);drag={g,off:g.position.clone().sub(h.point)};blip(ac,out,380,300,.08,.08);return}}
  if(step===1||(step===2&&!CER)){const h=pickNear(e,dirt.filter(d=>d.visible));if(h){drag={brush:true};brushAt(h);return}}
  if(step===2&&CER){const h=pickNear(e,seams.filter(s=>!s.userData.done));if(h){fillSeam(h.object);return}}
  orbit={x:e.clientX,y:e.clientY,yaw,pitch}});
 R.domElement.addEventListener('pointermove',e=>{if(drag&&drag.g){const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,cam);if(ray.ray.intersectPlane(plane,hitP)){drag.g.position.copy(hitP.add(drag.off));drag.g.position.y=Math.max(-.2,drag.g.position.y)}const d=drag.g.position.length();const k=Math.max(0,Math.min(1,1-(d-.15)/.8));const r0=drag.g.userData.rot0;drag.g.rotation.set(r0.x*(1-k),r0.y*(1-k),r0.z*(1-k));return}
  if(drag&&drag.brush){const h=pickNear(e,dirt.filter(d=>d.visible));if(h)brushAt(h);return}
  if(orbit){yaw=orbit.yaw-(e.clientX-orbit.x)*.008;pitch=Math.max(-.2,Math.min(1.2,orbit.pitch+(e.clientY-orbit.y)*.006))}});
 R.domElement.addEventListener('pointerup',()=>{if(drag&&drag.g){const g=drag.g;/* 화면에서 흐린 자리에 맞아 보이면 붙임(조각이 카메라 쪽에 떠 있어 깊이가 달라도) */const rr=R.domElement.getBoundingClientRect(),sp=g.position.clone().project(cam),so=new THREE.Vector3().project(cam),scr=Math.hypot((sp.x-so.x)*rr.width/2,(sp.y-so.y)*rr.height/2)/Math.min(rr.width,rr.height);if(g.position.length()<.32||scr<.075){g.userData.placed=true;g.userData.snap=1;blip(ac,out,600,900,.18,.16);const left=pieces.filter(p=>!p.userData.placed).length;fill.style.width=((pieces.length-left)/pieces.length*100)+'%';ctx.say(left?`딱 맞았어요! 남은 조각 ${left}개`:'조각을 다 맞췄어요!');if(!left)setTimeout(()=>{ghost.visible=false;setStep(1)},900)}else{miss++;blip(ac,out,220,160,.1,.08,'square')}}drag=null;orbit=null});
 R.domElement.addEventListener('wheel',e=>{dist=Math.max(1.8,Math.min(8,dist*(1+Math.sign(e.deltaY)*.08)));e.preventDefault()},{passive:false});
 /* 붓질: 닿은 점 둘레 정점 알파를 줄임 */
 const tmpV=new THREE.Vector3();let lastSnd=0;
 function brushAt(h){const m=h.object;const loc=m.worldToLocal(h.point.clone());const P=m.geometry.attributes.position,C=m.geometry.attributes.color;const rad=(step===2?.16:.22)*Math.max(.8,H/1.6)*(R.domElement.clientWidth<520?1.35:1)/* 휴대폰은 붓을 크게 */;let ch=false;for(let v=0;v<P.count;v++){tmpV.fromBufferAttribute(P,v);const d=tmpV.distanceTo(loc);if(d<rad){const a=C.getW(v),na=Math.max(0,a-(1-d/rad)*.55);if(na!==a){C.setW(v,na);ch=true}}}if(ch)C.needsUpdate=true;
  const now=performance.now();if(now-lastSnd>90){lastSnd=now;blip(ac,out,900+Math.random()*400,600,.05,.035,'triangle')}}
 const dirtLeft=()=>{let s=0,n=0;for(const d of dirt){const C=d.geometry.attributes.color,N=d.geometry.attributes.normal;for(let v=0;v<C.count;v+=7){if(N&&N.getY(v)<-.55)continue;s+=C.getW(v);n++}}return n?s/n/.96:0};
 /* 이음매: 조각 경계를 따라 점 몇 개 */
 function makeSeams(){const P=[];const pts=[];for(const d of dirt){const pos=d.geometry.attributes.position;for(let v=0;v<pos.count;v+=3){tmpV.fromBufferAttribute(pos,v);d.localToWorld(tmpV);pts.push(tmpV.clone())}}
  const np=A.np;for(let b=0;b<np;b++){let cand;if(A.cut==='band'){if(b===0)continue;const y=b/np*H;cand=pts.filter(p=>Math.abs(p.y-y)<H*.03).sort((a,c)=>Math.atan2(a.z,a.x)-Math.atan2(c.z,c.x))}else{const ang=(b/np-.13)*Math.PI*2-Math.PI;cand=pts.filter(p=>{const a=Math.atan2(p.z,p.x);return Math.abs(Math.atan2(Math.sin(a-ang),Math.cos(a-ang)))<.08&&Math.hypot(p.x,p.z)>.05}).sort((a,c)=>a.y-c.y)}
   if(cand.length<6)continue;for(let i=1;i<=4;i++){const p=cand[Math.floor(cand.length*i/5)];const s=new THREE.Mesh(new THREE.SphereGeometry(.045,12,10),new THREE.MeshBasicMaterial({color:0xfff0a0}));s.position.copy(p).multiplyScalar(1.01);s.userData.ph=Math.random()*6;sc.add(s);seams.push(s)}}
  if(!seams.length)finishAll()}
 function fillSeam(s){s.userData.done=true;s.material=new THREE.MeshStandardMaterial({color:A.k==='moonjar'?0xf2efe6:A.kind==='stone'?0xb0aa9c:0xb8c8b0,roughness:.4});s.scale.setScalar(.8);blip(ac,out,700,1050,.14,.14);const left=seams.filter(x=>!x.userData.done).length;fill.style.width=((seams.length-left)/seams.length*100)+'%';if(!left){ctx.say('이음매를 다 메웠어요!');setTimeout(finishAll,700)}}
 /* 광내기용 층(금속·옻칠): 흙 층을 다시 씌우되 흐린 잿빛 */
 function makePolish(){for(const d of dirt){const C=d.geometry.attributes.color;for(let v=0;v<C.count;v++){C.setXYZW(v,.42,.4,.36,.55)}C.needsUpdate=true;d.visible=true}}
 function finishAll(){if(doneAll)return;doneAll=true;for(const d of dirt)d.visible=false;for(const s of seams)if(s.userData.done)s.visible=true;for(const g of pieces)for(const m of g.children)if(m.material&&!m.userData.dirt&&A.kind==='metal'){m.material.metalness=.8;m.material.roughness=.28;m.material.envMapIntensity=1.3}
  markRestored(A.k);try{window.__NETR&&window.__NETR(A.k)}catch(e){}const isToday=todayArt().k===A.k&&!todayDone();if(isToday){try{localStorage.setItem('muui-h3-restore-day',String(DAY()))}catch(e){}}const sec=(performance.now()-t0)/1000;const Q=Math.max(30,Math.min(100,Math.round(100-miss*3-Math.max(0,sec-120)*.2)));blip(ac,out,520,1040,.5,.2);head('복원 완료!','천천히 돌려 보세요');stepTag.textContent='복원 완료';fill.style.width='100%';
  setTimeout(()=>{if(!alive)return;ctx.done('restore_'+A.k,Q,A.n+' 복원');if(isToday)setTimeout(()=>{try{ctx.done('restore_today',100,'오늘의 의뢰');ctx.say('오늘의 의뢰까지 해냈어요! 엽전 덤을 받았어요.')}catch(e){}},1500);finishCard(ui,`${A.n}, 복원 완료!`,A.d+` 진열장에 놓였어요(${restored().size} / ${ART.length}).`,Q,close)},2600)}
 /* ---------- 그리기 ---------- */
 let last=performance.now(),chk=0;
 const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=R.domElement.getBoundingClientRect();if(R.domElement.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);/* 세로 화면: 가로 시야가 넓은 화면(1.4)과 같아지게 세로 시야를 넓힘(흩어진 조각이 화면 밖에 놓이지 않게) */cam.fov=cam.aspect<1.4?Math.min(75,2*Math.atan(Math.tan(19*Math.PI/180)*1.4/cam.aspect)*180/Math.PI):38;cam.updateProjectionMatrix()}
  if(doneAll)yaw+=dt*.35;cam.position.set(tgt.x+Math.sin(yaw)*Math.cos(pitch)*dist,tgt.y+Math.sin(pitch)*dist,tgt.z+Math.cos(yaw)*Math.cos(pitch)*dist);cam.lookAt(tgt);
  for(const g of pieces)if(g.userData.snap){g.position.lerp(g.userData.home,Math.min(1,dt*10));g.rotation.x*=.85;g.rotation.y*=.85;g.rotation.z*=.85;if(g.position.length()<.002){g.position.set(0,0,0);g.rotation.set(0,0,0);g.userData.snap=0}}
  if(ghost)for(const m of ghost.children)m.material.opacity=.07+.06*Math.sin(now/300);
  for(const s of seams)if(!s.userData.done)s.scale.setScalar(1+.25*Math.sin(now/200+s.userData.ph));
  chk-=dt;if(chk<=0&&art&&!doneAll){chk=.25;if(step===1||(step===2&&!CER)){const l=dirtLeft();fill.style.width=Math.round((1-l)*100)+'%';if(l<.18){if(step===1){for(const d of dirt)d.visible=false;ctx.say(CER?(A.kind==='stone'?'이끼를 다 털었어요! 이제 틈을 메워요':'흙을 다 털었어요! 이제 이음매를 메워요'):'깨끗해졌어요! 이제 광을 내요');setStep(2);if(CER)makeSeams();else makePolish()}else finishAll()}}}
  R.render(sc,cam);requestAnimationFrame(loop)};loop();
 const close=()=>{alive=false;try{R.dispose()}catch(e){}ui.o.remove()};ui.x.onclick=close;ui.again=()=>{close();restoreGame(ctx,key)};
 window.__RS={dbg:()=>({cam,pieces,dirt,seams,R:R.domElement,dirtLeft:art?dirtLeft():1}),state:()=>({step,doneAll,pieces:pieces.map(p=>p.userData.placed),dirt:art?dirtLeft():1,seams:seams.filter(s=>!s.userData.done).length}),place:i=>{const g=pieces[i];if(!g||g.userData.placed)return;g.userData.placed=true;g.userData.snap=1;const left=pieces.filter(p=>!p.userData.placed).length;fill.style.width=((pieces.length-left)/pieces.length*100)+'%';if(!left)setTimeout(()=>{ghost.visible=false;setStep(1)},900)},clean:()=>{for(const d of dirt){const C=d.geometry.attributes.color;for(let v=0;v<C.count;v++)C.setW(v,0);C.needsUpdate=true}},seam:()=>{for(const s of seams.filter(x=>!x.userData.done))fillSeam(s)}}}

/* ---------- 진열장 유물 크게 보기 (2026-11-16) ----------
   진열장에서 복원한 유물을 누르면 크게 띄워 손으로 돌려 보고(끌기), 당기거나 휠로 가까이 보고, 설명 카드를 읽는다.
   받침 색은 복원 솜씨 별: 별 하나 구리, 둘 은, 셋 금. 좌우로 다른 복원 유물로 넘어감 */
export const starOfArt=k=>{try{const q=JSON.parse(localStorage.getItem('muui-h3-gameq')||'{}')['restore_'+k]||0;return q>=90?3:q>=70?2:q>0?1:0}catch(e){return 0}};
export const STAR_COL=[0x8a7a66,0xb0703a,0xc8ccd4,0xe8b840];
export function artViewer(key,opt={}){let A=ART.find(a=>a.k===key);if(!A)return;const ui=overlay('radial-gradient(circle at 50% 38%,#3e2e20,#0e0906)');let alive=true;ui.c.style.display='none';
 const R=new THREE.WebGLRenderer({antialias:true,alpha:true});R.setPixelRatio(Math.min(2,devicePixelRatio||1));R.outputColorSpace=THREE.SRGBColorSpace;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.05;R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;touch-action:none;cursor:grab';ui.o.insertBefore(R.domElement,ui.o.firstChild.nextSibling);
 const sc=new THREE.Scene();try{const pm=new THREE.PMREMGenerator(R);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 sc.add(new THREE.HemisphereLight(0xfff4e0,0x2a1a10,1.2));const key1=new THREE.SpotLight(0xfff0d8,40,0,.5,.6);key1.position.set(1.6,4.2,2.4);sc.add(key1);const rim=new THREE.DirectionalLight(0xffc888,1.4);rim.position.set(-2.5,1.8,-2.6);sc.add(rim);
 /* 받침: 나무 대 + 별 색 금속 테 + 바닥 빛 웅덩이 */
 const ped=new THREE.Group();sc.add(ped);{const pd=new THREE.Mesh(new THREE.CylinderGeometry(.95,1.05,.34,56),new THREE.MeshStandardMaterial({color:0x4a2e1a,roughness:.55}));pd.position.y=-.17;ped.add(pd)}
 const ringM=new THREE.MeshStandardMaterial({color:0xb0703a,metalness:.9,roughness:.28});const ring=new THREE.Mesh(new THREE.TorusGeometry(.97,.035,12,72),ringM);ring.rotation.x=Math.PI/2;ring.position.y=-.005;ped.add(ring);
 const top=new THREE.Mesh(new THREE.CircleGeometry(.92,56),new THREE.MeshStandardMaterial({color:0x2c1c12,roughness:.9}));top.rotation.x=-Math.PI/2;top.position.y=.002;ped.add(top);
 {const c=document.createElement('canvas');c.width=c.height=128;const q=c.getContext('2d');const g=q.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,220,160,.55)');g.addColorStop(1,'rgba(255,220,160,0)');q.fillStyle=g;q.fillRect(0,0,128,128);const t=new THREE.CanvasTexture(c);const pool=new THREE.Mesh(new THREE.PlaneGeometry(4.2,4.2),new THREE.MeshBasicMaterial({map:t,transparent:true,depthWrite:false}));pool.rotation.x=-Math.PI/2;pool.position.y=-.34;sc.add(pool)}
 const cam=new THREE.PerspectiveCamera(34,1,.02,60);let yaw=.6,pitch=.22,dist=3.6,minD=1.2,maxD=6,vyaw=0,idle=0;const tgt=new THREE.Vector3(0,.7,0);
 /* 설명 카드 */
 const card=document.createElement('div');card.style.cssText='position:absolute;right:max(14px,env(safe-area-inset-right));bottom:calc(env(safe-area-inset-bottom) + 16px);z-index:3;width:min(340px,calc(100vw - 28px));max-height:42vh;overflow:auto;background:rgba(255,250,240,.95);color:#2b1d12;border:2px solid #d8a838;border-radius:14px;padding:12px 14px;font:14.5px/1.6 "Gowun Dodum",sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.45)';ui.o.append(card);
 const nav=(d)=>{const L=ART.filter(a=>restored().has(a.k));if(L.length<2)return;const i=L.findIndex(a=>a.k===A.k);A=L[(i+d+L.length)%L.length];load()};
 for(const[d,t,side]of[[-1,'‹','left'],[1,'›','right']]){const b=document.createElement('button');b.type='button';b.textContent=t;b.setAttribute('aria-label',d<0?'이전 유물':'다음 유물');b.style.cssText=`position:absolute;${side}:12px;top:42%;z-index:3;width:48px;height:64px;border-radius:12px;border:2px solid rgba(242,210,122,.6);background:rgba(30,20,12,.6);color:#f2d27a;font:34px "Do Hyeon",sans-serif;cursor:pointer`;b.onclick=()=>nav(d);ui.o.append(b)}
 let art=null,tok=0;
 function load(){const my=++tok;const st=starOfArt(A.k);ringM.color.setHex(STAR_COL[st]);ringM.metalness=st?.9:.2;
  title(ui.top,A.n,`${A.site} · 끌어서 돌리고, 휠이나 두 손가락으로 가까이`);
  const L=ART.filter(a=>restored().has(a.k));
  card.innerHTML=`<b style="display:block;font:20px 'Do Hyeon',sans-serif;color:#8e2b20">${A.n}</b><div style="margin:2px 0 6px;color:${['#8a7a66','#a8602a','#7a8494','#c8901a'][st]};font:15px 'Do Hyeon',sans-serif;letter-spacing:1px">${'★'.repeat(st)}${'☆'.repeat(3-st)} <small style="font:12.5px 'Gowun Dodum',sans-serif;color:#6b4a26">${st?['','구리','은','금'][st]+' 받침':'아직 복원 전'}</small></div>${A.d}<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap"><button type="button" data-a="again" style="font:14px 'Do Hyeon',sans-serif;padding:7px 12px;border-radius:9px;border:0;background:#8e2b20;color:#fff4dc;cursor:pointer">${st>=3?'다시 복원하기':'다시 복원해서 별 올리기'}</button><span style="align-self:center;font-size:12.5px;color:#6b4a26">진열장 ${L.length} / ${ART.length}</span></div>`;
  card.querySelector('[data-a=again]').onclick=()=>{close();try{(opt.again||(()=>window.__WS&&window.__WS.open(A.k)))(A.k)}catch(e){}};
  if(art){sc.remove(art);art=null}
  getModel(A.m).then(s=>{if(!alive||my!==tok||!s)return;const o=s.clone(true);o.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(o),z=b.getSize(new THREE.Vector3());const k=Math.min(1.5/z.y,1.6/Math.max(z.x,z.z));o.scale.setScalar(k);o.position.set(-(b.min.x+b.max.x)/2*k,-b.min.y*k,-(b.min.z+b.max.z)/2*k);o.traverse(e=>{if(e.isMesh){e.castShadow=false}});art=new THREE.Group();art.add(o);sc.add(art);const h=z.y*k;tgt.set(0,h*.5,0);dist=Math.max(2.2,h*1.9+.8);minD=Math.max(.6,h*.6);maxD=dist*1.8;art.scale.setScalar(.001);art.userData.t=0})}
 load();
 /* 손으로 돌리기·가까이 */
 const P=new Map();let pin=null;const cv=R.domElement;
 cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);P.set(e.pointerId,{x:e.clientX,y:e.clientY});cv.style.cursor='grabbing';if(P.size===2){const[a,b]=[...P.values()];pin={d:Math.hypot(a.x-b.x,a.y-b.y),dist}}});
 cv.addEventListener('pointermove',e=>{const p=P.get(e.pointerId);if(!p)return;const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;idle=0;if(P.size===2&&pin){const[a,b]=[...P.values()];dist=Math.min(maxD,Math.max(minD,pin.dist*pin.d/Math.max(20,Math.hypot(a.x-b.x,a.y-b.y))));return}vyaw=-dx*.008;yaw+=vyaw;pitch=Math.min(1.2,Math.max(-.15,pitch+dy*.006))});
 const up=e=>{P.delete(e.pointerId);if(P.size<2)pin=null;if(!P.size)cv.style.cursor='grab'};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
 cv.addEventListener('wheel',e=>{e.preventDefault();idle=0;dist=Math.min(maxD,Math.max(minD,dist*(1+Math.sign(e.deltaY)*.1)))},{passive:false});
 const kd=e=>{if(!alive)return;if(e.key==='ArrowLeft')nav(-1);else if(e.key==='ArrowRight')nav(1);else if(e.key==='Escape')close()};addEventListener('keydown',kd);
 let last=performance.now();
 const loop=()=>{if(!alive)return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const r=cv.getBoundingClientRect();if(cv.width!==Math.round(r.width*R.getPixelRatio())){R.setSize(r.width,r.height,false);cam.aspect=r.width/Math.max(1,r.height);cam.fov=cam.aspect<1.2?48:34;cam.updateProjectionMatrix()}
  idle+=dt;if(!P.size){vyaw*=.92;yaw+=vyaw;if(idle>2.5)yaw+=dt*.3}
  if(art&&art.userData.t<1){art.userData.t=Math.min(1,art.userData.t+dt*2.4);const t=art.userData.t,e=1-Math.pow(1-t,3);art.scale.setScalar(Math.max(.001,e));art.position.y=(1-e)*.3}
  /* 세로 화면은 설명 카드가 아래를 가리니 유물을 조금 위로 */const dd=dist*(cam.aspect<1?1.5:1),lift=cam.aspect<1?.13*dd:0;
  cam.position.set(tgt.x+Math.sin(yaw)*Math.cos(pitch)*dd,tgt.y+Math.sin(pitch)*dd-lift,tgt.z+Math.cos(yaw)*Math.cos(pitch)*dd);cam.lookAt(tgt.x,tgt.y-lift,tgt.z);
  R.render(sc,cam);requestAnimationFrame(loop)};loop();
 const close=()=>{if(!alive)return;alive=false;removeEventListener('keydown',kd);try{R.dispose()}catch(e){}ui.o.remove();try{opt.onClose&&opt.onClose()}catch(e){}};ui.x.onclick=close;
 window.__AV={state:()=>({k:A.k,loaded:!!art,yaw,dist,star:starOfArt(A.k)}),close,nav};return{close}}
