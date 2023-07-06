import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

import BCFViewer from '../../viewer/BCFViewer';
import { RootState } from '../state/store';
import { Topic } from '../../../src/core/three/dev';

type IssueItemProps = {
    topic: Topic;
    children: React.ReactNode;
};
function IssueItem({ children, topic }: IssueItemProps) {
    const onClick = () => {
        BCFViewer.setTopicCameraState(topic);
    };
    return (
        <Button variant="text" onClick={onClick}>
            {children}
        </Button>
    );
}

export default function IssueList() {
    const topics = useSelector((state: RootState) => state.bcf.topics);

    const topicList = topics.map((input) => {
        const topic = new Topic();
        topic.fromJSON(input);

        return (
            <IssueItem key={topic.uuid} topic={topic}>
                {topic.direction}
            </IssueItem>
        );
    });

    return <div>{topicList}</div>;
}
