import * as THREE from 'three';
import { Nullable } from '../types';

export type TopicParams = {
    /**
     * Position of the camera in local three.js space.
     */
    position: THREE.Vector3;
    /**
     * Direction of the camera in local three.js space.
     */
    direction: THREE.Vector3;
    /**
     * Up vector of the camera in local three.js space.
     */
    up: THREE.Vector3;
};

export class Topic {
    /**
     * Position of the camera in local three.js space.
     */
    position: THREE.Vector3 | null;
    /**
     * Direction of the camera in local three.js space.
     */
    direction: THREE.Vector3 | null;
    /**
     * Up vector of the camera in local three.js space.
     */
    up: THREE.Vector3 | null;

    public constructor() {
        this.direction = null;
        this.position = null;
        this.up = null;
    }

    /**
     * Set topic.
     */
    public set(params: TopicParams) {
        const { direction, position, up } = this.checkJSON(params);
        this.direction = direction;
        this.position = position;
        this.up = up;
    }

    /**
     * Get topic.
     * It will throw an error if topic is not set.
     */
    public get(): TopicParams {
        const topic: Nullable<TopicParams> = {
            direction: this.direction,
            position: this.position,
            up: this.up,
        };

        return this.checkJSON(topic);
    }

    /**
     * Return topic as JSON string.
     */
    public toJSON(): string {
        const json: Nullable<TopicParams> = {
            direction: this.direction,
            position: this.position,
            up: this.up,
        };
        return JSON.stringify(this.checkJSON(json));
    }

    /**
     * Create topic from JSON string.
     */
    public fromJSON(input: string): void {
        const json: Nullable<TopicParams> = JSON.parse(input);
        if (json == null) throw new Error('json is null');

        const { direction, position, up } = this.checkJSON(json);

        this.direction = direction;
        this.position = position;
        this.up = up;
    }

    /**
     * Check if JSON is valid.
     */
    private checkJSON(json: Nullable<TopicParams>): TopicParams {
        const { direction, position, up } = json;
        if (direction == null) throw new Error('direction is null');
        if (position == null) throw new Error('position is null');
        if (up == null) throw new Error('position is null');
        return { direction, position, up };
    }
}
