/* 무이 나라 조달청: 「실제 조달청 순서」 설명 띠(개편 1). 만든 날 2026-11-17
   놀이 장면 다섯(방 붙이기·장인 고르기·수결과 발굴·조각 맞추기·의궤)이 실제 조달청 열 단계 가운데 어디에 해당하는지
   장면이 시작될 때 화면 위쪽에 띠 한 장으로 3초쯤 보여 준다(글 벽 대신 칸 그림). 누르면 바로 닫힘. 장면마다 처음 두 번만.
   showBand(i, ST, save) · SCENES · REAL */
export const REAL=['조달 요청','규격·예정가격','입찰 공고','입찰·개찰','적격 심사','계약','이행·감독','검사·검수','대금 지급','공개·사후'];
export const SCENES=[{n:'방 붙이기',on:[0,1,2],say:'원님이 요청한 일을 규격(장인·품삯·기한)과 공고 기간으로 정해 방 한 장으로 알려요.'},
 {n:'장인 고르기',on:[3,4],say:'찾아온 장인들의 봉투를 열고, 값만이 아니라 솜씨와 자격을 함께 봐요.'},
 {n:'수결과 발굴',on:[5,6],say:'수결로 계약하고, 장인이 일하는 동안 무이가 감독해요.'},
 {n:'조각 맞추기',on:[7],say:'다 된 국보가 약속한 규격대로인지 하나하나 검수해요.'},
 {n:'의궤에 적기',on:[8,9],say:'품삯을 치르고, 누가 무엇을 얼마에 했는지 의궤에 남겨 모두에게 알려요.'}];
let el=null,tm=null;
function css(){if(document.getElementById('jd-band-css'))return;const st=document.createElement('style');st.id='jd-band-css';st.textContent=`body.jdbo .jd-ov{padding-top:var(--jdb,12px)}body.jdbo .jd-ov .jd-card{max-height:calc(100vh - var(--jdb,12px) - 12px)!important}#jdBand{position:fixed;left:50%;top:14px;transform:translate(-50%,-140%);z-index:80;max-width:min(1100px,98vw);padding:6px 10px 7px;border-radius:12px;background:linear-gradient(#fbf3dc,#f1e2bd);border:3px solid #8e2b20;box-shadow:0 10px 30px rgba(0,0,0,.45);font:12.5px/1.35 "Gowun Dodum",sans-serif;color:#2b1d12;transition:transform .45s cubic-bezier(.2,.9,.3,1.2);cursor:pointer;text-align:center}
#jdBand.on{transform:translate(-50%,0)}#jdBand .t{font:14px "Do Hyeon",sans-serif;color:#8e2b20;margin-bottom:3px}#jdBand .t b{color:#2b1d12}
#jdBand .row{display:flex;gap:3px;justify-content:center;flex-wrap:nowrap}#jdBand .c{font:12px "Do Hyeon",sans-serif;padding:3px 5px;border-radius:8px;background:#e6d8b8;color:#9a8a6a;border:2px solid transparent;white-space:nowrap}
#jdBand .c.on{background:#8e2b20;color:#fff4dc;border-color:#f2d27a;transform:scale(1.06)}#jdBand .a{color:#b8a888;font-size:12px;align-self:center}#jdBand .s{margin-top:3px}`;document.head.append(st)}
export function showBand(i,ST,save,force){try{const S=SCENES[i];if(!S)return;ST.band=ST.band||{};const seen=ST.band[i]||0;if(!force&&seen>=2)return;ST.band[i]=seen+1;try{save&&save()}catch(e){}css();
 if(!el){el=document.createElement('div');el.id='jdBand';el.onclick=()=>hide();document.body.append(el)}
 el.innerHTML=`<div class="t">실제 조달청에서는 이 열 단계를 거쳐요 · 지금 <b>「${S.n}」</b>은 빨간 칸</div><div class="row">${REAL.map((r,k)=>`${k?'<span class="a">›</span>':''}<span class="c ${S.on.includes(k)?'on':''}">${k+1} ${r}</span>`).join('')}</div><div class="s">${S.say}</div>`;
 clearTimeout(tm);requestAnimationFrame(()=>{el.classList.add('on');/* 11/18 D83: 1366×768에서 띠가 창 제목을 덮던 것 → 띠가 뜨면 열린(곧 열릴) 창을 띠 높이만큼 내리고, 창이 모두 닫히면 되돌림. 띠가 사라져도 읽는 중인 창은 움직이지 않음 */try{const h=Math.ceil(el.getBoundingClientRect().bottom)+6;document.body.style.setProperty('--jdb',h+'px');document.body.classList.add('jdbo');clearInterval(bw);let seen=0;bw=setInterval(()=>{const o=document.querySelector('.jd-ov');if(o)seen=1;else if(seen||!el.classList.contains('on')){document.body.classList.remove('jdbo');clearInterval(bw)}},400)}catch(e){}});tm=setTimeout(hide,3300)}catch(e){}}
let bw=0;function hide(){if(el)el.classList.remove('on')}
