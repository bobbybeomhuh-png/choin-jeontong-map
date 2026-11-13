/* 안전한 묶어 그리기(휴대폰용)
   같은 재질의 멈춰 있는 조각들을 한 덩어리로 합쳐 그리기 횟수를 줄인다.
   원본은 지우지 않고 그리기만 끈다(layers). 원본이나 그 위 묶음이 숨겨지거나 움직이거나
   재질 색이 바뀌면 그 덩어리만 즉시 풀어 원래대로 돌린다. 갱신 2026-11-13 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const matKey = m => [m.type, m.vertexColors ? m.color && m.color.getHex() : '*', m.emissive && m.emissive.getHex(), m.emissiveIntensity,
  m.map && m.map.uuid, m.normalMap && m.normalMap.uuid, m.side, m.flatShading, m.vertexColors, m.roughness, m.metalness,
  m.alphaTest, m.polygonOffset, m.polygonOffsetFactor, m.polygonOffsetUnits, m.toneMapped, m.fog, m.wireframe].join('|');
const matState = m => [m.color && m.color.getHex(), m.emissive && m.emissive.getHex(), m.emissiveIntensity, m.opacity,
  m.transparent, m.map && m.map.uuid, m.visible].join('|');

export function autoBatchLater(scene, wait = 2500, cb) {
  scene.updateMatrixWorld(true); const snap = new Map();
  scene.traverse(o => { if (o.isMesh) snap.set(o, o.matrixWorld.clone()) });
  setTimeout(() => { scene.updateMatrixWorld(true); const r = autoBatch(scene, [scene], { still: o => snap.has(o) && snap.get(o).equals(o.matrixWorld) }); cb && cb(r) }, wait);
}
export function autoBatch(scene, roots, opts = {}) {
  const minGroup = opts.minGroup || 3;
  const groups = [];
  scene.updateMatrixWorld(true);
  const cand = new Map();
  for (const root of roots) root.traverse(o => {
    if (!o.isMesh || o.isInstancedMesh || o.isSkinnedMesh || o.isSprite || !o.geometry || Array.isArray(o.material)) return;
    if (o.morphTargetInfluences || o.userData.noBatch || o.name === 'batched') return;
    if (opts.still && !opts.still(o)) return;
    const m = o.material;
    if (!m || m.transparent || m.isShaderMaterial || m.isRawShaderMaterial || m.isMeshPhysicalMaterial) return;
    if ((m.map && (m.map.isCanvasTexture || m.map.isVideoTexture)) || m.onBeforeCompile !== THREE.Material.prototype.onBeforeCompile) return;
    let p = o, vis = true; while (p) { if (!p.visible) { vis = false; break } p = p.parent }
    if (!vis) return;
    const g = o.geometry; if (!g.attributes.position || (g.morphAttributes && Object.keys(g.morphAttributes).length)) return;
    let top = o; while (top.parent && top.parent !== scene) top = top.parent;
    const e = o.matrixWorld.elements, cell = Math.floor(e[12] / 20) + ',' + Math.floor(e[14] / 20);
    const k = matKey(m) + '|' + o.castShadow + '|' + o.receiveShadow + '|' + cell;
    if (!cand.has(k)) cand.set(k, []); cand.get(k).push(o);
  });
  for (const list of cand.values()) {
    if (list.length < minGroup) continue;
    const m0 = list[0].material, geos = [];
    const sameCol = list.every(o => o.material.color && m0.color && o.material.color.equals(m0.color));
    const bake = !m0.vertexColors && !sameCol;
    let mat = m0; if (bake) { mat = m0.clone(); mat.vertexColors = true; mat.color.setRGB(1, 1, 1) }
    try {
      for (const o of list) {
        let g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
        for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].concat(mat.vertexColors ? ['color'] : []).includes(k)) g.deleteAttribute(k);
        if (!g.attributes.normal) g.computeVertexNormals();
        if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
        const nv = g.attributes.position.count;
        if (mat.vertexColors && !g.attributes.color) g.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(nv * 3).fill(1), 3));
        if (bake) { const c = o.material.color, ca = g.attributes.color; for (let i = 0; i < nv; i++) ca.setXYZ(i, ca.getX(i) * c.r, ca.getY(i) * c.g, ca.getZ(i) * c.b) }
        g.applyMatrix4(o.matrixWorld);
        if (o.matrixWorld.determinant() < 0) for (const k of Object.keys(g.attributes)) { const a = g.attributes[k], is = a.itemSize; for (let t = 0; t + 2 < nv; t += 3) for (let c = 0; c < is; c++) { const v1 = a.array[(t + 1) * is + c]; a.array[(t + 1) * is + c] = a.array[(t + 2) * is + c]; a.array[(t + 2) * is + c] = v1 } }
        geos.push(g);
      }
      const mg = mergeGeometries(geos); geos.forEach(g => g.dispose()); if (!mg) continue;
      const mesh = new THREE.Mesh(mg, mat); mesh.castShadow = list[0].castShadow; mesh.receiveShadow = list[0].receiveShadow; mesh.name = 'batched'; mesh.matrixAutoUpdate = false; mesh.updateMatrix();
      scene.add(mesh);
      const G = { mesh, list, mats: list.map(o => [o.material, matState(o.material)]), mws: list.map(o => o.matrixWorld.clone()), masks: list.map(o => o.layers.mask), anc: new Set(), on: true };
      for (const o of list) { o.layers.mask = 0; let p = o; while (p && p !== scene) { G.anc.add(p); p = p.parent } }
      groups.push(G);
    } catch (e) { console.warn('batch', e) }
  }
  const undo = G => { if (!G.on) return; G.on = false; G.list.forEach((o, i) => o.layers.mask = G.masks[i]); scene.remove(G.mesh); G.mesh.geometry.dispose(); if (G.mesh.material !== G.list[0].material) G.mesh.material.dispose() };
  /* 숨김은 바로 감지 */
  const watched = new WeakSet(), byObj = new Map();
  for (const G of groups) for (const a of G.anc) { if (!byObj.has(a)) byObj.set(a, []); byObj.get(a).push(G) }
  for (const [a, Gs] of byObj) {
    if (watched.has(a)) continue; watched.add(a);
    let v = a.visible;
    try { Object.defineProperty(a, 'visible', { configurable: true, get() { return v }, set(x) { if (x !== v) { v = x; for (const G of Gs) undo(G) } } }) } catch (e) { }
  }
  /* 움직임, 재질 변화, 떼어냄은 짧은 주기로 확인 */
  let i0 = 0;
  const check = () => {
    const n = Math.max(1, Math.ceil(groups.length / 4));
    for (let c = 0; c < n; c++) {
      const G = groups[(i0++) % groups.length]; if (!G || !G.on) continue;
      let bad = false;
      for (let j = 0; j < G.list.length && !bad; j++) {
        const o = G.list[j];
        if (!o.parent || !o.visible || o.material !== G.mats[j][0] || !o.matrixWorld.equals(G.mws[j]) || matState(o.material) !== G.mats[j][1] || o.layers.mask !== 0) bad = true;
      }
      if (!bad) for (const a of G.anc) if (!a.visible) { bad = true; break }
      if (bad) undo(G);
    }
  };
  const tm = groups.length ? setInterval(check, 120) : 0;
  const n = groups.reduce((s, G) => s + G.list.length, 0);
  return { G: groups, groups: groups.length, merged: n, undo: () => { groups.forEach(undo); clearInterval(tm) }, active: () => groups.filter(G => G.on).length };
}
