/* 무이 나라 조달청: 「살아 있는 물」(퀄리티 R5). 만든 날 2026-11-17
   지도 원본은 그대로 두고, 게임이 뜬 뒤 바다·강 재질에만 덧입힌다.
   1 땅 모양 찍기: 위에서 내려다보는 정사영 카메라로 물 높이 바로 위만 한 번 그려 땅=흰색 지도를 얻고, 흐리게 펴서 「해안까지 거리」로 씀
   2 바다: 해안 가까이 옅은 옥빛(얕은 물), 해안선에 밀려왔다 물러나는 흰 물거품 띠, 먼 바다는 짙게, 잔물결 반짝임
   3 강: 흐르는 방향 없이도 보이게 잔 반짝임과 물빛 얼룩이 천천히 흐름
   setupWater(scene, renderer) 한 번. 시간 재기: window.__WATERMS */
import * as THREE from 'three';
const T={value:0};let started=false;
const BX0=-300,BX1=340,BZ0=-290,BZ1=380;
function landMask(scene,R,sea,WY){const N=1024,rt=new THREE.WebGLRenderTarget(N,N);
 const cam=new THREE.OrthographicCamera(BX0,BX1,-BZ0,-BZ1,0,7.6);/* 위에서 아래로: 화면 위쪽이 -z(북) */cam.position.set(0,WY+7.7,0);cam.up.set(0,0,-1);cam.lookAt(0,WY-1,0);cam.updateProjectionMatrix();
 const keep={bg:scene.background,fog:scene.fog,ov:scene.overrideMaterial,vis:sea.visible};const white=new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide});
 scene.background=new THREE.Color(0);scene.fog=null;scene.overrideMaterial=white;sea.visible=false;const hid=[];scene.traverse(o=>{if((o.isSprite||o.isPoints||o.isLine)&&o.visible){o.visible=false;hid.push(o)}});
 const prev=R.getRenderTarget();const sh=R.shadowMap.autoUpdate;R.shadowMap.autoUpdate=false;
 try{R.setRenderTarget(rt);R.setClearColor(0,1);R.clear();R.render(scene,cam)}finally{R.setRenderTarget(prev);R.shadowMap.autoUpdate=sh;scene.background=keep.bg;scene.fog=keep.fog;scene.overrideMaterial=keep.ov;sea.visible=keep.vis;for(const o of hid)o.visible=true}
 const px=new Uint8Array(N*N*4);R.readRenderTargetPixels(rt,0,0,N,N,px);rt.dispose();white.dispose();
 /* 512로 줄이고 상자 흐림 세 번 → 해안에서 멀어질수록 0으로 떨어지는 부드러운 값 */const M=512;let a=new Float32Array(M*M);for(let j=0;j<M;j++)for(let i=0;i<M;i++){let s=0;for(let dj=0;dj<2;dj++)for(let di=0;di<2;di++)s+=px[((j*2+dj)*N+(i*2+di))*4];a[j*M+i]=s/1020}
 const blur=(src,r)=>{const t=new Float32Array(M*M),o=new Float32Array(M*M);for(let j=0;j<M;j++){let s=0;for(let i=-r;i<=r;i++)s+=src[j*M+Math.min(M-1,Math.max(0,i))];for(let i=0;i<M;i++){t[j*M+i]=s/(2*r+1);s+=src[j*M+Math.min(M-1,i+r+1)]-src[j*M+Math.max(0,i-r)]}}
  for(let i=0;i<M;i++){let s=0;for(let j=-r;j<=r;j++)s+=t[Math.min(M-1,Math.max(0,j))*M+i];for(let j=0;j<M;j++){o[j*M+i]=s/(2*r+1);s+=t[Math.min(M-1,j+r+1)*M+i]-t[Math.max(0,j-r)*M+i]}}return o};
 const near=blur(blur(a,2),2),far=blur(blur(near,7),7);const out=new Uint8Array(M*M*4);for(let k=0;k<M*M;k++){out[k*4]=Math.min(255,near[k]*255);out[k*4+1]=Math.min(255,far[k]*255*1.6);out[k*4+2]=a[k]*255;out[k*4+3]=255}
 const tx=new THREE.DataTexture(out,M,M,THREE.RGBAFormat);tx.flipY=false;tx.magFilter=tx.minFilter=THREE.LinearFilter;tx.needsUpdate=true;return tx}
