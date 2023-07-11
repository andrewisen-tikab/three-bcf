import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Topic, TopicJSON, TopicParams } from '../../../src/core/three/dev';
import { TopicCameraState } from '../../types';
import BCFViewer from '../../viewer/BCFViewer';
import initWorker from '../../init/worker';

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
        /**
         * Create a new topic.
         * @param state {@link BCFState}
         * @param action {@link CreateTopicParams}
         */
        createTopic: (state, action: PayloadAction<CreateTopicParams>): void => {
            // Create a new topic
            const topic = new Topic();

            // The topic is empty by default.
            // We need to supply it with the correct data.
            const params: TopicParams = {
                title: '',
                description: '',
                ...action.payload.camera,
            };
            topic.set(params);

            // The order is dictated by the rest of the topics.
            topic.order = state.topics.length;

            // Finally, we order the Viewer to generate a screenshot.
            topic.setScreenshot(BCFViewer.generateScreenshot());

            // We serialize the topic and add it to the state.
            // This serialized data could be saved to a database.
            const object = topic.toJSON();
            state.topics.push(object); // Array of topics
            state.selectedTopic = object; // Currently selected topic
        },
        /**
         * Update the selected topic.
         * @param state {@link BCFState}
         * @param action {@link CreateTopicParams}
         */
        updateTopic: (state, action: PayloadAction<UpdateTopicParams>): void => {
            const { selectedTopic } = state;
            if (selectedTopic == null) throw new Error('selectedTopic is null');
            const index = selectedTopic.order;
            const topic = state.topics[index];
            if (topic == null) throw new Error('topic is null');

            // Update both references
            topic[action.payload.key] = action.payload.value;
            selectedTopic[action.payload.key] = action.payload.value;
        },
        /**
         * Remove a topic.
         * Re-order the rest of the topics.
         * @param state {@link BCFState}
         * @param action {@link CreateTopicParams}
         */
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
        /**
         * Select a topic based on it's order.
         * @param state {@link BCFState}
         * @param action {@link CreateTopicParams}
         */
        selectTopic: (state, action: PayloadAction<number>) => {
            const topic = state.topics[action.payload];
            state.selectedTopic = topic;
        },
        /**
         * Deselect the currently selected topic.
         * @param state {@link BCFState}
         */
        deselectTopic: (state) => {
            state.selectedTopic = null;
        },
        /**
         * From the current {@link BCFState}, create a BCF file.
         * This will be done in a Web Worker and the resulting file will be downloaded.
         * @param _state {@link BCFState}
         */
        createBCF: (_state): void => {
            const state = _state.topics[0];
            if (state == null) throw new Error('state is undefined');
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
        },
    },
});

export const { createTopic, updateTopic, removeTopic, selectTopic, deselectTopic, createBCF } =
    bcfSlice.actions;

export default bcfSlice.reducer;
