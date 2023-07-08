import CardContent from '@mui/material/CardContent';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { Topic } from '../../../src/core/three/dev';
import { Card, CardMedia } from '@mui/material';

type IssueItemProps = {
    screenshot: string;
};

export function IssueItem({ screenshot: image }: IssueItemProps) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" height="194" image={image} />
            <CardContent>Window</CardContent>
        </Card>
    );
}

export default function IssueSorter() {
    const topics = useSelector((state: RootState) => state.bcf.topics);

    const topicList = topics.map((topic) => {
        const { uuid, screenshot } = topic;
        return <IssueItem key={uuid} screenshot={screenshot} />;
    });

    return (
        <CardContent sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            {topicList}
        </CardContent>
    );
}
