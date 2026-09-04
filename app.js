let LANG = 'ko';
let CUR = (CITIES.find(function(c){return c[0]==='서울';})) || CITIES[0];  // 기본 진입 도시=서울
const $ = id => document.getElementById(id);
function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
// 영어 이름/설명 폴백: DETAILS.en 우선, 없으면 EN_CITY(90개 도시 번역)
function cityEN(nm){
  var d=(typeof DETAILS!=='undefined')?DETAILS[nm]:null;
  if(d&&d.en&&(d.en.n||d.en.c)) return d.en;
  if(typeof EN_CITY!=='undefined'&&EN_CITY[nm]) return EN_CITY[nm];
  return null;
}
function nameOf(nm){ var e=(LANG==='en')?cityEN(nm):null; return (e&&e.n)?e.n:nm; }
function conceptOf(nm,ko){ var e=(LANG==='en')?cityEN(nm):null; return (e&&e.c)?e.c:(ko||''); }

// ── 제작 의뢰(리드 생성). 서버 없이 Gmail 웹 작성창을 '새 탭'으로 염(OS 메일앱 팝업 대신). ──
var REQ_EMAIL = 'choin2626@gmail.com';
function reqCompose(region, name, ma){
  var subj = '[제작 의뢰] '+region+' · '+name;
  var body =
    '초인 미디어아트 스튜디오에 제작을 문의합니다.\n\n'+
    '■ 지역: '+region+'\n'+
    '■ 소재/이야기: '+name+'\n'+
    (ma ? '■ 참고(미디어아트 방향): '+ma+'\n' : '')+
    '■ 희망 형태(택1): 미디어파사드 / 실감전시 / 영상 / 굿즈 / 기타\n\n'+
    '— 아래를 채워주세요 —\n'+
    '기관·회사:\n담당자 성함:\n연락처:\n예산(대략):\n원하는 시기:\n추가 설명:\n';
  return 'https://mail.google.com/mail/?view=cm&fs=1&to='+encodeURIComponent(REQ_EMAIL)
       + '&su='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
}
function reqBtn(region, name, ma, cls){
  var label = (LANG==='en') ? 'Commission this' : '이 이야기로 제작 의뢰';
  return '<a class="reqbtn '+(cls||'')+'" target="_blank" rel="noopener" href="'+reqCompose(region,name,ma)+'">✉ '+label+'</a>';
}
// ── 지역별 살아있는 공모(choin-signals). '올 이유·다시 올 이유' = 매일 갱신되는 기회. ──
var CITY_GWON={}; if(typeof CITIES!=='undefined') CITIES.forEach(function(c){CITY_GWON[c[0]]=c[1];});
function dday(d){
  if(!d) return '상시';
  var t=new Date(d+'T00:00:00'), now=new Date(); now.setHours(0,0,0,0);
  var n=Math.round((t-now)/86400000);
  return n<=0 ? 'D-day' : ('D-'+n);
}
function gongmoRows(list, n){
  return list.slice(0,n).map(function(g){
    var kind = g.k ? '<span class="gok k-'+esc(g.k)+'">'+esc(g.k)+'</span> ' : '';
    var field = (g.f && g.f!=='전통·문화일반') ? '<span class="gof">'+esc(g.f)+'</span> ' : '';
    return '<a class="gorow" href="'+g.u+'" target="_blank" rel="noopener">'
      + '<span class="godd'+(g.d&&dday(g.d).match(/D-([0-9])$/)?' urgent':'')+'">'+dday(g.d)+'</span>'
      + '<span class="got">'+kind+field+esc(g.t)+'</span></a>';
  }).join('');
}
function gongmoHtml(region){
  if(typeof GONGMO==='undefined') return '';
  var seen={}, list=[];
  function push(arr){(arr||[]).forEach(function(g){ if(!seen[g.t]){seen[g.t]=1; list.push(g);} });}
  push(GONGMO[region]);
  var gwon=CITY_GWON[region]; if(gwon && gwon!==region) push(GONGMO[gwon]);
  list.sort(function(a,b){return (a.d===''?1:0)-(b.d===''?1:0) || (a.d<b.d?-1:a.d>b.d?1:0);});
  var t=(LANG==='en');
  var h='';
  if(list.length){
    h+='<div class="lab" style="color:#b5476f">📌 '+(t?'Open calls & grants here':'이 지역 지금 열린 공모·지원')+' · '+list.length+'</div>'
      +'<div class="golist">'+gongmoRows(list,8)+'</div>';
  }
  var nat=GONGMO['전국']||[];
  if(nat.length){
    h+='<div class="lab" style="color:var(--t3)">🌐 '+(t?'National calls':'전국 공모·지원')+'</div>'
      +'<div class="golist">'+gongmoRows(nat,4)+'</div>';
  }
  return h;
}
// 무이 복원단이 되살린 것 — 복원 전(실사 공공누리) → 후(미디어아트 영상). 클릭=유튜브.
var REST_DONE = (typeof VIDEOS!=='undefined') ? Object.keys(VIDEOS).length : 0;
function restoreStatus(region){
  var n = (typeof VIDEOS!=='undefined' && VIDEOS[region]) ? VIDEOS[region].length : 0;
  return n>0 ? {t:(LANG==='en'?'Restored '+n:'복원완료 '+n+'편'), c:'ok'}
             : {t:(LANG==='en'?'Awaiting restoration':'복원 대기 · 제보 기다리는 중'), c:'wait'};
}
function videosHtml(region){
  var t=(LANG==='en');
  var list = (typeof VIDEOS!=='undefined' && VIDEOS[region]) ? VIDEOS[region] : [];
  // 영상 없는 지역도 유튜브 채널은 자연스럽게 노출
  if(!list.length){
    return '<div class="lab" style="color:#c0392b">▶ '+(t?'CHOIN on YouTube':'초인 유튜브')+'</div>'
      + '<a class="vchan" href="'+LINKS.choin+'" target="_blank" rel="noopener">▶ '+(t?'Watch our heritage media-art films':'우리가 만든 전통 미디어아트 영상 보기')+'</a>';
  }
  var cap=6;
  var head = t ? 'Our films that revived this place' : '초인이 되살린 이 지역 영상';
  var cards = list.slice(0,cap).map(function(v){
    var link = v.yt ? v.yt : (v.ch==='f' ? LINKS.foodie : LINKS.choin);
    var bef = v.before ? '<span class="vbefore2" style="background-image:url(\''+v.before+'\')" title="복원 전"></span>' : '';
    var chip = v.ch==='f' ? '대령숙수' : '무이';
    return '<a class="vcard2" href="'+link+'" target="_blank" rel="noopener" title="'+esc(v.n)+'">'
      + '<span class="vthumb2" style="background-image:url(\''+v.th+'\')"><span class="vplay2">▶</span>'+bef+'<span class="vchip">'+chip+'</span></span>'
      + '<span class="vt2">'+esc(v.n)+'</span></a>';
  }).join('');
  var chan = '<a class="vchan" href="'+LINKS.choin+'" target="_blank" rel="noopener">▶ '+(t?'More on our YouTube channel':'채널에서 더 보기 · 구독')+'</a>';
  // 복원 전후 슬라이더 (before 있는 첫 영상) — 옛 실사 ↔ 우리 미디어아트 드래그 비교
  var feat = list.filter(function(v){return v.before;})[0];
  var slider = '';
  if(feat){
    var flink = feat.yt || (feat.ch==='f' ? LINKS.foodie : LINKS.choin);
    slider = '<div class="lab" style="color:var(--gold)">'+(t?'Before / After':'복원 전 · 후 비교')+'</div>'
      + '<div class="ba">'
      +   '<img class="ba-after" src="'+feat.th+'" alt="'+(t?'after':'복원 후')+'">'
      +   '<img class="ba-before" src="'+feat.before+'" alt="'+(t?'before':'복원 전')+'">'
      +   '<div class="ba-handle"></div>'
      +   '<input class="ba-range" type="range" min="0" max="100" value="50" aria-label="'+(t?'compare':'복원 전후 비교')+'"'
      +   ' oninput="var b=this.closest(&quot;.ba&quot;);b.querySelector(&quot;.ba-before&quot;).style.clipPath=&quot;inset(0 &quot;+(100-this.value)+&quot;% 0 0)&quot;;b.querySelector(&quot;.ba-handle&quot;).style.left=this.value+&quot;%&quot;">'
      +   '<span class="ba-tag ba-tl">'+(t?'BEFORE':'복원 전')+'</span>'
      +   '<a class="ba-tag ba-tr" href="'+flink+'" target="_blank" rel="noopener">'+(t?'AFTER ▶':'복원 후 ▶')+'</a>'
      +   '<span class="ba-cap">'+(t?'◀ drag ▶ real site ↔ our media art':'◀ 드래그 ▶ 옛 실사 ↔ 우리 미디어아트')+'</span>'
      + '</div>';
  }
  return slider
    + '<div class="lab" style="color:#c0392b">'+head+' · '+list.length+'</div>'
    + '<div class="vidgrid">'+cards+'</div>' + chan;
}
// 참여형 커뮤니티: '우리 동네 자랑'(한마디) + '내 동네 알리미'(제보). Tally 링크 없으면 메일로 대체.
function communityHtml(region){
  var t=(LANG==='en');
  var brag = (typeof LINKS!=='undefined' && LINKS.tally_brag)
    ? LINKS.tally_brag+'?region='+encodeURIComponent(region)
    : reqCompose(region, region+' 우리 동네 자랑', '');
  var report = (typeof LINKS!=='undefined' && LINKS.tally_report)
    ? LINKS.tally_report+'?region='+encodeURIComponent(region)
    : reqCompose(region, region+' 내 동네 알리미(복원 제보)', '');
  // ① 우리 동네 자랑 — 실시간 포스트잇 벽 (Supabase). 벽 코드 없으면 메일/Tally로 대체.
  var h = '<div class="lab" style="color:#a9803a">'+(t?'Say hi · Village Wall':'우리 동네 자랑 · 포스트잇 벽')+'</div>';
  h += '<div style="font-size:12px;color:var(--t3);line-height:1.5;margin:-2px 0 8px">'
     + (t?'A quick line about this place — no email needed. Every note posted here shows up together, live.'
         :'이 동네 보고 느낀 걸 가볍게 한 줄. 이메일 없이 툭 남기면, 남들이 남긴 자랑과 함께 여기 다 같이 붙어요.')+'</div>';
  h += (typeof wallHtml!=='undefined')
     ? wallHtml(region)
     : '<a class="notebtn" href="'+brag+'" target="_blank" rel="noopener">✎ '+(t?('Leave a quick note on '+region):(region+' 자랑 한마디'))+'</a>';
  // ② 내 동네 알리미 — 지도에 없는 숨은 소재 제보 (우리가 되살림 · 굿즈 · 이메일)
  h += '<div class="pitch" style="margin-top:16px;border-color:#e6d3b0;background:#fbf5ea">'
     + '<div class="ph">'+(t?'Tip us a hidden heritage':'내 동네 알리미 · 숨은 소재 제보')+'</div>'
     + '<div class="ps">'+(t?'Know a local tradition or artifact not yet on this map? Tell us — we\'ll go find it and revive it as media art. Monthly picks receive official K-pop artist goods.'
            :'지도에 아직 없는 우리 동네 숨은 유물·전통·이야기가 있나요? 알려주시면 우리가 직접 찾아가 미디어아트로 되살립니다. 매달 좋은 제보를 뽑아 인기 K-pop 아티스트 공식 굿즈를 선물로 보내드립니다.')+'</div>'
     + '<a class="pbtn main" href="'+report+'" target="_blank" rel="noopener">📮 '+(t?'Send a tip':(region+' 제보하기'))+'</a>'
     + '<div style="font-size:11px;color:var(--t3);margin-top:8px;line-height:1.5">'
     + (t?'Contact info is requested only if a tip is selected and a gift needs shipping — never used for anything else.':'채택되어 경품 발송이 필요한 경우에 한해 주소·연락처를 요청할 수 있으며, 그 외 용도로는 절대 사용하지 않습니다.')+'</div></div>';
  return h;
}
// 공개 접점: "우리 IP로 이 지역 전통을 미디어아트로 만들고 싶으면 연락." 기관 리스트는 웹에 없음(자산=노션).
function pitchHtml(region){
  var t = (LANG==='en');
  var head = t ? "Want your region's heritage turned into media art?"
              : ('우리 IP로 '+region+'의 전통을 미디어아트로 만들고 싶다면?');
  var sub  = t ? 'CHOIN takes commissions — media-art facades, immersive exhibits, film, goods.'
              : '초인이 제작 의뢰를 받습니다 — 미디어파사드·실감전시·영상·굿즈까지.';
  var h = '<div class="pitch"><div class="ph">'+esc(head)+'</div><div class="ps">'+esc(sub)+'</div>';
  h += '<a class="pbtn main" target="_blank" rel="noopener" href="'+reqCompose(region, region+' 지역 미디어아트 제작', '')+'">✉ '+(t?'Commission CHOIN':'제작 의뢰하기')+'</a>';
  h += '<a class="pbtn" href="'+LINKS.choin+'" target="_blank" rel="noopener">▶ '+(t?'See CHOIN works':'초인 미디어아트 작품 보기')+'</a>';
  if (typeof LINKS!=='undefined' && LINKS.muui) {
    h += '<a class="pbtn" href="'+LINKS.muui+'" target="_blank" rel="noopener">'+(t?'CHOIN traditional IP · Muui':'우리 전통 IP 이야기 · 무이')+'</a>';
  }
  h += '<div class="pmail">'+(t?'Inquiries: ':'제작 의뢰·문의 : ')
     + '<a href="mailto:'+REQ_EMAIL+'">'+REQ_EMAIL+'</a></div></div>';
  return h;
}
// 지역 대표: 초인 제작 영상 있으면 그걸 우선(VIDEOS 연동 시 자동), 없으면 대표 컨셉.
function flagshipHtml(region, concept){
  var hasVid = (typeof VIDEOS!=='undefined' && VIDEOS[region] && VIDEOS[region].length);
  var head = '<div class="lab" style="color:var(--teal)">'+(LANG==='en'?'FLAGSHIP':'지역 대표')+'</div>';
  var note = hasVid ? '<div class="flagvid">▶ '+(LANG==='en'?'CHOIN production':'초인 제작 영상')+' '+VIDEOS[region].length+'</div>' : '';
  return head+note+'<div class="concept">'+esc(concept)+'</div>'
    + reqBtn(region, concept, '', 'flag');
}
function instHtml(name){
  let list=[];
  if(typeof INST!=='undefined' && Array.isArray(INST[name])) list=list.concat(INST[name]);
  const d=DETAILS[name]; if(d && Array.isArray(d.sell)) list=list.concat(d.sell);
  list=list.map(s=>(s||'').trim()).filter(Boolean);
  list=list.filter((x,i)=>list.indexOf(x)===i);  // dedup
  if(!list.length) return '';
  const pills=list.map(x=>'<span class="pill">'+esc(x)+'</span>').join('');
  const cta='<a class="lock" href="'+LINKS.choin+'" target="_blank" rel="noopener">'+(LANG==='en'?'Turn your local heritage into media art → Commission CHOIN':'우리 지역·전통 이야기를 미디어아트로 만들고 싶다면 → 초인에 제작 의뢰')+'</a>';
  return '<div class="lab">'+(LANG==='en'?'Local institutions & companies (channels)':'관련 기관·회사 (판로)')+'</div><div class="inst">'+pills+cta+'</div>';
}

