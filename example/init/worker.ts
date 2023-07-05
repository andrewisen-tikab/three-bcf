import saveAs from 'file-saver';

import { Worker } from '../../src';
import {
    WorkerEventOnMessageParams,
    WorkerEventPostMessageData,
    extension,
} from '../../src/worker/types';

const initWorker = (params: WorkerEventPostMessageData): void => {
    const worker = new Worker();
    worker.postMessage(params);
    worker.onmessage = (event: WorkerEventOnMessageParams) => {
        console.log('Got message from worker thread. Saving ZIP');
        saveAs(event.data, `presentation.${extension}`);
    };
};

export default initWorker;
