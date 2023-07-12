import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';

import BCFViewer from '../../viewer/BCFViewer';
import { RootState } from '../state/store';
import { selectTopic } from '../state/bcfSlice';
import * as BCF from '../../../src';

type IssueItemProps = {
    isSelected?: boolean;
    topic: BCF.THREE.Topic_Three;
    children: React.ReactNode;
};
function IssueItem({ children, topic, isSelected }: IssueItemProps) {
    const dispatch = useDispatch();
    const onClick = () => {
        BCFViewer.setTopicCameraState(topic);

        dispatch(selectTopic(topic.index));
    };
    return (
        <Button variant={isSelected ? 'outlined' : 'text'} onClick={onClick}>
            {children}
        </Button>
    );
}

export default function IssueList() {
    const topics = useSelector((state: RootState) => state.bcf.topics);
    const selected = useSelector((state: RootState) => state.bcf.selectedTopic);

    const topicList = topics.map((input) => {
        const topic = new BCF.THREE.Topic_Three();
        topic.fromJSON(input);
        const { uuid } = topic;

        return (
            <IssueItem key={uuid} topic={topic} isSelected={selected?.uuid === uuid}>
                {topic.direction}
            </IssueItem>
        );
    });

    return <div>{topicList}</div>;
}
