/* 마당 바닥(마사토·잔자갈) 공용 재질(2026-11-23 품질): 무늬 없는 흰 판 마당을 대신한다. */
import * as THREE from 'three';
let MAT=null;
export function yardMat(){if(MAT)return MAT;const c=document.createElement('canvas');c.width=c.height=256;const q=c.getContext('2d');let a=17;const r=()=>{a=(a*16807)%2147483647;return a/2147483647};
 q.fillStyle='#d6cab0';q.fillRect(0,0,256,256);
 for(let i=0;i<5200;i++){const v=150+(r()*95|0),s=.8+r()*2.4;q.fillStyle=`rgba(${v},${v-8|0},${v-26|0},${.35+r()*.45})`;q.beginPath();q.ellipse(r()*256,r()*256,s,s*(.6+r()*.4),r()*3,0,7);q.fill()}
 for(let i=0;i<40;i++){q.fillStyle=`rgba(140,125,95,${.05+r()*.08})`;q.beginPath();q.ellipse(r()*256,r()*256,10+r()*30,6+r()*16,r()*3,0,7);q.fill()}
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(12,12);t.anisotropy=8;
 MAT=new THREE.MeshStandardMaterial({map:t,color:0xf2ead8,roughness:1});return MAT}
