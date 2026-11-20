/* 문경새재 주막 마당(2026-11-21): 스케치팹 solikenom 「문경새재 한옥」(CC BY 4.0, 문경새재 오픈세트 양반가·주막) 3D. 단위가 mm라 0.001배로 실제 크기.
   새재 옛길을 넘던 길손이 쉬어 가던 주막 풍경. 놀이: 길손에게 국밥 나르기. */
import {photoSite} from './photosite.js';
const SRC='(3D: solikenom, Sketchfab, CC BY 4.0)';
export function buildJumak(opts={}){return photoSite('jumak',opts,{h0:.7,groundY:.55,groundColor:0x9a8a6a,
 title:'문경새재 주막',hint:'문경새재 옛길의 한옥 주막을 실제 크기로 놓았어요. 평상에 앉은 길손들에게 국밥을 날라 봐요. '+SRC,
 quest:{t:'새재 주막 둘러보기',d:'새재 옛길 주막을 둘러보세요.',steps:[['주막','새재 주막'],['평상','길손 평상']]},
 spawn:{x:0,z:16,yaw:Math.PI},bounds:[-30,30,-20,30],level:'문경새재 주막',env:{fog:[60,260],sign:{x:-5,z:14,y:.6,lines:['문경새재 주막','새재 옛길 쉼터','조선 길손의 주막','3D · 실제 크기']}},
 npc:[['carpenter',[[-4,12],[4,12],[4,16],[-4,16]]]],
 build({G,spots,solids,THREE}){
  spots.push({x:0,y:0,z:8,r:4,t:'새재 주막',h:'문경새재는 조선 때 한양과 영남을 잇던 가장 큰 고갯길이에요. 과거 보러 가던 선비, 장사꾼이 고개 아래 주막에서 국밥을 먹고 쉬어 갔어요. 한옥 3D는 문경새재 오픈세트를 옮긴 거예요. '+SRC});
  const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));
  /* 평상과 길손 넷 */const SEAT=[[-9,12],[-9,18],[9,12],[9,18]];const P=[];for(const[x,z]of SEAT){const g=new THREE.Group();g.position.set(x,.55,z);const t=new THREE.Mesh(new THREE.BoxGeometry(2.4,.12,1.6),M(0x8a6a44));t.position.y=.45;g.add(t);for(const[a,b]of[[-1.1,-.7],[1.1,-.7],[-1.1,.7],[1.1,.7]]){const l=new THREE.Mesh(new THREE.BoxGeometry(.1,.45,.1),M(0x6a4a2a));l.position.set(a,.22,b);g.add(l)}const body=new THREE.Mesh(new THREE.CylinderGeometry(.25,.32,.6,8),M([0xf0ead8,0x8a8a9a,0x6a7a5a,0xd8c8a8][P.length]));body.position.set(0,.85,0);g.add(body);const hd=new THREE.Mesh(new THREE.SphereGeometry(.2,10,8),M(0xf4e0c8));hd.position.y=1.32;g.add(hd);const gat=new THREE.Mesh(new THREE.CylinderGeometry(.36,.36,.03,16),M(0x1a1a1a));gat.position.y=1.52;g.add(gat);const cr=new THREE.Mesh(new THREE.CylinderGeometry(.12,.14,.22,10),M(0x1a1a1a));cr.position.y=1.63;g.add(cr);G.add(g);solids.push({x0:x-1.2,x1:x+1.2,y0:0,y1:1.1,z0:z-.8,z1:z+.8});P.push({x,z,g})}
  spots.push({x:0,y:0,z:15,r:3,t:'길손 평상',h:'주막 마당 평상에 앉은 길손들이에요. 국밥 한 그릇에 막걸리 한 사발로 고갯길 피로를 풀었어요.'});
  const KX=0,KZ=6.2;
  window.__JMBOWL=()=>{if(document.getElementById('jmP'))return;const H=window.__H3,ctx=H.ctx();try{H.tp(0,10,.6);H.face(0)}catch(e){}
   const g=new THREE.Group();G.add(g);const mkB=()=>{const b=new THREE.Group();const bw=new THREE.Mesh(new THREE.SphereGeometry(.22,14,8,0,Math.PI*2,Math.PI/2,Math.PI/2),M(0x3a2a20,{side:THREE.DoubleSide}));b.add(bw);const soup=new THREE.Mesh(new THREE.CircleGeometry(.2,14),M(0xc8a070));soup.rotation.x=-Math.PI/2;soup.position.y=-.03;b.add(soup);return b};
   const ring=(x,z,c)=>{const r=new THREE.Mesh(new THREE.RingGeometry(.7,.95,24),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.55,depthWrite:false,side:THREE.DoubleSide}));r.rotation.x=-Math.PI/2;r.position.set(x,.6,z);g.add(r);return r};const rK=ring(KX,KZ+1.4,0xffb040);
   const carry=mkB();carry.visible=false;g.add(carry);const order=[0,1,2,3].sort(()=>Math.random()-.5);
   const d=document.createElement('div');d.id='jmP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#3a2a1a;border:3px solid #e0b048;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
   const N=4,TL=70;let n=0,has=false,done=false,t0=performance.now()/1000,cur=null;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffd890">🍲 길손에게 국밥 나르기</b><div id="jmS" style="font:20px 'Do Hyeon',sans-serif;margin:4px 0">0 / ${N}</div><div id="jmG" style="font-size:13px;color:#ffd890">주막 부엌(주황 고리)에서 국밥을 받아요</div><div id="jmT" style="font-size:13px">${TL}초</div><div style="font-size:12px;opacity:.85">손을 든 길손(초록 고리)에게 날라요</div>`;const Sx=d.querySelector('#jmS'),Gd=d.querySelector('#jmG'),T=d.querySelector('#jmT');
   const tink=()=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='triangle';o.frequency.value=660+n*90;gg.gain.setValueAtTime(.07,s);gg.gain.exponentialRampToValueAtTime(.0001,s+.3);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+.32)}catch(e){}};
   let rT=null;const fin=()=>{if(done)return;done=true;const el=performance.now()/1000-t0;const Q=n>=N?Math.max(70,Math.round(100-Math.max(0,el-35)*1.2)):Math.round(n/N*65);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('jumak_bowl',Q,'길손에게 국밥 나르기')}catch(e){}window.__JMQ=Q;carry.visible=false;
    setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffd890">국밥 ${n}그릇을 날랐어요</b><div style="font-size:13px;margin:4px 0">배부른 길손들이 새재를 넘어 한양으로 떠나요. 문경새재에는 관문이 셋 있어요.</div><div style="font-size:26px;color:#e0b048">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#e0b048;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__JMBOWL(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},800)};
   const loop=()=>{if(!d.isConnected){G.remove(g);return}const now=performance.now()/1000;const Pp=H.P;
    if(!done){if(!has&&Math.hypot(Pp.x-KX,Pp.z-KZ-1.4)<1.2){has=true;tink();cur=order[n];const s=P[cur];if(rT)g.remove(rT);rT=ring(s.x,s.z+1.4*(s.z>15?1:-1),0x8ae08a);Gd.textContent='손 든 길손에게 날라요'}
     if(has&&cur!=null){const s=P[cur];if(Math.hypot(Pp.x-s.x,Pp.z-s.z)<2){has=false;n++;tink();const b=mkB();b.position.set(0,1.0,0);s.g.add(b);if(rT){g.remove(rT);rT=null}Gd.textContent='다시 부엌으로 가요';try{ctx.say('국밥 나왔어요!',1)}catch(e){}if(n>=N)fin()}}
     carry.visible=has;if(has)carry.position.set(Pp.x,Pp.y+1.3,Pp.z);rK.visible=!has;Sx.textContent=n+' / '+N;const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin()}
    if(cur!=null&&has){const s=P[cur];s.g.rotation.z=Math.sin(now*6)*.04}requestAnimationFrame(loop)};loop();
   window.__JMG={P,K:[KX,KZ+1.4],get n(){return n},get cur(){return cur},get has(){return has}};try{ctx.say('주막 일손이 모자라요! 길손에게 국밥을 날라 줘요.',2.5)}catch(e){}};
  spots.push({x:3,y:0,z:11,r:2,t:'국밥 나르는 자리',h:'주막 부엌에서 국밥을 받아 평상 길손에게 날라 봐요.'});
 },
 mini:{S:6,ox:0,oz:5,draw(g,X,Z,S){g.fillStyle='#9a8a6a';g.fillRect(0,0,300,300);g.fillStyle='#5a5a5a';g.fillRect(X(-8),Z(6),16*S,13*S)}}})}