// 발굴 소재 레이어. 공개=티저(유형+설명), 내부(?internal=1)=미발굴+미디어아트/3D/수익화 전체
function exHtml(name){
  const arr = (typeof DISCOVER!=='undefined' && Array.isArray(DISCOVER[name])) ? DISCOVER[name] : [];
  if(!arr.length) return '';
  const IN = !!window.INTERNAL;
  // 공개: 미발굴(r3)은 숨김, 이미 알려진·숨은 이야기만 티저로. 내부: 전부.
  const items = IN ? arr.slice() : arr.filter(x=>(x.r||1)<3);
  if(!items.length) return '';
  items.sort((a,b)=>(b.r||1)-(a.r||1));  // 미발굴 먼저
  const rlab={1:'잘 알려짐',2:'숨은 보석',3:'미발굴'};
  const rows = items.map(x=>{
    const r=x.r||1;
    let h='<div class="exrow r'+r+'"><b>'+esc(x.n)+'</b><span class="ext">'+esc(x.t||'')+'</span>';
    if(IN){
      h+='<span class="exr r'+r+'">'+rlab[r]+'</span>';
      const revs=[].concat(x.rev||[]).filter(Boolean);
      revs.forEach(rv=>h+='<span class="rev rev-'+esc(rv)+'">'+esc(rv)+'</span>');
      if(x.fit) h+='<span class="fit">'+esc(x.fit)+'</span>';
    }
    if(x.desc) h+='<div class="exd">'+esc(x.desc)+'</div>';
    if(IN){
      h+='<div class="exmeta">';
      if(x.ma) h+='<span><i>🎨 미디어아트</i>'+esc(x.ma)+'</span>';
      if(x.d3) h+='<span><i>🧊 3D·굿즈</i>'+esc(x.d3)+'</span>';
      if(x.biz)h+='<span><i>💰 수익·사업화</i>'+esc(x.biz)+'</span>';
      h+='</div>';
    }
    h+=reqBtn(name, x.n, x.ma||'');
    return h+'</div>';
  }).join('');
  const hidden = IN ? 0 : arr.filter(x=>(x.r||1)>=3).length;
  const lab = LANG==='en' ? 'Stories to develop' : '이 지역의 이야기 · 발굴 소재';
  const more = (!IN && hidden>0) ? '<div class="exmore">+ 미공개 발굴 소재 '+hidden+'건 (초인 내부 DB)</div>' : '';
  return '<div class="lab">'+lab+'</div><div class="exlist">'+rows+more+'</div>';
}

