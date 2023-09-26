import React from 'react';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';

const comments = ['My comment', 'Another comment'] as const;

export default function Communications() {
    const Comment = comments.map((comment) => {
        return (
            <Box sx={{ ml: 2 }}>
                <Paper
                    elevation={1}
                    component="form"
                    sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        mt: 1,
                    }}
                    variant="outlined"
                >
                    <InputBase sx={{ ml: 1, flex: 1 }} value={comment} />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                        <ClearIcon color="error" />
                    </IconButton>
                </Paper>
            </Box>
        );
    });
    return (
        <>
            <Paper
                elevation={10}
                component="form"
                sx={{ display: 'flex', alignItems: 'center', width: '100%', my: 2 }}
                variant="outlined"
            >
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="New comment..." />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                    <SendIcon />
                </IconButton>
            </Paper>
            {Comment}
        </>
    );
}
