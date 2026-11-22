/* 김천 방초정 마당(2026-11-21): 스케치팹 lacomi1975 사진 측량(CC BY 4.0), 측량좌표 그대로 실제 크기.
   조선 1625년 이정복이 세운 2층 정자(보물)와 네모난 연못(최씨담), 둘레 논. 놀이: 방초정 앞 논 모심기. */
import {photoSite,photoDig} from './photosite.js';
const SRC='(3D: lacomi1975, Sketchfab, CC BY 4.0)';
export function buildBangcho(opts={}){const R=photoSite('bangcho',opts,{h0:2,
 title:'김천 방초정',hint:'사진 측량한 방초정과 연못, 둘레 논을 실제 크기로 놓았어요. 연못 둘레를 걷고 논에서 모심기도 해 봐요. '+SRC,
 quest:{t:'방초정 둘러보기',d:'조선 정자와 연못을 실측 그대로 둘러보세요.',steps:[['방초정','방초정'],['연못','최씨담 연못'],['논','방초정 앞 논']]},
 spawn:{x:22,z:-20,yaw:Math.PI},bounds:[-40,40,-42,42],level:'방초정',
 env:{sign:{x:16,z:-16,y:2,lines:['김천 방초정','보물 · 조선 1625년','2층 정자 · 네모 연못','실측 3D · 실제 크기']}},
 npc:[['carpenter',[[14,-12],[26,-12],[26,-20],[14,-20]]]],
 build({G,spots,hAt,THREE}){
  spots.push({x:0,y:0,z:20,r:6,t:'방초정',h:'조선 인조 때(1625) 이정복이 부모를 기리며 세운 2층 정자예요(보물). 2층 마루 가운데에 온돌방을 둔 독특한 짜임이에요. '+SRC});
  spots.push({x:0,y:0,z:4,r:6,t:'최씨담 연못',h:'정자 앞 네모난 연못 안에 둥근 섬 두 개가 있어요. 임진왜란 때 정절을 지킨 이정복의 부인 화순 최씨를 기려 최씨담이라 불러요. '+SRC});
  spots.push({x:24,y:0,z:-24,r:6,t:'방초정 앞 논',h:'정자 둘레는 지금도 논이에요. 김천 사람들은 정자 그늘에서 쉬며 논일을 했어요. '+SRC});
  /* 모심기(11/21): 줄 맞춰 모 스무 포기를 60초 안에 */
  const SPOT=[];for(const z of[-13,-18,-23,-28,-33])for(const x of[19,23,27,31])SPOT.push([x,z]);
  window.__BGRICE=()=>{if(document.getElementById('brP'))return;const H=window.__H3,ctx=H.ctx();try{H.tp(25,-10,hAt(25,-10))}catch(e){}
   const g=new THREE.Group();G.add(g);const M=new THREE.MeshStandardMaterial({color:0x6aa83a,roughness:.8});const P=[];
   for(const[x,z]of SPOT){const y=hAt(x,z);const mk=new THREE.Mesh(new THREE.RingGeometry(.35,.5,16),new THREE.MeshBasicMaterial({color:0xffe08a,transparent:true,opacity:.6,depthWrite:false,side:THREE.DoubleSide}));mk.rotation.x=-Math.PI/2;mk.position.set(x,y+.05,z);g.add(mk);const s=new THREE.Group();s.position.set(x,y,z);for(let k=0;k<5;k++){const b=new THREE.Mesh(new THREE.ConeGeometry(.03,.5,4),M);b.position.set((k-2)*.04,.25,(k%2)*.04);b.rotation.z=(k-2)*.15;s.add(b)}s.scale.setScalar(.01);g.add(s);P.push({x,z,mk,s,done:false})}
   const d=document.createElement('div');d.id='brP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#22301e;border:3px solid #e0b048;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
   const N=P.length,TL=60;let n=0,done=false,t0=performance.now()/1000;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffd890">🌾 방초정 앞 논 모심기</b><div id="brS" style="font:20px 'Do Hyeon',sans-serif;margin:4px 0">0 / ${N}</div><div id="brT" style="font-size:13px">${TL}초</div><div style="font-size:12px;opacity:.85">노란 고리 자리마다 모를 꽂아요. 줄 맞춰 차례로 가면 빨라요</div>`;const Sx=d.querySelector('#brS'),T=d.querySelector('#brT');
   const plop=()=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='sine';o.frequency.setValueAtTime(300,s);o.frequency.exponentialRampToValueAtTime(120,s+.12);gg.gain.setValueAtTime(.1,s);gg.gain.exponentialRampToValueAtTime(.0001,s+.18);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+.2)}catch(e){}};
   const fin=()=>{if(done)return;done=true;const el=performance.now()/1000-t0;const Q=n>=N?Math.max(70,Math.round(100-Math.max(0,el-35)*1.2)):Math.round(n/N*65);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('bangcho_rice',Q,'방초정 앞 논 모심기')}catch(e){}window.__BGRQ=Q;
    setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffd890">모 ${n}포기를 심었어요</b><div style="font-size:13px;margin:4px 0">옛날엔 마을 사람이 다 같이 줄을 맞춰 모를 심었어요. 힘들면 정자 그늘에서 쉬었대요.</div><div style="font-size:26px;color:#e0b048">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#e0b048;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__BGRICE(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},800)};
   const loop=()=>{if(!d.isConnected){G.remove(g);return}const now=performance.now()/1000;const Pp=H.P;
    if(!done){for(const p of P)if(!p.done&&Math.hypot(Pp.x-p.x,Pp.z-p.z)<.9){p.done=true;p.mk.visible=false;n++;plop();if(n>=N)fin()}Sx.textContent=n+' / '+N;const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초';if(left<=0)fin()}
    for(const p of P)if(p.done&&p.s.scale.x<1)p.s.scale.setScalar(Math.min(1,p.s.scale.x+.08));requestAnimationFrame(loop)};loop();
   window.__BRG={P,get n(){return n}};try{ctx.say('방초정 앞 논에 모를 심어요! 노란 고리마다 꽂아 봐요.',2.5)}catch(e){}};
  spots.push({x:20,y:0,z:-11,r:2.4,t:'모심기 자리',h:'방초정 앞 논에서 모심기를 해 봐요.'});
 },
 mini:{S:3,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#7a9a48';g.fillRect(0,0,300,300);g.fillStyle='#4a6a7a';g.fillRect(X(-10),Z(10),20*S,14*S)}}});R.key='bangcho_dig';return photoDig(R,{fn:'BCHDIG',key:'bangcho_dig',title:'방초정 발굴 탐지',intro:'방초정 둘레 흙 속에 옛 물건이 묻혀 있대요. 탐지기로 찾아 봐요!',ok:'방초정은 조선 중기에 지은 정자로, 앞 연못과 함께 김천 원터마을을 지켜 왔어요.',items:[['백자 잔','정자에서 쓰던 백자 잔이에요.','bowl',0xf0ece0],['벼루 조각','글을 쓰던 벼루 조각이에요.','stone',0x2a2a2e],['기와 조각','정자 지붕의 기와 조각이에요.','tile',0x5a5a54],['호미 날','앞 논을 매던 쇠 호미 날이에요.','rod',0x4a4440],['엽전','조선 상평통보예요.','coin',0x6a5a30]]})}
