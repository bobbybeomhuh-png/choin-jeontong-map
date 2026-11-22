/* 강릉 굴산사지 마당(2026-11-21): 스케치팹 lacomi1975 사진 측량(CC BY 4.0) 굴산사지 당간지주(보물)와 승탑(보물)을 실제 높이(둘 다 5.4m)로 맞춰 놓음.
   신라 말 범일국사가 세운 큰 절 굴산사의 터. 당간(쇠 깃대)은 사라지고 받침 기둥만 남아 있어, 놀이로 당간을 세우고 깃발을 올려 봄. */
import {photoSite,photoDig} from './photosite.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
const SRC='(3D: lacomi1975, Sketchfab, CC BY 4.0)';
export function buildGulsan(opts={}){const R=photoSite('gulsan',opts,{h0:0,groundY:-2,groundColor:0x6a8a4a,
 title:'강릉 굴산사지',hint:'사진 측량한 굴산사지 당간지주와 승탑을 실제 높이로 놓았어요. 사라진 당간을 다시 세우고 깃발을 올려 봐요. '+SRC,
 quest:{t:'굴산사지 둘러보기',d:'당간지주와 승탑을 실측 그대로 둘러보세요.',steps:[['당간지주','굴산사지 당간지주'],['승탑','굴산사지 승탑']]},
 spawn:{x:2.9,z:12,yaw:Math.PI},bounds:[-13,13,-18,18],level:'굴산사지',env:{fog:[90,400],sign:{x:-4,z:12,y:-.3,lines:['강릉 굴산사지','신라 말 범일국사의 절터','당간지주 · 승탑(보물)','실측 3D · 실제 높이']}},
 npc:[['science',[[-2,10],[6,10],[6,14],[-2,14]]]],
 build({G,solids,cam,spots,hAt,THREE}){
  spots.push({x:2.9,y:0,z:4,r:3.4,t:'굴산사지 당간지주',h:'절 앞에 큰 깃발(당)을 걸던 쇠 깃대(당간)를 붙잡아 세우던 돌기둥 한 쌍이에요(보물). 높이 5.4m로 우리나라 당간지주 가운데 가장 커요. 실측 그대로예요. '+SRC});
  spots.push({x:-5,y:0,z:5,r:3,t:'굴산사지 승탑',h:'굴산사를 세운 범일국사의 사리를 모신 것으로 전하는 승탑이에요(보물). 여덟모 몸돌에 구름·사자·천인이 새겨져 있어요. 실제 높이 5.4m에 맞췄어요. '+SRC});
  if(!opts.mini){const gl=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(dr);
   gl.load(new URL('../models/gulsan/stupa.glb',import.meta.url).href,g=>{const o=g.scene;o.traverse(e=>{if(e.isMesh){e.castShadow=e.receiveShadow=true;if(e.material){e.material.roughness=.9;e.material.metalness=0;e.material.transparent=false;e.material.alphaTest=0;e.material.alphaHash=false}cam.push(e)}});const bx=new THREE.Box3().setFromObject(o);const c=bx.getCenter(new THREE.Vector3());o.position.set(-c.x,-bx.min.y,-c.z);const p=new THREE.Group();p.add(o);p.position.set(-5,-.6,1);p.userData.noBatch=true;o.userData.noBatch=true;G.add(p);solids.push({cx:-5,cz:1,r:1.5,y0:-2,y1:6})},undefined,()=>{})}
  /* 당간 세우고 깃발 올리기(11/21): '당기기'를 누르고 있으면 깃발이 올라가고, 떼면 미끄러져 내려와요. 바람이 불면 더 미끄러져요. 45초 안에 꼭대기(15m) */
  const PX=2.9,PZ=.6,PH=15;
  window.__GSFLAG=()=>{if(document.getElementById('gsP'))return;const H=window.__H3,ctx=H.ctx();try{H.tp(PX,PZ+4,0);H.face(Math.PI)}catch(e){}
   const g=new THREE.Group();g.position.set(PX,0,PZ);G.add(g);const iron=new THREE.MeshStandardMaterial({color:0x4a4038,metalness:.6,roughness:.5});
   for(let i=0;i<20;i++){const s=new THREE.Mesh(new THREE.CylinderGeometry(.22,.24,PH/20,12),iron);s.position.y=(i+.5)*PH/20;g.add(s);const ring=new THREE.Mesh(new THREE.TorusGeometry(.25,.035,6,14),iron);ring.rotation.x=Math.PI/2;ring.position.y=(i+1)*PH/20;g.add(ring)}
   const top=new THREE.Mesh(new THREE.ConeGeometry(.3,.8,8),new THREE.MeshStandardMaterial({color:0xc8a040,metalness:.7,roughness:.3}));top.position.y=PH+.4;g.add(top);
   const bc=document.createElement('canvas');bc.width=64;bc.height=256;{const q=bc.getContext('2d');const cols=['#c83a2e','#e0b048','#2a6ab0','#2a8a4a','#f4f0e6'];for(let i=0;i<8;i++){q.fillStyle=cols[i%5];q.fillRect(0,i*32,64,32)}q.fillStyle='#2a1a10';q.font='bold 26px serif';q.fillText('崛',18,60);q.fillText('山',18,140);q.fillText('寺',18,220)}
   const bt=new THREE.CanvasTexture(bc);bt.colorSpace=THREE.SRGBColorSpace;const ban=new THREE.Mesh(new THREE.PlaneGeometry(1.2,4.6,1,8),new THREE.MeshStandardMaterial({map:bt,side:THREE.DoubleSide,roughness:.8}));ban.position.set(.7,2.6,0);g.add(ban);
   const d=document.createElement('div');d.id='gsP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#2a2016;border:3px solid #e0b048;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
   const TL=45;let y=0,hold=false,done=false,wind=0,t0=performance.now()/1000,lt=t0,gust=0;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffd890">🚩 당간에 깃발 올리기</b><div id="gsS" style="font:20px 'Do Hyeon',sans-serif;margin:4px 0">0m / ${PH}m</div><div id="gsW" style="font-size:13px;color:#9fd8ff">바람 잔잔</div><div id="gsT" style="font-size:13px">${TL}초</div><div style="font-size:12px;opacity:.85">당기기를 누르고 있으면 깃발이 올라가요. 센바람이 불 땐 잠깐 쉬어요</div><button data-h style="font:18px 'Do Hyeon',sans-serif;background:#e0b048;color:#2a1a10;border:0;border-radius:10px;padding:8px 22px;margin-top:6px;cursor:pointer;touch-action:none">당기기</button>`;
   const Sx=d.querySelector('#gsS'),Wd=d.querySelector('#gsW'),T=d.querySelector('#gsT'),Bt=d.querySelector('[data-h]');
   const on=e=>{e&&e.preventDefault&&e.preventDefault();hold=true},off=()=>{hold=false};Bt.addEventListener('pointerdown',on);addEventListener('pointerup',off);Bt.addEventListener('pointerleave',off);
   const kd=e=>{if(e.code==='Space'){e.preventDefault();e.stopPropagation();hold=e.type==='keydown'}};addEventListener('keydown',kd,true);addEventListener('keyup',kd,true);
   const cleanup=()=>{removeEventListener('keydown',kd,true);removeEventListener('keyup',kd,true);removeEventListener('pointerup',off)};
   const creak=()=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='sawtooth';o.frequency.setValueAtTime(180,s);o.frequency.linearRampToValueAtTime(140,s+.1);gg.gain.setValueAtTime(.02,s);gg.gain.exponentialRampToValueAtTime(.0001,s+.12);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+.13)}catch(e){}};let cr=0;
   const fin=ok=>{if(done)return;done=true;hold=false;cleanup();const el=performance.now()/1000-t0;const Q=ok?Math.max(70,Math.round(100-Math.max(0,el-20)*1.2)):Math.round(y/PH*65);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('gulsan_flag',Q,'당간에 깃발 올리기')}catch(e){}window.__GSFQ=Q;
    setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffd890">${ok?'깃발이 꼭대기에 올랐어요':'깃발을 '+Math.round(y)+'m 올렸어요'}</b><div style="font-size:13px;margin:4px 0">절에 큰 행사가 있으면 당간 꼭대기에 깃발을 걸어 멀리서도 알게 했어요. 쇠 당간은 사라지고 돌기둥만 남았어요.</div><div style="font-size:26px;color:#e0b048">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#e0b048;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__GSFLAG(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},900)};
   const loop=()=>{if(!d.isConnected){cleanup();G.remove(g);return}const now=performance.now()/1000,dt=Math.min(.05,now-lt);lt=now;
    if(!done){gust-=dt;if(gust<=0){gust=2+Math.random()*3;wind=Math.random()<.4?1:0}const strong=wind&&Math.sin(now*1.3)>-.2;Wd.textContent=strong?'센바람! 잠깐 쉬어요':'바람 잔잔';Wd.style.color=strong?'#ff9a7a':'#9fd8ff';
     if(hold){y+=dt*(strong?-.6:1.1);cr-=dt;if(cr<=0){cr=.18;creak()}if(strong)y-=dt*1.4}else y-=dt*(strong?1.2:.35);y=Math.max(0,Math.min(PH-2.4,y));
     Sx.textContent=Math.round(y+2.4)+'m / '+PH+'m';const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(y>=PH-2.45)fin(true);else if(left<=0)fin(false)}
    ban.position.y=2.6+y;const pa=ban.geometry.attributes.position;for(let k=0;k<pa.count;k++){const yy=pa.getY(k);pa.setZ(k,Math.sin(now*4+yy*1.5)*.12*(1+wind))}pa.needsUpdate=true;
    if(!window.__CAMFN)window.__GCAM=()=>d.isConnected?[PX+9,4+y*.6,PZ+11,PX,3+y*.9,PZ,55]:null;requestAnimationFrame(loop)};loop();
   window.__GSG={set hold(v){hold=v},get y(){return y}};try{ctx.say('사라진 당간을 다시 세웠어요! 깃발을 꼭대기까지 올려 봐요.',3)}catch(e){}};
  spots.push({x:6,y:0,z:6,r:2.4,t:'깃발 올리는 자리',h:'당간지주 사이에 쇠 당간을 다시 세우고 깃발을 올려 봐요.'});
 },
 mini:{S:6,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#6a8a4a';g.fillRect(0,0,300,300);g.fillStyle='#9a948a';g.fillRect(X(1.5),Z(1),.8*S,.8*S);g.fillRect(X(3.6),Z(1),.8*S,.8*S);g.beginPath();g.arc(X(-5),Z(1),1.5*S,0,7);g.fill()}}});R.key='gulsan_dig';return photoDig(R,{fn:'GSSDIG',key:'gulsan_dig',title:'굴산사지 발굴 탐지',intro:'굴산사지 흙 속에 신라 말 큰 절의 흔적이 묻혀 있대요. 탐지기로 찾아 봐요!',ok:'굴산사는 신라 말 범일국사가 세운 큰 절로, 지금은 당간지주와 승탑이 남아 있어요.',items:[['신라 기와','절 지붕의 신라 기와 조각이에요.','tile',0x6a6660],['토기 조각','회색 토기 조각이에요.','shard',0x6a6a68],['쇠 못','건물을 짓던 쇠못이에요.','rod',0x4a4440],['금동 장식','절을 꾸미던 금동 장식이에요.','ring',0xc8a040],['주춧돌 조각','건물 주춧돌 조각이에요.','stone',0x9a948a]]})}
