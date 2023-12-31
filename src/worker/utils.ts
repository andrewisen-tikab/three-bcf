/**
 * Convert a dataURL to a blob.
 * Intended use is converting a three.js screenshot to a blob.
 * @param dataURL dataURL to convert
 * @returns dataURL as blob
 */
export const dataURLtoBlob = (dataURL: string) => {
    const arr = dataURL.split(',');
    // @ts-ignore
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
};
