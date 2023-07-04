import * as THREE from 'three';
import CameraControls from 'camera-controls';

import Stats from 'three/addons/libs/stats.module.js';

import saveAs from 'file-saver';
import { IFCLoader } from 'web-ifc-three/IFCLoader';

import { Worker } from '../src';

// @ts-ignore
import ifc from '../resources/example_4.ifc?url';
import './style.css';

CameraControls.install({ THREE: THREE });

type Extension = 'zip' | 'bcfzip' | 'bcf';
const extension: Extension = 'zip';

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

    camera.position.z = 5;

    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    const ifcLoader = new IFCLoader();
    ifcLoader.ifcManager.setWasmPath('/');
    ifcLoader.load(ifc, (ifcModel) => {
        scene.add(ifcModel);
        cameraControls.fitToSphere(scene, false);
        cameraControls.polarAngle = Math.PI / 4;
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
    initWorker();
};

example();
