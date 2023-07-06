import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Topic, TopicParams } from '../../../src/core/three/dev';
import { TopicCameraState } from '../../types';

export type BCFState = {
    topics: string[];
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
