import saveAs from 'file-saver';

import { Worker } from '../../src';

const initWorker = (): void => {
    const worker = new Worker();
    worker.postMessage('Hello World');
    worker.onmessage = (e) => {
        console.log('Got message from worker thread. Saving ZIP');
        saveAs(e.data, `presentation.${extension}`);
    };
};

export default initWorker;
