// 우리 동네 자랑 — 실시간 포스트잇 벽 (Supabase REST)
// publishable 키는 브라우저 공개용(RLS로 통제). 비밀키(sb_secret_)는 절대 여기 넣지 않는다.
const SUPA_URL = 'https://moavztygngbafhxztghx.supabase.co';
const SUPA_KEY = 'sb_publishable_9D-u0PH9oM0jSRoJmfGfZQ_q5t3DldZ';
const _SH = { apikey: SUPA_KEY, Authorization: 'Bearer ' + SUPA_KEY };

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

function _renderNotes(rows){
  var el = document.getElementById('wlist'); if(!el) return;
  if(!rows || !rows.length){
    el.innerHTML = '<div class="wempty">'
      + (_en() ? 'No notes yet — be the first ✎' : '아직 첫 자랑이 없어요. 첫 번째로 남겨보세요 ✎')
      + '</div>';
    return;
  }
  var anon = _en() ? 'anon' : '익명';
  el.innerHTML = rows.map(function(r){
    var nm = r.name ? esc(r.name) : anon;
    var h = _hash((r.message||'') + (r.created_at||''));
    var p = _PAL[h % _PAL.length];
    var rot = ((h >> 3) % 7) - 3;          // -3~+3도 기울기
    var mt  = (h >> 5) % 10;               // 0~9px 위아래 어긋남
    var st  = 'background:'+p[0]+';border-color:'+p[1]+';transform:rotate('+rot+'deg);margin-top:'+(7+mt)+'px';
    return '<div class="wnote" style="'+st+'">'
      + '<span class="wpin" style="background-color:'+p[2]+'"></span>'
      + '<div class="wmsg">'+esc(r.message)+'</div>'
      + '<div class="wmeta" style="color:'+p[2]+'">'+nm+' · '+_ago(r.created_at)+'</div></div>';
  }).join('');
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
    + '<div class="vq">'+(_en()?'Vote: restore this next?':'다음 복원지 투표')+'</div>'
    + '<div class="vs">'+(_en()?('Want Muui to revive '+region+' next? Tap to vote.'):('무이가 다음에 '+region+'을(를) 복원했으면 좋겠다면 눌러주세요.'))+'</div>'
    + '<button class="vbtn" id="vbtn" onclick="voteRegion()">🗳 '+(_en()?'Vote for this region':'이 지역에 투표')+' <span id="vcount"></span></button>'
    + '</div>';
}
function _voted(region){ try{ return localStorage.getItem('voted_'+region)==='1'; }catch(e){ return false; } }
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
    if(!r.ok){ if(btn) btn.disabled=false; return; }
    try{ localStorage.setItem('voted_'+region,'1'); }catch(e){}
    loadVotes(region);
  }).catch(function(){ if(btn) btn.disabled=false; });
}

// ── 뉴스레터 구독 (이메일 명단) ──────────────────────
function subscribeHtml(region){
  return '<div class="subbox">'
    + '<div class="sq">'+(_en()?'Get heritage · AI media-art news':'전통 · AI 미디어아트 소식 받기')+'</div>'
    + '<div class="ss">'+(_en()?'New restoration videos and Korean heritage stories by email. No spam, unsubscribe anytime.':'새 복원 영상과 전통 이야기를 이메일로 보내드려요. 광고 아니고, 언제든 해지할 수 있어요.')+'</div>'
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
    el.value=''; if(msg){ msg.textContent=_en()?'Subscribed! Thank you 🙌':'구독 완료! 좋은 소식으로 찾아올게요 🙌'; msg.className='smsg ok'; }
  }).catch(function(){ if(btn) btn.disabled=false; if(msg){msg.textContent=_en()?'Network error.':'네트워크 오류예요.'; msg.className='smsg err';} });
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
