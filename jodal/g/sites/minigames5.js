/* 유산 마당 짧은 놀이 5: 청주 직지 활자 짜기.
   갱신 2026-11-14. 판에 짤 글줄이 나오면 활자 상자에서 글자를 차례로 골라 넣는다.
   금속활자는 글자가 좌우로 뒤집혀 있어(찍으면 바로 선다) 상자 속 글자도 뒤집어 그린다. 세 판을 짜면 종이를 눌러 찍는다. */
import {overlay,title,blip,finishCard,softOut} from './minigames.js';
const LINES=[['直','指','心','體','要','節'],['白','雲','和','尙'],['佛','祖','直','指']];
const MEAN=['직지심체요절: 마음을 바로 가리켜 깨닫게 하는 요긴한 글','백운화상: 이 책을 엮은 고려 스님','불조직지: 부처와 조사가 바로 가리킨 가르침'];
const DECOY=['金','屬','活','字','淸','州','興','德','寺','印','書','紙'];
export function typeGame(ctx){const ui=overlay('radial-gradient(circle at 50% 30%,#4a3a2a,#1e140c)');let alive=true,round=0,pos=0,miss=0,ended=false,t0=performance.now(),tray=[],shake=0,printT=-1,flash=0,set=[];
 const ac=ctx.ac(),out=softOut(ctx);
 const deal=()=>{const L=LINES[round];const pool=L.slice();const dec=DECOY.filter(c=>!L.includes(c)).sort(()=>Math.random()-.5).slice(0,Math.max(4,10-L.length));const all=pool.concat(dec).sort(()=>Math.random()-.5);tray=all.map((c,i)=>({c,i,used:false,wob:0}));pos=0;set=[]};
 const head=()=>{title(ui.top,'직지 활자 짜기',`${round+1}판: 위 글줄 차례대로 활자를 골라 판에 넣어요. 활자는 좌우가 뒤집혀 있어요!`);ui.top.querySelector('b').style.color='#f2d27a'};
 deal();head();window.__TG={tray:()=>tray,want:()=>(LINES[round]||[])[pos],G:()=>G(),printing:()=>printT>=0};
 const G=()=>{const {W,H}=ui.fit(),u=Math.min(W/(W<H?520:900),H/640);const n=tray.length,cols=W<H?5:Math.min(8,n),rows=Math.ceil(n/cols),bs=Math.min(78*u,(W-40)/cols-10);return{W,H,u,cols,rows,bs,tx:W/2-(cols*(bs+10)-10)/2,ty:H-rows*(bs+10)-40*u-26}};
 const hit=(mx,my)=>{const g=G();for(const b of tray){if(b.used)continue;const cx=g.tx+(b.i%g.cols)*(g.bs+10),cy=g.ty+Math.floor(b.i/g.cols)*(g.bs+10);if(mx>=cx&&mx<=cx+g.bs&&my>=cy&&my<=cy+g.bs)return b}return null};
 ui.c.addEventListener('pointerdown',e=>{if(ended||printT>=0)return;const R=ui.c.getBoundingClientRect(),b=hit(e.clientX-R.left,e.clientY-R.top);if(!b)return;const want=LINES[round][pos];
  if(b.c===want){b.used=true;set.push(b.c);pos++;blip(ac,out,520+pos*60,700+pos*60,.12,.18,'triangle');if(pos>=LINES[round].length){blip(ac,out,660,990,.3,.2);ctx.say(MEAN[round]);printT=0}}
  else{b.wob=1;miss++;shake=1;blip(ac,out,220,140,.18,.18,'square');ctx.say(b.c===want?'':`그건 「${b.c}」예요. 지금은 「${want}」를 찾아요.`)}});
 const close=()=>{alive=false;ui.o.remove()};ui.x.onclick=close;ui.again=()=>{round=0;miss=0;ended=false;printT=-1;t0=performance.now();deal();head()};
 const glyph=(q,c,x,y,s,mir,col)=>{q.save();q.translate(x,y);if(mir)q.scale(-1,1);q.fillStyle=col;q.font=`bold ${s}px "Noto Serif KR","Batang",serif`;q.textAlign='center';q.textBaseline='middle';q.fillText(c,0,s*.04);q.restore()};
 const loop=()=>{if(!alive)return;const g=G(),{W,H,u}=g,q=ui.q;const d=Math.min(2,devicePixelRatio||1);q.setTransform(d,0,0,d,0,0);q.clearRect(0,0,W,H);shake=Math.max(0,shake-.06);flash=Math.max(0,flash-.03);
  /* 다 찍으면: 세 줄이 찍힌 책장(오른쪽부터 세로쓰기) */if(ended){const ph=Math.min(H*.5,420*u),pw=ph*.78,px=W/2-pw/2,py=Math.max(90,H*.16);q.fillStyle='#f4ead2';q.fillRect(px,py,pw,ph);q.strokeStyle='#8e2b20';q.lineWidth=3;q.strokeRect(px+10,py+10,pw-20,ph-20);const cw=(pw-20)/4;for(let k=1;k<4;k++){q.beginPath();q.moveTo(px+10+k*cw,py+10);q.lineTo(px+10+k*cw,py+ph-10);q.lineWidth=1;q.stroke()}
   LINES.forEach((Ln,k)=>{const x=px+pw-10-cw*(k+.5),s=Math.min(cw*.62,(ph-40)/6.4);Ln.forEach((c,j)=>glyph(q,c,x,py+24+s*.6+j*s*1.05,s,false,'#1e140c'))});requestAnimationFrame(loop);return}
  /* 조판 틀(판): 위 가운데 */const L=LINES[round]||[];const cs=Math.min(64*u,(W-80)/Math.max(6,L.length));const fw=cs*L.length+24,fh=cs+24,fx=W/2-fw/2+(shake?Math.sin(performance.now()/20)*6*shake:0),fy=Math.max(110,H*.2);
  q.fillStyle='#5a3a22';q.fillRect(fx-8,fy-8,fw+16,fh+16);q.fillStyle='#2b1d12';q.fillRect(fx,fy,fw,fh);
  /* 짤 글줄 안내(바로 선 글자, 흐리게) */for(let i=0;i<L.length;i++){const x=fx+12+i*cs+cs/2,y=fy+12+cs/2;if(i<set.length){q.fillStyle='#b08a50';q.fillRect(x-cs/2+3,y-cs/2+3,cs-6,cs-6);q.fillStyle='rgba(0,0,0,.25)';q.fillRect(x-cs/2+3,y+cs/2-9,cs-6,6);glyph(q,set[i],x,y,cs*.62,true,'#3b2414')}else{q.strokeStyle=i===pos?'#f2d27a':'rgba(242,210,122,.25)';q.lineWidth=i===pos?3:1.5;q.strokeRect(x-cs/2+4,y-cs/2+4,cs-8,cs-8);glyph(q,L[i],x,y,cs*.5,false,i===pos?'rgba(242,210,122,.85)':'rgba(242,210,122,.3)')}}
  q.fillStyle='#d8c8a0';q.font=`${14*u+2}px "Gowun Dodum",sans-serif`;q.textAlign='center';q.fillText('판에 짤 글줄(흐린 글자) · 노란 칸 글자를 찾아요',W/2,fy+fh+30);
  /* 인쇄: 종이를 눌러 찍고 바로 선 글씨가 드러남 */if(printT>=0){printT+=1/60;const p=Math.min(1,printT/1.4);const py=fy-8-(1-Math.min(1,p*2))*H*.2;q.fillStyle=`rgba(246,238,216,${Math.min(1,p*2)})`;q.fillRect(fx-14,py,fw+28,fh+16+Math.max(0,(p-.5))*80);
   if(p>.5){for(let i=0;i<L.length;i++)glyph(q,L[i],fx+12+i*cs+cs/2,py+12+cs/2,cs*.62,false,`rgba(30,20,12,${(p-.5)*2})`);q.fillStyle=`rgba(142,43,32,${(p-.5)*2})`;q.font=`${16*u+2}px "Do Hyeon",sans-serif`;q.fillText('찍혔어요! 바로 선 글씨',W/2,py+fh+16+40*(p-.5)*2-6)}
   if(printT>2.6){printT=-1;round++;if(round>=LINES.length){ended=true;const sec=(performance.now()-t0)/1000;const Q=Math.max(10,Math.min(100,Math.round(100-miss*6-Math.max(0,sec-45)*.6)));setTimeout(()=>{if(!alive)return;ctx.done('type',Q,'직지 활자 짜기');finishCard(ui,'직지 세 판을 다 찍었어요',Q>=75?'1377년 흥덕사 스님들처럼 활자를 짜서 찍었어요. 금속활자는 판을 풀면 다시 쓸 수 있었어요.':'뒤집힌 글자는 거울에 비친 모양이에요. 한 번 더 해 볼까요?',Q,close)},400)}else{deal();head()}}}
  /* 활자 상자 */const bx=g.tx-14,by=g.ty-14,bw=g.cols*(g.bs+10)+18,bh=g.rows*(g.bs+10)+18;q.fillStyle='#6b4a2e';q.fillRect(bx,by,bw,bh);q.fillStyle='#3b2414';q.fillRect(bx+6,by+6,bw-12,bh-12);
  for(const b of tray){const x=g.tx+(b.i%g.cols)*(g.bs+10),y=g.ty+Math.floor(b.i/g.cols)*(g.bs+10);b.wob=Math.max(0,b.wob-.05);const ox=b.wob?Math.sin(performance.now()/25)*5*b.wob:0;if(b.used){q.fillStyle='rgba(0,0,0,.35)';q.fillRect(x+4,y+4,g.bs-8,g.bs-8);continue}
   const gr=q.createLinearGradient(x,y,x+g.bs,y+g.bs);gr.addColorStop(0,'#a8875a');gr.addColorStop(.5,'#7a5c38');gr.addColorStop(1,'#4a3420');q.fillStyle=gr;q.fillRect(x+ox,y,g.bs,g.bs);q.strokeStyle='rgba(255,230,180,.35)';q.lineWidth=2;q.strokeRect(x+ox+2,y+2,g.bs-4,g.bs-4);
   glyph(q,b.c,x+ox+g.bs/2+1.5,y+g.bs/2+1.5,g.bs*.6,true,'rgba(0,0,0,.45)');glyph(q,b.c,x+ox+g.bs/2,y+g.bs/2,g.bs*.6,true,'#e8d2a0')}
  q.fillStyle='#d8c8a0';q.font=`${13*u+2}px "Gowun Dodum",sans-serif`;q.textAlign='center';q.fillText('활자 상자(글자가 뒤집혀 있어요)',W/2,by-10);
  q.textAlign='left';q.font='bold 16px "Gowun Dodum",sans-serif';q.fillStyle='#f2d27a';q.fillText(`${Math.min(round+1,3)} / 3판 · 틀림 ${miss}`,16,H-14);
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}
