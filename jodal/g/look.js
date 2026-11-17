/* 무이 나라 조달청: 「화면 전체 손질」(퀄리티 Q0). 만든 날 2026-11-17
   지도 원본(index.html)은 그대로 두고, 게임이 뜬 뒤 장면의 빛·안개·하늘만 바꾼다.
   - 전체를 고르게 밝히던 빛(하늘빛·주변빛)을 줄이고 따뜻한 햇빛을 세게 → 그림자와 입체감
   - 안개: 회베이지 → 맑은 하늘빛(먼 경치가 공기 원근처럼 옅은 푸른빛으로)
   - 하늘: 위 짙은 푸른빛, 지평선 옅은 빛, 해 둘레 환한 빛무리
   applyLook(scene, renderer) 한 번. 밤 경비·연등 축제는 그 뒤의 값을 기준으로 어둡게 했다 되돌린다. */
import * as THREE from 'three';
export function applyLook(scene,R){if(!scene||scene.userData.look)return;scene.userData.look=1;
 const SKY_H=new THREE.Color(0xd9e6ee),SKY_Z=new THREE.Color(0x4f8fd6);
 scene.traverse(o=>{
  if(o.isHemisphereLight){o.intensity=.62;o.color.setHex(0xcfe0ff);o.groundColor.setHex(0x5e5038)}
  else if(o.isAmbientLight){o.intensity=.14}
  else if(o.isDirectionalLight&&o.castShadow){o.intensity=3.7;o.color.setHex(0xffe4c0);if(o.shadow){o.shadow.bias=-.0002;o.shadow.normalBias=.025}}
  else if(o.isMesh&&o.geometry&&o.geometry.parameters&&o.geometry.parameters.radius===600&&o.material&&o.material.isShaderMaterial){
   o.material.fragmentShader='varying vec3 v;void main(){float h=clamp(v.y,0.,1.);vec3 hz=vec3('+SKY_H.r.toFixed(3)+','+SKY_H.g.toFixed(3)+','+SKY_H.b.toFixed(3)+');vec3 zn=vec3('+SKY_Z.r.toFixed(3)+','+SKY_Z.g.toFixed(3)+','+SKY_Z.b.toFixed(3)+');vec3 c=mix(hz,zn,pow(h,.55));c=mix(c,vec3(.80,.86,.86),smoothstep(.04,-.06,v.y));vec3 sd=normalize(vec3(-.5,.55,.45));float d=max(0.,dot(v,sd));c+=vec3(1.,.86,.62)*(pow(d,90.)*1.4+pow(d,8.)*.22);gl_FragColor=vec4(c,1.);}';o.material.needsUpdate=true}});
 if(scene.fog){scene.fog.color.setHex(0xc9dbe6);scene.fog.near=Math.max(scene.fog.near,150);scene.fog.far=Math.max(scene.fog.far,620)}
 if(R){R.toneMappingExposure=1.02}}
