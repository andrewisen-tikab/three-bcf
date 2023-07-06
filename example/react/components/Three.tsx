import React, { useEffect, useRef } from 'react';

import Box from '@mui/material/Box';

import BCFViewer from '../../viewer/BCFViewer';

export default function Three() {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current == null) return;
        const init = async () => {
            BCFViewer.init(ref.current!);
            await BCFViewer.load();
        };
        init();
        return () => {
            BCFViewer.dispose();
        };
    }, []);

    return <Box id="three-container" ref={ref} sx={{ height: '100%' }} />;
}
