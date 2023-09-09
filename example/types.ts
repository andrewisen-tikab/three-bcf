import * as THREE from 'three';
import type { TopicBase_Three } from '../src/types';

export interface CameraControlsState {
    position: THREE.Vector3Tuple;
    target: THREE.Vector3Tuple;
}

export type TopicCameraState = Pick<
    TopicBase_Three,
    'position' | 'target' | 'direction' | 'fieldOfView' | 'aspectRatio'
>;

export interface BCFCameraState {
    direction: THREE.Vector3Tuple;
    position: THREE.Vector3Tuple;
    up: THREE.Vector3Tuple;
}
