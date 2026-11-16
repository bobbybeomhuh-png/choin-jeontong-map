/* 무이 나라 조달청: 「장인 무이와 함께 걷기」. 만든 날 2026-11-17
   의궤를 마친 장인 무이(최근 둘)가 지도에서 무이 뒤를 따라다닌다. 걸으면 걷고, 말을 타면 뛰고, 너무 멀어지면 곁으로 옮겨 온다.
   가끔 전공별 한마디(머리 위 말풍선), 다음 고을이 가까우면 알려 준다. 놀이 화면이 열려 있으면 쉰다.
   jodal.js 가 setupCompanion(env) 로 부른다. env={X,THREE,JOBS,ST} */
const TALK={metal:['금은 무르니 망치질은 살살 해야 해요.','달개 하나하나가 바람에 흔들리면 그게 신라의 소리예요.','쇠붙이는 녹이 무서워요. 손때도 조심!'],
 ceramic:['흙은 거짓말을 안 해요. 굽는 불이 정직하거든요.','비색은 하늘빛을 닮으려고 천 번은 구워 봤대요.','달항아리는 위아래를 따로 빚어 붙여요.'],
 science:['해 그림자로 시각을 읽는 게 앙부일구예요.','서울은 북위 37.5도! 영침도 그만큼 기울여요.','새 도구는 누군가 먼저 써 줘야 자라요.'],
 painter:['옻칠은 서두르면 안 돼요. 말리고 또 칠하고.','자개는 빛에 따라 무지갯빛이 돌아요.','작은 공방도 솜씨만 좋으면 나라 일을 맡아요.'],
 carpenter:['나무는 결을 따라 깎아야 해요.','좋은 재목은 잘 말려야 뒤틀리지 않아요.','덧널 뚜껑은 지렛대로 살살 들어요.']};
export function setupCompanion(E){const {X,THREE,JOBS}=E;const H=window.__H3;const mates=[];let want='',bubble=null,talkT=8,hintT=0;
 const busy=()=>!!document.querySelector('.jd-ov,body>div[data-mg]');
 const bub=()=>{const d=document.createElement('div');d.style.cssText='position:fixed;z-index:8;pointer-events:none;max-width:240px;padding:6px 10px;border-radius:12px;background:#fffaf0;border:2px solid #3b2a1c;font:14px/1.4 "Gowun Dodum",sans-serif;color:#2b1d12;transform:translate(-50%,-100%);display:none';document.body.append(d);return d};
 const sync=()=>{const list=JOBS.filter(j=>E.ST.done[j.k]).slice(-2).map(j=>E.ST.done[j.k].crew||j.need);const key=list.join(',');if(key===want)return;want=key;
  for(const m of mates)X.scene.remove(m.root);mates.length=0;if(!H.makeMuui)return;list.forEach((k,i)=>{H.makeMuui(k,1.0).then(m=>{if(want!==key)return;const P=H.P;m.root.position.set(P.x-1.5-i,P.y,P.z+1.5);X.scene.add(m.root);m.play('idle');mates.push({...m,k,i})}).catch(()=>{})})};
 let last=performance.now();
 const loop=()=>{const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;try{if(H.P&&X.scene){if(Math.random()<.02)sync();const P=H.P,b=busy();
  mates.forEach((m,i)=>{m.mx.update(dt);const r=m.root;/* 무이 뒤 양옆 자리 */const side=i?1:-1;const tx=P.x+side*1.3,tz=P.z+1.4;const dx=tx-r.position.x,dz=tz-r.position.z,d=Math.hypot(dx,dz);
   if(d>25){r.position.set(tx,P.y,tz)}else if(d>1.2&&!b){const sp=Math.min(d*2.2,H.RIDE?16:6);r.position.x+=dx/d*sp*dt;r.position.z+=dz/d*sp*dt;r.rotation.y=Math.atan2(dx,dz);m.play(sp>7?'run':'walk')}else m.play('idle');
   const fy=H.floorAt?H.floorAt(r.position.x,r.position.z,r.position.y+2):P.y;if(fy!=null&&isFinite(fy))r.position.y+=(fy-r.position.y)*Math.min(1,dt*8);r.visible=!b});
  /* 말풍선 */talkT-=dt;hintT-=dt;if(!bubble)bubble=bub();if(mates.length&&!b&&talkT<=0){const m=mates[(Math.random()*mates.length)|0];const nx=JOBS.find(j=>!E.ST.done[j.k]&&j.sp);let t=null;if(nx&&hintT<=0&&Math.hypot(P.x-nx.sp.x,P.z-nx.sp.z)<45){t=`저기 ${nx.city} 빛기둥이 보여요!`;hintT=40}else{const L=TALK[m.k]||TALK.metal;t=L[(Math.random()*L.length)|0]}bubble.textContent=t;bubble.dataset.m=m.i;bubble.dataset.until=now+4500;bubble.style.display='block';talkT=18+Math.random()*14}
  if(bubble&&bubble.style.display==='block'){const m=mates.find(x=>String(x.i)===bubble.dataset.m);if(!m||b||now>+bubble.dataset.until)bubble.style.display='none';else{const v=m.root.position.clone();v.y+=1.6;v.project(H.CAM);if(v.z>1){bubble.style.display='none'}else{bubble.style.left=((v.x+1)/2*innerWidth)+'px';bubble.style.top=((1-v.y)/2*innerHeight)+'px'}}}}}catch(e){}requestAnimationFrame(loop)};requestAnimationFrame(loop);
 return{count:()=>mates.length,say:()=>{talkT=0}}}
