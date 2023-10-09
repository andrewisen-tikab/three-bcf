import * as z from 'zod';
import * as THREE from 'three';
import TopicSchema from './core/Topic';
import { FILE_EXTENSIONS, WORKER_EVENT_TYPES } from './constants';

/**
 * Helper type to make all properties of T nullable.
 */
export type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

/**
 * Supported file extensions for the generated BCF file.
 */
export type FileExtension = (typeof FILE_EXTENSIONS)[keyof typeof FILE_EXTENSIONS];

/**
 * Chosen file extension for the generated BCF file.
 */
export const EXTENSION: FileExtension = FILE_EXTENSIONS.BCF;

/**
 * Event types that can be **received** (!) by the worker.
 */
export type WorkerEventType = (typeof WORKER_EVENT_TYPES)[keyof typeof WORKER_EVENT_TYPES];

/**
 * THREE.Vector3Tuple as schema.
 */
export const Vector3TupleSchema = z.tuple([z.number(), z.number(), z.number()]);

/**
 * Default THREE.Vector3Tuple.
 */
export const DEFAULT_VECTOR3_TUPLE = new THREE.Vector3(-1, -1, -1).toArray();

/**
 * `TopicFolderBase` as schema indented for the `three.js`.
 */
export const TopicFolderBaseSchema_Three = TopicSchema.extend({
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
 * `TopicFolderBase` indented for the `three.js`.
 */
export type TopicFolderBase_Three = z.infer<typeof TopicFolderBaseSchema_Three>;

/**
 * `TopicFolderBase` indented for the `three.js`.
 */
export type TopicFolderBaseNoUUID_Three = Omit<TopicFolderBase_Three, 'uuid'>;

/**
 * `TopicFolder` as schema indented for the `three.js`.
 */
export const TopicFolderSchema_Three = TopicFolderBaseSchema_Three.extend({}).merge(
    TopicSchema.pick({ topicType: true, topicStatus: true }),
);

/**
 * `Topic` as JSON type indented for the `three.js`.
 */
export type TopicFolder_ThreeJSON = z.infer<typeof TopicFolderSchema_Three>;

/**
 * `TopicFolder` as schema indented for the `worker`.
 */
export const TopicFolderSchema_Worker = TopicSchema.extend({
    cameraViewPoint: Vector3TupleSchema,
    cameraDirection: Vector3TupleSchema,
    cameraUpVector: Vector3TupleSchema,
}).merge(TopicFolderBaseSchema_Three.pick({ fieldOfView: true, aspectRatio: true }));
/**
 * `TopicFolder` indented for the `worker`.
 */
export type TopicFolder_Worker = z.infer<typeof TopicFolderSchema_Worker>;

/**
 * Header node contains information about the IFC files relevant to this topic.
 * The "files" should be used to match which models to be opened when displaying the topic viewpoints.
 * As IFC-files don't have an unique id, this matching might not be fully automated.
 * Therefore the software importing the BCF file should give the user a possibility to match these files, with the internal models.
 */
export const HeaderSchema_Worker = z.object({
    /**
     * IfcGuid Reference to the project to which this topic is related in the IFC file
     */
    ifcProject: z.string().uuid().optional(),
    /**
     * IfcGuid Reference to the spatial structure element, e.g. IfcBuildingStorey, to which this topic is related.
     */
    ifcSpatialStructureElement: z.string().uuid().optional(),
    /**
     *  Is the IFC file external or within the bcfzip. (Default = true).
     */
    isExternal: z.boolean().optional(),
    /**
     *  The BIM file related to this topic. For IFC files this is the first item in the FILE_NAME entry in the IFC file's [header](https://standards.buildingsmart.org/documents/Implementation/ImplementationGuide_IFCHeaderData_Version_1.0.2.pdf).
     */
    fileName: z.string().optional(),
    /**
     *  Date of the BIM file. For IFC files this is the second entry of the FILE_NAME entry in the IFC file's [header](https://standards.buildingsmart.org/documents/Implementation/ImplementationGuide_IFCHeaderData_Version_1.0.2.pdf). When the timestamp given in the header does not provide timezone, it is interpreted as UTC.
     */
    date: z.string().optional(),
    /**
     * URI to IfcFile. <br> IsExternal=false “..\example.ifc“ (within bcfzip) <br> IsExternal=true  “https://.../example.ifc“
     */
    reference: z.string().optional(),
});

/**
 * Header node contains information about the IFC files relevant to this topic.
 * The "files" should be used to match which models to be opened when displaying the topic viewpoints.
 * As IFC-files don't have an unique id, this matching might not be fully automated.
 * Therefore the software importing the BCF file should give the user a possibility to match these files, with the internal models.
 */
export type Header_Worker = z.infer<typeof HeaderSchema_Worker>;

/**
 * Params for creating BCF topic inside a worker.
 *
 * N.B: This is used to create a single topic, not the entire file.
 */
export interface CreateParams_Worker extends TopicFolder_Worker {
    index: number;
    header: Header_Worker;
}

/**
 * Params for creating BCF file.
 *
 * N.B: This is used to create the entire file.
 */
export type WorkerEventPostMessageData = {
    type: WorkerEventType;
    topics: TopicFolder_Worker[];
    header: Header_Worker;
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
