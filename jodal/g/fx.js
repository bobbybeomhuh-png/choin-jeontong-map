/* 무이 나라 조달청: 「발밑과 물가」(퀄리티 P11). 만든 날 2026-11-17
   세상 엔진에 이미 있는 것: 바람 소리, 새소리, 발소리. 여기서 채우는 것:
   1 걸을 때 발밑 흙먼지(작은 흙빛 덩이가 피었다 사라짐), 물가·얕은 물에선 물보라(흰 물방울이 튀어 오름)
   2 물소리: 강·물가에 다가갈수록 커지는 흐르는 물 소리(즉석 합성, 배경음악 아님). 소리 끄기를 따름(엔진 AM 출력에 연결).
   setupFx(scene) 한 번. */
import * as THREE from 'three';
export function setupFx(scene){const H=window.__H3;if(!H||!scene||scene.userData.fx)return null;scene.userData.fx=1;
 const c=document.createElement('canvas');c.width=c.height=64;const q=c.getContext('2d');const g=q.createRadialGradient(32,32,2,32,32,30);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');q.fillStyle=g;q.fillRect(0,0,64,64);const PT=new THREE.CanvasTexture(c);
 const N=48,pool=[];for(let i=0;i<N;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:PT,transparent:true,depthWrite:false,opacity:0}));s.visible=false;scene.add(s);pool.push({s,t:1,life:1,vx:0,vy:0,vz:0,g:0,sz:.3})}let pi=0;
 const DUST=new THREE.Color(0xe8dcc0),SPL=new THREE.Color(0xe8f6ff);
 const emit=(x,y,z,wet)=>{const n=wet?3:1;for(let k=0;k<n;k++){const p=pool[pi=(pi+1)%N];p.s.visible=true;p.t=0;p.life=wet?.6:1.2;p.s.material.color.copy(wet?SPL:DUST);p.s.position.set(x+(Math.random()-.5)*.3,y+(wet?.1:.28),z+(Math.random()-.5)*.3);
   if(wet){p.vx=(Math.random()-.5)*1.4;p.vz=(Math.random()-.5)*1.4;p.vy=1.8+Math.random()*1.2;p.g=7;p.sz=.2}else{p.vx=(Math.random()-.5)*.3;p.vz=(Math.random()-.5)*.3;p.vy=.35;p.g=0;p.sz=.55+Math.random()*.25}}};
 let last=null,acc=0,lt=performance.now();
 /* 물소리 */let WG=null;const water=()=>{if(WG)return WG;try{const AC=H.__ac&&H.__ac();if(!AC||AC.state!=='running')return null;const AM=H.AM;if(!AM)return null;const n=AC.sampleRate*3|0,B=AC.createBuffer(1,n,AC.sampleRate),d=B.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;
   const s=AC.createBufferSource();s.buffer=B;s.loop=true;const bp=AC.createBiquadFilter();bp.type='bandpass';bp.frequency.value=900;bp.Q.value=.7;const lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2400;const lfo=AC.createOscillator(),lg=AC.createGain();lfo.frequency.value=.35;lg.gain.value=260;lfo.connect(lg).connect(bp.frequency);lfo.start();
   WG=AC.createGain();WG.gain.value=0;s.connect(bp).connect(lp).connect(WG).connect(AM);s.start();return WG}catch(e){return null}};
 let wetAcc=0;const tick=()=>{const now=performance.now(),dt=Math.min(.05,(now-lt)/1000);lt=now;const P=H.P;
  if(P){if(last){const dx=P.x-last.x,dz=P.z-last.z,v=Math.hypot(dx,dz)/Math.max(dt,1e-3);const ride=!!H.RIDE;if(v>1.2&&v<30&&Math.abs(P.y-last.y)<.2){acc+=dt;const every=ride?.06:.13;if(acc>every){acc=0;const wet=!!(window.__RIVER&&window.__RIVER(P.x,P.z));emit(P.x,P.y,P.z,wet)}}}last=last||new THREE.Vector3();last.copy(P);
   /* 물가 가까움: 둘레 여덟 곳 가운데 물인 곳 비율 */wetAcc+=dt;if(wetAcc>.4&&window.__RIVER){wetAcc=0;let w=0;for(let k=0;k<8;k++){const a=k/8*6.283;for(const r of[2,5,9])if(window.__RIVER(P.x+Math.cos(a)*r,P.z+Math.sin(a)*r))w+=r===2?1.6:r===5?1:.5}const G=water();if(G){const tgt=Math.min(.09,w*.0055);G.gain.setTargetAtTime(tgt,G.context.currentTime,.5)}}}
  for(const p of pool){if(!p.s.visible)continue;p.t+=dt;const k=p.t/p.life;if(k>=1){p.s.visible=false;continue}p.vy-=p.g*dt;p.s.position.x+=p.vx*dt;p.s.position.y+=p.vy*dt;p.s.position.z+=p.vz*dt;const sc=p.sz*(1+k*1.6);p.s.scale.set(sc,sc,1);p.s.material.opacity=(p.g?.9:.7)*(1-k*k)}
  requestAnimationFrame(tick)};tick();window.__FX={pool:N,live:()=>pool.filter(p=>p.s.visible).length};return true}
