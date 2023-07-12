import * as THREE from 'three';
import * as z from 'zod';
import type { Nullable } from '../types';
import type { TopicCameraState } from '../../example/types';
import TopicSchema_Core from '../core/bcf/topic';

export const defaultVector3 = new THREE.Vector3(-1, -1, -1).toArray();

export const Vector3TupleSchema = z.tuple([z.number(), z.number(), z.number()]);

export const ThreeTopicSchemaBase = TopicSchema_Core.extend({
    /**
     * Position of the camera in local three.js space.
     */
    position: Vector3TupleSchema,
    /**
     * Direction of the camera in local three.js space.
     */
    direction: Vector3TupleSchema,
    /**
     * target vector of the camera in local three.js space.
     */
    target: Vector3TupleSchema,
});

export type ThreeTopicBase = z.infer<typeof ThreeTopicSchemaBase>;

export const ThreeTopicSchema = ThreeTopicSchemaBase.extend({
    uuid: z.string(),
    screenshot: z.string(),
});

export type TopicJSON = z.infer<typeof ThreeTopicSchema>;

/**
 * Three.js wrapper for BCF topic.
 *
 * Use this class to create a new BCF Topic that temporary lives in three.js space.
 */
export class Topic_Three implements TopicJSON {
    public uuid: string;

    public index: number;

    /**
     * Position of the camera in local three.js space.
     */
    position: THREE.Vector3Tuple;
    /**
     * Direction of the camera in local three.js space.
     */
    direction: THREE.Vector3Tuple;
    /**
     * target vector of the camera in local three.js space.
     */
    target: THREE.Vector3Tuple;

    /**
     * Screenshot generated by three.js.
     */
    screenshot: string;

    /**
     * Title of the topic.
     */
    title: string;

    /**
     * Description of the topic.
     */
    description: string | null;

    /**
     * Date when the topic was created.
     *
     * E.g. `2023-07-03T21:02:50+02:00`
     */
    creationDate: string;
    /**
     * User who created the topic.
     *
     * E.g. `André Wisén` (or an email address)
     */
    creationAuthor: string;

    public constructor() {
        this.uuid = THREE.MathUtils.generateUUID();
        this.index = 0;

        this.direction = defaultVector3;
        this.position = defaultVector3;
        this.target = defaultVector3;
        this.screenshot = '';
        this.title = '';
        this.description = '';
        this.creationDate = '';
        this.creationAuthor = '';
    }

    /**
     * Set topic.
     */
    public set(params: Nullable<ThreeTopicBase>) {
        this.checkJSON(params);
        Object.assign(this, params);
    }

    /**
     * Get topic.
     * It will throw an error if topic is not set.
     */
    public get(): TopicJSON {
        const topic: Nullable<TopicJSON> = {
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
        };

        this.checkJSON(topic);

        return topic as TopicJSON;
    }

    public setScreenshot(screenshot: string) {
        // TODO: Verify screenshot is a valid base64 string.
        this.screenshot = screenshot;
    }

    /**
     * Return topic as JSON string.
     */
    public toJSON(): TopicJSON {
        const json: Nullable<TopicJSON> = {
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
        };

        this.checkJSON(json);

        return json as TopicJSON;
    }

    /**
     * Create topic from JSON string.
     */
    public fromJSON(json: Nullable<TopicJSON>): void {
        if (json == null) throw new Error('json is null');

        const { uuid } = json;
        if (uuid == null) throw new Error('uuid is null');

        this.checkJSON(json);

        const { direction, position, target, title, description, index } = json as TopicJSON;

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
     */
    private checkJSON(json: Nullable<ThreeTopicBase>): void {
        const { title, description, index, creationDate, creationAuthor } = json;
        this.checkCamera(json);
        if (title == null) throw new Error('title is null');
        if (description == null) throw new Error('description is null');
        if (index == null) throw new Error('index is null');
        if (creationDate == null) throw new Error('index is null');
        if (creationAuthor == null) throw new Error('creationAuthor is null');
    }

    private checkCamera(json: Nullable<TopicCameraState>): void {
        const { direction, position, target } = json;

        if (direction == null) throw new Error('direction is null');
        if (position == null) throw new Error('position is null');
        if (target == null) throw new Error('position is null');
    }
}
