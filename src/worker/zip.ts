import JSZip from 'jszip';
import BCFVersion_XML from '../core/xml/bcf/root/bcf.version';
import imgData from '../core/xml/bcf/topic/snapshot.png';

import axios from 'axios';
import Markup_XML from '../core/xml/bcf/topic/markup';
import Viewpoint_XML from '../core/xml/bcf/topic/viewpoint';
import { WorkerEventPostMessageData } from '../types';

const dataURLtoBlob = (dataURL: string) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
};

/**
 * @returns {Promise<Blob>} A promise that resolves to a Blob containing the BCF zip file
 */
const createZipAsync = async (e: WorkerEventPostMessageData): Promise<Blob> => {
    const zipFile = new JSZip();
    zipFile.file('bcf.version', new BCFVersion_XML().create());

    const topicFolder = zipFile.folder('a351f372-e082-4f47-af2b-cb511fc1ed5a');
    if (topicFolder === null) throw new Error('Could not create topic folder');
    topicFolder.file('a1cbfe86-2934-4bb4-9794-507b3034f2a3.png', dataURLtoBlob(e.screenshot), {
        binary: true,
    });
    topicFolder.file('a1cbfe86-2934-4bb4-9794-507b3034f2a3.bcfv', new Viewpoint_XML().create(e));
    topicFolder.file('markup.bcf', new Markup_XML().create());

    const data = await zipFile.generateAsync({ type: 'blob' });
    return data;
};

export default createZipAsync;
