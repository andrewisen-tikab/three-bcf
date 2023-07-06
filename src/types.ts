export type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

export type Extension = 'zip' | 'bcfzip' | 'bcf';
export const extension: Extension = 'zip';

export type WorkerEventType = 'begin' | 'progress' | 'end' | 'error';

export type Vector3 = [number, number, number];

export type WorkerEventPostMessageData = {
    type: WorkerEventType;
    cameraViewPoint: Vector3;
    cameraDirection: Vector3;
    cameraUpVector: Vector3;
};

export interface WorkerEventPostMessageParams extends MessageEvent {
    data: WorkerEventPostMessageData;
}

export interface WorkerEventOnMessageParams extends MessageEvent {
    data: string | Blob;
}
