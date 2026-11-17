/* 무이 나라 조달청: 「하늘 시간」(퀄리티 R4). 만든 날 2026-11-17
   낮 · 노을 · 달밤 세 가지. 위 막대의 「하늘」 단추로 돌아가며 바꾸고, 1.2초 동안 부드럽게 넘어간다.
   바뀌는 것: 하늘빛(지평선·꼭대기), 해 빛무리 / 달·별, 햇빛·하늘빛·주변빛 세기와 색, 안개 색·거리, 노출,
   고을 집 창호지 불빛(지도 worldmap 의 houseGlow), 광장 석등 불(lampGlow).
   밤 경비·연등 축제는 시작할 때 밝기를 기억했다가 끝나면 되돌리므로, 바꿀 때마다 그 기억(base/lbase)을 지워 새로 잡게 한다.
   놀이 창이 떠 있는 동안에는 바꾸지 않는다. ?tod=dusk|night 로 시작 시간 지정, window.__TOD('night') 로 바꿈. */
import * as THREE from 'three';
const C=h=>new THREE.Color(h);
const MODES={
 dusk:{cl:0xffc4a8,oth:.7,hemi:.4,hs:0xff9a70,hg:0x4a3040,amb:.1,sun:2.8,sc:0xff7a3a,fog:0xe0906a,near:140,far:540,exp:.95,hz:[1.0,.5,.26],zn:[.16,.17,.42],sunc:[1.,.5,.2],sund:[-.62,.1,.45],star:0,moon:0,win:.7,lamp:1.8,lab:'노을'},
 night:{cl:0x7684a6,oth:.25,hemi:.2,hs:0x4a62b0,hg:0x0c0a12,amb:.05,sun:.28,sc:0x9fb6ff,fog:0x141c34,near:90,far:430,exp:.85,hz:[.05,.08,.17],zn:[.004,.008,.03],sunc:[.0,.0,.0],sund:[-.5,.55,.45],star:1,moon:1,win:1.6,lamp:3.4,lab:'달밤'}};
const ORDER=['day','dusk','night'];
const SKY=['varying vec3 v;uniform vec3 uHz,uZn,uSunC,uSunD;uniform float uStar,uMoon;',
 'float h3(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,37.719)))*43758.5453);}',
 'void main(){vec3 dir=normalize(v);float h=clamp(dir.y,0.,1.);vec3 c=mix(uHz,uZn,pow(h,.55));c=mix(c,uHz*.9,smoothstep(.04,-.06,dir.y));',
 'float d=max(0.,dot(dir,normalize(uSunD)));c+=uSunC*(pow(d,90.)*1.4+pow(d,8.)*.22+pow(d,2.)*.12);',
 'vec3 g=floor(dir*170.);float s=h3(g);float st=step(.9962,s)*smoothstep(.02,.3,dir.y);c+=vec3(.9,.92,1.)*st*uStar*(.55+.45*fract(s*977.));',
 'float md=dot(dir,normalize(vec3(.35,.42,-.62)));c+=vec3(1.,.96,.82)*smoothstep(.99935,.99955,md)*uMoon*1.6+vec3(.35,.45,.8)*pow(max(md,0.),40.)*.18*uMoon;',
 'gl_FragColor=vec4(pow(max(c,0.),vec3(2.2))*1.15,1.);','#include <tonemapping_fragment>','#include <colorspace_fragment>','}'].join(String.fromCharCode(10));
