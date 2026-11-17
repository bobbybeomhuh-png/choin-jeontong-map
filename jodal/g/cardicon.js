/* 무이 나라 조달청: 「도감 카드 문양」(퀄리티 P20). 만든 날 2026-11-17
   카드 스물여덟 장마다 그 조달 제도를 나타내는 작은 문양(옻칠 바탕 원판, 금빛 테, 먹·금빛 그림)을 캔버스로 그려 그림 주소로 돌려준다.
   cardIcon(key, on) : on=false 면 흐린 회색(아직 못 모은 카드). */
const CACHE={};
const D={
 bid:q=>{fig(q,-14,0);fig(q,14,0);q.strokeStyle='#e8603c';q.lineWidth=6;q.beginPath();q.arc(0,0,30,0,7);q.moveTo(-21,-21);q.lineTo(21,21);q.stroke()},
 crown:q=>{for(let r=0;r<3;r++)for(let i=0;i<3-r;i++){ingot(q,(i-(2-r)/2)*22,18-r*14)}},
 maebyeong:q=>{q.lineWidth=6;q.beginPath();q.arc(-6,-6,16,0,7);q.stroke();q.beginPath();q.moveTo(6,6);q.lineTo(24,24);q.stroke();q.lineWidth=3;q.beginPath();q.moveTo(-14,-6);q.lineTo(-8,0);q.lineTo(4,-12);q.stroke()},
 angbu:q=>{q.beginPath();q.moveTo(0,-28);q.lineTo(7,-8);q.lineTo(28,-8);q.lineTo(11,4);q.lineTo(18,26);q.lineTo(0,13);q.lineTo(-18,26);q.lineTo(-11,4);q.lineTo(-28,-8);q.lineTo(-7,-8);q.closePath();q.fill()},
 najeonham:q=>{for(const[x,h]of[[-18,20],[0,30],[18,24]]){q.fillRect(x-7,24-h,14,h)}q.fillRect(-28,24,56,4)},
 stock:q=>{q.lineWidth=4;q.beginPath();q.moveTo(0,-24);q.lineTo(0,24);q.moveTo(-26,-14);q.lineTo(26,-14);q.stroke();for(const s of[-1,1]){q.beginPath();q.moveTo(s*26,-14);q.lineTo(s*34,6);q.lineTo(s*18,6);q.closePath();q.stroke()}q.fillRect(-12,22,24,5)},
 ferry:q=>{q.beginPath();q.moveTo(-28,6);q.lineTo(28,6);q.lineTo(20,18);q.lineTo(-20,18);q.closePath();q.fill();q.lineWidth=3;q.beginPath();q.moveTo(0,6);q.lineTo(0,-24);q.stroke();q.beginPath();q.moveTo(2,-22);q.lineTo(20,2);q.lineTo(2,2);q.closePath();q.fill();wave(q,26)},
 export:q=>{q.lineWidth=4;q.beginPath();q.arc(0,0,22,0,7);q.stroke();q.beginPath();q.ellipse(0,0,10,22,0,0,7);q.stroke();q.beginPath();q.moveTo(-22,0);q.lineTo(22,0);q.moveTo(-19,-11);q.lineTo(19,-11);q.moveTo(-19,11);q.lineTo(19,11);q.stroke()},
 build:q=>{q.lineWidth=5;q.beginPath();q.moveTo(-28,-4);q.quadraticCurveTo(0,-26,28,-4);q.stroke();for(const x of[-18,0,18])q.fillRect(x-3,-6,6,24);wave(q,24)},
 disaster:q=>{q.beginPath();q.moveTo(0,-28);q.bezierCurveTo(16,-6,18,6,0,26);q.bezierCurveTo(-18,6,-16,-6,0,-28);q.fill();q.fillStyle='#2a140a';q.beginPath();q.arc(0,8,8,0,7);q.fill()},
 venture:q=>{q.beginPath();q.moveTo(0,-26);q.quadraticCurveTo(14,-10,10,10);q.lineTo(-10,10);q.quadraticCurveTo(-14,-10,0,-26);q.fill();q.beginPath();q.moveTo(-10,10);q.lineTo(-18,24);q.lineTo(-6,16);q.moveTo(10,10);q.lineTo(18,24);q.lineTo(6,16);q.fill();q.fillStyle='#2a140a';q.beginPath();q.arc(0,-6,5,0,7);q.fill()},
 watch:q=>{q.beginPath();q.ellipse(0,0,28,15,0,0,7);q.fill();q.fillStyle='#2a140a';q.beginPath();q.arc(0,0,10,0,7);q.fill();q.fillStyle='#f2d27a';q.beginPath();q.arc(3,-3,3,0,7);q.fill()},
 econtract:q=>{q.fillRect(-18,-26,36,46);q.fillStyle='#2a140a';for(let i=0;i<4;i++)q.fillRect(-12,-18+i*9,24,3);q.fillStyle='#c8352a';q.fillRect(4,8,14,14)},
 excellent:q=>{q.beginPath();q.arc(0,-6,18,0,7);q.fill();q.beginPath();q.moveTo(-12,8);q.lineTo(-16,28);q.lineTo(-4,22);q.lineTo(0,10);q.moveTo(12,8);q.lineTo(16,28);q.lineTo(4,22);q.lineTo(0,10);q.fill();q.fillStyle='#2a140a';q.font='bold 20px serif';q.textAlign='center';q.fillText('1',0,1)},
 rauction:q=>{q.lineWidth=5;q.beginPath();q.moveTo(-20,-22);q.lineTo(-20,22);q.moveTo(-28,12);q.lineTo(-20,24);q.lineTo(-12,12);q.stroke();q.save();q.translate(10,-2);q.rotate(-.6);q.fillRect(-14,-6,28,12);q.fillRect(-3,4,6,20);q.restore()},
 transfer:q=>{q.lineWidth=5;q.beginPath();q.arc(0,0,20,.3,2.9);q.stroke();q.beginPath();q.arc(0,0,20,3.4,6.0);q.stroke();q.beginPath();q.moveTo(-22,12);q.lineTo(-18,2);q.lineTo(-12,12);q.closePath();q.fill();q.beginPath();q.moveTo(22,-12);q.lineTo(18,-2);q.lineTo(12,-12);q.closePath();q.fill()},
 local:q=>{q.beginPath();q.moveTo(-26,-2);q.lineTo(0,-22);q.lineTo(26,-2);q.closePath();q.fill();q.fillRect(-18,-2,36,26);q.fillStyle='#2a140a';q.fillRect(-5,10,10,14)},
 narajangteo:q=>{q.beginPath();q.moveTo(-28,-10);q.lineTo(0,-24);q.lineTo(28,-10);q.closePath();q.fill();for(const x of[-20,-7,7,20])q.fillRect(x-2,-10,4,30);q.fillRect(-28,20,56,4)},
 fraud:q=>{q.fillRect(-16,-10,32,26);q.lineWidth=6;q.strokeStyle='#e8603c';q.beginPath();q.moveTo(-24,-24);q.lineTo(24,24);q.moveTo(24,-24);q.lineTo(-24,24);q.stroke()},
 emergency:q=>{q.beginPath();q.moveTo(6,-28);q.lineTo(-16,4);q.lineTo(0,4);q.lineTo(-6,28);q.lineTo(18,-6);q.lineTo(2,-6);q.closePath();q.fill()},
 qc:q=>{q.lineWidth=5;q.beginPath();q.arc(-14,0,12,0,7);q.stroke();q.beginPath();q.arc(14,0,12,0,7);q.stroke();q.beginPath();q.moveTo(-2,0);q.lineTo(2,0);q.stroke();q.beginPath();q.moveTo(-6,22);q.lineTo(0,28);q.lineTo(12,16);q.stroke()},
 prio:q=>{q.beginPath();q.moveTo(0,24);q.bezierCurveTo(-34,0,-22,-26,0,-10);q.bezierCurveTo(22,-26,34,0,0,24);q.fill();q.fillStyle='#2a140a';q.beginPath();q.arc(0,-2,6,0,7);q.fill()},
 unit:q=>{for(const[x,y]of[[-18,-14],[18,-14],[-18,14],[18,14]]){q.fillRect(x-7,y-6,14,12)}q.lineWidth=3;q.beginPath();for(const[x,y]of[[-18,-14],[18,-14],[-18,14],[18,14]]){q.moveTo(x*.6,y*.6);q.lineTo(0,0)}q.stroke();q.beginPath();q.arc(0,0,9,0,7);q.fill()},
 mall:q=>{q.beginPath();q.moveTo(-26,-14);q.lineTo(26,-14);q.lineTo(20,12);q.lineTo(-18,12);q.closePath();q.fill();q.lineWidth=4;q.beginPath();q.moveTo(-26,-14);q.lineTo(-30,-24);q.lineTo(-36,-24);q.stroke();q.beginPath();q.arc(-12,22,5,0,7);q.fill();q.beginPath();q.arc(14,22,5,0,7);q.fill()},
 safety:q=>{q.beginPath();q.arc(0,4,22,Math.PI,0);q.closePath();q.fill();q.fillRect(-30,4,60,6);q.fillStyle='#2a140a';q.fillRect(-3,-16,6,18);q.fillStyle='#f2d27a';q.lineWidth=5;q.beginPath();q.moveTo(-14,20);q.lineTo(-4,28);q.lineTo(16,14);q.strokeStyle='#f2d27a';q.stroke()},
 reserve:q=>{q.lineWidth=4;q.beginPath();q.moveTo(-28,-20);q.lineTo(-14,-6);q.lineTo(-2,-16);q.lineTo(10,0);q.lineTo(26,-24);q.stroke();q.beginPath();q.moveTo(26,-24);q.lineTo(26,-12);q.moveTo(26,-24);q.lineTo(14,-24);q.stroke();for(let i=0;i<3;i++)ingot(q,(i-1)*20,22);ingot(q,-10,12);ingot(q,10,12)},
 direct:q=>{q.beginPath();q.moveTo(-28,-2);q.lineTo(-10,-16);q.lineTo(8,-2);q.closePath();q.fill();q.fillRect(-24,-2,28,22);q.fillStyle='#2a140a';q.fillRect(-14,8,8,12);q.strokeStyle='#f2d27a';q.lineWidth=5;q.beginPath();q.arc(12,6,11,0,7);q.stroke();q.lineWidth=6;q.beginPath();q.moveTo(20,14);q.lineTo(30,26);q.stroke()},
 moonjar:q=>{fig(q,-18,2);fig(q,0,-4);fig(q,18,2);q.lineWidth=3;q.beginPath();q.moveTo(-18,18);q.lineTo(18,18);q.stroke()}};
