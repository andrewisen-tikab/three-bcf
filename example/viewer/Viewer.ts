import * as THREE from 'three';
import CameraControls from 'camera-controls';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';

// @ts-ignore
import Stats from 'three/addons/libs/stats.module.js';

import { IFCLoader } from 'web-ifc-three/IFCLoader';

// @ts-ignore
import ifc from '../../resources/example_4.ifc?url';
import { CameraControlsStae, BCFCameraState } from '../types';
import initWorker from '../init/worker';

CameraControls.install({ THREE: THREE });
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

/**
 * THREE Viewer as singleton.
 */
class _THREEViewer {
    private static _instance: _THREEViewer;

    /**
     * TODO: Replace with Topics.
     */
    public cameraState: string | null = null;

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * Container to append the canvas.
     */
    private container: HTMLElement;

    /**
     * References to models loaded.
     */
    public ifcModels: THREE.Object3D[];

    public stats: Stats;

    public clock: THREE.Clock;

    public scene: THREE.Scene;

    public camera: THREE.PerspectiveCamera;

    public renderer: THREE.WebGLRenderer;

    public cameraControls: CameraControls;

    public raycaster: THREE.Raycaster;

    public pointer: THREE.Vector2;

    public ifcLoader: IFCLoader;

    init(container: HTMLElement = document.body) {
        this.container = container;
        this.ifcModels = [];

        this.stats = new Stats();
        container.appendChild(this.stats.dom);

        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000,
        );

        this.renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(new THREE.Color(0x263238), 1);
        this.container.appendChild(this.renderer.domElement);

        this.cameraControls = new CameraControls(this.camera, this.renderer.domElement);

        this.initLights();
        this.initGrid();

        this.ifcLoader = new IFCLoader();

        this.raycaster = new THREE.Raycaster();
        this.raycaster.firstHitOnly = true;
        this.pointer = new THREE.Vector2();

        const onPointerMove = (event: PointerEvent) => {
            const bounds = this.container.getBoundingClientRect();

            const x1 = event.clientX - bounds.left;
            const x2 = bounds.right - bounds.left;
            this.pointer.x = (x1 / x2) * 2 - 1;

            const y1 = event.clientY - bounds.top;
            const y2 = bounds.bottom - bounds.top;
            this.pointer.y = -(y1 / y2) * 2 + 1;
        };

        this.container.addEventListener('pointermove', onPointerMove);

        const model = { id: -1 };

        const preselectMat = new THREE.MeshLambertMaterial({
            transparent: true,
            opacity: 1,
            color: 0x00ff00,
            depthTest: false,
        });

        this.container.addEventListener('pointerdown', (event: PointerEvent) => {
            if (event.button === 2 || event.pointerType === 'touch') {
                this.ifcLoader.ifcManager.removeSubset(model.id, preselectMat);
            } else {
                this.raycaster.setFromCamera(this.pointer, this.camera);
                const found = this.raycaster.intersectObjects(this.ifcModels)[0];

                if (found) {
                    // Gets model ID
                    model.id = (found.object as any).modelID;

                    // Gets Express ID
                    const index = found.faceIndex;
                    if (index == null) throw new Error('Face index is null');
                    const geometry = (found.object as THREE.Mesh).geometry;
                    const id = this.ifcLoader.ifcManager.getExpressId(geometry, index);

                    // Creates subset
                    this.ifcLoader.ifcManager.createSubset({
                        modelID: model.id,
                        ids: [id],
                        material: preselectMat,
                        scene: this.scene,
                        removePrevious: true,
                    });
                } else {
                    this.ifcLoader.ifcManager.removeSubset(model.id, preselectMat);
                }
            }
        });

        const animate = (): void => {
            const delta = this.clock.getDelta();
            const hasControlsUpdated = this.cameraControls.update(delta);

            requestAnimationFrame(animate);

            this.stats.update();
            this.renderer.render(this.scene, this.camera);
        };

        animate();
    }

    private initLights(): void {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.castShadow = true;
        light.shadow.mapSize.set(2048, 2048);
        light.position.set(10, 10, 10);
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0xb0bec5, 0.8));
    }

    private initGrid(): void {
        const size = 40;
        const divisions = size;
        const gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper);
    }

    public async load() {
        this.ifcLoader.ifcManager.setupThreeMeshBVH(
            computeBoundsTree,
            disposeBoundsTree,
            acceleratedRaycast,
        );

        await this.ifcLoader.ifcManager.applyWebIfcConfig({
            COORDINATE_TO_ORIGIN: false,
        });
        // Should work for GH Pages
        this.ifcLoader.ifcManager.setWasmPath('../');
        this.ifcLoader.load(ifc, (ifcModel) => {
            this.ifcModels.push(ifcModel);
            this.scene.add(ifcModel);
            this.cameraControls.fitToSphere(this.scene, false);
            this.cameraControls.polarAngle = Math.PI / 4;
        });
    }

    public setCameraState() {
        this.cameraState = this.cameraControls.toJSON();
    }

    public loadCameraState() {
        if (this.cameraState == null) return;
        this.cameraControls.fromJSON(this.cameraState, true);
    }

    /**
     * Returns the content of the current canvas as an image that you can use as a source for another canvas or an HTML element.
     */
    public generateScreenshot(): string {
        const strMime = 'image/jpeg';
        return this.renderer.domElement.toDataURL(strMime);
    }

    public generateBCF() {
        const cameraState = this.convertCameraStateToBCFState();
        initWorker({
            type: 'begin',
            cameraViewPoint: cameraState.position,
            cameraDirection: cameraState.direction,
            cameraUpVector: cameraState.up,
        });
    }

    public convertCameraStateToBCFState(): BCFCameraState {
        if (this.cameraState == null) throw new Error('Camera state is null');
        const state = JSON.parse(this.cameraState) as CameraControlsStae;
        const { position, target } = state;

        const direction = new THREE.Vector3();
        // @ts-ignore
        this.cameraControls._getCameraDirection(direction);

        const upVector = new THREE.Vector3()
            .subVectors(
                new THREE.Vector3(target[0], target[1], target[2]),
                new THREE.Vector3(position[0], position[1], position[2]),
            )
            .normalize();

        const bcfCameraState: BCFCameraState = {
            direction: [direction.x, -direction.z, direction.y],
            position: [position[0], -position[2], position[1]],
            up: [upVector.x, -upVector.z, upVector.y],
        };

        return bcfCameraState;
    }
}

const THREEViewer = _THREEViewer.Instance;

export default THREEViewer;
