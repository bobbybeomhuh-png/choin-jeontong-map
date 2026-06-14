let LANG = 'ko';
let CUR = CITIES[0];
const $ = id => document.getElementById(id);
function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

$('brand').href = LINKS.choin;
$('lf-choin').href = LINKS.choin;

function setLang(l){
  LANG = l;
  $('bk').classList.toggle('on', l==='ko'); $('be').classList.toggle('on', l==='en');
  document.documentElement.lang = l;
  $('tag').textContent = T[l].tag;
  $('made').textContent = T[l].made;
  renderLegend(); renderCity(CUR); if(window._relabel) window._relabel();
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
    +'<div class="cRegion"><i class="dot" style="background:'+col+';margin-right:6px;vertical-align:1px"></i>'+RNAME[LANG][reg]+'</div>'
    +'<div class="imgbox"'+(img?(' style="background-image:url(\''+img+'\')"'):'')+'>'+(img?'':T[LANG].img)+'</div>'
    +'<div class="lab">'+T[LANG].concept+'</div><div class="concept">'+esc(concept)+'</div>'
    +'<div class="lab">'+T[LANG].media+'</div>'+(media?'<div class="val">'+esc(media)+'</div>':soon)
    +'<div class="lab">'+T[LANG].imagine+'</div>'+(imagine?'<div class="val">'+esc(imagine)+'</div>':soon)
    +'<div class="cta"><div class="h">'+T[LANG].ctah+'</div>'
    +'<a class="make" href="'+LINKS.class101+'" target="_blank" rel="noopener">'+T[LANG].make+'<small>'+T[LANG].makeS+'</small></a>'
    +'<a class="see" href="'+LINKS.choin+'" target="_blank" rel="noopener">'+T[LANG].see+'<small>'+T[LANG].seeS+'</small></a>'
    +'<a class="ai" href="'+LINKS.kevery+'" target="_blank" rel="noopener">'+T[LANG].ai+'<small>'+T[LANG].aiS+'</small></a>'
    +'</div>';
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

d3.json('https://cdn.jsdelivr.net/npm/datamaps@0.5.10/src/js/data/kor.topo.json').then(topo=>{
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

  const gc = gAll.append('g');
  gc.selectAll('circle').data(CITIES).join('circle').attr('class','city')
    .attr('cx',c=>c._p[0]).attr('cy',c=>c._p[1]).attr('r',5.5)
    .attr('fill',c=>RC[c[1]]).attr('stroke','#f3ece0').attr('stroke-width',1.6)
    .on('click',(e,c)=>{ renderCity(c); gc.selectAll('circle').attr('stroke','#f3ece0').attr('stroke-width',1.6); d3.select(e.currentTarget).attr('stroke','#3b3326').attr('stroke-width',2.6); zoomToPoint(c._p); if(window.matchMedia('(max-width:780px)').matches) $('side').scrollIntoView({behavior:'smooth'}); })
    .append('title').text(c=>c[0]);

  const gl = gAll.append('g');
  window._relabel = function(){
    gl.selectAll('text').data(CITIES).join('text').attr('class','clabel')
      .attr('x',c=>c._p[0]+7).attr('y',c=>c._p[1]+3.5)
      .text(c=>(LANG==='en' && DETAILS[c[0]] && DETAILS[c[0]].en && DETAILS[c[0]].en.n)?DETAILS[c[0]].en.n:c[0]);
  };
  window._relabel();

  function clampScale(b){ const dx=b[1][0]-b[0][0],dy=b[1][1]-b[0][1]; return Math.max(1.5,Math.min(7,.8/Math.max(dx/W,dy/H))); }
  function zoomToBounds(b){ const s=clampScale(b),x=(b[0][0]+b[1][0])/2,y=(b[0][1]+b[1][1])/2;
    svg.transition().duration(700).call(zoom.transform, d3.zoomIdentity.translate(W/2,H/2).scale(s).translate(-x,-y)); }
  function zoomToPoint(p){ svg.transition().duration(700).call(zoom.transform, d3.zoomIdentity.translate(W/2,H/2).scale(3.2).translate(-p[0],-p[1])); }

  svg.call(zoom).on('dblclick.zoom', null);
  renderCity(CITIES[0]);
}).catch(()=>{ $('map').innerHTML='<p style="padding:20px;color:#6f6553">지도 로드 실패(인터넷 확인).</p>'; renderCity(CITIES[0]); });

setLang('ko');
