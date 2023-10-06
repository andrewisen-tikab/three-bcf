import { z } from 'zod';
import BCFBaseSchema from './zod';
import { ComponentSchema } from './component';
import { ViewSetupHintsSchema } from './viewSetupHints';

/**
 * The `Visibility` element decides which objects are visible and which are hidden.
 */
export const VisibilitySchema = BCFBaseSchema.extend({
    /**
     * Defaults to false
     *
     * When `true`, all components should be visible unless listed in the exceptions
     * When `false` all components should be invisible unless listed in the exceptions
     */
    defaultVisibility: z.boolean(),
    viewSetupHints: ViewSetupHintsSchema,
    /**
     * A list of components to
     * - **hide** when `DefaultVisibility=true`
     * - **show** when `DefaultVisibility=false`
     */
    components: z.array(ComponentSchema),
});

export type Visibility = z.infer<typeof VisibilitySchema>;
