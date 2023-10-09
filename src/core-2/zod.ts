import { z } from 'zod';

/**
 * Base schema for all BCF entities.
 */
const BCFBaseSchema = z.object({
    /**
     * The unique identifier of the entity.
     *
     * This is not in the BCF spec, but is used internally.
     * However, when a BCF component requires a `GUID`, the `uuid` property is used.
     */
    uuid: z.string().uuid(),
});

/**
 * Base schema for all BCF entities.
 */
export type BCFBase = z.infer<typeof BCFBaseSchema>;

export default BCFBaseSchema;
