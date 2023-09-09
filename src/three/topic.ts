import * as THREE from 'three';
import type { Nullable, Topic_ThreeJSON, TopicBase_Three } from '../types';
import { DEFAULT_VECTOR3_TUPLE } from '../types';

import type { TopicCameraState } from '../../example/types';

/**
 * Three.js wrapper for `BCF topic`.
 *
 * Use this class to create a new `BCF Topic` that temporary lives in three.js space.
 */
export default class Topic_Three implements Topic_ThreeJSON {
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

    public fieldOfView: number;

    public aspectRatio: number;

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
    }

    /**
     * Set the topic.
     * @param params {@link TopicBase_Three}
     */
    public set(params: Nullable<TopicBase_Three>): void {
        this.checkJSON(params);
        Object.assign(this, params);
    }

    /**
     * Get topic.
     * N.B: It will throw an error if topic is not set.
     */
    public get(): Topic_ThreeJSON {
        const topic: Nullable<Topic_ThreeJSON> = {
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
            fieldOfView: this.fieldOfView,
            aspectRatio: this.aspectRatio,
        };

        this.checkJSON(topic);

        return topic as Topic_ThreeJSON;
    }

    public setScreenshot(screenshot: string) {
        // TODO: Verify screenshot is a valid base64 string.
        this.screenshot = screenshot;
    }

    /**
     * Return topic as JSON string.
     * @returns JSON string.
     */
    public toJSON(): Topic_ThreeJSON {
        const json: Nullable<Topic_ThreeJSON> = {
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
            fieldOfView: this.fieldOfView,
            aspectRatio: this.aspectRatio,
        };

        this.checkJSON(json);

        return json as Topic_ThreeJSON;
    }

    /**
     *  Create topic from JSON string.
     * @param json {@link Topic_ThreeJSON}
     */
    public fromJSON(json: Nullable<Topic_ThreeJSON>): void {
        if (json == null) throw new Error('json is null');

        const { uuid } = json;
        if (uuid == null) throw new Error('uuid is null');

        this.checkJSON(json);

        const { direction, position, target, title, description, index } = json as Topic_ThreeJSON;

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
     * @param json {@link TopicBase_Three}
     */
    private checkJSON(json: Nullable<TopicBase_Three>): void {
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
    private checkCamera(json: Nullable<TopicBase_Three>): void {
        const { direction, position, target, fieldOfView, aspectRatio } = json;

        if (direction == null) throw new Error('direction is null');
        if (position == null) throw new Error('position is null');
        if (target == null) throw new Error('position is null');
        if (fieldOfView == null) throw new Error('fieldOfView is null');
        if (aspectRatio == null) throw new Error('aspectRatio is null');
    }
}