function fig(q,x,y){q.beginPath();q.arc(x,y-12,7,0,7);q.fill();q.beginPath();q.moveTo(x-10,y+16);q.quadraticCurveTo(x,y-10,x+10,y+16);q.closePath();q.fill()}
function ingot(q,x,y){q.beginPath();q.moveTo(x-10,y+5);q.lineTo(x-7,y-5);q.lineTo(x+7,y-5);q.lineTo(x+10,y+5);q.closePath();q.fill()}
function wave(q,y){q.lineWidth=2.5;q.beginPath();for(let x=-30;x<=30;x+=2)q.lineTo(x,y+Math.sin(x*.35)*2.5);q.stroke()}
export function cardIcon(k,on=true){const key=k+(on?1:0);if(CACHE[key])return CACHE[key];const c=document.createElement('canvas');c.width=c.height=96;const q=c.getContext('2d');
 const g=q.createRadialGradient(40,34,6,48,48,46);g.addColorStop(0,on?'#5a2a1a':'#c8bca4');g.addColorStop(1,on?'#2a140a':'#a89c84');q.fillStyle=g;q.beginPath();q.arc(48,48,44,0,7);q.fill();
 q.lineWidth=4;q.strokeStyle=on?'#d8a838':'#8a7e66';q.beginPath();q.arc(48,48,44,0,7);q.stroke();q.lineWidth=1.5;q.beginPath();q.arc(48,48,38,0,7);q.stroke();
 q.save();q.translate(48,48);q.fillStyle=on?'#f2d27a':'#7a6e58';q.strokeStyle=on?'#f2d27a':'#7a6e58';q.lineCap='round';q.lineJoin='round';try{(D[k]||D.econtract)(q)}catch(e){}q.restore();
 return CACHE[key]=c.toDataURL()}
