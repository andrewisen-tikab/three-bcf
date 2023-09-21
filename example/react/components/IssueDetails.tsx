import CardContent from '@mui/material/CardContent';
import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import NativeSelect from '@mui/material/NativeSelect';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { updateTopic } from '../state/bcfSlice';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Unstable_Grid2';
import { TOPIC_STATUSES, TOPIC_TYPES } from '../../../src/core';
import { TopicFolder_ThreeJSON } from '../../../src/types';
import dayjs from 'dayjs';

export default function IssueDetails() {
    const dispatch = useDispatch();

    // TODO: Refactor `useSelector`
    const disabled = useSelector((state: RootState) => state.bcf.selectedTopic == null);
    const title = useSelector((state: RootState) => state.bcf.selectedTopic?.title);
    const description = useSelector((state: RootState) => state.bcf.selectedTopic?.description);
    const status = useSelector((state: RootState) => state.bcf.selectedTopic?.topicStatus);
    const type = useSelector((state: RootState) => state.bcf.selectedTopic?.topicType);
    const dueDate = useSelector((state: RootState) => state.bcf.selectedTopic?.dueDate);
    const assignedTo = useSelector((state: RootState) => state.bcf.selectedTopic?.assignedTo);

    if (disabled) return null;

    const update = (key: keyof TopicFolder_ThreeJSON, value: string) => {
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
                <Divider textAlign="left" role="presentation">
                    <Typography variant="subtitle1"> Coordination</Typography>
                </Divider>
                <Grid container spacing={2} sx={{ px: 1 }}>
                    <Grid xs={6}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Status
                            </InputLabel>
                            <NativeSelect
                                value={status}
                                inputProps={{
                                    name: 'status',
                                    id: 'uncontrolled-native',
                                }}
                                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                    update('topicStatus', event.target.value);
                                }}
                            >
                                {Object.values(TOPIC_STATUSES).map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid xs={6}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Issue Type
                            </InputLabel>
                            <NativeSelect
                                value={type}
                                inputProps={{
                                    name: 'type',
                                    id: 'uncontrolled-native',
                                }}
                                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                    update('topicType', event.target.value);
                                }}
                            >
                                {Object.values(TOPIC_TYPES).map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <FormControl fullWidth>
                            <DatePicker
                                label="Due date"
                                // @ts-ignore
                                value={dueDate === null ? null : dayjs(dueDate)}
                                // @ts-ignore
                                onChange={(newValue: Date) => {
                                    const newDate = dayjs(newValue).toString();
                                    update('dueDate', newDate);
                                }}
                                timezone="UTC"
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Divider textAlign="left" role="presentation">
                    <Typography variant="subtitle1"> Responsibilities </Typography>
                </Divider>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <TextField
                            label="Assigned to"
                            value={assignedTo}
                            fullWidth
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                update('assignedTo', event.target.value);
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </CardContent>
    );
}
