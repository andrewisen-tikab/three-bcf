import * as THREE from 'three';
import type { Nullable, TopicFolderBaseNoUUID_Three, TopicFolder_ThreeJSON } from '../types';
import { DEFAULT_VECTOR3_TUPLE } from '../types';

import type { TopicCameraState } from '../../example/types';
import { TOPIC_STATUSES, TOPIC_TYPES } from '../constants';
import {
    Components_Core,
    Component_Core,
    TopicComment_Core,
    TopicViewpoint_Core,
    Coloring_Core,
    Selection_Core,
} from '../core';

/**
 * See {@link Component_Core}.
 */
export class Component_Three implements Component_Core {
    uuid: string;
    ifcGuid: string;
    originatingSystem: string;
    authoringToolId: string;

    constructor() {
        this.uuid = THREE.MathUtils.generateUUID();
        this.ifcGuid = '';
        this.originatingSystem = '';
        this.authoringToolId = '';
    }

    set({ ifcGuid, originatingSystem, authoringToolId }: Partial<Component_Core>) {
        if (ifcGuid != null) this.ifcGuid = ifcGuid;
        if (originatingSystem != null) this.originatingSystem = originatingSystem;
        if (authoringToolId != null) this.authoringToolId = authoringToolId;

        console.log(this.ifcGuid, this.originatingSystem, this.authoringToolId);
    }

    setIfcGuid(ifcGuid: string) {
        this.ifcGuid = ifcGuid;
    }

    setOriginatingSystem(originatingSystem: string) {
        this.originatingSystem = originatingSystem;
    }

    setAuthoringToolId(authoringToolId: string) {
        this.authoringToolId = authoringToolId;
    }

    fromJSON(json: Component_Core) {
        Object.assign(this, json);
    }

    toJSON(): Component_Core {
        return {
            uuid: this.uuid,
            ifcGuid: this.ifcGuid,
            originatingSystem: this.originatingSystem,
            authoringToolId: this.authoringToolId,
        };
    }
}

/**
 * See {@link Coloring_Core}.
 */
export class Coloring_Three implements Coloring_Core {
    /**
     * The color is given in ARGB format.
     * Colors are represented as 6 or 8 hexadecimal digits.
     * If 8 digits are present, the first two represent the alpha (transparency) channel.
     * For example, `40E0D0` would be the color Turquoise.
     *
     * [More information about the color format can be found on Wikipedia.](https://en.wikipedia.org/wiki/RGBA_color_space)
     */
    private static regex = /^([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6})$/;

    uuid: string;

    color: string;

    components: Component_Three[];

    constructor() {
        this.uuid = THREE.MathUtils.generateUUID();
        this.color = '';
        this.components = [];
    }

    /**
     * The color is given in ARGB format.
     * Colors are represented as 6 or 8 hexadecimal digits.
     * If 8 digits are present, the first two represent the alpha (transparency) channel.
     * For example, `40E0D0` would be the color Turquoise.
     *
     * [More information about the color format can be found on Wikipedia.](https://en.wikipedia.org/wiki/RGBA_color_space)
     *
     * @param color Hex color
     * @param example
     * ```ts
     * Coloring_Three.setColor("FF00FF00")
     * ```
     */
    setColor(color: string) {
        // Test if color is valid ARGB
        if (!Coloring_Three.regex.test(color)) throw new Error('Invalid color format');

        this.color = color;
    }

    addComponent(component: Component_Three) {
        this.components.push(component);
    }

    updateComponent(component: Component_Three) {
        const index = this.components.findIndex((c) => c.ifcGuid === component.ifcGuid);
        if (index === -1) throw new Error('Component not found');
        this.components[index] = component;
    }

    removeComponent(ifcGuid: string) {
        const index = this.components.findIndex((c) => c.ifcGuid === ifcGuid);
        if (index === -1) throw new Error('Component not found');
        this.components.splice(index, 1);
    }

    fromJSON(json: Coloring_Core) {
        this.uuid = json.uuid;
        this.color = json.color;
        this.components = json.components.map((c) => {
            const component = new Component_Three();
            component.fromJSON(c);
            return component;
        });
    }

