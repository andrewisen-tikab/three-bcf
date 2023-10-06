import * as THREE from 'three';
import * as CORE from '../core';

/**
 * See {@link CORE.Viewpoint}.
 */
export class Viewpoint implements CORE.Viewpoint {
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

    fromJSON(json: CORE.Viewpoint) {
        Object.assign(this, json);
    }

    toJSON(): CORE.Viewpoint {
        return {
            uuid: this.uuid,
            viewpoint: this.viewpoint,
            snapshot: this.snapshot,
            snapshotImage: this.snapshotImage,
            index: this.index,
        };
    }
}

export class TopicComment_Three implements CORE.Comment {
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

    fromJSON(json: CORE.Comment): void {
        Object.assign(this, json);
    }

    toJSON(): CORE.Comment {
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
