import JSZip from 'jszip';
import * as THREE from 'three';
import BCFVersion_XML from '../core/xml/bcf/root/bcf.version';

import Markup_XML from '../core/xml/bcf/topic/markup';
import Viewpoint_XML from '../core/xml/bcf/topic/viewpoint';
import { TopicSchema_Worker, WorkerEventPostMessageData } from '../types';
import { dataURLtoBlob } from './utils';

/**
 * @returns {Promise<Blob>} A promise that resolves to a Blob containing the BCF zip file
 */
const createZipAsync = async (e: WorkerEventPostMessageData): Promise<Blob> => {
    const zipFile = new JSZip();
    zipFile.file('bcf.version', new BCFVersion_XML().create());

    for (let i = 0; i < e.topics.length; i++) {
        const topic = e.topics[i];

        TopicSchema_Worker.parse(topic);

        const topicGuid = THREE.MathUtils.generateUUID(); // 'a351f372-e082-4f47-af2b-cb511fc1ed5a';
        const viewpointGuid = THREE.MathUtils.generateUUID(); //'a1cbfe86-2934-4bb4-9794-507b3034f2a3';
        const params = {
            ...topic,
            topicGuid,
            viewpointGuid,
        } as const;

        const topicFolder = zipFile.folder(topicGuid);
        if (topicFolder === null) throw new Error('Could not create topic folder');
        topicFolder.file(`${viewpointGuid}.png`, dataURLtoBlob(topic.screenshot), {
            binary: true,
        });
        topicFolder.file(`${viewpointGuid}.bcfv`, new Viewpoint_XML().create(params));
        topicFolder.file('markup.bcf', new Markup_XML().create(params));
    }

    const data = await zipFile.generateAsync({ type: 'blob' });
    return data;
};

export default createZipAsync;
