import JSZip from 'jszip';
import BCFVersionFactory_XML from './root/bcf.version';

import MarkupFactory_XML from './topic/markup';
import ViewpointFactory_XML from './topic/viewpoint';
import {
    CreateParams_Worker,
    TopicFolderSchema_Worker,
    WorkerEventPostMessageData,
} from '../types';
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
        const viewpoints = topic.viewpoints;
        const [viewpoint] = viewpoints;

        TopicFolderSchema_Worker.parse(topic);

        const params: CreateParams_Worker = {
            ...topic,
            index: i,
            header: e.header,
        };

        const topicFolder = zipFile.folder(topic.uuid);
        if (topicFolder === null) throw new Error('Could not create topic folder');

        if (viewpoint) {
            console.log('Viewpoint', viewpoint);

            topicFolder.file(`${viewpoint.snapshot}.png`, dataURLtoBlob(viewpoint.snapshotImage), {
                binary: true,
            });
            topicFolder.file(
                `${viewpoint.viewpoint}.bcfv`,
                new ViewpointFactory_XML().create(params, viewpoint.uuid),
            );
        }

        topicFolder.file('markup.bcf', new MarkupFactory_XML().create(params));
    }

    const data = await zipFile.generateAsync({ type: 'blob' });
    return data;
};

export default createZipAsync;
