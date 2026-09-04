// 우리 동네 자랑 — 실시간 포스트잇 벽 (Supabase REST)
// publishable 키는 브라우저 공개용(RLS로 통제). 비밀키(sb_secret_)는 절대 여기 넣지 않는다.
const SUPA_URL = 'https://moavztygngbafhxztghx.supabase.co';
const SUPA_KEY = 'sb_publishable_9D-u0PH9oM0jSRoJmfGfZQ_q5t3DldZ';
const _SH = { apikey: SUPA_KEY, Authorization: 'Bearer ' + SUPA_KEY };

// ── 방문자 행동 로깅 (유입경로·기기·방문자ID·영상명까지) ──
var _SID=(function(){try{var s=localStorage.getItem('csid');if(!s){s=Date.now().toString(36)+Math.random().toString(36).slice(2,7);localStorage.setItem('csid',s);}return s;}catch(e){return 'anon';}})();
function _fromParam(){ try{ var p=new URLSearchParams(location.search).get('from'); return p?p.toString().slice(0,40):''; }catch(e){ return ''; } }
function _refHost(){ try{ if(!document.referrer) return 'direct'; var h=new URL(document.referrer).hostname.replace(/^www\./,''); if(h===location.hostname) return 'internal'; return h; }catch(e){ return ''; } }
function _device(){ try{ return (window.innerWidth||1024)<768?'mobile':'desktop'; }catch(e){ return ''; } }
function logEvent(type, detail){
  if(typeof SUPA_URL==='undefined') return;
  try{
    var base={ type:type, detail:(type==='visit'?_device():(detail||'').toString().slice(0,80)) };
    var full=Object.assign({}, base, { sid:_SID });
    if(type==='visit') full.ref=(_fromParam()||_refHost());   // ?from=email/discord/threads 우선, 없으면 referrer 호스트
    var H=Object.assign({'Content-Type':'application/json','Prefer':'return=minimal'}, _SH);
    fetch(SUPA_URL + '/rest/v1/events', {method:'POST', headers:H, body:JSON.stringify(full)})
      .then(function(r){ if(!r.ok){ fetch(SUPA_URL+'/rest/v1/events',{method:'POST',headers:H,body:JSON.stringify(base)}).catch(function(){}); } })  // sid/ref 컬럼 없으면 기본만 재시도
      .catch(function(){});
  }catch(e){}
}
// 링크 클릭 자동 로깅: 디스코드 / 유튜브(영상명·채널)
if(typeof document!=='undefined'){
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href]');
    if(!a) return;
    var h = a.href||'';
    if(h.indexOf('discord.gg')>-1) logEvent('discord','');
    else if(h.indexOf('youtu')>-1){ var nm=(a.classList&&a.classList.contains('vcard2'))?(a.getAttribute('title')||''):'채널'; logEvent('video', nm); }
  }, true);
}

function _en(){ return (typeof LANG!=='undefined' && LANG==='en'); }
function _ago(iso){
  var s = (Date.now() - new Date(iso).getTime())/1000;
  if(_en()){
    if(s<60) return 'just now';
    if(s<3600) return Math.floor(s/60)+'m ago';
    if(s<86400) return Math.floor(s/3600)+'h ago';
    return Math.floor(s/86400)+'d ago';
  }
  if(s<60) return '방금';
  if(s<3600) return Math.floor(s/60)+'분 전';
  if(s<86400) return Math.floor(s/3600)+'시간 전';
  return Math.floor(s/86400)+'일 전';
}

function wallHtml(region){
  var ph = _en() ? ('A quick line about '+region+'…') : (region+' 보고 느낀 걸 한 줄로…');
  var np = _en() ? 'nickname (optional)' : '닉네임(선택)';
  var send = _en() ? 'Post' : '남기기';
  return '<div class="wall">'
    + '<div class="wform">'
    +   '<textarea id="wmsg" maxlength="200" rows="2" placeholder="'+esc(ph)+'"></textarea>'
    +   '<div class="wrow"><input id="wname" maxlength="20" placeholder="'+np+'">'
    +   '<button class="wsend" onclick="postNote()">'+send+'</button></div>'
    + '</div>'
    + '<div id="wlist" class="wlist"><div class="wempty">'+(_en()?'Loading…':'불러오는 중…')+'</div></div>'
    + '</div>';
}

