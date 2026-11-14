/* 화면 마감(질감 올리기): 그림 없이 색만 있는 재질에 세계 좌표 삼면 투영으로 결을 입힌다.
   색을 보고 나뭇결(붉은·갈색 나무), 회벽(밝은 벽), 돌(회색), 흙·천(그 밖)을 고른다. 하늘빛 환경광도 넣는다.
   유산 마당·무이 월드·발굴 터가 함께 쓴다. 파일 없이 캔버스로 즉석 생성. 갱신 2026-11-14 */
import * as THREE from 'three';
const rnd=(s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296})(1114);
function canvasTex(W,H,fn){const c=document.createElement('canvas');c.width=W;c.height=H;const q=c.getContext('2d');fn(q,W,H);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.colorSpace=THREE.NoColorSpace;t.anisotropy=8;t.generateMipmaps=true;return t}
/* 0.5 언저리 회색 밝기 지도(곱하면 밝기만 흔들림) */
const g=(v,a=1)=>`rgba(${v|0},${v|0},${v|0},${a})`;
let T=null;function texes(){if(T)return T;
 /* 나뭇결: 세로로 흐르는 결, 옹이, 갈라짐 */
 const wood=canvasTex(256,512,(q,W,H)=>{q.fillStyle=g(128);q.fillRect(0,0,W,H);for(let i=0;i<220;i++){const x=rnd()*W,w=1+rnd()*3,v=96+rnd()*70;q.strokeStyle=g(v,.55);q.lineWidth=w;q.beginPath();q.moveTo(x,0);let xx=x;for(let y=0;y<=H;y+=32){xx+=(rnd()-.5)*3;q.lineTo(xx,y)}q.stroke()}
  for(let i=0;i<5;i++){const x=rnd()*W,y=rnd()*H;for(let k=6;k>0;k--){q.strokeStyle=g(70+k*10,.5);q.lineWidth=1.5;q.beginPath();q.ellipse(x,y,k*2.4,k*6,0,0,7);q.stroke()}}
  for(let i=0;i<14;i++){const x=rnd()*W,y=rnd()*H;q.strokeStyle=g(50,.5);q.lineWidth=1;q.beginPath();q.moveTo(x,y);q.lineTo(x+(rnd()-.5)*3,y+20+rnd()*60);q.stroke()}});
 /* 회벽: 흙손 자국, 얼룩, 아래쪽 때 */
 const plaster=canvasTex(512,512,(q,W,H)=>{q.fillStyle=g(134);q.fillRect(0,0,W,H);for(let i=0;i<900;i++){const x=rnd()*W,y=rnd()*H,r=4+rnd()*26;const v=118+rnd()*34;const gr=q.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,g(v,.35));gr.addColorStop(1,g(v,0));q.fillStyle=gr;q.fillRect(x-r,y-r,r*2,r*2)}
  for(let i=0;i<5000;i++){q.fillStyle=g(rnd()<.5?100:160,.25);q.fillRect(rnd()*W,rnd()*H,1.5,1.5)}for(let i=0;i<30;i++){q.strokeStyle=g(105,.25);q.lineWidth=1;q.beginPath();const x=rnd()*W,y=rnd()*H;q.moveTo(x,y);q.lineTo(x+(rnd()-.5)*40,y+(rnd()-.5)*40);q.stroke()}});
 /* 돌: 알갱이, 얼룩, 이끼 낀 듯 어두운 점 */
 const stone=canvasTex(512,512,(q,W,H)=>{q.fillStyle=g(130);q.fillRect(0,0,W,H);for(let i=0;i<600;i++){const x=rnd()*W,y=rnd()*H,r=6+rnd()*40,v=104+rnd()*50;const gr=q.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,g(v,.3));gr.addColorStop(1,g(v,0));q.fillStyle=gr;q.fillRect(x-r,y-r,r*2,r*2)}
  for(let i=0;i<14000;i++){const v=rnd()<.5?70:200;q.fillStyle=g(v,.35);q.fillRect(rnd()*W,rnd()*H,1+rnd()*1.5,1+rnd()*1.5)}});
 /* 흙·천·그 밖: 고운 얼룩 */
 const soft=canvasTex(256,256,(q,W,H)=>{q.fillStyle=g(130);q.fillRect(0,0,W,H);for(let i=0;i<500;i++){const x=rnd()*W,y=rnd()*H,r=4+rnd()*20,v=112+rnd()*36;const gr=q.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,g(v,.3));gr.addColorStop(1,g(v,0));q.fillStyle=gr;q.fillRect(x-r,y-r,r*2,r*2)}for(let i=0;i<4000;i++){q.fillStyle=g(rnd()<.5?100:165,.22);q.fillRect(rnd()*W,rnd()*H,1.2,1.2)}});
 /* 흙 알갱이: 아주 고운 자갈(가까이서 보이는 결) */
 const soil=canvasTex(256,256,(q,W,H)=>{q.fillStyle=g(128);q.fillRect(0,0,W,H);for(let i=0;i<2600;i++){const v=rnd()<.5?84+rnd()*30:170+rnd()*40,r=.6+rnd()*2.2;q.fillStyle=g(v,.6);q.beginPath();q.ellipse(rnd()*W,rnd()*H,r,r*(.6+rnd()*.4),rnd()*3,0,7);q.fill()}});
 /* 숲 우듬지: 둥근 나무 머리가 빽빽 */
 const forest=canvasTex(512,512,(q,W,H)=>{q.fillStyle=g(82);q.fillRect(0,0,W,H);/* 우듬지 크기: 무늬 한 장=약 20m, 나무 머리 지름 1~3m(예전엔 너무 작아 거품처럼 보였음) */for(let i=0;i<420;i++){const x=rnd()*W,y=rnd()*H,r=14+rnd()*26;for(const dx of[-W,0,W])for(const dy of[-H,0,H]){const gr=q.createRadialGradient(x+dx-r*.3,y+dy-r*.35,1,x+dx,y+dy,r);gr.addColorStop(0,g(190+rnd()*40));gr.addColorStop(.7,g(120));gr.addColorStop(1,g(60,.9));q.fillStyle=gr;q.beginPath();q.arc(x+dx,y+dy,r,0,7);q.fill()}}});
 return T={wood,plaster,stone,soft,soil,forest}}
