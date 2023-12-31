import * as THREE from 'three';
import { WorkerEventOnMessageParams, WorkerEventPostMessageData, EXTENSION } from './types';
import saveAs from 'file-saver';
import { VERSION } from './version';

/**
 * The parameters for the ThreeBCF class.
 */
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
    worker?: new () => Worker;
};

/**
 * Manager for converting three.js data to BCF data.
 *
 * The topics should be created and stored in three.js space first.
 * This class helps with the conversion to a BCF file format
 */
class ThreeBCF extends THREE.EventDispatcher {
    /**
     * The worker instance.
     */
    private worker: Worker;

    /**
     * The version of the library.
     */
    public version: string = VERSION;

    constructor({ workerURL, worker: _Worker }: ThreeBCFParams) {
        super();
        if (workerURL === undefined && _Worker === undefined)
            throw new Error('Either workerURL or worker must be provided');

        this.worker = _Worker ? new _Worker() : new Worker(workerURL!);

        this.worker.onmessage = (event: { data: WorkerEventOnMessageParams }) => {
            switch (event.data.type) {
                case 'test':
                    console.log("THREE.BCF: Got message from worker thread. Everything's fine!");
                    break;
                case 'begin':
                    console.log('Got message from worker thread. Saving ZIP');
                    saveAs(event.data.data, `presentation.${EXTENSION}`);
                    break;
            }
        };

        this.testWorker();
    }

    /**
     * Test the worker thread.
     */
    private testWorker(): void {
        console.log("THREE.BCF: Sending 'test' message to worker thread");
        this.worker.postMessage({ type: 'test' });
    }

    /**
     * From the current state, create a BCF file.
     * This will be done in a Web Worker and the resulting file will be downloaded.
     * @param params {@link WorkerEventPostMessageData}
     */
    public createBCF(params: WorkerEventPostMessageData): void {
        this.worker.postMessage(params);
    }
}

export default ThreeBCF;
