import React from 'react';

import Box from '@mui/material/Box';
import Panel from './Panel';
import Three from './Three';

function Dummy() {
    return <Box sx={{ background: 'red' }} />;
}

function LeftFlexLayout() {
    return (
        <Panel
            sx={{
                flexBasis: '33.33%',
                //  background: 'red'
            }}
        >
            <Dummy />
        </Panel>
    );
}

function RightTopFlexLayout() {
    return (
        <Panel
            sx={{
                display: 'flex',
                flexBasis: '70%',
            }}
        >
            <Box sx={{ flexBasis: '50%' }}></Box>
            <Box sx={{ flexBasis: '50%' }}>
                <Three />
            </Box>
        </Panel>
    );
}

function RightBottomFlexLayout() {
    return (
        <Panel
            sx={{
                flexBasis: '30%',
                // background: 'yellow'
            }}
        >
            <Dummy />
        </Panel>
    );
}

function RightFlexLayout() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexBasis: '66.67%',
            }}
        >
            <RightTopFlexLayout />
            <RightBottomFlexLayout />
        </Box>
    );
}
export default function FlexLayout() {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
            }}
        >
            <LeftFlexLayout />
            <RightFlexLayout />

            {/* <Three />
                <UI /> */}
        </Box>
    );
}