/* 색으로 종류 고르기 */
function kindOf(c){const h={};c.getHSL(h);if(h.l<.06)return null;if(h.s>.18&&(h.h<.11||h.h>.95)&&h.l<.62)return 'wood';if(h.l>.7&&h.s<.4)return 'plaster';if(h.s<.16)return 'stone';if(h.h>.11&&h.h<.17&&h.s>.2)return 'wood';return 'soft'}
/* 종류별: 무늬 크기(m당 반복), 세기, 거칠기 흔들림 */
const P={soil:{sc:1.1,amt:.55,rv:.2,ax:0,flat:1},forest:{sc:.05,amt:.75,rv:.1,ax:0,flat:1},wood:{sc:.55,amt:.8,rv:.3,ax:1},plaster:{sc:.22,amt:.45,rv:.15,ax:0},stone:{sc:.35,amt:.75,rv:.25,ax:0},soft:{sc:.4,amt:.45,rv:.15,ax:0}};
function patch(m,k){const t=texes()[k],p=P[k];m.userData.fin=k;
 m.onBeforeCompile=sh=>{sh.uniforms.uDet={value:t};sh.uniforms.uSc={value:p.sc};sh.uniforms.uAmt={value:p.amt};sh.uniforms.uRv={value:p.rv};sh.uniforms.uGY={value:GY};
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vFWP;varying vec3 vFWN;').replace('#include <worldpos_vertex>','#include <worldpos_vertex>\n{vec4 fw=vec4(transformed,1.0);\n#ifdef USE_INSTANCING\nfw=instanceMatrix*fw;\n#endif\nfw=modelMatrix*fw;vFWP=fw.xyz;vec3 fn=objectNormal;\n#ifdef USE_INSTANCING\nfn=mat3(instanceMatrix)*fn;\n#endif\nvFWN=normalize(mat3(modelMatrix)*fn);}');
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vFWP;varying vec3 vFWN;uniform sampler2D uDet;uniform float uSc;uniform float uAmt;uniform float uRv;uniform float uGY;float finD;')
   .replace('#include <map_fragment>','#include <map_fragment>\n{vec3 bw=pow(abs(vFWN),vec3(4.0));bw/=(bw.x+bw.y+bw.z+1e-5);vec3 P=vFWP*uSc;'+(p.ax?'float a=texture2D(uDet,vec2(P.z,P.y*.35)).r,b=texture2D(uDet,vec2(P.x,P.z)).r,c=texture2D(uDet,vec2(P.x,P.y*.35)).r;':'float a=texture2D(uDet,P.zy).r,b=texture2D(uDet,P.xz).r,c=texture2D(uDet,P.xy).r;')+'float d=a*bw.x+b*bw.y+c*bw.z;float lo=texture2D(uDet,vFWP.xz*.031).r;finD=d;diffuseColor.rgb*=clamp(1.0+(d-0.5)*2.0*uAmt+(lo-0.5)*0.35*uAmt,0.5,1.5);float side='+(p.flat?'0.0':'1.0-abs(vFWN.y)')+';float ao=mix(1.0,mix(0.58,1.0,smoothstep(0.0,1.1,vFWP.y-uGY)),side);diffuseColor.rgb*=ao;}')
   .replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\nroughnessFactor=clamp(roughnessFactor*(1.0+(0.5-finD)*2.0*uRv),0.04,1.0);')};
 m.customProgramCacheKey=()=>'fin_'+k;m.needsUpdate=true}
/* 장면 전체에 한 번 적용(이미 적용한 재질은 건너뜀). 나중에 불러온 모델은 그림이 있어 대상이 아님 */
let ENV_I=null,GY=0;export function setGround(y){GY=y}
export function finishScene(scene){let n=0;scene.traverse(o=>{if(!o.isMesh)return;const ms=Array.isArray(o.material)?o.material:[o.material];for(const m of ms){if(m&&ENV_I!=null&&!m.userData.envI&&'envMapIntensity' in m){m.envMapIntensity=ENV_I;m.userData.envI=1}if(o.isSkinnedMesh)continue;if(!m||m.userData.fin!==undefined||!m.isMeshStandardMaterial)continue;if(m.userData.finKind){patch(m,m.userData.finKind);n++;continue}if(m.map||m.transparent||m.alphaTest>0||m.vertexColors)continue;if(m.emissive&&m.emissive.getHex()>0x303030){m.userData.fin=null;continue}const k=kindOf(m.color);if(!k){m.userData.fin=null;continue}patch(m,k);n++}});return n}
/* 하늘빛 환경광: 위는 하늘색, 아래는 흙빛인 작은 장면을 PMREM으로 굽는다 */
export function skyEnv(R,scene,{top=0xb8d2ee,mid=0xe8e2d4,bot=0x8a7458,intensity=.32}={}){try{const s=new THREE.Scene();const geo=new THREE.SphereGeometry(10,32,16);const cols=[],pos=geo.attributes.position,ct=new THREE.Color(top),cm=new THREE.Color(mid),cb=new THREE.Color(bot),c=new THREE.Color();for(let i=0;i<pos.count;i++){const y=pos.getY(i)/10;if(y>0)c.copy(cm).lerp(ct,Math.min(1,y*1.6));else c.copy(cm).lerp(cb,Math.min(1,-y*2.2));cols.push(c.r,c.g,c.b)}geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));s.add(new THREE.Mesh(geo,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.BackSide})));
 const pm=new THREE.PMREMGenerator(R);const rt=pm.fromScene(s,.02);scene.environment=rt.texture;ENV_I=intensity;scene.traverse(o=>{if((o.isHemisphereLight||o.isAmbientLight)&&!o.userData.finDim){o.intensity*=.8;o.userData.finDim=1}});pm.dispose();return rt.texture}catch(e){console.warn('env',e);return null}}
