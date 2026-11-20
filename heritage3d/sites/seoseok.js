/* 영양 서석지 마당(2026-11-21): 스케치팹 lacomi1975 사진 측량(CC BY 4.0), 측량좌표 그대로 실제 크기.
   조선 광해군 때(1613) 정영방이 지은 정원(국가민속문화유산). 연못 안팎 상서로운 돌(서석)에 이름을 붙이고, 경정·주일재 같은 집을 지음. */
import {photoSite} from './photosite.js';
const SRC='(3D: lacomi1975, Sketchfab, CC BY 4.0)';
export function buildSeoseok(opts={}){return photoSite('seoseok',opts,{h0:1,groundY:-.5,groundColor:0x3a5a58,
 title:'영양 서석지',hint:'사진 측량한 서석지 정원을 실제 크기로 놓았어요. 연못 둘레를 돌며 이름 붙은 돌을 찾아 봐요. '+SRC,
 quest:{t:'서석지 둘러보기',d:'조선 선비의 연못 정원을 실측 그대로 둘러보세요.',steps:[['서석지','서석지'],['경정','경정']]},
 spawn:{x:-20,z:-20,yaw:Math.PI},bounds:[-27,27,-29,29],level:'서석지',env:{fog:[80,360],sign:{x:-22,z:-16,y:0,lines:['영양 서석지','국가민속문화유산','조선 선비 정원(1613)','실측 3D · 실제 크기']}},
 npc:[['carpenter',[[-24,-22],[-16,-22],[-16,-18],[-24,-18]]]],
 build({G,spots,hAt,THREE}){
  spots.push({x:-6,y:0,z:6,r:6,t:'서석지',h:'경북 영양의 조선 선비 정원이에요. 정영방이 연못을 파니 땅속에서 상서로운 돌(서석)이 많이 나와, 돌마다 선유석·옥성대·통진교 같은 이름을 붙였어요. 실측 그대로 실제 크기예요. '+SRC});
  spots.push({x:6,y:0,z:14,r:5,t:'경정',h:'연못을 바라보는 정자예요. 선비들이 모여 시를 짓고 학문을 이야기했어요. '+SRC});
  /* 이름 붙은 돌 찾기(11/21): 연못 둘레 여섯 자리를 차례로. 서석지 돌 이름에 담긴 뜻을 들어요 */
  const ST=[['선유석','신선이 노니는 돌'],['통진교','참된 세계로 건너는 다리 돌'],['옥성대','옥처럼 맑은 별이 내려앉은 돌'],['조천촉','하늘을 받치는 촛대 돌'],['상운석','상서로운 구름 돌'],['낙성석','별이 떨어진 돌']];
  const SP=[[-12.0, 2.0], [-13.1, 13.1], [-4.0, 16.0], [5.0, 12.0], [4.0, 2.0], [-2.9, -0.9]];
  window.__SSSTONE=()=>{if(document.getElementById('ssP'))return;const H=window.__H3,ctx=H.ctx();
   const g=new THREE.Group();G.add(g);const R=SP.map((p,i)=>{const y=hAt(p[0],p[1]);const r=new THREE.Mesh(new THREE.RingGeometry(.8,1.05,28),new THREE.MeshBasicMaterial({color:0xffd060,transparent:true,opacity:.5,depthWrite:false,side:THREE.DoubleSide}));r.rotation.x=-Math.PI/2;r.position.set(p[0],y+.06,p[1]);r.visible=i===0;g.add(r);return{x:p[0],z:p[1],r}});
   const d=document.createElement('div');d.id='ssP';d.style.cssText="position:fixed;right:16px;bottom:150px;z-index:60;background:#22281e;border:3px solid #e0b048;border-radius:16px;padding:12px 16px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f4ecd8;box-shadow:0 6px 18px rgba(0,0,0,.35);width:236px;user-select:none";document.body.appendChild(d);
   const N=R.length,TL=90;let idx=0,done=false,t0=performance.now()/1000;d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#ffd890">🪨 이름 붙은 돌 찾기</b><div id="ssS" style="font:18px 'Do Hyeon',sans-serif;margin:4px 0">다음: ${ST[0][0]}</div><div id="ssH" style="font-size:12px;color:#ffd890;min-height:15px"></div><div id="ssT" style="font-size:13px">${TL}초 · 0 / ${N}</div><div style="font-size:12px;opacity:.85">연못 둘레 노란 고리를 차례로 찾아가요. 돌 이름의 뜻을 들어 봐요</div>`;const Sx=d.querySelector('#ssS'),Hh=d.querySelector('#ssH'),T=d.querySelector('#ssT');
   const ding=()=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type='sine';o.frequency.value=660+idx*80;gg.gain.setValueAtTime(.08,s);gg.gain.exponentialRampToValueAtTime(.0001,s+.8);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+.85)}catch(e){}};
   const fin=()=>{if(done)return;done=true;const el=performance.now()/1000-t0;const Q=idx>=N?Math.max(70,Math.round(100-Math.max(0,el-40)*.9)):Math.round(idx/N*65);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('seoseok_stone',Q,'이름 붙은 돌 찾기')}catch(e){}window.__SSQ=Q;
    setTimeout(()=>{if(!d.isConnected)return;d.innerHTML=`<b style="font:18px 'Do Hyeon',sans-serif;color:#ffd890">돌 ${idx}개를 찾았어요</b><div style="font-size:13px;margin:4px 0">서석지에는 이름 붙은 돌이 열아홉 개, 연못에 잠긴 돌까지 합치면 아흔 개 가까이 있어요. 돌 하나하나에 선비의 꿈을 담았어요.</div><div style="font-size:26px;color:#e0b048">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#e0b048;color:#2a1a10;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f4ecd8;border:2px solid #f4ecd8;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();setTimeout(()=>window.__SSSTONE(),60)};d.querySelector('[data-x]').onclick=()=>d.remove()},900)};
   const loop=()=>{if(!d.isConnected){G.remove(g);return}const now=performance.now()/1000;const P=H.P;
    if(!done){const r=R[idx];r.r.material.opacity=.35+Math.sin(now*5)*.15;if(Math.hypot(P.x-r.x,P.z-r.z)<1.6){r.r.visible=false;ding();Hh.textContent=ST[idx][0]+': '+ST[idx][1];try{ctx.say(ST[idx][0]+', '+ST[idx][1]+'!',1.8)}catch(e){}idx++;if(idx>=N)fin();else{R[idx].r.visible=true;Sx.textContent='다음: '+ST[idx][0]}}const left=Math.max(0,TL-(now-t0));T.textContent=Math.ceil(left)+'초 · '+idx+' / '+N;if(left<=0)fin()}
    requestAnimationFrame(loop)};loop();window.__SSG={R,get idx(){return idx}};try{ctx.say('서석지 연못 둘레 이름 붙은 돌을 찾아 봐요!',2.5)}catch(e){}};
  spots.push({x:-16,y:0,z:-16,r:2.4,t:'돌 이름 찾는 자리',h:'서석지 돌에 붙은 이름을 찾아 연못 둘레를 돌아요.'});
 },
 mini:{S:4,ox:0,oz:0,draw(g,X,Z,S){g.fillStyle='#6a7a4a';g.fillRect(0,0,300,300);g.fillStyle='#4a6a7a';g.fillRect(X(-11),Z(15),14*S,14*S)}}})}