// 포스트잇 색 팔레트 [배경, 테두리, 압정색]
var _PAL = [
  ['#fff7c0','#f0e28f','#c0392b'], // 노랑
  ['#ffdbe6','#f4b8cb','#d81b60'], // 분홍
  ['#d3e9ff','#a9cdf0','#1565c0'], // 파랑
  ['#d8f5cf','#aede9f','#2e7d32'], // 초록
  ['#ffe4bf','#f3c58a','#e65100'], // 주황
  ['#e9dcff','#ccb3f0','#6a1b9a'], // 보라
  ['#ccf5ec','#9fe0d2','#00897b']  // 민트
];
function _hash(s){ var h=0; for(var i=0;i<s.length;i++){ h=(h*31+s.charCodeAt(i))|0; } return Math.abs(h); }
// 포스트잇 한 장 HTML (색·기울기·크기 다양). clickable=true면 눌러서 그 지역으로 이동.
function _noteHTML(r, clickable){
  var h=_hash((r.message||'')+(r.created_at||''));
  var p=_PAL[h%_PAL.length];
  var rot=((h>>3)%7)-3;         // -3~+3도
  var mt=(h>>5)%10;             // 0~9px 어긋남
  var tier=h%3;                 // 크기 3단
  var mw=[148,188,232][tier], fs=[12,13.5,15.5][tier];
  var nm=r.name?esc(r.name):(_en()?'anon':'익명');
  var st='background:'+p[0]+';border-color:'+p[1]+';transform:rotate('+rot+'deg);margin-top:'+(7+mt)+'px;max-width:'+mw+'px';
  var cls='wnote'+(clickable?' wclick':''), dr=clickable?(' data-region="'+esc(r.region||'')+'"'):'';
  return '<div class="'+cls+'" style="'+st+'"'+dr+'>'
    +'<span class="wpin" style="background-color:'+p[2]+'"></span>'
    +'<div class="wmsg" style="font-size:'+fs+'px">'+esc(r.message)+'</div>'
    +'<div class="wmeta" style="color:'+p[2]+'">'+nm+' · '+_ago(r.created_at)+'</div></div>';
}

function _renderNotes(rows){
  var el = document.getElementById('wlist'); if(!el) return;
  if(!rows || !rows.length){
    el.innerHTML = '<div class="wempty">'
      + (_en() ? 'No notes yet — be the first ✎' : '아직 첫 자랑이 없어요. 첫 번째로 남겨보세요 ✎')
      + '</div>';
    return;
  }
  el.innerHTML = rows.map(function(r){ return _noteHTML(r,false); }).join('');
}

function loadWall(region){
  if(typeof SUPA_URL==='undefined') return;
  var el = document.getElementById('wlist'); if(!el) return;
  var url = SUPA_URL + '/rest/v1/postits?region=eq.' + encodeURIComponent(region)
    + '&hidden=eq.false&select=name,message,created_at&order=created_at.desc&limit=60';
  fetch(url, {headers:_SH})
    .then(function(r){ return r.ok ? r.json() : []; })
    .then(_renderNotes)
    .catch(function(){ el.innerHTML = '<div class="wempty">'+(_en()?'Could not load.':'불러오지 못했어요.')+'</div>'; });
}

