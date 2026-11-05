// src/image-demo.js - Demonstrasi 1: image tracking (MindAR + Three.js)
import * as THREE from 'three';
import { MindARThree } from '../vendor/mindar/mindar-image-three.prod.js';
import { setStatus, setupStartButton } from './common.js';

const TARGET_SRC = './targets/target-card.mind'; // hasil kompilasi target-card.png
const TARGET_ASPECT = 372 / 674; // tinggi/lebar gambar target (674x372 px)

let foundCount = 0;

// Objek 3D baru: roket low-poly (dibuat dari geometri dasar, tanpa file model).
// Roket dibangun menghadap sumbu Y; pembungkus (pivot) akan memutarnya agar hidungnya
// menunjuk ke arah z+ (keluar dari permukaan target).
function buildRocket() {
    const rocket = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.35, metalness: 0.3 });
    const redMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4, metalness: 0.2 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, metalness: 0.6 });

    // Badan
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.22, 24), bodyMat);
    rocket.add(body);

    // Hidung (kerucut merah)
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.14, 24), redMat);
    nose.position.y = 0.18;
    rocket.add(nose);

    // Jendela bulat
    const win = new THREE.Mesh(new THREE.SphereGeometry(0.03, 16, 16), glassMat);
    win.position.set(0, 0.04, 0.052);
    rocket.add(win);

    // Tiga sirip, tersebar 120 derajat
    for (let i = 0; i < 3; i++) {
        const holder = new THREE.Group();
        holder.rotation.y = (i * Math.PI * 2) / 3;
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.1, 0.08), redMat);
        fin.position.set(0, -0.09, 0.09);
        holder.add(fin);
        rocket.add(holder);
    }

    // Api mesin (kerucut terbalik, tidak terpengaruh cahaya)
    const flame = new THREE.Mesh(
        new THREE.ConeGeometry(0.04, 0.12, 16),
        new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    flame.rotation.x = Math.PI;
    flame.position.y = -0.17;
    rocket.add(flame);

    return { rocket, flame };
}

async function start() {
    const mindarThree = new MindARThree({
        container: document.getElementById('container'),
        imageTargetSrc: TARGET_SRC,
    });
    const { renderer, scene, camera } = mindarThree;

    // Anchor 0 = target pertama di file .mind. Lebar target = 1 satuan, pusat target = (0,0,0).
    const anchor = mindarThree.addAnchor(0);

    // Bingkai tipis seukuran target: membantu menilai kecocokan posisi dan skala.
    const frame = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.PlaneGeometry(1, TARGET_ASPECT)),
        new THREE.LineBasicMaterial({ color: 0x14b8a6 })
    );
    anchor.group.add(frame);

    // Objek 3D utama: roket melayang di atas target.
    const { rocket, flame } = buildRocket();
    const pivot = new THREE.Group();
    pivot.rotation.x = Math.PI / 2; // sumbu Y roket -> sumbu z+ (keluar dari gambar)
    pivot.position.set(0, 0, 0.25);
    pivot.add(rocket);
    anchor.group.add(pivot);

    // Cahaya (MeshStandardMaterial butuh cahaya agar terlihat).
    scene.add(new THREE.HemisphereLight(0xffffff, 0x667788, 1.2));
    const dir = new THREE.DirectionalLight(0xffffff, 1.5);
    dir.position.set(0.5, 1, 1);
    scene.add(dir);

    // Event siklus hidup target.
    anchor.onTargetFound = () => {
        foundCount++;
        setStatus('Target terdeteksi', 'found');
        document.getElementById('info').textContent = 'Target ditemukan ' + foundCount + ' kali.';
    };
    anchor.onTargetLost = () => {
        setStatus('Target hilang - mencari target', 'searching');
    };

    await mindarThree.start(); // minta kamera, muat .mind, mulai tracking
    setStatus('Mencari target', 'searching');

    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
        const dt = clock.getDelta();
        const t = clock.elapsedTime;
        rocket.rotation.y += dt * 1.5;                       // roket berputar pada porosnya
        pivot.position.z = 0.25 + Math.sin(t * 2) * 0.03;    // melayang naik-turun
        flame.scale.y = 1 + 0.35 * Math.sin(t * 30);         // api berkedip
        renderer.render(scene, camera);
    });
}

setupStartButton(start);