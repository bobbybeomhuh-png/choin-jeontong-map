/* 무이 나라 조달청: 곁놀이 장소 소리(G46). 만든 날 2026-11-17
   배경음악 없이 효과음만(원칙): 장소마다 아주 작은 바탕 소리와 가끔 나는 소리.
   'hall' 관아 안 웅성임과 가끔 붓·종이 소리, 'site' 공사장 바람과 가끔 망치 소리, 'market' 장터 웅성임과 가끔 엽전 소리, 'yard' 바깥 바람과 가끔 새소리.
   startAmb(ctx, kind) → stop(). ctx 는 곁놀이 ctx(ac(), out()). 소리를 못 내는 환경이면 아무 일도 안 함. */
export function startAmb(ctx,kind){let a=null,out=null;try{a=ctx.ac();out=ctx.out()}catch(e){}if(!a||!out)return()=>{};
 const master=a.createGain();master.gain.value=0;master.connect(out);master.gain.linearRampToValueAtTime(1,a.currentTime+1.2);
 const noise=(sec=2)=>{const b=a.createBuffer(1,a.sampleRate*sec,a.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return b};
 const bed=(f,q,vol,type='bandpass')=>{const s=a.createBufferSource();s.buffer=noise(3);s.loop=true;const fl=a.createBiquadFilter();fl.type=type;fl.frequency.value=f;fl.Q.value=q;const g=a.createGain();g.gain.value=vol;s.connect(fl);fl.connect(g);g.connect(master);s.start();
  /* 웅성임 느낌: 천천히 오르내림 */const lfo=a.createOscillator(),lg=a.createGain();lfo.frequency.value=.23;lg.gain.value=vol*.5;lfo.connect(lg);lg.connect(g.gain);lfo.start();return[s,lfo]};
 const tone=(f,d,v,t=0,type='sine')=>{const o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.value=f;const t0=a.currentTime+t;g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(v,t0+.01);g.gain.exponentialRampToValueAtTime(.0001,t0+d);o.connect(g);g.connect(master);o.start(t0);o.stop(t0+d+.05)};
 const tap=(f,v,t=0,q=2)=>{const s=a.createBufferSource();s.buffer=noise(.2);const fl=a.createBiquadFilter();fl.type='bandpass';fl.frequency.value=f;fl.Q.value=q;const g=a.createGain();const t0=a.currentTime+t;g.gain.setValueAtTime(v,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+.12);s.connect(fl);fl.connect(g);g.connect(master);s.start(t0)};
 const nodes=[];let timer=null;const every=(ms,fn)=>{const go=()=>{try{fn()}catch(e){}timer=setTimeout(go,ms*(.6+Math.random()*.8))};timer=setTimeout(go,ms*.5)};
 /* 11/20 녹음(CC0)이 있으면 쉿 소리 바탕 대신 실제 새·바람과 종이·망치·엽전 소리로 */const S=window.__SFX,L=[];const sx=(k,v,t=0)=>S&&S.sfx(a,master,k,{vol:v,at:t});
 if(S){if(kind==='hall'){every(5200,()=>sx('paper',.22))}else if(kind==='site'){L.push(S.ambLoop(a,master,'wind',.14));every(2600,()=>{for(let i=0;i<2+(Math.random()*2|0);i++)sx('nail',.32,i*.34)})}
  else if(kind==='market'){L.push(S.ambLoop(a,master,'birds',.08));every(3600,()=>sx('coin',.22))}else{L.push(S.ambLoop(a,master,'birds',.22),S.ambLoop(a,master,'wind',.08))}nodes.push(...L.map(l=>({stop:()=>l.stop()})))}
 else if(kind==='hall'){nodes.push(...bed(420,.8,.018));every(5200,()=>{tap(3200,.05);tap(2600,.035,.09)})}
 else if(kind==='site'){nodes.push(...bed(300,.5,.012,'lowpass'));every(2600,()=>{for(let i=0;i<2+(Math.random()*2|0);i++){tap(900,.09,i*.32,3);tone(220,.09,.035,i*.32,'triangle')}})}
 else if(kind==='market'){nodes.push(...bed(520,.7,.024));every(3600,()=>{tone(1568,.14,.03);tone(2093,.18,.025,.06)})}
 else{nodes.push(...bed(800,.4,.008,'lowpass'));every(4200,()=>{const f=2400+Math.random()*900;for(let i=0;i<3;i++)tone(f+(i%2?300:0),.09,.025,i*.11)})}
 let stopped=false;return()=>{if(stopped)return;stopped=true;clearTimeout(timer);try{master.gain.cancelScheduledValues(a.currentTime);master.gain.setValueAtTime(master.gain.value,a.currentTime);master.gain.linearRampToValueAtTime(0,a.currentTime+.4)}catch(e){}setTimeout(()=>{for(const n of nodes)try{n.stop()}catch(e){}try{master.disconnect()}catch(e){}},600)}}
