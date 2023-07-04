import JSZip from 'jszip';
import BCFVersion from '../core/bcf/root/bcf.version';
import imgData from '../core/bcf/topic/snapshot.png';

import axios from 'axios';
import Markup from '../core/bcf/topic/markup';
import Viewpoint from '../core/bcf/topic/viewpoint';

/**
 * @returns {Promise<Blob>} A promise that resolves to a Blob containing the BCF zip file
 */
const createZipAsync = async (): Promise<Blob> => {
    const zipFile = new JSZip();
    zipFile.file('bcf.version', new BCFVersion().create());

    const topicFolder = zipFile.folder('a351f372-e082-4f47-af2b-cb511fc1ed5a');
    if (topicFolder === null) throw new Error('Could not create topic folder');
    const response = await axios.get(imgData, { responseType: 'blob' });
    topicFolder.file('a1cbfe86-2934-4bb4-9794-507b3034f2a3.png', response.data);
    topicFolder.file('a1cbfe86-2934-4bb4-9794-507b3034f2a3.bcfv', new Viewpoint().create());
    topicFolder.file('markup.bcf', new Markup().create());

    const data = await zipFile.generateAsync({ type: 'blob' });
    return data;
};

export default createZipAsync;
