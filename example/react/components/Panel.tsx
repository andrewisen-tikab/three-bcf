import React from 'react';
import Paper from '@mui/material/Paper';
import { SxProps } from '@mui/system';
import Typography from '@mui/material/Typography';

type PanelProps = {
    title?: string;
    children: React.ReactNode;
    sx: SxProps;
};
export default function Panel({ title, children, sx = {} }: PanelProps) {
    return (
        <Paper sx={{ margin: '10px', ...sx }} elevation={3}>
            <>
                {title && (
                    <Typography variant="caption" display="block" gutterBottom>
                        {title}
                    </Typography>
                )}
                {children}
            </>
        </Paper>
    );
}
