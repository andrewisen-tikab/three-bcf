import * as THREE from 'three';
import * as CORE from '../core';
import { Component } from './Component';

/**
 * See {@link CORE.Coloring}.
 */
export class Coloring implements CORE.Coloring {
    /**
     * The color is given in ARGB format.
     * Colors are represented as 6 or 8 hexadecimal digits.
     * If 8 digits are present, the first two represent the alpha (transparency) channel.
     * For example, `40E0D0` would be the color Turquoise.
     *
     * [More information about the color format can be found on Wikipedia.](https://en.wikipedia.org/wiki/RGBA_color_space)
     */
    private static regex = /^([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6})$/;

    public uuid: string;

    public color: string;

    public components: Component[];

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
    public setColor(color: string): void {
        // Test if color is valid ARGB
        if (!Coloring.regex.test(color)) throw new Error('Invalid color format');

        this.color = color;
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

    public fromJSON(json: CORE.Coloring): void {
        this.uuid = json.uuid;
        this.color = json.color;
        this.components = json.components.map((c) => {
            const component = new Component();
            component.fromJSON(c);
            return component;
        });
    }

    public toJSON(): CORE.Coloring {
        return {
            uuid: this.uuid,
            color: this.color,
            components: this.components.map((c) => c.toJSON()),
        };
    }
}
