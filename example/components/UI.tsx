import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { loadCameraState, setCameraState } from '../init/three';
import initWorker from '../init/worker';

export default function UI() {
    return (
        <Box
            sx={{
                right: 0,
                position: 'absolute',
                zIndex: 1,
                p: 4,
                backgroundColor: 'text.primary',
            }}
        >
            <Stack spacing={2} direction="row">
                <Button
                    variant="outlined"
                    onClick={() => {
                        setCameraState();
                    }}
                >
                    Save camera position
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        loadCameraState();
                    }}
                >
                    Load camera position
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                        initWorker();
                    }}
                >
                    Create BCF
                </Button>
            </Stack>
        </Box>
    );
}
