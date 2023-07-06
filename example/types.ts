import * as THREE from 'three';
import { Vector3 } from '../src/types';

export interface CameraControlsState {
    position: THREE.Vector3Tuple;
    target: THREE.Vector3Tuple;
}

export interface TopicCameraState {
    position: THREE.Vector3Tuple;
    target: THREE.Vector3Tuple;
    direction: THREE.Vector3Tuple;
}

export interface BCFCameraState {
    direction: Vector3;
    position: Vector3;
    up: Vector3;
}
