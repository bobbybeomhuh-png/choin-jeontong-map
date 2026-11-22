/* 강화 초지진 마당(2026-11-21): 스케치팹 lacomi1975 드론 사진 측량(CC BY 4.0) 「Chojijin Fort」를 실제 크기로(자동차 길이로 맞춰 1단위=44m).
   초지진: 효종 7년(1656) 바다로 들어오는 적을 막으려 세운 진, 숙종 5년(1679) 돈대를 쌓음. 1866 병인양요·1871 신미양요·1875 운요호 사건 때 싸운 곳(사적). 성벽과 옆 소나무에 포탄 자국이 남아 있음.
   놀이: 포탄 자국 찾기(성벽 둘레를 돌며 빛나는 자국 찾기), 발굴 탐지. 밤 등불(photosite). */
import {photoSite} from './photosite.js';
const SRC='(3D: lacomi1975, Sketchfab, CC BY 4.0)';
export function buildChojijin(opts={}){return photoSite('chojijin',opts,{h0:3,groundY:-9,groundColor:0x6a665a,
 title:'강화 초지진',hint:'바다로 들어오는 배를 막던 강화 초지진을 드론 실측 그대로 실제 크기로 놓았어요. 성벽을 돌며 포탄 자국을 찾아 봐요. '+SRC,
 quest:{t:'초지진 둘러보기',d:'바닷가 돈대를 실측 그대로 둘러보세요.',steps:[['초지진','강화 초지진'],['돈대 성벽','초지진 돈대 성벽'],['갯벌','초지진 앞 갯벌']]},
 spawn:{x:20,z:30,yaw:Math.PI},bounds:[-66,66,-60,60],level:'초지진',env:{fog:[90,460],groundY:-9.1,noHills:true,sign:{x:26,z:26,y:0,lines:['강화 초지진','사적 · 1656 진 · 1679 돈대','신미양요의 포탄 자국','드론 실측 3D']}},
 npc:[['science',[[14,22],[24,22],[24,30],[14,30]]]],
 build({G,spots,hAt,THREE}){
  const sp=(x,z,r,t,h)=>spots.push({x,y:hAt(x,z),z,r,t,h});
  sp(10,20,4,'강화 초지진','효종 7년(1656)에 바다로 들어오는 적을 막으려 세운 진이에요(사적). 1866년 병인양요, 1871년 신미양요 때 미군, 1875년 운요호 사건 때 일본군과 싸운 곳이에요. 지금은 돈대만 남아 다시 쌓았어요. '+SRC);
  sp(27,-6,3.4,'초지진 돈대 성벽','성벽 아래에서 올려다봐요. 둥글게 돌로 쌓은 돈대 안에 대포를 두고 바다를 지켰어요. 성벽 높이 약 4m, 둘레 약 100m예요. '+SRC);
  sp(-20,-32,4,'초지진 앞 갯벌','강화 바다는 밀물과 썰물 차이가 커서, 물이 빠지면 넓은 갯벌이 드러나요. 큰 배는 물때를 맞춰야 들어올 수 있었어요.');
  /* 포탄 자국 찾기(11/21): 성벽 바깥 둘레에 숨은 자국 여섯. 가까이 가면 빛남. 120초 */
  window.__CJMARK=()=>{if(document.getElementById('cjP'))return;const MK=[];{const c=[5,-6];const top=hAt(c[0],c[1]);for(let k=0;k<16;k++){const a=k/16*Math.PI*2;for(let r=8;r<34;r+=.5){const x=c[0]+Math.cos(a)*r,z=c[1]+Math.sin(a)*r;if(hAt(x,z)<top-1.4){MK.push([x-Math.cos(a)*.6,z-Math.sin(a)*.6,a]);break}}}}const H=window.__H3,ctx=H.ctx();const pool=MK.filter(([x,z,a])=>{const sx=x+Math.cos(a)*2.2,sz=z+Math.sin(a)*2.2;return hAt(sx,sz)>hAt(5,-6)-3.2}).sort(()=>Math.random()-.5).slice(0,6);const _u=MK.slice().sort(()=>Math.random()-.5).slice(0,6);const g=new THREE.Group();G.add(g);
   const L=pool.map(([x,z,a])=>{const sx=x+Math.cos(a)*2.2,sz=z+Math.sin(a)*2.2;const y=hAt(sx,sz);const m=new THREE.Mesh(new THREE.CircleGeometry(.32,18),new THREE.MeshBasicMaterial({color:0x2a2018,transparent:true,opacity:.0,depthWrite:false,side:THREE.DoubleSide}));m.position.set(x,y+1.6,z);m.lookAt(x+Math.cos(a)*5,y+1.6,z+Math.sin(a)*5);g.add(m);const ring=new THREE.Mesh(new THREE.RingGeometry(.4,.55,24),new THREE.MeshBasicMaterial({color:0xffd060,transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide}));ring.position.copy(m.position);ring.quaternion.copy(m.quaternion);ring.position.y+=.0;g.add(ring);return{x:sx,z:sz,m,ring,got:false}});
   const d=document.createElement('div');d.id='cjP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#1e2428;border:3px solid #9ab0c0;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#eef2f4;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
   const N=L.length,TL=120;let n=0,done=false,t0=performance.now()/1000;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#d0e4f0">🔍 포탄 자국 찾기</b><div id="cjS" style="font:20px 'Do Hyeon',sans-serif;margin:4px 0">0 / ${N}</div><div id="cjG" style="font-size:13px;color:#d0e4f0">성벽 바깥을 따라 걸어 봐요</div><div id="cjT" style="font-size:13px">${TL}초</div><div style="font-size:12px;opacity:.85">가까이 가면 자국이 보여요. 다가가 살펴요</div>`;const Sx=d.querySelector('#cjS'),Gd=d.querySelector('#cjG'),T=d.querySelector('#cjT');
   const ding=()=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='sine';o.frequency.value=660+n*60;gg.gain.setValueAtTime(.07,s);gg.gain.exponentialRampToValueAtTime(.0001,s+.6);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+.65)}catch(e){}};
   const fin=()=>{if(done)return;done=true;const el=performance.now()/1000-t0;const Q=n>=N?Math.max(70,Math.round(100-Math.max(0,el-50)*.6)):Math.round(n/N*65);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('chojijin_mark',Q,'초지진 포탄 자국 찾기')}catch(e){}window.__CJQ=Q;
    setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#d0e4f0">자국 ${n}곳을 찾았어요</b><div style="font-size:13px;margin:4px 0">초지진 성벽과 옆 소나무에는 1871년 신미양요와 1875년 운요호 사건 때의 포탄 자국이 지금도 남아 있어요. 강화 바닷길을 지키려 했던 사람들의 흔적이에요.</div><div style="font-size:26px;color:#9ab0c0">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#9ab0c0;color:#10202a;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#eef2f4;border:2px solid #eef2f4;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__CJMARK(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},800)};
   const loop=()=>{if(!d.isConnected){G.remove(g);return}const now=performance.now()/1000;const P=H.P;
    if(!done){let near=1e9;for(const l of L){if(l.got)continue;const dd=Math.hypot(P.x-l.x,P.z-l.z);near=Math.min(near,dd);const v=Math.max(0,1-dd/7);l.m.material.opacity=v*.9;l.ring.material.opacity=v*.6;if(dd<2.4){l.got=true;n++;ding();l.ring.material.color.set(0x8ae08a);l.ring.material.opacity=.8;l.m.material.opacity=.9;try{ctx.say('포탄 자국이에요!',1)}catch(e){}if(n>=N)fin()}}
     Gd.textContent=near<7?'가까워요! 성벽을 살펴요':'성벽 바깥을 따라 걸어 봐요';Sx.textContent=n+' / '+N;const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin()}
    requestAnimationFrame(loop)};loop();
   window.__CJG={L,get n(){return n}};try{ctx.say('초지진 성벽에 숨은 포탄 자국을 찾아 봐요!',2.6)}catch(e){}};
  sp(16,16,2.4,'포탄 자국 찾는 곳','성벽 둘레를 돌며 포탄 자국을 찾아 봐요.');
  /* 발굴 탐지 */
  const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.8},o));const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
  const ITEMS=[
   {n:'쇠 포탄',h:'조선 대포에 넣어 쏘던 둥근 쇠 탄환이에요. 강화 돈대 둘레에서 여러 크기가 나와요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.14,14,10),M(0x3a3a3a,{metalness:.6})))})},
   {n:'조총 탄환',h:'조총에 넣던 작은 납 탄환이에요.',mk:mk(g=>{for(let i=0;i<3;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(.04,8,6),M(0x8a8a90,{metalness:.7}));m.position.x=(i-1)*.1;g.add(m)}})},
   {n:'상평통보',h:'조선 후기 엽전이에요. 진에 머물던 군사들이 쓰던 돈이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})},
   {n:'백자 사발 조각',h:'군사들이 밥을 먹던 백자 그릇 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.SphereGeometry(.18,14,8,0,2,Math.PI/2,Math.PI/2),M(0xf0ece0,{side:THREE.DoubleSide})))})},
   {n:'기와 조각',h:'돈대 안 건물 지붕의 기와 조각이에요.',mk:mk(g=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.3,12,1,true,0,Math.PI),M(0x5a5a58,{side:THREE.DoubleSide}));m.rotation.z=Math.PI/2;g.add(m)})}];
  window.__CJDIG=()=>{window.__DETECT&&window.__DETECT({key:'chojijin_dig',title:'초지진 발굴 탐지',emoji:'⛏️',bg:'#1e2428',count:4,TL:150,cand:[[24,24],[30,10],[-10,22],[0,30],[36,30],[-24,10],[14,34],[40,-2]],items:ITEMS,intro:'초지진 둘레 땅속에 조선 군사들의 물건이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'강화 돈대 둘레에서는 포탄과 탄환, 군사들이 쓰던 그릇 조각이 함께 나와요.'})};
  sp(-6,24,2.4,'발굴 탐지 자리','초지진 둘레 땅속에 유물이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 },
 mini:{S:2,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#6a665a';g.fillRect(0,0,300,300);g.fillStyle='#5a6a72';g.fillRect(0,0,300,Z(-28));g.fillStyle='#8a8070';g.beginPath();g.ellipse(X(5),Z(-6),20*S,16*S,0,0,7);g.fill()}}})}