// 내부용: 그 '도시' 직접 관련 + 그 도(道) 지역 단위(대학·교육·도 기관). CONTACTS=마스터+관광공사
const SIDOMAP={강원:'강원',충북:'충북',충남:'충남',전북:'전북',전남:'전남',경북:'경북',경남:'경남',제주:'제주'};
function sidoOf(c){const reg=c[1],nm=c[0];if(reg!=='수도권')return SIDOMAP[reg]||reg;if(nm.indexOf('인천')>=0||nm.indexOf('강화')>=0)return '인천';if(nm.indexOf('서울')>=0)return '서울';return '경기';}
function regionContactsHtml(c){
  if(typeof CONTACTS==='undefined'||!CONTACTS) return instHtml(c[0]);
  const base=c[0].replace(/\(.*?\)/g,'').trim();
  const sido=sidoOf(c);
  const clean=s=>(s||'').replace(/^\[IP\]\s*/,'').trim();
  const hasInfo=x=>(x.t&&x.t!=='미확인')||(x.e&&x.e!=='미확인');
  const cityMatch=x=>(clean(x.n)+(x.a||'')+(x.dept||'')+(x.m||'')).indexOf(base)>=0;
  function row(x){
    const tel=x.t&&x.t!=='미확인'?'<a href="tel:'+esc(x.t.replace(/[^0-9+]/g,''))+'">'+esc(x.t)+'</a>':'';
    const ml=x.e&&x.e!=='미확인'?((tel?' · ':'')+'<a href="mailto:'+esc(x.e)+'">'+esc(x.e)+'</a>'):'';
    const meta=(tel||ml)?'<div class="cmeta">'+tel+ml+'</div>':'<div class="cmeta" style="color:var(--t3)">연락처 검토대기</div>';
    const kw=(x.kw&&x.kw.length)?'<div class="ckw">'+x.kw.map(esc).join(' · ')+'</div>':'';
    const cn=clean(x.n);
    const title=(cn===base && x.dept)?x.dept:cn;
    const dept=(x.dept && x.dept!==title)?'<span class="cdept">'+esc(x.dept)+'</span>':'';
    const typ=x.typ?'<span class="ctag">'+esc(x.typ)+'</span>':'';
    const srcTxt=x.src||(x.link?'링크':'');
    const src=srcTxt?('<div class="csrc">출처: '+(x.link?'<a href="'+esc(x.link)+'" target="_blank" rel="noopener">'+esc(srcTxt)+' ↗</a>':esc(srcTxt))+(x.chk?' · '+esc(x.chk):'')+'</div>')
                    :'<div class="csrc" style="color:#b04a2f">출처 없음 — 확인 필요</div>';
    return '<div class="crow'+(hasInfo(x)?' hit':'')+'"><b>'+esc(title)+'</b>'+typ+dept+kw+meta+src+'</div>';
  }
  let cityList=CONTACTS.filter(cityMatch).filter(x=>!(clean(x.n)===base && !x.dept && !hasInfo(x)));
  let regionList=CONTACTS.filter(x=>x.r===sido && !cityMatch(x));
  cityList.sort((a,b)=>(hasInfo(b)?1:0)-(hasInfo(a)?1:0));
  regionList.sort((a,b)=>(hasInfo(b)?1:0)-(hasInfo(a)?1:0));
  let html='<div class="lab">'+esc(base)+' 직접 관련 기관 '+cityList.length+'곳 · 내부용</div>';
  html+= cityList.length ? '<div class="contacts">'+cityList.map(row).join('')+'</div>'
                         : '<div class="val soon">'+esc(base)+' 직접 등록 기관 없음 — 보강 필요</div>';
  if(regionList.length)
    html+='<div class="lab">'+esc(sido)+' 지역 단위 · 대학·교육·도 기관 '+regionList.length+'곳</div><div class="contacts">'+regionList.map(row).join('')+'</div>';
  return html;
}

