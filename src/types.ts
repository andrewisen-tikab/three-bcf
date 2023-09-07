import * as z from 'zod';
import * as THREE from 'three';
import TopicSchema_Core from './core/bcf/topic';

/**
 * Helper type to make all properties of T nullable.
 */
export type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};
/**
 * Supported file extensions for the generated BCF file.
 */
export type FileExtension = 'zip' | 'bcfzip' | 'bcf';
/**
 * Chosen file extension for the generated BCF file.
 */
export const EXTENSION: FileExtension = 'bcf';
/**
 * Event types that can be **received** (!) by the worker.
 */
export type WorkerEventType = 'begin' | 'progress' | 'end' | 'error' | 'test';
/**
 * THREE.Vector3Tuple as schema.
 */
export const Vector3TupleSchema = z.tuple([z.number(), z.number(), z.number()]);
/**
 * Default THREE.Vector3Tuple.
 */
export const DEFAULT_VECTOR3_TUPLE = new THREE.Vector3(-1, -1, -1).toArray();
/**
 * `TopicBase` as schema indented for the `three.js`.
 */
export const TopicBaseSchema_Three = TopicSchema_Core.extend({
    /**
     * Position of the camera in local three.js space.
     */
    position: Vector3TupleSchema,
    /**
     * Direction of the camera in local three.js space.
     */
    direction: Vector3TupleSchema,
    /**
     * target vector of the camera in local three.js space.
     */
    target: Vector3TupleSchema,
    /**
     * Field of view of the perspective camera.
     */
    fieldOfView: z.number().min(1).max(140),
    /**
     * Aspect ratio of the perspective camera.
     */
    aspectRatio: z.number().min(0.1).max(4),
});
/**
 * `TopicBase` indented for the `three.js`.
 */
export type TopicBase_Three = z.infer<typeof TopicBaseSchema_Three>;
/**
 * `Topic` as schema indented for the `three.js`.
 */
export const TopicSchema_Three = TopicBaseSchema_Three.extend({
    uuid: z.string(),
    screenshot: z.string(),
});
/**
 * `Topic` as JSON type indented for the `three.js`.
 */
export type Topic_ThreeJSON = z.infer<typeof TopicSchema_Three>;
/**
 * `Topic` as schema indented for the `worker`.
 */
export const TopicSchema_Worker = TopicSchema_Core.merge(
    TopicSchema_Three.pick({ screenshot: true }),
).extend({
    cameraViewPoint: Vector3TupleSchema,
    cameraDirection: Vector3TupleSchema,
    cameraUpVector: Vector3TupleSchema,
    /**
     * Field of view of the perspective camera.
     */
    fieldOfView: z.number(),
    /**
     * Aspect ratio of the perspective camera.
     */
    aspectRatio: z.number(),
});
/**
 * `Topic` indented for the `worker`.
 */
export type Topic_Worker = z.infer<typeof TopicSchema_Worker>;
/**
 * Params for creating BCF topic inside a worker.
 */
export interface CreateParams_Worker extends Topic_Worker {
    topicGuid: string;
    viewpointGuid: string;
    index: number;
}
/**
 * Params for creating BCF file.
 */
export type WorkerEventPostMessageData = {
    type: WorkerEventType;
    topics: Topic_Worker[];
};
/**
 * Generic params for communicating with the worker.
 */
export interface WorkerEventPostMessageParams extends MessageEvent {
    data: WorkerEventPostMessageData;
}
/**
 * Generic params for communicating with the main thread.
 */
export interface WorkerEventOnMessageParams {
    type: WorkerEventType;
    data: string | Blob;
}
