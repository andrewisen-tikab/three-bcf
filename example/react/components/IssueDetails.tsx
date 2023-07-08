import CardContent from '@mui/material/CardContent';
import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { updateTopic } from '../state/bcfSlice';

export default function IssueDetails() {
    const dispatch = useDispatch();
    const disabled = useSelector((state: RootState) => state.bcf.selectedTopic == null);
    const title = useSelector((state: RootState) => state.bcf.selectedTopic?.title);
    const description = useSelector((state: RootState) => state.bcf.selectedTopic?.description);

    if (disabled) return null;

    const update = (key: string, value: string) => {
        dispatch(updateTopic({ key, value }));
    };

    return (
        <CardContent>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Title"
                    value={title}
                    fullWidth
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        update('title', event.target.value);
                    }}
                />
                <TextField
                    label="Description"
                    value={description}
                    fullWidth
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        update('description', event.target.value);
                    }}
                />
                <Divider />
            </Box>
        </CardContent>
    );
}
