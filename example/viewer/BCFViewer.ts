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

    public convertTopicCameraStateToBCFState(json: TopicCameraState): BCFCameraState {
        const { direction, position, target } = json;

        const upVector = new THREE.Vector3()
            .subVectors(
                new THREE.Vector3(target[0], target[1], target[2]),
                new THREE.Vector3(position[0], position[1], position[2]),
            )
            .normalize();

        const bcfCameraState: BCFCameraState = {
            direction: [direction[0], -direction[2], direction[1]],
            position: [position[0], -position[2], position[1]],
            up: [upVector.x, -upVector.z, upVector.y],
        };

        return bcfCameraState;
    }
}
const BCFViewer = _BCFViewer.Instance;

export default BCFViewer;
