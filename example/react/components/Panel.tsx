import React from 'react';
import Paper from '@mui/material/Paper';
import { SxProps } from '@mui/system';

type PanelProps = {
    children: React.ReactNode;
    sx: SxProps;
};
export default function Panel({ children, sx = {} }: PanelProps) {
    return (
        <Paper sx={{ margin: '10px', ...sx }} elevation={3}>
            {children}
        </Paper>
    );
}
