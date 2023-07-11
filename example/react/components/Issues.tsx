import React from 'react';
import * as THREE from 'three';

import Panel from './Panel';
import CardContent from '@mui/material/CardContent';

import IssueList from './IssueList';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createTopic } from '../state/bcfSlice';
import BCFViewer from '../../viewer/BCFViewer';
import initWorker from '../../init/worker';
import { RootState, store } from '../state/store';
import { TopicCameraState } from '../../types';

function NewIssue() {
    const dispatch = useDispatch();

    const onClick = () => {
        const topicCameraState: TopicCameraState = BCFViewer.getTopicCameraState();
        dispatch(createTopic({ camera: topicCameraState }));
    };

    return (
        <Button aria-label="settings" startIcon={<AddCommentIcon />} onClick={onClick}>
            New issue
        </Button>
    );
}

function CreateBCF() {
    const disabled = useSelector((state: RootState) => state.bcf.topics.length === 0);

    const onClick = () => {
        const state = store.getState().bcf.topics[0];
        if (state === undefined) return;
        const cameraState = BCFViewer.convertTopicCameraStateToBCFState(state);

        // Create new object to avoid reference to the state
        const screenshot = state.screenshot;
        const title = state.title;
        const description = state.description;

        initWorker({
            type: 'begin',
            title: title,
            description: description,
            screenshot: screenshot,
            cameraViewPoint: cameraState.position,
            cameraDirection: cameraState.direction,
            cameraUpVector: cameraState.up,
        });
    };
    return (
        <Button
            disabled={disabled}
            aria-label="settings"
            startIcon={<SaveAltIcon />}
            onClick={onClick}
        >
            Create BCF
        </Button>
    );
}

export default function Issues() {
    return (
        <Panel
            title="Issues"
            sx={{
                flexBasis: '33.33%',
            }}
            action={
                <>
                    <NewIssue />
                    <CreateBCF />
                </>
            }
        >
            <CardContent>
                <IssueList />
            </CardContent>
        </Panel>
    );
}
