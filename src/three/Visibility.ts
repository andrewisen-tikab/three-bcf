import * as THREE from 'three';
import * as CORE from '../core';
import { Component } from './Component';
import { ViewSetupHints } from './ViewSetupHints';

export class Visibility implements CORE.Visibility {
    public uuid: string;

    public components: Component[];

    public defaultVisibility: boolean;

    public viewSetupHints: ViewSetupHints;

    constructor() {
        this.uuid = THREE.MathUtils.generateUUID();
        this.components = [];
        this.defaultVisibility = true;
        this.viewSetupHints = new ViewSetupHints();
    }

    public addComponent(component: Component): void {
        this.components.push(component);
    }

    public updateComponent(component: Component): void {
        const index = this.components.findIndex((c) => c.ifcGuid === component.ifcGuid);
        if (index === -1) throw new Error('Component not found');
        this.components[index] = component;
    }

    public removeComponent(ifcGuid: string) {
        const index = this.components.findIndex((c) => c.ifcGuid === ifcGuid);
        if (index === -1) throw new Error('Component not found');
        this.components.splice(index, 1);
    }

    public fromJSON(json: CORE.Visibility) {
        this.uuid = json.uuid;
        this.components = json.components.map((c) => {
            const component = new Component();
            component.fromJSON(c);
            return component;
        });
        this.defaultVisibility = json.defaultVisibility;
        this.viewSetupHints = new ViewSetupHints();
        this.viewSetupHints.fromJSON(json.viewSetupHints);
    }

    public toJSON(): CORE.Visibility {
        return {
            uuid: this.uuid,
            components: this.components.map((c) => c.toJSON()),
            defaultVisibility: this.defaultVisibility,
            viewSetupHints: this.viewSetupHints.toJSON(),
        };
    }
}
