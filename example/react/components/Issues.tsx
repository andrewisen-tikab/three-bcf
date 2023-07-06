import React from 'react';
import * as THREE from 'three';

import Panel from './Panel';
import CardContent from '@mui/material/CardContent';

import IssueList from './IssueList';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createTopic } from '../state/bcfSlice';
import BCFViewer from '../../viewer/BCFViewer';
import { TopicParams } from '../../../src/core/three/dev';

function NewIssue() {
    const dispatch = useDispatch();

    const onClick = () => {
        const topicCameraState = BCFViewer.getTopicCameraState();
        dispatch(createTopic({ camera: topicCameraState }));
    };

    return (
        <Button aria-label="settings" startIcon={<AddCommentIcon />} onClick={onClick}>
            New issue
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
            action={<NewIssue />}
        >
            <CardContent>
                <IssueList />
            </CardContent>
        </Panel>
    );
}
