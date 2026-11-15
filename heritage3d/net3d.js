/* 함께 걷기: 지금 접속한 사람들의 무이가 서로 보인다. 갱신 2026-11-15 (인사 몸짓, 정해진 말풍선)
   Supabase Realtime(브로드캐스트+프레즌스)만 쓴다. 표를 만들지 않으므로 아무것도 저장되지 않는다.
   마당(site)마다 방 하나 + 전체 방 하나(모든 마당 접속자 수). 이름·위치·몸짓 번호·정해진 문구 번호 말고는 보내지 않는다.
   자유 글쓰기는 욕설·개인정보 위험이 있어 넣지 않는다(문구는 아래 SAYS 중에서만 고름). */
import {SB} from './trk3d.js';
const LIB='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm';
const ADJ=['씩씩한','느긋한','반짝이는','수줍은','부지런한','졸린','신난','꼼꼼한','용감한','다정한'];
export function myName(){let n=null;try{n=localStorage.getItem('muui3d-name')}catch(e){}if(!n){n=ADJ[(Math.random()*ADJ.length)|0]+' 무이 '+(100+((Math.random()*900)|0));try{localStorage.setItem('muui3d-name',n)}catch(e){}}return n}
export async function initNet({site,THREE,scene,makeMuui,ui}){
 if(/[?&]solo\b/.test(location.search))return null;
 let createClient;try{({createClient}=await import(LIB))}catch(e){console.warn('함께 걷기 불러오기 실패',e);return null}
 const sb=createClient(SB.url,SB.key,{auth:{persistSession:false},realtime:{params:{eventsPerSecond:12}}});
 const me=SB.sid+'-'+Math.random().toString(36).slice(2,6),name=myName();let kind='base';try{kind=localStorage.getItem('muui3d-kind')||'base'}catch(e){}
 const others=new Map();/* id → {av,label,tx,ty,tz,ta,mv,last,loading} */
 const tag=(t)=>{const c=document.createElement('canvas');c.width=256;c.height=64;const q=c.getContext('2d');q.font='bold 30px "Do Hyeon",sans-serif';const w=Math.min(250,q.measureText(t).width+28);q.fillStyle='rgba(30,20,12,.82)';q.beginPath();q.roundRect((256-w)/2,6,w,50,24);q.fill();q.fillStyle='#fff4dc';q.textAlign='center';q.fillText(t,128,42);const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;const s=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,depthTest:false,transparent:true}));s.scale.set(1.6,.4,1);s.renderOrder=9;return s};
 const ensure=(id,meta)=>{let o=others.get(id);if(o)return o;o={av:null,label:null,tx:0,ty:-999,tz:0,ta:0,mv:0,last:performance.now(),loading:true,n:meta&&meta.n||'무이',k:meta&&meta.k||'base'};others.set(id,o);
  makeMuui(o.k,1.45).catch(()=>makeMuui('base',1.45)).then(av=>{if(!others.has(id)){scene.remove(av.root);return}o.av=av;av.play('idle',0);o.label=tag(o.n);o.label.position.y=2.05;av.root.add(o.label);av.root.position.set(o.tx,o.ty,o.tz);av.root.visible=o.ty>-900;o.loading=false});return o};
 /* 인사 몸짓과 정해진 말풍선(번호로만 주고받음) */
 const GES=[['wave','👋 손 흔들기',2.4],['bow','🙇 인사',2],['keunjeol','🙏 큰절',3.2],['dance','💃 춤',4],['clap','👏 박수',2.4],['cheer','🙌 만세',2.4]];
 const SAYS=['안녕하세요!','반가워요!','같이 가요!','멋지다!','고마워요!','또 만나요!'];
 const bubble=(t)=>{const c=document.createElement('canvas');c.width=320;c.height=88;const q=c.getContext('2d');q.font='bold 32px "Do Hyeon",sans-serif';const w=Math.min(310,q.measureText(t).width+36);q.fillStyle='#fffaf0';q.strokeStyle='#3b2a1c';q.lineWidth=4;q.beginPath();q.roundRect((320-w)/2,6,w,58,22);q.fill();q.stroke();q.beginPath();q.moveTo(150,62);q.lineTo(160,80);q.lineTo(172,62);q.fill();q.fillStyle='#2b1d12';q.textAlign='center';q.fillText(t,160,46);const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,depthTest:false,transparent:true}));sp.scale.set(2,.55,1);sp.renderOrder=10;return sp};
 const showSay=(root,t,y=2.55)=>{if(!root)return;if(root.userData.say){root.remove(root.userData.say)}const b=bubble(t);b.position.y=y;root.add(b);root.userData.say=b;clearTimeout(root.userData.sayT);root.userData.sayT=setTimeout(()=>{root.remove(b);if(root.userData.say===b)root.userData.say=null},4500)};
 const drop=id=>{const o=others.get(id);if(!o)return;if(o.av)scene.remove(o.av.root);others.delete(id)};
 const room=sb.channel('muui3d-'+site,{config:{presence:{key:me},broadcast:{self:false,ack:false}}});
 room.on('broadcast',{event:'p'},({payload:p})=>{if(!p||p.i===me)return;const o=ensure(p.i,p);o.tx=p.x;o.ty=p.y;o.tz=p.z;o.ta=p.a;o.mv=p.m;o.rd=p.r;o.last=performance.now()});
 room.on('broadcast',{event:'g'},({payload:p})=>{if(!p||p.i===me)return;const o=others.get(p.i);if(!o)return;if(typeof p.g==='number'&&GES[p.g]){o.ges=GES[p.g][0];o.gesT=GES[p.g][2]}if(typeof p.s==='number'&&SAYS[p.s]&&o.av)showSay(o.av.root,SAYS[p.s],2.6);o.last=performance.now()});
 /* 복원 소식: 같은 마당 사람이 유물을 복원하면 알림(이름은 정해진 유물 목록에서만 찾음) */
 room.on('broadcast',{event:'r'},({payload:p})=>{if(!p||p.i===me)return;const nm=(window.__ARTN||{})[p.k];if(!nm)return;const o=others.get(p.i);const who=String(o&&o.n||'무이').replace(/[<>&"]/g,'').slice(0,12);try{window.__H3.say(`${who}님이 ${nm} 복원을 해냈어요! ✦`,4);if(o&&o.av){o.ges='cheer';o.gesT=2}}catch(e){}});
 window.__NETR=k=>{try{room.send({type:'broadcast',event:'r',payload:{i:me,k}}).catch(()=>{})}catch(e){}};
 room.on('presence',{event:'sync'},()=>{const st=room.presenceState();const ids=new Set(Object.keys(st));for(const id of [...others.keys()])if(!ids.has(id))drop(id);for(const id of ids){if(id===me)continue;const m=st[id][0];ensure(id,m)}here=ids.size;show()});
 room.subscribe(s=>{if(s==='SUBSCRIBED')room.track({n:name,k:kind})});
 let here=1,all=1;const show=()=>{try{ui&&ui.setNet(all,here)}catch(e){}};
 const lobby=sb.channel('muui3d-all',{config:{presence:{key:me}}});lobby.on('presence',{event:'sync'},()=>{all=Object.keys(lobby.presenceState()).length;show()});lobby.subscribe(s=>{if(s==='SUBSCRIBED')lobby.track({s:site})});
 let lastSend=0,lx=0,lz=0,la=0;
 const tick=(dt,P,yaw,speed,ride)=>{const now=performance.now();
  if(now-lastSend>(speed>.1?160:2000)&&(Math.abs(P.x-lx)+Math.abs(P.z-lz)+Math.abs(yaw-la)>.03||now-lastSend>2000)){lastSend=now;lx=P.x;lz=P.z;la=yaw;room.send({type:'broadcast',event:'p',payload:{i:me,n:name,k:kind,x:+P.x.toFixed(2),y:+P.y.toFixed(2),z:+P.z.toFixed(2),a:+yaw.toFixed(2),m:+speed.toFixed(1),r:ride?1:0}}).catch(()=>{})}
  for(const [id,o] of others){if(!o.av)continue;const R=o.av.root;if(o.ty<-900){R.visible=false;continue}R.visible=true;const k=Math.min(1,dt*8);
   if(R.position.distanceTo({x:o.tx,y:o.ty,z:o.tz})>25)R.position.set(o.tx,o.ty,o.tz);else{R.position.x+=(o.tx-R.position.x)*k;R.position.y+=(o.ty-R.position.y)*k;R.position.z+=(o.tz-R.position.z)*k}
   let d=o.ta-R.rotation.y;d=Math.atan2(Math.sin(d),Math.cos(d));R.rotation.y+=d*k;
   if(o.gesT>0&&o.mv<=.25){o.gesT-=dt;o.av.play(o.ges,.25)}else{o.gesT=0;o.av.play(o.rd?'run':o.mv>3.5?'run':o.mv>.25?'walk':'idle',.25)}o.av.mx.update(dt);
   if(now-o.last>30000)R.visible=false}};
 /* 인사 단추(윗줄): 몸짓 여섯, 말풍선 여섯 */
 {const css=document.createElement('style');css.textContent='#greetP{position:fixed;left:50%;transform:translateX(-50%);top:calc(env(safe-area-inset-top) + 64px);z-index:30;background:rgba(22,16,11,.95);border:2px solid #d8a838;border-radius:16px;padding:10px;width:min(420px,94vw);display:grid;grid-template-columns:repeat(3,1fr);gap:6px}#greetP b{grid-column:1/-1;color:#f2d27a;font:17px "Do Hyeon",sans-serif}#greetP button{font:15px "Do Hyeon",sans-serif;border-radius:10px;border:1px solid #6b5132;background:#3b2a1c;color:#f3ead6;cursor:pointer;padding:8px 4px}#greetP button.s{background:#fffaf0;color:#2b1d12}';document.head.appendChild(css);
  const pn=document.createElement('div');pn.id='greetP';pn.hidden=true;pn.innerHTML='<b>몸짓 (함께 걷는 사람에게도 보여요)</b>'+GES.map((g,i)=>`<button type="button" data-g="${i}">${g[1]}</button>`).join('')+'<b>말풍선</b>'+SAYS.map((t,i)=>`<button type="button" class="s" data-s="${i}">${t}</button>`).join('');document.body.appendChild(pn);
  let cool=0;pn.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const now=performance.now();if(now<cool)return;cool=now+1200;const H=window.__H3;const pay={i:me};if(b.dataset.g!=null){const g=GES[+b.dataset.g];pay.g=+b.dataset.g;try{H.act(g[0],g[2])}catch(e){}}if(b.dataset.s!=null){pay.s=+b.dataset.s;try{showSay(H.me.root,SAYS[pay.s],2.55)}catch(e){}}pn.hidden=true;room.send({type:'broadcast',event:'g',payload:pay}).catch(()=>{})});
  const add=()=>{const ref=document.getElementById('bStamp');if(!ref){setTimeout(add,500);return}const gb=document.createElement('button');gb.className='btn';gb.type='button';gb.id='bGreet';gb.textContent='인사';gb.title='몸짓과 말풍선 (G)';ref.parentNode.insertBefore(gb,ref);gb.addEventListener('click',()=>{pn.hidden=!pn.hidden})};add();
  addEventListener('keydown',e=>{if(e.code==='KeyG'&&!/INPUT|TEXTAREA/.test((e.target&&e.target.tagName)||''))pn.hidden=!pn.hidden})}
 addEventListener('pagehide',()=>{try{room.untrack();sb.removeAllChannels()}catch(e){}});
 window.__NET={others,name,get here(){return here},get all(){return all}};
 return{tick,name}}
