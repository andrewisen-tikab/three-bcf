import * as THREE from 'three';
import * as CORE from '../core';
import { Component } from './Component';

/**
 * See {@link CORE.Selection}.
 */

export class Selection implements CORE.Selection {
    public uuid: string;

    public components: Component[];

    constructor() {
        this.uuid = THREE.MathUtils.generateUUID();
        this.components = [];
    }

    public addComponent(component: Component): void {
        this.components.push(component);
    }

    public updateComponent(component: Component): void {
        const index = this.components.findIndex((c) => c.ifcGuid === component.ifcGuid);
        if (index === -1) throw new Error('Component not found');
        this.components[index] = component;
    }

    public removeComponent(ifcGuid: string): void {
        const index = this.components.findIndex((c) => c.ifcGuid === ifcGuid);
        if (index === -1) throw new Error('Component not found');
        this.components.splice(index, 1);
    }

    public fromJSON(json: CORE.Selection): void {
        this.uuid = json.uuid;
        this.components = json.components.map((c) => {
            const component = new Component();
            component.fromJSON(c);
            return component;
        });
    }

    public toJSON(): CORE.Selection {
        return {
            uuid: this.uuid,
            components: this.components.map((c) => c.toJSON()),
        };
    }
}
