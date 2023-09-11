import * as THREE from 'three';
import type { Nullable, TopicFolder_ThreeJSON, TopicFolderBase_Three } from '../types';
import { DEFAULT_VECTOR3_TUPLE } from '../types';

import type { TopicCameraState } from '../../example/types';
import { TOPIC_STATUSES, TOPIC_TYPES } from '../core';

/**
 * Three.js wrapper for `BCF topic`.
 *
 * Use this class to create a new `BCF Topic` that temporary lives in three.js space.
 */
export default class Topic_Three implements TopicFolder_ThreeJSON {
    public uuid: string;

    public index: number;

    public position: THREE.Vector3Tuple;

    public direction: THREE.Vector3Tuple;

    public target: THREE.Vector3Tuple;

    public screenshot: string;

    public title: string;

    public description: string;

    public creationDate: string;

    public creationAuthor: string;

    public modifiedDate: string;

    public modifiedAuthor: string;

    public fieldOfView: number;

    public aspectRatio: number;

    public topicType: string;

    public topicStatus: string;

    public constructor() {
        this.uuid = THREE.MathUtils.generateUUID();
        this.index = 0;

        this.direction = DEFAULT_VECTOR3_TUPLE;
        this.position = DEFAULT_VECTOR3_TUPLE;
        this.target = DEFAULT_VECTOR3_TUPLE;
        this.fieldOfView = 0;
        this.aspectRatio = 0;
        this.screenshot = '';
        this.title = '';
        this.description = '';
        this.creationDate = '';
        this.creationAuthor = '';
        this.modifiedDate = '';
        this.modifiedAuthor = '';
        this.topicType = TOPIC_STATUSES.OPEN;
        this.topicStatus = TOPIC_TYPES.ERROR;
    }

    /**
     * Set the topic.
     * @param params {@link TopicFolderBase_Three}
     */
    public set(params: Nullable<TopicFolderBase_Three>): void {
        this.checkJSON(params);
        Object.assign(this, params);
    }

    /**
     * Get topic.
     * N.B: It will throw an error if topic is not set.
     */
    public get(): TopicFolder_ThreeJSON {
        const topic: Nullable<TopicFolder_ThreeJSON> = {
            direction: this.direction,
            position: this.position,
            target: this.target,
            title: this.title,
            description: this.description,
            index: this.index,
            uuid: this.uuid,
            screenshot: this.screenshot,
            creationDate: this.creationDate,
            creationAuthor: this.creationAuthor,
            modifiedDate: this.modifiedDate,
            modifiedAuthor: this.modifiedAuthor,
            fieldOfView: this.fieldOfView,
            aspectRatio: this.aspectRatio,
            topicType: this.topicType,
            topicStatus: this.topicStatus,
        };

        this.checkJSON(topic);

        return topic as TopicFolder_ThreeJSON;
    }

    public setScreenshot(screenshot: string) {
        // TODO: Verify screenshot is a valid base64 string.
        this.screenshot = screenshot;
    }

    /**
     * Return topic as JSON string.
     * @returns JSON string.
     */
    public toJSON(): TopicFolder_ThreeJSON {
        const json: Nullable<TopicFolder_ThreeJSON> = {
            uuid: this.uuid,
            direction: this.direction,
            position: this.position,
            target: this.target,
            screenshot: this.screenshot,
            title: this.title,
            description: this.description,
            index: this.index,
            creationDate: this.creationDate,
            creationAuthor: this.creationAuthor,
            modifiedDate: this.modifiedDate,
            modifiedAuthor: this.modifiedAuthor,
            fieldOfView: this.fieldOfView,
            aspectRatio: this.aspectRatio,
            topicType: this.topicType,
            topicStatus: this.topicStatus,
        };

        this.checkJSON(json);

        return json as TopicFolder_ThreeJSON;
    }

    /**
     *  Create topic from JSON string.
     * @param json {@link TopicFolder_ThreeJSON}
     */
    public fromJSON(json: Nullable<TopicFolder_ThreeJSON>): void {
        if (json == null) throw new Error('json is null');

        const { uuid } = json;
        if (uuid == null) throw new Error('uuid is null');

        this.checkJSON(json);

        const { direction, position, target, title, description, index } =
            json as TopicFolder_ThreeJSON;

        this.uuid = uuid;
        this.position = position;
        this.direction = direction;
        this.target = target;
        this.title = title;
        this.description = description ?? '';
        this.index = index;
    }

    /**
     * Check if JSON is valid.
     * @param json {@link TopicFolderBase_Three}
     */
    private checkJSON(json: Nullable<TopicFolderBase_Three>): void {
        const { title, description, index, creationDate, creationAuthor } = json;
        this.checkCamera(json);
        if (title == null) throw new Error('title is null');
        if (description == null) throw new Error('description is null');
        if (index == null) throw new Error('index is null');
        if (creationDate == null) throw new Error('index is null');
        if (creationAuthor == null) throw new Error('creationAuthor is null');
    }

    /**
     * Check if camera is valid.
     * @param json {@link TopicCameraState}
     */
    private checkCamera(json: Nullable<TopicFolderBase_Three>): void {
        const { direction, position, target, fieldOfView, aspectRatio } = json;

        if (direction == null) throw new Error('direction is null');
        if (position == null) throw new Error('position is null');
        if (target == null) throw new Error('position is null');
        if (fieldOfView == null) throw new Error('fieldOfView is null');
        if (aspectRatio == null) throw new Error('aspectRatio is null');
    }
}
