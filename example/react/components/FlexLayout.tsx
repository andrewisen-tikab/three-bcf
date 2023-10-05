import React from 'react';

import Box from '@mui/material/Box';
import Panel from './Panel';
import Three from './Three';
import Issues from './Issues';
import IssueSorter from './IssueSorter';
import IssueDetails from './IssueDetails';
import Settings from './Settings';

function LeftFlexLayout() {
    return <Issues />;
}

function RightTopFlexLayout() {
    return (
        <Box
            className="force-show-scrollbars"
            sx={{
                display: 'flex',
                flexBasis: '60%',
                maxHeight: '50vh',
            }}
        >
            <Panel title="Issue details" sx={{ flexBasis: '50%', overflowY: 'scroll' }}>
                <IssueDetails />
            </Panel>
            <Panel title="3D" sx={{ flexBasis: '50%' }} action={<Settings />}>
                <Three />
            </Panel>
        </Box>
    );
}

function RightBottomFlexLayout() {
    return (
        <Box
            sx={{
                flexBasis: '40%',
                // background: 'yellow',
            }}
        >
            <Panel title="Issue sorter">
                <IssueSorter />
            </Panel>
        </Box>
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
