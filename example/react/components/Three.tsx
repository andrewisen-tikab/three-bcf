import React, { useEffect, useRef } from 'react';

import Box from '@mui/material/Box';

import THREEViewer from '../../viewer/Viewer';

export default function Three() {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current == null) return;
        const init = async () => {
            THREEViewer.init(ref.current!);
            await THREEViewer.load();
        };
        init();
        return () => {
            THREEViewer.dispose();
        };
    }, []);

    return <Box id="three-container" ref={ref} sx={{ height: '100%' }} />;
}
