import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Topic, TopicJSON, TopicParams } from '../../../src/core/three/dev';
import { TopicCameraState } from '../../types';
import BCFViewer from '../../viewer/BCFViewer';

export type BCFState = {
    topics: TopicJSON[];
    selectedTopic: TopicJSON | null;
};

const initialState: BCFState = {
    topics: [],
    selectedTopic: null,
};

type CreateTopicParams = {
    camera: TopicCameraState;
};

type UpdateTopicParams = {
    key: string;
    value: string;
};

export const bcfSlice = createSlice({
    name: 'BCF',
    initialState,
    reducers: {
        createTopic: (state, action: PayloadAction<CreateTopicParams>) => {
            const topic = new Topic();
            const params: TopicParams = {
                title: '',
                description: '',
                ...action.payload.camera,
            };

            topic.set(params);
            topic.order = state.topics.length;
            topic.setScreenshot(BCFViewer.generateScreenshot());
            const object = topic.toJSON();

            state.topics.push(object);
            state.selectedTopic = object;
        },
        updateTopic: (state, action: PayloadAction<UpdateTopicParams>) => {
            const { selectedTopic } = state;
            if (selectedTopic == null) throw new Error('selectedTopic is null');
            const index = selectedTopic.order;
            const topic = state.topics[index];
            if (topic == null) throw new Error('topic is null');

            // Update both references
            topic[action.payload.key] = action.payload.value;
            selectedTopic[action.payload.key] = action.payload.value;
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
        selectTopic: (state, action: PayloadAction<number>) => {
            const topic = state.topics[action.payload];
            state.selectedTopic = topic;
        },
        deselectTopic: (state) => {
            state.selectedTopic = null;
        },
    },
});

export const { createTopic, updateTopic, removeTopic, selectTopic, deselectTopic } =
    bcfSlice.actions;
export default bcfSlice.reducer;