// 지도 왼쪽 카드: 통계 + 전국 최근 자랑 피드 (빈 공간 채움 + 활기)
function _gotoRegion(region){
  if(typeof CITIES==='undefined' || !window._select) return;
  var c = CITIES.find(function(x){ return x[0]===region; });
  if(c) window._select(c);
}
function loadRecent(){
  if(typeof SUPA_URL==='undefined') return;
  var st = document.getElementById('mcStats');
  if(st){
    var cities = (typeof CITIES!=='undefined') ? CITIES.length : 0;
    var rest = (typeof REST_DONE!=='undefined') ? REST_DONE : 0;
    st.innerHTML = '<div class="mc-stat"><b>'+cities+'</b><span>'+(_en()?'cities':'개 도시')+'</span></div>'
      + '<div class="mc-stat"><b>'+rest+'</b><span>'+(_en()?'restored':'복원 완료')+'</span></div>'
      + '<div class="mc-stat"><b id="mcCount">·</b><span>'+(_en()?'notes':'자랑')+'</span></div>';
  }
  var el = document.getElementById('mcRecent'); if(!el) return;
  var url = SUPA_URL + '/rest/v1/postits?hidden=eq.false&select=region,name,message,created_at&order=created_at.desc&limit=6';
  fetch(url, {headers:_SH}).then(function(r){ return r.ok ? r.json() : []; }).then(function(rows){
    var cnt = document.getElementById('mcCount'); if(cnt) cnt.textContent = rows.length ? ('' + rows.length + (rows.length>=6?'+':'')) : '0';
    if(!rows.length){
      el.innerHTML = '<div class="mc-empty">'+(_en()?'No notes yet — leave the first one!':'아직 자랑이 없어요.\n첫 자랑을 남겨보세요!')+'</div>';
      return;
    }
    el.innerHTML = rows.map(function(r){
      return '<button class="mc-note" data-region="'+esc(r.region||'')+'">'
        + '<div class="m">'+esc(r.message)+'</div>'
        + '<div class="r">'+esc(r.region||'')+' · '+_ago(r.created_at)+'</div></button>';
    }).join('');
    Array.prototype.forEach.call(el.querySelectorAll('.mc-note'), function(b){
      b.onclick = function(){ _gotoRegion(b.getAttribute('data-region')); };
    });
  }).catch(function(){ el.innerHTML = '<div class="mc-empty">'+(_en()?'Could not load.':'불러오지 못했어요.')+'</div>'; });
}

// ── 다음 복원지 투표 ──────────────────────────────
function voteHtml(region){
  return '<div class="votebox">'
    + '<div class="vq"><img src="muui_avatar.png" class="v-ava" alt="무이">'+(_en()?'Vote: restore this next?':'다음 복원지 투표')+'</div>'
    + '<div class="vs">'+(_en()?('Want Muui to revive '+region+' next? Tap to vote.'):('무이가 다음에 '+region+'을(를) 복원했으면 좋겠다면 눌러주세요.'))+'</div>'
    + '<button class="vbtn" id="vbtn" onclick="voteRegion()">🗳 '+(_en()?'Vote for this region':'이 지역에 투표')+' <span id="vcount"></span></button>'
    + '</div>';
}
function _voted(region){ try{ return localStorage.getItem('voted_'+region)==='1'; }catch(e){ return false; } }
// 전체 투표 집계 → 지도 카드 TOP + 도시 라벨 뱃지(window._VOTES)
function loadVoteRanks(){
  if(typeof SUPA_URL==='undefined') return;
  fetch(SUPA_URL+'/rest/v1/votes?select=region', {headers:_SH})
    .then(function(r){ return r.ok?r.json():[]; })
    .then(function(rows){
      var m={}; rows.forEach(function(x){ if(x.region) m[x.region]=(m[x.region]||0)+1; });
      window._VOTES=m;
      if(window._relabel) window._relabel();               // 지도 라벨에 🗳 뱃지
      var el=document.getElementById('mcVotes'); if(!el) return;
      var arr=Object.keys(m).map(function(k){return[k,m[k]];}).sort(function(a,b){return b[1]-a[1];}).slice(0,5);
      var lab=document.getElementById('mcVoteLab');
      if(!arr.length){ if(lab) lab.style.display='none'; el.innerHTML=''; return; }
      if(lab) lab.style.display='';
      el.innerHTML=arr.map(function(x,i){
        return '<button class="mc-note" data-region="'+esc(x[0])+'"><div class="m"><b>'+(i+1)+'.</b> '+esc(x[0])+'</div><div class="r">🗳 '+x[1]+'표</div></button>';
      }).join('');
      Array.prototype.forEach.call(el.querySelectorAll('.mc-note'),function(b){ b.onclick=function(){ if(window._gotoRegion) _gotoRegion(b.getAttribute('data-region')); }; });
    }).catch(function(){});
}

