/* 무이 나라 조달청: 「느린 컴퓨터 맞춤」(퀄리티 P12). 만든 날 2026-11-17
   지도 화면의 초당 장수를 4초씩 재서, 느리면 한 단계씩 가볍게 한다(빠른 컴퓨터에선 아무것도 안 바뀜).
   1단계(초당 34 밑): 화면 해상도 배율 1로  2단계(28 밑): 후처리(윤곽선·빛번짐) 끔  3단계(24 밑): 발밑 풀 숨김·그림자 지도 줄임
   ?perf=0 이면 끔. window.__PERF = {lv, fps} */
export function setupPerf(scene,R){if(!scene||!R||scene.userData.perf)return null;scene.userData.perf=1;if(/[?&]perf=0/.test(location.search))return null;
 const S={lv:0,fps:60};window.__PERF=S;let n=0,t0=performance.now(),warm=0;
 const step=()=>{S.lv++;try{if(S.lv===1){R.setPixelRatio(1)}else if(S.lv===2){window.__POST&&window.__POST(false)}else if(S.lv===3){scene.traverse(o=>{if(o.isInstancedMesh&&o.material&&o.material.alphaTest===.5&&o.count>5000)o.visible=false});scene.traverse(o=>{if(o.isDirectionalLight&&o.castShadow&&o.shadow&&o.shadow.mapSize.x>1024){o.shadow.mapSize.set(1024,1024);if(o.shadow.map){o.shadow.map.dispose();o.shadow.map=null}}})}}catch(e){console.warn('맞춤',e)}};
 const tick=()=>{n++;const now=performance.now();if(now-t0>4000){S.fps=Math.round(n*1000/(now-t0));n=0;t0=now;
   /* 처음 8초(불러오기 중)는 재지 않음, 놀이 창이 열려 있을 땐 재지 않음 */warm++;const busy=!!document.querySelector('.jd-ov,body>div[data-mg]')||document.hidden;
   if(warm>2&&!busy&&S.lv<3){if((S.lv===0&&S.fps<34)||(S.lv===1&&S.fps<28)||(S.lv===2&&S.fps<24))step()}}
  if(S.lv<3)requestAnimationFrame(tick)};requestAnimationFrame(tick);return S}