// 전체보기 그리드 (한번에 보기) — 권역별 도시 카드
function setView(v){
  const isGrid=v==='grid', isBoard=v==='board', isCalls=v==='calls', isMap=!isGrid&&!isBoard&&!isCalls;
  document.querySelector('.wrap').style.display = isMap?'flex':'none';
  $('grid').style.display = isGrid?'flex':'none';
  const bd=$('board'); if(bd) bd.style.display = isBoard?'block':'none';
  const cl=$('calls'); if(cl) cl.style.display = (isCalls||isGrid)?'block':'none';   // ★전체보기 = 도시이야기 + 공모 구간 둘 다
  $('vmap').classList.toggle('on',isMap); $('vgrid').classList.toggle('on',isGrid);
  const vb=$('vboard'); if(vb) vb.classList.toggle('on',isBoard);
  const vc=$('vcalls'); if(vc) vc.classList.toggle('on',isCalls);
  if(isGrid){ renderGrid(); renderCalls(); if(window.logEvent) logEvent('view','grid'); }
  if(isBoard){ if(window.loadBoard) loadBoard(); if(window.logEvent) logEvent('view','board'); }
  if(isCalls){ renderCalls(); if(window.logEvent) logEvent('view','calls'); }
}
// ── 공모 종합 게시판(독립 뷰) ── 지역 클릭(gongmoHtml)과 같은 GONGMO 데이터·같은 gongmoRows를
//    쓴다 → 밤샘 수집이 갱신되면 지역 개별 뷰와 종합 게시판이 동시에 갱신(유기연결).
var CALLS_FILTER='';   // 유형 필터(공모전/지원사업/발주/레지던시/교육·체험)
var FIELD_FILTER='';   // 분야 필터(공예/국악/서예/회화·미술/미디어아트/문학/무용/축제/전통·문화일반)
var GROUP_FILTER='';   // 성격 대분류 필터(🎬미디어·기술/🎨전통예술·공예/🎪문화·행사·교육)
var TRACK_FILTER='';   // ★2026-09-04 4분류(허범): t공모(전통 공모)/t용역(전통 용역)/g공모(일반 공모)/g용역(일반 용역)
function matchTrack(g){ if(!TRACK_FILTER) return true; var y=(g.trk==='용역'), d=!!g.trad;
  if(TRACK_FILTER==='t공모') return d&&!y; if(TRACK_FILTER==='t용역') return d&&y;
  if(TRACK_FILTER==='g공모') return !d&&!y; if(TRACK_FILTER==='g용역') return !d&&y; return true; }
