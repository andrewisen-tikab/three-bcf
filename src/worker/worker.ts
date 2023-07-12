/// <reference lib="webworker" />

import {
    WorkerEventOnMessageParams,
    WorkerEventPostMessageData,
    WorkerEventPostMessageParams,
} from '../types';
import createZipAsync from './zip';

const onBeginAsync = async (e: WorkerEventPostMessageData): Promise<void> => {
    console.log('Got message from main thread. Creating ZIP');
    const content = await createZipAsync(e);
    console.log('ZIP created. Sending back to main thread');
    const message: WorkerEventOnMessageParams = {
        type: 'begin',
        data: content,
    };
    postMessage(message);
};

const onBeginTest = (): void => {
    console.log(
        'THREE.BCF.WORKER: Got test message from main thread. Sending response to main thread',
    );
    const message: WorkerEventOnMessageParams = { type: 'test', data: 'test' };
    postMessage(message);
};

onmessage = async function (e: WorkerEventPostMessageParams) {
    switch (e.data.type) {
        case 'begin':
            await onBeginAsync(e.data);
            break;
        case 'test':
            onBeginTest();
            break;
        default:
            break;
    }
};
