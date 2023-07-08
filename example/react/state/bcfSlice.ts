import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Topic, TopicJSON, TopicParams } from '../../../src/core/three/dev';
import { TopicCameraState } from '../../types';
import BCFViewer from '../../viewer/BCFViewer';

export type BCFState = {
    topics: TopicJSON[];
};

const initialState: BCFState = {
    topics: [],
};

type CreateTopicParams = {
    camera: TopicCameraState;
};

export const bcfSlice = createSlice({
    name: 'BCF',
    initialState,
    reducers: {
        createTopic: (state, action: PayloadAction<CreateTopicParams>) => {
            const topic = new Topic();
            topic.set(action.payload.camera);
            topic.order = state.topics.length;
            topic.setScreenshot(BCFViewer.generateScreenshot());
            state.topics.push(topic.toJSON());
        },
        removeTopic: (state, action: PayloadAction<Topic>) => {
            const index = action.payload.order;
            state.topics.splice(index, 1);

            for (let i = index; i < state.topics.length; i++) {
                const input = state.topics[i];
                const topic = new Topic();
                topic.fromJSON(input);
                topic.order--;
                state.topics[i] = topic.toJSON();
            }
        },
    },
});

export const { createTopic } = bcfSlice.actions;
export default bcfSlice.reducer;
