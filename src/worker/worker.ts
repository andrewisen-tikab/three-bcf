/// <reference lib="webworker" />

import { WorkerEventPostMessageData, WorkerEventPostMessageParams } from '../types';
import createZipAsync from './zip';

const onBeginAsync = async (e: WorkerEventPostMessageData) => {
    console.log('Got message from main thread. Creating ZIP');
    const content = await createZipAsync(e);
    console.log('ZIP created. Sending back to main thread');
    postMessage(content);
};

onmessage = async function (e: WorkerEventPostMessageParams) {
    switch (e.data.type) {
        case 'begin':
            await onBeginAsync(e.data);
            break;
        default:
            break;
    }
};
