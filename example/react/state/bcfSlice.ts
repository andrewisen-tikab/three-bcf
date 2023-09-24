import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// @ts-ignore
import worker from '../../../src/worker/worker?worker';
import { TopicCameraState } from '../../types';
import BCFViewer from '../../viewer/BCFViewer';
import * as BCF from '../../../src';
import type {
    Header_Worker,
    TopicFolderBase_Three,
    TopicFolder_ThreeJSON,
    TopicFolder_Worker,
} from '../../../src/types';
import { TopicComment_Core } from '../../../src/core/topic';

const bcf = new BCF.ThreeBCF({
    worker,
});

export type BCFState = {
    topics: TopicFolder_ThreeJSON[];
    selectedTopic: TopicFolder_ThreeJSON | null;
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
            const topic = new BCF.THREE.Topic_Three();

            const author = 'André Wisén' as const;
            const date = new Date().toISOString();
            // The topic is empty by default.
            // We need to supply it with the correct data.
            const params: TopicFolderBase_Three = {
                index: -1,
                title: '',
                description: '',
                creationDate: date,
                creationAuthor: author,
                modifiedDate: date,
                modifiedAuthor: author,
                topicStatus: BCF.CONSTANTS.TOPIC_STATUSES.OPEN,
                topicType: BCF.CONSTANTS.TOPIC_TYPES.ERROR,
                dueDate: null,
                assignedTo: null,
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
            // @ts-ignore
            topic[action.payload.key] = action.payload.value;
            // @ts-ignore
            selectedTopic[action.payload.key] = action.payload.value;

            // Update the modified date. Keep the same author.
            const date = new Date().toISOString();
            topic.modifiedDate = date;
            selectedTopic.modifiedDate = date;
        },
        /**
         * Update the index of a specific topic.
         * This will automatically re-order the rest of the topics.
         * @param state
         * @param action
         */
        updateTopicIndex: (
            state,
            action: PayloadAction<{ oldIndex: number; newIndex: number }>,
        ): void => {
            const { oldIndex, newIndex } = action.payload;

            // Update the index of the topic first
            const updatedTopic = state.topics[oldIndex];
            updatedTopic.index = newIndex;

            // Re-order the rest of the topics
            state.topics
                .filter((obj) => obj.uuid !== updatedTopic.uuid)
                .forEach((obj) => {
                    if (obj.index >= newIndex && obj.index < oldIndex) {
                        obj.index++;
                    } else if (obj.index <= newIndex && obj.index > oldIndex) {
                        obj.index--;
                    }
                });

            // Finally, sort the topics based on their index
            state.topics.sort((a, b) => a.index - b.index);
        },
        /**
         * Remove a topic.
         * Re-order the rest of the topics.
         * @param state {@link BCFState}
         * @param action {@link CreateTopicParams}
         */
        removeTopic: (state, action: PayloadAction<BCF.THREE.Topic_Three>) => {
            const index = action.payload.index;
            state.topics.splice(index, 1);

            for (let i = index; i < state.topics.length; i++) {
                const input = state.topics[i];
                const topic = new BCF.THREE.Topic_Three();
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
            const comments: TopicComment_Core[] = [
                {
                    guid: '0aa61552-ad36-4458-96c8-a847b5ee0871',
                    date: '2021-05-11T13:00:00Z',
                    author: 'test@gmail.com',
                    comment: 'This is a comment',
                },
            ];

            const topics: TopicFolder_Worker[] = _state.topics.map((state) => {
                const cameraState = BCFViewer.convertTopicCameraStateToBCFState(state);

                // Create new object to avoid reference to the state
                const screenshot = state.screenshot;
                const title = state.title;
                const description = state.description;
                const index = state.index;
                const creationDate = state.creationDate;
                const creationAuthor = state.creationAuthor;
                const modifiedDate = state.modifiedDate;
                const modifiedAuthor = state.modifiedAuthor;
                const fieldOfView = state.fieldOfView;
                const aspectRatio = state.aspectRatio;
                const topicType = state.topicType;
                const topicStatus = state.topicStatus;
                const dueDate = state.dueDate;
                const assignedTo = state.assignedTo;

                const object: TopicFolder_Worker = {
                    title,
                    description,
                    screenshot,
                    index,
                    creationDate,
                    creationAuthor,
                    modifiedDate,
                    modifiedAuthor,
                    cameraViewPoint: cameraState.position,
                    cameraDirection: cameraState.direction,
                    cameraUpVector: cameraState.up,
                    fieldOfView,
                    aspectRatio,
                    topicType,
                    topicStatus,
                    dueDate,
                    assignedTo,
                    comments,
                };

                return object;
            });

            const header: Header_Worker = {
                ifcProject: '16ptFjkWnCdh4kqFvB0NRX',
                isExternal: true,
                fileName: '0001',
            };

            bcf.createBCF({
                type: 'begin',
                topics,
                header,
            });
        },
    },
});

export const {
    createTopic,
    updateTopic,
    removeTopic,
    selectTopic,
    deselectTopic,
    createBCF,
    updateTopicIndex,
} = bcfSlice.actions;

export default bcfSlice.reducer;
