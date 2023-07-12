import * as THREE from 'three';
import { WorkerEventOnMessageParams, WorkerEventPostMessageData, extension } from './types';
import saveAs from 'file-saver';

export type ThreeBCFParams = {
    /**
     * The URL of the worker script.
     *
     * ```ts
     * new Worker(workerURL)
     * ```
     */
    workerURL?: string;
    /**
     * The worker instance.
     */
    worker?: Worker;
};

/**
 * Manager for converting three.js data to BCF data.
 * The topics should be created and stored in three.js space first.
 * This class helps with the conversion to a BCF file format
 */
class ThreeBCF extends THREE.EventDispatcher {
    private worker: Worker;

    constructor({ workerURL, worker: _Worker }: ThreeBCFParams) {
        super();
        if (workerURL === undefined && _Worker === undefined)
            throw new Error('Either workerURL or worker must be provided');

        // @ts-ignore
        this.worker = new _Worker() || new Worker(workerURL!);

        this.worker.onmessage = (event: { data: WorkerEventOnMessageParams }) => {
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

        this.worker.postMessage({ type: 'test' });
    }

    /**
     * From the current state, create a BCF file.
     * This will be done in a Web Worker and the resulting file will be downloaded.
     * @param params {@link WorkerEventPostMessageData}
     */
    createBCF(params: WorkerEventPostMessageData): void {
        this.worker.postMessage(params);
    }
}

export default ThreeBCF;