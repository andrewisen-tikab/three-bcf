import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { Topic } from '../../../src/core/three/dev';

export default function IssueList() {
    const topics = useSelector((state: RootState) => state.bcf.topics);

    const topicList = topics.map((input) => {
        const topic = new Topic();
        topic.fromJSON(input);
        return <div key={topic.uuid}>{topic.direction}</div>;
    });

    return <div>{topicList}</div>;
}
