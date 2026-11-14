/* 함께 걷기: 지금 접속한 사람들의 무이가 서로 보인다. 갱신 2026-11-14
   Supabase Realtime(브로드캐스트+프레즌스)만 쓴다. 표를 만들지 않으므로 아무것도 저장되지 않는다.
   마당(site)마다 방 하나 + 전체 방 하나(모든 마당 접속자 수). 이름·위치 말고는 보내지 않는다. */
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
 const drop=id=>{const o=others.get(id);if(!o)return;if(o.av)scene.remove(o.av.root);others.delete(id)};
 const room=sb.channel('muui3d-'+site,{config:{presence:{key:me},broadcast:{self:false,ack:false}}});
 room.on('broadcast',{event:'p'},({payload:p})=>{if(!p||p.i===me)return;const o=ensure(p.i,p);o.tx=p.x;o.ty=p.y;o.tz=p.z;o.ta=p.a;o.mv=p.m;o.rd=p.r;o.last=performance.now()});
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
   o.av.play(o.rd?'run':o.mv>3.5?'run':o.mv>.25?'walk':'idle',.25);o.av.mx.update(dt);
   if(now-o.last>30000)R.visible=false}};
 addEventListener('pagehide',()=>{try{room.untrack();sb.removeAllChannels()}catch(e){}});
 window.__NET={others,name,get here(){return here},get all(){return all}};
 return{tick,name}}
