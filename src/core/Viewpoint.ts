import { z } from 'zod';
import BCFBaseSchema from './zod';

/**
 * The markup file can contain multiple viewpoints related to one or more comments.
 * A viewpoint has also the Guid attribute for identifying it uniquely.
 *
 * Viewpoints are immutable, therefore they should never be changed once created.
 * If new comments on a topic require different visualization, new viewpoints should be added.
 */
export const ViewpointSchema = BCFBaseSchema.extend({
    /**
     * Filename of the viewpoint (.bcfv).
     */
    viewpoint: z.string(),
    /**
     * Filename of the snapshot (png or jpeg).
     */
    snapshot: z.string(),
    /**
     * The image data of the snapshot.
     *
     * Not a part of the BCF spec, used internally.
     */
    snapshotImage: z.string(),
    /**
     * Parameter for sorting.
     */
    index: z.number(),
});

/**
 * The markup file can contain multiple viewpoints related to one or more comments.
 * A viewpoint has also the Guid attribute for identifying it uniquely.
 *
 * Viewpoints are immutable, therefore they should never be changed once created.
 * If new comments on a topic require different visualization, new viewpoints should be added.
 */
export type Viewpoint = z.infer<typeof ViewpointSchema>;