function renderCalls(){
  var box=$('calls'); if(!box) return;
  var t=(LANG==='en');
  if(typeof GONGMO==='undefined'){ box.innerHTML='<div class="bwrap"><div class="bhead"><h2>'+(t?'Open Calls':'공모·공고')+'</h2><p>'+(t?'Coming soon.':'준비 중입니다.')+'</p></div></div>'; return; }
  var order=['수도권','강원','충북','충남','전북','전남','경북','경남','제주'];
  function pass(g){ return matchTrack(g) && (!GROUP_FILTER||g.g===GROUP_FILTER) && (!CALLS_FILTER||g.k===CALLS_FILTER) && (!FIELD_FILTER||g.f===FIELD_FILTER); }
  function gwonRank(g){var i=order.indexOf(g);return i<0?98:i;}
  var nat=[], groups={}, seen={};   // groups: 키=시군명 또는 광역명, 값={gwon,list}
  (GONGMO['전국']||[]).forEach(function(g){ if(!seen[g.t]&&pass(g)){seen[g.t]=1; nat.push(g);} });
  Object.keys(GONGMO).forEach(function(key){ if(key==='전국') return;
    var gwon=CITY_GWON[key]||key; if(gwonRank(gwon)>=98) return;   // 알 수 없는 키 스킵
    (GONGMO[key]||[]).forEach(function(g){ if(seen[g.t]||!pass(g)) return; seen[g.t]=1;
      (groups[key]=groups[key]||{gwon:gwon,list:[]}).list.push(g); }); });
  function sortD(a,b){return (a.d===''?1:0)-(b.d===''?1:0) || (a.d<b.d?-1:a.d>b.d?1:0);}
  nat.sort(sortD);
  // 권역순 → 같은 권역 안에서 광역(전역) 먼저 → 건수 많은 시군 순
  var names=Object.keys(groups).sort(function(a,b){
    var ra=gwonRank(groups[a].gwon), rb=gwonRank(groups[b].gwon); if(ra!==rb) return ra-rb;
    var aw=(a===groups[a].gwon), bw=(b===groups[b].gwon); if(aw!==bw) return aw?-1:1;
    return groups[b].list.length-groups[a].list.length; });
  var total=nat.length; names.forEach(function(k){ total+=groups[k].list.length; });
  // ★4분류(전통 먼저·강조) — 전통 공모 / 전통 용역 / 일반 공모 / 일반 용역
  var TRACKS=[['',t?'All':'전체'],['t공모',t?'Traditional · Calls':'🏛 전통 공모'],['t용역',t?'Traditional · Tenders':'🏛 전통 용역'],['g공모',t?'Media · Calls':'🎬 일반 공모'],['g용역',t?'Media · Tenders':'🎬 일반 용역']];
  var tkchips=TRACKS.map(function(c){return '<button class="gochip tkchip'+(TRACK_FILTER===c[0]?' on':'')+(c[0].charAt(0)==='t'?' trad':'')+'" onclick="TRACK_FILTER=\''+c[0]+'\';renderCalls();">'+c[1]+'</button>';}).join('');
  var GROUPS=[['',t?'All':'전체 성격'],['🎬 미디어·기술','🎬 미디어·기술'],['🎨 전통예술·공예','🎨 전통예술·공예'],['🎪 문화·행사·교육','🎪 문화·행사·교육']];
  var gchips=GROUPS.map(function(c){return '<button class="gochip'+(GROUP_FILTER===c[0]?' on':'')+'" onclick="GROUP_FILTER=\''+c[0]+'\';renderCalls();">'+c[1]+'</button>';}).join('');
  var chips=[['',t?'All':'전체'],['공모전',t?'Calls':'공모전'],['지원사업',t?'Grants':'지원사업'],['발주',t?'Tenders':'발주'],['레지던시',t?'Residency':'레지던시'],['교육·체험',t?'Programs':'교육·체험']]
    .map(function(c){return '<button class="gochip'+(CALLS_FILTER===c[0]?' on':'')+'" onclick="CALLS_FILTER=\''+c[0]+'\';renderCalls();">'+c[1]+'</button>';}).join('');
  var FIELDS=['공예','국악·음악','서예·문인화','회화·미술','미디어아트·영상','문학·스토리','무용·연희','축제·행사','전통·문화일반'];
  var fchips=[['',t?'All fields':'전체 분야']].concat(FIELDS.map(function(x){return [x,x];}))
    .map(function(c){return '<button class="gochip fchip'+(FIELD_FILTER===c[0]?' on':'')+'" onclick="FIELD_FILTER=\''+c[0]+'\';renderCalls();">'+c[1]+'</button>';}).join('');
  var h='<div class="bwrap"><div class="bhead"><h2>'+(t?'Traditional-Culture Open Calls':'전통문화 공모·공고')+'</h2>'
    +'<p>'+(t?'Nationwide calls, grants and tenders — updated daily. Click a region on the map for that region only.':'전국 전통문화 공모·지원·발주를 매일 자동 수집합니다. 지도에서 지역을 누르면 그 지역만 볼 수 있습니다.')+' · '+total+(t?' open':'건')+'</p>'
    +'<div class="gochips gotrack" style="font-weight:800">'+tkchips+'</div>'
    +'<div class="gochips" style="font-weight:700">'+gchips+'</div>'
    +'<div class="gochips">'+chips+'</div>'
    +'<div class="gochips ffilter">'+fchips+'</div></div>';
  if(nat.length){
    h+='<div class="bregion"><div class="bregtitle" style="cursor:default">🌐 '+(t?'National · anyone':'전국 · 누구나')+'<span>'+nat.length+'</span></div><div class="golist">'+gongmoRows(nat, nat.length)+'</div></div>';
  }
  names.forEach(function(k){ var list=groups[k].list; if(!list.length) return; list.sort(sortD);
    var isWide=(k===groups[k].gwon);
    var nm=((typeof RNAME!=='undefined'&&RNAME[LANG]&&RNAME[LANG][k])||k)+(isWide?(t?' · region-wide':' 전역'):'');
    h+='<div class="bregion"><div class="bregtitle" style="cursor:default">'+nm+'<span>'+list.length+'</span></div><div class="golist">'+gongmoRows(list, list.length)+'</div></div>';
  });
  if(total===0) h+='<p style="color:var(--t3)">'+(t?'No open calls in this filter.':'해당 조건의 공모가 없습니다.')+'</p>';
  box.innerHTML=h+'</div>';
}
window.renderCalls=renderCalls;
function renderGrid(){
  const order=['수도권','강원','충북','충남','전북','전남','경북','경남','제주'];
  const byReg={}; CITIES.forEach(c=>{(byReg[c[1]]=byReg[c[1]]||[]).push(c);});
  // ★2026-09-04 구간 구분(허범): 전체보기 = [도시 이야기] + [공모 전체]
  let h='<div class="secttl">📖 '+(LANG==='en'?'Traditional stories · 90 cities':'전국 전통 이야기 · 90개 도시')+'<span>'+(LANG==='en'?'Tap a city → map':'도시를 누르면 그 지역 지도로')+'</span></div>';
  order.forEach(rg=>{ const arr=byReg[rg]; if(!arr) return;
    h+='<div class="ghdr">'+(RNAME[LANG][rg]||rg)+' <span style="color:var(--t3);font-weight:400;font-size:12px">'+arr.length+'</span></div>';
    arr.forEach(c=>{ const nm=c[0];
      const label=nameOf(nm);
      const concept=conceptOf(nm,c[4]);
      const img=(typeof IMAGES!=='undefined'&&IMAGES[nm])?IMAGES[nm]:'';
      h+='<div class="gcard" data-city="'+esc(nm)+'"><div class="gi"'+(img?(' style="background-image:url(\''+img+'\')"'):'')+'></div>'
        +'<div class="gb"><div class="gn">'+esc(label)+'</div><div class="gc">'+esc(concept)+'</div></div></div>';
    });
  });
  const g=$('grid'); g.innerHTML=h;
  g.onclick=e=>{ const card=e.target.closest('.gcard'); if(!card) return; const c=CITIES.find(x=>x[0]===card.dataset.city); if(c){ setView('map'); if(window._select) window._select(c); } };
}
window.setView=setView;