function loadVotes(region){
  if(typeof SUPA_URL==='undefined') return;
  var btn=document.getElementById('vbtn'), cs=document.getElementById('vcount');
  var url=SUPA_URL+'/rest/v1/votes?region=eq.'+encodeURIComponent(region)+'&select=id';
  fetch(url,{headers:Object.assign({'Prefer':'count=exact','Range':'0-0'},_SH)}).then(function(r){
    var cr=r.headers.get('content-range')||''; var n=parseInt((cr.split('/')[1]||'0'),10)||0;
    if(cs) cs.textContent = n? ('· '+n+(_en()?' votes':'표')) : '';
    if(_voted(region) && btn){ btn.classList.add('voted'); btn.disabled=true;
      btn.firstChild.textContent='✓ '+(_en()?'Voted ':'투표 완료 '); }
  }).catch(function(){});
}
function voteRegion(){
  var region=(typeof CUR!=='undefined'&&CUR)?CUR[0]:''; if(!region) return;
  if(_voted(region)) return;
  var btn=document.getElementById('vbtn'); if(btn) btn.disabled=true;
  fetch(SUPA_URL+'/rest/v1/votes',{method:'POST',
    headers:Object.assign({'Content-Type':'application/json','Prefer':'return=minimal'},_SH),
    body:JSON.stringify({region:region})
  }).then(function(r){
    if(!r.ok){ if(btn){ btn.disabled=false; var cs=document.getElementById('vcount'); if(cs) cs.textContent=_en()?'· try later':'· 잠시 후 다시'; } return; }
    try{ localStorage.setItem('voted_'+region,'1'); }catch(e){}
    if(window.logEvent) logEvent('vote', region);
    loadVotes(region);
  }).catch(function(){ if(btn){ btn.disabled=false; var cs=document.getElementById('vcount'); if(cs) cs.textContent=_en()?'· network error':'· 네트워크 오류'; } });
}

// ── 뉴스레터 구독 (이메일 명단) ──────────────────────
function subscribeHtml(region){
  var disc = (typeof LINKS!=='undefined' && LINKS.discord) ? LINKS.discord : '';
  var dbtn = disc ? ('<a class="dbtn" href="'+disc+'" target="_blank" rel="noopener">💬 '+(_en()?'Join the community on Discord':'전통·AI 미디어아트 커뮤니티 참여 (디스코드)')+'</a>'
    + '<div class="sor">'+(_en()?'or get news by email':'또는 이메일로 소식 받기')+'</div>') : '';
  return '<div class="subbox">'
    + '<div class="sq">'+(_en()?'Heritage · AI media-art community':'전통 · AI 미디어아트 커뮤니티')+'</div>'
    + '<div class="ss">'+(_en()?'Share restoration news, open calls and AI stories — on Discord, or by email.':'새 복원 소식·공모·AI 이야기를 함께 나눠요. 디스코드에서 놀거나, 이메일로 받거나.')+'</div>'
    + dbtn
    + '<div class="srow"><input id="subemail" type="email" inputmode="email" placeholder="'+(_en()?'your email':'이메일 주소')+'">'
    + '<button class="sbtn" onclick="subscribe()">'+(_en()?'Subscribe':'구독')+'</button></div>'
    + '<div id="submsg" class="smsg"></div></div>';
}
function subscribe(){
  var el=document.getElementById('subemail'), msg=document.getElementById('submsg');
  if(!el) return;
  var email=(el.value||'').trim();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ if(msg){msg.textContent=_en()?'Please enter a valid email.':'올바른 이메일을 입력해주세요.'; msg.className='smsg err';} el.focus(); return; }
  var btn=document.querySelector('.sbtn'); if(btn) btn.disabled=true;
  var region=(typeof CUR!=='undefined'&&CUR)?CUR[0]:null;
  fetch(SUPA_URL+'/rest/v1/subscribers?on_conflict=email',{method:'POST',
    headers:Object.assign({'Content-Type':'application/json','Prefer':'resolution=ignore-duplicates,return=minimal'},_SH),
    body:JSON.stringify({email:email,region:region,source:'map'})
  }).then(function(r){
    if(btn) btn.disabled=false;
    if(!r.ok){ if(msg){msg.textContent=_en()?'Failed — try again later.':'실패했어요. 잠시 후 다시 시도해주세요.'; msg.className='smsg err';} return; }
    el.value='';
    if(window.logEvent) logEvent('subscribe','');
    if(msg){
      var disc=(typeof LINKS!=='undefined'&&LINKS.discord)?LINKS.discord:'';
      msg.innerHTML=(_en()?'Subscribed! 🙌 ':'구독 완료! 🙌 ')
        + (disc?('<a href="'+disc+'" target="_blank" rel="noopener" style="color:#5865F2;font-weight:700">'+(_en()?'Join us on Discord →':'디스코드에서 만나요 →')+'</a>'):'');
      msg.className='smsg ok';
    }
  }).catch(function(){ if(btn) btn.disabled=false; if(msg){msg.textContent=_en()?'Network error.':'네트워크 오류예요.'; msg.className='smsg err';} });
}

