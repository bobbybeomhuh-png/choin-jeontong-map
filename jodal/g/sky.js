/* 무이 나라 조달청: 「하늘 살림」(퀄리티 P5). 만든 날 2026-11-17
   1 뭉게구름: 지도 구름(흰 공 묶음)에 아래는 그늘지고 위는 밝은 빛을 입히고(높이에 따라), 아랫면을 평평하게 눌러 뭉게구름 꼴로.
   2 새떼: V자로 줄지어 나는 새 다섯 무리가 지도 위를 천천히 가로지른다(날갯짓은 셰이더로).
   setupSky(scene) 한 번. 지도 구름 재질은 worldmap 의 userData.cloudMat. */
import * as THREE from 'three';
export function setupSky(scene){if(!scene||scene.userData.skyp)return null;scene.userData.skyp=1;let cm=null;scene.traverse(o=>{if(o.userData&&o.userData.cloudMat&&!cm)cm=o.userData.cloudMat});
 if(cm){/* 구름 공마다 아랫부분을 눌러 평평하게, 높이에 따라 그늘 */const groups=new Set();scene.traverse(o=>{if(o.isMesh&&o.material===cm&&o.parent)groups.add(o.parent)});
  for(const g of groups){g.children.forEach(b=>{if(!b.isMesh||b.userData.flat)return;b.userData.flat=1;const geo=b.geometry.clone();const p=geo.attributes.position;for(let i=0;i<p.count;i++){const y=p.getY(i);if(y<0)p.setY(i,y*.35)}geo.computeVertexNormals();b.geometry=geo})}
  cm.onBeforeCompile=sh=>{sh.vertexShader='varying float vCy;\n'+sh.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvCy=clamp(position.y/4.+.35,0.,1.);');
   sh.fragmentShader='varying float vCy;\n'+sh.fragmentShader.replace('#include <map_fragment>','#include <map_fragment>\ndiffuseColor.rgb*=mix(vec3(.62,.66,.76),vec3(1.05,1.03,1.),smoothstep(.0,.9,vCy));')};cm.customProgramCacheKey=()=>'jodal-cloud-p5';cm.needsUpdate=true}
 /* 새떼 */const T={value:0};const bird=(()=>{const g=new THREE.BufferGeometry();const P=[-.5,0,-.08, 0,0,.12, 0,0,-.12,  .5,0,-.08, 0,0,-.12, 0,0,.12];g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.computeVertexNormals();return g})();
 const mat=new THREE.MeshBasicMaterial({color:0x2a2a30,side:THREE.DoubleSide,fog:true});mat.onBeforeCompile=sh=>{sh.uniforms.uT=T;sh.vertexShader='uniform float uT;\n'+sh.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n{vec4 ip=instanceMatrix*vec4(0.,0.,0.,1.);float f=sin(uT*7.+ip.x*.9+ip.z*.7);transformed.y+=abs(position.x)*f*.55;}')};mat.customProgramCacheKey=()=>'jodal-bird';
 const FL=[];const N=5,PER=9;const im=new THREE.InstancedMesh(bird,mat,N*PER);im.frustumCulled=false;scene.add(im);
 for(let f=0;f<N;f++)FL.push({cx:-150+f*80,cz:-120+f*60,r:140+f*22,a:f*1.3,v:(.018+f*.004)*(f%2?1:-1),y:30+f*3});
 const o=new THREE.Object3D();const tick=()=>{T.value=performance.now()/1000;for(let f=0;f<N;f++){const F=FL[f];F.a+=F.v*.016;const x=F.cx+Math.cos(F.a)*F.r,z=F.cz+Math.sin(F.a)*F.r;const dir=Math.atan2(-Math.sin(F.a)*Math.sign(F.v),Math.cos(F.a)*Math.sign(F.v));
   for(let i=0;i<PER;i++){const side=i===0?0:(i%2?1:-1),row=Math.ceil(i/2);const lx=side*row*1.3,lz=-row*1.5;o.position.set(x+lx*Math.cos(dir)+lz*Math.sin(dir),F.y+Math.sin(T.value*.5+i)*.3,z-lx*Math.sin(dir)+lz*Math.cos(dir));o.rotation.set(0,dir,0);o.scale.setScalar(1.4);o.updateMatrix();im.setMatrixAt(f*PER+i,o.matrix)}}im.instanceMatrix.needsUpdate=true;requestAnimationFrame(tick)};tick();
 window.__SKYP={clouds:!!cm,birds:N*PER};return im}