// 헤더 로고 = 메인(홈)으로. 클릭 시 지도 기본화면으로 리셋(새로고침 없이)
$('brand').addEventListener('click', function(e){ e.preventDefault(); setView('map'); if(window.homeView) homeView(500); window.scrollTo(0,0); });
$('lf-choin').href = LINKS.choin;    // 푸터 = 초인 유튜브
if($('mcDiscord') && LINKS.discord) $('mcDiscord').href = LINKS.discord;  // 지도 카드 디스코드
if($('lf-class') && LINKS.class101) $('lf-class').href = LINKS.class101;  // 푸터 강의(클래스101)
if($('tab-muui')) $('tab-muui').href = 'muui/index.html';   // 무이 유물단 전용 페이지(설명+영상)
if($('tab-suksu')) $('tab-suksu').href = '대령숙수.html';   // 대령숙수 전용 페이지(설명+영상)

// 지도↔패널 경계 드래그로 자유 크기 조절 (localStorage 기억)
(function(){
  var rez=$('resizer'), wrap=document.querySelector('.wrap');
  if(!rez||!wrap) return;
  var saved=parseInt(localStorage.getItem('sideW'),10);
  if(saved>=320 && saved<=900) document.documentElement.style.setProperty('--side-w',saved+'px');
  var dragging=false;
  function move(e){
    if(!dragging) return;
    var x=(e.touches?e.touches[0].clientX:e.clientX);
    var r=wrap.getBoundingClientRect();
    var w=Math.max(320,Math.min(r.width-260, r.right-x));
    document.documentElement.style.setProperty('--side-w',Math.round(w)+'px');
  }
  function up(){
    if(!dragging) return; dragging=false;
    document.body.style.cursor=''; document.body.style.userSelect='';
    var w=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--side-w'),10);
    if(w) localStorage.setItem('sideW',w);
  }
  rez.addEventListener('mousedown',function(e){dragging=true;document.body.style.cursor='col-resize';document.body.style.userSelect='none';e.preventDefault();});
  rez.addEventListener('touchstart',function(){dragging=true;},{passive:true});
  window.addEventListener('mousemove',move); window.addEventListener('touchmove',move,{passive:true});
  window.addEventListener('mouseup',up); window.addEventListener('touchend',up);
})();

