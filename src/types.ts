import type { Topic_Core } from './core/bcf/topic';

export type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

export type Extension = 'zip' | 'bcfzip' | 'bcf';
export const extension: Extension = 'bcf';

export type WorkerEventType = 'begin' | 'progress' | 'end' | 'error' | 'test';

export type Vector3 = [number, number, number];

export interface WorkerTopic extends Topic_Core {
    screenshot: string;
    cameraViewPoint: Vector3;
    cameraDirection: Vector3;
    cameraUpVector: Vector3;
}

export interface CreateParams extends WorkerTopic {
    topicGuid: string;
    viewpointGuid: string;
}

export type WorkerEventPostMessageData = {
    type: WorkerEventType;
    topics: WorkerTopic[];
};

export interface WorkerEventPostMessageParams extends MessageEvent {
    data: WorkerEventPostMessageData;
}

export interface WorkerEventOnMessageParams {
    type: WorkerEventType;
    data: string | Blob;
}
