import saveAs from 'file-saver';

import { Worker } from '../../src';

import { WorkerEventOnMessageParams, WorkerEventPostMessageData, extension } from '../../src/types';

/**
 * See `src/worker/worker`.
 * @param params
 */
const initWorker = (params: WorkerEventPostMessageData): void => {
    const worker = new Worker();
    worker.postMessage({ type: 'test' });
    worker.postMessage(params);
    worker.onmessage = (event: { data: WorkerEventOnMessageParams }) => {
        switch (event.data.type) {
            case 'test':
                console.log('Got test message from worker thread!');
                break;
            case 'begin':
                console.log('Got message from worker thread. Saving ZIP');
                saveAs(event.data.data, `presentation.${extension}`);
                break;
        }
    };
};

export default initWorker;