function setLang(l){
  LANG = l;
  $('bk').classList.toggle('on', l==='ko'); $('be').classList.toggle('on', l==='en');
  document.documentElement.lang = l;
  var ttl=$('ttl'); if(ttl&&ttl.childNodes[0]) ttl.childNodes[0].nodeValue = (l==='en'?"CHOIN — Retelling Korea's Heritage":'초인, 대한민국의 전통을 이야기하다');
  $('tag').textContent = T[l].tag;
  $('made').textContent = T[l].made;
  renderLegend(); renderCity(CUR); if(window._relabel) window._relabel();
  if($('grid') && $('grid').style.display==='flex') renderGrid();
}

function renderLegend(){
  const order=['수도권','강원','충북','전북','전남','경북','경남','제주'];
  $('legend').innerHTML = order.map(k=>'<span><i class="dot" style="background:'+RC[k]+'"></i>'+RNAME[LANG][k]+'</span>').join('')
    + '<span class="spacer" style="margin-left:auto;color:var(--t3)">'+CITIES.length+(LANG==='ko'?'개 도시 · ':' cities · ')+T[LANG].hint+'</span>';
}

function renderCity(c){
  CUR=c;
  const name=c[0], reg=c[1];
  const d=DETAILS[name]||{}, en=d.en||{};
  const img=(typeof IMAGES!=='undefined'&&IMAGES[name])?IMAGES[name]:d.img;
  const concept = conceptOf(name, c[4]);
  const media   = (LANG==='en' ? en.m : d.m);
  const imagine = (LANG==='en' ? en.i : d.i);
  const cname   = nameOf(name);
  const col=RC[reg]||'#5b6b7a';
  const soon = '<div class="val soon">'+T[LANG].soon+'</div>';
  $('side').innerHTML =
    '<h2 class="cName">'+esc(cname)+'</h2>'
    +'<div class="cRegion"><i class="dot" style="background:'+col+';margin-right:6px;vertical-align:1px"></i>'+RNAME[LANG][reg]
      +' · <span class="rstat '+restoreStatus(name).c+'">'+restoreStatus(name).t+'</span>'
      +' <span style="color:var(--t3)">· 전국 복원 '+REST_DONE+'/87</span></div>'
    +'<div class="imgbox"'+(img?(' style="background-image:url(\''+img+'\')"'):'')+'>'+(img?'':T[LANG].img)+'</div>'
    + gongmoHtml(name)
    +(d.so?('<div class="lab">'+T[LANG].place+'</div><div class="val">'+esc(d.so)+'</div>'):'')
    +(d.pe?('<div class="lab">'+T[LANG].person+'</div><div class="val">'+esc(d.pe)+'</div>'):'')
    + flagshipHtml(name, concept)
    + videosHtml(name)
    +'<div class="lab">'+T[LANG].media+'</div>'+(media?'<div class="val">'+esc(media)+'</div>':soon)
    +'<div class="lab">'+T[LANG].imagine+'</div>'+(imagine?'<div class="val">'+esc(imagine)+'</div>':soon)
    + exHtml(name)
    + communityHtml(name)
    + ((typeof voteHtml!=='undefined')?voteHtml(name):'')
    + pitchHtml(name)
    + ((typeof subscribeHtml!=='undefined')?subscribeHtml(name):'');
  if(window.loadWall) loadWall(name);     // 포스트잇 벽
  if(window.loadVotes) loadVotes(name);   // 복원지 투표 수
}

const W=900, H=1180;
const svg = d3.select('#map').append('svg').attr('viewBox','0 0 '+W+' '+H);
const gAll = svg.append('g');
const zoom = d3.zoom().scaleExtent([1,9]).translateExtent([[0,0],[W,H]]).on('zoom', e=>gAll.attr('transform', e.transform));
d3.select('#map').append('button')
  .style('position','absolute').style('top','10px').style('right','10px')
  .style('font-size','12px').style('padding','6px 11px').style('border','1px solid #d6c9b0')
  .style('border-radius','8px').style('background','#fbf7ef').style('color','#6f6553').style('cursor','pointer')
  .text('전체보기').on('click',()=>{ if(window.homeView) window.homeView(600); });

