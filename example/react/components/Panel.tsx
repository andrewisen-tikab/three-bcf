import React from 'react';
import Paper from '@mui/material/Paper';
import { SxProps } from '@mui/system';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import theme from '../theme/theme';
import CardHeader from '@mui/material/CardHeader';

type PanelProps = {
    title?: string;
    children: React.ReactNode;
    sx: SxProps;
};
export default function Panel({ title, children, sx = {} }: PanelProps) {
    return (
        <Card
            sx={{
                margin: '10px',
                // @ts-ignore
                boxShadow: theme.customShadows.card,
                borderRadius: Number(theme.shape.borderRadius) * 2,
                // bgcolor: 'background.neutral',

                ...sx,
            }}
            // elevation={24}
        >
            <CardHeader title={title} titleTypographyProps={{ variant: 'h6' }} />

            {children}
        </Card>
    );
}
