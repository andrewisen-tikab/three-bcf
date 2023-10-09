import * as THREE from 'three';
import * as CORE from '../core-2';
import { Coloring } from './Coloring';
import { Selection } from './Selection';
import { Visibility } from './Visibility';

/**
 * See {@link CORE.Components}.
 */

export class Components implements CORE.Components {
    uuid: string;

    selection: Selection[];

    visibility: Visibility;

    coloring: Coloring[];

    constructor() {
        this.uuid = THREE.MathUtils.generateUUID();
        this.selection = [];
        this.visibility = new Visibility();
        this.coloring = [];
    }

    public toJSON(): CORE.Components {
        return {
            uuid: this.uuid,
            selection: this.selection.map((s) => s.toJSON()),
            visibility: this.visibility.toJSON(),
            coloring: this.coloring.map((c) => c.toJSON()),
        };
    }

    public fromJSON(json: CORE.Components) {
        this.uuid = json.uuid;
        this.selection = json.selection.map((s) => {
            const selection = new Selection();
            selection.fromJSON(s);
            return selection;
        });
        this.visibility = new Visibility();
        this.visibility.fromJSON(json.visibility);
        this.coloring = json.coloring.map((c) => {
            const coloring = new Coloring();
            coloring.fromJSON(c);
            return coloring;
        });
    }

    public addColoring(coloring: Coloring) {
        this.coloring.push(coloring);
    }

    public updateColoring(coloring: Coloring) {
        const index = this.coloring.findIndex((c) => c.uuid === coloring.uuid);
        if (index === -1) throw new Error('Coloring not found');
        this.coloring[index] = coloring;
    }

    public removeColoring(coloring: Coloring) {
        const index = this.coloring.findIndex((c) => c.uuid === coloring.uuid);
        if (index === -1) throw new Error('Coloring not found');
        this.coloring.splice(index, 1);
    }

    public addSelection(selection: Selection) {
        this.selection.push(selection);
    }

    public updateSelection(selection: Selection) {
        const index = this.selection.findIndex((s) => s.uuid === selection.uuid);
        if (index === -1) throw new Error('Selection not found');
        this.selection[index] = selection;
    }

    public removeSelection(uuid: string) {
        const index = this.selection.findIndex((s) => s.uuid === uuid);
        if (index === -1) throw new Error('Selection not found');
        this.selection.splice(index, 1);
    }

    public addVisibility(visibility: Visibility) {
        this.visibility = visibility;
    }

    public updateVisibility(visibility: Visibility) {
        this.visibility = visibility;
    }

    public removeVisibility() {
        this.visibility = new Visibility();
    }
}
