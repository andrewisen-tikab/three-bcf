import CardContent from '@mui/material/CardContent';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { Topic } from '../../../src/core/three/dev';
import { Card, CardMedia } from '@mui/material';

export function IssueItem() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="194"
                image="https://mui.com/static/images/cards/paella.jpg"
            />
            <CardContent>Window</CardContent>
        </Card>
    );
}

export default function IssueSorter() {
    const topics = useSelector((state: RootState) => state.bcf.topics);

    const topicList = topics.map((input) => {
        const topic = new Topic();
        topic.fromJSON(input);

        return <IssueItem key={topic.uuid} />;
    });

    return (
        <CardContent sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            {topicList}
        </CardContent>
    );
}
