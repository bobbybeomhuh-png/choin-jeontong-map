/* 윗줄 단추를 아이콘으로 묶기 + 소리 켜고 끄기. 갱신 2026-11-14
   기존 단추(id)는 그대로 두고 겉모양만 아이콘+짧은 이름으로 바꾼다. 덜 쓰는 단추는 ☰ 펼침 메뉴로 옮긴다.
   글자가 바뀌는 단추(말 타기↔내리기, 계절)는 바뀔 때마다 다시 그린다. */
const IC={bRide:['🐴','말 타기'],bShorts:['🎬','쇼츠'],bStamp:['📜','도장첩'],bStory:['📖','이야기'],bCall:['🙋','무이 부르기'],bView:['👀','시점'],bBack:['🏠','월드로'],wmBtn:['✈️','날아가기'],wmSeason:[null,'계절'],bHome:['🔨','집짓기'],bNet:['👥','함께']};
const MORE=new Set(['bShorts','bStory','bCall','bView']);
export function initUI(){const top=document.getElementById('top');if(!top)return;
 const st=document.createElement('style');st.textContent=`
#top .btn.ic{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;gap:0;min-width:52px;padding:3px 7px 2px;line-height:1.05;border-radius:12px;background:rgba(22,16,11,.78);backdrop-filter:blur(4px)}
#top .btn.ic i{font-style:normal;font-size:21px;line-height:1.1}
#top .btn.ic small{font-size:11px;color:#e8d8bc;letter-spacing:-.2px}
#top .btn.ic.on{background:#e7b75a;color:#1d1408}#top .btn.ic.on small{color:#3b2a1c}
#uiMore{position:fixed;right:10px;top:calc(env(safe-area-inset-top) + 64px);z-index:12;display:grid;gap:6px;background:rgba(22,16,11,.94);border:1px solid rgba(255,236,210,.25);border-radius:14px;padding:8px;min-width:170px}
#uiMore .btn{display:flex!important;align-items:center;gap:8px;width:100%;justify-content:flex-start;font-size:15px}
#uiMore .btn i{font-style:normal;font-size:20px}
#uiNet{font-size:12px;color:#d8f0c0;background:rgba(30,60,20,.75);border-radius:10px;padding:3px 8px;pointer-events:auto}
@media (max-width:640px){#top .btn.ic{min-width:40px;padding:2px 4px}#top .btn.ic small{display:none}#top .btn.ic i{font-size:20px}}`;document.head.appendChild(st);
 /* 소리 단추 */const snd=document.createElement('button');snd.className='btn';snd.id='bSnd';snd.type='button';const back=document.getElementById('bBack');top.insertBefore(snd,back);
 let muted=false;try{muted=localStorage.getItem('muui3d-mute')==='1'}catch(e){}
 const applyMute=()=>{window.__MUTE=muted;try{const H=window.__H3;const AC=H&&H.__ac&&H.__ac();if(AC){if(muted&&AC.state==='running')AC.suspend();if(!muted&&AC.state==='suspended')AC.resume()}}catch(e){}document.querySelectorAll('video').forEach(v=>{if(v.id==='vfV')return;v.muted=true});const v=document.getElementById('vfV');if(v)v.muted=muted;snd.innerHTML=`<i>${muted?'🔇':'🔊'}</i><small>${muted?'소리 꺼짐':'소리'}</small>`;snd.title=muted?'소리 켜기':'소리 끄기';snd.classList.add('ic');try{localStorage.setItem('muui3d-mute',muted?'1':'0')}catch(e){}};
 snd.addEventListener('click',()=>{muted=!muted;applyMute()});applyMute();
 /* ☰ 더보기 */const more=document.createElement('button');more.className='btn ic';more.id='bMore';more.type='button';more.innerHTML='<i>☰</i><small>더보기</small>';top.insertBefore(more,back);
 const pan=document.createElement('div');pan.id='uiMore';pan.hidden=true;document.body.appendChild(pan);more.addEventListener('click',e=>{e.stopPropagation();pan.hidden=!pan.hidden});document.addEventListener('click',e=>{if(!pan.hidden&&!pan.contains(e.target)&&e.target!==more)pan.hidden=true});pan.addEventListener('click',e=>{if(e.target.closest('.btn'))setTimeout(()=>pan.hidden=true,50)});
 /* 단추 그리기 */const paint=b=>{const k=IC[b.id];if(!k)return;const raw=(b.dataset.raw!==undefined&&b.querySelector('i'))?b.dataset.raw:b.textContent.trim();let [icon,label]=k;
  if(b.id==='bRide'&&/내리기/.test(raw)){icon='🚶';label='내리기'}
  if(b.id==='bView'){label=/3인칭/.test(raw)?'3인칭':'1인칭'}
  if(b.id==='bBack'){if(/지도/.test(raw)){icon='🗺️';label='지도로'}else{icon='🏯';label='광장'}}
  if(b.id==='wmSeason'){const m=raw.match(/^(\S+)\s+(.+)$/);if(m){icon=m[1];label=m[2]}}
  const inMore=MORE.has(b.id);const html=inMore?`<i>${icon}</i>${raw.replace(/\s*\([A-Z]\)$/,'')}`:`<i>${icon}</i><small>${label}</small>`;
  b.dataset.raw=raw;b.title=raw;b.__painting=true;b.innerHTML=html;b.__painting=false;b.classList.add('ic')};
 const watch=b=>{if(!b||b.__w)return;b.__w=true;if(MORE.has(b.id))pan.appendChild(b);paint(b);
  /* 원래 코드가 textContent를 바꾸면 아이콘이 지워지므로 다시 그림 */new MutationObserver(()=>{if(b.__painting)return;if(b.querySelector('i'))return;paint(b)}).observe(b,{childList:true,characterData:true,subtree:true})};
 const scan=()=>{for(const id in IC){const b=document.getElementById(id);if(b)watch(b)}};scan();setInterval(scan,1500);
 /* ☰ 메뉴에 남은 단추가 없으면 감춤 */setInterval(()=>{const vis=[...pan.children].some(b=>!b.hidden);more.hidden=!vis},1000);
 return{setNet(all,here){let el=document.getElementById('uiNet');if(!el){el=document.createElement('span');el.id='uiNet';el.title='지금 접속한 사람 수(여기 마당 · 무이 월드 전체)';const lvl=document.getElementById('lvl');lvl&&lvl.after(el)}el.textContent=all>1?`👥 여기 ${here} · 전체 ${all}`:'👥 나 혼자';el.hidden=false}}}
