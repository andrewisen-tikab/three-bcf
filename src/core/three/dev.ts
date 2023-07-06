import * as THREE from 'three';
import { Nullable } from '../../types';
import { TopicCameraState } from '../../../example/types';
const defaultVector3 = new THREE.Vector3(-1, -1, -1).toArray();

export interface TopicParams {
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
}

export interface TopicJSON extends TopicParams {
    readonly uuid: string;
}

export class Topic implements TopicJSON {
    public uuid: string;

    public order: number;

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

    public constructor() {
        this.uuid = THREE.MathUtils.generateUUID();
        this.order = 0;

        this.direction = defaultVector3;
        this.position = defaultVector3;
        this.target = defaultVector3;
    }

    /**
     * Set topic.
     */
    public set(params: TopicCameraState) {
        const { direction, position, target } = this.checkJSON(params);
        this.direction = direction;
        this.position = position;
        this.target = target;
    }

    /**
     * Get topic.
     * It will throw an error if topic is not set.
     */
    public get(): TopicParams {
        const topic: Nullable<TopicParams> = {
            direction: this.direction,
            position: this.position,
            target: this.target,
        };

        return this.checkJSON(topic);
    }

    /**
     * Return topic as JSON string.
     */
    public toJSON(): string {
        const json: Nullable<TopicJSON> = {
            uuid: this.uuid,
            direction: this.direction,
            position: this.position,
            target: this.target,
        };
        this.checkJSON(json);
        const output = JSON.stringify(json);
        return output;
    }

    /**
     * Create topic from JSON string.
     */
    public fromJSON(input: string): void {
        const json: Nullable<TopicJSON> = JSON.parse(input);
        if (json == null) throw new Error('json is null');

        const { uuid } = json;
        if (uuid == null) throw new Error('uuid is null');

        const { direction, position, target } = this.checkJSON(json);

        this.uuid = uuid;
        this.position = position;
        this.direction = direction;
        this.target = target;
    }

    /**
     * Check if JSON is valid.
     */
    private checkJSON(json: Nullable<TopicParams>): TopicParams {
        const { direction, position, target } = json;
        if (direction == null) throw new Error('direction is null');
        if (position == null) throw new Error('position is null');
        if (target == null) throw new Error('position is null');
        return { direction, position, target };
    }
}
