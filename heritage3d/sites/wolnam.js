/* 강진 월남사지·다산초당 마당(2026-11-22, 강진 덧붙이기 E11): 스케치팹 lacomi1975 드론 사진 측량(CC BY 4.0) 「Wolnamsa Temple-site (월남사지)」를 실제 크기로(삼층석탑 높이 7.4m에 맞춰, 약 77×92m).
   월남사지(사적): 월출산 남쪽 기슭의 큰 절터. 고려 진각국사 혜심이 세웠다고 전하나 백제 양식을 이은 삼층석탑(보물)으로 보아 더 이를 수도 있음. 금당 터·회랑 터를 발굴해 정비.
   다산초당(강진): 정약용이 유배 18년 가운데 10년 남짓 머물며 「목민심서」 등 500여 권을 엮은 곳. 다산은 실학자로 거중기·배다리를 설계하고 측량에도 밝았음.
   놀이: 그림자로 탑 높이 재기(막대 그림자가 막대 길이와 같아지는 때를 찾아 탑 그림자 재기), 발굴 탐지, 밤 등(photosite). */
import {photoSite} from './photosite.js';
const SRC='(3D: lacomi1975, Sketchfab, CC BY 4.0)';
export function buildWolnam(opts={}){return photoSite('wolnam',opts,{h0:.3,groundY:-2,groundColor:0x5a7a3a,
 title:'강진 월남사지·다산',hint:'월출산 남쪽 월남사지를 드론 실측 그대로 실제 크기로 놓았어요. 다산처럼 그림자로 탑 높이를 재 봐요. '+SRC,
 quest:{t:'월남사지 둘러보기',d:'삼층석탑과 금당 터를 둘러보세요.',steps:[['석탑','월남사지 삼층석탑'],['금당','금당 터']]},
 spawn:{x:0,z:36,yaw:Math.PI},bounds:[-38,38,-45,45],level:'강진',env:{fog:[100,420],groundY:-2.1,noHills:false,sign:{x:6,z:38,y:0,lines:['강진 월남사지','보물 삼층석탑(7.4m)','다산의 실학','드론 실측 3D']}},
 npc:[['science',[[2,32],[10,32],[10,40],[2,40]]]],
 build({G,spots,hAt,THREE}){
  const sp=(x,z,r,t,h)=>spots.push({x,y:hAt(x,z),z,r,t,h});
  sp(-1.5,-21,3,'월남사지 삼층석탑','높이 7.4m의 고려 석탑이에요(보물). 백제 석탑을 닮은 넓은 지붕돌이 특징이에요. 드론 실측 그대로예요. '+SRC);
  sp(4,0,4,'금당 터','절의 중심 법당이 있던 자리예요. 발굴로 큰 건물 터와 기와가 나왔어요.');
  sp(-6,24,2.2,'그림자 재는 자리','다산 정약용은 강진 유배 중에도 측량과 과학 연구를 이어 갔어요. 해와 그림자로 탑 높이를 재 봐요.');
  sp(14,30,3,'다산초당 이야기','다산은 강진에서 18년 유배를 살며 다산초당에서 「목민심서」 「경세유표」 등 500여 권을 엮었어요. 초당 바위에 「丁石」 두 글자를 손수 새겼어요.');
  /* 그림자로 높이 재기(11/22): 해 높이를 움직이면 막대(1m)와 대상의 그림자가 함께 변해요. 막대 그림자가 1m가 될 때(해가 45°) 「재기」를 누르면 그때 대상 그림자 = 대상 높이. 세 대상, 맞힌 정도로 점수 */
  const TARGETS=[['월남사지 삼층석탑',7.4],['당간지주',4.2],['느티나무',11]];
  window.__WNSHADOW=()=>{if(document.getElementById('wnP'))return;const H3=window.__H3,ctx=H3.ctx();try{H3.tp(-6,24,0)}catch(e){}
   const cv=document.createElement('canvas');cv.id='wnC';cv.style.cssText='position:fixed;inset:0;z-index:55;width:100%;height:100%;touch-action:none';document.body.appendChild(cv);const q=cv.getContext('2d');cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio;
   let ti=0,alt=20,done=false,res=[],last=performance.now()/1000;
   const d=document.createElement('div');d.id='wnP';d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:18px;z-index:60;background:#22281a;border:3px solid #b8c870;border-radius:16px;padding:10px 14px;text-align:center;font:14px 'Gowun Dodum',sans-serif;color:#f0f4e0;box-shadow:0 6px 18px rgba(0,0,0,.35);width:300px;max-width:92vw;user-select:none";document.body.appendChild(d);
   const draw=()=>{const[name]=TARGETS[ti]||['',0];d.innerHTML=`<b style="font:16px 'Do Hyeon',sans-serif;color:#d8e8a0">☀️ 그림자로 높이 재기</b><div style="font-size:13px;margin:2px 0">${ti+1} / ${TARGETS.length} · ${name}</div><div style="font-size:12px;color:#d8e8a0">해를 움직여 막대 그림자가 1m가 되면 「재기」</div><input id="wnR" type="range" min="10" max="80" step="0.5" value="${alt}" style="width:100%;margin:8px 0"><div style="display:flex;gap:6px"><button id="wnM" style="flex:1;font:17px 'Do Hyeon',sans-serif;background:#b8c870;color:#22281a;border:0;border-radius:12px;padding:9px 0;cursor:pointer">📏 재기</button></div><div id="wnG" style="font-size:12px;margin-top:4px;min-height:16px"></div>`;const R=d.querySelector('#wnR');R.oninput=()=>{alt=+R.value};d.querySelector('#wnM').onclick=measure};
   const snd=(f,len,type='triangle')=>{try{const AC=ctx.ac();if(!AC)return;const s=AC.currentTime,o=AC.createOscillator(),gg=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,s);gg.gain.setValueAtTime(.05,s);gg.gain.exponentialRampToValueAtTime(.0001,s+len);o.connect(gg).connect(ctx.out()||AC.destination);o.start(s);o.stop(s+len+.02)}catch(e){}};
   const measure=()=>{if(done)return;const[name,h]=TARGETS[ti];const sh=h/Math.tan(alt*Math.PI/180);const stick=1/Math.tan(alt*Math.PI/180);const est=sh;const err=Math.abs(est-h)/h;res.push(Math.max(0,1-err*2));snd(err<.08?880:err<.2?600:220,.3);d.querySelector('#wnG').textContent=`그림자 ${est.toFixed(1)}m → ${name} 높이 약 ${est.toFixed(1)}m (실제 ${h}m) ${err<.08?'딱 맞아요!':err<.2?'거의 맞았어요':'막대 그림자를 1m에 더 맞춰 봐요'}`;ti++;if(ti>=TARGETS.length){fin();return}const msg=d.querySelector('#wnG').textContent;alt=20+Math.random()*10;draw();d.querySelector('#wnG').textContent=msg};
   const cleanup=()=>cv.remove();
   const fin=()=>{if(done)return;done=true;cleanup();const Q=Math.round(res.reduce((a,b)=>a+b,0)/TARGETS.length*100);const st=Q>=85?3:Q>=60?2:Q>0?1:0;try{ctx.done('wolnam_shadow',Q,'그림자로 높이 재기')}catch(e){}window.__WNQ=Q;
    d.innerHTML=`<b style="font:17px 'Do Hyeon',sans-serif;color:#d8e8a0">높이 재기 ${Q}점</b><div style="font-size:13px;margin:4px 0">해가 45° 높이에 있으면 모든 물체의 그림자 길이가 제 높이와 같아져요(닮은 삼각형). 옛 사람들도 막대 그림자로 탑과 산의 높이를 쟀어요.</div><div style="font-size:24px;color:#b8c870">${'★'.repeat(st)}${'☆'.repeat(3-st)}</div><button data-a style="font:15px 'Do Hyeon',sans-serif;background:#b8c870;color:#22281a;border:0;border-radius:10px;padding:6px 12px;margin:4px;cursor:pointer">한 번 더</button><button data-x style="font:15px 'Do Hyeon',sans-serif;background:transparent;color:#f0f4e0;border:2px solid #f0f4e0;border-radius:10px;padding:5px 12px;margin:4px;cursor:pointer">그만</button>`;d.querySelector('[data-a]').onclick=()=>{d.remove();window.__WNSHADOW()};d.querySelector('[data-x]').onclick=()=>d.remove()};
   draw();
   const loop=()=>{if(!d.isConnected){if(!done)cleanup();return}const W=cv.width,Hh=cv.height,S=Math.min(W,Hh)/16;q.clearRect(0,0,W,Hh);q.fillStyle='rgba(20,26,16,.55)';q.fillRect(0,0,W,Hh);if(done||!TARGETS[ti]){requestAnimationFrame(loop);return}
    const gy=Hh*.62;q.fillStyle='#6a8a3a';q.fillRect(0,gy,W,Hh-gy);const a=alt*Math.PI/180;const sx=W*.85,sy=gy-Math.sin(a)*Hh*.5;q.fillStyle='#ffe070';q.beginPath();q.arc(W*.5+Math.cos(a)*W*.42,gy-Math.sin(a)*Hh*.45,S*.6,0,7);q.fill();
    const[name,h]=TARGETS[ti];const base=W*.62,unit=S*.9;const sh=h/Math.tan(a),st1=1/Math.tan(a);
    q.fillStyle='rgba(0,0,0,.45)';q.fillRect(base-sh*unit,gy-4,sh*unit,8);q.fillStyle='#c8c0a8';q.fillRect(base-unit*.4,gy-h*unit,unit*.8,h*unit);for(let k=1;k<4;k++){q.fillStyle='#a8a090';q.fillRect(base-unit*.6,gy-h*unit*k/3.4,unit*1.2,unit*.12)}
    const sb=W*.9;q.fillStyle='rgba(0,0,0,.45)';q.fillRect(sb-st1*unit,gy+14,st1*unit,6);q.fillStyle='#8a6a40';q.fillRect(sb-3,gy-unit,6,unit);q.strokeStyle='#ffe070';q.lineWidth=2;q.strokeRect(sb-unit,gy+10,unit,14);q.fillStyle='#f0f4e0';q.font=`${Math.round(S*.4)}px "Do Hyeon",sans-serif`;q.fillText('막대 그림자 '+st1.toFixed(2)+'m',sb-unit*3.6,gy+S*.9);q.fillText('해 높이 '+alt.toFixed(0)+'°',W*.05,S*.8);
    requestAnimationFrame(loop)};loop();
   window.__WNG={set alt(v){alt=v},measure,get ti(){return ti}};try{ctx.say('해를 움직여 그림자로 높이를 재요!',2)}catch(e){}};
  /* 발굴 탐지 */const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.9},o));const mk=fn=>()=>{const g=new THREE.Group();fn(g);return g};
  const ITEMS=[
   {n:'청자 기와 조각',h:'강진은 고려청자의 고장이라 절에서도 청자 기와 조각이 나와요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.04,18),M(0x8ab0a0,{roughness:.3})))})},
   {n:'귀면 기와',h:'도깨비 얼굴을 새긴 기와예요. 월남사지에서 나왔어요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.BoxGeometry(.24,.24,.04),M(0x6a6a6a)))})},
   {n:'청동 그릇 조각',h:'절에서 쓰던 청동 그릇 조각이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.14,.1,.06,14,1,true),M(0x6a7a50,{metalness:.6,side:THREE.DoubleSide})))})},
   {n:'측량 추',h:'줄에 매달아 곧게 내리던 추예요. 다산도 측량에 썼겠지요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.ConeGeometry(.05,.12,8),M(0x5a5a5a,{metalness:.6})))})},
   {n:'상평통보',h:'옛 엽전이에요.',mk:mk(g=>{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.02,20),M(0x6a5a30,{metalness:.6})))})}];
  window.__WNDIG=()=>{window.__DETECT&&window.__DETECT({key:'wolnam_dig',title:'월남사지 발굴 탐지',emoji:'⛏️',bg:'#22281a',count:4,TL:150,cand:[[-30,30],[30,30],[-30,-30],[30,-30],[-20,10],[20,10],[0,40],[-30,0]],items:ITEMS,intro:'절터 땅속에 옛 흔적이 묻혀 있대요. 탐지기로 네 가지를 찾아 봐요!',okText:'월남사지는 강진 청자의 고장에 자리한 큰 고려 절터예요.'})};
  sp(24,24,2.4,'발굴 탐지 자리','절터 땅속에 옛 흔적이 묻혀 있어요. 무이 탐지기로 찾아 봐요.');
 }})}
