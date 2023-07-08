import React from 'react';

import Box from '@mui/material/Box';
import Panel from './Panel';
import Three from './Three';
import Issues from './Issues';
import IssueSorter from './IssueSorter';
import IssueDetails from './IssueDetails';

function Dummy() {
    return <Box sx={{ background: 'red' }} />;
}

function LeftFlexLayout() {
    return <Issues />;
}

function RightTopFlexLayout() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexBasis: '60%',
            }}
        >
            <Panel title="Issue details" sx={{ flexBasis: '50%' }}>
                <IssueDetails />
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
                flexBasis: '40%',
                // background: 'yellow'
            }}
        >
            <IssueSorter />
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
                height: '100vh',
                bgcolor: 'background.default',
                boxSizing: 'border-box',
                p: '20px',

                // m: '20px',
                display: 'flex',
            }}
        >
            <LeftFlexLayout />
            <RightFlexLayout />

            {/* <Three />
                <UI /> */}
        </Box>
    );
}