// 자랑 모아보기(전체) — 지역별 그룹
function loadBoard(){
  if(typeof SUPA_URL==='undefined') return;
  var el=document.getElementById('board'); if(!el) return;
  el.innerHTML='<div class="bwrap"><div class="bhead"><h2>'+(_en()?'Community Board':'✎ 자유 게시판')
    +'</h2><p>'+(_en()?'Anyone can leave a note — like sticky notes on a school board. Grouped by region; tap a region to open it.':'누구나 한 줄 툭 남기는 곳 — 학교 게시판에 쪽지 붙이듯. 지역별로 모았고, 지역 이름을 누르면 그 지역으로 이동합니다.')
    +'</p></div><div id="bbody" class="corkboard"><div class="wempty">'+(_en()?'Loading…':'불러오는 중…')+'</div></div></div>';
  var url=SUPA_URL+'/rest/v1/postits?hidden=eq.false&select=region,name,message,created_at&order=created_at.desc&limit=500';
  fetch(url,{headers:_SH}).then(function(r){return r.ok?r.json():[];}).then(function(rows){
    var body=document.getElementById('bbody'); if(!body) return;
    if(!rows.length){ body.innerHTML='<div class="wempty">'+(_en()?'No notes yet — leave the first on the map!':'아직 자랑이 없어요. 지도에서 첫 자랑을 남겨보세요!')+'</div>'; return; }
    var byReg={}; rows.forEach(function(r){ (byReg[r.region]=byReg[r.region]||[]).push(r); });
    var regs=Object.keys(byReg).sort(function(a,b){return byReg[b].length-byReg[a].length;});
    body.innerHTML=regs.map(function(rg){
      var notes=byReg[rg].map(function(r){ r.region=rg; return _noteHTML(r,true); }).join('');
      return '<div class="bregion"><h3 class="bregtitle" data-region="'+esc(rg)+'">'+esc(rg)+' <span>'+byReg[rg].length+'</span> ›</h3><div class="wlist">'+notes+'</div></div>';
    }).join('');
    // 지역 제목 또는 포스트잇 클릭 → 그 지역 페이지로 이동
    function go(rg){ if(window._gotoRegion){ setView('map'); _gotoRegion(rg); } }
    Array.prototype.forEach.call(body.querySelectorAll('.bregtitle'),function(t){ t.onclick=function(){ go(t.getAttribute('data-region')); }; });
    Array.prototype.forEach.call(body.querySelectorAll('.wclick'),function(n){ n.style.cursor='pointer'; n.title='이 지역 보기'; n.onclick=function(){ go(n.getAttribute('data-region')); }; });
  }).catch(function(){ var body=document.getElementById('bbody'); if(body) body.innerHTML='<div class="wempty">'+(_en()?'Could not load.':'불러오지 못했어요.')+'</div>'; });
}

function postNote(){
  var region = (typeof CUR!=='undefined' && CUR) ? CUR[0] : '';
  var msgEl = document.getElementById('wmsg'), nmEl = document.getElementById('wname');
  if(!msgEl) return;
  var msg = (msgEl.value||'').trim(), nm = (nmEl ? nmEl.value : '').trim();
  if(!msg){ msgEl.focus(); return; }
  var btn = document.querySelector('.wsend');
  if(btn){ btn.disabled = true; btn.textContent = _en()?'Posting…':'남기는 중…'; }
  var reset = function(){ if(btn){ btn.disabled=false; btn.textContent = _en()?'Post':'남기기'; } };
  fetch(SUPA_URL + '/rest/v1/postits', {
    method:'POST',
    headers: Object.assign({'Content-Type':'application/json','Prefer':'return=minimal'}, _SH),
    body: JSON.stringify({ region: region, name: nm || null, message: msg })
  }).then(function(r){
    reset();
    if(!r.ok){ alert(_en()?'Could not save. Please try again.':'앗, 저장에 실패했어요. 잠시 후 다시 시도해주세요.'); return; }
    msgEl.value=''; if(nmEl) nmEl.value='';
    loadWall(region);
    if(window.loadRecent) loadRecent();
  }).catch(function(){
    reset();
    alert(_en()?'Network error.':'네트워크 오류로 저장하지 못했어요.');
  });
}
