/* 무이 나라 조달청: 「그림체 하나로」(퀄리티 R1). 만든 날 2026-11-17
   비교군(Messenger 등)처럼 화면 전체에 같은 손질을 덧입혀, 섞여 있던 그림체를 하나로 묶는다.
   1 장면을 따로 그림(깊이 함께) → 2 외곽선(깊이 차이로 윤곽, 짙은 선) + 맞닿는 곳 그늘(곁이 더 가까우면 어둡게)
   + 색 다듬기(채도·대비·따뜻한 기운·가장자리 어둠) → 3 빛번짐(밝은 곳만 은은하게) → 4 화면으로(톤 매핑·sRGB).
   지도 원본은 건드리지 않고, 지도 렌더러가 이 장면을 화면에 그릴 때만 끼어든다(다른 대상·다른 장면은 그대로).
   ?post=0 이면 끔. window.__POST(true|false) 로 켜고 끔(비교용). */
import * as THREE from 'three';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {FullScreenQuad} from 'three/addons/postprocessing/Pass.js';
const EDGE={uniforms:{tC:{value:null},tD:{value:null},near:{value:.1},far:{value:900},res:{value:new THREE.Vector2(1,1)},line:{value:new THREE.Color(0x2a2016)},ow:{value:1.0},ao:{value:.38},sat:{value:1.08},con:{value:1.0},warm:{value:.02},vig:{value:.22},fadeFar:{value:260}},
 vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',
 fragmentShader:`uniform sampler2D tC;uniform sampler2D tD;uniform float near,far,ow,ao,sat,con,warm,vig,fadeFar;uniform vec2 res;uniform vec3 line;varying vec2 vUv;
 float lin(vec2 uv){float z=texture2D(tD,uv).x;return (2.*near*far)/(far+near-(z*2.-1.)*(far-near));}
 void main(){vec4 c=texture2D(tC,vUv);float d=lin(vUv);vec2 px=ow/res;
  /* 외곽선: 둘레 깊이와의 상대 차이(멀수록 너그럽게) */float e=0.;float dl=lin(vUv-vec2(px.x,0.)),dr=lin(vUv+vec2(px.x,0.)),du=lin(vUv+vec2(0.,px.y)),dd=lin(vUv-vec2(0.,px.y));
  float g=abs(dl+dr-2.*d)+abs(du+dd-2.*d);e=smoothstep(.16,.42,g/max(d,.5)*6.);
  float sil=max(max(dl,dr),max(du,dd))-d;e=max(e,smoothstep(.25,.7,sil/max(d,.5)*3.));
  float fade=1.-smoothstep(fadeFar*.35,fadeFar,d);e*=fade;
  /* 맞닿는 곳 그늘: 둘레 여덟 곳 가운데 나보다 가까운 곳이 많으면 어둡게 */float occ=0.;float rr=3.5/max(d*.06,1.);
  for(int i=0;i<8;i++){float a=float(i)*.785;vec2 o=vec2(cos(a),sin(a))*px*rr*(1.+mod(float(i),2.));float s=lin(vUv+o);float diff=d-s;occ+=smoothstep(.08,.7,diff)*(1.-smoothstep(.9,3.5,diff));}
  occ=occ/8.*ao*fade;vec3 col=c.rgb*(1.-occ);
  col=mix(col,line*min(1.,length(col)*.5+.15),e*.62);
  /* 색 다듬기(톤 매핑 전, 선형). 하늘(아주 먼 곳)은 손대지 않음 */float sky=step(far*.97,d);float L=dot(col,vec3(.2126,.7152,.0722));vec3 g2=mix(vec3(L),col,sat);col=mix(g2,c.rgb,sky);col*=vec3(1.+warm,1.,1.-warm);
  vec2 q=vUv-.5;col*=1.-vig*dot(q,q)*1.6;gl_FragColor=vec4(max(col,0.),c.a);}`};
export function setupPost(R,scene){if(!R||!scene||R.userData&&R.userData.post)return null;if(/[?&]post=0/.test(location.search))return null;R.userData=R.userData||{};R.userData.post=1;
 const sz=new THREE.Vector2();R.getDrawingBufferSize(sz);
 const mk=(depth)=>{const t=new THREE.WebGLRenderTarget(sz.x,sz.y,{type:THREE.HalfFloatType,samples:depth?4:0});if(depth){t.depthTexture=new THREE.DepthTexture(sz.x,sz.y);t.depthTexture.type=THREE.UnsignedIntType}return t};
 const rtS=mk(true),rtA=mk(false),rtB=mk(false);
 const em=new THREE.ShaderMaterial({uniforms:THREE.UniformsUtils.clone(EDGE.uniforms),vertexShader:EDGE.vertexShader,fragmentShader:EDGE.fragmentShader,depthTest:false,depthWrite:false});const fq=new FullScreenQuad(em);
 const bloom=new UnrealBloomPass(new THREE.Vector2(sz.x,sz.y),.16,.4,.97);const out=new OutputPass();out.renderToScreen=true;
 let on=true;const orig=R.render.bind(R);let inside=false;
 const resize=()=>{R.getDrawingBufferSize(sz);if(rtS.width===sz.x&&rtS.height===sz.y)return;for(const t of[rtS,rtA,rtB])t.setSize(sz.x,sz.y);bloom.setSize(sz.x,sz.y);em.uniforms.res.value.set(sz.x,sz.y)};em.uniforms.res.value.set(sz.x,sz.y);
 R.render=(s,c)=>{if(inside||!on||s!==scene||R.getRenderTarget()!==null||!c||!c.isPerspectiveCamera)return orig(s,c);inside=true;try{resize();
   R.setRenderTarget(rtS);orig(s,c);
   em.uniforms.tC.value=rtS.texture;em.uniforms.tD.value=rtS.depthTexture;em.uniforms.near.value=c.near;em.uniforms.far.value=c.far;R.setRenderTarget(rtA);fq.render(R);
   bloom.render(R,rtB,rtA,0,false);
   R.setRenderTarget(null);out.render(R,null,rtA)}catch(e){console.warn('후처리',e);on=false;R.setRenderTarget(null);orig(s,c)}finally{inside=false}};
 window.__POST=(v)=>{on=v!==false;return on};window.__POSTU=em.uniforms;window.__BLOOM=bloom;return{set:(k,v)=>{if(em.uniforms[k])em.uniforms[k].value=v}}}
