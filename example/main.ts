import * as THREE from 'three';
import CameraControls from 'camera-controls';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';

// @ts-ignore
import Stats from 'three/addons/libs/stats.module.js';

import saveAs from 'file-saver';
import { IFCLoader } from 'web-ifc-three/IFCLoader';

import { Worker } from '../src';

// @ts-ignore
import ifc from '../resources/example_4.ifc?url';
import './style.css';

CameraControls.install({ THREE: THREE });

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

type Extension = 'zip' | 'bcfzip' | 'bcf';
const extension: Extension = 'zip';

const ifcModels: THREE.Object3D[] = [];

const initWorker = (): void => {
    const worker = new Worker();
    worker.postMessage('Hello World');
    worker.onmessage = (e) => {
        console.log('Got message from worker thread. Saving ZIP');
        saveAs(e.data, `presentation.${extension}`);
    };
};

const initThree = (): void => {
    const stats = new Stats();
    document.body.appendChild(stats.dom);

    const clock = new THREE.Clock();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x263238), 1);
    document.body.appendChild(renderer.domElement);

    const cameraControls = new CameraControls(camera, renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.castShadow = true;
    light.shadow.mapSize.set(2048, 2048);
    light.position.set(10, 10, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xb0bec5, 0.8));

    const size = 40;
    const divisions = size;

    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    const ifcLoader = new IFCLoader();
    ifcLoader.ifcManager.setWasmPath('/');
    ifcLoader.load(ifc, (ifcModel) => {
        ifcModels.push(ifcModel);
        scene.add(ifcModel);
        cameraControls.fitToSphere(scene, false);
        cameraControls.polarAngle = Math.PI / 4;
    });

    const raycaster = new THREE.Raycaster();
    raycaster.firstHitOnly = true;
    const pointer = new THREE.Vector2();

    const onPointerMove = (event: PointerEvent) => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('pointermove', onPointerMove);

    const model = { id: -1 };

    const preselectMat = new THREE.MeshLambertMaterial({
        transparent: true,
        opacity: 1,
        color: 0x00ff00,
        depthTest: false,
    });

    renderer.domElement.addEventListener('pointerdown', (event: PointerEvent) => {
        if (event.button === 2 || event.pointerType === 'touch') {
            ifcLoader.ifcManager.removeSubset(model.id, preselectMat);
        } else {
            raycaster.setFromCamera(pointer, camera);
            const found = raycaster.intersectObjects(ifcModels)[0];

            if (found) {
                // Gets model ID
                model.id = (found.object as any).modelID;

                // Gets Express ID
                const index = found.faceIndex;
                if (index == null) throw new Error('Face index is null');
                const geometry = (found.object as THREE.Mesh).geometry;
                const id = ifcLoader.ifcManager.getExpressId(geometry, index);

                // Creates subset
                ifcLoader.ifcManager.createSubset({
                    modelID: model.id,
                    ids: [id],
                    material: preselectMat,
                    scene,
                    removePrevious: true,
                });
            } else {
                ifcLoader.ifcManager.removeSubset(model.id, preselectMat);
            }
        }
    });

    const animate = (): void => {
        const delta = clock.getDelta();
        const hasControlsUpdated = cameraControls.update(delta);

        requestAnimationFrame(animate);

        stats.update();
        renderer.render(scene, camera);
    };

    animate();
};

const example = (): void => {
    initThree();
    // initWorker();
};

example();
