/* 무이 월드 공용 효과음(배경음악 아님): 엽전 짤랑, 단추 톡, 장 완성 가락, 유산 마당별 환경음.
   모두 Web Audio로 즉석 합성(파일 없음). ac=AudioContext, out=그 페이지의 효과음 출력 노드. 갱신 2026-11-14 */
const env=(ac,g,t0,a,peak,d)=>{g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(peak,t0+a);g.gain.exponentialRampToValueAtTime(.0001,t0+a+d)};
export function coinChime(ac,out,at=0){if(!ac||!out)return;const t=ac.currentTime+at;[[1568,0],[2093,.07],[2637,.15]].forEach(([f,dt])=>{const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=f;env(ac,g,t+dt,.005,.11,.32);o.connect(g).connect(out);o.start(t+dt);o.stop(t+dt+.4)});const o2=ac.createOscillator(),g2=ac.createGain();o2.type='square';o2.frequency.value=4200;env(ac,g2,t,.002,.025,.05);o2.connect(g2).connect(out);o2.start(t);o2.stop(t+.08)}
export function uiTick(ac,out){if(!ac||!out)return;const t=ac.currentTime,o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.setValueAtTime(1150,t);o.frequency.exponentialRampToValueAtTime(760,t+.04);env(ac,g,t,.003,.05,.05);o.connect(g).connect(out);o.start(t);o.stop(t+.08)}
/* 장 완성: 궁상각치우 다섯 음이 올라가고 마지막에 화음 */
export function fanfare(ac,out,at=0){if(!ac||!out)return;const t=ac.currentTime+at;const N=[523.25,587.33,659.25,783.99,880];N.forEach((f,i)=>{const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=f;env(ac,g,t+i*.12,.01,.1,.35);o.connect(g).connect(out);o.start(t+i*.12);o.stop(t+i*.12+.4)});[523.25,659.25,783.99,1046.5].forEach(f=>{const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.value=f;env(ac,g,t+.66,.02,.07,1.4);o.connect(g).connect(out);o.start(t+.66);o.stop(t+2.2)})}
/* 먼 절 종소리 한 번 */
export function templeBell(ac,out,v=.05,at=0){if(!ac||!out)return;const t=ac.currentTime+at;[[98,1],[196,.6],[294,.35],[412,.2],[523,.12]].forEach(([f,k])=>{const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.value=f;o.detune.value=(Math.random()-.5)*8;env(ac,g,t,.02,v*k,6.5);o.connect(g).connect(out);o.start(t);o.stop(t+7)})}
const SEA=['geobukseon','tongyeong','worldmap'],TEMPLE=['seokguram','hapcheon','yesan','yeongju'],KILN=['icheon','mungyeong','gangjin'];
/* 유산 마당별 환경음 시작. NB=노이즈 버퍼(있으면 재사용). 멈추는 함수를 돌려준다 */
export function siteAmb(ac,out,site,NB){if(!ac||!out)return()=>{};const stops=[];
 const noise=()=>{if(NB)return NB;const n=ac.sampleRate*3|0,b=ac.createBuffer(1,n,ac.sampleRate),c=b.getChannelData(0);for(let i=0;i<n;i++)c[i]=Math.random()*2-1;return b};
 if(SEA.includes(site)){const s=ac.createBufferSource();s.buffer=noise();s.loop=true;const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=520;const g=ac.createGain();g.gain.value=.035;const l=ac.createOscillator(),lg=ac.createGain();l.frequency.value=.11;lg.gain.value=.03;l.connect(lg).connect(g.gain);s.connect(f).connect(g).connect(out);s.start();l.start();stops.push(()=>{try{s.stop();l.stop()}catch(e){}})}
 if(TEMPLE.includes(site)){let alive=true;const ring=()=>{if(!alive)return;templeBell(ac,out,.035);setTimeout(ring,38000+Math.random()*24000)};const t0=setTimeout(ring,9000);stops.push(()=>{alive=false;clearTimeout(t0)})}
 if(KILN.includes(site)){let alive=true;const nb=noise();const crack=()=>{if(!alive)return;const s=ac.createBufferSource();s.buffer=nb;const f=ac.createBiquadFilter();f.type='bandpass';f.frequency.value=1800+Math.random()*1800;f.Q.value=3;const g=ac.createGain(),t=ac.currentTime;env(ac,g,t,.002,.04+Math.random()*.03,.05);s.connect(f).connect(g).connect(out);s.start(t,Math.random()*2,.08);setTimeout(crack,90+Math.random()*420)};crack();stops.push(()=>{alive=false})}
 return()=>stops.forEach(f=>f())}
/* 엽전이 생기면 coin.js가 'muui-coin' 이벤트를 보낸다. 페이지는 이걸로 짤랑 소리를 낸다 */
export function bindCoinSound(getAC){addEventListener('muui-coin',()=>{try{const[a,o]=getAC();coinChime(a,o)}catch(e){}})}
/* 단추를 누르면 작은 톡 소리 */
export function bindUiTick(getAC){document.addEventListener('pointerdown',e=>{const b=e.target&&e.target.closest&&e.target.closest('button,.btn,a.btn');if(!b)return;try{const[a,o]=getAC();uiTick(a,o)}catch(err){}},true)}
