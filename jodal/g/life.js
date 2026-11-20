/* 무이 나라 조달청: 「고을 사람들」(퀄리티 P24). 만든 날 2026-11-17
   일감 고을 다섯에 주민 무이를 셋씩 세워 살림을 하게 한다(우물가 항아리 나르기, 장작 옆 망치질, 가마 앞 반죽, 마당 비질, 평상에서 책 읽기).
   자리는 villages.js(가마·장작·공방)와 props.js(우물·장작·평상) 위치에서 고을 가운데 24m 안의 것을 고름.
   화면 속도: 무이가 70m 밖이면 숨기고 움직임도 멈춤. setupLife(scene) 한 번. window.__LIFE = 세운 수 */
export function setupLife(scene){const H=window.__H3;if(!H||!H.makeMuui||!scene||scene.userData.life)return null;scene.userData.life=1;
 const V=window.__VIL,PR=window.__PROPS;if(!V||!V.towns)return null;const towns=V.towns.map(t=>({k:t[0],x:t[1],z:t[2]}));
 const spots=[];const add=(x,y,z,act,kind)=>spots.push({x,y,z,act,kind});
 for(const f of(V.focus||[])){const[nm,x,y,z]=f;if(nm==='kiln')add(x,y,z,'knead','ceramic');else if(nm==='logPile')add(x,y,z,'hammer','carpenter');else if(nm==='shed')add(x,y,z,'paint','painter');else if(nm==='rack')add(x,y,z,'carry','ceramic')}
 if(PR&&PR.pos){for(const[x,y,z]of(PR.pos.well||[]))add(x,y,z,'carry','base');for(const[x,y,z]of(PR.pos.pile||[]))add(x,y,z,'hammer','carpenter');for(const[x,y,z]of(PR.pos.bench||[]))add(x,y,z,'read','science');for(const[x,y,z]of(PR.pos.line||[]))add(x,y,z,'sweep','base')}
 const pick=[];for(const t of towns){const near=spots.filter(s=>Math.hypot(s.x-t.x,s.z-t.z)<24);const seen=new Set();for(const s of near){if(seen.has(s.act))continue;seen.add(s.act);pick.push({...s,town:t});if(seen.size>=3)break}}
 const live=[];let n=0;for(const s of pick){const a=Math.random()*6.283,ox=Math.cos(a)*1.1,oz=Math.sin(a)*1.1;
  H.makeMuui(s.kind,1.0).then(m=>{const y=H.floorAt?H.floorAt(s.x+ox,s.z+oz,s.y+3):s.y;m.root.position.set(s.x+ox,isFinite(y)?y:s.y,s.z+oz);m.root.rotation.y=Math.atan2(-ox,-oz);m.play(s.act);m.mx.update(Math.random()*3);live.push(m);n++;window.__LIFE=n}).catch(()=>{})}
 /* 11/20 시연 영상: 주소에 rec 가 있으면 무이 곁 10m 안 주민은 숨김(화면 앞을 가로지르지 않게). 실제 게임은 그대로 */const REC=/[?&]rec(&|$)/.test(location.search);let lt=performance.now();const tick=()=>{const now=performance.now(),dt=Math.min(.05,(now-lt)/1000);lt=now;const P=H.P;for(const m of live){const dd=P?Math.hypot(P.x-m.root.position.x,P.z-m.root.position.z):0,far=dd>70||(REC&&dd<10);m.root.visible=!far;if(!far)m.mx.update(dt)}requestAnimationFrame(tick)};tick();
 window.__LIFE=0;return pick.length}
