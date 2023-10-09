import * as THREE from 'three';
import * as CORE from '../core';

/**
 * See {@link CORE.Component}.
 */
export class Component implements CORE.Component {
    public uuid: string;

    public ifcGuid: string;

    public originatingSystem: string;

    public authoringToolId: string;

    constructor() {
        this.uuid = THREE.MathUtils.generateUUID();
        this.ifcGuid = '';
        this.originatingSystem = '';
        this.authoringToolId = '';
    }

    public set({ ifcGuid, originatingSystem, authoringToolId }: Partial<CORE.Component>): void {
        if (ifcGuid != null) this.ifcGuid = ifcGuid;
        if (originatingSystem != null) this.originatingSystem = originatingSystem;
        if (authoringToolId != null) this.authoringToolId = authoringToolId;
    }

    public setIfcGuid(ifcGuid: string): void {
        this.ifcGuid = ifcGuid;
    }

    public setOriginatingSystem(originatingSystem: string) {
        this.originatingSystem = originatingSystem;
    }

    public setAuthoringToolId(authoringToolId: string) {
        this.authoringToolId = authoringToolId;
    }

    public fromJSON(json: CORE.Component): void {
        Object.assign(this, json);
    }

    public toJSON(): CORE.Component {
        return {
            uuid: this.uuid,
            ifcGuid: this.ifcGuid,
            originatingSystem: this.originatingSystem,
            authoringToolId: this.authoringToolId,
        };
    }
}
