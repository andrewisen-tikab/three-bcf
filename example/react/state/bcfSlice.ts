import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// @ts-ignore
import worker from '../../../src/worker/worker?worker';
import { ThreeTopicBase, Topic_Three, TopicJSON } from '../../../src/three/topic';
import { TopicCameraState } from '../../types';
import BCFViewer from '../../viewer/BCFViewer';
import { ThreeBCF } from '../../../src';

const bcf = new ThreeBCF({
    worker,
});

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
            const topic = new Topic_Three();

            // The topic is empty by default.
            // We need to supply it with the correct data.
            const params: ThreeTopicBase = {
                index: -1,
                title: '',
                description: '',
                creationDate: new Date().toISOString(),
                creationAuthor: 'André Wisén',
                ...action.payload.camera,
            };
            topic.set(params);

            // The index is dictated by the rest of the topics.
            topic.index = state.topics.length;

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
            const index = selectedTopic.index;
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
        removeTopic: (state, action: PayloadAction<Topic_Three>) => {
            const index = action.payload.index;
            state.topics.splice(index, 1);

            for (let i = index; i < state.topics.length; i++) {
                const input = state.topics[i];
                const topic = new Topic_Three();
                topic.fromJSON(input);
                topic.index--;
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
            const topics = _state.topics.map((state) => {
                const cameraState = BCFViewer.convertTopicCameraStateToBCFState(state);

                // Create new object to avoid reference to the state
                const screenshot = state.screenshot;
                const title = state.title;
                const description = state.description;
                const index = state.index;
                const creationDate = state.creationDate;
                const creationAuthor = state.creationAuthor;

                return {
                    title,
                    description,
                    screenshot,
                    index,
                    creationDate,
                    creationAuthor,
                    cameraViewPoint: cameraState.position,
                    cameraDirection: cameraState.direction,
                    cameraUpVector: cameraState.up,
                };
            });

            bcf.createBCF({
                type: 'begin',
                topics,
            });
        },
    },
});

export const { createTopic, updateTopic, removeTopic, selectTopic, deselectTopic, createBCF } =
    bcfSlice.actions;

export default bcfSlice.reducer;