const VERT=['#include <project_vertex>','vWp=(modelMatrix*vec4(transformed,1.)).xyz;'].join('\n');
export function setupWater(scene,R){if(started||!scene||!R)return null;if(/[?&]water=0/.test(location.search))return null;let sea=null,river=null,WY=.35;
 scene.traverse(o=>{if(o.userData&&o.userData.sea&&!sea)sea=o.userData.sea;if(o.userData&&o.userData.riverMat&&!river)river=o.userData.riverMat});
 if(!sea)return null;let seaMesh=null;scene.traverse(o=>{if(o.isMesh&&o.material===sea)seaMesh=o});if(!seaMesh)return null;WY=seaMesh.position.y;started=true;const t0=performance.now();
 let mask=null;try{mask=landMask(scene,R,seaMesh,WY)}catch(e){console.warn('물 지도',e)}window.__WATERMS=Math.round(performance.now()-t0);
 const loop=()=>{T.value=performance.now()/1000;requestAnimationFrame(loop)};loop();
 if(mask){sea.onBeforeCompile=sh=>{sh.uniforms.uT=T;sh.uniforms.uMask=new THREE.Uniform(mask);sh.uniforms.uB=new THREE.Uniform(new THREE.Vector4(BX0,BZ0,BX1-BX0,BZ1-BZ0));
   sh.vertexShader='varying vec3 vWp;\n'+sh.vertexShader.replace('#include <project_vertex>',VERT);
   sh.fragmentShader='varying vec3 vWp;uniform float uT;uniform sampler2D uMask;uniform vec4 uB;\nfloat h21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}\nfloat vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}\n'+sh.fragmentShader
    .replace('#include <map_fragment>',['#include <map_fragment>',
     'vec2 mu=vec2((vWp.x-uB.x)/uB.z,1.-(vWp.z-uB.y)/uB.w);vec4 mk=texture2D(uMask,mu);float nr=mk.r,fr=clamp(mk.g,0.,1.);',
     'vec3 deep=vec3(.05,.30,.45),mid=vec3(.13,.55,.66),shal=vec3(.42,.80,.76);',
     'vec3 wc=mix(deep,mid,smoothstep(0.,.55,fr));wc=mix(wc,shal,smoothstep(.12,.6,nr));',
     'diffuseColor.rgb=wc*mix(vec3(1.),diffuseColor.rgb/max(vec3(.001),vec3(.86,.94,.95)),.35);',
     'float wob=(vn(vWp.xz*.3+uT*.15)-.5)*.06;float ln=.36+.07*sin(uT*.7+vn(vWp.xz*.05)*6.);',
     'float foam=(1.-smoothstep(.0,.025,abs(nr+wob-ln)))*smoothstep(.3,.75,vn(vWp.xz*1.1+uT*.25))*smoothstep(.2,.36,ln+.02)*.8;',
     'foam+=smoothstep(.46,.52,nr)*(1.-smoothstep(.56,.62,nr))*(.45+.55*vn(vWp.xz*1.6+uT*.4));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.97,.99,1.),clamp(foam,0.,1.)*.85);',
     'diffuseColor.a=mix(diffuseColor.a,1.,clamp(foam,0.,1.));'].join('\n'))
    .replace('#include <emissivemap_fragment>',['#include <emissivemap_fragment>',
     'float sp=vn(vWp.xz*1.7+vec2(uT*.6,uT*.35))*vn(vWp.xz*2.3-vec2(uT*.4,uT*.5));totalEmissiveRadiance+=vec3(1.,.97,.88)*smoothstep(.7,.85,sp)*.35*(1.-smoothstep(.2,.5,nr))*(1.-smoothstep(30.,110.,length(vViewPosition)));'].join('\n'))};
  sea.customProgramCacheKey=()=>'jodal-sea-r5';sea.needsUpdate=true}
 if(river){river.onBeforeCompile=sh=>{sh.uniforms.uT=T;sh.vertexShader='varying vec3 vWp;\n'+sh.vertexShader.replace('#include <project_vertex>',VERT);
   sh.fragmentShader='varying vec3 vWp;uniform float uT;\nfloat h21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}\nfloat vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}\n'+sh.fragmentShader
    .replace('#include <map_fragment>','#include <map_fragment>\nfloat rn=vn(vWp.xz*.45+vec2(uT*.25,uT*.18));diffuseColor.rgb*=.86+.26*rn;')
    .replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\nfloat rs=vn(vWp.xz*2.2+vec2(uT*.7,uT*.5))*vn(vWp.xz*3.1-vec2(uT*.5,uT*.6));totalEmissiveRadiance+=vec3(1.,.97,.9)*smoothstep(.68,.85,rs)*.35*(1.-smoothstep(30.,110.,length(vViewPosition)));')};
  river.customProgramCacheKey=()=>'jodal-river-r5';river.needsUpdate=true}
 window.__WATER={mask,sea,river};return{mask}}
