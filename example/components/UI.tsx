import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { loadCameraState, setCameraState, stateAsObject } from '../init/three';
import initWorker, { Vector3 } from '../init/worker';
import THREEViewer from '../viewer/Viewer';

export default function UI() {
    return (
        <Box
            sx={{
                right: 0,
                position: 'absolute',
                zIndex: 2,
                p: 4,
                backgroundColor: 'text.primary',
            }}
        >
            <Stack spacing={2} direction="row">
                <Button
                    variant="outlined"
                    onClick={() => {
                        THREEViewer.setCameraState();
                    }}
                >
                    Save camera's position
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        THREEViewer.loadCameraState();
                    }}
                >
                    Load camera position
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                        THREEViewer.generateBCF();
                    }}
                >
                    Create BCF
                </Button>
            </Stack>
        </Box>
    );
}
