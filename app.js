let LANG = 'ko';
let CUR = (CITIES.find(function(c){return c[0]==='서울';})) || CITIES[0];  // 기본 진입 도시=서울
const $ = id => document.getElementById(id);
function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

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
    return '<a class="gorow" href="'+g.u+'" target="_blank" rel="noopener">'
      + '<span class="godd'+(g.d&&dday(g.d).match(/D-([0-9])$/)?' urgent':'')+'">'+dday(g.d)+'</span>'
      + '<span class="got">'+kind+esc(g.t)+'</span></a>';
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
  var list = (typeof VIDEOS!=='undefined' && VIDEOS[region]) ? VIDEOS[region] : [];
  if(!list.length) return '';
  var t=(LANG==='en'), cap=6;
  var head = t ? 'What Muui restored here' : '무이 복원단이 되살린 것';
  var rows = list.slice(0,cap).map(function(v){
    var link = v.yt ? v.yt : (v.ch==='f' ? LINKS.foodie : LINKS.choin);
    var after = '<span class="rafter" style="background-image:url(\''+v.th+'\')"><span class="vplay">▶</span></span>';
    var pair = v.before
      ? '<span class="rbefore" style="background-image:url(\''+v.before+'\')"></span><span class="rarrow">→</span>'+after
      : after;
    return '<a class="rcard'+(v.before?' pair':'')+'" href="'+link+'" target="_blank" rel="noopener" title="'+esc(v.n)+'">'
      + pair + '<span class="vtitle">'+esc(v.n)+'</span></a>';
  }).join('');
  var more = list.length>cap ? '<div class="exmore">+ '+(list.length-cap)+(t?' more':'편 더')+'</div>' : '';
  return '<div class="lab" style="color:var(--teal)">'+head+' · '+list.length+'</div>'
    + '<div class="rlist">'+rows+more+'</div>';
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
  var h = '<div class="lab" style="color:#a9803a">'+(t?'Leave a note':'우리 동네 자랑')+'</div>';
  h += '<a class="notebtn" href="'+brag+'" target="_blank" rel="noopener">✎ '
     + (t?('Say something about '+region):(region+'에 한마디 남기기'))+'</a>';
  h += '<div class="pitch" style="margin-top:14px;border-color:#e6d3b0;background:#fbf5ea">'
     + '<div class="ph">'+(t?'Tell us your local heritage':'내 동네 알리미')+'</div>'
     + '<div class="ps">'+(t?'Suggest a tradition worth restoring. Monthly picks receive official K-pop artist goods.'
            :'되살리면 좋을 우리 동네 전통·이야기를 알려주세요. 매달 좋은 제보를 뽑아 인기 K-pop 아티스트 공식 굿즈를 선물로 보내드립니다.')+'</div>'
     + '<a class="pbtn main" href="'+report+'" target="_blank" rel="noopener">✉ '+(t?'Submit':'내 동네 알리기')+'</a>'
     + '<div style="font-size:11px;color:var(--t3);margin-top:8px;line-height:1.5">'
     + (t?'':'채택되어 경품 발송이 필요한 경우에 한해 주소·연락처를 요청할 수 있으며, 그 외 용도로는 절대 사용하지 않습니다.')+'</div></div>';
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
  const grid = v==='grid';
  document.querySelector('.wrap').style.display = grid?'none':'flex';
  $('grid').style.display = grid?'flex':'none';
  $('vmap').classList.toggle('on',!grid); $('vgrid').classList.toggle('on',grid);
  if(grid) renderGrid();
}
function renderGrid(){
  const order=['수도권','강원','충북','충남','전북','전남','경북','경남','제주'];
  const byReg={}; CITIES.forEach(c=>{(byReg[c[1]]=byReg[c[1]]||[]).push(c);});
  let h='';
  order.forEach(rg=>{ const arr=byReg[rg]; if(!arr) return;
    h+='<div class="ghdr">'+(RNAME[LANG][rg]||rg)+' <span style="color:var(--t3);font-weight:400;font-size:12px">'+arr.length+'</span></div>';
    arr.forEach(c=>{ const nm=c[0]; const en=(typeof DETAILS!=='undefined'&&DETAILS[nm]&&DETAILS[nm].en)?DETAILS[nm].en:null;
      const label=(LANG==='en'&&en&&en.n)?en.n:nm;
      const concept=(LANG==='en'&&en&&en.c)?en.c:(c[4]||'');
      const img=(typeof IMAGES!=='undefined'&&IMAGES[nm])?IMAGES[nm]:'';
      h+='<div class="gcard" data-city="'+esc(nm)+'"><div class="gi"'+(img?(' style="background-image:url(\''+img+'\')"'):'')+'></div>'
        +'<div class="gb"><div class="gn">'+esc(label)+'</div><div class="gc">'+esc(concept)+'</div></div></div>';
    });
  });
  const g=$('grid'); g.innerHTML=h;
  g.onclick=e=>{ const card=e.target.closest('.gcard'); if(!card) return; const c=CITIES.find(x=>x[0]===card.dataset.city); if(c){ setView('map'); if(window._select) window._select(c); } };
}
window.setView=setView;

$('brand').href = LINKS.choin;
$('lf-choin').href = LINKS.choin;

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
  const concept = (LANG==='en' ? (en.c||c[4]) : c[4]);
  const media   = (LANG==='en' ? en.m : d.m);
  const imagine = (LANG==='en' ? en.i : d.i);
  const cname   = (LANG==='en' && en.n) ? en.n : name;
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
    + pitchHtml(name);
}

const W=900, H=1180;
const svg = d3.select('#map').append('svg').attr('viewBox','0 0 '+W+' '+H);
const gAll = svg.append('g');
const zoom = d3.zoom().scaleExtent([1,9]).translateExtent([[0,0],[W,H]]).on('zoom', e=>gAll.attr('transform', e.transform));
d3.select('#map').append('button')
  .style('position','absolute').style('top','10px').style('right','10px')
  .style('font-size','12px').style('padding','6px 11px').style('border','1px solid #d6c9b0')
  .style('border-radius','8px').style('background','#fbf7ef').style('color','#6f6553').style('cursor','pointer')
  .text('전체보기').on('click',()=>svg.transition().duration(600).call(zoom.transform, d3.zoomIdentity));

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
      .text(c=>(LANG==='en' && DETAILS[c[0]] && DETAILS[c[0]].en && DETAILS[c[0]].en.n)?DETAILS[c[0]].en.n:c[0]);
  };
  window._relabel();

  function clampScale(b){ const dx=b[1][0]-b[0][0],dy=b[1][1]-b[0][1]; return Math.max(1.5,Math.min(7,.8/Math.max(dx/W,dy/H))); }
  function zoomToBounds(b){ const s=clampScale(b),x=(b[0][0]+b[1][0])/2,y=(b[0][1]+b[1][1])/2;
    svg.transition().duration(700).call(zoom.transform, d3.zoomIdentity.translate(W/2,H/2).scale(s).translate(-x,-y)); }
  function zoomToPoint(p){ svg.transition().duration(700).call(zoom.transform, d3.zoomIdentity.translate(W/2,H/2).scale(3.2).translate(-p[0],-p[1])); }

  svg.call(zoom).on('dblclick.zoom', null);
  try { renderCity(CUR); }
  catch(e){ console.error('renderCity 오류', e); }   // 패널 오류가 지도를 지우지 않게 격리
}).catch(e=>{
  console.error('지도 초기화 오류', e);
  $('map').innerHTML='<p style="padding:20px;color:#6f6553">지도 로드 실패 — 새로고침(Ctrl+F5) 해보세요.</p>';
});

setLang('ko');
