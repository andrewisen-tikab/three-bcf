import JSZip from 'jszip';
import * as THREE from 'three';
import BCFVersionFactory_XML from './root/bcf.version';

import MarkupFactory_XML from './topic/markup';
import ViewpointFactory_XML from './topic/viewpoint';
import { TopicFolderSchema_Worker, WorkerEventPostMessageData } from '../types';
import { dataURLtoBlob } from '../worker/utils';

/**
 * Create a BCF zip file from a list of topics.
 * N.B: To be used inside a web worker!
 *
 * @returns {Promise<Blob>} A promise that resolves to a Blob containing the BCF zip file
 */
const createZipAsync = async (e: WorkerEventPostMessageData): Promise<Blob> => {
    const zipFile = new JSZip();
    zipFile.file('bcf.version', new BCFVersionFactory_XML().create());

    for (let i = 0; i < e.topics.length; i++) {
        const topic = e.topics[i];

        TopicFolderSchema_Worker.parse(topic);

        const topicGuid = THREE.MathUtils.generateUUID();
        const viewpointGuid = THREE.MathUtils.generateUUID();

        const params = {
            ...topic,
            topicGuid,
            viewpointGuid,
            index: i,
        } as const;

        const topicFolder = zipFile.folder(topicGuid);
        if (topicFolder === null) throw new Error('Could not create topic folder');
        topicFolder.file(`${viewpointGuid}.png`, dataURLtoBlob(topic.screenshot), {
            binary: true,
        });
        topicFolder.file(`${viewpointGuid}.bcfv`, new ViewpointFactory_XML().create(params));
        topicFolder.file('markup.bcf', new MarkupFactory_XML().create(params));
    }

    const data = await zipFile.generateAsync({ type: 'blob' });
    return data;
};

export default createZipAsync;
