import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';

export default function UI() {
    return (
        <Box
            sx={{
                position: 'absolute',
                zIndex: 1,
                width: 300,
                height: 300,
                backgroundColor: 'primary.dark',
                '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                },
            }}
        />
    );
}