/* 놀이마다 다른 「카드가 열렸어요」 문구가 화면에 뜨면, 문구 속 카드 이름을 찾아 그 문양을 앞에 붙임(톡 튀어나오는 움직임). 한 요소에 한 번만 */
export function watchCardUnlocks(CARDS){if(window.__CARDWATCH)return;window.__CARDWATCH=1;const names=Object.entries(CARDS).map(([k,v])=>[k,v.n]).sort((a,b)=>b[1].length-a[1].length);
 if(!document.getElementById('jd-cardpop')){const st=document.createElement('style');st.id='jd-cardpop';st.textContent='@keyframes jdpop{0%{transform:scale(.2) rotate(-20deg);opacity:0}60%{transform:scale(1.15) rotate(6deg);opacity:1}100%{transform:scale(1) rotate(0)}}.jd-cicon{width:64px;height:64px;display:block;margin:4px auto 6px;animation:jdpop .6s ease-out;filter:drop-shadow(0 3px 6px rgba(0,0,0,.4))}';document.head.append(st)}
 const scan=root=>{const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;const hits=[];while((n=w.nextNode())){if(n.nodeValue&&n.nodeValue.indexOf('카드가 열렸')>=0)hits.push(n)}
  for(const t of hits){let el=t.parentElement;if(!el||el.closest('[data-cicon]'))continue;const box=el.closest('.jd-tip,.f3-card,div')||el;if(box.dataset.cicon)continue;const txt=box.textContent||'';const qm=txt.match(/「([^」]+)」\s*카드가 열렸/)||txt.match(/카드가 열렸어요\s*·\s*([^\s<]+(?:\s[^\s<]+)?)/);const f=(qm&&names.find(([k,nm])=>qm[1].trim()===nm||qm[1].indexOf(nm)===0))||names.find(([k,nm])=>txt.indexOf(nm)>=0);if(!f)continue;box.dataset.cicon=1;const img=new Image();img.className='jd-cicon';img.alt='';img.src=cardIcon(f[0],true);box.insertBefore(img,box.firstChild)}};
 /* 11/17 C9: 이미 떠 있는 알림 상자의 글만 바뀌는 놀이(역경매·박람회 등)도 잡도록, 바뀐 상자(target)까지 살핌 */
 new MutationObserver(ms=>{const seen=new Set();for(const m of ms){const cands=[m.target,...m.addedNodes];for(const a of cands){const el=a&&(a.nodeType===1?a:a.parentElement);if(!el||el===document.body||seen.has(el))continue;seen.add(el);const tx=el.textContent||'';if(tx.length<3000&&tx.indexOf('카드가 열렸')>=0)scan(el)}}}).observe(document.body,{childList:true,subtree:true,characterData:true})}