export function setupTime(scene,R){if(!scene||!R||scene.userData.tod)return null;scene.userData.tod=1;
 let hemi=null,amb=null,sun=null,sky=null,glow=[],lamp=null,cloud=null;const oth=[];
 scene.traverse(o=>{if(o.isHemisphereLight&&!hemi)hemi=o;else if(o.isAmbientLight&&!amb)amb=o;else if(o.isDirectionalLight&&o.castShadow&&!sun)sun=o;
  else if(o.isMesh&&o.geometry&&o.geometry.parameters&&o.geometry.parameters.radius===600&&o.material&&o.material.isShaderMaterial)sky=o.material;
  if(o.userData&&o.userData.houseGlow)glow=glow.concat(o.userData.houseGlow);if(o.userData&&o.userData.houseGlow2)glow=glow.concat(o.userData.houseGlow2);if(o.userData&&o.userData.lampGlow)lamp=o.userData.lampGlow;if(o.userData&&o.userData.cloudMat)cloud=o.userData.cloudMat});
 if(!hemi||!sun)return null;scene.traverse(o=>{if((o.isDirectionalLight||o.isHemisphereLight||o.isAmbientLight)&&o!==hemi&&o!==amb&&o!==sun&&!o.userData.night&&!o.userData.lantern)oth.push([o,o.intensity])});
 const SH=C(0xd9e6ee),SZ=C(0x4f8fd6);
 const day={hemi:hemi.intensity,hs:hemi.color.getHex(),hg:hemi.groundColor.getHex(),amb:amb?amb.intensity:0,sun:sun.intensity,sc:sun.color.getHex(),fog:scene.fog?scene.fog.color.getHex():0xc9dbe6,near:scene.fog?scene.fog.near:150,far:scene.fog?scene.fog.far:620,exp:R.toneMappingExposure,
  oth:1,cl:0xffffff,hz:[SH.r,SH.g,SH.b],zn:[SZ.r,SZ.g,SZ.b],sunc:[1.,.86,.62],sund:[-.5,.55,.45],star:0,moon:0,win:0,lamp:1,lab:'낮'};MODES.day=day;
 const U={uHz:{value:new THREE.Vector3(...day.hz)},uZn:{value:new THREE.Vector3(...day.zn)},uSunC:{value:new THREE.Vector3(...day.sunc)},uSunD:{value:new THREE.Vector3(...day.sund)},uStar:{value:0},uMoon:{value:0}};
 if(sky){Object.assign(sky.uniforms,U);sky.fragmentShader=SKY;sky.needsUpdate=true}
 const lampBase=lamp?lamp.color.clone():null;
 let cur='day',from=null,to=day,t=1;const st={};
 const lerpN=(a,b,k)=>a+(b-a)*k,lerpC=(a,b,k)=>C(a).lerp(C(b),k),lerpV=(a,b,k)=>a.map((x,i)=>x+(b[i]-x)*k);
 const put=(m)=>{if(cloud&&m.clC)cloud.color.copy(m.clC);for(const[o,b]of oth)o.intensity=b*m.oth;hemi.intensity=m.hemi;hemi.color.copy(m.hsC);hemi.groundColor.copy(m.hgC);if(amb)amb.intensity=m.amb;sun.intensity=m.sun;sun.color.copy(m.scC);
  if(scene.fog){scene.fog.color.copy(m.fogC);scene.fog.near=m.near;scene.fog.far=m.far}R.toneMappingExposure=m.exp;
  U.uHz.value.set(...m.hz);U.uZn.value.set(...m.zn);U.uSunC.value.set(...m.sunc);U.uSunD.value.set(...m.sund);U.uStar.value=m.star;U.uMoon.value=m.moon;
  for(const g of glow){g.emissive.setRGB(1,.72,.38);g.emissiveIntensity=m.win}if(lamp&&lampBase)lamp.color.copy(lampBase).multiplyScalar(m.lamp)};
 const mix=(a,b,k)=>({clC:lerpC(a.cl,b.cl,k),oth:lerpN(a.oth,b.oth,k),hemi:lerpN(a.hemi,b.hemi,k),hsC:lerpC(a.hs,b.hs,k),hgC:lerpC(a.hg,b.hg,k),amb:lerpN(a.amb,b.amb,k),sun:lerpN(a.sun,b.sun,k),scC:lerpC(a.sc,b.sc,k),fogC:lerpC(a.fog,b.fog,k),near:lerpN(a.near,b.near,k),far:lerpN(a.far,b.far,k),exp:lerpN(a.exp,b.exp,k),
  hz:lerpV(a.hz,b.hz,k),zn:lerpV(a.zn,b.zn,k),sunc:lerpV(a.sunc,b.sunc,k),sund:lerpV(a.sund,b.sund,k),star:lerpN(a.star,b.star,k),moon:lerpN(a.moon,b.moon,k),win:lerpN(a.win,b.win,k),lamp:lerpN(a.lamp,b.lamp,k)});
 let last=performance.now();const tick=()=>{const now=performance.now(),dt=(now-last)/1000;last=now;if(t<1&&from){t=Math.min(1,t+dt/1.2);const k=t*t*(3-2*t);put(mix(from,to,k))}requestAnimationFrame(tick)};tick();
 const busy=()=>!!document.querySelector('.jd-ov,body>div[data-mg]');
 const snap=()=>({cl:cloud?cloud.color.getHex():0xffffff,oth:from&&t<1?lerpN(from.oth,to.oth,t):to.oth,hemi:hemi.intensity,hs:hemi.color.getHex(),hg:hemi.groundColor.getHex(),amb:amb?amb.intensity:0,sun:sun.intensity,sc:sun.color.getHex(),fog:scene.fog?scene.fog.color.getHex():day.fog,near:scene.fog?scene.fog.near:day.near,far:scene.fog?scene.fog.far:day.far,exp:R.toneMappingExposure,
  hz:U.uHz.value.toArray(),zn:U.uZn.value.toArray(),sunc:U.uSunC.value.toArray(),sund:U.uSunD.value.toArray(),star:U.uStar.value,moon:U.uMoon.value,win:glow[0]?glow[0].emissiveIntensity:0,lamp:to.lamp});
 const set=(name,instant)=>{if(!MODES[name])return cur;/* 마을(villages)은 늦게 세워지므로 바꿀 때마다 불빛 대상을 다시 모음 */{const G2=[];scene.traverse(o=>{if(o.userData&&o.userData.houseGlow)G2.push(...o.userData.houseGlow);if(o.userData&&o.userData.houseGlow2)G2.push(...o.userData.houseGlow2)});if(G2.length)glow=G2}if(busy()&&!instant)return cur;from=instant?MODES[name]:snap();to=MODES[name];t=instant?1:0;if(instant)put(mix(to,to,1));cur=name;
  scene.traverse(o=>{if(o.isLight&&o.userData){delete o.userData.base;delete o.userData.lbase}});if(btn)btn.textContent='하늘: '+to.lab;return cur};
 let btn=null;const addBtn=()=>{const top=document.getElementById('top');if(!top){setTimeout(addBtn,400);return}if(document.getElementById('jd-tod'))return;btn=document.createElement('button');btn.id='jd-tod';btn.className='btn';btn.textContent='하늘: 낮';btn.title='낮 · 노을 · 달밤';
  btn.onclick=()=>{set(ORDER[(ORDER.indexOf(cur)+1)%ORDER.length])};top.appendChild(btn)};addBtn();
 window.__TOD=(n,inst)=>n?set(n,inst):cur;
 const q=(location.search.match(/[?&]tod=(dusk|night|day)/)||[])[1];if(q&&q!=='day')set(q,true);
 return{set}}
