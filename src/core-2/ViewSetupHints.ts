import { z } from 'zod';

/**
 * Boolean flags to allow fine control over the visibility of `spaces`, `space boundaries` and `openings`.
 *
 * A typical use of these flags is when `DefaultVisibility=true` but spaces, spaces boundaries and openings should remain hidden.
 */
export const ViewSetupHintsSchema = z.object({
    /**
     * Same as `DefaultVisibility` but restricted to spaces only.
     */
    spacesVisible: z.boolean(),
    /**
     * Same as `DefaultVisibility` but restricted to space boundaries only.
     */
    spaceBoundariesVisible: z.boolean(),
    /**
     * Same as `DefaultVisibility` but restricted to openings only.
     */
    openingsVisible: z.boolean(),
});

export type ViewSetupHints = z.infer<typeof ViewSetupHintsSchema>;