/* 틈새 그늘(앰비언트 오클루전, N8AO, 공개 라이브러리 MIT): 컴퓨터에서만 켠다. 실패하면 null(그냥 기존 렌더) */
export async function aoSetup(R,scene,cam){try{const [{N8AOPass},{EffectComposer},{OutputPass},{SMAAPass}]=await Promise.all([import('n8ao'),import('three/addons/postprocessing/EffectComposer.js'),import('three/addons/postprocessing/OutputPass.js'),import('three/addons/postprocessing/SMAAPass.js')]);
 const pr=R.getPixelRatio(),w=innerWidth,h=innerHeight;const C=new EffectComposer(R);C.setPixelRatio(pr);C.setSize(w,h);const ao=new N8AOPass(scene,cam,w,h);Object.assign(ao.configuration,{aoRadius:1.6,distanceFalloff:.9,intensity:2.6,halfRes:true,depthAwareUpsampling:true,gammaCorrection:false,aoSamples:12,denoiseSamples:6,denoiseRadius:10});ao.setQualityMode&&ao.setQualityMode('Medium');ao.configuration.halfRes=true;ao.configuration.gammaCorrection=false;
 C.addPass(ao);C.addPass(new OutputPass());const sm=new SMAAPass(w*pr,h*pr);C.addPass(sm);
 let slow=0,last=performance.now(),on=true;return{ao,render(){if(!on){R.render(scene,cam);return}const t=performance.now(),dt=t-last;last=t;if(dt>55)slow++;else slow=Math.max(0,slow-1);if(slow>90){on=false;console.warn('AO 끔(느림)')}C.render()},setSize(w2,h2){C.setSize(w2,h2);ao.setSize&&ao.setSize(w2,h2)},get on(){return on}}}catch(e){console.warn('AO 못 켬',e);return null}}
