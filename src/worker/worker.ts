/// <reference lib="webworker" />

import createZipAsync from './zip';

onmessage = async function (_e) {
    console.log('Got message from main thread. Creating ZIP');
    const content = await createZipAsync();
    console.log('ZIP created. Sending back to main thread');
    postMessage(content);
};
