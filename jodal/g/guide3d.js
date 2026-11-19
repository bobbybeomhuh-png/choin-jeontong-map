/* 무이 나라 조달청: 3D 놀이 화면 손가락 길잡이(E12). 만든 날 2026-11-19
   발굴 현장·복원대·마지막 손질 3D에서 3.5초 동안 아무것도 누르지 않으면,
   지금 만져야 할 것(흙 칸, 돌, 덧널, 조각, 장식, 자개, 영침, 해, 사발) 위에 손가락과 「꾹 눌러요」·「끌어요」가 뜬다.
   누르면 바로 사라지고, 다시 가만히 있으면 또 뜬다. 창(jd-ov)이 떠 있으면 숨김. guide3d() 한 번 부르면 됨 */
let hand=null,last=0;
const CSS=`#jdGuide{position:fixed;z-index:9990;pointer-events:none;display:none;transform:translate(-50%,-6px);text-align:center}
#jdGuide .r{position:absolute;left:50%;top:0;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;border:3px solid #ffd34a;box-shadow:0 0 12px #ffd34a;animation:jdgR 1.3s ease-out infinite}
#jdGuide .h{font-size:38px;line-height:1;animation:jdgH 1.3s ease-in-out infinite;filter:drop-shadow(0 2px 2px rgba(0,0,0,.5))}
#jdGuide .t{display:inline-block;margin-top:20px;padding:2px 10px;border-radius:10px;background:#3b2a1c;color:#ffe9a8;font:15px 'Do Hyeon',sans-serif;white-space:nowrap;border:2px solid #ffd34a}
@keyframes jdgR{0%{transform:scale(.5);opacity:1}100%{transform:scale(1.5);opacity:0}}
@keyframes jdgH{0%,100%{transform:translateY(8px)}50%{transform:translateY(16px)}}`;
const xy=s=>!s?null:Array.isArray(s)?s:(s.x!=null?[s.x,s.y]:null);
function proj(o,cam,cv){try{const v=o.getWorldPosition(new o.position.constructor());v.project(cam);if(v.z>1)return null;const r=cv.getBoundingClientRect();return[r.left+(v.x+1)/2*r.width,r.top+(1-v.y)/2*r.height]}catch(e){return null}}
function target(){
 /* 마지막 손질(실제 유물 3D 위) */
 try{const J=window.__JDSP;if(J){const d=J.dbg&&J.dbg();if(!d)return null;
  if(d.items){const it=d.items.find(i=>!i.h);return it?{p:xy(it.s),t:'고리로 끌어요'}:null}
  if(d.petals){const p=d.petals.find(p=>p.s<0);return p?{p:xy(p.xy),t:'빈 자리로 끌어요'}:null}
  if(d.tip&&d.phase===0)return{p:xy(d.tip),t:'위로 끌어요'};
  if(d.sun&&d.phase===1)return{p:xy(d.sun),t:'해를 끌어요'};
  if(d.up)return{p:xy(d.up),t:'끌어요'};
  return null}}catch(e){}
 /* 복원대 */
 try{const R=window.__RS;if(R&&R.dbg){const d=R.dbg();if(d.R&&d.R.isConnected){
  if(d.mounds&&d.mounds.length)return{p:proj(d.mounds[0],d.cam,d.R),t:'문질러요'};
  const pc=(d.pieces||[]).find(p=>!p.userData.placed);if(pc)return{p:proj(pc,d.cam,d.R),t:'흐린 자리로 끌어요'};
  return null}}}catch(e){}
 /* 발굴 현장 */
 try{const F=window.__FD,X=window.__FDX;if(F&&X&&X.alive&&X.alive()){const d=F.dbg();
  if(d.stage===0)return{p:xy(d.soil&&d.soil[0]),t:'꾹 눌러요'};
  if(d.stage===1)return{p:xy(d.covers&&d.covers[0]),t:'끌어요'};
  if(d.stage===2)return{p:xy(d.planks&&d.planks[0]),t:'꾹 눌러요'};
  const s=d.shards&&d.shards[0];return s?{p:xy(s.xy),t:'문질러요'}:null}}catch(e){}
 return null}
function hide(){if(hand)hand.style.display='none'}
function tick(){if(performance.now()-last<3500){hide();return}if(document.querySelector('.jd-ov')){hide();return}
 const g=target();const p=g&&g.p;if(!p||!(p[0]>0&&p[1]>0&&p[0]<innerWidth&&p[1]<innerHeight)){hide();return}
 hand.style.left=p[0]+'px';hand.style.top=p[1]+'px';hand.querySelector('.t').textContent=g.t;hand.style.display='block'}
export function guide3d(){if(window.__GUIDE3D)return;window.__GUIDE3D=1;const st=document.createElement('style');st.textContent=CSS;document.head.append(st);
 hand=document.createElement('div');hand.id='jdGuide';hand.innerHTML='<div class="r"></div><div class="h">👆</div><div class="t"></div>';document.body.append(hand);
 last=performance.now();addEventListener('pointerdown',()=>{last=performance.now();hide()},true);addEventListener('keydown',()=>{last=performance.now();hide()},true);
 setInterval(()=>{try{tick()}catch(e){hide()}},300);window.__GUIDE3DDBG=()=>{const g=target();return g&&{p:g.p,t:g.t,shown:hand.style.display}}}
