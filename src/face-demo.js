// src/face-demo.js - Demonstrasi 2: face tracking (MindAR + Three.js)
import * as THREE from 'three';
import { MindARThree } from '../vendor/mindar/mindar-face-three.prod.js';
import { setStatus, setupStartButton } from './common.js';

// Konstanta yang boleh Anda ubah saat evaluasi posisi dan skala kacamata.
const ANCHOR_INDEX = 168; // titik landmark di antara kedua mata (dipakai pada contoh resmi MindAR)
const GLASSES_SCALE = 1.0;
const GLASSES_OFFSET = { x: 0, y: -0.05, z: 0.05 };

// Titik kontur bentuk hati (persamaan parametrik), diskalakan agar setengah lebarnya = halfWidth.
function heartPoints(halfWidth, steps = 64) {
    const k = halfWidth / 16;
    const pts = [];
    for (let i = 0; i < steps; i++) {
        const t = (i / steps) * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        pts.push(new THREE.Vector2(x * k, (y + 2) * k)); // +2 agar hati terpusat secara vertikal
    }
    return pts;
}

// Kacamata berbentuk hati: bingkai hati (dengan lubang) + lensa hati tembus pandang.
function buildGlasses() {
    const g = new THREE.Group();
    const frameMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.35, metalness: 0.3 });
    const lensMat = new THREE.MeshStandardMaterial({
        color: 0xfda4af, transparent: true, opacity: 0.35, side: THREE.DoubleSide,
    });

    const outerPts = heartPoints(0.17);
    const innerPts = heartPoints(0.135);

    // Bingkai: bentuk hati luar dengan lubang hati dalam, lalu di-extrude tipis.
    const frameShape = new THREE.Shape(outerPts);
    frameShape.holes.push(new THREE.Path(innerPts));
    const frameGeo = new THREE.ExtrudeGeometry(frameShape, { depth: 0.03, bevelEnabled: false });
    frameGeo.translate(0, 0, -0.015);

    const lensGeo = new THREE.ShapeGeometry(new THREE.Shape(innerPts));

    for (const sx of [-1, 1]) {
        const rim = new THREE.Mesh(frameGeo, frameMat);
        rim.position.x = sx * 0.21;
        const lens = new THREE.Mesh(lensGeo, lensMat);
        lens.position.x = sx * 0.21;

        // Gagang kacamata ke arah belakang (z-), menuju telinga.
        const temple = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.4), frameMat);
        temple.position.set(sx * 0.39, 0.03, -0.2);
        g.add(rim, lens, temple);
    }

    // Jembatan hidung penghubung kedua hati.
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.02, 0.03), frameMat);
    bridge.position.set(0, 0.04, 0);
    g.add(bridge);

    g.scale.setScalar(GLASSES_SCALE);
    g.position.set(GLASSES_OFFSET.x, GLASSES_OFFSET.y, GLASSES_OFFSET.z);
    return g;
}

async function start() {
    const mindarThree = new MindARThree({ container: document.getElementById('container') });
    const { renderer, scene, camera } = mindarThree;
    const anchor = mindarThree.addAnchor(ANCHOR_INDEX);
    anchor.group.add(buildGlasses());

    scene.add(new THREE.HemisphereLight(0xffffff, 0x667788, 1.4));
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(0, 1, 2);
    scene.add(dir);

    await mindarThree.start(); // minta kamera depan, memuat model deteksi wajah
    setStatus('Mencari wajah', 'searching');

    let hadFace = false, lostCount = 0;
    renderer.setAnimationLoop(() => {
        // Anchor wajah tidak punya event found/lost; gunakan getLatestEstimate():
        // bernilai null jika tidak ada wajah pada frame terakhir.
        const hasFace = mindarThree.getLatestEstimate() !== null;
        if (hasFace !== hadFace) {
            hadFace = hasFace;
            if (hasFace) setStatus('Wajah terdeteksi', 'found');
            else { lostCount++; setStatus('Wajah tidak terdeteksi - mencari wajah', 'searching'); }
            document.getElementById('info').textContent = 'Wajah hilang ' + lostCount + ' kali.';
        }
        renderer.render(scene, camera);
    });
}

setupStartButton(start);