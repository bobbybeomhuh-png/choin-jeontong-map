/* 사진 측량 실측 터 공용 틀(2026-11-21): 스케치팹 lacomi1975 등 측량좌표 그대로 실제 크기 터.
   땅은 height.json(나무 밑 땅 높이 격자, baseAt), 솟은 것(집·나무·담)은 obst.json 벽. 마당 파일은 글·자리·놀이만 넣음. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
export function photoSite(key,opts,cfg){const mini=!!opts.mini;const G=new THREE.Group();const solids=[],cam=[],spots=[];
 let HG=null;const hAt=(x,z)=>{if(!HG)return cfg.h0||2;const fx=(x-HG.x0)/HG.step,fz=(HG.z0-z)/HG.step;const i=Math.max(0,Math.min(HG.nx-2,Math.floor(fx))),j=Math.max(0,Math.min(HG.nz-2,Math.floor(fz)));const u=Math.max(0,Math.min(1,fx-i)),v=Math.max(0,Math.min(1,fz-j));const H=HG.h;return (H[j][i]*(1-u)+H[j][i+1]*u)*(1-v)+(H[j+1][i]*(1-u)+H[j+1][i+1]*u)*v};
 if(!mini){const base=`../models/${key}/`;fetch(new URL(base+'height.json',import.meta.url).href).then(r=>r.json()).then(j=>{HG=j}).catch(()=>{});
  fetch(new URL(base+'obst.json',import.meta.url).href).then(r=>r.json()).then(j=>{for(const[x0,x1,z0,z1,h]of j.obst||[])solids.push({x0,x1,y0:-40,y1:h,z0,z1})}).catch(()=>{});
  const gl=new GLTFLoader();const dr=new DRACOLoader();dr.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');gl.setDRACOLoader(dr);
  gl.load(new URL(base+key+'.glb',import.meta.url).href,g=>{const o=g.scene;o.userData.noBatch=true;o.traverse(e=>{if(e.isMesh){e.castShadow=false;e.receiveShadow=true;if(e.material){e.material.roughness=.95;e.material.metalness=0;e.material.envMapIntensity=.55;e.material.transparent=false;e.material.alphaTest=0;e.material.alphaHash=false}cam.push(e)}});G.add(o)},undefined,()=>{})}
 {const gr=new THREE.Mesh(new THREE.PlaneGeometry(600,600),new THREE.MeshBasicMaterial({color:cfg.groundColor||0x5a6a44}));gr.rotation.x=-Math.PI/2;gr.position.y=(cfg.groundY??-1);G.add(gr)}
 const ctx={G,solids,cam,spots,hAt,THREE};if(cfg.build)cfg.build(ctx);
 return Object.assign({group:G,solids,cam,spots,spawn:cfg.spawn,size:{}},{quest:cfg.quest,title:cfg.title,hint:cfg.hint,ibl:true,
  env:Object.assign({fog:[120,520],noHills:true,plaza:null,beds:false,trees:false,treeAvoid:()=>true},cfg.env||{}),npc:cfg.npc||[],bounds:cfg.bounds,level:()=>cfg.level||cfg.title,camCap:()=>Infinity,
  baseAt:(x,z)=>hAt(x,z),tick:cfg.tick||(()=>{}),mini:cfg.mini||{S:2,ox:0,oz:0,draw(g){g.fillStyle='#5a6a44';g.fillRect(0,0,300,300)}}})}