    toJSON(): Coloring_Core {
        return {
            uuid: this.uuid,
            color: this.color,
            components: this.components.map((c) => c.toJSON()),
        };
    }
}

/**
 * See {@link Selection_Core}.
 */
export class Selection_Three implements Selection_Core {
    uuid: string;
    components: Component_Three[];

    constructor() {
        this.uuid = THREE.MathUtils.generateUUID();
        this.components = [];
    }

    addComponent(component: Component_Three) {
        this.components.push(component);
    }

    updateComponent(component: Component_Three) {
        const index = this.components.findIndex((c) => c.ifcGuid === component.ifcGuid);
        if (index === -1) throw new Error('Component not found');
        this.components[index] = component;
    }

    removeComponent(ifcGuid: string) {
        const index = this.components.findIndex((c) => c.ifcGuid === ifcGuid);
        if (index === -1) throw new Error('Component not found');
        this.components.splice(index, 1);
    }

    fromJSON(json: Selection_Core) {
        this.uuid = json.uuid;
        this.components = json.components.map((c) => {
            const component = new Component_Three();
            component.fromJSON(c);
            return component;
        });
    }

    toJSON(): Selection_Core {
        return {
            uuid: this.uuid,
            components: this.components.map((c) => c.toJSON()),
        };
    }
}

/**
 * See {@link Components_Core}.
 */
export class Components_Three implements Components_Core {
    uuid: string;
    selection: Selection_Three[];
    visibility: any;
    coloring: Coloring_Three[];

    constructor() {
        this.uuid = THREE.MathUtils.generateUUID();
        this.selection = [];
        this.visibility = null;
        this.coloring = [];
    }

    toJSON(): Components_Core {
        return {
            uuid: this.uuid,
            selection: this.selection.map((s) => s.toJSON()),
            visibility: this.visibility,
            coloring: this.coloring.map((c) => c.toJSON()),
        };
    }

    fromJSON(json: Components_Core) {
        this.uuid = json.uuid;
        this.selection = json.selection.map((s) => {
            const selection = new Selection_Three();
            selection.fromJSON(s);
            return selection;
        });
        this.visibility = json.visibility;
        this.coloring = json.coloring.map((c) => {
            const coloring = new Coloring_Three();
            coloring.fromJSON(c);
            return coloring;
        });
    }

    addColoring(coloring: Coloring_Three) {
        this.coloring.push(coloring);
    }

    updateColoring(coloring: Coloring_Three) {
        const index = this.coloring.findIndex((c) => c.uuid === coloring.uuid);
        if (index === -1) throw new Error('Coloring not found');
        this.coloring[index] = coloring;
    }

    removeColoring(coloring: Coloring_Three) {
        const index = this.coloring.findIndex((c) => c.uuid === coloring.uuid);
        if (index === -1) throw new Error('Coloring not found');
        this.coloring.splice(index, 1);
    }

    addSelection(selection: Selection_Three) {
        this.selection.push(selection);
    }

    updateSelection(selection: Selection_Three) {
        const index = this.selection.findIndex((s) => s.uuid === selection.uuid);
        if (index === -1) throw new Error('Selection not found');
        this.selection[index] = selection;
    }

    removeSelection(uuid: string) {
        const index = this.selection.findIndex((s) => s.uuid === uuid);
        if (index === -1) throw new Error('Selection not found');
        this.selection.splice(index, 1);
    }
}

/**
 * See {@link TopicViewpoint_Core}.
 */
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

    public components: Components_Three[];

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
        this.components = [];
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
            components: this.components,
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
            components: this.components.map((c) => c.toJSON()),
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
            components,
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
        this.components =
            components.map((c) => {
                const component = new Components_Three();
                component.fromJSON(c);
                return component;
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

    public addComponents(components: Components_Three): void {
        this.components.push(components);
    }

    public updateComponents(components: Components_Three): void {
        const index = this.components.findIndex((c) => c.uuid === components.uuid);
        if (index === -1) throw new Error('Components not found');
        this.components[index] = components;
    }

    public removeComponents(uuid: string): void {
        const index = this.components.findIndex((c) => c.uuid === uuid);
        if (index === -1) throw new Error('Components not found');
        this.components.splice(index, 1);
    }
}
