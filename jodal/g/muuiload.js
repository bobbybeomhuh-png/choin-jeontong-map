/* 무이 나라 조달청: 「모형 함께 불러오기」. 만든 날 2026-11-19
   3D 장면마다 Draco 해제기(웹어셈블리)를 새로 만들고 같은 무이 모형을 매번 받아, 다섯 고을을 돌면 메모리가 모자랐다
   (WebAssembly Out of memory). 해제기 하나를 모두 함께 쓰고, 같은 주소의 모형은 한 번만 받아 뼈대째 복제해 돌려준다.
   SHL.load(url, onLoad, _, onError) 는 GLTFLoader 와 같은 꼴(받는 쪽 코드는 그대로). */
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';
let L=null;const C={};
const base=()=>{if(L)return L;L=new GLTFLoader();const d=new DRACOLoader();d.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');L.setDRACOLoader(d);return L};
export function loadGLB(url){if(!C[url])C[url]=new Promise((res,rej)=>base().load(url,res,undefined,rej));return C[url].then(g=>({scene:SkeletonUtils.clone(g.scene),animations:g.animations}))}
export const SHL={load:(url,onLoad,_,onErr)=>{loadGLB(url).then(g=>{try{onLoad&&onLoad(g)}catch(e){console.warn(e)}}).catch(e=>{try{onErr&&onErr(e)}catch(x){}})}};
