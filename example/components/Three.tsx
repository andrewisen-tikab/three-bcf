import React, { useEffect, useRef } from 'react';

import initThree from '../init/three';

export default function Three() {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current == null) return;
        initThree();
    }, []);

    return <div ref={ref} />;
}
