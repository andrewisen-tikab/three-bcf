import * as THREE from 'three';
import type { Nullable, TopicFolderBaseNoUUID_Three, TopicFolder_ThreeJSON } from '../types';
import { DEFAULT_VECTOR3_TUPLE } from '../types';

import type { TopicCameraState } from '../../example/types';
import { TOPIC_STATUSES, TOPIC_TYPES } from '../constants';
import { TopicComment_Core, TopicViewpoint_Core } from '../core';

export class TopicViewpoint_Three implements TopicViewpoint_Core {
    public uuid: string;
    public viewpoint: string;
    public snapshot: string;
    public index: number;
    public snapshotImage: string;

    constructor(snapshotImage?: string) {
        this.uuid = THREE.MathUtils.generateUUID();
        this.viewpoint = `${this.uuid}.bcfv`;
        this.snapshot = `${this.uuid}.png`;
        this.snapshotImage = snapshotImage ?? '';
        this.index = 0;
    }

    setSnapshotImage(snapshotImage: string) {
        this.snapshotImage = snapshotImage;
    }

    fromJSON(json: TopicViewpoint_Core) {
        Object.assign(this, json);
    }

    toJSON(): TopicViewpoint_Core {
        return {
            uuid: this.uuid,
            viewpoint: this.viewpoint,
            snapshot: this.snapshot,
            snapshotImage: this.snapshotImage,
            index: this.index,
        };
    }
}

export class TopicComment_Three implements TopicComment_Core {
    public uuid: string;

    public date: string;

    public author: string;

    public comment?: string;

    public viewpoint?: string;

    public modifiedDate?: string;

    public modifiedAuthor?: string;

    constructor(comment?: string, viewpoint?: string) {
        this.uuid = THREE.MathUtils.generateUUID();
        this.date = new Date().toISOString();
        this.author = '';
        this.comment = comment ?? '';

        this.viewpoint = viewpoint ?? '';

        this.modifiedDate = '';
        this.modifiedAuthor = '';
    }

    fromJSON(json: TopicComment_Core): void {
        Object.assign(this, json);
    }

    toJSON(): TopicComment_Core {
        return {
            uuid: this.uuid,
            date: this.date,
            author: this.author,
            comment: this.comment,
            // TODO: Fix guid
            viewpoint: this.uuid,
            modifiedDate: this.modifiedDate,
            modifiedAuthor: this.modifiedAuthor,
        };
    }
}

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

    public dueDate: string | null;

    public assignedTo: string | null;

    public comments: TopicComment_Three[];

    public viewpoints: TopicViewpoint_Three[];

    public constructor() {
        this.uuid = THREE.MathUtils.generateUUID();
        this.index = 0;

        this.direction = DEFAULT_VECTOR3_TUPLE;
        this.position = DEFAULT_VECTOR3_TUPLE;
        this.target = DEFAULT_VECTOR3_TUPLE;
        this.fieldOfView = 0;
        this.aspectRatio = 0;
        this.title = '';
        this.description = '';
        this.creationDate = '';
        this.creationAuthor = '';
        this.modifiedDate = '';
        this.modifiedAuthor = '';
        this.dueDate = null;
        this.assignedTo = null;
        this.topicType = TOPIC_STATUSES.OPEN;
        this.topicStatus = TOPIC_TYPES.ERROR;
        this.comments = [];
        this.viewpoints = [];
    }

    /**
     * Set the topic.
     * @param params {@link TopicFolderBaseNoUUID_Three}
     */
    public set(params: Nullable<TopicFolderBaseNoUUID_Three>): void {
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
            creationDate: this.creationDate,
            creationAuthor: this.creationAuthor,
            modifiedDate: this.modifiedDate,
            modifiedAuthor: this.modifiedAuthor,
            fieldOfView: this.fieldOfView,
            aspectRatio: this.aspectRatio,
            topicType: this.topicType,
            topicStatus: this.topicStatus,
            dueDate: this.dueDate,
            assignedTo: this.assignedTo,
            comments: this.comments,
            viewpoints: this.viewpoints,
        };

        this.checkJSON(topic);

        return topic as TopicFolder_ThreeJSON;
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
            dueDate: this.dueDate,
            assignedTo: this.assignedTo,
            comments: this.comments.map((c) => c.toJSON()),
            viewpoints: this.viewpoints.map((v) => v.toJSON()),
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

        const {
            direction,
            position,
            target,
            title,
            description,
            index,
            dueDate,
            comments,
            viewpoints,
        } = json as TopicFolder_ThreeJSON;

        this.uuid = uuid;
        this.position = position;
        this.direction = direction;
        this.target = target;
        this.title = title;
        this.description = description ?? '';
        this.index = index;
        this.dueDate = dueDate ?? null;
        this.comments =
            comments.map((c) => {
                const comment = new TopicComment_Three();
                comment.fromJSON(c);
                return comment;
            }) ?? [];
        this.viewpoints =
            viewpoints.map((v) => {
                const viewpoint = new TopicViewpoint_Three();
                viewpoint.fromJSON(v);
                return viewpoint;
            }) ?? [];
    }

    /**
     * Check if JSON is valid.
     * @param json {@link TopicFolderBaseNoUUID_Three}
     */
    private checkJSON(json: Nullable<TopicFolderBaseNoUUID_Three>): void {
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
    private checkCamera(json: Nullable<TopicFolderBaseNoUUID_Three>): void {
        const { direction, position, target, fieldOfView, aspectRatio } = json;

        if (direction == null) throw new Error('direction is null');
        if (position == null) throw new Error('position is null');
        if (target == null) throw new Error('position is null');
        if (fieldOfView == null) throw new Error('fieldOfView is null');
        if (aspectRatio == null) throw new Error('aspectRatio is null');
    }

    /**
     * Add comment to topic.
     * @param comment
     */
    public addComment(comment: TopicComment_Three): void {
        this.comments.push(comment);
    }

    /**
     * Update comment.
     * @param comment
     */
    public updateComment(comment: TopicComment_Three): void {
        const index = this.comments.findIndex((c) => c.uuid === comment.uuid);
        if (index === -1) throw new Error('Comment not found');
        this.comments[index] = comment;
    }

    /**
     * Remove comment from topic.
     * @param comment
     */
    public removeComment(uuid: string): void {
        const index = this.comments.findIndex((c) => c.uuid === uuid);
        if (index === -1) throw new Error('Comment not found');
        this.comments.splice(index, 1);
    }

    public addViewpoint(viewpoint: TopicViewpoint_Three): void {
        this.viewpoints.push(viewpoint);
    }

    public updateViewpoint(viewpoint: TopicViewpoint_Three): void {
        const index = this.viewpoints.findIndex((v) => v.uuid === viewpoint.uuid);
        if (index === -1) throw new Error('Viewpoint not found');
        this.viewpoints[index] = viewpoint;
    }

    public removeViewpoint(uuid: string): void {
        const index = this.viewpoints.findIndex((v) => v.uuid === uuid);
        if (index === -1) throw new Error('Viewpoint not found');
        this.viewpoints.splice(index, 1);
    }
}
