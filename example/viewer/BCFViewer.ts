import * as THREE from 'three';
import { Topic, TopicParams } from '../../src/core/three/dev';
import { BCFCameraState, CameraControlsState, TopicCameraState } from '../types';
import THREEViewer from './Viewer';

/**
 * Class for handling BCF in a three.js environment.
 */
class _BCFViewer extends THREEViewer {
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    private static _instance: _BCFViewer;

    constructor() {
        super();
    }

    /**
     * @deprecated WIP
     */
    public getTopicCameraState(): TopicCameraState {
        if (this.cameraState == null) {
            this.setCameraState();
        }
        const cameraControlsState = JSON.parse(this.cameraState!) as CameraControlsState;
        const direction = new THREE.Vector3();
        // @ts-ignore
        this.cameraControls._getCameraDirection(direction);

        const BCFCameraState = {
            position: cameraControlsState.position,
            target: cameraControlsState.target,
            direction: direction.toArray(),
        };

        return BCFCameraState;
    }
}
const BCFViewer = _BCFViewer.Instance;

export default BCFViewer;