Promise.resolve(window.KOR_TOPO).then(topo=>{
  const feats = topojson.feature(topo, topo.objects.kor);
  // 울릉도·독도가 캔버스 안에 보이도록, 섬 좌표를 포함해 투영을 맞춘다
  const fitObj = {type:'FeatureCollection', features: feats.features.concat([
    {type:'Feature',geometry:{type:'Point',coordinates:[130.87,37.50]}},
    {type:'Feature',geometry:{type:'Point',coordinates:[131.95,37.24]}}
  ])};
  const proj = d3.geoMercator().fitExtent([[24,24],[W-24,H-24]], fitObj);
  const path = d3.geoPath(proj);
  CITIES.forEach(c=>c._p=proj([c[2],c[3]]));

  gAll.append('g').selectAll('path').data(feats.features).join('path')
    .attr('d',path).attr('fill','#e6dac2').attr('stroke','#cbbd9f').attr('stroke-width',.6).style('cursor','pointer')
    .on('click',(e,f)=>zoomToBounds(path.bounds(f)));

  const halo = gAll.append('circle').attr('r',13).attr('fill','none').attr('stroke-width',2.5).attr('opacity',0).style('pointer-events','none');
  const gc = gAll.append('g');
  function select(c){
    if(window.logEvent) logEvent('region', c[0]);   // 어느 지역을 눌렀나
    renderCity(c);
    gc.selectAll('circle').attr('r',d=>d===c?9:5.5).attr('stroke',d=>d===c?'#fff':'#f3ece0').attr('stroke-width',d=>d===c?3:1.6);
    halo.interrupt().attr('cx',c._p[0]).attr('cy',c._p[1]).attr('stroke',RC[c[1]]).attr('r',9).attr('opacity',.95)
        .transition().duration(550).attr('r',24).attr('opacity',0);
    if(window._relabel) window._relabel();
    zoomToPoint(c._p);
    if(window.matchMedia('(max-width:780px)').matches) $('side').scrollIntoView({behavior:'smooth'});
  }
  window._select = select;
  gc.selectAll('circle').data(CITIES).join('circle').attr('class','city')
    .attr('cx',c=>c._p[0]).attr('cy',c=>c._p[1]).attr('r',5.5)
    .attr('fill',c=>RC[c[1]]).attr('stroke','#f3ece0').attr('stroke-width',1.6)
    .on('mouseover',(e,c)=>d3.select(e.currentTarget).attr('r',d=>d===CUR?9:7))
    .on('mouseout',(e,c)=>d3.select(e.currentTarget).attr('r',d=>d===CUR?9:5.5))
    .on('click',(e,c)=>select(c))
    .append('title').text(c=>c[0]);

  const gl = gAll.append('g');
  window._relabel = function(){
    gl.selectAll('text').data(CITIES).join('text').attr('class','clabel')
      .attr('x',c=>c._p[0]+7).attr('y',c=>c._p[1]+3.5)
      .attr('font-weight',c=>c===CUR?'700':'400')
      .attr('font-size',c=>c===CUR?'13px':'10px')
      .attr('fill',c=>c===CUR?RC[c[1]]:'#3b3326')
      .text(function(c){ var v=(window._VOTES||{})[c[0]]; return nameOf(c[0]) + (v?(' 🗳'+v):''); });
  };
  window._relabel();

  function clampScale(b){ const dx=b[1][0]-b[0][0],dy=b[1][1]-b[0][1]; return Math.max(1.5,Math.min(7,.8/Math.max(dx/W,dy/H))); }
  function zoomToBounds(b){ const s=clampScale(b),x=(b[0][0]+b[1][0])/2,y=(b[0][1]+b[1][1])/2;
    svg.transition().duration(700).call(zoom.transform, d3.zoomIdentity.translate(W/2,H/2).scale(s).translate(-x,-y)); }
  function zoomToPoint(p){ svg.transition().duration(700).call(zoom.transform, d3.zoomIdentity.translate(W/2,H/2).scale(3.2).translate(-p[0],-p[1])); }

  svg.call(zoom).on('dblclick.zoom', null);
  // 기본 화면(홈): 본토 중심 확대 — 넓은 화면에서 지도가 비어 보이지 않게. 전체보기 버튼도 여기로.
  window.homeView = function(dur){
    var xs=CITIES.map(function(c){return c._p[0];}), ys=CITIES.map(function(c){return c._p[1];});
    var cx=(Math.min.apply(null,xs)+Math.max.apply(null,xs))/2;
    var cy=(Math.min.apply(null,ys)+Math.max.apply(null,ys))/2;
    var t=d3.zoomIdentity.translate(W*0.56,H/2).scale(1.62).translate(-cx,-cy);
    if(dur){ svg.transition().duration(dur).call(zoom.transform, t); } else { svg.call(zoom.transform, t); }
  };
  window.homeView();
  if(window.loadRecent) loadRecent();   // 왼쪽 카드: 통계 + 최근 자랑
  if(window.loadVoteRanks) loadVoteRanks();   // 투표 TOP + 지도 라벨 뱃지
  try { renderCity(CUR); }
  catch(e){ console.error('renderCity 오류', e); }   // 패널 오류가 지도를 지우지 않게 격리
}).catch(e=>{
  console.error('지도 초기화 오류', e);
  $('map').innerHTML='<p style="padding:20px;color:#6f6553">지도 로드 실패 — 새로고침(Ctrl+F5) 해보세요.</p>';
});

setLang('ko');
if(window.logEvent) logEvent('visit','');   // 페이지 방문 1건
