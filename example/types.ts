import { Vector3 } from '../src/worker/types';

export interface CameraControlsStae {
    position: THREE.Vector3;
    target: THREE.Vector3;
}

export interface BCFCameraState {
    direction: Vector3;
    position: Vector3;
    up: Vector3;
}
