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
            title="Issues"
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
        <Box
            sx={{
                display: 'flex',
                flexBasis: '70%',
            }}
        >
            <Panel title="Issue details" sx={{ flexBasis: '50%' }}>
                <Dummy />
            </Panel>
            <Panel title="3D" sx={{ flexBasis: '50%' }}>
                <Three />
            </Panel>
        </Box>
    );
}

function RightBottomFlexLayout() {
    return (
        <Panel
            title="Issue sorter"
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
