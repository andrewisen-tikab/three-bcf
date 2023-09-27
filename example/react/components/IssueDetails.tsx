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
import { TOPIC_STATUSES, TOPIC_TYPES } from '../../../src/constants';
import { TopicFolder_ThreeJSON } from '../../../src/types';
import dayjs from 'dayjs';
import * as TEST from '../../test';
import Communications from './Communications';

function useUpdate() {
    const dispatch = useDispatch();

    return (key: keyof TopicFolder_ThreeJSON, value: string) => {
        dispatch(updateTopic({ key, value }));
    };
}

function Title() {
    const title = useSelector((state: RootState) => state.bcf.selectedTopic?.title);
    const update = useUpdate();

    return (
        <TextField
            id={TEST.BCF_TITLE}
            label="Title"
            value={title}
            fullWidth
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                update('title', event.target.value);
            }}
        />
    );
}

function Description() {
    const description = useSelector((state: RootState) => state.bcf.selectedTopic?.description);
    const update = useUpdate();

    return (
        <TextField
            label="Description"
            value={description}
            fullWidth
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                update('description', event.target.value);
            }}
        />
    );
}

function GeneralContainer() {
    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <Title />
                <Description />
            </Grid>
        </Grid>
    );
}

function Status() {
    const status = useSelector((state: RootState) => state.bcf.selectedTopic?.topicStatus);
    const update = useUpdate();

    return (
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
    );
}

function IssueType() {
    const type = useSelector((state: RootState) => state.bcf.selectedTopic?.topicType);
    const update = useUpdate();

    return (
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
    );
}

function DueDate() {
    const dueDate = useSelector((state: RootState) => state.bcf.selectedTopic?.dueDate);
    const update = useUpdate();

    return (
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
    );
}
function CoordinationContainer() {
    return (
        <>
            <Divider textAlign="left" role="presentation">
                <Typography variant="subtitle1"> Coordination</Typography>
            </Divider>
            <Grid container spacing={2} sx={{ px: 1 }}>
                <Grid xs={6}>
                    <Status />
                </Grid>
                <Grid xs={6}>
                    <IssueType />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <DueDate />
                </Grid>
            </Grid>
        </>
    );
}

function AssignedTo() {
    const assignedTo = useSelector((state: RootState) => state.bcf.selectedTopic?.assignedTo);
    const update = useUpdate();

    return (
        <TextField
            label="Assigned to"
            value={assignedTo}
            fullWidth
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                update('assignedTo', event.target.value);
            }}
        />
    );
}

function ResponsibilitiesContainer() {
    return (
        <>
            <Divider textAlign="left" role="presentation">
                <Typography variant="subtitle1"> Responsibilities </Typography>
            </Divider>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <AssignedTo />
                </Grid>
            </Grid>
        </>
    );
}

function CommunicationContainer() {
    return (
        <>
            <Divider textAlign="left" role="presentation">
                <Typography variant="subtitle1"> Communication </Typography>
            </Divider>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Communications />
                </Grid>
            </Grid>
        </>
    );
}

export default function IssueDetails() {
    const isDisabled = useSelector((state: RootState) => state.bcf.selectedTopic == null);

    if (isDisabled) return null;

    return (
        <CardContent sx={{ height: '100%' }}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <GeneralContainer />
                <CoordinationContainer />
                <ResponsibilitiesContainer />
                <CommunicationContainer />
            </Box>
        </CardContent>
    );
}
