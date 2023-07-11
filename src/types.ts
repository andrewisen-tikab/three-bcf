export type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

export type Extension = 'zip' | 'bcfzip' | 'bcf';
export const extension: Extension = 'bcf';

export type WorkerEventType = 'begin' | 'progress' | 'end' | 'error';

export type Vector3 = [number, number, number];

export type WorkerTopic = {
    title: string;
    description: string;
    screenshot: string;
    cameraViewPoint: Vector3;
    cameraDirection: Vector3;
    cameraUpVector: Vector3;
};

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

export interface WorkerEventOnMessageParams extends MessageEvent {
    data: string | Blob;
}
