import { z } from 'zod';
import BCFBaseSchema from './zod';
import { ComponentSchema } from './component';

/**
 * The `Selection` element lists all components that should be selected (highlighted) when displaying a viewpoint.
 */
export const SelectionSchema = BCFBaseSchema.extend({
    /**
     * All components that should be selected (highlighted) when displaying a viewpoint.
     */
    components: z.array(ComponentSchema),
});

/**
 * The `Selection` element lists all components that should be selected (highlighted) when displaying a viewpoint.
 */
export type Selection = z.infer<typeof SelectionSchema>;
