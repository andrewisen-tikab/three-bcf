import { z } from 'zod';
import BCFBaseSchema from './zod';
import { ComponentSchema } from './Component';
import type { Component } from './Component';

/**
 * The `Coloring` element allows specifying the color of {@link Component | components}.
 */
export const ColoringSchema = BCFBaseSchema.extend({
    /**
     * The color is given in ARGB format. Colors are represented as 6 or 8 hexadecimal digits.
     * If 8 digits are present, the first two represent the alpha (transparency) channel.
     * For example, 40E0D0 would be the color Turquoise.
     *
     * [More information about the color format can be found on Wikipedia](https://en.wikipedia.org/wiki/RGBA_color_model).
     */
    color: z.string(),
    /**
     * The Coloring element allows specifying the color of components.
     * For each color a list of components to be displayed with the that color should be provided.
     */
    components: z.array(ComponentSchema),
});

/**
 * The `Coloring` element allows specifying the color of {@link Component | components}.
 */
export type Coloring = z.infer<typeof ColoringSchema>;
